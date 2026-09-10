"use client";

import React, { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  Search,
  BookOpen,
  Filter,
  Sparkles,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { mockSnippets, Snippet } from "@/lib/data/snippets";
import Link from "next/link";

export function SnippetVault() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedUsage, setExpandedUsage] = useState<Record<string, boolean>>({});

  const categories = ["all", "Hooks", "Utils", "Database", "Validations", "Performance"];

  const filteredSnippets = mockSnippets.filter((snippet) => {
    const isCatMatch = selectedCategory === "all" || snippet.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const isSearchMatch =
      !q ||
      snippet.title.toLowerCase().includes(q) ||
      snippet.description.toLowerCase().includes(q) ||
      snippet.tags.some((t) => t.toLowerCase().includes(q)) ||
      snippet.code.toLowerCase().includes(q);

    return isCatMatch && isSearchMatch;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  const toggleUsage = (id: string) => {
    setExpandedUsage((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Code2 className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-emerald-400">
              Snippet Vault
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Códigos & Helpers de Produção
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Custom hooks, validadores, formatadores e utilitários prontos para copiar e colar no seu projeto real.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/playground"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border hover:border-primary-500 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <Terminal className="w-4 h-4 text-primary-400" />
            <span>Abrir Playground</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border font-mono text-xs text-slate-400">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{mockSnippets.length} Snippets Prontos</span>
          </div>
        </div>
      </div>

      {/* Barra de Filtros & Busca */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Categorias */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-emerald-500 text-white font-bold shadow-glow"
                  : "bg-surface border border-surface-border text-slate-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "Todos os Snippets" : cat}
            </button>
          ))}
        </div>

        {/* Busca */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, tag ou código..."
            className="w-full bg-surface text-slate-200 text-xs pl-8 pr-3 py-2 rounded-xl border border-surface-border focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>
      </div>

      {/* Grid de Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSnippets.map((snippet) => {
          const isCopied = copiedId === snippet.id;
          const isUsageOpen = !!expandedUsage[snippet.id];

          return (
            <div
              key={snippet.id}
              className="bg-surface/80 border border-surface-border rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 hover:border-surface-border/90 transition-all"
            >
              <div className="space-y-3">
                {/* Metadados Topo */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                      {snippet.category}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-surface border border-surface-border text-slate-400">
                      {snippet.language}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(snippet.id, snippet.code)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all border ${
                      isCopied
                        ? "bg-emerald-500 text-white border-emerald-400"
                        : "bg-surface text-slate-300 border-surface-border hover:bg-surface-hover hover:border-slate-600"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">
                  {snippet.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {snippet.description}
                </p>

                {/* Bloco de Código */}
                <div className="relative rounded-2xl bg-[#05080E] border border-surface-border overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-surface/50 border-b border-surface-border/60 text-[11px] font-mono text-slate-400">
                    <span>{snippet.title}.ts</span>
                    <span>TypeScript</span>
                  </div>
                  <pre className="p-4 text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-72 leading-relaxed">
                    <code>{snippet.code}</code>
                  </pre>
                </div>

                {/* Exemplo de Uso Expansível */}
                <div className="pt-1">
                  <button
                    onClick={() => toggleUsage(snippet.id)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {isUsageOpen ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                    <span>{isUsageOpen ? "Ocultar Exemplo de Uso" : "Ver Exemplo de Uso Prático"}</span>
                  </button>

                  {isUsageOpen && (
                    <div className="mt-2 p-3 rounded-2xl bg-[#090D16] border border-cyan-500/30 text-xs font-mono text-slate-300">
                      <div className="flex items-center justify-between mb-1.5 text-[11px] text-cyan-400 font-bold">
                        <span>Exemplo de Consumo:</span>
                        <button
                          onClick={() => handleCopy(`usage-${snippet.id}`, snippet.usage)}
                          className="hover:text-white"
                        >
                          {copiedId === `usage-${snippet.id}` ? "Copiado!" : "Copiar uso"}
                        </button>
                      </div>
                      <pre className="overflow-x-auto text-[11px] text-cyan-200/90 leading-relaxed">
                        <code>{snippet.usage}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-surface-border/60">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-lg bg-surface text-[10px] font-mono text-slate-400 border border-surface-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-surface/40 border border-surface-border">
          <p className="text-slate-400 text-sm">Nenhum snippet encontrado para a busca selecionada.</p>
        </div>
      )}
    </div>
  );
}
