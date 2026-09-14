import { describe, it, expect } from "vitest";
import { estimateComplexity, computeMetrics, useCodeRunner } from "@/hooks/useCodeRunner";
import { renderHook, act } from "@testing-library/react";
import { mockChallenges } from "@/lib/data/challenges";

describe("Performance Metrics & Benchmarking (LeetCode Style)", () => {
  describe("estimateComplexity", () => {
    it("deve identificar complexidade O(1) para códigos diretos", () => {
      const code = `
        function soma(a, b) {
          return a + b;
        }
      `;
      const result = estimateComplexity(code);
      expect(result.time).toBe("O(1)");
    });

    it("deve identificar complexidade O(n) para loops simples ou map/filter", () => {
      const code = `
        function dobrar(arr) {
          return arr.map(x => x * 2);
        }
      `;
      const result = estimateComplexity(code);
      expect(result.time).toBe("O(n)");
      expect(result.space).toBe("O(n)");
    });

    it("deve identificar complexidade O(n²) para loops aninhados", () => {
      const code = `
        function bubbleSort(arr) {
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
              if (arr[i] < arr[j]) {}
            }
          }
        }
      `;
      const result = estimateComplexity(code);
      expect(result.time).toBe("O(n²)");
    });

    it("deve identificar O(n log n) ao usar .sort()", () => {
      const code = `
        function ordenar(arr) {
          return arr.slice().sort((a, b) => a - b);
        }
      `;
      const result = estimateComplexity(code);
      expect(result.time).toBe("O(n log n)");
    });
  });

  describe("computeMetrics", () => {
    it("deve calcular percentis coerentes baseados no tempo de execução", () => {
      const breakdown = [
        { testCaseId: "tc-1", durationMs: 0.1 },
        { testCaseId: "tc-2", durationMs: 0.15 },
      ];
      const fastMetrics = computeMetrics(0.15, breakdown, "function f(x) { return x; }");
      expect(fastMetrics.timePercentile).toBeGreaterThan(90);
      expect(fastMetrics.timeRankLabel).toMatch(/Excepcional|Excelente/);
      expect(fastMetrics.totalTimeMs).toBe(0.15);
      expect(fastMetrics.breakdown.length).toBe(2);

      const slowMetrics = computeMetrics(85, breakdown, "function f(x) { return x; }");
      expect(slowMetrics.timePercentile).toBeLessThan(50);
    });
  });

  describe("useCodeRunner com performanceMetrics", () => {
    const challenge = mockChallenges[0];

    it("deve popular performanceMetrics após executar desafio com sucesso", async () => {
      const { result } = renderHook(() => useCodeRunner());

      const validCode = `
        function reverseString(str) {
          return str.split('').reverse().join('');
        }
      `;

      await act(async () => {
        await result.current.runChallenge(challenge, validCode);
      });

      expect(result.current.performanceMetrics).not.toBeNull();
      expect(result.current.performanceMetrics?.totalTimeMs).toBeGreaterThanOrEqual(0);
      expect(result.current.performanceMetrics?.timePercentile).toBeGreaterThan(0);
      expect(result.current.performanceMetrics?.breakdown.length).toBe(challenge.testCases.length);
    });
  });
});
