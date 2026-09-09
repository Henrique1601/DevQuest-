import { describe, it, expect } from "vitest";
import { mockProjects } from "@/lib/data/projects";
import { mockTracks } from "@/lib/data/tracks";

describe("lib/data/projects & tracks", () => {
  it("todos os projetos devem possuir campos obrigatórios, slugs únicos e etapas válidas", () => {
    expect(mockProjects.length).toBeGreaterThanOrEqual(6);

    const slugs = new Set<string>();
    mockProjects.forEach((proj) => {
      expect(proj.id).toBeDefined();
      expect(proj.title).toBeDefined();
      expect(proj.slug).toBeDefined();
      expect(slugs.has(proj.slug)).toBe(false);
      slugs.add(proj.slug);

      expect(["beginner", "intermediate", "advanced"]).toContain(proj.difficulty);
      expect(proj.estimatedHours).toBeGreaterThan(0);
      expect(proj.features.length).toBeGreaterThan(0);
      expect(proj.steps.length).toBeGreaterThan(0);

      proj.steps.forEach((step) => {
        expect(step.order).toBeGreaterThan(0);
        expect(step.title).toBeDefined();
        expect(step.description).toBeDefined();
      });
    });
  });

  it("todas as trilhas devem possuir dados válidos e vincular a projetos existentes", () => {
    expect(mockTracks.length).toBeGreaterThanOrEqual(4);

    mockTracks.forEach((track) => {
      expect(track.id).toBeDefined();
      expect(track.slug).toBeDefined();
      expect(track.title).toBeDefined();
      expect(track.modules.length).toBeGreaterThan(0);

      track.modules.forEach((mod) => {
        expect(mod.id).toBeDefined();
        expect(mod.title).toBeDefined();
        expect(mod.lessonsCount).toBeGreaterThan(0);

        if (mod.projectSlug) {
          const matchedProject = mockProjects.find((p) => p.slug === mod.projectSlug);
          expect(matchedProject).toBeDefined();
        }
      });
    });
  });
});
