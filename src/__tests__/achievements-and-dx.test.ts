import { describe, it, expect, beforeEach } from "vitest";
import { mockAchievements } from "@/lib/data/achievements";
import { EDITOR_THEMES, getCodeMirrorThemeExtension } from "@/lib/theme/editorThemes";
import { sfx } from "@/lib/audio/sfx";

describe("Módulo de Conquistas & Gamificação (Achievements)", () => {
  it("deve conter 8 conquistas predefinidas com estrutura válida", () => {
    expect(mockAchievements).toHaveLength(8);
    
    const validCategories = ["desafios", "streak", "projetos", "seguranca", "ranking"];
    const slugs = new Set<string>();

    for (const ach of mockAchievements) {
      expect(ach.id).toBeTruthy();
      expect(ach.slug).toBeTruthy();
      expect(ach.title.length).toBeGreaterThan(3);
      expect(ach.description.length).toBeGreaterThan(10);
      expect(ach.icon).toBeTruthy();
      expect(validCategories).toContain(ach.category);
      expect(ach.xpReward).toBeGreaterThanOrEqual(100);

      expect(slugs.has(ach.slug)).toBe(false);
      slugs.add(ach.slug);
    }
  });
});

describe("Módulo de Temas do CodeMirror (Editor Themes)", () => {
  it("deve disponibilizar 5 temas distintos para a Arena", () => {
    expect(EDITOR_THEMES).toHaveLength(5);
    const themeIds = EDITOR_THEMES.map((t) => t.id);
    expect(themeIds).toContain("tokyo-night");
    expect(themeIds).toContain("dracula");
    expect(themeIds).toContain("monokai-pro");
    expect(themeIds).toContain("github-dark");
    expect(themeIds).toContain("synthwave-84");
  });

  it("deve retornar uma extensão válida do tema", () => {
    const ext = getCodeMirrorThemeExtension("tokyo-night");
    expect(ext).toBeDefined();

    const draculaExt = getCodeMirrorThemeExtension("dracula");
    expect(draculaExt).toBeDefined();
  });
});

describe("Módulo de Áudio & Sound Effects (SFX)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve iniciar não mutado por padrão e permitir alternar estado de mudo", () => {
    expect(sfx.isMuted()).toBe(false);

    const mutedState = sfx.toggleMute();
    expect(mutedState).toBe(true);
    expect(sfx.isMuted()).toBe(true);
    expect(localStorage.getItem("devquest_sfx_muted")).toBe("true");

    const unmutedState = sfx.toggleMute();
    expect(unmutedState).toBe(false);
    expect(sfx.isMuted()).toBe(false);
    expect(localStorage.getItem("devquest_sfx_muted")).toBe("false");
  });

  it("não deve lançar exceção ao chamar métodos de reprodução em ambiente de teste", () => {
    expect(() => sfx.playSuccessChime()).not.toThrow();
    expect(() => sfx.playErrorTone()).not.toThrow();
    expect(() => sfx.playStreakFlame()).not.toThrow();
    expect(() => sfx.playClickSfx()).not.toThrow();
  });
});
