import { formatEuro } from "./format";

export type SportLeague = "liga" | "koenig" | "tennis" | "nba" | "live";

export type SportPick = "1" | "X" | "2" | "over" | "under";

export type SportEvent = {
  id: string;
  league: SportLeague;
  leagueName: string;
  home: string;
  away: string;
  kickoff: number;
  durationMs: number;
  odds: { home: number; draw: number | null; away: number };
  line: number;
  over: number;
  under: number;
};

export type SportPhase = "pre" | "live" | "ft";

export type SportClock = {
  phase: SportPhase;
  minute: number;
  home: number;
  away: number;
};

export type SportLeg = {
  eventId: string;
  label: string;
  pick: SportPick;
  odds: number;
};

export type SportTicket = {
  id: string;
  legs: SportLeg[];
  stake: number;
  odds: number;
  status: "open" | "won" | "lost" | "cashed";
  payout: number;
  at: number;
};

const LIVE_MS = 90_000;
const CYCLE = 150_000;

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

function unit(s: string, salt: number): number {
  return (hash(`${s}:${salt}`) % 10_000) / 10_000;
}

function oddsAround(base: number, jitter: number): number {
  const x = Math.round((base + jitter) * 100) / 100;
  return Math.max(1.08, Math.min(18, x));
}

const FOOTBALL: [string, string, number][] = [
  ["Bayern", "Dortmund", 1.55],
  ["Leipzig", "Frankfurt", 1.95],
  ["Leverkusen", "Stuttgart", 2.05],
  ["Freiburg", "Wolfsburg", 2.2],
  ["Gladbach", "Union", 2.35],
  ["Bremen", "Mainz", 2.45],
  ["Köln", "Augsburg", 2.15],
  ["Hoffenheim", "Heidenheim", 1.85],
];

const EUROPE: [string, string, number][] = [
  ["Madrid", "Mailand", 2.1],
  ["Paris", "London", 2.25],
  ["Lissabon", "München", 3.4],
  ["Amsterdam", "Bergamo", 2.0],
];

const TENNIS: [string, string, number][] = [
  ["Alcaraz", "Sinner", 1.72],
  ["Djokovic", "Zverev", 1.9],
  ["Swiatek", "Sabalenka", 1.85],
  ["Fritz", "Rune", 2.05],
];

const NBA: [string, string, number][] = [
  ["Boston", "Dallas", 1.78],
  ["Denver", "Phoenix", 1.92],
  ["Lakers", "Warriors", 2.15],
  ["New York", "Miami", 1.88],
];

function footballEvent(
  id: string,
  league: SportLeague,
  leagueName: string,
  home: string,
  away: string,
  kickoff: number,
  durationMs: number,
  homeBase: number,
): SportEvent {
  const j = (unit(id, 1) - 0.5) * 0.18;
  const homeOdds = oddsAround(homeBase, j);
  const awayOdds = oddsAround(1 + 1 / (homeBase - 1), -j * 0.6);
  const draw = oddsAround(3.4 + (homeBase - 2) * 0.3, (unit(id, 2) - 0.5) * 0.25);
  const line = unit(id, 3) > 0.5 ? 2.5 : 3.5;
  return {
    id,
    league,
    leagueName,
    home,
    away,
    kickoff,
    durationMs,
    odds: { home: homeOdds, draw, away: awayOdds },
    line,
    over: oddsAround(1.9, (unit(id, 4) - 0.5) * 0.12),
    under: oddsAround(1.9, (0.5 - unit(id, 4)) * 0.12),
  };
}

function twoWay(
  id: string,
  league: SportLeague,
  leagueName: string,
  home: string,
  away: string,
  kickoff: number,
  durationMs: number,
  homeBase: number,
): SportEvent {
  const j = (unit(id, 1) - 0.5) * 0.14;
  return {
    id,
    league,
    leagueName,
    home,
    away,
    kickoff,
    durationMs,
    odds: { home: oddsAround(homeBase, j), draw: null, away: oddsAround(1 + 1 / (homeBase - 1), -j) },
    line: league === "nba" ? 215.5 : 2.5,
    over: oddsAround(1.87, (unit(id, 4) - 0.5) * 0.1),
    under: oddsAround(1.87, (0.5 - unit(id, 4)) * 0.1),
  };
}

export function sportBoard(now = Date.now()): SportEvent[] {
  const day = new Date(now).toISOString().slice(0, 10);
  const cycle = Math.floor(now / CYCLE);
  const cycleStart = cycle * CYCLE;
  const out: SportEvent[] = [];

  const livePairs = [
    FOOTBALL[(hash(day) + 1) % FOOTBALL.length]!,
    FOOTBALL[(hash(day) + 4) % FOOTBALL.length]!,
    EUROPE[hash(day) % EUROPE.length]!,
    TENNIS[hash(day) % TENNIS.length]!,
  ];
  livePairs.forEach((p, i) => {
    const id = `lv-${day}-${cycle}-${i}`;
    const kick = cycleStart + i * 8_000;
    if (p === livePairs[3]) out.push(twoWay(id, "live", "Live Arena", p[0], p[1], kick, LIVE_MS, p[2]));
    else out.push(footballEvent(id, "live", "Live Arena", p[0], p[1], kick, LIVE_MS, p[2]));
  });

  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const t0 = start.getTime();
  const hours = [12.5, 14.5, 15.5, 17.5, 18.5, 20.5, 20.75, 21.5];
  FOOTBALL.forEach((p, i) => {
    const kick = t0 + (hours[i] ?? 19) * 3600_000;
    out.push(footballEvent(`lg-${day}-${i}`, "liga", "1. Liga", p[0], p[1], kick, LIVE_MS, p[2]));
  });
  EUROPE.forEach((p, i) => {
    const kick = t0 + (18 + i * 0.75) * 3600_000;
    out.push(footballEvent(`eu-${day}-${i}`, "koenig", "Königsklasse", p[0], p[1], kick, LIVE_MS, p[2]));
  });
  TENNIS.forEach((p, i) => {
    const kick = t0 + (13 + i * 2) * 3600_000;
    out.push(twoWay(`tn-${day}-${i}`, "tennis", "Tennis", p[0], p[1], kick, 70_000, p[2]));
  });
  NBA.forEach((p, i) => {
    const kick = t0 + (1.5 + i * 0.7) * 3600_000;
    out.push(twoWay(`nba-${day}-${i}`, "nba", "NBA Night", p[0], p[1], kick, 80_000, p[2]));
  });
  return out;
}

export function sportClock(ev: SportEvent, now = Date.now()): SportClock {
  if (now < ev.kickoff) return { phase: "pre", minute: 0, home: 0, away: 0 };
  const elapsed = now - ev.kickoff;
  if (elapsed >= ev.durationMs) {
    const full = goals(ev, 90);
    return { phase: "ft", minute: 90, home: full.home, away: full.away };
  }
  const minute = Math.min(90, Math.max(1, Math.round((elapsed / ev.durationMs) * 90)));
  const g = goals(ev, minute);
  return { phase: "live", minute, home: g.home, away: g.away };
}

function goals(ev: SportEvent, minute: number): { home: number; away: number } {
  if (ev.league === "nba") {
    const h = 70 + Math.floor(unit(ev.id, 20) * 40) + Math.floor(minute * 0.55);
    const a = 68 + Math.floor(unit(ev.id, 21) * 40) + Math.floor(minute * 0.52);
    return { home: Math.round((h * minute) / 90), away: Math.round((a * minute) / 90) };
  }
  let home = 0;
  let away = 0;
  const rateH = 0.022 + (2.2 - ev.odds.home) * 0.008;
  const rateA = 0.018 + (2.2 - ev.odds.away) * 0.008;
  for (let m = 1; m <= minute; m++) {
    if (unit(ev.id, m * 3) < rateH) home += 1;
    if (unit(ev.id, m * 3 + 1) < rateA) away += 1;
  }
  return { home, away };
}

export function pickHits(ev: SportEvent, pick: SportPick, clock: SportClock): boolean | null {
  if (clock.phase !== "ft") return null;
  const total = clock.home + clock.away;
  if (pick === "1") return clock.home > clock.away;
  if (pick === "2") return clock.away > clock.home;
  if (pick === "X") return clock.home === clock.away;
  if (pick === "over") return total > ev.line;
  return total < ev.line;
}

export function ticketStatus(ticket: SportTicket, events: SportEvent[], now = Date.now()): "open" | "won" | "lost" {
  if (ticket.status !== "open") return ticket.status === "cashed" ? "won" : ticket.status;
  let pending = false;
  for (const leg of ticket.legs) {
    const ev = events.find((e) => e.id === leg.eventId);
    if (!ev) return "lost";
    const clock = sportClock(ev, now);
    const hit = pickHits(ev, leg.pick, clock);
    if (hit === null) pending = true;
    else if (!hit) return "lost";
  }
  return pending ? "open" : "won";
}

export function cashoutValue(ticket: SportTicket, events: SportEvent[], now = Date.now()): number {
  if (ticket.status !== "open") return 0;
  let live = false;
  let winning = 0;
  for (const leg of ticket.legs) {
    const ev = events.find((e) => e.id === leg.eventId);
    if (!ev) return 0;
    const clock = sportClock(ev, now);
    if (clock.phase === "pre") return Math.round(ticket.stake * 0.92);
    if (clock.phase === "live") live = true;
    const virtual: SportClock = { ...clock, phase: "ft" };
    if (pickHits(ev, leg.pick, virtual)) winning += 1;
  }
  if (!live && winning === ticket.legs.length) return 0;
  const frac = winning / ticket.legs.length;
  const potential = Math.round(ticket.stake * ticket.odds);
  return Math.max(1, Math.round(potential * 0.62 * frac + ticket.stake * 0.12 * (1 - frac)));
}

export function comboOdds(legs: SportLeg[]): number {
  const x = legs.reduce((a, l) => a * l.odds, 1);
  return Math.round(x * 100) / 100;
}

export function pickLabel(ev: SportEvent, pick: SportPick): string {
  if (pick === "1") return ev.home;
  if (pick === "2") return ev.away;
  if (pick === "X") return "Unentschieden";
  if (pick === "over") return `Über ${ev.line}`;
  return `Unter ${ev.line}`;
}

export function formatOdds(n: number): string {
  return n.toFixed(2).replace(".", ",");
}

export function ticketTitle(t: SportTicket): string {
  if (t.legs.length === 1) return t.legs[0]!.label;
  return `Kombi ${t.legs.length} · ${formatOdds(t.odds)}`;
}

export function ticketHint(t: SportTicket): string {
  return `${formatEuro(t.stake)} · ${formatOdds(t.odds)}`;
}

export const LEAGUE_TABS: { id: SportLeague | "all"; label: string }[] = [
  { id: "all", label: "Alle" },
  { id: "live", label: "Live" },
  { id: "liga", label: "1. Liga" },
  { id: "koenig", label: "Königsklasse" },
  { id: "tennis", label: "Tennis" },
  { id: "nba", label: "NBA" },
];
