import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { NeedBankroll } from "./NeedBankroll";
import { useCasino } from "@/lib/casino/store";
import { ChipStack } from "./ChipStack";
import { liveOccupancy } from "@/lib/casino/operator";
import { ChevronLeft } from "lucide-react";

const CHAT = [
  "Lena setzt Banker",
  "M. aus Berlin: 20 auf Rot",
  "Dealer: keine weiteren Karten",
  "K. Köln gewinnt die Bank",
  "Ayla: Lucky Numbers gleich",
  "Sofia: letzte Runde vor Pause",
];

export function TableShell({
  title,
  subtitle,
  children,
  slug,
  felt = "classic",
  live = true,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  slug?: string;
  felt?: "classic" | "wheel" | "bacc";
  live?: boolean;
}) {
  const touchGame = useCasino((s) => s.touchGame);
  useEffect(() => {
    if (slug) touchGame(slug);
  }, [slug, touchGame]);

  const feltBg = felt === "wheel" ? "bg-[#140808]" : felt === "bacc" ? "bg-[#081018]" : "bg-felt";
  const vignette =
    felt === "wheel"
      ? "opacity-50 [background:radial-gradient(ellipse_at_center,transparent_40%,#0a0404_100%)]"
      : felt === "bacc"
        ? "opacity-50 [background:radial-gradient(ellipse_at_center,transparent_40%,#040814_100%)]"
        : "opacity-40 [background:radial-gradient(ellipse_at_center,transparent_40%,#071910_100%)]";
  const subColor = felt === "classic" ? "text-accent/80" : "text-[#e8c85a]/80";

  return (
    <div className={`relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden ${feltBg} sm:-mx-6`}>
      <div className={`pointer-events-none absolute inset-0 ${vignette}`} />
      <img
        src="/games/char-dealer.jpg"
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 z-[5] hidden h-[55%] max-w-[200px] object-contain object-bottom opacity-80 sm:block"
      />
      <div className="pointer-events-none absolute bottom-10 left-6 z-[5] hidden sm:block">
        <ChipStack n={6} tone={felt === "wheel" ? "gold" : felt === "bacc" ? "ice" : "felt"} />
      </div>
      <div className="relative mx-auto max-w-3xl px-4 pb-28 pt-4 sm:px-6">
        <div className="mb-5 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg/80 hover:text-fg"
            aria-label="Lobby"
          >
            <ChevronLeft className="size-5" />
          </Link>
          <div>
            <h1 className="font-display text-3xl text-fg">{title}</h1>
            <p className={`text-xs ${subColor}`}>{subtitle}</p>
          </div>
        </div>
        {live ? <LiveRibbon slug={slug ?? title} /> : null}
        {children}
      </div>
      <NeedBankroll />
    </div>
  );
}

function LiveRibbon({ slug }: { slug: string }) {
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const left = 18 - (Math.floor(now / 1000) % 18);
  const occ = liveOccupancy(slug.slice(0, 8), now);
  const chat = CHAT[Math.floor(now / 4000) % CHAT.length]!;
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-md border border-white/10 bg-black/25 px-3 py-2 text-xs">
      <span className="font-semibold uppercase tracking-wider text-loss">Live</span>
      <span className="tabular-nums text-fg/80">Runde {left}s · {occ} am Tisch</span>
      <span className="hidden truncate text-muted sm:inline">{chat}</span>
    </div>
  );
}