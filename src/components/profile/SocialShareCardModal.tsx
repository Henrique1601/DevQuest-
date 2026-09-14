"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Share2,
  Download,
  Copy,
  Check,
  Sparkles,
  Trophy,
  Flame,
  Zap,
  FolderGit2,
  ShieldCheck
} from "lucide-react";
import { sfx } from "@/lib/audio/sfx";

interface SocialShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userLevel: number;
  totalXp: number;
  solvedChallengesCount: number;
  submittedProjectsCount: number;
  streakDays: number;
}

export function SocialShareCardModal({
  isOpen,
  onClose,
  userName,
  userLevel,
  totalXp,
  solvedChallengesCount,
  submittedProjectsCount,
  streakDays,
}: SocialShareCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Desenha o Card no Canvas 1200x630
  useEffect(() => {
    if (!isOpen || !mounted) return;

    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = 1200;
      const H = 630;

      // 1. Fundo Base Escuro Cósmico
      ctx.fillStyle = "#070A10";
      ctx.fillRect(0, 0, W, H);

      // 2. Efeitos Radiais de Luz Neon
      const rad1 = ctx.createRadialGradient(1000, 120, 10, 1000, 120, 500);
      rad1.addColorStop(0, "rgba(6, 182, 212, 0.28)");
      rad1.addColorStop(1, "rgba(6, 182, 212, 0)");
      ctx.fillStyle = rad1;
      ctx.fillRect(0, 0, W, H);

      const rad2 = ctx.createRadialGradient(200, 500, 10, 200, 500, 450);
      rad2.addColorStop(0, "rgba(168, 85, 247, 0.22)");
      rad2.addColorStop(1, "rgba(168, 85, 247, 0)");
      ctx.fillStyle = rad2;
      ctx.fillRect(0, 0, W, H);

      // 3. Grid Cibernético de Pontos
      ctx.fillStyle = "rgba(148, 163, 184, 0.08)";
      for (let x = 30; x < W; x += 30) {
        for (let y = 30; y < H; y += 30) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Borda do Card com Gradiente e Cantos Arredondados
      ctx.lineWidth = 4;
      const borderGrad = ctx.createLinearGradient(0, 0, W, H);
      borderGrad.addColorStop(0, "#06b6d4");
      borderGrad.addColorStop(0.5, "#3b82f6");
      borderGrad.addColorStop(1, "#a855f7");
      ctx.strokeStyle = borderGrad;
      ctx.strokeRect(16, 16, W - 32, H - 32);

      // 5. Header / Marca DevQuest Pro
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 24px monospace";
      ctx.fillText("DEVQUEST PRO", 60, 75);

      ctx.fillStyle = "#06b6d4";
      ctx.font = "bold 13px monospace";
      ctx.fillText("CAREER & SKILLS PASSPORT", 60, 98);

      // Selo de Desenvolvedor Verificado no Canto Superior Direito
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(W - 270, 52, 210, 38, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#34d399";
      ctx.font = "bold 12px monospace";
      ctx.fillText("✓ VERIFIED DEVELOPER", W - 250, 76);

      // 6. Avatar e Identidade do Desenvolvedor
      const avatarX = 120;
      const avatarY = 200;
      const avatarR = 50;

      // Círculo com brilho neon para o avatar
      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
      const avGrad = ctx.createLinearGradient(avatarX - 50, avatarY - 50, avatarX + 50, avatarY + 50);
      avGrad.addColorStop(0, "#06b6d4");
      avGrad.addColorStop(1, "#a855f7");
      ctx.fillStyle = avGrad;
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      // Letra inicial do nome dentro do avatar
      ctx.fillStyle = "#070A10";
      ctx.font = "900 44px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(userName.charAt(0).toUpperCase(), avatarX, avatarY);
      ctx.restore();

      // Nome do usuário
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px sans-serif";
      ctx.fillText(userName, 195, 190);

      // Nível e Cargo
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 16px monospace";
      ctx.fillText(`NÍVEL ${userLevel} • SOFTWARE DEVELOPER EXPLORER`, 195, 222);

      // 7. Grid com 4 Cards de Conquistas Glassmorphism
      const cards = [
        { label: "EXPERIÊNCIA TOTAL", value: `${totalXp} XP`, sub: "Nível de Maestria", color: "#38bdf8" },
        { label: "DESAFIOS VENCIDOS", value: `${solvedChallengesCount}`, sub: "Algoritmos Aprovados", color: "#34d399" },
        { label: "PROJETOS ENTREGUES", value: `${submittedProjectsCount}`, sub: "Aplicações no GitHub", color: "#a855f7" },
        { label: "OFENSIVA CONTÍNUA", value: `${streakDays} DIAS`, sub: "Foco e Disciplina", color: "#fb923c" },
      ];

      const cardW = 250;
      const cardH = 150;
      const startX = 60;
      const cardY = 285;
      const gap = 36;

      cards.forEach((c, idx) => {
        const cx = startX + idx * (cardW + gap);

        // Fundo do Card
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = "rgba(51, 65, 85, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cx, cardY, cardW, cardH, 18);
        ctx.fill();
        ctx.stroke();

        // Linha de Destaque Superior
        ctx.strokeStyle = c.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + 20, cardY);
        ctx.lineTo(cx + cardW - 20, cardY);
        ctx.stroke();

        // Rótulo
        ctx.fillStyle = "#94a3b8";
        ctx.font = "bold 11px monospace";
        ctx.fillText(c.label, cx + 20, cardY + 38);

        // Valor principal
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px monospace";
        ctx.fillText(c.value, cx + 20, cardY + 84);

        // Subtítulo
        ctx.fillStyle = c.color;
        ctx.font = "12px sans-serif";
        ctx.fillText(c.sub, cx + 20, cardY + 120);
      });

      // 8. Tags de Competências Comprovadas (Badges)
      const tags = ["Clean Code", "Next.js 16", "TypeScript", "Algoritmos & Big-O", "Git & Branches"];
      let tagX = 60;
      const tagY = 490;

      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 11px monospace";
      ctx.fillText("COMPETÊNCIAS VALIDADAS:", tagX, tagY - 14);

      tags.forEach((tag) => {
        ctx.font = "bold 12px monospace";
        const textWidth = ctx.measureText(tag).width;
        const pillW = textWidth + 24;

        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        ctx.strokeStyle = "rgba(71, 85, 105, 0.8)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(tagX, tagY, pillW, 30, 8);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(tag, tagX + 12, tagY + 20);

        tagX += pillW + 12;
      });

      // 9. Rodapé com Link e Código de Verificação
      const hashId = `DQ-${Math.abs(userLevel * 73 + totalXp + streakDays * 17)
        .toString(16)
        .toUpperCase()}`;

      ctx.fillStyle = "#64748b";
      ctx.font = "11px monospace";
      ctx.fillText("devquest.pro • Plataforma de Estudos em Programação & Desafios", 60, 585);

      ctx.textAlign = "right";
      ctx.fillText(`HASH DE VALIDAÇÃO: ${hashId}`, W - 60, 585);
      ctx.textAlign = "left";
    }, 50);

    return () => clearTimeout(timer);
  }, [isOpen, mounted, userName, userLevel, totalXp, solvedChallengesCount, submittedProjectsCount, streakDays]);

  if (!isOpen || !mounted) return null;

  const socialPostText = `🚀 Mais um marco na minha jornada de desenvolvimento de software!

Conquistei o Nível ${userLevel} na plataforma DevQuest Pro:
⚡ ${totalXp} XP acumulados
🧩 ${solvedChallengesCount} desafios técnicos de algoritmos resolvidos
🛠️ ${submittedProjectsCount} projetos práticos completos no portfólio
🔥 ${streakDays} dias de ofensiva contínua de código

Continuo focado em aprimorar minhas habilidades em Clean Code, arquitetura de sistemas e resolução de problemas reais.

#DevQuest #Programação #DesenvolvimentoWeb #NextJS #TypeScript #CleanCode #CarreiraTech`;

  const handleDownloadImage = () => {
    sfx.playClickSfx();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `devquest-card-${userName.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopiedImage(true);
        sfx.playSuccessChime();
        setTimeout(() => setCopiedImage(false), 2500);
      }, "image/png");
    } catch (err) {
      console.error("Falha ao copiar imagem:", err);
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(socialPostText);
      setCopiedText(true);
      sfx.playSuccessChime();
      setTimeout(() => setCopiedText(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div className="w-full max-w-4xl bg-surface border border-surface-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header do Modal */}
        <div className="p-5 border-b border-surface-border flex items-center justify-between bg-[#0B1120] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Card Social de Conquistas em Alta Resolução
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono border border-purple-500/30">
                  1200 x 630 PNG
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Pronto para compartilhar no LinkedIn, X e portfólio
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-surface-border hover:border-slate-500 text-slate-400 hover:text-white transition-colors"
            title="Fechar (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal: Preview do Canvas */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#04060c] space-y-6 flex flex-col items-center">
          {/* Canvas responsivo visualmente via CSS */}
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-surface-border shadow-2xl bg-[#070A10]">
            <canvas
              ref={canvasRef}
              width={1200}
              height={630}
              className="w-full h-auto block"
            />
          </div>

          {/* Preview do Texto para Postar */}
          <div className="w-full max-w-2xl p-4 rounded-2xl bg-[#0B1120] border border-surface-border space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Share2 className="w-4 h-4" /> Texto Sugerido para Publicação
              </span>
              <button
                onClick={handleCopyText}
                className="text-cyan-400 hover:underline font-mono text-[11px] flex items-center gap-1"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? "Texto Copiado!" : "Copiar Texto"}</span>
              </button>
            </div>
            <p className="text-slate-400 whitespace-pre-line font-mono text-[11px] leading-relaxed bg-[#070A10] p-3 rounded-xl border border-surface-border/50">
              {socialPostText}
            </p>
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="p-4 border-t border-surface-border bg-[#0B1120] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Formato padrão OpenGraph (1.91:1) otimizado para redes sociais
          </span>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={handleCopyImage}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                copiedImage
                  ? "bg-emerald-500 text-black"
                  : "bg-surface hover:bg-surface-hover text-white border border-surface-border"
              }`}
            >
              {copiedImage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedImage ? "Imagem Copiada!" : "Copiar Imagem"}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black flex items-center gap-2 transition-colors shadow-glow font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Baixar PNG (1200x630)</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
