export interface UIChallenge {
  id: string;
  slug: string;
  title: string;
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  category: "Cards & Modais" | "Formulários" | "Navegação" | "Layouts";
  description: string;
  requirements: string[];
  starterHtml: string;
  starterCss: string;
  targetHtml: string;
  targetCss: string;
}

export const mockUIChallenges: UIChallenge[] = [
  {
    id: "ui-1",
    slug: "cartao-credito-glassmorphism",
    title: "Cartão de Crédito com Efeito Glassmorphism",
    difficulty: "Intermediário",
    category: "Cards & Modais",
    description: "Recrie um cartão de crédito moderno com fundo translúcido (backdrop-blur), bordas com gradiente suave e chip metálico central.",
    requirements: [
      "Fundo com efeito de vidro fosco (backdrop-blur)",
      "Borda com gradiente sutil branco e sombra difusa",
      "Número do cartão formatado em blocos de 4 dígitos",
      "Chip metálico estilizado e logotipo no canto superior"
    ],
    starterHtml: `<div class="card-container">
  <div class="card">
    <div class="card-header">
      <span class="bank-name">DEVQUEST BANK</span>
      <span class="chip"></span>
    </div>
    <div class="card-number">•••• •••• •••• 4289</div>
    <div class="card-footer">
      <div>
        <span class="label">TITULAR</span>
        <span class="name">HENRIQUE SILVA</span>
      </div>
      <div>
        <span class="label">VALIDADE</span>
        <span class="val">09/29</span>
      </div>
    </div>
  </div>
</div>`,
    starterCss: `body {
  background: #060913;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: sans-serif;
}

.card {
  width: 320px;
  height: 190px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 24px;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}`,
    targetHtml: `<div class="card-container">
  <div class="card">
    <div class="card-header">
      <span class="bank-name">DEVQUEST BANK</span>
      <div class="chip"></div>
    </div>
    <div class="card-number">5412 •••• •••• 4289</div>
    <div class="card-footer">
      <div>
        <div class="label">TITULAR</div>
        <div class="name">HENRIQUE SILVA</div>
      </div>
      <div>
        <div class="label">VALIDADE</div>
        <div class="val">09/29</div>
      </div>
    </div>
  </div>
</div>`,
    targetCss: `body {
  background: radial-gradient(circle at top left, #1e1b4b, #05070e);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.card {
  width: 340px;
  height: 205px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 24px;
  color: white;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bank-name {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #38bdf8;
}

.chip {
  width: 38px;
  height: 28px;
  background: linear-gradient(135deg, #fbbf24, #d97706);
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
}

.card-number {
  font-family: monospace;
  font-size: 18px;
  letter-spacing: 3px;
  color: #f8fafc;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.label {
  font-size: 9px;
  color: #94a3b8;
  letter-spacing: 1px;
}

.name, .val {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}`
  },
  {
    id: "ui-2",
    slug: "pricing-toggle-switcher",
    title: "Seletor de Planos & Switch Mensal/Anual",
    difficulty: "Iniciante",
    category: "Formulários",
    description: "Crie um alternador de cobrança (toggle switch) com badge de desconto e transição suave ao trocar de opção.",
    requirements: [
      "Toggle switch animado com transição CSS",
      "Pílula de badge 'Economize 20%' destacada em verde",
      "Layout flexível centralizado e responsivo"
    ],
    starterHtml: `<div class="pricing-toggle">
  <span class="active">Mensal</span>
  <label class="switch">
    <input type="checkbox" checked />
    <span class="slider"></span>
  </label>
  <span>Anual <span class="badge">-20%</span></span>
</div>`,
    starterCss: `body {
  background: #090d16;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: sans-serif;
  color: white;
}

.pricing-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}`,
    targetHtml: `<div class="pricing-toggle">
  <span class="label">Mensal</span>
  <label class="switch">
    <input type="checkbox" checked />
    <span class="slider"></span>
  </label>
  <span class="label">Anual <span class="badge">ECONOMIZE 20%</span></span>
</div>`,
    targetCss: `body {
  background: #070a13;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  font-family: -apple-system, sans-serif;
  color: #cbd5e1;
}

.pricing-toggle {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #0f172a;
  padding: 12px 24px;
  border-radius: 9999px;
  border: 1px solid #1e293b;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #334155;
  transition: .3s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #06b6d4;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

.badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.4);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  letter-spacing: 0.5px;
}`
  }
];
