import { Project } from "@/types/project";

export const mockProjects: Project[] = [
  // BÁSICO / INICIANTE
  {
    id: "proj-1",
    slug: "calculadora-neumorfica",
    title: "Calculadora Interativa & Histórico",
    tagline: "Domine a manipulação do DOM, estados e operadores matemáticos.",
    description: "Crie uma calculadora moderna com suporte a operações em cadeia, histórico de cálculos anteriores e atalhos de teclado.",
    difficulty: "beginner",
    category: "frontend",
    estimatedHours: 4,
    tags: ["HTML", "CSS/Tailwind", "JavaScript", "DOM"],
    prerequisites: ["Variáveis e tipos de dados", "Funções básicas", "Event Listeners"],
    features: [
      "Operações básicas (+, -, *, / e porcentagem)",
      "Histórico de cálculos salvos em LocalStorage",
      "Suporte a teclas numéricas e Enter do teclado",
      "Alternância entre tema claro e escuro"
    ],
    steps: [
      {
        order: 1,
        title: "Estrutura e Layout Neumórfico",
        description: "Crie a grade de botões (grid) e o visor digital responsivo usando Tailwind CSS.",
        tips: [
          "Use CSS Grid com 'grid-cols-4 gap-3' para posicionar os botões numéricos e de operações perfeitamente.",
          "Para o efeito neumórfico em modo escuro, use sombras duplas: 'shadow-[-5px_-5px_10px_rgba(255,255,255,0.05),5px_5px_15px_rgba(0,0,0,0.5)]'.",
          "Mantenha o visor com 'overflow-x-auto' para números com muitos dígitos não quebrarem o layout responsivo."
        ],
        codeSnippet: `<div className="grid grid-cols-4 gap-3 p-4 bg-slate-900 rounded-3xl shadow-2xl">
  <div className="col-span-4 h-20 bg-slate-950/80 rounded-2xl flex items-center justify-end px-6 font-mono text-3xl text-cyan-400 overflow-x-auto">
    {displayValue}
  </div>
  {/* Botões numéricos e operadores */}
</div>`
      },
      {
        order: 2,
        title: "Máquina de Estados de Operação",
        description: "Gerencie o valor atual, operador pendente e valor acumulado com lógica pura e segura.",
        tips: [
          "Separe o estado em: currentValue (string), previousValue (string | null) e operation (string | null).",
          "Evite usar a função nativa eval() por razões graves de segurança e performance; crie uma função pura compute(a, b, op).",
          "Ao pressionar '=', calcule o resultado e armazene no histórico antes de limpar o operador."
        ],
        codeSnippet: `function compute(a: number, b: number, op: string): number {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '×': return a * b;
    case '÷': return b !== 0 ? a / b : NaN;
    default: return b;
  }
}`
      },
      {
        order: 3,
        title: "Tratamento de Exceções & Atalhos de Teclado",
        description: "Impeça divisão por zero, múltiplos pontos decimais e adicione listener de teclado.",
        tips: [
          "Bloqueie múltiplos cliques no ponto decimal: se currentValue já contiver '.', ignore novos pontos.",
          "Adicione um listener de 'keydown' no window para mapear teclas 0-9, +, -, *, /, Enter e Escape (para limpar C).",
          "Se a divisão for por zero, exiba a mensagem 'Erro: Indefinido' e desabilite operadores até pressionar AC."
        ],
        codeSnippet: `useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (/[0-9]/.test(e.key)) inputDigit(e.key);
    if (['+', '-', '*', '/'].includes(e.key)) setOperator(e.key);
    if (e.key === 'Enter') handleCalculate();
    if (e.key === 'Escape') handleClear();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);`
      },
      {
        order: 4,
        title: "Persistência do Histórico em LocalStorage",
        description: "Grave os últimos cálculos realizados para consulta mesmo após recarregar a página.",
        tips: [
          "Limite o histórico aos últimos 10 a 20 cálculos usando array.slice(-10).",
          "Crie uma gaveta lateral ou modal retrátil para inspecionar o histórico e clicar para reutilizar um resultado anterior.",
          "Sempre utilize JSON.stringify para salvar e um try/catch no JSON.parse para evitar quebras por dados corrompidos."
        ]
      }
    ],
    recommendedFolderStructure: `src/
├── components/
│   ├── Calculator.tsx       # Componente mestre com visor e botões
│   ├── HistoryDrawer.tsx    # Gaveta com histórico de cálculos
│   └── Display.tsx          # Visor digital formatado
├── hooks/
│   └── useCalculator.ts     # Hook desacoplado com a máquina de estados
└── utils/
    └── math.ts              # Funções puras de cálculo e formatação`,
    architectureTips: [
      "No README do seu repositório, destaque que você evitou 'eval()' criando um parser seguro de expressões matemáticas.",
      "Grave um GIF de 5 segundos demonstrando a digitação no teclado físico e adicione no topo do README.",
      "Mostre domínio de Clean Code separando a lógica matemática em um Custom Hook reutilizável (useCalculator)."
    ]
  },
  {
    id: "proj-2",
    slug: "gerador-de-habitos",
    title: "Habit Tracker (Controle de Hábitos)",
    tagline: "Aprenda a criar um CRUD completo no cliente com persistência de dados.",
    description: "Aplicativo de acompanhamento de hábitos diários com streaks de consistência, progresso semanal e métricas visuais.",
    difficulty: "beginner",
    category: "frontend",
    estimatedHours: 6,
    tags: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    prerequisites: ["Componentes React", "useState e useEffect", "Renderização de listas"],
    features: [
      "Criação, edição e exclusão de hábitos",
      "Marcação de dias concluídos na semana",
      "Cálculo de streak contínua (dias seguidos)",
      "Filtros por categoria (Saúde, Estudos, Trabalho)"
    ],
    steps: [
      {
        order: 1,
        title: "Modelagem do Hábito & Tipagem",
        description: "Defina os types em TypeScript com ID, título, frequência, categoria e histórico de datas completadas.",
        tips: [
          "Defina datas em formato ISO YYYY-MM-DD (string) para evitar problemas de fuso horário ao comparar dias no calendário.",
          "Crie uma interface Habit e uma interface HabitCategory com ícones e cores associadas.",
          "Utilize crypto.randomUUID() para IDs únicos."
        ],
        codeSnippet: `export interface Habit {
  id: string;
  title: string;
  category: 'health' | 'study' | 'work' | 'mindfulness';
  color: string;
  completedDates: string[]; // ["2026-09-10", "2026-09-09"]
  createdAt: string;
}`
      },
      {
        order: 2,
        title: "Matriz Semanal de Progresso",
        description: "Construa o componente visual dos últimos 7 dias com check circular interativo para cada dia.",
        tips: [
          "Gere dinamicamente os últimos 7 dias subtraindo i dias da data atual com date-fns ou vanilla JS.",
          "Adicione animação suave de scale no botão de check ao marcar o dia concluído.",
          "Calcule a porcentagem de conclusão diária do usuário para alimentar a barra de meta do dia."
        ],
        codeSnippet: `const getLast7Days = () => {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
};`
      },
      {
        order: 3,
        title: "Lógica de Sequência (Streak Counter)",
        description: "Implemente a função pura que calcula dias seguidos ininterruptos de execução do hábito.",
        tips: [
          "Ordene as datas concluídas em ordem decrescente.",
          "Verifique se hoje ou ontem foi marcado. Se nenhum dos dois foi marcado, a streak atual é 0.",
          "Percorra dia a dia para trás incrementando a streak enquanto a diferença for exatamente 1 dia."
        ],
        codeSnippet: `function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const sorted = [...new Set(dates)].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;

  let streak = 0;
  let checkDate = new Date(sorted[0]);

  for (const dateStr of sorted) {
    const d = new Date(dateStr);
    const diffDays = Math.round((checkDate.getTime() - d.getTime()) / 86400000);
    if (diffDays <= 1) {
      streak++;
      checkDate = d;
    } else break;
  }
  return streak;
}`
      }
    ],
    recommendedFolderStructure: `src/
├── components/
│   ├── HabitCard.tsx         # Card individual com matriz de 7 dias
│   ├── HabitFormModal.tsx    # Modal de criação e edição com seletor de cores
│   ├── WeekCalendar.tsx      # Barra com os dias da semana atual
│   └── StreakBadge.tsx       # Badge animada de chamas (fogo) com a contagem
├── hooks/
│   └── useHabits.ts          # CRUD completo com sincronização em LocalStorage
└── types/
    └── habit.ts              # Definições estritas de TypeScript`,
    architectureTips: [
      "Explique na documentação do projeto o algoritmo de cálculo de streaks; é uma pergunta muito comum em entrevistas técnicas para juniors e plenos.",
      "Mostre persistência resiliente: crie um fallback para que o app nunca quebre mesmo se o LocalStorage estiver desabilitado no navegador.",
      "Adicione micro-interações táteis: use pequenos confetes ou animações GSAP quando o usuário atingir uma streak de 7 dias."
    ]
  },
  {
    id: "proj-7",
    slug: "gerador-senhas-entropia",
    title: "Gerador de Senhas Seguras & Analisador de Entropia",
    tagline: "Aprenda criptografia básica no navegador e segurança defensiva.",
    description: "Utilitário de geração de credenciais criptograficamente seguras com parâmetros configuráveis (maiúsculas, símbolos, comprimento), indicador visual de entropia (força da senha) e cópia instantânea.",
    difficulty: "beginner",
    category: "frontend",
    estimatedHours: 5,
    tags: ["JavaScript / TypeScript", "Web Crypto API", "Tailwind CSS", "Clipboard API"],
    prerequisites: ["Operações com strings e arrays", "Geração de números pseudoaleatórios", "Eventos de formulário"],
    features: [
      "Geração usando window.crypto.getRandomValues para alta segurança",
      "Sliders interativos para definir comprimento (8 a 64 caracteres)",
      "Medidor de força em tempo real (Fraca, Média, Forte, Impossível)",
      "Botão de cópia para área de transferência com feedback visual temporário"
    ],
    steps: [
      {
        order: 1,
        title: "Interface do Gerador & Controles",
        description: "Monte o layout com display de senha destacado, slider de tamanho (8 a 64) e checkboxes de tipos de caracteres.",
        tips: [
          "Garanta que pelo menos um checkbox de tipo de caractere permaneça sempre marcado para evitar estados impossíveis.",
          "Use fontes monoespaçadas (ex: JetBrains Mono ou Courier) no visor para facilitar a distinção entre caracteres como '0' e 'O' ou 'l' e '1'."
        ]
      },
      {
        order: 2,
        title: "Algoritmo Criptograficamente Seguro (CSPRNG)",
        description: "Utilize a Web Crypto API para gerar aleatoriedade de padrão bancário em vez de Math.random().",
        tips: [
          "Math.random() é determinístico e previsível; para segurança real, utilize 'window.crypto.getRandomValues(new Uint32Array(length))'.",
          "Monte o pool de caracteres combinando maiúsculas, minúsculas, números e símbolos permitidos.",
          "Garanta que a senha gerada contenha ao menos um caractere de cada categoria selecionada pelo usuário."
        ],
        codeSnippet: `function generateSecurePassword(length: number, charset: string): string {
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset[values[i] % charset.length];
  }
  return result;
}`
      },
      {
        order: 3,
        title: "Cálculo de Entropia de Shannon & Estimativa de Crack",
        description: "Calcule a métrica matemática de bits de entropia (E = L * log2(N)) e classifique a resistência da senha.",
        tips: [
          "A fórmula de entropia é: Entropia = Comprimento * Math.log2(TamanhoDoPool).",
          "Classificação recomendada: < 40 bits = Fraca; 40-60 bits = Média; 60-80 bits = Forte; > 80 bits = Excelente (Padrão Militar).",
          "Estime o tempo para quebra por força bruta assumindo 10 bilhões de palpites por segundo."
        ],
        codeSnippet: `function calculateEntropy(password: string, poolSize: number): number {
  return Math.round(password.length * Math.log2(poolSize));
}`
      }
    ],
    recommendedFolderStructure: `src/
├── components/
│   ├── PasswordDisplay.tsx   # Visor com destaque de cor por tipo de caractere
│   ├── StrengthMeter.tsx     # Barra gradiente indicando bits de entropia
│   └── ConfigPanel.tsx       # Sliders e checkboxes de configuração
└── utils/
    ├── crypto.ts             # Web Crypto CSPRNG generator
    └── entropy.ts            # Cálculo de Shannon e tempo estimado de quebra`,
    architectureTips: [
      "Recrutadores adoram ver desenvolvedores que conhecem a diferença entre Math.random() e Web Crypto API. Destaque isso logo na primeira linha do seu README!",
      "Mostre que você pensou na UX com o feedback visual 'Copiado!' que some automaticamente após 2 segundos."
    ]
  },

  // INTERMEDIÁRIO
  {
    id: "proj-3",
    slug: "dashboard-clima-tempo",
    title: "Weather Radar & Previsão Global",
    tagline: "Integre APIs REST externas, geolocalização e gráficos dinâmicos.",
    description: "Painel climático interativo que consome dados da OpenWeatherMap API, detecta localização do usuário e exibe previsão horária e para 7 dias.",
    difficulty: "intermediate",
    category: "frontend",
    estimatedHours: 10,
    tags: ["Next.js", "APIs REST", "Lucide Icons", "Recharts", "Tailwind"],
    prerequisites: ["Async/Await & Fetch API", "Gerenciamento de loading e erro", "Componentes controlados"],
    features: [
      "Busca de cidades com autocomplete inteligente",
      "Detecção automática da cidade via Geolocation API",
      "Gráficos de variação de temperatura e umidade ao longo do dia",
      "Ícones climáticos animados baseados nas condições atuais"
    ],
    steps: [
      {
        order: 1,
        title: "Setup da API de Clima & Integração com Fetch",
        description: "Configure a chave da OpenWeatherMap API ou WeatherAPI no .env e crie o wrapper de requisições tipado.",
        tips: [
          "Crie uma rota interna em '/api/weather' para esconder a sua API Key do navegador e evitar que usuários roubem sua cota gratuita.",
          "Trate timeouts de requisição com AbortController para não deixar o usuário esperando indefinidamente em conexões lentas.",
          "Tipifique a resposta completa da API em um arquivo 'weather.ts' para ter autocomplete total dos campos."
        ],
        codeSnippet: `export async function fetchCityWeather(city: string) {
  const res = await fetch(\`/api/weather?city=\${encodeURIComponent(city)}\`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Cidade não encontrada');
  }
  return res.json();
}`
      },
      {
        order: 2,
        title: "Detecção por Geolocation API & Skeletons de Loading",
        description: "Capture as coordenadas do usuário automaticamente com permissão do navegador e mostre skeletons visuais.",
        tips: [
          "Use 'navigator.geolocation.getCurrentPosition' com fallback para uma cidade padrão (ex: 'São Paulo') caso o usuário recuse permissão.",
          "Construa componentes de Skeleton com animação de 'pulse' do Tailwind para uma transição suave e sem layout shift (CLS)."
        ],
        codeSnippet: `useEffect(() => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => fetchCityWeather('São Paulo') // Fallback amigável
    );
  }
}, []);`
      },
      {
        order: 3,
        title: "Visualização com Gráficos Recharts",
        description: "Plote as previsões horárias e variações de temperatura ao longo de 24h em um gráfico responsivo.",
        tips: [
          "Utilize o ResponsiveContainer do Recharts com AreaChart ou LineChart com gradiente suave no preenchimento.",
          "Formate o eixo X com horários simplificados ('12:00', '15:00', '18:00') e o tooltip com símbolo de graus Celsius (°C)."
        ]
      }
    ],
    recommendedFolderStructure: `src/
├── app/
│   ├── api/weather/route.ts  # BFF (Backend for Frontend) que oculta a API Key
│   └── page.tsx              # Dashboard principal
├── components/
│   ├── WeatherCard.tsx       # Card hero com temperatura atual e ícone animado
│   ├── ForecastChart.tsx     # Gráfico horário de temperatura com Recharts
│   └── CitySearchBar.tsx     # Busca com debounce e histórico recente
└── types/
    └── weather.ts            # Interfaces TypeScript da API climática`,
    architectureTips: [
      "Ter uma rota de API no Next.js protegendo a API Key externa mostra maturidade em segurança da informação.",
      "Mostre no portfólio como você tratou o 'Cumulative Layout Shift' (CLS) usando Skeletons idênticos ao layout final."
    ]
  },
  {
    id: "proj-4",
    slug: "api-gestao-tarefas-jwt",
    title: "RESTful API de Projetos com JWT & Neon",
    tagline: "Construa um backend seguro, com autenticação por token e migrations.",
    description: "API robusta em Node.js com TypeScript, Drizzle ORM conectado ao Neon Postgres, hash de senhas com bcrypt e validação de payloads com Zod.",
    difficulty: "intermediate",
    category: "backend",
    estimatedHours: 12,
    tags: ["Node.js", "Express / Next API", "Neon Postgres", "Drizzle ORM", "JWT", "Zod"],
    prerequisites: ["Arquitetura REST", "Conceito de middlewares", "SQL e modelagem relacional"],
    features: [
      "Cadastro e login com geração de Access e Refresh Token",
      "Proteção de rotas via middleware de autenticação",
      "CRUD de projetos com paginação, busca e ordenação",
      "Documentação das rotas e validações de input automáticas"
    ],
    steps: [
      {
        order: 1,
        title: "Modelagem Relacional com Drizzle ORM no Neon",
        description: "Escreva o schema no Drizzle com tabelas users, projects e tasks com chaves estrangeiras.",
        tips: [
          "Defina 'onDelete: cascade' nas tarefas para que ao excluir um projeto, suas tarefas sejam excluídas automaticamente.",
          "Crie índices nas colunas de busca frequente (ex: 'userId' e 'slug') para acelerar consultas no Postgres.",
          "Rode 'npx drizzle-kit push' para sincronizar com o banco Neon."
        ],
        codeSnippet: `export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: text('project_id').references(() => projects.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});`
      },
      {
        order: 2,
        title: "Fluxo de Autenticação JWT & Hash com Bcrypt",
        description: "Crie os endpoints de cadastro e login com hash seguro de 10 rounds e geração de token JWT assinado.",
        tips: [
          "Nunca grave senhas em texto puro; utilize bcrypt.hash(password, 10).",
          "No login, use bcrypt.compare(password, user.passwordHash) com tempo constante para mitigar timing attacks.",
          "Defina um tempo de expiração seguro no JWT (ex: '15m' para access token e '7d' para refresh token)."
        ],
        codeSnippet: `import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(email: string, pass: string, user: any) {
  const match = await bcrypt.compare(pass, user.passwordHash);
  if (!match) throw new Error('Credenciais inválidas');
  
  const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
}`
      },
      {
        order: 3,
        title: "Middlewares de Proteção & Validação Zod",
        description: "Valide permissões (usuários só alteram seus próprios recursos) e schemas de requisição com Zod.",
        tips: [
          "Crie um middleware 'requireAuth' que extrai o Bearer token do header 'Authorization' e anexa o userId no contexto.",
          "Use Zod para validar body e query params antes de bater no banco de dados, retornando erros claros no formato RFC 7807."
        ],
        codeSnippet: `import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z.string().min(3, 'Título muito curto').max(100),
  projectId: z.string().uuid(),
});`
      }
    ],
    recommendedFolderStructure: `src/
├── db/
│   ├── index.ts              # Conexão Neon Serverless
│   └── schema.ts             # Schemas Drizzle ORM
├── middlewares/
│   ├── auth.ts               # Validação de token JWT Bearer
│   └── validate.ts           # Interceptor Zod
├── routes/
│   ├── auth.ts               # /register e /login
│   └── tasks.ts              # CRUD com checagem de propriedade
└── schemas/
    └── task.schema.ts        # Schemas de validação Zod`,
    architectureTips: [
      "Destaque o uso do Neon Serverless Postgres com connection pooling e Drizzle ORM para queries type-safe.",
      "Mencione nos diferenciais do projeto a proteção contra injeção de SQL (garantida nativamente pelo Drizzle) e validação rigorosa com Zod."
    ]
  },
  {
    id: "proj-8",
    slug: "kanban-board-drag-drop",
    title: "Quadro Kanban Interativo (Drag & Drop)",
    tagline: "Construa uma interface de produtividade com movimentação fluida de cards.",
    description: "Quadro de tarefas estilo Trello com colunas dinâmicas (A Fazer, Em Progresso, Concluído), suporte a arrastar e soltar suave, tags coloridas e persistência de dados.",
    difficulty: "intermediate",
    category: "frontend",
    estimatedHours: 14,
    tags: ["React", "HTML5 Drag & Drop / dnd-kit", "TypeScript", "Tailwind CSS"],
    prerequisites: ["Gerenciamento de estado complexo", "Manipulação de listas imutáveis", "Eventos de Drag & Drop"],
    features: [
      "Arrastar e soltar cards entre colunas diferentes com animações suaves",
      "Criação e edição de colunas personalizadas",
      "Definição de prazos, prioridades (Alta, Média, Baixa) e etiquetas",
      "Filtro rápido de tarefas por texto e responsável"
    ],
    steps: [
      { order: 1, title: "Estrutura de Colunas e Cards", description: "Modele o estado normalizado de colunas e cards de tarefas." },
      { order: 2, title: "Lógica de Arrastar e Soltar", description: "Implemente os handlers de dragStart, dragOver e drop." },
      { order: 3, title: "Edição Inline e Modal", description: "Permita alterar título, descrição e prazo sem recarregar a tela." }
    ]
  },
  {
    id: "proj-9",
    slug: "encurtador-url-metricas",
    title: "Micro-SaaS Encurtador de URLs & QR Code",
    tagline: "Crie um serviço rápido de redirecionamento, métricas de clique e QR Code.",
    description: "Sistema completo onde usuários geram links curtos amigáveis, visualizam gráficos de cliques por país/dispositivo e exportam QR Codes customizados prontos para impressão.",
    difficulty: "intermediate",
    category: "fullstack",
    estimatedHours: 16,
    tags: ["Next.js App Router", "Neon Postgres", "Drizzle ORM", "QRCode.js", "Tailwind"],
    prerequisites: ["Redirecionamentos HTTP 301 vs 302", "Headers de User-Agent e IP", "Modelagem de dados analíticos"],
    features: [
      "Geração de slugs alfanuméricos curtos aleatórios ou personalizados",
      "Redirecionamento ultraveloz para a URL original",
      "Painel com total de cliques, referrers e navegadores",
      "Gerador de QR Code com download em PNG/SVG"
    ],
    steps: [
      { order: 1, title: "Rota de Redirecionamento", description: "Crie a rota dinâmica /[code] com busca indexada no Postgres." },
      { order: 2, title: "Coleta de Telemetria", description: "Grave registros de cliques com timestamp e metadados no Neon." },
      { order: 3, title: "Dashboard com Gráficos", description: "Construa gráficos de acessos ao longo do tempo para o usuário." }
    ]
  },

  // AVANÇADO
  {
    id: "proj-5",
    slug: "plataforma-ecommerce-stripe",
    title: "SaaS E-Commerce com Checkout Stripe & Webhooks",
    tagline: "Construa uma loja completa com carrinho persistente, pagamentos e estoque.",
    description: "Aplicação full stack completa com catálogo com filtros server-side, carrinho otimizado, integração real com Stripe Checkout e webhooks para baixa de estoque no Neon Postgres.",
    difficulty: "advanced",
    category: "fullstack",
    estimatedHours: 24,
    tags: ["Next.js App Router", "Server Actions", "Stripe API", "Neon Postgres", "Drizzle ORM", "Tailwind CSS"],
    prerequisites: ["Server Components vs Client Components", "Webhooks e segurança criptográfica", "Transações no banco de dados"],
    features: [
      "Catálogo de produtos com paginação e busca full-text",
      "Carrinho de compras reativo com sincronização local e nuvem",
      "Sessão de pagamento segura com Stripe Checkout",
      "Webhook com assinatura validada para confirmar pedidos no banco"
    ],
    steps: [
      {
        order: 1,
        title: "Arquitetura Next.js Server Components & Carrinho Otimizado",
        description: "Renderize produtos no servidor com zero JavaScript desnecessário e gerencie o carrinho de compras no cliente.",
        tips: [
          "Utilize Server Components para carregar o catálogo diretamente do Neon Postgres sem expor rotas REST adicionais.",
          "Para o carrinho, use um contexto React ou Zustand com persistência automática no LocalStorage.",
          "Calcule subtotais e frete com centavos inteiros (ex: R$ 19,90 = 1990) para prevenir erros de arredondamento de ponto flutuante."
        ],
        codeSnippet: `// Sempre armazene e processe valores monetários em centavos (inteiros)
export interface CartItem {
  productId: string;
  name: string;
  unitPriceInCents: number; // 2990 = R$ 29,90
  quantity: number;
}`
      },
      {
        order: 2,
        title: "Sessão de Checkout com Stripe Checkout API",
        description: "Gere sessões seguras de pagamento com itens dinâmicos, metadados do cliente e URLs de sucesso e cancelamento.",
        tips: [
          "Crie a sessão na Server Action ou Route Handler passando 'line_items' validados com os preços vindos do banco de dados (nunca confie nos preços enviados pelo frontend!).",
          "Adicione o 'userId' e 'orderId' no campo 'metadata' do Stripe para correlacionar no webhook."
        ],
        codeSnippet: `import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-12-18.acacia' });

export async function createCheckoutSession(items: CartItem[], userId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'brl',
        product_data: { name: item.name },
        unit_amount: item.unitPriceInCents,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/cart\`,
    metadata: { userId },
  });
  return session.url;
}`
      },
      {
        order: 3,
        title: "Worker de Webhook com Validação de Assinatura",
        description: "Processe o evento checkout.session.completed com transação atômica e baixa de estoque no Neon Postgres.",
        tips: [
          "Use 'stripe.webhooks.constructEvent' com o 'endpointSecret' e o raw body para evitar ataques de falsificação de requisições.",
          "Garanta idempotência: registre o 'paymentIntentId' em uma tabela de transações para nunca dar baixa de estoque duas vezes no mesmo pagamento."
        ],
        codeSnippet: `export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await db.transaction(async (tx) => {
      // 1. Atualizar pedido para PAGO
      // 2. Decrementar estoque dos produtos
    });
  }
  return new Response('OK');
}`
      }
    ],
    recommendedFolderStructure: `src/
├── app/
│   ├── (shop)/page.tsx       # Catálogo SSR rápido
│   ├── api/webhooks/stripe/  # Endpoint seguro do Webhook
│   └── cart/page.tsx         # Resumo de compras
├── components/
│   ├── ProductCard.tsx       # Card de produto com botão comprar
│   └── CartDrawer.tsx        # Gaveta lateral reativa do carrinho
├── lib/
│   ├── stripe.ts             # Instância configurada do Stripe SDK
│   └── db/schema.ts          # Tabelas products, orders e order_items
└── stores/
    └── useCartStore.ts       # Estado global com Zustand/Context`,
    architectureTips: [
      "Processar webhooks de pagamento com assinatura criptográfica e transações atômicas no banco é o maior chamariz para vagas Fullstack Pleno/Sênior.",
      "Mostre que você pensou na segurança dos preços: nunca envie o preço do produto pelo corpo da requisição do cliente!"
    ]
  },
  {
    id: "proj-6",
    slug: "chat-colaborativo-tempo-real",
    title: "Salas de Chat em Tempo Real & Code Sharing",
    tagline: "Construa um hub colaborativo com WebSockets, canais e editor compartilhado.",
    description: "Sistema com salas temáticas de estudo, presença de usuários online em tempo real, envio de mensagens instantâneas e snippet de código com syntax highlighting compartilhado.",
    difficulty: "advanced",
    category: "fullstack",
    estimatedHours: 20,
    tags: ["WebSockets / Socket.io", "Node.js", "React", "GSAP", "Neon Postgres"],
    prerequisites: ["Conceitos de WebSockets (Handshake, Eventos)", "Gerenciamento de conexões concorrentes", "Design de UI em tempo real"],
    features: [
      "Entrada e saída em múltiplos canais simultâneos",
      "Indicador de 'digitando...' e contagem de participantes ativos",
      "Compartilhamento de trechos de código formatados",
      "Histórico de mensagens recente carregado do banco"
    ],
    steps: [
      {
        order: 1,
        title: "Servidor de WebSockets & Gateway de Salas",
        description: "Estruture o gateway de eventos e broadcasting por salas temáticas com Socket.io ou ws nativo.",
        tips: [
          "Autentique o handshake do WebSocket usando o token JWT para saber exatamente quem é o usuário conectado.",
          "Use 'socket.join(roomId)' para isolar o tráfego de mensagens apenas aos membros que estão naquela sala.",
          "Gerencie a lista de usuários online em memória ou com Redis pub/sub."
        ],
        codeSnippet: `io.on('connection', (socket) => {
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit('user_joined', { userId: socket.data.user.id });
  });

  socket.on('send_message', async (data) => {
    // 1. Salvar no Neon Postgres
    // 2. Broadcast para os outros membros da sala
    socket.to(data.roomId).emit('new_message', data);
  });
});`
      },
      {
        order: 2,
        title: "Interface Reativa do Chat & Auto-Scroll",
        description: "Construa a lista de mensagens com auto-scroll inteligente (que não pula quando o usuário está lendo histórico acima).",
        tips: [
          "Verifique se o usuário já está no final da rolagem antes de forçar o scroll para baixo ao receber uma nova mensagem.",
          "Implemente debounce no evento de digitação: envie 'user_typing' imediatamente e cancele após 1.5s sem novas teclas."
        ]
      },
      {
        order: 3,
        title: "Microinterações com GSAP & Code Snippet Sharing",
        description: "Anime a entrada de novas mensagens e notificações visuais, com renderização de blocos de código formatados.",
        tips: [
          "Use GSAP para animar sutilmente 'opacity: 0, y: 10' para cada novo balão de mensagem.",
          "Adicione detecção de blocos de código com markdown ```js para renderizar com syntax highlighting e botão de copiar."
        ]
      }
    ],
    recommendedFolderStructure: `src/
├── server/
│   └── websocket.ts          # Servidor Node.js com Socket.io e JWT auth
├── components/
│   ├── ChatRoom.tsx          # Janela principal de conversa
│   ├── MessageBubble.tsx     # Balão de mensagem com suporte a código
│   ├── TypingIndicator.tsx   # Indicador de 'Fulano está digitando...'
│   └── ChannelList.tsx       # Lista lateral de canais com contadores
└── hooks/
    └── useSocket.ts          # Custom hook de conexão e listeners`,
    architectureTips: [
      "Explique a diferença entre HTTP Polling e WebSockets bidirecionais contínuos no README.",
      "Mostre como você lidou com reconexão automática e mensagens offline."
    ]
  },
  {
    id: "proj-10",
    slug: "monitor-uptime-status-page",
    title: "Sistema de Monitoramento de Uptime & Status Page",
    tagline: "Desenvolva um observatório de APIs com pings periódicos e métricas de latência.",
    description: "Plataforma de monitoramento contínuo (estilo BetterStack/UptimeRobot) que verifica a disponibilidade de URLs, calcula porcentagem de SLA mensal e publica uma Status Page pública para incidentes.",
    difficulty: "advanced",
    category: "fullstack",
    estimatedHours: 26,
    tags: ["Next.js", "Node Cron / Serverless Cron", "Neon Postgres", "Drizzle ORM", "Recharts"],
    prerequisites: ["Requisições HTTP com medição de latência (RTT)", "Tarefas agendadas (Cron jobs)", "Cálculo de disponibilidade (99.9% uptime)"],
    features: [
      "Execução de pings automáticos a cada 1 a 5 minutos",
      "Medição precisa de tempo de resposta em milissegundos",
      "Status Page pública com incidentes e histórico de 90 dias",
      "Configuração de alertas e limites de latência"
    ],
    steps: [
      { order: 1, title: "Worker de Verificação", description: "Crie a rotina assíncrona que efetua requisições HEAD/GET e grava o resultado." },
      { order: 2, title: "Painel de Métricas e Gráficos", description: "Exiba gráficos de latência p95 e uptime percentual." },
      { order: 3, title: "Status Page Pública", description: "Renderize uma página leve e limpa para os clientes do serviço consultarem." }
    ]
  },
  {
    id: "proj-11",
    slug: "pomodoro-focus-timer",
    title: "Pomodoro Focus & Soundscapes",
    tagline: "Desenvolva um temporizador de produtividade com sons binaurais e notificações.",
    description: "Aplicativo web completo de técnica Pomodoro com ciclos automáticos de foco e descanso, trilhas sonoras ambientes com Web Audio API, atalhos globais de teclado e notificações visuais na barra de título e desktop.",
    difficulty: "beginner",
    category: "frontend",
    estimatedHours: 5,
    tags: ["React", "TypeScript", "Tailwind CSS", "Web Audio API", "Notification API"],
    prerequisites: ["setInterval e limpeza de efeitos no useEffect", "Manipulação de áudio em HTML5", "LocalStorage para estatísticas"],
    features: [
      "Ciclos configuráveis de foco (25m), descanso curto (5m) e descanso longo (15m)",
      "Ruído branco, som de chuva e cafeteria via Web Audio API",
      "Notificações sonoras e no desktop via Notification API quando o tempo esgota",
      "Contagem de ciclos diários concluídos persistidos no navegador"
    ],
    steps: [
      { order: 1, title: "Motor de Temporização", description: "Construa um custom hook useTimer robusto e preciso com timestamps." },
      { order: 2, title: "Engine de Sons Ambientes", description: "Integre sintetizadores de áudio e reprodutores sem interrupção." },
      { order: 3, title: "Notificações & Atalhos", description: "Implemente atalhos de barra de espaço e integração com permissões do browser." }
    ]
  },
  {
    id: "proj-12",
    slug: "gerador-qrcode-custom",
    title: "QR Code Studio & Pix Dinâmico",
    tagline: "Gere códigos QR para URLs, Wi-Fi e pagamentos Pix com personalização visual.",
    description: "Estúdio de criação de códigos QR customizados com escolha de cores de fundo e frente, inserção de logo central, presets para redes Wi-Fi e Pix com payload CRC16, além de download em PNG e SVG.",
    difficulty: "beginner",
    category: "frontend",
    estimatedHours: 6,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Canvas API", "SVG Export"],
    prerequisites: ["Manipulação de Canvas HTML5", "Formatos de texto Wi-Fi e Pix", "Download de blobs no cliente"],
    features: [
      "Presets para URL, Texto livre, Conexão Wi-Fi (WPA/WPA2) e Chave Pix",
      "Personalização de cor do módulo e cantos (finder patterns)",
      "Exportação em alta resolução (PNG 1024x1024 e SVG vetorial)",
      "Histórico dos últimos QR Codes gerados salvo localmente"
    ],
    steps: [
      { order: 1, title: "Formulários e Modos de Entrada", description: "Crie formulários específicos para cada modalidade (Wi-Fi, Pix, Link)." },
      { order: 2, title: "Renderização do Canvas", description: "Desenhe a matriz de bits com margem de segurança e cores customizadas." },
      { order: 3, title: "Pipeline de Exportação", description: "Gere links de download instantâneo usando canvas.toDataURL e XMLSerializer." }
    ]
  },
  {
    id: "proj-13",
    slug: "mini-spotify-player",
    title: "StreamWave: Web Audio Player & Visualizer",
    tagline: "Crie um player de áudio com visualizador de frequências em Canvas e playlist.",
    description: "Reprodutor de música e podcasts moderno com playlist reativa, controle de progresso scrubbable, persistência de volume, modo aleatório/repetir e um visualizador de frequências de áudio em tempo real renderizado com AnalyserNode e Canvas.",
    difficulty: "intermediate",
    category: "frontend",
    estimatedHours: 12,
    tags: ["React 19", "Web Audio API", "Canvas 2D", "Tailwind CSS", "Lucide Icons"],
    prerequisites: ["AudioContext e AnalyserNode", "requestAnimationFrame para animações a 60fps", "Gerenciamento de filas de reprodução"],
    features: [
      "Controle de reprodução fluido (play, pause, next, prev, shuffle, repeat)",
      "Visualizador de barras e ondas sonoras sincronizado com o áudio em tempo real",
      "Barra de progresso interativa com preview de tempo ao passar o mouse",
      "Suporte a atalhos de teclado (Espaço para pause, setas para volume e skip)"
    ],
    steps: [
      { order: 1, title: "Arquitetura do Audio Engine", description: "Conecte o elemento HTML5 Audio ao AudioContext e AnalyserNode." },
      { order: 2, title: "Canvas Wave Visualizer", description: "Capture os dados de frequência (getByteFrequencyData) e desenhe no Canvas." },
      { order: 3, title: "Gerenciador de Playlist", description: "Estruture o estado da fila com transições suaves entre faixas." }
    ]
  },
  {
    id: "proj-14",
    slug: "markdown-blog-cms",
    title: "DevLog: CMS de Artigos Técnicos & Syntax Highlighting",
    tagline: "Construa um portal editorial com Markdown, estimativa de leitura e busca全文.",
    description: "Plataforma de publicação técnica com renderização rápida de Markdown/MDX, caixas de código com botão de cópia, tabela de conteúdos dinâmica (TOC) gerada pelos cabeçalhos H2/H3, filtro por tags e tempo estimado de leitura.",
    difficulty: "intermediate",
    category: "fullstack",
    estimatedHours: 14,
    tags: ["Next.js App Router", "Neon Postgres", "Drizzle ORM", "Markdown Parser", "Tailwind Typography"],
    prerequisites: ["Server Components e geração estática", "Estruturação de AST (Abstract Syntax Tree)", "Consultas com filtros no Postgres"],
    features: [
      "Editor de Markdown com preview lado a lado em tempo real",
      "Highlight automático de blocos de código com cópia em um clique",
      "Sumário automático (Table of Contents) que destaca o cabeçalho visível no scroll",
      "Cálculo automático de palavras e tempo estimado de leitura"
    ],
    steps: [
      { order: 1, title: "Modelagem dos Artigos no Neon", description: "Defina a tabela articles com slug, markdownContent e publishedAt." },
      { order: 2, title: "Pipeline de Renderização Markdown", description: "Converta tokens em componentes React customizados com Tailwind." },
      { order: 3, title: "TOC com IntersectionObserver", description: "Destaque a seção ativa na barra lateral conforme o leitor rola a página." }
    ]
  },
  {
    id: "proj-15",
    slug: "url-shortener-analytics",
    title: "LinkPulse: Encurtador de URLs com Métricas Geográficas",
    tagline: "Desenvolva um encurtador de alta performance com telemetria e QR Code.",
    description: "Serviço completo de redirecionamento ultrarrápido (estilo Dub.co/Bitly) com geração de códigos curtos em Base62, rastreamento de cliques com país, navegador e sistema operacional gravados no Neon Postgres, e dashboard de analytics interativo.",
    difficulty: "advanced",
    category: "fullstack",
    estimatedHours: 22,
    tags: ["Next.js App Router", "Neon Postgres", "Drizzle ORM", "Base62 Hashing", "Recharts", "GeoIP"],
    prerequisites: ["Redirecionamentos 301/308 de alta performance", "Agrupamento analítico em SQL (COUNT, GROUP BY)", "Decodificação de User-Agent"],
    features: [
      "Geração de slugs únicos de 6 caracteres via algoritmo Base62",
      "Redirecionamento instantâneo via Next.js Route Handlers",
      "Gravação assíncrona de telemetria de cliques (país, referrer, browser)",
      "Dashboard analítico com gráficos de cliques por dia e mapa de distribuição"
    ],
    steps: [
      { order: 1, title: "Algoritmo de Hash e Tabela de Links", description: "Estruture as tabelas links e clicks com chaves estrangeiras no Neon." },
      { order: 2, title: "Handler de Redirecionamento 308", description: "Otimize o endpoint de redirecionamento para resposta em menos de 50ms." },
      { order: 3, title: "Painel Analítico do Link", description: "Consulte e agrupe métricas com Drizzle ORM e exiba em gráficos visuais." }
    ]
  },
  {
    id: "proj-16",
    slug: "ai-code-reviewer-gemini",
    title: "CodeSentry: Revisor Automático de Código com IA",
    tagline: "Integre LLMs para inspecionar PRs, detectar vulnerabilidades e refatorar.",
    description: "Plataforma de inspeção de código onde o desenvolvedor cola um arquivo ou trecho de pull request e recebe uma análise estrita de segurança (OWASP), detecção de bugs ocultos, estimativa de complexidade ciclomática e sugestões de refatoração com diff visual interativo.",
    difficulty: "advanced",
    category: "fullstack",
    estimatedHours: 24,
    tags: ["Next.js", "Gemini API / LLM SDK", "Neon Postgres", "Drizzle ORM", "Diff Viewer", "Tailwind CSS"],
    prerequisites: ["Integração com APIs de IA (Streaming e Structured Outputs)", "Visualização de diffs de código (side-by-side e unified)", "Segurança e validação de prompts"],
    features: [
      "Envio de trechos de código em JavaScript, TypeScript, Python e SQL",
      "Análise streaming com resposta em tempo real usando Gemini API",
      "Classificação de alertas por severidade (Crítico, Alto, Médio, Dica)",
      "Visualização de antes/depois (diff) para as refatorações sugeridas",
      "Histórico de análises gravadas no Neon Postgres associadas ao perfil do usuário"
    ],
    steps: [
      { order: 1, title: "Gateway com SDK de IA", description: "Estruture o endpoint com streaming de resposta e schema de saída tipado." },
      { order: 2, title: "Visualizador de Diff Interativo", description: "Renderize as linhas adicionadas e removidas com syntax highlighting." },
      { order: 3, title: "Histórico e Persistência", description: "Grave o veredito da revisão no Neon para consulta posterior no perfil." }
    ]
  }
];
