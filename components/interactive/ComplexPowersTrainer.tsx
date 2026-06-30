"use client";

import { useState, useCallback } from "react";
import { InlineText } from "../InlineText";
import { MathBlock } from "../MathBlock";

interface ComplexPowersTrainerProps {
  className?: string;
}

const jPowers = [
  { n: 0, value: "1", display: "$1$", real: 1, imag: 0 },
  { n: 1, value: "j", display: "$j$", real: 0, imag: 1 },
  { n: 2, value: "-1", display: "$-1$", real: -1, imag: 0 },
  { n: 3, value: "-j", display: "$-j$", real: 0, imag: -1 },
];

function getJPower(exp: number) {
  return jPowers[exp % 4];
}

export function ComplexPowersTrainer({ className = "" }: ComplexPowersTrainerProps) {
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [quizExp, setQuizExp] = useState(() => Math.floor(Math.random() * 20) + 1);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);
  const [showCycle, setShowCycle] = useState(true);

  const correctAnswer = getJPower(quizExp);

  const checkAnswer = useCallback(() => {
    const clean = userAnswer.trim().replace(/\s/g, "");
    const isCorrect =
      clean === correctAnswer.value ||
      clean === `${correctAnswer.real}${correctAnswer.imag >= 0 ? "+" : ""}${correctAnswer.imag}j` ||
      clean === `${correctAnswer.real}${correctAnswer.imag >= 0 ? "+" : ""}j${correctAnswer.imag}` ||
      (correctAnswer.imag === 0 && clean === String(correctAnswer.real)) ||
      (correctAnswer.real === 0 && clean === `${correctAnswer.imag}j`) ||
      (correctAnswer.real === 0 && clean === `j${correctAnswer.imag}`);

    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  }, [userAnswer, correctAnswer]);

  const nextQuiz = useCallback(() => {
    setQuizExp(Math.floor(Math.random() * 50) + 1);
    setUserAnswer("");
    setFeedback(null);
  }, []);

  const mod4 = quizExp % 4;
  const quotient = Math.floor(quizExp / 4);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-2">
        <button onClick={() => setMode("learn")}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${mode === "learn" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"}`}>
          Lernen
        </button>
        <button onClick={() => setMode("quiz")}
          className={`px-4 py-2 rounded-lg text-sm border transition-colors ${mode === "quiz" ? "bg-green-600 border-green-500 text-white" : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"}`}>
          Quiz {streak > 0 && `🔥 ${streak}`}
        </button>
      </div>

      {mode === "learn" && (
        <>
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex justify-center items-center gap-3">
              {jPowers.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 ${
                    i === 0 ? "bg-green-900/40 border-green-500 text-green-400" :
                    i === 1 ? "bg-indigo-900/40 border-indigo-500 text-indigo-400" :
                    i === 2 ? "bg-red-900/40 border-red-500 text-red-400" :
                    "bg-amber-900/40 border-amber-500 text-amber-400"
                  }`}>
                    <MathBlock math={p.value} display={false} />
                  </div>
                  <span className="text-xs text-slate-400 mt-1"><MathBlock math={`j^{${p.n}}`} display={false} /></span>
                  {i < 3 && <span className="text-slate-600 text-xl mt-1">→</span>}
                </div>
              ))}
              <div className="flex flex-col items-center ml-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 bg-green-900/40 border-green-500 text-green-400">
                  <MathBlock math="1" display={false} />
                </div>
                <span className="text-xs text-slate-400 mt-1"><MathBlock math="j^4" display={false} /></span>
                <span className="text-xs text-slate-600">Zyklus!</span>
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input type="checkbox" checked={showCycle} onChange={e => setShowCycle(e.target.checked)} className="rounded" />
            Zyklus-Tabelle anzeigen
          </label>

          {showCycle && (
            <div className="bg-slate-800/30 rounded-lg p-4 text-sm">
              <table className="w-full text-center">
                <thead>
                  <tr className="text-indigo-400 border-b border-slate-700">
                    <th className="px-2 py-1"><MathBlock math="n \\text{ mod } 4" display={false} /></th>
                    <th className="px-2 py-1"><MathBlock math="j^n" display={false} /></th>
                    <th className="px-2 py-1">Real</th>
                    <th className="px-2 py-1">Imag</th>
                  </tr>
                </thead>
                <tbody>
                  {jPowers.map((p, i) => (
                    <tr key={i} className="border-t border-slate-800 text-slate-300">
                      <td className="px-2 py-1.5 font-mono">{i}</td>
                      <td className="px-2 py-1.5 font-bold"><MathBlock math={p.value} display={false} /></td>
                      <td className="px-2 py-1.5 font-mono">{p.real}</td>
                      <td className="px-2 py-1.5 font-mono">{p.imag !== 0 ? <MathBlock math={`${p.imag}j`} display={false} /> : "0"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="bg-slate-800/30 rounded-lg p-4 text-sm text-slate-300 space-y-2">
            <h4 className="font-semibold text-indigo-400">Merke</h4>
            <InlineText text="$j^1 = j$, $j^2 = -1$, $j^3 = -j$, $j^4 = 1$ — dann beginnt der Zyklus von vorn!" />
            <InlineText text="Formel: $j^n = j^{(n \\text{ mod } 4)}$ — einfach den Rest bei Division durch 4 berechnen." />
          </div>
        </>
      )}

      {mode === "quiz" && (
        <>
          <div className="bg-slate-900/50 rounded-xl p-8 border border-slate-700/50 text-center">
            <div className="text-5xl font-bold text-white mb-4">
              <MathBlock math={`j^{${quizExp}}`} display={false} />
              <span className="text-slate-400 mx-2">=</span>
              <span className="text-indigo-400">?</span>
            </div>
            <div className="flex justify-center gap-2 max-w-xs mx-auto">
              <input
                type="text"
                value={userAnswer}
                onChange={e => { setUserAnswer(e.target.value); setFeedback(null); }}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    if (feedback) nextQuiz();
                    else checkAnswer();
                  }
                }}
                placeholder="z.B. 1, -1, j, -j..."
                className={`flex-1 bg-slate-700 text-white rounded-lg px-4 py-2.5 text-center text-lg font-mono border ${
                  feedback === "correct" ? "border-green-500" : feedback === "wrong" ? "border-red-500" : "border-slate-600"
                } focus:border-indigo-500 outline-none`}
                autoFocus
              />
              <button onClick={feedback ? nextQuiz : checkAnswer}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  feedback ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-green-600 hover:bg-green-700 text-white"
                }`}>
                {feedback ? "Weiter" : "Prüfen"}
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`rounded-lg p-4 text-sm ${feedback === "correct" ? "bg-green-900/30 border border-green-700/50" : "bg-red-900/30 border border-red-700/50"}`}>
              {feedback === "correct" ? (
                <div className="text-green-300">
                  <strong>Richtig!</strong> {streak > 1 && `🔥 ${streak} in Folge!`}
                </div>
              ) : (
                <div className="text-red-300 space-y-3">
                  <div>
                    <strong>Falsch.</strong> Die richtige Antwort ist{" "}
                    <span className="text-xl font-bold"><MathBlock math={correctAnswer.value} display={false} /></span>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-300 space-y-1">
                    <div className="text-indigo-400 font-semibold mb-1">Lösungsweg:</div>
                    {quizExp > 4 ? (
                      <>
                        <div><MathBlock math={`j^{${quizExp}} = j^{4 \\cdot ${quotient} + ${mod4}}`} display={false} /></div>
                        <div><MathBlock math={`= (j^4)^{${quotient}} \\cdot j^{${mod4}}`} display={false} /></div>
                        <div><MathBlock math={`= 1^{${quotient}} \\cdot ${correctAnswer.value}`} display={false} /></div>
                        <div><MathBlock math={`= ${correctAnswer.value}`} display={false} /></div>
                      </>
                    ) : (
                      <div><MathBlock math={`j^{${quizExp}} = ${correctAnswer.value}`} display={false} /></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {!feedback && (
            <div className="bg-slate-800/30 rounded-lg p-3 text-xs text-slate-400 text-center">
              <InlineText text={`Tipp: Berechne $${quizExp} \\text{ mod } 4 = ${mod4}$ → $j^{${mod4}} = ${correctAnswer.value}$`} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
