import { test, expect } from "@playwright/test";

test.describe("Arena de Desafios - DevQuest", () => {
  test("deve carregar o Workspace com editor de código e enunciado", async ({ page }) => {
    await page.goto("/challenges");

    // Verifica Título do Desafio
    await expect(page.locator("h2")).toContainText("Inverter uma String");

    // Verifica presença do botão Executar e Testar
    const runButton = page.locator("button:has-text('Executar e Testar')");
    await expect(runButton).toBeVisible();

    // Executa o desafio
    await runButton.click();

    // Verifica que executou os testes
    await expect(page.locator("text=Testes Unitários")).toBeVisible();
  });

  test("deve alternar entre abas de Instruções e Dicas", async ({ page }) => {
    await page.goto("/challenges");

    // Clica na aba Dicas
    await page.click("button:has-text('Dicas')");

    // Verifica que o conteúdo de dicas apareceu
    await expect(page.locator("text=Dica #1")).toBeVisible();
  });
});
