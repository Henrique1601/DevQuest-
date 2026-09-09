import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

export const hasDbConnection = !!connectionString;

// Cliente seguro com fallback para evitar quebra durante o build se DATABASE_URL ainda não estiver preenchido
export const db = connectionString
  ? drizzle(neon(connectionString), { schema })
  : (null as unknown as ReturnType<typeof drizzle<typeof schema>>);
