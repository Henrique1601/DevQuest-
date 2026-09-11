export type ReviewVerdict = "APPROVED" | "CHANGES_REQUESTED" | "COMMENT";

export type ReviewCategory = "security" | "clean_code" | "performance" | "architecture";

export interface InlineComment {
  id: string;
  lineNumber: number;
  category: ReviewCategory;
  severity: "critical" | "warning" | "suggestion";
  title: string;
  comment: string;
  suggestedReplacement?: string;
}

export interface CodeReviewResult {
  score: number;
  verdict: ReviewVerdict;
  summary: string;
  comments: InlineComment[];
  refactoredCode: string;
  metrics: {
    securityScore: number;
    maintainabilityScore: number;
    performanceScore: number;
  };
}

export interface ReviewPreset {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export const REVIEW_PRESETS: ReviewPreset[] = [
  {
    id: "sql-injection",
    title: "Vulnerabilidade Crítica: SQL Injection",
    description: "Endpoint com concatenação direta de parâmetros de query sem parametrização.",
    language: "typescript",
    code: `import { Request, Response } from "express";
import { dbClient } from "./database";

export async function getUserOrders(req: Request, res: Response) {
  const userId = req.query.userId;
  
  // Vulnerabilidade: Concatenação direta de parâmetros
  const query = "SELECT * FROM orders WHERE user_id = '" + userId + "' AND status = 'active'";
  const results = await dbClient.query(query);

  return res.json({ data: results.rows });
}`
  },
  {
    id: "memory-leak-react",
    title: "React Hook: Memory Leak & Falta de Cleanup",
    description: "Efeito colateral que registra window listener e interval sem remover no unmount.",
    language: "typescript",
    code: `import React, { useState, useEffect } from "react";

export function LiveUserTracker({ roomId }: { roomId: string }) {
  const [users, setUsers] = useState<number>(0);

  useEffect(() => {
    // Alerta: Listener adicionado sem função de desinscrição/cleanup
    window.addEventListener("resize", () => {
      console.log("Resized", window.innerWidth);
    });

    const timer = setInterval(() => {
      fetch("/api/room/" + roomId + "/pings")
        .then((r) => r.json())
        .then((d) => setUsers(d.count));
    }, 2000);
  }, [roomId]);

  return <div>Usuários online: {users}</div>;
}`
  },
  {
    id: "nested-loop-clean-code",
    title: "Algoritmo O(n²) com Nomes Obscuros & Mutação",
    description: "Função com loops aninhados desnecessários, variáveis 'a', 'b', 'c' e mutação direta.",
    language: "javascript",
    code: `function find(a, b) {
  var r = [];
  for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < b.length; j++) {
      if (a[i] === b[j]) {
        r.push(a[i]);
      }
    }
  }
  a.length = 0; // mutando o array original!
  return r;
}`
  }
];

export function analyzeCodeForReview(code: string, language: string = "typescript"): CodeReviewResult {
  const lines = code.split("\n");
  const comments: InlineComment[] = [];

  let securityDeduction = 0;
  let maintainabilityDeduction = 0;
  let performanceDeduction = 0;

  // 1. Verificações de Segurança (OWASP)
  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // SQL Injection por concatenação
    if (
      (line.includes("SELECT ") || line.includes("INSERT ") || line.includes("DELETE ")) &&
      (line.includes(" + ") || line.includes("`") || line.includes("${"))
    ) {
      comments.push({
        id: `sec-sqli-${lineNum}`,
        lineNumber: lineNum,
        category: "security",
        severity: "critical",
        title: "Possível SQL Injection (CWE-89 / OWASP A03)",
        comment:
          "Parâmetros externos estão sendo interpolados diretamente na query SQL. Um invasor pode injetar SQL (' OR '1'='1) para vazar o banco de dados. Utilize queries parametrizadas ($1, $2) ou um ORM com prepared statements (ex: Drizzle ORM).",
        suggestedReplacement: `  const query = "SELECT * FROM orders WHERE user_id = $1 AND status = $2";\n  const results = await dbClient.query(query, [userId, 'active']);`
      });
      securityDeduction += 45;
    }

    // innerHTML inseguro
    if (line.includes("innerHTML") || line.includes("dangerouslySetInnerHTML")) {
      comments.push({
        id: `sec-xss-${lineNum}`,
        lineNumber: lineNum,
        category: "security",
        severity: "critical",
        title: "Risco de Cross-Site Scripting (XSS)",
        comment:
          "A atribuição direta a innerHTML permite injeção de scripts maliciosos. Prefira textContent ou sanitize o conteúdo antes de renderizar.",
        suggestedReplacement: line.replace("innerHTML", "textContent")
      });
      securityDeduction += 35;
    }

    // eval() ou Function()
    if (/\beval\s*\(/.test(line) || /\bnew\s+Function\s*\(/.test(line)) {
      comments.push({
        id: `sec-eval-${lineNum}`,
        lineNumber: lineNum,
        category: "security",
        severity: "critical",
        title: "Uso Perigoso de eval() / Execução Remota",
        comment: "Executar código arbitrário através de strings é uma brecha grave de segurança RCE.",
        suggestedReplacement: "// Remova o eval e utilize parser JSON estruturado."
      });
      securityDeduction += 50;
    }

    // Chaves de API hardcoded
    if (/(['"])(?:sk-[a-zA-Z0-9]{20,}|ghp_[a-zA-Z0-9]{20,}|AIza[0-9A-Za-z-_]{35})\1/.test(line)) {
      comments.push({
        id: `sec-secret-${lineNum}`,
        lineNumber: lineNum,
        category: "security",
        severity: "critical",
        title: "Segredo Hardcoded no Código-Fonte",
        comment: "Chaves de API expostas em código podem ser comprometidas no GitHub. Utilize process.env.API_KEY.",
        suggestedReplacement: "  const apiKey = process.env.API_KEY;"
      });
      securityDeduction += 40;
    }
  });

  // 2. Verificações de Performance & React
  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // useEffect sem cleanup de listener ou timer
    if (
      (line.includes("addEventListener") || line.includes("setInterval")) &&
      code.includes("useEffect") &&
      !code.includes("removeEventListener") &&
      !code.includes("clearInterval")
    ) {
      comments.push({
        id: `perf-leak-${lineNum}`,
        lineNumber: lineNum,
        category: "performance",
        severity: "warning",
        title: "Memory Leak Potencial (Falta de Cleanup no useEffect)",
        comment:
          "Você registrou um evento ou intervalo contínuo dentro do useEffect, mas não retornou uma função de desinscrição/cleanup. Quando o componente desmontar, os callbacks continuarão rodando em segundo plano.",
        suggestedReplacement:
          "    return () => {\n      window.removeEventListener('resize', handleResize);\n      clearInterval(timer);\n    };"
      });
      performanceDeduction += 25;
    }

    // Loops aninhados O(n²)
    if (/\bfor\s*\(/.test(line) || /\bwhile\s*\(/.test(line)) {
      const remainingCode = lines.slice(index + 1, index + 15).join("\n");
      if (/\bfor\s*\(/.test(remainingCode) || /\bwhile\s*\(/.test(remainingCode)) {
        comments.push({
          id: `perf-nested-${lineNum}`,
          lineNumber: lineNum,
          category: "performance",
          severity: "warning",
          title: "Complexidade Quadrática O(n²)",
          comment:
            "Laços aninhados causam degradação drástica com grandes conjuntos de dados. Para intersecções ou buscas, utilize uma estrutura de acesso O(1) como `Set` ou `Map`.",
          suggestedReplacement:
            "  const setB = new Set(b);\n  return a.filter(item => setB.has(item));"
        });
        performanceDeduction += 20;
      }
    }
  });

  // 3. Verificações de Clean Code & Boas Práticas
  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // Mutação de parâmetros de entrada
    if (/\b[a-zA-Z0-9_]+\.(length\s*=\s*0|splice|push|pop|reverse|sort)\(/.test(line)) {
      comments.push({
        id: `clean-mut-${lineNum}`,
        lineNumber: lineNum,
        category: "clean_code",
        severity: "warning",
        title: "Efeito Colateral Inesperado: Mutação Direta de Dados",
        comment:
          "Modificar o array ou objeto de entrada diretamente causa bugs silenciosos e dificulta o rastreio de estado. Prefira retornar uma cópia imutável (ex: spread `[...items]` ou métodos funcionais `filter`, `map`).",
        suggestedReplacement: "  // Evite mutações; prefira retornar novas estruturas"
      });
      maintainabilityDeduction += 15;
    }

    // Uso de var
    if (/\bvar\s+[a-zA-Z0-9_]+/.test(line)) {
      comments.push({
        id: `clean-var-${lineNum}`,
        lineNumber: lineNum,
        category: "clean_code",
        severity: "suggestion",
        title: "Uso Obsoleto de 'var'",
        comment: "Prefira `const` para valores imutáveis e `let` para variáveis de escopo de bloco.",
        suggestedReplacement: line.replace(/\bvar\b/, "const")
      });
      maintainabilityDeduction += 5;
    }

    // Tratamento de erro vazio
    if (/catch\s*\([^)]*\)\s*\{\s*\}/.test(line)) {
      comments.push({
        id: `clean-catch-${lineNum}`,
        lineNumber: lineNum,
        category: "clean_code",
        severity: "warning",
        title: "Tratamento de Exceção Silencioso (Empty Catch)",
        comment: "Engolir erros silenciosamente mascara falhas graves em produção. Ao menos registre com console.error ou repasse o erro.",
        suggestedReplacement: "  } catch (error) {\n    console.error('Falha na operação:', error);\n    throw error;\n  }"
      });
      maintainabilityDeduction += 15;
    }
  });

  // Se nenhum problema foi achado, elogiar o código
  if (comments.length === 0) {
    comments.push({
      id: "all-good",
      lineNumber: 1,
      category: "clean_code",
      severity: "suggestion",
      title: "Código Excelente!",
      comment: "Nenhuma vulnerabilidade ou má prática evidente foi detectada. O código está limpo, conciso e segue boas convenções."
    });
  }

  // Deduções e pontuação final
  const securityScore = Math.max(0, 100 - securityDeduction);
  const maintainabilityScore = Math.max(0, 100 - maintainabilityDeduction);
  const performanceScore = Math.max(0, 100 - performanceDeduction);

  const finalScore = Math.round((securityScore * 0.45) + (maintainabilityScore * 0.25) + (performanceScore * 0.30));

  let verdict: ReviewVerdict = "APPROVED";
  if (securityDeduction > 0 || performanceDeduction >= 25 || maintainabilityDeduction >= 30) {
    verdict = "CHANGES_REQUESTED";
  } else if (maintainabilityDeduction > 0 || performanceDeduction > 0) {
    verdict = "COMMENT";
  }

  // Gera código refatorado sugerido
  let refactoredCode = code;
  if (code.includes("SELECT * FROM orders WHERE user_id = '")) {
    refactoredCode = `import { Request, Response } from "express";
import { dbClient } from "./database";

export async function getUserOrders(req: Request, res: Response) {
  const { userId } = req.query;
  
  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ error: "userId obrigatório e válido." });
  }

  // Protegido contra SQL Injection via query parametrizada
  const query = "SELECT * FROM orders WHERE user_id = $1 AND status = $2";
  const results = await dbClient.query(query, [userId, "active"]);

  return res.json({ data: results.rows });
}`;
  } else if (code.includes("addEventListener") && code.includes("setInterval")) {
    refactoredCode = `import React, { useState, useEffect } from "react";

export function LiveUserTracker({ roomId }: { roomId: string }) {
  const [users, setUsers] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      console.log("Resized", window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const timer = setInterval(async () => {
      try {
        const res = await fetch(\`/api/room/\${roomId}/pings\`);
        const data = await res.json();
        setUsers(data.count);
      } catch (err) {
        console.error("Falha ao sincronizar usuários:", err);
      }
    }, 2000);

    // Limpeza obrigatória para evitar memory leaks ao desmontar
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(timer);
    };
  }, [roomId]);

  return <div>Usuários online: {users}</div>;
}`;
  } else if (code.includes("function find(a, b)")) {
    refactoredCode = `/**
 * Encontra a intersecção entre dois arrays com complexidade O(n + m)
 * sem mutar as entradas originais.
 */
export function findIntersection<T>(firstList: T[], secondList: T[]): T[] {
  const secondSet = new Set(secondList);
  return firstList.filter((item) => secondSet.has(item));
}`;
  }

  let summary = "";
  if (verdict === "CHANGES_REQUESTED") {
    summary = `Foram encontradas ${comments.filter(c => c.severity === "critical").length} vulnerabilidades críticas de segurança ou problemas graves de arquitetura. O Pull Request precisa de correções antes do merge.`;
  } else if (verdict === "COMMENT") {
    summary = "O código funciona e é aceitável, mas há oportunidades claras de refatoração para legibilidade e performance.";
  } else {
    summary = "Revisão concluída com louvor! O código cumpre os princípios de Clean Code, segurança defensiva e boa performance.";
  }

  return {
    score: finalScore,
    verdict,
    summary,
    comments,
    refactoredCode,
    metrics: {
      securityScore,
      maintainabilityScore,
      performanceScore
    }
  };
}