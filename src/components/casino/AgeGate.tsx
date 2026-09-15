import { useRef } from "react";
import { useCasino } from "@/lib/casino/store";
import { unlockAudio } from "@/lib/casino/audio";

const AGE_FLAG = "aurelia-18";

export function AgeGate({ onPassed }: { onPassed: () => void }) {
  const verifyAge = useCasino((s) => s.verifyAge);
  const grantStarter = useCasino((s) => s.grantStarter);
  const once = useRef(false);

  function confirm() {
    if (once.current) return;
    once.current = true;
    onPassed();
    verifyAge();
    grantStarter();
    try {
      sessionStorage.setItem(AGE_FLAG, "1");
    } catch {
      /* private mode */
    }
    unlockAudio();
  }

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-bg px-5 pb-32 pt-20"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
      onPointerDown={confirm}
    >
      <div className="pointer-events-none absolute inset-0 neon-mesh opacity-40" />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-accent/30 bg-surface p-8">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">Aurelia Network</p>
        <h1 id="age-title" className="mt-3 font-display text-4xl text-fg">
          18+ Democasino
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Nur für Personen ab 18 Jahren. Einsätze in Euro, ausschließlich Spielgeld — keine echten
          Zahlungen, keine Auszahlungen auf Bankkonten.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            className="relative z-10 flex h-14 w-full items-center justify-center rounded-md bg-accent text-base font-semibold uppercase tracking-wider text-accent-fg"
            style={{ touchAction: "manipulation" }}
            onPointerDown={(e) => {
              e.stopPropagation();
              confirm();
            }}
            onClick={(e) => {
              e.stopPropagation();
              confirm();
            }}
          >
            Ich bin 18 oder älter
          </button>
          <p className="text-center text-xs text-subtle">Tippe irgendwo, um fortzufahren. Verantwortungsvoll spielen.</p>
        </div>
      </div>
    </div>
  );
}
