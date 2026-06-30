"use client";

import { useState, useCallback } from "react";

// ============================================================================
// Boot Sequence Builder — Bootvorgang interaktiv zusammenbauen
// ============================================================================

interface BootStep {
  id: string;
  label: string;
  description: string;
}

const correctSteps: BootStep[] = [
  { id: "power", label: "Einschalten", description: "Stromversorgung wird aktiviert, Spannungsregler stabilisieren" },
  { id: "post", label: "POST", description: "Power-On Self-Test: CPU, RAM, Grafikkarte, Tastatur werden geprüft" },
  { id: "bios", label: "BIOS/UEFI laden", description: "Firmware wird aus ROM/Flash geladen und ausgeführt" },
  { id: "bootdevice", label: "Boot-Medium suchen", description: "Bootsequenz abarbeiten: HDD, SSD, USB, Netzwerk..." },
  { id: "mbr", label: "MBR/GPT lesen", description: "Master Boot Record oder GUID Partition Table wird gelesen" },
  { id: "bootloader", label: "Bootloader starten", description: "GRUB, Windows Boot Manager oder systemd-boot wird geladen" },
  { id: "kernel", label: "Kernel laden", description: "Betriebssystem-Kernel wird in den RAM geladen" },
  { id: "drivers", label: "Treiber laden", description: "Kernel lädt Gerätetreiber (Storage, Netzwerk, Display)" },
  { id: "init", label: "Init-Prozess", description: "Erster Prozess wird gestartet (systemd, init), Dienste werden gestartet" },
  { id: "login", label: "Login", description: "Anmeldebildschirm wird angezeigt — System ist bereit" },
];

function shuffle<T>(array: T[]): T[] {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BootSequenceBuilder() {
  const [steps, setSteps] = useState(() => shuffle(correctSteps));
  const [checked, setChecked] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const moveStep = (from: number, to: number) => {
    if (from === to) return;
    const next = [...steps];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    setSteps(next);
    setChecked(false);
  };

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx !== null && dragIdx !== idx) {
      moveStep(dragIdx, idx);
      setDragIdx(idx);
    }
  };
  const handleDragEnd = () => setDragIdx(null);

  const checkOrder = () => setChecked(true);

  const isCorrect = (idx: number) => steps[idx].id === correctSteps[idx].id;

  const reset = () => {
    setSteps(shuffle(correctSteps));
    setChecked(false);
  };

  const correctCount = steps.filter((s, i) => s.id === correctSteps[i].id).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Bringe die Boot-Schritte in die richtige Reihenfolge. Ziehe die Schritte per Drag & Drop.
      </p>

      <div className="space-y-1.5">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all ${
              checked
                ? isCorrect(idx)
                  ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                  : "border-red-400 bg-red-50 dark:bg-red-900/20"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-amber-300"
            }`}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-500">
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">{step.label}</div>
              {checked && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.description}</div>
              )}
            </div>
            {checked && (
              <div className="text-lg">
                {isCorrect(idx) ? "✓" : "✗"}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={checkOrder}
          className="px-4 py-2 rounded-lg bg-amber-500 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
        >
          Prüfen
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Neu mischen
        </button>
      </div>

      {checked && (
        <div className={`text-center text-sm font-semibold ${correctCount === 10 ? "text-green-600" : "text-amber-600"}`}>
          {correctCount}/10 richtig {correctCount === 10 && "— Perfekt!"}
        </div>
      )}
    </div>
  );
}
