import { SortStep } from "./types";

export function generateBubbleSortSteps(initialArr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    sortedIndices: [],
    explanation: "Iniciando Bubble Sort. Elementos adjacentes serão comparados e trocados até que o maior 'flutue' para o final."
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sortedIndices: [...sortedIndices],
        explanation: `Comparando índice ${j} (${arr[j]}) com índice ${j + 1} (${arr[j + 1]}).`
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        steps.push({
          array: [...arr],
          swapping: [j, j + 1],
          sortedIndices: [...sortedIndices],
          explanation: `Como ${arr[j + 1]} > ${arr[j]}, realizamos a troca de posições.`
        });
      }
    }

    sortedIndices.unshift(n - 1 - i);
    steps.push({
      array: [...arr],
      sortedIndices: [...sortedIndices],
      explanation: `Elemento no índice ${n - 1 - i} agora está em sua posição ordenada definitiva.`
    });

    if (!swapped) {
      // Se nenhuma troca ocorreu, o array já está completamente ordenado
      break;
    }
  }

  // Todos ordenados
  const allIndices = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    sortedIndices: allIndices,
    explanation: "Bubble Sort concluído com sucesso! Todos os elementos estão ordenados."
  });

  return steps;
}

export function generateSelectionSortSteps(initialArr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArr];
  const n = arr.length;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    sortedIndices: [],
    explanation: "Iniciando Selection Sort. A cada passagem, encontramos o menor valor restante e o colocamos no início."
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparing: [i, minIdx],
      sortedIndices: [...sortedIndices],
      explanation: `Buscando o menor elemento a partir do índice ${i} (valor atual: ${arr[i]}).`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, minIdx],
        sortedIndices: [...sortedIndices],
        explanation: `Comparando elemento no índice ${j} (${arr[j]}) com o menor encontrado até agora no índice ${minIdx} (${arr[minIdx]}).`
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [j, minIdx],
          sortedIndices: [...sortedIndices],
          explanation: `Novo menor valor encontrado: ${arr[minIdx]} no índice ${minIdx}.`
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        array: [...arr],
        swapping: [i, minIdx],
        sortedIndices: [...sortedIndices],
        explanation: `Trocando o menor valor (${arr[i]}) com o valor da posição ${i} (${temp}).`
      });
    }

    sortedIndices.push(i);
  }

  const allIndices = Array.from({ length: n }, (_, i) => i);
  steps.push({
    array: [...arr],
    sortedIndices: allIndices,
    explanation: "Selection Sort finalizado! Array totalmente ordenado."
  });

  return steps;
}
