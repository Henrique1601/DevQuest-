export type CodeBlankCategory = "javascript" | "react" | "typescript" | "sql" | "algorithms";
export type CodeBlankDifficulty = "easy" | "medium" | "hard";

export interface BlankField {
  id: string;
  placeholder: string;
  acceptedAnswers: string[];
  options: string[];
  hint: string;
}

export interface CodeBlankChallenge {
  id: string;
  slug: string;
  title: string;
  category: CodeBlankCategory;
  difficulty: CodeBlankDifficulty;
  xp: number;
  description: string;
  codeTemplate: string;
  blanks: BlankField[];
  expectedOutput: any;
  explanation: string;
  categoryLabel?: string;
}
