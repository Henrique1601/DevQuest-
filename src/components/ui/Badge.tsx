import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "beginner" | "intermediate" | "advanced" | "primary" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variantStyles = {
    default: "bg-surface-hover/80 text-slate-300 border-surface-border",
    beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    advanced: "bg-rose-500/10 text-rose-400 border-rose-500/25",
    primary: "bg-primary-500/10 text-primary-400 border-primary-500/25",
    accent: "bg-accent-500/10 text-accent-400 border-accent-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
