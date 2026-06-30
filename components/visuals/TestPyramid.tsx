"use client";

export default function TestPyramid() {
  const layers = [
    { name: "E2E / Akzeptanztests", count: "Wenige", time: "Langsam", color: "#EF4444", icon: "🎭", width: 280 },
    { name: "Integrationstests", count: "Mehr", time: "Mittel", color: "#F59E0B", icon: "🔗", width: 220 },
    { name: "Unittests", count: "Viele", time: "Schnell", color: "#10B981", icon: "⚡", width: 160 },
  ];

  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 320 230" className="w-full max-w-xs">
        {/* Title */}
        <text x="160" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">
          Testpyramide
        </text>

        {layers.map((layer, i) => {
          const y = 35 + i * 65;
          const x = (320 - layer.width) / 2;
          return (
            <g key={i}>
              {/* Pyramid section (trapezoid) */}
              <polygon
                points={`${x},${y} ${x + layer.width},${y} ${x + layer.width - 10},${y + 55} ${x + 10},${y + 55}`}
                fill={layer.color + "20"}
                stroke={layer.color}
                strokeWidth="1.5"
              />

              {/* Icon + Name */}
              <text x="160" y={y + 25} textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600">
                {layer.icon} {layer.name}
              </text>

              {/* Stats */}
              <text x="160" y={y + 42} textAnchor="middle" fill="#94A3B8" fontSize="9">
                {layer.count} · {layer.time}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        <text x="10" y="130" fill="#64748B" fontSize="8" transform="rotate(-90, 10, 130)">Schnell & viele</text>
        <text x="310" y="130" fill="#64748B" fontSize="8" transform="rotate(90, 310, 130)">Langsam & wenige</text>
      </svg>
    </div>
  );
}
