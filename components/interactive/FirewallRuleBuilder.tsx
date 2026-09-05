"use client";

import { useState } from "react";

type Rule = {
  id: number;
  action: "allow" | "deny";
  protocol: "TCP" | "UDP" | "ICMP" | "ANY";
  source: string;
  dest: string;
  port: string;
  enabled: boolean;
  label?: string;
};

type Packet = {
  protocol: string;
  source: string;
  dest: string;
  port: number;
  description: string;
};

const DEFAULT_RULES: Rule[] = [
  { id: 1, action: "allow", protocol: "TCP", source: "192.168.1.0/24", dest: "any", port: "80,443", enabled: true, label: "Erlaube Webverkehr (HTTP/HTTPS)" },
  { id: 2, action: "allow", protocol: "TCP", source: "192.168.1.0/24", dest: "any", port: "53", enabled: true, label: "Erlaube DNS-Anfragen" },
  { id: 3, action: "deny", protocol: "ANY", source: "any", dest: "any", port: "any", enabled: true, label: "Blockiere alles andere (Default Deny)" },
];

const TEST_PACKETS: Packet[] = [
  { protocol: "TCP", source: "192.168.1.5", dest: "142.250.74.110", port: 443, description: "💻 Browser → google.com (HTTPS)" },
  { protocol: "TCP", source: "192.168.1.5", dest: "142.250.74.110", port: 80, description: "💻 Browser → google.com (HTTP)" },
  { protocol: "UDP", source: "192.168.1.5", dest: "8.8.8.8", port: 53, description: "💻 DNS-Abfrage an Google DNS" },
  { protocol: "TCP", source: "192.168.1.5", dest: "10.0.0.5", port: 22, description: "💻 SSH zu internem Server" },
  { protocol: "TCP", source: "10.0.0.100", dest: "192.168.1.5", port: 3389, description: "🌐 Externer RDP-Zugriff (Angriff!)" },
  { protocol: "ICMP", source: "192.168.1.5", dest: "8.8.8.8", port: 0, description: "💻 Ping zu 8.8.8.8" },
];

export function FirewallRuleBuilder() {
  const [rules, setRules] = useState<Rule[]>(DEFAULT_RULES);
  const [results, setResults] = useState<{ packet: string; action: "allow" | "deny"; rule: string }[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newRule, setNewRule] = useState({ action: "allow" as const, protocol: "TCP" as const, source: "", dest: "", port: "" });
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const testPacket = (pkt: Packet) => {
    for (const rule of rules) {
      if (!rule.enabled) continue;

      const protocolMatch = rule.protocol === "ANY" || rule.protocol === pkt.protocol;
      const sourceMatch = rule.source === "any" || rule.source === pkt.source || pkt.source.startsWith(rule.source.split("/")[0].split(".").slice(0, 3).join("."));
      const destMatch = rule.dest === "any" || rule.dest === pkt.dest;
      const portMatch = rule.port === "any" || rule.port.includes(String(pkt.port));

      if (protocolMatch && sourceMatch && destMatch && portMatch) {
        return { packet: pkt.description, action: rule.action, rule: `Regel #${rule.id}` };
      }
    }
    return { packet: pkt.description, action: "deny" as const, rule: "Keine Regel (Default Deny)" };
  };

  const runAllTests = () => {
    const res = TEST_PACKETS.map(testPacket);
    setResults(res);
  };

  const toggleRule = (id: number) => {
    setRules(rules.map((r) => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const addRule = () => {
    const id = Math.max(...rules.map((r) => r.id)) + 1;
    setRules([...rules.slice(0, -1), { ...newRule, id, enabled: true }, rules[rules.length - 1]]);
    setShowAdd(false);
    setNewRule({ action: "allow", protocol: "TCP", source: "", dest: "", port: "" });
  };

  const deleteRule = (id: number) => {
    setRules(rules.filter((r) => r.id !== id));
  };

  const runAllTestsWithStep = () => {
    runAllTests();
    setCurrentStep(3);
  };

  const addRuleWithStep = () => {
    addRule();
    setCurrentStep(2);
  };

  const steps = [
    { title: "Regeln verstehen", description: "Schau dir die bestehenden Regeln an" },
    { title: "Regel hinzufügen", description: "Erstelle eine neue Firewall-Regel" },
    { title: "Regeln anpassen", description: "Aktiviere/deaktiviere Regeln" },
    { title: "Pakete testen", description: "Teste ob Pakete durchkommen" },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔥 Firewall-Regel-Builder</h3>
      <p className="text-slate-300 text-sm mb-4">
        Baue Firewall-Regeln und teste Pakete — was kommt durch, was wird blockiert?
      </p>

      {/* Einführung */}
      {showIntro && (
        <div className="mb-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-4 sm:p-5 border border-blue-700/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-bold text-base">📖 Was ist eine Firewall?</h4>
            <button onClick={() => setShowIntro(false)} className="text-slate-400 hover:text-white text-sm">
              ✕ Schließen
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-slate-200">
              Eine <strong className="text-blue-300">Firewall</strong> ist wie ein Sicherheitsposten für dein Netzwerk.
              Sie entscheidet für jedes Datenpaket: <span className="text-green-400">Durchlassen</span> oder <span className="text-red-400">Blockieren</span>?
            </p>

            <div className="bg-slate-900/60 rounded-lg p-3">
              <p className="text-slate-300 font-medium mb-2">🔧 So funktioniert&apos;s:</p>
              <ul className="space-y-1.5 text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">1.</span>
                  <span>Regeln werden <strong className="text-white">von oben nach unten</strong> geprüft</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">2.</span>
                  <span>Die <strong className="text-white">erste passende Regel</strong> gewinnt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">3.</span>
                  <span>Am Ende steht eine <strong className="text-red-400">&quot;Deny All&quot;</strong>-Regel als Sicherheitsnetz</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/60 rounded-lg p-3">
              <p className="text-slate-300 font-medium mb-2">📋 Regeln bestehen aus:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-800 rounded p-2 text-center">
                  <div className="text-green-400 font-bold mb-1">ALLOW / DENY</div>
                  <div className="text-slate-400">Erlauben oder blockieren?</div>
                </div>
                <div className="bg-slate-800 rounded p-2 text-center">
                  <div className="text-blue-400 font-bold mb-1">Protokoll</div>
                  <div className="text-slate-400">TCP, UDP, ICMP oder ANY</div>
                </div>
                <div className="bg-slate-800 rounded p-2 text-center">
                  <div className="text-yellow-400 font-bold mb-1">Quelle → Ziel</div>
                  <div className="text-slate-400">IP-Adressen oder &quot;any&quot;</div>
                </div>
                <div className="bg-slate-800 rounded p-2 text-center">
                  <div className="text-purple-400 font-bold mb-1">Port</div>
                  <div className="text-slate-400">80=Web, 443=HTTPS, 53=DNS</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-yellow-900/30 rounded-lg p-3 border border-yellow-700/50">
              <span className="text-yellow-400 text-lg">💡</span>
              <p className="text-yellow-200 text-xs">
                <strong>Tipp:</strong> Die Reihenfolge ist entscheidend! Eine &quot;Allow All&quot;-Regel am Anfang würde alle nachfolgenden Regeln unwirksam machen.
              </p>
            </div>
          </div>

          <button onClick={() => { setShowIntro(false); setCurrentStep(0); }}
            className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
            ✅ Verstanden — los geht&apos;s!
          </button>
        </div>
      )}

      {/* Fortschrittsanzeige */}
      {!showIntro && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, idx) => (
              <button key={idx} onClick={() => setCurrentStep(idx)}
                className={`flex items-center gap-1.5 text-xs transition-colors ${
                  idx <= currentStep ? "text-blue-400" : "text-slate-600"
                }`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  idx < currentStep ? "bg-blue-600 text-white" :
                  idx === currentStep ? "bg-blue-500 text-white ring-2 ring-blue-400" :
                  "bg-slate-700 text-slate-500"
                }`}>
                  {idx < currentStep ? "✓" : idx + 1}
                </span>
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Schritt-Hinweis */}
      {!showIntro && currentStep === 0 && (
        <div className="mb-4 bg-blue-900/30 border border-blue-700/50 rounded-lg p-3 flex items-start gap-2">
          <span className="text-blue-400 text-lg shrink-0">👆</span>
          <div>
            <p className="text-blue-200 text-sm font-medium">Schritt 1: Regeln verstehen</p>
            <p className="text-blue-300/80 text-xs mt-0.5">
              Schau dir die bestehenden Regeln unten an. Jede Regel hat eine Nummer, eine Aktion (ALLOW/DENY) und Bedingungen.
              Die Regeln werden von oben nach unten geprüft — die erste passende Regel entscheidet!
            </p>
            <button onClick={() => setCurrentStep(1)} className="mt-2 text-blue-400 hover:text-blue-300 text-xs font-medium">
              Weiter zu Schritt 2 →
            </button>
          </div>
        </div>
      )}

      {!showIntro && currentStep === 1 && (
        <div className="mb-4 bg-green-900/30 border border-green-700/50 rounded-lg p-3 flex items-start gap-2">
          <span className="text-green-400 text-lg shrink-0">✏️</span>
          <div>
            <p className="text-green-200 text-sm font-medium">Schritt 2: Neue Regel hinzufügen</p>
            <p className="text-green-300/80 text-xs mt-0.5">
              Klicke auf <strong>&quot;➕ Regel hinzufügen&quot;</strong> um eine neue Regel zu erstellen.
              Du kannst zum Beispiel erlauben, dass SSH-Verbindungen (Port 22) ins interne Netz möglich sind.
            </p>
            <button onClick={() => setShowTips(!showTips)} className="mt-2 text-green-400 hover:text-green-300 text-xs font-medium">
              {showTips ? "Tipps ausblenden" : "💡 Tipps anzeigen"}
            </button>
          </div>
        </div>
      )}

      {!showIntro && currentStep === 2 && (
        <div className="mb-4 bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 flex items-start gap-2">
          <span className="text-yellow-400 text-lg shrink-0">🔄</span>
          <div>
            <p className="text-yellow-200 text-sm font-medium">Schritt 3: Regeln anpassen</p>
            <p className="text-yellow-300/80 text-xs mt-0.5">
              Du kannst Regeln mit dem 🟢/⚫-Button aktivieren oder deaktivieren. Probiere aus: Was passiert, wenn du die &quot;Deny All&quot;-Regel deaktivierst?
            </p>
            <button onClick={() => setCurrentStep(3)} className="mt-2 text-yellow-400 hover:text-yellow-300 text-xs font-medium">
              Weiter zu Schritt 4 →
            </button>
          </div>
        </div>
      )}

      {!showIntro && currentStep === 3 && (
        <div className="mb-4 bg-purple-900/30 border border-purple-700/50 rounded-lg p-3 flex items-start gap-2">
          <span className="text-purple-400 text-lg shrink-0">🧪</span>
          <div>
            <p className="text-purple-200 text-sm font-medium">Schritt 4: Pakete testen</p>
            <p className="text-purple-300/80 text-xs mt-0.5">
              Klicke auf <strong>&quot;🧪 Alle Pakete testen&quot;</strong> um zu sehen, welche Datenpakete durch deine Firewall kommen und welche blockiert werden.
            </p>
          </div>
        </div>
      )}

      {/* Tipps */}
      {showTips && (
        <div className="mb-4 bg-slate-900/80 rounded-lg p-3 border border-slate-700">
          <p className="text-slate-300 text-xs font-medium mb-2">💡 Hilfreiche Tipps:</p>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">Port 80</strong> = HTTP (unverschlüsselt)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">Port 443</strong> = HTTPS (verschlüsselt)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">Port 53</strong> = DNS (Namensauflösung)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">Port 22</strong> = SSH (sichere Fernverwaltung)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">Port 3389</strong> = RDP (Remote Desktop)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">192.168.1.0/24</strong> = internes Netzwerk (alle Geräte)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              <span><strong className="text-white">&quot;any&quot;</strong> = alle IPs / alle Ports</span>
            </li>
          </ul>
        </div>
      )}

      {/* Regeln */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-semibold">📋 Firewall-Regeln (oben = höchste Priorität)</h4>
          <button onClick={() => { setShowAdd(!showAdd); if (currentStep === 1) setCurrentStep(2); }}
            className="text-sm text-blue-400 hover:text-blue-300">
            ➕ Regel hinzufügen
          </button>
        </div>

        <div className="space-y-1">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 p-2 rounded-lg text-xs font-mono transition-all ${
                rule.enabled ? "bg-slate-900" : "bg-slate-900/50 opacity-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 text-slate-500">#{rule.id}</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  rule.action === "allow" ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}>
                  {rule.action.toUpperCase()}
                </span>
                <span className="text-blue-400 w-12">{rule.protocol}</span>
                <span className="text-slate-300 flex-1">{rule.source}</span>
                <span className="text-slate-500">→</span>
                <span className="text-slate-300 flex-1">{rule.dest}</span>
                <span className="text-yellow-400 w-16">:{rule.port}</span>
                <button onClick={() => toggleRule(rule.id)} className="text-slate-400 hover:text-white">
                  {rule.enabled ? "🟢" : "⚫"}
                </button>
                <button onClick={() => deleteRule(rule.id)} className="text-slate-400 hover:text-red-400">
                  🗑️
                </button>
              </div>
              {rule.label && (
                <span className="text-slate-500 text-xs pl-8 sm:pl-0 sm:ml-2 italic">{rule.label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Neue Regel */}
        {showAdd && (
          <div className="mt-2 p-3 bg-slate-900 rounded-lg border border-blue-700">
            <p className="text-blue-300 text-xs mb-2 font-medium">Neue Regel erstellen:</p>
            <div className="flex gap-2 flex-wrap">
              <select value={newRule.action} onChange={(e) => setNewRule({ ...newRule, action: e.target.value as any })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs">
                <option value="allow">ALLOW (erlauben)</option>
                <option value="deny">DENY (blockieren)</option>
              </select>
              <select value={newRule.protocol} onChange={(e) => setNewRule({ ...newRule, protocol: e.target.value as any })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs">
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
                <option value="ANY">ANY (alle)</option>
              </select>
              <input placeholder="Quelle (z.B. 192.168.1.0/24)" value={newRule.source} onChange={(e) => setNewRule({ ...newRule, source: e.target.value })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs w-40" />
              <input placeholder="Ziel (z.B. any)" value={newRule.dest} onChange={(e) => setNewRule({ ...newRule, dest: e.target.value })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs w-32" />
              <input placeholder="Port (z.B. 80,443)" value={newRule.port} onChange={(e) => setNewRule({ ...newRule, port: e.target.value })}
                className="bg-slate-700 text-white rounded px-2 py-1 text-xs w-32" />
              <button onClick={addRuleWithStep} className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs">
                ✅ Hinzufügen
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Test-Pakete */}
      <div className="mb-4">
        <button onClick={runAllTestsWithStep}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-medium mb-3">
          🧪 Alle Pakete testen
        </button>

        {results.length > 0 && (
          <div className="space-y-1">
            {results.map((res, idx) => (
              <div key={idx} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                res.action === "allow" ? "bg-green-900/30 border border-green-800" : "bg-red-900/30 border border-red-800"
              }`}>
                <span>{res.action === "allow" ? "✅" : "🚫"}</span>
                <span className="text-slate-300 flex-1">{res.packet}</span>
                <span className={`font-mono font-bold ${res.action === "allow" ? "text-green-400" : "text-red-400"}`}>
                  {res.action.toUpperCase()}
                </span>
                <span className="text-slate-500 text-xs">({res.rule})</span>
              </div>
            ))}
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-3 bg-slate-900/60 rounded-lg p-3 text-xs text-slate-400">
            <p className="font-medium text-slate-300 mb-1">📊 Analyse:</p>
            <p>
              {results.filter(r => r.action === "allow").length} von {results.length} Paketen wurden durchgelassen.
              {results.some(r => r.action === "deny" && r.packet.includes("Angriff"))
                ? " Der externe RDP-Zugriff wurde erkannt und blockiert — gut so!"
                : ""}
            </p>
          </div>
        )}
      </div>

      {/* Merksatz */}
      <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
        <p className="text-orange-300 text-sm">
          💡 <strong>Merke:</strong> Firewall-Regeln werden von OBEN nach UNTEN geprüft. Die ERSTE passende Regel gewinnt!
          Am Ende steht immer eine &quot;Deny All&quot;-Regel als Catch-All.
        </p>
      </div>

      {/* Intro wieder anzeigen Button */}
      {!showIntro && (
        <button onClick={() => setShowIntro(true)}
          className="mt-3 text-slate-500 hover:text-slate-400 text-xs">
          📖 Einführung wieder anzeigen
        </button>
      )}
    </div>
  );
}
