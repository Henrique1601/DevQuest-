import { GitState, GitCommit, GitCommandOutput } from "@/types/gitVisualizer";

export const INITIAL_GIT_STATE: GitState = {
  commits: [
    {
      id: "c0",
      message: "Initial commit",
      parentIds: [],
      branchName: "main",
      timestamp: 1000,
    },
  ],
  branches: {
    main: "c0",
  },
  head: {
    type: "branch",
    name: "main",
  },
};

let commitCounter = 1;

export function generateCommitId(): string {
  return `c${commitCounter++}`;
}

export function resetCommitCounter(startFrom: number = 1): void {
  commitCounter = startFrom;
}

export function getCurrentCommitId(state: GitState): string | null {
  if (state.head.type === "branch") {
    return state.branches[state.head.name] || null;
  }
  return state.head.name; // In detached HEAD, name holds the commitId
}

export function executeGitCommand(
  rawCommand: string,
  state: GitState
): { nextState: GitState; output: GitCommandOutput } {
  const trimmed = rawCommand.trim();
  if (!trimmed) {
    return { nextState: state, output: { text: "", type: "info" } };
  }

  const parts = trimmed.split(/\s+/);
  const root = parts[0];

  if (root !== "git" && root !== "clear" && root !== "help") {
    return {
      nextState: state,
      output: {
        text: `Comando desconhecido: "${trimmed}". Todos os comandos devem começar com 'git' (ou use 'help').`,
        type: "error",
      },
    };
  }

  if (root === "clear") {
    return { nextState: state, output: { text: "__CLEAR__", type: "info" } };
  }

  if (root === "help" || trimmed === "git help") {
    return {
      nextState: state,
      output: {
        text: `Comandos Git suportados no simulador:
  • git commit [-m "mensagem"]    - Cria um novo commit
  • git branch <nome>             - Cria uma nova branch
  • git branch -d <nome>          - Remove uma branch
  • git checkout <branch|hash>    - Alterna para uma branch ou commit
  • git checkout -b <nome>        - Cria e muda para uma nova branch
  • git switch <branch>           - Alterna para a branch especificada
  • git switch -c <nome>          - Cria e alterna para a nova branch
  • git merge <branch>            - Funde a branch especificada na branch atual
  • git rebase <branch>           - Reaplica commits sobre a branch alvo
  • git reset --hard <hash|HEAD~1> - Move a branch atual para o commit indicado
  • git log                       - Exibe o histórico de commits
  • git status                    - Mostra o estado atual do repositório
  • clear                         - Limpa a tela do terminal`,
        type: "info",
      },
    };
  }

  const sub = parts[1];

  switch (sub) {
    case "status": {
      const currentCommit = getCurrentCommitId(state);
      const branchInfo =
        state.head.type === "branch"
          ? `Na branch ${state.head.name}`
          : `HEAD desanexado em ${state.head.name}`;
      return {
        nextState: state,
        output: {
          text: `${branchInfo}\nCommit atual: ${currentCommit}\nNada a submeter, árvore de trabalho limpa.`,
          type: "info",
        },
      };
    }

    case "log": {
      const currentCommit = getCurrentCommitId(state);
      if (!currentCommit) {
        return { nextState: state, output: { text: "Nenhum commit encontrado.", type: "warning" } };
      }

      // Build chain from current commit backwards
      const lines: string[] = [];
      let cursor: string | undefined = currentCommit;
      const visited = new Set<string>();

      while (cursor && !visited.has(cursor)) {
        visited.add(cursor);
        const commit = state.commits.find((c) => c.id === cursor);
        if (!commit) break;

        const pointingBranches = Object.entries(state.branches)
          .filter(([_, cid]) => cid === commit.id)
          .map(([b]) => (state.head.type === "branch" && state.head.name === b ? `HEAD -> ${b}` : b));

        if (state.head.type === "detached" && state.head.name === commit.id) {
          pointingBranches.push("HEAD");
        }

        const branchTag = pointingBranches.length > 0 ? ` (${pointingBranches.join(", ")})` : "";
        lines.push(`* commit ${commit.id}${branchTag}\n  Mensagem: ${commit.message}`);
        cursor = commit.parentIds[0];
      }

      return {
        nextState: state,
        output: { text: lines.join("\n\n"), type: "info" },
      };
    }

    case "branch": {
      if (!parts[2]) {
        // List branches
        const branchList = Object.keys(state.branches)
          .map((b) => (state.head.type === "branch" && state.head.name === b ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`))
          .join("\n");
        return {
          nextState: state,
          output: { text: branchList, type: "info" },
        };
      }

      if (parts[2] === "-d" || parts[2] === "-D") {
        const targetBranch = parts[3];
        if (!targetBranch) {
          return { nextState: state, output: { text: "Erro: Especifique a branch a ser excluída.", type: "error" } };
        }
        if (state.head.type === "branch" && state.head.name === targetBranch) {
          return {
            nextState: state,
            output: { text: `Erro: Não é possível deletar a branch '${targetBranch}' na qual você está atualmente posicionado.`, type: "error" },
          };
        }
        if (!state.branches[targetBranch]) {
          return {
            nextState: state,
            output: { text: `Erro: Branch '${targetBranch}' não encontrada.`, type: "error" },
          };
        }

        const newBranches = { ...state.branches };
        delete newBranches[targetBranch];

        return {
          nextState: { ...state, branches: newBranches },
          output: { text: `Branch '${targetBranch}' excluída com sucesso.`, type: "success" },
        };
      }

      const branchName = parts[2];
      if (state.branches[branchName]) {
        return {
          nextState: state,
          output: { text: `Erro: Uma branch chamada '${branchName}' já existe.`, type: "error" },
        };
      }

      const currentCommit = getCurrentCommitId(state);
      if (!currentCommit) {
        return { nextState: state, output: { text: "Erro: Nenhum commit para criar branch.", type: "error" } };
      }

      return {
        nextState: {
          ...state,
          branches: {
            ...state.branches,
            [branchName]: currentCommit,
          },
        },
        output: { text: `Branch '${branchName}' criada apontando para ${currentCommit}.`, type: "success" },
      };
    }

    case "checkout":
    case "switch": {
      const isCreateFlag = (sub === "checkout" && parts[2] === "-b") || (sub === "switch" && parts[2] === "-c");
      if (isCreateFlag) {
        const branchName = parts[3];
        if (!branchName) {
          return { nextState: state, output: { text: "Erro: Especifique o nome da nova branch.", type: "error" } };
        }
        if (state.branches[branchName]) {
          return { nextState: state, output: { text: `Erro: Branch '${branchName}' já existe.`, type: "error" } };
        }
        const currentCommit = getCurrentCommitId(state);
        if (!currentCommit) {
          return { nextState: state, output: { text: "Erro: Repositório sem commit raiz.", type: "error" } };
        }

        return {
          nextState: {
            ...state,
            branches: {
              ...state.branches,
              [branchName]: currentCommit,
            },
            head: { type: "branch", name: branchName },
          },
          output: { text: `Alternado para a nova branch '${branchName}'`, type: "success" },
        };
      }

      const target = parts[2];
      if (!target) {
        return { nextState: state, output: { text: "Erro: Especifique uma branch ou hash de commit.", type: "error" } };
      }

      // Check if target is existing branch
      if (state.branches[target]) {
        return {
          nextState: {
            ...state,
            head: { type: "branch", name: target },
          },
          output: { text: `Alternado para a branch '${target}'`, type: "success" },
        };
      }

      // Check if target is a commit id
      const commit = state.commits.find((c) => c.id === target);
      if (commit) {
        return {
          nextState: {
            ...state,
            head: { type: "detached", name: commit.id },
          },
          output: {
            text: `Aviso: Você está em estado 'detached HEAD' no commit ${commit.id}.\nNenhum commit feito aqui pertencerá a uma branch até que você crie uma.`,
            type: "warning",
          },
        };
      }

      return {
        nextState: state,
        output: { text: `Erro: Caminho, branch ou commit '${target}' não encontrado.`, type: "error" },
      };
    }

    case "commit": {
      let message = "Novo commit";
      const mIdx = parts.indexOf("-m");
      if (mIdx !== -1 && parts[mIdx + 1]) {
        message = parts.slice(mIdx + 1).join(" ").replace(/^["']|["']$/g, "");
      }

      const currentCommitId = getCurrentCommitId(state);
      const newCommitId = generateCommitId();
      const currentBranch = state.head.type === "branch" ? state.head.name : undefined;

      const newCommit: GitCommit = {
        id: newCommitId,
        message,
        parentIds: currentCommitId ? [currentCommitId] : [],
        branchName: currentBranch,
        timestamp: Date.now(),
      };

      const updatedCommits = [...state.commits, newCommit];

      if (state.head.type === "branch") {
        const branchName = state.head.name;
        return {
          nextState: {
            ...state,
            commits: updatedCommits,
            branches: {
              ...state.branches,
              [branchName]: newCommitId,
            },
          },
          output: {
            text: `[${branchName} ${newCommitId}] ${message}`,
            type: "success",
          },
        };
      } else {
        // Detached HEAD commit
        return {
          nextState: {
            ...state,
            commits: updatedCommits,
            head: { type: "detached", name: newCommitId },
          },
          output: {
            text: `[detached HEAD ${newCommitId}] ${message}`,
            type: "success",
          },
        };
      }
    }

    case "merge": {
      const sourceBranch = parts[2];
      if (!sourceBranch) {
        return { nextState: state, output: { text: "Erro: Especifique a branch a ser mesclada.", type: "error" } };
      }
      if (state.head.type !== "branch") {
        return {
          nextState: state,
          output: { text: "Erro: Não é possível fazer merge em estado 'detached HEAD'. Retorne para uma branch.", type: "error" },
        };
      }
      const targetBranch = state.head.name;
      if (sourceBranch === targetBranch) {
        return { nextState: state, output: { text: `Já está na branch '${targetBranch}'. Nada a mesclar.`, type: "info" } };
      }

      const sourceCommitId = state.branches[sourceBranch];
      if (!sourceCommitId) {
        return { nextState: state, output: { text: `Erro: Branch '${sourceBranch}' não encontrada.`, type: "error" } };
      }

      const targetCommitId = state.branches[targetBranch];

      // If target already at source, up-to-date
      if (sourceCommitId === targetCommitId) {
        return { nextState: state, output: { text: "Já atualizado (Already up to date).", type: "info" } };
      }

      // Fast-forward check: is targetCommit an ancestor of sourceCommit?
      let isAncestor = false;
      let checkCursor: string | undefined = sourceCommitId;
      const visited = new Set<string>();
      while (checkCursor && !visited.has(checkCursor)) {
        visited.add(checkCursor);
        const c = state.commits.find((item) => item.id === checkCursor);
        if (!c) break;
        if (c.parentIds.includes(targetCommitId)) {
          isAncestor = true;
          break;
        }
        checkCursor = c.parentIds[0];
      }

      if (isAncestor) {
        // Fast-forward merge
        return {
          nextState: {
            ...state,
            branches: {
              ...state.branches,
              [targetBranch]: sourceCommitId,
            },
          },
          output: {
            text: `Atualização Fast-forward: '${targetBranch}' avançou para ${sourceCommitId}`,
            type: "success",
          },
        };
      }

      // 3-way Merge commit with 2 parents
      const mergeCommitId = generateCommitId();
      const mergeCommit: GitCommit = {
        id: mergeCommitId,
        message: `Merge branch '${sourceBranch}' into ${targetBranch}`,
        parentIds: [targetCommitId, sourceCommitId],
        branchName: targetBranch,
        timestamp: Date.now(),
      };

      return {
        nextState: {
          ...state,
          commits: [...state.commits, mergeCommit],
          branches: {
            ...state.branches,
            [targetBranch]: mergeCommitId,
          },
        },
        output: {
          text: `Merge realizado com sucesso: [${targetBranch} ${mergeCommitId}] Merge branch '${sourceBranch}'`,
          type: "success",
        },
      };
    }

    case "rebase": {
      const targetBranch = parts[2];
      if (!targetBranch) {
        return { nextState: state, output: { text: "Erro: Especifique a branch base para o rebase.", type: "error" } };
      }
      if (state.head.type !== "branch") {
        return {
          nextState: state,
          output: { text: "Erro: Não é possível fazer rebase em estado 'detached HEAD'.", type: "error" },
        };
      }

      const currentBranch = state.head.name;
      const targetCommitId = state.branches[targetBranch];
      if (!targetCommitId) {
        return { nextState: state, output: { text: `Erro: Branch '${targetBranch}' não encontrada.`, type: "error" } };
      }

      const currentCommitId = state.branches[currentBranch];
      if (currentCommitId === targetCommitId) {
        return { nextState: state, output: { text: "A branch atual já está atualizada com a base.", type: "info" } };
      }

      // Find commits on currentBranch not on targetBranch
      const targetAncestors = new Set<string>();
      let cur: string | undefined = targetCommitId;
      while (cur) {
        targetAncestors.add(cur);
        const c = state.commits.find((x) => x.id === cur);
        cur = c?.parentIds[0];
      }

      const commitsToRebase: GitCommit[] = [];
      cur = currentCommitId;
      while (cur && !targetAncestors.has(cur)) {
        const c = state.commits.find((x) => x.id === cur);
        if (!c) break;
        commitsToRebase.unshift(c);
        cur = c.parentIds[0];
      }

      if (commitsToRebase.length === 0) {
        // Just fast-forward
        return {
          nextState: {
            ...state,
            branches: {
              ...state.branches,
              [currentBranch]: targetCommitId,
            },
          },
          output: { text: `Rebase concluído: ${currentBranch} agora aponta para ${targetCommitId}.`, type: "success" },
        };
      }

      // Reapply commits on top of targetCommitId
      let parentId = targetCommitId;
      const newCommits: GitCommit[] = [];

      for (const old of commitsToRebase) {
        const newId = generateCommitId();
        const rebasedCommit: GitCommit = {
          id: newId,
          message: `${old.message} (rebased)`,
          parentIds: [parentId],
          branchName: currentBranch,
          timestamp: Date.now(),
        };
        newCommits.push(rebasedCommit);
        parentId = newId;
      }

      return {
        nextState: {
          ...state,
          commits: [...state.commits, ...newCommits],
          branches: {
            ...state.branches,
            [currentBranch]: parentId,
          },
        },
        output: {
          text: `Rebase realizado com sucesso! ${commitsToRebase.length} commit(s) reaplicado(s) linearmente sobre '${targetBranch}'.`,
          type: "success",
        },
      };
    }

    case "reset": {
      const isHard = parts.includes("--hard");
      const targetParam = parts.find((p) => p !== "git" && p !== "reset" && p !== "--hard") || "HEAD";

      if (state.head.type !== "branch") {
        return { nextState: state, output: { text: "Erro: Reset disponível apenas posicionado em uma branch.", type: "error" } };
      }

      let targetCommitId: string | null = null;
      const currentCommitId = state.branches[state.head.name];

      if (targetParam === "HEAD~1" || targetParam === "HEAD^") {
        const commit = state.commits.find((c) => c.id === currentCommitId);
        targetCommitId = commit?.parentIds[0] || null;
      } else {
        const targetCommit = state.commits.find((c) => c.id === targetParam);
        if (targetCommit) targetCommitId = targetCommit.id;
        else if (state.branches[targetParam]) targetCommitId = state.branches[targetParam];
      }

      if (!targetCommitId) {
        return {
          nextState: state,
          output: { text: `Erro: Alvo de reset '${targetParam}' não encontrado ou sem pai anterior.`, type: "error" },
        };
      }

      const branchName = state.head.name;
      return {
        nextState: {
          ...state,
          branches: {
            ...state.branches,
            [branchName]: targetCommitId,
          },
        },
        output: {
          text: `HEAD agora está em ${targetCommitId}${isHard ? " (reset --hard aplicado)" : ""}`,
          type: "success",
        },
      };
    }

    default:
      return {
        nextState: state,
        output: {
          text: `Subcomando git '${sub}' não reconhecido. Digite 'git help' para ver os comandos suportados.`,
          type: "error",
        },
      };
  }
}
