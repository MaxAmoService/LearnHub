"use client";

import { useState } from "react";

// ============================================================================
// Virtualization Explorer — Virtualisierung + Cloud-Modelle interaktiv
// ============================================================================

type Tab = "virtualization" | "cloud" | "responsibility";

interface VirtModel {
  id: string;
  name: string;
  layers: { label: string; color: string }[];
  description: string;
  pros: string[];
  cons: string[];
  examples: string[];
}

const virtModels: VirtModel[] = [
  {
    id: "type1",
    name: "Typ 1 — Bare-Metal",
    layers: [
      { label: "VM 1", color: "#3B82F6" },
      { label: "VM 2", color: "#3B82F6" },
      { label: "VM 3", color: "#3B82F6" },
      { label: "Hypervisor", color: "#F59E0B" },
      { label: "Hardware", color: "#6B7280" },
    ],
    description: "Der Hypervisor läuft direkt auf der Hardware — kein Host-OS nötig. Beste Performance und Isolation.",
    pros: ["Bester Performance", "Volle Hardware-Kontrolle", "Sichere Isolation"],
    cons: ["Komplexere Einrichtung", "Begrenzte Hardware-Treiber"],
    examples: ["VMware ESXi", "Microsoft Hyper-V", "Xen", "KVM"],
  },
  {
    id: "type2",
    name: "Typ 2 — Hosted",
    layers: [
      { label: "VM 1", color: "#3B82F6" },
      { label: "VM 2", color: "#3B82F6" },
      { label: "Hypervisor", color: "#F59E0B" },
      { label: "Host-OS", color: "#10B981" },
      { label: "Hardware", color: "#6B7280" },
    ],
    description: "Der Hypervisor läuft auf einem bestehenden Betriebssystem. Einfach zu installieren, aber mehr Overhead.",
    pros: ["Einfache Installation", "Nutzt Host-Treiber", "Gut für Entwicklung"],
    cons: ["Mehr Overhead", "Weniger performant", "Abhängig vom Host-OS"],
    examples: ["VirtualBox", "VMware Workstation", "Parallels Desktop"],
  },
  {
    id: "container",
    name: "Container",
    layers: [
      { label: "App A", color: "#8B5CF6" },
      { label: "App B", color: "#8B5CF6" },
      { label: "Container Runtime", color: "#F59E0B" },
      { label: "Host-OS (Kernel)", color: "#10B981" },
      { label: "Hardware", color: "#6B7280" },
    ],
    description: "Container teilen sich den Kernel des Host-OS. Sehr leichtgewichtig — starten in Millisekunden.",
    pros: ["Sehr schnell (ms-Start)", "Wenig Overhead", "Skalierbar", "Microservices"],
    cons: ["Geteilter Kernel", "Weniger isoliert als VMs", "Nur gleiche OS-Familie"],
    examples: ["Docker", "Kubernetes", "Podman", "LXC"],
  },
];

interface CloudModel {
  name: string;
  icon: string;
  description: string;
  pros: string[];
  cons: string[];
  examples: string[];
}

const cloudModels: CloudModel[] = [
  {
    name: "Public Cloud",
    icon: "☁️",
    description: "Shared Infrastructure — Ressourcen werden unter vielen Kunden geteilt.",
    pros: ["Skalierbar nach Bedarf", "Keine Anfangsinvestition", "Weltweiter Zugriff"],
    cons: ["Weniger Kontrolle", "Datenschutz-Bedenken", "Vendor Lock-in"],
    examples: ["AWS", "Microsoft Azure", "Google Cloud"],
  },
  {
    name: "Private Cloud",
    icon: "🏢",
    description: "Dediziert für ein Unternehmen — entweder on-premise oder gehostet.",
    pros: ["Volle Kontrolle", "Datenschutz", "Anpassbar"],
    cons: ["Teuer (Hardware + Wartung)", "Skalierung begrenzt", "Eigenes Team nötig"],
    examples: ["VMware vSphere", "OpenStack", "Microsoft Azure Stack"],
  },
  {
    name: "Hybrid Cloud",
    icon: "🔗",
    description: "Kombination aus Public und Private Cloud — sensible Daten lokal, Rest in der Cloud.",
    pros: ["Flexibel", "Sensible Daten lokal", "Cloud-Bursting möglich"],
    cons: ["Komplexe Architektur", "Netzwerk-Konfiguration", "Kosten schwer kalkulierbar"],
    examples: ["Azure Arc", "AWS Outposts", "Google Anthos"],
  },
];

interface ServiceModel {
  name: string;
  layers: { label: string; provider: boolean }[];
  description: string;
}

const serviceModels: ServiceModel[] = [
  {
    name: "IaaS",
    layers: [
      { label: "Anwendung", provider: false },
      { label: "Laufzeitumgebung", provider: false },
      { label: "Betriebssystem", provider: false },
      { label: "Virtualisierung", provider: true },
      { label: "Hardware", provider: true },
    ],
    description: "Infrastruktur als Dienst — Sie managen OS, Apps und Daten. Provider liefert Hardware + Virtualisierung.",
  },
  {
    name: "PaaS",
    layers: [
      { label: "Anwendung", provider: false },
      { label: "Laufzeitumgebung", provider: true },
      { label: "Betriebssystem", provider: true },
      { label: "Virtualisierung", provider: true },
      { label: "Hardware", provider: true },
    ],
    description: "Plattform als Dienst — Sie entwickeln nur die Anwendung. Provider managed den Rest.",
  },
  {
    name: "SaaS",
    layers: [
      { label: "Anwendung", provider: true },
      { label: "Laufzeitumgebung", provider: true },
      { label: "Betriebssystem", provider: true },
      { label: "Virtualisierung", provider: true },
      { label: "Hardware", provider: true },
    ],
    description: "Software als Dienst — Fertige Anwendung, nichts zu managen. Nur Daten eingeben.",
  },
];

export default function VirtualizationExplorer() {
  const [tab, setTab] = useState<Tab>("virtualization");
  const [selectedVirt, setSelectedVirt] = useState(0);
  const [selectedCloud, setSelectedCloud] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState(0);

  const tabs: { id: Tab; label: string }[] = [
    { id: "virtualization", label: "Virtualisierung" },
    { id: "cloud", label: "Cloud-Deployment" },
    { id: "responsibility", label: "IaaS/PaaS/SaaS" },
  ];

  return (
    <div className="space-y-4">
      {/* Tab navigation */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all ${
              tab === t.id
                ? "bg-white dark:bg-gray-700 shadow text-amber-600 dark:text-amber-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Virtualization */}
      {tab === "virtualization" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {virtModels.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setSelectedVirt(i)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  i === selectedVirt
                    ? "bg-amber-500 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {m.name.split(" — ")[0]}
              </button>
            ))}
          </div>

          {/* Layer visualization */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col items-center gap-1.5">
              {virtModels[selectedVirt].layers.map((layer, i) => (
                <div
                  key={i}
                  className="w-full max-w-[280px] text-center py-2 px-3 rounded-lg text-xs font-semibold text-white transition-all"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.label}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">{virtModels[selectedVirt].description}</p>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="text-xs font-bold text-green-600 dark:text-green-400 mb-1">Vorteile</div>
              <ul className="text-xs space-y-0.5">
                {virtModels[selectedVirt].pros.map((p) => (
                  <li key={p} className="text-green-700 dark:text-green-300">+ {p}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
              <div className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Nachteile</div>
              <ul className="text-xs space-y-0.5">
                {virtModels[selectedVirt].cons.map((c) => (
                  <li key={c} className="text-red-700 dark:text-red-300">- {c}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <strong>Beispiele:</strong> {virtModels[selectedVirt].examples.join(", ")}
          </div>
        </div>
      )}

      {/* Tab: Cloud Deployment */}
      {tab === "cloud" && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {cloudModels.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setSelectedCloud(selectedCloud === i ? null : i)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedCloud === i
                    ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300"
                }`}
              >
                <div className="text-2xl mb-1">{m.icon}</div>
                <div className="text-xs font-bold">{m.name}</div>
              </button>
            ))}
          </div>

          {selectedCloud !== null && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">{cloudModels[selectedCloud].description}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                  <div className="text-xs font-bold text-green-600 mb-1">Vorteile</div>
                  <ul className="text-xs space-y-0.5">
                    {cloudModels[selectedCloud].pros.map((p) => (
                      <li key={p} className="text-green-700 dark:text-green-300">+ {p}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                  <div className="text-xs font-bold text-red-600 mb-1">Nachteile</div>
                  <ul className="text-xs space-y-0.5">
                    {cloudModels[selectedCloud].cons.map((c) => (
                      <li key={c} className="text-red-700 dark:text-red-300">- {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <strong>Beispiele:</strong> {cloudModels[selectedCloud].examples.join(", ")}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: IaaS/PaaS/SaaS */}
      {tab === "responsibility" && (
        <div className="space-y-3">
          <div className="flex gap-2">
            {serviceModels.map((m, i) => (
              <button
                key={m.name}
                onClick={() => setSelectedService(i)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  i === selectedService
                    ? "bg-amber-500 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">{serviceModels[selectedService].description}</p>

          {/* Responsibility matrix */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-1.5">
              {serviceModels[selectedService].layers.map((layer, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-24 text-right text-[10px] text-gray-500">{layer.label}</div>
                  <div className="flex-1 h-8 rounded flex items-center justify-center text-xs font-semibold text-white"
                    style={{ backgroundColor: layer.provider ? "#10B981" : "#F59E0B" }}
                  >
                    {layer.provider ? "Provider" : "Sie"}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-3 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-amber-500" /> Sie managen
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-500" /> Provider managt
              </div>
            </div>
          </div>

          {/* Quick comparison */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="px-2 py-1.5 text-left border border-gray-200 dark:border-gray-700">Schicht</th>
                  <th className="px-2 py-1.5 text-center border border-gray-200 dark:border-gray-700">IaaS</th>
                  <th className="px-2 py-1.5 text-center border border-gray-200 dark:border-gray-700">PaaS</th>
                  <th className="px-2 py-1.5 text-center border border-gray-200 dark:border-gray-700">SaaS</th>
                </tr>
              </thead>
              <tbody>
                {["Anwendung", "Laufzeit", "Betriebssystem", "Virtualisierung", "Hardware"].map((layer) => (
                  <tr key={layer}>
                    <td className="px-2 py-1.5 border border-gray-200 dark:border-gray-700">{layer}</td>
                    <td className="px-2 py-1.5 text-center border border-gray-200 dark:border-gray-700">
                      {layer === "Anwendung" || layer === "Laufzeit" || layer === "Betriebssystem" ? "🟠 Sie" : "🟢 Provider"}
                    </td>
                    <td className="px-2 py-1.5 text-center border border-gray-200 dark:border-gray-700">
                      {layer === "Anwendung" ? "🟠 Sie" : "🟢 Provider"}
                    </td>
                    <td className="px-2 py-1.5 text-center border border-gray-200 dark:border-gray-700">🟢 Provider</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
