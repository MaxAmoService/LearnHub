"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { allModules, categories } from "@/lib/data";
import { ModuleCard } from "@/components/ModuleCard";
import { useAuth } from "@/components/AuthProvider";
import { isExtendedUnlocked, unlockExtended } from "@/components/AdvancedGate";
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Sparkles,
  X,
  Filter,
  SlidersHorizontal,
  Lock,
} from "lucide-react";

export default function ModulesPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showCategoryDropdown) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showCategoryDropdown]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const extendedUnlocked = isExtendedUnlocked();

  const filteredModules = allModules.filter((m) => {
    if (m.hidden) return false; // Geheime Module nicht im Browser anzeigen
    // Passwortgeschützte Kategorien ausblenden wenn nicht freigeschaltet
    const cat = categories.find((c) => c.id === m.category);
    if (cat?.password && !extendedUnlocked) return false;
    const matchesSearch =
      !search ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedModules = useMemo(() => {
    return categories
      .map((cat) => ({
        ...cat,
        modules: filteredModules.filter((m) => m.category === cat.id),
      }))
      .filter((group) => group.modules.length > 0);
  }, [filteredModules]);

  const totalModules = allModules.length;
  const totalLessons = allModules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = user
    ? allModules.reduce((acc, m) => acc + (user.completedLessons[m.slug]?.length || 0), 0)
    : 0;
  const avgProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const selectedCat = categories.find((c) => c.id === selectedCategory);
  const activeFilterCount = (selectedCategory ? 1 : 0) + (search ? 1 : 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <section className="text-center py-6">
        <h1 className="text-2xl sm:text-4xl font-bold mb-2">
          <BookOpen className="inline-block w-7 h-7 sm:w-9 sm:h-9 mr-2 text-blue-400" />
          Lern-Module
        </h1>
        <p className="text-base sm:text-lg text-slate-400">Wähle ein Modul und starte deine Lernreise</p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-blue-400">{totalModules}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Module</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-emerald-400">{completedLessons}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Lektionen</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4 text-violet-400" />
            <p className="text-xl font-bold text-violet-400">{avgProgress}%</p>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">Ø Fortschritt</p>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="relative z-30">
        <div className="glass rounded-xl p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Suchen..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-800/80 border border-slate-700/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-500 text-sm transition-all"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg border transition-all text-sm font-medium whitespace-nowrap ${
                  selectedCategory
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                    : "bg-slate-800/80 border-slate-700/60 text-slate-300 hover:border-slate-600"
                }`}
              >
                {selectedCat ? (
                  <><span>{selectedCat.icon}</span><span className="hidden sm:inline">{selectedCat.name}</span></>
                ) : (
                  <><SlidersHorizontal className="w-4 h-4" /><span className="hidden sm:inline">Filter</span></>
                )}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`} />
              </button>

              {showCategoryDropdown && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 z-50 animate-slide-up">
                  <div className="p-2">
                    <button
                      onClick={() => { setSelectedCategory(null); setShowCategoryDropdown(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                        !selectedCategory ? "bg-blue-500/20 text-blue-400" : "text-slate-300 hover:bg-slate-800/80"
                      }`}
                    >
                      <span className="w-6 text-center">📋</span>
                      <span className="flex-1">Alle</span>
                      <span className="text-xs text-slate-500">{totalModules}</span>
                    </button>
                    {categories.map((cat) => {
                      const count = allModules.filter((m) => m.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => { setSelectedCategory(selectedCategory === cat.id ? null : cat.id); setShowCategoryDropdown(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                            selectedCategory === cat.id ? "bg-blue-500/20 text-blue-400" : "text-slate-300 hover:bg-slate-800/80"
                          }`}
                        >
                          <span className="w-6 text-center">{cat.icon}</span>
                          <span className="flex-1">{cat.name}</span>
                          <span className="text-xs text-slate-500">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-700/40">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-500/15 text-blue-400 text-xs rounded-lg font-medium">
                  {selectedCat?.icon} {selectedCat?.name}
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-white"><X className="w-3 h-3" /></button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-500/15 text-violet-400 text-xs rounded-lg font-medium">
                  &quot;{search}&quot;
                  <button onClick={() => setSearch("")} className="hover:text-white"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={() => { setSearch(""); setSelectedCategory(null); }} className="text-xs text-slate-500 hover:text-white ml-auto">
                Alle löschen
              </button>
            </div>
          )}
        </div>
        <p className="text-[11px] text-slate-600 text-center mt-1.5">
          {filteredModules.length} {filteredModules.length === 1 ? "Modul" : "Module"}
        </p>
      </section>

      {/* Modules */}
      {groupedModules.length > 0 ? (
        <div className="space-y-4">
          {groupedModules.map((group) => {
            const isExpanded = expandedCategories.has(group.id);
            return (
              <section key={group.id} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleCategory(group.id)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-slate-800/50 transition-colors text-left"
                >
                  <span className="text-2xl">{group.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold">{group.name}</h2>
                    <p className="text-slate-400 text-xs truncate">{group.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-slate-500">{group.modules.length}</span>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.modules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 glass rounded-xl">
          <p className="text-slate-400 mb-2">Keine Module gefunden</p>
          <button onClick={() => { setSearch(""); setSelectedCategory(null); }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors">
            Filter zurücksetzen
          </button>
        </div>
      )}

      {/* Erweitert-Kategorie: Passwort-geschützt */}
      {!extendedUnlocked && categories.some((c) => c.password) && (
        <section className="glass rounded-xl p-5 border-amber-500/20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎓</span>
            <div>
              <h2 className="text-base font-semibold text-amber-400">Erweitert</h2>
              <p className="text-slate-400 text-xs">Erweiterte Module — mit Passwort freischalten</p>
            </div>
            <Lock className="w-4 h-4 text-amber-500 ml-auto" />
          </div>
          <p className="text-slate-500 text-xs mb-3">
            Dieser Bereich enthält Module zu Mathe 1, Algorithmen, Datenbanken, KI, ML und weiteren
            Erweiterten Inhalten — inklusive Original-Prüfungsaufgaben.
          </p>
          <details className="group">
            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
              Passwort eingeben...
            </summary>
            <div className="mt-3 flex gap-2 max-w-sm">
              <input
                id="adv-password-input"
                type="password"
                placeholder="Passwort"
                className="flex-1 px-3 py-2 bg-slate-800/60 border border-slate-700/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const pw = (e.target as HTMLInputElement).value;
                    if (pw === "Extended") {
                      unlockExtended();
                      window.location.reload();
                    } else {
                      (e.target as HTMLInputElement).value = "";
                      (e.target as HTMLInputElement).classList.add("border-red-500/50");
                      setTimeout(() => (e.target as HTMLInputElement).classList.remove("border-red-500/50"), 800);
                    }
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.getElementById("adv-password-input") as HTMLInputElement;
                  if (!input) return;
                  if (input.value === "Extended") {
                    const { unlockExtended } = require("@/components/AdvancedGate");
                    unlockExtended();
                    window.location.reload();
                  } else {
                    input.value = "";
                    input.classList.add("border-red-500/50");
                    setTimeout(() => input.classList.remove("border-red-500/50"), 800);
                  }
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-medium transition-all"
              >
                Freischalten
              </button>
            </div>
          </details>
        </section>
      )}

      {/* Coming Soon */}
      <section className="glass rounded-xl p-5">
        <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" /> Demnächst
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "🐍", name: "Python" },
            { icon: "🗄️", name: "Datenbanken" },
            { icon: "📊", name: "ML / KI" },
          ].map((item) => (
            <div key={item.name} className="p-3 bg-slate-800/30 rounded-lg border border-dashed border-slate-700 text-center">
              <span className="text-xl block mb-1">{item.icon}</span>
              <span className="text-xs font-medium text-slate-500">{item.name}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
