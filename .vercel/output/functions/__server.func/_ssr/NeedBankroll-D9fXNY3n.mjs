import { c as formatEuro } from "./operator-95DAgWDt.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button, u as useCasino } from "./store-CFGtZ-Jy.mjs";
import { h as unlockAudio, u as sfx } from "./router-DWOTuxv6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NeedBankroll-D9fXNY3n.js
var import_jsx_runtime = require_jsx_runtime();
function NeedBankroll() {
	const hydrated = useCasino((s) => s.hydrated);
	const balance = useCasino((s) => s.balance);
	const grantStarter = useCasino((s) => s.grantStarter);
	const setCashier = useCasino((s) => s.setCashierOpen);
	const soundOn = useCasino((s) => s.soundOn);
	const starterClaimed = useCasino((s) => s.starterClaimed);
	if (!hydrated || balance > 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-40 flex items-center justify-center bg-bg/75 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm rounded-xl border border-accent/40 bg-surface p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-fg",
					children: "Guthaben aufladen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Ohne Einsatz kein Spiel. ",
						formatEuro(5e3),
						" Spielgeld zum Starten oder Kasse öffnen."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap justify-center gap-2",
					children: [!starterClaimed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						onClick: () => {
							unlockAudio();
							grantStarter();
							if (soundOn) sfx.cash();
						},
						children: [formatEuro(5e3), " Spielgeld holen"]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						size: "lg",
						onClick: () => setCashier(true),
						children: "Einzahlen"
					})]
				})
			]
		})
	});
}
//#endregion
export { NeedBankroll as t };
