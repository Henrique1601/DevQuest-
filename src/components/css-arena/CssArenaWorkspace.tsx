"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  CSS_ARENA_LEVELS,
  CssArenaLevel,
} from "@/lib/data/cssArenaLevels";
import {
  Palette,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Zap,
  Play,
  Trophy,
  Bot,
  Radio,
  Eye
} from "lucide-react";
import { sfx } from "@/lib/audio/sfx";

const STORAGE_KEY = "devquest_css_arena_completed";

export function CssArenaWorkspace() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [showTip, setShowTip] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isLevelSolved, setIsLevelSolved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const droneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);

  const level = CSS_ARENA_LEVELS[currentLevelIndex] || CSS_ARENA_LEVELS[0];

  // Carregar progresso salvo
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedLevels(parsed);
        }
      }
    } catch {
      // noop
    }
  }, []);

  // Inicializar código quando troca de fase
  useEffect(() => {
    setUserCode(level.startingCode);
    setShowTip(false);
    setShowSolution(false);
    setIsLevelSolved(false);
    setShowConfetti(false);
  }, [currentLevelIndex, level]);

  // Parser de CSS digitado pelo usuário para objeto de estilo inline React
  const parsedUserStyles = useMemo<React.CSSProperties>(() => {
    const styleObj: Record<string, string> = {};
    if (!userCode.trim()) return styleObj;

    const declarations = userCode.split(";");
    for (const decl of declarations) {
      const parts = decl.split(":");
      if (parts.length === 2) {
        const prop = parts[0].trim().toLowerCase();
        const val = parts[1].trim();
        if (prop && val) {
          // Converte kebab-case para camelCase (ex: justify-content -> justifyContent)
          const camelCaseProp = prop.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
          styleObj[camelCaseProp] = val;
        }
      }
    }
    return styleObj as React.CSSProperties;
  }, [userCode]);

  // Validação geométrica de colisão entre drones e portais alvos
  const verifyAlignment = useCallback(() => {
    if (!droneRefs.current.length || !targetRefs.current.length) return false;

    let allMatched = true;
    const tolerancePx = 15; // Margem de tolerância geométrica em pixels

    for (let i = 0; i < level.drones.length; i++) {
      const droneEl = droneRefs.current[i];
      const targetEl = targetRefs.current[i];

      if (!droneEl || !targetEl) {
        allMatched = false;
        break;
      }

      const droneRect = droneEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const droneCenterX = droneRect.left + droneRect.width / 2;
      const droneCenterY = droneRect.top + droneRect.height / 2;

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const diffX = Math.abs(droneCenterX - targetCenterX);
      const diffY = Math.abs(droneCenterY - targetCenterY);

      if (diffX > tolerancePx || diffY > tolerancePx) {
        allMatched = false;
        break;
      }
    }

    return allMatched;
  }, [level.drones.length]);

  // Checagem contínua após atualização do layout
  useEffect(() => {
    const timer = setTimeout(() => {
      const passed = verifyAlignment();
      if (passed && !isLevelSolved) {
        setIsLevelSolved(true);
        setShowConfetti(true);

        try {
          sfx.playSuccessChime();
        } catch {
          // noop
        }

        // Persistir progresso
        setCompletedLevels((prev) => {
          if (!prev.includes(level.id)) {
            const updated = [...prev, level.id];
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch {
              // noop
            }
            return updated;
          }
          return prev;
        });
      }
    }, 450); // Aguarda a transição suave de CSS terminar

    return () => clearTimeout(timer);
  }, [parsedUserStyles, verifyAlignment, isLevelSolved, level.id]);

  const handleNextLevel = () => {
    if (currentLevelIndex < CSS_ARENA_LEVELS.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    }
  };

  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setUserCode(level.startingCode);
    setShowSolution(false);
    setIsLevelSolved(false);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
    setUserCode(level.solution);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header com Progresso & Navegação de Fases */}
      <div className="bg-surface/50 border border-surface-border rounded-2xl p-5 backdrop-blur-md shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-accent-500 p-0.5 shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
              <Palette className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                CSS Flex & Grid Arena
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase font-bold">
                {level.category.toUpperCase()}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-card border border-surface-border text-slate-300">
                {level.difficulty}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Fase {level.id} de {CSS_ARENA_LEVELS.length} • Domine alinhamentos e layouts na prática
            </p>
          </div>
        </div>

        {/* Controles de Navegação de Fases */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLevel}
            disabled={currentLevelIndex === 0}
            className="p-2 rounded-xl border border-surface-border hover:border-slate-500 disabled:opacity-40 disabled:hover:border-surface-border text-slate-300 hover:text-white transition-colors"
            title="Fase Anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Seletor dropdown de níveis */}
          <select
            value={currentLevelIndex}
            onChange={(e) => setCurrentLevelIndex(Number(e.target.value))}
            className="px-3 py-2 rounded-xl bg-surface border border-surface-border text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {CSS_ARENA_LEVELS.map((lvl, idx) => (
              <option key={lvl.id} value={idx}>
                {completedLevels.includes(lvl.id) ? "✓ " : ""}
                Fase {lvl.id}: {lvl.title} ({lvl.category})
              </option>
            ))}
          </select>

          <button
            onClick={handleNextLevel}
            disabled={currentLevelIndex === CSS_ARENA_LEVELS.length - 1}
            className="p-2 rounded-xl border border-surface-border hover:border-slate-500 disabled:opacity-40 disabled:hover:border-surface-border text-slate-300 hover:text-white transition-colors"
            title="Próxima Fase"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid Principal: Editor de Código à Esquerda, Arena à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LADO ESQUERDO: Missão, Editor CSS e Dicas (5 Colunas) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card de Missão */}
          <div className="p-5 rounded-2xl bg-surface/60 border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                Missão Tática
              </span>
              <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                +50 XP
              </span>
            </div>

            <h2 className="text-sm font-bold text-white leading-snug">{level.mission}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{level.instructions}</p>

            {/* Dica Teórica Expansível */}
            <div className="pt-2 border-t border-surface-border/50">
              <button
                onClick={() => setShowTip(!showTip)}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showTip ? "Ocultar Guia Teórico" : "Ver Guia Teórico (CheatSheet)"}</span>
              </button>

              {showTip && (
                <div className="mt-2.5 p-3 rounded-xl bg-[#080B12] border border-amber-500/30 text-xs font-mono space-y-1.5 animate-fade-in">
                  <div className="text-[11px] text-amber-300 font-bold mb-1">Propriedades recomendadas:</div>
                  {level.cheatsheet.map((item, i) => (
                    <div key={i} className="text-slate-300">
                      <code className="text-cyan-300 bg-cyan-950/40 px-1 py-0.5 rounded mr-1">
                        {item.prop}
                      </code>
                      - <span className="text-slate-400 text-[11px]">{item.desc}</span>
                    </div>
                  ))}
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-surface-border/50 italic">
                    💡 {level.tip}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Editor de Código CSS */}
          <div className="rounded-2xl border border-surface-border bg-[#070A11] overflow-hidden shadow-xl flex flex-col font-mono">
            <div className="p-3 bg-surface/50 border-b border-surface-border flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-1 text-[11px] text-slate-300">space-station.css</span>
              </div>
              <span className="text-[10px] text-cyan-400">Live Preview</span>
            </div>

            {/* Código Estático Prefixo */}
            <div className="px-4 pt-3 pb-1 text-xs text-slate-500 select-none">
              <span className="text-purple-400">#space-station</span> &#123;
              <br />
              <span className="pl-4 text-slate-400">display:</span>{" "}
              <span className="text-cyan-400">{level.category}</span>;
            </div>

            {/* Área Editável do Usuário */}
            <div className="relative px-4 py-1">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={4}
                spellCheck={false}
                placeholder="Digite as propriedades CSS..."
                className="w-full pl-4 bg-transparent border-l-2 border-cyan-500 text-xs font-mono text-cyan-300 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            {/* Código Estático Sufixo */}
            <div className="px-4 pt-1 pb-3 text-xs text-slate-500 select-none">&#125;</div>

            {/* Barra de Ações do Editor */}
            <div className="p-3 bg-surface/30 border-t border-surface-border flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 rounded-lg border border-surface-border text-[11px] text-slate-400 hover:text-white hover:bg-surface transition-colors flex items-center gap-1"
                  title="Restaurar código inicial"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleShowSolution}
                  className="px-2.5 py-1 rounded-lg border border-surface-border text-[11px] text-slate-400 hover:text-amber-300 hover:bg-surface transition-colors flex items-center gap-1"
                  title="Revelar solução"
                >
                  <Eye className="w-3 h-3" />
                  <span>Solução</span>
                </button>
              </div>

              {isLevelSolved && (
                <button
                  onClick={handleNextLevel}
                  disabled={currentLevelIndex === CSS_ARENA_LEVELS.length - 1}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-bold text-white shadow-glow flex items-center gap-1.5 animate-pulse"
                >
                  <span>Próximo Nível</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* LADO DIREITO: A Arena Visual Espacial (7 Colunas) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="p-3 bg-surface/40 border border-surface-border rounded-xl flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Simulador Orbital em Tempo Real</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full border border-dashed border-cyan-400 bg-cyan-400/20" />
                Portais Alvo
              </span>
              <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm" />
                Drones Vivos
              </span>
            </div>
          </div>

          {/* O Campo de Simulação (Board) */}
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#060910] border border-surface-border overflow-hidden p-6 shadow-2xl flex flex-col justify-center">
            {/* Grade de Fundo Sci-Fi */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* CAMADA 1: Portais Alvos (Estacionários com a Solução) */}
            <div
              className="absolute inset-6 pointer-events-none transition-all duration-300"
              style={{
                ...level.containerFixedStyle,
                ...level.targetContainerStyle,
              }}
            >
              {level.targets.map((target, idx) => (
                <div
                  key={`target-${target.id}`}
                  ref={(el) => {
                    targetRefs.current[idx] = el;
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-1 transition-all animate-pulse"
                  style={{
                    borderColor: target.color,
                    backgroundColor: `${target.color}15`,
                    boxShadow: `0 0 20px -3px ${target.color}30`,
                    ...target.style,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full mb-1"
                    style={{ backgroundColor: target.color }}
                  />
                  <span
                    className="text-[9px] font-mono font-bold uppercase tracking-wider text-center"
                    style={{ color: target.color }}
                  >
                    {target.label || `Alvo ${target.id}`}
                  </span>
                </div>
              ))}
            </div>

            {/* CAMADA 2: Drones Móveis Controlados pelo Usuário */}
            <div
              className="absolute inset-6 pointer-events-none transition-all duration-500 ease-out"
              style={{
                ...level.containerFixedStyle,
                ...parsedUserStyles,
              }}
            >
              {level.drones.map((drone, idx) => (
                <div
                  key={`drone-${drone.id}`}
                  ref={(el) => {
                    droneRefs.current[idx] = el;
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center p-2 text-white shadow-lg transition-all duration-500 cursor-default"
                  style={{
                    backgroundColor: drone.color,
                    boxShadow: `0 0 25px -2px ${drone.color}70`,
                    transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    ...drone.style,
                  }}
                >
                  <Bot className="w-6 h-6 sm:w-7 sm:h-7 animate-bounce drop-shadow" />
                  <span className="text-[9px] font-mono font-bold mt-0.5 truncate max-w-[90%]">
                    {drone.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Banner de Vitória Sobreposto com Confetes */}
            {isLevelSolved && (
              <div className="absolute inset-x-6 bottom-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl animate-fade-in z-20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Alinhamento Estelar Perfeito!
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </h3>
                    <p className="text-xs text-emerald-300 font-mono">
                      Todos os drones pousaram nos portais correspondentes. (+50 XP)
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextLevel}
                  disabled={currentLevelIndex === CSS_ARENA_LEVELS.length - 1}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-xs font-bold text-black transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Avançar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Barra de Progresso Geral das Fases */}
          <div className="p-4 rounded-xl bg-surface/30 border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono text-slate-300">
                Progresso: {completedLevels.length} de {CSS_ARENA_LEVELS.length} fases concluídas (
                {Math.round((completedLevels.length / CSS_ARENA_LEVELS.length) * 100)}%)
              </span>
            </div>

            {/* Indicadores de bolinhas de cada fase */}
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {CSS_ARENA_LEVELS.map((lvl, idx) => {
                const isCurrent = currentLevelIndex === idx;
                const isDone = completedLevels.includes(lvl.id);
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setCurrentLevelIndex(idx)}
                    className={`w-5 h-5 rounded-full text-[10px] font-mono flex items-center justify-center transition-all ${
                      isCurrent
                        ? "bg-cyan-500 text-black font-bold ring-2 ring-cyan-400 shadow-glow"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-surface text-slate-500 border border-surface-border hover:border-slate-400"
                    }`}
                    title={`Fase ${lvl.id}: ${lvl.title}`}
                  >
                    {lvl.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
