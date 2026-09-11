import React from "react";
import { Metadata } from "next";
import { CodeReviewWorkspace } from "@/components/review/CodeReviewWorkspace";

export const metadata: Metadata = {
  title: "Code Review com IA (Estilo Pull Request) | DevQuest Pro",
  description:
    "Análise estática avançada com veredito de PR, pontuação de qualidade, detecção de vulnerabilidades OWASP (SQL Injection, XSS) e visualizador de diff.",
};

export default function CodeReviewPage() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <CodeReviewWorkspace />
    </div>
  );
}