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
  Layers,
  ArrowUp,
  Trash2,
  Eye,
  Plus,
  RefreshCw,
  Clock,
  ShieldCheck,
  Flame,
  Terminal as TerminalIcon,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockCheatCategories, CheatCategory, CheatItem } from "@/lib/data/cheatsheets";

export function CheatsheetViewer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Estados para o Executor de Código In-Place
  const [runningSnippet, setRunningSnippet] = useState<string | null>(null);
  const [executionOutputs, setExecutionOutputs] = useState<Record<string, { logs: string[]; error?: string }>>({});

  // Estados para o Visualizador Interativo de Pilha (Stack Sandbox)
  const [stackItems, setStackItems] = useState<string[]>(["Chamada 1 (main)", "Chamada 2 (fetchUser)", "Chamada 3 (validate)"]);
  const [stackInput, setStackInput] = useState<string>("");
  const [stackLog, setStackLog] = useState<string>("Pilha inicializada com 3 frames.");
  const [stackPeekHighlight, setStackPeekHighlight] = useState<boolean>(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Executor in-place de código JavaScript seguro
  const runCodeInPlace = (code: string, id: string) => {
    setRunningSnippet(id);
    const logs: string[] = [];

    try {
      // Mock seguro de console.log
      const customConsole = {
        log: (...args: any[]) => {
          logs.push(
            args
              .map((arg) => {
                if (typeof arg === "object" && arg !== null) {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch {
                    return String(arg);
                  }
                }
                return String(arg);
              })
              .join(" ")
          );
        },
        error: (...args: any[]) => {
          logs.push("❌ [ERRO] " + args.map((a) => String(a)).join(" "));
        },
        warn: (...args: any[]) => {
          logs.push("⚠️ [WARN] " + args.map((a) => String(a)).join(" "));
        }
      };

      // Executa o snippet isolado
      const sandboxFn = new Function("console", `"use strict";\n${code}`);
      sandboxFn(customConsole);

      setExecutionOutputs((prev) => ({
        ...prev,
        [id]: { logs: logs.length > 0 ? logs : ["(Código executado com sucesso sem logs no console)"] }
      }));
    } catch (err: any) {
      setExecutionOutputs((prev) => ({
        ...prev,
        [id]: { logs, error: err.message || "Erro na execução do código" }
      }));
    } finally {
      setTimeout(() => setRunningSnippet(null), 300);
    }
  };

  // Operações da Pilha Interativa (Stack Operations)
  const handleStackPush = () => {
    const val = stackInput.trim() || `Item ${stackItems.length + 1}`;
    if (stackItems.length >= 7) {
      setStackLog("⚠️ Stack Overflow simulado: Limite visual atingido (7 itens max).");
      return;
    }
    setStackItems((prev) => [...prev, val]);
    setStackInput("");
    setStackLog(`stack.push("${val}") executado com sucesso! Topo atualizado.`);
    setStackPeekHighlight(false);
  };

  const handleStackPop = () => {
    if (stackItems.length === 0) {
      setStackLog("⚠️ Stack Underflow: Impossível desempilhar de uma pilha vazia!");
      return;
    }
    const removed = stackItems[stackItems.length - 1];
    setStackItems((prev) => prev.slice(0, -1));
    setStackLog(`stack.pop() -> Removido: "${removed}".`);
    setStackPeekHighlight(false);
  };

  const handleStackPeek = () => {
    if (stackItems.length === 0) {
      setStackLog("stack.peek() -> null (Pilha vazia)");
      return;
    }
    const top = stackItems[stackItems.length - 1];
    setStackPeekHighlight(true);
    setStackLog(`stack.peek() -> Topo inspecionado: "${top}" (Sem remover).`);
    setTimeout(() => setStackPeekHighlight(false), 2000);
  };

  const handleStackClear = () => {
    setStackItems([]);
    setStackLog("stack.clear() -> Pilha completamente esvaziada.");
    setStackPeekHighlight(false);
  };

  // Filtragem DevDocs
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
          item.example.toLowerCase().includes(q) ||
          (item.complexity && item.complexity.toLowerCase().includes(q)) ||
          (item.categoryTag && item.categoryTag.toLowerCase().includes(q))
        );
      });

      if (filteredItems.length === 0) return null;
      return { ...cat, items: filteredItems };
    })
    .filter(Boolean) as CheatCategory[];

  const totalMethodsCount = mockCheatCategories.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Estilo W3Schools & DevDocs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-primary-500/20 text-primary-400 border border-primary-500/30">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-primary-400">
              DevDocs & W3Schools Encyclopedia
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Try It Yourself Integrado
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Enciclopédia de Métodos & Estruturas
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Consulte métodos de <span className="text-cyan-300 font-semibold">JavaScript (Arrays, Strings, Objetos)</span>,{" "}
            estruturas de dados <span className="text-amber-300 font-semibold">Pilha (Stack LIFO) & Fila (FIFO)</span>,{" "}
            <span className="text-purple-300 font-semibold">SQL</span> e <span className="text-blue-300 font-semibold">CSS</span> com execução de código em tempo real e complexidade Big-O.
          </p>
        </div>

        {/* Ações Rápidas */}
        <div className="flex items-center gap-2">
          <Link href="/playground">
            <Button variant="primary" size="md" className="font-mono text-xs gap-2 shadow-glow">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Abrir Web Playground</span>
            </Button>
          </Link>
          <Link href="/visualizer">
            <Button variant="secondary" size="md" className="font-mono text-xs gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Visualizador Big-O</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Widget Interativo Especial: Pilha (Stack LIFO) Sandbox */}
      {(selectedCategory === "all" || selectedCategory === "stack-structures") && (
        <div className="bg-gradient-to-r from-amber-500/10 via-surface to-primary-500/10 border border-amber-500/30 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Stack Playground Interativo</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    LIFO: Last-In, First-Out
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Experimente as operações de empilhar (<code className="text-amber-300 font-mono">push</code>), desempilhar (<code className="text-amber-300 font-mono">pop</code>) e consultar topo (<code className="text-amber-300 font-mono">peek</code>) em tempo real!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-surface-border">
                <span className="text-slate-400">Tamanho:</span>
                <span className="font-bold text-amber-400">{stackItems.length}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface border border-surface-border">
                <span className="text-slate-400">Vazia?:</span>
                <span className={`font-bold ${stackItems.length === 0 ? "text-red-400" : "text-emerald-400"}`}>
                  {stackItems.length === 0 ? "true" : "false"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Visualização da Pilha em Bloco Vertical */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-[#060911] rounded-2xl border border-surface-border min-h-[220px]">
              <div className="w-full max-w-sm flex flex-col-reverse gap-2">
                {stackItems.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs font-mono">
                    Pilha Vazia! Adicione elementos abaixo para empilhar.
                  </div>
                ) : (
                  stackItems.map((item, index) => {
                    const isTop = index === stackItems.length - 1;
                    return (
                      <div
                        key={`${item}-${index}`}
                        className={`p-3 rounded-xl font-mono text-xs transition-all flex items-center justify-between border ${
                          isTop
                            ? stackPeekHighlight
                              ? "bg-amber-400 text-slate-950 font-bold border-amber-300 scale-105 shadow-glow"
                              : "bg-gradient-to-r from-amber-500/25 to-primary-500/25 text-amber-200 border-amber-400/60 shadow-lg"
                            : "bg-surface/90 text-slate-300 border-surface-border"
                        }`}
                      >
                        <span className="truncate">{item}</span>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <span className="text-[10px] text-slate-500">[{index}]</span>
                          {isTop && (
                            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse">
                              <ArrowUp className="w-3 h-3" />
                              <span>TOPO</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="w-full max-w-sm border-t-2 border-slate-700 mt-2 pt-1 text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Base da Pilha (Memória Heap)
              </div>
            </div>

            {/* Painel de Controles da Pilha */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStackPush()}
                  placeholder="Nome do item (ex: Frame 4, Documento, 100)..."
                  className="flex-1 bg-surface text-slate-200 text-xs px-3.5 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-amber-400 font-mono"
                />
                <Button variant="primary" size="sm" onClick={handleStackPush} className="font-mono text-xs gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <Plus className="w-3.5 h-3.5" />
                  <span>push()</span>
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={handleStackPop} className="font-mono text-xs gap-1.5">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  <span>pop() (O(1))</span>
                </Button>
                <Button variant="secondary" size="sm" onClick={handleStackPeek} className="font-mono text-xs gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>peek() (O(1))</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleStackClear} className="font-mono text-xs gap-1.5 text-slate-400 hover:text-white">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>clear()</span>
                </Button>
              </div>

              {/* Log do Terminal da Pilha */}
              <div className="bg-[#05070E] p-3 rounded-xl border border-surface-border font-mono text-xs space-y-1">
                <div className="text-[10px] uppercase text-slate-500 flex items-center justify-between">
                  <span>Console da Pilha</span>
                  <span className="text-emerald-400 font-semibold">● Ativo</span>
                </div>
                <div className="text-amber-300 font-medium">❯ {stackLog}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Barra de Busca e Filtros de Categoria Estilo DevDocs */}
      <div className="space-y-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar métodos, sintaxe, complexidade (ex: .map, push, pop, split, Promise.all, O(1), O(n))..."
            className="w-full bg-surface text-slate-200 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-surface-border focus:outline-none focus:border-primary-500 font-mono placeholder:text-slate-500 shadow-inner"
          />
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
            Todos os Métodos ({totalMethodsCount})
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
              {cat.title} ({cat.items.length})
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Métodos e Sintaxes */}
      <div className="space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 bg-surface/40 rounded-3xl border border-surface-border space-y-3">
            <Layers className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-slate-400 text-sm">Nenhum método encontrado para &quot;{searchQuery}&quot;.</p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
            >
              Limpar filtros de busca
            </Button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="space-y-5">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    {category.title}
                  </h2>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-primary-500/15 text-primary-300 border border-primary-500/30">
                    {category.badge}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {category.items.length} {category.items.length === 1 ? "método" : "métodos"}
                </span>
              </div>

              {/* Cards de Métodos Estilo W3Schools & DevDocs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {category.items.map((item, idx) => {
                  const methodId = `${category.id}-${idx}`;
                  const isCopied = copiedIndex === methodId;
                  const isRunning = runningSnippet === methodId;
                  const output = executionOutputs[methodId];

                  return (
                    <div
                      key={item.name}
                      className="bg-surface/80 border border-surface-border rounded-2xl p-5 space-y-4 hover:border-slate-600 transition-all flex flex-col justify-between shadow-xl"
                    >
                      <div className="space-y-3">
                        {/* Top Header do Card: Nome e Badges */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-white font-mono text-cyan-300">
                              {item.name}
                            </h3>
                            {item.complexity && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {item.complexity}
                              </span>
                            )}
                            {item.mutates !== undefined && (
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                                  item.mutates
                                    ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                    : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                }`}
                              >
                                {item.mutates ? "Mutável" : "Imutável"}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleCopy(item.example, methodId)}
                              className="p-1.5 rounded-lg bg-[#070A10] border border-surface-border text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                              title="Copiar código de exemplo"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        {/* Sintaxe Oficial */}
                        <div className="bg-[#070A10] p-2.5 rounded-xl border border-surface-border/80 font-mono text-xs text-amber-300 overflow-x-auto">
                          <code>{item.syntax}</code>
                        </div>

                        {/* Descrição */}
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Exemplo de Código com estilo CodeMirror/IDE */}
                        <div className="relative group">
                          <div className="bg-[#05070E] p-3.5 rounded-xl border border-surface-border/70 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
                            <pre>{item.example}</pre>
                          </div>
                        </div>

                        {/* Saída da Execução In-Place (Try it Yourself) */}
                        {output && (
                          <div className="bg-[#060813] border border-cyan-500/30 rounded-xl p-3 font-mono text-xs space-y-1.5 shadow-inner">
                            <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold uppercase tracking-wider border-b border-surface-border pb-1">
                              <span className="flex items-center gap-1">
                                <TerminalIcon className="w-3 h-3" />
                                Console Output
                              </span>
                              <button
                                onClick={() =>
                                  setExecutionOutputs((prev) => {
                                    const next = { ...prev };
                                    delete next[methodId];
                                    return next;
                                  })
                                }
                                className="text-slate-500 hover:text-slate-300"
                              >
                                Limpar
                              </button>
                            </div>
                            {output.error ? (
                              <div className="text-red-400 text-xs">❌ {output.error}</div>
                            ) : (
                              output.logs.map((log, lIdx) => (
                                <div key={lIdx} className="text-emerald-300 whitespace-pre-wrap">
                                  ❯ {log}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer do Card com Botão Try It Yourself / Executar */}
                      <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between gap-2 flex-wrap">
                        {item.outputOrNotes && !output && (
                          <span className="text-[11px] font-mono text-slate-400 truncate max-w-[280px]">
                            👉 <span className="text-slate-300">{item.outputOrNotes}</span>
                          </span>
                        )}

                        <div className="flex items-center gap-2 ml-auto">
                          {/* Botão Executar Exemplo In-Place */}
                          {category.badge === "JavaScript" || category.badge.includes("Stack") || category.badge.includes("Queue") || category.badge === "Async" ? (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => runCodeInPlace(item.example, methodId)}
                              disabled={isRunning}
                              className="text-[11px] font-mono gap-1 text-emerald-400 hover:text-emerald-300 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isRunning ? "Executando..." : "Executar Exemplo"}</span>
                            </Button>
                          ) : null}

                          <Link href="/playground" className="shrink-0">
                            <Button variant="ghost" size="sm" className="text-[11px] font-mono gap-1 text-primary-400 hover:text-white">
                              <span>Playground</span>
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </Link>
                        </div>
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
