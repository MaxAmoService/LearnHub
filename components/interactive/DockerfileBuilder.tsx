"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Container,
  Play,
  FileCode,
  Plus,
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
  Terminal,
  BookOpen,
  Sparkles,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// ============================================================================
// Dockerfile Builder — Interaktiver Dockerfile-Editor für IHK-Lernende
// ============================================================================

interface DockerInstruction {
  keyword: string;
  syntax: string;
  description: string;
  example: string;
  color: string;
  category: "base" | "setup" | "files" | "network" | "execution" | "meta";
}

interface DockerfileLine {
  id: string;
  instruction: DockerInstruction;
  value: string;
}

interface Template {
  name: string;
  icon: string;
  description: string;
  lines: { keyword: string; value: string }[];
}

interface ValidationError {
  line: number;
  message: string;
  severity: "error" | "warning";
}

const INSTRUCTIONS: DockerInstruction[] = [
  {
    keyword: "FROM",
    syntax: "FROM <image>[:<tag>] [AS <name>]",
    description: "Definiert das Basis-Image. Muss die ERSTE Anweisung sein.",
    example: "FROM python:3.11-slim",
    color: "#3B82F6",
    category: "base",
  },
  {
    keyword: "WORKDIR",
    syntax: "WORKDIR <path>",
    description: "Setzt das Arbeitsverzeichnis für nachfolgende Anweisungen.",
    example: "WORKDIR /app",
    color: "#8B5CF6",
    category: "setup",
  },
  {
    keyword: "COPY",
    syntax: "COPY [--chown=<user>:<group>] <src> <dest>",
    description: "Kopiert Dateien vom Host in den Container.",
    example: "COPY requirements.txt .",
    color: "#10B981",
    category: "files",
  },
  {
    keyword: "ADD",
    syntax: "ADD [--chown=<user>:<group>] <src> <dest>",
    description: "Wie COPY, aber kann auch URLs und Archive entpacken.",
    example: "ADD https://example.com/file.tar.gz /tmp/",
    color: "#10B981",
    category: "files",
  },
  {
    keyword: "RUN",
    syntax: "RUN <command>",
    description: "Führt einen Befehl während des Image-Baus aus.",
    example: "RUN pip install -r requirements.txt",
    color: "#F59E0B",
    category: "execution",
  },
  {
    keyword: "ENV",
    syntax: "ENV <key>=<value>",
    description: "Setzt Umgebungsvariablen im Container.",
    example: "ENV FLASK_APP=app.py",
    color: "#EC4899",
    category: "meta",
  },
  {
    keyword: "EXPOSE",
    syntax: "EXPOSE <port>[/<protocol>]",
    description: "Dokumentiert den Port, den der Container nutzt.",
    example: "EXPOSE 5000",
    color: "#06B6D4",
    category: "network",
  },
  {
    keyword: "CMD",
    syntax: 'CMD ["executable","param1"]',
    description: "Standard-Befehl beim Start des Containers. Kann überschrieben werden.",
    example: 'CMD ["python", "app.py"]',
    color: "#EF4444",
    category: "execution",
  },
  {
    keyword: "ENTRYPOINT",
    syntax: 'ENTRYPOINT ["executable"]',
    description: "Wie CMD, aber nicht einfach überschreibbar. Ideal für Hauptprogramm.",
    example: 'ENTRYPOINT ["python", "app.py"]',
    color: "#EF4444",
    category: "execution",
  },
];

const TEMPLATES: Template[] = [
  {
    name: "Python Flask",
    icon: "🐍",
    description: "Web-App mit Python und Flask",
    lines: [
      { keyword: "FROM", value: "python:3.11-slim" },
      { keyword: "WORKDIR", value: "/app" },
      { keyword: "COPY", value: "requirements.txt ." },
      { keyword: "RUN", value: "pip install --no-cache-dir -r requirements.txt" },
      { keyword: "COPY", value: ". ." },
      { keyword: "ENV", value: "FLASK_APP=app.py" },
      { keyword: "EXPOSE", value: "5000" },
      { keyword: "CMD", value: '["flask", "run", "--host=0.0.0.0"]' },
    ],
  },
  {
    name: "Node.js",
    icon: "🟢",
    description: "Web-Server mit Node.js und Express",
    lines: [
      { keyword: "FROM", value: "node:20-alpine" },
      { keyword: "WORKDIR", value: "/app" },
      { keyword: "COPY", value: "package*.json ." },
      { keyword: "RUN", value: "npm ci --only=production" },
      { keyword: "COPY", value: ". ." },
      { keyword: "ENV", value: "NODE_ENV=production" },
      { keyword: "EXPOSE", value: "3000" },
      { keyword: "CMD", value: '["node", "server.js"]' },
    ],
  },
  {
    name: "Nginx",
    icon: "🌐",
    description: "Statische Website mit Nginx",
    lines: [
      { keyword: "FROM", value: "nginx:alpine" },
      { keyword: "WORKDIR", value: "/usr/share/nginx/html" },
      { keyword: "COPY", value: "index.html ." },
      { keyword: "COPY", value: "styles.css ." },
      { keyword: "EXPOSE", value: "80" },
      { keyword: "CMD", value: '["nginx", "-g", "daemon off;"]' },
    ],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  base: "Basis-Images",
  setup: "Umgebung",
  files: "Dateien",
  network: "Netzwerk",
  execution: "Ausführung",
  meta: "Konfiguration",
};

let lineIdCounter = 0;
function nextLineId(): string {
  return `line-${++lineIdCounter}`;
}

export default function DockerfileBuilder() {
  const [lines, setLines] = useState<DockerfileLine[]>([]);
  const [activeInstruction, setActiveInstruction] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [expandedInstructions, setExpandedInstructions] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [buildStep, setBuildStep] = useState<number>(-1);
  const [building, setBuilding] = useState(false);
  const [buildSuccess, setBuildSuccess] = useState(false);
  const previewRef = useRef<HTMLPreElement>(null);

  // --- Validation ---
  const validate = useCallback((currentLines: DockerfileLine[]) => {
    const errs: ValidationError[] = [];

    if (currentLines.length === 0) {
      setErrors([]);
      return;
    }

    const hasFrom = currentLines.some((l) => l.instruction.keyword === "FROM");
    const firstKeyword = currentLines[0]?.instruction.keyword;

    if (!hasFrom) {
      errs.push({ line: 0, message: "Fehlt: FROM ist Pflicht in jedem Dockerfile!", severity: "error" });
    }

    if (firstKeyword !== "FROM") {
      errs.push({
        line: 0,
        message: `Erste Anweisung muss FROM sein (aktuell: ${firstKeyword}).`,
        severity: "error",
      });
    }

    currentLines.forEach((l, idx) => {
      if ((l.instruction.keyword === "CMD" || l.instruction.keyword === "ENTRYPOINT") && !l.value.trim()) {
        errs.push({ line: idx, message: `${l.instruction.keyword} braucht einen Wert.`, severity: "warning" });
      }
      if (l.instruction.keyword === "EXPOSE" && !/^\d+/.test(l.value.trim())) {
        errs.push({ line: idx, message: "EXPOSE erwartet eine Portnummer (z.B. 8080).", severity: "warning" });
      }
    });

    const cmdCount = currentLines.filter((l) => l.instruction.keyword === "CMD").length;
    if (cmdCount > 1) {
      errs.push({
        line: currentLines.length - 1,
        message: "Mehrere CMD — nur das letzte wird ausgeführt. Besser nur eines verwenden.",
        severity: "warning",
      });
    }

    setErrors(errs);
  }, []);

  useEffect(() => {
    validate(lines);
  }, [lines, validate]);

  // --- Actions ---
  const addLine = useCallback(
    (instruction: DockerInstruction, value?: string) => {
      setLines((prev) => [
        ...prev,
        {
          id: nextLineId(),
          instruction,
          value: value ?? instruction.example.split(" ").slice(1).join(" "),
        },
      ]);
    },
    []
  );

  const removeLine = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const updateLineValue = useCallback((id: string, value: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, value } : l)));
  }, []);

  const moveLine = useCallback((idx: number, direction: -1 | 1) => {
    setLines((prev) => {
      const next = [...prev];
      const target = idx + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setLines([]);
    setActiveInstruction(null);
  }, []);

  const loadTemplate = useCallback((template: Template) => {
    setLines(
      template.lines.map((l) => {
        const inst = INSTRUCTIONS.find((i) => i.keyword === l.keyword) ?? INSTRUCTIONS[0];
        return { id: nextLineId(), instruction: inst, value: l.value };
      })
    );
    setShowTemplates(false);
  }, []);

  // --- Copy ---
  const dockerfileText = lines.map((l) => `${l.instruction.keyword} ${l.value}`).join("\n");

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(dockerfileText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [dockerfileText]);

  // --- Drag & Drop ---
  const handleDragStart = useCallback((idx: number) => {
    setDraggedIdx(idx);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      if (draggedIdx !== null && draggedIdx !== idx) {
        setDragOverIdx(idx);
      }
    },
    [draggedIdx]
  );

  const handleDrop = useCallback(
    (idx: number) => {
      if (draggedIdx === null || draggedIdx === idx) {
        setDraggedIdx(null);
        setDragOverIdx(null);
        return;
      }
      setLines((prev) => {
        const next = [...prev];
        const [moved] = next.splice(draggedIdx, 1);
        next.splice(idx, 0, moved);
        return next;
      });
      setDraggedIdx(null);
      setDragOverIdx(null);
    },
    [draggedIdx]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  }, []);

  // --- Build Simulation ---
  const runBuild = useCallback(() => {
    if (lines.length === 0 || building) return;
    if (errors.some((e) => e.severity === "error")) return;
    setBuilding(true);
    setBuildStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= lines.length) {
        clearInterval(interval);
        setBuildSuccess(true);
        setTimeout(() => {
          setBuildStep(-1);
          setBuilding(false);
          setBuildSuccess(false);
        }, 1500);
      } else {
        setBuildStep(step);
      }
    }, 600);
  }, [lines, building, errors]);

  // --- Group instructions by category ---
  const grouped = INSTRUCTIONS.reduce<Record<string, DockerInstruction[]>>((acc, inst) => {
    (acc[inst.category] ??= []).push(inst);
    return acc;
  }, {});

  const toggleInstruction = (kw: string) => {
    setExpandedInstructions((prev) => {
      const next = new Set(prev);
      if (next.has(kw)) next.delete(kw);
      else next.add(kw);
      return next;
    });
  };

  // --- Highlight a keyword in the Dockerfile preview ---
  const highlightLine = (keyword: string, value: string) => {
    const inst = INSTRUCTIONS.find((i) => i.keyword === keyword);
    const color = inst?.color ?? "#94a3b8";
    return (
      <>
        <span style={{ color, fontWeight: 700 }}>{keyword}</span>{" "}
        <span className="text-slate-200">{value}</span>
      </>
    );
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 sm:px-6 py-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-1">
          <Container className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Dockerfile Builder</h3>
        </div>
        <p className="text-slate-400 text-sm">
          Baue interaktiv eine Dockerfile zusammen — klicke Anweisungen, setze Werte und sehe das Ergebnis in Echtzeit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0">
        {/* ---- LEFT: Instruction Palette ---- */}
        <div className="border-b lg:border-b-0 lg:border-r border-gray-700 p-4 sm:p-5 max-h-[32rem] overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Anweisungen
            </h4>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showInfo ? "Weniger" : "Details"}
            </button>
          </div>

          {Object.entries(grouped).map(([cat, insts]) => (
            <div key={cat} className="mb-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                {CATEGORY_LABELS[cat] ?? cat}
              </div>
              <div className="space-y-1">
                {insts.map((inst) => {
                  const expanded = expandedInstructions.has(inst.keyword);
                  return (
                    <div
                      key={inst.keyword}
                      className="rounded-lg transition-all"
                      style={{ borderLeft: `3px solid ${inst.color}` }}
                    >
                      <button
                        onClick={() => {
                          addLine(inst);
                          setActiveInstruction(inst.keyword);
                          setTimeout(() => setActiveInstruction(null), 600);
                        }}
                        onMouseDown={() => toggleInstruction(inst.keyword)}
                        className={`w-full text-left px-3 py-2 rounded-r-lg transition-all duration-200 group ${
                          activeInstruction === inst.keyword
                            ? "bg-blue-600/20 ring-1 ring-blue-500/40"
                            : "hover:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                            <span className="font-mono font-bold text-sm" style={{ color: inst.color }}>
                              {inst.keyword}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors hidden sm:inline">
                              klicken = hinzufuegen
                            </span>
                            <ChevronDown
                              className={`w-3 h-3 text-slate-600 transition-transform ${
                                expanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </div>
                        {expanded && (
                          <div className="mt-1.5 pl-5.5 text-xs text-slate-400 leading-relaxed">
                            {inst.description}
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

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
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---- CENTER: Builder Area ---- */}
        <div className="p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-gray-700 min-h-[20rem] flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Deine Dockerfile
              <span className="text-xs text-slate-600 ml-1">({lines.length} Zeilen)</span>
            </h4>
            <div className="flex items-center gap-2">
              {lines.length > 0 && !building && errors.filter((e) => e.severity === "error").length === 0 && (
                <button
                  onClick={runBuild}
                  className="text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3" />
                  Build simulieren
                </button>
              )}
              {building && (
                <span className="text-xs text-green-400 animate-pulse flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Baue... ({buildStep + 1}/{lines.length})
                </span>
              )}
              {lines.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Zuruecksetzen
                </button>
              )}
            </div>
          </div>

          {lines.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Terminal className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">
                  Klicke links auf eine Anweisung,<br />
                  um deine Dockerfile zu bauen.
                </p>
                <p className="text-slate-600 text-xs mt-2">
                  Oder waehle eine Vorlage.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-1 overflow-y-auto max-h-80">
              {lines.map((line, idx) => {
                const lineErrors = errors.filter((e) => e.line === idx);
                const isDragOver = dragOverIdx === idx;
                const isDragging = draggedIdx === idx;
                return (
                  <div
                    key={line.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={() => handleDrop(idx)}
                    onDragEnd={handleDragEnd}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all duration-150 ${
                      building && buildStep === idx
                        ? "border-green-500/60 bg-green-900/20"
                        : building && buildStep > idx
                        ? "border-green-800/30 opacity-60"
                        : isDragging
                        ? "opacity-40 border-blue-500/40 bg-blue-900/20"
                        : isDragOver
                        ? "border-blue-500 bg-blue-900/30"
                        : "border-transparent hover:border-gray-700 hover:bg-gray-800/50"
                    }`}
                  >
                    {/* Drag handle */}
                    <GripVertical className="w-3.5 h-3.5 text-slate-600 cursor-grab flex-shrink-0" />

                    {/* Line number */}
                    <span className="text-[10px] text-slate-600 w-4 text-right flex-shrink-0 tabular-nums">
                      {idx + 1}
                    </span>

                    {/* Keyword badge */}
                    <span
                      className="font-mono font-bold text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        color: line.instruction.color,
                        backgroundColor: `${line.instruction.color}18`,
                      }}
                    >
                      {line.instruction.keyword}
                    </span>

                    {/* Value input */}
                    <input
                      type="text"
                      value={line.value}
                      onChange={(e) => updateLineValue(line.id, e.target.value)}
                      className="flex-1 min-w-0 bg-transparent text-sm text-slate-200 font-mono px-1 py-0.5 rounded focus:outline-none focus:bg-gray-800 focus:ring-1 focus:ring-gray-600"
                      placeholder="Wert eingeben..."
                    />

                    {/* Move buttons */}
                    <div className="flex flex-col -space-y-0.5 flex-shrink-0">
                      <button
                        onClick={() => moveLine(idx, -1)}
                        disabled={idx === 0}
                        className="text-slate-600 hover:text-slate-300 disabled:opacity-20 transition-colors"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => moveLine(idx, 1)}
                        disabled={idx === lines.length - 1}
                        className="text-slate-600 hover:text-slate-300 disabled:opacity-20 transition-colors"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeLine(line.id)}
                      className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Build success */}
          {buildSuccess && (
            <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-green-900/30 border border-green-800/50 text-green-300 animate-pulse">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span className="font-semibold">Build erfolgreich! Image wurde erstellt.</span>
            </div>
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
                  {err.severity === "error" ? (
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{err.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---- RIGHT: Preview ---- */}
        <div className="p-4 sm:p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-1.5">
              <FileCode className="w-4 h-4" />
              Vorschau
            </h4>
            {lines.length > 0 && (
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

          <div className="flex-1 rounded-lg bg-gray-950 border border-gray-700 overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border-b border-gray-700">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono ml-1">Dockerfile</span>
            </div>

            <pre
              ref={previewRef}
              className="p-3 text-xs font-mono leading-relaxed overflow-auto max-h-72 min-h-[8rem]"
            >
              {lines.length === 0 ? (
                <span className="text-slate-600 italic"># Deine Dockerfile erscheint hier...</span>
              ) : (
                lines.map((line, idx) => (
                  <div
                    key={line.id}
                    className={`flex transition-all duration-300 ${
                      buildStep >= 0 && idx <= buildStep
                        ? buildStep === idx
                          ? "bg-green-900/20 -mx-3 px-3 rounded"
                          : "opacity-70"
                        : buildStep >= 0
                        ? "opacity-30"
                        : ""
                    }`}
                  >
                    <span className="text-slate-700 w-5 text-right mr-3 select-none flex-shrink-0 tabular-nums">
                      {idx + 1}
                    </span>
                    <span>
                      {highlightLine(line.instruction.keyword, line.value)}
                    </span>
                    {buildStep >= 0 && idx <= buildStep && (
                      <span className="ml-auto text-green-500 text-[10px] flex-shrink-0">
                        {idx === buildStep ? (idx === lines.length - 1 ? "DONE" : "BUILD") : "OK"}
                      </span>
                    )}
                  </div>
                ))
              )}
            </pre>
          </div>

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
                  <strong className="text-slate-300">FROM</strong> immer als Erstes — definiert das Basis-Image.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-400 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </span>
                <span>
                  <strong className="text-slate-300">COPY</strong> vor{" "}
                  <strong className="text-slate-300">RUN</strong> fuer besseres Caching der Layers.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-400 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </span>
                <span>
                  <strong className="text-slate-300">CMD</strong> vs.{" "}
                  <strong className="text-slate-300">ENTRYPOINT</strong>: CMD ist ueberschreibbar,
                  ENTRYPOINT nicht.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-green-400 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3" />
                </span>
                <span>
                  <strong className="text-slate-300">EXPOSE</strong> ist nur Dokumentation — oeffnet
                  den Port nicht automatisch.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Tip */}
      <div className="bg-gray-800/60 border-t border-gray-700 px-4 sm:px-6 py-3">
        <p className="text-xs text-slate-500 text-center">
          <Sparkles className="w-3 h-3 inline mr-1 text-yellow-500" />
          Tipp: Ziehe Zeilen per Drag & Drop, um die Reihenfolge zu aendern. Jede Anweisung erzeugt einen neuen Layer im Image.
        </p>
      </div>
    </div>
  );
}
