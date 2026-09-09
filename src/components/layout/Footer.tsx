import React from "react";
import Link from "next/link";
import { Code2, Database, Zap } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface/40 backdrop-blur-md pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Coluna 1: Info da Plataforma */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">DevQuest</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Plataforma brasileira e aberta dedicada à formação prática de desenvolvedores de software, com projetos do mundo real, desafios de algoritmos no navegador e arquitetura moderna.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Sistemas Operacionais
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-primary-500/10 text-primary-400 border border-primary-500/20">
                <Database className="w-3 h-3" />
                Neon Postgres
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-accent-500/10 text-accent-400 border border-accent-500/20">
                <Zap className="w-3 h-3" />
                Vercel Ready
              </span>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Plataforma</h4>
            <ul className="space-y-2">
              <li><Link href="/#trilhas" className="hover:text-primary-400 transition-colors">Trilhas de Estudo</Link></li>
              <li><Link href="/#projetos" className="hover:text-primary-400 transition-colors">Projetos Básico ao Avançado</Link></li>
              <li><Link href="/#desafios" className="hover:text-primary-400 transition-colors">Desafios de Código</Link></li>
              <li><Link href="/challenges" className="hover:text-accent-400 transition-colors">Arena Interativa</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Tecnologias */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Stack & Engenharia</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-slate-300">Next.js 15 (App Router)</span></li>
              <li><span className="hover:text-slate-300">Neon Serverless Postgres</span></li>
              <li><span className="hover:text-slate-300">Drizzle ORM & Migrations</span></li>
              <li><span className="hover:text-slate-300">Tailwind CSS & GSAP Engine</span></li>
            </ul>
          </div>
        </div>

        {/* Linha Inferior */}
        <div className="pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DevQuest. Feito com paixão para desenvolvedores em evolução.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 flex items-center gap-1">
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
