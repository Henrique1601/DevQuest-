import { describe, it, expect } from "vitest";
import { mockInterviewChallenges } from "@/lib/data/interviews";

describe("Simulador de Entrevistas Técnicas", () => {
  it("deve carregar os desafios de empresas reais com metadados completos", () => {
    expect(mockInterviewChallenges.length).toBeGreaterThanOrEqual(4);

    const companies = mockInterviewChallenges.map((c) => c.company);
    expect(companies).toContain("Nubank");
    expect(companies).toContain("Mercado Livre");
    expect(companies).toContain("Google");
    expect(companies).toContain("iFood");
  });

  it("o desafio do Nubank deve resolver transações com idempotência e saldo", () => {
    const nubank = mockInterviewChallenges.find((c) => c.company === "Nubank");
    expect(nubank).toBeDefined();

    // Executa a lógica de solução
    const fn = new Function(`
      ${nubank?.starterCode}
      return processTransactions;
    `)();

    const testCase = nubank?.testCases[0];
    const result = fn(...testCase!.input);
    expect(result).toEqual(testCase?.expected);
  });

  it("o desafio do Google deve encontrar o subarray de soma máxima em O(n)", () => {
    const google = mockInterviewChallenges.find((c) => c.company === "Google");
    expect(google).toBeDefined();

    const fn = new Function(`
      ${google?.starterCode}
      return maxSubArray;
    `)();

    const testCase = google?.testCases[0];
    const result = fn(...testCase!.input);
    expect(result).toBe(6);
  });

  it("o desafio do iFood deve despachar pedidos VIP primeiro e por maior tempo de espera", () => {
    const ifood = mockInterviewChallenges.find((c) => c.company === "iFood");
    expect(ifood).toBeDefined();

    const fn = new Function(`
      ${ifood?.starterCode}
      return orderDispatchQueue;
    `)();

    const testCase = ifood?.testCases[0];
    const result = fn(...testCase!.input);
    expect(result).toEqual(["P3", "P2", "P4", "P1"]);
  });
});
