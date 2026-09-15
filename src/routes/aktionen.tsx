import { createFileRoute, Link } from "@tanstack/react-router";
import { MISSIONS, TOURNEY_POT, tourneyBoard } from "@/lib/casino/operator";
import { formatEuro } from "@/lib/casino/format";
import { useCasino } from "@/lib/casino/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/aktionen")({ component: AktionenPage });

function AktionenPage() {
  const wageredToday = useCasino((s) => s.wageredToday);
  const winsToday = useCasino((s) => s.winsToday);
  const gamesToday = useCasino((s) => s.gamesToday);
  const claimed = useCasino((s) => s.claimedMissions);
  const dailyClaimed = useCasino((s) => s.dailyClaimed);
  const claimMission = useCasino((s) => s.claimMission);
  const claimDaily = useCasino((s) => s.claimDaily);
  const tourneyBest = useCasino((s) => s.tourneyBest);
  const board = tourneyBoard(tourneyBest);

  const progress: Record<string, number> = {
    wager: wageredToday,
    wins: winsToday,
    variety: gamesToday.length,
    daily: dailyClaimed ? 1 : 0,
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Heute</p>
      <h1 className="font-display text-4xl">Aktionen</h1>
      <section className="rounded-xl border border-border bg-surface p-5">
        <p className="text-xs uppercase tracking-wider text-muted">Tages-Turnier · Top-Gewinn</p>
        <p className="mt-1 font-display text-2xl tabular-nums text-[#e8c85a]">Preis {formatEuro(TOURNEY_POT)}</p>
        <ol className="mt-4 space-y-2">
          {board.map((row, i) => (
            <li key={`${row.name}-${i}`} className={cn("flex items-center justify-between text-sm", row.you && "text-accent")}>
              <span>
                {i + 1}. {row.name} · {row.city}
              </span>
              <span className="tabular-nums">{formatEuro(row.cents)}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted">Dein bester Treffer heute zählt. Nur Spielgeld.</p>
      </section>
      <ul className="space-y-3">
        {MISSIONS.map((m) => {
          const p = progress[m.id] ?? 0;
          const done = claimed.includes(m.id) || (m.id === "daily" && dailyClaimed);
          const ready = p >= m.target && !done;
          return (
            <li key={m.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3">
              <div>
                <p className="text-fg">{m.title}</p>
                <p className="text-xs text-muted">
                  {m.hint} · {Math.min(p, m.target)}/{m.target} · {formatEuro(m.reward)}
                </p>
              </div>
              {m.id === "daily" && !dailyClaimed ? (
                <Button size="sm" onClick={() => claimDaily()}>
                  Holen
                </Button>
              ) : ready ? (
                <Button size="sm" onClick={() => claimMission(m.id)}>
                  Holen
                </Button>
              ) : (
                <span className="text-xs uppercase tracking-wider text-muted">{done ? "Fertig" : "Offen"}</span>
              )}
            </li>
          );
        })}
      </ul>
      <Link to="/" className="text-sm text-accent">
        Zurück zur Lobby
      </Link>
    </div>
  );
}
