export interface DailyQuest {
  id: string;
  dateString: string;
  title: string;
  difficulty: "Fácil" | "Médio" | "Difícil";
  category: string;
  xpReward: number; // 2x XP
  description: string;
  starterCode: string;
  solutionHint: string;
  testCases: { input: any[]; expected: any; description: string }[];
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export const mockDailyQuests: DailyQuest[] = [
  {
    id: "daily-2026-09-10",
    dateString: "2026-09-10",
    title: "Inversão de Palavras Mantendo Pontuação",
    difficulty: "Médio",
    category: "Strings & Ponteiros",
    xpReward: 120, // 2x XP Diário
    description: `Dada uma frase, inverta a ordem das letras de cada palavra individualmente, preservando os espaços e a pontuação nas suas posições originais.

Exemplo:
Entrada: "dev quest!"
Saída: "ved tseuq!"

Requisito: Resolva em tempo O(N) sem usar bibliotecas externas pesadas.`,
    starterCode: `function reverseWords(str) {
  return str
    .split(" ")
    .map(word => {
      // Separa letras da pontuação final se existir
      const match = word.match(/^([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$/);
      if (!match) return word.split("").reverse().join("");
      const [, letters, punctuation] = match;
      return letters.split("").reverse().join("") + punctuation;
    })
    .join(" ");
}`,
    solutionHint: "Separe as palavras com split(' ') e inverta os caracteres alfanuméricos preservando os caracteres finais.",
    testCases: [
      {
        input: ["dev quest!"],
        expected: "ved tseuq!",
        description: "Inverte palavras mantendo exclamação final"
      },
      {
        input: ["codigo limpo."],
        expected: "ogidoc opmil.",
        description: "Inverte mantendo ponto final"
      },
      {
        input: ["hello world"],
        expected: "olleh dlrow",
        description: "Inverte palavras simples sem pontuação"
      }
    ]
  },
  {
    id: "daily-2026-09-11",
    dateString: "2026-09-11",
    title: "Identificador de Anagramas em Lista",
    difficulty: "Fácil",
    category: "Hash Map & Arrays",
    xpReward: 100,
    description: `Implemente uma função que recebe duas strings e verifica se uma é anagrama da outra (mesmos caracteres na mesma quantidade).`,
    starterCode: `function isAnagram(s1, s2) {
  const clean = str => str.toLowerCase().replace(/[^a-z0-9]/g, "").split("").sort().join("");
  return clean(s1) === clean(s2);
}`,
    solutionHint: "Ordene os caracteres de ambas as strings normalizadas e compare.",
    testCases: [
      {
        input: ["amor", "roma"],
        expected: true,
        description: "Anagrama clássico"
      },
      {
        input: ["carro", "porta"],
        expected: false,
        description: "Palavras com letras diferentes"
      }
    ]
  }
];

export function getTodayDailyQuest(): DailyQuest {
  return mockDailyQuests[0];
}

// Gera dados simulados do Heatmap dos últimos 180 dias com streak ativa
export function generateAnnualHeatmapData(): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date();

  for (let i = 150; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // Simula atividade consistente nos últimos 20 dias (streak ativa)
    let count = 0;
    if (i <= 18) {
      count = Math.floor(Math.random() * 4) + 1; // 1 a 4
    } else if (Math.random() > 0.4) {
      count = Math.floor(Math.random() * 3) + 1;
    }

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count >= 4) level = 4;
    else if (count === 3) level = 3;
    else if (count === 2) level = 2;
    else if (count === 1) level = 1;

    days.push({ date: dateStr, count, level });
  }

  return days;
}
