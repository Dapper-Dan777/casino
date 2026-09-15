import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { PlayingCardFace } from "./PlayingCard";
import { makeCard, RANKS, SUITS, type PlayingCard } from "@/lib/casino/cards";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { randInt } from "@/lib/casino/rng";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

const rankValue = (rank: (typeof RANKS)[number]) => RANKS.indexOf(rank) + 2;

function drawCard(): PlayingCard {
  return makeCard(SUITS[randInt(SUITS.length)]!, RANKS[randInt(RANKS.length)]!);
}

export function HiLoView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [card, setCard] = useState<PlayingCard>(() => drawCard());
  const [last, setLast] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [streak, setStreak] = useState(0);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const current = rankValue(card.rank);
  const lowerChance = Math.max(8, Math.round(((current - 2) / 12) * 100));
  const higherChance = Math.max(8, Math.round(((14 - current) / 12) * 100));

  async function play(direction: "higher" | "lower") {
    unlockAudio();
    if (busy) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Hi-Lo")) return;
    setBusy(true);
    if (soundOn) sfx.deal();
    await new Promise((resolve) => window.setTimeout(resolve, 420));
    const next = drawCard();
    const nextValue = rankValue(next.rank);
    const won = direction === "higher" ? nextValue > current : nextValue < current;
    const multiplier = won ? (direction === "higher" ? 99 / higherChance : 99 / lowerChance) : 0;
    const paid = won ? Math.round(bet * multiplier) : 0;
    setCard(next);
    setLast(paid);
    if (won) {
      setStreak((value) => value + 1);
      creditWin(paid, "Hi-Lo");
      if (soundOn) sfx.win(paid >= bet * 3);
    } else {
      setStreak(0);
      if (soundOn) sfx.lose();
    }
    setBusy(false);
  }

  return (
    <OriginalShell title="Hi-Lo" subtitle="Höher oder niedriger · steigende Multiplikatoren" slug="hi-lo">
      <div className="rounded-xl border border-border bg-surface p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-muted">Aktuelle Karte</p>
        <div className="mx-auto mt-4 flex h-36 w-24 items-center justify-center">
          <PlayingCardFace card={card} size="table" animated={false} />
        </div>
        <p className="mt-4 text-sm text-muted">
          Chance höher {higherChance} % · Chance niedriger {lowerChance} %
        </p>
        <p className={cn("mt-2 text-xs uppercase tracking-wider", streak ? "text-accent" : "text-muted")}>
          {streak ? `${streak} Treffer in Folge` : "Treffe die nächste Karte"}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" disabled={busy} onClick={() => void play("lower")} className="h-14 rounded-md border border-border bg-elevated text-sm font-semibold text-fg hover:border-accent/40 disabled:opacity-40">
          Niedriger
          <span className="mt-1 block text-xs text-muted">{lowerChance} % · {((99 / lowerChance) || 0).toFixed(2)}×</span>
        </button>
        <button type="button" disabled={busy} onClick={() => void play("higher")} className="h-14 rounded-md bg-accent text-sm font-semibold text-accent-fg hover:opacity-90 disabled:opacity-40">
          Höher
          <span className="mt-1 block text-xs text-accent-fg/70">{higherChance} % · {((99 / higherChance) || 0).toFixed(2)}×</span>
        </button>
      </div>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy} onPlay={() => void play("higher")} label="Höher spielen" />
      <ResultBar last={last} bet={bet} />
      <p className="mt-3 text-center text-xs text-muted">Spielgeld-Demo · Bei gleicher Karte gilt die Runde als verloren.</p>
    </OriginalShell>
  );
}
