import { createFileRoute } from "@tanstack/react-router";
import { KontoView } from "@/components/casino/KontoView";

export const Route = createFileRoute("/konto")({ component: KontoView });
