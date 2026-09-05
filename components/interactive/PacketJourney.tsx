"use client";

import { useState, useEffect, useCallback } from "react";

interface OSILayer {
  number: number;
  name: string;
  german: string;
  pdu: string;
  color: string;
  icon: string;
  action: string;
  encapsulation: string;
  example: string;
}

const OSI_LAYERS: OSILayer[] = [
  {
    number: 7,
    name: "Application",
    german: "Anwendung",
    pdu: "Daten",
    color: "#ef4444",
    icon: "🌐",
    action: "HTTP-Request erstellen",
    encapsulation: "HTTP GET /index.html",
    example: "Browser gibt URL ein",
  },
  {
    number: 6,
    name: "Presentation",
    german: "Darstellung",
    pdu: "Daten",
    color: "#f97316",
    icon: "🔐",
    action: "Daten verschlüsseln & formatieren",
    encapsulation: "TLS-Header + verschlüsselte Daten",
    example: "HTTPS verschlüsselt mit TLS",
  },
  {
    number: 5,
    name: "Session",
    german: "Sitzung",
    pdu: "Daten",
    color: "#eab308",
    icon: "🤝",
    action: "Sitzung aufbauen",
    encapsulation: "Session-ID hinzugefügt",
    example: "TCP-Verbindungsdaten",
  },
  {
    number: 4,
    name: "Transport",
    german: "Transport",
    pdu: "Segment",
    color: "#22c55e",
    icon: "📦",
    action: "Ports & Fehlerprüfung hinzufügen",
    encapsulation: "TCP/UDP-Header (Port 80/443)",
    example: "Quell- & Zielport, Sequenznummer",
  },
  {
    number: 3,
    name: "Network",
    german: "Netzwerk",
    pdu: "Paket",
    color: "#3b82f6",
    icon: "🗺️",
    action: "IP-Adressen hinzufügen",
    encapsulation: "IP-Header (Quelle → Ziel)",
    example: "192.168.1.1 → 93.184.216.34",
  },
  {
    number: 2,
    name: "Data Link",
    german: "Datenschicht",
    pdu: "Frame",
    color: "#8b5cf6",
    icon: "🔗",
    action: "MAC-Adressen & FCS hinzufügen",
    encapsulation: "Ethernet-Header + FCS",
    example: "AA:BB:CC:DD:EE:01 → Router-MAC",
  },
  {
    number: 1,
    name: "Physical",
    german: "Bitübertragung",
    pdu: "Bits",
    color: "#6366f1",
    icon: "⚡",
    action: "Bits auf das Medium senden",
    encapsulation: "Elektrische Signale / Licht",
    example: "Kupferkabel: Spannung, Glasfaser: Licht",
  },
];

const PROTOCOL_MAP: Record<number, string[]> = {
  7: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS"],
  6: ["SSL/TLS", "JPEG", "ASCII"],
  5: ["NetBIOS", "RPC"],
  4: ["TCP", "UDP"],
  3: ["IP", "ICMP", "ARP"],
  2: ["Ethernet", "Wi-Fi", "PPP"],
  1: ["1000BASE-T", "100BASE-TX"],
};

interface AnimationStep {
  layer: number;
  phase: "down" | "up";
  data: string;
}

export function PacketJourney() {
  const [direction, setDirection] = useState<"send" | "receive">("send");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showProtocols, setShowProtocols] = useState<number | null>(null);
  const [packetData, setPacketData] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [speed, setSpeed] = useState<"slow" | "normal" | "fast">("normal");

  const speedMs = speed === "slow" ? 1500 : speed === "normal" ? 800 : 400;

  const layers = direction === "send" ? OSI_LAYERS : [...OSI_LAYERS].reverse();

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setPacketData([]);
  }, []);

  useEffect(() => {
    if (!isAnimating || currentStep < 0 || currentStep >= layers.length) {
      if (currentStep >= layers.length && isAnimating) {
        setIsAnimating(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      const layer = layers[currentStep];
      setCompletedSteps((prev) => new Set(Array.from(prev).concat(layer.number)));

      if (direction === "send") {
        setPacketData((prev) => [
          `${layer.pdu}: ${layer.encapsulation}`,
          ...prev,
        ]);
      } else {
        setPacketData((prev) => [
          ...prev,
          `${layer.pdu}: ${layer.encapsulation}`,
        ]);
      }

      setCurrentStep((prev) => prev + 1);
    }, speedMs);

    return () => clearTimeout(timer);
  }, [isAnimating, currentStep, layers, direction, speedMs]);

  const reset = () => {
    setIsAnimating(false);
    setCurrentStep(-1);
    setCompletedSteps(new Set());
    setPacketData([]);
  };

  return (
    <div className="w-full bg-slate-900/50 rounded-xl p-6 border border-slate-700">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            🚀 Paket-Reise durch die OSI-Schichten
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {direction === "send"
              ? "Sender → Empfänger: Kapselung (Encapsulation)"
              : "Empfänger → Sender: Entkapselung (Decapsulation)"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value as typeof speed)}
            className="bg-slate-800 text-slate-300 text-sm rounded-lg px-3 py-1.5 border border-slate-600"
          >
            <option value="slow">🐌 Langsam</option>
            <option value="normal">⚡ Normal</option>
            <option value="fast">🚀 Schnell</option>
          </select>
          <button
            onClick={() => {
              reset();
              setDirection(direction === "send" ? "receive" : "send");
            }}
            className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-sm rounded-lg transition-colors"
          >
            {direction === "send" ? "📥 Empfänger" : "📤 Sender"}
          </button>
          <button
            onClick={isAnimating ? reset : startAnimation}
            className={`px-4 py-1.5 rounded-lg font-medium text-sm transition-colors ${
              isAnimating
                ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
          >
            {isAnimating ? "⏹ Stopp" : "▶ Animation starten"}
          </button>
        </div>
      </div>

      {/* Direction indicator */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          direction === "send" ? "bg-blue-500/20 text-blue-400" : "bg-slate-700 text-slate-400"
        }`}>
          📤 Sender
        </span>
        <div className="flex-1 max-w-xs h-1 bg-slate-700 rounded-full relative overflow-hidden">
          {isAnimating && (
            <div
              className={`absolute h-full bg-gradient-to-r ${
                direction === "send" ? "from-blue-500 to-green-500 left-0" : "from-green-500 to-blue-500 right-0"
              } rounded-full transition-all duration-300`}
              style={{
                width: `${(currentStep / layers.length) * 100}%`,
                ...(direction === "receive" ? { right: 0 } : { left: 0 }),
              }}
            />
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          direction === "receive" ? "bg-blue-500/20 text-blue-400" : "bg-slate-700 text-slate-400"
        }`}>
          📥 Empfänger
        </span>
      </div>

      {/* OSI Layers */}
      <div className="space-y-2 mb-6">
        {layers.map((layer) => {
          const isActive = isAnimating && currentStep >= 0 && layers[currentStep]?.number === layer.number;
          const isCompleted = completedSteps.has(layer.number);
          const isCurrent = isAnimating && currentStep > 0 && currentStep <= layers.length && layers[currentStep - 1]?.number === layer.number;

          return (
            <div
              key={layer.number}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                isActive
                  ? `border-${layer.color.slice(1)} bg-slate-800/80 scale-[1.01] shadow-lg`
                  : isCompleted
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50"
              }`}
              style={{
                borderColor: isActive ? layer.color : isCompleted ? "#22c55e" : undefined,
                boxShadow: isActive ? `0 0 20px ${layer.color}30` : undefined,
              }}
              onClick={() => setShowProtocols(showProtocols === layer.number ? null : layer.number)}
            >
              {/* Layer number */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
              >
                {layer.number}
              </div>

              {/* Icon */}
              <span className="text-xl shrink-0">{layer.icon}</span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{layer.german}</span>
                  <span className="text-xs text-slate-400">({layer.name})</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${layer.color}20`, color: layer.color }}
                  >
                    {layer.pdu}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{layer.action}</p>
              </div>

              {/* Status */}
              <div className="shrink-0">
                {isActive && (
                  <div className="w-5 h-5 border-2 rounded-full animate-spin" style={{ borderColor: layer.color, borderTopColor: "transparent" }} />
                )}
                {isCompleted && !isActive && (
                  <span className="text-green-400 text-lg">✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Encapsulation visualization */}
      {packetData.length > 0 && (
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <h4 className="text-sm font-semibold text-slate-300 mb-3">
            {direction === "send" ? "📦 Kapselung — Daten wachsen:" : "📤 Entkapselung — Daten schrumpfen:"}
          </h4>
          <div className="space-y-2">
            {packetData.map((data, i) => (
              <div
                key={i}
                className="flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]"
              >
                <span className="text-xs text-slate-500 w-6 text-right">{i + 1}.</span>
                <div
                  className="h-8 rounded flex items-center px-3 text-xs text-white font-mono"
                  style={{
                    width: `${100 - i * 10}%`,
                    minWidth: "200px",
                    backgroundColor: OSI_LAYERS[
                      direction === "send"
                        ? OSI_LAYERS.length - 1 - i
                        : i
                    ]?.color + "40",
                    borderLeft: `3px solid ${
                      OSI_LAYERS[
                        direction === "send"
                          ? OSI_LAYERS.length - 1 - i
                          : i
                      ]?.color
                    }`,
                  }}
                >
                  {data}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Protocol info on click */}
      {showProtocols && (
        <div className="mt-4 bg-slate-800/50 rounded-lg p-4 border border-slate-700 animate-[fadeIn_0.2s_ease-out]">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">
            📋 Protokolle der Schicht {showProtocols}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {PROTOCOL_MAP[showProtocols]?.map((proto) => (
              <span
                key={proto}
                className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300"
              >
                {proto}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Explanations */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-blue-400 mb-1">📦 Kapselung (Encapsulation)</h4>
          <p className="text-xs text-slate-400">
            Jede Schicht fügt ihren eigenen Header hinzu. Die Daten werden dabei immer größer —
            wie eine Matroschka-Puppe. Am Ende sendet Schicht 1 die Bits auf das Kabel.
          </p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <h4 className="text-sm font-semibold text-green-400 mb-1">📤 Entkapselung (Decapsulation)</h4>
          <p className="text-xs text-slate-400">
            Der Empfänger macht den Prozess rückwärts: Jede Schicht entfernt ihren Header
            und liest die relevanten Informationen. Schicht 7 erhält die reinen Nutzdaten.
          </p>
        </div>
      </div>
    </div>
  );
}
