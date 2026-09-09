import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db, hasDbConnection } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET || "devquest-development-secret-key-32ch-min",
  session: {
    strategy: "jwt",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || process.env.GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || process.env.GITHUB_SECRET || "",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        // Usuário Demonstração Resiliente (para testes rápidos ou quando Neon não estiver com chaves no .env)
        if (email === "demo@devquest.com" && password === "senha123") {
          return {
            id: "demo-user-0001",
            name: "Dev Explorer (Demo)",
            email: "demo@devquest.com",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
          };
        }

        // Validação no Neon Postgres se conectado
        if (hasDbConnection && db) {
          try {
            const foundUsers = await db.select().from(users).where(eq(users.email, email)).limit(1);
            const user = foundUsers[0];

            if (user && user.passwordHash) {
              const passwordMatch = await bcrypt.compare(password, user.passwordHash);
              if (passwordMatch) {
                return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  image: user.avatarUrl,
                };
              }
            }
          } catch (error) {
            console.error("Erro ao autenticar usuário no banco Neon:", error);
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
