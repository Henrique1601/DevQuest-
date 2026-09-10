export interface Snippet {
  id: string;
  title: string;
  description: string;
  category: "Hooks" | "Utils" | "Database" | "Validations" | "Performance";
  language: "typescript" | "javascript" | "sql";
  tags: string[];
  code: string;
  usage: string;
}

export const mockSnippets: Snippet[] = [
  {
    id: "use-debounce",
    title: "useDebounce Hook",
    description: "Atrasa a atualização de um estado até que o usuário pare de digitar pelo intervalo definido. Ideal para campos de busca com autocompletion.",
    category: "Hooks",
    language: "typescript",
    tags: ["React", "Custom Hook", "Performance", "Input"],
    code: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}`,
    usage: `// Exemplo em um componente de busca:
const [search, setSearch] = useState("");
const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  if (debouncedSearch) {
    fetchResults(debouncedSearch);
  }
}, [debouncedSearch]);`
  },
  {
    id: "use-local-storage",
    title: "useLocalStorage com Sync Entre Abas",
    description: "Hook seguro para persistir estado no localStorage com parsing de JSON automático e listener para sincronizar quando outra aba atualizar o storage.",
    category: "Hooks",
    language: "typescript",
    tags: ["React", "Storage", "State Management", "Browser"],
    code: `import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(\`Erro ao ler localStorage chave "\${key}":\`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === "undefined") return;
      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        window.dispatchEvent(new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) }));
      } catch (error) {
        console.warn(\`Erro ao salvar localStorage chave "\${key}":\`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue) as T);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}`,
    usage: `const [theme, setTheme] = useLocalStorage<"dark" | "light">("app-theme", "dark");

return (
  <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
    Tema atual: {theme}
  </button>
);`
  },
  {
    id: "cpf-validator",
    title: "Validador e Formatador de CPF",
    description: "Algoritmo oficial com checagem dos 2 dígitos verificadores e função de máscara para formatação (000.000.000-00).",
    category: "Validations",
    language: "typescript",
    tags: ["Brasil", "Regex", "Formulários", "Algoritmos"],
    code: `export function isValidCPF(cpf: string): boolean {
  const clean = cpf.replace(/\\D/g, "");

  if (clean.length !== 11) return false;
  // Elimina CPFs invalidos com todos os numeros iguais (111.111.111-11, etc)
  if (/^(\\d)\\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10), 10)) return false;

  return true;
}

export function maskCPF(cpf: string): string {
  const clean = cpf.replace(/\\D/g, "").slice(0, 11);
  return clean
    .replace(/^(\\d{3})(\\d)/, "$1.$2")
    .replace(/^(\\d{3})\\.(\\d{3})(\\d)/, "$1.$2.$3")
    .replace(/\\.(\\d{3})(\\d)/, ".$1-$2");
}`,
    usage: `if (!isValidCPF(form.cpf)) {
  alert("CPF inválido!");
} else {
  console.log("CPF formatado:", maskCPF(form.cpf));
}`
  },
  {
    id: "currency-brl-formatter",
    title: "Formatador de Moeda BRL e Percentual",
    description: "Formatação performática utilizando a API nativa Intl.NumberFormat sem dependências externas.",
    category: "Utils",
    language: "typescript",
    tags: ["Intl", "E-commerce", "Finanças", "BRL"],
    code: `const brlCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBRL(amountInCentsOrNumber: number, isCents = false): string {
  const val = isCents ? amountInCentsOrNumber / 100 : amountInCentsOrNumber;
  return brlCurrencyFormatter.format(val);
}

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
});

export function formatPercent(rate: number): string {
  // rate: 0.15 => "15,0%"
  return percentFormatter.format(rate);
}`,
    usage: `formatBRL(1250.5); // "R$ 1.250,50"
formatBRL(4990, true); // "R$ 49,90" (recebendo centavos do Stripe/Pagarme)
formatPercent(0.125); // "12,5%"`
  },
  {
    id: "slug-generator",
    title: "Gerador de Slugs Amigáveis (PT-BR)",
    description: "Converte títulos em URLs limpas e otimizadas para SEO, tratando acentos (á, ç, õ), símbolos especiais e múltiplos hifens.",
    category: "Utils",
    language: "typescript",
    tags: ["SEO", "Strings", "Blog", "URLs"],
    code: `export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // Decompõe caracteres acentuados
    .replace(/[\\u0300-\\u036f]/g, "") // Remove marcas diacríticas
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "") // Remove caracteres especiais
    .replace(/\\s+/g, "-") // Troca espaços por hifens
    .replace(/-+/g, "-"); // Remove múltiplos hifens consecutivos
}`,
    usage: `slugify("Curso de Next.js 16 & Drizzle ORM: O Guia Definitivo!");
// Resultado: "curso-de-nextjs-16-drizzle-orm-o-guia-definitivo"`
  },
  {
    id: "relative-time-formatter",
    title: "Tempo Relativo (\"há 5 minutos\") com Intl",
    description: "Calcula e exibe quanto tempo passou desde uma data ('há 2 horas', 'há 3 dias', 'ontem') sem bibliotecas pesadas como momentjs.",
    category: "Utils",
    language: "typescript",
    tags: ["Intl", "Datas", "UI", "Feeds"],
    code: `export function formatRelativeTime(date: Date | string | number): string {
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  const timeMs = typeof date === "number" ? date : new Date(date).getTime();
  const diffSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ] as const;

  for (const { unit, seconds } of cutoffs) {
    if (Math.abs(diffSeconds) >= seconds || unit === "second") {
      const value = Math.round(diffSeconds / seconds);
      return rtf.format(value, unit);
    }
  }

  return "agora mesmo";
}`,
    usage: `formatRelativeTime(new Date(Date.now() - 1000 * 60 * 12)); // "há 12 minutos"
formatRelativeTime(new Date(Date.now() - 1000 * 60 * 60 * 24)); // "ontem"`
  },
  {
    id: "neon-drizzle-client",
    title: "Setup de Conexão Neon Postgres + Drizzle ORM",
    description: "Configuração singleton pronta para uso no Next.js App Router e Server Actions com pool HTTP serverless.",
    category: "Database",
    language: "typescript",
    tags: ["Neon", "Postgres", "Drizzle", "Backend"],
    code: `import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Cria cliente SQL serverless com suporte a scale-to-zero
const sql = neon(process.env.DATABASE_URL);

// Exporta instância do Drizzle tipada com o schema
export const db = drizzle(sql, { schema });`,
    usage: `import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
  });
}`
  },
  {
    id: "in-memory-rate-limiter",
    title: "Rate Limiter em Memória para Rotas Next.js",
    description: "Proteja endpoints de API contra spam e ataques de força bruta com um algoritmo simples de Sliding Window / Token Bucket em memória.",
    category: "Performance",
    language: "typescript",
    tags: ["Segurança", "API", "Next.js", "Backend"],
    code: `interface RateLimitTracker {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitTracker>();

export function checkRateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1, resetInMs: windowMs };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0, resetInMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count, resetInMs: entry.resetAt - now };
}`,
    usage: `// Em um Route Handler (app/api/contact/route.ts):
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "anonymous";
  const { allowed, remaining, resetInMs } = checkRateLimit(ip, 5, 60000); // 5 req/minuto

  if (!allowed) {
    return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em breve." }), {
      status: 429,
      headers: { "Retry-After": Math.ceil(resetInMs / 1000).toString() }
    });
  }

  // Prosseguir com o processamento
}`
  }
];

export function isValidCPF(cpf: string): boolean {
  const clean = cpf.replace(/\D/g, "");

  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i), 10) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9), 10)) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i), 10) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10), 10)) return false;

  return true;
}

export function maskCPF(cpf: string): string {
  const clean = cpf.replace(/\D/g, "").slice(0, 11);
  return clean
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatBRL(amountInCentsOrNumber: number, isCents = false): string {
  const val = isCents ? amountInCentsOrNumber / 100 : amountInCentsOrNumber;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(val);
}

