import { describe, it, expect } from "vitest";
import { AGENT_TOOLS, AGENT_MISSIONS, simulateAgentExecution } from "@/lib/ai/agentSimulator";

describe("Laboratório de Agentes de IA & Ciclo ReAct", () => {
  it("deve carregar ferramentas com schemas válidos e métodos de execução", () => {
    expect(AGENT_TOOLS.length).toBeGreaterThanOrEqual(4);
    const searchTool = AGENT_TOOLS.find((t) => t.name === "web_search");
    expect(searchTool).toBeDefined();
    expect(searchTool?.parameters.query.required).toBe(true);
  });

  it("deve conter missões pré-configuradas com categorias válidas", () => {
    expect(AGENT_MISSIONS.length).toBeGreaterThanOrEqual(3);
    const financeMission = AGENT_MISSIONS.find((m) => m.id === "mission-finance");
    expect(financeMission).toBeDefined();
    expect(financeMission?.category).toBe("financas");
  });

  it("deve simular ciclo ReAct completo para cotação e conversão cambial", () => {
    const steps = simulateAgentExecution("Consulte a cotação de PETR4 e converta para USD");
    expect(steps.length).toBeGreaterThanOrEqual(5);

    const types = steps.map((s) => s.type);
    expect(types).toContain("thought");
    expect(types).toContain("tool_call");
    expect(types).toContain("observation");
    expect(types).toContain("final_answer");

    const stockCall = steps.find((s) => s.type === "tool_call" && s.toolName === "stock_market");
    expect(stockCall).toBeDefined();

    const convCall = steps.find((s) => s.type === "tool_call" && s.toolName === "currency_converter");
    expect(convCall).toBeDefined();
  });

  it("deve simular ciclo ReAct para auditoria de pedidos e notificação", () => {
    const steps = simulateAgentExecution("Audite pedidos pendentes no banco e envie email");
    expect(steps.length).toBeGreaterThanOrEqual(5);

    const dbCall = steps.find((s) => s.type === "tool_call" && s.toolName === "database_sql");
    expect(dbCall).toBeDefined();

    const notifyCall = steps.find((s) => s.type === "tool_call" && s.toolName === "send_notification");
    expect(notifyCall).toBeDefined();
  });
});