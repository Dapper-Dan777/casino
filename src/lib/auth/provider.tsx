import { useEffect, type ReactNode } from "react";
import { setCasinoAccountScope, useCasino } from "@/lib/casino/store";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

/**
 * App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
 *
 *   <AuthProvider><Outlet /></AuthProvider>
 *
 * This keeps the active account scope in sync with the logged-in user so every
 * account keeps its own saved balance, VIP state, favorites, recent games, and
 * profile data in localStorage.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user } = useCurrentUserState();

  useEffect(() => {
    setCasinoAccountScope(user?.id ?? null);
    useCasino.persist.rehydrate();
  }, [user?.id]);

  return <>{children}</>;
}
