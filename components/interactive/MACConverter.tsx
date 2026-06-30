"use client";
import React from "react";

import { useState } from "react";

function macToBinary(mac: string): string {
  return mac
    .split(":")
    .map((octet) => parseInt(octet, 16).toString(2).padStart(8, "0"))
    .join(":");
}

function macToDecimal(mac: string): string {
  return mac
    .split(":")
    .map((octet) => parseInt(octet, 16).toString())
    .join(".");
}

function macToNumber(mac: string): bigint {
  return BigInt("0x" + mac.replace(/:/g, ""));
}

function normalizeMac(input: string): string | null {
  const cleaned = input.replace(/[-.]/g, ":").toUpperCase();
  const parts = cleaned.split(":");
  if (parts.length === 6 && parts.every((p) => /^[0-9A-F]{1,2}$/i.test(p))) {
    return parts.map((p) => p.padStart(2, "0")).join(":");
  }
  // Try without separators (AABBCCDDEEFF)
  if (/^[0-9A-Fa-f]{12}$/.test(input)) {
    return input
      .match(/.{2}/g)!
      .map((p) => p.toUpperCase())
      .join(":");
  }
  return null;
}

const OUI_DATABASE: Record<string, string> = {
  "00:50:56": "VMware",
  "00:0C:29": "VMware",
  "08:00:27": "Oracle VirtualBox",
  "00:1A:2B": "Cisco",
  "00:1B:44": "Cisco",
  "00:1C:0E": "Cisco",
  "00:26:0B": "Apple",
  "00:1E:C2": "Apple",
  "AC:DE:48": "Apple",
  "B8:27:EB": "Raspberry Pi",
  "DC:A6:32": "Raspberry Pi",
  "00:15:5D": "Microsoft Hyper-V",
  "F8:FF:C2": "Apple",
  "3C:22:FB": "Apple",
  "00:1A:11": "Google",
  "F4:F5:D8": "Google",
  "00:03:93": "Juniper Networks",
  "00:1B:21": "Intel",
  "00:1E:67": "Intel",
  "3C:97:0E": "Wistron",
  "00:19:E0": "Apple",
  "52:54:00": "QEMU/KVM",
};

function lookupVendor(mac: string): string {
  const prefix = mac.substring(0, 8).toUpperCase();
  return OUI_DATABASE[prefix] || "Unbekannt";
}

function ipToBinaryParts(ip: string): { network: string; host: string; full: string } | null {
  const parts = ip.split(".");
  if (parts.length !== 4 || parts.some((p) => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
    return null;
  }
  const binary = parts.map((p) => parseInt(p).toString(2).padStart(8, "0"));
  return {
    full: binary.join("."),
    network: binary.join("."),
    host: "",
  };
}

function ipToBinaryWithSubnet(ip: string, cidr: number): { netBits: string; hostBits: string; full: string } | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  const binary = parts.map((p) => parseInt(p).toString(2).padStart(8, "0")).join("");
  const netBits = binary.substring(0, cidr);
  const hostBits = binary.substring(cidr);
  return {
    full: parts.map((p) => parseInt(p).toString(2).padStart(8, "0")).join("."),
    netBits,
    hostBits,
  };
}

export function MACConverter() {
  const [macInput, setMacInput] = useState("AA:BB:CC:DD:EE:FF");
  const [ipInput, setIpInput] = useState("192.168.1.100");
  const [cidr, setCidr] = useState(24);
  const [tab, setTab] = useState<"mac" | "ip" | "converter">("mac");

  const normalizedMac = normalizeMac(macInput);
  const ipParts = ipToBinaryParts(ipInput);
  const ipSubnet = ipToBinaryWithSubnet(ipInput, cidr);

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">🔢 MAC / IP Converter</h3>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-slate-700 rounded-lg p-1">
        {([["mac", "🏷️ MAC-Adresse"], ["ip", "🌐 IP-Adresse"], ["converter", "🔄 Basis-Konverter"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key as typeof tab)}
            className={`flex-1 px-3 py-1.5 rounded text-sm transition-colors ${
              tab === key ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "mac" && (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">MAC-Adresse eingeben</label>
            <input
              value={macInput}
              onChange={(e) => setMacInput(e.target.value)}
              placeholder="AA:BB:CC:DD:EE:FF oder AABBCCDDEEFF"
              className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
            />
          </div>

          {normalizedMac ? (
            <div className="space-y-2">
              <InfoRow label="Normalisiert" value={normalizedMac} color="#ef4444" />
              <InfoRow label="Binär" value={macToBinary(normalizedMac)} color="#f97316" />
              <InfoRow label="Dezimal" value={macToDecimal(normalizedMac)} color="#22c55e" />
              <InfoRow label="Hersteller (OUI)" value={lookupVendor(normalizedMac)} color="#8b5cf6" />
              <InfoRow label="OUI-Prefix" value={normalizedMac.substring(0, 8)} color="#3b82f6" />

              {/* Bit visualization */}
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-2">Binär-Darstellung:</p>
                <div className="flex flex-wrap gap-1">
                  {normalizedMac.split(":").map((octet, i) => {
                    const bin = parseInt(octet, 16).toString(2).padStart(8, "0");
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="flex gap-0.5 mb-1">
                          {bin.split("").map((bit, j) => (
                            <span
                              key={j}
                              className={`w-5 h-5 flex items-center justify-center rounded text-xs font-mono ${
                                i < 3 ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
                              }`}
                            >
                              {bit}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 font-mono">{octet}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs mt-2">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-600 rounded inline-block" /> OUI (Hersteller)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-orange-600 rounded inline-block" /> Geräte-ID
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-400">⚠️ Ungültige MAC-Adresse. Format: AA:BB:CC:DD:EE:FF oder AABBCCDDEEFF</p>
          )}
        </div>
      )}

      {tab === "ip" && (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">IP-Adresse eingeben</label>
            <input
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="192.168.1.100"
              className="w-full px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">CIDR: /{cidr}</label>
            <input
              type="range"
              min={0}
              max={32}
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {ipParts && ipSubnet ? (
            <div className="space-y-2">
              <InfoRow label="Dezimal" value={ipInput} color="#ef4444" />
              <InfoRow label="Binär" value={ipParts.full} color="#f97316" />

              {/* Bit visualization with net/host coloring */}
              <div className="mt-3">
                <p className="text-xs text-slate-400 mb-2">Netzadresse vs. Host (/{cidr}):</p>
                <div className="flex flex-wrap gap-0.5">
                  {ipSubnet.full.split("").map((char, i) => {
                    if (char === ".") return <span key={i} className="text-slate-500 mx-0.5">.</span>;
                    let bitIndex = 0;
                    for (let j = 0; j < i; j++) {
                      if (ipSubnet.full[j] !== ".") bitIndex++;
                    }
                    const isNet = bitIndex < cidr;
                    return (
                      <span
                        key={i}
                        className={`w-5 h-5 flex items-center justify-center rounded text-xs font-mono ${
                          isNet ? "bg-blue-600 text-white" : "bg-orange-600 text-white"
                        }`}
                      >
                        {char}
                      </span>
                    );
                  })}
                </div>
                <div className="flex gap-4 text-xs mt-2">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-600 rounded inline-block" /> Netz-Bits ({cidr})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-orange-600 rounded inline-block" /> Host-Bits ({32 - cidr})
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-red-400">⚠️ Ungültige IP-Adresse</p>
          )}
        </div>
      )}

      {tab === "converter" && (
        <div className="space-y-4">
          <BaseConverter />
        </div>
      )}
    </div>
  );
}

function BaseConverter() {
  const [input, setInput] = useState("255");
  const [base, setBase] = useState<10 | 16 | 2>(10);

  const numValue = parseInt(input, base);
  const isValid = !isNaN(numValue) && numValue >= 0 && numValue <= 255;

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs text-slate-400 mb-1 block">Wert eingeben (0-255)</label>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-700 rounded-lg text-white text-sm border border-slate-600 focus:border-blue-500 outline-none font-mono"
          />
          <div className="flex gap-1 bg-slate-700 rounded-lg p-0.5">
            {([10, 16, 2] as const).map((b) => (
              <button
                key={b}
                onClick={() => { setBase(b); setInput(""); }}
                className={`px-3 py-1.5 rounded text-xs transition-colors ${
                  base === b ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-600"
                }`}
              >
                {b === 10 ? "Dez" : b === 16 ? "Hex" : "Bin"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isValid ? (
        <div className="grid grid-cols-3 gap-2">
          <InfoBox label="Dezimal" value={numValue.toString()} />
          <InfoBox label="Hexadezimal" value={"0x" + numValue.toString(16).toUpperCase()} />
          <InfoBox label="Binär" value={numValue.toString(2).padStart(8, "0")} />
        </div>
      ) : (
        <p className="text-sm text-red-400">⚠️ Bitte einen gültigen Wert eingeben (0-255)</p>
      )}

      {/* Quick reference */}
      <div className="p-3 bg-slate-700 rounded-lg">
        <p className="text-xs text-slate-400 mb-2">💡 Schnellreferenz:</p>
        <div className="grid grid-cols-4 gap-1 text-xs">
          <span className="text-slate-500">Dez</span>
          <span className="text-slate-500">Hex</span>
          <span className="text-slate-500">Bin</span>
          <span className="text-slate-500">Info</span>
          {[
            [0, "00", "00000000", "Min"],
            [127, "7F", "01111111", "Loopback"],
            [128, "80", "10000000", ""],
            [168, "A8", "10101000", "192.168"],
            [192, "C0", "11000000", "Klasse C"],
            [255, "FF", "11111111", "Broadcast"],
          ].map(([d, h, b, info]) => (
            <React.Fragment key={String(d)}>
              <span className="text-white font-mono">{d}</span>
              <span className="text-blue-400 font-mono">{h}</span>
              <span className="text-green-400 font-mono text-xs">{String(b).padStart(8, "0")}</span>
              <span className="text-slate-400">{String(info)}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg">
      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-xs text-slate-400 w-28 shrink-0">{label}</span>
      <span className="text-sm font-mono text-white break-all">{value}</span>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 bg-slate-700 rounded-lg border border-slate-600">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-sm font-mono text-white">{value}</p>
    </div>
  );
}
