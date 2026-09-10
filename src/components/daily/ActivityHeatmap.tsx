"use client";

import React, { useState } from "react";
import { Flame, Calendar, Sparkles } from "lucide-react";
import { HeatmapDay } from "@/lib/data/dailyQuests";

interface ActivityHeatmapProps {
  days: HeatmapDay[];
  currentStreak?: number;
  totalSolved?: number;
}

export function ActivityHeatmap({ days, currentStreak = 18, totalSolved = 47 }: ActivityHeatmapProps) {
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  // Cores dos níveis de intensidade (estilo GitHub Dark)
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-950 border-emerald-800/40";
      case 2:
        return "bg-emerald-700 border-emerald-600/60";
      case 3:
        return "bg-emerald-500 border-emerald-400";
      case 4:
        return "bg-cyan-400 border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.5)]";
      default:
        return "bg-[#0A0F1D] border-surface-border/40 hover:border-slate-600";
    }
  };

  // Agrupa os dias em colunas de semanas (7 dias por coluna)
  const weeks: HeatmapDay[][] = [];
  let currentWeek: HeatmapDay[] = [];

  days.forEach((day, idx) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || idx === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  return (
    <div className="bg-surface/70 border border-surface-border rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-surface-border pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Heatmap de Produtividade Diária</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Últimos 150 dias
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Cada quadrado representa seu progresso de estudos no DevQuest.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span className="font-bold">{currentStreak} dias seguidos</span>
          </div>
          <div className="text-slate-400">
            <strong className="text-cyan-300">{totalSolved}</strong> resoluções
          </div>
        </div>
      </div>

      {/* Grid de Semanas */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-1.5 min-w-[650px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3.5 h-3.5 rounded-[4px] border transition-all cursor-pointer ${getCellColor(
                    day.level
                  )}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legenda e Tooltip */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <div className="h-4">
          {hoveredDay ? (
            <span className="text-slate-200">
              📅 <strong>{hoveredDay.date}</strong>: {hoveredDay.count}{" "}
              {hoveredDay.count === 1 ? "desafio concluído" : "desafios concluídos"}
            </span>
          ) : (
            <span className="text-slate-500">Passe o mouse sobre os blocos para ver detalhes</span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span>Menos</span>
          <div className="w-2.5 h-2.5 rounded-[3px] bg-[#0A0F1D] border border-surface-border" />
          <div className="w-2.5 h-2.5 rounded-[3px] bg-emerald-950 border border-emerald-800" />
          <div className="w-2.5 h-2.5 rounded-[3px] bg-emerald-700 border border-emerald-600" />
          <div className="w-2.5 h-2.5 rounded-[3px] bg-emerald-500 border border-emerald-400" />
          <div className="w-2.5 h-2.5 rounded-[3px] bg-cyan-400 border border-cyan-300" />
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
}
