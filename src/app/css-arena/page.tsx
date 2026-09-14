import { Metadata } from "next";
import { CssArenaWorkspace } from "@/components/css-arena/CssArenaWorkspace";

export const metadata: Metadata = {
  title: "CSS Flex & Grid Arena | Minigame de Layouts",
  description:
    "Domine CSS Flexbox e CSS Grid através de um minigame gamificado: posicione drones espaciais e alinhe propulsores em portais neon em tempo real.",
  keywords: [
    "css flexbox",
    "css grid",
    "flexbox froggy",
    "grid garden",
    "aprenda css",
    "desafios frontend",
    "justify-content",
    "align-items",
    "grid-template-columns"
  ],
};

export default function CssArenaPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <CssArenaWorkspace />
    </div>
  );
}
