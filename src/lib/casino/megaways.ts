import { randInt, weightedPick } from "./rng";

export type MegaSym = {
  id: string;
  label: string;
  kind: "low" | "mid" | "high" | "wild" | "scatter";
  weight: number;
  /** 3 / 4 / 5 / 6 of a kind vs total stake. */
  pays: readonly [number, number, number, number];
  art: string;
};

export const MEGA_SYMS: MegaSym[] = [
  { id: "j", label: "J", kind: "low", weight: 16, pays: [0.15, 0.4, 0.9, 1.8], art: "/games/sym/wege-j.jpg" },
  { id: "q", label: "Q", kind: "low", weight: 15, pays: [0.15, 0.4, 0.9, 1.8], art: "/games/sym/wege-q.jpg" },
  { id: "k", label: "K", kind: "low", weight: 13, pays: [0.2, 0.6, 1.2, 2.5], art: "/games/sym/wege-k.jpg" },
  { id: "a", label: "A", kind: "low", weight: 12, pays: [0.2, 0.6, 1.2, 2.5], art: "/games/sym/wege-a.jpg" },
  { id: "gem", label: "Stein", kind: "mid", weight: 8, pays: [0.4, 1.2, 3, 8], art: "/games/sym/wege-gem.jpg" },
  { id: "crown", label: "Krone", kind: "high", weight: 5, pays: [0.8, 2.5, 8, 20], art: "/games/sym/wege-crown.jpg" },
  { id: "wild", label: "Maske", kind: "wild", weight: 4, pays: [0, 0, 0, 0], art: "/games/sym/wege-wild.jpg" },
  { id: "scatter", label: "Flut", kind: "scatter", weight: 3, pays: [0, 0, 0, 0], art: "/games/sym/wege-scatter.jpg" },
];

export const MEGA_REELS = 6;
export const MEGA_MAX = 7;
export const MEGA_MIN = 2;
export const MEGA_CAP = 5000;

const HEIGHT_W = [
  { n: 2, weight: 8 },
  { n: 3, weight: 16 },
  { n: 4, weight: 22 },
  { n: 5, weight: 22 },
  { n: 6, weight: 18 },
  { n: 7, weight: 14 },
];

export type MegaGrid = MegaSym[][];

export function pickMega(allowScatter = true): MegaSym {
  const pool = allowScatter ? MEGA_SYMS : MEGA_SYMS.filter((s) => s.kind !== "scatter");
  return { ...weightedPick(pool) };
}

export function spinMega(forceScatters = 0): MegaGrid {
  const grid: MegaGrid = [];
  for (let r = 0; r < MEGA_REELS; r++) {
    const h = weightedPick(HEIGHT_W).n;
    const col: MegaSym[] = [];
    for (let i = 0; i < h; i++) col.push(pickMega(r > 0 && r < 5));
    grid.push(col);
  }
  if (forceScatters > 0) {
    const sc = MEGA_SYMS.find((s) => s.kind === "scatter")!;
    let n = 0;
    for (let r = 1; r < 5 && n < forceScatters; r++) {
      grid[r]![0] = { ...sc };
      n += 1;
    }
  }
  return grid;
}

export type MegaWin = { id: string; count: number; ways: number; pay: number; cells: string[] };

export function evalMega(grid: MegaGrid, stake: number, mult: number): { wins: MegaWin[]; scatter: number; payout: number; ways: number } {
  const paying = MEGA_SYMS.filter((s) => s.kind !== "wild" && s.kind !== "scatter");
  const wins: MegaWin[] = [];
  let waysTotal = 1;
  for (const col of grid) waysTotal *= col.length;

  for (const target of paying) {
    const cells: string[] = [];
    const per: number[] = [];
    for (let r = 0; r < grid.length; r++) {
      let n = 0;
      grid[r]!.forEach((s, row) => {
        if (s.id === target.id || s.kind === "wild") {
          n += 1;
          cells.push(`${r}-${row}`);
        }
      });
      if (n === 0) break;
      per.push(n);
    }
    const count = per.length;
    if (count < 3) continue;
    const ways = per.reduce((a, b) => a * b, 1);
    const payX = target.pays[Math.min(count, 6) - 3] ?? 0;
    const pay = Math.round(stake * payX * ways * mult);
    if (pay > 0) wins.push({ id: target.id, count, ways, pay, cells });
  }

  let scatter = 0;
  for (const col of grid) for (const s of col) if (s.kind === "scatter") scatter += 1;
  const scatterPay = scatter >= 4 ? Math.round(stake * (scatter === 4 ? 3 : scatter === 5 ? 10 : 50)) : 0;
  const payout = Math.min(stake * MEGA_CAP, wins.reduce((s, w) => s + w.pay, 0) + scatterPay);
  return { wins, scatter, payout, ways: waysTotal };
}

export function dropMega(grid: MegaGrid, vanish: Set<string>): MegaGrid {
  return grid.map((col, r) => {
    const kept = col.filter((_, row) => !vanish.has(`${r}-${row}`));
    const need = col.length - kept.length;
    const fill = Array.from({ length: need }, () => pickMega(false));
    return [...kept, ...fill];
  });
}

export function megaFsAward(scatter: number): number {
  if (scatter >= 6) return 24;
  if (scatter >= 5) return 16;
  if (scatter >= 4) return 12;
  return 0;
}
