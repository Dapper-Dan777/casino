import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayingCardFace } from "./PlayingCard";
import { TableShell } from "./TableShell";
import { dealBaccarat, newBaccarat, payoutBaccarat, type BaccBet, type BaccState } from "@/lib/casino/baccarat";
import { baccaratTotal } from "@/lib/casino/cards";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

const STEPS = [100, 200, 500, 1000, 2500, 5000, 10000];

export function BaccaratView() {
  const [game, setGame] = useState<BaccState>(() => newBaccarat());
  const [betOn, setBetOn] = useState<BaccBet>("player");
  const [amount, setAmount] = useState(500);
  const [last, setLast] = useState<number | null>(null);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  function play() {
    unlockAudio();
    if (balance < amount) {
      setCashier(true);
      return;
    }
    if (!placeBet(amount, `Baccarat · ${betOn}`)) return;
    if (soundOn) sfx.deal();
    const next = dealBaccarat(game);
    const returned = next.outcome ? payoutBaccarat(betOn, amount, next.outcome) : 0;
    if (returned > 0) creditWin(returned, "Baccarat · Auszahlung");
    setLast(returned - amount);
    setGame(next);
    if (soundOn) {
      if (returned > amount) sfx.win();
      else if (returned === amount) sfx.click();
      else sfx.lose();
    }
  }

  const labels: Record<BaccBet, string> = { player: "Spieler", banker: "Bank", tie: "Unentschieden" };

  return (
    <TableShell title="Baccarat" subtitle="Punto Banco · Bank 5 % Commission · Unentschieden 8:1" slug="baccarat" felt="bacc">
      <div className="grid gap-6 sm:grid-cols-2">
        <HandBlock title="Spieler" cards={game.player} highlight={game.outcome === "player"} />
        <HandBlock title="Bank" cards={game.banker} highlight={game.outcome === "banker"} />
      </div>
      <p className="mt-5 text-center text-sm text-fg">
        {game.outcome ? labels[game.outcome] : "Einsatz wählen"}
        {last !== null ? ` · ${last >= 0 ? "+" : ""}${formatEuro(last)}` : ""}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {(["player", "banker", "tie"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setBetOn(k)}
            className={cn(
              "h-14 rounded-md border text-sm",
              betOn === k ? "border-accent bg-bg/40 text-fg" : "border-accent/20 bg-bg/20 text-muted",
            )}
          >
            {labels[k]}
            <span className="mt-1 block text-[10px] uppercase tracking-wider text-subtle">
              {k === "tie" ? "8:1" : k === "banker" ? "0,95:1" : "1:1"}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="flex items-center rounded-md border border-accent/25 bg-bg/30">
          <button
            type="button"
            className="size-11"
            onClick={() => setAmount((b) => STEPS[Math.max(0, STEPS.indexOf(b as (typeof STEPS)[number]) - 1)] ?? 100)}
            aria-label="Einsatz senken"
          >
            <Minus className="mx-auto size-4" />
          </button>
          <span className="min-w-24 text-center text-sm tabular-nums">{formatEuro(amount)}</span>
          <button
            type="button"
            className="size-11"
            onClick={() =>
              setAmount((b) => STEPS[Math.min(STEPS.length - 1, STEPS.indexOf(b as (typeof STEPS)[number]) + 1)] ?? 10000)
            }
            aria-label="Einsatz erhöhen"
          >
            <Plus className="mx-auto size-4" />
          </button>
        </div>
        <Button size="lg" onClick={play} disabled={balance < amount}>
          Geben
        </Button>
      </div>
      <p className="mt-4 text-center text-xs text-accent/80">Guthaben {formatEuro(balance)}</p>
    </TableShell>
  );
}

function HandBlock({
  title,
  cards,
  highlight,
}: {
  title: string;
  cards: BaccState["player"];
  highlight: boolean;
}) {
  return (
    <div className={cn("rounded-lg p-3", highlight && "ring-1 ring-accent")}>
      <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-accent">{title}</p>
      <div className="flex min-h-24 justify-center gap-1.5">
        {cards.length === 0 ? <PlayingCardFace hidden /> : cards.map((c, i) => <PlayingCardFace key={c.id} card={c} delayMs={i * 90} />)}
      </div>
      <p className="mt-2 text-center text-lg tabular-nums text-fg">{cards.length ? baccaratTotal(cards) : "—"}</p>
    </div>
  );
}
