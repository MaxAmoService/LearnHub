"use client";

import { useState } from "react";

// ============================================================================
// Addressing Calculator — Zahlensysteme + Endianness + Adressierung
// ============================================================================

type Tab = "conversion" | "endianness" | "addressing";

export default function AddressingCalculator() {
  const [tab, setTab] = useState<Tab>("conversion");

  // Conversion state
  const [decInput, setDecInput] = useState("255");

  // Endianness state
  const [endianInput, setEndianInput] = useState("0x12345678");

  // Addressing state
  const [wordSize, setWordSize] = useState(32);
  const [addressLines, setAddressLines] = useState(24);

  // Conversion helpers
  const decValue = parseInt(decInput) || 0;
  const toBin = (n: number) => n.toString(2).padStart(Math.ceil(n.toString(2).length / 8) * 8, "0");
  const toHex = (n: number) => "0x" + n.toString(16).toUpperCase();
  const toOct = (n: number) => "0" + n.toString(8);

  // Endianness helpers
  const hexClean = endianInput.replace(/^0x/i, "").padStart(8, "0").slice(0, 8);
  const bytes = hexClean.match(/.{2}/g) || ["00", "00", "00", "00"];

  // Addressing helpers
  const maxAddressableBytes = Math.pow(2, addressLines);
  const formatBytes = (b: number) => {
    if (b >= 1024 ** 4) return `${(b / 1024 ** 4).toFixed(1)} TB`;
    if (b >= 1024 ** 3) return `${(b / 1024 ** 3).toFixed(1)} GB`;
    if (b >= 1024 ** 2) return `${(b / 1024 ** 2).toFixed(1)} MB`;
    if (b >= 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${b} Bytes`;
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "conversion", label: "Zahlensysteme" },
    { id: "endianness", label: "Endianness" },
    { id: "addressing", label: "Adressierung" },
  ];

  return (
    <div className="space-y-4">
      {/* Tab navigation */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-white dark:bg-gray-700 shadow text-amber-600 dark:text-amber-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Conversion */}
      {tab === "conversion" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gib eine Zahl ein — alle Darstellungen werden gleichzeitig angezeigt.
          </p>

          <div>
            <label className="text-xs font-medium text-gray-500">Dezimal</label>
            <input
              type="number"
              value={decInput}
              onChange={(e) => setDecInput(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
              min="0"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Binär (2er)</div>
              <div className="font-mono text-sm mt-1 break-all text-blue-800 dark:text-blue-200">
                {toBin(decValue)}
              </div>
              <div className="text-[10px] text-gray-500 mt-1">{toBin(decValue).length} Bit</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
              <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Hexadezimal (16er)</div>
              <div className="font-mono text-sm mt-1 text-amber-800 dark:text-amber-200">{toHex(decValue)}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="text-[10px] text-green-600 dark:text-green-400 font-semibold">Oktal (8er)</div>
              <div className="font-mono text-sm mt-1 text-green-800 dark:text-green-200">{toOct(decValue)}</div>
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {[0, 1, 7, 15, 255, 1023, 4095, 65535].map((n) => (
              <button
                key={n}
                onClick={() => setDecInput(String(n))}
                className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-mono hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Endianness */}
      {tab === "endianness" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gib einen 32-Bit Hex-Wert ein (z.B. 0x12345678). Die Darstellung zeigt die Byte-Reihenfolge im Speicher.
          </p>

          <div>
            <label className="text-xs font-medium text-gray-500">Hex-Wert</label>
            <input
              type="text"
              value={endianInput}
              onChange={(e) => setEndianInput(e.target.value)}
              placeholder="0x12345678"
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Big Endian */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">Big-Endian</div>
              <div className="text-[10px] text-gray-500 mb-2">MSB zuerst (Motorola, Netzwerk)</div>
              <div className="flex gap-1">
                {bytes.map((byte, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="font-mono text-sm font-bold bg-blue-100 dark:bg-blue-800/50 rounded py-1">
                      {byte}
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">Adresse {i}</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-blue-600 dark:text-blue-400 mt-2">
                Lesereihenfolge: {bytes.join(" → ")}
              </div>
            </div>

            {/* Little Endian */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-2">Little-Endian</div>
              <div className="text-[10px] text-gray-500 mb-2">LSB zuerst (Intel, x86)</div>
              <div className="flex gap-1">
                {[...bytes].reverse().map((byte, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div className="font-mono text-sm font-bold bg-amber-100 dark:bg-amber-800/50 rounded py-1">
                      {byte}
                    </div>
                    <div className="text-[9px] text-gray-400 mt-0.5">Adresse {i}</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-2">
                Lesereihenfolge: {[...bytes].reverse().join(" → ")}
              </div>
            </div>
          </div>

          <div className="text-xs text-center text-gray-400">
            Gleicher Wert, unterschiedliche Bytereihenfolge im Speicher.
          </div>
        </div>
      )}

      {/* Tab: Addressing */}
      {tab === "addressing" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Berechne den adressierbaren Speicher basierend auf Adressbus-Breite und Wortgröße.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Wortgröße (Bit)</label>
              <select
                value={wordSize}
                onChange={(e) => setWordSize(parseInt(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              >
                <option value={8}>8 Bit</option>
                <option value={16}>16 Bit</option>
                <option value={32}>32 Bit</option>
                <option value={64}>64 Bit</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Adressleitungen</label>
              <input
                type="range"
                min={4}
                max={48}
                value={addressLines}
                onChange={(e) => setAddressLines(parseInt(e.target.value))}
                className="w-full mt-1 accent-amber-500"
              />
              <div className="text-center font-mono text-sm font-bold text-amber-600">{addressLines} Leitungen</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Adressierbare Einheiten:</span>
              <span className="font-mono font-bold">2<sup>{addressLines}</sup> = {Math.pow(2, addressLines).toLocaleString("de-DE")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Max. Adressraum:</span>
              <span className="font-mono font-bold text-amber-600">{formatBytes(maxAddressableBytes)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Wortgröße:</span>
              <span className="font-mono">{wordSize} Bit = {wordSize / 8} Bytes</span>
            </div>
          </div>

          {/* Common configurations */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500">Typische Konfigurationen:</div>
            {[
              { lines: 16, bits: 16, label: "16-Bit, 16 Leitungen" },
              { lines: 20, bits: 32, label: "32-Bit, 20 Leitungen (1 MB)" },
              { lines: 32, bits: 32, label: "32-Bit, 32 Leitungen (4 GB)" },
              { lines: 48, bits: 64, label: "64-Bit, 48 Leitungen (256 TB)" },
            ].map((cfg) => (
              <button
                key={cfg.label}
                onClick={() => {
                  setWordSize(cfg.bits);
                  setAddressLines(cfg.lines);
                }}
                className="w-full text-left px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-800 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
