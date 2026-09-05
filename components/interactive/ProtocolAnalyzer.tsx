"use client";

import { useState } from "react";

interface PacketField {
  name: string;
  bytes: number;
  color: string;
  description: string;
  hexValue: string;
  bits?: string;
}

interface PacketExample {
  name: string;
  description: string;
  fields: PacketField[];
  rawHex: string;
}

const PACKET_EXAMPLES: PacketExample[] = [
  {
    name: "ARP Request",
    description: "Address Resolution Protocol — fragt die MAC-Adresse für eine IP-Adresse ab",
    fields: [
      { name: "Hardware Type", bytes: 2, color: "#ef4444", description: "Typ der Hardware-Adresse: 0x0001 = Ethernet", hexValue: "0001" },
      { name: "Protocol Type", bytes: 2, color: "#f97316", description: "Typ der Protokoll-Adresse: 0x0800 = IPv4", hexValue: "0800" },
      { name: "HW Size", bytes: 1, color: "#eab308", description: "Länge der Hardware-Adresse: 6 Bytes (MAC)", hexValue: "06" },
      { name: "Proto Size", bytes: 1, color: "#22c55e", description: "Länge der Protokoll-Adresse: 4 Bytes (IPv4)", hexValue: "04" },
      { name: "Opcode", bytes: 2, color: "#3b82f6", description: "1 = Request, 2 = Reply", hexValue: "0001" },
      { name: "Sender MAC", bytes: 6, color: "#8b5cf6", description: "MAC-Adresse des Absenders", hexValue: "AA:BB:CC:DD:EE:01" },
      { name: "Sender IP", bytes: 4, color: "#ec4899", description: "IP-Adresse des Absenders: 192.168.1.1", hexValue: "C0A80101" },
      { name: "Target MAC", bytes: 6, color: "#6366f1", description: "MAC-Adresse des Ziels: 00:00:00:00:00:00 (unbekannt)", hexValue: "000000000000" },
      { name: "Target IP", bytes: 4, color: "#14b8a6", description: "IP-Adresse des Ziels: 192.168.1.100", hexValue: "C0A80164" },
    ],
    rawHex: "0001 0800 06 04 0001 AABBCCDDEE01 C0A80101 000000000000 C0A80164",
  },
  {
    name: "Ethernet Frame",
    description: "Ethernet-II-Frame — Grundlage der lokalen Netzwerk-Kommunikation (Schicht 2)",
    fields: [
      { name: "Dest. MAC", bytes: 6, color: "#ef4444", description: "Ziel-MAC-Adresse: FF:FF:FF:FF:FF:FF = Broadcast", hexValue: "FFFFFFFFFFFF" },
      { name: "Source MAC", bytes: 6, color: "#f97316", description: "Quell-MAC-Adresse", hexValue: "AABBCCDDEE01" },
      { name: "EtherType", bytes: 2, color: "#eab308", description: "Typ des enthaltenen Protokolls: 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6", hexValue: "0800" },
      { name: "Payload", bytes: 46, color: "#3b82f6", description: "Die eigentlichen Daten (46–1500 Bytes)", hexValue: "..." },
      { name: "FCS", bytes: 4, color: "#8b5cf6", description: "Frame Check Sequence — CRC-32 Prüfsumme", hexValue: "1A2B3C4D" },
    ],
    rawHex: "FFFFFFFFFFFF AABBCCDDEE01 0800 [Payload: 46-1500 Bytes] 1A2B3C4D",
  },
  {
    name: "TCP SYN Segment",
    description: "TCP-Verbindungsaufbau — erstes Paket des 3-Way-Handshake",
    fields: [
      { name: "Source Port", bytes: 2, color: "#ef4444", description: "Quell-Port: 12345 (Client)", hexValue: "3039" },
      { name: "Dest. Port", bytes: 2, color: "#f97316", description: "Ziel-Port: 80 (HTTP)", hexValue: "0050" },
      { name: "Seq Number", bytes: 4, color: "#eab308", description: "Sequenznummer: 1000000", hexValue: "000F4240" },
      { name: "Ack Number", bytes: 4, color: "#22c55e", description: "Quittungsnummer: 0 (noch keine)", hexValue: "00000000" },
      { name: "Data Offset", bytes: 1, color: "#3b82f6", description: "Header-Länge: 5 × 4 = 20 Bytes", hexValue: "50" },
      { name: "Flags", bytes: 1, color: "#8b5cf6", description: "SYN=1 (0x02) — Verbindung aufbauen", hexValue: "02" },
      { name: "Window", bytes: 2, color: "#ec4899", description: "Fenster-Größe: 65535 Bytes", hexValue: "FFFF" },
      { name: "Checksum", bytes: 2, color: "#6366f1", description: "Prüfsumme", hexValue: "1A2B" },
      { name: "Urgent Ptr", bytes: 2, color: "#14b8a6", description: "Dringender Zeiger: 0", hexValue: "0000" },
    ],
    rawHex: "3039 0050 000F4240 00000000 50 02 FFFF 1A2B 0000",
  },
  {
    name: "DNS Query",
    description: "Domain Name System Anfrage — löst einen Domainnamen in eine IP-Adresse auf",
    fields: [
      { name: "Transaction ID", bytes: 2, color: "#ef4444", description: "Identifikation der Anfrage", hexValue: "A1B2" },
      { name: "Flags", bytes: 2, color: "#f97316", description: "Standard Query, Recursion Desired", hexValue: "0100" },
      { name: "Questions", bytes: 2, color: "#eab308", description: "Anzahl der Fragen: 1", hexValue: "0001" },
      { name: "Answers", bytes: 2, color: "#22c55e", description: "Anzahl der Antworten: 0", hexValue: "0000" },
      { name: "Authority", bytes: 2, color: "#3b82f6", description: "Authority Records: 0", hexValue: "0000" },
      { name: "Additional", bytes: 2, color: "#8b5cf6", description: "Additional Records: 0", hexValue: "0000" },
      { name: "Query Name", bytes: 15, color: "#ec4899", description: "www.example.com als DNS-Labels", hexValue: "03777777076578616D706C6503636F6D00" },
      { name: "Query Type", bytes: 2, color: "#6366f1", description: "Type A (IPv4 Adresse)", hexValue: "0001" },
      { name: "Query Class", bytes: 2, color: "#14b8a6", description: "Class IN (Internet)", hexValue: "0001" },
    ],
    rawHex: "A1B2 0100 0001 0000 0000 0000 [www.example.com] 0001 0001",
  },
];

export function ProtocolAnalyzer() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [hoveredField, setHoveredField] = useState<number | null>(null);
  const example = PACKET_EXAMPLES[selectedExample];

  let hexOffset = 0;

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">🔬 Protocol Analyzer</h3>

      {/* Example selector */}
      <div className="flex gap-1 mb-4 bg-slate-700 rounded-lg p-1">
        {PACKET_EXAMPLES.map((ex, i) => (
          <button
            key={ex.name}
            onClick={() => { setSelectedExample(i); setHoveredField(null); }}
            className={`flex-1 px-2 py-1.5 rounded text-xs transition-colors ${
              selectedExample === i ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
            }`}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-300 mb-3">{example.description}</p>

      {/* Hex Dump */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4 overflow-x-auto">
        <p className="text-xs text-slate-500 mb-2 font-mono">Hex-Dump:</p>
        <div className="flex flex-wrap gap-1">
          {example.fields.map((field, i) => {
            const isHovered = hoveredField === i;
            return (
              <span
                key={i}
                onMouseEnter={() => setHoveredField(i)}
                onMouseLeave={() => setHoveredField(null)}
                className={`px-1.5 py-0.5 rounded text-xs font-mono cursor-pointer transition-all ${
                  isHovered ? "ring-2 ring-white scale-110" : ""
                }`}
                style={{ backgroundColor: `${field.color}40`, color: field.color, borderLeft: `3px solid ${field.color}` }}
              >
                {field.hexValue.length > 16 ? field.hexValue.slice(0, 16) + "..." : field.hexValue}
              </span>
            );
          })}
        </div>
      </div>

      {/* Field detail */}
      {hoveredField !== null && (
        <div
          className="p-3 rounded-lg border-l-4 mb-4 transition-all"
          style={{
            borderColor: example.fields[hoveredField].color,
            backgroundColor: `${example.fields[hoveredField].color}10`,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: example.fields[hoveredField].color }}
            />
            <h4 className="text-sm font-bold text-white">{example.fields[hoveredField].name}</h4>
            <span className="text-xs px-2 py-0.5 bg-slate-700 rounded text-slate-300">
              {example.fields[hoveredField].bytes} {example.fields[hoveredField].bytes === 1 ? "Byte" : "Bytes"}
            </span>
          </div>
          <p className="text-xs text-slate-400 mb-1">Hex: <span className="font-mono text-blue-400">{example.fields[hoveredField].hexValue}</span></p>
          <p className="text-sm text-slate-200">{example.fields[hoveredField].description}</p>
        </div>
      )}

      {/* Field list */}
      <div className="space-y-1">
        {example.fields.map((field, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredField(i)}
            onMouseLeave={() => setHoveredField(null)}
            className={`flex items-center gap-2 p-1.5 rounded cursor-pointer transition-all ${
              hoveredField === i ? "bg-slate-700" : "hover:bg-slate-700/50"
            }`}
          >
            <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: field.color }} />
            <span className="text-xs text-white font-medium w-28 truncate">{field.name}</span>
            <span className="text-xs text-slate-400 font-mono flex-1 truncate">{field.hexValue.length > 20 ? field.hexValue.slice(0, 20) + "..." : field.hexValue}</span>
            <span className="text-xs text-slate-500 shrink-0">{field.bytes}B</span>
          </div>
        ))}
      </div>
    </div>
  );
}
