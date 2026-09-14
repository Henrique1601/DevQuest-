import { Metadata } from "next";
import { GitVisualizerWorkspace } from "@/components/git-visualizer/GitVisualizerWorkspace";

export const metadata: Metadata = {
  title: "Visualizador de Git & Branches | DevQuest Pro",
  description:
    "Aprenda comandos do Git de forma visual e interativa: simule commits, branches, checkout, merge e rebase com grafo animado e missões guiadas.",
};

export default function GitVisualizerPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#070A10]">
      <GitVisualizerWorkspace />
    </div>
  );
}
