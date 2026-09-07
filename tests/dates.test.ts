import { describe, expect, it } from "vitest";
import {
  addDays,
  dayOfMonth,
  dayOfWeek,
  daysBetween,
  isSameDay,
  monthKey,
  todayKey,
} from "@/lib/dates";

describe("todayKey", () => {
  it("liefert den Berliner Kalendertag als YYYY-MM-DD", () => {
    // 12:00 UTC = 13:00 Berlin (Winter) — sicher mitten im Tag
    expect(todayKey(new Date("2026-02-08T12:00:00Z"))).toBe("2026-02-08");
    // 12:00 UTC = 14:00 Berlin (Sommer)
    expect(todayKey(new Date("2026-08-08T12:00:00Z"))).toBe("2026-08-08");
  });

  it("Tagesgrenze 04:00: 03:30 Berlin zählt zum Vortag", () => {
    // Winter: 02:30 UTC = 03:30 Berlin
    expect(todayKey(new Date("2026-02-08T02:30:00Z"))).toBe("2026-02-07");
    // 03:00 UTC = 04:00 Berlin → neuer Tag
    expect(todayKey(new Date("2026-02-08T03:00:00Z"))).toBe("2026-02-08");
  });

  it("Tagesgrenze 04:00 im Sommer: Aktivität um 01:30 zählt zum Vortag", () => {
    // Sommer: 23:30 UTC am 08. = 01:30 Berlin am 09.
    expect(todayKey(new Date("2026-08-08T23:30:00Z"))).toBe("2026-08-08");
    // 02:30 UTC = 04:30 Berlin am 09.
    expect(todayKey(new Date("2026-08-09T02:30:00Z"))).toBe("2026-08-09");
  });

  it("Zeitumstellung Frühjahr (Berlin 2026-03-29, Sprung 02:00→03:00 CET)", () => {
    // 01:30 UTC = 03:30 CEST — nach dem Sprung, vor der Tagesgrenze → Vortag
    expect(todayKey(new Date("2026-03-29T01:30:00Z"))).toBe("2026-03-28");
    // 03:59 CEST (01:59 UTC) → noch Vortag
    expect(todayKey(new Date("2026-03-29T01:59:00Z"))).toBe("2026-03-28");
    // 04:00 CEST (02:00 UTC) → neuer Tag
    expect(todayKey(new Date("2026-03-29T02:00:00Z"))).toBe("2026-03-29");
    // 04:30 CEST (02:30 UTC) → neuer Tag (das war vor dem Fix der Fehlerfall)
    expect(todayKey(new Date("2026-03-29T02:30:00Z"))).toBe("2026-03-29");
  });

  it("Zeitumstellung Herbst (Berlin 2026-10-25, doppelte Stunde 02:00-03:00)", () => {
    // 02:30 CEST — erste Passage der Doppelstunde (00:30 UTC) → Vortag
    expect(todayKey(new Date("2026-10-25T00:30:00Z"))).toBe("2026-10-24");
    // 02:30 CET — zweite Passage der Doppelstunde (01:30 UTC) → ebenfalls Vortag
    expect(todayKey(new Date("2026-10-25T01:30:00Z"))).toBe("2026-10-24");
    // 03:59 CET (02:59 UTC) → noch Vortag
    expect(todayKey(new Date("2026-10-25T02:59:00Z"))).toBe("2026-10-24");
    // 04:00 CET (03:00 UTC) → neuer Tag
    expect(todayKey(new Date("2026-10-25T03:00:00Z"))).toBe("2026-10-25");
    // 04:30 CET (03:30 UTC) → neuer Tag
    expect(todayKey(new Date("2026-10-25T03:30:00Z"))).toBe("2026-10-25");
  });
});

describe("addDays", () => {
  it("rechnet über Monats- und Jahresgrenzen", () => {
    expect(addDays("2026-01-31", 1)).toBe("2026-02-01");
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
    expect(addDays("2025-12-31", 1)).toBe("2026-01-01");
  });

  it("behandelt Schaltjahre", () => {
    expect(addDays("2024-02-28", 1)).toBe("2024-02-29");
    expect(addDays("2024-02-29", 1)).toBe("2024-03-01");
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
  });

  it("ist an den Tagen der Zeitumstellung korrekt", () => {
    expect(addDays("2026-03-28", 1)).toBe("2026-03-29");
    expect(addDays("2026-03-29", 1)).toBe("2026-03-30");
    expect(addDays("2026-10-24", 1)).toBe("2026-10-25");
    expect(addDays("2026-10-25", 1)).toBe("2026-10-26");
  });

  it("unterstützt negative Werte", () => {
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
  });
});

describe("daysBetween", () => {
  it("zählt Kalendertage über Monatswechsel und Jahreswechsel", () => {
    expect(daysBetween("2026-01-30", "2026-02-01")).toBe(2);
    expect(daysBetween("2025-12-31", "2026-01-01")).toBe(1);
    expect(daysBetween("2026-09-01", "2026-09-07")).toBe(6);
  });

  it("ist an den Tagen der Zeitumstellung korrekt", () => {
    expect(daysBetween("2026-03-28", "2026-03-30")).toBe(2);
    expect(daysBetween("2026-10-24", "2026-10-26")).toBe(2);
    expect(daysBetween("2026-03-29", "2026-03-29")).toBe(0);
  });

  it("kann negativ sein und ist anti-symmetrisch", () => {
    expect(daysBetween("2026-02-01", "2026-01-30")).toBe(-2);
    expect(daysBetween("2026-02-01", "2026-02-01")).toBe(0);
  });
});

describe("isSameDay", () => {
  it("vergleicht Keys", () => {
    expect(isSameDay("2026-09-07", "2026-09-07")).toBe(true);
    expect(isSameDay("2026-09-07", "2026-09-08")).toBe(false);
  });
});

describe("dayOfWeek", () => {
  it("1 = Montag … 7 = Sonntag", () => {
    expect(dayOfWeek("2026-09-07")).toBe(1); // Montag
    expect(dayOfWeek("2026-09-06")).toBe(7); // Sonntag
    expect(dayOfWeek("2026-09-08")).toBe(2); // Dienstag
    expect(dayOfWeek("2026-09-13")).toBe(7); // Sonntag
  });
});

describe("monthKey / dayOfMonth", () => {
  it("zerlegt Keys für das Activity-Routing", () => {
    expect(monthKey("2026-09-07")).toBe("2026-09");
    expect(dayOfMonth("2026-09-07")).toBe("07");
    expect(monthKey("2025-12-31")).toBe("2025-12");
    expect(dayOfMonth("2025-12-31")).toBe("31");
  });
});
