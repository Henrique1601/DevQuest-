import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";

export type EditorThemeId = "tokyo-night" | "dracula" | "monokai-pro" | "github-dark" | "synthwave-84";

export interface EditorThemeOption {
  id: EditorThemeId;
  name: string;
  badge: string;
  accent: string;
  bgHex: string;
}

export const EDITOR_THEMES: EditorThemeOption[] = [
  { id: "tokyo-night", name: "Tokyo Night", badge: "Cyan & Roxo", accent: "#06B6D4", bgHex: "#0B0F19" },
  { id: "dracula", name: "Dracula", badge: "Gótico Rosa", accent: "#FF79C6", bgHex: "#1E1F29" },
  { id: "monokai-pro", name: "Monokai Pro", badge: "Âmbar & Verde", accent: "#FFD866", bgHex: "#222222" },
  { id: "github-dark", name: "GitHub Dark", badge: "Alto Contraste", accent: "#58A6FF", bgHex: "#0D1117" },
  { id: "synthwave-84", name: "SynthWave '84", badge: "Neon Retro", accent: "#03EDF9", bgHex: "#1A102F" },
];

export function getCodeMirrorThemeExtension(themeId: EditorThemeId): Extension {
  switch (themeId) {
    case "dracula":
      return EditorView.theme({
        "&": { backgroundColor: "#1E1F29", color: "#F8F8F2" },
        ".cm-content": { caretColor: "#FF79C6" },
        ".cm-cursor": { borderLeftColor: "#FF79C6" },
        ".cm-gutters": { backgroundColor: "#1E1F29", color: "#6272A4", border: "none" },
        ".cm-activeLine": { backgroundColor: "#282A36" },
        ".cm-activeLineGutter": { backgroundColor: "#282A36", color: "#FF79C6" },
      }, { dark: true });

    case "monokai-pro":
      return EditorView.theme({
        "&": { backgroundColor: "#222222", color: "#FCFCFA" },
        ".cm-content": { caretColor: "#FFD866" },
        ".cm-cursor": { borderLeftColor: "#FFD866" },
        ".cm-gutters": { backgroundColor: "#222222", color: "#727072", border: "none" },
        ".cm-activeLine": { backgroundColor: "#2D2A2E" },
        ".cm-activeLineGutter": { backgroundColor: "#2D2A2E", color: "#FFD866" },
      }, { dark: true });

    case "github-dark":
      return EditorView.theme({
        "&": { backgroundColor: "#0D1117", color: "#E6EDF3" },
        ".cm-content": { caretColor: "#58A6FF" },
        ".cm-cursor": { borderLeftColor: "#58A6FF" },
        ".cm-gutters": { backgroundColor: "#0D1117", color: "#7D8590", border: "none" },
        ".cm-activeLine": { backgroundColor: "#161B22" },
        ".cm-activeLineGutter": { backgroundColor: "#161B22", color: "#58A6FF" },
      }, { dark: true });

    case "synthwave-84":
      return EditorView.theme({
        "&": { backgroundColor: "#1A102F", color: "#F92AAD" },
        ".cm-content": { caretColor: "#03EDF9" },
        ".cm-cursor": { borderLeftColor: "#03EDF9" },
        ".cm-gutters": { backgroundColor: "#1A102F", color: "#495495", border: "none" },
        ".cm-activeLine": { backgroundColor: "#261947" },
        ".cm-activeLineGutter": { backgroundColor: "#261947", color: "#03EDF9" },
      }, { dark: true });

    case "tokyo-night":
    default:
      return EditorView.theme({
        "&": { backgroundColor: "#080B12", color: "#F8FAFC" },
        ".cm-content": { caretColor: "#38BDF8" },
        ".cm-cursor": { borderLeftColor: "#38BDF8" },
        ".cm-gutters": { backgroundColor: "#080B12", color: "#475569", border: "none" },
        ".cm-activeLine": { backgroundColor: "#0F172A" },
        ".cm-activeLineGutter": { backgroundColor: "#0F172A", color: "#38BDF8" },
      }, { dark: true });
  }
}
