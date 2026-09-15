import { o as __toESM } from "../_runtime.mjs";
import { c as formatEuro, t as cn } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as useCasino } from "./button-D768MRou.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChevronLeft, c as Plus, h as Info, t as Zap, u as Minus } from "../_libs/lucide-react.mjs";
import { _ as stopBed, a as Dialog, g as startRumble, h as startBed, m as sfx, o as DialogContent, p as gameBySlug, r as Route$2, s as DialogTitle, v as stopRumble, y as unlockAudio } from "./router-D35HOleb.mjs";
import { t as NeedBankroll } from "./NeedBankroll-bIUrzrIg.mjs";
import { C as weightedPick, S as shoe, _ as limboResult, a as ORIGINAL_STEPS, b as randInt, c as RANKS, d as SUITS, f as SicBoView, g as limboPay, h as isRed$1, i as DragonTigerView, l as ResultBar, m as fisherYates, n as BetBar, o as OriginalShell, p as dicePay, r as BlackjackView, s as PlayingCardFace, t as BaccaratView, u as RouletteView, v as makeCard, x as rollDice, y as makeScratch } from "./BaccaratView-CCfkyZGD.mjs";
import { t as SportView } from "./SportView-CAVVtlr3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spiel._slug-Be45kO4f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLOT_THEMES = {
	"pharaos-erbe": {
		skin: "egypt",
		kicker: "Book of Ra",
		reel: "sand"
	},
	nordlicht: {
		skin: "nordic",
		kicker: "Frozen Reels",
		reel: "ice",
		leftFilter: "saturate(0.85) hue-rotate(200deg)",
		rightFilter: "saturate(0.85) hue-rotate(200deg)"
	},
	kirschkoenig: {
		skin: "fruit",
		kicker: "Risiko · Classic",
		reel: "photo"
	},
	saphirnacht: {
		skin: "gem",
		kicker: "Jewel Rush",
		reel: "navy"
	},
	"huff-und-puff": {
		skin: "huff",
		kicker: "Jackpot Wheel",
		reel: "sand"
	},
	"neon-drift": {
		skin: "neon",
		kicker: "Cyber Ways",
		reel: "neon",
		leftFilter: "hue-rotate(155deg) saturate(1.45)",
		rightFilter: "hue-rotate(155deg) saturate(1.45)"
	},
	drachenfeuer: {
		skin: "dragon",
		kicker: "Fire Link",
		reel: "ember",
		leftFilter: "hue-rotate(-18deg) saturate(1.35)",
		rightFilter: "sepia(0.35) saturate(1.4)"
	},
	flammenstern: {
		skin: "blaze",
		kicker: "5 Linien · Leiter",
		reel: "black"
	},
	"extra-safe": {
		skin: "extra",
		kicker: "Wild-Multi · Extra",
		reel: "velvet"
	},
	zauberspiegel: {
		skin: "mirror",
		kicker: "Expanding Mirror",
		reel: "glass"
	},
	"multi-wild": {
		skin: "multi",
		kicker: "Stacked Wilds",
		reel: "ruby"
	},
	"triple-chance": {
		skin: "chance",
		kicker: "Hold & Chance",
		reel: "hold"
	},
	"heisse-fruechte": {
		skin: "sizzle",
		kicker: "5 Linien · Classic",
		reel: "cream"
	},
	gluecksklee: {
		skin: "lucky",
		kicker: "Klee · 15 Freispiele",
		reel: "moss"
	},
	"olymp-tor": {
		skin: "olymp",
		kicker: "6×5 · 8+ überall",
		reel: "olymp"
	},
	"bonbon-regen": {
		skin: "candy",
		kicker: "6×5 · Bomben",
		reel: "candy"
	},
	sternenblitz: {
		skin: "burst",
		kicker: "Wilds dehnen sich · Nachdrehen",
		reel: "burst"
	},
	goldwolf: {
		skin: "wolf",
		kicker: "Hold & Win · 6 Münzen",
		reel: "wolf"
	},
	raubfisch: {
		skin: "fish",
		kicker: "Angler sammelt Fische",
		reel: "deep"
	},
	wegeflut: {
		skin: "mega",
		kicker: "Megaways · Tumble",
		reel: "jade"
	},
	schatzzug: {
		skin: "train",
		kicker: "Hold & Collect",
		reel: "train"
	},
	"immer-heiss": {
		skin: "always",
		kicker: "5 Linien immer an · Stern",
		reel: "always"
	},
	"nur-juwelen": {
		skin: "jewel",
		kicker: "5 Juwelen · 5 Linien",
		reel: "jewel"
	}
};
var CONTAIN_REELS = /* @__PURE__ */ new Set([
	"cream",
	"black",
	"hold",
	"always"
]);
function SymbolFace({ symbol, win, variant = "photo" }) {
	const contain = CONTAIN_REELS.has(variant);
	if (symbol.id === "orb") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OlympOrb, {
		value: symbol.wildMult ?? 2,
		win
	});
	if (symbol.art) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative h-full w-full overflow-hidden reel-tile", `reel-tile-${variant}`, win && "slot-win", !win && !contain && (symbol.kind === "scatter" || symbol.kind === "wild") && "ring-1 ring-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_70%,transparent)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: symbol.art,
			alt: symbol.label,
			className: cn("h-full w-full", contain ? "object-contain" : "object-cover")
		}), win ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 slot-win-flash" }) : null]
	});
	const special = symbol.kind === "wild" || symbol.kind === "scatter";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex h-full w-full flex-col items-center justify-center reel-tile px-0.5", `reel-tile-${variant}`, win && "slot-win", !win && special && "border border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_70%,transparent)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glyph, {
			id: symbol.id,
			kind: symbol.kind
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("mt-0.5 max-w-full truncate text-[8px] font-medium uppercase tracking-wider sm:text-[9px]", special ? "text-[var(--slot-line,var(--color-accent))]" : "text-muted"),
			children: symbol.label
		})]
	});
}
function orbTone(v) {
	if (v >= 250) return "myth";
	if (v >= 50) return "gold";
	if (v >= 15) return "fire";
	if (v >= 8) return "sea";
	return "leaf";
}
function OlympOrb({ value, win, size = "cell" }) {
	const tone = orbTone(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("olymp-orb", `olymp-orb-${tone}`, size === "hud" && "is-hud", win && "slot-win"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: cn("olymp-orb-val", value >= 100 && "is-long"),
			children: ["×", value]
		})
	});
}
function Glyph({ id, kind }) {
	const stroke = kind === "wild" || kind === "scatter" ? "var(--slot-line, var(--color-accent))" : "var(--color-fg)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 48 48",
		className: "size-10 sm:size-11",
		"aria-hidden": true,
		children: id === "wild" || id === "star" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M24 5 l5 13.2 14 .4-11.2 8.4 4.1 13.4L24 32.6 13.1 40.4l4.1-13.4L6 18.6l14-.4z",
			fill: stroke
		}) : id === "scatter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "8",
			width: "24",
			height: "32",
			rx: "2",
			fill: "none",
			stroke,
			strokeWidth: "2.2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16 16 h16 M16 22 h12 M16 28 h14",
			stroke,
			strokeWidth: "2"
		})] }) : id === "j" || id === "q" || id === "k" || id === "a" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "24",
			y: "33",
			textAnchor: "middle",
			fontSize: "24",
			fill: stroke,
			fontFamily: "Georgia, serif",
			children: id.toUpperCase()
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "24",
			cy: "24",
			r: "11",
			fill: "none",
			stroke,
			strokeWidth: "2.3"
		})
	});
}
var REEL_STOP_MS = [
	1200,
	1650,
	2100,
	2600,
	3200
];
var REEL_TURBO_MS = [
	380,
	520,
	660,
	800,
	960
];
var REEL_STOP_MERKUR = [
	640,
	880,
	1120,
	1360,
	1600
];
var REEL_STOP_PRAG = [
	1400,
	1850,
	2350,
	2900,
	3500
];
var REEL_STOP_HOLD = [
	900,
	1250,
	1650,
	2100,
	2600
];
var REEL_STOP_BURST = [
	800,
	1100,
	1450,
	1850,
	2400
];
function ReelBank({ reels, spinKey, busy, winCells, expanded, anticipate, overlay, vanish, frozen, variant = "photo", size = "md", rows = 3 }) {
	const classic = CONTAIN_REELS.has(variant);
	const tall = size === "lg";
	const five = rows === 5;
	const cellH = five ? "h-[16.25rem] [--cell:3.25rem] sm:h-[21.25rem] sm:[--cell:4.25rem]" : tall ? "h-[18rem] [--cell:6rem] sm:h-[22.5rem] sm:[--cell:7.5rem]" : "h-[15rem] [--cell:5rem] sm:h-[18.75rem] sm:[--cell:6.25rem]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative grid overflow-hidden slot-reel-bank", `reel-bank-${variant}`),
			style: { gridTemplateColumns: `repeat(${reels.length}, minmax(0, 1fr))` },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("pointer-events-none absolute inset-x-1 top-1/2 z-20 h-px -translate-y-1/2 opacity-60", five && "hidden", classic ? "bg-[var(--slot-line,#e8c85a)]" : "bg-[var(--slot-line,var(--color-accent))]") }), reels.map((reel, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative overflow-hidden reel-col", cellH, expanded?.includes(ri) && "slot-expand", anticipate && ri === reels.length - 1 && "slot-anticipate"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 top-0 will-change-transform",
					style: {
						["--dist"]: reel.offset,
						transform: `translate3d(0, calc(var(--cell) * ${-reel.offset}), 0)`,
						animation: reel.spinning ? `slot-reel-run ${reel.settleMs}ms linear forwards` : void 0
					},
					children: reel.strip.map((sym, si) => {
						const row = si - reel.offset;
						const key = `${ri}-${row}`;
						const vis = row >= 0 && row < rows;
						const win = !busy && vis && winCells.has(key);
						const gone = Boolean(vanish && vis && vanish.has(key));
						const ice = Boolean(frozen && vis && frozen.has(key));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[var(--cell)] p-px",
							"data-row": vis ? row : void 0,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("relative h-full", gone && "slot-explode", ice && "slot-ice"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolFace, {
									symbol: sym,
									win: win && !gone,
									variant
								}), vis ? overlay?.(ri, row) : null]
							})
						}, `${ri}-${si}-${sym.id}-${si}`);
					})
				}, `${spinKey}-${ri}`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 slot-reel-mask" })]
			}, ri))]
		}), classic || five ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-8 top-1/2 z-10 h-px -translate-y-1/2 bg-[var(--slot-line,#2ee6c5)] opacity-70" })]
	});
}
/** Merkur-style 5-line map (Blazing Star / Fancy Fruits). */
var FIVE_LINES = [
	[
		1,
		1,
		1,
		1,
		1
	],
	[
		0,
		0,
		0,
		0,
		0
	],
	[
		2,
		2,
		2,
		2,
		2
	],
	[
		0,
		1,
		2,
		1,
		0
	],
	[
		2,
		1,
		0,
		1,
		2
	]
];
/** 3-reel Triple Chance lines. */
var THREE_LINES = [
	[
		1,
		1,
		1
	],
	[
		0,
		0,
		0
	],
	[
		2,
		2,
		2
	],
	[
		0,
		1,
		2
	],
	[
		2,
		1,
		0
	]
];
/** Hall ladder blink: slow at the bottom, only a little quicker up top. */
function leiterBounceMs(step) {
	return Math.max(480, 640 - Math.max(0, step - 1) * 28);
}
var WILD_MULTS = [
	2,
	3,
	7
];
/** Compact LED amount with always-on cents, like hall 7-segment modules. */
function formatLed(cents) {
	return (cents / 100).toLocaleString("de-DE", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
/** Unlit 7-segment ghost matching the digit layout. */
function ledGhost(value) {
	return value.replace(/\d/g, "8");
}
var OLYMP_ANTE = 1.25;
var ORBS = [
	{
		v: 2,
		weight: 280
	},
	{
		v: 3,
		weight: 220
	},
	{
		v: 4,
		weight: 160
	},
	{
		v: 5,
		weight: 120
	},
	{
		v: 6,
		weight: 80
	},
	{
		v: 8,
		weight: 50
	},
	{
		v: 10,
		weight: 40
	},
	{
		v: 12,
		weight: 20
	},
	{
		v: 15,
		weight: 15
	},
	{
		v: 20,
		weight: 10
	},
	{
		v: 25,
		weight: 8
	},
	{
		v: 50,
		weight: 4
	},
	{
		v: 100,
		weight: 2
	},
	{
		v: 250,
		weight: 1
	},
	{
		v: 500,
		weight: 1
	}
];
function pickOrb() {
	return weightedPick(ORBS).v;
}
function makeOrb(mult) {
	return {
		id: "orb",
		label: `×${mult}`,
		kind: "high",
		weight: 0,
		pays: [
			0,
			0,
			0
		],
		wildMult: mult
	};
}
function isOrb(s) {
	return s.id === "orb";
}
function isPaySym(s) {
	return s.kind !== "scatter" && s.id !== "orb";
}
var tile$1 = (id) => `/games/sym/olymp-${id}.jpg`;
function sym(id, label, kind, weight, pays) {
	return {
		id,
		label,
		kind,
		weight,
		pays,
		art: tile$1(id)
	};
}
var OLYMP_SYMBOLS = [
	sym("blue", "Saphir", "low", 16, [
		.25,
		.75,
		2
	]),
	sym("green", "Smaragd", "low", 14, [
		.4,
		.9,
		4
	]),
	sym("yellow", "Topas", "low", 12, [
		.5,
		1,
		5
	]),
	sym("purple", "Amethyst", "mid", 10, [
		.8,
		1.2,
		8
	]),
	sym("red", "Rubin", "mid", 9, [
		1,
		1.5,
		10
	]),
	sym("goblet", "Kelch", "mid", 7, [
		1.5,
		2,
		12
	]),
	{
		id: "ring",
		label: "Ring",
		kind: "high",
		weight: 6,
		pays: [
			2,
			5,
			15
		],
		art: tile$1("ring")
	},
	{
		id: "hourglass",
		label: "Uhr",
		kind: "high",
		weight: 5,
		pays: [
			2.5,
			10,
			25
		],
		art: tile$1("hourglass")
	},
	{
		id: "crown",
		label: "Krone",
		kind: "high",
		weight: 4,
		pays: [
			10,
			25,
			50
		],
		art: tile$1("crown")
	},
	{
		id: "zeus",
		label: "Gott",
		kind: "scatter",
		weight: 3,
		pays: [
			3,
			5,
			100
		],
		art: tile$1("zeus")
	}
];
var OLYMP_KIT = {
	symbols: OLYMP_SYMBOLS,
	orbBase: .046,
	orbFs: .11,
	fsCount: 15,
	retrigger: 5,
	forceId: "crown",
	maxX: 5e3
};
var OLYMP_DEF = {
	slug: "olymp-tor",
	reels: 6,
	rows: 5,
	paylines: [],
	symbols: OLYMP_SYMBOLS,
	betSteps: [
		20,
		40,
		80,
		100,
		200,
		400,
		1e3,
		2e3,
		5e3
	],
	defaultBet: 100,
	freeSpinsFrom: 4,
	freeSpinCount: 15,
	fsMultiplier: 1,
	pityAfter: 14,
	mechanic: "olympus",
	tumble: true
};
var OLYMP_PACK = {
	slug: "olymp-tor",
	name: "Olymp-Tor",
	kicker: "6×5 · 8+ überall",
	hint: "8 gleiche Symbole zahlen überall · Orbs addieren sich",
	bg: "/games/olymp-tor.jpg",
	statue: "/games/char-olymp.jpg",
	skin: "olymp",
	variant: "olymp",
	bed: 98,
	def: OLYMP_DEF,
	buy: 100,
	kit: OLYMP_KIT,
	scatterName: "Gott"
};
function costOf(bet, ante) {
	return ante ? Math.round(bet * OLYMP_ANTE) : bet;
}
function pickCell(kit, ante, fs) {
	if (Math.random() < (fs ? kit.orbFs : kit.orbBase)) return makeOrb(pickOrb());
	const pool = kit.symbols.map((s) => s.kind === "scatter" ? {
		...s,
		weight: s.weight * (ante ? 2 : 1)
	} : s);
	return weightedPick(pool);
}
function spinPays(kit, ante, fs, force = null) {
	const grid = [];
	for (let r = 0; r < 6; r++) {
		const col = [];
		for (let row = 0; row < 5; row++) col.push(pickCell(kit, ante, fs));
		grid.push(col);
	}
	if (force === "fs") {
		const scatter = kit.symbols.find((s) => s.kind === "scatter");
		for (let i = 0; i < 4; i++) grid[i % 6][randInt(5)] = scatter;
	} else if (force === "win") {
		const high = kit.symbols.find((s) => s.id === kit.forceId) ?? kit.symbols[0];
		let n = 0;
		for (let r = 0; r < 6 && n < 8; r++) for (let row = 0; row < 5 && n < 8; row++) if (isPaySym(grid[r][row])) {
			grid[r][row] = high;
			n += 1;
		}
	}
	return grid;
}
function orbTotal(grid) {
	let s = 0;
	for (const col of grid) for (const c of col) if (isOrb(c)) s += c.wildMult ?? 0;
	return s;
}
function band(count) {
	if (count >= 12) return 2;
	if (count >= 10) return 1;
	if (count >= 8) return 0;
	return -1;
}
function evaluatePays(kit, grid, stake, inFs) {
	const groups = /* @__PURE__ */ new Map();
	const scatterCells = [];
	grid.forEach((col, reel) => col.forEach((symbol, row) => {
		if (symbol.kind === "scatter") scatterCells.push({
			symbol,
			reel,
			row
		});
		else if (isPaySym(symbol)) {
			const g = groups.get(symbol.id) ?? {
				symbol,
				cells: []
			};
			g.cells.push({
				symbol,
				reel,
				row
			});
			groups.set(symbol.id, g);
		}
	}));
	const lineWins = [];
	for (const g of groups.values()) {
		const b = band(g.cells.length);
		if (b === -1) continue;
		const pay = g.symbol.pays[b];
		if (pay <= 0) continue;
		lineWins.push({
			line: 0,
			symbol: g.symbol,
			count: g.cells.length,
			cells: g.cells,
			payout: Math.round(stake * pay),
			ways: g.cells.length
		});
	}
	const scatterCount = scatterCells.length;
	let scatterPayout = 0;
	let freeSpinsAwarded = 0;
	if (!inFs && scatterCount >= 4) {
		scatterPayout = Math.round(stake * (scatterCount >= 6 ? 100 : scatterCount === 5 ? 5 : 3));
		freeSpinsAwarded = kit.fsCount;
	} else if (inFs && scatterCount >= 3) freeSpinsAwarded = kit.retrigger;
	const totalPayout = lineWins.reduce((s, w) => s + w.payout, 0) + scatterPayout;
	return {
		grid,
		lineWins,
		scatterCount,
		scatterPayout,
		totalPayout,
		freeSpinsAwarded,
		expandedReels: []
	};
}
function dropPays(kit, grid, vanish, ante, fs) {
	return grid.map((col, r) => {
		const kept = [];
		for (let row = 0; row < 5; row++) if (!vanish.has(`${r}-${row}`)) kept.push(col[row]);
		return [...Array.from({ length: 5 - kept.length }, () => pickCell(kit, ante, fs)), ...kept];
	});
}
function olympWinKeys(result) {
	const set = /* @__PURE__ */ new Set();
	result.lineWins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
	return set;
}
function capWin(cents, stake, maxX = 5e3) {
	return Math.min(cents, stake * maxX);
}
var tile = (id) => `/games/sym/bonbon-${id}.jpg`;
function candy(id, label, kind, weight, pays) {
	return {
		id,
		label,
		kind,
		weight,
		pays,
		art: tile(id)
	};
}
/** Sweet Bonanza-style table: 8–9 / 10–11 / 12+ of total bet. */
var BONBON_SYMBOLS = [
	candy("blue", "Blau", "low", 16, [
		.25,
		.75,
		2
	]),
	candy("green", "Grün", "low", 14, [
		.4,
		.9,
		4
	]),
	candy("purple", "Lila", "low", 12, [
		.5,
		1,
		5
	]),
	candy("heart", "Herz", "mid", 10, [
		.8,
		1.2,
		8
	]),
	candy("red", "Erdbeer", "mid", 9, [
		1,
		1.5,
		10
	]),
	candy("banana", "Banane", "mid", 7, [
		1.5,
		2,
		12
	]),
	candy("melon", "Melone", "high", 6, [
		2,
		5,
		15
	]),
	candy("grapes", "Trauben", "high", 5, [
		2.5,
		10,
		25
	]),
	candy("apple", "Apfel", "high", 4, [
		10,
		25,
		50
	]),
	candy("lolly", "Lolly", "scatter", 3, [
		3,
		5,
		100
	])
];
var BONBON_KIT = {
	symbols: BONBON_SYMBOLS,
	orbBase: .05,
	orbFs: .13,
	fsCount: 12,
	retrigger: 5,
	forceId: "apple",
	maxX: 21100
};
var BONBON_DEF = {
	...OLYMP_DEF,
	slug: "bonbon-regen",
	symbols: BONBON_SYMBOLS,
	freeSpinCount: 12,
	pityAfter: 12
};
var BONBON_PACK = {
	slug: "bonbon-regen",
	name: "Bonbon-Regen",
	kicker: "6×5 · Tumble · Bomben",
	hint: "8 gleiche Bonbons zahlen überall · Bomben 2×–500×",
	bg: "/games/bonbon-regen.jpg",
	skin: "candy",
	variant: "candy",
	bed: 132,
	def: BONBON_DEF,
	buy: 100,
	kit: BONBON_KIT,
	scatterName: "Lolly"
};
var FISH_VALUES = {
	silver: 2,
	bass: 8,
	gold: 20
};
var FISH_DEF = {
	slug: "raubfisch",
	reels: 5,
	rows: 3,
	paylines: [
		[
			1,
			1,
			1,
			1,
			1
		],
		[
			0,
			0,
			0,
			0,
			0
		],
		[
			2,
			2,
			2,
			2,
			2
		],
		[
			0,
			1,
			2,
			1,
			0
		],
		[
			2,
			1,
			0,
			1,
			2
		],
		[
			0,
			0,
			1,
			2,
			2
		],
		[
			2,
			2,
			1,
			0,
			0
		],
		[
			1,
			0,
			0,
			0,
			1
		],
		[
			1,
			2,
			2,
			2,
			1
		],
		[
			0,
			1,
			1,
			1,
			0
		]
	],
	symbols: [
		{
			id: "j",
			label: "J",
			kind: "low",
			weight: 12,
			pays: [
				.4,
				1.5,
				6
			],
			art: "/games/sym/fish-j.jpg"
		},
		{
			id: "q",
			label: "Q",
			kind: "low",
			weight: 12,
			pays: [
				.4,
				1.5,
				6
			],
			art: "/games/sym/fish-q.jpg"
		},
		{
			id: "k",
			label: "K",
			kind: "low",
			weight: 10,
			pays: [
				.6,
				2,
				8
			],
			art: "/games/sym/fish-k.jpg"
		},
		{
			id: "a",
			label: "A",
			kind: "low",
			weight: 10,
			pays: [
				.6,
				2,
				8
			],
			art: "/games/sym/fish-a.jpg"
		},
		{
			id: "silver",
			label: "Silber",
			kind: "mid",
			weight: 8,
			pays: [
				1,
				4,
				12
			],
			art: "/games/sym/fish-silver.jpg"
		},
		{
			id: "bass",
			label: "Barsch",
			kind: "high",
			weight: 5,
			pays: [
				2,
				8,
				25
			],
			art: "/games/sym/fish-bass.jpg"
		},
		{
			id: "gold",
			label: "Karpfen",
			kind: "high",
			weight: 3,
			pays: [
				4,
				16,
				50
			],
			art: "/games/sym/fish-gold.jpg"
		},
		{
			id: "wild",
			label: "Angler",
			kind: "wild",
			weight: 3,
			pays: [
				5,
				20,
				80
			],
			art: "/games/sym/fish-angler.jpg"
		},
		{
			id: "scatter",
			label: "Kiste",
			kind: "scatter",
			weight: 3,
			pays: [
				2,
				10,
				50
			],
			art: "/games/sym/fish-box.jpg"
		}
	],
	betSteps: [
		20,
		50,
		100,
		200,
		500,
		1e3,
		2500
	],
	defaultBet: 100,
	freeSpinsFrom: 3,
	freeSpinCount: 10,
	fsMultiplier: 1,
	pityAfter: 12,
	mechanic: "sticky"
};
function collectFish(grid, stake) {
	let fishPay = 0;
	let fish = 0;
	let wilds = 0;
	for (const col of grid) for (const s of col) {
		if (s.kind === "wild") wilds += 1;
		const v = FISH_VALUES[s.id];
		if (v) {
			fish += 1;
			fishPay += Math.round(stake * v);
		}
	}
	return {
		cash: wilds > 0 ? fishPay * wilds : 0,
		fish,
		wilds
	};
}
var TEN_LINES = [
	[
		1,
		1,
		1,
		1,
		1
	],
	[
		0,
		0,
		0,
		0,
		0
	],
	[
		2,
		2,
		2,
		2,
		2
	],
	[
		0,
		1,
		2,
		1,
		0
	],
	[
		2,
		1,
		0,
		1,
		2
	],
	[
		0,
		0,
		1,
		2,
		2
	],
	[
		2,
		2,
		1,
		0,
		0
	],
	[
		1,
		0,
		0,
		0,
		1
	],
	[
		1,
		2,
		2,
		2,
		1
	],
	[
		0,
		1,
		1,
		1,
		0
	]
];
function ranks(theme) {
	const prefix = theme === "fruit" ? "fruit" : theme === "blaze" ? "blaze" : theme === "multi" ? "multi" : theme === "chance" ? "chance" : theme === "sizzle" ? "sizzle" : theme === "gem" ? "gem" : theme === "lucky" ? "lucky" : theme === "nordic" ? "nordic" : theme === "huff" ? "huff" : theme === "neon" ? "neon" : theme === "dragon" ? "dragon" : theme === "mirror" ? "mirror" : "egypt";
	const tile = (id) => `/games/sym/${prefix}-${id}.jpg`;
	const low = (id, label, w, pays = [
		.3,
		1,
		3.5
	]) => ({
		id,
		label,
		kind: "low",
		weight: w,
		pays,
		art: tile(id)
	});
	const mid = (id, label, w, pays) => ({
		id,
		label,
		kind: "mid",
		weight: w,
		pays,
		art: tile(id)
	});
	const high = (id, label, w, pays) => ({
		id,
		label,
		kind: "high",
		weight: w,
		pays,
		art: tile(id)
	});
	if (theme === "egypt") return [
		low("j", "J", 11, [
			.5,
			2.5,
			10
		]),
		low("q", "Q", 11, [
			.5,
			2.5,
			10
		]),
		low("k", "K", 10, [
			.5,
			4,
			15
		]),
		low("a", "A", 10, [
			.5,
			4,
			15
		]),
		mid("ankh", "Ankh", 6, [
			3,
			10,
			75
		]),
		{
			id: "eye",
			label: "Auge",
			kind: "mid",
			weight: 5,
			pays: [
				3,
				10,
				75
			],
			pays2: .5,
			art: tile("eye")
		},
		{
			id: "scarab",
			label: "Skarabäus",
			kind: "high",
			weight: 4,
			pays: [
				3,
				10,
				75
			],
			pays2: .5,
			art: tile("scarab")
		},
		{
			id: "pharaoh",
			label: "Pharao",
			kind: "high",
			weight: 3,
			pays: [
				10,
				100,
				500
			],
			pays2: 1,
			art: tile("pharaoh")
		},
		{
			id: "wild",
			label: "Ra",
			kind: "wild",
			weight: 1,
			pays: [
				10,
				100,
				500
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Buch",
			kind: "scatter",
			weight: 2,
			pays: [
				2,
				20,
				200
			],
			art: tile("scatter")
		}
	];
	if (theme === "nordic") return [
		low("j", "J", 11, [
			.8,
			3.5,
			14
		]),
		low("q", "Q", 11, [
			.8,
			3.5,
			14
		]),
		low("k", "K", 10, [
			1,
			4.5,
			18
		]),
		low("a", "A", 10, [
			1,
			4.5,
			18
		]),
		mid("rune", "Rune", 6, [
			2,
			8,
			35
		]),
		mid("raven", "Rabe", 5, [
			3,
			12,
			50
		]),
		high("wolf", "Wolf", 4, [
			6,
			20,
			80
		]),
		high("hammer", "Hammer", 3, [
			10,
			40,
			200
		]),
		{
			id: "wild",
			label: "Wild",
			kind: "wild",
			weight: 3,
			pays: [
				8,
				30,
				150
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Schiff",
			kind: "scatter",
			weight: 3,
			pays: [
				4,
				20,
				100
			],
			art: tile("scatter")
		}
	];
	if (theme === "fruit") return [
		{
			id: "cherry",
			label: "Kirsche",
			kind: "low",
			weight: 14,
			pays: [
				1.5,
				5,
				20
			],
			pays2: 1,
			art: tile("cherry")
		},
		low("lemon", "Zitrone", 12, [
			1.2,
			4,
			16
		]),
		low("plum", "Pflaume", 11, [
			1.5,
			5,
			18
		]),
		mid("orange", "Orange", 8, [
			2,
			8,
			30
		]),
		mid("bell", "Glocke", 6, [
			3,
			12,
			50
		]),
		high("bar", "BAR", 4, [
			8,
			25,
			100
		]),
		high("seven", "Sieben", 3, [
			20,
			80,
			400
		]),
		{
			id: "wild",
			label: "Stern",
			kind: "wild",
			weight: 3,
			pays: [
				10,
				40,
				200
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Krone",
			kind: "scatter",
			weight: 3,
			pays: [
				5,
				20,
				100
			],
			art: tile("scatter")
		}
	];
	if (theme === "huff") return [
		low("j", "J", 10, [
			1,
			4,
			16
		]),
		low("q", "Q", 10, [
			1,
			4,
			16
		]),
		low("k", "K", 9, [
			1.2,
			5,
			20
		]),
		low("a", "A", 9, [
			1.2,
			5,
			20
		]),
		mid("pig1", "Stroh", 6, [
			2.5,
			10,
			40
		]),
		mid("pig2", "Holz", 5, [
			4,
			15,
			60
		]),
		high("pig3", "Stein", 3, [
			8,
			30,
			150
		]),
		{
			id: "saw",
			label: "Säge",
			kind: "mid",
			weight: 6,
			pays: [
				5,
				20,
				80
			],
			art: tile("saw")
		},
		{
			id: "wild",
			label: "Wolf",
			kind: "wild",
			weight: 2,
			pays: [
				10,
				40,
				200
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Helm",
			kind: "scatter",
			weight: 4,
			pays: [
				0,
				0,
				0
			],
			art: tile("scatter")
		}
	];
	if (theme === "neon") return [
		low("j", "J", 11, [
			.4,
			1.2,
			6
		]),
		low("q", "Q", 11, [
			.4,
			1.2,
			6
		]),
		low("k", "K", 10, [
			.5,
			1.6,
			8
		]),
		low("a", "A", 10, [
			.5,
			1.6,
			8
		]),
		mid("glyph", "Glyph", 6, [
			.8,
			3,
			14
		]),
		mid("crystal", "Kristall", 5, [
			1.2,
			5,
			22
		]),
		mid("ring", "Ring", 5, [
			1.5,
			6,
			28
		]),
		high("helmet", "Helm", 3, [
			4,
			16,
			80
		]),
		{
			id: "wild",
			label: "Bolt",
			kind: "wild",
			weight: 2,
			pays: [
				4,
				16,
				80
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Chip",
			kind: "scatter",
			weight: 3,
			pays: [
				2,
				8,
				40
			],
			art: tile("scatter")
		}
	];
	if (theme === "dragon") return [
		low("j", "J", 11, [
			1,
			4,
			16
		]),
		low("q", "Q", 11, [
			1,
			4,
			16
		]),
		low("k", "K", 10, [
			1.2,
			5,
			20
		]),
		low("a", "A", 10, [
			1.2,
			5,
			20
		]),
		mid("lantern", "Laterne", 6, [
			2.5,
			10,
			40
		]),
		mid("ingot", "Gold", 5, [
			4,
			15,
			60
		]),
		mid("koi", "Koi", 5, [
			5,
			18,
			70
		]),
		high("pearl", "Feuer", 6, [
			8,
			30,
			120
		]),
		{
			id: "wild",
			label: "Auge",
			kind: "wild",
			weight: 2,
			pays: [
				12,
				50,
				250
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Drache",
			kind: "scatter",
			weight: 3,
			pays: [
				6,
				30,
				150
			],
			art: tile("scatter")
		}
	];
	if (theme === "blaze") return [
		{
			id: "cherry",
			label: "Kirsche",
			kind: "low",
			weight: 16,
			pays: [
				2,
				10,
				40
			],
			pays2: .5,
			art: tile("cherry")
		},
		{
			id: "lemon",
			label: "Zitrone",
			kind: "low",
			weight: 14,
			pays: [
				2,
				10,
				40
			],
			pays2: .5,
			art: tile("lemon")
		},
		{
			id: "plum",
			label: "Pflaume",
			kind: "low",
			weight: 12,
			pays: [
				4,
				16,
				80
			],
			pays2: .8,
			art: tile("plum")
		},
		{
			id: "orange",
			label: "Orange",
			kind: "mid",
			weight: 10,
			pays: [
				4,
				16,
				80
			],
			pays2: .8,
			art: tile("orange")
		},
		{
			id: "grapes",
			label: "Trauben",
			kind: "mid",
			weight: 8,
			pays: [
				8,
				40,
				200
			],
			pays2: 1.5,
			art: tile("grapes")
		},
		{
			id: "melon",
			label: "Melone",
			kind: "high",
			weight: 5,
			pays: [
				10,
				80,
				400
			],
			pays2: 2,
			art: tile("melon")
		},
		{
			id: "star",
			label: "Stern",
			kind: "high",
			weight: 3,
			pays: [
				20,
				200,
				1e3
			],
			pays2: 4,
			art: "/games/sym/blaze-star.jpg"
		}
	];
	if (theme === "extra") return [
		{
			id: "necklace",
			label: "Kette",
			kind: "low",
			weight: 13,
			pays: [
				.8,
				3,
				12
			],
			art: "/games/sym/extra-necklace.jpg"
		},
		{
			id: "watch",
			label: "Uhr",
			kind: "low",
			weight: 12,
			pays: [
				.8,
				3,
				12
			],
			art: "/games/sym/extra-watch.jpg"
		},
		{
			id: "coins",
			label: "Münzen",
			kind: "mid",
			weight: 10,
			pays: [
				1.2,
				5,
				20
			],
			art: "/games/sym/extra-coins.jpg"
		},
		{
			id: "ring",
			label: "Ring",
			kind: "mid",
			weight: 9,
			pays: [
				1.5,
				6,
				24
			],
			pays2: .5,
			art: "/games/sym/extra-ring.jpg"
		},
		{
			id: "ruby",
			label: "Rubin",
			kind: "high",
			weight: 6,
			pays: [
				3,
				12,
				50
			],
			pays2: 1,
			art: "/games/sym/gem-ruby.jpg"
		},
		{
			id: "sapphire",
			label: "Diamant",
			kind: "high",
			weight: 4,
			pays: [
				8,
				30,
				120
			],
			pays2: 2,
			art: "/games/sym/gem-sapphire.jpg"
		},
		{
			id: "wild",
			label: "Safe",
			kind: "wild",
			weight: 5,
			pays: [
				10,
				40,
				200
			],
			pays2: 2,
			art: "/games/sym/safe-wild.jpg"
		}
	];
	if (theme === "mirror") return [
		low("j", "J", 11, [
			.5,
			2.5,
			10
		]),
		low("q", "Q", 11, [
			.5,
			2.5,
			10
		]),
		low("k", "K", 10, [
			.5,
			4,
			15
		]),
		low("a", "A", 10, [
			.5,
			4,
			15
		]),
		{
			id: "rune",
			label: "Ring",
			kind: "mid",
			weight: 6,
			pays: [
				3,
				12,
				75
			],
			art: "/games/sym/nordic-rune.jpg"
		},
		{
			id: "tablet",
			label: "Tafel",
			kind: "mid",
			weight: 5,
			pays: [
				3,
				12,
				75
			],
			art: "/games/sym/nordic-raven.jpg"
		},
		{
			id: "unicorn",
			label: "Einhorn",
			kind: "high",
			weight: 4,
			pays: [
				8,
				30,
				200
			],
			pays2: 2,
			art: "/games/sym/mirror-unicorn.jpg"
		},
		{
			id: "mage",
			label: "Magierin",
			kind: "high",
			weight: 3,
			pays: [
				15,
				60,
				500
			],
			pays2: 3,
			art: "/games/sym/mirror-mage.jpg"
		},
		{
			id: "wild",
			label: "Spiegel",
			kind: "wild",
			weight: 2,
			pays: [
				15,
				60,
				500
			],
			art: "/games/sym/mirror-wild.jpg"
		},
		{
			id: "scatter",
			label: "Spiegel",
			kind: "scatter",
			weight: 3,
			pays: [
				2,
				20,
				200
			],
			art: "/games/sym/mirror-wild.jpg"
		}
	];
	if (theme === "multi") return [
		{
			id: "cherry",
			label: "Kirsche",
			kind: "low",
			weight: 12,
			pays: [
				.4,
				1.2,
				6
			],
			art: tile("cherry")
		},
		{
			id: "lemon",
			label: "Zitrone",
			kind: "low",
			weight: 11,
			pays: [
				.4,
				1.2,
				6
			],
			art: tile("lemon")
		},
		{
			id: "plum",
			label: "Pflaume",
			kind: "mid",
			weight: 9,
			pays: [
				.6,
				2,
				10
			],
			art: tile("plum")
		},
		{
			id: "bell",
			label: "Glocke",
			kind: "mid",
			weight: 7,
			pays: [
				1,
				4,
				16
			],
			art: tile("bell")
		},
		{
			id: "grapes",
			label: "Trauben",
			kind: "high",
			weight: 5,
			pays: [
				2,
				8,
				40
			],
			art: tile("grapes")
		},
		{
			id: "star",
			label: "Stern",
			kind: "high",
			weight: 3,
			pays: [
				5,
				20,
				80
			],
			art: tile("star")
		},
		{
			id: "wild",
			label: "Wild",
			kind: "wild",
			weight: 5,
			pays: [
				5,
				20,
				80
			],
			art: tile("wild")
		}
	];
	if (theme === "chance") return [
		{
			id: "cherry",
			label: "Kirsche",
			kind: "low",
			weight: 16,
			pays: [
				2,
				8,
				20
			],
			pays2: 1,
			art: tile("cherry")
		},
		{
			id: "lemon",
			label: "Zitrone",
			kind: "low",
			weight: 14,
			pays: [
				2,
				8,
				24
			],
			pays2: .8,
			art: tile("lemon")
		},
		{
			id: "plum",
			label: "Pflaume",
			kind: "mid",
			weight: 12,
			pays: [
				3,
				10,
				30
			],
			pays2: 1,
			art: tile("plum")
		},
		{
			id: "orange",
			label: "Orange",
			kind: "mid",
			weight: 10,
			pays: [
				4,
				12,
				40
			],
			pays2: 1,
			art: tile("orange")
		},
		{
			id: "bell",
			label: "Glocke",
			kind: "high",
			weight: 7,
			pays: [
				8,
				25,
				80
			],
			pays2: 2,
			art: tile("bell")
		},
		{
			id: "bar",
			label: "BAR",
			kind: "high",
			weight: 5,
			pays: [
				12,
				40,
				150
			],
			pays2: 3,
			art: tile("bar")
		},
		{
			id: "seven",
			label: "Sieben",
			kind: "high",
			weight: 3,
			pays: [
				25,
				100,
				400
			],
			pays2: 4,
			art: tile("seven")
		}
	];
	if (theme === "sizzle") return [
		{
			id: "cherry",
			label: "Kirsche",
			kind: "low",
			weight: 16,
			pays: [
				4,
				20,
				100
			],
			pays2: 1,
			art: tile("cherry")
		},
		{
			id: "lemon",
			label: "Zitrone",
			kind: "low",
			weight: 14,
			pays: [
				4,
				20,
				80
			],
			art: tile("lemon")
		},
		{
			id: "plum",
			label: "Pflaume",
			kind: "low",
			weight: 13,
			pays: [
				4,
				20,
				80
			],
			art: tile("plum")
		},
		{
			id: "orange",
			label: "Orange",
			kind: "mid",
			weight: 10,
			pays: [
				8,
				40,
				150
			],
			art: tile("orange")
		},
		{
			id: "bell",
			label: "Glocke",
			kind: "mid",
			weight: 8,
			pays: [
				10,
				50,
				200
			],
			art: tile("bell")
		},
		{
			id: "melon",
			label: "Melone",
			kind: "high",
			weight: 5,
			pays: [
				20,
				100,
				400
			],
			art: tile("melon")
		},
		{
			id: "seven",
			label: "Sieben",
			kind: "high",
			weight: 3,
			pays: [
				100,
				1e3,
				5e3
			],
			pays2: 5,
			art: tile("seven")
		}
	];
	if (theme === "lucky") return [
		low("j", "J", 11, [
			.8,
			4,
			16
		]),
		low("q", "Q", 11, [
			.8,
			4,
			16
		]),
		low("k", "K", 10, [
			1,
			5,
			20
		]),
		low("a", "A", 10, [
			1,
			5,
			20
		]),
		{
			id: "horseshoe",
			label: "Hufeisen",
			kind: "mid",
			weight: 6,
			pays: [
				2,
				10,
				40
			],
			art: "/games/sym/lucky-horseshoe.jpg"
		},
		{
			id: "chest",
			label: "Truhe",
			kind: "mid",
			weight: 5,
			pays: [
				3,
				15,
				60
			],
			art: "/games/sym/lucky-chest.jpg"
		},
		{
			id: "wild",
			label: "Klee",
			kind: "wild",
			weight: 3,
			pays: [
				10,
				50,
				250
			],
			art: "/games/sym/lucky-clover.jpg"
		},
		{
			id: "scatter",
			label: "Dame",
			kind: "scatter",
			weight: 3,
			pays: [
				2,
				10,
				50
			],
			art: "/games/sym/lucky-lady.jpg"
		}
	];
	return [
		low("j", "J", 11, [
			.8,
			3.5,
			14
		]),
		low("q", "Q", 11, [
			.8,
			3.5,
			14
		]),
		low("k", "K", 10, [
			1,
			4.5,
			18
		]),
		low("a", "A", 10, [
			1,
			4.5,
			18
		]),
		mid("amethyst", "Amethyst", 6, [
			2,
			8,
			35
		]),
		mid("emerald", "Smaragd", 5, [
			3,
			12,
			50
		]),
		high("ruby", "Rubin", 4, [
			6,
			25,
			100
		]),
		high("sapphire", "Saphir", 3, [
			12,
			50,
			220
		]),
		{
			id: "wild",
			label: "Diamant",
			kind: "wild",
			weight: 2,
			pays: [
				10,
				40,
				200
			],
			art: tile("wild")
		},
		{
			id: "scatter",
			label: "Tresor",
			kind: "scatter",
			weight: 3,
			pays: [
				5,
				20,
				100
			],
			art: tile("scatter")
		}
	];
}
var SHARED = {
	reels: 5,
	rows: 3,
	paylines: TEN_LINES,
	betSteps: [
		20,
		50,
		100,
		200,
		500,
		1e3,
		2500,
		5e3
	],
	defaultBet: 100,
	freeSpinsFrom: 3,
	pityAfter: 14
};
/** Book of Ra-style strips: 1–2 books per reel, pictures not stacked. */
var EGYPT_STRIPS = [
	[
		"j",
		"q",
		"k",
		"a",
		"ankh",
		"j",
		"eye",
		"q",
		"k",
		"scatter",
		"a",
		"j",
		"scarab",
		"q",
		"k",
		"a",
		"ankh",
		"j",
		"pharaoh",
		"q",
		"k",
		"eye",
		"a",
		"j",
		"q",
		"ankh",
		"k"
	],
	[
		"q",
		"k",
		"a",
		"j",
		"eye",
		"q",
		"ankh",
		"k",
		"a",
		"j",
		"scarab",
		"q",
		"scatter",
		"k",
		"a",
		"j",
		"eye",
		"q",
		"pharaoh",
		"k",
		"a",
		"ankh",
		"j",
		"q",
		"k",
		"eye",
		"a"
	],
	[
		"k",
		"a",
		"j",
		"q",
		"ankh",
		"k",
		"eye",
		"a",
		"j",
		"scarab",
		"q",
		"k",
		"a",
		"scatter",
		"j",
		"q",
		"ankh",
		"k",
		"pharaoh",
		"a",
		"j",
		"eye",
		"q",
		"k",
		"a",
		"ankh",
		"j"
	],
	[
		"a",
		"j",
		"q",
		"k",
		"eye",
		"a",
		"ankh",
		"j",
		"q",
		"scarab",
		"k",
		"a",
		"j",
		"scatter",
		"q",
		"k",
		"eye",
		"a",
		"pharaoh",
		"j",
		"q",
		"ankh",
		"k",
		"a",
		"j",
		"eye",
		"q"
	],
	[
		"j",
		"k",
		"a",
		"q",
		"ankh",
		"j",
		"eye",
		"k",
		"a",
		"scatter",
		"q",
		"j",
		"scarab",
		"k",
		"a",
		"q",
		"ankh",
		"j",
		"pharaoh",
		"k",
		"a",
		"eye",
		"q",
		"j",
		"k",
		"ankh",
		"a"
	]
];
/** Magic Mirror strips — Spiegel as scatter/wild, lady & unicorn sparse. */
var MIRROR_STRIPS = [
	[
		"j",
		"q",
		"k",
		"a",
		"rune",
		"j",
		"tablet",
		"q",
		"k",
		"scatter",
		"a",
		"j",
		"unicorn",
		"q",
		"k",
		"a",
		"rune",
		"j",
		"mage",
		"q",
		"k",
		"tablet",
		"a",
		"j",
		"q",
		"rune",
		"k"
	],
	[
		"q",
		"k",
		"a",
		"j",
		"tablet",
		"q",
		"rune",
		"k",
		"a",
		"j",
		"unicorn",
		"q",
		"scatter",
		"k",
		"a",
		"j",
		"tablet",
		"q",
		"mage",
		"k",
		"a",
		"rune",
		"j",
		"q",
		"k",
		"tablet",
		"a"
	],
	[
		"k",
		"a",
		"j",
		"q",
		"rune",
		"k",
		"tablet",
		"a",
		"j",
		"unicorn",
		"q",
		"k",
		"a",
		"scatter",
		"j",
		"q",
		"rune",
		"k",
		"mage",
		"a",
		"j",
		"tablet",
		"q",
		"k",
		"a",
		"rune",
		"j"
	],
	[
		"a",
		"j",
		"q",
		"k",
		"tablet",
		"a",
		"rune",
		"j",
		"q",
		"unicorn",
		"k",
		"a",
		"j",
		"scatter",
		"q",
		"k",
		"tablet",
		"a",
		"mage",
		"j",
		"q",
		"rune",
		"k",
		"a",
		"j",
		"tablet",
		"q"
	],
	[
		"j",
		"k",
		"a",
		"q",
		"rune",
		"j",
		"tablet",
		"k",
		"a",
		"scatter",
		"q",
		"j",
		"unicorn",
		"k",
		"a",
		"q",
		"rune",
		"j",
		"mage",
		"k",
		"a",
		"tablet",
		"q",
		"j",
		"k",
		"rune",
		"a"
	]
];
/** Sizzling Hot-style: sevens rare, cherries common, no stacks of sevens. */
var SIZZLE_STRIPS = [
	[
		"cherry",
		"lemon",
		"plum",
		"orange",
		"cherry",
		"bell",
		"lemon",
		"seven",
		"plum",
		"melon",
		"cherry",
		"orange",
		"lemon",
		"plum",
		"bell",
		"cherry",
		"orange",
		"melon",
		"lemon",
		"plum",
		"cherry",
		"bell",
		"orange",
		"lemon",
		"plum"
	],
	[
		"lemon",
		"plum",
		"cherry",
		"orange",
		"bell",
		"lemon",
		"plum",
		"melon",
		"cherry",
		"orange",
		"lemon",
		"seven",
		"plum",
		"bell",
		"cherry",
		"orange",
		"lemon",
		"plum",
		"melon",
		"cherry",
		"bell",
		"orange",
		"lemon",
		"plum",
		"cherry"
	],
	[
		"plum",
		"orange",
		"cherry",
		"lemon",
		"melon",
		"plum",
		"bell",
		"orange",
		"cherry",
		"lemon",
		"plum",
		"orange",
		"seven",
		"cherry",
		"bell",
		"lemon",
		"plum",
		"melon",
		"orange",
		"cherry",
		"lemon",
		"bell",
		"plum",
		"orange",
		"cherry"
	],
	[
		"orange",
		"cherry",
		"lemon",
		"plum",
		"bell",
		"orange",
		"cherry",
		"melon",
		"lemon",
		"plum",
		"orange",
		"bell",
		"cherry",
		"seven",
		"lemon",
		"plum",
		"orange",
		"melon",
		"cherry",
		"bell",
		"lemon",
		"plum",
		"orange",
		"cherry",
		"lemon"
	],
	[
		"cherry",
		"plum",
		"orange",
		"lemon",
		"bell",
		"cherry",
		"plum",
		"seven",
		"orange",
		"melon",
		"lemon",
		"cherry",
		"plum",
		"bell",
		"orange",
		"lemon",
		"cherry",
		"melon",
		"plum",
		"orange",
		"bell",
		"lemon",
		"cherry",
		"plum",
		"orange"
	]
];
/** Always Hot Deluxe: star on cream, cherries common, all 5 lines live. */
var ALWAYS_STRIPS = [
	[
		"cherry",
		"lemon",
		"plum",
		"orange",
		"cherry",
		"bell",
		"lemon",
		"star",
		"plum",
		"grapes",
		"cherry",
		"orange",
		"lemon",
		"plum",
		"bell",
		"cherry",
		"orange",
		"grapes",
		"lemon",
		"plum",
		"cherry",
		"bell",
		"orange",
		"lemon",
		"plum"
	],
	[
		"lemon",
		"plum",
		"cherry",
		"orange",
		"bell",
		"lemon",
		"plum",
		"grapes",
		"cherry",
		"orange",
		"lemon",
		"star",
		"plum",
		"bell",
		"cherry",
		"orange",
		"lemon",
		"plum",
		"grapes",
		"cherry",
		"bell",
		"orange",
		"lemon",
		"plum",
		"cherry"
	],
	[
		"plum",
		"orange",
		"cherry",
		"lemon",
		"grapes",
		"plum",
		"bell",
		"orange",
		"cherry",
		"lemon",
		"plum",
		"orange",
		"star",
		"cherry",
		"bell",
		"lemon",
		"plum",
		"grapes",
		"orange",
		"cherry",
		"lemon",
		"bell",
		"plum",
		"orange",
		"cherry"
	],
	[
		"orange",
		"cherry",
		"lemon",
		"plum",
		"bell",
		"orange",
		"cherry",
		"grapes",
		"lemon",
		"plum",
		"orange",
		"bell",
		"cherry",
		"star",
		"lemon",
		"plum",
		"orange",
		"grapes",
		"cherry",
		"bell",
		"lemon",
		"plum",
		"orange",
		"cherry",
		"lemon"
	],
	[
		"cherry",
		"plum",
		"orange",
		"lemon",
		"bell",
		"cherry",
		"plum",
		"star",
		"orange",
		"grapes",
		"lemon",
		"cherry",
		"plum",
		"bell",
		"orange",
		"lemon",
		"cherry",
		"grapes",
		"plum",
		"orange",
		"bell",
		"lemon",
		"cherry",
		"plum",
		"orange"
	]
];
/** Just Jewels: five gems, diamond sparse. */
var JEWEL_STRIPS = [
	[
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"diamond",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby"
	],
	[
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"diamond",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst"
	],
	[
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"diamond",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald"
	],
	[
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"diamond",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire",
		"ruby",
		"amethyst",
		"emerald",
		"sapphire"
	],
	[
		"amethyst",
		"sapphire",
		"emerald",
		"ruby",
		"amethyst",
		"sapphire",
		"diamond",
		"emerald",
		"ruby",
		"amethyst",
		"sapphire",
		"emerald",
		"ruby",
		"amethyst",
		"sapphire",
		"emerald",
		"ruby",
		"amethyst",
		"sapphire",
		"emerald",
		"ruby",
		"amethyst",
		"sapphire",
		"emerald",
		"ruby"
	]
];
/** Blazing Star-style: star sparse, fruit on black. */
var BLAZE_STRIPS = [
	[
		"cherry",
		"lemon",
		"plum",
		"orange",
		"grapes",
		"cherry",
		"melon",
		"lemon",
		"plum",
		"star",
		"orange",
		"cherry",
		"grapes",
		"lemon",
		"plum",
		"melon",
		"cherry",
		"orange",
		"lemon",
		"grapes",
		"plum",
		"cherry",
		"melon",
		"orange",
		"lemon"
	],
	[
		"lemon",
		"plum",
		"orange",
		"cherry",
		"melon",
		"lemon",
		"grapes",
		"plum",
		"orange",
		"cherry",
		"star",
		"lemon",
		"melon",
		"plum",
		"grapes",
		"orange",
		"cherry",
		"lemon",
		"plum",
		"melon",
		"orange",
		"grapes",
		"cherry",
		"lemon",
		"plum"
	],
	[
		"plum",
		"orange",
		"cherry",
		"lemon",
		"grapes",
		"plum",
		"melon",
		"orange",
		"cherry",
		"lemon",
		"grapes",
		"star",
		"plum",
		"melon",
		"orange",
		"cherry",
		"lemon",
		"grapes",
		"plum",
		"melon",
		"orange",
		"cherry",
		"lemon",
		"grapes",
		"plum"
	],
	[
		"orange",
		"cherry",
		"lemon",
		"plum",
		"melon",
		"orange",
		"grapes",
		"cherry",
		"lemon",
		"plum",
		"melon",
		"orange",
		"star",
		"grapes",
		"cherry",
		"lemon",
		"plum",
		"melon",
		"orange",
		"grapes",
		"lemon",
		"cherry",
		"plum",
		"melon",
		"orange"
	],
	[
		"cherry",
		"orange",
		"plum",
		"lemon",
		"grapes",
		"cherry",
		"melon",
		"orange",
		"plum",
		"star",
		"lemon",
		"grapes",
		"cherry",
		"melon",
		"orange",
		"plum",
		"lemon",
		"grapes",
		"cherry",
		"melon",
		"plum",
		"orange",
		"lemon",
		"grapes",
		"cherry"
	]
];
/** Triple Chance 3-reel strips. */
var CHANCE_STRIPS = [
	[
		"cherry",
		"lemon",
		"plum",
		"orange",
		"bell",
		"cherry",
		"bar",
		"lemon",
		"plum",
		"seven",
		"orange",
		"bell",
		"cherry",
		"lemon",
		"bar",
		"plum",
		"orange",
		"bell",
		"cherry",
		"lemon",
		"plum",
		"bar",
		"orange",
		"bell",
		"cherry"
	],
	[
		"lemon",
		"plum",
		"orange",
		"cherry",
		"bar",
		"lemon",
		"bell",
		"plum",
		"seven",
		"orange",
		"cherry",
		"bar",
		"lemon",
		"bell",
		"plum",
		"orange",
		"cherry",
		"bar",
		"lemon",
		"bell",
		"plum",
		"orange",
		"cherry",
		"bell",
		"lemon"
	],
	[
		"plum",
		"orange",
		"cherry",
		"lemon",
		"bell",
		"bar",
		"plum",
		"orange",
		"cherry",
		"seven",
		"lemon",
		"bell",
		"bar",
		"plum",
		"orange",
		"cherry",
		"lemon",
		"bell",
		"bar",
		"plum",
		"orange",
		"cherry",
		"lemon",
		"bell",
		"plum"
	]
];
var SLOT_DEFS = {
	"pharaos-erbe": {
		...SHARED,
		slug: "pharaos-erbe",
		symbols: ranks("egypt"),
		freeSpinCount: 10,
		bookWild: true,
		expandingSpecial: true,
		fsMultiplier: 1,
		mechanic: "book",
		strips: EGYPT_STRIPS
	},
	nordlicht: {
		...SHARED,
		slug: "nordlicht",
		symbols: ranks("nordic"),
		freeSpinCount: 10,
		expandingSpecial: false,
		fsMultiplier: 3,
		mechanic: "sticky"
	},
	kirschkoenig: {
		...SHARED,
		slug: "kirschkoenig",
		symbols: ranks("fruit"),
		betSteps: [
			20,
			50,
			100,
			200,
			500,
			1e3,
			2500
		],
		defaultBet: 50,
		freeSpinCount: 8,
		fsMultiplier: 2,
		pityAfter: 12,
		mechanic: "gamble"
	},
	saphirnacht: {
		...SHARED,
		slug: "saphirnacht",
		symbols: ranks("gem"),
		freeSpinCount: 8,
		expandingSpecial: true,
		fsMultiplier: 2,
		mechanic: "gems",
		gemTarget: 12
	},
	"huff-und-puff": {
		...SHARED,
		slug: "huff-und-puff",
		symbols: ranks("huff"),
		freeSpinsFrom: 6,
		freeSpinCount: 6,
		pityAfter: 14,
		fsMultiplier: 1
	},
	"neon-drift": {
		...SHARED,
		slug: "neon-drift",
		symbols: ranks("neon"),
		freeSpinCount: 8,
		fsMultiplier: 1,
		pityAfter: 12,
		mechanic: "ways",
		tumble: true
	},
	drachenfeuer: {
		...SHARED,
		slug: "drachenfeuer",
		symbols: ranks("dragon"),
		freeSpinCount: 10,
		expandingSpecial: false,
		fsMultiplier: 2,
		mechanic: "firelink",
		firelinkFrom: 5,
		pityAfter: 16
	},
	flammenstern: {
		...SHARED,
		slug: "flammenstern",
		symbols: ranks("blaze"),
		paylines: FIVE_LINES,
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "leiter",
		leiter: true,
		allPays2: true,
		pityAfter: 10,
		strips: BLAZE_STRIPS
	},
	"extra-safe": {
		...SHARED,
		slug: "extra-safe",
		symbols: ranks("extra"),
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "leiter",
		leiter: true,
		paysBothWays: true,
		wildMults: WILD_MULTS,
		pityAfter: 12
	},
	zauberspiegel: {
		...SHARED,
		slug: "zauberspiegel",
		symbols: ranks("mirror"),
		freeSpinCount: 10,
		bookWild: true,
		expandingSpecial: true,
		fsMultiplier: 1,
		mechanic: "book",
		leiter: true,
		strips: MIRROR_STRIPS
	},
	"multi-wild": {
		...SHARED,
		slug: "multi-wild",
		symbols: ranks("multi"),
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "ways",
		stackedWilds: true,
		leiter: true,
		pityAfter: 10
	},
	"triple-chance": {
		...SHARED,
		slug: "triple-chance",
		reels: 3,
		paylines: THREE_LINES,
		symbols: ranks("chance"),
		betSteps: [
			20,
			50,
			100,
			200,
			500,
			1e3
		],
		defaultBet: 50,
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "hold",
		leiter: true,
		allPays2: true,
		pityAfter: 8,
		strips: CHANCE_STRIPS
	},
	"heisse-fruechte": {
		...SHARED,
		slug: "heisse-fruechte",
		symbols: ranks("sizzle"),
		paylines: FIVE_LINES,
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "leiter",
		leiter: true,
		allPays2: false,
		pityAfter: 10,
		strips: SIZZLE_STRIPS
	},
	gluecksklee: {
		...SHARED,
		slug: "gluecksklee",
		symbols: ranks("lucky"),
		freeSpinCount: 15,
		expandingSpecial: false,
		fsMultiplier: 1,
		mechanic: "leiter",
		leiter: true,
		pityAfter: 12
	},
	"olymp-tor": OLYMP_DEF,
	"bonbon-regen": BONBON_DEF,
	raubfisch: FISH_DEF,
	goldwolf: {
		...SHARED,
		slug: "goldwolf",
		symbols: [
			{
				id: "j",
				label: "J",
				kind: "low",
				weight: 12,
				pays: [
					.4,
					1.2,
					5
				],
				art: "/games/sym/wolf-j.jpg"
			},
			{
				id: "q",
				label: "Q",
				kind: "low",
				weight: 12,
				pays: [
					.4,
					1.2,
					5
				],
				art: "/games/sym/wolf-q.jpg"
			},
			{
				id: "k",
				label: "K",
				kind: "low",
				weight: 10,
				pays: [
					.6,
					2,
					8
				],
				art: "/games/sym/wolf-k.jpg"
			},
			{
				id: "a",
				label: "A",
				kind: "low",
				weight: 10,
				pays: [
					.6,
					2,
					8
				],
				art: "/games/sym/wolf-a.jpg"
			},
			{
				id: "ruby",
				label: "Mond",
				kind: "mid",
				weight: 7,
				pays: [
					1.2,
					5,
					16
				],
				art: "/games/sym/wolf-moon.jpg"
			},
			{
				id: "wild",
				label: "Wolf",
				kind: "wild",
				weight: 3,
				pays: [
					4,
					16,
					60
				],
				art: "/games/sym/wolf-wild.jpg"
			},
			{
				id: "coin",
				label: "Münze",
				kind: "high",
				weight: 7,
				pays: [
					0,
					0,
					0
				],
				art: "/games/sym/wolf-coin.jpg"
			}
		],
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		expandingSpecial: false,
		fsMultiplier: 1,
		mechanic: "firelink",
		firelinkFrom: 6,
		pityAfter: 10
	},
	sternenblitz: {
		...SHARED,
		slug: "sternenblitz",
		reels: 5,
		rows: 3,
		paylines: TEN_LINES,
		symbols: [
			{
				id: "blue",
				label: "Saphir",
				kind: "low",
				weight: 16,
				pays: [
					.3,
					1,
					3
				],
				art: "/games/sym/burst-blue.jpg"
			},
			{
				id: "green",
				label: "Smaragd",
				kind: "low",
				weight: 14,
				pays: [
					.4,
					1.2,
					4
				],
				art: "/games/sym/burst-green.jpg"
			},
			{
				id: "yellow",
				label: "Topas",
				kind: "low",
				weight: 12,
				pays: [
					.5,
					1.5,
					5
				],
				art: "/games/sym/burst-yellow.jpg"
			},
			{
				id: "purple",
				label: "Amethyst",
				kind: "mid",
				weight: 10,
				pays: [
					.8,
					2,
					8
				],
				art: "/games/sym/burst-purple.jpg"
			},
			{
				id: "red",
				label: "Rubin",
				kind: "mid",
				weight: 8,
				pays: [
					1,
					3,
					10
				],
				art: "/games/sym/burst-red.jpg"
			},
			{
				id: "ring",
				label: "Krone",
				kind: "high",
				weight: 5,
				pays: [
					2,
					8,
					20
				],
				art: "/games/sym/burst-crown.jpg"
			},
			{
				id: "star",
				label: "Stern",
				kind: "wild",
				weight: 4,
				pays: [
					0,
					0,
					0
				],
				art: "/games/sym/burst-star.jpg"
			}
		],
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		expandingSpecial: false,
		fsMultiplier: 1,
		mechanic: "burst",
		paysBothWays: true,
		wildReels: [
			1,
			2,
			3
		],
		pityAfter: 10
	},
	"immer-heiss": {
		...SHARED,
		slug: "immer-heiss",
		symbols: [
			{
				id: "cherry",
				label: "Kirsche",
				kind: "low",
				weight: 16,
				pays: [
					5,
					20,
					100
				],
				pays2: 2,
				art: "/games/sym/always-cherry.jpg"
			},
			{
				id: "lemon",
				label: "Zitrone",
				kind: "low",
				weight: 14,
				pays: [
					5,
					20,
					80
				],
				art: "/games/sym/always-lemon.jpg"
			},
			{
				id: "plum",
				label: "Pflaume",
				kind: "low",
				weight: 13,
				pays: [
					5,
					20,
					80
				],
				art: "/games/sym/always-plum.jpg"
			},
			{
				id: "orange",
				label: "Orange",
				kind: "mid",
				weight: 10,
				pays: [
					8,
					40,
					150
				],
				art: "/games/sym/always-orange.jpg"
			},
			{
				id: "bell",
				label: "Glocke",
				kind: "mid",
				weight: 8,
				pays: [
					10,
					50,
					200
				],
				art: "/games/sym/always-bell.jpg"
			},
			{
				id: "grapes",
				label: "Trauben",
				kind: "high",
				weight: 5,
				pays: [
					20,
					100,
					400
				],
				art: "/games/sym/always-grapes.jpg"
			},
			{
				id: "star",
				label: "Stern",
				kind: "high",
				weight: 3,
				pays: [
					100,
					1e3,
					5e3
				],
				pays2: 10,
				art: "/games/sym/always-star.jpg"
			}
		],
		paylines: FIVE_LINES,
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "leiter",
		leiter: true,
		allPays2: false,
		pityAfter: 10,
		strips: ALWAYS_STRIPS
	},
	"nur-juwelen": {
		...SHARED,
		slug: "nur-juwelen",
		symbols: [
			{
				id: "amethyst",
				label: "Amethyst",
				kind: "low",
				weight: 16,
				pays: [
					2,
					8,
					30
				],
				art: "/games/sym/jewel-amethyst.jpg"
			},
			{
				id: "emerald",
				label: "Smaragd",
				kind: "low",
				weight: 14,
				pays: [
					3,
					12,
					40
				],
				art: "/games/sym/jewel-emerald.jpg"
			},
			{
				id: "sapphire",
				label: "Saphir",
				kind: "mid",
				weight: 12,
				pays: [
					4,
					16,
					60
				],
				art: "/games/sym/jewel-sapphire.jpg"
			},
			{
				id: "ruby",
				label: "Rubin",
				kind: "high",
				weight: 8,
				pays: [
					8,
					30,
					120
				],
				art: "/games/sym/jewel-ruby.jpg"
			},
			{
				id: "diamond",
				label: "Diamant",
				kind: "high",
				weight: 4,
				pays: [
					20,
					80,
					400
				],
				pays2: 2,
				art: "/games/sym/jewel-diamond.jpg"
			}
		],
		paylines: FIVE_LINES,
		freeSpinsFrom: 99,
		freeSpinCount: 0,
		fsMultiplier: 1,
		mechanic: "leiter",
		leiter: true,
		allPays2: false,
		pityAfter: 10,
		strips: JEWEL_STRIPS
	}
};
function randomSymbol(def, allowScatter = true) {
	const pool = allowScatter ? def.symbols : def.symbols.filter((s) => s.kind !== "scatter");
	const s = weightedPick(pool);
	if (s.kind === "wild" && def.wildMults && def.wildMults.length) return {
		...s,
		wildMult: def.wildMults[randInt(def.wildMults.length)]
	};
	if (s.id === "fish") return {
		...s,
		wildMult: pickCoinValue().mult
	};
	return s;
}
function spinGrid(def, forceScatters = 0) {
	const grid = [];
	for (let r = 0; r < def.reels; r++) {
		const strip = materializeStrip(def, r);
		if (strip.length >= def.rows) {
			const start = randInt(strip.length);
			grid.push(Array.from({ length: def.rows }, (_, row) => strip[(start + row) % strip.length]));
		} else {
			const col = [];
			for (let row = 0; row < def.rows; row++) {
				let s = randomSymbol(def);
				if (s.kind === "wild" && def.wildReels && !def.wildReels.includes(r)) s = weightedPick(def.symbols.filter((x) => x.kind !== "wild" && x.kind !== "scatter"));
				col.push(s);
			}
			grid.push(col);
		}
	}
	if (forceScatters > 0) {
		const scatter = def.symbols.find((s) => s.kind === "scatter");
		if (scatter) for (let i = 0; i < forceScatters && i < def.reels; i++) grid[i][1] = scatter;
	}
	if (def.stackedWilds) {
		const wild = def.symbols.find((s) => s.kind === "wild");
		if (wild) {
			for (let r = 0; r < def.reels; r++) if (Math.random() < .1) grid[r] = Array.from({ length: def.rows }, () => wild);
		}
	}
	return grid;
}
/** Reel strip for painting: PAD symbols before the window, then the landed 3, then 1 after. */
function paintStrip(def, col, reel, pad) {
	const strip = materializeStrip(def, reel);
	if (strip.length < def.rows) return [
		...randomPad(def, pad),
		...col,
		randomSymbol(def, false)
	];
	let start = randInt(strip.length);
	for (let i = 0; i < strip.length; i++) if (strip[i].id === col[0].id && strip[(i + 1) % strip.length].id === col[1].id && strip[(i + 2) % strip.length].id === col[2].id) {
		start = i;
		break;
	}
	const out = [];
	for (let i = -pad; i <= col.length; i++) out.push(strip[(start + i + strip.length * 8) % strip.length]);
	return out;
}
function materializeStrip(def, reel) {
	const pattern = def.strips?.[reel] ?? def.strips?.[0];
	if (!pattern?.length) return [];
	const map = new Map(def.symbols.map((s) => [s.id, s]));
	const out = [];
	for (const id of pattern) {
		const s = map.get(id);
		if (s) out.push(s);
	}
	return out;
}
function isWild(s, def) {
	if (s.kind === "wild") return true;
	if (def.bookWild && s.kind === "scatter") return true;
	return false;
}
function specialPool(def) {
	return def.symbols.filter((s) => s.kind !== "wild" && s.kind !== "scatter");
}
function pickSpecial(def) {
	const pool = specialPool(def);
	return pool[randInt(pool.length)];
}
function reelsWithSymbol(grid, id) {
	const out = [];
	grid.forEach((col, i) => {
		if (col.some((s) => s.id === id)) out.push(i);
	});
	return out;
}
/** Book of Ra / Magic Mirror: symbols that pay 2-of-a-kind expand from 2, the rest from 3. */
function expandMinCount(special) {
	return special.pays2 ? 2 : 3;
}
function expandGrid(grid, special, minCount = 1) {
	const hits = reelsWithSymbol(grid, special.id);
	if (hits.length < minCount) return {
		grid,
		expandedReels: []
	};
	const expandedReels = hits;
	return {
		grid: grid.map((col, i) => hits.includes(i) ? col.map(() => special) : col),
		expandedReels
	};
}
/** Expanding special pays on every line, even when reels are not adjacent. */
function scoreExpanding(def, grid, special, stake, multiplier = 1) {
	const reels = reelsWithSymbol(grid, special.id);
	const count = reels.length;
	if (count < expandMinCount(special)) return null;
	let pay = 0;
	if (count === 2) pay = special.pays2 ?? 0;
	else pay = special.pays[Math.min(count, 5) - 3] ?? 0;
	if (pay <= 0) return null;
	const cells = [];
	reels.forEach((reel) => {
		for (let row = 0; row < def.rows; row++) cells.push({
			symbol: special,
			reel,
			row
		});
	});
	const lines = def.paylines.length;
	return {
		line: 0,
		symbol: special,
		count,
		cells,
		payout: Math.round(stake * pay * multiplier * lines),
		expanding: true,
		ways: lines
	};
}
function evaluateBookSpin(def, raw, special, stake, multiplier = 1) {
	const base = evaluateSpin(def, raw, stake, multiplier);
	const exp = expandGrid(raw, special, expandMinCount(special));
	const extra = scoreExpanding(def, raw, special, stake, multiplier);
	const lines = base.lineWins.filter((w) => w.symbol.id !== special.id);
	if (extra) lines.push(extra);
	const totalPayout = lines.reduce((s, w) => s + w.payout, 0) + base.scatterPayout;
	return {
		...base,
		grid: extra ? exp.grid : raw,
		lineWins: lines,
		totalPayout,
		expandedReels: extra ? exp.expandedReels : []
	};
}
function evaluateSpin(def, grid, stake, multiplier = 1, activeLines) {
	if (def.mechanic === "ways") return evaluateWays(def, grid, stake, multiplier);
	const lineWins = [];
	const n = Math.max(1, Math.min(def.paylines.length, activeLines ?? def.paylines.length));
	def.paylines.slice(0, n).forEach((line, lineIndex) => {
		const fwd = scoreLine(def, grid, line, lineIndex, stake, multiplier, false);
		if (fwd) lineWins.push(fwd);
		if (def.paysBothWays) {
			const back = scoreLine(def, grid, line, lineIndex, stake, multiplier, true);
			if (back && !(fwd && fwd.count === def.reels && back.count === def.reels && fwd.symbol.id === back.symbol.id)) lineWins.push({
				...back,
				line: lineIndex + 100
			});
		}
	});
	return withScatters(def, grid, stake, multiplier, lineWins);
}
function scoreLine(def, grid, line, lineIndex, stake, multiplier, reverse) {
	const cells = line.map((row, reel) => ({
		symbol: grid[reel][row],
		reel,
		row
	}));
	const ordered = reverse ? cells.slice().reverse() : cells;
	const target = ordered.find((c) => c.symbol.kind !== "scatter" && !isWild(c.symbol, def))?.symbol ?? (isWild(ordered[0].symbol, def) ? ordered[0].symbol : null);
	if (!target || target.kind === "scatter") return null;
	let count = 0;
	for (const cell of ordered) {
		const s = cell.symbol;
		if (s.kind === "scatter" && !def.bookWild) break;
		if (isWild(s, def) || s.id === target.id) count += 1;
		else break;
	}
	if (count < 2) return null;
	let pay = 0;
	if (count === 2) {
		const p2 = target.pays2 ?? (def.allPays2 ? (target.pays[0] ?? 0) * .25 : 0);
		if (p2 <= 0) return null;
		pay = p2;
	} else pay = target.pays[Math.min(count, 5) - 3] ?? 0;
	if (pay <= 0) return null;
	const used = ordered.slice(0, count);
	let wmult = 1;
	if (def.wildMults) {
		for (const c of used) if (c.symbol.kind === "wild" && c.symbol.wildMult) wmult *= c.symbol.wildMult;
	}
	const payout = Math.round(stake * pay * multiplier * wmult);
	if (payout <= 0) return null;
	return {
		line: lineIndex,
		symbol: target,
		count,
		cells: used,
		payout
	};
}
function evaluateWays(def, grid, stake, multiplier = 1) {
	const lineWins = [];
	def.symbols.filter((s) => s.kind !== "scatter" && s.kind !== "wild").forEach((target, idx) => {
		const cells = [];
		const perReel = [];
		for (let r = 0; r < def.reels; r++) {
			let n = 0;
			for (let row = 0; row < def.rows; row++) {
				const s = grid[r][row];
				if (s.id === target.id || s.kind === "wild") {
					n += 1;
					cells.push({
						symbol: s,
						reel: r,
						row
					});
				}
			}
			if (n === 0) break;
			perReel.push(n);
		}
		const count = perReel.length;
		if (count < 3) return;
		const ways = perReel.reduce((a, b) => a * b, 1);
		const pay = target.pays[Math.min(count, 5) - 3] ?? 0;
		const payout = Math.round(stake * pay * ways * multiplier);
		if (payout <= 0) return;
		lineWins.push({
			line: idx,
			symbol: target,
			count,
			cells,
			payout,
			ways
		});
	});
	return withScatters(def, grid, stake, multiplier, lineWins);
}
function withScatters(def, grid, stake, multiplier, lineWins) {
	let scatterCount = 0;
	for (const col of grid) for (const s of col) if (s.kind === "scatter") scatterCount += 1;
	const scatterSym = def.symbols.find((s) => s.kind === "scatter");
	let scatterPayout = 0;
	if (scatterSym && scatterCount >= 3 && scatterSym.pays[0] > 0) scatterPayout = Math.round(stake * scatterSym.pays[Math.min(scatterCount, 5) - 3] * multiplier);
	const freeSpinsAwarded = scatterCount >= def.freeSpinsFrom ? def.freeSpinCount : 0;
	const totalPayout = lineWins.reduce((s, w) => s + w.payout, 0) + scatterPayout;
	return {
		grid,
		lineWins,
		scatterCount,
		scatterPayout,
		totalPayout,
		freeSpinsAwarded,
		expandedReels: []
	};
}
function winningCellKeys(result) {
	const set = /* @__PURE__ */ new Set();
	result.lineWins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
	if (result.scatterCount >= 3) result.grid.forEach((col, ri) => col.forEach((s, row) => {
		if (s.kind === "scatter") set.add(`${ri}-${row}`);
	}));
	return set;
}
function dropAndFill(def, grid, vanish) {
	return grid.map((col, r) => {
		const kept = [];
		for (let row = 0; row < def.rows; row++) if (!vanish.has(`${r}-${row}`)) kept.push(col[row]);
		const fill = def.rows - kept.length;
		return [...Array.from({ length: fill }, () => randomSymbol(def, true)), ...kept];
	});
}
function applySticky(grid, frozen, wild) {
	return grid.map((col, r) => col.map((s, row) => frozen.has(`${r}-${row}`) ? wild : s));
}
function collectWildKeys(grid) {
	const out = [];
	grid.forEach((col, r) => col.forEach((s, row) => {
		if (s.kind === "wild") out.push(`${r}-${row}`);
	}));
	return out;
}
function isFireCoin(s, def) {
	return def.mechanic === "firelink" && (s.id === "pearl" || s.id === "coin");
}
function collectCoins(grid, def, existing = []) {
	const map = new Map(existing.map((c) => [`${c.reel}-${c.row}`, c]));
	grid.forEach((col, r) => col.forEach((s, row) => {
		const key = `${r}-${row}`;
		if (isFireCoin(s, def) && !map.has(key)) map.set(key, {
			reel: r,
			row,
			...pickCoinValue()
		});
	}));
	return [...map.values()];
}
var COIN_TABLE = [
	{
		w: 22,
		mult: 1
	},
	{
		w: 16,
		mult: 2
	},
	{
		w: 12,
		mult: 3
	},
	{
		w: 10,
		mult: 5
	},
	{
		w: 8,
		mult: 8
	},
	{
		w: 6,
		mult: 10
	},
	{
		w: 4,
		mult: 15
	},
	{
		w: 3,
		mult: 25
	},
	{
		w: 4,
		mult: 20,
		jackpot: "MINI"
	},
	{
		w: 3,
		mult: 50,
		jackpot: "MINOR"
	},
	{
		w: 2,
		mult: 200,
		jackpot: "MAJOR"
	},
	{
		w: 1,
		mult: 1e3,
		jackpot: "GRAND"
	}
];
function pickCoinValue() {
	const total = COIN_TABLE.reduce((s, x) => s + x.w, 0);
	let r = randInt(total);
	for (const row of COIN_TABLE) {
		r -= row.w;
		if (r < 0) return {
			mult: row.mult,
			jackpot: row.jackpot
		};
	}
	return { mult: 1 };
}
function coinPayout(coins, stake) {
	return coins.reduce((s, c) => s + Math.round(stake * c.mult), 0);
}
function forceCoins(grid, coin, n) {
	const next = grid.map((col) => col.slice());
	const spots = shuffle(15);
	for (let k = 0; k < n && k < spots.length; k++) {
		const idx = spots[k];
		const reel = Math.floor(idx / 3);
		const row = idx % 3;
		next[reel][row] = coin;
	}
	return next;
}
function fillUnlocked(def, grid, locked) {
	return grid.map((col, r) => col.map((s, row) => locked.has(`${r}-${row}`) ? s : randomSymbol(def, false)));
}
function countGems(grid) {
	let n = 0;
	for (const col of grid) for (const s of col) if (s.id === "amethyst" || s.id === "emerald" || s.id === "ruby" || s.id === "sapphire") n += 1;
	return n;
}
function winTier(payout, stake) {
	const r = payout / Math.max(1, stake);
	if (r >= 50) return "epic";
	if (r >= 20) return "mega";
	if (r >= 8) return "big";
	if (r >= 4) return "nice";
	return "none";
}
var WIN_TIER_LABEL = {
	none: "",
	nice: "GEWINN",
	big: "GROSSGEWINN",
	mega: "MEGA WIN",
	epic: "EPIC WIN"
};
function expandBurst(def, grid) {
	const wild = def.symbols.find((s) => s.kind === "wild");
	if (!wild) return {
		grid,
		expanded: []
	};
	const allowed = def.wildReels ?? [
		1,
		2,
		3
	];
	const expanded = [];
	return {
		grid: grid.map((col, r) => {
			if (!allowed.includes(r)) return col;
			if (col.some((s) => s.kind === "wild")) {
				expanded.push(r);
				return col.map(() => wild);
			}
			return col;
		}),
		expanded
	};
}
function randomPad(def, n) {
	return Array.from({ length: n }, () => def.symbols[randInt(def.symbols.length)]);
}
function shuffle(n) {
	const a = Array.from({ length: n }, (_, i) => i);
	for (let i = n - 1; i > 0; i--) {
		const j = randInt(i + 1);
		const t = a[i];
		a[i] = a[j];
		a[j] = t;
	}
	return a;
}
function WinCelebration({ payout, stake, tier, soundOn, onDone, variant = "card" }) {
	const [shown, setShown] = (0, import_react.useState)(0);
	const label = variant === "pragmatic" ? tier === "epic" ? "EPIC WIN" : tier === "mega" ? "MEGA WIN" : "BIG WIN" : WIN_TIER_LABEL[tier];
	const skippable = shown >= payout * .35 || shown > 0;
	(0, import_react.useEffect)(() => {
		if (soundOn && tier !== "none") {
			if (tier === "nice") sfx.win(true);
			else sfx.fanfare(tier);
		}
		const start = performance.now();
		const dur = tier === "epic" ? 2800 : tier === "mega" ? 2200 : tier === "big" ? 1600 : 900;
		let lastTick = 0;
		let raf = 0;
		const tick = (now) => {
			const p = Math.min(1, (now - start) / dur);
			const value = Math.round(payout * (1 - Math.pow(1 - p, 3)));
			setShown(value);
			if (soundOn && now - lastTick > 70) {
				sfx.coin();
				lastTick = now;
			}
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		const auto = window.setTimeout(onDone, dur + (tier === "epic" || tier === "mega" ? 1400 : 700));
		return () => {
			cancelAnimationFrame(raf);
			window.clearTimeout(auto);
		};
	}, [
		payout,
		tier,
		soundOn,
		onDone
	]);
	if (tier === "none" || payout <= 0) return null;
	if (variant === "pragmatic") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "win-prag",
		onClick: () => skippable ? onDone() : setShown(payout),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 overflow-hidden",
				"aria-hidden": true,
				children: Array.from({ length: tier === "epic" ? 32 : 20 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "win-coin",
					style: {
						left: `${i * 37 % 100}%`,
						animationDelay: `${i % 10 * .08}s`,
						animationDuration: `${1.4 + i % 5 * .18}s`
					}
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("win-prag-label", `is-${tier}`),
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "win-prag-amt",
				children: formatEuro(shown)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-[#ffe08a]",
				children: [(payout / Math.max(1, stake)).toFixed(1).replace(".", ","), "×"]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "absolute inset-0 z-40 flex items-center justify-center bg-bg/70 px-4",
		onClick: () => {
			if (skippable) onDone();
			else setShown(payout);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			"aria-hidden": true,
			children: Array.from({ length: tier === "epic" ? 28 : 18 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "win-coin",
				style: {
					left: `${i * 37 % 100}%`,
					animationDelay: `${i % 10 * .08}s`,
					animationDuration: `${1.4 + i % 5 * .18}s`
				}
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative w-full max-w-sm rounded-xl border-2 bg-surface px-6 py-8 text-center shadow-2xl", tier === "epic" || tier === "mega" ? "border-accent slot-shake" : "border-accent/70"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] uppercase tracking-[0.38em] text-accent",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-3 font-display tabular-nums text-fg", tier === "epic" ? "text-6xl" : tier === "mega" ? "text-5xl" : "text-4xl"),
					children: formatEuro(shown)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [(payout / Math.max(1, stake)).toFixed(1).replace(".", ","), "× Einsatz"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[11px] uppercase tracking-wider text-subtle",
					children: "Tippen zum Schließen"
				})
			]
		})]
	});
}
function Paytable({ open, onOpenChange, def, stake, name }) {
	const scatter = def.symbols.find((s) => s.kind === "scatter");
	const wild = def.symbols.find((s) => s.kind === "wild");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-2xl",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: def.mechanic === "olympus" ? "6×5. 8 oder mehr gleiche Symbole zahlen überall. Gewinne stürzen nach. Orbs 2×–500× addieren sich am Ende. 4 Scatter = Freispiele (Bonus bleibt der Multiplikator). 3 Scatter im Bonus = extra Spins. Ante +25 %. Bonus kaufen: 100×." : def.mechanic === "burst" ? "10 Linien, beide Richtungen. Der Stern (Wild) nur auf Walze 2–4. Landet er, füllt er die ganze Walze und die anderen drehen nach — wie Sternenblitz." : def.mechanic === "fish" ? "3 Boote starten 10 Freispiele. Im Bonus sammelt der Angler alle Fische. Mehrere Angler = extra Spins und extra Multiplikator." : def.mechanic === "ways" && def.tumble ? "243 Wege · links nach rechts · Gewinne fallen nach und erhöhen den Multiplikator." : def.stackedWilds ? "243 Wege · Wilds können ganze Walzen füllen. Nach dem Gewinn: Karte oder Leiter." : def.mechanic === "firelink" ? `${def.firelinkFrom ?? 5}× Feuer starten Fire Link. Münzen bleiben stehen, leere Felder drehen nach.` : def.mechanic === "sticky" ? "Im Bonus bleiben Wilds eingefroren und bleiben bis zum Ende liegen." : def.mechanic === "gems" ? `${def.gemTarget ?? 12} Edelsteine füllen den Tresor und starten extra Freispiele.` : def.mechanic === "gamble" ? "Nach einem Gewinn: Risiko auf Rot oder Schwarz — verdoppeln oder alles verlieren." : def.mechanic === "hold" ? "3 Walzen. Nach dem ersten Dreh Walzen halten und einmal nachdrehen. Dann Risiko oder Leiter." : def.paysBothWays ? "10 Linien, beide Richtungen. Safe-Wild mit ×2, ×3 oder ×7. Keine Freispiele. Risiko und Gewinnleiter." : def.leiter && def.bookWild ? "Spiegel = Scatter + Wild. Im Bonus füllt ein Symbol die ganze Walze und zahlt auf allen Linien — auch mit Lücken, nicht nur nebeneinander. Top-Symbole ab 2, sonst ab 3. Danach Risiko oder Leiter." : def.leiter && def.freeSpinCount === 0 ? `${def.paylines.length} Linien · 2er oft schon Gewinn · keine Freispiele · Karten-Risiko oder Gewinnleiter.` : def.leiter ? `${def.paylines.length} Linien. Nach jedem Gewinn: Karten-Risiko oder Gewinnleiter.` : def.bookWild ? "Das Buch ist Scatter und Wild. Im Bonus füllt ein Symbol die ganze Walze und zahlt auf allen 10 Linien — auch wenn die Walzen nicht nebeneinander liegen. Bilder ab 2, Karten ab 3. 3 Bücher = 10 Freispiele, Retrigger möglich." : `${def.paylines.length} Linien · ${def.freeSpinCount} Freispiele ab ${def.freeSpinsFrom} Scatter.`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pay-machine mt-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pay-machine-head",
							children: "Symbol"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pay-machine-head",
							children: def.mechanic === "olympus" ? "8–9" : "3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pay-machine-head",
							children: def.mechanic === "olympus" ? "10–11" : "4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pay-machine-head",
							children: def.mechanic === "olympus" ? "12+" : "5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "pay-machine-head",
							children: "2"
						}),
						def.symbols.filter((s) => s.kind !== "scatter").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayRow, {
							art: s.art,
							label: s.label,
							pays: s.pays,
							pays2: s.pays2,
							stake
						}, s.id))
					]
				}),
				scatter && def.mechanic === "olympus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						"Scatter: 4 / 5 / 6 = ",
						formatEuro(Math.round(stake * 3)),
						" / ",
						formatEuro(Math.round(stake * 5)),
						" /",
						" ",
						formatEuro(Math.round(stake * 100)),
						" plus Freispiele. Im Bonus 3× = extra Spins. Orbs 2×–500×."
					]
				}) : scatter && def.freeSpinsFrom <= 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted",
					children: [
						scatter.label,
						": 3 / 4 / 5 = ",
						formatEuro(Math.round(stake * scatter.pays[0])),
						" /",
						" ",
						formatEuro(Math.round(stake * scatter.pays[1])),
						" / ",
						formatEuro(Math.round(stake * scatter.pays[2])),
						" · ",
						def.freeSpinsFrom,
						"× = ",
						def.freeSpinCount,
						" Freispiele",
						def.fsMultiplier > 1 ? ` · Bonus ×${def.fsMultiplier}` : "",
						"."
					]
				}) : null,
				wild ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						wild.label,
						" ersetzt jedes Symbol",
						def.bookWild ? " und ist Scatter." : " außer Scatter.",
						def.wildMults ? ` Auf dem Safe steht ×${def.wildMults.join(", ×")} — Multiplikatoren multiplizieren sich.` : "",
						def.stackedWilds ? " Wilds können eine ganze Walze füllen." : ""
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Kein Wild. Klassische Frucht-Auszahlung, oft schon ab 2 Symbolen."
				}),
				def.expandingSpecial ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Freispiele: Das Sondersymbol füllt die Walze und zahlt den Tabellenwert auf allen ",
						def.paylines.length,
						" ",
						"Linien — auch wenn die Treffer nicht nebeneinander stehen. Bilder oft schon ab 2, Karten ab 3."
					]
				}) : null,
				def.leiter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Risiko: Karten (Rot/Schwarz) oder Gewinnleiter. Die Leiter läuft langsam zwischen der nächsten Stufe und 0,00 — Aufspielen hält das Licht, wie in der Halle. Teilen sichert die Hälfte."
				}) : null
			]
		})
	});
}
function PayRow({ art, label, pays, pays2, stake }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "size-10 overflow-hidden rounded-sm",
			children: art ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: art,
				alt: "",
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-full w-full bg-elevated" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate text-fg",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-xs text-muted",
			children: formatEuro(Math.round(stake * pays[0]))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-xs text-muted",
			children: formatEuro(Math.round(stake * pays[1]))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-xs text-muted",
			children: formatEuro(Math.round(stake * pays[2]))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-xs text-muted",
			children: pays2 ? formatEuro(Math.round(stake * pays2)) : "—"
		})
	] });
}
var CARD_MAX = 6;
var HIST = 5;
var BACK = "/games/card-back-red.jpg";
function drawCard() {
	return makeCard(SUITS[randInt(SUITS.length)], RANKS[randInt(RANKS.length)]);
}
function reducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function Led({ cents, lit }) {
	const val = formatLed(cents);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "risk-led-ghost",
		"aria-hidden": true,
		children: ledGhost(val)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("risk-led-val", lit && "is-lit"),
		children: val
	})] });
}
function MerkurRisk({ amount, soundOn, onCollect, onBust, onBank }) {
	const [mode, setMode] = (0, import_react.useState)("pick");
	const [pot, setPot] = (0, import_react.useState)(amount);
	const [step, setStep] = (0, import_react.useState)(1);
	const [card, setCard] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [flipKey, setFlipKey] = (0, import_react.useState)(0);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [bust, setBust] = (0, import_react.useState)(false);
	const [flash, setFlash] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [bounce, setBounce] = (0, import_react.useState)("hi");
	const [landing, setLanding] = (0, import_react.useState)(null);
	const timers = (0, import_react.useRef)([]);
	const soundRef = (0, import_react.useRef)(soundOn);
	const bounceRef = (0, import_react.useRef)("hi");
	const lockedRef = (0, import_react.useRef)(false);
	const stopRef = (0, import_react.useRef)(() => {});
	soundRef.current = soundOn;
	lockedRef.current = locked;
	const rungs = (0, import_react.useMemo)(() => {
		const out = [0];
		for (let i = 0; i < CARD_MAX; i++) out.push(amount * 2 ** i);
		return out;
	}, [amount]);
	const hi = Math.min(step + 1, rungs.length - 1);
	const next = rungs[hi] ?? pot * 2;
	const atTop = step >= rungs.length - 1;
	(0, import_react.useEffect)(() => {
		return () => {
			timers.current.forEach((t) => window.clearTimeout(t));
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (mode !== "leiter" || locked || bust || atTop) return;
		const interval = reducedMotion() ? 90 : leiterBounceMs(step);
		const id = window.setInterval(() => {
			setBounce((b) => {
				const n = b === "hi" ? "zero" : "hi";
				bounceRef.current = n;
				if (soundRef.current) {
					if (n === "hi") sfx.leiterHi();
					else sfx.leiterZero();
				}
				return n;
			});
		}, interval);
		return () => window.clearInterval(id);
	}, [
		mode,
		locked,
		bust,
		atTop,
		step
	]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "Space" && e.code !== "Enter") return;
			if (mode !== "leiter") return;
			e.preventDefault();
			if (lockedRef.current) return;
			stopRef.current();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [mode]);
	function wait(ms) {
		return new Promise((resolve) => {
			const t = window.setTimeout(resolve, ms);
			timers.current.push(t);
		});
	}
	async function playColor(wantRed) {
		if (locked || bust || atTop) return;
		setLocked(true);
		setFlash(null);
		setOpen(false);
		setFlipKey((k) => k + 1);
		const drawn = drawCard();
		setCard(drawn);
		if (soundRef.current) sfx.deal();
		await wait(reducedMotion() ? 40 : 70);
		setOpen(true);
		await wait(reducedMotion() ? 120 : 560);
		const win = isRed$1(drawn.suit) === wantRed;
		setHistory((h) => [drawn, ...h].slice(0, HIST));
		if (win) {
			setFlash("win");
			const nxt = pot * 2;
			setPot(nxt);
			setStep((n) => n + 1);
			if (soundRef.current) sfx.gambleWin();
			if (step + 1 >= rungs.length - 1) {
				await wait(500);
				onCollect(nxt);
				return;
			}
			await wait(700);
			setOpen(false);
			setCard(null);
			setFlash(null);
			setFlipKey((k) => k + 1);
			setLocked(false);
			return;
		}
		setFlash("lose");
		setBust(true);
		if (soundRef.current) sfx.gambleLose();
		await wait(1100);
		onBust();
	}
	async function stopLeiter() {
		if (locked || bust || atTop) return;
		setLocked(true);
		lockedRef.current = true;
		const hit = bounceRef.current;
		setBounce(hit);
		setLanding(hit);
		await wait(reducedMotion() ? 180 : 720);
		if (hit === "hi") {
			const dest = hi;
			setStep(dest);
			setPot(rungs[dest]);
			if (soundRef.current) sfx.gambleWin();
			if (dest >= rungs.length - 1) {
				await wait(720);
				onCollect(rungs[dest]);
				return;
			}
			await wait(reducedMotion() ? 200 : 980);
			setLanding(null);
			bounceRef.current = "hi";
			setBounce("hi");
			setLocked(false);
			lockedRef.current = false;
			return;
		}
		setStep(0);
		setPot(0);
		setBust(true);
		if (soundRef.current) sfx.gambleLose();
		await wait(1400);
		onBust();
	}
	stopRef.current = () => {
		stopLeiter();
	};
	function takeHalf() {
		if (locked || bust || pot < 2) return;
		const half = Math.floor(pot / 2);
		const rest = pot - half;
		if (onBank && rest > 0 && step > 1) {
			onBank(half);
			setPot(rest);
			setStep((n) => Math.max(1, n - 1));
			setOpen(false);
			setCard(null);
			setFlash(null);
			setFlipKey((k) => k + 1);
			return;
		}
		onCollect(half);
	}
	if (mode === "pick") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "risk-screen absolute inset-0 z-30 flex flex-col items-center justify-center px-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "risk-kicker",
				children: "Risiko"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "risk-pot mt-2 font-display text-5xl tabular-nums leading-none",
				children: formatEuro(amount)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-sm text-muted",
				children: "Kartenrisiko oder Gewinnleiter."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid w-full max-w-sm grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "risk-pick",
					onPointerDown: () => setMode("card"),
					onClick: () => setMode("card"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: BACK,
						alt: "",
						className: "risk-pick-card"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Karten" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "risk-pick",
					onPointerDown: () => setMode("leiter"),
					onClick: () => setMode("leiter"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "risk-pick-ladder",
						"aria-hidden": true,
						children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: i === 0 || i === 3 ? "is-on" : void 0 }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Leiter" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "risk-btn risk-btn-take mt-4 h-14 w-full max-w-sm",
				onClick: () => onCollect(amount),
				children: "Nehmen"
			})
		]
	});
	if (mode === "leiter") {
		const lit = landing ?? bounce;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("risk-screen risk-screen-leiter absolute inset-0 z-30 flex flex-col px-3 pb-3 pt-2", bust && "risk-screen-bust"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "risk-ladder-frame mx-auto flex min-h-0 w-full max-w-[18rem] flex-1 flex-col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "risk-ladder",
						children: rungs.map((v, i) => {
							const isHi = i === hi && !atTop;
							const isZero = i === 0;
							const on = lit === "hi" && isHi || lit === "zero" && isZero;
							const here = i === step && !on;
							const climbed = i > 0 && i < step;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: cn("risk-rung", isZero && "risk-rung-zero", climbed && "risk-rung-won", here && "risk-rung-now", on && (isZero ? "risk-rung-run-zero" : "risk-rung-run"), bust && "risk-rung-dead"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Led, {
									cents: v,
									lit: on || here || climbed
								})
							}, i);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: locked || bust || atTop,
					onClick: () => void stopLeiter(),
					className: "risk-btn risk-btn-stop mt-3 h-16 w-full max-w-[18rem] self-center text-lg tracking-[0.2em]",
					children: "Aufspielen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid w-full max-w-[18rem] grid-cols-2 gap-2 self-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: locked || bust || pot < 2,
						onClick: takeHalf,
						className: "risk-btn risk-btn-half",
						children: "Hälfte"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: locked || bust,
						onClick: () => onCollect(pot),
						className: "risk-btn risk-btn-take",
						children: "Nehmen"
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("risk-screen risk-screen-cards absolute inset-0 z-30 flex flex-col px-3 py-3 sm:px-5", bust && "risk-screen-bust"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "risk-kicker",
					children: "Risiko-Einsatz"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "risk-pot mt-1 font-display text-3xl tabular-nums leading-none sm:text-4xl",
					children: formatEuro(pot)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "risk-kicker",
					children: "Gewinn bei Risiko"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "risk-pot mt-1 font-display text-3xl tabular-nums leading-none sm:text-4xl",
					children: atTop ? "—" : formatEuro(next)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "risk-hist",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "risk-hist-label",
					children: "Letzte Karten"
				}), Array.from({ length: HIST }).map((_, i) => {
					const c = history[i];
					return c ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
						card: c,
						size: "mini",
						animated: false
					}, c.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: BACK,
						alt: "",
						className: "risk-mini-back"
					}, `b${i}`);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "risk-card-stage",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvalButton, {
						color: "red",
						disabled: locked || bust || atTop,
						onClick: () => void playColor(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("risk-flip", flash === "win" && "risk-card-win", flash === "lose" && "risk-card-lose"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("risk-flip-inner", open && card && "is-open"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "risk-face risk-face-back",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: BACK,
									alt: ""
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "risk-face risk-face-front",
								children: card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
									card,
									size: "risk",
									animated: false
								}) : null
							})]
						}, flipKey)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvalButton, {
						color: "black",
						disabled: locked || bust || atTop,
						onClick: () => void playColor(false)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 min-h-5 text-center text-[11px] uppercase tracking-[0.16em] text-muted",
				children: bust ? "Verloren" : flash === "win" ? "Verdoppelt" : "Rot oder Schwarz"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: locked || bust || pot < 2,
					onClick: takeHalf,
					className: "risk-btn risk-btn-half",
					children: ["Hälfte · ", formatEuro(Math.floor(pot / 2))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: locked || bust,
					onClick: () => onCollect(pot),
					className: "risk-btn risk-btn-take",
					children: "Nehmen"
				})]
			})
		]
	});
}
function OvalButton({ color, disabled, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		disabled,
		onClick,
		className: cn("risk-oval", color === "red" ? "risk-oval-red" : "risk-oval-black"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "risk-oval-band",
			children: color === "red" ? "Rot" : "Schwarz"
		})
	});
}
var AUTO_OPTS$1 = [
	10,
	25,
	50,
	100
];
var DECO = {
	"pharaos-erbe": {
		leftVid: "/games/char-anubis.mp4",
		rightVid: "/games/char-pharaoh.mp4",
		leftImg: "/games/char-anubis.jpg",
		rightImg: "/games/char-pharaoh.jpg",
		header: "/games/header-wings.jpg"
	},
	nordlicht: {
		leftVid: "/games/char-wolf.mp4",
		rightVid: "/games/char-wolf.mp4",
		leftImg: "/games/char-wolf.jpg",
		rightImg: "/games/char-wolf.jpg",
		flipRight: true
	},
	kirschkoenig: {
		leftVid: "/games/char-cherry.mp4",
		rightVid: "/games/char-cherry.mp4",
		leftImg: "/games/char-cherry.jpg",
		rightImg: "/games/char-cherry.jpg",
		flipRight: true
	},
	saphirnacht: {
		leftVid: "/games/char-gem.mp4",
		rightVid: "/games/char-gem.mp4",
		leftImg: "/games/char-gem.jpg",
		rightImg: "/games/char-gem.jpg",
		flipRight: true
	},
	"neon-drift": {
		leftVid: "/games/char-gem.mp4",
		rightVid: "/games/char-gem.mp4",
		leftImg: "/games/char-gem.jpg",
		rightImg: "/games/char-gem.jpg",
		flipRight: true
	},
	drachenfeuer: {
		leftVid: "/games/char-anubis.mp4",
		rightVid: "/games/char-pharaoh.mp4",
		leftImg: "/games/char-anubis.jpg",
		rightImg: "/games/char-pharaoh.jpg"
	},
	goldwolf: {
		leftVid: "/games/char-wolf.mp4",
		rightVid: "/games/char-wolf.mp4",
		leftImg: "/games/char-wolf.jpg",
		rightImg: "/games/char-wolf.jpg",
		flipRight: true
	},
	sternenblitz: {
		leftVid: "/games/char-gem.mp4",
		rightVid: "/games/char-gem.mp4",
		leftImg: "/games/char-gem.jpg",
		rightImg: "/games/char-gem.jpg",
		flipRight: true
	}
};
function SlotView({ slug }) {
	const def = SLOT_DEFS[slug];
	const info = gameBySlug(slug);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betIndex, setBetIndex] = (0, import_react.useState)(() => {
		const i = def?.betSteps.indexOf(def.defaultBet) ?? 0;
		return Math.max(0, i);
	});
	const [coinIdx, setCoinIdx] = (0, import_react.useState)(() => {
		const n = def?.paylines.length ?? 5;
		const steps = n >= 10 ? [
			2,
			5,
			10,
			20,
			50,
			100,
			200
		] : [
			4,
			10,
			20,
			40,
			100,
			200,
			400
		];
		const want = Math.round((def?.defaultBet ?? 100) / n);
		const i = steps.findIndex((c) => c >= want);
		return Math.max(0, i < 0 ? steps.length - 1 : i);
	});
	const [lineCount, setLineCount] = (0, import_react.useState)(() => def?.paylines.length ?? 5);
	const [autoStop, setAutoStop] = (0, import_react.useState)("none");
	const [reels, setReels] = (0, import_react.useState)(() => def ? Array.from({ length: 5 }, (_, i) => ({
		strip: [
			def.symbols[i % def.symbols.length],
			def.symbols[(i + 1) % def.symbols.length],
			def.symbols[(i + 2) % def.symbols.length]
		],
		offset: 0,
		spinning: false,
		settleMs: REEL_STOP_MS[i] ?? 2e3
	})) : []);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const [displayWin, setDisplayWin] = (0, import_react.useState)(0);
	const [freeSpins, setFreeSpins] = (0, import_react.useState)(0);
	const [fsTotal, setFsTotal] = (0, import_react.useState)(0);
	const [autoLeft, setAutoLeft] = (0, import_react.useState)(0);
	const [autoOpen, setAutoOpen] = (0, import_react.useState)(false);
	const [turbo, setTurbo] = (0, import_react.useState)(false);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [fsPhase, setFsPhase] = (0, import_react.useState)("idle");
	const [fsAward, setFsAward] = (0, import_react.useState)(0);
	const [special, setSpecial] = (0, import_react.useState)(null);
	const [pickIndex, setPickIndex] = (0, import_react.useState)(0);
	const [expanded, setExpanded] = (0, import_react.useState)([]);
	const [spinKey, setSpinKey] = (0, import_react.useState)(0);
	const [bigWin, setBigWin] = (0, import_react.useState)(false);
	const [statueWin, setStatueWin] = (0, import_react.useState)(false);
	const [scatterLit, setScatterLit] = (0, import_react.useState)(0);
	const [vanish, setVanish] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [cascadeLv, setCascadeLv] = (0, import_react.useState)(0);
	const [frozen, setFrozen] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [gems, setGems] = (0, import_react.useState)(0);
	const [link, setLink] = (0, import_react.useState)(null);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const [gamble, setGamble] = (0, import_react.useState)(null);
	const [lineCursor, setLineCursor] = (0, import_react.useState)(0);
	const timers = (0, import_react.useRef)([]);
	const freeRef = (0, import_react.useRef)(0);
	const pityRef = (0, import_react.useRef)(0);
	const specialRef = (0, import_react.useRef)(null);
	const frozenRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const cascadeMultRef = (0, import_react.useRef)(1);
	const gridRef = (0, import_react.useRef)(null);
	const linkRef = (0, import_react.useRef)(link);
	const turboRef = (0, import_react.useRef)(false);
	const soundRef = (0, import_react.useRef)(soundOn);
	const busyRef = (0, import_react.useRef)(false);
	const gambleRef = (0, import_react.useRef)(null);
	const celebrateRef = (0, import_react.useRef)(celebrate);
	const fsPhaseRef = (0, import_react.useRef)(fsPhase);
	const autoRef = (0, import_react.useRef)(0);
	const spinRef = (0, import_react.useRef)(() => {});
	const linesRef = (0, import_react.useRef)(5);
	const autoStopRef = (0, import_react.useRef)("none");
	const merkurLines = Boolean(info?.family === "merkur" && def && def.mechanic !== "ways" && !def.stackedWilds && def.paylines.length >= 3);
	const coinSteps = (def?.paylines.length ?? 5) >= 10 ? [
		2,
		5,
		10,
		20,
		50,
		100,
		200
	] : [
		4,
		10,
		20,
		40,
		100,
		200,
		400
	];
	const coin = coinSteps[Math.min(coinIdx, coinSteps.length - 1)] ?? 20;
	const bet = merkurLines ? coin * lineCount : def?.betSteps[betIndex] ?? 100;
	const gameName = info?.name ?? slug;
	const inFs = freeSpins > 0 && fsPhase === "idle";
	const mult = inFs ? def?.fsMultiplier ?? 1 : 1;
	const deco = DECO[slug];
	const theme = SLOT_THEMES[slug];
	const pool = def ? specialPool(def) : [];
	const scatterSym = def?.symbols.find((s) => s.kind === "scatter");
	const fifthSpinning = Boolean(reels[4]?.spinning);
	const anticipating = busy && scatterLit >= 2 && fifthSpinning && !link;
	const gemTarget = def?.gemTarget ?? 12;
	const fireFrom = def?.firelinkFrom ?? 5;
	const winCells = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		const wins = last?.lineWins ?? [];
		if (!busy && wins.length > 1) wins[lineCursor % wins.length]?.cells.forEach((c) => set.add(`${c.reel}-${c.row}`));
		else wins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
		if (last && last.scatterCount >= 3) last.grid.forEach((col, ri) => col.forEach((s, row) => {
			if (s.kind === "scatter") set.add(`${ri}-${row}`);
		}));
		expanded.forEach((ri) => {
			set.add(`${ri}-0`);
			set.add(`${ri}-1`);
			set.add(`${ri}-2`);
		});
		return set;
	}, [
		last,
		expanded,
		busy,
		lineCursor
	]);
	(0, import_react.useEffect)(() => {
		return () => {
			timers.current.forEach((t) => window.clearTimeout(t));
			stopRumble();
			stopBed();
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (slug) touchGame(slug);
	}, [slug, touchGame]);
	(0, import_react.useEffect)(() => {
		if (!soundOn || !def) return;
		const freq = theme?.skin === "egypt" ? 98 : theme?.skin === "huff" ? 82 : theme?.skin === "dragon" ? 73 : 110;
		startBed(freq);
		return () => stopBed();
	}, [
		soundOn,
		def,
		theme?.skin
	]);
	(0, import_react.useEffect)(() => {
		if (busy || !last?.lineWins.length) return;
		const t = window.setInterval(() => setLineCursor((n) => n + 1), 880);
		return () => window.clearInterval(t);
	}, [last, busy]);
	(0, import_react.useEffect)(() => {
		freeRef.current = freeSpins;
	}, [freeSpins]);
	(0, import_react.useEffect)(() => {
		specialRef.current = special;
	}, [special]);
	(0, import_react.useEffect)(() => {
		frozenRef.current = frozen;
	}, [frozen]);
	(0, import_react.useEffect)(() => {
		linkRef.current = link;
	}, [link]);
	(0, import_react.useEffect)(() => {
		turboRef.current = turbo;
	}, [turbo]);
	(0, import_react.useEffect)(() => {
		soundRef.current = soundOn;
	}, [soundOn]);
	(0, import_react.useEffect)(() => {
		busyRef.current = busy;
	}, [busy]);
	(0, import_react.useEffect)(() => {
		gambleRef.current = gamble;
	}, [gamble]);
	(0, import_react.useEffect)(() => {
		celebrateRef.current = celebrate;
	}, [celebrate]);
	(0, import_react.useEffect)(() => {
		fsPhaseRef.current = fsPhase;
	}, [fsPhase]);
	(0, import_react.useEffect)(() => {
		autoRef.current = autoLeft;
	}, [autoLeft]);
	(0, import_react.useEffect)(() => {
		linesRef.current = merkurLines ? lineCount : def?.paylines.length ?? 5;
	}, [
		lineCount,
		merkurLines,
		def?.paylines.length
	]);
	(0, import_react.useEffect)(() => {
		autoStopRef.current = autoStop;
	}, [autoStop]);
	(0, import_react.useEffect)(() => {
		if (fsPhase !== "pick" || !def) return;
		const list = specialPool(def);
		let n = 0;
		const tick = window.setInterval(() => {
			n += 1;
			setPickIndex(n % list.length);
		}, 180);
		const stop = window.setTimeout(() => {
			window.clearInterval(tick);
			const chosen = pickSpecial(def);
			setSpecial(chosen);
			setPickIndex(Math.max(0, list.findIndex((s) => s.id === chosen.id)));
			setFsPhase("ready");
			if (soundOn) sfx.cash();
		}, 2800);
		return () => {
			window.clearInterval(tick);
			window.clearTimeout(stop);
		};
	}, [
		fsPhase,
		def,
		soundOn
	]);
	const wait = (0, import_react.useCallback)((ms) => {
		return new Promise((resolve) => {
			const t = window.setTimeout(resolve, ms);
			timers.current.push(t);
		});
	}, []);
	const showWin = (0, import_react.useCallback)((payout, stakeAmt) => {
		const tier = winTier(payout, stakeAmt);
		animateCount(payout);
		if (tier === "none") return;
		setBigWin(true);
		setStatueWin(true);
		window.setTimeout(() => setStatueWin(false), 2200);
		setCelebrate({
			payout,
			stake: stakeAmt,
			tier
		});
	}, []);
	const dismissWin = (0, import_react.useCallback)(() => setCelebrate(null), []);
	(0, import_react.useEffect)(() => {
		if (fsPhase !== "idle" || busy || !def) return;
		if (celebrate || gamble || link && link.phase !== "off" && link.phase !== "intro") return;
		if (autoLeft > 0 || freeSpins > 0) {
			const t = window.setTimeout(() => runSpin(), freeSpins > 0 ? 720 : 420);
			return () => window.clearTimeout(t);
		}
	}, [
		autoLeft,
		busy,
		freeSpins,
		fsPhase,
		celebrate,
		gamble,
		link
	]);
	(0, import_react.useEffect)(() => {
		if (!link || link.phase !== "intro" || celebrate) return;
		const t = window.setTimeout(() => void respinLink(), turbo ? 360 : 720);
		return () => window.clearTimeout(t);
	}, [link, celebrate]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.code !== "Space") return;
			e.preventDefault();
			unlockAudio();
			if (celebrateRef.current) {
				setCelebrate(null);
				return;
			}
			if (busyRef.current || fsPhaseRef.current !== "idle" || gambleRef.current != null) return;
			if (linkRef.current && linkRef.current.phase !== "off") return;
			spinRef.current();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!def || !info) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-muted",
		children: [
			"Spiel nicht gefunden.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-accent",
				children: "Zurück zur Lobby"
			})
		]
	});
	function stopTimes() {
		if (turboRef.current) return REEL_TURBO_MS.slice();
		if (info?.family === "merkur") return REEL_STOP_MERKUR.slice();
		if (def.mechanic === "burst") return REEL_STOP_BURST.slice();
		if (def.mechanic === "firelink") return REEL_STOP_HOLD.slice();
		if (info?.family === "pragmatic") return REEL_STOP_PRAG.slice();
		return REEL_STOP_MS.slice();
	}
	function paintGrid(grid, spinning, times) {
		setReels(grid.map((col, i) => ({
			strip: paintStrip(def, col, i, 30),
			offset: 30,
			spinning,
			settleMs: times[i] ?? REEL_STOP_MS[i] ?? 2e3
		})));
	}
	function runSpin() {
		unlockAudio();
		if (busyRef.current || !def) return;
		if (linkRef.current && linkRef.current.phase !== "off") return;
		if (gambleRef.current != null) return;
		const isFree = freeRef.current > 0 && fsPhaseRef.current === "idle";
		if (!isFree) {
			if (balance < bet) {
				setAutoLeft(0);
				setCashier(true);
				return;
			}
			if (!placeBet(bet, `${gameName} · Einsatz`)) return;
			if (autoRef.current > 0) setAutoLeft((n) => Math.max(0, n - 1));
		} else setFreeSpins((n) => Math.max(0, n - 1));
		if (soundRef.current) sfx.spin();
		startRumble();
		setBusy(true);
		busyRef.current = true;
		setLast(null);
		setDisplayWin(0);
		setBigWin(false);
		setExpanded([]);
		setScatterLit(0);
		setVanish(/* @__PURE__ */ new Set());
		setCascadeLv(0);
		setGamble(null);
		setSpinKey((k) => k + 1);
		if (!isFree && def.tumble) cascadeMultRef.current = 1;
		if (!isFree) pityRef.current += 1;
		let force = 0;
		if (!isFree && pityRef.current >= (def.pityAfter ?? 22)) {
			force = def.mechanic === "firelink" ? 0 : def.symbols.some((s) => s.kind === "scatter") && (def.freeSpinsFrom ?? 99) <= 6 ? 3 : 0;
			if (def.mechanic !== "firelink") pityRef.current = 0;
		}
		let raw = spinGrid(def, force);
		if (!isFree && force === 0 && pityRef.current === 0 && def.leiter) {
			const high = def.symbols.find((s) => s.kind === "high") ?? def.symbols[0];
			for (let i = 0; i < Math.min(3, def.reels); i++) raw[i][1] = high;
		}
		if (def.mechanic === "firelink" && !isFree && pityRef.current >= (def.pityAfter ?? 16)) {
			const pearl = def.symbols.find((s) => s.id === "pearl") ?? def.symbols.find((s) => s.id === "coin");
			if (pearl) {
				raw = forceCoins(raw, pearl, fireFrom);
				pityRef.current = 0;
			}
		}
		if (isFree && def.mechanic === "sticky") {
			const wild = def.symbols.find((s) => s.kind === "wild");
			if (wild && frozenRef.current.size) raw = applySticky(raw, frozenRef.current, wild);
		}
		const spec = isFree && def.expandingSpecial ? specialRef.current : null;
		gridRef.current = raw;
		const times = stopTimes();
		const scatterReels = raw.filter((col) => col.some((s) => s.kind === "scatter")).length;
		if (scatterReels >= 2) times[times.length - 1] = (times[times.length - 1] ?? 2e3) + (turboRef.current ? 500 : 1400);
		const mid = raw[0]?.[1];
		if (def.leiter && mid && raw[1]?.[1]?.id === mid.id && mid.kind !== "low") times[times.length - 1] = (times[times.length - 1] ?? 1600) + (turboRef.current ? 280 : 720);
		paintGrid(raw, true, times);
		times.forEach((ms, i) => {
			const t = window.setTimeout(() => {
				if (soundRef.current) sfx.stop(i);
				setReels((cols) => cols.map((c, idx) => idx === i ? {
					...c,
					spinning: false
				} : c));
				const landed = raw[i].filter((s) => s.kind === "scatter").length;
				if (landed) {
					setScatterLit((n) => n + landed);
					if (soundRef.current) sfx.scatter();
				}
				if (i === 3 && scatterReels >= 2 && soundRef.current) sfx.anticipate();
				if (i === 4) {
					stopRumble();
					if (spec) {
						const t2 = window.setTimeout(() => void afterLand(raw, raw, isFree, spec), turboRef.current ? 200 : 480);
						timers.current.push(t2);
					} else afterLand(raw, raw, isFree);
				}
			}, ms);
			timers.current.push(t);
		});
	}
	spinRef.current = runSpin;
	async function afterLand(evalGrid, raw, isFree, bookSpecial) {
		if (!def) return;
		const baseMult = isFree ? def.fsMultiplier : 1;
		if (def.tumble) {
			settleResult(await runCascades(evalGrid, bet, baseMult, isFree), raw, isFree);
			return;
		}
		if (def.mechanic === "burst") {
			await runBurst(raw, isFree);
			return;
		}
		if (bookSpecial && def.expandingSpecial) {
			const exp = expandGrid(raw, bookSpecial, expandMinCount(bookSpecial));
			if (exp.expandedReels.length) {
				if (soundRef.current) sfx.expand();
				for (let row = 0; row < def.rows; row++) {
					const r = row;
					setReels((cols) => cols.map((c, idx) => {
						if (!exp.expandedReels.includes(idx)) return c;
						const strip = c.strip.slice();
						const pos = 30 + r;
						if (strip[pos]) strip[pos] = bookSpecial;
						return {
							...c,
							strip
						};
					}));
					await wait(turboRef.current ? 70 : 180);
				}
				setExpanded(exp.expandedReels);
				await wait(turboRef.current ? 200 : 520);
			}
			const result = evaluateBookSpin(def, raw, bookSpecial, bet, baseMult);
			settleResult(result, result.grid, isFree);
			return;
		}
		const lines = linesRef.current;
		const result = evaluateSpin(def, evalGrid, bet, baseMult, lines);
		const scatterEval = evaluateSpin(def, raw, bet, baseMult, lines);
		settleResult({
			...result,
			scatterCount: scatterEval.scatterCount,
			scatterPayout: scatterEval.scatterPayout,
			freeSpinsAwarded: scatterEval.freeSpinsAwarded,
			totalPayout: result.lineWins.reduce((s, w) => s + w.payout, 0) + scatterEval.scatterPayout,
			expandedReels: result.expandedReels,
			grid: evalGrid
		}, raw, isFree);
	}
	async function runBurst(raw, isFree) {
		if (!def) return;
		let grid = raw;
		const sticky = /* @__PURE__ */ new Set();
		let total = 0;
		let last = evaluateSpin(def, grid, bet, 1, linesRef.current);
		for (let n = 0; n < 5; n++) {
			const exp = expandBurst(def, grid);
			if (exp.expanded.length) {
				grid = exp.grid;
				setExpanded(exp.expanded);
				paintGrid(grid, false, stopTimes());
				if (soundRef.current) sfx.expand();
				await wait(turboRef.current ? 180 : 420);
			}
			last = evaluateSpin(def, grid, bet, 1, linesRef.current);
			const pay = last.lineWins.reduce((s, w) => s + w.payout, 0);
			total += pay;
			setLast({
				...last,
				totalPayout: total,
				grid
			});
			setDisplayWin(total);
			const fresh = exp.expanded.filter((r) => !sticky.has(r));
			for (const r of exp.expanded) sticky.add(r);
			if (fresh.length === 0) break;
			await wait(turboRef.current ? 120 : 280);
			const next = spinGrid(def);
			for (const r of sticky) next[r] = grid[r];
			grid = next;
			setSpinKey((k) => k + 1);
			paintGrid(grid, true, turboRef.current ? REEL_TURBO_MS : REEL_STOP_MS);
			if (soundRef.current) sfx.spin();
			await wait(turboRef.current ? 500 : 1400);
			paintGrid(grid, false, stopTimes());
			await wait(turboRef.current ? 80 : 160);
		}
		settleResult({
			...last,
			totalPayout: total,
			grid
		}, grid, isFree);
	}
	async function runCascades(initial, stakeAmt, baseMult, isFree) {
		if (!def) return evaluateSpin(SLOT_DEFS["neon-drift"], initial, stakeAmt, baseMult);
		let grid = initial;
		let total = 0;
		let scatterPay = 0;
		let scatterCount = 0;
		let fsAwarded = 0;
		const lines = linesRef.current;
		let lastResult = evaluateSpin(def, grid, stakeAmt, baseMult, lines);
		for (let level = 0; level < 12; level++) {
			const persist = isFree && def.mechanic === "ways";
			const m = persist ? cascadeMultRef.current : baseMult * (level + 1);
			const result = evaluateSpin(def, grid, stakeAmt, m, lines);
			if (level === 0) {
				scatterPay = result.scatterPayout;
				scatterCount = result.scatterCount;
				fsAwarded = result.freeSpinsAwarded;
			}
			const linePay = result.lineWins.reduce((s, w) => s + w.payout, 0);
			if (linePay <= 0) {
				lastResult = {
					...result,
					scatterCount,
					scatterPayout: scatterPay,
					freeSpinsAwarded: fsAwarded,
					totalPayout: total + (level === 0 ? scatterPay : 0),
					grid
				};
				break;
			}
			total += linePay + (level === 0 ? scatterPay : 0);
			lastResult = {
				...result,
				scatterCount,
				scatterPayout: scatterPay,
				freeSpinsAwarded: fsAwarded,
				totalPayout: total,
				grid
			};
			setLast(lastResult);
			setDisplayWin(total);
			setCascadeLv(level + 1);
			const keys = winningCellKeys(result);
			setVanish(keys);
			if (soundRef.current) sfx.explode();
			await wait(turboRef.current ? 240 : 560);
			grid = dropAndFill(def, grid, keys);
			gridRef.current = grid;
			setVanish(/* @__PURE__ */ new Set());
			paintGrid(grid, false, stopTimes());
			setSpinKey((k) => k + 1);
			if (persist) cascadeMultRef.current += 1;
			if (soundRef.current) sfx.tumble();
			await wait(turboRef.current ? 160 : 340);
		}
		return lastResult;
	}
	function settleResult(result, raw, isFree) {
		if (!def) return;
		setLast(result);
		setBusy(false);
		busyRef.current = false;
		gridRef.current = raw;
		if (def.mechanic === "sticky") {
			const next = new Set(isFree ? frozenRef.current : /* @__PURE__ */ new Set());
			collectWildKeys(raw).forEach((k) => next.add(k));
			if (isFree || result.freeSpinsAwarded) setFrozen(next);
			if (!isFree && !result.freeSpinsAwarded) setFrozen(/* @__PURE__ */ new Set());
		}
		if (def.mechanic === "gems" && !isFree) setGems((n) => {
			const next = Math.min(gemTarget, n + countGems(raw));
			if (n < gemTarget && next >= gemTarget) window.setTimeout(() => {
				setFreeSpins((v) => v + def.freeSpinCount);
				setFsTotal((v) => v + def.freeSpinCount);
				setGems(0);
				if (soundRef.current) sfx.bonus();
			}, 400);
			return next;
		});
		if (def.mechanic === "fish" && isFree) {
			let fishers = 0;
			let fishPay = 0;
			raw.forEach((col) => col.forEach((s) => {
				if (s.kind === "wild") fishers += 1;
				if (s.id === "fish") fishPay += Math.round(bet * (s.wildMult ?? 2));
			}));
			if (fishers > 0 && fishPay > 0) {
				result = {
					...result,
					totalPayout: result.totalPayout + fishPay * fishers,
					freeSpinsAwarded: result.freeSpinsAwarded + (fishers >= 2 ? 2 : 0)
				};
				setLast(result);
			}
		}
		if (result.freeSpinsAwarded) {
			pityRef.current = 0;
			if (isFree) {
				setFreeSpins((v) => v + result.freeSpinsAwarded);
				setFsTotal((v) => v + result.freeSpinsAwarded);
				if (soundRef.current) sfx.bonus();
			} else {
				setFsAward(result.freeSpinsAwarded);
				setFsPhase("intro");
				setAutoLeft(0);
				if (soundRef.current) sfx.bonus();
			}
		}
		if (def.mechanic === "firelink") {
			const coins = collectCoins(raw, def);
			if (coins.length >= fireFrom) {
				pityRef.current = 0;
				setAutoLeft(0);
				setLink({
					coins,
					left: 3,
					phase: "intro"
				});
				if (soundRef.current) sfx.bonus();
			}
		}
		if (result.totalPayout > 0) {
			if ((def.leiter || def.mechanic === "gamble") && !isFree && autoRef.current <= 0 && !result.freeSpinsAwarded) {
				setGamble(result.totalPayout);
				animateCount(result.totalPayout);
				if (soundRef.current) sfx.win(result.totalPayout >= bet * 8);
			} else {
				creditWin(result.totalPayout, `${gameName} · Gewinn`);
				if (soundRef.current) sfx.win(result.totalPayout >= bet * 8);
				showWin(result.totalPayout, bet);
			}
			if (!isFree && autoStopRef.current === "win") setAutoLeft(0);
		} else if (soundRef.current) sfx.lose();
		if (isFree && freeRef.current <= 1 && def.mechanic === "sticky") window.setTimeout(() => setFrozen(/* @__PURE__ */ new Set()), 500);
	}
	async function respinLink() {
		const cur = linkRef.current;
		if (!cur || !def || cur.phase === "collect") return;
		if (cur.left <= 0 || cur.coins.length >= 15) {
			finishLink(cur.coins);
			return;
		}
		setLink({
			...cur,
			phase: "spin"
		});
		setBusy(true);
		busyRef.current = true;
		setSpinKey((k) => k + 1);
		if (soundRef.current) sfx.spin();
		startRumble();
		const pearl = def.symbols.find((s) => s.id === "pearl") ?? def.symbols.find((s) => s.id === "coin") ?? def.symbols[0];
		const locked = new Set(cur.coins.map((c) => `${c.reel}-${c.row}`));
		const base = gridRef.current ?? spinGrid(def);
		for (const c of cur.coins) base[c.reel][c.row] = pearl;
		const raw = fillUnlocked(def, base, locked);
		for (const c of cur.coins) raw[c.reel][c.row] = pearl;
		gridRef.current = raw;
		const times = stopTimes().map((ms) => Math.min(ms, turboRef.current ? 520 : 980));
		paintGrid(raw, true, times);
		await wait(Math.max(...times));
		stopRumble();
		setReels((cols) => cols.map((c) => ({
			...c,
			spinning: false
		})));
		if (soundRef.current) sfx.stop(4);
		const coins = collectCoins(raw, def, cur.coins);
		const left = coins.length > cur.coins.length ? 3 : cur.left - 1;
		setLink({
			coins,
			left,
			phase: left <= 0 || coins.length >= 15 ? "collect" : "intro"
		});
		setBusy(false);
		busyRef.current = false;
		if (left <= 0 || coins.length >= 15) finishLink(coins);
	}
	function finishLink(coins) {
		if (!def) return;
		const payout = coinPayout(coins, bet);
		setLink({
			coins,
			left: 0,
			phase: "collect"
		});
		if (payout > 0) {
			creditWin(payout, `${gameName} · Fire Link`);
			showWin(payout, bet);
		}
	}
	function closeLink() {
		setLink(null);
	}
	function beginBonus() {
		if (def?.expandingSpecial) setFsPhase("pick");
		else {
			setSpecial(null);
			startFreeSpins(fsAward);
		}
	}
	function startFreeSpins(n) {
		setFreeSpins((v) => v + n);
		setFsTotal((v) => v + n);
		setFsPhase("idle");
		if (def?.tumble) cascadeMultRef.current = 1;
		if (soundOn) sfx.cash();
	}
	function animateCount(target) {
		const merkur = info?.family === "merkur";
		const start = performance.now();
		const dur = merkur ? Math.min(2800, 720 + target / 3) : Math.min(1100, 280 + target / 6);
		const tick = (now) => {
			const p = Math.min(1, (now - start) / dur);
			const eased = 1 - Math.pow(1 - p, merkur ? 2 : 3);
			const raw = Math.round(target * eased);
			setDisplayWin(merkur && p < 1 ? Math.round(raw / 10) * 10 : raw);
			if (p < 1) requestAnimationFrame(tick);
			else setDisplayWin(target);
		};
		requestAnimationFrame(tick);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6", theme && `slot-skin-${theme.skin}`),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: info.image,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 slot-dust" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 slot-glyphs" }),
			deco ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideStatue, {
				video: deco.leftVid,
				image: deco.leftImg,
				side: "left",
				win: statueWin,
				inFs,
				filter: theme?.leftFilter
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideStatue, {
				video: deco.rightVid,
				image: deco.rightImg,
				side: "right",
				win: statueWin,
				inFs,
				flip: deco.flipRight,
				filter: theme?.rightFilter
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[42rem] flex-col px-2 pb-10 pt-2 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80 hover:text-fg",
								"aria-label": "Lobby",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative z-20 min-w-0 flex-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.32em] text-[var(--slot-line,var(--color-accent))]",
									children: theme?.kicker ?? "Aurelia · Slots"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl text-fg sm:text-4xl",
									children: info.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg",
								"aria-label": "Gewinntabelle",
								onClick: () => setPayOpen(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" })
							})
						]
					}),
					deco?.header ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: deco.header,
						alt: "",
						className: "mx-auto -mt-1 mb-1 h-12 w-auto object-contain mix-blend-screen sm:h-16"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("slot-bezel", theme && `slot-skin-${theme.skin}`, bigWin && "slot-shake"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("slot-cabinet relative overflow-hidden", inFs && "slot-fs-glow"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center justify-between gap-2 px-1",
									children: [def.freeSpinsFrom <= 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScatterLamps, {
										art: scatterSym?.art,
										lit: Math.max(scatterLit, last?.scatterCount ?? 0),
										need: def.freeSpinsFrom,
										label: scatterSym?.label ?? "Scatter",
										count: def.freeSpinCount
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] uppercase tracking-wider text-muted",
										children: def.leiter ? def.paysBothWays ? "10 Linien · beide Richtungen · Risiko" : def.stackedWilds ? "243 Wege · Stacked Wilds · Risiko" : `${def.paylines.length} Linien · Risiko · Leiter` : def.paysBothWays ? "10 Linien · beide Richtungen" : `${def.paylines.length} Linien`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-[11px] uppercase tracking-wider tabular-nums text-accent",
										children: info.rtp
									})]
								}),
								def.mechanic === "gems" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GemMeter, {
									value: gems,
									max: gemTarget
								}) : null,
								def.mechanic === "firelink" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-2 text-center text-[11px] uppercase tracking-wider text-muted",
									children: link ? `Fire Link · ${link.coins.length}/15 · ${link.left} Respins` : `${fireFrom}× Feuer = Fire Link · Mini 20× · Minor 50× · Major 200× · Grand 1000×`
								}) : null,
								inFs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-2 text-center font-display text-lg tracking-wide text-accent",
									children: [
										"Freispiel ",
										Math.max(1, fsTotal - freeSpins),
										" / ",
										fsTotal,
										special ? ` · ${special.label} füllt die Walze` : "",
										def.expandingSpecial && special ? " · zahlt auf allen Linien" : "",
										def.tumble ? ` · Tumble ×${cascadeMultRef.current}` : def.mechanic === "ways" ? " · 243 Wege" : mult > 1 ? ` · ×${mult}` : "",
										def.mechanic === "sticky" ? ` · ${frozen.size} Frozen` : ""
									]
								}) : cascadeLv > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-2 text-center font-display text-lg tracking-wide text-accent",
									children: ["Tumble ×", cascadeLv]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mb-2 text-center text-[11px] uppercase tracking-wider text-muted",
									children: [def.tumble ? "243 Wege · Tumble" : def.mechanic === "ways" ? "243 Wege · gestapelte Wilds" : def.bookWild ? `${scatterSym?.label ?? "Buch"} = Scatter + Wild · Expanding zahlt auf allen Linien, auch mit Lücken` : def.leiter ? "Nach dem Gewinn: Karte oder Leiter" : def.mechanic === "gamble" ? "Risiko nach Gewinn" : `${def.paylines.length} Linien`, def.freeSpinCount > 0 && def.freeSpinsFrom <= 6 ? ` · ${def.freeSpinCount} Freispiele` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative grid grid-cols-[22px_1fr_22px] gap-1 sm:grid-cols-[28px_1fr_28px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayTicks, {
											side: "left",
											count: Math.min(merkurLines ? lineCount : def.paylines.length, 5),
											active: last?.lineWins.some((w) => w.expanding) ? def.paylines.map((_, i) => i) : last?.lineWins.length ? [last.lineWins[lineCursor % last.lineWins.length].line % 100] : []
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelBank, {
											reels,
											spinKey,
											busy,
											winCells,
											expanded,
											anticipate: anticipating,
											vanish,
											frozen: def.mechanic === "sticky" ? frozen : void 0,
											variant: theme?.reel ?? "photo",
											overlay: (ri, row) => {
												const coin = link?.coins.find((c) => c.reel === ri && c.row === row);
												if (coin) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "pointer-events-none absolute inset-x-0 bottom-0.5 z-10 text-center text-[10px] font-semibold tabular-nums text-accent",
													children: coin.jackpot ?? `${coin.mult}×`
												});
												const cell = last?.grid[ri]?.[row];
												if (cell?.wildMult && !busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "pointer-events-none absolute inset-x-0 bottom-0.5 z-10 text-center text-[10px] font-semibold tabular-nums text-accent",
													children: ["×", cell.wildMult]
												});
												return null;
											}
										}),
										def.paylines.length > 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayTicks, {
											side: "right",
											count: 5,
											offset: 5,
											active: last?.lineWins.some((w) => w.expanding) ? def.paylines.map((_, i) => i) : last?.lineWins.length ? [last.lineWins[lineCursor % last.lineWins.length].line % 100] : []
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 min-h-7 text-center text-sm",
									children: anticipating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tracking-wide text-accent",
										children: "Letzte Walze…"
									}) : link && link.phase !== "off" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tracking-wide text-accent",
										children: link.phase === "collect" ? formatEuro(coinPayout(link.coins, bet)) : `${link.coins.length} Feuer`
									}) : bigWin && !celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-2xl tracking-wide text-accent",
										children: "GROSSGEWINN"
									}) : last && last.totalPayout > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-win",
										children: (() => {
											const w = last.lineWins[lineCursor % Math.max(1, last.lineWins.length)];
											const label = w?.expanding ? `${w.count}× ${w.symbol.label} · ${w.ways ?? def.paylines.length} Linien · auch mit Lücken` : def.mechanic === "ways" ? `${last.lineWins.reduce((s, x) => s + (x.ways ?? 1), 0)} Wege` : `Linie ${(w?.line ?? 0) % 100 + 1}/${last.lineWins.length}`;
											const scatter = last.scatterCount >= 3 ? ` · ${last.scatterCount}× ${scatterSym?.label}` : "";
											const extra = last.expandedReels.length && !last.lineWins.some((x) => x.expanding) ? " · Expandiert" : "";
											const amount = w?.expanding ? last.totalPayout : last.lineWins[lineCursor % last.lineWins.length]?.payout ?? last.totalPayout;
											return `${label}${scatter}${extra} · ${formatEuro(amount)}`;
										})()
									}) : last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted",
										children: "Kein Gewinn"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-subtle",
										children: def.freeSpinCount > 0 && def.freeSpinsFrom <= 6 ? `3× ${scatterSym?.label ?? "Scatter"} = ${def.freeSpinCount} Freispiele` : def.leiter ? "Gewinn auf die Leiter oder kassieren" : `${def.paylines.length} Linien · Einsatz wählen`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [
										merkurLines ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "merkur-bet",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "merkur-bet-cell",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "size-11 text-fg",
														disabled: busy || inFs || coinIdx === 0,
														onClick: () => setCoinIdx((i) => Math.max(0, i - 1)),
														"aria-label": "Münze senken",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "min-w-0 flex-1 text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-[9px] uppercase tracking-wider text-subtle",
															children: "Münze"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm tabular-nums",
															children: formatEuro(coin)
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "size-11 text-fg",
														disabled: busy || inFs || coinIdx === coinSteps.length - 1,
														onClick: () => setCoinIdx((i) => Math.min(coinSteps.length - 1, i + 1)),
														"aria-label": "Münze erhöhen",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "merkur-bet-cell",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "size-11 text-fg",
														disabled: busy || inFs || lineCount <= 1,
														onClick: () => setLineCount((n) => Math.max(1, n - 1)),
														"aria-label": "Linien senken",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "min-w-0 flex-1 text-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-[9px] uppercase tracking-wider text-subtle",
															children: "Linien"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-sm tabular-nums",
															children: [
																lineCount,
																"/",
																def.paylines.length
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "size-11 text-fg",
														disabled: busy || inFs || lineCount >= def.paylines.length,
														onClick: () => setLineCount((n) => Math.min(def.paylines.length, n + 1)),
														"aria-label": "Linien erhöhen",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
													})
												]
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center rounded-md border border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_35%,transparent)] bg-bg/70",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "size-11 text-fg",
													disabled: busy || inFs || betIndex === 0,
													onClick: () => setBetIndex((i) => Math.max(0, i - 1)),
													"aria-label": "Einsatz senken",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-16 text-center text-sm tabular-nums",
													children: formatEuro(bet)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "size-11 text-fg",
													disabled: busy || inFs || betIndex === def.betSteps.length - 1,
													onClick: () => setBetIndex((i) => Math.min(def.betSteps.length - 1, i + 1)),
													"aria-label": "Einsatz erhöhen",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												disabled: busy && autoLeft === 0,
												onClick: () => {
													if (autoLeft > 0) {
														setAutoLeft(0);
														return;
													}
													setAutoOpen((v) => !v);
												},
												className: cn("h-11 rounded-md border px-3 text-xs uppercase tracking-wider", autoLeft > 0 ? "border-[var(--slot-line,var(--color-accent))] bg-[var(--slot-spin,var(--color-accent))] text-[var(--slot-spin-fg,var(--color-accent-fg))]" : "border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_35%,transparent)] bg-bg/70 text-fg"),
												children: autoLeft > 0 ? `Auto ${autoLeft}` : "Auto"
											}), autoOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute bottom-12 left-0 z-30 min-w-40 rounded-md border border-border bg-surface p-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1",
													children: AUTO_OPTS$1.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: "h-10 min-w-10 rounded-sm px-2 text-xs text-fg hover:bg-elevated",
														onClick: () => {
															setAutoLeft(n);
															setAutoOpen(false);
														},
														children: n
													}, n))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-1 flex gap-1",
													children: [
														["none", "Egal"],
														["win", "Gewinn"],
														["bonus", "Bonus"]
													].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														className: cn("h-9 flex-1 rounded-sm px-1 text-[10px] uppercase tracking-wider", autoStop === id ? "bg-elevated text-accent" : "text-muted hover:bg-elevated"),
														onClick: () => setAutoStop(id),
														children: label
													}, id))
												})]
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTurbo((v) => !v),
											className: cn("inline-flex size-11 items-center justify-center rounded-md border", turbo ? "border-[var(--slot-line,var(--color-accent))] bg-[var(--slot-spin,var(--color-accent))] text-[var(--slot-spin-fg,var(--color-accent-fg))]" : "border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_35%,transparent)] bg-bg/70 text-fg"),
											"aria-label": "Turbo",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: busy || !inFs && balance < bet,
											onClick: () => runSpin(),
											className: "relative ml-auto flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40 sm:size-[4.5rem]",
											children: busy ? "…" : inFs ? "Frei" : "Drehen"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid grid-cols-2 gap-2 text-center",
									children: info.family === "merkur" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MerkurLeds, {
											credit: balance,
											bet,
											win: displayWin
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md bg-bg/70 px-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-wider text-subtle",
											children: "Gewinn"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-xl tabular-nums text-[var(--slot-line,var(--color-accent))]",
											children: displayWin ? formatEuro(displayWin) : "—"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md bg-bg/70 px-3 py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-wider text-subtle",
											children: "Guthaben"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-xl tabular-nums text-fg",
											children: formatEuro(balance)
										})]
									})] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
							]
						})
					})
				]
			}),
			fsPhase === "intro" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex items-center justify-center bg-bg/80 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border-2 border-accent bg-surface p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.3em] text-accent",
							children: "Scatter"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl text-fg",
							children: "Freispiele"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex justify-center gap-2",
							children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-16 overflow-hidden rounded-md slot-win",
								children: scatterSym ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolFace, {
									symbol: scatterSym,
									win: true
								}) : null
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-5xl tabular-nums text-accent",
							children: fsAward
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: def.expandingSpecial ? "Ein Symbol wird gewählt. Es füllt ganze Walzen und zahlt auf allen Linien — auch wenn die Walzen nicht nebeneinander liegen." : def.mechanic === "sticky" ? "Wilds bleiben eingefroren." : def.mechanic === "ways" ? "Tumble-Multiplikator bleibt stehen." : `Alle Gewinne ×${def.fsMultiplier}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-6 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg",
							onClick: beginBonus,
							children: "Bonus starten"
						})
					]
				})
			}) : null,
			fsPhase === "pick" || fsPhase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex items-center justify-center bg-bg/80 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-xl border-2 border-accent bg-surface p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.3em] text-accent",
							children: "Sondersymbol"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl text-fg",
							children: "Expanding Symbol"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid grid-cols-4 gap-2",
							children: pool.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("h-16 overflow-hidden rounded-md", i === pickIndex ? "ring-2 ring-accent" : "opacity-50"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolFace, {
									symbol: s,
									win: i === pickIndex
								})
							}, s.id))
						}),
						fsPhase === "ready" && special ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-muted",
							children: [
								special.label,
								" füllt die Walze, sobald ",
								expandMinCount(special) === 2 ? "2" : "3",
								" oder mehr erscheinen — Gewinn auf allen Linien, auch mit Lücken."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-5 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg",
							onClick: () => startFreeSpins(fsAward),
							children: "Freispiele starten"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-subtle",
							children: "Symbol wird gewählt…"
						})
					]
				})
			}) : null,
			link?.phase === "collect" && !celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex items-center justify-center bg-bg/80 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border-2 border-accent bg-surface p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-[0.3em] text-accent",
							children: "Fire Link"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-4xl text-fg",
							children: [link.coins.length, " Feuer"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-4xl tabular-nums text-accent",
							children: formatEuro(coinPayout(link.coins, bet))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-6 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg",
							onClick: closeLink,
							children: "Weiter"
						})
					]
				})
			}) : null,
			gamble != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MerkurRisk, {
				amount: gamble,
				soundOn,
				onBank: (cents) => {
					creditWin(cents, `${gameName} · Hälfte`);
				},
				onCollect: (cents) => {
					if (cents > 0) creditWin(cents, `${gameName} · Risiko`);
					setDisplayWin(cents);
					setGamble(null);
				},
				onBust: () => {
					setGamble(null);
					setDisplayWin(0);
					setLast((v) => v ? {
						...v,
						totalPayout: 0,
						lineWins: []
					} : v);
				}
			}, gamble) : null,
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				onDone: dismissWin
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paytable, {
				open: payOpen,
				onOpenChange: setPayOpen,
				def,
				stake: bet,
				name: info.name
			})
		]
	});
}
function GemMeter({ value, max }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tresor" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums text-accent",
				children: [
					value,
					"/",
					max
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-0.5",
			children: Array.from({ length: max }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 flex-1 rounded-full", i < value ? "bg-accent" : "bg-elevated") }, i))
		})]
	});
}
function ScatterLamps({ art, lit, need, label, count }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-1.5",
		children: [Array.from({ length: Math.min(need, 6) }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-7 overflow-hidden rounded-sm sm:size-8", i < lit ? "slot-win opacity-100" : "opacity-30"),
			children: art ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: art,
				alt: "",
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "block h-full w-full bg-elevated" })
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "truncate text-[10px] uppercase tracking-wider text-muted sm:text-[11px]",
			children: [
				need,
				"× ",
				label,
				" = ",
				count,
				" FS"
			]
		})]
	});
}
function SideStatue({ video, image, side, win, inFs, flip, filter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none absolute bottom-0 z-[5] h-[48%] w-[38vw] max-w-[200px] sm:h-[78%] sm:w-[24vw] sm:max-w-[260px] lg:h-[84%] lg:max-w-[320px]", side === "left" ? "-left-3 origin-bottom-left sm:left-0" : "-right-3 origin-bottom-right sm:right-0", flip && "scale-x-[-1]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			src: video,
			poster: image,
			autoPlay: true,
			loop: true,
			muted: true,
			playsInline: true,
			preload: "auto",
			style: filter ? { filter } : void 0,
			className: cn("h-full w-full object-contain object-bottom slot-statue", win && "slot-statue-win", inFs && "slot-statue-fs")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("slot-torch", side === "left" ? "left-[42%]" : "right-[42%]") })]
	});
}
function MerkurLeds({ credit, bet, win }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "merkur-leds",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedCell, {
				label: "CREDIT",
				cents: credit
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedCell, {
				label: "BET",
				cents: bet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LedCell, {
				label: "WIN",
				cents: win,
				lit: win > 0
			})
		]
	});
}
function LedCell({ label, cents, lit }) {
	const val = formatLed(cents);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("merkur-led", lit && "is-lit"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "merkur-led-label",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "merkur-led-readout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "risk-led-ghost",
				"aria-hidden": true,
				children: ledGhost(val)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "risk-led-val",
				children: val
			})]
		})]
	});
}
function PayTicks({ active, count = 5, offset = 0 }) {
	const nums = Array.from({ length: count }, (_, i) => offset + i + 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col justify-around py-2",
		children: nums.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("text-center text-[9px] tabular-nums", active.includes(n - 1) ? "text-[var(--slot-line,var(--color-accent))]" : "text-subtle"),
			children: n
		}, n))
	});
}
/** Wolf-Gold-style Mini / Minor / Major / Grand wheel. */
var HUFF_WHEEL = [
	{
		id: "mini-a",
		label: "MINI",
		fill: "#d4b06a",
		ink: "#1a1208",
		weight: 18,
		extraFs: 0,
		mult: 20
	},
	{
		id: "x12",
		label: "12×",
		fill: "#2c1d14",
		ink: "#f3e6d0",
		weight: 11,
		extraFs: 0,
		mult: 12
	},
	{
		id: "minor-a",
		label: "MINOR",
		fill: "#5eb3d6",
		ink: "#071018",
		weight: 12,
		extraFs: 0,
		mult: 50
	},
	{
		id: "x25",
		label: "25×",
		fill: "#2c1d14",
		ink: "#f3e6d0",
		weight: 9,
		extraFs: 0,
		mult: 25
	},
	{
		id: "major",
		label: "MAJOR",
		fill: "#e6b84d",
		ink: "#1a1208",
		weight: 6,
		extraFs: 0,
		mult: 200
	},
	{
		id: "fs",
		label: "+8 FS",
		fill: "#3d7a45",
		ink: "#f3e6d0",
		weight: 10,
		extraFs: 8,
		mult: 0
	},
	{
		id: "grand",
		label: "GRAND",
		fill: "#d4452f",
		ink: "#fff6f0",
		weight: 3,
		extraFs: 0,
		mult: 1e3
	},
	{
		id: "mini-b",
		label: "MINI",
		fill: "#d4b06a",
		ink: "#1a1208",
		weight: 16,
		extraFs: 0,
		mult: 20
	},
	{
		id: "x8",
		label: "8×",
		fill: "#2c1d14",
		ink: "#f3e6d0",
		weight: 12,
		extraFs: 0,
		mult: 8
	},
	{
		id: "minor-b",
		label: "MINOR",
		fill: "#5eb3d6",
		ink: "#071018",
		weight: 10,
		extraFs: 0,
		mult: 50
	},
	{
		id: "x40",
		label: "40×",
		fill: "#2c1d14",
		ink: "#f3e6d0",
		weight: 7,
		extraFs: 0,
		mult: 40
	},
	{
		id: "x15",
		label: "15×",
		fill: "#2c1d14",
		ink: "#f3e6d0",
		weight: 10,
		extraFs: 0,
		mult: 15
	}
];
function emptyFrames() {
	return Array.from({ length: 15 }, () => 0);
}
function cellIndex(reel, row) {
	return reel * 3 + row;
}
function countId(grid, id) {
	let n = 0;
	for (const col of grid) for (const s of col) if (s.id === id) n += 1;
	return n;
}
function hatCells(grid) {
	const out = [];
	grid.forEach((col, r) => col.forEach((s, row) => {
		if (s.id === "scatter") out.push(cellIndex(r, row));
	}));
	return out;
}
function applyHatFrames(frames, hats) {
	const next = frames.slice();
	for (const i of hats) {
		const cur = next[i] ?? 0;
		if (cur < 3) next[i] = cur + 1;
		else {
			const candidates = next.map((lv, idx) => lv < 3 ? idx : -1).filter((x) => x >= 0);
			if (candidates.length) {
				const pick = candidates[randInt(candidates.length)];
				next[pick] = (next[pick] ?? 0) + 1;
			}
		}
	}
	return next;
}
function housePay(level, stake) {
	if (level === 1) return Math.round(stake * [
		1,
		2,
		3,
		5
	][randInt(4)]);
	if (level === 2) return Math.round(stake * [
		6,
		10,
		15,
		25
	][randInt(4)]);
	if (level === 3) return Math.round(stake * [
		40,
		80,
		120,
		200
	][randInt(4)]);
	return 0;
}
function settleHouses(frames, stake) {
	const pays = frames.map((lv) => housePay(lv, stake));
	return {
		pays,
		total: pays.reduce((s, n) => s + n, 0)
	};
}
function spinHuffWheel(stake) {
	const total = HUFF_WHEEL.reduce((s, x) => s + x.weight, 0);
	let r = randInt(total);
	let index = 0;
	for (let i = 0; i < HUFF_WHEEL.length; i++) {
		r -= HUFF_WHEEL[i].weight;
		if (r < 0) {
			index = i;
			break;
		}
	}
	const seg = HUFF_WHEEL[index];
	return {
		index,
		label: seg.label,
		payout: Math.round(stake * seg.mult),
		extraFs: seg.extraFs
	};
}
function forceHats(grid, hat, n) {
	const next = grid.map((col) => col.slice());
	const spots = fisher(15);
	for (let k = 0; k < n && k < spots.length; k++) {
		const idx = spots[k];
		const reel = Math.floor(idx / 3);
		const row = idx % 3;
		next[reel][row] = hat;
	}
	return next;
}
function fisher(n) {
	const a = Array.from({ length: n }, (_, i) => i);
	for (let i = n - 1; i > 0; i--) {
		const j = randInt(i + 1);
		const t = a[i];
		a[i] = a[j];
		a[j] = t;
	}
	return a;
}
function JackpotWheel({ stake, index, label, payout, extraFs, soundOn, onDone }) {
	const [spinning, setSpinning] = (0, import_react.useState)(true);
	const n = HUFF_WHEEL.length;
	const arc = 360 / n;
	const end = 2520 + (360 - (index + .5) * arc);
	(0, import_react.useEffect)(() => {
		if (soundOn) sfx.wheel();
		const tick = window.setInterval(() => {
			if (soundOn) sfx.tick();
		}, 90);
		const stop = window.setTimeout(() => {
			window.clearInterval(tick);
			setSpinning(false);
			if (soundOn) sfx.win(payout >= stake * 50 || extraFs > 0);
		}, 4200);
		return () => {
			window.clearInterval(tick);
			window.clearTimeout(stop);
		};
	}, [
		extraFs,
		payout,
		soundOn,
		stake
	]);
	const slices = (0, import_react.useMemo)(() => HUFF_WHEEL.map((seg, i) => slicePath(seg, i, n)), [n]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-40 flex items-center justify-center bg-bg/85 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border-2 border-[color-mix(in_oklab,var(--slot-spin,#e6b84d)_55%,transparent)] bg-[#140e0a] p-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-[0.32em] text-[#e6b84d]",
					children: "Buzz-Saw Jackpot"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl text-[#f3e6d0]",
					children: "Gewinnrad"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto mt-4 size-64 sm:size-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-0 z-20 h-6 w-4 -translate-x-1/2 -translate-y-1 rounded-sm bg-[#e6b84d] [clip-path:polygon(50%_100%,0_0,100%_0)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-full rounded-full",
						style: {
							transform: `rotate(${end}deg)`,
							transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.82, 0.08, 1)" : "none"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 200 200",
							className: "size-full drop-shadow-lg",
							children: [
								slices,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "100",
									cy: "100",
									r: "22",
									fill: "#1a120c",
									stroke: "#e6b84d",
									strokeWidth: "3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: "100",
									y: "104",
									textAnchor: "middle",
									fontSize: "9",
									fill: "#e6b84d",
									fontFamily: "Georgia, serif",
									children: "WOLF"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 min-h-16",
					children: spinning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-[#d4b06a]",
						children: "Rad dreht…"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl text-[#e6b84d]",
							children: label
						}),
						payout > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg text-win",
							children: formatEuro(payout)
						}) : null,
						extraFs > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-[#9dcc9d]",
							children: [extraFs, " Extra-Freispiele"]
						}) : null
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: spinning,
					className: "mt-4 h-12 w-full rounded-md bg-[#e6b84d] text-sm font-semibold uppercase tracking-wider text-[#1a1208] disabled:opacity-40",
					onClick: onDone,
					children: spinning ? "Bitte warten" : "Weiter"
				})
			]
		})
	});
}
function slicePath(seg, i, n) {
	const arc = Math.PI * 2 / n;
	const a0 = -Math.PI / 2 + i * arc;
	const a1 = a0 + arc;
	const r0 = 28;
	const r1 = 98;
	const p = (a, r) => [100 + Math.cos(a) * r, 100 + Math.sin(a) * r];
	const [x0, y0] = p(a0, r1);
	const [x1, y1] = p(a1, r1);
	const [x2, y2] = p(a1, r0);
	const [x3, y3] = p(a0, r0);
	const mid = a0 + arc / 2;
	const [tx, ty] = p(mid, 68);
	const deg = mid * 180 / Math.PI;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: `M${x0} ${y0} A${r1} ${r1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3} Z`,
		fill: seg.fill,
		stroke: "#0d0906",
		strokeWidth: "1.2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: tx,
		y: ty,
		fill: seg.ink,
		fontSize: seg.label.length > 4 ? 7.5 : 9,
		fontWeight: "700",
		textAnchor: "middle",
		dominantBaseline: "middle",
		transform: `rotate(${deg + 90} ${tx} ${ty})`,
		children: seg.label
	})] }, seg.id);
}
function JackpotMeters({ stake, hot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-2 grid grid-cols-4 gap-1",
		children: [
			{
				id: "mini",
				label: "Mini",
				mult: 20,
				cls: "text-[#d4b06a]"
			},
			{
				id: "minor",
				label: "Minor",
				mult: 50,
				cls: "text-[#5eb3d6]"
			},
			{
				id: "major",
				label: "Major",
				mult: 200,
				cls: "text-[#e6b84d]"
			},
			{
				id: "grand",
				label: "Grand",
				mult: 1e3,
				cls: "text-[#d4452f]"
			}
		].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("rounded-md border px-1 py-1.5 text-center", hot === m.label.toUpperCase() ? "border-[#e6b84d] bg-[#e6b84d]/15" : "border-[#3a2a1c] bg-[#120c08]"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-[9px] uppercase tracking-wider", m.cls),
				children: m.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] tabular-nums text-[#f3e6d0] sm:text-xs",
				children: formatEuro(stake * m.mult)
			})]
		}, m.id))
	});
}
var SLUG$1 = "huff-und-puff";
function HuffView() {
	const def = SLOT_DEFS[SLUG$1];
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const [betIndex, setBetIndex] = (0, import_react.useState)(2);
	const [reels, setReels] = (0, import_react.useState)(() => Array.from({ length: 5 }, (_, i) => ({
		strip: [
			def.symbols[i],
			def.symbols[(i + 1) % def.symbols.length],
			def.symbols[(i + 2) % def.symbols.length]
		],
		offset: 0,
		spinning: false,
		settleMs: REEL_STOP_MS[i] ?? 2e3
	})));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const [displayWin, setDisplayWin] = (0, import_react.useState)(0);
	const [freeSpins, setFreeSpins] = (0, import_react.useState)(0);
	const [fsTotal, setFsTotal] = (0, import_react.useState)(0);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [frames, setFrames] = (0, import_react.useState)(() => emptyFrames());
	const [housePays, setHousePays] = (0, import_react.useState)([]);
	const [blowStep, setBlowStep] = (0, import_react.useState)(0);
	const [spinKey, setSpinKey] = (0, import_react.useState)(0);
	const [wheel, setWheel] = (0, import_react.useState)(null);
	const [huffPulse, setHuffPulse] = (0, import_react.useState)(false);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const timers = (0, import_react.useRef)([]);
	const freeRef = (0, import_react.useRef)(0);
	const pityRef = (0, import_react.useRef)(0);
	const framesRef = (0, import_react.useRef)(emptyFrames());
	const dismissWin = (0, import_react.useCallback)(() => setCelebrate(null), []);
	const bet = def.betSteps[betIndex] ?? 100;
	const inFs = freeSpins > 0 && phase === "fs";
	(0, import_react.useEffect)(() => {
		freeRef.current = freeSpins;
	}, [freeSpins]);
	(0, import_react.useEffect)(() => {
		framesRef.current = frames;
	}, [frames]);
	(0, import_react.useEffect)(() => () => {
		timers.current.forEach((t) => window.clearTimeout(t));
		stopRumble();
	}, []);
	(0, import_react.useEffect)(() => {
		if (busy || phase === "blow" || phase === "wheel") return;
		if (phase === "fs" && freeSpins > 0) {
			const t = window.setTimeout(() => runSpin(), 900);
			return () => window.clearTimeout(t);
		}
	}, [
		busy,
		freeSpins,
		phase
	]);
	function runSpin() {
		unlockAudio();
		if (busy) return;
		const isFree = freeRef.current > 0 && phase === "fs";
		if (!isFree) {
			if (balance < bet) {
				setCashier(true);
				return;
			}
			if (!placeBet(bet, "Huff und Puff · Einsatz")) return;
		} else setFreeSpins((n) => Math.max(0, n - 1));
		if (soundOn) sfx.spin();
		startRumble();
		setBusy(true);
		setLast(null);
		setDisplayWin(0);
		setWheel(null);
		setSpinKey((k) => k + 1);
		pityRef.current += isFree ? 0 : 1;
		const forceHatsN = !isFree && pityRef.current >= 14 ? 6 : 0;
		if (forceHatsN) pityRef.current = 0;
		let raw = spinGrid(def);
		const hat = def.symbols.find((s) => s.id === "scatter");
		if (forceHatsN && hat) raw = forceHats(raw, hat, forceHatsN);
		const hats = countId(raw, "scatter");
		const saws = countId(raw, "saw");
		const result = evaluateSpin(def, raw, bet, 1);
		const nextReels = raw.map((col, i) => ({
			strip: [
				...randomPad(def, 30),
				...col,
				randomSymbol(def, false)
			],
			offset: 30,
			spinning: true,
			settleMs: REEL_STOP_MS[i] ?? 2e3
		}));
		setReels(nextReels);
		REEL_STOP_MS.forEach((ms, i) => {
			const t = window.setTimeout(() => {
				if (soundOn) sfx.stop(i);
				setReels((cols) => cols.map((c, idx) => idx === i ? {
					...c,
					spinning: false
				} : c));
				if (i === 4) {
					stopRumble();
					finish(result, raw, hats, saws, isFree);
				}
			}, ms);
			timers.current.push(t);
		});
	}
	function finish(result, raw, hats, saws, isFree) {
		setLast(result);
		setBusy(false);
		if (result.totalPayout > 0) {
			creditWin(result.totalPayout, "Huff und Puff · Linie");
			if (soundOn) sfx.win(result.totalPayout >= bet * 6);
			countUp(result.totalPayout);
		} else if (soundOn) sfx.lose();
		if (isFree) {
			const nextFrames = applyHatFrames(framesRef.current, hatCells(raw));
			setFrames(nextFrames);
			if (hats >= 3) {
				setFreeSpins((n) => n + 1);
				setFsTotal((n) => n + 1);
				if (soundOn) sfx.cash();
			}
			if (freeRef.current <= 1 && hats < 3) beginBlow(nextFrames);
			return;
		}
		if (saws >= 2) {
			const prize = spinHuffWheel(bet);
			setPhase("wheel");
			setWheel(prize);
			return;
		}
		if (hats >= 6) {
			pityRef.current = 0;
			const seeded = applyHatFrames(emptyFrames(), hatCells(raw));
			setFrames(seeded);
			setFreeSpins(6);
			setFsTotal(6);
			setPhase("fs");
			if (soundOn) sfx.cash();
		}
	}
	function beginBlow(nextFrames) {
		setPhase("blow");
		setBlowStep(0);
		setHuffPulse(true);
		const { pays, total } = settleHouses(nextFrames, bet);
		setHousePays(pays);
		const t1 = window.setTimeout(() => setBlowStep(1), 700);
		const t2 = window.setTimeout(() => setBlowStep(2), 1500);
		const t3 = window.setTimeout(() => setBlowStep(3), 2300);
		const t4 = window.setTimeout(() => {
			if (total > 0) {
				creditWin(total, "Huff und Puff · Häuser");
				countUp(total, true);
				if (soundOn) sfx.win(total >= bet * 8);
			}
			setHuffPulse(false);
		}, 2800);
		timers.current.push(t1, t2, t3, t4);
	}
	function closeBonus() {
		setPhase("idle");
		setFrames(emptyFrames());
		setHousePays([]);
		setBlowStep(0);
		setFreeSpins(0);
		setFsTotal(0);
		setWheel(null);
	}
	function resolveWheel() {
		if (!wheel) return;
		if (wheel.payout > 0) {
			creditWin(wheel.payout, "Huff und Puff · Rad");
			countUp(wheel.payout, true);
		}
		if (wheel.extraFs) {
			setFreeSpins((n) => n + wheel.extraFs);
			setFsTotal((n) => n + wheel.extraFs);
			setWheel(null);
			setPhase("fs");
			return;
		}
		setWheel(null);
		closeBonus();
	}
	function countUp(target, celebrateIt = false) {
		const start = performance.now();
		const dur = Math.min(900, 240 + target / 8);
		const tick = (now) => {
			const p = Math.min(1, (now - start) / dur);
			setDisplayWin(Math.round(target * (1 - Math.pow(1 - p, 3))));
			if (p < 1) requestAnimationFrame(tick);
		};
		requestAnimationFrame(tick);
		if (celebrateIt) {
			const tier = winTier(target, bet);
			if (tier !== "none") setCelebrate({
				payout: target,
				stake: bet,
				tier
			});
		}
	}
	const winCells = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		last?.lineWins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
		return set;
	}, [last]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-huff sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/huff-und-puff.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 neon-mesh" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-0 left-0 z-[5] hidden h-[78%] w-[22vw] max-w-[280px] sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src: "/games/char-huff-wolf.mp4",
					poster: "/games/char-huff-wolf.jpg",
					autoPlay: true,
					loop: true,
					muted: true,
					playsInline: true,
					className: cn("h-full w-full object-contain object-bottom slot-statue", huffPulse && "slot-statue-win")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-0 right-0 z-[5] hidden h-[70%] w-[20vw] max-w-[240px] sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/games/char-huff-pig.jpg",
					alt: "",
					className: "h-full w-full object-contain object-bottom slot-statue"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[42rem] flex-col px-2 pb-10 pt-2 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
							"aria-label": "Lobby",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.28em] text-[#e6b84d]",
								children: "Jackpot Wheel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl text-fg sm:text-4xl",
								children: "Huff und Puff"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-11" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "slot-bezel slot-skin-huff",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "slot-cabinet relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JackpotMeters, {
								stake: bet,
								hot: wheel && !busy ? wheel.label : null
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between px-1 text-xs uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: inFs ? "text-[#e6b84d]" : "text-muted",
									children: inFs ? `Bonus ${Math.max(1, fsTotal - freeSpins)} / ${fsTotal}` : `6× Helm = Häuser · 2× Säge = Rad`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-[#e6b84d]",
									children: "96,2 %"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelBank, {
								reels,
								spinKey,
								busy,
								winCells,
								variant: "sand",
								overlay: (ri, row) => {
									const fi = ri * 3 + row;
									const lv = frames[fi] ?? 0;
									const pay = housePays[fi] ?? 0;
									const blown = phase === "blow" && lv > 0 && (lv === 1 && blowStep >= 1 || lv === 2 && blowStep >= 2 || lv === 3 && blowStep >= 3);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [lv > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("pointer-events-none absolute inset-0", `huff-frame huff-frame-${lv}`, blown && "huff-blown") }) : null, blown && pay > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute inset-x-0 bottom-1 text-center text-xs font-semibold tabular-nums text-[#e6b84d]",
										children: formatEuro(pay)
									}) : null] });
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 min-h-6 text-center text-sm",
								children: phase === "blow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl text-accent",
									children: blowStep === 0 ? "Der Wolf holt Luft…" : "Huff! Puff!"
								}) : last && last.totalPayout > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-win",
									children: [
										last.lineWins.length,
										" Linie",
										last.lineWins.length === 1 ? "" : "n",
										" · ",
										formatEuro(last.totalPayout)
									]
								}) : last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted",
									children: "Kein Liniengewinn"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-subtle",
									children: "Helme bauen Häuser. Der Wolf bläst sie um."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded-md border border-accent/25 bg-bg/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11",
											disabled: busy || inFs || betIndex === 0,
											onClick: () => setBetIndex((i) => i - 1),
											"aria-label": "Einsatz senken",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-16 text-center text-sm tabular-nums",
											children: formatEuro(bet)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11",
											disabled: busy || inFs || betIndex === def.betSteps.length - 1,
											onClick: () => setBetIndex((i) => i + 1),
											"aria-label": "Einsatz erhöhen",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy || phase === "blow",
									onClick: () => runSpin(),
									className: "relative ml-auto flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40 sm:size-[4.5rem]",
									children: busy ? "…" : inFs ? "Frei" : "Drehen"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg/70 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-subtle",
										children: "Gewinn"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tabular-nums text-accent",
										children: displayWin ? formatEuro(displayWin) : "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg/70 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-subtle",
										children: "Guthaben"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tabular-nums text-fg",
										children: formatEuro(balance)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
						]
					})
				})]
			}),
			phase === "wheel" && wheel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JackpotWheel, {
				stake: bet,
				index: wheel.index,
				label: wheel.label,
				payout: wheel.payout,
				extraFs: wheel.extraFs,
				soundOn,
				onDone: resolveWheel
			}) : null,
			phase === "blow" && blowStep >= 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-30 flex items-center justify-center bg-bg/70 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-sm rounded-xl border border-accent bg-surface p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.3em] text-accent",
							children: "Wolf"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl text-fg",
							children: "Häuser fallen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 font-display text-3xl tabular-nums text-accent",
							children: formatEuro(housePays.reduce((s, n) => s + n, 0))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-6 h-12 w-full rounded-md bg-accent font-semibold uppercase tracking-wider text-accent-fg",
							onClick: closeBonus,
							children: "Bonus beenden"
						})
					]
				})
			}) : null,
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				onDone: dismissWin
			}) : null
		]
	});
}
var SLUG = "triple-chance";
function TripleChanceView() {
	const def = SLOT_DEFS[SLUG];
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betIndex, setBetIndex] = (0, import_react.useState)(1);
	const [reels, setReels] = (0, import_react.useState)(() => Array.from({ length: 3 }, (_, i) => ({
		strip: [
			def.symbols[i],
			def.symbols[(i + 1) % def.symbols.length],
			def.symbols[(i + 2) % def.symbols.length]
		],
		offset: 0,
		spinning: false,
		settleMs: REEL_STOP_MS[i] ?? 1200
	})));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [held, setHeld] = (0, import_react.useState)([
		false,
		false,
		false
	]);
	const [canHold, setCanHold] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const [displayWin, setDisplayWin] = (0, import_react.useState)(0);
	const [spinKey, setSpinKey] = (0, import_react.useState)(0);
	const [gamble, setGamble] = (0, import_react.useState)(null);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [cycle, setCycle] = (0, import_react.useState)(0);
	const gridRef = (0, import_react.useRef)(null);
	const timers = (0, import_react.useRef)([]);
	const bet = def.betSteps[betIndex] ?? 50;
	(0, import_react.useEffect)(() => {
		touchGame(SLUG);
	}, [touchGame]);
	(0, import_react.useEffect)(() => {
		if (!soundOn) return;
		startBed(98);
		return () => stopBed();
	}, [soundOn]);
	(0, import_react.useEffect)(() => () => {
		timers.current.forEach((t) => window.clearTimeout(t));
		stopRumble();
		stopBed();
	}, []);
	const winCells = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		const wins = last?.lineWins ?? [];
		if (!wins.length) return set;
		wins[cycle % wins.length].cells.forEach((c) => set.add(`${c.reel}-${c.row}`));
		return set;
	}, [last, cycle]);
	(0, import_react.useEffect)(() => {
		if (!last?.lineWins.length) return;
		const t = window.setInterval(() => setCycle((n) => n + 1), 900);
		return () => window.clearInterval(t);
	}, [last]);
	function runSpin(fromHold = false) {
		unlockAudio();
		if (busy) return;
		if (!fromHold) {
			if (balance < bet) {
				setCashier(true);
				return;
			}
			if (!placeBet(bet, "Triple Chance · Einsatz")) return;
			setHeld([
				false,
				false,
				false
			]);
		}
		if (soundOn) sfx.spin();
		startRumble();
		setBusy(true);
		setLast(null);
		setDisplayWin(0);
		setGamble(null);
		setCanHold(false);
		setSpinKey((k) => k + 1);
		const prev = gridRef.current;
		const raw = spinGrid(def);
		if (fromHold && prev) held.forEach((h, i) => {
			if (h) raw[i] = prev[i].slice();
		});
		gridRef.current = raw;
		const times = (fromHold ? REEL_TURBO_MS : REEL_STOP_MS).slice(0, 3);
		setReels(raw.map((col, i) => ({
			strip: [
				...randomPad(def, 30),
				...col,
				randomSymbol(def, false)
			],
			offset: 30,
			spinning: fromHold ? !held[i] : true,
			settleMs: times[i] ?? 1200
		})));
		const maxT = Math.max(...times);
		const t = window.setTimeout(() => {
			stopRumble();
			setReels((cols) => cols.map((c) => ({
				...c,
				spinning: false
			})));
			if (soundOn) sfx.stop(2);
			const result = evaluateSpin(def, raw, bet, 1);
			setLast(result);
			setBusy(false);
			if (!fromHold) {
				setCanHold(true);
				setHeld(suggestHold(raw));
				if (result.totalPayout > 0) setDisplayWin(result.totalPayout);
				return;
			}
			finish(result);
		}, maxT);
		timers.current.push(t);
	}
	function finish(result) {
		setCanHold(false);
		setHeld([
			false,
			false,
			false
		]);
		if (result.totalPayout > 0) {
			setGamble(result.totalPayout);
			setDisplayWin(result.totalPayout);
			if (soundOn) sfx.win(result.totalPayout >= bet * 8);
		} else if (soundOn) sfx.lose();
	}
	function takeFirst() {
		const result = last;
		if (!result || result.totalPayout <= 0) {
			runSpin(true);
			return;
		}
		finish(result);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-chance sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/triple-chance.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-bg/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[28rem] flex-col px-2 pb-10 pt-2 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
							"aria-label": "Lobby",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.32em] text-[var(--slot-line,#ffd45e)]",
								children: "Hold · Risiko · Leiter"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl text-fg",
								children: "Triple Chance"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center text-muted",
							"aria-label": "Gewinntabelle",
							onClick: () => setPayOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "slot-bezel slot-skin-chance",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "slot-cabinet",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-center text-[11px] uppercase tracking-wider text-muted",
								children: "3 Walzen · Halten · Gewinnleiter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelBank, {
								reels,
								spinKey,
								busy,
								winCells,
								variant: "hold",
								size: "lg"
							}),
							canHold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-3 gap-1",
								children: held.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("h-11 rounded-md text-xs uppercase tracking-wider", h ? "bg-[var(--slot-spin,#e11d2e)] text-[var(--slot-spin-fg,#fff8f6)]" : "border border-[color-mix(in_oklab,var(--slot-line,#ffd45e)_40%,transparent)] bg-bg/70 text-fg"),
									onClick: () => setHeld((v) => v.map((x, idx) => idx === i ? !x : x)),
									children: h ? "Gehalten" : "Halten"
								}, i))
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 min-h-6 text-center text-sm",
								children: last && last.totalPayout > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-win",
									children: [
										"Linie ",
										(last.lineWins[cycle % last.lineWins.length]?.line ?? 0) + 1,
										" · ",
										formatEuro(last.lineWins[cycle % last.lineWins.length]?.payout ?? last.totalPayout)
									]
								}) : last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted",
									children: "Kein Gewinn"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-subtle",
									children: "Walzen halten, dann nachdrehen."
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded-md border border-[color-mix(in_oklab,var(--slot-line,#ffd45e)_35%,transparent)] bg-bg/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11",
											disabled: busy || canHold || betIndex === 0,
											onClick: () => setBetIndex((i) => i - 1),
											"aria-label": "Einsatz senken",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-16 text-center text-sm tabular-nums",
											children: formatEuro(bet)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11",
											disabled: busy || canHold || betIndex === def.betSteps.length - 1,
											onClick: () => setBetIndex((i) => i + 1),
											"aria-label": "Einsatz erhöhen",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
										})
									]
								}), canHold ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 rounded-md border border-[color-mix(in_oklab,var(--slot-line,#ffd45e)_40%,transparent)] px-3 text-xs uppercase tracking-wider",
									onClick: takeFirst,
									children: last && last.totalPayout > 0 ? "Nehmen" : "Ohne Halt"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ml-auto h-12 rounded-md bg-[var(--slot-spin,#e11d2e)] px-4 text-sm font-semibold uppercase tracking-wider text-[var(--slot-spin-fg,#fff8f6)]",
									onClick: () => runSpin(true),
									children: "Nachdrehen"
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy || balance < bet,
									onClick: () => runSpin(false),
									className: "relative ml-auto flex size-16 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40",
									children: busy ? "…" : "Drehen"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "merkur-leds",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("merkur-led", displayWin > 0 && "is-lit"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "merkur-led-label",
												children: "CREDIT"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "merkur-led-readout",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "risk-led-ghost",
													"aria-hidden": true,
													children: ledGhost(formatLed(balance))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "risk-led-val",
													children: formatLed(balance)
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "merkur-led",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "merkur-led-label",
												children: "BET"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "merkur-led-readout",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "risk-led-ghost",
													"aria-hidden": true,
													children: ledGhost(formatLed(bet))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "risk-led-val",
													children: formatLed(bet)
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("merkur-led", displayWin > 0 && "is-lit"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "merkur-led-label",
												children: "WIN"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "merkur-led-readout",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "risk-led-ghost",
													"aria-hidden": true,
													children: ledGhost(formatLed(displayWin))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "risk-led-val",
													children: formatLed(displayWin)
												})]
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
						]
					})
				})]
			}),
			gamble != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MerkurRisk, {
				amount: gamble,
				soundOn,
				onBank: (cents) => {
					creditWin(cents, "Triple Chance · Hälfte");
				},
				onCollect: (cents) => {
					if (cents > 0) creditWin(cents, "Triple Chance · Risiko");
					setDisplayWin(cents);
					setGamble(null);
				},
				onBust: () => {
					setGamble(null);
					setDisplayWin(0);
				}
			}, gamble) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paytable, {
				open: payOpen,
				onOpenChange: setPayOpen,
				def,
				stake: bet,
				name: "Triple Chance"
			})
		]
	});
}
function suggestHold(grid) {
	const hold = [
		false,
		false,
		false
	];
	const mid = [
		0,
		1,
		2
	].map((i) => grid[i][1]);
	if (mid[0].id === mid[1].id) {
		hold[0] = true;
		hold[1] = true;
	}
	if (mid[1].id === mid[2].id) {
		hold[1] = true;
		hold[2] = true;
	}
	if (mid[0].id === mid[2].id) {
		hold[0] = true;
		hold[2] = true;
	}
	return hold;
}
var AUTO_OPTS = [
	10,
	25,
	50,
	100
];
function emptyReels(pack) {
	return spinPays(pack.kit, false, false).map((col, i) => ({
		strip: paintStrip(pack.def, col, i, 30),
		offset: 30,
		spinning: false,
		settleMs: 0
	}));
}
function OlympusView({ pack = OLYMP_PACK }) {
	const def = pack.def;
	const kit = pack.kit;
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betIndex, setBetIndex] = (0, import_react.useState)(() => def.betSteps.indexOf(def.defaultBet));
	const bet = def.betSteps[Math.max(0, betIndex)] ?? def.defaultBet;
	const [ante, setAnte] = (0, import_react.useState)(false);
	const [reels, setReels] = (0, import_react.useState)(() => emptyReels(pack));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [turbo, setTurbo] = (0, import_react.useState)(false);
	const [spinKey, setSpinKey] = (0, import_react.useState)(0);
	const [last, setLast] = (0, import_react.useState)(null);
	const [vanish, setVanish] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [displayWin, setDisplayWin] = (0, import_react.useState)(0);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [inFs, setInFs] = (0, import_react.useState)(false);
	const [freeLeft, setFreeLeft] = (0, import_react.useState)(0);
	const [fsTotal, setFsTotal] = (0, import_react.useState)(kit.fsCount);
	const [globalMult, setGlobalMult] = (0, import_react.useState)(0);
	const [seqMult, setSeqMult] = (0, import_react.useState)(0);
	const [autoLeft, setAutoLeft] = (0, import_react.useState)(0);
	const [autoOpen, setAutoOpen] = (0, import_react.useState)(false);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const deadRef = (0, import_react.useRef)(0);
	const autoRef = (0, import_react.useRef)(0);
	const spinningRef = (0, import_react.useRef)(false);
	const globalRef = (0, import_react.useRef)(0);
	autoRef.current = autoLeft;
	const stake = costOf(bet, ante && !inFs);
	const winCells = (0, import_react.useMemo)(() => last ? olympWinKeys(last) : /* @__PURE__ */ new Set(), [last]);
	(0, import_react.useEffect)(() => {
		touchGame(pack.slug);
		startBed(pack.bed);
		return () => stopBed();
	}, [
		pack.bed,
		pack.slug,
		touchGame
	]);
	const wait = (ms) => new Promise((r) => window.setTimeout(r, ms));
	const paint = (0, import_react.useCallback)((grid, spinning, turboOn) => {
		const stops = turboOn ? [
			280,
			360,
			440,
			520,
			600,
			680
		] : [
			900,
			1200,
			1500,
			1800,
			2100,
			2400
		];
		setReels(grid.map((col, i) => ({
			strip: paintStrip(def, col, i, 30),
			offset: 30,
			spinning,
			settleMs: stops[i] ?? 2400
		})));
	}, [def]);
	const finish = (0, import_react.useCallback)((paid, stakeNow) => {
		if (paid > 0) creditWin(paid, pack.name);
		setDisplayWin(paid);
		const tier = winTier(paid, stakeNow);
		if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({
			payout: paid,
			stake: stakeNow,
			tier
		});
		if (soundOn) {
			if (paid > 0) sfx.win(paid >= stakeNow * 8);
			else sfx.lose();
		}
	}, [
		creditWin,
		pack.name,
		soundOn
	]);
	const runSpin = (0, import_react.useCallback)(async (isFree = false) => {
		if (spinningRef.current) return;
		unlockAudio();
		const anteNow = ante && !isFree;
		const cost = isFree ? 0 : costOf(bet, anteNow);
		if (!isFree) {
			if (balance < cost) {
				setCashier(true);
				return;
			}
			if (!placeBet(cost, anteNow ? `${pack.name} · Ante` : pack.name)) return;
		}
		spinningRef.current = true;
		setBusy(true);
		setVanish(/* @__PURE__ */ new Set());
		setLast(null);
		setDisplayWin(0);
		setSeqMult(0);
		if (soundOn) {
			sfx.spin();
			startRumble();
		}
		const force = !isFree && deadRef.current >= def.pityAfter ? Math.random() < .35 ? "fs" : "win" : null;
		let grid = spinPays(kit, anteNow, isFree, force);
		setSpinKey((k) => k + 1);
		paint(grid, true, turbo);
		await wait(turbo ? 720 : 2500);
		stopRumble();
		paint(grid, false, turbo);
		await wait(turbo ? 80 : 180);
		let seq = 0;
		let scatterPay = 0;
		let fsGot = 0;
		let scatters = 0;
		let level = 0;
		while (true) {
			const result = evaluatePays(kit, grid, isFree ? bet : cost, isFree);
			if (level === 0) {
				scatterPay = result.scatterPayout;
				fsGot = result.freeSpinsAwarded;
				scatters = result.scatterCount;
			} else if (isFree && result.freeSpinsAwarded) fsGot += result.freeSpinsAwarded;
			if (result.lineWins.length === 0) {
				if (level === 0) setLast(result);
				break;
			}
			setLast(result);
			const keys = olympWinKeys(result);
			setVanish(keys);
			if (soundOn) sfx.explode();
			await wait(turbo ? 220 : 480);
			seq += result.lineWins.reduce((s, w) => s + w.payout, 0);
			grid = dropPays(kit, grid, keys, anteNow, isFree);
			setVanish(/* @__PURE__ */ new Set());
			paint(grid, false, turbo);
			level += 1;
			if (soundOn) sfx.tumble();
			await wait(turbo ? 160 : 320);
		}
		const orbs = orbTotal(grid);
		let mult = 1;
		if (isFree) {
			if (seq > 0 && orbs > 0) {
				globalRef.current += orbs;
				setGlobalMult(globalRef.current);
			}
			mult = Math.max(1, globalRef.current);
		} else if (seq > 0 && orbs > 0) mult = orbs;
		setSeqMult(orbs);
		const paid = capWin(seq * mult + scatterPay, isFree ? bet : cost, kit.maxX);
		const resultFinal = evaluatePays(kit, grid, isFree ? bet : cost, isFree);
		setLast({
			...resultFinal,
			totalPayout: paid,
			scatterPayout: scatterPay,
			scatterCount: scatters
		});
		paint(grid, false, turbo);
		if (paid > 0) deadRef.current = 0;
		else deadRef.current += 1;
		if (!isFree && fsGot >= kit.fsCount) {
			finish(paid, cost);
			globalRef.current = 0;
			setGlobalMult(0);
			setInFs(true);
			setFreeLeft(fsGot);
			setFsTotal(fsGot);
			if (soundOn) sfx.bonus();
		} else if (isFree) {
			if (fsGot > 0) {
				setFreeLeft((n) => n + fsGot);
				setFsTotal((n) => n + fsGot);
				if (soundOn) sfx.bonus();
			}
			finish(paid, bet);
			setFreeLeft((n) => Math.max(0, n - 1));
		} else finish(paid, cost);
		spinningRef.current = false;
		setBusy(false);
		if (autoRef.current > 0) setAutoLeft((n) => Math.max(0, n - 1));
	}, [
		ante,
		balance,
		bet,
		finish,
		kit,
		pack.name,
		paint,
		placeBet,
		setCashier,
		soundOn,
		turbo
	]);
	(0, import_react.useEffect)(() => {
		if (busy || celebrate) return;
		if (inFs && freeLeft > 0) {
			const t = window.setTimeout(() => void runSpin(true), turbo ? 280 : 700);
			return () => window.clearTimeout(t);
		}
		if (inFs && freeLeft <= 0) setInFs(false);
		if (!inFs && autoLeft > 0 && balance >= stake) {
			const t = window.setTimeout(() => void runSpin(false), turbo ? 240 : 560);
			return () => window.clearTimeout(t);
		}
	}, [
		autoLeft,
		balance,
		busy,
		celebrate,
		freeLeft,
		inFs,
		runSpin,
		stake,
		turbo
	]);
	async function buyBonus() {
		unlockAudio();
		const cost = bet * pack.buy;
		if (balance < cost) {
			setCashier(true);
			return;
		}
		if (!placeBet(cost, `${pack.name} · Bonus`)) return;
		setInFs(true);
		setFreeLeft(kit.fsCount);
		setFsTotal(kit.fsCount);
		globalRef.current = 0;
		setGlobalMult(0);
		if (soundOn) sfx.bonus();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6", `slot-skin-${pack.skin}`),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: pack.bg,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#12081c]/75" }),
			pack.statue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: pack.statue,
				alt: "",
				className: "pointer-events-none absolute bottom-0 left-0 z-[5] hidden h-[82%] w-[22vw] max-w-[260px] object-contain object-bottom sm:block"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[46rem] flex-col px-2 pb-10 pt-2 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
							"aria-label": "Lobby",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.32em] text-[#e8c85a]",
								children: pack.kicker
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl text-fg sm:text-4xl",
								children: pack.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center text-muted",
							"aria-label": "Gewinntabelle",
							onClick: () => setPayOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("slot-bezel", `slot-skin-${pack.skin}`),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "slot-cabinet",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between gap-2 px-1 text-[11px] uppercase tracking-wider",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#c9b07a]",
									children: inFs ? `Freispiel ${Math.min(fsTotal, fsTotal - freeLeft + 1)} / ${fsTotal}` : pack.hint
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-[#e8c85a]",
									children: "96,5 %"
								})]
							}),
							inFs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-center gap-3",
								children: [globalMult > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OlympOrb, {
									value: globalMult,
									size: "hud"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.22em] text-[#c9b07a]",
										children: "Multiplikator"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-display text-2xl leading-none tracking-wide text-[#ffe08a]",
										children: [
											"×",
											Math.max(1, globalMult),
											seqMult > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-2 text-base text-[#e8c85a]",
												children: ["+", seqMult]
											}) : null
										]
									})]
								})]
							}) : seqMult > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OlympOrb, {
									value: seqMult,
									size: "hud"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-lg text-[#ffe08a]",
									children: ["Orbs ×", seqMult]
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelBank, {
								reels,
								spinKey,
								busy,
								winCells,
								vanish,
								variant: pack.variant,
								rows: 5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 min-h-7 text-center text-sm",
								children: last && last.totalPayout > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[#ffe08a]",
									children: [
										last.lineWins.map((w) => `${w.count}× ${w.symbol.label}`).join(" · ") || "Scatter",
										last.scatterCount >= 4 ? ` · ${last.scatterCount}× ${pack.scatterName}` : "",
										" · ",
										formatEuro(last.totalPayout)
									]
								}) : last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted",
									children: "Kein Gewinn"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[#8a7a58]",
									children: [
										"4× ",
										pack.scatterName,
										" = ",
										kit.fsCount,
										" Freispiele · Orbs bis ×500"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center rounded-md border border-[#e8c85a]/30 bg-bg/70",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "size-11",
												disabled: busy || inFs || betIndex === 0,
												onClick: () => setBetIndex((i) => Math.max(0, i - 1)),
												"aria-label": "Einsatz senken",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "min-w-16 text-center text-sm tabular-nums",
												children: formatEuro(stake)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "size-11",
												disabled: busy || inFs || betIndex === def.betSteps.length - 1,
												onClick: () => setBetIndex((i) => Math.min(def.betSteps.length - 1, i + 1)),
												"aria-label": "Einsatz erhöhen",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: busy || inFs,
										onClick: () => setAnte((v) => !v),
										className: cn("h-11 rounded-md border px-3 text-xs uppercase tracking-wider", ante ? "border-[#e8c85a] bg-[#e8c85a] text-[#1a1408]" : "border-[#e8c85a]/30 bg-bg/70 text-fg"),
										children: "Ante"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: busy && autoLeft === 0,
											onClick: () => {
												if (autoLeft > 0) setAutoLeft(0);
												else setAutoOpen((v) => !v);
											},
											className: cn("h-11 rounded-md border px-3 text-xs uppercase tracking-wider", autoLeft > 0 ? "border-[#e8c85a] bg-[#e8c85a] text-[#1a1408]" : "border-[#e8c85a]/30 bg-bg/70"),
											children: autoLeft > 0 ? `Auto ${autoLeft}` : "Auto"
										}), autoOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute bottom-12 left-0 z-30 flex gap-1 rounded-md border border-border bg-surface p-1",
											children: AUTO_OPTS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "h-10 min-w-10 px-2 text-xs",
												onClick: () => {
													setAutoLeft(n);
													setAutoOpen(false);
												},
												children: n
											}, n))
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setTurbo((v) => !v),
										className: cn("inline-flex size-11 items-center justify-center rounded-md border", turbo ? "border-[#e8c85a] bg-[#e8c85a] text-[#1a1408]" : "border-[#e8c85a]/30 bg-bg/70"),
										"aria-label": "Turbo",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: busy || !inFs && balance < stake,
										onClick: () => void runSpin(false),
										className: "relative ml-auto flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40 sm:size-[4.5rem]",
										children: busy ? "…" : inFs ? "Frei" : "Drehen"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: busy || inFs,
									onClick: () => void buyBonus(),
									className: "h-11 flex-1 rounded-md border border-[#e8c85a]/30 text-xs uppercase tracking-wider text-[#e8c85a]",
									children: ["Bonus · ", formatEuro(bet * pack.buy)]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg/70 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-wider text-[#8a7a58]",
										children: "Gewinn"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tabular-nums text-[#ffe08a]",
										children: displayWin ? formatEuro(displayWin) : "—"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-bg/70 px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-wider text-[#8a7a58]",
										children: "Guthaben"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl tabular-nums text-fg",
										children: formatEuro(balance)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
						]
					})
				})]
			}),
			inFs && last?.scatterCount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute right-3 top-24 hidden w-16 sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SymbolFace, {
					symbol: def.symbols.find((s) => s.kind === "scatter"),
					variant: pack.variant
				})
			}) : null,
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				variant: "pragmatic",
				onDone: () => setCelebrate(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paytable, {
				open: payOpen,
				onOpenChange: setPayOpen,
				def,
				stake,
				name: pack.name
			})
		]
	});
}
var SEG = [
	{
		id: "1",
		label: "1×",
		color: "#3a8aee",
		mult: 1
	},
	{
		id: "2",
		label: "2×",
		color: "#3dcc6a",
		mult: 2
	},
	{
		id: "5",
		label: "5×",
		color: "#e8c85a",
		mult: 5
	},
	{
		id: "8",
		label: "8×",
		color: "#e23a2a",
		mult: 8
	},
	{
		id: "10",
		label: "10×",
		color: "#b040e0",
		mult: 10
	},
	{
		id: "15",
		label: "15×",
		color: "#3a8aee",
		mult: 15
	},
	{
		id: "20",
		label: "20×",
		color: "#3dcc6a",
		mult: 20
	},
	{
		id: "coin",
		label: "COIN",
		color: "#e8c85a",
		mult: 40
	},
	{
		id: "40",
		label: "40×",
		color: "#e23a2a",
		mult: 40
	},
	{
		id: "hunt",
		label: "HUNT",
		color: "#b040e0",
		bonus: 25
	},
	{
		id: "2b",
		label: "2×",
		color: "#3a8aee",
		mult: 2
	},
	{
		id: "5b",
		label: "5×",
		color: "#3dcc6a",
		mult: 5
	}
];
var STEPS$4 = ORIGINAL_STEPS;
function GluecksradView() {
	const [betI, setBetI] = (0, import_react.useState)(2);
	const bet = STEPS$4[betI] ?? 200;
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [rot, setRot] = (0, import_react.useState)(0);
	const [hit, setHit] = (0, import_react.useState)(null);
	const [last, setLast] = (0, import_react.useState)(null);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const slice = 360 / SEG.length;
	async function spin() {
		unlockAudio();
		if (busy) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Glücksrad")) return;
		setBusy(true);
		setHit(null);
		const idx = randInt(SEG.length);
		const target = (5 + randInt(3)) * 360 + (360 - idx * slice - slice / 2);
		setRot(target);
		if (soundOn) sfx.wheel();
		window.setTimeout(() => {
			const seg = SEG[idx];
			setHit(seg);
			const paid = Math.round(bet * ("bonus" in seg && seg.bonus ? seg.bonus : "mult" in seg ? seg.mult : 1));
			if (paid > 0) creditWin(paid, "Glücksrad");
			setLast(paid);
			setBusy(false);
			if (soundOn) sfx.win(paid >= bet * 8);
		}, 4200);
	}
	const conic = (0, import_react.useMemo)(() => SEG.map((s, i) => `${s.color} ${i * slice}deg ${(i + 1) * slice}deg`).join(", "), [slice]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OriginalShell, {
		title: "Glücksrad",
		subtitle: "Live Show · 12 Felder · bis 40×",
		slug: "gluecksrad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative size-[min(86vw,22rem)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-0 z-10 h-8 w-6 -translate-x-1/2 bg-[#e8c85a] [clip-path:polygon(50%_100%,0_0,100%_0)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "size-full rounded-full border-8 border-[#e8c85a] shadow-2xl",
							style: {
								background: `conic-gradient(${conic})`,
								transform: `rotate(${rot}deg)`,
								transition: busy ? "transform 4s cubic-bezier(0.12,0.7,0.1,1)" : "none"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-[32%] grid place-items-center rounded-full bg-bg/90 font-display text-xl text-[#e8c85a]",
							children: hit ? hit.label : "LIVE"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 min-h-6 text-center text-sm text-[#e8c85a]",
					children: hit ? `${hit.label} · ${formatEuro(last ?? 0)}` : "Drehen — Zahl oder Bonusfeld"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
					bet,
					betI,
					setBetI,
					busy,
					onPlay: () => void spin(),
					label: busy ? "Dreht…" : "Drehen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
					last,
					bet
				})
			]
		})
	});
}
var PAY$1 = {
	0: 0,
	1: 0,
	2: 1,
	3: 2,
	4: 5,
	5: 12,
	6: 30,
	7: 80,
	8: 200,
	9: 500,
	10: 1e3
};
var STEPS$3 = ORIGINAL_STEPS;
function KenoView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = STEPS$3[betI] ?? 100;
	const [picks, setPicks] = (0, import_react.useState)([]);
	const [drawn, setDrawn] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const hits = (0, import_react.useMemo)(() => picks.filter((n) => drawn.includes(n)).length, [picks, drawn]);
	function toggle(n) {
		if (busy) return;
		setPicks((p) => p.includes(n) ? p.filter((x) => x !== n) : p.length >= 10 ? p : [...p, n]);
	}
	async function play() {
		unlockAudio();
		if (busy || picks.length < 2) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Keno")) return;
		setBusy(true);
		setDrawn([]);
		const balls = fisherYates(Array.from({ length: 80 }, (_, i) => i + 1)).slice(0, 20);
		for (let i = 0; i < balls.length; i++) {
			await new Promise((r) => setTimeout(r, 70));
			setDrawn(balls.slice(0, i + 1));
			if (soundOn && i % 2 === 0) sfx.coin();
		}
		const hit = picks.filter((n) => balls.includes(n)).length;
		const paid = Math.round(bet * (PAY$1[hit] ?? 0));
		if (paid > 0) creditWin(paid, "Keno");
		setLast(paid);
		setBusy(false);
		if (soundOn) sfx.win(paid >= bet * 8);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Keno",
		subtitle: "2–10 Zahlen · 20 Kugeln",
		slug: "keno",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-10 gap-1",
				children: Array.from({ length: 80 }, (_, i) => i + 1).map((n) => {
					const on = picks.includes(n);
					const hit = drawn.includes(n) && on;
					const ball = drawn.includes(n);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => toggle(n),
						className: cn("aspect-square rounded-sm text-xs tabular-nums", hit ? "bg-[#e8c85a] text-[#1a1408]" : ball ? "bg-elevated text-muted" : on ? "bg-accent text-accent-fg" : "bg-surface text-fg"),
						children: n
					}, n);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-center text-sm text-muted",
				children: [
					picks.length,
					" gewählt · ",
					drawn.length ? `${hits} Treffer` : "Wähle 2–10 Zahlen"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
				bet,
				betI,
				setBetI,
				busy,
				onPlay: () => void play(),
				label: busy ? "Zieht…" : "Ziehen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			})
		]
	});
}
var def = FISH_DEF;
function empty() {
	return spinGrid(def).map((col, i) => ({
		strip: paintStrip(def, col, i, 30),
		offset: 30,
		spinning: false,
		settleMs: 0
	}));
}
function AnglerView() {
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betI, setBetI] = (0, import_react.useState)(() => def.betSteps.indexOf(def.defaultBet));
	const bet = def.betSteps[Math.max(0, betI)] ?? def.defaultBet;
	const [reels, setReels] = (0, import_react.useState)(empty);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [spinKey, setSpinKey] = (0, import_react.useState)(0);
	const [last, setLast] = (0, import_react.useState)(null);
	const [inFs, setInFs] = (0, import_react.useState)(false);
	const [left, setLeft] = (0, import_react.useState)(0);
	const [total, setTotal] = (0, import_react.useState)(10);
	const [caught, setCaught] = (0, import_react.useState)(0);
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const spinning = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		touchGame("raubfisch");
		startBed(90);
		return () => stopBed();
	}, [touchGame]);
	const winCells = (0, import_react.useMemo)(() => {
		const s = /* @__PURE__ */ new Set();
		last?.lineWins.forEach((w) => w.cells.forEach((c) => s.add(`${c.reel}-${c.row}`)));
		return s;
	}, [last]);
	const run = (0, import_react.useCallback)(async (isFree = false) => {
		if (spinning.current) return;
		unlockAudio();
		if (!isFree) {
			if (!placeBet(bet, "Raubfisch")) {
				setCashier(true);
				return;
			}
		}
		spinning.current = true;
		setBusy(true);
		if (soundOn) {
			sfx.spin();
			startRumble();
		}
		const grid = spinGrid(def, !isFree && Math.random() < .08 ? 3 : 0);
		setSpinKey((k) => k + 1);
		const stops = REEL_STOP_PRAG;
		setReels(grid.map((col, i) => ({
			strip: paintStrip(def, col, i, 30),
			offset: 30,
			spinning: true,
			settleMs: stops[i]
		})));
		await new Promise((r) => setTimeout(r, Math.max(...stops)));
		stopRumble();
		setReels((cols) => cols.map((c) => ({
			...c,
			spinning: false
		})));
		const result = evaluateSpin(def, grid, bet, 1);
		let extra = 0;
		if (isFree) {
			const haul = collectFish(grid, bet);
			extra = haul.cash;
			setCaught((n) => n + extra);
			if (haul.wilds && soundOn) sfx.bonus();
		}
		const paid = result.totalPayout + extra;
		setLast({
			...result,
			totalPayout: paid
		});
		if (paid > 0) {
			creditWin(paid, "Raubfisch");
			const tier = winTier(paid, bet);
			if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({
				payout: paid,
				stake: bet,
				tier
			});
			if (soundOn) sfx.win(paid >= bet * 8);
		} else if (soundOn) sfx.lose();
		if (!isFree && result.freeSpinsAwarded) {
			setInFs(true);
			setLeft(result.freeSpinsAwarded);
			setTotal(result.freeSpinsAwarded);
			setCaught(0);
			if (soundOn) sfx.bonus();
		} else if (isFree) setLeft((n) => Math.max(0, n - 1));
		spinning.current = false;
		setBusy(false);
	}, [
		bet,
		creditWin,
		placeBet,
		setCashier,
		soundOn
	]);
	(0, import_react.useEffect)(() => {
		if (busy || celebrate) return;
		if (inFs && left > 0) {
			const t = window.setTimeout(() => void run(true), 700);
			return () => window.clearTimeout(t);
		}
		if (inFs && left <= 0) setInFs(false);
	}, [
		busy,
		celebrate,
		inFs,
		left,
		run
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-fish sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/raubfisch.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#041018]/75" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto flex max-w-[42rem] flex-col px-2 pb-10 pt-2 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center text-fg/80",
							"aria-label": "Lobby",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.28em] text-[#7ad0c8]",
								children: "10 Linien · Fische sammeln"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl",
								children: "Raubfisch"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-11 text-muted",
							"aria-label": "Gewinntabelle",
							onClick: () => setPayOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 mx-auto" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "slot-bezel slot-skin-fish",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "slot-cabinet",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-center text-[11px] uppercase tracking-wider text-[#7ad0c8]",
								children: inFs ? `Bonus ${total - left + (busy ? 0 : 1)} / ${total} · Fang ${formatEuro(caught)}` : "3× Kiste = 10 Freispiele · Angler sammelt Fische"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReelBank, {
								reels,
								spinKey,
								busy,
								winCells,
								variant: "deep"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded-md border border-[#7ad0c8]/30 bg-bg/70",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11",
											disabled: busy || inFs || betI === 0,
											onClick: () => setBetI((i) => Math.max(0, i - 1)),
											"aria-label": "Einsatz senken",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-16 text-center text-sm tabular-nums",
											children: formatEuro(bet)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "size-11",
											disabled: busy || inFs || betI === def.betSteps.length - 1,
											onClick: () => setBetI((i) => Math.min(def.betSteps.length - 1, i + 1)),
											"aria-label": "Einsatz erhöhen",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: busy || !inFs && balance < bet,
									onClick: () => void run(false),
									className: "ml-auto flex size-16 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase slot-spin-btn disabled:opacity-40",
									children: busy ? "…" : inFs ? "Frei" : "Drehen"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
						]
					})
				})]
			}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				variant: "pragmatic",
				onDone: () => setCelebrate(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paytable, {
				open: payOpen,
				onOpenChange: setPayOpen,
				def,
				stake: bet,
				name: "Raubfisch"
			})
		]
	});
}
var CLUSTER_COLORS = [
	{
		id: "amber",
		fill: "#e8a020",
		pay: .25
	},
	{
		id: "rose",
		fill: "#e05070",
		pay: .3
	},
	{
		id: "violet",
		fill: "#8a40d0",
		pay: .4
	},
	{
		id: "leaf",
		fill: "#3cb06a",
		pay: .5
	},
	{
		id: "sky",
		fill: "#3a88e0",
		pay: .8
	},
	{
		id: "honey",
		fill: "#ffd45a",
		pay: 1.2
	},
	{
		id: "bee",
		fill: "#1a1408",
		pay: 2.5
	}
];
function randomCell() {
	const w = [
		18,
		16,
		14,
		12,
		10,
		6,
		4
	];
	let r = randInt(w.reduce((a, b) => a + b, 0));
	for (let i = 0; i < CLUSTER_COLORS.length; i++) {
		r -= w[i];
		if (r < 0) return { ...CLUSTER_COLORS[i] };
	}
	return { ...CLUSTER_COLORS[0] };
}
function spinCluster() {
	return Array.from({ length: 7 }, () => Array.from({ length: 7 }, randomCell));
}
function findClusters(grid) {
	const seen = /* @__PURE__ */ new Set();
	const hits = [];
	const n = 7;
	for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
		const key = `${r}-${c}`;
		if (seen.has(key)) continue;
		const id = grid[r][c].id;
		const stack = [[r, c]];
		const cells = [];
		seen.add(key);
		while (stack.length) {
			const [y, x] = stack.pop();
			cells.push(`${y}-${x}`);
			for (const [dy, dx] of [
				[0, 1],
				[0, -1],
				[1, 0],
				[-1, 0]
			]) {
				const ny = y + dy;
				const nx = x + dx;
				if (ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
				const nk = `${ny}-${nx}`;
				if (seen.has(nk)) continue;
				if (grid[ny][nx].id !== id) continue;
				seen.add(nk);
				stack.push([ny, nx]);
			}
		}
		if (cells.length >= 5) {
			const pay = grid[r][c].pay * (cells.length >= 12 ? 8 : cells.length >= 8 ? 3 : 1);
			hits.push({
				id,
				cells,
				pay
			});
		}
	}
	return hits;
}
function dropCluster(grid, vanish) {
	const n = 7;
	const next = grid.map((row) => row.slice());
	for (let c = 0; c < n; c++) {
		const kept = [];
		for (let r = 0; r < n; r++) if (!vanish.has(`${r}-${c}`)) kept.push(grid[r][c]);
		const col = [...Array.from({ length: n - kept.length }, randomCell), ...kept];
		for (let r = 0; r < n; r++) next[r][c] = col[r];
	}
	return next;
}
var STEPS$2 = [
	20,
	50,
	100,
	200,
	500,
	1e3,
	2500
];
function BienenView() {
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betI, setBetI] = (0, import_react.useState)(2);
	const bet = STEPS$2[betI] ?? 100;
	const [grid, setGrid] = (0, import_react.useState)(spinCluster);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [hit, setHit] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [paid, setPaid] = (0, import_react.useState)(0);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const lock = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		touchGame("bienenrausch");
		startBed(140);
		return () => stopBed();
	}, [touchGame]);
	const run = (0, import_react.useCallback)(async () => {
		if (lock.current) return;
		unlockAudio();
		if (!placeBet(bet, "Bienenrausch")) {
			setCashier(true);
			return;
		}
		lock.current = true;
		setBusy(true);
		setPaid(0);
		if (soundOn) sfx.spin();
		let g = spinCluster();
		setGrid(g);
		await new Promise((r) => setTimeout(r, 220));
		let total = 0;
		for (let i = 0; i < 8; i++) {
			const clusters = findClusters(g);
			if (!clusters.length) break;
			const keys = new Set(clusters.flatMap((c) => c.cells));
			setHit(keys);
			const add = clusters.reduce((s, c) => s + Math.round(bet * c.pay), 0);
			total += add;
			setPaid(total);
			if (soundOn) sfx.explode();
			await new Promise((r) => setTimeout(r, 420));
			g = dropCluster(g, keys);
			setHit(/* @__PURE__ */ new Set());
			setGrid(g);
			if (soundOn) sfx.tumble();
			await new Promise((r) => setTimeout(r, 240));
		}
		if (total > 0) {
			creditWin(total, "Bienenrausch");
			const tier = winTier(total, bet);
			if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({
				payout: total,
				stake: bet,
				tier
			});
			if (soundOn) sfx.win(total >= bet * 8);
		} else if (soundOn) sfx.lose();
		lock.current = false;
		setBusy(false);
	}, [
		bet,
		creditWin,
		placeBet,
		setCashier,
		soundOn
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/bienenrausch.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[#140c04]/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-20 mx-auto max-w-[28rem] px-3 pb-10 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex size-11 items-center justify-center text-fg/80",
								"aria-label": "Lobby",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.28em] text-[#e8c85a]",
									children: "7×7 · Cluster ab 5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display text-3xl",
									children: "Bienenrausch"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-11" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "honey-board",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-7 gap-1",
							children: grid.flatMap((row, r) => row.map((cell, c) => {
								const key = `${r}-${c}`;
								const on = hit.has(key);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("honey-cell", on && "is-hit"),
									style: { background: cell.fill },
									title: cell.id
								}, key);
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 min-h-6 text-center text-sm text-[#e8c85a]",
						children: paid ? formatEuro(paid) : "5 gleiche Nachbarn zahlen · Tumble"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center rounded-md border border-[#e8c85a]/30 bg-bg/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-11",
									disabled: busy || betI === 0,
									onClick: () => setBetI((i) => Math.max(0, i - 1)),
									"aria-label": "Einsatz senken",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-16 text-center text-sm tabular-nums",
									children: formatEuro(bet)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "size-11",
									disabled: busy || betI === STEPS$2.length - 1,
									onClick: () => setBetI((i) => Math.min(STEPS$2.length - 1, i + 1)),
									"aria-label": "Einsatz erhöhen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy || balance < bet,
							onClick: () => void run(),
							className: "ml-auto h-14 rounded-full bg-[#e8c85a] px-6 text-sm font-semibold uppercase tracking-wider text-[#1a1408] disabled:opacity-40",
							children: busy ? "…" : "Drehen"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
				]
			}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				variant: "pragmatic",
				onDone: () => setCelebrate(null)
			}) : null
		]
	});
}
var MEGA_SYMS = [
	{
		id: "j",
		label: "J",
		kind: "low",
		weight: 16,
		pays: [
			.15,
			.4,
			.9,
			1.8
		],
		art: "/games/sym/wege-j.jpg"
	},
	{
		id: "q",
		label: "Q",
		kind: "low",
		weight: 15,
		pays: [
			.15,
			.4,
			.9,
			1.8
		],
		art: "/games/sym/wege-q.jpg"
	},
	{
		id: "k",
		label: "K",
		kind: "low",
		weight: 13,
		pays: [
			.2,
			.6,
			1.2,
			2.5
		],
		art: "/games/sym/wege-k.jpg"
	},
	{
		id: "a",
		label: "A",
		kind: "low",
		weight: 12,
		pays: [
			.2,
			.6,
			1.2,
			2.5
		],
		art: "/games/sym/wege-a.jpg"
	},
	{
		id: "gem",
		label: "Stein",
		kind: "mid",
		weight: 8,
		pays: [
			.4,
			1.2,
			3,
			8
		],
		art: "/games/sym/wege-gem.jpg"
	},
	{
		id: "crown",
		label: "Krone",
		kind: "high",
		weight: 5,
		pays: [
			.8,
			2.5,
			8,
			20
		],
		art: "/games/sym/wege-crown.jpg"
	},
	{
		id: "wild",
		label: "Maske",
		kind: "wild",
		weight: 4,
		pays: [
			0,
			0,
			0,
			0
		],
		art: "/games/sym/wege-wild.jpg"
	},
	{
		id: "scatter",
		label: "Flut",
		kind: "scatter",
		weight: 3,
		pays: [
			0,
			0,
			0,
			0
		],
		art: "/games/sym/wege-scatter.jpg"
	}
];
var MEGA_CAP = 5e3;
var HEIGHT_W = [
	{
		n: 2,
		weight: 8
	},
	{
		n: 3,
		weight: 16
	},
	{
		n: 4,
		weight: 22
	},
	{
		n: 5,
		weight: 22
	},
	{
		n: 6,
		weight: 18
	},
	{
		n: 7,
		weight: 14
	}
];
function pickMega(allowScatter = true) {
	const pool = allowScatter ? MEGA_SYMS : MEGA_SYMS.filter((s) => s.kind !== "scatter");
	return { ...weightedPick(pool) };
}
function spinMega(forceScatters = 0) {
	const grid = [];
	for (let r = 0; r < 6; r++) {
		const h = weightedPick(HEIGHT_W).n;
		const col = [];
		for (let i = 0; i < h; i++) col.push(pickMega(r > 0 && r < 5));
		grid.push(col);
	}
	if (forceScatters > 0) {
		const sc = MEGA_SYMS.find((s) => s.kind === "scatter");
		let n = 0;
		for (let r = 1; r < 5 && n < forceScatters; r++) {
			grid[r][0] = { ...sc };
			n += 1;
		}
	}
	return grid;
}
function evalMega(grid, stake, mult) {
	const paying = MEGA_SYMS.filter((s) => s.kind !== "wild" && s.kind !== "scatter");
	const wins = [];
	let waysTotal = 1;
	for (const col of grid) waysTotal *= col.length;
	for (const target of paying) {
		const cells = [];
		const per = [];
		for (let r = 0; r < grid.length; r++) {
			let n = 0;
			grid[r].forEach((s, row) => {
				if (s.id === target.id || s.kind === "wild") {
					n += 1;
					cells.push(`${r}-${row}`);
				}
			});
			if (n === 0) break;
			per.push(n);
		}
		const count = per.length;
		if (count < 3) continue;
		const ways = per.reduce((a, b) => a * b, 1);
		const payX = target.pays[Math.min(count, 6) - 3] ?? 0;
		const pay = Math.round(stake * payX * ways * mult);
		if (pay > 0) wins.push({
			id: target.id,
			count,
			ways,
			pay,
			cells
		});
	}
	let scatter = 0;
	for (const col of grid) for (const s of col) if (s.kind === "scatter") scatter += 1;
	const scatterPay = scatter >= 4 ? Math.round(stake * (scatter === 4 ? 3 : scatter === 5 ? 10 : 50)) : 0;
	const payout = Math.min(stake * MEGA_CAP, wins.reduce((s, w) => s + w.pay, 0) + scatterPay);
	return {
		wins,
		scatter,
		payout,
		ways: waysTotal
	};
}
function dropMega(grid, vanish) {
	return grid.map((col, r) => {
		const kept = col.filter((_, row) => !vanish.has(`${r}-${row}`));
		const need = col.length - kept.length;
		const fill = Array.from({ length: need }, () => pickMega(false));
		return [...kept, ...fill];
	});
}
function megaFsAward(scatter) {
	if (scatter >= 6) return 24;
	if (scatter >= 5) return 16;
	if (scatter >= 4) return 12;
	return 0;
}
var STEPS$1 = [
	20,
	50,
	100,
	200,
	500,
	1e3,
	2500
];
var wait$1 = (ms) => new Promise((r) => window.setTimeout(r, ms));
function WegeView() {
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betI, setBetI] = (0, import_react.useState)(2);
	const bet = STEPS$1[betI] ?? 100;
	const [grid, setGrid] = (0, import_react.useState)(() => spinMega());
	const [hit, setHit] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [paid, setPaid] = (0, import_react.useState)(0);
	const [ways, setWays] = (0, import_react.useState)(0);
	const [fs, setFs] = (0, import_react.useState)(0);
	const [fsMult, setFsMult] = (0, import_react.useState)(1);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const lock = (0, import_react.useRef)(false);
	const pity = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		touchGame("wegeflut");
		startBed(70);
		return () => stopBed();
	}, [touchGame]);
	const tumble = (0, import_react.useCallback)(async (start, stake, mult) => {
		let g = start;
		let total = 0;
		let m = mult;
		for (let i = 0; i < 12; i++) {
			const ev = evalMega(g, stake, m);
			setWays(ev.ways);
			if (!ev.wins.length) {
				if (i === 0 && ev.payout > 0) total += ev.payout;
				break;
			}
			const keys = new Set(ev.wins.flatMap((w) => w.cells));
			setHit(keys);
			total += ev.payout;
			setPaid(total);
			if (soundOn) sfx.explode();
			await wait$1(420);
			g = dropMega(g, keys);
			setHit(/* @__PURE__ */ new Set());
			setGrid(g);
			if (fs > 0 || mult > 1) m += 1;
			setFsMult(m);
			if (soundOn) sfx.tumble();
			await wait$1(220);
		}
		const last = evalMega(g, stake, m);
		const award = megaFsAward(last.scatter);
		return {
			total,
			award,
			scatter: last.scatter
		};
	}, [fs, soundOn]);
	const run = (0, import_react.useCallback)(async (isFree = false, buy = false) => {
		if (lock.current) return;
		unlockAudio();
		const cost = buy ? bet * 100 : bet;
		if (!isFree) {
			if (!placeBet(cost, buy ? "Wegeflut · Bonus" : "Wegeflut")) {
				setCashier(true);
				return;
			}
		}
		lock.current = true;
		setBusy(true);
		setPaid(0);
		if (soundOn) sfx.spin();
		pity.current += isFree ? 0 : 1;
		const force = buy || !isFree && pity.current >= 14 ? 4 : 0;
		if (force) pity.current = 0;
		for (let k = 0; k < 5; k++) {
			setGrid(spinMega());
			await wait$1(70);
		}
		let g = spinMega(force);
		setGrid(g);
		await wait$1(180);
		const { total, award } = await tumble(g, bet, isFree ? fsMult : 1);
		if (award && !isFree) {
			setFs(award);
			setFsMult(1);
			if (soundOn) sfx.scatter();
		}
		if (total > 0) {
			creditWin(total, "Wegeflut");
			const tier = winTier(total, bet);
			if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({
				payout: total,
				stake: bet,
				tier
			});
			if (soundOn) sfx.win(total >= bet * 8);
		} else if (soundOn) sfx.lose();
		lock.current = false;
		setBusy(false);
		if (isFree) setFs((n) => {
			const left = Math.max(0, n - 1);
			if (left > 0) window.setTimeout(() => void run(true), 420);
			return left;
		});
		else if (award) window.setTimeout(() => void run(true), 700);
	}, [
		bet,
		creditWin,
		fsMult,
		placeBet,
		setCashier,
		soundOn,
		tumble
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-mega sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/wegeflut.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-35"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-4 pb-28 pt-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
								"aria-label": "Lobby",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl",
								children: "Wegeflut"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[#e8c85a]",
								children: [
									"6 Walzen · 2–7 hoch · bis ",
									MEGA_CAP.toLocaleString("de-DE"),
									"×"
								]
							})] }),
							fs > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-auto rounded-md bg-[#e8c85a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#1a1408]",
								children: [
									"FS ",
									fs,
									" · ×",
									fsMult
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mega-board",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end gap-1",
							style: { minHeight: `calc(var(--mega-cell) * 7)` },
							children: grid.map((col, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-1 flex-col-reverse gap-1",
								children: col.map((s, row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("mega-cell", hit.has(`${ri}-${row}`) && "is-hit", s.kind === "scatter" && "is-scatter", s.kind === "wild" && "is-wild"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.art,
										alt: "",
										className: "h-full w-full object-cover"
									})
								}, `${ri}-${row}`))
							}, ri))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-sm tabular-nums text-muted",
						children: [
							ways.toLocaleString("de-DE"),
							" Wege · ",
							formatEuro(paid)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-md border border-[#c9a227]/40 bg-bg/70",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "size-11",
										disabled: busy || betI === 0,
										onClick: () => setBetI((i) => Math.max(0, i - 1)),
										"aria-label": "Einsatz senken",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-16 text-center text-sm tabular-nums",
										children: formatEuro(bet)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "size-11",
										disabled: busy || betI === STEPS$1.length - 1,
										onClick: () => setBetI((i) => Math.min(STEPS$1.length - 1, i + 1)),
										"aria-label": "Einsatz erhöhen",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy || balance < bet * 100,
								onClick: () => void run(false, true),
								className: "h-11 rounded-md border border-[#c9a227]/50 px-3 text-xs font-semibold uppercase tracking-wider text-[#e8c85a] disabled:opacity-40",
								children: ["Bonus ", formatEuro(bet * 100)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy || balance < bet,
								onClick: () => void run(false),
								className: "ml-auto h-12 min-w-32 rounded-md bg-[#e8c85a] px-6 text-sm font-semibold uppercase tracking-wider text-[#1a1408] disabled:opacity-40",
								children: busy ? "…" : "Drehen"
							})
						]
					})
				]
			}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				variant: "pragmatic",
				soundOn,
				...celebrate,
				onDone: () => setCelebrate(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
		]
	});
}
var TRAIN_CAP = 5e3;
var CASH_BAG = [
	{
		mult: 1,
		weight: 22
	},
	{
		mult: 2,
		weight: 18
	},
	{
		mult: 3,
		weight: 14
	},
	{
		mult: 5,
		weight: 12
	},
	{
		mult: 8,
		weight: 8
	},
	{
		mult: 10,
		weight: 7
	},
	{
		mult: 15,
		weight: 5
	},
	{
		mult: 20,
		weight: 4
	},
	{
		mult: 25,
		weight: 3
	},
	{
		mult: 50,
		weight: 2
	},
	{
		mult: 100,
		weight: 1
	}
];
function cash() {
	return {
		kind: "cash",
		mult: weightedPick(CASH_BAG).mult,
		lock: true
	};
}
function spinTrainBase(force = false) {
	const grid = [];
	for (let c = 0; c < 5; c++) {
		const col = [];
		for (let r = 0; r < 4; r++) if (randInt(100) < 18) col.push(cash());
		else col.push({ kind: "empty" });
		grid.push(col);
	}
	if (force) {
		let n = 0;
		for (let c = 0; c < 5 && n < 6; c++) for (let r = 0; r < 4 && n < 6; r++) if (grid[c][r].kind !== "cash") {
			grid[c][r] = cash();
			n += 1;
		} else n += 1;
	}
	return grid;
}
function countCash(grid) {
	let n = 0;
	for (const col of grid) for (const cell of col) if (cell.kind !== "empty") n += 1;
	return n;
}
var BONUS_BAG = [
	{
		kind: "empty",
		weight: 62
	},
	{
		kind: "cash",
		weight: 22
	},
	{
		kind: "sammler",
		weight: 5
	},
	{
		kind: "nachbar",
		weight: 4
	},
	{
		kind: "auge",
		weight: 3
	},
	{
		kind: "plus",
		weight: 2
	},
	{
		kind: "super",
		weight: 1
	},
	{
		kind: "multi",
		weight: 1
	}
];
function spinTrainBonusCell() {
	const kind = weightedPick(BONUS_BAG).kind;
	if (kind === "empty") return { kind: "empty" };
	if (kind === "cash") return cash();
	return {
		kind,
		lock: true
	};
}
function applyCollectors(grid, persist) {
	const next = grid.map((col) => col.map((c) => ({ ...c })));
	let collected = 0;
	const cashAt = (c, r) => {
		const cell = next[c]?.[r];
		return cell?.kind === "cash" ? cell.mult ?? 0 : 0;
	};
	const runOnce = (kind, c, r) => {
		const power = 1 + persist;
		if (kind === "sammler" || kind === "super") {
			for (let x = 0; x < 5; x++) for (let y = 0; y < 4; y++) collected += cashAt(x, y);
			collected *= power;
		} else if (kind === "nachbar") for (const [dx, dy] of [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0]
		]) collected += cashAt(c + dx, r + dy) * power;
		else if (kind === "auge") {
			let best = 0;
			for (let x = 0; x < 5; x++) for (let y = 0; y < 4; y++) best = Math.max(best, cashAt(x, y));
			collected += best * power;
		} else if (kind === "multi") for (let x = 0; x < 5; x++) for (let y = 0; y < 4; y++) {
			const cell = next[x][y];
			if (cell.kind === "cash" && cell.mult) cell.mult *= 2;
		}
	};
	for (let c = 0; c < 5; c++) for (let r = 0; r < 4; r++) {
		const cell = next[c][r];
		if (cell.kind === "sammler" || cell.kind === "nachbar" || cell.kind === "auge" || cell.kind === "super" || cell.kind === "multi") runOnce(cell.kind, c, r);
	}
	return {
		grid: next,
		collected
	};
}
function leftoverCash(grid) {
	let s = 0;
	for (const col of grid) for (const cell of col) if (cell.kind === "cash") s += cell.mult ?? 0;
	return s;
}
var TRAIN_LABEL = {
	empty: "",
	cash: "Münze",
	sammler: "Sammler",
	nachbar: "Nachbar",
	auge: "Auge",
	plus: "+1",
	super: "Super",
	multi: "×2"
};
var STEPS = [
	20,
	50,
	100,
	200,
	500,
	1e3,
	2500
];
var wait = (ms) => new Promise((r) => window.setTimeout(r, ms));
function TrainView() {
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const touchGame = useCasino((s) => s.touchGame);
	const [betI, setBetI] = (0, import_react.useState)(2);
	const bet = STEPS[betI] ?? 100;
	const [grid, setGrid] = (0, import_react.useState)(() => spinTrainBase());
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [left, setLeft] = (0, import_react.useState)(0);
	const [paid, setPaid] = (0, import_react.useState)(0);
	const [bonus, setBonus] = (0, import_react.useState)(false);
	const [persist, setPersist] = (0, import_react.useState)(0);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const lock = (0, import_react.useRef)(false);
	const pity = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		touchGame("schatzzug");
		startBed(55);
		return () => stopBed();
	}, [touchGame]);
	const runBonus = (0, import_react.useCallback)(async (start, stake) => {
		setBonus(true);
		let g = start.map((col) => col.map((c) => ({
			...c,
			lock: c.kind !== "empty"
		})));
		setGrid(g);
		let respins = 3;
		let plus = 0;
		let total = 0;
		setLeft(respins);
		setPersist(0);
		while (respins > 0) {
			await wait(480);
			let landed = false;
			g = g.map((col) => col.map((cell) => {
				if (cell.kind !== "empty") return cell;
				const n = spinTrainBonusCell();
				if (n.kind !== "empty") landed = true;
				return n;
			}));
			setGrid(g);
			if (landed) {
				respins = 3;
				if (soundOn) sfx.coin();
			} else respins -= 1;
			plus = 0;
			for (const col of g) for (const cell of col) if (cell.kind === "plus") plus += 1;
			setPersist(plus);
			const { grid: after, collected } = applyCollectors(g, plus);
			g = after;
			setGrid(g);
			if (collected > 0) {
				total += Math.round(stake * collected);
				setPaid(total);
				if (soundOn) sfx.explode();
			}
			setLeft(respins);
			if (countCash(g) >= 20) break;
		}
		const rest = leftoverCash(g);
		total += Math.round(stake * rest);
		total = Math.min(stake * TRAIN_CAP, total);
		setPaid(total);
		setBonus(false);
		return total;
	}, [soundOn]);
	const run = (0, import_react.useCallback)(async (buy = false) => {
		if (lock.current) return;
		unlockAudio();
		const cost = buy ? bet * 100 : bet;
		if (!placeBet(cost, buy ? "Schatzzug · Bonus" : "Schatzzug")) {
			setCashier(true);
			return;
		}
		lock.current = true;
		setBusy(true);
		setPaid(0);
		if (soundOn) sfx.spin();
		pity.current += 1;
		const force = buy || pity.current >= 12;
		if (force) pity.current = 0;
		const g = spinTrainBase(force);
		setGrid(g);
		await wait(360);
		let total = 0;
		if (countCash(g) >= 6) {
			if (soundOn) sfx.scatter();
			total = await runBonus(g, bet);
		}
		if (total > 0) {
			creditWin(total, "Schatzzug");
			const tier = winTier(total, bet);
			if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({
				payout: total,
				stake: bet,
				tier
			});
			if (soundOn) sfx.win(total >= bet * 8);
		} else if (soundOn) sfx.lose();
		lock.current = false;
		setBusy(false);
	}, [
		bet,
		creditWin,
		placeBet,
		runBonus,
		setCashier,
		soundOn
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden slot-skin-train sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/schatzzug.jpg",
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover opacity-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-xl px-4 pb-28 pt-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
								"aria-label": "Lobby",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl",
								children: "Schatzzug"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-[#e8c85a]",
								children: [
									"Hold & Collect · ",
									6,
									" Münzen · 3 Nachdreher"
								]
							})] }),
							bonus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-auto rounded-md bg-[#e23a2a] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white",
								children: [
									left,
									" · +",
									persist
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "train-board",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-5 gap-1",
							children: Array.from({ length: 4 }, (_, row) => Array.from({ length: 5 }, (_, c) => {
								const cell = grid[c][row];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("train-cell", cell.kind !== "empty" && "is-lock", `is-${cell.kind}`),
									children: cell.kind === "cash" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/games/sym/train-coin.jpg",
										alt: "",
										className: "absolute inset-0 h-full w-full object-cover opacity-90"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative z-[1] font-display text-lg tabular-nums",
										children: [cell.mult, "×"]
									})] }) : cell.kind !== "empty" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/games/sym/train-sammler.jpg",
										alt: "",
										className: "absolute inset-0 h-full w-full object-cover opacity-80"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative z-[1] text-[10px] font-semibold uppercase tracking-wider",
										children: TRAIN_LABEL[cell.kind]
									})] }) : null
								}, `${c}-${row}`);
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-sm tabular-nums text-muted",
						children: [
							countCash(grid),
							" belegt · ",
							formatEuro(paid),
							" · max ",
							TRAIN_CAP.toLocaleString("de-DE"),
							"×"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center rounded-md border border-[#c43a2a]/40 bg-bg/70",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "size-11",
										disabled: busy || betI === 0,
										onClick: () => setBetI((i) => Math.max(0, i - 1)),
										"aria-label": "Einsatz senken",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-16 text-center text-sm tabular-nums",
										children: formatEuro(bet)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "size-11",
										disabled: busy || betI === STEPS.length - 1,
										onClick: () => setBetI((i) => Math.min(STEPS.length - 1, i + 1)),
										"aria-label": "Einsatz erhöhen",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								disabled: busy || balance < bet * 100,
								onClick: () => void run(true),
								className: "h-11 rounded-md border border-[#e23a2a]/50 px-3 text-xs font-semibold uppercase tracking-wider text-[#ffb0a0] disabled:opacity-40",
								children: ["Bonus ", formatEuro(bet * 100)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: busy || balance < bet,
								onClick: () => void run(false),
								className: "ml-auto h-12 min-w-32 rounded-md bg-[#e23a2a] px-6 text-sm font-semibold uppercase tracking-wider text-white disabled:opacity-40",
								children: busy ? "…" : "Drehen"
							})
						]
					})
				]
			}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				variant: "pragmatic",
				soundOn,
				...celebrate,
				onDone: () => setCelebrate(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
		]
	});
}
function DiceView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const [target, setTarget] = (0, import_react.useState)(50);
	const [over, setOver] = (0, import_react.useState)(true);
	const [roll, setRoll] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const chance = over ? 100 - target : target;
	const mult = chance > 1 && chance < 98 ? 99 / chance : 0;
	async function play() {
		unlockAudio();
		if (busy) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Würfel")) return;
		setBusy(true);
		if (soundOn) sfx.spin();
		for (let i = 0; i < 8; i++) {
			setRoll(rollDice());
			await new Promise((r) => setTimeout(r, 50));
		}
		const r = rollDice();
		setRoll(r);
		const paid = dicePay(r, target, over, bet);
		setLast(paid);
		if (paid > 0) {
			creditWin(paid, "Würfel");
			if (soundOn) sfx.win(paid >= bet * 5);
		} else if (soundOn) sfx.lose();
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Würfel",
		subtitle: "Über / Unter · 99 % Auszahlung",
		slug: "wuerfel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-surface p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.28em] text-muted",
						children: "Wurf"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-display text-6xl tabular-nums", last != null && last > 0 ? "text-win" : "text-fg"),
						children: roll == null ? "—" : roll.toFixed(2)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							over ? "Über" : "Unter",
							" ",
							target.toFixed(2),
							" · ",
							mult.toFixed(2),
							"× · ",
							chance.toFixed(0),
							" %"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOver(false),
					className: cn("h-11 flex-1 rounded-md text-sm font-semibold", !over ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: "Unter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOver(true),
					className: cn("h-11 flex-1 rounded-md text-sm font-semibold", over ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: "Über"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs uppercase tracking-wider text-muted",
					children: ["Ziel ", target.toFixed(0)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 2,
					max: 98,
					value: target,
					onChange: (e) => setTarget(Number(e.target.value)),
					disabled: busy,
					className: "mt-2 w-full accent-[var(--color-accent)]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
				bet,
				betI,
				setBetI,
				busy,
				onPlay: () => void play(),
				label: "Würfeln"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			})
		]
	});
}
function LimboView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const [target, setTarget] = (0, import_react.useState)(2);
	const [shown, setShown] = (0, import_react.useState)(1);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const [hit, setHit] = (0, import_react.useState)(null);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	async function play() {
		unlockAudio();
		if (busy) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Schwelle")) return;
		setBusy(true);
		setHit(null);
		if (soundOn) sfx.spin();
		const result = limboResult();
		const cap = Math.min(result, 40);
		const steps = 18;
		for (let i = 1; i <= steps; i++) {
			setShown(1 + (cap - 1) * i / steps);
			await new Promise((r) => setTimeout(r, 40));
		}
		setShown(result);
		const paid = limboPay(result, target, bet);
		setLast(paid);
		setHit(paid > 0);
		if (paid > 0) {
			creditWin(paid, "Schwelle");
			if (soundOn) sfx.win(paid >= bet * 8);
		} else if (soundOn) sfx.lose();
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Schwelle",
		subtitle: "Ziel-Multi · sofort",
		slug: "schwelle",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-xl border border-border bg-surface p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "limbo-line",
						style: { transform: `scaleY(${Math.min(1, shown / 20)})` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.28em] text-muted",
						children: "Ergebnis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("font-display text-6xl tabular-nums", hit ? "text-win" : hit === false ? "text-loss" : "text-fg"),
						children: [shown.toFixed(2), "×"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: [
							"Ziel ",
							target.toFixed(2),
							"× · Einsatz ",
							formatEuro(bet)
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-4 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs uppercase tracking-wider text-muted",
					children: [
						"Ziel ",
						target.toFixed(2),
						"×"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 1.01,
					max: 20,
					step: .01,
					value: target,
					onChange: (e) => setTarget(Number(e.target.value)),
					disabled: busy,
					className: "mt-2 w-full accent-[var(--color-accent)]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-2",
				children: [
					1.5,
					2,
					3,
					10
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "h-10 flex-1 rounded-md bg-elevated text-sm",
					onClick: () => setTarget(n),
					children: [n.toFixed(1), "×"]
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
				bet,
				betI,
				setBetI,
				busy,
				onPlay: () => void play(),
				label: "Start"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			})
		]
	});
}
function ScratchView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const [cells, setCells] = (0, import_react.useState)(() => Array(9).fill(0));
	const [open, setOpen] = (0, import_react.useState)(() => Array(9).fill(false));
	const [winX, setWinX] = (0, import_react.useState)(0);
	const [last, setLast] = (0, import_react.useState)(null);
	const [live, setLive] = (0, import_react.useState)(false);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	function start() {
		unlockAudio();
		if (live) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Rubbellos")) return;
		const t = makeScratch();
		setCells(t.cells);
		setWinX(t.winX);
		setOpen(Array(9).fill(false));
		setLive(true);
		setLast(null);
		if (soundOn) sfx.click();
	}
	function reveal(i) {
		if (!live || open[i]) return;
		const next = open.slice();
		next[i] = true;
		setOpen(next);
		if (soundOn) sfx.coin();
		if (next.every(Boolean)) finish(next);
	}
	function revealAll() {
		if (!live) return;
		setOpen(Array(9).fill(true));
		finish(Array(9).fill(true));
	}
	function finish(_open) {
		const paid = Math.round(bet * winX);
		setLast(paid);
		setLive(false);
		if (paid > 0) {
			creditWin(paid, "Rubbellos");
			if (soundOn) sfx.win(paid >= bet * 8);
		} else if (soundOn) sfx.lose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Rubbellos",
		subtitle: "3 gleiche Felder zahlen",
		slug: "rubbellos",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scratch-board grid grid-cols-3 gap-2",
				children: cells.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !live,
					onClick: () => reveal(i),
					className: cn("scratch-cell", open[i] && "is-open", open[i] && v === winX && winX > 0 && "is-win"),
					children: open[i] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-xl tabular-nums",
						children: [v, "×"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-wider text-[#c9a227]",
						children: "Reiben"
					})
				}, i))
			}),
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: revealAll,
				className: "mt-3 h-11 w-full rounded-md bg-elevated text-sm",
				children: "Alles aufdecken"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
				bet,
				betI,
				setBetI,
				busy: live,
				onPlay: start,
				label: live ? "Offen" : "Los kaufen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			})
		]
	});
}
var PAY = {
	"Royal Flush": 800,
	"Straight Flush": 50,
	Vierling: 25,
	"Full House": 9,
	Flush: 6,
	Straße: 4,
	Drilling: 3,
	"Zwei Paare": 2,
	"Buben+": 1,
	Nichts: 0
};
var RANK_N = {
	A: 14,
	K: 13,
	Q: 12,
	J: 11,
	"10": 10,
	"9": 9,
	"8": 8,
	"7": 7,
	"6": 6,
	"5": 5,
	"4": 4,
	"3": 3,
	"2": 2
};
function dealVideoPoker() {
	const deck = shoe(1);
	return {
		hand: deck.slice(0, 5),
		rest: deck.slice(5)
	};
}
function drawVideoPoker(hand, held, rest) {
	const next = rest.slice();
	return hand.map((c, i) => {
		if (held[i]) return c;
		return next.shift() ?? c;
	});
}
function evalVideoPoker(hand) {
	const nums = hand.map((c) => RANK_N[c.rank]).sort((a, b) => a - b);
	const flush = hand.every((c) => c.suit === hand[0].suit);
	const straight = isStraight(nums);
	const counts = /* @__PURE__ */ new Map();
	for (const n of nums) counts.set(n, (counts.get(n) ?? 0) + 1);
	const freq = [...counts.values()].sort((a, b) => b - a);
	const royal = flush && straight && nums[0] === 10;
	let name = "Nichts";
	if (royal) name = "Royal Flush";
	else if (flush && straight) name = "Straight Flush";
	else if (freq[0] === 4) name = "Vierling";
	else if (freq[0] === 3 && freq[1] === 2) name = "Full House";
	else if (flush) name = "Flush";
	else if (straight) name = "Straße";
	else if (freq[0] === 3) name = "Drilling";
	else if (freq[0] === 2 && freq[1] === 2) name = "Zwei Paare";
	else if (freq[0] === 2 && jacksPlus(counts)) name = "Buben+";
	return {
		name,
		mult: PAY[name]
	};
}
function isStraight(nums) {
	const uniq = [...new Set(nums)];
	if (uniq.length !== 5) return false;
	if (uniq[4] - uniq[0] === 4) return true;
	return uniq[0] === 2 && uniq[1] === 3 && uniq[2] === 4 && uniq[3] === 5 && uniq[4] === 14;
}
function jacksPlus(counts) {
	for (const [n, c] of counts) if (c === 2 && n >= 11) return true;
	return false;
}
var VP_TABLE = [
	"Royal Flush",
	"Straight Flush",
	"Vierling",
	"Full House",
	"Flush",
	"Straße",
	"Drilling",
	"Zwei Paare",
	"Buben+"
].map((name) => ({
	name,
	mult: PAY[name]
}));
function VideoPokerView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const [hand, setHand] = (0, import_react.useState)([]);
	const [rest, setRest] = (0, import_react.useState)([]);
	const [held, setHeld] = (0, import_react.useState)([
		false,
		false,
		false,
		false,
		false
	]);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [name, setName] = (0, import_react.useState)(null);
	const [last, setLast] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	async function deal() {
		unlockAudio();
		if (busy) return;
		if (phase === "hold") {
			setBusy(true);
			if (soundOn) sfx.spin();
			await new Promise((r) => setTimeout(r, 280));
			const next = drawVideoPoker(hand, held, rest);
			setHand(next);
			const ev = evalVideoPoker(next);
			setName(ev.name);
			const paid = ev.mult * bet;
			setLast(paid);
			if (paid > 0) {
				creditWin(paid, "Video Poker");
				if (soundOn) sfx.win(ev.mult >= 9);
			} else if (soundOn) sfx.lose();
			setPhase("done");
			setBusy(false);
			return;
		}
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Video Poker")) return;
		setBusy(true);
		if (soundOn) sfx.spin();
		await new Promise((r) => setTimeout(r, 240));
		const d = dealVideoPoker();
		setHand(d.hand);
		setRest(d.rest);
		setHeld([
			false,
			false,
			false,
			false,
			false
		]);
		setName(evalVideoPoker(d.hand).name);
		setLast(null);
		setPhase("hold");
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Video Poker",
		subtitle: "Jacks or Better · Halten · Royal 800×",
		slug: "videopoker",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mb-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted sm:grid-cols-3",
				children: VP_TABLE.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex justify-between", name === row.name && "text-win"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [row.mult, "×"]
					})]
				}, row.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center gap-2 overflow-x-auto py-2",
				children: Array.from({ length: 5 }, (_, i) => {
					const c = hand[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: phase !== "hold",
						onClick: () => setHeld((h) => h.map((v, j) => j === i ? !v : v)),
						className: cn("relative", held[i] && "vp-held"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
							card: c,
							hidden: !c,
							size: "table",
							animated: Boolean(c),
							delayMs: i * 40
						}), phase === "hold" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("mt-1 block text-center text-[10px] uppercase tracking-wider", held[i] ? "text-accent" : "text-muted"),
							children: held[i] ? "Halten" : "Tausch"
						}) : null]
					}, c ? c.id : `empty-${i}`);
				})
			}),
			name && phase !== "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-center font-display text-xl", name === "Nichts" ? "text-muted" : "text-win"),
				children: name
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
				bet,
				betI,
				setBetI,
				busy,
				onPlay: () => void deal(),
				label: phase === "hold" ? "Ziehen" : "Geben"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-xs text-muted",
				children: "Karten antippen zum Halten. Auszahlung × Einsatz."
			})
		]
	});
}
var PLINKO_MULT = [
	26,
	9,
	3,
	1.5,
	1.1,
	.8,
	.3,
	.8,
	1.1,
	1.5,
	3,
	9,
	26
];
var PLINKO_COUNTS = [
	1,
	5,
	10,
	25
];
function plinkoPayout(stake, slot) {
	const m = PLINKO_MULT[slot] ?? .3;
	return Math.round(stake * m);
}
var GRAVITY = 1680;
var AIR = .999;
var PEG_R = 4.35;
var BALL_R = 7.1;
var MIN_BOUNCE = 92;
function makeBoard(w, h) {
	const pad = Math.max(10, w * .045);
	const top = Math.max(28, h * .07);
	const binTop = h - Math.max(48, h * .13);
	const rowH = (binTop - top - 8) / 11.85;
	const lastGap = (w - pad * 2) * .96 / 13;
	const pegs = [];
	for (let r = 0; r < 12; r++) {
		const count = r + 3;
		const x0 = (w - lastGap * (count - 1)) / 2;
		const y = top + r * rowH;
		for (let i = 0; i < count; i++) pegs.push({
			x: x0 + i * lastGap,
			y,
			r: PEG_R
		});
	}
	const bins = [];
	const bin0 = (w - lastGap * 13) / 2 - lastGap / 2;
	for (let i = 0; i < 13; i++) bins.push({
		i,
		x: bin0 + i * lastGap,
		w: lastGap
	});
	return {
		w,
		h,
		pegs,
		bins,
		binTop,
		pad,
		funnelX: w / 2
	};
}
var nextId = 1;
function spawnBall(board, bet, wait) {
	const jitter = (randInt(160) - 80) / 10;
	const x = board.funnelX + jitter;
	const y = 10 + (randInt(8) - 4) / 4;
	const r = BALL_R;
	return {
		id: nextId++,
		x,
		y,
		px: x,
		py: y,
		vx: (randInt(80) - 40) * .35,
		vy: 18 + randInt(24),
		r,
		bet,
		wait,
		slot: null,
		settled: 0,
		hue: randInt(40),
		paid: false
	};
}
function collidePeg(b, p) {
	const dx = b.x - p.x;
	const dy = b.y - p.y;
	const min = b.r + p.r;
	const d2 = dx * dx + dy * dy;
	if (d2 >= min * min || d2 === 0) return false;
	const d = Math.sqrt(d2);
	const nx = dx / d;
	const ny = dy / d;
	const overlap = min - d + .05;
	b.x += nx * overlap;
	b.y += ny * overlap;
	const vn = b.vx * nx + b.vy * ny;
	if (vn < 0) {
		b.vx -= 1.6400000000000001 * vn * nx;
		b.vy -= 1.6400000000000001 * vn * ny;
		const speed = Math.hypot(b.vx, b.vy);
		if (speed < MIN_BOUNCE) {
			const boost = (MIN_BOUNCE - speed) / Math.max(.001, speed);
			b.vx += b.vx * boost;
			b.vy += b.vy * boost;
		}
		const tx = -ny;
		const ty = nx;
		const kick = (randInt(50) - 25) * 1.4;
		b.vx += tx * kick;
		b.vy += ty * kick * .25;
		return true;
	}
	return false;
}
function collideBalls(a, b) {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const min = a.r + b.r;
	const d2 = dx * dx + dy * dy;
	if (d2 >= min * min || d2 === 0) return;
	const d = Math.sqrt(d2);
	const nx = dx / d;
	const ny = dy / d;
	const overlap = (min - d) / 2;
	a.x -= nx * overlap;
	a.y -= ny * overlap;
	b.x += nx * overlap;
	b.y += ny * overlap;
	const av = a.vx * nx + a.vy * ny;
	const diff = b.vx * nx + b.vy * ny - av;
	if (diff > 0) return;
	const impulse = diff * .52;
	a.vx += impulse * nx;
	a.vy += impulse * ny;
	b.vx -= impulse * nx;
	b.vy -= impulse * ny;
}
function slotFromX(board, x) {
	let best = 0;
	let bestD = Infinity;
	for (const bin of board.bins) {
		const cx = bin.x + bin.w / 2;
		const d = Math.abs(cx - x);
		if (d < bestD) {
			bestD = d;
			best = bin.i;
		}
	}
	return best;
}
function stepWorld(board, balls, sparks, dt, events) {
	for (const b of balls) {
		if (b.slot != null) {
			b.settled += dt;
			const bin = board.bins[b.slot];
			if (bin) {
				const cx = bin.x + bin.w / 2;
				b.px = b.x;
				b.py = b.y;
				b.x += (cx - b.x) * Math.min(1, dt * 10);
				b.y += (board.h - 14 - b.y) * Math.min(1, dt * 8);
				b.vx = 0;
				b.vy = 0;
			}
			continue;
		}
		if (b.wait > 0) {
			b.wait -= dt;
			b.px = b.x;
			b.py = b.y;
			continue;
		}
		b.px = b.x;
		b.py = b.y;
		b.vy += GRAVITY * dt;
		b.vx *= AIR;
		b.vy *= .9994;
		b.vx = Math.max(-460, Math.min(460, b.vx));
		b.vy = Math.min(b.vy, 620);
		b.x += b.vx * dt;
		b.y += b.vy * dt;
		const left = board.pad + b.r;
		const right = board.w - board.pad - b.r;
		if (b.x < left) {
			b.x = left;
			b.vx = Math.abs(b.vx) * .55 + 20;
		} else if (b.x > right) {
			b.x = right;
			b.vx = -Math.abs(b.vx) * .55 - 20;
		}
		if (b.y - b.r < 2) {
			b.y = 2 + b.r;
			b.vy = Math.abs(b.vy) * .2;
		}
		let bounced = false;
		for (const p of board.pegs) {
			if (Math.abs(p.y - b.y) > b.r + p.r + 6) continue;
			if (collidePeg(b, p)) bounced = true;
		}
		if (bounced) {
			events.push({
				kind: "bounce",
				x: b.x,
				y: b.y
			});
			sparks.push({
				x: b.x,
				y: b.y,
				vx: (randInt(80) - 40) * 2,
				vy: -40 - randInt(50),
				life: .18 + randInt(10) / 80,
				max: .28,
				r: 1.4
			});
		}
		if (b.y + b.r >= board.binTop) {
			const slot = slotFromX(board, b.x);
			const bin = board.bins[slot];
			if (bin) {
				const leftW = bin.x + 1.5;
				const rightW = bin.x + bin.w - 1.5;
				if (b.x - b.r < leftW) {
					b.x = leftW + b.r;
					b.vx = Math.abs(b.vx) * .25;
				} else if (b.x + b.r > rightW) {
					b.x = rightW - b.r;
					b.vx = -Math.abs(b.vx) * .25;
				}
			}
			if (b.y + b.r >= board.binTop + 10 && !b.paid) {
				b.slot = slot;
				b.settled = 0;
				b.vx = 0;
				b.vy = 0;
				b.paid = true;
				const pay = plinkoPayout(b.bet, slot);
				events.push({
					kind: "land",
					ball: b,
					slot,
					pay
				});
			}
		}
	}
	const live = balls.filter((b) => b.slot == null && b.wait <= 0);
	for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) collideBalls(live[i], live[j]);
	for (let i = sparks.length - 1; i >= 0; i--) {
		const s = sparks[i];
		s.life -= dt;
		s.x += s.vx * dt;
		s.y += s.vy * dt;
		s.vy += 420 * dt;
		if (s.life <= 0) sparks.splice(i, 1);
	}
}
function interp(b, alpha) {
	return {
		x: b.px + (b.x - b.px) * alpha,
		y: b.py + (b.y - b.py) * alpha
	};
}
function PlinkoView() {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const boardRef = (0, import_react.useRef)(null);
	const ballsRef = (0, import_react.useRef)([]);
	const sparksRef = (0, import_react.useRef)([]);
	const palRef = (0, import_react.useRef)(null);
	const bounceAt = (0, import_react.useRef)(0);
	const accRef = (0, import_react.useRef)(0);
	const lastRef = (0, import_react.useRef)(0);
	const hotRef = (0, import_react.useRef)(null);
	const [betI, setBetI] = (0, import_react.useState)(1);
	const [count, setCount] = (0, import_react.useState)(1);
	const [flying, setFlying] = (0, import_react.useState)(0);
	const [hits, setHits] = (0, import_react.useState)([]);
	const [last, setLast] = (0, import_react.useState)(null);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const soundRef = (0, import_react.useRef)(soundOn);
	soundRef.current = soundOn;
	const creditRef = (0, import_react.useRef)(creditWin);
	creditRef.current = creditWin;
	const resize = (0, import_react.useCallback)(() => {
		const wrap = wrapRef.current;
		const canvas = canvasRef.current;
		if (!wrap || !canvas) return;
		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const w = Math.max(280, wrap.clientWidth);
		const h = Math.max(420, Math.round(w * 1.28));
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		const ctx = canvas.getContext("2d");
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		boardRef.current = makeBoard(w, h);
		palRef.current = readPalette();
	}, []);
	const applyEvents = (0, import_react.useCallback)((events) => {
		let landed = 0;
		for (const ev of events) if (ev.kind === "bounce") {
			if (soundRef.current && performance.now() - bounceAt.current > 42) {
				bounceAt.current = performance.now();
				sfx.tick();
			}
		} else {
			landed += 1;
			if (ev.pay > 0) creditRef.current(ev.pay, "Plinko · Gewinn");
			setLast(ev.pay);
			hotRef.current = ev.slot;
			setHits((h) => [{
				id: ev.ball.id,
				slot: ev.slot,
				pay: ev.pay,
				bet: ev.ball.bet
			}, ...h].slice(0, 14));
			const tier = winTier(ev.pay, ev.ball.bet);
			if (tier !== "none") setCelebrate({
				payout: ev.pay,
				stake: ev.ball.bet,
				tier
			});
			if (soundRef.current) {
				if (ev.pay > ev.ball.bet) sfx.win(ev.pay >= ev.ball.bet * 8);
				else if (ev.pay === 0) sfx.lose();
				else sfx.click();
			}
		}
		if (landed) window.setTimeout(() => {
			ballsRef.current = ballsRef.current.filter((b) => !(b.slot != null && b.settled > .55));
			setFlying(ballsRef.current.filter((b) => b.slot == null).length);
		}, 560);
		setFlying(ballsRef.current.filter((b) => b.slot == null).length);
	}, []);
	const applyRef = (0, import_react.useRef)(applyEvents);
	applyRef.current = applyEvents;
	(0, import_react.useEffect)(() => {
		resize();
		const wrap = wrapRef.current;
		if (!wrap) return;
		const ro = new ResizeObserver(() => resize());
		ro.observe(wrap);
		window.addEventListener("resize", resize);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", resize);
		};
	}, [resize]);
	(0, import_react.useEffect)(() => {
		lastRef.current = performance.now();
		let raf = 0;
		const tick = (now) => {
			const dt = Math.min(.05, (now - lastRef.current) / 1e3);
			lastRef.current = now;
			accRef.current += dt;
			const STEP = 1 / 120;
			const events = [];
			const board = boardRef.current;
			if (board) {
				let steps = 0;
				while (accRef.current >= STEP && steps < 8) {
					stepWorld(board, ballsRef.current, sparksRef.current, STEP, events);
					accRef.current -= STEP;
					steps += 1;
				}
				const alpha = accRef.current / STEP;
				drawBoard(canvasRef.current, board, ballsRef.current, sparksRef.current, palRef.current, alpha, hotRef.current);
			}
			if (events.length) applyRef.current(events);
			raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);
	function drop() {
		unlockAudio();
		const n = count;
		if (ballsRef.current.filter((b) => b.slot == null).length + n > 50) return;
		const costNow = bet * n;
		if (balance < costNow) {
			setCashier(true);
			return;
		}
		if (!placeBet(costNow, n === 1 ? "Plinko · Einsatz" : `Plinko · ${n} Bälle`)) return;
		const board = boardRef.current ?? makeBoard(320, 420);
		for (let i = 0; i < n; i++) ballsRef.current.push(spawnBall(board, bet, i * .12));
		setFlying(ballsRef.current.filter((b) => b.slot == null).length);
		if (soundOn) sfx.chip();
	}
	const cost = bet * count;
	const live = flying;
	const blocked = live + count > 50 || balance < cost;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Plinko",
		subtitle: "12 Peg-Reihen · Bälle prallen · bis 25 auf einmal",
		slug: "plinko",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: wrapRef,
				className: "relative mx-auto max-w-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					className: "block w-full touch-none rounded-xl border border-accent/20 bg-bg",
					"aria-label": "Plinko-Brett"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap justify-center gap-1",
				children: hits.slice(0, 10).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("rounded-md px-2 py-1 text-[11px] tabular-nums", h.pay > h.bet ? "bg-win/20 text-win" : h.pay === 0 ? "bg-loss/20 text-loss" : "bg-elevated text-muted"),
					children: [PLINKO_MULT[h.slot], "×"]
				}, h.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-md border border-accent/25 bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "size-11",
								disabled: betI === 0,
								onClick: () => setBetI((i) => Math.max(0, i - 1)),
								"aria-label": "Einsatz senken",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-16 text-center text-sm tabular-nums",
								children: formatEuro(bet)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "size-11",
								disabled: betI === ORIGINAL_STEPS.length - 1,
								onClick: () => setBetI((i) => Math.min(ORIGINAL_STEPS.length - 1, i + 1)),
								"aria-label": "Einsatz erhöhen",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-md border border-accent/25 bg-surface p-1",
						children: PLINKO_COUNTS.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCount(n),
							className: cn("h-9 min-w-10 rounded-sm px-2 text-sm tabular-nums", count === n ? "bg-accent text-accent-fg" : "text-muted"),
							children: n
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: blocked,
						onClick: drop,
						className: "ml-auto h-12 min-w-40 rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40",
						children: count === 1 ? "Ball fallen lassen" : `${count} Bälle · ${formatEuro(cost)}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-xs text-subtle",
				children: live > 0 ? `${live} ${live === 1 ? "Ball" : "Bälle"} unterwegs` : "Mehrere Bälle gleichzeitig möglich"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				onDone: () => setCelebrate(null)
			}) : null
		]
	});
}
function readPalette() {
	const s = getComputedStyle(document.documentElement);
	const v = (name, fb) => s.getPropertyValue(name).trim() || fb;
	return {
		bg: v("--color-bg", "#05070b"),
		surface: v("--color-surface", "#0c1118"),
		elevated: v("--color-elevated", "#141b24"),
		accent: v("--color-accent", "#2ee6c5"),
		fg: v("--color-fg", "#e8f0f5"),
		muted: v("--color-muted", "#8b97a6"),
		win: v("--color-win", "#5ee0a0"),
		loss: v("--color-loss", "#ff6b73")
	};
}
function drawBoard(canvas, board, balls, sparks, pal, alpha, hot) {
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	const c = pal ?? readPalette();
	const { w, h } = board;
	ctx.clearRect(0, 0, w, h);
	const bg = ctx.createLinearGradient(0, 0, 0, h);
	bg.addColorStop(0, c.surface);
	bg.addColorStop(1, c.bg);
	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = withAlpha(c.accent, .07);
	ctx.lineWidth = 1;
	for (let x = 24; x < w; x += 28) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		ctx.stroke();
	}
	ctx.fillStyle = withAlpha(c.accent, .18);
	ctx.beginPath();
	ctx.moveTo(board.funnelX - 22, 4);
	ctx.lineTo(board.funnelX + 22, 4);
	ctx.lineTo(board.funnelX + 10, 22);
	ctx.lineTo(board.funnelX - 10, 22);
	ctx.closePath();
	ctx.fill();
	for (const p of board.pegs) {
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.r + 1.2, 0, Math.PI * 2);
		ctx.fillStyle = withAlpha(c.accent, .18);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
		ctx.fillStyle = c.accent;
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p.x - 1.1, p.y - 1.1, p.r * .35, 0, Math.PI * 2);
		ctx.fillStyle = "rgba(255,255,255,0.55)";
		ctx.fill();
	}
	for (const bin of board.bins) {
		const m = PLINKO_MULT[bin.i] ?? 0;
		const edge = Math.abs(bin.i - 6);
		const active = hot === bin.i;
		const fill = m >= 8 ? withAlpha(c.win, active ? .55 : .28) : m >= 1 ? withAlpha(c.accent, active ? .45 : .16) : withAlpha(c.loss, active ? .4 : .16);
		roundRect(ctx, bin.x + 2, board.binTop + 2, bin.w - 4, h - board.binTop - 8, 5);
		ctx.fillStyle = fill;
		ctx.fill();
		ctx.strokeStyle = active ? c.accent : withAlpha(c.accent, .25);
		ctx.lineWidth = active ? 1.6 : 1;
		ctx.stroke();
		ctx.fillStyle = edge >= 5 ? c.win : c.fg;
		ctx.font = `600 ${bin.w < 22 ? 9 : 11}px ui-sans-serif, system-ui, sans-serif`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(`${m}×`, bin.x + bin.w / 2, board.binTop + (h - board.binTop) / 2);
	}
	for (const s of sparks) {
		const a = Math.max(0, s.life / s.max);
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
		ctx.fillStyle = withAlpha(c.accent, a);
		ctx.fill();
	}
	for (const b of balls) {
		if (b.wait > 0 && b.y < 8) continue;
		const p = interp(b, alpha);
		ctx.beginPath();
		ctx.arc(p.x, p.y, b.r + 3, 0, Math.PI * 2);
		ctx.fillStyle = withAlpha(c.accent, .22);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(p.x, p.y, b.r, 0, Math.PI * 2);
		const g = ctx.createRadialGradient(p.x - 2, p.y - 2, 1, p.x, p.y, b.r);
		g.addColorStop(0, "#f5fffb");
		g.addColorStop(.45, c.accent);
		g.addColorStop(1, "#0a3d36");
		ctx.fillStyle = g;
		ctx.fill();
	}
}
function withAlpha(color, a) {
	if (color.startsWith("#") && (color.length === 7 || color.length === 4)) {
		const hex = color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}` : color;
		return `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
	}
	return color;
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function minesMultiplier(gems, mineCount, size = 25) {
	let m = 1;
	for (let i = 0; i < gems; i++) m *= (size - mineCount - i) / (size - i);
	if (m <= 0) return 0;
	return Math.floor(.97 / m * 100) / 100;
}
function minesLayout(mineCount, size = 25) {
	const cells = Array.from({ length: size }, () => false);
	let placed = 0;
	while (placed < mineCount) {
		const i = randInt(size);
		if (!cells[i]) {
			cells[i] = true;
			placed += 1;
		}
	}
	return cells;
}
/** Instant 1.00x ~1%, else 0.97 / U — house edge ~3%. */
function crashPoint() {
	if (randInt(100) === 0) return 1;
	const raw = .97 / ((randInt(1e6) + 1) / 1e6);
	return Math.max(1.01, Math.floor(raw * 100) / 100);
}
var SIZE = 25;
function MinesView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const [mines, setMines] = (0, import_react.useState)(3);
	const [layout, setLayout] = (0, import_react.useState)(null);
	const [revealed, setRevealed] = (0, import_react.useState)(Array(SIZE).fill(false));
	const [dead, setDead] = (0, import_react.useState)(false);
	const [cashed, setCashed] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const [pulse, setPulse] = (0, import_react.useState)(null);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const balance = useCasino((s) => s.balance);
	const soundOn = useCasino((s) => s.soundOn);
	const gems = revealed.filter(Boolean).length;
	const live = layout && !dead && !cashed;
	const nextMult = minesMultiplier(gems + 1, mines);
	function start() {
		unlockAudio();
		if (layout && !dead && !cashed) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Minen · Einsatz")) return;
		if (soundOn) sfx.click();
		setLayout(minesLayout(mines));
		setRevealed(Array(SIZE).fill(false));
		setDead(false);
		setCashed(false);
		setLast(null);
		setPulse(null);
	}
	function open(i) {
		if (!layout || dead || cashed || revealed[i]) return;
		unlockAudio();
		setPulse(i);
		if (layout[i]) {
			setRevealed(Array(SIZE).fill(true));
			setDead(true);
			setLast(0);
			if (soundOn) sfx.lose();
			return;
		}
		const next = revealed.slice();
		next[i] = true;
		setRevealed(next);
		if (soundOn) sfx.chip();
	}
	function cash() {
		if (!live || gems === 0) return;
		const pay = Math.round(bet * minesMultiplier(gems, mines));
		creditWin(pay, "Minen · Cashout");
		setCashed(true);
		setLast(pay);
		const tier = winTier(pay, bet);
		if (tier !== "none") setCelebrate({
			payout: pay,
			stake: bet,
			tier
		});
		if (soundOn) sfx.win(pay >= bet * 3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Minen",
		subtitle: "25 Felder · 97 % RTP · Cashout jederzeit",
		slug: "minen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [[
					2,
					3,
					5,
					8
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: Boolean(live),
					onClick: () => setMines(n),
					className: cn("h-10 rounded-md px-3 text-sm", mines === n ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: [n, " Minen"]
				}, n)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto text-sm tabular-nums text-accent",
					children: live ? `${nextMult.toFixed(2)}× nächstes` : "Bereit"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2",
				children: Array.from({ length: SIZE }, (_, i) => {
					const isMine = Boolean(layout?.[i]);
					const show = revealed[i] || dead && isMine;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !live,
						onClick: () => open(i),
						"aria-label": show ? isMine ? "Mine" : "Edelstein" : "Verdeckt",
						className: cn("mine-cell aspect-square rounded-lg border transition-transform duration-150 active:scale-[0.96]", show && isMine && "mine-cell-mine border-loss", show && !isMine && "mine-cell-gem border-accent", !show && "border-border bg-elevated hover:border-accent/50", pulse === i && "mine-cell-flip"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mine-cell-face",
							children: show ? isMine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mine-bomb" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mine-gem" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mine-back" })
						})
					}, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex gap-2",
				children: live && gems > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: cash,
					className: "h-12 flex-1 rounded-md bg-accent font-semibold uppercase tracking-wider text-accent-fg",
					children: ["Cashout ", formatEuro(Math.round(bet * minesMultiplier(gems, mines)))]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
					bet,
					betI,
					setBetI,
					busy: Boolean(live),
					onPlay: start,
					label: layout ? "Neue Runde" : "Start"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				onDone: () => setCelebrate(null)
			}) : null
		]
	});
}
function CrashView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [mult, setMult] = (0, import_react.useState)(1);
	const [crash, setCrash] = (0, import_react.useState)(null);
	const [cashed, setCashed] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
	const [samples, setSamples] = (0, import_react.useState)([{
		t: 0,
		m: 1
	}]);
	const [celebrate, setCelebrate] = (0, import_react.useState)(null);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const target = (0, import_react.useRef)(1);
	const cashedRef = (0, import_react.useRef)(false);
	const raf = (0, import_react.useRef)(0);
	const pts = (0, import_react.useRef)([{
		t: 0,
		m: 1
	}]);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const balance = useCasino((s) => s.balance);
	const soundOn = useCasino((s) => s.soundOn);
	(0, import_react.useEffect)(() => () => cancelAnimationFrame(raf.current), []);
	function start() {
		unlockAudio();
		if (running) return;
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Lift · Einsatz")) return;
		if (soundOn) sfx.spin();
		const point = crashPoint();
		target.current = point;
		cashedRef.current = false;
		pts.current = [{
			t: 0,
			m: 1
		}];
		setSamples([{
			t: 0,
			m: 1
		}]);
		setCrash(null);
		setCashed(false);
		setLast(null);
		setMult(1);
		setRunning(true);
		const t0 = performance.now();
		const tick = (now) => {
			const s = (now - t0) / 1e3;
			const m = Math.exp(s * .55);
			if (m >= target.current) {
				pts.current.push({
					t: s,
					m: target.current
				});
				setSamples(pts.current.slice());
				setMult(target.current);
				setCrash(target.current);
				setRunning(false);
				if (!cashedRef.current) {
					setLast(0);
					if (soundOn) sfx.lose();
				}
				return;
			}
			pts.current.push({
				t: s,
				m
			});
			if (pts.current.length % 2 === 0) setSamples(pts.current.slice());
			setMult(m);
			raf.current = requestAnimationFrame(tick);
		};
		raf.current = requestAnimationFrame(tick);
	}
	function cash() {
		if (!running || cashedRef.current) return;
		cashedRef.current = true;
		const pay = Math.round(bet * mult);
		creditWin(pay, "Lift · Cashout");
		setCashed(true);
		setLast(pay);
		const tier = winTier(pay, bet);
		if (tier !== "none") setCelebrate({
			payout: pay,
			stake: bet,
			tier
		});
		if (soundOn) sfx.win(mult >= 3);
	}
	const crashed = crash != null && !cashed;
	const tMax = Math.max(3.2, samples[samples.length - 1]?.t ?? 0);
	const mScale = Math.max(2.4, crash ?? Math.max(mult * 1.4, 2));
	const lastPt = samples[samples.length - 1];
	const path = curvePath(samples, tMax, mScale);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(OriginalShell, {
		title: "Lift",
		subtitle: "Cashout bevor die Kurve reißt · 97 % RTP",
		slug: "lift",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative overflow-hidden rounded-xl border border-border bg-surface", crashed && "lift-crash"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 neon-mesh opacity-40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 320 180",
						className: "relative h-64 w-full",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "lift-line",
								x1: "0",
								y1: "0",
								x2: "1",
								y2: "0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--color-accent)",
									stopOpacity: "0.2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: crashed ? "var(--color-loss)" : "var(--color-accent)"
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: path,
								fill: "none",
								stroke: "url(#lift-line)",
								strokeWidth: "2.4",
								strokeLinejoin: "round",
								strokeLinecap: "round"
							}),
							lastPt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: xOf(lastPt.t, tMax),
								cy: yOf(lastPt.m, mScale),
								r: "5",
								fill: crashed ? "var(--color-loss)" : "var(--color-accent)"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("font-display text-6xl tabular-nums", crashed ? "text-loss" : cashed ? "text-win" : "text-accent"),
							children: [mult.toFixed(2), "×"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: crashed ? `Crash bei ${crash?.toFixed(2)}×` : running ? "Im Steigflug" : "Bereit"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: running && !cashed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: cash,
					className: "h-14 w-full rounded-md bg-accent text-base font-semibold uppercase tracking-wider text-accent-fg",
					children: ["Cashout ", formatEuro(Math.round(bet * mult))]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetBar, {
					bet,
					betI,
					setBetI,
					busy: running,
					onPlay: start,
					label: "Start"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultBar, {
				last,
				bet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {}),
			celebrate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WinCelebration, {
				payout: celebrate.payout,
				stake: celebrate.stake,
				tier: celebrate.tier,
				soundOn,
				onDone: () => setCelebrate(null)
			}) : null
		]
	});
}
function xOf(t, tMax) {
	return 16 + t / Math.max(3.2, tMax) * 288;
}
function yOf(m, mMax) {
	return 164 - Math.log(Math.max(1, m)) / Math.log(Math.max(2.2, mMax)) * 140;
}
function curvePath(samples, tMax, mMax) {
	if (samples.length === 0) return "";
	return samples.map((s, i) => `${i === 0 ? "M" : "L"}${xOf(s.t, tMax).toFixed(1)} ${yOf(s.m, mMax).toFixed(1)}`).join(" ");
}
function GameSplash({ slug, children }) {
	const game = gameBySlug(slug);
	const [show, setShow] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		setShow(true);
		const t = window.setTimeout(() => setShow(false), 900);
		return () => window.clearTimeout(t);
	}, [slug]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [children, show && game ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 z-50 grid place-items-center bg-bg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm px-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: game.image,
						alt: "",
						className: "mx-auto h-36 w-28 rounded-md object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-display text-3xl",
						children: game.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-[0.28em] text-muted",
						children: game.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "block h-full w-full origin-left animate-[splash-bar_0.85s_ease-out] bg-accent" })
					})
				]
			})
		}) : null]
	});
}
function GamePage() {
	const { slug } = Route$2.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameSplash, {
		slug,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameInner, { slug })
	});
}
function GameInner({ slug }) {
	const game = gameBySlug(slug);
	if (slug === "huff-und-puff") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HuffView, {});
	if (slug === "triple-chance") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripleChanceView, {});
	if (slug === "olymp-tor") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OlympusView, {});
	if (slug === "bonbon-regen") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OlympusView, { pack: BONBON_PACK });
	if (slug === "raubfisch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnglerView, {});
	if (slug === "bienenrausch") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BienenView, {});
	if (slug === "wegeflut") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WegeView, {});
	if (slug === "schatzzug") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainView, {});
	if (slug === "sport") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SportView, {});
	if (slug === "sicbo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SicBoView, {});
	if (slug === "videopoker") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoPokerView, {});
	if (slug === "wuerfel") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiceView, {});
	if (slug === "schwelle") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LimboView, {});
	if (slug === "rubbellos") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScratchView, {});
	if (slug === "drache-tiger") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragonTigerView, {});
	if (slug === "gluecksrad") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GluecksradView, {});
	if (slug === "keno") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KenoView, {});
	if (slug === "blitz-roulette") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouletteView, { lightning: true });
	if (slug === "plinko") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlinkoView, {});
	if (slug === "minen") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MinesView, {});
	if (slug === "lift") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrashView, {});
	if (slug === "blackjack") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlackjackView, {});
	if (slug === "roulette") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouletteView, {});
	if (slug === "baccarat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaccaratView, {});
	if (game?.kind === "slot") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlotView, { slug });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-muted",
		children: [
			"Spiel nicht gefunden.",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-accent",
				children: "Zur Lobby"
			})
		]
	});
}
//#endregion
export { GamePage as component };
