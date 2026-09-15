import { useMemo, useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { PlayingCardFace } from "./PlayingCard";
import { makeCard, shoe, type PlayingCard } from "@/lib/casino/cards";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

function score(cards: PlayingCard[]): { value: number; label: string } {
  const counts = new Map<string, number>();
  cards.forEach((card) => counts.set(card.rank, (counts.get(card.rank) ?? 0) + 1));
  const values = cards.map((card) => card.rank === "A" ? 14 : ["K", "Q", "J"].includes(card.rank) ? 10 : Number(card.rank)).sort((a, b) => b - a);
  const groups = [...counts.values()].sort((a, b) => b - a);
  const unique = [...new Set(values)].sort((a, b) => b - a);
  const straight = unique.length === 5 && (unique[0]! - unique[4]! === 4 || unique.join(",") === "14,5,4,3,2");
  const flush = new Set(cards.map((card) => card.suit)).size === 1;
  if (straight && flush) return { value: 800 + values[0]!, label: "Straight Flush" };
  if (groups[0] === 4) return { value: 700 + values[0]!, label: "Vierling" };
  if (groups[0] === 3 && groups[1] === 2) return { value: 600 + values[0]!, label: "Full House" };
  if (flush) return { value: 500 + values[0]!, label: "Flush" };
  if (straight) return { value: 400 + values[0]!, label: "Straight" };
  if (groups[0] === 3) return { value: 300 + values[0]!, label: "Drilling" };
  if (groups[0] === 2 && groups[1] === 2) return { value: 200 + values[0]!, label: "Zwei Paare" };
  if (groups[0] === 2) return { value: 100 + values[0]!, label: "Ein Paar" };
  return { value: values[0]!, label: "High Card" };
}

function handScore(cards: PlayingCard[]): { value: number; label: string } {
  const combos: PlayingCard[][] = [];
  for (let a = 0; a < cards.length - 4; a += 1)
    for (let b = a + 1; b < cards.length - 3; b += 1)
      for (let c = b + 1; c < cards.length - 2; c += 1)
        for (let d = c + 1; d < cards.length - 1; d += 1)
          for (let e = d + 1; e < cards.length; e += 1) combos.push([cards[a]!, cards[b]!, cards[c]!, cards[d]!, cards[e]!]);
  return combos.map(score).sort((a, b) => b.value - a.value)[0] ?? score(cards.slice(0, 5));
}

export function CasinoHoldemView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [hand, setHand] = useState<PlayingCard[]>([]);
  const [board, setBoard] = useState<PlayingCard[]>([]);
  const [dealer, setDealer] = useState<PlayingCard[]>([]);
  const [phase, setPhase] = useState<"idle" | "decision" | "done">("idle");
  const [last, setLast] = useState<number | null>(null);
  const [message, setMessage] = useState("Ante setzen und Flop sehen");
  const [busy, setBusy] = useState(false);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  async function deal(play = false) {
    unlockAudio();
    if (busy) return;
    if (!play && phase !== "idle") return;
    if (play && phase !== "decision") return;
    const totalBet = play ? bet * 2 : bet;
    if (balance < totalBet) { setCashier(true); return; }
    if (!placeBet(totalBet, play ? "Casino Hold'em · Play" : "Casino Hold'em · Ante")) return;
    setBusy(true);
    if (soundOn) sfx.deal();
    await new Promise((resolve) => window.setTimeout(resolve, 420));
    const cards = shoe(1);
    setHand([cards[0]!, cards[1]!]);
    setDealer([cards[2]!, cards[3]!]);
    setBoard([cards[4]!, cards[5]!, cards[6]!]);
    setPhase("decision");
    setLast(null);
    setMessage("Play verdoppelt den Einsatz und öffnet Turn & River");
    setBusy(false);
  }

  async function reveal() {
    if (phase !== "decision" || busy) return;
    setBusy(true);
    await new Promise((resolve) => window.setTimeout(resolve, 380));
    const cards = shoe(1);
    const fullBoard = [...board, cards[0]!, cards[1]!];
    setBoard(fullBoard);
    const player = handScore([...hand, ...fullBoard]);
    const house = handScore([...dealer, ...fullBoard]);
    const paid = player.value > house.value ? bet * 4 : player.value === house.value ? bet * 2 : 0;
    setLast(paid);
    if (paid > 0) { creditWin(paid, "Casino Hold'em"); if (soundOn) sfx.win(paid >= bet * 4); }
    else if (soundOn) sfx.lose();
    setMessage(`${player.label} · Dealer: ${house.label}`);
    setPhase("done");
    setBusy(false);
  }

  const playerLabel = useMemo(() => hand.length && board.length >= 3 ? handScore([...hand, ...board]).label : "—", [hand, board]);
  return (
    <OriginalShell title="Casino Hold'em" subtitle="Ante · Play · Dealer gegen Spieler · Spielgeld" slug="casino-holdem">
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-muted"><span>Dealer</span><span>{message}</span></div>
        <div className="mt-3 flex justify-center gap-2">{dealer.map((card) => <PlayingCardFace key={card.id} card={card} size="table" animated={false} />)}</div>
        <div className="my-5 flex justify-center gap-2">{board.map((card) => <PlayingCardFace key={card.id} card={card} size="mini" animated={false} />)}</div>
        <div className="flex justify-center gap-2">{hand.map((card) => <PlayingCardFace key={card.id} card={card} size="table" animated={false} />)}</div>
        <p className={cn("mt-3 text-center text-sm", playerLabel !== "—" ? "text-accent" : "text-muted")}>Deine Hand: {playerLabel}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" disabled={phase !== "decision" || busy} onClick={() => void deal(true)} className="h-12 rounded-md border border-border bg-elevated text-sm font-semibold disabled:opacity-40">Play · {formatEuro(bet * 2)}</button>
        <button type="button" disabled={phase !== "decision" || busy} onClick={() => void reveal()} className="h-12 rounded-md bg-accent text-sm font-semibold text-accent-fg disabled:opacity-40">Aufdecken</button>
      </div>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy || phase === "decision"} onPlay={() => void deal()} label={phase === "idle" || phase === "done" ? "Ante geben" : "Gespielt"} />
      <ResultBar last={last} bet={bet} />
      <p className="mt-3 text-center text-xs text-muted">Ante sehen · Play verdoppelt · Spieler gewinnt mit der besseren 5-Karten-Hand.</p>
    </OriginalShell>
  );
}
