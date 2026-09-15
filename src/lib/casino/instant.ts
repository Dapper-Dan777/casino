import { randInt, fisherYates } from "./rng";
import { makeCard, shoe, type PlayingCard } from "./cards";

/** 0.00–100.00 inclusive, two decimals. */
export function rollDice(): number {
  return randInt(10001) / 100;
}

export function dicePay(roll: number, target: number, over: boolean, stake: number): number {
  const chance = over ? 100 - target : target;
  if (chance <= 1 || chance >= 98) return 0;
  const hit = over ? roll >= target : roll < target;
  if (!hit) return 0;
  return Math.round(stake * (99 / chance));
}

/** Limbo result ≥ 1.00, house 1 %. */
export function limboResult(): number {
  const r = (randInt(1_000_000) + 1) / 1_000_000;
  const x = 0.99 / r;
  return Math.max(1, Math.floor(x * 100) / 100);
}

export function limboPay(result: number, target: number, stake: number): number {
  if (target < 1.01 || result < target) return 0;
  return Math.round(stake * target);
}

const SCRATCH_PRIZES = [0.5, 1, 2, 5, 10, 25, 50, 100];

export type ScratchTicket = { cells: number[]; winX: number };

export function makeScratch(): ScratchTicket {
  const win = randInt(100) < 38;
  const prize = SCRATCH_PRIZES[weightedPrize()]!;
  const others = SCRATCH_PRIZES.filter((p) => p !== prize);
  const cells: number[] = [];
  if (win) {
    cells.push(prize, prize, prize);
    while (cells.length < 9) {
      const p = others[randInt(others.length)]!;
      if (cells.filter((x) => x === p).length >= 2) continue;
      cells.push(p);
    }
  } else {
    while (cells.length < 9) {
      const p = SCRATCH_PRIZES[randInt(SCRATCH_PRIZES.length)]!;
      if (cells.filter((x) => x === p).length >= 2) continue;
      cells.push(p);
    }
  }
  const shuffled = fisherYates(cells);
  const counts = new Map<number, number>();
  for (const x of shuffled) counts.set(x, (counts.get(x) ?? 0) + 1);
  let winX = 0;
  for (const [k, n] of counts) if (n >= 3) winX = k;
  return { cells: shuffled, winX };
}

function weightedPrize(): number {
  const w = [28, 22, 16, 12, 10, 7, 4, 1];
  let r = randInt(w.reduce((a, b) => a + b, 0));
  for (let i = 0; i < w.length; i++) {
    r -= w[i]!;
    if (r < 0) return i;
  }
  return 0;
}

export type DtSide = "dragon" | "tiger" | "tie";

export type DtDeal = { dragon: PlayingCard; tiger: PlayingCard; winner: DtSide };

const RANK_ORDER = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"] as const;

export function dealDragonTiger(): DtDeal {
  const [a, b] = shoe(1);
  const dragon = a ?? makeCard("spades", "A");
  const tiger = b ?? makeCard("hearts", "K");
  const d = RANK_ORDER.indexOf(dragon.rank as (typeof RANK_ORDER)[number]);
  const t = RANK_ORDER.indexOf(tiger.rank as (typeof RANK_ORDER)[number]);
  const winner: DtSide = d === t ? "tie" : d > t ? "dragon" : "tiger";
  return { dragon, tiger, winner };
}

export function dtPay(side: DtSide, winner: DtSide, stake: number): number {
  if (side === "tie") return winner === "tie" ? stake * 9 : 0;
  if (winner === "tie") return Math.round(stake * 0.5);
  return side === winner ? stake * 2 : 0;
}
