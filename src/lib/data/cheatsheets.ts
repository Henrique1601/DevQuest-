export interface CheatParameter {
  name: string;
  type: string;
  description: string;
}

export interface CheatItem {
  name: string;
  syntax: string;
  description: string;
  example: string;
  outputOrNotes?: string;
  complexity?: string; // ex: "O(1)", "O(n)", "O(n log n)"
  mutates?: boolean; // true if mutates original, false if immutable
  returns?: string; // ex: "Novo Array", "boolean", "O item removido"
  parameters?: CheatParameter[];
  categoryTag?: "array" | "string" | "object" | "stack" | "queue" | "async" | "sql" | "css" | "git" | "http";
  playgroundSnippet?: {
    html: string;
    css: string;
    js: string;
  };
}

export interface CheatCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  items: CheatItem[];
}

export const mockCheatCategories: CheatCategory[] = [
  {
    id: "stack-structures",
    title: "Estruturas de Dados: Pilha (Stack - LIFO)",
    badge: "Stack / Estruturas",
    description: "Referência completa de Pilha (LIFO: Last-In, First-Out), seus métodos fundamentais, complexidades e problemas clássicos de entrevista técnica.",
    items: [
      {
        name: "stack.push(elemento)",
        syntax: "stack.push(elemento)",
        description: "Insere um novo elemento no topo da pilha. A operação possui tempo constante O(1).",
        example: `class Stack {
  constructor() { this.items = []; }
  push(element) { this.items.push(element); }
  peek() { return this.items[this.items.length - 1]; }
}

const pilha = new Stack();
pilha.push("Prato 1");
pilha.push("Prato 2");
pilha.push("Prato 3");
console.log("Topo após pushes:", pilha.peek());`,
        outputOrNotes: "Topo após pushes: Prato 3",
        complexity: "O(1)",
        mutates: true,
        returns: "void / novo tamanho",
        categoryTag: "stack",
        parameters: [{ name: "elemento", type: "any", description: "O dado a ser empilhado no topo." }]
      },
      {
        name: "stack.pop()",
        syntax: "const removido = stack.pop()",
        description: "Remove e retorna o elemento que está no topo da pilha (o último que entrou). Retorna null se vazia.",
        example: `class Stack {
  constructor() { this.items = ["A", "B", "C"]; }
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  isEmpty() { return this.items.length === 0; }
}

const pilha = new Stack();
const topoRemovido = pilha.pop();
console.log("Elemento desempilhado:", topoRemovido);
console.log("Novo topo:", pilha.items[pilha.items.length - 1]);`,
        outputOrNotes: "Elemento desempilhado: C | Novo topo: B",
        complexity: "O(1)",
        mutates: true,
        returns: "Elemento do topo",
        categoryTag: "stack"
      },
      {
        name: "stack.peek() / top()",
        syntax: "const topo = stack.peek()",
        description: "Inspeciona o elemento atualmente no topo da pilha SEM removê-lo. Essencial para verificar precedência e balanceamento.",
        example: `class Stack {
  constructor() { this.items = [10, 20, 30]; }
  peek() { return this.items[this.items.length - 1]; }
}

const s = new Stack();
console.log("Topo atual:", s.peek());
console.log("Tamanho permanece:", s.items.length);`,
        outputOrNotes: "Topo atual: 30 | Tamanho permanece: 3",
        complexity: "O(1)",
        mutates: false,
        returns: "Elemento do topo sem alterar a pilha",
        categoryTag: "stack"
      },
      {
        name: "stack.isEmpty() & stack.size()",
        syntax: "stack.isEmpty(): boolean | stack.size(): number",
        description: "Verifica se a pilha não contém elementos e retorna o número total de itens armazenados.",
        example: `class Stack {
  constructor() { this.items = []; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

const s = new Stack();
console.log("Está vazia?", s.isEmpty());
s.items.push("task-1");
console.log("Tamanho:", s.size());
console.log("Está vazia?", s.isEmpty());`,
        outputOrNotes: "Está vazia? true -> Tamanho: 1 -> Está vazia? false",
        complexity: "O(1)",
        mutates: false,
        returns: "boolean / number",
        categoryTag: "stack"
      },
      {
        name: "stack.clear()",
        syntax: "stack.clear()",
        description: "Remove todos os elementos da pilha, redefinindo o ponteiro de topo ou limpando a lista.",
        example: `class Stack {
  constructor() { this.items = [1, 2, 3, 4]; }
  clear() { this.items = []; }
  size() { return this.items.length; }
}

const s = new Stack();
s.clear();
console.log("Tamanho após clear:", s.size());`,
        outputOrNotes: "Tamanho após clear: 0",
        complexity: "O(1)",
        mutates: true,
        returns: "void",
        categoryTag: "stack"
      },
      {
        name: "Implementação Completa de Pilha (Classe ES6/TS)",
        syntax: "class Stack<T> { ... }",
        description: "Implementação robusta orientada a objetos com métodos e operações de pilha.",
        example: `class Stack {
  constructor() { this._items = []; }
  push(element) { this._items.push(element); }
  pop() { return this._items.pop(); }
  peek() { return this._items[this._items.length - 1]; }
  isEmpty() { return this._items.length === 0; }
  size() { return this._items.length; }
  print() { return this._items.slice().reverse().join(" -> "); }
}

const p = new Stack();
p.push("Base");
p.push("Meio");
p.push("Topo");
console.log("Visualização (Topo à Base):", p.print());`,
        outputOrNotes: "Visualização: Topo -> Meio -> Base",
        complexity: "O(1) para operações básicas",
        mutates: true,
        returns: "Instância de Stack",
        categoryTag: "stack"
      },
      {
        name: "Desafio Real de Entrevista: Valid Parentheses",
        syntax: "isValidParentheses(str: string): boolean",
        description: "Algoritmo clássico de FAANG usando Pilha para verificar se parênteses, colchetes e chaves estão balanceados.",
        example: `function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (['(', '{', '['].includes(char)) {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}

console.log("'{[()]}':", isValidParentheses("{[()]}"));
console.log("'{[(])}':", isValidParentheses("{[(])}"));`,
        outputOrNotes: "'{[()]}': true | '{[(])}': false",
        complexity: "O(n) tempo, O(n) espaço",
        mutates: false,
        returns: "boolean",
        categoryTag: "stack"
      }
    ]
  },
  {
    id: "queue-structures",
    title: "Estruturas de Dados: Fila (Queue - FIFO)",
    badge: "Queue / Estruturas",
    description: "Referência de Fila (FIFO: First-In, First-Out) para processamento sequencial de tarefas, mensagens e buffers.",
    items: [
      {
        name: "queue.enqueue(elemento)",
        syntax: "queue.enqueue(elemento)",
        description: "Insere um elemento no final da fila (fim da fila).",
        example: `class Queue {
  constructor() { this.items = []; }
  enqueue(item) { this.items.push(item); }
  front() { return this.items[0]; }
}

const fila = new Queue();
fila.enqueue("Primeiro Cliente");
fila.enqueue("Segundo Cliente");
console.log("Primeiro da fila:", fila.front());`,
        outputOrNotes: "Primeiro da fila: Primeiro Cliente",
        complexity: "O(1)",
        mutates: true,
        returns: "void",
        categoryTag: "queue"
      },
      {
        name: "queue.dequeue()",
        syntax: "const item = queue.dequeue()",
        description: "Remove e retorna o primeiro elemento que entrou na fila (o mais antigo).",
        example: `class Queue {
  constructor() { this.items = ["Email 1", "Email 2", "Email 3"]; }
  dequeue() { return this.items.shift(); }
  front() { return this.items[0]; }
}

const filaEnvio = new Queue();
const processado = filaEnvio.dequeue();
console.log("Processado:", processado);
console.log("Próximo da fila:", filaEnvio.front());`,
        outputOrNotes: "Processado: Email 1 | Próximo da fila: Email 2",
        complexity: "O(1) com lista encadeada ou O(n) com array shift",
        mutates: true,
        returns: "Elemento desenfileirado",
        categoryTag: "queue"
      }
    ]
  },
  {
    id: "js-arrays",
    title: "JavaScript: Métodos de Array",
    badge: "JavaScript",
    description: "Referência completa dos métodos modernos de Array para transformar, iterar, buscar e manipular listas.",
    items: [
      {
        name: ".map()",
        syntax: "const novoArray = array.map((item, index, arr) => novoValor)",
        description: "Cria um novo array transformando cada elemento através de uma função callback. Não altera o array original.",
        example: `const precos = [100, 250, 400];
const comDesconto = precos.map(p => p * 0.9);
console.log("Com 10% desconto:", comDesconto);
console.log("Original intacto:", precos);`,
        outputOrNotes: "[90, 225, 360] (Imutável)",
        complexity: "O(n)",
        mutates: false,
        returns: "Novo Array com o mesmo tamanho",
        categoryTag: "array",
        parameters: [
          { name: "callback", type: "Function", description: "(item, index, array) => novoItem" }
        ],
        playgroundSnippet: {
          html: `<div id="app"><h2>Array.map()</h2><ul id="list"></ul></div>`,
          css: `body { background: #0f172a; color: #fff; font-family: sans-serif; padding: 20px; }
li { color: #38bdf8; margin: 4px 0; }`,
          js: `const nums = [10, 20, 30, 40];
const list = document.getElementById('list');
nums.map(n => n * 2).forEach(val => {
  const li = document.createElement('li');
  li.innerText = 'Dobro: ' + val;
  list.appendChild(li);
});`
        }
      },
      {
        name: ".filter()",
        syntax: "const filtrados = array.filter((item, index, arr) => condicaoBooleana)",
        description: "Retorna um novo array contendo apenas os elementos que retornam true na condição testada.",
        example: `const devs = [
  { nome: "Ana", nivel: "senior" },
  { nome: "Carlos", nivel: "junior" },
  { nome: "Julia", nivel: "senior" }
];
const seniors = devs.filter(d => d.nivel === "senior");
console.log("Apenas seniores:", seniors.map(s => s.nome));`,
        outputOrNotes: "['Ana', 'Julia'] (Imutável)",
        complexity: "O(n)",
        mutates: false,
        returns: "Novo Array filtrado",
        categoryTag: "array"
      },
      {
        name: ".reduce()",
        syntax: "const acumulado = array.reduce((acc, curr, index, arr) => novoAcc, valorInicial)",
        description: "Executa uma função redutora em cada elemento, resultando em um único valor final (soma, objeto acumulado, etc).",
        example: `const despesas = [45.5, 120.0, 32.9];
const total = despesas.reduce((acc, val) => acc + val, 0);
console.log("Total gasto:", total.toFixed(2));`,
        outputOrNotes: "198.40 (Imutável)",
        complexity: "O(n)",
        mutates: false,
        returns: "Valor acumulado de qualquer tipo",
        categoryTag: "array"
      },
      {
        name: ".find() & .findIndex()",
        syntax: "array.find(fn) | array.findIndex(fn)",
        description: ".find() retorna o PRIMEIRO elemento que satisfaz a condição (ou undefined). .findIndex() retorna o índice ou -1.",
        example: `const produtos = [
  { id: 101, nome: "Teclado" },
  { id: 102, nome: "Mouse" }
];
const item = produtos.find(p => p.id === 102);
const idx = produtos.findIndex(p => p.id === 102);
console.log("Encontrado:", item.nome, "no índice:", idx);`,
        outputOrNotes: "Mouse no índice 1",
        complexity: "O(n)",
        mutates: false,
        returns: "Elemento encontrado ou undefined / Índice ou -1",
        categoryTag: "array"
      },
      {
        name: ".some() & .every()",
        syntax: "array.some(condicao) | array.every(condicao)",
        description: ".some() verifica se AO MENOS UM elemento cumpre a regra. .every() verifica se TODOS cumprem a regra.",
        example: `const notas = [8, 9, 5, 10];
const algumReprovado = notas.some(n => n < 6);
const todosAprovados = notas.every(n => n >= 6);
console.log("Algum < 6?", algumReprovado);
console.log("Todos >= 6?", todosAprovados);`,
        outputOrNotes: "Algum < 6? true | Todos >= 6? false",
        complexity: "O(n)",
        mutates: false,
        returns: "boolean",
        categoryTag: "array"
      },
      {
        name: ".slice() (Imutável)",
        syntax: "array.slice(inicio, fim)",
        description: "Retorna uma cópia rasa (shallow copy) de uma fatia do array sem modificar o original. Ideal para React!",
        example: `const frutas = ["Maçã", "Banana", "Uva", "Manga"];
const fatia = frutas.slice(1, 3);
console.log("Fatia:", fatia);
console.log("Original:", frutas);`,
        outputOrNotes: "Fatia: ['Banana', 'Uva'] | Original intacto",
        complexity: "O(k)",
        mutates: false,
        returns: "Novo Array fatiado",
        categoryTag: "array"
      },
      {
        name: ".splice() (Mutável)",
        syntax: "array.splice(inicio, qtdExcluir, ...novosItens)",
        description: "Altera o array original removendo ou inserindo novos elementos no local especificado.",
        example: `const cores = ["Vermelho", "Verde", "Azul"];
const removidos = cores.splice(1, 1, "Amarelo", "Roxo");
console.log("Removido:", removidos);
console.log("Array modificado:", cores);`,
        outputOrNotes: "Removido: ['Verde'] | cores: ['Vermelho', 'Amarelo', 'Roxo', 'Azul']",
        complexity: "O(n)",
        mutates: true,
        returns: "Array com itens removidos",
        categoryTag: "array"
      },
      {
        name: ".includes() & .indexOf()",
        syntax: "array.includes(valor, deIndice) | array.indexOf(valor)",
        description: "includes verifica se o elemento exato existe (retorna boolean). indexOf retorna a posição ou -1.",
        example: `const linguagens = ["Python", "JavaScript", "Rust"];
console.log("Tem Rust?", linguagens.includes("Rust"));
console.log("Posição de JavaScript:", linguagens.indexOf("JavaScript"));`,
        outputOrNotes: "Tem Rust? true | Posição: 1",
        complexity: "O(n)",
        mutates: false,
        returns: "boolean / number",
        categoryTag: "array"
      },
      {
        name: ".sort() (Mutável)",
        syntax: "array.sort((a, b) => a - b)",
        description: "Ordena os elementos no próprio array. ATENÇÃO: por padrão ordena como strings ('10' vem antes de '2'). Sempre use compareFunction para números.",
        example: `const numeros = [40, 100, 1, 5, 25, 10];
numeros.sort((a, b) => a - b);
console.log("Ordenado crescente:", numeros);`,
        outputOrNotes: "[1, 5, 10, 25, 40, 100]",
        complexity: "O(n log n)",
        mutates: true,
        returns: "Referência ao próprio array ordenado",
        categoryTag: "array"
      },
      {
        name: ".reverse() (Mutável) & .toReversed()",
        syntax: "array.reverse() | array.toReversed()",
        description: "reverse() inverte a ordem dos itens modificando o array original. toReversed() (ES2023) cria uma cópia invertida.",
        example: `const fila = ["A", "B", "C"];
fila.reverse();
console.log("Invertido:", fila);`,
        outputOrNotes: "['C', 'B', 'A']",
        complexity: "O(n)",
        mutates: true,
        returns: "Array invertido",
        categoryTag: "array"
      },
      {
        name: ".flat() & .flatMap()",
        syntax: "array.flat(profundidade) | array.flatMap(fn)",
        description: "flat() achata arrays aninhados. flatMap() mapeia e achata o resultado em 1 nível.",
        example: `const matriz = [1, [2, [3, 4]]];
console.log("Nível 1:", matriz.flat(1));
console.log("Total:", matriz.flat(Infinity));

const frases = ["olá mundo", "dev quest"];
console.log("Palavras:", frases.flatMap(f => f.split(" ")));`,
        outputOrNotes: "Total: [1, 2, 3, 4] | Palavras: ['olá', 'mundo', 'dev', 'quest']",
        complexity: "O(n)",
        mutates: false,
        returns: "Novo array achatado",
        categoryTag: "array"
      },
      {
        name: ".push(), .pop(), .shift(), .unshift()",
        syntax: "push / pop (no final) | shift / unshift (no início)",
        description: "Manipulam as pontas do array. push/pop operam em O(1); shift/unshift exigem reindexação em O(n).",
        example: `const lista = [10, 20];
lista.push(30); // [10, 20, 30]
lista.unshift(0); // [0, 10, 20, 30]
const ultimo = lista.pop(); // remove 30
const primeiro = lista.shift(); // remove 0
console.log("Resultado:", lista, "Removidos:", primeiro, ultimo);`,
        outputOrNotes: "Resultado: [10, 20] | Removidos: 0, 30",
        complexity: "push/pop: O(1) | shift/unshift: O(n)",
        mutates: true,
        returns: "Novo tamanho ou elemento removido",
        categoryTag: "array"
      },
      {
        name: ".at() (Acesso com Índices Negativos)",
        syntax: "array.at(indice)",
        description: "Permite acessar itens pelo índice, aceitando números negativos para contar de trás para frente.",
        example: `const langs = ["TypeScript", "Go", "Rust", "C++"];
console.log("Último:", langs.at(-1));
console.log("Penúltimo:", langs.at(-2));`,
        outputOrNotes: "Último: C++ | Penúltimo: Rust",
        complexity: "O(1)",
        mutates: false,
        returns: "Elemento na posição",
        categoryTag: "array"
      },
      {
        name: "Array.from() & Array.isArray()",
        syntax: "Array.from(iteravel, mapFn) | Array.isArray(obj)",
        description: "Array.from converte iteráveis (Set, Map, NodeList, String) em arrays. Array.isArray valida se uma variável é array.",
        example: `const conjunto = new Set([1, 2, 3, 2, 1]);
const arr = Array.from(conjunto, x => x * 10);
console.log("De Set para Array:", arr);
console.log("É array?", Array.isArray(arr));`,
        outputOrNotes: "[10, 20, 30] | É array? true",
        complexity: "O(n)",
        mutates: false,
        returns: "Novo Array / boolean",
        categoryTag: "array"
      }
    ]
  },
  {
    id: "js-strings",
    title: "JavaScript: Métodos de String",
    badge: "JavaScript",
    description: "Métodos essenciais para dividir, formatar, buscar e substituir texto de forma imutável.",
    items: [
      {
        name: ".split()",
        syntax: "string.split(separador, limite)",
        description: "Divide uma string em um array de substrings com base em um separador especificado.",
        example: `const csv = "Henrique,25,Desenvolvedor";
const dados = csv.split(",");
console.log("Array resultante:", dados);
console.log("Primeiro item:", dados[0]);`,
        outputOrNotes: "['Henrique', '25', 'Desenvolvedor']",
        complexity: "O(n)",
        mutates: false,
        returns: "Array de Strings",
        categoryTag: "string"
      },
      {
        name: ".slice() & .substring()",
        syntax: "string.slice(inicio, fim)",
        description: "Extrai uma seção da string e a retorna como uma nova string. Aceita índices negativos.",
        example: `const slug = "artigo-como-aprender-react";
const prefixo = slug.slice(0, 6);
const final = slug.slice(-5);
console.log("Início:", prefixo, "| Fim:", final);`,
        outputOrNotes: "Início: artigo | Fim: react",
        complexity: "O(k)",
        mutates: false,
        returns: "Nova String",
        categoryTag: "string"
      },
      {
        name: ".replace() & .replaceAll()",
        syntax: "string.replace(alvo, substituto) | string.replaceAll(alvo, substituto)",
        description: "Substitui ocorrências de um padrão (string ou RegExp) por outro texto.",
        example: `const texto = "gato preto, gato branco";
console.log("replace:", texto.replace("gato", "cachorro"));
console.log("replaceAll:", texto.replaceAll("gato", "cachorro"));`,
        outputOrNotes: "replace: cachorro preto... | replaceAll: cachorro preto, cachorro branco",
        complexity: "O(n)",
        mutates: false,
        returns: "Nova String modificada",
        categoryTag: "string"
      },
      {
        name: ".includes(), .startsWith(), .endsWith()",
        syntax: "str.includes(busca) | str.startsWith(busca) | str.endsWith(busca)",
        description: "Testes rápidos de presença e posicionamento de caracteres sem necessidade de Regex.",
        example: `const email = "contato@devquest.com.br";
console.log("Contém devquest?", email.includes("devquest"));
console.log("Termina com .br?", email.endsWith(".br"));
console.log("Começa com contato?", email.startsWith("contato"));`,
        outputOrNotes: "true, true, true",
        complexity: "O(n)",
        mutates: false,
        returns: "boolean",
        categoryTag: "string"
      },
      {
        name: ".trim(), .trimStart(), .trimEnd()",
        syntax: "string.trim()",
        description: "Remove espaços em branco no início e no final de strings (sanitização de inputs).",
        example: `const input = "   usuario@email.com   \\n";
console.log("Original:", JSON.stringify(input));
console.log("Trimmed:", JSON.stringify(input.trim()));`,
        outputOrNotes: "'usuario@email.com'",
        complexity: "O(n)",
        mutates: false,
        returns: "String sem espaços nas pontas",
        categoryTag: "string"
      },
      {
        name: ".toLowerCase() & .toUpperCase()",
        syntax: "string.toLowerCase() | string.toUpperCase()",
        description: "Converte todos os caracteres da string para minúsculas ou maiúsculas.",
        example: `const query = "TypeScript Pro";
console.log("Minusculo:", query.toLowerCase());
console.log("Maiusculo:", query.toUpperCase());`,
        outputOrNotes: "'typescript pro' | 'TYPESCRIPT PRO'",
        complexity: "O(n)",
        mutates: false,
        returns: "Nova String",
        categoryTag: "string"
      },
      {
        name: ".padStart() & .padEnd()",
        syntax: "string.padStart(comprimentoAlvo, preenchimento)",
        description: "Preenche a string com outro caractere até atingir o tamanho desejado (ex: formatação de números e cartões).",
        example: `const id = "42";
const codigo = id.padStart(6, "0");
console.log("Código formatado:", codigo);

const finalCartao = "1234".padStart(16, "*");
console.log("Cartão mascarado:", finalCartao);`,
        outputOrNotes: "'000042' | '************1234'",
        complexity: "O(n)",
        mutates: false,
        returns: "String formatada com padding",
        categoryTag: "string"
      }
    ]
  },
  {
    id: "js-objects",
    title: "JavaScript: Métodos de Objeto",
    badge: "JavaScript",
    description: "Métodos utilitários estáticos para inspecionar chaves, valores, clonar e congelar estruturas de dados.",
    items: [
      {
        name: "Object.keys(), Object.values(), Object.entries()",
        syntax: "Object.keys(obj) | Object.values(obj) | Object.entries(obj)",
        description: "Extraem arrays com os nomes das propriedades, seus valores correspondentes ou pares [chave, valor].",
        example: `const stats = { vidas: 3, xp: 450, nivel: 5 };
console.log("Chaves:", Object.keys(stats));
console.log("Valores:", Object.values(stats));
console.log("Entradas:", Object.entries(stats));`,
        outputOrNotes: "Chaves: ['vidas', 'xp', 'nivel'] | Valores: [3, 450, 5]",
        complexity: "O(n)",
        mutates: false,
        returns: "Array de chaves, valores ou pares",
        categoryTag: "object"
      },
      {
        name: "Object.assign() & Spread Operator",
        syntax: "Object.assign(destino, ...fontes) | { ...obj1, ...obj2 }",
        description: "Copia todas as propriedades enumeráveis de um ou mais objetos de origem para um objeto de destino.",
        example: `const usuario = { id: 1, nome: "Lucas" };
const permissoes = { role: "admin", ativo: true };
const atualizado = Object.assign({}, usuario, permissoes);
console.log("Mesclado:", atualizado);`,
        outputOrNotes: "{ id: 1, nome: 'Lucas', role: 'admin', ativo: true }",
        complexity: "O(n)",
        mutates: false,
        returns: "Objeto mesclado",
        categoryTag: "object"
      },
      {
        name: "Object.freeze() & Object.seal()",
        syntax: "Object.freeze(obj) | Object.seal(obj)",
        description: "freeze torna o objeto 100% imutável (não adiciona, nem remove, nem altera). seal impede adicionar/remover propriedades.",
        example: `const config = Object.freeze({ api: "https://api.devquest.com" });
// Tentativa de alteração silenciosamente ignorada
config.api = "http://hack.com";
console.log("Config protegida:", config.api);`,
        outputOrNotes: "https://api.devquest.com (Inalterado)",
        complexity: "O(n)",
        mutates: true,
        returns: "O próprio objeto congelado",
        categoryTag: "object"
      },
      {
        name: "Object.fromEntries()",
        syntax: "Object.fromEntries(paresChaveValor)",
        description: "Converte uma lista de pares chave-valor (como um Map ou retorno de Object.entries) de volta em um objeto literal.",
        example: `const precosEntries = [["mouse", 120], ["teclado", 350]];
const obj = Object.fromEntries(precosEntries);
console.log("Objeto gerado:", obj);`,
        outputOrNotes: "{ mouse: 120, teclado: 350 }",
        complexity: "O(n)",
        mutates: false,
        returns: "Novo Objeto",
        categoryTag: "object"
      },
      {
        name: "Object.hasOwn() (ES2022)",
        syntax: "Object.hasOwn(obj, 'propriedade')",
        description: "Substituto seguro e moderno para obj.hasOwnProperty(), que funciona mesmo com objetos criados via Object.create(null).",
        example: `const produto = { id: 99, emEstoque: true };
console.log("Tem estoque?", Object.hasOwn(produto, "emEstoque"));
console.log("Tem desconto?", Object.hasOwn(produto, "desconto"));`,
        outputOrNotes: "true | false",
        complexity: "O(1)",
        mutates: false,
        returns: "boolean",
        categoryTag: "object"
      }
    ]
  },
  {
    id: "js-async",
    title: "JavaScript: Promises & Async/Await",
    badge: "Async",
    description: "Métodos para orquestrar requisições simultâneas, tratamento de concorrência e fluxos assíncronos.",
    items: [
      {
        name: "Promise.all()",
        syntax: "Promise.all([p1, p2, p3])",
        description: "Executa múltiplas promises em paralelo. Falha IMEDIATAMENTE (fail-fast) se qualquer uma for rejeitada.",
        example: `const buscarUsuarios = () => Promise.resolve(["Ana", "Bob"]);
const buscarConfig = () => Promise.resolve({ tema: "dark" });

Promise.all([buscarUsuarios(), buscarConfig()])
  .then(([usuarios, config]) => {
    console.log("Dados carregados juntos:", usuarios, config.tema);
  });`,
        outputOrNotes: "Dados carregados juntos: ['Ana', 'Bob'] dark",
        complexity: "O(n)",
        mutates: false,
        returns: "Promise com array de resultados",
        categoryTag: "async"
      },
      {
        name: "Promise.allSettled()",
        syntax: "Promise.allSettled([p1, p2, p3])",
        description: "Aguarda TODAS as promises terminarem, independentemente de terem sido resolvidas ou rejeitadas, retornando os status individuais.",
        example: `const p1 = Promise.resolve("Sucesso");
const p2 = Promise.reject("Erro de rede");

Promise.allSettled([p1, p2]).then(resultados => {
  console.log("Resultados:", resultados.map(r => r.status));
});`,
        outputOrNotes: "Resultados: ['fulfilled', 'rejected']",
        complexity: "O(n)",
        mutates: false,
        returns: "Promise com objetos { status, value | reason }",
        categoryTag: "async"
      },
      {
        name: "Promise.race() vs Promise.any()",
        syntax: "Promise.race(iteravel) | Promise.any(iteravel)",
        description: "race() resolve ou rejeita assim que a primeira terminar. any() espera a PRIMEIRA que tiver SUCESSO (ignora falhas até que todas falhem).",
        example: `const rapida = new Promise(res => setTimeout(() => res("Servidor 1"), 50));
const lenta = new Promise(res => setTimeout(() => res("Servidor 2"), 200));

Promise.race([rapida, lenta]).then(vencedor => {
  console.log("Mais rápido:", vencedor);
});`,
        outputOrNotes: "Mais rápido: Servidor 1",
        complexity: "O(1) após primeira resolução",
        mutates: false,
        returns: "Resultado da primeira promise",
        categoryTag: "async"
      }
    ]
  },
  {
    id: "css-flexbox-grid",
    title: "CSS: Flexbox & CSS Grid Moderno",
    badge: "CSS",
    description: "Guia definitivo das propriedades fundamentais para alinhar e distribuir elementos com flexbox e grid.",
    items: [
      {
        name: "justify-content (Eixo Principal)",
        syntax: "justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;",
        description: "Controla o alinhamento horizontal dos filhos (ou vertical se flex-direction for column).",
        example: `.container {
  display: flex;
  justify-content: space-between;
}`,
        outputOrNotes: "space-between coloca o primeiro e último item nas bordas.",
        complexity: "Hardware Accelerated",
        categoryTag: "css",
        playgroundSnippet: {
          html: `<div class="container">
  <div class="box">Item 1</div>
  <div class="box">Item 2</div>
  <div class="box">Item 3</div>
</div>`,
          css: `body { background: #030712; padding: 30px; font-family: sans-serif; }
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 20px;
  border-radius: 16px;
  height: 120px;
}
.box {
  background: #6366f1;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
}`,
          js: `console.log("Flexbox interativo carregado!");`
        }
      },
      {
        name: "align-items (Eixo Cruzado)",
        syntax: "align-items: stretch | center | flex-start | flex-end | baseline;",
        description: "Alinha os itens no eixo perpendicular. 'center' é a forma mais fácil de centralizar verticalmente.",
        example: `.container {
  display: flex;
  height: 200px;
  align-items: center;
}`,
        outputOrNotes: "Para centralização perfeita use: justify-content: center; align-items: center;",
        categoryTag: "css"
      },
      {
        name: "gap (Espaçamento Nativo)",
        syntax: "gap: 16px; | gap: row-gap column-gap;",
        description: "Cria espaçamento uniforme entre os itens filhos sem precisar de margins individuais.",
        example: `.grid-menu {
  display: flex;
  gap: 12px;
}`,
        outputOrNotes: "Suportado em 100% dos navegadores modernos.",
        categoryTag: "css"
      },
      {
        name: "CSS Grid: grid-template-columns com auto-fit",
        syntax: "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));",
        description: "Cria um grid 100% responsivo sem precisar de nenhuma media query.",
        example: `.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}`,
        outputOrNotes: "Os cards se reorganizam automaticamente conforme a largura da tela.",
        categoryTag: "css"
      }
    ]
  },
  {
    id: "sql-essentials",
    title: "SQL: Comandos, Joins & Agregações",
    badge: "SQL",
    description: "Sintaxes essenciais para consulta em bancos de dados relacionais (PostgreSQL, MySQL, SQLite).",
    items: [
      {
        name: "INNER JOIN & LEFT JOIN",
        syntax: "SELECT ... FROM t1 INNER JOIN t2 ON t1.fk = t2.pk; | LEFT JOIN ...",
        description: "INNER JOIN retorna apenas correspondências exatas. LEFT JOIN mantém todas as linhas da tabela esquerda mesmo sem par.",
        example: `SELECT clientes.nome, pedidos.total
FROM clientes
LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id;`,
        outputOrNotes: "Retorna todos os clientes, com NULL nos totais se não tiverem pedidos.",
        categoryTag: "sql"
      },
      {
        name: "GROUP BY com HAVING",
        syntax: "SELECT categoria, COUNT(*), AVG(preco) FROM produtos GROUP BY categoria HAVING AVG(preco) > 50;",
        description: "Agrupa registros e permite calcular métricas agregadas. HAVING filtra resultados calculados pelas funções de agregação.",
        example: `SELECT categoria, COUNT(*) as qtd, AVG(preco) as media
FROM produtos
GROUP BY categoria
HAVING COUNT(*) >= 5;`,
        outputOrNotes: "Filtra apenas categorias que possuem 5 ou mais produtos cadastrados.",
        categoryTag: "sql"
      },
      {
        name: "ORDER BY & LIMIT / OFFSET",
        syntax: "ORDER BY coluna ASC/DESC LIMIT 10 OFFSET 20;",
        description: "Ordena os registros e aplica paginação determinística no banco de dados.",
        example: `SELECT id, titulo, visualizacoes
FROM artigos
ORDER BY visualizacoes DESC
LIMIT 10 OFFSET 0;`,
        outputOrNotes: "Página 1 dos 10 artigos mais visualizados.",
        categoryTag: "sql"
      },
      {
        name: "CASE WHEN (Condicional SQL)",
        syntax: "CASE WHEN condicao THEN valor1 ELSE valor2 END",
        description: "Executa lógica condicional dentro da própria consulta SQL (equivalente ao if/else ou ternário).",
        example: `SELECT nome, preco,
  CASE
    WHEN preco > 500 THEN 'Premium'
    WHEN preco > 100 THEN 'Intermediário'
    ELSE 'Econômico'
  END AS categoria_faixa
FROM produtos;`,
        outputOrNotes: "Cria coluna dinâmica categorizada diretamente no banco de dados.",
        categoryTag: "sql"
      }
    ]
  },
  {
    id: "git-essentials",
    title: "Git: Fluxo de Trabalho & Comandos",
    badge: "Git",
    description: "Comandos do dia a dia para gerenciar branches, desfazer alterações e sincronizar repositórios.",
    items: [
      {
        name: "git stash",
        syntax: "git stash | git stash pop | git stash list",
        description: "Guarda modificações não commitadas em uma pilha temporária para limpar a árvore de trabalho.",
        example: `git stash save "ajustes pendentes"
git checkout main
git pull
git checkout feature
git stash pop`,
        outputOrNotes: "Recupera os arquivos mantendo o histórico de commits intacto.",
        categoryTag: "git"
      },
      {
        name: "git cherry-pick",
        syntax: "git cherry-pick <commit-hash>",
        description: "Aplica as mudanças de um commit específico de outra ramificação para a branch atual.",
        example: `git checkout production
git cherry-pick a1b2c3d`,
        outputOrNotes: "Útil para aplicar um hotfix sem mesclar toda a branch de desenvolvimento.",
        categoryTag: "git"
      },
      {
        name: "git reset vs git revert",
        syntax: "git reset --soft/--hard HEAD~1 | git revert <hash>",
        description: "Reset reescreve o histórico local; revert cria um NOVO commit que desfaz as alterações com segurança pública.",
        example: `git revert HEAD # Seguro para branches compartilhadas no GitHub`,
        outputOrNotes: "Em branches públicas (ex: main), sempre use git revert para não quebrar os colegas.",
        categoryTag: "git"
      }
    ]
  },
  {
    id: "http-status",
    title: "HTTP: Códigos de Status da API",
    badge: "HTTP / REST",
    description: "Os códigos de resposta mais importantes para construir APIs RESTful profissionais.",
    items: [
      {
        name: "200 OK & 201 Created",
        syntax: "200 OK (GET/PUT) | 201 Created (POST)",
        description: "200: Sucesso geral; 201: Novo recurso criado com sucesso no banco de dados.",
        example: `res.status(201).json({ id: novoUsuario.id, message: "Criado!" });`,
        outputOrNotes: "Sempre retorne 201 ao cadastrar entidades novas.",
        categoryTag: "http"
      },
      {
        name: "400 Bad Request & 422 Unprocessable",
        syntax: "400 (Payload inválido) | 422 (Erro de validação semântica)",
        description: "Indica que o cliente enviou dados malformados ou faltando campos obrigatórios.",
        example: `res.status(400).json({ error: "O campo 'email' é obrigatório." });`,
        outputOrNotes: "Geralmente retornado por validações do Zod ou Joi.",
        categoryTag: "http"
      },
      {
        name: "401 Unauthorized vs 403 Forbidden",
        syntax: "401 (Não autenticado) | 403 (Não autorizado/permissão insuficiente)",
        description: "401: Token JWT ausente ou expirado; 403: Usuário autenticado mas sem permissão de acesso.",
        example: `if (!session) return res.status(401);
if (user.role !== 'admin') return res.status(403);`,
        outputOrNotes: "401 = Quem é você? / 403 = Você não tem permissão aqui.",
        categoryTag: "http"
      },
      {
        name: "429 Too Many Requests",
        syntax: "429 Too Many Requests (Rate Limiting)",
        description: "O cliente enviou muitas requisições em um determinado período de tempo.",
        example: `headers: { 'Retry-After': '60' }`,
        outputOrNotes: "Protege sua aplicação contra abusos e ataques de força bruta.",
        categoryTag: "http"
      }
    ]
  }
];
