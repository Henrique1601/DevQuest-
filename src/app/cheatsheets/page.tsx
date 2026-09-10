import { CheatsheetViewer } from "@/components/cheatsheets/CheatsheetViewer";

export const metadata = {
  title: "DevDocs & CheatSheets Interativos | DevQuest",
  description: "Consulte sintaxes e métodos de JavaScript, CSS Flexbox, SQL, Git e HTTP com exemplos prontos para testar no Playground.",
};

export default function CheatsheetsPage() {
  return (
    <div className="pt-20">
      <CheatsheetViewer />
    </div>
  );
}
