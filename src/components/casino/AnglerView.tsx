import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { Paytable } from "./Paytable";
import { ReelBank, REEL_PAD, REEL_STOP_PRAG, type ReelCol } from "./ReelBank";
import { WinCelebration } from "./WinCelebration";
import { collectFish, FISH_DEF } from "@/lib/casino/fish";
import { evaluateSpin, paintStrip, spinGrid, winTier, type SpinResult, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx, startBed, startRumble, stopBed, stopRumble, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { ChevronLeft, Info, Minus, Plus } from "lucide-react";

const def = FISH_DEF;

function empty(): ReelCol[] {
  const g = spinGrid(def);
  return g.map((col, i) => ({ strip: paintStrip(def, col, i, REEL_PAD), offset: REEL_PAD, spinning: false, settleMs: 0 }));
}

export function AnglerView() {
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);
  const [betI, setBetI] = useState(() => def.betSteps.indexOf(def.defaultBet));
  const bet = def.betSteps[Math.max(0, betI)] ?? def.defaultBet;
  const [reels, setReels] = useState<ReelCol[]>(empty);
  const [busy, setBusy] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const [last, setLast] = useState<SpinResult | null>(null);
  const [inFs, setInFs] = useState(false);
  const [left, setLeft] = useState(0);
  const [total, setTotal] = useState(10);
  const [caught, setCaught] = useState(0);
  const [payOpen, setPayOpen] = useState(false);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const spinning = useRef(false);

  useEffect(() => {
    touchGame("raubfisch");
    startBed(90);
    return () => stopBed();
  }, [touchGame]);

  const winCells = useMemo(() => {
    const s = new Set<string>();
    last?.lineWins.forEach((w) => w.cells.forEach((c) => s.add(`${c.reel}-${c.row}`)));
    return s;
  }, [last]);

  const run = useCallback(
    async (isFree = false) => {
      if (spinning.current) return;
      unlockAudio();
      if (!isFree) {
        if (!placeBet(bet, "Raubfisch")) {
          setCashier(true);
          return;
        }
      }
      spinning.current = true;
      setBusy(true);
      if (soundOn) {
        sfx.spin();
        startRumble();
      }
      const grid = spinGrid(def, !isFree && Math.random() < 0.08 ? 3 : 0);
      setSpinKey((k) => k + 1);
      const stops = REEL_STOP_PRAG;
      setReels(grid.map((col, i) => ({ strip: paintStrip(def, col, i, REEL_PAD), offset: REEL_PAD, spinning: true, settleMs: stops[i]! })));
      await new Promise((r) => setTimeout(r, Math.max(...stops)));
      stopRumble();
      setReels((cols) => cols.map((c) => ({ ...c, spinning: false })));
      const result = evaluateSpin(def, grid, bet, 1);
      let extra = 0;
      if (isFree) {
        const haul = collectFish(grid, bet);
        extra = haul.cash;
        setCaught((n) => n + extra);
        if (haul.wilds && soundOn) sfx.bonus();
      }
      const paid = result.totalPayout + extra;
      setLast({ ...result, totalPayout: paid });
      if (paid > 0) {
        creditWin(paid, "Raubfisch");
        const tier = winTier(paid, bet);
        if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({ payout: paid, stake: bet, tier });
        if (soundOn) sfx.win(paid >= bet * 8);
      } else if (soundOn) sfx.lose();

      if (!isFree && result.freeSpinsAwarded) {
        setInFs(true);
        setLeft(result.freeSpinsAwarded);
        setTotal(result.freeSpinsAwarded);
        setCaught(0);
        if (soundOn) sfx.bonus();
      } else if (isFree) {
        setLeft((n) => Math.max(0, n - 1));
      }
      spinning.current = false;
      setBusy(false);
    },
    [bet, creditWin, placeBet, setCashier, soundOn],
  );

  useEffect(() => {
    if (busy || celebrate) return;
    if (inFs && left > 0) {
      const t = window.setTimeout(() => void run(true), 700);
      return () => window.clearTimeout(t);
    }
    if (inFs && left <= 0) setInFs(false);
  }, [busy, celebrate, inFs, left, run]);

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-fish sm:-mx-6">
      <img src="/games/raubfisch.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-[#041018]/75" />
      <div className="relative z-20 mx-auto flex max-w-[42rem] flex-col px-2 pb-10 pt-2 sm:px-4">
        <div className="mb-2 flex items-center gap-2">
          <Link to="/" className="inline-flex size-11 items-center justify-center text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#7ad0c8]">10 Linien · Fische sammeln</p>
            <h1 className="font-display text-3xl">Raubfisch</h1>
          </div>
          <button type="button" className="size-11 text-muted" aria-label="Gewinntabelle" onClick={() => setPayOpen(true)}>
            <Info className="size-4 mx-auto" />
          </button>
        </div>
        <div className="slot-bezel slot-skin-fish">
          <div className="slot-cabinet">
            <p className="mb-2 text-center text-[11px] uppercase tracking-wider text-[#7ad0c8]">
              {inFs ? `Bonus ${total - left + (busy ? 0 : 1)} / ${total} · Fang ${formatEuro(caught)}` : "3× Kiste = 10 Freispiele · Angler sammelt Fische"}
            </p>
            <ReelBank reels={reels} spinKey={spinKey} busy={busy} winCells={winCells} variant="deep" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center rounded-md border border-[#7ad0c8]/30 bg-bg/70">
                <button type="button" className="size-11" disabled={busy || inFs || betI === 0} onClick={() => setBetI((i) => Math.max(0, i - 1))} aria-label="Einsatz senken">
                  <Minus className="mx-auto size-4" />
                </button>
                <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
                <button type="button" className="size-11" disabled={busy || inFs || betI === def.betSteps.length - 1} onClick={() => setBetI((i) => Math.min(def.betSteps.length - 1, i + 1))} aria-label="Einsatz erhöhen">
                  <Plus className="mx-auto size-4" />
                </button>
              </div>
              <button type="button" disabled={busy || (!inFs && balance < bet)} onClick={() => void run(false)} className="ml-auto flex size-16 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase slot-spin-btn disabled:opacity-40">
                {busy ? "…" : inFs ? "Frei" : "Drehen"}
              </button>
            </div>
            <NeedBankroll />
          </div>
        </div>
      </div>
      {celebrate ? <WinCelebration payout={celebrate.payout} stake={celebrate.stake} tier={celebrate.tier} soundOn={soundOn} variant="pragmatic" onDone={() => setCelebrate(null)} /> : null}
      <Paytable open={payOpen} onOpenChange={setPayOpen} def={def} stake={bet} name="Raubfisch" />
    </div>
  );
}
