export interface TableColumn {
  name: string;
  type: string;
  isPrimary?: boolean;
}

export interface TableSchema {
  name: string;
  columns: TableColumn[];
  rows: Record<string, any>[];
}

export interface QueryResult {
  columns: string[];
  rows: any[][];
  rowCount: number;
  executionTimeMs: number;
}

export interface SqlChallenge {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  hint: string;
  expectedQueryRegex: RegExp;
  validateResult: (res: QueryResult) => boolean;
  starterQuery: string;
  xp: number;
}

export function getInitialDatabase(): Record<string, TableSchema> {
  return {
    usuarios: {
      name: "usuarios",
      columns: [
        { name: "id", type: "INT", isPrimary: true },
        { name: "nome", type: "VARCHAR(100)" },
        { name: "email", type: "VARCHAR(100)" },
        { name: "saldo", type: "DECIMAL(10,2)" },
        { name: "status", type: "VARCHAR(20)" }
      ],
      rows: [
        { id: 1, nome: "Ana Silva", email: "ana.silva@email.com", saldo: 1540.50, status: "ativo" },
        { id: 2, nome: "Carlos Souza", email: "carlos.s@email.com", saldo: 250.00, status: "ativo" },
        { id: 3, nome: "Mariana Costa", email: "mariana.c@email.com", saldo: 4890.00, status: "ativo" },
        { id: 4, nome: "Pedro Rocha", email: "pedro.rocha@email.com", saldo: 0.00, status: "inativo" },
        { id: 5, nome: "Fernanda Lima", email: "fer.lima@email.com", saldo: 950.20, status: "ativo" },
        { id: 6, nome: "Lucas Mendes", email: "lucas.m@email.com", saldo: 120.00, status: "bloqueado" },
        { id: 7, nome: "Beatriz Ribeiro", email: "bia.ribeiro@email.com", saldo: 3200.75, status: "ativo" },
        { id: 8, nome: "Rafael Alves", email: "rafael.alves@email.com", saldo: 780.00, status: "ativo" }
      ]
    },

    produtos: {
      name: "produtos",
      columns: [
        { name: "id", type: "INT", isPrimary: true },
        { name: "nome", type: "VARCHAR(120)" },
        { name: "categoria", type: "VARCHAR(50)" },
        { name: "preco", type: "DECIMAL(10,2)" },
        { name: "estoque", type: "INT" }
      ],
      rows: [
        { id: 101, nome: "Teclado Mecânico RGB", categoria: "Periféricos", preco: 350.00, estoque: 45 },
        { id: 102, nome: "Mouse Gamer 16000 DPI", categoria: "Periféricos", preco: 180.00, estoque: 80 },
        { id: 103, nome: "Monitor Ultrawide 29\"", categoria: "Monitores", preco: 1299.90, estoque: 15 },
        { id: 104, nome: "Headset Noise Cancelling", categoria: "Áudio", preco: 499.00, estoque: 30 },
        { id: 105, nome: "Webcam Full HD 1080p", categoria: "Periféricos", preco: 220.00, estoque: 55 },
        { id: 106, nome: "Cadeira Ergonômica Pro", categoria: "Mobiliário", preco: 890.00, estoque: 12 },
        { id: 107, nome: "Suporte Articulado a Gás", categoria: "Acessórios", preco: 150.00, estoque: 90 },
        { id: 108, nome: "Microfone Condensador USB", categoria: "Áudio", preco: 320.00, estoque: 25 },
        { id: 109, nome: "Monitor 144Hz IPS", categoria: "Monitores", preco: 980.00, estoque: 22 },
        { id: 110, nome: "Mousepad Speed XL", categoria: "Acessórios", preco: 70.00, estoque: 140 }
      ]
    },

    pedidos: {
      name: "pedidos",
      columns: [
        { name: "id", type: "INT", isPrimary: true },
        { name: "usuario_id", type: "INT" },
        { name: "total", type: "DECIMAL(10,2)" },
        { name: "status", type: "VARCHAR(20)" },
        { name: "data_pedido", type: "VARCHAR(20)" }
      ],
      rows: [
        { id: 1001, usuario_id: 1, total: 530.00, status: "pago", data_pedido: "2026-03-01" },
        { id: 1002, usuario_id: 3, total: 1299.90, status: "pago", data_pedido: "2026-03-02" },
        { id: 1003, usuario_id: 2, total: 180.00, status: "pendente", data_pedido: "2026-03-03" },
        { id: 1004, usuario_id: 5, total: 890.00, status: "pago", data_pedido: "2026-03-04" },
        { id: 1005, usuario_id: 1, total: 220.00, status: "cancelado", data_pedido: "2026-03-05" },
        { id: 1006, usuario_id: 7, total: 1479.90, status: "pago", data_pedido: "2026-03-06" },
        { id: 1007, usuario_id: 8, total: 70.00, status: "pago", data_pedido: "2026-03-07" },
        { id: 1008, usuario_id: 3, total: 350.00, status: "pendente", data_pedido: "2026-03-08" }
      ]
    }
  };
}

export class MockSqlEngine {
  private db: Record<string, TableSchema>;

  constructor() {
    this.db = getInitialDatabase();
  }

  public getDatabase(): Record<string, TableSchema> {
    return this.db;
  }

  public resetDatabase(): void {
    this.db = getInitialDatabase();
  }

  // Executa uma instrução SQL interpretada
  public runQuery(query: string): QueryResult {
    const startTime = performance.now();
    const cleanQuery = query.trim().replace(/;+$/, "").replace(/\s+/g, " ");

    if (!cleanQuery) {
      throw new Error("Instrução SQL vazia.");
    }

    // Apenas instruções SELECT são suportadas neste playground didático
    if (!cleanQuery.toUpperCase().startsWith("SELECT")) {
      throw new Error("Apenas comandos 'SELECT' são suportados no playground de consultas.");
    }

    // Expressão regular robusta para dissecar o SELECT
    // Exemplo: SELECT u.nome, p.total FROM usuarios u LEFT JOIN pedidos p ON u.id = p.usuario_id WHERE p.status = 'pago' GROUP BY ... ORDER BY ... LIMIT 5
    const fromMatch = cleanQuery.match(/FROM\s+([a-zA-Z0-9_]+)(?:\s+([a-zA-Z0-9_]+))?/i);
    if (!fromMatch) {
      throw new Error("Sintaxe inválida: Cláusula FROM esperada.");
    }

    const primaryTableName = fromMatch[1].toLowerCase();
    const primaryTableAlias = fromMatch[2] ? fromMatch[2].toLowerCase() : primaryTableName;

    if (!this.db[primaryTableName]) {
      throw new Error(`Tabela '${primaryTableName}' não existe no banco de dados.`);
    }

    let joinedRows: Record<string, any>[] = this.db[primaryTableName].rows.map((row) => {
      const mapped: Record<string, any> = {};
      for (const [k, v] of Object.entries(row)) {
        mapped[k] = v;
        mapped[`${primaryTableName}.${k}`] = v;
        if (primaryTableAlias) mapped[`${primaryTableAlias}.${k}`] = v;
      }
      return mapped;
    });

    // Detectar JOIN (ex: [INNER|LEFT] JOIN pedidos p ON u.id = p.usuario_id)
    const joinMatch = cleanQuery.match(/(LEFT\s+JOIN|INNER\s+JOIN|JOIN)\s+([a-zA-Z0-9_]+)(?:\s+([a-zA-Z0-9_]+))?\s+ON\s+([a-zA-Z0-9_.]+)\s*=\s*([a-zA-Z0-9_.]+)/i);
    if (joinMatch) {
      const joinType = joinMatch[1].toUpperCase().includes("LEFT") ? "LEFT" : "INNER";
      const joinTableName = joinMatch[2].toLowerCase();
      const joinTableAlias = joinMatch[3] ? joinMatch[3].toLowerCase() : joinTableName;
      const leftKey = joinMatch[4];
      const rightKey = joinMatch[5];

      if (!this.db[joinTableName]) {
        throw new Error(`Tabela de junção '${joinTableName}' não existe.`);
      }

      const joinRows = this.db[joinTableName].rows;
      const newRows: Record<string, any>[] = [];

      for (const mainRow of joinedRows) {
        let matched = false;
        for (const jRow of joinRows) {
          const mainVal = mainRow[leftKey] !== undefined ? mainRow[leftKey] : mainRow[rightKey];
          const joinValCol = mainRow[leftKey] !== undefined ? rightKey.split(".").pop()! : leftKey.split(".").pop()!;
          const joinVal = jRow[joinValCol];

          if (mainVal == joinVal) {
            matched = true;
            const combined = { ...mainRow };
            for (const [jk, jv] of Object.entries(jRow)) {
              combined[`${joinTableName}.${jk}`] = jv;
              if (joinTableAlias) combined[`${joinTableAlias}.${jk}`] = jv;
              if (combined[jk] === undefined) combined[jk] = jv;
            }
            newRows.push(combined);
          }
        }

        if (!matched && joinType === "LEFT") {
          const combined = { ...mainRow };
          this.db[joinTableName].columns.forEach((col) => {
            combined[`${joinTableName}.${col.name}`] = null;
            if (joinTableAlias) combined[`${joinTableAlias}.${col.name}`] = null;
          });
          newRows.push(combined);
        }
      }

      joinedRows = newRows;
    }

    // Detectar WHERE
    const whereMatch = cleanQuery.match(/WHERE\s+(.*?)(?:\s+GROUP\s+BY|\s+ORDER\s+BY|\s+LIMIT|$)/i);
    if (whereMatch) {
      const conditionStr = whereMatch[1].trim();
      // Operador simples: coluna (= | != | > | < | >= | <= | LIKE) valor
      const condParts = conditionStr.match(/([a-zA-Z0-9_.]+)\s*(=|!=|>|<|>=|<=|LIKE)\s*(.+)/i);
      if (condParts) {
        const colName = condParts[1];
        const op = condParts[2].toUpperCase();
        let targetVal: any = condParts[3].trim().replace(/^['"]|['"]$/g, "");

        if (!isNaN(Number(targetVal))) {
          targetVal = Number(targetVal);
        }

        joinedRows = joinedRows.filter((r) => {
          const val = r[colName] !== undefined ? r[colName] : r[colName.split(".").pop()!];
          if (val === undefined || val === null) return false;

          switch (op) {
            case "=":
              return String(val).toLowerCase() === String(targetVal).toLowerCase();
            case "!=":
              return String(val).toLowerCase() !== String(targetVal).toLowerCase();
            case ">":
              return Number(val) > Number(targetVal);
            case "<":
              return Number(val) < Number(targetVal);
            case ">=":
              return Number(val) >= Number(targetVal);
            case "<=":
              return Number(val) <= Number(targetVal);
            case "LIKE": {
              const regex = new RegExp("^" + String(targetVal).replace(/%/g, ".*") + "$", "i");
              return regex.test(String(val));
            }
            default:
              return true;
          }
        });
      }
    }

    // Detectar GROUP BY
    const groupMatch = cleanQuery.match(/GROUP\s+BY\s+([a-zA-Z0-9_.]+)/i);
    if (groupMatch) {
      const groupCol = groupMatch[1].trim();
      const groups: Record<string, Record<string, any>[]> = {};

      for (const row of joinedRows) {
        const key = String(row[groupCol] !== undefined ? row[groupCol] : row[groupCol.split(".").pop()!]);
        if (!groups[key]) groups[key] = [];
        groups[key].push(row);
      }

      // Converte grupos em linhas agregadas
      const groupedRows: Record<string, any>[] = [];
      for (const [k, groupItems] of Object.entries(groups)) {
        const first = groupItems[0];
        const summary: Record<string, any> = { ...first };
        summary[groupCol] = k;
        summary["count"] = groupItems.length;
        summary["total"] = groupItems.reduce((acc, it) => acc + (Number(it.preco || it.total || 0)), 0);
        summary["media"] = (summary["total"] / groupItems.length).toFixed(2);
        groupedRows.push(summary);
      }
      joinedRows = groupedRows;
    }

    // Detectar ORDER BY
    const orderMatch = cleanQuery.match(/ORDER\s+BY\s+([a-zA-Z0-9_.]+)(?:\s+(ASC|DESC))?/i);
    if (orderMatch) {
      const orderCol = orderMatch[1].trim();
      const isDesc = orderMatch[2] ? orderMatch[2].toUpperCase() === "DESC" : false;

      joinedRows.sort((a, b) => {
        const valA = a[orderCol] !== undefined ? a[orderCol] : a[orderCol.split(".").pop()!];
        const valB = b[orderCol] !== undefined ? b[orderCol] : b[orderCol.split(".").pop()!];
        if (valA === valB) return 0;
        if (valA > valB) return isDesc ? -1 : 1;
        return isDesc ? 1 : -1;
      });
    }

    // Detectar LIMIT
    const limitMatch = cleanQuery.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const limitVal = parseInt(limitMatch[1], 10);
      joinedRows = joinedRows.slice(0, limitVal);
    }

    // Detectar colunas do SELECT (ex: SELECT nome, preco FROM ... ou SELECT *)
    const selectMatch = cleanQuery.match(/SELECT\s+(.*?)\s+FROM/i);
    if (!selectMatch) {
      throw new Error("Cláusula SELECT mal formatada.");
    }

    const selectFieldsStr = selectMatch[1].trim();
    let finalColumns: string[] = [];

    if (selectFieldsStr === "*") {
      if (joinedRows.length > 0) {
        // Pega colunas limpas (sem prefixo de tabela duplicado)
        finalColumns = Object.keys(joinedRows[0]).filter((k) => !k.includes("."));
      } else {
        finalColumns = this.db[primaryTableName].columns.map((c) => c.name);
      }
    } else {
      finalColumns = selectFieldsStr.split(",").map((s) => s.trim().replace(/.*\s+AS\s+/i, ""));
    }

    // Montar matriz de linhas
    const finalRows: any[][] = joinedRows.map((row) => {
      return finalColumns.map((col) => {
        const pureCol = col.replace(/.*\s+as\s+/i, "").trim();
        if (pureCol.toUpperCase().startsWith("COUNT(")) return joinedRows.length;
        if (row[pureCol] !== undefined) return row[pureCol];
        const fallback = row[pureCol.split(".").pop()!];
        return fallback !== undefined ? fallback : null;
      });
    });

    const executionTimeMs = parseFloat((performance.now() - startTime).toFixed(2));

    return {
      columns: finalColumns,
      rows: finalRows,
      rowCount: finalRows.length,
      executionTimeMs
    };
  }
}

export const mockSqlChallenges: SqlChallenge[] = [
  {
    id: "sql-chal-1",
    title: "1. Produtos Premium (Filtro & Ordem)",
    difficulty: "easy",
    description: "Selecione todos os produtos (SELECT *) com preço maior que R$ 300, ordenados pelo preço do mais caro para o mais barato (DESC).",
    hint: "Use WHERE preco > 300 ORDER BY preco DESC",
    expectedQueryRegex: /preco\s*>\s*300.*order\s+by\s+preco\s+desc/i,
    validateResult: (res) => res.rowCount >= 4 && res.rows[0] && Number(res.rows[0][3] || res.rows[0][2] || 0) >= 1299,
    starterQuery: "SELECT * FROM produtos WHERE preco > 300 ORDER BY preco DESC;",
    xp: 50
  },
  {
    id: "sql-chal-2",
    title: "2. Total de Pedidos Concluídos",
    difficulty: "medium",
    description: "Encontre todos os pedidos com status 'pago' (SELECT * FROM pedidos WHERE status = 'pago').",
    hint: "Use WHERE status = 'pago'",
    expectedQueryRegex: /where\s+status\s*=\s*['"]pago['"]/i,
    validateResult: (res) => res.rowCount === 5,
    starterQuery: "SELECT * FROM pedidos WHERE status = 'pago';",
    xp: 75
  },
  {
    id: "sql-chal-3",
    title: "3. Clientes com Compras (INNER JOIN)",
    difficulty: "hard",
    description: "Junte as tabelas usuarios e pedidos para listar o nome do cliente e o total do pedido (SELECT usuarios.nome, pedidos.total FROM usuarios INNER JOIN pedidos ON usuarios.id = pedidos.usuario_id).",
    hint: "Utilize INNER JOIN pedidos ON usuarios.id = pedidos.usuario_id",
    expectedQueryRegex: /join\s+pedidos\s+on\s+.*usuario_id/i,
    validateResult: (res) => res.rowCount >= 7,
    starterQuery: "SELECT usuarios.nome, pedidos.total FROM usuarios INNER JOIN pedidos ON usuarios.id = pedidos.usuario_id;",
    xp: 120
  }
];
