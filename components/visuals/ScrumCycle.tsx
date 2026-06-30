"use client";

export default function ScrumCycle() {
  const steps = [
    { label: "Sprint\nPlanning", icon: "📋", angle: -90, color: "#3B82F6" },
    { label: "Sprint\n(2-4 Wochen)", icon: "⚡", angle: -30, color: "#10B981" },
    { label: "Sprint\nReview", icon: "🎯", angle: 30, color: "#F59E0B" },
    { label: "Retro-\nspektive", icon: "🔄", angle: 90, color: "#8B5CF6" },
    { label: "Inkrement\nliefern", icon: "🚀", angle: 150, color: "#EF4444" },
    { label: "Product\nBacklog", icon: "📝", angle: 210, color: "#6366F1" },
  ];

  const cx = 200;
  const cy = 200;
  const r = 140;

  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 400 400" className="w-full max-w-md">
        {/* Outer circle */}
        <circle cx={cx} cy={cy} r={r + 30} fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="6,4" />

        {/* Arrow circle */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#475569" />
          </marker>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#475569" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Animated arrow path */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="20,870" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="8s" repeatCount="indefinite" />
        </circle>

        {/* Steps */}
        {steps.map((step, i) => {
          const rad = (step.angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          const lines = step.label.split("\n");

          return (
            <g key={i}>
              {/* Connection dot on circle */}
              <circle cx={x} cy={y} r="6" fill={step.color} />

              {/* Icon circle */}
              <circle cx={x} cy={y - 50} r="24" fill={step.color + "20"} stroke={step.color} strokeWidth="1.5" />
              <text x={x} y={y - 44} textAnchor="middle" fontSize="20">{step.icon}</text>

              {/* Label */}
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={x}
                  y={y + 22 + li * 14}
                  textAnchor="middle"
                  fill="#D1D5DB"
                  fontSize="11"
                  fontWeight="600"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Center text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="bold">
          SCRUM
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#94A3B8" fontSize="10">
          Kontinuierlicher
        </text>
        <text x={cx} y={cy + 26} textAnchor="middle" fill="#94A3B8" fontSize="10">
          Zyklus
        </text>
      </svg>
    </div>
  );
}
