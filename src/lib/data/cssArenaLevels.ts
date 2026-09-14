export interface CssArenaTarget {
  id: number;
  label?: string;
  color: string;
  style?: React.CSSProperties;
}

export interface CssArenaDrone {
  id: number;
  name: string;
  color: string;
  style?: React.CSSProperties;
}

export interface CssArenaLevel {
  id: number;
  title: string;
  category: "flexbox" | "grid";
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  mission: string;
  instructions: string;
  cheatsheet: { prop: string; desc: string }[];
  containerFixedStyle: React.CSSProperties;
  startingCode: string;
  solution: string;
  drones: CssArenaDrone[];
  targets: CssArenaTarget[];
  targetContainerStyle: React.CSSProperties;
  tip: string;
}

export const CSS_ARENA_LEVELS: CssArenaLevel[] = [
  // --- FASE 1: FLEXBOX BASICS (1 a 7) ---
  {
    id: 1,
    title: "1. Propulsão ao Fim da Linha",
    category: "flexbox",
    difficulty: "Iniciante",
    mission: "Conduza o drone de reconhecimento até a base de recarga no canto direito da plataforma.",
    instructions: "Utilize a propriedade `justify-content` para alinhar os elementos ao longo do eixo principal (horizontal).",
    cheatsheet: [
      { prop: "justify-content: flex-start", desc: "Itens alinhados no início do container (padrão)." },
      { prop: "justify-content: flex-end", desc: "Itens alinhados no final do container." },
      { prop: "justify-content: center", desc: "Itens centralizados no container." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "justify-content: flex-start;",
    solution: "justify-content: flex-end;",
    drones: [{ id: 1, name: "Drone Alfa", color: "#06B6D4" }],
    targets: [{ id: 1, label: "Base Alfa", color: "#06B6D4" }],
    targetContainerStyle: { display: "flex", justifyContent: "flex-end" },
    tip: "Experimente digitar 'justify-content: flex-end;' para mover o drone até o portal!",
  },
  {
    id: 2,
    title: "2. Centralização Orbital",
    category: "flexbox",
    difficulty: "Iniciante",
    mission: "Posicione os dois drones auxiliares exatamente no centro horizontal da câmara de descompressão.",
    instructions: "Alinhe os drones no centro do eixo principal com `justify-content`.",
    cheatsheet: [
      { prop: "justify-content: center", desc: "Centraliza todos os itens no eixo principal." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "justify-content: flex-start;",
    solution: "justify-content: center;",
    drones: [
      { id: 1, name: "Drone 1", color: "#06B6D4" },
      { id: 2, name: "Drone 2", color: "#8B5CF6" },
    ],
    targets: [
      { id: 1, label: "Base 1", color: "#06B6D4" },
      { id: 2, label: "Base 2", color: "#8B5CF6" },
    ],
    targetContainerStyle: { display: "flex", justifyContent: "center" },
    tip: "Use 'justify-content: center;' para concentrar os dois drones no centro.",
  },
  {
    id: 3,
    title: "3. Distribuição Simétrica de Energia",
    category: "flexbox",
    difficulty: "Iniciante",
    mission: "Distribua os três drones com espaçamento uniforme ao redor de cada um.",
    instructions: "A propriedade `space-around` deixa espaçamento igual em volta de cada item (o espaço nas pontas é metade do espaço entre eles).",
    cheatsheet: [
      { prop: "justify-content: space-around", desc: "Espaçamento proporcional em volta de cada item." },
      { prop: "justify-content: space-between", desc: "Primeiro e último colados nas pontas." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "justify-content: flex-start;",
    solution: "justify-content: space-around;",
    drones: [
      { id: 1, name: "Drone 1", color: "#06B6D4" },
      { id: 2, name: "Drone 2", color: "#10B981" },
      { id: 3, name: "Drone 3", color: "#8B5CF6" },
    ],
    targets: [
      { id: 1, label: "Base 1", color: "#06B6D4" },
      { id: 2, label: "Base 2", color: "#10B981" },
      { id: 3, label: "Base 3", color: "#8B5CF6" },
    ],
    targetContainerStyle: { display: "flex", justifyContent: "space-around" },
    tip: "Use 'justify-content: space-around;' para distribuir proporcionalmente.",
  },
  {
    id: 4,
    title: "4. Estabilizadores nas Extremidades",
    category: "flexbox",
    difficulty: "Iniciante",
    mission: "Fixe os drones nas extremidades opostas da arena para calibrar os campos de força magnéticos.",
    instructions: "Com `space-between`, o primeiro drone fica colado na borda inicial e o último na borda final.",
    cheatsheet: [
      { prop: "justify-content: space-between", desc: "Itens separados pelo espaço máximo possível." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "justify-content: flex-start;",
    solution: "justify-content: space-between;",
    drones: [
      { id: 1, name: "Nave Sol", color: "#F43F5E" },
      { id: 2, name: "Nave Terra", color: "#06B6D4" },
      { id: 3, name: "Nave Lua", color: "#EAB308" },
    ],
    targets: [
      { id: 1, label: "Setor A", color: "#F43F5E" },
      { id: 2, label: "Setor B", color: "#06B6D4" },
      { id: 3, label: "Setor C", color: "#EAB308" },
    ],
    targetContainerStyle: { display: "flex", justifyContent: "space-between" },
    tip: "A regra necessária é 'justify-content: space-between;'.",
  },
  {
    id: 5,
    title: "5. Pouso no Eixo Transversal",
    category: "flexbox",
    difficulty: "Iniciante",
    mission: "Abaixe os drones até as plataformas de solo no fundo da câmara.",
    instructions: "Enquanto `justify-content` controla o eixo principal, `align-items` controla o eixo transversal (vertical, por padrão).",
    cheatsheet: [
      { prop: "align-items: flex-start", desc: "Alinha no topo do container (padrão)." },
      { prop: "align-items: center", desc: "Centraliza no eixo transversal." },
      { prop: "align-items: flex-end", desc: "Alinha na base/fundo do container." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "align-items: flex-start;",
    solution: "align-items: flex-end;",
    drones: [
      { id: 1, name: "Drone A", color: "#10B981" },
      { id: 2, name: "Drone B", color: "#06B6D4" },
    ],
    targets: [
      { id: 1, label: "Hangar 1", color: "#10B981" },
      { id: 2, label: "Hangar 2", color: "#06B6D4" },
    ],
    targetContainerStyle: { display: "flex", alignItems: "flex-end" },
    tip: "Utilize 'align-items: flex-end;' para trazer os drones para o solo.",
  },
  {
    id: 6,
    title: "6. O Alinhamento Perfeito",
    category: "flexbox",
    difficulty: "Intermediário",
    mission: "Centralize o núcleo quântico exatamente no centro geométrico (horizontal e vertical) do reator.",
    instructions: "Combine `justify-content: center` e `align-items: center` para o clássico centro absoluto do CSS!",
    cheatsheet: [
      { prop: "justify-content: center", desc: "Centro horizontal." },
      { prop: "align-items: center", desc: "Centro vertical." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "justify-content: flex-start;\nalign-items: flex-start;",
    solution: "justify-content: center;\nalign-items: center;",
    drones: [{ id: 1, name: "Reator Core", color: "#A855F7" }],
    targets: [{ id: 1, label: "Núcleo", color: "#A855F7" }],
    targetContainerStyle: { display: "flex", justifyContent: "center", alignItems: "center" },
    tip: "Digite 'justify-content: center;' e na linha seguinte 'align-items: center;'.",
  },
  {
    id: 7,
    title: "7. Inversão de Marcha (Row-Reverse)",
    category: "flexbox",
    difficulty: "Intermediário",
    mission: "Inverta a ordem dos drones na esteira e desloque-os para a ponta esquerda.",
    instructions: "`flex-direction: row-reverse` inverte a direção dos itens e também a origem do eixo principal!",
    cheatsheet: [
      { prop: "flex-direction: row-reverse", desc: "Itens organizados da direita para a esquerda." },
      { prop: "justify-content: flex-end", desc: "No modo invertido, flex-end aponta para a esquerda." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "flex-direction: row;",
    solution: "flex-direction: row-reverse;\njustify-content: flex-end;",
    drones: [
      { id: 1, name: "Drone 1", color: "#F43F5E" },
      { id: 2, name: "Drone 2", color: "#06B6D4" },
    ],
    targets: [
      { id: 1, label: "Slot 1", color: "#F43F5E" },
      { id: 2, label: "Slot 2", color: "#06B6D4" },
    ],
    targetContainerStyle: { display: "flex", flexDirection: "row-reverse", justifyContent: "flex-end" },
    tip: "Use 'flex-direction: row-reverse;' e 'justify-content: flex-end;'.",
  },
  {
    id: 8,
    title: "8. Formação em Coluna",
    category: "flexbox",
    difficulty: "Intermediário",
    mission: "Organize os drones verticalmente e afaste-os para as extremidades superior e inferior.",
    instructions: "Ao definir `flex-direction: column`, o eixo principal passa a ser vertical!",
    cheatsheet: [
      { prop: "flex-direction: column", desc: "Eixo principal se torna de cima para baixo." },
      { prop: "justify-content: space-between", desc: "Afasta no eixo vertical." },
    ],
    containerFixedStyle: { display: "flex" },
    startingCode: "flex-direction: row;",
    solution: "flex-direction: column;\njustify-content: space-between;",
    drones: [
      { id: 1, name: "Drone Alpha", color: "#10B981" },
      { id: 2, name: "Drone Beta", color: "#EAB308" },
    ],
    targets: [
      { id: 1, label: "Topo", color: "#10B981" },
      { id: 2, label: "Base", color: "#EAB308" },
    ],
    targetContainerStyle: { display: "flex", flexDirection: "column", justifyContent: "space-between" },
    tip: "Defina 'flex-direction: column;' e 'justify-content: space-between;'.",
  },
  {
    id: 9,
    title: "9. Espaçamento Magnético (Gap)",
    category: "flexbox",
    difficulty: "Intermediário",
    mission: "Mantenha uma distância de segurança de exatamente 32px entre os robôs no centro da plataforma.",
    instructions: "A propriedade moderna `gap` cria espaçamento uniforme entre itens sem precisar de margens manuais.",
    cheatsheet: [
      { prop: "gap: 32px", desc: "Espaço de 32px entre os itens filhos." },
      { prop: "justify-content: center", desc: "Centraliza o bloco no eixo principal." },
    ],
    containerFixedStyle: { display: "flex", alignItems: "center" },
    startingCode: "justify-content: flex-start;\ngap: 0px;",
    solution: "justify-content: center;\ngap: 32px;",
    drones: [
      { id: 1, name: "Bot 1", color: "#06B6D4" },
      { id: 2, name: "Bot 2", color: "#A855F7" },
      { id: 3, name: "Bot 3", color: "#F43F5E" },
    ],
    targets: [
      { id: 1, label: "Alvo 1", color: "#06B6D4" },
      { id: 2, label: "Alvo 2", color: "#A855F7" },
      { id: 3, label: "Alvo 3", color: "#F43F5E" },
    ],
    targetContainerStyle: { display: "flex", alignItems: "center", justifyContent: "center", gap: "32px" },
    tip: "Combine 'justify-content: center;' com 'gap: 32px;'.",
  },
  {
    id: 10,
    title: "10. Quebra em Múltiplas Linhas (Flex-Wrap)",
    category: "flexbox",
    difficulty: "Avançado",
    mission: "Permita que o excesso de naves quebre suavemente para a próxima linha e alinhe o bloco.",
    instructions: "`flex-wrap: wrap` autoriza itens flex a ocupar novas linhas quando a largura esgotar.",
    cheatsheet: [
      { prop: "flex-wrap: wrap", desc: "Quebra itens em várias linhas se necessário." },
      { prop: "align-content: space-between", desc: "Distribui as múltiplas linhas entre os topos." },
    ],
    containerFixedStyle: { display: "flex", width: "260px" },
    startingCode: "flex-wrap: nowrap;",
    solution: "flex-wrap: wrap;\njustify-content: space-between;",
    drones: [
      { id: 1, name: "Drone 1", color: "#10B981" },
      { id: 2, name: "Drone 2", color: "#06B6D4" },
      { id: 3, name: "Drone 3", color: "#A855F7" },
      { id: 4, name: "Drone 4", color: "#F43F5E" },
    ],
    targets: [
      { id: 1, label: "N1", color: "#10B981" },
      { id: 2, label: "N2", color: "#06B6D4" },
      { id: 3, label: "N3", color: "#A855F7" },
      { id: 4, label: "N4", color: "#F43F5E" },
    ],
    targetContainerStyle: { display: "flex", flexWrap: "wrap", justifyContent: "space-between", width: "260px" },
    tip: "Use 'flex-wrap: wrap;' e 'justify-content: space-between;'.",
  },

  // --- FASE 2: CSS GRID MATRIX (11 a 15) ---
  {
    id: 11,
    title: "11. Matriz de 3 Colunas Fracionadas",
    category: "grid",
    difficulty: "Iniciante",
    mission: "Crie uma grade de 3 colunas de larguras rigorosamente iguais usando a unidade fracionária `fr`.",
    instructions: "`grid-template-columns: 1fr 1fr 1fr` divide o espaço disponível em 3 frações proporcionais.",
    cheatsheet: [
      { prop: "grid-template-columns: 1fr 1fr 1fr", desc: "3 colunas de tamanho igual." },
      { prop: "grid-template-columns: repeat(3, 1fr)", desc: "Sintaxe curta com repeat()." },
    ],
    containerFixedStyle: { display: "grid", gap: "16px" },
    startingCode: "grid-template-columns: 1fr;",
    solution: "grid-template-columns: repeat(3, 1fr);",
    drones: [
      { id: 1, name: "Coluna 1", color: "#06B6D4" },
      { id: 2, name: "Coluna 2", color: "#10B981" },
      { id: 3, name: "Coluna 3", color: "#A855F7" },
    ],
    targets: [
      { id: 1, label: "Base 1", color: "#06B6D4" },
      { id: 2, label: "Base 2", color: "#10B981" },
      { id: 3, label: "Base 3", color: "#A855F7" },
    ],
    targetContainerStyle: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
    tip: "Escreva 'grid-template-columns: repeat(3, 1fr);' ou 'grid-template-columns: 1fr 1fr 1fr;'.",
  },
  {
    id: 12,
    title: "12. Grade com Laterais Fixas (Sidebar + Feed)",
    category: "grid",
    difficulty: "Intermediário",
    mission: "Configure uma coluna lateral de 100px na esquerda e permita que a coluna principal ocupe o restante.",
    instructions: "`grid-template-columns: 100px 1fr` cria um layout clássico de barra lateral fixa e conteúdo fluído.",
    cheatsheet: [
      { prop: "grid-template-columns: 100px 1fr", desc: "100px fixos para o primeiro item, restante fluido." },
    ],
    containerFixedStyle: { display: "grid", gap: "16px" },
    startingCode: "grid-template-columns: 1fr 1fr;",
    solution: "grid-template-columns: 100px 1fr;",
    drones: [
      { id: 1, name: "Sidebar", color: "#F43F5E" },
      { id: 2, name: "Feed Central", color: "#06B6D4" },
    ],
    targets: [
      { id: 1, label: "Nav 100px", color: "#F43F5E" },
      { id: 2, label: "Conteúdo Fluido", color: "#06B6D4" },
    ],
    targetContainerStyle: { display: "grid", gridTemplateColumns: "100px 1fr", gap: "16px" },
    tip: "Defina 'grid-template-columns: 100px 1fr;'.",
  },
  {
    id: 13,
    title: "13. Matriz 2x2 com Espaçamento Duplo",
    category: "grid",
    difficulty: "Intermediário",
    mission: "Estruture uma grade 2x2 com espaçamento de linhas e colunas de 20px.",
    instructions: "Use `grid-template-columns: repeat(2, 1fr)` e `gap: 20px` para uma distribuição perfeita.",
    cheatsheet: [
      { prop: "grid-template-columns: repeat(2, 1fr)", desc: "2 colunas iguais." },
      { prop: "gap: 20px", desc: "Espaçamento de 20px em x e y." },
    ],
    containerFixedStyle: { display: "grid" },
    startingCode: "grid-template-columns: 1fr;\ngap: 0px;",
    solution: "grid-template-columns: repeat(2, 1fr);\ngap: 20px;",
    drones: [
      { id: 1, name: "D1", color: "#06B6D4" },
      { id: 2, name: "D2", color: "#10B981" },
      { id: 3, name: "D3", color: "#EAB308" },
      { id: 4, name: "D4", color: "#A855F7" },
    ],
    targets: [
      { id: 1, label: "Q1", color: "#06B6D4" },
      { id: 2, label: "Q2", color: "#10B981" },
      { id: 3, label: "Q3", color: "#EAB308" },
      { id: 4, label: "Q4", color: "#A855F7" },
    ],
    targetContainerStyle: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" },
    tip: "Use 'grid-template-columns: repeat(2, 1fr);' e 'gap: 20px;'.",
  },
  {
    id: 14,
    title: "14. Centralização Bidirecional (Place-Items)",
    category: "grid",
    difficulty: "Intermediário",
    mission: "Centralize todas as naves simultaneamente em suas respectivas células da grade com um único comando.",
    instructions: "`place-items: center` é o atalho moderno do Grid para aplicar `align-items: center` e `justify-items: center` ao mesmo tempo!",
    cheatsheet: [
      { prop: "place-items: center", desc: "Centraliza horizontal e verticalmente dentro da célula." },
    ],
    containerFixedStyle: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", height: "240px" },
    startingCode: "place-items: start;",
    solution: "place-items: center;",
    drones: [
      { id: 1, name: "Bot A", color: "#06B6D4" },
      { id: 2, name: "Bot B", color: "#F43F5E" },
    ],
    targets: [
      { id: 1, label: "Célula 1", color: "#06B6D4" },
      { id: 2, label: "Célula 2", color: "#F43F5E" },
    ],
    targetContainerStyle: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", height: "240px", placeItems: "center" },
    tip: "Digite apenas 'place-items: center;' para posicionar os dois drones no meio de cada célula.",
  },
  {
    id: 15,
    title: "15. Grade de Painel 3 Colunas com Linhas Definidas",
    category: "grid",
    difficulty: "Avançado",
    mission: "Construa o painel de comando final: 3 colunas e 2 linhas de 80px de altura com gap de 12px.",
    instructions: "Combine `grid-template-columns`, `grid-template-rows` e `gap` para o controle total do layout.",
    cheatsheet: [
      { prop: "grid-template-columns: repeat(3, 1fr)", desc: "3 colunas de largura proporcional." },
      { prop: "grid-template-rows: repeat(2, 80px)", desc: "2 linhas de 80px de altura cada." },
      { prop: "gap: 12px", desc: "Distância de 12px entre células." },
    ],
    containerFixedStyle: { display: "grid" },
    startingCode: "grid-template-columns: 1fr;\ngap: 0px;",
    solution: "grid-template-columns: repeat(3, 1fr);\ngrid-template-rows: repeat(2, 80px);\ngap: 12px;",
    drones: [
      { id: 1, name: "P1", color: "#06B6D4" },
      { id: 2, name: "P2", color: "#10B981" },
      { id: 3, name: "P3", color: "#A855F7" },
      { id: 4, name: "P4", color: "#F43F5E" },
      { id: 5, name: "P5", color: "#EAB308" },
      { id: 6, name: "P6", color: "#38BDF8" },
    ],
    targets: [
      { id: 1, label: "T1", color: "#06B6D4" },
      { id: 2, label: "T2", color: "#10B981" },
      { id: 3, label: "T3", color: "#A855F7" },
      { id: 4, label: "T4", color: "#F43F5E" },
      { id: 5, label: "T5", color: "#EAB308" },
      { id: 6, label: "T6", color: "#38BDF8" },
    ],
    targetContainerStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(2, 80px)",
      gap: "12px",
    },
    tip: "Defina 'grid-template-columns: repeat(3, 1fr);', 'grid-template-rows: repeat(2, 80px);' e 'gap: 12px;'.",
  },
];
