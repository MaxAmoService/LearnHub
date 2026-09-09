"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../AuthProvider";
import { evaluateExpression, formatCalculatorResult } from "@/lib/calculator";
import { Delete, History, Eraser } from "lucide-react";

const HISTORY_KEY_PREFIX = "learnhub_clicker_calc_";
const MAX_HISTORY = 20;

type Btn =
  | "C" | "⌫" | "(" | ")" | "÷" | "√" | "²" | "%"
  | "7" | "8" | "9" | "×"
  | "4" | "5" | "6" | "-"
  | "1" | "2" | "3" | "+"
  | "±" | "0" | "," | "=";

const BUTTONS: Btn[] = [
  "C", "⌫", "√", "²", "(", ")", "%", "÷",
  "7", "8", "9", "×",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "±", "0", ",", "=",
];

export default function CalculatorPanel() {
  const { user } = useAuth();
  const [expr, setExpr] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const historyKey = useMemo(
    () => HISTORY_KEY_PREFIX + (user?.uid ?? "anon"),
    [user?.uid],
  );
  const historyRef = useRef(history);
  historyRef.current = history;

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(historyKey);
      if (raw) setHistory(JSON.parse(raw) as string[]);
    } catch { /* defekt → leere Historie */ }
  }, [historyKey, user]);

  const persistHistory = (h: string[]) => {
    try {
      localStorage.setItem(historyKey, JSON.stringify(h));
    } catch { /* quota */ }
  };

  const preview = useMemo(() => {
    if (!expr.trim()) return null;
    const v = evaluateExpression(expr);
    return v === null ? null : formatCalculatorResult(v);
  }, [expr]);

  const handleButton = (b: Btn) => {
    setLastResult(null);
    if (b === "C") {
      setExpr("");
      return;
    }
    if (b === "⌫") {
      setExpr((e) => e.slice(0, -1));
      return;
    }
    if (b === "=") {
      if (!expr.trim()) return;
      const v = evaluateExpression(expr);
      if (v === null) {
        setExpr("Fehler");
        return;
      }
      const result = formatCalculatorResult(v);
      const entry = `${expr} = ${result}`;
      const h = [entry, ...historyRef.current.filter((x) => x !== entry)].slice(0, MAX_HISTORY);
      setHistory(h);
      persistHistory(h);
      setExpr(result);
      setLastResult(v);
      return;
    }
    if (b === "±") {
      setExpr((e) => {
        if (!e) return "-";
        if (e === "Fehler") return e;
        const v = evaluateExpression(e);
        if (v === null) return e;
        return formatCalculatorResult(-v);
      });
      return;
    }
    if (b === ",") {
      setExpr((e) => {
        // Dezimaltrenner an den letzten Zahlenabschnitt anhängen
        if (/([,.]\d*)$/.test(e)) return e;
        if (/\d$/.test(e)) return e + ",";
        return e + "0,";
      });
      return;
    }
    setExpr((e) => (e === "Fehler" ? b : e + b));
  };

  if (!user) return null;

  return (
    <div className="p-3">
      {/* Display */}
      <div className="rounded-lg bg-slate-900/80 border border-slate-700/60 px-3 py-2 mb-2">
        <div className="text-right text-sm text-slate-500 min-h-[1.25rem] truncate tabular-nums">
          {expr || "0"}
        </div>
        <div className="text-right text-2xl font-bold text-white tabular-nums truncate min-h-[2rem]">
          {expr ? (preview !== null ? preview : expr) : lastResult !== null ? formatCalculatorResult(lastResult) : "\u00A0"}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mb-2">
        {BUTTONS.map((b) => (
          <button
            key={b}
            onClick={() => handleButton(b)}
            aria-label={b === "⌫" ? "Letztes Zeichen löschen" : undefined}
            className={`h-11 rounded-lg border text-base font-semibold transition-colors active:scale-95 ${
              b === "="
                ? "col-span-1 bg-amber-500/30 border-amber-500/50 text-amber-300 hover:bg-amber-500/40"
                : /^[0-9]$/.test(b)
                  ? "bg-slate-800/80 border-slate-700/60 text-white hover:bg-slate-700"
                  : b === "C" || b === "⌫"
                    ? "bg-red-500/15 border-red-500/40 text-red-300 hover:bg-red-500/25"
                    : "bg-slate-800/40 border-slate-700/60 text-blue-300 hover:bg-slate-700/60"
            }`}
          >
            {b === "⌫" ? <Delete className="w-4 h-4 mx-auto" /> : b}
          </button>
        ))}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="border-t border-slate-700/50 pt-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
            <History className="w-3 h-3" /> Verlauf
            <button
              onClick={() => {
                setHistory([]);
                try { localStorage.removeItem(historyKey); } catch {}
              }}
              className="ml-auto flex items-center gap-1 text-slate-600 hover:text-slate-400 transition-colors"
              title="Verlauf löschen"
            >
              <Eraser className="w-3 h-3" /> löschen
            </button>
          </div>
          <div className="max-h-28 overflow-y-auto space-y-1">
            {history.map((h, i) => (
              <button
                key={`${h}-${i}`}
                onClick={() => setExpr(h.split(" = ")[1] ?? h)}
                className="block w-full text-left text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800/60 transition-colors truncate tabular-nums"
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
