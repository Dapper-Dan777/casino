import { randInt } from "./rng";
import type { SlotSymbol } from "./slots";

export type FrameLevel = 0 | 1 | 2 | 3;

export const HUFF_TRIGGER_HATS = 6;
export const HUFF_FS = 6;
export const HUFF_PITY = 14;
export const HUFF_SAW_WHEEL = 2;

export const FRAME_LABEL = ["", "Stroh", "Holz", "Stein"] as const;

export type WheelSeg = {
  id: string;
  label: string;
  fill: string;
  ink: string;
  weight: number;
  extraFs: number;
  mult: number;
};

/** Wolf-Gold-style Mini / Minor / Major / Grand wheel. */
export const HUFF_WHEEL: WheelSeg[] = [
  { id: "mini-a", label: "MINI", fill: "#d4b06a", ink: "#1a1208", weight: 18, extraFs: 0, mult: 20 },
  { id: "x12", label: "12×", fill: "#2c1d14", ink: "#f3e6d0", weight: 11, extraFs: 0, mult: 12 },
  { id: "minor-a", label: "MINOR", fill: "#5eb3d6", ink: "#071018", weight: 12, extraFs: 0, mult: 50 },
  { id: "x25", label: "25×", fill: "#2c1d14", ink: "#f3e6d0", weight: 9, extraFs: 0, mult: 25 },
  { id: "major", label: "MAJOR", fill: "#e6b84d", ink: "#1a1208", weight: 6, extraFs: 0, mult: 200 },
  { id: "fs", label: "+8 FS", fill: "#3d7a45", ink: "#f3e6d0", weight: 10, extraFs: 8, mult: 0 },
  { id: "grand", label: "GRAND", fill: "#d4452f", ink: "#fff6f0", weight: 3, extraFs: 0, mult: 1000 },
  { id: "mini-b", label: "MINI", fill: "#d4b06a", ink: "#1a1208", weight: 16, extraFs: 0, mult: 20 },
  { id: "x8", label: "8×", fill: "#2c1d14", ink: "#f3e6d0", weight: 12, extraFs: 0, mult: 8 },
  { id: "minor-b", label: "MINOR", fill: "#5eb3d6", ink: "#071018", weight: 10, extraFs: 0, mult: 50 },
  { id: "x40", label: "40×", fill: "#2c1d14", ink: "#f3e6d0", weight: 7, extraFs: 0, mult: 40 },
  { id: "x15", label: "15×", fill: "#2c1d14", ink: "#f3e6d0", weight: 10, extraFs: 0, mult: 15 },
];

export const JACKPOT_METERS = [
  { id: "mini", label: "Mini", mult: 20 },
  { id: "minor", label: "Minor", mult: 50 },
  { id: "major", label: "Major", mult: 200 },
  { id: "grand", label: "Grand", mult: 1000 },
] as const;

export function emptyFrames(): FrameLevel[] {
  return Array.from({ length: 15 }, () => 0);
}

export function cellIndex(reel: number, row: number): number {
  return reel * 3 + row;
}

export function countId(grid: SlotSymbol[][], id: string): number {
  let n = 0;
  for (const col of grid) for (const s of col) if (s.id === id) n += 1;
  return n;
}

export function hatCells(grid: SlotSymbol[][]): number[] {
  const out: number[] = [];
  grid.forEach((col, r) =>
    col.forEach((s, row) => {
      if (s.id === "scatter") out.push(cellIndex(r, row));
    }),
  );
  return out;
}

export function applyHatFrames(frames: FrameLevel[], hats: number[]): FrameLevel[] {
  const next = frames.slice() as FrameLevel[];
  for (const i of hats) {
    const cur = next[i] ?? 0;
    if (cur < 3) {
      next[i] = (cur + 1) as FrameLevel;
    } else {
      const candidates = next.map((lv, idx) => (lv < 3 ? idx : -1)).filter((x) => x >= 0);
      if (candidates.length) {
        const pick = candidates[randInt(candidates.length)]!;
        next[pick] = ((next[pick] ?? 0) + 1) as FrameLevel;
      }
    }
  }
  return next;
}

export function housePay(level: FrameLevel, stake: number): number {
  if (level === 1) return Math.round(stake * [1, 2, 3, 5][randInt(4)]!);
  if (level === 2) return Math.round(stake * [6, 10, 15, 25][randInt(4)]!);
  if (level === 3) return Math.round(stake * [40, 80, 120, 200][randInt(4)]!);
  return 0;
}

export function settleHouses(frames: FrameLevel[], stake: number): { pays: number[]; total: number } {
  const pays = frames.map((lv) => housePay(lv, stake));
  return { pays, total: pays.reduce((s, n) => s + n, 0) };
}

export function spinHuffWheel(stake: number): {
  index: number;
  label: string;
  payout: number;
  extraFs: number;
} {
  const total = HUFF_WHEEL.reduce((s, x) => s + x.weight, 0);
  let r = randInt(total);
  let index = 0;
  for (let i = 0; i < HUFF_WHEEL.length; i++) {
    r -= HUFF_WHEEL[i]!.weight;
    if (r < 0) {
      index = i;
      break;
    }
  }
  const seg = HUFF_WHEEL[index]!;
  return { index, label: seg.label, payout: Math.round(stake * seg.mult), extraFs: seg.extraFs };
}

export function wheelPrize(stake: number): { label: string; payout: number; extraFs: number } {
  const r = spinHuffWheel(stake);
  return { label: r.label, payout: r.payout, extraFs: r.extraFs };
}

export function forceHats(grid: SlotSymbol[][], hat: SlotSymbol, n: number): SlotSymbol[][] {
  const next = grid.map((col) => col.slice());
  const spots = fisher(15);
  for (let k = 0; k < n && k < spots.length; k++) {
    const idx = spots[k]!;
    const reel = Math.floor(idx / 3);
    const row = idx % 3;
    next[reel]![row] = hat;
  }
  return next;
}

function fisher(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = randInt(i + 1);
    const t = a[i]!;
    a[i] = a[j]!;
    a[j] = t;
  }
  return a;
}
