import { LeaderboardView } from "@/components/leaderboard/LeaderboardView";

export const metadata = {
  title: "Ranking Global & Ligas de XP | DevQuest",
  description: "Acompanhe sua posição no ranking semanal, acumule XP resolvendo desafios de código e conquiste a Liga Diamante.",
};

export default function LeaderboardPage() {
  return (
    <div className="pt-20">
      <LeaderboardView />
    </div>
  );
}
