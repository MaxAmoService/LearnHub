"use client";

import { useState } from "react";

type Phase = "extern" | "konzeptionell" | "logisch" | "physisch";

interface PhaseData {
  icon: string;
  title: string;
  subtitle: string;
  goal: string;
  tasks: string[];
  example: string;
  result: string;
  tip: string;
  color: string;
}

const PHASES: Record<Phase, PhaseData> = {
  extern: {
    icon: "📋",
    title: "Phase 1: Extern",
    subtitle: "Anforderungsanalyse",
    goal: "Verstehen, was der Kunde braucht",
    tasks: [
      "Gespräch mit dem Auftraggeber führen",
      "Anforderungen dokumentieren",
      "Prozesse verstehen (Wer macht was?)",
      "Daten identifizieren (Welche Informationen werden gebraucht?)",
      "Berichte/Reports definieren",
    ],
    example: `Aufgabe: Zeiterfassungssystem für eine Firma

Anforderungen:
• Mitarbeitende können Arbeitszeit erfassen
• Es gibt ein Arbeitszeitkonto pro Mitarbeiter
• Arbeitszeiten werden auf dem Konto verrechnet
• Mitarbeiter können Gleitzeit und Urlaub beantragen
• Das Konto besitzt die gesamte Arbeitszeit`,
    result: "Dokumentierte Anforderungsliste",
    tip: "Fragen stellen wie: Wer? Was? Wann? Wie oft? Warum?",
    color: "#3B82F6",
  },
  konzeptionell: {
    icon: "🏗️",
    title: "Phase 2: Konzeptionell",
    subtitle: "ER-Modell erstellen",
    goal: "Ein visuelles Modell der Datenbank erstellen",
    tasks: [
      "Entitäten identifizieren (Was sind die 'Dinge'?)",
      "Attribute festlegen (Welche Eigenschaften haben sie?)",
      "Primärschlüssel bestimmen",
      "Beziehungen zeichnen (Wer hängt mit wem zusammen?)",
      "Kardinalitäten festlegen (1:1, 1:n, n:m)",
    ],
    example: `Entitäten: Mitarbeiter, Arbeitszeit, Antrag, Arbeitszeitkonto

Beziehungen:
• Mitarbeiter — erfasst → Arbeitszeit (1:n)
• Mitarbeiter — stellt → Antrag (1:n)
• Mitarbeiter — hat → Arbeitszeitkonto (1:1)

Attribute:
• Mitarbeiter: ID (PK), Name, Abteilung, Eintrittsdatum
• Arbeitszeit: ID (PK), Startzeit, Endzeit, Datum
• Antrag: ID (PK), Typ, Status, Von, Bis`,
    result: "ER-Diagramm mit Entitäten, Attributen und Beziehungen",
    tip: "Immer BEIDE Richtungen prüfen! (Ein Mitarbeiter hat viele Zeiten, eine Zeit gehört zu einem Mitarbeiter → 1:n)",
    color: "#22C55E",
  },
  logisch: {
    icon: "📐",
    title: "Phase 3: Logisch",
    subtitle: "Tabellenentwurf & Normalisierung",
    goal: "Normale Tabellen mit PK/FK erstellen",
    tasks: [
      "ER-Modell in Tabellen umwandeln",
      "Normalisierung durchführen (1NF → 2NF → 3NF)",
      "Fremdschlüssel zuordnen",
      "Datentypen festlegen (VARCHAR, INT, DATE...)",
      "Constraints definieren (NOT NULL, UNIQUE, CHECK)",
    ],
    example: `Mitarbeiter (
  mitarbeiter_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  abteilung VARCHAR(50),
  eintritt DATE
)

Arbeitszeit (
  zeit_id SERIAL PRIMARY KEY,
  mitarbeiter_id INT REFERENCES Mitarbeiter,
  startzeit TIMESTAMP,
  endzeit TIMESTAMP
)

Antrag (
  antrag_id SERIAL PRIMARY KEY,
  mitarbeiter_id INT REFERENCES Mitarbeiter,
  typ VARCHAR(20) CHECK (typ IN ('Gleitzeit','Urlaub')),
  status VARCHAR(20) DEFAULT 'offen',
  von DATE, bis DATE
)`,
    result: "Tabellenschema mit Datentypen, PK/FK und Constraints",
    tip: "3NF ist das Ziel! Prüfe: Sind alle Werte atomar? Gibt es transitive Abhängigkeiten?",
    color: "#F59E0B",
  },
  physisch: {
    icon: "💾",
    title: "Phase 4: Physisch",
    subtitle: "Implementierung im DBMS",
    goal: "Die Datenbank in PostgreSQL erstellen und testen",
    tasks: [
      "CREATE TABLE Befehle ausführen",
      "Indexe erstellen für Performance",
      "Testdaten einfügen (INSERT INTO)",
      "Views erstellen für häufige Abfragen",
      "Stored Procedures schreiben (optional)",
      "Berechtigungen vergeben (GRANT/REVOKE)",
    ],
    example: `-- Tabelle erstellen
CREATE TABLE mitarbeiter (
  mitarbeiter_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  abteilung VARCHAR(50)
);

-- Testdaten einfügen
INSERT INTO mitarbeiter (name, abteilung)
VALUES ('Max Müller', 'IT'),
       ('Lisa Schmidt', 'HR');

-- Test-Abfrage
SELECT * FROM mitarbeiter;`,
    result: "Lauffähige Datenbank mit Testdaten",
    tip: "Immer testen! Mehrmals ausführen und prüfen, ob alles funktioniert.",
    color: "#EC4899",
  },
};

const PHASE_ORDER: Phase[] = ["extern", "konzeptionell", "logisch", "physisch"];

export function DBPlanningPhases() {
  const [activePhase, setActivePhase] = useState<Phase>("extern");
  const phase = PHASES[activePhase];
  const phaseIndex = PHASE_ORDER.indexOf(activePhase);

  return (
    <div className="my-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-900/50 overflow-hidden">
      <div className="bg-purple-900/30 px-4 py-3 border-b border-purple-500/20">
        <h3 className="text-lg font-bold text-white">📋 Datenbank-Phasen Guide</h3>
        <p className="text-sm text-purple-200/70">Klicke durch die 4 Planungsphasen einer Datenbank</p>
      </div>

      <div className="p-4">
        {/* Phase selector with visual pipeline */}
        <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
          {PHASE_ORDER.map((p, i) => {
            const pd = PHASES[p];
            const isActive = p === activePhase;
            const isPast = i < phaseIndex;
            return (
              <div key={p} className="flex items-center">
                <button
                  onClick={() => setActivePhase(p)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "text-white shadow-lg"
                      : isPast
                      ? "bg-slate-700/50 text-slate-400 hover:bg-slate-700"
                      : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                  }`}
                  style={isActive ? { backgroundColor: pd.color, boxShadow: `0 4px 14px ${pd.color}40` } : {}}
                >
                  {isPast && <span className="text-green-400">✓</span>}
                  {pd.icon} {pd.subtitle}
                </button>
                {i < PHASE_ORDER.length - 1 && (
                  <span className="text-slate-600 mx-1">→</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Phase content */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 mb-4">
          <h4 className="text-xl font-bold mb-1" style={{ color: phase.color }}>{phase.title}</h4>
          <p className="text-sm text-slate-300 mb-3">
            <span className="font-semibold text-purple-300">Ziel:</span> {phase.goal}
          </p>

          {/* Tasks */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Aufgaben</h5>
            <ul className="space-y-1">
              {phase.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-xs mt-0.5" style={{ color: phase.color }}>▸</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Example */}
          <div className="mb-4">
            <h5 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Beispiel</h5>
            <pre className="bg-slate-900 rounded-lg p-3 text-xs text-green-300 font-mono overflow-x-auto whitespace-pre-wrap border border-slate-700">
              {phase.example}
            </pre>
          </div>

          {/* Result */}
          <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20 mb-3">
            <p className="text-xs font-semibold text-green-400 mb-1">✅ Ergebnis dieser Phase:</p>
            <p className="text-sm text-green-200">{phase.result}</p>
          </div>

          {/* Tip */}
          <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/20">
            <p className="text-sm text-purple-200">
              <span className="font-bold">💡 Tipp:</span> {phase.tip}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setActivePhase(PHASE_ORDER[Math.max(0, phaseIndex - 1)])}
            disabled={phaseIndex === 0}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
          >
            ← Zurück
          </button>
          <span className="text-sm text-slate-400 self-center">{phaseIndex + 1} / {PHASE_ORDER.length}</span>
          <button
            onClick={() => setActivePhase(PHASE_ORDER[Math.min(PHASE_ORDER.length - 1, phaseIndex + 1)])}
            disabled={phaseIndex === PHASE_ORDER.length - 1}
            className="px-4 py-2 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
            style={{ backgroundColor: phaseIndex < PHASE_ORDER.length - 1 ? PHASES[PHASE_ORDER[phaseIndex + 1]].color : undefined }}
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}
