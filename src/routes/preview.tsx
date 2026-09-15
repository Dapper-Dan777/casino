import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/preview")({ component: PreviewPage });

function PreviewPage() {
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#080b0d] px-4 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/75">
          Konto wird geladen…
        </div>
      </main>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#141b27,_#090b0d_55%)] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-amber-300">Aurelia</p>
            <h1 className="mt-2 text-2xl font-semibold text-white">Casino & Sport</h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            Konto geschützt
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Willkommen</p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Ein echtes Konto. Ein Wallet. Ganz dein Spielerstamm.
            </h2>
            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              Verwalte dein Guthaben, Favoriten, zuletzt gespielte Titel, VIP-Status und deine Spielhistorie in einem einzigen Konto.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-300">
                <Link to="/login">Jetzt anmelden</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/5">
                <Link to="/login">Konto erstellen</Link>
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Wallet", "Kontostand, Einzahlungen und Auszahlungen"],
                ["Favoriten", "Deine liebsten Slots und Spiele sofort"],
                ["VIP", "Rakeback, Missionsfortschritt und Status"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">{title}</p>
                  <p className="mt-2 text-sm text-white/70">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-amber-500/25 bg-[#10151d] p-6 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Dein Account</p>
            <div className="mt-5 space-y-4">
              {[
                "Persönliches Login mit E-Mail & Passwort",
                "Sichere Zugangsdaten und Session-Handling",
                "Ständige Speicherung von zuletzt gespielt, Favoriten, Balance und VIP",
                "Direkt weiter zu Slots, Sport und Live-Tabellen",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 p-3">
                  <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-amber-400 text-[10px] font-black text-black">
                    ✓
                  </div>
                  <p className="text-sm text-white/75">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
