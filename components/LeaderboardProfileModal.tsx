"use client";

import { useState, useEffect } from "react";
import { getUserProfile, getUserLevel, type UserProfile } from "@/lib/auth";
import { AvatarFrame } from "@/components/AvatarFrame";
import { X, Loader2, Trophy, Flame, Zap, Calendar, BookOpen, User } from "lucide-react";

interface LeaderboardProfileModalProps {
  uid: string;
  displayName: string;
  avatar: string;
  equippedFrame: string;
  totalXP: number;
  streak: number;
  completedModules: number;
  level: number;
  levelTitle: string;
  leaderboardRank: number;
  onClose: () => void;
}

export function LeaderboardProfileModal({
  uid,
  displayName,
  avatar,
  equippedFrame,
  totalXP,
  streak,
  completedModules,
  level,
  levelTitle,
  leaderboardRank,
  onClose,
}: LeaderboardProfileModalProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const p = await getUserProfile(uid);
        if (!cancelled) setProfile(p);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [uid]);

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("de-DE", {
        year: "numeric",
        month: "long",
      })
    : null;

  const bio = profile?.bio?.trim() || null;
  const levelInfo = getUserLevel(totalXP);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6">
          {/* Avatar + Name */}
          <div className="flex flex-col items-center mb-5">
            <div className="mb-3">
              <AvatarFrame
                avatar={avatar}
                frameId={equippedFrame}
                level={level}
                leaderboardRank={leaderboardRank}
                size="xl"
              />
            </div>
            <h2 className="text-xl font-bold text-white">{displayName}</h2>
            <p className="text-sm text-slate-400 mt-0.5">
              {levelInfo.title} • Level {level}
            </p>
          </div>

          {/* Bio */}
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-slate-500" />
            </div>
          ) : (
            <>
              {bio && (
                <div className="mb-5 p-3 rounded-lg bg-slate-800/50 border border-slate-700/40">
                  <div className="flex items-center gap-2 mb-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Über mich</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{bio}</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-lg font-bold text-white">{totalXP}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">XP</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-lg font-bold text-white">{streak}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">Streak</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Trophy className="w-4 h-4 text-violet-400" />
                    <span className="text-lg font-bold text-white">{completedModules}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">Module</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/30 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="text-lg font-bold text-white">{level}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 uppercase tracking-wider">Level</p>
                </div>
              </div>

              {/* Join date */}
              {joinDate && (
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2 border-t border-slate-700/30">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Dabei seit {joinDate}</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
