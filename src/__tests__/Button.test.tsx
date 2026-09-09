import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Componente Button", () => {
  it("deve renderizar o texto do botão corretamente", () => {
    render(<Button>Clique Aqui</Button>);
    expect(screen.getByText("Clique Aqui")).toBeInTheDocument();
  });

  it("deve disparar evento de clique", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);

    fireEvent.click(screen.getByText("Enviar"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("deve respeitar a prop disabled", () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Desabilitado</Button>);

    const btn = screen.getByText("Desabilitado");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
