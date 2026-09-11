import { describe, it, expect } from "vitest";
import { analyzeCodeForReview, REVIEW_PRESETS } from "@/lib/ai/codeReview";

describe("Motor de Code Review Automatizado (Estilo PR)", () => {
  it("deve carregar presets de revisão com código e metadados válidos", () => {
    expect(REVIEW_PRESETS.length).toBeGreaterThanOrEqual(3);
    const sqlPreset = REVIEW_PRESETS.find((p) => p.id === "sql-injection");
    expect(sqlPreset).toBeDefined();
    expect(sqlPreset?.code).toContain("SELECT * FROM");
  });

  it("deve detectar SQL Injection crítico e solicitar CHANGES_REQUESTED", () => {
    const maliciousCode = `
      const query = "SELECT * FROM users WHERE id = '" + req.query.id + "'";
      db.execute(query);
    `;
    const review = analyzeCodeForReview(maliciousCode);
    expect(review.verdict).toBe("CHANGES_REQUESTED");
    expect(review.metrics.securityScore).toBeLessThan(60);

    const hasSqliComment = review.comments.some((c) => c.category === "security" && c.severity === "critical");
    expect(hasSqliComment).toBe(true);
  });

  it("deve detectar falta de cleanup em useEffect (Memory Leak)", () => {
    const memoryLeakCode = `
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        setInterval(fetchData, 1000);
      }, []);
    `;
    const review = analyzeCodeForReview(memoryLeakCode);
    expect(review.comments.some((c) => c.category === "performance")).toBe(true);
    expect(review.metrics.performanceScore).toBeLessThan(100);
  });

  it("deve detectar mutação de parâmetros de entrada", () => {
    const mutatingCode = `
      function clean(items) {
        items.splice(0, 2);
        return items;
      }
    `;
    const review = analyzeCodeForReview(mutatingCode);
    expect(review.comments.some((c) => c.title.includes("Mutação"))).toBe(true);
  });

  it("deve aprovar (APPROVED) código limpo e seguro com score alto", () => {
    const cleanCode = `
      export function sumPositiveNumbers(numbers: number[]): number {
        return numbers
          .filter((n) => n > 0)
          .reduce((acc, curr) => acc + curr, 0);
      }
    `;
    const review = analyzeCodeForReview(cleanCode);
    expect(review.verdict).toBe("APPROVED");
    expect(review.score).toBeGreaterThanOrEqual(90);
    expect(review.metrics.securityScore).toBe(100);
  });
});