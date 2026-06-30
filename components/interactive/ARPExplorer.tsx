"use client";

import { useState } from "react";

// ============================================================================
// ARP Explorer — IP-zu-MAC-Auflösung interaktiv erleben
// ============================================================================

interface Device {
  name: string;
  ip: string;
  mac: string;
}

const devices: Device[] = [
  { name: "PC-A", ip: "192.168.1.10", mac: "AA:BB:CC:11:22:33" },
  { name: "PC-B", ip: "192.168.1.20", mac: "DD:EE:FF:44:55:66" },
  { name: "Server", ip: "192.168.1.100", mac: "11:22:33:AA:BB:CC" },
  { name: "Drucker", ip: "192.168.1.200", mac: "44:55:66:DD:EE:FF" },
];

interface ArpEntry {
  ip: string;
  mac: string;
}

type Step = "idle" | "who-has" | "reply" | "done";

export default function ARPExplorer() {
  const [target, setTarget] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [arpTable, setArpTable] = useState<ArpEntry[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const resolve = (ip: string) => {
    setTarget(ip);
    setStep("who-has");
    setLog((l) => [`→ Broadcast: WHO HAS ${ip}? Tell 192.168.1.1`, ...l]);

    setTimeout(() => {
      const device = devices.find((d) => d.ip === ip);
      if (device) {
        setStep("reply");
        setLog((l) => [`← ${device.mac} is at ${ip} (${device.name})`, ...l]);

        setTimeout(() => {
          setStep("done");
          setArpTable((t) => {
            if (t.some((e) => e.ip === ip)) return t;
            return [...t, { ip, mac: device.mac }];
          });
          setLog((l) => [`✓ ARP-Eintrag: ${ip} → ${device.mac}`, ...l]);
        }, 800);
      }
    }, 800);
  };

  const reset = () => {
    setTarget(null);
    setStep("idle");
    setArpTable([]);
    setLog([]);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Klicke auf ein Gerät, um es per ARP aufzulösen. Der Prozess: Broadcast → Reply → ARP-Tabelle.
      </p>

      {/* Network visualization */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="text-center text-xs text-gray-400 mb-3">192.168.1.0/24 — Switch</div>
        <div className="grid grid-cols-2 gap-2">
          {/* Our PC */}
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-400 text-center">
            <div className="text-xs font-bold text-blue-600">Sie (PC)</div>
            <div className="text-[10px] font-mono">192.168.1.1</div>
          </div>

          {/* Target devices */}
          {devices.map((d) => (
            <button
              key={d.ip}
              onClick={() => step === "idle" || step === "done" ? resolve(d.ip) : undefined}
              className={`p-2 rounded-lg border-2 text-center transition-all ${
                target === d.ip
                  ? step === "who-has"
                    ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20 animate-pulse"
                    : step === "reply"
                    ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                    : "border-green-500 bg-green-100 dark:bg-green-900/30"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-300"
              }`}
            >
              <div className="text-xs font-bold">{d.name}</div>
              <div className="text-[10px] font-mono">{d.ip}</div>
              <div className="text-[10px] font-mono text-gray-400">{d.mac}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ARP Table */}
      {arpTable.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="text-xs font-bold mb-2">ARP-Tabelle (Cache):</div>
          {arpTable.map((e) => (
            <div key={e.ip} className="flex justify-between text-xs font-mono py-0.5">
              <span>{e.ip}</span>
              <span className="text-amber-600">{e.mac}</span>
            </div>
          ))}
        </div>
      )}

      {/* Log */}
      {log.length > 0 && (
        <div className="bg-gray-900 rounded-lg p-3 max-h-32 overflow-y-auto">
          {log.map((entry, i) => (
            <div key={i} className="text-xs font-mono text-green-400 py-0.5">{entry}</div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
