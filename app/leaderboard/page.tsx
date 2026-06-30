"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { getLeaderboard, getUserLevel } from "@/lib/auth";
import type { LeaderboardEntry } from "@/lib/auth";
import { AvatarFrame } from "@/components/AvatarFrame";
import { getUnlockedAvatars } from "@/lib/rewards";
import { FrameOnlineStatus } from "@/components/OnlineStatus";
import { LeaderboardProfileModal } from "@/components/LeaderboardProfileModal";
import { Trophy, Flame, Zap, Crown, Lock, Eye, EyeOff, Loader2, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function LeaderboardPage() {
  const { user, toggleLeaderboard, updateProfile } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [optingIn, setOptingIn] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    loadEntries();
  }, [user?.leaderboardOptIn, user?.avatar, user?.equippedFrame]);

  async function loadEntries() {
    setLoading(true);
    try {
      const data = await getLeaderboard(50);
      setEntries(data);
    } catch (err) {
      console.error("Leaderboard error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleOptIn() {
    if (!user) return;
    setOptingIn(true);
    try {
      await toggleLeaderboard(!user.leaderboardOptIn);
      // Reload nach kurzem Delay (Firestore braucht manchmal Moment)
      setTimeout(() => loadEntries(), 500);
    } finally {
      setOptingIn(false);
    }
  }

  const isOptedIn = user?.leaderboardOptIn ?? false;
  const userRank = user ? entries.findIndex((e) => e.uid === user.uid) + 1 : 0;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
          <Trophy className="w-10 h-10 text-amber-400" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Bestenliste
        </h1>
        <p className="text-slate-400 text-lg">Vergleiche deinen Fortschritt mit anderen Lernenden</p>
      </div>

      {/* Opt-in Banner */}
      {user && !isOptedIn && (
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">Bestenliste deaktiviert</h3>
              <p className="text-slate-400 text-sm mt-1">
                Aktiviere die Bestenliste, um dich mit anderen zu vergleichen. Dein Name, Avatar und Fortschritt werden angezeigt.
                Du kannst jederzeit wieder austreten.
              </p>
            </div>
            <button
              onClick={handleToggleOptIn}
              disabled={optingIn}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-500/20 flex-shrink-0 disabled:opacity-50"
            >
              {optingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}
              Bestenliste aktivieren
            </button>
          </div>
        </div>
      )}

      {/* User Position */}
      {user && isOptedIn && userRank > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-violet-500/10 to-blue-500/10 border border-violet-500/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-violet-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-400">Dein Rang</p>
              <p className="text-2xl font-bold text-white">
                Platz {userRank} <span className="text-slate-500 text-lg">von {entries.length}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Deine XP</p>
              <p className="text-xl font-bold text-amber-400">{user.totalXP}</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-20">
          <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">Noch keine Teilnehmer</h3>
          <p className="text-slate-500">Sei der Erste, der die Bestenliste aktiviert!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => {
            const rank = index + 1;
            const isCurrentUser = user?.uid === entry.uid;

            // Für den aktuellen User: lokale Auth-Daten verwenden (sofort aktuell nach Profiländerung)
            const effectiveEntry = isCurrentUser && user
              ? { ...entry, avatar: user.avatar, equippedFrame: user.equippedFrame || "none" }
              : entry;

            const levelInfo = getUserLevel(effectiveEntry.totalXP);
            const medalIcon = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

            // Zeige IMMER was der User ausgewaehlt hat, kein rang-basiertes Override
            const displayFrame = effectiveEntry.equippedFrame;
            const displayAvatar = effectiveEntry.avatar;

            return (
              <div
                key={entry.uid}
                onClick={() => setSelectedEntry(entry)}
                className={`relative flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-200 group cursor-pointer ${
                  isCurrentUser
                    ? "bg-blue-500/10 border border-blue-500/30 shadow-md shadow-blue-500/10"
                    : "bg-slate-800/40 border border-slate-700/40 hover:bg-slate-800/60 hover:border-slate-700/60"
                }`}
              >
                {/* Rank */}
                <div className="w-10 flex items-center justify-center flex-shrink-0">
                  {medalIcon ? (
                    <span className="text-2xl">{medalIcon}</span>
                  ) : (
                    <span className={`text-lg font-bold ${rank <= 10 ? "text-slate-300" : "text-slate-500"}`}>
                      {rank}
                    </span>
                  )}
                </div>

                {/* Avatar with Frame + Online Status */}
                <div className="relative">
                  <AvatarFrame
                    avatar={displayAvatar}
                    frameId={displayFrame}
                    level={entry.level}
                    leaderboardRank={rank}
                    size="md"
                  />
                  <FrameOnlineStatus uid={entry.uid} hidden={false} className="-bottom-0.5 -right-0.5" />
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <p className={`font-semibold truncate ${isCurrentUser ? "text-blue-300" : "text-white"}`}>
                        {entry.displayName}
                      </p>
                    </div>
                    {isCurrentUser && (
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-bold rounded-md uppercase">
                        Du
                      </span>
                    )}
                    {rank === 1 && <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {levelInfo.title} • Level {levelInfo.level}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span>{entry.streak}</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Trophy className="w-3.5 h-3.5 text-violet-400" />
                      <span>{entry.completedModules}</span>
                    </div>
                  </div>
                  <div className="text-right min-w-[70px]">
                    <div className="flex items-center gap-1 justify-end">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-lg font-bold text-white">{entry.totalXP}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider self-end mb-0.5">XP</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      {user && isOptedIn && (
        <div className="mt-8 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <EyeOff className="w-3.5 h-3.5" />
            <span>
              <Link href="/profile" className="text-slate-400 hover:text-white underline underline-offset-2">
                Profil → Einstellungen
              </Link>{" "}
              zum Deaktivieren
            </span>
          </div>
          <span>Daten werden DSGVO-konform verarbeitet</span>
        </div>
      )}

      {/* Not logged in */}
      {!user && (
        <div className="mt-8 text-center py-12 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <Lock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">Nicht eingeloggt</h3>
          <p className="text-slate-500 text-sm mb-4">Melde dich an, um die Bestenliste zu sehen</p>
        </div>
      )}

      {/* Profile Modal */}
      {selectedEntry && (
        <LeaderboardProfileModal
          uid={selectedEntry.uid}
          displayName={selectedEntry.displayName}
          avatar={selectedEntry.avatar}
          equippedFrame={selectedEntry.equippedFrame}
          totalXP={selectedEntry.totalXP}
          streak={selectedEntry.streak}
          completedModules={selectedEntry.completedModules}
          level={selectedEntry.level}
          levelTitle={selectedEntry.levelTitle}
          leaderboardRank={entries.findIndex(e => e.uid === selectedEntry.uid) + 1}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
}
