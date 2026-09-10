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
  SquareCode
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
            <Trophy className="w-4 h-4" />
            Arena de Código
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
              <div className="absolute top-full left-0 w-64 p-2 bg-[#0A0E17]/95 border border-surface-border rounded-2xl shadow-2xl backdrop-blur-xl space-y-1 animate-fade-in z-50">
                <Link
                  href="/playground"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 group-hover:scale-105 transition-transform">
                    <SquareCode className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Web Playground</div>
                    <div className="text-[11px] text-slate-500">Sandbox HTML, CSS e JS</div>
                  </div>
                </Link>

                <Link
                  href="/visualizer"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20 group-hover:scale-105 transition-transform">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Visualizador de Algoritmos</div>
                    <div className="text-[11px] text-slate-500">Busca, Ordenação e Pilhas</div>
                  </div>
                </Link>

                <Link
                  href="/flashcards"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Flashcards Anki</div>
                    <div className="text-[11px] text-slate-500">Repetição espaçada 3D</div>
                  </div>
                </Link>

                <Link
                  href="/terminal"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">Terminal Linux & Git</div>
                    <div className="text-[11px] text-slate-500">Shell interativo e missões</div>
                  </div>
                </Link>

                <Link
                  href="/sql-playground"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-hover text-slate-300 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">SQL Playground</div>
                    <div className="text-[11px] text-slate-500">Queries e desafios em tabelas</div>
                  </div>
                </Link>
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

          {/* Seção Labs Mobile */}
          <div className="pt-2 border-t border-surface-border/50">
            <div className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-primary-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Labs & Prática
            </div>
            <div className="grid grid-cols-1 gap-1 mt-1">
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
