export type ProjectDifficulty = "beginner" | "intermediate" | "advanced";
export type ProjectCategory = "frontend" | "backend" | "fullstack" | "mobile";

export interface ProjectStep {
  order: number;
  title: string;
  description: string;
  tips?: string[];
  codeSnippet?: string;
}

export type ReferenceType = "docs" | "w3schools" | "video" | "cheatsheet" | "stackoverflow" | "article";

export interface ReferenceLink {
  title: string;
  url: string;
  type: ReferenceType;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: ProjectDifficulty;
  category: ProjectCategory;
  estimatedHours: number;
  tags: string[];
  prerequisites: string[];
  features: string[];
  steps: ProjectStep[];
  architectureTips?: string[];
  recommendedFolderStructure?: string;
  solutionUrl?: string;
  demoUrl?: string;
  company?: string;
  referenceLinks?: ReferenceLink[];
}
