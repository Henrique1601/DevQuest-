export interface GitCommit {
  id: string; // Ex: "c1", "a9f3b12"
  message: string;
  parentIds: string[];
  branchName?: string;
  timestamp: number;
}

export interface GitHead {
  type: "branch" | "detached";
  name: string; // branch name (ex: "main") or commit id (ex: "c1")
}

export interface GitState {
  commits: GitCommit[];
  branches: Record<string, string>; // branchName -> commitId
  head: GitHead;
}

export interface GitCommandOutput {
  text: string;
  type: "info" | "success" | "error" | "warning" | "muted";
}

export interface GitMission {
  id: string;
  level: number;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  objective: string;
  description: string;
  hint: string;
  setupCommands?: string[];
  expectedGoalDescription: string;
  validate: (state: GitState) => boolean;
}
