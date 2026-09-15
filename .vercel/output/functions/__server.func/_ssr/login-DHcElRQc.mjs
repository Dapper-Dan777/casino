import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D768MRou.mjs";
import { d as authClient, f as signIn, l as GROK_PROVIDERS } from "./router-D35HOleb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DHcElRQc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const [mode, setMode] = (0, import_react.useState)("login");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	async function submit() {
		setLoading(true);
		setError(null);
		try {
			if (mode === "signup") {
				const res = await authClient.signUp.email({
					name: name.trim() || "Player",
					email,
					password
				});
				if (res.error) throw new Error(res.error.message || "Registrierung fehlgeschlagen.");
			}
			const res = await authClient.signIn.email({
				email,
				password,
				rememberMe: true
			});
			if (res.error) throw new Error(res.error.message || "Anmeldung fehlgeschlagen.");
			window.location.href = "/";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Es ist ein Fehler aufgetreten.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-screen place-items-center bg-[#0b0d10] px-4 py-10 text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.24em] text-amber-300",
						children: "Aurelia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl",
						children: "Konto"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-black/20 p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("login"),
						className: mode === "login" ? "rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-black" : "rounded-md px-3 py-2 text-sm text-white/70",
						children: "Anmelden"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode("signup"),
						className: mode === "signup" ? "rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-black" : "rounded-md px-3 py-2 text-sm text-white/70",
						children: "Registrieren"
					})]
				}),
				mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-sm text-white/70",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						className: "w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none ring-0 placeholder:text-white/30",
						placeholder: "Dein Name"
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-sm text-white/70",
						children: "E-Mail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: email,
						onChange: (e) => setEmail(e.target.value),
						className: "w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none ring-0 placeholder:text-white/30",
						placeholder: "du@email.de"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mb-5 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-sm text-white/70",
						children: "Passwort"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						value: password,
						onChange: (e) => setPassword(e.target.value),
						className: "w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none ring-0 placeholder:text-white/30",
						placeholder: "Mindestens 8 Zeichen"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-red-400",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "w-full",
					onClick: () => void submit(),
					disabled: loading,
					children: loading ? mode === "signup" ? "Registriere…" : "Anmelden…" : mode === "signup" ? "Konto erstellen" : "Einloggen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/35",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-white/10" }),
						"oder",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-white/10" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void signIn(provider.providerId, { callbackURL: "/" }),
						className: "w-full cursor-pointer rounded-md border border-white/10 bg-black/20 px-4 py-2 text-sm text-white hover:bg-white/5",
						children: [
							"Mit ",
							provider.label,
							" anmelden"
						]
					}, provider.providerId))
				})
			]
		})
	});
}
//#endregion
export { Login as component };
