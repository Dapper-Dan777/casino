import { useMemo, useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { randInt } from "@/lib/casino/rng";
import { cn } from "@/lib/utils";

const SEG = [
  { id: "1", label: "1×", color: "#3a8aee", mult: 1 },
  { id: "2", label: "2×", color: "#3dcc6a", mult: 2 },
  { id: "5", label: "5×", color: "#e8c85a", mult: 5 },
  { id: "8", label: "8×", color: "#e23a2a", mult: 8 },
  { id: "10", label: "10×", color: "#b040e0", mult: 10 },
  { id: "15", label: "15×", color: "#3a8aee", mult: 15 },
  { id: "20", label: "20×", color: "#3dcc6a", mult: 20 },
  { id: "coin", label: "COIN", color: "#e8c85a", mult: 40 },
  { id: "40", label: "40×", color: "#e23a2a", mult: 40 },
  { id: "hunt", label: "HUNT", color: "#b040e0", bonus: 25 },
  { id: "2b", label: "2×", color: "#3a8aee", mult: 2 },
  { id: "5b", label: "5×", color: "#3dcc6a", mult: 5 },
] as const;

const STEPS = ORIGINAL_STEPS;

export function GluecksradView() {
  const [betI, setBetI] = useState(2);
  const bet = STEPS[betI] ?? 200;
  const [busy, setBusy] = useState(false);
  const [rot, setRot] = useState(0);
  const [hit, setHit] = useState<(typeof SEG)[number] | null>(null);
  const [last, setLast] = useState<number | null>(null);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  const slice = 360 / SEG.length;

  async function spin() {
    unlockAudio();
    if (busy) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Glücksrad")) return;
    setBusy(true);
    setHit(null);
    const idx = randInt(SEG.length);
    const extra = 5 + randInt(3);
    const target = extra * 360 + (360 - idx * slice - slice / 2);
    setRot(target);
    if (soundOn) sfx.wheel();
    window.setTimeout(() => {
      const seg = SEG[idx]!;
      setHit(seg);
      const paid = Math.round(bet * ("bonus" in seg && seg.bonus ? seg.bonus : "mult" in seg ? seg.mult : 1));
      if (paid > 0) creditWin(paid, "Glücksrad");
      setLast(paid);
      setBusy(false);
      if (soundOn) sfx.win(paid >= bet * 8);
    }, 4200);
  }

  const conic = useMemo(
    () =>
      SEG.map((s, i) => `${s.color} ${i * slice}deg ${(i + 1) * slice}deg`).join(", "),
    [slice],
  );

  return (
    <OriginalShell title="Glücksrad" subtitle="Live Show · 12 Felder · bis 40×" slug="gluecksrad">
      <div className="flex flex-col items-center">
        <div className="relative size-[min(86vw,22rem)]">
          <div className="absolute left-1/2 top-0 z-10 h-8 w-6 -translate-x-1/2 bg-[#e8c85a] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <div
            className="size-full rounded-full border-8 border-[#e8c85a] shadow-2xl"
            style={{
              background: `conic-gradient(${conic})`,
              transform: `rotate(${rot}deg)`,
              transition: busy ? "transform 4s cubic-bezier(0.12,0.7,0.1,1)" : "none",
            }}
          />
          <div className="absolute inset-[32%] grid place-items-center rounded-full bg-bg/90 font-display text-xl text-[#e8c85a]">
            {hit ? hit.label : "LIVE"}
          </div>
        </div>
        <p className="mt-4 min-h-6 text-center text-sm text-[#e8c85a]">
          {hit ? `${hit.label} · ${formatEuro(last ?? 0)}` : "Drehen — Zahl oder Bonusfeld"}
        </p>
        <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy} onPlay={() => void spin()} label={busy ? "Dreht…" : "Drehen"} />
        <ResultBar last={last} bet={bet} />
      </div>
    </OriginalShell>
  );
}
