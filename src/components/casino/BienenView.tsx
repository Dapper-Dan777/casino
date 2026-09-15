import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { WinCelebration } from "./WinCelebration";
import { dropCluster, findClusters, spinCluster, type ClusterCell } from "@/lib/casino/cluster";
import { winTier, type WinTier } from "@/lib/casino/slots";
import { formatEuro } from "@/lib/casino/format";
import { sfx, startBed, stopBed, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";
import { ChevronLeft, Minus, Plus } from "lucide-react";

const STEPS = [20, 50, 100, 200, 500, 1000, 2500];

export function BienenView() {
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);
  const [betI, setBetI] = useState(2);
  const bet = STEPS[betI] ?? 100;
  const [grid, setGrid] = useState<ClusterCell[][]>(spinCluster);
  const [busy, setBusy] = useState(false);
  const [hit, setHit] = useState<Set<string>>(new Set());
  const [paid, setPaid] = useState(0);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const lock = useRef(false);

  useEffect(() => {
    touchGame("bienenrausch");
    startBed(140);
    return () => stopBed();
  }, [touchGame]);

  const run = useCallback(async () => {
    if (lock.current) return;
    unlockAudio();
    if (!placeBet(bet, "Bienenrausch")) {
      setCashier(true);
      return;
    }
    lock.current = true;
    setBusy(true);
    setPaid(0);
    if (soundOn) sfx.spin();
    let g = spinCluster();
    setGrid(g);
    await new Promise((r) => setTimeout(r, 220));
    let total = 0;
    for (let i = 0; i < 8; i++) {
      const clusters = findClusters(g);
      if (!clusters.length) break;
      const keys = new Set(clusters.flatMap((c) => c.cells));
      setHit(keys);
      const add = clusters.reduce((s, c) => s + Math.round(bet * c.pay), 0);
      total += add;
      setPaid(total);
      if (soundOn) sfx.explode();
      await new Promise((r) => setTimeout(r, 420));
      g = dropCluster(g, keys);
      setHit(new Set());
      setGrid(g);
      if (soundOn) sfx.tumble();
      await new Promise((r) => setTimeout(r, 240));
    }
    if (total > 0) {
      creditWin(total, "Bienenrausch");
      const tier = winTier(total, bet);
      if (tier === "big" || tier === "mega" || tier === "epic") setCelebrate({ payout: total, stake: bet, tier });
      if (soundOn) sfx.win(total >= bet * 8);
    } else if (soundOn) sfx.lose();
    lock.current = false;
    setBusy(false);
  }, [bet, creditWin, placeBet, setCashier, soundOn]);

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6">
      <img src="/games/bienenrausch.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-[#140c04]/80" />
      <div className="relative z-20 mx-auto max-w-[28rem] px-3 pb-10 pt-2">
        <div className="mb-2 flex items-center gap-2">
          <Link to="/" className="inline-flex size-11 items-center justify-center text-fg/80" aria-label="Lobby">
            <ChevronLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#e8c85a]">7×7 · Cluster ab 5</p>
            <h1 className="font-display text-3xl">Bienenrausch</h1>
          </div>
          <span className="w-11" />
        </div>
        <div className="honey-board">
          <div className="grid grid-cols-7 gap-1">
            {grid.flatMap((row, r) =>
              row.map((cell, c) => {
                const key = `${r}-${c}`;
                const on = hit.has(key);
                return (
                  <div
                    key={key}
                    className={cn("honey-cell", on && "is-hit")}
                    style={{ background: cell.fill }}
                    title={cell.id}
                  />
                );
              }),
            )}
          </div>
        </div>
        <p className="mt-3 min-h-6 text-center text-sm text-[#e8c85a]">{paid ? formatEuro(paid) : "5 gleiche Nachbarn zahlen · Tumble"}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center rounded-md border border-[#e8c85a]/30 bg-bg/70">
            <button type="button" className="size-11" disabled={busy || betI === 0} onClick={() => setBetI((i) => Math.max(0, i - 1))} aria-label="Einsatz senken">
              <Minus className="mx-auto size-4" />
            </button>
            <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
            <button type="button" className="size-11" disabled={busy || betI === STEPS.length - 1} onClick={() => setBetI((i) => Math.min(STEPS.length - 1, i + 1))} aria-label="Einsatz erhöhen">
              <Plus className="mx-auto size-4" />
            </button>
          </div>
          <button type="button" disabled={busy || balance < bet} onClick={() => void run()} className="ml-auto h-14 rounded-full bg-[#e8c85a] px-6 text-sm font-semibold uppercase tracking-wider text-[#1a1408] disabled:opacity-40">
            {busy ? "…" : "Drehen"}
          </button>
        </div>
        <NeedBankroll />
      </div>
      {celebrate ? <WinCelebration payout={celebrate.payout} stake={celebrate.stake} tier={celebrate.tier} soundOn={soundOn} variant="pragmatic" onDone={() => setCelebrate(null)} /> : null}
    </div>
  );
}
