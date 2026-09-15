import { createFileRoute } from "@tanstack/react-router";
import { SportView } from "@/components/casino/SportView";

export const Route = createFileRoute("/sport")({ component: SportView });
