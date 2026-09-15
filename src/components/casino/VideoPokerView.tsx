import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { PlayingCardFace } from "./PlayingCard";
import { dealVideoPoker, drawVideoPoker, evalVideoPoker, VP_TABLE, type VpHandName } from "@/lib/casino/videopoker";
import { type PlayingCard } from "@/lib/casino/cards";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

export function VideoPokerView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [hand, setHand] = useState<PlayingCard[]>([]);
  const [rest, setRest] = useState<PlayingCard[]>([]);
  const [held, setHeld] = useState<boolean[]>([false, false, false, false, false]);
  const [phase, setPhase] = useState<"idle" | "hold" | "done">("idle");
  const [name, setName] = useState<VpHandName | null>(null);
  const [last, setLast] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  async function deal() {
    unlockAudio();
    if (busy) return;
    if (phase === "hold") {
      setBusy(true);
      if (soundOn) sfx.spin();
      await new Promise((r) => setTimeout(r, 280));
      const next = drawVideoPoker(hand, held, rest);
      setHand(next);
      const ev = evalVideoPoker(next);
      setName(ev.name);
      const paid = ev.mult * bet;
      setLast(paid);
      if (paid > 0) {
        creditWin(paid, "Video Poker");
        if (soundOn) sfx.win(ev.mult >= 9);
      } else if (soundOn) sfx.lose();
      setPhase("done");
      setBusy(false);
      return;
    }
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Video Poker")) return;
    setBusy(true);
    if (soundOn) sfx.spin();
    await new Promise((r) => setTimeout(r, 240));
    const d = dealVideoPoker();
    setHand(d.hand);
    setRest(d.rest);
    setHeld([false, false, false, false, false]);
    setName(evalVideoPoker(d.hand).name);
    setLast(null);
    setPhase("hold");
    setBusy(false);
  }

  return (
    <OriginalShell title="Video Poker" subtitle="Jacks or Better · Halten · Royal 800×" slug="videopoker">
      <ol className="mb-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted sm:grid-cols-3">
        {VP_TABLE.map((row) => (
          <li key={row.name} className={cn("flex justify-between", name === row.name && "text-win")}>
            <span>{row.name}</span>
            <span className="tabular-nums">{row.mult}×</span>
          </li>
        ))}
      </ol>
      <div className="flex justify-center gap-2 overflow-x-auto py-2">
        {Array.from({ length: 5 }, (_, i) => {
          const c = hand[i];
          return (
          <button
            key={c ? c.id : `empty-${i}`}
            type="button"
            disabled={phase !== "hold"}
            onClick={() => setHeld((h) => h.map((v, j) => (j === i ? !v : v)))}
            className={cn("relative", held[i] && "vp-held")}
          >
            <PlayingCardFace card={c} hidden={!c} size="table" animated={Boolean(c)} delayMs={i * 40} />
            {phase === "hold" ? (
              <span className={cn("mt-1 block text-center text-[10px] uppercase tracking-wider", held[i] ? "text-accent" : "text-muted")}>
                {held[i] ? "Halten" : "Tausch"}
              </span>
            ) : null}
          </button>
          );
        })}
      </div>
      {name && phase !== "idle" ? (
        <p className={cn("mt-2 text-center font-display text-xl", name === "Nichts" ? "text-muted" : "text-win")}>{name}</p>
      ) : null}
      <BetBar
        bet={bet}
        betI={betI}
        setBetI={setBetI}
        busy={busy}
        onPlay={() => void deal()}
        label={phase === "hold" ? "Ziehen" : "Geben"}
      />
      <ResultBar last={last} bet={bet} />
      <p className="mt-3 text-center text-xs text-muted">Karten antippen zum Halten. Auszahlung × Einsatz.</p>
    </OriginalShell>
  );
}
