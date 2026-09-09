import { describe, it, expect } from "vitest";
import { mockChallenges } from "@/lib/data/challenges";

describe("lib/data/challenges", () => {
  it("deve possuir desafios cadastrados com dados válidos e completos", () => {
    expect(mockChallenges.length).toBeGreaterThanOrEqual(4);

    mockChallenges.forEach((chal) => {
      expect(chal.id).toBeDefined();
      expect(chal.slug).toBeDefined();
      expect(chal.title).toBeDefined();
      expect(chal.functionName).toBeDefined();
      expect(chal.starterCode).toContain(chal.functionName);
      expect(chal.testCases.length).toBeGreaterThan(0);
      expect(chal.hints.length).toBeGreaterThan(0);
    });
  });
});
