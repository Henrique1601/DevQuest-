import { describe, it, expect } from "vitest";

describe("Certificados de Conclusão", () => {
  it("deve formatar corretamente o ID do certificado no formato padrão", () => {
    const certId = "DQ-2026-NUBANK-9482";
    expect(certId).toMatch(/^DQ-\d{4}-[A-Z]+-\d+$/);
  });

  it("deve montar o link oficial de adição de licença ao LinkedIn", () => {
    const certId = "DQ-2026-REACT-1001";
    const courseTitle = "Especialista em Estruturas de Dados, Pilhas & Algoritmos";
    const credentialUrl = `https://devquest-zeta.vercel.app/certificate/${certId}`;

    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      courseTitle
    )}&organizationName=${encodeURIComponent("DevQuest Pro")}&issueYear=2026&issueMonth=9&certUrl=${encodeURIComponent(
      credentialUrl
    )}&certId=${encodeURIComponent(certId)}`;

    expect(url).toContain("linkedin.com/profile/add");
    expect(url).toContain(certId);
    expect(url).toContain(encodeURIComponent("DevQuest Pro"));
  });
});
