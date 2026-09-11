"use client";

import React, { useCallback, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import { EditorThemeId, getCodeMirrorThemeExtension } from "@/lib/theme/editorThemes";

export type SupportedLanguage = "javascript" | "typescript" | "python";

interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  onRun?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  language?: SupportedLanguage;
  theme?: EditorThemeId;
}


// Tema dark customizado nos tokens do DevQuest
const devQuestTheme = EditorView.theme({
  "&": {
    color: "#F1F5F9",
    backgroundColor: "#070A10",
    fontSize: "13px",
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    height: "100%",
  },
  ".cm-content": {
    caretColor: "#22D3EE",
    padding: "16px 0",
  },
  "&.cm-focused .cm-cursor": {
    borderLeftColor: "#22D3EE",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "rgba(6, 182, 212, 0.25) !important",
  },
  ".cm-gutters": {
    backgroundColor: "#05070B",
    color: "#475569",
    borderRight: "1px solid #1E2C45",
    paddingLeft: "8px",
    paddingRight: "8px",
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#0F1623",
    color: "#22D3EE",
  },
  ".cm-activeLine": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
});

export function CodeEditor({
  value,
  onChange,
  onRun,
  placeholder,
  readOnly = false,
  language = "javascript",
  theme = "tokyo-night"
}: CodeEditorProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Atalho Ctrl+Enter ou Cmd+Enter para disparar execução
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && onRun) {
        e.preventDefault();
        onRun();
      }
    },
    [onRun]
  );

  const langExtension = useMemo(() => {
    switch (language) {
      case "python":
        return python();
      case "typescript":
        return javascript({ jsx: true, typescript: true });
      default:
        return javascript({ jsx: true, typescript: false });
    }
  }, [language]);

  const themeExtension = useMemo(() => {
    return getCodeMirrorThemeExtension(theme);
  }, [theme]);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="w-full h-full overflow-hidden flex flex-col focus:outline-none"
    >
      <CodeMirror
        value={value}
        height="100%"
        theme="dark"
        extensions={[langExtension, themeExtension]}
        onChange={onChange}
        placeholder={placeholder || "// Escreva seu código aqui..."}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
        className="h-full flex-1 overflow-auto"
      />
    </div>
  );
}
