import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatEuro, formatTime } from "@/lib/casino/format";
import { streakReward, vipOf } from "@/lib/casino/operator";
import { useCasino } from "@/lib/casino/store";
import { formatOdds } from "@/lib/casino/sport";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { LogOut } from "lucide-react";

export function KontoView() {
  const { user } = useCurrentUserState();
  const balance = useCasino((s) => s.balance);
  const wagered = useCasino((s) => s.wagered);
  const wageredToday = useCasino((s) => s.wageredToday);
  const totalDeposited = useCasino((s) => s.totalDeposited);
  const totalWithdrawn = useCasino((s) => s.totalWithdrawn);
  const txs = useCasino((s) => s.transactions);
  const tickets = useCasino((s) => s.sportTickets);
  const dayLimit = useCasino((s) => s.dayLimit);
  const setDayLimit = useCasino((s) => s.setDayLimit);
  const pausedUntil = useCasino((s) => s.pausedUntil);
  const pausePlay = useCasino((s) => s.pausePlay);
  const streak = useCasino((s) => s.streak);
  const sessionStarted = useCasino((s) => s.sessionStarted);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const rank = vipOf(wagered);
  const [limit, setLimit] = useState(dayLimit ? String(dayLimit / 100) : "");
  const sessionMin = Math.max(0, Math.floor((Date.now() - (sessionStarted || Date.now())) / 60000));
  const wins = useMemo(() => txs.filter((t) => t.kind === "win").reduce((a, t) => a + t.cents, 0), [txs]);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Konto</p>
          <h1 className="mt-1 font-display text-4xl">Übersicht</h1>
          {user ? (
            <p className="mt-2 text-sm text-muted">
              {user.displayName ?? "Spieler"}
              {user.primaryEmail ? ` · ${user.primaryEmail}` : ""}
            </p>
          ) : null}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => void signOut("/preview")}
        >
          <LogOut />
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Guthaben" value={formatEuro(balance)} />
        <Stat label="VIP" value={rank.name} />
        <Stat label="Umsatz" value={formatEuro(wagered)} />
        <Stat label="Heute" value={formatEuro(wageredToday)} />
        <Stat label="Gewinne" value={formatEuro(wins)} />
        <Stat label="Serie" value={`${streak} Tage · ${formatEuro(streakReward(Math.max(1, streak)))}`} />
      </div>
      <p className="text-sm text-muted">
        Ein {formatEuro(totalDeposited)} · Aus {formatEuro(totalWithdrawn)} · Session {sessionMin} Min
      </p>
      <div className="flex gap-2">
        <Button onClick={() => setCashier(true)}>Kasse</Button>
        <Button variant="secondary" asChild>
          <Link to="/vip">VIP</Link>
        </Button>
      </div>

      <section id="wetten" className="space-y-3">
        <h2 className="font-display text-2xl">Wetten</h2>
        {tickets.length === 0 ? (
          <p className="text-sm text-muted">Keine Scheine.</p>
        ) : (
          <ul className="space-y-2">
            {tickets.slice(0, 12).map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm">
                <span className="truncate">
                  {t.legs.length > 1 ? `Kombi ${t.legs.length}` : t.legs[0]?.label} · {formatOdds(t.odds)}
                </span>
                <span className={cn("tabular-nums", t.status === "won" || t.status === "cashed" ? "text-win" : t.status === "lost" ? "text-loss" : "text-muted")}>
                  {t.status === "open" ? formatEuro(t.stake) : formatEuro(t.payout)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl">Verlauf</h2>
        {txs.length === 0 ? (
          <p className="text-sm text-muted">Noch keine Buchungen.</p>
        ) : (
          <ul className="space-y-2">
            {txs.slice(0, 20).map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate text-muted">
                  {formatTime(t.at)} · {t.label}
                </span>
                <span className={cn("tabular-nums", t.kind === "win" || t.kind === "bonus" || t.kind === "deposit" ? "text-win" : "text-fg")}>
                  {t.kind === "bet" || t.kind === "withdraw" ? "−" : "+"}
                  {formatEuro(t.cents)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="schutz" className="space-y-4 rounded-xl border border-border bg-surface p-5">
        <h2 className="font-display text-2xl">Spielerschutz</h2>
        <p className="text-sm text-muted">
          Nur Spielgeld, keine Echtgeldzahlungen. 18+. Session-Hinweis nach 60 Minuten. Limits gelten in dieser Demo lokal.
        </p>
        {pausedUntil > Date.now() ? (
          <p className="text-sm text-accent">Pause bis {formatTime(pausedUntil)}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {[1, 12, 24].map((h) => (
              <Button key={h} size="sm" variant="secondary" onClick={() => pausePlay(h)}>
                {h}h Pause
              </Button>
            ))}
          </div>
        )}
        <label className="block text-sm">
          Tageslimit Einsatz
          <div className="mt-2 flex gap-2">
            <input
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              inputMode="decimal"
              placeholder="0 = aus"
              className="h-11 flex-1 rounded-md border border-border bg-elevated px-3"
            />
            <Button
              size="sm"
              onClick={() => {
                const n = Number(limit.replace(",", "."));
                setDayLimit(Number.isFinite(n) && n > 0 ? Math.round(n * 100) : 0);
              }}
            >
              Setzen
            </Button>
          </div>
        </label>
        <p className="text-xs text-subtle">Aktuell {dayLimit > 0 ? formatEuro(dayLimit) : "kein Limit"} · heute {formatEuro(wageredToday)}</p>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-muted">{label}</p>
      <p className="font-display text-xl tabular-nums">{value}</p>
    </div>
  );
}
