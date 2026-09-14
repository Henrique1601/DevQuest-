import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("PWA (Progressive Web App) & Offline Architecture", () => {
  it("deve conter um manifest.json válido e completo", () => {
    const manifestPath = path.join(process.cwd(), "public", "manifest.json");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const content = fs.readFileSync(manifestPath, "utf-8");
    const json = JSON.parse(content);

    expect(json.name).toBeDefined();
    expect(json.short_name).toBe("DevQuest Pro");
    expect(json.start_url).toBe("/");
    expect(json.display).toBe("standalone");
    expect(json.theme_color).toBe("#070A10");
    expect(Array.isArray(json.icons)).toBe(true);
    expect(json.icons.length).toBeGreaterThanOrEqual(2);
  });

  it("deve conter um sw.js com estratégias de cache resilientes", () => {
    const swPath = path.join(process.cwd(), "public", "sw.js");
    expect(fs.existsSync(swPath)).toBe(true);

    const content = fs.readFileSync(swPath, "utf-8");
    expect(content).toContain("addEventListener(\"install\"");
    expect(content).toContain("addEventListener(\"activate\"");
    expect(content).toContain("addEventListener(\"fetch\"");
    expect(content).toContain("caches.open");
    expect(content).toContain("navigate");
  });

  it("deve possuir ícones SVG nas dimensões 192 e 512", () => {
    const icon192 = path.join(process.cwd(), "public", "icons", "icon-192.svg");
    const icon512 = path.join(process.cwd(), "public", "icons", "icon-512.svg");
    expect(fs.existsSync(icon192)).toBe(true);
    expect(fs.existsSync(icon512)).toBe(true);
  });
});
