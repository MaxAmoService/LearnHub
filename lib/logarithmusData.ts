import { Module, QuizQuestion } from "./types";
import { Exercise } from "./mathExercises";
import { createExerciseLessons } from "./lessonHelpers";

// =============================================================================
// Modul: Logarithmen
// =============================================================================

export const logarithmusModule: Module = {
  id: "m-logarithmus",
  slug: "mathe-logarithmus",
  title: "Logarithmen",
  description:
    "Vom Grundbegriff des Logarithmus über Rechengesetze bis hin zu logarithmischen Gleichungen — alles für die IHK-Prüfung",
  icon: "📉",
  color: "#8b5cf6",
  category: "grundlagen",
  progress: 0,
  merkblatt: `## Merkblatt: Logarithmen

### Definition
- $\\log_a(b) = c \\Leftrightarrow a^c = b$ — "Zu welcher Potenz muss ich $a$ erheben, um $b$ zu bekommen?"
- Natürlicher Logarithmus: $\\ln(x) = \\log_e(x)$ mit $e \\approx 2{,}718$
- Dekadischer Logarithmus: $\\log(x) = \\log_{10}(x)$

### Logarithmus-Gesetze
| Gesetz | Formel |
|--------|--------|
| Produkt | $\\log(a \\cdot b) = \\log a + \\log b$ |
| Quotient | $\\log(a : b) = \\log a - \\log b$ |
| Potenz | $\\log(a^n) = n \\cdot \\log a$ |
| Basiswechsel | $\\log_a(b) = \\frac{\\ln b}{\\ln a}$ |
| Umkehrung | $a^{\\log_a(x)} = x$, $\\log_a(a^x) = x$ |

### Spezialwerte
- $\\log_a(1) = 0$ für alle $a > 0, a \\neq 1$
- $\\log_a(a) = 1$ für alle $a > 0, a \\neq 1$
- $\\log_a(a^n) = n$
- $\\ln(e) = 1$, $\\log(10) = 1$`,

  lessons: [
    // =========================================================================
    // LEKTION 1: Was ist ein Logarithmus?
    // =========================================================================
    {
      id: "log-1",
      title: "Was ist ein Logarithmus?",
      duration: "15 min",
      type: "text",
      content: `## Die Frage hinter dem Logarithmus

Du kennst Potenzen: $2^3 = 8$. Aber was, wenn du die **umgekehrte** Frage stellen willst?

> "Zu welcher Potenz muss ich $2$ erheben, um $8$ zu bekommen?"

Genau das beantwortet der **Logarithmus**!

---

## Definition

$$\\log_a(b) = c \\quad \\Longleftrightarrow \\quad a^c = b$$

Gelesen: "Logarithmus von $b$ zur Basis $a$ ist gleich $c$."

Die Bedingungen: $a > 0$, $a \\neq 1$, $b > 0$.

---

## Erste Beispiele

| Frage | Potenzschreibweise | Logarithmus |
|-------|-------------------|-------------|
| $2^? = 8$ | $2^3 = 8$ | $\\log_2(8) = 3$ |
| $10^? = 1000$ | $10^3 = 1000$ | $\\log_{10}(1000) = 3$ |
| $5^? = 1$ | $5^0 = 1$ | $\\log_5(1) = 0$ |
| $3^? = \\frac{1}{9}$ | $3^{-2} = \\frac{1}{9}$ | $\\log_3\\!\\left(\\frac{1}{9}\\right) = -2$ |

> **Merke:** Der Logarithmus ist die **Umkehrung** der Potenzierung — genau wie die Wurzel die Umkehrung des Quadrierens ist.

---

## Zwei wichtige Spezialfälle

### Natürlicher Logarithmus ($\\ln$)
$$\\ln(x) = \\log_e(x) \\quad \\text{mit} \\quad e \\approx 2{,}71828\\ldots$$
Verwendung: Wachstumsprozesse, Ableitungen, Differentialgleichungen.

### Dekadischer Logarithmus ($\\log$)
$$\\log(x) = \\log_{10}(x)$$
Verwendung: Zehnerpotenzen, Dezibel, pH-Wert.

---

## Schritt-für-Schritt Beispiel

**Aufgabe:** Berechne $\\log_2(32)$.

**Schritt 1:** Frage stellen: "Zu welcher Potenz muss ich $2$ erheben, um $32$ zu bekommen?"

**Schritt 2:** Potenzieren ausprobieren: $2^1=2$, $2^2=4$, $2^3=8$, $2^4=16$, $2^5=32$

**Schritt 3:** Treffer! $2^5 = 32$

**Ergebnis:** $\\log_2(32) = 5$

---

## Spezialwerte merken

$$\\log_a(1) = 0 \\quad \\text{denn} \\quad a^0 = 1$$
$$\\log_a(a) = 1 \\quad \\text{denn} \\quad a^1 = a$$
$$\\log_a(a^n) = n \\quad \\text{denn} \\quad a^n = a^n$$

> **Nächste Lektion:** Damit du nicht immer raten musst, gibt es Rechengesetze, mit denen du Logarithmen vereinfachen und umformen kannst!

[PRACTICE_START]
**Aufgabe 1:** Berechne $\\log_3(27)$

**Lösung:** $3^3 = 27$, also $\\log_3(27) = 3$

**Aufgabe 2:** Berechne $\\log_{10}(0{,}01)$

**Lösung:** $10^{-2} = 0{,}01$, also $\\log_{10}(0{,}01) = -2$

**Aufgabe 3:** Berechne $\\ln(e^4)$

**Lösung:** $\\ln$ und $e^x$ sind Umkehrfunktionen: $\\ln(e^4) = 4$
[PRACTICE_END]`,
    },

    // =========================================================================
    // LEKTION 2: Logarithmus-Gesetze
    // =========================================================================
    {
      id: "log-2",
      title: "Logarithmus-Gesetze",
      duration: "15 min",
      type: "text",
      content: `## Die drei Grundgesetze

In der letzten Lektion hast du gelernt, was ein Logarithmus ist. Jetzt kommen die **Rechengesetze**, mit denen du komplexe Ausdrücke vereinfachen kannst.

---

## 1. Produktregel — "Logarithmus einer Multiplikation"

$$\\log_a(x \\cdot y) = \\log_a(x) + \\log_a(y)$$

**Beispiel:**
$$\\log_2(8 \\cdot 4) = \\log_2(8) + \\log_2(4) = 3 + 2 = 5$$
Probe: $8 \\cdot 4 = 32 = 2^5$ ✓

> **Warum funktioniert das?** Weil bei gleicher Basis die Exponenten bei der Multiplikation addiert werden: $a^m \\cdot a^n = a^{m+n}$.

---

## 2. Quotientenregel — "Logarithmus einer Division"

$$\\log_a\\!\\left(\\frac{x}{y}\\right) = \\log_a(x) - \\log_a(y)$$

**Beispiel:**
$$\\log_3\\!\\left(\\frac{81}{9}\\right) = \\log_3(81) - \\log_3(9) = 4 - 2 = 2$$
Probe: $\\frac{81}{9} = 9 = 3^2$ ✓

---

## 3. Potenzregel — "Exponent vor den Logarithmus"

$$\\log_a(x^n) = n \\cdot \\log_a(x)$$

**Beispiel:**
$$\\log_2(8^2) = 2 \\cdot \\log_2(8) = 2 \\cdot 3 = 6$$
Probe: $8^2 = 64 = 2^6$ ✓

---

## Basiswechsel-Formel

Was, wenn die Basis weder $10$ noch $e$ ist? Dann wechselt man die Basis:

$$\\log_a(b) = \\frac{\\ln(b)}{\\ln(a)} = \\frac{\\log(b)}{\\log(a)}$$

**Beispiel:** Berechne $\\log_4(8)$

$$\\log_4(8) = \\frac{\\ln(8)}{\\ln(4)} = \\frac{3 \\cdot \\ln(2)}{2 \\cdot \\ln(2)} = \\frac{3}{2} = 1{,}5$$

Probe: $4^{1,5} = 4 \\cdot \\sqrt{4} = 4 \\cdot 2 = 8$ ✓

---

## Schritt-für-Schritt Beispiel

**Aufgabe:** Vereinfache $\\log_2(16) + \\log_2(8) - \\log_2(4)$.

**Schritt 1:** Einzelne Werte berechnen:
- $\\log_2(16) = 4$ (denn $2^4 = 16$)
- $\\log_2(8) = 3$ (denn $2^3 = 8$)
- $\\log_2(4) = 2$ (denn $2^2 = 4$)

**Schritt 2:** Zusammenrechnen: $4 + 3 - 2 = 5$

**Alternative (mit Gesetzen):**
$$\\log_2(16) + \\log_2(8) - \\log_2(4) = \\log_2\\!\\left(\\frac{16 \\cdot 8}{4}\\right) = \\log_2(32) = 5$$

**Ergebnis:** $5$

---

## Zusammenfassung

| Gesetz | Formel |
|--------|--------|
| Produkt | $\\log(a \\cdot b) = \\log a + \\log b$ |
| Quotient | $\\log(a : b) = \\log a - \\log b$ |
| Potenz | $\\log(a^n) = n \\cdot \\log a$ |
| Basiswechsel | $\\log_a(b) = \\frac{\\ln b}{\\ln a}$ |

> **Nächste Lektion:** Mit diesen Gesetzen löst du jetzt Gleichungen, in denen eine Unbekannte im Logarithmus oder im Exponenten steckt!

[PRACTICE_START]
**Aufgabe 1:** Vereinfache $\\log_3(9) + \\log_3(27)$

**Lösung:** $\\log_3(9) = 2$, $\\log_3(27) = 3$. Summe: $2 + 3 = 5$. Alternativ: $\\log_3(9 \\cdot 27) = \\log_3(243) = 5$.

**Aufgabe 2:** Berechne $\\log_5(125) - \\log_5(25)$

**Lösung:** $\\log_5(125) = 3$, $\\log_5(25) = 2$. Differenz: $3 - 2 = 1$. Alternativ: $\\log_5(125/25) = \\log_5(5) = 1$.

**Aufgabe 3:** Berechne $\\log_2(32)$ mithilfe der Potenzregel: $32 = 2^5$

**Lösung:** $\\log_2(2^5) = 5 \\cdot \\log_2(2) = 5 \\cdot 1 = 5$
[PRACTICE_END]`,
    },

    // =========================================================================
    // LEKTION 3: Logarithmische Gleichungen
    // =========================================================================
    {
      id: "log-3",
      title: "Logarithmische Gleichungen",
      duration: "15 min",
      type: "text",
      content: `## Gleichungen mit Logarithmen lösen

Jetzt wird es praktisch: Du löst Gleichungen, bei denen die Unbekannte $x$ **im Logarithmus** oder **im Exponenten** steht.

---

## Typ 1: Unbekannte im Logarithmus

$$\\log_2(x) = 5$$

**Methode:** Zurück zur Potenzschreibweise!

$$\\log_2(x) = 5 \\quad \\Longleftrightarrow \\quad x = 2^5 = 32$$

**Probe:** $\\log_2(32) = 5$ ✓

---

## Typ 2: Unbekannter Exponent (Exponentialgleichung)

$$e^x = 10$$

**Methode:** Logarithmus auf beiden Seiten anwenden!

$$e^x = 10 \\quad \\Longleftrightarrow \\quad x = \\ln(10) \\approx 2{,}303$$

**Probe:** $e^{2,303} \\approx 10$ ✓

---

## Typ 3: Gemischte Gleichungen

### Beispiel A: Basis auflösen
$$\\log_3(x) = 4$$

**Schritt 1:** Zur Potenz: $x = 3^4$

**Schritt 2:** Ausrechnen: $x = 81$

### Beispiel B: Exponent mit Umformung
$$2^x = 64$$

**Schritt 1:** Gleiche Basis finden: $64 = 2^6$

**Schritt 2:** Gleichsetzen: $2^x = 2^6 \\Rightarrow x = 6$

### Beispiel C: Komplexer — Logarithmus-Gesetze anwenden
$$\\log_2(x) + \\log_2(x - 2) = 3$$

**Schritt 1:** Produktregel: $\\log_2(x \\cdot (x-2)) = 3$

**Schritt 2:** Zur Potenz: $x(x-2) = 2^3 = 8$

**Schritt 3:** Gleichung lösen: $x^2 - 2x - 8 = 0$

**Schritt 4:** Mitternachtsformel: $x = \\frac{2 \\pm \\sqrt{4 + 32}}{2} = \\frac{2 \\pm 6}{2}$

**Schritt 5:** $x_1 = 4$ oder $x_2 = -2$

**Schritt 6:** Prüfung: $\\log_2(-2)$ ist nicht definiert! Also: $x = 4$

**Probe:** $\\log_2(4) + \\log_2(2) = 2 + 1 = 3$ ✓

---

## Schritt-für-Schritt Beispiel

**Aufgabe:** Löse $\\ln(x) = 3$.

**Schritt 1:** $\\ln(x) = 3$ bedeutet $\\log_e(x) = 3$

**Schritt 2:** Zur Potenz: $x = e^3$

**Schritt 3:** Ausrechnen: $x = e^3 \\approx 20{,}086$

**Ergebnis:** $x = e^3$

---

## Wichtige Hinweise

1. **Immer probe rechnen!** Logarithmen sind nur für positive Argumente definiert.
2. **Negative Lösungen verwerfen**, wenn sie im Logarithmus auftauchen.
3. **Basiswechsel hilft**, wenn die Basis nicht $10$ oder $e$ ist.

> **Zusammenfassung:** Logarithmen sind die Umkehrung der Potenzierung. Mit den Gesetzen kannst du komplexe Ausdrücke vereinfachen und Gleichungen systematisch lösen.

[PRACTICE_START]
**Aufgabe 1:** Löse $\\log_5(x) = 3$.

**Lösung:** $x = 5^3 = 125$. Probe: $\\log_5(125) = 3$ ✓

**Aufgabe 2:** Löse $e^x = 100$.

**Lösung:** $x = \\ln(100) \\approx 4{,}605$. Probe: $e^{4,605} \\approx 100$ ✓

**Aufgabe 3:** Löse $\\log_2(x) + \\log_2(4) = 5$.

**Lösung:** $\\log_2(x) + 2 = 5 \\Rightarrow \\log_2(x) = 3 \\Rightarrow x = 2^3 = 8$. Probe: $\\log_2(8) + \\log_2(4) = 3 + 2 = 5$ ✓
[PRACTICE_END]`,
    },

    // =========================================================================
    // ABSCHLUSS-TEST + AUFGABEN
    // =========================================================================
    {
      id: "log-quiz",
      title: "Abschlusstest: Logarithmen",
      duration: "15 min",
      type: "quiz",
      content:
        "Beantworte die 10 Fragen. Du brauchst mindestens 80% zum Bestehen.",
    },

    ...createExerciseLessons("m-logarithmus", "Logarithmen", {
      easy: `Definition des Logarithmus anwenden: $\\log_a(b)$ als Umkehrung der Potenzierung verstehen, Spezialwerte wie $\\log_a(1)=0$ und $\\ln(e)=1$ berechnen.`,
      medium: `Logarithmus-Gesetze (Produkt, Quotient, Potenz) anwenden, Basiswechsel durchführen und komplexere Ausdrücke vereinfachen.`,
      hard: `Logarithmische und exponentielle Gleichungen lösen, Gleichungen mit mehreren Logarithmus-Termen umformen und auf Defektstellen prüfen.`,
    }),
  ],
};

// =============================================================================
// Quiz (10 Fragen)
// =============================================================================

export const logarithmusQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-logarithmus": [
    {
      question: "Was ist $\\log_2(16)$?",
      type: "input",
      correct: "4",
      explanation: "$2^4 = 16$, also $\\log_2(16) = 4$.",
      hint: "Zu welcher Potenz muss ich 2 erheben, um 16 zu bekommen?",
    },
    {
      question: "Was ist $\\ln(e)$?",
      type: "multiple",
      options: ["$0$", "$1$", "$e$", "$\\ln(1)$"],
      correct: 1,
      explanation: "$\\ln(e) = \\log_e(e) = 1$, denn $e^1 = e$.",
    },
    {
      question: "Was ist $\\log_{10}(1000)$?",
      type: "input",
      correct: "3",
      explanation: "$10^3 = 1000$, also $\\log_{10}(1000) = 3$.",
      hint: "1000 ist eine Potenz von 10.",
    },
    {
      question: "Welche Aussage ist korrekt?",
      type: "multiple",
      options: [
        "$\\log(a \\cdot b) = \\log a \\cdot \\log b$",
        "$\\log(a \\cdot b) = \\log a + \\log b$",
        "$\\log(a + b) = \\log a + \\log b$",
        "$\\log(a \\cdot b) = \\frac{\\log a}{\\log b}$",
      ],
      correct: 1,
      explanation:
        "Produktregel: $\\log(a \\cdot b) = \\log a + \\log b$. Die Multiplikation im Argument wird zur Addition.",
    },
    {
      question: "Was ist $\\log_5(1)$?",
      type: "multiple",
      options: ["$0$", "$1$", "$5$", "undefiniert"],
      correct: 0,
      explanation:
        "$\\log_a(1) = 0$ für jede Basis $a$, denn $a^0 = 1$.",
    },
    {
      question:
        "Vereinfache: $\\log_3(9) + \\log_3(27)$.",
      type: "input",
      correct: "5",
      explanation:
        "$\\log_3(9) = 2$ und $\\log_3(27) = 3$. Summe: $2 + 3 = 5$.",
      hint: "Berechne jeden Term einzeln.",
    },
    {
      question: "Was ist die Basiswechsel-Formel für $\\log_2(7)$?",
      type: "multiple",
      options: [
        "$\\frac{\\log 2}{\\log 7}$",
        "$\\frac{\\ln 7}{\\ln 2}$",
        "$\\ln 7 - \\ln 2$",
        "$\\frac{\\log 7}{\\ln 2}$",
      ],
      correct: 1,
      explanation:
        "Basiswechsel: $\\log_a(b) = \\frac{\\ln b}{\\ln a}$. Also $\\log_2(7) = \\frac{\\ln 7}{\\ln 2}$.",
    },
    {
      question: "Löse: $\\log_3(x) = 4$.",
      type: "input",
      correct: "81",
      explanation:
        "$\\log_3(x) = 4 \\Rightarrow x = 3^4 = 81$.",
      hint: "Wandle die Gleichung in eine Potenzgleichung um.",
    },
    {
      question:
        "Was ist $\\log_2(8) - \\log_2(4)$?",
      type: "input",
      correct: "1",
      explanation:
        "$\\log_2(8) = 3$ und $\\log_2(4) = 2$. Differenz: $3 - 2 = 1$. Alternativ: $\\log_2(8/4) = \\log_2(2) = 1$.",
    },
    {
      question: "Löse: $e^x = 1$. Was ist $x$?",
      type: "input",
      correct: "0",
      explanation:
        "$e^x = 1 \\Rightarrow x = \\ln(1) = 0$, denn $e^0 = 1$.",
      hint: "Welche Potenz von e ergibt 1?",
    },
  ],
};

// =============================================================================
// Übungsaufgaben (Practice)
// =============================================================================

export const logarithmusPractice: Exercise[] = [
  // === Schwierigkeit 1: Grundlagen ===
  {
    id: "lg-1",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\log_2(64)$.",
    expectedAnswer: "6",
    format: "Ganze Zahl",
    solution: "$2^6 = 64$, also $\\log_2(64) = 6$.",
  },
  {
    id: "lg-2",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\log_{10}(100)$.",
    expectedAnswer: "2",
    format: "Ganze Zahl",
    solution: "$10^2 = 100$, also $\\log_{10}(100) = 2$.",
  },
  {
    id: "lg-3",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "multiple",
    question: "Was ist $\\log_5(5)$?",
    options: [
      { label: "$0$", value: "a" },
      { label: "$1$", value: "b" },
      { label: "$5$", value: "c" },
      { label: "undefiniert", value: "d" },
    ],
    correctOption: "b",
    solution: "$\\log_a(a) = 1$ für jede Basis $a$, denn $a^1 = a$.",
  },
  {
    id: "lg-4",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\ln(1)$.",
    expectedAnswer: "0",
    format: "Ganze Zahl",
    solution: "$\\ln(1) = \\log_e(1) = 0$, denn $e^0 = 1$. Jeder Logarithmus von $1$ ist $0$.",
  },
  {
    id: "lg-5",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\log_3(81)$.",
    expectedAnswer: "4",
    format: "Ganze Zahl",
    solution: "$3^4 = 81$, also $\\log_3(81) = 4$.",
  },
  {
    id: "lg-6",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "multiple",
    question: "Was ist $\\log_7(1)$?",
    options: [
      { label: "$1$", value: "a" },
      { label: "$7$", value: "b" },
      { label: "$0$", value: "c" },
      { label: "undefiniert", value: "d" },
    ],
    correctOption: "c",
    solution: "$7^0 = 1$, also $\\log_7(1) = 0$.",
  },
  {
    id: "lg-7",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\log_{10}(0{,}01)$.",
    expectedAnswer: "-2",
    format: "Ganze Zahl",
    solution: "$10^{-2} = 0{,}01$, also $\\log_{10}(0{,}01) = -2$.",
  },
  {
    id: "lg-8",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\ln(e^5)$.",
    expectedAnswer: "5",
    format: "Ganze Zahl",
    solution: "$\\ln$ und $e^x$ sind Umkehrfunktionen: $\\ln(e^5) = 5$.",
  },
  // === Schwierigkeit 2: Gesetze anwenden ===
  {
    id: "lg-9",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Vereinfache: $\\log_2(8) + \\log_2(4)$.",
    expectedAnswer: "5",
    format: "Ganze Zahl",
    solution: "$\\log_2(8) = 3$ und $\\log_2(4) = 2$. Summe: $3 + 2 = 5$. Alternativ: $\\log_2(32) = 5$.",
  },
  {
    id: "lg-10",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Vereinfache: $\\log_5(125) - \\log_5(25)$.",
    expectedAnswer: "1",
    format: "Ganze Zahl",
    solution: "$\\log_5(125) = 3$ und $\\log_5(25) = 2$. Differenz: $3 - 2 = 1$.",
  },
  {
    id: "lg-11",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "multiple",
    question: "Was ist $\\log_2(2^7)$?",
    options: [
      { label: "$2$", value: "a" },
      { label: "$7$", value: "b" },
      { label: "$14$", value: "c" },
      { label: "$128$", value: "d" },
    ],
    correctOption: "b",
    solution: "Potenzregel: $\\log_a(a^n) = n$. Also $\\log_2(2^7) = 7$.",
  },
  {
    id: "lg-12",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\log_4(64)$ mithilfe der Basiswechsel-Formel. Gib das Ergebnis als Dezimalzahl an.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution: "$\\log_4(64) = \\frac{\\ln 64}{\\ln 4} = \\frac{\\ln(4^3)}{\\ln 4} = \\frac{3 \\cdot \\ln 4}{\\ln 4} = 3$. Probe: $4^3 = 64$ ✓",
  },
  {
    id: "lg-13",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Vereinfache: $2 \\cdot \\log_3(9)$.",
    expectedAnswer: "4",
    format: "Ganze Zahl",
    solution: "$\\log_3(9) = 2$. Also $2 \\cdot 2 = 4$. Alternativ: $\\log_3(9^2) = \\log_3(81) = 4$.",
  },
  {
    id: "lg-14",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "multiple",
    question: "Was ist $\\log_2(8 \\cdot 16)$?",
    options: [
      { label: "$7$", value: "a" },
      { label: "$24$", value: "b" },
      { label: "$128$", value: "c" },
      { label: "$5$", value: "d" },
    ],
    correctOption: "a",
    solution: "$\\log_2(8 \\cdot 16) = \\log_2(8) + \\log_2(16) = 3 + 4 = 7$. Oder: $8 \\cdot 16 = 128 = 2^7$.",
  },
  {
    id: "lg-15",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\log_4(8)$ als Dezimalzahl.",
    expectedAnswer: "1.5",
    format: "Dezimalzahl (z.B. 2.5)",
    solution: "$\\log_4(8) = \\frac{\\ln 8}{\\ln 4} = \\frac{3 \\ln 2}{2 \\ln 2} = \\frac{3}{2} = 1{,}5$.",
  },
  {
    id: "lg-16",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Vereinfache: $e^{\\ln(7)}$.",
    expectedAnswer: "7",
    format: "Ganze Zahl",
    solution: "$e^{\\ln(x)} = x$, da $e^x$ und $\\ln$ Umkehrfunktionen sind. Also $e^{\\ln(7)} = 7$.",
  },
  // === Schwierigkeit 3: Gleichungen lösen ===
  {
    id: "lg-17",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $\\log_2(x) = 5$.",
    expectedAnswer: "32",
    format: "Ganze Zahl",
    hint: "Wandle in eine Potenzgleichung um.",
    solution: "$\\log_2(x) = 5 \\Rightarrow x = 2^5 = 32$.",
  },
  {
    id: "lg-18",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $e^x = 100$. Gib $x$ auf zwei Dezimalstellen gerundet an.",
    expectedAnswer: "4.61",
    format: "Dezimalzahl (z.B. 2.50)",
    tolerance: 0.02,
    hint: "Wende den natürlichen Logarithmus auf beiden Seiten an.",
    solution: "$e^x = 100 \\Rightarrow x = \\ln(100) \\approx 4{,}605 \\approx 4{,}61$.",
  },
  {
    id: "lg-19",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $\\log_3(x) + \\log_3(9) = 5$.",
    expectedAnswer: "27",
    format: "Ganze Zahl",
    hint: "Berechne zuerst $\\log_3(9)$ und forme dann um.",
    solution: "$\\log_3(x) + 2 = 5 \\Rightarrow \\log_3(x) = 3 \\Rightarrow x = 3^3 = 27$. Probe: $\\log_3(27) + \\log_3(9) = 3 + 2 = 5$ ✓",
  },
  {
    id: "lg-20",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $2^x = 64$.",
    expectedAnswer: "6",
    format: "Ganze Zahl",
    hint: "Schreibe 64 als Potenz von 2.",
    solution: "$64 = 2^6$, also $2^x = 2^6 \\Rightarrow x = 6$.",
  },
  {
    id: "lg-21",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "multiple",
    question: "Löse: $\\log_2(x) + \\log_2(x - 2) = 3$. Welche Lösung ist gültig?",
    options: [
      { label: "$x = 4$", value: "a" },
      { label: "$x = -2$", value: "b" },
      { label: "$x = 2$", value: "c" },
      { label: "$x = 8$", value: "d" },
    ],
    correctOption: "a",
    solution: "Produktregel: $\\log_2(x(x-2)) = 3 \\Rightarrow x^2-2x=8 \\Rightarrow x=4$ oder $x=-2$. Da $\\log_2(-2)$ nicht definiert ist, gilt nur $x=4$.",
  },
  {
    id: "lg-22",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $\\ln(x) = 2$. Gib $x$ auf eine Dezimalstelle gerundet an.",
    expectedAnswer: "7.4",
    format: "Dezimalzahl (z.B. 2.5)",
    tolerance: 0.1,
    solution: "$\\ln(x) = 2 \\Rightarrow x = e^2 \\approx 7{,}389 \\approx 7{,}4$.",
  },
  {
    id: "lg-23",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $10^x = 0{,}001$.",
    expectedAnswer: "-3",
    format: "Ganze Zahl",
    hint: "Schreibe 0,001 als Potenz von 10.",
    solution: "$0{,}001 = 10^{-3}$, also $10^x = 10^{-3} \\Rightarrow x = -3$. Alternativ: $x = \\log_{10}(0{,}001) = -3$.",
  },
  {
    id: "lg-24",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $\\log_5(x) = -1$.",
    expectedAnswer: "0.2",
    format: "Dezimalzahl (z.B. 0.5)",
    solution: "$\\log_5(x) = -1 \\Rightarrow x = 5^{-1} = \\frac{1}{5} = 0{,}2$.",
  },
];

// =============================================================================
// Prüfungsaufgaben (Exam)
// =============================================================================

export const logarithmusExam: Exercise[] = [
  {
    id: "lg-e1",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "input",
    question: "Berechne $\\log_3(27)$.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution: "$3^3 = 27$, also $\\log_3(27) = 3$.",
  },
  {
    id: "lg-e2",
    lessonId: "m-logarithmus",
    difficulty: 1,
    type: "multiple",
    question: "Was ist $\\log_{10}(1)$?",
    options: [
      { label: "$1$", value: "a" },
      { label: "$10$", value: "b" },
      { label: "$0$", value: "c" },
      { label: "undefiniert", value: "d" },
    ],
    correctOption: "c",
    solution: "$10^0 = 1$, also $\\log_{10}(1) = 0$. Jeder Logarithmus von $1$ ist $0$.",
  },
  {
    id: "lg-e3",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Vereinfache: $\\log_2(32) - \\log_2(4)$.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution: "$\\log_2(32) = 5$ und $\\log_2(4) = 2$. Differenz: $5 - 2 = 3$.",
  },
  {
    id: "lg-e4",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "multiple",
    question: "Was ist $\\log_a(a^5)$?",
    options: [
      { label: "$a$", value: "a" },
      { label: "$5a$", value: "b" },
      { label: "$5$", value: "c" },
      { label: "$a^5$", value: "d" },
    ],
    correctOption: "c",
    solution: "Potenzregel: $\\log_a(a^n) = n$. Also $\\log_a(a^5) = 5$.",
  },
  {
    id: "lg-e5",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\log_9(27)$ mithilfe der Basiswechsel-Formel. Gib das Ergebnis als Dezimalzahl an.",
    expectedAnswer: "1.5",
    format: "Dezimalzahl (z.B. 2.5)",
    solution: "$\\log_9(27) = \\frac{\\ln 27}{\\ln 9} = \\frac{3 \\ln 3}{2 \\ln 3} = \\frac{3}{2} = 1{,}5$. Probe: $9^{1,5} = 9 \\cdot 3 = 27$ ✓",
  },
  {
    id: "lg-e6",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $\\log_2(x) = 6$.",
    expectedAnswer: "64",
    format: "Ganze Zahl",
    solution: "$\\log_2(x) = 6 \\Rightarrow x = 2^6 = 64$.",
  },
  {
    id: "lg-e7",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $3^x = 81$.",
    expectedAnswer: "4",
    format: "Ganze Zahl",
    hint: "Schreibe 81 als Potenz von 3.",
    solution: "$81 = 3^4$, also $3^x = 3^4 \\Rightarrow x = 4$.",
  },
  {
    id: "lg-e8",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $\\log_4(x) - \\log_4(2) = 2$.",
    expectedAnswer: "32",
    format: "Ganze Zahl",
    hint: "Fasse die linke Seite mit der Quotientenregel zusammen.",
    solution: "$\\log_4\\!\\left(\\frac{x}{2}\\right) = 2 \\Rightarrow \\frac{x}{2} = 4^2 = 16 \\Rightarrow x = 32$. Probe: $\\log_4(32) - \\log_4(2) = \\log_4(16) = 2$ ✓",
  },
  {
    id: "lg-e9",
    lessonId: "m-logarithmus",
    difficulty: 3,
    type: "input",
    question: "Löse: $e^x = 50$. Gib $x$ auf zwei Dezimalstellen gerundet an.",
    expectedAnswer: "3.91",
    format: "Dezimalzahl (z.B. 2.50)",
    tolerance: 0.02,
    solution: "$x = \\ln(50) \\approx 3{,}912 \\approx 3{,}91$.",
  },
  {
    id: "lg-e10",
    lessonId: "m-logarithmus",
    difficulty: 2,
    type: "input",
    question: "Vereinfache: $\\log_5(25) + \\log_5(5)$.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution: "$\\log_5(25) = 2$ und $\\log_5(5) = 1$. Summe: $2 + 1 = 3$.",
  },
];
