"use client";

import { useState } from "react";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const STATUS_CODES = [
  { code: 200, text: "OK", color: "#22C55E", description: "Erfolgreich!" },
  { code: 301, text: "Moved Permanently", color: "#3B82F6", description: "Weiterleitung (permanent)" },
  { code: 304, text: "Not Modified", color: "#3B82F6", description: "Nicht verändert (Cache)" },
  { code: 400, text: "Bad Request", color: "#EAB308", description: "Fehlerhafte Anfrage" },
  { code: 401, text: "Unauthorized", color: "#F97316", description: "Nicht autorisiert" },
  { code: 403, text: "Forbidden", color: "#EF4444", description: "Zugriff verweigert" },
  { code: 404, text: "Not Found", color: "#EF4444", description: "Nicht gefunden" },
  { code: 500, text: "Internal Server Error", color: "#EF4444", description: "Serverfehler" },
];

export function HTTPRequestVisualizer() {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://api.example.com/users");
  const [phase, setPhase] = useState<"idle" | "request" | "response" | "done">("idle");
  const [showHeaders, setShowHeaders] = useState(true);
  const [useHTTPS, setUseHTTPS] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(200);

  const buildRequest = () => {
    const reqHeaders: Record<string, string> = {
      "Host": new URL(url).hostname,
      "User-Agent": "Mozilla/5.0 (LearnHub Client)",
      "Accept": "application/json",
      "Connection": "keep-alive",
    };
    if (method === "POST" || method === "PUT") {
      reqHeaders["Content-Type"] = "application/json";
      reqHeaders["Content-Length"] = "42";
    }
    if (useHTTPS) {
      reqHeaders["Upgrade-Insecure-Requests"] = "1";
    }
    return reqHeaders;
  };

  const buildResponse = () => {
    const status = STATUS_CODES.find((s) => s.code === selectedStatus) || STATUS_CODES[0];
    const respHeaders: Record<string, string> = {
      "Status": `${status.code} ${status.text}`,
      "Content-Type": "application/json; charset=utf-8",
      "Server": "nginx/1.24.0",
      "Date": new Date().toUTCString(),
      "Cache-Control": "max-age=3600",
    };
    if (useHTTPS) {
      respHeaders["Strict-Transport-Security"] = "max-age=31536000";
    }
    if (status.code === 301 || status.code === 302) {
      respHeaders["Location"] = url.replace("/users", "/people");
    }
    return { headers: respHeaders, status };
  };

  const startRequest = () => {
    setPhase("request");
    setTimeout(() => setPhase("response"), 1500);
    setTimeout(() => setPhase("done"), 3000);
  };

  const reset = () => setPhase("idle");

  const reqHeaders = buildRequest();
  const { headers: respHeaders, status } = buildResponse();

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-2">🌐 HTTP-Request — Live mit Headers</h3>
      <p className="text-slate-300 text-sm mb-4">
        Sieh was bei einem HTTP-Request wirklich passiert — mit allen Headers!
      </p>

      {/* URL-Leiste */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select value={method} onChange={(e) => setMethod(e.target.value)}
          className="bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono font-bold">
          {HTTP_METHODS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-slate-700 text-white rounded-lg px-3 py-2 text-sm font-mono"
          placeholder="https://api.example.com/..."
        />
        <button onClick={startRequest} disabled={phase !== "idle"}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-600 text-white rounded-lg text-sm font-medium">
          🚀 Senden
        </button>
        <button onClick={reset} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm">
          🔄
        </button>
      </div>

      {/* Optionen */}
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={useHTTPS} onChange={(e) => setUseHTTPS(e.target.checked)} className="rounded" />
          🔒 HTTPS (verschlüsselt)
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
          <input type="checkbox" checked={showHeaders} onChange={(e) => setShowHeaders(e.target.checked)} className="rounded" />
          📋 Headers anzeigen
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Status:</span>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(Number(e.target.value))}
            className="bg-slate-700 text-white rounded px-2 py-1 text-xs">
            {STATUS_CODES.map((s) => <option key={s.code} value={s.code}>{s.code} {s.text}</option>)}
          </select>
        </div>
      </div>

      {/* Visualisierung */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
          {/* Client */}
          <div className="text-center w-28 shrink-0">
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-lg flex items-center justify-center text-2xl mb-2">💻</div>
            <p className="text-blue-400 font-semibold text-sm">Client</p>
            <p className="text-slate-500 text-xs">Browser</p>
          </div>

          {/* Kommunikation */}
          <div className="flex-1 min-h-[200px] relative">
            {/* HTTPS-Indikator */}
            {useHTTPS && (
              <div className="absolute top-0 left-0 right-0 text-center">
                <span className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full">
                  🔒 TLS-verschlüsselt
                </span>
              </div>
            )}

            {/* Request-Pfeil */}
            {(phase === "request" || phase === "response" || phase === "done") && (
              <div className="mt-8 animate-fadeIn">
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400 font-mono font-bold text-sm">📤 REQUEST</span>
                    <span className="text-blue-300 font-mono text-xs">{method} {url}</span>
                  </div>
                  {showHeaders && (
                    <pre className="text-xs text-slate-300 font-mono bg-slate-900 rounded p-2 overflow-x-auto">
{`${method} ${new URL(url).pathname} HTTP/1.1
${Object.entries(reqHeaders).map(([k, v]) => `${k}: ${v}`).join("\n")}${method === "POST" ? "\n\n{\"name\": \"Max\", \"email\": \"max@firma.de\"}" : ""}`}
                    </pre>
                  )}
                </div>

                {/* Pfeil */}
                <div className="flex justify-center my-2">
                  <span className="text-blue-400 text-2xl">→</span>
                </div>
              </div>
            )}

            {/* Response-Pfeil */}
            {(phase === "response" || phase === "done") && (
              <div className="animate-fadeIn">
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400 font-mono font-bold text-sm">📥 RESPONSE</span>
                    <span className="font-mono text-xs px-2 py-0.5 rounded" style={{ backgroundColor: `${status.color}30`, color: status.color }}>
                      {status.code} {status.text}
                    </span>
                    <span className="text-slate-400 text-xs">— {status.description}</span>
                  </div>
                  {showHeaders && (
                    <pre className="text-xs text-slate-300 font-mono bg-slate-900 rounded p-2 overflow-x-auto">
{`HTTP/1.1 ${status.code} ${status.text}
${Object.entries(respHeaders).filter(([k]) => k !== "Status").map(([k, v]) => `${k}: ${v}`).join("\n")}

${status.code < 400 ? `{
  "id": 1,
  "name": "Max Mustermann",
  "email": "max@firma.de",
  "role": "admin"
}` : status.code === 404 ? `{
  "error": "Not Found",
  "message": "The requested resource was not found"
}` : `{
  "error": "${status.text}",
  "message": "Something went wrong"
}`}`}
                    </pre>
                  )}
                </div>

                {/* Pfeil zurück */}
                <div className="flex justify-center my-2">
                  <span className="text-green-400 text-2xl">←</span>
                </div>
              </div>
            )}
          </div>

          {/* Server */}
          <div className="text-center w-28 shrink-0">
            <div className="w-16 h-16 mx-auto bg-green-600 rounded-lg flex items-center justify-center text-2xl mb-2">🖥️</div>
            <p className="text-green-400 font-semibold text-sm">Server</p>
            <p className="text-slate-500 text-xs">nginx</p>
          </div>
        </div>
      </div>

      {/* Status-Code Übersicht */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4">
        <h4 className="text-white font-semibold text-sm mb-2">📊 Status-Code Übersicht:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {STATUS_CODES.map((s) => (
            <div key={s.code} className="flex items-center gap-1 text-xs p-1 rounded"
              style={{ backgroundColor: `${s.color}15` }}>
              <span className="font-mono font-bold" style={{ color: s.color }}>{s.code}</span>
              <span className="text-slate-400 truncate">{s.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Merksatz */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
        <p className="text-blue-300 text-sm">
          💡 <strong>Merke:</strong> HTTP = Request/Response-Protokoll. Jede Anfrage hat Methoden (GET, POST...), Headers und optional einen Body.
          Status-Codes: 2xx = OK, 3xx = Weiterleitung, 4xx = Client-Fehler, 5xx = Server-Fehler.
        </p>
      </div>
    </div>
  );
}
