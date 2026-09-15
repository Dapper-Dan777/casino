import { useState } from "react";
import { NeedBankroll } from "./NeedBankroll";
import { BetBar, OriginalShell, ORIGINAL_STEPS, ResultBar } from "./OriginalsChrome";
import { WinCelebration } from "./WinCelebration";
import { minesLayout, minesMultiplier } from "@/lib/casino/originals";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { winTier, type WinTier } from "@/lib/casino/slots";
import { cn } from "@/lib/utils";

const SIZE = 25;

export function MinesView() {
  const [betI, setBetI] = useState(1);
  const [mines, setMines] = useState(3);
  const [layout, setLayout] = useState<boolean[] | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>(Array(SIZE).fill(false));
  const [dead, setDead] = useState(false);
  const [cashed, setCashed] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const [pulse, setPulse] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const balance = useCasino((s) => s.balance);
  const soundOn = useCasino((s) => s.soundOn);

  const gems = revealed.filter(Boolean).length;
  const live = layout && !dead && !cashed;
  const nextMult = minesMultiplier(gems + 1, mines);

  function start() {
    unlockAudio();
    if (layout && !dead && !cashed) return;
    if (balance < bet) {
      setCashier(true);
      return;
    }
    if (!placeBet(bet, "Minen · Einsatz")) return;
    if (soundOn) sfx.click();
    setLayout(minesLayout(mines));
    setRevealed(Array(SIZE).fill(false));
    setDead(false);
    setCashed(false);
    setLast(null);
    setPulse(null);
  }

  function open(i: number) {
    if (!layout || dead || cashed || revealed[i]) return;
    unlockAudio();
    setPulse(i);
    if (layout[i]) {
      setRevealed(Array(SIZE).fill(true));
      setDead(true);
      setLast(0);
      if (soundOn) sfx.lose();
      return;
    }
    const next = revealed.slice();
    next[i] = true;
    setRevealed(next);
    if (soundOn) sfx.chip();
  }

  function cash() {
    if (!live || gems === 0) return;
    const pay = Math.round(bet * minesMultiplier(gems, mines));
    creditWin(pay, "Minen · Cashout");
    setCashed(true);
    setLast(pay);
    const tier = winTier(pay, bet);
    if (tier !== "none") setCelebrate({ payout: pay, stake: bet, tier });
    if (soundOn) sfx.win(pay >= bet * 3);
  }

  return (
    <OriginalShell title="Minen" subtitle="25 Felder · 97 % RTP · Cashout jederzeit" slug="minen">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[2, 3, 5, 8].map((n) => (
          <button
            key={n}
            type="button"
            disabled={Boolean(live)}
            onClick={() => setMines(n)}
            className={cn("h-10 rounded-md px-3 text-sm", mines === n ? "bg-accent text-accent-fg" : "bg-elevated text-muted")}
          >
            {n} Minen
          </button>
        ))}
        <span className="ml-auto text-sm tabular-nums text-accent">{live ? `${nextMult.toFixed(2)}× nächstes` : "Bereit"}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: SIZE }, (_, i) => {
          const isMine = Boolean(layout?.[i]);
          const show = revealed[i] || (dead && isMine);
          return (
            <button
              key={i}
              type="button"
              disabled={!live}
              onClick={() => open(i)}
              aria-label={show ? (isMine ? "Mine" : "Edelstein") : "Verdeckt"}
              className={cn(
                "mine-cell aspect-square rounded-lg border transition-transform duration-150 active:scale-[0.96]",
                show && isMine && "mine-cell-mine border-loss",
                show && !isMine && "mine-cell-gem border-accent",
                !show && "border-border bg-elevated hover:border-accent/50",
                pulse === i && "mine-cell-flip",
              )}
            >
              <span className="mine-cell-face">
                {show ? (
                  isMine ? (
                    <span className="mine-bomb" />
                  ) : (
                    <span className="mine-gem" />
                  )
                ) : (
                  <span className="mine-back" />
                )}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex gap-2">
        {live && gems > 0 ? (
          <button type="button" onClick={cash} className="h-12 flex-1 rounded-md bg-accent font-semibold uppercase tracking-wider text-accent-fg">
            Cashout {formatEuro(Math.round(bet * minesMultiplier(gems, mines)))}
          </button>
        ) : (
          <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={Boolean(live)} onPlay={start} label={layout ? "Neue Runde" : "Start"} />
        )}
      </div>
      <ResultBar last={last} bet={bet} />
      <NeedBankroll />
      {celebrate ? (
        <WinCelebration
          payout={celebrate.payout}
          stake={celebrate.stake}
          tier={celebrate.tier}
          soundOn={soundOn}
          onDone={() => setCelebrate(null)}
        />
      ) : null}
    </OriginalShell>
  );
}
