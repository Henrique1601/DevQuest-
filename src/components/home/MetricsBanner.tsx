import React from "react";
import { FolderGit2, Flame, Award, Users } from "lucide-react";

export function MetricsBanner() {
  const metrics = [
    {
      icon: FolderGit2,
      value: "10+",
      label: "Projetos Guiados",
      detail: "Do básico ao avançado",
      color: "text-primary-400 bg-primary-500/10 border-primary-500/20",
    },
    {
      icon: Flame,
      value: "100%",
      label: "Prático no Navegador",
      detail: "Testes automatizados",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Award,
      value: "4",
      label: "Trilhas de Carreira",
      detail: "Frontend, Backend & Fullstack",
      color: "text-accent-400 bg-accent-500/10 border-accent-500/20",
    },
    {
      icon: Users,
      value: "Neon & Vercel",
      label: "Arquitetura Cloud",
      detail: "Stack moderna e escalável",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="border-y border-surface-border bg-surface/50 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors"
              >
                <div className={`p-3 rounded-xl border ${item.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
                    {item.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-200 mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
