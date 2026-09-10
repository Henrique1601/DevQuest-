import { SearchStep } from "./types";

export function generateBinarySearchSteps(sortedArr: number[], target: number): SearchStep[] {
  const steps: SearchStep[] = [];
  const arr = [...sortedArr];

  let low = 0;
  let high = arr.length - 1;

  steps.push({
    array: [...arr],
    low,
    high,
    mid: Math.floor((low + high) / 2),
    target,
    explanation: `Início da Busca Binária para o alvo ${target}. Intervalo inicial: [índice ${low} até ${high}].`
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = arr[mid];

    if (midVal === target) {
      steps.push({
        array: [...arr],
        low,
        high,
        mid,
        target,
        foundIndex: mid,
        explanation: `Elemento ${target} encontrado exatamente no índice ${mid}! (${arr[mid]} === ${target}).`
      });
      return steps;
    }

    if (midVal < target) {
      steps.push({
        array: [...arr],
        low,
        high,
        mid,
        target,
        explanation: `O elemento do meio (${midVal}) é MENOR que o alvo (${target}). Descartamos a metade esquerda e movemos 'low' para ${mid + 1}.`
      });
      low = mid + 1;
    } else {
      steps.push({
        array: [...arr],
        low,
        high,
        mid,
        target,
        explanation: `O elemento do meio (${midVal}) é MAIOR que o alvo (${target}). Descartamos a metade direita e movemos 'high' para ${mid - 1}.`
      });
      high = mid - 1;
    }
  }

  steps.push({
    array: [...arr],
    low,
    high,
    mid: -1,
    target,
    explanation: `Busca encerrada: low > high. O elemento ${target} não existe no array.`
  });

  return steps;
}
