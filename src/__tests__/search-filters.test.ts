import { describe, it, expect } from "vitest";
import { mockChallenges } from "@/lib/data/challenges";
import { mockProjects } from "@/lib/data/projects";

describe("Busca e Filtros de Conteúdo", () => {
  it("deve conter pelo menos 16 desafios cadastrados cobrindo todas as categorias", () => {
    expect(mockChallenges.length).toBe(16);

    const categories = new Set(mockChallenges.map((c) => c.category));
    expect(categories.has("strings")).toBe(true);
    expect(categories.has("arrays")).toBe(true);
    expect(categories.has("algorithms")).toBe(true);
    expect(categories.has("async")).toBe(true);
    expect(categories.has("logic")).toBe(true);
  });

  it("deve filtrar desafios por termo de busca corretamente", () => {
    const query = "kadane";
    const filtered = mockChallenges.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
    );

    expect(filtered.length).toBe(1);
    expect(filtered[0].slug).toBe("max-subarray");
  });

  it("deve conter pelo menos 16 projetos cobrindo iniciante, intermediário e avançado", () => {
    expect(mockProjects.length).toBeGreaterThanOrEqual(16);

    const beginners = mockProjects.filter((p) => p.difficulty === "beginner");
    const intermediates = mockProjects.filter((p) => p.difficulty === "intermediate");
    const advanced = mockProjects.filter((p) => p.difficulty === "advanced");

    expect(beginners.length).toBeGreaterThanOrEqual(3);
    expect(intermediates.length).toBeGreaterThanOrEqual(4);
    expect(advanced.length).toBeGreaterThanOrEqual(3);
  });

  it("deve filtrar projetos por tag tecnológica (ex: QR Code ou Drag & Drop)", () => {
    const kanban = mockProjects.filter((p) =>
      p.tags.some((t) => t.toLowerCase().includes("drag & drop"))
    );
    expect(kanban.length).toBe(1);
    expect(kanban[0].slug).toBe("kanban-board-drag-drop");

    const uptime = mockProjects.filter((p) =>
      p.title.toLowerCase().includes("uptime")
    );
    expect(uptime.length).toBe(1);
    expect(uptime[0].slug).toBe("monitor-uptime-status-page");
  });
});
