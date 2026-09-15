import { randInt } from "./rng";

export {
  PLINKO_MULT,
  PLINKO_ROWS,
  PLINKO_BINS,
  plinkoPath,
  plinkoPayout,
} from "./plinko";

export function minesMultiplier(gems: number, mineCount: number, size = 25): number {
  let m = 1;
  for (let i = 0; i < gems; i++) {
    m *= (size - mineCount - i) / (size - i);
  }
  if (m <= 0) return 0;
  return Math.floor((0.97 / m) * 100) / 100;
}

export function minesLayout(mineCount: number, size = 25): boolean[] {
  const cells = Array.from({ length: size }, () => false);
  let placed = 0;
  while (placed < mineCount) {
    const i = randInt(size);
    if (!cells[i]) {
      cells[i] = true;
      placed += 1;
    }
  }
  return cells;
}

/** Instant 1.00x ~1%, else 0.97 / U — house edge ~3%. */
export function crashPoint(): number {
  if (randInt(100) === 0) return 1;
  const u = (randInt(1_000_000) + 1) / 1_000_000;
  const raw = 0.97 / u;
  return Math.max(1.01, Math.floor(raw * 100) / 100);
}
