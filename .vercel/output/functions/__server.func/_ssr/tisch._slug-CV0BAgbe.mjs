import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$1 } from "./router-D35HOleb.mjs";
import { f as SicBoView, i as DragonTigerView, r as BlackjackView, t as BaccaratView, u as RouletteView } from "./BaccaratView-CCfkyZGD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tisch._slug-CV0BAgbe.js
var import_jsx_runtime = require_jsx_runtime();
function TablePage() {
	const { slug } = Route$1.useParams();
	if (slug === "blackjack") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlackjackView, {});
	if (slug === "roulette") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouletteView, {});
	if (slug === "baccarat") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BaccaratView, {});
	if (slug === "drache-tiger") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DragonTigerView, {});
	if (slug === "sicbo") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SicBoView, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-muted",
		children: [
			"Tisch nicht gefunden.",
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
export { TablePage as component };
