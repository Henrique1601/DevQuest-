import { WebPlayground } from "@/components/playground/WebPlayground";

export const metadata = {
  title: "Playground Web Livre | DevQuest",
  description: "Sandbox interativo de HTML, CSS e JavaScript no navegador com compilação e preview em tempo real.",
};

export default function PlaygroundPage() {
  return (
    <div className="pt-20">
      <WebPlayground />
    </div>
  );
}
