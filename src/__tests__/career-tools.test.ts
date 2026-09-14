import { describe, it, expect } from "vitest";
import { generateProjectReadme } from "@/components/projects/ProjectReadmeModal";
import { mockProjects } from "@/lib/data/projects";

describe("Career & Portfolio Tools", () => {
  const sampleProject = mockProjects[0]; // e.g. devquest-saas-dashboard or similar

  it("deve gerar um README.md completo com badges, features e passos de instalação", () => {
    const readme = generateProjectReadme(sampleProject, "Ana Silva", "anasilva");

    expect(readme).toContain(`# ${sampleProject.title}`);
    expect(readme).toContain("img.shields.io/badge");
    expect(readme).toContain("Como Executar o Projeto Localmente");
    expect(readme).toContain("git clone https://github.com/anasilva/");
    expect(readme).toContain("Funcionalidades Principais");
    expect(readme).toContain("Ana Silva");

    // Valida que as features do projeto foram incluídas como checklist
    sampleProject.features.forEach((feat) => {
      expect(readme).toContain(feat);
    });

    // Valida estrutura de diretórios e licença
    expect(readme).toContain("Licença");
    expect(readme).toContain("MIT");
  });

  it("deve usar valores padrão quando autor e github não são fornecidos", () => {
    const readme = generateProjectReadme(sampleProject, "", "");
    expect(readme).toContain("Seu Nome");
    expect(readme).toContain("seu-usuario");
  });
});
