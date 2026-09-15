import { useEffect, useState } from "react";
import { WIN_TIER_LABEL, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx } from "@/lib/casino/audio";
import { cn } from "@/lib/utils";

export function WinCelebration({
  payout,
  stake,
  tier,
  soundOn,
  onDone,
  variant = "card",
}: {
  payout: number;
  stake: number;
  tier: WinTier;
  soundOn: boolean;
  onDone: () => void;
  variant?: "card" | "pragmatic";
}) {
  const [shown, setShown] = useState(0);
  const label = variant === "pragmatic"
    ? tier === "epic" ? "EPIC WIN" : tier === "mega" ? "MEGA WIN" : "BIG WIN"
    : WIN_TIER_LABEL[tier];
  const skippable = shown >= payout * 0.35 || shown > 0;

  useEffect(() => {
    if (soundOn && tier !== "none") {
      if (tier === "nice") sfx.win(true);
      else sfx.fanfare(tier);
    }
    const start = performance.now();
    const dur = tier === "epic" ? 2800 : tier === "mega" ? 2200 : tier === "big" ? 1600 : 900;
    let lastTick = 0;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const value = Math.round(payout * (1 - Math.pow(1 - p, 3)));
      setShown(value);
      if (soundOn && now - lastTick > 70) {
        sfx.coin();
        lastTick = now;
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const auto = window.setTimeout(onDone, dur + (tier === "epic" || tier === "mega" ? 1400 : 700));
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(auto);
    };
  }, [payout, tier, soundOn, onDone]);

  if (tier === "none" || payout <= 0) return null;

  if (variant === "pragmatic") {
    return (
      <button type="button" className="win-prag" onClick={() => (skippable ? onDone() : setShown(payout))}>
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {Array.from({ length: tier === "epic" ? 32 : 20 }).map((_, i) => (
            <span
              key={i}
              className="win-coin"
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 10) * 0.08}s`,
                animationDuration: `${1.4 + (i % 5) * 0.18}s`,
              }}
            />
          ))}
        </div>
        <p className={cn("win-prag-label", `is-${tier}`)}>{label}</p>
        <p className="win-prag-amt">{formatEuro(shown)}</p>
        <p className="mt-2 text-sm text-[#ffe08a]">{(payout / Math.max(1, stake)).toFixed(1).replace(".", ",")}×</p>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="absolute inset-0 z-40 flex items-center justify-center bg-bg/70 px-4"
      onClick={() => {
        if (skippable) onDone();
        else setShown(payout);
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {Array.from({ length: tier === "epic" ? 28 : 18 }).map((_, i) => (
          <span
            key={i}
            className="win-coin"
            style={{
              left: `${(i * 37) % 100}%`,
              animationDelay: `${(i % 10) * 0.08}s`,
              animationDuration: `${1.4 + (i % 5) * 0.18}s`,
            }}
          />
        ))}
      </div>
      <div
        className={cn(
          "relative w-full max-w-sm rounded-xl border-2 bg-surface px-6 py-8 text-center shadow-2xl",
          tier === "epic" || tier === "mega" ? "border-accent slot-shake" : "border-accent/70",
        )}
      >
        <p className="text-[11px] uppercase tracking-[0.38em] text-accent">{label}</p>
        <p
          className={cn(
            "mt-3 font-display tabular-nums text-fg",
            tier === "epic" ? "text-6xl" : tier === "mega" ? "text-5xl" : "text-4xl",
          )}
        >
          {formatEuro(shown)}
        </p>
        <p className="mt-2 text-sm text-muted">{(payout / Math.max(1, stake)).toFixed(1).replace(".", ",")}× Einsatz</p>
        <p className="mt-4 text-[11px] uppercase tracking-wider text-subtle">Tippen zum Schließen</p>
      </div>
    </button>
  );
}
