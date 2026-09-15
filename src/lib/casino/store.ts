import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PaymentMethodId } from "./catalog";
import { JACKPOT_SEED, MISSIONS, rakebackDue, streakReward, todayKey, type MissionId } from "./operator";
import { cashoutValue, sportBoard, ticketStatus, type SportTicket } from "./sport";

const SAVE_VERSION = 1;
const STORE_PREFIX = "aurelia-casino-v1";

export function setCasinoAccountScope(userId: string | null): void {
  if (typeof globalThis === "undefined") return;
  (globalThis as typeof globalThis & { __aureliaAccountId?: string | null }).__aureliaAccountId =
    userId ?? "guest";
}

function getCasinoStorageKey(): string {
  if (typeof window === "undefined") return `${STORE_PREFIX}-guest`;
  const key = (globalThis as typeof globalThis & { __aureliaAccountId?: string | null }).__aureliaAccountId;
  return `${STORE_PREFIX}-${key ?? "guest"}`;
}

const casinoStorage = createJSONStorage<Partial<CasinoState>>(() => ({
  getItem: () => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(getCasinoStorageKey());
    } catch {
      return null;
    }
  },
  setItem: (_name: string, value: string) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(getCasinoStorageKey(), value);
    } catch {
      // ignore quota/storage issues
    }
  },
  removeItem: () => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(getCasinoStorageKey());
    } catch {
      // ignore
    }
  },
}));

export type TxKind = "deposit" | "withdraw" | "bet" | "win" | "bonus";

export type Transaction = {
  id: string;
  kind: TxKind;
  cents: number;
  label: string;
  at: number;
  method?: PaymentMethodId;
};

export type Notif = { id: string; title: string; body: string; at: number; read: boolean };

export type CasinoState = {
  version: number;
  hydrated: boolean;
  ageVerified: boolean;
  cashierOpen: boolean;
  soundOn: boolean;
  balance: number;
  bonusBalance: number;
  totalDeposited: number;
  totalWithdrawn: number;
  welcomeUsed: boolean;
  starterClaimed: boolean;
  transactions: Transaction[];
  recent: string[];
  favorites: string[];
  wagered: number;
  wageredToday: number;
  winsToday: number;
  gamesToday: string[];
  missionDay: string;
  claimedMissions: MissionId[];
  dailyClaimed: boolean;
  jackpot: number;
  tourneyBest: number;
  rakebackTaken: number;
  drop: { text: string; cents: number } | null;
  sportTickets: SportTicket[];
  dayLimit: number;
  pausedUntil: number;
  streak: number;
  streakDay: string;
  notifs: Notif[];
  sessionStarted: number;
  markHydrated: () => void;
  verifyAge: () => void;
  setCashierOpen: (open: boolean) => void;
  toggleSound: () => void;
  deposit: (cents: number, method: PaymentMethodId, bonusCode?: string) => { ok: true; bonus: number } | { ok: false; reason: string };
  withdraw: (cents: number) => { ok: true } | { ok: false; reason: string };
  placeBet: (cents: number, label: string) => boolean;
  creditWin: (cents: number, label: string) => void;
  grantStarter: () => boolean;
  touchGame: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  claimMission: (id: MissionId) => boolean;
  claimDaily: () => boolean;
  claimRakeback: () => number;
  clearDrop: () => void;
  tickJackpot: () => void;
  placeSport: (legs: SportTicket["legs"], stake: number) => { ok: true; id: string } | { ok: false; reason: string };
  settleSports: (now?: number) => void;
  cashoutSport: (id: string) => number;
  setDayLimit: (cents: number) => void;
  pausePlay: (hours: number) => void;
  markNotifsRead: () => void;
};

function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

const MAX_TX = 80;

function pushNotif(list: Notif[], n: Omit<Notif, "id" | "read">): Notif[] {
  return [{ id: uid(), read: false, ...n }, ...list].slice(0, 24);
}

function pushTx(list: Transaction[], tx: Transaction): Transaction[] {
  return [tx, ...list].slice(0, MAX_TX);
}

export const useCasino = create<CasinoState>()(
  persist(
    (set, get) => ({
      version: SAVE_VERSION,
      hydrated: false,
      ageVerified: false,
      cashierOpen: false,
      soundOn: true,
      balance: 0,
      bonusBalance: 0,
      totalDeposited: 0,
      totalWithdrawn: 0,
      welcomeUsed: false,
      starterClaimed: false,
      transactions: [],
      recent: [],
      favorites: [],
      wagered: 0,
      wageredToday: 0,
      winsToday: 0,
      gamesToday: [],
      missionDay: todayKey(),
      claimedMissions: [],
      dailyClaimed: false,
      jackpot: JACKPOT_SEED,
      tourneyBest: 0,
      rakebackTaken: 0,
      drop: null,
      sportTickets: [],
      dayLimit: 0,
      pausedUntil: 0,
      streak: 0,
      streakDay: "",
      notifs: [],
      sessionStarted: 0,
      markHydrated: () => set({ hydrated: true, sessionStarted: get().sessionStarted || Date.now() }),
      verifyAge: () => set({ ageVerified: true }),
      setCashierOpen: (open) => set({ cashierOpen: open }),
      toggleSound: () => set({ soundOn: !get().soundOn }),
      deposit: (cents, method, bonusCode) => {
        if (cents < 1000) return { ok: false, reason: "Mindesteinzahlung 10,00 €" };
        if (cents > 500000) return { ok: false, reason: "Maximale Einzahlung 5.000,00 €" };
        const code = (bonusCode ?? "").trim().toUpperCase();
        let bonus = 0;
        const welcome = !get().welcomeUsed && (code === "WELCOME" || code === "AURELIA");
        if (welcome) bonus = Math.min(cents, 10000);
        const tx: Transaction = {
          id: uid(),
          kind: "deposit",
          cents,
          label: `Einzahlung · ${method}`,
          at: Date.now(),
          method,
        };
        set((s) => {
          const next = {
            balance: s.balance + cents + bonus,
            bonusBalance: s.bonusBalance + bonus,
            totalDeposited: s.totalDeposited + cents,
            welcomeUsed: s.welcomeUsed || welcome,
            transactions: pushTx(s.transactions, tx),
          };
          if (bonus > 0) {
            next.transactions = pushTx(next.transactions, {
              id: uid(),
              kind: "bonus",
              cents: bonus,
              label: "Willkommensbonus 100 %",
              at: Date.now(),
            });
          }
          return next;
        });
        return { ok: true, bonus };
      },
      withdraw: (cents) => {
        const s = get();
        if (cents < 2000) return { ok: false, reason: "Mindestauszahlung 20,00 €" };
        if (cents > s.balance) return { ok: false, reason: "Nicht genug Guthaben" };
        set({
          balance: s.balance - cents,
          totalWithdrawn: s.totalWithdrawn + cents,
          transactions: pushTx(s.transactions, {
            id: uid(),
            kind: "withdraw",
            cents,
            label: "Auszahlung",
            at: Date.now(),
          }),
        });
        return { ok: true };
      },
      placeBet: (cents, label) => {
        const s = get();
        if (cents <= 0 || cents > s.balance) return false;
        if (s.pausedUntil > Date.now()) return false;
        const day = todayKey();
        const reset = s.missionDay !== day;
        const wageredToday = reset ? cents : s.wageredToday + cents;
        if (s.dayLimit > 0 && wageredToday > s.dayLimit) return false;
        set({
          balance: s.balance - cents,
          wagered: s.wagered + cents,
          wageredToday,
          winsToday: reset ? 0 : s.winsToday,
          gamesToday: reset ? [] : s.gamesToday,
          missionDay: day,
          claimedMissions: reset ? [] : s.claimedMissions,
          dailyClaimed: reset ? false : s.dailyClaimed,
          jackpot: s.jackpot + Math.max(2, Math.floor(cents * 0.018)),
          transactions: pushTx(s.transactions, {
            id: uid(),
            kind: "bet",
            cents,
            label,
            at: Date.now(),
          }),
        });
        return true;
      },
      creditWin: (cents, label) => {
        if (cents <= 0) return;
        set((s) => {
          const day = todayKey();
          const reset = s.missionDay !== day;
          const jackpotHit = cents >= 50000 && Math.random() < 0.08;
          const dropAmt = jackpotHit ? Math.min(s.jackpot, Math.round(s.jackpot * 0.04)) : 0;
          return {
            balance: s.balance + cents + dropAmt,
            winsToday: reset ? 1 : s.winsToday + 1,
            missionDay: day,
            claimedMissions: reset ? [] : s.claimedMissions,
            dailyClaimed: reset ? false : s.dailyClaimed,
            tourneyBest: Math.max(s.tourneyBest, cents),
            jackpot: dropAmt ? Math.max(JACKPOT_SEED / 2, s.jackpot - dropAmt) : s.jackpot,
            drop: dropAmt
              ? { text: `Prize Drop · ${label}`, cents: dropAmt }
              : s.drop,
            transactions: pushTx(s.transactions, {
              id: uid(),
              kind: "win",
              cents,
              label,
              at: Date.now(),
            }),
          };
        });
      },
      grantStarter: () => {
        const s = get();
        if (s.starterClaimed || s.balance > 0) return false;
        set({
          starterClaimed: true,
          balance: s.balance + 5000,
          bonusBalance: s.bonusBalance + 5000,
          transactions: pushTx(s.transactions, {
            id: uid(),
            kind: "bonus",
            cents: 5000,
            label: "Willkommensguthaben",
            at: Date.now(),
          }),
        });
        return true;
      },
      touchGame: (slug) => {
        set((s) => {
          const day = todayKey();
          const reset = s.missionDay !== day;
          const games = reset ? [slug] : s.gamesToday.includes(slug) ? s.gamesToday : [...s.gamesToday, slug].slice(0, 12);
          return {
            recent: [slug, ...s.recent.filter((x) => x !== slug)].slice(0, 8),
            gamesToday: games,
            missionDay: day,
            claimedMissions: reset ? [] : s.claimedMissions,
            dailyClaimed: reset ? false : s.dailyClaimed,
            wageredToday: reset ? 0 : s.wageredToday,
            winsToday: reset ? 0 : s.winsToday,
          };
        });
      },
      toggleFavorite: (slug) => {
        set((s) => ({
          favorites: s.favorites.includes(slug) ? s.favorites.filter((x) => x !== slug) : [slug, ...s.favorites].slice(0, 16),
        }));
      },
      claimMission: (id) => {
        const s = get();
        const day = todayKey();
        if (s.missionDay !== day) return false;
        if (s.claimedMissions.includes(id)) return false;
        const m = MISSIONS.find((x) => x.id === id);
        if (!m) return false;
        const progress =
          id === "wager" ? s.wageredToday : id === "wins" ? s.winsToday : id === "variety" ? s.gamesToday.length : s.dailyClaimed ? 1 : 0;
        if (progress < m.target) return false;
        set({
          balance: s.balance + m.reward,
          claimedMissions: [...s.claimedMissions, id],
          transactions: pushTx(s.transactions, {
            id: uid(),
            kind: "bonus",
            cents: m.reward,
            label: `Mission · ${m.title}`,
            at: Date.now(),
          }),
        });
        return true;
      },
      claimDaily: () => {
        const s = get();
        const day = todayKey();
        if (s.dailyClaimed && s.missionDay === day) return false;
        const reset = s.missionDay !== day;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yKey = yesterday.toISOString().slice(0, 10);
        const streak = s.streakDay === yKey ? s.streak + 1 : s.streakDay === day ? s.streak : 1;
        const reward = streakReward(streak);
        set({
          missionDay: day,
          dailyClaimed: true,
          streak,
          streakDay: day,
          claimedMissions: reset ? ["daily"] : s.claimedMissions.includes("daily") ? s.claimedMissions : [...s.claimedMissions, "daily"],
          wageredToday: reset ? 0 : s.wageredToday,
          winsToday: reset ? 0 : s.winsToday,
          gamesToday: reset ? [] : s.gamesToday,
          balance: s.balance + reward,
          transactions: pushTx(s.transactions, {
            id: uid(),
            kind: "bonus",
            cents: reward,
            label: `Tagesbonus · ${streak} Tage`,
            at: Date.now(),
          }),
          notifs: pushNotif(s.notifs, {
            title: "Tagesbonus",
            body: `${streak} Tage in Folge`,
            at: Date.now(),
          }),
        });
        return true;
      },
      claimRakeback: () => {
        const s = get();
        const due = rakebackDue(s.wagered, s.rakebackTaken);
        if (due <= 0) return 0;
        set({
          rakebackTaken: s.rakebackTaken + due,
          balance: s.balance + due,
          transactions: pushTx(s.transactions, {
            id: uid(),
            kind: "bonus",
            cents: due,
            label: "VIP Rakeback",
            at: Date.now(),
          }),
          notifs: pushNotif(s.notifs, { title: "Rakeback", body: "VIP-Anteil gutgeschrieben", at: Date.now() }),
        });
        return due;
      },
      clearDrop: () => set({ drop: null }),
      tickJackpot: () => set((s) => ({ jackpot: s.jackpot + Math.floor(Math.random() * 18) + 4 })),
      placeSport: (legs, stake) => {
        const s = get();
        if (!legs.length || stake < 50) return { ok: false, reason: "Mindesteinsatz 0,50 €" };
        if (s.pausedUntil > Date.now()) return { ok: false, reason: "Pause aktiv" };
        if (!get().placeBet(stake, legs.length > 1 ? "Kombi" : "Sport")) {
          return { ok: false, reason: "Einsatz nicht möglich" };
        }
        const odds = Math.round(legs.reduce((a, l) => a * l.odds, 1) * 100) / 100;
        const ticket: SportTicket = {
          id: uid(),
          legs,
          stake,
          odds,
          status: "open",
          payout: 0,
          at: Date.now(),
        };
        set((cur) => ({ sportTickets: [ticket, ...cur.sportTickets].slice(0, 40) }));
        return { ok: true, id: ticket.id };
      },
      settleSports: (now = Date.now()) => {
        const s = get();
        const events = sportBoard(now);
        let bal = s.balance;
        let tickets = s.sportTickets ?? [];
        let txs = s.transactions;
        let notifs = s.notifs;
        let wins = s.winsToday;
        let changed = false;
        tickets = tickets.map((t) => {
          if (t.status !== "open") return t;
          const st = ticketStatus(t, events, now);
          if (st === "open") return t;
          changed = true;
          if (st === "won") {
            const payout = Math.round(t.stake * t.odds);
            bal += payout;
            wins += 1;
            txs = pushTx(txs, { id: uid(), kind: "win", cents: payout, label: "Sport gewonnen", at: now });
            notifs = pushNotif(notifs, { title: "Wette gewonnen", body: t.legs[0]?.label ?? "Kombi", at: now });
            return { ...t, status: "won" as const, payout };
          }
          notifs = pushNotif(notifs, { title: "Wette verloren", body: t.legs[0]?.label ?? "Kombi", at: now });
          return { ...t, status: "lost" as const, payout: 0 };
        });
        if (changed) set({ balance: bal, sportTickets: tickets, transactions: txs, notifs, winsToday: wins });
      },
      cashoutSport: (id) => {
        const s = get();
        const t = s.sportTickets.find((x) => x.id === id);
        if (!t || t.status !== "open") return 0;
        const now = Date.now();
        const val = cashoutValue(t, sportBoard(now), now);
        if (val <= 0) return 0;
        set({
          balance: s.balance + val,
          sportTickets: s.sportTickets.map((x) => (x.id === id ? { ...x, status: "cashed" as const, payout: val } : x)),
          transactions: pushTx(s.transactions, { id: uid(), kind: "win", cents: val, label: "Cashout", at: now }),
          notifs: pushNotif(s.notifs, { title: "Cashout", body: t.legs[0]?.label ?? "Kombi", at: now }),
        });
        return val;
      },
      setDayLimit: (cents) => set({ dayLimit: Math.max(0, cents) }),
      pausePlay: (hours) =>
        set((s) => ({
          pausedUntil: Date.now() + Math.max(1, hours) * 3600_000,
          notifs: pushNotif(s.notifs, { title: "Pause", body: `${hours} Stunden Spielpause`, at: Date.now() }),
        })),
      markNotifsRead: () => set((s) => ({ notifs: s.notifs.map((n) => ({ ...n, read: true })) })),
    }),
    {
      name: STORE_PREFIX,
      storage: casinoStorage,
      skipHydration: true,
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CasinoState>;
        return {
          ...current,
          ...p,
          hydrated: current.hydrated,
          cashierOpen: false,
          ageVerified: Boolean(current.ageVerified || p.ageVerified),
          starterClaimed: Boolean(current.starterClaimed || p.starterClaimed),
          welcomeUsed: Boolean(current.welcomeUsed || p.welcomeUsed),
          balance: Math.max(current.balance, p.balance ?? 0),
          bonusBalance: Math.max(current.bonusBalance, p.bonusBalance ?? 0),
          wagered: Math.max(current.wagered, p.wagered ?? 0),
          jackpot: Math.max(p.jackpot ?? JACKPOT_SEED, JACKPOT_SEED / 2),
          tourneyBest: Math.max(current.tourneyBest, p.tourneyBest ?? 0),
          rakebackTaken: Math.max(current.rakebackTaken ?? 0, p.rakebackTaken ?? 0),
          sportTickets: p.sportTickets ?? current.sportTickets,
          dayLimit: p.dayLimit ?? current.dayLimit,
          pausedUntil: p.pausedUntil ?? 0,
          streak: Math.max(current.streak ?? 0, p.streak ?? 0),
          streakDay: p.streakDay ?? current.streakDay,
          notifs: (p.notifs ?? []).slice(0, 24),
          sessionStarted: current.sessionStarted || Date.now(),
          drop: null,
        };
      },
      onRehydrateStorage: () => () => {
        useCasino.getState().markHydrated();
      },
      partialize: (s): Partial<CasinoState> => ({
        version: s.version,
        ageVerified: s.ageVerified,
        soundOn: s.soundOn,
        balance: s.balance,
        bonusBalance: s.bonusBalance,
        totalDeposited: s.totalDeposited,
        totalWithdrawn: s.totalWithdrawn,
        welcomeUsed: s.welcomeUsed,
        starterClaimed: s.starterClaimed,
        transactions: s.transactions,
        recent: s.recent,
        favorites: s.favorites,
        wagered: s.wagered,
        wageredToday: s.wageredToday,
        winsToday: s.winsToday,
        gamesToday: s.gamesToday,
        missionDay: s.missionDay,
        claimedMissions: s.claimedMissions,
        dailyClaimed: s.dailyClaimed,
        jackpot: s.jackpot,
        tourneyBest: s.tourneyBest,
        rakebackTaken: s.rakebackTaken,
        sportTickets: s.sportTickets,
        dayLimit: s.dayLimit,
        pausedUntil: s.pausedUntil,
        streak: s.streak,
        streakDay: s.streakDay,
        notifs: s.notifs,
      }),
    },
  ),
);

export function rehydrateCasino(): void {
  const result = useCasino.persist.rehydrate();
  Promise.resolve(result).then(() => {
    useCasino.getState().markHydrated();
  });
}
