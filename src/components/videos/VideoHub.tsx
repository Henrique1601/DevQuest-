"use client";

import React, { useState } from "react";
import {
  Play,
  Clock,
  Video,
  Search,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { mockVideos, CuratedVideo, VideoChapter } from "@/lib/data/videos";

export function VideoHub() {
  const [selectedVideo, setSelectedVideo] = useState<CuratedVideo>(mockVideos[0]);
  const [currentStartSeconds, setCurrentStartSeconds] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredVideos = mockVideos.filter((vid) => {
    const isCatMatch = selectedCategory === "all" || vid.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const isSearchMatch =
      !q ||
      vid.title.toLowerCase().includes(q) ||
      vid.description.toLowerCase().includes(q) ||
      vid.tags.some((t) => t.toLowerCase().includes(q));

    return isCatMatch && isSearchMatch;
  });

  const handleSelectChapter = (chapter: VideoChapter) => {
    setCurrentStartSeconds(chapter.seconds);
  };

  const handleSelectVideo = (video: CuratedVideo) => {
    setSelectedVideo(video);
    setCurrentStartSeconds(0);
  };

  const categories = ["all", "React", "Next.js", "TypeScript", "Backend / SQL", "Algoritmos", "Git & DevOps"];

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30">
              <Video className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-red-400">
              Estilo YouTube Academy
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Video Hub: Aulas & Tutoriais Integrados
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Aulas aprofundadas com capítulos sincronizados cobrindo os conceitos essenciais da programação moderna.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-surface-border font-mono text-xs text-slate-400">
          <Clock className="w-4 h-4 text-primary-400" />
          <span>{mockVideos.length} Aulas Selecionadas</span>
        </div>
      </div>

      {/* Player Principal & Capítulos */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Player de Vídeo Responsivo (8 colunas) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 border border-surface-border shadow-2xl">
            <iframe
              key={`${selectedVideo.youtubeId}-${currentStartSeconds}`}
              src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=0&start=${currentStartSeconds}&rel=0`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-none"
            />
          </div>

          <div className="p-5 rounded-3xl bg-surface/70 border border-surface-border space-y-3 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-400 bg-primary-500/15 border border-primary-500/30 px-3 py-1 rounded-full">
                {selectedVideo.category}
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary-400" />
                Duração: {selectedVideo.duration}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {selectedVideo.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedVideo.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-surface-border/60">
              {selectedVideo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-lg bg-[#070A10] text-[11px] font-mono text-cyan-300 border border-surface-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Capítulos Interativos (4 colunas) */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-surface/80 border border-surface-border rounded-3xl p-5 shadow-xl space-y-4 flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-surface-border/60 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary-400" />
                <span>Capítulos da Aula</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedVideo.chapters.length} tópicos
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Clique em qualquer capítulo para saltar diretamente para a explicação:
            </p>

            <div className="space-y-2 flex-1 overflow-y-auto">
              {selectedVideo.chapters.map((ch, idx) => {
                const isActive = currentStartSeconds === ch.seconds;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectChapter(ch)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                      isActive
                        ? "bg-primary-500/15 border-primary-500/50 text-white shadow-glow"
                        : "bg-[#070A10] border-surface-border text-slate-300 hover:border-slate-600 hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-surface text-cyan-300 border border-surface-border shrink-0">
                        {ch.time}
                      </span>
                      <span className="text-xs font-medium line-clamp-1">{ch.title}</span>
                    </div>

                    <Play className={`w-3.5 h-3.5 shrink-0 text-slate-500 group-hover:text-primary-400 ${isActive ? "text-primary-400" : ""}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Grade com Outras Aulas Disponíveis */}
      <div className="space-y-6 pt-4 border-t border-surface-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Mais Aulas e Tutoriais Recomendados</h3>
            <p className="text-xs text-slate-400">Selecione qualquer vídeo para assistir no player acima.</p>
          </div>

          {/* Busca e Filtros */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por tópico..."
                className="bg-surface text-slate-200 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Pílulas de Categoria */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                selectedCategory === cat
                  ? "bg-red-500 text-white font-bold"
                  : "bg-surface border border-surface-border text-slate-400 hover:text-white"
              }`}
            >
              {cat === "all" ? "Todos os Vídeos" : cat}
            </button>
          ))}
        </div>

        {/* Grade de Vídeos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => {
            const isSelected = selectedVideo.id === vid.id;

            return (
              <div
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "bg-primary-500/10 border-primary-500/50 shadow-glow"
                    : "bg-surface/70 border-surface-border hover:border-slate-600 hover:bg-surface-hover"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-surface border border-surface-border text-primary-300">
                      {vid.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {vid.duration}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-2 leading-snug hover:text-primary-400 transition-colors">
                    {vid.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {vid.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-border/50 flex items-center justify-between text-xs font-mono text-primary-400">
                  <span className="text-slate-400 text-[11px]">{vid.channelName}</span>
                  <span className="flex items-center gap-1 font-bold">
                    <span>Assistir</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
