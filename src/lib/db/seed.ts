import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { mockProjects } from "../data/projects";
import { mockChallenges } from "../data/challenges";

async function seed() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL não configurada.");
    process.exit(1);
  }

  const sql = neon(connectionString);
  const db = drizzle(sql, { schema });

  console.log("Iniciando seed no Neon Postgres...");

  // Inserir projetos
  for (const p of mockProjects) {
    await db.insert(schema.projects).values({
      id: p.id,
      slug: p.slug,
      title: p.title,
      tagline: p.tagline,
      description: p.description,
      difficulty: p.difficulty,
      category: p.category,
      estimatedHours: p.estimatedHours,
      tags: p.tags,
      features: p.features,
    }).onConflictDoNothing();
  }

  // Inserir desafios
  for (const c of mockChallenges) {
    await db.insert(schema.challenges).values({
      id: c.id,
      slug: c.slug,
      title: c.title,
      difficulty: c.difficulty,
      category: c.category,
      xp: c.xp,
      description: c.description,
      starterCode: c.starterCode,
      functionName: c.functionName,
      testCases: c.testCases,
    }).onConflictDoNothing();
  }

  console.log("Seed concluído com sucesso!");
}

seed().catch(err => {
  console.error("Erro no seed:", err);
  process.exit(1);
});
