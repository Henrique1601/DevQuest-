import { Metadata } from "next";
import { CodeBlanksWorkspace } from "@/components/code-blanks/CodeBlanksWorkspace";

export const metadata: Metadata = {
  title: "Preencher Lacunas de Código | DevQuest",
  description:
    "Treine sintaxe, métodos de arrays, hooks do React e SQL completando as lacunas do código nos modos Múltipla Escolha e Digitação com feedback em tempo real.",
};

export default function CodeBlanksPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <CodeBlanksWorkspace />
    </div>
  );
}
