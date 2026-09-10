"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ThumbsUp,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Zap,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockFlashcards, Flashcard, FlashcardCategory, FLASHCARD_CATEGORIES } from "@/lib/data/flashcards";

export function FlashcardsApp() {
  const [selectedCategory, setSelectedCategory] = useState<FlashcardCategory | "all">("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  // Histórico da sessão
  const [sessionResults, setSessionResults] = useState<{
    cardId: string;
    rating: "hard" | "good" | "easy";
  }[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Filtrar os cards disponíveis
  const filteredCards = mockFlashcards.filter((card) => {
    return selectedCategory === "all" || card.category === selectedCategory;
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  // Resetar ao trocar de categoria
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionResults([]);
    setIsFinished(false);
  }, [selectedCategory]);

  // Atalhos de teclado (Espaço para virar, 1/2/3 para responder)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished || !currentCard) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (isFlipped) {
        if (e.key === "1") handleRate("hard");
        else if (e.key === "2") handleRate("good");
        else if (e.key === "3") handleRate("easy");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, isFinished, currentCard]);

  const handleRate = (rating: "hard" | "good" | "easy") => {
    if (!currentCard) return;

    setSessionResults((prev) => [...prev, { cardId: currentCard.id, rating }]);

    if (rating === "easy" || rating === "good") {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setIsFlipped(false);

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionResults([]);
    setIsFinished(false);
  };

  const easyCount = sessionResults.filter((r) => r.rating === "easy").length;
  const goodCount = sessionResults.filter((r) => r.rating === "good").length;
  const hardCount = sessionResults.filter((r) => r.rating === "hard").length;
  const earnedXp = easyCount * 15 + goodCount * 10 + hardCount * 5;

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-amber-400">Repetição Espaçada</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Flashcards de Sintaxe & Conceitos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Fixe conceitos fundamentais de JavaScript, TypeScript, React, SQL e Git com repetição espaçada estilo Anki.
          </p>
        </div>

        {/* Indicador de Streak */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-bold">
            <Flame className="w-4 h-4 fill-current text-orange-500" />
            <span>Streak: {streak} acertos</span>
          </div>
        </div>
      </div>

      {/* Categorias */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {FLASHCARD_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
              selectedCategory === cat.id
                ? "bg-primary-500 text-white shadow-glow"
                : "bg-surface border border-surface-border text-slate-400 hover:text-white hover:bg-surface-hover"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tela de Finalização da Rodada */}
      {isFinished ? (
        <div className="bg-surface/90 border border-surface-border rounded-3xl p-8 text-center space-y-6 shadow-2xl backdrop-blur-md max-w-xl mx-auto my-8 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-primary-500 text-white flex items-center justify-center mx-auto shadow-glow">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Sessão Concluída com Sucesso!</h2>
            <p className="text-sm text-slate-400">
              Você revisou todos os {filteredCards.length} cards desta categoria.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <div className="text-lg font-bold">{easyCount}</div>
              <div className="text-[11px] text-slate-400">Fácil (Dominado)</div>
            </div>
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <div className="text-lg font-bold">{goodCount}</div>
              <div className="text-[11px] text-slate-400">Bom</div>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <div className="text-lg font-bold">{hardCount}</div>
              <div className="text-[11px] text-slate-400">Difícil (Revisar)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-sm flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            <span>+{earnedXp} XP Adicionados ao seu Perfil!</span>
          </div>

          <Button variant="primary" size="lg" onClick={handleRestart} className="w-full gap-2 font-mono text-xs">
            <RotateCcw className="w-4 h-4" />
            <span>Praticar Novamente</span>
          </Button>
        </div>
      ) : (
        currentCard && (
          <div className="flex flex-col items-center space-y-6">
            {/* Barra de Progresso */}
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400">
              <span>
                Card {currentIndex + 1} de {filteredCards.length}
              </span>
              <span className="text-[11px] text-slate-500">
                Pressione <kbd className="px-1.5 py-0.5 rounded bg-surface border border-surface-border text-slate-300">Espaço</kbd> para virar
              </span>
            </div>

            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-primary-500 to-amber-400 h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / filteredCards.length) * 100}%` }}
              />
            </div>

            {/* O CARTÃO 3D COM FLIP */}
            <div
              className="w-full max-w-2xl min-h-[380px] perspective-[1200px] cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className={`w-full min-h-[380px] rounded-3xl border border-surface-border p-8 transition-transform duration-500 shadow-2xl relative flex flex-col justify-between backdrop-blur-md ${
                  isFlipped
                    ? "bg-slate-900/95 border-primary-500/40 shadow-primary-500/10"
                    : "bg-surface/90 hover:border-slate-600 hover:shadow-glow"
                }`}
              >
                {/* Header do Card */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400 bg-primary-500/15 border border-primary-500/30 px-3 py-1 rounded-full">
                    {currentCard.categoryLabel}
                  </span>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isFlipped ? "Verso (Resposta)" : "Frente (Pergunta)"}</span>
                  </div>
                </div>

                {/* Conteúdo Central */}
                <div className="my-auto py-6 space-y-4">
                  {!isFlipped ? (
                    <div className="space-y-4 text-center">
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
                        {currentCard.question}
                      </h3>

                      {currentCard.codeSnippet && (
                        <div className="bg-[#070A10] border border-surface-border p-4 rounded-xl text-left font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto">
                          <pre>{currentCard.codeSnippet}</pre>
                        </div>
                      )}

                      <p className="text-xs text-slate-500 pt-4">
                        Clique no cartão ou pressione espaço para revelar a resposta explicada.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm sm:text-base font-semibold">
                        💡 {currentCard.answer}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#070A10] p-4 rounded-xl border border-surface-border/60">
                        {currentCard.explanation}
                      </p>

                      {currentCard.exampleSnippet && (
                        <div className="bg-[#070A10] border border-surface-border p-3.5 rounded-xl font-mono text-xs text-cyan-300 overflow-x-auto">
                          <pre>{currentCard.exampleSnippet}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer do Card */}
                <div className="text-center text-[11px] font-mono text-slate-500 pt-3 border-t border-surface-border/60">
                  {isFlipped ? "Classifique sua retenção abaixo para continuar" : "Clique no cartão para conferir a resposta"}
                </div>
              </div>
            </div>

            {/* BOTÕES DE CLASSIFICAÇÃO DE RETENÇÃO (ANKI STYLE) */}
            {isFlipped && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 animate-fade-in">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRate("hard");
                  }}
                  className="border-rose-500/30 hover:border-rose-500 hover:bg-rose-500/10 text-rose-300 font-mono text-xs gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>[1] Difícil (Revisar)</span>
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRate("good");
                  }}
                  className="border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 text-blue-300 font-mono text-xs gap-1.5"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-blue-400" />
                  <span>[2] Bom</span>
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRate("easy");
                  }}
                  className="border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 text-emerald-300 font-mono text-xs gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>[3] Fácil (Dominado)</span>
                </Button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}
