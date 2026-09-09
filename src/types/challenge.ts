export type ChallengeDifficulty = "easy" | "medium" | "hard";
export type ChallengeCategory = "logic" | "arrays" | "strings" | "algorithms" | "async";

export interface TestCase {
  id: string;
  input: any[];
  expected: any;
  description: string;
  isSecret?: boolean;
}

export interface Challenge {
  id: string;
  slug: string;
  title: string;
  difficulty: ChallengeDifficulty;
  category: ChallengeCategory;
  xp: number;
  description: string;
  instructions: string[];
  starterCode: string;
  functionName: string;
  testCases: TestCase[];
  hints: string[];
}
