import { ChallengeWorkspace } from "@/components/challenges/ChallengeWorkspace";

export const metadata = {
  title: "Arena de Desafios de Código | DevQuest",
  description: "Resolva algoritmos e desafios de lógica de programação com execução no navegador e testes em tempo real.",
};

export default function ChallengesPage() {
  return (
    <div className="pt-20">
      <ChallengeWorkspace />
    </div>
  );
}
