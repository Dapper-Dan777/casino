import { isRed, type PlayingCard as Card, type Suit } from "@/lib/casino/cards";
import { cn } from "@/lib/utils";

type Size = "mini" | "table" | "risk";

type Pip = { x: number; y: number; flip?: boolean };

const PIPS: Record<string, Pip[]> = {
  A: [{ x: 50, y: 50 }],
  "2": [
    { x: 50, y: 18 },
    { x: 50, y: 82, flip: true },
  ],
  "3": [
    { x: 50, y: 18 },
    { x: 50, y: 50 },
    { x: 50, y: 82, flip: true },
  ],
  "4": [
    { x: 28, y: 20 },
    { x: 72, y: 20 },
    { x: 28, y: 80, flip: true },
    { x: 72, y: 80, flip: true },
  ],
  "5": [
    { x: 28, y: 20 },
    { x: 72, y: 20 },
    { x: 50, y: 50 },
    { x: 28, y: 80, flip: true },
    { x: 72, y: 80, flip: true },
  ],
  "6": [
    { x: 28, y: 20 },
    { x: 72, y: 20 },
    { x: 28, y: 50 },
    { x: 72, y: 50 },
    { x: 28, y: 80, flip: true },
    { x: 72, y: 80, flip: true },
  ],
  "7": [
    { x: 28, y: 18 },
    { x: 72, y: 18 },
    { x: 50, y: 34 },
    { x: 28, y: 50 },
    { x: 72, y: 50 },
    { x: 28, y: 82, flip: true },
    { x: 72, y: 82, flip: true },
  ],
  "8": [
    { x: 28, y: 18 },
    { x: 72, y: 18 },
    { x: 50, y: 34 },
    { x: 28, y: 50 },
    { x: 72, y: 50 },
    { x: 50, y: 66, flip: true },
    { x: 28, y: 82, flip: true },
    { x: 72, y: 82, flip: true },
  ],
  "9": [
    { x: 28, y: 16 },
    { x: 72, y: 16 },
    { x: 28, y: 38 },
    { x: 72, y: 38 },
    { x: 50, y: 50 },
    { x: 28, y: 62, flip: true },
    { x: 72, y: 62, flip: true },
    { x: 28, y: 84, flip: true },
    { x: 72, y: 84, flip: true },
  ],
  "10": [
    { x: 28, y: 15 },
    { x: 72, y: 15 },
    { x: 50, y: 27 },
    { x: 28, y: 39 },
    { x: 72, y: 39 },
    { x: 28, y: 61, flip: true },
    { x: 72, y: 61, flip: true },
    { x: 50, y: 73, flip: true },
    { x: 28, y: 85, flip: true },
    { x: 72, y: 85, flip: true },
  ],
};

const FACE = new Set(["J", "Q", "K"]);

const SIZE: Record<Size, string> = {
  mini: "h-[2.15rem] w-[1.5rem] rounded-[3px]",
  table: "h-24 w-[4.4rem] rounded-md sm:h-[7.25rem] sm:w-[5.1rem]",
  risk: "h-full w-full rounded-[7px]",
};

export function PlayingCardFace({
  card,
  hidden,
  compact,
  delayMs = 0,
  size,
  animated = true,
}: {
  card?: Card;
  hidden?: boolean;
  compact?: boolean;
  delayMs?: number;
  size?: Size;
  animated?: boolean;
}) {
  const resolved: Size = size ?? (compact ? "mini" : "table");
  const delay = { animationDelay: `${delayMs}ms` } as const;
  const cls = cn("poker-card", SIZE[resolved], animated && "card-deal");

  if (!card || hidden) {
    return <div className={cn(cls, "poker-card-back")} style={delay} aria-hidden />;
  }

  const red = isRed(card.suit);
  const mini = resolved === "mini";
  const pipSize = resolved === "risk" ? "size-[1.15rem] sm:size-6" : resolved === "table" ? "size-3.5 sm:size-4" : "size-2";
  const faceSize = resolved === "risk" ? "size-16 sm:size-[4.5rem]" : "size-8 sm:size-10";
  const rankCls =
    resolved === "risk"
      ? "text-[1.35rem] sm:text-[1.55rem] leading-none font-bold"
      : mini
        ? "text-[11px] leading-none font-bold"
        : "text-base sm:text-lg leading-none font-bold";

  return (
    <div className={cn(cls, red ? "poker-card-red" : "text-card-ink")} style={delay}>
      <IndexCorner rank={card.rank} suit={card.suit} className={cn("absolute top-0.5 left-0.5", resolved === "risk" && "top-1.5 left-1.5")} rankCls={rankCls} iconCls={mini ? "size-2" : resolved === "risk" ? "size-3.5" : "size-2.5"} />
      {!mini ? (
        <IndexCorner
          rank={card.rank}
          suit={card.suit}
          className={cn("absolute right-0.5 bottom-0.5 rotate-180", resolved === "risk" && "right-1.5 bottom-1.5")}
          rankCls={rankCls}
          iconCls={resolved === "risk" ? "size-3.5" : "size-2.5"}
        />
      ) : null}

      {mini ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <SuitGlyph suit={card.suit} className="size-2.5" />
        </div>
      ) : FACE.has(card.rank) ? (
        <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-sm border border-current/25">
          <span className={cn("font-bold leading-none", resolved === "risk" ? "text-5xl sm:text-6xl" : "text-3xl")}>{card.rank}</span>
          <SuitGlyph suit={card.suit} className={cn("mt-0.5", faceSize)} />
        </div>
      ) : card.rank === "A" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <SuitGlyph suit={card.suit} className={resolved === "risk" ? "size-[4.6rem] sm:size-[5.4rem]" : "size-10 sm:size-12"} />
        </div>
      ) : (
        (PIPS[card.rank] ?? []).map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: `translate(-50%, -50%)${p.flip ? " rotate(180deg)" : ""}` }}
          >
            <SuitGlyph suit={card.suit} className={pipSize} />
          </span>
        ))
      )}
    </div>
  );
}

function IndexCorner({
  rank,
  suit,
  className,
  rankCls,
  iconCls,
}: {
  rank: string;
  suit: Suit;
  className?: string;
  rankCls: string;
  iconCls: string;
}) {
  return (
    <div className={cn("z-10 flex flex-col items-center leading-none", className)}>
      <span className={rankCls}>{rank}</span>
      <SuitGlyph suit={suit} className={iconCls} />
    </div>
  );
}

export function SuitGlyph({ suit, className }: { suit: Suit; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {suit === "spades" ? (
        <>
          <path fill="currentColor" d="M12 2C7.4 8.8 4.8 12.2 4.8 16.2A5.2 5.2 0 0 0 12 21.2a5.2 5.2 0 0 0 7.2-5C19.2 12.2 16.6 8.8 12 2z" />
          <path fill="currentColor" d="M10.15 19.4h3.7L15.2 23H8.8z" />
        </>
      ) : suit === "hearts" ? (
        <path
          fill="currentColor"
          d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5A4.5 4.5 0 0 1 6.5 4 4.9 4.9 0 0 1 12 6.09 4.9 4.9 0 0 1 17.5 4 4.5 4.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
        />
      ) : suit === "diamonds" ? (
        <path fill="currentColor" d="M12 1.6 22.4 12 12 22.4 1.6 12z" />
      ) : (
        <>
          <circle fill="currentColor" cx="12" cy="6.1" r="3.15" />
          <circle fill="currentColor" cx="7.05" cy="12.15" r="3.15" />
          <circle fill="currentColor" cx="16.95" cy="12.15" r="3.15" />
          <path fill="currentColor" d="M10.3 14.4h3.4V18.1H16.4V21H7.6v-2.9h2.7z" />
        </>
      )}
    </svg>
  );
}
