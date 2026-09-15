import { c as formatEuro, i as MISSIONS, o as TOURNEY_POT, t as cn, v as tourneyBoard } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as useCasino, t as Button } from "./button-D768MRou.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aktionen-6AcAl990.js
var import_jsx_runtime = require_jsx_runtime();
function AktionenPage() {
	const wageredToday = useCasino((s) => s.wageredToday);
	const winsToday = useCasino((s) => s.winsToday);
	const gamesToday = useCasino((s) => s.gamesToday);
	const claimed = useCasino((s) => s.claimedMissions);
	const dailyClaimed = useCasino((s) => s.dailyClaimed);
	const claimMission = useCasino((s) => s.claimMission);
	const claimDaily = useCasino((s) => s.claimDaily);
	const tourneyBest = useCasino((s) => s.tourneyBest);
	const board = tourneyBoard(tourneyBest);
	const progress = {
		wager: wageredToday,
		wins: winsToday,
		variety: gamesToday.length,
		daily: dailyClaimed ? 1 : 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.28em] text-accent",
				children: "Heute"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Aktionen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted",
						children: "Tages-Turnier · Top-Gewinn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl tabular-nums text-[#e8c85a]",
						children: ["Preis ", formatEuro(TOURNEY_POT)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-4 space-y-2",
						children: board.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("flex items-center justify-between text-sm", row.you && "text-accent"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								i + 1,
								". ",
								row.name,
								" · ",
								row.city
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatEuro(row.cents)
							})]
						}, `${row.name}-${i}`))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Dein bester Treffer heute zählt. Nur Spielgeld."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: MISSIONS.map((m) => {
					const p = progress[m.id] ?? 0;
					const done = claimed.includes(m.id) || m.id === "daily" && dailyClaimed;
					const ready = p >= m.target && !done;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-fg",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								m.hint,
								" · ",
								Math.min(p, m.target),
								"/",
								m.target,
								" · ",
								formatEuro(m.reward)
							]
						})] }), m.id === "daily" && !dailyClaimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => claimDaily(),
							children: "Holen"
						}) : ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => claimMission(m.id),
							children: "Holen"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: done ? "Fertig" : "Offen"
						})]
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm text-accent",
				children: "Zurück zur Lobby"
			})
		]
	});
}
//#endregion
export { AktionenPage as component };
