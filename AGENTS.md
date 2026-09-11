<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Diretrizes Mandatórias de Desenvolvimento (DevQuest)

As seguintes regras devem ser rigorosamente seguidas em todas as tarefas do projeto:

## 1. Antes de Qualquer Implementação
- **Acionar Skills e MCPs Pertinentes**:
  - Para HTML/CSS/UI: acionar obrigatoriamente a skill `modern-web-guidance` e/ou `frontend-design`.
  - Para Banco de Dados / Neon Postgres: consultar `neon-postgres` e o MCP `mcp-server-neon`.
  - Para documentação e Segundo Cérebro: consultar `obsidian-vault`.
  - Para IA e APIs: consultar `gemini-api-docs`.
- **Análise Prévia de Código**: Inspecionar e analisar o código existente para garantir que não existem erros latentes, tipos quebrados ou inconsistências antes de iniciar alterações.
- **Plano de Implementação**: Manter o artefato `implementation_plan.md` detalhado e alinhado aos objetivos.

## 2. Durante e Após a Implementação
- **Caça a Bugs & Code Review Ativo**:
  - Realizar varredura estática de caça a bugs (edge cases, vazamentos de memória, erros de concorrência e tipos `any`).
  - Executar os testes unitários (`npm run test`) e testes E2E com Playwright (`npx playwright test`).
  - Validar a compilação completa de produção com `npm run build`.
- **Atualização do Walkthrough**: Manter sempre o arquivo `walkthrough.md` atualizado com o resumo de tudo que foi implementado, testado e validado.
- **Segundo Cérebro (Obsidian Vault - `Cerebro_Dev_quest/`)**:
  - Documentar os novos módulos e arquiteturas implementadas.
  - **Ideias & Possibilidades Futuras**: Registrar ideias de novas funcionalidades e expansões no arquivo `01.5 - Roadmap de Atualizações Futuras & Ideias.md`.
  - **Rastreamento de Bugs & Edge Cases**: Registrar bugs encontrados, casos de borda tratados e lições aprendidas em `05.5 - Rastreador de Bugs, Edge Cases & Correções.md`.
  - Atualizar o índice `00 - MOC/00 - Mapa do Segundo Cérebro.md`.
