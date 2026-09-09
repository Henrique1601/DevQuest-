import { Challenge } from "@/types/challenge";

export const mockChallenges: Challenge[] = [
  {
    id: "chal-1",
    slug: "inverter-string",
    title: "Inverter uma String",
    difficulty: "easy",
    category: "strings",
    xp: 50,
    description: "Crie uma função que receba uma string e retorne essa mesma sequência de caracteres invertida.",
    instructions: [
      "A função deve receber um argumento de texto (string).",
      "Deve retornar uma nova string com os caracteres na ordem reversa.",
      "Considere espaços e pontuações normais."
    ],
    starterCode: `function reverseString(str) {
  // Seu código aqui
  return str;
}`,
    functionName: "reverseString",
    testCases: [
      { id: "tc-1", input: ["codigo"], expected: "ogidoc", description: "Inverter 'codigo'" },
      { id: "tc-2", input: ["JavaScript"], expected: "tpircSavaJ", description: "Preservar maiúsculas e minúsculas" },
      { id: "tc-3", input: ["12345 !"], expected: "! 54321", description: "Lidar com espaços e símbolos", isSecret: true }
    ],
    hints: [
      "Você pode transformar a string em um array com .split('')",
      "Arrays possuem o método nativo .reverse()",
      "Depois é só unir novamente com .join('')"
    ]
  },
  {
    id: "chal-2",
    slug: "two-sum",
    title: "Dois Números que Somam K (Two Sum)",
    difficulty: "easy",
    category: "arrays",
    xp: 75,
    description: "Dado um array de números inteiros e um valor alvo 'target', retorne os índices dos dois números cuja soma seja igual ao target.",
    instructions: [
      "Cada entrada terá exatamente uma solução válida.",
      "Você não pode usar o mesmo elemento duas vezes.",
      "Retorne um array com os dois índices: [índice1, índice2]."
    ],
    starterCode: `function twoSum(nums, target) {
  // Seu código aqui
  return [];
}`,
    functionName: "twoSum",
    testCases: [
      { id: "tc-1", input: [[2, 7, 11, 15], 9], expected: [0, 1], description: "nums=[2, 7, 11, 15], target=9" },
      { id: "tc-2", input: [[3, 2, 4], 6], expected: [1, 2], description: "nums=[3, 2, 4], target=6" },
      { id: "tc-3", input: [[3, 3], 6], expected: [0, 1], description: "nums=[3, 3], target=6", isSecret: true }
    ],
    hints: [
      "Uma abordagem de força bruta com dois loops for funciona em O(n²).",
      "Você pode atingir O(n) utilizando um Map ou objeto para guardar os complementos já vistos!"
    ]
  },
  {
    id: "chal-3",
    slug: "valid-parentheses",
    title: "Validador de Parênteses & Chaves",
    difficulty: "medium",
    category: "algorithms",
    xp: 120,
    description: "Dada uma string contendo apenas os caracteres '(', ')', '{', '}', '[' e ']', determine se a sequência é válida.",
    instructions: [
      "Parênteses abertos devem ser fechados pelo mesmo tipo de parêntese.",
      "Parênteses abertos devem ser fechados na ordem correta.",
      "Toda chave/colchete de fechamento deve ter uma abertura correspondente."
    ],
    starterCode: `function isValid(s) {
  // Seu código aqui
  return false;
}`,
    functionName: "isValid",
    testCases: [
      { id: "tc-1", input: ["()[]{}"], expected: true, description: "Todos os pares fecham corretamente" },
      { id: "tc-2", input: ["(]"], expected: false, description: "Tipo diferente não deve validar" },
      { id: "tc-3", input: ["([{}])"], expected: true, description: "Aninhamentos válidos" },
      { id: "tc-4", input: ["["], expected: false, description: "Abertura sem fechamento", isSecret: true }
    ],
    hints: [
      "Esta é a aplicação clássica de uma estrutura de dados de Pilha (Stack).",
      "Ao encontrar um caractere de abertura, empilhe. Ao encontrar fechamento, verifique se o topo da pilha bate."
    ]
  },
  {
    id: "chal-4",
    slug: "deep-flatten-array",
    title: "Achatamento Profundo de Array (Deep Flatten)",
    difficulty: "hard",
    category: "algorithms",
    xp: 200,
    description: "Implemente uma função que achata qualquer nível de aninhamento de arrays em uma única lista plana sem usar o método nativo Array.prototype.flat.",
    instructions: [
      "Não use o método embutido .flat() ou .flatMap().",
      "A função deve suportar arrays com múltiplos níveis de profundidade arbitrários.",
      "Deve manter a ordem original dos elementos."
    ],
    starterCode: `function flattenArray(arr) {
  // Seu código aqui (sem usar arr.flat())
  return [];
}`,
    functionName: "flattenArray",
    testCases: [
      { id: "tc-1", input: [[[1, 2], [3, [4, 5]]]], expected: [1, 2, 3, 4, 5], description: "Três níveis de aninhamento" },
      { id: "tc-2", input: [[1, [2, [3, [4, [5]]]]]], expected: [1, 2, 3, 4, 5], description: "Cinco níveis de profundidade" },
      { id: "tc-3", input: [[[], [1], [[2]]]], expected: [1, 2], description: "Lidar com arrays vazios internos", isSecret: true }
    ],
    hints: [
      "Você pode usar recursão: percorra cada item do array. Se for Array.isArray(item), chame flattenArray recursivamente.",
      "Também é possível resolver de forma iterativa usando uma pilha (stack)."
    ]
  }
];
