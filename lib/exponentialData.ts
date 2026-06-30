import { Module, QuizQuestion } from "./types";
import { createExerciseLessons } from "./lessonHelpers";

// Exercise interface (identical zu mathExercises.ts)
interface Exercise {
  id: string;
  lessonId: string;
  difficulty: 1 | 2 | 3;
  type: "input" | "multiple";
  question: string;
  hint?: string;
  expectedAnswer?: string;
  tolerance?: number;
  format?: string;
  options?: { label: string; value: string }[];
  correctOption?: string;
  solution: string;
}

// ============================================================================
// MODUL: Exponentialfunktionen
// ============================================================================

export const exponentialModule: Module = {
  id: "m-exponential",
  slug: "mathe-exponential",
  title: "Exponentialfunktionen",
  description:
    "Exponentialfunktionen, die e-Funktion und Anwendungen wie Wachstum, Zerfall und Halbwertszeit",
  icon: "📈",
  color: "#8b5cf6",
  category: "grundlagen",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Exponentialfunktionen

### Allgemeine Exponentialfunktion
$$f(x) = a \\cdot b^x \\quad (a \\neq 0,\\; b > 0,\\; b \\neq 1)$$

| Eigenschaft | Wachstum ($b > 1$) | Zerfall ($0 < b < 1$) |
|-------------|--------------------|-----------------------|
| Monotonie | streng monoton steigend | streng monoton fallend |
| Wertebereich | $(0, \\infty)$ | $(0, \\infty)$ |
| Asymptote | $y = 0$ (x-Achse) | $y = 0$ (x-Achse) |
| $y$-Achsenabschnitt | $f(0) = a$ | $f(0) = a$ |

### Die e-Funktion
$$f(x) = e^x \\quad \\text{mit } e \\approx 2{,}718\\,28$$

- **Ableitung:** $\\frac{d}{dx} e^x = e^x$ (bleibt unverändert!)
- **Umkehrfunktion:** $\\ln(x)$ (natürlicher Logarithmus)
- **Eigenschaften:** $e^0 = 1$, $e^1 = e$, $\\ln(e) = 1$, $\\ln(1) = 0$

### Wichtige Ableitungen
| Funktion | Ableitung |
|----------|-----------|
| $e^x$ | $e^x$ |
| $e^{kx}$ | $k \\cdot e^{kx}$ |
| $a^x$ | $a^x \\cdot \\ln(a)$ |
| $\\ln(x)$ | $\\frac{1}{x}$ |

### Wachstum & Zerfall
$$N(t) = N_0 \\cdot e^{kt}$$
- $k > 0$: Wachstum (z. B. Bakterien, Zinseszins)
- $k < 0$: Zerfall (z. B. Radioaktivität)

### Halbwertszeit
$$T_{1/2} = \\frac{\\ln(2)}{|k|}$$

### Verdopplungszeit
$$T_2 = \\frac{\\ln(2)}{k}$$

### Zinseszins (stetig)
$$K(t) = K_0 \\cdot e^{rt}$$`,

  lessons: [
    // ══════════════════════════════════════════════════════════════
    // LEKTION 1: Exponentialfunktionen — Grundlagen
    // ══════════════════════════════════════════════════════════════
    {
      id: "exp-1",
      title: "Exponentialfunktionen",
      duration: "15 min",
      type: "text",
      content: `## Was ist eine Exponentialfunktion?

> Bei einer Exponentialfunktion steht die Variable im **Exponenten** — das ist der entscheidende Unterschied zu Potenzfunktionen wie $x^2$ oder $x^3$!

### Allgemeine Form

$$f(x) = a \\cdot b^x$$

- $a$ = **Startwert** (Streckung/Faktor bei $x = 0$)
- $b$ = **Basis** (bestimmt Wachstum oder Zerfall)
- $x$ = **Exponent** (die Variable!)

**Bedingungen:** $a \\neq 0$, $b > 0$, $b \\neq 1$

---

### Wachstum vs. Zerfall

**Exponentielles Wachstum** — wenn $b > 1$:

$f(x) = 2^x$ wächst immer schneller:
- $f(0) = 1$, $f(1) = 2$, $f(2) = 4$, $f(3) = 8$, $f(10) = 1024$

**Exponentieller Zerfall** — wenn $0 < b < 1$:

$f(x) = \\left(\\frac{1}{2}\\right)^x$ fällt immer langsamer:
- $f(0) = 1$, $f(1) = 0{,}5$, $f(2) = 0{,}25$, $f(3) = 0{,}125$

---

### Typische Eigenschaften

| Eigenschaft | Wert |
|-------------|------|
| Definitionsbereich | $\\mathbb{R}$ (alle reellen Zahlen) |
| Wertebereich | $(0, \\infty)$ — nie Null oder negativ! |
| $y$-Achsenabschnitt | $f(0) = a$ |
| Asymptote | $y = 0$ (x-Achse, wird nie erreicht) |
| Monotonie | $b > 1$: steigend ↑ •   $0 < b < 1$: fallend ↓ |

---

### Beispiel: Bevölkerungswachstum

Eine Stadt hat 50 000 Einwohner und wächst um 3 % pro Jahr:

$$P(t) = 50\\,000 \\cdot 1{,}03^t$$

Nach 10 Jahren: $P(10) = 50\\,000 \\cdot 1{,}03^{10} = 50\\,000 \\cdot 1{,}3439 \\approx 67\\,196$ Einwohner.

---

### Beispiel: Radioaktiver Zerfall

Eine Probe hat 800 mg und eine Halbwertszeit von 5 Jahren:

$$M(t) = 800 \\cdot \\left(\\frac{1}{2}\\right)^{t/5}$$

Nach 15 Jahren: $M(15) = 800 \\cdot \\left(\\frac{1}{2}\\right)^3 = 800 \\cdot \\frac{1}{8} = 100$ mg.

---

[GUIDED_START]
**Schritt-für-Schritt:** Gegeben $f(x) = 3 \\cdot 2^x$. Berechne $f(4)$.

**Schritt 1:** Setze $x = 4$ ein: $f(4) = 3 \\cdot 2^4$

**Schritt 2:** Berechne die Potenz: $2^4 = 16$

**Schritt 3:** Multipliziere: $f(4) = 3 \\cdot 16 = 48$

**Ergebnis:** $f(4) = 48$ ✅
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Gegeben $f(x) = 5 \\cdot 3^x$. Berechne $f(2)$.

**Lösung:** $f(2) = 5 \\cdot 3^2 = 5 \\cdot 9 = 45$

**Aufgabe 2:** Gegeben $g(x) = 100 \\cdot 0{,}8^x$. Berechne $g(3)$.

**Lösung:** $g(3) = 100 \\cdot 0{,}8^3 = 100 \\cdot 0{,}512 = 51{,}2$

**Aufgabe 3:** Welche Funktion beschreibt exponentiellen Zerfall: $h(x) = 4 \\cdot 1{,}5^x$ oder $k(x) = 4 \\cdot 0{,}6^x$?

**Lösung:** $k(x) = 4 \\cdot 0{,}6^x$, da $0 < 0{,}6 < 1$.
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 2: Die e-Funktion
    // ══════════════════════════════════════════════════════════════
    {
      id: "exp-2",
      title: "Die e-Funktion",
      duration: "15 min",
      type: "text",
      content: `## Die Eulersche Zahl $e$

> Die Zahl $e$ ist eine der wichtigsten Konstanten der Mathematik — vergleichbar mit $\\pi$. Sie tritt überall dort auf, wo etwas **natürlich wächst oder zerfällt**.

### Was ist $e$?

$$e \\approx 2{,}718\\,28\\,18\\,28\\,45\\ldots$$

$e$ ist eine **irrationale Zahl** — ihre Dezimaldarstellung geht endlos weiter ohne sich zu wiederholen.

**Definition als Grenzwert:**

$$e = \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n$$

Für $n = 1\\,000\\,000$: $\\left(1 + \\frac{1}{1\\,000\\,000}\\right)^{1\\,000\\,000} \\approx 2{,}718\\,28$

---

### Die Exponentialfunktion $f(x) = e^x$

Die Funktion $e^x$ ist **die** Exponentialfunktion schlechthin. Ihre Besonderheit:

$$\\frac{d}{dx} e^x = e^x$$

Die Ableitung ist die Funktion **selbst**! Keine andere Funktion hat diese Eigenschaft.

| $x$ | $e^x$ |
|-----|-------|
| $-2$ | $0{,}135$ |
| $-1$ | $0{,}368$ |
| $0$ | $1$ |
| $1$ | $2{,}718$ |
| $2$ | $7{,}389$ |

---

### Der natürliche Logarithmus $\\ln(x)$

Der natürliche Logarithmus ist die **Umkehrfunktion** von $e^x$:

$$y = e^x \\quad \\Leftrightarrow \\quad x = \\ln(y)$$

**Wichtige Werte:**

| Ausdruck | Wert | Warum? |
|----------|------|--------|
| $\\ln(1)$ | $0$ | $e^0 = 1$ |
| $\\ln(e)$ | $1$ | $e^1 = e$ |
| $\\ln(e^2)$ | $2$ | $e^2 = e^2$ |
| $e^{\\ln(5)}$ | $5$ | $e$ und $\\ln$ heben sich auf |

---

### Ableitungen mit $e^x$ und $\\ln(x)$

| Funktion $f(x)$ | Ableitung $f'(x)$ |
|------------------|-------------------|
| $e^x$ | $e^x$ |
| $e^{kx}$ | $k \\cdot e^{kx}$ |
| $a^x$ | $a^x \\cdot \\ln(a)$ |
| $\\ln(x)$ | $\\frac{1}{x}$ |
| $\\ln(g(x))$ | $\\frac{g'(x)}{g(x)}$ |

---

### Beispiel: Ableitung von $f(x) = e^{3x}$

$$f'(x) = 3 \\cdot e^{3x}$$

Kettenregel: Äußere Ableitung ($e^u$) mal innere Ableitung ($3x$).

---

### Beispiel: Ableitung von $g(x) = 5^x$

$$g'(x) = 5^x \\cdot \\ln(5) \\approx 5^x \\cdot 1{,}609$$

---

### Wichtige Rechenregeln

$$e^a \\cdot e^b = e^{a+b}$$

$$\\frac{e^a}{e^b} = e^{a-b}$$

$$(e^a)^n = e^{a \\cdot n}$$

$$\\ln(a \\cdot b) = \\ln(a) + \\ln(b)$$

$$\\ln\\left(\\frac{a}{b}\\right) = \\ln(a) - \\ln(b)$$

$$\\ln(a^n) = n \\cdot \\ln(a)$$

---

[GUIDED_START]
**Schritt-für-Schritt:** Vereinfache $e^{2\\ln(3)}$.

**Schritt 1:** Regeln anwenden: $2 \\cdot \\ln(3) = \\ln(3^2) = \\ln(9)$

**Schritt 2:** $e^{\\ln(9)} = 9$, da $e$ und $\\ln$ sich als Umkehrfunktionen aufheben.

**Ergebnis:** $e^{2\\ln(3)} = 9$ ✅
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Berechne $\\ln(e^4)$.

**Lösung:** $\\ln(e^4) = 4$ — $\\ln$ und $e^x$ heben sich auf.

**Aufgabe 2:** Bestimme die Ableitung von $f(x) = e^{-2x}$.

**Lösung:** $f'(x) = -2 \\cdot e^{-2x}$ (Kettenregel).

**Aufgabe 3:** Berechne $e^{\\ln(7) + \\ln(3)}$.

**Lösung:** $e^{\\ln(7 \\cdot 3)} = e^{\\ln(21)} = 21$.
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 3: Wachstum & Zerfall
    // ══════════════════════════════════════════════════════════════
    {
      id: "exp-3",
      title: "Wachstum & Zerfall",
      duration: "15 min",
      type: "text",
      content: `## Anwendungen der Exponentialfunktion

> Exponentialfunktionen beschreiben Prozesse, bei denen die **Veränderungsrate proportional zum aktuellen Wert** ist. Das gilt für Zinsen, Bakterien, Radioaktivität und vieles mehr.

---

### Das allgemeine Modell

$$N(t) = N_0 \\cdot e^{kt}$$

- $N_0$ = Anfangswert (bei $t = 0$)
- $k$ = Wachstumsrate ($k > 0$) bzw. Zerfallsrate ($k < 0$)
- $t$ = Zeit

---

## 1. Exponentielles Wachstum

### Beispiel: Bevölkerungswachstum

Eine Stadt hat heute 100 000 Einwohner und wächst jährlich um 2 %.

**Modell:** $P(t) = 100\\,000 \\cdot e^{0{,}02 \\cdot t}$

**Frage:** Wie viele Einwohner nach 20 Jahren?

$$P(20) = 100\\,000 \\cdot e^{0{,}02 \\cdot 20} = 100\\,000 \\cdot e^{0{,}4} \\approx 100\\,000 \\cdot 1{,}4918 \\approx 149\\,183$$

**Verdopplungszeit:**

$$T_2 = \\frac{\\ln(2)}{k} = \\frac{0{,}693}{0{,}02} \\approx 34{,}66 \\text{ Jahre}$$

---

### Beispiel: Zinseszins (stetig verzinst)

1 000 € werden zu 5 % über 10 Jahre stetig verzinst:

$$K(t) = K_0 \\cdot e^{rt} = 1\\,000 \\cdot e^{0{,}05 \\cdot 10} = 1\\,000 \\cdot e^{0{,}5}$$

$$K(10) = 1\\,000 \\cdot 1{,}6487 \\approx 1\\,648{,}70 \\text{ €}$$

Zum Vergleich — einfach verzinst wären nur $1\\,000 \\cdot (1 + 0{,}05 \\cdot 10) = 1\\,500$ €.

---

## 2. Exponentieller Zerfall

### Beispiel: Radioaktiver Zerfall

Eine Probe enthält 500 g eines Stoffes mit Zerfallskonstante $k = -0{,}1386$ pro Jahr.

$$M(t) = 500 \\cdot e^{-0{,}1386 \\cdot t}$$

**Frage:** Wie viel ist nach 5 Jahren übrig?

$$M(5) = 500 \\cdot e^{-0{,}1386 \\cdot 5} = 500 \\cdot e^{-0{,}693} \\approx 500 \\cdot 0{,}5 = 250 \\text{ g}$$

---

### Halbwertszeit

Die **Halbwertszeit** $T_{1/2}$ ist die Zeit, bis die Hälfte des Materials zerfallen ist:

$$T_{1/2} = \\frac{\\ln(2)}{|k|}$$

Im Beispiel oben: $T_{1/2} = \\frac{0{,}693}{0{,}1386} = 5$ Jahre.

**Allgemein:** Wenn man $T_{1/2}$ kennt, kann man $k$ berechnen:

$$k = -\\frac{\\ln(2)}{T_{1/2}}$$

---

### Beispiel: Medikamentenabbau

Ein Medikament hat eine Halbwertszeit von 4 Stunden. Startdosis: 400 mg.

**Zerfallskonstante:** $k = -\\frac{\\ln(2)}{4} \\approx -0{,}1733$

**Modell:** $D(t) = 400 \\cdot e^{-0{,}1733 \\cdot t}$

**Frage:** Wie viel nach 12 Stunden?

$$D(12) = 400 \\cdot e^{-0{,}1733 \\cdot 12} = 400 \\cdot e^{-2{,}0796} \\approx 400 \\cdot 0{,}125 = 50 \\text{ mg}$$

Prüfung: Nach 12 Stunden sind $12/4 = 3$ Halbwertszeiten vergangen. $400 \\to 200 \\to 100 \\to 50$ mg. ✅

---

## 3. Zusammenfassung der Formeln

| Anwendung | Formel | Parameter |
|-----------|--------|-----------|
| Allgemein | $N(t) = N_0 \\cdot e^{kt}$ | $k > 0$: Wachstum |
| Zinseszins | $K(t) = K_0 \\cdot e^{rt}$ | $r$ = Zinssatz |
| Zerfall | $N(t) = N_0 \\cdot e^{-\|k\|t}$ | Zerfallsrate |
| Halbwertszeit | $T_{1/2} = \\frac{\\ln(2)}{\|k\|}$ | Zeit für 50 % |
| Verdopplung | $T_2 = \\frac{\\ln(2)}{k}$ | Zeit für 200 % |

---

[GUIDED_START]
**Schritt-für-Schritt:** Eine Bakterienkultur hat 200 Zellen und verdoppelt sich alle 3 Stunden. Wie viele nach 9 Stunden?

**Schritt 1:** Modell aufstellen. Verdopplung alle 3 h bedeutet: $N(t) = 200 \\cdot 2^{t/3}$

**Schritt 2:** $t = 9$ einsetzen: $N(9) = 200 \\cdot 2^{9/3} = 200 \\cdot 2^3$

**Schritt 3:** Berechnen: $2^3 = 8$, also $N(9) = 200 \\cdot 8 = 1600$

**Ergebnis:** Nach 9 Stunden gibt es 1600 Bakterien. ✅
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Ein Radioisotop hat $T_{1/2} = 10$ Jahre. Start: 1000 g. Wie viel nach 30 Jahren?

**Lösung:** $N(30) = 1000 \\cdot (1/2)^{30/10} = 1000 \\cdot (1/2)^3 = 125$ g.

**Aufgabe 2:** 500 € zu 4 % stetig verzinst. Kapital nach 20 Jahren?

**Lösung:** $K(20) = 500 \\cdot e^{0{,}04 \\cdot 20} = 500 \\cdot e^{0{,}8} \\approx 500 \\cdot 2{,}2255 = 1\\,112{,}77$ €.

**Aufgabe 3:** Wann hat sich eine Investition von 200 € bei 6 % stetiger Verzinsung verdoppelt?

**Lösung:** $T_2 = \\frac{\\ln(2)}{0{,}06} \\approx 11{,}55$ Jahre.
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // ÜBUNGSAUFGABEN & PRÜFUNG (via createExerciseLessons)
    // ══════════════════════════════════════════════════════════════
    ...createExerciseLessons("m-exponential", "Exponentialfunktionen", {
      easy: `Grundlagen der Exponentialfunktionen: Werte berechnen, Wachstum und Zerfall unterscheiden, Basis $b$ einordnen.`,
      medium: `Exponentialgleichungen lösen, die e-Funktion und den natürlichen Logarithmus sicher anwenden, Ableitungen berechnen.`,
      hard: `Wachstums- und Zerfallsprozesse modellieren, Halbwertszeiten und Verdopplungszeiten bestimmen, Zinseszinsaufgaben lösen.`,
    }),
  ],
};

// ============================================================================
// QUIZ (10 Fragen)
// ============================================================================

export const exponentialQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-exponential": [
    {
      question: "Welche Funktion beschreibt exponentielles Wachstum?",
      type: "multiple",
      options: [
        "$f(x) = 3 \\cdot 0{,}5^x$",
        "$f(x) = 2 \\cdot 1{,}5^x$",
        "$f(x) = 4 \\cdot 0{,}8^x$",
        "$f(x) = 10 \\cdot 0{,}2^x$",
      ],
      correct: 1,
      explanation:
        "Wachstum liegt vor, wenn die Basis $b > 1$ ist. Hier ist $b = 1{,}5 > 1$. Alle anderen Basen sind kleiner 1 (Zerfall).",
    },
    {
      question: "Was ist $e^0$?",
      type: "multiple",
      options: ["$0$", "$1$", "$e$", "$\\text{undefiniert}$"],
      correct: 1,
      explanation: "Jede Zahl (außer 0) hoch 0 ergibt 1: $e^0 = 1$.",
    },
    {
      question: "Was ist $\\ln(e)$?",
      type: "multiple",
      options: ["$0$", "$1$", "$e$", "$2$"],
      correct: 1,
      explanation:
        "$\\ln$ und $e^x$ sind Umkehrfunktionen: $\\ln(e) = \\ln(e^1) = 1$.",
    },
    {
      question: "Was ist die Ableitung von $f(x) = e^x$?",
      type: "multiple",
      options: [
        "$x \\cdot e^{x-1}$",
        "$e^x$",
        "$e^{x-1}$",
        "$x \\cdot e^x$",
      ],
      correct: 1,
      explanation:
        "Die e-Funktion ist die einzige Funktion, die unter Ableitung unverändert bleibt: $\\frac{d}{dx} e^x = e^x$.",
    },
    {
      question:
        "Wie lautet die Halbwertszeit-Formel bei exponentiellem Zerfall mit Zerfallskonstante $k$?",
      type: "multiple",
      options: [
        "$T_{1/2} = \\frac{k}{\\ln(2)}$",
        "$T_{1/2} = \\frac{\\ln(2)}{|k|}$",
        "$T_{1/2} = \\frac{2}{k}$",
        "$T_{1/2} = \\ln(2) \\cdot k$",
      ],
      correct: 1,
      explanation:
        "Die Halbwertszeit ergibt sich aus $\\frac{1}{2} = e^{k \\cdot T_{1/2}}$. Umstellen liefert $T_{1/2} = \\frac{\\ln(2)}{|k|}$.",
    },
    {
      question: "Was ist $\\ln(1)$?",
      type: "multiple",
      options: ["$1$", "$e$", "$0$", "$-1$"],
      correct: 2,
      explanation: "$e^0 = 1$, also $\\ln(1) = 0$.",
    },
    {
      question: "Was ist die Ableitung von $f(x) = e^{5x}$?",
      type: "multiple",
      options: [
        "$e^{5x}$",
        "$5e^{5x}$",
        "$5xe^{5x}$",
        "$e^{5}$",
      ],
      correct: 1,
      explanation: "Kettenregel: $\\frac{d}{dx} e^{5x} = 5 \\cdot e^{5x}$.",
    },
    {
      question:
        "Welche Basis $b$ ergibt bei $f(x) = a \\cdot b^x$ exponentiellen Zerfall?",
      type: "multiple",
      options: [
        "$b > 1$",
        "$b = 1$",
        "$0 < b < 1$",
        "$b < 0$",
      ],
      correct: 2,
      explanation:
        "Zerfall: Die Basis muss zwischen 0 und 1 liegen, z. B. $b = 0{,}5$. Dann wird $b^x$ mit wachsendem $x$ kleiner.",
    },
    {
      question: "Was ist $e^{\\ln(4)}$?",
      type: "multiple",
      options: ["$4$", "$e^4$", "$\\ln(4)$", "$1$"],
      correct: 0,
      explanation:
        "$e$ und $\\ln$ heben sich als Umkehrfunktionen auf: $e^{\\ln(4)} = 4$.",
    },
    {
      question:
        "Ein Bakterienstamm verdoppelt sich alle 2 Stunden. Start: 100. Wie viele nach 6 Stunden?",
      type: "multiple",
      options: ["$200$", "$400$", "$600$", "$800$"],
      correct: 3,
      explanation:
        "Nach 6 Stunden: $6/2 = 3$ Verdopplungen. $100 \\cdot 2^3 = 100 \\cdot 8 = 800$.",
    },
  ],
};

// ============================================================================
// PRACTICE EXERCISES (3-4 pro Schwierigkeit)
// ============================================================================

export const exponentialPractice: Exercise[] = [
  // === Schwierigkeit 1: Grundlagen ===
  {
    id: "ex-1",
    lessonId: "m-exponential",
    difficulty: 1,
    type: "input",
    question: "Berechne $2^6$.",
    expectedAnswer: "64",
    format: "Ganze Zahl",
    solution: "$2^6 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 64$.",
  },
  {
    id: "ex-2",
    lessonId: "m-exponential",
    difficulty: 1,
    type: "input",
    question:
      "Gegeben $f(x) = 3 \\cdot 2^x$. Berechne $f(4)$.",
    expectedAnswer: "48",
    format: "Ganze Zahl",
    solution: "$f(4) = 3 \\cdot 2^4 = 3 \\cdot 16 = 48$.",
  },
  {
    id: "ex-3",
    lessonId: "m-exponential",
    difficulty: 1,
    type: "multiple",
    question:
      "Welche Funktion beschreibt exponentiellen Zerfall?",
    options: [
      { label: "$f(x) = 5 \\cdot 1{,}2^x$", value: "a" },
      { label: "$f(x) = 5 \\cdot 0{,}7^x$", value: "b" },
      { label: "$f(x) = 5 \\cdot 2^x$", value: "c" },
      { label: "$f(x) = 5 + 0{,}7x$", value: "d" },
    ],
    correctOption: "b",
    solution:
      "Zerfall: Basis zwischen 0 und 1. Nur $0{,}7 < 1$. Die anderen Basen sind $> 1$ (Wachstum) oder es ist linear.",
  },
  {
    id: "ex-4",
    lessonId: "m-exponential",
    difficulty: 1,
    type: "input",
    question: "Berechne $e^0$.",
    expectedAnswer: "1",
    format: "Ganze Zahl",
    solution: "$e^0 = 1$. Jede Zahl hoch 0 ergibt 1.",
  },

  // === Schwierigkeit 2: e-Funktion und Ableitungen ===
  {
    id: "ex-5",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\ln(e^5)$.",
    expectedAnswer: "5",
    format: "Ganze Zahl",
    solution: "$\\ln(e^5) = 5$. $\\ln$ und $e^x$ sind Umkehrfunktionen.",
  },
  {
    id: "ex-6",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "input",
    question:
      "Bestimme die Ableitung von $f(x) = e^{3x}$ an der Stelle $x = 0$.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution:
      "$f'(x) = 3 \\cdot e^{3x}$. An $x = 0$: $f'(0) = 3 \\cdot e^0 = 3 \\cdot 1 = 3$.",
  },
  {
    id: "ex-7",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "multiple",
    question: "Was ist $e^{\\ln(6)}$?",
    options: [
      { label: "$6$", value: "a" },
      { label: "$e^6$", value: "b" },
      { label: "$\\ln(6)$", value: "c" },
      { label: "$1$", value: "d" },
    ],
    correctOption: "a",
    solution:
      "$e$ und $\\ln$ heben sich auf: $e^{\\ln(6)} = 6$.",
  },
  {
    id: "ex-8",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "input",
    question:
      "Berechne $e^{2\\ln(3)}$. Gib den ganzzahligen Wert an.",
    expectedAnswer: "9",
    format: "Ganze Zahl",
    hint: "Nutze die Regel $n \\cdot \\ln(a) = \\ln(a^n)$.",
    solution:
      "$e^{2\\ln(3)} = e^{\\ln(3^2)} = e^{\\ln(9)} = 9$.",
  },

  // === Schwierigkeit 3: Wachstum, Zerfall, Halbwertszeit ===
  {
    id: "ex-9",
    lessonId: "m-exponential",
    difficulty: 3,
    type: "input",
    question:
      "Ein Radioisotop hat eine Halbwertszeit von 10 Jahren. Start: 800 g. Wie viel ist nach 30 Jahren übrig? (in g)",
    expectedAnswer: "100",
    format: "Ganze Zahl",
    hint: "Nach 30 Jahren sind $30/10 = 3$ Halbwertszeiten vergangen.",
    solution:
      "$N(30) = 800 \\cdot \\left(\\frac{1}{2}\\right)^{30/10} = 800 \\cdot \\frac{1}{8} = 100$ g.",
  },
  {
    id: "ex-10",
    lessonId: "m-exponential",
    difficulty: 3,
    type: "input",
    question:
      "2000 € werden zu 5 % stetig verzinst. Wie hoch ist das Kapital nach 10 Jahren? (auf 2 Dezimalstellen)",
    expectedAnswer: "3297.44",
    tolerance: 5,
    format: "Dezimalzahl",
    hint: "$K(t) = K_0 \\cdot e^{rt}$ mit $r = 0{,}05$.",
    solution:
      "$K(10) = 2000 \\cdot e^{0{,}05 \\cdot 10} = 2000 \\cdot e^{0{,}5} \\approx 2000 \\cdot 1{,}6487 = 3297{,}44$ €.",
  },
  {
    id: "ex-11",
    lessonId: "m-exponential",
    difficulty: 3,
    type: "input",
    question:
      "Eine Bakterienkultur verdoppelt sich alle 4 Stunden. Start: 500. Wie viele Bakterien nach 12 Stunden?",
    expectedAnswer: "4000",
    format: "Ganze Zahl",
    hint: "Anzahl der Verdopplungen: $12/4 = 3$.",
    solution:
      "$N(12) = 500 \\cdot 2^{12/4} = 500 \\cdot 2^3 = 500 \\cdot 8 = 4000$.",
  },
];

// ============================================================================
// EXAM EXERCISES (Prüfungsaufgaben)
// ============================================================================

export const exponentialExam: Exercise[] = [
  {
    id: "ex-e1",
    lessonId: "m-exponential",
    difficulty: 1,
    type: "input",
    question:
      "Gegeben $f(x) = 4 \\cdot 3^x$. Berechne $f(3)$.",
    expectedAnswer: "108",
    format: "Ganze Zahl",
    solution:
      "$f(3) = 4 \\cdot 3^3 = 4 \\cdot 27 = 108$.",
  },
  {
    id: "ex-e2",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "input",
    question: "Berechne $\\ln(e^7) - \\ln(e^2)$.",
    expectedAnswer: "5",
    format: "Ganze Zahl",
    solution:
      "$\\ln(e^7) - \\ln(e^2) = 7 - 2 = 5$.",
  },
  {
    id: "ex-e3",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "multiple",
    question: "Was ist die Ableitung von $g(x) = 5^x$?",
    options: [
      { label: "$5^{x-1}$", value: "a" },
      { label: "$5^x \\cdot \\ln(5)$", value: "b" },
      { label: "$x \\cdot 5^{x-1}$", value: "c" },
      { label: "$5^x \\cdot \\ln(x)$", value: "d" },
    ],
    correctOption: "b",
    solution:
      "Allgemeine Regel: $\\frac{d}{dx} a^x = a^x \\cdot \\ln(a)$. Also $g'(x) = 5^x \\cdot \\ln(5)$.",
  },
  {
    id: "ex-e4",
    lessonId: "m-exponential",
    difficulty: 3,
    type: "input",
    question:
      "Eine Stadt hat 80 000 Einwohner und wächst um 3 % pro Jahr (stetig). Nach wie vielen Jahren hat sie 120 000 Einwohner? (auf 1 Dezimalstelle)",
    expectedAnswer: "13.5",
    tolerance: 0.5,
    format: "Dezimalzahl",
    hint: "Gleichung aufstellen: $120\\,000 = 80\\,000 \\cdot e^{0{,}03t}$ und nach $t$ auflösen.",
    solution:
      "$1{,}5 = e^{0{,}03t} \\Rightarrow \\ln(1{,}5) = 0{,}03t \\Rightarrow t = \\frac{\\ln(1{,}5)}{0{,}03} \\approx \\frac{0{,}405}{0{,}03} \\approx 13{,}5$ Jahre.",
  },
  {
    id: "ex-e5",
    lessonId: "m-exponential",
    difficulty: 3,
    type: "input",
    question:
      "Ein Medikament hat eine Halbwertszeit von 6 Stunden. Die Startdosis beträgt 600 mg. Wie viel ist nach 18 Stunden übrig? (in mg)",
    expectedAnswer: "75",
    format: "Ganze Zahl",
    hint: "Anzahl der Halbwertszeiten: $18/6 = 3$.",
    solution:
      "$D(18) = 600 \\cdot \\left(\\frac{1}{2}\\right)^{18/6} = 600 \\cdot \\frac{1}{8} = 75$ mg.",
  },
  {
    id: "ex-e6",
    lessonId: "m-exponential",
    difficulty: 2,
    type: "input",
    question:
      "Löse die Gleichung $e^{2x} = e^{10}$. Gib $x$ an.",
    expectedAnswer: "5",
    format: "Ganze Zahl",
    solution:
      "Basen sind gleich, also Exponenten gleichsetzen: $2x = 10 \\Rightarrow x = 5$.",
  },
];
