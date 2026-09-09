import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  children: React.ReactNode;
}

export function Card({ hoverEffect = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl bg-surface/80 backdrop-blur-xl border border-surface-border p-6 overflow-hidden transition-all duration-300",
        hoverEffect && "hover:border-primary-500/40 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1 group",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
