import { describe, expect, it } from "vitest";
import { effectiveDailyLessons, updateStreak } from "@/lib/streak";

const NOW = new Date("2026-09-07T12:00:00Z"); // Montag, Berlin
const MO_FR = [1, 2, 3, 4, 5];

function makeProfile(overrides: Partial<{
  streak: number;
  streakFreeze: boolean;
  lastStudyDate?: string;
  lastActive?: string;
}> = {}): Parameters<typeof updateStreak>[0] {
  return { streak: 5, streakFreeze: false, ...overrides };
}

describe("updateStreak", () => {
  it("heute schon gelernt → unverändert", () => {
    const result = updateStreak(makeProfile({ lastStudyDate: "2026-09-07" }), { now: NOW });
    expect(result).toEqual({ streak: 5, streakFreeze: false });
  });

  it("gestern gelernt → +1", () => {
    const result = updateStreak(makeProfile({ lastStudyDate: "2026-09-06" }), { now: NOW });
    expect(result.streak).toBe(6);
  });

  it("freier Tag bricht den Streak nicht (Lücke enthält nur freie Tage)", () => {
    // Zuletzt Samstag gelernt, Sonntag war frei (studyDays Mo–Fr), heute Montag
    const result = updateStreak(makeProfile({ lastStudyDate: "2026-09-05" }), {
      now: NOW,
      studyDays: MO_FR,
    });
    expect(result).toEqual({ streak: 5, streakFreeze: false });
  });

  it("verpasster Lerntag ohne Freeze bricht den Streak", () => {
    // Zuletzt Donnerstag; Freitag (geplant) und Wochenende verpasst
    const result = updateStreak(makeProfile({ lastStudyDate: "2026-09-03" }), {
      now: NOW,
      studyDays: MO_FR,
    });
    expect(result).toEqual({ streak: 1, streakFreeze: false });
  });

  it("verpasster Lerntag mit Freeze überlebt, Freeze wird verbraucht", () => {
    const result = updateStreak(
      makeProfile({ lastStudyDate: "2026-09-03", streakFreeze: true }),
      { now: NOW, studyDays: MO_FR }
    );
    expect(result).toEqual({ streak: 5, streakFreeze: false });
  });

  it("zwei verpasste Lerntage brechen auch mit Freeze", () => {
    // Zuletzt Mittwoch; Do + Fr geplant verpasst
    const result = updateStreak(
      makeProfile({ lastStudyDate: "2026-09-02", streakFreeze: true }),
      { now: NOW, studyDays: MO_FR }
    );
    expect(result).toEqual({ streak: 1, streakFreeze: true });
  });

  it("ohne studyDays (keine Plan-Info): jeder Kalendertag zählt, wie bisher", () => {
    // Zuletzt Donnerstag — 3 Kalendertage Lücke → Bruch
    const result = updateStreak(makeProfile({ lastStudyDate: "2026-09-03" }), { now: NOW });
    expect(result.streak).toBe(1);
  });

  it("nur lastActive aktualisiert verlängert den Streak NICHT", () => {
    // Presence hat lastActive auf gestern gestempelt, gelernt wurde zuletzt Donnerstag
    const result = updateStreak(
      makeProfile({ lastStudyDate: "2026-09-03", lastActive: "2026-09-06T20:00:00.000Z" }),
      { now: NOW, studyDays: MO_FR }
    );
    expect(result.streak).toBe(1); // nicht 6
  });

  it("lastActive-Rauschen bricht nicht, wenn die Lücke nur freie Tage enthält", () => {
    const result = updateStreak(
      makeProfile({ lastStudyDate: "2026-09-05", lastActive: "2026-09-07T08:00:00.000Z" }),
      { now: NOW, studyDays: MO_FR }
    );
    expect(result.streak).toBe(5);
  });

  it("Dokument ohne lastStudyDate: Fallback auf lastActive-Datum (Migration)", () => {
    const result = updateStreak(
      makeProfile({ lastStudyDate: undefined, lastActive: "2026-09-06T20:00:00.000Z" }),
      { now: NOW }
    );
    expect(result.streak).toBe(6);
  });

  it("Dokument ohne lastStudyDate und ohne lastActive: unverändert", () => {
    const result = updateStreak(
      makeProfile({ lastStudyDate: undefined, lastActive: undefined }),
      { now: NOW }
    );
    expect(result).toEqual({ streak: 5, streakFreeze: false });
  });

  it("letzter Lerntag liegt in der Zukunft (Uhrfehler): unverändert statt DivZero", () => {
    const result = updateStreak(makeProfile({ lastStudyDate: "2026-09-10" }), { now: NOW });
    expect(result).toEqual({ streak: 5, streakFreeze: false });
  });
});

describe("effectiveDailyLessons", () => {
  it("gleicher Tag → Zähler gilt", () => {
    expect(
      effectiveDailyLessons({ dailyLessonsToday: 4, dailyLessonsDate: "2026-09-07" }, NOW)
    ).toBe(4);
  });

  it("anderer Tag (auch altes toDateString-Format) → 0", () => {
    expect(
      effectiveDailyLessons({ dailyLessonsToday: 4, dailyLessonsDate: "2026-09-06" }, NOW)
    ).toBe(0);
    expect(
      effectiveDailyLessons(
        { dailyLessonsToday: 4, dailyLessonsDate: "Sun Sep 06 2026" },
        NOW
      )
    ).toBe(0);
  });

  it("fehlende Felder → 0", () => {
    expect(effectiveDailyLessons({}, NOW)).toBe(0);
    expect(
      effectiveDailyLessons({ dailyLessonsToday: 4, dailyLessonsDate: undefined }, NOW)
    ).toBe(0);
  });
});
