"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { InlineText } from "./InlineText";

interface GuidedStep {
  title: string;
  content: string;
}

interface GuidedExerciseProps {
  title: string;
  steps: string[]; // Each step is a string with content
  result: string;
}

/**
 * Interaktive geführte Aufgabe — Schritt für Schritt durchklicken.
 * Props werden per data-Attribut aus dem Content geparsed.
 */
export function GuidedExercise({ title, steps, result }: GuidedExerciseProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-blue-500/30 bg-gradient-to-br from-blue-500/5 to-violet-500/5">
      {/* Header */}
      <div className="px-5 py-3 bg-blue-500/10 border-b border-blue-500/20 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-blue-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wider">Geführte Aufgabe</h4>
          <p className="text-blue-200 text-sm"><InlineText text={title} /></p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="px-5 pt-4">
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < currentStep
                  ? "bg-blue-500"
                  : i === currentStep
                    ? "bg-blue-400 animate-pulse"
                    : "bg-slate-700"
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-1">Schritt {currentStep + 1} von {steps.length}</p>
      </div>

      {/* Current Step Content */}
      <div className="px-5 py-4">
        <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/40">
          <p className="text-slate-200 leading-relaxed"><InlineText text={steps[currentStep]} /></p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-5 pb-4 flex items-center justify-between">
        <button
          onClick={() => { setCurrentStep(Math.max(0, currentStep - 1)); setShowResult(false); }}
          disabled={currentStep === 0}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Zurück
        </button>

        {!isLastStep ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors"
          >
            Weiter <ChevronRight className="w-4 h-4" />
          </button>
        ) : !showResult ? (
          <button
            onClick={() => setShowResult(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg text-sm font-medium transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" /> Ergebnis
          </button>
        ) : null}
      </div>

      {/* Result */}
      {showResult && (
        <div className="px-5 pb-4">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-300 uppercase tracking-wider mb-1">Ergebnis</p>
              <p className="text-emerald-200"><InlineText text={result} /></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
