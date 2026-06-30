"use client";

import React from "react";

type SymbolType = "start" | "operation" | "decision" | "io" | "arrow";

const symbols: Record<SymbolType, { color: string; stroke: string; label: string; render: (size: number) => JSX.Element }> = {
  start: {
    color: "#22c55e",
    stroke: "#15803d",
    label: "Start/Ende",
    render: (s) => (
      <svg width={s} height={s * 0.6} viewBox="0 0 50 30" className="inline-block align-middle mx-0.5">
        <rect x="2" y="2" width="46" height="26" rx="13" ry="13" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      </svg>
    ),
  },
  operation: {
    color: "#3b82f6",
    stroke: "#1d4ed8",
    label: "Operation",
    render: (s) => (
      <svg width={s} height={s * 0.6} viewBox="0 0 50 30" className="inline-block align-middle mx-0.5">
        <rect x="2" y="2" width="46" height="26" rx="3" ry="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
      </svg>
    ),
  },
  decision: {
    color: "#f59e0b",
    stroke: "#b45309",
    label: "Entscheidung",
    render: (s) => (
      <svg width={s} height={s * 0.7} viewBox="0 0 50 35" className="inline-block align-middle mx-0.5">
        <polygon points="25,2 48,17.5 25,33 2,17.5" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
      </svg>
    ),
  },
  io: {
    color: "#a855f7",
    stroke: "#6d28d9",
    label: "Ein-/Ausgabe",
    render: (s) => (
      <svg width={s} height={s * 0.55} viewBox="0 0 55 30" className="inline-block align-middle mx-0.5">
        <polygon points="10,2 53,2 45,28 2,28" fill="#a855f7" stroke="#6d28d9" strokeWidth="2" />
      </svg>
    ),
  },
  arrow: {
    color: "#94a3b8",
    stroke: "#94a3b8",
    label: "Flusspfeil",
    render: (s) => (
      <svg width={s} height={s * 0.4} viewBox="0 0 50 20" className="inline-block align-middle mx-0.5">
        <line x1="2" y1="10" x2="38" y2="10" stroke="#94a3b8" strokeWidth="2.5" />
        <polygon points="38,4 48,10 38,16" fill="#94a3b8" />
      </svg>
    ),
  },
};

interface PAPInlineIconProps {
  type: SymbolType;
  size?: number;
  showLabel?: boolean;
}

export function PAPInlineIcon({ type, size = 20, showLabel = false }: PAPInlineIconProps) {
  const sym = symbols[type];
  if (!sym) return null;

  return (
    <span className="inline-flex items-center gap-1" title={sym.label}>
      {sym.render(size)}
      {showLabel && <span className="text-xs text-slate-400">{sym.label}</span>}
    </span>
  );
}

// Mapping from text markers to icon types
// Used by the content renderer to replace emoji placeholders
export const PAP_ICON_MAP: Record<string, SymbolType> = {
  "🟢": "start",
  "🔵": "operation",
  "🔶": "decision",
  "▱": "io",
  "📥": "io",
  "➡️": "arrow",
};
