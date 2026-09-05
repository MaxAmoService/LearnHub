"use client";

import { useState, useEffect, useMemo } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function caesarEncrypt(text: string, shift: number): string {
  return text
    .toUpperCase()
    .split("")
    .map((ch) => {
      const idx = ALPHABET.indexOf(ch);
      if (idx === -1) return ch;
      return ALPHABET[(idx + shift) % 26];
    })
    .join("");
}

function caesarDecrypt(text: string, shift: number): string {
  return caesarEncrypt(text, 26 - shift);
}

function xorEncrypt(text: string, key: string): string {
  return text
    .split("")
    .map((ch, i) => {
      const code = ch.charCodeAt(0) ^ key.charCodeAt(i % key.length);
      return code.toString(16).padStart(2, "0").toUpperCase();
    })
    .join(" ");
}

function xorDecrypt(hex: string, key: string): string {
  const bytes = hex.split(" ").map((h) => parseInt(h, 16));
  return bytes
    .map((b, i) => String.fromCharCode(b ^ key.charCodeAt(i % key.length)))
    .join("");
}

const TLS_PHASES = [
  {
    name: "Client Hello",
    icon: "👋",
    description: "Client: 'Hallo! Ich unterstütze diese Verschlüsselungsverfahren:'",
    detail: "Unterstützte Cipher Suites:\n• TLS_AES_256_GCM_SHA384\n• TLS_CHACHA20_POLY1305\n\nClient Random: 32 Byte Zufallszahl",
    color: "#3B82F6",
    sender: "client" as const,
  },
  {
    name: "Server Hello",
    icon: "🤝",
    description: "Server: 'Hallo! Ich wähle TLS_AES_256_GCM_SHA384'",
    detail: "Server Random: 32 Byte Zufallszahl\nServer-Zertifikat: Ausgestellt von Let's Encrypt\nPublic Key: RSA 2048-bit",
    color: "#22C55E",
    sender: "server" as const,
  },
  {
    name: "Zertifikat prüfen",
    icon: "🔒",
    description: "Client prüft das Server-Zertifikat gegen vertrauenswürdige CAs",
    detail: "✅ Zertifikat gültig\n✅ Ausgestellt von vertrauenswürdiger CA\n✅ Domain stimmt überein\n✅ Nicht abgelaufen",
    color: "#EAB308",
    sender: "client" as const,
  },
  {
    name: "Key Exchange",
    icon: "🔑",
    description: "Beide Seiten einigen sich auf einen gemeinsamen Sitzungsschlüssel",
    detail: "Pre-Master-Secret: Client generiert 48 Byte\nVerschlüsselt mit Server-Public-Key gesendet\nBeide berechnen:\n  Master-Secret = PRF(PMS, ClientRandom, ServerRandom)\nSitzungsschlüssel abgeleitet!",
    color: "#F97316",
    sender: "both" as const,
  },
  {
    name: "Finished",
    icon: "✅",
    description: "Verbindung steht — alle Daten sind jetzt verschlüsselt!",
    detail: "Cipher: TLS_AES_256_GCM_SHA384\nKey: 256-bit AES\nIV: Abgeleitet vom Master-Secret\n\nAlle Daten werden jetzt verschlüsselt übertragen!",
    color: "#8B5CF6",
    sender: "both" as const,
  },
];

export function EncryptionDemo() {
  const [mode, setMode] = useState<"caesar" | "xor" | "tls">("caesar");
  const [plaintext, setPlaintext] = useState("Hallo Welt!");
  const [shift, setShift] = useState(3);
  const [xorKey, setXorKey] = useState("SECRET");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [showIntro, setShowIntro] = useState(true);
  const [tlsPhase, setTlsPhase] = useState(-1);
  const [tlsAnimating, setTlsAnimating] = useState(false);
  const [highlightChar, setHighlightChar] = useState<number | null>(null);

  useEffect(() => {
    if (mode === "caesar") {
      const enc = caesarEncrypt(plaintext, shift);
      setEncrypted(enc);
      setDecrypted(caesarDecrypt(enc, shift));
    } else if (mode === "xor") {
      const enc = xorEncrypt(plaintext, xorKey);
      setEncrypted(enc);
      setDecrypted(xorDecrypt(enc, xorKey));
    }
  }, [plaintext, shift, xorKey, mode]);

  const caesarAlphabetView = useMemo(() => {
    return ALPHABET.split("").map((ch, idx) => {
      const shifted = ALPHABET[(idx + shift) % 26];
      return { original: ch, shifted, idx };
    });
  }, [shift]);

  const xorSteps = useMemo(() => {
    if (mode !== "xor") return [];
    return plaintext.split("").map((ch, i) => {
      const plainCode = ch.charCodeAt(0);
      const keyChar = xorKey[i % xorKey.length];
      const keyCode = keyChar.charCodeAt(0);
      const xorResult = plainCode ^ keyCode;
      return { plainChar: ch, plainCode, keyChar, keyCode, xorResult, hex: xorResult.toString(16).padStart(2, "0").toUpperCase() };
    });
  }, [plaintext, xorKey, mode]);

  const startTLS = () => {
    setTlsPhase(0);
    setTlsAnimating(true);
    let phase = 0;
    const interval = setInterval(() => {
      phase++;
      if (phase >= TLS_PHASES.length) {
        clearInterval(interval);
        setTlsAnimating(false);
      }
      setTlsPhase(phase);
    }, 2500);
  };

  const resetTLS = () => {
    setTlsPhase(-1);
    setTlsAnimating(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🔐 Verschlüsselung — Interaktiv erleben</h3>
      <p className="text-slate-300 text-sm mb-4">
        Wie schützt HTTPS deine Daten? Erlebe Verschlüsselung von Caesar bis TLS!
      </p>

      {/* Einführung */}
      {showIntro && (
        <div className="mb-6 bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-xl p-4 sm:p-5 border border-blue-700/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-bold text-base">📖 Was ist Verschlüsselung?</h4>
            <button onClick={() => setShowIntro(false)} className="text-slate-400 hover:text-white text-sm">
              ✕ Schließen
            </button>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-slate-200">
              <strong className="text-blue-300">Verschlüsselung</strong> verwandelt lesbare Daten (Klartext) in unlesbaren Kram (Geheimtext).
              Nur wer den <strong className="text-green-400">Schlüssel</strong> hat, kann es wieder entziffern.
            </p>

            <div className="bg-slate-900/60 rounded-lg p-3 flex items-center gap-3 text-center">
              <div className="flex-1">
                <div className="text-white font-mono text-sm mb-1">Hallo Welt!</div>
                <div className="text-slate-500 text-xs">Klartext</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex-1">
                <div className="text-blue-400 font-mono text-sm mb-1">🔐 Verschlüsseln</div>
                <div className="text-slate-500 text-xs">mit Schlüssel</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex-1">
                <div className="text-green-400 font-mono text-sm mb-1">Khoog Zogu!</div>
                <div className="text-slate-500 text-xs">Geheimtext</div>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-lg p-3">
              <p className="text-slate-300 font-medium mb-2">🔑 Drei Verfahren im Vergleich:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-blue-900/40 rounded p-2 border border-blue-800/50">
                  <div className="text-blue-400 font-bold mb-1">🔤 Caesar</div>
                  <div className="text-slate-400">Buchstaben verschieben. Einfach, aber unsicher.</div>
                  <div className="text-red-400 mt-1">⚠️ Nur 25 Schlüssel</div>
                </div>
                <div className="bg-green-900/40 rounded p-2 border border-green-800/50">
                  <div className="text-green-400 font-bold mb-1">🔑 XOR</div>
                  <div className="text-slate-400">Bit-weise Verknüpfung. Besser, aber anfällig bei kurzem Schlüssel.</div>
                  <div className="text-yellow-400 mt-1">⚠️ Schlüssel-Länge entscheidend</div>
                </div>
                <div className="bg-purple-900/40 rounded p-2 border border-purple-800/50">
                  <div className="text-purple-400 font-bold mb-1">🔒 TLS/AES</div>
                  <div className="text-slate-400">Modernes Verfahren. Wird bei HTTPS verwendet.</div>
                  <div className="text-green-400 mt-1">✅ Sicher!</div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => setShowIntro(false)}
            className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
            ✅ Verstanden — Verschlüsselung erkunden!
          </button>
        </div>
      )}

      {/* Modus Toggle */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setMode("caesar")}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "caesar" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🔤 Caesar
        </button>
        <button onClick={() => setMode("xor")}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "xor" ? "bg-green-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🔑 XOR
        </button>
        <button onClick={() => setMode("tls")}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${mode === "tls" ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          🔒 TLS (HTTPS)
        </button>
      </div>

      {/* Caesar-Modus */}
      {mode === "caesar" && (
        <div className="mb-6">
          {/* Erklärung */}
          <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-3 mb-4">
            <p className="text-blue-200 text-sm">
              <strong>Caesar-Verschlüsselung:</strong> Jeder Buchstabe wird um eine feste Anzahl Positionen im Alphabet verschoben.
              Julius Caesar verwendete diese Methode mit Shift = 3. Es ist das einfachste Verschlüsselungsverfahren — aber leicht zu knacken!
            </p>
          </div>

          {/* Eingaben */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">📝 Klartext eingeben</label>
              <input
                type="text"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="z.B. Hallo Welt!"
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">🔢 Verschiebung (Shift): <span className="text-blue-400 font-bold">{shift}</span></label>
              <input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-0.5">
                <span>1</span>
                <span className="text-blue-400">Aktuell: +{shift}</span>
                <span>25</span>
              </div>
            </div>
          </div>

          {/* Alphabet-Visualisierung */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <h4 className="text-white font-semibold text-sm mb-3">📊 Alphabet-Verschiebung:</h4>
            <div className="flex gap-0.5 min-w-max">
              {caesarAlphabetView.map(({ original, shifted, idx }) => {
                const isUsed = plaintext.toUpperCase().includes(original);
                return (
                  <div key={idx} className={`flex flex-col items-center ${isUsed ? "opacity-100" : "opacity-40"}`}>
                    <span className="text-slate-500 text-xs w-7 text-center">{original}</span>
                    <span className="text-blue-400 text-xs">↓</span>
                    <span className={`text-xs w-7 text-center font-bold ${isUsed ? "text-green-400" : "text-slate-600"}`}>{shifted}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Schritt-für-Schritt */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4">
            <h4 className="text-white font-semibold text-sm mb-3">🔄 Verschlüsselung Schritt für Schritt:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-slate-500 w-28 shrink-0">Klartext:</span>
                <span className="text-white">{plaintext.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-slate-500 w-28 shrink-0">Verschiebung:</span>
                <span className="text-blue-400">+{shift} Positionen</span>
              </div>
              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-500 text-xs">Buchstabe für Buchstabe:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {plaintext.toUpperCase().split("").map((ch, i) => {
                    const idx = ALPHABET.indexOf(ch);
                    if (idx === -1) return <span key={i} className="text-slate-500 font-mono text-sm">&quot;{ch}&quot;</span>;
                    return (
                      <span key={i}
                        className={`inline-flex flex-col items-center mx-0.5 cursor-pointer transition-all ${highlightChar === i ? "scale-110" : ""}`}
                        onMouseEnter={() => setHighlightChar(i)}
                        onMouseLeave={() => setHighlightChar(null)}>
                        <span className="text-white text-xs font-mono bg-slate-800 px-1 rounded">{ch}</span>
                        <span className="text-blue-400 text-xs">↓{shift}</span>
                        <span className="text-green-400 text-xs font-mono font-bold bg-green-900/30 px-1 rounded">{ALPHABET[(idx + shift) % 26]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm pt-2 border-t border-slate-800">
                <span className="text-slate-500 w-28 shrink-0">Ergebnis:</span>
                <span className="text-green-400 font-bold">{encrypted}</span>
              </div>
            </div>

            {/* Entschlüsselung */}
            <div className="mt-4 pt-3 border-t border-slate-700">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-slate-500 w-28 shrink-0">Entschlüsselt:</span>
                <span className="text-green-400">{decrypted}</span>
                <span className="text-slate-500 text-xs ml-2">✅ = Original</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                Zurückverschiebung: Geheimtext um {26 - shift} Positionen verschoben = Original
              </p>
            </div>
          </div>

          {/* Sicherheitsbewertung */}
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
            <p className="text-red-300 text-sm">
              🚨 <strong>Unsicher!</strong> Caesar hat nur 25 mögliche Schlüssel — ein Angreifer kann alle durchprobieren (Brute Force).
              Wird heute nur noch als Lehrbeispiel verwendet.
            </p>
          </div>
        </div>
      )}

      {/* XOR-Modus */}
      {mode === "xor" && (
        <div className="mb-6">
          {/* Erklärung */}
          <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-3 mb-4">
            <p className="text-green-200 text-sm">
              <strong>XOR-Verschlüsselung:</strong> Jedes Zeichen wird bitweise mit dem Schlüssel verknüpft (Exklusiv-Oder).
              XOR ist die Grundlage fast aller modernen Verschlüsselungsverfahren. Das Besondere: Zweimal XOR mit dem gleichen Schlüssel ergibt wieder das Original!
            </p>
          </div>

          {/* Eingaben */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-slate-400 text-xs mb-1 block">📝 Klartext eingeben</label>
              <input
                type="text"
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="z.B. Hallo Welt!"
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono placeholder:text-slate-500"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs mb-1 block">🔑 Schlüssel eingeben</label>
              <input
                type="text"
                value={xorKey}
                onChange={(e) => setXorKey(e.target.value)}
                placeholder="z.B. SECRET"
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono placeholder:text-slate-500"
              />
              <p className="text-slate-500 text-xs mt-1">Der Schlüssel wird wiederholt, falls kürzer als der Text</p>
            </div>
          </div>

          {/* XOR-Schritt-für-Schritt */}
          <div className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
            <h4 className="text-white font-semibold text-sm mb-3">🔄 XOR Schritt für Schritt:</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-500 w-24 shrink-0">Klartext:</span>
                <span className="text-white">{plaintext}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-500 w-24 shrink-0">ASCII:</span>
                <span className="text-slate-300">{plaintext.split("").map((ch) => ch.charCodeAt(0).toString().padStart(3, " ")).join(" ")}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-500 w-24 shrink-0">Schlüssel:</span>
                <span className="text-blue-400">{plaintext.split("").map((_, i) => xorKey[i % xorKey.length]).join("")}</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-500 w-24 shrink-0">Key ASCII:</span>
                <span className="text-blue-400">{plaintext.split("").map((_, i) => xorKey.charCodeAt(i % xorKey.length).toString().padStart(3, " ")).join(" ")}</span>
              </div>

              {/* XOR Detail-Tabelle */}
              {xorSteps.length > 0 && (
                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-500 text-xs">Detail-Berechnung (hover für Info):</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {xorSteps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center bg-slate-800 rounded p-1 min-w-[48px]"
                        title={`${step.plainChar} (${step.plainCode}) XOR ${step.keyChar} (${step.keyCode}) = ${step.xorResult} (0x${step.hex})`}>
                        <span className="text-white text-xs">{step.plainChar}</span>
                        <span className="text-yellow-400 text-xs">⊕</span>
                        <span className="text-blue-400 text-xs">{step.keyChar}</span>
                        <span className="text-green-400 text-xs font-bold">={step.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 font-mono text-xs pt-2 border-t border-slate-800">
                <span className="text-slate-500 w-24 shrink-0">Hex (Geheimtext):</span>
                <span className="text-green-400 font-bold">{encrypted}</span>
              </div>
            </div>

            {/* Entschlüsselung */}
            <div className="mt-4 pt-3 border-t border-slate-700">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-slate-500 w-24 shrink-0">Entschlüsselt:</span>
                <span className="text-green-400">{decrypted}</span>
                <span className="text-slate-500 text-xs ml-2">✅ = Original</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">
                XOR ist reversibel: Geheimtext ⊕ Schlüssel = Original
              </p>
            </div>
          </div>

          {/* Sicherheitsbewertung */}
          <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
            <p className="text-orange-300 text-sm">
              ⚠️ <strong>Bedingt sicher:</strong> XOR ist nur so gut wie der Schlüssel. Ein kurzer, sich wiederholender Schlüssel ist angreifbar.
              In der Praxis werden AES-256 oder ChaCha20 verwendet — auch basierend auf XOR, aber mit komplexen Schlüsselableitungen.
            </p>
          </div>
        </div>
      )}

      {/* TLS-Modus */}
      {mode === "tls" && (
        <div className="mb-6">
          {/* Erklärung */}
          <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-3 mb-4">
            <p className="text-purple-200 text-sm">
              <strong>TLS (Transport Layer Security):</strong> Das Protokoll hinter HTTPS. Bevor Daten übertragen werden,
              einigen sich Client und Server auf einen gemeinsamen Schlüssel — <em>ohne ihn offen zu übertragen</em>.
              Das ist der sogenannte <strong>TLS-Handshake</strong>.
            </p>
          </div>

          {/* Client/Server Visualisierung */}
          <div className="flex items-center justify-between mb-4 px-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-2xl mb-1">💻</div>
              <span className="text-blue-400 text-xs font-medium">Client</span>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full relative">
                {tlsPhase >= 0 && tlsPhase < TLS_PHASES.length && (
                  <div className="absolute top-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      left: `${(tlsPhase / (TLS_PHASES.length - 1)) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}>
                    <div className="w-3 h-3 bg-white rounded-full shadow-lg animate-pulse" />
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-1">
                {TLS_PHASES.map((phase, idx) => (
                  <span key={idx} className={`text-xs transition-colors ${
                    idx <= tlsPhase ? "text-white" : "text-slate-600"
                  }`}>
                    {phase.sender === "client" ? "→" : phase.sender === "server" ? "←" : "↔"}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-2xl mb-1">🖥️</div>
              <span className="text-green-400 text-xs font-medium">Server</span>
            </div>
          </div>

          {/* Start-Button */}
          <div className="flex gap-2 mb-4">
            <button onClick={startTLS} disabled={tlsAnimating}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
              {tlsPhase >= 0 ? "🔄 Neu starten" : "🔒 TLS-Handshake starten"}
            </button>
            {tlsPhase >= TLS_PHASES.length && (
              <button onClick={resetTLS}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors">
                ↩️ Zurücksetzen
              </button>
            )}
          </div>

          {/* Phasen */}
          <div className="space-y-2">
            {TLS_PHASES.map((phase, idx) => {
              const isActive = idx < tlsPhase;
              const isCurrent = idx === tlsPhase;

              return (
                <div
                  key={idx}
                  className={`rounded-lg border-2 transition-all duration-500 ${
                    isActive || isCurrent
                      ? isCurrent && tlsAnimating
                        ? "border-white shadow-lg shadow-purple-500/20"
                        : "border-slate-600"
                      : "border-slate-800 opacity-30"
                  }`}
                  style={{ backgroundColor: (isActive || isCurrent) ? `${phase.color}15` : "transparent" }}
                >
                  <div className="flex items-center gap-3 p-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 transition-transform"
                      style={{ backgroundColor: phase.color, transform: isCurrent && tlsAnimating ? "scale(1.1)" : "scale(1)" }}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{phase.icon}</span>
                        <span className="text-white font-semibold text-sm">{phase.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          phase.sender === "client" ? "bg-blue-900/50 text-blue-400" :
                          phase.sender === "server" ? "bg-green-900/50 text-green-400" :
                          "bg-purple-900/50 text-purple-400"
                        }`}>
                          {phase.sender === "client" ? "Client" : phase.sender === "server" ? "Server" : "Beide"}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs">{phase.description}</p>
                    </div>
                    {isActive && <span className="text-green-400 text-xs">✅</span>}
                  </div>

                  {isCurrent && (
                    <div className="px-3 pb-3 border-t border-slate-700">
                      <pre className="text-xs text-slate-300 font-mono bg-slate-900 rounded p-2 mt-2 whitespace-pre-wrap">
                        {phase.detail}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Erfolgsmeldung */}
          {tlsPhase >= TLS_PHASES.length && (
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mt-4">
              <p className="text-green-300 text-sm">
                🔒 <strong>Verbindung verschlüsselt!</strong> Alle Daten werden jetzt mit AES-256-GCM übertragen.
                Ein Angreifer sieht nur: <code className="font-mono bg-slate-900 px-1 rounded text-xs">0x7A 0x3F 0xB1 0x9C 0xE2 ...</code>
              </p>
              <p className="text-green-400/70 text-xs mt-1">
                Der Schlüssel wurde nie offen übertragen — er wurde mathematisch aus dem Key Exchange abgeleitet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> {mode === "tls"
            ? "HTTPS = HTTP + TLS. Der TLS-Handshake einigt sich auf einen Schlüssel, ohne ihn zu übertragen (Public-Key-Kryptografie). Danach: AES-Verschlüsselung!"
            : mode === "caesar"
              ? "Caesar-Verschlüsselung ist ein historisches Verfahren — heute nur noch als Lehrbeispiel. In der Praxis: AES-256!"
              : "XOR ist die Grundlage vieler Verschlüsselungsverfahren. In der Praxis werden AES oder ChaCha20 verwendet."}
        </p>
      </div>

      {/* Intro wieder anzeigen */}
      {showIntro === false && (
        <button onClick={() => setShowIntro(true)}
          className="mt-3 text-slate-500 hover:text-slate-400 text-xs">
          📖 Einführung wieder anzeigen
        </button>
      )}
    </div>
  );
}
