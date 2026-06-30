"use client";

import React from "react";

interface GraphProps {
  width?: number;
  height?: number;
  className?: string;
}

interface TangentProps {
  x: number;       // Punkt an dem die Tangente liegt
  slope: number;   // Steigung f'(x)
  label?: string;
  color?: string;
}

interface FunctionGraphProps extends GraphProps {
  fn?: (x: number) => number;
  xRange?: [number, number];
  yRange?: [number, number];
  color?: string;
  label?: string;
  showGrid?: boolean;
  tangent?: TangentProps;
  fillArea?: { from: number; to: number; color?: string; label?: string };
  points?: { x: number; y: number; label?: string; color?: string }[];
  secondaryFn?: (x: number) => number;
  secondaryColor?: string;
  secondaryLabel?: string;
}

export function FunctionGraph({
  width = 500,
  height = 350,
  className = "",
  fn = (x: number) => x,
  xRange = [-5, 5],
  yRange = [-5, 5],
  color = "#818cf8",
  label,
  showGrid = true,
  tangent,
  fillArea,
  points = [],
  secondaryFn,
  secondaryColor = "#f472b6",
  secondaryLabel,
}: FunctionGraphProps) {
  const pad = 45;
  const plotW = width - 2 * pad;
  const plotH = height - 2 * pad;

  const scaleX = (x: number) => pad + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const scaleY = (y: number) => pad + plotH - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotH;
  const originX = scaleX(0);
  const originY = scaleY(0);

  // Generate function path
  const generatePath = (func: (x: number) => number) => {
    const steps = Math.max(200, plotW * 2);
    const dx = (xRange[1] - xRange[0]) / steps;
    let pathData = "";
    let started = false;

    for (let i = 0; i <= steps; i++) {
      const x = xRange[0] + i * dx;
      const y = func(x);
      if (!isFinite(y) || Math.abs(y) > 1000) {
        started = false;
        continue;
      }
      const sx = scaleX(x);
      const sy = scaleY(y);
      if (!started) {
        pathData += `M ${sx},${sy}`;
        started = true;
      } else {
        pathData += ` L ${sx},${sy}`;
      }
    }
    return pathData;
  };

  // Generate fill area path
  const generateFillPath = (from: number, to: number) => {
    const steps = 100;
    const dx = (to - from) / steps;
    let pathData = `M ${scaleX(from)},${scaleY(0)}`;

    for (let i = 0; i <= steps; i++) {
      const x = from + i * dx;
      const y = fn(x);
      const sy = isFinite(y) ? scaleY(Math.max(yRange[0], Math.min(yRange[1], y))) : scaleY(0);
      pathData += ` L ${scaleX(x)},${sy}`;
    }
    pathData += ` L ${scaleX(to)},${scaleY(0)} Z`;
    return pathData;
  };

  // Grid
  const gridLines: JSX.Element[] = [];
  if (showGrid) {
    for (let x = Math.ceil(xRange[0]); x <= Math.floor(xRange[1]); x++) {
      gridLines.push(
        <line key={`gx-${x}`} x1={scaleX(x)} y1={pad} x2={scaleX(x)} y2={pad + plotH} stroke="#1e293b" strokeWidth="1" />
      );
      if (x !== 0) {
        gridLines.push(
          <text key={`lx-${x}`} x={scaleX(x)} y={originY + 16} fill="#64748b" fontSize="10" textAnchor="middle">{x}</text>
        );
      }
    }
    for (let y = Math.ceil(yRange[0]); y <= Math.floor(yRange[1]); y++) {
      gridLines.push(
        <line key={`gy-${y}`} x1={pad} y1={scaleY(y)} x2={pad + plotW} y2={scaleY(y)} stroke="#1e293b" strokeWidth="1" />
      );
      if (y !== 0) {
        gridLines.push(
          <text key={`ly-${y}`} x={originX - 10} y={scaleY(y) + 4} fill="#64748b" fontSize="10" textAnchor="end">{y}</text>
        );
      }
    }
  }

  // Tangent line
  let tangentLine: JSX.Element | null = null;
  if (tangent) {
    const tx = scaleX(tangent.x);
    const ty = scaleY(fn(tangent.x));
    const tangentLen = 2;
    const x1t = tangent.x - tangentLen;
    const y1t = fn(tangent.x) + tangent.slope * (-tangentLen);
    const x2t = tangent.x + tangentLen;
    const y2t = fn(tangent.x) + tangent.slope * tangentLen;
    const tColor = tangent.color || "#f59e0b";
    tangentLine = (
      <g>
        <line x1={scaleX(x1t)} y1={scaleY(y1t)} x2={scaleX(x2t)} y2={scaleY(y2t)} stroke={tColor} strokeWidth="2" />
        <circle cx={tx} cy={ty} r="4" fill={tColor} />
        <text x={tx + 10} y={ty - 10} fill={tColor} fontSize="12" fontWeight="bold">
          {tangent.label || `f'(${tangent.x}) = ${tangent.slope}`}
        </text>
      </g>
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Funktionsgraph">
      {/* Grid */}
      {gridLines}

      {/* Achsen */}
      <line x1={pad} y1={originY} x2={pad + plotW} y2={originY} stroke="#475569" strokeWidth="1.5" />
      <line x1={originX} y1={pad} x2={originX} y2={pad + plotH} stroke="#475569" strokeWidth="1.5" />

      {/* Pfeile */}
      <polygon points={`${pad + plotW},${originY} ${pad + plotW - 7},${originY - 3} ${pad + plotW - 7},${originY + 3}`} fill="#475569" />
      <polygon points={`${originX},${pad} ${originX - 3},${pad + 7} ${originX + 3},${pad + 7}`} fill="#475569" />

      {/* Fill area (Integration) */}
      {fillArea && (
        <path d={generateFillPath(fillArea.from, fillArea.to)} fill={fillArea.color || "rgba(129,140,248,0.2)"} />
      )}

      {/* Function curve */}
      <path d={generatePath(fn)} fill="none" stroke={color} strokeWidth="2.5" />

      {/* Secondary function */}
      {secondaryFn && (
        <path d={generatePath(secondaryFn)} fill="none" stroke={secondaryColor} strokeWidth="2" strokeDasharray="6,3" />
      )}

      {/* Tangent */}
      {tangentLine}

      {/* Points */}
      {points.map((p, i) => (
        <g key={`pt-${i}`}>
          <circle cx={scaleX(p.x)} cy={scaleY(p.y)} r="4" fill={p.color || "#f59e0b"} />
          {p.label && (
            <text x={scaleX(p.x) + 8} y={scaleY(p.y) - 8} fill={p.color || "#f59e0b"} fontSize="11" fontWeight="bold">
              {p.label}
            </text>
          )}
        </g>
      ))}

      {/* Legend */}
      {(label || secondaryLabel) && (
        <g transform={`translate(${pad + 8}, ${pad + 16})`}>
          {label && (
            <g>
              <line x1="0" y1="0" x2="20" y2="0" stroke={color} strokeWidth="2.5" />
              <text x="26" y="4" fill="#e2e8f0" fontSize="11">{label}</text>
            </g>
          )}
          {secondaryLabel && (
            <g transform="translate(0, 18)">
              <line x1="0" y1="0" x2="20" y2="0" stroke={secondaryColor} strokeWidth="2" strokeDasharray="6,3" />
              <text x="26" y="4" fill="#e2e8f0" fontSize="11">{secondaryLabel}</text>
            </g>
          )}
        </g>
      )}
    </svg>
  );
}
