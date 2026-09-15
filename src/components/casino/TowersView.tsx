import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { randInt } from "@/lib/casino/rng";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

const ROWS = 6;
const MULTIPLIERS = [1.35, 1.8, 2.55, 3.7, 5.6, 8.5];

export function TowersView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [row, setRow] = useState(0);
  const [mine, setMine] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [last, setLast] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [inRound, setInRound] = useState(false);
  const [message, setMessage] = useState("Wähle ein Feld und steige höher");
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const active = inRound && row < ROWS && mine == null;

  function start() {
    if (busy || active) return;
    if (balance < bet) { setCashier(true); return; }
    if (!placeBet(bet, "Towers")) return;
    setRow(0);
    setMine(null);
    setOpen(null);
    setLast(null);
    setInRound(true);
    setMessage("Erste Ebene · sicher oder Risiko?");
  }

  async function pick(column: number) {
    if (busy || !active) return;
    setBusy(true);
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    const trap = randInt(3);
    setOpen(column);
    if (column === trap) {
      setMine(column);
      setLast(0);
      setMessage("Treffer · der Lauf ist vorbei");
      if (soundOn) sfx.lose();
    } else {
      const next = row + 1;
      const paid = Math.round(bet * (MULTIPLIERS[row] ?? MULTIPLIERS.at(-1)!));
      setLast(paid);
      setRow(next);
      setMessage(next >= ROWS ? "Turm geschafft · Gewinn gesichert" : `Ebene ${next + 1} · Cashout jederzeit`);
      if (next >= ROWS) creditWin(paid, "Towers");
      if (soundOn) sfx.win(next >= ROWS);
    }
    setBusy(false);
  }

  function cashout() {
    if (!active || row === 0) return;
    const paid = Math.round(bet * (MULTIPLIERS[row - 1] ?? 1));
    creditWin(paid, "Towers · Cashout");
    setLast(paid);
    setMine(-1);
    setInRound(false);
    setMessage("Cashout gesichert");
  }

  return (
    <OriginalShell title="Towers" subtitle="Sichere Felder · Cashout jederzeit · steigende Multiplikatoren" slug="towers">
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-wider text-muted"><span>Ebene {Math.min(row + 1, ROWS)} / {ROWS}</span><span>{row > 0 ? `${(MULTIPLIERS[row - 1] ?? 1).toFixed(2)}×` : "Start"}</span></div>
        <div className="grid gap-2">
          {Array.from({ length: ROWS }, (_, i) => {
            const level = ROWS - i - 1;
            return <div key={level} className={cn("grid grid-cols-3 gap-2", level < row && "opacity-50")}>{[0, 1, 2].map((column) => <button key={column} type="button" disabled={!active || level !== row || busy} onClick={() => void pick(column)} className={cn("h-12 rounded-md border border-border bg-elevated text-sm font-semibold transition", level === row && active ? "hover:border-accent hover:bg-accent/10" : "cursor-default", level === row && open === column && mine === column && "border-loss bg-loss/20 text-loss")}>{level === row && open === column && mine === column ? "Mine" : level < row ? "✓" : "?"}</button>)}</div>;
          })}
        </div>
        <p className="mt-4 text-center text-sm text-muted">{message}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="button" disabled={active || busy} onClick={start} className="h-12 flex-1 rounded-md bg-accent text-sm font-semibold text-accent-fg disabled:opacity-40">{mine === -1 ? "Neue Runde" : "Runde starten"}</button>
        <button type="button" disabled={!active || row === 0 || busy} onClick={cashout} className="h-12 rounded-md border border-border bg-elevated px-4 text-sm font-semibold disabled:opacity-40">Cashout</button>
      </div>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy || active} onPlay={start} label="Einsatz setzen" />
      <ResultBar last={last} bet={bet} />
      <p className="mt-3 text-center text-xs text-muted">Jede Ebene hat ein Risiko. Du kannst nach jedem Treffer auszahlen.</p>
    </OriginalShell>
  );
}
