import { createRootRoute, HeadContent, Navigate, Outlet, Scripts, useLocation } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { CasinoShell } from "@/components/casino/Shell";
import { authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import appCss from "../styles.css?url";

const APP_NAME = "Aurelia";

function AppRoot() {
  const location = useLocation();
  const { user, isPending } = useCurrentUserState();

  const publicPaths = ["/login", "/preview", "/api", "/auth"];
  const isPublic = publicPaths.some((p) => location.pathname === p || location.pathname.startsWith(`${p}/`));

  if (!isPublic && authEnabled && isPending) {
    return (
      <html lang="de" suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body className="antialiased bg-[#090b0d] text-white">
          <div className="grid min-h-screen place-items-center px-4">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.32em] text-amber-300">Aurelia</p>
              <p className="mt-4 text-lg text-white/80">Konto wird geladen…</p>
            </div>
          </div>
          <Scripts />
        </body>
      </html>
    );
  }

  if (!isPublic && authEnabled && !user) {
    return <Navigate to="/preview" replace />;
  }

  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          {isPublic ? (
            <Outlet />
          ) : (
            <CasinoShell>
              <Outlet />
            </CasinoShell>
          )}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0a0b0c" },
      {
        name: "description",
        content: "Aurelia — Spielgeld-Casino und Wettstudio. Slots, Live, Sport, Originals. Nur Demo, kein Echtgeld.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: AppRoot,
});
