import { describe, it, expect } from "vitest";
import { analyzeCodeWithMentor, getSocraticHints } from "@/lib/ai/mentor";

describe("DevBot AI Mentor", () => {
  it("deve detectar função sem retorno", () => {
    const code = "function soma(a, b) { const c = a + b; }";
    const advices = analyzeCodeWithMentor(code, "soma");
    const noReturn = advices.find((a) => a.type === "bug" && a.title.includes("Sem Retorno"));
    expect(noReturn).toBeDefined();
  });

  it("deve detectar loops aninhados com complexidade O(N²)", () => {
    const code = `
      function containsDuplicate(arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) return true;
          }
        }
        return false;
      }
    `;
    const advices = analyzeCodeWithMentor(code, "containsDuplicate");
    const complexityAdvice = advices.find((a) => a.type === "complexity");
    expect(complexityAdvice).toBeDefined();
    expect(complexityAdvice?.suggestedComplexity).toBe("O(n)");
  });

  it("deve fornecer dicas socráticas progressivas pelos níveis 1, 2 e 3", () => {
    const hint1 = getSocraticHints("Two Sum", 1);
    const hint2 = getSocraticHints("Two Sum", 2);
    const hint3 = getSocraticHints("Two Sum", 3);

    expect(hint1.length).toBeGreaterThan(0);
    expect(hint2).toContain("Pseudocódigo");
    expect(hint3).toContain("Diagnóstico");
  });
});
