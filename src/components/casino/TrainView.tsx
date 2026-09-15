import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { WinCelebration } from "./WinCelebration";
import {
  applyCollectors,
  countCash,
  leftoverCash,
  spinTrainBase,
  spinTrainBonusCell,
  TRAIN_CAP,
  TRAIN_COLS,
  TRAIN_LABEL,
  TRAIN_RESPINS,
  TRAIN_ROWS,
  TRAIN_TRIGGER,
  type TrainCell,
} from "@/lib/casino/train";
import { winTier, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx, startBed, stopBed, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, Minus, Plus } from "lucide-react";

const STEPS = [20, 50, 100, 200, 500, 1000, 2500];
const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

export function TrainView() {
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);
  const [betI, setBetI] = useState(2);
  const bet = STEPS[betI] ?? 100;
  const [grid, setGrid] = useState<TrainCell[][]>(() => spinTrainBase());
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState(0);
  const [paid, setPaid] = useState(0);
  const [bonus, setBonus] = useState(false);
  const [persist, setPersist] = useState(0);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const lock = useRef(false);
  const pity = useRef(0);

  useEffect(() => {
    touchGame("schatzzug");
    startBed(55);
    return () => stopBed();
  }, [touchGame]);

  const runBonus = useCallback(
    async (start: TrainCell[][], stake: number) => {
      setBonus(true);
      let g: TrainCell[][] = start.map((col) => col.map((c) => ({ ...c, lock: c.kind !== "empty" })));
      setGrid(g);
      let respins = TRAIN_RESPINS;
      let plus = 0;
      let total = 0;
      setLeft(respins);
      setPersist(0);
      while (respins > 0) {
        await wait(480);
        let landed = false;
        const next = g.map((col) =>
          col.map((cell) => {
            if (cell.kind !== "empty") return cell;
            const n = spinTrainBonusCell();
            if (n.kind !== "empty") landed = true;
            return n;
          }),
        );
        g = next;
        setGrid(g);
        if (landed) {
          respins = TRAIN_RESPINS;
          if (soundOn) sfx.coin();
        } else {
          respins -= 1;
        }
        plus = 0;
        for (const col of g) for (const cell of col) if (cell.kind === "plus") plus += 1;
        setPersist(plus);
        const { grid: after, collected } = applyCollectors(g, plus);
        g = after;
        setGrid(g);
        if (collected > 0) {
          total += Math.round(stake * collected);
          setPaid(total);
          if (soundOn) sfx.explode();
        }
        setLeft(respins);
        const full = countCash(g) >= TRAIN_COLS * TRAIN_ROWS;
        if (full) break;
      }
      const rest = leftoverCash(g);
      total += Math.round(stake * rest);
      total = Math.min(stake * TRAIN_CAP, total);
      setPaid(total);
      setBonus(false);
      return total;
    },
    [soundOn],
  );

  const run = useCallback(
    async (buy = false) => {
      if (lock.current) return;
      unlockAudio();
      const cost = buy ? bet * 100 : bet;
      if (!placeBet(cost, buy ? "Schatzzug · Bonus" : "Schatzzug")) {
        setCashier(true);
        return;
      }
      lock.current = true;
      setBusy(true);
      setPaid(0);
      if (soundOn) sfx.spin();
      pity.current += 1;
      const force = buy || pity.current >= 12;
      if (force) pity.current = 0;
      const g = spinTrainBase(force);
      setGrid(g);
      await wait(360);
      let total = 0;
      if (countCash(g) >= TRAIN_TRIGGER) {
        if (soundOn) sfx.scatter();
        total = await runBonus(g, bet);
      }
      if (total > 0) {
        creditWin(total, "Schatzzug");
        const tier = winTier(total, bet);
        if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({ payout: total, stake: bet, tier });
        if (soundOn) sfx.win(total >= bet * 8);
      } else if (soundOn) sfx.lose();
      lock.current = false;
      setBusy(false);
    },
    [bet, creditWin, placeBet, runBonus, setCashier, soundOn],
  );

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-train sm:-mx-6">
      <img src="/games/schatzzug.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" />
      <div className="relative mx-auto max-w-xl px-4 pb-28 pt-4 sm:px-6">
        <div className="mb-4 flex items-center gap-3">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl">Schatzzug</h1>
            <p className="text-xs text-[#e8c85a]">Hold & Collect · {TRAIN_TRIGGER} Münzen · 3 Nachdreher</p>
          </div>
          {bonus ? (
            <span className="ml-auto rounded-md bg-[#e23a2a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
              {left} · +{persist}
            </span>
          ) : null}
        </div>

        <div className="train-board">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: TRAIN_ROWS }, (_, row) =>
              Array.from({ length: TRAIN_COLS }, (_, c) => {
                const cell = grid[c]![row]!;
                return (
                  <div key={`${c}-${row}`} className={cn("train-cell", cell.kind !== "empty" && "is-lock", `is-${cell.kind}`)}>
                    {cell.kind === "cash" ? (
                      <>
                        <img src="/games/sym/train-coin.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
                        <span className="relative z-[1] font-display text-lg tabular-nums">{cell.mult}×</span>
                      </>
                    ) : cell.kind !== "empty" ? (
                      <>
                        <img src="/games/sym/train-sammler.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
                        <span className="relative z-[1] text-[10px] font-semibold uppercase tracking-wider">{TRAIN_LABEL[cell.kind]}</span>
                      </>
                    ) : null}
                  </div>
                );
              }),
            )}
          </div>
        </div>
        <p className="mt-3 text-center text-sm tabular-nums text-muted">
          {countCash(grid)} belegt · {formatEuro(paid)} · max {TRAIN_CAP.toLocaleString("de-DE")}×
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-md border border-[#c43a2a]/40 bg-bg/70">
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
            onClick={() => void run(true)}
            className="h-11 rounded-md border border-[#e23a2a]/50 px-3 text-xs font-semibold uppercase tracking-wider text-[#ffb0a0] disabled:opacity-40"
          >
            Bonus {formatEuro(bet * 100)}
          </button>
          <button
            type="button"
            disabled={busy || balance < bet}
            onClick={() => void run(false)}
            className="ml-auto h-12 min-w-32 rounded-md bg-[#e23a2a] px-6 text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-40"
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
