"use client";

import { useState, useMemo } from "react";

// ============================================================================
// Graph Explorer — Graphen mit BFS/DFS interaktiv erkunden
// ============================================================================

interface GraphNode {
  id: string;
  x: number;
  y: number;
}

interface GraphEdge {
  from: string;
  to: string;
}

const defaultNodes: GraphNode[] = [
  { id: "A", x: 150, y: 40 },
  { id: "B", x: 60, y: 120 },
  { id: "C", x: 240, y: 120 },
  { id: "D", x: 30, y: 220 },
  { id: "E", x: 150, y: 200 },
  { id: "F", x: 270, y: 220 },
  { id: "G", x: 150, y: 300 },
];

const defaultEdges: GraphEdge[] = [
  { from: "A", to: "B" },
  { from: "A", to: "C" },
  { from: "B", to: "D" },
  { from: "B", to: "E" },
  { from: "C", to: "E" },
  { from: "C", to: "F" },
  { from: "D", to: "G" },
  { from: "E", to: "G" },
  { from: "F", to: "G" },
];

type Algorithm = "bfs" | "dfs";

function bfs(nodes: GraphNode[], edges: GraphEdge[], start: string): string[][] {
  const adjacency = new Map<string, string[]>();
  for (const n of nodes) adjacency.set(n.id, []);
  for (const e of edges) {
    adjacency.get(e.from)?.push(e.to);
    adjacency.get(e.to)?.push(e.from);
  }

  const visited = new Set<string>();
  const queue = [start];
  const steps: string[][] = [];

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    steps.push([...visited]);
    for (const neighbor of adjacency.get(current) || []) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }
  return steps;
}

function dfs(nodes: GraphNode[], edges: GraphEdge[], start: string): string[][] {
  const adjacency = new Map<string, string[]>();
  for (const n of nodes) adjacency.set(n.id, []);
  for (const e of edges) {
    adjacency.get(e.from)?.push(e.to);
    adjacency.get(e.to)?.push(e.from);
  }

  const visited = new Set<string>();
  const steps: string[][] = [];

  const traverse = (node: string) => {
    if (visited.has(node)) return;
    visited.add(node);
    steps.push([...visited]);
    for (const neighbor of adjacency.get(node) || []) {
      traverse(neighbor);
    }
  };

  traverse(start);
  return steps;
}

export default function GraphExplorer() {
  const [nodes] = useState(defaultNodes);
  const [edges] = useState(defaultEdges);
  const [startNode, setStartNode] = useState("A");
  const [algorithm, setAlgorithm] = useState<Algorithm>("bfs");
  const [currentStep, setCurrentStep] = useState(-1);
  const [steps, setSteps] = useState<string[][]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const visited = useMemo(() => {
    if (currentStep < 0 || currentStep >= steps.length) return new Set<string>();
    return new Set(steps[currentStep]);
  }, [steps, currentStep]);

  const startAnimation = () => {
    const fn = algorithm === "bfs" ? bfs : dfs;
    const s = fn(nodes, edges, startNode);
    setSteps(s);
    setCurrentStep(0);
    setIsRunning(true);

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= s.length) {
        clearInterval(interval);
        setIsRunning(false);
        return;
      }
      setCurrentStep(i);
    }, 600);
  };

  const reset = () => {
    setSteps([]);
    setCurrentStep(-1);
    setIsRunning(false);
  };

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Wähle einen Startknoten und BFS oder DFS. Beobachte, wie der Algorithmus den Graphen durchsucht.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div>
          <label className="text-xs text-gray-500">Start:</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="ml-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>{n.id}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-1">
          <button
            onClick={() => setAlgorithm("bfs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              algorithm === "bfs" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600"
            }`}
          >
            BFS (Breitensuche)
          </button>
          <button
            onClick={() => setAlgorithm("dfs")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              algorithm === "dfs" ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600"
            }`}
          >
            DFS (Tiefensuche)
          </button>
        </div>

        <button
          onClick={isRunning ? undefined : startAnimation}
          disabled={isRunning}
          className="px-4 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 disabled:opacity-40 transition-colors"
        >
          {isRunning ? "Läuft..." : "Starten"}
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Graph visualization */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
        <svg viewBox="0 0 300 340" className="w-full" style={{ maxHeight: 280 }}>
          {/* Edges */}
          {edges.map((e, i) => {
            const from = nodeMap.get(e.from)!;
            const to = nodeMap.get(e.to)!;
            const bothVisited = visited.has(e.from) && visited.has(e.to);
            return (
              <line
                key={`e-${i}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={bothVisited ? "#F59E0B" : "#D1D5DB"}
                strokeWidth={bothVisited ? 3 : 1.5}
              />
            );
          })}
          {/* Nodes */}
          {nodes.map((n) => {
            const isVisited = visited.has(n.id);
            const isStart = n.id === startNode;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="18"
                  fill={isVisited ? (isStart ? "#3B82F6" : "#F59E0B") : "#E5E7EB"}
                  stroke={isStart ? "#2563EB" : isVisited ? "#D97706" : "#9CA3AF"}
                  strokeWidth="2"
                />
                <text
                  x={n.x}
                  y={n.y + 5}
                  textAnchor="middle"
                  className="text-[13px] font-bold"
                  fill={isVisited ? "#fff" : "#374151"}
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Step display */}
      {steps.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="text-xs font-bold mb-1">
            Schritt {currentStep + 1}/{steps.length} — Besucht:
          </div>
          <div className="flex flex-wrap gap-1">
            {steps[currentStep]?.map((v) => (
              <span key={v} className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px] text-gray-400">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-300" /> Unbesucht</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-blue-500" /> Start</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500" /> Besucht</div>
      </div>

      {/* Algorithm explanation */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
          <div className="font-bold text-blue-600 mb-1">BFS (Breitensuche)</div>
          <p className="text-gray-600 dark:text-gray-400">Nutzt eine <strong>Warteschlange</strong> (Queue). Erst alle Nachbarn, dann deren Nachbarn. Findet den kürzesten Weg.</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
          <div className="font-bold text-green-600 mb-1">DFS (Tiefensuche)</div>
          <p className="text-gray-600 dark:text-gray-400">Nutzt einen <strong>Stapel</strong> (Stack). Geht einen Weg so tief wie möglich, dann zurück. Gut für Pfadsuche.</p>
        </div>
      </div>
    </div>
  );
}
