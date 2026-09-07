"use client";

// /plans/[id] — Themenliste eines Plans: Reihenfolge, SM-2-Status, Modul-Links,
// Items editieren/umsortieren/hinzufügen/löschen, Plan-Einstellungen
// (Deadline, Lerntage, Puffer) mit derselben Vorschau wie im Wizard,
// Archivieren.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  Archive,
  ArrowLeft,
  CalendarDays,
  Check,
  Loader2,
  Pencil,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LoginModal } from "@/components/LoginModal";
import { PlanItemList, type PlanItemInput } from "@/components/PlanItemList";
import { PlanPreview } from "@/components/PlanPreview";
import { StudyDaysPicker } from "@/components/StudyDaysPicker";
import { formatDateKey, todayKey } from "@/lib/dates";
import {
  addPlanItem,
  archivePlan,
  deletePlanItem,
  loadPlan,
  loadPlanItems,
  reorderPlanItems,
  updatePlan,
  updatePlanItem,
  type PlanItemWithId,
  type PlanWithId,
} from "@/lib/plans";
import type { PlanLike } from "@/lib/scheduling";

export default function PlanDetailPage() {
  const params = useParams<{ planId: string }>();
  const planId = params.planId;
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [plan, setPlan] = useState<PlanWithId | null>(null);
  const [items, setItems] = useState<PlanItemWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Einstellungen
  const [showSettings, setShowSettings] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDeadline, setFormDeadline] = useState("");
  const [formStudyDays, setFormStudyDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [formBuffer, setFormBuffer] = useState(0);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  // Archivieren (zweistufig)
  const [confirmArchive, setConfirmArchive] = useState(false);

  const today = todayKey();

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [planRes, itemsRes] = await Promise.all([
        loadPlan(user.uid, planId),
        loadPlanItems(user.uid, planId),
      ]);
      if (!planRes) {
        setNotFound(true);
        return;
      }
      setPlan(planRes);
      setItems(itemsRes);
    } catch (err) {
      console.error("PlanDetailPage load error:", err);
      setError("Der Plan konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [user, planId]);

  useEffect(() => {
    if (user) load();
    else setLoading(false);
  }, [user, load]);

  function openSettings() {
    if (!plan) return;
    setFormTitle(plan.title ?? "");
    setFormDeadline(plan.deadline ?? "");
    setFormStudyDays(Array.isArray(plan.studyDays) ? plan.studyDays : []);
    setFormBuffer(plan.bufferDays ?? 0);
    setSettingsError(null);
    setShowSettings(true);
  }

  async function handleSaveSettings() {
    if (!user || !plan) return;
    if (formDeadline.length === 0 || formDeadline < today) {
      setSettingsError("Die Deadline darf nicht in der Vergangenheit liegen.");
      return;
    }
    if (formStudyDays.length === 0) {
      setSettingsError("Wähle mindestens einen Lerntag.");
      return;
    }
    setBusy(true);
    setSettingsError(null);
    try {
      await updatePlan(user.uid, plan.id, {
        title: formTitle.trim() || "Mein Lernplan",
        deadline: formDeadline,
        studyDays: formStudyDays,
        bufferDays: formBuffer,
      });
      setShowSettings(false);
      await load();
    } catch (err) {
      console.error("updatePlan error:", err);
      setSettingsError("Die Einstellungen konnten nicht gespeichert werden.");
    } finally {
      setBusy(false);
    }
  }

  async function handleAdd(data: PlanItemInput) {
    if (!user) return;
    await addPlanItem(user.uid, planId, data);
    await load();
  }

  async function handleUpdate(itemId: string, changes: Partial<PlanItemInput>) {
    if (!user) return;
    await updatePlanItem(user.uid, planId, itemId, changes);
    await load();
  }

  async function handleDelete(itemId: string) {
    if (!user) return;
    await deletePlanItem(user.uid, planId, itemId);
    await load();
  }

  async function handleMove(itemId: string, direction: "up" | "down") {
    if (!user) return;
    const index = items.findIndex((i) => i.id === itemId);
    const target = index + (direction === "up" ? -1 : 1);
    if (index < 0 || target < 0 || target >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setItems(reordered);

    try {
      await reorderPlanItems(user.uid, planId, reordered.map((i) => i.id));
    } catch (err) {
      console.error("reorderPlanItems error:", err);
      await load();
    }
  }

  async function handleArchive() {
    if (!user || !plan) return;
    setBusy(true);
    try {
      await archivePlan(user.uid, plan.id);
      router.push("/plans");
    } catch (err) {
      console.error("archivePlan error:", err);
      setBusy(false);
    }
  }

  if (isLoading || (user && loading)) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mt-8 text-center py-12 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <CalendarDays className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            Melde dich an, um deine Pläne zu sehen
          </h3>
          <button
            onClick={() => setShowLogin(true)}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all"
          >
            Anmelden
          </button>
        </div>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center py-16 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <h3 className="text-xl font-semibold text-slate-400 mb-2">Plan nicht gefunden</h3>
          <p className="text-slate-500 text-sm mb-6">
            Dieser Plan existiert nicht oder gehört einem anderen Konto.
          </p>
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück zu den Plänen
          </Link>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 flex-1">{error ?? "Plan konnte nicht geladen werden."}</p>
          <button onClick={load} className="text-sm font-semibold text-red-300 hover:text-red-200">
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  const settingsPreviewPlan: PlanLike = {
    deadline: formDeadline,
    studyDays: formStudyDays,
    bufferDays: formBuffer,
    createdAt: plan.createdAt ?? null,
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link
        href="/plans"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" /> Alle Pläne
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">{plan.title ?? "Unbenannter Plan"}</h1>
          <p className="flex items-center gap-1.5 text-sm text-slate-400 mt-1">
            <CalendarDays className="w-4 h-4" />
            Deadline {plan.deadline ? formatDateKey(plan.deadline) : "—"}
            {plan.bufferDays ? ` · ${plan.bufferDays} Puffertage` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openSettings}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-600/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors text-sm font-medium"
          >
            <Settings className="w-4 h-4" /> Einstellungen
          </button>
          {confirmArchive ? (
            <button
              onClick={handleArchive}
              disabled={busy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-semibold disabled:opacity-50"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Archive className="w-4 h-4" />}
              Wirklich archivieren?
            </button>
          ) : (
            <button
              onClick={() => setConfirmArchive(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
            >
              <Archive className="w-4 h-4" /> Archivieren
            </button>
          )}
        </div>
      </div>

      {plan.archivedAt != null && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-slate-600/40 bg-slate-800/40 p-3">
          <Archive className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <p className="text-sm text-slate-400">
            Dieser Plan ist archiviert — er taucht nicht mehr in deinem Tagesplan auf.
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 flex-1">{error}</p>
          <button onClick={load} className="text-sm font-semibold text-red-300 hover:text-red-200">
            Erneut versuchen
          </button>
        </div>
      )}

      {showSettings && (
        <div className="mb-8 glass rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-200">Plan-Einstellungen</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700/60 transition-colors"
              title="Schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="text-sm text-slate-300" htmlFor="settings-title">
              Titel
            </label>
            <input
              id="settings-title"
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300" htmlFor="settings-deadline">
              Deadline
            </label>
            <input
              id="settings-deadline"
              type="date"
              value={formDeadline}
              min={today}
              onChange={(e) => setFormDeadline(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white [color-scheme:dark]"
            />
          </div>

          <StudyDaysPicker
            studyDays={formStudyDays}
            onChange={setFormStudyDays}
            bufferDays={formBuffer}
            onBufferChange={setFormBuffer}
          />

          {formDeadline.length > 0 && (
            <PlanPreview plan={settingsPreviewPlan} items={items} today={today} />
          )}

          {settingsError && (
            <p className="text-sm text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {settingsError}
            </p>
          )}

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleSaveSettings}
              disabled={busy}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Speichern
            </button>
            <button
              onClick={() => setShowSettings(false)}
              disabled={busy}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-50"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-slate-200">
          Themen <span className="text-slate-500 text-sm font-normal">({items.length})</span>
        </h2>
        <span className="text-xs text-slate-500">
          <Pencil className="w-3 h-3 inline mr-1 -mt-0.5" />
          Reihenfolge mit den Pfeilen ändern
        </span>
      </div>

      <PlanItemList
        planId={plan.id}
        items={items}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </div>
  );
}
