import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { makeScratch } from "@/lib/casino/instant";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

export function ScratchView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [cells, setCells] = useState<number[]>(() => Array(9).fill(0));
  const [open, setOpen] = useState<boolean[]>(() => Array(9).fill(false));
  const [winX, setWinX] = useState(0);
  const [last, setLast] = useState<number | null>(null);
  const [live, setLive] = useState(false);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  function start() {
    unlockAudio();
    if (live) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Rubbellos")) return;
    const t = makeScratch();
    setCells(t.cells);
    setWinX(t.winX);
    setOpen(Array(9).fill(false));
    setLive(true);
    setLast(null);
    if (soundOn) sfx.click();
  }

  function reveal(i: number) {
    if (!live || open[i]) return;
    const next = open.slice();
    next[i] = true;
    setOpen(next);
    if (soundOn) sfx.coin();
    if (next.every(Boolean)) finish(next);
  }

  function revealAll() {
    if (!live) return;
    setOpen(Array(9).fill(true));
    finish(Array(9).fill(true));
  }

  function finish(_open: boolean[]) {
    const paid = Math.round(bet * winX);
    setLast(paid);
    setLive(false);
    if (paid > 0) {
      creditWin(paid, "Rubbellos");
      if (soundOn) sfx.win(paid >= bet * 8);
    } else if (soundOn) sfx.lose();
  }

  return (
    <OriginalShell title="Rubbellos" subtitle="3 gleiche Felder zahlen" slug="rubbellos">
      <div className="scratch-board grid grid-cols-3 gap-2">
        {cells.map((v, i) => (
          <button
            key={i}
            type="button"
            disabled={!live}
            onClick={() => reveal(i)}
            className={cn("scratch-cell", open[i] && "is-open", open[i] && v === winX && winX > 0 && "is-win")}
          >
            {open[i] ? <span className="font-display text-xl tabular-nums">{v}×</span> : <span className="text-xs uppercase tracking-wider text-[#c9a227]">Reiben</span>}
          </button>
        ))}
      </div>
      {live ? (
        <button type="button" onClick={revealAll} className="mt-3 h-11 w-full rounded-md bg-elevated text-sm">
          Alles aufdecken
        </button>
      ) : null}
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={live} onPlay={start} label={live ? "Offen" : "Los kaufen"} />
      <ResultBar last={last} bet={bet} />
    </OriginalShell>
  );
}
