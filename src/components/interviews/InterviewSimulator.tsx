"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Clock,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Zap,
  Building2,
  Terminal,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockInterviewChallenges, InterviewChallenge, TestCase } from "@/lib/data/interviews";

export function InterviewSimulator() {
  const [selectedChallenge, setSelectedChallenge] = useState<InterviewChallenge>(mockInterviewChallenges[0]);
  const [code, setCode] = useState<string>(mockInterviewChallenges[0].starterCode);
  const [timeRemaining, setTimeRemaining] = useState<number>(mockInterviewChallenges[0].timeLimitMinutes * 60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string; hidden?: boolean }[] | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [interviewSubmitted, setInterviewSubmitted] = useState<boolean>(false);

  // Troca de desafio
  const handleSelectChallenge = (c: InterviewChallenge) => {
    setSelectedChallenge(c);
    setCode(c.starterCode);
    setTimeRemaining(c.timeLimitMinutes * 60);
    setTimerActive(false);
    setTestResults(null);
    setInterviewSubmitted(false);
  };

  // Contador de Tempo
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Executar Casos de Teste
  const handleRunTests = () => {
    setIsEvaluating(true);
    setTimerActive(true); // Começa timer se ainda não começou

    setTimeout(() => {
      try {
        // Encontra a função definida no código
        const wrappedFn = new Function(`
          ${code}
          const fns = [typeof processTransactions !== 'undefined' ? processTransactions : null,
                       typeof getTopProductsByCategory !== 'undefined' ? getTopProductsByCategory : null,
                       typeof maxSubArray !== 'undefined' ? maxSubArray : null,
                       typeof orderDispatchQueue !== 'undefined' ? orderDispatchQueue : null].filter(Boolean);
          return fns[0];
        `)();

        if (typeof wrappedFn !== "function") {
          throw new Error("Não foi possível encontrar a função principal no seu código.");
        }

        const results = selectedChallenge.testCases.map((tc, idx) => {
          try {
            const actual = wrappedFn(...tc.input);
            const passed = JSON.stringify(actual) === JSON.stringify(tc.expected);
            return {
              passed,
              message: passed
                ? `Caso #${idx + 1}: ${tc.description}`
                : `Caso #${idx + 1}: Esperado ${JSON.stringify(tc.expected)}, mas recebeu ${JSON.stringify(actual)}`,
              hidden: tc.hidden
            };
          } catch (err: any) {
            return {
              passed: false,
              message: `Erro no Caso #${idx + 1}: ${err.message}`,
              hidden: tc.hidden
            };
          }
        });

        setTestResults(results);
        const allPassed = results.every((r) => r.passed);
        if (allPassed) {
          setInterviewSubmitted(true);
          setTimerActive(false);
        }
      } catch (err: any) {
        setTestResults([
          {
            passed: false,
            message: `Erro de Sintaxe/Execução: ${err.message}`
          }
        ]);
      } finally {
        setIsEvaluating(false);
      }
    }, 400);
  };

  const allPassed = testResults && testResults.length > 0 && testResults.every((r) => r.passed);

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-accent-500/20 text-accent-400 border border-accent-500/30">
              <Briefcase className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-accent-400">
              Mock Technical Interview
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
              Simulador de Vagas Reais
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Arena de Entrevistas Técnicas
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Treine para os processos seletivos de big techs e unicórnios (Nubank, Mercado Livre, Google, iFood) com cronômetro real e casos de teste ocultos.
          </p>
        </div>

        {/* Status do Cronômetro */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-mono text-sm font-bold shadow-lg transition-colors ${
              timeRemaining < 300
                ? "bg-red-500/20 text-red-400 border-red-500/40 animate-pulse"
                : timerActive
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                : "bg-surface border-surface-border text-slate-300"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          <Button
            variant={timerActive ? "secondary" : "primary"}
            size="sm"
            onClick={() => setTimerActive(!timerActive)}
            className="font-mono text-xs"
          >
            {timerActive ? "Pausar" : "Iniciar Timer"}
          </Button>
        </div>
      </div>

      {/* Grid Principal: Lista de Empresas vs Sala de Código */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Seletor de Desafios da Empresa */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider">
            Escolha o Teste Técnico
          </h2>
          <div className="space-y-2.5">
            {mockInterviewChallenges.map((item) => {
              const isSelected = item.id === selectedChallenge.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectChallenge(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2 group ${
                    isSelected
                      ? "bg-surface border-accent-500/70 shadow-glow text-white"
                      : "bg-surface/50 border-surface-border text-slate-400 hover:text-white hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-white font-mono">
                      <Building2 className="w-3.5 h-3.5 text-accent-400" />
                      {item.company}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        item.difficulty === "Sênior"
                          ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          : item.difficulty === "Pleno"
                          ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }`}
                    >
                      {item.difficulty}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-slate-200 group-hover:text-primary-300 transition-colors">
                    {item.title}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-surface-border/50">
                    <span>{item.role}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.timeLimitMinutes} min
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Coluna Direita: Enunciado, Editor e Casos de Teste */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card do Enunciado */}
          <div className="bg-surface/80 border border-surface-border rounded-2xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-accent-500/10 text-accent-400 border border-accent-500/20">
                  {selectedChallenge.company}
                </span>
                <h3 className="text-base font-bold text-white">
                  {selectedChallenge.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Alvo:</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Tempo: {selectedChallenge.targetComplexity.time}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Espaço: {selectedChallenge.targetComplexity.space}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#060913] p-4 rounded-xl border border-surface-border font-mono">
              {selectedChallenge.description}
            </div>

            <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dica da Banca: {selectedChallenge.solutionHint}</span>
            </div>
          </div>

          {/* Editor de Código */}
          <div className="bg-[#05070E] border border-surface-border rounded-2xl overflow-hidden shadow-2xl space-y-0">
            <div className="bg-[#0A0E1A] px-4 py-2.5 border-b border-surface-border flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-accent-400" />
                <span>solution.js</span>
              </div>
              <button
                onClick={() => setCode(selectedChallenge.starterCode)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Resetar para código inicial"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-56 bg-transparent text-slate-200 font-mono text-xs sm:text-sm p-4 focus:outline-none resize-none leading-relaxed"
              placeholder="// Escreva sua solução aqui..."
              spellCheck={false}
            />

            {/* Ações do Editor */}
            <div className="p-3 bg-[#0A0E1A] border-t border-surface-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">
                {selectedChallenge.testCases.length} casos de teste (inclui testes ocultos)
              </span>

              <Button
                variant="primary"
                size="sm"
                onClick={handleRunTests}
                disabled={isEvaluating}
                className="font-mono text-xs gap-2 shadow-glow bg-accent-500 hover:bg-accent-600"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isEvaluating ? "Avaliando..." : "Submeter & Testar Código"}</span>
              </Button>
            </div>
          </div>

          {/* Resultado dos Testes */}
          {testResults && (
            <div
              className={`p-4 rounded-2xl border space-y-2.5 shadow-xl font-mono text-xs ${
                allPassed
                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-200"
                  : "bg-red-500/10 border-red-500/40 text-red-200"
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-2">
                  {allPassed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Parabéns! Todos os casos de teste passaram!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Alguns testes falharam. Revise a lógica e tente novamente!</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-surface-border">
                  {testResults.filter((r) => r.passed).length}/{testResults.length} Aprovados
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-surface-border/40">
                {testResults.map((res, rIdx) => (
                  <div
                    key={rIdx}
                    className={`p-2 rounded-lg flex items-center justify-between ${
                      res.passed ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    <span>{res.message}</span>
                    {res.hidden && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        Oculto
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {allPassed && (
                <div className="mt-3 p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Aprovado na Entrevista Técnica do {selectedChallenge.company}! (+150 XP)</span>
                  </div>
                  <Link href="/leaderboard">
                    <Button variant="secondary" size="sm" className="font-mono text-xs gap-1">
                      <span>Ver Ranking</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
