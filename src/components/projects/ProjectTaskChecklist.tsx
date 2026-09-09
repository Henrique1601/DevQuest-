"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { ProjectStep } from "@/types/project";

interface ProjectTaskChecklistProps {
  projectSlug: string;
  steps: ProjectStep[];
}

export function ProjectTaskChecklist({ projectSlug, steps }: ProjectTaskChecklistProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [openTips, setOpenTips] = useState<{ [key: number]: boolean }>({});

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
          const hasTips = step.tips && step.tips.length > 0;
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

              {/* Dicas / Tips Opcionais */}
              {hasTips && (
                <div className="border-t border-surface-border/50 bg-[#070A10]/50 px-5 py-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTip(step.order);
                    }}
                    className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{isTipOpen ? "Ocultar orientações" : "Ver orientações desta etapa"}</span>
                    {isTipOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {isTipOpen && (
                    <ul className="mt-2.5 space-y-1.5 pl-5 list-disc text-xs text-slate-300">
                      {step.tips!.map((tip, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {tip}
                        </li>
                      ))}
                    </ul>
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
