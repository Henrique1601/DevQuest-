"use client";

import { useState } from "react";
import { Challenge, TestCase } from "@/types/challenge";

export interface TestResult {
  testCaseId: string;
  description: string;
  passed: boolean;
  input: any[];
  expected: any;
  received: any;
  error?: string;
}

export function useCodeRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const runChallenge = async (challenge: Challenge, userCode: string) => {
    setIsRunning(true);
    setResults([]);
    setConsoleLogs([]);
    setError(null);

    const logs: string[] = [];
    const testResults: TestResult[] = [];

    try {
      // Capturador seguro de logs
      const customConsole = {
        log: (...args: any[]) => {
          logs.push(args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        },
        error: (...args: any[]) => {
          logs.push("[ERRO] " + args.map(a => String(a)).join(" "));
        },
        warn: (...args: any[]) => {
          logs.push("[AVISO] " + args.map(a => String(a)).join(" "));
        }
      };

      // Avaliação em ambiente isolado via Function
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
          // Copia profunda dos inputs para evitar mutação indesejada entre testes
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
