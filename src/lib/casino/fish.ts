import type { SlotDef, SlotSymbol } from "./slots";

export const FISH_VALUES: Record<string, number> = {
  silver: 2,
  bass: 8,
  gold: 20,
};

export const FISH_DEF: SlotDef = {
  slug: "raubfisch",
  reels: 5,
  rows: 3,
  paylines: [
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
  ],
  symbols: [
    { id: "j", label: "J", kind: "low", weight: 12, pays: [0.4, 1.5, 6], art: "/games/sym/fish-j.jpg" },
    { id: "q", label: "Q", kind: "low", weight: 12, pays: [0.4, 1.5, 6], art: "/games/sym/fish-q.jpg" },
    { id: "k", label: "K", kind: "low", weight: 10, pays: [0.6, 2, 8], art: "/games/sym/fish-k.jpg" },
    { id: "a", label: "A", kind: "low", weight: 10, pays: [0.6, 2, 8], art: "/games/sym/fish-a.jpg" },
    { id: "silver", label: "Silber", kind: "mid", weight: 8, pays: [1, 4, 12], art: "/games/sym/fish-silver.jpg" },
    { id: "bass", label: "Barsch", kind: "high", weight: 5, pays: [2, 8, 25], art: "/games/sym/fish-bass.jpg" },
    { id: "gold", label: "Karpfen", kind: "high", weight: 3, pays: [4, 16, 50], art: "/games/sym/fish-gold.jpg" },
    { id: "wild", label: "Angler", kind: "wild", weight: 3, pays: [5, 20, 80], art: "/games/sym/fish-angler.jpg" },
    { id: "scatter", label: "Kiste", kind: "scatter", weight: 3, pays: [2, 10, 50], art: "/games/sym/fish-box.jpg" },
  ],
  betSteps: [20, 50, 100, 200, 500, 1000, 2500],
  defaultBet: 100,
  freeSpinsFrom: 3,
  freeSpinCount: 10,
  fsMultiplier: 1,
  pityAfter: 12,
  mechanic: "sticky",
};

export function collectFish(grid: SlotSymbol[][], stake: number): { cash: number; fish: number; wilds: number } {
  let fishPay = 0;
  let fish = 0;
  let wilds = 0;
  for (const col of grid) {
    for (const s of col) {
      if (s.kind === "wild") wilds += 1;
      const v = FISH_VALUES[s.id];
      if (v) {
        fish += 1;
        fishPay += Math.round(stake * v);
      }
    }
  }
  return { cash: wilds > 0 ? fishPay * wilds : 0, fish, wilds };
}
