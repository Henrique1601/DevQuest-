"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  BookOpen,
  Globe,
  Video,
  MessageSquare,
  Sparkles,
  FileText
} from "lucide-react";
import { ReferenceLink, ReferenceType } from "@/types/project";

interface ProjectResourceLinksProps {
  links?: ReferenceLink[];
  projectTitle: string;
}

export function ProjectResourceLinks({ links, projectTitle }: ProjectResourceLinksProps) {
  if (!links || links.length === 0) return null;

  const getTypeConfig = (type: ReferenceType) => {
    switch (type) {
      case "w3schools":
        return {
          label: "W3Schools",
          badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
          icon: BookOpen,
        };
      case "docs":
        return {
          label: "Docs / MDN",
          badgeColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
          icon: Globe,
        };
      case "video":
        return {
          label: "Vídeo / YouTube",
          badgeColor: "bg-rose-500/15 text-rose-400 border-rose-500/30",
          icon: Video,
        };
      case "stackoverflow":
        return {
          label: "Stack Overflow",
          badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          icon: MessageSquare,
        };
      case "cheatsheet":
        return {
          label: "DevQuest Labs",
          badgeColor: "bg-primary-500/15 text-primary-400 border-primary-500/30",
          icon: Sparkles,
        };
      case "article":
      default:
        return {
          label: "Guia / Artigo",
          badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
          icon: FileText,
        };
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-surface/80 border border-surface-border space-y-4 shadow-lg">
      <div className="flex items-center gap-2 text-white font-bold text-base">
        <BookOpen className="w-4 h-4 text-cyan-400" />
        <span>Documentação & Links de Apoio</span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed">
        Consulte materiais oficiais e tutoriais relacionados para acelerar o desenvolvimento do projeto:
      </p>

      <div className="space-y-2.5 pt-1">
        {links.map((link, idx) => {
          const config = getTypeConfig(link.type);
          const Icon = config.icon;
          const isInternal = link.url.startsWith("/");

          const content = (
            <div className="group flex flex-col p-3 rounded-xl bg-[#070A10] border border-surface-border hover:border-cyan-500/50 hover:bg-surface-hover transition-all space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md border flex items-center gap-1.5 ${config.badgeColor}`}>
                  <Icon className="w-3 h-3" />
                  <span>{config.label}</span>
                </span>

                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
              </div>

              <div className="text-xs font-semibold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {link.title}
              </div>

              {link.description && (
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {link.description}
                </p>
              )}
            </div>
          );

          if (isInternal) {
            return (
              <Link key={idx} href={link.url} className="block">
                {content}
              </Link>
            );
          }

          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {content}
            </a>
          );
        })}
      </div>
    </div>
  );
}
