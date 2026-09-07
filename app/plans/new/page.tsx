"use client";

// /plans/new — 4-Schritte-Wizard. Zustand liegt ausschließlich im
// React-State; gespeichert wird erst am Ende von Schritt 4 über
// createPlanFromTemplate bzw. createEmptyPlan. Die Vorschau in Schritt 4
// rechnet live über lib/scheduling.ts.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  FilePlus2,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LoginModal } from "@/components/LoginModal";
import { PlanPreview } from "@/components/PlanPreview";
import { StudyDaysPicker } from "@/components/StudyDaysPicker";
import { todayKey } from "@/lib/dates";
import { createEmptyPlan, createPlanFromTemplate, loadPlanTemplates, type PlanTemplate } from "@/lib/plans";
import type { PlanLike } from "@/lib/scheduling";

const STEPS = ["Vorlage", "Deadline", "Lerntage", "Vorschau"];

export default function NewPlanPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [templates, setTemplates] = useState<PlanTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templatesError, setTemplatesError] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null | undefined>(undefined); // undefined = nichts gewählt, null = leerer Plan
  const [deadline, setDeadline] = useState("");
  const [studyDays, setStudyDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [bufferDays, setBufferDays] = useState(0);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const today = todayKey();
  const selectedTemplate = templates.find((t) => t.slug === selectedSlug) ?? null;

  useEffect(() => {
    loadPlanTemplates()
      .then(setTemplates)
      .catch((err) => {
        console.error("loadPlanTemplates error:", err);
        setTemplatesError(true);
      })
      .finally(() => setTemplatesLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <WizardHeader step={1} />
        <div className="mt-8 text-center py-12 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            Melde dich an, um einen Lernplan zu erstellen
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            Dein Plan wird in deinem Konto gespeichert.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all"
          >
            Anmelden
          </button>
        </div>
        <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      </div>
    );
  }

  function canContinue(): boolean {
    if (step === 1) return selectedSlug !== undefined;
    if (step === 2) return deadline.length > 0 && deadline >= today;
    if (step === 3) return studyDays.length > 0;
    return false;
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    try {
      let planId: string;
      if (selectedTemplate) {
        planId = await createPlanFromTemplate(user!.uid, selectedTemplate.slug, {
          deadline,
          studyDays,
          bufferDays,
        });
      } else {
        planId = await createEmptyPlan(user!.uid, {
          title: title.trim() || "Mein Lernplan",
          deadline,
          studyDays,
          bufferDays,
        });
      }
      router.push(`/plans/${planId}`);
    } catch (err) {
      console.error("create plan error:", err);
      setSaveError("Der Plan konnte nicht gespeichert werden. Bitte versuche es erneut.");
      setSaving(false);
    }
  }

  const previewPlan: PlanLike = {
    deadline,
    studyDays,
    bufferDays,
    createdAt: new Date().toISOString(),
  };
  const previewItems = selectedTemplate?.items ?? [];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <WizardHeader step={step} />

      <div className="mt-8 glass rounded-2xl p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-200">
              Mit welcher Vorlage startest du?
            </h2>

            {templatesLoading && (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
              </div>
            )}

            {templatesError && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">
                  Die Vorlagen konnten nicht geladen werden. Du kannst trotzdem
                  mit einem leeren Plan starten.
                </p>
              </div>
            )}

            {!templatesLoading && !templatesError && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {templates.map((template) => {
                  const active = selectedSlug === template.slug;
                  return (
                    <button
                      key={template.slug}
                      onClick={() => setSelectedSlug(template.slug)}
                      className={`text-left rounded-xl border p-4 transition-all ${
                        active
                          ? "border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-500/40"
                          : "border-slate-700/40 bg-slate-800/40 hover:border-slate-600/60"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-semibold text-white">{template.title}</p>
                        {active && <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-slate-500 mb-2">{template.examType}</p>
                      <p className="text-sm text-slate-400">{template.description}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {template.items?.length ?? 0} Themen
                      </p>
                    </button>
                  );
                })}
              </div>
            )}

            <button
              onClick={() => setSelectedSlug(null)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                selectedSlug === null
                  ? "border-blue-500/60 bg-blue-500/10 ring-1 ring-blue-500/40"
                  : "border-slate-700/40 bg-slate-800/40 hover:border-slate-600/60"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="font-semibold text-white">Leeren Plan starten</p>
                {selectedSlug === null && <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />}
              </div>
              <p className="text-sm text-slate-400">
                <FilePlus2 className="w-4 h-4 inline mr-1 -mt-0.5" />
                Du legst alle Themen selbst an.
              </p>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-200">
              Bis wann willst du fertig sein?
            </h2>
            {selectedTemplate ? (
              <p className="text-sm text-slate-400">
                Vorlage <span className="text-slate-200 font-medium">{selectedTemplate.title}</span> —{" "}
                {selectedTemplate.items?.length ?? 0} Themen.
              </p>
            ) : (
              <div className="space-y-1">
                <label className="text-sm text-slate-300" htmlFor="plan-title">
                  Name des Plans
                </label>
                <input
                  id="plan-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Mein Lernplan"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white placeholder:text-slate-600"
                />
              </div>
            )}
            <div>
              <label className="text-sm text-slate-300" htmlFor="plan-deadline">
                Deadline
              </label>
              <input
                id="plan-deadline"
                type="date"
                value={deadline}
                min={today}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white [color-scheme:dark]"
              />
              <p className="text-xs text-slate-500 mt-1.5">
                Daten in der Vergangenheit sind nicht möglich.
              </p>
            </div>
          </div>
        )}

        {step === 3 && (
          <StudyDaysPicker
            studyDays={studyDays}
            onChange={setStudyDays}
            bufferDays={bufferDays}
            onBufferChange={setBufferDays}
          />
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-200 mb-1">Dein Plan im Check</h2>
              <p className="text-sm text-slate-400">
                So sieht dein Plan bis zur Deadline aus — berechnet aus Deadline,
                Lerntagen, Puffer und den Themen der Vorlage.
              </p>
            </div>

            <div className="rounded-lg bg-slate-900/40 border border-slate-700/40 p-3 text-sm text-slate-300">
              {selectedTemplate ? (
                <span>
                  {selectedTemplate.title} · {selectedTemplate.items?.length ?? 0} Themen · Deadline{" "}
                  {deadline} · {studyDays.length} Lerntage/Woche
                  {bufferDays > 0 ? ` · ${bufferDays} Puffertage` : ""}
                </span>
              ) : (
                <span>
                  {title.trim() || "Mein Lernplan"} · keine Themen · Deadline {deadline} ·{" "}
                  {studyDays.length} Lerntage/Woche
                  {bufferDays > 0 ? ` · ${bufferDays} Puffertage` : ""}
                </span>
              )}
            </div>

            <PlanPreview plan={previewPlan} items={previewItems} today={today} />

            {saveError && (
              <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{saveError}</p>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Plan erstellen
            </button>
          </div>
        )}

        {/* Navigation */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-700/40">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück
            </button>
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canContinue()}
              className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-40 disabled:pointer-events-none"
            >
              Weiter <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WizardHeader({ step }: { step: number }) {
  return (
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
        Neuer Lernplan
      </h1>
      <div className="flex items-center gap-2 mt-4">
        {STEPS.map((label, index) => {
          const number = index + 1;
          const active = number === step;
          const done = number < step;
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                  active
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                    : done
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                      : "bg-slate-800/60 text-slate-500 border border-slate-700/50"
                }`}
              >
                <span>{done ? "✓" : number}</span>
                <span className="hidden sm:inline">{label}</span>
              </div>
              {number < STEPS.length && (
                <div className={`w-4 h-px ${done ? "bg-emerald-500/40" : "bg-slate-700"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
