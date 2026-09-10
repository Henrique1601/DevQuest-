"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { oneDark } from "@codemirror/theme-one-dark";
import {
  Database,
  Play,
  RotateCcw,
  Table,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Trophy,
  ChevronRight,
  Code,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  MockSqlEngine,
  QueryResult,
  mockSqlChallenges,
  SqlChallenge
} from "@/lib/sql/mockDatabase";

export function SqlPlayground() {
  const [engine] = useState(() => new MockSqlEngine());
  const [query, setQuery] = useState<string>("SELECT * FROM produtos WHERE preco > 200 ORDER BY preco DESC;");
  const [result, setResult] = useState<QueryResult | null>(() => {
    try {
      return engine.runQuery("SELECT * FROM produtos WHERE preco > 200 ORDER BY preco DESC;");
    } catch {
      return null;
    }
  });
  const [error, setError] = useState<string | null>(null);

  // Desafios
  const [activeChallenge, setActiveChallenge] = useState<SqlChallenge | null>(null);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [challengeSuccess, setChallengeSuccess] = useState<boolean>(false);

  const dbSchema = engine.getDatabase();

  const handleRunQuery = () => {
    setError(null);
    setChallengeSuccess(false);
    try {
      const res = engine.runQuery(query);
      setResult(res);

      // Valida desafio se ativo
      if (activeChallenge) {
        if (activeChallenge.validateResult(res)) {
          setChallengeSuccess(true);
          if (!solvedChallenges.includes(activeChallenge.id)) {
            setSolvedChallenges((prev) => [...prev, activeChallenge.id]);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro de execução SQL");
      setResult(null);
    }
  };

  const handleSelectTable = (tableName: string) => {
    const newQ = `SELECT * FROM ${tableName} LIMIT 10;`;
    setQuery(newQ);
    setError(null);
    try {
      setResult(engine.runQuery(newQ));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApplyChallenge = (chal: SqlChallenge) => {
    setActiveChallenge(chal);
    setQuery(chal.starterQuery);
    setChallengeSuccess(false);
    setError(null);
    try {
      setResult(engine.runQuery(chal.starterQuery));
    } catch {}
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)] bg-background text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Database className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold text-cyan-400">Banco Relacional</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            SQL Playground Interativo
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Execute consultas SQL completas com SELECT, WHERE, JOINs, GROUP BY e resolva desafios práticos com validação.
          </p>
        </div>

        {/* Botão de Executar */}
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleRunQuery}
            className="font-mono text-xs gap-2 shadow-glow"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Executar SQL (Ctrl + Enter)</span>
          </Button>
        </div>
      </div>

      {/* Grid Principal: Schema (3), Editor + Resultados (9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Schema e Tabelas (coluna 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface border border-surface-border rounded-2xl p-4 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-primary-400" />
                Tabelas do Banco
              </h3>
              <span className="text-[10px] font-mono text-slate-500">PostgreSQL Mock</span>
            </div>

            <div className="space-y-3">
              {Object.values(dbSchema).map((tbl) => (
                <div
                  key={tbl.name}
                  className="p-3 rounded-xl bg-[#070A10] border border-surface-border hover:border-slate-600 transition-colors cursor-pointer group"
                  onClick={() => handleSelectTable(tbl.name)}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-primary-400">
                    <span className="flex items-center gap-1.5">
                      <Table className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary-400" />
                      {tbl.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-normal">
                      {tbl.rows.length} linhas
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-surface-border/40 space-y-1">
                    {tbl.columns.map((col) => (
                      <div key={col.name} className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400 flex items-center gap-1">
                          {col.isPrimary && <Key className="w-2.5 h-2.5 text-amber-400" />}
                          {col.name}
                        </span>
                        <span className="text-slate-600 text-[10px]">{col.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desafios SQL */}
          <div className="bg-surface border border-surface-border rounded-2xl p-4 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Desafios SQL
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">
                {solvedChallenges.length}/{mockSqlChallenges.length}
              </span>
            </div>

            <div className="space-y-2">
              {mockSqlChallenges.map((chal) => {
                const isSelected = activeChallenge?.id === chal.id;
                const isSolved = solvedChallenges.includes(chal.id);
                return (
                  <div
                    key={chal.id}
                    onClick={() => handleApplyChallenge(chal)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? "bg-primary-500/15 border-primary-500/50 text-white"
                        : "bg-[#070A10] border-surface-border text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="truncate">{chal.title}</span>
                      {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor de Código e Tabela de Resultados (coluna 9) */}
        <div className="lg:col-span-9 flex flex-col space-y-4">
          {/* Card do Desafio Ativo (se houver) */}
          {activeChallenge && (
            <div className="bg-primary-500/10 border border-primary-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary-300 font-mono uppercase">
                    Objetivo do Desafio:
                  </span>
                  <Badge variant="accent" className="text-[10px] font-mono">+{activeChallenge.xp} XP</Badge>
                </div>
                <p className="text-xs text-slate-300">{activeChallenge.description}</p>
              </div>

              {challengeSuccess && (
                <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 shrink-0 animate-bounce">
                  <CheckCircle2 className="w-4 h-4" />
                  Desafio Concluído!
                </div>
              )}
            </div>
          )}

          {/* Editor SQL com CodeMirror */}
          <div className="bg-[#070A10] border border-surface-border rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="h-10 bg-surface/80 border-b border-surface-border px-4 flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-primary-400" />
                <span>Consulta SQL (PostgreSQL)</span>
              </div>
              <span className="text-[11px] text-slate-500">Pressione Ctrl + Enter para rodar</span>
            </div>

            <div
              className="p-1 font-mono text-xs sm:text-sm"
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleRunQuery();
                }
              }}
            >
              <CodeMirror
                value={query}
                height="140px"
                theme={oneDark}
                extensions={[sql()]}
                onChange={(val) => setQuery(val)}
                className="text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Área de Erro ou Resultados */}
          {error ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <div className="font-bold">Erro de Sintaxe SQL:</div>
                <p className="mt-1 text-slate-300">{error}</p>
              </div>
            </div>
          ) : result ? (
            <div className="bg-surface border border-surface-border rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              {/* Header da Tabela */}
              <div className="h-10 bg-surface border-b border-surface-border px-4 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 text-slate-200 font-semibold">
                  <Table className="w-3.5 h-3.5 text-emerald-400" />
                  Resultado da Consulta ({result.rowCount} {result.rowCount === 1 ? "registro" : "registros"})
                </span>
                <span className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {result.executionTimeMs}ms
                </span>
              </div>

              {/* Tabela Interativa de Resultados */}
              <div className="overflow-x-auto max-h-72">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-[#070A10] border-b border-surface-border text-slate-400 uppercase text-[10px] sticky top-0">
                    <tr>
                      <th className="p-3 w-12 text-center text-slate-600">#</th>
                      {result.columns.map((col, idx) => (
                        <th key={idx} className="p-3 font-semibold text-slate-300">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border/40 text-slate-200">
                    {result.rows.length === 0 ? (
                      <tr>
                        <td
                          colSpan={result.columns.length + 1}
                          className="p-6 text-center text-slate-500 italic"
                        >
                          Nenhum registro retornado para os critérios especificados.
                        </td>
                      </tr>
                    ) : (
                      result.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-surface-hover/60 transition-colors">
                          <td className="p-3 text-center text-slate-600 text-[10px]">{rowIdx + 1}</td>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="p-3 whitespace-nowrap">
                              {cell === null ? (
                                <span className="text-slate-600 italic">NULL</span>
                              ) : typeof cell === "number" ? (
                                <span className="text-cyan-300 font-semibold">{cell}</span>
                              ) : (
                                cell
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
