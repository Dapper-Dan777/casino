import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { AgeGate } from "./AgeGate";
import { CashierDialog } from "./CashierDialog";
import { SupportDock } from "./SupportDock";
import { WinTicker } from "./Lobby";
import { rehydrateCasino, useCasino } from "@/lib/casino/store";
import { unlockAudio } from "@/lib/casino/audio";
import { formatEuro, formatTime } from "@/lib/casino/format";

const AGE_FLAG = "aurelia-18";

export function CasinoShell({ children }: { children: ReactNode }) {
  const ageVerified = useCasino((s) => s.ageVerified);
  const drop = useCasino((s) => s.drop);
  const clearDrop = useCasino((s) => s.clearDrop);
  const tickJackpot = useCasino((s) => s.tickJackpot);
  const settleSports = useCasino((s) => s.settleSports);
  const pausedUntil = useCasino((s) => s.pausedUntil);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(AGE_FLAG) === "1") setPassed(true);
    } catch {
      /* ignore */
    }
    rehydrateCasino();
  }, []);

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") unlockAudio();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      tickJackpot();
      settleSports();
    }, 900);
    return () => window.clearInterval(id);
  }, [tickJackpot, settleSports]);

  useEffect(() => {
    if (!drop) return;
    const t = window.setTimeout(() => clearDrop(), 4200);
    return () => window.clearTimeout(t);
  }, [drop, clearDrop]);

  const showGate = !ageVerified && !passed;
  const paused = pausedUntil > Date.now();

  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 neon-mesh opacity-50" />
      {showGate ? <AgeGate onPassed={() => setPassed(true)} /> : null}
      <Header />
      {paused ? (
        <div className="relative z-10 border-b border-loss/40 bg-loss/15 px-4 py-2 text-center text-sm">
          Pause aktiv bis {formatTime(pausedUntil)} · unter Konto aufheben durch Ablauf
        </div>
      ) : null}
      <main className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8">{children}</main>
      {drop ? (
        <div className="fixed bottom-14 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-[#e8c85a]/50 bg-surface px-5 py-3 text-center shadow-2xl">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#e8c85a]">Prize Drop</p>
          <p className="font-display text-2xl tabular-nums">{formatEuro(drop.cents)}</p>
        </div>
      ) : null}
      <WinTicker />
      <SupportDock />
      <footer className="relative border-t border-border px-4 py-8 text-xs text-subtle">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6">
          <div>
            <p className="font-display text-lg text-fg">Aurelia Network</p>
            <p className="mt-1">Nur Spielgeld · 18+ · Keine Echtgeldzahlungen · Session nur zur Demo</p>
          </div>
          <nav className="flex flex-wrap gap-4">
            <Link to="/sport" className="hover:text-fg">
              Sport
            </Link>
            <Link to="/live" className="hover:text-fg">
              Live
            </Link>
            <Link to="/vip" className="hover:text-fg">
              VIP
            </Link>
            <Link to="/konto" className="hover:text-fg">
              Konto
            </Link>
            <a href="/konto#schutz" className="hover:text-fg">
              Spielerschutz
            </a>
          </nav>
        </div>
      </footer>
      <CashierDialog />
    </div>
  );
}
