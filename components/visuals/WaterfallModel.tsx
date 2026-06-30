"use client";

export default function WaterfallModel() {
  const phases = [
    { name: "Anforderungsanalyse", icon: "📋", color: "#3B82F6" },
    { name: "Entwurf", icon: "✏️", color: "#8B5CF6" },
    { name: "Implementierung", icon: "💻", color: "#10B981" },
    { name: "Test", icon: "🧪", color: "#F59E0B" },
    { name: "Integration", icon: "🔗", color: "#EF4444" },
    { name: "Wartung", icon: "🔧", color: "#6366F1" },
  ];

  const stepH = 54;
  const stepW = 260;
  const offsetX = 70;
  const arrowSize = 8;

  return (
    <div className="flex justify-center my-6">
      <svg viewBox={`0 0 400 ${phases.length * stepH + 60}`} className="w-full max-w-sm">
        {phases.map((phase, i) => {
          const y = 20 + i * stepH;
          const x = offsetX + i * 12;
          return (
            <g key={i}>
              {/* Phase box */}
              <rect
                x={x}
                y={y}
                width={stepW - i * 24}
                height={stepH - 10}
                rx="6"
                fill={phase.color + "20"}
                stroke={phase.color}
                strokeWidth="1.5"
              />
              <text x={x + 12} y={y + 22} fill="#F8FAFC" fontSize="12" fontWeight="600">
                {phase.icon} {phase.name}
              </text>
              <text x={x + 12} y={y + 38} fill="#94A3B8" fontSize="9">
                Phase {i + 1}
              </text>

              {/* Arrow down */}
              {i < phases.length - 1 && (
                <polygon
                  points={`${x + (stepW - i * 24) / 2},${y + stepH - 10 + arrowSize} ${x + (stepW - i * 24) / 2 - arrowSize},${y + stepH - 10} ${x + (stepW - i * 24) / 2 + arrowSize},${y + stepH - 10}`}
                  fill={phase.color}
                />
              )}
            </g>
          );
        })}

        {/* Feedback arrow (left side) */}
        <defs>
          <marker id="wf-arrow" markerWidth="6" markerHeight="5" refX="0" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="#EF4444" />
          </marker>
        </defs>
        <path
          d={`M ${offsetX - 15} ${20 + (phases.length - 1) * stepH + 10} L ${offsetX - 15} 30`}
          fill="none"
          stroke="#EF4444"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          markerEnd="url(#wf-arrow)"
        />
        <text x={offsetX - 25} y={phases.length * stepH / 2} fill="#EF4444" fontSize="8" textAnchor="middle" transform={`rotate(-90, ${offsetX - 25}, ${phases.length * stepH / 2})`}>
          Feedback
        </text>
      </svg>
    </div>
  );
}
