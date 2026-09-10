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
  },
  {
    id: "chal-5",
    slug: "is-palindrome",
    title: "Verificador de Palíndromo",
    difficulty: "easy",
    category: "strings",
    xp: 60,
    description: "Crie uma função que determine se uma palavra ou frase é um palíndromo (lê-se igual de trás para frente), desconsiderando pontuações, espaços e diferença entre maiúsculas e minúsculas.",
    instructions: [
      "Remova todos os caracteres não-alfanuméricos (pontos, vírgulas, espaços).",
      "Converta tudo para minúsculas antes de comparar.",
      "Retorne true se for palíndromo e false caso contrário."
    ],
    starterCode: `function isPalindrome(str) {
  // Seu código aqui
  return false;
}`,
    functionName: "isPalindrome",
    testCases: [
      { id: "tc-1", input: ["Ame o poema"], expected: true, description: "'Ame o poema' desconsiderando espaços" },
      { id: "tc-2", input: ["programacao"], expected: false, description: "'programacao' não é palíndromo" },
      { id: "tc-3", input: ["A man, a plan, a canal: Panama"], expected: true, description: "Frase clássica com pontuações variadas" },
      { id: "tc-4", input: ["race a car"], expected: false, description: "'race a car' deve retornar false", isSecret: true }
    ],
    hints: [
      "Use expressão regular para filtrar apenas caracteres alfanuméricos: str.toLowerCase().replace(/[^a-z0-9]/g, '')",
      "Compare a string limpa com ela mesma invertida ou use dois ponteiros (left e right)."
    ]
  },
  {
    id: "chal-6",
    slug: "max-subarray",
    title: "Maior Subarray Contíguo (Kadane's Algorithm)",
    difficulty: "medium",
    category: "arrays",
    xp: 140,
    description: "Dado um array de números inteiros (positivos e negativos), encontre o subarray contíguo que possui a maior soma de elementos e retorne essa soma máxima.",
    instructions: [
      "O array sempre terá pelo menos um número.",
      "Pode conter números negativos.",
      "Retorne apenas o valor numérico da maior soma."
    ],
    starterCode: `function maxSubArray(nums) {
  // Seu código aqui
  return 0;
}`,
    functionName: "maxSubArray",
    testCases: [
      { id: "tc-1", input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, description: "Subarray [4, -1, 2, 1] soma 6" },
      { id: "tc-2", input: [[1]], expected: 1, description: "Elemento único [1]" },
      { id: "tc-3", input: [[5, 4, -1, 7, 8]], expected: 23, description: "Todos positivos e mistos somam 23" },
      { id: "tc-4", input: [[-1, -2, -3]], expected: -1, description: "Todos negativos: maior elemento isolado", isSecret: true }
    ],
    hints: [
      "O Algoritmo de Kadane resolve este problema em tempo O(n) e espaço O(1).",
      "Mantenha duas variáveis: currentSum e maxSum. Em cada elemento, decida se continua somando ou começa um novo subarray a partir do número atual: currentSum = Math.max(num, currentSum + num)."
    ]
  },
  {
    id: "chal-7",
    slug: "group-anagrams",
    title: "Agrupamento de Anagramas",
    difficulty: "medium",
    category: "strings",
    xp: 150,
    description: "Dado um array de strings, agrupe todos os anagramas juntos. Anagramas são palavras formadas pela reorganização exata das mesmas letras de outra palavra.",
    instructions: [
      "Todas as entradas serão compostas por letras minúsculas.",
      "A ordem dos grupos ou dos itens internos de cada grupo não importa (os testes ordenam antes de comparar).",
      "Retorne um array com os grupos de arrays."
    ],
    starterCode: `function groupAnagrams(strs) {
  // Seu código aqui
  return [];
}`,
    functionName: "groupAnagrams",
    testCases: [
      {
        id: "tc-1",
        input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
        expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
        description: "Agrupar 3 famílias de anagramas"
      },
      {
        id: "tc-2",
        input: [[""]],
        expected: [[""]],
        description: "String vazia única"
      },
      {
        id: "tc-3",
        input: [["a"]],
        expected: [["a"]],
        description: "Caractere único"
      }
    ],
    hints: [
      "Se você ordenar as letras de uma palavra (ex: 'tea'.split('').sort().join('')), você obtém uma chave canônica única ('aet').",
      "Use um Map ou objeto JavaScript onde a chave é a versão ordenada e o valor é a lista de palavras que geram essa chave!"
    ]
  },
  {
    id: "chal-8",
    slug: "debounce-simulation",
    title: "Simulador de Debounce",
    difficulty: "medium",
    category: "async",
    xp: 130,
    description: "Crie uma função simuladora de debounce que recebe uma lista de timestamps e um intervalo de delay, retornando apenas os índices das chamadas que realmente seriam executadas após o período de repouso.",
    instructions: [
      "Recebe timestamps: array ordenado de inteiros representando milissegundos em que a função foi chamada.",
      "Recebe delay: tempo de espera necessário sem novas chamadas.",
      "Uma chamada é executada se nenhuma outra chamada ocorrer dentro do intervalo de [timestamp, timestamp + delay]. A última chamada sempre é executada."
    ],
    starterCode: `function simulateDebounce(timestamps, delay) {
  // Retorne um array de booleanos ou índices executados
  // Retorne os índices das chamadas executadas:
  return [];
}`,
    functionName: "simulateDebounce",
    testCases: [
      { id: "tc-1", input: [[100, 200, 500, 800], 150], expected: [1, 2, 3], description: "Chamada 0 cancelada pela chamada em 200" },
      { id: "tc-2", input: [[0, 50, 100, 150], 100], expected: [3], description: "Disparos sucessivos rápidos, apenas o último executa" },
      { id: "tc-3", input: [[1000], 300], expected: [0], description: "Disparo isolado único executa sempre" }
    ],
    hints: [
      "Para cada índice i, compare timestamps[i+1] - timestamps[i].",
      "Se a diferença for menor ou igual ao delay, significa que a chamada foi resetada por um novo evento."
    ]
  },
  {
    id: "chal-9",
    slug: "merge-intervals",
    title: "Mesclar Intervalos Sobrepostos",
    difficulty: "medium",
    category: "algorithms",
    xp: 160,
    description: "Dado um array de intervalos onde intervalos[i] = [início, fim], mescle todos os intervalos que se sobrepõem e retorne um array com os intervalos não-sobrepostos que cobrem todos os intervalos de entrada.",
    instructions: [
      "Cada intervalo possui exatamente dois números: [start, end].",
      "O início sempre será menor ou igual ao fim.",
      "Retorne os intervalos mesclados ordenados pelo início."
    ],
    starterCode: `function mergeIntervals(intervals) {
  // Seu código aqui
  return [];
}`,
    functionName: "mergeIntervals",
    testCases: [
      { id: "tc-1", input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]], description: "[1,3] e [2,6] se sobrepõem e viram [1,6]" },
      { id: "tc-2", input: [[[1, 4], [4, 5]]], expected: [[1, 5]], description: "Intervalos adjacentes tocando na borda [4] devem mesclar" },
      { id: "tc-3", input: [[[6, 8], [1, 9]]], expected: [[1, 9]], description: "Intervalo que engloba o outro completamente", isSecret: true }
    ],
    hints: [
      "Primeiro passo crucial: ordene a lista de intervalos pelo valor inicial: intervals.sort((a, b) => a[0] - b[0]).",
      "Itere pela lista e verifique se o início do intervalo atual é menor ou igual ao fim do último intervalo adicionado no resultado."
    ]
  },
  {
    id: "chal-10",
    slug: "lru-cache-operations",
    title: "Simulador de Cache LRU (Least Recently Used)",
    difficulty: "hard",
    category: "logic",
    xp: 220,
    description: "Implemente um simulador de cache LRU que processa uma sequência de comandos 'PUT key value' e 'GET key', respeitando a capacidade máxima definida. Quando a capacidade for excedida, remova a chave menos recentemente usada.",
    instructions: [
      "Recebe a capacidade máxima (capacidade > 0) e uma lista de operações: ['PUT a 1', 'PUT b 2', 'GET a', 'PUT c 3', 'GET b'].",
      "GET key deve retornar o valor se existir, ou -1 se a chave não estiver no cache.",
      "Tanto GET quanto PUT em uma chave existente atualizam a chave como recentemente usada.",
      "Retorne um array com as respostas de todas as operações 'GET' executadas na sequência."
    ],
    starterCode: `function simulateLRU(capacity, operations) {
  // Retorne um array com o resultado de cada operação GET
  return [];
}`,
    functionName: "simulateLRU",
    testCases: [
      {
        id: "tc-1",
        input: [2, ["PUT 1 1", "PUT 2 2", "GET 1", "PUT 3 3", "GET 2", "PUT 4 4", "GET 1", "GET 3", "GET 4"]],
        expected: [1, -1, -1, 3, 4],
        description: "Capacidade 2: chave 2 desalojada após GET 1 e PUT 3; chave 1 desalojada por PUT 4"
      },
      {
        id: "tc-2",
        input: [1, ["PUT 10 100", "GET 10", "PUT 20 200", "GET 10", "GET 20"]],
        expected: [100, -1, 200],
        description: "Capacidade 1: cada novo PUT substitui o anterior"
      },
      {
        id: "tc-3",
        input: [2, ["GET 99"]],
        expected: [-1],
        description: "GET em chave inexistente retorna -1"
      }
    ],
    hints: [
      "Em JavaScript moderno, o objeto Map nativo preserva a ordem de inserção das chaves!",
      "Ao acessar (GET) ou atualizar (PUT) uma chave existente, você pode deletá-la e reinseri-la no Map para movê-la para o final (mais recente).",
      "A chave menos recentemente usada é a primeira do Map: map.keys().next().value."
    ]
  }
];
