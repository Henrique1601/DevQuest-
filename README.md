# 🚀 DevQuest - Plataforma Prática de Estudos para Programação

Plataforma web de estudos em desenvolvimento de software com **projetos do básico ao avançado**, **trilhas de carreira guiadas** e **arena de desafios com editor de código no navegador** e testes automatizados em tempo real.

Construído com **Next.js 15 (App Router)**, estilizado com **Tailwind CSS**, animado com **GSAP**, enriquecido com ícones **Lucide React**, banco de dados em nuvem **Neon Serverless Postgres** via **Drizzle ORM**, **testes unitários com Vitest**, **testes E2E com Playwright** e **CI/CD via GitHub Actions**.

---

## 📁 Arquitetura do Projeto (Clean & Modular)

```
├── .github/
│   └── workflows/
│       └── ci.yml               # Pipeline de CI/CD (Lint, Vitest, Build, Playwright E2E)
├── e2e/                         # Testes End-to-End (Playwright)
│   ├── home.spec.ts             # Testes de navegação, Hero, filtros e teaser interativo
│   └── challenges.spec.ts       # Testes da Arena de Desafios e editor de código
├── src/
│   ├── app/                     # Next.js 15 App Router
│   │   ├── layout.tsx           # Shell principal, Navbar e Footer
│   │   ├── page.tsx             # Página Inicial (Landing Page completa)
│   │   ├── globals.css          # Design tokens e Tailwind directives
│   │   ├── challenges/          # Arena de Desafios Interativos
│   │   │   └── page.tsx         # Workspace split-screen com editor de código
│   │   └── api/                 # Rotas de API (Node.js runtime / Neon)
│   │       ├── status/route.ts
│   │       └── challenges/route.ts
│   │
│   ├── components/              # Componentes desacoplados
│   │   ├── ui/                  # Design System (Button, Badge, Card, GithubIcon)
│   │   ├── layout/              # Navbar e Footer
│   │   ├── home/                # Seções da Home (Hero com GSAP, Metrics, Tracks, Projects, Teaser, CTA)
│   │   └── challenges/          # Workspace e Runner da Arena de Desafios
│   │
│   ├── hooks/                   # Custom Hooks (useGsapReveal, useCodeRunner)
│   ├── lib/
│   │   ├── db/                  # Neon Serverless Postgres + Drizzle ORM
│   │   │   ├── index.ts         # Conexão resiliente com fallback
│   │   │   └── schema.ts        # Modelagem de dados (users, projects, challenges, submissions)
│   │   ├── data/                # Datasets de projetos, desafios e trilhas
│   │   └── utils.ts             # Funções utilitárias (cn, formatação)
│   │
│   ├── types/                   # Tipagens estritas de TypeScript
│   │   ├── project.ts           # Interfaces de projetos e requisitos
│   │   ├── challenge.ts         # Interfaces de desafios e casos de teste
│   │   └── track.ts             # Interfaces de trilhas de aprendizado
│   │
│   └── __tests__/               # Testes Unitários & Integração (Vitest)
│       ├── utils.test.ts        # Testes de classes CSS e formatação de dificuldade
│       ├── challenges-data.test.ts # Validação de integridade dos desafios
│       ├── useCodeRunner.test.ts   # Teste do motor de execução isolada de código
│       └── Button.test.tsx      # Testes de renderização e eventos de UI
│
├── vitest.config.mts            # Configurações do Vitest (jsdom, react)
├── vitest.setup.ts              # Matchers estendidos do Jest-DOM
├── playwright.config.ts         # Configuração de E2E multi-browser
├── drizzle.config.ts            # Configurações de migração do Drizzle
├── tailwind.config.ts           # Configuração de temas, cores e efeitos
├── tsconfig.json                # Configurações estritas de TypeScript
└── .env.example                 # Exemplo de configuração de ambiente
```

---

## 🧪 Testes Automatizados & Qualidade

A plataforma conta com cobertura completa em duas camadas:

### 1. Testes Unitários com Vitest
Execução ultra-rápida de testes de lógica, hooks e componentes React:
```bash
npm run test         # Executa todos os testes unitários uma vez
npm run test:watch   # Executa em modo watch (reexecuta ao salvar arquivos)
```

### 2. Testes End-to-End com Playwright
Validação de fluxos reais do usuário (navegação, filtros e execução de código no navegador):
```bash
# Instala os navegadores do Playwright (apenas na primeira execução)
npx playwright install chromium

# Executa a suíte de testes E2E
npm run test:e2e
```

### 3. Pipeline de CI/CD (GitHub Actions)
Configurado em `.github/workflows/ci.yml`. A cada push ou PR para a branch `main`:
1. Executa checagem de tipos (`tsc --noEmit`)
2. Roda a suíte de testes unitários do Vitest
3. Gera o build de produção do Next.js
4. Roda os testes E2E do Playwright em ambiente isolado

---

## ⚡ Como Rodar o Projeto Localmente

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Configure o banco Neon (Opcional)**:
   Copie o `.env.example` para `.env` e insira sua `DATABASE_URL` fornecida pelo [Neon](https://neon.tech/).
   *(Se não configurar a variável, a plataforma funciona perfeitamente com os dados locais).*

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.
