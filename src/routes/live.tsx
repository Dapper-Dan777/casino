import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LIVE_TABLES, liveOccupancy } from "@/lib/casino/operator";
import { formatEuro } from "@/lib/casino/format";
import { unlockAudio } from "@/lib/casino/audio";
import { ChipStack } from "@/components/casino/ChipStack";
import { gameBySlug } from "@/lib/casino/catalog";

export const Route = createFileRoute("/live")({ component: LivePage });

function LivePage() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-accent">Studio</p>
        <h1 className="font-display text-4xl">Live</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Croupiers, Limits, nächste Runde. Spielgeld, keine Echtgeldzahlungen.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIVE_TABLES.map((t) => {
          const occ = liveOccupancy(t.id, now);
          const left = 18 - (Math.floor(now / 1000 + t.id.length) % 18);
          const cover = gameBySlug(t.slug)?.image ?? "/games/live-studio.jpg";
          const inner = (
            <>
              <div className="relative h-36 overflow-hidden bg-felt">
                <img src={cover} alt="" className="h-full w-full object-cover opacity-55" />
                <img
                  src="/games/char-dealer.jpg"
                  alt=""
                  className="absolute bottom-0 right-2 h-28 object-contain object-bottom"
                />
                <div className="absolute bottom-3 left-4">
                  <ChipStack n={3 + (occ % 4)} tone="felt" />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-loss px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Live
                </span>
                <span className="absolute right-3 top-3 rounded-md bg-bg/80 px-2 py-0.5 text-[10px] tabular-nums">
                  {left}s
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-xl">{t.name}</p>
                <p className="text-xs uppercase tracking-wider text-muted">
                  {t.studio} · {t.dealer}
                </p>
                <p className="mt-2 text-sm text-muted">
                  {formatEuro(t.min)} – {formatEuro(t.max)} · {occ}/{t.seats} Plätze
                </p>
              </div>
            </>
          );
          const cls = "group overflow-hidden rounded-lg border border-border bg-surface hover:border-accent/50";
          return t.via === "tisch" ? (
            <Link key={t.id} to="/tisch/$slug" params={{ slug: t.slug }} onClick={() => unlockAudio()} className={cls}>
              {inner}
            </Link>
          ) : (
            <Link key={t.id} to="/spiel/$slug" params={{ slug: t.slug }} onClick={() => unlockAudio()} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
