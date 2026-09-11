export interface Achievement {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  category: "desafios" | "streak" | "projetos" | "seguranca" | "ranking";
  xpReward: number;
}

export const mockAchievements: Achievement[] = [
  {
    id: "ach-1",
    slug: "primeiro-codigo",
    title: "Primeiro Código",
    description: "Resolva e aprove seu primeiro desafio prático na Arena DevQuest.",
    icon: "🚀",
    category: "desafios",
    xpReward: 100,
  },
  {
    id: "ach-2",
    slug: "semana-de-fogo",
    title: "Semana de Fogo",
    description: "Mantenha uma sequência de 7 dias consecutivos resolvendo a Daily Quest.",
    icon: "🔥",
    category: "streak",
    xpReward: 250,
  },
  {
    id: "ach-3",
    slug: "mestre-dos-arrays",
    title: "Mestre dos Arrays",
    description: "Conclua 5 desafios fundamentais de manipulação de vetores e matrizes.",
    icon: "📦",
    category: "desafios",
    xpReward: 200,
  },
  {
    id: "ach-4",
    slug: "hacker-etico",
    title: "Hacker Ético",
    description: "Identifique e sanitize uma vulnerabilidade SQL Injection no simulador de Code Review.",
    icon: "🛡️",
    category: "seguranca",
    xpReward: 150,
  },
  {
    id: "ach-5",
    slug: "arquiteto-neon",
    title: "Arquiteto Neon",
    description: "Conecte sua conta ao Neon Serverless Postgres e execute queries relacionais.",
    icon: "⚡",
    category: "projetos",
    xpReward: 300,
  },
  {
    id: "ach-6",
    slug: "speedrunner",
    title: "Speedrunner",
    description: "Passe em todos os testes unitários de um desafio com tempo ótimo.",
    icon: "⏱️",
    category: "desafios",
    xpReward: 200,
  },
  {
    id: "ach-7",
    slug: "mestre-diamante",
    title: "Mestre Diamante",
    description: "Supere a marca dos 3.000 XP e ingresse na prestigiosa Liga Diamante.",
    icon: "💎",
    category: "ranking",
    xpReward: 500,
  },
  {
    id: "ach-8",
    slug: "arquiteto-fullstack",
    title: "Arquiteto Full Stack",
    description: "Finalize um projeto guiado completo conectando React 19 a um banco de dados.",
    icon: "🌟",
    category: "projetos",
    xpReward: 350,
  },
];
