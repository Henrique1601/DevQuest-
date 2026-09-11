import { test, expect } from "@playwright/test";

test.describe("API de Badges SVG para Perfil GitHub", () => {
  test("deve retornar o badge SVG gerado dinamicamente com métricas e headers corretos", async ({ request }) => {
    const response = await request.get("/api/badge/henrique_dev");

    expect(response.status()).toBe(200);

    const contentType = response.headers()["content-type"];
    expect(contentType).toContain("image/svg+xml");

    const cacheControl = response.headers()["cache-control"];
    expect(cacheControl).toContain("public");

    const svgBody = await response.text();
    expect(svgBody).toContain("<svg");
    expect(svgBody).toContain("DevQuest Pro");
    expect(svgBody).toContain("@henrique_dev");
    expect(svgBody).toContain("PONTUAÇÃO");
    expect(svgBody).toContain("Diamante");
  });

  test("deve responder adequadamente para qualquer usuário conectado ao Neon ou com fallback", async ({ request }) => {
    const response = await request.get("/api/badge/Bezerra");

    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/svg+xml");

    const svgBody = await response.text();
    expect(svgBody).toContain("<svg");
    expect(svgBody).toContain("@Bezerra");
  });
});

test.describe("Arena de Desafios - Docs & Links Técnicos", () => {
  test("deve exibir a aba 'Docs & Links' com referências e links seguros", async ({ page }) => {
    await page.goto("/challenges");

    // Localiza e clica no botão da aba 'Docs & Links'
    const docsTab = page.locator("button:has-text('Docs & Links')");
    await expect(docsTab).toBeVisible();
    await docsTab.click();

    // Valida título da seção
    await expect(page.locator("text=Documentação & Links Recomendados")).toBeVisible();

    // Valida que existem links de documentação com atributo target='_blank'
    const docLinks = page.locator("a[target='_blank']");
    const count = await docLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Leaderboard Global e Ligas de XP", () => {
  test("deve renderizar o ranking de desenvolvedores e permitir filtrar por liga", async ({ page }) => {
    await page.goto("/leaderboard");

    // Verifica Título do Ranking
    await expect(page.locator("text=Ranking Global & Ligas de XP")).toBeVisible();

    // Verifica que os cards de ligas e top 3 estão visíveis
    await expect(page.locator("text=Temporada 2026.1")).toBeVisible();

    // Filtra pela Liga Diamante
    const diamanteFilter = page.locator("button:has-text('Diamante')").first();
    await expect(diamanteFilter).toBeVisible();
    await diamanteFilter.click();

    // Verifica presença de usuário da Liga Diamante
    await expect(page.locator("text=Ana Vasconcelos").first()).toBeVisible();
  });
});

test.describe("Daily Quest & Streak Diário", () => {
  test("deve exibir o desafio do dia, heatmap e contador de reset", async ({ page }) => {
    await page.goto("/daily");

    // Verifica elementos do Header
    await expect(page.locator("text=Desafio do Dia & Ofensiva")).toBeVisible();
    await expect(page.locator("text=Daily Quest Oficial")).toBeVisible();
    await expect(page.locator("text=2x XP Bônus")).toBeVisible();

    // Verifica botão de execução dos testes e clica
    const testButton = page.locator("button:has-text('Executar & Manter Streak')");
    await expect(testButton).toBeVisible();
    await testButton.click();

    // Verifica que o painel de resultados de validação é exibido
    await expect(page.locator("text=Missão Concluída").first()).toBeVisible();
  });
});

test.describe("Code Review com IA (Pull Request)", () => {
  test("deve exibir interface de review, veredito e permitir alternar cenários", async ({ page }) => {
    await page.goto("/code-review");

    // Verifica Header
    await expect(page.locator("text=Code Review IA (Estilo Pull Request)")).toBeVisible();

    // Verifica Veredito de PR inicial (SQL Injection com Changes Requested)
    await expect(page.locator("text=Changes Requested")).toBeVisible();

    // Alterna para o cenário de Memory Leak / useEffect
    const leakScenario = page.locator("button:has-text('Memory Leak')");
    if (await leakScenario.isVisible()) {
      await leakScenario.click();
      // O veredito deve continuar ativo
      await expect(page.locator("text=Changes Requested").or(page.locator("text=Review com Observações"))).toBeVisible();
    }
  });
});
