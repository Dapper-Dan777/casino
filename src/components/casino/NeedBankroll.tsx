import { Button } from "@/components/ui/button";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";

export function NeedBankroll() {
  const hydrated = useCasino((s) => s.hydrated);
  const balance = useCasino((s) => s.balance);
  const grantStarter = useCasino((s) => s.grantStarter);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const starterClaimed = useCasino((s) => s.starterClaimed);

  if (!hydrated || balance > 0) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-bg/75 px-4">
      <div className="w-full max-w-sm rounded-xl border border-accent/40 bg-surface p-6 text-center">
        <p className="font-display text-2xl text-fg">Guthaben aufladen</p>
        <p className="mt-2 text-sm text-muted">
          Ohne Einsatz kein Spiel. {formatEuro(5000)} Spielgeld zum Starten oder Kasse öffnen.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {!starterClaimed ? (
            <Button
              size="lg"
              onClick={() => {
                unlockAudio();
                grantStarter();
                if (soundOn) sfx.cash();
              }}
            >
              {formatEuro(5000)} Spielgeld holen
            </Button>
          ) : null}
          <Button variant="secondary" size="lg" onClick={() => setCashier(true)}>
            Einzahlen
          </Button>
        </div>
      </div>
    </div>
  );
}
