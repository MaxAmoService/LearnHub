// Registry-Validierung: jede registrierte Übungsdatei strukturell prüfen
// (IDs eindeutig, Typ-Felder konsistent, Indizes in Grenzen). Reine Funktionen,
// keine Firebase-/Component-Tests. Schützt die handgepflegten JSON-Dateien.

import { describe, expect, it } from "vitest";
import { getExerciseFiles, getExercisesForTopic, getExerciseFile } from "@/lib/exercises/registry";
import {
  isChoiceExercise,
  isMatchExercise,
  isNumericExercise,
  isRecallExercise,
} from "@/lib/exercises/types";

describe("exercises registry", () => {
  const files = getExerciseFiles();

  it("registriert Dateien mit eindeutigen topicSlugs", () => {
    const slugs = files.map((f) => f.topicSlug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("löst jeden topicSlug über getExerciseFile/getExercisesForTopic auf", () => {
    for (const file of files) {
      expect(getExerciseFile(file.topicSlug)).toBe(file);
      expect(getExercisesForTopic(file.topicSlug).length).toBe(file.exercises.length);
    }
    expect(getExercisesForTopic("gibt-es-nicht")).toEqual([]);
    expect(getExerciseFile("gibt-es-nicht")).toBeUndefined();
  });

  for (const file of files) {
    it(`${file.topicSlug}: Struktur gültig`, () => {
      expect(file.planTemplateSlug).toBe("ap1-it-berufe");
      expect(["generated", "procedural", "existing", "manual"]).toContain(file.source);
      if (file.source === "generated") expect(file.generatedWith).toBeTruthy();
      expect(file.exercises.length).toBeGreaterThan(0);

      const ids = file.exercises.map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);

      for (const ex of file.exercises) {
        expect([1, 2, 3]).toContain(ex.difficulty);
        expect(ex.prompt.length).toBeGreaterThan(0);
        if (isNumericExercise(ex)) {
          expect(typeof ex.answer === "number" || typeof ex.answer === "string").toBe(true);
          expect(ex.explanation.length).toBeGreaterThan(0);
          if (ex.calculation !== undefined) expect(ex.calculation.length).toBeGreaterThan(0);
        } else if (isChoiceExercise(ex)) {
          expect(ex.options.length).toBeGreaterThanOrEqual(3);
          expect(ex.options.length).toBeLessThanOrEqual(6);
          expect(ex.correctIndex).toBeGreaterThanOrEqual(0);
          expect(ex.correctIndex).toBeLessThan(ex.options.length);
          expect(new Set(ex.options).size).toBe(ex.options.length);
          expect(ex.explanation.length).toBeGreaterThan(0);
        } else if (isMatchExercise(ex)) {
          expect(ex.pairs.length).toBeGreaterThanOrEqual(2);
          expect(new Set(ex.pairs.map((p) => p.left)).size).toBe(ex.pairs.length);
          expect(new Set(ex.pairs.map((p) => p.right)).size).toBe(ex.pairs.length);
        } else if (isRecallExercise(ex)) {
          expect(ex.sampleAnswer.length).toBeGreaterThan(0);
          expect(ex.keyPoints.length).toBeGreaterThan(0);
        }
      }
    });
  }

  it("deckt Themen ohne Modul ab (standalone für Zahlensysteme/Wirtschaft)", () => {
    const standaloneSlugs = new Set([
      "zahlensysteme-umrechnung",
      "zahlensysteme-binaerarithmetik",
      "zahlensysteme-zweierkomplement",
      "zahlensysteme-ieee754",
      "zahlensysteme-fehlererkennung",
      "zahlensysteme-codes",
      "wirtschaft-amortisation-roi",
      "wirtschaft-angebotsvergleich-nutzwertanalyse",
    ]);
    for (const slug of standaloneSlugs) {
      const file = getExerciseFile(slug);
      expect(file, slug).toBeDefined();
      expect(file!.standalone, slug).toBe(true);
    }
    const subnetting = getExerciseFile("netzwerktechnik-subnetting");
    expect(subnetting!.standalone).toBeUndefined();
  });
});
