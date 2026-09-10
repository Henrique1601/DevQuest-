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
      { order: 1, title: "Interface do Gerador", description: "Monte o layout com slider de tamanho e checkboxes de caracteres." },
      { order: 2, title: "Algoritmo de Geração Criptográfica", description: "Utilize a Web Crypto API para aleatoriedade de padrão industrial." },
      { order: 3, title: "Cálculo de Entropia Shannon", description: "Calcule a fórmula de bits de entropia baseada no conjunto de caracteres." }
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
