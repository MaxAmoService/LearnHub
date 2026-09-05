"use client";

import { useAuth } from "./AuthProvider";
import { getUserLevel } from "@/lib/auth";
import { AvatarFrame } from "./AvatarFrame";
import { FrameOnlineStatus } from "./OnlineStatus";
import {
  LogOut, Trophy, Flame, Zap, ChevronDown, User, Settings
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export function UserProfile() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  const levelInfo = getUserLevel(user.totalXP);

  // Click outside to close
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  // Keyboard shortcut to close
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowMenu(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showMenu]);

  const achievements = [
    { check: user.streak >= 3, icon: "🔥", label: "3+ Streak", bg: "bg-orange-500/15", text: "text-orange-400" },
    { check: user.streak >= 7, icon: "🔥", label: "7 Streak", bg: "bg-red-500/15", text: "text-red-400" },
    { check: user.streak >= 30, icon: "👑", label: "30 Streak", bg: "bg-amber-500/15", text: "text-amber-400" },
    { check: user.completedModules.length >= 1, icon: "🎯", label: "1 Modul", bg: "bg-green-500/15", text: "text-green-400" },
    { check: user.completedModules.length >= 5, icon: "🎓", label: "5 Module", bg: "bg-blue-500/15", text: "text-blue-400" },
    { check: user.totalXP >= 100, icon: "⭐", label: "100 XP", bg: "bg-purple-500/15", text: "text-purple-400" },
    { check: user.totalXP >= 500, icon: "💎", label: "500 XP", bg: "bg-cyan-500/15", text: "text-cyan-400" },
    { check: user.totalXP >= 1000, icon: "🏅", label: "1000 XP", bg: "bg-yellow-500/15", text: "text-yellow-400" },
    { check: (user.savedModules?.length || 0) >= 3, icon: "📚", label: "Sammler", bg: "bg-blue-500/15", text: "text-blue-400" },
  ];
  const unlocked = achievements.filter(a => a.check);
  const locked = achievements.filter(a => !a.check).slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-800/80 transition-all duration-200 group"
      >
        <div className="relative">
          <AvatarFrame avatar={user.avatar} frameId={user.equippedFrame} level={getUserLevel(user.totalXP).level} size="md" />
          {user.streak >= 3 && (
            <span className="absolute -bottom-0.5 -right-0.5 text-[10px]">🔥</span>
          )}
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
            {user.displayName || user.username}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-16 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
                style={{ width: `${levelInfo.progress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Lv.{levelInfo.level}</span>
          </div>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${showMenu ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-[320px] rounded-2xl overflow-hidden animate-slide-up z-50 shadow-2xl shadow-black/50 border border-slate-700/80 bg-slate-900/95 backdrop-blur-xl">
          {/* Header with gradient */}
          <div className="relative px-5 pt-5 pb-4 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
            <div className="flex items-center gap-4">
              <div className="relative">
                <AvatarFrame avatar={user.avatar} frameId={user.equippedFrame} level={levelInfo.level} size="lg" />
                <FrameOnlineStatus uid={user.uid} className="-bottom-1 -right-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-lg truncate">{user.displayName || user.username}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-[11px] font-semibold rounded-md">
                    {levelInfo.title}
                  </span>
                  <span className="text-[11px] text-slate-500">Level {levelInfo.level}</span>
                </div>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
                <span>{user.totalXP} XP</span>
                <span>{levelInfo.xpToNext} XP bis Level {levelInfo.level + 1}</span>
              </div>
              <div className="h-2 bg-slate-700/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 rounded-full transition-all duration-700 relative"
                  style={{ width: `${levelInfo.progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-px bg-slate-800/50">
            <div className="bg-slate-900/90 p-3 text-center group hover:bg-slate-800/90 transition-colors">
              <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-lg font-bold text-white">{user.streak}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Streak</p>
            </div>
            <div className="bg-slate-900/90 p-3 text-center group hover:bg-slate-800/90 transition-colors">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-lg font-bold text-white">{user.totalXP}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">XP</p>
            </div>
            <div className="bg-slate-900/90 p-3 text-center group hover:bg-slate-800/90 transition-colors">
              <Trophy className="w-5 h-5 text-violet-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-lg font-bold text-white">{user.completedModules.length}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Module</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Erfolge</span>
              <span className="text-[10px] text-slate-600">{unlocked.length}/{achievements.length + locked.length}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {unlocked.map((a, i) => (
                <span key={i} className={`px-2 py-1 ${a.bg} ${a.text} text-[11px] rounded-lg font-medium flex items-center gap-1`}>
                  {a.icon} {a.label}
                </span>
              ))}
              {locked.map((a, i) => (
                <span key={i} className="px-2 py-1 bg-slate-800/80 text-slate-600 text-[11px] rounded-lg font-medium flex items-center gap-1">
                  🔒 {a.label}
                </span>
              ))}
              {unlocked.length === 0 && (
                <span className="text-[11px] text-slate-600 italic">Lerne, um Erfolge freizuschalten!</span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-3 pb-2 space-y-0.5">
            <Link
              href="/profile"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-150 group"
            >
              <User className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              <span className="flex-1">Mein Profil</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-600 -rotate-90" />
            </Link>
            <Link
              href="/profile#settings"
              onClick={() => setShowMenu(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-150 group"
            >
              <Settings className="w-4 h-4 text-slate-500 group-hover:text-slate-400 transition-colors" />
              <span className="flex-1">Einstellungen</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-600 -rotate-90" />
            </Link>
          </div>

          {/* Logout */}
          <div className="px-3 pb-3 pt-1 border-t border-slate-800">
            <button
              onClick={() => { logout(); setShowMenu(false); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150"
            >
              <LogOut className="w-4 h-4" />
              Abmelden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
