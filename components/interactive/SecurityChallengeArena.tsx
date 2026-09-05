"use client";

import { useState } from "react";
import { Shield, Trophy, Star, ChevronRight, Filter, Lock, Code, Key, Eye, AlertTriangle, Award, Target, CheckCircle2 } from "lucide-react";

type Category = "injection" | "xss" | "auth" | "crypto" | "social";

interface Challenge {
  id: string;
  title: string;
  category: Category;
  difficulty: number;
  description: string;
  component: string;
}

const categories: { key: Category; label: string; icon: string; color: string }[] = [
  { key: "injection", label: "Injection", icon: "💉", color: "red" },
  { key: "xss", label: "XSS", icon: "🕸️", color: "orange" },
  { key: "auth", label: "Auth", icon: "🔑", color: "purple" },
  { key: "crypto", label: "Crypto", icon: "🔐", color: "blue" },
  { key: "social", label: "Social Eng.", icon: "🎣", color: "yellow" },
];

const challenges: Challenge[] = [
  { id: "inj-1", title: "Login Bypass", category: "injection", difficulty: 1, description: "Umgehe das Login mit einfacher SQL Injection", component: "sql" },
  { id: "inj-2", title: "Admin Login", category: "injection", difficulty: 2, description: "Logge dich als Admin ein mit Kommentar-Injection", component: "sql" },
  { id: "inj-3", title: "Data Exfiltration", category: "injection", difficulty: 3, description: "Lies Passwort-Hashes mit UNION SELECT aus", component: "sql" },
  { id: "inj-4", title: "Error-based Extraction", category: "injection", difficulty: 3, description: "Extrahiere Daten aus Fehlermeldungen", component: "sql" },
  { id: "inj-5", title: "Blind Extraction", category: "injection", difficulty: 4, description: "Nutze Zeit-Blindness um Daten auszulesen", component: "sql" },
  { id: "inj-6", title: "Stacked Queries", category: "injection", difficulty: 5, description: "Führe INSERT/UPDATE über Injection aus", component: "sql" },
  { id: "xss-1", title: "Alert Pop-up", category: "xss", difficulty: 1, description: "Lasse ein JavaScript-Alert erscheinen", component: "xss" },
  { id: "xss-2", title: "Cookie Steal", category: "xss", difficulty: 2, description: "Stehle Session-Cookies mit Stored XSS", component: "xss" },
  { id: "xss-3", title: "DOM Manipulation", category: "xss", difficulty: 3, description: "Manipuliere das DOM über URL-Parameter", component: "xss" },
  { id: "xss-4", title: "Event Handler", category: "xss", difficulty: 4, description: "Nutze HTML-Attribute für XSS", component: "xss" },
  { id: "xss-5", title: "CSP Bypass", category: "xss", difficulty: 5, description: "Umgehe die Content Security Policy", component: "xss" },
  { id: "auth-1", title: "Default Login", category: "auth", difficulty: 1, description: "Nutze Standard-Zugangsdaten", component: "auth" },
  { id: "auth-2", title: "PIN Crack", category: "auth", difficulty: 2, description: "Knacke eine 4-stellige PIN", component: "auth" },
  { id: "auth-3", title: "JWT Hack", category: "auth", difficulty: 3, description: "Manipuliere einen JWT Token", component: "auth" },
  { id: "auth-4", title: "Session Fix", category: "auth", difficulty: 4, description: "Session Fixation Angriff", component: "auth" },
  { id: "auth-5", title: "Reset Abuse", category: "auth", difficulty: 5, description: "Passwort-Reset über Social Engineering", component: "auth" },
  { id: "cry-1", title: "Base64 Decode", category: "crypto", difficulty: 1, description: "Erkenne und dechiffriere Base64", component: "crypto" },
  { id: "cry-2", title: "Hash Cracker", category: "crypto", difficulty: 2, description: "Knacke einen Passwort-Hash", component: "crypto" },
  { id: "se-1", title: "Phishing Mail", category: "social", difficulty: 1, description: "Erkenne Phishing-E-Mails", component: "phishing" },
  { id: "se-2", title: "Pretexting Call", category: "social", difficulty: 2, description: "Erkenne Social Engineering am Telefon", component: "phishing" },
  { id: "se-3", title: "Baiting USB", category: "social", difficulty: 3, description: "Erkenne Lockmittel-Angriffe", component: "phishing" },
];

export function SecurityChallengeArena() {
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<number | 0>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [points, setPoints] = useState(0);

  const filtered = challenges.filter((c) => {
    if (filterCategory !== "all" && c.category !== filterCategory) return false;
    if (filterDifficulty > 0 && c.difficulty !== filterDifficulty) return false;
    return true;
  });

  const toggleComplete = (id: string, difficulty: number) => {
    if (completedChallenges.has(id)) {
      setCompletedChallenges((prev) => { const n = new Set(prev); n.delete(id); return n; });
      setPoints((p) => p - difficulty * 100);
    } else {
      setCompletedChallenges((prev) => new Set([...prev, id]));
      setPoints((p) => p + difficulty * 100);
    }
  };

  const catStats = categories.map((cat) => {
    const catChallenges = challenges.filter((c) => c.category === cat.key);
    const done = catChallenges.filter((c) => completedChallenges.has(c.id)).length;
    return { ...cat, total: catChallenges.length, done, pct: catChallenges.length > 0 ? Math.round((done / catChallenges.length) * 100) : 0 };
  });

  const totalDone = completedChallenges.size;
  const totalChallenges = challenges.length;
  const overallPct = Math.round((totalDone / totalChallenges) * 100);

  const diffStars = (d: number) => "⭐".repeat(d);
  const maxPoints = challenges.reduce((s, c) => s + c.difficulty * 100, 0);
  const rating = points >= maxPoints * 0.9 ? 5 : points >= maxPoints * 0.7 ? 4 : points >= maxPoints * 0.5 ? 3 : points >= maxPoints * 0.3 ? 2 : points > 0 ? 1 : 0;

  const colorMap: Record<string, string> = {
    red: "border-red-500/30 bg-red-900/20 text-red-400",
    orange: "border-orange-500/30 bg-orange-900/20 text-orange-400",
    purple: "border-purple-500/30 bg-purple-900/20 text-purple-400",
    blue: "border-blue-500/30 bg-blue-900/20 text-blue-400",
    yellow: "border-yellow-500/30 bg-yellow-900/20 text-yellow-400",
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Security Challenge Arena
          </h3>
          <p className="text-slate-400 text-sm">OWASP Juice Shop inspiriert — löse alle Security-Challenges!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{points}</div>
            <div className="text-slate-500 text-xs">Punkte</div>
          </div>
          <div className="text-center">
            <div className="text-2xl">{rating > 0 ? "⭐".repeat(rating) : "—"}</div>
            <div className="text-slate-500 text-xs">Rating</div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-slate-900 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 text-sm font-medium">Gesamtfortschritt</span>
          <span className="text-slate-400 text-sm">{totalDone}/{totalChallenges} ({overallPct}%)</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
        </div>
        {/* Category Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {catStats.map((cat) => (
            <div key={cat.key} className={`rounded-lg p-2 border ${colorMap[cat.color]}`}>
              <div className="text-lg mb-1">{cat.icon}</div>
              <div className="text-xs font-medium">{cat.label}</div>
              <div className="text-xs opacity-70">{cat.done}/{cat.total}</div>
              <div className="h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-current rounded-full transition-all" style={{ width: `${cat.pct}%`, opacity: 0.6 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setFilterCategory("all")} className={`px-3 py-1.5 rounded-lg text-sm ${filterCategory === "all" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
          <Filter className="w-3 h-3 inline mr-1" /> Alle
        </button>
        {categories.map((cat) => (
          <button key={cat.key} onClick={() => setFilterCategory(cat.key)} className={`px-3 py-1.5 rounded-lg text-sm ${filterCategory === cat.key ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
            {cat.icon} {cat.label}
          </button>
        ))}
        <span className="text-slate-600">|</span>
        {[0, 1, 2, 3, 4, 5].map((d) => (
          <button key={d} onClick={() => setFilterDifficulty(d)} className={`px-2 py-1.5 rounded-lg text-xs ${filterDifficulty === d ? "bg-yellow-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}>
            {d === 0 ? "Alle" : "⭐".repeat(d)}
          </button>
        ))}
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {filtered.map((ch) => {
          const done = completedChallenges.has(ch.id);
          const cat = categories.find((c) => c.key === ch.category)!;
          return (
            <div
              key={ch.id}
              onClick={() => toggleComplete(ch.id, ch.difficulty)}
              className={`rounded-lg p-4 border cursor-pointer transition-all hover:scale-[1.02] ${
                done
                  ? "bg-green-900/20 border-green-700/50 hover:border-green-600"
                  : `bg-slate-900 border-slate-700 hover:border-slate-600`
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${colorMap[cat.color]}`}>{cat.label}</span>
                </div>
                {done ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Target className="w-5 h-5 text-slate-600" />}
              </div>
              <h4 className={`font-bold text-sm mb-1 ${done ? "text-green-300" : "text-white"}`}>{ch.title}</h4>
              <p className="text-slate-400 text-xs mb-2">{ch.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 text-sm">{diffStars(ch.difficulty)}</span>
                <span className={`text-xs font-mono ${done ? "text-green-400" : "text-slate-500"}`}>{ch.difficulty * 100} Pkt</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement */}
      {totalDone === totalChallenges && (
        <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg p-6 text-center">
          <Award className="w-14 h-14 text-emerald-400 mx-auto mb-3" />
          <h4 className="text-emerald-300 font-bold text-xl mb-2">🏆 Alle Challenges gelöst!</h4>
          <p className="text-emerald-400 text-sm">Du bist ein echter Security-Experte! {points} Punkte erreicht.</p>
          <p className="text-emerald-500 text-xs mt-2">Du kennst jetzt die wichtigsten OWASP-Schwachstellen aus dem FF.</p>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
        <p className="text-blue-300 text-sm flex items-start gap-2">
          <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            Inspiriert vom <strong>OWASP Juice Shop</strong> — der weltweit modernsten intentional vulnerable Web-App.
            Klicke auf eine Challenge um sie als gelöst zu markieren. Alle Challenges basieren auf realen OWASP Top 10 Schwachstellen.
          </span>
        </p>
      </div>
    </div>
  );
}
