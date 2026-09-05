"use client";

import { useState, useMemo } from "react";

// ============================================================================
// Tree Explorer — Binäre Suchbäume interaktiv aufbauen und traversieren
// ============================================================================

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function insert(root: TreeNode | null, value: number): TreeNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}

function inorder(node: TreeNode | null): number[] {
  if (!node) return [];
  return [...inorder(node.left), node.value, ...inorder(node.right)];
}

function preorder(node: TreeNode | null): number[] {
  if (!node) return [];
  return [node.value, ...preorder(node.left), ...preorder(node.right)];
}

function postorder(node: TreeNode | null): number[] {
  if (!node) return [];
  return [...postorder(node.left), ...postorder(node.right), node.value];
}

function countNodes(node: TreeNode | null): number {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}

function getHeight(node: TreeNode | null): number {
  if (!node) return 0;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

function search(node: TreeNode | null, value: number): TreeNode[] {
  const path: TreeNode[] = [];
  let current = node;
  while (current) {
    path.push(current);
    if (value === current.value) break;
    current = value < current.value ? current.left : current.right;
  }
  return path;
}

// Tree visualization
function TreeView({ root, highlight, searchTerm }: { root: TreeNode | null; highlight: Set<number>; searchTerm: number | null }) {
  if (!root) return <div className="text-center text-gray-400 text-sm py-8">Baum ist leer</div>;

  const height = getHeight(root);
  const svgWidth = Math.max(300, Math.pow(2, height) * 40);
  const svgHeight = height * 60 + 40;

  const nodes: { x: number; y: number; node: TreeNode }[] = [];
  const edges: { x1: number; y1: number; x2: number; y2: number }[] = [];

  const traverse = (node: TreeNode | null, x: number, y: number, spread: number) => {
    if (!node) return;
    nodes.push({ x, y, node });
    if (node.left) {
      const lx = x - spread;
      const ly = y + 60;
      edges.push({ x1: x, y1: y, x2: lx, y2: ly });
      traverse(node.left, lx, ly, spread / 2);
    }
    if (node.right) {
      const rx = x + spread;
      const ry = y + 60;
      edges.push({ x1: x, y1: y, x2: rx, y2: ry });
      traverse(node.right, rx, ry, spread / 2);
    }
  };

  traverse(root, svgWidth / 2, 30, svgWidth / 4);

  const searchPath = searchTerm !== null ? new Set(search(root, searchTerm).map((n) => n.value)) : new Set<number>();

  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full" style={{ maxHeight: 300 }}>
      {edges.map((e, i) => (
        <line key={`e-${i}`} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#D1D5DB" strokeWidth="2" />
      ))}
      {nodes.map((n, i) => {
        const isHighlighted = highlight.has(n.node.value);
        const isOnSearchPath = searchPath.has(n.node.value);
        return (
          <g key={`n-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="16"
              fill={isOnSearchPath ? "#FCD34D" : isHighlighted ? "#34D399" : "#E5E7EB"}
              stroke={isOnSearchPath ? "#F59E0B" : isHighlighted ? "#10B981" : "#9CA3AF"}
              strokeWidth="2"
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="text-[11px] font-bold" fill={isOnSearchPath || isHighlighted ? "#fff" : "#374151"}>
              {n.node.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TreeExplorer() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [input, setInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [traversalResult, setTraversalResult] = useState<{ type: string; values: number[] } | null>(null);
  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState<number | null>(null);

  const addNode = () => {
    const val = parseInt(input);
    if (isNaN(val) || val < 0 || val > 999) return;
    setRoot(insert(root, val));
    setInput("");
    setTraversalResult(null);
    setSearchTerm(null);
  };

  const doTraversal = (type: "inorder" | "preorder" | "postorder") => {
    if (!root) return;
    const fn = type === "inorder" ? inorder : type === "preorder" ? preorder : postorder;
    const values = fn(root);
    setTraversalResult({ type, values });
    // Animate highlights
    setHighlighted(new Set());
    values.forEach((v, i) => {
      setTimeout(() => {
        setHighlighted((prev) => new Set([...prev, v]));
      }, i * 300);
    });
  };

  const doSearch = () => {
    const val = parseInt(searchInput);
    if (isNaN(val) || !root) return;
    setSearchTerm(val);
    const path = search(root, val);
    setHighlighted(new Set(path.map((n) => n.value)));
    const found = path.length > 0 && path[path.length - 1].value === val;
    setTraversalResult({
      type: found ? `Gefunden: ${val}` : `Nicht gefunden: ${val}`,
      values: path.map((n) => n.value),
    });
  };

  const presetTrees = [
    { label: "Balanciert", values: [50, 25, 75, 12, 37, 62, 87] },
    { label: "Linear (schlecht)", values: [10, 20, 30, 40, 50, 60, 70] },
    { label: "Zufällig", values: [42, 15, 73, 8, 23, 56, 91, 3, 19] },
  ];

  const reset = () => {
    setRoot(null);
    setHighlighted(new Set());
    setTraversalResult(null);
    setSearchTerm(null);
  };

  const nodeCount = countNodes(root);
  const treeHeight = getHeight(root);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Baue einen binären Suchbaum (BST): Kleinere Werte links, größere rechts. Dann traversiere oder suche.
      </p>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presetTrees.map((p) => (
          <button
            key={p.label}
            onClick={() => {
              let r: TreeNode | null = null;
              for (const v of p.values) r = insert(r, v);
              setRoot(r);
              setHighlighted(new Set());
              setTraversalResult(null);
              setSearchTerm(null);
            }}
            className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {p.label}
          </button>
        ))}
        <button onClick={reset} className="px-3 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/20 text-xs text-red-600 hover:bg-red-200 transition-colors">
          Leeren
        </button>
      </div>

      {/* Insert */}
      <div className="flex gap-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNode()}
          placeholder="Wert (0-999)"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
          min="0"
          max="999"
        />
        <button onClick={addNode} className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors">
          Einfügen
        </button>
      </div>

      {/* Tree visualization */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
        <TreeView root={root} highlight={highlighted} searchTerm={searchTerm} />
      </div>

      {/* Stats */}
      {root && (
        <div className="flex gap-4 text-xs text-gray-500">
          <span>Knoten: <strong>{nodeCount}</strong></span>
          <span>Höhe: <strong>{treeHeight}</strong></span>
          <span>Optimal: <strong>{Math.ceil(Math.log2(nodeCount + 1))}</strong></span>
        </div>
      )}

      {/* Traversal buttons */}
      {root && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => doTraversal("inorder")} className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 transition-colors">
            In-Order
          </button>
          <button onClick={() => doTraversal("preorder")} className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors">
            Pre-Order
          </button>
          <button onClick={() => doTraversal("postorder")} className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-semibold hover:bg-purple-600 transition-colors">
            Post-Order
          </button>

          <div className="flex gap-1 ml-auto">
            <input
              type="number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              placeholder="Suchen..."
              className="w-20 px-2 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs"
            />
            <button onClick={doSearch} className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 transition-colors">
              Suchen
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {traversalResult && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="text-xs font-bold mb-1">{traversalResult.type}:</div>
          <div className="flex flex-wrap gap-1">
            {traversalResult.values.map((v, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-xs font-mono font-bold text-amber-700 dark:text-amber-300">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px] text-gray-400">
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-gray-300" /> Normal</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-400" /> Traversierung</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-400" /> Suchpfad</div>
      </div>
    </div>
  );
}
