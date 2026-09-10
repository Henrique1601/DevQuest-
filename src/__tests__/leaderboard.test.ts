import { describe, it, expect } from "vitest";
import { mockLeaderboardUsers, LEAGUE_TIERS } from "@/lib/data/leaderboard";

describe("Sistema de Ranking & Ligas de XP", () => {
  it("deve conter as 4 ligas fundamentais com requisitos de XP", () => {
    expect(LEAGUE_TIERS.Diamante.minXp).toBe(3000);
    expect(LEAGUE_TIERS.Ouro.minXp).toBe(2000);
    expect(LEAGUE_TIERS.Prata.minXp).toBe(1000);
    expect(LEAGUE_TIERS.Bronze.minXp).toBe(0);
  });

  it("deve ordenar os usuários por XP decrescente no Top 3", () => {
    const top3 = mockLeaderboardUsers.slice(0, 3);
    expect(top3[0].xp).toBeGreaterThanOrEqual(top3[1].xp);
    expect(top3[1].xp).toBeGreaterThanOrEqual(top3[2].xp);
  });

  it("deve identificar o usuário atual com streak positivo", () => {
    const you = mockLeaderboardUsers.find((u) => u.isCurrentUser);
    expect(you).toBeDefined();
    expect(you?.streak).toBeGreaterThan(0);
    expect(you?.xp).toBeGreaterThan(0);
  });
});
