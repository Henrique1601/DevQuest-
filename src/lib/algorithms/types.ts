export type AlgorithmCategory = "search" | "sort" | "structure";

export interface SortStep {
  array: number[];
  comparing?: [number, number];
  swapping?: [number, number];
  sortedIndices: number[];
  explanation: string;
}

export interface SearchStep {
  array: number[];
  low: number;
  high: number;
  mid: number;
  target: number;
  foundIndex?: number;
  explanation: string;
}

export interface StructureStep {
  items: (string | number)[];
  action: "push" | "pop" | "enqueue" | "dequeue" | "idle";
  highlightIndex?: number;
  explanation: string;
}

export interface AlgorithmInfo {
  id: string;
  name: string;
  category: AlgorithmCategory;
  timeComplexityBest: string;
  timeComplexityWorst: string;
  spaceComplexity: string;
  description: string;
  codeSnippet: string;
}
