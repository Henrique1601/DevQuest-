import React from "react";
import { Metadata } from "next";
import { AgentSimulatorView } from "@/components/ai-lab/AgentSimulatorView";

export const metadata: Metadata = {
  title: "Laboratório de Agentes de IA (ReAct Simulator) | DevQuest Pro",
  description:
    "Simulador interativo de ciclo ReAct (Reason + Act + Observe). Explore a cadeia de raciocínio, invocação de ferramentas com JSON Schemas e síntese de respostas autônomas.",
};

export default function AILabPage() {
  return <AgentSimulatorView />;
}