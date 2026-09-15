import type { SlotDef, SlotSymbol } from "./slots";
import { OLYMP_DEF, type PaysKit, type PaysPack } from "./olympus";

const tile = (id: string) => `/games/sym/bonbon-${id}.jpg`;

function candy(
  id: string,
  label: string,
  kind: SlotSymbol["kind"],
  weight: number,
  pays: readonly [number, number, number],
): SlotSymbol {
  return { id, label, kind, weight, pays, art: tile(id) };
}

/** Sweet Bonanza-style table: 8–9 / 10–11 / 12+ of total bet. */
export const BONBON_SYMBOLS: SlotSymbol[] = [
  candy("blue", "Blau", "low", 16, [0.25, 0.75, 2]),
  candy("green", "Grün", "low", 14, [0.4, 0.9, 4]),
  candy("purple", "Lila", "low", 12, [0.5, 1, 5]),
  candy("heart", "Herz", "mid", 10, [0.8, 1.2, 8]),
  candy("red", "Erdbeer", "mid", 9, [1, 1.5, 10]),
  candy("banana", "Banane", "mid", 7, [1.5, 2, 12]),
  candy("melon", "Melone", "high", 6, [2, 5, 15]),
  candy("grapes", "Trauben", "high", 5, [2.5, 10, 25]),
  candy("apple", "Apfel", "high", 4, [10, 25, 50]),
  candy("lolly", "Lolly", "scatter", 3, [3, 5, 100]),
];

export const BONBON_KIT: PaysKit = {
  symbols: BONBON_SYMBOLS,
  orbBase: 0.05,
  orbFs: 0.13,
  fsCount: 12,
  retrigger: 5,
  forceId: "apple",
  maxX: 21100,
};

export const BONBON_DEF: SlotDef = {
  ...OLYMP_DEF,
  slug: "bonbon-regen",
  symbols: BONBON_SYMBOLS,
  freeSpinCount: 12,
  pityAfter: 12,
};

export const BONBON_PACK: PaysPack = {
  slug: "bonbon-regen",
  name: "Bonbon-Regen",
  kicker: "6×5 · Tumble · Bomben",
  hint: "8 gleiche Bonbons zahlen überall · Bomben 2×–500×",
  bg: "/games/bonbon-regen.jpg",
  skin: "candy",
  variant: "candy",
  bed: 132,
  def: BONBON_DEF,
  buy: 100,
  kit: BONBON_KIT,
  scatterName: "Lolly",
};
