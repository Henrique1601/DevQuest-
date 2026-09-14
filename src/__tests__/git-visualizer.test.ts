import { describe, it, expect, beforeEach } from "vitest";
import {
  INITIAL_GIT_STATE,
  executeGitCommand,
  resetCommitCounter,
  getCurrentCommitId,
} from "@/lib/git/gitEngine";
import { GIT_MISSIONS } from "@/lib/data/gitMissions";
import { GitState } from "@/types/gitVisualizer";

describe("Git Engine & Interactive Visualizer", () => {
  let state: GitState;

  beforeEach(() => {
    resetCommitCounter(1);
    state = {
      commits: [
        {
          id: "c0",
          message: "Initial commit",
          parentIds: [],
          branchName: "main",
          timestamp: 1000,
        },
      ],
      branches: { main: "c0" },
      head: { type: "branch", name: "main" },
    };
  });

  it("deve criar um novo commit e avançar a branch atual", () => {
    const res = executeGitCommand('git commit -m "feat: login screen"', state);
    expect(res.output.type).toBe("success");
    expect(res.nextState.commits.length).toBe(2);
    expect(res.nextState.commits[1].message).toBe("feat: login screen");
    expect(res.nextState.branches.main).toBe(res.nextState.commits[1].id);
    expect(getCurrentCommitId(res.nextState)).toBe(res.nextState.commits[1].id);
  });

  it("deve criar e alternar para uma nova branch com checkout -b", () => {
    const res = executeGitCommand("git checkout -b feature/auth", state);
    expect(res.output.type).toBe("success");
    expect(res.nextState.branches["feature/auth"]).toBe("c0");
    expect(res.nextState.head).toEqual({ type: "branch", name: "feature/auth" });
  });

  it("deve alternar entre branches existentes com git checkout", () => {
    let s = executeGitCommand("git branch feature", state).nextState;
    expect(s.branches.feature).toBe("c0");

    let switchRes = executeGitCommand("git checkout feature", s);
    expect(switchRes.nextState.head.name).toBe("feature");

    let backRes = executeGitCommand("git checkout main", switchRes.nextState);
    expect(backRes.nextState.head.name).toBe("main");
  });

  it("deve realizar merge fast-forward com sucesso", () => {
    // Cria branch feature e faz commit nela
    let s = executeGitCommand("git checkout -b feature", state).nextState;
    s = executeGitCommand('git commit -m "feat: added feature"', s).nextState;
    const featureCommit = s.branches.feature;

    // Volta para main e faz merge
    s = executeGitCommand("git checkout main", s).nextState;
    const mergeRes = executeGitCommand("git merge feature", s);

    expect(mergeRes.output.type).toBe("success");
    expect(mergeRes.nextState.branches.main).toBe(featureCommit);
  });

  it("deve realizar merge 3-way quando ambas as branches divergiram", () => {
    // Commit na feature
    let s = executeGitCommand("git checkout -b feature", state).nextState;
    s = executeGitCommand('git commit -m "feat: feature work"', s).nextState;

    // Commit na main
    s = executeGitCommand("git checkout main", s).nextState;
    s = executeGitCommand('git commit -m "feat: main work"', s).nextState;

    // Merge
    const mergeRes = executeGitCommand("git merge feature", s);
    expect(mergeRes.output.type).toBe("success");
    expect(mergeRes.nextState.commits.length).toBe(4); // c0, featureC, mainC, mergeC
    const mergeCommit = mergeRes.nextState.commits[3];
    expect(mergeCommit.parentIds.length).toBe(2);
  });

  it("deve realizar rebase linear", () => {
    // Commit na main
    let s = executeGitCommand('git commit -m "main 1"', state).nextState;
    const mainCommit = s.branches.main;

    // Branch feature a partir de c0
    s = executeGitCommand("git checkout c0", s).nextState;
    s = executeGitCommand("git checkout -b feature", s).nextState;
    s = executeGitCommand('git commit -m "feature 1"', s).nextState;

    // Rebase feature on top of main
    const rebaseRes = executeGitCommand("git rebase main", s);
    expect(rebaseRes.output.type).toBe("success");
    const rebasedFeature = rebaseRes.nextState.branches.feature;
    const rebasedCommit = rebaseRes.nextState.commits.find((c) => c.id === rebasedFeature);
    expect(rebasedCommit?.parentIds[0]).toBe(mainCommit);
  });

  it("deve suportar Detached HEAD ao fazer checkout de um commit", () => {
    let s = executeGitCommand('git commit -m "commit 1"', state).nextState;
    let detachedRes = executeGitCommand("git checkout c0", s);
    expect(detachedRes.output.type).toBe("warning");
    expect(detachedRes.nextState.head).toEqual({ type: "detached", name: "c0" });
  });

  it("deve validar corretamente as missões do catálogo", () => {
    // Missão 1: Primeiro commit
    const m1 = GIT_MISSIONS[0];
    expect(m1.validate(state)).toBe(false);
    const s1 = executeGitCommand('git commit -m "meu primeiro commit"', state).nextState;
    expect(m1.validate(s1)).toBe(true);

    // Missão 2: Criar branch feature
    const m2 = GIT_MISSIONS[1];
    expect(m2.validate(state)).toBe(false);
    const s2 = executeGitCommand("git checkout -b feature", state).nextState;
    expect(m2.validate(s2)).toBe(true);
  });
});
