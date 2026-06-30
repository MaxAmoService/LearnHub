"use client";

import { useState, useMemo, useCallback } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

// ─── Utility Functions ───────────────────────────────────────────────────────

function ipToBinary(ip: string): string {
  return ip
    .split(".")
    .map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
    .join(".");
}

function ipToNumber(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function numberToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255,
  ].join(".");
}

function cidrToMask(cidr: number): string {
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return numberToIp(mask);
}

function cidrToMaskBinary(cidr: number): string {
  let bits = "";
  for (let i = 0; i < 32; i++) {
    if (i > 0 && i % 8 === 0) bits += ".";
    bits += i < cidr ? "1" : "0";
  }
  return bits;
}

function andIp(ip: string, cidr: number): string {
  const ipNum = ipToNumber(ip);
  const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return numberToIp((ipNum & maskNum) >>> 0);
}

function getBroadcast(ip: string, cidr: number): string {
  const networkNum = ipToNumber(andIp(ip, cidr));
  const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return numberToIp((networkNum | ~maskNum) >>> 0);
}

function validateIp(ip: string): boolean {
  const parts = ip.split(".");
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    const n = Number(p);
    return !isNaN(n) && n >= 0 && n <= 255 && p === String(n);
  });
}

// ─── SubnetResult ────────────────────────────────────────────────────────────

interface SubnetResult {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  numHosts: number;
  subnetMask: string;
  wildcardMask: string;
}

function calculateSubnet(ip: string, cidr: number): SubnetResult {
  const ipNum = ipToNumber(ip);
  const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | ~maskNum) >>> 0;
  const wildcardNum = (~maskNum) >>> 0;
  const numHosts = Math.max(0, broadcastNum - networkNum - 1);

  return {
    network: numberToIp(networkNum),
    broadcast: numberToIp(broadcastNum),
    firstHost: numHosts > 0 ? numberToIp(networkNum + 1) : "N/A",
    lastHost: numHosts > 0 ? numberToIp(broadcastNum - 1) : "N/A",
    numHosts,
    subnetMask: cidrToMask(cidr),
    wildcardMask: numberToIp(wildcardNum),
  };
}

// ─── Step-by-Step Solution ───────────────────────────────────────────────────

function StepByStepSolution({ ip, cidr }: { ip: string; cidr: number }) {
  const result = useMemo(() => calculateSubnet(ip, cidr), [ip, cidr]);
  const ipBin = useMemo(() => ipToBinary(ip), [ip]);
  const maskBin = useMemo(() => cidrToMaskBinary(cidr), [cidr]);
  const networkBin = useMemo(() => ipToBinary(result.network), [result.network]);
  const broadcastBin = useMemo(() => ipToBinary(result.broadcast), [result.broadcast]);

  const ipOctets = ipBin.split(".");
  const maskOctets = maskBin.split(".");
  const networkOctets = networkBin.split(".");
  const broadcastOctets = broadcastBin.split(".");

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider">📋 Schritt-für-Schritt-Lösung</h4>

      {/* Step 1: IP to Binary */}
      <StepCard step={1} title="IP-Adresse in Binär" color="blue">
        <p className="text-slate-300 text-sm mb-2">Jedes Oktett in 8 Bit umwandeln:</p>
        <div className="font-mono text-sm">
          <span className="text-white">{ip}</span>
          <span className="text-slate-500 mx-2">→</span>
          {ipOctets.map((oct, i) => (
            <span key={i}>
              {i > 0 && <span className="text-slate-500">.</span>}
              <BitSpan bits={oct} color="blue" />
            </span>
          ))}
        </div>
      </StepCard>

      {/* Step 2: Mask to Binary */}
      <StepCard step={2} title="Subnetzmaske / Binär" color="purple">
        <p className="text-slate-300 text-sm mb-2">
          /{cidr} = {cidr} Einsen, {32 - cidr} Nullen:
        </p>
        <div className="font-mono text-sm">
          <span className="text-white">{result.subnetMask}</span>
          <span className="text-slate-500 mx-2">→</span>
          {maskOctets.map((oct, i) => (
            <span key={i}>
              {i > 0 && <span className="text-slate-500">.</span>}
              <BitSpan bits={oct} color="purple" />
            </span>
          ))}
        </div>
        <div className="flex gap-4 text-xs mt-2">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-blue-600 rounded" /> Netz-Bits ({cidr})
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-orange-600 rounded" /> Host-Bits ({32 - cidr})
          </span>
        </div>
      </StepCard>

      {/* Step 3: AND Operation */}
      <StepCard step={3} title="AND-Verknüpfung → Netzwerkadresse" color="green">
        <p className="text-slate-300 text-sm mb-2">
          Jedes Bit der IP mit dem entsprechenden Bit der Maske UND-verknüpfen:
          <span className="text-slate-500 ml-1">(1 AND 1 = 1, sonst 0)</span>
        </p>
        <div className="font-mono text-xs space-y-1 bg-slate-900/50 p-3 rounded-lg">
          <div>
            <span className="text-blue-400 w-20 inline-block">IP:</span>
            {ipOctets.map((oct, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-600">.</span>}
                <BitSpan bits={oct} color="blue" />
              </span>
            ))}
          </div>
          <div>
            <span className="text-purple-400 w-20 inline-block">Maske:</span>
            {maskOctets.map((oct, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-600">.</span>}
                <BitSpan bits={oct} color="purple" />
              </span>
            ))}
          </div>
          <div className="border-t border-slate-600 pt-1">
            <span className="text-green-400 w-20 inline-block font-bold">AND:</span>
            {networkOctets.map((oct, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-600">.</span>}
                <BitSpan bits={oct} color="green" />
              </span>
            ))}
          </div>
        </div>
        <p className="text-green-400 font-bold text-sm mt-2">
          ✅ Netzwerkadresse: {result.network}
        </p>
      </StepCard>

      {/* Step 4: Broadcast */}
      <StepCard step={4} title="Broadcast-Adresse" color="red">
        <p className="text-slate-300 text-sm mb-2">
          Alle Host-Bits auf 1 setzen:
        </p>
        <div className="font-mono text-xs space-y-1 bg-slate-900/50 p-3 rounded-lg">
          <div>
            <span className="text-green-400 w-24 inline-block">Netzwerk:</span>
            {networkOctets.map((oct, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-600">.</span>}
                <span>
                  {oct.split("").map((bit, j) => {
                    const globalBit = i * 8 + j;
                    const isHost = globalBit >= cidr;
                    return (
                      <span
                        key={j}
                        className={isHost ? "text-orange-400" : "text-green-400"}
                      >
                        {bit}
                      </span>
                    );
                  })}
                </span>
              </span>
            ))}
          </div>
          <div>
            <span className="text-red-400 w-24 inline-block font-bold">Broadcast:</span>
            {broadcastOctets.map((oct, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-600">.</span>}
                <BitSpan bits={oct} color="red" />
              </span>
            ))}
          </div>
        </div>
        <p className="text-red-400 font-bold text-sm mt-2">
          ✅ Broadcast-Adresse: {result.broadcast}
        </p>
      </StepCard>

      {/* Step 5: Hosts */}
      <StepCard step={5} title="Erste & letzte nutzbare Adresse" color="orange">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-slate-900/50 p-3 rounded-lg">
            <p className="text-slate-400 text-xs">Erster Host (Netzwerk + 1)</p>
            <p className="text-green-400 font-mono font-bold">{result.firstHost}</p>
          </div>
          <div className="bg-slate-900/50 p-3 rounded-lg">
            <p className="text-slate-400 text-xs">Letzter Host (Broadcast - 1)</p>
            <p className="text-green-400 font-mono font-bold">{result.lastHost}</p>
          </div>
        </div>
        <div className="bg-slate-900/50 p-3 rounded-lg mt-3">
          <p className="text-slate-400 text-xs">Anzahl nutzbarer Hosts</p>
          <p className="text-orange-400 font-mono font-bold text-lg">
            2<sup>{32 - cidr}</sup> - 2 = {result.numHosts}
          </p>
        </div>
      </StepCard>
    </div>
  );
}

// ─── Bit Visualization ───────────────────────────────────────────────────────

function BitVisualization({ ip, cidr }: { ip: string; cidr: number }) {
  const ipBin = useMemo(() => ipToBinary(ip), [ip]);
  const maskBin = useMemo(() => cidrToMaskBinary(cidr), [cidr]);
  const networkBin = useMemo(() => ipToBinary(andIp(ip, cidr)), [ip, cidr]);
  const broadcastBin = useMemo(() => ipToBinary(getBroadcast(ip, cidr)), [ip, cidr]);

  return (
    <div className="space-y-4">
      <BitRow label="IP-Adresse" value={ip} binary={ipBin} cidr={cidr} type="ip" />
      <BitRow label="Subnetzmaske" value={cidrToMask(cidr)} binary={maskBin} cidr={cidr} type="mask" />
      <BitRow label="Netzwerkadresse" value={andIp(ip, cidr)} binary={networkBin} cidr={cidr} type="network" />
      <BitRow label="Broadcast" value={getBroadcast(ip, cidr)} binary={broadcastBin} cidr={cidr} type="broadcast" />
      <div className="flex gap-4 text-xs pt-2">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-blue-600 rounded" /> Netzwerk-Bits
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 bg-orange-600 rounded" /> Host-Bits
        </span>
      </div>
    </div>
  );
}

function BitRow({ label, value, binary, cidr, type }: {
  label: string; value: string; binary: string; cidr: number;
  type: "ip" | "mask" | "network" | "broadcast";
}) {
  const colorMap = {
    ip: { net: "bg-blue-600", host: "bg-orange-600", text: "text-blue-400" },
    mask: { net: "bg-blue-600", host: "bg-slate-600", text: "text-purple-400" },
    network: { net: "bg-green-600", host: "bg-slate-700", text: "text-green-400" },
    broadcast: { net: "bg-red-600", host: "bg-red-400", text: "text-red-400" },
  };
  const colors = colorMap[type];

  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className={`text-xs font-bold ${colors.text}`}>{label}</span>
        <span className="text-xs text-slate-400 font-mono">{value}</span>
      </div>
      <div className="flex gap-0.5 flex-wrap">
        {binary.split("").map((char, i) => {
          if (char === ".") {
            return <span key={i} className="text-slate-600 mx-0.5 self-start mt-1">.</span>;
          }
          const pos = i - (binary.slice(0, i + 1).split(".").length - 1);
          const isNet = pos < cidr;
          const bg = isNet ? colors.net : colors.host;
          const tooltip = isNet ? `Netzwerk-Bit ${pos + 1}` : `Host-Bit ${pos - cidr + 1}`;
          return (
            <span
              key={i}
              className={`w-6 h-6 flex items-center justify-center rounded text-xs font-mono text-white ${bg} cursor-default transition-transform hover:scale-125 hover:z-10 relative group`}
              title={tooltip}
            >
              {char}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                {tooltip}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Quiz Mode ───────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "network" | "hosts" | "cidr" | "inSubnet";

interface QuizQuestion {
  ip: string;
  cidr: number;
  questionType: QuestionType;
  question: string;
  answer: string;
  explanation: string;
  difficulty: Difficulty;
  // For "inSubnet" type
  testIp?: string;
  isInRange?: boolean;
}

function generateQuizQuestion(difficulty: Difficulty): QuizQuestion {
  let cidr: number;
  let ipBase: string;

  if (difficulty === "easy") {
    cidr = 24 + Math.floor(Math.random() * 2); // /24 or /25
    ipBase = `192.168.${Math.floor(Math.random() * 10) + 1}.`;
  } else if (difficulty === "medium") {
    cidr = 26 + Math.floor(Math.random() * 3); // /26 to /28
    ipBase = `10.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.`;
  } else {
    cidr = 22 + Math.floor(Math.random() * 7); // /22 to /28
    ipBase = `172.16.${Math.floor(Math.random() * 20)}.`;
  }

  const hostPart = Math.floor(Math.random() * 254) + 1;
  const ip = ipBase + hostPart;
  const result = calculateSubnet(ip, cidr);

  const qTypes: QuestionType[] = ["network", "hosts", "cidr", "inSubnet"];
  const qType = qTypes[Math.floor(Math.random() * qTypes.length)];

  let question: string;
  let answer: string;
  let explanation: string;
  let testIp: string | undefined;
  let isInRange: boolean | undefined;

  switch (qType) {
    case "network":
      question = `Was ist die Netzwerkadresse von ${ip}/${cidr}?`;
      answer = result.network;
      explanation = `AND-Verknüpfung von ${ip} und ${result.subnetMask} = ${result.network}`;
      break;
    case "hosts":
      question = `Wie viele nutzbare Hosts hat das Netz ${ip}/${cidr}?`;
      answer = String(result.numHosts);
      explanation = `${32 - cidr} Host-Bits → 2^${32 - cidr} - 2 = ${result.numHosts}`;
      break;
    case "cidr": {
      const needed = [10, 30, 60, 120, 250][Math.floor(Math.random() * 5)];
      let h = 0;
      while ((1 << h) - 2 < needed) h++;
      answer = "/" + (32 - h);
      question = `Welche CIDR-Notation brauchst du für mindestens ${needed} Hosts?`;
      explanation = `${needed} Hosts → 2^h - 2 ≥ ${needed} → h = ${h} (2^${h} = ${1 << h}) → /${32 - h}`;
      break;
    }
    case "inSubnet": {
      const networkNum = ipToNumber(result.network);
      const broadcastNum = ipToNumber(result.broadcast);
      const showInSubnet = Math.random() > 0.4;
      if (showInSubnet) {
        const hostNum = networkNum + Math.floor(Math.random() * (broadcastNum - networkNum - 1)) + 1;
        testIp = numberToIp(hostNum);
        isInRange = true;
      } else {
        const offset = Math.floor(Math.random() * 200) + 200;
        testIp = numberToIp((broadcastNum + offset) >>> 0);
        isInRange = false;
      }
      question = `Gehört die IP ${testIp} zum Netz ${ip}/${cidr}?`;
      answer = isInRange ? "Ja" : "Nein";
      explanation = isInRange
        ? `${testIp} liegt zwischen ${result.network} (Netzwerk) und ${result.broadcast} (Broadcast) — gehört zum Netz.`
        : `${testIp} liegt außerhalb von ${result.network} – ${result.broadcast} — gehört NICHT zum Netz.`;
      break;
    }
    default:
      question = "";
      answer = "";
      explanation = "";
  }

  return { ip, cidr, questionType: qType, question, answer, explanation, difficulty, testIp, isInRange };
}

function QuizMode() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const newQuestion = useCallback(() => {
    setQuestion(generateQuizQuestion(difficulty));
    setUserAnswer("");
    setFeedback(null);
    setShowSolution(false);
  }, [difficulty]);

  const checkAnswer = () => {
    if (!question) return;
    const clean = userAnswer.trim().toLowerCase();
    const correct = question.answer.toLowerCase();
    setTotal((t) => t + 1);

    if (clean === correct) {
      setFeedback("correct");
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setFeedback("wrong");
      setStreak(0);
    }
    setShowSolution(true);
  };

  return (
    <div className="space-y-4">
      {/* Difficulty selector */}
      <div className="flex gap-2">
        {([
          ["easy", "Leicht", "/24–/25"],
          ["medium", "Mittel", "/26–/28"],
          ["hard", "Schwer", "VLSM"],
        ] as const).map(([d, label, desc]) => (
          <button
            key={d}
            onClick={() => { setDifficulty(d); setQuestion(null); setScore(0); setStreak(0); setTotal(0); }}
            className={`flex-1 px-3 py-2 rounded-lg text-xs transition-colors ${
              difficulty === d
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            <div className="font-bold">{label}</div>
            <div className="opacity-70">{desc}</div>
          </button>
        ))}
      </div>

      {/* Score */}
      {total > 0 && (
        <div className="flex gap-4 text-sm">
          <span className="text-green-400">✅ {score}/{total}</span>
          <span className="text-orange-400">🔥 Streak: {streak}</span>
          <span className="text-slate-400">{Math.round((score / total) * 100)}%</span>
        </div>
      )}

      {!question ? (
        <button
          onClick={newQuestion}
          className="w-full px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          🎯 Aufgabe starten
        </button>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-slate-700/50 rounded-lg">
            <p className="text-sm text-white">{question.question}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-mono text-blue-400 text-sm">{question.ip}</span>
              <span className="text-slate-500">/</span>
              <span className="font-mono text-orange-400 text-sm">{question.cidr}</span>
              <span className="text-xs text-slate-500 ml-2">Maske: {cidrToMask(question.cidr)}</span>
            </div>
          </div>

          <input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !feedback && checkAnswer()}
            placeholder={
              question.questionType === "hosts" ? "Anzahl..." :
              question.questionType === "inSubnet" ? "Ja oder Nein..." :
              "Deine Antwort..."
            }
            className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
          />

          <div className="flex gap-2">
            {!feedback && (
              <button
                onClick={checkAnswer}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
              >
                ✅ Prüfen
              </button>
            )}
            <button
              onClick={newQuestion}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-colors"
            >
              ➡️ Nächste
            </button>
          </div>

          {feedback && (
            <div className={`p-3 rounded-lg text-sm ${
              feedback === "correct"
                ? "bg-green-900/30 text-green-300 border border-green-700"
                : "bg-red-900/30 text-red-300 border border-red-700"
            }`}>
              {feedback === "correct" ? "✅ Richtig!" : `❌ Falsch — Richtige Antwort: ${question.answer}`}
              <p className="text-xs mt-1 opacity-70">{question.explanation}</p>
            </div>
          )}

          {showSolution && question.questionType !== "cidr" && (
            <div className="mt-3">
              <StepByStepSolution ip={question.ip} cidr={question.cidr} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── IHK Exam Mode ───────────────────────────────────────────────────────────

interface IHKScenario {
  title: string;
  description: string;
  network: string;
  departments: { name: string; hosts: number }[];
}

const ihkScenarios: IHKScenario[] = [
  {
    title: "Firma mit 4 Abteilungen",
    description: "Eine Firma hat das Netzwerk 192.168.1.0/24 und möchte es für 4 Abteilungen aufteilen.",
    network: "192.168.1.0/24",
    departments: [
      { name: "Vertrieb", hosts: 50 },
      { name: "Entwicklung", hosts: 20 },
      { name: "Verwaltung", hosts: 10 },
      { name: "Geschäftsführung", hosts: 5 },
    ],
  },
  {
    title: "Schule mit 3 Gebäuden",
    description: "Eine Schule hat 10.0.0.0/22 und braucht Subnetze für 3 Gebäude.",
    network: "10.0.0.0/22",
    departments: [
      { name: "Hauptgebäude (PC-Pools)", hosts: 200 },
      { name: "Nebengebäude (Verwaltung)", hosts: 30 },
      { name: "Sporthalle (WLAN)", hosts: 50 },
    ],
  },
  {
    title: "Klinik mit 5 Bereichen",
    description: "Eine Klinik hat 172.20.0.0/20 und teilt es in 5 Bereiche auf.",
    network: "172.20.0.0/20",
    departments: [
      { name: "Patientenstation", hosts: 500 },
      { name: "Verwaltung", hosts: 80 },
      { name: "Labor", hosts: 40 },
      { name: "Notaufnahme", hosts: 20 },
      { name: "IT-Abteilung", hosts: 10 },
    ],
  },
  {
    title: "Startup mit 3 Teams",
    description: "Ein Startup hat 10.10.0.0/24 und muss es für 3 Teams aufteilen.",
    network: "10.10.0.0/24",
    departments: [
      { name: "Frontend-Team", hosts: 30 },
      { name: "Backend-Team", hosts: 15 },
      { name: "DevOps", hosts: 5 },
    ],
  },
];

function solveVLSM(scenario: IHKScenario) {
  const baseNetwork = scenario.network;
  const baseParts = baseNetwork.split("/");
  const baseIp = baseParts[0];
  const baseCidr = parseInt(baseParts[1]);

  // Sort departments by size (largest first)
  const sorted = [...scenario.departments].sort((a, b) => b.hosts - a.hosts);

  const results: {
    name: string;
    hosts: number;
    cidr: number;
    availableHosts: number;
    networkAddr: string;
    broadcastAddr: string;
    firstHost: string;
    lastHost: string;
    mask: string;
  }[] = [];

  let currentNetworkNum = ipToNumber(baseIp);

  for (const dept of sorted) {
    let h = 0;
    while ((1 << h) - 2 < dept.hosts) h++;
    const cidr = 32 - h;
    const available = (1 << h) - 2;
    const networkAddr = numberToIp(currentNetworkNum);
    const maskNum = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const broadcastNum = (currentNetworkNum | ~maskNum) >>> 0;

    results.push({
      name: dept.name,
      hosts: dept.hosts,
      cidr,
      availableHosts: available,
      networkAddr,
      broadcastAddr: numberToIp(broadcastNum),
      firstHost: numberToIp(currentNetworkNum + 1),
      lastHost: numberToIp(broadcastNum - 1),
      mask: cidrToMask(cidr),
    });

    currentNetworkNum = broadcastNum + 1;
  }

  return results;
}

function IHKExamMode() {
  const [scenario, setScenario] = useState<IHKScenario | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [answers, setAnswers] = useState<Record<string, { cidr: string; network: string }>>({});

  const loadScenario = () => {
    const s = ihkScenarios[Math.floor(Math.random() * ihkScenarios.length)];
    setScenario(s);
    setShowSolution(false);
    setAnswers({});
  };

  const solution = useMemo(() => {
    if (!scenario) return [];
    return solveVLSM(scenario);
  }, [scenario]);

  const updateAnswer = (deptName: string, field: "cidr" | "network", value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [deptName]: { ...prev[deptName], [field]: value },
    }));
  };

  return (
    <div className="space-y-4">
      {!scenario ? (
        <button
          onClick={loadScenario}
          className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          📋 IHK-Szenario starten
        </button>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-purple-900/20 border border-purple-700 rounded-lg">
            <h4 className="text-purple-400 font-bold text-sm mb-1">📋 {scenario.title}</h4>
            <p className="text-slate-300 text-sm">{scenario.description}</p>
            <p className="text-blue-400 font-mono text-sm mt-2">
              Ausgangsnetzwerk: {scenario.network}
            </p>
          </div>

          <p className="text-slate-400 text-xs">
            Berechne für jede Abteilung die CIDR-Notation und Netzwerkadresse. Sortiere nach Größe (größte zuerst)!
          </p>

          <div className="space-y-2">
            {[...scenario.departments]
              .sort((a, b) => b.hosts - a.hosts)
              .map((dept) => (
                <div key={dept.name} className="p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">{dept.name}</span>
                    <span className="text-orange-400 text-xs font-mono">{dept.hosts} Hosts benötigt</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-slate-500">CIDR</label>
                      <input
                        value={answers[dept.name]?.cidr || ""}
                        onChange={(e) => updateAnswer(dept.name, "cidr", e.target.value)}
                        placeholder="/26"
                        className="w-full px-2 py-1 bg-slate-800 rounded text-white text-sm font-mono border border-slate-600 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Netzwerkadresse</label>
                      <input
                        value={answers[dept.name]?.network || ""}
                        onChange={(e) => updateAnswer(dept.name, "network", e.target.value)}
                        placeholder="192.168.1.0"
                        className="w-full px-2 py-1 bg-slate-800 rounded text-white text-sm font-mono border border-slate-600 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowSolution(true)}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm transition-colors"
            >
              💡 Lösung anzeigen
            </button>
            <button
              onClick={loadScenario}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm transition-colors"
            >
              🔄 Neues Szenario
            </button>
          </div>

          {showSolution && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-green-400 uppercase tracking-wider">✅ VLSM-Lösung</h4>
              {solution.map((s, i) => {
                const userCidr = answers[s.name]?.cidr?.trim();
                const userNetwork = answers[s.name]?.network?.trim();
                const cidrCorrect = userCidr === `/${s.cidr}`;
                const networkCorrect = userNetwork === s.networkAddr;

                return (
                  <div key={i} className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-green-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium text-sm">{s.name}</span>
                      <span className="text-slate-400 text-xs">{s.hosts} Hosts benötigt</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500">CIDR: </span>
                        <span className={`font-mono ${cidrCorrect ? "text-green-400" : userCidr ? "text-red-400" : "text-white"}`}>
                          /{s.cidr}
                        </span>
                        {userCidr && !cidrCorrect && <span className="text-red-400 ml-1">(deine: {userCidr})</span>}
                      </div>
                      <div>
                        <span className="text-slate-500">Verfügbar: </span>
                        <span className="text-white font-mono">{s.availableHosts} Hosts</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Netzwerk: </span>
                        <span className={`font-mono ${networkCorrect ? "text-green-400" : userNetwork ? "text-red-400" : "text-white"}`}>
                          {s.networkAddr}
                        </span>
                        {userNetwork && !networkCorrect && <span className="text-red-400 ml-1">(deine: {userNetwork})</span>}
                      </div>
                      <div>
                        <span className="text-slate-500">Broadcast: </span>
                        <span className="text-white font-mono">{s.broadcastAddr}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Erster Host: </span>
                        <span className="text-green-400 font-mono">{s.firstHost}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Letzter Host: </span>
                        <span className="text-green-400 font-mono">{s.lastHost}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-500">Maske: </span>
                        <span className="text-white font-mono">{s.mask}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Helper Components ───────────────────────────────────────────────────────

function BitSpan({ bits, color }: { bits: string; color: string }) {
  const colorClass = {
    blue: "text-blue-400",
    purple: "text-purple-400",
    green: "text-green-400",
    red: "text-red-400",
    orange: "text-orange-400",
  }[color] || "text-white";

  return (
    <span className={colorClass}>
      {bits.split("").map((b, i) => (
        <span key={i}>{b}</span>
      ))}
    </span>
  );
}

function StepCard({ step, title, color, children }: {
  step: number; title: string; color: string; children: React.ReactNode;
}) {
  const borderColor = {
    blue: "border-blue-600",
    purple: "border-purple-600",
    green: "border-green-600",
    red: "border-red-600",
    orange: "border-orange-600",
  }[color] || "border-slate-600";

  const stepBg = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    green: "bg-green-600",
    red: "bg-red-600",
    orange: "bg-orange-600",
  }[color] || "bg-slate-600";

  return (
    <div className={`p-3 rounded-lg border-l-4 ${borderColor} bg-slate-800/50`}>
      <div className="flex items-center gap-2 mb-2">
        <span className={`w-5 h-5 rounded-full ${stepBg} text-white text-xs flex items-center justify-center font-bold`}>
          {step}
        </span>
        <span className="text-white text-sm font-bold">{title}</span>
      </div>
      {children}
    </div>
  );
}

function InfoBox({ label, value, color }: { label: string; value: string; color: string }) {
  const colors: Record<string, string> = {
    blue: "border-blue-600 bg-blue-900/20",
    red: "border-red-600 bg-red-900/20",
    green: "border-green-600 bg-green-900/20",
    purple: "border-purple-600 bg-purple-900/20",
    yellow: "border-yellow-600 bg-yellow-900/20",
    orange: "border-orange-600 bg-orange-900/20",
    cyan: "border-cyan-600 bg-cyan-900/20",
  };
  return (
    <div className={`p-2 rounded-lg border ${colors[color] || colors.blue}`}>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-mono text-white font-medium">{value}</p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function SubnetCalculator() {
  const [ip, setIp] = useState("192.168.1.100");
  const [cidr, setCidr] = useState(26);
  const [tab, setTab] = useState<"calc" | "bits" | "steps" | "quiz" | "ihk">("calc");
  const [calcResult, setCalcResult] = useState<SubnetResult | null>(null);
  const [ipError, setIpError] = useState(false);

  const doCalculate = () => {
    if (!validateIp(ip)) {
      setIpError(true);
      return;
    }
    setIpError(false);
    setCalcResult(calculateSubnet(ip, cidr));
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">🧮 Subnetting-Rechner</h3>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-700 rounded-lg p-1 flex-wrap">
        {([
          ["calc", "🧮 Rechner"],
          ["steps", "📋 Schritte"],
          ["bits", "📊 Bits"],
          ["quiz", "🎯 Quiz"],
          ["ihk", "📋 IHK-Prüfung"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex-1 px-2 py-1.5 rounded text-xs sm:text-sm transition-colors ${
              tab === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Calculator Tab */}
      {tab === "calc" && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">IP-Adresse</label>
              <input
                value={ip}
                onChange={(e) => { setIp(e.target.value); setIpError(false); }}
                placeholder="192.168.1.100"
                className={`w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border ${
                  ipError ? "border-red-500" : "border-slate-600"
                } focus:border-blue-500 outline-none font-mono`}
              />
              {ipError && <p className="text-red-400 text-xs mt-1">Ungültige IP-Adresse</p>}
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">CIDR: /{cidr}</label>
              <input
                type="range"
                min={0}
                max={32}
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>/0</span>
                <span className="text-orange-400">{32 - cidr} Host-Bits</span>
                <span>/32</span>
              </div>
            </div>
          </div>

          <button
            onClick={doCalculate}
            className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🔢 Berechnen
          </button>

          {calcResult && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <InfoBox label="Netzadresse" value={calcResult.network} color="blue" />
                <InfoBox label="Broadcast" value={calcResult.broadcast} color="red" />
                <InfoBox label="Erster Host" value={calcResult.firstHost} color="green" />
                <InfoBox label="Letzter Host" value={calcResult.lastHost} color="green" />
                <InfoBox label="Anzahl Hosts" value={String(calcResult.numHosts)} color="orange" />
                <InfoBox label="Subnetzmaske" value={calcResult.subnetMask} color="purple" />
                <InfoBox label="Wildcard-Maske" value={calcResult.wildcardMask} color="yellow" />
                <InfoBox label="CIDR" value={`/${cidr}`} color="cyan" />
              </div>
              <p className="text-xs text-slate-500 text-center">
                💡 Wechsle zum Tab &quot;📋 Schritte&quot; für die detaillierte Berechnung!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step-by-Step Tab */}
      {tab === "steps" && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">IP-Adresse</label>
              <input
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">CIDR: /{cidr}</label>
              <input
                type="range"
                min={0}
                max={32}
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>
          {validateIp(ip) && <StepByStepSolution ip={ip} cidr={cidr} />}
        </div>
      )}

      {/* Bit View Tab */}
      {tab === "bits" && (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">IP-Adresse</label>
              <input
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">CIDR: /{cidr}</label>
              <input
                type="range"
                min={0}
                max={32}
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full mt-2"
              />
            </div>
          </div>
          {validateIp(ip) && <BitVisualization ip={ip} cidr={cidr} />}
        </div>
      )}

      {/* Quiz Tab */}
      {tab === "quiz" && <QuizMode />}

      {/* IHK Exam Tab */}
      {tab === "ihk" && <IHKExamMode />}
    </div>
  );
}
