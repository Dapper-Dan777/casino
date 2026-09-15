import { randInt } from "./rng";

export const WHEEL_ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
] as const;

export const REDS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export type OutsideBet =
  | "red"
  | "black"
  | "even"
  | "odd"
  | "low"
  | "high"
  | "dozen1"
  | "dozen2"
  | "dozen3"
  | "col1"
  | "col2"
  | "col3";

export type RouletteBet = { key: string; amount: number };

export function isRed(n: number): boolean {
  return REDS.has(n);
}

export function colorOf(n: number): "red" | "black" | "green" {
  if (n === 0) return "green";
  return isRed(n) ? "red" : "black";
}

export function spinWheel(): number {
  return WHEEL_ORDER[randInt(WHEEL_ORDER.length)]!;
}

export function wheelIndex(n: number): number {
  return WHEEL_ORDER.indexOf(n as (typeof WHEEL_ORDER)[number]);
}

function hitsOutside(bet: OutsideBet, n: number): boolean {
  if (n === 0) return false;
  switch (bet) {
    case "red":
      return isRed(n);
    case "black":
      return !isRed(n);
    case "even":
      return n % 2 === 0;
    case "odd":
      return n % 2 === 1;
    case "low":
      return n >= 1 && n <= 18;
    case "high":
      return n >= 19 && n <= 36;
    case "dozen1":
      return n >= 1 && n <= 12;
    case "dozen2":
      return n >= 13 && n <= 24;
    case "dozen3":
      return n >= 25 && n <= 36;
    case "col1":
      return n % 3 === 1;
    case "col2":
      return n % 3 === 2;
    case "col3":
      return n % 3 === 0;
  }
}

const OUTSIDE_PAY: Record<OutsideBet, number> = {
  red: 1,
  black: 1,
  even: 1,
  odd: 1,
  low: 1,
  high: 1,
  dozen1: 2,
  dozen2: 2,
  dozen3: 2,
  col1: 2,
  col2: 2,
  col3: 2,
};

export function settleRoulette(
  bets: RouletteBet[],
  number: number,
  lightning?: Record<number, number>,
): { returned: number; staked: number } {
  let returned = 0;
  let staked = 0;
  const bolt = lightning?.[number] ?? 0;
  for (const bet of bets) {
    staked += bet.amount;
    if (bet.key.startsWith("n:")) {
      const n = Number(bet.key.slice(2));
      if (n === number) returned += bet.amount * (bolt > 0 ? bolt : 36);
    } else if (hitsOutside(bet.key as OutsideBet, number)) {
      returned += bet.amount * (1 + OUTSIDE_PAY[bet.key as OutsideBet]);
    }
  }
  return { returned, staked };
}

export const CHIP_VALUES = [100, 500, 1000, 2500, 5000, 10000] as const;
