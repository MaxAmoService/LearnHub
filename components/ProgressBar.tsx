"use client";

interface ProgressBarProps {
  value: number;
  color?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function ProgressBar({
  value,
  color = "#3b82f6",
  showLabel = false,
  size = "md",
  animated = true,
}: ProgressBarProps) {
  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="w-full">
      <div className={`w-full bg-slate-700/50 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full transition-all duration-700 ease-out relative ${
            animated ? "animate-progress-fill" : ""
          }`}
          style={{
            width: `${clampedValue}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            boxShadow: clampedValue > 0 ? `0 0 8px ${color}40` : "none",
          }}
        >
          {/* Shimmer effect */}
          {clampedValue > 0 && clampedValue < 100 && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 animate-shimmer" style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
                backgroundSize: "200% 100%",
              }} />
            </div>
          )}
        </div>
      </div>
      {showLabel && (
        <p className="text-sm text-slate-400 mt-1">{Math.round(value)}%</p>
      )}
    </div>
  );
}
