"use client";

// Graph-Ansicht des Skill Trees: organische x-Verteilung (Force-Layout),
// y fest an den Etagen — Basics unten, komplexe Inhalte oben (wie in der
// Etagen-Ansicht). Pan/Zoom per Maus, Touch (1-Finger Pan, 2-Finger Zoom).

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import {
  skillTreeNodes,
  getEdges,
  getNodeStatus,
  NODE_W,
  NODE_H,
  type SkillTreeNode,
  type NodeStatus,
} from "@/lib/skillTree";
import { computeGraphPositions } from "@/lib/skillTreeLayout";
import { useAuth } from "./AuthProvider";
import { allModules } from "@/lib/data";

const AVAILABLE_MODULES = new Set(allModules.map((m) => m.slug));

const COLORS: Record<NodeStatus, { bg: string; border: string; text: string; bar: string }> = {
  completed: { bg: "#052e1a", border: "#00ff88", text: "#00ff88", bar: "#00ff88" },
  "in-progress": { bg: "#0c1a2e", border: "#00aaff", text: "#00aaff", bar: "#00aaff" },
  "not-started": { bg: "#111827", border: "#374151", text: "#9ca3af", bar: "#4b5563" },
};

const ROW_H = 110;
const BAND_COLORS = ["rgba(148,163,184,0.04)", "rgba(148,163,184,0.02)"];

function getTouchDist(t: React.TouchList): number {
  if (t.length < 2) return 0;
  const dx = t[0].clientX - t[1].clientX;
  const dy = t[0].clientY - t[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

function getTouchCenter(t: React.TouchList): { x: number; y: number } {
  if (t.length < 2) return { x: t[0].clientX, y: t[0].clientY };
  return { x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 };
}

export function SkillTreeGraphView() {
  const { user } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [cat, setCat] = useState("mathe");
  const [hovered, setHovered] = useState<SkillTreeNode | null>(null);
  const [vb, setVb] = useState({ x: -300, y: -60, w: 1600, h: 700 });
  const [isMobile, setIsMobile] = useState(false);

  const touchRef = useRef({
    panning: false,
    pinchDist: 0,
    lastCenter: { x: 0, y: 0 },
    lastSingle: { x: 0, y: 0 },
  });

  const doneModules = user?.completedModules || [];
  const doneLessons = user?.completedLessons || {};

  const nodes = useMemo(() => skillTreeNodes.filter((n) => n.category === cat), [cat]);

  const positions = useMemo(() => computeGraphPositions(nodes, { seed: 42 }), [nodes]);

  const maxRow = useMemo(() => Math.max(...nodes.map((n) => n.row), 0), [nodes]);
  const rows = useMemo(() => [...new Set(nodes.map((n) => n.row))].sort((a, b) => a - b), [nodes]);

  // Initiales Zentrieren
  const initializedRef = useRef(false);
  useEffect(() => {
    if (initializedRef.current) return;
    if (positions.size === 0) return;
    initializedRef.current = true;
    centerView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions]);

  const centerView = useCallback(() => {
    let minX = Infinity, maxX = -Infinity;
    for (const [, p] of positions) {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
    }
    const pad = 180;
    const w = Math.max(600, maxX - minX + pad * 2 + NODE_W);
    const h = (maxRow + 1) * ROW_H + pad * 2;
    setVb({ x: minX - pad, y: -pad, w, h });
  }, [positions, maxRow]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Zoom (Wheel)
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

  // Maus-Pan
  const [mousePanning, setMousePanning] = useState(false);
  const [mousePan0, setMousePan0] = useState({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: React.MouseEvent) => {
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
    setVb((v) => ({ ...v, x: v.x - dx, y: v.y - dy }));
    setMousePan0({ x: e.clientX, y: e.clientY });
  }, [mousePanning, mousePan0, vb]);

  const onMouseUp = useCallback(() => setMousePanning(false), []);

  // Touch: 1-Finger Pan, 2-Finger Zoom
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = touchRef.current;
    if (e.touches.length === 2) {
      e.preventDefault();
      t.pinchDist = getTouchDist(e.touches);
      t.lastCenter = getTouchCenter(e.touches);
      t.panning = false;
    } else if (e.touches.length === 1) {
      t.lastSingle = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      t.panning = true;
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const t = touchRef.current;
    if (e.touches.length === 2) {
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
        setVb({ x: cx - ((center.x - r.left) / r.width) * nw, y: cy - ((center.y - r.top) / r.height) * nh, w: nw, h: nh });
      }
      if (t.lastCenter.x !== 0) {
        const dx = (center.x - t.lastCenter.x) * (vb.w / r.width);
        const dy = (center.y - t.lastCenter.y) * (vb.h / r.height);
        setVb((v) => ({ ...v, x: v.x - dx, y: v.y - dy }));
      }
      t.pinchDist = newDist;
      t.lastCenter = center;
      t.panning = false;
    } else if (e.touches.length === 1 && t.panning) {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const dx = (e.touches[0].clientX - t.lastSingle.x) * (vb.w / r.width);
      const dy = (e.touches[0].clientY - t.lastSingle.y) * (vb.h / r.height);
      setVb((v) => ({ ...v, x: v.x - dx, y: v.y - dy }));
      t.lastSingle = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [vb]);

  const onTouchEnd = useCallback(() => {
    const t = touchRef.current;
    t.panning = false;
    t.pinchDist = 0;
    t.lastCenter = { x: 0, y: 0 };
  }, []);

  const edges = useMemo(() => {
    const ids = new Set(nodes.map((n) => n.id));
    return getEdges(nodes).filter((e) => ids.has(e.from) && ids.has(e.to));
  }, [nodes]);

  const cats = [
    { id: "mathe", label: "Mathematik", icon: "📐", color: "#a855f7" },
    { id: "programmierung", label: "Programmierung", icon: "💻", color: "#f97316" },
    { id: "ihk", label: "IHK-Module", icon: "🏢", color: "#06b6d4" },
  ];

  const handleNodeClick = useCallback((node: SkillTreeNode) => {
    if (AVAILABLE_MODULES.has(node.id)) {
      window.location.href = `/modules/${node.id}`;
    }
  }, []);

  // ─── Rendering ────────────────────────────────────────────────────────────

  const renderEdge = (from: string, to: string, i: number) => {
    const fp = positions.get(from);
    const tp = positions.get(to);
    if (!fp || !tp) return null;
    const fn = nodes.find((n) => n.id === from);
    const tn = nodes.find((n) => n.id === to);
    if (!fn || !tn) return null;

    const fs = getNodeStatus(fn, doneModules, doneLessons);
    const ts = getNodeStatus(tn, doneModules, doneLessons);
    const bothDone = fs === "completed" && ts === "completed";
    const isActive = fs === "completed" && ts !== "completed";

    // Voraussetzung (unten, höheres y) → Kind (oben, niedrigeres y)
    const x1 = fp.x + NODE_W / 2;
    const y1 = fp.y;
    const x2 = tp.x + NODE_W / 2;
    const y2 = tp.y + NODE_H;
    const midY = (y1 + y2) / 2;
    const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

    let color: string, w: number, op: number;
    if (bothDone) { color = "#00ff88"; w = 2.5; op = 0.7; }
    else if (isActive) { color = "#00aaff"; w = 2; op = 0.55; }
    else { color = "#64748b"; w = 1.5; op = 0.25; }

    const arrowSize = 6;
    const spread = Math.PI / 5;
    const ax = x2 - arrowSize * Math.sin(spread);
    const ay = y2 + arrowSize * Math.cos(spread);
    const bx = x2 + arrowSize * Math.sin(spread);
    const by = y2 + arrowSize * Math.cos(spread);

    return (
      <g key={`e-${i}`}>
        <path d={d} fill="none" stroke={color} strokeWidth={w} opacity={op} strokeLinecap="round" />
        <polygon points={`${x2},${y2} ${ax},${ay} ${bx},${by}`} fill={color} opacity={op} />
      </g>
    );
  };

  const renderNode = (node: SkillTreeNode) => {
    const pos = positions.get(node.id);
    if (!pos) return null;
    const status = getNodeStatus(node, doneModules, doneLessons);
    const c = COLORS[status];
    const isH = hovered?.id === node.id;
    const prog = (doneLessons[node.id] || []).length;
    const isAvailable = AVAILABLE_MODULES.has(node.id);
    const pad = 8;

    return (
      <g
        key={node.id}
        transform={`translate(${pos.x}, ${pos.y})`}
        onMouseEnter={() => !isMobile && setHovered(node)}
        onMouseLeave={() => !isMobile && setHovered(null)}
        onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
        onTouchEnd={(e) => { e.stopPropagation(); handleNodeClick(node); }}
        className={isAvailable ? "cursor-pointer" : "cursor-default"}
      >
        <rect x={-pad} y={-pad} width={NODE_W + pad * 2} height={NODE_H + pad * 2} rx={16} fill="#020617" />
        {status !== "not-started" && (
          <rect x={-4} y={-4} width={NODE_W + 8} height={NODE_H + 8} rx={16} fill="none" stroke={c.border} strokeWidth="1.5" opacity={isH ? 0.6 : 0.2} />
        )}
        <rect width={NODE_W} height={NODE_H} rx={12} fill={c.bg} stroke={isH ? "#a855f7" : c.border} strokeWidth={isH ? 3 : 1.5} />
        <text x={14} y={26} fontSize="18" className="select-none pointer-events-none">{node.icon}</text>
        <text x={40} y={22} fontSize="11" fontWeight="600" fill={c.text} className="select-none pointer-events-none">
          {node.label.length > 16 ? node.label.slice(0, 16) + "…" : node.label}
        </text>
        <rect x={10} y={36} width={NODE_W - 20} height={5} rx={2.5} fill="rgba(255,255,255,0.04)" />
        {prog > 0 && (
          <rect x={10} y={36} width={Math.max(4, (NODE_W - 20) * Math.min(prog, 10) / 10)} height={5} rx={2.5} fill={c.bar} opacity={0.8} />
        )}
        <text x={12} y={52} fontSize="8" fill={c.text} opacity={0.6} className="select-none pointer-events-none">
          {!isAvailable ? "🔜 Bald verfügbar" : status === "completed" ? "✅ Fertig" : status === "in-progress" ? `📖 ${prog} Lektionen` : ""}
        </text>
        {!isAvailable && <rect width={NODE_W} height={NODE_H} rx={12} fill="rgba(15,23,42,0.5)" />}
      </g>
    );
  };

  return (
    <div className="w-full h-full relative">
      {/* Kategorie-Switcher */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 bg-slate-900/80 backdrop-blur rounded-xl p-1.5 border border-slate-700/50 shadow-xl">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setCat(c.id);
              setHovered(null);
              initializedRef.current = false;
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${cat === c.id ? "bg-slate-700 text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            {c.icon} {c.label}
          </button>
        ))}
        <button
          onClick={() => { initializedRef.current = false; centerView(); }}
          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
          title="Zentrieren"
        >
          ⤢
        </button>
      </div>

      {/* Legende */}
      <div className="absolute bottom-3 left-3 z-20 bg-slate-900/80 backdrop-blur rounded-xl px-3 py-2 border border-slate-700/50 text-[10px] space-y-1">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#00ff88" }} /> Abgeschlossen</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#00aaff" }} /> In Bearbeitung</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#4b5563" }} /> Noch nicht begonnen</div>
        <div className="pt-1 text-slate-500">Scrollen = Zoom · Ziehen = Verschieben</div>
      </div>

      {/* Graph */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <svg ref={svgRef} className="w-full h-full" viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}>
          {/* Etagen-Bänder (Basics unten → komplex oben) */}
          {rows.map((row, i) => {
            const yTop = (maxRow - row) * ROW_H;
            return (
              <g key={`band-${row}`}>
                <rect
                  x={vb.x}
                  y={yTop - ROW_H / 2}
                  width={vb.w}
                  height={ROW_H}
                  fill={BAND_COLORS[i % BAND_COLORS.length]}
                />
                <line x1={vb.x} y1={yTop + ROW_H / 2} x2={vb.x + vb.w} y2={yTop + ROW_H / 2} stroke="rgba(148,163,184,0.08)" strokeWidth="1" />
                <text
                  x={vb.x + 12}
                  y={yTop + 4}
                  fontSize="10"
                  fill="#64748b"
                  fontWeight="700"
                  className="select-none"
                >
                  {row === 0 ? "🏁 GRUNDLAGEN" : row === maxRow ? "🚀 FORTGESCHRITTEN" : `ETAGE ${row}`}
                </text>
              </g>
            );
          })}

          {edges.map((e, i) => renderEdge(e.from, e.to, i))}
          {nodes.map((n) => renderNode(n))}
        </svg>
      </div>
    </div>
  );
}
