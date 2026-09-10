export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
}

export interface CuratedVideo {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  channelName: string;
  duration: string;
  category: "React" | "Next.js" | "TypeScript" | "Backend / SQL" | "Algoritmos" | "Git & DevOps";
  tags: string[];
  chapters: VideoChapter[];
}

export const mockVideos: CuratedVideo[] = [
  {
    id: "vid-1",
    youtubeId: "8aGhZQkoFbQ",
    title: "Curso Completo de Event Loop & Assincronismo no JavaScript",
    description: "Entenda detalhadamente como a Call Stack, Web APIs, Microtask Queue e Macrotask Queue operam nos bastidores da V8.",
    channelName: "DevQuest Academy",
    duration: "24:15",
    category: "React",
    tags: ["JavaScript", "Event Loop", "Promises", "V8 Engine"],
    chapters: [
      { time: "00:00", seconds: 0, title: "Introdução ao Modelo de Concorrência" },
      { time: "04:30", seconds: 270, title: "Call Stack e Código Bloqueante" },
      { time: "10:15", seconds: 615, title: "Microtasks (Promises) vs Macrotasks (Timers)" },
      { time: "18:00", seconds: 1080, title: "Exemplo Prático e Exercício Mental" }
    ]
  },
  {
    id: "vid-2",
    youtubeId: "SqcY0GlETPk",
    title: "Tutorial Next.js App Router: Server vs Client Components",
    description: "Aprenda a arquitetar aplicações modernas no Next.js com carregamento no servidor, streaming com Suspense e Server Actions.",
    channelName: "React Brasil",
    duration: "32:40",
    category: "Next.js",
    tags: ["Next.js", "Server Components", "React 19", "Server Actions"],
    chapters: [
      { time: "00:00", seconds: 0, title: "Por que Server Components?" },
      { time: "07:20", seconds: 440, title: "Diretiva 'use client' na Prática" },
      { time: "16:45", seconds: 1005, title: "Data Fetching sem useEffect" },
      { time: "25:30", seconds: 1530, title: "Formulários com Server Actions" }
    ]
  },
  {
    id: "vid-3",
    youtubeId: "M2Wb4s6q3E4",
    title: "Modelagem Relacional com Drizzle ORM & Neon Serverless Postgres",
    description: "Do zero ao deploy: crie schemas type-safe, rode migrations automáticas e conecte seu banco na nuvem com connection pooling.",
    channelName: "Database Masters",
    duration: "28:10",
    category: "Backend / SQL",
    tags: ["PostgreSQL", "Neon", "Drizzle ORM", "TypeScript"],
    chapters: [
      { time: "00:00", seconds: 0, title: "Configurando o Projeto no Neon" },
      { time: "06:15", seconds: 375, title: "Definindo Tabelas e Chaves Estrangeiras" },
      { time: "14:40", seconds: 880, title: "Executando Drizzle Push e Migrations" },
      { time: "22:10", seconds: 1330, title: "Queries Relacionais com Joins" }
    ]
  },
  {
    id: "vid-4",
    youtubeId: "RBSGKlAvoiM",
    title: "Algoritmos para Entrevistas: Busca Binária e Ordenações",
    description: "Demonstração prática dos algoritmos mais cobrados em processos seletivos de Big Techs com cálculo de tempo Big-O.",
    channelName: "Code Challenge Pro",
    duration: "35:50",
    category: "Algoritmos",
    tags: ["Big-O", "Busca Binária", "Sorting", "LeetCode"],
    chapters: [
      { time: "00:00", seconds: 0, title: "Notação Assintótica Big-O Descomplicada" },
      { time: "08:30", seconds: 510, title: "Busca Binária O(log n)" },
      { time: "19:20", seconds: 1160, title: "Bubble Sort vs Quick Sort" },
      { time: "29:00", seconds: 1740, title: "Dicas para a Entrevista Técnica" }
    ]
  },
  {
    id: "vid-5",
    youtubeId: "USjZcfj8yxI",
    title: "Git & GitHub Profissional: Rebase, Stash e Fluxo de Branches",
    description: "Domine o terminal Git como os desenvolvedores seniores trabalham em times de grande porte.",
    channelName: "DevOps na Veia",
    duration: "26:00",
    category: "Git & DevOps",
    tags: ["Git", "GitHub", "Branches", "Rebase"],
    chapters: [
      { time: "00:00", seconds: 0, title: "Branches de Feature e Git Flow" },
      { time: "07:45", seconds: 465, title: "Dominando o git stash" },
      { time: "15:20", seconds: 920, title: "git rebase vs git merge" },
      { time: "21:30", seconds: 1290, title: "Resolvendo Conflitos com Confiança" }
    ]
  }
];
