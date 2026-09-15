import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "Ein unerwarteter Fehler ist aufgetreten. Bitte Seite neu laden.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error, reset }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg">
      <span className="text-loss" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-2xl">Spiel unterbrochen</h1>
      <p className="max-w-md text-sm break-words text-muted">{errorMessage(error)}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {reset ? (
          <button
            type="button"
            onClick={reset}
            className="h-11 rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wider text-accent-fg"
          >
            Nochmal versuchen
          </button>
        ) : null}
        <Link
          to="/"
          className="inline-flex h-11 items-center rounded-md border border-accent/30 px-5 text-sm uppercase tracking-wider text-fg"
        >
          Zur Lobby
        </Link>
      </div>
    </main>
  );
}

export const GameErrorComponent = AppErrorComponent;
