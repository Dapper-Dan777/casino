import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { authClient, authEnabled, GROK_PROVIDERS, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!authEnabled) {
      setError("Account login is currently disabled.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        const res = await authClient.signUp.email({
          name: name.trim() || "Player",
          email,
          password,
        });

        if (res.error) {
          throw new Error(res.error.message || "Registrierung fehlgeschlagen.");
        }
      }

      const res = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (res.error) {
        throw new Error(res.error.message || "Anmeldung fehlgeschlagen.");
      }

      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Es ist ein Fehler aufgetreten.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0d10] px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-amber-300">Aurelia</p>
          <h1 className="mt-2 font-display text-3xl">Konto</h1>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-black/20 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={mode === "login" ? "rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-black" : "rounded-md px-3 py-2 text-sm text-white/70"}
          >
            Anmelden
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={mode === "signup" ? "rounded-md bg-amber-400 px-3 py-2 text-sm font-medium text-black" : "rounded-md px-3 py-2 text-sm text-white/70"}
          >
            Registrieren
          </button>
        </div>

        {mode === "signup" ? (
          <label className="mb-4 block">
            <span className="mb-2 block text-sm text-white/70">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none ring-0 placeholder:text-white/30"
              placeholder="Dein Name"
            />
          </label>
        ) : null}

        <label className="mb-4 block">
          <span className="mb-2 block text-sm text-white/70">E-Mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none ring-0 placeholder:text-white/30"
            placeholder="du@email.de"
          />
        </label>

        <label className="mb-5 block">
          <span className="mb-2 block text-sm text-white/70">Passwort</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 outline-none ring-0 placeholder:text-white/30"
            placeholder="Mindestens 8 Zeichen"
          />
        </label>

        {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}

        <Button
          type="button"
          className="w-full"
          onClick={() => void submit()}
          disabled={loading}
        >
          {loading ? (mode === "signup" ? "Registriere…" : "Anmelden…") : mode === "signup" ? "Konto erstellen" : "Einloggen"}
        </Button>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/35">
          <span className="h-px flex-1 bg-white/10" />
          oder
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="space-y-2">
          {GROK_PROVIDERS.map((provider) => (
            <button
              key={provider.providerId}
              type="button"
              onClick={() => void signIn(provider.providerId, { callbackURL: "/" })}
              className="w-full cursor-pointer rounded-md border border-white/10 bg-black/20 px-4 py-2 text-sm text-white hover:bg-white/5"
            >
              Mit {provider.label} anmelden
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
