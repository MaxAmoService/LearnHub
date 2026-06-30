"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap } from "lucide-react";

interface XPPopup {
  id: number;
  amount: number;
  x: number;
  y: number;
}

let popupId = 0;
const listeners = new Set<(popup: XPPopup) => void>();

export function triggerXPPopup(amount: number, x?: number, y?: number) {
  const popup: XPPopup = {
    id: ++popupId,
    amount,
    x: x ?? window.innerWidth / 2,
    y: y ?? window.innerHeight / 2 - 50,
  };
  listeners.forEach((fn) => fn(popup));
}

export function XPNotification() {
  const [popups, setPopups] = useState<XPPopup[]>([]);

  const addPopup = useCallback((popup: XPPopup) => {
    setPopups((prev) => [...prev, popup]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popup.id));
    }, 1500);
  }, []);

  useEffect(() => {
    listeners.add(addPopup);
    return () => { listeners.delete(addPopup); };
  }, [addPopup]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {popups.map((p) => (
        <div
          key={p.id}
          className="absolute animate-xp-float"
          style={{ left: p.x, top: p.y, transform: "translate(-50%, -50%)" }}
        >
          <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full shadow-lg shadow-amber-500/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-lg font-bold text-amber-300">+{p.amount} XP</span>
          </div>
        </div>
      ))}
    </div>
  );
}
