import { o as __toESM } from "../_runtime.mjs";
import { b as vipOf, c as formatEuro, g as streakReward, t as cn, u as formatTime } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as formatOdds, d as useCasino, t as Button } from "./button-D768MRou.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/konto-Bb5vXSr5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function KontoView() {
	const balance = useCasino((s) => s.balance);
	const wagered = useCasino((s) => s.wagered);
	const wageredToday = useCasino((s) => s.wageredToday);
	const totalDeposited = useCasino((s) => s.totalDeposited);
	const totalWithdrawn = useCasino((s) => s.totalWithdrawn);
	const txs = useCasino((s) => s.transactions);
	const tickets = useCasino((s) => s.sportTickets);
	const dayLimit = useCasino((s) => s.dayLimit);
	const setDayLimit = useCasino((s) => s.setDayLimit);
	const pausedUntil = useCasino((s) => s.pausedUntil);
	const pausePlay = useCasino((s) => s.pausePlay);
	const streak = useCasino((s) => s.streak);
	const sessionStarted = useCasino((s) => s.sessionStarted);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const rank = vipOf(wagered);
	const [limit, setLimit] = (0, import_react.useState)(dayLimit ? String(dayLimit / 100) : "");
	const sessionMin = Math.max(0, Math.floor((Date.now() - (sessionStarted || Date.now())) / 6e4));
	const wins = (0, import_react.useMemo)(() => txs.filter((t) => t.kind === "win").reduce((a, t) => a + t.cents, 0), [txs]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.28em] text-accent",
				children: "Konto"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Übersicht"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Guthaben",
						value: formatEuro(balance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "VIP",
						value: rank.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Umsatz",
						value: formatEuro(wagered)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Heute",
						value: formatEuro(wageredToday)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Gewinne",
						value: formatEuro(wins)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Serie",
						value: `${streak} Tage · ${formatEuro(streakReward(Math.max(1, streak)))}`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Ein ",
					formatEuro(totalDeposited),
					" · Aus ",
					formatEuro(totalWithdrawn),
					" · Session ",
					sessionMin,
					" Min"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setCashier(true),
					children: "Kasse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vip",
						children: "VIP"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "wetten",
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Wetten"
				}), tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Keine Scheine."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: tickets.slice(0, 12).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [
								t.legs.length > 1 ? `Kombi ${t.legs.length}` : t.legs[0]?.label,
								" · ",
								formatOdds(t.odds)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("tabular-nums", t.status === "won" || t.status === "cashed" ? "text-win" : t.status === "lost" ? "text-loss" : "text-muted"),
							children: t.status === "open" ? formatEuro(t.stake) : formatEuro(t.payout)
						})]
					}, t.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Verlauf"
				}), txs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Noch keine Buchungen."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: txs.slice(0, 20).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 truncate text-muted",
							children: [
								formatTime(t.at),
								" · ",
								t.label
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("tabular-nums", t.kind === "win" || t.kind === "bonus" || t.kind === "deposit" ? "text-win" : "text-fg"),
							children: [t.kind === "bet" || t.kind === "withdraw" ? "−" : "+", formatEuro(t.cents)]
						})]
					}, t.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "schutz",
				className: "space-y-4 rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Spielerschutz"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nur Spielgeld, keine Echtgeldzahlungen. 18+. Session-Hinweis nach 60 Minuten. Limits gelten in dieser Demo lokal."
					}),
					pausedUntil > Date.now() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-accent",
						children: ["Pause bis ", formatTime(pausedUntil)]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							1,
							12,
							24
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "secondary",
							onClick: () => pausePlay(h),
							children: [h, "h Pause"]
						}, h))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm",
						children: ["Tageslimit Einsatz", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: limit,
								onChange: (e) => setLimit(e.target.value),
								inputMode: "decimal",
								placeholder: "0 = aus",
								className: "h-11 flex-1 rounded-md border border-border bg-elevated px-3"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => {
									const n = Number(limit.replace(",", "."));
									setDayLimit(Number.isFinite(n) && n > 0 ? Math.round(n * 100) : 0);
								},
								children: "Setzen"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							"Aktuell ",
							dayLimit > 0 ? formatEuro(dayLimit) : "kein Limit",
							" · heute ",
							formatEuro(wageredToday)
						]
					})
				]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface px-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-wider text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl tabular-nums",
			children: value
		})]
	});
}
var SplitComponent = KontoView;
//#endregion
export { SplitComponent as component };
