import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { TableShell } from "./TableShell";
import {
  CHIP_VALUES,
  WHEEL_ORDER,
  colorOf,
  settleRoulette,
  spinWheel,
  wheelIndex,
  type RouletteBet,
} from "@/lib/casino/roulette";
import { formatEuro } from "@/lib/casino/format";
import { fisherYates, randInt } from "@/lib/casino/rng";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { cn } from "@/lib/utils";

const COL_ROWS = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
] as const;
const COL_KEYS = ["col3", "col2", "col1"] as const;

export function RouletteView({ lightning = false }: { lightning?: boolean }) {
  const [chip, setChip] = useState<(typeof CHIP_VALUES)[number]>(100);
  const [bets, setBets] = useState<Record<string, number>>({});
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [lastNet, setLastNet] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [bolts, setBolts] = useState<Record<number, number>>({});
  const lastBets = useRef<Record<string, number>>({});
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);

  const list: RouletteBet[] = useMemo(
    () => Object.entries(bets).filter(([, a]) => a > 0).map(([key, amount]) => ({ key, amount })),
    [bets],
  );
  const staked = list.reduce((s, b) => s + b.amount, 0);
  const rebetTotal = Object.values(lastBets.current).reduce((s, n) => s + n, 0);

  function add(key: string) {
    unlockAudio();
    if (spinning) return;
    const nextStake = staked + chip;
    if (nextStake > balance) {
      setCashier(true);
      return;
    }
    if (soundOn) sfx.chip();
    setBets((b) => ({ ...b, [key]: (b[key] ?? 0) + chip }));
    setLastNet(null);
  }

  function rebet() {
    unlockAudio();
    if (spinning || rebetTotal <= 0) return;
    if (rebetTotal > balance) {
      setCashier(true);
      return;
    }
    if (soundOn) sfx.chip();
    setBets({ ...lastBets.current });
    setLastNet(null);
  }

  function spin() {
    unlockAudio();
    if (spinning || list.length === 0) return;
    if (!placeBet(staked, lightning ? "Blitz-Roulette" : "Roulette · Einsatz")) {
      setCashier(true);
      return;
    }
    if (soundOn) sfx.spin();
    lastBets.current = { ...bets };
    const n = spinWheel();
    const idx = wheelIndex(n);
    const extra = 360 * 6;
    const pocket = 360 / WHEEL_ORDER.length;
    const end = extra + (360 - idx * pocket);
    const nextBolts: Record<number, number> = {};
    if (lightning) {
      const count = 1 + randInt(4);
      const pool = fisherYates(Array.from({ length: 37 }, (_, i) => i));
      const mults = [50, 50, 100, 100, 150, 200, 300, 500];
      for (let i = 0; i < count; i++) nextBolts[pool[i]!] = mults[randInt(mults.length)]!;
    }
    setBolts(nextBolts);
    setSpinning(true);
    setResult(null);
    setRotation((r) => r + end);
    window.setTimeout(() => {
      const { returned } = settleRoulette(list, n, lightning ? nextBolts : undefined);
      setResult(n);
      setSpinning(false);
      setHistory((h) => [n, ...h].slice(0, 12));
      if (returned > 0) creditWin(returned, lightning ? "Blitz-Roulette" : "Roulette · Gewinn");
      setLastNet(returned - staked);
      if (soundOn) {
        if (returned > staked) sfx.win(true);
        else if (returned > 0) sfx.win(false);
        else sfx.lose();
      }
      setBets({});
    }, 4200);
  }

  return (
    <TableShell
      title={lightning ? "Blitz-Roulette" : "Roulette"}
      subtitle={lightning ? "Lucky Numbers bis 500× · eine Null" : "Europäisch · eine Null · Hausvorteil 2,7 %"}
      slug={lightning ? "blitz-roulette" : "roulette"}
      felt="wheel"
    >
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center rounded-xl border border-border bg-surface p-4">
          <Wheel rotation={rotation} spinning={spinning} result={result} />
          <p className="mt-3 text-sm tabular-nums text-muted">
            {result === null ? (spinning ? "Kugel läuft…" : "Bereit") : `Zahl ${result}`}
          </p>
          {lightning && Object.keys(bolts).length ? (
            <p className="mt-1 text-center text-[11px] text-[#e8c85a]">
              Blitz{" "}
              {Object.entries(bolts)
                .map(([n, m]) => `${n}×${m}`)
                .join(" · ")}
            </p>
          ) : null}
          {lastNet !== null ? (
            <p className={cn("text-sm tabular-nums", lastNet >= 0 ? "text-win" : "text-loss")}>
              {lastNet >= 0 ? "+" : ""}
              {formatEuro(lastNet)}
            </p>
          ) : null}
          <div className="mt-4 flex w-full flex-wrap justify-center gap-1">
            {history.length === 0 ? (
              <p className="text-[10px] uppercase tracking-wider text-subtle">Letzte 12</p>
            ) : (
              history.map((n, i) => {
                const col = colorOf(n);
                return (
                  <span
                    key={`${n}-${i}`}
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full text-[10px] tabular-nums",
                      col === "green" ? "bg-win/40 text-fg" : col === "red" ? "bg-wine text-fg" : "bg-bg text-fg",
                    )}
                  >
                    {n}
                  </span>
                );
              })
            )}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-felt p-3 sm:p-4">
          <div className="mb-2 min-w-[36rem] grid grid-cols-[36px_repeat(12,minmax(0,1fr))_40px] gap-1 text-center text-xs">
            <button
              type="button"
              onClick={() => add("n:0")}
              className={cn(
                "relative row-span-3 flex items-center justify-center rounded-sm bg-win/30 text-fg",
                bets["n:0"] && "ring-1 ring-accent",
              )}
            >
              0
              {bets["n:0"] ? <ChipMini amount={bets["n:0"]!} /> : null}
            </button>
            {COL_ROWS.map((row, ri) => (
              <span key={COL_KEYS[ri]} className="contents">
                {row.map((n) => {
                  const key = `n:${n}`;
                  const col = colorOf(n);
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => add(key)}
                      className={cn(
                        "relative flex h-9 items-center justify-center rounded-sm text-xs tabular-nums",
                        col === "red" ? "bg-wine text-fg" : "bg-bg text-fg",
                        bets[key] && "ring-1 ring-accent",
                      )}
                    >
                      {n}
                      {bets[key] ? <ChipMini amount={bets[key]!} /> : null}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => add(COL_KEYS[ri]!)}
                  className={cn(
                    "relative flex items-center justify-center rounded-sm bg-bg/40 text-[10px] uppercase tracking-wide text-fg",
                    bets[COL_KEYS[ri]!] && "ring-1 ring-accent",
                  )}
                >
                  2:1
                  {bets[COL_KEYS[ri]!] ? <ChipMini amount={bets[COL_KEYS[ri]!]!} /> : null}
                </button>
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1">
            <OutBtn label="1–12" k="dozen1" bets={bets} add={add} />
            <OutBtn label="13–24" k="dozen2" bets={bets} add={add} />
            <OutBtn label="25–36" k="dozen3" bets={bets} add={add} />
          </div>
          <div className="mt-1 grid grid-cols-6 gap-1">
            <OutBtn label="1–18" k="low" bets={bets} add={add} />
            <OutBtn label="Gerade" k="even" bets={bets} add={add} />
            <OutBtn label="Rot" k="red" bets={bets} add={add} wine />
            <OutBtn label="Schwarz" k="black" bets={bets} add={add} dark />
            <OutBtn label="Ungerade" k="odd" bets={bets} add={add} />
            <OutBtn label="19–36" k="high" bets={bets} add={add} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {CHIP_VALUES.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setChip(v)}
                className={cn(
                  "size-11 rounded-full border text-[10px] tabular-nums",
                  chip === v ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated text-fg",
                )}
              >
                {v / 100}
              </button>
            ))}
            <Button variant="ghost" size="sm" disabled={spinning} onClick={() => setBets({})}>
              Löschen
            </Button>
            <Button variant="secondary" size="sm" disabled={spinning || rebetTotal <= 0} onClick={rebet}>
              Wiederholen
            </Button>
            <Button className="ml-auto" size="lg" disabled={spinning || staked === 0} onClick={spin}>
              Drehen · {formatEuro(staked)}
            </Button>
          </div>
          <p className="mt-3 text-center text-xs text-accent/80">Guthaben {formatEuro(balance)}</p>
        </div>
      </div>
    </TableShell>
  );
}

function OutBtn({
  label,
  k,
  bets,
  add,
  wine,
  dark,
}: {
  label: string;
  k: string;
  bets: Record<string, number>;
  add: (k: string) => void;
  wine?: boolean;
  dark?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => add(k)}
      className={cn(
        "relative h-10 rounded-sm border border-accent/20 text-[11px] uppercase tracking-wide text-fg",
        wine && "bg-wine",
        dark && "bg-bg",
        !wine && !dark && "bg-bg/40",
        bets[k] && "ring-1 ring-accent",
      )}
    >
      {label}
      {bets[k] ? <ChipMini amount={bets[k]!} /> : null}
    </button>
  );
}

function ChipMini({ amount }: { amount: number }) {
  return (
    <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 text-[9px] tabular-nums text-accent-fg">
      {amount / 100}
    </span>
  );
}

function Wheel({ rotation, spinning, result }: { rotation: number; spinning: boolean; result: number | null }) {
  const pockets = WHEEL_ORDER.length;
  const ballSpin = spinning ? rotation * 1.55 + 280 : rotation + 8;
  return (
    <div className="relative size-52">
      <div
        className="size-full rounded-full border-4 border-accent/40"
        style={{
          background: `conic-gradient(${WHEEL_ORDER.map((n, i) => {
            const col = n === 0 ? "#12382c" : colorOf(n) === "red" ? "#8a3d3a" : "#121416";
            const a = (i / pockets) * 100;
            const b = ((i + 1) / pockets) * 100;
            return `${col} ${a}% ${b}%`;
          }).join(",")})`,
          transform: `rotate(${rotation}deg)`,
          transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.82, 0.08, 1)" : "none",
        }}
      />
      <div
        className="pointer-events-none absolute inset-[11%] rounded-full"
        style={{
          transform: `rotate(${-ballSpin}deg)`,
          transition: spinning ? "transform 4.2s cubic-bezier(0.05, 0.55, 0.12, 1)" : "none",
        }}
      >
        <span className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 rounded-full bg-card shadow-[0_0_8px_rgb(0_0_0_/_0.45)]" />
      </div>
      <div className="absolute left-1/2 top-0 z-10 h-4 w-0.5 -translate-x-1/2 bg-accent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-accent/30 bg-bg text-lg tabular-nums text-fg">
          {result ?? "•"}
        </div>
      </div>
    </div>
  );
}
