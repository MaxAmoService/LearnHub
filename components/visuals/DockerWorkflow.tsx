"use client";

export default function DockerWorkflow() {
  const steps = [
    { label: "Dockerfile", icon: "📄", color: "#3B82F6", desc: "Image definieren" },
    { label: "docker build", icon: "🔨", color: "#8B5CF6", desc: "Image bauen" },
    { label: "Image", icon: "📦", color: "#6366F1", desc: "Schablone" },
    { label: "docker run", icon: "▶️", color: "#10B981", desc: "Container starten" },
    { label: "Container", icon: "🐳", color: "#F59E0B", desc: "Läuft isoliert" },
  ];

  const boxW = 100;
  const boxH = 60;
  const gap = 20;

  return (
    <div className="flex justify-center my-6">
      <svg viewBox={`0 0 ${steps.length * (boxW + gap) + 40} 120`} className="w-full max-w-2xl">
        {/* Title */}
        <text x={(steps.length * (boxW + gap) + 40) / 2} y="18" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="bold">
          Docker Workflow
        </text>

        {steps.map((step, i) => {
          const x = 20 + i * (boxW + gap);
          const y = 30;
          return (
            <g key={i}>
              {/* Box */}
              <rect x={x} y={y} width={boxW} height={boxH} rx="8" fill={step.color + "15"} stroke={step.color} strokeWidth="1.5" />

              {/* Icon */}
              <text x={x + boxW / 2} y={y + 25} textAnchor="middle" fontSize="18">{step.icon}</text>

              {/* Label */}
              <text x={x + boxW / 2} y={y + 42} textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="600">
                {step.label}
              </text>

              {/* Description */}
              <text x={x + boxW / 2} y={y + 54} textAnchor="middle" fill="#94A3B8" fontSize="7">
                {step.desc}
              </text>

              {/* Arrow */}
              {i < steps.length - 1 && (
                <polygon
                  points={`${x + boxW + 4},${y + boxH / 2} ${x + boxW + gap - 4},${y + boxH / 2 - 5} ${x + boxW + gap - 4},${y + boxH / 2 + 5}`}
                  fill={step.color}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
