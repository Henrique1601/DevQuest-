"use client";

import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Play,
  Brain,
  Wrench,
  Eye,
  CheckCircle2,
  Terminal,
  Database,
  Search,
  DollarSign,
  Send,
  Code2,
  RefreshCw,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  AGENT_TOOLS,
  AGENT_MISSIONS,
  AgentStep,
  simulateAgentExecution,
  AgentTool
} from "@/lib/ai/agentSimulator";

export function AgentSimulatorView() {
  const [selectedMissionId, setSelectedMissionId] = useState<string>("mission-finance");
  const [prompt, setPrompt] = useState<string>(AGENT_MISSIONS[0].prompt);
  const [steps, setSteps] = useState<AgentStep[]>(() => simulateAgentExecution(AGENT_MISSIONS[0].prompt));
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedTool, setSelectedTool] = useState<AgentTool>(AGENT_TOOLS[0]);

  const handleSelectMission = (missionId: string) => {
    const mission = AGENT_MISSIONS.find((m) => m.id === missionId);
    if (mission) {
      setSelectedMissionId(missionId);
      setPrompt(mission.prompt);
      runSimulation(mission.prompt);
    }
  };

  const runSimulation = (inputPrompt: string) => {
    setIsExecuting(true);
    setSteps([]);
    setTimeout(() => {
      const generated = simulateAgentExecution(inputPrompt);
      setSteps(generated);
      setIsExecuting(false);
    }, 600);
  };

  const getToolIcon = (name: string) => {
    switch (name) {
      case "web_search":
        return <Search className="w-3.5 h-3.5 text-cyan-400" />;
      case "stock_market":
      case "currency_converter":
        return <DollarSign className="w-3.5 h-3.5 text-emerald-400" />;
      case "database_sql":
        return <Database className="w-3.5 h-3.5 text-purple-400" />;
      case "send_notification":
      default:
        return <Send className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header com Descrição da Teoria ReAct */}
      <div className="bg-gradient-to-r from-surface via-[#0B1020] to-surface border border-surface-border rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-glow">
                <Bot className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <span>Laboratório de Agentes Autônomos</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  REACT SIMULATOR
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Descubra como os agentes modernos de inteligência artificial decompõem tarefas em ciclos iterativos de
              <strong className="text-cyan-400"> Thought (Raciocínio)</strong>,
              <strong className="text-amber-400"> Action (Chamada de Ferramentas via JSON Schema)</strong> e
              <strong className="text-emerald-400"> Observation (Feedback do Mundo Real)</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-slate-400">Missões Prontas:</span>
            <div className="flex flex-wrap gap-2">
              {AGENT_MISSIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectMission(m.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                    selectedMissionId === m.id
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow font-bold"
                      : "bg-[#060A14] border-surface-border text-slate-400 hover:text-white"
                  }`}
                >
                  {m.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Caixa de Entrada de Prompt / Missão */}
      <div className="bg-surface/80 border border-surface-border rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Terminal className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSimulation(prompt)}
            placeholder="Digite a meta do agente (ex: consulte a cotação de PETR4 e converta para USD)..."
            className="w-full bg-[#070A12] border border-surface-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => runSimulation(prompt)}
          disabled={isExecuting || !prompt.trim()}
          className="font-mono text-xs gap-2 shrink-0 w-full sm:w-auto"
        >
          {isExecuting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
          <span>{isExecuting ? "Executando Loop..." : "Iniciar Ciclo ReAct"}</span>
        </Button>
      </div>

      {/* Grid Principal: Timeline do Ciclo ReAct vs Inspetor de Ferramentas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda: Timeline da Cadeia de Raciocínio (ReAct) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Cadeia de Raciocínio & Execução ({steps.length} etapas)</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">Loop: ReAct Architecture</span>
          </div>

          {isExecuting ? (
            <div className="bg-surface/50 border border-surface-border rounded-2xl p-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
              <p className="text-xs font-mono text-slate-300">O agente está pensando e decidindo a próxima tool call...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {steps.map((step) => {
                switch (step.type) {
                  case "thought":
                    return (
                      <div
                        key={step.stepNumber}
                        className="bg-gradient-to-r from-purple-950/20 to-[#0A0E1A] border border-purple-500/30 rounded-2xl p-4 shadow-lg space-y-2 font-sans"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 text-purple-300 font-bold font-mono">
                            <Brain className="w-4 h-4 text-purple-400" />
                            <span>Etapa {step.stepNumber}: Thought (Raciocínio Interno)</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500">{step.timestamp}</span>
                        </div>
                        <p className="text-xs text-purple-100/90 leading-relaxed pl-6 border-l-2 border-purple-500/40">
                          {step.content}
                        </p>
                      </div>
                    );

                  case "tool_call":
                    return (
                      <div
                        key={step.stepNumber}
                        className="bg-[#0A0D17] border border-amber-500/30 rounded-2xl p-4 shadow-lg space-y-2 font-mono text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-amber-300 font-bold">
                            <Wrench className="w-4 h-4 text-amber-400" />
                            <span>Etapa {step.stepNumber}: Action (Invocação de Ferramenta)</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px]">
                            {step.toolName}
                          </span>
                        </div>
                        <div className="bg-[#05070E] p-3 rounded-xl border border-surface-border text-slate-300 overflow-x-auto">
                          <div className="text-[10px] text-slate-500 mb-1">// Payload JSON enviado à ferramenta:</div>
                          <pre className="text-amber-200 text-xs">
                            {JSON.stringify(step.toolArgs, null, 2)}
                          </pre>
                        </div>
                      </div>
                    );

                  case "observation":
                    return (
                      <div
                        key={step.stepNumber}
                        className="bg-[#070E1A] border border-cyan-500/30 rounded-2xl p-4 shadow-lg space-y-2 font-mono text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-cyan-300 font-bold">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span>Etapa {step.stepNumber}: Observation (Ambiente Real)</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{step.timestamp}</span>
                        </div>
                        <div className="bg-[#040810] p-3 rounded-xl border border-cyan-500/20 text-cyan-100 overflow-x-auto">
                          <pre className="text-xs text-cyan-200">
                            {JSON.stringify(step.toolResult, null, 2)}
                          </pre>
                        </div>
                      </div>
                    );

                  case "final_answer":
                  default:
                    return (
                      <div
                        key={step.stepNumber}
                        className="bg-gradient-to-r from-emerald-950/30 via-[#0B151F] to-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 shadow-2xl space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2 text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Etapa {step.stepNumber}: Resposta Final Consolidada (Final Answer)</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30">
                            Meta Cumprida
                          </span>
                        </div>
                        <div className="text-xs text-slate-100 leading-relaxed font-sans whitespace-pre-line pl-6 border-l-2 border-emerald-400">
                          {step.content}
                        </div>
                      </div>
                    );
                }
              })}
            </div>
          )}
        </div>

        {/* Coluna Direita: Catálogo de Ferramentas & JSON Schemas */}
        <div className="lg:col-span-4 bg-surface/70 border border-surface-border rounded-3xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <h3 className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Ferramentas do Agente ({AGENT_TOOLS.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">JSON Schemas</span>
          </div>

          {/* Lista de Ferramentas */}
          <div className="space-y-2">
            {AGENT_TOOLS.map((t) => (
              <button
                key={t.name}
                onClick={() => setSelectedTool(t)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs font-mono ${
                  selectedTool.name === t.name
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-glow"
                    : "bg-[#060912] border-surface-border text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  {getToolIcon(t.name)}
                  <span>{t.name}()</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* Detalhes do Schema da Ferramenta Selecionada */}
          <div className="p-4 rounded-2xl bg-[#060912] border border-surface-border space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-xs">{selectedTool.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Tool Definition</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
              {selectedTool.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-surface-border/60">
              <span className="text-[10px] text-slate-500 uppercase font-bold">Parâmetros Esperados:</span>
              <pre className="p-2.5 rounded-lg bg-[#03060C] border border-surface-border text-cyan-300 text-[11px] overflow-x-auto">
                {JSON.stringify(selectedTool.parameters, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}