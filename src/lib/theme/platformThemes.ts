import { EditorThemeId } from "./editorThemes";

export type PlatformThemeId =
  | "tokyo-night"
  | "matrix"
  | "cyberpunk"
  | "dracula"
  | "synthwave"
  | "nordic";

export interface PlatformTheme {
  id: PlatformThemeId;
  name: string;
  tagline: string;
  badge: string;
  editorTheme: EditorThemeId;
  colors: {
    primary: string;
    primary400: string;
    primary500: string;
    primary600: string;
    accent: string;
    accent400: string;
    accent500: string;
    accent600: string;
    background: string;
    surface: string;
    surfaceHover: string;
    surfaceCard: string;
    surfaceBorder: string;
    glowPrimary: string;
    glowAccent: string;
    previewGradient: string;
  };
}

export const PLATFORM_THEMES: PlatformTheme[] = [
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    tagline: "Ciano Neon & Violeta Elétrico",
    badge: "Padrão Oficial",
    editorTheme: "tokyo-night",
    colors: {
      primary: "#06B6D4",
      primary400: "#22D3EE",
      primary500: "#06B6D4",
      primary600: "#0891B2",
      accent: "#8B5CF6",
      accent400: "#A78BFA",
      accent500: "#8B5CF6",
      accent600: "#7C3AED",
      background: "#080B11",
      surface: "#0F1623",
      surfaceHover: "#152033",
      surfaceCard: "#121A2A",
      surfaceBorder: "#1E2C45",
      glowPrimary: "0 0 35px -5px rgba(6, 182, 212, 0.35)",
      glowAccent: "0 0 35px -5px rgba(139, 92, 246, 0.35)",
      previewGradient: "from-cyan-500 to-violet-500",
    },
  },
  {
    id: "matrix",
    name: "Matrix Hacker",
    tagline: "Verde Esmeralda & Terminal Hacker",
    badge: "Hacker Mode",
    editorTheme: "monokai-pro",
    colors: {
      primary: "#10B981",
      primary400: "#34D399",
      primary500: "#10B981",
      primary600: "#059669",
      accent: "#84CC16",
      accent400: "#A3E635",
      accent500: "#84CC16",
      accent600: "#65A30D",
      background: "#040906",
      surface: "#08150C",
      surfaceHover: "#0E2415",
      surfaceCard: "#0B1D11",
      surfaceBorder: "#143820",
      glowPrimary: "0 0 35px -5px rgba(16, 185, 129, 0.4)",
      glowAccent: "0 0 35px -5px rgba(132, 204, 22, 0.4)",
      previewGradient: "from-emerald-500 to-lime-500",
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk 2077",
    tagline: "Rosa Choque & Amarelo Vibrante",
    badge: "High Voltage",
    editorTheme: "synthwave-84",
    colors: {
      primary: "#F43F5E",
      primary400: "#FB7185",
      primary500: "#F43F5E",
      primary600: "#E11D48",
      accent: "#EAB308",
      accent400: "#FACC15",
      accent500: "#EAB308",
      accent600: "#CA8A04",
      background: "#0B0715",
      surface: "#140D26",
      surfaceHover: "#1E133A",
      surfaceCard: "#191033",
      surfaceBorder: "#2E1A57",
      glowPrimary: "0 0 35px -5px rgba(244, 63, 94, 0.4)",
      glowAccent: "0 0 35px -5px rgba(234, 179, 8, 0.4)",
      previewGradient: "from-rose-500 to-yellow-500",
    },
  },
  {
    id: "dracula",
    name: "Dracula Gothic",
    tagline: "Violeta Profundo & Rosa Pastel",
    badge: "Dark Elegance",
    editorTheme: "dracula",
    colors: {
      primary: "#A855F7",
      primary400: "#C084FC",
      primary500: "#A855F7",
      primary600: "#9333EA",
      accent: "#EC4899",
      accent400: "#F472B6",
      accent500: "#EC4899",
      accent600: "#DB2777",
      background: "#0D0E17",
      surface: "#161724",
      surfaceHover: "#202133",
      surfaceCard: "#1B1C2C",
      surfaceBorder: "#2C2E47",
      glowPrimary: "0 0 35px -5px rgba(168, 85, 247, 0.4)",
      glowAccent: "0 0 35px -5px rgba(236, 72, 153, 0.4)",
      previewGradient: "from-purple-500 to-pink-500",
    },
  },
  {
    id: "synthwave",
    name: "Synthwave '84",
    tagline: "Fúcsia Neon & Laranja Pôr-do-Sol",
    badge: "Retro Wave",
    editorTheme: "synthwave-84",
    colors: {
      primary: "#D946EF",
      primary400: "#E879F9",
      primary500: "#D946EF",
      primary600: "#C026D3",
      accent: "#F97316",
      accent400: "#FB923C",
      accent500: "#F97316",
      accent600: "#EA580C",
      background: "#120822",
      surface: "#1C0D36",
      surfaceHover: "#2A1452",
      surfaceCard: "#231144",
      surfaceBorder: "#3E1E74",
      glowPrimary: "0 0 35px -5px rgba(217, 70, 239, 0.4)",
      glowAccent: "0 0 35px -5px rgba(249, 115, 22, 0.4)",
      previewGradient: "from-fuchsia-500 to-orange-500",
    },
  },
  {
    id: "nordic",
    name: "Nordic Frost",
    tagline: "Azul Ártico & Ciano Polar",
    badge: "Glacial Clarity",
    editorTheme: "github-dark",
    colors: {
      primary: "#38BDF8",
      primary400: "#7DD3FC",
      primary500: "#38BDF8",
      primary600: "#0284C7",
      accent: "#14B8A6",
      accent400: "#2DD4BF",
      accent500: "#14B8A6",
      accent600: "#0D9488",
      background: "#09101C",
      surface: "#0F1A2E",
      surfaceHover: "#152542",
      surfaceCard: "#122038",
      surfaceBorder: "#1E355B",
      glowPrimary: "0 0 35px -5px rgba(56, 189, 248, 0.35)",
      glowAccent: "0 0 35px -5px rgba(20, 184, 166, 0.35)",
      previewGradient: "from-sky-500 to-teal-500",
    },
  },
];

export function getPlatformTheme(id: PlatformThemeId): PlatformTheme {
  return PLATFORM_THEMES.find((t) => t.id === id) || PLATFORM_THEMES[0];
}

export function applyThemeToDocument(theme: PlatformTheme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.setAttribute("data-theme", theme.id);

  // Injeção de variáveis CSS personalizadas
  root.style.setProperty("--devquest-primary", theme.colors.primary);
  root.style.setProperty("--devquest-primary-400", theme.colors.primary400);
  root.style.setProperty("--devquest-primary-500", theme.colors.primary500);
  root.style.setProperty("--devquest-primary-600", theme.colors.primary600);

  root.style.setProperty("--devquest-accent", theme.colors.accent);
  root.style.setProperty("--devquest-accent-400", theme.colors.accent400);
  root.style.setProperty("--devquest-accent-500", theme.colors.accent500);
  root.style.setProperty("--devquest-accent-600", theme.colors.accent600);

  root.style.setProperty("--devquest-bg", theme.colors.background);
  root.style.setProperty("--devquest-surface", theme.colors.surface);
  root.style.setProperty("--devquest-surface-hover", theme.colors.surfaceHover);
  root.style.setProperty("--devquest-surface-card", theme.colors.surfaceCard);
  root.style.setProperty("--devquest-surface-border", theme.colors.surfaceBorder);

  root.style.setProperty("--devquest-glow-primary", theme.colors.glowPrimary);
  root.style.setProperty("--devquest-glow-accent", theme.colors.glowAccent);

  // Define também a cor de fundo do body diretamente para transição suave
  document.body.style.backgroundColor = theme.colors.background;
}
