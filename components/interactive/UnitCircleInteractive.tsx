"use client";

import { useState, useRef, useCallback } from "react";

interface UnitCircleInteractiveProps {
  className?: string;
}

/**
 * Interaktiver Einheitskreis — Winkel per Drag, sin/cos/tan live
 */
export function UnitCircleInteractive({ className = "" }: UnitCircleInteractiveProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [angle, setAngle] = useState(Math.PI / 4);
  const [isDragging, setIsDragging] = useState(false);

  const W = 420, H = 420;
  const cx = W / 2, cy = H / 2;
  const r = 150;

  const px = cx + r * Math.cos(angle);
  const py = cy - r * Math.sin(angle);

  const cosVal = Math.cos(angle);
  const sinVal = Math.sin(angle);
  const tanVal = Math.abs(cosVal) < 0.001 ? NaN : Math.sin(angle) / Math.cos(angle);
  const deg = ((angle * 180) / Math.PI) % 360;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * W;
    const svgY = ((e.clientY - rect.top) / rect.height) * H;
    const dx = svgX - cx;
    const dy = -(svgY - cy);
    const newAngle = Math.atan2(dy, dx);
    setAngle(newAngle < 0 ? newAngle + 2 * Math.PI : newAngle);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  // Sinus-Kurve (rechts daneben)
  const sinCurveW = 120;
  const sinCurveX = W + 10;
  const sinPoints: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const a = (i / 100) * 2 * Math.PI;
    const sx = sinCurveX + (a / (2 * Math.PI)) * sinCurveW;
    const sy = cy - r * Math.sin(a);
    sinPoints.push(`${sx},${sy}`);
  }

  // Kosinus-Kurve (oben daneben)
  const cosCurveH = 120;
  const cosCurveY = -10;
  const cosPoints: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const a = (i / 100) * 2 * Math.PI;
    const sx = cx + r * Math.cos(a);
    const sy = cosCurveY + (a / (2 * Math.PI)) * cosCurveH;
    cosPoints.push(`${sx},${sy}`);
  }

  // Wichtige Winkel
  const importantAngles = [
    { deg: 0, rad: 0, label: "0°" },
    { deg: 30, rad: Math.PI / 6, label: "30°" },
    { deg: 45, rad: Math.PI / 4, label: "45°" },
    { deg: 60, rad: Math.PI / 3, label: "60°" },
    { deg: 90, rad: Math.PI / 2, label: "90°" },
    { deg: 120, rad: (2 * Math.PI) / 3, label: "120°" },
    { deg: 135, rad: (3 * Math.PI) / 4, label: "135°" },
    { deg: 150, rad: (5 * Math.PI) / 6, label: "150°" },
    { deg: 180, rad: Math.PI, label: "180°" },
    { deg: 270, rad: (3 * Math.PI) / 2, label: "270°" },
    { deg: 360, rad: 2 * Math.PI, label: "360°" },
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center">
        <span className="text-xl font-bold text-pink-400">🔄 Einheitskreis — Interaktiv</span>
        <p className="text-sm text-slate-400 mt-1">Ziehe den Punkt auf dem Kreis</p>
      </div>

      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50 flex justify-center">
        <svg
          ref={svgRef}
          viewBox={`-20 -20 ${W + 20} ${H + 20}`}
          className="w-full max-w-md cursor-grab active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Achsen */}
          <line x1={cx - r - 20} y1={cy} x2={cx + r + 20} y2={cy} stroke="#475569" strokeWidth="1.5" />
          <line x1={cx} y1={cy - r - 20} x2={cx} y2={cy + r + 20} stroke="#475569" strokeWidth="1.5" />

          {/* Einheitskreis */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#818cf8" strokeWidth="2" />

          {/* Radius-Labels */}
          <text x={cx + r / 2} y={cy - 8} fill="#64748b" fontSize="11">1</text>
          <text x={cx - r / 2 - 12} y={cy - 8} fill="#64748b" fontSize="11">-1</text>
          <text x={cx + 6} y={cy - r / 2} fill="#64748b" fontSize="11">1</text>
          <text x={cx + 6} y={cy + r / 2 + 14} fill="#64748b" fontSize="11">-1</text>

          {/* Winkel-Strahl */}
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#f59e0b" strokeWidth="2" />

          {/* Winkel-Arc */}
          {angle > 0.05 && (
            <path
              d={`M ${cx + 30},${cy} A 30 30 0 ${angle > Math.PI ? 1 : 0} 0 ${cx + 30 * Math.cos(angle)},${cy - 30 * Math.sin(angle)}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
            />
          )}

          {/* Winkel-Label */}
          {angle > 0.05 && (
            <text
              x={cx + 42 * Math.cos(angle / 2)}
              y={cy - 42 * Math.sin(angle / 2) + 4}
              fill="#f59e0b"
              fontSize="12"
              fontWeight="bold"
              textAnchor="middle"
            >
              {deg.toFixed(0)}°
            </text>
          )}

          {/* cos (horizontale Linie) */}
          <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#34d399" strokeWidth="2" />
          <text x={(cx + px) / 2} y={cy + 18} fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
            cos α = {cosVal.toFixed(2)}
          </text>

          {/* sin (vertikale Linie) */}
          <line x1={px} y1={cy} x2={px} y2={py} stroke="#f472b6" strokeWidth="2" />
          <text x={px + 10} y={(cy + py) / 2} fill="#f472b6" fontSize="11" fontWeight="bold">
            sin α = {sinVal.toFixed(2)}
          </text>

          {/* Rechter Winkel */}
          <path
            d={`M ${px - 8},${cy} L ${px - 8},${cy - 8} L ${px},${cy - 8}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1"
          />

          {/* Tick-Marks für wichtige Winkel */}
          {importantAngles.map(a => {
            const ax = cx + r * Math.cos(a.rad);
            const ay = cy - r * Math.sin(a.rad);
            return (
              <g key={a.deg}>
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

          {/* Ziehpunkt */}
          <circle
            cx={px} cy={py}
            r={isDragging ? 10 : 7}
            fill="#f59e0b"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Wertetabelle */}
      <div className="grid grid-cols-4 gap-3">
        <ValueCard label="Winkel" value={`${deg.toFixed(0)}°`} sub={`${(angle).toFixed(2)} rad`} color="#f59e0b" />
        <ValueCard label="cos α" value={cosVal.toFixed(3)} color="#34d399" />
        <ValueCard label="sin α" value={sinVal.toFixed(3)} color="#f472b6" />
        <ValueCard label="tan α" value={isNaN(tanVal) ? "undef." : tanVal.toFixed(3)} color="#818cf8" />
      </div>

      {/* Schnellwahl */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360].map(deg => (
          <button
            key={deg}
            onClick={() => setAngle((deg * Math.PI) / 180)}
            className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
          >
            {deg}°
          </button>
        ))}
      </div>

      {/* Erklärung */}
      <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-1">
        <p>🟢 <strong className="text-green-400">cos α</strong> = x-Koordinate des Punktes auf dem Kreis</p>
        <p>🩷 <strong className="text-pink-400">sin α</strong> = y-Koordinate des Punktes auf dem Kreis</p>
        <p>💡 Probiere mal: 0°, 90°, 180°, 270° — was passiert mit sin und cos?</p>
      </div>
    </div>
  );
}

function ValueCard({ label, value, sub, color }: {
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50 text-center">
      <div className="text-xs text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-mono font-bold" style={{ color }}>{value}</div>
      {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
}
