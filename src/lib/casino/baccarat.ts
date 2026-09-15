import { baccaratTotal, type PlayingCard, shoe } from "./cards";

export type BaccBet = "player" | "banker" | "tie";

export type BaccState = {
  deck: PlayingCard[];
  player: PlayingCard[];
  banker: PlayingCard[];
  phase: "bet" | "result";
  outcome: BaccBet | null;
};

export function newBaccarat(): BaccState {
  return { deck: [], player: [], banker: [], phase: "bet", outcome: null };
}

function draw(s: BaccState): PlayingCard {
  if (s.deck.length < 16) s.deck = shoe(8);
  return s.deck.pop()!;
}

function playerThird(p: number, b: number): boolean {
  if (p >= 8 || b >= 8) return false;
  return p <= 5;
}

function bankerThird(p: number, b: number, playerDrew: boolean, pThird: number | null): boolean {
  if (p >= 8 || b >= 8) return false;
  if (!playerDrew) return b <= 5;
  const t = pThird ?? 0;
  if (b <= 2) return true;
  if (b === 3) return t !== 8;
  if (b === 4) return t >= 2 && t <= 7;
  if (b === 5) return t >= 4 && t <= 7;
  if (b === 6) return t === 6 || t === 7;
  return false;
}

export function dealBaccarat(state: BaccState): BaccState {
  const next: BaccState = {
    ...state,
    deck: state.deck.slice(),
    player: [],
    banker: [],
    phase: "result",
    outcome: null,
  };
  next.player.push(draw(next), draw(next));
  next.banker.push(draw(next), draw(next));
  let p = baccaratTotal(next.player);
  let b = baccaratTotal(next.banker);
  const natural = p >= 8 || b >= 8;
  let pThird: number | null = null;
  const pDrew = !natural && playerThird(p, b);
  if (pDrew) {
    const c = draw(next);
    next.player.push(c);
    pThird = baccaratTotal([c]);
    p = baccaratTotal(next.player);
  }
  if (!natural && bankerThird(p, b, pDrew, pThird)) {
    next.banker.push(draw(next));
    b = baccaratTotal(next.banker);
  }
  p = baccaratTotal(next.player);
  b = baccaratTotal(next.banker);
  next.outcome = p === b ? "tie" : p > b ? "player" : "banker";
  return next;
}

export function payoutBaccarat(betOn: BaccBet, amount: number, outcome: BaccBet): number {
  if (outcome === "tie") {
    if (betOn === "tie") return amount * 9;
    return amount;
  }
  if (betOn !== outcome) return 0;
  if (betOn === "banker") return amount + Math.floor(amount * 0.95);
  return amount * 2;
}
