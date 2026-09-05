"use client";

import { useState } from "react";

const CABLES = [
  {
    name: "Cat 5",
    speed: "100 Mbit/s",
    distance: "100m",
    freq: "100 MHz",
    shield: "UTP",
    use: "Fast Ethernet (veraltet)",
    color: "#6B7280",
    year: 1995,
  },
  {
    name: "Cat 5e",
    speed: "1 Gbit/s",
    distance: "100m",
    freq: "100 MHz",
    shield: "UTP",
    use: "Gigabit Ethernet (Minimum)",
    color: "#3B82F6",
    year: 2001,
  },
  {
    name: "Cat 6",
    speed: "1-10 Gbit/s",
    distance: "55-100m",
    freq: "250 MHz",
    shield: "UTP/STP",
    use: "Modernes LAN",
    color: "#22C55E",
    year: 2002,
  },
  {
    name: "Cat 6a",
    speed: "10 Gbit/s",
    distance: "100m",
    freq: "500 MHz",
    shield: "STP",
    use: "Standard heute ✅",
    color: "#EAB308",
    year: 2008,
  },
  {
    name: "Cat 7",
    speed: "10 Gbit/s",
    distance: "100m",
    freq: "600 MHz",
    shield: "S/FTP",
    use: "Geschirmt (Industrie)",
    color: "#F97316",
    year: 2010,
  },
  {
    name: "Cat 8",
    speed: "25/40 Gbit/s",
    distance: "30m",
    freq: "2000 MHz",
    shield: "S/FTP",
    use: "Rechenzentren",
    color: "#EF4444",
    year: 2016,
  },
];

const FIBER_TYPES = [
  {
    name: "Multimode (OM1/OM2)",
    core: "62.5 µm",
    distance: "~300m",
    speed: "1 Gbit/s",
    color: "#F97316",
    connector: "SC/LC",
    use: "Kurze Strecken, günstig",
  },
  {
    name: "Multimode (OM3/OM4)",
    core: "50 µm",
    distance: "~550m",
    speed: "10-100 Gbit/s",
    color: "#22C55E",
    connector: "LC",
    use: "Rechenzentren",
  },
  {
    name: "Singlemode (OS1/OS2)",
    core: "9 µm",
    distance: "100km+",
    speed: "100+ Gbit/s",
    color: "#3B82F6",
    connector: "SC/LC",
    use: "WAN, lange Strecken",
  },
];

export function CableComparer() {
  const [mode, setMode] = useState<"copper" | "fiber">("copper");
  const [selected, setSelected] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleSelect = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : prev.length < 3
          ? [...prev, name]
          : prev
    );
  };

  const items = mode === "copper" ? CABLES : FIBER_TYPES;
  const selectedItems = items.filter((i) => selected.includes(i.name));

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔌 Kabel-Vergleich — Interaktiv</h3>
      <p className="text-slate-300 text-sm mb-4">
        Vergleiche Netzwerkkabel — wähle bis zu 3 zum Vergleich aus!
      </p>

      {/* Modus Toggle */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setMode("copper"); setSelected([]); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === "copper" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          🔌 Kupfer (Twisted Pair)
        </button>
        <button
          onClick={() => { setMode("fiber"); setSelected([]); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            mode === "fiber" ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          💡 Glasfaser
        </button>
      </div>

      {/* Kabel-Auswahl */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
        {items.map((item) => (
          <button
            key={item.name}
            onClick={() => toggleSelect(item.name)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selected.includes(item.name)
                ? "border-white shadow-lg"
                : "border-slate-700 hover:border-slate-500"
            }`}
            style={{
              backgroundColor: selected.includes(item.name) ? `${item.color}20` : "transparent",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-white font-semibold text-sm">{item.name}</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              {"speed" in item ? (item as any).speed : (item as any).speed}
            </p>
          </button>
        ))}
      </div>

      {/* Vergleich */}
      {selected.length > 0 && (
        <div className="bg-slate-900 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-3">📊 Vergleich ({selected.length} ausgewählt):</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left py-1 pr-2">Eigenschaft</th>
                  {selectedItems.map((item) => (
                    <th key={item.name} className="text-left py-1 px-2">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }} />
                        {item.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {mode === "copper" ? (
                  <>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Speed</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2 font-mono">{(item as any).speed}</td>)}
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Reichweite</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2 font-mono">{(item as any).distance}</td>)}
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Frequenz</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2 font-mono">{(item as any).freq}</td>)}
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Schirmung</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2">{(item as any).shield}</td>)}
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 text-slate-500">Einsatz</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2">{(item as any).use}</td>)}
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Kern-Ø</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2 font-mono">{(item as any).core}</td>)}
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Reichweite</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2 font-mono">{(item as any).distance}</td>)}
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Speed</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2 font-mono">{(item as any).speed}</td>)}
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-1 pr-2 text-slate-500">Stecker</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2">{(item as any).connector}</td>)}
                    </tr>
                    <tr>
                      <td className="py-1 pr-2 text-slate-500">Einsatz</td>
                      {selectedItems.map((item) => <td key={item.name} className="py-1 px-2">{(item as any).use}</td>)}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> {mode === "copper"
            ? "Cat 5e = Minimum für Gigabit. Cat 6a = Standard heute. Max. 100m Segmentlänge!"
            : "Multimode = kurz + günstig (Orange). Singlemode = lang + teuer (Gelb). Glasfaser = keine EMI!"
          }
        </p>
      </div>
    </div>
  );
}
