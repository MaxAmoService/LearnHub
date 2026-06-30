"use client";

import { useState, useEffect, useRef } from "react";

type Step = {
  from: "client" | "server";
  to: "client" | "server";
  label: string;
  flag: string;
  color: string;
  description: string;
  seq?: number;
  ack?: number;
};

const HANDSHAKE_STEPS: Step[] = [
  {
    from: "client", to: "server",
    label: "SYN", flag: "SYN",
    color: "#3B82F6",
    description: "Client: 'Hallo Server, ich möchte eine Verbindung aufbauen!'",
    seq: 1000,
  },
  {
    from: "server", to: "client",
    label: "SYN-ACK", flag: "SYN+ACK",
    color: "#22C55E",
    description: "Server: 'OK, ich bin bereit! Meine Sequenznummer ist 5000.'",
    seq: 5000, ack: 1001,
  },
  {
    from: "client", to: "server",
    label: "ACK", flag: "ACK",
    color: "#EAB308",
    description: "Client: 'Perfekt, Verbindung steht! Los geht's mit den Daten.'",
    seq: 1001, ack: 5001,
  },
];

const CLOSE_STEPS: Step[] = [
  {
    from: "client", to: "server",
    label: "FIN", flag: "FIN",
    color: "#EF4444",
    description: "Client: 'Ich möchte die Verbindung beenden.'",
    seq: 2000,
  },
  {
    from: "server", to: "client",
    label: "ACK", flag: "ACK",
    color: "#EAB308",
    description: "Server: 'OK, ich habe verstanden.'",
    ack: 2001,
  },
  {
    from: "server", to: "client",
    label: "FIN", flag: "FIN",
    color: "#EF4444",
    description: "Server: 'Ich bin auch fertig.'",
    seq: 7000,
  },
  {
    from: "client", to: "server",
    label: "ACK", flag: "ACK",
    color: "#EAB308",
    description: "Client: 'OK, Verbindung geschlossen.'",
    ack: 7001,
  },
];

export function TCPHandshakeSimulator() {
  const [mode, setMode] = useState<"handshake" | "close">("handshake");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showData, setShowData] = useState(false);
  const [packetLoss, setPacketLoss] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const steps = mode === "handshake" ? HANDSHAKE_STEPS : CLOSE_STEPS;

  const addLog = (msg: string) => {
    setLog((prev) => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startSimulation = () => {
    setCurrentStep(-1);
    setIsAnimating(true);
    setLog([]);

    let step = 0;
    const interval = setInterval(() => {
      if (step >= steps.length) {
        clearInterval(interval);
        setIsAnimating(false);
        addLog(mode === "handshake" ? "✅ Verbindung steht!" : "✅ Verbindung geschlossen!");
        return;
      }

      // Simulate packet loss on step 1 if enabled
      if (packetLoss && step === 1 && mode === "handshake") {
        addLog("❌ Paket verloren! SYN-ACK nicht angekommen...");
        addLog("🔄 Client sendet SYN erneut (Timeout)...");
        setTimeout(() => {
          addLog("📤 SYN (Retransmission) gesendet");
        }, 1000);
        setTimeout(() => {
          addLog("📥 SYN-ACK empfangen");
          addLog("📤 ACK gesendet");
          addLog("✅ Verbindung steht (nach Retry)!");
        }, 2500);
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }

      const s = steps[step];
      setCurrentStep(step);
      addLog(`${s.from === "client" ? "📤" : "📥"} ${s.flag} ${s.from === "client" ? "Client → Server" : "Server → Client"}${s.seq ? ` [SEQ=${s.seq}]` : ""}${s.ack ? ` [ACK=${s.ack}]` : ""}`);
      step++;
    }, 1500);
  };

  const resetSimulation = () => {
    setCurrentStep(-1);
    setIsAnimating(false);
    setLog([]);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🤝 TCP-Handshake — Interaktiv</h3>
      <p className="text-slate-300 text-sm mb-4">
        Erlebe den TCP 3-Wege-Handshake und die Verbindungsbeendigung live!
      </p>

      {/* Modus Toggle */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => { setMode("handshake"); resetSimulation(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === "handshake" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          🤝 Verbindungsaufbau (3-Wege)
        </button>
        <button
          onClick={() => { setMode("close"); resetSimulation(); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            mode === "close" ? "bg-red-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          👋 Verbindungsabbau (4-Wege)
        </button>
      </div>

      {/* Optionen */}
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={packetLoss}
            onChange={(e) => setPacketLoss(e.target.checked)}
            className="rounded"
          />
          📦💥 Paketverlust simulieren
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={showData}
            onChange={(e) => setShowData(e.target.checked)}
            className="rounded"
          />
          🔢 Sequenznummern zeigen
        </label>
      </div>

      {/* Steuerung */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        <button
          onClick={startSimulation}
          disabled={isAnimating}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium"
        >
          ▶️ {mode === "handshake" ? "Handshake starten" : "Verbindung schließen"}
        </button>
        <button
          onClick={resetSimulation}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium"
        >
          🔄 Reset
        </button>
      </div>

      {/* Visualisierung */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
          {/* Client */}
          <div className="text-center w-full sm:w-24 flex sm:block items-center gap-2">
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-lg flex items-center justify-center text-2xl mb-2">
              💻
            </div>
            <p className="text-blue-400 font-semibold text-sm">Client</p>
          </div>

          {/* Pfeile */}
          <div className="flex-1 mx-4 relative min-h-[200px]">
            {steps.map((step, idx) => {
              const isActive = idx <= currentStep;
              const isCurrent = idx === currentStep;
              const yPos = (idx * 50) + 10;

              return (
                <div
                  key={idx}
                  className={`absolute left-0 right-0 transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-20"
                  }`}
                  style={{ top: `${yPos}px` }}
                >
                  {/* Pfeil */}
                  <div className={`relative h-0.5 ${isCurrent ? "animate-pulse" : ""}`}
                    style={{ backgroundColor: step.color }}
                  >
                    {/* Pfeilspitze */}
                    {step.from === "client" ? (
                      <div className="absolute right-0 top-[-4px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px]"
                        style={{ borderLeftColor: step.color }}
                      />
                    ) : (
                      <div className="absolute left-0 top-[-4px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[8px]"
                        style={{ borderRightColor: step.color }}
                      />
                    )}

                    {/* Label */}
                    <div
                      className={`absolute top-[-22px] px-2 py-0.5 rounded text-xs font-mono font-bold text-white whitespace-nowrap ${
                        step.from === "client" ? "right-0" : "left-0"
                      }`}
                      style={{ backgroundColor: step.color }}
                    >
                      {step.label}
                      {showData && step.seq && ` [SEQ=${step.seq}]`}
                      {showData && step.ack && ` [ACK=${step.ack}]`}
                    </div>
                  </div>

                  {/* Beschreibung */}
                  {isCurrent && (
                    <div className="absolute top-2 left-0 right-0 text-center">
                      <p className="text-slate-300 text-xs">{step.description}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Status */}
            {currentStep >= steps.length - 1 && !isAnimating && (
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <p className="text-green-400 font-semibold text-sm">
                  {mode === "handshake" ? "✅ Verbindung steht!" : "✅ Verbindung geschlossen!"}
                </p>
              </div>
            )}
          </div>

          {/* Server */}
          <div className="text-center w-full sm:w-24 flex sm:block items-center gap-2">
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-lg flex items-center justify-center text-2xl mb-2">
              🖥️
            </div>
            <p className="text-green-400 font-semibold text-sm">Server</p>
          </div>
        </div>
      </div>

      {/* Log */}
      {log.length > 0 && (
        <div className="bg-slate-900 rounded-lg p-3 max-h-40 overflow-y-auto">
          <p className="text-slate-500 text-xs mb-1">📋 Log:</p>
          {log.map((entry, idx) => (
            <p key={idx} className="text-slate-300 text-xs font-mono">{entry}</p>
          ))}
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mt-4">
        <p className="text-green-300 text-sm">
          💡 <strong>Merke:</strong> {mode === "handshake"
            ? "SYN → SYN-ACK → ACK — wie ein Handschlag: Erst die Hand reichen, dann bestätigen."
            : "FIN → ACK → FIN → ACK — beide Seiten müssen zustimmen, die Verbindung zu beenden."
          }
        </p>
      </div>
    </div>
  );
}
