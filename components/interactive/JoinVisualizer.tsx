"use client";

import { useState } from "react";

type JoinType = "inner" | "left" | "right" | "cross";

const TABLE_A = {
  name: "Kunde",
  color: "#3B82F6",
  rows: [
    { id: "1", name: "Max", city: "Berlin" },
    { id: "2", name: "Lisa", city: "Hamburg" },
    { id: "3", name: "Tom", city: "München" },
    { id: "4", name: "Anna", city: "Berlin" },
  ],
};

const TABLE_B = {
  name: "Bestellung",
  color: "#22C55E",
  rows: [
    { id: "1001", kundeId: "1", amount: "59.90" },
    { id: "1002", kundeId: "1", amount: "129.00" },
    { id: "1003", kundeId: "2", amount: "24.50" },
    { id: "1004", kundeId: "5", amount: "99.00" },
  ],
};

interface ResultRow {
  cells: { value: string; source: "a" | "b" | "null" }[];
  highlight: boolean;
}

function getJoinResult(type: JoinType): { rows: ResultRow[]; description: string; sql: string } {
  const aRows = TABLE_A.rows;
  const bRows = TABLE_B.rows;

  const buildRow = (a: typeof aRows[0] | null, b: typeof bRows[0] | null, highlight: boolean): ResultRow => ({
    cells: [
      { value: a?.id || "NULL", source: a ? "a" : "null" },
      { value: a?.name || "NULL", source: a ? "a" : "null" },
      { value: a?.city || "NULL", source: a ? "a" : "null" },
      { value: b?.id || "NULL", source: b ? "b" : "null" },
      { value: b?.kundeId || "NULL", source: b ? "b" : "null" },
      { value: b?.amount || "NULL", source: b ? "b" : "null" },
    ],
    highlight,
  });

  const matchedAIds = new Set<string>();
  const matchedBIds = new Set<string>();
  const resultRows: ResultRow[] = [];

  switch (type) {
    case "inner": {
      for (const a of aRows) {
        for (const b of bRows) {
          if (a.id === b.kundeId) {
            resultRows.push(buildRow(a, b, true));
            matchedAIds.add(a.id);
            matchedBIds.add(b.id);
          }
        }
      }
      return {
        rows: resultRows,
        description: `Nur Zeilen mit Match in BEIDEN Tabellen. ${aRows.length - matchedAIds.size} Kunden ohne Bestellung und ${bRows.length - matchedBIds.size} Bestellungen ohne Kunden werden ausgeblendet.`,
        sql: `SELECT k.*, b.*\nFROM Kunde k\nINNER JOIN Bestellung b ON k.id = b.kunde_id`,
      };
    }
    case "left": {
      for (const a of aRows) {
        let found = false;
        for (const b of bRows) {
          if (a.id === b.kundeId) {
            resultRows.push(buildRow(a, b, true));
            found = true;
          }
        }
        if (!found) {
          const row = buildRow(a, null, false);
          row.cells[3].value = "NULL";
          row.cells[4].value = "NULL";
          row.cells[5].value = "NULL";
          resultRows.push(row);
        }
      }
      return {
        rows: resultRows,
        description: "Alle Kunden — auch die ohne Bestellung (Bestell-Spalten = NULL).",
        sql: `SELECT k.*, b.*\nFROM Kunde k\nLEFT JOIN Bestellung b ON k.id = b.kunde_id`,
      };
    }
    case "right": {
      for (const b of bRows) {
        let found = false;
        for (const a of aRows) {
          if (a.id === b.kundeId) {
            resultRows.push(buildRow(a, b, true));
            found = true;
          }
        }
        if (!found) {
          const row = buildRow(null, b, false);
          row.cells[0].value = "NULL";
          row.cells[1].value = "NULL";
          row.cells[2].value = "NULL";
          resultRows.push(row);
        }
      }
      return {
        rows: resultRows,
        description: "Alle Bestellungen — auch die ohne Kunden (Kunden-Spalten = NULL).",
        sql: `SELECT k.*, b.*\nFROM Kunde k\nRIGHT JOIN Bestellung b ON k.id = b.kunde_id`,
      };
    }
    case "cross": {
      for (const a of aRows) {
        for (const b of bRows) {
          resultRows.push(buildRow(a, b, a.id === b.kundeId));
        }
      }
      return {
        rows: resultRows,
        description: `Kartesisches Produkt: ${aRows.length} × ${bRows.length} = ${resultRows.length} Zeilen. Jede Kombination!`,
        sql: `SELECT k.*, b.*\nFROM Kunde k\nCROSS JOIN Bestellung b`,
      };
    }
  }
}

const JOIN_INFO: Record<JoinType, { name: string; icon: string; shortDesc: string }> = {
  inner: { name: "INNER JOIN", icon: "🔵", shortDesc: "Nur Matches in beiden" },
  left: { name: "LEFT JOIN", icon: "🟢", shortDesc: "Alle links + Matches rechts" },
  right: { name: "RIGHT JOIN", icon: "🟡", shortDesc: "Alle rechts + Matches links" },
  cross: { name: "CROSS JOIN", icon: "🔴", shortDesc: "Alle Kombinationen" },
};

export function JoinVisualizer() {
  const [joinType, setJoinType] = useState<JoinType>("inner");
  const result = getJoinResult(joinType);
  const info = JOIN_INFO[joinType];

  return (
    <div className="my-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-900/50 overflow-hidden">
      <div className="bg-purple-900/30 px-4 py-3 border-b border-purple-500/20">
        <h3 className="text-lg font-bold text-white">🔀 JOIN-Visualisierer</h3>
        <p className="text-sm text-purple-200/70">Sieh welche Zeilen bei welchem JOIN-Typ übrig bleiben</p>
      </div>

      <div className="p-4">
        {/* Source tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {[TABLE_A, TABLE_B].map((table) => (
            <div key={table.name} className="bg-slate-800/60 rounded-lg border border-slate-700 overflow-hidden">
              <div className="px-3 py-1.5 border-b border-slate-700" style={{ backgroundColor: table.color + "15" }}>
                <span className="text-xs font-bold" style={{ color: table.color }}>📋 {table.name}</span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-800/50">
                    {Object.keys(table.rows[0]).map((k) => (
                      <th key={k} className="px-2 py-1 text-left text-slate-400 border-b border-slate-700">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="px-2 py-1 border-b border-slate-800 text-slate-300">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Join type selector */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {(Object.keys(JOIN_INFO) as JoinType[]).map((type) => (
            <button
              key={type}
              onClick={() => setJoinType(type)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                joinType === type
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {JOIN_INFO[type].icon} {JOIN_INFO[type].name}
            </button>
          ))}
        </div>

        {/* Description */}
        <div className="bg-slate-800/50 rounded-lg p-3 mb-3 border border-slate-700/50">
          <p className="text-sm text-purple-200 mb-2">{info.shortDesc}</p>
          <p className="text-xs text-slate-300 mb-2">{result.description}</p>
          <pre className="text-xs text-green-300 bg-slate-900 rounded p-2 font-mono">{result.sql}</pre>
        </div>

        {/* Result */}
        <div className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden">
          <div className="bg-slate-800/50 px-3 py-1.5 border-b border-slate-700 flex justify-between">
            <span className="text-xs text-slate-400">Ergebnis</span>
            <span className="text-xs text-green-400">{result.rows.length} Zeile(n)</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-800/80">
                  <th colSpan={3} className="px-2 py-1.5 text-center text-blue-400 border-b border-slate-700 text-[10px]">{TABLE_A.name}</th>
                  <th colSpan={3} className="px-2 py-1.5 text-center text-green-400 border-b border-slate-700 text-[10px]">{TABLE_B.name}</th>
                </tr>
                <tr className="bg-slate-800/80">
                  {["ID", "Name", "Stadt", "BestID", "KundeID", "Betrag"].map((h, i) => (
                    <th key={i} className="px-2 py-1 text-left text-slate-400 border-b border-slate-700">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, ri) => (
                  <tr key={ri} className={row.highlight ? "bg-purple-900/20" : "bg-red-900/10"}>
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-2 py-1 border-b border-slate-800 ${
                          cell.source === "null"
                            ? "text-slate-600 italic"
                            : cell.source === "a"
                            ? "text-blue-300"
                            : "text-green-300"
                        }`}
                      >
                        {cell.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual representation */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
          <div className="w-4 h-4 rounded bg-blue-500/30 border border-blue-500/50"></div>
          <span>= Kunde</span>
          <div className="w-4 h-4 rounded bg-green-500/30 border border-green-500/50 ml-3"></div>
          <span>= Bestellung</span>
          <div className="w-4 h-4 rounded bg-red-900/30 border border-red-500/30 ml-3"></div>
          <span>= NULL (kein Match)</span>
        </div>
      </div>
    </div>
  );
}
