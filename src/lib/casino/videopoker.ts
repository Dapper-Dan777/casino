import { type PlayingCard, type Rank, shoe } from "./cards";

export type VpHandName =
  | "Royal Flush"
  | "Straight Flush"
  | "Vierling"
  | "Full House"
  | "Flush"
  | "Straße"
  | "Drilling"
  | "Zwei Paare"
  | "Buben+"
  | "Nichts";

const PAY: Record<VpHandName, number> = {
  "Royal Flush": 800,
  "Straight Flush": 50,
  Vierling: 25,
  "Full House": 9,
  Flush: 6,
  Straße: 4,
  Drilling: 3,
  "Zwei Paare": 2,
  "Buben+": 1,
  Nichts: 0,
};

const RANK_N: Record<Rank, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  "10": 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
};

export function dealVideoPoker(): { hand: PlayingCard[]; rest: PlayingCard[] } {
  const deck = shoe(1);
  return { hand: deck.slice(0, 5), rest: deck.slice(5) };
}

export function drawVideoPoker(hand: PlayingCard[], held: boolean[], rest: PlayingCard[]): PlayingCard[] {
  const next = rest.slice();
  return hand.map((c, i) => {
    if (held[i]) return c;
    return next.shift() ?? c;
  });
}

export function evalVideoPoker(hand: PlayingCard[]): { name: VpHandName; mult: number } {
  const nums = hand.map((c) => RANK_N[c.rank]).sort((a, b) => a - b);
  const flush = hand.every((c) => c.suit === hand[0]!.suit);
  const straight = isStraight(nums);
  const counts = new Map<number, number>();
  for (const n of nums) counts.set(n, (counts.get(n) ?? 0) + 1);
  const freq = [...counts.values()].sort((a, b) => b - a);
  const royal = flush && straight && nums[0] === 10;
  let name: VpHandName = "Nichts";
  if (royal) name = "Royal Flush";
  else if (flush && straight) name = "Straight Flush";
  else if (freq[0] === 4) name = "Vierling";
  else if (freq[0] === 3 && freq[1] === 2) name = "Full House";
  else if (flush) name = "Flush";
  else if (straight) name = "Straße";
  else if (freq[0] === 3) name = "Drilling";
  else if (freq[0] === 2 && freq[1] === 2) name = "Zwei Paare";
  else if (freq[0] === 2 && jacksPlus(counts)) name = "Buben+";
  return { name, mult: PAY[name] };
}

function isStraight(nums: number[]): boolean {
  const uniq = [...new Set(nums)];
  if (uniq.length !== 5) return false;
  if (uniq[4]! - uniq[0]! === 4) return true;
  return uniq[0] === 2 && uniq[1] === 3 && uniq[2] === 4 && uniq[3] === 5 && uniq[4] === 14;
}

function jacksPlus(counts: Map<number, number>): boolean {
  for (const [n, c] of counts) if (c === 2 && n >= 11) return true;
  return false;
}

export const VP_TABLE: { name: VpHandName; mult: number }[] = (
  ["Royal Flush", "Straight Flush", "Vierling", "Full House", "Flush", "Straße", "Drilling", "Zwei Paare", "Buben+"] as VpHandName[]
).map((name) => ({ name, mult: PAY[name] }));
