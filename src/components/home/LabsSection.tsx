"use client";

import React from "react";
import Link from "next/link";
import {
  SquareCode,
  Zap,
  Sparkles,
  Terminal,
  Database,
  ArrowRight,
  Flame,
  CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const LAB_TOOLS = [
  {
    slug: "/playground",
    title: "Playground Web Livre",
    tagline: "Sandbox Frontend em Tempo Real",
    description: "Editor integrado para HTML, CSS e JavaScript com visualização imediata em iframe seguro, captura de console e exportação.",
    icon: SquareCode,
    badge: "Sandbox",
    accentColor: "from-orange-500/20 to-amber-500/10 border-orange-500/30 text-orange-400"
  },
  {
    slug: "/visualizer",
    title: "Visualizador de Algoritmos",
    tagline: "Busca Binária, Ordenações e Pilhas",
    description: "Entenda o que acontece por baixo dos panos com animações passo a passo, ponteiros dinâmicos e análise de complexidade Big-O.",
    icon: Zap,
    badge: "Big-O & Estruturas",
    accentColor: "from-primary-500/20 to-indigo-500/10 border-primary-500/30 text-primary-400"
  },
  {
    slug: "/flashcards",
    title: "Flashcards Estilo Anki",
    tagline: "Repetição Espaçada 3D",
    description: "Fixe conceitos de JavaScript, TypeScript, React, SQL e Git com rotação de cartões 3D, cálculo de streak e pontuação de retenção.",
    icon: Sparkles,
    badge: "Memorização Ativa",
    accentColor: "from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400"
  },
  {
    slug: "/terminal",
    title: "Terminal Linux & Git",
    tagline: "Shell UNIX no Navegador",
    description: "Emulador interativo de linha de comando com sistema de arquivos virtual em memória, fluxo de branches Git e missões gamificadas.",
    icon: Terminal,
    badge: "DevOps & CLI",
    accentColor: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400"
  },
  {
    slug: "/sql-playground",
    title: "SQL Playground Interativo",
    tagline: "Banco Relacional Simulado",
    description: "Escreva queries SELECT, JOINs, agregações e resolva desafios práticos com visualização em tabelas e feedback imediato.",
    icon: Database,
    badge: "Postgres Mock",
    accentColor: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400"
  },
  {
    slug: "/cheatsheets",
    title: "DevDocs & CheatSheets",
    tagline: "Estilo W3Schools & MDN",
    description: "Referência rápida e interativa para JavaScript, CSS Flexbox, SQL, Git e HTTP com botão 'Testar no Playground'.",
    icon: SquareCode,
    badge: "DevDocs",
    accentColor: "from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400"
  },
  {
    slug: "/debug-clinic",
    title: "Debug Clinic & Erros",
    tagline: "Estilo Stack Overflow",
    description: "Central de diagnóstico dos erros mais comuns com sintoma, explicação e comparador visual Antes ❌ vs Depois ✅.",
    icon: Zap,
    badge: "Diagnóstico",
    accentColor: "from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400"
  },
  {
    slug: "/videos",
    title: "Video Hub & Aulas",
    tagline: "Estilo YouTube Academy",
    description: "Aulas aprofundadas com capítulos sincronizados cobrindo React 19, Next.js, Drizzle, SQL e entrevistas técnicas.",
    icon: Sparkles,
    badge: "Aulas em Vídeo",
    accentColor: "from-red-500/20 to-rose-500/10 border-red-500/30 text-red-400"
  },
  {
    slug: "/snippets",
    title: "Snippet Vault de Produção",
    tagline: "Custom Hooks & Utilitários",
    description: "Biblioteca de códigos prontos para copiar: useDebounce, useLocalStorage, validadores de CPF, rate limits e mais.",
    icon: Terminal,
    badge: "Helpers Prontos",
    accentColor: "from-emerald-500/20 to-green-500/10 border-emerald-500/30 text-emerald-400"
  }
];

export function LabsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#05070E] border-t border-surface-border">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DevQuest Labs & Prática</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ferramentas Práticas para Acelerar seu Aprendizado
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Vá além da teoria com ambientes interativos focados nas principais habilidades exigidas pelo mercado de tecnologia.
          </p>
        </div>

        {/* Grade de Ferramentas dos Labs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={tool.slug}
                className="group p-6 rounded-3xl bg-surface/70 border border-surface-border hover:border-primary-500/50 hover:bg-surface/90 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-glow backdrop-blur-sm relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.accentColor} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-surface border border-surface-border text-slate-400">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors flex items-center gap-2">
                      {tool.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                      {tool.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-surface-border/50 flex items-center justify-between text-xs font-mono font-semibold text-primary-400 group-hover:text-primary-300">
                  <span>Acessar Laboratório</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
