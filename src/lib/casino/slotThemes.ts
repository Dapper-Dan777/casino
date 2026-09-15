export type SlotSkin =
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
  | "lucky"
  | "olymp"
  | "candy"
  | "burst"
  | "wolf"
  | "train"
  | "fish"
  | "mega"
  | "jewel"
  | "always";

/** How the 3×N reel window is built — not just a color filter. */
export type ReelVariant =
  | "cream"
  | "black"
  | "sand"
  | "navy"
  | "ice"
  | "neon"
  | "ember"
  | "velvet"
  | "hold"
  | "glass"
  | "moss"
  | "photo"
  | "olymp"
  | "candy"
  | "wolf"
  | "train"
  | "ruby"
  | "deep"
  | "jade"
  | "burst"
  | "jewel"
  | "always";

export type SlotTheme = {
  skin: SlotSkin;
  kicker: string;
  reel: ReelVariant;
  leftFilter?: string;
  rightFilter?: string;
};

export const SLOT_THEMES: Record<string, SlotTheme> = {
  "pharaos-erbe": { skin: "egypt", kicker: "Book of Ra", reel: "sand" },
  nordlicht: {
    skin: "nordic",
    kicker: "Frozen Reels",
    reel: "ice",
    leftFilter: "saturate(0.85) hue-rotate(200deg)",
    rightFilter: "saturate(0.85) hue-rotate(200deg)",
  },
  kirschkoenig: { skin: "fruit", kicker: "Risiko · Classic", reel: "photo" },
  saphirnacht: { skin: "gem", kicker: "Jewel Rush", reel: "navy" },
  "huff-und-puff": { skin: "huff", kicker: "Jackpot Wheel", reel: "sand" },
  "neon-drift": {
    skin: "neon",
    kicker: "Cyber Ways",
    reel: "neon",
    leftFilter: "hue-rotate(155deg) saturate(1.45)",
    rightFilter: "hue-rotate(155deg) saturate(1.45)",
  },
  drachenfeuer: {
    skin: "dragon",
    kicker: "Fire Link",
    reel: "ember",
    leftFilter: "hue-rotate(-18deg) saturate(1.35)",
    rightFilter: "sepia(0.35) saturate(1.4)",
  },
  flammenstern: { skin: "blaze", kicker: "5 Linien · Leiter", reel: "black" },
  "extra-safe": { skin: "extra", kicker: "Wild-Multi · Extra", reel: "velvet" },
  zauberspiegel: { skin: "mirror", kicker: "Expanding Mirror", reel: "glass" },
  "multi-wild": { skin: "multi", kicker: "Stacked Wilds", reel: "ruby" },
  "triple-chance": { skin: "chance", kicker: "Hold & Chance", reel: "hold" },
  "heisse-fruechte": { skin: "sizzle", kicker: "5 Linien · Classic", reel: "cream" },
  gluecksklee: { skin: "lucky", kicker: "Klee · 15 Freispiele", reel: "moss" },
  "olymp-tor": { skin: "olymp", kicker: "6×5 · 8+ überall", reel: "olymp" },
  "bonbon-regen": { skin: "candy", kicker: "6×5 · Bomben", reel: "candy" },
  sternenblitz: { skin: "burst", kicker: "Wilds dehnen sich · Nachdrehen", reel: "burst" },
  goldwolf: { skin: "wolf", kicker: "Hold & Win · 6 Münzen", reel: "wolf" },
  raubfisch: { skin: "fish", kicker: "Angler sammelt Fische", reel: "deep" },
  wegeflut: { skin: "mega", kicker: "Megaways · Tumble", reel: "jade" },
  schatzzug: { skin: "train", kicker: "Hold & Collect", reel: "train" },
  "immer-heiss": { skin: "always", kicker: "5 Linien immer an · Stern", reel: "always" },
  "nur-juwelen": { skin: "jewel", kicker: "5 Juwelen · 5 Linien", reel: "jewel" },
  "goldene-halle": { skin: "fruit", kicker: "5 Linien · Gewinnleiter", reel: "photo" },
  "nova-fruits": { skin: "always", kicker: "Hold & Collect · Nachdreher", reel: "always" },
  "neon-sentinel": { skin: "neon", kicker: "Cyber Ways · Tumble", reel: "neon" },
  "royal-risk": { skin: "blaze", kicker: "Classic · Kartenrisiko", reel: "black" },
};

export const CONTAIN_REELS = new Set<ReelVariant>(["cream", "black", "hold", "always"]);
