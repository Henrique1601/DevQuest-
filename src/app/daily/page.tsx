import { DailyQuestView } from "@/components/daily/DailyQuestView";

export const metadata = {
  title: "Desafio do Dia & Ofensiva (Daily Quest) | DevQuest",
  description: "Resolva o desafio do dia no DevQuest para manter sua ofensiva (streak), subir no ranking e ganhar 2x XP.",
};

export default function DailyPage() {
  return (
    <div className="pt-20">
      <DailyQuestView />
    </div>
  );
}
