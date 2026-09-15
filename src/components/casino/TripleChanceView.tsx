import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { ReelBank, REEL_PAD, REEL_STOP_MS, REEL_TURBO_MS, type ReelCol } from "./ReelBank";
import { MerkurRisk } from "./MerkurRisk";
import { Paytable } from "./Paytable";
import {
  SLOT_DEFS,
  evaluateSpin,
  randomPad,
  randomSymbol,
  spinGrid,
  type SlotSymbol,
  type SpinResult,
} from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { formatLed, ledGhost } from "@/lib/casino/merkur";
import { sfx, startBed, startRumble, stopBed, stopRumble, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, Info, Minus, Plus } from "lucide-react";

const SLUG = "triple-chance";

export function TripleChanceView() {
  const def = SLOT_DEFS[SLUG]!;
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);

  const [betIndex, setBetIndex] = useState(1);
  const [reels, setReels] = useState<ReelCol[]>(() =>
    Array.from({ length: 3 }, (_, i) => ({
      strip: [def.symbols[i]!, def.symbols[(i + 1) % def.symbols.length]!, def.symbols[(i + 2) % def.symbols.length]!],
      offset: 0,
      spinning: false,
      settleMs: REEL_STOP_MS[i] ?? 1200,
    })),
  );
  const [busy, setBusy] = useState(false);
  const [held, setHeld] = useState<boolean[]>([false, false, false]);
  const [canHold, setCanHold] = useState(false);
  const [last, setLast] = useState<SpinResult | null>(null);
  const [displayWin, setDisplayWin] = useState(0);
  const [spinKey, setSpinKey] = useState(0);
  const [gamble, setGamble] = useState<number | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [cycle, setCycle] = useState(0);
  const gridRef = useRef<SlotSymbol[][] | null>(null);
  const timers = useRef<number[]>([]);

  const bet = def.betSteps[betIndex] ?? 50;

  useEffect(() => {
    touchGame(SLUG);
  }, [touchGame]);

  useEffect(() => {
    if (!soundOn) return;
    startBed(98);
    return () => stopBed();
  }, [soundOn]);

  useEffect(() => () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    stopRumble();
    stopBed();
  }, []);

  const winCells = useMemo(() => {
    const set = new Set<string>();
    const wins = last?.lineWins ?? [];
    if (!wins.length) return set;
    const w = wins[cycle % wins.length]!;
    w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`));
    return set;
  }, [last, cycle]);

  useEffect(() => {
    if (!last?.lineWins.length) return;
    const t = window.setInterval(() => setCycle((n) => n + 1), 900);
    return () => window.clearInterval(t);
  }, [last]);

  function runSpin(fromHold = false) {
    unlockAudio();
    if (busy) return;
    if (!fromHold) {
      if (balance < bet) {
        setCashier(true);
        return;
      }
      if (!placeBet(bet, "Triple Chance · Einsatz")) return;
      setHeld([false, false, false]);
    }
    if (soundOn) sfx.spin();
    startRumble();
    setBusy(true);
    setLast(null);
    setDisplayWin(0);
    setGamble(null);
    setCanHold(false);
    setSpinKey((k) => k + 1);

    const prev = gridRef.current;
    const raw = spinGrid(def);
    if (fromHold && prev) {
      held.forEach((h, i) => {
        if (h) raw[i] = prev[i]!.slice();
      });
    }
    gridRef.current = raw;
    const times = (fromHold ? REEL_TURBO_MS : REEL_STOP_MS).slice(0, 3);
    setReels(
      raw.map((col, i) => ({
        strip: [...randomPad(def, REEL_PAD), ...col, randomSymbol(def, false)],
        offset: REEL_PAD,
        spinning: fromHold ? !held[i] : true,
        settleMs: times[i] ?? 1200,
      })),
    );

    const maxT = Math.max(...times);
    const t = window.setTimeout(() => {
      stopRumble();
      setReels((cols) => cols.map((c) => ({ ...c, spinning: false })));
      if (soundOn) sfx.stop(2);
      const result = evaluateSpin(def, raw, bet, 1);
      setLast(result);
      setBusy(false);
      if (!fromHold) {
        setCanHold(true);
        setHeld(suggestHold(raw));
        if (result.totalPayout > 0) setDisplayWin(result.totalPayout);
        return;
      }
      finish(result);
    }, maxT);
    timers.current.push(t);
  }

  function finish(result: SpinResult) {
    setCanHold(false);
    setHeld([false, false, false]);
    if (result.totalPayout > 0) {
      setGamble(result.totalPayout);
      setDisplayWin(result.totalPayout);
      if (soundOn) sfx.win(result.totalPayout >= bet * 8);
    } else if (soundOn) sfx.lose();
  }

  function takeFirst() {
    const result = last;
    if (!result || result.totalPayout <= 0) {
      runSpin(true);
      return;
    }
    finish(result);
  }

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-chance sm:-mx-6">
      <img src="/games/triple-chance.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="relative z-20 mx-auto flex max-w-[28rem] flex-col px-2 pb-10 pt-2 sm:px-4">
        <div className="mb-2 flex items-center gap-2">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--slot-line,#ffd45e)]">Hold · Risiko · Leiter</p>
            <h1 className="font-display text-3xl text-fg">Triple Chance</h1>
          </div>
          <button type="button" className="inline-flex size-11 items-center justify-center text-muted" aria-label="Gewinntabelle" onClick={() => setPayOpen(true)}>
            <Info className="size-4" />
          </button>
        </div>

        <div className="slot-bezel slot-skin-chance">
          <div className="slot-cabinet">
            <p className="mb-2 text-center text-[11px] uppercase tracking-wider text-muted">3 Walzen · Halten · Gewinnleiter</p>
            <ReelBank reels={reels} spinKey={spinKey} busy={busy} winCells={winCells} variant="hold" size="lg" />
            {canHold ? (
              <div className="mt-2 grid grid-cols-3 gap-1">
                {held.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    className={cn(
                      "h-11 rounded-md text-xs uppercase tracking-wider",
                      h ? "bg-[var(--slot-spin,#e11d2e)] text-[var(--slot-spin-fg,#fff8f6)]" : "border border-[color-mix(in_oklab,var(--slot-line,#ffd45e)_40%,transparent)] bg-bg/70 text-fg",
                    )}
                    onClick={() => setHeld((v) => v.map((x, idx) => (idx === i ? !x : x)))}
                  >
                    {h ? "Gehalten" : "Halten"}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mt-3 min-h-6 text-center text-sm">
              {last && last.totalPayout > 0 ? (
                <p className="text-win">
                  Linie {(last.lineWins[cycle % last.lineWins.length]?.line ?? 0) + 1} · {formatEuro(last.lineWins[cycle % last.lineWins.length]?.payout ?? last.totalPayout)}
                </p>
              ) : last ? (
                <p className="text-muted">Kein Gewinn</p>
              ) : (
                <p className="text-subtle">Walzen halten, dann nachdrehen.</p>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center rounded-md border border-[color-mix(in_oklab,var(--slot-line,#ffd45e)_35%,transparent)] bg-bg/70">
                <button type="button" className="size-11" disabled={busy || canHold || betIndex === 0} onClick={() => setBetIndex((i) => i - 1)} aria-label="Einsatz senken">
                  <Minus className="mx-auto size-4" />
                </button>
                <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
                <button type="button" className="size-11" disabled={busy || canHold || betIndex === def.betSteps.length - 1} onClick={() => setBetIndex((i) => i + 1)} aria-label="Einsatz erhöhen">
                  <Plus className="mx-auto size-4" />
                </button>
              </div>
              {canHold ? (
                <>
                  <button type="button" className="h-11 rounded-md border border-[color-mix(in_oklab,var(--slot-line,#ffd45e)_40%,transparent)] px-3 text-xs uppercase tracking-wider" onClick={takeFirst}>
                    {last && last.totalPayout > 0 ? "Nehmen" : "Ohne Halt"}
                  </button>
                  <button type="button" className="ml-auto h-12 rounded-md bg-[var(--slot-spin,#e11d2e)] px-4 text-sm font-semibold uppercase tracking-wider text-[var(--slot-spin-fg,#fff8f6)]" onClick={() => runSpin(true)}>
                    Nachdrehen
                  </button>
                </>
              ) : (
                <button type="button" disabled={busy || balance < bet} onClick={() => runSpin(false)} className="relative ml-auto flex size-16 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40">
                  {busy ? "…" : "Drehen"}
                </button>
              )}
            </div>
            <div className="mt-3">
              <div className="merkur-leds">
                <div className={cn("merkur-led", displayWin > 0 && "is-lit")}>
                  <p className="merkur-led-label">CREDIT</p>
                  <p className="merkur-led-readout">
                    <span className="risk-led-ghost" aria-hidden>{ledGhost(formatLed(balance))}</span>
                    <span className="risk-led-val">{formatLed(balance)}</span>
                  </p>
                </div>
                <div className="merkur-led">
                  <p className="merkur-led-label">BET</p>
                  <p className="merkur-led-readout">
                    <span className="risk-led-ghost" aria-hidden>{ledGhost(formatLed(bet))}</span>
                    <span className="risk-led-val">{formatLed(bet)}</span>
                  </p>
                </div>
                <div className={cn("merkur-led", displayWin > 0 && "is-lit")}>
                  <p className="merkur-led-label">WIN</p>
                  <p className="merkur-led-readout">
                    <span className="risk-led-ghost" aria-hidden>{ledGhost(formatLed(displayWin))}</span>
                    <span className="risk-led-val">{formatLed(displayWin)}</span>
                  </p>
                </div>
              </div>
            </div>
            <NeedBankroll />
          </div>
        </div>
      </div>

      {gamble != null ? (
        <MerkurRisk
          key={gamble}
          amount={gamble}
          soundOn={soundOn}
          onBank={(cents) => {
            creditWin(cents, "Triple Chance · Hälfte");
          }}
          onCollect={(cents) => {
            if (cents > 0) creditWin(cents, "Triple Chance · Risiko");
            setDisplayWin(cents);
            setGamble(null);
          }}
          onBust={() => {
            setGamble(null);
            setDisplayWin(0);
          }}
        />
      ) : null}
      <Paytable open={payOpen} onOpenChange={setPayOpen} def={def} stake={bet} name="Triple Chance" />
    </div>
  );
}

function suggestHold(grid: SlotSymbol[][]): boolean[] {
  const hold = [false, false, false];
  const mid = [0, 1, 2].map((i) => grid[i]![1]!);
  if (mid[0]!.id === mid[1]!.id) {
    hold[0] = true;
    hold[1] = true;
  }
  if (mid[1]!.id === mid[2]!.id) {
    hold[1] = true;
    hold[2] = true;
  }
  if (mid[0]!.id === mid[2]!.id) {
    hold[0] = true;
    hold[2] = true;
  }
  return hold;
}
