export interface CheatItem {
  name: string;
  syntax: string;
  description: string;
  example: string;
  outputOrNotes?: string;
  playgroundSnippet?: {
    html: string;
    css: string;
    js: string;
  };
}

export interface CheatCategory {
  id: string;
  title: string;
  badge: string;
  description: string;
  items: CheatItem[];
}

export const mockCheatCategories: CheatCategory[] = [
  {
    id: "js-arrays",
    title: "JavaScript: Métodos de Array",
    badge: "JavaScript",
    description: "Referência rápida dos métodos mais importantes para iterar, transformar e filtrar arrays.",
    items: [
      {
        name: ".map()",
        syntax: "array.map((item, index) => novoItem)",
        description: "Cria um novo array com os resultados da chamada de uma função para cada elemento.",
        example: `const numeros = [1, 2, 3, 4];
const dobrados = numeros.map(n => n * 2);
console.log(dobrados);`,
        outputOrNotes: "[2, 4, 6, 8] (Não altera o array original)",
        playgroundSnippet: {
          html: `<div id="app"><h2>Array.map()</h2><ul id="list"></ul></div>`,
          css: `body { background: #0f172a; color: #fff; font-family: sans-serif; padding: 20px; }
li { color: #38bdf8; margin: 4px 0; }`,
          js: `const nums = [10, 20, 30, 40];
const list = document.getElementById('list');
nums.map(n => n * 2).forEach(val => {
  const li = document.createElement('li');
  li.innerText = 'Dobro: ' + val;
  list.appendChild(li);
});`
        }
      },
      {
        name: ".filter()",
        syntax: "array.filter(item => condicaoBooleana)",
        description: "Retorna um novo array contendo apenas os elementos que satisfazem a condição.",
        example: `const idades = [12, 18, 25, 14, 30];
const maiores = idades.filter(i => i >= 18);
console.log(maiores);`,
        outputOrNotes: "[18, 25, 30]"
      },
      {
        name: ".reduce()",
        syntax: "array.reduce((acc, curr) => novoAcc, valorInicial)",
        description: "Reduz o array a um único valor acumulando cada elemento.",
        example: `const carrinho = [15.5, 40.0, 9.9];
const total = carrinho.reduce((acc, preco) => acc + preco, 0);
console.log(total);`,
        outputOrNotes: "65.4"
      },
      {
        name: ".find() & .findIndex()",
        syntax: "array.find(item => item.id === target)",
        description: "Retorna o primeiro elemento que atende à condição (ou undefined se não existir).",
        example: `const users = [{ id: 1, nome: "Ana" }, { id: 2, nome: "Beto" }];
const user = users.find(u => u.id === 2);
console.log(user);`,
        outputOrNotes: "{ id: 2, nome: 'Beto' }"
      },
      {
        name: ".slice() vs .splice()",
        syntax: "array.slice(inicio, fim) | array.splice(inicio, qtd, ...novos)",
        description: "slice é IMUTÁVEL (copia trecho); splice é MUTÁVEL (remove ou insere no array original).",
        example: `const arr = ['a', 'b', 'c', 'd'];
const fatia = arr.slice(1, 3); // ['b', 'c'] (arr intacto)
arr.splice(1, 1); // remove 'b' (arr agora é ['a', 'c', 'd'])`,
        outputOrNotes: "Prefira .slice() no React para preservar imutabilidade."
      }
    ]
  },
  {
    id: "css-flexbox",
    title: "CSS: Flexbox Layout",
    badge: "CSS",
    description: "Guia definitivo das propriedades fundamentais para alinhar e distribuir elementos com flexbox.",
    items: [
      {
        name: "justify-content (Eixo Principal)",
        syntax: "justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly;",
        description: "Controla o alinhamento horizontal dos filhos (ou vertical se flex-direction for column).",
        example: `.container {
  display: flex;
  justify-content: space-between;
}`,
        outputOrNotes: "space-between coloca o primeiro e último item nas bordas.",
        playgroundSnippet: {
          html: `<div class="container">
  <div class="box">Item 1</div>
  <div class="box">Item 2</div>
  <div class="box">Item 3</div>
</div>`,
          css: `body { background: #030712; padding: 30px; font-family: sans-serif; }
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 20px;
  border-radius: 16px;
  height: 120px;
}
.box {
  background: #6366f1;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  font-weight: bold;
}`,
          js: `console.log("Flexbox interativo carregado!");`
        }
      },
      {
        name: "align-items (Eixo Cruzado)",
        syntax: "align-items: stretch | center | flex-start | flex-end | baseline;",
        description: "Alinha os itens no eixo perpendicular. 'center' é a forma mais fácil de centralizar verticalmente.",
        example: `.container {
  display: flex;
  height: 200px;
  align-items: center;
}`,
        outputOrNotes: "Para centralização perfeita use: justify-content: center; align-items: center;"
      },
      {
        name: "gap",
        syntax: "gap: 16px; | gap: row-gap column-gap;",
        description: "Cria espaçamento uniforme entre os itens filhos sem precisar de margins individuais.",
        example: `.grid-menu {
  display: flex;
  gap: 12px;
}`,
        outputOrNotes: "Suportado em 100% dos navegadores modernos."
      },
      {
        name: "flex: 1 (Crescimento Dinâmico)",
        syntax: "flex: 1; /* equivale a flex: 1 1 0% */",
        description: "Faz o elemento ocupar todo o espaço restante disponível no container.",
        example: `.sidebar { width: 250px; }
.main-content { flex: 1; }`,
        outputOrNotes: "A área principal se ajustará à largura da janela mantendo a sidebar fixa."
      }
    ]
  },
  {
    id: "sql-essentials",
    title: "SQL: Comandos & Agregações",
    badge: "SQL",
    description: "Sintaxes essenciais para consulta em bancos de dados relacionais (PostgreSQL, MySQL, SQLite).",
    items: [
      {
        name: "INNER JOIN",
        syntax: "SELECT ... FROM tab1 INNER JOIN tab2 ON tab1.fk = tab2.pk;",
        description: "Retorna apenas as linhas onde há correspondência em ambas as tabelas.",
        example: `SELECT clientes.nome, pedidos.total
FROM clientes
INNER JOIN pedidos ON clientes.id = pedidos.cliente_id;`,
        outputOrNotes: "Exclui clientes sem pedidos e pedidos sem clientes."
      },
      {
        name: "GROUP BY com Agregação",
        syntax: "SELECT categoria, COUNT(*), AVG(preco) FROM produtos GROUP BY categoria;",
        description: "Agrupa linhas que têm os mesmos valores e permite calcular métricas como COUNT, SUM, AVG, MIN e MAX.",
        example: `SELECT categoria, AVG(preco) as media_preco
FROM produtos
GROUP BY categoria;`,
        outputOrNotes: "Toda coluna no SELECT que não seja função de agregação deve estar no GROUP BY."
      },
      {
        name: "WHERE vs HAVING",
        syntax: "WHERE condicao_linha ... HAVING condicao_grupo",
        description: "WHERE filtra antes da agregação; HAVING filtra depois do GROUP BY.",
        example: `SELECT categoria, SUM(total)
FROM vendas
WHERE status = 'concluida'
GROUP BY categoria
HAVING SUM(total) > 1000;`,
        outputOrNotes: "Use HAVING para filtrar valores calculados por SUM, COUNT, etc."
      }
    ]
  },
  {
    id: "git-essentials",
    title: "Git: Fluxo de Trabalho & Comandos",
    badge: "Git",
    description: "Comandos do dia a dia para gerenciar branches, desfazer alterações e sincronizar repositórios.",
    items: [
      {
        name: "git stash",
        syntax: "git stash | git stash pop | git stash list",
        description: "Guarda modificações não commitadas em uma pilha temporária para limpar a árvore de trabalho.",
        example: `git stash save "ajustes pendentes"
git checkout main
git pull
git checkout feature
git stash pop`,
        outputOrNotes: "Recupera os arquivos mantendo o histórico de commits intacto."
      },
      {
        name: "git cherry-pick",
        syntax: "git cherry-pick <commit-hash>",
        description: "Aplica as mudanças de um commit específico de outra ramificação para a branch atual.",
        example: `git checkout production
git cherry-pick a1b2c3d`,
        outputOrNotes: "Útil para aplicar um hotfix sem mesclar toda a branch de desenvolvimento."
      },
      {
        name: "git reset vs git revert",
        syntax: "git reset --soft/--hard HEAD~1 | git revert <hash>",
        description: "Reset reescreve o histórico local; revert cria um NOVO commit que desfaz as alterações com segurança.",
        example: `git revert HEAD # Seguro para branches compartilhadas no GitHub`,
        outputOrNotes: "Em branches públicas (ex: main), sempre use git revert para não quebrar os colegas."
      }
    ]
  },
  {
    id: "http-status",
    title: "HTTP: Códigos de Status da API",
    badge: "HTTP / REST",
    description: "Os códigos de resposta mais importantes para construir APIs RESTful profissionais.",
    items: [
      {
        name: "200 OK & 201 Created",
        syntax: "200 OK (GET/PUT) | 201 Created (POST)",
        description: "200: Sucesso geral; 201: Novo recurso criado com sucesso no banco de dados.",
        example: `res.status(201).json({ id: novoUsuario.id, message: "Criado!" });`,
        outputOrNotes: "Sempre retorne 201 ao cadastrar entidades novas."
      },
      {
        name: "400 Bad Request & 422 Unprocessable",
        syntax: "400 (Payload inválido) | 422 (Erro de validação semântica)",
        description: "Indica que o cliente enviou dados malformados ou faltando campos obrigatórios.",
        example: `res.status(400).json({ error: "O campo 'email' é obrigatório." });`,
        outputOrNotes: "Geralmente retornado por validações do Zod ou Joi."
      },
      {
        name: "401 Unauthorized vs 403 Forbidden",
        syntax: "401 (Não autenticado) | 403 (Não autorizado/permissão insuficiente)",
        description: "401: Token JWT ausente ou expirado; 403: Usuário autenticado mas sem permissão de acesso (ex: não é admin).",
        example: `if (!session) return res.status(401);
if (user.role !== 'admin') return res.status(403);`,
        outputOrNotes: "401 = Quem é você? / 403 = Você não tem permissão aqui."
      },
      {
        name: "429 Too Many Requests",
        syntax: "429 Too Many Requests (Rate Limiting)",
        description: "O cliente enviou muitas requisições em um determinado período de tempo.",
        example: `headers: { 'Retry-After': '60' }`,
        outputOrNotes: "Protege sua aplicação contra ataques DDoS e abusos de scraping."
      }
    ]
  }
];
