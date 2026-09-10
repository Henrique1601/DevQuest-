export interface DebugIssue {
  id: string;
  title: string;
  technology: "React" | "JavaScript" | "TypeScript" | "Node.js" | "SQL" | "Git";
  errorMessage: string;
  symptom: string;
  diagnosis: string;
  brokenCode: string;
  fixedCode: string;
  bestPracticeTip: string;
}

export const mockDebugIssues: DebugIssue[] = [
  {
    id: "issue-1",
    title: "TypeError: Cannot read properties of undefined (reading 'map')",
    technology: "React",
    errorMessage: "Uncaught TypeError: Cannot read properties of undefined (reading 'map')",
    symptom: "A tela fica completamente em branco (White Screen of Death) ao tentar carregar uma lista de dados da API.",
    diagnosis: "O estado inicial da lista é 'undefined' antes do fetch da API terminar. O React tenta renderizar a lista imediatamente no primeiro ciclo antes do dado chegar.",
    brokenCode: `function ListaUsuarios() {
  const [users, setUsers] = useState(); // ❌ Estado inicial undefined

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  return (
    <ul>
      {/* ❌ Quebra porque users ainda é undefined no 1º render */}
      {users.map(u => <li key={u.id}>{u.nome}</li>)}
    </ul>
  );
}`,
    fixedCode: `function ListaUsuarios() {
  const [users, setUsers] = useState<User[]>([]); // ✅ Inicializado com array vazio []

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  return (
    <ul>
      {/* ✅ Optional chaining ou render condicional com array seguro */}
      {users?.map(u => <li key={u.id}>{u.nome}</li>)}
    </ul>
  );
}`,
    bestPracticeTip: "Sempre inicialize estados que guardam coleções com um array vazio `useState([])` ou use optional chaining `users?.map()`."
  },
  {
    id: "issue-2",
    title: "Warning: Each child in a list should have a unique 'key' prop",
    technology: "React",
    errorMessage: "Warning: Each child in a list should have a unique 'key' prop. Check the render method of `TodoList`.",
    symptom: "Aparece aviso em amarelo no console. Ao excluir ou reordenar itens, o React re-renderiza itens errados ou mantém inputs preenchidos no lugar errado.",
    diagnosis: "O React utiliza a propriedade 'key' para identificar quais itens de uma lista foram alterados, adicionados ou removidos no DOM virtual.",
    brokenCode: `{/* ❌ Usar o índice como key causa bugs em remoções e reordenações */}
{itens.map((item, index) => (
  <TodoItem key={index} data={item} />
))}`,
    fixedCode: `{/* ✅ Sempre utilize o identificador único e estável da entidade */}
{itens.map(item => (
  <TodoItem key={item.id} data={item} />
))}`,
    bestPracticeTip: "Nunca use o índice do array (`key={index}`) se a lista puder ser filtrada, reordenada ou excluída. Use sempre o ID único do banco (`item.id`)."
  },
  {
    id: "issue-3",
    title: "CORS policy: No 'Access-Control-Allow-Origin' header is present",
    technology: "Node.js",
    errorMessage: "Access to fetch at 'https://api.meusite.com/dados' from origin 'http://localhost:3000' has been blocked by CORS policy",
    symptom: "A requisição fetch do frontend falha com status de rede (failed), mesmo a rota existindo no backend.",
    diagnosis: "Mecanismo de segurança do navegador que impede páginas web de fazerem requisições HTTP para domínios diferentes sem permissão explícita do servidor.",
    brokenCode: `// ❌ Express sem habilitar cabeçalhos CORS
import express from 'express';
const app = express();

app.get('/dados', (req, res) => {
  res.json({ status: 'ok' });
});`,
    fixedCode: `// ✅ Habilitando o middleware cors com origens autorizadas
import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://devquest.io'],
  credentials: true
}));

app.get('/dados', (req, res) => {
  res.json({ status: 'ok' });
});`,
    bestPracticeTip: "No Next.js, utilize Route Handlers (`/api/...`) que rodam no mesmo domínio ou configure o arquivo `next.config.mjs` com o bloco `headers()`."
  },
  {
    id: "issue-4",
    title: "Infinite loop: Too many re-renders in useEffect",
    technology: "React",
    errorMessage: "Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.",
    symptom: "A aba do navegador trava consumindo 100% de CPU ou o React aborta com erro fatal.",
    diagnosis: "O `useEffect` atualiza um estado que está na sua própria lista de dependências sem condição de parada, criando um ciclo infinito.",
    brokenCode: `function Contador() {
  const [count, setCount] = useState(0);

  // ❌ Dispara re-render, que executa o efeito novamente, infinitamente
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
}`,
    fixedCode: `function Contador() {
  const [count, setCount] = useState(0);

  // ✅ Use setInterval com cleanup ou atualizador funcional
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev + 1); // Atualizador funcional não precisa de count nas deps
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Dependência vazia: roda uma única vez no mount
}`,
    bestPracticeTip: "Ao atualizar um estado baseado no valor anterior dentro de timers ou callbacks, use a forma de função `setCount(prev => prev + 1)` para evitar dependências desnecessárias."
  },
  {
    id: "issue-5",
    title: "TypeScript: Property does not exist on type 'never'",
    technology: "TypeScript",
    errorMessage: "Property 'nome' does not exist on type 'never'.",
    symptom: "Erro em tempo de compilação do TypeScript ao tentar acessar uma propriedade em um array de estado.",
    diagnosis: "Ao inicializar `useState([])` sem definir o tipo genérico, o TypeScript infere que o array é do tipo `never[]` (que nunca terá itens).",
    brokenCode: `// ❌ TypeScript infere: const users: never[]
const [users, setUsers] = useState([]);

return <div>{users[0].nome}</div>; // Erro: 'nome' não existe em 'never'`,
    fixedCode: `// ✅ Especifique a interface genérica no useState
interface Usuario {
  id: number;
  nome: string;
}

const [users, setUsers] = useState<Usuario[]>([]);
return <div>{users[0]?.nome}</div>;`,
    bestPracticeTip: "Sempre tipifique arrays vazios no React com `useState<MinhaInterface[]>([])`."
  },
  {
    id: "issue-6",
    title: "Git: fatal: refusing to merge unrelated histories",
    technology: "Git",
    errorMessage: "fatal: refusing to merge unrelated histories",
    symptom: "Ao tentar fazer 'git pull origin main' após criar um repositório no GitHub com README pré-existente, o git recusa o merge.",
    diagnosis: "O repositório local e o remoto foram inicializados de forma independente e não compartilham um commit ancestral em comum.",
    brokenCode: `# ❌ Comando padrão falha
git pull origin main`,
    fixedCode: `# ✅ Permita histórico não relacionado com a flag explícita
git pull origin main --allow-unrelated-histories`,
    bestPracticeTip: "Ao criar um repositório novo no GitHub, não marque a caixa 'Add README' se você já tem um projeto local inicializado com `git init`."
  }
];
