import { describe, it, expect } from "vitest";
import { mockProjects } from "@/lib/data/projects";
import { mockChallenges } from "@/lib/data/challenges";

describe("Links e Documentação de Apoio (Projetos)", () => {
  it("todos os projetos devem conter links de referência configurados", () => {
    expect(mockProjects.length).toBe(16);

    mockProjects.forEach((proj) => {
      expect(proj.referenceLinks).toBeDefined();
      expect(proj.referenceLinks!.length).toBeGreaterThanOrEqual(3);

      proj.referenceLinks!.forEach((link) => {
        expect(link.title).toBeTruthy();
        expect(link.url).toBeTruthy();
        expect(link.type).toMatch(/^(docs|w3schools|video|cheatsheet|stackoverflow|article)$/);
        // Garante que é uma URL válida (externa https:// ou rota interna /)
        const isValidUrl = link.url.startsWith("https://") || link.url.startsWith("/");
        expect(isValidUrl).toBe(true);
      });
    });
  });

  it("deve conter links para grandes referências técnicas (MDN, W3Schools, Docs Oficiais)", () => {
    const allUrls = mockProjects.flatMap((p) => p.referenceLinks?.map((l) => l.url) || []);
    expect(allUrls.some((u) => u.includes("developer.mozilla.org"))).toBe(true);
    expect(allUrls.some((u) => u.includes("w3schools.com"))).toBe(true);
    expect(allUrls.some((u) => u.includes("neon.tech") || u.includes("react.dev"))).toBe(true);
  });
});

describe("Links e Documentação de Apoio (Desafios)", () => {
  it("todos os desafios devem conter links de referência configurados", () => {
    expect(mockChallenges.length).toBe(16);

    mockChallenges.forEach((chal) => {
      expect(chal.referenceLinks).toBeDefined();
      expect(chal.referenceLinks!.length).toBeGreaterThanOrEqual(2);

      chal.referenceLinks!.forEach((link) => {
        expect(link.title).toBeTruthy();
        expect(link.url).toBeTruthy();
        expect(link.type).toMatch(/^(docs|w3schools|video|cheatsheet|stackoverflow|article)$/);
        const isValidUrl = link.url.startsWith("https://") || link.url.startsWith("/");
        expect(isValidUrl).toBe(true);
      });
    });
  });

  it("deve cobrir referências específicas aos métodos dos algoritmos", () => {
    const allTitles = mockChallenges.flatMap((c) => c.referenceLinks?.map((l) => l.title.toLowerCase()) || []);
    expect(allTitles.some((t) => t.includes("w3schools"))).toBe(true);
    expect(allTitles.some((t) => t.includes("mdn"))).toBe(true);
  });
});
