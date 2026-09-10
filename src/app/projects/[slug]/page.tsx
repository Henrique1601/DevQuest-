import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  Clock,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FolderTree,
  Lightbulb
} from "lucide-react";
import { mockProjects } from "@/lib/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectTaskChecklist } from "@/components/projects/ProjectTaskChecklist";
import { ProjectSubmissionCard } from "@/components/projects/ProjectSubmissionCard";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) return { title: "Projeto não encontrado | DevQuest" };

  return {
    title: `${project.title} | DevQuest`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = mockProjects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = mockProjects[projectIndex];
  const prevProject = projectIndex > 0 ? mockProjects[projectIndex - 1] : null;
  const nextProject = projectIndex < mockProjects.length - 1 ? mockProjects[projectIndex + 1] : null;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Barra Superior / Breadcrumbs */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/#projetos"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Catálogo de Projetos</span>
        </Link>

        <div className="flex items-center gap-2">
          {prevProject && (
            <Link href={`/projects/${prevProject.slug}`} title={prevProject.title}>
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Button>
            </Link>
          )}
          {nextProject && (
            <Link href={`/projects/${nextProject.slug}`} title={nextProject.title}>
              <Button variant="ghost" size="sm">
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Hero do Projeto */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-wrap items-center gap-3">
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
          <span className="text-xs uppercase tracking-wider font-mono text-primary-400 bg-primary-500/10 px-2.5 py-0.5 rounded-full border border-primary-500/20">
            {project.category}
          </span>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Estimativa: ~{project.estimatedHours} horas de dedicação
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          {project.description}
        </p>

        {/* Tags de Tecnologias */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" />
            Stack:
          </span>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono text-slate-300 bg-surface px-3 py-1 rounded-lg border border-surface-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Grid Principal do Projeto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Lado Esquerdo: Requisitos e Features (5 colunas) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Card de Features */}
          <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span>Funcionalidades Requeridas</span>
            </div>
            <p className="text-xs text-slate-400">
              O que o seu projeto final precisa conter para ser considerado concluído:
            </p>
            <ul className="space-y-2.5 pt-1">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card de Pré-requisitos */}
          <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <BookOpen className="w-4 h-4 text-accent-400" />
              <span>Conhecimentos Pré-requisitos</span>
            </div>
            <p className="text-xs text-slate-400">
              Recomendamos dominar os seguintes tópicos antes de iniciar a codificação:
            </p>
            <ul className="space-y-2 pt-1">
              {project.prerequisites.map((pre, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0 mt-1.5" />
                  <span>{pre}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Submissão do Repositório */}
          <ProjectSubmissionCard
            projectSlug={project.slug}
            projectTitle={project.title}
          />
        </div>

        {/* Lado Direito: Checklist de Etapas Passo a Passo (7 colunas) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary-400" />
                <span>Roteiro de Implementação Passo a Passo</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Siga as etapas recomendadas, abra as dicas práticas e marque conforme for progredindo.
              </p>
            </div>
          </div>

          <ProjectTaskChecklist
            projectSlug={project.slug}
            steps={project.steps}
          />

          {/* Estrutura de Pastas Recomendada (se disponível) */}
          {project.recommendedFolderStructure && (
            <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <FolderTree className="w-4 h-4 text-cyan-400" />
                <span>Estrutura de Pastas Recomendada</span>
              </div>
              <p className="text-xs text-slate-400">
                Uma organização limpa para o seu repositório de projeto:
              </p>
              <div className="p-4 rounded-xl bg-[#05070B] border border-surface-border font-mono text-xs text-slate-200 overflow-x-auto">
                <pre className="whitespace-pre">{project.recommendedFolderStructure}</pre>
              </div>
            </div>
          )}

          {/* Dicas de Carreira e Boas Práticas (se disponível) */}
          {project.architectureTips && project.architectureTips.length > 0 && (
            <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <Lightbulb className="w-4 h-4" />
                <span>Dicas de Ouro para o seu Portfólio</span>
              </div>
              <p className="text-xs text-slate-400">
                Como valorizar este projeto no seu GitHub e entrevistas técnicas:
              </p>
              <ul className="space-y-2 pt-1">
                {project.architectureTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="text-amber-400 font-bold">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
