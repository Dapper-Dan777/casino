export type VipTier = "bronze" | "silber" | "gold" | "platin" | "diamant";

export const VIP_RANKS: { id: VipTier; name: string; from: number; rakeback: number }[] = [
  { id: "bronze", name: "Bronze", from: 0, rakeback: 0 },
  { id: "silber", name: "Silber", from: 5_000, rakeback: 0.02 },
  { id: "gold", name: "Gold", from: 25_000, rakeback: 0.04 },
  { id: "platin", name: "Platin", from: 100_000, rakeback: 0.07 },
  { id: "diamant", name: "Diamant", from: 500_000, rakeback: 0.1 },
];

export function vipOf(wagered: number): (typeof VIP_RANKS)[number] {
  let cur = VIP_RANKS[0]!;
  for (const r of VIP_RANKS) if (wagered >= r.from) cur = r;
  return cur;
}

export function vipNext(wagered: number): { name: string; left: number } | null {
  const cur = vipOf(wagered);
  const i = VIP_RANKS.findIndex((r) => r.id === cur.id);
  const n = VIP_RANKS[i + 1];
  if (!n) return null;
  return { name: n.name, left: n.from - wagered };
}

export function rakebackDue(wagered: number, taken: number): number {
  const r = vipOf(wagered);
  return Math.max(0, Math.floor(wagered * r.rakeback) - taken);
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export type MissionId = "wager" | "wins" | "variety" | "daily";

export const MISSIONS: { id: MissionId; title: string; hint: string; target: number; reward: number }[] = [
  { id: "wager", title: "Einsatz des Tages", hint: "Setze 20,00 €", target: 2000, reward: 150 },
  { id: "wins", title: "Drei Treffer", hint: "Gewinne 3 Runden", target: 3, reward: 200 },
  { id: "variety", title: "Durch die Halle", hint: "Spiele 3 verschiedene Titel", target: 3, reward: 250 },
  { id: "daily", title: "Login", hint: "Heute einlösen", target: 1, reward: 200 },
];

export const JACKPOT_SEED = 1_284_600_00;

export type LiveTable = {
  id: string;
  slug: string;
  name: string;
  studio: string;
  dealer: string;
  min: number;
  max: number;
  seats: number;
  via: "spiel" | "tisch";
};

export const LIVE_TABLES: LiveTable[] = [
  { id: "bj-berlin", slug: "blackjack", name: "Salon Berlin", studio: "Blackjack", dealer: "Lena K.", min: 100, max: 50000, seats: 7, via: "tisch" },
  { id: "bj-speed", slug: "blackjack", name: "Speed Hamburg", studio: "Blackjack", dealer: "Mira S.", min: 200, max: 25000, seats: 5, via: "tisch" },
  { id: "rl-vip", slug: "roulette", name: "VIP Roulette", studio: "Roulette", dealer: "Jonas R.", min: 100, max: 100000, seats: 8, via: "tisch" },
  { id: "blitz", slug: "blitz-roulette", name: "Blitz Köln", studio: "Blitz-Roulette", dealer: "Ayla M.", min: 50, max: 20000, seats: 12, via: "spiel" },
  { id: "bacc", slug: "baccarat", name: "Punto München", studio: "Baccarat", dealer: "Sofia H.", min: 500, max: 100000, seats: 9, via: "tisch" },
  { id: "dt", slug: "drache-tiger", name: "Drache & Tiger", studio: "Live", dealer: "Kenji T.", min: 100, max: 25000, seats: 8, via: "spiel" },
  { id: "rad", slug: "gluecksrad", name: "Studio Glücksrad", studio: "Show", dealer: "Nora B.", min: 50, max: 10000, seats: 40, via: "spiel" },
  { id: "sic", slug: "sicbo", name: "Sic Bo Shanghai", studio: "Sic Bo", dealer: "Mei L.", min: 50, max: 20000, seats: 14, via: "spiel" },
];

export function liveOccupancy(id: string, now = Date.now()): number {
  const t = LIVE_TABLES.find((x) => x.id === id);
  const seats = t?.seats ?? 8;
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) | 0;
  const wave = Math.sin((now / 18000 + (h % 17)) * 0.7);
  const n = Math.round(seats * (0.42 + 0.38 * (0.5 + 0.5 * wave)) + (h % 3));
  return Math.max(1, Math.min(seats, n));
}

export type TourneyRow = { name: string; city: string; cents: number; you?: boolean };

const TOURNEY_BOTS: { name: string; city: string; base: number }[] = [
  { name: "M. K.", city: "Berlin", base: 42800 },
  { name: "A. S.", city: "Hamburg", base: 36100 },
  { name: "L. B.", city: "München", base: 29500 },
  { name: "K. T.", city: "Köln", base: 24100 },
  { name: "J. H.", city: "Frankfurt", base: 18700 },
  { name: "N. R.", city: "Stuttgart", base: 15400 },
  { name: "F. W.", city: "Düsseldorf", base: 11200 },
  { name: "H. P.", city: "Leipzig", base: 8600 },
];

export function tourneyBoard(you: number): TourneyRow[] {
  const rows: TourneyRow[] = TOURNEY_BOTS.map((b) => ({ name: b.name, city: b.city, cents: b.base }));
  if (you > 0) rows.push({ name: "Du", city: "Hier", cents: you, you: true });
  rows.sort((a, b) => b.cents - a.cents);
  return rows.slice(0, 8);
}

export const TOURNEY_POT = 50000;

export function gameHeat(slug: string, now = Date.now()): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 33 + slug.charCodeAt(i)) | 0;
  const wave = Math.sin(now / 22000 + (h % 13) * 0.8);
  return Math.max(18, Math.round(36 + Math.abs(h % 90) + 48 * (0.5 + 0.5 * wave)));
}

export function playersOnline(now = Date.now()): number {
  return 1840 + Math.round(460 * (0.5 + 0.5 * Math.sin(now / 35000)));
}

export function streakReward(days: number): number {
  return Math.min(700, 200 + Math.max(0, days - 1) * 50);
}

export const SUPPORT_REPLIES: { q: string; a: string }[] = [
  { q: "Einzahlung", a: "Kasse oben rechts · Visa, Klarna, Sofort, Krypto. Nur Spielgeld, keine echte Belastung." },
  { q: "Auszahlung", a: "Ab 20,00 € Spielgeld über die Kasse. Demo-Auszahlung, kein Echtgeld." },
  { q: "Bonus", a: "Code WELCOME oder AURELIA bei der ersten Einzahlung · 100 % bis 100,00 € Spielgeld." },
  { q: "VIP", a: "Club-Stufen ab Umsatz. Rakeback unter VIP holen. Nur Spielgeld." },
  { q: "Sperre", a: "Unter Konto → Spielerschutz kannst du eine Pause oder ein Tageslimit setzen." },
];

