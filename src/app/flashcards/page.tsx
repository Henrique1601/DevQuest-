import { FlashcardsApp } from "@/components/flashcards/FlashcardsApp";

export const metadata = {
  title: "Flashcards Espaçados de Sintaxe estilo Anki | DevQuest",
  description: "Treine e memorize conceitos cruciais de JavaScript, TypeScript, React, SQL e Git com flashcards de repetição espaçada.",
};

export default function FlashcardsPage() {
  return (
    <div className="pt-20">
      <FlashcardsApp />
    </div>
  );
}
