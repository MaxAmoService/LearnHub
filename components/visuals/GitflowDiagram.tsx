"use client";

export default function GitflowDiagram() {
  const branches = [
    { name: "main", color: "#10B981", y: 40 },
    { name: "hotfix", color: "#EF4444", y: 80 },
    { name: "release", color: "#F59E0B", y: 120 },
    { name: "develop", color: "#3B82F6", y: 160 },
    { name: "feature", color: "#8B5CF6", y: 200 },
  ];

  const commitRadius = 5;
  const startX = 60;
  const endX = 360;

  return (
    <div className="flex justify-center my-6">
      <svg viewBox="0 0 400 250" className="w-full max-w-lg">
        {/* Title */}
        <text x="200" y="22" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">
          Gitflow Branching-Strategie
        </text>

        {/* Branch lines */}
        {branches.map((b) => (
          <g key={b.name}>
            <line x1={startX} y1={b.y} x2={endX} y2={b.y} stroke={b.color} strokeWidth="2.5" />
            <text x={15} y={b.y + 4} fill={b.color} fontSize="11" fontWeight="600" textAnchor="start">
              {b.name}
            </text>
          </g>
        ))}

        {/* main commits */}
        {[80, 200, 340].map((x, i) => (
          <circle key={`main-${i}`} cx={x} cy={40} r={commitRadius} fill="#10B981" />
        ))}

        {/* develop commits */}
        {[100, 140, 180, 220, 260, 300].map((x, i) => (
          <circle key={`dev-${i}`} cx={x} cy={160} r={commitRadius} fill="#3B82F6" />
        ))}

        {/* feature branch (diverge + merge) */}
        <line x1="140" y1="160" x2="160" y2="200" stroke="#8B5CF6" strokeWidth="1.5" />
        {[170, 190, 210].map((x, i) => (
          <circle key={`feat-${i}`} cx={x} cy={200} r={commitRadius} fill="#8B5CF6" />
        ))}
        <line x1="220" y1="200" x2="240" y2="160" stroke="#8B5CF6" strokeWidth="1.5" />

        {/* release branch */}
        <line x1="260" y1="160" x2="270" y2="120" stroke="#F59E0B" strokeWidth="1.5" />
        {[280, 300].map((x, i) => (
          <circle key={`rel-${i}`} cx={x} cy={120} r={commitRadius} fill="#F59E0B" />
        ))}
        <line x1="310" y1="120" x2="320" y2="40" stroke="#F59E0B" strokeWidth="1.5" />
        <line x1="310" y1="120" x2="320" y2="160" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4,3" />

        {/* hotfix branch */}
        <line x1="200" y1="40" x2="210" y2="80" stroke="#EF4444" strokeWidth="1.5" />
        {[220, 230].map((x, i) => (
          <circle key={`hot-${i}`} cx={x} cy={80} r={commitRadius} fill="#EF4444" />
        ))}
        <line x1="240" y1="80" x2="250" y2="40" stroke="#EF4444" strokeWidth="1.5" />
        <line x1="240" y1="80" x2="250" y2="160" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4,3" />

        {/* Tags on main */}
        <text x="80" y="30" textAnchor="middle" fill="#10B981" fontSize="8">v1.0</text>
        <text x="200" y="30" textAnchor="middle" fill="#10B981" fontSize="8">v1.1</text>
        <text x="340" y="30" textAnchor="middle" fill="#10B981" fontSize="8">v2.0</text>
      </svg>
    </div>
  );
}
