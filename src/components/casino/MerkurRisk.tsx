import { useEffect, useMemo, useRef, useState } from "react";
import { formatLed, ledGhost, LEITER_MAX, leiterBounceMs } from "@/lib/casino/merkur";
import { formatEuro } from "@/lib/casino/format";
import { isRed, makeCard, RANKS, SUITS, type PlayingCard } from "@/lib/casino/cards";
import { randInt } from "@/lib/casino/rng";
import { sfx } from "@/lib/casino/audio";
import { cn } from "@/lib/utils";
import { PlayingCardFace } from "./PlayingCard";

type Mode = "pick" | "card" | "leiter";
type Flash = "hi" | "zero";

const CARD_MAX = LEITER_MAX - 1;
const HIST = 5;
const BACK = "/games/card-back-red.jpg";

function drawCard(): PlayingCard {
  return makeCard(SUITS[randInt(SUITS.length)]!, RANKS[randInt(RANKS.length)]!);
}

function reducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Led({ cents, lit }: { cents: number; lit?: boolean }) {
  const val = formatLed(cents);
  return (
    <>
      <span className="risk-led-ghost" aria-hidden>
        {ledGhost(val)}
      </span>
      <span className={cn("risk-led-val", lit && "is-lit")}>{val}</span>
    </>
  );
}

export function MerkurRisk({
  amount,
  soundOn,
  onCollect,
  onBust,
  onBank,
}: {
  amount: number;
  soundOn: boolean;
  onCollect: (cents: number) => void;
  onBust: () => void;
  onBank?: (cents: number) => void;
}) {
  const [mode, setMode] = useState<Mode>("pick");
  const [pot, setPot] = useState(amount);
  const [step, setStep] = useState(1);
  const [card, setCard] = useState<PlayingCard | null>(null);
  const [open, setOpen] = useState(false);
  const [flipKey, setFlipKey] = useState(0);
  const [locked, setLocked] = useState(false);
  const [bust, setBust] = useState(false);
  const [flash, setFlash] = useState<"win" | "lose" | null>(null);
  const [history, setHistory] = useState<PlayingCard[]>([]);
  const [bounce, setBounce] = useState<Flash>("hi");
  const [landing, setLanding] = useState<Flash | null>(null);
  const timers = useRef<number[]>([]);
  const soundRef = useRef(soundOn);
  const bounceRef = useRef<Flash>("hi");
  const lockedRef = useRef(false);
  const stopRef = useRef<() => void>(() => {});
  soundRef.current = soundOn;
  lockedRef.current = locked;

  const rungs = useMemo(() => {
    const out = [0];
    for (let i = 0; i < CARD_MAX; i++) out.push(amount * 2 ** i);
    return out;
  }, [amount]);

  const hi = Math.min(step + 1, rungs.length - 1);
  const next = rungs[hi] ?? pot * 2;
  const atTop = step >= rungs.length - 1;

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  useEffect(() => {
    if (mode !== "leiter" || locked || bust || atTop) return;
    const interval = reducedMotion() ? 90 : leiterBounceMs(step);
    const id = window.setInterval(() => {
      setBounce((b) => {
        const n: Flash = b === "hi" ? "zero" : "hi";
        bounceRef.current = n;
        if (soundRef.current) {
          if (n === "hi") sfx.leiterHi();
          else sfx.leiterZero();
        }
        return n;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [mode, locked, bust, atTop, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.code !== "Enter") return;
      if (mode !== "leiter") return;
      e.preventDefault();
      if (lockedRef.current) return;
      stopRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      const t = window.setTimeout(resolve, ms);
      timers.current.push(t);
    });
  }

  async function playColor(wantRed: boolean) {
    if (locked || bust || atTop) return;
    setLocked(true);
    setFlash(null);
    setOpen(false);
    setFlipKey((k) => k + 1);
    const drawn = drawCard();
    setCard(drawn);
    if (soundRef.current) sfx.deal();
    await wait(reducedMotion() ? 40 : 70);
    setOpen(true);
    await wait(reducedMotion() ? 120 : 560);
    const win = isRed(drawn.suit) === wantRed;
    setHistory((h) => [drawn, ...h].slice(0, HIST));
    if (win) {
      setFlash("win");
      const nxt = pot * 2;
      setPot(nxt);
      setStep((n) => n + 1);
      if (soundRef.current) sfx.gambleWin();
      if (step + 1 >= rungs.length - 1) {
        await wait(500);
        onCollect(nxt);
        return;
      }
      await wait(700);
      setOpen(false);
      setCard(null);
      setFlash(null);
      setFlipKey((k) => k + 1);
      setLocked(false);
      return;
    }
    setFlash("lose");
    setBust(true);
    if (soundRef.current) sfx.gambleLose();
    await wait(1100);
    onBust();
  }

  async function stopLeiter() {
    if (locked || bust || atTop) return;
    setLocked(true);
    lockedRef.current = true;
    const hit = bounceRef.current;
    setBounce(hit);
    setLanding(hit);
    await wait(reducedMotion() ? 180 : 720);
    if (hit === "hi") {
      const dest = hi;
      setStep(dest);
      setPot(rungs[dest]!);
      if (soundRef.current) sfx.gambleWin();
      if (dest >= rungs.length - 1) {
        await wait(720);
        onCollect(rungs[dest]!);
        return;
      }
      await wait(reducedMotion() ? 200 : 980);
      setLanding(null);
      bounceRef.current = "hi";
      setBounce("hi");
      setLocked(false);
      lockedRef.current = false;
      return;
    }
    setStep(0);
    setPot(0);
    setBust(true);
    if (soundRef.current) sfx.gambleLose();
    await wait(1400);
    onBust();
  }

  stopRef.current = () => {
    void stopLeiter();
  };

  function takeHalf() {
    if (locked || bust || pot < 2) return;
    const half = Math.floor(pot / 2);
    const rest = pot - half;
    if (onBank && rest > 0 && step > 1) {
      onBank(half);
      setPot(rest);
      setStep((n) => Math.max(1, n - 1));
      setOpen(false);
      setCard(null);
      setFlash(null);
      setFlipKey((k) => k + 1);
      return;
    }
    onCollect(half);
  }

  if (mode === "pick") {
    return (
      <div className="risk-screen absolute inset-0 z-30 flex flex-col items-center justify-center px-4">
        <p className="risk-kicker">Risiko</p>
        <p className="risk-pot mt-2 font-display text-5xl tabular-nums leading-none">{formatEuro(amount)}</p>
        <p className="mt-3 text-center text-sm text-muted">Kartenrisiko oder Gewinnleiter.</p>
        <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3">
          <button type="button" className="risk-pick" onPointerDown={() => setMode("card")} onClick={() => setMode("card")}>
            <img src={BACK} alt="" className="risk-pick-card" />
            <span>Karten</span>
          </button>
          <button type="button" className="risk-pick" onPointerDown={() => setMode("leiter")} onClick={() => setMode("leiter")}>
            <span className="risk-pick-ladder" aria-hidden>
              {Array.from({ length: 6 }).map((_, i) => (
                <i key={i} className={i === 0 || i === 3 ? "is-on" : undefined} />
              ))}
            </span>
            <span>Leiter</span>
          </button>
        </div>
        <button type="button" className="risk-btn risk-btn-take mt-4 h-14 w-full max-w-sm" onClick={() => onCollect(amount)}>
          Nehmen
        </button>
      </div>
    );
  }

  if (mode === "leiter") {
    const lit = landing ?? bounce;
    const secured = step > 1 ? rungs[step - 1] ?? amount : 0;
    return (
      <div className={cn("risk-screen risk-screen-leiter absolute inset-0 z-30 flex flex-col px-3 pb-3 pt-2", bust && "risk-screen-bust")}>
        <div className="mx-auto grid w-full max-w-[18rem] grid-cols-3 gap-1.5 text-center">
          <div className="rounded-md border border-white/10 bg-black/20 px-2 py-2">
            <p className="risk-kicker">Stufe</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-fg">{step}/{rungs.length - 1}</p>
          </div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-950/20 px-2 py-2">
            <p className="risk-kicker">Gesichert</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-emerald-200">{formatEuro(secured)}</p>
          </div>
          <div className="rounded-md border border-amber-300/20 bg-amber-950/20 px-2 py-2">
            <p className="risk-kicker">Nächste</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-amber-200">{atTop ? "Top" : formatEuro(next)}</p>
          </div>
        </div>
        <p className="mx-auto mt-2 w-full max-w-[18rem] text-center text-[10px] uppercase tracking-[0.16em] text-muted">
          Licht läuft zwischen Gewinn und 0,00 € · Aufspielen hält die aktuelle Position
        </p>
        <div className="risk-ladder-frame mx-auto flex min-h-0 w-full max-w-[18rem] flex-1 flex-col">
          <ol className="risk-ladder">
            {rungs.map((v, i) => {
              const isHi = i === hi && !atTop;
              const isZero = i === 0;
              const on = (lit === "hi" && isHi) || (lit === "zero" && isZero);
              const here = i === step && !on;
              const climbed = i > 0 && i < step;
              return (
                <li
                  key={i}
                  className={cn(
                    "risk-rung",
                    isZero && "risk-rung-zero",
                    climbed && "risk-rung-won",
                    here && "risk-rung-now",
                    on && (isZero ? "risk-rung-run-zero" : "risk-rung-run"),
                    bust && "risk-rung-dead",
                  )}
                >
                  <Led cents={v} lit={on || here || climbed} />
                </li>
              );
            })}
          </ol>
        </div>
        <button type="button" disabled={locked || bust || atTop} onClick={() => void stopLeiter()} className="risk-btn risk-btn-stop mt-3 h-16 w-full max-w-[18rem] self-center text-lg tracking-[0.2em]">
          {locked ? "Auswertung…" : atTop ? "Top erreicht" : "Aufspielen"}
        </button>
        <div className="mt-2 grid w-full max-w-[18rem] grid-cols-2 gap-2 self-center">
          <button type="button" disabled={locked || bust || pot < 2} onClick={takeHalf} className="risk-btn risk-btn-half">
            Hälfte
          </button>
          <button type="button" disabled={locked || bust} onClick={() => onCollect(pot)} className="risk-btn risk-btn-take">
            Nehmen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("risk-screen risk-screen-cards absolute inset-0 z-30 flex flex-col px-3 py-3 sm:px-5", bust && "risk-screen-bust")}>
      <div className="grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="risk-kicker">Risiko-Einsatz</p>
          <p className="risk-pot mt-1 font-display text-3xl tabular-nums leading-none sm:text-4xl">{formatEuro(pot)}</p>
        </div>
        <div>
          <p className="risk-kicker">Gewinn bei Risiko</p>
          <p className="risk-pot mt-1 font-display text-3xl tabular-nums leading-none sm:text-4xl">{atTop ? "—" : formatEuro(next)}</p>
        </div>
      </div>

      <div className="risk-hist">
        <span className="risk-hist-label">Letzte Karten</span>
        {Array.from({ length: HIST }).map((_, i) => {
          const c = history[i];
          return c ? (
            <PlayingCardFace key={c.id} card={c} size="mini" animated={false} />
          ) : (
            <img key={`b${i}`} src={BACK} alt="" className="risk-mini-back" />
          );
        })}
      </div>

      <div className="risk-card-stage">
        <OvalButton color="red" disabled={locked || bust || atTop} onClick={() => void playColor(true)} />
        <div className={cn("risk-flip", flash === "win" && "risk-card-win", flash === "lose" && "risk-card-lose")}>
          <div key={flipKey} className={cn("risk-flip-inner", open && card && "is-open")}>
            <div className="risk-face risk-face-back">
              <img src={BACK} alt="" />
            </div>
            <div className="risk-face risk-face-front">
              {card ? <PlayingCardFace card={card} size="risk" animated={false} /> : null}
            </div>
          </div>
        </div>
        <OvalButton color="black" disabled={locked || bust || atTop} onClick={() => void playColor(false)} />
      </div>

      <p className="mt-2 min-h-5 text-center text-[11px] uppercase tracking-[0.16em] text-muted">
        {bust ? "Verloren" : flash === "win" ? "Verdoppelt" : "Rot oder Schwarz"}
      </p>

      <div className="mt-1 grid grid-cols-2 gap-2">
        <button type="button" disabled={locked || bust || pot < 2} onClick={takeHalf} className="risk-btn risk-btn-half">
          Hälfte · {formatEuro(Math.floor(pot / 2))}
        </button>
        <button type="button" disabled={locked || bust} onClick={() => onCollect(pot)} className="risk-btn risk-btn-take">
          Nehmen
        </button>
      </div>
    </div>
  );
}

function OvalButton({ color, disabled, onClick }: { color: "red" | "black"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn("risk-oval", color === "red" ? "risk-oval-red" : "risk-oval-black")}
    >
      <span className="risk-oval-band">{color === "red" ? "Rot" : "Schwarz"}</span>
    </button>
  );
}
