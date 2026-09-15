import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { limboPay, limboResult } from "@/lib/casino/instant";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

export function LimboView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [target, setTarget] = useState(2);
  const [shown, setShown] = useState(1);
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const [hit, setHit] = useState<boolean | null>(null);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  async function play() {
    unlockAudio();
    if (busy) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Schwelle")) return;
    setBusy(true);
    setHit(null);
    if (soundOn) sfx.spin();
    const result = limboResult();
    const cap = Math.min(result, 40);
    const steps = 18;
    for (let i = 1; i <= steps; i++) {
      setShown(1 + ((cap - 1) * i) / steps);
      await new Promise((r) => setTimeout(r, 40));
    }
    setShown(result);
    const paid = limboPay(result, target, bet);
    setLast(paid);
    setHit(paid > 0);
    if (paid > 0) {
      creditWin(paid, "Schwelle");
      if (soundOn) sfx.win(paid >= bet * 8);
    } else if (soundOn) sfx.lose();
    setBusy(false);
  }

  return (
    <OriginalShell title="Schwelle" subtitle="Ziel-Multi · sofort" slug="schwelle">
      <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-8 text-center">
        <div className="limbo-line" style={{ transform: `scaleY(${Math.min(1, shown / 20)})` }} />
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Ergebnis</p>
        <p className={cn("font-display text-6xl tabular-nums", hit ? "text-win" : hit === false ? "text-loss" : "text-fg")}>
          {shown.toFixed(2)}×
        </p>
        <p className="mt-2 text-sm text-muted">Ziel {target.toFixed(2)}× · Einsatz {formatEuro(bet)}</p>
      </div>
      <label className="mt-4 block">
        <span className="text-xs uppercase tracking-wider text-muted">Ziel {target.toFixed(2)}×</span>
        <input
          type="range"
          min={1.01}
          max={20}
          step={0.01}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          disabled={busy}
          className="mt-2 w-full accent-[var(--color-accent)]"
        />
      </label>
      <div className="mt-2 flex gap-2">
        {[1.5, 2, 3, 10].map((n) => (
          <button key={n} type="button" className="h-10 flex-1 rounded-md bg-elevated text-sm" onClick={() => setTarget(n)}>
            {n.toFixed(1)}×
          </button>
        ))}
      </div>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy} onPlay={() => void play()} label="Start" />
      <ResultBar last={last} bet={bet} />
    </OriginalShell>
  );
}
