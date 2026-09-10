"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  Play,
  RotateCcw,
  CheckCircle2,
  Circle,
  HelpCircle,
  Sparkles,
  Trophy,
  FolderGit2,
  Maximize2,
  Minimize2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VirtualTerminalEngine } from "@/lib/terminal/fileSystem";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  prompt?: string;
}

interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  tasks: { id: string; label: string; check: (engine: VirtualTerminalEngine) => boolean }[];
}

const MISSIONS: Mission[] = [
  {
    id: "mission-linux",
    title: "1. Navegação & Arquivos Linux",
    description: "Aprenda a inspecionar caminhos e criar pastas no sistema de arquivos.",
    xp: 60,
    tasks: [
      {
        id: "t1",
        label: "Descubra seu diretório atual usando o comando 'pwd'",
        check: () => true // Verificado no histórico
      },
      {
        id: "t2",
        label: "Crie uma nova pasta chamada 'meu-projeto' usando 'mkdir meu-projeto'",
        check: (eng) => {
          const { node } = eng.resolvePath("meu-projeto");
          return !!(node && node.type === "dir");
        }
      },
      {
        id: "t3",
        label: "Crie um arquivo dentro dela ou na pasta atual com 'touch index.js'",
        check: (eng) => {
          const { node } = eng.resolvePath("index.js");
          return !!(node && node.type === "file");
        }
      }
    ]
  },
  {
    id: "mission-git",
    title: "2. Seu Primeiro Repositório Git",
    description: "Inicialize o versionador de código, adicione arquivos ao stage e realize seu primeiro commit.",
    xp: 90,
    tasks: [
      {
        id: "g1",
        label: "Inicialize o repositório Git com 'git init'",
        check: (eng) => eng.git.isInitialized
      },
      {
        id: "g2",
        label: "Adicione arquivos ao stage com 'git add .'",
        check: (eng) => eng.git.stagedFiles.length > 0 || eng.git.commits.length > 0
      },
      {
        id: "g3",
        label: "Faça seu primeiro commit com 'git commit -m \"feat: initial commit\"'",
        check: (eng) => eng.git.commits.length > 0
      }
    ]
  },
  {
    id: "mission-branch",
    title: "3. Gerenciamento de Branches",
    description: "Crie uma ramificação paralela de código para desenvolver novas funcionalidades.",
    xp: 100,
    tasks: [
      {
        id: "b1",
        label: "Crie e alterne para uma nova branch com 'git checkout -b feature/login'",
        check: (eng) => eng.git.currentBranch === "feature/login"
      },
      {
        id: "b2",
        label: "Liste as branches existentes usando 'git branch'",
        check: (eng) => eng.git.branches.length >= 2
      }
    ]
  }
];

export function WebTerminal() {
  const [engine] = useState(() => new VirtualTerminalEngine());
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      content: "DevQuest Web Terminal v2.4 (x86_64-pc-linux-gnu)\nDigite 'help' para ver todos os comandos disponíveis ou selecione uma Missão ao lado."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Missões
  const [activeMissionId, setActiveMissionId] = useState<string>(MISSIONS[0].id);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Foco no input ao clicar no terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Verifica progresso das missões
  const checkMissions = () => {
    const currentMission = MISSIONS.find((m) => m.id === activeMissionId);
    if (!currentMission) return;

    const newCompleted: string[] = [...completedTaskIds];
    currentMission.tasks.forEach((t) => {
      if (!newCompleted.includes(t.id) && t.check(engine)) {
        newCompleted.push(t.id);
      }
    });

    if (newCompleted.length !== completedTaskIds.length) {
      setCompletedTaskIds(newCompleted);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    // Adiciona ao histórico
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const promptStr = `devquest@linux:${engine.cwd}$ `;

    if (cmd === "clear") {
      setLines([]);
      setInputValue("");
      return;
    }

    const { output, isError } = engine.execute(cmd);

    const newLines: TerminalLine[] = [
      ...lines,
      { id: Math.random().toString(), type: "input", prompt: promptStr, content: cmd }
    ];

    if (output) {
      newLines.push({
        id: Math.random().toString(),
        type: isError ? "error" : "output",
        content: output
      });
    }

    setLines(newLines);
    setInputValue("");

    // Valida missões
    setTimeout(checkMissions, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue("");
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex] || "");
      }
    }
  };

  const activeMission = MISSIONS.find((m) => m.id === activeMissionId) || MISSIONS[0];
  const allMissionTasksCompleted = activeMission.tasks.every((t) => completedTaskIds.includes(t.id));

  // Renderizador de ANSI simples (para cores de Git)
  const formatAnsi = (text: string) => {
    // Substitui códigos ANSI comuns por classes Tailwind
    const parts = text.split(/(\x1b\[[0-9;]*m)/);
    let currentColor = "";

    return parts.map((part, index) => {
      if (part === "\x1b[32m") {
        currentColor = "text-emerald-400";
        return null;
      }
      if (part === "\x1b[31m") {
        currentColor = "text-rose-400";
        return null;
      }
      if (part === "\x1b[34m") {
        currentColor = "text-blue-400 font-bold";
        return null;
      }
      if (part === "\x1b[33m") {
        currentColor = "text-amber-400 font-semibold";
        return null;
      }
      if (part === "\x1b[0m") {
        currentColor = "";
        return null;
      }
      return (
        <span key={index} className={currentColor}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <TerminalIcon className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-emerald-400">Ambiente de Shell</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Terminal Linux & Git Interativo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pratique comandos do dia-a-dia de desenvolvedor: navegação de diretórios, manipulação de arquivos e ciclo de commits do Git.
          </p>
        </div>

        {/* Status do Git */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border font-mono text-xs text-slate-300">
            <FolderGit2 className="w-3.5 h-3.5 text-primary-400" />
            <span>Branch: </span>
            <span className="text-cyan-400 font-bold">{engine.git.currentBranch}</span>
          </div>
        </div>
      </div>

      {/* Grid Principal: Terminal e Missões */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Janela do Terminal (coluna 8) */}
        <div
          onClick={handleTerminalClick}
          className="lg:col-span-8 bg-[#070A10] border border-surface-border rounded-2xl flex flex-col h-[520px] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm relative cursor-text"
        >
          {/* Header da Janela de Terminal */}
          <div className="h-10 bg-surface/80 border-b border-surface-border px-4 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-primary-400" />
                bash - devquest@linux:{engine.cwd}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLines([]);
                }}
                className="text-slate-500 hover:text-slate-300 text-xs p-1"
                title="Limpar tela"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Área de Linhas do Terminal */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text">
            {lines.map((l) => (
              <div key={l.id} className="leading-relaxed">
                {l.type === "input" && (
                  <div className="flex items-center gap-1.5 text-slate-200">
                    <span className="text-emerald-400 font-semibold">{l.prompt}</span>
                    <span className="font-bold text-white">{l.content}</span>
                  </div>
                )}
                {l.type === "output" && (
                  <pre className="text-slate-300 whitespace-pre-wrap font-mono pl-2 border-l border-surface-border/40">
                    {formatAnsi(l.content)}
                  </pre>
                )}
                {l.type === "error" && (
                  <pre className="text-rose-400 whitespace-pre-wrap font-mono pl-2 border-l border-rose-500/40">
                    {l.content}
                  </pre>
                )}
                {l.type === "system" && (
                  <div className="text-cyan-400/90 whitespace-pre-wrap p-2.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 my-1">
                    {l.content}
                  </div>
                )}
              </div>
            ))}

            {/* Linha de Prompt Ativa */}
            <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 pt-1">
              <span className="text-emerald-400 font-semibold shrink-0">
                devquest@linux:{engine.cwd}$
              </span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="flex-1 bg-transparent text-white focus:outline-none font-mono caret-primary-400"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Painel de Missões & Desafios Guiados (coluna 4) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Missões de Terminal</span>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                +{activeMission.xp} XP
              </span>
            </div>

            {/* Seletor de Missões */}
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {MISSIONS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMissionId(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono shrink-0 transition-colors ${
                    activeMissionId === m.id
                      ? "bg-primary-500 text-white font-bold"
                      : "bg-surface-hover text-slate-400 hover:text-white"
                  }`}
                >
                  {m.id === "mission-linux" ? "Linux" : m.id === "mission-git" ? "Git" : "Branches"}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {activeMission.description}
            </p>

            {/* Lista de Tarefas da Missão */}
            <div className="space-y-2.5 pt-2">
              {activeMission.tasks.map((task) => {
                const isDone = completedTaskIds.includes(task.id);
                return (
                  <div
                    key={task.id}
                    className={`p-3 rounded-xl border flex items-start gap-3 transition-all ${
                      isDone
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                        : "bg-[#070A10] border-surface-border text-slate-300"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    )}
                    <span className="text-xs leading-relaxed">{task.label}</span>
                  </div>
                );
              })}
            </div>

            {allMissionTasksCompleted && (
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-1 animate-fade-in">
                <div className="text-xs font-bold text-emerald-300">🎉 Parabéns! Missão Concluída!</div>
                <div className="text-[11px] text-slate-400">Você dominou este fluxo de terminal.</div>
              </div>
            )}
          </div>

          {/* Dicas Rápidas de Comandos */}
          <div className="bg-surface border border-surface-border rounded-2xl p-5 shadow-lg space-y-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span>Dicas Rápidas:</span>
            </div>
            <ul className="space-y-1.5 text-slate-400 text-[11px]">
              <li>• Use as <kbd className="px-1 bg-slate-800 rounded">Setas ↑ / ↓</kbd> para navegar no histórico.</li>
              <li>• Digite <code className="text-cyan-400">help</code> a qualquer momento para ver o manual.</li>
              <li>• Digite <code className="text-cyan-400">clear</code> para limpar a tela do terminal.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
