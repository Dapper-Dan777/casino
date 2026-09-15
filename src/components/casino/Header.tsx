import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { formatEuro } from "@/lib/casino/format";
import { sfx, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { playersOnline, vipOf } from "@/lib/casino/operator";
import { Bell, Volume2, VolumeX, Wallet } from "lucide-react";

export function Header() {
  const balance = useCasino((s) => s.balance);
  const jackpot = useCasino((s) => s.jackpot);
  const wagered = useCasino((s) => s.wagered);
  const rank = vipOf(wagered);
  const setCashierOpen = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const toggleSound = useCasino((s) => s.toggleSound);
  const notifs = useCasino((s) => s.notifs);
  const markNotifsRead = useCasino((s) => s.markNotifsRead);
  const [sec, setSec] = useState(0);
  const [bell, setBell] = useState(false);
  const [online, setOnline] = useState<number | null>(null);
  const unread = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    const t0 = Date.now();
    setOnline(playersOnline(t0));
    const id = window.setInterval(() => {
      const t = Date.now();
      setSec(Math.floor((t - t0) / 1000));
      setOnline(playersOnline(t));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="flex min-w-0 items-baseline gap-2" onClick={() => unlockAudio()}>
          <span className="font-display text-2xl tracking-tight text-fg sm:text-[1.75rem]">Aurelia</span>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-accent sm:inline">Network</span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          <NavLink href="/">Lobby</NavLink>
          <Link to="/sport" className="rounded-md px-3 py-2 text-sm text-muted hover:text-fg" onClick={() => unlockAudio()}>
            Sport
          </Link>
          <NavLink href="/live">Live</NavLink>
          <NavLink href="/aktionen">Aktionen</NavLink>
          <NavLink href="/vip">VIP</NavLink>
          <NavLink href="/#hits">Hits</NavLink>
          <NavLink href="/#merkur">Halle</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {online != null ? (
            <p className="hidden text-[10px] uppercase tracking-wider text-muted xl:block">
              {online.toLocaleString("de-DE")} online
            </p>
          ) : null}
          <Link to="/aktionen" className="hidden rounded-md px-2 py-1 text-right lg:block" onClick={() => unlockAudio()}>
            <p className="text-[10px] uppercase tracking-wider text-muted">Netzwerk</p>
            <p className="font-display text-sm tabular-nums text-[#e8c85a]">{formatEuro(jackpot)}</p>
          </Link>
          <Link to="/vip" className="hidden rounded-md border border-border px-2 py-1 text-[10px] uppercase tracking-wider text-muted sm:inline">
            VIP {rank.name} · {mm}:{ss}
          </Link>
          <div className="relative hidden sm:block">
            <button
              type="button"
              aria-label="Nachrichten"
              className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg"
              onClick={() => {
                setBell((b) => !b);
                markNotifsRead();
              }}
            >
              <Bell className="size-4" />
              {unread ? <span className="absolute right-1 top-1 size-2 rounded-full bg-loss" /> : null}
            </button>
            {bell ? (
              <div className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-border bg-surface p-3 shadow-2xl">
                {notifs.length === 0 ? (
                  <p className="text-xs text-muted">Keine Nachrichten</p>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {notifs.slice(0, 6).map((n) => (
                      <li key={n.id}>
                        <p className="text-fg">{n.title}</p>
                        <p className="text-xs text-muted">{n.body}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>
          <Link
            to="/konto"
            className="hidden rounded-md px-2 py-2 text-sm text-muted hover:text-fg sm:inline"
            onClick={() => unlockAudio()}
          >
            Konto
          </Link>
          <button
            type="button"
            aria-label={soundOn ? "Ton aus" : "Ton an"}
            className="hidden size-11 items-center justify-center rounded-md text-muted hover:text-fg sm:inline-flex"
            onClick={() => {
              unlockAudio();
              toggleSound();
            }}
          >
            {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              unlockAudio();
              setCashierOpen(true);
            }}
            className="flex h-11 items-center gap-2 rounded-md border border-accent/25 bg-elevated px-3 text-left"
          >
            <Wallet className="size-4 text-accent" />
            <span className="tabular-nums text-sm text-fg">{formatEuro(balance)}</span>
          </button>

          <Button
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => {
              unlockAudio();
              if (soundOn) sfx.click();
              setCashierOpen(true);
            }}
          >
            Einzahlen
          </Button>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="rounded-md px-3 py-2 text-sm text-muted hover:text-fg" onClick={() => unlockAudio()}>
      {children}
    </a>
  );
}
