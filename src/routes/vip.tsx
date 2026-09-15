import { createFileRoute, Link } from "@tanstack/react-router";
import { VIP_RANKS, rakebackDue, vipNext, vipOf } from "@/lib/casino/operator";
import { formatEuro } from "@/lib/casino/format";
import { useCasino } from "@/lib/casino/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/vip")({ component: VipPage });

function VipPage() {
  const wagered = useCasino((s) => s.wagered);
  const taken = useCasino((s) => s.rakebackTaken);
  const claimRakeback = useCasino((s) => s.claimRakeback);
  const rank = vipOf(wagered);
  const next = vipNext(wagered);
  const due = rakebackDue(wagered, taken);
  const progress = next ? 1 - next.left / Math.max(1, (VIP_RANKS.find((r) => r.name === next.name)?.from ?? 1) - rank.from) : 1;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <p className="text-xs uppercase tracking-[0.28em] text-accent">Aurelia Club</p>
      <h1 className="font-display text-4xl">VIP {rank.name}</h1>
      <p className="text-muted">Umsatz {formatEuro(wagered)} · Rakeback {(rank.rakeback * 100).toFixed(0)} % als Spielgeld</p>
      <div className="h-2 overflow-hidden rounded-full bg-elevated">
        <div className="h-full bg-accent" style={{ width: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }} />
      </div>
      {next ? <p className="text-sm text-muted">Noch {formatEuro(next.left)} bis {next.name}</p> : <p className="text-sm text-accent">Höchste Stufe</p>}
      <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Rakeback bereit</p>
          <p className="font-display text-2xl tabular-nums">{formatEuro(due)}</p>
        </div>
        <Button size="sm" disabled={due <= 0} onClick={() => claimRakeback()}>
          Holen
        </Button>
      </div>
      <ul className="space-y-3">
        {VIP_RANKS.map((r) => (
          <li key={r.id} className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
            <span className={r.id === rank.id ? "text-accent" : "text-fg"}>{r.name}</span>
            <span className="text-sm text-muted">ab {formatEuro(r.from)} · {(r.rakeback * 100).toFixed(0)} %</span>
          </li>
        ))}
      </ul>
      <Link to="/" className="text-sm text-accent">Zurück zur Lobby</Link>
    </div>
  );
}
