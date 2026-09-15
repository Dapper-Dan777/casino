import type { SlotSymbol } from "@/lib/casino/slots";
import { CONTAIN_REELS, type ReelVariant } from "@/lib/casino/slotThemes";
import { cn } from "@/lib/utils";

export function SymbolFace({
  symbol,
  win,
  variant = "photo",
}: {
  symbol: SlotSymbol;
  win?: boolean;
  variant?: ReelVariant;
}) {
  const contain = CONTAIN_REELS.has(variant);
  if (symbol.id === "orb") {
    return <OlympOrb value={symbol.wildMult ?? 2} win={win} />;
  }
  if (symbol.art) {
    return (
      <div
        className={cn(
          "relative h-full w-full overflow-hidden reel-tile",
          `reel-tile-${variant}`,
          win && "slot-win",
          !win && !contain && (symbol.kind === "scatter" || symbol.kind === "wild") && "ring-1 ring-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_70%,transparent)]",
        )}
      >
        <img
          src={symbol.art}
          alt={symbol.label}
          className={cn("h-full w-full", contain ? "object-contain" : "object-cover")}
        />
        {win ? <span className="pointer-events-none absolute inset-0 slot-win-flash" /> : null}
      </div>
    );
  }

  const special = symbol.kind === "wild" || symbol.kind === "scatter";
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center reel-tile px-0.5",
        `reel-tile-${variant}`,
        win && "slot-win",
        !win && special && "border border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_70%,transparent)]",
      )}
    >
      <Glyph id={symbol.id} kind={symbol.kind} />
      <span
        className={cn(
          "mt-0.5 max-w-full truncate text-[8px] font-medium uppercase tracking-wider sm:text-[9px]",
          special ? "text-[var(--slot-line,var(--color-accent))]" : "text-muted",
        )}
      >
        {symbol.label}
      </span>
    </div>
  );
}

export function orbTone(v: number): "leaf" | "sea" | "fire" | "gold" | "myth" {
  if (v >= 250) return "myth";
  if (v >= 50) return "gold";
  if (v >= 15) return "fire";
  if (v >= 8) return "sea";
  return "leaf";
}

export function OlympOrb({
  value,
  win,
  size = "cell",
}: {
  value: number;
  win?: boolean;
  size?: "cell" | "hud";
}) {
  const tone = orbTone(value);
  return (
    <div className={cn("olymp-orb", `olymp-orb-${tone}`, size === "hud" && "is-hud", win && "slot-win")}>
      <span className={cn("olymp-orb-val", value >= 100 && "is-long")}>
        ×{value}
      </span>
    </div>
  );
}

function Glyph({ id, kind }: { id: string; kind: string }) {
  const stroke = kind === "wild" || kind === "scatter" ? "var(--slot-line, var(--color-accent))" : "var(--color-fg)";
  return (
    <svg viewBox="0 0 48 48" className="size-10 sm:size-11" aria-hidden>
      {id === "wild" || id === "star" ? (
        <path d="M24 5 l5 13.2 14 .4-11.2 8.4 4.1 13.4L24 32.6 13.1 40.4l4.1-13.4L6 18.6l14-.4z" fill={stroke} />
      ) : id === "scatter" ? (
        <>
          <rect x="12" y="8" width="24" height="32" rx="2" fill="none" stroke={stroke} strokeWidth="2.2" />
          <path d="M16 16 h16 M16 22 h12 M16 28 h14" stroke={stroke} strokeWidth="2" />
        </>
      ) : id === "j" || id === "q" || id === "k" || id === "a" ? (
        <text x="24" y="33" textAnchor="middle" fontSize="24" fill={stroke} fontFamily="Georgia, serif">
          {id.toUpperCase()}
        </text>
      ) : (
        <circle cx="24" cy="24" r="11" fill="none" stroke={stroke} strokeWidth="2.3" />
      )}
    </svg>
  );
}
