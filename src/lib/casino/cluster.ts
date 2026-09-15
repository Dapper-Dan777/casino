import { randInt } from "./rng";

export const CLUSTER_COLORS = [
  { id: "amber", fill: "#e8a020", pay: 0.25 },
  { id: "rose", fill: "#e05070", pay: 0.3 },
  { id: "violet", fill: "#8a40d0", pay: 0.4 },
  { id: "leaf", fill: "#3cb06a", pay: 0.5 },
  { id: "sky", fill: "#3a88e0", pay: 0.8 },
  { id: "honey", fill: "#ffd45a", pay: 1.2 },
  { id: "bee", fill: "#1a1408", pay: 2.5 },
] as const;

export type ClusterCell = { id: string; fill: string; pay: number };

export const CLUSTER_SIZE = 7;

export function randomCell(): ClusterCell {
  const w = [18, 16, 14, 12, 10, 6, 4];
  let r = randInt(w.reduce((a, b) => a + b, 0));
  for (let i = 0; i < CLUSTER_COLORS.length; i++) {
    r -= w[i]!;
    if (r < 0) return { ...CLUSTER_COLORS[i]! };
  }
  return { ...CLUSTER_COLORS[0]! };
}

export function spinCluster(): ClusterCell[][] {
  return Array.from({ length: CLUSTER_SIZE }, () => Array.from({ length: CLUSTER_SIZE }, randomCell));
}

export type ClusterHit = { id: string; cells: string[]; pay: number };

export function findClusters(grid: ClusterCell[][]): ClusterHit[] {
  const seen = new Set<string>();
  const hits: ClusterHit[] = [];
  const n = CLUSTER_SIZE;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const key = `${r}-${c}`;
      if (seen.has(key)) continue;
      const id = grid[r]![c]!.id;
      const stack = [[r, c]];
      const cells: string[] = [];
      seen.add(key);
      while (stack.length) {
        const [y, x] = stack.pop()!;
        cells.push(`${y}-${x}`);
        for (const [dy, dx] of [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ] as const) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
          const nk = `${ny}-${nx}`;
          if (seen.has(nk)) continue;
          if (grid[ny]![nx]!.id !== id) continue;
          seen.add(nk);
          stack.push([ny, nx]);
        }
      }
      if (cells.length >= 5) {
        const pay = grid[r]![c]!.pay * (cells.length >= 12 ? 8 : cells.length >= 8 ? 3 : 1);
        hits.push({ id, cells, pay });
      }
    }
  }
  return hits;
}

export function dropCluster(grid: ClusterCell[][], vanish: Set<string>): ClusterCell[][] {
  const n = CLUSTER_SIZE;
  const next = grid.map((row) => row.slice());
  for (let c = 0; c < n; c++) {
    const kept: ClusterCell[] = [];
    for (let r = 0; r < n; r++) {
      if (!vanish.has(`${r}-${c}`)) kept.push(grid[r]![c]!);
    }
    const news = Array.from({ length: n - kept.length }, randomCell);
    const col = [...news, ...kept];
    for (let r = 0; r < n; r++) next[r]![c] = col[r]!;
  }
  return next;
}
