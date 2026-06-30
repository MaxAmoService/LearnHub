"use client";

import { useState } from "react";

const STANDARDS = [
  { name: "802.11b", year: 1999, speed: "11 Mbit/s", freq: "2.4 GHz", icon: "📻" },
  { name: "802.11a", year: 1999, speed: "54 Mbit/s", freq: "5 GHz", icon: "📻" },
  { name: "802.11g", year: 2003, speed: "54 Mbit/s", freq: "2.4 GHz", icon: "📡" },
  { name: "802.11n", year: 2009, speed: "600 Mbit/s", freq: "2.4 + 5 GHz", icon: "📡" },
  { name: "802.11ac", year: 2013, speed: "6,9 Gbit/s", freq: "5 GHz", icon: "📶" },
  { name: "802.11ax", year: 2019, speed: "9,6 Gbit/s", freq: "2.4 + 5 GHz", icon: "📶" },
];

export function WLANConfigurator() {
  const [security, setSecurity] = useState("wep");
  const [frequency, setFrequency] = useState("2.4");
  const [standard, setStandard] = useState("802.11ax");
  const [ssid, setSsid] = useState("MeinWLAN");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [channel, setChannel] = useState("auto");

  const getSecurityScore = () => {
    switch (security) {
      case "wep": return { score: 1, label: "⚠️ UNSICHER!", color: "text-red-400", bg: "bg-red-900/30", border: "border-red-700" };
      case "wpa": return { score: 2, label: "⚠️ Veraltet", color: "text-orange-400", bg: "bg-orange-900/30", border: "border-orange-700" };
      case "wpa2": return { score: 4, label: "✅ Sicher", color: "text-green-400", bg: "bg-green-900/30", border: "border-green-700" };
      case "wpa3": return { score: 5, label: "🔒 Am sichersten", color: "text-blue-400", bg: "bg-blue-900/30", border: "border-blue-700" };
      default: return { score: 0, label: "?", color: "text-slate-400", bg: "bg-slate-900", border: "border-slate-700" };
    }
  };

  const sec = getSecurityScore();

  const getRecommendations = () => {
    const recs: string[] = [];
    if (security === "wep") recs.push("🚨 WEP ist KNAKBAR! Sofort auf WPA2 oder WPA3 upgraden!");
    if (security === "wpa") recs.push("⚠️ WPA hat bekannte Schwächen. Mindestens WPA2 nutzen.");
    if (frequency === "2.4" && standard.includes("ac")) recs.push("⚠️ 802.11ac nutzt nur 5 GHz — Frequenz wechseln!");
    if (password.length < 8) recs.push("🔑 Passwort sollte mindestens 8 Zeichen haben.");
    if (password.length > 0 && password.length < 12) recs.push("💡 Besser: 12+ Zeichen für WPA2/WPA3.");
    if (!hidden) recs.push("💡 SSID verbergen erhöht die Sicherheit (aber ist kein Schutz allein).");
    if (recs.length === 0) recs.push("✅ Konfiguration sieht gut aus!");
    return recs;
  };

  const getChannelInfo = () => {
    if (frequency === "5") {
      return "5 GHz: Bis zu 25 nicht überlappende Kanäle — weniger Störung!";
    }
    return "2.4 GHz: Nur 3 nicht überlappende Kanäle (1, 6, 11). Nachbarn können stören!";
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">📶 WLAN-Konfigurator</h3>
      <p className="text-slate-300 text-sm mb-4">
        Konfiguriere ein WLAN-Netzwerk und sieh, welche Einstellungen sicher sind!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* SSID */}
        <div>
          <label className="text-slate-400 text-xs mb-1 block">📡 Netzwerkname (SSID)</label>
          <input
            type="text"
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono"
            placeholder="MeinWLAN"
          />
        </div>

        {/* Passwort */}
        <div>
          <label className="text-slate-400 text-xs mb-1 block">🔑 Passwort</label>
          <div className="flex gap-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono"
              placeholder="Min. 8 Zeichen"
            />
            <button onClick={() => setShowPassword(!showPassword)} className="px-2 bg-slate-600 rounded-lg text-sm">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Sicherheit */}
        <div>
          <label className="text-slate-400 text-xs mb-1 block">🔒 Sicherheitsstandard</label>
          <select value={security} onChange={(e) => setSecurity(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm">
            <option value="wep">WEP ❌ (UNSICHER!)</option>
            <option value="wpa">WPA ⚠️ (Veraltet)</option>
            <option value="wpa2">WPA2 ✅ (Aktuell)</option>
            <option value="wpa3">WPA3 🔒 (Best Practice)</option>
          </select>
        </div>

        {/* Frequenz */}
        <div>
          <label className="text-slate-400 text-xs mb-1 block">📻 Frequenzband</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm">
            <option value="2.4">2,4 GHz (Reichweite)</option>
            <option value="5">5 GHz (Speed)</option>
            <option value="both">2,4 + 5 GHz (Dual-Band)</option>
          </select>
        </div>

        {/* Standard */}
        <div>
          <label className="text-slate-400 text-xs mb-1 block">📶 WLAN-Standard</label>
          <select value={standard} onChange={(e) => setStandard(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm">
            {STANDARDS.map((s) => (
              <option key={s.name} value={s.name}>{s.icon} {s.name} — {s.speed} ({s.freq})</option>
            ))}
          </select>
        </div>

        {/* Channel */}
        <div>
          <label className="text-slate-400 text-xs mb-1 block">📡 Kanal</label>
          <select value={channel} onChange={(e) => setChannel(e.target.value)}
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm">
            <option value="auto">Auto (empfohlen)</option>
            {frequency === "2.4" ? (
              [1, 6, 11].map((c) => <option key={c} value={c}>Kanal {c}</option>)
            ) : (
              [36, 40, 44, 48, 52, 56, 60, 64, 100, 104, 108, 112].map((c) => <option key={c} value={c}>Kanal {c}</option>)
            )}
          </select>
        </div>

        {/* Hidden SSID */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
            <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} className="rounded" />
            🔒 SSID verbergen (Hidden Network)
          </label>
        </div>
      </div>

      {/* Sicherheits-Score */}
      <div className={`${sec.bg} border ${sec.border} rounded-lg p-4 mb-4`}>
        <div className="flex items-center gap-3 mb-2">
          <span className={`text-2xl font-bold ${sec.color}`}>{sec.score}/5</span>
          <span className={`font-semibold ${sec.color}`}>{sec.label}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${(sec.score / 5) * 100}%`,
              backgroundColor: sec.score <= 1 ? "#EF4444" : sec.score <= 2 ? "#F97316" : sec.score <= 4 ? "#22C55E" : "#3B82F6",
            }}
          />
        </div>
      </div>

      {/* Empfehlungen */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4">
        <h4 className="text-white font-semibold text-sm mb-2">💡 Empfehlungen:</h4>
        {getRecommendations().map((rec, idx) => (
          <p key={idx} className="text-slate-300 text-xs">{rec}</p>
        ))}
      </div>

      {/* Kanal-Info */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4">
        <p className="text-slate-300 text-xs">📻 {getChannelInfo()}</p>
      </div>

      {/* Zusammenfassung */}
      <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs">
        <p className="text-slate-500 mb-1">📋 Konfigurations-Zusammenfassung:</p>
        <p className="text-blue-400">SSID: <span className="text-white">{ssid}</span>{hidden ? " (versteckt)" : ""}</p>
        <p className="text-blue-400">Sicherheit: <span className="text-white">{security.toUpperCase()}</span></p>
        <p className="text-blue-400">Frequenz: <span className="text-white">{frequency} GHz</span></p>
        <p className="text-blue-400">Standard: <span className="text-white">{standard}</span></p>
        <p className="text-blue-400">Kanal: <span className="text-white">{channel}</span></p>
        <p className="text-blue-400">Passwort: <span className="text-white">{password ? "●".repeat(password.length) : "(leer!)"}</span></p>
      </div>

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mt-4">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> WEP ist unsicher (knackbar in Minuten!). Mindestens WPA2, besser WPA3.
          2,4 GHz = Reichweite, 5 GHz = Speed. Kanal 1, 6 oder 11 bei 2,4 GHz!
        </p>
      </div>
    </div>
  );
}
