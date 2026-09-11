"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Code2,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/GithubIcon";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao registrar usuário.");
      } else {
        setSuccess(true);
        // Tenta fazer login imediato com as credenciais cadastradas
        setTimeout(async () => {
          await signIn("credentials", {
            email,
            password,
            callbackUrl: "/profile",
          });
        }, 1200);
      }
    } catch {
      setError("Ocorreu um erro ao processar sua solicitação.");
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
            Crie sua conta
          </h1>
          <p className="text-xs text-slate-400">
            Comece a evoluir suas habilidades práticas hoje mesmo.
          </p>
        </div>

        {/* Card de Cadastro */}
        <div className="p-8 rounded-3xl bg-surface/90 border border-surface-border shadow-2xl space-y-6">
          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Conta criada com sucesso!</h3>
              <p className="text-xs text-slate-300">
                Redirecionando você para o seu novo perfil de desenvolvedor...
              </p>
            </div>
          ) : (
            <>
              {/* Cadastro com GitHub */}
              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/profile" })}
                className="w-full py-2.5 px-4 rounded-xl border border-surface-border bg-surface hover:bg-surface-hover text-white text-xs font-semibold flex items-center justify-center gap-2.5 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Cadastrar com GitHub</span>
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-surface-border w-full" />
                <span className="bg-surface px-3 text-[11px] font-mono uppercase text-slate-500 absolute">
                  ou com email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu Nome ou Apelido"
                  className="w-full bg-[#070A10] text-slate-200 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-surface-border focus:outline-none focus:border-primary-500 placeholder:text-slate-600"
                />
              </div>

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
                  Senha (mínimo 6 caracteres)
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

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                <span>{isLoading ? "Criando Conta..." : "Cadastrar Gratuitamente"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        )}


          {/* Rodapé */}
          <div className="pt-2 text-center text-xs text-slate-400">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-primary-400 hover:text-primary-300 font-semibold underline">
              Entrar agora
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
