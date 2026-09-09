// Antwort-Bewertung über ALLE migrierten Modul-Aufgaben — deckt ab, was
// verify-module-migration.ts nicht kann: dass jede Aufgabe mit ihrer
// kanonischen Antwort wirklich als richtig gewertet wird (inkl. des
// reparierten Alt-Datenfehlers is-14) und dass die Abschluss-Bewertung
// (gradeExerciseAnswer) die exakt gleiche Funktion ist, die die UI nutzt.

import * as fs from "fs";
import * as path from "path";
import { describe, expect, it } from "vitest";
import { gradeExerciseAnswer } from "@/lib/exercises/grading";
import {
  isChoiceExercise,
  isNumericExercise,
  type Exercise,
} from "@/lib/exercises/types";

const MODULES_DIR = path.join(__dirname, "..", "content", "exercises", "modules");

interface ModuleFile {
  moduleSlug: string;
  practice: Exercise[];
  exam: Exercise[];
}

function loadAllExercises(): { slug: string; pool: "practice" | "exam"; exercise: Exercise }[] {
  const out: { slug: string; pool: "practice" | "exam"; exercise: Exercise }[] = [];
  for (const file of fs.readdirSync(MODULES_DIR)) {
    if (!file.endsWith(".json")) continue;
    const data = JSON.parse(fs.readFileSync(path.join(MODULES_DIR, file), "utf8")) as ModuleFile;
    for (const pool of ["practice", "exam"] as const) {
      for (const ex of data[pool]) {
        out.push({ slug: data.moduleSlug, pool, exercise: ex });
      }
    }
  }
  return out;
}

const all = loadAllExercises();

describe("gradeExerciseAnswer über alle Modul-Pools", () => {
  it("lädt alle Pools (Mehrzahl der Module, beide Pools)", () => {
    const slugs = new Set(all.map((e) => e.slug));
    expect(slugs.size).toBeGreaterThanOrEqual(40);
    const pools = new Set(all.map((e) => e.pool));
    expect(pools).toEqual(new Set(["practice", "exam"]));
  });

  it("enthält nur choice|numeric (Konverter-Garantie)", () => {
    for (const { slug, pool, exercise } of all) {
      const ok = isChoiceExercise(exercise) || isNumericExercise(exercise);
      expect(ok, `${slug}/${pool}/${exercise.id}: Typ ${exercise.type} nicht erlaubt`).toBe(true);
    }
  });

  it("wertet jede kanonische Antwort als richtig", () => {
    for (const { slug, pool, exercise } of all) {
      if (isChoiceExercise(exercise)) {
        expect(
          gradeExerciseAnswer(exercise, { userAnswer: "", selectedOption: exercise.correctIndex }),
          `${slug}/${pool}/${exercise.id} (choice, correctIndex ${exercise.correctIndex})`,
        ).toBe(true);
      } else if (isNumericExercise(exercise)) {
        expect(
          gradeExerciseAnswer(exercise, { userAnswer: String(exercise.answer), selectedOption: null }),
          `${slug}/${pool}/${exercise.id} (numeric, answer ${exercise.answer})`,
        ).toBe(true);
      }
    }
  });

  it("wertet falsche Antworten als falsch (auch die is-14-Klasse)", () => {
    for (const { slug, pool, exercise } of all) {
      if (isChoiceExercise(exercise)) {
        const wrongIndex = (exercise.correctIndex + 1) % exercise.options.length;
        if (wrongIndex === exercise.correctIndex) continue; // nur 1 Option? darf nicht vorkommen
        expect(
          gradeExerciseAnswer(exercise, { userAnswer: "", selectedOption: wrongIndex }),
          `${slug}/${pool}/${exercise.id} (choice)`,
        ).toBe(false);
      } else if (isNumericExercise(exercise)) {
        let wrong: string;
        if (typeof exercise.answer === "number") {
          const step = exercise.tolerance ? exercise.tolerance * 10 + 1 : 1;
          const accepted = new Set((exercise.acceptedAnswers ?? []).map((a) => parseFloat(a)));
          let candidate = exercise.answer + step;
          // Nicht zufällig auf eine gültige Alternativlösung treffen
          while (accepted.has(candidate) || candidate === exercise.answer) candidate += step;
          wrong = String(candidate);
        } else {
          // String-Antworten mit Toleranz werden numerisch verglichen
          // (parseFloat) — eine weit entfernte Zahl ist unter beiden
          // Vergleichspfaden falsch.
          wrong = "999999";
        }
        expect(
          gradeExerciseAnswer(exercise, { userAnswer: wrong, selectedOption: null }),
          `${slug}/${pool}/${exercise.id} (numeric)`,
        ).toBe(false);
      }
    }
  });

  it("akzeptiert alle acceptedAnswers (Lösungsmengen, vertauschte Komma-Listen)", () => {
    let checked = 0;
    for (const { slug, pool, exercise } of all) {
      if (!isNumericExercise(exercise)) continue;
      for (const alt of exercise.acceptedAnswers ?? []) {
        expect(
          gradeExerciseAnswer(exercise, { userAnswer: alt, selectedOption: null }),
          `${slug}/${pool}/${exercise.id} (accepted: ${alt})`,
        ).toBe(true);
        checked++;
      }
    }
    expect(checked).toBeGreaterThan(0);
  });

  it("wertet die reparierte is-14-Salting-Frage als Choice mit korrekter Antwort", () => {
    const salting = all.find(
      (e) => e.slug === "ihk-it-sicherheit" && e.exercise.id === "ihk-it-sicherheit-ex-14",
    );
    expect(salting).toBeDefined();
    const ex = salting!.exercise;
    expect(isChoiceExercise(ex)).toBe(true);
    if (!isChoiceExercise(ex)) return;
    expect(ex.correctIndex).toBe(1);
    expect(ex.options[1]).toContain("unterschiedliche Hashes");
    expect(
      gradeExerciseAnswer(ex, { userAnswer: "", selectedOption: 1 }),
    ).toBe(true);
    expect(
      gradeExerciseAnswer(ex, { userAnswer: "", selectedOption: 0 }),
    ).toBe(false);
  });
});
