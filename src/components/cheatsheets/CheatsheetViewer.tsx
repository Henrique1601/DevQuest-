"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Play,
  ExternalLink,
  Sparkles,
  Code2,
  Terminal,
  Database,
  Layers,
  FileCode
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockCheatCategories, CheatCategory, CheatItem } from "@/lib/data/cheatsheets";

export function CheatsheetViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Filtragem
  const filteredCategories = mockCheatCategories
    .map((cat) => {
      const isCatMatch = selectedCategory === "all" || cat.id === selectedCategory;
      if (!isCatMatch) return null;

      const q = searchQuery.toLowerCase().trim();
      const filteredItems = cat.items.filter((item) => {
        if (!q) return true;
        return (
          item.name.toLowerCase().includes(q) ||
          item.syntax.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.example.toLowerCase().includes(q)
        );
      });

      if (filteredItems.length === 0) return null;
      return { ...cat, items: filteredItems };
    })
    .filter(Boolean) as CheatCategory[];

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-primary-500/20 text-primary-400 border border-primary-500/30">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-primary-400">
              Estilo W3Schools & DevDocs
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            DevDocs & CheatSheets Interativos
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Consulte sintaxes fundamentais de JavaScript, Flexbox, SQL, Git e HTTP com exemplos prontos para testar no Playground.
          </p>
        </div>

        {/* Link para o Playground */}
        <Link href="/playground">
          <Button variant="primary" size="md" className="font-mono text-xs gap-2 shadow-glow">
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Abrir Web Playground</span>
          </Button>
        </Link>
      </div>

      {/* Barra de Busca e Filtros de Categoria */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar métodos, sintaxes ou propriedades (ex: .map, justify-content, JOIN, stash)..."
              className="w-full bg-surface text-slate-200 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-surface-border focus:outline-none focus:border-primary-500 font-mono placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Categorias em Pílulas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
              selectedCategory === "all"
                ? "bg-primary-500 text-white shadow-glow"
                : "bg-surface border border-surface-border text-slate-400 hover:text-white"
            }`}
          >
            Todas ({mockCheatCategories.reduce((acc, c) => acc + c.items.length, 0)})
          </button>
          {mockCheatCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary-500 text-white shadow-glow"
                  : "bg-surface border border-surface-border text-slate-400 hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de CheatSheets */}
      <div className="space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-surface/40 rounded-3xl border border-surface-border space-y-3">
            <Layers className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-slate-400 text-sm">Nenhuma sintaxe encontrada para &quot;{searchQuery}&quot;.</p>
            <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    {category.title}
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary-500/15 text-primary-300 border border-primary-500/30">
                    {category.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {category.items.length} {category.items.length === 1 ? "sintaxe" : "sintaxes"}
                </span>
              </div>

              {/* Cards de Sintaxe */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {category.items.map((item, idx) => {
                  const copyId = `${category.id}-${idx}`;
                  const isCopied = copiedIndex === copyId;

                  return (
                    <div
                      key={item.name}
                      className="bg-surface/70 border border-surface-border rounded-2xl p-5 space-y-3 hover:border-slate-600 transition-all flex flex-col justify-between shadow-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-white font-mono text-cyan-300">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => handleCopy(item.example, copyId)}
                            className="p-1.5 rounded-lg bg-[#070A10] border border-surface-border text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                            title="Copiar código de exemplo"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {/* Sintaxe Oficial */}
                        <div className="bg-[#070A10] p-2.5 rounded-xl border border-surface-border/80 font-mono text-xs text-amber-300 overflow-x-auto">
                          <code>{item.syntax}</code>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Exemplo de Código */}
                        <div className="bg-[#05070E] p-3 rounded-xl border border-surface-border/60 font-mono text-xs text-slate-200 overflow-x-auto">
                          <pre>{item.example}</pre>
                        </div>
                      </div>

                      {/* Footer com Dica / Retorno e Botão de Playground */}
                      <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between gap-2">
                        {item.outputOrNotes && (
                          <span className="text-[11px] font-mono text-slate-400 truncate">
                            👉 <span className="text-slate-300">{item.outputOrNotes}</span>
                          </span>
                        )}

                        <Link href="/playground" className="ml-auto shrink-0">
                          <Button variant="ghost" size="sm" className="text-[11px] font-mono gap-1 text-primary-400 hover:text-white">
                            <span>Testar</span>
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
