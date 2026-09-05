"use client";

import { useState, useMemo } from "react";

// ============================================================================
// Memory Hierarchy Explorer — Speicherpyramide + Cache/Paging-Simulator
// ============================================================================

type Tab = "hierarchy" | "cache" | "paging";

interface MemoryLevel {
  name: string;
  size: string;
  accessTime: string;
  costPerGB: string;
  technology: string;
  color: string;
}

const memoryLevels: MemoryLevel[] = [
  { name: "Register", size: "~1 KB", accessTime: "~0.3 ns", costPerGB: "Extrem hoch", technology: "SRAM (flip-flop)", color: "#EF4444" },
  { name: "L1 Cache", size: "~64 KB", accessTime: "~1 ns", costPerGB: "Sehr hoch", technology: "SRAM", color: "#F97316" },
  { name: "L2 Cache", size: "~256 KB–1 MB", accessTime: "~4 ns", costPerGB: "Hoch", technology: "SRAM", color: "#F59E0B" },
  { name: "L3 Cache", size: "~4–32 MB", accessTime: "~10 ns", costPerGB: "Mittel", technology: "SRAM", color: "#EAB308" },
  { name: "RAM", size: "8–64 GB", accessTime: "~100 ns", costPerGB: "Günstig", technology: "DRAM (Kondensator)", color: "#22C55E" },
  { name: "SSD", size: "256 GB–8 TB", accessTime: "~0.1 ms", costPerGB: "Sehr günstig", technology: "NAND-Flash", color: "#3B82F6" },
  { name: "HDD", size: "1–20 TB", accessTime: "~5–10 ms", costPerGB: "Am günstigsten", technology: "Magnetisch", color: "#8B5CF6" },
];

// Cache Simulator
interface CacheLine {
  valid: boolean;
  tag: number;
  data: string;
}

function createEmptyCache(size: number): CacheLine[] {
  return Array.from({ length: size }, () => ({ valid: false, tag: -1, data: "" }));
}

// Paging Simulator
interface PageTableEntry {
  virtualPage: number;
  physicalFrame: number | null;
  inMemory: boolean;
}

function createPageTable(): PageTableEntry[] {
  return [
    { virtualPage: 0, physicalFrame: 3, inMemory: true },
    { virtualPage: 1, physicalFrame: 7, inMemory: true },
    { virtualPage: 2, physicalFrame: null, inMemory: false },
    { virtualPage: 3, physicalFrame: 1, inMemory: true },
    { virtualPage: 4, physicalFrame: null, inMemory: false },
    { virtualPage: 5, physicalFrame: 5, inMemory: true },
    { virtualPage: 6, physicalFrame: null, inMemory: false },
    { virtualPage: 7, physicalFrame: 2, inMemory: true },
  ];
}

export default function MemoryHierarchyExplorer() {
  const [tab, setTab] = useState<Tab>("hierarchy");
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Cache state
  const [cache, setCache] = useState<CacheLine[]>(() => createEmptyCache(4));
  const [cacheInput, setCacheInput] = useState("");
  const [cacheLog, setCacheLog] = useState<string[]>([]);
  const [cacheHits, setCacheHits] = useState(0);
  const [cacheMisses, setCacheMisses] = useState(0);

  // Paging state
  const [pageTable] = useState<PageTableEntry[]>(createPageTable);
  const [pagingInput, setPagingInput] = useState("");
  const [pagingResult, setPagingResult] = useState<string | null>(null);
  const pageSize = 4096; // 4 KB

  const handleCacheAccess = () => {
    const addr = parseInt(cacheInput);
    if (isNaN(addr) || addr < 0) return;

    const cacheIndex = addr % cache.length;
    const tag = Math.floor(addr / cache.length);
    const line = cache[cacheIndex];

    if (line.valid && line.tag === tag) {
      setCacheHits((h) => h + 1);
      setCacheLog((l) => [`Adresse ${addr} → Cache Hit (Line ${cacheIndex})`, ...l].slice(0, 8));
    } else {
      setCacheMisses((m) => m + 1);
      const newCache = [...cache];
      newCache[cacheIndex] = { valid: true, tag, data: `Daten@${addr}` };
      setCache(newCache);
      setCacheLog((l) => [
        `Adresse ${addr} → Cache Miss → in Line ${cacheIndex} geladen`,
        ...l,
      ].slice(0, 8));
    }
    setCacheInput("");
  };

  const handlePagingLookup = () => {
    const vAddr = parseInt(pagingInput);
    if (isNaN(vAddr) || vAddr < 0) {
      setPagingResult("Ungültige Adresse");
      return;
    }

    const virtualPage = Math.floor(vAddr / pageSize);
    const offset = vAddr % pageSize;

    if (virtualPage >= pageTable.length) {
      setPagingResult(`Seite ${virtualPage} existiert nicht (max. Seite ${pageTable.length - 1})`);
      return;
    }

    const entry = pageTable[virtualPage];
    if (!entry.inMemory) {
      setPagingResult(
        `Page Fault! Seite ${virtualPage} ist nicht im RAM. ` +
        `OS muss Seite von Festplatte laden (langsam!). ` +
        `Virtuelle Adresse: ${vAddr} = Seite ${virtualPage} + Offset ${offset}`
      );
    } else {
      const physAddr = entry.physicalFrame! * pageSize + offset;
      setPagingResult(
        `Adresse übersetzt: Virtuell ${vAddr} (Seite ${virtualPage}, Offset ${offset}) → ` +
        `Physisch ${physAddr} (Rahmen ${entry.physicalFrame}, Offset ${offset}). ` +
        `Seite ist im RAM!`
      );
    }
    setPagingInput("");
  };

  const hitRate = useMemo(() => {
    const total = cacheHits + cacheMisses;
    return total === 0 ? 0 : Math.round((cacheHits / total) * 100);
  }, [cacheHits, cacheMisses]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "hierarchy", label: "Hierarchie" },
    { id: "cache", label: "Cache-Simulator" },
    { id: "paging", label: "Paging-Simulator" },
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

      {/* Tab: Hierarchy */}
      {tab === "hierarchy" && (
        <div className="space-y-3">
          <div className="flex flex-col items-center gap-1">
            {memoryLevels.map((level, i) => (
              <button
                key={level.name}
                onClick={() => setSelectedLevel(selectedLevel === i ? null : i)}
                className="transition-all duration-200 text-center rounded-lg border-2"
                style={{
                  width: `${55 + i * 7}%`,
                  backgroundColor: selectedLevel === i ? level.color + "33" : level.color + "15",
                  borderColor: selectedLevel === i ? level.color : "transparent",
                  padding: "8px 4px",
                }}
              >
                <div className="text-sm font-bold" style={{ color: level.color }}>
                  {level.name}
                </div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">
                  {level.size} · {level.accessTime}
                </div>
              </button>
            ))}
          </div>

          {selectedLevel !== null && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-bold text-lg mb-2" style={{ color: memoryLevels[selectedLevel].color }}>
                {memoryLevels[selectedLevel].name}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-gray-500">Größe:</span> {memoryLevels[selectedLevel].size}</div>
                <div><span className="text-gray-500">Zugriff:</span> {memoryLevels[selectedLevel].accessTime}</div>
                <div><span className="text-gray-500">Kosten/GB:</span> {memoryLevels[selectedLevel].costPerGB}</div>
                <div><span className="text-gray-500">Technologie:</span> {memoryLevels[selectedLevel].technology}</div>
              </div>
            </div>
          )}

          <div className="text-xs text-center text-gray-400 mt-2">
            Schnell → langsam · Teuer → günstig · Klein → groß
          </div>
        </div>
      )}

      {/* Tab: Cache Simulator */}
      {tab === "cache" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Simuliere einen <strong>direct-mapped Cache</strong> mit 4 Lines. Gib Speicheradressen ein (0-99).
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              value={cacheInput}
              onChange={(e) => setCacheInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCacheAccess()}
              placeholder="Adresse eingeben (z.B. 42)"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              min="0"
              max="99"
            />
            <button
              onClick={handleCacheAccess}
              className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
            >
              Zugriff
            </button>
          </div>

          {/* Cache state */}
          <div className="grid grid-cols-4 gap-2">
            {cache.map((line, i) => (
              <div
                key={i}
                className={`rounded-lg p-2 text-center border text-xs ${
                  line.valid
                    ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
                    : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="font-semibold text-gray-500">Line {i}</div>
                <div className="font-mono text-[10px] mt-1">
                  {line.valid ? (
                    <>
                      <div>Tag: {line.tag}</div>
                      <div className="text-green-600 dark:text-green-400">Valid</div>
                    </>
                  ) : (
                    <div className="text-gray-400">Empty</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-4 text-sm">
            <div className="bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-lg">
              Hits: <strong>{cacheHits}</strong>
            </div>
            <div className="bg-red-100 dark:bg-red-900/30 px-3 py-1 rounded-lg">
              Misses: <strong>{cacheMisses}</strong>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
              Hit Rate: <strong>{hitRate}%</strong>
            </div>
          </div>

          {/* Log */}
          {cacheLog.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto">
              {cacheLog.map((entry, i) => (
                <div key={i} className="text-xs font-mono text-gray-600 dark:text-gray-400 py-0.5">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Paging Simulator */}
      {tab === "paging" && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Seiten: 8, Seitengröße: 4096 Bytes (4 KB). Gib eine virtuelle Adresse ein (0-32767).
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              value={pagingInput}
              onChange={(e) => setPagingInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePagingLookup()}
              placeholder="Virtuelle Adresse (z.B. 5000)"
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
              min="0"
            />
            <button
              onClick={handlePagingLookup}
              className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
            >
              Übersetzen
            </button>
          </div>

          {/* Page Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-2 py-1.5 text-left border border-gray-200 dark:border-gray-700">Virt. Seite</th>
                  <th className="px-2 py-1.5 text-left border border-gray-200 dark:border-gray-700">Phys. Rahmen</th>
                  <th className="px-2 py-1.5 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {pageTable.map((entry) => (
                  <tr key={entry.virtualPage} className={entry.inMemory ? "" : "bg-red-50 dark:bg-red-900/10"}>
                    <td className="px-2 py-1.5 border border-gray-200 dark:border-gray-700 font-mono">
                      Seite {entry.virtualPage}
                    </td>
                    <td className="px-2 py-1.5 border border-gray-200 dark:border-gray-700 font-mono">
                      {entry.inMemory ? `Rahmen ${entry.physicalFrame}` : "—"}
                    </td>
                    <td className="px-2 py-1.5 border border-gray-200 dark:border-gray-700">
                      {entry.inMemory ? (
                        <span className="text-green-600 dark:text-green-400">Im RAM</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">Auf Platte</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Result */}
          {pagingResult && (
            <div className={`rounded-lg p-3 text-sm ${
              pagingResult.includes("Page Fault")
                ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
                : "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
            }`}>
              {pagingResult}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
