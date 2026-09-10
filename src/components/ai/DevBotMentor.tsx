"use client";

import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Zap,
  HelpCircle,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { analyzeCodeWithMentor, getSocraticHints, MentorAdvice } from "@/lib/ai/mentor";

interface DevBotMentorProps {
  currentCode: string;
  challengeTitle: string;
  functionName?: string;
}

export function DevBotMentor({ currentCode, challengeTitle, functionName }: DevBotMentorProps) {
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string; badge?: string }[]>([
    {
      sender: "bot",
      text: `Olá, dev! Sou o DevBot, seu mentor de código com IA. Analiso a complexidade do seu código e dou orientações pelo método socrático para você aprender sem que eu dê a resposta pronta. Como posso te guiar agora?`,
      badge: "Mentor Ativo"
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const addBotMessage = (text: string, badge?: string) => {
    setIsThinking(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text, badge }]);
      setIsThinking(false);
    }, 450);
  };

  const handleAnalyzeComplexity = () => {
    setMessages((prev) => [...prev, { sender: "user", text: "Analise a complexidade e boas práticas do meu código atual." }]);
    const advices = analyzeCodeWithMentor(currentCode, functionName);

    const formatted = advices
      .map((a) => `**${a.title}**\n${a.message}${a.suggestedComplexity ? `\n(Meta recomendada: ${a.suggestedComplexity})` : ""}`)
      .join("\n\n");

    addBotMessage(formatted, "Análise Heurística");
  };

  const handleSocraticHint = (level: 1 | 2 | 3) => {
    const titles = { 1: "Dica Conceitual (Nível 1)", 2: "Esboço de Lógica (Nível 2)", 3: "Diagnóstico Fino (Nível 3)" };
    setMessages((prev) => [...prev, { sender: "user", text: `Solicitei ${titles[level]}` }]);
    const hint = getSocraticHints(challengeTitle, level);
    addBotMessage(hint, titles[level]);
  };

  return (
    <div className="flex flex-col h-full bg-[#05070E] border border-surface-border rounded-2xl overflow-hidden shadow-2xl">
      {/* Bot Header */}
      <div className="p-3.5 bg-[#090D18] border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-accent-500 p-0.5 shadow-glow">
            <div className="w-full h-full bg-[#060912] rounded-[10px] flex items-center justify-center">
              <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
              <span>DevBot AI Mentor</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Método Socrático & Heurística</div>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs leading-relaxed max-h-[360px]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl border ${
              m.sender === "bot"
                ? "bg-surface/90 text-slate-200 border-surface-border max-w-[90%]"
                : "bg-primary-500/15 text-primary-200 border-primary-500/30 ml-auto max-w-[85%]"
            }`}
          >
            {m.badge && (
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{m.badge}</span>
              </div>
            )}
            <div className="whitespace-pre-line">{m.text}</div>
          </div>
        ))}

        {isThinking && (
          <div className="p-2.5 rounded-xl bg-surface/40 text-slate-400 border border-surface-border max-w-[60%] flex items-center gap-2 animate-pulse text-[11px]">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>DevBot está analisando seu código...</span>
          </div>
        )}
      </div>

      {/* Ações Rápidas do Mentor */}
      <div className="p-3 bg-[#090D18] border-t border-surface-border space-y-2">
        <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
          Ações Rápidas de Mentoria
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAnalyzeComplexity}
            disabled={isThinking}
            className="text-[11px] font-mono gap-1.5 justify-start text-purple-300 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20"
          >
            <Clock className="w-3 h-3" />
            <span>Análise Big-O</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSocraticHint(1)}
            disabled={isThinking}
            className="text-[11px] font-mono gap-1.5 justify-start text-amber-300 border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Dica Socrática</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSocraticHint(2)}
            disabled={isThinking}
            className="text-[11px] font-mono gap-1.5 justify-start text-cyan-300 border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 col-span-2"
          >
            <Code className="w-3 h-3" />
            <span>Esboço de Lógica (Pseudocódigo)</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
