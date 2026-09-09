import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";
import { users, accounts, projectCompletions } from "@/lib/db/schema";

describe("Autenticação e Criptografia", () => {
  it("deve validar hash e comparação de senha com bcryptjs", async () => {
    const rawPassword = "minhaSenhaSuperSegura123!";
    const hash = await bcrypt.hash(rawPassword, 10);

    expect(hash).not.toBe(rawPassword);
    expect(hash.length).toBeGreaterThan(20);

    const isMatch = await bcrypt.compare(rawPassword, hash);
    expect(isMatch).toBe(true);

    const wrongMatch = await bcrypt.compare("senhaErrada", hash);
    expect(wrongMatch).toBe(false);
  });

  it("tabelas de banco devem possuir os campos necessários para autenticação", () => {
    expect(users.passwordHash).toBeDefined();
    expect(users.email).toBeDefined();
    expect(accounts.userId).toBeDefined();
    expect(accounts.provider).toBeDefined();
    expect(projectCompletions.projectSlug).toBeDefined();
  });
});
