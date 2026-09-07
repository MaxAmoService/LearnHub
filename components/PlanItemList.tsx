"use client";

// PlanItemList — Themenliste eines Plans (/plans/[id]): Status-Anzeige
// (SM-2), Umsortieren, Bearbeiten, Hinzufügen, Löschen. Die Persistenz
// liegt beim Aufrufer (lib/plans.ts), diese Komponente ist nur UI.

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Check,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { allModules, getModule } from "@/lib/data";
import { formatDateKey } from "@/lib/dates";
import { isConsolidated } from "@/lib/scheduling";
import type { PlanItemWithId } from "@/lib/plans";

export interface PlanItemInput {
  title: string;
  moduleSlug: string | null;
  weight: number;
  estimatedUnits: number;
}

interface PlanItemListProps {
  items: PlanItemWithId[];
  onAdd: (data: PlanItemInput) => Promise<void>;
  onUpdate: (itemId: string, changes: Partial<PlanItemInput>) => Promise<void>;
  onDelete: (itemId: string) => Promise<void>;
  onMove: (itemId: string, direction: "up" | "down") => Promise<void>;
}

const MODULE_OPTIONS = allModules.filter((m) => !m.hidden);

function itemStatus(item: PlanItemWithId): {
  label: string;
  className: string;
} {
  if (isConsolidated(item)) {
    return {
      label: "Gefestigt",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    };
  }
  if (item.nextDueAt != null) {
    return {
      label: `Nächste Wiederholung am ${formatDateKey(item.nextDueAt)}`,
      className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    };
  }
  return {
    label: "Neu",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  };
}

export function PlanItemList({
  items,
  onAdd,
  onUpdate,
  onDelete,
  onMove,
}: PlanItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function run(busy: string, action: () => Promise<void>) {
    setBusyId(busy);
    try {
      await action();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-2">
      {items.length === 0 && !showAddForm && (
        <p className="text-sm text-slate-500 py-4 text-center">
          Dieser Plan hat noch keine Themen.
        </p>
      )}

      {items.map((item, index) => {
        const status = itemStatus(item);
        const module = item.moduleSlug ? getModule(item.moduleSlug) : undefined;
        const isEditing = editingId === item.id;
        const isBusy = busyId === item.id;

        return (
          <div
            key={item.id}
            className="rounded-xl border border-slate-700/40 bg-slate-800/40 p-4"
          >
            {isEditing ? (
              <ItemForm
                initial={{
                  title: item.title ?? "",
                  moduleSlug: item.moduleSlug ?? null,
                  weight: item.weight ?? 1,
                  estimatedUnits: item.estimatedUnits ?? 1,
                }}
                busy={isBusy}
                submitLabel="Speichern"
                onSubmit={async (data) => {
                  await run(item.id, async () => {
                    await onUpdate(item.id, data);
                    setEditingId(null);
                  });
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 flex-shrink-0 rounded-md bg-slate-700/60 text-slate-400 text-xs font-bold flex items-center justify-center mt-0.5">
                  {index + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-200">{item.title ?? "Unbenanntes Thema"}</p>
                    {module && item.moduleSlug && (
                      <Link
                        href={`/modules/${item.moduleSlug}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" /> Modul öffnen
                      </Link>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${status.className}`}>
                      {status.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      Gewicht {item.weight ?? 1} · {(item.completedUnits ?? 0)}/
                      {item.estimatedUnits ?? 1} Einheiten
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => run(item.id, () => onMove(item.id, "up"))}
                    disabled={index === 0 || isBusy}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    title="Nach oben"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => run(item.id, () => onMove(item.id, "down"))}
                    disabled={index === items.length - 1 || isBusy}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    title="Nach unten"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmDeleteId(null);
                      setEditingId(item.id);
                    }}
                    disabled={isBusy}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-slate-700/60 transition-colors disabled:opacity-30"
                    title="Bearbeiten"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {confirmDeleteId === item.id ? (
                    <button
                      onClick={() =>
                        run(item.id, async () => {
                          await onDelete(item.id);
                          setConfirmDeleteId(null);
                        })
                      }
                      disabled={isBusy}
                      className="px-2 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs font-semibold transition-colors disabled:opacity-30"
                    >
                      Wirklich löschen?
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setConfirmDeleteId(item.id);
                      }}
                      disabled={isBusy}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-700/60 transition-colors disabled:opacity-30"
                      title="Löschen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {showAddForm ? (
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
          <ItemForm
            initial={{ title: "", moduleSlug: null, weight: 2, estimatedUnits: 4 }}
            busy={busyId === "__add__"}
            submitLabel="Thema hinzufügen"
            onSubmit={async (data) => {
              await run("__add__", async () => {
                await onAdd(data);
                setShowAddForm(false);
              });
            }}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      ) : (
        <button
          onClick={() => {
            setEditingId(null);
            setConfirmDeleteId(null);
            setShowAddForm(true);
          }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-slate-600/60 text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-800/40 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Thema hinzufügen
        </button>
      )}
    </div>
  );
}

// ─── Inline-Formular (Bearbeiten + Hinzufügen) ──────────────────────────────

function ItemForm({
  initial,
  busy,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  initial: PlanItemInput;
  busy: boolean;
  submitLabel: string;
  onSubmit: (data: PlanItemInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [moduleSlug, setModuleSlug] = useState<string | null>(initial.moduleSlug);
  const [weight, setWeight] = useState(initial.weight);
  const [estimatedUnits, setEstimatedUnits] = useState(initial.estimatedUnits);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (title.trim().length === 0) {
      setError("Bitte einen Titel angeben.");
      return;
    }
    const w = Math.min(Math.max(weight, 1), 5);
    const units = Math.max(estimatedUnits, 1);
    setError(null);
    await onSubmit({
      title: title.trim(),
      moduleSlug,
      weight: w,
      estimatedUnits: units,
    });
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs text-slate-400 mb-1">Titel</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z. B. Zahlensysteme und Codierung"
          className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white placeholder:text-slate-600"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Gewicht (1–5)</label>
          <input
            type="number"
            min={1}
            max={5}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value) || 1)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Einheiten</label>
          <input
            type="number"
            min={1}
            value={estimatedUnits}
            onChange={(e) => setEstimatedUnits(Number(e.target.value) || 1)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Modul (optional)</label>
          <select
            value={moduleSlug ?? ""}
            onChange={(e) => setModuleSlug(e.target.value || null)}
            className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white"
          >
            <option value="">Kein Modul</option>
            {MODULE_OPTIONS.map((m) => (
              <option key={m.slug} value={m.slug}>
                {m.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="flex items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-50"
        >
          <Check className="w-4 h-4" /> {submitLabel}
        </button>
        <button
          onClick={onCancel}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" /> Abbrechen
        </button>
      </div>
    </div>
  );
}
