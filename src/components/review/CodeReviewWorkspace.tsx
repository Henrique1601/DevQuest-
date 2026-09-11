"use client";

import React, { useState, useMemo } from "react";
import {
  GitPullRequest,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  Code2,
  FileCode2,
  Cpu,
  RefreshCw,
  GitCompare,
  Terminal,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  analyzeCodeForReview,
  REVIEW_PRESETS,
  CodeReviewResult,
  InlineComment
} from "@/lib/ai/codeReview";

interface CodeReviewWorkspaceProps {
  initialCode?: string;
  initialLanguage?: string;
}

export function CodeReviewWorkspace({
  initialCode,
  initialLanguage = "typescript"
}: CodeReviewWorkspaceProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("sql-injection");
  const [customCode, setCustomCode] = useState<string>(
    initialCode || REVIEW_PRESETS[0].code
  );
  const [activeTab, setActiveTab] = useState<"review" | "diff" | "editor">("review");
  const [copied, setCopied] = useState(false);

  // Análise calculada
  const reviewResult: CodeReviewResult = useMemo(() => {
    return analyzeCodeForReview(customCode, initialLanguage);
  }, [customCode, initialLanguage]);

  const lines = useMemo(() => customCode.split("\n"), [customCode]);
  const refactoredLines = useMemo(() => reviewResult.refactoredCode.split("\n"), [reviewResult.refactoredCode]);

  // Mapa de comentários por número de linha
  const commentsByLine = useMemo(() => {
    const map = new Map<number, InlineComment[]>();
    reviewResult.comments.forEach((c) => {
      const existing = map.get(c.lineNumber) || [];
      existing.push(c);
      map.set(c.lineNumber, existing);
    });
    return map;
  }, [reviewResult.comments]);

  const handleSelectPreset = (presetId: string) => {
    const preset = REVIEW_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSelectedPresetId(presetId);
      setCustomCode(preset.code);
    }
  };

  const handleCopyRefactored = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(reviewResult.refactoredCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getVerdictBadge = () => {
    switch (reviewResult.verdict) {
      case "CHANGES_REQUESTED":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Changes Requested (Correções Obrigatórias)</span>
          </div>
        );
      case "COMMENT":
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Review com Observações (Comment)</span>
          </div>
        );
      case "APPROVED":
      default:
        return (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Approved (Pronto para Merge)</span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header com Ícone e Presets */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface/80 border border-surface-border rounded-3xl p-6 shadow-xl backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30">
              <GitPullRequest className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>Code Review IA (Estilo Pull Request)</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRO REVIEW
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Análise estática profunda: OWASP Top 10, Clean Code, complexidade Big-O e memory leaks com feedback inline.
          </p>
        </div>

        {/* Presets Rápidos */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-500">Cenários:</span>
          {REVIEW_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                selectedPresetId === p.id
                  ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-glow font-bold"
                  : "bg-[#060912] border-surface-border text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              {p.title.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Banner de Status do PR & Métricas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Veredito Principal */}
        <div className="lg:col-span-2 bg-gradient-to-r from-surface via-[#0E1526] to-surface border border-surface-border rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Status do Pull Request</span>
            {getVerdictBadge()}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">{reviewResult.summary}</p>
          <div className="flex items-center gap-2 pt-2 border-t border-surface-border/60 text-[11px] font-mono text-slate-400">
            <span>Revisor:</span>
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> DevBot PR Inspector
            </span>
          </div>
        </div>

        {/* Score de Qualidade */}
        <div className="bg-surface/80 border border-surface-border rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-400">Score de Qualidade</span>
            <span className="text-[11px] font-mono text-cyan-400">0 - 100</span>
          </div>
          <div className="flex items-baseline gap-2 my-1">
            <span className={`text-4xl font-black ${
              reviewResult.score >= 80 ? "text-emerald-400" : reviewResult.score >= 60 ? "text-amber-400" : "text-rose-400"
            }`}>
              {reviewResult.score}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 100 pts</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                reviewResult.score >= 80 ? "bg-emerald-400" : reviewResult.score >= 60 ? "bg-amber-400" : "bg-rose-500"
              }`}
              style={{ width: `${reviewResult.score}%` }}
            />
          </div>
        </div>

        {/* Pilares de Avaliação */}
        <div className="bg-surface/80 border border-surface-border rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Segurança (OWASP)
            </span>
            <span className="font-bold text-white">{reviewResult.metrics.securityScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-400" /> Manutenibilidade
            </span>
            <span className="font-bold text-white">{reviewResult.metrics.maintainabilityScore}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" /> Desempenho
            </span>
            <span className="font-bold text-white">{reviewResult.metrics.performanceScore}%</span>
          </div>
        </div>
      </div>

      {/* Barra de Ferramentas / Navegação das Abas */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("review")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "review"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-glow"
                : "text-slate-400 hover:text-white hover:bg-surface-hover"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Pull Request Inline ({reviewResult.comments.length} notas)</span>
          </button>

          <button
            onClick={() => setActiveTab("diff")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "diff"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-glow"
                : "text-slate-400 hover:text-white hover:bg-surface-hover"
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Split Diff (Git Diff)</span>
          </button>

          <button
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === "editor"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-glow"
                : "text-slate-400 hover:text-white hover:bg-surface-hover"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Editar Código Fonte</span>
          </button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopyRefactored}
          className="font-mono text-xs gap-1.5"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "Refatoração Copiada!" : "Copiar Código Corrigido"}</span>
        </Button>
      </div>

      {/* Conteúdo da Aba Ativa */}
      {activeTab === "review" && (
        <div className="bg-[#070A12] border border-surface-border rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
          <div className="px-4 py-2.5 bg-[#0D1220] border-b border-surface-border flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-cyan-400" />
              <span>src/handlers/checkoutService.ts</span>
            </div>
            <span className="text-[10px] text-slate-500">{lines.length} linhas de código</span>
          </div>

          <div className="divide-y divide-surface-border/40 overflow-x-auto">
            {lines.map((lineContent, idx) => {
              const lineNum = idx + 1;
              const lineComments = commentsByLine.get(lineNum) || [];
              const hasComment = lineComments.length > 0;

              return (
                <div key={lineNum} className={hasComment ? "bg-rose-500/5" : ""}>
                  {/* Linha de Código */}
                  <div className="flex items-stretch hover:bg-white/5 py-1 px-3 group">
                    <span className="w-12 shrink-0 select-none text-right pr-4 text-slate-600 group-hover:text-slate-400">
                      {lineNum}
                    </span>
                    <pre className="text-slate-200 whitespace-pre overflow-x-auto font-mono">
                      {lineContent || " "}
                    </pre>
                  </div>

                  {/* Card de Comentário Inline de Pull Request */}
                  {lineComments.map((c) => (
                    <div
                      key={c.id}
                      className="mx-4 my-3 p-4 rounded-xl bg-[#0F1629] border border-surface-border shadow-xl space-y-3 font-sans"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
                            🤖
                          </div>
                          <span className="text-xs font-bold text-white">DevBot PR Inspector</span>
                          <span className="text-[10px] font-mono text-slate-500">comentou na linha {lineNum}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold ${
                              c.severity === "critical"
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                                : c.severity === "warning"
                                ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {c.severity}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-200">{c.title}</div>
                        <p className="text-xs text-slate-300 leading-relaxed">{c.comment}</p>
                      </div>

                      {c.suggestedReplacement && (
                        <div className="space-y-1.5 pt-2 border-t border-surface-border/60">
                          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Sugestão de Substituição:
                          </span>
                          <pre className="p-2.5 rounded-lg bg-[#070A12] border border-emerald-500/30 text-emerald-300 text-xs font-mono overflow-x-auto whitespace-pre">
                            {c.suggestedReplacement}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Aba Split Diff */}
      {activeTab === "diff" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* Coluna Código Original */}
          <div className="bg-[#070A12] border border-rose-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-rose-950/40 border-b border-rose-500/30 text-rose-300 font-bold flex items-center justify-between">
              <span>- Código Original (Com apontamentos)</span>
              <span className="text-[10px]">{lines.length} linhas</span>
            </div>
            <div className="p-4 space-y-1 overflow-x-auto">
              {lines.map((l, i) => (
                <div key={i} className="flex gap-3 text-slate-300">
                  <span className="w-8 shrink-0 text-slate-600 text-right select-none">{i + 1}</span>
                  <pre className="whitespace-pre">{l || " "}</pre>
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Código Refatorado */}
          <div className="bg-[#070A12] border border-emerald-500/30 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-4 py-2.5 bg-emerald-950/40 border-b border-emerald-500/30 text-emerald-300 font-bold flex items-center justify-between">
              <span>+ Código Sugerido (Refatorado & Seguro)</span>
              <span className="text-[10px]">{refactoredLines.length} linhas</span>
            </div>
            <div className="p-4 space-y-1 overflow-x-auto bg-emerald-500/5">
              {refactoredLines.map((l, i) => (
                <div key={i} className="flex gap-3 text-emerald-200">
                  <span className="w-8 shrink-0 text-emerald-600 text-right select-none">{i + 1}</span>
                  <pre className="whitespace-pre">{l || " "}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Aba Editor Customizado */}
      {activeTab === "editor" && (
        <div className="bg-[#070A12] border border-surface-border rounded-2xl p-5 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono text-slate-300 font-bold">
              Cole qualquer trecho de código para análise instantânea:
            </label>
            <span className="text-[10px] font-mono text-slate-500">TypeScript / JavaScript</span>
          </div>
          <textarea
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            rows={14}
            className="w-full bg-[#05070E] border border-surface-border rounded-xl p-4 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Cole seu código aqui..."
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => setActiveTab("review")}
              className="font-mono text-xs gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Atualizar Análise do Pull Request</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}