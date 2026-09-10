"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Flame,
  Clock,
  Play,
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  RotateCcw,
  Zap,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ActivityHeatmap } from "@/components/daily/ActivityHeatmap";
import {
  getTodayDailyQuest,
  generateAnnualHeatmapData,
  DailyQuest
} from "@/lib/data/dailyQuests";

export function DailyQuestView() {
  const quest = getTodayDailyQuest();
  const [code, setCode] = useState<string>(quest.starterCode);
  const [heatmapDays] = useState(generateAnnualHeatmapData());
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[] | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [completedToday, setCompletedToday] = useState<boolean>(false);

  // Contagem regressiva até meia-noite (próximo reset)
  const [timeLeft, setTimeLeft] = useState<string>("04:22:15");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diffMs = tomorrow.getTime() - now.getTime();

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Execução de testes
  const handleRunTests = () => {
    setIsEvaluating(true);

    setTimeout(() => {
      try {
        const fn = new Function(`
          ${code}
          return typeof reverseWords !== 'undefined' ? reverseWords : (typeof isAnagram !== 'undefined' ? isAnagram : null);
        `)();

        if (typeof fn !== "function") {
          throw new Error("Função principal não encontrada no código.");
        }

        const results = quest.testCases.map((tc, idx) => {
          try {
            const actual = fn(...tc.input);
            const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
            return {
              passed,
              message: passed
                ? `Caso #${idx + 1}: ${tc.description}`
                : `Caso #${idx + 1}: Esperado ${JSON.stringify(tc.expected)}, mas recebeu ${JSON.stringify(actual)}`
            };
          } catch (err: any) {
            return { passed: false, message: `Erro no Caso #${idx + 1}: ${err.message}` };
          }
        });

        setTestResults(results);
        if (results.every((r) => r.passed)) {
          setCompletedToday(true);
        }
      } catch (err: any) {
        setTestResults([{ passed: false, message: `Erro de Sintaxe: ${err.message}` }]);
      } finally {
        setIsEvaluating(false);
      }
    }, 300);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Flame className="w-4 h-4 fill-current" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-amber-400">
              Daily Quest Oficial
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              2x XP Bônus
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Desafio do Dia & Ofensiva
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Resolva a missão de hoje antes da meia-noite para manter sua sequência de ofensiva ativa e subir nas ligas!
          </p>
        </div>

        {/* Contador de Reset */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#080D1A] border border-amber-500/30 font-mono text-xs shadow-lg">
          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-slate-400">Próximo desafio em:</span>
          <span className="text-amber-300 font-bold text-sm">{timeLeft}</span>
        </div>
      </div>

      {/* Heatmap de Atividade */}
      <ActivityHeatmap days={heatmapDays} currentStreak={18} totalSolved={47} />

      {/* Grid Principal: Desafio do Dia & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enunciado do Desafio */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-surface/80 border border-surface-border rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-primary-500/15 text-primary-300 border border-primary-500/30">
                {quest.category}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                +{quest.xpReward} XP
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{quest.title}</h2>
              <div className="text-xs text-slate-400 font-mono mt-1">Data: {quest.dateString}</div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#060913] p-4 rounded-2xl border border-surface-border font-mono">
              {quest.description}
            </div>

            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Dica: {quest.solutionHint}</span>
            </div>
          </div>
        </div>

        {/* Editor de Código & Testes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#05070E] border border-surface-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-[#0A0E1A] px-4 py-2.5 border-b border-surface-border flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>daily_solution.js</span>
              </div>
              <button
                onClick={() => setCode(quest.starterCode)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Resetar código"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-56 bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />

            <div className="p-3 bg-[#0A0E1A] border-t border-surface-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                {quest.testCases.length} testes unitários
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunTests}
                disabled={isEvaluating}
                className="font-mono text-xs gap-2 shadow-glow bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isEvaluating ? "Testando..." : "Executar & Manter Streak"}</span>
              </Button>
            </div>
          </div>

          {/* Resultados dos Testes */}
          {testResults && (
            <div
              className={`p-4 rounded-2xl border space-y-2 font-mono text-xs shadow-xl ${
                testResults.every((r) => r.passed)
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                  : "bg-red-500/10 border-red-500/40 text-red-200"
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-2">
                  {testResults.every((r) => r.passed) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Missão Concluída! Sua ofensiva foi estendida para 19 dias!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Revise sua solução e tente novamente.</span>
                    </>
                  )}
                </span>
                <span>
                  {testResults.filter((r) => r.passed).length}/{testResults.length}
                </span>
              </div>

              <div className="space-y-1 pt-1">
                {testResults.map((r, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg ${
                      r.passed ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {r.message}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
