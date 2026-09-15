/** Merkur-style 5-line map (Blazing Star / Fancy Fruits). */
export const FIVE_LINES: number[][] = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
];

/** 3-reel Triple Chance lines. */
export const THREE_LINES: number[][] = [
  [1, 1, 1],
  [0, 0, 0],
  [2, 2, 2],
  [0, 1, 2],
  [2, 1, 0],
];

/** Extra Wild / Blazing Star typically allow 6 doubles on the ladder. */
export const LEITER_MAX = 7;

/** Hall ladder blink: slow at the bottom, only a little quicker up top. */
export function leiterBounceMs(step: number): number {
  return Math.max(480, 640 - Math.max(0, step - 1) * 28);
}

export const WILD_MULTS = [2, 3, 7] as const;

/** Compact LED amount with always-on cents, like hall 7-segment modules. */
export function formatLed(cents: number): string {
  return (cents / 100).toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Unlit 7-segment ghost matching the digit layout. */
export function ledGhost(value: string): string {
  return value.replace(/\d/g, "8");
}
