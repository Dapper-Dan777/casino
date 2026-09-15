import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { SlotDef } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";

export function Paytable({
  open,
  onOpenChange,
  def,
  stake,
  name,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  def: SlotDef;
  stake: number;
  name: string;
}) {
  const scatter = def.symbols.find((s) => s.kind === "scatter");
  const wild = def.symbols.find((s) => s.kind === "wild");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogTitle className="font-display text-2xl">{name}</DialogTitle>
        <p className="mt-1 text-sm text-muted">
          {def.mechanic === "olympus"
            ? "6×5. 8 oder mehr gleiche Symbole zahlen überall. Gewinne stürzen nach. Orbs 2×–500× addieren sich am Ende. 4 Scatter = Freispiele (Bonus bleibt der Multiplikator). 3 Scatter im Bonus = extra Spins. Ante +25 %. Bonus kaufen: 100×."
            : def.mechanic === "burst"
              ? "10 Linien, beide Richtungen. Der Stern (Wild) nur auf Walze 2–4. Landet er, füllt er die ganze Walze und die anderen drehen nach — wie Sternenblitz."
            : def.mechanic === "fish"
              ? "3 Boote starten 10 Freispiele. Im Bonus sammelt der Angler alle Fische. Mehrere Angler = extra Spins und extra Multiplikator."
            : def.mechanic === "ways" && def.tumble
            ? "243 Wege · links nach rechts · Gewinne fallen nach und erhöhen den Multiplikator."
            : def.stackedWilds
              ? "243 Wege · Wilds können ganze Walzen füllen. Nach dem Gewinn: Karte oder Leiter."
              : def.mechanic === "firelink"
                ? `${def.firelinkFrom ?? 5}× Feuer starten Fire Link. Münzen bleiben stehen, leere Felder drehen nach.`
                : def.mechanic === "sticky"
                  ? "Im Bonus bleiben Wilds eingefroren und bleiben bis zum Ende liegen."
                  : def.mechanic === "gems"
                    ? `${def.gemTarget ?? 12} Edelsteine füllen den Tresor und starten extra Freispiele.`
                    : def.mechanic === "gamble"
                      ? "Nach einem Gewinn: Risiko auf Rot oder Schwarz — verdoppeln oder alles verlieren."
                      : def.mechanic === "hold"
                        ? "3 Walzen. Nach dem ersten Dreh Walzen halten und einmal nachdrehen. Dann Risiko oder Leiter."
                        : def.paysBothWays
                          ? "10 Linien, beide Richtungen. Safe-Wild mit ×2, ×3 oder ×7. Keine Freispiele. Risiko und Gewinnleiter."
                          : def.leiter && def.bookWild
                            ? "Spiegel = Scatter + Wild. Im Bonus füllt ein Symbol die ganze Walze und zahlt auf allen Linien — auch mit Lücken, nicht nur nebeneinander. Top-Symbole ab 2, sonst ab 3. Danach Risiko oder Leiter."
                            : def.leiter && def.freeSpinCount === 0
                              ? `${def.paylines.length} Linien · 2er oft schon Gewinn · keine Freispiele · Karten-Risiko oder Gewinnleiter.`
                              : def.leiter
                                ? `${def.paylines.length} Linien. Nach jedem Gewinn: Karten-Risiko oder Gewinnleiter.`
                                : def.bookWild
                                  ? "Das Buch ist Scatter und Wild. Im Bonus füllt ein Symbol die ganze Walze und zahlt auf allen 10 Linien — auch wenn die Walzen nicht nebeneinander liegen. Bilder ab 2, Karten ab 3. 3 Bücher = 10 Freispiele, Retrigger möglich."
                                  : `${def.paylines.length} Linien · ${def.freeSpinCount} Freispiele ab ${def.freeSpinsFrom} Scatter.`}
        </p>

        <div className="pay-machine mt-4 text-sm">
          <span />
          <span className="pay-machine-head">Symbol</span>
          <span className="pay-machine-head">{def.mechanic === "olympus" ? "8–9" : "3"}</span>
          <span className="pay-machine-head">{def.mechanic === "olympus" ? "10–11" : "4"}</span>
          <span className="pay-machine-head">{def.mechanic === "olympus" ? "12+" : "5"}</span>
          <span className="pay-machine-head">2</span>
          {def.symbols
            .filter((s) => s.kind !== "scatter")
            .map((s) => (
              <PayRow
                key={s.id}
                art={s.art}
                label={s.label}
                pays={s.pays}
                pays2={s.pays2}
                stake={stake}
              />
            ))}
        </div>

        {scatter && def.mechanic === "olympus" ? (
          <p className="mt-4 text-sm text-muted">
            Scatter: 4 / 5 / 6 = {formatEuro(Math.round(stake * 3))} / {formatEuro(Math.round(stake * 5))} /{" "}
            {formatEuro(Math.round(stake * 100))} plus Freispiele. Im Bonus 3× = extra Spins. Orbs 2×–500×.
          </p>
        ) : scatter && def.freeSpinsFrom <= 6 ? (
          <p className="mt-4 text-sm text-muted">
            {scatter.label}: 3 / 4 / 5 = {formatEuro(Math.round(stake * scatter.pays[0]))} /{" "}
            {formatEuro(Math.round(stake * scatter.pays[1]))} / {formatEuro(Math.round(stake * scatter.pays[2]))}
            {" · "}
            {def.freeSpinsFrom}× = {def.freeSpinCount} Freispiele
            {def.fsMultiplier > 1 ? ` · Bonus ×${def.fsMultiplier}` : ""}.
          </p>
        ) : null}
        {wild ? (
          <p className="mt-1 text-sm text-muted">
            {wild.label} ersetzt jedes Symbol
            {def.bookWild ? " und ist Scatter." : " außer Scatter."}
            {def.wildMults ? ` Auf dem Safe steht ×${def.wildMults.join(", ×")} — Multiplikatoren multiplizieren sich.` : ""}
            {def.stackedWilds ? " Wilds können eine ganze Walze füllen." : ""}
          </p>
        ) : (
          <p className="mt-1 text-sm text-muted">Kein Wild. Klassische Frucht-Auszahlung, oft schon ab 2 Symbolen.</p>
        )}
        {def.expandingSpecial ? (
          <p className="mt-2 text-sm text-muted">
            Freispiele: Das Sondersymbol füllt die Walze und zahlt den Tabellenwert auf allen {def.paylines.length}{" "}
            Linien — auch wenn die Treffer nicht nebeneinander stehen. Bilder oft schon ab 2, Karten ab 3.
          </p>
        ) : null}
        {def.leiter ? (
          <p className="mt-2 text-sm text-muted">
            Risiko: Karten (Rot/Schwarz) oder Gewinnleiter. Die Leiter läuft langsam zwischen der nächsten Stufe und 0,00 — Aufspielen hält das Licht, wie in der Halle. Teilen sichert die Hälfte.
          </p>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function PayRow({
  art,
  label,
  pays,
  pays2,
  stake,
}: {
  art?: string;
  label: string;
  pays: readonly [number, number, number];
  pays2?: number;
  stake: number;
  anywhere?: boolean;
}) {
  return (
    <>
      <span className="size-10 overflow-hidden rounded-sm">
        {art ? (
          <img src={art} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="block h-full w-full bg-elevated" />
        )}
      </span>
      <span className="truncate text-fg">{label}</span>
      <span className="tabular-nums text-xs text-muted">{formatEuro(Math.round(stake * pays[0]))}</span>
      <span className="tabular-nums text-xs text-muted">{formatEuro(Math.round(stake * pays[1]))}</span>
      <span className="tabular-nums text-xs text-muted">{formatEuro(Math.round(stake * pays[2]))}</span>
      <span className="tabular-nums text-xs text-muted">{pays2 ? formatEuro(Math.round(stake * pays2)) : "—"}</span>
    </>
  );
}
