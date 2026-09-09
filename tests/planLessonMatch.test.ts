// Tests für die Plan-Item → Lektion-Zuordnung (lib/planLessonMatch.ts).

import { describe, expect, it } from "vitest";
import { matchPlanItemToLesson, scoreAgainstLessons } from "@/lib/planLessonMatch";

describe("matchPlanItemToLesson", () => {
  it("findet einen exakten Treffer (nur Füllwörter/Zeichen abweichend)", () => {
    const lessons = [
      { id: "hw-2", title: "Busse, Taktfrequenz & Befehlssatz" },
      { id: "hw-4", title: "Ausgabegeräte" },
    ];
    expect(matchPlanItemToLesson("Busse, Taktfrequenz und Befehlssatz", lessons)).toBe("hw-2");
  });

  it("liefert null bei zwei gleich starken Kandidaten (mehrdeutig)", () => {
    const lessons = [
      { id: "a", title: "Vektoren im Raum" },
      { id: "b", title: "Vektoren im Raum" },
    ];
    expect(matchPlanItemToLesson("Vektoren im Raum", lessons)).toBeNull();
  });

  it("liefert null ohne jeden Treffer", () => {
    const lessons = [{ id: "hw-7", title: "Betriebssysteme & Systemsoftware" }];
    expect(matchPlanItemToLesson("Kernel, Prozesse und Threads", lessons)).toBeNull();
  });

  it("liefert null bei schwacher Ähnlichkeit trotz besten Kandidaten", () => {
    const lessons = [
      { id: "hw-1", title: "CPU-Architektur & Von-Neumann" },
      { id: "hw-7", title: "Betriebssysteme & Systemsoftware" },
    ];
    expect(matchPlanItemToLesson("Shell, Skripte und Automatisierung", lessons)).toBeNull();
  });

  it("ignoriert einen knappen Zweitplatzierten nicht (Margin-Regel)", () => {
    const lessons = [
      { id: "n-3", title: "IPv4-Adressierung" },
      { id: "n-4", title: "IPv6-Adressierung" },
    ];
    expect(matchPlanItemToLesson("IPv4-Adressierung", lessons)).toBe("n-3");
  });

  it("normalisiert Umlaute und Satzzeichen", () => {
    const lessons = [{ id: "m-1", title: "Beträge und Größenordnung" }];
    expect(matchPlanItemToLesson("Beträge & Grössenordnung!", lessons)).toBe("m-1");
  });
});

describe("scoreAgainstLessons", () => {
  it("sortiert absteigend nach Ähnlichkeit", () => {
    const lessons = [
      { id: "x", title: "CPU-Architektur" },
      { id: "y", title: "Von-Neumann-Architektur und CPU-Aufbau" },
    ];
    const scored = scoreAgainstLessons("Von-Neumann-Architektur und CPU-Aufbau", lessons);
    expect(scored[0].id).toBe("y");
    expect(scored[0].score).toBe(1);
    expect(scored[1].score).toBeLessThan(1);
  });
});
