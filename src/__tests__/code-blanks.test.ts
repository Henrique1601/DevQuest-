import { describe, it, expect } from "vitest";
import { mockCodeBlanks } from "@/lib/data/codeBlanks";

describe("Desafios de Preenchimento de Lacunas (Code Blanks)", () => {
  it("deve carregar todos os desafios de lacunas com estrutura válida", () => {
    expect(mockCodeBlanks.length).toBeGreaterThanOrEqual(10);

    const ids = new Set<string>();
    const slugs = new Set<string>();

    for (const challenge of mockCodeBlanks) {
      // IDs e Slugs únicos
      expect(ids.has(challenge.id)).toBe(false);
      ids.add(challenge.id);

      expect(slugs.has(challenge.slug)).toBe(false);
      slugs.add(challenge.slug);

      // Campos obrigatórios
      expect(challenge.title.length).toBeGreaterThan(3);
      expect(challenge.description.length).toBeGreaterThan(10);
      expect(challenge.xp).toBeGreaterThan(0);
      expect(challenge.codeTemplate).toContain("{{BLANK_");
      expect(challenge.blanks.length).toBeGreaterThan(0);
      expect(challenge.explanation.length).toBeGreaterThan(15);

      // Validação das lacunas
      for (const blank of challenge.blanks) {
        expect(challenge.codeTemplate).toContain(`{{${blank.id}}}`);
        expect(blank.acceptedAnswers.length).toBeGreaterThan(0);
        expect(blank.options.length).toBeGreaterThanOrEqual(2);
        // Pelo menos uma opção deve ser a resposta correta
        const hasCorrectInOptions = blank.options.some((opt) =>
          blank.acceptedAnswers.some((acc) => acc.toLowerCase() === opt.toLowerCase())
        );
        expect(hasCorrectInOptions).toBe(true);
        expect(blank.hint.length).toBeGreaterThan(5);
      }
    }
  });

  it("deve executar com sucesso todos os desafios com as respostas aceitas oficiais", async () => {
    for (const challenge of mockCodeBlanks) {
      let filledCode = challenge.codeTemplate;
      for (const blank of challenge.blanks) {
        // Preenche com a primeira resposta aceita
        filledCode = filledCode.replace(`{{${blank.id}}}`, blank.acceptedAnswers[0]);
      }

      const runner = new Function(`return (async function() {\n${filledCode}\n})();`);
      const output = await runner();

      expect(JSON.stringify(output)).toBe(JSON.stringify(challenge.expectedOutput));
    }
  });
});
