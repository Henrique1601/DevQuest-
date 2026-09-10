---
title: Mapa do Segundo Cérebro - DevQuest
date: 2026-09-10
tags:
  - moc
  - index
  - devquest
  - second-brain
aliases:
  - Index
  - Home
  - Mapa Central
type: moc
---

# 🧠 Segundo Cérebro: DevQuest Pro

> [!abstract] Bem-vindo ao Segundo Cérebro Oficial do DevQuest
> Este cofre Obsidian reúne **toda a arquitetura, regras de negócio, modelos de dados, funcionalidades interativas e decisões de engenharia** da plataforma DevQuest. Cada nota está hiperconectada através de *wikilinks* para permitir navegação fluida tanto em lista quanto na visualização gráfica (*Graph View*).

---

## 🗺️ Mapa de Conteúdo (MOC - Map of Content)

### 🏛️ 1. Visão Geral & Arquitetura
* [[01.1 - Visão Geral do DevQuest|Visão Geral, Propósito & Público-Alvo]]: Entenda a tese do DevQuest e seu posicionamento frente ao LeetCode e W3Schools.
* [[01.2 - Arquitetura de Software & Next.js 16|Arquitetura de Software & Next.js 16]]: App Router, Turbopack, React 19, Server Components vs Client Components.
* [[01.3 - Design System & Tokens Tailwind|Design System & Paleta Dark]]: Cores, tokens Tailwind v4, tipografia JetBrains Mono/Geist e componentes UI.
* [[01.4 - Estrutura de Diretórios do Projeto|Estrutura de Diretórios]]: Mapeamento pasta a pasta do código-fonte.

---

### 🗄️ 2. Banco de Dados & Autenticação
* [[02.1 - Neon PostgreSQL & Drizzle ORM|Neon Serverless PostgreSQL]]: Conexão via WebSockets/HTTP, pooling, migrações e branching.
* [[02.2 - Autenticação & NextAuth v5|Autenticação com NextAuth v5]]: Login por E-mail/Senha (bcrypt), GitHub e Google OAuth, TrustHost e JWT.
* [[02.3 - Modelos de Dados & Schemas|Modelos de Dados & Schemas Drizzle]]: Tabelas `users`, `accounts`, `challenges`, `projects`, `submissions`, `projectCompletions`.

---

### ⚡ 3. Módulos & Ferramentas Interativas
* [[03.1 - Enciclopédia DevDocs & W3Schools (Cheatsheets)|Enciclopédia DevDocs & W3Schools]]: Mais de 50 métodos documentados com executor de código *in-place* (*Try it Yourself*).
* [[03.2 - Sandbox Interativo de Pilha (Stack LIFO)|Sandbox Interativo de Pilha (Stack)]]: Visualizador animado das operações `push`, `pop`, `peek`, `clear` e algoritmo de parênteses válidos.
* [[03.3 - Simulador de Entrevistas Técnicas (Interviews)|Simulador de Entrevistas Técnicas]]: Desafios reais de Big Techs (Nubank, Mercado Livre, Google, iFood) com cronômetro e testes ocultos.
* [[03.4 - Arena de Desafios & Code Runner|Arena de Desafios]]: Editor CodeMirror 6, validação de algoritmos em tempo real e XP.
* [[03.5 - Ranking Global & Ligas de XP (Leaderboard)|Ranking Global & Ligas]]: Ligas Bronze, Prata, Ouro e Diamante, pódio dos campeões e ofensiva diária (*Streaks* 🔥).
* [[03.6 - Gerador de Certificados Verificáveis|Gerador de Certificados]]: Emissão de certificados oficiais dinâmicos com código hash e compartilhamento no LinkedIn.
* [[03.7 - Web Playground & Iframe Sandbox|Web Playground]]: Sandbox HTML, CSS e JS ao vivo com preview em iframe seguro.
* [[03.8 - Visualizador de Algoritmos Big-O|Visualizador de Algoritmos]]: Passo a passo animado de Busca Binária, Bubble Sort, Selection Sort, Pilha e Fila.
* [[03.9 - Terminal Linux & Missões Git|Terminal UNIX & Missões CLI]]: Shell interativo com árvore de arquivos virtual e comandos Git.
* [[03.10 - Flashcards Anki 3D|Flashcards Anki 3D]]: Repetição espaçada com cartões giratórios 3D.
* [[03.11 - SQL Playground & Banco em Memória|SQL Playground]]: Editor SQL com consultas relacionais e tabelas mockadas.
* [[03.12 - Debug Clinic & Snippet Vault|Debug Clinic & Snippet Vault]]: Biblioteca de erros clássicos do dia a dia e cofre de snippets de produção.

---

### 🎓 4. Conteúdo Pedagógico
* [[04.1 - Trilhas de Aprendizado|Trilhas de Estudo]]: Do zero ao Full Stack Cloud.
* [[04.2 - Projetos Práticos Guiados|Projetos Práticos Guiados]]: 16 projetos com especificações, arquitetura e submissão via GitHub.

---

### 🛠️ 5. DevOps, Testes & Operação
* [[05.1 - Estratégia de Testes Automatizados (Vitest & Playwright)|Estratégia de Testes]]: 59 testes unitários e de integração com Vitest e testes E2E com Playwright.
* [[05.2 - Deploy na Vercel & Variáveis de Ambiente|Deploy na Vercel & Variáveis]]: Configurações de produção, URLs e sincronização de branches.
* [[05.3 - Guia de Comandos & Scripts NPM|Guia de Comandos & Scripts]]: `npm run dev`, `build`, `test`, `db:push`, `db:seed`.

---

> [!tip] Dica para Navegação no Obsidian
> Pressione `Ctrl + G` para abrir o **Graph View** e observar a teia de conexões entre as tecnologias e funcionalidades do DevQuest!
