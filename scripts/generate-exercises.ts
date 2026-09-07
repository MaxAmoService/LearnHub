/**
 * generate-exercises.ts — Übungsaufgaben per LLM erzeugen (Quelle C).
 *
 * Autorenwerkzeug, KEIN Website-Feature: erzeugt content/exercises/<slug>.json
 * für EIN AP1-Thema pro Aufruf (ein schlechter Prompt verbrennt so nie das
 * ganze Kontingent). Ausgabe wird per Zod validiert und bei numeric-Aufgaben
 * über das calculation-Feld maschinell nachgerechnet — falsche Lösungen
 * kommen nicht ins Repo.
 *
 * Usage:
 *   npm run gen:exercises -- --topic <slug> [--model <id>] [--count 5]
 *                         [--dry-run] [--force]
 *
 *   --dry-run  druckt den vollständigen System-Prompt + Kontext und ruft die
 *              API NICHT auf — zum Nachschärfen des Prompts, bevor man zahlt.
 *   --force    überschreibt eine bestehende Datei (sonst Abbruch).
 *
 * API-Key ausschließlich aus Env OPENROUTER_API_KEY — niemals im Repo.
 * REVIEW-PFLICHT: Die Datei wird NICHT automatisch committet. Nach dem Lauf
 * durchsehen und reviewedBy in der Datei eintragen.
 */

import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

/**
 * Neutrale Vorauswahl über OpenRouters Auto-Routing — bewusst KEIN fester
 * Anbieter, damit sich hier keine unhinterfragte Präferenz einbrennt.
 * Frei überschreibbar: `--model <id>` (höchste Priorität) oder Env
 * OPENROUTER_MODEL. Für reproduzierbare Ergebnisse beim ersten Lauf ein
 * konkretes Modell per --model wählen (z. B. einen der großen
 * Reasoning-Anbieter); openrouter/auto kann zwischen Läufen variieren.
 */
const DEFAULT_MODEL = "openrouter/auto";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const PLAN_TEMPLATE_SLUG = "ap1-it-berufe";
const MAX_ATTEMPTS = 2; // Erstlauf + EIN neuer Versuch nach Ablehnung

// ─── CLI-Argumente ──────────────────────────────────────────────────────────

function readArgs(argv: string[]): {
  topic: string | null;
  model: string | null;
  count: number;
  dryRun: boolean;
  force: boolean;
  help: boolean;
} {
  const args: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const [key, inline] = a.slice(2).split("=");
    if (inline !== undefined) {
      args[key] = inline;
    } else {
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith("--")) {
        args[key] = next;
        i += 1;
      } else {
        args[key] = true;
      }
    }
  }

  const countRaw = typeof args.count === "string" ? Number.parseInt(args.count, 10) : 5;
  return {
    topic: typeof args.topic === "string" ? args.topic : null,
    model: typeof args.model === "string" ? args.model : null,
    count: Number.isFinite(countRaw) ? Math.min(Math.max(countRaw, 1), 20) : 5,
    dryRun: args["dry-run"] === true,
    force: args.force === true,
    help: args.help === true,
  };
}

const USAGE = `Usage: npm run gen:exercises -- --topic <slug> [--model <id>] [--count 5] [--dry-run] [--force]

  --topic <slug>   topicSlug aus content/plan-templates/ap1-it-berufe.json (Pflicht)
  --model <id>     OpenRouter-Modell-ID (sonst OPENROUTER_MODEL, sonst "${DEFAULT_MODEL}")
  --count <n>      Anzahl Aufgaben (Default 5, max 20)
  --dry-run        Prompt + Kontext ausgeben, KEINE API-Anfrage
  --force          bestehende Datei überschreiben`;

// ─── Vorlagen-Kontext ───────────────────────────────────────────────────────

interface TemplateItem {
  title: string;
  moduleSlug: string | null;
  order: number;
  topicSlug: string | null;
}

interface TemplateFile {
  items: TemplateItem[];
}

interface TopicContext {
  itemTitle: string;
  moduleSlug: string | null;
  /** Anzeigename des Bereichs, abgeleitet aus dem topicSlug-Präfix. */
  areaName: string;
  /** Themen desselben Bereichs (ohne das Zielthema) — Überlappung vermeiden. */
  siblings: string[];
  standalone: boolean;
}

// Bereichszuordnung über das topicSlug-Präfix — NICHT über moduleSlug, sonst
// landen z. B. bei wirtschaft-* die Zahlensysteme-Themen als Nachbarn
// (beide haben moduleSlug null).
const AREAS: Array<{ prefix: string; name: string }> = [
  { prefix: "computersysteme-", name: "Computersysteme" },
  { prefix: "netzwerktechnik-", name: "Netzwerktechnik" },
  { prefix: "zahlensysteme-", name: "Zahlensysteme" },
  { prefix: "it-sicherheit-", name: "IT-Sicherheit" },
  { prefix: "wirtschaft-", name: "Wirtschaft" },
  { prefix: "projektmanagement-", name: "Projektmanagement" },
  { prefix: "diagramme-", name: "Diagramme" },
];

function areaOf(topicSlug: string): { prefix: string; name: string } | null {
  return AREAS.find((a) => topicSlug.startsWith(a.prefix)) ?? null;
}

function loadTopicContext(topicSlug: string): TopicContext {
  const raw = readFileSync(
    join(process.cwd(), "content", "plan-templates", `${PLAN_TEMPLATE_SLUG}.json`),
    "utf8"
  );
  const template = JSON.parse(raw) as TemplateFile;
  const topic = template.items.find((i) => i.topicSlug === topicSlug);
  if (!topic) {
    throw new Error(`Thema "${topicSlug}" nicht in der Vorlage ${PLAN_TEMPLATE_SLUG} gefunden.`);
  }
  const area = areaOf(topicSlug);
  const moduleSlug = topic.moduleSlug ?? null;
  const siblings = template.items
    .filter(
      (i) =>
        i.topicSlug !== topicSlug &&
        area !== null &&
        areaOf(i.topicSlug ?? "")?.prefix === area.prefix
    )
    .map((i) => i.title);
  return {
    itemTitle: topic.title,
    moduleSlug,
    areaName: area?.name ?? moduleSlug ?? "kein Bereich",
    siblings,
    standalone: moduleSlug === null,
  };
}

// ─── Prompts ────────────────────────────────────────────────────────────────

function buildSystemPrompt(ctx: TopicContext): string {
  const bereich = ctx.areaName;
  return [
    "Du bist Autor von Übungsaufgaben für die IHK-Abschlussprüfung Teil 1 (AP1) der IT-Berufe",
    "(Fachinformatiker/-in, IT-System-Elektroniker/-in usw.). Deine Aufgaben bereiten Auszubildende",
    "auf die schriftliche AP1-Prüfung vor. Du schreibst in deutschsprachiger IHK-Prüfungssprache:",
    "sachlich, präzise, mit Fachbegriffen, wie sie in echten Prüfungsaufgaben vorkommen.",
    "KEINE Schulbuch-Aufgaben, keine trivialen Definitionsabfragen, wenn es einen prüfungsnaheren",
    "Zugang gibt.",
    "",
    "ZIEL: Die Aufgaben sollen aktives Abrufen erzwingen, nicht Wiedererkennen. Der Auszubildende",
    "soll produzieren (Rechenweg, Begründung, Zuordnung) und sich anhand der Musterlösung ehrlich",
    "selbst prüfen können.",
    "",
    "AUFGABENTYPEN: Nutze eine Mischung aller vier Typen — die Mischung ist Teil des Lerneffekts:",
    "1. \"recall\" — freies Abrufen. Frage/Aufgabenstellung, der Lernende antwortet frei und",
    "   vergleicht danach mit der Musterlösung. Felder: prompt, sampleAnswer (ausführliche",
    "   Musterlösung), keyPoints (3-6 Stichpunkte, die vorkommen müssen).",
    "2. \"numeric\" — Rechenaufgabe mit Eingabefeld. Felder: prompt, answer (Zahl; bei Bitmustern/",
    "   Kodierungen ein String), tolerance (optional), unit (optional), calculation (PFLICHT,",
    "   siehe unten), explanation (der vollständige Rechenweg, nicht nur das Ergebnis).",
    "3. \"choice\" — Multiple Choice. NUR dort einsetzen, wo Abgrenzung das eigentliche Lernziel",
    "   ist (z. B. ähnliche Begriffe, ähnliche Verfahren, typische Fehlannahmen). Die",
    "   Distraktoren MÜSSEN typische Verwechslungen abbilden — Dinge, die Prüflinge tatsächlich",
    "   verwechseln (ähnliche Begriffe, vertauschte Zahlenwerte, falsche Merksätze). Offensichtlich",
    "   falsche oder lächerliche Antworten machen die Aufgabe wertlos. Felder: prompt, options",
    "   (3-6 Optionen), correctIndex, explanation (erklärt auch, WARUM die anderen Optionen",
    "   falsch sind).",
    "4. \"match\" — Zuordnen: Begriffe zu Definitionen, Schichten zu Protokollen, Befehle zu",
    "   Wirkung. Felder: prompt, pairs (3-8 Paare {left, right}). Die rechte Seite wird in der",
    "   Übung gemischt — Formulierungen müssen auch gemischt eindeutig bleiben.",
    "",
    "Wähle für jede Aufgabe den Typ, der zu ihrem Inhalt passt: Rechenbares → numeric,",
    "Abgrenzbares mit echten Verwechslern → choice, Begriffspaare/Schichten/Befehle → match,",
    "Begründungen, Erklärungen, Vorgehen → recall. Verlange pro Aufgabe den Weg, nicht nur das",
    "Ergebnis.",
    "",
    `THEMA: ${ctx.itemTitle}`,
    `BEREICH: ${bereich}`,
    ctx.siblings.length > 0
      ? `NACHBARTHEMEN (gleicher Bereich — Aufgaben dürfen NICHT überlappen):\n${ctx.siblings.map((t) => `- ${t}`).join("\n")}`
      : "NACHBARTHEMEN: keine (Einzelthema im Bereich).",
    "",
    ...(ctx.standalone
      ? [
          "STANDALONE-THEMA: Zu diesem Thema existiert in der Lernplattform KEIN Erklärtext.",
          "Jede Musterlösung muss das Thema aus sich heraus erklären: Definition/Prinzip, den",
          "Zusammenhang und — bei Rechenaufgaben — den vollständigen Rechenweg mit Zwischen-",
          "schritten. Der Lernende muss allein aus deiner Musterlösung lernen können, was hier",
          "gemeint ist.",
          "",
        ]
      : []),
    "NUMERIC-VERIFIKATION: Das calculation-Feld enthält die reine Arithmetik der Lösung als",
    "Ausdruck mit Zahlen und +, -, *, /, ^, % sowie Klammern (z. B. \"2^6 - 2\"). Die Antwort",
    "wird automatisch nachgerechnet und die Aufgabe bei Abweichung VERWORFEN — rechne also",
    "sorgfältig, das ist keine Zierde. Rundungsantworten: calculation so wählen, dass es exakt",
    "auf den Wert von answer führt (bei gerundetem answer ohne tolerance lieber eine Aufgabe",
    "mit ganzzahliger Lösung wählen).",
    "",
    "SCHWIERIGKEIT: difficulty 1-3 verteilen (1 = einfacher Abruf, 2 = Transfer/ein Rechenschritt,",
    "3 = mehrstufig/Prüfungsniveau). Mindestens eine Aufgabe mit difficulty 3.",
    "",
    "ANTWORTFORMAT: Du antwortest AUSSCHLIESSLICH mit einem JSON-Objekt (kein Markdown, keine",
    "Erläuterung außerhalb des JSON) der Form:",
    '{"exercises": [{"type": "recall"|"numeric"|"choice"|"match", "difficulty": 1|2|3,',
    '"prompt": "…", <typspezifische Felder wie oben>}]}',
    "IDs vergeben wir selbst — kein id-Feld mitschicken.",
  ].join("\n");
}

function buildUserPrompt(ctx: TopicContext, count: number): string {
  return [
    `Erstelle ${count} Übungsaufgaben zum Thema „${ctx.itemTitle}" (AP1, IHK IT-Berufe).`,
    "",
    "Halte dich exakt an das Antwortformat. Mische die vier Aufgabentypen passend zum Thema.",
    "Jede Erklärung zeigt den Weg. Distraktoren sind echte Verwechslungskandidaten.",
    ctx.standalone
      ? "Standalone-Thema: Musterlösungen müssen das Thema vollständig aus sich heraus erklären."
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

// ─── Sichere Arithmetik (kein eval) ─────────────────────────────────────────

function evaluateArithmetic(input: string): number | null {
  const tokens = input.match(/\d+(?:\.\d+)?|[a-zA-Z]+|[+\-*/^%()]/g) ?? [];
  let pos = 0;

  function peek(): string | undefined {
    return tokens[pos];
  }
  function next(): string {
    return tokens[pos++] ?? "";
  }

  function parseExpr(): number | null {
    let value = parseTerm();
    if (value === null) return null;
    for (;;) {
      const op = peek();
      if (op === "+" || op === "-") {
        next();
        const rhs = parseTerm();
        if (rhs === null) return null;
        value = op === "+" ? value + rhs : value - rhs;
      } else {
        return value;
      }
    }
  }

  function parseTerm(): number | null {
    let value = parseFactor();
    if (value === null) return null;
    for (;;) {
      const op = peek();
      if (op === "*" || op === "/" || op === "%") {
        next();
        const rhs = parseFactor();
        if (rhs === null) return null;
        if (op === "*") value = value * rhs;
        else if (op === "/") {
          if (rhs === 0) return null;
          value = value / rhs;
        } else {
          if (rhs === 0) return null;
          value = value % rhs;
        }
      } else {
        return value;
      }
    }
  }

  function parseFactor(): number | null {
    const base = parseUnary();
    if (base === null) return null;
    if (peek() === "^") {
      next();
      const exp = parseFactor(); // rechts-assoziativ
      if (exp === null) return null;
      return Math.pow(base, exp);
    }
    return base;
  }

  function parseUnary(): number | null {
    if (peek() === "-") {
      next();
      const v = parseUnary();
      return v === null ? null : -v;
    }
    return parsePrimary();
  }

  function parsePrimary(): number | null {
    const t = peek();
    if (t === undefined) return null;
    if (t === "(") {
      next();
      const v = parseExpr();
      if (peek() !== ")") return null;
      next();
      return v;
    }
    if (/^[a-zA-Z]+$/.test(t)) {
      const fn = next();
      if (peek() !== "(") return null;
      next();
      const arg = parseExpr();
      if (peek() !== ")") return null;
      next();
      if (arg === null) return null;
      if (fn === "sqrt") return Math.sqrt(arg);
      if (fn === "log2") return Math.log2(arg);
      if (fn === "ceil") return Math.ceil(arg);
      if (fn === "floor") return Math.floor(arg);
      if (fn === "round") return Math.round(arg);
      return null;
    }
    const n = Number(next());
    return Number.isFinite(n) ? n : null;
  }

  const result = parseExpr();
  if (pos !== tokens.length || result === null || !Number.isFinite(result)) return null;
  return result;
}

// ─── Zod-Schema & Verifikation ──────────────────────────────────────────────

const base = {
  difficulty: z.number().int().min(1).max(3),
  prompt: z.string().min(1),
};

const exerciseSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("recall"),
    ...base,
    sampleAnswer: z.string().min(1),
    keyPoints: z.array(z.string().min(1)).min(1).max(8),
  }),
  z.object({
    type: z.literal("numeric"),
    ...base,
    answer: z.union([z.number().finite(), z.string().min(1)]),
    tolerance: z.number().nonnegative().optional(),
    unit: z.string().min(1).optional(),
    calculation: z.string().min(1).optional(),
    explanation: z.string().min(1),
  }),
  z.object({
    type: z.literal("choice"),
    ...base,
    options: z.array(z.string().min(1)).min(3).max(6),
    correctIndex: z.number().int().min(0),
    explanation: z.string().min(1),
  }),
  z.object({
    type: z.literal("match"),
    ...base,
    pairs: z
      .array(z.object({ left: z.string().min(1), right: z.string().min(1) }))
      .min(2)
      .max(8),
  }),
]);

const responseSchema = z.object({ exercises: z.array(exerciseSchema).min(1).max(20) });

type GeneratedExercise = z.infer<typeof exerciseSchema>;

interface VerificationResult {
  kept: GeneratedExercise[];
  discarded: { index: number; type: string; reason: string }[];
}

/** Strukturelle Zusatzprüfungen + numeric-Nachrechnung. */
function verifyExercises(exercises: GeneratedExercise[]): VerificationResult {
  const kept: GeneratedExercise[] = [];
  const discarded: VerificationResult["discarded"] = [];

  exercises.forEach((ex, index) => {
    if (ex.type === "choice" && ex.correctIndex >= ex.options.length) {
      discarded.push({ index, type: "choice", reason: `correctIndex ${ex.correctIndex} außerhalb von options (${ex.options.length})` });
      return;
    }
    if (ex.type === "choice" && new Set(ex.options).size !== ex.options.length) {
      discarded.push({ index, type: "choice", reason: "options enthalten Duplikate" });
      return;
    }
    if (ex.type === "match" && new Set(ex.pairs.map((p) => p.left)).size !== ex.pairs.length) {
      discarded.push({ index, type: "match", reason: "pairs enthalten doppelte left-Einträge" });
      return;
    }
    if (ex.type === "numeric" && typeof ex.answer === "number") {
      if (ex.calculation === undefined) {
        discarded.push({
          index,
          type: "numeric",
          reason: "kein calculation-Feld — Lösung nicht maschinell nachrechenbar",
        });
        return;
      }
      const calc = evaluateArithmetic(ex.calculation);
      if (calc === null) {
        discarded.push({ index, type: "numeric", reason: `calculation "${ex.calculation}" nicht auswertbar` });
        return;
      }
      const tolerance = ex.tolerance ?? 1e-9 * Math.max(1, Math.abs(calc));
      if (Math.abs(calc - ex.answer) > tolerance) {
        discarded.push({
          index,
          type: "numeric",
          reason: `Lösung falsch: ${ex.calculation} = ${calc}, angegeben: ${ex.answer}`,
        });
        return;
      }
    }
    if (ex.type === "numeric" && typeof ex.answer === "string") {
      if (ex.calculation !== undefined) {
        discarded.push({
          index,
          type: "numeric",
          reason: "calculation bei String-Antwort — Kombination nicht prüfbar",
        });
        return;
      }
    }
    kept.push(ex);
  });

  return { kept, discarded };
}

// ─── OpenRouter-Aufruf ──────────────────────────────────────────────────────

interface OpenRouterError {
  error?: { message?: string };
}

async function callModel(
  apiKey: string,
  model: string,
  messages: { role: "system" | "user"; content: string }[]
): Promise<GeneratedExercise[]> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model, messages }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as OpenRouterError | null;
    throw new Error(
      `OpenRouter-Fehler ${res.status}: ${body?.error?.message ?? res.statusText}`
    );
  }

  const body = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = body.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenRouter-Antwort enthält keinen Inhalt.");

  const stripped = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const parsed = responseSchema.safeParse(JSON.parse(stripped));
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `- ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Antwort entspricht nicht dem Schema:\n${issues}`);
  }
  return parsed.data.exercises;
}

// ─── Hauptablauf ────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = readArgs(process.argv.slice(2));
  if (args.help || args.topic === null) {
    console.log(USAGE);
    process.exitCode = args.topic === null && !args.help ? 1 : 0;
    return;
  }

  const ctx = loadTopicContext(args.topic);
  const systemPrompt = buildSystemPrompt(ctx);
  const userPrompt = buildUserPrompt(ctx, args.count);
  const model = args.model ?? process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL;
  const modelSource = args.model ? "--model" : process.env.OPENROUTER_MODEL ? "OPENROUTER_MODEL" : "Default";

  if (args.dryRun) {
    console.log("─".repeat(72));
    console.log(`Thema:        ${ctx.itemTitle} (${args.topic})`);
    console.log(`Modul:        ${ctx.moduleSlug ?? "keins (standalone)"}`);
    console.log(`Modell:       ${model} (Quelle: ${modelSource})`);
    console.log(`Anzahl:       ${args.count}`);
    console.log("─".repeat(72));
    console.log("\n═══ SYSTEM-PROMPT (vollständig) ═══\n");
    console.log(systemPrompt);
    console.log("\n═══ USER-PROMPT (vollständig) ═══\n");
    console.log(userPrompt);
    console.log("\n(dry-run: keine API-Anfrage gesendet)");
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY nicht gesetzt. Der Key kommt ausschließlich aus der Env, niemals ins Repo.");
  }

  let exercises: GeneratedExercise[] = [];
  const failures: string[] = [];

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const feedback =
      attempt === 1 || failures.length === 0
        ? ""
        : `\n\nDeine vorherige Antwort wurde abgelehnt. Fehler:\n${failures.join("\n")}\nAntworte erneut, diesmal schema- und rechenkonform.`;
    try {
      const raw = await callModel(apiKey, model, [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt + feedback },
      ]);
      const { kept, discarded } = verifyExercises(raw);
      failures.push(...discarded.map((d) => `Aufgabe ${d.index + 1} (${d.type}): ${d.reason}`));
      if (kept.length === 0) {
        throw new Error("Alle Aufgaben verworfen.");
      }
      exercises = kept;
      break;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      failures.push(message);
      if (attempt === MAX_ATTEMPTS) {
        console.error(`\nNach ${MAX_ATTEMPTS} Versuchen abgebrochen. Ablehnungsgründe:\n${failures.join("\n")}`);
        process.exitCode = 1;
        return;
      }
      console.warn(`Versuch ${attempt} abgelehnt — neuer Versuch (${message.split("\n")[0]})`);
    }
  }

  const byType = new Map<string, number>();
  for (const ex of exercises) byType.set(ex.type, (byType.get(ex.type) ?? 0) + 1);

  const file: unknown = {
    topicSlug: args.topic,
    planTemplateSlug: PLAN_TEMPLATE_SLUG,
    itemTitle: ctx.itemTitle,
    source: "generated",
    generatedWith: model,
    reviewedBy: null,
    ...(ctx.standalone ? { standalone: true } : {}),
    exercises: exercises.map((ex, i) => ({
      ...ex,
      id: `${args.topic}-${String(i + 1).padStart(2, "0")}`,
    })),
  };

  const dir = join(process.cwd(), "content", "exercises");
  const outPath = join(dir, `${args.topic}.json`);
  mkdirSync(dir, { recursive: true });

  if (existsSync(outPath) && !args.force) {
    console.error(`"${outPath}" existiert bereits — mit --force überschreiben oder vorher prüfen.`);
    process.exitCode = 1;
    return;
  }

  writeFileSync(outPath, JSON.stringify(file, null, 2) + "\n");

  console.log(`\nGeschrieben: content/exercises/${args.topic}.json (${exercises.length} Aufgaben)`);
  console.log(`Typen: ${[...byType.entries()].map(([t, n]) => `${t}×${n}`).join(", ") || "–"}`);
  if (failures.length > 0) {
    console.log(`\nVerworfen (nicht gespeichert):\n${failures.map((f) => `  - ${f}`).join("\n")}`);
  }
  console.log("\nREVIEW-PFLICHT: Datei vor dem Commit durchsehen und reviewedBy eintragen.");
  console.log("Generierte Aufgaben werden nicht automatisch committet.");
}

main().catch((err) => {
  console.error("Generator fehlgeschlagen:", err instanceof Error ? err.message : err);
  process.exitCode = 1;
});
