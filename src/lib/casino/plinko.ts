import { randInt } from "./rng";

/** 12 peg rows → 13 bins. Binomial walk EV ≈ 96,6 % RTP. */
export const PLINKO_ROWS = 12;
export const PLINKO_BINS = 13;
export const PLINKO_MULT = [26, 9, 3, 1.5, 1.1, 0.8, 0.3, 0.8, 1.1, 1.5, 3, 9, 26] as const;
export const PLINKO_MAX_BALLS = 50;
export const PLINKO_COUNTS = [1, 5, 10, 25] as const;

export function plinkoPayout(stake: number, slot: number): number {
  const m = PLINKO_MULT[slot] ?? 0.3;
  return Math.round(stake * m);
}

export function plinkoPath(): { bins: number[]; slot: number } {
  let x = 0;
  const bins = [0];
  for (let r = 0; r < PLINKO_ROWS; r++) {
    x += randInt(2) === 0 ? -1 : 1;
    bins.push(x);
  }
  const slot = Math.min(PLINKO_BINS - 1, Math.max(0, Math.round((x + PLINKO_ROWS) / 2)));
  return { bins, slot };
}

export type Peg = { x: number; y: number; r: number };
export type Bin = { i: number; x: number; w: number };
export type PlinkoBall = {
  id: number;
  x: number;
  y: number;
  px: number;
  py: number;
  vx: number;
  vy: number;
  r: number;
  bet: number;
  wait: number;
  slot: number | null;
  settled: number;
  hue: number;
  paid: boolean;
};
export type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; r: number };

export type PlinkoBoard = {
  w: number;
  h: number;
  pegs: Peg[];
  bins: Bin[];
  binTop: number;
  pad: number;
  funnelX: number;
};

const GRAVITY = 1680;
const RESTITUTION = 0.64;
const AIR = 0.999;
const PEG_R = 4.35;
const BALL_R = 7.1;
const MIN_BOUNCE = 92;

export function makeBoard(w: number, h: number): PlinkoBoard {
  const pad = Math.max(10, w * 0.045);
  const top = Math.max(28, h * 0.07);
  const binTop = h - Math.max(48, h * 0.13);
  const rowH = (binTop - top - 8) / (PLINKO_ROWS - 0.15);
  const lastCount = PLINKO_ROWS + 2;
  const usable = w - pad * 2;
  const maxSpan = usable * 0.96;
  const lastGap = maxSpan / (lastCount - 1);
  const pegs: Peg[] = [];
  for (let r = 0; r < PLINKO_ROWS; r++) {
    const count = r + 3;
    const span = lastGap * (count - 1);
    const x0 = (w - span) / 2;
    const y = top + r * rowH;
    for (let i = 0; i < count; i++) {
      pegs.push({ x: x0 + i * lastGap, y, r: PEG_R });
    }
  }
  const bins: Bin[] = [];
  const binSpan = lastGap * (lastCount - 1);
  const bin0 = (w - binSpan) / 2 - lastGap / 2;
  for (let i = 0; i < PLINKO_BINS; i++) {
    bins.push({ i, x: bin0 + i * lastGap, w: lastGap });
  }
  return { w, h, pegs, bins, binTop, pad, funnelX: w / 2 };
}

let nextId = 1;

export function spawnBall(board: PlinkoBoard, bet: number, wait: number): PlinkoBall {
  const jitter = (randInt(160) - 80) / 10;
  const x = board.funnelX + jitter;
  const y = 10 + (randInt(8) - 4) / 4;
  const r = BALL_R;
  return {
    id: nextId++,
    x,
    y,
    px: x,
    py: y,
    vx: (randInt(80) - 40) * 0.35,
    vy: 18 + randInt(24),
    r,
    bet,
    wait,
    slot: null,
    settled: 0,
    hue: randInt(40),
    paid: false,
  };
}

function collidePeg(b: PlinkoBall, p: Peg): boolean {
  const dx = b.x - p.x;
  const dy = b.y - p.y;
  const min = b.r + p.r;
  const d2 = dx * dx + dy * dy;
  if (d2 >= min * min || d2 === 0) return false;
  const d = Math.sqrt(d2);
  const nx = dx / d;
  const ny = dy / d;
  const overlap = min - d + 0.05;
  b.x += nx * overlap;
  b.y += ny * overlap;
  const vn = b.vx * nx + b.vy * ny;
  if (vn < 0) {
    b.vx -= (1 + RESTITUTION) * vn * nx;
    b.vy -= (1 + RESTITUTION) * vn * ny;
    const speed = Math.hypot(b.vx, b.vy);
    if (speed < MIN_BOUNCE) {
      const boost = (MIN_BOUNCE - speed) / Math.max(0.001, speed);
      b.vx += b.vx * boost;
      b.vy += b.vy * boost;
    }
    const tx = -ny;
    const ty = nx;
    const kick = (randInt(50) - 25) * 1.4;
    b.vx += tx * kick;
    b.vy += ty * kick * 0.25;
    return true;
  }
  return false;
}

function collideBalls(a: PlinkoBall, b: PlinkoBall): void {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const min = a.r + b.r;
  const d2 = dx * dx + dy * dy;
  if (d2 >= min * min || d2 === 0) return;
  const d = Math.sqrt(d2);
  const nx = dx / d;
  const ny = dy / d;
  const overlap = (min - d) / 2;
  a.x -= nx * overlap;
  a.y -= ny * overlap;
  b.x += nx * overlap;
  b.y += ny * overlap;
  const av = a.vx * nx + a.vy * ny;
  const bv = b.vx * nx + b.vy * ny;
  const diff = bv - av;
  if (diff > 0) return;
  const impulse = diff * 0.52;
  a.vx += impulse * nx;
  a.vy += impulse * ny;
  b.vx -= impulse * nx;
  b.vy -= impulse * ny;
}

export function slotFromX(board: PlinkoBoard, x: number): number {
  let best = 0;
  let bestD = Infinity;
  for (const bin of board.bins) {
    const cx = bin.x + bin.w / 2;
    const d = Math.abs(cx - x);
    if (d < bestD) {
      bestD = d;
      best = bin.i;
    }
  }
  return best;
}

export type StepEvent = { kind: "bounce"; x: number; y: number } | { kind: "land"; ball: PlinkoBall; slot: number; pay: number };

export function stepWorld(
  board: PlinkoBoard,
  balls: PlinkoBall[],
  sparks: Spark[],
  dt: number,
  events: StepEvent[],
): void {
  for (const b of balls) {
    if (b.slot != null) {
      b.settled += dt;
      const bin = board.bins[b.slot];
      if (bin) {
        const cx = bin.x + bin.w / 2;
        b.px = b.x;
        b.py = b.y;
        b.x += (cx - b.x) * Math.min(1, dt * 10);
        b.y += (board.h - 14 - b.y) * Math.min(1, dt * 8);
        b.vx = 0;
        b.vy = 0;
      }
      continue;
    }
    if (b.wait > 0) {
      b.wait -= dt;
      b.px = b.x;
      b.py = b.y;
      continue;
    }
    b.px = b.x;
    b.py = b.y;
    b.vy += GRAVITY * dt;
    b.vx *= AIR;
    b.vy *= 0.9994;
    b.vx = Math.max(-460, Math.min(460, b.vx));
    b.vy = Math.min(b.vy, 620);
    b.x += b.vx * dt;
    b.y += b.vy * dt;

    const left = board.pad + b.r;
    const right = board.w - board.pad - b.r;
    if (b.x < left) {
      b.x = left;
      b.vx = Math.abs(b.vx) * 0.55 + 20;
    } else if (b.x > right) {
      b.x = right;
      b.vx = -Math.abs(b.vx) * 0.55 - 20;
    }

    if (b.y - b.r < 2) {
      b.y = 2 + b.r;
      b.vy = Math.abs(b.vy) * 0.2;
    }

    let bounced = false;
    for (const p of board.pegs) {
      if (Math.abs(p.y - b.y) > b.r + p.r + 6) continue;
      if (collidePeg(b, p)) bounced = true;
    }
    if (bounced) {
      events.push({ kind: "bounce", x: b.x, y: b.y });
      sparks.push({
        x: b.x,
        y: b.y,
        vx: (randInt(80) - 40) * 2,
        vy: -40 - randInt(50),
        life: 0.18 + randInt(10) / 80,
        max: 0.28,
        r: 1.4,
      });
    }

    if (b.y + b.r >= board.binTop) {
      const slot = slotFromX(board, b.x);
      const bin = board.bins[slot];
      if (bin) {
        const leftW = bin.x + 1.5;
        const rightW = bin.x + bin.w - 1.5;
        if (b.x - b.r < leftW) {
          b.x = leftW + b.r;
          b.vx = Math.abs(b.vx) * 0.25;
        } else if (b.x + b.r > rightW) {
          b.x = rightW - b.r;
          b.vx = -Math.abs(b.vx) * 0.25;
        }
      }
      if (b.y + b.r >= board.binTop + 10 && !b.paid) {
        b.slot = slot;
        b.settled = 0;
        b.vx = 0;
        b.vy = 0;
        b.paid = true;
        const pay = plinkoPayout(b.bet, slot);
        events.push({ kind: "land", ball: b, slot, pay });
      }
    }
  }

  const live = balls.filter((b) => b.slot == null && b.wait <= 0);
  for (let i = 0; i < live.length; i++) {
    for (let j = i + 1; j < live.length; j++) {
      collideBalls(live[i]!, live[j]!);
    }
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i]!;
    s.life -= dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vy += 420 * dt;
    if (s.life <= 0) sparks.splice(i, 1);
  }
}

export function interp(b: PlinkoBall, alpha: number): { x: number; y: number } {
  return { x: b.px + (b.x - b.px) * alpha, y: b.py + (b.y - b.py) * alpha };
}
