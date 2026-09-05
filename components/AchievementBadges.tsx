"use client";

import { useState, useEffect } from "react";
import { Trophy, Star, Flame, BookOpen, Zap, Target, Award } from "lucide-react";
import { playLevelUp } from "@/lib/sounds";

interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  condition: (stats: UserStats) => boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface UserStats {
  totalLessons: number;
  totalModules: number;
  streak: number;
  totalXP: number;
  quizPassed: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_lesson", icon: "📖", title: "Erster Schritt", description: "Erste Lektion abgeschlossen", condition: s => s.totalLessons >= 1, rarity: "common" },
  { id: "five_lessons", icon: "📚", title: "Lernanfänger", description: "5 Lektionen abgeschlossen", condition: s => s.totalLessons >= 5, rarity: "common" },
  { id: "ten_lessons", icon: "🎓", title: "Wissbegierig", description: "10 Lektionen abgeschlossen", condition: s => s.totalLessons >= 10, rarity: "common" },
  { id: "twentyfive_lessons", icon: "🏅", title: "Fleißiger Schüler", description: "25 Lektionen abgeschlossen", condition: s => s.totalLessons >= 25, rarity: "rare" },
  { id: "fifty_lessons", icon: "🏆", title: "Lernmeister", description: "50 Lektionen abgeschlossen", condition: s => s.totalLessons >= 50, rarity: "epic" },
  { id: "hundred_lessons", icon: "👑", title: "Gelehrter", description: "100 Lektionen abgeschlossen", condition: s => s.totalLessons >= 100, rarity: "legendary" },
  { id: "first_module", icon: "✅", title: "Modulabschluss", description: "Erstes Modul komplett abgeschlossen", condition: s => s.totalModules >= 1, rarity: "common" },
  { id: "three_modules", icon: "🎯", title: "Vielseitig", description: "3 Module abgeschlossen", condition: s => s.totalModules >= 3, rarity: "rare" },
  { id: "five_modules", icon: "💎", title: "Experte", description: "5 Module abgeschlossen", condition: s => s.totalModules >= 5, rarity: "epic" },
  { id: "streak_3", icon: "🔥", title: "Dreitagesserie", description: "3 Tage in Folge gelernt", condition: s => s.streak >= 3, rarity: "common" },
  { id: "streak_7", icon: "🔥", title: "Wochenstreak", description: "7 Tage in Folge gelernt", condition: s => s.streak >= 7, rarity: "rare" },
  { id: "streak_30", icon: "🔥", title: "Monatsstreak", description: "30 Tage in Folge gelernt", condition: s => s.streak >= 30, rarity: "legendary" },
  { id: "xp_100", icon: "⚡", title: "Energiegeladen", description: "100 XP gesammelt", condition: s => s.totalXP >= 100, rarity: "common" },
  { id: "xp_500", icon: "⚡", title: "XP-Jäger", description: "500 XP gesammelt", condition: s => s.totalXP >= 500, rarity: "rare" },
  { id: "xp_1000", icon: "⚡", title: "XP-Meister", description: "1000 XP gesammelt", condition: s => s.totalXP >= 1000, rarity: "epic" },
  { id: "first_quiz", icon: "❓", title: "Quiz bestanden", description: "Erstes Quiz erfolgreich abgeschlossen", condition: s => s.quizPassed >= 1, rarity: "common" },
];

const RARITY_COLORS = {
  common: { bg: "bg-slate-500/15", border: "border-slate-500/30", text: "text-slate-300", label: "Häufig" },
  rare: { bg: "bg-blue-500/15", border: "border-blue-500/30", text: "text-blue-300", label: "Selten" },
  epic: { bg: "bg-purple-500/15", border: "border-purple-500/30", text: "text-purple-300", label: "Episch" },
  legendary: { bg: "bg-amber-500/15", border: "border-amber-500/30", text: "text-amber-300", label: "Legendär" },
};

interface AchievementBadgesProps {
  stats: UserStats;
}

export function AchievementBadges({ stats }: AchievementBadgesProps) {
  const [newBadge, setNewBadge] = useState<Achievement | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const stored = localStorage.getItem("learnhub-achievements");
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch { return new Set(); }
  });

  // Check for new achievements
  useEffect(() => {
    const newlyUnlocked = ACHIEVEMENTS.filter(a => a.condition(stats) && !unlockedIds.has(a.id));
    if (newlyUnlocked.length > 0) {
      const next = new Set(unlockedIds);
      newlyUnlocked.forEach(a => next.add(a.id));
      setUnlockedIds(next);
      localStorage.setItem("learnhub-achievements", JSON.stringify([...next]));
      setNewBadge(newlyUnlocked[0]);
      playLevelUp();
      setTimeout(() => setNewBadge(null), 4000);
    }
  }, [stats.totalLessons, stats.totalModules, stats.streak, stats.totalXP, stats.quizPassed]);

  const unlocked = ACHIEVEMENTS.filter(a => unlockedIds.has(a.id));
  const locked = ACHIEVEMENTS.filter(a => !unlockedIds.has(a.id));

  return (
    <>
      {/* New Badge Popup */}
      {newBadge && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
          <div className="glass rounded-2xl px-6 py-4 border border-amber-500/40 shadow-2xl shadow-amber-500/20 flex items-center gap-4">
            <span className="text-4xl">{newBadge.icon}</span>
            <div>
              <p className="text-xs text-amber-400 uppercase tracking-wider font-medium">Achievement freigeschaltet!</p>
              <p className="text-lg font-bold text-white">{newBadge.title}</p>
              <p className="text-sm text-slate-400">{newBadge.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Badge Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {unlocked.map(a => {
          const r = RARITY_COLORS[a.rarity];
          return (
            <div key={a.id} className={`rounded-xl p-4 text-center border ${r.bg} ${r.border} transition-all hover:scale-105`}>
              <span className="text-3xl block mb-2">{a.icon}</span>
              <p className={`text-sm font-bold ${r.text}`}>{a.title}</p>
              <p className="text-[11px] text-slate-500 mt-1">{a.description}</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full mt-2 inline-block ${r.bg} ${r.text}`}>{r.label}</span>
            </div>
          );
        })}
        {locked.map(a => (
          <div key={a.id} className="rounded-xl p-4 text-center border border-slate-700/30 bg-slate-800/20 opacity-50">
            <span className="text-3xl block mb-2 grayscale">🔒</span>
            <p className="text-sm font-bold text-slate-500">{a.title}</p>
            <p className="text-[11px] text-slate-600 mt-1">{a.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}
