"use client";

export default function VModel() {
  const left = [
    { name: "Anforderungen", icon: "📋", color: "#3B82F6" },
    { name: "Systementwurf", icon: "🏗️", color: "#8B5CF6" },
    { name: "Architektur", icon: "📐", color: "#6366F1" },
    { name: "Modulentwurf", icon: "✏️", color: "#10B981" },
    { name: "Implementierung", icon: "💻", color: "#F59E0B" },
  ];
  const right = [
    { name: "Abnahmetest", icon: "✅", color: "#3B82F6" },
    { name: "Systemtest", icon: "🧪", color: "#8B5CF6" },
    { name: "Integrationstest", icon: "🔗", color: "#6366F1" },
    { name: "Modultest", icon: "🔍", color: "#10B981" },
    { name: "Implementierung", icon: "💻", color: "#F59E0B" },
  ];

  const boxW = 150;
  const boxH = 36;
  const gapY = 52;
  const midX = 200;

  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 420 320" className="w-full max-w-lg">
        {/* Left side (descending) */}
        {left.map((phase, i) => {
          const x = midX - 40 - (i * 35) - boxW;
          const y = 20 + i * gapY;
          return (
            <g key={`l-${i}`}>
              <rect x={x} y={y} width={boxW} height={boxH} rx="6" fill={phase.color + "20"} stroke={phase.color} strokeWidth="1.5" />
              <text x={x + 10} y={y + 22} fill="#F8FAFC" fontSize="10" fontWeight="600">
                {phase.icon} {phase.name}
              </text>
            </g>
          );
        })}

        {/* Right side (ascending) */}
        {right.map((phase, i) => {
          const x = midX + 40 + (i * 35);
          const y = 20 + (4 - i) * gapY;
          return (
            <g key={`r-${i}`}>
              <rect x={x} y={y} width={boxW} height={boxH} rx="6" fill={phase.color + "20"} stroke={phase.color} strokeWidth="1.5" />
              <text x={x + 10} y={y + 22} fill="#F8FAFC" fontSize="10" fontWeight="600">
                {phase.icon} {phase.name}
              </text>
            </g>
          );
        })}

        {/* Connecting arrows (V shape) */}
        {left.map((_, i) => {
          if (i === left.length - 1) return null;
          const lx = midX - 40 - (i * 35);
          const ly = 20 + i * gapY + boxH / 2;
          const nlx = midX - 40 - ((i + 1) * 35) - boxW;
          const nly = 20 + (i + 1) * gapY + boxH / 2;
          return <line key={`ll-${i}`} x1={lx} y1={ly} x2={nlx + boxW} y2={nly} stroke="#475569" strokeWidth="1" />;
        })}
        {right.map((_, i) => {
          if (i === right.length - 1) return null;
          const rx = midX + 40 + (i * 35) + boxW;
          const ry = 20 + (4 - i) * gapY + boxH / 2;
          const nrx = midX + 40 + ((i + 1) * 35);
          const nry = 20 + (4 - (i + 1)) * gapY + boxH / 2;
          return <line key={`rl-${i}`} x1={rx} y1={ry} x2={nrx} y2={nry} stroke="#475569" strokeWidth="1" />;
        })}

        {/* V connection lines */}
        <line x1={midX - 40} y1={20 + boxH / 2} x2={midX} y2={20 + 4 * gapY + boxH / 2} stroke="#3B82F6" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
        <line x1={midX} y1={20 + 4 * gapY + boxH / 2} x2={midX + 40 + 4 * 35 + boxW} y2={20 + boxH / 2} stroke="#3B82F6" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />

        {/* Bottom center: Implementation */}
        <rect x={midX - 30} y={20 + 4 * gapY} width="60" height={boxH} rx="6" fill="#F59E0B30" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Labels */}
        <text x="30" y="160" fill="#64748B" fontSize="9" textAnchor="middle" transform="rotate(-90, 30, 160)">Abstraktion</text>
        <text x="390" y="160" fill="#64748B" fontSize="9" textAnchor="middle" transform="rotate(90, 390, 160)">Verifikation</text>
      </svg>
    </div>
  );
}
