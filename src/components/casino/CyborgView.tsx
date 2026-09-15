import { useState } from "react";
import { OriginalShell, BetBar, ResultBar, ORIGINAL_STEPS } from "./OriginalsChrome";
import { formatEuro } from "@/lib/casino/format";
import { randInt } from "@/lib/casino/rng";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

const CELLS = 12;

export function CyborgView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [energy, setEnergy] = useState<number[]>([]);
  const [bonus, setBonus] = useState(false);
  const [last, setLast] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  async function play() {
    unlockAudio();
    if (busy) return;
    if (balance < bet) { setCashier(true); return; }
    if (!placeBet(bet, "Cyborg: Neon Sentinel")) return;
    setBusy(true);
    if (soundOn) sfx.spin();
    await new Promise((resolve) => window.setTimeout(resolve, 360));
    const hits = Array.from({ length: 3 + randInt(5) }, () => randInt(CELLS));
    const unique = [...new Set(hits)];
    const payout = unique.length >= 6 ? bet * (bonus ? 12 : 6) : unique.length >= 4 ? bet * 2 : 0;
    setEnergy(unique);
    setLast(payout);
    if (payout > 0) { creditWin(payout, "Cyborg: Neon Sentinel"); if (soundOn) sfx.win(payout >= bet * 5); }
    else if (soundOn) sfx.lose();
    if (unique.length >= 8) { setBonus(true); if (soundOn) sfx.bonus(); }
    setBusy(false);
  }

  function clearBonus() {
    setBonus(false);
    setEnergy([]);
    setLast(null);
  }

  return (
    <OriginalShell title="Cyborg: Neon Sentinel" subtitle="Energie sammeln · Bonusmodus · eigene Aurelia-Mechanik" slug="neon-sentinel">
      <div className="relative overflow-hidden rounded-xl border border-cyan-300/25 bg-[#07131c] p-5 text-center shadow-[0_0_50px_rgba(22,211,238,0.12)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(34,211,238,0.2),transparent_55%)]" />
        <div className="relative mx-auto mb-5 flex h-32 w-28 items-center justify-center rounded-[45%] border border-cyan-200/40 bg-gradient-to-b from-cyan-300/20 via-slate-950 to-fuchsia-400/20 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          <div className="absolute top-8 h-3 w-16 rounded-full bg-cyan-200 shadow-[0_0_18px_#22d3ee]" />
          <div className="absolute bottom-8 h-9 w-16 rounded-full border border-fuchsia-300/60" />
          <span className="absolute -bottom-6 text-[10px] uppercase tracking-[0.25em] text-cyan-200">Sentinel Unit 01</span>
        </div>
        <p className="relative text-[10px] uppercase tracking-[0.28em] text-cyan-200">Energie-Kern</p>
        <div className="relative mx-auto mt-4 grid max-w-xs grid-cols-4 gap-2">
          {Array.from({ length: CELLS }, (_, index) => <span key={index} className={cn("h-8 rounded-sm border border-cyan-200/15 bg-slate-950/80", energy.includes(index) && "bg-cyan-300 shadow-[0_0_16px_#22d3ee]")} />)}
        </div>
        <p className="relative mt-4 text-sm text-slate-300">{bonus ? "Overdrive aktiv · 12× Bonusmultiplikator" : "4 Kerne = 2× · 6 Kerne = 6× · 8 Kerne startet Overdrive"}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="button" disabled={!bonus || busy} onClick={clearBonus} className="h-12 flex-1 rounded-md border border-fuchsia-300/30 bg-fuchsia-950/30 text-sm font-semibold text-fuchsia-100 disabled:opacity-40">Overdrive beenden</button>
        <button type="button" disabled={!bonus || busy} onClick={() => void play()} className="h-12 flex-1 rounded-md bg-cyan-300 text-sm font-semibold text-slate-950 disabled:opacity-40">Bonus-Impuls</button>
      </div>
      <BetBar bet={bet} betI={betI} setBetI={setBetI} busy={busy || bonus} onPlay={() => void play()} label="Energie laden" />
      <ResultBar last={last} bet={bet} />
      <p className="mt-3 text-center text-xs text-muted">Eigenständiges Spielgeld-Spiel mit eigener Cyberpunk-Figur und Bonuslogik.</p>
    </OriginalShell>
  );
}
