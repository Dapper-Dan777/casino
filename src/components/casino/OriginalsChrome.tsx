import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { formatEuro } from "@/lib/casino/format";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { NeedBankroll } from "./NeedBankroll";
import { ChevronLeft, Minus, Plus } from "lucide-react";

export const ORIGINAL_STEPS = [50, 100, 200, 500, 1000, 2500];

export function OriginalShell({
  title,
  subtitle,
  children,
  slug,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  slug?: string;
}) {
  const touchGame = useCasino((s) => s.touchGame);
  useEffect(() => {
    if (slug) touchGame(slug);
  }, [slug, touchGame]);
  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6">
      <div className="pointer-events-none absolute inset-0 neon-mesh opacity-70" />
      <div className="relative mx-auto max-w-2xl px-4 pb-24 pt-4 sm:px-6">
        <div className="mb-5 flex items-center gap-3">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl text-fg">{title}</h1>
            <p className="text-xs text-accent">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
      <NeedBankroll />
    </div>
  );
}

export function BetBar({
  bet,
  betI,
  setBetI,
  busy,
  onPlay,
  label,
  extra,
}: {
  bet: number;
  betI: number;
  setBetI: (n: number | ((i: number) => number)) => void;
  busy: boolean;
  onPlay: () => void;
  label: string;
  extra?: ReactNode;
}) {
  const balance = useCasino((s) => s.balance);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="flex items-center rounded-md border border-accent/25 bg-surface">
        <button
          type="button"
          className="size-11"
          disabled={busy || betI === 0}
          onClick={() => setBetI((i) => Math.max(0, (i as number) - 1))}
          aria-label="Einsatz senken"
        >
          <Minus className="mx-auto size-4" />
        </button>
        <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
        <button
          type="button"
          className="size-11"
          disabled={busy || betI === ORIGINAL_STEPS.length - 1}
          onClick={() => setBetI((i) => Math.min(ORIGINAL_STEPS.length - 1, (i as number) + 1))}
          aria-label="Einsatz erhöhen"
        >
          <Plus className="mx-auto size-4" />
        </button>
      </div>
      {extra}
      <button
        type="button"
        disabled={busy || balance < bet}
        onClick={onPlay}
        className="ml-auto h-12 min-w-36 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40"
      >
        {busy ? "…" : label}
      </button>
    </div>
  );
}

export function ResultBar({ last, bet }: { last: number | null; bet: number }) {
  const balance = useCasino((s) => s.balance);
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 text-center">
      <div className="rounded-md bg-surface px-3 py-2">
        <p className="text-xs uppercase tracking-wider text-subtle">Letzter Wurf</p>
        <p className={cn("font-display text-xl tabular-nums", last == null ? "text-muted" : last > bet ? "text-win" : last === bet ? "text-fg" : "text-loss")}>
          {last == null ? "—" : formatEuro(last)}
        </p>
      </div>
      <div className="rounded-md bg-surface px-3 py-2">
        <p className="text-xs uppercase tracking-wider text-subtle">Guthaben</p>
        <p className="font-display text-xl tabular-nums text-fg">{formatEuro(balance)}</p>
      </div>
    </div>
  );
}
