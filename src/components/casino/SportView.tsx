import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import {
  LEAGUE_TABS,
  cashoutValue,
  comboOdds,
  formatOdds,
  pickLabel,
  sportBoard,
  sportClock,
  type SportEvent,
  type SportLeg,
  type SportLeague,
  type SportPick,
} from "@/lib/casino/sport";
import { cn } from "@/lib/utils";
import { ChevronLeft, X } from "lucide-react";

const STAKES = [100, 200, 500, 1000, 2500, 5000];

export function SportView() {
  const [now, setNow] = useState(0);
  const [tab, setTab] = useState<SportLeague | "all">("all");
  const [slip, setSlip] = useState<SportLeg[]>([]);
  const [stakeI, setStakeI] = useState(2);
  const [msg, setMsg] = useState<string | null>(null);
  const stake = STAKES[stakeI] ?? 500;
  const placeSport = useCasino((s) => s.placeSport);
  const settleSports = useCasino((s) => s.settleSports);
  const cashoutSport = useCasino((s) => s.cashoutSport);
  const tickets = useCasino((s) => s.sportTickets);
  const balance = useCasino((s) => s.balance);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const touchGame = useCasino((s) => s.touchGame);
  const soundOn = useCasino((s) => s.soundOn);

  useEffect(() => {
    touchGame("sport");
  }, [touchGame]);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      settleSports(t);
    }, 1000);
    return () => window.clearInterval(id);
  }, [settleSports]);

  const events = useMemo(() => (now ? sportBoard(now) : []), [now]);
  const shown = events.filter((e) => {
    if (tab === "all") return true;
    if (tab === "live") return sportClock(e, now).phase === "live" || e.league === "live";
    return e.league === tab;
  });
  const liveN = events.filter((e) => sportClock(e, now).phase === "live").length;
  const odds = comboOdds(slip);
  const potential = slip.length ? Math.round(stake * odds) : 0;

  function addLeg(ev: SportEvent, pick: SportPick, price: number) {
    unlockAudio();
    setSlip((prev) => {
      const next = prev.filter((l) => l.eventId !== ev.id);
      return [
        ...next,
        { eventId: ev.id, label: `${ev.home} – ${ev.away} · ${pickLabel(ev, pick)}`, pick, odds: price },
      ].slice(0, 8);
    });
  }

  function place() {
    unlockAudio();
    if (!slip.length) return;
    if (balance < stake) {
      setCashier(true);
      return;
    }
    const res = placeSport(slip, stake);
    if (!res.ok) {
      setMsg(res.reason);
      return;
    }
    if (soundOn) sfx.cash();
    setMsg("Schein angenommen");
    setSlip([]);
  }

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] sm:-mx-6">
      <div className="pointer-events-none absolute inset-0 neon-mesh opacity-40" />
      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-6">
        <div className="mb-5 flex items-center gap-3">
          <Link to="/" className="inline-flex size-11 items-center justify-center rounded-md text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="font-display text-3xl text-fg">Wettstudio</h1>
            <p className="text-xs text-accent">{liveN} Live · Kombi · Cashout · nur Spielgeld</p>
          </div>
        </div>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {LEAGUE_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "h-10 shrink-0 rounded-md px-3 text-sm",
                tab === t.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
              )}
            >
              {t.label}
              {t.id === "live" ? ` ${liveN}` : ""}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="space-y-2">
            {shown.map((ev) => (
              <MatchRow key={ev.id} ev={ev} now={now} slip={slip} onPick={addLeg} />
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Schein</p>
                {slip.length ? (
                  <button type="button" className="text-xs text-muted" onClick={() => setSlip([])}>
                    Leeren
                  </button>
                ) : null}
              </div>
              {slip.length === 0 ? (
                <p className="text-sm text-muted">Quote antippen.</p>
              ) : (
                <ul className="space-y-2">
                  {slip.map((l) => (
                    <li key={l.eventId} className="flex items-start justify-between gap-2 text-sm">
                      <span className="min-w-0">
                        <span className="block truncate text-fg">{l.label}</span>
                        <span className="tabular-nums text-accent">{formatOdds(l.odds)}</span>
                      </span>
                      <button type="button" aria-label="Entfernen" onClick={() => setSlip((p) => p.filter((x) => x.eventId !== l.eventId))}>
                        <X className="size-4 text-muted" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-sm text-muted">
                {slip.length > 1 ? `Kombi ${slip.length}` : "Einzel"} · {formatOdds(odds || 1)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {STAKES.map((v, i) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setStakeI(i)}
                    className={cn("h-9 rounded-md px-2 text-xs tabular-nums", i === stakeI ? "bg-accent text-accent-fg" : "bg-elevated text-muted")}
                  >
                    {formatEuro(v)}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm">
                Quote <span className="tabular-nums text-fg">{formatOdds(odds || 1)}</span>
                {" · "}Gewinn <span className="tabular-nums text-win">{formatEuro(potential)}</span>
              </p>
              <button
                type="button"
                disabled={!slip.length || balance < stake}
                onClick={place}
                className="mt-3 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40"
              >
                Schein setzen
              </button>
              {msg ? <p className="mt-2 text-xs text-muted">{msg}</p> : null}
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted">Meine Scheine</p>
              {tickets.length === 0 ? (
                <p className="text-sm text-muted">Noch keine Wetten.</p>
              ) : (
                <ul className="space-y-3">
                  {tickets.slice(0, 8).map((t) => {
                    const cash = t.status === "open" ? cashoutValue(t, events, now) : 0;
                    return (
                      <li key={t.id} className="text-sm">
                        <p className="truncate text-fg">{t.legs.length > 1 ? `Kombi ${t.legs.length}` : t.legs[0]?.label}</p>
                        <p className="text-xs text-muted">
                          {formatEuro(t.stake)} · {formatOdds(t.odds)} ·{" "}
                          {t.status === "open" ? "offen" : t.status === "won" ? "gewonnen" : t.status === "cashed" ? "cashout" : "verloren"}
                          {t.payout > 0 ? ` · ${formatEuro(t.payout)}` : ""}
                        </p>
                        {cash > 0 ? (
                          <button
                            type="button"
                            className="mt-1 text-xs text-accent"
                            onClick={() => {
                              unlockAudio();
                              cashoutSport(t.id);
                              if (soundOn) sfx.cash();
                            }}
                          >
                            Cashout {formatEuro(cash)}
                          </button>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>
      </div>
      <NeedBankroll />
    </div>
  );
}

function MatchRow({
  ev,
  now,
  slip,
  onPick,
}: {
  ev: SportEvent;
  now: number;
  slip: SportLeg[];
  onPick: (ev: SportEvent, pick: SportPick, price: number) => void;
}) {
  const clock = sportClock(ev, now);
  const selected = slip.find((l) => l.eventId === ev.id);
  const locked = clock.phase === "ft";
  return (
    <article className="rounded-lg border border-border bg-surface p-3 sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-muted">
        <span>{ev.leagueName}</span>
        {clock.phase === "live" ? (
          <span className="text-loss">
            Live {clock.minute}' · {clock.home}:{clock.away}
          </span>
        ) : clock.phase === "ft" ? (
          <span>
            Ende {clock.home}:{clock.away}
          </span>
        ) : (
          <span className="tabular-nums">
            {new Date(ev.kickoff).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
      <p className="font-display text-lg leading-tight">
        {ev.home} <span className="text-muted">–</span> {ev.away}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        <OddsBtn label="1" price={ev.odds.home} active={selected?.pick === "1"} disabled={locked} onClick={() => onPick(ev, "1", ev.odds.home)} />
        {ev.odds.draw != null ? (
          <OddsBtn label="X" price={ev.odds.draw} active={selected?.pick === "X"} disabled={locked} onClick={() => onPick(ev, "X", ev.odds.draw!)} />
        ) : (
          <div />
        )}
        <OddsBtn label="2" price={ev.odds.away} active={selected?.pick === "2"} disabled={locked} onClick={() => onPick(ev, "2", ev.odds.away)} />
      </div>
      <div className="mt-1.5 grid grid-cols-2 gap-1.5">
        <OddsBtn
          label={`Über ${ev.line}`}
          price={ev.over}
          active={selected?.pick === "over"}
          disabled={locked}
          onClick={() => onPick(ev, "over", ev.over)}
        />
        <OddsBtn
          label={`Unter ${ev.line}`}
          price={ev.under}
          active={selected?.pick === "under"}
          disabled={locked}
          onClick={() => onPick(ev, "under", ev.under)}
        />
      </div>
    </article>
  );
}

function OddsBtn({
  label,
  price,
  active,
  disabled,
  onClick,
}: {
  label: string;
  price: number;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-11 items-center justify-between rounded-md px-2 text-sm",
        active ? "bg-accent text-accent-fg" : "bg-elevated text-fg hover:bg-elevated/80",
        disabled && "opacity-40",
      )}
    >
      <span className="text-xs uppercase tracking-wider opacity-80">{label}</span>
      <span className="tabular-nums">{formatOdds(price)}</span>
    </button>
  );
}
