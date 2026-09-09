"use client";

import { useEffect, useState } from "react";
import { SkillTreeGraph } from "@/components/SkillTreeGraph";
import { SkillTreeGraphView } from "@/components/SkillTreeGraphView";
import { LessonFeedback } from "@/components/LessonFeedback";

const MODE_KEY = "learnhub_skilltree_mode";
type ViewMode = "etagen" | "graph";

export default function SkillTreePage() {
  const [mode, setMode] = useState<ViewMode>("etagen");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MODE_KEY);
      if (saved === "graph" || saved === "etagen") setMode(saved);
    } catch { /* Standardansicht */ }
  }, []);

  const switchMode = (m: ViewMode) => {
    setMode(m);
    try { localStorage.setItem(MODE_KEY, m); } catch { /* egal */ }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Skill Tree — full height */}
      <div className="flex-1 relative">
        {mode === "etagen" ? <SkillTreeGraph /> : <SkillTreeGraphView />}

        {/* Ansichts-Umschalter + Feedback */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          <div className="flex gap-1 bg-slate-900/80 backdrop-blur rounded-xl p-1 border border-slate-700/50 shadow-xl">
            <button
              onClick={() => switchMode("etagen")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === "etagen" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              ▦ Etagen
            </button>
            <button
              onClick={() => switchMode("graph")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${mode === "graph" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              🕸 Graph
            </button>
          </div>
          <div className="bg-slate-900/80 backdrop-blur rounded-xl border border-slate-700/50 shadow-xl relative">
            <LessonFeedback
              moduleSlug="skill-tree"
              moduleTitle="Skill Tree"
              lessonId="skill-tree-graph"
              lessonTitle="Skill Tree Ansicht"
              popover
            />
          </div>
        </div>
      </div>
    </div>
  );
}
