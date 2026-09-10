export interface TestCase {
  input: any;
  expected: any;
  description: string;
  hidden?: boolean;
}

export interface InterviewChallenge {
  id: string;
  company: string;
  companyBadge: string;
  role: string;
  difficulty: "Júnior" | "Pleno" | "Sênior";
  timeLimitMinutes: number;
  title: string;
  description: string;
  tags: string[];
  starterCode: string;
  solutionHint: string;
  targetComplexity: {
    time: string;
    space: string;
  };
  testCases: TestCase[];
}

export const mockInterviewChallenges: InterviewChallenge[] = [
  {
    id: "nubank-idempotency",
    company: "Nubank",
    companyBadge: "Fintech",
    role: "Backend & Systems Engineer",
    difficulty: "Pleno",
    timeLimitMinutes: 30,
    title: "Processador de Transações Financeiras com Idempotência",
    tags: ["Hash Map", "Idempotência", "Fintech", "Lógica"],
    description: `No Nubank, uma transação não pode ser processada duas vezes devido a re-tentativas de rede (duplicação de requisições).

Implemente a função \`processTransactions(transactions, initialBalance)\`:
- Cada transação possui: \`{ id: string, amount: number }\`.
- Se o \`id\` da transação já foi processado anteriormente, desconsidere a transação duplicada.
- Se o saldo da conta for insuficiente (\`balance - amount < 0\`), rejeite a transação.
- Retorne um objeto com o saldo final e a lista de IDs de transações aprovadas: \`{ finalBalance: number, approvedIds: string[] }\`.`,
    starterCode: `function processTransactions(transactions, initialBalance) {
  let balance = initialBalance;
  const approvedIds = [];
  const seenIds = new Set();

  for (const tx of transactions) {
    // 1. Verifique se o ID já foi processado
    if (seenIds.has(tx.id)) continue;

    // 2. Verifique se há saldo suficiente
    if (balance >= tx.amount) {
      balance -= tx.amount;
      approvedIds.push(tx.id);
      seenIds.add(tx.id);
    }
  }

  return { finalBalance: balance, approvedIds };
}`,
    solutionHint: "Utilize um Set para garantir busca de IDs em O(1), mantendo a complexidade total em O(N).",
    targetComplexity: {
      time: "O(n)",
      space: "O(n)"
    },
    testCases: [
      {
        input: [
          [
            { id: "tx-1", amount: 50 },
            { id: "tx-2", amount: 30 },
            { id: "tx-1", amount: 50 }, // duplicada
            { id: "tx-3", amount: 40 }  // saldo insuficiente (100 - 50 - 30 = 20)
          ],
          100
        ],
        expected: { finalBalance: 20, approvedIds: ["tx-1", "tx-2"] },
        description: "Ignora duplicatas e rejeita saldo insuficiente"
      },
      {
        input: [
          [
            { id: "a", amount: 10 },
            { id: "b", amount: 20 }
          ],
          50
        ],
        expected: { finalBalance: 20, approvedIds: ["a", "b"] },
        description: "Aprova todas as transações válidas"
      },
      {
        input: [
          [
            { id: "dup", amount: 100 },
            { id: "dup", amount: 100 },
            { id: "dup", amount: 100 }
          ],
          500
        ],
        expected: { finalBalance: 400, approvedIds: ["dup"] },
        description: "Múltiplas duplicatas seguidas",
        hidden: true
      }
    ]
  },
  {
    id: "mercadolivre-top-products",
    company: "Mercado Livre",
    companyBadge: "E-Commerce",
    role: "Frontend & Full Stack",
    difficulty: "Pleno",
    timeLimitMinutes: 35,
    title: "Ranking de Produtos Mais Vendidos por Categoria",
    tags: ["Array", "Agrupamento", "E-Commerce", "Algoritmos"],
    description: `No Mercado Livre, a página de busca precisa ordenar e agrupar os produtos por categoria com base na pontuação de relevância.

Implemente a função \`getTopProductsByCategory(products, k)\`:
- Recebe uma lista de produtos: \`{ name: string, category: string, sales: number, rating: number }\`.
- Calcula a pontuação (\`score = sales * 0.7 + rating * 20\`).
- Retorna um objeto onde as chaves são as categorias e os valores são os \`k\` melhores produtos de cada categoria (apenas os nomes), ordenados por score decrescente.`,
    starterCode: `function getTopProductsByCategory(products, k) {
  const categories = {};

  // Agrupar e calcular score
  for (const prod of products) {
    const score = prod.sales * 0.7 + prod.rating * 20;
    if (!categories[prod.category]) {
      categories[prod.category] = [];
    }
    categories[prod.category].push({ name: prod.name, score });
  }

  // Ordenar e pegar os k melhores
  const result = {};
  for (const cat in categories) {
    categories[cat].sort((a, b) => b.score - a.score);
    result[cat] = categories[cat].slice(0, k).map(p => p.name);
  }

  return result;
}`,
    solutionHint: "Agrupe por categoria usando um Map ou Objeto literal e aplique slice(0, k) após ordenar.",
    targetComplexity: {
      time: "O(n log n)",
      space: "O(n)"
    },
    testCases: [
      {
        input: [
          [
            { name: "Teclado Pro", category: "Informatica", sales: 100, rating: 4.8 },
            { name: "Mouse RGB", category: "Informatica", sales: 150, rating: 4.2 },
            { name: "Monitor 4K", category: "Informatica", sales: 30, rating: 4.9 },
            { name: "Cafeteira", category: "Casa", sales: 80, rating: 4.7 }
          ],
          2
        ],
        expected: {
          Informatica: ["Mouse RGB", "Teclado Pro"],
          Casa: ["Cafeteira"]
        },
        description: "Agrupa e filtra top 2 por categoria"
      },
      {
        input: [
          [
            { name: "Item 1", category: "Geral", sales: 10, rating: 5.0 }
          ],
          1
        ],
        expected: {
          Geral: ["Item 1"]
        },
        description: "Categoria única com 1 produto",
        hidden: true
      }
    ]
  },
  {
    id: "google-max-subarray",
    company: "Google",
    companyBadge: "Big Tech",
    role: "Software Development Engineer (SDE)",
    difficulty: "Sênior",
    timeLimitMinutes: 45,
    title: "Subarray de Soma Máxima (Algoritmo de Kadane)",
    tags: ["Algoritmos", "Programação Dinâmica", "Google", "Big-O"],
    description: `Dado um array de números inteiros \`nums\` (que pode conter números positivos e negativos), encontre o subarray contíguo que possui a maior soma possível e retorne o valor dessa soma.

Exemplo: para \`[-2, 1, -3, 4, -1, 2, 1, -5, 4]\`, o subarray \`[4, -1, 2, 1]\` possui a maior soma = 6.

Restrição: Deve ser resolvido em tempo linear \`O(n)\` com \`O(1)\` de espaço extra!`,
    starterCode: `function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }

  return maxSoFar;
}`,
    solutionHint: "O Algoritmo de Kadane decide a cada elemento se vale a pena somar ao acumulador anterior ou iniciar um novo subarray a partir do elemento atual.",
    targetComplexity: {
      time: "O(n)",
      space: "O(1)"
    },
    testCases: [
      {
        input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6,
        description: "Exemplo clássico do LeetCode/Google"
      },
      {
        input: [[1]],
        expected: 1,
        description: "Array com apenas um número"
      },
      {
        input: [[5, 4, -1, 7, 8]],
        expected: 23,
        description: "Array com maioria de números positivos"
      },
      {
        input: [[-5, -3, -8, -1]],
        expected: -1,
        description: "Array composto apenas por números negativos",
        hidden: true
      }
    ]
  },
  {
    id: "ifood-order-queue",
    company: "iFood",
    companyBadge: "Delivery",
    role: "Backend & Concurrency",
    difficulty: "Júnior",
    timeLimitMinutes: 25,
    title: "Fila Inteligente de Pedidos Prioritários",
    tags: ["Fila (Queue)", "Ordenação", "iFood"],
    description: `No iFood, os pedidos devem ser despachados priorizando clientes VIP/Clube iFood e tempo de espera.

Implemente a função \`orderDispatchQueue(orders)\`:
- Cada pedido possui: \`{ id: string, isVIP: boolean, waitMinutes: number }\`.
- Pedidos VIP devem vir sempre ANTES de pedidos normais.
- Entre pedidos da mesma categoria VIP, ordene por maior tempo de espera (\`waitMinutes\` decrescente).
- Retorne apenas o array com os \`id\` dos pedidos na ordem exata de despacho.`,
    starterCode: `function orderDispatchQueue(orders) {
  return orders
    .slice()
    .sort((a, b) => {
      // 1. VIP primeiro
      if (a.isVIP !== b.isVIP) {
        return a.isVIP ? -1 : 1;
      }
      // 2. Maior tempo de espera primeiro
      return b.waitMinutes - a.waitMinutes;
    })
    .map(o => o.id);
}`,
    solutionHint: "Ordene usando critérios encadeados: compare o booleano isVIP primeiro, e em caso de empate compare waitMinutes decrescente.",
    targetComplexity: {
      time: "O(n log n)",
      space: "O(n)"
    },
    testCases: [
      {
        input: [
          [
            { id: "P1", isVIP: false, waitMinutes: 15 },
            { id: "P2", isVIP: true, waitMinutes: 5 },
            { id: "P3", isVIP: true, waitMinutes: 20 },
            { id: "P4", isVIP: false, waitMinutes: 30 }
          ]
        ],
        expected: ["P3", "P2", "P4", "P1"],
        description: "VIPs despachados primeiro, ordenados por tempo de espera"
      },
      {
        input: [
          [
            { id: "A", isVIP: false, waitMinutes: 10 },
            { id: "B", isVIP: false, waitMinutes: 40 }
          ]
        ],
        expected: ["B", "A"],
        description: "Sem clientes VIP, vence o que esperou mais",
        hidden: true
      }
    ]
  }
];
