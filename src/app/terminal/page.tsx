import { WebTerminal } from "@/components/terminal/WebTerminal";

export const metadata = {
  title: "Terminal Interativo Linux & Git | DevQuest",
  description: "Aprenda comandos essenciais de Linux e o fluxo de trabalho do Git com emulador interativo no navegador e missões práticas.",
};

export default function TerminalPage() {
  return (
    <div className="pt-20">
      <WebTerminal />
    </div>
  );
}
