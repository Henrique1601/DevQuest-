"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log do erro para auditoria (Sentry, Datadog ou Console)
    console.error("Global Error Boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
          <AlertOctagon className="w-4 h-4" />
          <span>FALHA NA EXECUÇÃO // RUNTIME EXCEPTION</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Ocorreu um erro inesperado
        </h1>

        <div className="p-4 rounded-2xl bg-[#080C16] border border-surface-border font-mono text-xs text-left space-y-2 shadow-2xl">
          <div className="flex items-center gap-2 text-slate-500 border-b border-surface-border/60 pb-2">
            <Terminal className="w-3.5 h-3.5 text-rose-400" />
            <span>stack_trace_boundary</span>
          </div>
          <p className="text-rose-300 font-mono text-[11px] break-all leading-relaxed">
            {error.message || "Erro desconhecido durante o ciclo de renderização."}
          </p>
          {error.digest && (
            <div className="text-[10px] text-slate-500 pt-1">
              Error Digest: <code className="text-slate-400">{error.digest}</code>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            className="font-mono text-xs gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </Button>

          <Link href="/">
            <Button
              variant="secondary"
              size="md"
              className="font-mono text-xs gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Voltar ao Início</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}