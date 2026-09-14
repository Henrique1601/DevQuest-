import { describe, it, expect, beforeEach } from "vitest";
import {
  PLATFORM_THEMES,
  getPlatformTheme,
  applyThemeToDocument,
  PlatformThemeId,
} from "@/lib/theme/platformThemes";

describe("Theme Studio & Sistema Multi-Tema (Platform Themes)", () => {
  it("deve conter os 6 temas cyberpunk homologados", () => {
    expect(PLATFORM_THEMES).toHaveLength(6);
    const themeIds = PLATFORM_THEMES.map((t) => t.id);
    expect(themeIds).toContain("tokyo-night");
    expect(themeIds).toContain("matrix");
    expect(themeIds).toContain("cyberpunk");
    expect(themeIds).toContain("dracula");
    expect(themeIds).toContain("synthwave");
    expect(themeIds).toContain("nordic");
  });

  it("cada tema deve possuir paleta completa de cores, sombras e editor vinculado", () => {
    for (const theme of PLATFORM_THEMES) {
      expect(theme.id).toBeTruthy();
      expect(theme.name.length).toBeGreaterThan(3);
      expect(theme.tagline.length).toBeGreaterThan(5);
      expect(theme.badge).toBeTruthy();
      expect(theme.editorTheme).toBeTruthy();

      // Cores principais
      expect(theme.colors.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(theme.colors.accent).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(theme.colors.background).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(theme.colors.surface).toMatch(/^#[0-9A-Fa-f]{6}$/);

      // Sombras Glow
      expect(theme.colors.glowPrimary).toContain("rgba");
      expect(theme.colors.glowAccent).toContain("rgba");
    }
  });

  it("deve retornar o tema correto por ID ou o fallback Tokyo Night", () => {
    const matrix = getPlatformTheme("matrix");
    expect(matrix.name).toBe("Matrix Hacker");
    expect(matrix.colors.primary).toBe("#10B981");

    // Fallback para id inexistente
    const fallback = getPlatformTheme("tema-invalido" as PlatformThemeId);
    expect(fallback.id).toBe("tokyo-night");
  });

  it("deve aplicar variáveis CSS e atributo data-theme ao documento sem falhas", () => {
    const cyberpunk = getPlatformTheme("cyberpunk");
    applyThemeToDocument(cyberpunk);

    expect(document.documentElement.getAttribute("data-theme")).toBe("cyberpunk");
    expect(document.documentElement.style.getPropertyValue("--devquest-primary")).toBe(
      cyberpunk.colors.primary
    );
    expect(document.documentElement.style.getPropertyValue("--devquest-accent")).toBe(
      cyberpunk.colors.accent
    );
    expect(document.documentElement.style.getPropertyValue("--devquest-bg")).toBe(
      cyberpunk.colors.background
    );
  });
});
