"use client";

import { useState, useEffect } from "react";

const SMTP_STEPS = [
  {
    id: 1,
    phase: "Erstellung",
    icon: "✍️",
    title: "E-Mail schreiben",
    description: "Du schreibst eine E-Mail in deinem Client (Outlook, Thunderbird, Gmail).",
    detail: {
      from: "max@firma.de",
      to: "muster@uni.de",
      subject: "Projektbesprechung morgen",
      body: "Hallo Muster,\n\nkönnen wir uns morgen um 14 Uhr treffen?\n\nViele Grüße,\nMax",
    },
    color: "#3B82F6",
    location: "💻 Dein PC",
  },
  {
    id: 2,
    phase: "SMTP",
    icon: "📤",
    title: "Client → Mailserver (SMTP)",
    description: "Dein Client verbindet sich mit dem SMTP-Server deines Anbieters (Port 587/25).",
    detail: {
      protocol: "SMTP",
      port: "587 (mit TLS) oder 25",
      conversation: "Client: EHLO firma.de\nServer: 250-Hello\nClient: AUTH LOGIN\nServer: 334 (Base64)\nClient: [Benutzername]\nClient: [Passwort]\nServer: 235 Authenticated\nClient: MAIL FROM:<max@firma.de>\nServer: 250 OK\nClient: RCPT TO:<muster@uni.de>\nServer: 250 OK\nClient: DATA\nServer: 354 Start mail input\nClient: [E-Mail-Inhalt]\nClient: .\nServer: 250 OK: Message queued",
    },
    color: "#22C55E",
    location: "🏢 SMTP-Server (firma.de)",
  },
  {
    id: 3,
    phase: "DNS MX",
    icon: "🔍",
    title: "MX-Record auflösen",
    description: "Der SMTP-Server fragt DNS nach dem MX-Record von uni.de.",
    detail: {
      query: "MX uni.de?",
      response: "10 mail.uni.de",
      next: "IP von mail.uni.de: 193.123.45.67",
    },
    color: "#EAB308",
    location: "🌍 DNS-Server",
  },
  {
    id: 4,
    phase: "Weiterleitung",
    icon: "🔄",
    title: "SMTP-Server → Zielserver",
    description: "Der SMTP-Server leitet die E-Mail an den Mailserver der Universität weiter.",
    detail: {
      from_server: "mail.firma.de (91.23.45.67)",
      to_server: "mail.uni.de (193.123.45.67)",
      protocol: "SMTP (Port 25)",
      conversation: "EHLO mail.firma.de\n250-Hello\nMAIL FROM:<max@firma.de>\n250 OK\nRCPT TO:<muster@uni.de>\n250 OK\nDATA\n354 Start\n[E-Mail-Inhalt]\n.\n250 OK: Message received",
    },
    color: "#F97316",
    location: "🖥️ Mailserver (uni.de)",
  },
  {
    id: 5,
    phase: "Speicherung",
    icon: "💾",
    title: "E-Mail wird gespeichert",
    description: "Der Zielserver speichert die E-Mail im Postfach von muster@uni.de.",
    detail: {
      storage: "Mailbox: /var/mail/muster@uni.de/",
      format: "MIME (Multipurpose Internet Mail Extensions)",
      headers: "Received: from mail.firma.de\nMessage-ID: <abc123@firma.de>\nDate: Di, 12 Mai 2026 20:48:00 +0200",
    },
    color: "#8B5CF6",
    location: "💾 Postfach (uni.de)",
  },
  {
    id: 6,
    phase: "Empfang",
    icon: "📥",
    title: "Empfänger ruft E-Mail ab (IMAP)",
    description: "Muster öffnet Thunderbird → Client verbindet sich via IMAP (Port 993) zum Server.",
    detail: {
      protocol: "IMAP (verschlüsselt via TLS)",
      port: "993",
      conversation: "Client: A001 LOGIN muster [Passwort]\nServer: A001 OK Logged in\nClient: A002 SELECT INBOX\nServer: * 42 EXISTS\nClient: A003 FETCH 42 (BODY[])\nServer: [E-Mail-Inhalt]\nClient: A004 STORE 42 +FLAGS (\\Seen)\nServer: A004 OK",
    },
    color: "#EF4444",
    location: "💻 PC von Muster",
  },
];

export function MailJourney() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [mailData, setMailData] = useState({
    from: "max@firma.de",
    to: "muster@uni.de",
    subject: "Projektbesprechung morgen",
  });

  const startJourney = () => {
    setCurrentStep(-1);
    setIsAnimating(true);
    setSelectedStep(null);

    let step = 0;
    const interval = setInterval(() => {
      if (step >= SMTP_STEPS.length) {
        clearInterval(interval);
        setIsAnimating(false);
        return;
      }
      setCurrentStep(step);
      step++;
    }, 2000);
  };

  const reset = () => {
    setCurrentStep(-1);
    setIsAnimating(false);
    setSelectedStep(null);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">📧 E-Mail-Reise — Von dir zum Empfänger</h3>
      <p className="text-slate-300 text-sm mb-4">
        Verfolge eine E-Mail auf ihrem gesamten Weg — von der Erstellung bis zum Empfänger!
      </p>

      {/* E-Mail-Header */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4 font-mono text-xs">
        <div className="flex gap-2 mb-1">
          <span className="text-slate-500 w-12">Von:</span>
          <input
            type="text"
            value={mailData.from}
            onChange={(e) => setMailData({ ...mailData, from: e.target.value })}
            className="bg-transparent text-blue-400 flex-1 outline-none"
          />
        </div>
        <div className="flex gap-2 mb-1">
          <span className="text-slate-500 w-12">An:</span>
          <input
            type="text"
            value={mailData.to}
            onChange={(e) => setMailData({ ...mailData, to: e.target.value })}
            className="bg-transparent text-green-400 flex-1 outline-none"
          />
        </div>
        <div className="flex gap-2">
          <span className="text-slate-500 w-12">Betr.:</span>
          <input
            type="text"
            value={mailData.subject}
            onChange={(e) => setMailData({ ...mailData, subject: e.target.value })}
            className="bg-transparent text-white flex-1 outline-none"
          />
        </div>
      </div>

      {/* Optionen */}
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={showHeaders} onChange={(e) => setShowHeaders(e.target.checked)} className="rounded" />
          📋 SMTP-Protokoll zeigen
        </label>
      </div>

      {/* Steuerung */}
      <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
        <button onClick={startJourney} disabled={isAnimating}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium">
          📧 E-Mail abschicken!
        </button>
        <button onClick={reset} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium">
          🔄 Reset
        </button>
      </div>

      {/* Reise-Visualisierung */}
      <div className="space-y-2 mb-6">
        {SMTP_STEPS.map((step, idx) => {
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;
          const isSelected = selectedStep === idx;

          return (
            <div key={step.id}>
              <div
                onClick={() => setSelectedStep(isSelected ? null : idx)}
                className={`rounded-lg border-2 transition-all duration-500 cursor-pointer ${
                  isActive
                    ? isCurrent
                      ? "border-white shadow-lg scale-[1.01]"
                      : "border-slate-600 hover:border-slate-400"
                    : "border-slate-800 opacity-30"
                }`}
                style={{ backgroundColor: isActive ? `${step.color}15` : "transparent" }}
              >
                <div className="flex items-center gap-3 p-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: step.color }}>
                    {step.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{step.icon}</span>
                      <span className="text-white font-semibold text-sm">{step.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">{step.phase}</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">{step.description}</p>
                    <p className="text-slate-500 text-xs mt-0.5">📍 {step.location}</p>
                  </div>
                  {isActive && (
                    <span className="text-green-400 text-xs">✅</span>
                  )}
                </div>

                {/* Detail-Ansicht */}
                {isSelected && isActive && (
                  <div className="px-3 pb-3 border-t border-slate-700">
                    <div className="bg-slate-900 rounded p-3 mt-2 font-mono text-xs overflow-x-auto">
                      {step.id === 1 ? (
                        <div>
                          <p className="text-blue-400">From: {mailData.from}</p>
                          <p className="text-green-400">To: {mailData.to}</p>
                          <p className="text-white">Subject: {mailData.subject}</p>
                          <p className="text-slate-300 mt-2 whitespace-pre-wrap">{step.detail.body as string}</p>
                        </div>
                      ) : showHeaders && step.detail.conversation ? (
                        <pre className="text-slate-300 whitespace-pre-wrap">{step.detail.conversation as string}</pre>
                      ) : (
                        <div className="space-y-1">
                          {Object.entries(step.detail).filter(([k]) => k !== "conversation").map(([key, val]) => (
                            <p key={key}>
                              <span className="text-slate-500">{key}:</span>{" "}
                              <span className="text-slate-300">{String(val)}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Verbindungspfeil */}
              {idx < SMTP_STEPS.length - 1 && isActive && idx < currentStep && (
                <div className="flex justify-center py-1">
                  <span className="text-slate-500 text-xs">↓ {step.id === 2 ? "DNS MX Lookup" : step.id === 3 ? "SMTP Weiterleitung" : step.id === 4 ? "Speicherung" : "IMAP Abruf"}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Zusammenfassung */}
      {currentStep >= SMTP_STEPS.length - 1 && !isAnimating && (
        <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-4">
          <h4 className="text-green-400 font-semibold mb-2">✅ E-Mail zugestellt!</h4>
          <div className="text-slate-300 text-xs space-y-1">
            <p>📧 <strong>Von:</strong> {mailData.from} → <strong>An:</strong> {mailData.to}</p>
            <p>🔐 <strong>Verschlüsselung:</strong> TLS bei SMTP (Port 587) und IMAP (Port 993)</p>
            <p>⏱️ <strong>Dauer:</strong> ~2-5 Sekunden (je nach Server)</p>
            <p>📏 <strong>Weg:</strong> Client → SMTP-Server → DNS-MX → Zielserver → IMAP → Empfänger</p>
          </div>
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> E-Mails werden NICHT direkt gesendet! Der Weg ist: Client → SMTP → DNS-MX-Lookup → Zielserver (speichert) → IMAP/POP3 → Empfänger. Wie eine Postkarte über mehrere Postämter!
        </p>
      </div>
    </div>
  );
}
