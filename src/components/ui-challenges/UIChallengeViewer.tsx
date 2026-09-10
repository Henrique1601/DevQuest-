"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Palette,
  Eye,
  Columns,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Sliders,
  Layers,
  Code2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { mockUIChallenges, UIChallenge } from "@/lib/data/uiChallenges";

export function UIChallengeViewer() {
  const [selectedChallenge, setSelectedChallenge] = useState<UIChallenge>(mockUIChallenges[0]);
  const [html, setHtml] = useState<string>(mockUIChallenges[0].starterHtml);
  const [css, setCss] = useState<string>(mockUIChallenges[0].starterCss);
  const [activeEditorTab, setActiveEditorTab] = useState<"html" | "css">("css");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 a 100%
  const [viewMode, setViewMode] = useState<"split" | "user" | "target">("split");

  const handleSelectChallenge = (c: UIChallenge) => {
    setSelectedChallenge(c);
    setHtml(c.starterHtml);
    setCss(c.starterCss);
    setSliderPosition(50);
  };

  // Documento HTML gerado para o código do usuário
  const userIframeDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${css}</style>
</head>
<body>${html}</body>
</html>`;
  }, [html, css]);

  // Documento HTML gerado para o código alvo (gabarito)
  const targetIframeDoc = useMemo(() => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${selectedChallenge.targetCss}</style>
</head>
<body>${selectedChallenge.targetHtml}</body>
</html>`;
  }, [selectedChallenge]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Palette className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-pink-400">
              Frontend Mentor Style
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
              Pixel-Perfect Slider
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Desafios de UI/UX & Design Precision
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Recrie interfaces reais em HTML e CSS e compare a precisão dos seus pixels com o design original usando a barra deslizante.
          </p>
        </div>

        {/* Seletor de Desafio */}
        <div className="flex items-center gap-2">
          {mockUIChallenges.map((c) => (
            <Button
              key={c.id}
              variant={c.id === selectedChallenge.id ? "primary" : "secondary"}
              size="sm"
              onClick={() => handleSelectChallenge(c)}
              className="font-mono text-xs"
            >
              {c.title.split(" ")[0]} ({c.difficulty})
            </Button>
          ))}
        </div>
      </div>

      {/* Grid Principal: Editor de Código vs Comparador Visual */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Coluna Esquerda: Editor de Código HTML/CSS */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-surface/80 border border-surface-border rounded-3xl p-5 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">{selectedChallenge.title}</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedChallenge.category}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedChallenge.description}
            </p>

            {/* Checklist de Requisitos */}
            <div className="space-y-1.5 pt-2 border-t border-surface-border">
              <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                Requisitos de Design:
              </div>
              {selectedChallenge.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Editor com Abas HTML / CSS */}
          <div className="bg-[#05070E] border border-surface-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-[#0A0E1A] px-4 py-2 border-b border-surface-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveEditorTab("css")}
                  className={`py-1 px-3 rounded-lg transition-colors font-bold ${
                    activeEditorTab === "css"
                      ? "bg-primary-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  styles.css
                </button>
                <button
                  onClick={() => setActiveEditorTab("html")}
                  className={`py-1 px-3 rounded-lg transition-colors font-bold ${
                    activeEditorTab === "html"
                      ? "bg-primary-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  index.html
                </button>
              </div>

              <button
                onClick={() => {
                  setHtml(selectedChallenge.starterHtml);
                  setCss(selectedChallenge.starterCss);
                }}
                className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                title="Restaurar código inicial"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Resetar</span>
              </button>
            </div>

            <div className="p-4">
              {activeEditorTab === "css" ? (
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-80 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                  placeholder="/* Digite suas regras de CSS aqui */"
                  spellCheck={false}
                />
              ) : (
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-80 bg-transparent text-slate-200 font-mono text-xs sm:text-sm focus:outline-none resize-none leading-relaxed"
                  placeholder="<!-- Digite sua estrutura HTML aqui -->"
                  spellCheck={false}
                />
              )}
            </div>
          </div>
        </div>

        {/* Coluna Direita: Comparador Visual Slider */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#090D18] border border-surface-border rounded-3xl p-4 flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">Comparador Visual</span>
            </div>

            <div className="flex items-center gap-1 bg-[#05070E] p-1 rounded-xl border border-surface-border">
              <button
                onClick={() => setViewMode("split")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  viewMode === "split" ? "bg-cyan-500 text-white shadow-glow" : "text-slate-400"
                }`}
              >
                Slider Dividido
              </button>
              <button
                onClick={() => setViewMode("user")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  viewMode === "user" ? "bg-primary-500 text-white shadow-glow" : "text-slate-400"
                }`}
              >
                Meu Código
              </button>
              <button
                onClick={() => setViewMode("target")}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  viewMode === "target" ? "bg-purple-500 text-white shadow-glow" : "text-slate-400"
                }`}
              >
                Design Alvo
              </button>
            </div>
          </div>

          {/* Área do Comparador / Preview */}
          <div className="relative w-full h-[450px] bg-[#05070E] border-2 border-surface-border rounded-3xl overflow-hidden shadow-2xl">
            {/* Camada 1: Design Alvo (Gabarito / Fundo) */}
            {(viewMode === "split" || viewMode === "target") && (
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full bg-purple-500/80 text-white font-mono text-[10px] font-bold backdrop-blur-md">
                  Design Alvo (100% Preciso)
                </div>
                <iframe
                  title="Target Design Preview"
                  srcDoc={targetIframeDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Camada 2: Código do Usuário (Sobreposição com largura do slider) */}
            {(viewMode === "split" || viewMode === "user") && (
              <div
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-cyan-400 z-10 transition-all"
                style={{
                  width: viewMode === "user" ? "100%" : `${sliderPosition}%`
                }}
              >
                <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-cyan-500/80 text-white font-mono text-[10px] font-bold backdrop-blur-md">
                  Seu Código ao Vivo
                </div>
                <iframe
                  title="User Code Preview"
                  srcDoc={userIframeDoc}
                  className="w-[600px] sm:w-[700px] h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Controle Deslizante Flutuante */}
            {viewMode === "split" && (
              <div className="absolute bottom-4 left-4 right-4 z-30 bg-[#070B16]/90 border border-surface-border backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-3">
                <span className="text-[11px] font-mono text-cyan-400 font-bold whitespace-nowrap">
                  Deslizar: {sliderPosition}%
                </span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
