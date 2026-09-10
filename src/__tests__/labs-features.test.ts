import { describe, it, expect } from "vitest";
import { generateBinarySearchSteps } from "@/lib/algorithms/search";
import { generateBubbleSortSteps, generateSelectionSortSteps } from "@/lib/algorithms/sorting";
import { generateStackSteps, generateQueueSteps } from "@/lib/algorithms/dataStructures";
import { VirtualTerminalEngine } from "@/lib/terminal/fileSystem";
import { MockSqlEngine, mockSqlChallenges } from "@/lib/sql/mockDatabase";
import { mockFlashcards, FLASHCARD_CATEGORIES } from "@/lib/data/flashcards";
import { mockChallenges } from "@/lib/data/challenges";
import { mockProjects } from "@/lib/data/projects";

describe("Visualizador de Algoritmos & Estruturas", () => {
  it("deve gerar passos válidos para Busca Binária encontrando o alvo", () => {
    const arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
    const steps = generateBinarySearchSteps(arr, 23);

    expect(steps.length).toBeGreaterThan(1);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.foundIndex).toBe(5);
    expect(lastStep.explanation).toContain("encontrado exatamente no índice 5");
  });

  it("deve ordenar corretamente com Bubble Sort", () => {
    const arr = [50, 10, 40, 20, 30];
    const steps = generateBubbleSortSteps(arr);

    expect(steps.length).toBeGreaterThan(1);
    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual([10, 20, 30, 40, 50]);
    expect(lastStep.sortedIndices).toHaveLength(5);
  });

  it("deve ordenar corretamente com Selection Sort", () => {
    const arr = [9, 1, 8, 2, 7];
    const steps = generateSelectionSortSteps(arr);

    const lastStep = steps[steps.length - 1];
    expect(lastStep.array).toEqual([1, 2, 7, 8, 9]);
  });

  it("deve simular pilha (LIFO) e fila (FIFO)", () => {
    const stackSteps = generateStackSteps();
    const queueSteps = generateQueueSteps();

    expect(stackSteps.some((s) => s.action === "push")).toBe(true);
    expect(stackSteps.some((s) => s.action === "pop")).toBe(true);

    expect(queueSteps.some((s) => s.action === "enqueue")).toBe(true);
    expect(queueSteps.some((s) => s.action === "dequeue")).toBe(true);
  });
});

describe("Terminal Linux & Git Virtual", () => {
  it("deve executar comandos básicos de navegação e arquivos", () => {
    const engine = new VirtualTerminalEngine();

    expect(engine.execute("pwd").output).toBe("/home/devquest");

    const mkdirRes = engine.execute("mkdir pasta-teste");
    expect(mkdirRes.isError).toBeFalsy();

    const cdRes = engine.execute("cd pasta-teste");
    expect(cdRes.isError).toBeFalsy();
    expect(engine.cwd).toBe("/home/devquest/pasta-teste");

    const touchRes = engine.execute("touch script.js");
    expect(touchRes.isError).toBeFalsy();

    const lsRes = engine.execute("ls");
    expect(lsRes.output).toContain("script.js");
  });

  it("deve gerenciar o ciclo de vida do Git (init, add, commit, branch)", () => {
    const engine = new VirtualTerminalEngine();

    // Antes do git init, status deve falhar
    const failStatus = engine.execute("git status");
    expect(failStatus.isError).toBe(true);

    // git init
    const initRes = engine.execute("git init");
    expect(initRes.output).toContain("Repositório Git inicializado");
    expect(engine.git.isInitialized).toBe(true);

    // git add
    engine.execute("touch arquivo.txt");
    const addRes = engine.execute("git add arquivo.txt");
    expect(addRes.output).toContain("adicionado ao stage");
    expect(engine.git.stagedFiles).toContain("arquivo.txt");

    // git commit
    const commitRes = engine.execute('git commit -m "feat: first commit"');
    expect(commitRes.output).toContain("feat: first commit");
    expect(engine.git.commits.length).toBe(1);

    // git branch
    const branchRes = engine.execute("git checkout -b feature/nova");
    expect(branchRes.output).toContain("feature/nova");
    expect(engine.git.currentBranch).toBe("feature/nova");
  });
});

describe("SQL Playground Mock Engine", () => {
  it("deve executar consultas SELECT com WHERE e ORDER BY", () => {
    const engine = new MockSqlEngine();
    const res = engine.runQuery("SELECT * FROM produtos WHERE preco > 300 ORDER BY preco DESC;");

    expect(res.rowCount).toBeGreaterThanOrEqual(3);
    // Primeiro elemento deve ser o mais caro
    const precoIndex = res.columns.indexOf("preco");
    expect(Number(res.rows[0][precoIndex])).toBeGreaterThanOrEqual(1000);
  });

  it("deve executar INNER JOIN entre usuarios e pedidos", () => {
    const engine = new MockSqlEngine();
    const res = engine.runQuery("SELECT usuarios.nome, pedidos.total FROM usuarios INNER JOIN pedidos ON usuarios.id = pedidos.usuario_id;");

    expect(res.rowCount).toBeGreaterThanOrEqual(5);
    expect(res.columns).toContain("usuarios.nome");
    expect(res.columns).toContain("pedidos.total");
  });

  it("deve conter validação válida nos desafios de SQL", () => {
    expect(mockSqlChallenges.length).toBeGreaterThanOrEqual(3);
    const chal1 = mockSqlChallenges[0];
    const engine = new MockSqlEngine();
    const res = engine.runQuery(chal1.starterQuery);
    expect(chal1.validateResult(res)).toBe(true);
  });
});

describe("Flashcards Anki & Categorias", () => {
  it("deve possuir flashcards distribuídos em todas as categorias principais", () => {
    expect(mockFlashcards.length).toBeGreaterThanOrEqual(15);
    expect(FLASHCARD_CATEGORIES.length).toBeGreaterThanOrEqual(6);

    const categories = new Set(mockFlashcards.map((f) => f.category));
    expect(categories.has("javascript")).toBe(true);
    expect(categories.has("typescript")).toBe(true);
    expect(categories.has("react")).toBe(true);
    expect(categories.has("sql")).toBe(true);
    expect(categories.has("git")).toBe(true);
    expect(categories.has("algorithms")).toBe(true);

    mockFlashcards.forEach((card) => {
      expect(card.question.length).toBeGreaterThan(5);
      expect(card.answer.length).toBeGreaterThan(5);
      expect(card.explanation.length).toBeGreaterThan(5);
    });
  });
});

describe("Metadados de Empresas Reais nos Desafios & Projetos", () => {
  it("deve conter empresas reais cadastradas nos desafios", () => {
    const withCompany = mockChallenges.filter((c) => !!c.company);
    expect(withCompany.length).toBeGreaterThanOrEqual(10);

    const companies = withCompany.map((c) => c.company);
    expect(companies).toContain("Google");
    expect(companies).toContain("Nubank");
    expect(companies).toContain("Mercado Livre");
    expect(companies).toContain("Netflix");
  });

  it("deve conter empresas reais cadastradas nos projetos", () => {
    const projectsWithCompany = mockProjects.filter((p) => !!p.company);
    expect(projectsWithCompany.length).toBeGreaterThanOrEqual(5);
  });
});
