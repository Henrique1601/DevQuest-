import { describe, it, expect } from "vitest";
import { mockCheatCategories } from "@/lib/data/cheatsheets";
import { mockDebugIssues } from "@/lib/data/debugClinic";
import { mockVideos } from "@/lib/data/videos";
import { mockSnippets, isValidCPF, maskCPF, slugify, formatBRL } from "@/lib/data/snippets";
import { mockDailyTips } from "@/lib/data/dailyTips";

describe("DevDocs & CheatSheets Interativos (W3Schools Style)", () => {
  it("deve carregar cheatsheets para todas as categorias principais", () => {
    expect(mockCheatCategories.length).toBeGreaterThanOrEqual(5);

    const badges = mockCheatCategories.map((c) => c.badge.toLowerCase());
    expect(badges.some((b) => b.includes("javascript"))).toBe(true);
    expect(badges.some((b) => b.includes("css"))).toBe(true);
    expect(badges.some((b) => b.includes("sql"))).toBe(true);
    expect(badges.some((b) => b.includes("git"))).toBe(true);
    expect(badges.some((b) => b.includes("http"))).toBe(true);
  });

  it("cada cheatsheet deve conter itens com sintaxe, descrição e exemplo prático", () => {
    mockCheatCategories.forEach((sheet) => {
      expect(sheet.id).toBeTruthy();
      expect(sheet.title).toBeTruthy();
      expect(sheet.items.length).toBeGreaterThan(0);

      sheet.items.forEach((item) => {
        expect(item.name).toBeTruthy();
        expect(item.syntax).toBeTruthy();
        expect(item.description).toBeTruthy();
        expect(item.example).toBeTruthy();
      });
    });
  });
});

describe("Debug Clinic (Stack Overflow Style)", () => {
  it("deve conter casos de erro clássicos com diagnóstico e comparativo antes/depois", () => {
    expect(mockDebugIssues.length).toBeGreaterThanOrEqual(6);

    mockDebugIssues.forEach((bug) => {
      expect(bug.id).toBeTruthy();
      expect(bug.title).toBeTruthy();
      expect(bug.symptom).toBeTruthy();
      expect(bug.diagnosis).toBeTruthy();
      expect(bug.brokenCode).toBeTruthy();
      expect(bug.fixedCode).toBeTruthy();
      expect(bug.brokenCode).not.toEqual(bug.fixedCode);
      expect(bug.bestPracticeTip).toBeTruthy();
    });
  });

  it("deve cobrir categorias de React, Node, Git, SQL e TypeScript", () => {
    const techs = new Set(mockDebugIssues.map((b) => b.technology));
    expect(techs.has("React")).toBe(true);
    expect(techs.has("Git")).toBe(true);
    expect(techs.has("TypeScript")).toBe(true);
    expect(techs.has("Node.js") || techs.has("JavaScript")).toBe(true);
  });
});

describe("Video Hub & Aulas Integradas (YouTube Style)", () => {
  it("deve conter lista de vídeos com metadados e capítulos ordenados", () => {
    expect(mockVideos.length).toBeGreaterThanOrEqual(5);

    mockVideos.forEach((video) => {
      expect(video.id).toBeTruthy();
      expect(video.youtubeId).toBeTruthy();
      expect(video.title).toBeTruthy();
      expect(video.channelName).toBeTruthy();
      expect(video.chapters.length).toBeGreaterThanOrEqual(2);

      // Checa se os segundos dos capítulos estão em ordem crescente
      for (let i = 1; i < video.chapters.length; i++) {
        expect(video.chapters[i].seconds).toBeGreaterThanOrEqual(video.chapters[i - 1].seconds);
      }
    });
  });
});

describe("Snippet Vault de Produção", () => {
  it("deve conter snippets em categorias chave com código e exemplo de uso", () => {
    expect(mockSnippets.length).toBeGreaterThanOrEqual(6);

    mockSnippets.forEach((snippet) => {
      expect(snippet.id).toBeTruthy();
      expect(snippet.title).toBeTruthy();
      expect(snippet.code.length).toBeGreaterThan(20);
      expect(snippet.usage.length).toBeGreaterThan(10);
      expect(snippet.tags.length).toBeGreaterThan(0);
    });
  });

  it("deve validar CPF corretamente", () => {
    // CPFs com todos os dígitos iguais são inválidos
    expect(isValidCPF("111.111.111-11")).toBe(false);
    expect(isValidCPF("00000000000")).toBe(false);
    expect(isValidCPF("123")).toBe(false);

    // Formatação e máscara
    expect(maskCPF("12345678901")).toBe("123.456.789-01");
  });

  it("deve gerar slugs em português removendo acentos e caracteres especiais", () => {
    const slug = slugify("Aprenda React 19 & Next.js: Do Básico ao Avançado!");
    expect(slug).toBe("aprenda-react-19-nextjs-do-basico-ao-avancado");
  });

  it("deve formatar moeda BRL corretamente", () => {
    const formatted = formatBRL(1500);
    expect(formatted).toContain("1.500");

    const fromCents = formatBRL(2990, true);
    expect(fromCents).toContain("29,90");
  });
});

describe("Dicas do Dia (Daily Dev Tips)", () => {
  it("deve conter dicas variadas com atalhos de VS Code ou exemplos de código", () => {
    expect(mockDailyTips.length).toBeGreaterThanOrEqual(8);

    mockDailyTips.forEach((tip) => {
      expect(tip.id).toBeTruthy();
      expect(tip.title).toBeTruthy();
      expect(tip.summary).toBeTruthy();
      const hasContent = Boolean(tip.shortcut || tip.codeSnippet);
      expect(hasContent).toBe(true);
    });
  });
});
