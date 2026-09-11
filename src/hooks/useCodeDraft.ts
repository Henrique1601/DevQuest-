import { useState, useEffect, useCallback, useRef } from "react";

export function useCodeDraft(challengeId: string, starterCode: string, language = "javascript") {
  const [code, setCode] = useState<string>(starterCode);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const isInitialMount = useRef(true);
  const storageKey = `devquest_draft_${challengeId}_${language}`;

  // Restaura rascunho ao trocar de desafio ou linguagem
  useEffect(() => {
    isInitialMount.current = true;
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem(storageKey);
      if (savedDraft && savedDraft.trim().length > 0) {
        setCode(savedDraft);
        setIsSaved(true);
      } else {
        setCode(starterCode);
        setIsSaved(false);
      }
    } else {
      setCode(starterCode);
    }
  }, [challengeId, language, starterCode, storageKey]);

  // Salva rascunho com debounce de 800ms
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setIsSaved(false);
    const timeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        if (code !== starterCode) {
          localStorage.setItem(storageKey, code);
        } else {
          localStorage.removeItem(storageKey);
        }
        setIsSaved(true);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, [code, starterCode, storageKey]);

  const resetToStarter = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
    setCode(starterCode);
    setIsSaved(false);
  }, [starterCode, storageKey]);

  return { code, setCode, resetToStarter, isSaved };
}
