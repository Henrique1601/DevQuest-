import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDifficulty(diff: "beginner" | "intermediate" | "advanced") {
  switch (diff) {
    case "beginner":
      return { label: "Iniciante", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    case "intermediate":
      return { label: "Intermediário", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
    case "advanced":
      return { label: "Avançado", color: "text-rose-400 bg-rose-500/10 border-rose-500/20" };
  }
}
