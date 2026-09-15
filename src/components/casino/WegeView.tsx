import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { WinCelebration } from "./WinCelebration";
import {
  dropMega,
  evalMega,
  megaFsAward,
  MEGA_CAP,
  MEGA_MAX,
  spinMega,
  type MegaGrid,
} from "@/lib/casino/megaways";
import { winTier, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx, startBed, stopBed, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, Minus, Plus } from "lucide-react";

const STEPS = [20, 50, 100, 200, 500, 1000, 2500];
const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export function WegeView() {
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);
  const [betI, setBetI] = useState(2);
  const bet = STEPS[betI] ?? 100;
  const [grid, setGrid] = useState<MegaGrid>(() => spinMega());
  const [hit, setHit] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(0);
  const [ways, setWays] = useState(0);
  const [fs, setFs] = useState(0);
  const [fsMult, setFsMult] = useState(1);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const lock = useRef(false);
  const pity = useRef(0);

  useEffect(() => {
    touchGame("wegeflut");
    startBed(70);
    return () => stopBed();
  }, [touchGame]);

  const tumble = useCallback(
    async (start: MegaGrid, stake: number, mult: number) => {
      let g = start;
      let total = 0;
      let m = mult;
      for (let i = 0; i < 12; i++) {
        const ev = evalMega(g, stake, m);
        setWays(ev.ways);
        if (!ev.wins.length) {
          if (i === 0 && ev.payout > 0) total += ev.payout;
          break;
        }
        const keys = new Set(ev.wins.flatMap((w) => w.cells));
        setHit(keys);
        total += ev.payout;
        setPaid(total);
        if (soundOn) sfx.explode();
        await wait(420);
        g = dropMega(g, keys);
        setHit(new Set());
        setGrid(g);
        if (fs > 0 || mult > 1) m += 1;
        setFsMult(m);
        if (soundOn) sfx.tumble();
        await wait(220);
      }
      const last = evalMega(g, stake, m);
      const award = megaFsAward(last.scatter);
      return { total, award, scatter: last.scatter };
    },
    [fs, soundOn],
  );

  const run = useCallback(
    async (isFree = false, buy = false) => {
      if (lock.current) return;
      unlockAudio();
      const cost = buy ? bet * 100 : bet;
      if (!isFree) {
        if (!placeBet(cost, buy ? "Wegeflut · Bonus" : "Wegeflut")) {
          setCashier(true);
          return;
        }
      }
      lock.current = true;
      setBusy(true);
      setPaid(0);
      if (soundOn) sfx.spin();
      pity.current += isFree ? 0 : 1;
      const force = buy || (!isFree && pity.current >= 14) ? 4 : 0;
      if (force) pity.current = 0;
      for (let k = 0; k < 5; k++) {
        setGrid(spinMega());
        await wait(70);
      }
      let g = spinMega(force);
      setGrid(g);
      await wait(180);
      const { total, award } = await tumble(g, bet, isFree ? fsMult : 1);
      if (award && !isFree) {
        setFs(award);
        setFsMult(1);
        if (soundOn) sfx.scatter();
      }
      if (total > 0) {
        creditWin(total, "Wegeflut");
        const tier = winTier(total, bet);
        if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({ payout: total, stake: bet, tier });
        if (soundOn) sfx.win(total >= bet * 8);
      } else if (soundOn) sfx.lose();
      lock.current = false;
      setBusy(false);
      if (isFree) {
        setFs((n) => {
          const left = Math.max(0, n - 1);
          if (left > 0) window.setTimeout(() => void run(true), 420);
          return left;
        });
      } else if (award) {
        window.setTimeout(() => void run(true), 700);
      }
    },
    [bet, creditWin, fsMult, placeBet, setCashier, soundOn, tumble],
  );

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-mega sm:-mx-6">
      <img src="/games/wegeflut.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
      <div className="relative mx-auto max-w-3xl px-4 pb-28 pt-4 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl">Wegeflut</h1>
            <p className="text-xs text-[#e8c85a]">6 Walzen · 2–7 hoch · bis {MEGA_CAP.toLocaleString("de-DE")}×</p>
          </div>
          {fs > 0 ? (
            <span className="ml-auto rounded-md bg-[#e8c85a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a1408]">
              FS {fs} · ×{fsMult}
            </span>
          ) : null}
        </div>

        <div className="mega-board">
          <div className="flex items-end gap-1" style={{ minHeight: `calc(var(--mega-cell) * ${MEGA_MAX})` }}>
            {grid.map((col, ri) => (
              <div key={ri} className="flex flex-1 flex-col-reverse gap-1">
                {col.map((s, row) => (
                  <div
                    key={`${ri}-${row}`}
                    className={cn("mega-cell", hit.has(`${ri}-${row}`) && "is-hit", s.kind === "scatter" && "is-scatter", s.kind === "wild" && "is-wild")}
                  >
                    <img src={s.art} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-center text-sm tabular-nums text-muted">
          {ways.toLocaleString("de-DE")} Wege · {formatEuro(paid)}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-md border border-[#c9a227]/40 bg-bg/70">
            <button type="button" className="size-11" disabled={busy || betI === 0} onClick={() => setBetI((i) => Math.max(0, i - 1))} aria-label="Einsatz senken">
              <Minus className="mx-auto size-4" />
            </button>
            <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
            <button type="button" className="size-11" disabled={busy || betI === STEPS.length - 1} onClick={() => setBetI((i) => Math.min(STEPS.length - 1, i + 1))} aria-label="Einsatz erhöhen">
              <Plus className="mx-auto size-4" />
            </button>
          </div>
          <button
            type="button"
            disabled={busy || balance < bet * 100}
            onClick={() => void run(false, true)}
            className="h-11 rounded-md border border-[#c9a227]/50 px-3 text-xs font-semibold uppercase tracking-wider text-[#e8c85a] disabled:opacity-40"
          >
            Bonus {formatEuro(bet * 100)}
          </button>
          <button
            type="button"
            disabled={busy || balance < bet}
            onClick={() => void run(false)}
            className="ml-auto h-12 min-w-32 rounded-md bg-[#e8c85a] px-6 text-sm font-semibold uppercase tracking-wider text-[#1a1408] disabled:opacity-40"
          >
            {busy ? "…" : "Drehen"}
          </button>
        </div>
      </div>
      {celebrate ? <WinCelebration variant="pragmatic" soundOn={soundOn} {...celebrate} onDone={() => setCelebrate(null)} /> : null}
      <NeedBankroll />
    </div>
  );
}
