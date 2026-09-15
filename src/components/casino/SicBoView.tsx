import { useState } from "react";
import { TableShell } from "./TableShell";
import { ChipStack } from "./ChipStack";
import { isTriple, rollSic, sicLabel, sicPay, sicSum, type SicBet } from "@/lib/casino/sicbo";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { ORIGINAL_STEPS } from "./OriginalsChrome";
import { cn } from "@/lib/utils";

const SIZES: SicBet[] = [
  { kind: "size", size: "small" },
  { kind: "odd" },
  { kind: "even" },
  { kind: "size", size: "big" },
];

export function SicBoView() {
  const [betI, setBetI] = useState(1);
  const bet = ORIGINAL_STEPS[betI] ?? 100;
  const [sel, setSel] = useState<SicBet>({ kind: "size", size: "big" });
  const [dice, setDice] = useState<[number, number, number] | null>(null);
  const [busy, setBusy] = useState(false);
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
    if (!placeBet(bet, "Sic Bo")) return;
    setBusy(true);
    if (soundOn) sfx.spin();
    for (let i = 0; i < 10; i++) {
      setDice(rollSic());
      await new Promise((r) => setTimeout(r, 70));
    }
    const d = rollSic();
    setDice(d);
    const paid = sicPay(d, sel, bet);
    setLast(paid);
    if (paid > 0) {
      creditWin(paid, "Sic Bo");
      if (soundOn) sfx.win(paid >= bet * 8);
    } else if (soundOn) sfx.lose();
    setBusy(false);
  }

  return (
    <TableShell title="Sic Bo" subtitle="Drei Würfel · Klein / Groß · Triple 180:1" slug="sicbo" felt="classic" live>
      <div className="mb-4 flex justify-center gap-3">
        {(dice ?? [1, 2, 3]).map((n, i) => (
          <Die key={i} n={n} rolling={busy} />
        ))}
      </div>
      {dice ? (
        <p className="mb-4 text-center text-sm text-accent">
          Summe {sicSum(dice)}
          {isTriple(dice) ? " · Triple" : ""}
        </p>
      ) : null}

      <div className="grid grid-cols-4 gap-1.5">
        {SIZES.map((b) => (
          <BetCell key={sicLabel(b)} label={sicLabel(b)} hint="1:1" active={same(sel, b)} onClick={() => setSel(b)} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <BetCell
            key={n}
            label={`${n}`}
            hint="1–3:1"
            active={sel.kind === "single" && sel.n === n}
            onClick={() => setSel({ kind: "single", n })}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((n) => (
          <BetCell
            key={n}
            label={`${n}`}
            hint=""
            active={sel.kind === "total" && sel.n === n}
            onClick={() => setSel({ kind: "total", n })}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <BetCell label="Dreierlinge" hint="30:1" active={sel.kind === "triple" && sel.n === "any"} onClick={() => setSel({ kind: "triple", n: "any" })} />
        <BetCell
          label="Spezial-Triple"
          hint="180:1"
          active={sel.kind === "triple" && sel.n !== "any"}
          onClick={() => setSel({ kind: "triple", n: 6 })}
        />
      </div>
      {sel.kind === "triple" && sel.n !== "any" ? (
        <div className="mt-2 flex gap-1.5">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSel({ kind: "triple", n })}
              className={cn("h-10 flex-1 rounded-md text-sm", sel.n === n ? "bg-accent text-accent-fg" : "bg-elevated")}
            >
              {n}{n}{n}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="flex rounded-md border border-accent/25 bg-surface">
          {ORIGINAL_STEPS.map((v, i) => (
            <button
              key={v}
              type="button"
              onClick={() => setBetI(i)}
              className={cn("h-11 px-2 text-xs tabular-nums", i === betI ? "bg-accent text-accent-fg" : "text-muted")}
            >
              {formatEuro(v)}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={busy || balance < bet}
          onClick={() => void play()}
          className="ml-auto h-12 min-w-36 rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wider text-accent-fg disabled:opacity-40"
        >
          {busy ? "Würfeln" : "Setzen"}
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted">{sicLabel(sel)}</span>
        <span className={cn("tabular-nums", last != null && last > 0 ? "text-win" : "text-fg")}>
          {last == null ? "—" : formatEuro(last)}
        </span>
      </div>
      <div className="mt-4 flex justify-center">
        <ChipStack n={5} tone="felt" />
      </div>
    </TableShell>
  );
}

function same(a: SicBet, b: SicBet): boolean {
  if (a.kind !== b.kind) return false;
  if (a.kind === "size" && b.kind === "size") return a.size === b.size;
  if (a.kind === "triple" && b.kind === "triple") return a.n === b.n;
  if (a.kind === "total" && b.kind === "total") return a.n === b.n;
  if (a.kind === "single" && b.kind === "single") return a.n === b.n;
  return true;
}

function BetCell({ label, hint, active, onClick }: { label: string; hint: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-12 rounded-md px-1 py-2 text-center text-xs",
        active ? "bg-accent text-accent-fg" : "bg-elevated/80 text-fg hover:bg-elevated",
      )}
    >
      <span className="block font-semibold">{label}</span>
      {hint ? <span className="block text-[10px] opacity-70">{hint}</span> : null}
    </button>
  );
}

function Die({ n, rolling }: { n: number; rolling: boolean }) {
  return (
    <div className={cn("sic-die", rolling && "is-roll")} aria-label={`${n}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((p) => {
        const on =
          n === 1
            ? p === 5
            : n === 2
              ? p === 1 || p === 9
              : n === 3
                ? p === 1 || p === 5 || p === 9
                : n === 4
                  ? p === 1 || p === 3 || p === 7 || p === 9
                  : n === 5
                    ? p === 1 || p === 3 || p === 5 || p === 7 || p === 9
                    : p !== 5;
        return <i key={p} className={on ? "on" : undefined} />;
      })}
    </div>
  );
}
