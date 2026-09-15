import { handValueBJ, isBlackjack, type PlayingCard, shoe } from "./cards";

export type BJPhase = "bet" | "insurance" | "player" | "dealer" | "settle";

export type BJHand = {
  cards: PlayingCard[];
  bet: number;
  stood: boolean;
  doubled: boolean;
};

export type BJState = {
  phase: BJPhase;
  deck: PlayingCard[];
  player: BJHand[];
  active: number;
  dealer: PlayingCard[];
  holeHidden: boolean;
  message: string;
  insuranceBet: number;
};

export function newBlackjack(): BJState {
  return {
    phase: "bet",
    deck: [],
    player: [],
    active: 0,
    dealer: [],
    holeHidden: true,
    message: "Einsatz wählen",
    insuranceBet: 0,
  };
}

function draw(state: BJState): PlayingCard {
  if (state.deck.length < 20) state.deck = shoe(6);
  return state.deck.pop()!;
}

export function dealBJ(state: BJState, bet: number): BJState {
  const next: BJState = {
    ...state,
    player: [{ cards: [], bet, stood: false, doubled: false }],
    active: 0,
    dealer: [],
    holeHidden: true,
    phase: "player",
    message: "",
    insuranceBet: 0,
  };
  next.player[0]!.cards.push(draw(next), draw(next));
  next.dealer.push(draw(next), draw(next));
  if (isBlackjack(next.player[0]!.cards)) {
    next.phase = "dealer";
    next.holeHidden = false;
    if (!dealerShouldHit(next)) return settleBJ(next);
    return next;
  }
  if (next.dealer[0]?.rank === "A") {
    next.phase = "insurance";
    next.message = "Versicherung gegen Blackjack?";
    return next;
  }
  next.message = "Ziehen oder Halten";
  return next;
}

export function resolveInsurance(state: BJState, amount: number): BJState {
  if (state.phase !== "insurance") return state;
  const next = cloneBJ(state);
  next.insuranceBet = amount;
  if (isBlackjack(next.dealer)) {
    next.holeHidden = false;
    return settleBJ(next);
  }
  next.phase = "player";
  next.message = "Ziehen oder Halten";
  return next;
}

export function hitBJ(state: BJState): BJState {
  if (state.phase !== "player") return state;
  const next = cloneBJ(state);
  const hand = next.player[next.active]!;
  hand.cards.push(draw(next));
  const v = handValueBJ(hand.cards).total;
  if (v > 21) {
    hand.stood = true;
    return advanceHand(next);
  }
  if (v === 21) {
    hand.stood = true;
    return advanceHand(next);
  }
  next.message = "Ziehen oder Halten";
  return next;
}

export function standBJ(state: BJState): BJState {
  if (state.phase !== "player") return state;
  const next = cloneBJ(state);
  next.player[next.active]!.stood = true;
  return advanceHand(next);
}

export function doubleBJ(state: BJState): BJState | null {
  if (state.phase !== "player") return null;
  const hand = state.player[state.active]!;
  if (hand.cards.length !== 2 || hand.doubled) return null;
  const next = cloneBJ(state);
  const h = next.player[next.active]!;
  h.doubled = true;
  h.bet *= 2;
  h.cards.push(draw(next));
  h.stood = true;
  return advanceHand(next);
}

export function canSplit(state: BJState): boolean {
  if (state.phase !== "player" || state.player.length !== 1) return false;
  const h = state.player[0]!;
  if (h.cards.length !== 2) return false;
  const a = h.cards[0]!;
  const b = h.cards[1]!;
  return a.rank === b.rank;
}

export function splitBJ(state: BJState): BJState | null {
  if (!canSplit(state)) return null;
  const next = cloneBJ(state);
  const first = next.player[0]!;
  const cardB = first.cards.pop()!;
  next.player.push({ cards: [cardB], bet: first.bet, stood: false, doubled: false });
  first.cards.push(draw(next));
  next.player[1]!.cards.push(draw(next));
  next.active = 0;
  next.message = "Hand 1";
  return next;
}

function advanceHand(state: BJState): BJState {
  const next = state;
  while (next.active < next.player.length && next.player[next.active]!.stood) {
    next.active += 1;
  }
  if (next.active >= next.player.length) {
    return beginDealer(next);
  }
  next.message = next.player.length > 1 ? `Hand ${next.active + 1}` : "Ziehen oder Halten";
  return next;
}

export function dealerShouldHit(state: BJState): boolean {
  const allBust = state.player.every((h) => handValueBJ(h.cards).total > 21);
  if (allBust) return false;
  const v = handValueBJ(state.dealer);
  return v.total < 17 || (v.total === 17 && v.soft);
}

export function beginDealer(state: BJState): BJState {
  const next = cloneBJ(state);
  next.phase = "dealer";
  next.holeHidden = false;
  if (!dealerShouldHit(next)) return settleBJ(next);
  next.message = "Croupier zieht";
  return next;
}

export function dealerHitOnce(state: BJState): BJState {
  if (state.phase !== "dealer") return state;
  const next = cloneBJ(state);
  next.dealer.push(draw(next));
  if (!dealerShouldHit(next)) return settleBJ(next);
  next.message = "Croupier zieht";
  return next;
}

export type BJSettlement = {
  state: BJState;
  payouts: number[];
  net: number;
};

export function settleBJ(state: BJState): BJState {
  const dealerTotal = handValueBJ(state.dealer).total;
  const dealerBJ = isBlackjack(state.dealer);
  const notes: string[] = [];
  state.player.forEach((hand) => {
    const pv = handValueBJ(hand.cards).total;
    const pBJ = isBlackjack(hand.cards) && state.player.length === 1 && !hand.doubled;
    if (pv > 21) notes.push("Überkauft");
    else if (pBJ && !dealerBJ) notes.push("Blackjack");
    else if (dealerBJ && pBJ) notes.push("Stand");
    else if (dealerTotal > 21) notes.push("Gewonnen");
    else if (pv > dealerTotal) notes.push("Gewonnen");
    else if (pv < dealerTotal) notes.push("Verloren");
    else notes.push("Stand");
  });
  if (state.insuranceBet > 0) notes.push(dealerBJ ? "Versicherung zahlt" : "Versicherung verloren");
  state.phase = "settle";
  state.message = notes.join(" · ");
  return state;
}

export function payoutsOf(state: BJState): { returned: number; net: number } {
  const dealerTotal = handValueBJ(state.dealer).total;
  const dealerBJ = isBlackjack(state.dealer);
  let returned = 0;
  let staked = 0;
  for (const hand of state.player) {
    staked += hand.bet;
    const pv = handValueBJ(hand.cards).total;
    const pBJ = isBlackjack(hand.cards) && state.player.length === 1 && !hand.doubled;
    if (pv > 21) continue;
    if (pBJ && !dealerBJ) {
      returned += Math.round(hand.bet * 2.5);
      continue;
    }
    if (dealerBJ && pBJ) {
      returned += hand.bet;
      continue;
    }
    if (dealerBJ) continue;
    if (dealerTotal > 21 || pv > dealerTotal) returned += hand.bet * 2;
    else if (pv === dealerTotal) returned += hand.bet;
  }
  if (state.insuranceBet > 0 && dealerBJ) returned += state.insuranceBet * 3;
  return { returned, net: returned - staked };
}

function cloneBJ(s: BJState): BJState {
  return {
    ...s,
    deck: s.deck.slice(),
    dealer: s.dealer.slice(),
    player: s.player.map((h) => ({ ...h, cards: h.cards.slice() })),
  };
}
