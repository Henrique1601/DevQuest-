export interface MentorAdvice {
  type: "complexity" | "bug" | "socratic_hint" | "pseudocode" | "praise";
  level: 1 | 2 | 3;
  title: string;
  message: string;
  suggestedComplexity?: string;
}

export function analyzeCodeWithMentor(code: string, functionName?: string): MentorAdvice[] {
  const advices: MentorAdvice[] = [];
  const cleanCode = code.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, ""); // Remove comentários

  // 1. Verificação de Retorno
  if (!cleanCode.includes("return")) {
    advices.push({
      type: "bug",
      level: 1,
      title: "Função Sem Retorno Detectada",
      message:
        "Observe que a sua função não possui a instrução 'return'. Lembre-se que em JavaScript funções sem retorno explícito devolvem 'undefined'."
    });
  }

  // 2. Detecção de Loops Aninhados (O(N^2))
  const loopMatches = (cleanCode.match(/\b(for|while)\b/g) || []).length;
  const arrayIterationMatches = (cleanCode.match(/\.(map|filter|forEach|find|reduce)\b/g) || []).length;
  const innerSearchMatches = (cleanCode.match(/\.(indexOf|includes|find)\b/g) || []).length;

  if (loopMatches >= 2 || (arrayIterationMatches >= 1 && innerSearchMatches >= 1)) {
    advices.push({
      type: "complexity",
      level: 1,
      title: "Oportunidade de Otimização Big-O (O(N²))",
      message:
        "Identifiquei buscas ou laços aninhados no seu código, o que pode levar a um tempo de execução O(N²). Você conseguiria usar um Objeto literal, Map ou Set para fazer as verificações em tempo constante O(1)?",
      suggestedComplexity: "O(n)"
    });
  }

  // 3. Detecção de Mutação de Entrada
  if (cleanCode.includes(".splice(") || cleanCode.includes(".reverse()")) {
    advices.push({
      type: "bug",
      level: 2,
      title: "Atenção com Métodos Mutáveis",
      message:
        "Você está utilizando métodos que alteram o array original (como .splice() ou .reverse()). Em aplicações modernas e React, é recomendável usar alternativas imutáveis como .slice() ou .toReversed()."
    });
  }

  // 4. Detecção de Pilha/Stack adequada
  if (cleanCode.includes("stack") || cleanCode.includes("pilha")) {
    advices.push({
      type: "praise",
      level: 1,
      title: "Excelente Escolha de Estrutura!",
      message:
        "Você está utilizando uma Pilha (Stack LIFO). Garanta que as operações de topo utilizem push() e pop() para preservar o tempo O(1)."
    });
  }

  // 5. Dica Socrática Padrão se nenhuma falha for crítica
  if (advices.length === 0) {
    advices.push({
      type: "socratic_hint",
      level: 1,
      title: "Análise Heurística Positiva",
      message:
        "Sua estrutura inicial parece limpa! Verifique agora se você cobriu casos de borda: o que acontece se o array vier vazio, com números negativos ou valores duplicados?"
    });
  }

  return advices;
}

export function getSocraticHints(challengeTitle: string, level: 1 | 2 | 3): string {
  if (level === 1) {
    return `Pense no objetivo central de "${challengeTitle}". Qual é a relação entre os dados de entrada e o resultado esperado? Que padrão você identifica antes de escrever qualquer laço?`;
  }
  if (level === 2) {
    return `Pseudocódigo Sugerido:\n1. Inicialize a estrutura acumuladora (ex: Map, Set ou Array).\n2. Itere pelos elementos uma única vez (O(N)).\n3. Verifique a condição de parada ou descarte.\n4. Retorne o resultado processado.`;
  }
  return `Diagnóstico Específico: Verifique se sua comparação trata tipos estritamente (use === em vez de ==) e certifique-se de que o último elemento é manipulado sem erro de 'off-by-one'.`;
}
