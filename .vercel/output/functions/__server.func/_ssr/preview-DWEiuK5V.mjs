import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D768MRou.mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as useCurrentUserState } from "./router-D35HOleb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/preview-DWEiuK5V.js
var import_jsx_runtime = require_jsx_runtime();
function PreviewPage() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-[#080b0d] px-4 text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/75",
			children: "Konto wird geladen…"
		})
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-[radial-gradient(circle_at_top,_#141b27,_#090b0d_55%)] px-4 py-8 text-white sm:px-6 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-10 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.32em] text-amber-300",
					children: "Aurelia"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-2xl font-semibold text-white",
					children: "Casino & Sport"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70",
					children: "Konto geschützt"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.3em] text-amber-300",
							children: "Willkommen"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl",
							children: "Ein echtes Konto. Ein Wallet. Ganz dein Spielerstamm."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-base text-white/70 sm:text-lg",
							children: "Verwalte dein Guthaben, Favoriten, zuletzt gespielte Titel, VIP-Status und deine Spielhistorie in einem einzigen Konto."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Jetzt anmelden"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "secondary",
								className: "rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									children: "Konto erstellen"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid gap-4 sm:grid-cols-3",
							children: [
								["Wallet", "Kontostand, Einzahlungen und Auszahlungen"],
								["Favoriten", "Deine liebsten Slots und Spiele sofort"],
								["VIP", "Rakeback, Missionsfortschritt und Status"]
							].map(([title, text]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-white/10 bg-black/20 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-[0.2em] text-amber-300",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-white/70",
									children: text
								})]
							}, title))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-[28px] border border-amber-500/25 bg-[#10151d] p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.3em] text-amber-300",
						children: "Dein Account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-4",
						children: [
							"Persönliches Login mit E-Mail & Passwort",
							"Sichere Zugangsdaten und Session-Handling",
							"Ständige Speicherung von zuletzt gespielt, Favoriten, Balance und VIP",
							"Direkt weiter zu Slots, Sport und Live-Tabellen"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[10px] font-black text-black",
								children: "✓"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/75",
								children: item
							})]
						}, item))
					})]
				})]
			})]
		})
	});
}
//#endregion
export { PreviewPage as component };
