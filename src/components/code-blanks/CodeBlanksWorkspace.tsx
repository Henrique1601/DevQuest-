"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Trophy,
  Flame,
  Search,
  X,
  Code,
  Layers,
  HelpCircle,
  ArrowRight,
  Puzzle,
  Edit3,
  CheckCheck
} from "lucide-react";
import { mockCodeBlanks } from "@/lib/data/codeBlanks";
import { CodeBlankChallenge } from "@/types/codeBlank";
import { sfx } from "@/lib/audio/sfx";
import { triggerNeonConfetti } from "@/lib/utils/confetti";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function CodeBlanksWorkspace() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentChallenge = mockCodeBlanks[currentIndex];

  // Modo: "typing" (escrever a resposta) ou "choice" (múltipla escolha)
  const [inputMode, setInputMode] = useState<"typing" | "choice">("choice");

  // Estado das respostas: { "BLANK_1": "map", "BLANK_2": "0" }
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [activeBlankId, setActiveBlankId] = useState<string>("");

  // Estado de execução e feedback
  const [isExecuting, setIsExecuting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [executionOutput, setExecutionOutput] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeHint, setActiveHint] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState(false);

  // Gamificação (Streak e Desafios Resolvidos)
  const [streak, setStreak] = useState(0);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Carrega rascunhos e resolvidos
  useEffect(() => {
    const saved = localStorage.getItem("devquest_solved_blanks");
    if (saved) {
      try {
        setSolvedIds(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Quando muda o desafio, reseta as respostas e estado
  useEffect(() => {
    setUserAnswers({});
    setStatus("idle");
    setExecutionOutput(null);
    setErrorMessage("");
    setActiveHint("");
    setShowExplanation(false);
    if (currentChallenge.blanks.length > 0) {
      setActiveBlankId(currentChallenge.blanks[0].id);
    }
  }, [currentChallenge.id]);

  const handleSelectChoice = (blankId: string, value: string) => {
    sfx.playClickSfx();
    setUserAnswers((prev) => ({ ...prev, [blankId]: value }));
    setStatus("idle");
    setErrorMessage("");

    // Avança automaticamente para a próxima lacuna não preenchida
    const nextBlank = currentChallenge.blanks.find(
      (b) => b.id !== blankId && !userAnswers[b.id]
    );
    if (nextBlank) {
      setActiveBlankId(nextBlank.id);
    }
  };

  const handleInputChange = (blankId: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [blankId]: value }));
    setStatus("idle");
    setErrorMessage("");
  };

  const handleRunAndValidate = async () => {
    sfx.playClickSfx();
    setIsExecuting(true);
    setErrorMessage("");
    setActiveHint("");

    // 1. Verifica se todas as lacunas foram preenchidas
    const missing = currentChallenge.blanks.find(
      (b) => !userAnswers[b.id] || userAnswers[b.id].trim() === ""
    );

    if (missing) {
      sfx.playErrorTone();
      setStatus("error");
      setErrorMessage(`Preencha a lacuna "${missing.placeholder}" antes de testar.`);
      setIsExecuting(false);
      return;
    }

    // 2. Valida sintaxe das respostas aceitas
    let allSyntaxCorrect = true;
    for (const b of currentChallenge.blanks) {
      const ans = (userAnswers[b.id] || "").trim().toLowerCase();
      const valid = b.acceptedAnswers.some((acc) => acc.trim().toLowerCase() === ans);
      if (!valid) {
        allSyntaxCorrect = false;
        setActiveHint(b.hint);
        break;
      }
    }

    // 3. Monta o código final preenchido
    let finalCode = currentChallenge.codeTemplate;
    for (const b of currentChallenge.blanks) {
      finalCode = finalCode.replace(`{{${b.id}}}`, userAnswers[b.id] || "");
    }

    // 4. Executa em sandbox seguro via Function
    try {
      // Cria executor assíncrono seguro
      const runner = new Function(
        `return (async function() {\n${finalCode}\n})();`
      );
      const result = await runner();
      setExecutionOutput(result);

      const isOutputMatch =
        JSON.stringify(result) === JSON.stringify(currentChallenge.expectedOutput);

      if (allSyntaxCorrect && isOutputMatch) {
        sfx.playSuccessChime();
        triggerNeonConfetti();
        setStatus("success");
        setShowExplanation(true);
        setStreak((prev) => prev + 1);

        if (!solvedIds.includes(currentChallenge.id)) {
          const updated = [...solvedIds, currentChallenge.id];
          setSolvedIds(updated);
          localStorage.setItem("devquest_solved_blanks", JSON.stringify(updated));
        }
      } else {
        sfx.playErrorTone();
        setStatus("error");
        setStreak(0);
        setErrorMessage(
          "O código executou, mas a saída ou sintaxe não corresponde ao esperado. Veja a dica abaixo!"
        );
      }
    } catch (err: any) {
      sfx.playErrorTone();
      setStatus("error");
      setStreak(0);
      setErrorMessage(`Erro de execução: ${err.message || "Sintaxe inválida ao preencher lacuna."}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleNextChallenge = () => {
    sfx.playClickSfx();
    if (currentIndex < mockCodeBlanks.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevChallenge = () => {
    sfx.playClickSfx();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const filteredBlanks = useMemo(() => {
    return mockCodeBlanks.filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeBlank = currentChallenge.blanks.find((b) => b.id === activeBlankId) || currentChallenge.blanks[0];
  const isSolved = solvedIds.includes(currentChallenge.id);

  // Renderiza o template de código intercalado com os componentes de lacuna
  const renderCodeSegments = () => {
    const parts = currentChallenge.codeTemplate.split(/(\{\{BLANK_\d+\}\})/g);

    return parts.map((part, idx) => {
      const match = part.match(/\{\{(BLANK_\d+)\}\}/);
      if (match) {
        const blankId = match[1];
        const blank = currentChallenge.blanks.find((b) => b.id === blankId);
        if (!blank) return null;

        const val = userAnswers[blankId] || "";
        const isActive = activeBlankId === blankId;

        if (inputMode === "typing") {
          return (
            <span key={idx} className="inline-block mx-1 align-middle">
              <input
                type="text"
                value={val}
                onChange={(e) => handleInputChange(blankId, e.target.value)}
                onFocus={() => setActiveBlankId(blankId)}
                placeholder={blank.placeholder}
                style={{ width: `${Math.max(val.length + 2, blank.placeholder.length + 3)}ch` }}
                className={`px-2.5 py-0.5 rounded-lg font-mono text-xs font-bold border transition-all text-center outline-none ${
                  isActive
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                    : val
                    ? "bg-slate-800 border-slate-600 text-white"
                    : "bg-surface/90 border-slate-700 text-slate-400 placeholder:text-slate-600"
                }`}
              />
            </span>
          );
        }

        // Modo Múltipla Escolha (Slot Interativo)
        return (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveBlankId(blankId)}
            className={`inline-flex items-center px-3 py-1 mx-1 rounded-lg font-mono text-xs font-bold border transition-all align-middle cursor-pointer ${
              isActive
                ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_14px_rgba(6,182,212,0.5)] ring-2 ring-cyan-500/30"
                : val
                ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                : "bg-surface-card border-dashed border-cyan-500/40 text-cyan-400/80 hover:border-cyan-400"
            }`}
          >
            {val || `[ ${blank.placeholder} ]`}
          </button>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Navegação */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface/80 border border-surface-border backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevChallenge}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg hover:bg-surface-hover text-slate-400 disabled:opacity-30 transition-colors"
              title="Desafio anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-1">
              {currentIndex + 1}/{mockCodeBlanks.length}
            </span>
            <button
              onClick={handleNextChallenge}
              disabled={currentIndex === mockCodeBlanks.length - 1}
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
          >
            <Search className="w-3.5 h-3.5 text-primary-400" />
            <span className="hidden sm:inline">Explorar Quizzes</span>
            <span className="text-[10px] bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded-full">
              {mockCodeBlanks.length}
            </span>
          </Button>

          <Link href="/challenges">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-mono gap-1 text-slate-400 hover:text-cyan-400 hidden md:flex"
              title="Ir para a Arena de Algoritmos Completos"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Arena Completa</span>
            </Button>
          </Link>
        </div>

        {/* Informações de Streak e Pontos */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{streak} seguidos!</span>
            </div>
          )}

          <Badge variant="accent" className="font-mono text-xs">
            <Trophy className="w-3 h-3 mr-1" />
            +{currentChallenge.xp} XP
          </Badge>

          {isSolved && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Resolvido
            </span>
          )}
        </div>
      </div>

      {/* Grid Principal: Desafio e Painel de Código */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lado Esquerdo: Enunciado & Controles de Modo */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-surface/60 border border-surface-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold uppercase">
                {currentChallenge.categoryLabel || currentChallenge.category}
              </span>
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
            </div>

            <h1 className="text-xl font-bold text-white tracking-tight leading-snug">
              {currentChallenge.title}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentChallenge.description}
            </p>

            {/* Alternador de Modo de Resposta */}
            <div className="pt-2 border-t border-surface-border">
              <span className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
                Modo de Resolução:
              </span>
              <div className="grid grid-cols-2 gap-2 bg-[#05070E] p-1 rounded-xl border border-surface-border">
                <button
                  type="button"
                  onClick={() => setInputMode("choice")}
                  className={`py-1.5 text-xs font-mono rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    inputMode === "choice"
                      ? "bg-cyan-500 text-white font-bold shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Puzzle className="w-3.5 h-3.5" />
                  Múltipla Escolha
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("typing")}
                  className={`py-1.5 text-xs font-mono rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    inputMode === "typing"
                      ? "bg-cyan-500 text-white font-bold shadow-glow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Digitação
                </button>
              </div>
            </div>

            {/* Ações de Reset e Execução */}
            <div className="pt-2 flex flex-col gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={handleRunAndValidate}
                disabled={isExecuting}
                className="w-full font-mono text-xs shadow-glow py-3"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isExecuting ? "Executando Teste..." : "Executar e Validar"}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setUserAnswers({});
                  setStatus("idle");
                  setErrorMessage("");
                  setActiveHint("");
                }}
                className="w-full font-mono text-xs text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Limpar Lacunas
              </Button>
            </div>
          </div>

          {/* Dica Contextual */}
          {activeHint && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold font-mono">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Dica para a Lacuna:</span>
              </div>
              <p className="leading-relaxed pl-6 text-slate-300">{activeHint}</p>
            </div>
          )}

          {/* Card de Explicação Educativa (Aparece ao Vencer) */}
          {showExplanation && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-2 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Excelente! Desafio Concluído!</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {currentChallenge.explanation}
              </p>
              {currentIndex < mockCodeBlanks.length - 1 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleNextChallenge}
                  className="w-full mt-2 font-mono text-xs gap-1"
                >
                  <span>Ir para o Próximo Desafio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Lado Direito: Editor de Lacunas & Chips de Múltipla Escolha */}
        <div className="lg:col-span-8 space-y-4">
          {/* Card do Código com Lacunas */}
          <div className="rounded-2xl bg-[#070A10] border border-surface-border shadow-2xl overflow-hidden flex flex-col">
            {/* Header da Janela de Código */}
            <div className="h-10 px-4 bg-surface/70 border-b border-surface-border flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-300">desafio-lacunas.js</span>
              </div>
              <span className="text-[11px] text-cyan-400 font-mono">
                {currentChallenge.blanks.length} {currentChallenge.blanks.length === 1 ? "lacuna" : "lacunas"}
              </span>
            </div>

            {/* Área de Visualização do Código */}
            <div className="p-6 font-mono text-xs sm:text-sm leading-loose text-slate-300 whitespace-pre-wrap select-text">
              {renderCodeSegments()}
            </div>

            {/* Seletor de Opções (Chips de Múltipla Escolha) */}
            {inputMode === "choice" && activeBlank && (
              <div className="p-4 bg-[#0A0E18] border-t border-surface-border space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">
                    Selecione a opção para <span className="text-cyan-400 font-bold font-mono">[{activeBlank.placeholder}]</span>:
                  </span>
                  <span className="text-[10px] text-slate-500">Clique na alternativa correta</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeBlank.options.map((opt) => {
                    const isSelected = userAnswers[activeBlank.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectChoice(activeBlank.id, opt)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-cyan-500 text-white shadow-glow ring-2 ring-cyan-400"
                            : "bg-surface border border-surface-border text-slate-200 hover:border-cyan-500/50 hover:bg-surface-hover hover:text-white"
                        }`}
                      >
                        {isSelected && <CheckCheck className="w-3.5 h-3.5 text-white" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Console / Terminal de Resultados */}
          <div className="rounded-2xl bg-surface/90 border border-surface-border p-4 font-mono text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-surface-border pb-2">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-primary-400" />
                Saída de Execução
              </span>
              {status === "success" && (
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Correto!
                </span>
              )}
              {status === "error" && (
                <span className="text-rose-400 font-semibold flex items-center gap-1 text-[11px]">
                  <XCircle className="w-3.5 h-3.5" />
                  Incorreto
                </span>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-start gap-2">
                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="p-3 rounded-xl bg-[#05070E] border border-surface-border">
                <span className="text-slate-500 block mb-1">Saída Esperada:</span>
                <pre className="text-emerald-400 font-bold overflow-x-auto">
                  {JSON.stringify(currentChallenge.expectedOutput, null, 2)}
                </pre>
              </div>

              <div className="p-3 rounded-xl bg-[#05070E] border border-surface-border">
                <span className="text-slate-500 block mb-1">Sua Saída:</span>
                <pre
                  className={`font-bold overflow-x-auto ${
                    status === "success"
                      ? "text-emerald-400"
                      : status === "error"
                      ? "text-rose-400"
                      : "text-slate-400"
                  }`}
                >
                  {executionOutput !== null
                    ? JSON.stringify(executionOutput, null, 2)
                    : "Pressione \"Executar e Validar\" para rodar."}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Gaveta de Seleção de Quizzes */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-surface border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-surface-border flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Puzzle className="w-5 h-5 text-emerald-400" />
                  <span>Catálogo de Quizzes & Lacunas</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Treine sintaxe e métodos preenchendo o código interativo.
                </p>
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-surface-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input de Busca */}
            <div className="p-4 border-b border-surface-border bg-[#070A10]/50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar por título, método ou categoria..."
                  className="w-full bg-surface text-slate-200 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-cyan-500 font-mono placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Lista de Quizzes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {filteredBlanks.map((b, idx) => {
                const isSelected = b.id === currentChallenge.id;
                const isSolvedItem = solvedIds.includes(b.id);
                const originalIndex = mockCodeBlanks.findIndex((item) => item.id === b.id);

                return (
                  <div
                    key={b.id}
                    onClick={() => {
                      setCurrentIndex(originalIndex);
                      setIsSearchOpen(false);
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-500/50 shadow-glow"
                        : "bg-surface/80 border-surface-border hover:border-slate-600 hover:bg-surface-hover"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-white">{b.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                          {b.categoryLabel || b.category}
                        </span>
                        {isSolvedItem && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                            ✓ Resolvido
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{b.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge
                        variant={
                          b.difficulty === "easy"
                            ? "beginner"
                            : b.difficulty === "medium"
                            ? "intermediate"
                            : "advanced"
                        }
                      >
                        {b.difficulty === "easy" ? "Fácil" : b.difficulty === "medium" ? "Médio" : "Difícil"}
                      </Badge>
                      <Badge variant="accent" className="font-mono text-xs">
                        +{b.xp} XP
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
