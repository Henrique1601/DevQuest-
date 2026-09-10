import { UIChallengeViewer } from "@/components/ui-challenges/UIChallengeViewer";

export const metadata = {
  title: "Desafios de UI/UX & Frontend Mentor | DevQuest",
  description: "Recrie interfaces reais em HTML e CSS e compare seus pixels com o design original usando o comparador visual slider.",
};

export default function UIChallengesPage() {
  return (
    <div className="pt-20">
      <UIChallengeViewer />
    </div>
  );
}
