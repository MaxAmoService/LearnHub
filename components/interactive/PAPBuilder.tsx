"use client";

import React, { useState, useCallback, useEffect } from "react";

type PAPType = "start" | "end" | "operation" | "decision" | "io";

interface PAPElement {
  id: string;
  type: PAPType;
  label: string;
  x: number;
  y: number;
}

interface PAPConnection {
  from: string;
  to: string;
  label?: string;
  color?: string;
}

interface StepInfo {
  elementId: string;
  title: string;
  description: string;
  symbol: string;
}

const kaffeeElements: PAPElement[] = [
  { id: "start", type: "start", label: "Start", x: 180, y: 45 },
  { id: "io1", type: "io", label: "Geld einwerfen", x: 180, y: 140 },
  { id: "io2", type: "io", label: "Betrag eingeben", x: 180, y: 235 },
  { id: "dec1", type: "decision", label: "Betrag\n≥ Preis?", x: 180, y: 345 },
  { id: "op1", type: "operation", label: "Kaffee\nzubereiten", x: 420, y: 345 },
  { id: "io3", type: "io", label: "Ihr Kaffee", x: 420, y: 450 },
  { id: "end1", type: "end", label: "Ende", x: 420, y: 550 },
  { id: "io4", type: "io", label: "Zu wenig\nGuthaben!", x: 180, y: 450 },
];

const kaffeeConnections: PAPConnection[] = [
  { from: "start", to: "io1" },
  { from: "io1", to: "io2" },
  { from: "io2", to: "dec1" },
  { from: "dec1", to: "op1", label: "Ja", color: "#22c55e" },
  { from: "dec1", to: "io4", label: "Nein", color: "#ef4444" },
  { from: "op1", to: "io3" },
  { from: "io3", to: "end1" },
  { from: "io4", to: "io1", label: "↩", color: "#94a3b8" },
];

const steps: StepInfo[] = [
  { elementId: "start", title: "Start-Symbol", description: "Der PAP beginnt immer mit dem Start-Symbol — ein grünes Oval nach DIN 66001.", symbol: "🟢 Oval" },
  { elementId: "io1", title: "Eingabe: Geld einwerfen", description: "Der Nutzer wirft Geld ein. Das ist eine EINGABE — dargestellt als Parallelogramm (lila).", symbol: "🟪 Parallelogramm" },
  { elementId: "io2", title: "Eingabe: Betrag", description: "Der Nutzer gibt den gewünschten Betrag ein — ebenfalls eine Eingabe.", symbol: "🟪 Parallelogramm" },
  { elementId: "dec1", title: "Entscheidung", description: "Das Herzstück: Eine RAUTE prüft ob der Betrag reicht. Hier verzweigt sich der PAP in JA und NEIN.", symbol: "🔶 Raute" },
  { elementId: "op1", title: "Ja-Pfad: Kaffee zubereiten", description: "Bei 'Ja' wird eine OPERATION ausgeführt — ein blaues Rechteck. Der Kaffee wird zubereitet.", symbol: "🟦 Rechteck" },
  { elementId: "io4", title: "Nein-Pfad: Fehlermeldung", description: "Bei 'Nein' wird eine Ausgabe 'Zu wenig Guthaben!' angezeigt — Parallelogramm.", symbol: "🟪 Parallelogramm" },
  { elementId: "io3", title: "Ausgabe: Ihr Kaffee", description: "Die Ausgabe 'Ihr Kaffee' erscheint — der Nutzer erhält sein Produkt.", symbol: "🟪 Parallelogramm" },
  { elementId: "end1", title: "Ende", description: "Das Programm endet mit dem Ende-Symbol — einem roten Oval. Fertig! ☕", symbol: "🔴 Oval" },
];

const quizQuestions = [
  { id: "q1", question: "Welches Symbol verwendet man für eine Entscheidung im PAP?", options: ["Rechteck", "Raute", "Oval", "Parallelogramm"], correct: 1, explanation: "Die Raute (Diamant) steht für eine Entscheidung — eine Ja/Nein-Verzweigung." },
  { id: "q2", question: "Was wird im PAP mit einem Oval dargestellt?", options: ["Operation", "Start/Ende", "Eingabe", "Entscheidung"], correct: 1, explanation: "Das Oval (abgerundetes Rechteck) steht für Start oder Ende des Programms." },
  { id: "q3", question: "Wie heißt die Norm, die den PAP definiert?", options: ["DIN 5001", "DIN 66001", "ISO 9001", "DIN 13301"], correct: 1, explanation: "DIN 66001 definiert die Symbole und Regeln für Programmablaufpläne." },
  { id: "q4", question: "Was steht im Parallelogramm?", options: ["Berechnung", "Entscheidung", "Ein-/Ausgabe", "Start"], correct: 2, explanation: "Das Parallelogramm steht für Ein- oder Ausgabe — z.B. Benutzereingabe oder Bildschirmausgabe." },
  { id: "q5", question: "Ein Algorithmus hat keine Verzweigung. Welches Symbol braucht er NICHT?", options: ["Oval", "Rechteck", "Raute", "Parallelogramm"], correct: 2, explanation: "Ohne Verzweigung braucht man keine Raute (Entscheidung). Die anderen Symbole sind immer nötig." },
];

function getColor(type: PAPType): string {
  switch (type) { case "start": return "#22c55e"; case "end": return "#ef4444"; case "operation": return "#3b82f6"; case "decision": return "#f59e0b"; case "io": return "#a855f7"; }
}
function getStroke(type: PAPType): string {
  switch (type) { case "start": return "#15803d"; case "end": return "#dc2626"; case "operation": return "#1d4ed8"; case "decision": return "#b45309"; case "io": return "#6d28d9"; }
}
function getGlow(type: PAPType): string {
  switch (type) { case "start": return "#22c55e80"; case "end": return "#ef444480"; case "operation": return "#3b82f680"; case "decision": return "#f59e0b80"; case "io": return "#a855f780"; }
}

function renderElement(el: PAPElement, isHighlighted: boolean, isPulsing: boolean) {
  const color = getColor(el.type);
  const stroke = getStroke(el.type);
  const glow = getGlow(el.type);
  const opacity = isHighlighted ? 1 : 0.35;
  const lines = el.label.split("\n");
  const lineHeight = el.type === "decision" ? 15 : 14;
  const startY = el.y - (lines.length - 1) * lineHeight / 2;
  const filter = isPulsing ? `drop-shadow(0 0 12px ${glow})` : undefined;

  const common = { opacity, filter, style: { transition: "all 0.5s ease" } };

  switch (el.type) {
    case "start": case "end":
      return <g key={el.id} {...common}><rect x={el.x - 55} y={el.y - 22} width="110" height="44" rx="22" ry="22" fill={color} stroke={stroke} strokeWidth={isPulsing ? 3 : 2} />{lines.map((l, i) => <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">{l}</text>)}</g>;
    case "operation":
      return <g key={el.id} {...common}><rect x={el.x - 55} y={el.y - 22} width="110" height="44" rx="3" ry="3" fill={color} stroke={stroke} strokeWidth={isPulsing ? 3 : 2} />{lines.map((l, i) => <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>)}</g>;
    case "decision":
      return <g key={el.id} {...common}><polygon points={`${el.x},${el.y - 32} ${el.x + 65},${el.y} ${el.x},${el.y + 32} ${el.x - 65},${el.y}`} fill={color} stroke={stroke} strokeWidth={isPulsing ? 3 : 2} />{lines.map((l, i) => <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>)}</g>;
    case "io":
      return <g key={el.id} {...common}><polygon points={`${el.x - 48},${el.y - 22} ${el.x + 58},${el.y - 22} ${el.x + 48},${el.y + 22} ${el.x - 58},${el.y + 22}`} fill={color} stroke={stroke} strokeWidth={isPulsing ? 3 : 2} />{lines.map((l, i) => <text key={i} x={el.x} y={startY + i * lineHeight} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">{l}</text>)}</g>;
  }
}

function renderConnections(elements: PAPElement[], connections: PAPConnection[], highlightUpTo: number) {
  const elMap = Object.fromEntries(elements.map(e => [e.id, e]));
  return connections.map((conn, i) => {
    const from = elMap[conn.from];
    const to = elMap[conn.to];
    if (!from || !to) return null;
    const isHighlighted = i < highlightUpTo;
    const color = conn.color || (isHighlighted ? "#94a3b8" : "#334155");
    const opacity = isHighlighted ? 1 : 0.15;

    if (conn.from === "io4" && conn.to === "io1") {
      return <g key={i} opacity={opacity} style={{ transition: "opacity 0.5s ease" }}>
        <path d={`M ${from.x - 58} ${from.y} L ${from.x - 75} ${from.y} L ${from.x - 75} ${elMap["io1"].y} L ${elMap["io1"].x - 55} ${elMap["io1"].y}`} fill="none" stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
        {conn.label && <text x={from.x - 82} y={(from.y + elMap["io1"].y) / 2} textAnchor="end" fill={color} fontSize="12" fontWeight="bold">{conn.label}</text>}
      </g>;
    }
    if (from.type === "decision" && to.type === "operation" && from.y === to.y) {
      return <g key={i} opacity={opacity} style={{ transition: "opacity 0.5s ease" }}>
        <line x1={from.x + 65} y1={from.y} x2={to.x - 55} y2={to.y} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
        {conn.label && <text x={(from.x + 65 + to.x - 55) / 2} y={from.y - 10} textAnchor="middle" fill={color} fontSize="12" fontWeight="bold">{conn.label}</text>}
      </g>;
    }
    if (from.type === "decision" && to.type === "io" && conn.label === "Nein") {
      return <g key={i} opacity={opacity} style={{ transition: "opacity 0.5s ease" }}>
        <line x1={from.x} y1={from.y + 32} x2={to.x} y2={to.y - 22} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
        <text x={from.x + 15} y={(from.y + 32 + to.y - 22) / 2} textAnchor="start" fill={color} fontSize="12" fontWeight="bold">{conn.label}</text>
      </g>;
    }
    return <g key={i} opacity={opacity} style={{ transition: "opacity 0.5s ease" }}>
      <line x1={from.x} y1={from.y + 22} x2={to.x} y2={to.y - 22} stroke={color} strokeWidth="2" markerEnd="url(#arrow)" />
    </g>;
  });
}

export function PAPBuilder() {
  const [mode, setMode] = useState<"explore" | "quiz" | "challenge">("explore");
  const [step, setStep] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  // Challenge mode state
  const [challengeStep, setChallengeStep] = useState(0);
  const [challengeOptions, setChallengeOptions] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  const maxSteps = steps.length;

  const nextStep = useCallback(() => {
    setStep(s => Math.min(s + 1, maxSteps));
    setAnimKey(k => k + 1);
  }, [maxSteps]);

  const prevStep = useCallback(() => {
    setStep(s => Math.max(s - 1, 0));
    setAnimKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (mode === "challenge") generateChallenge();
  }, [mode, challengeStep]);

  const generateChallenge = useCallback(() => {
    if (challengeStep >= steps.length) return;
    const correct = steps[challengeStep].symbol;
    const allSymbols = ["🟢 Oval", "🟦 Rechteck", "🔶 Raute", "🟪 Parallelogramm", "🔴 Oval"];
    const wrong = allSymbols.filter(s => s !== correct);
    const shuffled = [correct, ...wrong.sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5);
    setChallengeOptions(shuffled);
    setChallengeFeedback(null);
  }, [challengeStep]);

  const handleChallengeAnswer = useCallback((opt: string) => {
    const correct = steps[challengeStep].symbol;
    if (opt === correct) {
      setChallengeFeedback("✅ Richtig!");
      setTimeout(() => {
        setChallengeStep(s => s + 1);
        setAnimKey(k => k + 1);
      }, 1200);
    } else {
      setChallengeFeedback(`❌ Falsch! Richtig wäre: ${correct}`);
    }
  }, [challengeStep]);

  const resetChallenge = useCallback(() => {
    setChallengeStep(0);
    setChallengeFeedback(null);
    setAnimKey(k => k + 1);
  }, []);

  const handleQuizAnswer = useCallback((idx: number) => {
    setSelectedAnswer(idx);
    setShowExplanation(true);
    if (idx === quizQuestions[quizIdx].correct) setScore(s => s + 1);
  }, [quizIdx]);

  const nextQuestion = useCallback(() => {
    setQuizIdx(i => Math.min(i + 1, quizQuestions.length - 1));
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, []);

  const resetQuiz = useCallback(() => {
    setQuizIdx(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  }, []);

  const currentStep = steps[step - 1];
  const maxVisibleElements = mode === "explore" ? step : (mode === "challenge" ? challengeStep : steps.length);
  const maxVisibleConns = mode === "explore" ? Math.max(0, step - 1) : (mode === "challenge" ? Math.max(0, challengeStep - 1) : kaffeeConnections.length);

  return (
    <div className="p-5 bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl border border-slate-700/40 backdrop-blur-sm">
      {/* Mode-Toggle */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "explore" as const, label: "🔍 Erkunden", color: "blue" },
          { key: "challenge" as const, label: "🎯 Challenge", color: "emerald" },
          { key: "quiz" as const, label: "📝 Quiz", color: "amber" },
        ].map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${mode === m.key
              ? m.key === "explore" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : m.key === "challenge" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-amber-600 text-white shadow-lg shadow-amber-500/30"
              : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}>
            {m.label}
          </button>
        ))}
      </div>

      {/* EXPLORE MODE */}
      {mode === "explore" && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-lg font-bold text-white">Kaffeemaschine — Schritt für Schritt</h4>
            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full font-medium">DIN 66001</span>
          </div>
          <p className="text-sm text-slate-400 mb-5">Baue den PAP Schritt für Schritt auf und lerne jedes Symbol kennen.</p>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* SVG */}
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-5 border border-slate-700/30">
              <svg width="560" height="620" viewBox="0 0 560 620" className="w-full h-auto">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                </defs>
                {kaffeeElements.map(el => {
                  const stepIdx = steps.findIndex(s => s.elementId === el.id);
                  const isVisible = stepIdx >= 0 && stepIdx < maxVisibleElements;
                  const isPulsing = step > 0 && steps[step - 1]?.elementId === el.id;
                  return renderElement(el, isVisible, isPulsing);
                })}
                {renderConnections(kaffeeElements, kaffeeConnections, maxVisibleConns)}
              </svg>
            </div>

            {/* Info-Panel — größer */}
            <div className="lg:w-96 flex flex-col">
              {step === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <span className="text-3xl">👆</span>
                  </div>
                  <p className="text-white font-semibold text-lg">Bereit zum Lernen?</p>
                  <p className="text-sm text-slate-400 mt-2 max-w-xs">Klicke auf "Weiter" und baue den PAP Schritt für Schritt auf. Jeder Schritt erklärt ein neues Symbol.</p>
                </div>
              ) : currentStep && (
                <div key={animKey} className="animate-fade-in flex flex-col h-full">
                  {/* Step-Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {step}
                    </span>
                    <div>
                      <p className="text-xs text-blue-400 font-medium">Schritt {step} von {maxSteps}</p>
                      <p className="text-xs text-slate-500">{currentStep.symbol}</p>
                    </div>
                  </div>

                  {/* Titel */}
                  <h5 className="text-white font-bold text-xl mb-3">{currentStep.title}</h5>

                  {/* Beschreibung in Box */}
                  <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/30 mb-4">
                    <p className="text-sm text-slate-200 leading-relaxed">{currentStep.description}</p>
                  </div>

                  {/* Symbol-Legende */}
                  <div className="mt-auto p-4 bg-gradient-to-br from-slate-800/40 to-slate-800/20 rounded-xl border border-slate-700/20">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3">Symbol-Übersicht</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { s: "🟢", n: "Start/Ende", c: "text-green-400" },
                        { s: "🟦", n: "Operation", c: "text-blue-400" },
                        { s: "🔶", n: "Entscheidung", c: "text-amber-400" },
                        { s: "🟪", n: "Ein-/Ausgabe", c: "text-purple-400" },
                      ].map(sym => (
                        <div key={sym.n} className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-900/40 rounded-lg">
                          <span className="text-base">{sym.s}</span>
                          <span className={`text-xs font-medium ${sym.c}`}>{sym.n}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-3 mt-5">
                <button onClick={prevStep} disabled={step === 0}
                  className="flex-1 px-5 py-3 bg-slate-700/50 text-slate-300 rounded-xl disabled:opacity-20 hover:bg-slate-700 transition-all text-sm font-semibold">
                  ← Zurück
                </button>
                <button onClick={nextStep} disabled={step >= maxSteps}
                  className="flex-1 px-5 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-20 hover:bg-blue-500 transition-all text-sm font-semibold shadow-lg shadow-blue-500/20">
                  Weiter →
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CHALLENGE MODE */}
      {mode === "challenge" && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-lg font-bold text-white">Symbol-Challenge</h4>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full font-medium">{challengeStep}/{steps.length}</span>
          </div>
          <p className="text-sm text-slate-400 mb-5">Welches Symbol gehört an diese Stelle? Klicke auf die richtige Antwort.</p>

          <div className="flex flex-col lg:flex-row gap-5">
            <div className="w-full lg:w-3/5 flex justify-center bg-slate-900/40 rounded-xl p-4 border border-slate-700/30">
              <svg width="560" height="620" viewBox="0 0 560 620" className="w-full h-auto">
                <defs>
                  <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                </defs>
                {kaffeeElements.map(el => {
                  const stepIdx = steps.findIndex(s => s.elementId === el.id);
                  const isVisible = stepIdx >= 0 && stepIdx < challengeStep;
                  const isPulsing = challengeStep < steps.length && steps[challengeStep]?.elementId === el.id;
                  return renderElement(el, isVisible, isPulsing);
                })}
                {renderConnections(kaffeeElements, kaffeeConnections, Math.max(0, challengeStep - 1))}
              </svg>
            </div>

            <div className="lg:w-72 flex flex-col">
              {challengeStep < steps.length ? (
                <>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-1">Schritt {challengeStep + 1}</p>
                    <h5 className="text-white font-bold text-lg">{steps[challengeStep].title}</h5>
                    <p className="text-sm text-slate-400 mt-1">{steps[challengeStep].description}</p>
                  </div>
                  <p className="text-sm text-slate-300 font-medium mb-3">Welches Symbol ist das?</p>
                  <div className="space-y-2">
                    {challengeOptions.map((opt, i) => (
                      <button key={i} onClick={() => handleChallengeAnswer(opt)}
                        disabled={!!challengeFeedback}
                        className={`w-full p-3 rounded-xl text-sm font-medium text-left transition-all ${challengeFeedback
                          ? opt === steps[challengeStep].symbol
                            ? "bg-emerald-600/60 border-2 border-emerald-400 text-white"
                            : "bg-slate-800/50 text-slate-500"
                          : "bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:border-slate-500 border-2 border-transparent"
                        }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {challengeFeedback && (
                    <div className={`mt-3 p-3 rounded-lg text-sm font-medium ${challengeFeedback.startsWith("✅") ? "bg-emerald-900/40 text-emerald-300" : "bg-red-900/40 text-red-300"}`}>
                      {challengeFeedback}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="text-5xl mb-3">🏆</div>
                  <h5 className="text-white font-bold text-xl">Geschafft!</h5>
                  <p className="text-slate-400 mt-2">Du kennst jetzt alle PAP-Symbole.</p>
                  <button onClick={resetChallenge} className="mt-4 px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all font-medium">
                    Nochmal 🔄
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* QUIZ MODE */}
      {mode === "quiz" && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-lg font-bold text-white">PAP-Quiz</h4>
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full font-medium">Score: {score}/{quizQuestions.length}</span>
          </div>

          {quizIdx < quizQuestions.length ? (
            <div className="max-w-xl">
              <div className="p-5 bg-slate-900/50 rounded-xl border border-slate-700/30">
                <p className="text-xs text-slate-500 mb-1">Frage {quizIdx + 1} / {quizQuestions.length}</p>
                <p className="text-white font-medium text-lg mb-4">{quizQuestions[quizIdx].question}</p>
                <div className="space-y-2">
                  {quizQuestions[quizIdx].options.map((opt, i) => {
                    let cls = "bg-slate-700/50 hover:bg-slate-700 text-slate-200 border-2 border-transparent";
                    if (showExplanation) {
                      if (i === quizQuestions[quizIdx].correct) cls = "bg-emerald-600/40 text-white border-emerald-400";
                      else if (i === selectedAnswer) cls = "bg-red-600/40 text-white border-red-400";
                      else cls = "bg-slate-800/30 text-slate-600 border-transparent";
                    }
                    return <button key={i} onClick={() => !showExplanation && handleQuizAnswer(i)} disabled={showExplanation}
                      className={`w-full p-3 rounded-xl text-sm font-medium text-left transition-all ${cls}`}>{opt}</button>;
                  })}
                </div>
                {showExplanation && (
                  <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-sm text-slate-300">
                      {selectedAnswer === quizQuestions[quizIdx].correct ? "✅ Richtig!" : "❌ Falsch!"}{" "}
                      {quizQuestions[quizIdx].explanation}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1">
                  {quizQuestions.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < quizIdx ? "bg-amber-500" : i === quizIdx ? "bg-white" : "bg-slate-700"}`} />
                  ))}
                </div>
                {showExplanation && (
                  <button onClick={quizIdx < quizQuestions.length - 1 ? nextQuestion : resetQuiz}
                    className="px-5 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-500 transition-all text-sm font-medium">
                    {quizIdx < quizQuestions.length - 1 ? "Nächste Frage →" : "Nochmal 🔄"}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">🎉</div>
              <p className="text-white font-bold text-xl">Quiz abgeschlossen!</p>
              <p className="text-slate-400 mt-1">{score} von {quizQuestions.length} richtig</p>
              <button onClick={resetQuiz} className="mt-4 px-6 py-2.5 bg-amber-600 text-white rounded-xl hover:bg-amber-500 transition-all font-medium">
                Nochmal versuchen
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
