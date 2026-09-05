"use client";

import { useState } from "react";

export function VPNTunnelVisualizer() {
  const [vpnType, setVpnType] = useState<"site-to-site" | "remote-access">("remote-access");
  const [phase, setPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEncapsulation, setShowEncapsulation] = useState(true);

  const phases = vpnType === "remote-access" ? [
    { name: "Verbindung starten", icon: "🔌", description: "VPN-Client baut Verbindung zum VPN-Gateway auf", color: "#3B82F6" },
    { name: "Authentifizierung", icon: "🔑", description: "Zertifikat oder Benutzername/Passwort wird geprüft", color: "#22C55E" },
    { name: "Tunnel steht", icon: "🔒", description: "Verschlüsselter Tunnel ist aktiv — alle Daten gehen durch den Tunnel", color: "#8B5CF6" },
    { name: "Datenübertragung", icon: "📦", description: "Daten werden im Tunnel verpackt und verschlüsselt gesendet", color: "#EAB308" },
  ] : [
    { name: "Gateway-Verbindung", icon: "🏢", description: "Standort A Gateway verbindet sich mit Standort B Gateway", color: "#3B82F6" },
    { name: "IKE Phase 1", icon: "🤝", description: "SA (Security Association) wird ausgehandelt — Schlüssel austauschen", color: "#22C55E" },
    { name: "IKE Phase 2", icon: "🔒", description: "IPSec-Tunnel wird aufgebaut — ESP-Verschlüsselung aktiv", color: "#8B5CF6" },
    { name: "Datenfluss", icon: "📦", description: "Netzwerk A ↔ Netzwerk B kommunizieren verschlüsselt", color: "#EAB308" },
  ];

  const startAnimation = () => {
    setPhase(0);
    setIsAnimating(true);
    let p = 0;
    const interval = setInterval(() => {
      p++;
      if (p >= phases.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      setPhase(p);
    }, 2000);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔒 VPN-Tunnel — Verschlüsselte Verbindung</h3>
      <p className="text-slate-300 text-sm mb-4">
        Wie schützt VPN deine Verbindung? Erlebe den Tunnel-Aufbau live!
      </p>

      {/* VPN-Typ */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => { setVpnType("remote-access"); setPhase(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${vpnType === "remote-access" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          💻 Remote Access
        </button>
        <button onClick={() => { setVpnType("site-to-site"); setPhase(0); }}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${vpnType === "site-to-site" ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🏢 Site-to-Site
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={showEncapsulation} onChange={(e) => setShowEncapsulation(e.target.checked)} className="rounded" />
          📦 Kapselung zeigen
        </label>
      </div>

      <button onClick={startAnimation} disabled={isAnimating}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium mb-6">
        🔒 Tunnel aufbauen
      </button>

      {/* Visualisierung */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Linke Seite */}
          <div className="text-center w-full sm:w-28 flex sm:block items-center gap-2">
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-lg flex items-center justify-center text-2xl mb-2">
              {vpnType === "remote-access" ? "💻" : "🏢"}
            </div>
            <p className="text-blue-400 font-semibold text-sm">
              {vpnType === "remote-access" ? "Dein Laptop" : "Standort A"}
            </p>
            <p className="text-slate-500 text-xs">
              {vpnType === "remote-access" ? "Homeoffice" : "Berlin"}
            </p>
          </div>

          {/* Tunnel */}
          <div className="flex-1 mx-4">
            <div className={`relative h-16 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
              phase >= 2 ? "border-purple-500 bg-purple-900/30" : "border-slate-700 bg-slate-800"
            }`}>
              {/* Tunnel-Icon */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-bold bg-slate-800 border border-slate-600">
                {phase >= 2 ? "🔒 IPSec Tunnel" : "🌐 Internet (öffentlich)"}
              </div>

              {/* Datenfluss */}
              {phase >= 3 && (
                <div className="flex items-center gap-2">
                  <div className="animate-bounce text-purple-400 text-sm">📦 → 📦 → 📦</div>
                </div>
              )}

              {/* Paket-Kapselung */}
              {showEncapsulation && phase >= 3 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1 text-xs">
                  <span className="px-1 py-0.5 rounded bg-slate-700 text-slate-400">IP-Header</span>
                  <span className="text-slate-500">+</span>
                  <span className="px-1 py-0.5 rounded bg-purple-700 text-purple-300">ESP-Header</span>
                  <span className="text-slate-500">+</span>
                  <span className="px-1 py-0.5 rounded bg-slate-700 text-slate-400">Verschlüsselt</span>
                  <span className="text-slate-500">+</span>
                  <span className="px-1 py-0.5 rounded bg-slate-700 text-slate-400">ESP-Trailer</span>
                </div>
              )}
            </div>

            {/* Phasen */}
            <div className="flex justify-between mt-6">
              {phases.map((p, idx) => (
                <div key={idx} className={`text-center flex-1 transition-all duration-500 ${
                  idx < phase ? "opacity-100" : "opacity-30"
                }`}>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm mb-1 ${
                    idx < phase ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400"
                  }`}>
                    {idx < phase ? "✅" : idx + 1}
                  </div>
                  <p className="text-xs text-slate-400">{p.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rechte Seite */}
          <div className="text-center w-full sm:w-28 flex sm:block items-center gap-2">
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-lg flex items-center justify-center text-2xl mb-2">
              {vpnType === "remote-access" ? "🖥️" : "🏢"}
            </div>
            <p className="text-green-400 font-semibold text-sm">
              {vpnType === "remote-access" ? "Firmennetzwerk" : "Standort B"}
            </p>
            <p className="text-slate-500 text-xs">
              {vpnType === "remote-access" ? "10.0.0.0/8" : "München"}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}
      {phase > 0 && phase <= phases.length && (
        <div className="bg-slate-900 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{phases[phase - 1].icon}</span>
            <span className="text-white font-semibold text-sm">{phases[phase - 1].name}</span>
          </div>
          <p className="text-slate-300 text-xs">{phases[phase - 1].description}</p>
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
        <p className="text-purple-300 text-sm">
          💡 <strong>Merke:</strong> VPN = Verschlüsselter Tunnel durchs öffentliche Internet.
          {vpnType === "remote-access"
            ? " Remote Access: Einzelner Client ins Firmennetzwerk (SSL/TLS oder IPSec)."
            : " Site-to-Site: Zwei Netzwerke verbinden sich (IPSec)."}
        </p>
      </div>
    </div>
  );
}
