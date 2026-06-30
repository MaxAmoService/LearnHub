import { Module, QuizQuestion } from "./types";
import { Exercise } from "./mathExercises";
import { createExerciseLessons } from "./lessonHelpers";

export const grundrechnenModule: Module = {
  id: "m-grundrechnen",
  slug: "mathe-grundrechnen",
  title: "Grundrechnen",
  description: "Die vier Grundrechenarten und die Reihenfolge der Rechenoperationen",
  icon: "➕",
  color: "#8b5cf6",
  category: "arithmetik-algebra",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Grundrechnen
### Die vier Grundrechenarten
| Operation | Symbol | Beispiel |
|-----------|--------|----------|
| Addition | $+$ | $3 + 5 = 8$ |
| Subtraktion | $-$ | $10 - 4 = 6$ |
| Multiplikation | $\\cdot$ | $3 \\cdot 4 = 12$ |
| Division | $:$ | $12 : 4 = 3$ |

### Punkt-vor-Strich-Regel
1. **Punktrechnungen** ($\\cdot$, $:$) werden ZUERST berechnet
2. **Strichrechnungen** ($+$, $-$) werden DANACH berechnet
3. Klammern haben IMMER Vorrang

### Rechengesetze
- **Kommutativgesetz:** $a + b = b + a$, $a \\cdot b = b \\cdot a$
- **Assoziativgesetz:** $(a + b) + c = a + (b + c)$
- **Distributivgesetz:** $a \\cdot (b + c) = a \\cdot b + a \\cdot c$`,
  lessons: [
    {
      id: "m-gr-1",
      title: "Addition & Subtraktion",
      duration: "15 min",
      type: "text",
      content: `## Addition — Zusammenzählen

Die **Addition** ist die einfachste Grundrechenart. Wir zählen zwei oder mehr Zahlen zusammen.

$$a + b = c$$

Beispiel: $3 + 5 = 8$

### Eigenschaften der Addition
- **Kommutativ:** $a + b = b + a$ — die Reihenfolge vertauscht das Ergebnis nicht
- **Assoziativ:** $(a + b) + c = a + (b + c)$ — die Gruppierung ändert nichts
- **Neutrales Element:** $a + 0 = a$ — die Null lässt die Zahl unverändert

---

## Subtraktion — Abziehen

Die **Subtraktion** ist das Gegenstück zur Addition. Wir ziehen eine Zahl von einer anderen ab.

$$a - b = c$$

Beispiel: $10 - 4 = 6$

### Wichtig zu wissen
- Die Subtraktion ist **nicht kommutativ:** $5 - 3 \\neq 3 - 5$
- Die Subtraktion ist **nicht assoziativ:** $(10 - 5) - 2 \\neq 10 - (5 - 2)$
- Man kann Subtraktion als Addition mit negativen Zahlen schreiben: $a - b = a + (-b)$

---

## Rechnen mit großen Zahlen

Beim Addieren und Subtrahieren großer Zahlen schreibt man die Zahlen **untereinander** und rechnet spaltenweise von rechts nach links.

> 💡 **Tipp:** Kontrolliere dein Ergebnis, indem du rückwärts rechnest: $405 - 158 = 247$ ✓`,
    },
    {
      id: "m-gr-2",
      title: "Multiplikation & Division",
      duration: "15 min",
      type: "text",
      content: `## Multiplikation — Mehrfache Addition

Die **Multiplikation** ist eine abgekürzte Addition gleicher Summanden.

$$a \\cdot b = c$$

Beispiel: $3 \\cdot 4 = 4 + 4 + 4 = 12$

### Eigenschaften der Multiplikation
- **Kommutativ:** $a \\cdot b = b \\cdot a$
- **Assoziativ:** $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$
- **Neutrales Element:** $a \\cdot 1 = a$
- **Null-Regel:** $a \\cdot 0 = 0$

### Einmaleins — Die Basis

Das **Einmaleins** von 1 bis 10 sollte man auswendig können:

| × | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **1** | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| **2** | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 |
| **3** | 3 | 6 | 9 | 12 | 15 | 18 | 21 | 24 | 27 | 30 |
| **4** | 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 |
| **5** | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 |

---

## Division — Aufteilen

Die **Division** ist das Gegenstück zur Multiplikation. Wir teilen eine Zahl durch eine andere.

$$a : b = c \\quad \\text{oder} \\quad \\frac{a}{b} = c$$

Beispiel: $12 : 4 = 3$

### Wichtig zu wissen
- **Division durch 0 ist verboten!** $a : 0$ ist undefiniert
- $0 : a = 0$ für jedes $a \\neq 0$
- $a : 1 = a$
- Die Division ist **nicht kommutativ:** $12 : 4 \\neq 4 : 12$

### Zusammenhang mit der Multiplikation
Wenn $a : b = c$, dann gilt $b \\cdot c = a$.

Beispiel: $20 : 5 = 4$, weil $5 \\cdot 4 = 20$`,
    },
    {
      id: "m-gr-3",
      title: "Punkt-vor-Strich",
      duration: "12 min",
      type: "text",
      content: `## Die Punkt-vor-Strich-Regel

Wenn ein Term mehrere verschiedene Rechenoperationen enthält, gilt die **Reihenfolge der Rechenoperationen**:

> **1. Klammern → 2. Punktrechnungen ($\\cdot$, $:$) → 3. Strichrechnungen ($+$, $-$)**

---

## Beispiel 1

$$3 + 4 \\cdot 5 = ?$$

**Falsch** (von links nach rechts): $3 + 4 = 7$, dann $7 \\cdot 5 = 35$ ❌

**Richtig** (Punkt vor Strich): $4 \\cdot 5 = 20$, dann $3 + 20 = 23$ ✓

---

## Beispiel 2

$$10 - 2 \\cdot 3 + 4 = ?$$

Schritt 1: Punktrechnung zuerst: $2 \\cdot 3 = 6$

Schritt 2: Von links nach rechts: $10 - 6 + 4 = 8$

---

## Beispiel 3 — Mit Klammern

$$(3 + 4) \\cdot 5 = ?$$

Schritt 1: Klammer zuerst: $3 + 4 = 7$

Schritt 2: Dann multiplizieren: $7 \\cdot 5 = 35$

> 💡 **Merke:** Klammern ändern die Reihenfolge! Was in der Klammer steht, wird zuerst berechnet.

---

## Beispiel 4 — Verschachtelte Klammern

$$2 \\cdot (3 + (4 - 1)) = ?$$

Schritt 1: Innerste Klammer: $4 - 1 = 3$

Schritt 2: Äußere Klammer: $3 + 3 = 6$

Schritt 3: Multiplikation: $2 \\cdot 6 = 12$

> 📐 **Reihenfolge bei Klammern:** Von innen nach außen!`,
    },
    ...createExerciseLessons("m-grundrechnen", "Grundrechnen", {
      easy: `Grundrechenarten üben: Addition, Subtraktion, Multiplikation und Division mit kleinen Zahlen (1-20).`,
      medium: `Punkt-vor-Strich-Aufgaben und Rechnungen mit größeren Zahlen (bis 1000). Auch mehrere Operationen in einem Term.`,
      hard: `Komplexe Terme mit Klammern, mehreren Operationen und negativen Zahlen. Auch Textaufgaben.`,
    }),
  ],
};

export const grundrechnenQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-grundrechnen": [
    { question: "Was ist $7 + 5 \\cdot 3$?", type: "multiple", options: ["36", "22", "21", "40"], correct: 1, explanation: "Punkt vor Strich: $5 \\cdot 3 = 15$, dann $7 + 15 = 22$", hint: "Denk an die Punkt-vor-Strich-Regel!" },
    { question: "Was ist $(8 + 2) \\cdot 4$?", type: "multiple", options: ["40", "16", "32", "24"], correct: 0, explanation: "Klammer zuerst: $8 + 2 = 10$, dann $10 \\cdot 4 = 40$" },
    { question: "Was ist $100 : 4 - 5 \\cdot 3$?", type: "multiple", options: ["10", "15", "35", "0"], correct: 0, explanation: "Punktrechnungen zuerst: $100 : 4 = 25$ und $5 \\cdot 3 = 15$, dann $25 - 15 = 10$" },
    { question: "Was ist $15 - (3 + 4) \\cdot 2$?", type: "multiple", options: ["1", "16", "22", "8"], correct: 0, explanation: "Klammer: $3 + 4 = 7$, dann $7 \\cdot 2 = 14$, dann $15 - 14 = 1$" },
    { question: "Welche Reihenfolge ist richtig?", type: "multiple", options: ["Klammer → Strich → Punkt", "Punkt → Klammer → Strich", "Klammer → Punkt → Strich", "Strich → Punkt → Klammer"], correct: 2, explanation: "Die Reihenfolge ist: 1. Klammern, 2. Punktrechnungen, 3. Strichrechnungen." },
    { question: "Was ist $6 \\cdot 6 : 6$?", type: "multiple", options: ["1", "6", "36", "0"], correct: 1, explanation: "Von links nach rechts: $6 \\cdot 6 = 36$, dann $36 : 6 = 6$" },
    { question: "Was ist $2 + 3 \\cdot 4 + 5$?", type: "multiple", options: ["25", "24", "19", "21"], correct: 2, explanation: "Punkt vor Strich: $3 \\cdot 4 = 12$, dann $2 + 12 + 5 = 19$" },
    { question: "Was ist $(2 + 3) \\cdot (4 + 5)$?", type: "multiple", options: ["45", "22", "23", "20"], correct: 0, explanation: "Klammer 1: $2 + 3 = 5$, Klammer 2: $4 + 5 = 9$, dann $5 \\cdot 9 = 45$" },
    { question: "Was ist $0 : 5 + 3 \\cdot 0$?", type: "multiple", options: ["0", "3", "5", "8"], correct: 0, explanation: "$0 : 5 = 0$ und $3 \\cdot 0 = 0$, dann $0 + 0 = 0$" },
    { question: "Was ist $48 : (2 + 4) : 2$?", type: "multiple", options: ["4", "24", "12", "8"], correct: 0, explanation: "Klammer: $2 + 4 = 6$, dann $48 : 6 = 8$, dann $8 : 2 = 4$" },
  ],
};

export const grundrechnenPractice: Exercise[] = [
  { id: "gr-1", lessonId: "m-grundrechnen", difficulty: 1, type: "input", question: "Was ist $12 + 7$?", hint: "Zähle 7 zu 12 dazu.", expectedAnswer: "19", tolerance: 0, format: "Zahl", solution: "$12 + 7 = 19$" },
  { id: "gr-2", lessonId: "m-grundrechnen", difficulty: 1, type: "input", question: "Was ist $25 - 8$?", hint: "Ziehe 8 von 25 ab.", expectedAnswer: "17", tolerance: 0, format: "Zahl", solution: "$25 - 8 = 17$" },
  { id: "gr-3", lessonId: "m-grundrechnen", difficulty: 1, type: "input", question: "Was ist $6 \\cdot 7$?", hint: "6 mal 7.", expectedAnswer: "42", tolerance: 0, format: "Zahl", solution: "$6 \\cdot 7 = 42$" },
  { id: "gr-4", lessonId: "m-grundrechnen", difficulty: 1, type: "input", question: "Was ist $56 : 8$?", hint: "Wie oft passt 8 in 56?", expectedAnswer: "7", tolerance: 0, format: "Zahl", solution: "$56 : 8 = 7$" },
  { id: "gr-5", lessonId: "m-grundrechnen", difficulty: 2, type: "input", question: "Was ist $3 + 4 \\cdot 5$?", hint: "Punkt vor Strich!", expectedAnswer: "23", tolerance: 0, format: "Zahl", solution: "$4 \\cdot 5 = 20$, dann $3 + 20 = 23$" },
  { id: "gr-6", lessonId: "m-grundrechnen", difficulty: 2, type: "input", question: "Was ist $(6 + 2) \\cdot 3$?", hint: "Klammer zuerst!", expectedAnswer: "24", tolerance: 0, format: "Zahl", solution: "$6 + 2 = 8$, dann $8 \\cdot 3 = 24$" },
  { id: "gr-7", lessonId: "m-grundrechnen", difficulty: 2, type: "input", question: "Was ist $100 - 3 \\cdot 15$?", hint: "Erst multiplizieren!", expectedAnswer: "55", tolerance: 0, format: "Zahl", solution: "$3 \\cdot 15 = 45$, dann $100 - 45 = 55$" },
  { id: "gr-8", lessonId: "m-grundrechnen", difficulty: 3, type: "input", question: "Was ist $2 \\cdot (3 + 4) - 5 \\cdot 2$?", hint: "Klammer zuerst, dann Punkt, dann Strich.", expectedAnswer: "4", tolerance: 0, format: "Zahl", solution: "$3 + 4 = 7$, $2 \\cdot 7 = 14$, $5 \\cdot 2 = 10$, $14 - 10 = 4$" },
  { id: "gr-9", lessonId: "m-grundrechnen", difficulty: 3, type: "input", question: "Was ist $(10 - 3) \\cdot (4 + 2) : 7$?", hint: "Erst beide Klammern, dann von links nach rechts.", expectedAnswer: "6", tolerance: 0, format: "Zahl", solution: "$10 - 3 = 7$, $4 + 2 = 6$, $7 \\cdot 6 = 42$, $42 : 7 = 6$" },
  { id: "gr-10", lessonId: "m-grundrechnen", difficulty: 3, type: "input", question: "Was ist $50 : (3 + 7) + 4 \\cdot (8 - 3)$?", hint: "Klammer 1, Klammer 2, dann Punkt, dann Strich.", expectedAnswer: "25", tolerance: 0, format: "Zahl", solution: "$3 + 7 = 10$, $8 - 3 = 5$, $50 : 10 = 5$, $4 \\cdot 5 = 20$, $5 + 20 = 25$" },
];

export const grundrechnenExam: Exercise[] = [
  { id: "gr-e1", lessonId: "m-grundrechnen", difficulty: 2, type: "input", question: "Was ist $17 + 8 \\cdot 3 - 4$?", expectedAnswer: "33", tolerance: 0, solution: "$8 \\cdot 3 = 24$, $17 + 24 - 4 = 33$" },
  { id: "gr-e2", lessonId: "m-grundrechnen", difficulty: 2, type: "input", question: "Was ist $(12 - 5) \\cdot (3 + 4)$?", expectedAnswer: "49", tolerance: 0, solution: "$12 - 5 = 7$, $3 + 4 = 7$, $7 \\cdot 7 = 49$" },
  { id: "gr-e3", lessonId: "m-grundrechnen", difficulty: 3, type: "input", question: "Was ist $100 : (2 + 3) - 3 \\cdot (7 - 4)$?", expectedAnswer: "11", tolerance: 0, solution: "$2 + 3 = 5$, $7 - 4 = 3$, $100 : 5 = 20$, $3 \\cdot 3 = 9$, $20 - 9 = 11$" },
  { id: "gr-e4", lessonId: "m-grundrechnen", difficulty: 3, type: "input", question: "Was ist $(4 + 6) \\cdot (10 - 7) + 2 \\cdot 5$?", expectedAnswer: "40", tolerance: 0, solution: "$4 + 6 = 10$, $10 - 7 = 3$, $10 \\cdot 3 = 30$, $2 \\cdot 5 = 10$, $30 + 10 = 40$" },
];
