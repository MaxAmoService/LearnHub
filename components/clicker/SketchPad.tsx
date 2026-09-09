"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../AuthProvider";
import { Undo2, Trash2, Eraser, PenLine } from "lucide-react";

const SKETCH_KEY_PREFIX = "learnhub_clicker_sketch_";

interface Stroke {
  color: string;
  width: number;
  points: { x: number; y: number }[];
}

interface Point {
  x: number;
  y: number;
}

const COLORS = [
  { id: "white", value: "#e2e8f0" },
  { id: "amber", value: "#fbbf24" },
  { id: "sky", value: "#38bdf8" },
  { id: "red", value: "#f87171" },
  { id: "green", value: "#4ade80" },
  { id: "violet", value: "#c084fc" },
];

const BG_COLOR = "#0f172a";
const ERASER_WIDTH = 14;

export default function SketchPad() {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState(COLORS[0].value);
  const [eraser, setEraser] = useState(false);
  const drawingRef = useRef(false);
  const currentRef = useRef<Stroke | null>(null);
  const strokesRef = useRef(strokes);
  strokesRef.current = strokes;

  const sketchKey = useMemo(
    () => SKETCH_KEY_PREFIX + (user?.uid ?? "anon"),
    [user?.uid],
  );

  // Laden
  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(sketchKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Stroke[];
        if (Array.isArray(parsed)) setStrokes(parsed);
      }
    } catch { /* defekt → leeres Blatt */ }
  }, [sketchKey, user]);

  // Persistieren (debounced)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!user) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(sketchKey, JSON.stringify(strokesRef.current));
      } catch { /* quota */ }
    }, 800);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [strokes, sketchKey, user]);

  // Canvas-Größe an Container anpassen (inkl. Window-Resize)
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth;
      const h = Math.max(220, Math.min(420, Math.round(w * 0.75)));
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.height = `${h}px`;
        redraw();
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const stroke of strokesRef.current) {
      if (stroke.points.length < 2) continue;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * dpr;
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x * dpr, stroke.points[0].y * dpr);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x * dpr, stroke.points[i].y * dpr);
      }
      ctx.stroke();
    }
  }, []);

  // Bei Stroke-Änderungen neu zeichnen
  useEffect(() => {
    redraw();
  }, [strokes, redraw]);

  const toLocal = (e: React.PointerEvent): Point => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    const p = toLocal(e);
    const width = eraser
      ? ERASER_WIDTH
      : Math.max(1.5, Math.min(8, (e.pressure > 0 ? e.pressure : 0.5) * 8));
    currentRef.current = {
      color: eraser ? BG_COLOR : color,
      width,
      points: [p],
    };
    setStrokes((prev) => [...prev, currentRef.current!]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current || !currentRef.current) return;
    const p = toLocal(e);
    const last = currentRef.current.points[currentRef.current.points.length - 1];
    // Nur Punkte mit Mindestabstand aufnehmen (Performance)
    if (Math.hypot(p.x - last.x, p.y - last.y) < 1.5) return;
    currentRef.current.points.push(p);
    setStrokes((prev) => {
      const next = [...prev];
      next[next.length - 1] = { ...currentRef.current! };
      return next;
    });
  };

  const handlePointerUp = () => {
    drawingRef.current = false;
    currentRef.current = null;
  };

  const handleUndo = () => setStrokes((prev) => prev.slice(0, -1));
  const handleClear = () => setStrokes([]);

  if (!user) return null;

  return (
    <div className="p-3">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 mb-2 flex-wrap">
        <button
          onClick={() => setEraser((v) => !v)}
          className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-semibold transition-colors ${
            eraser
              ? "bg-slate-500/30 border-slate-400/60 text-white"
              : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200"
          }`}
        >
          <Eraser className="w-3.5 h-3.5" /> Radierer
        </button>
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setColor(c.value);
              setEraser(false);
            }}
            title={c.id}
            className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
              !eraser && color === c.value ? "border-white scale-110" : "border-transparent"
            }`}
            style={{ backgroundColor: c.value }}
          />
        ))}
        <button
          onClick={handleUndo}
          disabled={strokes.length === 0}
          className="ml-auto flex items-center gap-1 px-2 py-1 rounded-md border bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 disabled:opacity-30 text-[11px] font-semibold transition-colors"
        >
          <Undo2 className="w-3.5 h-3.5" /> Rückgängig
        </button>
        <button
          onClick={handleClear}
          disabled={strokes.length === 0}
          className="flex items-center gap-1 px-2 py-1 rounded-md border bg-red-500/10 border-red-500/40 text-red-300 hover:bg-red-500/20 disabled:opacity-30 text-[11px] font-semibold transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Löschen
        </button>
      </div>

      {/* Canvas */}
      <div ref={wrapRef} className="w-full">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg border border-slate-700/60 cursor-crosshair"
          style={{ touchAction: "none", backgroundColor: BG_COLOR }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        />
      </div>
      <p className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-500">
        <PenLine className="w-3 h-3" /> Stift-/Touch-freundlich — wird lokal gespeichert
      </p>
    </div>
  );
}
