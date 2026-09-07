"use client";

// StudyDaysPicker — Wochentags-Mehrfachauswahl + Puffertage.
// Genutzt vom Wizard (/plans/new) und vom Einstellungsbereich auf
// /plans/[id], damit beide dieselbe Auswahl-Logik teilen.

const DAY_NAMES = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

interface StudyDaysPickerProps {
  studyDays: number[];
  onChange: (days: number[]) => void;
  bufferDays: number;
  onBufferChange: (days: number) => void;
}

export function StudyDaysPicker({
  studyDays,
  onChange,
  bufferDays,
  onBufferChange,
}: StudyDaysPickerProps) {
  function toggleDay(day: number) {
    if (studyDays.includes(day)) {
      onChange(studyDays.filter((d) => d !== day));
    } else {
      onChange([...studyDays, day].sort((a, b) => a - b));
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-slate-300 mb-2">An welchen Tagen lernst du?</p>
        <div className="flex flex-wrap gap-2">
          {DAY_NAMES.map((name, index) => {
            const day = index + 1;
            const active = studyDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`w-12 h-12 rounded-xl font-semibold text-sm transition-all ${
                  active
                    ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/60 border border-slate-700/60"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
        {studyDays.length === 0 && (
          <p className="text-xs text-amber-400 mt-2">
            Wähle mindestens einen Lerntag — sonst gibt es keine Lerntage.
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-300" htmlFor="buffer-days">
          Puffertage
        </label>
        <input
          id="buffer-days"
          type="number"
          min={0}
          max={30}
          value={bufferDays}
          onChange={(e) =>
            onBufferChange(Math.min(Math.max(Number(e.target.value) || 0, 0), 30))
          }
          className="w-20 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 focus:border-blue-500 outline-none text-sm text-white"
        />
        <p className="text-xs text-slate-500">
          Reservierte Tage als Puffer (Krankheit, Klausuren …) — sie werden
          vom Tagesziel abgezogen.
        </p>
      </div>
    </div>
  );
}
