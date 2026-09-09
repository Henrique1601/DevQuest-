"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Code2,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Email ou senha incorretos. Tente novamente ou use a conta de demonstração.");
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch (err: any) {
      setError("Ocorreu um erro ao tentar entrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/profile" });
  };

  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await signIn("credentials", {
        email: "demo@devquest.com",
        password: "senha123",
        redirect: false,
      });

      if (res?.error) {
        setError("Erro ao autenticar com a conta demo.");
      } else {
        router.push("/profile");
        router.refresh();
      }
    } catch {
      setError("Erro ao conectar conta demo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-accent-500 flex items-center justify-center text-white shadow-glow">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DevQuest</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Bem-vindo de volta!
          </h1>
          <p className="text-xs text-slate-400">
            Acesse seus projetos, submissões na Arena e progresso de XP.
          </p>
        </div>

        {/* Card de Login */}
        <div className="p-8 rounded-3xl bg-surface/90 border border-surface-border shadow-2xl space-y-6">
          {/* Botões Sociais */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleOAuthLogin("github")}
              className="w-full py-2.5 px-4 rounded-xl border border-surface-border bg-surface hover:bg-surface-hover text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Continuar com GitHub</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthLogin("google")}
              className="w-full py-2.5 px-4 rounded-xl border border-surface-border bg-surface hover:bg-surface-hover text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Continuar com Google</span>
            </button>
          </div>

          {/* Divisor */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-surface-border w-full" />
            <span className="bg-surface px-3 text-[11px] font-mono uppercase text-slate-500 absolute">
              ou com email
            </span>
          </div>

          {/* Atalho de Demonstração Rápida */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/25 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary-400" />
              <div className="text-left">
                <div className="text-xs font-semibold text-white">Conta Demo Pronta</div>
                <div className="text-[10px] font-mono text-slate-400">demo@devquest.com</div>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="text-xs font-mono shrink-0"
            >
              Testar Demo
            </Button>
          </div>

          {/* Formulário Tradicional */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full bg-[#070A10] text-slate-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#070A10] text-slate-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 placeholder:text-slate-600"
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isLoading}
              className="w-full font-semibold mt-2 shadow-glow"
            >
              <span>{isLoading ? "Entrando..." : "Entrar na Plataforma"}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Rodapé do Card */}
          <div className="pt-2 text-center text-xs text-slate-400">
            Não tem uma conta ainda?{" "}
            <Link href="/register" className="text-primary-400 hover:text-primary-300 font-semibold underline">
              Cadastre-se gratuitamente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
