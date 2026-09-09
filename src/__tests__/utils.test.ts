import { describe, it, expect } from "vitest";
import { cn, formatDifficulty } from "@/lib/utils";

describe("lib/utils", () => {
  it("deve concatenar e mesclar classes tailwind corretamente via cn()", () => {
    const result = cn("p-4 text-red-500", false && "hidden", "p-8 text-blue-500");
    expect(result).toContain("p-8");
    expect(result).toContain("text-blue-500");
    expect(result).not.toContain("p-4");
    expect(result).not.toContain("text-red-500");
  });

  it("deve retornar badges e cores corretas para cada nível de dificuldade", () => {
    const beg = formatDifficulty("beginner");
    expect(beg.label).toBe("Iniciante");
    expect(beg.color).toContain("emerald");

    const inter = formatDifficulty("intermediate");
    expect(inter.label).toBe("Intermediário");
    expect(inter.color).toContain("amber");

    const adv = formatDifficulty("advanced");
    expect(adv.label).toBe("Avançado");
    expect(adv.color).toContain("rose");
  });
});
