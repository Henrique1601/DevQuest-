import React from "react";
import Link from "next/link";
import { Sparkles, Terminal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-r from-primary-900/40 via-surface to-accent-900/40 border border-primary-500/30 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-center">
        {/* Glow Decorativo */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comece gratuitamente agora</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pronto para transformar conhecimento em código de verdade?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Abra a Arena de Desafios, pratique algoritmos no editor ou escolha seu primeiro projeto para o portfólio.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/challenges">
              <Button variant="primary" size="lg" className="group">
                <Terminal className="w-5 h-5" />
                Acessar Arena de Desafios
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#trilhas">
              <Button variant="glass" size="lg">
                Explorar Trilhas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
