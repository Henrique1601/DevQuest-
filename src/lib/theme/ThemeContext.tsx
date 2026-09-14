"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  PlatformTheme,
  PlatformThemeId,
  PLATFORM_THEMES,
  getPlatformTheme,
  applyThemeToDocument,
} from "./platformThemes";
import { sfx } from "@/lib/audio/sfx";

interface ThemeContextType {
  currentTheme: PlatformTheme;
  currentThemeId: PlatformThemeId;
  setTheme: (id: PlatformThemeId) => void;
  themes: PlatformTheme[];
  isLoaded: boolean;
  isStudioOpen: boolean;
  setIsStudioOpen: (open: boolean) => void;
  openThemeStudio: () => void;
  closeThemeStudio: () => void;
}

const STORAGE_KEY = "devquest_platform_theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentThemeId, setCurrentThemeId] = useState<PlatformThemeId>("tokyo-night");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Carrega o tema salvo do localStorage ao montar no cliente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as PlatformThemeId | null;
      if (saved && PLATFORM_THEMES.some((t) => t.id === saved)) {
        setCurrentThemeId(saved);
        applyThemeToDocument(getPlatformTheme(saved));
      } else {
        applyThemeToDocument(getPlatformTheme("tokyo-night"));
      }
    } catch {
      applyThemeToDocument(getPlatformTheme("tokyo-night"));
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setTheme = useCallback((id: PlatformThemeId) => {
    const selected = getPlatformTheme(id);
    setCurrentThemeId(id);
    applyThemeToDocument(selected);

    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {
      console.warn("Falha ao salvar tema no localStorage", e);
    }

    // Efeito sonoro discreto de transição
    try {
      sfx.playClickSfx();
    } catch {
      // noop
    }
  }, []);

  const openThemeStudio = useCallback(() => setIsStudioOpen(true), []);
  const closeThemeStudio = useCallback(() => setIsStudioOpen(false), []);

  const currentTheme = getPlatformTheme(currentThemeId);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentThemeId,
        setTheme,
        themes: PLATFORM_THEMES,
        isLoaded,
        isStudioOpen,
        setIsStudioOpen,
        openThemeStudio,
        closeThemeStudio,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeStudio() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      currentTheme: getPlatformTheme("tokyo-night"),
      currentThemeId: "tokyo-night" as PlatformThemeId,
      setTheme: () => {},
      themes: PLATFORM_THEMES,
      isLoaded: true,
      isStudioOpen: false,
      setIsStudioOpen: () => {},
      openThemeStudio: () => {},
      closeThemeStudio: () => {},
    };
  }
  return context;
}
