import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db, hasDbConnection } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Todos os campos (nome, email e senha) são obrigatórios." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    // Se conectado ao Neon Postgres
    if (hasDbConnection && db) {
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, normalizedEmail))
        .limit(1);

      if (existing.length > 0) {
        return NextResponse.json(
          { error: "Este email já está cadastrado na plataforma." },
          { status: 409 }
        );
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const [newUser] = await db
        .insert(users)
        .values({
          name: name.trim(),
          email: normalizedEmail,
          passwordHash,
          xp: 0,
          level: 1,
        })
        .returning();

      return NextResponse.json(
        { message: "Usuário criado com sucesso!", userId: newUser.id },
        { status: 201 }
      );
    }

    // Modo Fallback (quando DATABASE_URL ainda não foi configurada localmente)
    return NextResponse.json(
      {
        message: "Cadastro concluído em modo de desenvolvimento local! Você já pode entrar com suas credenciais.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erro no cadastro de usuário:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar conta." },
      { status: 500 }
    );
  }
}
