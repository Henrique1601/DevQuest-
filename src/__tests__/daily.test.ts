import { describe, it, expect } from "vitest";
import { getTodayDailyQuest, generateAnnualHeatmapData, mockDailyQuests } from "@/lib/data/dailyQuests";

describe("Desafios Diários & Heatmap de Atividade", () => {
  it("deve carregar o desafio diário com casos de teste válidos", () => {
    const quest = getTodayDailyQuest();
    expect(quest).toBeDefined();
    expect(quest.title.length).toBeGreaterThan(0);
    expect(quest.xpReward).toBeGreaterThanOrEqual(100);
    expect(quest.testCases.length).toBeGreaterThanOrEqual(2);
  });

  it("o starter code do desafio de hoje deve resolver os casos de teste", () => {
    const quest = getTodayDailyQuest();
    const fn = new Function(`
      ${quest.starterCode}
      return reverseWords;
    `)();

    for (const tc of quest.testCases) {
      const result = fn(...tc.input);
      expect(result).toBe(tc.expected);
    }
  });

  it("deve gerar dados de heatmap cobrindo mais de 100 dias com níveis de 0 a 4", () => {
    const heatmap = generateAnnualHeatmapData();
    expect(heatmap.length).toBeGreaterThan(100);

    for (const day of heatmap) {
      expect(day.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(day.level).toBeGreaterThanOrEqual(0);
      expect(day.level).toBeLessThanOrEqual(4);
    }
  });
});
