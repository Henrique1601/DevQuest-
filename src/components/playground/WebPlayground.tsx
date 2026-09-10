"use client";

import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  Play,
  RotateCcw,
  Download,
  Copy,
  Check,
  Code2,
  FileCode,
  Sparkles,
  Terminal,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Preset {
  id: string;
  name: string;
  description: string;
  html: string;
  css: string;
  js: string;
}

const PRESETS: Preset[] = [
  {
    id: "glass-card",
    name: "Card Glassmorphism 3D",
    description: "Efeito moderno de vidro com gradientes e tilt dinâmico com mouse",
    html: `<div class="container">
  <div class="card" id="card">
    <div class="badge">🚀 DevQuest Pro</div>
    <h2>Design Moderno</h2>
    <p>Explore o poder do CSS moderno com backdrop-filter, sombras volumétricas e reatividade interativa.</p>
    <button id="btn" class="glow-btn">Experimentar Agora</button>
    <div class="stats">
      <div class="stat"><span>4.9</span> ★ Avaliação</div>
      <div class="stat"><span>10k+</span> Devs</div>
    </div>
  </div>
</div>`,
    css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 20% 20%, #1e1b4b 0%, #030712 100%);
  color: #f8fafc;
  overflow: hidden;
}

.container {
  perspective: 1000px;
}

.card {
  width: 340px;
  padding: 32px 28px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  backdrop-filter: blur(16px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7),
              0 0 30px rgba(99, 102, 241, 0.2);
  transition: transform 0.15s ease-out, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #818cf8;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.3);
  padding: 4px 12px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

h2 {
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 24px;
}

.glow-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
  transition: all 0.2s ease;
}

.glow-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.6);
}

.stats {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.stat {
  font-size: 12px;
  color: #94a3b8;
}

.stat span {
  font-weight: 700;
  color: #e2e8f0;
}`,
    js: `const card = document.getElementById('card');
const btn = document.getElementById('btn');

// Efeito de Tilt 3D baseado no mouse
document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
  card.style.transform = \`rotateY(\${-xAxis}deg) rotateX(\${yAxis}deg)\`;
});

btn.addEventListener('click', () => {
  console.log("Botão clicado! Lançando feedback...");
  btn.innerText = "🎉 Ação Executada!";
  setTimeout(() => {
    btn.innerText = "Experimentar Agora";
  }, 2000);
});`
  },
  {
    id: "counter-app",
    name: "Contador Reativo & Histórico",
    description: "Aplicação interativa de contagem com histórico dinâmico de eventos",
    html: `<div class="counter-box">
  <h2>Contador Reativo</h2>
  <div class="display" id="count">0</div>
  <div class="buttons">
    <button id="dec" class="btn red">-1</button>
    <button id="reset" class="btn gray">Reset</button>
    <button id="inc" class="btn green">+1</button>
  </div>
  <div class="log-title">Histórico de Ações:</div>
  <ul id="history" class="history-list"></ul>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; font-family: sans-serif; }
body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
  color: #f8fafc;
}

.counter-box {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 30px;
  width: 320px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

h2 { font-size: 20px; color: #93c5fd; margin-bottom: 15px; }

.display {
  font-size: 56px;
  font-weight: 900;
  font-family: monospace;
  margin: 15px 0;
  color: #38bdf8;
  transition: transform 0.1s;
}

.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn:hover { opacity: 0.9; }

.green { background: #10b981; color: white; }
.red { background: #ef4444; color: white; }
.gray { background: #475569; color: white; }

.log-title { font-size: 12px; color: #64748b; margin-bottom: 8px; text-align: left; }
.history-list {
  max-height: 100px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  text-align: left;
  font-size: 12px;
  font-family: monospace;
  color: #94a3b8;
}
.history-list li {
  padding: 3px 0;
  border-bottom: 1px solid #334155;
}`,
    js: `let count = 0;
const countEl = document.getElementById('count');
const historyEl = document.getElementById('history');

function update(diff) {
  count += diff;
  countEl.innerText = count;
  countEl.style.transform = "scale(1.2)";
  setTimeout(() => countEl.style.transform = "scale(1)", 150);

  const li = document.createElement('li');
  const action = diff > 0 ? \`+1 (Total: \${count})\` : diff < 0 ? \`-1 (Total: \${count})\` : \`Reset (Total: 0)\`;
  li.innerText = \`[\${new Date().toLocaleTimeString()}] \${action}\`;
  historyEl.prepend(li);
  console.log("Contador atualizado:", count);
}

document.getElementById('inc').onclick = () => update(1);
document.getElementById('dec').onclick = () => update(-1);
document.getElementById('reset').onclick = () => {
  count = 0;
  countEl.innerText = 0;
  update(0);
};`
  },
  {
    id: "matrix-rain",
    name: "Matrix Code Rain (Canvas)",
    description: "Chuva de código verde estilo Matrix renderizada em tempo real com Canvas API",
    html: `<canvas id="canvas"></canvas>
<div class="overlay">
  <h1>DEVQUEST MATRIX</h1>
  <p>Canvas 2D renderizado a 60 FPS</p>
</div>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  background: black;
  overflow: hidden;
  position: relative;
  font-family: monospace;
}
#canvas {
  display: block;
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #00ff66;
  text-shadow: 0 0 10px #00ff66;
  pointer-events: none;
}
h1 { font-size: 28px; letter-spacing: 4px; }
p { font-size: 12px; color: #a7f3d0; margin-top: 8px; }`,
    js: `const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01DEVQUESTCODEJAVASCRIPTREACTHTMLCSSPYTHONALGORITHMS';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff66';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

const interval = setInterval(draw, 33);
console.log("Efeito Matrix inicializado no Canvas!");`
  }
];

export function WebPlayground() {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [htmlCode, setHtmlCode] = useState(PRESETS[0].html);
  const [cssCode, setCssCode] = useState(PRESETS[0].css);
  const [jsCode, setJsCode] = useState(PRESETS[0].js);

  const [logs, setLogs] = useState<{ type: string; message: string; timestamp: string }[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(PRESETS[0].id);
  const [manualRefreshKey, setManualRefreshKey] = useState(0);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Escuta mensagens do console do iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.source === "devquest-sandbox") {
        setLogs((prev) => [
          ...prev.slice(-49),
          {
            type: event.data.type || "log",
            message: event.data.message,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const buildSourceDoc = () => {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${cssCode}
  </style>
  <script>
    (function() {
      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;

      function sendToParent(type, args) {
        try {
          const message = Array.from(args).map(arg => {
            if (typeof arg === 'object') {
              try { return JSON.stringify(arg); } catch(e) { return String(arg); }
            }
            return String(arg);
          }).join(' ');

          window.parent.postMessage({
            source: 'devquest-sandbox',
            type: type,
            message: message
          }, '*');
        } catch(e) {}
      }

      console.log = function(...args) {
        sendToParent('log', args);
        originalLog.apply(console, args);
      };

      console.warn = function(...args) {
        sendToParent('warn', args);
        originalWarn.apply(console, args);
      };

      console.error = function(...args) {
        sendToParent('error', args);
        originalError.apply(console, args);
      };

      window.onerror = function(message, source, lineno, colno, error) {
        sendToParent('error', ['Erro:', message]);
        return false;
      };
    })();
  <\/script>
</head>
<body>
  ${htmlCode}
  <script>
    try {
      ${jsCode}
    } catch (err) {
      console.error(err.message);
    }
  <\/script>
</body>
</html>
    `;
  };

  const handleApplyPreset = (preset: Preset) => {
    setSelectedPresetId(preset.id);
    setHtmlCode(preset.html);
    setCssCode(preset.css);
    setJsCode(preset.js);
    setLogs([]);
  };

  const handleDownload = () => {
    const fullHtml = buildSourceDoc();
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "devquest-playground.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const fullHtml = buildSourceDoc();
    navigator.clipboard.writeText(fullHtml);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleClear = () => {
    if (activeTab === "html") setHtmlCode("");
    else if (activeTab === "css") setCssCode("");
    else if (activeTab === "js") setJsCode("");
  };

  const handleReset = () => {
    const currentPreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];
    handleApplyPreset(currentPreset);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-background text-slate-100 overflow-hidden">
      {/* Barra Superior de Controles */}
      <div className="h-14 border-b border-surface-border bg-surface px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </span>
            <div>
              <h1 className="text-sm font-bold text-white flex items-center gap-2">
                Playground Web Livre
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Sandbox
                </span>
              </h1>
            </div>
          </div>

          {/* Seletor de Presets */}
          <div className="hidden sm:flex items-center gap-1.5 ml-4 pl-4 border-l border-surface-border">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Templates:
            </span>
            <select
              value={selectedPresetId}
              onChange={(e) => {
                const found = PRESETS.find((p) => p.id === e.target.value);
                if (found) handleApplyPreset(found);
              }}
              className="bg-background border border-surface-border text-xs rounded-lg px-2.5 py-1 text-slate-200 focus:outline-none focus:border-primary-500"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ações da Barra */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setManualRefreshKey((k) => k + 1)}
            className="text-xs font-mono text-slate-300 hover:text-white"
            title="Recarregar Preview"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Executar</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="text-xs font-mono gap-1.5"
            title="Copiar HTML compilado"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">{isCopied ? "Copiado!" : "Copiar"}</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            className="text-xs font-mono gap-1.5"
            title="Baixar arquivo HTML"
          >
            <Download className="w-3.5 h-3.5 text-primary-400" />
            <span className="hidden sm:inline">Baixar HTML</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs font-mono text-slate-400 hover:text-white"
            title="Resetar código para o template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Grid Principal: Split Esquerda (Editor) e Direita (Preview) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Painel do Editor */}
        <div className="lg:col-span-6 flex flex-col border-r border-surface-border bg-[#070A10] overflow-hidden">
          {/* Abas HTML / CSS / JS */}
          <div className="h-10 border-b border-surface-border bg-surface/80 px-2 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("html")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === "html"
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-orange-400" />
                HTML
              </button>

              <button
                onClick={() => setActiveTab("css")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === "css"
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                CSS
              </button>

              <button
                onClick={() => setActiveTab("js")}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  activeTab === "js"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                JavaScript
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                title="Limpar aba atual"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Área do CodeMirror */}
          <div className="flex-1 overflow-auto font-mono text-sm">
            {activeTab === "html" && (
              <CodeMirror
                value={htmlCode}
                height="100%"
                theme={oneDark}
                extensions={[html()]}
                onChange={(val) => setHtmlCode(val)}
                className="h-full text-xs sm:text-sm"
              />
            )}
            {activeTab === "css" && (
              <CodeMirror
                value={cssCode}
                height="100%"
                theme={oneDark}
                extensions={[css()]}
                onChange={(val) => setCssCode(val)}
                className="h-full text-xs sm:text-sm"
              />
            )}
            {activeTab === "js" && (
              <CodeMirror
                value={jsCode}
                height="100%"
                theme={oneDark}
                extensions={[javascript({ jsx: true })]}
                onChange={(val) => setJsCode(val)}
                className="h-full text-xs sm:text-sm"
              />
            )}
          </div>
        </div>

        {/* Painel de Preview & Console */}
        <div className="lg:col-span-6 flex flex-col bg-slate-950 overflow-hidden">
          {/* Header do Preview */}
          <div className="h-10 border-b border-surface-border bg-surface/80 px-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-200">Resultado em Tempo Real</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConsole(!showConsole)}
                className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                  showConsole
                    ? "bg-primary-500 text-white font-semibold"
                    : "bg-surface border border-surface-border text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console</span>
                {logs.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-primary-700 text-[10px]">
                    {logs.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Iframe Sandboxed */}
          <div className="flex-1 relative bg-white">
            <iframe
              key={manualRefreshKey}
              ref={iframeRef}
              title="DevQuest Sandbox Preview"
              srcDoc={buildSourceDoc()}
              sandbox="allow-scripts allow-modals"
              className="w-full h-full border-none"
            />
          </div>

          {/* Gaveta do Console */}
          {showConsole && (
            <div className="h-44 border-t border-surface-border bg-[#070A10] flex flex-col shrink-0">
              <div className="px-4 py-2 border-b border-surface-border/60 bg-surface/40 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-primary-400" />
                  Saída do Console ({logs.length})
                </span>
                <button
                  onClick={() => setLogs([])}
                  className="text-slate-500 hover:text-slate-300 text-[11px]"
                >
                  Limpar console
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto font-mono text-xs space-y-1.5">
                {logs.length === 0 ? (
                  <p className="text-slate-600 italic">Nenhum log emitido ainda. Use console.log(...) no código.</p>
                ) : (
                  logs.map((l, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-2 py-0.5 ${
                        l.type === "error"
                          ? "text-red-400"
                          : l.type === "warn"
                          ? "text-amber-400"
                          : "text-slate-300"
                      }`}
                    >
                      <span className="text-slate-600 text-[10px] shrink-0">[{l.timestamp}]</span>
                      <span className="font-semibold text-[10px] uppercase shrink-0">[{l.type}]</span>
                      <span className="break-all">{l.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
