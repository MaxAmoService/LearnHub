// Freitext-Antwortvalidierung — reine Funktionen, keine Firebase-/UI-Tests.

import { describe, expect, it } from "vitest";
import {
  allValidAnswers,
  checkFreeTextAnswer,
  normalizeFreeTextAnswer,
} from "@/lib/answerCheck";

describe("normalizeFreeTextAnswer", () => {
  it("trimmt und macht Kleinbuchstaben", () => {
    expect(normalizeFreeTextAnswer("  Ja ")).toBe("ja");
    expect(normalizeFreeTextAnswer("AB")).toBe("ab");
  });

  it("entfernt alle Whitespaces", () => {
    expect(normalizeFreeTextAnswer("2 x + 1")).toBe("2x+1");
  });

  it("entfernt geschweifte Klammern", () => {
    expect(normalizeFreeTextAnswer("{2,4}")).toBe("2,4");
  });

  it("entfernt Leerzeichen vor Ziffern in Kommalisten", () => {
    expect(normalizeFreeTextAnswer("1, 5")).toBe("1,5");
  });
});

describe("checkFreeTextAnswer", () => {
  it("akzeptiert die Musterlösung", () => {
    expect(checkFreeTextAnswer("5", "5")).toBe(true);
  });

  it("akzeptiert Whitespace- und Großschreibvarianten", () => {
    expect(checkFreeTextAnswer("  X2 ", "x2")).toBe(true);
  });

  it("akzeptiert alle zusätzlichen gültigen Antworten (Lösungsmengen)", () => {
    // Quadratische Gleichung mit den Lösungen -2 und 4
    expect(checkFreeTextAnswer("4", "-2", { acceptedAnswers: ["4"] })).toBe(true);
    expect(checkFreeTextAnswer("-2", "-2", { acceptedAnswers: ["4"] })).toBe(true);
    expect(checkFreeTextAnswer("3", "-2", { acceptedAnswers: ["4"] })).toBe(false);
  });

  it("akzeptiert vertauschte Reihenfolge bei Kommalisten", () => {
    expect(
      checkFreeTextAnswer("4,2", "2,4", { acceptedAnswers: ["4,2"] }),
    ).toBe(true);
  });

  it("vergleicht numerisch mit Toleranz gegen jede gültige Antwort", () => {
    expect(
      checkFreeTextAnswer("1.51", "1.5", {
        tolerance: 0.01,
        acceptedAnswers: ["1"],
      }),
    ).toBe(false);
    expect(
      checkFreeTextAnswer("1.005", "1.5", {
        tolerance: 0.01,
        acceptedAnswers: ["1"],
      }),
    ).toBe(true);
  });

  it("behält das bisherige parseFloat-Verhalten bei (Komma wird nicht konvertiert)", () => {
    // Legacy-Verhalten: parseFloat("1,5") = 1 — bewusst nicht geändert.
    expect(checkFreeTextAnswer("1,5", "1.5", { tolerance: 0.01 })).toBe(false);
  });

  it("fällt auf String-Vergleich zurück, wenn Toleranz nicht parsebar ist", () => {
    expect(checkFreeTextAnswer("unendlich", "unendlich", { tolerance: 0.01 })).toBe(true);
  });
});

describe("allValidAnswers", () => {
  it("listet Musterlösung und Alternativen", () => {
    expect(allValidAnswers("-2", ["4"])).toEqual(["-2", "4"]);
    expect(allValidAnswers("5")).toEqual(["5"]);
  });
});
