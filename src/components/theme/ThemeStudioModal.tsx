"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Palette,
  X,
  Check,
  Sparkles,
  Zap,
  Code2,
  Terminal,
  RotateCcw,
  Sliders
} from "lucide-react";
import { useThemeStudio } from "@/lib/theme/ThemeContext";
import { PlatformTheme, PlatformThemeId } from "@/lib/theme/platformThemes";

export function ThemeStudioModal() {
  const {
    currentTheme,
    currentThemeId,
    setTheme,
    themes,
    isStudioOpen,
    closeThemeStudio,
  } = useThemeStudio();

  const [hoveredTheme, setHoveredTheme] = useState<PlatformTheme | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fechar no Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isStudioOpen) {
        closeThemeStudio();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isStudioOpen, closeThemeStudio]);

  // Prevenir scroll de fundo quando modal aberto
  useEffect(() => {
    if (isStudioOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isStudioOpen]);

  if (!isStudioOpen || !mounted) return null;

  const displayTheme = hoveredTheme || currentTheme;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeThemeStudio}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-studio-title"
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0E1A]/95 border border-surface-border rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl z-10"
      >
        {/* Header */}
        <div className="p-6 border-b border-surface-border flex items-center justify-between bg-surface/40">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl p-0.5 shadow-glow flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${displayTheme.colors.primary}, ${displayTheme.colors.accent})`,
              }}
            >
              <div className="w-full h-full bg-[#080B11] rounded-[10px] flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="theme-studio-title" className="text-lg font-bold text-white tracking-tight">
                  Theme Studio
                </h2>
                <span
                  className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold"
                  style={{
                    backgroundColor: `${displayTheme.colors.primary}20`,
                    borderColor: `${displayTheme.colors.primary}40`,
                    color: displayTheme.colors.primary400,
                  }}
                >
                  Dark Neon
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Personalize a paleta cyberpunk do DevQuest Pro e sincronize com o CodeMirror.
              </p>
            </div>
          </div>

          <button
            onClick={closeThemeStudio}
            className="p-2 rounded-xl border border-surface-border hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
            title="Fechar (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Seletor em Grade dos 6 Temas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {themes.map((theme) => {
              const isActive = currentThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.id)}
                  onMouseEnter={() => setHoveredTheme(theme)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  className={`relative p-4 rounded-xl border text-left transition-all group flex flex-col justify-between ${
                    isActive
                      ? "border-cyan-400/80 bg-surface/90 shadow-lg"
                      : "border-surface-border hover:border-slate-500 bg-[#0B1120]/60 hover:bg-surface/50"
                  }`}
                  style={{
                    borderColor: isActive ? theme.colors.primary : undefined,
                    boxShadow: isActive ? theme.colors.glowPrimary : undefined,
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-white group-hover:text-slate-100">
                          {theme.name}
                        </span>
                        {isActive && (
                          <span
                            className="p-0.5 rounded-full text-white"
                            style={{ backgroundColor: theme.colors.primary }}
                          >
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {theme.tagline}
                      </span>
                    </div>

                    <span
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${theme.colors.accent}15`,
                        color: theme.colors.accent400,
                        borderColor: `${theme.colors.accent}30`,
                      }}
                    >
                      {theme.badge}
                    </span>
                  </div>

                  {/* Amostras de Cores */}
                  <div className="flex items-center justify-between pt-2 border-t border-surface-border/50">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.primary }}
                        title={`Primária: ${theme.colors.primary}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.accent }}
                        title={`Acento: ${theme.colors.accent}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.background }}
                        title={`Fundo: ${theme.colors.background}`}
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: theme.colors.surface }}
                        title={`Superfície: ${theme.colors.surface}`}
                      />
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      Editor: {theme.editorTheme}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Painel de Pré-visualização Dinâmica */}
          <div className="rounded-xl border border-surface-border bg-[#080B12] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Pré-visualização Interativa ({displayTheme.name})</span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {hoveredTheme ? "Passe o cursor para testar" : "Tema Selecionado"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card de Componentes UI */}
              <div className="p-4 rounded-xl border border-surface-border bg-surface/50 space-y-3">
                <div className="text-xs font-semibold text-slate-300">Botões & Badges Neon</div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-white transition-all shadow-md flex items-center gap-1.5"
                    style={{
                      backgroundColor: displayTheme.colors.primary,
                      boxShadow: displayTheme.colors.glowPrimary,
                    }}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    Primário CTA
                  </button>

                  <button
                    className="px-3 py-1.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-1.5"
                    style={{
                      borderColor: `${displayTheme.colors.accent}60`,
                      backgroundColor: `${displayTheme.colors.accent}15`,
                      color: displayTheme.colors.accent400,
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Secundário
                  </button>

                  <span
                    className="text-[10px] font-mono px-2 py-1 rounded-full border font-bold"
                    style={{
                      backgroundColor: `${displayTheme.colors.primary}15`,
                      color: displayTheme.colors.primary400,
                      borderColor: `${displayTheme.colors.primary}30`,
                    }}
                  >
                    +50 XP
                  </span>
                </div>
              </div>

              {/* Card de Sintaxe CodeMirror */}
              <div className="p-4 rounded-xl border border-surface-border bg-[#050810] font-mono text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-surface-border/50 pb-1 mb-2">
                  <div className="flex items-center gap-1">
                    <Code2 className="w-3 h-3" />
                    <span>demo-algorithm.js</span>
                  </div>
                  <span style={{ color: displayTheme.colors.primary400 }}>
                    {displayTheme.editorTheme}
                  </span>
                </div>
                <div>
                  <span style={{ color: displayTheme.colors.accent400 }}>function</span>{" "}
                  <span style={{ color: displayTheme.colors.primary400 }}>solveChallenge</span>
                  (data) &#123;
                </div>
                <div className="pl-4">
                  <span style={{ color: displayTheme.colors.accent400 }}>const</span> matrix = data.
                  <span style={{ color: displayTheme.colors.primary400 }}>map</span>(x =&gt; x * 2);
                </div>
                <div className="pl-4">
                  <span style={{ color: displayTheme.colors.accent400 }}>return</span> matrix;
                </div>
                <div>&#125;</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="p-4 border-t border-surface-border bg-surface/40 flex items-center justify-between">
          <button
            onClick={() => setTheme("tokyo-night")}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-surface transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão (Tokyo Night)</span>
          </button>

          <button
            onClick={closeThemeStudio}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md"
            style={{
              backgroundColor: currentTheme.colors.primary,
              boxShadow: currentTheme.colors.glowPrimary,
            }}
          >
            Concluir & Aplicar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
