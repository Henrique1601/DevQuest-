import { VideoHub } from "@/components/videos/VideoHub";

export const metadata = {
  title: "Video Hub: Aulas & Tutoriais Integrados | DevQuest",
  description: "Aulas e tutoriais aprofundados com capítulos sincronizados cobrindo React 19, Next.js, TypeScript, Drizzle, SQL e algoritmos.",
};

export default function VideosPage() {
  return (
    <div className="pt-20">
      <VideoHub />
    </div>
  );
}
