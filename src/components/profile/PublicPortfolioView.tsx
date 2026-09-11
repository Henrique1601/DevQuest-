"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Shield,
  Award,
  Flame,
  ExternalLink,
  Code2,
  Calendar,
  CheckCircle2,
  Share2,
  Sparkles,
  Trophy,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { ActivityHeatmap } from "@/components/daily/ActivityHeatmap";
import { generateAnnualHeatmapData } from "@/lib/data/dailyQuests";

interface PublicPortfolioViewProps {
  username: string;
}

export function PublicPortfolioView({ username }: PublicPortfolioViewProps) {
  const [copied, setCopied] = useState(false);
  const [badgeCopied, setBadgeCopied] = useState(false);
  const [heatmapDays] = useState(generateAnnualHeatmapData());

  // Dados do desenvolvedor (mock dinâmico com base no username)
  const isHenrique = username.toLowerCase().includes("henrique") || username === "henrique_dev";
  const displayName = isHenrique ? "Henrique Silva" : `@${username}`;
  const bio = "Desenvolvedor Full Stack apaixonado por arquiteturas modernas, React 19, Next.js, algoritmos eficientes e resolução de problemas.";
  const avatarUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80";

  const skills = [
    { name: "JavaScript & TypeScript", level: 95, color: "from-cyan-500 to-blue-500" },
    { name: "React 19 & Next.js 16", level: 92, color: "from-blue-500 to-indigo-500" },
    { name: "Estruturas de Dados (Pilhas, Filas, Big-O)", level: 88, color: "from-amber-500 to-orange-500" },
    { name: "SQL & PostgreSQL (Neon)", level: 85, color: "from-emerald-500 to-teal-500" },
    { name: "CSS Grid & Flexbox Moderno", level: 94, color: "from-pink-500 to-rose-500" },
  ];

  const badges = [
    { title: "Mestre das Pilhas", desc: "Completou todos os desafios de Stack LIFO", icon: "🥞" },
    { title: "Aprovado no Nubank", desc: "Passou no teste técnico de Idempotência", icon: "🟣" },
    { title: "Ofensiva de Fogo", desc: "Mais de 15 dias consecutivos codando", icon: "🔥" },
    { title: "Liga Diamante", desc: "Entre os top desenvolvedores da temporada", icon: "💎" },
  ];

  const projects = [
    {
      title: "Calculadora Neumórfica & Histórico",
      desc: "Manipulação de DOM e LocalStorage com design neumórfico moderno.",
      slug: "calculadora-neumorfica",
      github: "https://github.com/Henrique1601/calculadora-neumorfica"
    },
    {
      title: "Gerador de Senhas com Entropia",
      desc: "Cálculo de força de senha, bits de entropia e criptografia no browser.",
      slug: "gerador-senhas-entropia",
      github: "https://github.com/Henrique1601/gerador-senhas-entropia"
    },
    {
      title: "Processador de Transações Idempotente",
      desc: "API de pagamentos com prevenção de duplicatas e concorrência.",
      slug: "processador-transacoes",
      github: "https://github.com/Henrique1601/processador-transacoes"
    }
  ];

  const handleCopyShareUrl = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyBadgeMarkdown = () => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const badgeMd = `[![DevQuest Stats](${origin}/api/badge/${username})](${origin}/u/${username})`;
      navigator.clipboard.writeText(badgeMd);
      setBadgeCopied(true);
      setTimeout(() => setBadgeCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
      {/* Header do Perfil com Badges e Compartilhamento */}
      <div className="relative bg-gradient-to-r from-surface via-[#0C1222] to-surface border border-surface-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-cyan-400 shadow-glow"
            />
            <div className="space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white">{displayName}</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  DEV PRO
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">@{username} • Full Stack Software Engineer</p>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">{bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyBadgeMarkdown}
              className="font-mono text-xs gap-1.5 border-cyan-500/30 text-cyan-300"
              title="Copiar badge SVG para o README do GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{badgeCopied ? "Badge Copiado!" : "GitHub Badge"}</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCopyShareUrl} className="font-mono text-xs gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copiado!" : "Copiar Perfil"}</span>
            </Button>
            <Link href={`/certificate/DQ-2026-NUBANK-9482`}>
              <Button variant="primary" size="sm" className="font-mono text-xs gap-1.5 shadow-glow">
                <Award className="w-3.5 h-3.5" />
                <span>Certificado</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-surface-border font-mono text-xs">
          <div className="bg-[#05070E] p-3 rounded-2xl border border-surface-border flex flex-col items-center sm:items-start">
            <span className="text-slate-500 text-[10px] uppercase">Pontuação Total</span>
            <span className="text-base font-extrabold text-primary-400">2.850 XP</span>
          </div>
          <div className="bg-[#05070E] p-3 rounded-2xl border border-surface-border flex flex-col items-center sm:items-start">
            <span className="text-slate-500 text-[10px] uppercase">Liga Semanal</span>
            <span className="text-base font-extrabold text-amber-400">Liga Diamante</span>
          </div>
          <div className="bg-[#05070E] p-3 rounded-2xl border border-surface-border flex flex-col items-center sm:items-start">
            <span className="text-slate-500 text-[10px] uppercase">Ofensiva Ativa</span>
            <span className="text-base font-extrabold text-amber-500 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current" />
              18 Dias
            </span>
          </div>
          <div className="bg-[#05070E] p-3 rounded-2xl border border-surface-border flex flex-col items-center sm:items-start">
            <span className="text-slate-500 text-[10px] uppercase">Desafios Resolvidos</span>
            <span className="text-base font-extrabold text-cyan-300">47 Concluídos</span>
          </div>
        </div>
      </div>

      {/* Heatmap de Atividade Anual */}
      <ActivityHeatmap days={heatmapDays} currentStreak={18} totalSolved={47} />

      {/* Grid: Matriz de Habilidades & Conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Habilidades Técnicas */}
        <div className="bg-surface/70 border border-surface-border rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span>Matriz de Competências Técnicas</span>
          </h2>

          <div className="space-y-3 pt-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">{skill.name}</span>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conquistas & Badges */}
        <div className="bg-surface/70 border border-surface-border rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Conquistas Desbloqueadas</span>
          </h2>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {badges.map((b, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#060912] border border-surface-border hover:border-slate-600 transition-all space-y-1"
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-bold text-white">{b.title}</div>
                <div className="text-[10px] text-slate-400 leading-relaxed">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projetos Práticos Guiados Concluídos */}
      <div className="bg-surface/70 border border-surface-border rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Projetos de Portfólio Verificados</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">{projects.length} projetos validados</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#060912] border border-surface-border hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <h3 className="text-sm font-bold text-white">{p.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-surface-border/60">
                <Link href={`/projects/${p.slug}`} className="text-[11px] font-mono text-cyan-400 hover:text-white flex items-center gap-1">
                  <span>Ver Especificação</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Código</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
