"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 max-w-md w-full text-center animate-slide-up">
        <div className="w-16 h-16 rounded-2xl bg-red-500/15 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Etwas ist schiefgelaufen</h2>
        <p className="text-slate-400 mb-6 text-sm">
          Diese Seite hat leider einen Fehler. Versuche es erneut oder kehre zum Dashboard zurück.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Erneut versuchen
          </button>
          <a
            href="/"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-sm text-slate-300 transition-colors"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
