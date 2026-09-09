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
}

const WORKER_TIMEOUT_MS = 3000;

// Código do worker que será instanciado via Blob URL
const createWorkerScript = () => `
self.onmessage = function(e) {
  const { challenge, userCode } = e.data;
  const logs = [];

  const customConsole = {
    log: function(...args) {
      logs.push(args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
    },
    error: function(...args) {
      logs.push("[ERRO] " + args.map(a => String(a)).join(" "));
    },
    warn: function(...args) {
      logs.push("[AVISO] " + args.map(a => String(a)).join(" "));
    }
  };

  try {
    const runnerFactory = new Function(
      "console",
      userCode + "\\n" +
      "if (typeof " + challenge.functionName + " !== 'function') {\\n" +
      "  throw new Error('A função \\'' + challenge.functionName + '\\' não foi definida.');\\n" +
      "}\\n" +
      "return " + challenge.functionName + ";\\n"
    );

    const userFunc = runnerFactory(customConsole);
    const testResults = [];

    for (let i = 0; i < challenge.testCases.length; i++) {
      const tc = challenge.testCases[i];
      let received;
      let passed = false;
      let testError;

      try {
        const clonedInputs = JSON.parse(JSON.stringify(tc.input));
        received = userFunc(...clonedInputs);
        passed = JSON.stringify(received) === JSON.stringify(tc.expected);
      } catch (err) {
        testError = err.message || "Erro durante execução do teste";
        passed = false;
      }

      testResults.push({
        testCaseId: tc.id,
        description: tc.description,
        passed: passed,
        input: tc.input,
        expected: tc.expected,
        received: received,
        error: testError,
      });
    }

    self.postMessage({ type: "success", results: testResults, logs: logs });
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

  const runChallenge = async (challenge: Challenge, userCode: string): Promise<void> => {
    setIsRunning(true);
    setResults([]);
    setConsoleLogs([]);
    setError(null);

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
          const { type, results: res, logs, message } = event.data;
          setConsoleLogs(logs || []);

          if (type === "success") {
            setResults(res || []);
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
      const customConsole = {
        log: (...args: any[]) => {
          logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
        error: (...args: any[]) => {
          logs.push("[ERRO] " + args.map((a) => String(a)).join(" "));
        },
        warn: (...args: any[]) => {
          logs.push("[AVISO] " + args.map((a) => String(a)).join(" "));
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

      for (const tc of challenge.testCases) {
        let received: any;
        let passed = false;
        let testError: string | undefined;

        try {
          const clonedInputs = JSON.parse(JSON.stringify(tc.input));
          received = userFunc(...clonedInputs);
          passed = JSON.stringify(received) === JSON.stringify(tc.expected);
        } catch (err: any) {
          testError = err.message || "Erro durante execução do teste";
          passed = false;
        }

        testResults.push({
          testCaseId: tc.id,
          description: tc.description,
          passed,
          input: tc.input,
          expected: tc.expected,
          received,
          error: testError,
        });
      }

      setConsoleLogs(logs);
      setResults(testResults);
    } catch (err: any) {
      setError(err.message || "Erro de sintaxe no código");
    } finally {
      setIsRunning(false);
    }
  };

  return {
    isRunning,
    results,
    consoleLogs,
    error,
    runChallenge,
  };
}
