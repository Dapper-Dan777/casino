import { useEffect, useMemo, useState } from "react";
import { HUFF_WHEEL, type WheelSeg } from "@/lib/casino/huff";
import { formatEuro } from "@/lib/casino/format";
import { sfx } from "@/lib/casino/audio";
import { cn } from "@/lib/utils";

type Props = {
  stake: number;
  index: number;
  label: string;
  payout: number;
  extraFs: number;
  soundOn: boolean;
  onDone: () => void;
};

export function JackpotWheel({ stake, index, label, payout, extraFs, soundOn, onDone }: Props) {
  const [spinning, setSpinning] = useState(true);
  const n = HUFF_WHEEL.length;
  const arc = 360 / n;
  const end = 360 * 7 + (360 - (index + 0.5) * arc);

  useEffect(() => {
    if (soundOn) sfx.wheel();
    const tick = window.setInterval(() => {
      if (soundOn) sfx.tick();
    }, 90);
    const stop = window.setTimeout(() => {
      window.clearInterval(tick);
      setSpinning(false);
      if (soundOn) sfx.win(payout >= stake * 50 || extraFs > 0);
    }, 4200);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(stop);
    };
  }, [extraFs, payout, soundOn, stake]);

  const slices = useMemo(() => HUFF_WHEEL.map((seg, i) => slicePath(seg, i, n)), [n]);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-bg/85 px-4">
      <div className="w-full max-w-md rounded-xl border-2 border-[color-mix(in_oklab,var(--slot-spin,#e6b84d)_55%,transparent)] bg-[#140e0a] p-5 text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[#e6b84d]">Buzz-Saw Jackpot</p>
        <p className="mt-1 font-display text-3xl text-[#f3e6d0]">Gewinnrad</p>

        <div className="relative mx-auto mt-4 size-64 sm:size-72">
          <span className="absolute left-1/2 top-0 z-20 h-6 w-4 -translate-x-1/2 -translate-y-1 rounded-sm bg-[#e6b84d] [clip-path:polygon(50%_100%,0_0,100%_0)]" />
          <div
            className="size-full rounded-full"
            style={{
              transform: `rotate(${end}deg)`,
              transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.82, 0.08, 1)" : "none",
            }}
          >
            <svg viewBox="0 0 200 200" className="size-full drop-shadow-lg">
              {slices}
              <circle cx="100" cy="100" r="22" fill="#1a120c" stroke="#e6b84d" strokeWidth="3" />
              <text x="100" y="104" textAnchor="middle" fontSize="9" fill="#e6b84d" fontFamily="Georgia, serif">
                WOLF
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-4 min-h-16">
          {spinning ? (
            <p className="font-display text-xl text-[#d4b06a]">Rad dreht…</p>
          ) : (
            <>
              <p className="font-display text-4xl text-[#e6b84d]">{label}</p>
              {payout > 0 ? <p className="mt-1 text-lg text-win">{formatEuro(payout)}</p> : null}
              {extraFs > 0 ? <p className="mt-1 text-sm text-[#9dcc9d]">{extraFs} Extra-Freispiele</p> : null}
            </>
          )}
        </div>

        <button
          type="button"
          disabled={spinning}
          className="mt-4 h-12 w-full rounded-md bg-[#e6b84d] text-sm font-semibold uppercase tracking-wider text-[#1a1208] disabled:opacity-40"
          onClick={onDone}
        >
          {spinning ? "Bitte warten" : "Weiter"}
        </button>
      </div>
    </div>
  );
}

function slicePath(seg: WheelSeg, i: number, n: number) {
  const arc = (Math.PI * 2) / n;
  const a0 = -Math.PI / 2 + i * arc;
  const a1 = a0 + arc;
  const r0 = 28;
  const r1 = 98;
  const p = (a: number, r: number) => [100 + Math.cos(a) * r, 100 + Math.sin(a) * r] as const;
  const [x0, y0] = p(a0, r1);
  const [x1, y1] = p(a1, r1);
  const [x2, y2] = p(a1, r0);
  const [x3, y3] = p(a0, r0);
  const mid = a0 + arc / 2;
  const [tx, ty] = p(mid, 68);
  const deg = (mid * 180) / Math.PI;
  return (
    <g key={seg.id}>
      <path
        d={`M${x0} ${y0} A${r1} ${r1} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 0 0 ${x3} ${y3} Z`}
        fill={seg.fill}
        stroke="#0d0906"
        strokeWidth="1.2"
      />
      <text
        x={tx}
        y={ty}
        fill={seg.ink}
        fontSize={seg.label.length > 4 ? 7.5 : 9}
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(${deg + 90} ${tx} ${ty})`}
      >
        {seg.label}
      </text>
    </g>
  );
}

export function JackpotMeters({
  stake,
  hot,
}: {
  stake: number;
  hot?: string | null;
}) {
  const meters = [
    { id: "mini", label: "Mini", mult: 20, cls: "text-[#d4b06a]" },
    { id: "minor", label: "Minor", mult: 50, cls: "text-[#5eb3d6]" },
    { id: "major", label: "Major", mult: 200, cls: "text-[#e6b84d]" },
    { id: "grand", label: "Grand", mult: 1000, cls: "text-[#d4452f]" },
  ];
  return (
    <div className="mb-2 grid grid-cols-4 gap-1">
      {meters.map((m) => (
        <div
          key={m.id}
          className={cn(
            "rounded-md border px-1 py-1.5 text-center",
            hot === m.label.toUpperCase() ? "border-[#e6b84d] bg-[#e6b84d]/15" : "border-[#3a2a1c] bg-[#120c08]",
          )}
        >
          <p className={cn("text-[9px] uppercase tracking-wider", m.cls)}>{m.label}</p>
          <p className="font-display text-[11px] tabular-nums text-[#f3e6d0] sm:text-xs">{formatEuro(stake * m.mult)}</p>
        </div>
      ))}
    </div>
  );
}
