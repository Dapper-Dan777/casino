import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  SLOT_DEFS,
  evaluateBookSpin,
  evaluateSpin,
  expandMinCount,
  scoreExpanding,
  type SlotSymbol,
} from "./slots.ts";
import { SLOT_THEMES } from "./slotThemes.ts";

function col(sym: SlotSymbol, n = 3): SlotSymbol[] {
  return Array.from({ length: n }, () => sym);
}

describe("Book expanding special", () => {
  const def = SLOT_DEFS["pharaos-erbe"]!;
  const stake = 100;
  const j = def.symbols.find((s) => s.id === "j")!;
  const pharaoh = def.symbols.find((s) => s.id === "pharaoh")!;
  const ankh = def.symbols.find((s) => s.id === "ankh")!;
  const filler = j;

  it("pictures expand from 2, royals from 3", () => {
    assert.equal(expandMinCount(pharaoh), 2);
    assert.equal(expandMinCount(j), 3);
    assert.equal(expandMinCount(ankh), 3);
  });

  it("pays on all 10 lines even when reels are not adjacent", () => {
    const grid = [
      col(pharaoh),
      col(filler),
      col(pharaoh),
      col(filler),
      col(pharaoh),
    ];
    const win = scoreExpanding(def, grid, pharaoh, stake, 1);
    assert.ok(win);
    assert.equal(win!.count, 3);
    assert.equal(win!.ways, 10);
    assert.equal(win!.expanding, true);
    assert.equal(win!.payout, Math.round(stake * pharaoh.pays[0] * 10));
  });

  it("does not pay expanding when count is below the min", () => {
    const grid = [col(j), col(filler), col(j), col(filler), col(filler)];
    assert.equal(scoreExpanding(def, grid, j, stake), null);
  });

  it("keeps other line wins and adds the expanding scatter-style pay", () => {
    const q = def.symbols.find((s) => s.id === "q")!;
    const grid = [
      col(q),
      col(q),
      col(q),
      col(pharaoh),
      col(pharaoh),
    ];
    const result = evaluateBookSpin(def, grid, pharaoh, stake, 1);
    assert.ok(result.expandedReels.length === 2);
    assert.ok(result.lineWins.some((w) => w.expanding && w.symbol.id === "pharaoh"));
    assert.ok(result.lineWins.some((w) => w.symbol.id === "q" && !w.expanding));
    const extra = result.lineWins.find((w) => w.expanding)!;
    assert.equal(extra.payout, Math.round(stake * (pharaoh.pays2 ?? 0) * 10));
  });
});

describe("unique cabinets and hall games", () => {
  it("does not share olymp gems on goldwolf, sternenblitz, gluecksklee, raubfisch", () => {
    const arts = [
      ...SLOT_DEFS.goldwolf!.symbols.map((s) => s.art),
      ...SLOT_DEFS.sternenblitz!.symbols.map((s) => s.art),
      ...SLOT_DEFS.gluecksklee!.symbols.map((s) => s.art),
      ...SLOT_DEFS.raubfisch!.symbols.map((s) => s.art),
    ];
    for (const art of arts) {
      assert.ok(art);
      assert.equal(art.includes("olymp-"), false, art);
      assert.equal(art.includes("nordic-"), false, art);
    }
  });

  it("ships Immer Heiß and Nur Juwelen", () => {
    assert.ok(SLOT_DEFS["immer-heiss"]);
    assert.ok(SLOT_DEFS["nur-juwelen"]);
    assert.equal(SLOT_DEFS["immer-heiss"]!.paylines.length, 5);
    assert.equal(SLOT_DEFS["nur-juwelen"]!.symbols.length, 5);
  });

  it("gives overlapping titles unique reel windows", () => {
    const keys = ["goldwolf", "drachenfeuer", "schatzzug", "multi-wild", "nordlicht", "raubfisch", "gluecksklee", "wegeflut", "olymp-tor", "sternenblitz"];
    const reels = keys.map((k) => SLOT_THEMES[k]!.reel);
    assert.equal(new Set(reels).size, reels.length);
  });
});

describe("active paylines", () => {
  it("only scores the selected lines", () => {
    const def = SLOT_DEFS["heisse-fruechte"]!;
    const seven = def.symbols.find((s) => s.id === "seven")!;
    const lemon = def.symbols.find((s) => s.id === "lemon")!;
    const plum = def.symbols.find((s) => s.id === "plum")!;
    const grid = [
      [seven, lemon, plum],
      [seven, plum, lemon],
      [seven, lemon, plum],
      [seven, plum, lemon],
      [seven, lemon, plum],
    ];
    const one = evaluateSpin(def, grid, 100, 1, 1);
    const two = evaluateSpin(def, grid, 100, 1, 2);
    assert.equal(one.lineWins.length, 0);
    assert.ok(two.lineWins.length >= 1);
    assert.ok(two.lineWins.every((w) => w.line === 1 || w.line === 101));
  });
});
