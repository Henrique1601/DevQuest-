"use client";

import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";

interface ProjectSubmissionCardProps {
  projectSlug: string;
  projectTitle: string;
}

export function ProjectSubmissionCard({ projectSlug, projectTitle }: ProjectSubmissionCardProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(`devquest_sub_${projectSlug}`);
    if (saved) {
      setGithubUrl(saved);
      setIsSubmitted(true);
    }
  }, [projectSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = githubUrl.trim();
    if (!trimmed) {
      setError("Por favor, insira o link do seu repositório no GitHub.");
      return;
    }

    // Validação básica de URL do GitHub
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9._-]+(\/)?$/;
    if (!githubRegex.test(trimmed)) {
      setError("URL inválida. O formato deve ser: https://github.com/seu-usuario/seu-repositorio");
      return;
    }

    localStorage.setItem(`devquest_sub_${projectSlug}`, trimmed);
    setIsSubmitted(true);
  };

  const handleEdit = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="p-6 rounded-2xl bg-surface/90 border border-surface-border shadow-xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400 border border-primary-500/20">
          <GithubIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Submeta o seu Repositório
          </h3>
          <p className="text-xs text-slate-400">
            Concluiu o projeto {projectTitle}? Envie o link do GitHub para registrar no seu portfólio.
          </p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Projeto Submetido com Sucesso!</span>
            </div>
            <button
              onClick={handleEdit}
              className="text-xs text-slate-400 hover:text-white underline font-mono"
            >
              Alterar link
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-mono bg-[#070A10] p-3 rounded-lg border border-surface-border truncate">
            <span className="text-slate-300 truncate mr-2">{githubUrl}</span>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 flex items-center gap-1 shrink-0"
            >
              <span>Abrir</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="https://github.com/seu-usuario/seu-repositorio"
              className="flex-1 bg-[#070A10] text-slate-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 font-mono placeholder:text-slate-500"
            />
            <Button type="submit" variant="primary" size="md" className="shrink-0">
              <Send className="w-4 h-4" />
              <span>Submeter</span>
            </Button>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
