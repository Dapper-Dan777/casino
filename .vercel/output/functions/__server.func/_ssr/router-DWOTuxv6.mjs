import { i as __toESM } from "../_runtime.mjs";
import { b as vipOf, c as formatEuro, d as gameHeat, i as SUPPORT_REPLIES, l as formatEuroCompact, m as playersOnline, p as parseEuroInput, r as MISSIONS, s as cn, u as formatTime } from "./operator-95DAgWDt.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as rehydrateCasino, t as Button, u as useCasino } from "./store-CFGtZ-Jy.mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Check, a as Volume2, d as MessageCircle, f as LoaderCircle, h as Heart, i as VolumeX, l as Play, n as X, o as TriangleAlert, p as Landmark, r as Wallet, s as Search, v as Bell } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audio-CEdbtmM2.js
var ctx = null;
var master = null;
var rumble = null;
var noiseBuf = null;
var bed = null;
function getCtx() {
	if (typeof window === "undefined") return null;
	try {
		if (!ctx) {
			const AC = window.AudioContext || window.webkitAudioContext;
			if (!AC) return null;
			ctx = new AC({ latencyHint: "interactive" });
			master = ctx.createGain();
			master.gain.value = .3;
			master.connect(ctx.destination);
		}
		return ctx;
	} catch {
		ctx = null;
		master = null;
		return null;
	}
}
function unlockAudio() {
	try {
		const c = getCtx();
		if (!c) return;
		if (c.state === "suspended") c.resume();
	} catch {}
}
function tone(freq, dur, type, gain = .18, slide, delay = 0) {
	try {
		const c = getCtx();
		if (!c || !master || c.state !== "running") return;
		const t0 = c.currentTime + delay;
		const osc = c.createOscillator();
		const g = c.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, t0);
		if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t0 + dur);
		g.gain.setValueAtTime(1e-4, t0);
		g.gain.exponentialRampToValueAtTime(gain, t0 + .012);
		g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
		osc.connect(g);
		g.connect(master);
		osc.start(t0);
		osc.stop(t0 + dur + .02);
		osc.onended = () => {
			osc.disconnect();
			g.disconnect();
		};
	} catch {}
}
function thud(freq, dur, gain = .16) {
	try {
		const c = getCtx();
		if (!c || !master || c.state !== "running") return;
		const osc = c.createOscillator();
		const g = c.createGain();
		const f = c.createBiquadFilter();
		osc.type = "triangle";
		osc.frequency.setValueAtTime(freq, c.currentTime);
		osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq * .45), c.currentTime + dur);
		f.type = "lowpass";
		f.frequency.setValueAtTime(900, c.currentTime);
		g.gain.setValueAtTime(gain, c.currentTime);
		g.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + dur);
		osc.connect(f);
		f.connect(g);
		g.connect(master);
		osc.start();
		osc.stop(c.currentTime + dur + .02);
		osc.onended = () => {
			osc.disconnect();
			f.disconnect();
			g.disconnect();
		};
	} catch {}
}
function getNoise() {
	const c = getCtx();
	if (!c) return null;
	if (noiseBuf) return noiseBuf;
	const buf = c.createBuffer(1, Math.floor(c.sampleRate * .35), c.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	noiseBuf = buf;
	return buf;
}
function startRumble() {
	stopRumble();
	try {
		const c = getCtx();
		const buf = getNoise();
		if (!c || !master || !buf || c.state !== "running") return;
		const src = c.createBufferSource();
		src.buffer = buf;
		src.loop = true;
		const filter = c.createBiquadFilter();
		filter.type = "bandpass";
		filter.frequency.value = 180;
		filter.Q.value = .7;
		const gain = c.createGain();
		gain.gain.value = 1e-4;
		gain.gain.exponentialRampToValueAtTime(.045, c.currentTime + .08);
		src.connect(filter);
		filter.connect(gain);
		gain.connect(master);
		src.start();
		rumble = {
			src,
			gain,
			filter
		};
	} catch {
		rumble = null;
	}
}
function stopRumble() {
	try {
		if (!rumble) return;
		const c = getCtx();
		if (c) rumble.gain.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + .06);
		const node = rumble;
		rumble = null;
		window.setTimeout(() => {
			try {
				node.src.stop();
				node.src.disconnect();
				node.filter.disconnect();
				node.gain.disconnect();
			} catch {}
		}, 80);
	} catch {
		rumble = null;
	}
}
function startBed(freq = 110) {
	stopBed();
	try {
		const c = getCtx();
		if (!c || !master || c.state !== "running") return;
		const gain = c.createGain();
		gain.gain.value = 1e-4;
		gain.gain.exponentialRampToValueAtTime(.028, c.currentTime + .4);
		const oscs = [];
		[
			freq,
			freq * 1.505,
			freq * 2.02
		].forEach((f, i) => {
			const o = c.createOscillator();
			o.type = i === 0 ? "sine" : "triangle";
			o.frequency.value = f;
			o.connect(gain);
			o.start();
			oscs.push(o);
		});
		gain.connect(master);
		bed = {
			oscs,
			gain
		};
	} catch {
		bed = null;
	}
}
function stopBed() {
	try {
		if (!bed) return;
		const c = getCtx();
		const node = bed;
		bed = null;
		if (c) node.gain.gain.exponentialRampToValueAtTime(1e-4, c.currentTime + .25);
		window.setTimeout(() => {
			node.oscs.forEach((o) => {
				try {
					o.stop();
					o.disconnect();
				} catch {}
			});
			try {
				node.gain.disconnect();
			} catch {}
		}, 280);
	} catch {
		bed = null;
	}
}
var sfx = {
	click() {
		tone(420, .05, "square", .07);
	},
	chip() {
		tone(880, .07, "triangle", .1);
		tone(1320, .05, "sine", .05, void 0, .03);
	},
	deal() {
		tone(240, .08, "triangle", .08, 180);
	},
	tick() {
		tone(700 + Math.random() * 80, .03, "square", .04);
	},
	coin() {
		tone(1240 + Math.random() * 180, .05, "square", .05);
		tone(1860, .07, "sine", .04, void 0, .02);
	},
	stop(reel = 2) {
		const f = 190 + reel * 28;
		thud(f, .11, .14);
		tone(f * 2.2, .05, "square", .04);
	},
	win(big = false) {
		if (big) {
			tone(523, .18, "triangle", .14);
			tone(659, .18, "triangle", .14, void 0, .09);
			tone(784, .32, "triangle", .16, void 0, .18);
			tone(1046, .4, "sine", .12, void 0, .28);
		} else {
			tone(660, .12, "triangle", .12);
			tone(880, .18, "sine", .1, void 0, .07);
		}
	},
	fanfare(tier) {
		if (tier === "nice") {
			this.win(false);
			return;
		}
		(tier === "epic" ? [
			392,
			523,
			659,
			784,
			1046,
			1318
		] : tier === "mega" ? [
			392,
			523,
			659,
			784,
			988
		] : [
			440,
			554,
			659,
			880
		]).forEach((n, i) => {
			tone(n, .22 + i * .04, i % 2 ? "sine" : "triangle", .11 + i * .01, void 0, i * .11);
		});
		thud(90, .28, .12);
	},
	lose() {
		tone(220, .2, "sawtooth", .06, 110);
	},
	spin() {
		tone(180, .12, "square", .06, 90);
		thud(140, .14, .08);
	},
	cash() {
		tone(988, .1, "sine", .1);
		tone(1318, .16, "sine", .12, void 0, .08);
	},
	scatter() {
		tone(740, .12, "triangle", .12);
		tone(988, .16, "sine", .1, void 0, .06);
		tone(1174, .2, "sine", .08, void 0, .12);
	},
	anticipate() {
		tone(320, 1.15, "sawtooth", .045, 920);
		tone(160, 1.15, "triangle", .04, 480);
	},
	tumble() {
		tone(240, .1, "square", .07, 90);
		thud(110, .12, .1);
	},
	explode() {
		thud(80, .16, .14);
		tone(640, .08, "square", .05, 180);
	},
	bonus() {
		tone(392, .16, "triangle", .12);
		tone(523, .16, "triangle", .12, void 0, .1);
		tone(659, .22, "sine", .14, void 0, .2);
		tone(784, .36, "sine", .12, void 0, .32);
		thud(70, .3, .14);
	},
	wheel() {
		tone(220, 1.8, "sawtooth", .05, 880);
	},
	gambleWin() {
		tone(880, .1, "square", .1);
		tone(1320, .16, "triangle", .12, void 0, .08);
		thud(140, .12, .1);
	},
	gambleLose() {
		tone(180, .28, "sawtooth", .08, 70);
	},
	leiterHi() {
		tone(980, .07, "square", .07);
		tone(1480, .05, "sine", .04, void 0, .02);
	},
	leiterZero() {
		thud(90, .09, .12);
		tone(210, .08, "square", .05);
	},
	expand() {
		tone(180, .22, "sawtooth", .07, 520);
		tone(420, .28, "triangle", .1, 880, .08);
		thud(70, .22, .12);
	}
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-OyO83_EL.js
var GAMES = [
	{
		slug: "sport",
		name: "Wettstudio",
		tagline: "1. Liga · Live · Kombi · Cashout",
		kind: "sport",
		volatility: "Mittel",
		rtp: "94,5 %",
		badge: "Live",
		image: "/games/sport.jpg",
		featured: true,
		family: "studio"
	},
	{
		slug: "sicbo",
		name: "Sic Bo",
		tagline: "3 Würfel · Klein/Groß · Triple 180:1",
		kind: "table",
		volatility: "Hoch",
		rtp: "97,2 %",
		badge: "Live",
		image: "/games/sicbo.jpg",
		family: "live"
	},
	{
		slug: "videopoker",
		name: "Video Poker",
		tagline: "Jacks or Better · Royal 800×",
		kind: "original",
		volatility: "Mittel",
		rtp: "99,5 %",
		badge: "Klassiker",
		image: "/games/videopoker.jpg",
		family: "studio"
	},
	{
		slug: "wegeflut",
		name: "Wegeflut",
		tagline: "6 Walzen · 2–7 hoch · bis 117.649 Wege",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,2 %",
		badge: "Neu",
		image: "/games/wegeflut.jpg",
		featured: true,
		family: "pragmatic"
	},
	{
		slug: "schatzzug",
		name: "Schatzzug",
		tagline: "Hold & Collect · Sammler · 3 Nachdreher",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,1 %",
		badge: "Hot",
		image: "/games/schatzzug.jpg",
		featured: true,
		family: "studio"
	},
	{
		slug: "olymp-tor",
		name: "Olymp-Tor",
		tagline: "6×5 · 8+ überall · Orbs bis ×500",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,5 %",
		badge: "Neu",
		image: "/games/olymp-tor.jpg",
		featured: true,
		family: "pragmatic"
	},
	{
		slug: "bonbon-regen",
		name: "Bonbon-Regen",
		tagline: "6×5 · Tumble · Bomben bis ×500",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,5 %",
		badge: "Hot",
		image: "/games/bonbon-regen.jpg",
		family: "pragmatic"
	},
	{
		slug: "goldwolf",
		name: "Goldwolf",
		tagline: "Hold & Win · 6 Münzen · 3 Nachdreher",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,1 %",
		badge: "Neu",
		image: "/games/goldwolf.jpg",
		family: "studio"
	},
	{
		slug: "raubfisch",
		name: "Raubfisch",
		tagline: "Angler sammelt Fische · 10 Freispiele",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,2 %",
		badge: "Hot",
		image: "/games/raubfisch.jpg",
		family: "pragmatic"
	},
	{
		slug: "bienenrausch",
		name: "Bienenrausch",
		tagline: "7×7 Cluster · Tumble ab 5",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,4 %",
		badge: "Neu",
		image: "/games/bienenrausch.jpg",
		family: "studio"
	},
	{
		slug: "sternenblitz",
		name: "Sternenblitz",
		tagline: "Beide Richtungen · Expanding Wild · Nachdrehen",
		kind: "slot",
		volatility: "Niedrig",
		rtp: "96,1 %",
		badge: "Klassiker",
		image: "/games/sternenblitz.jpg",
		family: "studio"
	},
	{
		slug: "huff-und-puff",
		name: "Huff und Puff",
		tagline: "2× Säge · Mini Minor Major Grand",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,2 %",
		badge: "Hot",
		image: "/games/huff-und-puff.jpg",
		family: "studio"
	},
	{
		slug: "pharaos-erbe",
		name: "Pharaos Erbe",
		tagline: "10 Freispiele · Expanding zahlt mit Lücken",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,1 %",
		badge: "Beliebt",
		image: "/games/pharaos-erbe.jpg",
		family: "studio"
	},
	{
		slug: "neon-drift",
		name: "Neon Drift",
		tagline: "243 Wege · Tumble · Multiplikator",
		kind: "slot",
		volatility: "Mittel",
		rtp: "96,5 %",
		badge: "Neu",
		image: "/games/neon-drift.jpg",
		family: "pragmatic"
	},
	{
		slug: "drachenfeuer",
		name: "Drachenfeuer",
		tagline: "Fire Link · Mini Minor Major Grand",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,0 %",
		image: "/games/drachenfeuer.jpg",
		family: "studio"
	},
	{
		slug: "nordlicht",
		name: "Nordlicht",
		tagline: "Frozen Wilds · ×3 im Bonus",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,1 %",
		image: "/games/nordlicht.jpg",
		family: "studio"
	},
	{
		slug: "kirschkoenig",
		name: "Kirschkönig",
		tagline: "Risiko Rot/Schwarz · 2× Kirschen",
		kind: "slot",
		volatility: "Niedrig",
		rtp: "97,0 %",
		image: "/games/kirschkoenig.jpg",
		family: "studio"
	},
	{
		slug: "saphirnacht",
		name: "Saphirnacht",
		tagline: "Tresor · Expanding Gems",
		kind: "slot",
		volatility: "Mittel",
		rtp: "96,4 %",
		image: "/games/saphirnacht.jpg",
		family: "studio"
	},
	{
		slug: "flammenstern",
		name: "Flammenstern",
		tagline: "5 Linien · 2er zählt · Gewinnleiter",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,3 %",
		badge: "Merkur",
		image: "/games/flammenstern.jpg",
		family: "merkur"
	},
	{
		slug: "extra-safe",
		name: "Extra Safe",
		tagline: "Wild ×2 ×3 ×7 · beide Richtungen",
		kind: "slot",
		volatility: "Mittel",
		rtp: "94,3 %",
		badge: "Merkur",
		image: "/games/extra-safe.jpg",
		family: "merkur"
	},
	{
		slug: "zauberspiegel",
		name: "Zauberspiegel",
		tagline: "Expanding zahlt mit Lücken · Risiko",
		kind: "slot",
		volatility: "Hoch",
		rtp: "94,1 %",
		badge: "Merkur",
		image: "/games/zauberspiegel.jpg",
		family: "merkur"
	},
	{
		slug: "multi-wild",
		name: "Multi Wild",
		tagline: "243 Wege · gestapelte Wilds",
		kind: "slot",
		volatility: "Mittel",
		rtp: "96,0 %",
		badge: "Merkur",
		image: "/games/multi-wild.jpg",
		family: "merkur"
	},
	{
		slug: "triple-chance",
		name: "Triple Chance",
		tagline: "3 Walzen · Halten · Leiter",
		kind: "slot",
		volatility: "Niedrig",
		rtp: "97,1 %",
		badge: "Klassiker",
		image: "/games/triple-chance.jpg",
		family: "merkur"
	},
	{
		slug: "heisse-fruechte",
		name: "Heiße Früchte",
		tagline: "5 Linien · 2 Kirschen · 5000× Sieben",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,1 %",
		badge: "Merkur",
		image: "/games/heisse-fruechte.jpg",
		family: "merkur"
	},
	{
		slug: "gluecksklee",
		name: "Glücksklee",
		tagline: "Klee-Wild · 15 Freispiele · Risiko",
		kind: "slot",
		volatility: "Mittel",
		rtp: "95,1 %",
		badge: "Merkur",
		image: "/games/gluecksklee.jpg",
		family: "merkur"
	},
	{
		slug: "immer-heiss",
		name: "Immer Heiß",
		tagline: "5 Linien immer an · Stern bis 5000×",
		kind: "slot",
		volatility: "Hoch",
		rtp: "96,1 %",
		badge: "Merkur",
		image: "/games/immer-heiss.jpg",
		family: "merkur"
	},
	{
		slug: "nur-juwelen",
		name: "Nur Juwelen",
		tagline: "5 Edelsteine · Diamant ab 2 · Leiter",
		kind: "slot",
		volatility: "Mittel",
		rtp: "96,0 %",
		badge: "Merkur",
		image: "/games/nur-juwelen.jpg",
		family: "merkur"
	},
	{
		slug: "plinko",
		name: "Plinko",
		tagline: "12 Peg-Reihen · mehrere Bälle",
		kind: "original",
		volatility: "Mittel",
		rtp: "96,6 %",
		badge: "Original",
		image: "/games/plinko.jpg",
		family: "studio"
	},
	{
		slug: "minen",
		name: "Minen",
		tagline: "5×5 · Cashout",
		kind: "original",
		volatility: "Hoch",
		rtp: "97,0 %",
		badge: "Original",
		image: "/games/minen.jpg",
		family: "studio"
	},
	{
		slug: "lift",
		name: "Lift",
		tagline: "Multiplier · Cashout vor dem Crash",
		kind: "original",
		volatility: "Hoch",
		rtp: "97,0 %",
		badge: "Original",
		image: "/games/lift.jpg",
		family: "studio"
	},
	{
		slug: "gluecksrad",
		name: "Glücksrad",
		tagline: "Live Show · bis 40× · Bonusfelder",
		kind: "original",
		volatility: "Hoch",
		rtp: "96,0 %",
		badge: "Live",
		image: "/games/gluecksrad.jpg",
		family: "live"
	},
	{
		slug: "keno",
		name: "Keno",
		tagline: "80 Zahlen · 20 Kugeln",
		kind: "original",
		volatility: "Mittel",
		rtp: "96,4 %",
		image: "/games/keno.jpg",
		family: "studio"
	},
	{
		slug: "wuerfel",
		name: "Würfel",
		tagline: "Über / Unter · 99 % Auszahlung",
		kind: "original",
		volatility: "Mittel",
		rtp: "99,0 %",
		badge: "Original",
		image: "/games/wuerfel.jpg",
		family: "studio"
	},
	{
		slug: "schwelle",
		name: "Schwelle",
		tagline: "Ziel-Multi · sofort",
		kind: "original",
		volatility: "Hoch",
		rtp: "99,0 %",
		badge: "Original",
		image: "/games/schwelle.jpg",
		family: "studio"
	},
	{
		slug: "rubbellos",
		name: "Rubbellos",
		tagline: "3 gleiche Felder · Instant",
		kind: "original",
		volatility: "Hoch",
		rtp: "96,5 %",
		badge: "Neu",
		image: "/games/rubbellos.jpg",
		family: "studio"
	},
	{
		slug: "drache-tiger",
		name: "Drache & Tiger",
		tagline: "Eine Karte · 8:1 Unentschieden",
		kind: "table",
		table: "baccarat",
		volatility: "Niedrig",
		rtp: "96,3 %",
		badge: "Live",
		image: "/games/drache-tiger.jpg",
		family: "live"
	},
	{
		slug: "blitz-roulette",
		name: "Blitz-Roulette",
		tagline: "Lucky Numbers bis 500×",
		kind: "table",
		table: "roulette",
		volatility: "Hoch",
		rtp: "95,8 %",
		badge: "Live",
		image: "/games/blitz-roulette.jpg",
		family: "live"
	},
	{
		slug: "blackjack",
		name: "Blackjack",
		tagline: "6 Decks · 3:2 · Europäisch",
		kind: "table",
		table: "blackjack",
		volatility: "Niedrig",
		rtp: "99,4 %",
		badge: "Klassiker",
		image: "/games/blackjack.jpg"
	},
	{
		slug: "roulette",
		name: "Roulette",
		tagline: "Europäisch · Einzel-Null",
		kind: "table",
		table: "roulette",
		volatility: "Mittel",
		rtp: "97,3 %",
		image: "/games/roulette.jpg"
	},
	{
		slug: "baccarat",
		name: "Baccarat",
		tagline: "Punto Banco · Commission",
		kind: "table",
		table: "baccarat",
		volatility: "Niedrig",
		rtp: "98,9 %",
		image: "/games/baccarat.jpg"
	}
];
function gameBySlug(slug) {
	return GAMES.find((g) => g.slug === slug);
}
var DEPOSIT_PRESETS = [
	1e3,
	2e3,
	5e3,
	1e4,
	25e3,
	5e4,
	1e5
];
var PAYMENT_METHODS = [
	{
		id: "visa",
		label: "Visa",
		kind: "card"
	},
	{
		id: "mastercard",
		label: "Mastercard",
		kind: "card"
	},
	{
		id: "paypal",
		label: "PayPal",
		kind: "wallet"
	},
	{
		id: "klarna",
		label: "Klarna",
		kind: "wallet"
	},
	{
		id: "sofort",
		label: "Sofort",
		kind: "wallet"
	},
	{
		id: "applepay",
		label: "Apple Pay",
		kind: "wallet"
	},
	{
		id: "crypto",
		label: "Krypto",
		kind: "crypto"
	}
];
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DWOTuxv6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "Ein unerwarteter Fehler ist aufgetreten. Bitte Seite neu laden.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error, reset }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-loss",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Spiel unterbrochen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap justify-center gap-2",
				children: [reset ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: reset,
					className: "h-11 rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wider text-accent-fg",
					children: "Nochmal versuchen"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-flex h-11 items-center rounded-md border border-accent/30 px-5 text-sm uppercase tracking-wider text-fg",
					children: "Zur Lobby"
				})]
			})
		]
	});
}
var GameErrorComponent = AppErrorComponent;
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Header() {
	const balance = useCasino((s) => s.balance);
	const jackpot = useCasino((s) => s.jackpot);
	const wagered = useCasino((s) => s.wagered);
	const rank = vipOf(wagered);
	const setCashierOpen = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const toggleSound = useCasino((s) => s.toggleSound);
	const notifs = useCasino((s) => s.notifs);
	const markNotifsRead = useCasino((s) => s.markNotifsRead);
	const [sec, setSec] = (0, import_react.useState)(0);
	const [bell, setBell] = (0, import_react.useState)(false);
	const [online, setOnline] = (0, import_react.useState)(null);
	const unread = notifs.filter((n) => !n.read).length;
	(0, import_react.useEffect)(() => {
		const t0 = Date.now();
		setOnline(playersOnline(t0));
		const id = window.setInterval(() => {
			const t = Date.now();
			setSec(Math.floor((t - t0) / 1e3));
			setOnline(playersOnline(t));
		}, 1e3);
		return () => window.clearInterval(id);
	}, []);
	const mm = String(Math.floor(sec / 60)).padStart(2, "0");
	const ss = String(sec % 60).padStart(2, "0");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex min-w-0 items-baseline gap-2",
					onClick: () => unlockAudio(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl tracking-tight text-fg sm:text-[1.75rem]",
						children: "Aurelia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs uppercase tracking-[0.22em] text-accent sm:inline",
						children: "Network"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "ml-4 hidden items-center gap-1 lg:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/",
							children: "Lobby"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sport",
							className: "rounded-md px-3 py-2 text-sm text-muted hover:text-fg",
							onClick: () => unlockAudio(),
							children: "Sport"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/live",
							children: "Live"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/aktionen",
							children: "Aktionen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/vip",
							children: "VIP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/#hits",
							children: "Hits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							href: "/#merkur",
							children: "Halle"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [
						online != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden text-[10px] uppercase tracking-wider text-muted xl:block",
							children: [online.toLocaleString("de-DE"), " online"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/aktionen",
							className: "hidden rounded-md px-2 py-1 text-right lg:block",
							onClick: () => unlockAudio(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted",
								children: "Netzwerk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm tabular-nums text-[#e8c85a]",
								children: formatEuro(jackpot)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/vip",
							className: "hidden rounded-md border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted sm:inline",
							children: [
								"VIP ",
								rank.name,
								" · ",
								mm,
								":",
								ss
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-label": "Nachrichten",
								className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg",
								onClick: () => {
									setBell((b) => !b);
									markNotifsRead();
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute right-1 top-1 size-2 rounded-full bg-loss" }) : null]
							}), bell ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-0 top-12 z-50 w-64 rounded-lg border border-border bg-surface p-3 shadow-2xl",
								children: notifs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "Keine Nachrichten"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 text-sm",
									children: notifs.slice(0, 6).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-fg",
										children: n.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: n.body
									})] }, n.id))
								})
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/konto",
							className: "hidden rounded-md px-2 py-2 text-sm text-muted hover:text-fg sm:inline",
							onClick: () => unlockAudio(),
							children: "Konto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": soundOn ? "Ton aus" : "Ton an",
							className: "hidden size-11 items-center justify-center rounded-md text-muted hover:text-fg sm:inline-flex",
							onClick: () => {
								unlockAudio();
								toggleSound();
							},
							children: soundOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								unlockAudio();
								setCashierOpen(true);
							},
							className: "flex h-11 items-center gap-2 rounded-md border border-accent/25 bg-elevated px-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm text-fg",
								children: formatEuro(balance)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							className: "hidden sm:inline-flex",
							onClick: () => {
								unlockAudio();
								if (soundOn) sfx.click();
								setCashierOpen(true);
							},
							children: "Einzahlen"
						})
					]
				})
			]
		})
	});
}
function NavLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: "rounded-md px-3 py-2 text-sm text-muted hover:text-fg",
		onClick: () => unlockAudio(),
		children
	});
}
var AGE_FLAG$1 = "aurelia-18";
function AgeGate({ onPassed }) {
	const verifyAge = useCasino((s) => s.verifyAge);
	const grantStarter = useCasino((s) => s.grantStarter);
	const once = (0, import_react.useRef)(false);
	function confirm() {
		if (once.current) return;
		once.current = true;
		onPassed();
		verifyAge();
		grantStarter();
		try {
			sessionStorage.setItem(AGE_FLAG$1, "1");
		} catch {}
		unlockAudio();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-auto fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-bg px-5 pb-32 pt-20",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "age-title",
		onPointerDown: confirm,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 neon-mesh opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 w-full max-w-md rounded-xl border border-accent/30 bg-surface p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.32em] text-accent",
					children: "Aurelia Network"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					id: "age-title",
					className: "mt-3 font-display text-4xl text-fg",
					children: "18+ Democasino"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm leading-relaxed text-muted",
					children: "Nur für Personen ab 18 Jahren. Einsätze in Euro, ausschließlich Spielgeld — keine echten Zahlungen, keine Auszahlungen auf Bankkonten."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "relative z-10 flex h-14 w-full items-center justify-center rounded-md bg-accent text-base font-semibold uppercase tracking-wider text-accent-fg",
						style: { touchAction: "manipulation" },
						onPointerDown: (e) => {
							e.stopPropagation();
							confirm();
						},
						onClick: (e) => {
							e.stopPropagation();
							confirm();
						},
						children: "Ich bin 18 oder älter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-subtle",
						children: "Tippe irgendwo, um fortzufahren. Verantwortungsvoll spielen."
					})]
				})
			]
		})]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/80 data-[state=open]:animate-in data-[state=closed]:animate-out", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed left-1/2 top-1/2 z-50 w-[min(100%-1.5rem,440px)] -translate-x-1/2 -translate-y-1/2", "rounded-xl border border-border bg-surface p-6 shadow-2xl", "max-h-[min(92dvh,720px)] overflow-y-auto", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 size-11 inline-flex items-center justify-center rounded-md text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Schließen"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mb-5 space-y-1 pr-8", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl font-medium text-fg", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg tabular-nums placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-11 items-center gap-1 rounded-lg bg-elevated p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-muted", "data-[state=active]:bg-surface data-[state=active]:text-fg", "focus-visible:outline-none", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("mt-4 outline-none", className),
		...props
	});
}
function CashierDialog() {
	const open = useCasino((s) => s.cashierOpen);
	const setOpen = useCasino((s) => s.setCashierOpen);
	const deposit = useCasino((s) => s.deposit);
	const withdraw = useCasino((s) => s.withdraw);
	const balance = useCasino((s) => s.balance);
	const txs = useCasino((s) => s.transactions);
	const soundOn = useCasino((s) => s.soundOn);
	const [tab, setTab] = (0, import_react.useState)("einzahlung");
	const [amount, setAmount] = (0, import_react.useState)(1e4);
	const [custom, setCustom] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("visa");
	const [cardName, setCardName] = (0, import_react.useState)("A. Müller");
	const [cardNumber, setCardNumber] = (0, import_react.useState)("4242 4242 4242 4242");
	const [expiry, setExpiry] = (0, import_react.useState)("12/28");
	const [cvv, setCvv] = (0, import_react.useState)("123");
	const [iban, setIban] = (0, import_react.useState)("DE89 3704 0044 0532 0130 00");
	const [bonus, setBonus] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)("form");
	const [error, setError] = (0, import_react.useState)(null);
	const [lastBonus, setLastBonus] = (0, import_react.useState)(0);
	const [lastAmount, setLastAmount] = (0, import_react.useState)(0);
	const selected = (0, import_react.useMemo)(() => {
		const parsed = parseEuroInput(custom);
		return parsed && parsed > 0 ? parsed : amount;
	}, [custom, amount]);
	function reset() {
		setStep("form");
		setError(null);
		setLastBonus(0);
	}
	function processDeposit() {
		unlockAudio();
		setError(null);
		if (selected < 1e3) {
			setError("Mindesteinzahlung 10,00 €");
			return;
		}
		setStep("processing");
		window.setTimeout(() => {
			const res = deposit(selected, method, bonus);
			if (!res.ok) {
				setError(res.reason);
				setStep("form");
				return;
			}
			setLastAmount(selected);
			setLastBonus(res.bonus);
			if (soundOn) sfx.cash();
			setStep("done");
		}, 1400);
	}
	function processWithdraw() {
		unlockAudio();
		setError(null);
		setStep("processing");
		window.setTimeout(() => {
			const res = withdraw(selected);
			if (!res.ok) {
				setError(res.reason);
				setStep("form");
				return;
			}
			setLastAmount(selected);
			if (soundOn) sfx.cash();
			setStep("done");
		}, 1200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			setOpen(v);
			if (!v) reset();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Kasse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Spielgeld in Euro. Keine echte Zahlung wird ausgeführt." })] }), step === "processing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 py-10 text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-8 animate-spin text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: tab === "auszahlung" ? "Auszahlung wird vorbereitet…" : "Zahlung wird autorisiert…"
			})]
		}) : step === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3 py-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 items-center justify-center rounded-full bg-win/15 text-win",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl tabular-nums text-fg",
					children: formatEuro(lastAmount)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: tab === "auszahlung" ? "Auszahlung gutgeschrieben (Spielgeld)." : "Einzahlung gutgeschrieben."
				}),
				lastBonus > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-win",
					children: ["Willkommensbonus ", formatEuro(lastBonus)]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => setOpen(false),
					children: "Weiter spielen"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: (v) => {
				setTab(v);
				setError(null);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "einzahlung",
							className: "flex-1",
							children: "Einzahlung"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "auszahlung",
							className: "flex-1",
							children: "Auszahlung"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "verlauf",
							className: "flex-1",
							children: "Verlauf"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "einzahlung",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs uppercase tracking-wider text-subtle",
							children: "Betrag"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-2",
							children: DEPOSIT_PRESETS.map((cents) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setAmount(cents);
									setCustom("");
									if (soundOn) sfx.click();
								},
								className: cn("h-11 rounded-md border text-sm tabular-nums", amount === cents && !custom ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated text-fg hover:border-accent/40"),
								children: formatEuro(cents).replace(",00", "")
							}, cents))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								placeholder: "Eigener Betrag",
								value: custom,
								onChange: (e) => setCustom(e.target.value),
								"aria-label": "Eigener Betrag"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 mt-5 text-xs uppercase tracking-wider text-subtle",
							children: "Zahlungsart"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: PAYMENT_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMethod(m.id),
								className: cn("h-11 rounded-md border px-3 text-left text-sm", method === m.id ? "border-accent bg-elevated text-fg" : "border-border bg-bg text-muted hover:text-fg"),
								children: m.label
							}, m.id))
						}),
						PAYMENT_METHODS.find((m) => m.id === method)?.kind === "card" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "col-span-2",
									value: cardName,
									onChange: (e) => setCardName(e.target.value),
									"aria-label": "Karteninhaber"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "col-span-2",
									value: cardNumber,
									onChange: (e) => setCardNumber(e.target.value),
									"aria-label": "Kartennummer",
									inputMode: "numeric"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: expiry,
									onChange: (e) => setExpiry(e.target.value),
									"aria-label": "Ablauf"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cvv,
									onChange: (e) => setCvv(e.target.value),
									"aria-label": "Prüfnummer",
									inputMode: "numeric"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Bonuscode (WELCOME)",
								value: bonus,
								onChange: (e) => setBonus(e.target.value),
								"aria-label": "Bonuscode"
							})
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-loss",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-5 w-full",
							size: "lg",
							onClick: processDeposit,
							children: [formatEuro(selected), " einzahlen"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-center text-xs text-subtle",
							children: [
								"Guthaben: ",
								formatEuro(balance),
								" · Demo, keine Bankbuchung"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "auszahlung",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-2 text-xs uppercase tracking-wider text-subtle",
							children: ["Betrag · Guthaben ", formatEuro(balance)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [
								2e3,
								5e3,
								1e4,
								25e3,
								5e4,
								balance
							].filter((v, i, a) => v > 0 && a.indexOf(v) === i).map((cents) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setAmount(cents);
									setCustom("");
								},
								className: cn("h-11 rounded-md border text-sm tabular-nums", amount === cents && !custom ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated text-fg"),
								children: cents === balance ? "Alles" : formatEuro(cents).replace(",00", "")
							}, cents))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								placeholder: "Eigener Betrag",
								value: custom,
								onChange: (e) => setCustom(e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs uppercase tracking-wider text-subtle",
								children: "IBAN (Demo)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "pl-9",
									value: iban,
									onChange: (e) => setIban(e.target.value)
								})]
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-loss",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-5 w-full",
							size: "lg",
							variant: "secondary",
							onClick: processWithdraw,
							children: [formatEuro(selected), " auszahlen"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "verlauf",
					children: txs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-8 text-center text-sm text-muted",
						children: "Noch keine Bewegungen."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "max-h-72 space-y-2 overflow-y-auto",
						children: txs.slice(0, 30).map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between rounded-md bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: tx.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-subtle",
								children: formatTime(tx.at)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("text-sm tabular-nums", tx.kind === "bet" || tx.kind === "withdraw" ? "text-loss" : "text-win"),
								children: [tx.kind === "bet" || tx.kind === "withdraw" ? "−" : "+", formatEuro(tx.cents)]
							})]
						}, tx.id))
					})
				})
			]
		})] })
	});
}
function SupportDock() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [log, setLog] = (0, import_react.useState)([{
		who: "desk",
		text: "Aurelia Desk · Nur Spielgeld. Wobei können wir helfen?"
	}]);
	function ask(q, a) {
		setLog((l) => [
			...l,
			{
				who: "you",
				text: q
			},
			{
				who: "desk",
				text: a
			}
		]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-16 right-3 z-40 sm:bottom-8 sm:right-5",
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 w-[min(100vw-1.5rem,20rem)] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.22em] text-accent",
						children: "Desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Schließen",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 text-muted" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-64 space-y-2 overflow-y-auto p-3 text-sm",
					children: log.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("rounded-md px-2 py-1", m.who === "desk" ? "bg-elevated text-fg" : "bg-accent/15 text-fg"),
						children: m.text
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1 border-t border-border p-2",
					children: SUPPORT_REPLIES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-8 rounded-md bg-elevated px-2 text-xs text-muted hover:text-fg",
						onClick: () => ask(r.q, r.a),
						children: r.q
					}, r.q))
				})
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Support",
			onClick: () => setOpen((o) => !o),
			className: "ml-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-5" })
		})]
	});
}
function Badge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border border-border bg-elevated px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted", className),
		...props
	});
}
var CITIES = [
	"Berlin",
	"Hamburg",
	"München",
	"Köln",
	"Frankfurt",
	"Stuttgart",
	"Düsseldorf",
	"Leipzig"
];
var INITIALS = [
	"M.",
	"A.",
	"S.",
	"L.",
	"K.",
	"T.",
	"J.",
	"N.",
	"F.",
	"H."
];
var PROMO = GAMES.filter((g) => g.featured || g.family === "pragmatic" || g.badge === "Hot" || g.badge === "Beliebt").slice(0, 5);
function Lobby() {
	const setCashier = useCasino((s) => s.setCashierOpen);
	const balance = useCasino((s) => s.balance);
	const recent = useCasino((s) => s.recent);
	const favorites = useCasino((s) => s.favorites);
	const storeJackpot = useCasino((s) => s.jackpot);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [slide, setSlide] = (0, import_react.useState)(0);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setSlide((s) => (s + 1) % Math.max(1, PROMO.length)), 5600);
		return () => window.clearInterval(id);
	}, []);
	const games = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return GAMES.filter((g) => {
			if (filter !== "all" && g.kind !== filter) return false;
			if (!needle) return true;
			return `${g.name} ${g.tagline} ${g.family ?? ""}`.toLowerCase().includes(needle);
		});
	}, [filter, q]);
	const featured = PROMO[slide] ?? GAMES[0];
	const merkur = GAMES.filter((g) => g.family === "merkur");
	const pragmatic = GAMES.filter((g) => g.family === "pragmatic");
	const studio = GAMES.filter((g) => g.family === "studio" && g.kind === "slot");
	const live = GAMES.filter((g) => g.family === "live" || g.badge === "Live");
	const tables = GAMES.filter((g) => g.kind === "table" && g.family !== "live");
	const neu = GAMES.filter((g) => g.badge === "Neu");
	const instants = GAMES.filter((g) => [
		"wuerfel",
		"schwelle",
		"rubbellos",
		"plinko",
		"minen",
		"lift",
		"keno",
		"videopoker"
	].includes(g.slug));
	const sports = GAMES.filter((g) => g.kind === "sport");
	const slots = GAMES.filter((g) => g.kind === "slot" && !g.family);
	const recentGames = recent.map((s) => GAMES.find((g) => g.slug === s)).filter((g) => Boolean(g));
	const favGames = favorites.map((s) => GAMES.find((g) => g.slug === s)).filter((g) => Boolean(g));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-xl border border-border bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: featured.image,
						alt: "",
						className: "absolute inset-0 h-full w-full object-cover opacity-50"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/20" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.32em] text-accent",
								children: "Tagesjackpot · Live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 font-display text-4xl tabular-nums text-fg sm:text-5xl",
								children: formatEuro(storeJackpot)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[11px] uppercase tracking-[0.28em] text-muted",
								children: featured.badge ?? "Hit"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-4xl text-fg sm:text-5xl",
								children: featured.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 max-w-md text-sm text-muted",
								children: [
									featured.tagline,
									" · RTP ",
									featured.rtp
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [featured.kind === "sport" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/sport",
										onClick: () => unlockAudio(),
										children: "Jetzt spielen"
									})
								}) : featured.kind === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/tisch/$slug",
										params: { slug: featured.slug },
										onClick: () => unlockAudio(),
										children: "Jetzt spielen"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/spiel/$slug",
										params: { slug: featured.slug },
										onClick: () => unlockAudio(),
										children: "Jetzt spielen"
									})
								}), balance < 1e3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "secondary",
									size: "lg",
									onClick: () => setCashier(true),
									children: "Guthaben aufladen"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 flex gap-2",
								children: PROMO.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": g.name,
									onClick: () => setSlide(i),
									className: cn("h-1.5 w-8 rounded-full", i === slide ? "bg-accent" : "bg-fg/20")
								}, g.slug))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveWins, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorStrip, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Lobby"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "search",
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Spiel suchen",
							className: "h-11 w-44 rounded-md border border-border bg-elevated pl-9 pr-3 text-sm text-fg placeholder:text-subtle sm:w-56"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-lg bg-elevated p-1",
						children: [
							["all", "Alle"],
							["sport", "Sport"],
							["original", "Originals"],
							["slot", "Slots"],
							["table", "Tische"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter(id),
							className: cn("h-9 rounded-md px-3 text-sm", filter === id ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
							children: label
						}, id))
					})]
				})]
			}), q.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: games.length ? games.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game }, game.slug)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "col-span-full text-sm text-muted",
					children: [
						"Kein Treffer für „",
						q.trim(),
						"“."
					]
				})
			}) : filter === "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-10",
				children: [
					favGames.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "favoriten",
						title: "Favoriten",
						games: favGames
					}) : null,
					recentGames.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "zuletzt",
						title: "Zuletzt gespielt",
						games: recentGames
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "sport",
						title: "Sport",
						games: sports
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "neu",
						title: "Neu",
						games: neu
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "hits",
						title: "Hits",
						games: pragmatic
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "live",
						title: "Live",
						games: live
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "studio",
						title: "Studio",
						games: studio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "merkur",
						title: "Halle · Merkur-Art",
						games: merkur
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "originals",
						title: "Originals",
						games: instants
					}),
					slots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "slots",
						title: "Weitere Slots",
						games: slots
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameRail, {
						id: "tische",
						title: "Tische",
						games: tables
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: "slots",
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
				children: games.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game }, game.slug))
			})] })
		]
	});
}
function OperatorStrip() {
	const wagered = useCasino((s) => s.wagered);
	const jackpot = useCasino((s) => s.jackpot);
	const dailyClaimed = useCasino((s) => s.dailyClaimed);
	const claimDaily = useCasino((s) => s.claimDaily);
	const rank = vipOf(wagered);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/vip",
				className: "rounded-lg border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-muted",
					children: "Club"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-xl",
					children: ["VIP ", rank.name]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/sport",
				className: "rounded-lg border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-muted",
					children: "Wetten"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl",
					children: "Sport"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/live",
				className: "rounded-lg border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-muted",
					children: "Studio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl",
					children: "Live-Tische"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/aktionen",
				className: "rounded-lg border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-muted",
					children: "Netzwerk-Jackpot"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl tabular-nums text-[#e8c85a]",
					children: formatEuro(jackpot)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wider text-muted",
					children: "Tagesbonus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: MISSIONS[3]?.hint
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: dailyClaimed,
					onClick: () => claimDaily(),
					className: "h-10 rounded-md bg-accent px-3 text-xs font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40",
					children: dailyClaimed ? "Da" : "2,00 €"
				})]
			})
		]
	});
}
function GameRail({ id, title, games }) {
	if (!games.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mb-3 font-display text-2xl",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3 overflow-x-auto pb-2",
			children: games.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-[10.5rem] shrink-0 sm:w-48",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game })
			}, game.slug))
		})]
	});
}
function GameCard({ game }) {
	const favorites = useCasino((s) => s.favorites);
	const toggleFavorite = useCasino((s) => s.toggleFavorite);
	const loved = favorites.includes(game.slug);
	const [heat, setHeat] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setHeat(gameHeat(game.slug));
		const id = window.setInterval(() => setHeat(gameHeat(game.slug)), 5e3);
		return () => window.clearInterval(id);
	}, [game.slug]);
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-[3/4] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: game.image,
				alt: "",
				className: "h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" }),
			game.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: "absolute left-2 top-2 border-accent/40 bg-bg/80 text-accent",
				children: game.badge
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-6 fill-current" })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg leading-tight text-fg",
					children: game.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-[11px] uppercase tracking-wider text-muted",
					children: [
						game.kind === "sport" ? "Sport" : game.family === "merkur" ? "Halle" : game.family === "pragmatic" ? "Hits" : game.family === "live" ? "Live" : game.kind === "table" ? "Tisch" : game.kind === "original" ? "Original" : "Slot",
						" · ",
						game.volatility,
						heat != null ? ` · ${heat}` : ""
					]
				})]
			})
		]
	});
	const cls = cn("group overflow-hidden border bg-surface transition-shadow duration-200", game.family === "merkur" ? "rounded-sm border-[#c9a227]/45 hover:border-[#e8c85a] hover:shadow-[0_0_24px_rgb(201_162_39_/_0.28)]" : game.family === "pragmatic" || game.family === "live" ? "rounded-lg border-[#8a4ad4]/40 hover:border-[#c9a0ff] hover:shadow-[0_0_24px_rgb(138_74_212_/_0.35)]" : game.kind === "table" ? "rounded-lg border-felt-line/30 hover:border-felt-line/60 hover:shadow-[0_0_24px_rgb(13_58_50_/_0.45)]" : game.kind === "original" ? "rounded-xl border-accent/30 hover:border-accent/60 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_22%,transparent)]" : "rounded-lg border-border hover:border-accent/50 hover:shadow-[0_0_24px_color-mix(in_oklab,var(--color-accent)_22%,transparent)]");
	const heart = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": loved ? "Favorit entfernen" : "Als Favorit merken",
		className: "absolute right-2 top-2 z-10 inline-flex size-10 items-center justify-center rounded-full bg-bg/70 text-fg hover:text-accent",
		onClick: (e) => {
			e.preventDefault();
			e.stopPropagation();
			toggleFavorite(game.slug);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", loved && "fill-accent text-accent") })
	});
	if (game.kind === "sport") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/sport",
			className: cls,
			onClick: () => unlockAudio(),
			children: inner
		}), heart]
	});
	if (game.kind === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: game.family === "live" ? "/spiel/$slug" : "/tisch/$slug",
			params: { slug: game.slug },
			className: cls,
			onClick: () => unlockAudio(),
			children: inner
		}), heart]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/spiel/$slug",
			params: { slug: game.slug },
			className: cls,
			onClick: () => unlockAudio(),
			children: inner
		}), heart]
	});
}
function LiveWins() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setItems(makeWins(4));
		const id = window.setInterval(() => {
			setItems((prev) => [makeWin(), ...prev].slice(0, 5));
		}, 3800);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-bg/80 p-4 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-[0.22em] text-subtle",
			children: "Letzte Gewinne"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: items.length === 0 ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { className: "h-5 rounded-sm bg-elevated" }, i)) : items.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-center justify-between gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "truncate text-muted",
					children: [
						w.who,
						" · ",
						w.game
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-win",
					children: formatEuroCompact(w.cents)
				})]
			}, w.id))
		})]
	});
}
function makeWin() {
	const game = GAMES[Math.floor(Math.random() * GAMES.length)];
	return {
		id: `${Date.now()}-${Math.random()}`,
		who: `${INITIALS[Math.floor(Math.random() * INITIALS.length)]} aus ${CITIES[Math.floor(Math.random() * CITIES.length)]}`,
		game: game.name,
		cents: [
			1800,
			4200,
			9600,
			15400,
			28e3,
			76e3
		][Math.floor(Math.random() * 6)]
	};
}
function makeWins(n) {
	return Array.from({ length: n }, makeWin);
}
function WinTicker() {
	const [items, setItems] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setItems(makeWins(8));
		const id = window.setInterval(() => {
			setItems((prev) => [...prev.slice(-10), makeWin()]);
		}, 3200);
		return () => window.clearInterval(id);
	}, []);
	if (!items.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "win-ticker",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "win-ticker-track",
			children: items.concat(items).map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "win-ticker-item",
				children: [
					w.who,
					" gewinnt ",
					formatEuroCompact(w.cents),
					" in ",
					w.game
				]
			}, `${w.id}-${i}`))
		})
	});
}
var AGE_FLAG = "aurelia-18";
function CasinoShell({ children }) {
	const ageVerified = useCasino((s) => s.ageVerified);
	const drop = useCasino((s) => s.drop);
	const clearDrop = useCasino((s) => s.clearDrop);
	const tickJackpot = useCasino((s) => s.tickJackpot);
	const settleSports = useCasino((s) => s.settleSports);
	const pausedUntil = useCasino((s) => s.pausedUntil);
	const [passed, setPassed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			if (sessionStorage.getItem(AGE_FLAG) === "1") setPassed(true);
		} catch {}
		rehydrateCasino();
	}, []);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			if (document.visibilityState === "visible") unlockAudio();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			tickJackpot();
			settleSports();
		}, 900);
		return () => window.clearInterval(id);
	}, [tickJackpot, settleSports]);
	(0, import_react.useEffect)(() => {
		if (!drop) return;
		const t = window.setTimeout(() => clearDrop(), 4200);
		return () => window.clearTimeout(t);
	}, [drop, clearDrop]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 neon-mesh opacity-50" }),
			!ageVerified && !passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeGate, { onPassed: () => setPassed(true) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			pausedUntil > Date.now() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 border-b border-loss/40 bg-loss/15 px-4 py-2 text-center text-sm",
				children: [
					"Pause aktiv bis ",
					formatTime(pausedUntil),
					" · unter Konto aufheben durch Ablauf"
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8",
				children
			}),
			drop ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed bottom-14 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#e8c85a]/50 bg-surface px-5 py-3 text-center shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.22em] text-[#e8c85a]",
					children: "Prize Drop"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tabular-nums",
					children: formatEuro(drop.cents)
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinTicker, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportDock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative border-t border-border px-4 py-8 text-xs text-subtle",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg text-fg",
						children: "Aurelia Network"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Nur Spielgeld · 18+ · Keine Echtgeldzahlungen · Session nur zur Demo"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-wrap gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sport",
								className: "hover:text-fg",
								children: "Sport"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/live",
								className: "hover:text-fg",
								children: "Live"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/vip",
								className: "hover:text-fg",
								children: "VIP"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/konto",
								className: "hover:text-fg",
								children: "Konto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/konto#schutz",
								className: "hover:text-fg",
								children: "Spielerschutz"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashierDialog, {})
		]
	});
}
var styles_default = "/assets/styles-B2Y0ztPb.css";
var APP_NAME = "Aurelia";
var Route$8 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0a0b0c"
			},
			{
				name: "description",
				content: "Aurelia — Spielgeld-Casino und Wettstudio. Slots, Live, Sport, Originals. Nur Demo, kein Echtgeld."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "de",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasinoShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	})
});
var $$splitComponentImporter$7 = () => import("./routes-CvrZkmTI.mjs");
var Route$7 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./aktionen-D4AI3ovI.mjs");
var Route$6 = createFileRoute("/aktionen")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./konto-DQxaJMbb.mjs");
var Route$5 = createFileRoute("/konto")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./live-ZCz_8lvT.mjs");
var Route$4 = createFileRoute("/live")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./sport-7O1svX44.mjs");
var Route$3 = createFileRoute("/sport")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./vip-Bs0KNoOz.mjs");
var Route$2 = createFileRoute("/vip")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitErrorComponentImporter$1 = () => import("./spiel._slug-BezGopVt.mjs");
var $$splitComponentImporter$1 = () => import("./spiel._slug-k84U0i59.mjs");
var Route$1 = createFileRoute("/spiel/$slug")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
var $$splitErrorComponentImporter = () => import("./tisch._slug-5UmOY93D.mjs");
var $$splitComponentImporter = () => import("./tisch._slug-DsrT5p4z.mjs");
var Route = createFileRoute("/tisch/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	AktionenRoute: Route$6.update({
		id: "/aktionen",
		path: "/aktionen",
		getParentRoute: () => Route$8
	}),
	KontoRoute: Route$5.update({
		id: "/konto",
		path: "/konto",
		getParentRoute: () => Route$8
	}),
	LiveRoute: Route$4.update({
		id: "/live",
		path: "/live",
		getParentRoute: () => Route$8
	}),
	SportRoute: Route$3.update({
		id: "/sport",
		path: "/sport",
		getParentRoute: () => Route$8
	}),
	VipRoute: Route$2.update({
		id: "/vip",
		path: "/vip",
		getParentRoute: () => Route$8
	}),
	SpielSlugRoute: Route$1.update({
		id: "/spiel/$slug",
		path: "/spiel/$slug",
		getParentRoute: () => Route$8
	}),
	TischSlugRoute: Route.update({
		id: "/tisch/$slug",
		path: "/tisch/$slug",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Dialog as a, GameErrorComponent as c, startBed as d, startRumble as f, unlockAudio as h, Lobby as i, gameBySlug as l, stopRumble as m, Route as n, DialogContent as o, stopBed as p, Route$1 as r, DialogTitle as s, router_exports as t, sfx as u };
