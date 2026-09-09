export interface TrackModule {
  id: string;
  title: string;
  description: string;
  lessonsCount: number;
  projectSlug?: string;
}

export interface Track {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: string;
  level: "Iniciante" | "Intermediário" | "Avançado" | "Completo";
  totalHours: number;
  modulesCount: number;
  color: string;
  modules: TrackModule[];
}
