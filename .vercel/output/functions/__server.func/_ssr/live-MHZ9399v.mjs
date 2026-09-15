import { o as __toESM } from "../_runtime.mjs";
import { c as formatEuro, f as liveOccupancy, r as LIVE_TABLES } from "./utils-C_uf36nf.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ChipStack } from "./ChipStack-CgLKjur8.mjs";
import { p as gameBySlug, y as unlockAudio } from "./router-D35HOleb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-MHZ9399v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LivePage() {
	const [now, setNow] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.28em] text-accent",
				children: "Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "Live"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-sm text-muted",
				children: "Croupiers, Limits, nächste Runde. Spielgeld, keine Echtgeldzahlungen."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: LIVE_TABLES.map((t) => {
				const occ = liveOccupancy(t.id, now);
				const left = 18 - Math.floor(now / 1e3 + t.id.length) % 18;
				const cover = gameBySlug(t.slug)?.image ?? "/games/live-studio.jpg";
				const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-36 overflow-hidden bg-felt",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cover,
							alt: "",
							className: "h-full w-full object-cover opacity-55"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/games/char-dealer.jpg",
							alt: "",
							className: "absolute bottom-0 right-2 h-28 object-contain object-bottom"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-3 left-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipStack, {
								n: 3 + occ % 4,
								tone: "felt"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-3 top-3 rounded-full bg-loss px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white",
							children: "Live"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute right-3 top-3 rounded-md bg-bg/80 px-2 py-0.5 text-[10px] tabular-nums",
							children: [left, "s"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs uppercase tracking-wider text-muted",
							children: [
								t.studio,
								" · ",
								t.dealer
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								formatEuro(t.min),
								" – ",
								formatEuro(t.max),
								" · ",
								occ,
								"/",
								t.seats,
								" Plätze"
							]
						})
					]
				})] });
				const cls = "group overflow-hidden rounded-lg border border-border bg-surface hover:border-accent/50";
				return t.via === "tisch" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/tisch/$slug",
					params: { slug: t.slug },
					onClick: () => unlockAudio(),
					className: cls,
					children: inner
				}, t.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/spiel/$slug",
					params: { slug: t.slug },
					onClick: () => unlockAudio(),
					className: cls,
					children: inner
				}, t.id);
			})
		})]
	});
}
//#endregion
export { LivePage as component };
