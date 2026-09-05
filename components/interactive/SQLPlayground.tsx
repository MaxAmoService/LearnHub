"use client";

import { useState, useCallback } from "react";

interface QueryResult {
  columns: string[];
  rows: string[][];
  message?: string;
  error?: string;
}

const SAMPLE_TABLES: Record<string, { columns: string[]; rows: string[][] }> = {
  kunde: {
    columns: ["KundenID", "Name", "Email", "Stadt", "PLZ"],
    rows: [
      ["1", "Max Müller", "max@email.de", "Berlin", "10115"],
      ["2", "Lisa Schmidt", "lisa@email.de", "Hamburg", "20095"],
      ["3", "Tom Weber", "tom@email.de", "München", "80331"],
      ["4", "Anna Braun", "anna@email.de", "Berlin", "10117"],
      ["5", "Peter Schwarz", "peter@email.de", "Köln", "50667"],
    ],
  },
  bestellung: {
    columns: ["BestellID", "KundenID", "Datum", "Betrag", "Status"],
    rows: [
      ["1001", "1", "2025-08-01", "59.90", "versendet"],
      ["1002", "1", "2025-08-03", "129.00", "offen"],
      ["1003", "2", "2025-08-05", "24.50", "geliefert"],
      ["1004", "3", "2025-08-10", "499.00", "offen"],
      ["1005", "4", "2025-08-12", "89.00", "versendet"],
      ["1006", "2", "2025-08-15", "199.99", "offen"],
    ],
  },
  produkt: {
    columns: ["ProduktID", "Name", "Preis", "Kategorie", "Lagerbestand"],
    rows: [
      ["1", "Laptop", "999.00", "Elektronik", "15"],
      ["2", "Maus", "25.00", "Zubehör", "150"],
      ["3", "Tastatur", "79.00", "Zubehör", "80"],
      ["4", "Monitor", "350.00", "Elektronik", "30"],
      ["5", "Kabel USB-C", "15.00", "Zubehör", "500"],
      ["6", "Headset", "129.00", "Zubehör", "45"],
    ],
  },
};

const EXAMPLE_QUERIES = [
  { label: "Alle Kunden", sql: "SELECT * FROM Kunde" },
  { label: "Kunden aus Berlin", sql: "SELECT Name, Email FROM Kunde WHERE Stadt = 'Berlin'" },
  { label: "Bestellungen sortiert", sql: "SELECT * FROM Bestellung ORDER BY Betrag DESC" },
  { label: "Anzahl Bestellungen", sql: "SELECT COUNT(*) AS Anzahl FROM Bestellung" },
  { label: "Durchschnitt Betrag", sql: "SELECT AVG(Betrag) AS Durchschnitt FROM Bestellung" },
  { label: "JOIN: Kunde + Bestellung", sql: "SELECT k.Name, b.Datum, b.Betrag FROM Kunde k JOIN Bestellung b ON k.KundenID = b.KundenID" },
  { label: "Produkte > 100€", sql: "SELECT Name, Preis FROM Produkt WHERE Preis > 100 ORDER BY Preis" },
  { label: "Bestellungen pro Kunde", sql: "SELECT k.Name, COUNT(b.BestellID) AS Anzahl FROM Kunde k JOIN Bestellung b ON k.KundenID = b.KundenID GROUP BY k.Name" },
  { label: "Offene Bestellungen", sql: "SELECT * FROM Bestellung WHERE Status = 'offen'" },
  { label: "Produkte unter 50 Stk", sql: "SELECT Name, Lagerbestand FROM Produkt WHERE Lagerbestand < 50" },
];

function executeQuery(sql: string): QueryResult {
  const normalized = sql.trim().replace(/;$/, "").replace(/\s+/g, " ").toLowerCase();

  // Check for dangerous operations
  if (normalized.includes("drop ") || normalized.includes("truncate ") || normalized.includes("delete ") || normalized.includes("update ")) {
    return { columns: [], rows: [], error: "⚠️ Nur SELECT-Abfragen im Playground erlaubt! (DML/DDL-Operationen werden blockiert)" };
  }

  if (!normalized.startsWith("select")) {
    return { columns: [], rows: [], error: "❌ Nur SELECT-Abfragen werden unterstützt." };
  }

  // Very simple SQL parser for demo purposes
  try {
    // Determine table
    let tableName = "";
    for (const t of Object.keys(SAMPLE_TABLES)) {
      if (normalized.includes(`from ${t}`)) {
        tableName = t;
        break;
      }
    }
    if (!tableName) {
      return { columns: [], rows: [], error: "❌ Tabelle nicht gefunden. Verfügbar: Kunde, Bestellung, Produkt" };
    }

    const table = SAMPLE_TABLES[tableName];
    let resultRows = [...table.rows];

    // Handle JOINs
    let joinTable = "";
    let joinAlias = "";
    let mainAlias = "";
    const joinMatch = normalized.match(/join\s+(\w+)\s+(\w+)\s+on\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
    if (joinMatch) {
      const [, jTable, jAlias, , , ,] = joinMatch;
      joinTable = jTable;
      joinAlias = jAlias;

      if (SAMPLE_TABLES[joinTable]) {
        const jData = SAMPLE_TABLES[joinTable];
        const newRows: string[][] = [];
        for (const mainRow of resultRows) {
          for (const jRow of jData.rows) {
            // Match on common ID
            const mainID = mainRow[0];
            const jFK = jRow[1]; // Assume FK is second column
            if (mainID === jFK) {
              newRows.push([...mainRow, ...jRow]);
            }
          }
        }
        resultRows = newRows;

        // Parse selected columns
        const selectMatch = normalized.match(/select\s+(.+?)\s+from/);
        if (selectMatch) {
          const selectPart = selectMatch[1].trim();
          if (selectPart === "*") {
            return {
              columns: [...table.columns, ...jData.columns.map((c) => `${joinTable}.${c}`)],
              rows: resultRows,
            };
          }
          // Try to parse specific columns
          const cols = selectPart.split(",").map((c) => c.trim());
          const resultCols: string[] = [];
          const colIndices: number[] = [];
          for (const col of cols) {
            const parts = col.split(".");
            const colName = parts[parts.length - 1];
            const allCols = [...table.columns, ...jData.columns.map((c) => c)];
            const idx = allCols.findIndex((c) => c.toLowerCase() === colName.toLowerCase());
            if (idx >= 0) {
              resultCols.push(colName);
              colIndices.push(idx);
            }
          }
          return {
            columns: resultCols,
            rows: resultRows.map((row) => colIndices.map((i) => row[i] || "")),
          };
        }
      }
    }

    // Parse WHERE clause
    const whereMatch = normalized.match(/where\s+(.+?)(?:\s+group\s+by|\s+order\s+by|\s+limit|$)/);
    if (whereMatch) {
      const condition = whereMatch[1].trim();
      const eqMatch = condition.match(/(\w+)\s*=\s*'([^']+)'/);
      const gtMatch = condition.match(/(\w+)\s*>\s*(\d+\.?\d*)/);
      const ltMatch = condition.match(/(\w+)\s*<\s*(\d+\.?\d*)/);

      const colIdx = (name: string) => table.columns.findIndex((c) => c.toLowerCase() === name.toLowerCase());

      if (eqMatch) {
        const idx = colIdx(eqMatch[1]);
        if (idx >= 0) resultRows = resultRows.filter((r) => r[idx].toLowerCase() === eqMatch[2].toLowerCase());
      } else if (gtMatch) {
        const idx = colIdx(gtMatch[1]);
        if (idx >= 0) resultRows = resultRows.filter((r) => parseFloat(r[idx]) > parseFloat(gtMatch[2]));
      } else if (ltMatch) {
        const idx = colIdx(ltMatch[1]);
        if (idx >= 0) resultRows = resultRows.filter((r) => parseFloat(r[idx]) < parseFloat(ltMatch[2]));
      }
    }

    // Handle COUNT
    const countMatch = normalized.match(/select\s+count\(\*\)\s*(?:as\s+(\w+))?/);
    if (countMatch) {
      const alias = countMatch[1] || "count";
      return { columns: [alias], rows: [[String(resultRows.length)]] };
    }

    // Handle AVG
    const avgMatch = normalized.match(/select\s+avg\((\w+)\)\s*(?:as\s+(\w+))?/);
    if (avgMatch) {
      const colIdx = table.columns.findIndex((c) => c.toLowerCase() === avgMatch[1].toLowerCase());
      if (colIdx >= 0) {
        const values = resultRows.map((r) => parseFloat(r[colIdx])).filter((v) => !isNaN(v));
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return { columns: [avgMatch[2] || "avg"], rows: [[avg.toFixed(2)]] };
      }
    }

    // Handle GROUP BY + COUNT
    const groupMatch = normalized.match(/select\s+(\w+(?:\.\w+)?),\s*count\(\w*\)\s*(?:as\s+(\w+))?\s+from/);
    if (groupMatch && normalized.includes("group by")) {
      const groupCol = groupMatch[1].split(".").pop()!;
      const countAlias = groupMatch[2] || "Anzahl";
      const gIdx = table.columns.findIndex((c) => c.toLowerCase() === groupCol.toLowerCase());
      if (gIdx >= 0) {
        const groups: Record<string, number> = {};
        for (const row of resultRows) {
          groups[row[gIdx]] = (groups[row[gIdx]] || 0) + 1;
        }
        return {
          columns: [groupCol, countAlias],
          rows: Object.entries(groups).map(([k, v]) => [k, String(v)]),
        };
      }
    }

    // Handle ORDER BY
    const orderMatch = normalized.match(/order\s+by\s+(\w+)(?:\s+(asc|desc))?/);
    if (orderMatch) {
      const colIdx = table.columns.findIndex((c) => c.toLowerCase() === orderMatch[1].toLowerCase());
      if (colIdx >= 0) {
        const desc = orderMatch[2] === "desc";
        resultRows.sort((a, b) => {
          const av = isNaN(Number(a[colIdx])) ? a[colIdx] : Number(a[colIdx]);
          const bv = isNaN(Number(b[colIdx])) ? b[colIdx] : Number(b[colIdx]);
          if (typeof av === "number" && typeof bv === "number") return desc ? bv - av : av - bv;
          return desc ? String(bv).localeCompare(String(av)) : String(av).localeCompare(String(bv));
        });
      }
    }

    // Parse SELECT columns
    const selectMatch = normalized.match(/select\s+(.+?)\s+from/);
    if (selectMatch) {
      const selectPart = selectMatch[1].trim();
      if (selectPart === "*") {
        return { columns: table.columns, rows: resultRows };
      }
      const cols = selectPart.split(",").map((c) => c.trim());
      const resultCols: string[] = [];
      const colIndices: number[] = [];
      for (const col of cols) {
        const asMatch = col.match(/(.+?)\s+as\s+(\w+)/);
        const colName = asMatch ? asMatch[1].trim() : col;
        const alias = asMatch ? asMatch[2] : col;
        const idx = table.columns.findIndex((c) => c.toLowerCase() === colName.toLowerCase());
        if (idx >= 0) {
          resultCols.push(alias);
          colIndices.push(idx);
        }
      }
      return {
        columns: resultCols,
        rows: resultRows.map((row) => colIndices.map((i) => row[i] || "")),
      };
    }

    return { columns: table.columns, rows: resultRows };
  } catch {
    return { columns: [], rows: [], error: "❌ Fehler beim Parsen der Abfrage." };
  }
}

export function SQLPlayground() {
  const [sql, setSql] = useState("SELECT * FROM Kunde");
  const [result, setResult] = useState<QueryResult | null>(null);
  const [showTables, setShowTables] = useState(false);

  const runQuery = useCallback(() => {
    const res = executeQuery(sql);
    setResult(res);
  }, [sql]);

  return (
    <div className="my-6 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-slate-900/50 overflow-hidden">
      <div className="bg-purple-900/30 px-4 py-3 border-b border-purple-500/20 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">💾 SQL Playground</h3>
          <p className="text-sm text-purple-200/70">Schreibe SQL-Abfragen und sieh die Ergebnisse live</p>
        </div>
        <button
          onClick={() => setShowTables(!showTables)}
          className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          {showTables ? "Tabellen ausblenden" : "📋 Tabellen ansehen"}
        </button>
      </div>

      <div className="p-4">
        {/* Table schemas */}
        {showTables && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {Object.entries(SAMPLE_TABLES).map(([name, table]) => (
              <div key={name} className="bg-slate-800/60 rounded-lg border border-slate-700 overflow-hidden">
                <div className="bg-slate-700/50 px-3 py-1.5">
                  <span className="text-xs font-bold text-purple-300">📋 {name.charAt(0).toUpperCase() + name.slice(1)}</span>
                </div>
                <div className="px-3 py-2">
                  {table.columns.map((col, i) => (
                    <div key={i} className="text-xs text-slate-300 mb-0.5">
                      {i === 0 ? <span className="text-yellow-400">🔑 </span> : <span className="pl-4">{col}</span>}
                      {i === 0 && col}
                    </div>
                  ))}
                  <div className="text-[10px] text-slate-500 mt-1">{table.rows.length} Zeilen</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Example queries */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {EXAMPLE_QUERIES.map((ex, i) => (
            <button
              key={i}
              onClick={() => { setSql(ex.sql); }}
              className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-600 transition-colors"
              title={ex.sql}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* SQL Input */}
        <div className="relative mb-3">
          <textarea
            value={sql}
            onChange={(e) => setSql(e.target.value)}
            rows={3}
            className="w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pr-20 font-mono text-sm text-green-300 placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none"
            placeholder="SELECT * FROM Kunde WHERE Stadt = 'Berlin'"
            spellCheck={false}
          />
          <button
            onClick={runQuery}
            className="absolute right-2 bottom-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            ▶ Ausführen
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden">
            {result.error ? (
              <div className="p-3 text-sm text-red-400">{result.error}</div>
            ) : result.columns.length === 0 ? (
              <div className="p-3 text-sm text-slate-400">Kein Ergebnis.</div>
            ) : (
              <>
                <div className="bg-slate-800/50 px-3 py-1.5 border-b border-slate-700 flex justify-between">
                  <span className="text-xs text-slate-400">Ergebnis</span>
                  <span className="text-xs text-green-400">✅ {result.rows.length} Zeile(n)</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-slate-800/80">
                        {result.columns.map((col, i) => (
                          <th key={i} className="px-3 py-2 text-left text-purple-300 border-b border-slate-700 font-semibold whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, ri) => (
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
