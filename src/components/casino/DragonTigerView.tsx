import { useState } from "react";
import { TableShell } from "./TableShell";
import { PlayingCardFace } from "./PlayingCard";
import { ChipStack } from "./ChipStack";
import { dealDragonTiger, dtPay, type DtSide } from "@/lib/casino/instant";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { ORIGINAL_STEPS } from "./OriginalsChrome";
import { cn } from "@/lib/utils";

const SIDES: { id: DtSide; label: string; hint: string }[] = [
  { id: "dragon", label: "Drache", hint: "1:1" },
  { id: "tie", label: "Unentschieden", hint: "8:1" },
  { id: "tiger", label: "Tiger", hint: "1:1" },
];

export function DragonTigerView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [side, setSide] = useState<DtSide>("dragon");
  const [busy, setBusy] = useState(false);
  const [deal, setDeal] = useState<ReturnType<typeof dealDragonTiger> | null>(null);
  const [last, setLast] = useState<number | null>(null);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  async function play() {
    unlockAudio();
    if (busy) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Drache & Tiger")) return;
    setBusy(true);
    setDeal(null);
    if (soundOn) sfx.spin();
    await new Promise((r) => setTimeout(r, 420));
    const d = dealDragonTiger();
    setDeal(d);
    const paid = dtPay(side, d.winner, bet);
    setLast(paid);
    if (paid > 0) {
      creditWin(paid, "Drache & Tiger");
      if (soundOn) sfx.win(paid >= bet * 4);
    } else if (soundOn) sfx.lose();
    setBusy(false);
  }

  return (
    <TableShell title="Drache & Tiger" subtitle="Eine Karte · Höhere gewinnt · Unentschieden 8:1" slug="drache-tiger" felt="bacc">
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#e8c85a]">Drache</p>
          {deal ? <PlayingCardFace card={deal.dragon} size="table" /> : <div className="mx-auto h-36 w-24 rounded-md bg-elevated/80" />}
          <div className="mt-3 flex justify-center">
            <ChipStack n={side === "dragon" ? 5 : 2} tone="gold" />
          </div>
        </div>
        <div className="text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-[#d0d8e0]">Tiger</p>
          {deal ? <PlayingCardFace card={deal.tiger} size="table" /> : <div className="mx-auto h-36 w-24 rounded-md bg-elevated/80" />}
          <div className="mt-3 flex justify-center">
            <ChipStack n={side === "tiger" ? 5 : 2} tone="ice" />
          </div>
        </div>
      </div>
      {deal ? (
        <p className="mt-4 text-center font-display text-2xl">
          {deal.winner === "tie" ? "Unentschieden" : deal.winner === "dragon" ? "Drache" : "Tiger"}
        </p>
      ) : null}
      <div className="mt-6 grid grid-cols-3 gap-2">
        {SIDES.map((s) => (
          <button
            key={s.id}
            type="button"
            disabled={busy}
            onClick={() => setSide(s.id)}
            className={cn(
              "rounded-md px-2 py-3 text-sm",
              side === s.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
            )}
          >
            <span className="block font-semibold">{s.label}</span>
            <span className="text-[10px] uppercase tracking-wider">{s.hint}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <select
          className="h-11 rounded-md border border-border bg-elevated px-3 text-sm"
          value={betI}
          onChange={(e) => setBetI(Number(e.target.value))}
          disabled={busy}
        >
          {ORIGINAL_STEPS.map((c, i) => (
            <option key={c} value={i}>
              {formatEuro(c)}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy || balance < bet}
          onClick={() => void play()}
          className="h-12 min-w-36 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40"
        >
          {busy ? "…" : "Geben"}
        </button>
      </div>
      {last != null ? (
        <p className={cn("mt-3 text-center text-sm tabular-nums", last > 0 ? "text-win" : "text-loss")}>{formatEuro(last)}</p>
      ) : null}
    </TableShell>
  );
}
