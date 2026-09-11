import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { getBaseUrl } from "@/lib/utils";

const APP_URL = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "DevQuest Pro | Plataforma de Estudos em Programação & Desafios",
    template: "%s | DevQuest Pro",
  },
  description:
    "Aprenda desenvolvimento de software na prática: trilhas guiadas, catálogo de projetos do básico ao avançado, simulador de entrevistas Big Tech e arena de código com IA.",
  keywords: [
    "programação",
    "desafios de código",
    "projetos frontend",
    "backend",
    "next.js 16",
    "react 19",
    "neon postgres",
    "drizzle orm",
    "entrevistas tecnicas",
    "code review ia",
    "python",
    "typescript"
  ],
  authors: [{ name: "DevQuest Team" }],
  creator: "DevQuest Pro",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: APP_URL,
    title: "DevQuest Pro | Plataforma de Estudos em Programação & Desafios",
    description:
      "Aprenda desenvolvimento de software na prática: trilhas guiadas, projetos práticos e desafios de código com mentor socrático IA.",
    siteName: "DevQuest Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevQuest Pro | Plataforma de Estudos em Programação",
    description: "Desafios de código interativos, projetos práticos e simulador de entrevistas técnicas.",
    creator: "@devquest",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": `${APP_URL}/#organization`,
        name: "DevQuest Pro",
        url: APP_URL,
        description: "Plataforma de aprendizado prático e desafios técnicos de programação.",
        sameAs: ["https://github.com/Henrique1601/DevQuest-"],
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        url: APP_URL,
        name: "DevQuest Pro",
        publisher: {
          "@id": `${APP_URL}/#organization`,
        },
        inLanguage: "pt-BR",
      },
    ],
  };

  return (
    <html lang="pt-BR" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-slate-100 antialiased selection:bg-primary-500/30 selection:text-cyan-200">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
