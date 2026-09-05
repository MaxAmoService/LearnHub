"use client";

import { AlertTriangle, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="text-6xl mb-4">💥</div>
          <h1 className="text-3xl font-bold mb-2">Kritischer Fehler</h1>
          <p className="text-slate-400 mb-6">Die App ist abgestürzt. Bitte lade die Seite neu.</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
          >
            Seite neu laden
          </button>
        </div>
      </body>
    </html>
  );
}
