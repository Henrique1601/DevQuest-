import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "DevQuest | Plataforma de Estudos em Programação",
  description: "Aprenda desenvolvimento de software na prática: trilhas guiadas, catálogo de projetos do básico ao avançado e desafios interativos com editor no navegador.",
  keywords: ["programação", "desafios de código", "projetos frontend", "backend", "next.js", "neon postgres"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-slate-100 antialiased selection:bg-primary-500/30 selection:text-cyan-200">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
