import { Track } from "@/types/track";

export const mockTracks: Track[] = [
  {
    id: "track-1",
    slug: "logica-e-fundamentos",
    title: "Lógica de Programação & Algoritmos",
    description: "Construa uma base inabalável: variáveis, estruturas de decisão, loops, recursão e estruturas de dados fundamentais.",
    iconName: "Terminal",
    level: "Iniciante",
    totalHours: 35,
    modulesCount: 5,
    color: "from-cyan-500/20 to-blue-600/20 border-cyan-500/30",
    modules: [
      { id: "m1", title: "Pensamento Computacional & Algoritmos", description: "Entendendo fluxogramas e pseudocódigo", lessonsCount: 8 },
      { id: "m2", title: "Estruturas de Controle & Repetição", description: "If, Else, Switch, For, While e Do-While", lessonsCount: 10 },
      { id: "m3", title: "Funções, Escopo & Modularização", description: "Parâmetros, retornos e closures", lessonsCount: 9 },
      { id: "m4", title: "Arrays & Objetos na Prática", description: "Manipulação e iteração moderna", lessonsCount: 12 },
      { id: "m5", title: "Projeto Final de Lógica", description: "Calculadora com Histórico de Operações", lessonsCount: 1, projectSlug: "calculadora-neumorfica" }
    ]
  },
  {
    id: "track-2",
    slug: "frontend-moderno",
    title: "Frontend Moderno com React & Next.js",
    description: "Crie interfaces ultra velozes, responsivas e reativas usando React 19, Next.js App Router, Tailwind CSS e animações GSAP.",
    iconName: "Layout",
    level: "Intermediário",
    totalHours: 50,
    modulesCount: 6,
    color: "from-purple-500/20 to-pink-600/20 border-purple-500/30",
    modules: [
      { id: "m1", title: "Fundamentos de React 19", description: "JSX, Componentes, Props e Renderização", lessonsCount: 10 },
      { id: "m2", title: "Hooks Essenciais & Ciclo de Vida", description: "useState, useEffect, useMemo e Custom Hooks", lessonsCount: 12 },
      { id: "m3", title: "Tailwind CSS & Design Systems", description: "Estilização utilitária e componentes acessíveis", lessonsCount: 8 },
      { id: "m4", title: "Next.js 15 App Router", description: "Server vs Client Components, Rotas e Metadados", lessonsCount: 14 },
      { id: "m5", title: "Animações Fluidas com GSAP", description: "Timelines, ScrollTrigger e transições profissionais", lessonsCount: 7 },
      { id: "m6", title: "Projeto Prático Guiado", description: "Dashboard Clima e Radar Global", lessonsCount: 1, projectSlug: "dashboard-clima-tempo" }
    ]
  },
  {
    id: "track-3",
    slug: "backend-nodejs-postgres",
    title: "Backend, APIs & Banco de Dados (Neon)",
    description: "Desenvolva APIs seguras, modele bancos relacionais com Drizzle ORM no Neon Serverless Postgres e lide com autenticação JWT.",
    iconName: "Server",
    level: "Intermediário",
    totalHours: 45,
    modulesCount: 5,
    color: "from-emerald-500/20 to-teal-600/20 border-emerald-500/30",
    modules: [
      { id: "m1", title: "Arquitetura HTTP & REST", description: "Métodos, Status Codes e Headers", lessonsCount: 8 },
      { id: "m2", title: "Node.js & TypeScript no Servidor", description: "Setup limpo e boas práticas de tipagem", lessonsCount: 10 },
      { id: "m3", title: "PostgreSQL na Nuvem com Neon", description: "Conexões serverless, pooling e branches de banco", lessonsCount: 9 },
      { id: "m4", title: "Drizzle ORM & Migrações", description: "Modelagem type-safe, queries e relacionamentos", lessonsCount: 11 },
      { id: "m5", title: "Autenticação, JWT & Segurança", description: "Criptografia de senhas e proteção de endpoints", lessonsCount: 1, projectSlug: "api-gestao-tarefas-jwt" }
    ]
  },
  {
    id: "track-4",
    slug: "fullstack-cloud-dev",
    title: "Fullstack Master: Do Zero ao Deploy na Vercel",
    description: "Una o melhor do Frontend e Backend em aplicações de grande porte com CI/CD, Server Actions, Stripe e WebSockets.",
    iconName: "Flame",
    level: "Avançado",
    totalHours: 65,
    modulesCount: 6,
    color: "from-amber-500/20 to-orange-600/20 border-amber-500/30",
    modules: [
      { id: "m1", title: "Arquitetura Monolítica vs Microsserviços", description: "Decisões de engenharia em produção", lessonsCount: 8 },
      { id: "m2", title: "Server Actions & Revalidação de Cache", description: "Comunicação servidor-cliente sem boilerplate", lessonsCount: 10 },
      { id: "m3", title: "Pagamentos Online com Stripe Checkout", description: "Transações atômicas e Webhooks seguros", lessonsCount: 12 },
      { id: "m4", title: "Tempo Real com WebSockets", description: "Canais bidirecionais e notificações", lessonsCount: 9 },
      { id: "m5", title: "Deploy Contínuo na Vercel & GitHub Actions", description: "Variáveis de ambiente, previews e produção", lessonsCount: 6 },
      { id: "m6", title: "Projeto Avançado", description: "SaaS E-Commerce com Stripe e Neon", lessonsCount: 1, projectSlug: "plataforma-ecommerce-stripe" }
    ]
  },
  {
    id: "track-5",
    slug: "ia-e-agentes-autonomos",
    title: "Engenharia de IA, LLMs & Agentes Autônomos",
    description: "Domine a construção de sistemas inteligentes: Prompt Engineering avançado, Function Calling estruturado, RAG com bancos vetoriais e arquitetura de agentes ReAct.",
    iconName: "Bot",
    level: "Avançado",
    totalHours: 55,
    modulesCount: 6,
    color: "from-cyan-500/20 to-purple-600/20 border-cyan-500/30",
    modules: [
      { id: "m1", title: "Fundamentos de LLMs, Tokens & Prompting", description: "Few-shot, Chain of Thought e restrições de saída", lessonsCount: 9 },
      { id: "m2", title: "Tool Use & Function Calling com JSON Schema", description: "Capacitando modelos a interagir com APIs e bancos de dados", lessonsCount: 11 },
      { id: "m3", title: "RAG (Retrieval-Augmented Generation) & Embeddings", description: "Indexação semântica, similaridade por cosseno e PGVector", lessonsCount: 12 },
      { id: "m4", title: "Arquiteturas de Agentes (ReAct & Loop Autônomo)", description: "Reasoning, acting, observation e controle de parada", lessonsCount: 10 },
      { id: "m5", title: "Avaliação, Guardrails & Segurança em IA", description: "Mitigação de Prompt Injection e jailbreaks", lessonsCount: 8 },
      { id: "m6", title: "Projeto Final de IA", description: "Agente de Pesquisa com Tool Calling e RAG", lessonsCount: 1, projectSlug: "agente-pesquisa-rag" }
    ]
  }
];
