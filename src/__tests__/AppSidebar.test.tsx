import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppSidebar } from "@/components/layout/AppSidebar";

describe("Componente AppSidebar", () => {
  it("não deve renderizar quando isOpen for false", () => {
    const { container } = render(<AppSidebar isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("deve renderizar todas as seções e links quando isOpen for true", () => {
    render(<AppSidebar isOpen={true} onClose={() => {}} />);

    expect(screen.getByText("DevQuest Hub")).toBeInTheDocument();
    expect(screen.getByText("Ambientes Interativos & Labs")).toBeInTheDocument();
    expect(screen.getByText("Docs & Apoio ao Dev")).toBeInTheDocument();
    expect(screen.getByText("Desafios & Carreiras")).toBeInTheDocument();

    // Verifica presença de atalhos chave
    expect(screen.getByText("AI Agents Lab")).toBeInTheDocument();
    expect(screen.getByText("Code Review IA (PR)")).toBeInTheDocument();
    expect(screen.getByText("Web Playground")).toBeInTheDocument();
  });

  it("deve chamar onClose ao clicar no botão de fechar", () => {
    const handleClose = vi.fn();
    render(<AppSidebar isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByTitle("Fechar menu (ESC)");
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("deve chamar onClose ao pressionar a tecla Escape", () => {
    const handleClose = vi.fn();
    render(<AppSidebar isOpen={true} onClose={handleClose} />);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
