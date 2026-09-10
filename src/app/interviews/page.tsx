import { InterviewSimulator } from "@/components/interviews/InterviewSimulator";

export const metadata = {
  title: "Simulador de Entrevistas Técnicas | DevQuest",
  description: "Treine para entrevistas em Big Techs e Unicórnios (Nubank, Mercado Livre, Google, iFood) com cronômetro, casos de teste e pontuação Big-O.",
};

export default function InterviewsPage() {
  return (
    <div className="pt-20">
      <InterviewSimulator />
    </div>
  );
}
