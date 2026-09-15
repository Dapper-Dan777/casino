import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { dicePay, rollDice } from "@/lib/casino/instant";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

export function DiceView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [target, setTarget] = useState(50);
  const [over, setOver] = useState(true);
  const [roll, setRoll] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  const chance = over ? 100 - target : target;
  const mult = chance > 1 && chance < 98 ? 99 / chance : 0;

  async function play() {
    unlockAudio();
    if (busy) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Würfel")) return;
    setBusy(true);
    if (soundOn) sfx.spin();
    for (let i = 0; i < 8; i++) {
      setRoll(rollDice());
      await new Promise((r) => setTimeout(r, 50));
    }
    const r = rollDice();
    setRoll(r);
    const paid = dicePay(r, target, over, bet);
    setLast(paid);
    if (paid > 0) {
      creditWin(paid, "Würfel");
      if (soundOn) sfx.win(paid >= bet * 5);
    } else if (soundOn) sfx.lose();
    setBusy(false);
  }

  return (
    <OriginalShell title="Würfel" subtitle="Über / Unter · 99 % Auszahlung" slug="wuerfel">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Wurf</p>
        <p className={cn("font-display text-6xl tabular-nums", last != null && last > 0 ? "text-win" : "text-fg")}>
          {roll == null ? "—" : roll.toFixed(2)}
        </p>
        <p className="mt-2 text-sm text-muted">
          {over ? "Über" : "Unter"} {target.toFixed(2)} · {mult.toFixed(2)}× · {chance.toFixed(0)} %
        </p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setOver(false)}
          className={cn("h-11 flex-1 rounded-md text-sm font-semibold", !over ? "bg-accent text-accent-fg" : "bg-elevated text-muted")}
        >
          Unter
        </button>
        <button
          type="button"
          onClick={() => setOver(true)}
          className={cn("h-11 flex-1 rounded-md text-sm font-semibold", over ? "bg-accent text-accent-fg" : "bg-elevated text-muted")}
        >
          Über
        </button>
      </div>
      <label className="mt-4 block">
        <span className="text-xs uppercase tracking-wider text-muted">Ziel {target.toFixed(0)}</span>
        <input
          type="range"
          min={2}
          max={98}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          disabled={busy}
          className="mt-2 w-full accent-[var(--color-accent)]"
        />
      </label>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy} onPlay={() => void play()} label="Würfeln" />
      <ResultBar last={last} bet={bet} />
    </OriginalShell>
  );
}
