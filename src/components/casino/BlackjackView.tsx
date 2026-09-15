import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayingCardFace } from "./PlayingCard";
import { TableShell } from "./TableShell";
import {
  canSplit,
  dealBJ,
  dealerHitOnce,
  doubleBJ,
  hitBJ,
  newBlackjack,
  payoutsOf,
  resolveInsurance,
  splitBJ,
  standBJ,
  type BJState,
} from "@/lib/casino/blackjack";
import { handValueBJ } from "@/lib/casino/cards";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

const STEPS = [100, 200, 500, 1000, 2500, 5000, 10000];

export function BlackjackView() {
  const [game, setGame] = useState<BJState>(() => newBlackjack());
  const [bet, setBet] = useState(500);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  const dealerShown = game.holeHidden ? game.dealer.slice(0, 1) : game.dealer;
  const dealerVal = handValueBJ(dealerShown).total;
  const active = game.player[game.active];
  const insuranceCost = Math.floor((game.player[0]?.bet ?? bet) / 2);

  useEffect(() => {
    if (game.phase !== "dealer") return;
    const t = window.setTimeout(() => {
      const next = dealerHitOnce(game);
      if (soundOn) sfx.deal();
      if (next.phase === "settle") applySettle(next);
      else setGame(next);
    }, 720);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  function deal() {
    unlockAudio();
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Blackjack · Einsatz")) return;
    if (soundOn) sfx.deal();
    const next = dealBJ(newBlackjack(), bet);
    if (next.phase === "settle") applySettle(next);
    else setGame(next);
  }

  function applySettle(next: BJState) {
    const { returned, net } = payoutsOf(next);
    if (returned > 0) creditWin(returned, "Blackjack · Auszahlung");
    if (soundOn) {
      if (net > 0) sfx.win(net >= bet);
      else if (net < 0) sfx.lose();
    }
    setGame(next);
  }

  function act(fn: (s: BJState) => BJState | null, extra = 0) {
    unlockAudio();
    if (extra > 0) {
      if (balance < extra) {
        setCashier(true);
        return;
      }
      if (!placeBet(extra, "Blackjack · Extra")) return;
    }
    if (soundOn) sfx.deal();
    const next = fn(game);
    if (!next) return;
    if (next.phase === "settle") applySettle(next);
    else setGame(next);
  }

  function insurance(take: boolean) {
    unlockAudio();
    let amount = 0;
    if (take) {
      if (balance < insuranceCost) {
        setCashier(true);
        return;
      }
      if (insuranceCost > 0 && !placeBet(insuranceCost, "Blackjack · Versicherung")) return;
      amount = insuranceCost;
    }
    const next = resolveInsurance(game, amount);
    if (next.phase === "settle") applySettle(next);
    else setGame(next);
  }

  return (
    <TableShell title="Blackjack" subtitle="6 Decks · Dealer zieht bei weichem 17 · Blackjack 3:2 · Versicherung" slug="blackjack">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-accent">Croupier</p>
      <div className="flex min-h-28 justify-center gap-2">
        {game.dealer.length === 0 ? (
          <PlayingCardFace hidden />
        ) : (
          game.dealer.map((c, i) => (
            <PlayingCardFace key={c.id} card={c} hidden={game.holeHidden && i === 1} delayMs={i * 90} />
          ))
        )}
      </div>
      <p className="mt-2 text-center text-sm tabular-nums text-fg">{game.dealer.length ? dealerVal : "—"}</p>

      <div className="my-6 h-px bg-felt-line/20" />

      <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-accent">Sie</p>
      <div className="flex flex-wrap justify-center gap-6">
        {game.player.length === 0 ? (
          <div className="flex h-[5.5rem] w-[3.9rem] items-center justify-center rounded-md border border-dashed border-accent/30 sm:h-24 sm:w-[4.25rem]">
            <span className="text-[10px] uppercase tracking-wider text-accent/70">Einsatz</span>
          </div>
        ) : (
          game.player.map((hand, i) => (
            <div
              key={i}
              className={cn("rounded-lg p-2", i === game.active && game.phase === "player" ? "ring-1 ring-accent" : "")}
            >
              <div className="flex gap-1.5">
                {hand.cards.map((c, ci) => (
                  <PlayingCardFace key={c.id} card={c} delayMs={ci * 90} />
                ))}
              </div>
              <p className="mt-2 text-center text-sm tabular-nums">
                {handValueBJ(hand.cards).total}
                {hand.doubled ? " · Doppelt" : ""}
              </p>
            </div>
          ))
        )}
      </div>

      <p className="mt-4 min-h-6 text-center text-sm text-fg">{game.message}</p>

      {game.phase === "bet" || game.phase === "settle" ? (
        <div className="mt-4 flex flex-col items-center gap-3">
          {game.phase === "bet" ? (
            <div className="flex items-center rounded-md border border-accent/25 bg-bg/30">
              <button
                type="button"
                className="size-11 text-fg"
                onClick={() => setBet((b) => STEPS[Math.max(0, STEPS.indexOf(b as (typeof STEPS)[number]) - 1)] ?? STEPS[0]!)}
                aria-label="Einsatz senken"
              >
                <Minus className="mx-auto size-4" />
              </button>
              <span className="min-w-24 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
              <button
                type="button"
                className="size-11 text-fg"
                onClick={() =>
                  setBet((b) => STEPS[Math.min(STEPS.length - 1, STEPS.indexOf(b as (typeof STEPS)[number]) + 1)] ?? STEPS.at(-1)!)
                }
                aria-label="Einsatz erhöhen"
              >
                <Plus className="mx-auto size-4" />
              </button>
            </div>
          ) : null}
          <Button size="lg" className="min-w-40" onClick={deal} disabled={balance < bet && game.phase === "bet"}>
            {game.phase === "settle" ? "Neue Runde" : "Geben"}
          </Button>
        </div>
      ) : game.phase === "insurance" ? (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button onClick={() => insurance(true)} disabled={balance < insuranceCost}>
            Versichern · {formatEuro(insuranceCost)}
          </Button>
          <Button variant="secondary" onClick={() => insurance(false)}>
            Nein
          </Button>
        </div>
      ) : game.phase === "dealer" ? (
        <p className="mt-4 text-center text-sm text-muted">Croupier spielt…</p>
      ) : (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button onClick={() => act(hitBJ)}>Ziehen</Button>
          <Button variant="secondary" onClick={() => act(standBJ)}>
            Halten
          </Button>
          <Button
            variant="secondary"
            disabled={!active || active.cards.length !== 2}
            onClick={() => act((s) => doubleBJ(s), active?.bet ?? 0)}
          >
            Doppeln
          </Button>
          <Button variant="secondary" disabled={!canSplit(game)} onClick={() => act((s) => splitBJ(s), bet)}>
            Teilen
          </Button>
        </div>
      )}
      <p className="mt-4 text-center text-xs text-accent/80">Guthaben {formatEuro(balance)}</p>
    </TableShell>
  );
}
