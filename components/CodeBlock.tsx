"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

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

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

// Inline Prism Tomorrow Theme
const prismTheme = `
/* Tomorrow Theme for Prism */
code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  hyphens: none;
}

pre[class*="language-"] {
  padding: 1em;
  margin: 0;
  overflow: auto;
  border-radius: 0.5em;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #1e293b;
}

:not(pre) > code[class*="language-"] {
  padding: 0.1em 0.3em;
  border-radius: 0.3em;
  white-space: normal;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6a9955;
}

.token.punctuation {
  color: #cccccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.deleted {
  color: #ce9178;
}

.token.function-name {
  color: #6196cc;
}

.token.boolean,
.token.number,
.token.function {
  color: #b5cea8;
}

.token.property,
.token.class-name,
.token.constant,
.token.symbol {
  color: #4ec9b0;
}

.token.selector,
.token.important,
.token.atrule,
.token.keyword,
.token.builtin {
  color: #c586c0;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
  color: #ce9178;
}

.token.operator,
.token.entity,
.token.url {
  color: #569cd6;
}

.token.important,
.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.entity {
  cursor: help;
}

.token.inserted {
  color: green;
}
`;

export function CodeBlock({ code, language = "tsx", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Inject theme if not already present
    if (!document.getElementById("prism-theme")) {
      const style = document.createElement("style");
      style.id = "prism-theme";
      style.textContent = prismTheme;
      document.head.appendChild(style);
    }

    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          {filename && (
            <span className="text-sm text-slate-400 font-mono">{filename}</span>
          )}
          <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-400">
            {language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Kopiert!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Kopieren</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code */}
      <pre className="!m-0 !bg-slate-900 !p-4 overflow-x-auto">
        <code ref={codeRef} className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
