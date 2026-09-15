import { useMemo, useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { fisherYates } from "@/lib/casino/rng";
import { cn } from "@/lib/utils";

const PAY: Record<number, number> = { 0: 0, 1: 0, 2: 1, 3: 2, 4: 5, 5: 12, 6: 30, 7: 80, 8: 200, 9: 500, 10: 1000 };
const STEPS = ORIGINAL_STEPS;

export function KenoView() {
  const [betI, setBetI] = useState(1);
  const bet = STEPS[betI] ?? 100;
  const [picks, setPicks] = useState<number[]>([]);
  const [drawn, setDrawn] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  const hits = useMemo(() => picks.filter((n) => drawn.includes(n)).length, [picks, drawn]);

  function toggle(n: number) {
    if (busy) return;
    setPicks((p) => (p.includes(n) ? p.filter((x) => x !== n) : p.length >= 10 ? p : [...p, n]));
  }

  async function play() {
    unlockAudio();
    if (busy || picks.length < 2) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Keno")) return;
    setBusy(true);
    setDrawn([]);
    const balls = fisherYates(Array.from({ length: 80 }, (_, i) => i + 1)).slice(0, 20);
    for (let i = 0; i < balls.length; i++) {
      await new Promise((r) => setTimeout(r, 70));
      setDrawn(balls.slice(0, i + 1));
      if (soundOn && i % 2 === 0) sfx.coin();
    }
    const hit = picks.filter((n) => balls.includes(n)).length;
    const paid = Math.round(bet * (PAY[hit] ?? 0));
    if (paid > 0) creditWin(paid, "Keno");
    setLast(paid);
    setBusy(false);
    if (soundOn) sfx.win(paid >= bet * 8);
  }

  return (
    <OriginalShell title="Keno" subtitle="2–10 Zahlen · 20 Kugeln" slug="keno">
      <div className="grid grid-cols-10 gap-1">
        {Array.from({ length: 80 }, (_, i) => i + 1).map((n) => {
          const on = picks.includes(n);
          const hit = drawn.includes(n) && on;
          const ball = drawn.includes(n);
          return (
            <button
              key={n}
              type="button"
              disabled={busy}
              onClick={() => toggle(n)}
              className={cn(
                "aspect-square rounded-sm text-xs tabular-nums",
                hit ? "bg-[#e8c85a] text-[#1a1408]" : ball ? "bg-elevated text-muted" : on ? "bg-accent text-accent-fg" : "bg-surface text-fg",
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-sm text-muted">
        {picks.length} gewählt · {drawn.length ? `${hits} Treffer` : "Wähle 2–10 Zahlen"}
      </p>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy} onPlay={() => void play()} label={busy ? "Zieht…" : "Ziehen"} />
      <ResultBar last={last} bet={bet} />
    </OriginalShell>
  );
}
