"use client";

import { SkillTreeGraph } from "@/components/SkillTreeGraph";

export default function SkillTreePage() {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Skill Tree — full height */}
      <div className="flex-1 relative">
        <SkillTreeGraph />
      </div>
    </div>
  );
}
