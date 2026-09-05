"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, Info, Eye, Play, RotateCcw, Lightbulb, Cpu } from "lucide-react";

// ============================================================================
// CPU Architecture Explorer — Einsteigerfreundlich mit Schritt-für-Schritt
// ============================================================================

interface RegisterState {
  name: string;
  value: string;
  description: string;
}

interface Step {
  label: string;
  description: string;
  beginnerTip: string;
  highlight: string[];
  registers: RegisterState[];
  busActivity: string;
}

const sampleInstructions = [
  {
    name: "LOAD AX, [0x10]",
    description: "Lade den Wert aus Speicheradresse 0x10 in Register AX",
    difficulty: "Einfach",
    steps: [
      {
        label: "Fetch: PC → MAR",
        description: "Der Program Counter (PC) enthält die Adresse des nächsten Befehls. Diese wird ins Memory Address Register (MAR) kopiert.",
        beginnerTip: "Stell dir vor: Der PC ist wie ein Lesezeichen in einem Buch. Er zeigt, welche Zeile als nächstes gelesen werden soll.",
        highlight: ["pc", "mar"],
        registers: [
          { name: "PC", value: "0x00", description: "Befehlsadresse" },
          { name: "MAR", value: "0x00", description: "Wird gesetzt" },
          { name: "IR", value: "---", description: "" },
          { name: "AX", value: "0x00", description: "" },
        ],
        busActivity: "Adressbus: CPU → Speicher (Adresse 0x00)",
      },
      {
        label: "Fetch: Speicher → MDR → IR",
        description: "Der Speicher liefert den Befehl an dieser Adresse über den Datenbus. Der Befehl landet erst im Memory Data Register (MDR), dann im Instruction Register (IR).",
        beginnerTip: "Wie bei einem Brief: Die Adresse (MAR) wird zum Speicher geschickt, der Speicher sucht den Befehl und schickt ihn zurück ins IR.",
        highlight: ["mdr", "ir", "memory"],
        registers: [
          { name: "PC", value: "0x01", description: "Inkrementiert" },
          { name: "MAR", value: "0x00", description: "" },
          { name: "IR", value: "LOAD AX,[0x10]", description: "Befehl geladen" },
          { name: "AX", value: "0x00", description: "" },
        ],
        busActivity: "Datenbus: Speicher → CPU (Befehl: LOAD AX,[0x10])",
      },
      {
        label: "Decode: Befehl entschlüsseln",
        description: "Das Steuerwerk analysiert den Befehl im IR: Opcode = LOAD (Laden), Zielregister = AX, Quelladresse = 0x10.",
        beginnerTip: "Das Steuerwerk ist wie ein Übersetzer: Es liest den Befehl und sagt der ALU, was sie tun soll.",
        highlight: ["cu", "ir"],
        registers: [
          { name: "PC", value: "0x01", description: "" },
          { name: "IR", value: "LOAD AX,[0x10]", description: "Wird decodiert" },
          { name: "AX", value: "0x00", description: "" },
        ],
        busActivity: "Steuerbus: Intern — Befehl wird analysiert",
      },
      {
        label: "Execute: Daten laden",
        description: "Die ALU berechnet die Speicheradresse 0x10. Der Wert an dieser Adresse wird über den Datenbus geholt und in AX gespeichert.",
        beginnerTip: "Die ALU ist der Rechner der CPU. Hier berechnet sie die Adresse und holt den Wert. Das Ergebnis landet im AX-Register.",
        highlight: ["alu", "ax", "memory"],
        registers: [
          { name: "PC", value: "0x01", description: "" },
          { name: "IR", value: "LOAD AX,[0x10]", description: "" },
          { name: "AX", value: "0x42", description: "Wert geladen!" },
        ],
        busActivity: "Datenbus: Speicher → CPU (Wert 0x42 aus Adresse 0x10)",
      },
    ] as Step[],
  },
  {
    name: "ADD AX, BX",
    description: "Addiere den Wert von BX zum Wert in AX",
    difficulty: "Mittel",
    steps: [
      {
        label: "Fetch: PC → MAR",
        description: "PC wird ins MAR kopiert — der nächste Befehl wird geholt.",
        beginnerTip: "Wieder der gleiche Start: Der PC zeigt auf den nächsten Befehl und kopiert die Adresse ins MAR.",
        highlight: ["pc", "mar"],
        registers: [
          { name: "PC", value: "0x02", description: "Befehlsadresse" },
          { name: "MAR", value: "0x02", description: "Wird gesetzt" },
          { name: "IR", value: "---", description: "" },
          { name: "AX", value: "0x42", description: "Vorheriger Wert" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Adressbus: CPU → Speicher (Adresse 0x02)",
      },
      {
        label: "Fetch: Speicher → IR",
        description: "Der Befehl ADD AX, BX wird aus dem Speicher geholt und ins IR geladen.",
        beginnerTip: "Der Speicher schickt den ADD-Befehl zurück zur CPU. Er landet im Instruction Register.",
        highlight: ["mdr", "ir", "memory"],
        registers: [
          { name: "PC", value: "0x03", description: "Inkrementiert" },
          { name: "IR", value: "ADD AX,BX", description: "Befehl geladen" },
          { name: "AX", value: "0x42", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Datenbus: Speicher → CPU (Befehl: ADD AX,BX)",
      },
      {
        label: "Decode: Befehl entschlüsseln",
        description: "Opcode = ADD, Operand 1 = AX (Ziel), Operand 2 = BX (Quelle). Das Steuerwerk weist die ALU an, AX + BX zu berechnen.",
        beginnerTip: "Das Steuerwerk liest: 'ADD' bedeutet Addition. Die Zahlen stehen in AX und BX. Die ALU soll sie zusammenzählen.",
        highlight: ["cu", "ir"],
        registers: [
          { name: "PC", value: "0x03", description: "" },
          { name: "IR", value: "ADD AX,BX", description: "Wird decodiert" },
          { name: "AX", value: "0x42", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Steuerbus: Intern — ALU wird angewiesen zu addieren",
      },
      {
        label: "Execute: Addition durchführen",
        description: "Die ALU addiert AX (0x42) + BX (0x15) = 0x57. Das Ergebnis wird in AX gespeichert.",
        beginnerTip: "Die ALU rechnet: 0x42 + 0x15 = 0x57. Das Ergebnis kommt ins AX-Register. BX bleibt unveraendert.",
        highlight: ["alu", "ax"],
        registers: [
          { name: "PC", value: "0x03", description: "" },
          { name: "IR", value: "ADD AX,BX", description: "" },
          { name: "AX", value: "0x57", description: "Ergebnis: 0x42 + 0x15" },
          { name: "BX", value: "0x15", description: "Unveraendert" },
        ],
        busActivity: "Intern: ALU → AX (Ergebnis 0x57)",
      },
    ] as Step[],
  },
  {
    name: "CMP AX, BX",
    description: "Vergleiche AX mit BX (setze Flags)",
    difficulty: "Fortgeschritten",
    steps: [
      {
        label: "Fetch: Befehl holen",
        description: "Der CMP-Befehl wird aus dem Speicher geholt.",
        beginnerTip: "CMP heisst 'Compare' = Vergleichen. Der Befehl wird wie immer aus dem Speicher geholt.",
        highlight: ["pc", "mar", "ir"],
        registers: [
          { name: "PC", value: "0x04", description: "" },
          { name: "IR", value: "CMP AX,BX", description: "Geladen" },
          { name: "AX", value: "0x57", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Fetch-Phase: Befehl aus Speicher",
      },
      {
        label: "Decode: Vergleich vorbereiten",
        description: "Opcode = CMP — die ALU soll AX - BX rechnen, aber NICHT speichern. Nur Flags werden gesetzt.",
        beginnerTip: "Beim CMP wird subtrahiert, aber das Ergebnis verworfen. Nur die Status-Flags (Zero, Carry, Sign) werden aktualisiert.",
        highlight: ["cu", "ir"],
        registers: [
          { name: "IR", value: "CMP AX,BX", description: "Decodiert" },
          { name: "AX", value: "0x57", description: "" },
          { name: "BX", value: "0x15", description: "" },
        ],
        busActivity: "Steuerbus: CMP = Subtraktion ohne Speicherung",
      },
      {
        label: "Execute: Vergleich ausfuehren",
        description: "Die ALU berechnet 0x57 - 0x15 = 0x42 (positiv). Ergebnis wird NICHT gespeichert, aber Flags gesetzt: Zero=0, Carry=0, Sign=0. AX bleibt unveraendert!",
        beginnerTip: "Die ALU rechnet 0x57 - 0x15 = 0x42, aber speichert es nicht. Sie setzt nur Flags: Ist das Ergebnis 0? Negativ? Carry? Diese Flags nutzen spaetere Sprung-Befehle.",
        highlight: ["alu"],
        registers: [
          { name: "AX", value: "0x57", description: "Unveraendert!" },
          { name: "BX", value: "0x15", description: "Unveraendert" },
        ],
        busActivity: "Intern: Nur Flags werden aktualisiert",
      },
    ] as Step[],
  },
];

const cpuComponents = [
  { id: "pc", label: "PC", full: "Program Counter", desc: "Zaehlt die Befehlsadressen", x: 10, y: 15, w: 70, h: 30 },
  { id: "ir", label: "IR", full: "Instruction Register", desc: "Speichert den aktuellen Befehl", x: 100, y: 15, w: 100, h: 30 },
  { id: "mar", label: "MAR", full: "Memory Address Register", desc: "Haelt die Speicheradresse", x: 10, y: 55, w: 70, h: 30 },
  { id: "mdr", label: "MDR", full: "Memory Data Register", desc: "Haelt die Daten vom/zum Speicher", x: 100, y: 55, w: 100, h: 30 },
  { id: "cu", label: "Steuerwerk", full: "Control Unit", desc: "Steuert den Befehlsablauf", x: 220, y: 15, w: 100, h: 40 },
  { id: "alu", label: "ALU", full: "Arithmetic Logic Unit", desc: "Fuehrt Rechenoperationen durch", x: 220, y: 65, w: 100, h: 40 },
  { id: "ax", label: "AX", full: "Akkumulator", desc: "Speichert Rechenergebnisse", x: 340, y: 15, w: 60, h: 30 },
  { id: "bx", label: "BX", full: "Basisregister", desc: "Fuer Speicheradressen", x: 340, y: 55, w: 60, h: 30 },
  { id: "memory", label: "RAM", full: "Hauptspeicher", desc: "Speichert Programme und Daten", x: 120, y: 120, w: 160, h: 35 },
];

// ============================================================================
// Intro-Lektion: Von-Neumann-Architektur
// ============================================================================

const introSlides = [
  {
    title: "Willkommen zur CPU-Architektur!",
    content: "In dieser Uebung lernst du, wie eine CPU (Central Processing Unit) arbeitet. Die CPU ist das 'Gehirn' deines Computers — sie fuehrt Befehle aus, die im Speicher liegen.",
    icon: <Cpu size={32} className="text-amber-400" />,
  },
  {
    title: "Die Von-Neumann-Architektur",
    content: "Fast alle modernen Computer folgen der Von-Neumann-Architektur (1945). Das Grundprinzip: Programm und Daten liegen im SELBEN Speicher. Die CPU holt abwechselnd Befehle und Daten — das ist der beruehmte 'Von-Neumann-Flaschenhals'.",
    icon: <Lightbulb size={32} className="text-amber-400" />,
  },
  {
    title: "Die Hauptkomponenten",
    content: "Die CPU besteht aus drei Kernbereichen:\n\n• ALU (Rechenwerk) — fuehrt Berechnungen durch\n• Steuerwerk — koordiniert den Befehlsablauf\n• Register — ultra-schnelle Zwischenablage\n\nDazu kommt der Hauptspeicher (RAM), in dem Programme und Daten liegen.",
    icon: <Eye size={32} className="text-amber-400" />,
  },
  {
    title: "Der Fetch-Decode-Execute-Zyklus",
    content: "Jeder Befehl durchlaeuft drei Phasen:\n\n1. FETCH — Befehl aus dem Speicher holen\n2. DECODE — Befehl entschluesseln\n3. EXECUTE — Befehl ausfuehren\n\nDieser Zyklus wiederholt sich Milliarden Mal pro Sekunde! Klicke auf 'Start' um es live zu sehen.",
    icon: <Play size={32} className="text-amber-400" />,
  },
];

// ============================================================================
// Component
// ============================================================================

export default function CPUArchitectureExplorer() {
  const [phase, setPhase] = useState<"intro" | "explorer">("intro");
  const [introStep, setIntroStep] = useState(0);
  const [selectedInstruction, setSelectedInstruction] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [showBeginnerTips, setShowBeginnerTips] = useState(true);

  const instruction = sampleInstructions[selectedInstruction];
  const step = instruction.steps[currentStep];

  const isHighlighted = (id: string) => step.highlight.includes(id);

  const nextStep = () => {
    if (currentStep < instruction.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const reset = () => setCurrentStep(0);

  // ---- Intro Phase ----
  if (phase === "intro") {
    const slide = introSlides[introStep];
    return (
      <div className="space-y-6">
        {/* Intro Card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800 text-center">
          <div className="flex justify-center mb-4">{slide.icon}</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            {slide.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line max-w-lg mx-auto leading-relaxed">
            {slide.content}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {introSlides.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === introStep
                  ? "bg-amber-500 w-6"
                  : i < introStep
                  ? "bg-amber-300 dark:bg-amber-700"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIntroStep((s) => Math.max(0, s - 1))}
            disabled={introStep === 0}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            <ChevronLeft size={16} className="inline mr-1" /> Zurueck
          </button>
          {introStep < introSlides.length - 1 ? (
            <button
              onClick={() => setIntroStep((s) => s + 1)}
              className="px-5 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors text-sm font-semibold"
            >
              Weiter <ChevronRight size={16} className="inline ml-1" />
            </button>
          ) : (
            <button
              onClick={() => setPhase("explorer")}
              className="px-5 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors text-sm font-semibold"
            >
              <Play size={16} className="inline mr-1" /> Start — CPU erkunden!
            </button>
          )}
        </div>

        {/* Skip button */}
        <div className="text-center">
          <button
            onClick={() => setPhase("explorer")}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline transition-colors"
          >
            Ueberspringen und direkt starten
          </button>
        </div>
      </div>
    );
  }

  // ---- Explorer Phase ----
  return (
    <div className="space-y-4">
      {/* Beginner tip toggle */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {sampleInstructions.map((instr, i) => (
            <button
              key={i}
              onClick={() => {
                setSelectedInstruction(i);
                setCurrentStep(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-all ${
                i === selectedInstruction
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {instr.name}
              <span className="ml-1.5 text-[10px] opacity-70">({instr.difficulty})</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowBeginnerTips((v) => !v)}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
            showBeginnerTips
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
              : "bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-200 dark:border-gray-700"
          }`}
        >
          <Lightbulb size={14} />
          Tipps {showBeginnerTips ? "an" : "aus"}
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">{instruction.description}</p>

      {/* CPU Diagram */}
      <div className="relative bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 overflow-x-auto">
        <svg viewBox="0 0 420 170" className="w-full max-w-lg mx-auto" style={{ minWidth: 380 }}>
          {/* CPU Box */}
          <rect x="5" y="5" width="410" height="110" rx="8" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="6,3" />
          <text x="210" y="12" textAnchor="middle" className="text-[9px] fill-gray-400">CPU</text>

          {/* Components */}
          {cpuComponents.filter(c => c.id !== "memory").map((comp) => (
            <g
              key={comp.id}
              onMouseEnter={() => setHoveredComponent(comp.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <rect
                x={comp.x}
                y={comp.y}
                width={comp.w}
                height={comp.h}
                rx="4"
                fill={isHighlighted(comp.id) ? "#FCD34D" : hoveredComponent === comp.id ? "#FEF3C7" : "#E5E7EB"}
                stroke={isHighlighted(comp.id) ? "#F59E0B" : hoveredComponent === comp.id ? "#FCD34D" : "#9CA3AF"}
                strokeWidth={isHighlighted(comp.id) ? 2 : 1}
                className="transition-all duration-300"
              />
              <text
                x={comp.x + comp.w / 2}
                y={comp.y + comp.h / 2 + 4}
                textAnchor="middle"
                className={`text-[10px] font-bold ${isHighlighted(comp.id) ? "fill-amber-900" : "fill-gray-600"}`}
              >
                {comp.label}
              </text>
            </g>
          ))}

          {/* Memory */}
          {cpuComponents.filter(c => c.id === "memory").map((comp) => (
            <g
              key={comp.id}
              onMouseEnter={() => setHoveredComponent(comp.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              className="cursor-pointer"
            >
              <rect
                x={comp.x}
                y={comp.y}
                width={comp.w}
                height={comp.h}
                rx="4"
                fill={isHighlighted(comp.id) ? "#BBF7D0" : hoveredComponent === comp.id ? "#D1FAE5" : "#E5E7EB"}
                stroke={isHighlighted(comp.id) ? "#22C55E" : hoveredComponent === comp.id ? "#86EFAC" : "#9CA3AF"}
                strokeWidth={isHighlighted(comp.id) ? 2 : 1}
                className="transition-all duration-300"
              />
              <text
                x={comp.x + comp.w / 2}
                y={comp.y + comp.h / 2 + 4}
                textAnchor="middle"
                className={`text-[10px] font-bold ${isHighlighted(comp.id) ? "fill-green-900" : "fill-gray-600"}`}
              >
                {comp.full}
              </text>
            </g>
          ))}

          {/* Bus arrows */}
          <line x1="180" y1="98" x2="180" y2="120" stroke="#6B7280" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="185" y="112" className="text-[7px] fill-gray-400">Bus</text>
        </svg>

        {/* Tooltip for hovered component */}
        {hoveredComponent && (() => {
          const comp = cpuComponents.find(c => c.id === hoveredComponent);
          if (!comp) return null;
          return (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg pointer-events-none">
              <span className="font-bold">{comp.full}</span> — {comp.desc}
            </div>
          );
        })()}
      </div>

      {/* Step display */}
      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-amber-600 dark:text-amber-400">
            Schritt {currentStep + 1} / {instruction.steps.length}
          </span>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            {step.label}
          </span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{step.description}</p>

        {/* Beginner tip */}
        {showBeginnerTips && step.beginnerTip && (
          <div className="flex items-start gap-2 mt-2 p-2.5 bg-amber-100/60 dark:bg-amber-900/30 rounded-lg border border-amber-200/50 dark:border-amber-800/50">
            <Lightbulb size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              {step.beginnerTip}
            </p>
          </div>
        )}

        <div className="text-xs font-mono bg-white dark:bg-gray-800 rounded p-2 text-gray-600 dark:text-gray-400 mt-2">
          {step.busActivity}
        </div>
      </div>

      {/* Register state */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {step.registers.map((reg) => (
          <div
            key={reg.name}
            className={`rounded-lg p-2 text-center border transition-all ${
              reg.description
                ? "bg-amber-100 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700"
                : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">{reg.name}</div>
            <div className="font-mono text-sm font-bold text-gray-800 dark:text-gray-200">{reg.value}</div>
            {reg.description && (
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">{reg.description}</div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-40 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
        >
          <ChevronLeft size={16} className="inline mr-1" /> Zurueck
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
        >
          <RotateCcw size={14} className="inline mr-1" /> Reset
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === instruction.steps.length - 1}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white disabled:opacity-40 hover:bg-amber-600 transition-colors text-sm font-semibold"
        >
          Naechster Schritt <ChevronRight size={16} className="inline ml-1" />
        </button>
      </div>

      {/* Completion message */}
      {currentStep === instruction.steps.length - 1 && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800 text-center">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
            Befehl vollstaendig ausgefuehrt! Probiere einen anderen Befehl oder starte neu.
          </p>
        </div>
      )}

      {/* Back to intro */}
      <div className="text-center">
        <button
          onClick={() => { setPhase("intro"); setIntroStep(0); }}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline transition-colors"
        >
          Zurueck zur Einfuehrung
        </button>
      </div>
    </div>
  );
}
