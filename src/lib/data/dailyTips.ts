export interface DailyTip {
  id: string;
  category: "VS Code" | "JavaScript" | "Clean Code" | "CSS Moderno" | "TypeScript";
  title: string;
  summary: string;
  codeSnippet?: string;
  shortcut?: string;
}

export const mockDailyTips: DailyTip[] = [
  {
    id: "tip-vs-code-multicursor",
    category: "VS Code",
    title: "Edição com Multi-Cursor",
    summary: "Selecione múltiplas instâncias da mesma palavra para renomear ou editar simultaneamente em segundos.",
    shortcut: "Ctrl + D (Windows/Linux) / Cmd + D (Mac)",
  },
  {
    id: "tip-structured-clone",
    category: "JavaScript",
    title: "Clonagem Profunda Nativa com structuredClone()",
    summary: "Abandone JSON.parse(JSON.stringify(obj))! O structuredClone nativo suporta Date, Map, Set, Regex e tipos aninhados sem perdas.",
    codeSnippet: `const clone = structuredClone(usuarioOriginal);`,
  },
  {
    id: "tip-array-at",
    category: "JavaScript",
    title: "Pegar o Último Elemento com array.at(-1)",
    summary: "Em vez de digitar array[array.length - 1], use array.at(-1) para índices relativos do fim para o começo.",
    codeSnippet: `const ultimo = items.at(-1); // pega o último item com elegância!`,
  },
  {
    id: "tip-vs-code-move-line",
    category: "VS Code",
    title: "Mover Linhas Rapidamente",
    summary: "Mova a linha de código atual para cima ou para baixo sem precisar recortar e colar.",
    shortcut: "Alt + Seta Cima / Baixo (Option + Up/Down no Mac)",
  },
  {
    id: "tip-guard-clauses",
    category: "Clean Code",
    title: "Prefira Guard Clauses a Ifs Aninhados",
    summary: "Elimine if/else aninhados em formato de pirâmide retornando antecipadamente se as pré-condições não forem atendidas.",
    codeSnippet: `// ❌ Pirâmide
if (user) {
  if (user.isActive) {
    if (user.hasPermission) {
      processOrder();
    }
  }
}

// ✅ Guard Clauses
if (!user) return;
if (!user.isActive) return;
if (!user.hasPermission) return;
processOrder();`,
  },
  {
    id: "tip-nullish-coalescing",
    category: "JavaScript",
    title: "Nullish Coalescing (??) vs OR (||)",
    summary: "O operador || trata 0 e '' (string vazia) como false e sobrescreve o valor padrão. O ?? só substitui se for null ou undefined.",
    codeSnippet: `const count = 0;
const qtd1 = count || 10; // Resulta em 10 (Bug comum!)
const qtd2 = count ?? 10; // Resulta em 0 (Correto!)`,
  },
  {
    id: "tip-css-has",
    category: "CSS Moderno",
    title: "Seletor de Pai no CSS (:has)",
    summary: "Agora é possível estilizar um container pai baseado em um elemento filho específico sem precisar de JavaScript!",
    codeSnippet: `/* Aplica borda no card se houver uma imagem dentro */
.card:has(img) {
  border-color: #6366f1;
}`,
  },
  {
    id: "tip-ts-satisfies",
    category: "TypeScript",
    title: "Operador 'satisfies' no TypeScript",
    summary: "Valida se um objeto obedece a um tipo sem alargar ou perder a inferência dos tipos literais específicos das propriedades.",
    codeSnippet: `type Cores = Record<string, string | number[]>;

// Mantém métodos de string (ex: .toUpperCase()) nos valores específicos:
const paleta = {
  primary: "#6366f1",
  rgb: [99, 102, 241],
} satisfies Cores;`,
  },
  {
    id: "tip-vs-code-rename",
    category: "VS Code",
    title: "Renomear Símbolo em Todo o Projeto",
    summary: "Altere o nome de variáveis, funções ou componentes em todas as referências do projeto com refatoração segura.",
    shortcut: "F2 no Windows/Linux/Mac",
  },
  {
    id: "tip-clean-code-booleans",
    category: "Clean Code",
    title: "Evite Flag Arguments Booleanos",
    summary: "Passar múltiplos booleans soltos (ex: createUser('Ana', true, false)) dificulta a leitura. Prefira passar um objeto de opções configurável.",
    codeSnippet: `// ❌ Difícil de entender o que cada true/false significa
createUser("Henrique", true, false, true);

// ✅ Auto-explicativo e extensível
createUser("Henrique", {
  isAdmin: true,
  sendWelcomeEmail: false,
  verified: true
});`,
  }
];
