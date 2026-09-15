import { useEffect, useState, type ReactNode } from "react";
import { gameBySlug } from "@/lib/casino/catalog";

export function GameSplash({ slug, children }: { slug: string; children: ReactNode }) {
  const game = gameBySlug(slug);
  const [show, setShow] = useState(true);
  useEffect(() => {
    setShow(true);
    const t = window.setTimeout(() => setShow(false), 900);
    return () => window.clearTimeout(t);
  }, [slug]);
  return (
    <div className="relative">
      {children}
      {show && game ? (
        <div className="absolute inset-0 z-50 grid place-items-center bg-bg">
          <div className="w-full max-w-sm px-6 text-center">
            <img src={game.image} alt="" className="mx-auto h-36 w-28 rounded-md object-cover" />
            <p className="mt-4 font-display text-3xl">{game.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.28em] text-muted">{game.tagline}</p>
            <div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-elevated">
              <i className="block h-full w-full origin-left animate-[splash-bar_0.85s_ease-out] bg-accent" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
