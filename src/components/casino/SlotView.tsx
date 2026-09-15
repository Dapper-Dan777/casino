import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SymbolFace } from "./SlotSymbols";
import { NeedBankroll } from "./NeedBankroll";
import { ReelBank, REEL_PAD, REEL_STOP_MS, REEL_TURBO_MS, REEL_STOP_MERKUR, REEL_STOP_PRAG, REEL_STOP_HOLD, REEL_STOP_BURST, type ReelCol } from "./ReelBank";
import { WinCelebration } from "./WinCelebration";
import { Paytable } from "./Paytable";
import { MerkurRisk } from "./MerkurRisk";
import {
  SLOT_DEFS,
  applySticky,
  collectCoins,
  collectWildKeys,
  countGems,
  dropAndFill,
  evaluateBookSpin,
  evaluateSpin,
  expandBurst,
  expandGrid,
  expandMinCount,
  fillUnlocked,
  forceCoins,
  coinPayout,
  paintStrip,
  pickSpecial,
  specialPool,
  spinGrid,
  winTier,
  winningCellKeys,
  type CoinLock,
  type SlotSymbol,
  type SpinResult,
  type WinTier,
} from "@/lib/casino/slots";
import { SLOT_THEMES } from "@/lib/casino/slotThemes";
import { formatEuro } from "@/lib/casino/format";
import { formatLed, ledGhost } from "@/lib/casino/merkur";
import { sfx, startBed, startRumble, stopBed, stopRumble, unlockAudio } from "@/lib/casino/audio";
import { useCasino } from "@/lib/casino/store";
import { gameBySlug } from "@/lib/casino/catalog";
import { cn } from "@/lib/utils";
import { ChevronLeft, Info, Minus, Plus, Zap } from "lucide-react";

type FsPhase = "idle" | "intro" | "pick" | "ready";
type LinkPhase = "off" | "intro" | "spin" | "collect";

const AUTO_OPTS = [10, 25, 50, 100] as const;
type AutoStop = "none" | "win" | "bonus";

const DECO: Record<
  string,
  { leftVid: string; rightVid: string; leftImg: string; rightImg: string; header?: string; flipRight?: boolean }
> = {
  "pharaos-erbe": {
    leftVid: "/games/char-anubis.mp4",
    rightVid: "/games/char-pharaoh.mp4",
    leftImg: "/games/char-anubis.jpg",
    rightImg: "/games/char-pharaoh.jpg",
    header: "/games/header-wings.jpg",
  },
  nordlicht: {
    leftVid: "/games/char-wolf.mp4",
    rightVid: "/games/char-wolf.mp4",
    leftImg: "/games/char-wolf.jpg",
    rightImg: "/games/char-wolf.jpg",
    flipRight: true,
  },
  kirschkoenig: {
    leftVid: "/games/char-cherry.mp4",
    rightVid: "/games/char-cherry.mp4",
    leftImg: "/games/char-cherry.jpg",
    rightImg: "/games/char-cherry.jpg",
    flipRight: true,
  },
  saphirnacht: {
    leftVid: "/games/char-gem.mp4",
    rightVid: "/games/char-gem.mp4",
    leftImg: "/games/char-gem.jpg",
    rightImg: "/games/char-gem.jpg",
    flipRight: true,
  },
  "neon-drift": {
    leftVid: "/games/char-gem.mp4",
    rightVid: "/games/char-gem.mp4",
    leftImg: "/games/char-gem.jpg",
    rightImg: "/games/char-gem.jpg",
    flipRight: true,
  },
  drachenfeuer: {
    leftVid: "/games/char-anubis.mp4",
    rightVid: "/games/char-pharaoh.mp4",
    leftImg: "/games/char-anubis.jpg",
    rightImg: "/games/char-pharaoh.jpg",
  },
  goldwolf: {
    leftVid: "/games/char-wolf.mp4",
    rightVid: "/games/char-wolf.mp4",
    leftImg: "/games/char-wolf.jpg",
    rightImg: "/games/char-wolf.jpg",
    flipRight: true,
  },
  sternenblitz: {
    leftVid: "/games/char-gem.mp4",
    rightVid: "/games/char-gem.mp4",
    leftImg: "/games/char-gem.jpg",
    rightImg: "/games/char-gem.jpg",
    flipRight: true,
  },
};

export function SlotView({ slug }: { slug: string }) {
  const def = SLOT_DEFS[slug];
  const info = gameBySlug(slug);
  const balance = useCasino((s) => s.balance);
  const placeBet = useCasino((s) => s.placeBet);
  const creditWin = useCasino((s) => s.creditWin);
  const setCashier = useCasino((s) => s.setCashierOpen);
  const soundOn = useCasino((s) => s.soundOn);
  const touchGame = useCasino((s) => s.touchGame);

  const [betIndex, setBetIndex] = useState(() => {
    const i = def?.betSteps.indexOf(def.defaultBet) ?? 0;
    return Math.max(0, i);
  });
  const [coinIdx, setCoinIdx] = useState(() => {
    const n = def?.paylines.length ?? 5;
    const steps = n >= 10 ? [2, 5, 10, 20, 50, 100, 200] : [4, 10, 20, 40, 100, 200, 400];
    const want = Math.round((def?.defaultBet ?? 100) / n);
    const i = steps.findIndex((c) => c >= want);
    return Math.max(0, i < 0 ? steps.length - 1 : i);
  });
  const [lineCount, setLineCount] = useState(() => def?.paylines.length ?? 5);
  const [autoStop, setAutoStop] = useState<AutoStop>("none");
  const [reels, setReels] = useState<ReelCol[]>(() =>
    def
      ? Array.from({ length: 5 }, (_, i) => ({
          strip: [
            def.symbols[i % def.symbols.length]!,
            def.symbols[(i + 1) % def.symbols.length]!,
            def.symbols[(i + 2) % def.symbols.length]!,
          ],
          offset: 0,
          spinning: false,
          settleMs: REEL_STOP_MS[i] ?? 2000,
        }))
      : [],
  );
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<SpinResult | null>(null);
  const [displayWin, setDisplayWin] = useState(0);
  const [freeSpins, setFreeSpins] = useState(0);
  const [fsTotal, setFsTotal] = useState(0);
  const [autoLeft, setAutoLeft] = useState(0);
  const [autoOpen, setAutoOpen] = useState(false);
  const [turbo, setTurbo] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [fsPhase, setFsPhase] = useState<FsPhase>("idle");
  const [fsAward, setFsAward] = useState(0);
  const [special, setSpecial] = useState<SlotSymbol | null>(null);
  const [pickIndex, setPickIndex] = useState(0);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [spinKey, setSpinKey] = useState(0);
  const [bigWin, setBigWin] = useState(false);
  const [statueWin, setStatueWin] = useState(false);
  const [scatterLit, setScatterLit] = useState(0);
  const [vanish, setVanish] = useState<Set<string>>(new Set());
  const [cascadeLv, setCascadeLv] = useState(0);
  const [frozen, setFrozen] = useState<Set<string>>(new Set());
  const [gems, setGems] = useState(0);
  const [link, setLink] = useState<{ coins: CoinLock[]; left: number; phase: LinkPhase } | null>(null);
  const [celebrate, setCelebrate] = useState<{ payout: number; stake: number; tier: WinTier } | null>(null);
  const [gamble, setGamble] = useState<number | null>(null);
  const [lineCursor, setLineCursor] = useState(0);
  const timers = useRef<number[]>([]);
  const freeRef = useRef(0);
  const pityRef = useRef(0);
  const specialRef = useRef<SlotSymbol | null>(null);
  const frozenRef = useRef<Set<string>>(new Set());
  const cascadeMultRef = useRef(1);
  const gridRef = useRef<SlotSymbol[][] | null>(null);
  const linkRef = useRef(link);
  const turboRef = useRef(false);
  const soundRef = useRef(soundOn);
  const busyRef = useRef(false);
  const gambleRef = useRef<number | null>(null);
  const celebrateRef = useRef(celebrate);
  const fsPhaseRef = useRef(fsPhase);
  const autoRef = useRef(0);
  const spinRef = useRef<() => void>(() => {});
  const linesRef = useRef(5);
  const autoStopRef = useRef<AutoStop>("none");

  const merkurLines = Boolean(
    info?.family === "merkur" && def && def.mechanic !== "ways" && !def.stackedWilds && def.paylines.length >= 3,
  );
  const coinSteps = (def?.paylines.length ?? 5) >= 10 ? [2, 5, 10, 20, 50, 100, 200] : [4, 10, 20, 40, 100, 200, 400];
  const coin = coinSteps[Math.min(coinIdx, coinSteps.length - 1)] ?? 20;
  const bet = merkurLines ? coin * lineCount : (def?.betSteps[betIndex] ?? 100);
  const gameName = info?.name ?? slug;
  const inFs = freeSpins > 0 && fsPhase === "idle";
  const mult = inFs ? (def?.fsMultiplier ?? 1) : 1;
  const deco = DECO[slug];
  const theme = SLOT_THEMES[slug];
  const pool = def ? specialPool(def) : [];
  const scatterSym = def?.symbols.find((s) => s.kind === "scatter");
  const fifthSpinning = Boolean(reels[4]?.spinning);
  const anticipating = busy && scatterLit >= 2 && fifthSpinning && !link;
  const gemTarget = def?.gemTarget ?? 12;
  const fireFrom = def?.firelinkFrom ?? 5;

  const winCells = useMemo(() => {
    const set = new Set<string>();
    const wins = last?.lineWins ?? [];
    if (!busy && wins.length > 1) {
      const w = wins[lineCursor % wins.length];
      w?.cells.forEach((c) => set.add(`${c.reel}-${c.row}`));
    } else {
      wins.forEach((w) => w.cells.forEach((c) => set.add(`${c.reel}-${c.row}`)));
    }
    if (last && last.scatterCount >= 3) {
      last.grid.forEach((col, ri) =>
        col.forEach((s, row) => {
          if (s.kind === "scatter") set.add(`${ri}-${row}`);
        }),
      );
    }
    expanded.forEach((ri) => {
      set.add(`${ri}-0`);
      set.add(`${ri}-1`);
      set.add(`${ri}-2`);
    });
    return set;
  }, [last, expanded, busy, lineCursor]);

  useEffect(() => {
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      stopRumble();
      stopBed();
    };
  }, []);

  useEffect(() => {
    if (slug) touchGame(slug);
  }, [slug, touchGame]);

  useEffect(() => {
    if (!soundOn || !def) return;
    const freq = theme?.skin === "egypt" ? 98 : theme?.skin === "huff" ? 82 : theme?.skin === "dragon" ? 73 : 110;
    startBed(freq);
    return () => stopBed();
  }, [soundOn, def, theme?.skin]);

  useEffect(() => {
    if (busy || !last?.lineWins.length) return;
    const t = window.setInterval(() => setLineCursor((n) => n + 1), 880);
    return () => window.clearInterval(t);
  }, [last, busy]);

  useEffect(() => {
    freeRef.current = freeSpins;
  }, [freeSpins]);
  useEffect(() => {
    specialRef.current = special;
  }, [special]);
  useEffect(() => {
    frozenRef.current = frozen;
  }, [frozen]);
  useEffect(() => {
    linkRef.current = link;
  }, [link]);
  useEffect(() => {
    turboRef.current = turbo;
  }, [turbo]);
  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);
  useEffect(() => {
    busyRef.current = busy;
  }, [busy]);
  useEffect(() => {
    gambleRef.current = gamble;
  }, [gamble]);
  useEffect(() => {
    celebrateRef.current = celebrate;
  }, [celebrate]);
  useEffect(() => {
    fsPhaseRef.current = fsPhase;
  }, [fsPhase]);
  useEffect(() => {
    autoRef.current = autoLeft;
  }, [autoLeft]);
  useEffect(() => {
    linesRef.current = merkurLines ? lineCount : (def?.paylines.length ?? 5);
  }, [lineCount, merkurLines, def?.paylines.length]);
  useEffect(() => {
    autoStopRef.current = autoStop;
  }, [autoStop]);

  useEffect(() => {
    if (fsPhase !== "pick" || !def) return;
    const list = specialPool(def);
    let n = 0;
    const tick = window.setInterval(() => {
      n += 1;
      setPickIndex(n % list.length);
    }, 180);
    const stop = window.setTimeout(() => {
      window.clearInterval(tick);
      const chosen = pickSpecial(def);
      setSpecial(chosen);
      setPickIndex(Math.max(0, list.findIndex((s) => s.id === chosen.id)));
      setFsPhase("ready");
      if (soundOn) sfx.cash();
    }, 2800);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(stop);
    };
  }, [fsPhase, def, soundOn]);

  const wait = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const t = window.setTimeout(resolve, ms);
      timers.current.push(t);
    });
  }, []);

  const showWin = useCallback((payout: number, stakeAmt: number) => {
    const tier = winTier(payout, stakeAmt);
    animateCount(payout);
    if (tier === "none") return;
    setBigWin(true);
    setStatueWin(true);
    window.setTimeout(() => setStatueWin(false), 2200);
    setCelebrate({ payout, stake: stakeAmt, tier });
  }, []);

  const dismissWin = useCallback(() => setCelebrate(null), []);

  useEffect(() => {
    if (fsPhase !== "idle" || busy || !def) return;
    if (celebrate || gamble || (link && link.phase !== "off" && link.phase !== "intro")) return;
    if (autoLeft > 0 || freeSpins > 0) {
      const t = window.setTimeout(() => runSpin(), freeSpins > 0 ? 720 : 420);
      return () => window.clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoLeft, busy, freeSpins, fsPhase, celebrate, gamble, link]);

  useEffect(() => {
    if (!link || link.phase !== "intro" || celebrate) return;
    const t = window.setTimeout(() => void respinLink(), turbo ? 360 : 720);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, celebrate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      unlockAudio();
      if (celebrateRef.current) {
        setCelebrate(null);
        return;
      }
      if (busyRef.current || fsPhaseRef.current !== "idle" || gambleRef.current != null) return;
      if (linkRef.current && linkRef.current.phase !== "off") return;
      spinRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!def || !info) {
    return (
      <p className="text-muted">
        Spiel nicht gefunden.{" "}
        <Link to="/" className="text-accent">
          Zurück zur Lobby
        </Link>
      </p>
    );
  }

  function stopTimes(): number[] {
    if (turboRef.current) return REEL_TURBO_MS.slice();
    if (info?.family === "merkur") return REEL_STOP_MERKUR.slice();
    if (def.mechanic === "burst") return REEL_STOP_BURST.slice();
    if (def.mechanic === "firelink") return REEL_STOP_HOLD.slice();
    if (info?.family === "pragmatic") return REEL_STOP_PRAG.slice();
    return REEL_STOP_MS.slice();
  }

  function paintGrid(grid: SlotSymbol[][], spinning: boolean, times: number[]) {
    setReels(
      grid.map((col, i) => ({
        strip: paintStrip(def!, col, i, REEL_PAD),
        offset: REEL_PAD,
        spinning,
        settleMs: times[i] ?? REEL_STOP_MS[i] ?? 2000,
      })),
    );
  }

  function runSpin() {
    unlockAudio();
    if (busyRef.current || !def) return;
    if (linkRef.current && linkRef.current.phase !== "off") return;
    if (gambleRef.current != null) return;
    const isFree = freeRef.current > 0 && fsPhaseRef.current === "idle";
    if (!isFree) {
      if (balance < bet) {
        setAutoLeft(0);
        setCashier(true);
        return;
      }
      if (!placeBet(bet, `${gameName} · Einsatz`)) return;
      if (autoRef.current > 0) setAutoLeft((n) => Math.max(0, n - 1));
    } else {
      setFreeSpins((n) => Math.max(0, n - 1));
    }
    if (soundRef.current) sfx.spin();
    startRumble();
    setBusy(true);
    busyRef.current = true;
    setLast(null);
    setDisplayWin(0);
    setBigWin(false);
    setExpanded([]);
    setScatterLit(0);
    setVanish(new Set());
    setCascadeLv(0);
    setGamble(null);
    setSpinKey((k) => k + 1);
    if (!isFree && def.tumble) cascadeMultRef.current = 1;

    if (!isFree) pityRef.current += 1;
    let force = 0;
    if (!isFree && pityRef.current >= (def.pityAfter ?? 22)) {
      force = def.mechanic === "firelink" ? 0 : def.symbols.some((s) => s.kind === "scatter") && (def.freeSpinsFrom ?? 99) <= 6 ? 3 : 0;
      if (def.mechanic !== "firelink") pityRef.current = 0;
    }

    let raw = spinGrid(def, force);
    if (!isFree && force === 0 && pityRef.current === 0 && def.leiter) {
      const high = def.symbols.find((s) => s.kind === "high") ?? def.symbols[0]!;
      for (let i = 0; i < Math.min(3, def.reels); i++) raw[i]![1] = high;
    }
    if (def.mechanic === "firelink" && !isFree && pityRef.current >= (def.pityAfter ?? 16)) {
      const pearl = def.symbols.find((s) => s.id === "pearl") ?? def.symbols.find((s) => s.id === "coin");
      if (pearl) {
        raw = forceCoins(raw, pearl, fireFrom);
        pityRef.current = 0;
      }
    }
    if (isFree && def.mechanic === "sticky") {
      const wild = def.symbols.find((s) => s.kind === "wild");
      if (wild && frozenRef.current.size) raw = applySticky(raw, frozenRef.current, wild);
    }

    const spec = isFree && def.expandingSpecial ? specialRef.current : null;
    gridRef.current = raw;

    const times = stopTimes();
    const scatterReels = raw.filter((col) => col.some((s) => s.kind === "scatter")).length;
    if (scatterReels >= 2) times[times.length - 1] = (times[times.length - 1] ?? 2000) + (turboRef.current ? 500 : 1400);
    const mid = raw[0]?.[1];
    if (def.leiter && mid && raw[1]?.[1]?.id === mid.id && mid.kind !== "low") {
      times[times.length - 1] = (times[times.length - 1] ?? 1600) + (turboRef.current ? 280 : 720);
    }
    paintGrid(raw, true, times);

    times.forEach((ms, i) => {
      const t = window.setTimeout(() => {
        if (soundRef.current) sfx.stop(i);
        setReels((cols) => cols.map((c, idx) => (idx === i ? { ...c, spinning: false } : c)));
        const landed = raw[i]!.filter((s) => s.kind === "scatter").length;
        if (landed) {
          setScatterLit((n) => n + landed);
          if (soundRef.current) sfx.scatter();
        }
        if (i === 3 && scatterReels >= 2 && soundRef.current) sfx.anticipate();
        if (i === 4) {
          stopRumble();
          if (spec) {
            const t2 = window.setTimeout(() => void afterLand(raw, raw, isFree, spec), turboRef.current ? 200 : 480);
            timers.current.push(t2);
          } else {
            void afterLand(raw, raw, isFree);
          }
        }
      }, ms);
      timers.current.push(t);
    });
  }
  spinRef.current = runSpin;

  async function afterLand(evalGrid: SlotSymbol[][], raw: SlotSymbol[][], isFree: boolean, bookSpecial?: SlotSymbol | null) {
    if (!def) return;
    const baseMult = isFree ? def.fsMultiplier : 1;

    if (def.tumble) {
      const result = await runCascades(evalGrid, bet, baseMult, isFree);
      settleResult(result, raw, isFree);
      return;
    }

    if (def.mechanic === "burst") {
      await runBurst(raw, isFree);
      return;
    }

    if (bookSpecial && def.expandingSpecial) {
      const min = expandMinCount(bookSpecial);
      const exp = expandGrid(raw, bookSpecial, min);
      if (exp.expandedReels.length) {
        if (soundRef.current) sfx.expand();
        for (let row = 0; row < def.rows; row++) {
          const r = row;
          setReels((cols) =>
            cols.map((c, idx) => {
              if (!exp.expandedReels.includes(idx)) return c;
              const strip = c.strip.slice();
              const pos = REEL_PAD + r;
              if (strip[pos]) strip[pos] = bookSpecial;
              return { ...c, strip };
            }),
          );
          await wait(turboRef.current ? 70 : 180);
        }
        setExpanded(exp.expandedReels);
        await wait(turboRef.current ? 200 : 520);
      }
      const result = evaluateBookSpin(def, raw, bookSpecial, bet, baseMult);
      settleResult(result, result.grid, isFree);
      return;
    }

    const lines = linesRef.current;
    const result = evaluateSpin(def, evalGrid, bet, baseMult, lines);
    const scatterEval = evaluateSpin(def, raw, bet, baseMult, lines);
    const merged: SpinResult = {
      ...result,
      scatterCount: scatterEval.scatterCount,
      scatterPayout: scatterEval.scatterPayout,
      freeSpinsAwarded: scatterEval.freeSpinsAwarded,
      totalPayout: result.lineWins.reduce((s, w) => s + w.payout, 0) + scatterEval.scatterPayout,
      expandedReels: result.expandedReels,
      grid: evalGrid,
    };
    settleResult(merged, raw, isFree);
  }

  async function runBurst(raw: SlotSymbol[][], isFree: boolean) {
    if (!def) return;
    let grid = raw;
    const sticky = new Set<number>();
    let total = 0;
    let last: SpinResult = evaluateSpin(def, grid, bet, 1, linesRef.current);
    for (let n = 0; n < 5; n++) {
      const exp = expandBurst(def, grid);
      if (exp.expanded.length) {
        grid = exp.grid;
        setExpanded(exp.expanded);
        paintGrid(grid, false, stopTimes());
        if (soundRef.current) sfx.expand();
        await wait(turboRef.current ? 180 : 420);
      }
      last = evaluateSpin(def, grid, bet, 1, linesRef.current);
      const pay = last.lineWins.reduce((s, w) => s + w.payout, 0);
      total += pay;
      setLast({ ...last, totalPayout: total, grid });
      setDisplayWin(total);
      const fresh = exp.expanded.filter((r) => !sticky.has(r));
      for (const r of exp.expanded) sticky.add(r);
      if (fresh.length === 0) break;
      await wait(turboRef.current ? 120 : 280);
      const next = spinGrid(def);
      for (const r of sticky) next[r] = grid[r]!;
      grid = next;
      setSpinKey((k) => k + 1);
      paintGrid(grid, true, turboRef.current ? REEL_TURBO_MS : REEL_STOP_MS);
      if (soundRef.current) sfx.spin();
      await wait(turboRef.current ? 500 : 1400);
      paintGrid(grid, false, stopTimes());
      await wait(turboRef.current ? 80 : 160);
    }
    settleResult({ ...last, totalPayout: total, grid }, grid, isFree);
  }

  async function runCascades(initial: SlotSymbol[][], stakeAmt: number, baseMult: number, isFree: boolean) {
    if (!def) {
      return evaluateSpin(SLOT_DEFS["neon-drift"]!, initial, stakeAmt, baseMult);
    }
    let grid = initial;
    let total = 0;
    let scatterPay = 0;
    let scatterCount = 0;
    let fsAwarded = 0;
    const lines = linesRef.current;
    let lastResult: SpinResult = evaluateSpin(def, grid, stakeAmt, baseMult, lines);
    for (let level = 0; level < 12; level++) {
      const persist = isFree && def.mechanic === "ways";
      const m = persist ? cascadeMultRef.current : baseMult * (level + 1);
      const result = evaluateSpin(def, grid, stakeAmt, m, lines);
      if (level === 0) {
        scatterPay = result.scatterPayout;
        scatterCount = result.scatterCount;
        fsAwarded = result.freeSpinsAwarded;
      }
      const linePay = result.lineWins.reduce((s, w) => s + w.payout, 0);
      if (linePay <= 0) {
        lastResult = {
          ...result,
          scatterCount,
          scatterPayout: scatterPay,
          freeSpinsAwarded: fsAwarded,
          totalPayout: total + (level === 0 ? scatterPay : 0),
          grid,
        };
        break;
      }
      total += linePay + (level === 0 ? scatterPay : 0);
      lastResult = {
        ...result,
        scatterCount,
        scatterPayout: scatterPay,
        freeSpinsAwarded: fsAwarded,
        totalPayout: total,
        grid,
      };
      setLast(lastResult);
      setDisplayWin(total);
      setCascadeLv(level + 1);
      const keys = winningCellKeys(result);
      setVanish(keys);
      if (soundRef.current) sfx.explode();
      await wait(turboRef.current ? 240 : 560);
      grid = dropAndFill(def, grid, keys);
      gridRef.current = grid;
      setVanish(new Set());
      paintGrid(grid, false, stopTimes());
      setSpinKey((k) => k + 1);
      if (persist) cascadeMultRef.current += 1;
      if (soundRef.current) sfx.tumble();
      await wait(turboRef.current ? 160 : 340);
    }
    return lastResult;
  }

  function settleResult(result: SpinResult, raw: SlotSymbol[][], isFree: boolean) {
    if (!def) return;
    setLast(result);
    setBusy(false);
    busyRef.current = false;
    gridRef.current = raw;

    if (def.mechanic === "sticky") {
      const next = new Set(isFree ? frozenRef.current : new Set<string>());
      collectWildKeys(raw).forEach((k) => next.add(k));
      if (isFree || result.freeSpinsAwarded) setFrozen(next);
      if (!isFree && !result.freeSpinsAwarded) setFrozen(new Set());
    }

    if (def.mechanic === "gems" && !isFree) {
      setGems((n) => {
        const next = Math.min(gemTarget, n + countGems(raw));
        if (n < gemTarget && next >= gemTarget) {
          window.setTimeout(() => {
            setFreeSpins((v) => v + def.freeSpinCount);
            setFsTotal((v) => v + def.freeSpinCount);
            setGems(0);
            if (soundRef.current) sfx.bonus();
          }, 400);
        }
        return next;
      });
    }

    if (def.mechanic === "fish" && isFree) {
      let fishers = 0;
      let fishPay = 0;
      raw.forEach((col) =>
        col.forEach((s) => {
          if (s.kind === "wild") fishers += 1;
          if (s.id === "fish") fishPay += Math.round(bet * (s.wildMult ?? 2));
        }),
      );
      if (fishers > 0 && fishPay > 0) {
        result = {
          ...result,
          totalPayout: result.totalPayout + fishPay * fishers,
          freeSpinsAwarded: result.freeSpinsAwarded + (fishers >= 2 ? 2 : 0),
        };
        setLast(result);
      }
    }

    if (result.freeSpinsAwarded) {
      pityRef.current = 0;
      if (isFree) {
        setFreeSpins((v) => v + result.freeSpinsAwarded);
        setFsTotal((v) => v + result.freeSpinsAwarded);
        if (soundRef.current) sfx.bonus();
      } else {
        setFsAward(result.freeSpinsAwarded);
        setFsPhase("intro");
        setAutoLeft(0);
        if (soundRef.current) sfx.bonus();
      }
    }

    if (def.mechanic === "firelink") {
      const coins = collectCoins(raw, def);
      if (coins.length >= fireFrom) {
        pityRef.current = 0;
        setAutoLeft(0);
        setLink({ coins, left: 3, phase: "intro" });
        if (soundRef.current) sfx.bonus();
      }
    }

    if (result.totalPayout > 0) {
      const risk = (def.leiter || def.mechanic === "gamble") && !isFree && autoRef.current <= 0 && !result.freeSpinsAwarded;
      if (risk) {
        setGamble(result.totalPayout);
        animateCount(result.totalPayout);
        if (soundRef.current) sfx.win(result.totalPayout >= bet * 8);
      } else {
        creditWin(result.totalPayout, `${gameName} · Gewinn`);
        if (soundRef.current) sfx.win(result.totalPayout >= bet * 8);
        showWin(result.totalPayout, bet);
      }
      if (!isFree && autoStopRef.current === "win") setAutoLeft(0);
    } else if (soundRef.current) {
      sfx.lose();
    }

    if (isFree && freeRef.current <= 1 && def.mechanic === "sticky") {
      window.setTimeout(() => setFrozen(new Set()), 500);
    }
  }

  async function respinLink() {
    const cur = linkRef.current;
    if (!cur || !def || cur.phase === "collect") return;
    if (cur.left <= 0 || cur.coins.length >= 15) {
      finishLink(cur.coins);
      return;
    }
    setLink({ ...cur, phase: "spin" });
    setBusy(true);
    busyRef.current = true;
    setSpinKey((k) => k + 1);
    if (soundRef.current) sfx.spin();
    startRumble();

    const pearl = def.symbols.find((s) => s.id === "pearl") ?? def.symbols.find((s) => s.id === "coin") ?? def.symbols[0]!;
    const locked = new Set(cur.coins.map((c) => `${c.reel}-${c.row}`));
    const base = gridRef.current ?? spinGrid(def);
    for (const c of cur.coins) base[c.reel]![c.row] = pearl;
    const raw = fillUnlocked(def, base, locked);
    for (const c of cur.coins) raw[c.reel]![c.row] = pearl;
    gridRef.current = raw;

    const times = stopTimes().map((ms) => Math.min(ms, turboRef.current ? 520 : 980));
    paintGrid(raw, true, times);
    await wait(Math.max(...times));
    stopRumble();
    setReels((cols) => cols.map((c) => ({ ...c, spinning: false })));
    if (soundRef.current) sfx.stop(4);

    const coins = collectCoins(raw, def, cur.coins);
    const gained = coins.length > cur.coins.length;
    const left = gained ? 3 : cur.left - 1;
    setLink({ coins, left, phase: left <= 0 || coins.length >= 15 ? "collect" : "intro" });
    setBusy(false);
    busyRef.current = false;
    if (left <= 0 || coins.length >= 15) finishLink(coins);
  }

  function finishLink(coins: CoinLock[]) {
    if (!def) return;
    const payout = coinPayout(coins, bet);
    setLink({ coins, left: 0, phase: "collect" });
    if (payout > 0) {
      creditWin(payout, `${gameName} · Fire Link`);
      showWin(payout, bet);
    }
  }

  function closeLink() {
    setLink(null);
  }

  function beginBonus() {
    if (def?.expandingSpecial) setFsPhase("pick");
    else {
      setSpecial(null);
      startFreeSpins(fsAward);
    }
  }

  function startFreeSpins(n: number) {
    setFreeSpins((v) => v + n);
    setFsTotal((v) => v + n);
    setFsPhase("idle");
    if (def?.tumble) cascadeMultRef.current = 1;
    if (soundOn) sfx.cash();
  }

  function animateCount(target: number) {
    const merkur = info?.family === "merkur";
    const start = performance.now();
    const dur = merkur ? Math.min(2800, 720 + target / 3) : Math.min(1100, 280 + target / 6);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, merkur ? 2 : 3);
      const raw = Math.round(target * eased);
      setDisplayWin(merkur && p < 1 ? Math.round(raw / 10) * 10 : raw);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplayWin(target);
    };
    requestAnimationFrame(tick);
  }

  return (
    <div className={cn("relative -mx-4 -mt-6 min-h-[calc(100dvh-4rem)] overflow-hidden sm:-mx-6", theme && `slot-skin-${theme.skin}`)}>
      <img src={info.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-bg/80" />
      <div className="pointer-events-none absolute inset-0 slot-dust" />
      <div className="pointer-events-none absolute inset-0 slot-glyphs" />

      {deco ? (
        <>
          <SideStatue
            video={deco.leftVid}
            image={deco.leftImg}
            side="left"
            win={statueWin}
            inFs={inFs}
            filter={theme?.leftFilter}
          />
          <SideStatue
            video={deco.rightVid}
            image={deco.rightImg}
            side="right"
            win={statueWin}
            inFs={inFs}
            flip={deco.flipRight}
            filter={theme?.rightFilter}
          />
        </>
      ) : null}

      <div className="relative z-20 mx-auto flex max-w-[42rem] flex-col px-2 pb-10 pt-2 sm:px-4">
        <div className="mb-1 flex items-center gap-2">
          <Link
            to="/"
            className="inline-flex size-11 items-center justify-center rounded-md text-fg/80 hover:text-fg"
            aria-label="Lobby"
          >
            <ChevronLeft className="size-5" />
          </Link>
          <div className="relative z-20 min-w-0 flex-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--slot-line,var(--color-accent))]">
              {theme?.kicker ?? "Aurelia · Slots"}
            </p>
            <h1 className="font-display text-3xl text-fg sm:text-4xl">{info.name}</h1>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:text-fg"
            aria-label="Gewinntabelle"
            onClick={() => setPayOpen(true)}
          >
            <Info className="size-4" />
          </button>
        </div>

        {deco?.header ? (
          <img
            src={deco.header}
            alt=""
            className="mx-auto -mt-1 mb-1 h-12 w-auto object-contain mix-blend-screen sm:h-16"
          />
        ) : null}

        <div className={cn("slot-bezel", theme && `slot-skin-${theme.skin}`, bigWin && "slot-shake")}>
          <div className={cn("slot-cabinet relative overflow-hidden", inFs && "slot-fs-glow")}>
            <div className="mb-2 flex items-center justify-between gap-2 px-1">
              {def.freeSpinsFrom <= 6 ? (
                <ScatterLamps
                  art={scatterSym?.art}
                  lit={Math.max(scatterLit, last?.scatterCount ?? 0)}
                  need={def.freeSpinsFrom}
                  label={scatterSym?.label ?? "Scatter"}
                  count={def.freeSpinCount}
                />
              ) : (
                <span className="text-[10px] uppercase tracking-wider text-muted">
                  {def.leiter
                    ? def.paysBothWays
                      ? "10 Linien · beide Richtungen · Risiko"
                      : def.stackedWilds
                        ? "243 Wege · Stacked Wilds · Risiko"
                        : `${def.paylines.length} Linien · Risiko · Leiter`
                    : def.paysBothWays
                      ? "10 Linien · beide Richtungen"
                      : `${def.paylines.length} Linien`}
                </span>
              )}
              <span className="shrink-0 text-[11px] uppercase tracking-wider tabular-nums text-accent">{info.rtp}</span>
            </div>

            {def.mechanic === "gems" ? <GemMeter value={gems} max={gemTarget} /> : null}
            {def.mechanic === "firelink" ? (
              <p className="mb-2 text-center text-[11px] uppercase tracking-wider text-muted">
                {link
                  ? `Fire Link · ${link.coins.length}/15 · ${link.left} Respins`
                  : `${fireFrom}× Feuer = Fire Link · Mini 20× · Minor 50× · Major 200× · Grand 1000×`}
              </p>
            ) : null}

            {inFs ? (
              <p className="mb-2 text-center font-display text-lg tracking-wide text-accent">
                Freispiel {Math.max(1, fsTotal - freeSpins)} / {fsTotal}
                {special ? ` · ${special.label} füllt die Walze` : ""}
                {def.expandingSpecial && special ? " · zahlt auf allen Linien" : ""}
                {def.tumble
                  ? ` · Tumble ×${cascadeMultRef.current}`
                  : def.mechanic === "ways"
                    ? " · 243 Wege"
                    : mult > 1
                      ? ` · ×${mult}`
                      : ""}
                {def.mechanic === "sticky" ? ` · ${frozen.size} Frozen` : ""}
              </p>
            ) : cascadeLv > 0 ? (
              <p className="mb-2 text-center font-display text-lg tracking-wide text-accent">Tumble ×{cascadeLv}</p>
            ) : (
              <p className="mb-2 text-center text-[11px] uppercase tracking-wider text-muted">
                {def.tumble
                  ? "243 Wege · Tumble"
                  : def.mechanic === "ways"
                    ? "243 Wege · gestapelte Wilds"
                    : def.bookWild
                      ? `${scatterSym?.label ?? "Buch"} = Scatter + Wild · Expanding zahlt auf allen Linien, auch mit Lücken`
                      : def.leiter
                        ? "Nach dem Gewinn: Karte oder Leiter"
                        : def.mechanic === "gamble"
                          ? "Risiko nach Gewinn"
                          : `${def.paylines.length} Linien`}
                {def.freeSpinCount > 0 && def.freeSpinsFrom <= 6 ? ` · ${def.freeSpinCount} Freispiele` : ""}
              </p>
            )}

            <div className="relative grid grid-cols-[22px_1fr_22px] gap-1 sm:grid-cols-[28px_1fr_28px]">
              <PayTicks
                side="left"
                count={Math.min(merkurLines ? lineCount : def.paylines.length, 5)}
                active={
                  last?.lineWins.some((w) => w.expanding)
                    ? def.paylines.map((_, i) => i)
                    : last?.lineWins.length
                      ? [last.lineWins[lineCursor % last.lineWins.length]!.line % 100]
                      : []
                }
              />
              <ReelBank
                reels={reels}
                spinKey={spinKey}
                busy={busy}
                winCells={winCells}
                expanded={expanded}
                anticipate={anticipating}
                vanish={vanish}
                frozen={def.mechanic === "sticky" ? frozen : undefined}
                variant={theme?.reel ?? "photo"}
                overlay={(ri, row) => {
                  const coin = link?.coins.find((c) => c.reel === ri && c.row === row);
                  if (coin) {
                    return (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0.5 z-10 text-center text-[10px] font-semibold tabular-nums text-accent">
                        {coin.jackpot ?? `${coin.mult}×`}
                      </span>
                    );
                  }
                  const cell = last?.grid[ri]?.[row];
                  if (cell?.wildMult && !busy) {
                    return (
                      <span className="pointer-events-none absolute inset-x-0 bottom-0.5 z-10 text-center text-[10px] font-semibold tabular-nums text-accent">
                        ×{cell.wildMult}
                      </span>
                    );
                  }
                  return null;
                }}
              />
              {def.paylines.length > 5 ? (
                <PayTicks
                  side="right"
                  count={5}
                  offset={5}
                  active={
                    last?.lineWins.some((w) => w.expanding)
                      ? def.paylines.map((_, i) => i)
                      : last?.lineWins.length
                        ? [last.lineWins[lineCursor % last.lineWins.length]!.line % 100]
                        : []
                  }
                />
              ) : (
                <span />
              )}
            </div>

            <div className="mt-3 min-h-7 text-center text-sm">
              {anticipating ? (
                <p className="font-display text-xl tracking-wide text-accent">Letzte Walze…</p>
              ) : link && link.phase !== "off" ? (
                <p className="font-display text-xl tracking-wide text-accent">
                  {link.phase === "collect" ? formatEuro(coinPayout(link.coins, bet)) : `${link.coins.length} Feuer`}
                </p>
              ) : bigWin && !celebrate ? (
                <p className="font-display text-2xl tracking-wide text-accent">GROSSGEWINN</p>
              ) : last && last.totalPayout > 0 ? (
                <p className="text-win">
                  {(() => {
                    const w = last.lineWins[lineCursor % Math.max(1, last.lineWins.length)];
                    const label = w?.expanding
                      ? `${w.count}× ${w.symbol.label} · ${w.ways ?? def.paylines.length} Linien · auch mit Lücken`
                      : def.mechanic === "ways"
                        ? `${last.lineWins.reduce((s, x) => s + (x.ways ?? 1), 0)} Wege`
                        : `Linie ${((w?.line ?? 0) % 100) + 1}/${last.lineWins.length}`;
                    const scatter = last.scatterCount >= 3 ? ` · ${last.scatterCount}× ${scatterSym?.label}` : "";
                    const extra =
                      last.expandedReels.length && !last.lineWins.some((x) => x.expanding) ? " · Expandiert" : "";
                    const amount = w?.expanding
                      ? last.totalPayout
                      : (last.lineWins[lineCursor % last.lineWins.length]?.payout ?? last.totalPayout);
                    return `${label}${scatter}${extra} · ${formatEuro(amount)}`;
                  })()}
                </p>
              ) : last ? (
                <p className="text-muted">Kein Gewinn</p>
              ) : (
                <p className="text-subtle">
                  {def.freeSpinCount > 0 && def.freeSpinsFrom <= 6
                    ? `3× ${scatterSym?.label ?? "Scatter"} = ${def.freeSpinCount} Freispiele`
                    : def.leiter
                      ? "Gewinn auf die Leiter oder kassieren"
                      : `${def.paylines.length} Linien · Einsatz wählen`}
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              {merkurLines ? (
                <div className="merkur-bet">
                  <div className="merkur-bet-cell">
                    <button
                      type="button"
                      className="size-11 text-fg"
                      disabled={busy || inFs || coinIdx === 0}
                      onClick={() => setCoinIdx((i) => Math.max(0, i - 1))}
                      aria-label="Münze senken"
                    >
                      <Minus className="mx-auto size-4" />
                    </button>
                    <span className="min-w-0 flex-1 text-center">
                      <span className="block text-[9px] uppercase tracking-wider text-subtle">Münze</span>
                      <span className="text-sm tabular-nums">{formatEuro(coin)}</span>
                    </span>
                    <button
                      type="button"
                      className="size-11 text-fg"
                      disabled={busy || inFs || coinIdx === coinSteps.length - 1}
                      onClick={() => setCoinIdx((i) => Math.min(coinSteps.length - 1, i + 1))}
                      aria-label="Münze erhöhen"
                    >
                      <Plus className="mx-auto size-4" />
                    </button>
                  </div>
                  <div className="merkur-bet-cell">
                    <button
                      type="button"
                      className="size-11 text-fg"
                      disabled={busy || inFs || lineCount <= 1}
                      onClick={() => setLineCount((n) => Math.max(1, n - 1))}
                      aria-label="Linien senken"
                    >
                      <Minus className="mx-auto size-4" />
                    </button>
                    <span className="min-w-0 flex-1 text-center">
                      <span className="block text-[9px] uppercase tracking-wider text-subtle">Linien</span>
                      <span className="text-sm tabular-nums">
                        {lineCount}/{def.paylines.length}
                      </span>
                    </span>
                    <button
                      type="button"
                      className="size-11 text-fg"
                      disabled={busy || inFs || lineCount >= def.paylines.length}
                      onClick={() => setLineCount((n) => Math.min(def.paylines.length, n + 1))}
                      aria-label="Linien erhöhen"
                    >
                      <Plus className="mx-auto size-4" />
                    </button>
                  </div>
                </div>
              ) : (
              <div className="flex items-center rounded-md border border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_35%,transparent)] bg-bg/70">
                <button
                  type="button"
                  className="size-11 text-fg"
                  disabled={busy || inFs || betIndex === 0}
                  onClick={() => setBetIndex((i) => Math.max(0, i - 1))}
                  aria-label="Einsatz senken"
                >
                  <Minus className="mx-auto size-4" />
                </button>
                <span className="min-w-16 text-center text-sm tabular-nums">{formatEuro(bet)}</span>
                <button
                  type="button"
                  className="size-11 text-fg"
                  disabled={busy || inFs || betIndex === def.betSteps.length - 1}
                  onClick={() => setBetIndex((i) => Math.min(def.betSteps.length - 1, i + 1))}
                  aria-label="Einsatz erhöhen"
                >
                  <Plus className="mx-auto size-4" />
                </button>
              </div>
              )}
              <div className="relative">
                <button
                  type="button"
                  disabled={busy && autoLeft === 0}
                  onClick={() => {
                    if (autoLeft > 0) {
                      setAutoLeft(0);
                      return;
                    }
                    setAutoOpen((v) => !v);
                  }}
                  className={cn(
                    "h-11 rounded-md border px-3 text-xs uppercase tracking-wider",
                    autoLeft > 0
                      ? "border-[var(--slot-line,var(--color-accent))] bg-[var(--slot-spin,var(--color-accent))] text-[var(--slot-spin-fg,var(--color-accent-fg))]"
                      : "border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_35%,transparent)] bg-bg/70 text-fg",
                  )}
                >
                  {autoLeft > 0 ? `Auto ${autoLeft}` : "Auto"}
                </button>
                {autoOpen ? (
                  <div className="absolute bottom-12 left-0 z-30 min-w-40 rounded-md border border-border bg-surface p-1">
                    <div className="flex gap-1">
                    {AUTO_OPTS.map((n) => (
                      <button
                        key={n}
                        type="button"
                        className="h-10 min-w-10 rounded-sm px-2 text-xs text-fg hover:bg-elevated"
                        onClick={() => {
                          setAutoLeft(n);
                          setAutoOpen(false);
                        }}
                      >
                        {n}
                      </button>
                    ))}
                    </div>
                    <div className="mt-1 flex gap-1">
                      {([
                        ["none", "Egal"],
                        ["win", "Gewinn"],
                        ["bonus", "Bonus"],
                      ] as const).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          className={cn(
                            "h-9 flex-1 rounded-sm px-1 text-[10px] uppercase tracking-wider",
                            autoStop === id ? "bg-elevated text-accent" : "text-muted hover:bg-elevated",
                          )}
                          onClick={() => setAutoStop(id)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => setTurbo((v) => !v)}
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-md border",
                  turbo
                    ? "border-[var(--slot-line,var(--color-accent))] bg-[var(--slot-spin,var(--color-accent))] text-[var(--slot-spin-fg,var(--color-accent-fg))]"
                    : "border-[color-mix(in_oklab,var(--slot-line,var(--color-accent))_35%,transparent)] bg-bg/70 text-fg",
                )}
                aria-label="Turbo"
              >
                <Zap className="size-4" />
              </button>
              <button
                type="button"
                disabled={busy || (!inFs && balance < bet)}
                onClick={() => runSpin()}
                className="relative ml-auto flex size-16 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold uppercase tracking-wider slot-spin-btn disabled:opacity-40 sm:size-[4.5rem]"
              >
                {busy ? "…" : inFs ? "Frei" : "Drehen"}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-center">
              {info.family === "merkur" ? (
                <div className="col-span-2">
                  <MerkurLeds credit={balance} bet={bet} win={displayWin} />
                </div>
              ) : (
                <>
                  <div className="rounded-md bg-bg/70 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Gewinn</p>
                    <p className="font-display text-xl tabular-nums text-[var(--slot-line,var(--color-accent))]">
                      {displayWin ? formatEuro(displayWin) : "—"}
                    </p>
                  </div>
                  <div className="rounded-md bg-bg/70 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-subtle">Guthaben</p>
                    <p className="font-display text-xl tabular-nums text-fg">{formatEuro(balance)}</p>
                  </div>
                </>
              )}
            </div>

            <NeedBankroll />
          </div>
        </div>
      </div>

      {fsPhase === "intro" ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg/80 px-4">
          <div className="w-full max-w-sm rounded-xl border-2 border-accent bg-surface p-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Scatter</p>
            <p className="mt-2 font-display text-4xl text-fg">Freispiele</p>
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className="size-16 overflow-hidden rounded-md slot-win">
                  {scatterSym ? <SymbolFace symbol={scatterSym} win /> : null}
                </span>
              ))}
            </div>
            <p className="mt-3 font-display text-5xl tabular-nums text-accent">{fsAward}</p>
            <p className="mt-2 text-sm text-muted">
              {def.expandingSpecial
                ? "Ein Symbol wird gewählt. Es füllt ganze Walzen und zahlt auf allen Linien — auch wenn die Walzen nicht nebeneinander liegen."
                : def.mechanic === "sticky"
                  ? "Wilds bleiben eingefroren."
                  : def.mechanic === "ways"
                    ? "Tumble-Multiplikator bleibt stehen."
                    : `Alle Gewinne ×${def.fsMultiplier}`}
            </p>
            <button
              type="button"
              className="mt-6 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg"
              onClick={beginBonus}
            >
              Bonus starten
            </button>
          </div>
        </div>
      ) : null}

      {fsPhase === "pick" || fsPhase === "ready" ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg/80 px-4">
          <div className="w-full max-w-md rounded-xl border-2 border-accent bg-surface p-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Sondersymbol</p>
            <p className="mt-2 font-display text-3xl text-fg">Expanding Symbol</p>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {pool.map((s, i) => (
                <div
                  key={s.id}
                  className={cn("h-16 overflow-hidden rounded-md", i === pickIndex ? "ring-2 ring-accent" : "opacity-50")}
                >
                  <SymbolFace symbol={s} win={i === pickIndex} />
                </div>
              ))}
            </div>
            {fsPhase === "ready" && special ? (
              <>
                <p className="mt-4 text-sm text-muted">
                  {special.label} füllt die Walze, sobald {expandMinCount(special) === 2 ? "2" : "3"} oder mehr
                  erscheinen — Gewinn auf allen Linien, auch mit Lücken.
                </p>
                <button
                  type="button"
                  className="mt-5 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg"
                  onClick={() => startFreeSpins(fsAward)}
                >
                  Freispiele starten
                </button>
              </>
            ) : (
              <p className="mt-4 text-sm text-subtle">Symbol wird gewählt…</p>
            )}
          </div>
        </div>
      ) : null}

      {link?.phase === "collect" && !celebrate ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg/80 px-4">
          <div className="w-full max-w-sm rounded-xl border-2 border-accent bg-surface p-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Fire Link</p>
            <p className="mt-2 font-display text-4xl text-fg">{link.coins.length} Feuer</p>
            <p className="mt-3 font-display text-4xl tabular-nums text-accent">{formatEuro(coinPayout(link.coins, bet))}</p>
            <button
              type="button"
              className="mt-6 h-12 w-full rounded-md bg-accent text-sm font-semibold uppercase tracking-wider text-accent-fg"
              onClick={closeLink}
            >
              Weiter
            </button>
          </div>
        </div>
      ) : null}

      {gamble != null ? (
        <MerkurRisk
          key={gamble}
          amount={gamble}
          soundOn={soundOn}
          onBank={(cents) => {
            creditWin(cents, `${gameName} · Hälfte`);
          }}
          onCollect={(cents) => {
            if (cents > 0) creditWin(cents, `${gameName} · Risiko`);
            setDisplayWin(cents);
            setGamble(null);
          }}
          onBust={() => {
            setGamble(null);
            setDisplayWin(0);
            setLast((v) => (v ? { ...v, totalPayout: 0, lineWins: [] } : v));
          }}
        />
      ) : null}

      {celebrate ? (
        <WinCelebration
          payout={celebrate.payout}
          stake={celebrate.stake}
          tier={celebrate.tier}
          soundOn={soundOn}
          onDone={dismissWin}
        />
      ) : null}

      <Paytable open={payOpen} onOpenChange={setPayOpen} def={def} stake={bet} name={info.name} />
    </div>
  );
}

function GemMeter({ value, max }: { value: number; max: number }) {
  return (
    <div className="mb-2 px-1">
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted">
        <span>Tresor</span>
        <span className="tabular-nums text-accent">
          {value}/{max}
        </span>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <span key={i} className={cn("h-1.5 flex-1 rounded-full", i < value ? "bg-accent" : "bg-elevated")} />
        ))}
      </div>
    </div>
  );
}

function ScatterLamps({
  art,
  lit,
  need,
  label,
  count,
}: {
  art?: string;
  lit: number;
  need: number;
  label: string;
  count: number;
}) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      {Array.from({ length: Math.min(need, 6) }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "size-7 overflow-hidden rounded-sm sm:size-8",
            i < lit ? "slot-win opacity-100" : "opacity-30",
          )}
        >
          {art ? <img src={art} alt="" className="h-full w-full object-cover" /> : <span className="block h-full w-full bg-elevated" />}
        </span>
      ))}
      <span className="truncate text-[10px] uppercase tracking-wider text-muted sm:text-[11px]">
        {need}× {label} = {count} FS
      </span>
    </div>
  );
}

function SideStatue({
  video,
  image,
  side,
  win,
  inFs,
  flip,
  filter,
}: {
  video: string;
  image: string;
  side: "left" | "right";
  win: boolean;
  inFs: boolean;
  flip?: boolean;
  filter?: string;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 z-[5] h-[48%] w-[38vw] max-w-[200px] sm:h-[78%] sm:w-[24vw] sm:max-w-[260px] lg:h-[84%] lg:max-w-[320px]",
        side === "left" ? "-left-3 origin-bottom-left sm:left-0" : "-right-3 origin-bottom-right sm:right-0",
        flip && "scale-x-[-1]",
      )}
    >
      <video
        src={video}
        poster={image}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={filter ? { filter } : undefined}
        className={cn(
          "h-full w-full object-contain object-bottom slot-statue",
          win && "slot-statue-win",
          inFs && "slot-statue-fs",
        )}
      />
      <span className={cn("slot-torch", side === "left" ? "left-[42%]" : "right-[42%]")} />
    </div>
  );
}

function MerkurLeds({ credit, bet, win }: { credit: number; bet: number; win: number }) {
  return (
    <div className="merkur-leds">
      <LedCell label="CREDIT" cents={credit} />
      <LedCell label="BET" cents={bet} />
      <LedCell label="WIN" cents={win} lit={win > 0} />
    </div>
  );
}

function LedCell({ label, cents, lit }: { label: string; cents: number; lit?: boolean }) {
  const val = formatLed(cents);
  return (
    <div className={cn("merkur-led", lit && "is-lit")}>
      <p className="merkur-led-label">{label}</p>
      <p className="merkur-led-readout">
        <span className="risk-led-ghost" aria-hidden>
          {ledGhost(val)}
        </span>
        <span className="risk-led-val">{val}</span>
      </p>
    </div>
  );
}

function PayTicks({
  active,
  count = 5,
  offset = 0,
}: {
  side: "left" | "right";
  active: number[];
  count?: number;
  offset?: number;
}) {
  const nums = Array.from({ length: count }, (_, i) => offset + i + 1);
  return (
    <div className="flex flex-col justify-around py-2">
      {nums.map((n) => (
        <span
          key={n}
          className={cn(
            "text-center text-[9px] tabular-nums",
            active.includes(n - 1) ? "text-[var(--slot-line,var(--color-accent))]" : "text-subtle",
          )}
        >
          {n}
        </span>
      ))}
    </div>
  );
}
