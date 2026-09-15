import { createFileRoute, Link } from "@tanstack/react-router";
import { SlotView } from "@/components/casino/SlotView";
import { HuffView } from "@/components/casino/HuffView";
import { TripleChanceView } from "@/components/casino/TripleChanceView";
import { OlympusView } from "@/components/casino/OlympusView";
import { GluecksradView } from "@/components/casino/GluecksradView";
import { KenoView } from "@/components/casino/KenoView";
import { AnglerView } from "@/components/casino/AnglerView";
import { BienenView } from "@/components/casino/BienenView";
import { WegeView } from "@/components/casino/WegeView";
import { TrainView } from "@/components/casino/TrainView";
import { DiceView } from "@/components/casino/DiceView";
import { HiLoView } from "@/components/casino/HiLoView";
import { CasinoHoldemView } from "@/components/casino/CasinoHoldemView";
import { TowersView } from "@/components/casino/TowersView";
import { LimboView } from "@/components/casino/LimboView";
import { ScratchView } from "@/components/casino/ScratchView";
import { DragonTigerView } from "@/components/casino/DragonTigerView";
import { SportView } from "@/components/casino/SportView";
import { SicBoView } from "@/components/casino/SicBoView";
import { VideoPokerView } from "@/components/casino/VideoPokerView";
import { RouletteView } from "@/components/casino/RouletteView";
import { BONBON_PACK } from "@/lib/casino/bonbon";
import { PlinkoView } from "@/components/casino/PlinkoView";
import { MinesView } from "@/components/casino/MinesView";
import { CrashView } from "@/components/casino/CrashView";
import { BlackjackView } from "@/components/casino/BlackjackView";
import { BaccaratView } from "@/components/casino/BaccaratView";
import { GameSplash } from "@/components/casino/GameSplash";
import { gameBySlug } from "@/lib/casino/catalog";
import { GameErrorComponent } from "@/lib/error-component";

export const Route = createFileRoute("/spiel/$slug")({
  component: GamePage,
  errorComponent: GameErrorComponent,
});

function GamePage() {
  const { slug } = Route.useParams();
  return <GameSplash slug={slug}>{<GameInner slug={slug} />}</GameSplash>;
}

function GameInner({ slug }: { slug: string }) {
  const game = gameBySlug(slug);
  if (slug === "huff-und-puff") return <HuffView />;
  if (slug === "triple-chance") return <TripleChanceView />;
  if (slug === "olymp-tor") return <OlympusView />;
  if (slug === "bonbon-regen") return <OlympusView pack={BONBON_PACK} />;
  if (slug === "raubfisch") return <AnglerView />;
  if (slug === "bienenrausch") return <BienenView />;
  if (slug === "wegeflut") return <WegeView />;
  if (slug === "schatzzug") return <TrainView />;
  if (slug === "sport") return <SportView />;
  if (slug === "sicbo") return <SicBoView />;
  if (slug === "videopoker") return <VideoPokerView />;
  if (slug === "wuerfel") return <DiceView />;
  if (slug === "hi-lo") return <HiLoView />;
  if (slug === "casino-holdem") return <CasinoHoldemView />;
  if (slug === "towers") return <TowersView />;
  if (slug === "schwelle") return <LimboView />;
  if (slug === "rubbellos") return <ScratchView />;
  if (slug === "drache-tiger") return <DragonTigerView />;
  if (slug === "gluecksrad") return <GluecksradView />;
  if (slug === "keno") return <KenoView />;
  if (slug === "blitz-roulette") return <RouletteView lightning />;
  if (slug === "plinko") return <PlinkoView />;
  if (slug === "minen") return <MinesView />;
  if (slug === "lift") return <CrashView />;
  if (slug === "blackjack") return <BlackjackView />;
  if (slug === "roulette") return <RouletteView />;
  if (slug === "baccarat") return <BaccaratView />;
  if (game?.kind === "slot") return <SlotView slug={slug} />;
  return (
    <p className="text-muted">
      Spiel nicht gefunden.{" "}
      <Link to="/" className="text-accent">
        Zur Lobby
      </Link>
    </p>
  );
}
