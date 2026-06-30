"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { allModules as modules } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { ProgressBar } from "@/components/ProgressBar";
import { LoginModal } from "@/components/LoginModal";
import { getUserLevel } from "@/lib/auth";
import { DashboardSkeleton } from "@/components/Skeleton";
import { ActivityFeed, getRecentActivities } from "@/components/ActivityFeed";
import { BookOpen, Trophy, Flame, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { user, isLoading, updateProfile } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading) return <DashboardSkeleton />;

  const levelInfo = user ? getUserLevel(user.totalXP) : null;

  const startedModules = user ? modules.filter((m) => {
    const allCompleted = user.completedLessons[m.slug] || [];
    const lessonIdSet = new Set(m.lessons.map(l => l.id));
    const completed = allCompleted.filter(id => lessonIdSet.has(id)).length;
    return completed > 0 && completed < m.lessons.length;
  }) : [];

  const completedModules = user ? modules.filter((m) => {
    return user.completedModules.includes(m.slug);
  }) : [];

  const savedModules = user?.savedModules
    ? modules.filter((m) => user.savedModules?.includes(m.slug) && !startedModules.includes(m) && !completedModules.includes(m))
    : [];

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = user
    ? modules.reduce((acc, m) => {
      const allCompleted = user.completedLessons[m.slug] || [];
      const lessonIdSet = new Set(m.lessons.map(l => l.id));
      return acc + allCompleted.filter(id => lessonIdSet.has(id)).length;
    }, 0)
    : 0;

  const totalProgress = totalLessons > 0 ? Math.min(100, Math.round((completedLessons / totalLessons) * 100)) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <section className="text-center py-6 sm:py-10">
        {user ? (
          <>
            <div className="text-5xl mb-3">{user.avatar}</div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              Willkommen zurück, <span className="gradient-text">{user.displayName || user.username}</span>!
            </h1>
            <p className="text-base sm:text-lg text-slate-400">
              {user.streak > 1
                ? `🔥 ${user.streak} Tage Streak! Weiter so!`
                : "Bereit zum Lernen? Setze deinen Streak fort!"}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Willkommen bei <span className="gradient-text">LearnHub</span>! 🎓
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-6">
              Lerne Mathe, Programmierung und IHK-Inhalte — interaktiv und kostenlos.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setShowLogin(true)}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-500/20"
              >
                Jetzt kostenlos starten
              </button>
              <Link
                href="/modules"
                className="w-full sm:w-auto px-8 py-3.5 border border-slate-600 hover:border-slate-400 rounded-xl font-medium text-lg transition-colors text-slate-300 hover:text-white text-center"
              >
                Module ansehen
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Stats Grid */}
      {user && levelInfo && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="glass rounded-xl p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">Level {levelInfo.level}</span>
            </div>
            <p className="text-lg font-bold text-white">{levelInfo.title}</p>
            <p className="text-xs text-amber-400 font-medium">{user.totalXP.toLocaleString("de-DE")} XP</p>
            <div className="mt-auto pt-2">
              <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700" style={{ width: `${levelInfo.progress}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">{levelInfo.xpToNext} XP bis Level {levelInfo.level + 1}</p>
            </div>
          </div>

          <StatCard icon={<BookOpen className="w-5 h-5" />} color="blue" label="Module" value={`${user.completedModules.length}/${modules.length}`} />
          <StatCard icon={<Trophy className="w-5 h-5" />} color="green" label="Lektionen" value={`${completedLessons}/${totalLessons}`} />

          <div className="glass rounded-xl p-4 relative">
            <div className="bg-orange-500/15 w-9 h-9 rounded-lg flex items-center justify-center mb-2.5">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Streak</p>
            <p className="text-xl font-bold text-orange-400 mt-0.5">{user.streak} 🔥</p>
            {user.streakFreeze ? (
              <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">🛡️</span>
            ) : user.streak >= 3 ? (
              <button
                onClick={async () => { await updateProfile({ streakFreeze: true }); }}
                className="absolute top-2 right-2 text-[10px] px-2 py-0.5 bg-slate-700/60 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-colors border border-slate-600/40"
                title="Streak-Freeze aktivieren"
              >🛡️</button>
            ) : null}
          </div>
        </section>
      )}

      {/* Overall Progress */}
      {user && (
        <section className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-200">Gesamtfortschritt</h2>
            <span className="text-sm font-bold text-blue-400">{totalProgress}%</span>
          </div>
          <ProgressBar value={totalProgress} />
        </section>
      )}

      {/* Started Modules */}
      {user && startedModules.length > 0 && (
        <section>
          <SectionHeader title="Weiterlernen" icon="📖" count={startedModules.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {startedModules.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </section>
      )}

      {/* Activity Feed */}
      {user && <ActivityFeed activities={getRecentActivities(user)} />}

      {/* Saved Modules */}
      {user && savedModules.length > 0 && (
        <section>
          <SectionHeader title="Gemerkt" icon="🔖" count={savedModules.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedModules.map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Modules (collapsible) */}
      {user && completedModules.length > 0 && (
        <section>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="w-full flex items-center justify-between group"
          >
            <SectionHeader title="Abgeschlossen" icon="✅" count={completedModules.length} />
            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
              {showCompleted ? "Ausblenden" : `${completedModules.length} anzeigen`}
            </span>
          </button>
          {showCompleted && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
              {completedModules.map((m) => (
                <ModuleCard key={m.id} module={m} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* All Modules (when not logged in) */}
      {!user && (
        <section>
          <SectionHeader title="Alle Module" icon="📚" count={modules.length} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.slice(0, 6).map((m) => (
              <ModuleCard key={m.id} module={m} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              href="/modules"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-300 transition-colors"
            >
              Alle Module ansehen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

// ─── Helper Components ──────────────────────────────────────────────────────

function StatCard({ icon, color, label, value }: {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: string;
}) {
  const colors: Record<string, { bg: string; text: string; icon: string }> = {
    blue: { bg: "bg-blue-500/15", text: "text-blue-400", icon: "text-blue-400" },
    green: { bg: "bg-emerald-500/15", text: "text-emerald-400", icon: "text-emerald-400" },
    orange: { bg: "bg-orange-500/15", text: "text-orange-400", icon: "text-orange-400" },
    purple: { bg: "bg-violet-500/15", text: "text-violet-400", icon: "text-violet-400" },
    amber: { bg: "bg-amber-500/15", text: "text-amber-400", icon: "text-amber-400" },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className="glass rounded-xl p-4">
      <div className={`${c.bg} w-9 h-9 rounded-lg flex items-center justify-center mb-2.5`}>
        <div className={c.icon}>{icon}</div>
      </div>
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-bold ${c.text} mt-0.5`}>{value}</p>
    </div>
  );
}

function SectionHeader({ title, icon, count }: { title: string; icon: string; count: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-lg">{icon}</span>
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="px-2 py-0.5 bg-slate-800 text-slate-500 text-xs rounded-full font-medium">{count}</span>
    </div>
  );
}
