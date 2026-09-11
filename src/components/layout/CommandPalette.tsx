"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  Search,
  Code2,
  FolderGit2,
  Compass,
  Zap,
  Terminal,
  Database,
  Trophy,
  Flame,
  Bot,
  Layers,
  ArrowRight,
  Sparkles,
  Command,
  X,
  Puzzle
} from "lucide-react";
import { mockChallenges } from "@/lib/data/challenges";
import { mockProjects } from "@/lib/data/projects";
import { mockTracks } from "@/lib/data/tracks";
import { sfx } from "@/lib/audio/sfx";

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Desafio" | "Projeto" | "Trilha" | "Ferramenta";
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Itens indexados
  const allItems: PaletteItem[] = useMemo(() => {
    const tools: PaletteItem[] = [
      { id: "tool-daily", title: "Daily Quest & Ofensiva", subtitle: "Desafio do dia com 2x XP e heatmap", category: "Ferramenta", url: "/daily", icon: Flame, badge: "2x XP" },
      { id: "tool-blanks", title: "Preencher Lacunas de Código", subtitle: "Quizzes interativos e Cloze tests de JavaScript, React e SQL", category: "Ferramenta", url: "/code-blanks", icon: Puzzle, badge: "Novo" },
      { id: "tool-leaderboard", title: "Ranking Global & Ligas", subtitle: "Ligas Diamante, Ouro, Prata e Bronze", category: "Ferramenta", url: "/leaderboard", icon: Trophy },
      { id: "tool-review", title: "Code Review com IA (Pull Request)", subtitle: "Auditoria estática, OWASP e visualizador de diff", category: "Ferramenta", url: "/code-review", icon: Bot, badge: "IA" },
      { id: "tool-ailab", title: "Laboratório de Agentes de IA", subtitle: "Simulador ReAct e engenharia de prompts", category: "Ferramenta", url: "/ai-lab", icon: Sparkles, badge: "IA" },
      { id: "tool-terminal", title: "Terminal Linux & Git", subtitle: "Emulador Bash interativo e desafios CLI", category: "Ferramenta", url: "/terminal", icon: Terminal },
      { id: "tool-sql", title: "SQL Playground", subtitle: "Consultas relacionais em tempo real", category: "Ferramenta", url: "/sql-playground", icon: Database },
      { id: "tool-visualizer", title: "Visualizador de Algoritmos", subtitle: "Big-O, Pilhas, Filas e Ordenação", category: "Ferramenta", url: "/visualizer", icon: Layers },
      { id: "tool-cheatsheets", title: "DevDocs & Cheatsheets", subtitle: "Guias W3Schools, MDN e atalhos rápidos", category: "Ferramenta", url: "/cheatsheets", icon: Compass },
      { id: "tool-profile", title: "Meu Perfil & Badges SVG", subtitle: "Estatísticas públicas e insígnia para o GitHub", category: "Ferramenta", url: "/profile", icon: Zap },
    ];

    const challenges: PaletteItem[] = mockChallenges.map((c, idx) => ({
      id: `c-${c.id}`,
      title: c.title,
      subtitle: `${c.category} • +${c.xp} XP • Nível ${c.difficulty}`,
      category: "Desafio",
      url: `/challenges?index=${idx}`,
      icon: Code2,
      badge: c.difficulty,
    }));

    const projects: PaletteItem[] = mockProjects.map((p) => ({
      id: `p-${p.id}`,
      title: p.title,
      subtitle: `${p.tagline} • ~${p.estimatedHours}h`,
      category: "Projeto",
      url: `/projects/${p.slug}`,
      icon: FolderGit2,
      badge: p.difficulty,
    }));

    const tracks: PaletteItem[] = mockTracks.map((t) => ({
      id: `t-${t.id}`,
      title: `Trilha: ${t.title}`,
      subtitle: `${t.level} • ~${t.totalHours}h de estudo`,
      category: "Trilha",
      url: `/tracks/${t.slug}`,
      icon: Compass,
      badge: t.level,
    }));

    return [...tools, ...challenges, ...projects, ...tracks];
  }, []);

  // Filtro
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 15);
    }
    const q = query.toLowerCase().trim();
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .slice(0, 20);
  }, [allItems, query]);

  // Listener global de atalhos (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        sfx.playClickSfx();
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Navegação por teclado
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  const handleSelect = (item: PaletteItem) => {
    sfx.playClickSfx();
    setIsOpen(false);
    router.push(item.url);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Busca Rápida DevQuest"
    >
      <div
        className="w-full max-w-2xl bg-[#080D1A] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="p-4 border-b border-surface-border flex items-center gap-3 bg-surface/50">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNavigation}
            placeholder="Buscar desafio, projeto, trilha, ferramenta... (ex: Two Sum, JWT, Python)"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-lg hover:bg-surface-hover text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-[#04060C] border border-surface-border text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-sm font-medium">Nenhum resultado encontrado para &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500">Tente buscar por termos como &quot;React&quot;, &quot;Array&quot;, &quot;SQL&quot; ou &quot;Daily&quot;.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`group p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-500/40 text-white shadow-glow"
                      : "hover:bg-surface-hover border border-transparent text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl transition-colors shrink-0 ${
                        isSelected
                          ? "bg-cyan-500/30 text-cyan-300"
                          : "bg-[#060913] text-slate-400 group-hover:text-cyan-400 border border-surface-border"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-surface border border-surface-border text-slate-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 truncate">{item.subtitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#05070F] border border-surface-border text-slate-400">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "translate-x-1 text-cyan-400" : "opacity-0"}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="p-3 border-t border-surface-border bg-surface/30 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-surface-border">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-surface-border">↓</kbd>
              Navegar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-surface border border-surface-border">↵</kbd>
              Abrir
            </span>
          </div>
          <span className="flex items-center gap-1 text-cyan-400/80">
            <Command className="w-3 h-3" /> DevQuest Spotlight
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
