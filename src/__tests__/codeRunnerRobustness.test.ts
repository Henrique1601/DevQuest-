import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import { mockChallenges } from "@/lib/data/challenges";

describe("useCodeRunner - Robustez e Proteções", () => {
  const sampleChallenge = mockChallenges[0];

  it("deve tratar erros de exceção lançados propositalmente pelo código do usuário", async () => {
    const { result } = renderHook(() => useCodeRunner());

    const throwingCode = `
      function reverseString(str) {
        throw new Error("Erro customizado de teste");
      }
    `;

    await act(async () => {
      await result.current.runChallenge(sampleChallenge, throwingCode);
    });

    expect(result.current.results.length).toBe(sampleChallenge.testCases.length);
    expect(result.current.results.every((r) => !r.passed)).toBe(true);
    expect(result.current.results[0].error).toContain("Erro customizado");
  });

  it("deve capturar múltiplos tipos de logs: log, error e warn", async () => {
    const { result } = renderHook(() => useCodeRunner());

    const loggingCode = `
      function reverseString(str) {
        console.log("Mensagem comum");
        console.warn("Aviso importante");
        console.error("Erro detectado");
        return str.split('').reverse().join('');
      }
    `;

    await act(async () => {
      await result.current.runChallenge(sampleChallenge, loggingCode);
    });

    expect(result.current.consoleLogs.length).toBeGreaterThanOrEqual(3);
    expect(result.current.consoleLogs.some((l) => l.includes("Mensagem comum"))).toBe(true);
    expect(result.current.consoleLogs.some((l) => l.includes("[AVISO]"))).toBe(true);
    expect(result.current.consoleLogs.some((l) => l.includes("[ERRO]"))).toBe(true);
  });

  it("deve informar erro amigável quando a função esperada não for definida", async () => {
    const { result } = renderHook(() => useCodeRunner());

    const wrongNameCode = `
      function inverterString(texto) {
        return texto.split('').reverse().join('');
      }
    `;

    await act(async () => {
      await result.current.runChallenge(sampleChallenge, wrongNameCode);
    });

    expect(result.current.error).toContain("A função 'reverseString' não foi definida.");
  });
});
