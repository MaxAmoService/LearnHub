"use client";

import { useState, useMemo } from "react";
import {
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  Award,
  BarChart3,
  Calendar,
  Ruler,
  Trophy,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Eye,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SmartLetter = "S" | "M" | "A" | "R" | "T";

interface SmartCriterion {
  letter: SmartLetter;
  name: string;
  fullName: string;
  question: string;
  placeholder: string;
  tips: string[];
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface PresetGoal {
  label: string;
  type: "good" | "bad";
  values: Record<SmartLetter, string>;
}

interface FeedbackResult {
  rating: "good" | "okay" | "poor";
  message: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CRITERIA: SmartCriterion[] = [
  {
    letter: "S",
    name: "Spezifisch",
    fullName: "Spezifisch — Was genau?",
    question: "Was genau soll erreicht werden? Wer ist betroffen? Wo findet es statt?",
    placeholder: "z.B. Die Webentwicklungs-Abteilung soll...",
    tips: [
      "Nenne die beteiligten Personen oder Teams",
      "Beschreibe die konkrete Handlung oder das Ergebnis",
      "Vermeide vage Begriffe wie 'besser' oder 'mehr'",
    ],
    icon: <Target size={18} />,
    color: "text-red-400",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-500/50",
  },
  {
    letter: "M",
    name: "Messbar",
    fullName: "Messbar — Woran erkennt man es?",
    question: "Wie wird der Erfolg gemessen? Welche Kennzahlen oder Zahlen stehen fest?",
    placeholder: "z.B. ...die Ladezeit der Homepage auf unter 2 Sekunden senken...",
    tips: [
      "Definiere konkrete Zahlen oder Prozentwerte",
      "Benenne Messinstrumente oder KPIs",
      "Formuliere Schwellenwerte fuer Erfolg/Misserfolg",
    ],
    icon: <Ruler size={18} />,
    color: "text-blue-400",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-500/50",
  },
  {
    letter: "A",
    name: "Anspruchsvoll",
    fullName: "Anspruchsvoll — Herausfordernd genug?",
    question: "Ist das Ziel herausfordernd genug, um motivierend zu wirken? Fordert es das Team?",
    placeholder: "z.B. ...durch Optimierung von Bildern, Caching und CDN-Nutzung...",
    tips: [
      "Das Ziel sollte nicht zu einfach sein (sonst langweilig)",
      "Es sollte Kompetenzen erweitern oder neue Wege erfordern",
      "Ein wenig Unsicherheit gehoert dazu — Risiko ist okay",
    ],
    icon: <Star size={18} />,
    color: "text-amber-400",
    bgColor: "bg-amber-900/20",
    borderColor: "border-amber-500/50",
  },
  {
    letter: "R",
    name: "Realistisch",
    fullName: "Realistisch — Ist es umsetzbar?",
    question: "Ist das Ziel mit den verfuegbaren Ressourcen (Budget, Zeit, Personal) erreichbar?",
    placeholder: "z.B. ...mit dem aktuellen 4-köpfigen Team und dem bestehenden Budget...",
    tips: [
      "Pruefe: Sind genug Ressourcen vorhanden?",
      "Beruecksichtige Abhaengigkeiten und Risiken",
      "Ein ambitioeses Ziel ist gut — ein unmoegliches nicht",
    ],
    icon: <CheckCircle size={18} />,
    color: "text-emerald-400",
    bgColor: "bg-emerald-900/20",
    borderColor: "border-emerald-500/50",
  },
  {
    letter: "T",
    name: "Terminiert",
    fullName: "Terminiert — Bis wann?",
    question: "Gibt es einen konkreten Termin oder eine Frist? Ist der Zeitrahmen realistisch?",
    placeholder: "z.B. ...bis zum 30. September 2026.",
    tips: [
      "Setze ein konkretes Datum, nicht 'irgendwann'",
      "Definiere Meilensteine bei laengeren Zielen",
      "Der Termin sollte zum Umfang des Ziels passen",
    ],
    icon: <Calendar size={18} />,
    color: "text-purple-400",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-500/50",
  },
];

const PRESET_GOALS: PresetGoal[] = [
  {
    label: "Gutes Beispiel: Web-Projekt",
    type: "good",
    values: {
      S: "Das Frontend-Team soll die Startseite der Unternehmenswebsite optimieren",
      M: "Die Ladezeit (LCP) soll von 4,2s auf unter 2s gesenkt werden, gemessen mit Google Lighthouse",
      A: "Dafuer muessen Bilder optimiert, ein CDN eingerichtet und kritisches CSS extrahiert werden — neue Techniken fuer das Team",
      R: "Das 4-köpfige Team hat 2 Sprint-Wochen Erfahrung mit Performance-Optimierung und Zugang zu einem Cloudflare-CDN",
      T: "Fertig bis zum 30. September 2026, mit Meilenstein nach Sprint 1 (Bilder) und Sprint 2 (CDN + CSS)",
    },
  },
  {
    label: "Gutes Beispiel: Kundenzufriedenheit",
    type: "good",
    values: {
      S: "Der Kundenservice soll die Zufriedenheitsbewertung im Helpdesk-System verbessern",
      M: "Der NPS (Net Promoter Score) soll von +32 auf mindestens +45 steigen",
      A: "Dafuer werden neue Schulungen, ein erweitertes FAQ und ein Ticket-Eskalationsprozess eingefuehrt",
      R: "Budget fuer Schulungen ist genehmigt, 2 neue Mitarbeiter starten im Juli, die Helpdesk-Software unterstuetzt Eskalationen",
      T: "Bis zum 31.12.2026, mit monatlicher Messung und Quartals-Review",
    },
  },
  {
    label: "Schlechtes Beispiel: Zu vage",
    type: "bad",
    values: {
      S: "Wir wollen unsere Website verbessern",
      M: "Sie soll besser werden",
      A: "Das schaffen wir schon",
      R: "Ja, irgendwie schon",
      T: "Bald",
    },
  },
  {
    label: "Schlechtes Beispiel: Unrealistisch",
    type: "bad",
    values: {
      S: "Der eine Praktikant soll die komplette ERP-Software neu entwickeln",
      M: "Alle 50 Prozesse sollen digitalisiert werden",
      A: "Er muss dafuer 3 neue Programmiersprachen lernen",
      R: "Er hat 4 Wochen Zeit und keinen Rechner",
      T: "Bis naechsten Montag",
    },
  },
];

const MIN_TEXT_LENGTH = 10;
const GOOD_TEXT_LENGTH = 40;

// ---------------------------------------------------------------------------
// Feedback logic
// ---------------------------------------------------------------------------

function evaluateCriterion(criterion: SmartCriterion, text: string): FeedbackResult {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { rating: "poor", message: `${criterion.name} fehlt komplett.` };
  }

  if (trimmed.length < MIN_TEXT_LENGTH) {
    return {
      rating: "poor",
      message: `Zu kurz! ${criterion.name} braucht mehr Details (mindestens ${MIN_TEXT_LENGTH} Zeichen).`,
    };
  }

  // Heuristic checks per criterion
  const lower = trimmed.toLowerCase();

  if (criterion.letter === "M") {
    const hasNumber = /\d/.test(trimmed);
    if (!hasNumber) {
      return {
        rating: "okay",
        message: "Gut formuliert, aber konkrete Zahlen oder Kennzahlen wuerden es messbarer machen.",
      };
    }
  }

  if (criterion.letter === "T") {
    const hasDate = /\d{1,2}[./]\d{1,2}[./]\d{2,4}|\d{4}|bis\s+(zum|ende|mitte)|quartal|monat|jahr|woche/i.test(trimmed);
    if (!hasDate) {
      return {
        rating: "okay",
        message: "Gut, aber ein konkretes Datum oder Zeitrahmen wuerde die Terminierung praeziser machen.",
      };
    }
  }

  if (criterion.letter === "S") {
    const vagueWords = ["irgendwie", "vielleicht", "besser", "mehr", "alles", "sachen"];
    const hasVague = vagueWords.some((w) => lower.includes(w));
    if (hasVague) {
      return {
        rating: "okay",
        message: "Enthaelt vage Begriffe. Versuche, konkreter zu formulieren — wer, was, wo?",
      };
    }
  }

  if (trimmed.length < GOOD_TEXT_LENGTH) {
    return {
      rating: "okay",
      message: `Guter Anfang! ${criterion.name} koennte noch etwas ausfuehrlicher sein (${GOOD_TEXT_LENGTH}+ Zeichen ideal).`,
    };
  }

  return {
    rating: "good",
    message: `Sehr gut! ${criterion.name} ist klar und aussagekraeftig formuliert.`,
  };
}

function getOverallQuality(
  ratings: Record<SmartLetter, string>
): { score: number; label: string; color: string; message: string } {
  const filledCriteria = CRITERIA.filter((c) => ratings[c.letter]?.trim().length > 0);
  if (filledCriteria.length === 0) {
    return { score: 0, label: "Nicht bewertbar", color: "text-gray-500", message: "Beginne mit der Eingabe, um eine Bewertung zu erhalten." };
  }

  let totalScore = 0;
  for (const c of CRITERIA) {
    const text = ratings[c.letter] || "";
    const feedback = evaluateCriterion(c, text);
    if (feedback.rating === "good") totalScore += 2;
    else if (feedback.rating === "okay") totalScore += 1;
  }

  const maxScore = CRITERIA.length * 2;
  const pct = Math.round((totalScore / maxScore) * 100);

  if (pct >= 80) {
    return { score: pct, label: "Ausgezeichnet", color: "text-emerald-400", message: "Dein SMART-Ziel ist klar formuliert, messbar und realistisch. Sehr gut!" };
  }
  if (pct >= 50) {
    return { score: pct, label: "Solide", color: "text-amber-400", message: "Guter Ansatz! Einige Kriterien koennten noch praeziser formuliert werden." };
  }
  if (pct > 0) {
    return { score: pct, label: "Ausbaufaehig", color: "text-red-400", message: "Das Ziel braucht noch Arbeit. Schaue dir die Hinweise zu jedem Kriterium an." };
  }
  return { score: 0, label: "Nicht bewertbar", color: "text-gray-500", message: "Beginne mit der Eingabe, um eine Bewertung zu erhalten." };
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {CRITERIA.map((c, idx) => {
        const isActive = idx === currentStep;
        const isCompleted = idx < currentStep;
        return (
          <div key={c.letter} className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all duration-300 ${
                isActive
                  ? `${c.borderColor} ${c.bgColor} ${c.color} scale-110`
                  : isCompleted
                  ? "border-emerald-500 bg-emerald-900/30 text-emerald-400"
                  : "border-gray-600 bg-gray-800 text-gray-500"
              }`}
            >
              {isCompleted ? <CheckCircle size={14} /> : c.letter}
            </div>
            {idx < totalSteps - 1 && (
              <div
                className={`hidden sm:block w-6 h-0.5 rounded-full transition-colors duration-300 ${
                  isCompleted ? "bg-emerald-500" : "bg-gray-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FeedbackBadge({ feedback }: { feedback: FeedbackResult }) {
  const config = {
    good: {
      icon: <CheckCircle size={14} className="text-emerald-400" />,
      bg: "bg-emerald-900/20",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
    },
    okay: {
      icon: <AlertTriangle size={14} className="text-amber-400" />,
      bg: "bg-amber-900/20",
      border: "border-amber-500/30",
      text: "text-amber-300",
    },
    poor: {
      icon: <AlertTriangle size={14} className="text-red-400" />,
      bg: "bg-red-900/20",
      border: "border-red-500/30",
      text: "text-red-300",
    },
  };

  const c = config[feedback.rating];

  return (
    <div className={`flex items-start gap-2 p-2.5 rounded-lg border ${c.bg} ${c.border} animate-fadeIn`}>
      <span className="mt-0.5 shrink-0">{c.icon}</span>
      <p className={`text-xs sm:text-sm leading-relaxed ${c.text}`}>{feedback.message}</p>
    </div>
  );
}

function QualityMeter({
  overall,
}: {
  overall: { score: number; label: string; color: string; message: string };
}) {
  const barColor =
    overall.score >= 80
      ? "from-emerald-500 to-emerald-400"
      : overall.score >= 50
      ? "from-amber-500 to-amber-400"
      : overall.score > 0
      ? "from-red-500 to-red-400"
      : "from-gray-600 to-gray-500";

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 sm:p-5 space-y-3">
      <div className="flex items-center gap-2">
        <BarChart3 size={20} className="text-cyan-400" />
        <h3 className="text-sm sm:text-base font-bold text-white">SMART-Qualitaet</h3>
        <span className={`ml-auto text-sm font-bold ${overall.color}`}>{overall.score}%</span>
      </div>

      <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${barColor} rounded-full transition-all duration-700`}
          style={{ width: `${overall.score}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${overall.color}`}>{overall.label}</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{overall.message}</p>

      {/* Per-criterion mini badges */}
      <div className="flex flex-wrap gap-2 pt-1">
        {CRITERIA.map((c) => {
          // We can't access the ratings directly here, so we show the letter
          return (
            <div
              key={c.letter}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${c.borderColor} ${c.bgColor} ${c.color}`}
            >
              {c.letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function SMARTGoalBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<SmartLetter, string>>({
    S: "",
    M: "",
    A: "",
    R: "",
    T: "",
  });
  const [showPresets, setShowPresets] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showTips, setShowTips] = useState(true);

  const currentCriterion = CRITERIA[currentStep];
  const currentValue = values[currentCriterion.letter];
  const currentFeedback = useMemo(
    () => evaluateCriterion(currentCriterion, currentValue),
    [currentCriterion, currentValue]
  );

  const overall = useMemo(() => getOverallQuality(values), [values]);

  const filledCount = CRITERIA.filter((c) => values[c.letter]?.trim().length > 0).length;
  const canShowOverview = filledCount >= 3;

  const updateValue = (text: string) => {
    setValues((prev) => ({ ...prev, [currentCriterion.letter]: text }));
  };

  const goNext = () => {
    if (currentStep < CRITERIA.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowOverview(true);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const loadPreset = (preset: PresetGoal) => {
    setValues(preset.values);
    setCurrentStep(0);
    setShowOverview(false);
    setShowPresets(false);
  };

  const resetAll = () => {
    setValues({ S: "", M: "", A: "", R: "", T: "" });
    setCurrentStep(0);
    setShowOverview(false);
  };

  const getAssembledGoal = (): string => {
    const parts: string[] = [];
    if (values.S.trim()) parts.push(values.S.trim());
    if (values.M.trim()) parts.push(values.M.trim());
    if (values.A.trim()) parts.push(values.A.trim());
    if (values.R.trim()) parts.push(values.R.trim());
    if (values.T.trim()) parts.push(values.T.trim());
    return parts.join(". ") + (parts.length > 0 ? "." : "");
  };

  return (
    <div className="w-full bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-600/20 rounded-lg">
            <Target size={24} className="text-cyan-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white">SMART-Ziel Builder</h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Erstelle ein klar formuliertes Projektziel nach der SMART-Methode — Schritt fuer Schritt.
            </p>
          </div>
        </div>

        {/* SMART badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {CRITERIA.map((c) => (
            <div
              key={c.letter}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.borderColor} ${c.bgColor} ${c.color}`}
            >
              <span className="font-bold">{c.letter}</span>
              <span className="hidden sm:inline">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-5">
        {/* Preset examples toggle */}
        <div>
          <button
            onClick={() => setShowPresets(!showPresets)}
            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <BookOpen size={16} />
            Beispiele laden
            {showPresets ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showPresets && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_GOALS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => loadPreset(preset)}
                  className={`flex items-center gap-2 p-3 rounded-lg border text-left text-sm transition-all hover:scale-[1.01] ${
                    preset.type === "good"
                      ? "border-emerald-500/30 bg-emerald-900/10 hover:border-emerald-500/50"
                      : "border-red-500/30 bg-red-900/10 hover:border-red-500/50"
                  }`}
                >
                  {preset.type === "good" ? (
                    <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle size={16} className="text-red-400 shrink-0" />
                  )}
                  <span className="text-gray-300">{preset.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center">
          <ProgressIndicator currentStep={currentStep} totalSteps={CRITERIA.length} />
        </div>

        {/* Current step */}
        {!showOverview ? (
          <div className="space-y-4">
            {/* Step header */}
            <div className={`rounded-xl border ${currentCriterion.borderColor} ${currentCriterion.bgColor} p-4`}>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentCriterion.bgColor} border ${currentCriterion.borderColor} ${currentCriterion.color}`}
                >
                  {currentCriterion.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {currentCriterion.letter} — {currentCriterion.name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Schritt {currentStep + 1} von {CRITERIA.length}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{currentCriterion.question}</p>
            </div>

            {/* Input area */}
            <div>
              <textarea
                value={currentValue}
                onChange={(e) => updateValue(e.target.value)}
                placeholder={currentCriterion.placeholder}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-gray-500">
                  {currentValue.trim().length} Zeichen
                </span>
                {currentValue.trim().length > 0 && currentValue.trim().length < MIN_TEXT_LENGTH && (
                  <span className="text-xs text-red-400">Mindestens {MIN_TEXT_LENGTH} Zeichen</span>
                )}
              </div>
            </div>

            {/* Real-time feedback */}
            {currentValue.trim().length > 0 && <FeedbackBadge feedback={currentFeedback} />}

            {/* Tips */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 w-full p-3 text-left text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                <Lightbulb size={14} className="text-yellow-400" />
                Tipps fuer {currentCriterion.name}
                {showTips ? <ChevronUp size={14} className="ml-auto" /> : <ChevronDown size={14} className="ml-auto" />}
              </button>
              {showTips && (
                <div className="px-3 pb-3 space-y-1.5">
                  {currentCriterion.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                      <span className="text-gray-600 mt-0.5 shrink-0">-</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                disabled={currentStep === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-default text-gray-300 text-sm font-medium transition-colors"
              >
                <ArrowLeft size={14} />
                Zurueck
              </button>
              <button
                onClick={goNext}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors"
              >
                {currentStep < CRITERIA.length - 1 ? (
                  <>
                    Weiter
                    <ArrowRight size={14} />
                  </>
                ) : (
                  <>
                    <Eye size={14} />
                    Gesamtziel ansehen
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Overview mode */
          <div className="space-y-5">
            {/* All criteria review */}
            {CRITERIA.map((c, idx) => {
              const text = values[c.letter] || "";
              const feedback = evaluateCriterion(c, text);
              return (
                <div
                  key={c.letter}
                  className={`rounded-xl border p-4 transition-all ${
                    text.trim().length > 0
                      ? `${c.borderColor} ${c.bgColor}`
                      : "border-gray-700 bg-gray-800"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        text.trim().length > 0
                          ? `${c.bgColor} border ${c.borderColor} ${c.color}`
                          : "bg-gray-700 border-gray-600 text-gray-500"
                      }`}
                    >
                      {c.letter}
                    </div>
                    <span className="text-sm font-bold text-white">{c.name}</span>
                    <button
                      onClick={() => {
                        setCurrentStep(idx);
                        setShowOverview(false);
                      }}
                      className="ml-auto text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Bearbeiten
                    </button>
                  </div>
                  {text.trim().length > 0 ? (
                    <>
                      <p className="text-sm text-gray-300 leading-relaxed mb-2">{text}</p>
                      <FeedbackBadge feedback={feedback} />
                    </>
                  ) : (
                    <p className="text-xs text-gray-500 italic">Noch nicht ausgefuellt</p>
                  )}
                </div>
              );
            })}

            {/* Assembled goal */}
            <div className="bg-gray-800 rounded-xl border border-cyan-500/30 p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-cyan-400" />
                <h3 className="text-sm sm:text-base font-bold text-white">Dein SMART-Ziel</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                {getAssembledGoal() || "Noch nicht genug Kriterien ausgefuellt."}
              </p>
            </div>

            {/* Quality meter */}
            <QualityMeter overall={overall} />

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={resetAll}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium transition-colors"
              >
                <RotateCcw size={14} />
                Neu beginnen
              </button>
              <button
                onClick={() => setShowOverview(false)}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors"
              >
                <ArrowLeft size={14} />
                Zurueck zum Builder
              </button>
            </div>
          </div>
        )}

        {/* Info footer */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Lightbulb size={16} className="text-yellow-400" /> Was bedeutet SMART?
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
            {CRITERIA.map((c) => (
              <div
                key={c.letter}
                className={`rounded-lg p-3 border ${c.borderColor} ${c.bgColor}`}
              >
                <p className={`text-sm font-bold ${c.color} mb-1`}>
                  {c.letter} — {c.name}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {c.letter === "S" && "Klare, eindeutige Formulierung ohne Spielraeume."}
                  {c.letter === "M" && "Erfolg ist an Zahlen oder messbare Kriterien geknuepft."}
                  {c.letter === "A" && "Herausfordernd, aber nicht unmoeglich."}
                  {c.letter === "R" && "Mit verfuegbaren Ressourcen umsetzbar."}
                  {c.letter === "T" && "Hat einen konkreten Termin oder Zeitrahmen."}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-medium text-white">Herkunft:</span>{" "}
              Die SMART-Methode wurde 1981 von George T. Doran im Management Review veroeffentlicht
              und ist heute eine der am haeufigsten verwendeten Techniken zur Zieldefinition im
              Projektmanagement — auch in der IHK-Abschlusspruefung ein wichtiges Thema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
