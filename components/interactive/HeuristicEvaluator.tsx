"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Eye } from "lucide-react";

interface Heuristic {
  id: number;
  name: string;
  description: string;
  example_good: string;
  example_bad: string;
}

const heuristics: Heuristic[] = [
  {
    id: 1,
    name: "Sichtbarkeit des Systemstatus",
    description: "Das System hält den Nutzer immer über den aktuellen Stand informiert.",
    example_good: "Fortschrittsbalken beim Download",
    example_bad: "Download ohne Anzeige — 'Lädt es noch?'",
  },
  {
    id: 2,
    name: "Übereinstimmung mit der realen Welt",
    description: "Das System spricht die Sprache des Nutzers, nicht die des Systems.",
    example_good: "🗑️ Papierkorb-Symbol auf dem Desktop",
    example_bad: "💾 Diskette als 'Speichern' für junge Generationen",
  },
  {
    id: 3,
    name: "Kontrolle und Freiheit",
    description: "Nutzer brauchen einen 'Notfall-Exit' — unerwünschte Aktionen rückgängig machen.",
    example_good: "Strg+Z zum Rückgängig machen",
    example_bad: "Kreuz bei Werbeanzeigen, das nicht funktioniert",
  },
  {
    id: 4,
    name: "Konsistenz und Standards",
    description: "Gleiches sollte gleich aussehen und gleich funktionieren.",
    example_good: "Kamera-Icon immer oben rechts auf dem Smartphone",
    example_bad: "Taschenlampen-Funktion per Doppelklick Seitentaste (Android)",
  },
  {
    id: 5,
    name: "Fehlervermeidung",
    description: "Verhindere Fehler, bevor sie passieren — nicht nur Fehlermeldungen zeigen.",
    example_good: "'Betreff fehlt!' beim E-Mail-Versand",
    example_bad: "Spielstand nur manuell speichern (Datenverlust möglich)",
  },
  {
    id: 6,
    name: "Wiedererkennen statt Erinnern",
    description: "Mache Optionen sichtbar — der Nutzer soll nicht raten müssen.",
    example_good: "Pokémon-Kampf-Oberfläche mit sichtbaren Aktionen",
    example_bad: "SAP-Text ohne Kontext — 'Was war nochmal F4?'",
  },
  {
    id: 7,
    name: "Flexibilität und Effizienz",
    description: "Anfänger UND Experten sollten das System effizient nutzen können.",
    example_good: "GitLab mit Klickibunti UND Console",
    example_bad: "Altes SAP — nur Shortcuts, keine Maus-Alternative",
  },
  {
    id: 8,
    name: "Ästhetisches und minimalistisches Design",
    description: "Jede Information auf dem Screen sollte relevant sein — nichts überflüssiges.",
    example_good: "Fire-TV Fernbedienung — nur nötige Knöpfe",
    example_bad: "Ali Express — überladene Oberfläche",
  },
  {
    id: 9,
    name: "Nutzer bei Fehlern unterstützen",
    description: "Fehlermeldungen solltenverständlich sein und einen Lösungsweg zeigen.",
    example_good: "'Datei nicht gefunden. Prüfe den Pfad: /documents/'",
    example_bad: "'Error 0x80070005' — ohne Kontext",
  },
  {
    id: 10,
    name: "Hilfe und Dokumentation",
    description: "Im Idealfall braucht der Nutzer keine Hilfe. Falls doch, sollte sie leicht zu finden sein.",
    example_good: "git help — sofortige Kontexthilfe",
    example_bad: "Schulung nötig für einfache Funktionen (Vplan)",
  },
];

export default function HeuristicEvaluator() {
  const [ratings, setRatings] = useState<Record<number, "good" | "bad" | "neutral">>({});
  const [selectedHeuristic, setSelectedHeuristic] = useState<number | null>(null);
  const [showExamples, setShowExamples] = useState(false);

  const rate = (id: number, rating: "good" | "bad" | "neutral") => {
    setRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const getScore = () => {
    const total = Object.keys(ratings).length;
    if (total === 0) return 0;
    const good = Object.values(ratings).filter((r) => r === "good").length;
    return Math.round((good / total) * 100);
  };

  const getScoreColor = () => {
    const score = getScore();
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const reset = () => {
    setRatings({});
    setSelectedHeuristic(null);
    setShowExamples(false);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        <Eye className="w-5 h-5 text-pink-400" />
        Nielsen Heuristik Evaluator
      </h3>
      <p className="text-gray-400 text-sm mb-4">
        Bewerte ein Interface gegen Nielsens 10 Usability-Heuristiken.
      </p>

      {/* Score */}
      <div className="bg-gray-800 rounded-lg p-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-gray-400 text-sm">Usability-Score:</span>
          <span className={`ml-2 text-2xl font-bold ${getScoreColor()}`}>
            {getScore()}%
          </span>
        </div>
        <div className="text-gray-400 text-sm">
          {Object.keys(ratings).length} / {heuristics.length} bewertet
        </div>
      </div>

      {/* Heuristics List */}
      <div className="space-y-3 mb-4">
        {heuristics.map((h) => (
          <div
            key={h.id}
            className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all ${
              selectedHeuristic === h.id ? "ring-2 ring-pink-500" : "hover:bg-gray-750"
            }`}
            onClick={() => {
              setSelectedHeuristic(selectedHeuristic === h.id ? null : h.id);
              setShowExamples(false);
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-pink-400 font-bold text-sm w-6">{h.id}.</span>
                <span className="text-white font-medium text-sm">{h.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rate(h.id, "good");
                  }}
                  className={`p-1.5 rounded transition-colors ${
                    ratings[h.id] === "good"
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-green-600/20 hover:text-green-400"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rate(h.id, "neutral");
                  }}
                  className={`p-1.5 rounded transition-colors ${
                    ratings[h.id] === "neutral"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-yellow-600/20 hover:text-yellow-400"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    rate(h.id, "bad");
                  }}
                  className={`p-1.5 rounded transition-colors ${
                    ratings[h.id] === "bad"
                      ? "bg-red-600 text-white"
                      : "bg-gray-700 text-gray-400 hover:bg-red-600/20 hover:text-red-400"
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedHeuristic === h.id && (
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-gray-300 text-sm mb-3">{h.description}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowExamples(!showExamples);
                  }}
                  className="text-pink-400 text-xs hover:text-pink-300 transition-colors"
                >
                  {showExamples ? "Beispiele ausblenden" : "Beispiele anzeigen"}
                </button>
                {showExamples && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="bg-green-900/30 rounded p-2">
                      <span className="text-green-400 text-xs font-semibold">✅ Gut:</span>
                      <p className="text-gray-300 text-xs mt-1">{h.example_good}</p>
                    </div>
                    <div className="bg-red-900/30 rounded p-2">
                      <span className="text-red-400 text-xs font-semibold">❌ Schlecht:</span>
                      <p className="text-gray-300 text-xs mt-1">{h.example_bad}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reset */}
      <div className="flex justify-end">
        <button
          onClick={reset}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          Zurücksetzen
        </button>
      </div>
    </div>
  );
}
