"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Lightbulb, ChevronDown, ChevronUp, Code2, Copy, Check } from "lucide-react";
import { ProjectStep } from "@/types/project";

interface ProjectTaskChecklistProps {
  projectSlug: string;
  steps: ProjectStep[];
}

export function ProjectTaskChecklist({ projectSlug, steps }: ProjectTaskChecklistProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [openTips, setOpenTips] = useState<{ [key: number]: boolean }>({});
  const [copiedSnippet, setCopiedSnippet] = useState<number | null>(null);

  // Carrega passos concluídos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`devquest_tasks_${projectSlug}`);
    if (saved) {
      try {
        setCompletedSteps(JSON.parse(saved));
      } catch {
        // Ignora erro de parse
      }
    }
  }, [projectSlug]);

  const toggleStep = (order: number) => {
    let updated: number[];
    if (completedSteps.includes(order)) {
      updated = completedSteps.filter((o) => o !== order);
    } else {
      updated = [...completedSteps, order];
    }
    setCompletedSteps(updated);
    localStorage.setItem(`devquest_tasks_${projectSlug}`, JSON.stringify(updated));
  };

  const toggleTip = (order: number) => {
    setOpenTips((prev) => ({ ...prev, [order]: !prev[order] }));
  };

  const copyCode = (code: string, order: number) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(order);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const progressPercentage = steps.length > 0
    ? Math.round((completedSteps.length / steps.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Barra de Progresso */}
      <div className="p-4 sm:p-6 rounded-2xl bg-surface/80 border border-surface-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">Progresso do Projeto</span>
            <span className="text-xs font-mono text-slate-400">
              ({completedSteps.length}/{steps.length} etapas concluídas)
            </span>
          </div>
          <span className="text-sm font-mono font-bold text-primary-400">
            {progressPercentage}%
          </span>
        </div>

        {/* Barra Visual */}
        <div className="w-full h-2.5 bg-[#070A10] rounded-full overflow-hidden border border-surface-border">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Lista de Etapas */}
      <div className="space-y-4">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.order);
          const hasTips = (step.tips && step.tips.length > 0) || !!step.codeSnippet;
          const isTipOpen = !!openTips[step.order];

          return (
            <div
              key={step.order}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isCompleted
                  ? "bg-emerald-500/5 border-emerald-500/30"
                  : "bg-surface-card border-surface-border hover:border-slate-600"
              }`}
            >
              <div
                onClick={() => toggleStep(step.order)}
                className="p-5 flex items-start gap-4 cursor-pointer select-none"
              >
                <button
                  type="button"
                  aria-label={`Marcar etapa ${step.order}`}
                  className="mt-0.5 shrink-0 focus:outline-none"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-primary-400">
                      Etapa {step.order}
                    </span>
                    <h3
                      className={`text-base font-bold transition-colors ${
                        isCompleted ? "text-slate-300 line-through opacity-80" : "text-white"
                      }`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Dicas Técnicas & Snippets de Código */}
              {hasTips && (
                <div className="border-t border-surface-border/50 bg-[#070A10]/60 px-5 py-3.5 space-y-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTip(step.order);
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono font-medium text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{isTipOpen ? "Ocultar dicas e código sugerido" : "Ver dicas práticas e código de apoio"}</span>
                    {isTipOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isTipOpen && (
                    <div className="pt-2 space-y-3">
                      {step.tips && step.tips.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] uppercase tracking-wider font-mono text-slate-400">
                            Orientações de Implementação:
                          </span>
                          <ul className="space-y-1.5 pl-1">
                            {step.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                                <span className="text-primary-400 font-bold mt-0.5">•</span>
                                <span className="leading-relaxed">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {step.codeSnippet && (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-1">
                              <Code2 className="w-3.5 h-3.5" />
                              Código / Estrutura Recomendada:
                            </span>
                            <button
                              type="button"
                              onClick={() => copyCode(step.codeSnippet!, step.order)}
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedSnippet === step.order ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copiar</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="p-3.5 rounded-xl bg-[#05070B] border border-surface-border text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                            <pre className="whitespace-pre">{step.codeSnippet}</pre>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
