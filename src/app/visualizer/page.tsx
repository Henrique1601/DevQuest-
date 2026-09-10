import { AlgorithmVisualizer } from "@/components/visualizer/AlgorithmVisualizer";

export const metadata = {
  title: "Visualizador de Algoritmos & Estruturas | DevQuest",
  description: "Entenda Busca Binária, Ordenações (Bubble Sort, Selection Sort), Pilhas e Filas com demonstrações visuais animadas passo a passo.",
};

export default function VisualizerPage() {
  return (
    <div className="pt-20">
      <AlgorithmVisualizer />
    </div>
  );
}
