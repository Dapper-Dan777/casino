import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-BGVb_yiH.js
var VIP_RANKS = [
	{
		id: "bronze",
		name: "Bronze",
		from: 0,
		rakeback: 0
	},
	{
		id: "silber",
		name: "Silber",
		from: 5e3,
		rakeback: .02
	},
	{
		id: "gold",
		name: "Gold",
		from: 25e3,
		rakeback: .04
	},
	{
		id: "platin",
		name: "Platin",
		from: 1e5,
		rakeback: .07
	},
	{
		id: "diamant",
		name: "Diamant",
		from: 5e5,
		rakeback: .1
	}
];
function vipOf(wagered) {
	let cur = VIP_RANKS[0];
	for (const r of VIP_RANKS) if (wagered >= r.from) cur = r;
	return cur;
}
function vipNext(wagered) {
	const cur = vipOf(wagered);
	const n = VIP_RANKS[VIP_RANKS.findIndex((r) => r.id === cur.id) + 1];
	if (!n) return null;
	return {
		name: n.name,
		left: n.from - wagered
	};
}
function rakebackDue(wagered, taken) {
	const r = vipOf(wagered);
	return Math.max(0, Math.floor(wagered * r.rakeback) - taken);
}
function todayKey() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
var MISSIONS = [
	{
		id: "wager",
		title: "Einsatz des Tages",
		hint: "Setze 20,00 €",
		target: 2e3,
		reward: 150
	},
	{
		id: "wins",
		title: "Drei Treffer",
		hint: "Gewinne 3 Runden",
		target: 3,
		reward: 200
	},
	{
		id: "variety",
		title: "Durch die Halle",
		hint: "Spiele 3 verschiedene Titel",
		target: 3,
		reward: 250
	},
	{
		id: "daily",
		title: "Login",
		hint: "Heute einlösen",
		target: 1,
		reward: 200
	}
];
var JACKPOT_SEED = 12846e4;
var LIVE_TABLES = [
	{
		id: "bj-berlin",
		slug: "blackjack",
		name: "Salon Berlin",
		studio: "Blackjack",
		dealer: "Lena K.",
		min: 100,
		max: 5e4,
		seats: 7,
		via: "tisch"
	},
	{
		id: "bj-speed",
		slug: "blackjack",
		name: "Speed Hamburg",
		studio: "Blackjack",
		dealer: "Mira S.",
		min: 200,
		max: 25e3,
		seats: 5,
		via: "tisch"
	},
	{
		id: "rl-vip",
		slug: "roulette",
		name: "VIP Roulette",
		studio: "Roulette",
		dealer: "Jonas R.",
		min: 100,
		max: 1e5,
		seats: 8,
		via: "tisch"
	},
	{
		id: "blitz",
		slug: "blitz-roulette",
		name: "Blitz Köln",
		studio: "Blitz-Roulette",
		dealer: "Ayla M.",
		min: 50,
		max: 2e4,
		seats: 12,
		via: "spiel"
	},
	{
		id: "bacc",
		slug: "baccarat",
		name: "Punto München",
		studio: "Baccarat",
		dealer: "Sofia H.",
		min: 500,
		max: 1e5,
		seats: 9,
		via: "tisch"
	},
	{
		id: "dt",
		slug: "drache-tiger",
		name: "Drache & Tiger",
		studio: "Live",
		dealer: "Kenji T.",
		min: 100,
		max: 25e3,
		seats: 8,
		via: "spiel"
	},
	{
		id: "rad",
		slug: "gluecksrad",
		name: "Studio Glücksrad",
		studio: "Show",
		dealer: "Nora B.",
		min: 50,
		max: 1e4,
		seats: 40,
		via: "spiel"
	},
	{
		id: "sic",
		slug: "sicbo",
		name: "Sic Bo Shanghai",
		studio: "Sic Bo",
		dealer: "Mei L.",
		min: 50,
		max: 2e4,
		seats: 14,
		via: "spiel"
	}
];
function liveOccupancy(id, now = Date.now()) {
	const seats = LIVE_TABLES.find((x) => x.id === id)?.seats ?? 8;
	let h = 0;
	for (let i = 0; i < id.length; i++) h = h * 33 + id.charCodeAt(i) | 0;
	const wave = Math.sin((now / 18e3 + h % 17) * .7);
	const n = Math.round(seats * (.42 + .38 * (.5 + .5 * wave)) + h % 3);
	return Math.max(1, Math.min(seats, n));
}
var TOURNEY_BOTS = [
	{
		name: "M. K.",
		city: "Berlin",
		base: 42800
	},
	{
		name: "A. S.",
		city: "Hamburg",
		base: 36100
	},
	{
		name: "L. B.",
		city: "München",
		base: 29500
	},
	{
		name: "K. T.",
		city: "Köln",
		base: 24100
	},
	{
		name: "J. H.",
		city: "Frankfurt",
		base: 18700
	},
	{
		name: "N. R.",
		city: "Stuttgart",
		base: 15400
	},
	{
		name: "F. W.",
		city: "Düsseldorf",
		base: 11200
	},
	{
		name: "H. P.",
		city: "Leipzig",
		base: 8600
	}
];
function tourneyBoard(you) {
	const rows = TOURNEY_BOTS.map((b) => ({
		name: b.name,
		city: b.city,
		cents: b.base
	}));
	if (you > 0) rows.push({
		name: "Du",
		city: "Hier",
		cents: you,
		you: true
	});
	rows.sort((a, b) => b.cents - a.cents);
	return rows.slice(0, 8);
}
var TOURNEY_POT = 5e4;
function gameHeat(slug, now = Date.now()) {
	let h = 0;
	for (let i = 0; i < slug.length; i++) h = h * 33 + slug.charCodeAt(i) | 0;
	const wave = Math.sin(now / 22e3 + h % 13 * .8);
	return Math.max(18, Math.round(36 + Math.abs(h % 90) + 48 * (.5 + .5 * wave)));
}
function playersOnline(now = Date.now()) {
	return 1840 + Math.round(460 * (.5 + .5 * Math.sin(now / 35e3)));
}
function streakReward(days) {
	return Math.min(700, 200 + Math.max(0, days - 1) * 50);
}
var SUPPORT_REPLIES = [
	{
		q: "Einzahlung",
		a: "Kasse oben rechts · Visa, Klarna, Sofort, Krypto. Nur Spielgeld, keine echte Belastung."
	},
	{
		q: "Auszahlung",
		a: "Ab 20,00 € Spielgeld über die Kasse. Demo-Auszahlung, kein Echtgeld."
	},
	{
		q: "Bonus",
		a: "Code WELCOME oder AURELIA bei der ersten Einzahlung · 100 % bis 100,00 € Spielgeld."
	},
	{
		q: "VIP",
		a: "Club-Stufen ab Umsatz. Rakeback unter VIP holen. Nur Spielgeld."
	},
	{
		q: "Sperre",
		a: "Unter Konto → Spielerschutz kannst du eine Pause oder ein Tageslimit setzen."
	}
];
var eur = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR"
});
var eurCompact = new Intl.NumberFormat("de-DE", {
	style: "currency",
	currency: "EUR",
	maximumFractionDigits: 0
});
/** Integer cents → "12,50 €" */
function formatEuro(cents) {
	return eur.format(cents / 100);
}
function formatEuroCompact(cents) {
	return eurCompact.format(cents / 100);
}
function parseEuroInput(raw) {
	const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
	if (!normalized) return null;
	const value = Number(normalized);
	if (!Number.isFinite(value) || value < 0) return null;
	return Math.round(value * 100);
}
function formatTime(ts) {
	return new Intl.DateTimeFormat("de-DE", {
		day: "2-digit",
		month: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	}).format(ts);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { todayKey as _, SUPPORT_REPLIES as a, vipOf as b, formatEuro as c, gameHeat as d, liveOccupancy as f, streakReward as g, rakebackDue as h, MISSIONS as i, formatEuroCompact as l, playersOnline as m, JACKPOT_SEED as n, TOURNEY_POT as o, parseEuroInput as p, LIVE_TABLES as r, VIP_RANKS as s, cn as t, formatTime as u, tourneyBoard as v, vipNext as y };
