export interface VirtualNode {
  name: string;
  type: "file" | "dir";
  content?: string;
  children?: { [key: string]: VirtualNode };
}

export interface GitCommit {
  id: string;
  message: string;
  timestamp: string;
  author: string;
}

export interface GitState {
  isInitialized: boolean;
  currentBranch: string;
  branches: string[];
  stagedFiles: string[];
  commits: GitCommit[];
}

export class VirtualTerminalEngine {
  public cwd: string = "/home/devquest";
  public root: VirtualNode;
  public git: GitState;

  constructor() {
    this.root = {
      name: "/",
      type: "dir",
      children: {
        home: {
          name: "home",
          type: "dir",
          children: {
            devquest: {
              name: "devquest",
              type: "dir",
              children: {
                "README.md": {
                  name: "README.md",
                  type: "file",
                  content: "# Bem-vindo ao DevQuest Terminal!\nAqui você pode praticar comandos Linux e Git com segurança."
                },
                projetos: {
                  name: "projetos",
                  type: "dir",
                  children: {
                    "app.js": {
                      name: "app.js",
                      type: "file",
                      content: "console.log('Ambiente DevQuest rodando!');"
                    },
                    "package.json": {
                      name: "package.json",
                      type: "file",
                      content: '{\n  "name": "meu-projeto",\n  "version": "1.0.0"\n}'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    this.git = {
      isInitialized: false,
      currentBranch: "main",
      branches: ["main"],
      stagedFiles: [],
      commits: []
    };
  }

  // Navega até o nó do caminho especificado
  public resolvePath(targetPath: string): { node: VirtualNode | null; pathStr: string } {
    let fullParts: string[];

    if (targetPath.startsWith("/")) {
      fullParts = targetPath.split("/").filter(Boolean);
    } else {
      const currentParts = this.cwd.split("/").filter(Boolean);
      const relativeParts = targetPath.split("/").filter(Boolean);
      fullParts = [...currentParts];

      for (const p of relativeParts) {
        if (p === ".") continue;
        if (p === "..") {
          fullParts.pop();
        } else {
          fullParts.push(p);
        }
      }
    }

    let curr: VirtualNode = this.root;
    for (const part of fullParts) {
      if (curr.type !== "dir" || !curr.children || !curr.children[part]) {
        return { node: null, pathStr: "/" + fullParts.join("/") };
      }
      curr = curr.children[part];
    }

    return { node: curr, pathStr: "/" + fullParts.join("/") };
  }

  // Executa uma linha de comando
  public execute(input: string): { output: string; isError?: boolean } {
    const trimmed = input.trim();
    if (!trimmed) return { output: "" };

    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const command = parts[0];
    const args = parts.slice(1).map((a) => a.replace(/^"|"$/g, ""));

    switch (command) {
      case "help":
        return {
          output: `Comandos Linux & Git disponíveis:
  pwd               - Imprime o diretório de trabalho atual
  ls [-la]          - Lista arquivos e pastas
  cd <dir>          - Alterna entre diretórios
  mkdir <nome>      - Cria um novo diretório
  touch <nome>      - Cria um arquivo vazio
  cat <arquivo>     - Exibe o conteúdo de um arquivo
  echo "txt" > file - Grava texto em um arquivo
  rm <arquivo/dir>  - Deleta arquivo ou pasta
  whoami            - Exibe usuário atual
  date              - Exibe data e hora do sistema
  curl <url>        - Simula uma requisição HTTP
  clear             - Limpa o terminal

Comandos Git:
  git init          - Inicializa o repositório Git local
  git status        - Exibe status das alterações e staging
  git add <arquivo> - Adiciona arquivos ao stage (ex: git add .)
  git commit -m "m" - Cria um commit com mensagem
  git log           - Exibe o histórico de commits
  git branch        - Lista ou cria novas branches
  git checkout -b b - Cria e alterna para nova branch`
        };

      case "pwd":
        return { output: this.cwd };

      case "whoami":
        return { output: "devquest" };

      case "date":
        return { output: new Date().toUTCString() };

      case "curl": {
        const url = args[0] || "https://api.devquest.com/health";
        return {
          output: `HTTP/2 200 OK\ncontent-type: application/json\n\n{\n  "status": "online",\n  "service": "DevQuest Terminal API",\n  "url": "${url}",\n  "latencyMs": 14\n}`
        };
      }

      case "ls": {
        const target = args[0] && !args[0].startsWith("-") ? args[0] : ".";
        const { node } = this.resolvePath(target);
        if (!node) return { output: `ls: não foi possível acessar '${target}': Arquivo ou diretório não encontrado`, isError: true };
        if (node.type === "file") return { output: node.name };

        const children = Object.values(node.children || {});
        if (children.length === 0) return { output: "" };

        const formatted = children
          .map((c) => (c.type === "dir" ? `\x1b[34m${c.name}/\x1b[0m` : c.name))
          .join("   ");
        return { output: formatted };
      }

      case "cd": {
        const target = args[0] || "/home/devquest";
        const { node, pathStr } = this.resolvePath(target);
        if (!node) {
          return { output: `cd: '${target}': Não é um diretório ou não existe`, isError: true };
        }
        if (node.type !== "dir") {
          return { output: `cd: '${target}': Não é um diretório`, isError: true };
        }
        this.cwd = pathStr || "/";
        return { output: "" };
      }

      case "mkdir": {
        if (!args[0]) return { output: "mkdir: operando ausente", isError: true };
        const dirName = args[0];
        const { node } = this.resolvePath(".");
        if (!node || node.type !== "dir" || !node.children) {
          return { output: "mkdir: erro ao acessar diretório", isError: true };
        }
        if (node.children[dirName]) {
          return { output: `mkdir: não é possível criar o diretório '${dirName}': O arquivo já existe`, isError: true };
        }
        node.children[dirName] = { name: dirName, type: "dir", children: {} };
        return { output: "" };
      }

      case "touch": {
        if (!args[0]) return { output: "touch: operando de arquivo ausente", isError: true };
        const fileName = args[0];
        const { node } = this.resolvePath(".");
        if (!node || node.type !== "dir" || !node.children) {
          return { output: "touch: erro ao acessar diretório", isError: true };
        }
        if (!node.children[fileName]) {
          node.children[fileName] = { name: fileName, type: "file", content: "" };
        }
        return { output: "" };
      }

      case "cat": {
        if (!args[0]) return { output: "cat: operando ausente", isError: true };
        const fileName = args[0];
        const { node } = this.resolvePath(fileName);
        if (!node) return { output: `cat: ${fileName}: Arquivo ou diretório não encontrado`, isError: true };
        if (node.type === "dir") return { output: `cat: ${fileName}: É um diretório`, isError: true };
        return { output: node.content || "" };
      }

      case "echo": {
        // Suporte a redirecionamento: echo "texto" > arquivo
        const fullArgStr = args.join(" ");
        if (fullArgStr.includes(">")) {
          const [text, targetFile] = fullArgStr.split(">").map((s) => s.trim().replace(/^"|"$/g, ""));
          const { node } = this.resolvePath(".");
          if (node && node.type === "dir" && node.children) {
            node.children[targetFile] = { name: targetFile, type: "file", content: text };
            return { output: "" };
          }
        }
        return { output: fullArgStr };
      }

      case "rm": {
        if (!args[0]) return { output: "rm: operando ausente", isError: true };
        const fileName = args[0];
        const { node } = this.resolvePath(".");
        if (node && node.type === "dir" && node.children && node.children[fileName]) {
          delete node.children[fileName];
          return { output: "" };
        }
        return { output: `rm: não foi possível remover '${fileName}': Arquivo ou diretório não encontrado`, isError: true };
      }

      // COMANDOS GIT
      case "git": {
        const gitCmd = args[0];
        if (!gitCmd) return { output: "usage: git [--version] [--help] <command> [<args>]" };

        if (gitCmd === "init") {
          this.git.isInitialized = true;
          return {
            output: `Repositório Git inicializado vazio em ${this.cwd}/.git/\nBranch padrão configurada: ${this.git.currentBranch}`
          };
        }

        if (!this.git.isInitialized) {
          return {
            output: "fatal: not a git repository (or any of the parent directories): .git\nDica: Use 'git init' para inicializar.",
            isError: true
          };
        }

        if (gitCmd === "status") {
          const { node } = this.resolvePath(".");
          const allFiles = node && node.children ? Object.keys(node.children) : [];
          const untracked = allFiles.filter((f) => !this.git.stagedFiles.includes(f));

          let out = `No ramo ${this.git.currentBranch}\n`;
          if (this.git.commits.length === 0) {
            out += "Nenhum commit realizado ainda\n\n";
          }

          if (this.git.stagedFiles.length > 0) {
            out += "Mudanças para serem submetidas (staged):\n";
            this.git.stagedFiles.forEach((f) => {
              out += `  \x1b[32mnovo arquivo:   ${f}\x1b[0m\n`;
            });
            out += "\n";
          }

          if (untracked.length > 0) {
            out += "Arquivos não monitorados (untracked):\n";
            untracked.forEach((f) => {
              out += `  \x1b[31m${f}\x1b[0m\n`;
            });
            out += '\n(use "git add <arquivo>..." para incluir o que será submetido)\n';
          }

          if (this.git.stagedFiles.length === 0 && untracked.length === 0) {
            out += "nada a submeter, árvore de trabalho limpa\n";
          }

          return { output: out.trimEnd() };
        }

        if (gitCmd === "add") {
          const target = args[1];
          if (!target) return { output: "Nada especificado, nada adicionado." };

          const { node } = this.resolvePath(".");
          const allFiles = node && node.children ? Object.keys(node.children) : [];

          if (target === "." || target === "-A") {
            this.git.stagedFiles = [...allFiles];
            return { output: `${allFiles.length} arquivos adicionados ao stage.` };
          }

          if (allFiles.includes(target)) {
            if (!this.git.stagedFiles.includes(target)) {
              this.git.stagedFiles.push(target);
            }
            return { output: `Arquivo '${target}' adicionado ao stage.` };
          }

          return { output: `fatal: pathspec '${target}' did not match any files`, isError: true };
        }

        if (gitCmd === "commit") {
          let message = "";
          const mIndex = args.indexOf("-m");
          if (mIndex !== -1 && args[mIndex + 1]) {
            message = args[mIndex + 1];
          } else {
            return { output: "fatal: utilize a flag -m com uma mensagem (ex: git commit -m 'meu commit')", isError: true };
          }

          if (this.git.stagedFiles.length === 0) {
            return { output: "no changes added to commit (use 'git add')", isError: true };
          }

          const commitId = Math.random().toString(16).substring(2, 9);
          const newCommit: GitCommit = {
            id: commitId,
            message,
            timestamp: new Date().toLocaleTimeString(),
            author: "devquest <dev@devquest.io>"
          };

          this.git.commits.unshift(newCommit);
          const stagedCount = this.git.stagedFiles.length;
          this.git.stagedFiles = [];

          return {
            output: `[${this.git.currentBranch} ${commitId}] ${message}\n ${stagedCount} arquivos modificados`
          };
        }

        if (gitCmd === "log") {
          if (this.git.commits.length === 0) {
            return { output: "fatal: your current branch does not have any commits yet", isError: true };
          }
          const logLines = this.git.commits
            .map(
              (c) =>
                `\x1b[33mcommit ${c.id}\x1b[0m\nAuthor: ${c.author}\nDate:   ${c.timestamp}\n\n    ${c.message}\n`
            )
            .join("\n");
          return { output: logLines };
        }

        if (gitCmd === "branch") {
          const branchName = args[1];
          if (!branchName) {
            const list = this.git.branches
              .map((b) => (b === this.git.currentBranch ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`))
              .join("\n");
            return { output: list };
          }
          if (this.git.branches.includes(branchName)) {
            return { output: `fatal: A branch named '${branchName}' already exists.`, isError: true };
          }
          this.git.branches.push(branchName);
          return { output: `Branch '${branchName}' criada com sucesso.` };
        }

        if (gitCmd === "checkout") {
          if (args[1] === "-b" && args[2]) {
            const newBranch = args[2];
            if (!this.git.branches.includes(newBranch)) {
              this.git.branches.push(newBranch);
            }
            this.git.currentBranch = newBranch;
            return { output: `Switched to a new branch '${newBranch}'` };
          }

          const targetBranch = args[1];
          if (this.git.branches.includes(targetBranch)) {
            this.git.currentBranch = targetBranch;
            return { output: `Switched to branch '${targetBranch}'` };
          }
          return { output: `error: pathspec '${targetBranch}' did not match any file(s) known to git`, isError: true };
        }

        return { output: `git: '${gitCmd}' não é um comando git suportado. Tente 'help'.` };
      }

      default:
        return {
          output: `devquest: comando não encontrado: ${command}. Digite 'help' para ver a lista de comandos suportados.`,
          isError: true
        };
    }
  }
}
