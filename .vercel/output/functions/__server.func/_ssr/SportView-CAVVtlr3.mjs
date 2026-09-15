import { o as __toESM } from "../_runtime.mjs";
import { c as formatEuro, t as cn } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as formatOdds, d as useCasino, i as comboOdds, l as sportBoard, n as LEAGUE_TABS, o as pickLabel, r as cashoutValue, u as sportClock } from "./button-D768MRou.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChevronLeft, n as X } from "../_libs/lucide-react.mjs";
import { m as sfx, y as unlockAudio } from "./router-D35HOleb.mjs";
import { t as NeedBankroll } from "./NeedBankroll-bIUrzrIg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SportView-CAVVtlr3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAKES = [
	100,
	200,
	500,
	1e3,
	2500,
	5e3
];
function SportView() {
	const [now, setNow] = (0, import_react.useState)(0);
	const [tab, setTab] = (0, import_react.useState)("all");
	const [slip, setSlip] = (0, import_react.useState)([]);
	const [stakeI, setStakeI] = (0, import_react.useState)(2);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const stake = STAKES[stakeI] ?? 500;
	const placeSport = useCasino((s) => s.placeSport);
	const settleSports = useCasino((s) => s.settleSports);
	const cashoutSport = useCasino((s) => s.cashoutSport);
	const tickets = useCasino((s) => s.sportTickets);
	const balance = useCasino((s) => s.balance);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const touchGame = useCasino((s) => s.touchGame);
	const soundOn = useCasino((s) => s.soundOn);
	(0, import_react.useEffect)(() => {
		touchGame("sport");
	}, [touchGame]);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => {
			const t = Date.now();
			setNow(t);
			settleSports(t);
		}, 1e3);
		return () => window.clearInterval(id);
	}, [settleSports]);
	const events = (0, import_react.useMemo)(() => now ? sportBoard(now) : [], [now]);
	const shown = events.filter((e) => {
		if (tab === "all") return true;
		if (tab === "live") return sportClock(e, now).phase === "live" || e.league === "live";
		return e.league === tab;
	});
	const liveN = events.filter((e) => sportClock(e, now).phase === "live").length;
	const odds = comboOdds(slip);
	const potential = slip.length ? Math.round(stake * odds) : 0;
	function addLeg(ev, pick, price) {
		unlockAudio();
		setSlip((prev) => {
			return [...prev.filter((l) => l.eventId !== ev.id), {
				eventId: ev.id,
				label: `${ev.home} – ${ev.away} · ${pickLabel(ev, pick)}`,
				pick,
				odds: price
			}].slice(0, 8);
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] sm:-mx-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 neon-mesh opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-6xl px-4 pb-28 pt-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex size-11 items-center justify-center rounded-md text-fg/80",
							"aria-label": "Lobby",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-3xl text-fg",
								children: "Wettstudio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-accent",
								children: [liveN, " Live · Kombi · Cashout · nur Spielgeld"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 flex gap-2 overflow-x-auto pb-1",
						children: LEAGUE_TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setTab(t.id),
							className: cn("h-10 shrink-0 rounded-md px-3 text-sm", tab === t.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
							children: [t.label, t.id === "live" ? ` ${liveN}` : ""]
						}, t.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[1fr_18rem]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: shown.map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchRow, {
								ev,
								now,
								slip,
								onPick: addLeg
							}, ev.id))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "lg:sticky lg:top-24 h-fit space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-surface p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs uppercase tracking-[0.22em] text-muted",
											children: "Schein"
										}), slip.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-xs text-muted",
											onClick: () => setSlip([]),
											children: "Leeren"
										}) : null]
									}),
									slip.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Quote antippen."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-2",
										children: slip.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start justify-between gap-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block truncate text-fg",
													children: l.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular-nums text-accent",
													children: formatOdds(l.odds)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "Entfernen",
												onClick: () => setSlip((p) => p.filter((x) => x.eventId !== l.eventId)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 text-muted" })
											})]
										}, l.eventId))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm text-muted",
										children: [
											slip.length > 1 ? `Kombi ${slip.length}` : "Einzel",
											" · ",
											formatOdds(odds || 1)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 flex flex-wrap gap-1",
										children: STAKES.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setStakeI(i),
											className: cn("h-9 rounded-md px-2 text-xs tabular-nums", i === stakeI ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
											children: formatEuro(v)
										}, v))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-sm",
										children: [
											"Quote ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums text-fg",
												children: formatOdds(odds || 1)
											}),
											" · ",
											"Gewinn ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular-nums text-win",
												children: formatEuro(potential)
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !slip.length || balance < stake,
										onClick: place,
										className: "mt-3 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40",
										children: "Schein setzen"
									}),
									msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted",
										children: msg
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-surface p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-3 text-xs uppercase tracking-[0.22em] text-muted",
									children: "Meine Scheine"
								}), tickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Noch keine Wetten."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: tickets.slice(0, 8).map((t) => {
										const cash = t.status === "open" ? cashoutValue(t, events, now) : 0;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-fg",
													children: t.legs.length > 1 ? `Kombi ${t.legs.length}` : t.legs[0]?.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-xs text-muted",
													children: [
														formatEuro(t.stake),
														" · ",
														formatOdds(t.odds),
														" ·",
														" ",
														t.status === "open" ? "offen" : t.status === "won" ? "gewonnen" : t.status === "cashed" ? "cashout" : "verloren",
														t.payout > 0 ? ` · ${formatEuro(t.payout)}` : ""
													]
												}),
												cash > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													className: "mt-1 text-xs text-accent",
													onClick: () => {
														unlockAudio();
														cashoutSport(t.id);
														if (soundOn) sfx.cash();
													},
													children: ["Cashout ", formatEuro(cash)]
												}) : null
											]
										}, t.id);
									})
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedBankroll, {})
		]
	});
}
function MatchRow({ ev, now, slip, onPick }) {
	const clock = sportClock(ev, now);
	const selected = slip.find((l) => l.eventId === ev.id);
	const locked = clock.phase === "ft";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-surface p-3 sm:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ev.leagueName }), clock.phase === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-loss",
					children: [
						"Live ",
						clock.minute,
						"' · ",
						clock.home,
						":",
						clock.away
					]
				}) : clock.phase === "ft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Ende ",
					clock.home,
					":",
					clock.away
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: new Date(ev.kickoff).toLocaleTimeString("de-DE", {
						hour: "2-digit",
						minute: "2-digit"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-lg leading-tight",
				children: [
					ev.home,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "–"
					}),
					" ",
					ev.away
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBtn, {
						label: "1",
						price: ev.odds.home,
						active: selected?.pick === "1",
						disabled: locked,
						onClick: () => onPick(ev, "1", ev.odds.home)
					}),
					ev.odds.draw != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBtn, {
						label: "X",
						price: ev.odds.draw,
						active: selected?.pick === "X",
						disabled: locked,
						onClick: () => onPick(ev, "X", ev.odds.draw)
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBtn, {
						label: "2",
						price: ev.odds.away,
						active: selected?.pick === "2",
						disabled: locked,
						onClick: () => onPick(ev, "2", ev.odds.away)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1.5 grid grid-cols-2 gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBtn, {
					label: `Über ${ev.line}`,
					price: ev.over,
					active: selected?.pick === "over",
					disabled: locked,
					onClick: () => onPick(ev, "over", ev.over)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsBtn, {
					label: `Unter ${ev.line}`,
					price: ev.under,
					active: selected?.pick === "under",
					disabled: locked,
					onClick: () => onPick(ev, "under", ev.under)
				})]
			})
		]
	});
}
function OddsBtn({ label, price, active, disabled, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick,
		className: cn("flex h-11 items-center justify-between rounded-md px-2 text-sm", active ? "bg-accent text-accent-fg" : "bg-elevated text-fg hover:bg-elevated/80", disabled && "opacity-40"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs uppercase tracking-wider opacity-80",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums",
			children: formatOdds(price)
		})]
	});
}
//#endregion
export { SportView as t };
