"use client";

import React from "react";

/**
 * Statische Nassi-Shneiderman SVG-Diagramme für den Lektionstext.
 */

interface StrukExampleProps {
  example: "sequence" | "ifelse" | "while" | "forloop" | "bubblesort";
  className?: string;
}

const HEADER_H = 30;
const PAD = 6;

const COL = {
  seq: { fill: "#3b82f618", stroke: "#3b82f6" },
  loop: { fill: "#a855f718", stroke: "#a855f7" },
  if_: { fill: "#f59e0b18", stroke: "#f59e0b" },
  io: { fill: "#ec489918", stroke: "#ec4899" },
};

function R({ x, y, w, h, fill, stroke, rx = 3 }: { x: number; y: number; w: number; h: number; fill: string; stroke: string; rx?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />;
}

function T({ x, y, text, color = "#cbd5e1", size = 11, bold = false }: { x: number; y: number; text: string; color?: string; size?: number; bold?: boolean }) {
  return <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize={size} fontWeight={bold ? "bold" : "normal"} fontFamily="'JetBrains Mono', 'Fira Code', 'Courier New', monospace">{text}</text>;
}

function SequenceDiagram() {
  const W = 340;
  const H = HEADER_H * 3 + 4;
  return (
    <svg width={W} height={H + 20} viewBox={`0 0 ${W} ${H + 20}`} className="w-full h-auto">
      <R x={10} y={10} w={W - 20} h={HEADER_H} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={W / 2} y={10 + HEADER_H / 2} text="x = 5" />
      <R x={10} y={10 + HEADER_H + 2} w={W - 20} h={HEADER_H} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={W / 2} y={10 + HEADER_H * 1.5 + 2} text="y = x + 2" />
      <R x={10} y={10 + (HEADER_H + 2) * 2} w={W - 20} h={HEADER_H} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={W / 2} y={10 + HEADER_H * 2.5 + 4} text="print(y)" />
    </svg>
  );
}

function IfElseDiagram() {
  const W = 360;
  const W2 = (W - PAD * 2 - 8) / 2;
  const bodyH = 36;
  const totalH = HEADER_H + 18 + bodyH;

  return (
    <svg width={W} height={totalH + 20} viewBox={`0 0 ${W} ${totalH + 20}`} className="w-full h-auto">
      <R x={10} y={10} w={W - 20} h={totalH} fill="none" stroke={COL.if_.stroke + "40"} />
      <R x={10} y={10} w={W - 20} h={HEADER_H} fill={COL.if_.fill} stroke={COL.if_.stroke} />
      <line x1={10} y1={10 + HEADER_H} x2={30} y2={10} stroke={COL.if_.stroke} strokeWidth={1.5} />
      <T x={W / 2} y={10 + HEADER_H / 2} text="alter >= 18 ?" size={11} color="#fcd34d" bold />
      <T x={10 + W2 / 2} y={10 + HEADER_H + 12} text="JA ✓" size={9} color="#22c55e" bold />
      <T x={10 + PAD + W2 + 8 + W2 / 2} y={10 + HEADER_H + 12} text="NEIN ✗" size={9} color="#ef4444" bold />
      <line x1={10 + PAD + W2 + 4} y1={10 + HEADER_H} x2={10 + PAD + W2 + 4} y2={10 + totalH} stroke={COL.if_.stroke + "60"} strokeWidth={1} strokeDasharray="4 2" />
      <R x={10 + PAD} y={10 + HEADER_H + 18} w={W2} h={bodyH} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={10 + PAD + W2 / 2} y={10 + HEADER_H + 18 + bodyH / 2} text='print("Volljährig")' size={10} />
      <R x={10 + PAD + W2 + 8} y={10 + HEADER_H + 18} w={W2} h={bodyH} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={10 + PAD + W2 + 8 + W2 / 2} y={10 + HEADER_H + 18 + bodyH / 2} text='print("Minderjährig")' size={10} />
    </svg>
  );
}

function WhileDiagram() {
  const W = 340;
  const bodyH = 34;
  const totalH = HEADER_H + bodyH;

  return (
    <svg width={W} height={totalH + 20} viewBox={`0 0 ${W} ${totalH + 20}`} className="w-full h-auto">
      <R x={10} y={10} w={W - 20} h={totalH} fill="none" stroke={COL.loop.stroke + "40"} />
      <R x={10} y={10} w={W - 20} h={HEADER_H} fill={COL.loop.fill} stroke={COL.loop.stroke} />
      <path d={`M 10,${10 + HEADER_H} Q 10,10 24,10`} fill="none" stroke={COL.loop.stroke} strokeWidth={1.5} />
      <T x={W / 2} y={10 + HEADER_H / 2} text="while i < 10" size={11} color="#c4b5fd" bold />
      <R x={10 + PAD} y={10 + HEADER_H + 2} w={W - 20 - PAD * 2} h={bodyH - 4} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={W / 2} y={10 + HEADER_H + bodyH / 2 + 1} text="print(i); i = i + 1" size={10} />
    </svg>
  );
}

function ForLoopDiagram() {
  const W = 340;
  const bodyH = 34;
  const totalH = HEADER_H + bodyH;

  return (
    <svg width={W} height={totalH + 20} viewBox={`0 0 ${W} ${totalH + 20}`} className="w-full h-auto">
      <R x={10} y={10} w={W - 20} h={totalH} fill="none" stroke={COL.loop.stroke + "40"} />
      <R x={10} y={10} w={W - 20} h={HEADER_H} fill={COL.loop.fill} stroke={COL.loop.stroke} />
      <path d={`M 10,${10 + HEADER_H} Q 10,10 24,10`} fill="none" stroke={COL.loop.stroke} strokeWidth={1.5} />
      <T x={W / 2} y={10 + HEADER_H / 2} text="for i = 0 bis 9" size={11} color="#c4b5fd" bold />
      <R x={10 + PAD} y={10 + HEADER_H + 2} w={W - 20 - PAD * 2} h={bodyH - 4} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={W / 2} y={10 + HEADER_H + bodyH / 2 + 1} text="print(i)" size={10} />
    </svg>
  );
}

function BubbleSortDiagram() {
  const fullW = 420;
  const innerW = fullW - 20 - PAD * 2;
  const halfW = (innerW - 8) / 2;

  const ifBodyH = 30;
  const seqBlockH = 24;
  const seqGap = 2;
  const ifInnerH = HEADER_H + 16 + seqBlockH * 3 + seqGap * 2;
  const forJH = HEADER_H + ifInnerH + 8;
  const totalH = HEADER_H + forJH + 8;

  const innerY = 10 + HEADER_H + 4;
  const ifY = innerY + HEADER_H + 4;
  const seqY = ifY + HEADER_H + 16;
  const ifInnerW = innerW - PAD * 2;

  return (
    <svg width={fullW} height={totalH + 20} viewBox={`0 0 ${fullW} ${totalH + 20}`} className="w-full h-auto" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}>
      {/* Outer for */}
      <R x={10} y={10} w={fullW - 20} h={totalH} fill="none" stroke={COL.loop.stroke + "40"} />
      <R x={10} y={10} w={fullW - 20} h={HEADER_H} fill={COL.loop.fill} stroke={COL.loop.stroke} />
      <path d={`M 10,${10 + HEADER_H} Q 10,10 24,10`} fill="none" stroke={COL.loop.stroke} strokeWidth={1.5} />
      <T x={fullW / 2} y={10 + HEADER_H / 2} text="for i = 0 bis n-2" size={11} color="#c4b5fd" bold />

      {/* Inner for */}
      <R x={10 + PAD} y={innerY} w={innerW} h={forJH} fill="none" stroke={COL.loop.stroke + "40"} />
      <R x={10 + PAD} y={innerY} w={innerW} h={HEADER_H} fill={COL.loop.fill} stroke={COL.loop.stroke} />
      <path d={`M ${10 + PAD},${innerY + HEADER_H} Q ${10 + PAD},${innerY} ${10 + PAD + 14},${innerY}`} fill="none" stroke={COL.loop.stroke} strokeWidth={1.5} />
      <T x={10 + PAD + innerW / 2} y={innerY + HEADER_H / 2} text="for j = 0 bis n-2-i" size={10} color="#c4b5fd" bold />

      {/* if block */}
      <R x={10 + PAD * 2} y={ifY} w={ifInnerW} h={ifInnerH} fill="none" stroke={COL.if_.stroke + "40"} />
      <R x={10 + PAD * 2} y={ifY} w={ifInnerW} h={HEADER_H} fill={COL.if_.fill} stroke={COL.if_.stroke} />
      <line x1={10 + PAD * 2} y1={ifY + HEADER_H} x2={10 + PAD * 2 + 18} y2={ifY} stroke={COL.if_.stroke} strokeWidth={1.5} />
      <T x={10 + PAD * 2 + ifInnerW / 2} y={ifY + HEADER_H / 2} text="liste[j] > liste[j+1]?" size={9} color="#fcd34d" bold />

      {/* JA/NEIN */}
      <T x={10 + PAD * 2 + halfW / 2} y={ifY + HEADER_H + 10} text="JA ✓" size={8} color="#22c55e" bold />
      <T x={10 + PAD * 2 + halfW + 8 + halfW / 2} y={ifY + HEADER_H + 10} text="NEIN ✗" size={8} color="#ef4444" bold />
      <line x1={10 + PAD * 2 + halfW + 4} y1={ifY + HEADER_H} x2={10 + PAD * 2 + halfW + 4} y2={ifY + ifInnerH} stroke={COL.if_.stroke + "60"} strokeWidth={1} strokeDasharray="4 2" />

      {/* JA: 3 Sequenz-Blöcke */}
      <R x={10 + PAD * 3} y={seqY} w={halfW} h={seqBlockH} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={10 + PAD * 3 + halfW / 2} y={seqY + seqBlockH / 2} text="temp = liste[j]" size={9} />
      <R x={10 + PAD * 3} y={seqY + seqBlockH + seqGap} w={halfW} h={seqBlockH} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={10 + PAD * 3 + halfW / 2} y={seqY + seqBlockH + seqGap + seqBlockH / 2} text="liste[j] = liste[j+1]" size={9} />
      <R x={10 + PAD * 3} y={seqY + (seqBlockH + seqGap) * 2} w={halfW} h={seqBlockH} fill={COL.seq.fill} stroke={COL.seq.stroke} />
      <T x={10 + PAD * 3 + halfW / 2} y={seqY + (seqBlockH + seqGap) * 2 + seqBlockH / 2} text="liste[j+1] = temp" size={9} />

      {/* NEIN: leer */}
      <text x={10 + PAD * 2 + halfW + 8 + halfW / 2} y={seqY + 40} textAnchor="middle" dominantBaseline="middle" fill="#475569" fontSize={9} fontStyle="italic">—</text>
    </svg>
  );
}

export function StrukExample({ example, className = "" }: StrukExampleProps) {
  const diagrams: Record<string, JSX.Element> = {
    sequence: <SequenceDiagram />,
    ifelse: <IfElseDiagram />,
    while: <WhileDiagram />,
    forloop: <ForLoopDiagram />,
    bubblesort: <BubbleSortDiagram />,
  };

  return (
    <div className={`flex justify-center ${className}`}>
      {diagrams[example] || <p className="text-red-400">Unbekanntes Beispiel: {example}</p>}
    </div>
  );
}
