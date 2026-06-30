"use client";

import { BookOpen, Trophy, Flame, Star } from "lucide-react";
import { allModules } from "@/lib/data";

interface Activity {
  icon: React.ReactNode;
  text: string;
  time: string;
  color: string;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) return null;

  return (
    <div className="glass rounded-xl p-5">
      <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
        <Flame className="w-4 h-4 text-orange-400" />
        Letzte Aktivität
      </h3>
      <div className="space-y-2">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${a.color}`}>
              {a.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-200 truncate">{a.text}</p>
              <p className="text-[11px] text-slate-500">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function getRecentActivities(user: {
  completedLessons: Record<string, string[]>;
  completedModules: string[];
  streak: number;
  totalXP: number;
}): Activity[] {
  const activities: Activity[] = [];

  const getModuleTitle = (slug: string) => {
    const mod = allModules.find(m => m.slug === slug);
    return mod?.title || slug;
  };

  // Recent lessons (last 3)
  const allLessonEntries = Object.entries(user.completedLessons)
    .flatMap(([moduleId, lessonIds]) => lessonIds.map(id => ({ moduleId, lessonId: id })))
    .slice(-3)
    .reverse();

  for (const { moduleId, lessonId } of allLessonEntries) {
    const title = getModuleTitle(moduleId);
    if (lessonId === "quiz") {
      activities.push({
        icon: <Trophy className="w-4 h-4 text-purple-400" />,
        text: `Quiz in "${title}" bestanden`,
        time: "Kürzlich",
        color: "bg-purple-500/15",
      });
    } else {
      activities.push({
        icon: <BookOpen className="w-4 h-4 text-blue-400" />,
        text: `Lektion in "${title}" abgeschlossen`,
        time: "Kürzlich",
        color: "bg-blue-500/15",
      });
    }
  }

  // Streak
  if (user.streak >= 3) {
    activities.push({
      icon: <Flame className="w-4 h-4 text-orange-400" />,
      text: `${user.streak} Tage Streak! Weiter so!`,
      time: "Heute",
      color: "bg-orange-500/15",
    });
  }

  // XP milestone
  if (user.totalXP >= 100) {
    activities.push({
      icon: <Star className="w-4 h-4 text-amber-400" />,
      text: `${user.totalXP} XP gesammelt`,
      time: "Gesamt",
      color: "bg-amber-500/15",
    });
  }

  return activities.slice(0, 5);
}
