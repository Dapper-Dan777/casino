import { fisherYates } from "./rng";

export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

export type PlayingCard = {
  suit: Suit;
  rank: Rank;
  id: string;
};

export const SUITS: Suit[] = ["spades", "hearts", "diamonds", "clubs"];
export const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export function isRed(suit: Suit): boolean {
  return suit === "hearts" || suit === "diamonds";
}

export function rankValueBJ(rank: Rank): number {
  if (rank === "A") return 11;
  if (rank === "K" || rank === "Q" || rank === "J") return 10;
  return Number(rank);
}

export function rankValueBaccarat(rank: Rank): number {
  if (rank === "A") return 1;
  if (rank === "K" || rank === "Q" || rank === "J" || rank === "10") return 0;
  return Number(rank);
}

let cardSeq = 0;

export function makeCard(suit: Suit, rank: Rank): PlayingCard {
  cardSeq += 1;
  return { suit, rank, id: `${suit}-${rank}-${cardSeq}` };
}

export function shoe(decks: number): PlayingCard[] {
  const cards: PlayingCard[] = [];
  for (let d = 0; d < decks; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) cards.push(makeCard(suit, rank));
    }
  }
  return fisherYates(cards);
}

export function handValueBJ(cards: PlayingCard[]): { total: number; soft: boolean } {
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    total += rankValueBJ(c.rank);
    if (c.rank === "A") aces += 1;
  }
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  return { total, soft: aces > 0 && total <= 21 };
}

export function isBlackjack(cards: PlayingCard[]): boolean {
  return cards.length === 2 && handValueBJ(cards).total === 21;
}

export function baccaratTotal(cards: PlayingCard[]): number {
  return cards.reduce((s, c) => s + rankValueBaccarat(c.rank), 0) % 10;
}
