import React from "react";
import Link from "next/link";
import { Terminal, Layout, Server, Flame, Bot, Clock, BookOpen, ArrowRight } from "lucide-react";
import { mockTracks } from "@/lib/data/tracks";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function TracksPreview() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Terminal":
        return <Terminal className="w-5 h-5" />;
      case "Layout":
        return <Layout className="w-5 h-5" />;
      case "Server":
        return <Server className="w-5 h-5" />;
      case "Bot":
        return <Bot className="w-5 h-5" />;
      case "Flame":
      default:
        return <Flame className="w-5 h-5" />;
    }
  };

  return (
    <section id="trilhas" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Cabeçalho da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <Badge variant="primary">Roadmaps Estruturados</Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Trilhas de Aprendizado Passo a Passo
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Do raciocínio algorítmico básico à orquestração de bancos relacionais na nuvem e deploy na Vercel.
        </p>
      </div>

      {/* Grid de Trilhas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockTracks.map((track) => (
          <Card key={track.id} className="flex flex-col justify-between group">
            <div className="space-y-6">
              {/* Topo do Card */}
              <div className="flex items-start justify-between gap-4">
                <div className={`p-3.5 rounded-xl border bg-gradient-to-br ${track.color} text-white`}>
                  {getIcon(track.iconName)}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="font-mono">
                    <Clock className="w-3 h-3 mr-1" />
                    {track.totalHours}h
                  </Badge>
                  <Badge
                    variant={
                      track.level === "Iniciante"
                        ? "beginner"
                        : track.level === "Intermediário"
                        ? "intermediate"
                        : "advanced"
                    }
                  >
                    {track.level}
                  </Badge>
                </div>
              </div>

              {/* Informações da Trilha */}
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Módulos de Exemplo */}
              <div className="space-y-2 pt-2 border-t border-surface-border">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Módulos Inclusos ({track.modulesCount}):
                </span>
                <ul className="space-y-1.5">
                  {track.modules.slice(0, 3).map((mod) => (
                    <li key={mod.id} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500/70" />
                      <span className="truncate">{mod.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rodapé do Card */}
            <div className="pt-6 mt-6 border-t border-surface-border flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {track.modules.some(m => m.projectSlug) ? "Inclui Projeto Prático Final" : "Aulas & Desafios"}
              </span>
              <Link
                href={`/tracks/${track.slug}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors group-hover:translate-x-1"
              >
                Explorar Trilha
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
