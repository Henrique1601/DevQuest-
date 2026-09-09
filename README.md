# 🚀 DevQuest - Plataforma Prática de Estudos para Programação

Plataforma web de estudos em desenvolvimento de software com **projetos do básico ao avançado**, **trilhas de carreira guiadas** e **arena de desafios com editor de código no navegador** e testes automatizados em tempo real.

Construído com **Next.js 15 (App Router)**, estilizado com **Tailwind CSS**, animado com **GSAP**, enriquecido com ícones **Lucide React**, banco de dados em nuvem **Neon Serverless Postgres** via **Drizzle ORM** e preparado para deploy na **Vercel**.

---

## 📁 Arquitetura do Projeto (Clean & Modular)

```
├── .github/                     # Workflows e automações do GitHub
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
│   │   ├── ui/                  # Design System (Button, Badge, Card)
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
│   └── types/                   # Tipagens estritas de TypeScript
│       ├── project.ts           # Interfaces de projetos e requisitos
│       ├── challenge.ts         # Interfaces de desafios e casos de teste
│       └── track.ts             # Interfaces de trilhas de aprendizado
│
├── drizzle.config.ts            # Configurações de migração do Drizzle
├── tailwind.config.ts           # Configuração de temas, cores e efeitos
├── tsconfig.json                # Configurações estritas de TypeScript
└── .env.example                 # Exemplo de configuração de ambiente
```

---

## 🛠️ Tecnologias Utilizadas

- **Frontend & Framework**: [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilização & UI**: [Tailwind CSS](https://tailwindcss.com/) + [Lucide React](https://lucide.dev/)
- **Animações**: [GSAP (GreenSock)](https://greensock.com/) + `@gsap/react`
- **Banco de Dados**: [Neon Serverless Postgres](https://neon.tech/)
- **ORM & Migrações**: [Drizzle ORM](https://orm.drizzle.team/) + `drizzle-kit`
- **Hospedagem & CI/CD**: [Vercel](https://vercel.com/) + [GitHub](https://github.com/)

---

## ⚡ Como Rodar o Projeto Localmente

1. **Clone o repositório ou acerte os arquivos**:
   ```bash
   cd "Estudos para prpgramação"
   ```

2. **Instale as dependências** (caso ainda não tenha instalado):
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Copie o `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
   *Insira sua string de conexão do Neon Postgres na variável `DATABASE_URL` quando desejar sincronizar dados na nuvem.*

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🚀 Deploy na Vercel

1. Suba o código para o seu repositório no **GitHub**:
   ```bash
   git add .
   git commit -m "feat: primeira versão da plataforma DevQuest"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. Adicione a variável de ambiente `DATABASE_URL` (fornecida pelo painel do Neon).
4. Clique em **Deploy**!
