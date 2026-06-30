"use client";

import { useState, useCallback } from "react";

interface FrameField {
  id: string;
  name: string;
  nameEn: string;
  bytes: number;
  color: string;
  description: string;
  defaultValue: string;
  editable: boolean;
  category: "header" | "data" | "trailer";
}

const FRAME_FIELDS: FrameField[] = [
  {
    id: "preamble",
    name: "Präambel",
    nameEn: "Preamble",
    bytes: 7,
    color: "#6b7280",
    description: "Synchronisationsbits (10101010...) für den Empfänger, damit er den Takt erkennt.",
    defaultValue: "AA AA AA AA AA AA AA",
    editable: false,
    category: "header",
  },
  {
    id: "sfd",
    name: "SFD",
    nameEn: "Start Frame Delimiter",
    bytes: 1,
    color: "#9ca3af",
    description: "Signalisiert den Beginn des Frames: 10101011",
    defaultValue: "AB",
    editable: false,
    category: "header",
  },
  {
    id: "dest_mac",
    name: "Ziel-MAC",
    nameEn: "Destination MAC",
    bytes: 6,
    color: "#ef4444",
    description: "MAC-Adresse des Empfängers. FF:FF:FF:FF:FF:FF = Broadcast (alle).",
    defaultValue: "FF:FF:FF:FF:FF:FF",
    editable: true,
    category: "header",
  },
  {
    id: "src_mac",
    name: "Quell-MAC",
    nameEn: "Source MAC",
    bytes: 6,
    color: "#f97316",
    description: "MAC-Adresse des Senders — einzigartig pro Netzwerkkarte.",
    defaultValue: "AA:BB:CC:DD:EE:01",
    editable: true,
    category: "header",
  },
  {
    id: "ethertype",
    name: "EtherType",
    nameEn: "EtherType",
    bytes: 2,
    color: "#eab308",
    description: "Typ des enthaltenen Protokolls: 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6.",
    defaultValue: "0800",
    editable: true,
    category: "header",
  },
  {
    id: "payload",
    name: "Nutzdaten",
    nameEn: "Payload",
    bytes: 46,
    color: "#3b82f6",
    description: "Die eigentlichen Daten (46–1500 Bytes). Unter 46 Bytes wird aufgefüllt (Padding).",
    defaultValue: "[Daten...]",
    editable: false,
    category: "data",
  },
  {
    id: "fcs",
    name: "FCS",
    nameEn: "Frame Check Sequence",
    bytes: 4,
    color: "#8b5cf6",
    description: "CRC-32 Prüfsumme zur Fehlererkennung. Wird vom Sender berechnet und vom Empfänger geprüft.",
    defaultValue: "1A 2B 3C 4D",
    editable: false,
    category: "trailer",
  },
];

const ETHERTYPE_OPTIONS = [
  { value: "0800", label: "0x0800 — IPv4", desc: "Internet Protocol Version 4" },
  { value: "0806", label: "0x0806 — ARP", desc: "Address Resolution Protocol" },
  { value: "86DD", label: "0x86DD — IPv6", desc: "Internet Protocol Version 6" },
  { value: "8100", label: "0x8100 — VLAN", desc: "802.1Q VLAN Tag" },
];

const CAT_CATEGORIES = [
  { cat: "Cat 5", speed: "100 Mbit/s", freq: "100 MHz", distance: "100m", standard: "100BASE-TX" },
  { cat: "Cat 5e", speed: "1 Gbit/s", freq: "100 MHz", distance: "100m", standard: "1000BASE-T" },
  { cat: "Cat 6", speed: "1 Gbit/s", freq: "250 MHz", distance: "100m", standard: "1000BASE-T" },
  { cat: "Cat 6a", speed: "10 Gbit/s", freq: "500 MHz", distance: "100m", standard: "10GBASE-T" },
  { cat: "Cat 7", speed: "10 Gbit/s", freq: "600 MHz", distance: "100m", standard: "10GBASE-T" },
  { cat: "Cat 8", speed: "25/40 Gbit/s", freq: "2000 MHz", distance: "30m", standard: "25GBASE-T" },
];

export function EthernetFrameBuilder() {
  const [fields, setFields] = useState<FrameField[]>(FRAME_FIELDS);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const [showCatTable, setShowCatTable] = useState(false);
  const [activeTab, setActiveTab] = useState<"frame" | "cat" | "quiz">("frame");

  const updateField = (id: string, value: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, defaultValue: value } : f))
    );
  };

  const totalBytes = fields.reduce((sum, f) => sum + f.bytes, 0);
  const selectedFieldData = fields.find((f) => f.id === selectedField);

  const quizQuestions = [
    {
      q: "Was ist die minimale Größe eines Ethernet-Frames?",
      options: ["46 Bytes", "64 Bytes", "128 Bytes", "1518 Bytes"],
      correct: 1,
      explanation: "64 Bytes minimum: 14 (Header) + 46 (min. Payload) + 4 (FCS) = 64 Bytes. Kleinere Frames werden als 'Runts' verworfen.",
    },
    {
      q: "Was passiert, wenn der Payload kleiner als 46 Bytes ist?",
      options: ["Wird verworfen", "Wird aufgefüllt (Padding)", "Wird fragmentiert", "Fehlermeldung"],
      correct: 1,
      explanation: "Der Frame wird mit Padding-Bytes auf 46 Bytes aufgefüllt, damit die minimale Frame-Größe erreicht wird.",
    },
    {
      q: "Welches EtherType kennzeichnet IPv4?",
      options: ["0x0806", "0x86DD", "0x0800", "0x8100"],
      correct: 2,
      explanation: "0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6, 0x8100 = VLAN (802.1Q).",
    },
    {
      q: "Welche Steckerform hat ein Ethernet-Kabel (RJ45)?",
      options: ["RJ11 (4 Adern)", "RJ45 (8 Adern)", "BNC", "USB-C"],
      correct: 1,
      explanation: "RJ45 hat 8 Leitungen und 4 Adernpaare. RJ11 hat nur 4 Leitungen (Telefon).",
    },
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);

  const checkAnswer = (idx: number) => {
    setQuizAnswer(String(idx));
    setQuizCorrect(idx === quizQuestions[currentQuiz].correct);
  };

  return (
    <div className="w-full bg-slate-900/50 rounded-xl p-6 border border-slate-700">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            🔗 Ethernet-Frame Builder
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Klicke auf ein Feld, um Details zu sehen. Bearbeite MAC-Adressen und EtherType.
          </p>
        </div>
        <div className="flex gap-2">
          {(["frame", "cat", "quiz"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeTab === tab
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {tab === "frame" ? "🔗 Frame" : tab === "cat" ? "📡 Kabel" : "❓ Quiz"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "frame" && (
        <>
          {/* Frame visualization */}
          <div className="mb-6">
            <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-2">
              {fields.map((field) => (
                <button
                  key={field.id}
                  onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
                  className={`shrink-0 px-3 py-3 rounded-lg border-2 transition-all text-center cursor-pointer ${
                    selectedField === field.id
                      ? "border-white shadow-lg scale-105"
                      : "border-transparent hover:border-slate-500"
                  }`}
                  style={{
                    backgroundColor: `${field.color}20`,
                    borderColor: selectedField === field.id ? field.color : undefined,
                    minWidth: `${Math.max(field.bytes * 12, 80)}px`,
                  }}
                >
                  <div className="text-xs font-medium" style={{ color: field.color }}>
                    {field.name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{field.bytes} Bytes</div>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>← Header (14 Bytes) →|← Daten (46–1500 Bytes) →|← Trailer (4 Bytes) →</span>
              <span>Gesamt: {totalBytes} Bytes (min. 64)</span>
            </div>
          </div>

          {/* Field details */}
          {selectedFieldData && (
            <div
              className="bg-slate-800/50 rounded-lg p-4 border mb-6 animate-[fadeIn_0.2s_ease-out]"
              style={{ borderColor: `${selectedFieldData.color}40` }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0"
                  style={{ backgroundColor: `${selectedFieldData.color}20` }}
                >
                  {selectedFieldData.id === "preamble" || selectedFieldData.id === "sfd"
                    ? "⏱️"
                    : selectedFieldData.id === "dest_mac"
                    ? "🎯"
                    : selectedFieldData.id === "src_mac"
                    ? "📤"
                    : selectedFieldData.id === "ethertype"
                    ? "🏷️"
                    : selectedFieldData.id === "payload"
                    ? "📄"
                    : "✅"}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">
                    {selectedFieldData.name}
                    <span className="text-slate-400 text-sm ml-2">({selectedFieldData.nameEn})</span>
                  </h4>
                  <p className="text-sm text-slate-300 mt-1">{selectedFieldData.description}</p>

                  {/* Editable fields */}
                  {selectedFieldData.editable && (
                    <div className="mt-3">
                      {selectedFieldData.id === "ethertype" ? (
                        <select
                          value={selectedFieldData.defaultValue}
                          onChange={(e) => updateField("ethertype", e.target.value)}
                          className="bg-slate-700 text-white text-sm rounded px-3 py-1.5 border border-slate-600"
                        >
                          {ETHERTYPE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={selectedFieldData.defaultValue}
                          onChange={(e) => updateField(selectedFieldData.id, e.target.value)}
                          className="bg-slate-700 text-white text-sm rounded px-3 py-1.5 border border-slate-600 font-mono w-full max-w-xs"
                          placeholder="AA:BB:CC:DD:EE:FF"
                        />
                      )}
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="mt-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${
                          selectedFieldData.category === "header"
                            ? "#3b82f6"
                            : selectedFieldData.category === "data"
                            ? "#22c55e"
                            : "#8b5cf6"
                        }20`,
                        color:
                          selectedFieldData.category === "header"
                            ? "#60a5fa"
                            : selectedFieldData.category === "data"
                            ? "#4ade80"
                            : "#a78bfa",
                      }}
                    >
                      {selectedFieldData.category === "header"
                        ? "📋 Header"
                        : selectedFieldData.category === "data"
                        ? "📄 Daten"
                        : "📎 Trailer"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hex dump */}
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">🔢 Hex-Dump des Frames:</h4>
            <div className="font-mono text-xs bg-slate-900 rounded p-3 overflow-x-auto">
              <div className="flex flex-wrap gap-1">
                {fields.map((field) => (
                  <span
                    key={field.id}
                    className="px-1 py-0.5 rounded cursor-pointer hover:opacity-80"
                    style={{ backgroundColor: `${field.color}20`, color: field.color }}
                    onClick={() => setSelectedField(field.id)}
                    title={field.name}
                  >
                    {field.defaultValue}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "cat" && (
        <div>
          <h4 className="text-sm font-semibold text-slate-300 mb-3">📡 Ethernet-Kabel-Kategorien</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Kategorie</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Geschwindigkeit</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Frequenz</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Reichweite</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Standard</th>
                </tr>
              </thead>
              <tbody>
                {CAT_CATEGORIES.map((cat, i) => (
                  <tr
                    key={cat.cat}
                    className={`border-b border-slate-700/50 ${
                      i % 2 === 0 ? "bg-slate-800/30" : ""
                    } hover:bg-slate-700/30 transition-colors`}
                  >
                    <td className="py-2 px-3 font-semibold text-white">{cat.cat}</td>
                    <td className="py-2 px-3 text-green-400">{cat.speed}</td>
                    <td className="py-2 px-3 text-slate-300">{cat.freq}</td>
                    <td className="py-2 px-3 text-slate-300">{cat.distance}</td>
                    <td className="py-2 px-3 text-blue-400 font-mono text-xs">{cat.standard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-xs text-slate-400">
              💡 <strong className="text-blue-400">IHK-Tipp:</strong> Cat 5/5e sind die Standards für 100 Mbit/s und 1 Gbit/s.
              Cat 6a+ für 10 Gbit/s. Kupferleitungen (Twisted-Pair) bis 100m, Glasfaser (LWL) für längere Strecken.
              RJ45-Stecker mit 8 Leitungen und 4 Adernpaaren.
            </p>
          </div>
        </div>
      )}

      {activeTab === "quiz" && (
        <div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">
                Frage {currentQuiz + 1} von {quizQuestions.length}
              </span>
              <div className="flex gap-1">
                {quizQuestions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentQuiz(i);
                      setQuizAnswer(null);
                      setQuizCorrect(null);
                    }}
                    className={`w-6 h-6 rounded text-xs ${
                      i === currentQuiz ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <h4 className="font-semibold text-white mb-3">{quizQuestions[currentQuiz].q}</h4>
            <div className="space-y-2">
              {quizQuestions[currentQuiz].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => checkAnswer(i)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors text-sm ${
                    quizAnswer === String(i)
                      ? i === quizQuestions[currentQuiz].correct
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : "border-red-500 bg-red-500/10 text-red-400"
                      : "border-slate-600 hover:border-slate-500 text-slate-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {quizAnswer !== null && (
              <div className={`mt-3 p-3 rounded-lg text-sm ${
                quizCorrect ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
              }`}>
                <p className={quizCorrect ? "text-green-400" : "text-red-400"}>
                  {quizCorrect ? "✅ Richtig!" : "❌ Falsch!"}
                </p>
                <p className="text-slate-400 mt-1">{quizQuestions[currentQuiz].explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
