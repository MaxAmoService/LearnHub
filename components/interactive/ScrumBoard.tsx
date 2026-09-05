"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  ChevronRight,
  MessageSquare,
  Target,
  Users,
  ArrowRight,
  GripVertical,
  X,
  ListTodo,
  Timer,
  Lightbulb,
  AlertTriangle,
} from "lucide-react";

// --- Types ---

type ColumnId = "backlog" | "todo" | "inprogress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnId;
  createdAt: number;
}

interface Column {
  id: ColumnId;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  icon: React.ReactNode;
}

interface StandupEntry {
  id: string;
  yesterday: string;
  today: string;
  blockers: string;
}

interface RetroItem {
  id: string;
  type: "good" | "improve";
  text: string;
}

// --- Constants ---

const COLUMNS: Column[] = [
  {
    id: "backlog",
    label: "Backlog",
    color: "text-gray-400",
    borderColor: "border-gray-600",
    bgColor: "bg-gray-800",
    icon: <ClipboardList size={18} />,
  },
  {
    id: "todo",
    label: "To Do",
    color: "text-blue-400",
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-900/20",
    icon: <ListTodo size={18} />,
  },
  {
    id: "inprogress",
    label: "In Progress",
    color: "text-amber-400",
    borderColor: "border-amber-500/50",
    bgColor: "bg-amber-900/20",
    icon: <Clock size={18} />,
  },
  {
    id: "review",
    label: "Review",
    color: "text-purple-400",
    borderColor: "border-purple-500/50",
    bgColor: "bg-purple-900/20",
    icon: <Target size={18} />,
  },
  {
    id: "done",
    label: "Done",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    bgColor: "bg-emerald-900/20",
    icon: <CheckCircle size={18} />,
  },
];

const SPRINT_DURATION_MS = 14 * 24 * 60 * 60 * 1000; // 2 weeks

const SAMPLE_TASKS: Task[] = [
  {
    id: "t1",
    title: "Login-Page implementieren",
    description: "Registrierung und Login mit Firebase Auth",
    column: "backlog",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: "t2",
    title: "REST-API Endpunkte",
    description: "CRUD-Operationen fuer die Nutzerverwaltung",
    column: "backlog",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: "t3",
    title: "Datenbank-Schema entwerfen",
    description: "ER-Modell in relationales Schema umwandeln",
    column: "todo",
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: "t4",
    title: "Unit Tests schreiben",
    description: "Testabdeckung fuer Kernfunktionen auf 80% erhoehen",
    column: "inprogress",
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: "t5",
    title: "Code Review: Dashboard",
    description: "PR #42 reviewen und Feedback geben",
    column: "review",
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: "t6",
    title: "CI/CD Pipeline einrichten",
    description: "GitHub Actions fuer automatische Deployments",
    column: "done",
    createdAt: Date.now() - 86400000 * 7,
  },
];

const STANDUP_QUESTIONS = [
  {
    question: "Was hast du gestern gemacht?",
    placeholder: "z.B. Login-Page UI fertiggestellt...",
    key: "yesterday" as const,
    icon: <Clock size={16} className="text-blue-400" />,
  },
  {
    question: "Was planst du heute?",
    placeholder: "z.B. API-Endpunkte implementieren...",
    key: "today" as const,
    icon: <Target size={16} className="text-amber-400" />,
  },
  {
    question: "Gibt es Blockaden?",
    placeholder: "z.B. Zugang zum Server fehlt...",
    key: "blockers" as const,
    icon: <AlertTriangle size={16} className="text-red-400" />,
  },
];

// --- Helpers ---

let idCounter = 100;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}${idCounter}`;
}

function formatTime(ms: number): string {
  if (ms <= 0) return "Sprint beendet!";
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${days}T ${hours}h ${minutes}m ${seconds}s`;
}

function columnForId(id: ColumnId): Column {
  return COLUMNS.find((c) => c.id === id)!;
}

// --- Sub-components ---

function TaskCard({
  task,
  onMove,
  onDelete,
}: {
  task: Task;
  onMove: (id: string, to: ColumnId) => void;
  onDelete: (id: string) => void;
}) {
  const col = columnForId(task.column);
  const nextColIdx = COLUMNS.findIndex((c) => c.id === task.column) + 1;
  const canMoveForward = nextColIdx < COLUMNS.length;
  const prevColIdx = COLUMNS.findIndex((c) => c.id === task.column) - 1;
  const canMoveBack = prevColIdx >= 0;

  return (
    <div
      className={`group relative rounded-lg border ${col.borderColor} ${col.bgColor} p-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{task.title}</p>
          {task.description && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="shrink-0 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
          title="Aufgabe loeschen"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="flex items-center gap-1 mt-3">
        {canMoveBack && (
          <button
            onClick={() => onMove(task.id, COLUMNS[prevColIdx].id)}
            className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-white transition-colors"
            title={`Zurueck zu ${COLUMNS[prevColIdx].label}`}
          >
            &larr; {COLUMNS[prevColIdx].label}
          </button>
        )}
        {canMoveForward && (
          <button
            onClick={() => onMove(task.id, COLUMNS[nextColIdx].id)}
            className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors ml-auto flex items-center gap-1"
            title={`Weiter zu ${COLUMNS[nextColIdx].label}`}
          >
            {COLUMNS[nextColIdx].label} <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

function SprintTimer({
  sprintEnd,
  isRunning,
  onStart,
  onPause,
  onReset,
}: {
  sprintEnd: number | null;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!isRunning || !sprintEnd) return;
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [isRunning, sprintEnd]);

  const remaining = sprintEnd ? Math.max(0, sprintEnd - now) : 0;
  const total = SPRINT_DURATION_MS;
  const progressPct = sprintEnd ? Math.min(100, ((total - remaining) / total) * 100) : 0;
  const isFinished = sprintEnd !== null && remaining <= 0;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Timer size={20} className="text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Sprint Timer</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full ml-auto">
          2-Wochen-Sprint
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden mb-3">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${
            isFinished
              ? "bg-emerald-500"
              : progressPct > 80
              ? "bg-red-500"
              : progressPct > 50
              ? "bg-amber-500"
              : "bg-cyan-500"
          }`}
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="text-center mb-4">
        <p className="text-3xl font-mono font-bold text-white">
          {sprintEnd ? formatTime(remaining) : "-- -- --"}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {isFinished
            ? "Sprint abgeschlossen! Zeit fuer Review & Retro."
            : isRunning
            ? "Sprint laeuft..."
            : sprintEnd
            ? "Sprint pausiert"
            : "Sprint starten"}
        </p>
      </div>

      <div className="flex gap-2 justify-center">
        {!isRunning && !isFinished && (
          <button
            onClick={onStart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors"
          >
            <Play size={14} /> {sprintEnd ? "Fortsetzen" : "Sprint starten"}
          </button>
        )}
        {isRunning && (
          <button
            onClick={onPause}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium transition-colors"
          >
            <Pause size={14} /> Pausieren
          </button>
        )}
        {sprintEnd && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium transition-colors"
          >
            <RotateCcw size={14} /> Zuruecksetzen
          </button>
        )}
      </div>
    </div>
  );
}

function DailyStandup() {
  const [entries, setEntries] = useState<StandupEntry[]>([]);
  const [current, setCurrent] = useState<StandupEntry>({
    id: "",
    yesterday: "",
    today: "",
    blockers: "",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const updateField = (key: keyof Omit<StandupEntry, "id">, value: string) => {
    setCurrent((prev) => ({ ...prev, [key]: value }));
  };

  const submitEntry = () => {
    if (!current.yesterday.trim() && !current.today.trim()) return;
    setEntries((prev) => [
      { ...current, id: nextId("se") },
      ...prev,
    ]);
    setCurrent({ id: "", yesterday: "", today: "", blockers: "" });
  };

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <Users size={20} className="text-amber-400" />
        <h3 className="text-lg font-bold text-white">Daily Standup</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
          15 min Timebox
        </span>
        <ChevronRight
          size={18}
          className={`text-gray-500 ml-auto transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-gray-400 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            Das Daily Standup findet jeden Tag zur gleichen Zeit statt. Jedes Teammitglied
            beantwortet die 3 Fragen. Es ist auf <strong className="text-white">15 Minuten</strong>{" "}
            begrenzt (Timebox).
          </p>

          {/* Input fields */}
          <div className="space-y-3">
            {STANDUP_QUESTIONS.map((q) => (
              <div key={q.key}>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-300 mb-1">
                  {q.icon} {q.question}
                </label>
                <input
                  type="text"
                  value={current[q.key]}
                  onChange={(e) => updateField(q.key, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            ))}
          </div>

          <button
            onClick={submitEntry}
            disabled={!current.yesterday.trim() && !current.today.trim()}
            className="w-full py-2 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium transition-colors"
          >
            Standup-Eintrag hinzufuegen
          </button>

          {/* Previous entries */}
          {entries.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gray-900/50 rounded-lg p-3 border border-gray-700 text-sm"
                >
                  <div className="grid grid-cols-1 gap-1.5">
                    <p>
                      <span className="text-blue-400 font-medium">Gestern:</span>{" "}
                      <span className="text-gray-300">{entry.yesterday || "-"}</span>
                    </p>
                    <p>
                      <span className="text-amber-400 font-medium">Heute:</span>{" "}
                      <span className="text-gray-300">{entry.today || "-"}</span>
                    </p>
                    <p>
                      <span className="text-red-400 font-medium">Blockaden:</span>{" "}
                      <span className="text-gray-300">{entry.blockers || "Keine"}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SprintReview({
  tasks,
  isExpanded,
  onToggle,
}: {
  tasks: Task[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const doneTasks = tasks.filter((t) => t.column === "done");
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((doneTasks.length / totalTasks) * 100) : 0;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 w-full text-left"
      >
        <CheckCircle size={20} className="text-emerald-400" />
        <h3 className="text-lg font-bold text-white">Sprint Review</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
          Ergebnisse praesentieren
        </span>
        <ChevronRight
          size={18}
          className={`text-gray-500 ml-auto transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-gray-400 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            Beim Sprint Review wird dem Product Owner und Stakeholdern demonstriert, was im Sprint
            geschafft wurde. Der Fokus liegt auf <strong className="text-white">fertigem Produktinkrement</strong>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-900/50 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-2xl font-bold text-emerald-400">{doneTasks.length}</p>
              <p className="text-xs text-gray-500">Fertig</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-2xl font-bold text-white">{totalTasks}</p>
              <p className="text-xs text-gray-500">Gesamt</p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 text-center border border-gray-700">
              <p className="text-2xl font-bold text-cyan-400">{completionRate}%</p>
              <p className="text-xs text-gray-500">Erledigt</p>
            </div>
          </div>

          {/* Completion bar */}
          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
              {doneTasks.length} / {totalTasks} Aufgaben erledigt
            </span>
          </div>

          {/* Done task list */}
          {doneTasks.length > 0 ? (
            <div className="space-y-1.5">
              {doneTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 text-sm bg-emerald-900/20 border border-emerald-500/30 rounded-lg px-3 py-2"
                >
                  <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                  <span className="text-gray-200">{task.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-2">
              Noch keine Aufgaben im "Done"-Bereich.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function SprintRetrospective() {
  const [items, setItems] = useState<RetroItem[]>([]);
  const [newText, setNewText] = useState("");
  const [newType, setNewType] = useState<"good" | "improve">("good");
  const [isExpanded, setIsExpanded] = useState(false);

  const addItem = () => {
    if (!newText.trim()) return;
    setItems((prev) => [...prev, { id: nextId("ri"), type: newType, text: newText.trim() }]);
    setNewText("");
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const goodItems = items.filter((i) => i.type === "good");
  const improveItems = items.filter((i) => i.type === "improve");

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <MessageSquare size={20} className="text-purple-400" />
        <h3 className="text-lg font-bold text-white">Sprint Retrospektive</h3>
        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
          Prozess verbessern
        </span>
        <ChevronRight
          size={18}
          className={`text-gray-500 ml-auto transition-transform duration-200 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-xs text-gray-400 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            In der Retrospektive reflektiert das Team die Zusammenarbeit:{" "}
            <strong className="text-emerald-400">Was lief gut?</strong> und{" "}
            <strong className="text-amber-400">Was koennen wir verbessern?</strong>{" "}
            Daraus werden konkrete Massnahmen fuer den naechsten Sprint abgeleitet.
          </p>

          {/* Add new item */}
          <div className="flex gap-2">
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as "good" | "improve")}
              className="px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm focus:outline-none focus:border-purple-500"
            >
              <option value="good">Lief gut</option>
              <option value="improve">Verbessern</option>
            </select>
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="z.B. Kommunikation war super..."
              className="flex-1 px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={addItem}
              disabled={!newText.trim()}
              className="px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 disabled:text-gray-500 text-white transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Two columns: good / improve */}
          <div className="grid grid-cols-2 gap-3">
            {/* Good */}
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-1">
                <Lightbulb size={14} /> Lief gut
              </h4>
              <div className="space-y-1.5 min-h-[40px]">
                {goodItems.length === 0 && (
                  <p className="text-xs text-gray-600 italic">Noch nichts eingetragen</p>
                )}
                {goodItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-2 text-sm bg-emerald-900/20 border border-emerald-500/30 rounded-lg px-3 py-2"
                  >
                    <span className="flex-1 text-gray-300">{item.text}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Improve */}
            <div>
              <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-1">
                <AlertTriangle size={14} /> Verbessern
              </h4>
              <div className="space-y-1.5 min-h-[40px]">
                {improveItems.length === 0 && (
                  <p className="text-xs text-gray-600 italic">Noch nichts eingetragen</p>
                )}
                {improveItems.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center gap-2 text-sm bg-amber-900/20 border border-amber-500/30 rounded-lg px-3 py-2"
                  >
                    <span className="flex-1 text-gray-300">{item.text}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Main Component ---

export default function ScrumBoard() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [sprintEnd, setSprintEnd] = useState<number | null>(null);
  const [isSprintRunning, setIsSprintRunning] = useState(false);
  const [reviewExpanded, setReviewExpanded] = useState(false);

  // Sprint timer
  const startSprint = useCallback(() => {
    if (!sprintEnd) {
      setSprintEnd(Date.now() + SPRINT_DURATION_MS);
    }
    setIsSprintRunning(true);
  }, [sprintEnd]);

  const pauseSprint = useCallback(() => {
    setIsSprintRunning(false);
  }, []);

  const resetSprint = useCallback(() => {
    setIsSprintRunning(false);
    setSprintEnd(null);
  }, []);

  // Task operations
  const addTask = () => {
    if (!newTitle.trim()) return;
    const task: Task = {
      id: nextId("t"),
      title: newTitle.trim(),
      description: newDescription.trim(),
      column: "backlog",
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, task]);
    setNewTitle("");
    setNewDescription("");
    setShowAddForm(false);
  };

  const moveTask = useCallback((id: string, to: ColumnId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, column: to } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const tasksByColumn = (colId: ColumnId) => tasks.filter((t) => t.column === colId);

  return (
    <div className="w-full bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-600/20 rounded-lg">
            <ClipboardList size={24} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Scrum Board Simulator</h2>
            <p className="text-sm text-gray-400">
              Interaktive Simulation eines Scrum-Teams — erstelle Aufgaben, bewege sie durch den
              Workflow und erlebe den Sprint-Zyklus.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Sprint Timer */}
        <SprintTimer
          sprintEnd={sprintEnd}
          isRunning={isSprintRunning}
          onStart={startSprint}
          onPause={pauseSprint}
          onReset={resetSprint}
        />

        {/* Add task button / form */}
        <div>
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium transition-colors"
            >
              <Plus size={16} /> Neue Aufgabe (Arbeitspaket) erstellen
            </button>
          ) : (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus size={16} className="text-cyan-400" /> Neues Arbeitspaket
              </h4>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Titel der Aufgabe..."
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Beschreibung (optional)..."
                className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  disabled={!newTitle.trim()}
                  className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium transition-colors"
                >
                  Erstellen
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewTitle("");
                    setNewDescription("");
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm font-medium transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kanban Board */}
        <div>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
            Kanban Board — Sprint Backlog
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {COLUMNS.map((col) => {
              const colTasks = tasksByColumn(col.id);
              return (
                <div
                  key={col.id}
                  className={`rounded-xl border ${col.borderColor} ${col.bgColor} min-h-[220px] transition-colors`}
                >
                  {/* Column header */}
                  <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-700/50">
                    <span className={col.color}>{col.icon}</span>
                    <span className={`text-sm font-bold ${col.color}`}>{col.label}</span>
                    <span className="ml-auto text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-full font-mono">
                      {colTasks.length}
                    </span>
                  </div>

                  {/* Tasks */}
                  <div className="p-2 space-y-2">
                    {colTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onMove={moveTask}
                        onDelete={deleteTask}
                      />
                    ))}
                    {colTasks.length === 0 && (
                      <p className="text-xs text-gray-600 text-center py-6 italic">
                        Keine Aufgaben
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrum Events */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
            Scrum Events
          </h3>
          <DailyStandup />
          <SprintReview
            tasks={tasks}
            isExpanded={reviewExpanded}
            onToggle={() => setReviewExpanded(!reviewExpanded)}
          />
          <SprintRetrospective />
        </div>

        {/* Info footer */}
        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-4">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Lightbulb size={16} className="text-yellow-400" /> So funktioniert Scrum
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-400">
            <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
              <p className="font-semibold text-cyan-400 mb-1">Sprint</p>
              <p>
                Ein Zeitraum von 1-4 Wochen (hier: 2 Wochen), in dem das Team ein fertiges
                Produktinkrement erstellt.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
              <p className="font-semibold text-amber-400 mb-1">Product Backlog</p>
              <p>
                Die geordnete Liste aller Anforderungen. Der Product Owner priorisiert, das Team
                waehlt fuer jeden Sprint aus.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
              <p className="font-semibold text-emerald-400 mb-1">Inkrement</p>
              <p>
                Die Summe aller fertigen Backlog-Items. Am Sprint-Ende muss es nutzbar und
                auslieferbar sein (Definition of Done).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
