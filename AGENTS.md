<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Diretrizes Mandatórias de Desenvolvimento (DevQuest Pro)

As seguintes regras devem ser rigorosamente seguidas em todas as tarefas do projeto:

---

## 1. Antes de Qualquer Implementação: Matriz Mandatória de Skills & MCPs

Antes de iniciar qualquer código ou modificação, consulte e acione as skills e MCPs correspondentes ao escopo da tarefa:

### 🎨 Front-end, UI & Design System
- `modern-web-guidance`: **(Obrigatório para HTML/CSS/JS)** Padrões web modernos, `:has()`, View Transitions, Web Audio API, layouts responsivos e formulários.
- `frontend-design`: Direção estética refinada, paleta dark neon, glassmorphism e microinterações exclusivas.
- `vercel-react-best-practices`: Otimização de Server Components vs Client Components, bundle size e carregamento no Next.js 16.
- `vercel-composition-patterns`: Arquitetura de componentes escaláveis (Compound Components, render props, providers).
- `design-system` & `web-design-guidelines`: Manutenção de tokens Tailwind v4, estados de foco, hover e acessibilidade.
- `ux-copy`: Microcópia persuasiva para CTAs, toasts de gamificação, tooltips e estados vazios.
- `generative_ui`: Renderização de sandboxes e widgets interativos inline.

### 🗄️ Back-end, Banco de Dados & APIs
- `neon-postgres` & MCP `mcp-server-neon`: Conexão Neon Serverless Postgres, Drizzle ORM, connection pooling, schemas e migrações.
- `find-docs`: Consulta em tempo real de documentações oficiais de SDKs e bibliotecas (Drizzle, NextAuth v5, CodeMirror 6, Lucide, Vitest), evitando alucinações.
- `deploy-checklist`: Verificação pré-deploy para produção na Vercel (.env, headers de cache, rotas estáticas vs dinâmicas).

### 🧪 Qualidade, Caça Ativa a Bugs & Testes
- `webapp-testing`: Testes End-to-End automatizados com Playwright para validar fluxos completos de tela.
- `tdd`: Desenvolvimento guiado por testes para novas regras de negócio, cálculos de XP e lógica de algoritmos.
- `code-review` / `caveman-review`: Varredura estática de segurança OWASP, N+1 queries, vazamentos e qualidade de PR.
- `debug`: Metodologia estruturada para diagnóstico, isolamento e correção de bugs complexos.
- `a11y-debugging` / `accessibility-review`: Auditoria WCAG 2.1 AA de acessibilidade, contraste e navegação por teclado.
- `debug-optimize-lcp`: Otimização de Core Web Vitals (Largest Contentful Paint e INP).
- `memory-leak-debugging`: Prevenção e caça de vazamento de memória em listeners do `window`, timers e instâncias do CodeMirror ou Web Audio API.
- `chrome-devtools`: Diagnóstico aprofundado via Chrome DevTools Protocol.

### 🧠 Segundo Cérebro & Documentação
- `obsidian-vault`: Manutenção e navegação estruturada de notas interconectadas por `[[wikilinks]]` em `Cerebro_Dev_quest/`.
- `documentation` & `doc-coauthoring`: Redação de documentações técnicas de alto padrão para trilhas e projetos.
- `architecture`: Elaboração de Architecture Decision Records (ADRs) para decisões fundamentais de engenharia.

### 🤖 Inteligência Artificial & Agentes Autônomos
- `gemini-api-dev` & `gemini-interactions-api`: Integração de modelos Gemini no DevBot AI (mentor de código) e Code Reviewer.
- `gemini-live-api-dev`: Streaming bidirecional de áudio/voz para mentoria em tempo real via WebSockets.
- `google-antigravity-sdk`: Construção e orquestração de agentes autônomos no módulo `/ai-lab`.

### 📦 Módulos Especiais, Multimídia & Exportações
- `pdf` & `view-pdf`: Geração e visualização de certificados verificáveis em PDF vetorial oficial com hash e QR Code.
- `hyperframes` & `hyperframes-cli`: Renderização programática de vídeos animados de código (motion graphics em HTML).
- `canvas-design`: Geração de assets visuais, capas de trilhas e banners sociais OpenGraph.
- `build-dashboard` & `data-visualization`: Dashboards analíticos de retenção, engajamento e métricas de desempenho dos alunos.
- `xlsx`: Exportação de relatórios de progresso e notas de alunos para planilhas.

### ⚡ Governança, Otimização & DX
- `caveman-commit`: Commits padronizados no padrão Conventional Commits (assunto conciso ≤50 caracteres).
- `claude-md-improver`: Auditoria e melhoria contínua de arquivos `CLAUDE.md` e regras de repositório.
- `session-report`: Relatórios analíticos de uso de tokens, subagentes e métricas de sessão.
- `context7-cli` & `find-skills`: Consulta de documentações via CLI do ctx7 e descoberta/instalação de novas skills.
- `antigravity-guide` & `agy-customizations`: Consulta às diretrizes, slash commands e customizações da IDE Antigravity.

---

## 2. Protocolo de Execução e Análise de Código

1. **Análise Prévia de Código**: Inspecione sempre os arquivos existentes para garantir a ausência de erros latentes, tipos incorretos ou inconsistências antes de iniciar alterações.
2. **Plano de Implementação**: Mantenha o artefato `implementation_plan.md` atualizado com a proposta técnica.
3. **Caça Ativa a Bugs & Verificação Contínua**:
   - Realize varredura estática de caça a bugs (edge cases, vazamentos de memória, erros de concorrência e tipos `any`).
   - Execute testes unitários (`npm run test`) e testes E2E com Playwright (`npx playwright test`).
   - Valide a compilação completa de produção com `npm run build`.
4. **Atualização do Walkthrough**: Mantenha sempre o arquivo `walkthrough.md` atualizado com o resumo detalhado do que foi implementado, testado e validado.
5. **Segundo Cérebro (Obsidian Vault - `Cerebro_Dev_quest/`)**:
   - Documente novos módulos e decisões arquiteturais.
   - **Roadmap & Ideias Futuras**: Registre novas possibilidades em `01.5 - Roadmap de Atualizações Futuras & Ideias.md`.
   - **Rastreador de Bugs & Edge Cases**: Registre bugs encontrados, lições aprendidas e casos de borda em `05.5 - Rastreador de Bugs, Edge Cases & Correções.md`.
   - **Catálogo de Skills**: Mantenha atualizado `05.6 - Catálogo de Skills, Automações & DX do Agente.md`.
   - Mantenha atualizado o índice `00 - MOC/00 - Mapa do Segundo Cérebro.md`.

