"use client";

import { useState, useEffect, useRef } from "react";

interface OSILayer {
  number: number;
  name: string;
  german: string;
  pdu: string;
  protocols: string[];
  hardware: string[];
  description: string;
  example: string;
  color: string;
}

const OSI_LAYERS: OSILayer[] = [
  {
    number: 7,
    name: "Application",
    german: "Anwendungsschicht",
    pdu: "Daten",
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "DHCP", "SNMP", "SSH"],
    hardware: ["Browser", "E-Mail-Client", "Webserver"],
    description: "Direkte Benutzerschnittstelle — alle Netzwerkdienste, die der Anwender sieht.",
    example: "Du öffnest eine Website → HTTP-Request wird gesendet",
    color: "#ef4444",
  },
  {
    number: 6,
    name: "Presentation",
    german: "Darstellungsschicht",
    pdu: "Daten",
    protocols: ["SSL/TLS", "JPEG", "GIF", "MPEG", "ASCII", "EBCDIC"],
    hardware: ["Verschlüsselungshardware"],
    description: "Datenformatierung, Verschlüsselung, Kompression — übersetzt zwischen Anwendung und Netzwerk.",
    example: "HTTPS verschlüsselt die Daten mit TLS",
    color: "#f97316",
  },
  {
    number: 5,
    name: "Session",
    german: "Sitzungsschicht",
    pdu: "Daten",
    protocols: ["NetBIOS", "RPC", "PPTP", "SOCKS"],
    hardware: ["Gateway"],
    description: "Verwaltet Sitzungen zwischen Anwendungen — Aufbau, Verwaltung und Abbau von Verbindungen.",
    example: "Login-Session bleibt erhalten, auch wenn kurz die Verbindung unterbrochen wird",
    color: "#eab308",
  },
  {
    number: 4,
    name: "Transport",
    german: "Transportschicht",
    pdu: "Segment (TCP) / Datagramm (UDP)",
    protocols: ["TCP", "UDP", "SCTP"],
    hardware: ["Firewall", "Load Balancer"],
    description: "Zuverlässige Datenübertragung — Segmentierung, Flusskontrolle, Fehlerkorrektur.",
    example: "TCP stellt sicher, dass alle Daten ankommen — UDP ist schneller, aber unzuverlässig",
    color: "#22c55e",
  },
  {
    number: 3,
    name: "Network",
    german: "Netzwerkschicht",
    pdu: "Paket",
    protocols: ["IP", "ICMP", "OSPF", "BGP", "RIP", "IGMP"],
    hardware: ["Router", "Layer-3-Switch"],
    description: "Adressierung und Routing — bestimmt den Weg durch das Netzwerk.",
    example: "Router leitet Pakete anhand der IP-Adresse weiter",
    color: "#3b82f6",
  },
  {
    number: 2,
    name: "Data Link",
    german: "Sicherungsschicht",
    pdu: "Frame",
    protocols: ["Ethernet", "Wi-Fi", "PPP", "ARP", "VLAN", "STP"],
    hardware: ["Switch", "Bridge", "Access Point"],
    description: "MAC-Adressen, Fehlererkennung, Zugriff auf das Medium — verbindet benachbarte Knoten.",
    example: "Switch lernt MAC-Adressen und leitet Frames nur an den richtigen Port",
    color: "#8b5cf6",
  },
  {
    number: 1,
    name: "Physical",
    german: "Bitübertragungsschicht",
    pdu: "Bit / Symbol",
    protocols: ["Ethernet (100BASE-TX)", "USB", "Bluetooth", "DSL", "SONET"],
    hardware: ["Kabel", "Hub", "Repeater", "Netzwerkkarte", "Modem"],
    description: "Elektrische/optische Signale — die physische Übertragung von Bits über ein Medium.",
    example: "Kupferkabel überträgt elektrische Signale, Glasfaser Lichtpulse",
    color: "#6b7280",
  },
];

const QUIZ_QUESTIONS = [
  { protocol: "HTTP", correctLayer: 7 },
  { protocol: "TCP", correctLayer: 4 },
  { protocol: "IP", correctLayer: 3 },
  { protocol: "Ethernet", correctLayer: 2 },
  { protocol: "DNS", correctLayer: 7 },
  { protocol: "UDP", correctLayer: 4 },
  { protocol: "ARP", correctLayer: 2 },
  { protocol: "SMTP", correctLayer: 7 },
  { protocol: "SSL/TLS", correctLayer: 6 },
  { protocol: "FTP", correctLayer: 7 },
  { protocol: "ICMP", correctLayer: 3 },
  { protocol: "Wi-Fi", correctLayer: 2 },
  { protocol: "SSH", correctLayer: 7 },
  { protocol: "Router", correctLayer: 3 },
  { protocol: "Switch", correctLayer: 2 },
  { protocol: "Hub", correctLayer: 1 },
];

export function OSIExplorer() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [tab, setTab] = useState<"explore" | "capsulation" | "quiz">("explore");
  const [capsulationStep, setCapsulationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCapsulation = () => {
    setCapsulationStep(0);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      intervalRef.current = setInterval(() => {
        setCapsulationStep((prev) => {
          if (prev >= 6) {
            setIsAnimating(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 6;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating]);

  const handleQuizAnswer = (layer: number) => {
    const q = QUIZ_QUESTIONS[quizIndex];
    setQuizAnswer(layer);
    if (layer === q.correctLayer) {
      setQuizScore((s) => s + 1);
      setQuizFeedback(`✅ Richtig! ${q.protocol} gehört zu Schicht ${layer} (${OSI_LAYERS.find((l) => l.number === layer)?.name})`);
    } else {
      setQuizFeedback(`❌ Falsch. ${q.protocol} gehört zu Schicht ${q.correctLayer} (${OSI_LAYERS.find((l) => l.number === q.correctLayer)?.name})`);
    }
  };

  const nextQuiz = () => {
    setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
    setQuizAnswer(null);
    setQuizFeedback(null);
  };

  const layer = selectedLayer !== null ? OSI_LAYERS.find((l) => l.number === selectedLayer) : null;

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">📡 OSI-Modell Explorer</h3>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-700 rounded-lg p-1">
        {([["explore", "🔍 Erkunden"], ["capsulation", "📦 Kapselung"], ["quiz", "🎯 Quiz"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex-1 px-3 py-1.5 rounded text-sm transition-colors ${
              tab === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "explore" && (
        <div className="flex gap-4">
          {/* Layer Stack */}
          <div className="flex-1 space-y-1">
            {OSI_LAYERS.map((l) => (
              <button
                key={l.number}
                onClick={() => setSelectedLayer(l.number === selectedLayer ? null : l.number)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg border-2 transition-all text-left ${
                  selectedLayer === l.number
                    ? "border-white bg-slate-700 shadow-lg"
                    : "border-transparent hover:bg-slate-700/50"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: l.color }}
                >
                  {l.number}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">{l.name}</p>
                  <p className="text-xs text-slate-400 truncate">{l.german}</p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 rounded bg-slate-600 text-slate-300 shrink-0">{l.pdu}</span>
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          {layer && (
            <div className="flex-1 space-y-3">
              <div className="p-3 rounded-lg border-l-4" style={{ borderColor: layer.color, backgroundColor: `${layer.color}15` }}>
                <h4 className="text-base font-bold text-white">
                  Schicht {layer.number}: {layer.name}
                </h4>
                <p className="text-sm text-slate-300">{layer.german}</p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">📝 Beschreibung</p>
                <p className="text-sm text-white">{layer.description}</p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">📦 PDU (Protocol Data Unit)</p>
                <p className="text-sm font-mono text-blue-400">{layer.pdu}</p>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-2">🔌 Protokolle</p>
                <div className="flex flex-wrap gap-1">
                  {layer.protocols.map((p) => (
                    <span key={p} className="px-2 py-0.5 bg-slate-600 rounded text-xs text-slate-200">{p}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-2">🖥️ Hardware / Software</p>
                <div className="flex flex-wrap gap-1">
                  {layer.hardware.map((h) => (
                    <span key={h} className="px-2 py-0.5 bg-slate-600 rounded text-xs text-slate-200">{h}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">💡 Beispiel</p>
                <p className="text-sm text-green-300">{layer.example}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "capsulation" && (
        <div>
          <p className="text-sm text-slate-300 mb-3">
            Wenn Daten durch die OSI-Schichten wandern, wird in jeder Schicht ein <strong className="text-white">Header</strong> hinzugefügt (Kapselung). Beim Empfänger werden die Header wieder entfernt (Entkapselung).
          </p>

          <button
            onClick={startCapsulation}
            disabled={isAnimating}
            className="w-full mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            {isAnimating ? "⏳ Animation läuft..." : "▶️ Kapselung starten"}
          </button>

          <div className="space-y-1">
            {OSI_LAYERS.map((l, i) => {
              const active = capsulationStep >= (6 - i);
              return (
                <div
                  key={l.number}
                  className={`flex items-center gap-3 p-2 rounded-lg border transition-all duration-500 ${
                    active ? "border-l-4 bg-slate-700" : "border-transparent opacity-40"
                  }`}
                  style={active ? { borderColor: l.color } : {}}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: l.color }}
                  >
                    {l.number}
                  </div>
                  <span className="text-sm text-white">{l.name}</span>
                  <span className="text-xs text-slate-400 ml-2">+ {l.name} Header</span>
                  {active && (
                    <div className="ml-auto flex gap-1">
                      {Array.from({ length: 7 - i }).map((_, j) => (
                        <span
                          key={j}
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: OSI_LAYERS[6 - j].color, opacity: j === 0 ? 1 : 0.6 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-xs text-slate-400 text-center">
            {capsulationStep === 0 && "Klicke 'Starten' um die Kapselung zu sehen"}
            {capsulationStep > 0 && capsulationStep < 7 && `Schicht ${7 - capsulationStep + 1} fügt ihren Header hinzu...`}
            {capsulationStep >= 7 && "✅ Alle Header hinzugefügt — das Paket ist fertig!"}
          </div>
        </div>
      )}

      {tab === "quiz" && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-slate-300">
              Frage {quizIndex + 1} / {QUIZ_QUESTIONS.length}
            </p>
            <p className="text-sm text-green-400">Score: {quizScore}</p>
          </div>

          <div className="p-4 bg-slate-700 rounded-lg mb-4 text-center">
            <p className="text-lg text-white mb-1">
              Zu welcher OSI-Schicht gehört:
            </p>
            <p className="text-2xl font-bold text-blue-400">{QUIZ_QUESTIONS[quizIndex].protocol}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {OSI_LAYERS.map((l) => (
              <button
                key={l.number}
                onClick={() => !quizAnswer && handleQuizAnswer(l.number)}
                disabled={quizAnswer !== null}
                className={`p-2 rounded-lg border-2 text-left transition-all ${
                  quizAnswer === l.number
                    ? l.number === QUIZ_QUESTIONS[quizIndex].correctLayer
                      ? "border-green-500 bg-green-900/30"
                      : "border-red-500 bg-red-900/30"
                    : quizAnswer !== null && l.number === QUIZ_QUESTIONS[quizIndex].correctLayer
                    ? "border-green-500 bg-green-900/20"
                    : "border-slate-600 hover:border-slate-500 hover:bg-slate-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: l.color }}
                  >
                    {l.number}
                  </span>
                  <span className="text-sm text-white">{l.name}</span>
                </div>
              </button>
            ))}
          </div>

          {quizFeedback && (
            <div className={`p-3 rounded-lg text-sm mb-3 ${
              quizFeedback.startsWith("✅") ? "bg-green-900/30 text-green-300 border border-green-700" : "bg-red-900/30 text-red-300 border border-red-700"
            }`}>
              {quizFeedback}
            </div>
          )}

          {quizAnswer !== null && (
            <button
              onClick={nextQuiz}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors"
            >
              ➡️ Nächste Frage
            </button>
          )}
        </div>
      )}
    </div>
  );
}
