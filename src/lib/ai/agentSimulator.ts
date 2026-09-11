export interface ToolParameter {
  type: "string" | "number" | "boolean" | "object" | "array";
  description: string;
  required?: boolean;
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, ToolParameter>;
  mockExecute: (args: Record<string, any>) => any;
}

export interface AgentStep {
  stepNumber: number;
  type: "thought" | "tool_call" | "observation" | "final_answer";
  content: string;
  toolName?: string;
  toolArgs?: Record<string, any>;
  toolResult?: any;
  timestamp: string;
}

export interface AgentMission {
  id: string;
  title: string;
  prompt: string;
  description: string;
  category: "financas" | "devops" | "pesquisa";
}

export const AGENT_TOOLS: AgentTool[] = [
  {
    name: "web_search",
    description: "Executa buscas no Google/Bing para coletar informações recentes e artigos técnicos.",
    parameters: {
      query: { type: "string", description: "Termos da busca em texto puro", required: true }
    },
    mockExecute: (args) => {
      const q = String(args.query || "").toLowerCase();
      if (q.includes("react 19")) {
        return {
          results: [
            { title: "React 19 Release Notes", snippet: "React Server Components, Actions, useActionState e useOptimistic são oficiais.", url: "https://react.dev/blog/2024/12/05/react-19" },
            { title: "What is New in React 19", snippet: "Fim do useMemo manual com o novo React Compiler (Forget).", url: "https://nextjs.org/blog" }
          ]
        };
      }
      return {
        results: [
          { title: `Resultados para: ${args.query}`, snippet: "Documentação oficial e referências técnicas encontradas no repositório.", url: "https://devquest.com.br" }
        ]
      };
    }
  },
  {
    name: "stock_market",
    description: "Consulta a cotação em tempo real de ativos negociados na B3 ou Nasdaq.",
    parameters: {
      symbol: { type: "string", description: "Código do ticker (ex: PETR4, VALE3, AAPL, NVDA)", required: true }
    },
    mockExecute: (args) => {
      const s = String(args.symbol || "").toUpperCase();
      const prices: Record<string, { price: number; currency: string; change: string }> = {
        PETR4: { price: 38.45, currency: "BRL", change: "+1.8%" },
        VALE3: { price: 61.20, currency: "BRL", change: "-0.4%" },
        AAPL: { price: 232.10, currency: "USD", change: "+0.9%" },
        NVDA: { price: 128.50, currency: "USD", change: "+3.2%" }
      };
      return prices[s] || { price: 50.00, currency: "BRL", change: "0.0%" };
    }
  },
  {
    name: "currency_converter",
    description: "Converte valores monetários entre moedas com taxas de câmbio atualizadas.",
    parameters: {
      amount: { type: "number", description: "Quantia monetária a converter", required: true },
      from: { type: "string", description: "Moeda de origem (ex: BRL, USD, EUR)", required: true },
      to: { type: "string", description: "Moeda de destino (ex: USD, BRL, EUR)", required: true }
    },
    mockExecute: (args) => {
      const { amount, from, to } = args;
      const ratesToUSD: Record<string, number> = { BRL: 0.18, USD: 1.0, EUR: 1.08 };
      const valInUSD = Number(amount) * (ratesToUSD[from] || 1);
      const finalVal = valInUSD / (ratesToUSD[to] || 1);
      return {
        originalAmount: amount,
        from,
        to,
        convertedAmount: Number(finalVal.toFixed(2)),
        exchangeRate: Number(((ratesToUSD[from] || 1) / (ratesToUSD[to] || 1)).toFixed(4))
      };
    }
  },
  {
    name: "database_sql",
    description: "Executa consultas analíticas somente-leitura no PostgreSQL Neon da aplicação.",
    parameters: {
      query: { type: "string", description: "Instrução SQL SELECT estruturada", required: true }
    },
    mockExecute: (args) => {
      const q = String(args.query || "").toLowerCase();
      if (q.includes("orders") || q.includes("pedidos")) {
        return {
          rows: [
            { id: "ord-881", user_id: "usr_henrique", total: 289.90, status: "pending_payment", created_at: "2026-09-10 18:20" },
            { id: "ord-882", user_id: "usr_carla", total: 450.00, status: "completed", created_at: "2026-09-10 19:10" }
          ],
          rowCount: 2
        };
      }
      return {
        rows: [{ id: "usr_henrique", name: "Henrique Silva", email: "henrique@devquest.com.br", plan: "pro" }],
        rowCount: 1
      };
    }
  },
  {
    name: "send_notification",
    description: "Dispara alertas ou e-mails transacionais para destinatários específicos.",
    parameters: {
      channel: { type: "string", description: "Canal de envio: 'email', 'slack' ou 'discord'", required: true },
      recipient: { type: "string", description: "Destinatário (e-mail ou webhook)", required: true },
      message: { type: "string", description: "Corpo do texto da notificação", required: true }
    },
    mockExecute: (args) => {
      return {
        status: "delivered",
        messageId: `msg_${Math.random().toString(36).substring(2, 9)}`,
        channel: args.channel,
        sentAt: new Date().toISOString()
      };
    }
  }
];

export const AGENT_MISSIONS: AgentMission[] = [
  {
    id: "mission-finance",
    title: "Cotação & Conversão Cambial Inteligente",
    description: "Consultar o preço da ação PETR4 na B3 e converter o valor total de 100 ações para Dólares (USD).",
    prompt: "Consulte a cotação atual das ações da PETR4, calcule quanto valem 100 ações e converta esse montante total para USD.",
    category: "financas"
  },
  {
    id: "mission-ops",
    title: "Auditoria de Pedidos & Notificação de Cobrança",
    description: "Verificar pedidos pendentes no banco Neon e disparar notificação com o ID e valor.",
    prompt: "Consulte os pedidos com status 'pending_payment' no banco de dados e envie um email para henrique@devquest.com.br avisando sobre o pedido em aberto.",
    category: "devops"
  },
  {
    id: "mission-research",
    title: "Pesquisa Técnica sobre Novidades do React 19",
    description: "Fazer busca online sobre o React 19 e sintetizar os 3 principais pontos de evolução.",
    prompt: "Pesquise na web quais são as principais funcionalidades lançadas no React 19 e resuma em tópicos para a equipe técnica.",
    category: "pesquisa"
  }
];

export function simulateAgentExecution(prompt: string): AgentStep[] {
  const p = prompt.toLowerCase();
  const steps: AgentStep[] = [];
  const now = () => new Date().toLocaleTimeString();

  if (p.includes("petr4") || p.includes("cotação") || p.includes("dólar") || p.includes("usd")) {
    steps.push({
      stepNumber: 1,
      type: "thought",
      content: "O usuário deseja saber o valor de 100 ações da PETR4 convertido para Dólar (USD). Primeiro, preciso chamar a ferramenta 'stock_market' para obter a cotação de PETR4.",
      timestamp: now()
    });

    const stockTool = AGENT_TOOLS.find(t => t.name === "stock_market")!;
    const stockResult = stockTool.mockExecute({ symbol: "PETR4" });

    steps.push({
      stepNumber: 2,
      type: "tool_call",
      content: "Invocando ferramenta de mercado financeiro.",
      toolName: "stock_market",
      toolArgs: { symbol: "PETR4" },
      timestamp: now()
    });

    steps.push({
      stepNumber: 3,
      type: "observation",
      content: "Retorno da ferramenta de cotação.",
      toolResult: stockResult,
      timestamp: now()
    });

    const totalBRL = stockResult.price * 100;

    steps.push({
      stepNumber: 4,
      type: "thought",
      content: `A cotação de PETR4 é R$ ${stockResult.price}. Para 100 ações, o total é R$ ${totalBRL.toFixed(2)}. Agora preciso invocar 'currency_converter' para converter R$ ${totalBRL.toFixed(2)} de BRL para USD.`,
      timestamp: now()
    });

    const convTool = AGENT_TOOLS.find(t => t.name === "currency_converter")!;
    const convResult = convTool.mockExecute({ amount: totalBRL, from: "BRL", to: "USD" });

    steps.push({
      stepNumber: 5,
      type: "tool_call",
      content: "Invocando conversor de moedas.",
      toolName: "currency_converter",
      toolArgs: { amount: totalBRL, from: "BRL", to: "USD" },
      timestamp: now()
    });

    steps.push({
      stepNumber: 6,
      type: "observation",
      content: "Retorno da conversão cambial.",
      toolResult: convResult,
      timestamp: now()
    });

    steps.push({
      stepNumber: 7,
      type: "final_answer",
      content: `📊 **Relatório Consolidado pelo OmniAgent**:
- **Ativo**: PETR4 (Petróleo Brasileiro S.A.)
- **Cotação Unitária**: R$ ${stockResult.price} (${stockResult.change})
- **Montante (100 ações)**: R$ ${totalBRL.toFixed(2)}
- **Valor Convertido**: **US$ ${convResult.convertedAmount}** (Taxa de câmbio: ${convResult.exchangeRate}).

Missão concluída com 2 ferramentas invocadas com sucesso e zero intervenção humana!`,
      timestamp: now()
    });

    return steps;
  }

  if (p.includes("pedido") || p.includes("email") || p.includes("banco") || p.includes("notifica")) {
    steps.push({
      stepNumber: 1,
      type: "thought",
      content: "A meta envolve auditar pedidos pendentes no banco e notificar o usuário. Devo primeiro consultar a tabela 'orders' com 'database_sql'.",
      timestamp: now()
    });

    const dbTool = AGENT_TOOLS.find(t => t.name === "database_sql")!;
    const dbResult = dbTool.mockExecute({ query: "SELECT * FROM orders WHERE status = 'pending_payment'" });

    steps.push({
      stepNumber: 2,
      type: "tool_call",
      content: "Executando consulta SQL no Neon Postgres.",
      toolName: "database_sql",
      toolArgs: { query: "SELECT * FROM orders WHERE status = 'pending_payment'" },
      timestamp: now()
    });

    steps.push({
      stepNumber: 3,
      type: "observation",
      content: "Registros retornados pelo banco de dados.",
      toolResult: dbResult,
      timestamp: now()
    });

    const pendingOrder = dbResult.rows[0];

    steps.push({
      stepNumber: 4,
      type: "thought",
      content: `Encontrei o pedido ${pendingOrder.id} com valor de R$ ${pendingOrder.total} pendente. Agora vou disparar a ferramenta 'send_notification' para o e-mail solicitado.`,
      timestamp: now()
    });

    const notifyTool = AGENT_TOOLS.find(t => t.name === "send_notification")!;
    const notifyResult = notifyTool.mockExecute({
      channel: "email",
      recipient: "henrique@devquest.com.br",
      message: `Aviso: Seu pedido ${pendingOrder.id} no valor de R$ ${pendingOrder.total} está aguardando pagamento.`
    });

    steps.push({
      stepNumber: 5,
      type: "tool_call",
      content: "Disparando notificação transacional por e-mail.",
      toolName: "send_notification",
      toolArgs: {
        channel: "email",
        recipient: "henrique@devquest.com.br",
        message: `Aviso: Pedido ${pendingOrder.id} de R$ ${pendingOrder.total}`
      },
      timestamp: now()
    });

    steps.push({
      stepNumber: 6,
      type: "observation",
      content: "Confirmação de entrega do e-mail.",
      toolResult: notifyResult,
      timestamp: now()
    });

    steps.push({
      stepNumber: 7,
      type: "final_answer",
      content: `✅ **Auditoria e Ação Concluídas**:
- **Pedido Localizado**: #${pendingOrder.id}
- **Valor**: R$ ${pendingOrder.total} (${pendingOrder.status})
- **Notificação**: E-mail disparado para 'henrique@devquest.com.br' (ID: ${notifyResult.messageId}).`,
      timestamp: now()
    });

    return steps;
  }

  // Genérico / Pesquisa
  steps.push({
    stepNumber: 1,
    type: "thought",
    content: `Para atender à solicitação "${prompt}", vou realizar uma busca semântica na web com 'web_search'.`,
    timestamp: now()
  });

  const searchTool = AGENT_TOOLS.find(t => t.name === "web_search")!;
  const searchResult = searchTool.mockExecute({ query: prompt });

  steps.push({
    stepNumber: 2,
    type: "tool_call",
    content: "Realizando pesquisa na web.",
    toolName: "web_search",
    toolArgs: { query: prompt },
    timestamp: now()
  });

  steps.push({
    stepNumber: 3,
    type: "observation",
    content: "Resultados obtidos via Web Search.",
    toolResult: searchResult,
    timestamp: now()
  });

  steps.push({
    stepNumber: 4,
    type: "final_answer",
    content: `🔍 **Síntese da Pesquisa pelo Agente**:
Com base nos dados coletados:
1. **React Server Components**: Renderização e streaming seguro no servidor.
2. **Server Actions & useActionState**: Tratamento de formulários sem boilerplate de fetch.
3. **React Compiler**: Otimização automática de dependências e re-renders.`,
    timestamp: now()
  });

  return steps;
}