"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  Code2,
  Sparkles,
  Terminal,
  BookOpen,
  Layers,
  Trophy,
  Menu,
  X,
  User,
  LogIn,
  ChevronDown,
  Database,
  Zap,
  SquareCode,
  Video,
  Bug,
  FileCode2,
  Briefcase,
  Crown,
  Flame,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [labsDropdownOpen, setLabsDropdownOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 p-0.5 transition-transform group-hover:scale-105 shadow-glow">
            <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-400 group-hover:text-white transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              DevQuest
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-primary-500/20 text-primary-400 border border-primary-500/30">
                PRO
              </span>
            </span>
            <span className="text-xs text-slate-400 font-mono -mt-0.5">Estudos de Código</span>
          </div>
        </Link>

        {/* Links Desktop */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/#trilhas" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <BookOpen className="w-4 h-4 text-slate-400" />
            Trilhas
          </Link>
          <Link href="/#projetos" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Layers className="w-4 h-4 text-slate-400" />
            Projetos
          </Link>
          <Link href="/challenges" className="flex items-center gap-1.5 text-accent-400 hover:text-accent-300 transition-colors">
            <Zap className="w-4 h-4" />
            Arena
          </Link>
          <Link href="/daily" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Flame className="w-4 h-4 text-amber-400" />
            Daily
          </Link>
          <Link href="/ui-challenges" className="flex items-center gap-1.5 hover:text-pink-400 transition-colors">
            <Palette className="w-4 h-4 text-pink-400" />
            UI/UX
          </Link>
          <Link href="/interviews" className="flex items-center gap-1.5 hover:text-accent-400 transition-colors">
            <Briefcase className="w-4 h-4 text-accent-400" />
            Entrevistas
          </Link>
          <Link href="/leaderboard" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Crown className="w-4 h-4 text-amber-400" />
            Ranking
          </Link>

          {/* Dropdown Labs & Prática */}
          <div
            className="relative"
            onMouseEnter={() => setLabsDropdownOpen(true)}
            onMouseLeave={() => setLabsDropdownOpen(false)}
          >
            <button
              onClick={() => setLabsDropdownOpen(!labsDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-primary-400 text-slate-300 transition-colors py-2 focus:outline-none"
            >
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span>Labs & Ferramentas</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${labsDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {labsDropdownOpen && (
              <div className="absolute top-full left-0 w-[540px] p-4 bg-[#0A0E17]/95 border border-surface-border rounded-3xl shadow-2xl backdrop-blur-xl animate-fade-in z-50">
                <div className="grid grid-cols-2 gap-3">
                  {/* Coluna 1: Labs Interativos */}
                  <div className="space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">
                      Ambientes Interativos
                    </div>

                    <Link
                      href="/daily"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Flame className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Desafio do Dia (Daily)</div>
                        <div className="text-[10px] text-slate-500">Ofensiva & Heatmap anual</div>
                      </div>
                    </Link>

                    <Link
                      href="/ui-challenges"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Frontend Pixel-Perfect</div>
                        <div className="text-[10px] text-slate-500">Comparador slider de UI/UX</div>
                      </div>
                    </Link>

                    <Link
                      href="/playground"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <SquareCode className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Web Playground</div>
                        <div className="text-[10px] text-slate-500">Sandbox HTML/CSS/JS</div>
                      </div>
                    </Link>

                    <Link
                      href="/visualizer"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Visualizador Big-O</div>
                        <div className="text-[10px] text-slate-500">Algoritmos passo a passo</div>
                      </div>
                    </Link>

                    <Link
                      href="/flashcards"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Flashcards Anki</div>
                        <div className="text-[10px] text-slate-500">Repetição espaçada 3D</div>
                      </div>
                    </Link>

                    <Link
                      href="/terminal"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Terminal className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Terminal UNIX & Git</div>
                        <div className="text-[10px] text-slate-500">Shell e missões CLI</div>
                      </div>
                    </Link>

                    <Link
                      href="/sql-playground"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">SQL Playground</div>
                        <div className="text-[10px] text-slate-500">Postgres e queries mock</div>
                      </div>
                    </Link>
                  </div>

                  {/* Coluna 2: Docs & Dicas de Comunidade */}
                  <div className="space-y-1 border-l border-surface-border/60 pl-3">
                    <div className="px-2.5 py-1 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-500">
                      Docs & Apoio ao Dev
                    </div>

                    <Link
                      href="/cheatsheets"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">CheatSheets (W3)</div>
                        <div className="text-[10px] text-slate-500">JS, CSS, Git, SQL e HTTP</div>
                      </div>
                    </Link>

                    <Link
                      href="/debug-clinic"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Bug className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Debug Clinic (Stack)</div>
                        <div className="text-[10px] text-slate-500">Erros comuns e soluções</div>
                      </div>
                    </Link>

                    <Link
                      href="/videos"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Video Hub (YouTube)</div>
                        <div className="text-[10px] text-slate-500">Aulas com capítulos</div>
                      </div>
                    </Link>

                    <Link
                      href="/snippets"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <FileCode2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Snippet Vault</div>
                        <div className="text-[10px] text-slate-500">Hooks e helpers prontos</div>
                      </div>
                    </Link>

                    <Link
                      href="/interviews"
                      className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                    >
                      <div className="p-1.5 rounded-lg bg-accent-500/10 text-accent-400 border border-accent-500/20 group-hover:scale-105 transition-transform shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">Mock Interviews</div>
                        <div className="text-[10px] text-slate-500">Nubank, Google, iFood</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* CTA e Usuário */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-surface-border text-slate-400 hover:text-white hover:bg-surface-hover transition-colors"
            title="Repositório no GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          {session ? (
            <Link href="/profile">
              <Button variant="secondary" size="md" className="border-primary-500/30 hover:border-primary-400">
                <div className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center -ml-1">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="max-w-[120px] truncate">{session.user?.name || "Meu Perfil"}</span>
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="md" className="font-mono text-xs">
                  <LogIn className="w-4 h-4" />
                  <span>Entrar</span>
                </Button>
              </Link>
              <Link href="/challenges">
                <Button variant="primary" size="md">
                  <Sparkles className="w-4 h-4" />
                  <span>Começar</span>
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Botão Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {session ? (
            <Link href="/profile" className="p-2 rounded-lg bg-surface border border-surface-border text-primary-400">
              <User className="w-5 h-5" />
            </Link>
          ) : (
            <Link href="/login" className="p-2 rounded-lg bg-surface border border-surface-border text-slate-300">
              <LogIn className="w-5 h-5" />
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-surface-border px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/#trilhas"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
          >
            Trilhas de Estudo
          </Link>
          <Link
            href="/#projetos"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
          >
            Projetos Guiados
          </Link>
          <Link
            href="/#desafios"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
          >
            Desafios Práticos
          </Link>
          <Link
            href="/challenges"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-accent-400 hover:bg-white/5 rounded-lg"
          >
            Arena de Código (Editor Web)
          </Link>
          <Link
            href="/daily"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-base font-medium text-amber-400 hover:bg-white/5 rounded-lg"
          >
            <Flame className="w-4 h-4" />
            Desafio do Dia (Daily Quest)
          </Link>
          <Link
            href="/ui-challenges"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-base font-medium text-pink-400 hover:bg-white/5 rounded-lg"
          >
            <Palette className="w-4 h-4" />
            Desafios UI/UX (Pixel-Perfect)
          </Link>
          <Link
            href="/interviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg"
          >
            Entrevistas Técnicas Simuladas
          </Link>
          <Link
            href="/leaderboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-amber-400 hover:bg-white/5 rounded-lg"
          >
            Ranking Global & Ligas
          </Link>

          {/* Seção Labs Mobile */}
          <div className="pt-2 border-t border-surface-border/50">
            <div className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-primary-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Labs & Ferramentas
            </div>
            <div className="grid grid-cols-1 gap-1 mt-1">
              <Link
                href="/daily"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                Desafio do Dia (Daily Quest)
              </Link>
              <Link
                href="/ui-challenges"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Palette className="w-4 h-4 text-pink-400" />
                Frontend Pixel-Perfect
              </Link>
              <Link
                href="/playground"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <SquareCode className="w-4 h-4 text-orange-400" />
                Web Playground
              </Link>
              <Link
                href="/visualizer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Zap className="w-4 h-4 text-primary-400" />
                Visualizador de Algoritmos
              </Link>
              <Link
                href="/flashcards"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                Flashcards Anki
              </Link>
              <Link
                href="/terminal"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                Terminal Linux & Git
              </Link>
              <Link
                href="/sql-playground"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Database className="w-4 h-4 text-cyan-400" />
                SQL Playground
              </Link>
              <Link
                href="/cheatsheets"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                CheatSheets & DevDocs
              </Link>
              <Link
                href="/debug-clinic"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Bug className="w-4 h-4 text-rose-400" />
                Debug Clinic (Erros)
              </Link>
              <Link
                href="/videos"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <Video className="w-4 h-4 text-red-400" />
                Video Hub & Aulas
              </Link>
              <Link
                href="/snippets"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 text-sm text-slate-300 hover:text-white flex items-center gap-2 rounded-lg hover:bg-white/5"
              >
                <FileCode2 className="w-4 h-4 text-emerald-400" />
                Snippet Vault de Produção
              </Link>
            </div>
          </div>

          {session ? (
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-400 hover:bg-white/5 rounded-lg"
            >
              Meu Perfil ({session.user?.name})
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-primary-400 hover:bg-white/5 rounded-lg"
            >
              Entrar / Criar Conta
            </Link>
          )}

          <div className="pt-3 border-t border-surface-border flex flex-col gap-2">
            <Link href="/challenges" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                <Sparkles className="w-4 h-4" />
                Explorar Desafios
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
