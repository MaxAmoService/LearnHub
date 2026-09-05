"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Container,
  Plus,
  Play,
  FileCode,
  Trash2,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Copy,
  Check,
  Layers,
  Sparkles,
  Server,
  Network,
  HardDrive,
  Settings,
  Link2,
  BookOpen,
  X,
  Pencil,
} from "lucide-react";

// ============================================================================
// Docker Compose Builder — Interaktiver docker-compose.yml-Editor fuer IHK
// ============================================================================

interface ServiceConfig {
  id: string;
  name: string;
  image: string;
  ports: string[];
  volumes: string[];
  environment: Record<string, string>;
  depends_on: string[];
  command: string;
  restart: string;
  networks: string[];
}

interface Template {
  name: string;
  icon: string;
  description: string;
  services: Omit<ServiceConfig, "id">[];
}

interface ValidationError {
  message: string;
  severity: "error" | "warning";
  serviceName?: string;
}

const RESTART_OPTIONS = ["", "no", "always", "on-failure", "unless-stopped"];

const TEMPLATES: Template[] = [
  {
    name: "Web-App + Datenbank",
    icon: "🌐",
    description: "Typischer Stack: Node.js-App mit PostgreSQL-Datenbank",
    services: [
      {
        name: "web",
        image: "node:20-alpine",
        ports: ["3000:3000"],
        volumes: ["./app:/app"],
        environment: { DATABASE_URL: "postgres://user:pass@db:5432/mydb", NODE_ENV: "development" },
        depends_on: ["db"],
        command: "npm start",
        restart: "unless-stopped",
        networks: ["app-network"],
      },
      {
        name: "db",
        image: "postgres:16-alpine",
        ports: ["5432:5432"],
        volumes: ["pgdata:/var/lib/postgresql/data"],
        environment: { POSTGRES_USER: "user", POSTGRES_PASSWORD: "pass", POSTGRES_DB: "mydb" },
        depends_on: [],
        command: "",
        restart: "unless-stopped",
        networks: ["app-network"],
      },
    ],
  },
  {
    name: "Microservices",
    icon: "🔧",
    description: "Drei Services: API-Gateway, User-Service, Product-Service",
    services: [
      {
        name: "api-gateway",
        image: "nginx:alpine",
        ports: ["80:80"],
        volumes: [],
        environment: {},
        depends_on: ["user-service", "product-service"],
        command: "",
        restart: "always",
        networks: ["microservices"],
      },
      {
        name: "user-service",
        image: "node:20-alpine",
        ports: ["3001:3001"],
        volumes: ["./user-service:/app"],
        environment: { SERVICE_PORT: "3001", DB_HOST: "user-db" },
        depends_on: ["user-db"],
        command: "npm start",
        restart: "unless-stopped",
        networks: ["microservices"],
      },
      {
        name: "product-service",
        image: "node:20-alpine",
        ports: ["3002:3002"],
        volumes: ["./product-service:/app"],
        environment: { SERVICE_PORT: "3002", DB_HOST: "product-db" },
        depends_on: ["product-db"],
        command: "npm start",
        restart: "unless-stopped",
        networks: ["microservices"],
      },
      {
        name: "user-db",
        image: "mongo:7",
        ports: [],
        volumes: ["user-db-data:/data/db"],
        environment: {},
        depends_on: [],
        command: "",
        restart: "unless-stopped",
        networks: ["microservices"],
      },
      {
        name: "product-db",
        image: "mongo:7",
        ports: [],
        volumes: ["product-db-data:/data/db"],
        environment: {},
        depends_on: [],
        command: "",
        restart: "unless-stopped",
        networks: ["microservices"],
      },
    ],
  },
  {
    name: "Entwicklungsumgebung",
    icon: "💻",
    description: "Dev-Setup mit Hot-Reload, Datenbank und Admin-Interface",
    services: [
      {
        name: "app",
        image: "python:3.12-slim",
        ports: ["8000:8000"],
        volumes: ["./src:/app", "/app/__pycache__"],
        environment: { FLASK_ENV: "development", FLASK_DEBUG: "1", REDIS_URL: "redis://cache:6379" },
        depends_on: ["db", "cache"],
        command: "flask run --host=0.0.0.0 --reload",
        restart: "no",
        networks: ["dev-network"],
      },
      {
        name: "db",
        image: "postgres:16-alpine",
        ports: ["5432:5432"],
        volumes: ["pgdata:/var/lib/postgresql/data"],
        environment: { POSTGRES_USER: "dev", POSTGRES_PASSWORD: "dev", POSTGRES_DB: "devdb" },
        depends_on: [],
        command: "",
        restart: "unless-stopped",
        networks: ["dev-network"],
      },
      {
        name: "cache",
        image: "redis:7-alpine",
        ports: ["6379:6379"],
        volumes: [],
        environment: {},
        depends_on: [],
        command: "",
        restart: "unless-stopped",
        networks: ["dev-network"],
      },
      {
        name: "adminer",
        image: "adminer",
        ports: ["8080:8080"],
        volumes: [],
        environment: {},
        depends_on: ["db"],
        command: "",
        restart: "unless-stopped",
        networks: ["dev-network"],
      },
    ],
  },
];

const EXPLANATIONS: Record<string, { title: string; text: string; icon: typeof Server }> = {
  service: {
    title: "Services",
    text: 'Ein Service ist ein Container, der ausgefuehrt wird. Mehrere Services koennen gleichzeitig laufen und miteinander kommunizieren. Jeder Service hat einen eindeutigen Namen (z.B. "web", "db").',
    icon: Server,
  },
  image: {
    title: "Image",
    text: "Das Docker-Image, aus dem der Container erstellt wird. Format: name:tag. Beispiel: postgres:16-alpine. Wird das Image lokal nicht gefunden, wird es aus der Registry (Docker Hub) geladen.",
    icon: Container,
  },
  ports: {
    title: "Ports",
    text: "Leitet Ports vom Host-System zum Container weiter. Format: HOST:CONTAINER. Beispiel: 5432:5432 macht den PostgreSQL-Port auf dem Host verfuegbar.",
    icon: Network,
  },
  volumes: {
    title: "Volumes",
    text: "Mounted Verzeichnisse oder benannte Volumes in den Container. Beispiel: ./src:/app mounted lokale Dateien fuer Hot-Reload. Benannte Volumes (pgdata:) ueberleben Container-Neustarts.",
    icon: HardDrive,
  },
  environment: {
    title: "Umgebungsvariablen",
    text: "Setzt Variablen im Container, z.B. Datenbank-Zugangsdaten. Format: SCHLUESSEL=WERT. Ideal fuer Konfiguration ohne Code-Aenderung. Sensible Werte besser in .env-Dateien auslagern.",
    icon: Settings,
  },
  depends_on: {
    title: "Abhängigkeiten",
    text: "Definiert, dass ein Service erst gestartet wird, wenn ein anderer laeuft. Beachte: Nur Start-Reihenfolge, nicht Readiness! Fuer produktive Setups braucht man Healthchecks.",
    icon: Link2,
  },
};

let serviceIdCounter = 0;
function nextServiceId(): string {
  return `svc-${++serviceIdCounter}`;
}

function createEmptyService(name: string = ""): ServiceConfig {
  return {
    id: nextServiceId(),
    name,
    image: "",
    ports: [],
    volumes: [],
    environment: {},
    depends_on: [],
    command: "",
    restart: "",
    networks: [],
  };
}

// --- YAML Generation ---
function generateYaml(services: ServiceConfig[]): string {
  if (services.length === 0) return "";

  const lines: string[] = ["version: '3.8'", "", "services:"];

  for (const svc of services) {
    lines.push(`  ${svc.name}:`);

    if (svc.image) {
      lines.push(`    image: ${svc.image}`);
    }

    if (svc.command) {
      lines.push(`    command: ${svc.command}`);
    }

    if (svc.restart) {
      lines.push(`    restart: ${svc.restart}`);
    }

    if (svc.ports.length > 0) {
      lines.push("    ports:");
      for (const p of svc.ports) {
        lines.push(`      - "${p}"`);
      }
    }

    if (svc.volumes.length > 0) {
      lines.push("    volumes:");
      for (const v of svc.volumes) {
        lines.push(`      - ${v}`);
      }
    }

    if (Object.keys(svc.environment).length > 0) {
      lines.push("    environment:");
      for (const [key, val] of Object.entries(svc.environment)) {
        lines.push(`      ${key}: ${val}`);
      }
    }

    if (svc.depends_on.length > 0) {
      lines.push("    depends_on:");
      for (const dep of svc.depends_on) {
        lines.push(`      - ${dep}`);
      }
    }

    if (svc.networks.length > 0) {
      lines.push("    networks:");
      for (const net of svc.networks) {
        lines.push(`      - ${net}`);
      }
    }

    lines.push("");
  }

  // Collect named volumes
  const namedVolumes = new Set<string>();
  for (const svc of services) {
    for (const v of svc.volumes) {
      const parts = v.split(":");
      if (parts.length >= 2 && !parts[0].startsWith(".") && !parts[0].startsWith("/") && !parts[0].startsWith("~")) {
        namedVolumes.add(parts[0]);
      }
    }
  }
  if (namedVolumes.size > 0) {
    lines.push("volumes:");
    for (const v of namedVolumes) {
      lines.push(`  ${v}:`);
    }
    lines.push("");
  }

  // Collect networks
  const allNetworks = new Set<string>();
  for (const svc of services) {
    for (const n of svc.networks) {
      allNetworks.add(n);
    }
  }
  if (allNetworks.size > 0) {
    lines.push("networks:");
    for (const n of allNetworks) {
      lines.push(`  ${n}:`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// --- Validation ---
function validateServices(services: ServiceConfig[]): ValidationError[] {
  const errors: ValidationError[] = [];

  if (services.length === 0) return errors;

  const serviceNames = new Set(services.map((s) => s.name));

  for (const svc of services) {
    if (!svc.name.trim()) {
      errors.push({ message: "Service hat keinen Namen.", severity: "error", serviceName: svc.name });
    }
    if (!svc.image.trim()) {
      errors.push({
        message: `"${svc.name || "?"}" braucht ein Image (z.B. nginx:alpine).`,
        severity: "error",
        serviceName: svc.name,
      });
    }

    for (const dep of svc.depends_on) {
      if (!serviceNames.has(dep)) {
        errors.push({
          message: `"${svc.name}" haengt von "${dep}" ab, aber dieser Service existiert nicht.`,
          severity: "error",
          serviceName: svc.name,
        });
      }
    }

    for (const port of svc.ports) {
      if (!/^\d+:\d+$/.test(port.trim())) {
        errors.push({
          message: `"${svc.name}": Port "${port}" hat falsches Format. Erwartet: HOST:CONTAINER (z.B. 8080:80).`,
          severity: "warning",
          serviceName: svc.name,
        });
      }
    }
  }

  // Check circular dependencies
  const visited = new Set<string>();
  const inStack = new Set<string>();
  const circular: string[] = [];

  function dfs(node: string, path: string[]) {
    if (inStack.has(node)) {
      const cycle = path.slice(path.indexOf(node)).concat(node);
      circular.push(cycle.join(" -> "));
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    inStack.add(node);
    const svc = services.find((s) => s.name === node);
    if (svc) {
      for (const dep of svc.depends_on) {
        dfs(dep, [...path, node]);
      }
    }
    inStack.delete(node);
  }

  for (const svc of services) {
    if (!visited.has(svc.name)) {
      dfs(svc.name, []);
    }
  }

  for (const cycle of circular) {
    errors.push({
      message: `Zirkulaere Abhaengigkeit erkannt: ${cycle}`,
      severity: "error",
    });
  }

  // Check for duplicate names
  const nameCount = new Map<string, number>();
  for (const svc of services) {
    nameCount.set(svc.name, (nameCount.get(svc.name) ?? 0) + 1);
  }
  for (const [name, count] of nameCount) {
    if (count > 1) {
      errors.push({
        message: `Doppelter Service-Name: "${name}". Jeder Service braucht einen eindeutigen Namen.`,
        severity: "error",
        serviceName: name,
      });
    }
  }

  return errors;
}

export default function DockerComposeBuilder() {
  const [services, setServices] = useState<ServiceConfig[]>([]);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [runningStep, setRunningStep] = useState<number>(-1);
  const [running, setRunning] = useState(false);
  const [runSuccess, setRunSuccess] = useState(false);
  const previewRef = useRef<HTMLPreElement>(null);

  // Validate on change
  useEffect(() => {
    setErrors(validateServices(services));
  }, [services]);

  // --- Actions ---
  const addService = useCallback(
    (name: string, template?: Omit<ServiceConfig, "id">) => {
      if (!name.trim()) return;
      if (services.some((s) => s.name === name.trim())) return;
      const svc = template
        ? { ...template, id: nextServiceId() }
        : createEmptyService(name.trim());
      setServices((prev) => [...prev, svc]);
      setNewServiceName("");
      setShowAddForm(false);
      setEditingServiceId(svc.id);
    },
    [services]
  );

  const removeService = useCallback((id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setEditingServiceId((prev) => (prev === id ? null : prev));
  }, []);

  const updateService = useCallback((id: string, updates: Partial<ServiceConfig>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const loadTemplate = useCallback((template: Template) => {
    setServices(template.services.map((s) => ({ ...s, id: nextServiceId() })));
    setShowTemplates(false);
    setEditingServiceId(null);
  }, []);

  const clearAll = useCallback(() => {
    setServices([]);
    setEditingServiceId(null);
  }, []);

  // --- YAML preview ---
  const yamlText = generateYaml(services);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(yamlText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [yamlText]);

  // --- Run simulation ---
  const runSimulation = useCallback(() => {
    if (services.length === 0 || running) return;
    if (errors.some((e) => e.severity === "error")) return;
    setRunning(true);
    setRunStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= services.length) {
        clearInterval(interval);
        setRunSuccess(true);
        setTimeout(() => {
          setRunningStep(-1);
          setRunning(false);
          setRunSuccess(false);
        }, 2000);
      } else {
        setRunningStep(step);
      }
    }, 800);
  }, [services, running, errors]);

  // Helper to set run step
  const setRunStep = (step: number) => setRunningStep(step);

  // --- YAML Syntax Highlighting ---
  const highlightYaml = (text: string) => {
    return text.split("\n").map((line, i) => {
      let content: React.ReactNode = line;

      // Comment
      if (line.trimStart().startsWith("#")) {
        return (
          <div key={i} className="text-slate-600">
            {line}
          </div>
        );
      }

      // Key: value
      const kvMatch = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.*)/);
      if (kvMatch) {
        const [, indent, key, colon, value] = kvMatch;
        const isTopKey = indent.length === 0;
        const isServiceKey = indent.length <= 4 && !line.includes("  - ");

        let valueColor = "text-slate-300";
        if (value.startsWith('"') || value.startsWith("'")) valueColor = "text-emerald-400";
        else if (/^\d+$/.test(value)) valueColor = "text-amber-400";
        else if (value === "true" || value === "false") valueColor = "text-amber-400";

        let keyColor = "text-blue-300";
        if (isTopKey) keyColor = "text-blue-400 font-semibold";

        content = (
          <>
            {indent}
            <span className={keyColor}>{key}</span>
            <span className="text-slate-500">{colon}</span>
            {value && <span className={valueColor}>{value}</span>}
          </>
        );
      }

      // List item
      if (line.trimStart().startsWith("- ")) {
        const match = line.match(/^(\s*)(- )(.*)/);
        if (match) {
          const [, indent, dash, val] = match;
          let valColor = "text-emerald-400";
          if (/^\d+:\d+$/.test(val.replace(/"/g, ""))) valColor = "text-amber-400";
          content = (
            <>
              {indent}
              <span className="text-slate-500">{dash}</span>
              <span className={valColor}>{val}</span>
            </>
          );
        }
      }

      return (
        <div key={i} className="leading-relaxed">
          {content}
        </div>
      );
    });
  };

  // --- Explainer flash ---
  const flashSection = (key: string) => {
    setActiveSection(key);
    setTimeout(() => setActiveSection(null), 2500);
  };

  const editingService = services.find((s) => s.id === editingServiceId);

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 sm:px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-1">
          <Container className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Docker Compose Builder</h3>
        </div>
        <p className="text-slate-400 text-sm">
          Baue interaktiv eine docker-compose.yml zusammen -- fuege Services hinzu, konfiguriere Eigenschaften und sehe das Ergebnis in Echtzeit.
        </p>
      </div>

      {/* Explanation bar */}
      {activeSection && EXPLANATIONS[activeSection] && (
        <div className="bg-blue-900/30 border-b border-blue-800/40 px-4 sm:px-6 py-3 flex items-start gap-3 animate-pulse">
          {(() => {
            const Icon = EXPLANATIONS[activeSection].icon;
            return <Icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />;
          })()}
          <div>
            <div className="text-sm font-semibold text-blue-300">
              {EXPLANATIONS[activeSection].title}
            </div>
            <div className="text-xs text-blue-200/70 leading-relaxed mt-0.5">
              {EXPLANATIONS[activeSection].text}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* ---- LEFT: Service List & Templates ---- */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-700 p-4 sm:p-5 overflow-y-auto max-h-[42rem]">
          {/* Section explainer links */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <BookOpen className="w-4 h-4" />
              Abschnitte erklaeren
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(EXPLANATIONS).map(([key, exp]) => (
                <button
                  key={key}
                  onClick={() => flashSection(key)}
                  className="text-[10px] px-2 py-1 rounded-full border border-gray-700 text-slate-400 hover:text-blue-300 hover:border-blue-700 transition-colors"
                >
                  {exp.title}
                </button>
              ))}
            </div>
          </div>

          {/* Add service */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Server className="w-4 h-4" />
              Services
              <span className="text-xs text-slate-600 ml-1">({services.length})</span>
            </h4>

            {showAddForm ? (
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addService(newServiceName);
                    if (e.key === "Escape") { setShowAddForm(false); setNewServiceName(""); }
                  }}
                  placeholder="service-name"
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => addService(newServiceName)}
                  disabled={!newServiceName.trim()}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
                >
                  OK
                </button>
                <button
                  onClick={() => { setShowAddForm(false); setNewServiceName(""); }}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-600 text-slate-400 hover:text-blue-300 hover:border-blue-600 transition-colors text-sm mb-2"
              >
                <Plus className="w-4 h-4" />
                Service hinzufuegen
              </button>
            )}

            {/* Service list */}
            <div className="space-y-1.5">
              {services.map((svc) => {
                const hasErrors = errors.some((e) => e.serviceName === svc.name && e.severity === "error");
                const isActive = editingServiceId === svc.id;
                return (
                  <div
                    key={svc.id}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? "bg-blue-900/20 border-blue-600/50"
                        : "border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
                    }`}
                    onClick={() => setEditingServiceId(isActive ? null : svc.id)}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${hasErrors ? "bg-red-500" : "bg-green-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-mono font-semibold text-white truncate">{svc.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {svc.image || "kein Image"}
                        {svc.ports.length > 0 && ` | :${svc.ports[0].split(":")[0]}`}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingServiceId(svc.id); }}
                        className="text-slate-600 hover:text-blue-400 transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeService(svc.id); }}
                        className="text-slate-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Templates */}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors w-full"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Vorlagen
              {showTemplates ? <ChevronUp className="w-3 h-3 ml-auto" /> : <ChevronDown className="w-3 h-3 ml-auto" />}
            </button>
            {showTemplates && (
              <div className="mt-2 space-y-1.5">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => loadTemplate(t)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{t.icon}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{t.name}</div>
                        <div className="text-[10px] text-slate-500">{t.description}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">
                          {t.services.length} Services
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---- RIGHT: Editor + YAML Preview (wrapped in one column) ---- */}
        <div className="flex flex-col min-h-0">
          <div className="p-4 sm:p-5 flex flex-col min-h-0 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                <Settings className="w-4 h-4" />
                Service-Eigenschaften
              </h4>
              {services.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Zuruecksetzen
                </button>
              )}
            </div>

            {!editingService ? (
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="text-center">
                  <Layers className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">
                    Waehle links einen Service zum Bearbeiten aus<br />
                    oder fuege einen neuen hinzu.
                  </p>
                  <p className="text-slate-600 text-xs mt-2">
                    Oder lade eine Vorlage.
                  </p>
                </div>
              </div>
            ) : (
              <ServiceEditor
                service={editingService}
                allServiceNames={services.map((s) => s.name)}
                onUpdate={(updates) => updateService(editingService.id, updates)}
              />
            )}

            {/* Validation messages */}
            {errors.length > 0 && (
              <div className="mt-3 space-y-1">
                {errors.map((err, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 px-3 py-2 rounded-lg text-xs ${
                      err.severity === "error"
                        ? "bg-red-900/30 border border-red-800/50 text-red-300"
                        : "bg-yellow-900/20 border border-yellow-800/40 text-yellow-300"
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{err.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ---- YAML Preview ---- */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-col min-h-0 border-t border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                <FileCode className="w-4 h-4" />
                docker-compose.yml
              </h4>
              <div className="flex items-center gap-2">
                {services.length > 0 && !running && errors.filter((e) => e.severity === "error").length === 0 && (
                  <button
                    onClick={runSimulation}
                    className="text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    Start simulieren
                  </button>
                )}
                {running && (
                  <span className="text-xs text-green-400 animate-pulse flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Starte... ({runningStep + 1}/{services.length})
                  </span>
                )}
                {services.length > 0 && (
                  <button
                    onClick={handleCopy}
                    className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        Kopiert!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Kopieren
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-gray-950 border border-gray-700 overflow-hidden flex flex-col">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border-b border-gray-700">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono ml-1">docker-compose.yml</span>
              </div>

              <pre
                ref={previewRef}
                className="p-3 text-xs font-mono overflow-auto min-h-[6rem] max-h-56"
              >
                {services.length === 0 ? (
                  <span className="text-slate-600 italic"># Deine docker-compose.yml erscheint hier...</span>
                ) : (
                  highlightYaml(yamlText)
                )}
              </pre>
            </div>

            {/* Run success */}
            {runSuccess && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-green-900/30 border border-green-800/50 text-green-300 animate-pulse">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold">
                  docker compose up erfolgreich! Alle {services.length} Services laufen.
                </span>
              </div>
            )}

            {/* Best Practices */}
            <div className="mt-4 bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-semibold text-slate-300">Best Practices</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                  <span>
                    <strong className="text-slate-300">Named Volumes</strong> fuer Datenbanken nutzen -- Daten bleiben bei Container-Neustart erhalten.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                  <span>
                    <strong className="text-slate-300">depends_on</strong> nur fuer Startreihenfolge -- fuer echte Readiness braucht man Healthchecks.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                  <span>
                    <strong className="text-slate-300">Umgebungsvariablen</strong> besser in <code className="text-blue-300">.env</code>-Datei auslagern, niemals Passwoerter hartcodieren.
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                  <span>
                    <strong className="text-slate-300">Eigene Netzwerke</strong> definieren isolieren Services und verbessern die Sicherheit.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="bg-gray-800/60 border-t border-gray-700 px-4 sm:px-6 py-3">
        <p className="text-xs text-slate-500 text-center">
          <Sparkles className="w-3 h-3 inline mr-1 text-yellow-500" />
          Tipp: Starte mit <code className="text-blue-300">docker compose up -d</code> im Hintergrund. Mit <code className="text-blue-300">docker compose down</code> stoppst du alle Services. Fuege <code className="text-blue-300">-v</code> hinzu, um auch die Volumes zu loeschen.
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Service Editor — Unterkomponente zum Bearbeiten eines einzelnen Services
// ============================================================================

interface ServiceEditorProps {
  service: ServiceConfig;
  allServiceNames: string[];
  onUpdate: (updates: Partial<ServiceConfig>) => void;
}

function ServiceEditor({ service, allServiceNames, onUpdate }: ServiceEditorProps) {
  const [portInput, setPortInput] = useState("");
  const [volumeInput, setVolumeInput] = useState("");
  const [envKey, setEnvKey] = useState("");
  const [envValue, setEnvValue] = useState("");
  const [networkInput, setNetworkInput] = useState("");

  const addPort = () => {
    if (!portInput.trim()) return;
    onUpdate({ ports: [...service.ports, portInput.trim()] });
    setPortInput("");
  };

  const removePort = (idx: number) => {
    onUpdate({ ports: service.ports.filter((_, i) => i !== idx) });
  };

  const addVolume = () => {
    if (!volumeInput.trim()) return;
    onUpdate({ volumes: [...service.volumes, volumeInput.trim()] });
    setVolumeInput("");
  };

  const removeVolume = (idx: number) => {
    onUpdate({ volumes: service.volumes.filter((_, i) => i !== idx) });
  };

  const addEnv = () => {
    if (!envKey.trim()) return;
    onUpdate({ environment: { ...service.environment, [envKey.trim()]: envValue } });
    setEnvKey("");
    setEnvValue("");
  };

  const removeEnv = (key: string) => {
    const next = { ...service.environment };
    delete next[key];
    onUpdate({ environment: next });
  };

  const toggleDependsOn = (name: string) => {
    if (name === service.name) return;
    const has = service.depends_on.includes(name);
    onUpdate({
      depends_on: has
        ? service.depends_on.filter((d) => d !== name)
        : [...service.depends_on, name],
    });
  };

  const addNetwork = () => {
    if (!networkInput.trim()) return;
    if (service.networks.includes(networkInput.trim())) return;
    onUpdate({ networks: [...service.networks, networkInput.trim()] });
    setNetworkInput("");
  };

  const removeNetwork = (idx: number) => {
    onUpdate({ networks: service.networks.filter((_, i) => i !== idx) });
  };

  const otherServices = allServiceNames.filter((n) => n !== service.name);

  return (
    <div className="space-y-4">
      {/* Image */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Image *
        </label>
        <input
          type="text"
          value={service.image}
          onChange={(e) => onUpdate({ image: e.target.value })}
          placeholder="z.B. nginx:alpine"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Command */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Command (optional)
        </label>
        <input
          type="text"
          value={service.command}
          onChange={(e) => onUpdate({ command: e.target.value })}
          placeholder="z.B. npm start"
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Restart */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Restart-Policy
        </label>
        <select
          value={service.restart}
          onChange={(e) => onUpdate({ restart: e.target.value })}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
        >
          {RESTART_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt || "(nicht gesetzt)"}
            </option>
          ))}
        </select>
      </div>

      {/* Ports */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Ports (HOST:CONTAINER)
        </label>
        <div className="flex items-center gap-2 mb-1">
          <input
            type="text"
            value={portInput}
            onChange={(e) => setPortInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addPort(); }}
            placeholder="8080:80"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addPort}
            disabled={!portInput.trim()}
            className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 text-white rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {service.ports.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs font-mono text-amber-300">
              {p}
              <button onClick={() => removePort(i)} className="text-slate-500 hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Volumes */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Volumes
        </label>
        <div className="flex items-center gap-2 mb-1">
          <input
            type="text"
            value={volumeInput}
            onChange={(e) => setVolumeInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addVolume(); }}
            placeholder="./data:/app/data"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addVolume}
            disabled={!volumeInput.trim()}
            className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 text-white rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {service.volumes.map((v, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs font-mono text-emerald-300">
              {v}
              <button onClick={() => removeVolume(i)} className="text-slate-500 hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Environment */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Umgebungsvariablen
        </label>
        <div className="flex items-center gap-2 mb-1">
          <input
            type="text"
            value={envKey}
            onChange={(e) => setEnvKey(e.target.value.replace(/[^a-zA-Z0-9_]/g, ""))}
            onKeyDown={(e) => { if (e.key === "Enter") addEnv(); }}
            placeholder="KEY"
            className="w-2/5 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <span className="text-slate-600">=</span>
          <input
            type="text"
            value={envValue}
            onChange={(e) => setEnvValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") addEnv(); }}
            placeholder="value"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addEnv}
            disabled={!envKey.trim()}
            className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 text-white rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-1">
          {Object.entries(service.environment).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs font-mono">
              <span className="text-blue-300">{k}</span>
              <span className="text-slate-500">=</span>
              <span className="text-emerald-300 truncate">{v}</span>
              <button onClick={() => removeEnv(k)} className="ml-auto text-slate-500 hover:text-red-400 flex-shrink-0">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* depends_on */}
      {otherServices.length > 0 && (
        <div>
          <label className="text-xs font-semibold text-slate-400 mb-1 block">
            Abhaengigkeiten (depends_on)
          </label>
          <div className="space-y-1">
            {otherServices.map((name) => (
              <label
                key={name}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${
                  service.depends_on.includes(name)
                    ? "border-blue-600/50 bg-blue-900/20 text-blue-200"
                    : "border-gray-700 text-slate-400 hover:border-gray-600"
                }`}
              >
                <input
                  type="checkbox"
                  checked={service.depends_on.includes(name)}
                  onChange={() => toggleDependsOn(name)}
                  className="rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="text-sm font-mono">{name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Networks */}
      <div>
        <label className="text-xs font-semibold text-slate-400 mb-1 block">
          Netzwerke (optional)
        </label>
        <div className="flex items-center gap-2 mb-1">
          <input
            type="text"
            value={networkInput}
            onChange={(e) => setNetworkInput(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))}
            onKeyDown={(e) => { if (e.key === "Enter") addNetwork(); }}
            placeholder="my-network"
            className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={addNetwork}
            disabled={!networkInput.trim()}
            className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 disabled:opacity-30 text-white rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {service.networks.map((n, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs font-mono text-purple-300">
              <Network className="w-3 h-3" />
              {n}
              <button onClick={() => removeNetwork(i)} className="text-slate-500 hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
