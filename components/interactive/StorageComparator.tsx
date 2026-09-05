"use client";

import { useState } from "react";

// ============================================================================
// Storage Comparator — Speichermedien im direkten Vergleich
// ============================================================================

interface StorageMedium {
  name: string;
  type: "Magnetisch" | "Optisch" | "Halbleiter";
  accessTime: string;
  capacity: string;
  costPerGB: string;
  lifetime: string;
  randomAccess: "Ja" | "Eingeschränkt" | "Nein";
  portable: "Ja" | "Bedingt" | "Nein";
  useCase: string;
  scores: { speed: number; capacity: number; cost: number; durability: number; portability: number };
}

const media: StorageMedium[] = [
  {
    name: "HDD",
    type: "Magnetisch",
    accessTime: "5–10 ms",
    capacity: "1–20 TB",
    costPerGB: "~0,02 €",
    lifetime: "3–5 Jahre",
    randomAccess: "Ja",
    portable: "Bedingt",
    useCase: "NAS, Desktop, Archiv",
    scores: { speed: 3, capacity: 9, cost: 9, durability: 5, portability: 4 },
  },
  {
    name: "SSD (SATA)",
    type: "Halbleiter",
    accessTime: "~0,1 ms",
    capacity: "256 GB–4 TB",
    costPerGB: "~0,08 €",
    lifetime: "5–10 Jahre",
    randomAccess: "Ja",
    portable: "Ja",
    useCase: "Desktop, Laptop, OS-Platte",
    scores: { speed: 7, capacity: 6, cost: 6, durability: 8, portability: 7 },
  },
  {
    name: "NVMe SSD",
    type: "Halbleiter",
    accessTime: "~0,02 ms",
    capacity: "256 GB–8 TB",
    costPerGB: "~0,10 €",
    lifetime: "5–10 Jahre",
    randomAccess: "Ja",
    portable: "Nein",
    useCase: "High-Performance, Gaming, Workstation",
    scores: { speed: 10, capacity: 6, cost: 5, durability: 8, portability: 2 },
  },
  {
    name: "USB-Stick",
    type: "Halbleiter",
    accessTime: "~0,1–1 ms",
    capacity: "8–512 GB",
    costPerGB: "~0,15 €",
    lifetime: "5–10 Jahre",
    randomAccess: "Ja",
    portable: "Ja",
    useCase: "Datenübertragung, Boot-Stick",
    scores: { speed: 5, capacity: 3, cost: 5, durability: 7, portability: 10 },
  },
  {
    name: "SD-Karte",
    type: "Halbleiter",
    accessTime: "~0,1–1 ms",
    capacity: "16 GB–1 TB",
    costPerGB: "~0,12 €",
    lifetime: "5–10 Jahre",
    randomAccess: "Ja",
    portable: "Ja",
    useCase: "Kamera, Smartphone, Raspberry Pi",
    scores: { speed: 5, capacity: 3, cost: 5, durability: 6, portability: 10 },
  },
  {
    name: "CD",
    type: "Optisch",
    accessTime: "~100 ms",
    capacity: "700 MB",
    costPerGB: "~0,50 €",
    lifetime: "10–30 Jahre",
    randomAccess: "Ja",
    portable: "Ja",
    useCase: "Musik, alte Software, Backup",
    scores: { speed: 2, capacity: 1, cost: 3, durability: 7, portability: 8 },
  },
  {
    name: "DVD",
    type: "Optisch",
    accessTime: "~80 ms",
    capacity: "4,7 / 8,5 GB",
    costPerGB: "~0,20 €",
    lifetime: "10–30 Jahre",
    randomAccess: "Ja",
    portable: "Ja",
    useCase: "Filme, Backup, Installation",
    scores: { speed: 2, capacity: 2, cost: 4, durability: 7, portability: 8 },
  },
  {
    name: "Blu-ray",
    type: "Optisch",
    accessTime: "~80 ms",
    capacity: "25–128 GB",
    costPerGB: "~0,15 €",
    lifetime: "10–30 Jahre",
    randomAccess: "Ja",
    portable: "Ja",
    useCase: "HD-Filme, große Datenmengen, Archiv",
    scores: { speed: 2, capacity: 4, cost: 4, durability: 8, portability: 8 },
  },
  {
    name: "Band (LTO)",
    type: "Magnetisch",
    accessTime: "~10–60 s",
    capacity: "12–45 TB",
    costPerGB: "~0,005 €",
    lifetime: "30+ Jahre",
    randomAccess: "Nein",
    portable: "Bedingt",
    useCase: "Enterprise-Backup, Langzeitarchiv",
    scores: { speed: 1, capacity: 10, cost: 10, durability: 10, portability: 3 },
  },
];

function RadarChart({ scores, color }: { scores: { speed: number; capacity: number; cost: number; durability: number; portability: number }; color: string }) {
  const labels = ["Speed", "Kapazität", "Kosten", "Haltbarkeit", "Portabilität"];
  const values = [scores.speed, scores.capacity, scores.cost, scores.durability, scores.portability];
  const cx = 100, cy = 100, r = 70;
  const angleStep = (2 * Math.PI) / 5;

  const points = values.map((v, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const x = cx + (v / 10) * r * Math.cos(angle);
    const y = cy + (v / 10) * r * Math.sin(angle);
    return `${x},${y}`;
  });

  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[180px] mx-auto">
      {/* Grid */}
      {gridLevels.map((level) => {
        const pts = labels.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          return `${cx + (level / 10) * r * Math.cos(angle)},${cy + (level / 10) * r * Math.sin(angle)}`;
        });
        return <polygon key={level} points={pts.join(" ")} fill="none" stroke="#E5E7EB" strokeWidth="0.5" />;
      })}

      {/* Axes */}
      {labels.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + r * Math.cos(angle)}
            y2={cy + r * Math.sin(angle)}
            stroke="#D1D5DB"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <polygon points={points.join(" ")} fill={color + "40"} stroke={color} strokeWidth="2" />

      {/* Labels */}
      {labels.map((label, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + (r + 18) * Math.cos(angle);
        const y = cy + (r + 18) * Math.sin(angle);
        return (
          <text key={label} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-gray-500">
            {label}
          </text>
        );
      })}
    </svg>
  );
}

export default function StorageComparator() {
  const [indexA, setIndexA] = useState(0);
  const [indexB, setIndexB] = useState(1);

  const mediumA = media[indexA];
  const mediumB = media[indexB];

  const colorA = "#3B82F6";
  const colorB = "#F59E0B";

  return (
    <div className="space-y-4">
      {/* Selectors */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Medium A</label>
          <select
            value={indexA}
            onChange={(e) => setIndexA(parseInt(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
          >
            {media.map((m, i) => (
              <option key={m.name} value={i}>{m.name} ({m.type})</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Medium B</label>
          <select
            value={indexB}
            onChange={(e) => setIndexB(parseInt(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
          >
            {media.map((m, i) => (
              <option key={m.name} value={i}>{m.name} ({m.type})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 border border-gray-200 dark:border-gray-700">Eigenschaft</th>
              <th className="px-3 py-2 text-center text-xs font-semibold border border-gray-200 dark:border-gray-700" style={{ color: colorA }}>{mediumA.name}</th>
              <th className="px-3 py-2 text-center text-xs font-semibold border border-gray-200 dark:border-gray-700" style={{ color: colorB }}>{mediumB.name}</th>
            </tr>
          </thead>
          <tbody>
            {([
              ["Typ", "type"],
              ["Zugriffszeit", "accessTime"],
              ["Kapazität", "capacity"],
              ["Kosten/GB", "costPerGB"],
              ["Lebensdauer", "lifetime"],
              ["Zufallszugriff", "randomAccess"],
              ["Portabel", "portable"],
              ["Einsatzgebiet", "useCase"],
            ] as [string, keyof StorageMedium][]).map(([label, key]) => (
              <tr key={key} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 dark:border-gray-700">{label}</td>
                <td className="px-3 py-1.5 text-center text-xs border border-gray-200 dark:border-gray-700">{mediumA[key] as string}</td>
                <td className="px-3 py-1.5 text-center text-xs border border-gray-200 dark:border-gray-700">{mediumB[key] as string}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Radar charts */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-xs font-semibold mb-1" style={{ color: colorA }}>{mediumA.name}</div>
          <RadarChart scores={mediumA.scores} color={colorA} />
        </div>
        <div className="text-center">
          <div className="text-xs font-semibold mb-1" style={{ color: colorB }}>{mediumB.name}</div>
          <RadarChart scores={mediumB.scores} color={colorB} />
        </div>
      </div>
    </div>
  );
}
