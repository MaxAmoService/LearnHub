"use client";

// /plans — Übersicht aller Lernpläne. Der Fortschritt je Plan kommt aus den
// Items (isConsolidated), geladen über EINE Collection-Group-Query
// (loadAllPlanItems) — kein N-Pläne-Lese-Muster.

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, CalendarDays, Loader2, Plus } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { LoginModal } from "@/components/LoginModal";
import { PlanCard } from "@/components/PlanCard";
import { loadAllPlanItems, loadPlans, type PlanItemWithId, type PlanWithId } from "@/lib/plans";

export default function PlansPage() {
  const { user, isLoading } = useAuth();
  const [plans, setPlans] = useState<PlanWithId[]>([]);
  const [itemsByPlan, setItemsByPlan] = useState<Record<string, PlanItemWithId[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [plansRes, itemsRes] = await Promise.all([
        loadPlans(user.uid),
        loadAllPlanItems(user.uid),
      ]);
      setPlans(plansRes);
      setItemsByPlan(itemsRes);
    } catch (err) {
      console.error("PlansPage load error:", err);
      setError("Die Pläne konnten nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) load();
    else setLoading(false);
  }, [user, load]);

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
        <PageHeader />
        <div className="mt-8 text-center py-12 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <CalendarDays className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-400 mb-2">
            Melde dich an, um Lernpläne zu erstellen
          </h3>
          <p className="text-slate-500 text-sm mb-4">
            Pläne werden in deinem Konto gespeichert und sind auf allen Geräten verfügbar.
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

  const activePlans = plans.filter((p) => p.archivedAt == null);
  const archivedPlans = plans.filter((p) => p.archivedAt != null);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <PageHeader />
        <Link
          href="/plans/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" /> Neuer Plan
        </Link>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300 flex-1">{error}</p>
          <button onClick={load} className="text-sm font-semibold text-red-300 hover:text-red-200">
            Erneut versuchen
          </button>
        </div>
      )}

      {!error && activePlans.length === 0 && (
        <div className="text-center py-16 rounded-2xl bg-slate-800/40 border border-slate-700/40">
          <CalendarDays className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-400 mb-2">
            Noch keine Lernpläne
          </h3>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            Ein Lernplan sagt dir jeden Tag, was als Nächstes dran ist — mit
            fälligen Wiederholungen und einem realistischen Tagesziel bis zur
            Prüfung.
          </p>
          <Link
            href="/plans/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all"
          >
            <Plus className="w-4 h-4" /> Ersten Plan erstellen
          </Link>
        </div>
      )}

      {activePlans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} items={itemsByPlan[plan.id] ?? []} />
          ))}
        </div>
      )}

      {archivedPlans.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Archiviert
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-70">
            {archivedPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} items={itemsByPlan[plan.id] ?? []} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
        Lernpläne
      </h1>
      <p className="text-slate-400 mt-1">
        Themen mit Deadline, Tagesziel und Wiederholungen — bis zur Prüfung.
      </p>
    </div>
  );
}
