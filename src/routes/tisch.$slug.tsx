import { createFileRoute, Link } from "@tanstack/react-router";
import { BlackjackView } from "@/components/casino/BlackjackView";
import { RouletteView } from "@/components/casino/RouletteView";
import { BaccaratView } from "@/components/casino/BaccaratView";
import { DragonTigerView } from "@/components/casino/DragonTigerView";
import { SicBoView } from "@/components/casino/SicBoView";
import { GameErrorComponent } from "@/lib/error-component";

export const Route = createFileRoute("/tisch/$slug")({
  component: TablePage,
  errorComponent: GameErrorComponent,
});

function TablePage() {
  const { slug } = Route.useParams();
  if (slug === "blackjack") return <BlackjackView />;
  if (slug === "roulette") return <RouletteView />;
  if (slug === "baccarat") return <BaccaratView />;
  if (slug === "drache-tiger") return <DragonTigerView />;
  if (slug === "sicbo") return <SicBoView />;
  return (
    <p className="text-muted">
      Tisch nicht gefunden.{" "}
      <Link to="/" className="text-accent">
        Zur Lobby
      </Link>
    </p>
  );
}
