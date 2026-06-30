"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// @ts-ignore
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-docker";

interface CodeSandboxProps {
  initialCode?: string;
  language?: string;
  title?: string;
  className?: string;
}

interface OutputLine {
  type: "log" | "warn" | "error" | "result" | "info";
  text: string;
  time?: string;
}

/**
 * Interaktive Code-Sandbox mit Syntax-Highlighting
 */
export function CodeSandbox({
  initialCode = '// Schreibe deinen Code hier\nconsole.log("Hallo Welt!");',
  language = "javascript",
  title = "Code Sandbox",
  className = "",
}: CodeSandboxProps) {
  // Automatische Spracherkennung basierend auf Code-Inhalt
  const detectedLanguage = useMemo(() => {
    if (language !== "javascript") return language;
    if (/(?:interface\s+\w+|type\s+\w+\s*=|:\s*(?:string|number|boolean|any|void|unknown|never)\b)/.test(initialCode)) return "typescript";
    if (/def\s+\w+|import\s+\w+|print\s*\(/.test(initialCode)) return "python";
    return "javascript";
  }, [initialCode, language]);

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Prism theme inject + Babel preload (für JSX)
  useEffect(() => {
    if (!document.getElementById("prism-sandbox-theme")) {
      const style = document.createElement("style");
      style.id = "prism-sandbox-theme";
      style.textContent = prismTheme;
      document.head.appendChild(style);
    }
    // Babel für JSX transpilation preloaden
    if (!document.getElementById("babel-standalone")) {
      const script = document.createElement("script");
      script.id = "babel-standalone";
      script.src = "https://unpkg.com/@babel/standalone/babel.min.js";
      document.head.appendChild(script);
    }
  }, []);

  // Highlight code
  useEffect(() => {
    if (highlightRef.current) {
      highlightRef.current.textContent = code;
      Prism.highlightElement(highlightRef.current);
    }
  }, [code]);

  const runCode = useCallback(() => {
    setIsRunning(true);
    setHasRun(true);
    const logs: OutputLine[] = [];
    const now = () => new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
    };

    console.log = (...args: unknown[]) => {
      logs.push({ type: "log", text: args.map(a => formatValue(a)).join(" "), time: now() });
    };
    console.warn = (...args: unknown[]) => {
      logs.push({ type: "warn", text: args.map(a => formatValue(a)).join(" "), time: now() });
    };
    console.error = (...args: unknown[]) => {
      logs.push({ type: "error", text: args.map(a => formatValue(a)).join(" "), time: now() });
    };
    console.info = (...args: unknown[]) => {
      logs.push({ type: "info", text: args.map(a => formatValue(a)).join(" "), time: now() });
    };

    try {
      let executableCode = code;

      // TypeScript/JSX erkennen und transpilieren
      const hasTS = /(?:interface\s+\w+|type\s+\w+\s*=|:\s*(?:string|number|boolean|any|void|unknown|never)\b|as\s+(?:string|number|boolean|any)|<[A-Z][a-zA-Z]*>)/.test(code);
      const hasJSX = /<[A-Z][a-zA-Z]*[\s/>]/.test(code) || /<>|<\//.test(code);
      const needsBabel = hasTS || hasJSX;

      if (needsBabel && typeof window !== "undefined") {
        // Babel laden wenn noch nicht geladen
        const babelId = "babel-standalone";
        if (!document.getElementById(babelId)) {
          const script = document.createElement("script");
          script.id = babelId;
          script.src = "https://unpkg.com/@babel/standalone/babel.min.js";
          document.head.appendChild(script);
          throw new Error("TypeScript/JSX erkannt — bitte nochmal klicken (Babel wird geladen)");
        }
        // @ts-ignore
        if (window.Babel) {
          // @ts-ignore
          executableCode = window.Babel.transform(code, {
            presets: hasTS ? ["typescript", "react"] : ["react"],
            filename: hasTS ? "sandbox.tsx" : "sandbox.jsx",
          }).code;
        } else {
          // Script-Tag existiert, aber Babel ist noch nicht geladen
          throw new Error("TypeScript/JSX erkannt — bitte nochmal klicken (Babel wird geladen)");
        }
      }

      // eslint-disable-next-line no-eval
      const result = eval(executableCode);
      if (result !== undefined) {
        logs.push({ type: "result", text: "→ " + formatValue(result), time: now() });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("Babel wird geladen")) {
        logs.push({ type: "info", text: "⏳ Babel wird geladen... Bitte nochmal ▶ Run klicken.", time: now() });
      } else {
        logs.push({ type: "error", text: "❌ " + msg, time: now() });
      }
    } finally {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
      setOutput(logs);
      setIsRunning(false);
      setTimeout(() => outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" }), 50);
    }
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(initialCode);
    setOutput([]);
    setHasRun(false);
  }, [initialCode]);

  const clearOutput = useCallback(() => {
    setOutput([]);
    setHasRun(false);
  }, []);

  // Sync scroll between textarea and highlight
  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current?.parentElement) {
      highlightRef.current.parentElement.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.parentElement.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      setCode(code.substring(0, start) + "  " + code.substring(end));
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2; });
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  }, [code, runCode]);

  return (
    <div className={`rounded-xl overflow-hidden border border-slate-700/50 shadow-lg transition-all ${isExpanded ? "fixed inset-4 z-50 flex flex-col" : ""} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/90 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-sm text-slate-300 font-medium">{title}</span>
          <span className="text-xs px-2 py-0.5 bg-slate-700/80 rounded text-slate-400 font-mono">{detectedLanguage}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => setIsExpanded(!isExpanded)} className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors" title={isExpanded ? "Verkleinern" : "Vergrößern"}>
            {isExpanded ? "⊟ Kompakt" : "⊞ Vollbild"}
          </button>
          <button onClick={resetCode} className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors" title="Zurücksetzen">↺ Reset</button>
          <button onClick={clearOutput} className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors" title="Output löschen">🗑 Clear</button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded text-sm font-medium transition-colors disabled:opacity-50 ml-1"
          >
            {isRunning ? (<><span className="animate-spin">⏳</span> Läuft...</>) : (<>▶ Run <span className="text-xs text-green-500/60 ml-1">⌘↵</span></>)}
          </button>
        </div>
      </div>

      {/* Editor with Prism overlay */}
      <div className={`relative bg-[#1e1e2e] ${isExpanded ? "flex-1 min-h-0" : "min-h-[280px] max-h-[500px]"}`}>
        {/* Line numbers */}
        <div className="absolute left-0 top-0 w-12 h-full bg-slate-900/60 border-r border-slate-800/50 z-10 pointer-events-none overflow-hidden">
          {code.split("\n").map((_, i) => (
            <div key={i} className="text-right pr-3 text-xs text-slate-600 font-mono leading-[1.65] h-[1.65rem]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Highlighted code (background) */}
        <pre className={`!m-0 !p-4 !pl-14 !bg-transparent overflow-hidden pointer-events-none absolute inset-0 z-0 ${isExpanded ? "overflow-y-auto" : ""}`} aria-hidden="true">
          <code ref={highlightRef} className={`language-${detectedLanguage} !bg-transparent`}>{code}</code>
        </pre>

        {/* Textarea (foreground, transparent) */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={syncScroll}
          className={`w-full p-4 pl-14 bg-transparent text-transparent caret-white resize-none focus:outline-none leading-[1.65] font-mono text-[0.9em] relative z-10 selection:bg-blue-500/30 ${isExpanded ? "h-full" : "min-h-[280px] max-h-[500px] resize-y"}`}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="// Code hier eingeben..."
          style={{ tabSize: 2, caretColor: "#fff" }}
        />
      </div>

      {/* Output */}
      {hasRun && (
        <div className={`border-t border-slate-700/50 ${isExpanded ? "max-h-[300px]" : ""}`}>
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-mono">📟</span>
              <span>Output</span>
              <span className="text-slate-600">•</span>
              <span>{output.length} {output.length === 1 ? "Zeile" : "Zeilen"}</span>
            </div>
            <button onClick={clearOutput} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">✕</button>
          </div>
          <div ref={outputRef} className={`p-4 bg-[#0d1117] font-mono text-sm overflow-y-auto space-y-0.5 ${isExpanded ? "max-h-[300px]" : "max-h-[250px]"}`}>
            {output.length === 0 ? (
              <div className="text-slate-600 italic text-xs">Kein Output</div>
            ) : (
              output.map((line, i) => (
                <div key={i} className={`flex items-start gap-3 py-0.5 px-2 rounded ${getOutputBg(line.type)}`}>
                  <span className="text-slate-600 text-xs min-w-[70px] shrink-0 font-mono opacity-60">{line.time}</span>
                  <span className={`flex-1 ${getOutputColor(line.type)}`}>{line.text}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function formatValue(val: unknown): string {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (typeof val === "object") {
    try { return JSON.stringify(val, null, 2); } catch { return String(val); }
  }
  return String(val);
}

function getOutputColor(type: OutputLine["type"]): string {
  switch (type) {
    case "warn": return "text-yellow-400";
    case "error": return "text-red-400";
    case "result": return "text-blue-400";
    case "info": return "text-cyan-400";
    default: return "text-slate-300";
  }
}

function getOutputBg(type: OutputLine["type"]): string {
  switch (type) {
    case "warn": return "bg-yellow-500/5";
    case "error": return "bg-red-500/5";
    case "result": return "bg-blue-500/5";
    default: return "";
  }
}

// Prism Tomorrow Night theme for sandbox
const prismTheme = `
#prism-sandbox-theme, .prism-sandbox code[class*="language-"],
pre[class*="language-"] .token.comment { color: #6a9955; }
pre[class*="language-"] .token.punctuation { color: #d4d4d4; }
pre[class*="language-"] .token.property,
pre[class*="language-"] .token.tag,
pre[class*="language-"] .token.boolean,
pre[class*="language-"] .token.number,
pre[class*="language-"] .token.constant,
pre[class*="language-"] .token.symbol { color: #b5cea8; }
pre[class*="language-"] .token.selector,
pre[class*="language-"] .token.attr-name,
pre[class*="language-"] .token.string,
pre[class*="language-"] .token.char,
pre[class*="language-"] .token.builtin { color: #ce9178; }
pre[class*="language-"] .token.operator,
pre[class*="language-"] .token.entity,
pre[class*="language-"] .token.url { color: #d4d4d4; }
pre[class*="language-"] .token.atrule,
pre[class*="language-"] .token.attr-value,
pre[class*="language-"] .token.keyword { color: #c586c0; }
pre[class*="language-"] .token.function,
pre[class*="language-"] .token.class-name { color: #dcdcaa; }
pre[class*="language-"] .token.regex,
pre[class*="language-"] .token.important,
pre[class*="language-"] .token.variable { color: #d16969; }
`;
