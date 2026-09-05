"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { MessageSquare, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface LessonFeedbackProps {
  moduleSlug: string;
  moduleTitle: string;
  lessonId: string;
  lessonTitle: string;
}

type FeedbackCategory = "fehler" | "verbesserung" | "frage" | "sonstiges";

const CATEGORIES: { value: FeedbackCategory; label: string; icon: string }[] = [
  { value: "fehler", label: "Fehler gefunden", icon: "🐛" },
  { value: "verbesserung", label: "Verbesserung", icon: "💡" },
  { value: "frage", label: "Frage", icon: "❓" },
  { value: "sonstiges", label: "Sonstiges", icon: "📝" },
];

const RATE_LIMIT_KEY = "learnhub_feedback_last_submit";
const RATE_LIMIT_MS = 60_000; // 60 Sekunden

export function LessonFeedback({ moduleSlug, moduleTitle, lessonId, lessonTitle }: LessonFeedbackProps) {
  const { user } = useAuth();
  const [category, setCategory] = useState<FeedbackCategory>("fehler");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isRateLimited = (): boolean => {
    const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmit) return false;
    return Date.now() - parseInt(lastSubmit, 10) < RATE_LIMIT_MS;
  };

  const handleSubmit = async () => {
    setError(null);

    if (!message.trim()) {
      setError("Bitte gib einen Kommentar ein.");
      return;
    }

    if (message.trim().length < 10) {
      setError("Der Kommentar muss mindestens 10 Zeichen lang sein.");
      return;
    }

    if (message.trim().length > 2000) {
      setError("Der Kommentar darf maximal 2000 Zeichen lang sein.");
      return;
    }

    if (isRateLimited()) {
      setError("Du kannst nur einmal pro Minute Feedback senden.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
      const { getDb } = await import("@/lib/firebase");

      const today = new Date().toISOString().split("T")[0]; // "2026-06-08"

      await addDoc(collection(getDb(), "feedback"), {
        uid: user?.uid || "anonymous",
        username: user?.username || "anonymous",
        displayName: user?.displayName || "Anonym",
        moduleSlug,
        moduleTitle,
        lessonId,
        lessonTitle,
        category,
        message: message.trim(),
        date: today,
        createdAt: serverTimestamp(),
      });

      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      setSubmitted(true);
      setMessage("");
    } catch (err) {
      // Niemals Firebase-Fehlerdetails an Endbenutzer weitergeben!
      console.error("Feedback error:", err);
      setError("Fehler beim Senden. Bitte versuche es später erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <button
        onClick={() => { setSubmitted(false); setIsExpanded(false); }}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 transition-all text-sm font-semibold whitespace-nowrap shadow-lg shadow-emerald-500/5"
      >
        <CheckCircle2 className="w-4 h-4" />
        Feedback gesendet
      </button>
    );
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all text-sm font-semibold text-blue-400 hover:text-blue-300 whitespace-nowrap shadow-lg shadow-blue-500/5"
        title="Feedback zu dieser Lektion senden"
      >
        <MessageSquare className="w-4 h-4" />
        💬 Feedback
      </button>
    );
  }

  // Expanded: Full feedback form below the action buttons
  return (
    <div className="basis-full mt-2">
      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/40">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <h3 className="font-semibold text-white text-sm">Feedback senden</h3>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Schließen
          </button>
        </div>

        {/* Kategorie-Auswahl */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                category === cat.value
                  ? "bg-blue-500/20 border border-blue-500/50 text-blue-300"
                  : "bg-slate-700/30 border border-slate-700/40 text-slate-400 hover:text-slate-300 hover:border-slate-600"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          value={message}
          onChange={(e) => { setMessage(e.target.value); setError(null); }}
          placeholder={
            category === "fehler"
              ? "Beschreibe den Fehler möglichst genau..."
              : category === "verbesserung"
              ? "Was könnte verbessert werden?"
              : category === "frage"
              ? "Was ist deine Frage?"
              : "Dein Feedback..."
          }
          rows={3}
          maxLength={2000}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 resize-none transition-all"
        />

        {/* Zeichenzähler & Fehler */}
        <div className="flex items-center justify-between mt-2 mb-2">
          <div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            )}
          </div>
          <span className={`text-xs ${message.length > 1800 ? "text-amber-400" : "text-slate-500"}`}>
            {message.length}/2000
          </span>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-slate-600">
            {user ? `Als ${user.displayName} senden` : "Anonym senden"}
          </p>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim()}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg text-xs font-medium text-white transition-all disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Senden
          </button>
        </div>
      </div>
    </div>
  );
}
