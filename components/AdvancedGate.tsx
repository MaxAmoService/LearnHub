"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

const STORAGE_KEY = "extended_unlocked";

export function isExtendedUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function unlockExtended() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch { /* ignore */ }
}

interface ExtendedGateProps {
  password: string;
  categoryName: string;
  children: ReactNode;
}

export function ExtendedGate({ password, categoryName, children }: ExtendedGateProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isExtendedUnlocked());
  }, []);

  const handleSubmit = () => {
    if (input === password) {
      unlockExtended();
      window.location.reload();
    } else {
      setError(true);
      setInput("");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="max-w-md mx-auto my-16 px-4">
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-amber-400" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          {categoryName}
        </h2>

        <p className="text-slate-400 text-sm mb-6">
          Dieser Bereich ist nur mit Passwort zugänglich.
        </p>

        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <input
              type={showPassword ? "text" : "password"}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Passwort eingeben"
              autoFocus
              className={`w-full px-4 py-3 bg-slate-900/80 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                error
                  ? "border-red-500/50 focus:ring-red-500/20"
                  : "border-slate-700/50 focus:ring-amber-500/20 focus:border-amber-500/50"
              }`}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl font-semibold text-sm transition-all"
          >
            Login
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs animate-pulse">
            Falsches Passwort — versuche es erneut.
          </p>
        )}
      </div>
    </div>
  );
}
