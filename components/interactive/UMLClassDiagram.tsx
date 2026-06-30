"use client";

import { useState, useCallback } from "react";

interface UMLAttribute {
  visibility: "+" | "-" | "#";
  name: string;
  type: string;
}

interface UMLMethod {
  visibility: "+" | "-" | "#";
  name: string;
  params: string;
  returnType: string;
}

interface UMLClass {
  id: string;
  name: string;
  x: number;
  y: number;
  attributes: UMLAttribute[];
  methods: UMLMethod[];
  color: string;
}

type RelationType = "association" | "aggregation" | "composition" | "inheritance";

interface UMLRelation {
  from: string;
  to: string;
  type: RelationType;
  fromCard?: string;
  toCard?: string;
  label?: string;
}

const classes: UMLClass[] = [
  {
    id: "kunde",
    name: "Kunde",
    x: 50,
    y: 40,
    color: "#3b82f6",
    attributes: [
      { visibility: "-", name: "kundenId", type: "int" },
      { visibility: "-", name: "name", type: "String" },
      { visibility: "-", name: "email", type: "String" },
      { visibility: "+", name: "adresse", type: "String" },
    ],
    methods: [
      { visibility: "+", name: "bestellen", params: "artikel: Artikel[]", returnType: "Bestellung" },
      { visibility: "+", name: "getBestellungen", params: "", returnType: "Bestellung[]" },
    ],
  },
  {
    id: "bestellung",
    name: "Bestellung",
    x: 280,
    y: 40,
    color: "#f59e0b",
    attributes: [
      { visibility: "-", name: "bestellId", type: "int" },
      { visibility: "-", name: "datum", type: "Date" },
      { visibility: "-", name: "status", type: "String" },
      { visibility: "+", name: "gesamtpreis", type: "double" },
    ],
    methods: [
      { visibility: "+", name: "berechneTotal", params: "", returnType: "double" },
      { visibility: "+", name: "abschliessen", params: "", returnType: "void" },
      { visibility: "-", name: "aktualisiereStatus", params: "status: String", returnType: "void" },
    ],
  },
  {
    id: "artikel",
    name: "Artikel",
    x: 280,
    y: 320,
    color: "#22c55e",
    attributes: [
      { visibility: "-", name: "artikelId", type: "int" },
      { visibility: "-", name: "name", type: "String" },
      { visibility: "+", name: "preis", type: "double" },
      { visibility: "+", name: "bestand", type: "int" },
    ],
    methods: [
      { visibility: "+", name: "reduziereBestand", params: "menge: int", returnType: "void" },
      { visibility: "+", name: "istVerfuegbar", params: "", returnType: "boolean" },
    ],
  },
  {
    id: "mitarbeiter",
    name: "Mitarbeiter",
    x: 50,
    y: 320,
    color: "#a855f7",
    attributes: [
      { visibility: "-", name: "mitarbeiterId", type: "int" },
      { visibility: "-", name: "name", type: "String" },
      { visibility: "-", name: "abteilung", type: "String" },
    ],
    methods: [
      { visibility: "+", name: "pruefeBestellung", params: "b: Bestellung", returnType: "boolean" },
      { visibility: "+", name: "versendeBestellung", params: "b: Bestellung", returnType: "void" },
    ],
  },
];

const relations: UMLRelation[] = [
  { from: "kunde", to: "bestellung", type: "association", fromCard: "1", toCard: "*", label: "hat" },
  { from: "bestellung", to: "artikel", type: "aggregation", fromCard: "1", toCard: "*", label: "enthält" },
  { from: "bestellung", to: "mitarbeiter", type: "association", fromCard: "*", toCard: "1", label: "bearbeitet" },
];

const relationSteps = [
  { relationIdx: 0, title: "Assoziation: Kunde → Bestellung", description: "Ein Kunde hat viele Bestellungen (1:n). Die Assoziation zeigt eine einfache Verbindung zwischen zwei Klassen. Beide Klassen können unabhängig existieren." },
  { relationIdx: 1, title: "Aggregation: Bestellung → Artikel", description: "Eine Bestellung enthält viele Artikel (1:n). Die Aggregation (leere Raute) zeigt eine lose Kopplung — Artikel existieren auch ohne die Bestellung." },
  { relationIdx: 2, title: "Assoziation: Bestellung → Mitarbeiter", description: "Ein Mitarbeiter bearbeitet viele Bestellungen (1:n). Einfache Verbindung — beide Seiten sind unabhängig." },
];

function getClassById(id: string): UMLClass | undefined {
  return classes.find((c) => c.id === id);
}

function renderRelation(rel: UMLRelation, fromClass: UMLClass, toClass: UMLClass, isHighlighted: boolean) {
  const fromCx = fromClass.x + 100;
  const fromCy = fromClass.y + 60;
  const toCx = toClass.x + 100;
  const toCy = toClass.y + 60;

  // Calculate edge points
  const angle = Math.atan2(toCy - fromCy, toCx - fromCx);
  const fromW = 100, fromH = 60;
  const toW = 100, toH = 60;

  let x1 = fromCx, y1 = fromCy, x2 = toCx, y2 = toCy;

  // Simple edge detection
  if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
    x1 = fromCx + Math.sign(Math.cos(angle)) * fromW;
    x2 = toCx - Math.sign(Math.cos(angle)) * toW;
    y1 = fromCy + Math.tan(angle) * fromW * Math.sign(Math.cos(angle));
    y2 = toCy - Math.tan(angle) * toW * Math.sign(Math.cos(angle));
  } else {
    y1 = fromCy + Math.sign(Math.sin(angle)) * fromH;
    y2 = toCy - Math.sign(Math.sin(angle)) * toH;
    x1 = fromCx + (fromH / Math.tan(angle)) * Math.sign(Math.sin(angle));
    x2 = toCx - (toH / Math.tan(angle)) * Math.sign(Math.sin(angle));
  }

  const opacity = isHighlighted ? 1 : 0.15;
  const strokeColor = isHighlighted ? "#94a3b8" : "#334155";

  let marker = "";
  let diamond = null;

  switch (rel.type) {
    case "association":
      marker = "url(#uml-arrow)";
      break;
    case "aggregation":
      diamond = (
        <polygon
          points={`${x2},${y2 - 8} ${x2 + 15},${y2} ${x2},${y2 + 8} ${x2 - 15},${y2}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth={2}
        />
      );
      break;
    case "composition":
      diamond = (
        <polygon
          points={`${x2},${y2 - 8} ${x2 + 15},${y2} ${x2},${y2 + 8} ${x2 - 15},${y2}`}
          fill={strokeColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
      );
      break;
    case "inheritance":
      marker = "url(#uml-triangle)";
      break;
  }

  return (
    <g key={`${rel.from}-${rel.to}`} opacity={opacity} style={{ transition: "opacity 0.5s ease" }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeColor} strokeWidth={2} markerEnd={marker} />
      {diamond}
      {/* Kardinalitäten */}
      {rel.fromCard && (
        <text x={x1 + 10} y={y1 - 8} fill={isHighlighted ? "#cbd5e1" : "#475569"} fontSize={11} fontWeight="bold">
          {rel.fromCard}
        </text>
      )}
      {rel.toCard && (
        <text x={x2 + 10} y={y2 - 8} fill={isHighlighted ? "#cbd5e1" : "#475569"} fontSize={11} fontWeight="bold">
          {rel.toCard}
        </text>
      )}
      {/* Label */}
      {rel.label && isHighlighted && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 10} textAnchor="middle" fill="#cbd5e1" fontSize={10} fontStyle="italic">
          {rel.label}
        </text>
      )}
    </g>
  );
}

function renderClass(cls: UMLClass, isSelected: boolean) {
  const headerH = 32;
  const attrH = cls.attributes.length * 20 + 12;
  const methodH = cls.methods.length * 20 + 12;
  const totalH = headerH + attrH + methodH;
  const w = 200;

  return (
    <g key={cls.id} style={{ transition: "all 0.3s ease" }}>
      {/* Background */}
      <rect
        x={cls.x}
        y={cls.y}
        width={w}
        height={totalH}
        rx={4}
        fill={isSelected ? cls.color + "25" : "#1e293b"}
        stroke={isSelected ? cls.color : "#475569"}
        strokeWidth={isSelected ? 2.5 : 1.5}
        style={{ transition: "all 0.3s ease" }}
      />

      {/* Header */}
      <rect x={cls.x} y={cls.y} width={w} height={headerH} rx={4} fill={cls.color + "40"} />
      <text x={cls.x + w / 2} y={cls.y + 21} textAnchor="middle" fill="white" fontSize={14} fontWeight="bold">
        {cls.name}
      </text>

      {/* Divider */}
      <line x1={cls.x} y1={cls.y + headerH} x2={cls.x + w} y2={cls.y + headerH} stroke="#475569" strokeWidth={1} />

      {/* Attributes */}
      {cls.attributes.map((attr, i) => (
        <text
          key={attr.name}
          x={cls.x + 10}
          y={cls.y + headerH + 16 + i * 20}
          fill="#94a3b8"
          fontSize={11}
          fontFamily="monospace"
        >
          {attr.visibility} {attr.name}: {attr.type}
        </text>
      ))}

      {/* Divider */}
      <line
        x1={cls.x}
        y1={cls.y + headerH + attrH}
        x2={cls.x + w}
        y2={cls.y + headerH + attrH}
        stroke="#475569"
        strokeWidth={1}
      />

      {/* Methods */}
      {cls.methods.map((method, i) => (
        <text
          key={method.name}
          x={cls.x + 10}
          y={cls.y + headerH + attrH + 16 + i * 20}
          fill="#94a3b8"
          fontSize={11}
          fontFamily="monospace"
        >
          {method.visibility} {method.name}({method.params}): {method.returnType}
        </text>
      ))}
    </g>
  );
}

export function UMLClassDiagram() {
  const [mode, setMode] = useState<"explore" | "details">("explore");
  const [step, setStep] = useState(0);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const maxSteps = relationSteps.length;

  const nextStep = useCallback(() => {
    setStep((s) => Math.min(s + 1, maxSteps));
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const reset = useCallback(() => {
    setStep(0);
    setSelectedClassId(null);
  }, []);

  const selectedClass = selectedClassId ? getClassById(selectedClassId) : null;

  const svgWidth = 500;
  const svgHeight = 500;

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <h4 className="text-lg font-bold text-white">🏗️ UML Klassendiagramm</h4>
        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs rounded-full font-medium">
          Schritt {step} / {maxSteps}
        </span>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "explore" as const, label: "🔍 Beziehungen", color: "blue" },
          { key: "details" as const, label: "📋 Klassen-Details", color: "emerald" },
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

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30 overflow-auto">
          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
            <defs>
              <marker id="uml-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
              <marker id="uml-triangle" markerWidth="14" markerHeight="10" refX="14" refY="5" orient="auto">
                <polygon points="0 0, 14 5, 0 10" fill="none" stroke="#94a3b8" strokeWidth={1.5} />
              </marker>
            </defs>

            {/* Relations */}
            {relations.map((rel, i) => {
              const fromClass = getClassById(rel.from);
              const toClass = getClassById(rel.to);
              if (!fromClass || !toClass) return null;
              const isHighlighted = mode === "explore" ? i < step : true;
              return renderRelation(rel, fromClass, toClass, isHighlighted);
            })}

            {/* Classes */}
            {classes.map((cls) => {
              const isSelected = selectedClassId === cls.id;
              return (
                <g
                  key={cls.id}
                  onClick={() => setSelectedClassId(cls.id === selectedClassId ? null : cls.id)}
                  style={{ cursor: "pointer" }}
                >
                  {renderClass(cls, isSelected || (mode === "explore" && step > 0 && relationSteps.some((rs) => {
                    const rel = relations[rs.relationIdx];
                    return rel && (rel.from === cls.id || rel.to === cls.id) && rs.relationIdx < step;
                  })))}
                </g>
              );
            })}
          </svg>
        </div>

        <div className="lg:w-2/5 flex flex-col gap-4">
          {mode === "explore" && (
            <>
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">
                  {step > 0 ? `Beziehung ${step} / ${maxSteps}` : "Bereit?"}
                </p>
                {step > 0 && step <= maxSteps ? (
                  <div>
                    <p className="text-white font-bold text-lg mb-2">{relationSteps[step - 1].title}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{relationSteps[step - 1].description}</p>
                  </div>
                ) : step > maxSteps ? (
                  <div>
                    <p className="text-white font-bold text-lg mb-2">Alle Beziehungen gezeigt! ✅</p>
                    <p className="text-sm text-slate-300">Klicke auf eine Klasse für Details.</p>
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Klicke auf &quot;Weiter&quot; um die Beziehungen zwischen den Klassen zu erkunden.</p>
                )}
              </div>

              {/* Beziehungs-Legende */}
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Beziehungen</p>
                <div className="space-y-2">
                  {[
                    { icon: "→", name: "Assoziation", desc: "Einfache Verbindung", color: "text-slate-400" },
                    { icon: "◇", name: "Aggregation", desc: "Lose Kopplung (leere Raute)", color: "text-slate-400" },
                    { icon: "◆", name: "Komposition", desc: "Starke Kopplung (volle Raute)", color: "text-slate-400" },
                    { icon: "△", name: "Vererbung", desc: "Generalisierung", color: "text-slate-400" },
                  ].map((r) => (
                    <div key={r.name} className="flex items-center gap-2">
                      <span className="text-base font-mono w-6 text-center">{r.icon}</span>
                      <span className="text-xs text-slate-400">
                        <strong className="text-slate-300">{r.name}</strong> — {r.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {mode === "details" && (
            <>
              {selectedClass ? (
                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: selectedClass.color }} />
                    <p className="text-white font-bold text-lg">{selectedClass.name}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-2">Attribute</p>
                    <div className="space-y-1">
                      {selectedClass.attributes.map((attr) => (
                        <div key={attr.name} className="px-3 py-1.5 bg-slate-900/40 rounded-lg font-mono text-xs text-slate-300">
                          <span className="text-amber-400">{attr.visibility}</span> {attr.name}: <span className="text-blue-300">{attr.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">Methoden</p>
                    <div className="space-y-1">
                      {selectedClass.methods.map((method) => (
                        <div key={method.name} className="px-3 py-1.5 bg-slate-900/40 rounded-lg font-mono text-xs text-slate-300">
                          <span className="text-amber-400">{method.visibility}</span> {method.name}({method.params}): <span className="text-emerald-300">{method.returnType}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30 text-center">
                  <p className="text-slate-400 text-sm">Klicke auf eine Klasse im Diagramm für Details.</p>
                </div>
              )}

              {/* Sichtbarkeiten */}
              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/20">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Sichtbarkeiten</p>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <p><span className="text-amber-400 font-mono">+</span> = public (öffentlich)</p>
                  <p><span className="text-amber-400 font-mono">-</span> = private (privat)</p>
                  <p><span className="text-amber-400 font-mono">#</span> = protected (geschützt)</p>
                </div>
              </div>
            </>
          )}

          {/* Controls */}
          {mode === "explore" && (
            <div className="flex gap-3 mt-auto">
              <button
                onClick={prevStep}
                disabled={step === 0}
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
                disabled={step > maxSteps}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl disabled:opacity-20 hover:bg-indigo-500 transition-all text-sm font-semibold shadow-lg shadow-indigo-500/20"
              >
                Weiter →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
