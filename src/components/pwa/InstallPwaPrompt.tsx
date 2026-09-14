"use client";

import React, { useState, useEffect } from "react";
import { Download, X, WifiOff, Smartphone, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPwaPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // 1. Registro do Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch((err) => {
          console.warn("[SW] Registro de Service Worker:", err);
        });
      });
    }

    // 2. Monitor de Status Online / Offline
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    updateOnlineStatus();
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // 3. Captura do Evento de Instalação PWA
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Não exibe se o usuário já dispensou nesta sessão
      const dismissed = sessionStorage.getItem("devquest_pwa_dismissed");
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("devquest_pwa_dismissed", "true");
  };

  return (
    <>
      {/* Alerta de Modo Offline */}
      {isOffline && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-500/90 text-black px-4 py-2 rounded-full font-mono text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce backdrop-blur-md">
          <WifiOff className="w-4 h-4" />
          <span>Modo Offline Ativo: Cheatsheets e Quizzes em cache continuam funcionando</span>
        </div>
      )}

      {/* Banner Flutuante de Instalação do App */}
      {showPrompt && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-[#0B1120]/95 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  Instale o DevQuest Pro
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                    PWA
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Adicione o app à tela inicial para acesso instantâneo, visualizador de Git e estudos offline.
                </p>
              </div>
            </div>

            <button
              onClick={handleDismiss}
              className="text-slate-500 hover:text-slate-300 p-1 transition-colors"
              title="Dispensar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-surface-border flex items-center justify-end gap-2 text-xs">
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              Mais tarde
            </button>
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 transition-colors shadow-glow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar Agora</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
