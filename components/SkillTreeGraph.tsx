"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  skillTreeNodes,
  getEdges,
  getNodeStatus,
  computeTreePositions,
  NODE_W,
  NODE_H,
  type SkillTreeNode,
  type NodeStatus,
} from "@/lib/skillTree";
import { useAuth } from "./AuthProvider";
import { allModules } from "@/lib/data";

// IDs die tatsächlich Modul-Content haben
const AVAILABLE_MODULES = new Set(allModules.map(m => m.slug));

// ─── Farben ─────────────────────────────────────────────────────────────────

const COLORS: Record<NodeStatus, { bg: string; border: string; text: string; bar: string }> = {
  completed:    { bg: "#052e1a", border: "#00ff88", text: "#00ff88", bar: "#00ff88" },
  "in-progress":{ bg: "#0c1a2e", border: "#00aaff", text: "#00aaff", bar: "#00aaff" },
  "not-started":{ bg: "#111827", border: "#374151", text: "#9ca3af", bar: "#4b5563" },
};

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

function getAllPrerequisites(nodeId: string, nodes: SkillTreeNode[]): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  function walk(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const node = nodes.find(n => n.id === id);
    if (!node) return;
    for (const p of node.prerequisites) {
      result.push(p);
      walk(p);
    }
  }
  walk(nodeId);
  return [...new Set(result)];
}

function getDependents(nodeId: string, nodes: SkillTreeNode[]): string[] {
  return nodes.filter(n => n.prerequisites.includes(nodeId)).map(n => n.id);
}

function getAllDependents(nodeId: string, nodes: SkillTreeNode[]): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  function walk(id: string) {
    if (visited.has(id)) return;
    visited.add(id);
    const dependents = nodes.filter(n => n.prerequisites.includes(id));
    for (const d of dependents) {
      result.push(d.id);
      walk(d.id);
    }
  }
  walk(nodeId);
  return [...new Set(result)];
}

// ─── Touch-Hilfe ────────────────────────────────────────────────────────────

function getTouchDist(t: React.TouchList): number {
  if (t.length < 2) return 0;
  const dx = t[0].clientX - t[1].clientX;
  const dy = t[0].clientY - t[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getTouchCenter(t: React.TouchList): { x: number; y: number } {
  if (t.length < 2) return { x: t[0].clientX, y: t[0].clientY };
  return {
    x: (t[0].clientX + t[1].clientX) / 2,
    y: (t[0].clientY + t[1].clientY) / 2,
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export function SkillTreeGraph() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cat, setCat] = useState("mathe");
  const [hovered, setHovered] = useState<SkillTreeNode | null>(null);
  const [selected, setSelected] = useState<SkillTreeNode | null>(null);  // Mobile: Tap-Auswahl
  const [vb, setVb] = useState({ x: -200, y: -100, w: 1800, h: 700 });
  const [isMobile, setIsMobile] = useState(false);

  // Touch-State (Ref für Performance)
  const touchRef = useRef({
    panning: false,
    pinchDist: 0,
    lastCenter: { x: 0, y: 0 },
    lastSingle: { x: 0, y: 0 },
    startTime: 0,
    startPos: { x: 0, y: 0 },
  });

  const doneModules = user?.completedModules || [];
  const doneLessons = user?.completedLessons || {};

  const nodes = useMemo(() => skillTreeNodes.filter(n => n.category === cat), [cat]);

  // Positionen: automatisches Baum-Layout (Grundlagen unten, Fortgeschritten oben)
  const positions = useMemo(() => computeTreePositions(nodes), [nodes]);

  // Initiales Zentrieren beim ersten Render
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    if (positions.size === 0) return;
    initializedRef.current = true;
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [, p] of positions) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }
    const pad = 200;
    setVb({ x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2 + NODE_W, h: maxY - minY + pad * 2 + NODE_H });
  }, [positions]);
  const edges = useMemo(() => {
    const ids = new Set(nodes.map(n => n.id));
    return getEdges(nodes).filter(e => ids.has(e.from) && ids.has(e.to));
  }, [nodes]);

  // Mobile Detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Active node = auf Mobile: selected, auf Desktop: hovered
  const activeNode = isMobile ? selected : hovered;

  const highlightedIds = useMemo(() => {
    const active = activeNode;
    if (!active) return new Set<string>();
    const ids = new Set<string>();
    ids.add(active.id);
    for (const p of getAllPrerequisites(active.id, nodes)) ids.add(p);
    for (const d of getAllDependents(active.id, nodes)) ids.add(d);
    return ids;
  }, [activeNode, nodes]);

  // ─── Zoom (Desktop: Wheel) ─────────────────────────────────────────────

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const s = e.deltaY > 0 ? 1.1 : 0.9;
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      const sx = vb.x + (mx / r.width) * vb.w;
      const sy = vb.y + (my / r.height) * vb.h;
      const nw = vb.w * s;
      const nh = vb.h * s;
      setVb({ x: sx - (mx / r.width) * nw, y: sy - (my / r.height) * nh, w: nw, h: nh });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [vb]);

  // ─── Desktop Maus-Pan ──────────────────────────────────────────────────

  const [mousePanning, setMousePanning] = useState(false);
  const [mousePan0, setMousePan0] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // Shift+Drag, Mittel-Button, oder Rechtsklick = Pan
    if (e.button === 1 || e.button === 2 || (e.button === 0 && e.shiftKey)) {
      setMousePanning(true);
      setMousePan0({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mousePanning) return;
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const dx = (e.clientX - mousePan0.x) * (vb.w / r.width);
    const dy = (e.clientY - mousePan0.y) * (vb.h / r.height);
    setVb(v => ({ ...v, x: v.x - dx, y: v.y - dy }));
    setMousePan0({ x: e.clientX, y: e.clientY });
  }, [mousePanning, mousePan0, vb]);

  const onMouseUp = useCallback(() => setMousePanning(false), []);

  // ─── Touch-Events (Mobile: 1-Finger=Pan, 2-Finger=Zoom) ───────────────

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = touchRef.current;
    t.startTime = Date.now();

    if (e.touches.length === 2) {
      // Pinch start
      e.preventDefault();
      t.pinchDist = getTouchDist(e.touches);
      t.lastCenter = getTouchCenter(e.touches);
      t.panning = false;
    } else if (e.touches.length === 1) {
      t.lastSingle = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      t.startPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      t.panning = true;
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const t = touchRef.current;

    if (e.touches.length === 2) {
      // Pinch zoom
      e.preventDefault();
      const newDist = getTouchDist(e.touches);
      const center = getTouchCenter(e.touches);
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();

      if (t.pinchDist > 0) {
        const scale = t.pinchDist / newDist;
        const cx = vb.x + ((center.x - r.left) / r.width) * vb.w;
        const cy = vb.y + ((center.y - r.top) / r.height) * vb.h;
        const nw = vb.w * scale;
        const nh = vb.h * scale;
        setVb({
          x: cx - ((center.x - r.left) / r.width) * nw,
          y: cy - ((center.y - r.top) / r.height) * nh,
          w: nw, h: nh,
        });
      }

      // Pan bei Pinch
      if (t.lastCenter.x !== 0) {
        const svg2 = svgRef.current;
        if (!svg2) return;
        const r2 = svg2.getBoundingClientRect();
        const dx = (center.x - t.lastCenter.x) * (vb.w / r2.width);
        const dy = (center.y - t.lastCenter.y) * (vb.h / r2.height);
        setVb(v => ({ ...v, x: v.x - dx, y: v.y - dy }));
      }

      t.pinchDist = newDist;
      t.lastCenter = center;
      t.panning = false;
    } else if (e.touches.length === 1 && t.panning) {
      // Single-finger pan
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const dx = (e.touches[0].clientX - t.lastSingle.x) * (vb.w / r.width);
      const dy = (e.touches[0].clientY - t.lastSingle.y) * (vb.h / r.height);
      setVb(v => ({ ...v, x: v.x - dx, y: v.y - dy }));
      t.lastSingle = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [vb]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const t = touchRef.current;

    // Tap-Erkennung: kurzer Tap ohne viel Bewegung
    if (e.touches.length === 0 && e.changedTouches.length === 1) {
      const elapsed = Date.now() - t.startTime;
      const dx = Math.abs(e.changedTouches[0].clientX - t.startPos.x);
      const dy = Math.abs(e.changedTouches[0].clientY - t.startPos.y);
      const isTap = elapsed < 300 && dx < 15 && dy < 15;

      if (isTap) {
        // Tap auf Hintergrund = Deselekt
        setSelected(null);
      }
    }

    if (e.touches.length === 0) {
      t.panning = false;
      t.pinchDist = 0;
      t.lastCenter = { x: 0, y: 0 };
    }
  }, []);

  // ─── Kategorie ──────────────────────────────────────────────────────────

  const [showAdvanced] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("learnhub-advanced") === "1";
  });

  const cats = [
    { id: "mathe", label: "Mathematik", icon: "📐", color: "#a855f7" },
    { id: "programmierung", label: "Programmierung", icon: "💻", color: "#f97316" },
    { id: "ihk", label: "IHK-Module", icon: "🏢", color: "#06b6d4" },
    ...(showAdvanced ? [{ id: "advanced", label: "Erweitert", icon: "🎓", color: "#10b981" }] : []),
  ];

  const catCount = (id: string) => {
    const n = skillTreeNodes.filter(x => x.category === id);
    return { done: n.filter(x => doneModules.includes(x.id)).length, total: n.length };
  };

  const switchCat = (id: string) => {
    setCat(id);
    setSelected(null);
    const n = skillTreeNodes.filter(x => x.category === id);
    if (n.length === 0) return;
    const pos = computeTreePositions(n);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const [, p] of pos) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    }
    const pad = 200;
    setVb({ x: minX - pad, y: minY - pad, w: maxX - minX + pad * 2 + NODE_W, h: maxY - minY + pad * 2 + NODE_H });
  };

  // ─── Klick auf Node ────────────────────────────────────────────────────

  const handleNodeClick = useCallback((node: SkillTreeNode) => {
    const isAvailable = AVAILABLE_MODULES.has(node.id);
    if (isMobile) {
      // Mobile: 1. Tap = Select/Tooltip, 2. Tap = Navigate
      if (selected?.id === node.id && isAvailable) {
        window.location.href = `/modules/${node.id}`;
      } else {
        setSelected(node);
      }
    } else {
      if (isAvailable) window.location.href = `/modules/${node.id}`;
    }
  }, [isMobile, selected]);

  // ─── Gekrümmte Kante ───────────────────────────────────────────────────

  const renderEdge = (from: string, to: string, i: number) => {
    const fp = positions.get(from);
    const tp = positions.get(to);
    if (!fp || !tp) return null;
    const fn = nodes.find(n => n.id === from);
    const tn = nodes.find(n => n.id === to);
    if (!fn || !tn) return null;

    const fs = getNodeStatus(fn, doneModules, doneLessons);
    const ts = getNodeStatus(tn, doneModules, doneLessons);
    const bothDone = fs === "completed" && ts === "completed";
    const isActive = fs === "completed" && ts !== "completed";

    const isHighlighted = activeNode && (highlightedIds.has(from) && highlightedIds.has(to));
    const isDimmed = activeNode && !isHighlighted;

    // Von OBEN (Voraussetzung) → UNTEN (Kind), Pfeil zeigt nach oben
    // "from" = prerequisite (unten auf dem Screen, höhere Y)
    // "to"   = Kind          (oben auf dem Screen, niedrigere Y)
    const x1 = fp.x + NODE_W / 2;
    const y1 = fp.y;            // top of from (prerequisite, unten)
    const x2 = tp.x + NODE_W / 2;
    const y2 = tp.y + NODE_H;  // bottom of to (kind, oben)

    const midY = (y1 + y2) / 2;
    const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    let color: string, w: number, op: number;
    if (bothDone) { color = "#00ff88"; w = 2.5; op = 0.7; }
    else if (isActive) { color = "#00aaff"; w = 2; op = 0.55; }
    else { color = "#64748b"; w = 1.5; op = 0.25; }

    if (isDimmed) { op = 0.04; w = 1; }
    if (isHighlighted && activeNode) { op = Math.min(op + 0.35, 1); w += 1; }

    // Pfeilspitze zeigt nach OBEN (V-Shape nach oben)
    const arrowSize = 6;
    const spread = Math.PI / 5;  // 36° Öffnung
    const ax = x2 - arrowSize * Math.sin(spread);
    const ay = y2 + arrowSize * Math.cos(spread);
    const bx = x2 + arrowSize * Math.sin(spread);
    const by = y2 + arrowSize * Math.cos(spread);

    return (
      <g key={`e-${i}`} style={{ transition: "opacity 0.2s" }}>
        {isHighlighted && <path d={d} fill="none" stroke={color} strokeWidth={w + 8} opacity={op * 0.15} strokeLinecap="round" />}
        <path d={d} fill="none" stroke={color} strokeWidth={w} opacity={op} strokeLinecap="round" />
        <polygon points={`${x2},${y2} ${ax},${ay} ${bx},${by}`} fill={color} opacity={op} />
      </g>
    );
  };

  // ─── Knoten ─────────────────────────────────────────────────────────────

  const renderNode = (node: SkillTreeNode) => {
    const pos = positions.get(node.id);
    if (!pos) return null;
    const status = getNodeStatus(node, doneModules, doneLessons);
    const c = COLORS[status];
    const isH = activeNode?.id === node.id;
    const prog = (doneLessons[node.id] || []).length;

    const isDimmed = activeNode && !highlightedIds.has(node.id) && !isH;
    const isAvailable = AVAILABLE_MODULES.has(node.id);

    const pad = 8;

    return (
      <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}
        style={{ transition: "opacity 0.2s", opacity: isDimmed ? 0.15 : 1 }}
        onMouseEnter={e => {
          if (isMobile) return;
          setHovered(node);
        }}
        onMouseLeave={() => { if (!isMobile) setHovered(null); }}
        onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
        onTouchEnd={(e) => { e.stopPropagation(); handleNodeClick(node); }}
        className={isAvailable ? "cursor-pointer" : "cursor-default"}>

        {/* Opaker Hintergrund — überdeckt Kanten komplett */}
        <rect x={-pad} y={-pad} width={NODE_W + pad * 2} height={NODE_H + pad * 2} rx={16}
          fill="#020617" />

        {/* Glow-Ring */}
        {status !== "not-started" && (
          <rect x={-4} y={-4} width={NODE_W + 8} height={NODE_H + 8} rx={16}
            fill="none" stroke={c.border} strokeWidth="1.5" opacity={isH ? 0.6 : 0.2}
            style={{ transition: "opacity 0.2s" }} />
        )}

        {/* Karte */}
        <rect width={NODE_W} height={NODE_H} rx={12} fill={c.bg}
          stroke={isH ? "#a855f7" : c.border}
          strokeWidth={isH ? 3 : 1.5}
          style={{ transition: "stroke-width 0.15s" }} />

        {/* Icon */}
        <text x={14} y={26} fontSize="18" className="select-none pointer-events-none">{node.icon}</text>

        {/* Label */}
        <text x={40} y={22} fontSize="11" fontWeight="600" fill={c.text} className="select-none pointer-events-none">
          {node.label.length > 16 ? node.label.slice(0, 16) + "…" : node.label}
        </text>

        {/* Progress-Bar */}
        <rect x={10} y={36} width={NODE_W - 20} height={5} rx={2.5} fill="rgba(255,255,255,0.04)" />
        {prog > 0 && (
          <rect x={10} y={36} width={Math.max(4, (NODE_W - 20) * Math.min(prog, 10) / 10)} height={5} rx={2.5} fill={c.bar} opacity={0.8} />
        )}

        {/* Status */}
        <text x={12} y={52} fontSize="8" fill={c.text} opacity={0.6} className="select-none pointer-events-none">
          {!isAvailable ? "🔜 Bald verfügbar" : status === "completed" ? "✅ Fertig" : status === "in-progress" ? `📖 ${prog} Lektionen` : ""}
        </text>

        {/* "Bald" Overlay */}
        {!isAvailable && (
          <rect width={NODE_W} height={NODE_H} rx={12} fill="rgba(15,23,42,0.5)" />
        )}
      </g>
    );
  };

  // ─── Tooltip Content (shared between desktop hover & mobile tap) ───────

  const tooltipContent = (() => {
    const node = activeNode;
    if (!node) return null;

    const allPrereqs = getAllPrerequisites(node.id, nodes);
    const directDeps = getDependents(node.id, nodes);
    const allDeps = getAllDependents(node.id, nodes);

    type TreeNode = { id: string; children: TreeNode[] };
    const buildPrereqTree = (nodeId: string, depth: number = 0, visited: Set<string> = new Set()): TreeNode => {
      if (visited.has(nodeId) || depth > 5) return { id: nodeId, children: [] };
      visited.add(nodeId);
      const nd = nodes.find(n => n.id === nodeId);
      return {
        id: nodeId,
        children: (nd?.prerequisites || [])
          .filter(p => nodes.some(n => n.id === p))
          .map(p => buildPrereqTree(p, depth + 1, visited)),
      };
    };

    const renderTreeNode = (tree: TreeNode, depth: number = 0): React.ReactNode => {
      const pn = nodes.find(n => n.id === tree.id);
      if (!pn) return null;
      const ok = doneModules.includes(tree.id);
      const inProg = (doneLessons[tree.id]?.length || 0) > 0;
      const isCurrent = tree.id === node.id;
      return (
        <div key={tree.id}>
          <div className="flex items-center gap-1.5" style={{ paddingLeft: `${depth * 14}px` }}>
            {depth > 0 && <span className="text-slate-600 text-[10px] mr-0.5">{"└─"}</span>}
            <span className={ok ? "text-green-400" : inProg ? "text-blue-400" : "text-slate-500"}>
              {ok ? "✅" : inProg ? "📖" : "⬜"}
            </span>
            <span className={`${isCurrent ? "text-violet-300 font-semibold" : ok ? "text-green-300" : inProg ? "text-blue-300" : "text-slate-400"}`}>
              {pn.icon} {pn.label}
            </span>
            {isCurrent && <span className="text-[10px] text-violet-400 ml-auto font-medium">← hier</span>}
          </div>
          {tree.children.map(child => renderTreeNode(child, depth + 1))}
        </div>
      );
    };

    const tree = buildPrereqTree(node.id);

    return (
      <>
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{node.icon}</span>
          <span className="font-semibold text-slate-200">{node.label}</span>
        </div>
        <div className="text-xs text-slate-400 capitalize mb-3">
          {cats.find(c => c.id === node.category)?.label}
          {!AVAILABLE_MODULES.has(node.id) && (
            <span className="ml-2 text-amber-400">🔜 Bald verfügbar</span>
          )}
          {isMobile && AVAILABLE_MODULES.has(node.id) && (
            <span className="ml-2 text-violet-400">↩ Nochmal tippen = Öffnen</span>
          )}
        </div>

        {/* Voraussetzungen als Baum */}
        {allPrereqs.length > 0 ? (
          <div className="text-xs mb-3">
            <div className="text-slate-400 font-medium mb-2">📋 Voraussetzungen ({allPrereqs.length}):</div>
            <div className="space-y-0.5 max-h-[200px] overflow-y-auto pr-1">
              {renderTreeNode(tree)}
            </div>
          </div>
        ) : (
          <div className="text-xs text-green-400 mb-3">✅ Grundlagen-Modul — keine Voraussetzungen</div>
        )}

        {/* Wird gebraucht von */}
        {directDeps.length > 0 && (
          <div className="text-xs border-t border-slate-700/50 pt-2">
            <div className="text-slate-400 font-medium mb-1.5">🔓 Öffnet den Weg zu:</div>
            <div className="flex flex-wrap gap-1.5">
              {directDeps.map(depId => {
                const dn = nodes.find(n => n.id === depId);
                if (!dn) return null;
                const ok = doneModules.includes(depId);
                return (
                  <span key={depId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${ok ? "bg-green-500/10 text-green-300" : "bg-slate-800 text-slate-400"}`}>
                    {dn.icon} {dn.label}
                  </span>
                );
              })}
            </div>
            {allDeps.length > directDeps.length && (
              <div className="text-slate-500 mt-1.5">+{allDeps.length - directDeps.length} weitere downstream…</div>
            )}
          </div>
        )}
      </>
    );
  })();

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div ref={containerRef} className="relative w-full h-full select-none overflow-hidden">

      {/* Tabs — auf Mobile scrollbar */}
      <div className="absolute top-2 left-0 right-0 z-10 flex justify-center px-2">
        <div className="flex gap-1 bg-slate-900/90 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-700/50 shadow-xl overflow-x-auto max-w-full">
          {cats.map(c => {
            const a = cat === c.id;
            const { done: d, total: t } = catCount(c.id);
            return (
              <button key={c.id} onClick={() => switchCat(c.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${a ? "bg-slate-800 text-white shadow-lg" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"}`}
                style={a ? { boxShadow: `0 0 15px ${c.color}30` } : undefined}>
                <span>{c.icon}</span>
                <span className="hidden sm:inline">{c.label}</span>
                <span className="sm:hidden">{c.label.slice(0, 4)}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${a ? "bg-white/10" : "bg-slate-800"}`}>{d}/{t}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legende — auf Mobile ausblenden */}
      <div className="absolute top-2 right-2 z-10 hidden md:flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 text-xs">
        <div className="text-slate-300 font-medium mb-1">Knoten</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span className="text-slate-400">Abgeschlossen</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-slate-400">In Bearbeitung</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-gray-500"></span><span className="text-slate-400">Noch nicht gestartet</span></div>
        <div className="border-t border-slate-700/50 mt-1 pt-2 text-slate-300 font-medium">Verbindungen</div>
        <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-gray-500 rounded"></span><span className="text-slate-400">Abhängigkeit</span></div>
        <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-blue-500 rounded"></span><span className="text-slate-400">Aktiv</span></div>
        <div className="flex items-center gap-2"><span className="w-6 h-0.5 bg-green-500 rounded"></span><span className="text-slate-400">Beide fertig</span></div>
        <div className="border-t border-slate-700/50 mt-1 pt-1 text-slate-500">Shift+Drag = Verschieben</div>
        <div className="text-slate-500">Mausrad = Zoom</div>
        <div className="text-slate-500">Hover = Abhängigkeiten</div>
      </div>

      {/* Mobile-Hinweis */}
      {isMobile && !selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/90 backdrop-blur-sm rounded-xl px-4 py-2 border border-slate-700/50 text-xs text-slate-400 shadow-xl">
          👆 Tippen = Info &nbsp;|&nbsp; Zweimal = Öffnen &nbsp;|&nbsp; Ziehen = Verschieben &nbsp;|&nbsp; Pinch = Zoom
        </div>
      )}

      {/* SVG */}
      <svg ref={svgRef} className="w-full h-full"
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onContextMenu={e => e.preventDefault()}
        style={{ touchAction: "none" }}>

        {/* Kanten */}
        {edges.map((e, i) => renderEdge(e.from, e.to, i))}

        {/* Knoten */}
        {nodes.map(renderNode)}
      </svg>

      {/* Mobile Tooltip — Bottom Sheet */}
      {isMobile && selected && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-slate-900/98 backdrop-blur-md border-t border-slate-700/50 rounded-t-2xl p-4 pb-6 max-h-[60vh] overflow-y-auto shadow-2xl"
          onClick={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}>
          {/* Close-Button */}
          <button onClick={() => setSelected(null)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-slate-200">
            ✕
          </button>
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
