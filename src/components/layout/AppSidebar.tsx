"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  Sparkles,
  Bot,
  SquareCode,
  Zap,
  Terminal,
  Database,
  GitPullRequest,
  BookOpen,
  Bug,
  Video,
  FileCode2,
  Briefcase,
  Crown,
  Palette,
  Flame,
  Volume2,
  VolumeX,
  Search,
  ExternalLink,
  Code2
} from "lucide-react";
import { sfx } from "@/lib/audio/sfx";
import { GithubIcon } from "@/components/ui/GithubIcon";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const [isMuted, setIsMuted] = React.useState(false);

  useEffect(() => {
    setIsMuted(sfx.isMuted());
  }, [isOpen]);

  // Fechar com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Previne scroll no body quando a sidebar estiver aberta
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-fade-in">
      {/* Backdrop Escurecido com Blur */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Painel Lateral Drawer */}
      <aside
        className="relative w-full max-w-md bg-[#080D1A]/95 border-l border-surface-border backdrop-blur-2xl shadow-2xl flex flex-col h-full z-10 overflow-hidden text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Lateral de Labs e Ferramentas"
      >
        {/* Header da Sidebar */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-surface/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 p-0.5 shadow-glow">
              <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-400" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                DevQuest Hub
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Labs
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">Todas as ferramentas e ambientes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-surface-border hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
            title="Fechar menu (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Seção 1: Ambientes Interativos & Labs */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 px-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ambientes Interativos & Labs</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <Link
                href="/ai-lab"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-cyan-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">AI Agents Lab</div>
                  <div className="text-[11px] text-slate-400">Simulador ReAct & Tool Calling</div>
                </div>
              </Link>

              <Link
                href="/playground"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-orange-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 group-hover:scale-105 transition-transform">
                  <SquareCode className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-orange-300">Web Playground</div>
                  <div className="text-[11px] text-slate-400">Editor HTML, CSS e JS ao vivo</div>
                </div>
              </Link>

              <Link
                href="/visualizer"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-primary-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20 group-hover:scale-105 transition-transform">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-primary-300">Visualizador Big-O</div>
                  <div className="text-[11px] text-slate-400">Algoritmos passo a passo animados</div>
                </div>
              </Link>

              <Link
                href="/terminal"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-emerald-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">Terminal Linux & Git</div>
                  <div className="text-[11px] text-slate-400">Shell interativo e missões CLI</div>
                </div>
              </Link>

              <Link
                href="/sql-playground"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-cyan-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">SQL Playground</div>
                  <div className="text-[11px] text-slate-400">PostgreSQL relacional em memória</div>
                </div>
              </Link>

              <Link
                href="/flashcards"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-amber-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300">Flashcards Anki 3D</div>
                  <div className="text-[11px] text-slate-400">Repetição espaçada para memorização</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Seção 2: Ferramentas & Apoio ao Dev */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400 px-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Docs & Apoio ao Dev</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <Link
                href="/code-review"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-purple-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition-transform">
                  <GitPullRequest className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">Code Review IA (PR)</div>
                  <div className="text-[11px] text-slate-400">Auditoria OWASP e comparador de diff</div>
                </div>
              </Link>

              <Link
                href="/cheatsheets"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-blue-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-blue-300">CheatSheets (W3Schools)</div>
                  <div className="text-[11px] text-slate-400">JS, CSS, Git, SQL e HTTP direto</div>
                </div>
              </Link>

              <Link
                href="/debug-clinic"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-rose-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition-transform">
                  <Bug className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-rose-300">Debug Clinic</div>
                  <div className="text-[11px] text-slate-400">Erros comuns do dia a dia e soluções</div>
                </div>
              </Link>

              <Link
                href="/snippets"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-emerald-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <FileCode2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">Snippet Vault</div>
                  <div className="text-[11px] text-slate-400">Helpers e hooks prontos de produção</div>
                </div>
              </Link>

              <Link
                href="/videos"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-red-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-105 transition-transform">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-red-300">Video Hub</div>
                  <div className="text-[11px] text-slate-400">Vídeos curados com capítulos e código</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Seção 3: Desafios & Carreiras */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-pink-400 px-1">
              <Crown className="w-3.5 h-3.5" />
              <span>Desafios & Carreiras</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <Link
                href="/ui-challenges"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-pink-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-105 transition-transform">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-pink-300">UI/UX Pixel-Perfect</div>
                  <div className="text-[11px] text-slate-400">Desafios visuais com split slider</div>
                </div>
              </Link>

              <Link
                href="/interviews"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-accent-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-accent-500/10 text-accent-400 border border-accent-500/20 group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-accent-300">Entrevistas Técnicas</div>
                  <div className="text-[11px] text-slate-400">Simulador de Big Techs com cronômetro</div>
                </div>
              </Link>

              <Link
                href="/leaderboard"
                onClick={onClose}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0B1120]/80 border border-surface-border hover:border-amber-500/50 hover:bg-surface-hover transition-all group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                  <Crown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-300">Ranking & Ligas de XP</div>
                  <div className="text-[11px] text-slate-400">Bronze, Prata, Ouro e Diamante</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Rodapé da Sidebar com Preferências e Ações */}
        <div className="p-4 border-t border-surface-border bg-surface/60 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const muted = sfx.toggleMute();
                setIsMuted(muted);
              }}
              className="p-2 rounded-lg border border-surface-border text-slate-400 hover:text-white hover:bg-surface-hover transition-colors flex items-center gap-1.5"
              title={isMuted ? "Ativar Áudio" : "Mutar Áudio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              <span className="text-[11px]">{isMuted ? "Mudo" : "Som Ativo"}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
              }}
              className="p-2 rounded-lg border border-surface-border text-slate-400 hover:text-white hover:bg-surface-hover transition-colors flex items-center gap-1.5"
              title="Abrir Command Palette"
            >
              <Search className="w-4 h-4 text-primary-400" />
              <span className="text-[11px]">⌘K</span>
            </button>
          </div>

          <a
            href="https://github.com/Henrique1601/DevQuest-"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="text-[11px]">GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </aside>
    </div>
  );
}
