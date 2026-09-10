"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, CheckCircle, ChevronRight, Search, X, Layers } from "lucide-react";
import { mockProjects } from "@/lib/data/projects";
import { ProjectDifficulty } from "@/types/project";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function ProjectsShowcase() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<ProjectDifficulty | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter((p) => {
    const matchesDifficulty = selectedDifficulty === "all" || p.difficulty === selectedDifficulty;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.tagline.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query));

    return matchesDifficulty && matchesSearch;
  });

  return (
    <section id="projetos" className="py-24 bg-surface/30 border-t border-surface-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="accent">Do Básico ao Avançado</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projetos do Mundo Real para o seu Portfólio
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Construa projetos completos com requisitos, arquitetura recomendada e passos detalhados.
            </p>
          </div>

          {/* Filtros de Dificuldade */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-surface border border-surface-border self-start md:self-auto">
            <button
              onClick={() => setSelectedDifficulty("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDifficulty === "all"
                  ? "bg-primary-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Todos ({mockProjects.length})
            </button>
            <button
              onClick={() => setSelectedDifficulty("beginner")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDifficulty === "beginner"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Iniciante
            </button>
            <button
              onClick={() => setSelectedDifficulty("intermediate")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDifficulty === "intermediate"
                  ? "bg-amber-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Intermediário
            </button>
            <button
              onClick={() => setSelectedDifficulty("advanced")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDifficulty === "advanced"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Avançado
            </button>
          </div>
        </div>

        {/* Barra de Pesquisa de Projetos */}
        <div className="max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tecnologia (React, Stripe, Neon, WebSocket...)"
            className="w-full bg-surface text-slate-200 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 placeholder:text-slate-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grid de Projetos */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-surface/40 border border-surface-border space-y-3">
            <Layers className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="text-slate-300 text-sm">
              Nenhum projeto encontrado para os termos pesquisados.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedDifficulty("all");
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="flex flex-col justify-between h-full group">
                <div className="space-y-4">
                  {/* Metadados Superiores */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant={
                        project.difficulty === "beginner"
                          ? "beginner"
                          : project.difficulty === "intermediate"
                          ? "intermediate"
                          : "advanced"
                      }
                    >
                      {project.difficulty === "beginner"
                        ? "Iniciante"
                        : project.difficulty === "intermediate"
                        ? "Intermediário"
                        : "Avançado"}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{project.estimatedHours}h est.
                    </span>
                  </div>

                  {/* Título & Tagline */}
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tags Tecnológicas */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-surface-hover text-slate-300 text-[11px] font-mono border border-surface-border/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Lista de Features Principais */}
                  <div className="space-y-1.5 pt-3 border-t border-surface-border">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
                      O que você vai construir:
                    </span>
                    <ul className="space-y-1">
                      {project.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Botão de Ver Detalhes */}
                <div className="pt-6 mt-6 border-t border-surface-border">
                  <Link href={`/projects/${project.slug}`} className="w-full block">
                    <Button variant="secondary" size="sm" className="w-full group-hover:border-primary-500/40 group-hover:text-white">
                      <span>Ver Requisitos & Etapas</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
