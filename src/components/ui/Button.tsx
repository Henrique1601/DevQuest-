import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "glow" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
    };

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/35 hover:brightness-110",
      secondary:
        "bg-surface text-slate-200 border border-surface-border hover:bg-surface-hover hover:border-slate-600 hover:text-white",
      outline:
        "border border-primary-500/40 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400",
      glow:
        "bg-primary-500 text-white shadow-glow hover:shadow-cyan-400/40 hover:bg-primary-400",
      ghost:
        "text-slate-400 hover:text-white hover:bg-white/5",
      glass:
        "bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200 hover:bg-white/[0.08] hover:text-white",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
