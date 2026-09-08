// Tests für das Tagesquiz (lib/quiz.ts) — Zusammenstellung und Auswertung.
// Wie alle Tests hier: nur reine Funktionen, kein Firestore.

import { describe, expect, it } from "vitest";
import { addDays } from "@/lib/dates";
import { getExercisesForTopic } from "@/lib/exercises/registry";
import {
  buildExerciseSession,
  mergeRecentExerciseIds,
} from "@/lib/exercises/session";
import {
  buildDailyQuiz,
  canClaimFreeDay,
  computeQuizTopicReviewPatch,
  evaluateDailyQuiz,
  quizPlanIdsFromDay,
  rebuildDailyQuizFromDay,
  serializeQuizTasks,
  type QuizTopicLike,
} from "@/lib/quiz";

const TODAY = "2026-09-07";

const SLUGS = {
  static: "netzwerktechnik-osi-modell", // recall + match, kein choice
  procA: "zahlensysteme-umrechnung",
  procB: "zahlensysteme-ieee754",
  procC: "zahlensysteme-codes",
  procD: "diagramme-netzplan-kritischer-pfad",
  procE: "wirtschaft-amortisation-roi",
  procF: "zahlensysteme-binaerarithmetik",
  procG: "zahlensysteme-zweierkomplement",
  procH: "zahlensysteme-fehlererkennung",
  procI: "netzwerktechnik-subnetting",
};

let seq = 0;
function makeTopic(overrides: Partial<QuizTopicLike> = {}): QuizTopicLike {
  seq += 1;
  return {
    planId: `plan${seq}`,
    itemId: `item${seq}`,
    title: `Thema ${seq}`,
    topicSlug: SLUGS.static,
    nextDueAt: null,
    attemptCount: 1,
    completedUnits: 0,
    ...overrides,
  };
}

describe("buildDailyQuiz — Zusammenstellung", () => {
  it("zieht nur bereits begonnene Themen (attemptCount/completedUnits > 0)", () => {
    const started = makeTopic({ topicSlug: SLUGS.static });
    const untouched = makeTopic({
      topicSlug: SLUGS.static,
      attemptCount: 0,
      completedUnits: 0,
    });
    const quiz = buildDailyQuiz([started, untouched], { today: TODAY, seed: 1 });
    expect(quiz.tasks.length).toBeGreaterThan(0);
    expect(quiz.tasks.every((t) => t.itemId === started.itemId)).toBe(true);
  });

  it("schließt Themen ohne Übungsaufgaben aus (kein Slug / unbekannter Slug)", () => {
    const noSlug = makeTopic({ topicSlug: null });
    const unknown = makeTopic({ topicSlug: "gibt-es-nicht" });
    expect(
      buildDailyQuiz([noSlug, unknown], { today: TODAY, seed: 1 }).tasks
    ).toHaveLength(0);
  });

  it("zieht höchstens 2 Aufgaben pro Thema", () => {
    const topic = makeTopic({ topicSlug: SLUGS.procA });
    const quiz = buildDailyQuiz([topic], { today: TODAY, seed: 7 });
    expect(quiz.tasks).toHaveLength(2);
    expect(new Set(quiz.tasks.map((t) => t.exercise.id)).size).toBe(2);
  });

  it("nimmt was da ist, wenn weniger als 10 Aufgaben verfügbar sind", () => {
    const topics = [
      makeTopic({ topicSlug: SLUGS.procA }),
      makeTopic({ topicSlug: SLUGS.procB }),
      makeTopic({ topicSlug: SLUGS.procC }),
      makeTopic({ topicSlug: SLUGS.procD }),
    ];
    // 4 Themen × max. 2 = 8 < 10
    const quiz = buildDailyQuiz(topics, { today: TODAY, seed: 11 });
    expect(quiz.tasks).toHaveLength(8);
  });

  it("bevorzugt überfällige vor heute fälligen vor übrigen Themen", () => {
    let totalOverdue = 0;
    let totalDue = 0;
    let totalRest = 0;

    for (let seed = 1; seed <= 200; seed++) {
      const topics = [
        makeTopic({ topicSlug: SLUGS.procA, nextDueAt: addDays(TODAY, -5) }),
        makeTopic({ topicSlug: SLUGS.procB, nextDueAt: addDays(TODAY, -2) }),
        makeTopic({ topicSlug: SLUGS.procI, nextDueAt: addDays(TODAY, -1) }),
        makeTopic({ topicSlug: SLUGS.procC, nextDueAt: TODAY }),
        makeTopic({ topicSlug: SLUGS.procD, nextDueAt: TODAY }),
        makeTopic({ topicSlug: SLUGS.procE, nextDueAt: TODAY }),
        makeTopic({ topicSlug: SLUGS.procF, nextDueAt: addDays(TODAY, 3) }),
        makeTopic({ topicSlug: SLUGS.procG, nextDueAt: null }),
        makeTopic({ topicSlug: SLUGS.procH, nextDueAt: addDays(TODAY, 10) }),
      ];
      const quiz = buildDailyQuiz(topics, { today: TODAY, seed });
      for (const task of quiz.tasks) {
        const topic = topics.find((t) => t.itemId === task.itemId)!;
        const next = topic.nextDueAt ?? null;
        if (next !== null && next < TODAY) totalOverdue += 1;
        else if (next === TODAY) totalDue += 1;
        else totalRest += 1;
      }
    }

    // Gewichte 3:2:1 über 200 deterministische Seeds — die Reihenfolge muss
    // strikt gelten, kein Grenzfall.
    expect(totalOverdue).toBeGreaterThan(totalDue);
    expect(totalDue).toBeGreaterThan(totalRest);
  });

  it("mischt die Reihenfolge über Themen hinweg (nicht blockweise)", () => {
    const topics = [
      makeTopic({ topicSlug: SLUGS.procA }),
      makeTopic({ topicSlug: SLUGS.procB }),
      makeTopic({ topicSlug: SLUGS.procC }),
      makeTopic({ topicSlug: SLUGS.procD }),
      makeTopic({ topicSlug: SLUGS.procE }),
      makeTopic({ topicSlug: SLUGS.procF }),
    ];
    const quiz = buildDailyQuiz(topics, { today: TODAY, seed: 42 });
    expect(quiz.tasks).toHaveLength(10);
    // 10 Aufgaben mit Deckel 2 pro Thema ⇒ zwangsläufig ≥ 5 verschiedene Themen.
    const distinct = new Set(quiz.tasks.map((t) => t.topicSlug)).size;
    expect(distinct).toBeGreaterThanOrEqual(5);
  });

  it("lässt alle Aufgabentypen durch — kein Filter auf choice", () => {
    const topic = makeTopic({ topicSlug: SLUGS.static });
    const quiz = buildDailyQuiz([topic], { today: TODAY, seed: 3 });
    expect(quiz.tasks.length).toBeGreaterThan(0);
    // osi-modell enthält nur recall + match — beide Typen fließen durch.
    expect(quiz.tasks.every((t) => t.exercise.type !== "choice")).toBe(true);
  });

  it("gleicher Seed → gleicher Bogen; Replay stellt exakt dieselben Fragen", () => {
    const topics = [
      makeTopic({ topicSlug: SLUGS.procA, nextDueAt: addDays(TODAY, -1) }),
      makeTopic({ topicSlug: SLUGS.procB, nextDueAt: TODAY }),
      makeTopic({ topicSlug: SLUGS.procC, nextDueAt: null }),
    ];
    const a = buildDailyQuiz(topics, { today: TODAY, seed: 99 });
    const b = buildDailyQuiz(topics, { today: TODAY, seed: 99 });
    expect(a.tasks.map((t) => t.exercise.id)).toEqual(b.tasks.map((t) => t.exercise.id));

    const replayed = rebuildDailyQuizFromDay({
      seed: a.seed,
      tasks: serializeQuizTasks(a),
    });
    expect(replayed.tasks.map((t) => t.exercise.id)).toEqual(
      a.tasks.map((t) => t.exercise.id)
    );
    expect(replayed.tasks.map((t) => t.planId)).toEqual(a.tasks.map((t) => t.planId));
    expect(replayed.tasks.map((t) => t.itemId)).toEqual(a.tasks.map((t) => t.itemId));
    expect(replayed.tasks[0].exercise).toEqual(a.tasks[0].exercise);
  });
});

describe("mergeRecentExerciseIds — zuletzt verwendete Aufgaben", () => {
  it("hängt neue an, entdoppelt, deckelt auf die letzten 5", () => {
    expect(mergeRecentExerciseIds(null, [])).toEqual([]);
    expect(mergeRecentExerciseIds(null, ["a", "b"])).toEqual(["a", "b"]);
    expect(mergeRecentExerciseIds(["a", "b"], ["c"])).toEqual(["a", "b", "c"]);
    expect(mergeRecentExerciseIds(["a", "b", "c", "d", "e"], ["f"])).toEqual([
      "b", "c", "d", "e", "f",
    ]);
  });

  it("Wiederholung rückt ans Ende und bleibt einmalig", () => {
    expect(mergeRecentExerciseIds(["a", "b", "c"], ["b"])).toEqual(["a", "c", "b"]);
  });

  it("ignoriert unvollständige Einträge defensiv", () => {
    expect(mergeRecentExerciseIds(["a"], [undefined, null, "", "b"])).toEqual([
      "a", "b",
    ]);
  });
});

describe("buildExerciseSession — Reihenfolge pro Aufruf gemischt", () => {
  it("statisch: gleicher Seed → gleiche Reihenfolge, anderer Seed → andere", () => {
    const a = buildExerciseSession(SLUGS.static, 123);
    const b = buildExerciseSession(SLUGS.static, 123);
    const c = buildExerciseSession(SLUGS.static, 124);
    expect(a.exercises.map((e) => e.id)).toEqual(b.exercises.map((e) => e.id));
    expect(a.exercises.map((e) => e.id)).not.toEqual(c.exercises.map((e) => e.id));
    // Inhalt identisch, nur die Reihenfolge wechselt.
    expect(new Set(c.exercises.map((e) => e.id))).toEqual(
      new Set(a.exercises.map((e) => e.id))
    );
  });

  it("prozedural: deterministisch über den Seed", () => {
    const a = buildExerciseSession(SLUGS.procA, 77);
    const b = buildExerciseSession(SLUGS.procA, 77);
    expect(a.exercises.map((e) => e.id)).toEqual(b.exercises.map((e) => e.id));
    expect(a.exercises.length).toBeGreaterThan(1);
  });
});

describe("buildDailyQuiz — Auswahl-Abstinenz (recentExerciseIds)", () => {
  it("meidet zuletzt verwendete Aufgaben des Themas", () => {
    const all = getExercisesForTopic(SLUGS.static).map((e) => e.id);
    const recent = all.slice(0, 4);
    const topic = makeTopic({ topicSlug: SLUGS.static, recentExerciseIds: recent });
    const quiz = buildDailyQuiz([topic], { today: TODAY, seed: 13 });
    expect(quiz.tasks).toHaveLength(2);
    for (const task of quiz.tasks) {
      expect(recent).not.toContain(task.exercise.id);
      expect(all.slice(4)).toContain(task.exercise.id);
    }
  });

  it("fällt auf gemiedene Aufgaben zurück, wenn sonst nichts übrig ist", () => {
    const all = getExercisesForTopic(SLUGS.static).map((e) => e.id);
    const topic = makeTopic({ topicSlug: SLUGS.static, recentExerciseIds: all });
    const quiz = buildDailyQuiz([topic], { today: TODAY, seed: 13 });
    expect(quiz.tasks).toHaveLength(2);
  });

  it("streut über Seeds: nicht bei jedem Bogen dieselben Aufgaben", () => {
    const seen = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      const quiz = buildDailyQuiz([makeTopic({ topicSlug: SLUGS.static })], {
        today: TODAY,
        seed,
      });
      for (const task of quiz.tasks) seen.add(task.exercise.id);
    }
    expect(seen.size).toBeGreaterThan(2);
  });
});

describe("quizPlanIdsFromDay — betroffene Pläne des Tagesquiz", () => {
  it("liefert das planIds-Feld", () => {
    expect(quizPlanIdsFromDay({ planIds: ["p1", "p2"] })).toEqual(["p1", "p2"]);
    expect(quizPlanIdsFromDay(null)).toEqual([]);
    expect(quizPlanIdsFromDay(undefined)).toEqual([]);
    expect(quizPlanIdsFromDay({})).toEqual([]);
  });

  it("fällt bei alten Docs ohne planIds auf die Tasks zurück", () => {
    const doc = {
      tasks: [
        { planId: "p1", itemId: "i1", topicSlug: "s", topicTitle: "t", topicSeed: 1, exerciseId: "e1" },
        { planId: "p1", itemId: "i2", topicSlug: "s", topicTitle: "t", topicSeed: 2, exerciseId: "e2" },
        { planId: "p2", itemId: "i3", topicSlug: "s", topicTitle: "t", topicSeed: 3, exerciseId: "e3" },
      ],
    };
    expect(quizPlanIdsFromDay(doc)).toEqual(["p1", "p2"]);
  });
});

describe("buildDailyQuiz — faire Abdeckung aktiver Pläne", () => {
  it("jeder aktive Plan mit begonnenen Themen bekommt mindestens eine Frage", () => {
    const topics = [
      makeTopic({ planId: "p1", topicSlug: SLUGS.procA }),
      makeTopic({ planId: "p1", topicSlug: SLUGS.procB }),
      makeTopic({ planId: "p2", topicSlug: SLUGS.procC }),
      makeTopic({ planId: "p2", topicSlug: SLUGS.procD }),
      makeTopic({ planId: "p3", topicSlug: SLUGS.procE }),
      makeTopic({ planId: "p4", topicSlug: SLUGS.procF }),
    ];
    const quiz = buildDailyQuiz(topics, {
      today: TODAY,
      seed: 21,
      count: 4,
      activePlanIds: ["p1", "p2", "p3", "p4"],
    });
    const plans = new Set(quiz.tasks.map((t) => t.planId));
    expect(plans).toEqual(new Set(["p1", "p2", "p3", "p4"]));
    expect(quiz.tasks).toHaveLength(4);
  });

  it("Pläne ohne begonnene Themen/ohne Aufgaben werden übersprungen", () => {
    const topics = [
      makeTopic({ planId: "p1", topicSlug: SLUGS.procA }),
      makeTopic({ planId: "p2", topicSlug: "gibt-es-nicht" }),
      makeTopic({ planId: "p3", attemptCount: 0, completedUnits: 0 }),
    ];
    const quiz = buildDailyQuiz(topics, {
      today: TODAY,
      seed: 22,
      count: 5,
      activePlanIds: ["p1", "p2", "p3"],
    });
    const plans = new Set(quiz.tasks.map((t) => t.planId));
    expect(plans).toEqual(new Set(["p1"]));
  });

  it("ohne activePlanIds bleibt das Verhalten wie bisher", () => {
    const topics = [
      makeTopic({ planId: "p1", topicSlug: SLUGS.procA }),
      makeTopic({ planId: "p2", topicSlug: SLUGS.procB }),
    ];
    const a = buildDailyQuiz(topics, { today: TODAY, seed: 23, count: 3 });
    const b = buildDailyQuiz(topics, { today: TODAY, seed: 23, count: 3 });
    expect(a.tasks.map((t) => t.exercise.id)).toEqual(b.tasks.map((t) => t.exercise.id));
  });
});

describe("evaluateDailyQuiz — Auswertung", () => {
  function twoTaskQuiz() {
    return buildDailyQuiz([makeTopic({ topicSlug: SLUGS.static })], {
      today: TODAY,
      seed: 5,
    });
  }

  it("bestanden nur bei 100 % — Teilpunkte reichen nicht", () => {
    const quiz = twoTaskQuiz();
    const perfect = evaluateDailyQuiz(quiz.tasks, [1, 1]);
    expect(perfect.passed).toBe(true);
    expect(perfect.correct).toBe(2);
    expect(perfect.wrongItemKeys).toHaveLength(0);

    const partial = evaluateDailyQuiz(quiz.tasks, [1, 0.5]);
    expect(partial.passed).toBe(false);
    expect(partial.correct).toBe(1.5);
    expect(partial.wrongTasks).toHaveLength(1);
  });

  it("richtige Themen verändern SM-2 nicht — nur falsche kommen in die Review-Liste", () => {
    const topics = [
      makeTopic({ topicSlug: SLUGS.procA }),
      makeTopic({ topicSlug: SLUGS.procB }),
    ];
    const quiz = buildDailyQuiz(topics, { today: TODAY, seed: 8 });
    expect(quiz.tasks).toHaveLength(4);

    const outcome = evaluateDailyQuiz(quiz.tasks, [1, 0, 1, 1]);
    expect(outcome.passed).toBe(false);
    expect(outcome.wrongItemKeys).toHaveLength(1);

    const wrongKey = outcome.wrongItemKeys[0];
    // Genau die falsch beantwortete Aufgabe steht in wrongTasks — und sie
    // gehört zum falschen Thema.
    expect(outcome.wrongTasks).toHaveLength(1);
    expect(outcome.wrongTasks[0]).toBe(quiz.tasks[1]);
    expect(outcome.wrongTasks[0].itemId).toBe(wrongKey.itemId);

    // Richtige Themen tauchen in keiner Review-Liste auf.
    for (const task of quiz.tasks.filter((t) => t.itemId !== wrongKey.itemId)) {
      expect(outcome.wrongItemKeys.some((k) => k.itemId === task.itemId)).toBe(false);
    }
  });

  it("ein falsches Thema mit 2 falschen Aufgaben ergibt genau EINEN Review-Key", () => {
    const quiz = twoTaskQuiz();
    const outcome = evaluateDailyQuiz(quiz.tasks, [0, 0]);
    expect(outcome.wrongTasks).toHaveLength(2);
    expect(outcome.wrongItemKeys).toHaveLength(1);
  });
});

describe("canClaimFreeDay — freier Tag nur beim ersten Durchgang", () => {
  it("erster Durchgang des Tages UND bestanden", () => {
    expect(canClaimFreeDay(null, true)).toBe(true);
    expect(canClaimFreeDay(null, false)).toBe(false);
    // gestartet, aber noch kein Ergebnis (abgebrochener erster Besuch)
    expect(canClaimFreeDay({ passed: null }, true)).toBe(true);
  });

  it("zweiter Durchgang kann den Tag nicht mehr freischalten", () => {
    expect(canClaimFreeDay({ passed: false }, true)).toBe(false);
    expect(canClaimFreeDay({ passed: true }, true)).toBe(false);
  });
});

describe("computeQuizTopicReviewPatch — Quiz darf SM-2 nur verschlechtern", () => {
  it("falsches Thema: Quality 1 setzt zurück und rückt die Wiederholung nach vorn", () => {
    const nowMs = Date.UTC(2026, 8, 7, 12, 0, 0); // Mo 14:00 Berliner Zeit
    const previousReview = Date.UTC(2026, 8, 1, 12, 0, 0);
    const patch = computeQuizTopicReviewPatch(
      "item1",
      {
        sm2: {
          cardId: "item1",
          interval: 21,
          easeFactor: 2.5,
          repetitions: 4,
          nextReview: 0,
          lastReview: previousReview,
        },
        completedUnits: 2,
        estimatedUnits: 3,
      },
      nowMs
    );

    expect(patch.sm2.repetitions).toBe(0);
    expect(patch.sm2.interval).toBe(1);
    expect(patch.nextDueAt).toBe("2026-09-08"); // morgen statt in 3 Wochen
    expect(patch.completedUnits).toBe(3); // geklemmt auf estimatedUnits
    // lastReview bleibt UNANGETASTET: Ein Quiz-Review zählt nicht als heutige
    // Einheit im Tagespensum — ein Fehlversuch darf den Tag nicht freischalten.
    expect(patch.sm2.lastReview).toBe(previousReview);
  });

  it("fehlender SM-2-Stand wird defensiv als neue Karte behandelt", () => {
    const nowMs = Date.UTC(2026, 8, 7, 12, 0, 0);
    const patch = computeQuizTopicReviewPatch("itemX", { sm2: null }, nowMs);
    expect(patch.sm2.cardId).toBe("itemX");
    expect(patch.sm2.lastReview).toBe(0); // nie echt geübt → zählt nicht als Pensum
    expect(patch.nextDueAt).toBe("2026-09-08");
    expect(patch.completedUnits).toBe(1);
  });
});
