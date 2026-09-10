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
    ],
    company: "Mercado Livre",
    companyRole: "Frontend Jr"
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
    ],
    company: "Google",
    companyRole: "Software Engineer"
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
    ],
    company: "Amazon",
    companyRole: "Backend Engineer"
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
    ],
    company: "Meta",
    companyRole: "Senior Frontend"
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
    ],
    company: "Spotify",
    companyRole: "Fullstack Engineer"
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
    ],
    company: "Netflix",
    companyRole: "Algorithms Specialist"
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
    ],
    company: "Uber",
    companyRole: "Software Engineer"
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
    ],
    company: "Nubank",
    companyRole: "Frontend Specialist"
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
    ],
    company: "Google",
    companyRole: "Cloud Platform Engineer"
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
    ],
    company: "Netflix",
    companyRole: "Distributed Systems"
  },
  {
    id: "chal-11",
    slug: "fizzbuzz-custom",
    title: "FizzBuzz Dinâmico & Regras Customizadas",
    difficulty: "easy",
    category: "logic",
    xp: 60,
    description: "Crie uma função que gere a sequência de 1 a n aplicando regras de substituição configuráveis passadas como um objeto divisor:palavra.",
    instructions: [
      "Recebe n (inteiro positivo) e rules (objeto onde as chaves numéricas são divisores e os valores são palavras, ex: { 3: 'Fizz', 5: 'Buzz' }).",
      "Para cada número de 1 a n, se for divisível por uma ou mais regras, concatene as palavras na ordem crescente dos divisores.",
      "Se não for divisível por nenhum, retorne o número em formato de string.",
      "Retorne um array com as n strings resultantes."
    ],
    starterCode: `function customFizzBuzz(n, rules) {
  // Seu código aqui
  return [];
}`,
    functionName: "customFizzBuzz",
    testCases: [
      {
        id: "tc-1",
        input: [5, { "3": "Fizz", "5": "Buzz" }],
        expected: ["1", "2", "Fizz", "4", "Buzz"],
        description: "Regras clássicas até 5"
      },
      {
        id: "tc-2",
        input: [15, { "3": "Fizz", "5": "Buzz" }],
        expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"],
        description: "Múltiplo comum (15) combina FizzBuzz"
      },
      {
        id: "tc-3",
        input: [6, { "2": "Par", "3": "Trio" }],
        expected: ["1", "Par", "Trio", "Par", "5", "ParTrio"],
        description: "Regras arbitrárias (2 e 3)"
      }
    ],
    hints: [
      "Você pode obter os divisores com Object.keys(rules).map(Number).sort((a, b) => a - b).",
      "Para cada i de 1 até n, verifique se i % divisor === 0 e acumule o texto."
    ],
    company: "Mercado Livre",
    companyRole: "Junior Developer"
  },
  {
    id: "chal-12",
    slug: "palindrome-checker",
    title: "Verificador de Palíndromos Alfanuméricos",
    difficulty: "easy",
    category: "strings",
    xp: 60,
    description: "Determine se uma frase ou palavra é um palíndromo, ignorando maiúsculas, minúsculas, espaços e pontuações.",
    instructions: [
      "Remova todos os caracteres que não sejam letras ou números.",
      "Converta tudo para minúsculas antes de validar.",
      "Retorne true se a sequência for lida da mesma forma de trás para frente, caso contrário false."
    ],
    starterCode: `function isPalindrome(str) {
  // Seu código aqui
  return false;
}`,
    functionName: "isPalindrome",
    testCases: [
      {
        id: "tc-1",
        input: ["A man, a plan, a canal: Panama"],
        expected: true,
        description: "Palíndromo clássico com pontuação e espaços"
      },
      {
        id: "tc-2",
        input: ["race a car"],
        expected: false,
        description: "Não é palíndromo"
      },
      {
        id: "tc-3",
        input: ["0P"],
        expected: false,
        description: "Diferença alfanumérica"
      },
      {
        id: "tc-4",
        input: ["Socorram-me, subi no onibus em Marrocos"],
        expected: true,
        description: "Palíndromo em português com traço e espaços"
      }
    ],
    hints: [
      "Use expressão regular para filtrar apenas alfanuméricos: str.toLowerCase().replace(/[^a-z0-9]/g, '').",
      "Pode usar dois ponteiros (início e fim) para comparar os caracteres sem criar strings reversas extras."
    ],
    company: "Spotify",
    companyRole: "Core Web"
  },
  {
    id: "chal-13",
    slug: "currying-sum",
    title: "Soma Encadeada Infinita (Currying)",
    difficulty: "medium",
    category: "logic",
    xp: 110,
    description: "Crie uma função de currying chamada 'currySum' que pode ser chamada sucessivamente com argumentos individuais e retorna a soma acumulada quando chamada sem argumentos.",
    instructions: [
      "currySum(1)(2)(3)() deve retornar 6.",
      "currySum(5)() deve retornar 5.",
      "currySum() sem argumentos iniciais deve retornar 0."
    ],
    starterCode: `function currySum(a) {
  // Seu código aqui
  if (a === undefined) return 0;
  return function next(b) {
    return 0;
  };
}`,
    functionName: "currySum",
    testCases: [
      {
        id: "tc-1",
        input: [1, 2, 3],
        expected: 6,
        description: "currySum(1)(2)(3)() -> 6"
      },
      {
        id: "tc-2",
        input: [10, -5, 20],
        expected: 25,
        description: "Soma com números negativos e positivos"
      },
      {
        id: "tc-3",
        input: [],
        expected: 0,
        description: "currySum() imediato retorna 0"
      }
    ],
    hints: [
      "Crie uma função interna recursiva que mantém a soma total acumulada em seu escopo léxico (closure).",
      "Quando o argumento recebido for undefined, retorne a soma atual. Caso contrário, adicione ao acumulador e retorne a própria função."
    ],
    company: "Nubank",
    companyRole: "Senior Developer"
  },
  {
    id: "chal-14",
    slug: "binary-search",
    title: "Busca Binária O(log n)",
    difficulty: "medium",
    category: "algorithms",
    xp: 130,
    description: "Implemente o algoritmo de busca binária em um array ordenado de números inteiros para encontrar o índice de um valor alvo.",
    instructions: [
      "nums é uma lista de inteiros ordenados em ordem estritamente crescente.",
      "Se target existir no array, retorne seu índice.",
      "Se target não existir, retorne -1.",
      "O algoritmo deve ter complexidade de tempo O(log n)."
    ],
    starterCode: `function binarySearch(nums, target) {
  // Seu código aqui em O(log n)
  return -1;
}`,
    functionName: "binarySearch",
    testCases: [
      {
        id: "tc-1",
        input: [[-1, 0, 3, 5, 9, 12], 9],
        expected: 4,
        description: "Encontra o 9 no índice 4"
      },
      {
        id: "tc-2",
        input: [[-1, 0, 3, 5, 9, 12], 2],
        expected: -1,
        description: "Elemento 2 ausente retorna -1"
      },
      {
        id: "tc-3",
        input: [[5], 5],
        expected: 0,
        description: "Array de elemento único encontrado"
      },
      {
        id: "tc-4",
        input: [[1, 3, 5, 7, 9, 11, 13, 15], 1],
        expected: 0,
        description: "Primeiro elemento da lista"
      }
    ],
    hints: [
      "Use dois ponteiros: left = 0 e right = nums.length - 1.",
      "A cada iteração calcule mid = Math.floor((left + right) / 2) e compare nums[mid] com target."
    ],
    company: "Google",
    companyRole: "Systems Engineer"
  },
  {
    id: "chal-15",
    slug: "deep-clone-object",
    title: "Clonagem Profunda de Objetos (Deep Clone)",
    difficulty: "medium",
    category: "logic",
    xp: 140,
    description: "Crie uma função para clonar profundamente estruturas aninhadas de objetos e arrays em JavaScript sem compartilhar referências de memória.",
    instructions: [
      "Suporte tipos primitivos (números, strings, booleanos, null, undefined).",
      "Suporte arrays e objetos aninhados com profundidade arbitrária.",
      "Não utilize JSON.parse(JSON.stringify(obj)) para preservar valores indefinidos e tipos especiais."
    ],
    starterCode: `function deepClone(obj) {
  // Seu código aqui (sem usar JSON.parse)
  return obj;
}`,
    functionName: "deepClone",
    testCases: [
      {
        id: "tc-1",
        input: [{ a: 1, b: { c: 2, d: [3, 4] } }],
        expected: { a: 1, b: { c: 2, d: [3, 4] } },
        description: "Objeto complexo com arrays e objetos aninhados"
      },
      {
        id: "tc-2",
        input: [[1, [2, 3], { x: 99 }]],
        expected: [1, [2, 3], { x: 99 }],
        description: "Array com sub-array e sub-objeto"
      },
      {
        id: "tc-3",
        input: [42],
        expected: 42,
        description: "Tipo primitivo direto"
      }
    ],
    hints: [
      "Verifique se o valor é nulo ou não é um objeto (typeof obj !== 'object'). Se for primitivo, retorne o próprio valor.",
      "Se Array.isArray(obj), itere com .map(item => deepClone(item)).",
      "Para objetos, crie uma cópia {} e itere sobre Object.entries(obj)."
    ],
    company: "Meta",
    companyRole: "Web Platform"
  },
  {
    id: "chal-16",
    slug: "rate-limiter-token-bucket",
    title: "Algoritmo de Rate Limiting (Token Bucket)",
    difficulty: "hard",
    category: "async",
    xp: 240,
    description: "Implemente uma simulação do algoritmo Token Bucket para controle de tráfego de requisições de API.",
    instructions: [
      "Recebe timestamps (array de números em ms), capacity (número máximo de tokens que o balde suporta) e refillRatePerSec (tokens gerados por segundo).",
      "O balde inicia cheio com 'capacity' tokens no timestamp da primeira requisição.",
      "A cada requisição, tokens são repostos proporcionalmente ao tempo decorrido desde a última requisição: tempoPassadoSegundos * refillRatePerSec.",
      "Se houver pelo menos 1 token disponível, a requisição consome 1 token e é permitida (true). Caso contrário, é rejeitada (false).",
      "Retorne um array de booleanos correspondente a cada requisição."
    ],
    starterCode: `function tokenBucket(timestamps, capacity, refillRatePerSec) {
  // Retorne um array de booleanos [true, false, ...]
  return [];
}`,
    functionName: "tokenBucket",
    testCases: [
      {
        id: "tc-1",
        input: [[0, 100, 200, 300, 400], 3, 2],
        expected: [true, true, true, false, false],
        description: "Capacidade 3 esgotada rapidamente em 200ms antes de novo token ser gerado"
      },
      {
        id: "tc-2",
        input: [[0, 1000, 2000], 1, 1],
        expected: [true, true, true],
        description: "1 token por segundo reposto a tempo para cada requisição"
      },
      {
        id: "tc-3",
        input: [[0, 500, 600, 1500], 2, 2],
        expected: [true, true, false, true],
        description: "Consumo de 2 tokens, terceiro falha e quarto após 900ms é aceito"
      }
    ],
    hints: [
      "Calcule o tempo decorrido: (currentTimestamp - lastTimestamp) / 1000.",
      "Adicione os novos tokens: tokens = Math.min(capacity, tokens + elapsedSec * refillRatePerSec).",
      "Se tokens >= 1: tokens -= 1 e registre true. Senão registre false."
    ],
    company: "Nubank",
    companyRole: "Fintech Platform"
  }
];
