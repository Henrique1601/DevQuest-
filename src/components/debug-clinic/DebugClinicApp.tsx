"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Copy,
  Check,
  Code2,
  Bug,
  Stethoscope,
  ChevronDown,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockDebugIssues, DebugIssue } from "@/lib/data/debugClinic";

export function DebugClinicApp() {
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(mockDebugIssues[0].id);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredIssues = mockDebugIssues.filter((issue) => {
    const isTechMatch = selectedTech === "all" || issue.technology === selectedTech;
    const q = searchQuery.toLowerCase().trim();
    const isSearchMatch =
      !q ||
      issue.title.toLowerCase().includes(q) ||
      issue.errorMessage.toLowerCase().includes(q) ||
      issue.diagnosis.toLowerCase().includes(q);

    return isTechMatch && isSearchMatch;
  });

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Stethoscope className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-rose-400">
              Estilo Stack Overflow & Debug
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Debug Clinic: Diagnóstico de Erros Clássicos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Encontre a causa raiz e a solução passo a passo para os erros mais comuns do JavaScript, React, Node, TypeScript e Git.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border font-mono text-xs text-slate-400">
          <Bug className="w-4 h-4 text-rose-400" />
          <span>{mockDebugIssues.length} Casos Catalogados</span>
        </div>
      </div>

      {/* Busca e Filtros */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cole a mensagem de erro ou termo (ex: Cannot read properties of undefined, CORS, unique key)..."
            className="w-full bg-surface text-slate-200 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-surface-border focus:outline-none focus:border-rose-500 font-mono placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {["all", "React", "JavaScript", "TypeScript", "Node.js", "Git"].map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                selectedTech === tech
                  ? "bg-rose-500 text-white font-bold shadow-lg shadow-rose-500/20"
                  : "bg-surface border border-surface-border text-slate-400 hover:text-white"
              }`}
            >
              {tech === "all" ? "Todas as Tecnologias" : tech}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Erros e Diagnósticos */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16 bg-surface/40 rounded-3xl border border-surface-border space-y-3">
            <Layers className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-slate-400 text-sm">Nenhum caso de erro encontrado para os filtros atuais.</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedTech("all");
              }}
            >
              Limpar busca
            </Button>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const isExpanded = expandedId === issue.id;

            return (
              <div
                key={issue.id}
                className={`bg-surface/80 border rounded-3xl transition-all shadow-xl overflow-hidden ${
                  isExpanded ? "border-rose-500/50 shadow-rose-500/10" : "border-surface-border hover:border-slate-600"
                }`}
              >
                {/* Header Clicável */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                  className="p-5 flex items-center justify-between cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 font-bold uppercase">
                        {issue.technology}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                        {issue.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1">{issue.symptom}</p>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-2 ${
                      isExpanded ? "rotate-180 text-rose-400" : ""
                    }`}
                  />
                </div>

                {/* Conteúdo Expandido */}
                {isExpanded && (
                  <div className="px-5 pb-6 space-y-6 border-t border-surface-border/60 pt-5 animate-fade-in">
                    {/* Banner do Erro Real no Console */}
                    <div className="bg-[#05070E] border border-rose-500/40 rounded-2xl p-4 font-mono text-xs space-y-2 relative">
                      <div className="flex items-center justify-between text-[11px] text-rose-400 font-bold uppercase">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Mensagem de Erro no Console
                        </span>
                        <button
                          onClick={() => handleCopy(issue.errorMessage, issue.id)}
                          className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                        >
                          {copiedId === issue.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[10px]">Copiar</span>
                        </button>
                      </div>
                      <p className="text-rose-300 font-semibold break-all">{issue.errorMessage}</p>
                    </div>

                    {/* Sintoma & Diagnóstico */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-[#070A10] border border-surface-border space-y-1">
                        <div className="font-bold text-amber-400 uppercase font-mono text-[10px]">
                          ⚠️ O Sintoma Visível
                        </div>
                        <p className="text-slate-300 leading-relaxed">{issue.symptom}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#070A10] border border-surface-border space-y-1">
                        <div className="font-bold text-cyan-400 uppercase font-mono text-[10px]">
                          🔍 Diagnóstico Técnico (Por que acontece?)
                        </div>
                        <p className="text-slate-300 leading-relaxed">{issue.diagnosis}</p>
                      </div>
                    </div>

                    {/* Comparador Visual Lado a Lado: Código Quebrado vs Corrigido */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                        <Code2 className="w-4 h-4 text-primary-400" />
                        <span>Comparativo Antes vs Depois:</span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Código Quebrado */}
                        <div className="bg-[#05070E] border border-rose-500/30 rounded-2xl p-4 font-mono text-xs flex flex-col justify-between">
                          <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-2 pb-2 border-b border-rose-500/20">
                            <XCircle className="w-4 h-4" />
                            <span>Código com Bug (Incorreto)</span>
                          </div>
                          <pre className="text-rose-200/90 overflow-x-auto leading-relaxed flex-1">
                            {issue.brokenCode}
                          </pre>
                        </div>

                        {/* Código Corrigido */}
                        <div className="bg-[#05070E] border border-emerald-500/30 rounded-2xl p-4 font-mono text-xs flex flex-col justify-between">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-2 pb-2 border-b border-emerald-500/20">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Código Corrigido (Recomendado)</span>
                          </div>
                          <pre className="text-emerald-200/90 overflow-x-auto leading-relaxed flex-1">
                            {issue.fixedCode}
                          </pre>
                        </div>
                      </div>
                    </div>

                    {/* Dica de Ouro / Best Practice */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-300 font-mono">Dica de Prevenção: </span>
                        <span className="text-slate-300 leading-relaxed">{issue.bestPracticeTip}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
