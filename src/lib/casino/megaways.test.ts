import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dropMega, evalMega, MEGA_REELS, spinMega } from "./megaways.ts";

describe("wegeflut", () => {
  it("spins 6 variable reels", () => {
    const g = spinMega();
    assert.equal(g.length, MEGA_REELS);
    for (const col of g) {
      assert.ok(col.length >= 2 && col.length <= 7);
    }
  });

  it("pays left-to-right ways", () => {
    const j = { id: "j", label: "J", kind: "low" as const, weight: 1, pays: [0.15, 0.4, 0.9, 1.8] as const, art: "" };
    const grid = [
      [j, j],
      [j],
      [j, j, j],
      [{ ...j, id: "q", label: "Q" }],
      [j],
      [j],
    ];
    const ev = evalMega(grid, 100, 1);
    assert.ok(ev.wins.some((w) => w.id === "j" && w.count === 3));
    assert.ok(ev.payout > 0);
  });

  it("drops remaining symbols to the bottom", () => {
    const a = { id: "a", label: "A", kind: "low" as const, weight: 1, pays: [0.2, 0.6, 1.2, 2.5] as const, art: "" };
    const b = { ...a, id: "k", label: "K" };
    const grid = [[a, b, a]];
    const next = dropMega(grid, new Set(["0-1"]));
    assert.equal(next[0]![0]!.id, "a");
    assert.equal(next[0]!.length, 3);
  });
});
