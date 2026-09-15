import { randInt, weightedPick } from "./rng";
import { FIVE_LINES, THREE_LINES, WILD_MULTS } from "./merkur";
import { OLYMP_DEF } from "./olympus";
import { BONBON_DEF } from "./bonbon";
import { FISH_DEF } from "./fish";

export type SymbolKind = "low" | "mid" | "high" | "wild" | "scatter";

export type SlotMechanic = "book" | "ways" | "firelink" | "sticky" | "gems" | "gamble" | "leiter" | "hold" | "olympus" | "burst" | "fish";

export type SlotSymbol = {
  id: string;
  label: string;
  kind: SymbolKind;
  weight: number;
  /** Multipliers of total stake for 3 / 4 / 5 of a kind. */
  pays: readonly [number, number, number];
  /** Optional 2-of-a-kind (classic fruit). */
  pays2?: number;
  art?: string;
  wildMult?: number;
};

export type SlotDef = {
  slug: string;
  reels: number;
  rows: number;
  paylines: number[][];
  symbols: SlotSymbol[];
  betSteps: number[];
  defaultBet: number;
  freeSpinsFrom: number;
  freeSpinCount: number;
  bookWild?: boolean;
  expandingSpecial?: boolean;
  fsMultiplier: number;
  pityAfter: number;
  mechanic?: SlotMechanic;
  firelinkFrom?: number;
  gemTarget?: number;
  paysBothWays?: boolean;
  wildMults?: readonly number[];
  leiter?: boolean;
  allPays2?: boolean;
  tumble?: boolean;
  stackedWilds?: boolean;
  wildReels?: number[];
  /** Physical-style reel strips (symbol ids). When set, spins walk the strip. */
  strips?: string[][];
};

export type Cell = { symbol: SlotSymbol; reel: number; row: number };

export type LineWin = {
  line: number;
  symbol: SlotSymbol;
  count: number;
  cells: Cell[];
  payout: number;
  ways?: number;
  /** Book/Mirror special: pays even with gaps, on every line. */
  expanding?: boolean;
};

export type SpinResult = {
  grid: SlotSymbol[][];
  lineWins: LineWin[];
  scatterCount: number;
  scatterPayout: number;
  totalPayout: number;
  freeSpinsAwarded: number;
  expandedReels: number[];
};

export type WinTier = "none" | "nice" | "big" | "mega" | "epic";

export type CoinLock = {
  reel: number;
  row: number;
  mult: number;
  jackpot?: "MINI" | "MINOR" | "MAJOR" | "GRAND";
};

const TEN_LINES: number[][] = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [1, 0, 0, 0, 1],
  [1, 2, 2, 2, 1],
  [0, 1, 1, 1, 0],
];

type Theme =
  | "egypt"
  | "nordic"
  | "fruit"
  | "gem"
  | "huff"
  | "neon"
  | "dragon"
  | "blaze"
  | "extra"
  | "mirror"
  | "multi"
  | "chance"
  | "sizzle"
  | "lucky";

function ranks(theme: Theme): SlotSymbol[] {
  const prefix =
    theme === "fruit"
      ? "fruit"
      : theme === "blaze"
        ? "blaze"
        : theme === "multi"
          ? "multi"
        : theme === "chance"
          ? "chance"
          : theme === "sizzle"
            ? "sizzle"
            : theme === "gem"
              ? "gem"
              : theme === "lucky"
                ? "lucky"
              : theme === "nordic"
                ? "nordic"
                : theme === "huff"
                  ? "huff"
                  : theme === "neon"
                    ? "neon"
                    : theme === "dragon"
                      ? "dragon"
                      : theme === "mirror"
                        ? "mirror"
                        : "egypt";
  const tile = (id: string) => `/games/sym/${prefix}-${id}.jpg`;
  const low = (id: string, label: string, w: number, pays: readonly [number, number, number] = [0.3, 1, 3.5]): SlotSymbol => ({
    id,
    label,
    kind: "low",
    weight: w,
    pays,
    art: tile(id),
  });
  const mid = (id: string, label: string, w: number, pays: readonly [number, number, number]): SlotSymbol => ({
    id,
    label,
    kind: "mid",
    weight: w,
    pays,
    art: tile(id),
  });
  const high = (id: string, label: string, w: number, pays: readonly [number, number, number]): SlotSymbol => ({
    id,
    label,
    kind: "high",
    weight: w,
    pays,
    art: tile(id),
  });

  if (theme === "egypt") {
    return [
      low("j", "J", 11, [0.5, 2.5, 10]),
      low("q", "Q", 11, [0.5, 2.5, 10]),
      low("k", "K", 10, [0.5, 4, 15]),
      low("a", "A", 10, [0.5, 4, 15]),
      mid("ankh", "Ankh", 6, [3, 10, 75]),
      { id: "eye", label: "Auge", kind: "mid", weight: 5, pays: [3, 10, 75], pays2: 0.5, art: tile("eye") },
      { id: "scarab", label: "Skarabäus", kind: "high", weight: 4, pays: [3, 10, 75], pays2: 0.5, art: tile("scarab") },
      { id: "pharaoh", label: "Pharao", kind: "high", weight: 3, pays: [10, 100, 500], pays2: 1, art: tile("pharaoh") },
      { id: "wild", label: "Ra", kind: "wild", weight: 1, pays: [10, 100, 500], art: tile("wild") },
      { id: "scatter", label: "Buch", kind: "scatter", weight: 2, pays: [2, 20, 200], art: tile("scatter") },
    ];
  }
  if (theme === "nordic") {
    return [
      low("j", "J", 11, [0.8, 3.5, 14]),
      low("q", "Q", 11, [0.8, 3.5, 14]),
      low("k", "K", 10, [1, 4.5, 18]),
      low("a", "A", 10, [1, 4.5, 18]),
      mid("rune", "Rune", 6, [2, 8, 35]),
      mid("raven", "Rabe", 5, [3, 12, 50]),
      high("wolf", "Wolf", 4, [6, 20, 80]),
      high("hammer", "Hammer", 3, [10, 40, 200]),
      { id: "wild", label: "Wild", kind: "wild", weight: 3, pays: [8, 30, 150], art: tile("wild") },
      { id: "scatter", label: "Schiff", kind: "scatter", weight: 3, pays: [4, 20, 100], art: tile("scatter") },
    ];
  }
  if (theme === "fruit") {
    return [
      { id: "cherry", label: "Kirsche", kind: "low", weight: 14, pays: [1.5, 5, 20], pays2: 1, art: tile("cherry") },
      low("lemon", "Zitrone", 12, [1.2, 4, 16]),
      low("plum", "Pflaume", 11, [1.5, 5, 18]),
      mid("orange", "Orange", 8, [2, 8, 30]),
      mid("bell", "Glocke", 6, [3, 12, 50]),
      high("bar", "BAR", 4, [8, 25, 100]),
      high("seven", "Sieben", 3, [20, 80, 400]),
      { id: "wild", label: "Stern", kind: "wild", weight: 3, pays: [10, 40, 200], art: tile("wild") },
      { id: "scatter", label: "Krone", kind: "scatter", weight: 3, pays: [5, 20, 100], art: tile("scatter") },
    ];
  }
  if (theme === "huff") {
    return [
      low("j", "J", 10, [1, 4, 16]),
      low("q", "Q", 10, [1, 4, 16]),
      low("k", "K", 9, [1.2, 5, 20]),
      low("a", "A", 9, [1.2, 5, 20]),
      mid("pig1", "Stroh", 6, [2.5, 10, 40]),
      mid("pig2", "Holz", 5, [4, 15, 60]),
      high("pig3", "Stein", 3, [8, 30, 150]),
      { id: "saw", label: "Säge", kind: "mid", weight: 6, pays: [5, 20, 80], art: tile("saw") },
      { id: "wild", label: "Wolf", kind: "wild", weight: 2, pays: [10, 40, 200], art: tile("wild") },
      { id: "scatter", label: "Helm", kind: "scatter", weight: 4, pays: [0, 0, 0], art: tile("scatter") },
    ];
  }
  if (theme === "neon") {
    return [
      low("j", "J", 11, [0.4, 1.2, 6]),
      low("q", "Q", 11, [0.4, 1.2, 6]),
      low("k", "K", 10, [0.5, 1.6, 8]),
      low("a", "A", 10, [0.5, 1.6, 8]),
      mid("glyph", "Glyph", 6, [0.8, 3, 14]),
      mid("crystal", "Kristall", 5, [1.2, 5, 22]),
      mid("ring", "Ring", 5, [1.5, 6, 28]),
      high("helmet", "Helm", 3, [4, 16, 80]),
      { id: "wild", label: "Bolt", kind: "wild", weight: 2, pays: [4, 16, 80], art: tile("wild") },
      { id: "scatter", label: "Chip", kind: "scatter", weight: 3, pays: [2, 8, 40], art: tile("scatter") },
    ];
  }
  if (theme === "dragon") {
    return [
      low("j", "J", 11, [1, 4, 16]),
      low("q", "Q", 11, [1, 4, 16]),
      low("k", "K", 10, [1.2, 5, 20]),
      low("a", "A", 10, [1.2, 5, 20]),
      mid("lantern", "Laterne", 6, [2.5, 10, 40]),
      mid("ingot", "Gold", 5, [4, 15, 60]),
      mid("koi", "Koi", 5, [5, 18, 70]),
      high("pearl", "Feuer", 6, [8, 30, 120]),
      { id: "wild", label: "Auge", kind: "wild", weight: 2, pays: [12, 50, 250], art: tile("wild") },
      { id: "scatter", label: "Drache", kind: "scatter", weight: 3, pays: [6, 30, 150], art: tile("scatter") },
    ];
  }
  if (theme === "blaze") {
    return [
      { id: "cherry", label: "Kirsche", kind: "low", weight: 16, pays: [2, 10, 40], pays2: 0.5, art: tile("cherry") },
      { id: "lemon", label: "Zitrone", kind: "low", weight: 14, pays: [2, 10, 40], pays2: 0.5, art: tile("lemon") },
      { id: "plum", label: "Pflaume", kind: "low", weight: 12, pays: [4, 16, 80], pays2: 0.8, art: tile("plum") },
      { id: "orange", label: "Orange", kind: "mid", weight: 10, pays: [4, 16, 80], pays2: 0.8, art: tile("orange") },
      { id: "grapes", label: "Trauben", kind: "mid", weight: 8, pays: [8, 40, 200], pays2: 1.5, art: tile("grapes") },
      { id: "melon", label: "Melone", kind: "high", weight: 5, pays: [10, 80, 400], pays2: 2, art: tile("melon") },
      { id: "star", label: "Stern", kind: "high", weight: 3, pays: [20, 200, 1000], pays2: 4, art: "/games/sym/blaze-star.jpg" },
    ];
  }
  if (theme === "extra") {
    return [
      { id: "necklace", label: "Kette", kind: "low", weight: 13, pays: [0.8, 3, 12], art: "/games/sym/extra-necklace.jpg" },
      { id: "watch", label: "Uhr", kind: "low", weight: 12, pays: [0.8, 3, 12], art: "/games/sym/extra-watch.jpg" },
      { id: "coins", label: "Münzen", kind: "mid", weight: 10, pays: [1.2, 5, 20], art: "/games/sym/extra-coins.jpg" },
      { id: "ring", label: "Ring", kind: "mid", weight: 9, pays: [1.5, 6, 24], pays2: 0.5, art: "/games/sym/extra-ring.jpg" },
      { id: "ruby", label: "Rubin", kind: "high", weight: 6, pays: [3, 12, 50], pays2: 1, art: "/games/sym/gem-ruby.jpg" },
      { id: "sapphire", label: "Diamant", kind: "high", weight: 4, pays: [8, 30, 120], pays2: 2, art: "/games/sym/gem-sapphire.jpg" },
      { id: "wild", label: "Safe", kind: "wild", weight: 5, pays: [10, 40, 200], pays2: 2, art: "/games/sym/safe-wild.jpg" },
    ];
  }
  if (theme === "mirror") {
    return [
      low("j", "J", 11, [0.5, 2.5, 10]),
      low("q", "Q", 11, [0.5, 2.5, 10]),
      low("k", "K", 10, [0.5, 4, 15]),
      low("a", "A", 10, [0.5, 4, 15]),
      { id: "rune", label: "Ring", kind: "mid", weight: 6, pays: [3, 12, 75], art: "/games/sym/nordic-rune.jpg" },
      { id: "tablet", label: "Tafel", kind: "mid", weight: 5, pays: [3, 12, 75], art: "/games/sym/nordic-raven.jpg" },
      { id: "unicorn", label: "Einhorn", kind: "high", weight: 4, pays: [8, 30, 200], pays2: 2, art: "/games/sym/mirror-unicorn.jpg" },
      { id: "mage", label: "Magierin", kind: "high", weight: 3, pays: [15, 60, 500], pays2: 3, art: "/games/sym/mirror-mage.jpg" },
      { id: "wild", label: "Spiegel", kind: "wild", weight: 2, pays: [15, 60, 500], art: "/games/sym/mirror-wild.jpg" },
      { id: "scatter", label: "Spiegel", kind: "scatter", weight: 3, pays: [2, 20, 200], art: "/games/sym/mirror-wild.jpg" },
    ];
  }
  if (theme === "multi") {
    return [
      { id: "cherry", label: "Kirsche", kind: "low", weight: 12, pays: [0.4, 1.2, 6], art: tile("cherry") },
      { id: "lemon", label: "Zitrone", kind: "low", weight: 11, pays: [0.4, 1.2, 6], art: tile("lemon") },
      { id: "plum", label: "Pflaume", kind: "mid", weight: 9, pays: [0.6, 2, 10], art: tile("plum") },
      { id: "bell", label: "Glocke", kind: "mid", weight: 7, pays: [1, 4, 16], art: tile("bell") },
      { id: "grapes", label: "Trauben", kind: "high", weight: 5, pays: [2, 8, 40], art: tile("grapes") },
      { id: "star", label: "Stern", kind: "high", weight: 3, pays: [5, 20, 80], art: tile("star") },
      { id: "wild", label: "Wild", kind: "wild", weight: 5, pays: [5, 20, 80], art: tile("wild") },
    ];
  }
  if (theme === "chance") {
    return [
      { id: "cherry", label: "Kirsche", kind: "low", weight: 16, pays: [2, 8, 20], pays2: 1, art: tile("cherry") },
      { id: "lemon", label: "Zitrone", kind: "low", weight: 14, pays: [2, 8, 24], pays2: 0.8, art: tile("lemon") },
      { id: "plum", label: "Pflaume", kind: "mid", weight: 12, pays: [3, 10, 30], pays2: 1, art: tile("plum") },
      { id: "orange", label: "Orange", kind: "mid", weight: 10, pays: [4, 12, 40], pays2: 1, art: tile("orange") },
      { id: "bell", label: "Glocke", kind: "high", weight: 7, pays: [8, 25, 80], pays2: 2, art: tile("bell") },
      { id: "bar", label: "BAR", kind: "high", weight: 5, pays: [12, 40, 150], pays2: 3, art: tile("bar") },
      { id: "seven", label: "Sieben", kind: "high", weight: 3, pays: [25, 100, 400], pays2: 4, art: tile("seven") },
    ];
  }
  if (theme === "sizzle") {
    return [
      { id: "cherry", label: "Kirsche", kind: "low", weight: 16, pays: [4, 20, 100], pays2: 1, art: tile("cherry") },
      { id: "lemon", label: "Zitrone", kind: "low", weight: 14, pays: [4, 20, 80], art: tile("lemon") },
      { id: "plum", label: "Pflaume", kind: "low", weight: 13, pays: [4, 20, 80], art: tile("plum") },
      { id: "orange", label: "Orange", kind: "mid", weight: 10, pays: [8, 40, 150], art: tile("orange") },
      { id: "bell", label: "Glocke", kind: "mid", weight: 8, pays: [10, 50, 200], art: tile("bell") },
      { id: "melon", label: "Melone", kind: "high", weight: 5, pays: [20, 100, 400], art: tile("melon") },
      { id: "seven", label: "Sieben", kind: "high", weight: 3, pays: [100, 1000, 5000], pays2: 5, art: tile("seven") },
    ];
  }
  if (theme === "lucky") {
    return [
      low("j", "J", 11, [0.8, 4, 16]),
      low("q", "Q", 11, [0.8, 4, 16]),
      low("k", "K", 10, [1, 5, 20]),
      low("a", "A", 10, [1, 5, 20]),
      { id: "horseshoe", label: "Hufeisen", kind: "mid", weight: 6, pays: [2, 10, 40], art: "/games/sym/lucky-horseshoe.jpg" },
      { id: "chest", label: "Truhe", kind: "mid", weight: 5, pays: [3, 15, 60], art: "/games/sym/lucky-chest.jpg" },
      { id: "wild", label: "Klee", kind: "wild", weight: 3, pays: [10, 50, 250], art: "/games/sym/lucky-clover.jpg" },
      { id: "scatter", label: "Dame", kind: "scatter", weight: 3, pays: [2, 10, 50], art: "/games/sym/lucky-lady.jpg" },
    ];
  }
  return [
    low("j", "J", 11, [0.8, 3.5, 14]),
    low("q", "Q", 11, [0.8, 3.5, 14]),
    low("k", "K", 10, [1, 4.5, 18]),
    low("a", "A", 10, [1, 4.5, 18]),
    mid("amethyst", "Amethyst", 6, [2, 8, 35]),
    mid("emerald", "Smaragd", 5, [3, 12, 50]),
    high("ruby", "Rubin", 4, [6, 25, 100]),
    high("sapphire", "Saphir", 3, [12, 50, 220]),
    { id: "wild", label: "Diamant", kind: "wild", weight: 2, pays: [10, 40, 200], art: tile("wild") },
    { id: "scatter", label: "Tresor", kind: "scatter", weight: 3, pays: [5, 20, 100], art: tile("scatter") },
  ];
}

const SHARED = {
  reels: 5 as const,
  rows: 3 as const,
  paylines: TEN_LINES,
  betSteps: [20, 50, 100, 200, 500, 1000, 2500, 5000],
  defaultBet: 100,
  freeSpinsFrom: 3,
  pityAfter: 14,
};

/** Book of Ra-style strips: 1–2 books per reel, pictures not stacked. */
const EGYPT_STRIPS: string[][] = [
  ["j", "q", "k", "a", "ankh", "j", "eye", "q", "k", "scatter", "a", "j", "scarab", "q", "k", "a", "ankh", "j", "pharaoh", "q", "k", "eye", "a", "j", "q", "ankh", "k"],
  ["q", "k", "a", "j", "eye", "q", "ankh", "k", "a", "j", "scarab", "q", "scatter", "k", "a", "j", "eye", "q", "pharaoh", "k", "a", "ankh", "j", "q", "k", "eye", "a"],
  ["k", "a", "j", "q", "ankh", "k", "eye", "a", "j", "scarab", "q", "k", "a", "scatter", "j", "q", "ankh", "k", "pharaoh", "a", "j", "eye", "q", "k", "a", "ankh", "j"],
  ["a", "j", "q", "k", "eye", "a", "ankh", "j", "q", "scarab", "k", "a", "j", "scatter", "q", "k", "eye", "a", "pharaoh", "j", "q", "ankh", "k", "a", "j", "eye", "q"],
  ["j", "k", "a", "q", "ankh", "j", "eye", "k", "a", "scatter", "q", "j", "scarab", "k", "a", "q", "ankh", "j", "pharaoh", "k", "a", "eye", "q", "j", "k", "ankh", "a"],
];

/** Magic Mirror strips — Spiegel as scatter/wild, lady & unicorn sparse. */
const MIRROR_STRIPS: string[][] = [
  ["j", "q", "k", "a", "rune", "j", "tablet", "q", "k", "scatter", "a", "j", "unicorn", "q", "k", "a", "rune", "j", "mage", "q", "k", "tablet", "a", "j", "q", "rune", "k"],
  ["q", "k", "a", "j", "tablet", "q", "rune", "k", "a", "j", "unicorn", "q", "scatter", "k", "a", "j", "tablet", "q", "mage", "k", "a", "rune", "j", "q", "k", "tablet", "a"],
  ["k", "a", "j", "q", "rune", "k", "tablet", "a", "j", "unicorn", "q", "k", "a", "scatter", "j", "q", "rune", "k", "mage", "a", "j", "tablet", "q", "k", "a", "rune", "j"],
  ["a", "j", "q", "k", "tablet", "a", "rune", "j", "q", "unicorn", "k", "a", "j", "scatter", "q", "k", "tablet", "a", "mage", "j", "q", "rune", "k", "a", "j", "tablet", "q"],
  ["j", "k", "a", "q", "rune", "j", "tablet", "k", "a", "scatter", "q", "j", "unicorn", "k", "a", "q", "rune", "j", "mage", "k", "a", "tablet", "q", "j", "k", "rune", "a"],
];

/** Sizzling Hot-style: sevens rare, cherries common, no stacks of sevens. */
const SIZZLE_STRIPS: string[][] = [
  ["cherry", "lemon", "plum", "orange", "cherry", "bell", "lemon", "seven", "plum", "melon", "cherry", "orange", "lemon", "plum", "bell", "cherry", "orange", "melon", "lemon", "plum", "cherry", "bell", "orange", "lemon", "plum"],
  ["lemon", "plum", "cherry", "orange", "bell", "lemon", "plum", "melon", "cherry", "orange", "lemon", "seven", "plum", "bell", "cherry", "orange", "lemon", "plum", "melon", "cherry", "bell", "orange", "lemon", "plum", "cherry"],
  ["plum", "orange", "cherry", "lemon", "melon", "plum", "bell", "orange", "cherry", "lemon", "plum", "orange", "seven", "cherry", "bell", "lemon", "plum", "melon", "orange", "cherry", "lemon", "bell", "plum", "orange", "cherry"],
  ["orange", "cherry", "lemon", "plum", "bell", "orange", "cherry", "melon", "lemon", "plum", "orange", "bell", "cherry", "seven", "lemon", "plum", "orange", "melon", "cherry", "bell", "lemon", "plum", "orange", "cherry", "lemon"],
  ["cherry", "plum", "orange", "lemon", "bell", "cherry", "plum", "seven", "orange", "melon", "lemon", "cherry", "plum", "bell", "orange", "lemon", "cherry", "melon", "plum", "orange", "bell", "lemon", "cherry", "plum", "orange"],
];

/** Always Hot Deluxe: star on cream, cherries common, all 5 lines live. */
const ALWAYS_STRIPS: string[][] = [
  ["cherry", "lemon", "plum", "orange", "cherry", "bell", "lemon", "star", "plum", "grapes", "cherry", "orange", "lemon", "plum", "bell", "cherry", "orange", "grapes", "lemon", "plum", "cherry", "bell", "orange", "lemon", "plum"],
  ["lemon", "plum", "cherry", "orange", "bell", "lemon", "plum", "grapes", "cherry", "orange", "lemon", "star", "plum", "bell", "cherry", "orange", "lemon", "plum", "grapes", "cherry", "bell", "orange", "lemon", "plum", "cherry"],
  ["plum", "orange", "cherry", "lemon", "grapes", "plum", "bell", "orange", "cherry", "lemon", "plum", "orange", "star", "cherry", "bell", "lemon", "plum", "grapes", "orange", "cherry", "lemon", "bell", "plum", "orange", "cherry"],
  ["orange", "cherry", "lemon", "plum", "bell", "orange", "cherry", "grapes", "lemon", "plum", "orange", "bell", "cherry", "star", "lemon", "plum", "orange", "grapes", "cherry", "bell", "lemon", "plum", "orange", "cherry", "lemon"],
  ["cherry", "plum", "orange", "lemon", "bell", "cherry", "plum", "star", "orange", "grapes", "lemon", "cherry", "plum", "bell", "orange", "lemon", "cherry", "grapes", "plum", "orange", "bell", "lemon", "cherry", "plum", "orange"],
];

/** Just Jewels: five gems, diamond sparse. */
const JEWEL_STRIPS: string[][] = [
  ["amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "diamond", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby"],
  ["emerald", "sapphire", "ruby", "amethyst", "emerald", "diamond", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst"],
  ["sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "diamond", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald"],
  ["ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "diamond", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire", "ruby", "amethyst", "emerald", "sapphire"],
  ["amethyst", "sapphire", "emerald", "ruby", "amethyst", "sapphire", "diamond", "emerald", "ruby", "amethyst", "sapphire", "emerald", "ruby", "amethyst", "sapphire", "emerald", "ruby", "amethyst", "sapphire", "emerald", "ruby", "amethyst", "sapphire", "emerald", "ruby"],
];

/** Blazing Star-style: star sparse, fruit on black. */
const BLAZE_STRIPS: string[][] = [
  ["cherry", "lemon", "plum", "orange", "grapes", "cherry", "melon", "lemon", "plum", "star", "orange", "cherry", "grapes", "lemon", "plum", "melon", "cherry", "orange", "lemon", "grapes", "plum", "cherry", "melon", "orange", "lemon"],
  ["lemon", "plum", "orange", "cherry", "melon", "lemon", "grapes", "plum", "orange", "cherry", "star", "lemon", "melon", "plum", "grapes", "orange", "cherry", "lemon", "plum", "melon", "orange", "grapes", "cherry", "lemon", "plum"],
  ["plum", "orange", "cherry", "lemon", "grapes", "plum", "melon", "orange", "cherry", "lemon", "grapes", "star", "plum", "melon", "orange", "cherry", "lemon", "grapes", "plum", "melon", "orange", "cherry", "lemon", "grapes", "plum"],
  ["orange", "cherry", "lemon", "plum", "melon", "orange", "grapes", "cherry", "lemon", "plum", "melon", "orange", "star", "grapes", "cherry", "lemon", "plum", "melon", "orange", "grapes", "lemon", "cherry", "plum", "melon", "orange"],
  ["cherry", "orange", "plum", "lemon", "grapes", "cherry", "melon", "orange", "plum", "star", "lemon", "grapes", "cherry", "melon", "orange", "plum", "lemon", "grapes", "cherry", "melon", "plum", "orange", "lemon", "grapes", "cherry"],
];

/** Triple Chance 3-reel strips. */
const CHANCE_STRIPS: string[][] = [
  ["cherry", "lemon", "plum", "orange", "bell", "cherry", "bar", "lemon", "plum", "seven", "orange", "bell", "cherry", "lemon", "bar", "plum", "orange", "bell", "cherry", "lemon", "plum", "bar", "orange", "bell", "cherry"],
  ["lemon", "plum", "orange", "cherry", "bar", "lemon", "bell", "plum", "seven", "orange", "cherry", "bar", "lemon", "bell", "plum", "orange", "cherry", "bar", "lemon", "bell", "plum", "orange", "cherry", "bell", "lemon"],
  ["plum", "orange", "cherry", "lemon", "bell", "bar", "plum", "orange", "cherry", "seven", "lemon", "bell", "bar", "plum", "orange", "cherry", "lemon", "bell", "bar", "plum", "orange", "cherry", "lemon", "bell", "plum"],
];

export const SLOT_DEFS: Record<string, SlotDef> = {
  "pharaos-erbe": {
    ...SHARED,
    slug: "pharaos-erbe",
    symbols: ranks("egypt"),
    freeSpinCount: 10,
    bookWild: true,
    expandingSpecial: true,
    fsMultiplier: 1,
    mechanic: "book",
    strips: EGYPT_STRIPS,
  },
  nordlicht: {
    ...SHARED,
    slug: "nordlicht",
    symbols: ranks("nordic"),
    freeSpinCount: 10,
    expandingSpecial: false,
    fsMultiplier: 3,
    mechanic: "sticky",
  },
  kirschkoenig: {
    ...SHARED,
    slug: "kirschkoenig",
    symbols: ranks("fruit"),
    betSteps: [20, 50, 100, 200, 500, 1000, 2500],
    defaultBet: 50,
    freeSpinCount: 8,
    fsMultiplier: 2,
    pityAfter: 12,
    mechanic: "gamble",
  },
  saphirnacht: {
    ...SHARED,
    slug: "saphirnacht",
    symbols: ranks("gem"),
    freeSpinCount: 8,
    expandingSpecial: true,
    fsMultiplier: 2,
    mechanic: "gems",
    gemTarget: 12,
  },
  "huff-und-puff": {
    ...SHARED,
    slug: "huff-und-puff",
    symbols: ranks("huff"),
    freeSpinsFrom: 6,
    freeSpinCount: 6,
    pityAfter: 14,
    fsMultiplier: 1,
  },
  "neon-drift": {
    ...SHARED,
    slug: "neon-drift",
    symbols: ranks("neon"),
    freeSpinCount: 8,
    fsMultiplier: 1,
    pityAfter: 12,
    mechanic: "ways",
    tumble: true,
  },
  drachenfeuer: {
    ...SHARED,
    slug: "drachenfeuer",
    symbols: ranks("dragon"),
    freeSpinCount: 10,
    expandingSpecial: false,
    fsMultiplier: 2,
    mechanic: "firelink",
    firelinkFrom: 5,
    pityAfter: 16,
  },
  flammenstern: {
    ...SHARED,
    slug: "flammenstern",
    symbols: ranks("blaze"),
    paylines: FIVE_LINES,
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "leiter",
    leiter: true,
    allPays2: true,
    pityAfter: 10,
    strips: BLAZE_STRIPS,
  },
  "extra-safe": {
    ...SHARED,
    slug: "extra-safe",
    symbols: ranks("extra"),
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "leiter",
    leiter: true,
    paysBothWays: true,
    wildMults: WILD_MULTS,
    pityAfter: 12,
  },
  zauberspiegel: {
    ...SHARED,
    slug: "zauberspiegel",
    symbols: ranks("mirror"),
    freeSpinCount: 10,
    bookWild: true,
    expandingSpecial: true,
    fsMultiplier: 1,
    mechanic: "book",
    leiter: true,
    strips: MIRROR_STRIPS,
  },
  "multi-wild": {
    ...SHARED,
    slug: "multi-wild",
    symbols: ranks("multi"),
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "ways",
    stackedWilds: true,
    leiter: true,
    pityAfter: 10,
  },
  "triple-chance": {
    ...SHARED,
    slug: "triple-chance",
    reels: 3,
    paylines: THREE_LINES,
    symbols: ranks("chance"),
    betSteps: [20, 50, 100, 200, 500, 1000],
    defaultBet: 50,
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "hold",
    leiter: true,
    allPays2: true,
    pityAfter: 8,
    strips: CHANCE_STRIPS,
  },
  "heisse-fruechte": {
    ...SHARED,
    slug: "heisse-fruechte",
    symbols: ranks("sizzle"),
    paylines: FIVE_LINES,
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "leiter",
    leiter: true,
    allPays2: false,
    pityAfter: 10,
    strips: SIZZLE_STRIPS,
  },
  gluecksklee: {
    ...SHARED,
    slug: "gluecksklee",
    symbols: ranks("lucky"),
    freeSpinCount: 15,
    expandingSpecial: false,
    fsMultiplier: 1,
    mechanic: "leiter",
    leiter: true,
    pityAfter: 12,
  },
  "olymp-tor": OLYMP_DEF,
  "bonbon-regen": BONBON_DEF,
  raubfisch: FISH_DEF,
  goldwolf: {
    ...SHARED,
    slug: "goldwolf",
    symbols: [
      { id: "j", label: "J", kind: "low", weight: 12, pays: [0.4, 1.2, 5], art: "/games/sym/wolf-j.jpg" },
      { id: "q", label: "Q", kind: "low", weight: 12, pays: [0.4, 1.2, 5], art: "/games/sym/wolf-q.jpg" },
      { id: "k", label: "K", kind: "low", weight: 10, pays: [0.6, 2, 8], art: "/games/sym/wolf-k.jpg" },
      { id: "a", label: "A", kind: "low", weight: 10, pays: [0.6, 2, 8], art: "/games/sym/wolf-a.jpg" },
      { id: "ruby", label: "Mond", kind: "mid", weight: 7, pays: [1.2, 5, 16], art: "/games/sym/wolf-moon.jpg" },
      { id: "wild", label: "Wolf", kind: "wild", weight: 3, pays: [4, 16, 60], art: "/games/sym/wolf-wild.jpg" },
      { id: "coin", label: "Münze", kind: "high", weight: 7, pays: [0, 0, 0], art: "/games/sym/wolf-coin.jpg" },
    ],
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    expandingSpecial: false,
    fsMultiplier: 1,
    mechanic: "firelink",
    firelinkFrom: 6,
    pityAfter: 10,
  },
  sternenblitz: {
    ...SHARED,
    slug: "sternenblitz",
    reels: 5,
    rows: 3,
    paylines: TEN_LINES,
    symbols: [
      { id: "blue", label: "Saphir", kind: "low", weight: 16, pays: [0.3, 1, 3], art: "/games/sym/burst-blue.jpg" },
      { id: "green", label: "Smaragd", kind: "low", weight: 14, pays: [0.4, 1.2, 4], art: "/games/sym/burst-green.jpg" },
      { id: "yellow", label: "Topas", kind: "low", weight: 12, pays: [0.5, 1.5, 5], art: "/games/sym/burst-yellow.jpg" },
      { id: "purple", label: "Amethyst", kind: "mid", weight: 10, pays: [0.8, 2, 8], art: "/games/sym/burst-purple.jpg" },
      { id: "red", label: "Rubin", kind: "mid", weight: 8, pays: [1, 3, 10], art: "/games/sym/burst-red.jpg" },
      { id: "ring", label: "Krone", kind: "high", weight: 5, pays: [2, 8, 20], art: "/games/sym/burst-crown.jpg" },
      { id: "star", label: "Stern", kind: "wild", weight: 4, pays: [0, 0, 0], art: "/games/sym/burst-star.jpg" },
    ],
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    expandingSpecial: false,
    fsMultiplier: 1,
    mechanic: "burst",
    paysBothWays: true,
    wildReels: [1, 2, 3],
    pityAfter: 10,
  },
  "immer-heiss": {
    ...SHARED,
    slug: "immer-heiss",
    symbols: [
      { id: "cherry", label: "Kirsche", kind: "low", weight: 16, pays: [5, 20, 100], pays2: 2, art: "/games/sym/always-cherry.jpg" },
      { id: "lemon", label: "Zitrone", kind: "low", weight: 14, pays: [5, 20, 80], art: "/games/sym/always-lemon.jpg" },
      { id: "plum", label: "Pflaume", kind: "low", weight: 13, pays: [5, 20, 80], art: "/games/sym/always-plum.jpg" },
      { id: "orange", label: "Orange", kind: "mid", weight: 10, pays: [8, 40, 150], art: "/games/sym/always-orange.jpg" },
      { id: "bell", label: "Glocke", kind: "mid", weight: 8, pays: [10, 50, 200], art: "/games/sym/always-bell.jpg" },
      { id: "grapes", label: "Trauben", kind: "high", weight: 5, pays: [20, 100, 400], art: "/games/sym/always-grapes.jpg" },
      { id: "star", label: "Stern", kind: "high", weight: 3, pays: [100, 1000, 5000], pays2: 10, art: "/games/sym/always-star.jpg" },
    ],
    paylines: FIVE_LINES,
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "leiter",
    leiter: true,
    allPays2: false,
    pityAfter: 10,
    strips: ALWAYS_STRIPS,
  },
  "nur-juwelen": {
    ...SHARED,
    slug: "nur-juwelen",
    symbols: [
      { id: "amethyst", label: "Amethyst", kind: "low", weight: 16, pays: [2, 8, 30], art: "/games/sym/jewel-amethyst.jpg" },
      { id: "emerald", label: "Smaragd", kind: "low", weight: 14, pays: [3, 12, 40], art: "/games/sym/jewel-emerald.jpg" },
      { id: "sapphire", label: "Saphir", kind: "mid", weight: 12, pays: [4, 16, 60], art: "/games/sym/jewel-sapphire.jpg" },
      { id: "ruby", label: "Rubin", kind: "high", weight: 8, pays: [8, 30, 120], art: "/games/sym/jewel-ruby.jpg" },
      { id: "diamond", label: "Diamant", kind: "high", weight: 4, pays: [20, 80, 400], pays2: 2, art: "/games/sym/jewel-diamond.jpg" },
    ],
    paylines: FIVE_LINES,
    freeSpinsFrom: 99,
    freeSpinCount: 0,
    fsMultiplier: 1,
    mechanic: "leiter",
    leiter: true,
    allPays2: false,
    pityAfter: 10,
    strips: JEWEL_STRIPS,
  },
};

// Original Aurelia variants. These use the shared evaluator, but have their own
// symbol sets and payout profiles instead of aliasing another game's definition.
SLOT_DEFS["goldene-halle"] = {
  ...SHARED,
  slug: "goldene-halle",
  symbols: [
    { id: "sun", label: "Sonne", kind: "low", weight: 16, pays: [0.4, 1.5, 6], pays2: 1 },
    { id: "bell", label: "Glocke", kind: "low", weight: 14, pays: [0.5, 2, 8], pays2: 1 },
    { id: "crown", label: "Krone", kind: "mid", weight: 11, pays: [0.8, 3, 12], pays2: 2 },
    { id: "coin", label: "Goldmünze", kind: "mid", weight: 8, pays: [1, 4, 18], pays2: 2 },
    { id: "seven", label: "Sieben", kind: "high", weight: 5, pays: [2, 8, 35], pays2: 3 },
    { id: "wild", label: "Goldwild", kind: "wild", weight: 3, pays: [3, 12, 60] },
    { id: "star", label: "Stern", kind: "scatter", weight: 3, pays: [0, 0, 0] },
  ],
  paylines: FIVE_LINES,
  freeSpinCount: 8,
  freeSpinsFrom: 3,
  betSteps: [20, 50, 100, 200, 500, 1000, 2500],
  defaultBet: 50,
  fsMultiplier: 2,
  mechanic: "leiter",
  leiter: true,
  allPays2: true,
  pityAfter: 10,
};
SLOT_DEFS["nova-fruits"] = {
  ...SHARED,
  slug: "nova-fruits",
  symbols: [
    { id: "berry", label: "Beere", kind: "low", weight: 14, pays: [0.4, 1.2, 5] },
    { id: "lime", label: "Limette", kind: "low", weight: 13, pays: [0.5, 1.5, 6] },
    { id: "peach", label: "Pfirsich", kind: "mid", weight: 10, pays: [0.8, 2.5, 10] },
    { id: "prism", label: "Prisma", kind: "high", weight: 7, pays: [1.2, 4, 18] },
    { id: "collector", label: "Sammler", kind: "wild", weight: 3, pays: [2, 8, 30] },
    { id: "coin", label: "Fruchtmünze", kind: "high", weight: 6, pays: [0, 0, 0] },
  ],
  freeSpinCount: 0,
  fsMultiplier: 1,
  paylines: TEN_LINES,
  mechanic: "firelink",
  firelinkFrom: 4,
  pityAfter: 10,
};
SLOT_DEFS["neon-sentinel"] = {
  ...SHARED,
  slug: "neon-sentinel",
  symbols: [
    { id: "pulse", label: "Puls", kind: "low", weight: 14, pays: [0.4, 1.5, 6] },
    { id: "chip", label: "Chip", kind: "low", weight: 12, pays: [0.5, 2, 8] },
    { id: "visor", label: "Visier", kind: "mid", weight: 9, pays: [0.8, 3, 12] },
    { id: "core", label: "Kern", kind: "high", weight: 6, pays: [1.2, 5, 20] },
    { id: "sentinel", label: "Sentinel", kind: "wild", weight: 3, pays: [3, 12, 45] },
    { id: "signal", label: "Signal", kind: "scatter", weight: 3, pays: [0, 0, 0] },
  ],
  freeSpinsFrom: 3,
  freeSpinCount: 10,
  fsMultiplier: 2,
  mechanic: "ways",
  tumble: true,
  pityAfter: 11,
};
SLOT_DEFS["royal-risk"] = {
  ...SHARED,
  slug: "royal-risk",
  symbols: [
    { id: "heart", label: "Herz", kind: "low", weight: 15, pays: [0.4, 1.2, 5], pays2: 1 },
    { id: "diamond", label: "Karo", kind: "low", weight: 13, pays: [0.5, 1.6, 7], pays2: 1 },
    { id: "club", label: "Kreuz", kind: "mid", weight: 10, pays: [0.8, 2.5, 10], pays2: 2 },
    { id: "spade", label: "Pik", kind: "mid", weight: 8, pays: [1, 3, 14], pays2: 2 },
    { id: "royal", label: "Royal", kind: "high", weight: 5, pays: [2, 7, 30], pays2: 3 },
    { id: "joker", label: "Joker", kind: "wild", weight: 3, pays: [3, 12, 55] },
  ],
  paylines: FIVE_LINES,
  freeSpinsFrom: 99,
  freeSpinCount: 0,
  fsMultiplier: 1,
  mechanic: "gamble",
  leiter: true,
  pityAfter: 11,
};

export function randomSymbol(def: SlotDef, allowScatter = true): SlotSymbol {
  const pool = allowScatter ? def.symbols : def.symbols.filter((s) => s.kind !== "scatter");
  const s = weightedPick(pool);
  if (s.kind === "wild" && def.wildMults && def.wildMults.length) {
    return { ...s, wildMult: def.wildMults[randInt(def.wildMults.length)] };
  }
  if (s.id === "fish") {
    return { ...s, wildMult: pickCoinValue().mult };
  }
  return s;
}

export function spinGrid(def: SlotDef, forceScatters = 0): SlotSymbol[][] {
  const grid: SlotSymbol[][] = [];
  for (let r = 0; r < def.reels; r++) {
    const strip = materializeStrip(def, r);
    if (strip.length >= def.rows) {
      const start = randInt(strip.length);
      grid.push(Array.from({ length: def.rows }, (_, row) => strip[(start + row) % strip.length]!));
    } else {
      const col: SlotSymbol[] = [];
      for (let row = 0; row < def.rows; row++) {
        let s = randomSymbol(def);
        if (s.kind === "wild" && def.wildReels && !def.wildReels.includes(r)) {
          s = weightedPick(def.symbols.filter((x) => x.kind !== "wild" && x.kind !== "scatter"));
        }
        col.push(s);
      }
      grid.push(col);
    }
  }
  if (forceScatters > 0) {
    const scatter = def.symbols.find((s) => s.kind === "scatter");
    if (scatter) {
      for (let i = 0; i < forceScatters && i < def.reels; i++) {
        grid[i]![1] = scatter;
      }
    }
  }
  if (def.stackedWilds) {
    const wild = def.symbols.find((s) => s.kind === "wild");
    if (wild) {
      for (let r = 0; r < def.reels; r++) {
        if (Math.random() < 0.1) grid[r] = Array.from({ length: def.rows }, () => wild);
      }
    }
  }
  return grid;
}

/** Reel strip for painting: PAD symbols before the window, then the landed 3, then 1 after. */
export function paintStrip(def: SlotDef, col: SlotSymbol[], reel: number, pad: number): SlotSymbol[] {
  const strip = materializeStrip(def, reel);
  if (strip.length < def.rows) {
    return [...randomPad(def, pad), ...col, randomSymbol(def, false)];
  }
  let start = randInt(strip.length);
  for (let i = 0; i < strip.length; i++) {
    if (
      strip[i]!.id === col[0]!.id &&
      strip[(i + 1) % strip.length]!.id === col[1]!.id &&
      strip[(i + 2) % strip.length]!.id === col[2]!.id
    ) {
      start = i;
      break;
    }
  }
  const out: SlotSymbol[] = [];
  for (let i = -pad; i <= col.length; i++) {
    out.push(strip[(start + i + strip.length * 8) % strip.length]!);
  }
  return out;
}

export function materializeStrip(def: SlotDef, reel: number): SlotSymbol[] {
  const pattern = def.strips?.[reel] ?? def.strips?.[0];
  if (!pattern?.length) return [];
  const map = new Map(def.symbols.map((s) => [s.id, s]));
  const out: SlotSymbol[] = [];
  for (const id of pattern) {
    const s = map.get(id);
    if (s) out.push(s);
  }
  return out;
}

function isWild(s: SlotSymbol, def: SlotDef): boolean {
  if (s.kind === "wild") return true;
  if (def.bookWild && s.kind === "scatter") return true;
  return false;
}

export function specialPool(def: SlotDef): SlotSymbol[] {
  return def.symbols.filter((s) => s.kind !== "wild" && s.kind !== "scatter");
}

export function pickSpecial(def: SlotDef): SlotSymbol {
  const pool = specialPool(def);
  return pool[randInt(pool.length)]!;
}

export function reelsWithSymbol(grid: SlotSymbol[][], id: string): number[] {
  const out: number[] = [];
  grid.forEach((col, i) => {
    if (col.some((s) => s.id === id)) out.push(i);
  });
  return out;
}

/** Book of Ra / Magic Mirror: symbols that pay 2-of-a-kind expand from 2, the rest from 3. */
export function expandMinCount(special: SlotSymbol): number {
  return special.pays2 ? 2 : 3;
}

export function expandGrid(
  grid: SlotSymbol[][],
  special: SlotSymbol,
  minCount = 1,
): { grid: SlotSymbol[][]; expandedReels: number[] } {
  const hits = reelsWithSymbol(grid, special.id);
  if (hits.length < minCount) return { grid, expandedReels: [] };
  const expandedReels = hits;
  const next = grid.map((col, i) => (hits.includes(i) ? col.map(() => special) : col));
  return { grid: next, expandedReels };
}

/** Expanding special pays on every line, even when reels are not adjacent. */
export function scoreExpanding(
  def: SlotDef,
  grid: SlotSymbol[][],
  special: SlotSymbol,
  stake: number,
  multiplier = 1,
): LineWin | null {
  const reels = reelsWithSymbol(grid, special.id);
  const count = reels.length;
  if (count < expandMinCount(special)) return null;
  let pay = 0;
  if (count === 2) pay = special.pays2 ?? 0;
  else pay = special.pays[Math.min(count, 5) - 3] ?? 0;
  if (pay <= 0) return null;
  const cells: Cell[] = [];
  reels.forEach((reel) => {
    for (let row = 0; row < def.rows; row++) cells.push({ symbol: special, reel, row });
  });
  const lines = def.paylines.length;
  const payout = Math.round(stake * pay * multiplier * lines);
  return { line: 0, symbol: special, count, cells, payout, expanding: true, ways: lines };
}

export function evaluateBookSpin(
  def: SlotDef,
  raw: SlotSymbol[][],
  special: SlotSymbol,
  stake: number,
  multiplier = 1,
): SpinResult {
  const base = evaluateSpin(def, raw, stake, multiplier);
  const min = expandMinCount(special);
  const exp = expandGrid(raw, special, min);
  const extra = scoreExpanding(def, raw, special, stake, multiplier);
  const lines = base.lineWins.filter((w) => w.symbol.id !== special.id);
  if (extra) lines.push(extra);
  const totalPayout = lines.reduce((s, w) => s + w.payout, 0) + base.scatterPayout;
  return {
    ...base,
    grid: extra ? exp.grid : raw,
    lineWins: lines,
    totalPayout,
    expandedReels: extra ? exp.expandedReels : [],
  };
}

export function evaluateSpin(
  def: SlotDef,
  grid: SlotSymbol[][],
  stake: number,
  multiplier = 1,
  activeLines?: number,
): SpinResult {
  if (def.mechanic === "ways") return evaluateWays(def, grid, stake, multiplier);

  const lineWins: LineWin[] = [];
  const n = Math.max(1, Math.min(def.paylines.length, activeLines ?? def.paylines.length));
  def.paylines.slice(0, n).forEach((line, lineIndex) => {
    const fwd = scoreLine(def, grid, line, lineIndex, stake, multiplier, false);
    if (fwd) lineWins.push(fwd);
    if (def.paysBothWays) {
      const back = scoreLine(def, grid, line, lineIndex, stake, multiplier, true);
      if (back && !(fwd && fwd.count === def.reels && back.count === def.reels && fwd.symbol.id === back.symbol.id)) {
        lineWins.push({ ...back, line: lineIndex + 100 });
      }
    }
  });

  return withScatters(def, grid, stake, multiplier, lineWins);
}

function scoreLine(
  def: SlotDef,
  grid: SlotSymbol[][],
  line: number[],
  lineIndex: number,
  stake: number,
  multiplier: number,
  reverse: boolean,
): LineWin | null {
  const cells: Cell[] = line.map((row, reel) => ({
    symbol: grid[reel]![row]!,
    reel,
    row,
  }));
  const ordered = reverse ? cells.slice().reverse() : cells;
  const first = ordered.find((c) => c.symbol.kind !== "scatter" && !isWild(c.symbol, def));
  const target = first?.symbol ?? (isWild(ordered[0]!.symbol, def) ? ordered[0]!.symbol : null);
  if (!target || target.kind === "scatter") return null;
  let count = 0;
  for (const cell of ordered) {
    const s = cell.symbol;
    if (s.kind === "scatter" && !def.bookWild) break;
    if (isWild(s, def) || s.id === target.id) count += 1;
    else break;
  }
  if (count < 2) return null;
  let pay = 0;
  if (count === 2) {
    const p2 = target.pays2 ?? (def.allPays2 ? (target.pays[0] ?? 0) * 0.25 : 0);
    if (p2 <= 0) return null;
    pay = p2;
  } else {
    pay = target.pays[Math.min(count, 5) - 3] ?? 0;
  }
  if (pay <= 0) return null;
  const used = ordered.slice(0, count);
  let wmult = 1;
  if (def.wildMults) {
    for (const c of used) {
      if (c.symbol.kind === "wild" && c.symbol.wildMult) wmult *= c.symbol.wildMult;
    }
  }
  const payout = Math.round(stake * pay * multiplier * wmult);
  if (payout <= 0) return null;
  return { line: lineIndex, symbol: target, count, cells: used, payout };
}

export function evaluateWays(
  def: SlotDef,
  grid: SlotSymbol[][],
  stake: number,
  multiplier = 1,
): SpinResult {
  const lineWins: LineWin[] = [];
  const paying = def.symbols.filter((s) => s.kind !== "scatter" && s.kind !== "wild");
  paying.forEach((target, idx) => {
    const cells: Cell[] = [];
    const perReel: number[] = [];
    for (let r = 0; r < def.reels; r++) {
      let n = 0;
      for (let row = 0; row < def.rows; row++) {
        const s = grid[r]![row]!;
        if (s.id === target.id || s.kind === "wild") {
          n += 1;
          cells.push({ symbol: s, reel: r, row });
        }
      }
      if (n === 0) break;
      perReel.push(n);
    }
    const count = perReel.length;
    if (count < 3) return;
    const ways = perReel.reduce((a, b) => a * b, 1);
    const pay = target.pays[Math.min(count, 5) - 3] ?? 0;
    const payout = Math.round(stake * pay * ways * multiplier);
    if (payout <= 0) return;
    lineWins.push({
      line: idx,
      symbol: target,
      count,
      cells,
      payout,
      ways,
    });
  });
  return withScatters(def, grid, stake, multiplier, lineWins);
}

function withScatters(
  def: SlotDef,
  grid: SlotSymbol[][],
  stake: number,
  multiplier: number,
  lineWins: LineWin[],
): SpinResult {
  let scatterCount = 0;
  for (const col of grid) for (const s of col) if (s.kind === "scatter") scatterCount += 1;
  const scatterSym = def.symbols.find((s) => s.kind === "scatter");
  let scatterPayout = 0;
  if (scatterSym && scatterCount >= 3 && scatterSym.pays[0] > 0) {
    scatterPayout = Math.round(stake * scatterSym.pays[Math.min(scatterCount, 5) - 3]! * multiplier);
  }
  const freeSpinsAwarded = scatterCount >= def.freeSpinsFrom ? def.freeSpinCount : 0;
  const totalPayout = lineWins.reduce((s, w) => s + w.payout, 0) + scatterPayout;
  return { grid, lineWins, scatterCount, scatterPayout, totalPayout, freeSpinsAwarded, expandedReels: [] };
}

export function winningCellKeys(result: SpinResult): Set<string> {
  const set = new Set<string>();
  result.lineWins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
  if (result.scatterCount >= 3) {
    result.grid.forEach((col, ri) =>
      col.forEach((s, row) => {
        if (s.kind === "scatter") set.add(`${ri}-${row}`);
      }),
    );
  }
  return set;
}

export function dropAndFill(def: SlotDef, grid: SlotSymbol[][], vanish: Set<string>): SlotSymbol[][] {
  return grid.map((col, r) => {
    const kept: SlotSymbol[] = [];
    for (let row = 0; row < def.rows; row++) {
      if (!vanish.has(`${r}-${row}`)) kept.push(col[row]!);
    }
    const fill = def.rows - kept.length;
    const news = Array.from({ length: fill }, () => randomSymbol(def, true));
    return [...news, ...kept];
  });
}

export function applySticky(grid: SlotSymbol[][], frozen: Set<string>, wild: SlotSymbol): SlotSymbol[][] {
  return grid.map((col, r) => col.map((s, row) => (frozen.has(`${r}-${row}`) ? wild : s)));
}

export function collectWildKeys(grid: SlotSymbol[][]): string[] {
  const out: string[] = [];
  grid.forEach((col, r) =>
    col.forEach((s, row) => {
      if (s.kind === "wild") out.push(`${r}-${row}`);
    }),
  );
  return out;
}

export function isFireCoin(s: SlotSymbol, def: SlotDef): boolean {
  return def.mechanic === "firelink" && (s.id === "pearl" || s.id === "coin");
}

export function collectCoins(grid: SlotSymbol[][], def: SlotDef, existing: CoinLock[] = []): CoinLock[] {
  const map = new Map(existing.map((c) => [`${c.reel}-${c.row}`, c]));
  grid.forEach((col, r) =>
    col.forEach((s, row) => {
      const key = `${r}-${row}`;
      if (isFireCoin(s, def) && !map.has(key)) map.set(key, { reel: r, row, ...pickCoinValue() });
    }),
  );
  return [...map.values()];
}

const COIN_TABLE: { w: number; mult: number; jackpot?: CoinLock["jackpot"] }[] = [
  { w: 22, mult: 1 },
  { w: 16, mult: 2 },
  { w: 12, mult: 3 },
  { w: 10, mult: 5 },
  { w: 8, mult: 8 },
  { w: 6, mult: 10 },
  { w: 4, mult: 15 },
  { w: 3, mult: 25 },
  { w: 4, mult: 20, jackpot: "MINI" },
  { w: 3, mult: 50, jackpot: "MINOR" },
  { w: 2, mult: 200, jackpot: "MAJOR" },
  { w: 1, mult: 1000, jackpot: "GRAND" },
];

export function pickCoinValue(): Pick<CoinLock, "mult" | "jackpot"> {
  const total = COIN_TABLE.reduce((s, x) => s + x.w, 0);
  let r = randInt(total);
  for (const row of COIN_TABLE) {
    r -= row.w;
    if (r < 0) return { mult: row.mult, jackpot: row.jackpot };
  }
  return { mult: 1 };
}

export function coinPayout(coins: CoinLock[], stake: number): number {
  return coins.reduce((s, c) => s + Math.round(stake * c.mult), 0);
}

export function forceCoins(grid: SlotSymbol[][], coin: SlotSymbol, n: number): SlotSymbol[][] {
  const next = grid.map((col) => col.slice());
  const spots = shuffle(15);
  for (let k = 0; k < n && k < spots.length; k++) {
    const idx = spots[k]!;
    const reel = Math.floor(idx / 3);
    const row = idx % 3;
    next[reel]![row] = coin;
  }
  return next;
}

export function fillUnlocked(
  def: SlotDef,
  grid: SlotSymbol[][],
  locked: Set<string>,
): SlotSymbol[][] {
  return grid.map((col, r) =>
    col.map((s, row) => (locked.has(`${r}-${row}`) ? s : randomSymbol(def, false))),
  );
}

export function countGems(grid: SlotSymbol[][]): number {
  let n = 0;
  for (const col of grid) {
    for (const s of col) {
      if (s.id === "amethyst" || s.id === "emerald" || s.id === "ruby" || s.id === "sapphire") n += 1;
    }
  }
  return n;
}

export function winTier(payout: number, stake: number): WinTier {
  const r = payout / Math.max(1, stake);
  if (r >= 50) return "epic";
  if (r >= 20) return "mega";
  if (r >= 8) return "big";
  if (r >= 4) return "nice";
  return "none";
}

export const WIN_TIER_LABEL: Record<WinTier, string> = {
  none: "",
  nice: "GEWINN",
  big: "GROSSGEWINN",
  mega: "MEGA WIN",
  epic: "EPIC WIN",
};

export function expandBurst(def: SlotDef, grid: SlotSymbol[][]): { grid: SlotSymbol[][]; expanded: number[] } {
  const wild = def.symbols.find((s) => s.kind === "wild");
  if (!wild) return { grid, expanded: [] };
  const allowed = def.wildReels ?? [1, 2, 3];
  const expanded: number[] = [];
  const next = grid.map((col, r) => {
    if (!allowed.includes(r)) return col;
    if (col.some((s) => s.kind === "wild")) {
      expanded.push(r);
      return col.map(() => wild);
    }
    return col;
  });
  return { grid: next, expanded };
}

export function randomPad(def: SlotDef, n: number): SlotSymbol[] {
  return Array.from({ length: n }, () => def.symbols[randInt(def.symbols.length)]!);
}

function shuffle(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = randInt(i + 1);
    const t = a[i]!;
    a[i] = a[j]!;
    a[j] = t;
  }
  return a;
}
