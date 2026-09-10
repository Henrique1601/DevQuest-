"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  RefreshCw,
  Keyboard,
  Code2,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { mockDailyTips } from "@/lib/data/dailyTips";
import Link from "next/link";

export function DailyTipWidget() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentTip = mockDailyTips[currentIndex];

  const handleNextTip = () => {
    setCurrentIndex((prev) => (prev + 1) % mockDailyTips.length);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-surface to-surface border border-amber-500/20 p-6 sm:p-8 shadow-2xl">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>Dica de Engenharia #{currentIndex + 1}</span>
            </span>

            <span className="text-xs font-mono text-slate-400 px-2.5 py-0.5 rounded-lg bg-surface border border-surface-border">
              {currentTip.category}
            </span>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {currentTip.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
              {currentTip.summary}
            </p>
          </div>

          {currentTip.shortcut && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090D16] border border-amber-500/30 font-mono text-xs text-amber-300">
              <Keyboard className="w-4 h-4 text-amber-400" />
              <span>Atalho:</span>
              <kbd className="px-2 py-0.5 rounded bg-surface border border-slate-700 text-white font-bold">
                {currentTip.shortcut}
              </kbd>
            </div>
          )}

          {currentTip.codeSnippet && (
            <div className="rounded-2xl bg-[#060910] border border-surface-border p-3 overflow-x-auto">
              <pre className="text-xs font-mono text-amber-200/90 leading-relaxed">
                <code>{currentTip.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Ações do Widget */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <button
            onClick={handleNextTip}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-lg hover:shadow-amber-500/25 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Outra Dica</span>
          </button>

          <Link
            href="/cheatsheets"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-surface hover:bg-surface-hover border border-surface-border text-slate-300 hover:text-white font-medium text-xs transition-all"
          >
            <BookOpen className="w-4 h-4 text-primary-400" />
            <span>Ver CheatSheets</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
