import { useCallback, useEffect, useRef, useState } from "react";
import { NeedBankroll } from "./NeedBankroll";
import { OriginalShell, ORIGINAL_STEPS, ResultBar } from "./OriginalsChrome";
import { WinCelebration } from "./WinCelebration";
import {
  PLINKO_COUNTS,
  PLINKO_MAX_BALLS,
  PLINKO_MULT,
  interp,
  makeBoard,
  spawnBall,
  stepWorld,
  type PlinkoBall,
  type PlinkoBoard,
  type Spark,
  type StepEvent,
} from "@/lib/casino/plinko";
import { winTier, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";

type Hit = { id: number; slot: number; pay: number; bet: number };

export function PlinkoView() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<PlinkoBoard | null>(null);
  const ballsRef = useRef<PlinkoBall[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const palRef = useRef<Palette | null>(null);
  const bounceAt = useRef(0);
  const accRef = useRef(0);
  const lastRef = useRef(0);
  const hotRef = useRef<number | null>(null);
  const [betI, setBetI] = useState(1);
  const [count, setCount] = useState<(typeof PLINKO_COUNTS)[number]>(1);
  const [flying, setFlying] = useState(0);
  const [hits, setHits] = useState<Hit[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const soundRef = useRef(soundOn);
  soundRef.current = soundOn;
  const creditRef = useRef(creditWin);
  creditRef.current = creditWin;

  const resize = useCallback(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(280, wrap.clientWidth);
    const h = Math.max(420, Math.round(w * 1.28));
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    boardRef.current = makeBoard(w, h);
    palRef.current = readPalette();
  }, []);

  const applyEvents = useCallback((events: StepEvent[]) => {
    let landed = 0;
    for (const ev of events) {
      if (ev.kind === "bounce") {
        if (soundRef.current && performance.now() - bounceAt.current > 42) {
          bounceAt.current = performance.now();
          sfx.tick();
        }
      } else {
        landed += 1;
        if (ev.pay > 0) creditRef.current(ev.pay, "Plinko · Gewinn");
        setLast(ev.pay);
        hotRef.current = ev.slot;
        setHits((h) => [{ id: ev.ball.id, slot: ev.slot, pay: ev.pay, bet: ev.ball.bet }, ...h].slice(0, 14));
        const tier = winTier(ev.pay, ev.ball.bet);
        if (tier !== "none") setCelebrate({ payout: ev.pay, stake: ev.ball.bet, tier });
        if (soundRef.current) {
          if (ev.pay > ev.ball.bet) sfx.win(ev.pay >= ev.ball.bet * 8);
          else if (ev.pay === 0) sfx.lose();
          else sfx.click();
        }
      }
    }
    if (landed) {
      window.setTimeout(() => {
        ballsRef.current = ballsRef.current.filter((b) => !(b.slot != null && b.settled > 0.55));
        setFlying(ballsRef.current.filter((b) => b.slot == null).length);
      }, 560);
    }
    setFlying(ballsRef.current.filter((b) => b.slot == null).length);
  }, []);

  const applyRef = useRef(applyEvents);
  applyRef.current = applyEvents;

  useEffect(() => {
    resize();
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => resize());
    ro.observe(wrap);
    window.addEventListener("resize", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    lastRef.current = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastRef.current) / 1000);
      lastRef.current = now;
      accRef.current += dt;
      const STEP = 1 / 120;
      const events: StepEvent[] = [];
      const board = boardRef.current;
      if (board) {
        let steps = 0;
        while (accRef.current >= STEP && steps < 8) {
          stepWorld(board, ballsRef.current, sparksRef.current, STEP, events);
          accRef.current -= STEP;
          steps += 1;
        }
        const alpha = accRef.current / STEP;
        drawBoard(canvasRef.current, board, ballsRef.current, sparksRef.current, palRef.current, alpha, hotRef.current);
      }
      if (events.length) applyRef.current(events);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function drop() {
    unlockAudio();
    const n = count;
    const liveNow = ballsRef.current.filter((b) => b.slot == null).length;
    if (liveNow + n > PLINKO_MAX_BALLS) return;
    const costNow = bet * n;
    if (balance < costNow) {
      setCashier(true);
      return;
    }
    if (!placeBet(costNow, n === 1 ? "Plinko · Einsatz" : `Plinko · ${n} Bälle`)) return;
    const board = boardRef.current ?? makeBoard(320, 420);
    for (let i = 0; i < n; i++) {
      ballsRef.current.push(spawnBall(board, bet, i * 0.12));
    }
    setFlying(ballsRef.current.filter((b) => b.slot == null).length);
    if (soundOn) sfx.chip();
  }

  const cost = bet * count;
  const live = flying;
  const blocked = live + count > PLINKO_MAX_BALLS || balance < cost;

  return (
    <OriginalShell title="Plinko" subtitle="12 Peg-Reihen · Bälle prallen · bis 25 auf einmal" slug="plinko">
      <div ref={wrapRef} className="relative mx-auto max-w-lg">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none rounded-xl border border-accent/20 bg-bg"
          aria-label="Plinko-Brett"
        />
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-1">
        {hits.slice(0, 10).map((h) => (
          <span
            key={h.id}
            className={cn(
              "rounded-md px-2 py-1 text-[11px] tabular-nums",
              h.pay > h.bet ? "bg-win/20 text-win" : h.pay === 0 ? "bg-loss/20 text-loss" : "bg-elevated text-muted",
            )}
          >
            {PLINKO_MULT[h.slot]}×
          </span>
        ))}
      </div>

      <ResultBar last={last} bet={bet} />

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="flex items-center rounded-md border border-accent/25 bg-surface">
          <button
            type="button"
            className="size-11"
            disabled={betI === 0}
            onClick={() => setBetI((i) => Math.max(0, i - 1))}
            aria-label="Einsatz senken"
          >
            <Minus className="mx-auto size-4" />
          </button>
          <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
          <button
            type="button"
            className="size-11"
            disabled={betI === ORIGINAL_STEPS.length - 1}
            onClick={() => setBetI((i) => Math.min(ORIGINAL_STEPS.length - 1, i + 1))}
            aria-label="Einsatz erhöhen"
          >
            <Plus className="mx-auto size-4" />
          </button>
        </div>
        <div className="flex rounded-md border border-accent/25 bg-surface p-1">
          {PLINKO_COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              className={cn(
                "h-9 min-w-10 rounded-sm px-2 text-sm tabular-nums",
                count === n ? "bg-accent text-accent-fg" : "text-muted",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={blocked}
          onClick={drop}
          className="ml-auto h-12 min-w-40 rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40"
        >
          {count === 1 ? "Ball fallen lassen" : `${count} Bälle · ${formatEuro(cost)}`}
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-subtle">
        {live > 0 ? `${live} ${live === 1 ? "Ball" : "Bälle"} unterwegs` : "Mehrere Bälle gleichzeitig möglich"}
      </p>
      <NeedBankroll />
      {celebrate ? (
        <WinCelebration
          payout={celebrate.payout}
          stake={celebrate.stake}
          tier={celebrate.tier}
          soundOn={soundOn}
          onDone={() => setCelebrate(null)}
        />
      ) : null}
    </OriginalShell>
  );
}

type Palette = {
  bg: string;
  surface: string;
  elevated: string;
  accent: string;
  fg: string;
  muted: string;
  win: string;
  loss: string;
};

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement);
  const v = (name: string, fb: string) => s.getPropertyValue(name).trim() || fb;
  return {
    bg: v("--color-bg", "#05070b"),
    surface: v("--color-surface", "#0c1118"),
    elevated: v("--color-elevated", "#141b24"),
    accent: v("--color-accent", "#2ee6c5"),
    fg: v("--color-fg", "#e8f0f5"),
    muted: v("--color-muted", "#8b97a6"),
    win: v("--color-win", "#5ee0a0"),
    loss: v("--color-loss", "#ff6b73"),
  };
}

function drawBoard(
  canvas: HTMLCanvasElement | null,
  board: PlinkoBoard,
  balls: PlinkoBall[],
  sparks: Spark[],
  pal: Palette | null,
  alpha: number,
  hot: number | null,
) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const c = pal ?? readPalette();
  const { w, h } = board;
  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, c.surface);
  bg.addColorStop(1, c.bg);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = withAlpha(c.accent, 0.07);
  ctx.lineWidth = 1;
  for (let x = 24; x < w; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  ctx.fillStyle = withAlpha(c.accent, 0.18);
  ctx.beginPath();
  ctx.moveTo(board.funnelX - 22, 4);
  ctx.lineTo(board.funnelX + 22, 4);
  ctx.lineTo(board.funnelX + 10, 22);
  ctx.lineTo(board.funnelX - 10, 22);
  ctx.closePath();
  ctx.fill();

  for (const p of board.pegs) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r + 1.2, 0, Math.PI * 2);
    ctx.fillStyle = withAlpha(c.accent, 0.18);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = c.accent;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x - 1.1, p.y - 1.1, p.r * 0.35, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fill();
  }

  for (const bin of board.bins) {
    const m = PLINKO_MULT[bin.i] ?? 0;
    const edge = Math.abs(bin.i - 6);
    const active = hot === bin.i;
    const fill =
      m >= 8 ? withAlpha(c.win, active ? 0.55 : 0.28) : m >= 1 ? withAlpha(c.accent, active ? 0.45 : 0.16) : withAlpha(c.loss, active ? 0.4 : 0.16);
    roundRect(ctx, bin.x + 2, board.binTop + 2, bin.w - 4, h - board.binTop - 8, 5);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = active ? c.accent : withAlpha(c.accent, 0.25);
    ctx.lineWidth = active ? 1.6 : 1;
    ctx.stroke();
    ctx.fillStyle = edge >= 5 ? c.win : c.fg;
    ctx.font = `600 ${bin.w < 22 ? 9 : 11}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${m}×`, bin.x + bin.w / 2, board.binTop + (h - board.binTop) / 2);
  }

  for (const s of sparks) {
    const a = Math.max(0, s.life / s.max);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = withAlpha(c.accent, a);
    ctx.fill();
  }

  for (const b of balls) {
    if (b.wait > 0 && b.y < 8) continue;
    const p = interp(b, alpha);
    ctx.beginPath();
    ctx.arc(p.x, p.y, b.r + 3, 0, Math.PI * 2);
    ctx.fillStyle = withAlpha(c.accent, 0.22);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, b.r, 0, Math.PI * 2);
    const g = ctx.createRadialGradient(p.x - 2, p.y - 2, 1, p.x, p.y, b.r);
    g.addColorStop(0, "#f5fffb");
    g.addColorStop(0.45, c.accent);
    g.addColorStop(1, "#0a3d36");
    ctx.fillStyle = g;
    ctx.fill();
  }
}

function withAlpha(color: string, a: number): string {
  if (color.startsWith("#") && (color.length === 7 || color.length === 4)) {
    const hex = color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` : color;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return color;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
