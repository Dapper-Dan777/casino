import { randInt, weightedPick } from "./rng";

export const TRAIN_COLS = 5;
export const TRAIN_ROWS = 4;
export const TRAIN_CAP = 5000;
export const TRAIN_TRIGGER = 6;
export const TRAIN_RESPINS = 3;

export type TrainKind = "empty" | "cash" | "sammler" | "nachbar" | "auge" | "plus" | "super" | "multi";

export type TrainCell = {
  kind: TrainKind;
  mult?: number;
  lock?: boolean;
};

const CASH_BAG: { mult: number; weight: number }[] = [
  { mult: 1, weight: 22 },
  { mult: 2, weight: 18 },
  { mult: 3, weight: 14 },
  { mult: 5, weight: 12 },
  { mult: 8, weight: 8 },
  { mult: 10, weight: 7 },
  { mult: 15, weight: 5 },
  { mult: 20, weight: 4 },
  { mult: 25, weight: 3 },
  { mult: 50, weight: 2 },
  { mult: 100, weight: 1 },
];

function cash(): TrainCell {
  return { kind: "cash", mult: weightedPick(CASH_BAG).mult, lock: true };
}

export function spinTrainBase(force = false): TrainCell[][] {
  const grid: TrainCell[][] = [];
  for (let c = 0; c < TRAIN_COLS; c++) {
    const col: TrainCell[] = [];
    for (let r = 0; r < TRAIN_ROWS; r++) {
      const roll = randInt(100);
      if (roll < 18) col.push(cash());
      else col.push({ kind: "empty" });
    }
    grid.push(col);
  }
  if (force) {
    let n = 0;
    for (let c = 0; c < TRAIN_COLS && n < TRAIN_TRIGGER; c++) {
      for (let r = 0; r < TRAIN_ROWS && n < TRAIN_TRIGGER; r++) {
        if (grid[c]![r]!.kind !== "cash") {
          grid[c]![r] = cash();
          n += 1;
        } else n += 1;
      }
    }
  }
  return grid;
}

export function countCash(grid: TrainCell[][]): number {
  let n = 0;
  for (const col of grid) for (const cell of col) if (cell.kind !== "empty") n += 1;
  return n;
}

const BONUS_BAG: { kind: TrainKind; weight: number }[] = [
  { kind: "empty", weight: 62 },
  { kind: "cash", weight: 22 },
  { kind: "sammler", weight: 5 },
  { kind: "nachbar", weight: 4 },
  { kind: "auge", weight: 3 },
  { kind: "plus", weight: 2 },
  { kind: "super", weight: 1 },
  { kind: "multi", weight: 1 },
];

export function spinTrainBonusCell(): TrainCell {
  const kind = weightedPick(BONUS_BAG).kind;
  if (kind === "empty") return { kind: "empty" };
  if (kind === "cash") return cash();
  return { kind, lock: true };
}

export function applyCollectors(grid: TrainCell[][], persist: number): { grid: TrainCell[][]; collected: number } {
  const next = grid.map((col) => col.map((c) => ({ ...c })));
  let collected = 0;
  const cashAt = (c: number, r: number) => {
    const cell = next[c]?.[r];
    return cell?.kind === "cash" ? cell.mult ?? 0 : 0;
  };

  const runOnce = (kind: TrainKind, c: number, r: number) => {
    const power = 1 + persist;
    if (kind === "sammler" || kind === "super") {
      for (let x = 0; x < TRAIN_COLS; x++) {
        for (let y = 0; y < TRAIN_ROWS; y++) collected += cashAt(x, y);
      }
      collected *= power;
    } else if (kind === "nachbar") {
      for (const [dx, dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ] as const) {
        collected += cashAt(c + dx, r + dy) * power;
      }
    } else if (kind === "auge") {
      let best = 0;
      for (let x = 0; x < TRAIN_COLS; x++) {
        for (let y = 0; y < TRAIN_ROWS; y++) best = Math.max(best, cashAt(x, y));
      }
      collected += best * power;
    } else if (kind === "multi") {
      for (let x = 0; x < TRAIN_COLS; x++) {
        for (let y = 0; y < TRAIN_ROWS; y++) {
          const cell = next[x]![y]!;
          if (cell.kind === "cash" && cell.mult) cell.mult *= 2;
        }
      }
    }
  };

  for (let c = 0; c < TRAIN_COLS; c++) {
    for (let r = 0; r < TRAIN_ROWS; r++) {
      const cell = next[c]![r]!;
      if (cell.kind === "sammler" || cell.kind === "nachbar" || cell.kind === "auge" || cell.kind === "super" || cell.kind === "multi") {
        runOnce(cell.kind, c, r);
      }
    }
  }
  return { grid: next, collected };
}

export function leftoverCash(grid: TrainCell[][]): number {
  let s = 0;
  for (const col of grid) for (const cell of col) if (cell.kind === "cash") s += cell.mult ?? 0;
  return s;
}

export const TRAIN_LABEL: Record<TrainKind, string> = {
  empty: "",
  cash: "Münze",
  sammler: "Sammler",
  nachbar: "Nachbar",
  auge: "Auge",
  plus: "+1",
  super: "Super",
  multi: "×2",
};
