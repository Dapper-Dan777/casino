import { useState } from "react";
import { SUPPORT_REPLIES } from "@/lib/casino/operator";
import { cn } from "@/lib/utils";
import { MessageCircle, X } from "lucide-react";

export function SupportDock() {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<{ who: "you" | "desk"; text: string }[]>([
    { who: "desk", text: "Aurelia Desk · Nur Spielgeld. Wobei können wir helfen?" },
  ]);

  function ask(q: string, a: string) {
    setLog((l) => [...l, { who: "you", text: q }, { who: "desk", text: a }]);
  }

  return (
    <div className="fixed bottom-16 right-3 z-40 sm:bottom-8 sm:right-5">
      {open ? (
        <div className="mb-3 w-[min(100vw-1.5rem,20rem)] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <p className="text-xs uppercase tracking-[0.22em] text-accent">Desk</p>
            <button type="button" aria-label="Schließen" onClick={() => setOpen(false)}>
              <X className="size-4 text-muted" />
            </button>
          </div>
          <div className="max-h-64 space-y-2 overflow-y-auto p-3 text-sm">
            {log.map((m, i) => (
              <p key={i} className={cn("rounded-md px-2 py-1", m.who === "desk" ? "bg-elevated text-fg" : "bg-accent/15 text-fg")}>
                {m.text}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 border-t border-border p-2">
            {SUPPORT_REPLIES.map((r) => (
              <button
                key={r.q}
                type="button"
                className="h-8 rounded-md bg-elevated px-2 text-xs text-muted hover:text-fg"
                onClick={() => ask(r.q, r.a)}
              >
                {r.q}
              </button>
            ))}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        aria-label="Support"
        onClick={() => setOpen((o) => !o)}
        className="ml-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg shadow-lg"
      >
        <MessageCircle className="size-5" />
      </button>
    </div>
  );
}
