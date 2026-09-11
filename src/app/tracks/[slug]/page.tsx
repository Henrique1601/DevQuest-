import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Terminal,
  Layout,
  Server,
  Flame,
  Bot,
  CheckCircle2,
  FolderGit2,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { mockTracks } from "@/lib/data/tracks";
import { mockProjects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface TrackPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockTracks.map((track) => ({
    slug: track.slug,
  }));
}

export async function generateMetadata({ params }: TrackPageProps): Promise<Metadata> {
  const { slug } = await params;
  const track = mockTracks.find((t) => t.slug === slug);
  if (!track) return { title: "Trilha não encontrada | DevQuest" };

  return {
    title: `${track.title} | DevQuest`,
    description: track.description,
  };
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = mockTracks.find((t) => t.slug === slug);

  if (!track) {
    notFound();
  }

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case "Terminal":
        return <Terminal className="w-6 h-6" />;
      case "Layout":
        return <Layout className="w-6 h-6" />;
      case "Server":
        return <Server className="w-6 h-6" />;
      case "Bot":
        return <Bot className="w-6 h-6" />;
      case "Flame":
      default:
        return <Flame className="w-6 h-6" />;
    }
  };

  const finalProjectModule = track.modules.find((m) => m.projectSlug);
  const finalProject = finalProjectModule
    ? mockProjects.find((p) => p.slug === finalProjectModule.projectSlug)
    : null;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Voltar */}
      <div className="mb-8">
        <Link
          href="/#trilhas"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para as Trilhas de Estudo</span>
        </Link>
      </div>

      {/* Hero da Trilha */}
      <div className="p-8 sm:p-12 rounded-3xl bg-surface/90 border border-surface-border relative overflow-hidden mb-12 shadow-2xl">
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${track.color} rounded-full blur-3xl opacity-20 pointer-events-none`} />

        <div className="relative z-10 space-y-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className={`p-3 rounded-2xl border bg-gradient-to-br ${track.color} text-white`}>
              {getTrackIcon(track.iconName)}
            </div>
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
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-surface px-3 py-1 rounded-full border border-surface-border">
              <Clock className="w-3.5 h-3.5" />
              {track.totalHours} horas estimadas
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 bg-surface px-3 py-1 rounded-full border border-surface-border">
              <BookOpen className="w-3.5 h-3.5" />
              {track.modulesCount} Módulos
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {track.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {track.description}
          </p>
        </div>
      </div>

      {/* Grade de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Linha do Tempo de Módulos (8 colunas) */}
        <div className="lg:col-span-8 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary-400" />
            <span>Grade Curricular e Módulos</span>
          </h2>

          <div className="space-y-4">
            {track.modules.map((mod, index) => {
              const hasProject = !!mod.projectSlug;

              return (
                <div
                  key={mod.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    hasProject
                      ? "bg-gradient-to-r from-primary-950/40 via-surface-card to-accent-950/40 border-primary-500/40 shadow-glow"
                      : "bg-surface-card border-surface-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-xl bg-surface border border-surface-border flex items-center justify-center font-mono font-bold text-xs text-primary-400 shrink-0 mt-0.5">
                        {index + 1}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-bold text-white">
                            {mod.title}
                          </h3>
                          {hasProject && (
                            <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Projeto Prático
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-300">
                          {mod.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-slate-400 shrink-0">
                      {mod.lessonsCount} {mod.lessonsCount === 1 ? "aula" : "aulas"}
                    </span>
                  </div>

                  {/* Se tem projeto prático associado */}
                  {hasProject && (
                    <div className="mt-4 pt-4 border-t border-surface-border/60 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Aplique o conhecimento deste módulo criando um projeto real.
                      </span>
                      <Link href={`/projects/${mod.projectSlug}`}>
                        <Button variant="primary" size="sm" className="font-mono text-xs">
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>Abrir Projeto</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Lado Direito: Card do Projeto Final & Resumo (4 colunas) */}
        <div className="lg:col-span-4 space-y-6">
          {finalProject && (
            <div className="p-6 rounded-2xl bg-surface/90 border border-surface-border space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <FolderGit2 className="w-5 h-5 text-primary-400" />
                <span>Projeto Prático da Trilha</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  {finalProject.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {finalProject.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {finalProject.tags.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#070A10] text-slate-300 border border-surface-border"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <Link href={`/projects/${finalProject.slug}`} className="block w-full">
                  <Button variant="primary" size="md" className="w-full">
                    <span>Iniciar Projeto</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Dicas de Estudo */}
          <div className="p-6 rounded-2xl bg-surface/60 border border-surface-border space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Como aproveitar esta trilha:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed list-disc pl-4">
              <li>Dedique ao menos 1 hora por dia para garantir a consistência.</li>
              <li>Não avance para o próximo módulo antes de exercitar o código no editor.</li>
              <li>Ao final, implemente o projeto do zero e publique o repositório no seu GitHub.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
