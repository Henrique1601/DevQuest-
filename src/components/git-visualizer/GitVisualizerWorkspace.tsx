"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  GitBranch,
  GitCommit as GitCommitIcon,
  GitMerge,
  Terminal as TerminalIcon,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Play,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trash2,
  Info
} from "lucide-react";
import { GitState, GitCommandOutput, GitMission } from "@/types/gitVisualizer";
import {
  INITIAL_GIT_STATE,
  executeGitCommand,
  resetCommitCounter,
  getCurrentCommitId
} from "@/lib/git/gitEngine";
import { GIT_MISSIONS } from "@/lib/data/gitMissions";
import { sfx } from "@/lib/audio/sfx";
import { triggerNeonConfetti } from "@/lib/utils/confetti";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TerminalHistoryItem {
  command?: string;
  output: GitCommandOutput;
}

export function GitVisualizerWorkspace() {
  const [mode, setMode] = useState<"missions" | "sandbox">("missions");
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [missionSolvedModal, setMissionSolvedModal] = useState(false);

  const currentMission: GitMission | undefined =
    mode === "missions" ? GIT_MISSIONS[selectedMissionIndex] : undefined;

  // Estado do Git
  const [gitState, setGitState] = useState<GitState>(INITIAL_GIT_STATE);
  const [inputCommand, setInputCommand] = useState("");
  const [history, setHistory] = useState<TerminalHistoryItem[]>([
    {
      output: {
        text: "Bem-vindo ao Git Visualizer Pro! Digite 'git help' para lista de comandos.",
        type: "info",
      },
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Zoom do grafo SVG
  const [zoom, setZoom] = useState(1);

  // Carrega missões completadas do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("devquest_completed_git_missions");
    if (saved) {
      try {
        setCompletedMissionIds(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Inicializa o estado ao trocar de missão ou modo
  useEffect(() => {
    resetRepoForCurrentContext();
  }, [mode, selectedMissionIndex]);

  const resetRepoForCurrentContext = () => {
    resetCommitCounter(1);
    let state: GitState = {
      commits: [
        {
          id: "c0",
          message: "Initial commit",
          parentIds: [],
          branchName: "main",
          timestamp: 1000,
        },
      ],
      branches: { main: "c0" },
      head: { type: "branch", name: "main" },
    };

    if (mode === "missions" && currentMission?.setupCommands) {
      for (const cmd of currentMission.setupCommands) {
        const res = executeGitCommand(cmd, state);
        state = res.nextState;
      }
    }

    setGitState(state);
    setShowHint(false);
    setMissionSolvedModal(false);
    setHistory([
      {
        output: {
          text:
            mode === "missions"
              ? `Missão ${currentMission?.level}: ${currentMission?.title}\nObjetivo: ${currentMission?.objective}`
              : "Modo Sandbox Livre ativado. Crie branches, commits e merges à vontade!",
          type: "info",
        },
      },
    ]);
  };

  // Rola o terminal para o final
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Foco no input ao clicar no terminal
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Execução de comando
  const handleSendCommand = (cmdToRun?: string) => {
    const command = (cmdToRun !== undefined ? cmdToRun : inputCommand).trim();
    if (!command) return;

    sfx.playClickSfx();
    const { nextState, output } = executeGitCommand(command, gitState);

    // Histórico de comandos
    setCommandHistory((prev) => [...prev, command]);
    setHistoryPointer(-1);

    if (output.text === "__CLEAR__") {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { command, output }]);
    }

    setGitState(nextState);
    setInputCommand("");

    // Validação da missão
    if (mode === "missions" && currentMission) {
      if (currentMission.validate(nextState)) {
        if (!completedMissionIds.includes(currentMission.id)) {
          const updated = [...completedMissionIds, currentMission.id];
          setCompletedMissionIds(updated);
          localStorage.setItem("devquest_completed_git_missions", JSON.stringify(updated));
        }
        sfx.playSuccessChime();
        triggerNeonConfetti();
        setMissionSolvedModal(true);
      }
    }
  };

  // Teclas no input (Seta cima/baixo para histórico e Tab para autocompletar)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer =
        historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputCommand(commandHistory[nextPointer] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputCommand("");
      } else {
        setHistoryPointer(nextPointer);
        setInputCommand(commandHistory[nextPointer] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const branches = Object.keys(gitState.branches);
      const parts = inputCommand.split(" ");
      const last = parts[parts.length - 1];
      const match = branches.find((b) => b.startsWith(last));
      if (match) {
        parts[parts.length - 1] = match;
        setInputCommand(parts.join(" "));
      }
    }
  };

  // Layout do grafo SVG
  // Calcula posições x e y para cada commit
  const commitLayout = React.useMemo(() => {
    const positions: Record<string, { x: number; y: number; branch: string }> = {};
    const branchRows: Record<string, number> = { main: 0 };
    let nextRow = 1;

    // Ordena commits cronologicamente
    const ordered = [...gitState.commits];

    ordered.forEach((commit, idx) => {
      // Determina a linha da branch
      let branch = commit.branchName || "main";
      if (!(branch in branchRows)) {
        branchRows[branch] = nextRow++;
      }
      const row = branchRows[branch] || 0;
      const x = 70 + idx * 95;
      const y = 80 + row * 85;
      positions[commit.id] = { x, y, branch };
    });

    const maxIdx = Math.max(ordered.length, 5);
    const width = Math.max(650, 70 + maxIdx * 105);
    const height = Math.max(340, 90 + nextRow * 90);

    return { positions, width, height };
  }, [gitState.commits]);

  const currentCommitId = getCurrentCommitId(gitState);

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-[#070A10] text-slate-100 select-none overflow-hidden">
      {/* Barra de Ferramentas Superior */}
      <div className="h-14 border-b border-surface-border bg-surface/95 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              Git Visualizer
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Interactive Graph
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Simulador visual de branches, commits, merges e rebase
            </p>
          </div>
        </div>

        {/* Alternador de Modo: Missões vs Sandbox */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0B1120] p-1 rounded-xl border border-surface-border">
            <button
              onClick={() => setMode("missions")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                mode === "missions"
                  ? "bg-cyan-500 text-black shadow-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Missões ({completedMissionIds.length}/{GIT_MISSIONS.length})</span>
            </button>
            <button
              onClick={() => setMode("sandbox")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                mode === "sandbox"
                  ? "bg-purple-500 text-white shadow-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Sandbox Livre</span>
            </button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetRepoForCurrentContext}
            title="Resetar estado do repositório"
            className="text-slate-400 hover:text-rose-400"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Banner da Missão Ativa (quando em modo de missões) */}
      {mode === "missions" && currentMission && (
        <div className="bg-[#0B1222] border-b border-surface-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              disabled={selectedMissionIndex === 0}
              onClick={() => setSelectedMissionIndex((prev) => prev - 1)}
              className="p-1 rounded bg-surface hover:bg-surface-hover text-slate-400 hover:text-white disabled:opacity-30"
              title="Missão anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-cyan-400 font-bold">
              Missão {currentMission.level}/{GIT_MISSIONS.length}:
            </span>
            <span className="font-bold text-white">{currentMission.title}</span>
            {completedMissionIds.includes(currentMission.id) ? (
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Concluída
              </span>
            ) : (
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                Em progresso
              </span>
            )}
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-300 hidden md:inline">{currentMission.objective}</span>
            <button
              disabled={selectedMissionIndex === GIT_MISSIONS.length - 1}
              onClick={() => setSelectedMissionIndex((prev) => prev + 1)}
              className="p-1 rounded bg-surface hover:bg-surface-hover text-slate-400 hover:text-white disabled:opacity-30"
              title="Próxima missão"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? "Ocultar Dica" : "Ver Dica"}</span>
            </button>
          </div>

          {showHint && (
            <div className="w-full pt-1 pb-1 text-slate-300 bg-amber-500/5 p-2 rounded-lg border border-amber-500/20 text-[11px] font-mono flex items-center justify-between">
              <span>💡 {currentMission.hint}</span>
              <button
                onClick={() => handleSendCommand(currentMission.hint.replace(/^Digite:\s*/, ""))}
                className="text-cyan-400 hover:underline font-bold"
              >
                Preencher e Executar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Grid Principal: Terminal (Esquerda) e Grafo SVG (Direita) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Painel do Terminal CLI (5 colunas) */}
        <div
          className="lg:col-span-5 flex flex-col bg-[#050811] border-r border-surface-border overflow-hidden"
          onClick={focusInput}
        >
          {/* Header do Terminal */}
          <div className="h-9 bg-[#0B1120] border-b border-surface-border px-3 flex items-center justify-between text-xs font-mono shrink-0">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-300 font-semibold ml-2">bash - devquest terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyan-400">
                HEAD: {gitState.head.type === "branch" ? gitState.head.name : `@${gitState.head.name}`}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                }}
                className="text-slate-400 hover:text-white"
                title="Limpar terminal"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Histórico do Terminal */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2.5">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.command && (
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <span className="text-slate-500 select-none">
                      dev@devquest:~/projeto ({gitState.head.name}) $
                    </span>
                    <span className="text-white font-semibold">{item.command}</span>
                  </div>
                )}
                <div
                  className={`pl-2 whitespace-pre-wrap leading-relaxed ${
                    item.output.type === "error"
                      ? "text-rose-400 border-l-2 border-rose-500"
                      : item.output.type === "success"
                      ? "text-emerald-300 border-l-2 border-emerald-500"
                      : item.output.type === "warning"
                      ? "text-amber-300 border-l-2 border-amber-500"
                      : "text-slate-300"
                  }`}
                >
                  {item.output.text}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Chips de Atalhos Rápidos */}
          <div className="px-3 py-1.5 border-t border-surface-border/60 bg-[#090E1A] flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono shrink-0">
            <span className="text-slate-500 text-[10px] mr-1">Atalhos:</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendCommand('git commit -m "feat: novo recurso"');
              }}
              className="px-2 py-0.5 rounded bg-surface hover:bg-surface-hover text-slate-300 hover:text-cyan-300 whitespace-nowrap"
            >
              commit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendCommand("git checkout -b feature");
              }}
              className="px-2 py-0.5 rounded bg-surface hover:bg-surface-hover text-slate-300 hover:text-cyan-300 whitespace-nowrap"
            >
              branch feature
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendCommand("git checkout main");
              }}
              className="px-2 py-0.5 rounded bg-surface hover:bg-surface-hover text-slate-300 hover:text-cyan-300 whitespace-nowrap"
            >
              checkout main
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendCommand("git merge feature");
              }}
              className="px-2 py-0.5 rounded bg-surface hover:bg-surface-hover text-slate-300 hover:text-cyan-300 whitespace-nowrap"
            >
              merge feature
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSendCommand("git log");
              }}
              className="px-2 py-0.5 rounded bg-surface hover:bg-surface-hover text-slate-300 hover:text-cyan-300 whitespace-nowrap"
            >
              log
            </button>
          </div>

          {/* Linha de Input do Terminal */}
          <div className="p-3 border-t border-surface-border bg-[#0B1120] flex items-center gap-2 shrink-0">
            <span className="text-cyan-400 font-mono text-xs select-none">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite um comando git (ex: git commit -m 'feat: algo')..."
              className="flex-1 bg-transparent text-white font-mono text-xs outline-none placeholder:text-slate-600"
              autoFocus
            />
            <button
              onClick={() => handleSendCommand()}
              disabled={!inputCommand.trim()}
              className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition-colors disabled:opacity-30"
            >
              Executar
            </button>
          </div>
        </div>

        {/* Painel do Grafo SVG Interativo (7 colunas) */}
        <div className="lg:col-span-7 flex flex-col bg-[#070A10] relative overflow-hidden">
          {/* Header do Grafo */}
          <div className="h-9 bg-[#0B1120]/80 border-b border-surface-border px-4 flex items-center justify-between text-xs shrink-0">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <GitCommitIcon className="w-4 h-4 text-cyan-400" />
              <span>Grafo de Commits & Branches</span>
              <span className="text-slate-500">({gitState.commits.length} commits)</span>
            </div>

            {/* Controles de Zoom */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
                className="p-1 rounded hover:bg-surface text-slate-400 hover:text-white"
                title="Diminuir zoom"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-slate-400 w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
                className="p-1 rounded hover:bg-surface text-slate-400 hover:text-white"
                title="Aumentar zoom"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(1)}
                className="p-1 rounded hover:bg-surface text-slate-400 hover:text-white text-[10px] font-mono"
                title="Resetar zoom"
              >
                100%
              </button>
            </div>
          </div>

          {/* Área do Grafo SVG com Scroll e Drag */}
          <div className="flex-1 overflow-auto p-6 flex items-center justify-center relative bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "center center",
                transition: "transform 0.15s ease-out",
              }}
            >
              <svg
                width={commitLayout.width}
                height={commitLayout.height}
                className="overflow-visible"
              >
                <defs>
                  {/* Gradiente para nós de commit normais */}
                  <linearGradient id="commitGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>

                  {/* Gradiente para commit ativo/HEAD */}
                  <linearGradient id="headGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>

                  {/* Filtro Glow Neon */}
                  <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Conexões Bézier entre Pais e Filhos */}
                {gitState.commits.map((commit) => {
                  const targetPos = commitLayout.positions[commit.id];
                  if (!targetPos) return null;

                  return commit.parentIds.map((parentId) => {
                    const parentPos = commitLayout.positions[parentId];
                    if (!parentPos) return null;

                    // Curva Bézier suave entre o pai e o filho
                    const dx = targetPos.x - parentPos.x;
                    const pathD = `M ${parentPos.x} ${parentPos.y} C ${parentPos.x + dx / 2} ${parentPos.y}, ${parentPos.x + dx / 2} ${targetPos.y}, ${targetPos.x} ${targetPos.y}`;

                    return (
                      <path
                        key={`${parentId}-${commit.id}`}
                        d={pathD}
                        fill="none"
                        stroke="#334155"
                        strokeWidth="3"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    );
                  });
                })}

                {/* 2. Renderização dos Nós de Commit */}
                {gitState.commits.map((commit) => {
                  const pos = commitLayout.positions[commit.id];
                  if (!pos) return null;
                  const isCurrentHead = currentCommitId === commit.id;

                  // Descobre quais branches apontam para este commit
                  const pointingBranches = Object.entries(gitState.branches)
                    .filter(([_, cid]) => cid === commit.id)
                    .map(([b]) => b);

                  return (
                    <g key={commit.id} className="cursor-pointer group">
                      {/* Anel Pulsante no Commit Ativo */}
                      {isCurrentHead && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="26"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animate-spin origin-center opacity-75"
                          style={{ transformOrigin: `${pos.x}px ${pos.y}px`, animationDuration: "12s" }}
                        />
                      )}

                      {/* Círculo do Commit */}
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="18"
                        fill={isCurrentHead ? "url(#headGrad)" : "url(#commitGrad)"}
                        stroke="#0f172a"
                        strokeWidth="3"
                        filter="url(#neonGlow)"
                        className="transition-transform group-hover:scale-110"
                      />

                      {/* Identificador do Commit (Hash curto c0, c1...) */}
                      <text
                        x={pos.x}
                        y={pos.y + 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                        className="pointer-events-none select-none"
                      >
                        {commit.id}
                      </text>

                      {/* Mensagem do Commit abaixo do nó */}
                      <text
                        x={pos.x}
                        y={pos.y + 34}
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                        className="pointer-events-none select-none"
                      >
                        {commit.message.length > 14
                          ? commit.message.substring(0, 12) + "..."
                          : commit.message}
                      </text>

                      {/* Badges de Branches apontando para este commit */}
                      {pointingBranches.map((branch, bIdx) => {
                        const tagY = pos.y - 30 - bIdx * 24;
                        const isHeadBranch =
                          gitState.head.type === "branch" && gitState.head.name === branch;

                        return (
                          <g key={branch}>
                            <rect
                              x={pos.x - 35}
                              y={tagY - 14}
                              width="70"
                              height="20"
                              rx="6"
                              fill={isHeadBranch ? "#0e7490" : "#1e293b"}
                              stroke={isHeadBranch ? "#22d3ee" : "#475569"}
                              strokeWidth="1.5"
                            />
                            <text
                              x={pos.x}
                              y={tagY}
                              textAnchor="middle"
                              fill={isHeadBranch ? "#ffffff" : "#cbd5e1"}
                              fontSize="10"
                              fontFamily="monospace"
                              fontWeight="bold"
                            >
                              {branch}
                            </text>
                          </g>
                        );
                      })}

                      {/* Badge de HEAD quando em estado Detached */}
                      {gitState.head.type === "detached" && gitState.head.name === commit.id && (
                        <g>
                          <rect
                            x={pos.x - 45}
                            y={pos.y - 30 - pointingBranches.length * 24 - 14}
                            width="90"
                            height="20"
                            rx="6"
                            fill="#701a75"
                            stroke="#e879f9"
                            strokeWidth="1.5"
                          />
                          <text
                            x={pos.x}
                            y={pos.y - 30 - pointingBranches.length * 24}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="10"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            HEAD (detached)
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Rodapé Informativo do Grafo */}
          <div className="h-10 bg-[#0B1120] border-t border-surface-border px-4 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Commits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                <span>HEAD Atual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 rounded bg-cyan-900/60 border border-cyan-500 text-[10px] text-cyan-300">
                  branch
                </span>
                <span>Ponteiros</span>
              </div>
            </div>

            <div className="hidden sm:block text-slate-500">
              Dica: use <code className="text-cyan-400">git branch</code> para inspecionar ramos locais
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Conclusão da Missão */}
      {missionSolvedModal && currentMission && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-surface border border-emerald-500/30 rounded-3xl p-6 shadow-2xl space-y-5 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-mono font-bold text-emerald-400">
                Missão Concluída! (+50 XP)
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {currentMission.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed pt-2">
                {currentMission.description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMissionSolvedModal(false)}
              >
                Continuar Explorando
              </Button>

              {selectedMissionIndex < GIT_MISSIONS.length - 1 && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedMissionIndex((prev) => prev + 1);
                    setMissionSolvedModal(false);
                  }}
                >
                  <span>Próxima Missão</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
