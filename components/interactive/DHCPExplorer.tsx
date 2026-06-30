"use client";

import { useState } from "react";

const DORA_STEPS = [
  {
    id: 1,
    name: "Discover",
    icon: "🔍",
    from: "client",
    to: "broadcast",
    color: "#3B82F6",
    description: "Client sendet Broadcast: 'Gibt es hier einen DHCP-Server?'",
    detail: "Ziel-MAC: FF:FF:FF:FF:FF:FF (Broadcast)\nClient kennt noch keine IP — nutzt 0.0.0.0",
  },
  {
    id: 2,
    name: "Offer",
    icon: "🎁",
    from: "server",
    to: "client",
    color: "#22C55E",
    description: "Server antwortet: 'Ja! Hier ist eine IP: 192.168.1.100'",
    detail: "Server bietet an:\n• IP: 192.168.1.100\n• Subnetz: 255.255.255.0\n• Gateway: 192.168.1.1\n• DNS: 8.8.8.8\n• Lease: 24 Stunden",
  },
  {
    id: 3,
    name: "Request",
    icon: "📨",
    from: "client",
    to: "broadcast",
    color: "#EAB308",
    description: "Client: 'OK, ich nehme 192.168.1.100!'",
    detail: "Broadcast, weil:\n• Andere DHCP-Server sollen Bescheid wissen\n• Der Client bestätigt das Angebot offiziell",
  },
  {
    id: 4,
    name: "Acknowledge",
    icon: "✅",
    from: "server",
    to: "client",
    color: "#8B5CF6",
    description: "Server: 'Bestätigt! IP gehört dir für 24h.'",
    detail: "Der DHCP-Server bestätigt:\n• IP-Zuweisung\n• Lease-Time (hier: 24h)\n• Alle Konfigurationsparameter\n\nClient kann jetzt kommunizieren! 🎉",
  },
];

export function DHCPExplorer() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clientIP, setClientIP] = useState("0.0.0.0");
  const [showDetails, setShowDetails] = useState(false);
  const [leaseTime, setLeaseTime] = useState(24);

  const startDORA = () => {
    setCurrentStep(-1);
    setIsAnimating(true);
    setClientIP("0.0.0.0");

    let step = 0;
    const interval = setInterval(() => {
      if (step >= 4) {
        clearInterval(interval);
        setIsAnimating(false);
        setClientIP("192.168.1.100");
        return;
      }
      setCurrentStep(step);
      if (step === 3) {
        setTimeout(() => setClientIP("192.168.1.100"), 500);
      }
      step++;
    }, 2000);
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsAnimating(false);
    setClientIP("0.0.0.0");
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">📡 DHCP — DORA-Prozess interaktiv</h3>
      <p className="text-slate-300 text-sm mb-4">
        Wie bekommt ein Gerät automatisch eine IP-Adresse? Erlebe den DORA-Prozess live!
      </p>

      {/* Optionen */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <span>⏱️ Lease-Time:</span>
          <select
            value={leaseTime}
            onChange={(e) => setLeaseTime(Number(e.target.value))}
            className="bg-slate-700 text-white rounded px-2 py-1 text-sm"
          >
            <option value={1}>1 Stunde</option>
            <option value={8}>8 Stunden</option>
            <option value={24}>24 Stunden</option>
            <option value={168}>7 Tage</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={showDetails} onChange={(e) => setShowDetails(e.target.checked)} className="rounded" />
          📋 Details anzeigen
        </label>
      </div>

      {/* Steuerung */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        <button onClick={startDORA} disabled={isAnimating}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium">
          ▶️ DORA starten
        </button>
        <button onClick={reset} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium">
          🔄 Reset
        </button>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-slate-900 rounded-lg p-3 text-center">
          <p className="text-slate-400 text-xs">💻 Client-IP</p>
          <p className={`font-mono font-bold text-lg ${clientIP === "0.0.0.0" ? "text-red-400" : "text-green-400"}`}>
            {clientIP}
          </p>
        </div>
        <div className="bg-slate-900 rounded-lg p-3 text-center">
          <p className="text-slate-400 text-xs">🖥️ DHCP-Server</p>
          <p className="font-mono font-bold text-lg text-blue-400">192.168.1.1</p>
        </div>
      </div>

      {/* DORA-Schritte */}
      <div className="space-y-3 mb-6">
        {DORA_STEPS.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={step.id}
              className={`rounded-lg border-2 transition-all duration-500 ${
                isActive
                  ? isCurrent
                    ? "border-white shadow-lg scale-[1.01]"
                    : "border-slate-600"
                  : "border-slate-800 opacity-30"
              }`}
              style={{ backgroundColor: isActive ? `${step.color}15` : "transparent" }}
            >
              <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: step.color }}>
                  {step.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{step.icon}</span>
                    <span className="text-white font-semibold">{step.name}</span>
                    <span className="text-xs text-slate-400">
                      {step.from === "client" ? "💻 →" : "🖥️ →"} {step.to === "broadcast" ? "📢 Alle" : "💻 Client"}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{step.description}</p>
                </div>
              </div>

              {showDetails && isCurrent && isActive && (
                <div className="px-3 pb-3 border-t border-slate-700">
                  <pre className="text-xs text-slate-300 font-mono bg-slate-900 rounded p-2 mt-2 whitespace-pre-wrap">
                    {step.detail}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lease-Timer */}
      {currentStep >= 3 && (
        <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 mb-4">
          <p className="text-purple-300 text-sm">
            ⏱️ <strong>Lease-Timer:</strong> Die IP 192.168.1.100 gehört dem Client für <strong>{leaseTime} Stunden</strong>.
            Danach muss der Client sie erneuern (Renew) — normalerweise bei 50% der Lease-Time.
          </p>
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke DORA:</strong> <strong>D</strong>iscover → <strong>O</strong>ffer → <strong>R</strong>equest → <strong>A</strong>cknowledge.
          Wie ein Bewerbungsgespräch: Suchen → Anbieten → Annehmen → Bestätigen!
        </p>
      </div>
    </div>
  );
}
