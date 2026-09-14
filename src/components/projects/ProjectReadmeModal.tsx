"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  FileText,
  Copy,
  Check,
  Download,
  Eye,
  Code2,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Project } from "@/types/project";
import { sfx } from "@/lib/audio/sfx";
import { GithubIcon } from "@/components/ui/GithubIcon";

interface ProjectReadmeModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export function generateProjectReadme(
  project: Project,
  authorName: string = "Seu Nome",
  githubUsername: string = "seu-usuario"
): string {
  const safeAuthor = authorName.trim() || "Seu Nome";
  const safeGithub = githubUsername.trim() || "seu-usuario";

  const badges = [
    `![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-emerald?style=for-the-badge)`,
    `![Dificuldade](https://img.shields.io/badge/dificuldade-${project.difficulty}-blue?style=for-the-badge)`,
    `![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-purple?style=for-the-badge)`,
  ];

  project.tags.slice(0, 4).forEach((tag) => {
    badges.push(
      `![${tag}](https://img.shields.io/badge/${encodeURIComponent(tag)}-informational?style=for-the-badge&logo=${encodeURIComponent(
        tag.toLowerCase()
      )}&logoColor=white)`
    );
  });

  const featuresList = project.features
    .map((feat) => `- [x] **${feat}**`)
    .join("\n");

  const tagsList = project.tags
    .map((tag) => `- **${tag}**`)
    .join("\n");

  return `# ${project.title}

${badges.join(" ")}

> ${project.tagline}

---

## 📌 Visão Geral do Projeto

${project.description}

Este projeto foi desenvolvido como parte da formação prática na plataforma **DevQuest Pro**, focando em arquitetura escalável, boas práticas de Clean Code e experiência de usuário de ponta.

---

## ✨ Funcionalidades Principais

${featuresList}

---

## 🛠️ Tecnologias Utilizadas

${tagsList}

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18.x ou superior)
- [Git](https://git-scm.com/)
- Gerenciador de pacotes \`npm\` ou \`pnpm\`

### Passo a passo

1. **Clone este repositório:**
\`\`\`bash
git clone https://github.com/${safeGithub}/${project.slug}.git
cd ${project.slug}
\`\`\`

2. **Instale as dependências:**
\`\`\`bash
npm install
# ou
pnpm install
\`\`\`

3. **Configure as variáveis de ambiente:**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Inicie o servidor de desenvolvimento:**
\`\`\`bash
npm run dev
\`\`\`

5. **Acesse no navegador:**
Abra [http://localhost:3000](http://localhost:3000) para visualizar a aplicação em execução.

---

## 📂 Estrutura de Pastas Sugerida

\`\`\`text
${project.slug}/
├── src/
│   ├── app/              # Rotas e páginas (Next.js App Router)
│   ├── components/       # Componentes reutilizáveis de UI
│   ├── hooks/            # Custom hooks do React
│   ├── lib/              # Utilitários, conexões e schemas
│   └── types/            # Definições de tipagem TypeScript
├── public/               # Assets estáticos (imagens, ícones)
├── package.json
└── README.md
\`\`\`

---

## 🤝 Como Contribuir

Contribuições são super bem-vindas! Se você tiver sugestões de melhorias ou correções:
1. Faça um Fork do projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/minha-melhoria\`)
3. Commit suas alterações (\`git commit -m 'feat: Adiciona recurso incrível'\`)
4. Faça o Push para a branch (\`git push origin feature/minha-melhoria\`)
5. Abra um Pull Request detalhado

---

## 📄 Licença

Este projeto está sob a licença **MIT** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

Desenvolvido por **[${safeAuthor}](https://github.com/${safeGithub})**.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${safeGithub})
`;
}

export function ProjectReadmeModal({ project, isOpen, onClose }: ProjectReadmeModalProps) {
  const [authorName, setAuthorName] = useState("Desenvolvedor Explorer");
  const [githubUser, setGithubUser] = useState("seu-usuario");
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("devquest_github_user");
    if (savedUser) setGithubUser(savedUser);
  }, []);

  if (!isOpen || !mounted) return null;

  const markdownContent = generateProjectReadme(project, authorName, githubUser);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      sfx.playSuccessChime();
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = () => {
    sfx.playClickSfx();
    const blob = new Blob([markdownContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `README-${project.slug}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl bg-surface border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header do Modal */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-[#0B1120] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Gerador de README.md Profissional
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono border border-cyan-500/30">
                  GitHub Ready
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {project.title} • Pronto para colar no seu repositório
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-surface-border hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
            title="Fechar (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campos de Personalização do Autor */}
        <div className="px-5 py-3 border-b border-surface-border bg-[#070A10] flex flex-wrap items-center gap-4 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Seu Nome:</span>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Ex: Ana Silva"
              className="bg-surface px-2.5 py-1 rounded-lg border border-surface-border text-white text-xs outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Usuário GitHub:</span>
            <input
              type="text"
              value={githubUser}
              onChange={(e) => {
                setGithubUser(e.target.value);
                localStorage.setItem("devquest_github_user", e.target.value);
              }}
              placeholder="Ex: anasilva"
              className="bg-surface px-2.5 py-1 rounded-lg border border-surface-border text-white text-xs outline-none focus:border-cyan-500"
            />
          </div>

          {/* Alternador Preview vs Raw */}
          <div className="ml-auto flex items-center bg-surface p-1 rounded-xl border border-surface-border">
            <button
              onClick={() => setViewMode("preview")}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === "preview"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setViewMode("raw")}
              className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === "raw"
                  ? "bg-cyan-500 text-black font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código Markdown</span>
            </button>
          </div>
        </div>

        {/* Corpo: Preview ou Raw Code */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#04060c]">
          {viewMode === "raw" ? (
            <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed select-all">
              {markdownContent}
            </pre>
          ) : (
            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm space-y-4">
              <div className="p-4 rounded-2xl bg-surface/50 border border-surface-border space-y-3">
                <div className="text-2xl font-extrabold text-white">{project.title}</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                    STATUS: CONCLUÍDO
                  </span>
                  <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">
                    DIFICULDADE: {project.difficulty.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-mono font-bold">
                    LICENÇA: MIT
                  </span>
                </div>
                <blockquote className="border-l-4 border-cyan-500 pl-4 py-1 text-slate-300 italic">
                  {project.tagline}
                </blockquote>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Funcionalidades Entregues
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-surface-border text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">Stack Tecnológica</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-surface border border-surface-border font-mono text-xs text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">Instruções de Instalação Rápida</h3>
                <pre className="p-4 rounded-xl bg-surface border border-surface-border font-mono text-xs text-emerald-300 overflow-x-auto">
{`git clone https://github.com/${githubUser || "seu-usuario"}/${project.slug}.git
cd ${project.slug}
npm install
npm run dev`}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Autor do Projeto:</div>
                  <div className="text-sm font-bold text-white">{authorName} (@{githubUser})</div>
                </div>
                <GithubIcon className="w-6 h-6 text-slate-400" />
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="p-4 border-t border-surface-border bg-[#0B1120] flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            {markdownContent.length} caracteres • Pronto para exportação
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handleCopy}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                copied
                  ? "bg-emerald-500 text-black"
                  : "bg-surface hover:bg-surface-hover text-white border border-surface-border"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copiado com Sucesso!" : "Copiar Markdown"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-black flex items-center gap-2 transition-colors shadow-glow"
            >
              <Download className="w-4 h-4" />
              <span>Baixar README.md</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
