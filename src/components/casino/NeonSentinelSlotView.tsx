import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Cpu, Info, Minus, Plus, Shield, Sparkles, Zap } from "lucide-react";
import { useCasino } from "@/lib/casino/store";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { evaluateSpin, spinGrid, type SlotSymbol, type SpinResult } from "@/lib/casino/slots";
import { cn } from "@/lib/utils";
import { NeedBankroll } from "./NeedBankroll";

const DEF = "neon-sentinel";
const BETS = [50, 100, 200, 500, 1000, 2500];
const SYMBOL_META: Record<string, { mark: string; tone: string; detail: string }> = {
  pulse: { mark: "P", tone: "cyan", detail: "Puls" },
  chip: { mark: "◇", tone: "blue", detail: "Chip" },
  visor: { mark: "V", tone: "violet", detail: "Visier" },
  core: { mark: "◆", tone: "amber", detail: "Kern" },
  sentinel: { mark: "S", tone: "pink", detail: "Sentinel" },
  signal: { mark: "✦", tone: "white", detail: "Signal" },
};

function Tile({ symbol, active, rolling }: { symbol: SlotSymbol; active: boolean; rolling: boolean }) {
  const meta = SYMBOL_META[symbol.id] ?? { mark: "•", tone: "cyan", detail: symbol.label };
  const tone = {
    cyan: "border-cyan-200/20 text-cyan-100 shadow-[inset_0_0_28px_rgba(34,211,238,0.08)]",
    blue: "border-blue-300/20 text-blue-100 shadow-[inset_0_0_28px_rgba(59,130,246,0.08)]",
    violet: "border-violet-300/25 text-violet-100 shadow-[inset_0_0_28px_rgba(139,92,246,0.1)]",
    amber: "border-amber-200/25 text-amber-100 shadow-[inset_0_0_28px_rgba(245,158,11,0.1)]",
    pink: "border-fuchsia-300/30 text-fuchsia-100 shadow-[inset_0_0_28px_rgba(217,70,239,0.12)]",
    white: "border-white/25 text-white shadow-[inset_0_0_28px_rgba(255,255,255,0.08)]",
  }[meta.tone] ?? "border-cyan-200/20 text-cyan-100";
  return (
    <div className={cn("relative flex aspect-[0.82] min-h-20 items-center justify-center overflow-hidden rounded-lg border bg-[#08131f] transition-all duration-300 sm:min-h-28", tone, active && "scale-[1.03] border-cyan-100 bg-cyan-200/15 shadow-[0_0_28px_rgba(34,211,238,0.5)]", rolling && "animate-pulse") }>
      <span className="absolute inset-x-0 top-2 text-center text-[8px] uppercase tracking-[0.28em] text-white/35">{meta.detail}</span>
      <span className="text-4xl font-semibold leading-none tracking-tight drop-shadow-[0_0_14px_currentColor] sm:text-5xl">{meta.mark}</span>
      <span className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-current opacity-80" />
      <span className="absolute bottom-2 right-2 text-[8px] tabular-nums text-white/35">{symbol.kind === "wild" ? "WILD" : symbol.kind === "scatter" ? "TRIGGER" : "AURELIA"}</span>
    </div>
  );
}

export function NeonSentinelSlotView() {
  const [betIndex, setBetIndex] = useState(1);
  const bet = BETS[betIndex] ?? 100;
  const [grid, setGrid] = useState<SlotSymbol[][]>([]);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [rolling, setRolling] = useState(false);
  const [freeSpins, setFreeSpins] = useState(0);
  const [freeTotal, setFreeTotal] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [overdrive, setOverdrive] = useState(false);
  const [message, setMessage] = useState("System bereit · 10 Gewinnwege · 3× Signal startet Overdrive");
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const touchGame = useCasino((s) => s.touchGame);
  const soundOn = useCasino((s) => s.soundOn);

  useEffect(() => { touchGame(DEF); }, [touchGame]);
  const activeCells = useMemo(() => {
    const cells = new Set<string>();
    result?.lineWins.forEach((win) => win.cells.forEach((cell) => cells.add(`${cell.reel}-${cell.row}`)));
    return cells;
  }, [result]);

  async function spin() {
    unlockAudio();
    if (rolling) return;
    const isFree = freeSpins > 0;
    if (!isFree && !placeBet(bet, "Cyborg: Neon Sentinel")) return;
    setRolling(true);
    setResult(null);
    setMessage(isFree ? `Overdrive-Spin ${freeTotal - freeSpins + 1}/${freeTotal}` : "Sentinel scan · Gewinnpfade werden berechnet");
    if (soundOn) sfx.spin();
    await new Promise((resolve) => window.setTimeout(resolve, 720));
    // The shared definition is imported at module level in the final bundle below.
    const { SLOT_DEFS } = await import("@/lib/casino/slots");
    const currentDef = SLOT_DEFS[DEF]!;
    const raw = spinGrid(currentDef);
    const next = evaluateSpin(currentDef, raw, bet, overdrive ? 2 : 1);
    setGrid(raw);
    setResult(next);
    const scatter = next.scatterCount >= currentDef.freeSpinsFrom;
    const payout = next.totalPayout;
    if (payout > 0) {
      creditWin(payout, "Cyborg: Neon Sentinel · Gewinn");
      if (soundOn) sfx.win(payout >= bet * 5);
    } else if (soundOn) sfx.lose();
    if (scatter) {
      const awarded = currentDef.freeSpinCount;
      setFreeSpins((value) => value + awarded);
      setFreeTotal((value) => value + awarded);
      setOverdrive(true);
      setMessage(`${next.scatterCount} Signal-Kerne · ${awarded} Overdrive-Spins aktiviert`);
      if (soundOn) sfx.bonus();
    } else if (payout > 0) {
      setMessage(`${next.lineWins.length} Pfade · ${formatEuro(payout)} Energie gutgeschrieben`);
    } else {
      setMessage("Kein Treffer · nächster Scan lädt den Kern");
    }
    setEnergy((value) => Math.min(100, value + Math.min(32, next.lineWins.length * 8 + next.scatterCount * 12)));
    if (isFree) setFreeSpins((value) => Math.max(0, value - 1));
    setRolling(false);
  }

  return (
    <div className="relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden bg-[#050a12] text-white sm:-mx-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_45%),linear-gradient(135deg,#050a12_0%,#0b1021_55%,#16091f_100%)]" />
      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-5 sm:px-6">
        <header className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white" aria-label="Lobby">←</Link>
            <div><p className="text-[10px] uppercase tracking-[0.32em] text-cyan-300">Aurelia // classified original</p><h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-4xl">Cyborg: Neon Sentinel</h1></div>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 text-xs text-cyan-100 sm:flex"><Cpu className="size-4" /> Unit 01 online</div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <section className="rounded-2xl border border-cyan-200/15 bg-black/25 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-5">
            <div className="mb-4 grid grid-cols-3 gap-2">
              <Hud label="ENERGY" value={`${energy}%`} icon={<Zap />} tone="cyan" />
              <Hud label="MODE" value={overdrive ? "OVERDRIVE" : "SCAN"} icon={<Shield />} tone={overdrive ? "pink" : "violet"} />
              <Hud label="WIN" value={result?.totalPayout ? formatEuro(result.totalPayout) : "--"} icon={<Sparkles />} tone="amber" />
            </div>
            <div className="mb-4 flex items-center justify-between border-y border-white/10 py-3 text-[10px] uppercase tracking-[0.2em] text-white/45"><span>{message}</span><span>{freeSpins > 0 ? `FREE ${freeTotal - freeSpins + 1}/${freeTotal}` : "10 WAYS"}</span></div>
            <div className={cn("grid grid-cols-5 gap-1.5 rounded-xl border border-cyan-200/20 bg-[#02060c] p-2 sm:gap-2 sm:p-3", rolling && "sentinel-bank-rolling")}>
              {(grid.length ? grid : Array.from({ length: 5 }, (_, reel) => Array.from({ length: 3 }, (_, row) => ({ id: ["pulse", "chip", "visor", "core", "sentinel"][((reel + row) % 5)], label: "", kind: "low", weight: 1, pays: [0, 0, 0] as [number, number, number] } as SlotSymbol)))).map((col, reel) => col.map((symbol, row) => <Tile key={`${reel}-${row}-${symbol.id}`} symbol={symbol} active={activeCells.has(`${reel}-${row}`)} rolling={rolling} />))}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-white/50"><span>Signal ×3 = 10 Freispiele</span><span>Wilds verbinden Gewinnpfade</span></div>
          </section>

          <aside className="space-y-3">
            <div className="rounded-2xl border border-fuchsia-200/15 bg-fuchsia-950/10 p-4"><p className="text-[10px] uppercase tracking-[0.25em] text-fuchsia-200/70">Sentinel protocol</p><div className="mt-3 flex items-end gap-3"><div className="grid h-24 w-20 place-items-center rounded-[42%] border border-cyan-200/35 bg-gradient-to-b from-cyan-300/20 via-slate-950 to-fuchsia-400/20 shadow-[0_0_35px_rgba(34,211,238,0.2)]"><span className="h-3 w-12 rounded-full bg-cyan-200 shadow-[0_0_15px_#22d3ee]" /></div><p className="text-sm leading-6 text-white/70">Sammle Energie. Aktiviere Overdrive. Jeder Treffer verändert den Kern.</p></div></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><div className="flex items-center justify-between"><span className="text-xs uppercase tracking-wider text-white/45">Paytable</span><Info className="size-4 text-cyan-300" /></div><div className="mt-3 space-y-2 text-xs text-white/65"><p><b className="text-cyan-200">Sentinel</b> · Wild verbindet Wege</p><p><b className="text-fuchsia-200">Signal</b> · 3 = 10 Freispiele</p><p><b className="text-amber-200">Overdrive</b> · Gewinne ×2</p></div></div>
          </aside>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-3 sm:p-4"><div className="flex flex-wrap items-center gap-3"><div className="flex items-center rounded-xl border border-cyan-200/20 bg-white/[0.04]"><button type="button" disabled={rolling || betIndex === 0} onClick={() => setBetIndex((value) => Math.max(0, value - 1))} className="grid size-12 place-items-center text-white/60 hover:text-white" aria-label="Einsatz senken"><Minus className="size-4" /></button><span className="min-w-24 text-center text-sm tabular-nums">{formatEuro(bet)}</span><button type="button" disabled={rolling || betIndex === BETS.length - 1} onClick={() => setBetIndex((value) => Math.min(BETS.length - 1, value + 1))} className="grid size-12 place-items-center text-white/60 hover:text-white" aria-label="Einsatz erhöhen"><Plus className="size-4" /></button></div><button type="button" disabled={rolling || balance < bet} onClick={() => void spin()} className="ml-auto h-12 min-w-44 rounded-xl bg-cyan-300 px-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.25)] hover:bg-cyan-200 disabled:opacity-40">{rolling ? "Scanning…" : freeSpins > 0 ? "Overdrive Spin" : "Energie laden"}</button><div className="min-w-28 text-right"><p className="text-[9px] uppercase tracking-wider text-white/40">Credit</p><p className="text-lg tabular-nums">{formatEuro(balance)}</p></div></div></div>
      </div>
      <NeedBankroll />
    </div>
  );
}

function Hud({ label, value, icon, tone }: { label: string; value: string; icon: ReactNode; tone: "cyan" | "pink" | "violet" | "amber" }) {
  return <div className={cn("rounded-lg border bg-white/[0.03] px-2 py-2", tone === "cyan" && "border-cyan-300/20", tone === "pink" && "border-fuchsia-300/20", tone === "violet" && "border-violet-300/20", tone === "amber" && "border-amber-300/20")}><div className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-white/40">{icon}<span>{label}</span></div><p className="mt-1 text-xs font-semibold tabular-nums text-white/90 sm:text-sm">{value}</p></div>;
}
