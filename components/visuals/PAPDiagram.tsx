"use client";

import React from "react";

interface PAPSymbolProps {
  width?: number;
  height?: number;
  className?: string;
}

export function PAPSymbolOverview({ width = 400, height = 500, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-5 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">PAP-Symbole nach DIN 66001</h3>
        <p className="text-sm text-slate-400">Die 5 Grundelemente des Programmablaufplans</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        {/* Start/Ende */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl border border-green-500/20 hover:border-green-500/40 transition-colors">
          <svg width="90" height="50" viewBox="0 0 200 80" className="shrink-0">
            <rect x="10" y="10" width="180" height="60" rx="30" ry="30" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">Start</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Start / Ende</p>
            <p className="text-slate-400 text-xs mt-0.5">Oval — Beginn oder Ende des Programms</p>
          </div>
        </div>

        {/* Operation */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-colors">
          <svg width="90" height="50" viewBox="0 0 200 80" className="shrink-0">
            <rect x="10" y="10" width="180" height="60" rx="4" ry="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="3" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">x = x + 1</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Operation</p>
            <p className="text-slate-400 text-xs mt-0.5">Rechteck — Berechnung, Zuweisung</p>
          </div>
        </div>

        {/* Entscheidung */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-colors">
          <svg width="90" height="60" viewBox="0 0 200 100" className="shrink-0">
            <polygon points="100,5 190,50 100,95 10,50" fill="#f59e0b" stroke="#b45309" strokeWidth="3" />
            <text x="100" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">x &gt; 5?</text>
            <text x="100" y="64" textAnchor="middle" fill="white" fontSize="11">(Ja / Nein)</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Entscheidung</p>
            <p className="text-slate-400 text-xs mt-0.5">Raute — Ja/Nein-Verzweigung</p>
          </div>
        </div>

        {/* Ein-/Ausgabe */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <svg width="100" height="50" viewBox="0 0 220 80" className="shrink-0">
            <polygon points="40,10 210,10 180,70 10,70" fill="#a855f7" stroke="#6d28d9" strokeWidth="3" />
            <text x="110" y="46" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">input(x)</text>
          </svg>
          <div>
            <p className="text-white font-semibold text-sm">Ein- / Ausgabe</p>
            <p className="text-slate-400 text-xs mt-0.5">Parallelogramm — Nutzereingabe oder Ausgabe</p>
          </div>
        </div>

        {/* Verbinder + Flusspfeil */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-colors sm:col-span-2">
          <svg width="60" height="50" viewBox="0 0 80 80" className="shrink-0">
            <circle cx="40" cy="40" r="28" fill="#06b6d4" stroke="#0891b2" strokeWidth="3" />
            <text x="40" y="44" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A</text>
          </svg>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Verbinder</p>
            <p className="text-slate-400 text-xs mt-0.5">Verbindung zwischen entfernten Punkten</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg">
            <svg width="30" height="14" viewBox="0 0 30 14">
              <line x1="0" y1="7" x2="20" y2="7" stroke="#94a3b8" strokeWidth="2.5" />
              <polygon points="20,2 30,7 20,12" fill="#94a3b8" />
            </svg>
            <span className="text-xs text-slate-400">Flusspfeil</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PAPExample({ width = 540, height = 780, className = "" }: PAPSymbolProps) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">☕ Beispiel: Kaffeemaschine</h3>
        <p className="text-sm text-slate-400">Ein kompletter PAP mit Entscheidung und Rückkopplung</p>
      </div>
      <div className="bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
        <svg width={width} height={height} viewBox="0 0 550 760" className="w-full h-auto">
          <defs>
            <marker id="ex-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
            </marker>
            <marker id="ex-arrow-green" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="ex-arrow-red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
          </defs>

          {/* START */}
          <rect x="170" y="15" width="120" height="48" rx="24" ry="24" fill="#22c55e" stroke="#15803d" strokeWidth="2.5" />
          <text x="230" y="44" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Start</text>
          <line x1="230" y1="63" x2="230" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Eingabe: Geld */}
          <polygon points="145,105 315,105 295,145 125,145" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="220" y="130" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Geld einwerfen</text>
          <line x1="220" y1="145" x2="220" y2="185" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Eingabe: Betrag */}
          <polygon points="145,190 315,190 295,230 125,230" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="220" y="215" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Betrag eingeben</text>
          <line x1="220" y1="230" x2="220" y2="275" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Entscheidung */}
          <polygon points="220,280 325,340 220,400 115,340" fill="#f59e0b" stroke="#b45309" strokeWidth="2.5" />
          <text x="220" y="335" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">Betrag</text>
          <text x="220" y="353" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">≥ Preis?</text>

          {/* JA-Pfeil */}
          <line x1="325" y1="340" x2="380" y2="340" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#ex-arrow-green)" />
          <rect x="366" y="314" width="28" height="18" rx="9" ry="9" fill="#22c55e" />
          <text x="380" y="327" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Ja</text>

          {/* Operation: Kaffee */}
          <rect x="385" y="318" width="80" height="44" rx="3" ry="3" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="425" y="338" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Kaffee</text>
          <text x="425" y="354" textAnchor="middle" fill="white" fontSize="10">zubereiten</text>
          <line x1="425" y1="362" x2="425" y2="410" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Ausgabe: Ihr Kaffee */}
          <polygon points="350,415 500,415 480,455 330,455" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="415" y="440" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Ihr Kaffee ☕</text>
          <line x1="415" y1="455" x2="415" y2="500" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />

          {/* Ende */}
          <rect x="355" y="505" width="120" height="48" rx="24" ry="24" fill="#ef4444" stroke="#dc2626" strokeWidth="2.5" />
          <text x="415" y="535" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">Ende</text>

          {/* NEIN-Pfeil */}
          <line x1="220" y1="400" x2="220" y2="460" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#ex-arrow-red)" />
          <rect x="206" y="420" width="28" height="18" rx="9" ry="9" fill="#ef4444" />
          <text x="220" y="433" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Nein</text>

          {/* Ausgabe: Zu wenig */}
          <polygon points="145,465 315,465 295,505 125,505" fill="#a855f7" stroke="#6d28d9" strokeWidth="2.5" />
          <text x="220" y="490" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Zu wenig Guthaben!</text>

          {/* Rückpfeil */}
          <line x1="220" y1="505" x2="220" y2="550" stroke="#94a3b8" strokeWidth="2" />
          <line x1="220" y1="550" x2="75" y2="550" stroke="#94a3b8" strokeWidth="2" />
          <line x1="75" y1="550" x2="75" y2="130" stroke="#94a3b8" strokeWidth="2" />
          <line x1="75" y1="130" x2="125" y2="130" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#ex-arrow)" />
          <text x="65" y="345" textAnchor="end" fill="#94a3b8" fontSize="11" transform="rotate(-90, 65, 345)">↩ Erneut versuchen</text>

          {/* Legende */}
          <g transform="translate(10, 660)">
            <rect x="0" y="0" width="14" height="14" rx="7" fill="#22c55e" />
            <text x="20" y="12" fill="#94a3b8" fontSize="11">Start/Ende</text>
            <rect x="110" y="0" width="14" height="14" rx="2" fill="#3b82f6" />
            <text x="130" y="12" fill="#94a3b8" fontSize="11">Operation</text>
            <polygon points="240,0 254,7 240,14 226,7" fill="#f59e0b" />
            <text x="262" y="12" fill="#94a3b8" fontSize="11">Entscheidung</text>
            <polygon points="0,28 14,21 28,28 14,35" fill="#a855f7" />
            <text x="36" y="30" fill="#94a3b8" fontSize="11">Ein-/Ausgabe</text>
            <line x1="180" y1="28" x2="210" y2="28" stroke="#94a3b8" strokeWidth="2" />
            <polygon points="210,23 220,28 210,33" fill="#94a3b8" />
            <text x="228" y="30" fill="#94a3b8" fontSize="11">Flusspfeil</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
