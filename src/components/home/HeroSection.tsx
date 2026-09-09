"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Sparkles, Terminal, ArrowRight, CheckCircle2, Play, Cpu, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline orquestrada de entrada
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".hero-description",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-editor",
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9 },
          "-=0.5"
        );

      // Efeito de pulso de luz de fundo
      gsap.to(".hero-glow", {
        scale: 1.15,
        opacity: 0.7,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-36 pb-20 md:pt-44 md:pb-32 overflow-hidden"
    >
      {/* Luzes de Fundo (Glow) */}
      <div className="hero-glow absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary-500/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-accent-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Lado Esquerdo: Mensagem e Ação */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge de Destaque */}
            <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-card border border-surface-border/80 shadow-sm backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-primary-400 animate-ping" />
              <span className="text-xs font-mono font-medium text-slate-300">
                Plataforma de Estudos Hands-on
              </span>
              <span className="text-[10px] text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full border border-primary-500/20">
                Next.js 15 & Neon
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Aprenda Programação{" "}
              <span className="bg-gradient-to-r from-primary-400 via-cyan-300 to-accent-400 bg-clip-text text-transparent">
                Construindo Projetos Reais
              </span>{" "}
              e Vencendo Desafios.
            </h1>

            {/* Descrição */}
            <p className="hero-description text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Chega de tutoriais passivos. Evolua do nível iniciante ao avançado com trilhas guiadas, arquitetura de software sólida, e uma arena com editor de código interativo.
            </p>

            {/* Botões de Ação */}
            <div className="hero-buttons flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/challenges">
                <Button variant="primary" size="lg" className="group">
                  <Terminal className="w-5 h-5" />
                  Ir para a Arena de Desafios
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#projetos">
                <Button variant="secondary" size="lg">
                  Ver Catálogo de Projetos
                </Button>
              </Link>
            </div>

            {/* Selos de Confiança */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Código 100% Prático
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary-400" />
                Execução Instantânea no Browser
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-400" />
                Do Básico ao Avançado
              </div>
            </div>
          </div>

          {/* Lado Direito: Mockup Interativo de Editor */}
          <div className="lg:col-span-5">
            <div className="hero-editor relative rounded-2xl bg-surface-card/90 backdrop-blur-xl border border-surface-border shadow-2xl overflow-hidden">
              {/* Barra do Editor (Window Top) */}
              <div className="bg-surface px-4 py-3 border-b border-surface-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-xs font-mono text-slate-400">solution.js</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Play className="w-3 h-3 fill-current" />
                  Executando
                </div>
              </div>

              {/* Conteúdo de Código Formatado */}
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed text-slate-300 overflow-x-auto space-y-1">
                <div>
                  <span className="text-accent-400">function</span>{" "}
                  <span className="text-primary-400">conquistarHabilidade</span>(
                  <span className="text-amber-300">dev</span>) {"{"}
                </div>
                <div className="pl-4 text-slate-400">
                  // Desafio: Transformar teoria em código funcional
                </div>
                <div className="pl-4">
                  <span className="text-accent-400">const</span>{" "}
                  <span className="text-slate-200">experiencia</span> = dev.projetos.
                  <span className="text-cyan-400">map</span>(p =&gt; p.concluir());
                </div>
                <div className="pl-4">
                  <span className="text-accent-400">const</span>{" "}
                  <span className="text-slate-200">desafiosVencidos</span> = dev.resolverDesafio();
                </div>
                <div className="pl-4">
                  <span className="text-accent-400">return</span> {"{"}
                </div>
                <div className="pl-8">
                  <span className="text-slate-300">nivel:</span>{" "}
                  <span className="text-emerald-400">&quot;Senior Ready&quot;</span>,
                </div>
                <div className="pl-8">
                  <span className="text-slate-300">prontoParaMercado:</span>{" "}
                  <span className="text-emerald-400">true</span>,
                </div>
                <div className="pl-4">{"}"};</div>
                <div>{"}"}</div>
              </div>

              {/* Painel Inferior de Teste Passado */}
              <div className="bg-surface/90 border-t border-surface-border p-4 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>3/3 Testes Aprovados</span>
                </div>
                <span className="text-slate-400">Tempo: 12ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
