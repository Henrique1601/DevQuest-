import { StructureStep } from "./types";

export function generateStackSteps(): StructureStep[] {
  return [
    {
      items: [],
      action: "idle",
      explanation: "Pilha vazia (LIFO - Last In, First Out). Elementos são adicionados e removidos exclusivamente pelo Topo."
    },
    {
      items: ["Dado A"],
      action: "push",
      highlightIndex: 0,
      explanation: "push('Dado A'): Elemento inserido no topo da pilha."
    },
    {
      items: ["Dado A", "Dado B"],
      action: "push",
      highlightIndex: 1,
      explanation: "push('Dado B'): Novo elemento empilhado acima de 'Dado A'."
    },
    {
      items: ["Dado A", "Dado B", "Dado C"],
      action: "push",
      highlightIndex: 2,
      explanation: "push('Dado C'): Agora 'Dado C' é o novo elemento no topo."
    },
    {
      items: ["Dado A", "Dado B"],
      action: "pop",
      highlightIndex: 2,
      explanation: "pop(): O último elemento que entrou ('Dado C') é o primeiro a ser desempilhado e removido."
    },
    {
      items: ["Dado A", "Dado B", "Dado D"],
      action: "push",
      highlightIndex: 2,
      explanation: "push('Dado D'): Novo item inserido no topo."
    },
    {
      items: ["Dado A", "Dado B"],
      action: "pop",
      highlightIndex: 2,
      explanation: "pop(): 'Dado D' é removido do topo."
    },
    {
      items: ["Dado A"],
      action: "pop",
      highlightIndex: 1,
      explanation: "pop(): 'Dado B' é removido do topo. Resta apenas 'Dado A'."
    }
  ];
}

export function generateQueueSteps(): StructureStep[] {
  return [
    {
      items: [],
      action: "idle",
      explanation: "Fila vazia (FIFO - First In, First Out). Novos elementos entram no Final (Rear) e saem pelo Início (Front)."
    },
    {
      items: ["Cliente 1"],
      action: "enqueue",
      highlightIndex: 0,
      explanation: "enqueue('Cliente 1'): Primeiro elemento entrou na fila."
    },
    {
      items: ["Cliente 1", "Cliente 2"],
      action: "enqueue",
      highlightIndex: 1,
      explanation: "enqueue('Cliente 2'): Entrou no final da fila."
    },
    {
      items: ["Cliente 1", "Cliente 2", "Cliente 3"],
      action: "enqueue",
      highlightIndex: 2,
      explanation: "enqueue('Cliente 3'): Aguardando atendimento no fim da fila."
    },
    {
      items: ["Cliente 2", "Cliente 3"],
      action: "dequeue",
      highlightIndex: 0,
      explanation: "dequeue(): 'Cliente 1' (o primeiro que chegou) é atendido e sai da fila."
    },
    {
      items: ["Cliente 2", "Cliente 3", "Cliente 4"],
      action: "enqueue",
      highlightIndex: 2,
      explanation: "enqueue('Cliente 4'): Novo elemento inserido no final."
    },
    {
      items: ["Cliente 3", "Cliente 4"],
      action: "dequeue",
      highlightIndex: 0,
      explanation: "dequeue(): 'Cliente 2' sai da fila."
    }
  ];
}
