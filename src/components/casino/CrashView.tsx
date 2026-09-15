import { useEffect, useRef, useState } from "react";
import { NeedBankroll } from "./NeedBankroll";
import { BetBar, OriginalShell, ORIGINAL_STEPS, ResultBar } from "./OriginalsChrome";
import { WinCelebration } from "./WinCelebration";
import { crashPoint } from "@/lib/casino/originals";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { winTier, type WinTier } from "@/lib/casino/slots";
import { cn } from "@/lib/utils";

type Sample = { t: number; m: number };

export function CrashView() {
  const [betI, setBetI] = useState(1);
  const [running, setRunning] = useState(false);
  const [mult, setMult] = useState(1);
  const [crash, setCrash] = useState<number | null>(null);
  const [cashed, setCashed] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const [samples, setSamples] = useState<Sample[]>([{ t: 0, m: 1 }]);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const target = useRef(1);
  const cashedRef = useRef(false);
  const raf = useRef(0);
  const pts = useRef<Sample[]>([{ t: 0, m: 1 }]);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const balance = useCasino((s) => s.balance);
  const soundOn = useCasino((s) => s.soundOn);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function start() {
    unlockAudio();
    if (running) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Lift · Einsatz")) return;
    if (soundOn) sfx.spin();
    const point = crashPoint();
    target.current = point;
    cashedRef.current = false;
    pts.current = [{ t: 0, m: 1 }];
    setSamples([{ t: 0, m: 1 }]);
    setCrash(null);
    setCashed(false);
    setLast(null);
    setMult(1);
    setRunning(true);
    const t0 = performance.now();
    const tick = (now: number) => {
      const s = (now - t0) / 1000;
      const m = Math.exp(s * 0.55);
      if (m >= target.current) {
        pts.current.push({ t: s, m: target.current });
        setSamples(pts.current.slice());
        setMult(target.current);
        setCrash(target.current);
        setRunning(false);
        if (!cashedRef.current) {
          setLast(0);
          if (soundOn) sfx.lose();
        }
        return;
      }
      pts.current.push({ t: s, m });
      if (pts.current.length % 2 === 0) setSamples(pts.current.slice());
      setMult(m);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }

  function cash() {
    if (!running || cashedRef.current) return;
    cashedRef.current = true;
    const pay = Math.round(bet * mult);
    creditWin(pay, "Lift · Cashout");
    setCashed(true);
    setLast(pay);
    const tier = winTier(pay, bet);
    if (tier !== "none") setCelebrate({ payout: pay, stake: bet, tier });
    if (soundOn) sfx.win(mult >= 3);
  }

  const crashed = crash != null && !cashed;
  const tMax = Math.max(3.2, samples[samples.length - 1]?.t ?? 0);
  const mScale = Math.max(2.4, (crash ?? Math.max(mult * 1.4, 2)));
  const lastPt = samples[samples.length - 1];
  const path = curvePath(samples, tMax, mScale);

  return (
    <OriginalShell title="Lift" subtitle="Cashout bevor die Kurve reißt · 97 % RTP" slug="lift">
      <div className={cn("relative overflow-hidden rounded-xl border border-border bg-surface", crashed && "lift-crash")}>
        <div className="pointer-events-none absolute inset-0 neon-mesh opacity-40" />
        <svg viewBox="0 0 320 180" className="relative h-64 w-full" aria-hidden>
          <defs>
            <linearGradient id="lift-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
              <stop offset="100%" stopColor={crashed ? "var(--color-loss)" : "var(--color-accent)"} />
            </linearGradient>
          </defs>
          <path d={path} fill="none" stroke="url(#lift-line)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
          {lastPt ? (
            <circle
              cx={xOf(lastPt.t, tMax)}
              cy={yOf(lastPt.m, mScale)}
              r="5"
              fill={crashed ? "var(--color-loss)" : "var(--color-accent)"}
            />
          ) : null}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className={cn("font-display text-6xl tabular-nums", crashed ? "text-loss" : cashed ? "text-win" : "text-accent")}>
            {mult.toFixed(2)}×
          </p>
          <p className="mt-2 text-sm text-muted">{crashed ? `Crash bei ${crash?.toFixed(2)}×` : running ? "Im Steigflug" : "Bereit"}</p>
        </div>
      </div>
      <div className="mt-4">
        {running && !cashed ? (
          <button type="button" onClick={cash} className="h-14 w-full rounded-md bg-accent text-base font-semibold uppercase tracking-wider text-accent-fg">
            Cashout {formatEuro(Math.round(bet * mult))}
          </button>
        ) : (
          <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={running} onPlay={start} label="Start" />
        )}
      </div>
      <ResultBar last={last} bet={bet} />
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

function xOf(t: number, tMax: number): number {
  const span = Math.max(3.2, tMax);
  return 16 + (t / span) * 288;
}

function yOf(m: number, mMax: number): number {
  const top = Math.max(2.2, mMax);
  const u = Math.log(Math.max(1, m)) / Math.log(top);
  return 164 - u * 140;
}

function curvePath(samples: Sample[], tMax: number, mMax: number): string {
  if (samples.length === 0) return "";
  return samples
    .map((s, i) => `${i === 0 ? "M" : "L"}${xOf(s.t, tMax).toFixed(1)} ${yOf(s.m, mMax).toFixed(1)}`)
    .join(" ");
}
