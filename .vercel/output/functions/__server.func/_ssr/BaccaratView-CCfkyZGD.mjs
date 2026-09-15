import { o as __toESM } from "../_runtime.mjs";
import { c as formatEuro, f as liveOccupancy, t as cn } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as useCasino, t as Button } from "./button-D768MRou.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ChipStack } from "./ChipStack-CgLKjur8.mjs";
import { _ as ChevronLeft, c as Plus, u as Minus } from "../_libs/lucide-react.mjs";
import { m as sfx, y as unlockAudio } from "./router-D35HOleb.mjs";
import { t as NeedBankroll } from "./NeedBankroll-bIUrzrIg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BaccaratView-CCfkyZGD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Unbiased integer in [0, max) via rejection sampling. */
function randInt(max) {
	if (max <= 0) return 0;
	if (typeof crypto !== "undefined" && crypto.getRandomValues) {
		const range = 4294967296;
		const limit = range - range % max;
		const buf = /* @__PURE__ */ new Uint32Array(1);
		let x;
		do {
			crypto.getRandomValues(buf);
			x = buf[0];
		} while (x >= limit);
		return x % max;
	}
	return Math.floor(Math.random() * max);
}
function weightedPick(items) {
	let r = randInt(items.reduce((s, i) => s + i.weight, 0));
	for (const item of items) {
		r -= item.weight;
		if (r < 0) return item;
	}
	return items[items.length - 1];
}
function fisherYates(arr) {
	const a = arr.slice();
	for (let i = a.length - 1; i > 0; i--) {
		const j = randInt(i + 1);
		const tmp = a[i];
		a[i] = a[j];
		a[j] = tmp;
	}
	return a;
}
var SUITS = [
	"spades",
	"hearts",
	"diamonds",
	"clubs"
];
var RANKS = [
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K"
];
function isRed$1(suit) {
	return suit === "hearts" || suit === "diamonds";
}
function rankValueBJ(rank) {
	if (rank === "A") return 11;
	if (rank === "K" || rank === "Q" || rank === "J") return 10;
	return Number(rank);
}
function rankValueBaccarat(rank) {
	if (rank === "A") return 1;
	if (rank === "K" || rank === "Q" || rank === "J" || rank === "10") return 0;
	return Number(rank);
}
var cardSeq = 0;
function makeCard(suit, rank) {
	cardSeq += 1;
	return {
		suit,
		rank,
		id: `${suit}-${rank}-${cardSeq}`
	};
}
function shoe(decks) {
	const cards = [];
	for (let d = 0; d < decks; d++) for (const suit of SUITS) for (const rank of RANKS) cards.push(makeCard(suit, rank));
	return fisherYates(cards);
}
function handValueBJ(cards) {
	let total = 0;
	let aces = 0;
	for (const c of cards) {
		total += rankValueBJ(c.rank);
		if (c.rank === "A") aces += 1;
	}
	while (total > 21 && aces > 0) {
		total -= 10;
		aces -= 1;
	}
	return {
		total,
		soft: aces > 0 && total <= 21
	};
}
function isBlackjack(cards) {
	return cards.length === 2 && handValueBJ(cards).total === 21;
}
function baccaratTotal(cards) {
	return cards.reduce((s, c) => s + rankValueBaccarat(c.rank), 0) % 10;
}
var PIPS = {
	A: [{
		x: 50,
		y: 50
	}],
	"2": [{
		x: 50,
		y: 18
	}, {
		x: 50,
		y: 82,
		flip: true
	}],
	"3": [
		{
			x: 50,
			y: 18
		},
		{
			x: 50,
			y: 50
		},
		{
			x: 50,
			y: 82,
			flip: true
		}
	],
	"4": [
		{
			x: 28,
			y: 20
		},
		{
			x: 72,
			y: 20
		},
		{
			x: 28,
			y: 80,
			flip: true
		},
		{
			x: 72,
			y: 80,
			flip: true
		}
	],
	"5": [
		{
			x: 28,
			y: 20
		},
		{
			x: 72,
			y: 20
		},
		{
			x: 50,
			y: 50
		},
		{
			x: 28,
			y: 80,
			flip: true
		},
		{
			x: 72,
			y: 80,
			flip: true
		}
	],
	"6": [
		{
			x: 28,
			y: 20
		},
		{
			x: 72,
			y: 20
		},
		{
			x: 28,
			y: 50
		},
		{
			x: 72,
			y: 50
		},
		{
			x: 28,
			y: 80,
			flip: true
		},
		{
			x: 72,
			y: 80,
			flip: true
		}
	],
	"7": [
		{
			x: 28,
			y: 18
		},
		{
			x: 72,
			y: 18
		},
		{
			x: 50,
			y: 34
		},
		{
			x: 28,
			y: 50
		},
		{
			x: 72,
			y: 50
		},
		{
			x: 28,
			y: 82,
			flip: true
		},
		{
			x: 72,
			y: 82,
			flip: true
		}
	],
	"8": [
		{
			x: 28,
			y: 18
		},
		{
			x: 72,
			y: 18
		},
		{
			x: 50,
			y: 34
		},
		{
			x: 28,
			y: 50
		},
		{
			x: 72,
			y: 50
		},
		{
			x: 50,
			y: 66,
			flip: true
		},
		{
			x: 28,
			y: 82,
			flip: true
		},
		{
			x: 72,
			y: 82,
			flip: true
		}
	],
	"9": [
		{
			x: 28,
			y: 16
		},
		{
			x: 72,
			y: 16
		},
		{
			x: 28,
			y: 38
		},
		{
			x: 72,
			y: 38
		},
		{
			x: 50,
			y: 50
		},
		{
			x: 28,
			y: 62,
			flip: true
		},
		{
			x: 72,
			y: 62,
			flip: true
		},
		{
			x: 28,
			y: 84,
			flip: true
		},
		{
			x: 72,
			y: 84,
			flip: true
		}
	],
	"10": [
		{
			x: 28,
			y: 15
		},
		{
			x: 72,
			y: 15
		},
		{
			x: 50,
			y: 27
		},
		{
			x: 28,
			y: 39
		},
		{
			x: 72,
			y: 39
		},
		{
			x: 28,
			y: 61,
			flip: true
		},
		{
			x: 72,
			y: 61,
			flip: true
		},
		{
			x: 50,
			y: 73,
			flip: true
		},
		{
			x: 28,
			y: 85,
			flip: true
		},
		{
			x: 72,
			y: 85,
			flip: true
		}
	]
};
var FACE = /* @__PURE__ */ new Set([
	"J",
	"Q",
	"K"
]);
var SIZE = {
	mini: "h-[2.15rem] w-[1.5rem] rounded-[3px]",
	table: "h-24 w-[4.4rem] rounded-md sm:h-[7.25rem] sm:w-[5.1rem]",
	risk: "h-full w-full rounded-[7px]"
};
function PlayingCardFace({ card, hidden, compact, delayMs = 0, size, animated = true }) {
	const resolved = size ?? (compact ? "mini" : "table");
	const delay = { animationDelay: `${delayMs}ms` };
	const cls = cn("poker-card", SIZE[resolved], animated && "card-deal");
	if (!card || hidden) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(cls, "poker-card-back"),
		style: delay,
		"aria-hidden": true
	});
	const red = isRed$1(card.suit);
	const mini = resolved === "mini";
	const pipSize = resolved === "risk" ? "size-[1.15rem] sm:size-6" : resolved === "table" ? "size-3.5 sm:size-4" : "size-2";
	const faceSize = resolved === "risk" ? "size-16 sm:size-[4.5rem]" : "size-8 sm:size-10";
	const rankCls = resolved === "risk" ? "text-[1.35rem] sm:text-[1.55rem] leading-none font-bold" : mini ? "text-[11px] leading-none font-bold" : "text-base sm:text-lg leading-none font-bold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn(cls, red ? "poker-card-red" : "text-card-ink"),
		style: delay,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndexCorner, {
				rank: card.rank,
				suit: card.suit,
				className: cn("absolute top-0.5 left-0.5", resolved === "risk" && "top-1.5 left-1.5"),
				rankCls,
				iconCls: mini ? "size-2" : resolved === "risk" ? "size-3.5" : "size-2.5"
			}),
			!mini ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndexCorner, {
				rank: card.rank,
				suit: card.suit,
				className: cn("absolute right-0.5 bottom-0.5 rotate-180", resolved === "risk" && "right-1.5 bottom-1.5"),
				rankCls,
				iconCls: resolved === "risk" ? "size-3.5" : "size-2.5"
			}) : null,
			mini ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitGlyph, {
					suit: card.suit,
					className: "size-2.5"
				})
			}) : FACE.has(card.rank) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-[18%] flex flex-col items-center justify-center rounded-sm border border-current/25",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("font-bold leading-none", resolved === "risk" ? "text-5xl sm:text-6xl" : "text-3xl"),
					children: card.rank
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitGlyph, {
					suit: card.suit,
					className: cn("mt-0.5", faceSize)
				})]
			}) : card.rank === "A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitGlyph, {
					suit: card.suit,
					className: resolved === "risk" ? "size-[4.6rem] sm:size-[5.4rem]" : "size-10 sm:size-12"
				})
			}) : (PIPS[card.rank] ?? []).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute",
				style: {
					left: `${p.x}%`,
					top: `${p.y}%`,
					transform: `translate(-50%, -50%)${p.flip ? " rotate(180deg)" : ""}`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitGlyph, {
					suit: card.suit,
					className: pipSize
				})
			}, i))
		]
	});
}
function IndexCorner({ rank, suit, className, rankCls, iconCls }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("z-10 flex flex-col items-center leading-none", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: rankCls,
			children: rank
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuitGlyph, {
			suit,
			className: iconCls
		})]
	});
}
function SuitGlyph({ suit, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": true,
		children: suit === "spades" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 2C7.4 8.8 4.8 12.2 4.8 16.2A5.2 5.2 0 0 0 12 21.2a5.2 5.2 0 0 0 7.2-5C19.2 12.2 16.6 8.8 12 2z"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M10.15 19.4h3.7L15.2 23H8.8z"
		})] }) : suit === "hearts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4 4.9 4.9 0 0 1 12 6.09 4.9 4.9 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
		}) : suit === "diamonds" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 1.6 22.4 12 12 22.4 1.6 12z"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				fill: "currentColor",
				cx: "12",
				cy: "6.1",
				r: "3.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				fill: "currentColor",
				cx: "7.05",
				cy: "12.15",
				r: "3.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				fill: "currentColor",
				cx: "16.95",
				cy: "12.15",
				r: "3.15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "currentColor",
				d: "M10.3 14.4h3.4V18.1H16.4V21H7.6v-2.9h2.7z"
			})
		] })
	});
}
var ORIGINAL_STEPS = [
	50,
	100,
	200,
	500,
	1e3,
	2500
];
function OriginalShell({ title, subtitle, children, slug }) {
	const touchGame = useCasino((s) => s.touchGame);
	(0, import_react.useEffect)(() => {
		if (slug) touchGame(slug);
	}, [slug, touchGame]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 neon-mesh opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-2xl px-4 pb-24 pt-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
						"aria-label": "Lobby",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl text-fg",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-accent",
						children: subtitle
					})] })]
				}), children]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
		]
	});
}
function BetBar({ bet, betI, setBetI, busy, onPlay, label, extra }) {
	const balance = useCasino((s) => s.balance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center rounded-md border border-accent/25 bg-surface",
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
						disabled: busy || betI === ORIGINAL_STEPS.length - 1,
						onClick: () => setBetI((i) => Math.min(ORIGINAL_STEPS.length - 1, i + 1)),
						"aria-label": "Einsatz erhöhen",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
					})
				]
			}),
			extra,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: busy || balance < bet,
				onClick: onPlay,
				className: "ml-auto h-12 min-w-36 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40",
				children: busy ? "…" : label
			})
		]
	});
}
function ResultBar({ last, bet }) {
	const balance = useCasino((s) => s.balance);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid grid-cols-2 gap-2 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md bg-surface px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wider text-subtle",
				children: "Letzter Wurf"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("font-display text-xl tabular-nums", last == null ? "text-muted" : last > bet ? "text-win" : last === bet ? "text-fg" : "text-loss"),
				children: last == null ? "—" : formatEuro(last)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-md bg-surface px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wider text-subtle",
				children: "Guthaben"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl tabular-nums text-fg",
				children: formatEuro(balance)
			})]
		})]
	});
}
/** 0.00–100.00 inclusive, two decimals. */
function rollDice() {
	return randInt(10001) / 100;
}
function dicePay(roll, target, over, stake) {
	const chance = over ? 100 - target : target;
	if (chance <= 1 || chance >= 98) return 0;
	if (!(over ? roll >= target : roll < target)) return 0;
	return Math.round(stake * (99 / chance));
}
/** Limbo result ≥ 1.00, house 1 %. */
function limboResult() {
	const x = .99 / ((randInt(1e6) + 1) / 1e6);
	return Math.max(1, Math.floor(x * 100) / 100);
}
function limboPay(result, target, stake) {
	if (target < 1.01 || result < target) return 0;
	return Math.round(stake * target);
}
var SCRATCH_PRIZES = [
	.5,
	1,
	2,
	5,
	10,
	25,
	50,
	100
];
function makeScratch() {
	const win = randInt(100) < 38;
	const prize = SCRATCH_PRIZES[weightedPrize()];
	const others = SCRATCH_PRIZES.filter((p) => p !== prize);
	const cells = [];
	if (win) {
		cells.push(prize, prize, prize);
		while (cells.length < 9) {
			const p = others[randInt(others.length)];
			if (cells.filter((x) => x === p).length >= 2) continue;
			cells.push(p);
		}
	} else while (cells.length < 9) {
		const p = SCRATCH_PRIZES[randInt(SCRATCH_PRIZES.length)];
		if (cells.filter((x) => x === p).length >= 2) continue;
		cells.push(p);
	}
	const shuffled = fisherYates(cells);
	const counts = /* @__PURE__ */ new Map();
	for (const x of shuffled) counts.set(x, (counts.get(x) ?? 0) + 1);
	let winX = 0;
	for (const [k, n] of counts) if (n >= 3) winX = k;
	return {
		cells: shuffled,
		winX
	};
}
function weightedPrize() {
	const w = [
		28,
		22,
		16,
		12,
		10,
		7,
		4,
		1
	];
	let r = randInt(w.reduce((a, b) => a + b, 0));
	for (let i = 0; i < w.length; i++) {
		r -= w[i];
		if (r < 0) return i;
	}
	return 0;
}
var RANK_ORDER = [
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K",
	"A"
];
function dealDragonTiger() {
	const [a, b] = shoe(1);
	const dragon = a ?? makeCard("spades", "A");
	const tiger = b ?? makeCard("hearts", "K");
	const d = RANK_ORDER.indexOf(dragon.rank);
	const t = RANK_ORDER.indexOf(tiger.rank);
	return {
		dragon,
		tiger,
		winner: d === t ? "tie" : d > t ? "dragon" : "tiger"
	};
}
function dtPay(side, winner, stake) {
	if (side === "tie") return winner === "tie" ? stake * 9 : 0;
	if (winner === "tie") return Math.round(stake * .5);
	return side === winner ? stake * 2 : 0;
}
var CHAT = [
	"Lena setzt Banker",
	"M. aus Berlin: 20 auf Rot",
	"Dealer: keine weiteren Karten",
	"K. Köln gewinnt die Bank",
	"Ayla: Lucky Numbers gleich",
	"Sofia: letzte Runde vor Pause"
];
function TableShell({ title, subtitle, children, slug, felt = "classic", live = true }) {
	const touchGame = useCasino((s) => s.touchGame);
	(0, import_react.useEffect)(() => {
		if (slug) touchGame(slug);
	}, [slug, touchGame]);
	const feltBg = felt === "wheel" ? "bg-[#140808]" : felt === "bacc" ? "bg-[#081018]" : "bg-felt";
	const vignette = felt === "wheel" ? "opacity-50 [background:radial-gradient(ellipse_at_center,transparent_40%,#0a0404_100%)]" : felt === "bacc" ? "opacity-50 [background:radial-gradient(ellipse_at_center,transparent_40%,#040814_100%)]" : "opacity-40 [background:radial-gradient(ellipse_at_center,transparent_40%,#071910_100%)]";
	const subColor = felt === "classic" ? "text-accent/80" : "text-[#e8c85a]/80";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden ${feltBg} sm:-mx-6`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute inset-0 ${vignette}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/games/char-dealer.jpg",
				alt: "",
				className: "pointer-events-none absolute bottom-0 right-0 z-[5] hidden h-[55%] max-w-[200px] object-contain object-bottom opacity-80 sm:block"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute bottom-10 left-6 z-[5] hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, {
					n: 6,
					tone: felt === "wheel" ? "gold" : felt === "bacc" ? "ice" : "felt"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-4 pb-28 pt-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80 hover:text-fg",
							"aria-label": "Lobby",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl text-fg",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs ${subColor}`,
							children: subtitle
						})] })]
					}),
					live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveRibbon, { slug: slug ?? title }) : null,
					children
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
		]
	});
}
function LiveRibbon({ slug }) {
	const [now, setNow] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const left = 18 - Math.floor(now / 1e3) % 18;
	const occ = liveOccupancy(slug.slice(0, 8), now);
	const chat = CHAT[Math.floor(now / 4e3) % CHAT.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-black/25 px-3 py-2 text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold uppercase tracking-wider text-loss",
				children: "Live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "tabular-nums text-fg/80",
				children: [
					"Runde ",
					left,
					"s · ",
					occ,
					" am Tisch"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden truncate text-muted sm:inline",
				children: chat
			})
		]
	});
}
var SIDES = [
	{
		id: "dragon",
		label: "Drache",
		hint: "1:1"
	},
	{
		id: "tie",
		label: "Unentschieden",
		hint: "8:1"
	},
	{
		id: "tiger",
		label: "Tiger",
		hint: "1:1"
	}
];
function DragonTigerView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const [side, setSide] = (0, import_react.useState)("dragon");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [deal, setDeal] = (0, import_react.useState)(null);
	const [last, setLast] = (0, import_react.useState)(null);
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
		if (!placeBet(bet, "Drache & Tiger")) return;
		setBusy(true);
		setDeal(null);
		if (soundOn) sfx.spin();
		await new Promise((r) => setTimeout(r, 420));
		const d = dealDragonTiger();
		setDeal(d);
		const paid = dtPay(side, d.winner, bet);
		setLast(paid);
		if (paid > 0) {
			creditWin(paid, "Drache & Tiger");
			if (soundOn) sfx.win(paid >= bet * 4);
		} else if (soundOn) sfx.lose();
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableShell, {
		title: "Drache & Tiger",
		subtitle: "Eine Karte · Höhere gewinnt · Unentschieden 8:1",
		slug: "drache-tiger",
		felt: "bacc",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs uppercase tracking-[0.22em] text-[#e8c85a]",
							children: "Drache"
						}),
						deal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
							card: deal.dragon,
							size: "table"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-36 w-24 rounded-md bg-elevated/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, {
								n: side === "dragon" ? 5 : 2,
								tone: "gold"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs uppercase tracking-[0.22em] text-[#d0d8e0]",
							children: "Tiger"
						}),
						deal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
							card: deal.tiger,
							size: "table"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-36 w-24 rounded-md bg-elevated/80" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, {
								n: side === "tiger" ? 5 : 2,
								tone: "ice"
							})
						})
					]
				})]
			}),
			deal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center font-display text-2xl",
				children: deal.winner === "tie" ? "Unentschieden" : deal.winner === "dragon" ? "Drache" : "Tiger"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-3 gap-2",
				children: SIDES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: busy,
					onClick: () => setSide(s.id),
					className: cn("rounded-md px-2 py-3 text-sm", side === s.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider",
						children: s.hint
					})]
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: "h-11 rounded-md border border-border bg-elevated px-3 text-sm",
					value: betI,
					onChange: (e) => setBetI(Number(e.target.value)),
					disabled: busy,
					children: ORIGINAL_STEPS.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: i,
						children: formatEuro(c)
					}, c))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy || balance < bet,
					onClick: () => void play(),
					className: "h-12 min-w-36 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40",
					children: busy ? "…" : "Geben"
				})]
			}),
			last != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-center text-sm tabular-nums", last > 0 ? "text-win" : "text-loss"),
				children: formatEuro(last)
			}) : null
		]
	});
}
function rollSic() {
	return [
		randInt(6) + 1,
		randInt(6) + 1,
		randInt(6) + 1
	];
}
function sicSum(dice) {
	return dice[0] + dice[1] + dice[2];
}
function isTriple(dice) {
	return dice[0] === dice[1] && dice[1] === dice[2];
}
var TOTAL_PAY = {
	4: 60,
	5: 30,
	6: 17,
	7: 12,
	8: 8,
	9: 6,
	10: 6,
	11: 6,
	12: 6,
	13: 8,
	14: 12,
	15: 17,
	16: 30,
	17: 60
};
function sicPay(dice, bet, stake) {
	const sum = sicSum(dice);
	const trip = isTriple(dice);
	if (bet.kind === "size") {
		if (trip) return 0;
		const small = sum >= 4 && sum <= 10;
		return (bet.size === "small" ? small : sum >= 11 && sum <= 17) ? stake * 2 : 0;
	}
	if (bet.kind === "odd") return !trip && sum % 2 === 1 ? stake * 2 : 0;
	if (bet.kind === "even") return !trip && sum % 2 === 0 ? stake * 2 : 0;
	if (bet.kind === "triple") {
		if (!trip) return 0;
		if (bet.n === "any") return stake * 31;
		return dice[0] === bet.n ? stake * 181 : 0;
	}
	if (bet.kind === "total") {
		if (sum !== bet.n) return 0;
		return stake * ((TOTAL_PAY[bet.n] ?? 0) + 1);
	}
	const hits = dice.filter((d) => d === bet.n).length;
	if (hits === 0) return 0;
	return stake * (hits + 1);
}
function sicLabel(bet) {
	if (bet.kind === "size") return bet.size === "small" ? "Klein 4–10" : "Groß 11–17";
	if (bet.kind === "odd") return "Ungerade";
	if (bet.kind === "even") return "Gerade";
	if (bet.kind === "triple") return bet.n === "any" ? "Dreierlinge" : `Triple ${bet.n}`;
	if (bet.kind === "total") return `Summe ${bet.n}`;
	return `Auge ${bet.n}`;
}
var SIZES = [
	{
		kind: "size",
		size: "small"
	},
	{ kind: "odd" },
	{ kind: "even" },
	{
		kind: "size",
		size: "big"
	}
];
function SicBoView() {
	const [betI, setBetI] = (0, import_react.useState)(1);
	const bet = ORIGINAL_STEPS[betI] ?? 100;
	const [sel, setSel] = (0, import_react.useState)({
		kind: "size",
		size: "big"
	});
	const [dice, setDice] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [last, setLast] = (0, import_react.useState)(null);
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
		if (!placeBet(bet, "Sic Bo")) return;
		setBusy(true);
		if (soundOn) sfx.spin();
		for (let i = 0; i < 10; i++) {
			setDice(rollSic());
			await new Promise((r) => setTimeout(r, 70));
		}
		const d = rollSic();
		setDice(d);
		const paid = sicPay(d, sel, bet);
		setLast(paid);
		if (paid > 0) {
			creditWin(paid, "Sic Bo");
			if (soundOn) sfx.win(paid >= bet * 8);
		} else if (soundOn) sfx.lose();
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableShell, {
		title: "Sic Bo",
		subtitle: "Drei Würfel · Klein / Groß · Triple 180:1",
		slug: "sicbo",
		felt: "classic",
		live: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex justify-center gap-3",
				children: (dice ?? [
					1,
					2,
					3
				]).map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Die, {
					n,
					rolling: busy
				}, i))
			}),
			dice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 text-center text-sm text-accent",
				children: [
					"Summe ",
					sicSum(dice),
					isTriple(dice) ? " · Triple" : ""
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1.5",
				children: SIZES.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetCell, {
					label: sicLabel(b),
					hint: "1:1",
					active: same(sel, b),
					onClick: () => setSel(b)
				}, sicLabel(b)))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-6 gap-1.5",
				children: [
					1,
					2,
					3,
					4,
					5,
					6
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetCell, {
					label: `${n}`,
					hint: "1–3:1",
					active: sel.kind === "single" && sel.n === n,
					onClick: () => setSel({
						kind: "single",
						n
					})
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid grid-cols-7 gap-1.5",
				children: [
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetCell, {
					label: `${n}`,
					hint: "",
					active: sel.kind === "total" && sel.n === n,
					onClick: () => setSel({
						kind: "total",
						n
					})
				}, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid grid-cols-2 gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetCell, {
					label: "Dreierlinge",
					hint: "30:1",
					active: sel.kind === "triple" && sel.n === "any",
					onClick: () => setSel({
						kind: "triple",
						n: "any"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetCell, {
					label: "Spezial-Triple",
					hint: "180:1",
					active: sel.kind === "triple" && sel.n !== "any",
					onClick: () => setSel({
						kind: "triple",
						n: 6
					})
				})]
			}),
			sel.kind === "triple" && sel.n !== "any" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex gap-1.5",
				children: [
					1,
					2,
					3,
					4,
					5,
					6
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSel({
						kind: "triple",
						n
					}),
					className: cn("h-10 flex-1 rounded-md text-sm", sel.n === n ? "bg-accent text-accent-fg" : "bg-elevated"),
					children: [
						n,
						n,
						n
					]
				}, n))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-md border border-accent/25 bg-surface",
					children: ORIGINAL_STEPS.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setBetI(i),
						className: cn("h-11 px-2 text-xs tabular-nums", i === betI ? "bg-accent text-accent-fg" : "text-muted"),
						children: formatEuro(v)
					}, v))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy || balance < bet,
					onClick: () => void play(),
					className: "ml-auto h-12 min-w-36 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40",
					children: busy ? "Würfeln" : "Setzen"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: sicLabel(sel)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("tabular-nums", last != null && last > 0 ? "text-win" : "text-fg"),
					children: last == null ? "—" : formatEuro(last)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, {
					n: 5,
					tone: "felt"
				})
			})
		]
	});
}
function same(a, b) {
	if (a.kind !== b.kind) return false;
	if (a.kind === "size" && b.kind === "size") return a.size === b.size;
	if (a.kind === "triple" && b.kind === "triple") return a.n === b.n;
	if (a.kind === "total" && b.kind === "total") return a.n === b.n;
	if (a.kind === "single" && b.kind === "single") return a.n === b.n;
	return true;
}
function BetCell({ label, hint, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("min-h-12 rounded-md px-1 py-2 text-center text-xs", active ? "bg-accent text-accent-fg" : "bg-elevated/80 text-fg hover:bg-elevated"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-semibold",
			children: label
		}), hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-[10px] opacity-70",
			children: hint
		}) : null]
	});
}
function Die({ n, rolling }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("sic-die", rolling && "is-roll"),
		"aria-label": `${n}`,
		children: [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9
		].map((p) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: (n === 1 ? p === 5 : n === 2 ? p === 1 || p === 9 : n === 3 ? p === 1 || p === 5 || p === 9 : n === 4 ? p === 1 || p === 3 || p === 7 || p === 9 : n === 5 ? p === 1 || p === 3 || p === 5 || p === 7 || p === 9 : p !== 5) ? "on" : void 0 }, p);
		})
	});
}
var WHEEL_ORDER = [
	0,
	32,
	15,
	19,
	4,
	21,
	2,
	25,
	17,
	34,
	6,
	27,
	13,
	36,
	11,
	30,
	8,
	23,
	10,
	5,
	24,
	16,
	33,
	1,
	20,
	14,
	31,
	9,
	22,
	18,
	29,
	7,
	28,
	12,
	35,
	3,
	26
];
var REDS = /* @__PURE__ */ new Set([
	1,
	3,
	5,
	7,
	9,
	12,
	14,
	16,
	18,
	19,
	21,
	23,
	25,
	27,
	30,
	32,
	34,
	36
]);
function isRed(n) {
	return REDS.has(n);
}
function colorOf(n) {
	if (n === 0) return "green";
	return isRed(n) ? "red" : "black";
}
function spinWheel() {
	return WHEEL_ORDER[randInt(WHEEL_ORDER.length)];
}
function wheelIndex(n) {
	return WHEEL_ORDER.indexOf(n);
}
function hitsOutside(bet, n) {
	if (n === 0) return false;
	switch (bet) {
		case "red": return isRed(n);
		case "black": return !isRed(n);
		case "even": return n % 2 === 0;
		case "odd": return n % 2 === 1;
		case "low": return n >= 1 && n <= 18;
		case "high": return n >= 19 && n <= 36;
		case "dozen1": return n >= 1 && n <= 12;
		case "dozen2": return n >= 13 && n <= 24;
		case "dozen3": return n >= 25 && n <= 36;
		case "col1": return n % 3 === 1;
		case "col2": return n % 3 === 2;
		case "col3": return n % 3 === 0;
	}
}
var OUTSIDE_PAY = {
	red: 1,
	black: 1,
	even: 1,
	odd: 1,
	low: 1,
	high: 1,
	dozen1: 2,
	dozen2: 2,
	dozen3: 2,
	col1: 2,
	col2: 2,
	col3: 2
};
function settleRoulette(bets, number, lightning) {
	let returned = 0;
	let staked = 0;
	const bolt = lightning?.[number] ?? 0;
	for (const bet of bets) {
		staked += bet.amount;
		if (bet.key.startsWith("n:")) {
			if (Number(bet.key.slice(2)) === number) returned += bet.amount * (bolt > 0 ? bolt : 36);
		} else if (hitsOutside(bet.key, number)) returned += bet.amount * (1 + OUTSIDE_PAY[bet.key]);
	}
	return {
		returned,
		staked
	};
}
var CHIP_VALUES = [
	100,
	500,
	1e3,
	2500,
	5e3,
	1e4
];
var COL_ROWS = [
	[
		3,
		6,
		9,
		12,
		15,
		18,
		21,
		24,
		27,
		30,
		33,
		36
	],
	[
		2,
		5,
		8,
		11,
		14,
		17,
		20,
		23,
		26,
		29,
		32,
		35
	],
	[
		1,
		4,
		7,
		10,
		13,
		16,
		19,
		22,
		25,
		28,
		31,
		34
	]
];
var COL_KEYS = [
	"col3",
	"col2",
	"col1"
];
function RouletteView({ lightning = false }) {
	const [chip, setChip] = (0, import_react.useState)(100);
	const [bets, setBets] = (0, import_react.useState)({});
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [lastNet, setLastNet] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [bolts, setBolts] = (0, import_react.useState)({});
	const lastBets = (0, import_react.useRef)({});
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const list = (0, import_react.useMemo)(() => Object.entries(bets).filter(([, a]) => a > 0).map(([key, amount]) => ({
		key,
		amount
	})), [bets]);
	const staked = list.reduce((s, b) => s + b.amount, 0);
	const rebetTotal = Object.values(lastBets.current).reduce((s, n) => s + n, 0);
	function add(key) {
		unlockAudio();
		if (spinning) return;
		if (staked + chip > balance) {
			setCashier(true);
			return;
		}
		if (soundOn) sfx.chip();
		setBets((b) => ({
			...b,
			[key]: (b[key] ?? 0) + chip
		}));
		setLastNet(null);
	}
	function rebet() {
		unlockAudio();
		if (spinning || rebetTotal <= 0) return;
		if (rebetTotal > balance) {
			setCashier(true);
			return;
		}
		if (soundOn) sfx.chip();
		setBets({ ...lastBets.current });
		setLastNet(null);
	}
	function spin() {
		unlockAudio();
		if (spinning || list.length === 0) return;
		if (!placeBet(staked, lightning ? "Blitz-Roulette" : "Roulette · Einsatz")) {
			setCashier(true);
			return;
		}
		if (soundOn) sfx.spin();
		lastBets.current = { ...bets };
		const n = spinWheel();
		const end = 2160 + (360 - wheelIndex(n) * (360 / WHEEL_ORDER.length));
		const nextBolts = {};
		if (lightning) {
			const count = 1 + randInt(4);
			const pool = fisherYates(Array.from({ length: 37 }, (_, i) => i));
			const mults = [
				50,
				50,
				100,
				100,
				150,
				200,
				300,
				500
			];
			for (let i = 0; i < count; i++) nextBolts[pool[i]] = mults[randInt(mults.length)];
		}
		setBolts(nextBolts);
		setSpinning(true);
		setResult(null);
		setRotation((r) => r + end);
		window.setTimeout(() => {
			const { returned } = settleRoulette(list, n, lightning ? nextBolts : void 0);
			setResult(n);
			setSpinning(false);
			setHistory((h) => [n, ...h].slice(0, 12));
			if (returned > 0) creditWin(returned, lightning ? "Blitz-Roulette" : "Roulette · Gewinn");
			setLastNet(returned - staked);
			if (soundOn) {
				if (returned > staked) sfx.win(true);
				else if (returned > 0) sfx.win(false);
				else sfx.lose();
			}
			setBets({});
		}, 4200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableShell, {
		title: lightning ? "Blitz-Roulette" : "Roulette",
		subtitle: lightning ? "Lucky Numbers bis 500× · eine Null" : "Europäisch · eine Null · Hausvorteil 2,7 %",
		slug: lightning ? "blitz-roulette" : "roulette",
		felt: "wheel",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[220px_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center rounded-xl border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
						rotation,
						spinning,
						result
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm tabular-nums text-muted",
						children: result === null ? spinning ? "Kugel läuft…" : "Bereit" : `Zahl ${result}`
					}),
					lightning && Object.keys(bolts).length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-center text-[11px] text-[#e8c85a]",
						children: [
							"Blitz",
							" ",
							Object.entries(bolts).map(([n, m]) => `${n}×${m}`).join(" · ")
						]
					}) : null,
					lastNet !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("text-sm tabular-nums", lastNet >= 0 ? "text-win" : "text-loss"),
						children: [lastNet >= 0 ? "+" : "", formatEuro(lastNet)]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex w-full flex-wrap justify-center gap-1",
						children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wider text-subtle",
							children: "Letzte 12"
						}) : history.map((n, i) => {
							const col = colorOf(n);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex size-7 items-center justify-center rounded-full text-[10px] tabular-nums", col === "green" ? "bg-win/40 text-fg" : col === "red" ? "bg-wine text-fg" : "bg-bg text-fg"),
								children: n
							}, `${n}-${i}`);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-felt p-3 sm:p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 min-w-[36rem] grid grid-cols-[36px_repeat(12,minmax(0,1fr))_40px] gap-1 text-center text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => add("n:0"),
							className: cn("relative row-span-3 flex items-center justify-center rounded-sm bg-win/30 text-fg", bets["n:0"] && "ring-1 ring-accent"),
							children: ["0", bets["n:0"] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipMini, { amount: bets["n:0"] }) : null]
						}), COL_ROWS.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "contents",
							children: [row.map((n) => {
								const key = `n:${n}`;
								const col = colorOf(n);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => add(key),
									className: cn("relative flex h-9 items-center justify-center rounded-sm text-xs tabular-nums", col === "red" ? "bg-wine text-fg" : "bg-bg text-fg", bets[key] && "ring-1 ring-accent"),
									children: [n, bets[key] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipMini, { amount: bets[key] }) : null]
								}, n);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => add(COL_KEYS[ri]),
								className: cn("relative flex items-center justify-center rounded-sm bg-bg/40 text-[10px] uppercase tracking-wide text-fg", bets[COL_KEYS[ri]] && "ring-1 ring-accent"),
								children: ["2:1", bets[COL_KEYS[ri]] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipMini, { amount: bets[COL_KEYS[ri]] }) : null]
							})]
						}, COL_KEYS[ri]))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-3 gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "1–12",
								k: "dozen1",
								bets,
								add
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "13–24",
								k: "dozen2",
								bets,
								add
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "25–36",
								k: "dozen3",
								bets,
								add
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 grid grid-cols-6 gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "1–18",
								k: "low",
								bets,
								add
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "Gerade",
								k: "even",
								bets,
								add
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "Rot",
								k: "red",
								bets,
								add,
								wine: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "Schwarz",
								k: "black",
								bets,
								add,
								dark: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "Ungerade",
								k: "odd",
								bets,
								add
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutBtn, {
								label: "19–36",
								k: "high",
								bets,
								add
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-2",
						children: [
							CHIP_VALUES.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setChip(v),
								className: cn("size-11 rounded-full border text-[10px] tabular-nums", chip === v ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated text-fg"),
								children: v / 100
							}, v)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								disabled: spinning,
								onClick: () => setBets({}),
								children: "Löschen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								disabled: spinning || rebetTotal <= 0,
								onClick: rebet,
								children: "Wiederholen"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "ml-auto",
								size: "lg",
								disabled: spinning || staked === 0,
								onClick: spin,
								children: ["Drehen · ", formatEuro(staked)]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-xs text-accent/80",
						children: ["Guthaben ", formatEuro(balance)]
					})
				]
			})]
		})
	});
}
function OutBtn({ label, k, bets, add, wine, dark }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => add(k),
		className: cn("relative h-10 rounded-sm border border-accent/20 text-[11px] uppercase tracking-wide text-fg", wine && "bg-wine", dark && "bg-bg", !wine && !dark && "bg-bg/40", bets[k] && "ring-1 ring-accent"),
		children: [label, bets[k] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipMini, { amount: bets[k] }) : null]
	});
}
function ChipMini({ amount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute -right-1 -top-1 rounded-full bg-accent px-1.5 text-[9px] tabular-nums text-accent-fg",
		children: amount / 100
	});
}
function Wheel({ rotation, spinning, result }) {
	const pockets = WHEEL_ORDER.length;
	const ballSpin = spinning ? rotation * 1.55 + 280 : rotation + 8;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative size-52",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-full rounded-full border-4 border-accent/40",
				style: {
					background: `conic-gradient(${WHEEL_ORDER.map((n, i) => {
						return `${n === 0 ? "#12382c" : colorOf(n) === "red" ? "#8a3d3a" : "#121416"} ${i / pockets * 100}% ${(i + 1) / pockets * 100}%`;
					}).join(",")})`,
					transform: `rotate(${rotation}deg)`,
					transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.82, 0.08, 1)" : "none"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-[11%] rounded-full",
				style: {
					transform: `rotate(${-ballSpin}deg)`,
					transition: spinning ? "transform 4.2s cubic-bezier(0.05, 0.55, 0.12, 1)" : "none"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-card shadow-[0_0_8px_rgb(0_0_0_/_0.45)]" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-0 z-10 h-4 w-0.5 -translate-x-1/2 bg-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-16 items-center justify-center rounded-full border border-accent/30 bg-bg text-lg tabular-nums text-fg",
					children: result ?? "•"
				})
			})
		]
	});
}
function newBlackjack() {
	return {
		phase: "bet",
		deck: [],
		player: [],
		active: 0,
		dealer: [],
		holeHidden: true,
		message: "Einsatz wählen",
		insuranceBet: 0
	};
}
function draw$1(state) {
	if (state.deck.length < 20) state.deck = shoe(6);
	return state.deck.pop();
}
function dealBJ(state, bet) {
	const next = {
		...state,
		player: [{
			cards: [],
			bet,
			stood: false,
			doubled: false
		}],
		active: 0,
		dealer: [],
		holeHidden: true,
		phase: "player",
		message: "",
		insuranceBet: 0
	};
	next.player[0].cards.push(draw$1(next), draw$1(next));
	next.dealer.push(draw$1(next), draw$1(next));
	if (isBlackjack(next.player[0].cards)) {
		next.phase = "dealer";
		next.holeHidden = false;
		if (!dealerShouldHit(next)) return settleBJ(next);
		return next;
	}
	if (next.dealer[0]?.rank === "A") {
		next.phase = "insurance";
		next.message = "Versicherung gegen Blackjack?";
		return next;
	}
	next.message = "Ziehen oder Halten";
	return next;
}
function resolveInsurance(state, amount) {
	if (state.phase !== "insurance") return state;
	const next = cloneBJ(state);
	next.insuranceBet = amount;
	if (isBlackjack(next.dealer)) {
		next.holeHidden = false;
		return settleBJ(next);
	}
	next.phase = "player";
	next.message = "Ziehen oder Halten";
	return next;
}
function hitBJ(state) {
	if (state.phase !== "player") return state;
	const next = cloneBJ(state);
	const hand = next.player[next.active];
	hand.cards.push(draw$1(next));
	const v = handValueBJ(hand.cards).total;
	if (v > 21) {
		hand.stood = true;
		return advanceHand(next);
	}
	if (v === 21) {
		hand.stood = true;
		return advanceHand(next);
	}
	next.message = "Ziehen oder Halten";
	return next;
}
function standBJ(state) {
	if (state.phase !== "player") return state;
	const next = cloneBJ(state);
	next.player[next.active].stood = true;
	return advanceHand(next);
}
function doubleBJ(state) {
	if (state.phase !== "player") return null;
	const hand = state.player[state.active];
	if (hand.cards.length !== 2 || hand.doubled) return null;
	const next = cloneBJ(state);
	const h = next.player[next.active];
	h.doubled = true;
	h.bet *= 2;
	h.cards.push(draw$1(next));
	h.stood = true;
	return advanceHand(next);
}
function canSplit(state) {
	if (state.phase !== "player" || state.player.length !== 1) return false;
	const h = state.player[0];
	if (h.cards.length !== 2) return false;
	const a = h.cards[0];
	const b = h.cards[1];
	return a.rank === b.rank;
}
function splitBJ(state) {
	if (!canSplit(state)) return null;
	const next = cloneBJ(state);
	const first = next.player[0];
	const cardB = first.cards.pop();
	next.player.push({
		cards: [cardB],
		bet: first.bet,
		stood: false,
		doubled: false
	});
	first.cards.push(draw$1(next));
	next.player[1].cards.push(draw$1(next));
	next.active = 0;
	next.message = "Hand 1";
	return next;
}
function advanceHand(state) {
	const next = state;
	while (next.active < next.player.length && next.player[next.active].stood) next.active += 1;
	if (next.active >= next.player.length) return beginDealer(next);
	next.message = next.player.length > 1 ? `Hand ${next.active + 1}` : "Ziehen oder Halten";
	return next;
}
function dealerShouldHit(state) {
	if (state.player.every((h) => handValueBJ(h.cards).total > 21)) return false;
	const v = handValueBJ(state.dealer);
	return v.total < 17 || v.total === 17 && v.soft;
}
function beginDealer(state) {
	const next = cloneBJ(state);
	next.phase = "dealer";
	next.holeHidden = false;
	if (!dealerShouldHit(next)) return settleBJ(next);
	next.message = "Croupier zieht";
	return next;
}
function dealerHitOnce(state) {
	if (state.phase !== "dealer") return state;
	const next = cloneBJ(state);
	next.dealer.push(draw$1(next));
	if (!dealerShouldHit(next)) return settleBJ(next);
	next.message = "Croupier zieht";
	return next;
}
function settleBJ(state) {
	const dealerTotal = handValueBJ(state.dealer).total;
	const dealerBJ = isBlackjack(state.dealer);
	const notes = [];
	state.player.forEach((hand) => {
		const pv = handValueBJ(hand.cards).total;
		const pBJ = isBlackjack(hand.cards) && state.player.length === 1 && !hand.doubled;
		if (pv > 21) notes.push("Überkauft");
		else if (pBJ && !dealerBJ) notes.push("Blackjack");
		else if (dealerBJ && pBJ) notes.push("Stand");
		else if (dealerTotal > 21) notes.push("Gewonnen");
		else if (pv > dealerTotal) notes.push("Gewonnen");
		else if (pv < dealerTotal) notes.push("Verloren");
		else notes.push("Stand");
	});
	if (state.insuranceBet > 0) notes.push(dealerBJ ? "Versicherung zahlt" : "Versicherung verloren");
	state.phase = "settle";
	state.message = notes.join(" · ");
	return state;
}
function payoutsOf(state) {
	const dealerTotal = handValueBJ(state.dealer).total;
	const dealerBJ = isBlackjack(state.dealer);
	let returned = 0;
	let staked = 0;
	for (const hand of state.player) {
		staked += hand.bet;
		const pv = handValueBJ(hand.cards).total;
		const pBJ = isBlackjack(hand.cards) && state.player.length === 1 && !hand.doubled;
		if (pv > 21) continue;
		if (pBJ && !dealerBJ) {
			returned += Math.round(hand.bet * 2.5);
			continue;
		}
		if (dealerBJ && pBJ) {
			returned += hand.bet;
			continue;
		}
		if (dealerBJ) continue;
		if (dealerTotal > 21 || pv > dealerTotal) returned += hand.bet * 2;
		else if (pv === dealerTotal) returned += hand.bet;
	}
	if (state.insuranceBet > 0 && dealerBJ) returned += state.insuranceBet * 3;
	return {
		returned,
		net: returned - staked
	};
}
function cloneBJ(s) {
	return {
		...s,
		deck: s.deck.slice(),
		dealer: s.dealer.slice(),
		player: s.player.map((h) => ({
			...h,
			cards: h.cards.slice()
		}))
	};
}
var STEPS$1 = [
	100,
	200,
	500,
	1e3,
	2500,
	5e3,
	1e4
];
function BlackjackView() {
	const [game, setGame] = (0, import_react.useState)(() => newBlackjack());
	const [bet, setBet] = (0, import_react.useState)(500);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const dealerVal = handValueBJ(game.holeHidden ? game.dealer.slice(0, 1) : game.dealer).total;
	const active = game.player[game.active];
	const insuranceCost = Math.floor((game.player[0]?.bet ?? bet) / 2);
	(0, import_react.useEffect)(() => {
		if (game.phase !== "dealer") return;
		const t = window.setTimeout(() => {
			const next = dealerHitOnce(game);
			if (soundOn) sfx.deal();
			if (next.phase === "settle") applySettle(next);
			else setGame(next);
		}, 720);
		return () => window.clearTimeout(t);
	}, [game]);
	function deal() {
		unlockAudio();
		if (balance < bet) {
			setCashier(true);
			return;
		}
		if (!placeBet(bet, "Blackjack · Einsatz")) return;
		if (soundOn) sfx.deal();
		const next = dealBJ(newBlackjack(), bet);
		if (next.phase === "settle") applySettle(next);
		else setGame(next);
	}
	function applySettle(next) {
		const { returned, net } = payoutsOf(next);
		if (returned > 0) creditWin(returned, "Blackjack · Auszahlung");
		if (soundOn) {
			if (net > 0) sfx.win(net >= bet);
			else if (net < 0) sfx.lose();
		}
		setGame(next);
	}
	function act(fn, extra = 0) {
		unlockAudio();
		if (extra > 0) {
			if (balance < extra) {
				setCashier(true);
				return;
			}
			if (!placeBet(extra, "Blackjack · Extra")) return;
		}
		if (soundOn) sfx.deal();
		const next = fn(game);
		if (!next) return;
		if (next.phase === "settle") applySettle(next);
		else setGame(next);
	}
	function insurance(take) {
		unlockAudio();
		let amount = 0;
		if (take) {
			if (balance < insuranceCost) {
				setCashier(true);
				return;
			}
			if (insuranceCost > 0 && !placeBet(insuranceCost, "Blackjack · Versicherung")) return;
			amount = insuranceCost;
		}
		const next = resolveInsurance(game, amount);
		if (next.phase === "settle") applySettle(next);
		else setGame(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableShell, {
		title: "Blackjack",
		subtitle: "6 Decks · Dealer zieht bei weichem 17 · Blackjack 3:2 · Versicherung",
		slug: "blackjack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center text-xs uppercase tracking-[0.2em] text-accent",
				children: "Croupier"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-28 justify-center gap-2",
				children: game.dealer.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, { hidden: true }) : game.dealer.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
					card: c,
					hidden: game.holeHidden && i === 1,
					delayMs: i * 90
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-sm tabular-nums text-fg",
				children: game.dealer.length ? dealerVal : "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-6 h-px bg-felt-line/20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center text-xs uppercase tracking-[0.2em] text-accent",
				children: "Sie"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-6",
				children: game.player.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-[5.5rem] w-[3.9rem] items-center justify-center rounded-md border border-dashed border-accent/30 sm:h-24 sm:w-[4.25rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-accent/70",
						children: "Einsatz"
					})
				}) : game.player.map((hand, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("rounded-lg p-2", i === game.active && game.phase === "player" ? "ring-1 ring-accent" : ""),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						children: hand.cards.map((c, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
							card: c,
							delayMs: ci * 90
						}, c.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-center text-sm tabular-nums",
						children: [handValueBJ(hand.cards).total, hand.doubled ? " · Doppelt" : ""]
					})]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 min-h-6 text-center text-sm text-fg",
				children: game.message
			}),
			game.phase === "bet" || game.phase === "settle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col items-center gap-3",
				children: [game.phase === "bet" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-md border border-accent/25 bg-bg/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-11 text-fg",
							onClick: () => setBet((b) => STEPS$1[Math.max(0, STEPS$1.indexOf(b) - 1)] ?? STEPS$1[0]),
							"aria-label": "Einsatz senken",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-24 text-center text-sm tabular-nums",
							children: formatEuro(bet)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-11 text-fg",
							onClick: () => setBet((b) => STEPS$1[Math.min(STEPS$1.length - 1, STEPS$1.indexOf(b) + 1)] ?? STEPS$1.at(-1)),
							"aria-label": "Einsatz erhöhen",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
						})
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					className: "min-w-40",
					onClick: deal,
					disabled: balance < bet && game.phase === "bet",
					children: game.phase === "settle" ? "Neue Runde" : "Geben"
				})]
			}) : game.phase === "insurance" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => insurance(true),
					disabled: balance < insuranceCost,
					children: ["Versichern · ", formatEuro(insuranceCost)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => insurance(false),
					children: "Nein"
				})]
			}) : game.phase === "dealer" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center text-sm text-muted",
				children: "Croupier spielt…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap justify-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => act(hitBJ),
						children: "Ziehen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						onClick: () => act(standBJ),
						children: "Halten"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						disabled: !active || active.cards.length !== 2,
						onClick: () => act((s) => doubleBJ(s), active?.bet ?? 0),
						children: "Doppeln"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						disabled: !canSplit(game),
						onClick: () => act((s) => splitBJ(s), bet),
						children: "Teilen"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-center text-xs text-accent/80",
				children: ["Guthaben ", formatEuro(balance)]
			})
		]
	});
}
function newBaccarat() {
	return {
		deck: [],
		player: [],
		banker: [],
		phase: "bet",
		outcome: null
	};
}
function draw(s) {
	if (s.deck.length < 16) s.deck = shoe(8);
	return s.deck.pop();
}
function playerThird(p, b) {
	if (p >= 8 || b >= 8) return false;
	return p <= 5;
}
function bankerThird(p, b, playerDrew, pThird) {
	if (p >= 8 || b >= 8) return false;
	if (!playerDrew) return b <= 5;
	const t = pThird ?? 0;
	if (b <= 2) return true;
	if (b === 3) return t !== 8;
	if (b === 4) return t >= 2 && t <= 7;
	if (b === 5) return t >= 4 && t <= 7;
	if (b === 6) return t === 6 || t === 7;
	return false;
}
function dealBaccarat(state) {
	const next = {
		...state,
		deck: state.deck.slice(),
		player: [],
		banker: [],
		phase: "result",
		outcome: null
	};
	next.player.push(draw(next), draw(next));
	next.banker.push(draw(next), draw(next));
	let p = baccaratTotal(next.player);
	let b = baccaratTotal(next.banker);
	const natural = p >= 8 || b >= 8;
	let pThird = null;
	const pDrew = !natural && playerThird(p, b);
	if (pDrew) {
		const c = draw(next);
		next.player.push(c);
		pThird = baccaratTotal([c]);
		p = baccaratTotal(next.player);
	}
	if (!natural && bankerThird(p, b, pDrew, pThird)) {
		next.banker.push(draw(next));
		b = baccaratTotal(next.banker);
	}
	p = baccaratTotal(next.player);
	b = baccaratTotal(next.banker);
	next.outcome = p === b ? "tie" : p > b ? "player" : "banker";
	return next;
}
function payoutBaccarat(betOn, amount, outcome) {
	if (outcome === "tie") {
		if (betOn === "tie") return amount * 9;
		return amount;
	}
	if (betOn !== outcome) return 0;
	if (betOn === "banker") return amount + Math.floor(amount * .95);
	return amount * 2;
}
var STEPS = [
	100,
	200,
	500,
	1e3,
	2500,
	5e3,
	1e4
];
function BaccaratView() {
	const [game, setGame] = (0, import_react.useState)(() => newBaccarat());
	const [betOn, setBetOn] = (0, import_react.useState)("player");
	const [amount, setAmount] = (0, import_react.useState)(500);
	const [last, setLast] = (0, import_react.useState)(null);
	const balance = useCasino((s) => s.balance);
	const placeBet = useCasino((s) => s.placeBet);
	const creditWin = useCasino((s) => s.creditWin);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	function play() {
		unlockAudio();
		if (balance < amount) {
			setCashier(true);
			return;
		}
		if (!placeBet(amount, `Baccarat · ${betOn}`)) return;
		if (soundOn) sfx.deal();
		const next = dealBaccarat(game);
		const returned = next.outcome ? payoutBaccarat(betOn, amount, next.outcome) : 0;
		if (returned > 0) creditWin(returned, "Baccarat · Auszahlung");
		setLast(returned - amount);
		setGame(next);
		if (soundOn) {
			if (returned > amount) sfx.win();
			else if (returned === amount) sfx.click();
			else sfx.lose();
		}
	}
	const labels = {
		player: "Spieler",
		banker: "Bank",
		tie: "Unentschieden"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableShell, {
		title: "Baccarat",
		subtitle: "Punto Banco · Bank 5 % Commission · Unentschieden 8:1",
		slug: "baccarat",
		felt: "bacc",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandBlock, {
					title: "Spieler",
					cards: game.player,
					highlight: game.outcome === "player"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandBlock, {
					title: "Bank",
					cards: game.banker,
					highlight: game.outcome === "banker"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-center text-sm text-fg",
				children: [game.outcome ? labels[game.outcome] : "Einsatz wählen", last !== null ? ` · ${last >= 0 ? "+" : ""}${formatEuro(last)}` : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-3 gap-2",
				children: [
					"player",
					"banker",
					"tie"
				].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setBetOn(k),
					className: cn("h-14 rounded-md border text-sm", betOn === k ? "border-accent bg-bg/40 text-fg" : "border-accent/20 bg-bg/20 text-muted"),
					children: [labels[k], /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-[10px] uppercase tracking-wider text-subtle",
						children: k === "tie" ? "8:1" : k === "banker" ? "0,95:1" : "1:1"
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center rounded-md border border-accent/25 bg-bg/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-11",
							onClick: () => setAmount((b) => STEPS[Math.max(0, STEPS.indexOf(b) - 1)] ?? 100),
							"aria-label": "Einsatz senken",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "mx-auto size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-24 text-center text-sm tabular-nums",
							children: formatEuro(amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "size-11",
							onClick: () => setAmount((b) => STEPS[Math.min(STEPS.length - 1, STEPS.indexOf(b) + 1)] ?? 1e4),
							"aria-label": "Einsatz erhöhen",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "lg",
					onClick: play,
					disabled: balance < amount,
					children: "Geben"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-center text-xs text-accent/80",
				children: ["Guthaben ", formatEuro(balance)]
			})
		]
	});
}
function HandBlock({ title, cards, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-lg p-3", highlight && "ring-1 ring-accent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-center text-xs uppercase tracking-[0.2em] text-accent",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-24 justify-center gap-1.5",
				children: cards.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, { hidden: true }) : cards.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayingCardFace, {
					card: c,
					delayMs: i * 90
				}, c.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-lg tabular-nums text-fg",
				children: cards.length ? baccaratTotal(cards) : "—"
			})
		]
	});
}
//#endregion
export { weightedPick as C, shoe as S, limboResult as _, ORIGINAL_STEPS as a, randInt as b, RANKS as c, SUITS as d, SicBoView as f, limboPay as g, isRed$1 as h, DragonTigerView as i, ResultBar as l, fisherYates as m, BetBar as n, OriginalShell as o, dicePay as p, BlackjackView as r, PlayingCardFace as s, BaccaratView as t, RouletteView as u, makeCard as v, rollDice as x, makeScratch as y };
