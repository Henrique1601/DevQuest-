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
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/#trilhas" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <BookOpen className="w-4 h-4 text-slate-400" />
            Trilhas
          </Link>
          <Link href="/#projetos" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Layers className="w-4 h-4 text-slate-400" />
            Projetos
          </Link>
          <Link href="/#desafios" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <Terminal className="w-4 h-4 text-slate-400" />
            Desafios
          </Link>
          <Link href="/challenges" className="flex items-center gap-1.5 text-accent-400 hover:text-accent-300 transition-colors">
            <Trophy className="w-4 h-4" />
            Arena de Código
          </Link>
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
