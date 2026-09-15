import { s as cn } from "./operator-95DAgWDt.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ChipStack-pnE9up-c.js
var import_jsx_runtime = require_jsx_runtime();
function ChipStack({ n = 4, tone = "gold" }) {
	const count = Math.min(8, Math.max(1, n));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("chip-stack", `chip-${tone}`),
		"aria-hidden": true,
		children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { bottom: i * 3 } }, i))
	});
}
//#endregion
export { ChipStack as t };
