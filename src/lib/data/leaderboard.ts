export type LeagueTier = "Diamante" | "Ouro" | "Prata" | "Bronze";

export interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  avatar: string;
  league: LeagueTier;
  xp: number;
  streak: number;
  challengesSolved: number;
  rank: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface LeagueInfo {
  tier: LeagueTier;
  minXp: number;
  color: string;
  borderColor: string;
  bgGradient: string;
  description: string;
}

export const LEAGUE_TIERS: Record<LeagueTier, LeagueInfo> = {
  Diamante: {
    tier: "Diamante",
    minXp: 3000,
    color: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    bgGradient: "from-cyan-500/20 via-primary-500/10 to-purple-500/20",
    description: "Os 5% desenvolvedores com maior maestria algorítmica e consistência."
  },
  Ouro: {
    tier: "Ouro",
    minXp: 2000,
    color: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgGradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
    description: "Desenvolvedores avançados com soluções em tempo ótimo."
  },
  Prata: {
    tier: "Prata",
    minXp: 1000,
    color: "text-slate-300",
    borderColor: "border-slate-400/40",
    bgGradient: "from-slate-400/20 via-slate-600/10 to-slate-500/20",
    description: "Desenvolvedores em aceleração resolvendo desafios diários."
  },
  Bronze: {
    tier: "Bronze",
    minXp: 0,
    color: "text-amber-600",
    borderColor: "border-amber-700/40",
    bgGradient: "from-amber-700/20 via-amber-800/10 to-amber-900/20",
    description: "Ponto de partida da jornada para novos programadores."
  }
};

export const mockLeaderboardUsers: LeaderboardUser[] = [
  {
    id: "user-1",
    name: "Ana Vasconcelos",
    username: "anacodes",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    league: "Diamante",
    xp: 4850,
    streak: 42,
    challengesSolved: 68,
    rank: 1,
    badge: "Arquiteta de Pilhas & Grafos"
  },
  {
    id: "user-2",
    name: "Carlos Eduardo",
    username: "carlosedu_dev",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    league: "Diamante",
    xp: 4320,
    streak: 28,
    challengesSolved: 59,
    rank: 2,
    badge: "Mestre em Big-O"
  },
  {
    id: "user-3",
    name: "Beatriz Lima",
    username: "bia_frontend",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    league: "Diamante",
    xp: 3950,
    streak: 19,
    challengesSolved: 51,
    rank: 3,
    badge: "React & Flexbox Ninja"
  },
  {
    id: "user-4",
    name: "Você (Henrique)",
    username: "henrique_dev",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    league: "Ouro",
    xp: 2850,
    streak: 15,
    challengesSolved: 37,
    rank: 4,
    badge: "Explorador Full Stack",
    isCurrentUser: true
  },
  {
    id: "user-5",
    name: "Lucas Rocha",
    username: "lucas_rust",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    league: "Ouro",
    xp: 2600,
    streak: 12,
    challengesSolved: 32,
    rank: 5,
    badge: "Concorrência & Filas"
  },
  {
    id: "user-6",
    name: "Mariana Souza",
    username: "mari_code",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    league: "Ouro",
    xp: 2200,
    streak: 9,
    challengesSolved: 28,
    rank: 6,
    badge: "SQL & Relational Wizard"
  },
  {
    id: "user-7",
    name: "Gabriel Martins",
    username: "gabriel_m",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    league: "Prata",
    xp: 1750,
    streak: 7,
    challengesSolved: 21,
    rank: 7,
    badge: "Dev em Ascensão"
  },
  {
    id: "user-8",
    name: "Juliana Santos",
    username: "ju_santos",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    league: "Prata",
    xp: 1420,
    streak: 5,
    challengesSolved: 16,
    rank: 8,
    badge: "JavaScript Padawan"
  },
  {
    id: "user-9",
    name: "Rafael Oliveira",
    username: "rafa_dev",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    league: "Bronze",
    xp: 750,
    streak: 3,
    challengesSolved: 9,
    rank: 9,
    badge: "Iniciante Corajoso"
  }
];
