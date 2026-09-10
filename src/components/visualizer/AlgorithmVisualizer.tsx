"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  Info,
  Zap,
  Layers,
  Search,
  ArrowUpDown,
  Code,
  Gauge
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { generateBinarySearchSteps } from "@/lib/algorithms/search";
import { generateBubbleSortSteps, generateSelectionSortSteps } from "@/lib/algorithms/sorting";
import { generateStackSteps, generateQueueSteps } from "@/lib/algorithms/dataStructures";
import { SortStep, SearchStep, StructureStep } from "@/lib/algorithms/types";

type AlgorithmType = "binary-search" | "bubble-sort" | "selection-sort" | "stack" | "queue";

export function AlgorithmVisualizer() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmType>("binary-search");

  // Parâmetros de array
  const [sortArray, setSortArray] = useState<number[]>([45, 12, 85, 32, 89, 39, 69, 21, 58, 9]);
  const [searchArray, setSearchArray] = useState<number[]>([5, 12, 19, 24, 33, 45, 58, 67, 72, 89, 95]);
  const [searchTarget, setSearchTarget] = useState<number>(58);

  // Passos gerados
  const [sortSteps, setSortSteps] = useState<SortStep[]>([]);
  const [searchSteps, setSearchSteps] = useState<SearchStep[]>([]);
  const [structureSteps, setStructureSteps] = useState<StructureStep[]>([]);

  // Índice do passo atual
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(800); // ms por passo

  // Inicializa passos ao alterar algoritmo ou dados
  useEffect(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);

    if (selectedAlgo === "binary-search") {
      setSearchSteps(generateBinarySearchSteps(searchArray, searchTarget));
    } else if (selectedAlgo === "bubble-sort") {
      setSortSteps(generateBubbleSortSteps(sortArray));
    } else if (selectedAlgo === "selection-sort") {
      setSortSteps(generateSelectionSortSteps(sortArray));
    } else if (selectedAlgo === "stack") {
      setStructureSteps(generateStackSteps());
    } else if (selectedAlgo === "queue") {
      setStructureSteps(generateQueueSteps());
    }
  }, [selectedAlgo, sortArray, searchArray, searchTarget]);

  // Contagem total de passos
  const totalSteps =
    selectedAlgo === "binary-search"
      ? searchSteps.length
      : selectedAlgo === "bubble-sort" || selectedAlgo === "selection-sort"
      ? sortSteps.length
      : structureSteps.length;

  // Loop de Reprodução Automática
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed, totalSteps]);

  // Gerar novo array aleatório
  const handleRandomize = () => {
    setIsPlaying(false);
    if (selectedAlgo === "binary-search") {
      const set = new Set<number>();
      while (set.size < 10) {
        set.add(Math.floor(Math.random() * 90) + 5);
      }
      const newSorted = Array.from(set).sort((a, b) => a - b);
      setSearchArray(newSorted);
      const randomTarget = newSorted[Math.floor(Math.random() * newSorted.length)];
      setSearchTarget(randomTarget);
    } else {
      const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 85) + 10);
      setSortArray(newArr);
    }
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Snapshot atual
  const currentSortStep = sortSteps[currentStepIndex] || sortSteps[0];
  const currentSearchStep = searchSteps[currentStepIndex] || searchSteps[0];
  const currentStructureStep = structureSteps[currentStepIndex] || structureSteps[0];

  const currentExplanation =
    selectedAlgo === "binary-search"
      ? currentSearchStep?.explanation
      : selectedAlgo === "bubble-sort" || selectedAlgo === "selection-sort"
      ? currentSortStep?.explanation
      : currentStructureStep?.explanation;

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-primary-500/20 text-primary-400 border border-primary-500/30">
              <Zap className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-primary-400">DevQuest Labs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Visualizador de Algoritmos & Estruturas
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Entenda visualmente cada operação, comparações, ponteiros e complexidade Big-O em tempo real.
          </p>
        </div>

        {/* Seletor de Algoritmo */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "binary-search", name: "Busca Binária", icon: Search },
            { id: "bubble-sort", name: "Bubble Sort", icon: ArrowUpDown },
            { id: "selection-sort", name: "Selection Sort", icon: ArrowUpDown },
            { id: "stack", name: "Pilha (LIFO)", icon: Layers },
            { id: "queue", name: "Fila (FIFO)", icon: Layers }
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedAlgo === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedAlgo(item.id as AlgorithmType)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? "bg-primary-500 text-white shadow-glow border-primary-400"
                    : "bg-surface border border-surface-border text-slate-400 hover:text-white hover:bg-surface-hover"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Painel Principal de Visualização */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizador Gráfico (coluna 8) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="bg-surface/80 border border-surface-border rounded-2xl p-6 flex flex-col min-h-[380px] justify-between relative overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Top Bar do Card */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-surface-border/60 pb-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                Passo {currentStepIndex + 1} de {totalSteps}
              </span>

              {selectedAlgo === "binary-search" && (
                <div className="flex items-center gap-2">
                  <span>Alvo de Busca:</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 font-bold border border-primary-500/40">
                    {searchTarget}
                  </span>
                </div>
              )}
            </div>

            {/* ÁREA GRÁFICA: SORTING (BARRAS) */}
            {(selectedAlgo === "bubble-sort" || selectedAlgo === "selection-sort") && currentSortStep && (
              <div className="flex items-end justify-center gap-2 sm:gap-3 h-56 py-4">
                {currentSortStep.array.map((val, idx) => {
                  const isComparing = currentSortStep.comparing?.includes(idx);
                  const isSwapping = currentSortStep.swapping?.includes(idx);
                  const isSorted = currentSortStep.sortedIndices.includes(idx);

                  let bgClass = "bg-primary-500/40 border-primary-500/60 text-primary-300";
                  if (isSorted) {
                    bgClass = "bg-emerald-500/60 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/20";
                  } else if (isSwapping) {
                    bgClass = "bg-rose-500 border-rose-300 text-white animate-bounce";
                  } else if (isComparing) {
                    bgClass = "bg-amber-400 border-amber-200 text-slate-950 font-bold";
                  }

                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[50px]">
                      <span className="text-[11px] font-mono text-slate-300 font-bold">{val}</span>
                      <div
                        style={{ height: `${val * 2.2}px` }}
                        className={`w-full rounded-t-lg border-t-2 border-x transition-all duration-300 flex items-end justify-center pb-1 ${bgClass}`}
                      />
                      <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ÁREA GRÁFICA: BUSCA BINÁRIA */}
            {selectedAlgo === "binary-search" && currentSearchStep && (
              <div className="flex flex-col items-center justify-center my-auto py-6 space-y-6">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
                  {currentSearchStep.array.map((val, idx) => {
                    const isLow = idx === currentSearchStep.low;
                    const isHigh = idx === currentSearchStep.high;
                    const isMid = idx === currentSearchStep.mid;
                    const isFound = currentSearchStep.foundIndex === idx;
                    const isOutside = idx < currentSearchStep.low || idx > currentSearchStep.high;

                    let cardStyle = "bg-surface border-surface-border text-slate-300";
                    if (isFound) {
                      cardStyle = "bg-emerald-500 text-white font-bold scale-110 shadow-lg shadow-emerald-500/40 border-emerald-300";
                    } else if (isMid) {
                      cardStyle = "bg-primary-500 text-white font-bold scale-105 border-primary-300";
                    } else if (isOutside) {
                      cardStyle = "bg-surface/30 border-dashed border-surface-border text-slate-600 opacity-40";
                    }

                    return (
                      <div key={idx} className="flex flex-col items-center gap-1.5">
                        <div
                          className={`w-11 h-12 rounded-xl border flex items-center justify-center font-mono text-sm transition-all duration-300 ${cardStyle}`}
                        >
                          {val}
                        </div>

                        {/* Rótulos dos ponteiros */}
                        <div className="h-5 flex items-center gap-0.5 text-[9px] font-mono font-bold">
                          {isMid && <span className="text-primary-400 bg-primary-500/20 px-1 rounded">MID</span>}
                          {isLow && <span className="text-cyan-400 bg-cyan-500/20 px-1 rounded">LOW</span>}
                          {isHigh && <span className="text-amber-400 bg-amber-500/20 px-1 rounded">HIGH</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ÁREA GRÁFICA: ESTRUTURAS (PILHA & FILA) */}
            {(selectedAlgo === "stack" || selectedAlgo === "queue") && currentStructureStep && (
              <div className="flex flex-col items-center justify-center my-auto py-8">
                {selectedAlgo === "stack" ? (
                  <div className="w-56 border-b-4 border-x-4 border-primary-500/60 rounded-b-2xl p-3 flex flex-col-reverse gap-2 bg-slate-950/60 min-h-[220px]">
                    {currentStructureStep.items.length === 0 ? (
                      <div className="text-center text-slate-600 text-xs py-12 font-mono">Pilha Vazia</div>
                    ) : (
                      currentStructureStep.items.map((it, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-indigo-600 text-white font-mono text-xs font-bold text-center shadow-lg transition-all animate-fade-in"
                        >
                          {it} {i === currentStructureStep.items.length - 1 && "(TOPO)"}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-4 border-y-2 border-accent-500/50 rounded-xl bg-slate-950/60 overflow-x-auto max-w-full">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold shrink-0">
                      SAÍDA &larr;
                    </span>
                    {currentStructureStep.items.length === 0 ? (
                      <div className="text-center text-slate-600 text-xs py-4 px-8 font-mono">Fila Vazia</div>
                    ) : (
                      currentStructureStep.items.map((it, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-primary-600 text-white font-mono text-xs font-bold shrink-0 shadow-lg"
                        >
                          {it}
                        </div>
                      ))
                    )}
                    <span className="text-[10px] font-mono text-primary-400 uppercase font-bold shrink-0">
                      &larr; ENTRADA
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Barra de Progresso */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-4">
              <div
                className="bg-gradient-to-r from-primary-500 to-accent-400 h-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Barra de Controles do Player */}
          <div className="bg-surface border border-surface-border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Button
                variant={isPlaying ? "secondary" : "primary"}
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="font-mono text-xs gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? "Pausar" : "Reproduzir"}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentStepIndex === 0}
                className="text-xs"
                title="Passo Anterior"
              >
                <SkipBack className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                disabled={currentStepIndex === totalSteps - 1}
                className="text-xs"
                title="Próximo Passo"
              >
                <SkipForward className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white"
                title="Voltar ao início"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Velocidade e Randomize */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-[#070A10] p-1 rounded-xl border border-surface-border text-xs font-mono">
                <span className="text-slate-500 px-1 text-[11px]">Velocidade:</span>
                {[
                  { label: "0.5x", val: 1200 },
                  { label: "1x", val: 800 },
                  { label: "2x", val: 400 }
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => setSpeed(s.val)}
                    className={`px-2 py-0.5 rounded-lg transition-colors ${
                      speed === s.val ? "bg-primary-500 text-white font-bold" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {(selectedAlgo === "binary-search" || selectedAlgo === "bubble-sort" || selectedAlgo === "selection-sort") && (
                <Button variant="secondary" size="sm" onClick={handleRandomize} className="text-xs font-mono gap-1.5">
                  <Shuffle className="w-3.5 h-3.5 text-primary-400" />
                  <span>Novo Array</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Coluna Lateral: Explicação Passo-a-Passo e Complexidade Big-O (coluna 4) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Card da Explicação do Passo Atual */}
          <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Info className="w-4 h-4" />
              <span>O que está acontecendo agora?</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans bg-[#070A10] p-4 rounded-xl border border-surface-border/60">
              {currentExplanation}
            </p>
          </div>

          {/* Card de Complexidade Big-O */}
          <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary-400">
              <Gauge className="w-4 h-4" />
              <span>Análise de Complexidade Assintótica (Big-O)</span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#070A10] border border-surface-border">
                <div className="text-slate-500 text-[10px] uppercase">Melhor Caso</div>
                <div className="text-emerald-400 font-bold text-sm mt-0.5">
                  {selectedAlgo === "binary-search"
                    ? "O(1)"
                    : selectedAlgo === "bubble-sort"
                    ? "O(n)"
                    : selectedAlgo === "selection-sort"
                    ? "O(n²)"
                    : "O(1)"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#070A10] border border-surface-border">
                <div className="text-slate-500 text-[10px] uppercase">Pior Caso</div>
                <div className="text-rose-400 font-bold text-sm mt-0.5">
                  {selectedAlgo === "binary-search"
                    ? "O(log n)"
                    : selectedAlgo === "bubble-sort"
                    ? "O(n²)"
                    : selectedAlgo === "selection-sort"
                    ? "O(n²)"
                    : "O(1)"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#070A10] border border-surface-border">
                <div className="text-slate-500 text-[10px] uppercase">Caso Médio</div>
                <div className="text-amber-400 font-bold text-sm mt-0.5">
                  {selectedAlgo === "binary-search"
                    ? "O(log n)"
                    : selectedAlgo === "bubble-sort"
                    ? "O(n²)"
                    : selectedAlgo === "selection-sort"
                    ? "O(n²)"
                    : "O(1)"}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#070A10] border border-surface-border">
                <div className="text-slate-500 text-[10px] uppercase">Espaço Auxiliar</div>
                <div className="text-cyan-400 font-bold text-sm mt-0.5">
                  {selectedAlgo === "stack" || selectedAlgo === "queue" ? "O(n)" : "O(1)"}
                </div>
              </div>
            </div>

            {/* Dica Didática */}
            <div className="p-3 rounded-xl bg-primary-500/10 border border-primary-500/20 text-xs text-slate-300">
              <span className="text-primary-300 font-bold">Por que importa? </span>
              {selectedAlgo === "binary-search"
                ? "A busca binária reduz o espaço de busca pela metade a cada passo, permitindo encontrar elementos em 1 bilhão de itens em apenas ~30 passos!"
                : selectedAlgo === "bubble-sort" || selectedAlgo === "selection-sort"
                ? "Algoritmos O(n²) são ótimos para aprender os fundamentos, mas tornam-se lentos para grandes volumes de dados."
                : "Pilhas e filas são a base do funcionamento da Call Stack do JavaScript, filas de mensagens do RabbitMQ e histórico de desfazer (Undo/Redo)."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
