import { test, expect } from "@playwright/test";

test.describe("Página Inicial - DevQuest", () => {
  test("deve carregar os elementos principais do Hero e da Navbar", async ({ page }) => {
    await page.goto("/");

    // Verifica Logo
    await expect(page.locator("text=DevQuest").first()).toBeVisible();

    // Verifica Título do Hero
    await expect(page.locator("h1")).toContainText("Aprenda Programação");

    // Verifica botões principais
    await expect(page.locator("text=Ir para a Arena de Desafios")).toBeVisible();
    await expect(page.locator("text=Ver Catálogo de Projetos")).toBeVisible();
  });

  test("deve filtrar projetos por dificuldade", async ({ page }) => {
    await page.goto("/");

    // Clica no filtro Iniciante
    await page.click("button:has-text('Iniciante')");

    // Verifica que o card de calculadora está presente
    await expect(page.locator("text=Calculadora Interativa & Histórico")).toBeVisible();
  });

  test("deve executar o desafio demo na Home e validar retorno", async ({ page }) => {
    await page.goto("/");

    // Clica em 'Testar Código'
    await page.click("button:has-text('Testar Código')");

    // Valida mensagem de sucesso
    await expect(page.locator("text=Parabéns! Todos os testes passaram")).toBeVisible();
  });
});
