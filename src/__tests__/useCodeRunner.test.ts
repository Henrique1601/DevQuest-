import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import { mockChallenges } from "@/lib/data/challenges";

describe("useCodeRunner Hook", () => {
  const sampleChallenge = mockChallenges[0]; // reverseString

  it("deve executar e aprovar uma solução correta", async () => {
    const { result } = renderHook(() => useCodeRunner());

    const correctCode = `
      function reverseString(str) {
        console.log("Invertendo texto:", str);
        return str.split('').reverse().join('');
      }
    `;

    await act(async () => {
      await result.current.runChallenge(sampleChallenge, correctCode);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.results.length).toBe(sampleChallenge.testCases.length);
    expect(result.current.results.every((r) => r.passed)).toBe(true);
    expect(result.current.consoleLogs.length).toBeGreaterThan(0);
  });

  it("deve reprovar quando a solução retorna valores incorretos", async () => {
    const { result } = renderHook(() => useCodeRunner());

    const wrongCode = `
      function reverseString(str) {
        return str; // Incorreto
      }
    `;

    await act(async () => {
      await result.current.runChallenge(sampleChallenge, wrongCode);
    });

    expect(result.current.results.some((r) => !r.passed)).toBe(true);
  });

  it("deve capturar erros de sintaxe ou função não definida", async () => {
    const { result } = renderHook(() => useCodeRunner());

    const brokenCode = `
      function outroNome(str) { return str; }
    `;

    await act(async () => {
      await result.current.runChallenge(sampleChallenge, brokenCode);
    });

    expect(result.current.error).toContain("reverseString");
  });
});
