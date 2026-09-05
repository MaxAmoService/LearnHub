"use client";

import { useState, useMemo } from "react";

// ============================================================================
// Data Transmission Visualizer — Serielle Datenübertragung interaktiv
// ============================================================================

type Mode = "basics" | "parity" | "calc";

export default function DataTransmissionVisualizer() {
  const [mode, setMode] = useState<Mode>("basics");
  const [dataBits, setDataBits] = useState("01001000"); // 'H' in ASCII
  const [parityType, setParityType] = useState<"none" | "even" | "odd">("even");
  const [baudRate, setBaudRate] = useState(9600);
  const [dataBitsCount, setDataBitsCount] = useState(8);

  // Calculate parity
  const parityBit = useMemo(() => {
    if (parityType === "none") return null;
    const ones = dataBits.split("").filter((b) => b === "1").length;
    if (parityType === "even") return ones % 2 === 0 ? "0" : "1";
    return ones % 2 === 0 ? "1" : "0";
  }, [dataBits, parityType]);

  // Build frame
  const frame = useMemo(() => {
    const bits: { bit: string; type: string }[] = [];
    bits.push({ bit: "0", type: "start" });
    for (const b of dataBits.split("")) {
      bits.push({ bit: b, type: "data" });
    }
    if (parityBit !== null) {
      bits.push({ bit: parityBit, type: "parity" });
    }
    bits.push({ bit: "1", type: "stop" });
    bits.push({ bit: "1", type: "stop" });
    return bits;
  }, [dataBits, parityBit]);

  // Calculate transmission time
  const totalBits = frame.length;
  const bitsPerSecond = baudRate;
  const timeMs = ((totalBits / bitsPerSecond) * 1000).toFixed(2);
  const effectiveBytesPerSecond = ((baudRate / (1 + dataBitsCount + (parityType !== "none" ? 1 : 0) + 2)) * (dataBitsCount / 8)).toFixed(0);

  const getBitColor = (type: string) => {
    switch (type) {
      case "start": return "bg-red-500";
      case "data": return "bg-blue-500";
      case "parity": return "bg-amber-500";
      case "stop": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const modes: { id: Mode; label: string }[] = [
    { id: "basics", label: "Grundlagen" },
    { id: "parity", label: "Parität" },
    { id: "calc", label: "Berechnung" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              mode === m.id
                ? "bg-white dark:bg-gray-700 shadow text-amber-600 dark:text-amber-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "basics" && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Serielle vs. Parallele Übertragung</h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="text-xs font-bold text-blue-600 mb-2">Seriell (1 Leitung)</div>
              <div className="flex gap-0.5 mb-2">
                {[1,0,1,0,0,1,0,0].map((b, i) => (
                  <div key={i} className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white ${b ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                    {b}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-500">Bits nacheinander auf einer Leitung. Langsamer, aber günstig und über große Distanzen.</p>
              <p className="text-[10px] text-blue-600 mt-1">USB, SATA, Ethernet, RS-232</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="text-xs font-bold text-green-600 mb-2">Parallel (n Leitungen)</div>
              <div className="flex flex-col gap-0.5 mb-2">
                {[0,1,0,0,1,0,0,1].map((b, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="text-[9px] text-gray-400 w-4">L{i}</div>
                    <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white ${b ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`}>
                      {b}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-500">Alle Bits gleichzeitig. Schneller, aber teuer und kurze Distanzen (Signalversatz).</p>
              <p className="text-[10px] text-green-600 mt-1">PCIe, RAM-Bus (alt: Parallel-ATA)</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="text-xs font-bold mb-2">RS-232-Seriellrahmen (8N1)</div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-red-500">Start</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D0</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D1</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D2</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D3</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D4</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D5</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D6</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-blue-500">D7</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-green-500">Stopp</div>
              <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-green-500">Stopp</div>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">
              <strong>8N1</strong> = 8 Datenbits, keine Parität (None), 1 Stopp-Bit. Standard bei RS-232.
            </p>
          </div>
        </div>
      )}

      {mode === "parity" && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Paritätsbit berechnen</h4>

          <div>
            <label className="text-xs text-gray-500">Datenbits eingeben (8 Bit):</label>
            <div className="flex gap-1 mt-1">
              {dataBits.split("").map((bit, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const arr = dataBits.split("");
                    arr[i] = arr[i] === "0" ? "1" : "0";
                    setDataBits(arr.join(""));
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-bold text-white transition-all ${
                    bit === "1" ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  {bit}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {(["none", "even", "odd"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setParityType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  parityType === t
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {t === "none" ? "Keine" : t === "even" ? "Gerade" : "Ungerade"}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 mb-2">Rahmen mit {parityType === "none" ? "keiner" : parityType === "even" ? "gerader" : "ungerader"} Parität:</div>
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {frame.map((f, i) => (
                <div key={i} className={`flex-shrink-0 w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold text-white ${getBitColor(f.type)}`}>
                  {f.bit}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2 text-[10px]">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500" /> Start</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-blue-500" /> Daten</div>
              {parityBit !== null && <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-amber-500" /> Parität</div>}
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-500" /> Stopp</div>
            </div>
          </div>

          {parityBit !== null && (
            <div className="text-xs text-gray-500">
              Einsen in Datenbits: <strong>{dataBits.split("").filter(b => b === "1").length}</strong>.
              Paritätsbit: <strong>{parityBit}</strong> (macht Gesamtanzahl {parityType === "even" ? "gerade" : "ungerade"}).
            </div>
          )}
        </div>
      )}

      {mode === "calc" && (
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Übertragungsgeschwindigkeit berechnen</h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500">Baudrate (Bit/s)</label>
              <select
                value={baudRate}
                onChange={(e) => setBaudRate(parseInt(e.target.value))}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              >
                <option value={9600}>9.600</option>
                <option value={19200}>19.200</option>
                <option value={57600}>57.600</option>
                <option value={115200}>115.200</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500">Datenbits</label>
              <select
                value={dataBitsCount}
                onChange={(e) => {
                  const cnt = parseInt(e.target.value);
                  setDataBitsCount(cnt);
                  setDataBits("0".repeat(cnt));
                }}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              >
                <option value={7}>7</option>
                <option value={8}>8</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Rahmenlänge:</span>
              <span className="font-mono font-bold">{totalBits} Bit</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Datenanteil:</span>
              <span className="font-mono">{dataBitsCount} von {totalBits} Bit ({((dataBitsCount / totalBits) * 100).toFixed(0)}%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Brutto:</span>
              <span className="font-mono font-bold">{baudRate.toLocaleString()} Bit/s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Netto (Daten):</span>
              <span className="font-mono font-bold text-amber-600">{parseInt(effectiveBytesPerSecond).toLocaleString()} Byte/s ≈ {(parseInt(effectiveBytesPerSecond) / 1024).toFixed(1)} KB/s</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Zeit für 1 Rahmen:</span>
              <span className="font-mono">{timeMs} ms</span>
            </div>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Formel: Netto = Baudrate / (1 + Datenbits + Parität + Stoppbits) × (Datenbits / 8)
          </div>
        </div>
      )}
    </div>
  );
}
