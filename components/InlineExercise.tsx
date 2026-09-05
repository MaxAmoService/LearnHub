"use client";

import { useState } from "react";
import { InlineText } from "./InlineText";

interface InlineExerciseProps {
  question: string;
  options?: { key: string; text: string }[];
  answer: string;
  explanation?: string;
}

export default function InlineExercise({ question, options, answer, explanation }: InlineExerciseProps) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isCorrect = options
    ? selected === answer
    : inputValue.trim().toLowerCase() === answer.trim().toLowerCase();

  const handleSubmit = () => {
    if (options && !selected) return;
    if (!options && !inputValue.trim()) return;
    setSubmitted(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setInputValue("");
    setSubmitted(false);
  };

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="my-2 w-8 h-8 rounded-full border border-violet-500/30 bg-violet-500/5 hover:bg-violet-500/15 hover:border-violet-500/50 hover:scale-110 transition-all flex items-center justify-center"
        title="Übung"
      >
        <span className="text-sm">🧪</span>
      </button>
    );
  }

  return (
    <div className="my-4 rounded-xl border border-violet-500/30 bg-violet-500/5 overflow-hidden">
      <div className="px-4 py-2 bg-violet-500/10 border-b border-violet-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🧪</span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-violet-300">Pause & Think</span>
        </div>
        <button onClick={() => { setExpanded(false); setSubmitted(false); setSelected(null); setInputValue(""); }} className="text-slate-500 hover:text-slate-300 text-[10px]">
          ✕
        </button>
      </div>

      <div className="px-4 pt-3 pb-2">
        <p className="text-sm text-slate-200 font-medium leading-relaxed"><InlineText text={question} /></p>
      </div>

      <div className="px-4 pb-3">
        {options ? (
          <div className="grid grid-cols-2 gap-1.5">
            {options.map((opt) => {
              const isSelected = selected === opt.key;
              const isAnswer = opt.key === answer;
              let style = "bg-slate-800/40 border-slate-700/40 hover:border-violet-500/40 hover:bg-violet-500/5 text-slate-300";
              if (submitted) {
                if (isAnswer) style = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300";
                else if (isSelected && !isAnswer) style = "bg-red-500/15 border-red-500/40 text-red-300";
                else style = "bg-slate-800/20 border-slate-700/20 text-slate-500";
              } else if (isSelected) {
                style = "bg-violet-500/15 border-violet-500/40 text-violet-300";
              }
              return (
                <button
                  key={opt.key}
                  onClick={() => !submitted && setSelected(opt.key)}
                  disabled={submitted}
                  className={`text-left px-3 py-2 rounded-lg border text-[13px] transition-all ${style}`}
                >
                  <span className="font-bold mr-1.5">{opt.key})</span>
                  <InlineText text={opt.text} />
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={submitted}
              placeholder="Deine Antwort..."
              className={`flex-1 px-3 py-2 rounded-lg border text-sm bg-slate-800/40 placeholder-slate-600 outline-none transition-all ${
                submitted
                  ? isCorrect
                    ? "border-emerald-500/40 text-emerald-300"
                    : "border-red-500/40 text-red-300"
                  : "border-slate-700/40 focus:border-violet-500/40 text-slate-200"
              }`}
            />
          </div>
        )}
      </div>

      <div className="px-4 pb-3">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={options ? !selected : !inputValue.trim()}
            className="px-4 py-1.5 rounded-lg bg-violet-500/20 border border-violet-500/40 text-[12px] font-bold text-violet-300 hover:bg-violet-500/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prüfen
          </button>
        ) : (
          <div className="space-y-2">
            <div className={`flex items-center gap-2 text-[12px] font-bold ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
              {isCorrect ? "✅ Richtig!" : `❌ Falsch — Richtige Antwort: ${answer}`}
            </div>
            {explanation && (
              <p className="text-[12px] text-slate-400 leading-relaxed"><InlineText text={explanation} /></p>
            )}
            {!isCorrect && (
              <button onClick={handleRetry} className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
                Nochmal versuchen
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
