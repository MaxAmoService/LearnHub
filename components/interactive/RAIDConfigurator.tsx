"use client";

import { useState } from "react";

// ============================================================================
// RAID Configurator — RAID 0/1/5/6/10 interaktiv konfigurieren
// ============================================================================

type RAIDLevel = 0 | 1 | 5 | 6 | 10;

interface RAIDConfig {
  level: RAIDLevel;
  name: string;
  description: string;
  minDisks: number;
  getDataDisks: (n: number) => number;
  getParityDisks: (n: number) => number;
  faultTolerance: (n: number) => number;
  readMultiplier: string;
  writeMultiplier: string;
  color: string;
}

const raidConfigs: RAIDConfig[] = [
  {
    level: 0,
    name: "RAID 0",
    description: "Striping — Daten werden gleichmäßig auf alle Platten verteilt.",
    minDisks: 2,
    getDataDisks: (n) => n,
    getParityDisks: () => 0,
    faultTolerance: () => 0,
    readMultiplier: "n×",
    writeMultiplier: "n×",
    color: "#EF4444",
  },
  {
    level: 1,
    name: "RAID 1",
    description: "Mirroring — Jede Platte hat eine exakte Kopie.",
    minDisks: 2,
    getDataDisks: (n) => Math.floor(n / 2),
    getParityDisks: () => 0,
    faultTolerance: (n) => Math.floor(n / 2),
    readMultiplier: "n×",
    writeMultiplier: "1×",
    color: "#3B82F6",
  },
  {
    level: 5,
    name: "RAID 5",
    description: "Striping + verteilte Parität — Guter Kompromiss aus Leistung und Sicherheit.",
    minDisks: 3,
    getDataDisks: (n) => n - 1,
    getParityDisks: () => 1,
    faultTolerance: () => 1,
    readMultiplier: "(n-1)×",
    writeMultiplier: "½×",
    color: "#F59E0B",
  },
  {
    level: 6,
    name: "RAID 6",
    description: "Doppelte Parität — Höhere Ausfallsicherheit als RAID 5.",
    minDisks: 4,
    getDataDisks: (n) => n - 2,
    getParityDisks: () => 2,
    faultTolerance: () => 2,
    readMultiplier: "(n-2)×",
    writeMultiplier: "⅓×",
    color: "#8B5CF6",
  },
  {
    level: 10,
    name: "RAID 10",
    description: "Mirror + Stripe — Kombination aus RAID 1 und RAID 0.",
    minDisks: 4,
    getDataDisks: (n) => Math.floor(n / 2),
    getParityDisks: () => 0,
    faultTolerance: (n) => Math.floor(n / 4) + 1,
    readMultiplier: "n×",
    writeMultiplier: "n/2×",
    color: "#10B981",
  },
];

const diskSizeGB = 1000; // 1 TB per disk for calculation

function getBlockLabel(stripe: number, disk: number, diskCount: number, level: RAIDLevel): string {
  switch (level) {
    case 0: {
      // RAID 0: pure striping, all data
      const blockNum = stripe * diskCount + disk + 1;
      return `A${blockNum}`;
    }
    case 1: {
      // RAID 1: mirrored pairs
      const pair = Math.floor(disk / 2);
      const isEven = disk % 2 === 0;
      return isEven ? `A${stripe * (diskCount / 2) + pair + 1}` : `M${stripe * (diskCount / 2) + pair + 1}`;
    }
    case 5: {
      // RAID 5: distributed parity, parity rotates per stripe
      const parityDisk = (diskCount - 1 - stripe % diskCount) % diskCount;
      if (disk === parityDisk) return `P${stripe + 1}`;
      const dataIdx = disk < parityDisk ? disk : disk - 1;
      return `A${stripe * (diskCount - 1) + dataIdx + 1}`;
    }
    case 6: {
      // RAID 6: dual distributed parity
      const p1 = (diskCount - 1 - stripe % diskCount) % diskCount;
      const p2 = (diskCount - 2 - stripe % diskCount) % diskCount;
      if (disk === p1 || disk === p2) return `P${stripe + 1}`;
      const dataIdx6 = disk - (disk > p1 ? 1 : 0) - (disk > p2 ? 1 : 0);
      return `A${stripe * (diskCount - 2) + dataIdx6 + 1}`;
    }
    case 10: {
      // RAID 10: mirror + stripe
      const mirrorPair = Math.floor(disk / 2);
      const isPrimary = disk % 2 === 0;
      return isPrimary ? `A${stripe * (diskCount / 2) + mirrorPair + 1}` : `M${stripe * (diskCount / 2) + mirrorPair + 1}`;
    }
    default:
      return `A${stripe * diskCount + disk + 1}`;
  }
}

export default function RAIDConfigurator() {
  const [diskCount, setDiskCount] = useState(4);
  const [selectedRAID, setSelectedRAID] = useState<RAIDLevel>(5);
  const [failedDisk, setFailedDisk] = useState<number | null>(null);

  const config = raidConfigs.find((r) => r.level === selectedRAID)!;
  const dataDisks = config.getDataDisks(diskCount);
  const parityDisks = config.getParityDisks(diskCount);
  const usableCapacity = dataDisks * diskSizeGB;
  const totalCapacity = diskCount * diskSizeGB;
  const faultTolerance = config.faultTolerance(diskCount);
  const isValidConfig = diskCount >= config.minDisks;

  const getDiskType = (index: number): "data" | "parity" | "mirror" => {
    if (selectedRAID === 0) return "data";
    if (selectedRAID === 1) return index % 2 === 0 ? "data" : "mirror";
    if (selectedRAID === 5) return index < dataDisks ? "data" : "parity";
    if (selectedRAID === 6) return index < dataDisks ? "data" : "parity";
    if (selectedRAID === 10) {
      const pairIndex = Math.floor(index / 2);
      return index % 2 === 0 ? "data" : "mirror";
    }
    return "data";
  };

  const getDiskLabel = (index: number): string => {
    const type = getDiskType(index);
    if (type === "parity") return "P";
    if (type === "mirror") return "M";
    return `D${index + 1}`;
  };

  const getDiskColor = (index: number): string => {
    if (failedDisk === index) return "#DC2626";
    const type = getDiskType(index);
    if (type === "parity") return "#F59E0B";
    if (type === "mirror") return "#3B82F6";
    return "#22C55E";
  };

  const isDataLost = (): boolean => {
    if (failedDisk === null) return false;
    if (selectedRAID === 0) return true;
    if (selectedRAID === 1) return failedDisk !== null && getDiskType(failedDisk) === "data" && failedDisk + 1 < diskCount && getDiskType(failedDisk + 1) === "mirror" ? false : false;
    return false;
  };

  return (
    <div className="space-y-4">
      {/* RAID Level selector */}
      <div className="flex flex-wrap gap-2">
        {raidConfigs.map((r) => (
          <button
            key={r.level}
            onClick={() => {
              setSelectedRAID(r.level);
              setFailedDisk(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border-2 ${
              selectedRAID === r.level
                ? "text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-transparent hover:border-gray-300"
            }`}
            style={selectedRAID === r.level ? { backgroundColor: r.color, borderColor: r.color } : {}}
          >
            {r.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">{config.description}</p>

      {/* Disk count slider */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Anzahl Festplatten: <span className="font-bold text-amber-600">{diskCount}</span>
        </label>
        <input
          type="range"
          min={2}
          max={8}
          value={diskCount}
          onChange={(e) => {
            setDiskCount(parseInt(e.target.value));
            setFailedDisk(null);
          }}
          className="w-full mt-1 accent-amber-500"
        />
        {!isValidConfig && (
          <p className="text-xs text-red-500 mt-1">
            {config.name} benötigt mindestens {config.minDisks} Festplatten!
          </p>
        )}
      </div>

      {/* Disk visualization */}
      {isValidConfig && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from({ length: diskCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setFailedDisk(failedDisk === i ? null : i)}
                className="relative w-16 h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all hover:scale-105"
                style={{
                  borderColor: getDiskColor(i),
                  backgroundColor: getDiskColor(i) + "20",
                }}
              >
                <div className="text-lg font-bold" style={{ color: getDiskColor(i) }}>
                  {i + 1}
                </div>
                <div className="text-[10px] font-semibold" style={{ color: getDiskColor(i) }}>
                  {getDiskLabel(i)}
                </div>
                {failedDisk === i && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-lg">
                    <span className="text-red-600 font-bold text-xs">DEFEKT</span>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-3 text-[10px]">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500" /> Daten
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber-500" /> Parität
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500" /> Mirror
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-red-500" /> Defekt
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      {isValidConfig && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
            <div className="text-[10px] text-green-600 dark:text-green-400">Nutzbare Kapazität</div>
            <div className="text-lg font-bold text-green-700 dark:text-green-300">
              {usableCapacity >= 1000 ? `${(usableCapacity / 1000).toFixed(1)} TB` : `${usableCapacity} GB`}
            </div>
            <div className="text-[10px] text-gray-500">
              {dataDisks} von {diskCount} Platten
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
            <div className="text-[10px] text-blue-600 dark:text-blue-400">Lesegeschwindigkeit</div>
            <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{config.readMultiplier}</div>
            <div className="text-[10px] text-gray-500">Parallel</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
            <div className="text-[10px] text-purple-600 dark:text-purple-400">Schreibgeschwindigkeit</div>
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{config.writeMultiplier}</div>
            <div className="text-[10px] text-gray-500">Overhead</div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
            <div className="text-[10px] text-amber-600 dark:text-amber-400">Ausfallsicherheit</div>
            <div className="text-lg font-bold text-amber-700 dark:text-amber-300">{faultTolerance} Platte(n)</div>
            <div className="text-[10px] text-gray-500">Dürfen ausfallen</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="text-[10px] text-gray-500">Redundanz</div>
            <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
              {parityDisks > 0 ? `${parityDisks} Parität` : selectedRAID === 1 ? "Mirror" : "Keine"}
            </div>
            <div className="text-[10px] text-gray-500">
              {parityDisks > 0 ? `${parityDisks} Platten` : selectedRAID === 1 ? "Volle Kopie" : "Kein Schutz"}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="text-[10px] text-gray-500">Effizienz</div>
            <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
              {Math.round((dataDisks / diskCount) * 100)}%
            </div>
            <div className="text-[10px] text-gray-500">Nutzbar</div>
          </div>
        </div>
      )}

      {/* Failure simulation hint */}
      {isValidConfig && (
        <p className="text-xs text-center text-gray-400">
          Klicke auf eine Festplatte, um einen Ausfall zu simulieren.
        </p>
      )}

      {/* Block-Ansicht (Lehrbuch-Darstellung) */}
      {isValidConfig && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            📦 Block-Ansicht — Datenverteilung
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th className="px-2 py-1.5 text-left font-semibold text-gray-500 border-b border-gray-300 dark:border-gray-600">
                    Streifen (Stripe)
                  </th>
                  {Array.from({ length: diskCount }, (_, i) => (
                    <th key={i} className="px-2 py-1.5 text-center font-semibold border-b border-gray-300 dark:border-gray-600" style={{ color: getDiskColor(i) }}>
                      Platte {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: Math.max(3, Math.ceil(8 / dataDisks)) }, (_, stripe) => (
                  <tr key={stripe} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="px-2 py-1.5 text-gray-500 font-mono">S{stripe + 1}</td>
                    {Array.from({ length: diskCount }, (_, disk) => {
                      const blockLabel = getBlockLabel(stripe, disk, diskCount, selectedRAID);
                      const isParity = blockLabel.startsWith("P");
                      const isMirror = blockLabel.startsWith("M");
                      return (
                        <td
                          key={disk}
                          className={`px-2 py-1.5 text-center font-mono font-bold rounded-sm ${
                            isParity
                              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
                              : isMirror
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              : "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                          }`}
                        >
                          {blockLabel}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            A = Datenblock, P = Parität, M = Mirror — Blöcke werden zeilenweise über die Platten verteilt (Striping).
          </p>
        </div>
      )}
    </div>
  );
}
