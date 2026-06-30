"use client";

import React from "react";

interface CoordProps {
  width?: number;
  height?: number;
  className?: string;
}

interface Vector2D {
  x: number;
  y: number;
  color?: string;
  label?: string;
}

interface CoordSystem2DProps extends CoordProps {
  vectors?: Vector2D[];
  xRange?: [number, number];
  yRange?: [number, number];
  showGrid?: boolean;
  points?: { x: number; y: number; label?: string; color?: string }[];
}

/* ── 2D-Koordinatensystem ── */
export function CoordinateSystem2D({
  width = 400,
  height = 400,
  className = "",
  vectors = [],
  xRange = [-5, 5],
  yRange = [-5, 5],
  showGrid = true,
  points = [],
}: CoordSystem2DProps) {
  const pad = 40;
  const plotW = width - 2 * pad;
  const plotH = height - 2 * pad;

  const scaleX = (x: number) => pad + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotW;
  const scaleY = (y: number) => pad + plotH - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotH;
  const originX = scaleX(0);
  const originY = scaleY(0);

  const gridLines: JSX.Element[] = [];
  if (showGrid) {
    for (let x = Math.ceil(xRange[0]); x <= Math.floor(xRange[1]); x++) {
      gridLines.push(
        <line key={`gx-${x}`} x1={scaleX(x)} y1={pad} x2={scaleX(x)} y2={pad + plotH}
          stroke="#334155" strokeWidth="0.5" />
      );
      if (x !== 0) {
        gridLines.push(
          <text key={`lx-${x}`} x={scaleX(x)} y={originY + 16} fill="#94a3b8" fontSize="11" textAnchor="middle">{x}</text>
        );
      }
    }
    for (let y = Math.ceil(yRange[0]); y <= Math.floor(yRange[1]); y++) {
      gridLines.push(
        <line key={`gy-${y}`} x1={pad} y1={scaleY(y)} x2={pad + plotW} y2={scaleY(y)}
          stroke="#334155" strokeWidth="0.5" />
      );
      if (y !== 0) {
        gridLines.push(
          <text key={`ly-${y}`} x={originX - 12} y={scaleY(y) + 4} fill="#94a3b8" fontSize="11" textAnchor="end">{y}</text>
        );
      }
    }
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Koordinatensystem">
      {/* Grid */}
      {gridLines}

      {/* Achsen */}
      <line x1={pad} y1={originY} x2={pad + plotW} y2={originY} stroke="#e2e8f0" strokeWidth="2" />
      <line x1={originX} y1={pad} x2={originX} y2={pad + plotH} stroke="#e2e8f0" strokeWidth="2" />

      {/* Pfeile */}
      <polygon points={`${pad + plotW},${originY} ${pad + plotW - 8},${originY - 4} ${pad + plotW - 8},${originY + 4}`} fill="#e2e8f0" />
      <polygon points={`${originX},${pad} ${originX - 4},${pad + 8} ${originX + 4},${pad + 8}`} fill="#e2e8f0" />

      {/* Achsenbeschriftungen */}
      <text x={pad + plotW - 5} y={originY - 10} fill="#e2e8f0" fontSize="14" fontWeight="bold">x</text>
      <text x={originX + 10} y={pad + 12} fill="#e2e8f0" fontSize="14" fontWeight="bold">y</text>

      {/* Ursprung */}
      <text x={originX - 10} y={originY + 16} fill="#94a3b8" fontSize="12">0</text>

      {/* Vektoren */}
      {vectors.map((v, i) => {
        const endX = scaleX(v.x);
        const endY = scaleY(v.y);
        const color = v.color || "#818cf8";
        return (
          <g key={`vec-${i}`}>
            <defs>
              <marker id={`arrow-${i}`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0,0 8,3 0,6" fill={color} />
              </marker>
            </defs>
            {/* Komponenten (gestrichelt) */}
            <line x1={originX} y1={originY} x2={endX} y2={originY} stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <line x1={endX} y1={originY} x2={endX} y2={endY} stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            {/* Vektor-Pfeil */}
            <line x1={originX} y1={originY} x2={endX} y2={endY} stroke={color} strokeWidth="2.5" markerEnd={`url(#arrow-${i})`} />
            {/* Label */}
            {v.label && (
              <text x={(originX + endX) / 2 + 10} y={(originY + endY) / 2 - 8} fill={color} fontSize="14" fontWeight="bold">
                {v.label}
              </text>
            )}
            {/* Komponenten-Beschriftungen */}
            <text x={(originX + endX) / 2} y={originY + 16} fill={color} fontSize="10" textAnchor="middle" opacity="0.7">
              {v.x.toFixed(1)}
            </text>
            <text x={endX + 6} y={(originY + endY) / 2} fill={color} fontSize="10" opacity="0.7">
              {v.y.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Punkte */}
      {points.map((p, i) => (
        <g key={`pt-${i}`}>
          <circle cx={scaleX(p.x)} cy={scaleY(p.y)} r="4" fill={p.color || "#f59e0b"} />
          {p.label && (
            <text x={scaleX(p.x) + 8} y={scaleY(p.y) - 8} fill={p.color || "#f59e0b"} fontSize="12" fontWeight="bold">
              {p.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

/* ── 3D-Koordinatensystem (isometrisch) ── */
interface CoordSystem3DProps extends CoordProps {
  vectors?: { x: number; y: number; z: number; color?: string; label?: string }[];
}

export function CoordinateSystem3D({
  width = 400,
  height = 380,
  className = "",
  vectors = [],
}: CoordSystem3DProps) {
  const ox = width / 2 - 40;
  const oy = height - 50;
  const scale = 45;

  // Isometrische Projektion
  const isoX = (x: number, y: number) => ox + (x - y) * scale * Math.cos(Math.PI / 6);
  const isoY = (x: number, y: number, z: number) => oy - z * scale - (x + y) * scale * Math.sin(Math.PI / 6);

  const axisLen = 4;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="3D-Koordinatensystem">
      {/* Achsen */}
      {/* X-Achse (rot) */}
      <line x1={ox} y1={oy} x2={isoX(axisLen, 0)} y2={isoY(axisLen, 0, 0)} stroke="#ef4444" strokeWidth="2" />
      <polygon
        points={`${isoX(axisLen, 0)},${isoY(axisLen, 0, 0)} ${isoX(axisLen - 0.3, 0.2)},${isoY(axisLen - 0.3, 0.2, 0)} ${isoX(axisLen - 0.3, -0.2)},${isoY(axisLen - 0.3, -0.2, 0)}`}
        fill="#ef4444"
      />
      <text x={isoX(axisLen + 0.3, 0)} y={isoY(axisLen + 0.3, 0, 0) + 4} fill="#ef4444" fontSize="14" fontWeight="bold">x</text>

      {/* Y-Achse (grün) */}
      <line x1={ox} y1={oy} x2={isoX(0, axisLen)} y2={isoY(0, axisLen, 0)} stroke="#22c55e" strokeWidth="2" />
      <polygon
        points={`${isoX(0, axisLen)},${isoY(0, axisLen, 0)} ${isoX(0.2, axisLen - 0.3)},${isoY(0.2, axisLen - 0.3, 0)} ${isoX(-0.2, axisLen - 0.3)},${isoY(-0.2, axisLen - 0.3, 0)}`}
        fill="#22c55e"
      />
      <text x={isoX(0, axisLen + 0.3)} y={isoY(0, axisLen + 0.3, 0) + 4} fill="#22c55e" fontSize="14" fontWeight="bold">y</text>

      {/* Z-Achse (blau) */}
      <line x1={ox} y1={oy} x2={isoX(0, 0)} y2={isoY(0, 0, axisLen)} stroke="#3b82f6" strokeWidth="2" />
      <polygon
        points={`${isoX(0, 0)},${isoY(0, 0, axisLen)} ${isoX(0.15, 0)},${isoY(0.15, 0, axisLen - 0.3)} ${isoX(-0.15, 0)},${isoY(-0.15, 0, axisLen - 0.3)}`}
        fill="#3b82f6"
      />
      <text x={isoX(0, 0) + 8} y={isoY(0, 0, axisLen + 0.2)} fill="#3b82f6" fontSize="14" fontWeight="bold">z</text>

      {/* Ursprung */}
      <circle cx={ox} cy={oy} r="3" fill="#e2e8f0" />
      <text x={ox - 12} y={oy + 14} fill="#94a3b8" fontSize="12">0</text>

      {/* Gitterlinien (optional, subtil) */}
      {[1, 2, 3].map(i => (
        <g key={`grid3d-${i}`} opacity="0.15">
          <line x1={isoX(i, 0)} y1={isoY(i, 0, 0)} x2={isoX(i, axisLen)} y2={isoY(i, axisLen, 0)} stroke="#94a3b8" strokeWidth="0.5" />
          <line x1={isoX(0, i)} y1={isoY(0, i, 0)} x2={isoX(axisLen, i)} y2={isoY(axisLen, i, 0)} stroke="#94a3b8" strokeWidth="0.5" />
        </g>
      ))}

      {/* Vektoren */}
      {vectors.map((v, i) => {
        const endX = isoX(v.x, v.y);
        const endY = isoY(v.x, v.y, v.z);
        const color = v.color || "#f59e0b";
        return (
          <g key={`vec3d-${i}`}>
            <line x1={ox} y1={oy} x2={endX} y2={endY} stroke={color} strokeWidth="2.5" />
            <circle cx={endX} cy={endY} r="4" fill={color} />
            {v.label && (
              <text x={endX + 8} y={endY - 8} fill={color} fontSize="13" fontWeight="bold">{v.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
