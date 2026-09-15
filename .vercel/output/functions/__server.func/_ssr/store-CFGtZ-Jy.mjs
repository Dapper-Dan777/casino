import "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { _ as todayKey, g as streakReward, h as rakebackDue, r as MISSIONS, s as cn, t as JACKPOT_SEED } from "./operator-95DAgWDt.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg border border-border hover:border-accent/40",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			felt: "bg-felt text-fg hover:opacity-90",
			danger: "bg-loss/20 text-loss border border-loss/30 hover:bg-loss/30"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-6",
			icon: "size-11",
			xl: "h-14 px-8 text-base"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var LIVE_MS = 9e4;
var CYCLE = 15e4;
function hash(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}
function unit(s, salt) {
	return hash(`${s}:${salt}`) % 1e4 / 1e4;
}
function oddsAround(base, jitter) {
	const x = Math.round((base + jitter) * 100) / 100;
	return Math.max(1.08, Math.min(18, x));
}
var FOOTBALL = [
	[
		"Bayern",
		"Dortmund",
		1.55
	],
	[
		"Leipzig",
		"Frankfurt",
		1.95
	],
	[
		"Leverkusen",
		"Stuttgart",
		2.05
	],
	[
		"Freiburg",
		"Wolfsburg",
		2.2
	],
	[
		"Gladbach",
		"Union",
		2.35
	],
	[
		"Bremen",
		"Mainz",
		2.45
	],
	[
		"Köln",
		"Augsburg",
		2.15
	],
	[
		"Hoffenheim",
		"Heidenheim",
		1.85
	]
];
var EUROPE = [
	[
		"Madrid",
		"Mailand",
		2.1
	],
	[
		"Paris",
		"London",
		2.25
	],
	[
		"Lissabon",
		"München",
		3.4
	],
	[
		"Amsterdam",
		"Bergamo",
		2
	]
];
var TENNIS = [
	[
		"Alcaraz",
		"Sinner",
		1.72
	],
	[
		"Djokovic",
		"Zverev",
		1.9
	],
	[
		"Swiatek",
		"Sabalenka",
		1.85
	],
	[
		"Fritz",
		"Rune",
		2.05
	]
];
var NBA = [
	[
		"Boston",
		"Dallas",
		1.78
	],
	[
		"Denver",
		"Phoenix",
		1.92
	],
	[
		"Lakers",
		"Warriors",
		2.15
	],
	[
		"New York",
		"Miami",
		1.88
	]
];
function footballEvent(id, league, leagueName, home, away, kickoff, durationMs, homeBase) {
	const j = (unit(id, 1) - .5) * .18;
	const homeOdds = oddsAround(homeBase, j);
	const awayOdds = oddsAround(1 + 1 / (homeBase - 1), -j * .6);
	const draw = oddsAround(3.4 + (homeBase - 2) * .3, (unit(id, 2) - .5) * .25);
	const line = unit(id, 3) > .5 ? 2.5 : 3.5;
	return {
		id,
		league,
		leagueName,
		home,
		away,
		kickoff,
		durationMs,
		odds: {
			home: homeOdds,
			draw,
			away: awayOdds
		},
		line,
		over: oddsAround(1.9, (unit(id, 4) - .5) * .12),
		under: oddsAround(1.9, (.5 - unit(id, 4)) * .12)
	};
}
function twoWay(id, league, leagueName, home, away, kickoff, durationMs, homeBase) {
	const j = (unit(id, 1) - .5) * .14;
	return {
		id,
		league,
		leagueName,
		home,
		away,
		kickoff,
		durationMs,
		odds: {
			home: oddsAround(homeBase, j),
			draw: null,
			away: oddsAround(1 + 1 / (homeBase - 1), -j)
		},
		line: league === "nba" ? 215.5 : 2.5,
		over: oddsAround(1.87, (unit(id, 4) - .5) * .1),
		under: oddsAround(1.87, (.5 - unit(id, 4)) * .1)
	};
}
function sportBoard(now = Date.now()) {
	const day = new Date(now).toISOString().slice(0, 10);
	const cycle = Math.floor(now / CYCLE);
	const cycleStart = cycle * CYCLE;
	const out = [];
	const livePairs = [
		FOOTBALL[(hash(day) + 1) % FOOTBALL.length],
		FOOTBALL[(hash(day) + 4) % FOOTBALL.length],
		EUROPE[hash(day) % EUROPE.length],
		TENNIS[hash(day) % TENNIS.length]
	];
	livePairs.forEach((p, i) => {
		const id = `lv-${day}-${cycle}-${i}`;
		const kick = cycleStart + i * 8e3;
		if (p === livePairs[3]) out.push(twoWay(id, "live", "Live Arena", p[0], p[1], kick, LIVE_MS, p[2]));
		else out.push(footballEvent(id, "live", "Live Arena", p[0], p[1], kick, LIVE_MS, p[2]));
	});
	const start = new Date(now);
	start.setHours(0, 0, 0, 0);
	const t0 = start.getTime();
	const hours = [
		12.5,
		14.5,
		15.5,
		17.5,
		18.5,
		20.5,
		20.75,
		21.5
	];
	FOOTBALL.forEach((p, i) => {
		const kick = t0 + (hours[i] ?? 19) * 36e5;
		out.push(footballEvent(`lg-${day}-${i}`, "liga", "1. Liga", p[0], p[1], kick, LIVE_MS, p[2]));
	});
	EUROPE.forEach((p, i) => {
		const kick = t0 + (18 + i * .75) * 36e5;
		out.push(footballEvent(`eu-${day}-${i}`, "koenig", "Königsklasse", p[0], p[1], kick, LIVE_MS, p[2]));
	});
	TENNIS.forEach((p, i) => {
		const kick = t0 + (13 + i * 2) * 36e5;
		out.push(twoWay(`tn-${day}-${i}`, "tennis", "Tennis", p[0], p[1], kick, 7e4, p[2]));
	});
	NBA.forEach((p, i) => {
		const kick = t0 + (1.5 + i * .7) * 36e5;
		out.push(twoWay(`nba-${day}-${i}`, "nba", "NBA Night", p[0], p[1], kick, 8e4, p[2]));
	});
	return out;
}
function sportClock(ev, now = Date.now()) {
	if (now < ev.kickoff) return {
		phase: "pre",
		minute: 0,
		home: 0,
		away: 0
	};
	const elapsed = now - ev.kickoff;
	if (elapsed >= ev.durationMs) {
		const full = goals(ev, 90);
		return {
			phase: "ft",
			minute: 90,
			home: full.home,
			away: full.away
		};
	}
	const minute = Math.min(90, Math.max(1, Math.round(elapsed / ev.durationMs * 90)));
	const g = goals(ev, minute);
	return {
		phase: "live",
		minute,
		home: g.home,
		away: g.away
	};
}
function goals(ev, minute) {
	if (ev.league === "nba") {
		const h = 70 + Math.floor(unit(ev.id, 20) * 40) + Math.floor(minute * .55);
		const a = 68 + Math.floor(unit(ev.id, 21) * 40) + Math.floor(minute * .52);
		return {
			home: Math.round(h * minute / 90),
			away: Math.round(a * minute / 90)
		};
	}
	let home = 0;
	let away = 0;
	const rateH = .022 + (2.2 - ev.odds.home) * .008;
	const rateA = .018 + (2.2 - ev.odds.away) * .008;
	for (let m = 1; m <= minute; m++) {
		if (unit(ev.id, m * 3) < rateH) home += 1;
		if (unit(ev.id, m * 3 + 1) < rateA) away += 1;
	}
	return {
		home,
		away
	};
}
function pickHits(ev, pick, clock) {
	if (clock.phase !== "ft") return null;
	const total = clock.home + clock.away;
	if (pick === "1") return clock.home > clock.away;
	if (pick === "2") return clock.away > clock.home;
	if (pick === "X") return clock.home === clock.away;
	if (pick === "over") return total > ev.line;
	return total < ev.line;
}
function ticketStatus(ticket, events, now = Date.now()) {
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
function cashoutValue(ticket, events, now = Date.now()) {
	if (ticket.status !== "open") return 0;
	let live = false;
	let winning = 0;
	for (const leg of ticket.legs) {
		const ev = events.find((e) => e.id === leg.eventId);
		if (!ev) return 0;
		const clock = sportClock(ev, now);
		if (clock.phase === "pre") return Math.round(ticket.stake * .92);
		if (clock.phase === "live") live = true;
		const virtual = {
			...clock,
			phase: "ft"
		};
		if (pickHits(ev, leg.pick, virtual)) winning += 1;
	}
	if (!live && winning === ticket.legs.length) return 0;
	const frac = winning / ticket.legs.length;
	const potential = Math.round(ticket.stake * ticket.odds);
	return Math.max(1, Math.round(potential * .62 * frac + ticket.stake * .12 * (1 - frac)));
}
function comboOdds(legs) {
	const x = legs.reduce((a, l) => a * l.odds, 1);
	return Math.round(x * 100) / 100;
}
function pickLabel(ev, pick) {
	if (pick === "1") return ev.home;
	if (pick === "2") return ev.away;
	if (pick === "X") return "Unentschieden";
	if (pick === "over") return `Über ${ev.line}`;
	return `Unter ${ev.line}`;
}
function formatOdds(n) {
	return n.toFixed(2).replace(".", ",");
}
var LEAGUE_TABS = [
	{
		id: "all",
		label: "Alle"
	},
	{
		id: "live",
		label: "Live"
	},
	{
		id: "liga",
		label: "1. Liga"
	},
	{
		id: "koenig",
		label: "Königsklasse"
	},
	{
		id: "tennis",
		label: "Tennis"
	},
	{
		id: "nba",
		label: "NBA"
	}
];
var SAVE_VERSION = 1;
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
var MAX_TX = 80;
function pushNotif(list, n) {
	return [{
		id: uid(),
		read: false,
		...n
	}, ...list].slice(0, 24);
}
function pushTx(list, tx) {
	return [tx, ...list].slice(0, MAX_TX);
}
var useCasino = create()(persist((set, get) => ({
	version: SAVE_VERSION,
	hydrated: false,
	ageVerified: false,
	cashierOpen: false,
	soundOn: true,
	balance: 0,
	bonusBalance: 0,
	totalDeposited: 0,
	totalWithdrawn: 0,
	welcomeUsed: false,
	starterClaimed: false,
	transactions: [],
	recent: [],
	favorites: [],
	wagered: 0,
	wageredToday: 0,
	winsToday: 0,
	gamesToday: [],
	missionDay: todayKey(),
	claimedMissions: [],
	dailyClaimed: false,
	jackpot: JACKPOT_SEED,
	tourneyBest: 0,
	rakebackTaken: 0,
	drop: null,
	sportTickets: [],
	dayLimit: 0,
	pausedUntil: 0,
	streak: 0,
	streakDay: "",
	notifs: [],
	sessionStarted: 0,
	markHydrated: () => set({
		hydrated: true,
		sessionStarted: get().sessionStarted || Date.now()
	}),
	verifyAge: () => set({ ageVerified: true }),
	setCashierOpen: (open) => set({ cashierOpen: open }),
	toggleSound: () => set({ soundOn: !get().soundOn }),
	deposit: (cents, method, bonusCode) => {
		if (cents < 1e3) return {
			ok: false,
			reason: "Mindesteinzahlung 10,00 €"
		};
		if (cents > 5e5) return {
			ok: false,
			reason: "Maximale Einzahlung 5.000,00 €"
		};
		const code = (bonusCode ?? "").trim().toUpperCase();
		let bonus = 0;
		const welcome = !get().welcomeUsed && (code === "WELCOME" || code === "AURELIA");
		if (welcome) bonus = Math.min(cents, 1e4);
		const tx = {
			id: uid(),
			kind: "deposit",
			cents,
			label: `Einzahlung · ${method}`,
			at: Date.now(),
			method
		};
		set((s) => {
			const next = {
				balance: s.balance + cents + bonus,
				bonusBalance: s.bonusBalance + bonus,
				totalDeposited: s.totalDeposited + cents,
				welcomeUsed: s.welcomeUsed || welcome,
				transactions: pushTx(s.transactions, tx)
			};
			if (bonus > 0) next.transactions = pushTx(next.transactions, {
				id: uid(),
				kind: "bonus",
				cents: bonus,
				label: "Willkommensbonus 100 %",
				at: Date.now()
			});
			return next;
		});
		return {
			ok: true,
			bonus
		};
	},
	withdraw: (cents) => {
		const s = get();
		if (cents < 2e3) return {
			ok: false,
			reason: "Mindestauszahlung 20,00 €"
		};
		if (cents > s.balance) return {
			ok: false,
			reason: "Nicht genug Guthaben"
		};
		set({
			balance: s.balance - cents,
			totalWithdrawn: s.totalWithdrawn + cents,
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "withdraw",
				cents,
				label: "Auszahlung",
				at: Date.now()
			})
		});
		return { ok: true };
	},
	placeBet: (cents, label) => {
		const s = get();
		if (cents <= 0 || cents > s.balance) return false;
		if (s.pausedUntil > Date.now()) return false;
		const day = todayKey();
		const reset = s.missionDay !== day;
		const wageredToday = reset ? cents : s.wageredToday + cents;
		if (s.dayLimit > 0 && wageredToday > s.dayLimit) return false;
		set({
			balance: s.balance - cents,
			wagered: s.wagered + cents,
			wageredToday,
			winsToday: reset ? 0 : s.winsToday,
			gamesToday: reset ? [] : s.gamesToday,
			missionDay: day,
			claimedMissions: reset ? [] : s.claimedMissions,
			dailyClaimed: reset ? false : s.dailyClaimed,
			jackpot: s.jackpot + Math.max(2, Math.floor(cents * .018)),
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "bet",
				cents,
				label,
				at: Date.now()
			})
		});
		return true;
	},
	creditWin: (cents, label) => {
		if (cents <= 0) return;
		set((s) => {
			const day = todayKey();
			const reset = s.missionDay !== day;
			const dropAmt = cents >= 5e4 && Math.random() < .08 ? Math.min(s.jackpot, Math.round(s.jackpot * .04)) : 0;
			return {
				balance: s.balance + cents + dropAmt,
				winsToday: reset ? 1 : s.winsToday + 1,
				missionDay: day,
				claimedMissions: reset ? [] : s.claimedMissions,
				dailyClaimed: reset ? false : s.dailyClaimed,
				tourneyBest: Math.max(s.tourneyBest, cents),
				jackpot: dropAmt ? Math.max(JACKPOT_SEED / 2, s.jackpot - dropAmt) : s.jackpot,
				drop: dropAmt ? {
					text: `Prize Drop · ${label}`,
					cents: dropAmt
				} : s.drop,
				transactions: pushTx(s.transactions, {
					id: uid(),
					kind: "win",
					cents,
					label,
					at: Date.now()
				})
			};
		});
	},
	grantStarter: () => {
		const s = get();
		if (s.starterClaimed || s.balance > 0) return false;
		set({
			starterClaimed: true,
			balance: s.balance + 5e3,
			bonusBalance: s.bonusBalance + 5e3,
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "bonus",
				cents: 5e3,
				label: "Willkommensguthaben",
				at: Date.now()
			})
		});
		return true;
	},
	touchGame: (slug) => {
		set((s) => {
			const day = todayKey();
			const reset = s.missionDay !== day;
			const games = reset ? [slug] : s.gamesToday.includes(slug) ? s.gamesToday : [...s.gamesToday, slug].slice(0, 12);
			return {
				recent: [slug, ...s.recent.filter((x) => x !== slug)].slice(0, 8),
				gamesToday: games,
				missionDay: day,
				claimedMissions: reset ? [] : s.claimedMissions,
				dailyClaimed: reset ? false : s.dailyClaimed,
				wageredToday: reset ? 0 : s.wageredToday,
				winsToday: reset ? 0 : s.winsToday
			};
		});
	},
	toggleFavorite: (slug) => {
		set((s) => ({ favorites: s.favorites.includes(slug) ? s.favorites.filter((x) => x !== slug) : [slug, ...s.favorites].slice(0, 16) }));
	},
	claimMission: (id) => {
		const s = get();
		const day = todayKey();
		if (s.missionDay !== day) return false;
		if (s.claimedMissions.includes(id)) return false;
		const m = MISSIONS.find((x) => x.id === id);
		if (!m) return false;
		if ((id === "wager" ? s.wageredToday : id === "wins" ? s.winsToday : id === "variety" ? s.gamesToday.length : s.dailyClaimed ? 1 : 0) < m.target) return false;
		set({
			balance: s.balance + m.reward,
			claimedMissions: [...s.claimedMissions, id],
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "bonus",
				cents: m.reward,
				label: `Mission · ${m.title}`,
				at: Date.now()
			})
		});
		return true;
	},
	claimDaily: () => {
		const s = get();
		const day = todayKey();
		if (s.dailyClaimed && s.missionDay === day) return false;
		const reset = s.missionDay !== day;
		const yesterday = /* @__PURE__ */ new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		const yKey = yesterday.toISOString().slice(0, 10);
		const streak = s.streakDay === yKey ? s.streak + 1 : s.streakDay === day ? s.streak : 1;
		const reward = streakReward(streak);
		set({
			missionDay: day,
			dailyClaimed: true,
			streak,
			streakDay: day,
			claimedMissions: reset ? ["daily"] : s.claimedMissions.includes("daily") ? s.claimedMissions : [...s.claimedMissions, "daily"],
			wageredToday: reset ? 0 : s.wageredToday,
			winsToday: reset ? 0 : s.winsToday,
			gamesToday: reset ? [] : s.gamesToday,
			balance: s.balance + reward,
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "bonus",
				cents: reward,
				label: `Tagesbonus · ${streak} Tage`,
				at: Date.now()
			}),
			notifs: pushNotif(s.notifs, {
				title: "Tagesbonus",
				body: `${streak} Tage in Folge`,
				at: Date.now()
			})
		});
		return true;
	},
	claimRakeback: () => {
		const s = get();
		const due = rakebackDue(s.wagered, s.rakebackTaken);
		if (due <= 0) return 0;
		set({
			rakebackTaken: s.rakebackTaken + due,
			balance: s.balance + due,
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "bonus",
				cents: due,
				label: "VIP Rakeback",
				at: Date.now()
			}),
			notifs: pushNotif(s.notifs, {
				title: "Rakeback",
				body: "VIP-Anteil gutgeschrieben",
				at: Date.now()
			})
		});
		return due;
	},
	clearDrop: () => set({ drop: null }),
	tickJackpot: () => set((s) => ({ jackpot: s.jackpot + Math.floor(Math.random() * 18) + 4 })),
	placeSport: (legs, stake) => {
		const s = get();
		if (!legs.length || stake < 50) return {
			ok: false,
			reason: "Mindesteinsatz 0,50 €"
		};
		if (s.pausedUntil > Date.now()) return {
			ok: false,
			reason: "Pause aktiv"
		};
		if (!get().placeBet(stake, legs.length > 1 ? "Kombi" : "Sport")) return {
			ok: false,
			reason: "Einsatz nicht möglich"
		};
		const odds = Math.round(legs.reduce((a, l) => a * l.odds, 1) * 100) / 100;
		const ticket = {
			id: uid(),
			legs,
			stake,
			odds,
			status: "open",
			payout: 0,
			at: Date.now()
		};
		set((cur) => ({ sportTickets: [ticket, ...cur.sportTickets].slice(0, 40) }));
		return {
			ok: true,
			id: ticket.id
		};
	},
	settleSports: (now = Date.now()) => {
		const s = get();
		const events = sportBoard(now);
		let bal = s.balance;
		let tickets = s.sportTickets ?? [];
		let txs = s.transactions;
		let notifs = s.notifs;
		let wins = s.winsToday;
		let changed = false;
		tickets = tickets.map((t) => {
			if (t.status !== "open") return t;
			const st = ticketStatus(t, events, now);
			if (st === "open") return t;
			changed = true;
			if (st === "won") {
				const payout = Math.round(t.stake * t.odds);
				bal += payout;
				wins += 1;
				txs = pushTx(txs, {
					id: uid(),
					kind: "win",
					cents: payout,
					label: "Sport gewonnen",
					at: now
				});
				notifs = pushNotif(notifs, {
					title: "Wette gewonnen",
					body: t.legs[0]?.label ?? "Kombi",
					at: now
				});
				return {
					...t,
					status: "won",
					payout
				};
			}
			notifs = pushNotif(notifs, {
				title: "Wette verloren",
				body: t.legs[0]?.label ?? "Kombi",
				at: now
			});
			return {
				...t,
				status: "lost",
				payout: 0
			};
		});
		if (changed) set({
			balance: bal,
			sportTickets: tickets,
			transactions: txs,
			notifs,
			winsToday: wins
		});
	},
	cashoutSport: (id) => {
		const s = get();
		const t = s.sportTickets.find((x) => x.id === id);
		if (!t || t.status !== "open") return 0;
		const now = Date.now();
		const val = cashoutValue(t, sportBoard(now), now);
		if (val <= 0) return 0;
		set({
			balance: s.balance + val,
			sportTickets: s.sportTickets.map((x) => x.id === id ? {
				...x,
				status: "cashed",
				payout: val
			} : x),
			transactions: pushTx(s.transactions, {
				id: uid(),
				kind: "win",
				cents: val,
				label: "Cashout",
				at: now
			}),
			notifs: pushNotif(s.notifs, {
				title: "Cashout",
				body: t.legs[0]?.label ?? "Kombi",
				at: now
			})
		});
		return val;
	},
	setDayLimit: (cents) => set({ dayLimit: Math.max(0, cents) }),
	pausePlay: (hours) => set((s) => ({
		pausedUntil: Date.now() + Math.max(1, hours) * 36e5,
		notifs: pushNotif(s.notifs, {
			title: "Pause",
			body: `${hours} Stunden Spielpause`,
			at: Date.now()
		})
	})),
	markNotifsRead: () => set((s) => ({ notifs: s.notifs.map((n) => ({
		...n,
		read: true
	})) }))
}), {
	name: "aurelia-casino-v1",
	skipHydration: true,
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			hydrated: current.hydrated,
			cashierOpen: false,
			ageVerified: Boolean(current.ageVerified || p.ageVerified),
			starterClaimed: Boolean(current.starterClaimed || p.starterClaimed),
			welcomeUsed: Boolean(current.welcomeUsed || p.welcomeUsed),
			balance: Math.max(current.balance, p.balance ?? 0),
			bonusBalance: Math.max(current.bonusBalance, p.bonusBalance ?? 0),
			wagered: Math.max(current.wagered, p.wagered ?? 0),
			jackpot: Math.max(p.jackpot ?? 12846e4, JACKPOT_SEED / 2),
			tourneyBest: Math.max(current.tourneyBest, p.tourneyBest ?? 0),
			rakebackTaken: Math.max(current.rakebackTaken ?? 0, p.rakebackTaken ?? 0),
			sportTickets: p.sportTickets ?? current.sportTickets,
			dayLimit: p.dayLimit ?? current.dayLimit,
			pausedUntil: p.pausedUntil ?? 0,
			streak: Math.max(current.streak ?? 0, p.streak ?? 0),
			streakDay: p.streakDay ?? current.streakDay,
			notifs: (p.notifs ?? []).slice(0, 24),
			sessionStarted: current.sessionStarted || Date.now(),
			drop: null
		};
	},
	onRehydrateStorage: () => () => {
		useCasino.getState().markHydrated();
	},
	partialize: (s) => ({
		version: s.version,
		ageVerified: s.ageVerified,
		soundOn: s.soundOn,
		balance: s.balance,
		bonusBalance: s.bonusBalance,
		totalDeposited: s.totalDeposited,
		totalWithdrawn: s.totalWithdrawn,
		welcomeUsed: s.welcomeUsed,
		starterClaimed: s.starterClaimed,
		transactions: s.transactions,
		recent: s.recent,
		favorites: s.favorites,
		wagered: s.wagered,
		wageredToday: s.wageredToday,
		winsToday: s.winsToday,
		gamesToday: s.gamesToday,
		missionDay: s.missionDay,
		claimedMissions: s.claimedMissions,
		dailyClaimed: s.dailyClaimed,
		jackpot: s.jackpot,
		tourneyBest: s.tourneyBest,
		rakebackTaken: s.rakebackTaken,
		sportTickets: s.sportTickets,
		dayLimit: s.dayLimit,
		pausedUntil: s.pausedUntil,
		streak: s.streak,
		streakDay: s.streakDay,
		notifs: s.notifs
	})
}));
function rehydrateCasino() {
	const result = useCasino.persist.rehydrate();
	Promise.resolve(result).then(() => {
		useCasino.getState().markHydrated();
	});
}
//#endregion
export { formatOdds as a, sportBoard as c, comboOdds as i, sportClock as l, LEAGUE_TABS as n, pickLabel as o, cashoutValue as r, rehydrateCasino as s, Button as t, useCasino as u };
