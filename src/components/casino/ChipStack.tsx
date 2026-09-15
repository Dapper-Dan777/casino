import { cn } from "@/lib/utils";

export function ChipStack({ n = 4, tone = "gold" }: { n?: number; tone?: "gold" | "ice" | "felt" }) {
  const count = Math.min(8, Math.max(1, n));
  return (
    <div className={cn("chip-stack", `chip-${tone}`)} aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <i key={i} style={{ bottom: i * 3 }} />
      ))}
    </div>
  );
}
