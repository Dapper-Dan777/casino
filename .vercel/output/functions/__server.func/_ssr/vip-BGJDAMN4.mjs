import { b as vipOf, c as formatEuro, h as rakebackDue, s as VIP_RANKS, y as vipNext } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { d as useCasino, t as Button } from "./button-D768MRou.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vip-BGJDAMN4.js
var import_jsx_runtime = require_jsx_runtime();
function VipPage() {
	const wagered = useCasino((s) => s.wagered);
	const taken = useCasino((s) => s.rakebackTaken);
	const claimRakeback = useCasino((s) => s.claimRakeback);
	const rank = vipOf(wagered);
	const next = vipNext(wagered);
	const due = rakebackDue(wagered, taken);
	const progress = next ? 1 - next.left / Math.max(1, (VIP_RANKS.find((r) => r.name === next.name)?.from ?? 1) - rank.from) : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.28em] text-accent",
				children: "Aurelia Club"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-4xl",
				children: ["VIP ", rank.name]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted",
				children: [
					"Umsatz ",
					formatEuro(wagered),
					" · Rakeback ",
					(rank.rakeback * 100).toFixed(0),
					" % als Spielgeld"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 overflow-hidden rounded-full bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-accent",
					style: { width: `${Math.round(Math.min(1, Math.max(0, progress)) * 100)}%` }
				})
			}),
			next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Noch ",
					formatEuro(next.left),
					" bis ",
					next.name
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-accent",
				children: "Höchste Stufe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted",
					children: "Rakeback bereit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tabular-nums",
					children: formatEuro(due)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					disabled: due <= 0,
					onClick: () => claimRakeback(),
					children: "Holen"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: VIP_RANKS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: r.id === rank.id ? "text-accent" : "text-fg",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm text-muted",
						children: [
							"ab ",
							formatEuro(r.from),
							" · ",
							(r.rakeback * 100).toFixed(0),
							" %"
						]
					})]
				}, r.id))
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
export { VipPage as component };
