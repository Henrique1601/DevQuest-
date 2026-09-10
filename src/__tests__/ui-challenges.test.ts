import { describe, it, expect } from "vitest";
import { mockUIChallenges } from "@/lib/data/uiChallenges";

describe("Desafios de UI/UX & Frontend Mentor", () => {
  it("deve conter desafios com requisitos, starter e target HTML/CSS", () => {
    expect(mockUIChallenges.length).toBeGreaterThanOrEqual(2);

    for (const challenge of mockUIChallenges) {
      expect(challenge.title.length).toBeGreaterThan(0);
      expect(challenge.requirements.length).toBeGreaterThan(0);
      expect(challenge.starterHtml).toContain("<div");
      expect(challenge.targetHtml).toContain("<div");
      expect(challenge.starterCss.length).toBeGreaterThan(0);
      expect(challenge.targetCss.length).toBeGreaterThan(0);
    }
  });

  it("o desafio do cartão de crédito deve possuir classes de glassmorphism", () => {
    const cardChallenge = mockUIChallenges.find((c) => c.slug === "cartao-credito-glassmorphism");
    expect(cardChallenge).toBeDefined();
    expect(cardChallenge?.targetCss).toContain("backdrop-filter");
    expect(cardChallenge?.targetCss).toContain("rgba");
  });
});
