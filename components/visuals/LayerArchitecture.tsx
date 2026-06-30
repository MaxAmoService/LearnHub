"use client";

export default function LayerArchitecture() {
  const layers = [
    { name: "Präsentationsschicht", desc: "UI, View, Controller", color: "#3B82F6", icon: "🖥️" },
    { name: "Logikschicht", desc: "Business Logic, Services", color: "#8B5CF6", icon: "⚙️" },
    { name: "Datenschicht", desc: "Database, Repository, DAO", color: "#10B981", icon: "🗄️" },
  ];

  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 360 220" className="w-full max-w-sm">
        {/* Title */}
        <text x="180" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">
          Schichtarchitektur (3-Layer)
        </text>

        {layers.map((layer, i) => {
          const y = 35 + i * 62;
          return (
            <g key={i}>
              {/* Layer box */}
              <rect x="30" y={y} width="300" height="50" rx="8" fill={layer.color + "15"} stroke={layer.color} strokeWidth="2" />

              {/* Icon + Name */}
              <text x="50" y={y + 28} fill="#F8FAFC" fontSize="14" fontWeight="600">
                {layer.icon} {layer.name}
              </text>
              <text x="50" y={y + 42} fill="#94A3B8" fontSize="10">
                {layer.desc}
              </text>

              {/* Arrow down */}
              {i < layers.length - 1 && (
                <g>
                  <line x1="180" y1={y + 50} x2="180" y2={y + 62} stroke={layer.color} strokeWidth="1.5" markerEnd={`url(#la-arrow-${i})`} />
                  <defs>
                    <marker id={`la-arrow-${i}`} markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                      <polygon points="0 0, 6 2.5, 0 5" fill={layer.color} />
                    </marker>
                  </defs>
                </g>
              )}
            </g>
          );
        })}

        {/* Constraint arrows */}
        <text x="350" y="75" fill="#EF4444" fontSize="8" textAnchor="end">↓ darf nur</text>
        <text x="350" y="85" fill="#EF4444" fontSize="8" textAnchor="end">darunter</text>
        <text x="350" y="95" fill="#EF4444" fontSize="8" textAnchor="end">sprechen</text>
      </svg>
    </div>
  );
}
