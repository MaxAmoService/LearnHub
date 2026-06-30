"use client";

import { useState, useCallback } from "react";

interface SeqObject {
  id: string;
  name: string;
  x: number;
  color: string;
}

interface SeqMessage {
  from: string;
  to: string;
  label: string;
  isReturn?: boolean;
  step: number;
}

const objects: SeqObject[] = [
  { id: "kunde", name: "Kunde", x: 80, color: "#3b82f6" },
  { id: "system", name: "Bestellsystem", x: 220, color: "#f59e0b" },
  { id: "warenkorb", name: "Warenkorb", x: 360, color: "#22c55e" },
  { id: "zahlung", name: "Zahlungssystem", x: 500, color: "#a855f7" },
];

const messages: SeqMessage[] = [
  { from: "kunde", to: "system", label: "Produkt auswählen", step: 1 },
  { from: "system", to: "warenkorb", label: "Produkt hinzufügen", step: 2 },
  { from: "warenkorb", to: "system", label: "Bestätigung", isReturn: true, step: 3 },
  { from: "system", to: "kunde", label: "Im Warenkorb ✓", isReturn: true, step: 4 },
  { from: "kunde", to: "system", label: "Bestellen", step: 5 },
  { from: "system", to: "zahlung", label: "Zahlung anfordern", step: 6 },
  { from: "zahlung", to: "system", label: "Zahlung OK ✓", isReturn: true, step: 7 },
  { from: "system", to: "kunde", label: "Bestellung bestätigt 🎉", isReturn: true, step: 8 },
];

export function SequenceDiagram() {
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<"explore" | "all">("explore");

  const maxSteps = messages.length;

  const nextStep = useCallback(() => {
    setCurrentStep((s) => Math.min(s + 1, maxSteps));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  const objMap = Object.fromEntries(objects.map((o) => [o.id, o]));
  const visibleMessages = mode === "all" ? messages : messages.slice(0, currentStep);
  const currentMessage = currentStep > 0 && currentStep <= maxSteps ? messages[currentStep - 1] : null;

  const svgWidth = 580;
  const svgHeight = 500;
  const lifelineStartY = 80;
  const lifelineEndY = svgHeight - 30;
  const msgSpacing = 45;
  const msgStartY = 130;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">📡 Sequenzdiagramm</h4>
        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-medium">
          Schritt {currentStep} / {maxSteps}
        </span>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "explore" as const, label: "🔍 Schrittweise", color: "blue" },
          { key: "all" as const, label: "📋 Komplett", color: "emerald" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              mode === m.key
                ? m.key === "explore"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-400 mb-4">
        {mode === "explore"
          ? "Verfolge die Nachrichten zwischen den Objekten Schritt für Schritt."
          : "Das vollständige Sequenzdiagramm der Online-Bestellung."}
      </p>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* SVG */}
        <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 overflow-x-auto">
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
            <defs>
              <marker id="seq-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="seq-arrow-open" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polyline points="0 0, 10 3.5, 0 7" fill="none" stroke="#94a3b8" strokeWidth={1.5} />
              </marker>
            </defs>

            {/* Objekte */}
            {objects.map((obj) => {
              const isInvolved = currentMessage && (currentMessage.from === obj.id || currentMessage.to === obj.id);
              return (
                <g key={obj.id}>
                  {/* Box */}
                  <rect
                    x={obj.x - 45}
                    y={20}
                    width={90}
                    height={40}
                    rx={6}
                    fill={isInvolved ? obj.color + "50" : obj.color + "25"}
                    stroke={isInvolved ? obj.color : obj.color + "60"}
                    strokeWidth={isInvolved ? 2.5 : 1.5}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  <text x={obj.x} y={45} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">
                    {obj.name}
                  </text>
                  {/* Lebenslinie */}
                  <line
                    x1={obj.x}
                    y1={lifelineStartY}
                    x2={obj.x}
                    y2={lifelineEndY}
                    stroke={obj.color + "40"}
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                  />
                </g>
              );
            })}

            {/* Nachrichten */}
            {visibleMessages.map((msg, i) => {
              const fromObj = objMap[msg.from];
              const toObj = objMap[msg.to];
              if (!fromObj || !toObj) return null;

              const y = msgStartY + i * msgSpacing;
              const x1 = fromObj.x;
              const x2 = toObj.x;
              const isCurrent = currentMessage === msg;
              const isReturn = msg.isReturn;

              return (
                <g key={i} style={{ transition: "all 0.3s ease" }}>
                  {/* Aktivierungsbalken am Empfänger */}
                  {!isReturn && (
                    <rect
                      x={x2 - 6}
                      y={y - 5}
                      width={12}
                      height={msgSpacing - 5}
                      rx={2}
                      fill={toObj.color + "30"}
                      stroke={toObj.color + "50"}
                      strokeWidth={1}
                    />
                  )}
                  {/* Nachrichten-Pfeil */}
                  <line
                    x1={x1 + (x2 > x1 ? 6 : -6)}
                    y1={y}
                    x2={x2 + (x2 > x1 ? -12 : 12)}
                    y2={y}
                    stroke={isCurrent ? (isReturn ? "#22c55e" : "#f59e0b") : "#64748b"}
                    strokeWidth={isCurrent ? 2.5 : 1.5}
                    strokeDasharray={isReturn ? "6 3" : "none"}
                    markerEnd={isReturn ? "url(#seq-arrow-open)" : "url(#seq-arrow)"}
                    style={{ transition: "all 0.3s ease" }}
                  />
                  {/* Label */}
                  <text
                    x={(x1 + x2) / 2}
                    y={y - 8}
                    textAnchor="middle"
                    fill={isCurrent ? "white" : "#94a3b8"}
                    fontSize={11}
                    fontWeight={isCurrent ? "bold" : "normal"}
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {msg.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info-Panel */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          {mode === "explore" && (
            <>
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-2">
                  {currentStep > 0 ? `Nachricht ${currentStep} / ${maxSteps}` : "Bereit?"}
                </p>
                {currentMessage ? (
                  <div>
                    <p className="text-white font-bold text-lg mb-2">
                      {objMap[currentMessage.from]?.name} → {objMap[currentMessage.to]?.name}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="font-mono text-cyan-300">&quot;{currentMessage.label}&quot;</span>
                      {currentMessage.isReturn && (
                        <span className="block mt-1 text-emerald-400 text-xs">↩ Rücknachricht (gestrichelt)</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Klicke auf &quot;Weiter&quot; um die erste Nachricht zu sehen.</p>
                )}
              </div>

              {/* Nachrichten-Liste */}
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Nachrichten</p>
                <div className="space-y-1.5 max-h-[250px] overflow-y-auto">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
                        i < currentStep ? "bg-slate-700/30 text-slate-300" : "text-slate-600"
                      } ${i === currentStep - 1 ? "ring-1 ring-cyan-500/50" : ""}`}
                    >
                      <span className="font-mono text-slate-500 w-4">{i + 1}</span>
                      <span className="text-blue-400">{objMap[msg.from]?.name}</span>
                      <span className="text-slate-600">→</span>
                      <span className="text-amber-400">{objMap[msg.to]?.name}</span>
                      <span className="text-slate-500 ml-auto truncate">&quot;{msg.label}&quot;</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex-1 px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold"
                >
                  ← Zurück
                </button>
                <button
                  onClick={reset}
                  className="px-4 py-2.5 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-700 transition-all text-sm font-semibold"
                >
                  ↺ Reset
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep >= maxSteps}
                  className="flex-1 px-4 py-2.5 bg-cyan-600 text-white rounded-xl disabled:opacity-20 hover:bg-cyan-500 transition-all text-sm font-semibold shadow-lg shadow-cyan-500/20"
                >
                  Weiter →
                </button>
              </div>
            </>
          )}

          {mode === "all" && (
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
              <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-3">Alle Nachrichten</p>
              <div className="space-y-2">
                {messages.map((msg, i) => (
                  <div key={i} className="flex items-start gap-2 px-3 py-2 bg-slate-900/30 rounded-lg">
                    <span className="text-xs font-mono text-slate-500 mt-0.5">{i + 1}.</span>
                    <div>
                      <span className="text-xs text-blue-400">{objMap[msg.from]?.name}</span>
                      <span className="text-xs text-slate-600 mx-1">→</span>
                      <span className="text-xs text-amber-400">{objMap[msg.to]?.name}</span>
                      <p className="text-xs text-slate-400 mt-0.5">&quot;{msg.label}&quot;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
