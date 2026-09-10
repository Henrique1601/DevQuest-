export type FlashcardCategory = "javascript" | "typescript" | "react" | "sql" | "git" | "algorithms";

export interface Flashcard {
  id: string;
  category: FlashcardCategory;
  categoryLabel: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  codeSnippet?: string;
  answer: string;
  explanation: string;
  exampleSnippet?: string;
}

export const FLASHCARD_CATEGORIES: { id: FlashcardCategory | "all"; label: string; iconName: string }[] = [
  { id: "all", label: "Todos os Cards", iconName: "Layers" },
  { id: "javascript", label: "JavaScript Moderno", iconName: "Code2" },
  { id: "typescript", label: "TypeScript", iconName: "FileCode" },
  { id: "react", label: "React & Hooks", iconName: "Atom" },
  { id: "sql", label: "SQL & Bancos", iconName: "Database" },
  { id: "git", label: "Git & Versionamento", iconName: "GitBranch" },
  { id: "algorithms", label: "Big-O & Algoritmos", iconName: "Zap" }
];

export const mockFlashcards: Flashcard[] = [
  // JAVASCRIPT
  {
    id: "fc-js-1",
    category: "javascript",
    categoryLabel: "JavaScript Moderno",
    difficulty: "medium",
    question: "O que é uma Closure em JavaScript?",
    codeSnippet: `function criarContador() {
  let count = 0;
  return () => ++count;
}`,
    answer: "Uma closure é a combinação de uma função agrupada com referências ao seu escopo léxico circundante.",
    explanation: "Permite que uma função interna acesse variáveis da função externa mesmo após a função externa já ter retornado da call stack.",
    exampleSnippet: `const contador = criarContador();
contador(); // 1
contador(); // 2`
  },
  {
    id: "fc-js-2",
    category: "javascript",
    categoryLabel: "JavaScript Moderno",
    difficulty: "hard",
    question: "Qual a diferença entre Microtasks e Macrotasks no Event Loop?",
    answer: "Microtasks (Promises, queueMicrotask) têm prioridade absoluta sobre Macrotasks (setTimeout, setInterval).",
    explanation: "Após executar qualquer código síncrono, a engine processa toda a fila de Microtasks antes de renderizar a tela ou buscar a próxima Macrotask.",
    codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Ordem: 1, 4, 3, 2`
  },
  {
    id: "fc-js-3",
    category: "javascript",
    categoryLabel: "JavaScript Moderno",
    difficulty: "easy",
    question: "Qual a diferença prática entre == (igualdade solta) e === (igualdade estrita)?",
    answer: "== realiza coerção implícita de tipos antes de comparar; === compara o tipo e o valor sem conversões.",
    explanation: "Sempre prefira === para evitar comportamentos inesperados (ex: '0' == false é true, mas '0' === false é false).",
    exampleSnippet: `0 == false;  // true (coerção)
0 === false; // false (tipos diferentes)`
  },
  {
    id: "fc-js-4",
    category: "javascript",
    categoryLabel: "JavaScript Moderno",
    difficulty: "medium",
    question: "O que o método Array.prototype.reduce faz?",
    answer: "Executa uma função redutora fornecida em cada elemento do array, resultando em um único valor de retorno acumulado.",
    codeSnippet: `const total = [10, 20, 30].reduce((acc, curr) => acc + curr, 0);
// total = 60`,
    explanation: "O primeiro parâmetro é a callback (acumulador, itemAtual, index, array) e o segundo é o valorInicial."
  },

  // TYPESCRIPT
  {
    id: "fc-ts-1",
    category: "typescript",
    categoryLabel: "TypeScript",
    difficulty: "medium",
    question: "Para que serve o operador 'keyof' no TypeScript?",
    answer: "Gera um tipo de união literal contendo todas as chaves (nomes das propriedades) de um determinado tipo/interface.",
    codeSnippet: `interface Usuario {
  id: string;
  nome: string;
  idade: number;
}
type ChavesUsuario = keyof Usuario; 
// "id" | "nome" | "idade"`,
    explanation: "Muito usado em funções genéricas para garantir type-safety ao acessar propriedades dinâmicas com obj[key]."
  },
  {
    id: "fc-ts-2",
    category: "typescript",
    categoryLabel: "TypeScript",
    difficulty: "medium",
    question: "Qual a diferença entre 'type' e 'interface' no TypeScript?",
    answer: "Interfaces podem ser estendidas por 'declaration merging' e herança de classes; Types podem expressar uniões primitivas, tuplas e tipos mapeados complexos.",
    explanation: "Geralmente use interfaces para objetos públicos e contratos de classes, e types para união e composição funcional."
  },
  {
    id: "fc-ts-3",
    category: "typescript",
    categoryLabel: "TypeScript",
    difficulty: "hard",
    question: "Como funciona o Utility Type 'Record<K, T>'?",
    answer: "Constrói um tipo de objeto cujas chaves de propriedade são K e cujos valores são do tipo T.",
    codeSnippet: `type StatusPedido = "pendente" | "pago" | "enviado";
const cores: Record<StatusPedido, string> = {
  pendente: "#f59e0b",
  pago: "#10b981",
  enviado: "#3b82f6"
};`,
    explanation: "Garante que todas as chaves da união sejam obrigatóriamente declaradas no dicionário."
  },
  {
    id: "fc-ts-4",
    category: "typescript",
    categoryLabel: "TypeScript",
    difficulty: "medium",
    question: "Qual a finalidade de Omit<T, K> e Pick<T, K>?",
    answer: "Pick<T, K> seleciona apenas as propriedades K de T; Omit<T, K> remove as propriedades K de T gerando um novo tipo.",
    codeSnippet: `type UsuarioResumo = Pick<Usuario, "id" | "nome">;
type NovoUsuario = Omit<Usuario, "id">;`,
    explanation: "Evita duplicação de interfaces e mantém tipagens sincronizadas com o modelo base."
  },

  // REACT
  {
    id: "fc-react-1",
    category: "react",
    categoryLabel: "React & Hooks",
    difficulty: "medium",
    question: "Qual a diferença entre useMemo e useCallback?",
    answer: "useMemo memoriza o VALOR retornado por uma função; useCallback memoriza a própria INSTÂNCIA da função entre renders.",
    codeSnippet: `const memoizedValue = useMemo(() => computeHeavy(a, b), [a, b]);
const memoizedCallback = useCallback(() => handleClick(id), [id]);`,
    explanation: "useCallback(fn, deps) equivale a useMemo(() => fn, deps)."
  },
  {
    id: "fc-react-2",
    category: "react",
    categoryLabel: "React & Hooks",
    difficulty: "easy",
    question: "Por que a função de cleanup dentro do useEffect é fundamental?",
    answer: "Para evitar vazamento de memória (memory leaks) e chamadas duplicadas ao desmontar componentes.",
    codeSnippet: `useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // Cleanup
}, []);`,
    explanation: "A função retornada roda antes do próximo disparo do efeito e quando o componente for desmontado."
  },
  {
    id: "fc-react-3",
    category: "react",
    categoryLabel: "React & Hooks",
    difficulty: "medium",
    question: "Por que nunca devemos alterar o estado do useState diretamente?",
    answer: "Porque o React depende da imutabilidade para detectar alterações através da comparação de referência de objetos (Object.is).",
    explanation: "Modificar um array ou objeto in-place faz a referência continuar igual, impedindo a re-renderização visual da UI."
  },

  // SQL & BANCOS
  {
    id: "fc-sql-1",
    category: "sql",
    categoryLabel: "SQL & Bancos",
    difficulty: "easy",
    question: "Qual a diferença entre INNER JOIN e LEFT JOIN?",
    answer: "INNER JOIN retorna apenas linhas com correspondência em AMBAS as tabelas; LEFT JOIN retorna TODAS as linhas da tabela à esquerda mesmo sem par na direita.",
    explanation: "No LEFT JOIN, colunas sem par da tabela à direita retornam NULL.",
    codeSnippet: `SELECT u.nome, p.total 
FROM usuarios u 
LEFT JOIN pedidos p ON u.id = p.usuario_id;`
  },
  {
    id: "fc-sql-2",
    category: "sql",
    categoryLabel: "SQL & Bancos",
    difficulty: "medium",
    question: "Qual a diferença entre WHERE e HAVING no SQL?",
    answer: "WHERE filtra registros individuais ANTES da agregação/agrupamento; HAVING filtra grupos DEPOIS do GROUP BY.",
    codeSnippet: `SELECT categoria, AVG(preco) as media
FROM produtos
WHERE status = 'ativo'
GROUP BY categoria
HAVING AVG(preco) > 100;`,
    explanation: "Não é possível usar funções agregadoras como COUNT, SUM, AVG diretamente dentro da cláusula WHERE."
  },
  {
    id: "fc-sql-3",
    category: "sql",
    categoryLabel: "SQL & Bancos",
    difficulty: "hard",
    question: "O que é um Índice de Banco de Dados (Database Index) e qual o trade-off?",
    answer: "É uma estrutura auxiliar (geralmente árvore B-Tree) que acelera buscas SELECT de O(n) para O(log n).",
    explanation: "Trade-off: acelera leituras, mas consome espaço em disco e torna operações de INSERT, UPDATE e DELETE mais lentas devido à manutenção do índice."
  },

  // GIT
  {
    id: "fc-git-1",
    category: "git",
    categoryLabel: "Git & Versionamento",
    difficulty: "medium",
    question: "Qual a diferença entre 'git merge' e 'git rebase'?",
    answer: "git merge preserva o histórico exato criando um commit de mesclagem; git rebase reaplica seus commits no topo da branch de destino, criando um histórico linear.",
    explanation: "Use rebase em branches locais privadas para manter o histórico limpo; evite rebase em branches públicas compartilhadas."
  },
  {
    id: "fc-git-2",
    category: "git",
    categoryLabel: "Git & Versionamento",
    difficulty: "easy",
    question: "O que faz o comando 'git stash'?",
    answer: "Salva temporariamente modificações pendentes não commitadas sem poluir o histórico de commits.",
    explanation: "Muito útil para alternar rapidamente para outra branch sem perder o trabalho em andamento (use git stash pop para recuperá-las)."
  },
  {
    id: "fc-git-3",
    category: "git",
    categoryLabel: "Git & Versionamento",
    difficulty: "medium",
    question: "O que é 'git cherry-pick'?",
    answer: "Aplica o conjunto de mudanças introduzidas por um commit específico em sua branch atual.",
    codeSnippet: `git cherry-pick 7f4a2b9`,
    explanation: "Ideal para puxar um hotfix isolado de uma branch para outra sem precisar mesclar toda a ramificação."
  },

  // ALGORITMOS & BIG-O
  {
    id: "fc-algo-1",
    category: "algorithms",
    categoryLabel: "Big-O & Algoritmos",
    difficulty: "easy",
    question: "Qual a complexidade de tempo de acessar um item em um Array pelo índice?",
    answer: "O(1) - Tempo Constante.",
    explanation: "Como a memória do array é contígua, a CPU calcula o endereço exato com: base + (índice * tamanhoDoItem) instantaneamente."
  },
  {
    id: "fc-algo-2",
    category: "algorithms",
    categoryLabel: "Big-O & Algoritmos",
    difficulty: "medium",
    question: "Por que a Busca Binária opera em O(log n)?",
    answer: "Porque o espaço de busca é reduzido pela metade a cada iteração (divisão sucessiva por 2).",
    explanation: "Para 1.000.000 de elementos, log2(1.000.000) requer no máximo 20 comparações!"
  },
  {
    id: "fc-algo-3",
    category: "algorithms",
    categoryLabel: "Big-O & Algoritmos",
    difficulty: "hard",
    question: "Qual o melhor algoritmo de ordenação comparativa em pior caso?",
    answer: "Merge Sort ou Heapsort garantem tempo O(n log n) mesmo no pior caso.",
    explanation: "O Quick Sort tem média O(n log n), mas pode degradar para O(n²) se o pivô for mal escolhido."
  }
];
