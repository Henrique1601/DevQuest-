"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  User,
  Trophy,
  Award,
  Terminal,
  FolderGit2,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockChallenges } from "@/lib/data/challenges";
import { mockProjects } from "@/lib/data/projects";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [solvedChallengeIds, setSolvedChallengeIds] = useState<string[]>([]);
  const [submittedProjects, setSubmittedProjects] = useState<{ slug: string; url: string }[]>([]);

  useEffect(() => {
    // Carrega desafios resolvidos do localStorage
    const savedChallenges = localStorage.getItem("devquest_solved_challenges");
    if (savedChallenges) {
      try {
        setSolvedChallengeIds(JSON.parse(savedChallenges));
      } catch {}
    }

    // Carrega projetos submetidos
    const subs: { slug: string; url: string }[] = [];
    mockProjects.forEach((proj) => {
      const url = localStorage.getItem(`devquest_sub_${proj.slug}`);
      if (url) {
        subs.push({ slug: proj.slug, url });
      }
    });
    setSubmittedProjects(subs);
  }, []);

  // Calcula XP total
  const solvedChallenges = mockChallenges.filter((c) => solvedChallengeIds.includes(c.id));
  const challengesXp = solvedChallenges.reduce((acc, c) => acc + c.xp, 0);
  const projectsXp = submittedProjects.length * 250;
  const totalXp = 100 + challengesXp + projectsXp; // 100 XP inicial de boas-vindas

  // Calcula Nível (cada 200 XP = 1 nível)
  const currentLevel = Math.floor(totalXp / 200) + 1;
  const xpInCurrentLevel = totalXp % 200;
  const levelProgressPercentage = Math.round((xpInCurrentLevel / 200) * 100);

  const userName = session?.user?.name || "Desenvolvedor Explorer";
  const userEmail = session?.user?.email || "aluno@devquest.com";
  const userImage = session?.user?.image;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Banner Superior do Perfil */}
      <div className="p-8 rounded-3xl bg-surface/90 border border-surface-border relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary-500 to-accent-500 p-0.5 shadow-glow shrink-0">
              <div className="w-full h-full bg-background rounded-[14px] overflow-hidden flex items-center justify-center text-white">
                {userImage ? (
                  <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary-400" />
                )}
              </div>
            </div>

            {/* Informações Básicas */}
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  {userName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  Nível {currentLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">{userEmail}</p>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="primary" className="text-[10px]">
                  Aluno DevQuest
                </Badge>
                <Badge variant="accent" className="text-[10px]">
                  {submittedProjects.length > 0 ? "Criador de Projetos" : "Em Formação"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Botão de Logout */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-slate-400 hover:text-rose-400 font-mono text-xs border border-surface-border"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            <span>Sair da Conta</span>
          </Button>
        </div>

        {/* Barra de XP & Nível */}
        <div className="mt-8 pt-6 border-t border-surface-border/70 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              Experiência: {totalXp} XP acumulados
            </span>
            <span className="text-primary-400">
              {xpInCurrentLevel} / 200 XP para o Nível {currentLevel + 1}
            </span>
          </div>

          <div className="w-full h-3 bg-[#070A10] rounded-full overflow-hidden border border-surface-border">
            <div
              className="h-full bg-gradient-to-r from-primary-500 via-cyan-400 to-accent-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${levelProgressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid de Seções do Perfil */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desafios Resolvidos (6 colunas) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary-400" />
              <span>Desafios Concluídos ({solvedChallenges.length})</span>
            </h2>
            <Link href="/challenges">
              <Button variant="ghost" size="sm" className="text-xs font-mono text-primary-400">
                <span>Ir para a Arena</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {solvedChallenges.length === 0 ? (
            <div className="p-8 rounded-2xl bg-surface/40 border border-surface-border text-center space-y-3">
              <Terminal className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400">
                Você ainda não resolveu nenhum desafio de algoritmo.
              </p>
              <Link href="/challenges">
                <Button variant="outline" size="sm">
                  Resolver primeiro desafio (+50 XP)
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {solvedChallenges.map((chal) => (
                <div
                  key={chal.id}
                  className="p-4 rounded-xl bg-surface/80 border border-surface-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-sm font-bold text-white">{chal.title}</div>
                      <div className="text-xs font-mono text-slate-400 uppercase">{chal.category}</div>
                    </div>
                  </div>
                  <Badge variant="accent" className="font-mono text-xs">
                    +{chal.xp} XP
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projetos Submetidos (6 colunas) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-accent-400" />
              <span>Projetos do Portfólio ({submittedProjects.length})</span>
            </h2>
            <Link href="/#projetos">
              <Button variant="ghost" size="sm" className="text-xs font-mono text-accent-400">
                <span>Ver Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {submittedProjects.length === 0 ? (
            <div className="p-8 rounded-2xl bg-surface/40 border border-surface-border text-center space-y-3">
              <FolderGit2 className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-400">
                Nenhum projeto submetido até o momento.
              </p>
              <Link href="/#projetos">
                <Button variant="outline" size="sm">
                  Explorar Projetos (+250 XP cada)
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {submittedProjects.map((sub) => {
                const proj = mockProjects.find((p) => p.slug === sub.slug);
                return (
                  <div
                    key={sub.slug}
                    className="p-4 rounded-xl bg-surface/80 border border-surface-border flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">
                        {proj ? proj.title : sub.slug}
                      </div>
                      <a
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-primary-400 hover:text-primary-300 flex items-center gap-1 mt-0.5 truncate max-w-xs"
                      >
                        <span className="truncate">{sub.url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                    <Badge variant="beginner" className="shrink-0 text-xs">
                      Submetido
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
