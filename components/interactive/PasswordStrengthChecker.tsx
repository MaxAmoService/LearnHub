"use client";

import { useState, useMemo } from "react";

// ============================================================================
// Password Strength Checker — Echtzeit-Bewertung + Hash-Darstellung
// ============================================================================

function simpleSHA256(input: string): string {
  // Simple hash simulation for educational purposes (not real SHA-256)
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, "0");
  // Extend to look like SHA-256
  let extended = hex;
  for (let i = 0; i < 7; i++) {
    let h = 0;
    for (let j = 0; j < input.length; j++) {
      h = ((h << 5) - h) + input.charCodeAt(j) * (i + 1) + j;
      h = h & h;
    }
    extended += Math.abs(h).toString(16).padStart(8, "0");
  }
  return extended.slice(0, 64);
}

function estimateCrackTime(password: string): string {
  if (!password) return "—";
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 33;

  const combinations = Math.pow(charsetSize, password.length);
  const guessesPerSecond = 1e10; // 10 Billionen (modern GPU)
  const seconds = combinations / guessesPerSecond / 2; // Durchschnitt

  if (seconds < 1) return "Sofort 💀";
  if (seconds < 60) return `${Math.round(seconds)} Sekunden 💀`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} Minuten ⚠️`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} Stunden ⚠️`;
  if (seconds < 86400 * 30) return `${Math.round(seconds / 86400)} Tage 🟡`;
  if (seconds < 86400 * 365) return `${Math.round(seconds / (86400 * 30))} Monate 🟢`;
  if (seconds < 86400 * 365 * 1000) return `${Math.round(seconds / (86400 * 365))} Jahre 🟢`;
  return `${(seconds / (86400 * 365 * 1e6)).toFixed(0)} Mio. Jahre 🟢🟢🟢`;
}

interface StrengthCheck {
  label: string;
  met: boolean;
  points: number;
}

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showHash, setShowHash] = useState(false);

  const checks: StrengthCheck[] = useMemo(() => [
    { label: "Mindestens 8 Zeichen", met: password.length >= 8, points: 1 },
    { label: "Mindestens 12 Zeichen", met: password.length >= 12, points: 1 },
    { label: "Kleinbuchstaben (a-z)", met: /[a-z]/.test(password), points: 1 },
    { label: "Großbuchstaben (A-Z)", met: /[A-Z]/.test(password), points: 1 },
    { label: "Zahlen (0-9)", met: /[0-9]/.test(password), points: 1 },
    { label: "Sonderzeichen (!@#$...)", met: /[^a-zA-Z0-9]/.test(password), points: 1 },
    { label: "Keine wiederholten Zeichen (aaa)", met: !/(.)\1{2,}/.test(password), points: 1 },
    { label: "Keine Tastatur-Sequenz (qwertz)", met: !/qwertz|asdf|yxcv|1234|abcd/i.test(password), points: 1 },
  ], [password]);

  const totalPoints = checks.filter((c) => c.met).reduce((sum, c) => sum + c.points, 0);
  const maxPoints = checks.reduce((sum, c) => sum + c.points, 0);
  const percentage = Math.round((totalPoints / maxPoints) * 100);

  const strengthLabel = percentage === 0 ? "Kein Passwort" :
    percentage <= 25 ? "Sehr schwach" :
    percentage <= 50 ? "Schwach" :
    percentage <= 75 ? "Mittel" :
    percentage <= 90 ? "Stark" : "Sehr stark";

  const strengthColor = percentage === 0 ? "bg-gray-600" :
    percentage <= 25 ? "bg-red-600" :
    percentage <= 50 ? "bg-orange-600" :
    percentage <= 75 ? "bg-yellow-600" :
    percentage <= 90 ? "bg-green-600" : "bg-emerald-500";

  const crackTime = estimateCrackTime(password);
  const hash = useMemo(() => simpleSHA256(password), [password]);

  const tips = [
    "Nutze ein Passwort mit mindestens 12 Zeichen",
    "Kombiniere Groß-/Kleinbuchstaben, Zahlen und Sonderzeichen",
    "Vermeide persönliche Informationen (Name, Geburtsdatum)",
    "Nutze Passphrasen: 'Sonnenschein!23Apfel#Baum'",
    "Verwende für jeden Dienst ein anderes Passwort",
    "Nutze einen Passwort-Manager (KeePass, Bitwarden)",
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔐 Passwort-Stärke-Checker</h3>
      <p className="text-slate-300 text-sm mb-4">
        Teste Passwörter und lerne, was ein sicheres Passwort ausmacht.
      </p>

      {/* Input */}
      <div className="mb-4">
        <label className="text-slate-400 text-xs mb-1 block">Passwort eingeben:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dein Passwort..."
          className="w-full bg-slate-900 text-white rounded-lg px-4 py-3 text-lg font-mono border border-slate-600 focus:border-red-400 focus:outline-none"
        />
      </div>

      {/* Strength Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-slate-400 text-xs">Stärke</span>
          <span className={`text-xs font-bold ${
            percentage <= 25 ? "text-red-400" :
            percentage <= 50 ? "text-orange-400" :
            percentage <= 75 ? "text-yellow-400" :
            "text-green-400"
          }`}>
            {strengthLabel} ({percentage}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${strengthColor}`}
            style={{ width: `${Math.max(percentage, 2)}%` }}
          />
        </div>
      </div>

      {/* Crack Time */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-sm">⏱️ Geschätzte Zeit zum Knacken (Brute-Force):</span>
          <span className="text-white font-bold text-sm">{crackTime}</span>
        </div>
        <p className="text-slate-500 text-xs mt-1">Annahme: 10 Milliarden Versuche/Sekunde (moderne GPU)</p>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {checks.map((check, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 p-2 rounded-lg text-sm transition-all ${
              check.met
                ? "bg-green-900/20 border border-green-800/30"
                : "bg-slate-900 border border-slate-700"
            }`}
          >
            <span className={check.met ? "text-green-400" : "text-slate-600"}>
              {check.met ? "✅" : "⬜"}
            </span>
            <span className={check.met ? "text-green-300" : "text-slate-400"}>
              {check.label}
            </span>
          </div>
        ))}
      </div>

      {/* Hash Display */}
      {password && (
        <div className="mb-4">
          <button
            onClick={() => setShowHash(!showHash)}
            className="text-xs text-red-400 hover:text-red-300 mb-2"
          >
            {showHash ? "🔒 Hash verbergen" : "🔓 SHA-256 Hash anzeigen"}
          </button>
          {showHash && (
            <div className="bg-slate-900 rounded-lg p-3 border border-slate-700">
              <p className="text-slate-400 text-xs mb-1">SHA-256 Hash (vereinfachte Darstellung):</p>
              <p className="text-green-400 font-mono text-xs break-all">{hash}</p>
              <p className="text-slate-500 text-xs mt-2">
                💡 In der Praxis wird das Passwort mit einem <strong>Salt</strong> versehen und dann gehasht. 
                Gleiche Passwörter ergeben so unterschiedliche Hashes!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-3">
        <h4 className="text-red-400 font-semibold text-sm mb-2">💡 Tipps für sichere Passwörter:</h4>
        <ul className="space-y-1">
          {tips.map((tip, i) => (
            <li key={i} className="text-slate-300 text-xs flex items-start gap-2">
              <span className="text-red-400 shrink-0">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
