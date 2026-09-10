"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Crown,
  Medal,
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Shield,
  Zap,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  mockLeaderboardUsers,
  LEAGUE_TIERS,
  LeagueTier,
  LeaderboardUser
} from "@/lib/data/leaderboard";

export function LeaderboardView() {
  const [selectedLeague, setSelectedLeague] = useState<LeagueTier | "todas">("todas");

  // Usuário logado
  const currentUser = mockLeaderboardUsers.find((u) => u.isCurrentUser) || mockLeaderboardUsers[3];

  // Filtro
  const filteredUsers =
    selectedLeague === "todas"
      ? mockLeaderboardUsers
      : mockLeaderboardUsers.filter((u) => u.league === selectedLeague);

  // Top 3 do ranking geral
  const top3 = mockLeaderboardUsers.slice(0, 3);

  // XP para próxima liga
  const xpToNextLeague = 3000 - currentUser.xp;

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-amber-400">
              Ranking Global & Ligas de XP
            </span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30">
              Temporada 2026.1
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Hall da Fama dos Desenvolvedores
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Suba de liga resolvendo desafios, mantendo sua sequência diária (streak 🔥) e vencendo entrevistas técnicas simuladas.
          </p>
        </div>

        {/* Link para Desafios */}
        <div className="flex items-center gap-3">
          <Link href="/challenges">
            <Button variant="primary" size="md" className="font-mono text-xs gap-2 shadow-glow">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Ganhar XP na Arena</span>
            </Button>
          </Link>
          <Link href="/interviews">
            <Button variant="secondary" size="md" className="font-mono text-xs gap-2">
              <Target className="w-3.5 h-3.5" />
              <span>Entrevistas (+150 XP)</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Card de Progresso do Usuário Atual */}
      <div className="bg-gradient-to-r from-primary-500/10 via-surface to-accent-500/10 border border-primary-500/30 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-400 shadow-glow"
            />
            <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-surface border border-surface-border text-amber-400 text-xs">
              👑
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{currentUser.name}</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 border border-primary-500/30">
                Você
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">@{currentUser.username} • {currentUser.badge}</p>
            <div className="flex items-center gap-3 text-xs font-mono pt-1">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {currentUser.streak} dias seguidos
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-400 font-bold">
                {currentUser.challengesSolved} desafios resolvidos
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Próxima Liga */}
        <div className="w-full md:w-80 space-y-2 bg-[#060913] p-4 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Liga Atual: <strong className="text-amber-300">{currentUser.league}</strong>
            </span>
            <span className="text-primary-400 font-bold">{currentUser.xp} XP</span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (currentUser.xp / 3000) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Faltam {xpToNextLeague} XP para a <strong className="text-cyan-300">Liga Diamante</strong></span>
            <span>#4 no Geral</span>
          </div>
        </div>
      </div>

      {/* Pódio dos Top 3 */}
      <div className="space-y-3">
        <h2 className="text-xs font-mono uppercase font-bold text-slate-400 tracking-wider flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-400" />
          Pódio da Temporada (Top 3)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* 2º Lugar */}
          <div className="bg-surface/60 border border-slate-400/40 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 relative order-2 md:order-1">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-slate-700 text-slate-200 text-xs font-mono font-bold border border-slate-500">
              🥈 2º Lugar
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={top3[1].avatar}
              alt={top3[1].name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-400 shadow-lg mt-2"
            />
            <div>
              <h3 className="text-base font-bold text-white">{top3[1].name}</h3>
              <p className="text-xs text-slate-400 font-mono">@{top3[1].username}</p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {top3[1].badge}
            </span>
            <div className="pt-2 border-t border-surface-border w-full flex items-center justify-around font-mono text-xs">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {top3[1].streak}d
              </span>
              <span className="text-primary-400 font-bold">{top3[1].xp} XP</span>
            </div>
          </div>

          {/* 1º Lugar (Campeão) */}
          <div className="bg-gradient-to-b from-amber-500/20 via-surface to-primary-500/10 border-2 border-amber-400/70 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 relative shadow-glow order-1 md:order-2 scale-105">
            <div className="absolute -top-4 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-xs font-mono font-extrabold shadow-lg flex items-center gap-1">
              <Crown className="w-4 h-4 fill-current" />
              <span>1º Lugar • CAMPEÃ</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={top3[0].avatar}
              alt={top3[0].name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-2xl mt-2"
            />
            <div>
              <h3 className="text-lg font-black text-white">{top3[0].name}</h3>
              <p className="text-xs text-amber-300/80 font-mono">@{top3[0].username}</p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {top3[0].badge}
            </span>
            <div className="pt-2 border-t border-surface-border w-full flex items-center justify-around font-mono text-xs">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {top3[0].streak}d
              </span>
              <span className="text-amber-300 font-extrabold text-sm">{top3[0].xp} XP</span>
            </div>
          </div>

          {/* 3º Lugar */}
          <div className="bg-surface/60 border border-amber-700/40 rounded-3xl p-6 flex flex-col items-center text-center space-y-3 relative order-3">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-900/80 text-amber-300 text-xs font-mono font-bold border border-amber-700">
              🥉 3º Lugar
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={top3[2].avatar}
              alt={top3[2].name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-700 shadow-lg mt-2"
            />
            <div>
              <h3 className="text-base font-bold text-white">{top3[2].name}</h3>
              <p className="text-xs text-slate-400 font-mono">@{top3[2].username}</p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {top3[2].badge}
            </span>
            <div className="pt-2 border-t border-surface-border w-full flex items-center justify-around font-mono text-xs">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {top3[2].streak}d
              </span>
              <span className="text-primary-400 font-bold">{top3[2].xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros de Liga */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedLeague("todas")}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              selectedLeague === "todas"
                ? "bg-primary-500 text-white shadow-glow"
                : "bg-surface border border-surface-border text-slate-400 hover:text-white"
            }`}
          >
            Todas as Ligas
          </button>
          {(Object.keys(LEAGUE_TIERS) as LeagueTier[]).map((tier) => {
            const info = LEAGUE_TIERS[tier];
            const isSelected = selectedLeague === tier;
            return (
              <button
                key={tier}
                onClick={() => setSelectedLeague(tier)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-surface border border-amber-400 text-white shadow-glow"
                    : "bg-surface border border-surface-border text-slate-400 hover:text-white"
                }`}
              >
                <span>Liga {tier}</span>
                <span className="text-[10px] text-slate-500">({info.minXp}+ XP)</span>
              </button>
            );
          })}
        </div>

        {/* Tabela de Classificação */}
        <div className="bg-surface/80 border border-surface-border rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0A0E1A] text-slate-400 border-b border-surface-border uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-4 px-6">Posição</th>
                  <th className="py-4 px-6">Desenvolvedor</th>
                  <th className="py-4 px-6">Liga</th>
                  <th className="py-4 px-6">Ofensiva (Streak)</th>
                  <th className="py-4 px-6">Desafios</th>
                  <th className="py-4 px-6 text-right">XP Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60">
                {filteredUsers.map((user) => {
                  const isYou = user.isCurrentUser;
                  return (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        isYou
                          ? "bg-primary-500/15 font-bold hover:bg-primary-500/20"
                          : "hover:bg-surface-hover/80 text-slate-300"
                      }`}
                    >
                      <td className="py-4 px-6 font-bold">
                        <span className="flex items-center gap-2">
                          {user.rank === 1 && "🥇"}
                          {user.rank === 2 && "🥈"}
                          {user.rank === 3 && "🥉"}
                          {user.rank > 3 && `#${user.rank}`}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-xl object-cover border border-surface-border"
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-1.5">
                              <span>{user.name}</span>
                              {isYou && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary-500 text-white">
                                  VOCÊ
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">@{user.username}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full border text-[10px] font-bold ${
                            user.league === "Diamante"
                              ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                              : user.league === "Ouro"
                              ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                              : user.league === "Prata"
                              ? "bg-slate-400/15 text-slate-300 border-slate-400/30"
                              : "bg-amber-800/15 text-amber-600 border-amber-800/30"
                          }`}
                        >
                          {user.league}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="flex items-center gap-1 text-amber-400 font-bold">
                          <Flame className="w-3.5 h-3.5 fill-current" />
                          {user.streak} dias
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-300">
                        {user.challengesSolved} resolvidos
                      </td>

                      <td className="py-4 px-6 text-right font-extrabold text-primary-400 text-sm">
                        {user.xp.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
