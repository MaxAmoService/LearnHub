"use client";

import { useState, useCallback, useRef } from "react";

interface VennDiagramExplorerProps {
  className?: string;
}

const COLORS = {
  A: { fill: "rgba(99, 102, 241, 0.3)", stroke: "#818cf8" },
  B: { fill: "rgba(236, 72, 153, 0.3)", stroke: "#f472b6" },
  C: { fill: "rgba(34, 197, 94, 0.3)", stroke: "#4ade80" },
};

export function VennDiagramExplorer({ className = "" }: VennDiagramExplorerProps) {
  const [cardA, setCardA] = useState(40);
  const [cardB, setCardB] = useState(30);
  const [cardAB, setCardAB] = useState(10);
  const [cardU, setCardU] = useState(80);
  const [activeOp, setActiveOp] = useState<"union" | "intersect" | "diff" | "complement">("union");
  const svgRef = useRef<SVGSVGElement>(null);

  const cxA = 200, cyA = 170, cxB = 320, cyB = 170, r = 90;

  const cardAonly = cardA - cardAB;
  const cardBonly = cardB - cardAB;
  const cardOutside = cardU - cardA - cardB + cardAB;

  const getHighlight = useCallback((region: "Aonly" | "Bonly" | "AB" | "outside") => {
    switch (activeOp) {
      case "union":
        return region !== "outside";
      case "intersect":
        return region === "AB";
      case "diff":
        return region === "Aonly";
      case "complement":
        return region === "outside" || region === "Bonly";
    }
  }, [activeOp]);

  const resultCard = (() => {
    switch (activeOp) {
      case "union": return cardA + cardB - cardAB;
      case "intersect": return cardAB;
      case "diff": return cardA - cardAB;
      case "complement": return cardU - cardA;
    }
  })();

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">|A| = {cardA}</label>
          <input type="range" min={0} max={100} value={cardA} onChange={e => setCardA(+e.target.value)}
            className="w-full accent-indigo-500" />
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">|B| = {cardB}</label>
          <input type="range" min={0} max={100} value={cardB} onChange={e => setCardB(+e.target.value)}
            className="w-full accent-pink-500" />
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">|A ∩ B| = {cardAB}</label>
          <input type="range" min={0} max={Math.min(cardA, cardB)} value={cardAB} onChange={e => setCardAB(+e.target.value)}
            className="w-full accent-amber-500" />
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
          <label className="text-xs text-slate-400 mb-1 block">|U| = {cardU}</label>
          <input type="range" min={Math.max(cardA, cardB)} max={200} value={cardU} onChange={e => setCardU(+e.target.value)}
            className="w-full accent-slate-500" />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["union", "intersect", "diff", "complement"] as const).map(op => (
          <button key={op} onClick={() => setActiveOp(op)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              activeOp === op
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
            }`}>
            {op === "union" ? "A ∪ B" : op === "intersect" ? "A ∩ B" : op === "diff" ? "A \\ B" : "Ā"}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex justify-center">
        <svg ref={svgRef} viewBox="0 0 520 340" className="w-full max-w-lg">
          <rect x="30" y="20" width="460" height="300" rx="12" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="6 4" />
          <text x="475" y="310" fill="#64748b" fontSize="14" textAnchor="end">U</text>

          <circle cx={cxA} cy={cyA} r={r}
            fill={getHighlight("Aonly") || getHighlight("AB") ? COLORS.A.fill : "rgba(30,41,59,0.5)"}
            stroke={COLORS.A.stroke} strokeWidth="2" />
          <circle cx={cxB} cy={cyB} r={r}
            fill={getHighlight("Bonly") || getHighlight("AB") ? COLORS.B.fill : "rgba(30,41,59,0.5)"}
            stroke={COLORS.B.stroke} strokeWidth="2" />

          {getHighlight("outside") && (
            <rect x="30" y="20" width="460" height="300" rx="12"
              fill="rgba(34,197,94,0.1)" stroke="none"
              mask="url(#venn-mask)" />
          )}

          <text x={cxA - 35} cy={cyA} y={cyA + 5} fill="#a5b4fc" fontSize="16" fontWeight="bold" textAnchor="middle">{cardAonly}</text>
          <text x={(cxA + cxB) / 2} y={cyA + 5} fill="#fcd34d" fontSize="16" fontWeight="bold" textAnchor="middle">{cardAB}</text>
          <text x={cxB + 35} y={cyB + 5} fill="#f9a8d4" fontSize="16" fontWeight="bold" textAnchor="middle">{cardBonly}</text>
          <text x={440} y={50} fill="#94a3b8" fontSize="14" textAnchor="middle">{cardOutside}</text>

          <text x={cxA} y={cyA - r - 10} fill="#818cf8" fontSize="16" fontWeight="bold" textAnchor="middle">A</text>
          <text x={cxB} y={cyB - r - 10} fill="#f472b6" fontSize="16" fontWeight="bold" textAnchor="middle">B</text>
        </svg>
      </div>

      <div className="bg-slate-800/30 rounded-lg p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">
            {activeOp === "union" ? "|A ∪ B| = |A| + |B| - |A ∩ B|" :
             activeOp === "intersect" ? "|A ∩ B|" :
             activeOp === "diff" ? "|A \\ B| = |A| - |A ∩ B|" :
             "|Ā| = |U| - |A|"}
          </span>
          <span className="text-2xl font-bold text-white">{resultCard}</span>
        </div>
        <p className="text-slate-400 mt-1">
          {activeOp === "union" ? `${cardA} + ${cardB} - ${cardAB} = ${resultCard}` :
           activeOp === "intersect" ? `Direkt abgelesen: ${resultCard}` :
           activeOp === "diff" ? `${cardA} - ${cardAB} = ${resultCard}` :
           `${cardU} - ${cardA} = ${resultCard}`}
        </p>
      </div>

      {cardAB > Math.min(cardA, cardB) && (
        <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-3 text-sm text-red-300">
          ⚠ |A ∩ B| kann nicht größer als |A| oder |B| sein!
        </div>
      )}
    </div>
  );
}
