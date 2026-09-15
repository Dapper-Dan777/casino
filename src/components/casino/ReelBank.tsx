import type { ReactNode } from "react";
import { SymbolFace } from "./SlotSymbols";
import type { SlotSymbol } from "@/lib/casino/slots";
import { CONTAIN_REELS, type ReelVariant } from "@/lib/casino/slotThemes";
import { cn } from "@/lib/utils";

export const REEL_PAD = 30;

export type ReelCol = {
  strip: SlotSymbol[];
  offset: number;
  spinning: boolean;
  settleMs: number;
};

export const REEL_STOP_MS = [1200, 1650, 2100, 2600, 3200];
export const REEL_TURBO_MS = [380, 520, 660, 800, 960];
export const REEL_STOP_MERKUR = [640, 880, 1120, 1360, 1600];
export const REEL_STOP_PRAG = [1400, 1850, 2350, 2900, 3500];
export const REEL_STOP_HOLD = [900, 1250, 1650, 2100, 2600];
export const REEL_STOP_BURST = [800, 1100, 1450, 1850, 2400];

export function ReelBank({
  reels,
  spinKey,
  busy,
  winCells,
  expanded,
  anticipate,
  overlay,
  vanish,
  frozen,
  variant = "photo",
  size = "md",
  rows = 3,
}: {
  reels: ReelCol[];
  spinKey: number;
  busy: boolean;
  winCells: Set<string>;
  expanded?: number[];
  anticipate?: boolean;
  overlay?: (ri: number, row: number) => ReactNode;
  vanish?: Set<string>;
  frozen?: Set<string>;
  variant?: ReelVariant;
  size?: "md" | "lg";
  rows?: number;
}) {
  const classic = CONTAIN_REELS.has(variant);
  const tall = size === "lg";
  const five = rows === 5;
  const cellH = five
    ? "h-[16.25rem] [--cell:3.25rem] sm:h-[21.25rem] sm:[--cell:4.25rem]"
    : tall
      ? "h-[18rem] [--cell:6rem] sm:h-[22.5rem] sm:[--cell:7.5rem]"
      : "h-[15rem] [--cell:5rem] sm:h-[18.75rem] sm:[--cell:6.25rem]";
  return (
    <div className="relative">
      <div
        className={cn("relative grid overflow-hidden slot-reel-bank", `reel-bank-${variant}`)}
        style={{ gridTemplateColumns: `repeat(${reels.length}, minmax(0, 1fr))` }}
      >
        <span
          className={cn(
            "pointer-events-none absolute inset-x-1 top-1/2 z-20 h-px -translate-y-1/2 opacity-60",
            five && "hidden",
            classic ? "bg-[var(--slot-line,#e8c85a)]" : "bg-[var(--slot-line,var(--color-accent))]",
          )}
        />
        {reels.map((reel, ri) => (
          <div
            key={ri}
            className={cn(
              "relative overflow-hidden reel-col",
              cellH,
              expanded?.includes(ri) && "slot-expand",
              anticipate && ri === reels.length - 1 && "slot-anticipate",
            )}
          >
            <div
              key={`${spinKey}-${ri}`}
              className="absolute inset-x-0 top-0 will-change-transform"
              style={{
                ["--dist" as string]: reel.offset,
                transform: `translate3d(0, calc(var(--cell) * ${-reel.offset}), 0)`,
                animation: reel.spinning ? `slot-reel-run ${reel.settleMs}ms linear forwards` : undefined,
              }}
            >
              {reel.strip.map((sym, si) => {
                const row = si - reel.offset;
                const key = `${ri}-${row}`;
                const vis = row >= 0 && row < rows;
                const win = !busy && vis && winCells.has(key);
                const gone = Boolean(vanish && vis && vanish.has(key));
                const ice = Boolean(frozen && vis && frozen.has(key));
                return (
                  <div key={`${ri}-${si}-${sym.id}-${si}`} className="h-[var(--cell)] p-px" data-row={vis ? row : undefined}>
                    <div className={cn("relative h-full", gone && "slot-explode", ice && "slot-ice")}>
                      <SymbolFace symbol={sym} win={win && !gone} variant={variant} />
                      {vis ? overlay?.(ri, row) : null}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pointer-events-none absolute inset-0 slot-reel-mask" />
          </div>
        ))}
      </div>
      {classic || five ? null : (
        <div className="pointer-events-none absolute inset-x-8 top-1/2 z-10 h-px -translate-y-1/2 bg-[var(--slot-line,#2ee6c5)] opacity-70" />
      )}
    </div>
  );
}
