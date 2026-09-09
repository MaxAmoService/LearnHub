"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import type { Exercise } from "@/lib/exercises/types";
import { isChoiceExercise, isNumericExercise } from "@/lib/exercises/types";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import { LessonFeedback } from "./LessonFeedback";
import { allValidAnswers } from "@/lib/answerCheck";
import { shuffle } from "@/lib/array";
import { gradeExerciseAnswer } from "@/lib/exercises/grading";
import { CheckCircle2, XCircle, Lightbulb, ChevronRight, RotateCcw, Trophy, Target, HelpCircle, Medal } from "lucide-react";

interface Props {
  exercises: Exercise[];
  moduleTitle: string;
  onComplete?: () => void;
  difficulty?: 1 | 2 | 3;
  examMode?: boolean;
  moduleSlug?: string;
  lessonId?: string;
  lessonTitle?: string;
}

interface ExamAnswer {
  exercise: Exercise;
  userAnswer: string;
  selectedOption: number | null;
  correct: boolean;
}

function correctAnswerLabel(ex: Exercise): string {
  if (isChoiceExercise(ex)) return ex.options[ex.correctIndex] ?? "";
  if (isNumericExercise(ex)) {
    return allValidAnswers(String(ex.answer), ex.acceptedAnswers).join(" oder ");
  }
  return "sampleAnswer" in ex ? ex.sampleAnswer : "";
}

function solutionText(ex: Exercise): string {
  if (isChoiceExercise(ex) || isNumericExercise(ex)) return ex.explanation;
  return "sampleAnswer" in ex ? ex.sampleAnswer : "";
}

export function InteractiveExercise({ exercises, moduleTitle, onComplete, difficulty, examMode, moduleSlug, lessonId, lessonTitle }: Props) {
  // Filter by difficulty if specified
  const filtered = useMemo(() => {
    if (difficulty !== undefined) return exercises.filter(e => e.difficulty === difficulty);
    return exercises;
  }, [exercises, difficulty]);

  const [shuffledExercises, setShuffledExercises] = useState<Exercise[]>([]);
  useEffect(() => {
    setShuffledExercises(shuffle(filtered));
  }, [filtered]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  const [completed, setCompleted] = useState(false);
  const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>([]);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const total = shuffledExercises.length;
  const current = shuffledExercises[currentIndex];
  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  // Reset bei Aufgabenwechsel
  useEffect(() => {
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    setShowSolution(false);
  }, [currentIndex]);

  // Fokus auf "Nächste Aufgabe"-Button nach Ergebnis
  useEffect(() => {
    if (showResult && nextButtonRef.current) {
      nextButtonRef.current.focus();
    }
  }, [showResult]);

  const checkAnswer = () => {
    if (!current) return;
    let correct = gradeExerciseAnswer(current, { userAnswer, selectedOption });

    if (examMode) {
      // Exam mode: record answer, no immediate feedback, auto-advance
      setExamAnswers(prev => [...prev, {
        exercise: current,
        userAnswer,
        selectedOption,
        correct,
      }]);
      setIsCorrect(correct);
      setStats(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
      }));

      if (currentIndex < total - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCompleted(true);
        onComplete?.();
      }
    } else {
      // Normal mode: show immediate feedback
      setIsCorrect(correct);
      setShowResult(true);
      setStats(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
      }));
    }
  };

  const nextExercise = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
      onComplete?.();
    }
  };

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.repeat) {
      e.preventDefault();
      if (examMode) {
        checkAnswer();
      } else if (showResult) {
        nextExercise();
      } else {
        checkAnswer();
      }
    }
  }, [examMode, showResult, checkAnswer, nextExercise]);

  const resetExercise = () => {
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setShowHint(false);
    setShowSolution(false);
  };

  const restartAll = () => {
    setCurrentIndex(0);
    setStats({ correct: 0, wrong: 0 });
    setCompleted(false);
    setExamAnswers([]);
    setShuffledExercises(shuffle(filtered));
    resetExercise();
  };

  const getScorePercentage = () => total > 0 ? Math.round((stats.correct / total) * 100) : 0;
  const getScoreEmoji = () => {
    const pct = getScorePercentage();
    if (pct >= 90) return "🏆";
    if (pct >= 70) return "🎉";
    if (pct >= 50) return "👍";
    return "💪";
  };

  const diffLabel = {
    1: { text: "Leicht", bg: "bg-green-500/20", color: "text-green-400" },
    2: { text: "Mittel", bg: "bg-yellow-500/20", color: "text-yellow-400" },
    3: { text: "Schwer", bg: "bg-red-500/20", color: "text-red-400" },
  }[current?.difficulty || 1];

  const examPassed = examMode && getScorePercentage() >= 70;

  if (shuffledExercises.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <Target className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Keine Aufgaben verfügbar</h3>
        <p className="text-slate-400">Für diesen Bereich gibt es noch keine Aufgaben.</p>
      </div>
    );
  }

  // Prüfung Abschluss-Bildschirm
  if (completed && examMode) {
    return (
      <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{examPassed ? "🏆" : "📚"}</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {examPassed ? "Prüfung bestanden!" : "Prüfung nicht bestanden"}
          </h2>
          <p className="text-slate-400">{moduleTitle}</p>
        </div>

        <div className={`rounded-xl p-6 mb-6 ${examPassed ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-amber-500/10 border border-amber-500/30"}`}>
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-white mb-2">{getScorePercentage()}%</div>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400">{stats.correct} Richtig</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">{stats.wrong} Falsch</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400">
            {examPassed
              ? "Hervorragend! Du hast die Prüfung mit mindestens 70% bestanden."
              : `Du brauchst mindestens 70%. Versuch's nochmal!`}
          </p>
        </div>

        {/* Detailed results */}
        <div className="space-y-3 mb-6">
          <h3 className="text-lg font-semibold text-white">Ergebnisse im Detail</h3>
          {examAnswers.map((ans, i) => (
            <div key={i} className={`p-4 rounded-lg border ${ans.correct ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
              <div className="flex items-start gap-3">
                {ans.correct
                  ? <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm mb-1"><InlineText text={ans.exercise.prompt} /></p>
                  {!ans.correct && (
                    <p className="text-xs text-slate-400">
                      Deine Antwort: <span className="text-red-300">{isChoiceExercise(ans.exercise) && ans.selectedOption !== null ? ans.exercise.options[ans.selectedOption] ?? "—" : ans.userAnswer || "—"}</span>
                      {" → "}
                      Richtig: <span className="text-green-300">{correctAnswerLabel(ans.exercise)}</span>
                    </p>
                  )}
                  {!ans.correct && (
                    <details className="mt-1">
                      <summary className="text-xs text-blue-400 cursor-pointer hover:text-blue-300">Lösung anzeigen</summary>
                      <p className="text-xs text-slate-400 mt-1"><InlineText text={solutionText(ans.exercise)} /></p>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restartAll}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Nochmal versuchen
          </button>
        </div>
      </div>
    );
  }

  // Normaler Abschluss-Bildschirm
  if (completed) {
    return (
      <div className="glass rounded-2xl p-8 text-center max-w-lg mx-auto">
        <div className="text-6xl mb-4">{getScoreEmoji()}</div>
        <h2 className="text-2xl font-bold text-white mb-2">Aufgaben abgeschlossen!</h2>
        <p className="text-slate-400 mb-6">{moduleTitle}</p>

        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <div className="text-5xl font-bold text-white mb-2">{getScorePercentage()}%</div>
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-green-400">{stats.correct} Richtig</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-400">{stats.wrong} Falsch</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={restartAll}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Nochmal versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" tabIndex={0} onKeyDown={handleKeyDown}>
      {/* Header */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {examMode ? <Medal className="w-6 h-6 text-amber-400" /> : <Target className="w-6 h-6 text-blue-400" />}
            {examMode ? "Prüfung" : "Aufgaben"}
          </h2>
          <div className="text-sm text-slate-400">
            {currentIndex + 1} / {total}
          </div>
        </div>

        {/* Fortschrittsbalken */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div
            className={`h-full transition-all duration-300 ${examMode ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Statistiken */}
        {!examMode && (
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-green-400">{stats.correct}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400">{stats.wrong}</span>
            </div>
          </div>
        )}
        {examMode && (
          <p className="text-xs text-slate-500">
            Bearbeite alle Fragen. Keine Hinweise — Ergebnis erst am Ende.
          </p>
        )}
      </div>

      {/* Aufgaben-Karte */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Karten-Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${diffLabel.bg} ${diffLabel.color}`}>
            {"★".repeat(current.difficulty)} {diffLabel.text}
          </div>
          {!examMode && (
            <button
              onClick={resetExercise}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Zurücksetzen"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Frage */}
        <div className="p-6">
          <div className="text-white text-lg md:text-xl mb-6 leading-relaxed">
            <InlineText text={current.prompt} />
          </div>

          {/* Hinweis — nur im normalen Modus */}
          {!examMode && current.hint && (
            <div className="mb-6">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hinweis anzeigen
                </button>
              ) : (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="text-yellow-200 text-base">
                      <InlineText text={current.hint} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Eingabefeld */}
          {isNumericExercise(current) && !showResult && (
            <div className="space-y-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={current.format || "Deine Antwort..."}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                autoFocus
              />
              {current.format && (
                <p className="text-xs text-slate-500">Format: {current.format}</p>
              )}
              <p className="text-xs text-slate-600">
                💡 <kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-slate-400 text-[11px] font-mono">Enter</kbd> drücken zum Prüfen
              </p>
            </div>
          )}

          {/* Multiple Choice */}
          {isChoiceExercise(current) && !showResult && (
            <div className="space-y-3">
              {current.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedOption(idx)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedOption === idx
                      ? "border-blue-500 bg-blue-500/20"
                      : "border-slate-600 hover:border-slate-500 bg-slate-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === idx ? "border-blue-500" : "border-slate-500"
                    }`}>
                      {selectedOption === idx && (
                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <span className="text-white text-base">
                      <InlineText text={option} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Ergebnis — nur im normalen Modus */}
          {showResult && !examMode && (
            <div className={`rounded-xl p-5 mb-4 ${
              isCorrect ? "bg-green-500/10 border border-green-500/30" : "bg-red-500/10 border border-red-500/30"
            }`}>
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold mb-2 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "Richtig! ✨" : "Leider falsch"}
                  </p>
                  {!isCorrect && (
                    <div className="text-slate-300 text-sm">
                      <p className="mb-1">
                        <span className="text-slate-500">Richtige Antwort:</span>{" "}
                        <span className="text-white font-medium">
                          <InlineText text={correctAnswerLabel(current)} />
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Lösung & Erklärung — nur im normalen Modus */}
          {showResult && !examMode && !showSolution && (
            <button
              onClick={() => setShowSolution(true)}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              Lösung & Erklärung anzeigen
            </button>
          )}

          {showSolution && !examMode && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 mt-4">
              <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                Lösung
              </h4>
              <div className="text-slate-300 text-base">
                <InlineText text={solutionText(current)} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700/50 bg-slate-800/30 space-y-3">
          {!showResult ? (
            <button
              onClick={checkAnswer}
              disabled={isNumericExercise(current) ? !userAnswer : !selectedOption && selectedOption !== 0}
              className={`w-full py-3 rounded-lg font-medium transition-colors disabled:bg-slate-700 disabled:text-slate-500 ${
                examMode
                  ? "bg-amber-500 hover:bg-amber-600 text-slate-900"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {examMode ? "Antwort abgeben" : "Antwort prüfen"}
            </button>
          ) : (
            <button
              ref={nextButtonRef}
              onClick={nextExercise}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); nextExercise(); }}}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {currentIndex < total - 1 ? (
                <>
                  Nächste Aufgabe
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  Ergebnis anzeigen
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          )}
          {moduleSlug && lessonId && (
            <LessonFeedback
              moduleSlug={moduleSlug}
              moduleTitle={moduleTitle}
              lessonId={lessonId}
              lessonTitle={lessonTitle || ""}
            />
          )}
        </div>
      </div>
    </div>
  );
}
