"use client";

import { useState } from "react";

interface Column {
  name: string;
  sampleData: string[];
}

interface TableState {
  name: string;
  columns: Column[];
  rows: string[][];
}

type NF = "denorm" | "1nf" | "2nf" | "3nf";

const DENORMALIZED: TableState = {
  name: "Bestellungen_Rohdaten",
  columns: [
    { name: "BestellNr", sampleData: ["1001", "1002", "1003"] },
    { name: "KundeName", sampleData: ["Max Müller", "Max Müller", "Lisa Schmidt"] },
    { name: "KundePLZ", sampleData: ["10115", "10115", "20095"] },
    { name: "KundeStadt", sampleData: ["Berlin", "Berlin", "Hamburg"] },
    { name: "Produkte", sampleData: ["Laptop, Maus", "Tastatur", "Monitor, Kabel"] },
    { name: "ProduktPreis", sampleData: ["999, 25", "79", "350, 15"] },
    { name: "Bestelldatum", sampleData: ["2025-08-01", "2025-08-03", "2025-08-05"] },
  ],
  rows: [
    ["1001", "Max Müller", "10115", "Berlin", "Laptop, Maus", "999, 25", "2025-08-01"],
    ["1002", "Max Müller", "10115", "Berlin", "Tastatur", "79", "2025-08-03"],
    ["1003", "Lisa Schmidt", "20095", "Hamburg", "Monitor, Kabel", "350, 15", "2025-08-05"],
  ],
};

const NF_STEPS: Record<NF, {
  title: string;
  rule: string;
  problem: string;
  solution: string;
  tables: TableState[];
}> = {
  denorm: {
    title: "Denormalisierte Tabelle",
    rule: "Keine Normalisierung — alle Daten in einer Tabelle",
    problem: "❌ Mehrere Werte in einer Zelle (Produkte: 'Laptop, Maus')\n❌ Redundanz (Max Müller steht 2x)\n❌ Transitiv abhängig (Stadt hängt von PLZ ab)",
    solution: "Wir bringen die Tabelle Schritt für Schritt in die 3NF.",
    tables: [DENORMALIZED],
  },
  "1nf": {
    title: "1. Normalform (1NF)",
    rule: "Alle Werte müssen atomar sein — keine mehrwertigen Attribute!",
    problem: "Das 'Produkte'-Feld enthält mehrere Werte ('Laptop, Maus').",
    solution: "Aufteilen in separate Zeilen — jedes Produkt bekommt eigene Zeile.",
    tables: [
      {
        name: "Bestellungen_1NF",
        columns: [
          { name: "BestellNr", sampleData: [] },
          { name: "KundeName", sampleData: [] },
          { name: "KundePLZ", sampleData: [] },
          { name: "KundeStadt", sampleData: [] },
          { name: "Produkt", sampleData: [] },
          { name: "Preis", sampleData: [] },
          { name: "Bestelldatum", sampleData: [] },
        ],
        rows: [
          ["1001", "Max Müller", "10115", "Berlin", "Laptop", "999", "2025-08-01"],
          ["1001", "Max Müller", "10115", "Berlin", "Maus", "25", "2025-08-01"],
          ["1002", "Max Müller", "10115", "Berlin", "Tastatur", "79", "2025-08-03"],
          ["1003", "Lisa Schmidt", "20095", "Hamburg", "Monitor", "350", "2025-08-05"],
          ["1003", "Lisa Schmidt", "20095", "Hamburg", "Kabel", "15", "2025-08-05"],
        ],
      },
    ],
  },
  "2nf": {
    title: "2. Normalform (2NF)",
    rule: "1NF + Alle Nicht-Schlüssel-Attribute vollständig abhängig vom gesamten PK",
    problem: "KundeName, PLZ, Stadt hängen nur von BestellNr ab — NICHT vom Produkt.\n(Angenommen PK = BestellNr + Produkt)",
    solution: "Aufteilen: Kunden-Daten in eigene Tabelle!",
    tables: [
      {
        name: "Kunde",
        columns: [
          { name: "KundenID (PK)", sampleData: [] },
          { name: "Name", sampleData: [] },
          { name: "PLZ", sampleData: [] },
          { name: "Stadt", sampleData: [] },
        ],
        rows: [
          ["1", "Max Müller", "10115", "Berlin"],
          ["2", "Lisa Schmidt", "20095", "Hamburg"],
        ],
      },
      {
        name: "Bestellung",
        columns: [
          { name: "BestellNr (PK)", sampleData: [] },
          { name: "KundenID (FK)", sampleData: [] },
          { name: "Bestelldatum", sampleData: [] },
        ],
        rows: [
          ["1001", "1", "2025-08-01"],
          ["1002", "1", "2025-08-03"],
          ["1003", "2", "2025-08-05"],
        ],
      },
      {
        name: "Bestellposition",
        columns: [
          { name: "BestellNr (FK)", sampleData: [] },
          { name: "Produkt", sampleData: [] },
          { name: "Preis", sampleData: [] },
        ],
        rows: [
          ["1001", "Laptop", "999"],
          ["1001", "Maus", "25"],
          ["1002", "Tastatur", "79"],
          ["1003", "Monitor", "350"],
          ["1003", "Kabel", "15"],
        ],
      },
    ],
  },
  "3nf": {
    title: "3. Normalform (3NF)",
    rule: "2NF + Keine transitiven Abhängigkeiten!",
    problem: "In der Tabelle 'Kunde' hängt 'Stadt' von 'PLZ' ab — nicht direkt vom PK.\nPLZ → Stadt ist eine transitive Abhängigkeit.",
    solution: "PLZ in eigene Tabelle auslagern!",
    tables: [
      {
        name: "Kunde (3NF)",
        columns: [
          { name: "KundenID (PK)", sampleData: [] },
          { name: "Name", sampleData: [] },
          { name: "PLZ (FK)", sampleData: [] },
        ],
        rows: [
          ["1", "Max Müller", "10115"],
          ["2", "Lisa Schmidt", "20095"],
        ],
      },
      {
        name: "Ort",
        columns: [
          { name: "PLZ (PK)", sampleData: [] },
          { name: "Stadt", sampleData: [] },
        ],
        rows: [
          ["10115", "Berlin"],
          ["20095", "Hamburg"],
        ],
      },
      {
        name: "Bestellung",
        columns: [
          { name: "BestellNr (PK)", sampleData: [] },
          { name: "KundenID (FK)", sampleData: [] },
          { name: "Bestelldatum", sampleData: [] },
        ],
        rows: [
          ["1001", "1", "2025-08-01"],
          ["1002", "1", "2025-08-03"],
          ["1003", "2", "2025-08-05"],
        ],
      },
      {
        name: "Bestellposition",
        columns: [
          { name: "BestellNr (FK)", sampleData: [] },
          { name: "Produkt", sampleData: [] },
          { name: "Preis", sampleData: [] },
        ],
        rows: [
          ["1001", "Laptop", "999"],
          ["1001", "Maus", "25"],
          ["1002", "Tastatur", "79"],
          ["1003", "Monitor", "350"],
          ["1003", "Kabel", "15"],
        ],
      },
    ],
  },
};

const NF_ORDER: NF[] = ["denorm", "1nf", "2nf", "3nf"];

export function NormalisationTrainer() {
  const [currentStep, setCurrentStep] = useState<NF>("denorm");
  const stepData = NF_STEPS[currentStep];
  const stepIndex = NF_ORDER.indexOf(currentStep);

  return (
    <div className="my-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-900/50 overflow-hidden">
      <div className="bg-purple-900/30 px-4 py-3 border-b border-purple-500/20">
        <h3 className="text-lg font-bold text-white">📊 Normalisierungs-Trainer</h3>
        <p className="text-sm text-purple-200/70">Bringe Schritt für Schritt eine Tabelle in die 3NF</p>
      </div>

      <div className="p-4">
        {/* Step navigation */}
        <div className="flex gap-1 mb-4">
          {NF_ORDER.map((nf, i) => (
            <button
              key={nf}
              onClick={() => setCurrentStep(nf)}
              className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentStep === nf
                  ? "bg-purple-600 text-white shadow-lg"
                  : i <= stepIndex
                  ? "bg-purple-900/40 text-purple-300 hover:bg-purple-800/40"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {i === 0 ? "Start" : `${i}. NF`}
            </button>
          ))}
        </div>

        {/* Step info */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-4 border border-slate-700/50">
          <h4 className="text-white font-bold text-lg mb-1">{stepData.title}</h4>
          <p className="text-sm text-purple-300 mb-3 font-mono">{stepData.rule}</p>

          <div className="bg-red-900/20 rounded-lg p-3 border border-red-500/20 mb-3">
            <p className="text-xs font-semibold text-red-400 mb-1">⚠️ Problem:</p>
            <pre className="text-sm text-red-200 whitespace-pre-wrap">{stepData.problem}</pre>
          </div>

          <div className="bg-green-900/20 rounded-lg p-3 border border-green-500/20">
            <p className="text-xs font-semibold text-green-400 mb-1">✅ Lösung:</p>
            <p className="text-sm text-green-200">{stepData.solution}</p>
          </div>
        </div>

        {/* Tables */}
        <div className="space-y-4">
          {stepData.tables.map((table, ti) => (
            <div key={ti} className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden">
              <div className="bg-slate-800 px-3 py-2 border-b border-slate-700">
                <span className="text-sm font-bold text-purple-300">📋 {table.name}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-800/50">
                      {table.columns.map((col, ci) => (
                        <th key={ci} className="px-3 py-2 text-left text-slate-300 border-b border-slate-700 font-semibold whitespace-nowrap">
                          {col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-slate-800/30">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-3 py-1.5 border-b border-slate-800 text-slate-200 whitespace-nowrap">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentStep(NF_ORDER[Math.max(0, stepIndex - 1)])}
            disabled={stepIndex === 0}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
          >
            ← Zurück
          </button>
          <span className="text-sm text-slate-400 self-center">{stepIndex + 1} / {NF_ORDER.length}</span>
          <button
            onClick={() => setCurrentStep(NF_ORDER[Math.min(NF_ORDER.length - 1, stepIndex + 1)])}
            disabled={stepIndex === NF_ORDER.length - 1}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors"
          >
            Weiter →
          </button>
        </div>
      </div>
    </div>
  );
}
