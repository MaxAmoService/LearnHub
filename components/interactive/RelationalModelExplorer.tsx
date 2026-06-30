"use client";

import { useState } from "react";

type RelationType = "1:1" | "1:n" | "n:m";

interface Column {
  name: string;
  type: string;
  isPK: boolean;
  isFK: boolean;
  refTable?: string;
  refCol?: string;
}

interface TableData {
  name: string;
  color: string;
  columns: Column[];
  rows: Record<string, string>[];
}

const RELATION_EXAMPLES: Record<RelationType, {
  title: string;
  description: string;
  tables: TableData[];
  fkRule: string;
  example: string;
}> = {
  "1:1": {
    title: "1:1 — Eins-zu-Eins",
    description: "Ein Datensatz der Tabelle A ist genau einem Datensatz der Tabelle B zugeordnet.",
    tables: [
      {
        name: "Mitarbeiter",
        color: "#3B82F6",
        columns: [
          { name: "ID", type: "SERIAL", isPK: true, isFK: false },
          { name: "Name", type: "VARCHAR(100)", isPK: false, isFK: false },
          { name: "Abteilung", type: "VARCHAR(50)", isPK: false, isFK: false },
        ],
        rows: [
          { ID: "1", Name: "Max Müller", Abteilung: "IT" },
          { ID: "2", Name: "Lisa Schmidt", Abteilung: "HR" },
          { ID: "3", Name: "Tom Weber", Abteilung: "Vertrieb" },
        ],
      },
      {
        name: "Arbeitsplatz",
        color: "#8B5CF6",
        columns: [
          { name: "PlatzID", type: "SERIAL", isPK: true, isFK: false },
          { name: "Raum", type: "VARCHAR(20)", isPK: false, isFK: false },
          { name: "MitarbeiterID", type: "INT", isPK: false, isFK: true, refTable: "Mitarbeiter", refCol: "ID" },
        ],
        rows: [
          { PlatzID: "101", Raum: "A-201", MitarbeiterID: "1" },
          { PlatzID: "102", Raum: "A-202", MitarbeiterID: "2" },
          { PlatzID: "103", Raum: "B-101", MitarbeiterID: "3" },
        ],
      },
    ],
    fkRule: "FK (MitarbeiterID) in der untergeordneten Tabelle (Arbeitsplatz)",
    example: "Jeder Mitarbeiter hat genau einen Arbeitsplatz. Jeder Arbeitsplatz gehört genau einem Mitarbeiter.",
  },
  "1:n": {
    title: "1:n — Eins-zu-Viele",
    description: "Ein Datensatz der Tabelle A kann mehrere Datensätze der Tabelle B haben.",
    tables: [
      {
        name: "Kunde",
        color: "#22C55E",
        columns: [
          { name: "KundenID", type: "SERIAL", isPK: true, isFK: false },
          { name: "Name", type: "VARCHAR(100)", isPK: false, isFK: false },
          { name: "Stadt", type: "VARCHAR(50)", isPK: false, isFK: false },
        ],
        rows: [
          { KundenID: "1", Name: "Anna Braun", Stadt: "Berlin" },
          { KundenID: "2", Name: "Peter Schwarz", Stadt: "Hamburg" },
        ],
      },
      {
        name: "Bestellung",
        color: "#F59E0B",
        columns: [
          { name: "BestellID", type: "SERIAL", isPK: true, isFK: false },
          { name: "Datum", type: "DATE", isPK: false, isFK: false },
          { name: "Betrag", type: "DECIMAL", isPK: false, isFK: false },
          { name: "KundenID", type: "INT", isPK: false, isFK: true, refTable: "Kunde", refCol: "KundenID" },
        ],
        rows: [
          { BestellID: "1001", Datum: "2025-08-01", Betrag: "59.90", KundenID: "1" },
          { BestellID: "1002", Datum: "2025-08-03", Betrag: "129.00", KundenID: "1" },
          { BestellID: "1003", Datum: "2025-08-05", Betrag: "24.50", KundenID: "2" },
        ],
      },
    ],
    fkRule: "FK (KundenID) kommt IMMER auf die n-Seite (Bestellung)!",
    example: "Ein Kunde kann viele Bestellungen haben. Jede Bestellung gehört zu genau einem Kunden.",
  },
  "n:m": {
    title: "n:m — Viele-zu-Viele",
    description: "Datensätze beider Tabellen können mehrere Partner haben → erzeugt eine Verweistabelle!",
    tables: [
      {
        name: "Schüler",
        color: "#EC4899",
        columns: [
          { name: "SchülerID", type: "SERIAL", isPK: true, isFK: false },
          { name: "Name", type: "VARCHAR(100)", isPK: false, isFK: false },
        ],
        rows: [
          { SchülerID: "1", Name: "Max" },
          { SchülerID: "2", Name: "Lisa" },
          { SchülerID: "3", Name: "Tom" },
        ],
      },
      {
        name: "Kurs",
        color: "#06B6D4",
        columns: [
          { name: "KursID", type: "SERIAL", isPK: true, isFK: false },
          { name: "Fach", type: "VARCHAR(50)", isPK: false, isFK: false },
        ],
        rows: [
          { KursID: "10", Fach: "Mathe" },
          { KursID: "20", Fach: "Deutsch" },
          { KursID: "30", Fach: "Englisch" },
        ],
      },
      {
        name: "SchülerKurs (Verweistabelle!)",
        color: "#F97316",
        columns: [
          { name: "SchülerID", type: "INT", isPK: true, isFK: true, refTable: "Schüler", refCol: "SchülerID" },
          { name: "KursID", type: "INT", isPK: true, isFK: true, refTable: "Kurs", refCol: "KursID" },
          { name: "Note", type: "DECIMAL", isPK: false, isFK: false },
        ],
        rows: [
          { SchülerID: "1", KursID: "10", Note: "2" },
          { SchülerID: "1", KursID: "30", Note: "1" },
          { SchülerID: "2", KursID: "10", Note: "3" },
          { SchülerID: "2", KursID: "20", Note: "2" },
          { SchülerID: "3", KursID: "20", Note: "1" },
        ],
      },
    ],
    fkRule: "Beide FKs bilden den zusammengesetzten PK der Verweistabelle!",
    example: "Ein Schüler besucht viele Kurse. Ein Kurs hat viele Schüler. → Verweistabelle mit ggf. Beziehungsattribut (Note).",
  },
};

export function RelationalModelExplorer() {
  const [selected, setSelected] = useState<RelationType>("1:1");
  const example = RELATION_EXAMPLES[selected];

  return (
    <div className="my-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-900/50 overflow-hidden">
      <div className="bg-purple-900/30 px-4 py-3 border-b border-purple-500/20">
        <h3 className="text-lg font-bold text-white">🔗 Kardinalitäten-Explorer</h3>
        <p className="text-sm text-purple-200/70">Wähle einen Beziehungstyp und sieh dir die resultierenden Tabellen an</p>
      </div>

      <div className="p-4">
        {/* Selector buttons */}
        <div className="flex gap-2 mb-4">
          {(["1:1", "1:n", "n:m"] as RelationType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`px-4 py-2 rounded-lg font-mono font-bold text-sm transition-all ${
                selected === type
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="bg-slate-800/50 rounded-lg p-3 mb-4 border border-slate-700/50">
          <h4 className="text-white font-bold mb-1">{example.title}</h4>
          <p className="text-sm text-slate-300">{example.description}</p>
          <p className="text-sm text-purple-300 mt-2">💡 {example.example}</p>
        </div>

        {/* Visual diagram */}
        <div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
          {example.tables.map((table, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="bg-slate-800 rounded-lg border-2 p-3 min-w-[160px]" style={{ borderColor: table.color }}>
                <div className="text-center font-bold text-sm mb-2" style={{ color: table.color }}>{table.name}</div>
                {table.columns.map((col) => (
                  <div key={col.name} className="flex items-center gap-1 text-xs mb-1">
                    {col.isPK && <span className="text-yellow-400">🔑</span>}
                    {col.isFK && <span className="text-blue-400">🔗</span>}
                    <span className={col.isPK ? "text-yellow-300 font-semibold" : col.isFK ? "text-blue-300" : "text-slate-300"}>
                      {col.name}
                    </span>
                    <span className="text-slate-500 ml-auto">{col.type}</span>
                  </div>
                ))}
              </div>
              {i < example.tables.length - 1 && (
                <div className="text-purple-400 text-2xl font-bold">⟷</div>
              )}
            </div>
          ))}
        </div>

        {/* Data preview */}
        <div className="space-y-3">
          {example.tables.map((table, i) => (
            <div key={i}>
              <h5 className="text-sm font-semibold mb-1" style={{ color: table.color }}>{table.name}</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-800/80">
                      {table.columns.map((col) => (
                        <th key={col.name} className="px-3 py-2 text-left text-slate-300 border border-slate-700">
                          {col.isPK && "🔑 "}{col.isFK && "🔗 "}{col.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, ri) => (
                      <tr key={ri} className="hover:bg-slate-800/40">
                        {table.columns.map((col) => (
                          <td key={col.name} className="px-3 py-2 border border-slate-700/50 text-slate-200">
                            {row[col.name]}
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

        {/* FK Rule */}
        <div className="mt-4 bg-purple-900/30 rounded-lg p-3 border border-purple-500/20">
          <p className="text-sm text-purple-200">
            <span className="font-bold">FK-Regel:</span> {example.fkRule}
          </p>
        </div>
      </div>
    </div>
  );
}
