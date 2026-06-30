"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { getApp } from "@/lib/firebase";

const ONLINE_THRESHOLD = 60_000; // 60 Sekunden

function getDb() {
  return getFirestore(getApp());
}

interface OnlineStatusProps {
  uid: string;
  hidden?: boolean;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

const SIZES = {
  sm: "w-2.5 h-2.5",
  md: "w-3 h-3",
  lg: "w-4 h-4",
};

/**
 * Zeigt den Online-Status eines Users an (Echtzeit via Firestore).
 */
export function OnlineStatus({ uid, hidden, size = "sm", showText = false, className = "" }: OnlineStatusProps) {
  const isOnline = useOnlineStatus(uid, hidden);

  if (hidden) return null;

  const s = SIZES[size];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div
        className={`${s} rounded-full flex-shrink-0 transition-colors duration-300 ${
          isOnline
            ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
            : "bg-slate-500"
        }`}
        title={isOnline ? "Online" : "Offline"}
      />
      {showText && (
        <span className={`text-xs ${isOnline ? "text-emerald-400" : "text-slate-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      )}
    </div>
  );
}

/**
 * Online-Indicator für den AvatarFrame — sitzt am Rahmen.
 */
export function FrameOnlineStatus({ uid, hidden, className = "" }: { uid: string; hidden?: boolean; className?: string }) {
  const isOnline = useOnlineStatus(uid, hidden);

  if (hidden) return null;

  return (
    <div
      className={`absolute w-4 h-4 rounded-full border-2 border-slate-900 transition-all duration-300 z-20 ${
        isOnline
          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"
          : "bg-slate-500"
      } ${className}`}
    />
  );
}

/**
 * Hook: Echtzeit Online-Status via Firestore onSnapshot.
 */
export function useOnlineStatus(uid: string, hidden?: boolean): boolean {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (hidden || !uid) { setIsOnline(false); return; }

    const userRef = doc(getDb(), "users", uid);
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const state = data?.status?.state;
        const lastChanged = data?.status?.lastChanged;
        if (state === "online" && lastChanged) {
          const age = Date.now() - new Date(lastChanged).getTime();
          setIsOnline(age < ONLINE_THRESHOLD);
        } else {
          setIsOnline(false);
        }
      } else {
        setIsOnline(false);
      }
    }, () => setIsOnline(false));

    return () => unsubscribe();
  }, [uid, hidden]);

  return isOnline;
}
