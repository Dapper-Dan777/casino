import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GAMES, type GameInfo, type GameKind } from "@/lib/casino/catalog";
import { formatEuro, formatEuroCompact } from "@/lib/casino/format";
import { MISSIONS, gameHeat, vipOf } from "@/lib/casino/operator";
import { unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { Heart, Play, Search } from "lucide-react";

const CITIES = ["Berlin", "Hamburg", "München", "Köln", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig"];
const INITIALS = ["M.", "A.", "S.", "L.", "K.", "T.", "J.", "N.", "F.", "H."];

const PROMO = GAMES.filter((g) => g.featured || g.family === "pragmatic" || g.badge === "Hot" || g.badge === "Beliebt").slice(0, 5);

export function Lobby() {
  const setCashier = useCasino((s) => s.setCashierOpen);
  const balance = useCasino((s) => s.balance);
  const recent = useCasino((s) => s.recent);
  const favorites = useCasino((s) => s.favorites);
  const storeJackpot = useCasino((s) => s.jackpot);
  const [filter, setFilter] = useState<"all" | GameKind>("all");
  const [slide, setSlide] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % Math.max(1, PROMO.length)), 5600);
    return () => window.clearInterval(id);
  }, []);

  const games = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return GAMES.filter((g) => {
      if (filter !== "all" && g.kind !== filter) return false;
      if (!needle) return true;
      return `${g.name} ${g.tagline} ${g.family ?? ""}`.toLowerCase().includes(needle);
    });
  }, [filter, q]);

  const featured = PROMO[slide] ?? GAMES[0]!;
  const merkur = GAMES.filter((g) => g.family === "merkur");
  const pragmatic = GAMES.filter((g) => g.family === "pragmatic");
  const studio = GAMES.filter((g) => g.family === "studio" && g.kind === "slot");
  const live = GAMES.filter((g) => g.family === "live" || g.badge === "Live");
  const tables = GAMES.filter((g) => g.kind === "table" && g.family !== "live");
  const neu = GAMES.filter((g) => g.badge === "Neu");
  const instants = GAMES.filter((g) => ["wuerfel", "hi-lo", "schwelle", "rubbellos", "plinko", "minen", "lift", "keno", "videopoker"].includes(g.slug));
  const sports = GAMES.filter((g) => g.kind === "sport");
  const slots = GAMES.filter((g) => g.kind === "slot" && !g.family);
  const recentGames = recent.map((s) => GAMES.find((g) => g.slug === s)).filter((g): g is GameInfo => Boolean(g));
  const favGames = favorites.map((s) => GAMES.find((g) => g.slug === s)).filter((g): g is GameInfo => Boolean(g));

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" />
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Tagesjackpot · Live</p>
            <p className="mt-2 font-display text-4xl tabular-nums text-fg sm:text-5xl">{formatEuro(storeJackpot)}</p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.28em] text-muted">{featured.badge ?? "Hit"}</p>
            <h1 className="mt-1 font-display text-4xl text-fg sm:text-5xl">{featured.name}</h1>
            <p className="mt-2 max-w-md text-sm text-muted">
              {featured.tagline} · RTP {featured.rtp}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {featured.kind === "sport" ? (
                <Button asChild size="lg">
                  <Link to="/sport" onClick={() => unlockAudio()}>
                    Jetzt spielen
                  </Link>
                </Button>
              ) : featured.kind === "table" ? (
                <Button asChild size="lg">
                  <Link to="/tisch/$slug" params={{ slug: featured.slug }} onClick={() => unlockAudio()}>
                    Jetzt spielen
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <Link to="/spiel/$slug" params={{ slug: featured.slug }} onClick={() => unlockAudio()}>
                    Jetzt spielen
                  </Link>
                </Button>
              )}
              {balance < 1000 ? (
                <Button variant="secondary" size="lg" onClick={() => setCashier(true)}>
                  Guthaben aufladen
                </Button>
              ) : null}
            </div>
            <div className="mt-5 flex gap-2">
              {PROMO.map((g, i) => (
                <button
                  key={g.slug}
                  type="button"
                  aria-label={g.name}
                  onClick={() => setSlide(i)}
                  className={cn("h-1.5 w-8 rounded-full", i === slide ? "bg-accent" : "bg-fg/20")}
                />
              ))}
            </div>
          </div>
          <LiveWins />
        </div>
      </section>

      <OperatorStrip />

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-3xl">Lobby</h2>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Spiel suchen"
                className="h-11 w-44 rounded-md border border-border bg-elevated pl-9 pr-3 text-sm text-fg placeholder:text-subtle sm:w-56"
              />
            </label>
            <div className="flex rounded-lg bg-elevated p-1">
            {(
              [
                ["all", "Alle"],
                ["sport", "Sport"],
                ["original", "Originals"],
                ["slot", "Slots"],
                ["table", "Tische"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={cn("h-9 rounded-md px-3 text-sm", filter === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg")}
              >
                {label}
              </button>
            ))}
            </div>
          </div>
        </div>

        {q.trim() ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {games.length ? games.map((game) => <GameCard key={game.slug} game={game} />) : <p className="col-span-full text-sm text-muted">Kein Treffer für „{q.trim()}“.</p>}
          </div>
        ) : filter === "all" ? (
          <div className="space-y-10">
            {favGames.length ? <GameRail id="favoriten" title="Favoriten" games={favGames} /> : null}
            {recentGames.length ? <GameRail id="zuletzt" title="Zuletzt gespielt" games={recentGames} /> : null}
            <GameRail id="sport" title="Sport" games={sports} />
            <GameRail id="neu" title="Neu" games={neu} />
            <GameRail id="hits" title="Hits" games={pragmatic} />
            <GameRail id="live" title="Live" games={live} />
            <GameRail id="studio" title="Studio" games={studio} />
            <GameRail id="merkur" title="Halle · Merkur-Art" games={merkur} />
            <GameRail id="originals" title="Originals" games={instants} />
            {slots.length ? <GameRail id="slots" title="Weitere Slots" games={slots} /> : null}
            <GameRail id="tische" title="Tische" games={tables} />
          </div>
        ) : (
          <div id="slots" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function OperatorStrip() {
  const wagered = useCasino((s) => s.wagered);
  const jackpot = useCasino((s) => s.jackpot);
  const dailyClaimed = useCasino((s) => s.dailyClaimed);
  const claimDaily = useCasino((s) => s.claimDaily);
  const rank = vipOf(wagered);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Link to="/vip" className="rounded-lg border border-border bg-surface px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-muted">Club</p>
        <p className="font-display text-xl">VIP {rank.name}</p>
      </Link>
      <Link to="/sport" className="rounded-lg border border-border bg-surface px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-muted">Wetten</p>
        <p className="font-display text-xl">Sport</p>
      </Link>
      <Link to="/live" className="rounded-lg border border-border bg-surface px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-muted">Studio</p>
        <p className="font-display text-xl">Live-Tische</p>
      </Link>
      <Link to="/aktionen" className="rounded-lg border border-border bg-surface px-4 py-3">
        <p className="text-[10px] uppercase tracking-wider text-muted">Netzwerk-Jackpot</p>
        <p className="font-display text-xl tabular-nums text-[#e8c85a]">{formatEuro(jackpot)}</p>
      </Link>
      <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted">Tagesbonus</p>
          <p className="text-sm">{MISSIONS[3]?.hint}</p>
        </div>
        <button
          type="button"
          disabled={dailyClaimed}
          onClick={() => claimDaily()}
          className="h-10 rounded-md bg-accent px-3 text-xs font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40"
        >
          {dailyClaimed ? "Da" : "2,00 €"}
        </button>
      </div>
    </div>
  );
}

function GameRail({ id, title, games }: { id: string; title: string; games: GameInfo[] }) {
  if (!games.length) return null;
  return (
    <div id={id}>
      <h3 className="mb-3 font-display text-2xl">{title}</h3>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {games.map((game) => (
          <div key={game.slug} className="w-[10.5rem] shrink-0 sm:w-48">
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GameCard({ game }: { game: GameInfo }) {
  const favorites = useCasino((s) => s.favorites);
  const toggleFavorite = useCasino((s) => s.toggleFavorite);
  const loved = favorites.includes(game.slug);
  const [heat, setHeat] = useState<number | null>(null);
  useEffect(() => {
    setHeat(gameHeat(game.slug));
    const id = window.setInterval(() => setHeat(gameHeat(game.slug)), 5000);
    return () => window.clearInterval(id);
  }, [game.slug]);
  const inner = (
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={game.image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
      {game.badge ? (
        <Badge className="absolute left-2 top-2 border-accent/40 bg-bg/80 text-accent">{game.badge}</Badge>
      ) : null}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg">
          <Play className="size-6 fill-current" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-display text-lg leading-tight text-fg">{game.name}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-muted">
          {game.kind === "sport"
            ? "Sport"
            : game.family === "merkur"
              ? "Halle"
              : game.family === "pragmatic"
                ? "Hits"
                : game.family === "live"
                  ? "Live"
                  : game.kind === "table"
                    ? "Tisch"
                    : game.kind === "original"
                      ? "Original"
                      : "Slot"}
          {" · "}
          {game.volatility}
          {heat != null ? ` · ${heat}` : ""}
        </p>
      </div>
    </div>
  );

  const cls = cn(
    "group overflow-hidden border bg-surface transition-shadow duration-200",
    game.family === "merkur"
      ? "rounded-sm border-[#c9a227]/45 hover:border-[#e8c85a] hover:shadow-[0_0_24px_rgb(201_162_39_/_0.28)]"
      : game.family === "pragmatic" || game.family === "live"
        ? "rounded-lg border-[#8a4ad4]/40 hover:border-[#c9a0ff] hover:shadow-[0_0_24px_rgb(138_74_212_/_0.35)]"
        : game.kind === "table"
          ? "rounded-lg border-felt-line/30 hover:border-felt-line/60 hover:shadow-[0_0_24px_rgb(13_58_50_/_0.45)]"
          : game.kind === "original"
            ? "rounded-xl border-accent/30 hover:border-accent/60 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_22%,transparent)]"
            : "rounded-lg border-border hover:border-accent/50 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_22%,transparent)]",
  );

  const heart = (
    <button
      type="button"
      aria-label={loved ? "Favorit entfernen" : "Als Favorit merken"}
      className="absolute right-2 top-2 z-10 inline-flex size-10 items-center justify-center rounded-full bg-bg/70 text-fg hover:text-accent"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(game.slug);
      }}
    >
      <Heart className={cn("size-4", loved && "fill-accent text-accent")} />
    </button>
  );

  if (game.kind === "sport") {
    return (
      <div className="relative">
        <Link to="/sport" className={cls} onClick={() => unlockAudio()}>
          {inner}
        </Link>
        {heart}
      </div>
    );
  }
  if (game.kind === "table") {
    return (
      <div className="relative">
        <Link to={game.family === "live" ? "/spiel/$slug" : "/tisch/$slug"} params={{ slug: game.slug }} className={cls} onClick={() => unlockAudio()}>
          {inner}
        </Link>
        {heart}
      </div>
    );
  }
  return (
    <div className="relative">
      <Link to="/spiel/$slug" params={{ slug: game.slug }} className={cls} onClick={() => unlockAudio()}>
        {inner}
      </Link>
      {heart}
    </div>
  );
}

function LiveWins() {
  const [items, setItems] = useState<ReturnType<typeof makeWin>[]>([]);
  useEffect(() => {
    setItems(makeWins(4));
    const id = window.setInterval(() => {
      setItems((prev) => [makeWin(), ...prev].slice(0, 5));
    }, 3800);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="rounded-lg border border-border bg-bg/80 p-4 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.22em] text-subtle">Letzte Gewinne</p>
      <ul className="mt-3 space-y-2">
        {items.length === 0
          ? Array.from({ length: 4 }).map((_, i) => <li key={i} className="h-5 rounded-sm bg-elevated" />)
          : items.map((w) => (
              <li key={w.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-muted">
                  {w.who} · {w.game}
                </span>
                <span className="tabular-nums text-win">{formatEuroCompact(w.cents)}</span>
              </li>
            ))}
      </ul>
    </div>
  );
}

function makeWin() {
  const game = GAMES[Math.floor(Math.random() * GAMES.length)]!;
  return {
    id: `${Date.now()}-${Math.random()}`,
    who: `${INITIALS[Math.floor(Math.random() * INITIALS.length)]} aus ${CITIES[Math.floor(Math.random() * CITIES.length)]}`,
    game: game.name,
    cents: [1800, 4200, 9600, 15400, 28000, 76000][Math.floor(Math.random() * 6)]!,
  };
}

function makeWins(n: number) {
  return Array.from({ length: n }, makeWin);
}

export function WinTicker() {
  const [items, setItems] = useState<ReturnType<typeof makeWin>[]>([]);
  useEffect(() => {
    setItems(makeWins(8));
    const id = window.setInterval(() => {
      setItems((prev) => [...prev.slice(-10), makeWin()]);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);
  if (!items.length) return null;
  return (
    <div className="win-ticker" aria-hidden>
      <div className="win-ticker-track">
        {items.concat(items).map((w, i) => (
          <span key={`${w.id}-${i}`} className="win-ticker-item">
            {w.who} gewinnt {formatEuroCompact(w.cents)} in {w.game}
          </span>
        ))}
      </div>
    </div>
  );
}
