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
      { order: 1, title: "Estrutura e Layout", description: "Crie a grade de botões (grid) e o visor digital responsivo." },
      { order: 2, title: "Máquina de Estados", description: "Gerencie o valor atual, operador pendente e valor acumulado." },
      { order: 3, title: "Tratamento de Exceções", description: "Impeça divisão por zero e múltiplos pontos decimais." },
      { order: 4, title: "Persistência", description: "Grave os últimos 10 cálculos no localStorage para consulta." }
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
      { order: 1, title: "Modelagem do Hábito", description: "Defina os types em TypeScript com ID, título, frequência e histórico." },
      { order: 2, title: "Matriz Semanal", description: "Construa o componente de calendário dos últimos 7 dias." },
      { order: 3, title: "Lógica de Sequência", description: "Implemente a função que calcula os dias ininterruptos." }
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
      { order: 1, title: "Setup da API de Clima", description: "Configure as chaves no .env e crie o wrapper de requisições." },
      { order: 2, title: "Tratamento de Estados", description: "Implemente skeletons de carregamento e telas amigáveis de erro." },
      { order: 3, title: "Visualização com Gráficos", description: "Plote as previsões horárias em um gráfico de linha interativo." }
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
      { order: 1, title: "Modelagem Relacional", description: "Escreva o schema no Drizzle com tabelas users, projects e tasks." },
      { order: 2, title: "Fluxo de Autenticação", description: "Crie os endpoints de /auth/register e /auth/login com hash seguro." },
      { order: 3, title: "Camada de Negócio e Middlewares", description: "Valide permissões: usuários só alteram seus próprios projetos." }
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
      "Catálogo de produtos com paginação e busca全文 (full-text search)",
      "Carrinho de compras reativo com sincronização local e nuvem",
      "Sessão de pagamento segura com Stripe Checkout",
      "Webhook com assinatura validada para confirmar pedidos no banco"
    ],
    steps: [
      { order: 1, title: "Arquitetura Next.js Server Components", description: "Renderize produtos no servidor com zero JavaScript desnecessário." },
      { order: 2, title: "Integração com Stripe", description: "Gere sessões de checkout com itens dinâmicos e metadados." },
      { order: 3, title: "Worker de Webhook", description: "Processe o evento checkout.session.completed com transação atômica." }
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
      { order: 1, title: "Servidor de WebSockets", description: "Estruture o gateway de eventos e broadcasting por salas (rooms)." },
      { order: 2, title: "Interface Reativa do Chat", description: "Construa a lista com auto-scroll suave e renderização rápida." },
      { order: 3, title: "Microinterações com GSAP", description: "Anime a entrada de novas mensagens e notificações visuais." }
    ]
  }
];
