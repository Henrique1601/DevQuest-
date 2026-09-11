import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { GET as badgeHandler } from "@/app/api/badge/[username]/route";
import { NextRequest } from "next/server";

describe("SEO, Sitemap & Robots", () => {
  it("deve gerar sitemap dinâmico contendo rotas estáticas, trilhas e projetos", () => {
    const map = sitemap();
    expect(map.length).toBeGreaterThanOrEqual(35);

    const urls = map.map((entry) => entry.url);
    expect(urls.some((u) => u.endsWith("/challenges"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/daily"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/code-review"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/ai-lab"))).toBe(true);
    expect(urls.some((u) => u.includes("/tracks/ia-e-agentes-autonomos"))).toBe(true);
    expect(urls.some((u) => u.includes("/projects/agente-pesquisa-rag"))).toBe(true);
  });

  it("deve gerar robots.txt permitindo indexação e apontando para o sitemap", () => {
    const rob = robots();
    expect(rob.rules).toBeDefined();
    expect(rob.sitemap).toContain("sitemap.xml");
  });
});

describe("GitHub Profile SVG Badge API", () => {
  it("deve gerar badge SVG vetorizado com métricas e headers de cache corretos", async () => {
    const req = new NextRequest("https://devquest-zeta.vercel.app/api/badge/henrique_dev");
    const params = Promise.resolve({ username: "henrique_dev" });

    const res = await badgeHandler(req, { params });
    expect(res.status).toBe(200);

    const contentType = res.headers.get("Content-Type");
    expect(contentType).toContain("image/svg+xml");

    const cacheControl = res.headers.get("Cache-Control");
    expect(cacheControl).toContain("public");

    const svgText = await res.text();
    expect(svgText).toContain("<svg");
    expect(svgText).toContain("DevQuest Pro");
    expect(svgText).toContain("@henrique_dev");
    expect(svgText).toContain("2.850"); // XP
    expect(svgText).toContain("Diamante"); // Liga
  });
});