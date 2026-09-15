import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { ReelBank, REEL_PAD, REEL_STOP_MS, type ReelCol } from "./ReelBank";
import { JackpotMeters, JackpotWheel } from "./JackpotWheel";
import { WinCelebration } from "./WinCelebration";
import { SLOT_DEFS, evaluateSpin, randomPad, randomSymbol, spinGrid, winTier, type SlotSymbol, type SpinResult, type WinTier } from "@/lib/casino/slots";
import {
  HUFF_FS,
  HUFF_PITY,
  HUFF_SAW_WHEEL,
  HUFF_TRIGGER_HATS,
  applyHatFrames,
  countId,
  emptyFrames,
  forceHats,
  hatCells,
  settleHouses,
  spinHuffWheel,
  type FrameLevel,
} from "@/lib/casino/huff";
import { formatEuro } from "@/lib/casino/format";
import { sfx, startRumble, stopRumble, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, Minus, Plus } from "lucide-react";

const SLUG = "huff-und-puff";

type Phase = "idle" | "fs" | "blow" | "wheel";

export function HuffView() {
  const def = SLOT_DEFS[SLUG]!;
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  const [betIndex, setBetIndex] = useState(2);
  const [reels, setReels] = useState<ReelCol[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({
      strip: [def.symbols[i]!, def.symbols[(i + 1) % def.symbols.length]!, def.symbols[(i + 2) % def.symbols.length]!],
      offset: 0,
      spinning: false,
      settleMs: REEL_STOP_MS[i] ?? 2000,
    })),
  );
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<SpinResult | null>(null);
  const [displayWin, setDisplayWin] = useState(0);
  const [freeSpins, setFreeSpins] = useState(0);
  const [fsTotal, setFsTotal] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [frames, setFrames] = useState<FrameLevel[]>(() => emptyFrames());
  const [housePays, setHousePays] = useState<number[]>([]);
  const [blowStep, setBlowStep] = useState(0);
  const [spinKey, setSpinKey] = useState(0);
  const [wheel, setWheel] = useState<{
    index: number;
    label: string;
    payout: number;
    extraFs: number;
  } | null>(null);
  const [huffPulse, setHuffPulse] = useState(false);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const timers = useRef<number[]>([]);
  const freeRef = useRef(0);
  const pityRef = useRef(0);
  const framesRef = useRef<FrameLevel[]>(emptyFrames());

  const dismissWin = useCallback(() => setCelebrate(null), []);
  const bet = def.betSteps[betIndex] ?? 100;
  const inFs = freeSpins > 0 && phase === "fs";

  useEffect(() => {
    freeRef.current = freeSpins;
  }, [freeSpins]);
  useEffect(() => {
    framesRef.current = frames;
  }, [frames]);
  useEffect(() => () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    stopRumble();
  }, []);

  useEffect(() => {
    if (busy || phase === "blow" || phase === "wheel") return;
    if (phase === "fs" && freeSpins > 0) {
      const t = window.setTimeout(() => runSpin(), 900);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy, freeSpins, phase]);

  function runSpin() {
    unlockAudio();
    if (busy) return;
    const isFree = freeRef.current > 0 && phase === "fs";
    if (!isFree) {
      if (balance < bet) {
        setCashier(true);
        return;
      }
      if (!placeBet(bet, "Huff und Puff · Einsatz")) return;
    } else {
      setFreeSpins((n) => Math.max(0, n - 1));
    }
    if (soundOn) sfx.spin();
    startRumble();
    setBusy(true);
    setLast(null);
    setDisplayWin(0);
    setWheel(null);
    setSpinKey((k) => k + 1);

    pityRef.current += isFree ? 0 : 1;
    const forceHatsN = !isFree && pityRef.current >= HUFF_PITY ? HUFF_TRIGGER_HATS : 0;
    if (forceHatsN) pityRef.current = 0;

    let raw = spinGrid(def);
    const hat = def.symbols.find((s) => s.id === "scatter");
    if (forceHatsN && hat) raw = forceHats(raw, hat, forceHatsN);

    const hats = countId(raw, "scatter");
    const saws = countId(raw, "saw");
    const result = evaluateSpin(def, raw, bet, 1);

    const nextReels: ReelCol[] = raw.map((col, i) => ({
      strip: [...randomPad(def, REEL_PAD), ...col, randomSymbol(def, false)],
      offset: REEL_PAD,
      spinning: true,
      settleMs: REEL_STOP_MS[i] ?? 2000,
    }));
    setReels(nextReels);

    REEL_STOP_MS.forEach((ms, i) => {
      const t = window.setTimeout(() => {
        if (soundOn) sfx.stop(i);
        setReels((cols) => cols.map((c, idx) => (idx === i ? { ...c, spinning: false } : c)));
        if (i === 4) {
          stopRumble();
          finish(result, raw, hats, saws, isFree);
        }
      }, ms);
      timers.current.push(t);
    });
  }

  function finish(result: SpinResult, raw: SlotSymbol[][], hats: number, saws: number, isFree: boolean) {
    setLast(result);
    setBusy(false);
    if (result.totalPayout > 0) {
      creditWin(result.totalPayout, "Huff und Puff · Linie");
      if (soundOn) sfx.win(result.totalPayout >= bet * 6);
      countUp(result.totalPayout);
    } else if (soundOn) sfx.lose();

    if (isFree) {
      const nextFrames = applyHatFrames(framesRef.current, hatCells(raw));
      setFrames(nextFrames);
      if (hats >= 3) {
        setFreeSpins((n) => n + 1);
        setFsTotal((n) => n + 1);
        if (soundOn) sfx.cash();
      }
      if (freeRef.current <= 1 && hats < 3) {
        beginBlow(nextFrames);
      }
      return;
    }

    if (saws >= HUFF_SAW_WHEEL) {
      const prize = spinHuffWheel(bet);
      setPhase("wheel");
      setWheel(prize);
      return;
    }

    if (hats >= HUFF_TRIGGER_HATS) {
      pityRef.current = 0;
      const seeded = applyHatFrames(emptyFrames(), hatCells(raw));
      setFrames(seeded);
      setFreeSpins(HUFF_FS);
      setFsTotal(HUFF_FS);
      setPhase("fs");
      if (soundOn) sfx.cash();
    }
  }

  function beginBlow(nextFrames: FrameLevel[]) {
    setPhase("blow");
    setBlowStep(0);
    setHuffPulse(true);
    const { pays, total } = settleHouses(nextFrames, bet);
    setHousePays(pays);
    const t1 = window.setTimeout(() => setBlowStep(1), 700);
    const t2 = window.setTimeout(() => setBlowStep(2), 1500);
    const t3 = window.setTimeout(() => setBlowStep(3), 2300);
    const t4 = window.setTimeout(() => {
      if (total > 0) {
        creditWin(total, "Huff und Puff · Häuser");
        countUp(total, true);
        if (soundOn) sfx.win(total >= bet * 8);
      }
      setHuffPulse(false);
    }, 2800);
    timers.current.push(t1, t2, t3, t4);
  }

  function closeBonus() {
    setPhase("idle");
    setFrames(emptyFrames());
    setHousePays([]);
    setBlowStep(0);
    setFreeSpins(0);
    setFsTotal(0);
    setWheel(null);
  }

  function resolveWheel() {
    if (!wheel) return;
    if (wheel.payout > 0) {
      creditWin(wheel.payout, "Huff und Puff · Rad");
      countUp(wheel.payout, true);
    }
    if (wheel.extraFs) {
      setFreeSpins((n) => n + wheel.extraFs);
      setFsTotal((n) => n + wheel.extraFs);
      setWheel(null);
      setPhase("fs");
      return;
    }
    setWheel(null);
    closeBonus();
  }

  function countUp(target: number, celebrateIt = false) {
    const start = performance.now();
    const dur = Math.min(900, 240 + target / 8);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setDisplayWin(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    if (celebrateIt) {
      const tier = winTier(target, bet);
      if (tier !== "none") setCelebrate({ payout: target, stake: bet, tier });
    }
  }

  const winCells = useMemo(() => {
    const set = new Set<string>();
    last?.lineWins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
    return set;
  }, [last]);

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-huff sm:-mx-6">
      <img src="/games/huff-und-puff.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="pointer-events-none absolute inset-0 neon-mesh" />

      <div className="pointer-events-none absolute bottom-0 left-0 z-[5] hidden h-[78%] w-[22vw] max-w-[280px] sm:block">
        <video
          src="/games/char-huff-wolf.mp4"
          poster="/games/char-huff-wolf.jpg"
          autoPlay
          loop
          muted
          playsInline
          className={cn("h-full w-full object-contain object-bottom slot-statue", huffPulse && "slot-statue-win")}
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-[5] hidden h-[70%] w-[20vw] max-w-[240px] sm:block">
        <img src="/games/char-huff-pig.jpg" alt="" className="h-full w-full object-contain object-bottom slot-statue" />
      </div>

      <div className="relative z-20 mx-auto flex max-w-[42rem] flex-col px-2 pb-10 pt-2 sm:px-4">
        <div className="mb-2 flex items-center gap-2">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[#e6b84d]">Jackpot Wheel</p>
            <h1 className="font-display text-3xl text-fg sm:text-4xl">Huff und Puff</h1>
          </div>
          <span className="w-11" />
        </div>

        <div className="slot-bezel slot-skin-huff">
          <div className="slot-cabinet relative overflow-hidden">
            <JackpotMeters stake={bet} hot={wheel && !busy ? wheel.label : null} />
            <div className="mb-2 flex items-center justify-between px-1 text-xs uppercase tracking-wider">
              <span className={inFs ? "text-[#e6b84d]" : "text-muted"}>
                {inFs
                  ? `Bonus ${Math.max(1, fsTotal - freeSpins)} / ${fsTotal}`
                  : `6× Helm = Häuser · 2× Säge = Rad`}
              </span>
              <span className="tabular-nums text-[#e6b84d]">96,2 %</span>
            </div>

            <ReelBank
              reels={reels}
              spinKey={spinKey}
              busy={busy}
              winCells={winCells}
              variant="sand"
              overlay={(ri, row) => {
                const fi = ri * 3 + row;
                const lv = frames[fi] ?? 0;
                const pay = housePays[fi] ?? 0;
                const blown =
                  phase === "blow" &&
                  lv > 0 &&
                  ((lv === 1 && blowStep >= 1) || (lv === 2 && blowStep >= 2) || (lv === 3 && blowStep >= 3));
                return (
                  <>
                    {lv > 0 ? <span className={cn("pointer-events-none absolute inset-0", `huff-frame huff-frame-${lv}`, blown && "huff-blown")} /> : null}
                    {blown && pay > 0 ? (
                      <span className="absolute inset-x-0 bottom-1 text-center text-xs font-semibold tabular-nums text-[#e6b84d]">
                        {formatEuro(pay)}
                      </span>
                    ) : null}
                  </>
                );
              }}
            />

            <div className="mt-3 min-h-6 text-center text-sm">
              {phase === "blow" ? (
                <p className="font-display text-2xl text-accent">{blowStep === 0 ? "Der Wolf holt Luft…" : "Huff! Puff!"}</p>
              ) : last && last.totalPayout > 0 ? (
                <p className="text-win">
                  {last.lineWins.length} Linie{last.lineWins.length === 1 ? "" : "n"} · {formatEuro(last.totalPayout)}
                </p>
              ) : last ? (
                <p className="text-muted">Kein Liniengewinn</p>
              ) : (
                <p className="text-subtle">Helme bauen Häuser. Der Wolf bläst sie um.</p>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center rounded-md border border-accent/25 bg-bg/70">
                <button type="button" className="size-11" disabled={busy || inFs || betIndex === 0} onClick={() => setBetIndex((i) => i - 1)} aria-label="Einsatz senken">
                  <Minus className="mx-auto size-4" />
                </button>
                <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
                <button
                  type="button"
                  className="size-11"
                  disabled={busy || inFs || betIndex === def.betSteps.length - 1}
                  onClick={() => setBetIndex((i) => i + 1)}
                  aria-label="Einsatz erhöhen"
                >
                  <Plus className="mx-auto size-4" />
                </button>
              </div>
              <button
                type="button"
                disabled={busy || phase === "blow"}
                onClick={() => runSpin()}
                className="relative ml-auto flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40 sm:size-[4.5rem]"
              >
                {busy ? "…" : inFs ? "Frei" : "Drehen"}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-md bg-bg/70 px-3 py-2">
                <p className="text-xs uppercase tracking-wider text-subtle">Gewinn</p>
                <p className="font-display text-xl tabular-nums text-accent">{displayWin ? formatEuro(displayWin) : "—"}</p>
              </div>
              <div className="rounded-md bg-bg/70 px-3 py-2">
                <p className="text-xs uppercase tracking-wider text-subtle">Guthaben</p>
                <p className="font-display text-xl tabular-nums text-fg">{formatEuro(balance)}</p>
              </div>
            </div>
            <NeedBankroll />
          </div>
        </div>
      </div>

      {phase === "wheel" && wheel ? (
        <JackpotWheel
          stake={bet}
          index={wheel.index}
          label={wheel.label}
          payout={wheel.payout}
          extraFs={wheel.extraFs}
          soundOn={soundOn}
          onDone={resolveWheel}
        />
      ) : null}

      {phase === "blow" && blowStep >= 3 ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg/70 px-4">
          <div className="w-full max-w-sm rounded-xl border border-accent bg-surface p-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Wolf</p>
            <p className="mt-2 font-display text-4xl text-fg">Häuser fallen</p>
            <p className="mt-4 font-display text-3xl tabular-nums text-accent">
              {formatEuro(housePays.reduce((s, n) => s + n, 0))}
            </p>
            <button type="button" className="mt-6 h-12 w-full rounded-md bg-accent font-semibold uppercase tracking-wider text-accent-fg" onClick={closeBonus}>
              Bonus beenden
            </button>
          </div>
        </div>
      ) : null}

      {celebrate ? (
        <WinCelebration
          payout={celebrate.payout}
          stake={celebrate.stake}
          tier={celebrate.tier}
          soundOn={soundOn}
          onDone={dismissWin}
        />
      ) : null}
    </div>
  );
}
