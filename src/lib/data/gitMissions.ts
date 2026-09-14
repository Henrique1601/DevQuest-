import { GitMission, GitState } from "@/types/gitVisualizer";

export const GIT_MISSIONS: GitMission[] = [
  {
    id: "mission-1",
    level: 1,
    title: "O Primeiro Commit",
    difficulty: "beginner",
    objective: "Faça o seu primeiro commit no repositório.",
    description:
      "Commits representam capturas do estado do seu código no tempo. Use o comando 'git commit' com a flag '-m' para registrar suas alterações com uma mensagem descritiva.",
    hint: "Digite: git commit -m \"feat: meu primeiro commit\"",
    expectedGoalDescription: "Ter pelo menos 2 commits na branch 'main'.",
    validate: (state: GitState) => {
      return state.commits.length >= 2 && state.branches.main !== "c0";
    },
  },
  {
    id: "mission-2",
    level: 2,
    title: "Criando sua Primeira Branch",
    difficulty: "beginner",
    objective: "Crie uma nova branch chamada 'feature' e alterne para ela.",
    description:
      "Branches permitem desenvolver novas funcionalidades de forma isolada sem afetar a linha principal de produção ('main'). Você pode criar e alternar em um único comando usando 'git checkout -b <nome>' ou 'git switch -c <nome>'.",
    hint: "Digite: git checkout -b feature (ou crie com 'git branch feature' e mude com 'git checkout feature')",
    expectedGoalDescription: "A branch 'feature' deve existir e o HEAD deve estar apontando para ela.",
    validate: (state: GitState) => {
      return Boolean(state.branches.feature && state.head.type === "branch" && state.head.name === "feature");
    },
  },
  {
    id: "mission-3",
    level: 3,
    title: "Trabalhando em Paralelo",
    difficulty: "beginner",
    objective: "Faça um commit na branch 'feature' e retorne para a branch 'main'.",
    description:
      "Ao commitar em uma branch separada, o ponteiro daquela branch avança independentemente. Depois, você pode voltar para a 'main' para continuar outro trabalho.",
    hint: "Primeiro faça 'git commit -m \"codigo na feature\"' e depois 'git checkout main'",
    setupCommands: ["git branch feature", "git checkout feature"],
    expectedGoalDescription: "A branch 'feature' deve estar à frente da 'main', e você deve estar na branch 'main'.",
    validate: (state: GitState) => {
      const featureCommit = state.branches.feature;
      const mainCommit = state.branches.main;
      return Boolean(featureCommit && featureCommit !== mainCommit && state.head.name === "main");
    },
  },
  {
    id: "mission-4",
    level: 4,
    title: "Integrando com Git Merge",
    difficulty: "intermediate",
    objective: "Faça o merge da branch 'feature' na branch 'main'.",
    description:
      "O comando 'git merge' integra o histórico e as alterações de uma branch em outra. Estando na branch de destino ('main'), você chama 'git merge feature'.",
    hint: "Estando na 'main', digite: git merge feature",
    setupCommands: [
      "git checkout -b feature",
      "git commit -m \"feat: funcionalidade nova\"",
      "git checkout main",
    ],
    expectedGoalDescription: "A branch 'main' deve conter o commit da 'feature'.",
    validate: (state: GitState) => {
      const mainC = state.branches.main;
      const featC = state.branches.feature;
      if (!mainC || !featC) return false;
      if (state.head.name !== "main") return false;

      // Se for fast-forward ou merge commit que tenha featC como pai
      if (mainC === featC) return true;
      const commit = state.commits.find((c) => c.id === mainC);
      return Boolean(commit && commit.parentIds.includes(featC));
    },
  },
  {
    id: "mission-5",
    level: 5,
    title: "Histórico Linear com Git Rebase",
    difficulty: "intermediate",
    objective: "Faça o rebase da branch 'feature' sobre a branch 'main'.",
    description:
      "Diferente do merge, o rebase reescreve o ponto de partida da sua branch, reaplicando seus commits um a um no topo da branch alvo. Isso mantém o histórico de commits 100% linear e limpo.",
    hint: "Alterne para a feature ('git checkout feature') e execute: git rebase main",
    setupCommands: [
      "git commit -m \"docs: update readme\"",
      "git checkout -b feature",
      "git commit -m \"feat: tela de login\"",
      "git checkout main",
      "git commit -m \"fix: corrigir bug crítico\"",
    ],
    expectedGoalDescription: "A branch 'feature' deve ser rebaseada no topo da 'main'.",
    validate: (state: GitState) => {
      if (state.head.name !== "feature") return false;
      const featureC = state.branches.feature;
      const mainC = state.branches.main;
      if (!featureC || !mainC) return false;

      // Verifica se mainC é ancestral de featureC
      let cur: string | undefined = featureC;
      const visited = new Set<string>();
      while (cur && !visited.has(cur)) {
        visited.add(cur);
        if (cur === mainC) return true;
        const commit = state.commits.find((c) => c.id === cur);
        cur = commit?.parentIds[0];
      }
      return false;
    },
  },
  {
    id: "mission-6",
    level: 6,
    title: "Viagem no Tempo e Detached HEAD",
    difficulty: "advanced",
    objective: "Alterne seu HEAD diretamente para o commit inicial 'c0'.",
    description:
      "Quando você faz checkout de um hash de commit específico em vez do nome de uma branch, o Git entra no estado 'Detached HEAD'. Você pode inspecionar o código exatamente como ele estava naquele momento do passado!",
    hint: "Digite: git checkout c0",
    expectedGoalDescription: "O HEAD deve estar desanexado no commit inicial 'c0'.",
    validate: (state: GitState) => {
      return state.head.type === "detached" && state.head.name === "c0";
    },
  },
];
