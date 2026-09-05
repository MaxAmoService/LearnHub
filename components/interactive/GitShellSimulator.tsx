"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw, HelpCircle, ChevronRight, GitBranch } from "lucide-react";

// ---------------------------------------------------------------------------
// Types & State
// ---------------------------------------------------------------------------

interface GitFile {
  name: string;
  content: string;
  staged: boolean;
  committed: boolean;
}

interface Commit {
  hash: string;
  message: string;
  files: string[];
}

interface Branch {
  name: string;
  commits: Commit[];
}

interface GitState {
  files: GitFile[];
  branches: Branch[];
  currentBranch: string;
  staged: string[];
  history: { command: string; output: string }[];
}

type ShellMode = "bash" | "powershell";

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const INITIAL_STATE: GitState = {
  files: [
    { name: "index.html", content: "<h1>Hello World</h1>", staged: false, committed: false },
    { name: "style.css", content: "body { margin: 0; }", staged: false, committed: false },
  ],
  branches: [{ name: "main", commits: [] }],
  currentBranch: "main",
  staged: [],
  history: [],
};

const BASH_HELP = `Verfuegbare Befehle (Bash):
  git status          — Zeigt den aktuellen Zustand
  git add <file>      — Datei zum Staging hinzufuegen
  git add .           — Alle Dateien stagen
  git commit -m "..." — Aenderungen committen
  git log             — Commit-Historie anzeigen
  git branch          — Branches anzeigen
  git branch <name>   — Neuen Branch erstellen
  git checkout <name> — Branch wechseln
  git checkout -b <name> — Neuen Branch erstellen und wechseln
  git merge <name>    — Branch mergen
  touch <file>        — Neue Datei erstellen
  help                — Diese Hilfe anzeigen
  clear               — Verlauf loeschen`;

const POWERSHELL_HELP = `Verfuegbare Befehle (PowerShell + poshgit):
  git status          — Zeigt den aktuellen Zustand
  git add <file>      — Datei zum Staging hinzufuegen
  git add .           — Alle Dateien stagen
  git commit -m "..." — Aenderungen committen
  git log             — Commit-Historie anzeigen
  git branch          — Branches anzeigen
  git branch <name>   — Neuen Branch erstellen
  git checkout <name> — Branch wechseln
  git checkout -b <name> — Neuen Branch erstellen und wechseln
  git merge <name>    — Branch mergen

  PowerShell-Aliase:
  ga <file>           — git add
  gaa                 — git add .
  gcmsg "..."         — git commit -m "..."
  gco <name>          — git checkout
  gcb <name>          — git checkout -b
  gst                 — git status
  gl                  — git log
  gb                  — git branch
  gm <name>           — git merge

  New-Item <file>     — Neue Datei erstellen (alias: ni)
  help                — Diese Hilfe anzeigen
  clear               — Verlauf loeschen

  poshgit zeigt im Prompt:
  [Branch +N ~M -D]  — N neu, M geaendert, D geloescht`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function randomHash(): string {
  return Math.random().toString(16).slice(2, 9);
}

function parseCommand(input: string): { cmd: string; args: string[] } {
  const parts = input.trim().split(/\s+/);
  return { cmd: parts[0] || "", args: parts.slice(1) };
}

// poshgit-style status string
function getPoshGitStatus(state: GitState): string {
  const staged = state.files.filter(f => f.staged).length;
  const untracked = state.files.filter(f => !f.staged && !f.committed).length;
  const modified = state.files.filter(f => f.committed && !f.staged).length;

  let status = "";
  if (staged > 0) status += ` +${staged}`;
  if (modified > 0) status += ` ~${modified}`;
  if (untracked > 0) status += ` -${untracked}`;
  return status;
}

function getPoshGitBranch(state: GitState): string {
  const status = getPoshGitStatus(state);
  return `[${state.currentBranch}${status}]`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GitShellSimulator() {
  const [state, setState] = useState<GitState>(INITIAL_STATE);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [shellMode, setShellMode] = useState<ShellMode>("bash");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.history]);

  const addOutput = (command: string, output: string) => {
    setState((prev) => ({
      ...prev,
      history: [...prev.history, { command, output }],
    }));
  };

  const execute = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const { cmd, args } = parseCommand(trimmed);

    // ---- PowerShell aliases ----
    const psAliases: Record<string, string[]> = {
      ga: ["git", "add"],
      gaa: ["git", "add", "."],
      gcmsg: ["git", "commit", "-m"],
      gco: ["git", "checkout"],
      gcb: ["git", "checkout", "-b"],
      gst: ["git", "status"],
      gl: ["git", "log"],
      gb: ["git", "branch"],
      gm: ["git", "merge"],
    };

    // Resolve PowerShell alias
    let resolvedCmd = cmd;
    let resolvedArgs = args;
    if (shellMode === "powershell" && psAliases[cmd]) {
      const alias = psAliases[cmd];
      resolvedCmd = alias[0];
      resolvedArgs = [...alias.slice(1), ...args];
    }

    // PowerShell New-Item alias
    if (shellMode === "powershell" && (cmd === "New-Item" || cmd === "ni")) {
      const fileName = args.find(a => !a.startsWith("-"));
      if (!fileName) {
        addOutput(trimmed, "New-Item: Missing file name parameter.");
      } else if (state.files.find(f => f.name === fileName)) {
        addOutput(trimmed, `'${fileName}' existiert bereits.`);
      } else {
        setState(prev => ({
          ...prev,
          files: [...prev.files, { name: fileName, content: "", staged: false, committed: false }],
        }));
        addOutput(trimmed, `'${fileName}' erstellt.`);
      }
      return;
    }

    switch (resolvedCmd) {
      case "help": {
        addOutput(trimmed, shellMode === "powershell" ? POWERSHELL_HELP : BASH_HELP);
        break;
      }

      case "clear": {
        setState((prev) => ({ ...prev, history: [] }));
        break;
      }

      case "git": {
        const subcmd = resolvedArgs[0];
        switch (subcmd) {
          case "status": {
            const staged = state.files.filter((f) => f.staged);
            const unstaged = state.files.filter((f) => !f.staged && !f.committed);
            const modified = state.files.filter((f) => f.committed && !f.staged);

            let output = `On branch ${state.currentBranch}\n`;
            if (shellMode === "powershell") {
              output += `poshgit: ${getPoshGitBranch(state)}\n`;
            }
            if (staged.length > 0) {
              output += "\nChanges to be committed:\n";
              staged.forEach((f) => (output += `  new file:   ${f.name}\n`));
            }
            if (unstaged.length > 0) {
              output += "\nUntracked files:\n";
              unstaged.forEach((f) => (output += `  ${f.name}\n`));
            }
            if (modified.length > 0) {
              output += "\nChanges not staged for commit:\n";
              modified.forEach((f) => (output += `  modified:   ${f.name}\n`));
            }
            if (staged.length === 0 && unstaged.length === 0 && modified.length === 0) {
              output += "nothing to commit, working tree clean";
            }
            addOutput(trimmed, output);
            break;
          }

          case "add": {
            if (resolvedArgs[1] === ".") {
              setState((prev) => ({
                ...prev,
                files: prev.files.map((f) => ({ ...f, staged: true })),
              }));
              addOutput(trimmed, `Alle Dateien zum Staging hinzugefuegt.`);
            } else if (resolvedArgs[1]) {
              const file = state.files.find((f) => f.name === resolvedArgs[1]);
              if (!file) {
                addOutput(trimmed, `fatal: pathspec '${resolvedArgs[1]}' did not match any files`);
              } else {
                setState((prev) => ({
                  ...prev,
                  files: prev.files.map((f) => (f.name === resolvedArgs[1] ? { ...f, staged: true } : f)),
                }));
                addOutput(trimmed, `'${resolvedArgs[1]}' zum Staging hinzugefuegt.`);
              }
            } else {
              addOutput(trimmed, "Nothing specified, nothing added.");
            }
            break;
          }

          case "commit": {
            const msgIdx = resolvedArgs.indexOf("-m");
            const message = msgIdx >= 0 ? resolvedArgs.slice(msgIdx + 1).join(" ").replace(/["']/g, "") : "";
            const stagedFiles = state.files.filter((f) => f.staged);
            if (stagedFiles.length === 0) {
              addOutput(trimmed, "nothing to commit");
            } else if (!message) {
              addOutput(trimmed, "Aborting commit due to empty commit message.");
            } else {
              const hash = randomHash();
              const commit: Commit = { hash, message, files: stagedFiles.map((f) => f.name) };
              setState((prev) => ({
                ...prev,
                files: prev.files.map((f) =>
                  f.staged ? { ...f, staged: false, committed: true } : f
                ),
                branches: prev.branches.map((b) =>
                  b.name === prev.currentBranch
                    ? { ...b, commits: [...b.commits, commit] }
                    : b
                ),
              }));
              addOutput(trimmed, `[${state.currentBranch} ${hash}] ${message}\n ${stagedFiles.length} file(s) changed`);
            }
            break;
          }

          case "log": {
            const branch = state.branches.find((b) => b.name === state.currentBranch);
            if (!branch || branch.commits.length === 0) {
              addOutput(trimmed, "Noch keine Commits auf diesem Branch.");
            } else {
              const log = branch.commits
                .slice()
                .reverse()
                .map((c) => `commit ${c.hash}\n    ${c.message}`)
                .join("\n\n");
              addOutput(trimmed, log);
            }
            break;
          }

          case "branch": {
            if (resolvedArgs.length === 1) {
              const list = state.branches
                .map((b) => (b.name === state.currentBranch ? `* ${b.name}` : `  ${b.name}`))
                .join("\n");
              addOutput(trimmed, list);
            } else {
              const name = resolvedArgs[1];
              if (state.branches.find((b) => b.name === name)) {
                addOutput(trimmed, `fatal: A branch named '${name}' already exists.`);
              } else {
                setState((prev) => ({
                  ...prev,
                  branches: [...prev.branches, { name, commits: [...(prev.branches.find((b) => b.name === prev.currentBranch)?.commits || [])] }],
                }));
                addOutput(trimmed, `Branch '${name}' erstellt.`);
              }
            }
            break;
          }

          case "checkout": {
            if (resolvedArgs[1] === "-b") {
              const name = resolvedArgs[2];
              if (!name) {
                addOutput(trimmed, "fatal: branch name required");
              } else if (state.branches.find((b) => b.name === name)) {
                addOutput(trimmed, `fatal: A branch named '${name}' already exists.`);
              } else {
                setState((prev) => ({
                  ...prev,
                  branches: [...prev.branches, { name, commits: [...(prev.branches.find((b) => b.name === prev.currentBranch)?.commits || [])] }],
                  currentBranch: name,
                }));
                addOutput(trimmed, `Switched to a new branch '${name}'`);
              }
            } else if (resolvedArgs[1]) {
              const branch = state.branches.find((b) => b.name === resolvedArgs[1]);
              if (!branch) {
                addOutput(trimmed, `error: pathspec '${resolvedArgs[1]}' did not match any file(s) known to git`);
              } else if (resolvedArgs[1] === state.currentBranch) {
                addOutput(trimmed, `Already on '${resolvedArgs[1]}'`);
              } else {
                setState((prev) => ({ ...prev, currentBranch: resolvedArgs[1] }));
                addOutput(trimmed, `Switched to branch '${resolvedArgs[1]}'`);
              }
            }
            break;
          }

          case "merge": {
            if (!resolvedArgs[1]) {
              addOutput(trimmed, "fatal: No branch specified.");
            } else if (resolvedArgs[1] === state.currentBranch) {
              addOutput(trimmed, `Already on '${resolvedArgs[1]}' — cannot merge into itself.`);
            } else {
              const source = state.branches.find((b) => b.name === resolvedArgs[1]);
              if (!source) {
                addOutput(trimmed, `error: branch '${resolvedArgs[1]}' not found.`);
              } else {
                const currentBranch = state.branches.find((b) => b.name === state.currentBranch);
                const newCommits = source.commits.filter(
                  (sc) => !currentBranch?.commits.find((cc) => cc.hash === sc.hash)
                );
                if (newCommits.length === 0) {
                  addOutput(trimmed, `Already up to date.`);
                } else {
                  setState((prev) => ({
                    ...prev,
                    branches: prev.branches.map((b) =>
                      b.name === prev.currentBranch
                        ? { ...b, commits: [...b.commits, ...newCommits] }
                        : b
                    ),
                  }));
                  addOutput(trimmed, `Merge von '${resolvedArgs[1]}' in '${state.currentBranch}' — ${newCommits.length} Commit(s) uebernommen.`);
                }
              }
            }
            break;
          }

          default:
            addOutput(trimmed, `git: '${subcmd}' is not a git command.`);
        }
        break;
      }

      case "touch": {
        if (!args[0]) {
          addOutput(trimmed, "touch: missing file operand");
        } else if (state.files.find((f) => f.name === args[0])) {
          addOutput(trimmed, `'${args[0]}' existiert bereits.`);
        } else {
          setState((prev) => ({
            ...prev,
            files: [...prev.files, { name: args[0], content: "", staged: false, committed: false }],
          }));
          addOutput(trimmed, `'${args[0]}' erstellt.`);
        }
        break;
      }

      default:
        addOutput(trimmed, `${cmd}: command not found. Tippe 'help' fuer verfuegbare Befehle.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    execute(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const reset = () => {
    setState(INITIAL_STATE);
    setCommandHistory([]);
    setHistoryIndex(-1);
  };

  const promptPrefix = shellMode === "powershell"
    ? `PS ${getPoshGitBranch(state)}> `
    : "$";

  return (
    <div className="space-y-4">
      {/* Shell mode toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">Shell-Modus:</span>
        <button
          onClick={() => setShellMode("bash")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            shellMode === "bash"
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Bash
        </button>
        <button
          onClick={() => setShellMode("powershell")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
            shellMode === "powershell"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          PowerShell + poshgit
        </button>
      </div>

      {/* Terminal */}
      <div
        className="bg-[#0d1117] rounded-xl border border-slate-700/50 overflow-hidden font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>
              {shellMode === "powershell" ? "PowerShell" : "Git Shell"} — {state.currentBranch}
            </span>
            {shellMode === "powershell" && (
              <span className="ml-2 text-green-400 font-mono">{getPoshGitBranch(state)}</span>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="p-4 max-h-80 overflow-y-auto space-y-2">
          {/* Welcome */}
          {state.history.length === 0 && (
            <div className="text-slate-500 space-y-1">
              <p>Willkommen im {shellMode === "powershell" ? "PowerShell + poshgit" : "Git Shell"} Simulator!</p>
              <p>Tippe &apos;help&apos; fuer verfuegbare Befehle.</p>
              <p className="text-slate-600">Nutze Pfeil hoch/runter fuer Befehlshistorie.</p>
              {shellMode === "powershell" && (
                <p className="text-cyan-500">poshgit zeigt Git-Status im Prompt: [+N ~M -D]</p>
              )}
            </div>
          )}

          {/* History */}
          {state.history.map((entry, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center gap-1">
                <span className={shellMode === "powershell" ? "text-cyan-400" : "text-green-400"}>
                  {shellMode === "powershell" ? `PS ${getPoshGitBranch(state)}>` : "$"}
                </span>
                <span className="text-white">{entry.command}</span>
              </div>
              <pre className="text-slate-300 whitespace-pre-wrap text-xs leading-relaxed">{entry.output}</pre>
            </div>
          ))}

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center gap-1">
            <span className={shellMode === "powershell" ? "text-cyan-400" : "text-green-400"}>
              {shellMode === "powershell" ? `PS ${getPoshGitBranch(state)}>` : "$"}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none caret-green-400"
              placeholder={shellMode === "powershell" ? "gst oder git status" : "git status"}
              autoFocus
              spellCheck={false}
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick commands */}
      <div className="flex flex-wrap gap-2">
        {(shellMode === "powershell"
          ? ["gst", "gaa", 'gcmsg "init"', "gl", "gb", "help"]
          : ["git status", "git add .", 'git commit -m "init"', "git log", "git branch", "help"]
        ).map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              execute(cmd);
            }}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-300 font-mono transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* State visualization */}
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="glass rounded-lg p-3">
          <div className="text-slate-500 mb-1 flex items-center gap-1">
            <GitBranch size={12} /> Branches
          </div>
          {state.branches.map((b) => (
            <div key={b.name} className={b.name === state.currentBranch ? "text-green-400 font-bold" : "text-slate-400"}>
              {b.name === state.currentBranch ? "* " : "  "}{b.name} ({b.commits.length})
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-3">
          <div className="text-slate-500 mb-1">Dateien</div>
          {state.files.map((f) => (
            <div key={f.name} className={f.staged ? "text-green-400" : f.committed ? "text-slate-400" : "text-yellow-400"}>
              {f.staged ? "● " : f.committed ? "✓ " : "○ "}{f.name}
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-3">
          <div className="text-slate-500 mb-1">Commits</div>
          {(() => {
            const branch = state.branches.find((b) => b.name === state.currentBranch);
            if (!branch || branch.commits.length === 0) return <div className="text-slate-600">Keine</div>;
            return branch.commits.slice(-3).reverse().map((c) => (
              <div key={c.hash} className="text-slate-400">
                <span className="text-yellow-500">{c.hash}</span> {c.message}
              </div>
            ));
          })()}
        </div>
      </div>

      {/* poshgit info */}
      {shellMode === "powershell" && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-1">poshgit Erklaerung</h4>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            poshgit ist ein PowerShell-Modul, das den Git-Status im Prompt anzeigt.
            Das Format <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">[Branch +N ~M -D]</code> bedeutet:
            <strong> +N</strong> = N neue/staged Dateien,
            <strong> ~M</strong> = M geaenderte Dateien,
            <strong> -D</strong> = D ungetrackte Dateien.
          </p>
        </div>
      )}

      {/* Reset */}
      <div className="flex justify-center">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Zuruecksetzen
        </button>
      </div>
    </div>
  );
}
