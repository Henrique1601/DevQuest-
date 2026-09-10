"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Terminal,
  Trophy,
  Lightbulb,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Code,
  Search,
  X,
  Filter,
  Layers,
  Briefcase
} from "lucide-react";
import { Challenge, ChallengeDifficulty, ChallengeCategory } from "@/types/challenge";
import { mockChallenges } from "@/lib/data/challenges";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const CodeEditor = dynamic(
  () => import("./CodeEditor").then((mod) => mod.CodeEditor),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 p-6 bg-[#070A10] text-slate-500 font-mono text-xs flex items-center justify-center">
        Carregando editor profissional...
      </div>
    ),
  }
);

export function ChallengeWorkspace({ initialChallengeSlug }: { initialChallengeSlug?: string }) {
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(() => {
    if (initialChallengeSlug) {
      const idx = mockChallenges.findIndex((c) => c.slug === initialChallengeSlug);
      return idx !== -1 ? idx : 0;
    }
    return 0;
  });

  const currentChallenge = mockChallenges[selectedChallengeIndex];
  const [code, setCode] = useState(currentChallenge.starterCode);
  const [activeTab, setActiveTab] = useState<"instructions" | "hints">("instructions");
  const [outputTab, setOutputTab] = useState<"tests" | "console">("tests");
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);

  // Estados do Modal de Busca e Filtros
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<ChallengeDifficulty | "all">("all");
  const [filterCategory, setFilterCategory] = useState<ChallengeCategory | "all">("all");
  const [filterCompany, setFilterCompany] = useState<string>("all");

  const { isRunning, results, consoleLogs, error, runChallenge } = useCodeRunner();

  // Atualiza o código ao trocar de desafio
  useEffect(() => {
    setCode(currentChallenge.starterCode);
  }, [currentChallenge]);

  // Carrega desafios resolvidos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("devquest_solved_challenges");
    if (saved) {
      try {
        setSolvedChallenges(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleRun = async () => {
    await runChallenge(currentChallenge, code);
  };

  // Salva no localStorage quando todos os testes passarem
  useEffect(() => {
    if (results.length > 0 && results.every((r) => r.passed) && !error) {
      if (!solvedChallenges.includes(currentChallenge.id)) {
        const updated = [...solvedChallenges, currentChallenge.id];
        setSolvedChallenges(updated);
        localStorage.setItem("devquest_solved_challenges", JSON.stringify(updated));
      }
    }
  }, [results, error, currentChallenge.id, solvedChallenges]);

  const allPassed = results.length > 0 && results.every((r) => r.passed) && !error;
  const isSolved = solvedChallenges.includes(currentChallenge.id);

  // Lista filtrada para o Drawer de Busca
  const filteredChallenges = mockChallenges.filter((chal) => {
    const matchesQuery =
      chal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chal.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (chal.company && chal.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      filterDifficulty === "all" || chal.difficulty === filterDifficulty;

    const matchesCategory =
      filterCategory === "all" || chal.category === filterCategory;

    const matchesCompany =
      filterCompany === "all" || chal.company === filterCompany;

    return matchesQuery && matchesDifficulty && matchesCategory && matchesCompany;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-background relative">
      {/* Top Header do Workspace */}
      <div className="h-14 border-b border-surface-border bg-surface px-4 flex items-center justify-between shrink-0">
        {/* Seletor do Desafio & Botão de Busca */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSelectedChallengeIndex((prev) => Math.max(0, prev - 1))}
              disabled={selectedChallengeIndex === 0}
              className="p-1.5 rounded-lg hover:bg-surface-hover text-slate-400 disabled:opacity-30 transition-colors"
              title="Desafio anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-1">
              {selectedChallengeIndex + 1}/{mockChallenges.length}
            </span>
            <button
              onClick={() => setSelectedChallengeIndex((prev) => Math.min(mockChallenges.length - 1, prev + 1))}
              disabled={selectedChallengeIndex === mockChallenges.length - 1}
              className="p-1.5 rounded-lg hover:bg-surface-hover text-slate-400 disabled:opacity-30 transition-colors"
              title="Próximo desafio"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsSearchOpen(true)}
            className="text-xs font-mono gap-1.5 border-surface-border hover:border-primary-500/40"
            title="Abrir catálogo e buscar desafios"
          >
            <Search className="w-3.5 h-3.5 text-primary-400" />
            <span className="hidden sm:inline">Buscar Desafios</span>
            <span className="text-[10px] bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded-full">
              {mockChallenges.length}
            </span>
          </Button>

          <h2 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-sm flex items-center gap-2">
            {currentChallenge.title}
            {isSolved && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Resolvido
              </span>
            )}
            {currentChallenge.company && (
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                <Briefcase className="w-2.5 h-2.5 text-violet-400" />
                {currentChallenge.company}
              </span>
            )}
          </h2>
        </div>

        {/* Dificuldade & Ações de Execução */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge
            variant={
              currentChallenge.difficulty === "easy"
                ? "beginner"
                : currentChallenge.difficulty === "medium"
                ? "intermediate"
                : "advanced"
            }
          >
            {currentChallenge.difficulty === "easy" ? "Fácil" : currentChallenge.difficulty === "medium" ? "Médio" : "Difícil"}
          </Badge>

          <Badge variant="accent" className="font-mono hidden sm:inline-flex">
            <Trophy className="w-3 h-3 mr-1" />
            +{currentChallenge.xp} XP
          </Badge>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCode(currentChallenge.starterCode)}
            title="Restaurar código inicial"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Resetar</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="font-mono text-xs shadow-glow"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Executando..." : "Executar e Testar"}</span>
          </Button>
        </div>
      </div>

      {/* Grid Principal (Split-Screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
        {/* Painel Esquerdo: Instruções & Dicas */}
        <div className="lg:col-span-5 border-r border-surface-border bg-surface/40 flex flex-col h-full overflow-hidden">
          {/* Abas */}
          <div className="flex items-center border-b border-surface-border px-4 text-xs font-mono">
            <button
              onClick={() => setActiveTab("instructions")}
              className={`py-3 px-4 border-b-2 font-medium transition-colors ${
                activeTab === "instructions"
                  ? "border-primary-400 text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              Enunciado & Instruções
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`py-3 px-4 border-b-2 font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "hints"
                  ? "border-primary-400 text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              Dicas ({currentChallenge.hints.length})
            </button>
          </div>

          {/* Conteúdo do Painel */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {activeTab === "instructions" ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Descrição do Problema</h3>
                    <span className="text-xs font-mono uppercase text-slate-400 bg-surface px-2.5 py-0.5 rounded border border-surface-border">
                      {currentChallenge.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {currentChallenge.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-surface-border">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400">
                    Regras e Instruções:
                  </h4>
                  <ul className="space-y-2">
                    {currentChallenge.instructions.map((inst, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-surface/60 p-2.5 rounded-lg border border-surface-border/50">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0 mt-1.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-4 border-t border-surface-border">
                  <h4 className="text-xs uppercase tracking-wider font-mono text-slate-400">
                    Exemplos de Teste:
                  </h4>
                  <div className="space-y-2">
                    {currentChallenge.testCases.filter(tc => !tc.isSecret).map((tc, idx) => (
                      <div key={tc.id} className="p-3 rounded-lg bg-[#070A10] border border-surface-border font-mono text-xs space-y-1">
                        <div className="text-slate-400 font-semibold">{tc.description}</div>
                        <div>
                          <span className="text-slate-400">Entrada: </span>
                          <span className="text-cyan-300">{JSON.stringify(tc.input)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Retorno esperado: </span>
                          <span className="text-emerald-300">{JSON.stringify(tc.expected)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Dicas para Desbloquear a Resolução
                </h3>
                <p className="text-xs text-slate-400">
                  Tente solucionar por conta própria antes de conferir todas as dicas.
                </p>
                <div className="space-y-3">
                  {currentChallenge.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-200 space-y-1"
                    >
                      <div className="font-mono text-amber-400 font-semibold">Dica #{idx + 1}:</div>
                      <p className="leading-relaxed">{hint}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Painel Direito: Editor de Código e Saída */}
        <div className="lg:col-span-7 flex flex-col h-full overflow-hidden bg-[#070A10]">
          {/* Editor Header */}
          <div className="h-10 border-b border-surface-border bg-surface/80 px-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-primary-400" />
              <span>JavaScript (ES2022)</span>
              <span className="hidden sm:inline-block text-[10px] text-slate-500 border border-surface-border px-1.5 py-0.5 rounded">
                Ctrl + Enter para testar
              </span>
            </div>
            <span>Função: {currentChallenge.functionName}</span>
          </div>

          {/* Área do Editor com CodeMirror */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <CodeEditor
              value={code}
              onChange={(val) => setCode(val)}
              onRun={handleRun}
            />
          </div>

          {/* Painel Inferior: Console & Casos de Teste */}
          <div className="h-56 border-t border-surface-border bg-surface/90 flex flex-col">
            {/* Header de Saída */}
            <div className="h-10 border-b border-surface-border px-4 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setOutputTab("tests")}
                  className={`py-2 px-1 border-b-2 font-medium transition-colors ${
                    outputTab === "tests"
                      ? "border-primary-400 text-white"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Testes Unitários ({results.filter(r => r.passed).length}/{results.length || currentChallenge.testCases.length})
                </button>
                <button
                  onClick={() => setOutputTab("console")}
                  className={`py-2 px-1 border-b-2 font-medium transition-colors ${
                    outputTab === "console"
                      ? "border-primary-400 text-white"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Console ({consoleLogs.length})
                </button>
              </div>

              {allPassed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  Desafio Concluído!
                </div>
              )}
            </div>

            {/* Corpo de Saída */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2">
              {error && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 flex items-start gap-2">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {outputTab === "tests" ? (
                results.length === 0 && !error ? (
                  <div className="text-slate-400 flex items-center justify-center h-full gap-2">
                    <Terminal className="w-4 h-4" />
                    Pressione &quot;Executar e Testar&quot; ou aperte Ctrl+Enter para validar.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {results.map((res, i) => (
                      <div
                        key={res.testCaseId}
                        className={`p-2.5 rounded-lg border ${
                          res.passed
                            ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                            : "bg-rose-500/5 border-rose-500/20 text-rose-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 font-semibold">
                            {res.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400" />
                            )}
                            <span>{res.description}</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold">
                            {res.passed ? "Passou" : "Falhou"}
                          </span>
                        </div>

                        {!res.passed && (
                          <div className="text-[11px] text-slate-300 pl-6 space-y-0.5">
                            <div>Esperado: <span className="text-emerald-400">{JSON.stringify(res.expected)}</span></div>
                            <div>Recebido: <span className="text-rose-400">{JSON.stringify(res.received)}</span></div>
                            {res.error && <div className="text-rose-400">Erro: {res.error}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Tab Console */
                consoleLogs.length === 0 ? (
                  <div className="text-slate-400 flex items-center justify-center h-full">
                    Nenhuma mensagem registrada no console. Use console.log() no seu código.
                  </div>
                ) : (
                  <div className="space-y-1">
                    {consoleLogs.map((log, index) => (
                      <div key={index} className="text-slate-300 border-b border-surface-border/40 pb-1">
                        &gt; {log}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Gaveta de Busca e Filtro de Desafios */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-surface border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header da Busca */}
            <div className="p-6 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary-400" />
                  <span>Explorar Desafios de Código</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Selecione qualquer algoritmo para resolver no editor interativo.
                </p>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input e Filtros */}
            <div className="p-6 border-b border-surface-border space-y-4 bg-[#070A10]/50">
              {/* Input de Pesquisa */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por título, categoria ou conceito..."
                  className="w-full bg-surface text-slate-200 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 font-mono placeholder:text-slate-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Filtros de Dificuldade, Empresa e Categoria */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {/* Dificuldade */}
                  <div className="flex items-center gap-1">
                    {(["all", "easy", "medium", "hard"] as const).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setFilterDifficulty(diff)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          filterDifficulty === diff
                            ? "bg-primary-500 text-white"
                            : "text-slate-400 hover:text-white bg-surface"
                        }`}
                      >
                        {diff === "all" ? "Todas Dificuldades" : diff === "easy" ? "Fácil" : diff === "medium" ? "Médio" : "Difícil"}
                      </button>
                    ))}
                  </div>

                  {/* Contagem */}
                  <span className="text-xs font-mono text-slate-400">
                    {filteredChallenges.length} {filteredChallenges.length === 1 ? "desafio" : "desafios"}
                  </span>
                </div>

                {/* Filtro por Empresa (Big Techs & Fintechs) */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-500 text-[11px] font-mono shrink-0 flex items-center gap-1 mr-1">
                    <Briefcase className="w-3 h-3 text-slate-400" />
                    Empresa:
                  </span>
                  {["all", "Google", "Nubank", "Mercado Livre", "Netflix", "Amazon", "Meta", "Spotify", "Uber"].map((comp) => (
                    <button
                      key={comp}
                      onClick={() => setFilterCompany(comp)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-mono shrink-0 transition-colors ${
                        filterCompany === comp
                          ? "bg-violet-500 text-white font-semibold"
                          : "bg-surface border border-surface-border text-slate-400 hover:text-white"
                      }`}
                    >
                      {comp === "all" ? "Todas" : comp}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Lista de Desafios */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {filteredChallenges.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs space-y-2">
                  <Layers className="w-8 h-8 mx-auto text-slate-600" />
                  <p>Nenhum desafio encontrado para os filtros selecionados.</p>
                </div>
              ) : (
                filteredChallenges.map((chal) => {
                  const originalIndex = mockChallenges.findIndex((c) => c.id === chal.id);
                  const isCurrent = originalIndex === selectedChallengeIndex;
                  const isChalSolved = solvedChallenges.includes(chal.id);

                  return (
                    <div
                      key={chal.id}
                      onClick={() => {
                        setSelectedChallengeIndex(originalIndex);
                        setIsSearchOpen(false);
                      }}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isCurrent
                          ? "bg-primary-500/10 border-primary-500/50 shadow-glow"
                          : "bg-surface/80 border-surface-border hover:border-slate-600 hover:bg-surface-hover"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-white">
                            {chal.title}
                          </h4>
                          {chal.company && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono flex items-center gap-1">
                              <Briefcase className="w-2.5 h-2.5" />
                              {chal.company}
                            </span>
                          )}
                          {isChalSolved && (
                            <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                              ✓ Resolvido
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">
                          {chal.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Badge
                          variant={
                            chal.difficulty === "easy"
                              ? "beginner"
                              : chal.difficulty === "medium"
                              ? "intermediate"
                              : "advanced"
                          }
                        >
                          {chal.difficulty === "easy" ? "Fácil" : chal.difficulty === "medium" ? "Médio" : "Difícil"}
                        </Badge>
                        <Badge variant="accent" className="font-mono text-xs">
                          +{chal.xp} XP
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
