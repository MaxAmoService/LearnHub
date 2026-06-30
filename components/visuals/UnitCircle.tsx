"use client";

import React from "react";

interface UnitCircleProps {
  width?: number;
  height?: number;
  className?: string;
  angle?: number; // in radians
  showSinCos?: boolean;
  showValues?: boolean;
}

const IMPORTANT_ANGLES = [
  { deg: 0, rad: 0, sin: "0", cos: "1", label: "0°" },
  { deg: 30, rad: Math.PI / 6, sin: "½", cos: "√3/2", label: "30°" },
  { deg: 45, rad: Math.PI / 4, sin: "√2/2", cos: "√2/2", label: "45°" },
  { deg: 60, rad: Math.PI / 3, sin: "√3/2", cos: "½", label: "60°" },
  { deg: 90, rad: Math.PI / 2, sin: "1", cos: "0", label: "90°" },
  { deg: 120, rad: (2 * Math.PI) / 3, sin: "√3/2", cos: "-½", label: "120°" },
  { deg: 135, rad: (3 * Math.PI) / 4, sin: "√2/2", cos: "-√2/2", label: "135°" },
  { deg: 150, rad: (5 * Math.PI) / 6, sin: "½", cos: "-√3/2", label: "150°" },
  { deg: 180, rad: Math.PI, sin: "0", cos: "-1", label: "180°" },
  { deg: 270, rad: (3 * Math.PI) / 2, sin: "-1", cos: "0", label: "270°" },
  { deg: 360, rad: 2 * Math.PI, sin: "0", cos: "1", label: "360°" },
];

export function UnitCircle({
  width = 400,
  height = 400,
  className = "",
  angle = Math.PI / 4,
  showSinCos = true,
  showValues = true,
}: UnitCircleProps) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 50;

  const px = cx + r * Math.cos(angle);
  const py = cy - r * Math.sin(angle);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Einheitskreis">
      {/* Grid */}
      {[-1, -0.5, 0.5, 1].map(v => (
        <g key={`grid-${v}`}>
          <line x1={cx + v * r} y1={cy - r - 10} x2={cx + v * r} y2={cy + r + 10} stroke="#1e293b" strokeWidth="0.5" />
          <line x1={cx - r - 10} y1={cy + v * r} x2={cx + r + 10} y2={cy + v * r} stroke="#1e293b" strokeWidth="0.5" />
        </g>
      ))}

      {/* Achsen */}
      <line x1={cx - r - 20} y1={cy} x2={cx + r + 20} y2={cy} stroke="#475569" strokeWidth="1.5" />
      <line x1={cx} y1={cy - r - 20} x2={cx} y2={cy + r + 20} stroke="#475569" strokeWidth="1.5" />

      {/* Pfeile */}
      <polygon points={`${cx + r + 20},${cy} ${cx + r + 13},${cy - 3} ${cx + r + 13},${cy + 3}`} fill="#475569" />
      <polygon points={`${cx},${cy - r - 20} ${cx - 3},${cy - r - 13} ${cx + 3},${cy - r - 13}`} fill="#475569" />

      {/* Achsenbeschriftungen */}
      <text x={cx + r + 24} y={cy + 16} fill="#94a3b8" fontSize="13" fontWeight="bold">x</text>
      <text x={cx + 10} y={cy - r - 14} fill="#94a3b8" fontSize="13" fontWeight="bold">y</text>

      {/* Einheitskreis */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#818cf8" strokeWidth="2" />

      {/* Radius 1 Labels */}
      <text x={cx + r / 2 + 5} y={cy - 8} fill="#94a3b8" fontSize="11">1</text>
      <text x={cx - r / 2 - 14} y={cy - 8} fill="#94a3b8" fontSize="11">-1</text>
      <text x={cx + 6} y={cy - r / 2 + 3} fill="#94a3b8" fontSize="11">1</text>
      <text x={cx + 6} y={cy + r / 2 + 14} fill="#94a3b8" fontSize="11">-1</text>

      {/* Winkel-Strahl */}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#f59e0b" strokeWidth="2" />

      {/* Winkel-Arc */}
      {angle > 0.1 && (
        <path
          d={`M ${cx + 25},${cy} A 25 25 0 ${angle > Math.PI ? 1 : 0} 0 ${cx + 25 * Math.cos(angle)},${cy - 25 * Math.sin(angle)}`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
      )}

      {/* Winkel-Beschriftung */}
      {angle > 0.1 && (
        <text
          x={cx + 35 * Math.cos(angle / 2)}
          y={cy - 35 * Math.sin(angle / 2) + 4}
          fill="#f59e0b"
          fontSize="13"
          fontWeight="bold"
          textAnchor="middle"
        >
          α
        </text>
      )}

      {/* Sinus (vertikale Linie) */}
      {showSinCos && (
        <g>
          {/* cos */}
          <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#34d399" strokeWidth="2" />
          <text x={(cx + px) / 2} y={cy + 18} fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
            cos α
          </text>
          {/* sin */}
          <line x1={px} y1={cy} x2={px} y2={py} stroke="#f472b6" strokeWidth="2" />
          <text x={px + 10} y={(cy + py) / 2} fill="#f472b6" fontSize="12" fontWeight="bold">
            sin α
          </text>
          {/* Hypotenuse label */}
          <text x={(cx + px) / 2 - 10} y={(cy + py) / 2 - 8} fill="#f59e0b" fontSize="11">r=1</text>
          {/* Rechter Winkel */}
          <path
            d={`M ${px - 8},${cy} L ${px - 8},${cy - 8} L ${px},${cy - 8}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
          />
        </g>
      )}

      {/* Punkt auf Kreis */}
      <circle cx={px} cy={py} r="5" fill="#f59e0b" />

      {/* Wichtige Werte */}
      {showValues && IMPORTANT_ANGLES.map(a => {
        const ax = cx + r * Math.cos(a.rad);
        const ay = cy - r * Math.sin(a.rad);
        const isHighlighted = Math.abs(angle - a.rad) < 0.05;
        return (
          <g key={a.deg}>
            <circle cx={ax} cy={ay} r={isHighlighted ? 4 : 2} fill={isHighlighted ? "#f59e0b" : "#64748b"} />
            {/* Tick mark */}
            <line
              x1={cx + (r - 5) * Math.cos(a.rad)}
              y1={cy - (r - 5) * Math.sin(a.rad)}
              x2={cx + (r + 5) * Math.cos(a.rad)}
              y2={cy - (r + 5) * Math.sin(a.rad)}
              stroke="#475569"
              strokeWidth="1"
            />
          </g>
        );
      })}

      {/* Wertetabelle */}
      {showValues && (
        <g transform={`translate(8, ${height - 90})`}>
          <text x="0" y="0" fill="#94a3b8" fontSize="10" fontWeight="bold">Winkel</text>
          <text x="60" y="0" fill="#34d399" fontSize="10" fontWeight="bold">cos</text>
          <text x="110" y="0" fill="#f472b6" fontSize="10" fontWeight="bold">sin</text>
          {[0, 30, 45, 60, 90].map((deg, i) => {
            const a = IMPORTANT_ANGLES.find(x => x.deg === deg)!;
            return (
              <g key={deg} transform={`translate(0, ${14 + i * 14})`}>
                <text x="0" y="0" fill="#64748b" fontSize="9">{a.label}</text>
                <text x="60" y="0" fill="#34d399" fontSize="9">{a.cos}</text>
                <text x="110" y="0" fill="#f472b6" fontSize="9">{a.sin}</text>
              </g>
            );
          })}
        </g>
      )}

      {/* Ursprung */}
      <circle cx={cx} cy={cy} r="2" fill="#e2e8f0" />
    </svg>
  );
}
