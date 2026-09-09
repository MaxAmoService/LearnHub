// Taschenrechner-Auswertung — reine Funktionen.

import { describe, expect, it } from "vitest";
import { evaluateExpression, formatCalculatorResult } from "@/lib/calculator";

describe("evaluateExpression", () => {
  it("rechnet Grundrechenarten", () => {
    expect(evaluateExpression("2+3")).toBe(5);
    expect(evaluateExpression("10-4")).toBe(6);
    expect(evaluateExpression("6×7")).toBe(42);
    expect(evaluateExpression("6*7")).toBe(42);
    expect(evaluateExpression("6·7")).toBe(42);
    expect(evaluateExpression("42÷6")).toBe(7);
    expect(evaluateExpression("42/6")).toBe(7);
  });

  it("beachtet Punkt-vor-Strich", () => {
    expect(evaluateExpression("2+3×4")).toBe(14);
    expect(evaluateExpression("(2+3)×4")).toBe(20);
  });

  it("behandelt Dezimaltrenner . und ,", () => {
    expect(evaluateExpression("1.5+2,5")).toBe(4);
  });

  it("unterstützt unäres Minus und Klammern", () => {
    expect(evaluateExpression("-3+5")).toBe(2);
    expect(evaluateExpression("-(2+3)")).toBe(-5);
    expect(evaluateExpression("2×(-3)")).toBe(-6);
  });

  it("rechnet Potenzen rechtsassoziativ", () => {
    expect(evaluateExpression("2^3")).toBe(8);
    expect(evaluateExpression("2^3^2")).toBe(512);
    expect(evaluateExpression("-2^2")).toBe(-4);
    expect(evaluateExpression("2^-2")).toBe(0.25);
  });

  it("behandelt Prozent als Division durch 100", () => {
    expect(evaluateExpression("50%")).toBe(0.5);
    expect(evaluateExpression("200×10%")).toBe(20);
  });

  it("unterstützt √ und ²", () => {
    expect(evaluateExpression("√(16)")).toBe(4);
    expect(evaluateExpression("√(2+2)²")).toBe(4); // (√4)² = 2²
    expect(evaluateExpression("√(16)²")).toBe(16); // (√16)² = 4²
    expect(evaluateExpression("5²")).toBe(25);
  });

  it("liefert null bei Fehlern", () => {
    expect(evaluateExpression("")).toBeNull();
    expect(evaluateExpression("1÷0")).toBeNull();
    expect(evaluateExpression("√(-1)")).toBeNull();
    expect(evaluateExpression("2+")).toBeNull();
    expect(evaluateExpression("(2+3")).toBeNull();
    expect(evaluateExpression("2+3)")).toBeNull();
    expect(evaluateExpression("abc")).toBeNull();
  });
});

describe("formatCalculatorResult", () => {
  it("rundet auf 10 signifikante Stellen", () => {
    expect(formatCalculatorResult(1 / 3)).toBe("0,33333333");
    expect(formatCalculatorResult(5)).toBe("5");
    expect(formatCalculatorResult(1.5)).toBe("1,5");
  });
});
