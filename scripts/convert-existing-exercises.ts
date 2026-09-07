/**
 * convert-existing-exercises.ts — Bestand nach content/exercises/ konvertieren (Quelle A).
 *
 * Einmaliges Autorenwerkzeug (idempotent):
 * 1. Übungsdateien (lib/computersystemeExercises.ts, lib/itSicherheitExercises.ts):
 *    "multiple" → choice (Distraktoren + Solution sind vorhanden),
 *    "input" mit rein numerischem expectedAnswer → numeric,
 *    "input" mit Wortantwort → recall.
 * 2. Karteikarten (lib/flashcardData.ts): front→prompt, back→sampleAnswer,
 *    hint/Kategorie→keyPoints. KEINE MC aus Karten (keine Distraktoren).
 *    Natürliche Paar-Gruppen (Ports, RAID, Dateisysteme, OSI, Scrum) werden
 *    als match-Aufgaben angelegt.
 *
 * Die Zuordnungstabelle (topicSlug → Karten-/Aufgaben-IDs) ist fest verdrahtet
 * — sie wurde aus dem Abgleich der 54 AP1-Themen mit dem Bestand erstellt.
 *
 * Themen, die bereits eine prozedurale Datei haben (subnetting, netzplan),
 * werden ERGÄNZT statt überschrieben: konvertierte Übungen bekommen IDs mit
 * Präfix "<slug>-ex-" bzw. "<slug>-fk-", prozedurale behalten "<slug>-NN".
 * Erneutes Ausführen ist idempotent (alte konvertierte Einträge werden ersetzt).
 *
 * Bestehende Dateien (*Exercises.ts, flashcardData.ts) bleiben unangetastet —
 * die laufende UI nutzt sie weiter.
 *
 * Usage: npm run convert:exercises
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { allFlashcards } from "../lib/flashcardData";
import { computersystemePractice, computersystemeExam } from "../lib/computersystemeExercises";
import { itSicherheitPractice, itSicherheitExam } from "../lib/itSicherheitExercises";
import type { ExerciseFile, Exercise, RecallExercise } from "../lib/exercises/types";

const PLAN_TEMPLATE_SLUG = "ap1-it-berufe";

// ─── Zuordnungstabelle: topicSlug → Karten- und Aufgaben-IDs ────────────────

const MAPPING: Record<string, { cards?: string[]; exercises?: string[] }> = {
  "computersysteme-os-aufgaben": { cards: ["hw-os-7", "hw-os-8"] },
  "computersysteme-kernel-prozesse-threads": { cards: ["hw-os-1", "hw-os-2"], exercises: ["hw-p-23"] },
  "computersysteme-multitasking-scheduling": { cards: ["hw-os-3"], exercises: ["hw-p-25"] },
  "computersysteme-speicherverwaltung-paging": {
    cards: ["hw-svm-5", "hw-svm-6", "hw-svm-7", "hw-svm-8", "hw-svm-9", "hw-svm-10"],
    exercises: ["hw-p-21", "hw-p-22", "hw-e-3"],
  },
  "computersysteme-dateisysteme-zugriffsrechte": { cards: ["hw-os-4", "hw-sys-3"] },
  "computersysteme-shell-skripte": { cards: ["hw-os-6"] },
  "computersysteme-os-vergleich": { cards: ["hw-os-4", "hw-os-5", "hw-os-7", "hw-os-8"] },
  "computersysteme-virtualisierung-cloud": {
    cards: ["hw-virt-1", "hw-virt-2", "hw-virt-3", "hw-virt-4", "hw-virt-5", "hw-virt-6"],
    exercises: ["hw-e-4"],
  },
  "computersysteme-von-neumann-cpu": {
    cards: ["hw-cpu-1", "hw-cpu-2", "hw-cpu-3", "hw-cpu-4", "hw-cpu-5", "hw-cpu-9"],
    exercises: ["hw-p-1", "hw-p-2", "hw-p-3", "hw-p-5", "hw-e-1"],
  },
  "computersysteme-cpu-pipelining-caches": { cards: ["hw-cpu-6", "hw-cpu-7", "hw-cpu-8"], exercises: ["hw-p-4"] },
  "computersysteme-busse-takt-befehlssatz": {
    cards: ["hw-bus-1", "hw-bus-2", "hw-bus-3", "hw-bus-4", "hw-bus-5", "hw-bus-6", "hw-cpu-10"],
    exercises: ["hw-p-6", "hw-p-7", "hw-p-8", "hw-e-7"],
  },
  "computersysteme-speicherhierarchie-ram": {
    cards: ["hw-svm-1", "hw-svm-2", "hw-svm-3", "hw-svm-4", "hw-svm-11", "hw-svm-12"],
    exercises: ["hw-p-19", "hw-p-20", "hw-e-8"],
  },
  "computersysteme-speichermedien-raid": {
    cards: ["hw-med-1", "hw-med-2", "hw-med-3", "hw-med-4", "hw-med-5", "hw-med-6", "hw-med-7", "hw-med-8"],
    exercises: ["hw-p-15", "hw-p-16", "hw-p-17", "hw-p-18", "hw-e-2", "hw-e-6"],
  },
  "computersysteme-ein-ausgabegeraete": {
    cards: ["hw-ein-1", "hw-ein-2", "hw-ein-3", "hw-ein-4", "hw-ein-5", "hw-ein-6", "hw-aus-1", "hw-aus-2", "hw-aus-3", "hw-aus-4", "hw-aus-5", "hw-aus-6"],
    exercises: ["hw-p-9", "hw-p-10", "hw-p-11", "hw-p-12", "hw-p-13", "hw-p-14"],
  },
  "computersysteme-bios-uefi-boot": {
    cards: ["hw-sys-1", "hw-sys-2", "hw-sys-4", "hw-sys-5", "hw-svm-12"],
    exercises: ["hw-p-24", "hw-e-10"],
  },
  "computersysteme-leistungsbewertung": { cards: ["hw-lei-1", "hw-lei-2", "hw-lei-3", "hw-lei-4"], exercises: ["hw-e-5"] },

  "netzwerktechnik-osi-modell": { cards: ["nw-os-1", "nw-os-2", "nw-os-3", "nw-os-4", "nw-os-5"] },
  "netzwerktechnik-tcpip-protokolle": { cards: ["nw-tcp-1", "nw-tcp-2", "nw-tcp-3"] },
  "netzwerktechnik-ipv4-adressierung": { cards: ["nw-ip-1", "nw-ip-2"] },
  "netzwerktechnik-subnetting": { cards: ["nw-sub-1", "nw-sub-2", "nw-sub-3", "nw-sub-4", "nw-sub-5"] },
  "netzwerktechnik-ipv6": { cards: ["nw-ipv6-1", "nw-ipv6-2", "nw-ipv6-3"] },
  "netzwerktechnik-routing": { cards: ["nw-dev-1"] },
  "netzwerktechnik-dns-dhcp": { cards: ["nw-proto-1", "nw-proto-2"] },
  "netzwerktechnik-netzwerkhardware": { cards: ["nw-dev-1", "nw-dev-2"] },
  "netzwerktechnik-verkabelung": { cards: ["nw-cab-1", "nw-cab-2"] },
  "netzwerktechnik-wlan": { cards: ["nw-wlan-1", "nw-wlan-2"] },
  "netzwerktechnik-protokolle-ueberblick": { cards: ["nw-proto-3", "nw-tcp-3"] },

  "it-sicherheit-schutzziele-bedrohungen": {
    cards: ["is-cia-1", "is-cia-2", "is-cia-3", "is-cia-4", "is-prot-1", "is-prot-2", "is-prot-3", "is-se-4"],
    exercises: ["is-1", "is-4", "is-5", "is-24", "is-e1", "is-e2", "is-e5"],
  },
  "it-sicherheit-authentifizierung-passwoerter": {
    cards: ["is-auth-1", "is-auth-2", "is-auth-3", "hw-ein-3"],
    exercises: ["is-2", "is-3", "is-14", "is-e4"],
  },
  "it-sicherheit-netzwerksicherheit-firewalls": {
    cards: ["is-net-1", "is-net-2", "is-net-3", "is-net-4", "nw-sec-1", "nw-sec-2"],
    exercises: ["is-8", "is-12", "is-15", "is-21", "is-23", "is-e8"],
  },
  "it-sicherheit-verschluesselung-pki": { cards: ["is-crypto-1", "is-crypto-2", "is-crypto-3", "is-crypto-4"], exercises: ["is-6", "is-10", "is-e6", "is-e10"] },
  "it-sicherheit-web-security-owasp": {
    cards: ["is-owasp-1", "is-owasp-2", "is-owasp-3", "is-owasp-4", "is-owasp-5"],
    exercises: ["is-7", "is-9", "is-11", "is-16", "is-17", "is-18", "is-20", "is-e3", "is-e9"],
  },
  "it-sicherheit-social-engineering": { cards: ["is-se-1", "is-se-2", "is-se-3"], exercises: ["is-13", "is-19", "is-22", "is-e7"] },

  "projektmanagement-projektmerkmale-phasen": { cards: ["pm-4", "pm-8", "pm-12", "pm-13", "pm-15", "pm-18"] },
  "projektmanagement-smart-ziele": { cards: ["pm-2"] },
  "projektmanagement-magisches-dreieck": { cards: ["pm-1"] },
  "projektmanagement-klassisch-wasserfall": { cards: ["pm-14", "pm-15"] },
  "diagramme-netzplan-kritischer-pfad": { cards: ["ihk-net-1", "ihk-net-2", "ihk-net-3", "pm-9"] },
  "diagramme-lastenheft-pflichtenheft": { cards: ["pm-3", "ihk-allg-1"] },
  "projektmanagement-agile-scrum": { cards: ["pm-5", "pm-6", "pm-10", "pm-11", "pm-16", "pm-17"] },
};

// ─── Match-Aufgaben aus natürlichen Karten-Gruppen ──────────────────────────

interface MatchDef {
  prompt: string;
  pairs: { left: string; right: string }[];
}

const MATCHES: Record<string, MatchDef> = {
  "computersysteme-dateisysteme-zugriffsrechte": {
    prompt: "Ordnen Sie die Dateisysteme ihren Betriebssystemen zu.",
    pairs: [
      { left: "NTFS", right: "Windows" },
      { left: "ext4", right: "Linux" },
      { left: "APFS", right: "macOS" },
    ],
  },
  "computersysteme-speichermedien-raid": {
    prompt: "Ordnen Sie die RAID-Level ihren Eigenschaften zu.",
    pairs: [
      { left: "RAID 0", right: "Striping — keine Redundanz" },
      { left: "RAID 1", right: "Mirroring — 50 % nutzbar" },
      { left: "RAID 5", right: "Striping mit verteilter Parität (min. 3 Platten)" },
      { left: "RAID 6", right: "Doppelte Parität (min. 4 Platten)" },
      { left: "RAID 10", right: "Mirroring + Striping (min. 4 Platten)" },
    ],
  },
  "netzwerktechnik-osi-modell": {
    prompt: "Ordnen Sie die OSI-Schichten ihren Aufgaben bzw. Geräten zu.",
    pairs: [
      { left: "Schicht 7 — Anwendung", right: "HTTP, DNS" },
      { left: "Schicht 6 — Darstellung", right: "Datenformat, Verschlüsselung (SSL/TLS)" },
      { left: "Schicht 4 — Transport", right: "Segmente (TCP/UDP)" },
      { left: "Schicht 3 — Vermittlung", right: "Router, IP-Adressen" },
      { left: "Schicht 2 — Sicherung", right: "Switch, MAC-Adressen" },
    ],
  },
  "netzwerktechnik-protokolle-ueberblick": {
    prompt: "Ordnen Sie die Protokolle ihren Standard-Ports zu.",
    pairs: [
      { left: "HTTP", right: "80" },
      { left: "HTTPS", right: "443" },
      { left: "SSH", right: "22" },
      { left: "SMTP", right: "25" },
      { left: "DNS", right: "53" },
    ],
  },
  "projektmanagement-agile-scrum": {
    prompt: "Ordnen Sie die Scrum-Begriffe ihren Aufgaben zu.",
    pairs: [
      { left: "Product Owner", right: "Vertritt den Kunden, pflegt das Backlog" },
      { left: "Scrum Master", right: "Berät das Team, hütet den Prozess" },
      { left: "Sprint Planning", right: "Team plant die Sprint-Ziele" },
      { left: "Daily Scrum", right: "15 Minuten, täglich" },
      { left: "Sprint Review", right: "Inkrement vorstellen" },
      { left: "Retrospektive", right: "Verbesserungen für den nächsten Sprint" },
    ],
  },
};

// Einheiten für numeric-Konvertierungen (sonst keine).
const UNITS: Record<string, string> = {
  "hw-p-7": "Bytes",
  "hw-p-16": "TB",
  "hw-e-7": "TB",
  "is-2": "Zeichen",
  "is-5": "Kopien",
  "is-20": "Positionen",
};

const NUMERIC_RE = /^-?\d+(?:\.\d+)?$/;

// ─── Konvertierung ──────────────────────────────────────────────────────────

function convertFlashcard(card: (typeof allFlashcards)[number], slug: string, index: number): RecallExercise {
  const keyPoints = [...(card.category ? [card.category] : []), ...(card.hint ? [card.hint] : [])];
  return {
    id: `${slug}-fk-${String(index + 1).padStart(2, "0")}`,
    type: "recall",
    difficulty: 1,
    prompt: card.front,
    sampleAnswer: card.back,
    keyPoints: keyPoints.length > 0 ? keyPoints : [card.back],
  };
}

function convertExercise(
  ex: (typeof computersystemePractice)[number],
  slug: string,
  index: number
): Exercise {
  const id = `${slug}-ex-${String(index + 1).padStart(2, "0")}`;
  if (ex.type === "multiple" && ex.options && ex.correctOption) {
    const correctIndex = ex.options.findIndex((o) => o.value === ex.correctOption);
    if (correctIndex === -1) {
      throw new Error(`Aufgabe ${ex.id}: correctOption "${ex.correctOption}" nicht in options.`);
    }
    return {
      id,
      type: "choice",
      difficulty: ex.difficulty,
      prompt: ex.question,
      options: ex.options.map((o) => o.label),
      correctIndex,
      explanation: ex.solution + (ex.hint ? `\nTipp: ${ex.hint}` : ""),
    };
  }
  const expected = ex.expectedAnswer ?? "";
  if (NUMERIC_RE.test(expected)) {
    return {
      id,
      type: "numeric",
      difficulty: ex.difficulty,
      prompt: ex.question,
      answer: Number(expected),
      ...(ex.tolerance !== undefined ? { tolerance: ex.tolerance } : {}),
      ...(UNITS[ex.id] ? { unit: UNITS[ex.id] } : {}),
      explanation: ex.solution + (ex.hint ? `\nTipp: ${ex.hint}` : ""),
    };
  }
  return {
    id,
    type: "recall",
    difficulty: ex.difficulty,
    prompt: ex.question,
    sampleAnswer: ex.solution,
    keyPoints: [expected, ...(ex.hint ? [ex.hint] : [])],
  };
}

// ─── Hauptablauf ────────────────────────────────────────────────────────────

interface TemplateFile {
  items: { topicSlug: string | null; title: string }[];
}

function main(): void {
  const dir = join(process.cwd(), "content", "exercises");
  mkdirSync(dir, { recursive: true });

  const template = JSON.parse(
    readFileSync(join(process.cwd(), "content", "plan-templates", `${PLAN_TEMPLATE_SLUG}.json`), "utf8")
  ) as TemplateFile;
  const titleBySlug = new Map(template.items.filter((i) => i.topicSlug).map((i) => [i.topicSlug as string, i.title]));

  const cardsById = new Map(allFlashcards.map((c) => [c.id, c]));
  const exercisesById = new Map(
    [...computersystemePractice, ...computersystemeExam, ...itSicherheitPractice, ...itSicherheitExam].map(
      (e) => [e.id, e]
    )
  );

  const usedCards = new Set<string>();
  const usedExercises = new Set<string>();
  let written = 0;

  for (const [slug, mapping] of Object.entries(MAPPING)) {
    const converted: Exercise[] = [];

    for (const cardId of mapping.cards ?? []) {
      const card = cardsById.get(cardId);
      if (!card) throw new Error(`Karte "${cardId}" existiert nicht in flashcardData.`);
      converted.push(convertFlashcard(card, slug, converted.length));
      usedCards.add(cardId);
    }

    const match = MATCHES[slug];
    if (match) {
      converted.push({
        id: `${slug}-match-1`,
        type: "match",
        difficulty: 1,
        prompt: match.prompt,
        pairs: match.pairs,
      });
    }

    let exIndex = converted.length;
    for (const exId of mapping.exercises ?? []) {
      const ex = exercisesById.get(exId);
      if (!ex) throw new Error(`Aufgabe "${exId}" existiert nicht in den Übungsdateien.`);
      converted.push(convertExercise(ex, slug, exIndex));
      exIndex += 1;
      usedExercises.add(exId);
    }

    if (converted.length === 0) {
      console.log(`Übersprungen (leer): ${slug}`);
      continue;
    }

    const outPath = join(dir, `${slug}.json`);
    if (existsSync(outPath)) {
      // Prozedurale Datei ergänzen statt überschreiben (subnetting, netzplan).
      const existing = JSON.parse(readFileSync(outPath, "utf8")) as ExerciseFile;
      const kept = existing.exercises.filter((e) => !e.id.startsWith(`${slug}-ex-`) && !e.id.startsWith(`${slug}-fk-`) && !e.id.startsWith(`${slug}-match-`));
      const file: ExerciseFile = { ...existing, exercises: [...kept, ...converted] };
      writeFileSync(outPath, JSON.stringify(file, null, 2) + "\n");
      console.log(`Ergänzt: ${slug} (+${converted.length} konvertierte Aufgaben, gesamt ${file.exercises.length})`);
    } else {
      const file: ExerciseFile = {
        topicSlug: slug,
        planTemplateSlug: PLAN_TEMPLATE_SLUG,
        itemTitle: titleBySlug.get(slug) ?? slug,
        source: "existing",
        reviewedBy: null,
        exercises: converted,
      };
      writeFileSync(outPath, JSON.stringify(file, null, 2) + "\n");
      console.log(`Geschrieben: ${slug} (${converted.length} Aufgaben)`);
    }
    written += 1;
  }

  const unmappedCards = allFlashcards.filter((c) => !usedCards.has(c.id));
  const unmappedExercises = [...exercisesById.values()].filter((e) => !usedExercises.has(e.id));
  console.log(`\nFertig: ${written} Datei(en).`);
  console.log(
    `Nicht zugeordnet (kein AP1-Topic): ${unmappedCards.length} Karten (${unmappedCards.map((c) => c.id).join(", ")}), ` +
      `${unmappedExercises.length} Übungen (${unmappedExercises.map((e) => e.id).join(", ")}).`
  );
  console.log("REVIEW-PFLICHT: Dateien vor dem Commit durchsehen und reviewedBy eintragen.");
}

main();
