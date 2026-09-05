"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

// ─── Utility Functions ───────────────────────────────────────────────────────

function ipToNumber(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function numberToIp(num: number): string {
  return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join(".");
}

function ipToBinary(ip: string): string {
  return ip.split(".").map((o) => parseInt(o).toString(2).padStart(8, "0")).join(".");
}

function cidrToMask(cidr: number): string {
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return numberToIp(mask);
}

function validateIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = Number(p);
    return !isNaN(n) && n >= 0 && n <= 255;
  });
}

// ─── Guided Practice ─────────────────────────────────────────────────────────

interface PracticeStep {
  prompt: string;
  answer: string;
  hint: string;
  explanation: string;
}

function generatePracticeProblem(): { ip: string; cidr: number; steps: PracticeStep[] } {
  const cidrs = [24, 25, 26, 27, 28];
  const cidr = cidrs[Math.floor(Math.random() * cidrs.length)];
  const ip = `192.168.${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 254) + 1}`;

  const ipNum = ipToNumber(ip);
  const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | ~maskNum) >>> 0;
  const hostBits = 32 - cidr;
  const numHosts = Math.max(0, broadcastNum - networkNum - 1);

  const mask = cidrToMask(cidr);
  const network = numberToIp(networkNum);
  const broadcast = numberToIp(broadcastNum);
  const firstHost = numberToIp(networkNum + 1);
  const lastHost = numberToIp(broadcastNum - 1);

  return {
    ip,
    cidr,
    steps: [
      {
        prompt: `Wie viele Host-Bits hat das Netz /${cidr}?`,
        answer: String(hostBits),
        hint: `32 - ${cidr} = ?`,
        explanation: `32 - ${cidr} = ${hostBits} Host-Bits`,
      },
      {
        prompt: `Was ist die Subnetzmaske für /${cidr}?`,
        answer: mask,
        hint: `Schreibe ${cidr} Einsen und ${hostBits} Nullen als IP-Adresse`,
        explanation: `/${cidr} = ${mask}`,
      },
      {
        prompt: `Was ist die Netzwerkadresse von ${ip}/${cidr}?`,
        answer: network,
        hint: `Verknüpfe IP und Maske mit AND (bitweise)`,
        explanation: `${ip} AND ${mask} = ${network}`,
      },
      {
        prompt: `Was ist die Broadcast-Adresse?`,
        answer: broadcast,
        hint: `Setze alle Host-Bits auf 1`,
        explanation: `Netzwerkadresse mit Host-Bits alle 1 = ${broadcast}`,
      },
      {
        prompt: `Wie viele nutzbare Hosts gibt es?`,
        answer: String(numHosts),
        hint: `Formel: 2^${hostBits} - 2`,
        explanation: `2^${hostBits} - 2 = ${numHosts}`,
      },
      {
        prompt: `Was ist die erste nutzbare Host-Adresse?`,
        answer: firstHost,
        hint: `Netzwerkadresse + 1`,
        explanation: `${network} + 1 = ${firstHost}`,
      },
      {
        prompt: `Was ist die letzte nutzbare Host-Adresse?`,
        answer: lastHost,
        hint: `Broadcast - 1`,
        explanation: `${broadcast} - 1 = ${lastHost}`,
      },
    ],
  };
}

function GuidedPractice() {
  const [problem, setProblem] = useState(() => generatePracticeProblem());
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stepResults, setStepResults] = useState<boolean[]>([]);

  const step = problem.steps[currentStep];

  const newProblem = () => {
    setProblem(generatePracticeProblem());
    setCurrentStep(0);
    setUserInput("");
    setFeedback(null);
    setShowHint(false);
    setCompleted(false);
    setStepResults([]);
  };

  const checkStep = () => {
    const isCorrect = userInput.trim().toLowerCase() === step.answer.toLowerCase();
    setFeedback(isCorrect ? "correct" : "wrong");
    setStepResults((prev) => [...prev, isCorrect]);
  };

  const nextStep = () => {
    if (currentStep < problem.steps.length - 1) {
      setCurrentStep((s) => s + 1);
      setUserInput("");
      setFeedback(null);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  const correctCount = stepResults.filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Problem header */}
      <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-blue-400 font-bold text-sm">📝 Geführte Aufgabe</span>
          <span className="text-slate-400 text-xs">Schritt {currentStep + 1} von {problem.steps.length}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-mono text-white text-lg">{problem.ip}</span>
          <span className="text-slate-500">/</span>
          <span className="font-mono text-orange-400 text-lg">{problem.cidr}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1">
        {problem.steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < stepResults.length
                ? stepResults[i] ? "bg-green-600" : "bg-red-600"
                : i === currentStep ? "bg-blue-600" : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {!completed ? (
        <div className="space-y-3">
          <div className="p-3 bg-slate-700/50 rounded-lg">
            <p className="text-white text-sm font-medium">{step.prompt}</p>
          </div>

          {showHint && (
            <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-300 text-sm">💡 {step.hint}</p>
            </div>
          )}

          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !feedback) checkStep();
              if (e.key === "Enter" && feedback) nextStep();
            }}
            placeholder="Deine Antwort..."
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
            autoFocus
          />

          <div className="flex gap-2">
            {!feedback && (
              <>
                <button
                  onClick={checkStep}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
                >
                  ✅ Prüfen
                </button>
                <button
                  onClick={() => setShowHint(true)}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm transition-colors"
                >
                  💡 Tipp
                </button>
              </>
            )}
            {feedback && (
              <button
                onClick={nextStep}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition-colors"
              >
                {currentStep < problem.steps.length - 1 ? "➡️ Nächster Schritt" : "✅ Fertig"}
              </button>
            )}
          </div>

          {feedback && (
            <div className={`p-3 rounded-lg text-sm ${
              feedback === "correct"
                ? "bg-green-900/30 text-green-300 border border-green-700"
                : "bg-red-900/30 text-red-300 border border-red-700"
            }`}>
              {feedback === "correct"
                ? `✅ Richtig! ${step.explanation}`
                : `❌ Falsch — ${step.explanation}`}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-center">
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-green-400 font-bold">Aufgabe abgeschlossen!</p>
            <p className="text-slate-300 text-sm mt-1">
              {correctCount} von {problem.steps.length} Schritten richtig
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {stepResults.map((r, i) => (
                <span key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  r ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}>
                  {r ? "✓" : "✗"}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={newProblem}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
          >
            🔄 Neue Aufgabe
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Binary AND Visualizer ───────────────────────────────────────────────────

function BinaryANDVisualizer() {
  const [ip1, setIp1] = useState("192.168.1.130");
  const [ip2, setIp2] = useState("255.255.255.192");

  const bin1 = useMemo(() => ipToBinary(ip1), [ip1]);
  const bin2 = useMemo(() => ipToBinary(ip2), [ip2]);

  const result = useMemo(() => {
    if (!validateIp(ip1) || !validateIp(ip2)) return "";
    const n1 = ipToNumber(ip1);
    const n2 = ipToNumber(ip2);
    return numberToIp((n1 & n2) >>> 0);
  }, [ip1, ip2]);

  const resultBin = useMemo(() => ipToBinary(result), [result]);

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">Gib zwei IP-Adressen ein und sehe die UND-Verknüpfung bit für bit:</p>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">IP-Adresse 1</label>
          <input
            value={ip1}
            onChange={(e) => setIp1(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">IP-Adresse 2 (Maske)</label>
          <input
            value={ip2}
            onChange={(e) => setIp2(e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
          />
        </div>
      </div>

      {validateIp(ip1) && validateIp(ip2) && (
        <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm space-y-2">
          <div>
            <span className="text-blue-400 w-16 inline-block">IP 1:</span>
            {bin1.split("").map((c, i) => (
              c === "." ? <span key={i} className="text-slate-600 mx-0.5">.</span> :
              <span key={i} className="text-blue-400">{c}</span>
            ))}
            <span className="text-slate-500 ml-2">({ip1})</span>
          </div>
          <div>
            <span className="text-purple-400 w-16 inline-block">IP 2:</span>
            {bin2.split("").map((c, i) => (
              c === "." ? <span key={i} className="text-slate-600 mx-0.5">.</span> :
              <span key={i} className="text-purple-400">{c}</span>
            ))}
            <span className="text-slate-500 ml-2">({ip2})</span>
          </div>
          <div className="border-t border-slate-700 pt-2">
            <span className="text-green-400 w-16 inline-block font-bold">AND:</span>
            {resultBin.split("").map((c, i) => {
              if (c === ".") return <span key={i} className="text-slate-600 mx-0.5">.</span>;
              const b1 = bin1.replace(/\./g, "")[i - (bin1.slice(0, i + 1).split(".").length - 1)];
              const b2 = bin2.replace(/\./g, "")[i - (bin2.slice(0, i + 1).split(".").length - 1)];
              // We need a simpler approach - just show the result color
              return <span key={i} className="text-green-400">{c}</span>;
            })}
            <span className="text-green-400 ml-2 font-bold">({result})</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Quick Reference Card ────────────────────────────────────────────────────

function QuickReference() {
  const powers = [
    { n: 1, val: 2 },
    { n: 2, val: 4 },
    { n: 3, val: 8 },
    { n: 4, val: 16 },
    { n: 5, val: 32 },
    { n: 6, val: 64 },
    { n: 7, val: 128 },
    { n: 8, val: 256 },
    { n: 9, val: 512 },
    { n: 10, val: 1024 },
  ];

  const cidrTable = [
    { cidr: 24, mask: "255.255.255.0", hostBits: 8, hosts: 254 },
    { cidr: 25, mask: "255.255.255.128", hostBits: 7, hosts: 126 },
    { cidr: 26, mask: "255.255.255.192", hostBits: 6, hosts: 62 },
    { cidr: 27, mask: "255.255.255.224", hostBits: 5, hosts: 30 },
    { cidr: 28, mask: "255.255.255.240", hostBits: 4, hosts: 14 },
    { cidr: 29, mask: "255.255.255.248", hostBits: 3, hosts: 6 },
    { cidr: 30, mask: "255.255.255.252", hostBits: 2, hosts: 2 },
  ];

  return (
    <div className="space-y-4">
      {/* Powers of 2 */}
      <div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">⚡ Zweierpotenzen</h4>
        <div className="grid grid-cols-5 gap-1">
          {powers.map((p) => (
            <div key={p.n} className="bg-slate-700/50 p-2 rounded text-center">
              <p className="text-xs text-slate-400">2<sup>{p.n}</sup></p>
              <p className="text-white font-mono font-bold">{p.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CIDR Table */}
      <div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">📊 CIDR-Tabelle</h4>
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-700">
                <th className="px-2 py-1.5 text-left text-slate-300">CIDR</th>
                <th className="px-2 py-1.5 text-left text-slate-300">Maske</th>
                <th className="px-2 py-1.5 text-left text-slate-300">Host-Bits</th>
                <th className="px-2 py-1.5 text-left text-slate-300">Hosts</th>
              </tr>
            </thead>
            <tbody>
              {cidrTable.map((row) => (
                <tr key={row.cidr} className="border-t border-slate-700/50">
                  <td className="px-2 py-1.5 font-mono text-blue-400">/{row.cidr}</td>
                  <td className="px-2 py-1.5 font-mono text-white">{row.mask}</td>
                  <td className="px-2 py-1.5 text-orange-400">{row.hostBits}</td>
                  <td className="px-2 py-1.5 text-green-400 font-mono">{row.hosts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AND Rules */}
      <div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">🔧 UND-Regel</h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            { a: "1", b: "1", r: "1", good: true },
            { a: "1", b: "0", r: "0", good: false },
            { a: "0", b: "1", r: "0", good: false },
            { a: "0", b: "0", r: "0", good: false },
          ].map(({ a, b, r, good }, i) => (
            <div key={i} className={`p-2 rounded text-center text-sm font-mono ${
              good ? "bg-green-900/30 border border-green-700" : "bg-slate-700/50"
            }`}>
              <span className="text-blue-400">{a}</span>
              <span className="text-slate-500 mx-1">AND</span>
              <span className="text-purple-400">{b}</span>
              <span className="text-slate-500 mx-1">=</span>
              <span className={good ? "text-green-400" : "text-slate-400"}>{r}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">💡 Merke: Nur 1 AND 1 = 1, alles andere = 0</p>
      </div>

      {/* Binary-Decimal quick reference */}
      <div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">🔢 Binär ↔ Dezimal (1 Oktett)</h4>
        <div className="grid grid-cols-8 gap-1 text-center text-xs">
          {[128, 64, 32, 16, 8, 4, 2, 1].map((val, i) => (
            <div key={i} className="bg-slate-700/50 p-1.5 rounded">
              <p className="text-orange-400 font-mono">{val}</p>
              <p className="text-slate-500">Bit {7 - i}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Beispiel: 192 = 128 + 64 = <span className="text-green-400">11</span>000000
        </p>
      </div>
    </div>
  );
}

// ─── Exam Simulation ─────────────────────────────────────────────────────────

interface ExamQuestion {
  question: string;
  answer: string;
  points: number;
  type: "network" | "broadcast" | "hosts" | "cidr" | "mask" | "firstHost" | "lastHost";
}

function generateExamQuestion(): { scenario: string; ip: string; cidr: number; questions: ExamQuestion[] } {
  const scenarios = [
    {
      scenario: "Ein Unternehmen hat das Netzwerk 192.168.10.0/24. Teilen Sie es in 4 gleich große Subnetze auf.",
      baseIp: "192.168.10.0",
      baseCidr: 24,
      subCidr: 26,
      subnetIndex: 0,
    },
    {
      scenario: "Ein Rechenzentrum nutzt 10.0.0.0/22. Ermitteln Sie die Netzwerkparameter für den Host 10.0.2.50.",
      baseIp: "10.0.2.50",
      baseCidr: 22,
      subCidr: 22,
      subnetIndex: 0,
    },
    {
      scenario: "Eine Schule hat 172.16.0.0/20. Welche CIDR-Notation brauchen Sie für ein Subnetz mit 100 Hosts?",
      baseIp: "172.16.0.0",
      baseCidr: 20,
      subCidr: 25,
      subnetIndex: 0,
    },
    {
      scenario: "Ein Host hat die IP 192.168.5.77/27. Bestimmen Sie alle Netzwerkparameter.",
      baseIp: "192.168.5.77",
      baseCidr: 27,
      subCidr: 27,
      subnetIndex: 0,
    },
    {
      scenario: "Ein Netzwerk 10.10.10.0/28 wird benötigt. Welche IPs sind nutzbar?",
      baseIp: "10.10.10.0",
      baseCidr: 28,
      subCidr: 28,
      subnetIndex: 0,
    },
  ];

  const s = scenarios[Math.floor(Math.random() * scenarios.length)];
  const ipNum = ipToNumber(s.baseIp);
  const maskNum = s.subCidr === 0 ? 0 : (~0 << (32 - s.subCidr)) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | ~maskNum) >>> 0;
  const hostBits = 32 - s.subCidr;
  const numHosts = Math.max(0, broadcastNum - networkNum - 1);

  return {
    scenario: s.scenario,
    ip: s.baseIp,
    cidr: s.subCidr,
    questions: [
      {
        question: "Netzwerkadresse",
        answer: numberToIp(networkNum),
        points: 2,
        type: "network" as const,
      },
      {
        question: "Broadcast-Adresse",
        answer: numberToIp(broadcastNum),
        points: 2,
        type: "broadcast" as const,
      },
      {
        question: "Anzahl nutzbarer Hosts",
        answer: String(numHosts),
        points: 2,
        type: "hosts" as const,
      },
      {
        question: "Subnetzmaske (dezimal)",
        answer: cidrToMask(s.subCidr),
        points: 1,
        type: "mask" as const,
      },
      {
        question: "Erste nutzbare Host-Adresse",
        answer: numHosts > 0 ? numberToIp(networkNum + 1) : "N/A",
        points: 1,
        type: "firstHost" as const,
      },
      {
        question: "Letzte nutzbare Host-Adresse",
        answer: numHosts > 0 ? numberToIp(broadcastNum - 1) : "N/A",
        points: 1,
        type: "lastHost" as const,
      },
    ],
  };
}

function ExamSimulation() {
  const [exam, setExam] = useState(() => generateExamQuestion());
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const startExam = () => {
    setExam(generateExamQuestion());
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(300);
    setTimerRunning(true);
  };

  const submitExam = () => {
    setSubmitted(true);
    setTimerRunning(false);
  };

  const totalPoints = exam.questions.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = submitted
    ? exam.questions.reduce((sum, q) => {
        return sum + (answers[q.question]?.trim().toLowerCase() === q.answer.toLowerCase() ? q.points : 0);
      }, 0)
    : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      {!timerRunning && !submitted ? (
        <div className="text-center space-y-3">
          <p className="text-slate-300 text-sm">
            Simuliere eine IHK-Prüfungsaufgabe mit Zeitdruck (5 Minuten).
          </p>
          <button
            onClick={startExam}
            className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-bold transition-colors"
          >
            ⏱️ Prüfung starten (5 Min)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Timer */}
          <div className={`flex items-center justify-between p-3 rounded-lg ${
            timeLeft < 60 ? "bg-red-900/30 border border-red-700" : "bg-slate-700/50"
          }`}>
            <span className="text-slate-400 text-sm">⏱️ Verbleibende Zeit</span>
            <span className={`font-mono font-bold text-lg ${
              timeLeft < 60 ? "text-red-400" : "text-white"
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Scenario */}
          <div className="p-4 bg-purple-900/20 border border-purple-700 rounded-lg">
            <p className="text-purple-400 font-bold text-sm mb-1">📋 Aufgabenstellung</p>
            <p className="text-slate-300 text-sm">{exam.scenario}</p>
            <p className="text-blue-400 font-mono text-sm mt-2">
              IP: {exam.ip} / CIDR: /{exam.cidr} / Maske: {cidrToMask(exam.cidr)}
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-2">
            {exam.questions.map((q) => {
              const isCorrect = submitted && answers[q.question]?.trim().toLowerCase() === q.answer.toLowerCase();
              const isWrong = submitted && answers[q.question]?.trim().toLowerCase() !== q.answer.toLowerCase();

              return (
                <div key={q.question} className={`p-3 rounded-lg ${
                  submitted
                    ? isCorrect ? "bg-green-900/20 border border-green-700" : "bg-red-900/20 border border-red-700"
                    : "bg-slate-700/50"
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm">{q.question}</span>
                    <span className="text-slate-400 text-xs">{q.points} Pkt.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      value={answers[q.question] || ""}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.question]: e.target.value }))}
                      disabled={submitted || timeLeft <= 0}
                      placeholder="Antwort..."
                      className="flex-1 px-2 py-1 bg-slate-800 rounded text-white text-sm font-mono border border-slate-600 focus:border-blue-500 outline-none disabled:opacity-50"
                    />
                    {submitted && isWrong && (
                      <span className="text-green-400 text-xs font-mono whitespace-nowrap">→ {q.answer}</span>
                    )}
                    {submitted && isCorrect && (
                      <span className="text-green-400 text-sm">✓</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {!submitted && timeLeft > 0 && (
              <button
                onClick={submitExam}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
              >
                ✅ Abgeben
              </button>
            )}
            {(submitted || timeLeft <= 0) && (
              <button
                onClick={startExam}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
              >
                🔄 Neue Prüfung
              </button>
            )}
          </div>

          {/* Results */}
          {submitted && (
            <div className="p-4 bg-slate-700/50 rounded-lg text-center">
              <p className="text-2xl mb-1">
                {earnedPoints === totalPoints ? "🎉" : earnedPoints >= totalPoints * 0.6 ? "👍" : "📚"}
              </p>
              <p className="text-white font-bold">
                {earnedPoints} / {totalPoints} Punkte
              </p>
              <p className="text-slate-400 text-sm">
                {Math.round((earnedPoints / totalPoints) * 100)}% — {
                  earnedPoints === totalPoints ? "Perfekt!" :
                  earnedPoints >= totalPoints * 0.6 ? "Bestanden!" : "Noch üben!"
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Progress Tracking ───────────────────────────────────────────────────────

interface ProgressData {
  guidedCompleted: number;
  guidedCorrect: number;
  examCompleted: number;
  examPassed: number;
  lastPractice: number;
}

function ProgressTracker({ progress }: { progress: ProgressData }) {
  const total = progress.guidedCompleted + progress.examCompleted;
  const accuracy = total > 0 ? Math.round(((progress.guidedCorrect + progress.examPassed) / (total * 7)) * 100) : 0;

  const concepts = [
    { name: "Host-Bits berechnen", mastered: progress.guidedCompleted >= 2 },
    { name: "Subnetzmaske ableiten", mastered: progress.guidedCompleted >= 3 },
    { name: "Netzwerkadresse (AND)", mastered: progress.guidedCompleted >= 5 },
    { name: "Broadcast-Adresse", mastered: progress.guidedCompleted >= 5 },
    { name: "Host-Anzahl berechnen", mastered: progress.guidedCompleted >= 4 },
    { name: "CIDR für Host-Anzahl", mastered: progress.examCompleted >= 1 },
    { name: "VLSM", mastered: progress.examCompleted >= 2 },
  ];

  const mastered = concepts.filter((c) => c.mastered).length;

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-700/50 rounded-lg">
        <h4 className="text-white font-bold text-sm mb-3">📊 Dein Fortschritt</h4>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-400">{total}</p>
            <p className="text-xs text-slate-400">Aufgaben gelöst</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">{accuracy}%</p>
            <p className="text-xs text-slate-400">Genauigkeit</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-400">{mastered}/{concepts.length}</p>
            <p className="text-xs text-slate-400">Konzepte gemeistert</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-bold text-blue-400 mb-2">🎯 Konzept-Checkliste</h4>
        <div className="space-y-2">
          {concepts.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                c.mastered ? "bg-green-600 text-white" : "bg-slate-700 text-slate-500"
              }`}>
                {c.mastered ? "✓" : "○"}
              </span>
              <span className={`text-sm ${c.mastered ? "text-green-400" : "text-slate-400"}`}>
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {mastered < concepts.length && (
        <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <p className="text-yellow-300 text-sm">
            💡 Tipp: Übe weiter mit der &quot;Geführten Aufgabe&quot; und der &quot;Prüfungssimulation&quot;, um alle Konzepte zu meistern!
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function SubnettingTrainer() {
  const [tab, setTab] = useState<"guided" | "and" | "reference" | "exam" | "progress">("guided");
  const [progress, setProgress] = useState<ProgressData>({
    guidedCompleted: 0,
    guidedCorrect: 0,
    examCompleted: 0,
    examPassed: 0,
    lastPractice: Date.now(),
  });

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-1">🏋️ IHK Subnetting-Trainer</h3>
      <p className="text-slate-400 text-xs mb-3">Gezielte Vorbereitung auf die IHK-Prüfung</p>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-700 rounded-lg p-1 flex-wrap">
        {([
          ["guided", "📝 Geführt"],
          ["and", "🔧 AND"],
          ["reference", "📋 Referenz"],
          ["exam", "⏱️ Prüfung"],
          ["progress", "📊 Status"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex-1 px-2 py-1.5 rounded text-xs transition-colors ${
              tab === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "guided" && <GuidedPractice />}
      {tab === "and" && <BinaryANDVisualizer />}
      {tab === "reference" && <QuickReference />}
      {tab === "exam" && <ExamSimulation />}
      {tab === "progress" && <ProgressTracker progress={progress} />}
    </div>
  );
}
