"use client";

import { useState } from "react";
import { Challenge } from "@/types/challenge";

export interface TestResult {
  testCaseId: string;
  description: string;
  passed: boolean;
  input: any[];
  expected: any;
  received: any;
  error?: string;
  durationMs?: number;
}

export interface PerformanceMetrics {
  totalTimeMs: number;
  timePercentile: number;
  timeRankLabel: string;
  memoryMb: number;
  memoryPercentile: number;
  timeComplexity: string;
  spaceComplexity: string;
  breakdown: { testCaseId: string; durationMs: number }[];
}

export function estimateComplexity(code: string): { time: string; space: string } {
  const clean = code.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  
  const forLoops = (clean.match(/\bfor\s*\(/g) || []).length;
  const whileLoops = (clean.match(/\bwhile\s*\(/g) || []).length;
  const iterations = (clean.match(/\.(forEach|map|filter|flatMap|reduce)\s*\(/g) || []).length;
  
  const nestedLoopPattern = /(?:for|while)\s*\([^)]*\)\s*\{[^}]*(?:for|while|\.(?:forEach|map|filter))\s*\(/;
  const nestedMethodPattern = /\.(?:forEach|map|filter)\s*\([^)]*=>\s*[^}]*\.(?:forEach|map|filter|find|indexOf|includes)\s*\(/;

  let time = "O(n)";
  if (nestedLoopPattern.test(clean) || nestedMethodPattern.test(clean) || (forLoops + whileLoops >= 2 && iterations >= 1)) {
    time = "O(n²)";
  } else if (/\.sort\s*\(/.test(clean)) {
    time = "O(n log n)";
  } else if (/(>>\s*1|\/\s*2|Math\.floor\([^)]*\/\s*2\))/.test(clean) && (forLoops > 0 || whileLoops > 0)) {
    time = "O(log n)";
  } else if (forLoops === 0 && whileLoops === 0 && iterations === 0 && !/\.reduce|\.map|\.filter/.test(clean)) {
    time = "O(1)";
  }

  let space = "O(1)";
  if (/(\[\]|new Array|new Set|new Map|\.split|\.map|\.filter|\.slice)/.test(clean)) {
    space = "O(n)";
  }

  return { time, space };
}

export function computeMetrics(
  totalTimeMs: number,
  breakdown: { testCaseId: string; durationMs: number }[],
  code: string
): PerformanceMetrics {
  const complexity = estimateComplexity(code);
  
  let timePercentile: number;
  if (totalTimeMs <= 0.2) {
    timePercentile = 98.5 + (0.2 - Math.max(0, totalTimeMs)) * 5;
  } else if (totalTimeMs <= 1) {
    timePercentile = 92.0 + (1 - totalTimeMs) * 7.5;
  } else if (totalTimeMs <= 5) {
    timePercentile = 82.0 + ((5 - totalTimeMs) / 4) * 10;
  } else if (totalTimeMs <= 20) {
    timePercentile = 65.0 + ((20 - totalTimeMs) / 15) * 17;
  } else if (totalTimeMs <= 100) {
    timePercentile = 35.0 + ((100 - totalTimeMs) / 80) * 30;
  } else {
    timePercentile = Math.max(12.5, 35 - (totalTimeMs - 100) * 0.1);
  }
  timePercentile = Math.round(Math.min(99.9, Math.max(10.0, timePercentile)) * 10) / 10;

  let timeRankLabel = "Bom";
  if (timePercentile >= 95) timeRankLabel = "Excepcional";
  else if (timePercentile >= 85) timeRankLabel = "Excelente";
  else if (timePercentile >= 70) timeRankLabel = "Muito Bom";

  const seed = (Math.round(totalTimeMs * 100) % 15) / 10;
  const memoryMb = Math.round((41.2 + seed) * 10) / 10;
  const memoryPercentile = Math.round((78.5 + (seed * 4) - 2) * 10) / 10;

  return {
    totalTimeMs: Math.round(Math.max(0.05, totalTimeMs) * 100) / 100,
    timePercentile,
    timeRankLabel,
    memoryMb,
    memoryPercentile,
    timeComplexity: complexity.time,
    spaceComplexity: complexity.space,
    breakdown,
  };
}

const WORKER_TIMEOUT_MS = 3000;

// Código do worker que será instanciado via Blob URL
const createWorkerScript = () => `
self.onmessage = function(e) {
  const { challenge, userCode } = e.data;
  const logs = [];

  function formatArg(a) {
    if (a === null) return "null";
    if (a === undefined) return "undefined";
    if (typeof a === "object") {
      try {
        return JSON.stringify(a, null, 2);
      } catch (err) {
        return String(a);
      }
    }
    return String(a);
  }

  const customConsole = {
    log: function(...args) {
      logs.push(args.map(formatArg).join(" "));
    },
    error: function(...args) {
      logs.push("[ERRO] " + args.map(formatArg).join(" "));
    },
    warn: function(...args) {
      logs.push("[AVISO] " + args.map(formatArg).join(" "));
    }
  };

  try {
    const runnerFactory = new Function(
      "console",
      userCode + "\\n" +
      "if (typeof " + challenge.functionName + " !== 'function') {\\n" +
      "  throw new Error('A função \\\"" + challenge.functionName + "\\\" não foi definida.');\\n" +
      "}\\n" +
      "return " + challenge.functionName + ";\\n"
    );

    const userFunc = runnerFactory(customConsole);
    const testResults = [];
    const tStart = performance.now();

    for (let i = 0; i < challenge.testCases.length; i++) {
      const tc = challenge.testCases[i];
      let received;
      let passed = false;
      let testError;
      const t0 = performance.now();

      try {
        const clonedInputs = JSON.parse(JSON.stringify(tc.input));
        received = userFunc(...clonedInputs);
        passed = JSON.stringify(received) === JSON.stringify(tc.expected);
      } catch (err) {
        testError = err.message || "Erro durante execução do teste";
        passed = false;
      }
      const t1 = performance.now();
      const durationMs = Math.round((t1 - t0) * 100) / 100;

      testResults.push({
        testCaseId: tc.id,
        description: tc.description,
        passed: passed,
        input: tc.input,
        expected: tc.expected,
        received: received,
        error: testError,
        durationMs: durationMs,
      });
    }
    const tEnd = performance.now();
    const totalTimeMs = Math.round((tEnd - tStart) * 100) / 100;

    self.postMessage({ type: "success", results: testResults, logs: logs, totalTimeMs: totalTimeMs });
  } catch (err) {
    self.postMessage({ type: "error", message: err.message || "Erro de sintaxe no código", logs: logs });
  }
};
`;

export function useCodeRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);

  const runChallenge = async (challenge: Challenge, userCode: string): Promise<void> => {
    setIsRunning(true);
    setResults([]);
    setConsoleLogs([]);
    setError(null);
    setPerformanceMetrics(null);

    // Se o ambiente não suportar Web Worker (ex: Vitest/jsdom ou SSR)
    if (typeof window === "undefined" || typeof Worker === "undefined") {
      runSynchronousFallback(challenge, userCode);
      return;
    }

    return new Promise<void>((resolve) => {
      let worker: Worker | null = null;
      let blobUrl: string | null = null;
      let hasFinished = false;

      const cleanup = () => {
        hasFinished = true;
        if (timeoutId) clearTimeout(timeoutId);
        if (worker) {
          worker.terminate();
          worker = null;
        }
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
          blobUrl = null;
        }
        setIsRunning(false);
        resolve();
      };

      const timeoutId = setTimeout(() => {
        if (!hasFinished) {
          setError(`Tempo limite de execução excedido (${WORKER_TIMEOUT_MS}ms). Verifique se seu código contém loops infinitos ou recursão infinita.`);
          cleanup();
        }
      }, WORKER_TIMEOUT_MS);

      try {
        const blob = new Blob([createWorkerScript()], { type: "application/javascript" });
        blobUrl = URL.createObjectURL(blob);
        worker = new Worker(blobUrl);

        worker.onmessage = (event) => {
          if (hasFinished) return;
          const { type, results: res, logs, message, totalTimeMs } = event.data;
          setConsoleLogs(logs || []);

          if (type === "success") {
            const rawResults: TestResult[] = res || [];
            setResults(rawResults);

            const breakdown = rawResults.map((r) => ({
              testCaseId: r.testCaseId,
              durationMs: r.durationMs ?? 0,
            }));
            const metrics = computeMetrics(totalTimeMs ?? 0.5, breakdown, userCode);
            setPerformanceMetrics(metrics);
          } else {
            setError(message || "Erro durante a execução do código");
          }
          cleanup();
        };

        worker.onerror = (err) => {
          if (hasFinished) return;
          setError(err.message || "Erro de execução no Web Worker");
          cleanup();
        };

        worker.postMessage({ challenge, userCode });
      } catch (err: any) {
        if (!hasFinished) {
          // Fallback caso crie erro ao instanciar worker
          runSynchronousFallback(challenge, userCode);
          cleanup();
        }
      }
    });
  };

  const runSynchronousFallback = (challenge: Challenge, userCode: string) => {
    const logs: string[] = [];
    const testResults: TestResult[] = [];

    try {
      const formatArg = (a: any) => {
        if (a === null) return "null";
        if (a === undefined) return "undefined";
        if (typeof a === "object") {
          try {
            return JSON.stringify(a, null, 2);
          } catch {
            return String(a);
          }
        }
        return String(a);
      };

      const customConsole = {
        log: (...args: any[]) => {
          logs.push(args.map(formatArg).join(" "));
        },
        error: (...args: any[]) => {
          logs.push("[ERRO] " + args.map(formatArg).join(" "));
        },
        warn: (...args: any[]) => {
          logs.push("[AVISO] " + args.map(formatArg).join(" "));
        },
      };

      const runnerFactory = new Function(
        "console",
        `
        ${userCode}
        if (typeof ${challenge.functionName} !== "function") {
          throw new Error("A função '${challenge.functionName}' não foi definida.");
        }
        return ${challenge.functionName};
        `
      );

      const userFunc = runnerFactory(customConsole);
      const tStart = performance.now();

      for (const tc of challenge.testCases) {
        let received: any;
        let passed = false;
        let testError: string | undefined;
        const t0 = performance.now();

        try {
          const clonedInputs = JSON.parse(JSON.stringify(tc.input));
          received = userFunc(...clonedInputs);
          passed = JSON.stringify(received) === JSON.stringify(tc.expected);
        } catch (err: any) {
          testError = err.message || "Erro durante execução do teste";
          passed = false;
        }
        const t1 = performance.now();
        const durationMs = Math.round((t1 - t0) * 100) / 100;

        testResults.push({
          testCaseId: tc.id,
          description: tc.description,
          passed,
          input: tc.input,
          expected: tc.expected,
          received,
          error: testError,
          durationMs,
        });
      }

      const tEnd = performance.now();
      const totalTimeMs = Math.round((tEnd - tStart) * 100) / 100;

      setConsoleLogs(logs);
      setResults(testResults);

      const breakdown = testResults.map((r) => ({
        testCaseId: r.testCaseId,
        durationMs: r.durationMs ?? 0,
      }));
      const metrics = computeMetrics(totalTimeMs, breakdown, userCode);
      setPerformanceMetrics(metrics);
    } catch (err: any) {
      setError(err.message || "Erro de sintaxe no código");
    } finally {
      setIsRunning(false);
    }
  };

  const clearLogs = () => {
    setConsoleLogs([]);
  };

  const resetRunnerState = () => {
    setResults([]);
    setError(null);
    setConsoleLogs([]);
    setPerformanceMetrics(null);
    setIsRunning(false);
  };

  return {
    isRunning,
    results,
    consoleLogs,
    error,
    performanceMetrics,
    runChallenge,
    clearLogs,
    resetRunnerState,
  };
}
