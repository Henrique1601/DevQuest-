import { describe, it, expect } from "vitest";
import { CSS_ARENA_LEVELS } from "@/lib/data/cssArenaLevels";

describe("CSS Flex & Grid Arena (Minigame de Layouts)", () => {
  it("deve conter exatamente 15 níveis didáticos progressivos", () => {
    expect(CSS_ARENA_LEVELS).toHaveLength(15);
  });

  it("todos os níveis devem ter identificadores sequenciais de 1 a 15", () => {
    CSS_ARENA_LEVELS.forEach((level, index) => {
      expect(level.id).toBe(index + 1);
    });
  });

  it("deve cobrir tanto Flexbox quanto CSS Grid", () => {
    const categories = new Set(CSS_ARENA_LEVELS.map((l) => l.category));
    expect(categories.has("flexbox")).toBe(true);
    expect(categories.has("grid")).toBe(true);

    const flexLevels = CSS_ARENA_LEVELS.filter((l) => l.category === "flexbox");
    const gridLevels = CSS_ARENA_LEVELS.filter((l) => l.category === "grid");

    expect(flexLevels.length).toBeGreaterThanOrEqual(8);
    expect(gridLevels.length).toBeGreaterThanOrEqual(5);
  });

  it("cada nível deve possuir estrutura íntegra, solução diferente do código inicial e drones", () => {
    for (const level of CSS_ARENA_LEVELS) {
      expect(level.title).toBeTruthy();
      expect(level.mission.length).toBeGreaterThan(15);
      expect(level.instructions.length).toBeGreaterThan(15);
      expect(level.startingCode).toBeTruthy();
      expect(level.solution).toBeTruthy();
      expect(level.startingCode).not.toBe(level.solution);

      expect(level.drones.length).toBeGreaterThanOrEqual(1);
      expect(level.targets.length).toBe(level.drones.length);

      expect(level.cheatsheet.length).toBeGreaterThanOrEqual(1);
      expect(level.tip).toBeTruthy();
    }
  });
});
