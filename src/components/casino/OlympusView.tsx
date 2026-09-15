import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { Paytable } from "./Paytable";
import { ReelBank, REEL_PAD, type ReelCol } from "./ReelBank";
import { WinCelebration } from "./WinCelebration";
import { SymbolFace, OlympOrb } from "./SlotSymbols";
import {
  OLYMP_PACK,
  capWin,
  costOf,
  dropPays,
  evaluatePays,
  olympWinKeys,
  orbTotal,
  spinPays,
  type PaysPack,
} from "@/lib/casino/olympus";
import { paintStrip, winTier, type SlotSymbol, type SpinResult, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx, startBed, startRumble, stopBed, stopRumble, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, Info, Minus, Plus, Zap } from "lucide-react";

const AUTO_OPTS = [10, 25, 50, 100] as const;

function emptyReels(pack: PaysPack): ReelCol[] {
  const grid = spinPays(pack.kit, false, false);
  return grid.map((col, i) => ({
    strip: paintStrip(pack.def, col, i, REEL_PAD),
    offset: REEL_PAD,
    spinning: false,
    settleMs: 0,
  }));
}

export function OlympusView({ pack = OLYMP_PACK }: { pack?: PaysPack }) {
  const def = pack.def;
  const kit = pack.kit;
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);

  const [betIndex, setBetIndex] = useState(() => def.betSteps.indexOf(def.defaultBet));
  const bet = def.betSteps[Math.max(0, betIndex)] ?? def.defaultBet;
  const [ante, setAnte] = useState(false);
  const [reels, setReels] = useState<ReelCol[]>(() => emptyReels(pack));
  const [busy, setBusy] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [last, setLast] = useState<SpinResult | null>(null);
  const [vanish, setVanish] = useState<Set<string>>(new Set());
  const [displayWin, setDisplayWin] = useState(0);
  const [payOpen, setPayOpen] = useState(false);
  const [inFs, setInFs] = useState(false);
  const [freeLeft, setFreeLeft] = useState(0);
  const [fsTotal, setFsTotal] = useState(kit.fsCount);
  const [globalMult, setGlobalMult] = useState(0);
  const [seqMult, setSeqMult] = useState(0);
  const [autoLeft, setAutoLeft] = useState(0);
  const [autoOpen, setAutoOpen] = useState(false);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const deadRef = useRef(0);
  const autoRef = useRef(0);
  const spinningRef = useRef(false);
  const globalRef = useRef(0);
  autoRef.current = autoLeft;

  const stake = costOf(bet, ante && !inFs);
  const winCells = useMemo(() => (last ? olympWinKeys(last) : new Set<string>()), [last]);

  useEffect(() => {
    touchGame(pack.slug);
    startBed(pack.bed);
    return () => stopBed();
  }, [pack.bed, pack.slug, touchGame]);

  const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

  const paint = useCallback((grid: SlotSymbol[][], spinning: boolean, turboOn: boolean) => {
    const stops = turboOn ? [280, 360, 440, 520, 600, 680] : [900, 1200, 1500, 1800, 2100, 2400];
    setReels(
      grid.map((col, i) => ({
        strip: paintStrip(def, col, i, REEL_PAD),
        offset: REEL_PAD,
        spinning,
        settleMs: stops[i] ?? 2400,
      })),
    );
  }, [def]);

  const finish = useCallback(
    (paid: number, stakeNow: number) => {
      if (paid > 0) creditWin(paid, pack.name);
      setDisplayWin(paid);
      const tier = winTier(paid, stakeNow);
      if (tier === "big" || tier === "mega" || tier === "epic") {
        setCelebrate({ payout: paid, stake: stakeNow, tier });
      }
      if (soundOn) {
        if (paid > 0) sfx.win(paid >= stakeNow * 8);
        else sfx.lose();
      }
    },
    [creditWin, pack.name, soundOn],
  );

  const runSpin = useCallback(
    async (isFree = false) => {
      if (spinningRef.current) return;
      unlockAudio();
      const anteNow = ante && !isFree;
      const cost = isFree ? 0 : costOf(bet, anteNow);
      if (!isFree) {
        if (balance < cost) {
          setCashier(true);
          return;
        }
        if (!placeBet(cost, anteNow ? `${pack.name} · Ante` : pack.name)) return;
      }
      spinningRef.current = true;
      setBusy(true);
      setVanish(new Set());
      setLast(null);
      setDisplayWin(0);
      setSeqMult(0);
      if (soundOn) {
        sfx.spin();
        startRumble();
      }
      const force =
        !isFree && deadRef.current >= def.pityAfter ? (Math.random() < 0.35 ? "fs" : "win") : null;
      let grid = spinPays(kit, anteNow, isFree, force);
      setSpinKey((k) => k + 1);
      paint(grid, true, turbo);
      await wait(turbo ? 720 : 2500);
      stopRumble();
      paint(grid, false, turbo);
      await wait(turbo ? 80 : 180);

      let seq = 0;
      let scatterPay = 0;
      let fsGot = 0;
      let scatters = 0;
      let level = 0;
      while (true) {
        const result = evaluatePays(kit, grid, isFree ? bet : cost, isFree);
        if (level === 0) {
          scatterPay = result.scatterPayout;
          fsGot = result.freeSpinsAwarded;
          scatters = result.scatterCount;
        } else if (isFree && result.freeSpinsAwarded) {
          fsGot += result.freeSpinsAwarded;
        }
        if (result.lineWins.length === 0) {
          if (level === 0) setLast(result);
          break;
        }
        setLast(result);
        const keys = olympWinKeys(result);
        setVanish(keys);
        if (soundOn) sfx.explode();
        await wait(turbo ? 220 : 480);
        seq += result.lineWins.reduce((s, w) => s + w.payout, 0);
        grid = dropPays(kit, grid, keys, anteNow, isFree);
        setVanish(new Set());
        paint(grid, false, turbo);
        level += 1;
        if (soundOn) sfx.tumble();
        await wait(turbo ? 160 : 320);
      }

      const orbs = orbTotal(grid);
      let mult = 1;
      if (isFree) {
        if (seq > 0 && orbs > 0) {
          globalRef.current += orbs;
          setGlobalMult(globalRef.current);
        }
        mult = Math.max(1, globalRef.current);
      } else if (seq > 0 && orbs > 0) {
        mult = orbs;
      }
      setSeqMult(orbs);
      const paid = capWin(seq * mult + scatterPay, isFree ? bet : cost, kit.maxX);
      const resultFinal = evaluatePays(kit, grid, isFree ? bet : cost, isFree);
      setLast({ ...resultFinal, totalPayout: paid, scatterPayout: scatterPay, scatterCount: scatters });
      paint(grid, false, turbo);

      if (paid > 0) deadRef.current = 0;
      else deadRef.current += 1;

      if (!isFree && fsGot >= kit.fsCount) {
        finish(paid, cost);
        globalRef.current = 0;
        setGlobalMult(0);
        setInFs(true);
        setFreeLeft(fsGot);
        setFsTotal(fsGot);
        if (soundOn) sfx.bonus();
      } else if (isFree) {
        if (fsGot > 0) {
          setFreeLeft((n) => n + fsGot);
          setFsTotal((n) => n + fsGot);
          if (soundOn) sfx.bonus();
        }
        finish(paid, bet);
        setFreeLeft((n) => Math.max(0, n - 1));
      } else {
        finish(paid, cost);
      }

      spinningRef.current = false;
      setBusy(false);
      if (autoRef.current > 0) setAutoLeft((n) => Math.max(0, n - 1));
    },
    [ante, balance, bet, finish, kit, pack.name, paint, placeBet, setCashier, soundOn, turbo],
  );

  useEffect(() => {
    if (busy || celebrate) return;
    if (inFs && freeLeft > 0) {
      const t = window.setTimeout(() => void runSpin(true), turbo ? 280 : 700);
      return () => window.clearTimeout(t);
    }
    if (inFs && freeLeft <= 0) setInFs(false);
    if (!inFs && autoLeft > 0 && balance >= stake) {
      const t = window.setTimeout(() => void runSpin(false), turbo ? 240 : 560);
      return () => window.clearTimeout(t);
    }
  }, [autoLeft, balance, busy, celebrate, freeLeft, inFs, runSpin, stake, turbo]);

  async function buyBonus() {
    unlockAudio();
    const cost = bet * pack.buy;
    if (balance < cost) {
      setCashier(true);
      return;
    }
    if (!placeBet(cost, `${pack.name} · Bonus`)) return;
    setInFs(true);
    setFreeLeft(kit.fsCount);
    setFsTotal(kit.fsCount);
    globalRef.current = 0;
    setGlobalMult(0);
    if (soundOn) sfx.bonus();
  }

  return (
    <div className={cn("relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6", `slot-skin-${pack.skin}`)}>
      <img src={pack.bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
      <div className="absolute inset-0 bg-[#12081c]/75" />
      {pack.statue ? (
        <img
          src={pack.statue}
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 z-[5] hidden h-[82%] w-[22vw] max-w-[260px] object-contain object-bottom sm:block"
        />
      ) : null}

      <div className="relative z-20 mx-auto flex max-w-[46rem] flex-col px-2 pb-10 pt-2 sm:px-4">
        <div className="mb-1 flex items-center gap-2">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#e8c85a]">{pack.kicker}</p>
            <h1 className="font-display text-3xl text-fg sm:text-4xl">{pack.name}</h1>
          </div>
          <button type="button" className="inline-flex size-11 items-center justify-center text-muted" aria-label="Gewinntabelle" onClick={() => setPayOpen(true)}>
            <Info className="size-4" />
          </button>
        </div>

        <div className={cn("slot-bezel", `slot-skin-${pack.skin}`)}>
          <div className="slot-cabinet">
            <div className="mb-2 flex items-center justify-between gap-2 px-1 text-[11px] uppercase tracking-wider">
              <span className="text-[#c9b07a]">
                {inFs ? `Freispiel ${Math.min(fsTotal, fsTotal - freeLeft + 1)} / ${fsTotal}` : pack.hint}
              </span>
              <span className="tabular-nums text-[#e8c85a]">96,5 %</span>
            </div>

            {inFs ? (
              <div className="mb-2 flex items-center justify-center gap-3">
                {globalMult > 0 ? <OlympOrb value={globalMult} size="hud" /> : null}
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#c9b07a]">Multiplikator</p>
                  <p className="font-display text-2xl leading-none tracking-wide text-[#ffe08a]">
                    ×{Math.max(1, globalMult)}
                    {seqMult > 0 ? <span className="ml-2 text-base text-[#e8c85a]">+{seqMult}</span> : null}
                  </p>
                </div>
              </div>
            ) : seqMult > 0 ? (
              <div className="mb-2 flex items-center justify-center gap-2">
                <OlympOrb value={seqMult} size="hud" />
                <p className="font-display text-lg text-[#ffe08a]">Orbs ×{seqMult}</p>
              </div>
            ) : null}

            <ReelBank
              reels={reels}
              spinKey={spinKey}
              busy={busy}
              winCells={winCells}
              vanish={vanish}
              variant={pack.variant}
              rows={5}
            />

            <div className="mt-3 min-h-7 text-center text-sm">
              {last && last.totalPayout > 0 ? (
                <p className="text-[#ffe08a]">
                  {last.lineWins.map((w) => `${w.count}× ${w.symbol.label}`).join(" · ") || "Scatter"}
                  {last.scatterCount >= 4 ? ` · ${last.scatterCount}× ${pack.scatterName}` : ""}
                  {" · "}
                  {formatEuro(last.totalPayout)}
                </p>
              ) : last ? (
                <p className="text-muted">Kein Gewinn</p>
              ) : (
                <p className="text-[#8a7a58]">4× {pack.scatterName} = {kit.fsCount} Freispiele · Orbs bis ×500</p>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-md border border-[#e8c85a]/30 bg-bg/70">
                <button type="button" className="size-11" disabled={busy || inFs || betIndex === 0} onClick={() => setBetIndex((i) => Math.max(0, i - 1))} aria-label="Einsatz senken">
                  <Minus className="mx-auto size-4" />
                </button>
                <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(stake)}</span>
                <button
                  type="button"
                  className="size-11"
                  disabled={busy || inFs || betIndex === def.betSteps.length - 1}
                  onClick={() => setBetIndex((i) => Math.min(def.betSteps.length - 1, i + 1))}
                  aria-label="Einsatz erhöhen"
                >
                  <Plus className="mx-auto size-4" />
                </button>
              </div>
              <button
                type="button"
                disabled={busy || inFs}
                onClick={() => setAnte((v) => !v)}
                className={cn(
                  "h-11 rounded-md border px-3 text-xs uppercase tracking-wider",
                  ante ? "border-[#e8c85a] bg-[#e8c85a] text-[#1a1408]" : "border-[#e8c85a]/30 bg-bg/70 text-fg",
                )}
              >
                Ante
              </button>
              <div className="relative">
                <button
                  type="button"
                  disabled={busy && autoLeft === 0}
                  onClick={() => {
                    if (autoLeft > 0) setAutoLeft(0);
                    else setAutoOpen((v) => !v);
                  }}
                  className={cn("h-11 rounded-md border px-3 text-xs uppercase tracking-wider", autoLeft > 0 ? "border-[#e8c85a] bg-[#e8c85a] text-[#1a1408]" : "border-[#e8c85a]/30 bg-bg/70")}
                >
                  {autoLeft > 0 ? `Auto ${autoLeft}` : "Auto"}
                </button>
                {autoOpen ? (
                  <div className="absolute bottom-12 left-0 z-30 flex gap-1 rounded-md border border-border bg-surface p-1">
                    {AUTO_OPTS.map((n) => (
                      <button key={n} type="button" className="h-10 min-w-10 px-2 text-xs" onClick={() => { setAutoLeft(n); setAutoOpen(false); }}>
                        {n}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setTurbo((v) => !v)}
                className={cn("inline-flex size-11 items-center justify-center rounded-md border", turbo ? "border-[#e8c85a] bg-[#e8c85a] text-[#1a1408]" : "border-[#e8c85a]/30 bg-bg/70")}
                aria-label="Turbo"
              >
                <Zap className="size-4" />
              </button>
              <button
                type="button"
                disabled={busy || (!inFs && balance < stake)}
                onClick={() => void runSpin(false)}
                className="relative ml-auto flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40 sm:size-[4.5rem]"
              >
                {busy ? "…" : inFs ? "Frei" : "Drehen"}
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                disabled={busy || inFs}
                onClick={() => void buyBonus()}
                className="h-11 flex-1 rounded-md border border-[#e8c85a]/30 text-xs uppercase tracking-wider text-[#e8c85a]"
              >
                Bonus · {formatEuro(bet * pack.buy)}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-md bg-bg/70 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-[#8a7a58]">Gewinn</p>
                <p className="font-display text-xl tabular-nums text-[#ffe08a]">{displayWin ? formatEuro(displayWin) : "—"}</p>
              </div>
              <div className="rounded-md bg-bg/70 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-[#8a7a58]">Guthaben</p>
                <p className="font-display text-xl tabular-nums text-fg">{formatEuro(balance)}</p>
              </div>
            </div>
            <NeedBankroll />
          </div>
        </div>
      </div>

      {inFs && last?.scatterCount ? (
        <div className="pointer-events-none absolute right-3 top-24 hidden w-16 sm:block">
          <SymbolFace symbol={def.symbols.find((s) => s.kind === "scatter")!} variant={pack.variant} />
        </div>
      ) : null}

      {celebrate ? (
        <WinCelebration
          payout={celebrate.payout}
          stake={celebrate.stake}
          tier={celebrate.tier}
          soundOn={soundOn}
          variant="pragmatic"
          onDone={() => setCelebrate(null)}
        />
      ) : null}
      <Paytable open={payOpen} onOpenChange={setPayOpen} def={def} stake={stake} name={pack.name} />
    </div>
  );
}
