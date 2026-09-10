"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  Share2,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  QrCode,
  Calendar,
  Clock,
  Code2,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CertificateViewProps {
  certificateId: string;
}

export function CertificateView({ certificateId }: CertificateViewProps) {
  const [copied, setCopied] = useState(false);

  // Dados mockados determinísticos baseados no ID ou padrão
  const studentName = "Henrique Silva";
  const courseTitle = "Especialista em Estruturas de Dados, Pilhas & Algoritmos Full Stack";
  const issueDate = "10 de Setembro de 2026";
  const totalHours = "60 Horas de Prática Intensiva";
  const credentialUrl = typeof window !== "undefined" ? window.location.href : `https://devquest-zeta.vercel.app/certificate/${certificateId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(credentialUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // URL para adicionar licença diretamente no perfil do LinkedIn
  const linkedInShareUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    courseTitle
  )}&organizationName=${encodeURIComponent("DevQuest Pro")}&issueYear=2026&issueMonth=9&certUrl=${encodeURIComponent(
    credentialUrl
  )}&certId=${encodeURIComponent(certificateId)}`;

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Barra de Ações do Certificado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6 print:hidden">
        <Link href="/profile" className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar ao Perfil</span>
        </Link>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button variant="secondary" size="sm" onClick={handleCopyLink} className="font-mono text-xs gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copiado!" : "Copiar Link"}</span>
          </Button>

          <Button variant="secondary" size="sm" onClick={handlePrint} className="font-mono text-xs gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / PDF</span>
          </Button>

          <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="sm" className="font-mono text-xs gap-1.5 bg-[#0A66C2] hover:bg-[#084e96] text-white border-transparent shadow-glow">
              <Share2 className="w-3.5 h-3.5" />
              <span>Adicionar ao LinkedIn</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Cartão Oficial do Certificado */}
      <div className="relative bg-gradient-to-b from-[#0A0F1D] via-[#070A14] to-[#04060C] border-4 border-amber-500/50 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-10 overflow-hidden print:border-slate-800 print:p-8">
        {/* Marca d'água / Ornamentos de Fundo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Borda interna decorativa */}
        <div className="border border-amber-500/20 rounded-2xl p-6 sm:p-10 space-y-8 relative backdrop-blur-sm">
          {/* Topo do Certificado */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-surface-border/60 pb-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-primary-500 to-accent-500 p-0.5 shadow-glow">
                <div className="w-full h-full bg-[#070A14] rounded-[14px] flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-black text-xl tracking-wider text-white uppercase font-mono flex items-center gap-1.5">
                  DevQuest
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    ACADEMY
                  </span>
                </span>
                <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">
                  Certificado Oficial de Conclusão
                </span>
              </div>
            </div>

            <div className="text-right font-mono text-xs space-y-1">
              <div className="text-slate-500 text-[10px] uppercase tracking-wider">Código de Verificação</div>
              <div className="text-amber-400 font-bold bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-400/30">
                {certificateId}
              </div>
            </div>
          </div>

          {/* Corpo do Certificado */}
          <div className="text-center space-y-6 py-4">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Certificamos solenemente que
            </p>

            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 tracking-tight">
              {studentName}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              concluiu com êxito todas as missões teóricas, testes de código automatizados e entrevistas técnicas simuladas da trilha de:
            </p>

            <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#0B1020] border border-cyan-500/40 shadow-glow max-w-2xl">
              <h2 className="text-lg sm:text-xl font-extrabold text-cyan-300">
                {courseTitle}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Foco em Complexidade de Tempo O(N), Estrutura de Dados Pilha (Stack LIFO), Fila (FIFO), Métodos de Array Imutáveis e Algoritmos de Entrevistas.
              </p>
            </div>
          </div>

          {/* Rodapé com Assinatura, QR Code e Selo de Autenticidade */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-surface-border/60 items-center text-center sm:text-left">
            {/* Metadados */}
            <div className="space-y-1.5 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Emissão: {issueDate}</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Carga Horária: {totalHours}</span>
              </div>
            </div>

            {/* Selo Central Holográfico */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 p-0.5 shadow-glow animate-pulse">
                <div className="w-full h-full bg-[#070A14] rounded-full flex items-center justify-center flex-col">
                  <ShieldCheck className="w-7 h-7 text-amber-400" />
                </div>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                Autenticado na Rede
              </span>
            </div>

            {/* Assinatura Digital */}
            <div className="text-center sm:text-right font-mono space-y-1">
              <div className="border-b border-slate-600 pb-1 text-sm font-serif italic text-white">
                DevQuest Education Board
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                Conselho Pedagógico & Engenharia
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
