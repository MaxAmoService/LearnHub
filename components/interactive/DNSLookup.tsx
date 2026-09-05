"use client";

import { useState } from "react";

const DNS_STEPS = [
  { id: 1, name: "Browser-Cache", icon: "🌐", time: "~0ms", description: "Browser prüft eigenen DNS-Cache", result: "Nicht gefunden ❌", color: "#EF4444" },
  { id: 2, name: "Betriebssystem-Cache", icon: "💻", time: "~1ms", description: "OS prüft lokalen DNS-Cache (ipconfig /displaydns)", result: "Nicht gefunden ❌", color: "#F97316" },
  { id: 3, name: "Resolver (ISP)", icon: "📡", time: "~5ms", description: "Anfrage an den DNS-Resolver des ISPs (z.B. 192.168.1.1)", result: "Nicht im Cache ❌", color: "#EAB308" },
  { id: 4, name: "Root-Server", icon: "🌍", time: "~20ms", description: "Root-Server: 'Für .com frag den TLD-Server'", result: "Verweis auf .com TLD →", color: "#22C55E" },
  { id: 5, name: "TLD-Server", icon: "📋", time: "~40ms", description: "TLD-Server: 'Für google.com frag den Autoritativen Server'", result: "Verweis auf NS →", color: "#3B82F6" },
  { id: 6, name: "Autoritativer Server", icon: "✅", time: "~60ms", description: "Authoritativer Server: 'google.com = 142.250.74.110'", result: "142.250.74.110 ✅", color: "#8B5CF6" },
];

const DNS_RECORDS = [
  { type: "A", purpose: "IPv4-Adresse", example: "google.com → 142.250.74.110" },
  { type: "AAAA", purpose: "IPv6-Adresse", example: "google.com → 2a00:1450:4001:829::200e" },
  { type: "MX", purpose: "Mailserver", example: "google.com → smtp.google.com" },
  { type: "CNAME", purpose: "Alias", example: "www.google.com → google.com" },
  { type: "NS", purpose: "Nameserver", example: "google.com → ns1.google.com" },
  { type: "TXT", purpose: "Text-Eintrag", example: "google.com → 'v=spf1 include:...'" },
];

export function DNSLookup() {
  const [domain, setDomain] = useState("google.com");
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [showRecords, setShowRecords] = useState(false);
  const [cached, setCached] = useState(false);

  const startLookup = () => {
    setCurrentStep(-1);
    setIsAnimating(true);
    setResult(null);

    if (cached) {
      setTimeout(() => {
        setCurrentStep(0);
        setResult("142.250.74.110 (aus Browser-Cache ⚡)");
        setIsAnimating(false);
      }, 500);
      return;
    }

    let step = 0;
    const interval = setInterval(() => {
      if (step >= DNS_STEPS.length) {
        clearInterval(interval);
        setIsAnimating(false);
        setResult("142.250.74.110");
        return;
      }
      setCurrentStep(step);
      step++;
    }, 1200);
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsAnimating(false);
    setResult(null);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔍 DNS-Lookup — Schritt für Schritt</h3>
      <p className="text-slate-300 text-sm mb-4">
        Wie wird aus &quot;google.com&quot; eine IP-Adresse? Verfolge die Anfrage durch das DNS-System!
      </p>

      {/* Domain-Eingabe */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-2 text-sm font-mono"
        />
        <button
          onClick={startLookup}
          disabled={isAnimating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium"
        >
          🔍 Lookup
        </button>
        <button onClick={reset} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium">
          🔄
        </button>
      </div>

      {/* Optionen */}
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={cached} onChange={(e) => setCached(e.target.checked)} className="rounded" />
          ⚡ Aus Cache (schnell)
        </label>
        <button
          onClick={() => setShowRecords(!showRecords)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          📋 DNS-Record-Typen {showRecords ? "▲" : "▼"}
        </button>
      </div>

      {/* DNS-Schritte */}
      <div className="space-y-2 mb-6">
        {DNS_STEPS.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-500 ${
                isActive
                  ? isCurrent
                    ? "border-white shadow-lg"
                    : "border-slate-600"
                  : "border-slate-800 opacity-30"
              }`}
              style={{ backgroundColor: isActive ? `${step.color}15` : "transparent" }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm shrink-0"
                style={{ backgroundColor: step.color }}>
                {step.id}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span>{step.icon}</span>
                  <span className="text-white font-semibold text-sm">{step.name}</span>
                  <span className="text-slate-500 text-xs font-mono">{step.time}</span>
                </div>
                <p className="text-slate-400 text-xs">{step.description}</p>
              </div>
              <div className={`text-xs font-mono px-2 py-1 rounded ${
                step.result.includes("❌") ? "bg-red-900/50 text-red-300" :
                step.result.includes("✅") ? "bg-green-900/50 text-green-300" :
                "bg-blue-900/50 text-blue-300"
              }`}>
                {step.result}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ergebnis */}
      {result && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
          <p className="text-green-300 text-sm">
            ✅ <strong>Ergebnis:</strong> <code className="font-mono bg-slate-900 px-2 py-0.5 rounded">{domain}</code> → <code className="font-mono bg-slate-900 px-2 py-0.5 rounded text-green-400">{result}</code>
          </p>
          <p className="text-slate-400 text-xs mt-1">
            ⏱️ Gesamtzeit: {cached ? "~0ms (Cache!)" : "~60ms"} | Abgefragte Server: {cached ? "0 (lokal)" : "3 (Root + TLD + Autoritativ)"}
          </p>
        </div>
      )}

      {/* DNS-Record-Typen */}
      {showRecords && (
        <div className="bg-slate-900 rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2">📋 Wichtige DNS-Record-Typen:</h4>
          <div className="space-y-1">
            {DNS_RECORDS.map((rec) => (
              <div key={rec.type} className="flex items-center gap-2 text-xs">
                <span className="font-mono font-bold text-blue-400 w-12">{rec.type}</span>
                <span className="text-slate-400 w-32">{rec.purpose}</span>
                <span className="text-slate-300 font-mono">{rec.example}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> DNS ist das Telefonbuch des Internets. Erst lokal (Cache), dann rekursiv (Root → TLD → Autoritativ). Jeder Schritt wird gecacht!
        </p>
      </div>
    </div>
  );
}
