"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Play, CheckCircle2, XCircle, ArrowRight, Zap, Trophy } from "lucide-react";
import { mockChallenges } from "@/lib/data/challenges";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ChallengesTeaser() {
  const sampleChallenge = mockChallenges[0]; // Inverter string
  const [code, setCode] = useState(
`function reverseString(str) {
  // Solucione aqui:
  return str.split('').reverse().join('');
}`
  );
  const [executionResult, setExecutionResult] = useState<{
    status: "idle" | "success" | "fail";
    message: string;
    details?: string[];
  }>({
    status: "idle",
    message: "Clique em 'Testar Código' para validar os casos de teste.",
  });

  const handleRunCode = () => {
    try {
      // Avaliação segura da função no browser
      const func = new Function(`${code}; return reverseString;`)();
      if (typeof func !== "function") {
        setExecutionResult({
          status: "fail",
          message: "Erro: A função 'reverseString' não foi definida.",
        });
        return;
      }

      let allPassed = true;
      const details: string[] = [];

      for (const tc of sampleChallenge.testCases) {
        const result = func(...tc.input);
        const passed = JSON.stringify(result) === JSON.stringify(tc.expected);
        if (!passed) {
          allPassed = false;
          details.push(`❌ ${tc.description}: Esperava ${JSON.stringify(tc.expected)}, recebeu ${JSON.stringify(result)}`);
        } else {
          details.push(`✅ ${tc.description}: Retornou ${JSON.stringify(result)}`);
        }
      }

      if (allPassed) {
        setExecutionResult({
          status: "success",
          message: "Parabéns! Todos os testes passaram com sucesso!",
          details,
        });
      } else {
        setExecutionResult({
          status: "fail",
          message: "Alguns testes falharam. Ajuste sua lógica e tente novamente.",
          details,
        });
      }
    } catch (err: any) {
      setExecutionResult({
        status: "fail",
        message: `Erro de Execução: ${err.message}`,
      });
    }
  };

  return (
    <section id="desafios" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="primary">Arena Interativa de Algoritmos</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Treine Lógica com Validação Instantânea
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Resolva desafios de código diretamente no navegador. Veja os testes passarem em tempo real e ganhe pontos de XP.
        </p>
      </div>

      {/* Editor & Validador Interativo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Lado Esquerdo: Enunciado */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">Desafio Rápido</span>
              <div className="flex items-center gap-2">
                <Badge variant="beginner">Fácil</Badge>
                <Badge variant="accent" className="font-mono">
                  <Trophy className="w-3 h-3 mr-1" />
                  +50 XP
                </Badge>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white">
              {sampleChallenge.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              {sampleChallenge.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-surface-border">
              <span className="text-xs font-mono uppercase text-slate-400">Instruções:</span>
              <ul className="space-y-1">
                {sampleChallenge.instructions.map((inst, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <Link href="/challenges">
                <Button variant="outline" size="sm" className="w-full">
                  <Zap className="w-4 h-4" />
                  Ver todos os {mockChallenges.length} desafios na Arena
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Lado Direito: Editor Interativo com Execução */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-surface-card border border-surface-border overflow-hidden shadow-2xl">
            {/* Top Bar */}
            <div className="bg-surface px-4 py-3 border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary-400" />
                <span className="text-xs font-mono text-slate-300">desafio-demo.js</span>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunCode}
                className="font-mono text-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Testar Código
              </Button>
            </div>

            {/* Input de Código */}
            <div className="relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={7}
                spellCheck={false}
                className="w-full bg-[#070A10] text-slate-200 font-mono text-xs sm:text-sm p-4 focus:outline-none border-none resize-none leading-relaxed selection:bg-primary-500/30"
              />
            </div>

            {/* Painel de Resultados */}
            <div className="bg-surface/95 border-t border-surface-border p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono">
                {executionResult.status === "success" && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {executionResult.status === "fail" && (
                  <XCircle className="w-4 h-4 text-rose-400" />
                )}
                <span
                  className={
                    executionResult.status === "success"
                      ? "text-emerald-400 font-medium"
                      : executionResult.status === "fail"
                      ? "text-rose-400 font-medium"
                      : "text-slate-400"
                  }
                >
                  {executionResult.message}
                </span>
              </div>

              {executionResult.details && (
                <div className="space-y-1 pt-1 border-t border-surface-border/50">
                  {executionResult.details.map((line, idx) => (
                    <div key={idx} className="text-xs font-mono text-slate-300">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
