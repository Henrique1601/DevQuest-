import { SqlPlayground } from "@/components/sql/SqlPlayground";

export const metadata = {
  title: "SQL Playground Interativo | DevQuest",
  description: "Execute comandos SQL reais no navegador, explore schemas e resolva desafios práticos de banco de dados relacional.",
};

export default function SqlPlaygroundPage() {
  return (
    <div className="pt-20">
      <SqlPlayground />
    </div>
  );
}
