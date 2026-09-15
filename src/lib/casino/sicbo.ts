import { randInt } from "./rng";

export type SicBet =
  | { kind: "size"; size: "small" | "big" }
  | { kind: "odd" }
  | { kind: "even" }
  | { kind: "triple"; n: number | "any" }
  | { kind: "total"; n: number }
  | { kind: "single"; n: number };

export type SicWager = { bet: SicBet; stake: number };

export function rollSic(): [number, number, number] {
  return [randInt(6) + 1, randInt(6) + 1, randInt(6) + 1];
}

export function sicSum(dice: [number, number, number]): number {
  return dice[0] + dice[1] + dice[2];
}

export function isTriple(dice: [number, number, number]): boolean {
  return dice[0] === dice[1] && dice[1] === dice[2];
}

const TOTAL_PAY: Record<number, number> = {
  4: 60,
  5: 30,
  6: 17,
  7: 12,
  8: 8,
  9: 6,
  10: 6,
  11: 6,
  12: 6,
  13: 8,
  14: 12,
  15: 17,
  16: 30,
  17: 60,
};

export function sicPay(dice: [number, number, number], bet: SicBet, stake: number): number {
  const sum = sicSum(dice);
  const trip = isTriple(dice);
  if (bet.kind === "size") {
    if (trip) return 0;
    const small = sum >= 4 && sum <= 10;
    const hit = bet.size === "small" ? small : sum >= 11 && sum <= 17;
    return hit ? stake * 2 : 0;
  }
  if (bet.kind === "odd") return !trip && sum % 2 === 1 ? stake * 2 : 0;
  if (bet.kind === "even") return !trip && sum % 2 === 0 ? stake * 2 : 0;
  if (bet.kind === "triple") {
    if (!trip) return 0;
    if (bet.n === "any") return stake * 31;
    return dice[0] === bet.n ? stake * 181 : 0;
  }
  if (bet.kind === "total") {
    if (sum !== bet.n) return 0;
    return stake * ((TOTAL_PAY[bet.n] ?? 0) + 1);
  }
  const hits = dice.filter((d) => d === bet.n).length;
  if (hits === 0) return 0;
  return stake * (hits + 1);
}

export function sicLabel(bet: SicBet): string {
  if (bet.kind === "size") return bet.size === "small" ? "Klein 4–10" : "Groß 11–17";
  if (bet.kind === "odd") return "Ungerade";
  if (bet.kind === "even") return "Gerade";
  if (bet.kind === "triple") return bet.n === "any" ? "Dreierlinge" : `Triple ${bet.n}`;
  if (bet.kind === "total") return `Summe ${bet.n}`;
  return `Auge ${bet.n}`;
}

export const SIC_TOTALS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] as const;
