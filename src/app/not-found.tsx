import React from "react";
import Link from "next/link";
import { Terminal, ArrowLeft, Zap, Sparkles, Home, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden">
      {/* Luz ambiente neon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-6 relative z-10">
        {/* Badge de Erro */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
          <ShieldAlert className="w-4 h-4" />
          <span>HTTP 404 // ROTA INEXISTENTE</span>
        </div>

        {/* 404 em Destaque */}
        <h1 className="text-7xl sm:text-9xl font-black tracking-tight text-white font-mono bg-gradient-to-b from-white via-slate-200 to-slate-600 bg-clip-text text-transparent">
          404
        </h1>

        <div className="p-4 rounded-2xl bg-[#080C16] border border-surface-border font-mono text-xs text-left space-y-2 shadow-2xl">
          <div className="flex items-center gap-2 text-slate-500 border-b border-surface-border/60 pb-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>sys_diagnostics_tracer.sh</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            <span className="text-rose-400">Exception:</span> A página solicitada não foi localizada no cluster DevQuest. O recurso pode ter sido refatorado ou o endereço digitado está incorreto.
          </p>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/">
            <Button variant="primary" size="md" className="font-mono text-xs gap-2">
              <Home className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Button>
          </Link>

          <Link href="/challenges">
            <Button variant="secondary" size="md" className="font-mono text-xs gap-2 border-cyan-500/30 text-cyan-300">
              <Zap className="w-4 h-4" />
              <span>Ir para a Arena</span>
            </Button>
          </Link>

          <Link href="/daily">
            <Button variant="ghost" size="md" className="font-mono text-xs gap-2 text-slate-400 hover:text-white">
              <Sparkles className="w-4 h-4" />
              <span>Desafio Diário</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}