import { randInt, weightedPick } from "./rng";
import type { Cell, LineWin, SlotDef, SlotSymbol, SpinResult } from "./slots";
import type { ReelVariant } from "./slotThemes";

export const OLYMP_ANTE = 1.25;
export const OLYMP_BUY = 100;

const ORBS: { v: number; weight: number }[] = [
  { v: 2, weight: 280 },
  { v: 3, weight: 220 },
  { v: 4, weight: 160 },
  { v: 5, weight: 120 },
  { v: 6, weight: 80 },
  { v: 8, weight: 50 },
  { v: 10, weight: 40 },
  { v: 12, weight: 20 },
  { v: 15, weight: 15 },
  { v: 20, weight: 10 },
  { v: 25, weight: 8 },
  { v: 50, weight: 4 },
  { v: 100, weight: 2 },
  { v: 250, weight: 1 },
  { v: 500, weight: 1 },
];

export function pickOrb(): number {
  return weightedPick(ORBS).v;
}

export function makeOrb(mult: number): SlotSymbol {
  return { id: "orb", label: `×${mult}`, kind: "high", weight: 0, pays: [0, 0, 0], wildMult: mult };
}

export function isOrb(s: SlotSymbol): boolean {
  return s.id === "orb";
}

export function isPaySym(s: SlotSymbol): boolean {
  return s.kind !== "scatter" && s.id !== "orb";
}

export type PaysKit = {
  symbols: SlotSymbol[];
  orbBase: number;
  orbFs: number;
  fsCount: number;
  retrigger: number;
  forceId: string;
  maxX: number;
};

export type PaysPack = {
  slug: string;
  name: string;
  kicker: string;
  hint: string;
  bg: string;
  statue?: string;
  skin: string;
  variant: ReelVariant;
  bed: number;
  def: SlotDef;
  buy: number;
  kit: PaysKit;
  scatterName: string;
};

const tile = (id: string) => `/games/sym/olymp-${id}.jpg`;

function sym(
  id: string,
  label: string,
  kind: SlotSymbol["kind"],
  weight: number,
  pays: readonly [number, number, number],
): SlotSymbol {
  return { id, label, kind, weight, pays, art: tile(id) };
}

export const OLYMP_SYMBOLS: SlotSymbol[] = [
  sym("blue", "Saphir", "low", 16, [0.25, 0.75, 2]),
  sym("green", "Smaragd", "low", 14, [0.4, 0.9, 4]),
  sym("yellow", "Topas", "low", 12, [0.5, 1, 5]),
  sym("purple", "Amethyst", "mid", 10, [0.8, 1.2, 8]),
  sym("red", "Rubin", "mid", 9, [1, 1.5, 10]),
  sym("goblet", "Kelch", "mid", 7, [1.5, 2, 12]),
  { id: "ring", label: "Ring", kind: "high", weight: 6, pays: [2, 5, 15], art: tile("ring") },
  { id: "hourglass", label: "Uhr", kind: "high", weight: 5, pays: [2.5, 10, 25], art: tile("hourglass") },
  { id: "crown", label: "Krone", kind: "high", weight: 4, pays: [10, 25, 50], art: tile("crown") },
  { id: "zeus", label: "Gott", kind: "scatter", weight: 3, pays: [3, 5, 100], art: tile("zeus") },
];

export const OLYMP_KIT: PaysKit = {
  symbols: OLYMP_SYMBOLS,
  orbBase: 0.046,
  orbFs: 0.11,
  fsCount: 15,
  retrigger: 5,
  forceId: "crown",
  maxX: 5000,
};

export const OLYMP_DEF: SlotDef = {
  slug: "olymp-tor",
  reels: 6,
  rows: 5,
  paylines: [],
  symbols: OLYMP_SYMBOLS,
  betSteps: [20, 40, 80, 100, 200, 400, 1000, 2000, 5000],
  defaultBet: 100,
  freeSpinsFrom: 4,
  freeSpinCount: 15,
  fsMultiplier: 1,
  pityAfter: 14,
  mechanic: "olympus",
  tumble: true,
};

export const OLYMP_PACK: PaysPack = {
  slug: "olymp-tor",
  name: "Olymp-Tor",
  kicker: "6×5 · 8+ überall",
  hint: "8 gleiche Symbole zahlen überall · Orbs addieren sich",
  bg: "/games/olymp-tor.jpg",
  statue: "/games/char-olymp.jpg",
  skin: "olymp",
  variant: "olymp",
  bed: 98,
  def: OLYMP_DEF,
  buy: 100,
  kit: OLYMP_KIT,
  scatterName: "Gott",
};

export function costOf(bet: number, ante: boolean): number {
  return ante ? Math.round(bet * OLYMP_ANTE) : bet;
}

function pickCell(kit: PaysKit, ante: boolean, fs: boolean): SlotSymbol {
  if (Math.random() < (fs ? kit.orbFs : kit.orbBase)) return makeOrb(pickOrb());
  const pool = kit.symbols.map((s) => (s.kind === "scatter" ? { ...s, weight: s.weight * (ante ? 2 : 1) } : s));
  return weightedPick(pool);
}

export function spinPays(kit: PaysKit, ante: boolean, fs: boolean, force: "fs" | "win" | null = null): SlotSymbol[][] {
  const grid: SlotSymbol[][] = [];
  for (let r = 0; r < 6; r++) {
    const col: SlotSymbol[] = [];
    for (let row = 0; row < 5; row++) col.push(pickCell(kit, ante, fs));
    grid.push(col);
  }
  if (force === "fs") {
    const scatter = kit.symbols.find((s) => s.kind === "scatter")!;
    for (let i = 0; i < 4; i++) grid[i % 6]![randInt(5)] = scatter;
  } else if (force === "win") {
    const high = kit.symbols.find((s) => s.id === kit.forceId) ?? kit.symbols[0]!;
    let n = 0;
    for (let r = 0; r < 6 && n < 8; r++) {
      for (let row = 0; row < 5 && n < 8; row++) {
        if (isPaySym(grid[r]![row]!)) {
          grid[r]![row] = high;
          n += 1;
        }
      }
    }
  }
  return grid;
}

export function spinOlympus(ante: boolean, fs: boolean, force: "fs" | "win" | null = null): SlotSymbol[][] {
  return spinPays(OLYMP_KIT, ante, fs, force);
}

export function orbTotal(grid: SlotSymbol[][]): number {
  let s = 0;
  for (const col of grid) for (const c of col) if (isOrb(c)) s += c.wildMult ?? 0;
  return s;
}

function band(count: number): 0 | 1 | 2 | -1 {
  if (count >= 12) return 2;
  if (count >= 10) return 1;
  if (count >= 8) return 0;
  return -1;
}

export function evaluatePays(kit: PaysKit, grid: SlotSymbol[][], stake: number, inFs: boolean): SpinResult {
  const groups = new Map<string, { symbol: SlotSymbol; cells: Cell[] }>();
  const scatterCells: Cell[] = [];
  grid.forEach((col, reel) =>
    col.forEach((symbol, row) => {
      if (symbol.kind === "scatter") scatterCells.push({ symbol, reel, row });
      else if (isPaySym(symbol)) {
        const g = groups.get(symbol.id) ?? { symbol, cells: [] };
        g.cells.push({ symbol, reel, row });
        groups.set(symbol.id, g);
      }
    }),
  );

  const lineWins: LineWin[] = [];
  for (const g of groups.values()) {
    const b = band(g.cells.length);
    if (b === -1) continue;
    const pay = g.symbol.pays[b];
    if (pay <= 0) continue;
    lineWins.push({
      line: 0,
      symbol: g.symbol,
      count: g.cells.length,
      cells: g.cells,
      payout: Math.round(stake * pay),
      ways: g.cells.length,
    });
  }

  const scatterCount = scatterCells.length;
  let scatterPayout = 0;
  let freeSpinsAwarded = 0;
  if (!inFs && scatterCount >= 4) {
    scatterPayout = Math.round(stake * (scatterCount >= 6 ? 100 : scatterCount === 5 ? 5 : 3));
    freeSpinsAwarded = kit.fsCount;
  } else if (inFs && scatterCount >= 3) {
    freeSpinsAwarded = kit.retrigger;
  }

  const totalPayout = lineWins.reduce((s, w) => s + w.payout, 0) + scatterPayout;
  return { grid, lineWins, scatterCount, scatterPayout, totalPayout, freeSpinsAwarded, expandedReels: [] };
}

export function evaluateOlympus(grid: SlotSymbol[][], stake: number, inFs: boolean): SpinResult {
  return evaluatePays(OLYMP_KIT, grid, stake, inFs);
}

export function dropPays(kit: PaysKit, grid: SlotSymbol[][], vanish: Set<string>, ante: boolean, fs: boolean): SlotSymbol[][] {
  return grid.map((col, r) => {
    const kept: SlotSymbol[] = [];
    for (let row = 0; row < 5; row++) {
      if (!vanish.has(`${r}-${row}`)) kept.push(col[row]!);
    }
    const news = Array.from({ length: 5 - kept.length }, () => pickCell(kit, ante, fs));
    return [...news, ...kept];
  });
}

export function dropOlympus(grid: SlotSymbol[][], vanish: Set<string>, ante: boolean, fs: boolean): SlotSymbol[][] {
  return dropPays(OLYMP_KIT, grid, vanish, ante, fs);
}

export function olympWinKeys(result: SpinResult): Set<string> {
  const set = new Set<string>();
  result.lineWins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
  return set;
}

export function capWin(cents: number, stake: number, maxX = 5000): number {
  return Math.min(cents, stake * maxX);
}
