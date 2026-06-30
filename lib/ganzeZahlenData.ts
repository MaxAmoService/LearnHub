import { Module, QuizQuestion } from "./types";
import { Exercise } from "./mathExercises";
import { createExerciseLessons } from "./lessonHelpers";

export const ganzeZahlenModule: Module = {
  id: "m-ganze-zahlen",
  slug: "mathe-ganze-zahlen",
  title: "Ganze Zahlen",
  description: "Negative Zahlen, Vorzeichen und Rechenregeln mit ganzen Zahlen",
  icon: "🔣",
  color: "#8b5cf6",
  category: "arithmetik-algebra",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Ganze Zahlen
### Vorzeichen-Regeln
| Operation | Regel | Beispiel |
|-----------|-------|----------|
| + und + | = + | $(+3) + (+5) = +8$ |
| − und − | = − | $(-3) + (-5) = -8$ |
| + und − | Vorzeichen des Betragsgrößeren | $(+3) + (-5) = -2$ |
| · / : gleiche Vorzeichen | = + | $(-3) \\cdot (-5) = +15$ |
| · / : verschiedene Vorzeichen | = − | $(-3) \\cdot (+5) = -15$ |

### Betrag
$|x|$ = Abstand von 0 auf dem Zahlenstrahl
- $|5| = 5$, $|-5| = 5$, $|0| = 0$

### Wichtig
- $(-1)^2 = 1$, $(-1)^3 = -1$
- Minus mal Minus ergibt Plus!`,
  lessons: [
    {
      id: "m-gz-1",
      title: "Negative Zahlen & Zahlenstrahl",
      duration: "15 min",
      type: "text",
      content: `## Der Zahlenstrahl

Der **Zahlenstrahl** zeigt alle Zahlen in einer Reihe — positive Zahlen rechts, negative Zahlen links von der Null.

$$\\cdots -3 \\quad -2 \\quad -1 \\quad 0 \\quad +1 \\quad +2 \\quad +3 \\cdots$$

> 💡 **Merke:** Je weiter links, desto kleiner die Zahl. $-5 < -1 < 0 < 3$

---

## Negative Zahlen im Alltag

Negative Zahlen begegnen uns ständig:
- **Temperaturen:** $-10°C$ (unter dem Gefrierpunkt)
- **Geld:** $-50€$ (Schulden)
- **Höhe:** $-200m$ (unter dem Meeresspiegel)
- **Geschichte:** $-44$ (44 v. Chr.)

---

## Der Betrag

Der **Betrag** einer Zahl ist ihr Abstand von der Null — immer positiv!

$$|x| = \\begin{cases} x & \\text{wenn } x \\geq 0 \\\\ -x & \\text{wenn } x < 0 \\end{cases}$$

Beispiele:
- $|7| = 7$
- $|-7| = 7$
- $|0| = 0$
- $-|7| = -7$ (das Minus steht AUßERHALB!)

---

## Zahlen vergleichen

Auf dem Zahlenstrahl gilt: **Links < Rechts**

- $-3 < -1$ (weil $-3$ weiter links ist)
- $-1 < 0 < 1$
- $-100 < -5$

> ⚠️ **Achtung:** $-5$ ist GRÖßer als $-10$! Je negativer, desto kleiner.`,
    },
    {
      id: "m-gz-2",
      title: "Rechenarten mit ganzen Zahlen",
      duration: "18 min",
      type: "text",
      content: `## Addition mit negativen Zahlen

### Regel 1: Gleiche Vorzeichen
Beträge addieren, Vorzeichen beibehalten.

$$(-3) + (-5) = -8$$
$$(+3) + (+5) = +8$$

### Regel 2: Verschiedene Vorzeichen
Beträge subtrahieren (größerer minus kleinerer), Vorzeichen des größeren Betrags.

$$(-7) + (+3) = -4$$
$$(+7) + (-3) = +4$$

> 💡 **Tipp:** Stell dir vor: Schulden (+) und Guthaben (−). $-200€ + 500€ = +300€$

---

## Subtraktion mit negativen Zahlen

Subtraktion ist Addition mit dem Gegenteil:

$$a - b = a + (-b)$$

Beispiele:
- $5 - 8 = 5 + (-8) = -3$
- $-3 - 4 = -3 + (-4) = -7$
- $-3 - (-5) = -3 + 5 = 2$

> ⚠️ **Doppeltes Minus wird Plus!** $-(-5) = +5$

---

## Multiplikation mit Vorzeichen

### Die Vorzeichenregel
| Vorzeichen | Ergebnis |
|------------|----------|
| $+ \cdot +$ | $+$ |
| $- \cdot -$ | $+$ |
| $+ \cdot -$ | $-$ |
| $- \cdot +$ | $-$ |

**Merksatz:** Gleiche Vorzeichen → Plus, Verschiedene Vorzeichen → Minus

Beispiele:
- $(-3) \\cdot (-4) = +12$
- $(-3) \\cdot (+4) = -12$
- $(+3) \\cdot (-4) = -12$

---

## Division mit Vorzeichen

Die gleiche Regel gilt auch für die Division:

- $(-12) : (-4) = +3$
- $(-12) : (+4) = -3$
- $(+12) : (-4) = -3$

---

## Potenzen negativer Zahlen

$$(-2)^2 = (-2) \\cdot (-2) = 4$$
$$(-2)^3 = (-2) \\cdot (-2) \\cdot (-2) = -8$$

**Regel:**
- **Gerade** Exponenten → Ergebnis **positiv**
- **Ungerade** Exponenten → Ergebnis **negativ**

> ⚠️ **Achtung:** $-2^2 = -(2^2) = -4$ ist etwas anderes als $(-2)^2 = 4$!`,
    },
    ...createExerciseLessons("m-ganze-zahlen", "Ganze Zahlen", {
      easy: `Addition und Subtraktion mit negativen Zahlen. Vorzeichen bestimmen und Beträge berechnen.`,
      medium: `Multiplikation und Division mit negativen Zahlen. Mischrechnungen mit mehreren Operationen.`,
      hard: `Potenzen negativer Zahlen, komplexe Terme mit Vorzeichen und Klammern.`,
    }),
  ],
};

export const ganzeZahlenQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-ganze-zahlen": [
    { question: "Was ist $(-5) + (-3)$?", type: "multiple", options: ["-8", "-2", "8", "2"], correct: 0, explanation: "Gleiche Vorzeichen: Beträge addieren, Vorzeichen beibehalten. $5 + 3 = 8$, Ergebnis negativ." },
    { question: "Was ist $(-7) + 4$?", type: "multiple", options: ["-11", "-3", "3", "11"], correct: 1, explanation: "Verschiedene Vorzeichen: $7 - 4 = 3$, Vorzeichen des größeren Betrags (negativ)." },
    { question: "Was ist $(-3) \\cdot (-5)$?", type: "multiple", options: ["-15", "15", "-8", "8"], correct: 1, explanation: "Minus mal Minus ergibt Plus: $3 \\cdot 5 = 15$." },
    { question: "Was ist $(-2)^4$?", type: "multiple", options: ["-16", "16", "-8", "8"], correct: 1, explanation: "Gerader Exponent → positiv: $2^4 = 16$." },
    { question: "Was ist $|{-7}|$?", type: "multiple", options: ["-7", "7", "0", "14"], correct: 1, explanation: "Der Betrag ist immer positiv: $|-7| = 7$." },
    { question: "Was ist $6 - (-4)$?", type: "multiple", options: ["2", "10", "-10", "-2"], correct: 1, explanation: "Doppeltes Minus wird Plus: $6 + 4 = 10$." },
    { question: "Was ist $(-12) : 4$?", type: "multiple", options: ["-3", "3", "-48", "48"], correct: 0, explanation: "Verschiedene Vorzeichen → negativ: $12 : 4 = 3$." },
    { question: "Welche Zahl ist kleiner: $-5$ oder $-3$?", type: "multiple", options: ["-5", "-3", "Gleich", "Nicht vergleichbar"], correct: 0, explanation: "Auf dem Zahlenstrahl: $-5$ liegt weiter links, also ist $-5 < -3$." },
    { question: "Was ist $(-1)^{17}$?", type: "multiple", options: ["1", "-1", "0", "17"], correct: 1, explanation: "Ungerader Exponent → negativ: $(-1)^{17} = -1$." },
    { question: "Was ist $(-8) : (-2)$?", type: "multiple", options: ["-4", "4", "-16", "16"], correct: 1, explanation: "Minus geteilt durch Minus ergibt Plus: $8 : 2 = 4$." },
  ],
};

export const ganzeZahlenPractice: Exercise[] = [
  { id: "gz-1", lessonId: "m-ganze-zahlen", difficulty: 1, type: "input", question: "Was ist $(-4) + (-6)$?", hint: "Gleiche Vorzeichen: Beträge addieren.", expectedAnswer: "-10", tolerance: 0, format: "Zahl", solution: "$(-4) + (-6) = -10$" },
  { id: "gz-2", lessonId: "m-ganze-zahlen", difficulty: 1, type: "input", question: "Was ist $(-9) + 3$?", hint: "Verschiedene Vorzeichen: Beträge subtrahieren.", expectedAnswer: "-6", tolerance: 0, format: "Zahl", solution: "$9 - 3 = 6$, Vorzeichen negativ → $-6$" },
  { id: "gz-3", lessonId: "m-ganze-zahlen", difficulty: 1, type: "input", question: "Was ist $|{-12}|$?", hint: "Der Betrag ist immer positiv.", expectedAnswer: "12", tolerance: 0, format: "Zahl", solution: "$|-12| = 12$" },
  { id: "gz-4", lessonId: "m-ganze-zahlen", difficulty: 1, type: "input", question: "Was ist $5 + (-8)$?", hint: "Verschiedene Vorzeichen.", expectedAnswer: "-3", tolerance: 0, format: "Zahl", solution: "$8 - 5 = 3$, Vorzeichen negativ → $-3$" },
  { id: "gz-5", lessonId: "m-ganze-zahlen", difficulty: 2, type: "input", question: "Was ist $(-3) \\cdot 7$?", hint: "Minus mal Plus ergibt Minus.", expectedAnswer: "-21", tolerance: 0, format: "Zahl", solution: "$(-3) \\cdot 7 = -21$" },
  { id: "gz-6", lessonId: "m-ganze-zahlen", difficulty: 2, type: "input", question: "Was ist $(-24) : (-6)$?", hint: "Minus durch Minus ergibt Plus.", expectedAnswer: "4", tolerance: 0, format: "Zahl", solution: "$(-24) : (-6) = 4$" },
  { id: "gz-7", lessonId: "m-ganze-zahlen", difficulty: 2, type: "input", question: "Was ist $(-5)^2$?", hint: "Gerader Exponent → positiv.", expectedAnswer: "25", tolerance: 0, format: "Zahl", solution: "$(-5)^2 = (-5) \\cdot (-5) = 25$" },
  { id: "gz-8", lessonId: "m-ganze-zahlen", difficulty: 2, type: "input", question: "Was ist $8 - (-3)$?", hint: "Doppeltes Minus wird Plus.", expectedAnswer: "11", tolerance: 0, format: "Zahl", solution: "$8 + 3 = 11$" },
  { id: "gz-9", lessonId: "m-ganze-zahlen", difficulty: 3, type: "input", question: "Was ist $(-2)^5$?", hint: "Ungerader Exponent → negativ.", expectedAnswer: "-32", tolerance: 0, format: "Zahl", solution: "$(-2)^5 = -32$" },
  { id: "gz-10", lessonId: "m-ganze-zahlen", difficulty: 3, type: "input", question: "Was ist $(-3) \\cdot (-4) + (-2) \\cdot 5$?", hint: "Erst Punktrechnung, dann Strichrechnung.", expectedAnswer: "2", tolerance: 0, format: "Zahl", solution: "$(-3) \\cdot (-4) = 12$, $(-2) \\cdot 5 = -10$, $12 + (-10) = 2$" },
];

export const ganzeZahlenExam: Exercise[] = [
  { id: "gz-e1", lessonId: "m-ganze-zahlen", difficulty: 2, type: "input", question: "Was ist $(-7) \\cdot 6 + 3 \\cdot (-4)$?", expectedAnswer: "-54", tolerance: 0, solution: "$(-7) \\cdot 6 = -42$, $3 \\cdot (-4) = -12$, $-42 + (-12) = -54$" },
  { id: "gz-e2", lessonId: "m-ganze-zahlen", difficulty: 2, type: "input", question: "Was ist $(-48) : (-8) - 3 \\cdot (-2)$?", expectedAnswer: "12", tolerance: 0, solution: "$(-48) : (-8) = 6$, $3 \\cdot (-2) = -6$, $6 - (-6) = 12$" },
  { id: "gz-e3", lessonId: "m-ganze-zahlen", difficulty: 3, type: "input", question: "Was ist $(-3)^3 + (-2)^4$?", expectedAnswer: "-11", tolerance: 0, solution: "$(-3)^3 = -27$, $(-2)^4 = 16$, $-27 + 16 = -11$" },
  { id: "gz-e4", lessonId: "m-ganze-zahlen", difficulty: 3, type: "input", question: "Was ist $(-2) \\cdot (-3) \\cdot (-4)$?", expectedAnswer: "-24", tolerance: 0, solution: "$(-2) \\cdot (-3) = 6$, $6 \\cdot (-4) = -24$" },
];
