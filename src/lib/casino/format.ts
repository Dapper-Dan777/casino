const eur = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

const eurCompact = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

/** Integer cents → "12,50 €" */
export function formatEuro(cents: number): string {
  return eur.format(cents / 100);
}

export function formatEuroCompact(cents: number): string {
  return eurCompact.format(cents / 100);
}

export function parseEuroInput(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return null;
  const value = Number(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}

export function formatTime(ts: number): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(ts);
}
