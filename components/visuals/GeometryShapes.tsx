"use client";

import React from "react";

interface ShapeProps {
  width?: number;
  height?: number;
  className?: string;
}

/* ── Dreieck ── */
export function Triangle({ width = 300, height = 260, className = "" }: ShapeProps) {
  const cx = width / 2;
  const padding = 40;
  const topX = cx;
  const topY = padding;
  const leftX = padding + 10;
  const leftY = height - padding;
  const rightX = width - padding - 10;
  const rightY = height - padding;

  // Mittelpunkte für Beschriftungen
  const midAB_x = (topX + leftX) / 2 - 20;
  const midAB_y = (topY + leftY) / 2;
  const midBC_x = (leftX + rightX) / 2;
  const midBC_y = leftY + 18;
  const midAC_x = (topX + rightX) / 2 + 16;
  const midAC_y = (topY + rightY) / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`${className}`} role="img" aria-label="Dreieck">
      {/* Dreieck */}
      <polygon
        points={`${topX},${topY} ${leftX},${leftY} ${rightX},${rightY}`}
        fill="none"
        stroke="#818cf8"
        strokeWidth="2"
      />
      {/* Höhe */}
      <line x1={topX} y1={topY} x2={topX} y2={leftY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={topX + 6} y={(topY + leftY) / 2} fill="#f59e0b" fontSize="13" fontWeight="bold">h</text>

      {/* Winkel-Arcs */}
      {/* α oben */}
      <path d={`M ${topX},${topY + 25} A 25 25 0 0 0 ${topX - 18},${topY + 10}`} fill="none" stroke="#f472b6" strokeWidth="1.5" />
      <text x={topX - 28} y={topY + 20} fill="#f472b6" fontSize="14" fontWeight="bold">α</text>
      {/* β links */}
      <path d={`M ${leftX + 25},${leftY} A 25 25 0 0 0 ${leftX + 10},${leftY - 18}`} fill="none" stroke="#34d399" strokeWidth="1.5" />
      <text x={leftX + 18} y={leftY - 8} fill="#34d399" fontSize="14" fontWeight="bold">β</text>
      {/* γ rechts */}
      <path d={`M ${rightX - 25},${rightY} A 25 25 0 0 1 ${rightX - 10},${rightY - 18}`} fill="none" stroke="#fb923c" strokeWidth="1.5" />
      <text x={rightX - 38} y={rightY - 8} fill="#fb923c" fontSize="14" fontWeight="bold">γ</text>

      {/* Seiten-Beschriftungen */}
      <text x={midAB_x} y={midAB_y} fill="#e2e8f0" fontSize="14" fontWeight="bold">c</text>
      <text x={midBC_x} y={midBC_y} fill="#e2e8f0" fontSize="14" fontWeight="bold" textAnchor="middle">a</text>
      <text x={midAC_x} y={midAC_y} fill="#e2e8f0" fontSize="14" fontWeight="bold">b</text>

      {/* Eckpunkte */}
      <circle cx={topX} cy={topY} r="3" fill="#818cf8" />
      <circle cx={leftX} cy={leftY} r="3" fill="#818cf8" />
      <circle cx={rightX} cy={rightY} r="3" fill="#818cf8" />
    </svg>
  );
}

/* ── Kreis ── */
export function Circle({ width = 260, height = 260, className = "" }: ShapeProps) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 40;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Kreis">
      {/* Kreis */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#818cf8" strokeWidth="2" />
      {/* Radius */}
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#f59e0b" strokeWidth="2" />
      <text x={cx + r / 2} y={cy - 8} fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">r</text>
      {/* Durchmesser */}
      <line x1={cx - r} y1={cy + 30} x2={cx + r} y2={cy + 30} stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={cx} y={cy + 48} fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">d = 2r</text>
      {/* Mittelpunkt */}
      <circle cx={cx} cy={cy} r="3" fill="#34d399" />
      <text x={cx + 8} y={cy + 4} fill="#34d399" fontSize="12">M</text>
      {/* Formeln */}
      <text x={cx} y={height - 8} fill="#94a3b8" fontSize="12" textAnchor="middle">
        A = πr²  |  U = 2πr
      </text>
    </svg>
  );
}

/* ── Rechteck ── */
export function Rectangle({ width = 300, height = 200, className = "" }: ShapeProps) {
  const pad = 40;
  const rw = width - 2 * pad;
  const rh = height - 2 * pad;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Rechteck">
      <rect x={pad} y={pad} width={rw} height={rh} fill="none" stroke="#818cf8" strokeWidth="2" />
      {/* Rechte Winkel */}
      <path d={`M ${pad + 15},${pad} L ${pad + 15},${pad + 15} L ${pad},${pad + 15}`} fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d={`M ${pad + rw - 15},${pad} L ${pad + rw - 15},${pad + 15} L ${pad + rw},${pad + 15}`} fill="none" stroke="#94a3b8" strokeWidth="1" />
      {/* Beschriftungen */}
      <text x={pad + rw / 2} y={pad - 10} fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">a</text>
      <text x={pad + rw + 14} y={pad + rh / 2 + 5} fill="#f472b6" fontSize="14" fontWeight="bold">b</text>
      {/* Formeln */}
      <text x={width / 2} y={height - 8} fill="#94a3b8" fontSize="12" textAnchor="middle">
        A = a · b  |  U = 2(a + b)
      </text>
    </svg>
  );
}

/* ── Quadrat ── */
export function Square({ width = 220, height = 220, className = "" }: ShapeProps) {
  const pad = 40;
  const s = Math.min(width, height) - 2 * pad;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Quadrat">
      <rect x={pad} y={pad} width={s} height={s} fill="none" stroke="#818cf8" strokeWidth="2" />
      <path d={`M ${pad + 15},${pad} L ${pad + 15},${pad + 15} L ${pad},${pad + 15}`} fill="none" stroke="#94a3b8" strokeWidth="1" />
      <text x={pad + s / 2} y={pad - 10} fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">a</text>
      <text x={pad + s + 14} y={pad + s / 2 + 5} fill="#f59e0b" fontSize="14" fontWeight="bold">a</text>
      <text x={width / 2} y={height - 8} fill="#94a3b8" fontSize="12" textAnchor="middle">
        A = a²  |  U = 4a
      </text>
    </svg>
  );
}

/* ── Trapez ── */
export function Trapezoid({ width = 300, height = 220, className = "" }: ShapeProps) {
  const pad = 30;
  const topW = width * 0.4;
  const botW = width * 0.7;
  const topX = (width - topW) / 2;
  const botX = (width - botW) / 2;
  const topY = pad;
  const botY = height - pad;

  const points = `${topX},${topY} ${topX + topW},${topY} ${botX + botW},${botY} ${botX},${botY}`;
  const midA_x = (topX + botX) / 2 - 20;
  const midA_y = (topY + botY) / 2;
  const midB_x = (topX + topW + botX + botW) / 2 + 20;
  const midB_y = (topY + botY) / 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Trapez">
      <polygon points={points} fill="none" stroke="#818cf8" strokeWidth="2" />
      {/* Höhe */}
      <line x1={topX + topW / 2} y1={topY} x2={topX + topW / 2} y2={botY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={topX + topW / 2 + 8} y={(topY + botY) / 2} fill="#f59e0b" fontSize="13" fontWeight="bold">h</text>
      {/* Seiten */}
      <text x={width / 2} y={topY - 8} fill="#f472b6" fontSize="14" fontWeight="bold" textAnchor="middle">a</text>
      <text x={width / 2} y={botY + 20} fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">b</text>
      <text x={midA_x} y={midA_y} fill="#e2e8f0" fontSize="13">c</text>
      <text x={midB_x} y={midB_y} fill="#e2e8f0" fontSize="13">d</text>
      <text x={width / 2} y={height - 4} fill="#94a3b8" fontSize="12" textAnchor="middle">
        A = ½(a + b) · h
      </text>
    </svg>
  );
}

/* ── Parallelogramm ── */
export function Parallelogram({ width = 300, height = 200, className = "" }: ShapeProps) {
  const pad = 30;
  const offset = 50;
  const points = `${pad + offset},${pad} ${width - pad},${pad} ${width - pad - offset},${height - pad} ${pad},${height - pad}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Parallelogramm">
      <polygon points={points} fill="none" stroke="#818cf8" strokeWidth="2" />
      {/* Höhe */}
      <line x1={width - pad} y1={pad} x2={width - pad} y2={height - pad} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={width - pad + 8} y={(pad + height - pad) / 2} fill="#f59e0b" fontSize="13" fontWeight="bold">h</text>
      {/* Seiten */}
      <text x={(pad + offset + width - pad) / 2} y={pad - 8} fill="#f472b6" fontSize="14" fontWeight="bold" textAnchor="middle">a</text>
      <text x={pad - 8} y={(pad + height - pad) / 2 + 5} fill="#34d399" fontSize="14" fontWeight="bold">b</text>
      <text x={width / 2} y={height - 4} fill="#94a3b8" fontSize="12" textAnchor="middle">
        A = a · h  |  U = 2(a + b)
      </text>
    </svg>
  );
}

/* ── Würfel (3D-ähnlich) ── */
export function Cube({ width = 260, height = 260, className = "" }: ShapeProps) {
  const s = 100;
  const ox = 30; // 3D-Versatz
  const oy = -30;
  const bx = (width - s - ox) / 2;
  const by = height / 2 + 20;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Würfel">
      {/* Vorne */}
      <rect x={bx} y={by} width={s} height={s} fill="rgba(129,140,248,0.1)" stroke="#818cf8" strokeWidth="2" />
      {/* Oben */}
      <polygon points={`${bx},${by} ${bx + ox},${by + oy} ${bx + s + ox},${by + oy} ${bx + s},${by}`} fill="rgba(129,140,248,0.15)" stroke="#818cf8" strokeWidth="1.5" />
      {/* Seite */}
      <polygon points={`${bx + s},${by} ${bx + s + ox},${by + oy} ${bx + s + ox},${by + s + oy} ${bx + s},${by + s}`} fill="rgba(129,140,248,0.08)" stroke="#818cf8" strokeWidth="1.5" />
      {/* Beschriftung */}
      <text x={bx + s / 2} y={by + s + 20} fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">a</text>
      <text x={width / 2} y={height - 8} fill="#94a3b8" fontSize="12" textAnchor="middle">
        V = a³  |  O = 6a²
      </text>
    </svg>
  );
}

/* ── Quader (3D-ähnlich) ── */
export function Cuboid({ width = 300, height = 240, className = "" }: ShapeProps) {
  const w = 120;
  const h = 80;
  const d = 40;
  const ox = 25;
  const oy = -20;
  const bx = (width - w - ox) / 2;
  const by = height / 2 + 10;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Quader">
      <rect x={bx} y={by} width={w} height={h} fill="rgba(129,140,248,0.1)" stroke="#818cf8" strokeWidth="2" />
      <polygon points={`${bx},${by} ${bx + ox},${by + oy} ${bx + w + ox},${by + oy} ${bx + w},${by}`} fill="rgba(129,140,248,0.15)" stroke="#818cf8" strokeWidth="1.5" />
      <polygon points={`${bx + w},${by} ${bx + w + ox},${by + oy} ${bx + w + ox},${by + h + oy} ${bx + w},${by + h}`} fill="rgba(129,140,248,0.08)" stroke="#818cf8" strokeWidth="1.5" />
      <text x={bx + w / 2} y={by + h + 18} fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">a</text>
      <text x={bx + w + ox + 14} y={by + (h + oy) / 2 + 5} fill="#f472b6" fontSize="13" fontWeight="bold">b</text>
      <text x={bx - 10} y={by - 5} fill="#34d399" fontSize="13" fontWeight="bold">c</text>
      <text x={width / 2} y={height - 4} fill="#94a3b8" fontSize="12" textAnchor="middle">
        V = a·b·c  |  O = 2(ab + ac + bc)
      </text>
    </svg>
  );
}

/* ── Kugel ── */
export function Sphere({ width = 240, height = 240, className = "" }: ShapeProps) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 35;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Kugel">
      <circle cx={cx} cy={cy} r={r} fill="rgba(129,140,248,0.1)" stroke="#818cf8" strokeWidth="2" />
      {/* Ellipsen für 3D-Effekt */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.3} fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,4" />
      <ellipse cx={cx} cy={cy} rx={r * 0.3} ry={r} fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="4,4" />
      {/* Radius */}
      <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#f59e0b" strokeWidth="2" />
      <text x={cx + r / 2} y={cy - 8} fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">r</text>
      <circle cx={cx} cy={cy} r="3" fill="#34d399" />
      <text x={cx + 8} y={cy + 4} fill="#34d399" fontSize="12">M</text>
      <text x={cx} y={height - 6} fill="#94a3b8" fontSize="12" textAnchor="middle">
        V = 4/3·πr³  |  O = 4πr²
      </text>
    </svg>
  );
}

/* ── Zylinder ── */
export function Cylinder({ width = 220, height = 280, className = "" }: ShapeProps) {
  const cx = width / 2;
  const r = 55;
  const topY = 50;
  const botY = height - 50;
  const bodyH = botY - topY;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Zylinder">
      {/* Körper */}
      <line x1={cx - r} y1={topY} x2={cx - r} y2={botY} stroke="#818cf8" strokeWidth="2" />
      <line x1={cx + r} y1={topY} x2={cx + r} y2={botY} stroke="#818cf8" strokeWidth="2" />
      {/* Obere Ellipse */}
      <ellipse cx={cx} cy={topY} rx={r} ry={18} fill="rgba(129,140,248,0.1)" stroke="#818cf8" strokeWidth="2" />
      {/* Untere Ellipse */}
      <ellipse cx={cx} cy={botY} rx={r} ry={18} fill="rgba(129,140,248,0.08)" stroke="#818cf8" strokeWidth="2" />
      {/* Radius */}
      <line x1={cx} y1={topY} x2={cx + r} y2={topY} stroke="#f59e0b" strokeWidth="1.5" />
      <text x={cx + r / 2} y={topY - 12} fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">r</text>
      {/* Höhe */}
      <line x1={cx - r - 15} y1={topY} x2={cx - r - 15} y2={botY} stroke="#f472b6" strokeWidth="1.5" />
      <text x={cx - r - 28} y={(topY + botY) / 2 + 5} fill="#f472b6" fontSize="13" fontWeight="bold">h</text>
      <text x={cx} y={height - 8} fill="#94a3b8" fontSize="11" textAnchor="middle">
        V = πr²h  |  O = 2πr(r+h)
      </text>
    </svg>
  );
}

/* ── Kegel ── */
export function Cone({ width = 240, height = 280, className = "" }: ShapeProps) {
  const cx = width / 2;
  const r = 65;
  const topY = 35;
  const botY = height - 50;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Kegel">
      {/* Körper */}
      <line x1={cx} y1={topY} x2={cx - r} y2={botY} stroke="#818cf8" strokeWidth="2" />
      <line x1={cx} y1={topY} x2={cx + r} y2={botY} stroke="#818cf8" strokeWidth="2" />
      {/* Basis */}
      <ellipse cx={cx} cy={botY} rx={r} ry={18} fill="rgba(129,140,248,0.08)" stroke="#818cf8" strokeWidth="2" />
      {/* Höhe */}
      <line x1={cx} y1={topY} x2={cx} y2={botY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={cx + 8} y={(topY + botY) / 2} fill="#f59e0b" fontSize="13" fontWeight="bold">h</text>
      {/* Radius */}
      <line x1={cx} y1={botY} x2={cx + r} y2={botY} stroke="#f472b6" strokeWidth="1.5" />
      <text x={cx + r / 2} y={botY + 30} fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">r</text>
      {/* Spitze */}
      <circle cx={cx} cy={topY} r="3" fill="#34d399" />
      <text x={cx} y={height - 8} fill="#94a3b8" fontSize="11" textAnchor="middle">
        V = 1/3·πr²h  |  O = πr(r+l)
      </text>
    </svg>
  );
}

/* ── Pyramide ── */
export function Pyramid({ width = 280, height = 260, className = "" }: ShapeProps) {
  const cx = width / 2;
  const topY = 25;
  const botY = height - 35;
  const hw = 90; // half width of base

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Pyramide">
      {/* Vorderkanten */}
      <line x1={cx} y1={topY} x2={cx - hw} y2={botY} stroke="#818cf8" strokeWidth="2" />
      <line x1={cx} y1={topY} x2={cx + hw} y2={botY} stroke="#818cf8" strokeWidth="2" />
      {/* Basis */}
      <line x1={cx - hw} y1={botY} x2={cx + hw} y2={botY} stroke="#818cf8" strokeWidth="2" />
      {/* Hintere Kanten (gestrichelt) */}
      <line x1={cx} y1={topY} x2={cx + hw - 20} y2={botY - 15} stroke="#818cf8" strokeWidth="1" strokeDasharray="4,4" />
      <line x1={cx - hw} y1={botY} x2={cx + hw - 20} y2={botY - 15} stroke="#818cf8" strokeWidth="1" strokeDasharray="4,4" />
      <line x1={cx + hw} y1={botY} x2={cx + hw - 20} y2={botY - 15} stroke="#818cf8" strokeWidth="1" strokeDasharray="4,4" />
      {/* Höhe */}
      <line x1={cx} y1={topY} x2={cx} y2={botY} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
      <text x={cx + 8} y={(topY + botY) / 2} fill="#f59e0b" fontSize="13" fontWeight="bold">h</text>
      {/* Spitze */}
      <circle cx={cx} cy={topY} r="3" fill="#34d399" />
      <text x={cx} y={height - 6} fill="#94a3b8" fontSize="11" textAnchor="middle">
        V = 1/3·G·h
      </text>
    </svg>
  );
}
