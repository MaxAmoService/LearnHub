import { Module, QuizQuestion, LessonVisual } from "./types";

interface MathSubCategory {
  id: string;
  name: string;
  description: string;
}

interface MathCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subCategories: MathSubCategory[];
}

export const mathCategories: MathCategory[] = [
  {
    id: "arithmetik-algebra",
    name: "Arithmetik & Algebra",
    icon: "🔢",
    description: "Brüche, Gleichungen, Termumformung, Ungleichungen",
    subCategories: [
      { id: "bruchrechnen", name: "Bruchrechnen", description: "Brüche, KGV, gemischte Zahlen" },
      { id: "gleichungen", name: "Gleichungen", description: "Linear, quadratisch, pq-Formel" },
      { id: "termumformung", name: "Termumformung", description: "Binomische Formeln, Distributivgesetz" },
    ],
  },
  {
    id: "geometrie",
    name: "Geometrie",
    icon: "📏",
    description: "Analytische Geometrie, Körper, Abstände",
    subCategories: [
      { id: "analytisch", name: "Analytische Geometrie", description: "Geraden, Ebenen, Abstände" },
    ],
  },
  {
    id: "grundlagen",
    name: "Grundlagen",
    icon: "🔢",
    description: "Mengenlehre, Logik, Funktionen, Potenzen & Wurzeln",
    subCategories: [
      { id: "mengen-logik", name: "Mengenlehre & Logik", description: "Mengenoperationen, logische Aussagen, Quantoren" },
      { id: "funktionen", name: "Funktionen & Graphen", description: "Definitionsbereiche, Eigenschaften, Umkehrfunktionen" },
      { id: "potenzen-logarithmen", name: "Potenzen & Logarithmen", description: "Potenzregeln, Wurzeln, Exponentialfunktionen" },
    ],
  },
  {
    id: "analysis",
    name: "Analysis",
    icon: "📊",
    description: "Grenzwerte, Ableitungen, Integration, Reihen & Potenzreihen",
    subCategories: [
      { id: "grenzwerte", name: "Grenzwerte", description: "Limes, L'Hôpital, Konvergenz" },
      { id: "differentialrechnung", name: "Differentialrechnung", description: "Ableitungen, Regeln, Anwendungen" },
      { id: "integralrechnung", name: "Integralrechnung", description: "Stammfunktionen, bestimmte Integrale" },
      { id: "reihen", name: "Reihen & Potenzreihen", description: "Konvergenz, Taylor, Maclaurin" },
      { id: "komplexe-zahlen", name: "Komplexe Zahlen", description: "Gaußsche Ebene, Darstellungsformen, Rechenregeln" },
    ],
  },
  {
    id: "lineare-algebra",
    name: "Lineare Algebra",
    icon: "↔️",
    description: "Vektoren, Matrizen, Lineare Gleichungssysteme",
    subCategories: [
      { id: "vektoren", name: "Vektoren", description: "Vektorrechnung, Skalar- und Kreuzprodukt" },
      { id: "matrizen", name: "Matrizen", description: "Matrixrechnung, Determinanten, inverse Matrizen" },
    ],
  },
  {
    id: "geometrie-trigonometrie",
    name: "Geometrie & Trigonometrie",
    icon: "📐",
    description: "Flächen, Körper, Trigonometrie, Analytische Geometrie",
    subCategories: [
      { id: "flaechen", name: "Flächeninhalte", description: "Rechteck, Dreieck, Kreis, Trapez" },
      { id: "koerper", name: "Körper & Volumen", description: "Quader, Kugel, Zylinder, Kegel" },
      { id: "trigonometrie", name: "Trigonometrie", description: "Sinus, Kosinus, Tangens, Einheitskreis" },
    ],
  },
  {
    id: "stochastik",
    name: "Stochastik",
    icon: "🎲",
    description: "Wahrscheinlichkeitsrechnung, Kombinatorik, Statistik",
    subCategories: [
      { id: "wahrscheinlichkeit", name: "Wahrscheinlichkeitsrechnung", description: "Grundbegriffe, bedingte Wahrscheinlichkeit, Bayes" },
      { id: "kombinatorik", name: "Kombinatorik", description: "Permutationen, Variationen, Kombinationen" },
      { id: "statistik", name: "Statistik", description: "Mittelwert, Varianz, Standardabweichung, Quartile" },
    ],
  },
  {
    id: "komplexe-numerik",
    name: "Komplexe Zahlen & Numerik",
    icon: "🌀",
    description: "Komplexe Zahlen, Numerische Verfahren",
    subCategories: [
      { id: "komplexe-zahlen", name: "Komplexe Zahlen", description: "Rechenregeln, Betrag, Polardarstellung" },
      { id: "numerik", name: "Numerische Verfahren", description: "Fehler, Bisektion, Newton-Verfahren" },
    ],
  },
  {
    id: "differentialgleichungen",
    name: "Differentialgleichungen",
    icon: "📈",
    description: "DGln 1. und 2. Ordnung",
    subCategories: [
      { id: "dgl-1", name: "DGln 1. Ordnung", description: "Trennbare Variablen, Integrationsfaktor" },
      { id: "dgl-2", name: "DGln 2. Ordnung", description: "Charakteristik, homogen, inhomogen" },
    ],
  },
];

export const mathModules: Module[] = [
  {
    id: "m-grundlagen-mengen",
    slug: "mathe-mengenlehre",
    title: "Mengenlehre & Logik",
    description: "Grundlagen der Mengen und mathematischen Logik",
    icon: "🔢",
    color: "#8b5cf6",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Mengenlehre & Logik

### Mengen-Operationen
| Operation | Symbol | Beschreibung |
|-----------|--------|---------------|
| Vereinigung | $A \\cup B$ | Alle Elemente in A oder B |
| Schnitt | $A \\cap B$ | Nur Elemente in A und B |
| Differenz | $A \\setminus B$ | In A, aber nicht in B |
| Komplement | $\\bar{A}$ | Alles außerhalb A |

### Wichtige Formeln
- **Satz von Bernoulli:** $|A \\cup B| = |A| + |B| - |A \\cap B|$
- **De Morgan:** $\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}$

### Logik
- **Implikation:** $P \\rightarrow Q$ nur falsch bei Wahr → Falsch
- **Kontraposition:** $(P \\rightarrow Q) \\equiv (\\neg Q \\rightarrow \\neg P)$
- **Quantoren:** $\\forall$ (alle), $\\exists$ (existiert)` ,
    lessons: [
      {
        id: "mg1",
        title: "Mengen & Mengenoperationen",
        duration: "20 min",
        interactive: "vennDiagramExplorer" as const,
        type: "interactive",
        content: `## Was ist eine Menge?

> In diesem Modul lernst du die Grundlagen der Mathematik kennen — Mengen, Logik und Quantoren. Diese Konzepte sind das Fundament für ALLES, was in Analysis, Linear Algebra und Informatik kommt!

> 🏠 **Fürs Erweitert:** Mengen und Logik werden in „Mathematik 1 — Grundlagen“ (MA1) drankommen. Wer sie hier versteht, hat im Erweitert einen riesigen Vorsprung!

Eine **Menge** ist eine klar definierte Sammlung von Objekten. In der Mathematik gelten zwei Regeln:

1. **Eindeutig:** Man weiß genau, ob ein Element zur Menge gehört oder nicht
2. **Unterscheidbar:** Jedes Element kommt nur einmal vor

Die **Reihenfolge** spielt keine Rolle: $\\{1, 2, 3\\} = \\{3, 1, 2\\}$

---

## Mengenschreibweisen

Es gibt drei Schreibweisen, je nach Situation:

### Aufzählung (Listing)
$$A = \\{1, 2, 3, 4, 5\\}$$
Elemente werden in geschweiften Klammern aufgezählt. Gut für kleine, endliche Mengen.

### Eigenschaft (Prädikat)
$$B = \\{x \\in \\mathbb{N} \\mid x < 10\\}$$
"Alle natürlichen Zahlen x, die kleiner als 10 sind." Gut für große Mengen.

### Intervalle
$$[a, b] = \\{x \\in \\mathbb{R} \\mid a \\leq x \\leq b\\}$$
- $[a, b]$ = abgeschlossen (Grenzen enthalten)
- $(a, b)$ = offen (Grenzen nicht enthalten)
- $[a, b)$ = halboffen

---

## Wichtige Mengen

| Symbol | Name | Beispiel |
|--------|------|----------|
| $\\mathbb{N}$ | Natürliche Zahlen | $1, 2, 3, ...$ |
| $\\mathbb{Z}$ | Ganze Zahlen | $...-2, -1, 0, 1, 2...$ |
| $\\mathbb{Q}$ | Rationale Zahlen | $\\frac{1}{2}, 0{,}75, -3$ |
| $\\mathbb{R}$ | Reelle Zahlen | $\\pi, \\sqrt{2}, e$ |
| $\\mathbb{C}$ | Komplexe Zahlen | $3 + 2j$ |

> **Merke:** $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$ — jede Menge enthält die vorherige!

---

## Die vier Mengenoperationen

### Vereinigung ($\\cup$) — "ODER"
$$A \\cup B = \\{x \\mid x \\in A \\text{ oder } x \\in B\\}$$
Alles, was in A **oder** in B (oder in beiden) liegt.

### Schnittmenge ($\\cap$) — "UND"
$$A \\cap B = \\{x \\mid x \\in A \\text{ und } x \\in B\\}$$
Nur, was in A **und** gleichzeitig in B liegt.

### Differenz ($\\setminus$) — "ABER NICHT"
$$A \\setminus B = \\{x \\mid x \\in A \\text{ und } x \\notin B\\}$$
Alles aus A, aber ohne die Elemente aus B.

### Komplement ($\\bar{A}$) — "ALLES AUSSER"
$$\\bar{A} = U \\setminus A$$
Alles aus der Grundmenge U, was nicht in A liegt.

---

## Schritt-für-Schritt Beispiel

Gegeben: $A = \\{1, 2, 3, 4\\}$, $B = \\{3, 4, 5, 6\\}$, $U = \\{1, ..., 10\\}$

**Schritt 1:** Vereinigung — alle Elemente sammeln:
$$A \\cup B = \\{1, 2, 3, 4, 5, 6\\}$$

**Schritt 2:** Schnitt — nur die gemeinsamen:
$$A \\cap B = \\{3, 4\\}$$

**Schritt 3:** Differenz $A \\setminus B$ — aus A die B-Elemente entfernen:
$$A \\setminus B = \\{1, 2\\}$$

**Schritt 4:** Komplement — alles aus U was nicht in A ist:
$$\\bar{A} = \\{5, 6, 7, 8, 9, 10\\}$$

---

## Wichtige Gesetze

### Satz von Bernoulli (Additionsregel)
$$|A \\cup B| = |A| + |B| - |A \\cap B|$$
Das $|A \\cap B|$ wird abgezogen, weil es sonst doppelt gezählt wird!

**Beispiel:** $|A| = 4$, $|B| = 4$, $|A \\cap B| = 2$
$$|A \\cup B| = 4 + 4 - 2 = 6$$

### De Morgan'sche Gesetze
$$\\overline{A \\cup B} = \\bar{A} \\cap \\bar{B}$$
$$\\overline{A \\cap B} = \\bar{A} \\cup \\bar{B}$$

> **Merke:** Bei De Morgan wird $\\cup$ zu $\\cap$ und umgekehrt — das Komplement "dreht" die Verknüpfung um!

[GUIDED_START]
**Schritt-für-Schritt:** Prüfe De Morgan für $A = \\{1, 2, 3\\}$, $B = \\{2, 3, 4\\}$, $U = \\{1, 2, 3, 4, 5\\}$

**Schritt 1:** $A \\cup B = \\{1, 2, 3, 4\\}$

**Schritt 2:** $\\overline{A \\cup B} = \\{5\\}$

**Schritt 3:** $\\bar{A} = \\{4, 5\\}$, $\\bar{B} = \\{1, 5\\}$

**Schritt 4:** $\\bar{A} \\cap \\bar{B} = \\{5\\}$

**Ergebnis:** $\\overline{A \\cup B} = \\{5\\} = \\bar{A} \\cap \\bar{B}$ ✓ De Morgan bestätigt!
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** $A = \\{1, 2, 3, 4, 5\\}$, $B = \\{4, 5, 6, 7\\}$, $U = \\{1, ..., 10\\}$
Berechne $A \\cap B$, $\\bar{A}$, $|A \\cup B|$

**Lösung:**
- $A \\cap B = \\{4, 5\\}$
- $\\bar{A} = \\{6, 7, 8, 9, 10\\}$
- $|A \\cup B| = 5 + 4 - 2 = 7$

**Aufgabe 2:** Gegeben $|A| = 20$, $|B| = 15$, $|A \\cap B| = 8$. Berechne $|A \\cup B|$.

**Lösung:** $|A \\cup B| = 20 + 15 - 8 = 27$
[PRACTICE_END]

> 🔗 **Weiter:** Du kennst jetzt Mengen und ihre Operationen. Als Nächstes lernst du die **logischen Verknüpfungen** kennen — AND, OR, NOT und Wahrheitstafeln. Das ist die Sprache der Mathematik und Informatik!

[INTERACTIVE]`,
      },
      {
        id: "mg2",
        title: "Logische Aussagen",
        duration: "18 min",
        interactive: "truthTableExplorer" as const,
        type: "interactive",
        content: `## Logische Verknüpfungen

> In der letzten Lektion hast du Mengen und Mengenoperationen kennengelernt. Jetzt lernst du die **Sprache** kennen, mit der Mathematik arbeitet: Logik! Jede Aussage ist entweder wahr oder falsch — und genau das macht Mathematik so präzise.

> 🎬 **Essence of Linear Algebra — Abstraction** — https://www.youtube.com/watch?v=TgKwz5Ikpc8 — warum Abstraktion (wie Logik) in der Mathematik so wichtig ist.

In der Logik verknüpfen wir **Aussagen** (P, Q, R...) miteinander. Jede Aussage ist entweder **wahr (W)** oder **falsch (F)**.

---

## Die vier Grundverknüpfungen

### UND ($\\land$) — "beide müssen stimmen"
$$P \\land Q$$
Nur wahr, wenn **beide** wahr sind. Sonst falsch.

**Beispiel:** "Es regnet UND es ist kalt" — nur wahr wenn beides zutrifft.

### ODER ($\\lor$) — "mindestens eine stimmt"
$$P \\lor Q$$
Falsch nur, wenn **beide** falsch sind. Sonst wahr.

**Beispiel:** "Ich nehpe Kaffee ODER Tee" — wahr wenn eins von beidem (oder beides).

### NICHT ($\\neg$) — "Umdrehen"
$$\\neg P$$
Aus wahr wird falsch, aus falsch wird wahr.

### IMPLIKATION ($\\rightarrow$) — "wenn...dann..."
$$P \\rightarrow Q$$
Nur falsch, wenn P wahr und Q falsch ist. Sonst immer wahr.

**Beispiel:** "Wenn es regnet, dann ist die Straße nass." Nur falsch wenn es regnet aber die Straße trocken ist.

---

## Wahrheitstafel — alle 4 Verknüpfungen

| P | Q | $P \\land Q$ | $P \\lor Q$ | $\\neg P$ | $P \\rightarrow Q$ |
|---|---|:---:|:---:|:---:|:---:|
| W | W | W | W | F | W |
| W | F | F | W | F | F |
| F | W | F | W | W | W |
| F | F | F | F | W | W |

> **Merke:** $P \\rightarrow Q$ ist nur falsch bei W → F. Das merkt man sich am besten: "Eine wahre Aussage darf nichts Falsches implizieren."

---

## Wichtige Äquivalenzen

### Kontraposition
$$(P \\rightarrow Q) \\equiv (\\neg Q \\rightarrow \\neg P)$$
"Wenn es regnet, ist die Straße nass" = "Wenn die Straße nicht nass ist, hat es nicht geregnet."

### De Morgan'sche Gesetze (für Logik!)
$$\\neg(P \\land Q) \\equiv (\\neg P \\lor \\neg Q)$$
$$\\neg(P \\lor Q) \\equiv (\\neg P \\land \\neg Q)$$

> **Merke:** Bei De Morgan wird $\\land$ zu $\\lor$ und umgekehrt — genau wie bei Mengen!

### Distributivgesetz
$$P \\land (Q \\lor R) \\equiv (P \\land Q) \\lor (P \\land R)$$

---

## Schritt-für-Schritt Beispiel

**Aufgabe:** Vereinfache $\\neg(\\neg P \\lor Q)$

**Schritt 1:** De Morgan anwenden: $\\neg(\\neg P \\lor Q) \\equiv \\neg(\\neg P) \\land \\neg Q$

**Schritt 2:** Doppelte Negation: $\\neg(\\neg P) = P$

**Ergebnis:** $\\neg(\\neg P \\lor Q) \\equiv P \\land \\neg Q$

[GUIDED_START]
**Schritt-für-Schritt:** Ist $(P \\rightarrow Q) \\rightarrow (Q \\rightarrow P)$ eine Tautologie?

**Schritt 1:** Wahrheitstafel aufstellen:

| P | Q | $P \\rightarrow Q$ | $Q \\rightarrow P$ | $(P \\rightarrow Q) \\rightarrow (Q \\rightarrow P)$ |
|---|---|:---:|:---:|:---:|
| W | W | W | W | W |
| W | F | F | W | W |
| F | W | W | F | **F** |
| F | F | W | W | W |

**Schritt 2:** In Zeile 3 (P=F, Q=W) ist die gesamte Aussage falsch.

**Ergebnis:** Keine Tautologie! Die Implikation ist nicht symmetrisch.
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Bestimme $\\neg(P \\land Q)$ für P = W, Q = F

**Lösung:** $\\neg(W \\land F) = \\neg(F) = W$

**Aufgabe 2:** Vereinfache $\\neg(P \\rightarrow Q)$

**Lösung:** $P \\rightarrow Q \\equiv \\neg P \\lor Q$, also $\\neg(P \\rightarrow Q) \\equiv P \\land \\neg Q$

**Aufgabe 3:** Ist $P \\lor \\neg P$ eine Tautologie?

**Lösung:** Ja! Für jedes P gilt: entweder P oder ¬P ist wahr. (Satz vom ausgeschlossenen Dritten)
[PRACTICE_END]

> **Nächste Lektion:** Quantoren — "für alle" (∀) und "es existiert" (∃). Damit kannst du Aussagen über ganze Mengen treffen!

> 🔗 **Verwandt:** De Morgan's Regeln gelten auch für Quantoren: $\neg \forall x P(x) \equiv \exists x \neg P(x)$

[INTERACTIVE]`,
      },
      {
        id: "mg3",
        title: "Quantoren",
        duration: "18 min",
        type: "text",
        content: `## Was sind Quantoren?

> In der letzten Lektion hast du logische Verknüpfungen kennengelernt (UND, ODER, NICHT). Jetzt wird es mächtiger: Mit **Quantoren** kannst du Aussagen über **ganze Mengen** treffen — "alle x gelten..." oder "es gibt ein x, das...". Das ist ein Kernkonzept der Mathematik!

> 🏠 **Fürs Erweitert:** Quantoren sind Teil von MA1 (Grundlagen). In der Informatik brauchst du sie für Schleifen-Logik ($\\forall$ = for-all-Schleife) und Datenbankabfragen ($\\exists$ = SELECT ... WHERE).

Quantoren drücken aus, **für wie viele Elemente** eine Aussage gilt. Es gibt drei Typen.

---

## Allquantor ($\\forall$) — "für alle"

$$\\forall x \\in M: P(x)$$
"Für **alle** x aus M gilt die Aussage P(x)."

**Beispiele:**
- $\\forall x \\in \\mathbb{R}: x^2 \\geq 0$ — wahr! (jede reelle Zahl quadriert ist $\\geq 0$)
- $\\forall x \\in \\mathbb{R}: x^2 > 0$ — falsch! (Gegenbeispiel: $x = 0$)

> **Merke:** Um einen Allquantor zu **widerlegen**, reicht **ein einziges Gegenbeispiel**!

---

## Existenzquantor ($\\exists$) — "es gibt mindestens eins"

$$\\exists x \\in M: P(x)$$
"Es existiert **mindestens ein** x aus M, für das P(x) gilt."

**Beispiele:**
- $\\exists x \\in \\mathbb{R}: x^2 = 4$ — wahr! ($x = 2$ oder $x = -2$)
- $\\exists x \\in \\mathbb{R}: x^2 = -1$ — falsch! (keine reelle Zahl)

---

## Eindeutigkeitsquantor ($\\exists!$) — "es gibt genau eins"

$$\\exists! x \\in M: P(x)$$
"Es existiert **genau ein** x aus M, für das P(x) gilt."

**Beispiele:**
- $\\exists! x \\in \\mathbb{R}: x + 2 = 5$ — wahr! ($x = 3$, eindeutig)
- $\\exists! x \\in \\mathbb{R}: x^2 = 4$ — falsch! ($x = 2$ und $x = -2$)

---

## Quantoren negieren — die wichtigste Regel!

Die Negation von Quantoren folgt einem einfachen Muster: $\\forall$ wird zu $\\exists$ und umgekehrt.

$$\\neg(\\forall x: P(x)) \\equiv \\exists x: \\neg P(x)$$
$$\\neg(\\exists x: P(x)) \\equiv \\forall x: \\neg P(x)$$

> **Merke:** "Nicht alle" = "Es gibt einen, der nicht" und "Es gibt keinen" = "Alle sind nicht"

---

## Schritt-für-Schritt Beispiele

### Beispiel 1: Allquantor negieren

**Aussage:** "Alle Studenten bestehen die Prüfung."
$$\\forall s: \\text{besteht}(s)$$

**Negation:** "Es gibt einen Studenten, der nicht besteht."
$$\\exists s: \\neg\\text{besteht}(s)$$

### Beispiel 2: Existenzquantor negieren

**Aussage:** "Es gibt eine Primzahl, die gerade ist."
$$\\exists p: \\text{prim}(p) \\land \\text{gerade}(p)$$

**Negation:** "Alle Primzahlen sind ungerade."
$$\\forall p: \\text{prim}(p) \\rightarrow \\text{ungerade}(p)$$

### Beispiel 3: Verschachtelte Quantoren

$$\\forall x \\exists y: x + y = 0$$
"Zu jeder Zahl x gibt es eine Zahl y, sodass x + y = 0."
Das ist wahr: $y = -x$.

**Negation:**
$$\\exists x \\forall y: x + y \\neq 0$$
"Es gibt eine Zahl x, zu der keine Zahl y die Summe 0 ergibt." Das ist falsch.

---

## Häufige Fehler

| Aussage | Bedeutung | Wahr? |
|---------|-----------|-------|
| $\\forall x: x^2 > 0$ | "Jedes Quadrat ist positiv" | Falsch ($x=0$) |
| $\\exists x: x^2 < 0$ | "Es gibt negatives Quadrat" | Falsch |
| $\\forall x \\exists y: x < y$ | "Zu jedem x gibt es größeres y" | Wahr |
| $\\exists y \\forall x: x < y$ | "Es gibt größtes y über alle x" | Falsch |

> **Achtung:** $\\forall x \\exists y$ und $\\exists y \\forall x$ sind **nicht** dasselbe! Die Reihenfolge der Quantoren matters.

[GUIDED_START]
**Schritt-für-Schritt:** Negiere $\\forall x \\in \\mathbb{R}: x^2 + 1 > 0$

**Schritt 1:** Allquantor negieren → Existenzquantor: $\\exists x \\in \\mathbb{R}: ...$

**Schritt 2:** Aussage negieren: $x^2 + 1 > 0$ wird zu $x^2 + 1 \\leq 0$

**Schritt 3:** Zusammen: $\\exists x \\in \\mathbb{R}: x^2 + 1 \\leq 0$

**Schritt 4:** Prüfen: Ist das wahr oder falsch?
$x^2 \\geq 0$ für alle x, also $x^2 + 1 \\geq 1 > 0$.
Die negierte Aussage ist **falsch** → die ursprüngliche ist **wahr**!
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Formuliere die Negation von $\\forall x \\in \\mathbb{N}: x > 0$

**Lösung:** $\\exists x \\in \\mathbb{N}: x \\leq 0$ (z.B. $x = 0$)

**Aufgabe 2:** Ist $\\exists! x \\in \\mathbb{R}: x^3 = 0$ wahr?

**Lösung:** Ja! $x = 0$ ist die einzige Lösung, da $x^3 = 0 \\Leftrightarrow x = 0$.

**Aufgabe 3:** Negiere $\\exists x \\in \\mathbb{R}: x^2 = 2$

**Lösung:** $\\forall x \\in \\mathbb{R}: x^2 \\neq 2$ (falsch, da $\\sqrt{2}$ existiert)
[PRACTICE_END]

> **Nächstes Modul:** Funktionen & Graphen — jetzt geht's in die Analysis! Funktionen sind das zentrale Werkzeug der Mathematik.

> 🎬 **Essence of Calculus — Derivative** — https://www.youtube.com/watch?v=WUvTyaaNkzM — ein Vorgeschmack darauf, was mit Funktionen alles möglich ist!
`,
      },
            {
              id: "m-grundlagen-mengen-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Mengen aufschreiben, Elemente zahlen und einfache Teilmengenbeziehungen prufen. Basis-Vokabular der Mengenlehre.`,
            },
            {
              id: "m-grundlagen-mengen-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Vereinigung, Schnitt und Differenz berechnen sowie logische Aussagen mit UND/ODER verknupfen. Venn-Diagramme lesen.`,
            },
            {
              id: "m-grundlagen-mengen-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Quantoren, De Morgan-Regeln und mehrschrittige Beweisfuhrungen. Kartesische Produkte und Potenzmengen.`,
            },
            {
              id: "m-grundlagen-mengen-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Mengenlehre & Logik — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m-grundlagen-funktionen",
    slug: "mathe-funktionen",
    title: "Funktionen & Graphen",
    description: "Funktionen, Graphen und Eigenschaften",
    icon: "📉",
    color: "#8b5cf6",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Funktionen & Graphen\n\n### 🎯 Wichtige Funktionen\n\n| Typ | Formel | Beispiel |\n|-----|--------|----------|\n| **Linear** | $f(x) = mx + b$ | $2x + 3$ |\n| **Quadratisch** | $f(x) = ax^2 + bx + c$ | $x^2 - 4$ |\n| **Potenz** | $f(x) = x^n$ | $x^3$ |\n| **Wurzel** | $f(x) = \\sqrt{x}$ | $\\sqrt{x+1}$ |\n| **Exponential** | $f(x) = a^x$ | $2^x$ |\n| **Logarithmus** | $f(x) = \\log_a x$ | $\\ln x$ |\n\n### 📐 Eigenschaften\n\n| Eigenschaft | Definition |\n|-------------|------------|\n| **Gerade** | $f(-x) = f(x)$ (achsensymmetrisch) |\n| **Ungerade** | $f(-x) = -f(x)$ (punktsymmetrisch) |\n| **Monoton** | $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ |\n| **Beschränkt** | $|f(x)| \\leq M$ |\n\n### 💡 Umkehrfunktion\n- $f^{-1}(f(x)) = x$\n- Grafisch: Spiegelung an $y = x$\n- Existiert nur, wenn $f$ bijektiv ist` ,
    lessons: [
      {
        id: "mf1",
        title: "Funktionen & Definitionsbereiche",
        duration: "15 min",
        type: "interactive",
        interactive: "functionExplorer" as const,
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x - 2, xRange: [-3, 3], yRange: [-3, 7], label: "f(x) = x² - 2", points: [{ x: 0, y: -2, label: "(0, -2)" }] } },
        ],
        content: `# Funktionen & Definitionsbereiche

> Du kennst bereits Mengenoperationen und Logik aus dem Grundlagen-Modul. Jetzt lernst du das wichtigste Werkzeug der Mathematik kennen: die **Funktion** — eine Regel, die jedem x genau ein y zuordnet!

> 🏠 **Fürs Erweitert:** Funktionen sind das Herzstück von MA2 (Analysis 1). Wer den Funktionenbegriff hier sicher beherrscht, hat in Grenzwerten, Ableitungen und Integralen einen riesigen Vorsprung!

> 🎬 **Essence of Calculus — Derivatives** — https://www.youtube.com/watch?v=WUvTyaaNkzM — zeigt intuitiv, was Funktionen und ihre Ableitungen bedeuten.

## Definition

Eine Funktion $f: D \\rightarrow Y$ ordnet jedem Element aus dem Definitionsbereich $D$ genau ein Element aus dem Zielbereich $Y$ zu.

## Schreibweisen

- $f(x) = x^2 + 1$
- $f: \\mathbb{R} \\rightarrow \\mathbb{R}, x \\mapsto x^2 + 1$

## Wichtige Funktionen

### Polynomfunktionen
$f(x) = a_n x^n + a_{n-1} x^{n-1} + \\ldots + a_1 x + a_0$

### Rationalfunktionen
$f(x) = \\frac{p(x)}{q(x)}$, wobei $q(x) \\neq 0$

### Wurzelfunktionen
$f(x) = \\sqrt[n]{x}$ für $x \\geq 0$ (bei geradem n)

## Definitionsbereich bestimmen

- **Nenner**: $\\neq 0$
- **Wurzel**: Argument $\\geq 0$ (bei geradem Index)
- **Logarithmus**: Argument $> 0$

> 🔗 **Weiter:** Im nächsten Kapitel untersuchst du die **Eigenschaften** von Funktionen — Monotonie, Stetigkeit und Umkehrfunktionen. Danach geht es in die Analysis mit Grenzwerten!

---

## Häufige Fehler

> **Achtung:** Diese Fehler begegnen in Klausuren immer wieder — merke sie dir gut!

**1.** $\\sqrt{x^2} = |x|$ **nicht** $x$!
- $\\sqrt{(-3)^2} = \\sqrt{9} = 3 = |-3|$ ✓
- Wer die Betragsstriche vergisst, bekommt bei negativen x das falsche Vorzeichen.

**2.** $0^0$ ist **undefiniert**!
- $a^0 = 1$ für $a \\neq 0$ und $0^n = 0$ für $n > 0$ — aber $0^0$ ist ein unbestimmter Ausdruck.

**3.** $\\ln(x)$ ist nur für $x > 0$ definiert!
- $\\ln(0)$ und $\\ln(-5)$ existieren nicht in $\\mathbb{R}$.
- Im Definitionsbereich immer prüfen: Argument des Logarithmus **strikt positiv**.

---

## Definitionsbereich bestimmen — Schritt für Schritt

### Beispiel 1: $f(x) = \\frac{1}{x-2}$

**Schritt 1:** Finde die Einschränkungen — hier: Nenner darf nicht 0 sein.
$$x - 2 \\neq 0 \\quad \\Rightarrow \\quad x \\neq 2$$

**Schritt 2:** Schreibe den Definitionsbereich auf:
$$D = \\mathbb{R} \\setminus \\{2\\} = (-\\infty, 2) \\cup (2, \\infty)$$

**Probe:** $f(2) = \\frac{1}{0}$ → undefiniert ✓

---

### Beispiel 2: $f(x) = \\sqrt{x+3} + \\ln(x)$

**Schritt 1:** Finde **alle** Einschränkungen:
- Wurzel: $x + 3 \\geq 0$ → $x \\geq -3$
- Logarithmus: $x > 0$

**Schritt 2:** Schnittmenge bilden — **beide** Bedingungen müssen gelten:
$$x \\geq -3 \\quad \\text{UND} \\quad x > 0 \\quad \\Rightarrow \\quad x > 0$$

**Schritt 3:** Definitionsbereich:
$$D = (0, \\infty)$$

> **Merke:** Bei mehreren Einschränkungen gilt immer die **strengste** Bedingung — bilde den Schnitt!

> 🔗 **Weiter:** Du kennst jetzt Funktionen und ihre Definitionsbereiche. Im nächsten Kapitel untersuchst du die **Eigenschaften** — Monotonie, Symmetrie und Umkehrfunktionen!

[INTERACTIVE]`,
      },
      {
        id: "mf2",
        title: "Funktionseigenschaften",
        duration: "18 min",
        interactive: "functionExplorer" as const,
        type: "interactive",
        content: `# Funktionseigenschaften

> Jetzt, wo du Funktionen und ihre Definitionsbereiche kennst, schauen wir uns an, **wie** sich Funktionen verhalten — steigend oder fallend, stetig oder sprungartig, symmetrisch oder nicht?

## Monotonie

Eine Funktion $f$ ist:
- **Monoton steigend**: $x_1 < x_2 \\Rightarrow f(x_1) \\leq f(x_2)$
- **Streng monoton steigend**: $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$
- **Monoton fallend**: $x_1 < x_2 \\Rightarrow f(x_1) \\geq f(x_2)$

## Stetigkeit

$f$ ist stetig in $a$, wenn:
$\\lim_{x \\to a} f(x) = f(a)$

## Symmetrie

- **Gerade Funktion**: $f(-x) = f(x)$ (achsensymmetrisch)
- **Ungerade Funktion**: $f(-x) = -f(x)$ (punktsymmetrisch)

## Umkehrfunktion

$f$ ist umkehrbar, wenn $f$ bijektiv ist.
Die Umkehrfunktion $f^{-1}$ gilt: $f^{-1}(f(x)) = x$

> 🔗 **Weiter zur Analysis:** Du kennst jetzt die Grundlagen der Funktionen! Damit bist du bereit für die **Analysis** — startend mit Grenzwerten: Was passiert, wenn sich x einem bestimmten Wert nähert? Und danach: Ableitungen und Integration!

---

## Häufige Fehler

> **Achtung:** Diese Verwechslungen kommen in jeder Klausur vor!

**1. Gerade vs. Ungerade — nicht verwechseln!**
- $f(-x) = f(x)$ → **gerade** Funktion (achsensymmetrisch zur y-Achse)
- $f(-x) = -f(x)$ → **ungerade** Funktion (punktsymmetrisch zum Ursprung)
- Beispiel: $f(x) = x^2$ ist **gerade**, $f(x) = x^3$ ist **ungerade**

**2. Monotonie: $\\leq$ vs. $<$**
- $x_1 < x_2 \\Rightarrow f(x_1) \\leq f(x_2)$ → **monoton steigend** (auch: "nicht fallend")
- $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ → **streng monoton steigend**
- Das Wort "streng" macht den Unterschied — in der Klausur genau lesen!

**3. Umkehrfunktion existiert nur bei bijektiven Funktionen!**
- $f(x) = x^2$ ist **nicht** bijektiv auf $\\mathbb{R}$ (z.B. $f(2) = f(-2) = 4$) → keine Umkehrfunktion auf $\\mathbb{R}$!
- Erst den Definitionsbereich einschränken (z.B. $x \\geq 0$), dann wird sie bijektiv.

---

## Beispiel: Umkehrfunktion bestimmen

Gegeben: $f(x) = 2x + 3$

**Schritt 1:** Setze $y = f(x)$:
$$y = 2x + 3$$

**Schritt 2:** Löse nach $x$ auf:
$$y - 3 = 2x \\quad \\Rightarrow \\quad x = \\frac{y - 3}{2}$$

**Schritt 3:** Tausche $x$ und $y$ (bzw. ersetze $y$ durch $f^{-1}(x)$):
$$f^{-1}(x) = \\frac{x - 3}{2}$$

**Probe:** $f^{-1}(f(x)) = f^{-1}(2x+3) = \\frac{(2x+3)-3}{2} = \\frac{2x}{2} = x$ ✓

> **Merke:** Umkehrfunktion = "y auflösen und tauschen". Grafisch ist es die Spiegelung an der Geraden $y = x$.

[INTERACTIVE]`,
      },
            {
              id: "m-grundlagen-funktionen-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Funktionswerte durch Einsetzen berechnen und einfache Eigenschaften wie Definitionsbereich erkennen.`,
            },
            {
              id: "m-grundlagen-funktionen-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Umkehrfunktionen bilden, Symmetrie-Eigenschaften prufen und Funktionen anhand ihres Graphen analysieren.`,
            },
            {
              id: "m-grundlagen-funktionen-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Funktionen mit Parametern untersuchen, abschnittsweise definierte Funktionen verstehen und komplexe Kombinationen.`,
            },
            {
              id: "m-grundlagen-funktionen-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Funktionen & Graphen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m1-grenzwerte",
    slug: "mathe1-grenzwerte",
    title: "Grenzwerte",
    merkblatt: `## 📋 Merkblatt: Grenzwerte\n\n### 🎯 Wichtige Grenzwerte\n\n| Grenzwert | Wert |\n|-----------|------|\n| $\\lim_{x \\to 0} \\frac{\\sin x}{x}$ | $1$ |\n| $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x}$ | $0$ |\n| $\\lim_{x \\to \\infty} (1 + \\frac{1}{x})^x$ | $e$ |\n| $\\lim_{x \\to 0} \\frac{e^x - 1}{x}$ | $1$ |\n| $\\lim_{x \\to 0} \\frac{\\ln(1+x)}{x}$ | $1$ |\n\n### 📐 L'Hôpital'sche Regel\n\nBei $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$:\n\n$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$\n\n### 💡 Merke\n- Immer **L'Hôpital** versuchen bei $\\frac{0}{0}$\n- Grenzwerte können $\\pm\\infty$ sein\n- **Squeeze Theorem:** $f(x) \\leq g(x) \\leq h(x)$ und $\\lim f = \\lim h \\Rightarrow \\lim g = \\lim f`,
    description: "Grenzwerte und stetige Fortsetzung",
    icon: "🎯",
    color: "#10b981",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1g1",
        title: "Grenzwerte von Funktionen",
        duration: "20 min",
        interactive: "functionExplorer" as const,
        type: "interactive",
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x === 0 ? 1 : Math.sin(x) / x, xRange: [-6, 6], yRange: [-0.5, 1.5], label: "sin(x)/x", points: [{ x: 0, y: 1, label: "lim = 1" }] } },
        ],
        content: `# Grenzwerte von Funktionen

> Du kennst bereits Funktionen und ihre Eigenschaften. Jetzt fragen wir: Was passiert, wenn sich x immer weiter einem bestimmten Wert nähert? Diese Frage ist der Einstieg in die gesamte **Analysis**!

> 🎬 **Essence of Calculus — Limits** — https://www.youtube.com/watch?v=YNstP04ndTA — visuelle Erklärung, was ein Grenzwert wirklich bedeutet.

> 🏠 **Fürs Erweitert:** Grenzwerte sind das Fundament von MA2 (Analysis 1). Ohne Grenzwerte keine Ableitungen, keine Integrale!

## Definition

$\\lim_{x \\to a} f(x) = L$ bedeutet:
Für jedes $\\varepsilon > 0$ gibt es ein $\\delta > 0$, sodass für alle $x$ mit $0 < |x - a| < \\delta$ gilt: $|f(x) - L| < \\varepsilon$

## Rechenregeln

Seien $\\lim_{x \\to a} f(x) = L$ und $\\lim_{x \\to a} g(x) = M$, dann:

| Regel | Formel |
|-------|--------|
| Summe | $\\lim_{x \\to a} [f(x) + g(x)] = L + M$ |
| Produkt | $\\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M$ |
| Quotient | $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M}$ (wenn $M \\neq 0$) |
| Potenz | $\\lim_{x \\to a} [f(x)]^n = L^n$ |

## Wichtige Grenzwerte

- $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$
- $\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$
- $\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$

> 🔗 **Weiter:** Im nächsten Kapitel lernst du **L'Hôpitals Regel** kennen — ein mächtiges Werkzeug, um unbestimmte Ausdrücke wie $\\frac{0}{0}$ zu lösen. Und danach folgt die Ableitung, die auf dem Grenzwertbegriff aufbaut!

---

## Häufige Fehler

- **L'Hôpital nur bei unbestimmten Ausdrücken:** $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$ gilt NUR bei $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$! Bei $\\frac{2}{3}$ direkt einsetzen!
- **Produktregel für Grenzwerte:** $\\lim(f \\cdot g) = \\lim(f) \\cdot \\lim(g)$ gilt nur, wenn **beide** Grenzwerte existieren und endlich sind.
- **Einseitige Grenzwerte:** $\\lim_{x \\to 0} \\frac{1}{x}$ existiert NICHT! Links: $\\to -\\infty$, rechts: $\\to +\\infty$. Immer beide Seiten prüfen!

[INTERACTIVE]`,
      },
      {
        id: "m1g2",
        title: "L'Hôpital's Regel",
        duration: "15 min",
        type: "text",
        content: `# L'Hôpital's Regel

> Du hast bereits gelernt, Grenzwerte mit Rechenregeln zu bestimmen. Aber was, wenn du einen unbestimmten Ausdruck wie $\\frac{0}{0}$ erhältst? Dafür gibt es **L'Hôpitals Regel** — und sie nutzt bereits die **Ableitung**, die im nächsten Kapitel kommt!

> 🎬 **Essence of Calculus — L'Hôpital's Rule** — https://www.youtube.com/watch?v=kfF4zMiDyHQ — warum diese Regel funktioniert und wann man sie anwendet.

## Anwendung

Bei $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$:

$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$

## Voraussetzungen

1. $\\lim_{x \\to a} f(x) = 0$ und $\\lim_{x \\to a} g(x) = 0$ (oder beide $\\to \\infty$)
2. $f$ und $g$ sind differenzierbar in einer Umgebung von $a$
3. $g'(x) \\neq 0$ in der Umgebung (außer evtl. bei $a$)

## Beispiel

$\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1$

## Weitere Beispiele

### Beispiel 2: Wiederholte Anwendung
$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2}$

Erste Anwendung: $\\frac{0}{0}$ → $\\lim_{x \\to 0} \\frac{\\sin x}{2x}$

Zweite Anwendung: $\\frac{0}{0}$ → $\\lim_{x \\to 0} \\frac{\\cos x}{2} = \\frac{1}{2}$

### Beispiel 3: $\\frac{\\infty}{\\infty}$
$\\lim_{x \\to \\infty} \\frac{x^2}{e^x} = \\lim_{x \\to \\infty} \\frac{2x}{e^x} = \\lim_{x \\to \\infty} \\frac{2}{e^x} = 0$

## Wann L'Hôpital NICHT anwenden

- Wenn kein unbestimmter Ausdruck vorliegt (z.B. $\\frac{2}{3}$)
- Bei $0 \\cdot \\infty$: erst umformen zu $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$
- Bei $\\infty - \\infty$: erst zusammenfassen

> **Merke:** L'Hôpital funktioniert NUR bei $\\frac{0}{0}$ und $\\frac{\\infty}{\\infty}$!

[GUIDED_START]
**Schritt-für-Schritt:** Berechne $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1}$

**Schritt 1:** Prüfe den Typ: $\\frac{1-1}{1-1} = \\frac{0}{0}$ → L'Hôpital anwendbar!

**Schritt 2:** Leite Zähler und Nenner einzeln ab:
- Zähler: $(x^3 - 1)' = 3x^2$
- Nenner: $(x - 1)' = 1$

**Schritt 3:** Setze ein: $\\lim_{x \\to 1} \\frac{3x^2}{1} = 3$

**Ergebnis:** $\\lim_{x \\to 1} \\frac{x^3 - 1}{x - 1} = 3$
[GUIDED_END]

> 🔗 **Weiter:** Du hast L'Hôpital mit Ableitungen angewendet — jetzt lernst du die **Ableitung** offiziell kennen! Die Ableitung ist nichts anderes als ein spezieller Grenzwert: den Differenzenquotienten.`,
      },
            {
              id: "m1-grenzwerte-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Grenzwerte durch direktes Einsetzen bestimmen. Polynome und einfache rationale Funktionen.`,
            },
            {
              id: "m1-grenzwerte-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `L'Hospital anwenden, unbestimmte Ausdrucke erkennen und Grenzwerte im Unendlichen mit der Koeffizientenmethode.`,
            },
            {
              id: "m1-grenzwerte-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Grenzwerte mit trigonometrischen und exponentiellen Funktionen. Konvergenz von Folgen und Reihen prufen.`,
            },
            {
              id: "m1-grenzwerte-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Grenzwerte — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m1-ableitungen",
    slug: "mathe1-ableitungen",
    title: "Differentialrechnung",
    merkblatt: `## 📋 Merkblatt: Differentialrechnung\n\n### 🎯 Grundableitungen\n\n| $f(x)$ | $f'(x)$ |\n|--------|----------|\n| $x^n$ | $n \\cdot x^{n-1}$ |\n| $e^x$ | $e^x$ |\n| $a^x$ | $a^x \\cdot \\ln(a)$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $\\ln x$ | $\\frac{1}{x}$ |\n\n### 📐 Ableitungsregeln\n\n| Regel | Formel |\n|-------|--------|\n| **Kettenregel** | $(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)$ |\n| **Produktregel** | $(f \\cdot g)' = f' \\cdot g + f \\cdot g'$ |\n| **Quotient** | $(\\frac{f}{g})' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$ |\n\n### 💡 Anwendungen\n- **Tangentengleichung:** $y = f(a) + f'(a)(x - a)$\n- **Extremstellen:** $f'(x_0) = 0$\n- **Hinreichend:** $f''(x_0) > 0$ Min, $f''(x_0) < 0$ Max`,
    description: "Ableitungen, Regeln und Anwendungen",
    icon: "📐",
    color: "#8b5cf6",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1a1",
        title: "Definition der Ableitung",
        duration: "15 min",
        type: "interactive",
        interactive: "tangentExplorer" as const,
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x, xRange: [-3, 4], yRange: [-1, 10], label: "f(x) = x²", tangent: { x: 2, slope: 4, label: "f'(2) = 4" }, points: [{ x: 2, y: 4, label: "(2, 4)" }] } },
        ],
        content: `# Definition der Ableitung

> Du hast Grenzwerte kennengelernt und weißt, wie man mit L'Hôpital arbeitet. Jetzt wenden wir den Grenzwertbegriff auf eine der wichtigsten Fragen der Mathematik an: Wie schnell ändert sich eine Funktion? Die Antwort ist die **Ableitung**!

> 🎬 **Essence of Calculus — Derivatives** — https://www.youtube.com/watch?v=WUvTyaaNkzM — DIE beste visuelle Erklärung der Ableitung. Pflichtvideo!

> 🏠 **Fürs Erweitert:** Ableitungen sind das Kernthema von MA2. Wer sie versteht, kann Extremwertaufgaben, Kurvendiskussion und vieles mehr.

## Differenzenquotient

$\\frac{f(x+h) - f(x)}{h}$

## Ableitung (Differentialquotient)

$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$

## Notation

- $f'(x)$ (Lagrange)
- $\\frac{df}{dx}$ oder $\\frac{d}{dx}f(x)$ (Leibniz)
- $Df(x)$ (Operator)
- $\\dot{x}$ (Newton, für Zeit)

## Geometrische Bedeutung

Die Ableitung $f'(a)$ gibt die **Steigung der Tangente** an der Stelle $a$.

---

## Beispiel: Ableitung aus der Definition

**Aufgabe:** Leite $f(x) = x^2$ aus der Definition ab.

**Schritt 1:** Definition einsetzen:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h}$$

**Schritt 2:** Ausmultiplizieren:
$$= \\lim_{h \\to 0} \\frac{x^2 + 2xh + h^2 - x^2}{h}$$

**Schritt 3:** Vereinfachen:
$$= \\lim_{h \\to 0} \\frac{2xh + h^2}{h}$$

**Schritt 4:** Durch $h$ kürzen ($h \\neq 0$):
$$= \\lim_{h \\to 0} (2x + h)$$

**Schritt 5:** Grenzwert einsetzen ($h \\to 0$):
$$= 2x$$

> **Ergebnis:** $f'(x) = 2x$ — genau das, was die Potenzregel ($n \\cdot x^{n-1} = 2 \\cdot x^1$) auch liefert!

> 🔗 **Weiter:** Jetzt kennst du die Definition — im nächsten Kapitel lernst du die **Ableitungsregeln** (Potenz-, Ketten-, Produktregel), damit du nicht immer den Grenzwert berechnen musst!

[INTERACTIVE]`,
      },
      {
        id: "m1a2",
        title: "Ableitungsregeln",
        duration: "20 min",
        interactive: "functionExplorer" as const,
        type: "interactive",
        content: `# Ableitungsregeln

> Du weißt, dass die Ableitung den Grenzwert des Differenzenquotienten darstellt. Jetzt lernst du praktische **Regeln** kennen, mit denen du Funktionen schnell ableiten kannst — ohne jedes Mal den Grenzwert zu berechnen!

> 🎬 **Essence of Calculus — Power Rule & Chain Rule** — https://www.youtube.com/watch?v=S0_qX4VJhMQ — warum die Potenzregel funktioniert und die Kettenregel visuell erklärt.

## Grundregeln

| Funktion | Ableitung |
|----------|-----------|
| $c$ (Konstante) | $0$ |
| $x^n$ | $n \\cdot x^{n-1}$ |
| $e^x$ | $e^x$ |
| $\\ln x$ | $\\frac{1}{x}$ |
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |

## Kettenregel

$(f(g(x)))' = f'(g(x)) \\cdot g'(x)$

## Produktregel

$(f \\cdot g)' = f' \\cdot g + f \\cdot g'$

## Quotientenregel

$\\left(\\frac{f}{g}\\right)' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$

[PRACTICE_START]
**Aufgabe:** Berechne die Ableitung von $f(x) = x^3 \cdot \sin(x)$.

**Lösung (Produktregel):**
$f'(x) = 3x^2 \cdot \sin(x) + x^3 \cdot \cos(x)$
[PRACTICE_END]

> 🔗 **Anwendungen & Weiter:** Mit Ableitungsregeln kannst du jetzt Funktionen effizient ableiten! Damit stehen dir **Extremstellen** (Min/Max), **Tangenten** und die **Kurvendiskussion** offen. Als Nächstes kommt die **Integralrechnung** — die Umkehrung der Ableitung!

---

## Kettenregel — Beispiel

Schritt-für-Schritt: $f(x) = \\sin(3x)$

**Schritt 1:** Außen- und Innenfunktion erkennen:
- Außen: $\\sin(u)$ → Ableitung: $\\cos(u)$
- Innen: $u = 3x$ → Ableitung: $3$

**Schritt 2:** Kettenregel anwenden:
$$f'(x) = \\cos(3x) \\cdot 3$$

---

## Häufige Fehler

- **Kettenregel vergessen:** $(\\sin(x^2))' = \\cos(x^2) \\cdot 2x$, NICHT nur $\\cos(x^2)$! Die innere Ableitung darf nie fehlen.
- **Produktregel verwechseln:** $(f \\cdot g)' = f' \\cdot g + f \\cdot g'$, NICHT $f' \\cdot g'$! Es ist eine Summe, kein Produkt.
- **Quotientenregel Vorzeichen:** $\\left(\\frac{f}{g}\\right)' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$ — das Minus im Zähler nicht vergessen!

[INTERACTIVE]`,
      },
            {
              id: "m1-ableitungen-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Polynome mit der Potenzregel ableiten. Grundableitungen von $\sin x$, $\cos x$ und $e^x$ kennen.`,
            },
            {
              id: "m1-ableitungen-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Produkt-, Quotienten- und Kettenregel sicher kombinieren. Ableitungen in Sachkontexten interpretieren.`,
            },
            {
              id: "m1-ableitungen-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Hohere Ableitungen, implizites Differenzieren und die Ableitung von Umkehrfunktionen. Fur echte Analysis-Fans.`,
            },
            {
              id: "m1-ableitungen-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Differentialrechnung — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m1-integration",
    slug: "mathe1-integration",
    title: "Integralrechnung",
    merkblatt: `## 📋 Merkblatt: Integralrechnung\n\n### 🎯 Stammfunktionen\n\n| $f(x)$ | $\\int f(x) \\,dx$ |\n|--------|------------------|\n| $x^n$ | $\\frac{x^{n+1}}{n+1}$ |\n| $\\frac{1}{x}$ | $\\ln|x|$ |\n| $e^x$ | $e^x$ |\n| $\\sin x$ | $-\\cos x$ |\n| $\\cos x$ | $\\sin x$ |\n| $\\frac{1}{x^2+1}$ | $\\arctan x$ |\n\n### 📐 Hauptsatz der Differential- und Integralrechnung\n\n$$\\int_a^b f(x) \\,dx = F(b) - F(a)$$\n\n### 💡 Techniken\n- **Substitution:** $u = g(x) \\Rightarrow du = g'(x)dx$\n- **Partielle Integration:** $\\int u \\,dv = uv - \\int v \\,du$\n- **Partialbruch:** Für rationale Funktionen`,
    description: "Stammfunktionen und bestimmte Integrale",
    icon: "∫",
    color: "#f59e0b",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1i1",
        title: "Stammfunktionen",
        duration: "18 min",
        type: "interactive",
        interactive: "integralExplorer" as const,
        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x, xRange: [-1, 3], yRange: [-1, 10], label: "f(x) = x²", fillArea: { from: 0, to: 2, color: "rgba(129,140,248,0.3)", label: "∫₀² x² dx" } } },
        ],
        content: `# Stammfunktionen

> Du hast gelernt, Funktionen abzuleiten. Aber was, wenn du die Ableitung gegeben hast und die ursprüngliche Funktion suchst? Das ist die **Integration** — die Umkehrung der Differentiation!

> 🎬 **Essence of Calculus — Integration** — https://www.youtube.com/watch?v=rfG8ce4nNh0 — was Integration wirklich bedeutet (Fläche unter der Kurve!).

> 🏠 **Fürs Erweitert:** Integration ist das zweite große Thema von MA2 zusammen mit Differentiation. Zusammen bilden sie den "Fundamentalsatz der Analysis".

## Definition

$F$ ist Stammfunktion von $f$, wenn $F'(x) = f(x)$.

## Unbestimmtes Integral

$\\int f(x) \\, dx = F(x) + C$

## Wichtige Stammfunktionen

| Funktion | Stammfunktion |
|----------|---------------|
| $x^n$ | $\\frac{x^{n+1}}{n+1} + C$ ($n \\neq -1$) |
| $\\frac{1}{x}$ | $\\ln|x| + C$ |
| $e^x$ | $e^x + C$ |
| $\\sin x$ | $-\\cos x + C$ |
| $\\cos x$ | $\\sin x + C$ |

## Substitutionsregel

$\\int f(g(x)) \\cdot g'(x) \\, dx = \\int f(u) \\, du$ mit $u = g(x)$

> 🔗 **Weiter:** Stammfunktionen sind die "Rückwärts-Ableitung". Im nächsten Kapitel lernst du das **bestimmte Integral** kennen — damit kannst du Flächen unter Kurven berechnen! Das verbindet Ableitung und Integration über den **Hauptsatz der Analysis**.

---

## Beispiel: Integration

**Beispiel 1:** $\\int 3x^2 \\, dx = 3 \\cdot \\frac{x^3}{3} + C = x^3 + C$

**Beispiel 2:** $\\int e^{2x} \\, dx = \\frac{1}{2} e^{2x} + C$ (Substitution $u = 2x$, $du = 2\\,dx$)

**Beispiel 3:** $\\int \\frac{1}{x} \\, dx = \\ln|x| + C$

---

## Häufige Fehler

> **Achtung:** Diese Fehler kosten in Klausuren regelmäßig Punkte!

**1.** $+C$ **nicht vergessen** bei unbestimmten Integralen!
- Ohne $+C$ ist die Lösung **falsch** — es gibt unendlich viele Stammfunktionen, die sich nur um eine Konstante unterscheiden.

**2.** $\\int \\frac{1}{x} \\, dx = \\ln|x|$, **NICHT** $\\ln(x)$!
- Der Betrag ist wichtig, weil $\\frac{1}{x}$ auch für negative $x$ definiert ist.
- $\\ln(x)$ existiert nur für $x > 0$, $\\ln|x|$ für $x \\neq 0$.

**3.** $\\int x^n \\, dx = \\frac{x^{n+1}}{n+1}$ gilt **NICHT** für $n = -1$!
- Für $n = -1$ gilt Sonderregel: $\\int x^{-1} \\, dx = \\int \\frac{1}{x} \\, dx = \\ln|x| + C$
- Denn $\\frac{x^0}{0}$ wäre Division durch Null!

[INTERACTIVE]`,
      },
      {
        id: "m1i2",
        title: "Bestimmtes Integral",
        duration: "20 min",
        type: "text",
        content: `# Bestimmtes Integral

> Du kennst bereits Stammfunktionen — die Umkehrung der Ableitung. Jetzt verbinden wir Differentiation und Integration über den **Hauptsatz der Analysis** und berechnen konkrete Flächen unter Kurven!

> 🎬 **Essence of Calculus — Area & Slope** — https://www.youtube.com/watch?v=FnJqaIESC2s — wie Differentiation und Integration zusammenhängen.

## Hauptsatz der Analysis

$\\int_a^b f(x) \\, dx = F(b) - F(a)$

## Geometrische Bedeutung

Das bestimmte Integral gibt die **Fläche** unter der Kurve (mit Vorzeichen).

## Eigenschaften

- $\\int_a^b f(x) \\, dx = -\\int_b^a f(x) \\, dx$
- $\\int_a^b [f(x) + g(x)] \\, dx = \\int_a^b f(x) \\, dx + \\int_a^b g(x) \\, dx$
- $\\int_a^b c \\cdot f(x) \\, dx = c \\cdot \\int_a^b f(x) \\, dx$

## Teilungsregel

$\\int u \\, dv = uv - \\int v \\, du$

[PRACTICE_START]
**Aufgabe:** Berechne $\int_0^2 (3x^2 + 1) \, dx$.

**Lösung:**
$F(x) = x^3 + x$
$F(2) - F(0) = (8 + 2) - 0 = 10$
[PRACTICE_END]

> 🔗 **Zusammenfassung Analysis:** Damit hast du die drei großen Säulen der Analysis kennengelernt: **Grenzwerte** als Fundament, **Ableitungen** für Änderungsraten und **Integration** für Flächenberechnung. Diese Konzepte stehen in engem Zusammenhang — Ableitung und Integration sind inverse Operationen!

> 🔗 **Verwandt:** Die Integralrechnung wird auch in der **Stochastik** (Wahrscheinlichkeitsdichten) und bei **Differentialgleichungen** benötigt.`,
      },
            {
              id: "m1-integration-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Stammfunktionen mit der umgekehrten Potenzregel finden. Bestimmte Integrale mit dem Hauptsatz berechnen.`,
            },
            {
              id: "m1-integration-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Substitutionsregel und partielle Integration anwenden. Flachen zwischen Kurven und Rotationsvolumen.`,
            },
            {
              id: "m1-integration-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Uneigentliche Integrale, Integration gebrochen-rationaler Funktionen und Anwendungen in der Physik.`,
            },
            {
              id: "m1-integration-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Integralrechnung — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m1-reihen",
    slug: "mathe1-reihen",
    title: "Reihen & Potenzreihen",
    merkblatt: `## 📋 Merkblatt: Reihen & Potenzreihen\n\n### 🎯 Konvergenzkriterien\n\n| Kriterium | Bedingung |\n|-----------|-----------|\n| **Quotienten** | $q = \\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| < 1$ |\n| **Wurzel** | $\\sqrt[n]{|a_n|} < 1$ |\n| **Vergleich** | $0 \\leq a_n \\leq b_n$ und $\\sum b_n$ konv. |\n\n### 📐 Wichtige Reihen\n\n| Reihe | Summe |\n|-------|-------|\n| $\\sum_{n=0}^{\\infty} x^n = \\frac{1}{1-x}$ | $|x| < 1$ |\n| $e^x = \\sum \\frac{x^n}{n!}$ | $\\forall x$ |\n| $\\sin x = \\sum \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$ | $\\forall x$ |\n| $\\cos x = \\sum \\frac{(-1)^n x^{2n}}{(2n)!}$ | $\\forall x$ |\n\n### 💡 Taylor-Entwicklung\n$$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$$`,
    description: "Unendliche Reihen und Konvergenz",
    icon: "∞",
    color: "#ec4899",
    category: "analysis",
    progress: 0,
    lessons: [
      {
        id: "m1r1",
        title: "Reihen & Konvergenz",
        duration: "18 min",
        interactive: "seriesVisualizer" as const,
        type: "interactive",
        content: `# Reihen & Konvergenz

> Du kennst bereits die **Integralrechnung** — Flächen unter Kurven berechnen. Jetzt geht es um eine neue Frage: Was passiert, wenn man **unendlich viele Zahlen** addiert? Konvergiert das Ergebnis gegen einen endlichen Wert? Die Analysis unendlicher Reihen ist das Fundament für Potenzreihen und Taylor-Entwicklungen!

> 🎥 **3Blue1Brown:** Für eine visuelle Einführung in unendliche Reihen und Konvergenz empfehlen wir: [Taylor Series](https://www.youtube.com/watch?v=3d6DsjIBzJ4)

## Definition

Eine Reihe ist die Summe einer Folge:
$\\sum_{n=1}^{\\infty} a_n = a_1 + a_2 + a_3 + \\ldots$

## Konvergenzkriterien

### Vorzeichenkriterium (Leibniz)
Bei alternierenden Reihen: $a_n \\cdot a_{n+1} < 0$ und $|a_{n+1}| \\leq |a_n|$ und $\\lim_{n \\to \\infty} a_n = 0$

### Vergleichskriterium
Wenn $0 \\leq a_n \\leq b_n$ und $\\sum b_n$ konvergiert, dann konvergiert auch $\\sum a_n$.

### Quotientenkriterium
$\\lim_{n \\to \\infty} \\left|\\frac{a_{n+1}}{a_n}\\right| = q$
- $q < 1$: konvergent
- $q > 1$: divergent
- $q = 1$: kein Ergebnis

[PRACTICE_START]
**Aufgabe:** Konvergiert $\sum_{n=1}^{\infty} \frac{1}{n^2}$? Begründe mit dem p-Test.

**Lösung:** Ja, denn $p = 2 > 1$. Nach dem p-Test konvergiert $\sum \frac{1}{n^p}$ genau dann, wenn $p > 1$.
[PRACTICE_END]

> 🔗 **Weiter:** Jetzt weißt du, ob eine Reihe konvergiert. Im nächsten Kapitel lernst du **Potenzreihen** kennen — Reihen mit Variablen, die Funktionen wie $e^x$ und $\sin x$ darstellen. Das ist der Übergang zur Taylor-Entwicklung!

[INTERACTIVE]`,
      },
      {
        id: "m1r2",
        title: "Potenzreihen",
        duration: "15 min",
        type: "text",
        content: `# Potenzreihen

> Du kennst bereits unendliche Reihen und Konvergenzkriterien. Jetzt wird die Reihe zur **Funktion**: Potenzreihen sind Reihen mit Variablen, die Funktionen wie $e^x$, $\sin x$ und $\cos x$ darstellen. Der Konvergenzradius bestimmt, wo die Reihe gültig ist!

> 🎥 **3Blue1Brown:** Die Taylor-Reihe ist eines der schönsten Konzepte der Analysis — hier erklärt: [Taylor Series](https://www.youtube.com/watch?v=3d6DsjIBzJ4)

> 🎓 **Fürs Erweitert:** In der höheren Analysis und Funktionalanalysis sind Potenzreihen der Einstieg in die Theorie der analytischen Funktionen. Der Konvergenzradius hängt mit der Entfernung zur nächsten Singularität in der komplexen Ebene zusammen!

## Definition

$\\sum_{n=0}^{\\infty} a_n (x - a)^n = a_0 + a_1(x-a) + a_2(x-a)^2 + \\ldots$

## Konvergenzradius

$R = \\lim_{n \\to \\infty} \\left|\\frac{a_n}{a_{n+1}}\\right|$

## Wichtige Reihen

### Taylor-Reihen
$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!} (x-a)^n$

### Maclaurin-Reihen (a=0)
- $e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$
- $\\sin x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$
- $\\cos x = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n}}{(2n)!}$



---

## Schritt-fuer-Schritt Beispiele

### Beispiel 1: Konvergenzradius bestimmen

$\sum_{n=0}^{\infty} \frac{x^n}{n+1}$

Schritt 1: $a_n = \frac{1}{n+1}$

Schritt 2: $R = \lim_{n\to\infty} \left|\frac{a_n}{a_{n+1}}\right| = \lim_{n\to\infty} \frac{n+2}{n+1} = 1$

Schritt 3: Konvergenzradius $R = 1$. Die Reihe konvergiert fuer $|x| < 1$.

### Beispiel 2: Reihe in eine bekannte Funktion umformen

$\sum_{n=0}^{\infty} \frac{x^n}{n!}$

Erkenne: Das ist die Taylor-Reihe von $e^x$!

Also: $\sum_{n=0}^{\infty} \frac{x^n}{n!} = e^x$ fuer alle $x \in \mathbb{R}$ ($R = \infty$).

> **Merke:** Potenzreihen kann man gliedweise ableiten und integrieren -- der Konvergenzradius bleibt gleich!

[GUIDED_START]
**Schritt-fuer-Schritt:** Entwickle $\frac{1}{1+x}$ als Potenzreihe um $a=0$

**Schritt 1:** Erkenne: $\frac{1}{1+x} = \frac{1}{1-(-x)}$

**Schritt 2:** Geometrische Reihe: $\frac{1}{1-r} = \sum r^n$ mit $r = -x$

**Schritt 3:** Einsetzen: $\frac{1}{1+x} = \sum_{n=0}^{\infty} (-1)^n x^n$

**Schritt 4:** Konvergenz: $|-x| < 1$ -> $|x| < 1$ -> $R = 1$
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Bestimme den Konvergenzradius von $\sum_{n=0}^{\infty} \frac{x^n}{2^n}$

**Lösung:** $a_n = \frac{1}{2^n}$, also $R = \lim_{n\to\infty} \frac{a_n}{a_{n+1}} = \lim \frac{2^{n+1}}{2^n} = 2$

**Aufgabe 2:** Entwickle $\cos(x)$ bis zum 4. Grad um $a=0$

**Lösung:** $\cos(x) \approx 1 - \frac{x^2}{2} + \frac{x^4}{24}$ (nur gerade Potenzen!)
[PRACTICE_END]

> 🔗 **Zusammenfassung Analysis:** Damit hast du die großen Themen der Analysis abgeschlossen: Grenzwerte, Ableitungen, Integration und Reihen. Diese Konzepte kehren in den **Differentialgleichungen** wieder — dort lösen wir Gleichungen, die Ableitungen enthalten!

> 🔗 **Verwandt:** Die Taylor-Reihe wird auch in der **Numerik** (Newton-Verfahren) und in der **Stochastik** (Momenterzeugende Funktionen) verwendet.`,
      },
            {
              id: "m1-reihen-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Arithmetische und geometrische Folgen erkennen und Summenformeln fur endliche Reihen anwenden.`,
            },
            {
              id: "m1-reihen-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Konvergenz von Reihen prufen (Quotienten-, Wurzelkriterium). Geometrische Reihe im Unendlichen.`,
            },
            {
              id: "m1-reihen-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Taylor-Reihen aufstellen, Konvergenzradien bestimmen und Fehlerabschatzungen fur Naherungspolynome.`,
            },
            {
              id: "m1-reihen-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Reihen & Potenzreihen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m2-vektoren",
    slug: "mathe2-vektoren",
    title: "Vektoren & Lineare Algebra",
    merkblatt: `## 📋 Merkblatt: Vektoren & Lineare Algebra\n\n### 🎯 Skalarprodukt\n\n$$\\vec{a} \\cdot \\vec{b} = a_1b_1 + a_2b_2 + a_3b_3 = |\\vec{a}||\\vec{b}|\\cos\\alpha$$\n\n| Eigenschaft | Bedingung |\n|-------------|-----------|\n| **Orthogonal** | $\\vec{a} \\cdot \\vec{b} = 0$ |\n| **Parallel** | $\\vec{a} = \\lambda \\vec{b}$ |\n| **Betrag** | $|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$ |\n\n### 📐 Kreuzprodukt\n\n$$\\vec{a} \\times \\vec{b} = \\begin{pmatrix} a_2b_3 - a_3b_2 \\\\ a_3b_1 - a_1b_3 \\\\ a_1b_2 - a_2b_1 \\end{pmatrix}$$\n\n- **Betrag:** $|\\vec{a} \\times \\vec{b}| = |\\vec{a}||\\vec{b}|\\sin\\alpha$\n- **Richtung:** Rechtwinklig zu $\\vec{a}$ und $\\vec{b}$\n\n### 💡 Ebene & Gerade\n- **Ebenengleichung:** $\\vec{n} \\cdot (\\vec{x} - \\vec{p}) = 0$\n- **Gerade:** $\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$`,
    description: "Vektoren, Matrizen und Lineare Gleichungssysteme",
    icon: "↔",
    color: "#06b6d4",
    category: "lineare-algebra",
    progress: 0,
    lessons: [
      {
        id: "m2v1",
        title: "Vektoren im Raum",
        duration: "18 min",
        type: "interactive",
        interactive: "vectorExplorer" as const,
        visuals: [
          { type: "coordinate2d" as const, props: { vectors: [{ x: 3, y: 2, label: "a⃗", color: "#818cf8" }, { x: 1, y: 4, label: "b⃗", color: "#f472b6" }] } },
          { type: "coordinate3d" as const, props: { vectors: [{ x: 2, y: 1, z: 3, label: "v⃗", color: "#f59e0b" }] } },
        ],
        content: `# Vektoren im Raum

> Willkommen in der **Linearen Algebra**! Vektoren sind die Grundbausteine — sie beschreiben Richtungen und Größen im Raum. Du kennst bereits lineare Gleichungssysteme (LGS). Jetzt lernst du die geometrische Seite kennen: Vektoren als Pfeile im Raum, ihre Addition, Skalarprodukt und Kreuzprodukt!

> 🎥 **3Blue1Brown:** Eine hervorragende visuelle Einführung in Vektoren und lineare Algebra: [Vectors](https://www.youtube.com/watch?v=fNk_zzaMoSs), [Linear Combinations](https://www.youtube.com/watch?v=k7RM-ot2NWY) und [Dot products](https://www.youtube.com/watch?v=LyGKycU2fgc)

## Definition

$\\vec{v} = \\begin{pmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{pmatrix} \\in \\mathbb{R}^3$

## Operationen

### Addition
$\\vec{u} + \\vec{v} = \\begin{pmatrix} u_1 + v_1 \\\\ u_2 + v_2 \\\\ u_3 + v_3 \\end{pmatrix}$

### Skalarmultiplikation
$\\lambda \\vec{v} = \\begin{pmatrix} \\lambda v_1 \\\\ \\lambda v_2 \\\\ \\lambda v_3 \\end{pmatrix}$

### Skalarprodukt
$\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\vec{u}| |\\vec{v}| \\cos \\alpha$

### Kreuzprodukt
$\\vec{u} \\times \\vec{v} = \\begin{pmatrix} u_2 v_3 - u_3 v_2 \\\\ u_3 v_1 - u_1 v_3 \\\\ u_1 v_2 - u_2 v_1 \\end{pmatrix}$

> 🔗 **Weiter:** Vektoren sind die Basis — jetzt kommen **Matrizen**, die Vektoren transformieren! Matrizen können Vektoren drehen, skalieren und verzerren. Das ist der Übergang zur linearen Abbildung.

---

## Rechenbeispiele

### Skalarprodukt berechnen

Gegeben: $\\vec{a} = (1, 2, 3)$, $\\vec{b} = (4, 5, 6)$

$$\\vec{a} \\cdot \\vec{b} = 1 \\cdot 4 + 2 \\cdot 5 + 3 \\cdot 6 = 4 + 10 + 18 = 32$$

### Betrag berechnen

$$|\\vec{a}| = \\sqrt{1^2 + 2^2 + 3^2} = \\sqrt{1 + 4 + 9} = \\sqrt{14} \\approx 3{,}74$$

### Winkel zwischen zwei Vektoren

$$\\cos(\\alpha) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|} = \\frac{32}{\\sqrt{14} \\cdot \\sqrt{77}} = \\frac{32}{\\sqrt{1078}} \\approx 0{,}975$$

$$\\alpha = \\arccos(0{,}975) \\approx 12{,}9°$$

---

## Häufige Fehler

> **Achtung:** Diese Fehler sind in der Klausur besonders tückisch!

**1. Skalarprodukt vs. Kreuzprodukt — grundverschieden!**
- Skalarprodukt $\\vec{a} \\cdot \\vec{b}$ ergibt eine **Zahl** (Skalar)
- Kreuzprodukt $\\vec{a} \\times \\vec{b}$ ergibt einen **Vektor**
- Verwechslung führt zu Typ-Fehlern!

**2. Betrag: Wurzel nicht vergessen!**
- $|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$ — die **Wurzel** ist entscheidend!
- Häufiger Fehler: $a_1^2 + a_2^2 + a_3^2$ ohne Wurzel ist $|\\vec{a}|^2$, nicht $|\\vec{a}|$

**3. Formel für den Winkel gilt nur so:**
- $\\vec{a} \\cdot \\vec{b} = |\\vec{a}| \\cdot |\\vec{b}| \\cdot \\cos(\\alpha)$ — Reihenfolge beachten!
- $\\cos(\\alpha)$ allein reicht nicht: Immer erst durch die Beträge dividieren.

[INTERACTIVE]`,
      },
      {
        id: "m2v2",
        title: "Matrizen",
        duration: "20 min",
        interactive: "matrixCalculator" as const,
        type: "interactive",
        content: `# Matrizen

> Du kennst bereits Vektoren und ihre Operationen. Jetzt lernst du **Matrizen** kennen — sie sind die Werkzeuge, um Vektoren zu transformieren! Eine Matrix kann Vektoren drehen, spiegeln, skalieren und verzerren. Die Matrixmultiplikation ist verkettete Transformation, die Determinante misst die Flächenänderung.

> 🎥 **3Blue1Brown:** Matrizen als lineare Transformationen — absolut sehenswert: [Matrix Multiplication](https://www.youtube.com/watch?v=XkY2DOUCWMU), [Determinants](https://www.youtube.com/watch?v=Ip3X9LOh2dk) und [Inverse matrices](https://www.youtube.com/watch?v=uQhTuRlWMxw)

## Definition

$A = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix} \\in \\mathbb{R}^{m \\times n}$

## Matrixmultiplikation

$(AB)_{ij} = \\sum_{k=1}^{n} a_{ik} b_{kj}$

## Wichtige Matrizen

- **Einheitsmatrix**: $I_n$ (Diagonale = 1)
- **Nullmatrix**: $0_{m \\times n}$ (Alle Einträge = 0)
- **Transponierte**: $(A^T)_{ij} = a_{ji}$

## Determinante (2×2)

$\\det(A) = a_{11} a_{22} - a_{12} a_{21}$

## Inverse Matrix

$A \\cdot A^{-1} = I$

> 🔗 **Weiter:** Matrizen und Vektoren zusammen bilden das Fundament der **linearen Algebra**. Diese Konzepte brauchst du für lineare Gleichungssysteme (LGS), Eigenwerte und in der **Numerik** (Gauß-Verfahren). In der Physik beschreiben Matrizen Drehungen und Verformungen!

---

## Beispiel: 2x2-Matrixmultiplikation

Gegeben:
$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix}$$

**Schritt 1:** Zeile von A mal Spalte von B — Element für Element:

$$C_{11} = 1 \\cdot 5 + 2 \\cdot 7 = 5 + 14 = 19$$
$$C_{12} = 1 \\cdot 6 + 2 \\cdot 8 = 6 + 16 = 22$$
$$C_{21} = 3 \\cdot 5 + 4 \\cdot 7 = 15 + 28 = 43$$
$$C_{22} = 3 \\cdot 6 + 4 \\cdot 8 = 18 + 32 = 50$$

**Schritt 2:** Ergebnis zusammenbauen:
$$C = A \\cdot B = \\begin{pmatrix} 19 & 22 \\\\ 43 & 50 \\end{pmatrix}$$

> **Merke:** Immer **Zeile von A** mal **Spalte von B** — nicht elementweise multiplizieren!

---

## Häufige Fehler

> **Achtung:** Matrixrechnung hat ihre eigenen Fallstricke!

**1. Matrixmultiplikation ist NICHT kommutativ!**
- $A \\cdot B \\neq B \\cdot A$ im Allgemeinen!
- Probe: $B \\cdot A = \\begin{pmatrix} 5 & 6 \\\\ 7 & 8 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} = \\begin{pmatrix} 23 & 34 \\\\ 31 & 46 \\end{pmatrix}$
- Das ist etwas anderes als $A \\cdot B$!

**2. $\\det(A) = 0$ bedeutet: Matrix ist singulär!**
- Wenn die Determinante 0 ist, existiert **keine Inverse** $A^{-1}$.
- Geometrisch: Die Abbildung "quetscht" den Raum flach (Volumen = 0).

**3. Reihenfolge bei der Multiplikation:**
- Immer **Zeile von A mal Spalte von B**, nicht elementweise!
- Die mittleren Dimensionen müssen übereinstimmen: $(m \\times \\underline{n}) \\cdot (\\underline{n} \\times p)$ → Ergebnis ist $(m \\times p)$.

[INTERACTIVE]`,
      },
            {
              id: "m2-vektoren-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Vektoren addieren, mit Skalaren multiplizieren und den Betrag berechnen. Das Vektor-ABC.`,
            },
            {
              id: "m2-vektoren-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Skalarprodukt verstehen und Winkel zwischen Vektoren berechnen. Orthogonalitat prufen und Vektoren zerlegen.`,
            },
            {
              id: "m2-vektoren-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Kreuzprodukt im $\mathbb{R}^3$, Flachen- und Volumenberechnung. Vektorielle Geometrie im Raum.`,
            },
            {
              id: "m2-vektoren-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Vektorrechnung — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m2-dgl",
    slug: "mathe2-dgl",
    title: "Differentialgleichungen",
    merkblatt: `## 📋 Merkblatt: Differentialgleichungen\n\n### 🎯 Homogene DGL 2. Ordnung\n\n$$ay'' + by' + cy = 0$$\n\n**Charakteristische Gleichung:** $ar^2 + br + c = 0$\n\n### 📐 Lösungen\n\n| Fall | Lösung |\n|------|--------|\n| **2 reelle** $r_1 \\neq r_2$ | $y = C_1e^{r_1x} + C_2e^{r_2x}$ |\n| **Doppelte** $r_1 = r_2 = r$ | $y = (C_1 + C_2x)e^{rx}$ |\n| **Komplexe** $r = \\alpha \\pm \\beta i$ | $y = e^{\\alpha x}(C_1\\cos\\beta x + C_2\\sin\\beta x)$ |\n\n### 💡 Nicht-homogen\n$$ay'' + by' + cy = f(x)$$\n\n**Lösung:** $y = y_h + y_p$ (homogen + partikulär)\n\n- **Bestimmung:** Partikuläre Lösung raten oder Variation der Konstanten`,
    description: "Gewöhnliche Differentialgleichungen 1. und 2. Ordnung",
    icon: "dy/dx",
    color: "#ef4444",
    category: "differentialgleichungen",
    progress: 0,
    lessons: [
      {
        id: "m2d1",
        title: "DGln 1. Ordnung",
        duration: "20 min",
        type: "text",
        content: `# Differentialgleichungen 1. Ordnung

> Du kennst bereits **Ableitungen** (Änderungsraten) und **Integration** (Umkehrung der Ableitung). Jetzt verbinden wir beides: **Differentialgleichungen** (DGLen) sind Gleichungen, die eine Funktion und ihre Ableitungen enthalten. Sie beschreiben überall in der Physik und Technik — von Wachstumsprozessen bis zu Schwingungen!

> 🔗 **Verwandt:** Differentialrechnung (Ableitungen), Integralrechnung (Stammfunktionen als Lösungsmethode)

## Typen

### Trennbare Variablen
$\\frac{dy}{dx} = f(x) \\cdot g(y)$
Lösung: $\\int \\frac{dy}{g(y)} = \\int f(x) \\, dx$

### Linear
$y' + p(x) \\cdot y = q(x)$
Lösung mit Integrationsfaktor: $\\mu(x) = e^{\\int p(x) \\, dx}$

## Lösungsansätze

1. **Trennung der Variablen**
2. **Integrationsfaktor**
3. **Substitution**
4. **Variation der Konstanten**

[GUIDED_START]
**Schritt-für-Schritt:** Löse $y' = 2xy$ mit $y(0) = 3$

**Schritt 1:** Typ erkennen — trennbare Variablen: $\\frac{dy}{dx} = 2xy$

**Schritt 2:** Trennen: $\\frac{dy}{y} = 2x \\, dx$

**Schritt 3:** Integrieren: $\\int \\frac{dy}{y} = \\int 2x \\, dx$
$\\ln|y| = x^2 + C$

**Schritt 4:** Auflösen nach y: $y = e^{x^2 + C} = A \\cdot e^{x^2}$

**Schritt 5:** Anfangsbedingung: $y(0) = 3 = A \\cdot e^0 = A$ → $A = 3$

**Lösung:** $y = 3e^{x^2}$
[GUIDED_END]

[GUIDED_START]
**Schritt-für-Schritt:** Löse $y' + 2y = 4$ (lineare DGL)

**Schritt 1:** Integrationsfaktor: $\\mu(x) = e^{\\int 2 \\, dx} = e^{2x}$

**Schritt 2:** Multipliziere: $e^{2x} y' + 2e^{2x} y = 4e^{2x}$
Linke Seite ist $(e^{2x} y)'$

**Schritt 3:** Integrieren: $e^{2x} y = \\int 4e^{2x} \\, dx = 2e^{2x} + C$

**Schritt 4:** Auflösen: $y = 2 + Ce^{-2x}$

**Probe:** $y' = -2Ce^{-2x}$, $y' + 2y = -2Ce^{-2x} + 4 + 2Ce^{-2x} = 4$ ✓
[GUIDED_END]

> 🔗 **Weiter:** DGLen 1. Ordnung sind der Einstieg. Im nächsten Kapitel kommen **DGLen 2. Ordnung** — dort treten Schwingungen und Resonanz auf, die in der Physik (Federpendel, RLC-Schaltung) und Technik überall vorkommen!`,
      },
      {
        id: "m2d2",
        title: "DGln 2. Ordnung",
        duration: "22 min",
        type: "text",
        content: `# Differentialgleichungen 2. Ordnung

> Du kennst bereits DGLen 1. Ordnung — Trennung der Variablen und Integrationsfaktor. Jetzt wird die Ordnung erhöht: **DGLen 2. Ordnung** enthalten die zweite Ableitung $y''$. Sie beschreiben Schwingungen, Schwingkreise und mechanische Systeme mit Trägheit. Die charakteristische Gleichung ist der Schlüssel zur Lösung!

> 🎓 **Fürs Erweitert:** In der Physik und Elektrotechnik sind DGLen 2. Ordnung allgegenwärtig — Feder-Dämpfer-Systeme, RLC-Schwingkreise, Wellengleichungen. Die drei Fälle (reelle, doppelte, komplexe Wurzeln) entsprechen Überkritischer, kritischer und Schwingungsdämpfung!

## Homogene lineare DGln

$ay'' + by' + cy = 0$

### Charakteristische Gleichung
$ar^2 + br + c = 0$

### Fälle:
1. **Zwei reelle Wurzeln** $r_1 \\neq r_2$: $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$
2. **Doppelte Wurzel** $r_1 = r_2 = r$: $y = (C_1 + C_2 x) e^{rx}$
3. **Komplexe Wurzeln** $r_{1,2} = \\alpha \\pm i\\beta$: $y = e^{\\alpha x}(C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x))$

## Inhomogene DGln

$ay'' + by' + cy = f(x)$

Lösung: $y = y_h + y_p$ (homogene + partikuläre Lösung)

### Beispiel 1: Zwei reelle Wurzeln

$y'' - 3y' + 2y = 0$

Charakteristisch: $r^2 - 3r + 2 = 0$ → $(r-1)(r-2) = 0$ → $r_1 = 1$, $r_2 = 2$

Lösung: $y = C_1 e^x + C_2 e^{2x}$

### Beispiel 2: Doppelte Wurzel

$y'' - 4y' + 4y = 0$

$r^2 - 4r + 4 = 0$ → $(r-2)^2 = 0$ → $r = 2$ (doppelt)

Lösung: $y = (C_1 + C_2 x) e^{2x}$

### Beispiel 3: Komplexe Wurzeln

$y'' + y = 0$

$r^2 + 1 = 0$ → $r = \\pm i$ ($\\alpha = 0$, $\\beta = 1$)

Lösung: $y = C_1 \\cos x + C_2 \\sin x$

[GUIDED_START]
**Schritt-für-Schritt:** Löse $y'' - 5y' + 6y = 0$ mit $y(0) = 1$, $y'(0) = 0$

**Schritt 1:** Charakteristische Gleichung: $r^2 - 5r + 6 = 0$

**Schritt 2:** Mitternachtsformel: $r = \\frac{5 \\pm \\sqrt{25-24}}{2} = \\frac{5 \\pm 1}{2}$
$r_1 = 3$, $r_2 = 2$

**Schritt 3:** Allgemeine Lösung: $y = C_1 e^{3x} + C_2 e^{2x}$

**Schritt 4:** Anfangsbedingungen:
$y(0) = C_1 + C_2 = 1$
$y'(0) = 3C_1 + 2C_2 = 0$

**Schritt 5:** LGS lösen: $C_1 = -2$, $C_2 = 3$

**Lösung:** $y = -2e^{3x} + 3e^{2x}$
[GUIDED_END]

> 🔗 **Zusammenfassung DGLen:** Du hast die wichtigsten Typen gewöhnlicher Differentialgleichungen kennengelernt: **Trennbare Variablen**, **lineare DGLen 1. Ordnung** und **DGLen 2. Ordnung** mit charakteristischer Gleichung. Diese Werkzeuge reichen für die meisten Anwendungen in Physik und Technik!

> 🔗 **Verwandt:** Differentialgleichungen tauchen in der **Numerik** (Euler-Verfahren) und in der **Stochastik** (stochastische Prozesse) wieder auf.`,
      },
            {
              id: "m2-dgl-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Homogene lineare DGL 1. Ordnung erkennen und $y' = ky$ mit $y = Ce^{kx}$ losen.`,
            },
            {
              id: "m2-dgl-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Inhomogene DGL mit Variation der Konstanten oder Ansatzmethode losen. Anfangswertprobleme korrekt behandeln.`,
            },
            {
              id: "m2-dgl-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `DGL 2. Ordnung mit charakteristischem Polynom. Schwingungs-DGL und Systeme von Differentialgleichungen.`,
            },
            {
              id: "m2-dgl-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Differentialgleichungen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },

  // =============== STOCHASTIK ===============
  {
    id: "m-stochastik-grundlagen",
    slug: "mathe-stochastik",
    title: "Wahrscheinlichkeitsrechnung",
    description: "Grundlagen der Stochastik und Wahrscheinlichkeit",
    icon: "🎲",
    color: "#f59e0b",
    category: "stochastik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Wahrscheinlichkeitsrechnung

### 🎯 Grundbegriffe
- **Zufallsexperiment:** Experiment mit zufälligem Ausgang
- **Ergebnisraum Ω:** Menge aller möglichen Ergebnisse
- **Ereignis:** Teilmenge von Ω

### 📐 Wahrscheinlichkeit
$$P(A) = \\frac{|A|}{|\\Omega|}$$

**Eigenschaften:**
- $0 \\leq P(A) \\leq 1$
- $P(\\Omega) = 1$
- $P(\\emptyset) = 0$

### 💡 Formeln
| Regel | Formel |
|-------|--------|
| Addition | $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$ |
| Komplement | $P(\\bar{A}) = 1 - P(A)$ |
| Bedingt | $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$ |`,
    lessons: [
      {
        id: "m-sto-1",
        title: "Grundbegriffe der Wahrscheinlichkeit",
        duration: "20 min",
        interactive: "probabilitySimulator" as const,
        type: "interactive",
        content: `## Zufallsexperimente

> Du kennst bereits Mengenoperationen (Vereinigung, Schnitt, Komplement) aus dem Grundlagen-Modul. In der **Stochastik** wenden wir genau diese Konzepte auf Zufallsexperimente an — Ereignisse sind einfach Mengen von Ergebnissen!

> 🔗 **Verwandt:** Mengenlehre (Vereinigung, Schnitt), Logik (UND/ODER)

Ein **Zufallsexperiment** ist ein Experiment, dessen Ausgang nicht vorhersehbar ist.

**Beispiele:**
- Münzwurf: $\\Omega = \{K, Z\}$
- Würfelwurf: $\\Omega = \{1, 2, 3, 4, 5, 6\}$
- Kartenziehen: $\\Omega = \{\\text{Herz}, \\text{Karo}, \\text{Kreuz}, \\text{Pik}\}$

## Wahrscheinlichkeit

$$P(A) = \\frac{\\text{günstige Ergebnisse}}{\\text{alle Ergebnisse}}$$

**Beispiel:** Beim Würfelwurf ist die Wahrscheinlichkeit für eine gerade Zahl:
$$P(\\text{gerade}) = \\frac{3}{6} = \\frac{1}{2}$$

## Additionssatz

$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

Bei **disjunkten** Ereignissen ($A \\cap B = \\emptyset$):
$$P(A \\cup B) = P(A) + P(B)$$

## Komplementregel

$$P(\\bar{A}) = 1 - P(A)$$

**Beispiel:** Die Wahrscheinlichkeit, keine 6 zu würfeln:
$$P(\\text{keine 6}) = 1 - P(6) = 1 - \\frac{1}{6} = \\frac{5}{6}$$

## Übung

Gegeben: $P(A) = 0.4$, $P(B) = 0.3$, $P(A \\cap B) = 0.1$

Berechne $P(A \\cup B)$!

> 🔗 **Weiter:** Die Grundbegriffe sitzen! Als Nächstes kommt die **Kombinatorik** — damit kannst du zählen, wie viele Möglichkeiten es gibt (Permutationen, Variationen, Kombinationen). Das ist die Basis für die Berechnung von Wahrscheinlichkeiten!

[INTERACTIVE]`,
      },
      {
        id: "m-sto-2",
        title: "Kombinatorik",
        duration: "25 min",
        type: "text",
        content: `## Permutationen

> Du kennst bereits die Grundbegriffe der Wahrscheinlichkeit — Zufallsexperimente, Ereignisse und die Laplace-Formel. Jetzt lernst du das Werkzeug kennen, um die Anzahl der Möglichkeiten systematisch zu zählen: die **Kombinatorik**!

Anordnung von n verschiedenen Objekten:
$$P_n = n! = n \\cdot (n-1) \\cdot ... \\cdot 1$$

**Beispiel:** 5 Bücher können auf $5! = 120$ Arten angeordnet werden.

## Variationen

Auswahl von k aus n Objekten **mit Zurücklegen**:
$$V_k^n = n^k$$

Ohne Zurücklegen:
$$V_k^n = \\frac{n!}{(n-k)!}$$

## Kombinationen

Auswahl von k aus n Objekten **ohne Reihenfolge**:
$$C_k^n = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}$$

**Beispiel:** Aus 10 Personen werden 3 gewählt:
$$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!} = 120$$

## Binomialformel

$$(a + b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$$

## Übung

Wie viele 4-stellige Zahlen kann man aus den Ziffern 1,2,3,4,5 bilden (ohne Wiederholung)?

[PRACTICE_START]
**Aufgabe:** Wie viele 4-stellige PINs kann man aus 0-9 bilden (mit Wiederholung)?

**Lösung:** $10^4 = 10000$ verschiedene PINs
[PRACTICE_END]

> 🔗 **Weiter:** Kombinatorik hilft dir, Möglichkeiten zu zählen. Im nächsten Kapitel lernst du die **bedingte Wahrscheinlichkeit** kennen — was passiert, wenn du bereits weißt, dass ein Ereignis eingetreten ist? Das führt zum Satz von Bayes!`,
      },
      {
        id: "m-sto-3",
        title: "Bedingte Wahrscheinlichkeit",
        duration: "20 min",
        type: "text",
        content: `## Bedingte Wahrscheinlichkeit

> Du kennst die Grundwahrscheinlichkeit und die Kombinatorik. Jetzt wird es spannend: Was passiert, wenn sich die Wahrscheinlichkeit ändert, weil du **zusätzliche Informationen** hast? Die bedingte Wahrscheinlichkeit ist der Schlüssel zum **Satz von Bayes** — eines der mächtigsten Werkzeuge der Stochastik!

> 🔗 **Verwandt:** Mengenlehre (Schnittmenge), Analysis (Integration für stetige Verteilungen)

Die bedingte Wahrscheinlichkeit gibt an, wie wahrscheinlich ein Ereignis ist, **wenn ein anderes bereits eingetreten ist**.

### Notation

$P(A|B)$ = "Wahrscheinlichkeit von A, gegeben B"

### Formel

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

### Beispiel 1: Ziehen ohne Zurücklegen

Eine Urne mit 3 roten und 2 blauen Kugeln. Ziehe 2 Kugeln ohne Zurücklegen.

$P(\\text{2. rot} | \\text{1. rot}) = \\frac{2}{4} = 0{,}5$

Nachdem die erste rote Kugel gezogen wurde, sind nur noch 2 von 4 übrig.

### Beispiel 2: Würfeln

$P(\\text{6} | \\text{ungerade}) = ?$

Ungerade Zahlen: {1, 3, 5}. Keine davon ist 6. Also $P = 0$.

### Beispiel 3: Medizinischer Test

- Krankheit: 1% der Bevölkerung
- Test: 95% Sensitivität (richtig positiv)
- Test: 5% Falsch-Positiv-Rate

$P(\\text{krank} | \\text{positiv}) = \\frac{0{,}95 \\cdot 0{,}01}{0{,}95 \\cdot 0{,}01 + 0{,}05 \\cdot 0{,}99} \\approx 16{,}1\%$

Überraschend niedrig! Das liegt an der niedrigen Grundrate.

### Unabhängigkeit

A und B sind unabhängig, wenn $P(A|B) = P(A)$.

> **Merke:** Bedingte Wahrscheinlichkeit = "Wissen ändert die Wahrscheinlichkeit"!

[PRACTICE_START]
**Aufgabe:** Urne: 3 rot, 2 blau. Ziehe 2 ohne Zurücklegen. P(beide rot)?

**Lösung:** $P = \frac{3}{5} \cdot \frac{2}{4} = \frac{6}{20} = 0{,}3 = 30\%$
[PRACTICE_END]

> 🔗 **Zusammenfassung Stochastik:** Du hast die drei Grundpfeiler der Wahrscheinlichkeitsrechnung kennengelernt: **Grundbegriffe** (Ereignisse, Laplace), **Kombinatorik** (Zählen) und **bedingte Wahrscheinlichkeit** (Bayes). Diese Konzepte bauen direkt auf der **Mengenlehre** auf — Vereinigung, Schnitt und Komplement sind hier überall!`,
      },
            {
              id: "m-stochastik-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Laplace-Wahrscheinlichkeiten: gunstige durch mogliche Falle. Wurfel, Karten und Urnen — die Klassiker.`,
            },
            {
              id: "m-stochastik-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Additionssatz und Multiplikationssatz richtig anwenden. Bedingte Wahrscheinlichkeit und Vierfeldertafel.`,
            },
            {
              id: "m-stochastik-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Satz von Bayes, totale Wahrscheinlichkeit und mehrstufige Zufallsexperimente mit abhangigen Ereignissen.`,
            },
            {
              id: "m-stochastik-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Wahrscheinlichkeitsrechnung — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },

  // =============== NUMERIK ===============
  {
    id: "m-numerik-grundlagen",
    slug: "mathe-numerik",
    title: "Numerische Verfahren",
    description: "Algorithmen für numerische Berechnungen",
    icon: "💻",
    color: "#10b981",
    category: "komplexe-numerik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Numerik

### 🎯 Grundlagen
- **Fehler:** $|x_{exakt} - x_{approx}|$
- **Rel. Fehler:** $\\frac{|x_{exakt} - x_{approx}|}{|x_{exakt}|}$

### 📐 Wichtige Verfahren
| Verfahren | Anwendung |
|-----------|----------|
| Bisektion | Nullstellen finden |
| Newton | Nullstellen (schneller) |
| Gauß | Lineare Gleichungssysteme |
| Euler | DGLs lösen |

### 💡 Konvergenz
- **Ordnung p:** $|e_{n+1}| \\leq C \\cdot |e_n|^p$
- Linear: $p=1$, Quadratisch: $p=2$`,
    lessons: [
      {
        id: "m-num-1",
        title: "Fehler und Näherungen",
        duration: "15 min",
        type: "text",
        content: `## Fehler und Näherungen

> Willkommen in der **Numerik** — der Kunst, mathematische Probleme mit Algorithmen zu lösen! Du kennst bereits Ableitungen und Integrale aus der Analysis. Jetzt lernst du, wie Computer diese Berechnungen durchführen — und warum dabei immer **Fehler** entkommen. Fehleranalyse ist der Schlüssel zuverlässiger numerischer Verfahren!

> 🔗 **Verwandt:** Differentialrechnung (Ableitungen), Integralrechnung (Numerische Integration)

In der Numerik sind **Fehler** unvermeidlich. Wir unterscheiden verschiedene Arten von Fehlern.

### Absoluter Fehler

$e = |x_{\\text{approx}} - x_{\\text{exact}}|$

**Beispiel:** $\\pi \\approx 3{,}14$

$e = |3{,}14 - 3{,}14159...| = 0{,}00159...$

### Relativer Fehler

$e_{\\text{rel}} = \\frac{|x_{\\text{approx}} - x_{\\text{exact}}|}{|x_{\\text{exact}}|}$

**Beispiel:** $\\pi \\approx 3{,}14$

$e_{\\text{rel}} = \\frac{0{,}00159}{3{,}14159} \\approx 0{,}0005 = 0{,}05\%$

### Rundungsfehler

Computer haben endliche Genauigkeit. $0{,}1 + 0{,}2 \\neq 0{,}3$ in Gleitkomma!

$0{,}1 + 0{,}2 = 0{,}30000000000000004$

### Kondition

Wie stark ändert sich das Ergebnis bei kleinen Änderungen der Eingabe?

- **Gut konditioniert:** $f(x) = x + 1$ (kleine Änderung → kleiner Effekt)
- **Schlecht konditioniert:** $f(x) = \\frac{1}{x}$ bei $x \\approx 0$ (kleine Änderung → großer Effekt)

### Konvergenzordnung

Wenn $|e_{n+1}| \\leq C \\cdot |e_n|^p$, dann ist die Konvergenzordnung $p$.

- **Linear (p=1):** Jeder Schritt halbiert den Fehler
- **Quadratisch (p=2):** Jeder Schritt quadriert den Fehler (viel schneller!)

> **Merke:** Relativer Fehler ist oft wichtiger als absoluter — 1 cm Fehler bei 1 m ist anders als bei 1 km!

> 🔗 **Weiter:** Jetzt kennst du die Grundlagen der Fehleranalyse. Als Erstes kommt das **Bisektionsverfahren** — ein einfaches, aber garantiert konvergierendes Verfahren zur Nullstellenbestimmung. Es ist die Basis für das Verständnis komplexerer Verfahren!`,
      },
      {
        id: "m-num-2",
        title: "Bisektionsverfahren",
        duration: "20 min",
        type: "text",
        content: `## Bisektionsverfahren

> Du kennst bereits Fehlerbegriffe und Konvergenzordnung. Jetzt lernst du dein erstes **Nullstellenverfahren** kennen: Die Bisektion ist der einfachste Algorithmus — sie halbiert immer wieder ein Intervall, bis die Nullstelle gefunden ist. Langsam, aber garantiert!

> 🔗 **Verwandt:** Analysis (Zwischenwertsatz als theoretische Grundlage), Fehler und Näherungen (Konvergenzordnung)

Das Bisektionsverfahren findet **Nullstellen** einer Funktion durch halbierende Intervallschritte.

### Idee

Wenn $f(a)$ und $f(b)$ verschiedene Vorzeichen haben, liegt dazwischen eine Nullstelle.

### Algorithmus

1. Startintervall $[a, b]$ mit $f(a) \\cdot f(b) < 0$
2. Mitte: $c = \\frac{a+b}{2}$
3. Wenn $f(c) = 0$: fertig!
4. Sonst: Welches Teilintervall hat Vorzeichenwechsel? → neues Intervall
5. Wiederhole bis gewünschte Genauigkeit

### Beispiel

$f(x) = x^2 - 2$ (Nullstelle bei $\\sqrt{2} \\approx 1{,}414$)

| Schritt | $a$ | $b$ | $c$ | $f(c)$ |
|---------|-----|-----|-----|--------|
| 1 | 1 | 2 | 1,5 | 0,25 |
| 2 | 1 | 1,5 | 1,25 | -0,4375 |
| 3 | 1,25 | 1,5 | 1,375 | -0,1094 |
| 4 | 1,375 | 1,5 | 1,4375 | 0,0664 |

Nach 4 Schritten: $\\sqrt{2} \\approx 1{,}4375$

### Konvergenz

- **Linear** (Ordnung 1): Jeder Schritt halbiert das Intervall
- Nach $n$ Schritten: Intervallbreite $\\frac{b-a}{2^n}$
- Für 10 Dezimalstellen: ca. 34 Schritte ($2^{34} > 10^{10}$)

### Vor- und Nachteile

✅ Garantiert Konvergenz (wenn Vorzeichenwechsel vorhanden)

✅ Einfach zu implementieren

❌ Langsam (linear)

❌ Braucht Vorzeichenwechsel

> **Merke:** Bisektion = Intervall halbieren. Garantiert, aber langsam!

> 🔗 **Weiter:** Bisektion ist sicher, aber langsam. Das **Newton-Verfahren** ist der Turbo unter den Nullstellenverfahren — es nutzt die Ableitung für quadratische Konvergenz!`,
      },
      {
        id: "m-num-3",
        title: "Newton-Verfahren",
        duration: "25 min",
        type: "text",
        content: `## Newton-Verfahren

> Du kennst bereits die Bisektion — langsam, aber sicher. Das **Newton-Verfahren** ist der Turbo: Es nutzt die **Ableitung** der Funktion, um in jedem Schritt eine Tangente zu legen und den Nullstellen-Schätzwert extrem schnell zu verbessern. Quadratische Konvergenz bedeutet: Anzahl korrekter Stellen verdoppelt sich pro Schritt!

> 🔗 **Verwandt:** Differentialrechnung (Ableitungen als Grundlage), Bisektionsverfahren (Vergleich der Konvergenz)

Das Newton-Verfahren (auch Newton-Raphson) ist ein schnelles Verfahren zur Nullstellenbestimmung.

### Idee

Starte mit einem Schätzwert $x_0$ und verbessere ihn iterativ mit der **Tangente**.

### Formel

$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

### Beispiel

$f(x) = x^2 - 2$ (Nullstelle bei $\\sqrt{2}$)

$f'(x) = 2x$, Start: $x_0 = 2$

| Schritt | $x_n$ | $f(x_n)$ | $f'(x_n)$ | $x_{n+1}$ |
|---------|--------|----------|-----------|-----------|
| 0 | 2 | 2 | 4 | 1,5 |
| 1 | 1,5 | 0,25 | 3 | 1,4167 |
| 2 | 1,4167 | 0,0069 | 2,833 | 1,4142 |

Nach nur 3 Schritten: $\\sqrt{2} \\approx 1{,}4142$ (4 Dezimalstellen!)

### Konvergenz

- **Quadratisch** (Ordnung 2): Anzahl korrekter Stellen verdoppelt sich pro Schritt
- Viel schneller als Bisektion!

### Vor- und Nachteile

✅ Sehr schnell (quadratisch)

✅ Gut für viele Funktionen

❌ Braucht Ableitung $f'(x)$

❌ Konvergiert nicht immer (z.B. bei Wendepunkten)

❌ Kann "überspringen" (divergieren)

### Vergleich

| | Bisektion | Newton |
|--|-----------|--------|
| Konvergenz | Linear | Quadratisch |
| Braucht Ableitung? | Nein | Ja |
| Garantiert? | Ja | Nein |
| Schritte für 10 Stellen | ~34 | ~5 |

> **Merke:** Newton = schnell aber heikel, Bisektion = langsam aber sicher!

> 🔗 **Zusammenfassung Numerik:** Du hast die Grundlagen numerischer Verfahren kennengelernt: **Fehleranalyse**, **Bisektion** (garantiert, langsam) und **Newton** (schnell, heikel). Diese Algorithmen sind die Basis für wissenschaftliches Rechnen — von der Ingenieurtechnik bis zur KI!

> 🔗 **Verwandt:** Das Newton-Verfahren zeigt, wie mächtig **Ableitungen** in der Praxis sind. In der Stochastik werden ähnliche Optimierungsverfahren für Maximum-Likelihood-Schätzung verwendet!`,
      },
            {
              id: "m-numerik-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Absolute und relative Fehler berechnen. Numerisches Rechnen mit Rundungen verstehen.`,
            },
            {
              id: "m-numerik-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Bisektionsverfahren und Newton-Verfahren fur nichtlineare Gleichungen anwenden. Konvergenzgeschwindigkeit vergleichen.`,
            },
            {
              id: "m-numerik-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Iterationsverfahren analysieren, Fehlerabschatzungen durchfuhren und Konvergenzordnung bestimmen.`,
            },
            {
              id: "m-numerik-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Numerische Verfahren — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },

  // =============== KOMPLEXE ZAHLEN ===============
  {
    id: "m-komplexe",
    slug: "mathe-komplexe-zahlen",
    title: "Komplexe Zahlen",
    description: "Imaginäre Einheit, Gaußsche Ebene, Rechenregeln, Polardarstellung",
    icon: "ℂ",
    color: "#8b5cf6",
    category: "komplexe-numerik",
    progress: 0,
    lessons: [
      {
        id: "m-komplexe-1",
        title: "Grundlagen der komplexen Zahlen",
        duration: "18 min",
        type: "text",
        content: `## Was sind komplexe Zahlen?

> Die reellen Zahlen reichen nicht aus, um alle Gleichungen zu lösen. $x^2 + 1 = 0$ hat keine reelle Lösung! Die komplexen Zahlen erweitern die Mathematik um die imaginäre Einheit $i$.

## Die imaginäre Einheit

$$i^2 = -1$$

Das bedeutet: $i = \\sqrt{-1}$

## Komplexe Zahlen

Eine komplexe Zahl hat die Form $z = a + bi$ mit:
- $a$: Realteil ($\\text{Re}(z)$)
- $b$: Imaginärteil ($\\text{Im}(z)$)

### Beispiel 1
$z = 3 + 2i$: Realteil = 3, Imaginärteil = 2

### Beispiel 2
$z = -1 + 4i$: Realteil = -1, Imaginärteil = 4

### Beispiel 3
$z = 5$ (reelle Zahl): Realteil = 5, Imaginärteil = 0

## Die Gaußsche Ebene

Komplexe Zahlen werden in der **Gaußschen Ebene** dargestellt:
- x-Achse = Realteil
- y-Achse = Imaginärteil

$z = 3 + 2i$ entspricht dem Punkt $(3, 2)$.

## Rechenregeln

**Addition:** $(a+bi) + (c+di) = (a+c) + (b+d)i$

$(3+2i) + (1-4i) = 4 - 2i$

**Subtraktion:** $(a+bi) - (c+di) = (a-c) + (b-d)i$

$(5+3i) - (2+i) = 3 + 2i$

**Multiplikation:** $(a+bi)(c+di) = (ac-bd) + (ad+bc)i$

$(2+3i)(1-i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i$

> Merke: Bei der Multiplikation wird $i^2 = -1$ eingesetzt!

## Konjugiertes komplexe Zahl

$\\bar{z} = a - bi$ (Vorzeichen des Imaginärteils wird gewechselt)

$z = 3 + 2i \\Rightarrow \\bar{z} = 3 - 2i$

**Eigenschaft:** $z \\cdot \\bar{z} = a^2 + b^2 = |z|^2$`,
      },
      {
        id: "m-komplexe-2",
        title: "Betrag & Polardarstellung",
        duration: "20 min",
        type: "text",
        content: `## Betrag einer komplexen Zahl

$$|z| = \\sqrt{a^2 + b^2}$$

### Beispiel 1
$z = 3 + 4i$
$|z| = \\sqrt{9 + 16} = \\sqrt{25} = 5$

### Beispiel 2
$z = 1 - i$
$|z| = \\sqrt{1 + 1} = \\sqrt{2}$

## Polardarstellung

$z = r \\cdot e^{i\\varphi}$ mit:
- $r = |z|$ (Betrag)
- $\\varphi = \\arg(z)$ (Winkel)

### Umrechnung kartesisch → polar
$r = \\sqrt{a^2 + b^2}$
$\\varphi = \\arctan\\left(\\frac{b}{a}\\right)$

### Beispiel 3
$z = 1 + i$
$r = \\sqrt{2}$, $\\varphi = 45° = \\frac{\\pi}{4}$
$z = \\sqrt{2} \\cdot e^{i\\pi/4}$

## Multiplikation in Polardarstellung

$z_1 \\cdot z_2 = r_1 r_2 \\cdot e^{i(\\varphi_1 + \\varphi_2)}$

> Merke: Bei der Multiplikation werden die Beträge multipliziert und die Winkel addiert!

## Satz von Moivre

$z^n = r^n \\cdot e^{in\\varphi}$

### Beispiel 4
$(1+i)^4 = (\\sqrt{2})^4 \\cdot e^{i \\cdot 4 \\cdot 45°} = 4 \\cdot e^{i \\cdot 180°} = 4 \\cdot (-1) = -4$`,
      },
      {
        id: "m-komplexe-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Komplexe Zahlen addieren, subtrahieren und den Betrag berechnen.`,
      },
    ],
  },

  // =============== GEOMETRIE ===============
  {
    id: "m-geometrie-flaechen",
    slug: "mathe-geometrie",
    title: "Geometrie & Flächeninhalte",
    description: "Flächen, Körper und räumliches Denken",
    icon: "📐",
    color: "#06b6d4",
    category: "geometrie-trigonometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Geometrie

### 🎯 Flächeninhalte
| Formel | Formel |
|--------|--------|
| Rechteck | $A = a \\cdot b$ |
| Dreieck | $A = \\frac{g \\cdot h}{2}$ |
| Kreis | $A = \\pi r^2$ |
| Trapez | $A = \\frac{(a+b) \\cdot h}{2}$ |
| Raute | $A = \\frac{d_1 \\cdot d_2}{2}$ |

### 📐 Körper
| Körper | Volumen | Oberfläche |
|--------|---------|------------|
| Quader | $V = a \\cdot b \\cdot c$ | $O = 2(ab+ac+bc)$ |
| Würfel | $V = a^3$ | $O = 6a^2$ |
| Kugel | $V = \\frac{4}{3}\\pi r^3$ | $O = 4\\pi r^2$ |
| Zylinder | $V = \\pi r^2 h$ | $O = 2\\pi r(r+h)$ |
| Kegel | $V = \\frac{1}{3}\\pi r^2 h$ | $O = \\pi r(r+l)$ |

### 💡 Satz des Pythagoras
$$a^2 + b^2 = c^2$$`,
    lessons: [
      {
        id: "m-geo-1",
        title: "Flächeninhalte",
        duration: "20 min",
        type: "text",
        visuals: [
          { type: "rectangle" as const },
          { type: "triangle" as const },
          { type: "circle" as const },
          { type: "trapezoid" as const },
        ],
        content: `## Flächeninhalte ebener Figuren

> Du kennst bereits Potenzen, Logarithmen und Grundlagen der Analysis. Jetzt wenden wir Mathematik auf **räumliche Formen** an — Flächeninhalte sind der Einstieg in die Geometrie, die in der technischen Informatik (z.B. Chip-Layout, CAD) unverzichtbar ist.

> 🏠 **Fürs Erweitert:** Geometrische Berechnungen kommen in MA1 (Grundlagen) und später in der Linearen Algebra (Vektorräume, Transformationen) vor. Wer Flächen sicher beherrscht, hat bei Integrationsaufgaben (Fläche unter der Kurve) einen Vorteil!

### Rechteck & Quadrat
$$A = a \\cdot b$$

**Quadrat:** $A = a^2$

### Dreieck
$$A = \\frac{g \\cdot h}{2}$$

**Gleichseitiges Dreieck:** $A = \\frac{\\sqrt{3}}{4} a^2$

### Kreis
$$A = \\pi r^2 = \\frac{\\pi d^2}{4}$$

### Trapez
$$A = \\frac{(a + b) \\cdot h}{2}$$

### Übung
Berechne die Fläche eines Rechtecks mit $a = 8\\text{cm}$ und $b = 5\\text{cm}$!

---

## Rechenbeispiele

### Dreieck
$a = 5\\text{cm}$, $h = 3\\text{cm}$
$$A = \\frac{1}{2} \\cdot 5 \\cdot 3 = 7{,}5 \\text{cm}^2$$

### Trapez
$a = 8\\text{cm}$, $b = 5\\text{cm}$, $h = 4\\text{cm}$
$$A = \\frac{1}{2} \\cdot (8 + 5) \\cdot 4 = 26 \\text{cm}^2$$

### Kreis
$r = 3\\text{cm}$
$$A = \\pi \\cdot 9 \\approx 28{,}27 \\text{cm}^2$$

---

## Häufige Fehler

- **Höhe im Dreieck:** Die Höhe steht IMMER **senkrecht** auf der Grundseite! Nicht die Seitenlänge verwenden.
- **Radius vs. Durchmesser:** $A = \\pi r^2$, nicht $\\pi d^2$! Wenn der Durchmesser $d = 6$ gegeben ist, dann $r = 3$.
- **Einheiten:** Fläche ist in $\\text{cm}^2$, nicht $\\text{cm}$! Zweidimensional!

> 🔗 **Weiter:** Du kennst jetzt Flächen in 2D. Im nächsten Schritt werden wir diese Flächen zu **Körpern** erweitern — und Volumen berechnen!`,
      },
      {
        id: "m-geo-2",
        title: "Körper & Volumen",
        duration: "25 min",
        type: "text",
        visuals: [
          { type: "cuboid" as const },
          { type: "cube" as const },
          { type: "sphere" as const },
          { type: "cylinder" as const },
          { type: "cone" as const },
        ],
        content: `## Räumliche Körper

> Du kennst bereits Flächeninhalte ebener Figuren. Jetzt wird es **räumlich**: Aus Flächen werden Körper mit Volumen und Oberfläche — zentral für Architektur, 3D-Druck und technisches Zeichnen!

> 🎬 **Essence of Linear Algebra — Cross Products** — https://www.youtube.com/watch?v=eu6i7WJeinw — zeigt, wie Volumenberechnung mit Vektoren zusammenhängt.

### Quader
$$V = a \\cdot b \\cdot c$$
$$O = 2(ab + ac + bc)$$

### Würfel
$$V = a^3$$
$$O = 6a^2$$

### Kugel
$$V = \\frac{4}{3}\\pi r^3$$
$$O = 4\\pi r^2$$

### Zylinder
$$V = \\pi r^2 h$$
$$O = 2\\pi r(r + h)$$

### Kegel
$$V = \\frac{1}{3}\\pi r^2 h$$
$$O = \\pi r(r + l)$$ (l = Mantellänge)

### Übung
Berechne das Volumen einer Kugel mit $r = 5\\text{cm}$!

---

## Rechenbeispiele

### Quader
$a = 3$, $b = 4$, $c = 5$
$$V = 3 \\cdot 4 \\cdot 5 = 60 \\text{cm}^3$$
$$O = 2(12 + 15 + 20) = 94 \\text{cm}^2$$

### Zylinder
$r = 2$, $h = 10$
$$V = \\pi \\cdot 4 \\cdot 10 \\approx 125{,}66 \\text{cm}^3$$

### Kegel
$r = 3$, $h = 8$
$$V = \\frac{1}{3} \\cdot \\pi \\cdot 9 \\cdot 8 \\approx 75{,}40 \\text{cm}^3$$

---

## Häufige Fehler

- **Kegel:** NICHT vergessen den Faktor $\\frac{1}{3}$! Ohne ihn wäre es ein Zylinder.
- **Kugel:** $V = \\frac{4}{3}\\pi r^3$, nicht $4\\pi r^3$! Der Faktor $\\frac{4}{3}$ geht oft verloren.
- **Oberfläche vs. Volumen:** Unterschiedliche Einheiten! Oberfläche in $\\text{cm}^2$, Volumen in $\\text{cm}^3$.

> 🔗 **Weiter:** Du kennst jetzt Flächen und Körper. Der **Satz des Pythagoras** verbindet Geometrie mit Algebra — und ist der Schlüssel zu vielen technischen Berechnungen!`,
      },
      {
        id: "m-geo-3",
        title: "Satz des Pythagoras",
        duration: "20 min",
        type: "text",
        content: `## Satz des Pythagoras

> Du kennst bereits Flächeninhalte und Volumenberechnung. Der Satz des Pythagoras ist die **Brücke zwischen Geometrie und Algebra** — er verbindet Seitenlängen und ist die Grundlage für die gesamte Trigonometrie!

> 🎬 **Essence of Linear Algebra — Dot Products** — https://www.youtube.com/watch?v=LyGKycU2BQQ — zeigt, wie der Satz des Pythagoras mit dem Skalarprodukt zusammenhängt.

Der Satz des Pythagoras ist einer der wichtigsten Sätze der Geometrie. Er gilt für **rechtwinklige Dreiecke**.

### Formel

$$a^2 + b^2 = c^2$$

wobei $c$ die **Hypotenuse** (längste Seite, gegenüber dem rechten Winkel) ist.

### Beispiel 1

$a = 3$, $b = 4$, $c = ?$

$c^2 = 9 + 16 = 25$

$c = 5$

### Beispiel 2

$a = 5$, $c = 13$, $b = ?$

$b^2 = c^2 - a^2 = 169 - 25 = 144$

$b = 12$

### Beispiel 3: Ist es ein rechtwinkliges Dreieck?

Seiten: 6, 8, 10

$6^2 + 8^2 = 36 + 64 = 100 = 10^2$ ✓ → Ja!

### Pythagoräische Tripel

Ganzzahlige Lösungen: $(3, 4, 5)$, $(5, 12, 13)$, $(8, 15, 17)$, $(7, 24, 25)$

### Umgekehrter Satz

Wenn $a^2 + b^2 = c^2$, dann ist das Dreieck rechtwinklig.

### Anwendung: Distanz im Koordinatensystem

Abstand zwischen $(x_1, y_1)$ und $(x_2, y_2)$:

$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$

### Beispiel 4

Abstand $(1, 2)$ und $(4, 6)$:

$d = \\sqrt{9 + 16} = \\sqrt{25} = 5$

> **Merke:** Pythagoras gilt NUR bei rechten Winkeln!

[PRACTICE_START]
**Aufgabe:** Ist das Dreieck mit Seiten 5, 12, 13 rechtwinklig?

**Lösung:** $5^2 + 12^2 = 25 + 144 = 169 = 13^2$ ✓ Ja, rechtwinklig!
[PRACTICE_END]

> 🔗 **Weiter:** Pythagoras ist die Basis für die **Trigonometrie** — dort lernst du Sinus, Kosinus und Tangens kennen, die Winkel und Seitenlängen verknüpfen!

> 🎓 **Fürs Erweitert:** Der euklidische Abstand $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$ wird in der Linearen Algebra zum Abstandsbegriff in $\\mathbb{R}^n$ verallgemeinert!`,
      },
            {
              id: "m-geometrie-flaechen-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Flachen von Rechteck, Dreieck und Parallelogramm berechnen. Mit ganzen Zahlen und einfachen Formeln.`,
            },
            {
              id: "m-geometrie-flaechen-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Kreisflache, Trapez und zusammengesetzte Flachen. Auch mal $\pi$ im Ergebnis.`,
            },
            {
              id: "m-geometrie-flaechen-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Flachenberechnung mit Pythagoras kombinieren, fehlende Grossen aus anderen Angaben herleiten. Drei- und Vierecke knifflig.`,
            },
            {
              id: "m-geometrie-flaechen-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Flacheninhalte — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },

  // =============== TRIGONOMETRIE ===============
  {
    id: "m-trigonometrie",
    slug: "mathe-trigonometrie",
    title: "Trigonometrie",
    description: "Sinus, Kosinus, Tangens und Anwendungen",
    icon: "📏",
    color: "#ec4899",
    category: "geometrie-trigonometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Trigonometrie

### 🎯 Grundfunktionen
| Funktion | Definition |
|----------|------------|
| $\\sin \\alpha$ | $\\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}}$ |
| $\\cos \\alpha$ | $\\frac{\\text{Ankathete}}{\\text{Hypotenuse}}$ |
| $\\tan \\alpha$ | $\\frac{\\text{Gegenkathete}}{\\text{Ankathete}}$ |

### 📐 Wichtige Werte
| α | 0° | 30° | 45° | 60° | 90° |
|---|-----|-----|-----|-----|-----|
| sin | 0 | ½ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{3}}{2}$ | 1 |
| cos | 1 | $\\frac{\\sqrt{3}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | ½ | 0 |
| tan | 0 | $\\frac{\\sqrt{3}}{3}$ | 1 | $\\sqrt{3}$ | - |

### 💡 Gesetze
- **Satz des Pythagoras:** $\\sin^2\\alpha + \\cos^2\\alpha = 1$
- **Addition:** $\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$`,
    lessons: [
      {
        id: "m-trig-1",
        title: "Grundlagen der Trigonometrie",
        duration: "25 min",
        type: "interactive",
        interactive: "unitCircleInteractive" as const,
        visuals: [
          { type: "triangle" as const },
          { type: "unitCircle" as const, props: { angle: Math.PI / 3 } },
        ],
        content: `## Die trigonometrischen Funktionen

> Der Satz des Pythagoras hat dir gezeigt, dass $a^2 + b^2 = c^2$. Jetzt machen wir den nächsten Schritt: Statt Seitenlängen berechnen wir **Winkel** — mit Sinus, Kosinus und Tangens!

> 🎬 **Essence of Calculus — Sine & Cosine** — https://www.youtube.com/watch?v=QlB0LpVeI7E — warum Sinus und Kosinus mehr sind als Dreiecks-Verhältnisse: sie beschreiben Kreisbewegungen!

Im rechtwinkligen Dreieck:

$$\\sin \\alpha = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}} = \\frac{a}{c}$$

$$\\cos \\alpha = \\frac{\\text{Ankathete}}{\\text{Hypotenuse}} = \\frac{b}{c}$$

$$\\tan \\alpha = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}} = \\frac{a}{b} = \\frac{\\sin \\alpha}{\\cos \\alpha}$$

## Wichtige Identität

$$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$$

## Übung

Gegeben: $a = 3$, $c = 5$. Berechne $\\sin \\alpha$, $\\cos \\alpha$, $\\tan \\alpha$!

---

## Häufige Fehler

> **Achtung:** Diese Verwechslungen sind in Klausuren extrem häufig!

**1.** Gegenkathete und Ankathete **NICHT verwechseln!**
- **Gegenkathete** liegt **gegenüber** dem Winkel $\\alpha$
- **Ankathete** liegt **an** dem Winkel $\\alpha$ (aber nicht die Hypotenuse)
- Tipp: Wenn du den Winkel markierst, ist die Seite direkt am Winkel die Ankathete.

**2.** $\\tan(\\alpha) = \\frac{\\sin(\\alpha)}{\\cos(\\alpha)}$, **NICHT** $\\frac{\\cos(\\alpha)}{\\sin(\\alpha)}$!
- $\\tan = \\frac{\\text{Gegenkathete}}{\\text{Ankathete}} = \\frac{a}{b}$
- $\\frac{\\cos}{\\sin}$ wäre der **Kotangens** ($\\cot$), nicht der Tangens!

**3.** SOHCAHTOA gilt **NUR im rechtwinkligen Dreieck!**
- $\\sin$, $\\cos$, $\\tan$ in dieser Form funktionieren nur bei einem rechten Winkel ($90°$).
- Für allgemeine Dreiecke brauchst du den **Sinessatz** oder **Kosinessatz**.

> 🔗 **Weiter:** Jetzt kennst du die Grundfunktionen. Im nächsten Kapitel lernst du die **wichtigen Winkelwerte** und den **Einheitskreis** kennen — das zentrale Werkzeug der Trigonometrie!

[INTERACTIVE]`,
      },
      {
        id: "m-trig-2",
        title: "Wichtige Werte & Einheitskreis",
        duration: "20 min",
        type: "text",
        content: `## Wichtige Werte & Einheitskreis

> Du kennst bereits Sinus, Kosinus und Tangens aus dem rechtwinkligen Dreieck. Der **Einheitskreis** erweitert diese Funktionen auf **alle Winkel** — und macht sie zu periodischen Funktionen, die Wellen, Schwingungen und Kreisbewegungen beschreiben!

> 🎬 **Essence of Calculus — Sine & Cosine** — https://www.youtube.com/watch?v=QlB0LpVeI7E — visuelle Erklärung, wie der Einheitskreis Sinus und Kosinus erzeugt.

Der Einheitskreis (Radius 1) ist das zentrale Werkzeug der Trigonometrie.

### Definition

Im Einheitskreis mit Radius $r = 1$:

- $\\cos \\varphi = x$-Koordinate
- $\\sin \\varphi = y$-Koordinate
- $\\tan \\varphi = \\frac{\\sin \\varphi}{\\cos \\varphi}$

### Wichtige Werte

| Winkel | $\\sin$ | $\\cos$ | $\\tan$ |
|--------|--------|--------|--------|
| 0° | 0 | 1 | 0 |
| 30° | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{3}}$ |
| 45° | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | 1 |
| 60° | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2}$ | $\\sqrt{3}$ |
| 90° | 1 | 0 | undefiniert |

### Merkhilfe für 30° und 60°

$\\sin(30°) = \\frac{1}{2}$, $\\cos(30°) = \\frac{\\sqrt{3}}{2}$

$\\sin(60°) = \\frac{\\sqrt{3}}{2}$, $\\cos(60°) = \\frac{1}{2}$

### Quadranten-Vorzeichen

| Quadrant | sin | cos | tan |
|----------|-----|-----|-----|
| I (0-90°) | + | + | + |
| II (90-180°) | + | - | - |
| III (180-270°) | - | - | + |
| IV (270-360°) | - | + | - |

**ASTC-Regel:** All Students Take Calculus (alle positiv → sin → tan → cos)

### Symmetrien

$\\sin(-x) = -\\sin(x)$ (ungerade Funktion)

$\\cos(-x) = \\cos(x)$ (gerade Funktion)

> **Merke:** Einheitskreis = Radius 1. cos = x, sin = y. Die Werte bei 30°, 45°, 60° auswendig lernen!

> 🔗 **Weiter:** Du kennst jetzt die Grundwerte. Im nächsten Kapitel lernst du den **Sinus- und Kosinussatz** kennen — damit kannst du **beliebige** Dreiecke berechnen, nicht nur rechtwinklige!`,
      },
      {
        id: "m-trig-3",
        title: "Satz des Sinus & Kosinus",
        duration: "25 min",
        type: "text",
        content: `## Satz des Sinus & Kosinus

> Du kennst bereits den Einheitskreis und die Grundwerte. Jetzt erweitern wir die Trigonometrie auf **beliebige Dreiecke** — mit dem Sinus- und Kosinussatz kannst du auch ohne rechten Winkel berechnen!

> 🏠 **Fürs Erweitert:** Diese Sätze sind in der Physik und Ingenieurwissenschaften allgegenwärtig — von Kräftezerlegung bis Signalverarbeitung. In MA1 tauchen sie bei Vektorberechnungen auf.

Diese beiden Sätze erweitern die Trigonometrie über rechtwinklige Dreiecke hinaus.

## Sinussatz

Für beliebige Dreiecke:

$$\\frac{a}{\\sin \\alpha} = \\frac{b}{\\sin \\beta} = \\frac{c}{\\sin \\gamma} = 2R$$

wobei $R$ der Umkreisradius ist.

### Beispiel 1

$a = 5$, $\\alpha = 30°$, $\\beta = 45°$, $b = ?$

$\\frac{5}{\\sin 30°} = \\frac{b}{\\sin 45°}$

$b = \\frac{5 \\cdot \\sin 45°}{\\sin 30°} = \\frac{5 \\cdot 0{,}707}{0{,}5} = 7{,}07$

## Kosinussatz

Verallgemeinerung des Pythagoras:

$$c^2 = a^2 + b^2 - 2ab \\cos \\gamma$$

### Beispiel 2: Pythagoras als Spezialfall

Wenn $\\gamma = 90°$: $\\cos 90° = 0$

$c^2 = a^2 + b^2$ — das ist Pythagoras!

### Beispiel 3

$a = 3$, $b = 4$, $\\gamma = 60°$

$c^2 = 9 + 16 - 2 \\cdot 3 \\cdot 4 \\cdot 0{,}5 = 25 - 12 = 13$

$c = \\sqrt{13} \\approx 3{,}61$

## Wann was verwenden?

| Gegeben | Verwende |
|---------|----------|
| Rechter Winkel | Pythagoras + einfache Trigonometrie |
| 2 Seiten + Winkel gegenüber | Sinussatz |
| 2 Seiten + eingeschlossener Winkel | Kosinussatz |
| 3 Seiten | Kosinussatz (nach Winkel auflösen) |

> **Merke:** Sinussatz = Verhältnis, Kosinussatz = Verallgemeinerung von Pythagoras!

[PRACTICE_START]
**Aufgabe:** $a = 6$, $\alpha = 30°$, $\beta = 45°$. Berechne $b$.

**Lösung:** $\frac{6}{\sin 30°} = \frac{b}{\sin 45°}$
$b = \frac{6 \cdot \sin 45°}{\sin 30°} = \frac{6 \cdot 0{,}707}{0{,}5} = 8{,}49$
[PRACTICE_END]

> 🔗 **Weiter:** Trigonometrie abgeschlossen! Als Nächstes folgen **Potenzen und Logarithmen** — die Grundlage für Wachstumsprozesse und in der Analysis der Schlüssel zu den Exponentialfunktionen!

> 🎓 **Fürs Erweitert:** Trigonometrische Funktionen sind in der Analysis unverzichtbar — Fourier-Reihen, Differentialgleichungen und Signalverarbeitung basieren auf Sinus und Kosinus!`,
      },
            {
              id: "m-trigonometrie-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `$\sin$, $\cos$ und $\tan$ im rechtwinkligen Dreieck. Spezielle Winkel auswendig parat haben.`,
            },
            {
              id: "m-trigonometrie-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Einheitskreis verstehen und Winkel $>90°$ berechnen. Sinussatz und Kosinussatz im allgemeinen Dreieck.`,
            },
            {
              id: "m-trigonometrie-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Trigonometrische Gleichungen losen, Bogenmass-Radiant-Umrechnung und Anwendungen in der Vermessungstechnik.`,
            },
            {
              id: "m-trigonometrie-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Trigonometrie — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },

  // =============== POTENZEN & LOGARITHMEN ===============
  {
    id: "m-potenzen-log",
    slug: "mathe-potenzen",
    title: "Potenzen & Logarithmen",
    description: "Rechnen mit Potenzen und Logarithmen",
    icon: "🔢",
    color: "#84cc16",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Potenzen & Logarithmen

### 🎯 Potenzregeln
| Regel | Formel |
|-------|--------|
| Multiplikation | $a^m \\cdot a^n = a^{m+n}$ |
| Division | $\\frac{a^m}{a^n} = a^{m-n}$ |
| Potenz von Potenz | $(a^m)^n = a^{mn}$ |
| Produktregel | $(ab)^n = a^n b^n$ |

### 📐 Logarithmus
$$\\log_a(x) = y \\Leftrightarrow a^y = x$$

**Log-Regeln:**
- $\\log(ab) = \\log a + \\log b$
- $\\log(\\frac{a}{b}) = \\log a - \\log b$
- $\\log(a^n) = n \\cdot \\log a$

### 💡 Spezielle Logarithmen
- $\\ln(x) = \\log_e(x)$ (natürlich)
- $\\lg(x) = \\log_{10}(x)$ (dezimal)
- $\\log_2(x)$ (binär)`,
    lessons: [
      {
        id: "m-pot-1",
        title: "Potenzen & Potenzregeln",
        duration: "20 min",
        type: "text",
        content: `## Potenzregeln

> Die Trigonometrie ist abgeschlossen. Jetzt folgen **Potenzen und Logarithmen** — die Grundlage für exponentielles Wachstum, Zinseszins, Datenkompression ($\\log_2$) und in der Analysis der Schlüssel zu den Exponentialfunktionen!

> 🎬 **What's so special about Euler's number e?** — https://www.youtube.com/watch?v=m2MIpBrFgFk — warum $e$ die wichtigste Zahl der Mathematik ist und was Potenzen wirklich bedeuten.

Potenzen sind die Grundlage für viele mathematische Konzepte. Hier die wichtigsten Regeln:

### Grundbegriffe
$a^n = a \\cdot a \\cdot a \\cdots$ (n-mal)

- $a$: Basis
- $n$: Exponent
- $a^2$: Quadrat
- $a^3$: Kubik

### Regeln

**Multiplikation:** $a^m \\cdot a^n = a^{m+n}$

$2^3 \\cdot 2^4 = 2^7 = 128$

**Division:** $\\frac{a^m}{a^n} = a^{m-n}$

$\\frac{2^5}{2^3} = 2^2 = 4$

**Potenz von Potenz:** $(a^m)^n = a^{m \\cdot n}$

$(2^3)^2 = 2^6 = 64$

**Produkt:** $(ab)^n = a^n \\cdot b^n$

$(2 \\cdot 3)^2 = 4 \\cdot 9 = 36$

**Quotient:** $(\\frac{a}{b})^n = \\frac{a^n}{b^n}$

$(\\frac{2}{3})^2 = \\frac{4}{9}$

### Besondere Werte
$a^0 = 1$ (für $a \\neq 0$)

$a^1 = a$

$a^{-n} = \\frac{1}{a^n}$

$2^{-3} = \\frac{1}{8} = 0{,}125$

> **Merke:** Bei Multiplikation gleicher Basen werden die Exponenten addiert, bei Division subtrahiert!

---

## Häufige Fehler

> **Achtung:** Diese Fehler kommen in Prüfungen ständig vor — sie sind so häufig, dass Prüfer sie gezielt abfragen!

**1.** $a^0 = 1$, **NICHT** $0$! (Für jedes $a \\neq 0$)
- $5^0 = 1$, $100^0 = 1$, $(-3)^0 = 1$
- Nur $0^0$ ist undefiniert.

**2.** $a^{-n} = \\frac{1}{a^n}$, **NICHT** $-a^n$!
- $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$, **nicht** $-8$!
- Das Minus im Exponenten bedeutet Kehrwert, nicht Vorzeichenwechsel.

**3.** $(a^m)^n = a^{m \\cdot n}$ — Exponenten **MULTIPLIZIEREN**, nicht addieren!
- $(2^3)^4 = 2^{12} = 4096$, **nicht** $2^7$!
- Addieren wäre $a^m \\cdot a^n = a^{m+n}$ — das ist eine andere Regel.

[PRACTICE_START]
**Aufgabe 1:** Vereinfache $\frac{2^5 \cdot 2^3}{2^6}$

**Lösung:** $2^{5+3-6} = 2^2 = 4$

**Aufgabe 2:** Vereinfache $(3^2)^4$

**Lösung:** $3^{2 \cdot 4} = 3^8 = 6561$
[PRACTICE_END]

> 🔗 **Weiter:** Potenzen sind die Vorstufe zu **Logarithmen** — der Umkehrung der Potenzierung. Damit kannst du Gleichungen wie $2^x = 32$ lösen!`,
      },
      {
        id: "m-pot-2",
        title: "Logarithmen",
        duration: "25 min",
        type: "text",
        content: `## Logarithmen

> Du kennst bereits Potenzregeln. Jetzt lernst du die **Umkehrung** kennen: den Logarithmus. Wenn du weißt, dass $2^5 = 32$, dann ist $\\log_2(32) = 5$ — der Logarithmus verrät dir den **Exponenten**!

> 🎬 **What's so special about Euler's number e?** — https://www.youtube.com/watch?v=m2MIpBrFgFk — erklärt intuitiv, warum Logarithmen so fundamental sind.

Der Logarithmus ist die **Umkehrung** der Potenzierung. Wenn $a^x = b$, dann ist $\\log_a(b) = x$.

### Definition
$\\log_a(b) = x \\Leftrightarrow a^x = b$

### Beispiel 1
$\\log_2(8) = 3$, denn $2^3 = 8$

$\\log_{10}(100) = 2$, denn $10^2 = 100$

$\\log_5(25) = 2$, denn $5^2 = 25$

### Logarithmusgesetze

**Produkt:** $\\log(a \\cdot b) = \\log(a) + \\log(b)$

$\\log(6) = \\log(2) + \\log(3)$

**Quotient:** $\\log(\\frac{a}{b}) = \\log(a) - \\log(b)$

$\\log(\\frac{100}{10}) = \\log(100) - \\log(10) = 2 - 1 = 1$

**Potenz:** $\\log(a^n) = n \\cdot \\log(a)$

$\\log(8) = \\log(2^3) = 3 \\cdot \\log(2)$

### Wichtige Logarithmen

- **Natürlicher Logarithmus:** $\\ln(x) = \\log_e(x)$ mit $e \\approx 2{,}718$
- **Dezimallogarithmus:** $\\lg(x) = \\log_{10}(x)$
- **Binärlogarithmus:** $\\log_2(x)$ (in der Informatik)

### Beispiel 2: Gleichung lösen
$2^x = 16$

$x = \\log_2(16) = \\log_2(2^4) = 4$

> **Merke:** Logarithmen wandeln Potenzen in Produkte um — das macht Rechnungen einfacher!

[PRACTICE_START]
**Aufgabe 1:** Vereinfache $\log_2(8) + \log_2(4)$

**Lösung:** $\log_2(8) + \log_2(4) = 3 + 2 = 5$

**Aufgabe 2:** Löse $2^x = 32$

**Lösung:** $x = \log_2(32) = 5$
[PRACTICE_END]

> 🔗 **Weiter:** Potenzen und Logarithmen sind die Werkzeuge. Jetzt verbinden wir sie zur **Exponentialfunktion** $e^x$ — die Funktion, die sich selbst ableitet!`,
      },
      {
        id: "m-pot-3",
        title: "Exponentialfunktion",
        duration: "20 min",
        type: "text",
        content: `## Exponentialfunktionen

> Du kennst bereits Potenzregeln und Logarithmen. Jetzt verbinden wir beides zur **Exponentialfunktion** — der wichtigsten Funktion der Analysis. Ihre Besonderheit: $\\frac{d}{dx}e^x = e^x$ — sie bleibt unter der Ableitung unverändert!

> 🎬 **What's so special about Euler's number e?** — https://www.youtube.com/watch?v=m2MIpBrFgFk — DIE Erklärung, warum $e^x$ überall in der Natur vorkommt.

> 🏠 **Fürs Erweitert:** Die Exponentialfunktion $e^x$ ist das Herzstück von MA2 (Analysis). Differentialgleichungen wie $f'(x) = f(x)$ haben $e^x$ als Lösung — das macht sie zur wichtigsten Funktion überhaupt!

Eine Exponentialfunktion hat die Form $f(x) = a^x$, wobei die Variable im **Exponenten** steht.

### Die wichtigste: $e^x$

$e \\approx 2{,}71828$ ist die **Euler-Zahl**.

$e^x$ hat eine besondere Eigenschaft: $\\frac{d}{dx}e^x = e^x$ — die Ableitung ist die Funktion selbst!

### Wachstum & Zerfall

**Exponentielles Wachstum:** $f(t) = N_0 \\cdot e^{kt}$ (k > 0)

- Bakterienwachstum
- Bevölkerungsentwicklung
- Zinseszins

**Exponentieller Zerfall:** $f(t) = N_0 \\cdot e^{-kt}$ (k > 0)

- Radioaktiver Zerfall
- Abkühlung
- Medikamentenabbau

### Halbwertszeit

Die Zeit, bis die Hälfte zerfallen ist:

$T_{1/2} = \\frac{\\ln(2)}{k}$

### Beispiel: Radioaktiver Zerfall

1000 Atome, Halbwertszeit 5 Jahre. Nach 15 Jahren?

$N(15) = 1000 \\cdot (\\frac{1}{2})^{15/5} = 1000 \\cdot \\frac{1}{8} = 125$

> **Merke:** $e^x$ ist DIE Exponentialfunktion — sie beschreibt natürliches Wachstum überall in der Natur!



---

## Stetiges Wachstum -- Zinseszins

$$K(t) = K_0 \cdot e^{rt}$$

### Beispiel 2: Zinseszins

1000 Euro zu 5% ueber 10 Jahre, stetig verzinst:

$K(10) = 1000 \cdot e^{0{,}05 \cdot 10} = 1000 \cdot e^{0{,}5} = 1000 \cdot 1{,}6487 = 1648{,}70$ Euro

Vergleich einfach: $1000 \cdot 1{,}5 = 1500$ Euro. Stetig verzinst gibt mehr!

### Beispiel 3: Wann hat sich das Kapital verdoppelt?

$2000 = 1000 \cdot e^{0{,}05t}$

$2 = e^{0{,}05t}$

$\ln(2) = 0{,}05t$

$t = \frac{\ln(2)}{0{,}05} = \frac{0{,}693}{0{,}05} = 13{,}86$ Jahre

> **Merke:** Verdopplungszeit $T_2 = \frac{\ln 2}{r}$. Bei 5%: ca. 14 Jahre.

[PRACTICE_START]
**Aufgabe:** Eine Bakterienkultur verdoppelt sich alle 3 Stunden. Start: 100. Nach 12 Stunden?

**Lösung:** $N(12) = 100 \cdot 2^{12/3} = 100 \cdot 2^4 = 1600$
[PRACTICE_END]

> 🔗 **Weiter:** Potenzen, Logarithmen und Exponentialfunktionen abgeschlossen! Diese Werkzeuge brauchst du in der **Analysis** (Grenzwerte, Ableitungen von $e^x$) und in der **Stochastik** (Wahrscheinlichkeitsverteilungen).

> 🎓 **Fürs Erweitert:** In MA2 wirst du lernen, dass $e^x = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$ — eine Potenzreihe! Die Verbindung von Potenzen, Logarithmen und Analysis ist das Herzstück der Mathematik.`,
      },
            {
              id: "m-potenzen-log-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Potenzen mit ganzzahligen Exponenten berechnen und einfache Wurzeln ziehen. Die Basics sitzen.`,
            },
            {
              id: "m-potenzen-log-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Potenzgesetze sicher anwenden, negative und rationale Exponenten verstehen. Logarithmen als Umkehrung begreifen.`,
            },
            {
              id: "m-potenzen-log-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Logarithmengleichungen losen, exponentielles Wachstum modellieren und die Zusammenhange zwischen allen Darstellungsformen nutzen.`,
            },
            {
              id: "m-potenzen-log-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Potenzen & Logarithmen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },

  // =============== STATISTIK ===============
  {
    id: "m-statistik",
    slug: "mathe-statistik",
    title: "Statistik",
    description: "Mittelwert, Varianz und Datenanalyse",
    icon: "📊",
    color: "#f97316",
    category: "stochastik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Statistik

### 🎯 Maße der zentralen Tendenz
| Maß | Formel |
|-----|--------|
| Mittelwert | $\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i$ |
| Median | Mittlerer Wert (sortiert) |
| Modus | Häufigster Wert |

### 📐 Streuung
| Maß | Formel |
|-----|--------|
| Varianz | $s^2 = \\frac{1}{n}\\sum(x_i - \\bar{x})^2$ |
| Standardabweichung | $s = \\sqrt{s^2}$ |
| Spannweite | $R = x_{max} - x_{min}$ |

### 💡 Quartile
- $Q_1$: 25% sind kleiner
- $Q_2$ (= Median): 50% sind kleiner
- $Q_3$: 75% sind kleiner
- $IQR = Q_3 - Q_1$`,
    lessons: [
      {
        id: "m-stat-1",
        title: "Mittelwert, Median, Modus",
        duration: "20 min",
        type: "text",
        content: `## Mittelwert, Median, Modus

> Potenzen und Logarithmen sind abgeschlossen. Jetzt folgt ein ganz anderes Gebiet: **Statistik** — die Kunst, Daten zu sammeln, zu analysieren und zu interpretieren. Mittelwert, Median und Modus sind die drei wichtigsten Lageparameter!

> 🏠 **Fürs Erweitert:** Statistik kommt in der Stochastik (MA4) drankommen — und in fast jeder Ingenieurwissenschaft. Wer Daten sicher interpretieren kann, hat einen riesigen Vorteil in Projekten und Forschung!

Diese drei Maße beschreiben die **Lage** einer Datenverteilung.

### Mittelwert (Durchschnitt)

$\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i = \\frac{x_1 + x_2 + \\cdots + x_n}{n}$

### Beispiel 1
Noten: 2, 3, 2, 1, 2, 4, 3

$\\bar{x} = \\frac{2+3+2+1+2+4+3}{7} = \\frac{17}{7} \\approx 2{,}43$

### Median (Zentralwert)

Der **mittlere Wert**, wenn die Daten sortiert sind. Robust gegen Ausreißer!

Sortiert: 1, 2, 2, **2**, 3, 3, 4 → Median = 2

### Beispiel 2: Ausreißer
Gehälter: 3000, 3200, 3500, 3800, **50000**

Mittelwert: $\\frac{63500}{5} = 12700$ (verzerrt!)

Median: 3500 (realistischer)

### Modus (Häufigster Wert)

Der Wert, der **am häufigsten** vorkommt.

Daten: 2, 3, 2, 1, 2, 4, 3 → Modus = 2 (kommt 3-mal vor)

> **Merke:** Mittelwert rechnet, Median sortiert, Modus zählt. Bei schiefen Verteiligungen ist der Median oft aussagekräftiger!

[PRACTICE_START]
**Aufgabe:** Daten: 3, 7, 5, 3, 8. Berechne Mittelwert und Median.

**Lösung:**
Mittelwert: $\bar{x} = \frac{3+7+5+3+8}{5} = \frac{26}{5} = 5{,}2$
Sortiert: 3, 3, 5, 7, 8 → Median = 5
[PRACTICE_END]

> 🔗 **Weiter:** Du kennst jetzt die Lage einer Verteilung. Aber wie **streuen** die Daten um den Mittelwert? Das erfährst du im nächsten Kapitel mit **Varianz und Standardabweichung**!`,
      },
      {
        id: "m-stat-2",
        title: "Varianz & Standardabweichung",
        duration: "25 min",
        type: "text",
        content: `## Varianz & Standardabweichung

> Du kennst bereits Mittelwert, Median und Modus. Aber zwei Klassen können den gleichen Mittelwert haben — eine mit gleichen Noten, eine mit extremen Unterschieden. Die **Streuung** zeigt dir, wie sehr die Daten um den Mittelwert schwanken!

> 🎬 **But what is a Standard Deviation?** — https://www.youtube.com/watch?v=mtbM17e3BwQ — visuelle Erklärung von Varianz und Standardabweichung.

Diese Maße beschreiben die **Streuung** einer Datenverteilung.

### Varianz

$\\sigma^2 = \\frac{1}{n}\\sum_{i=1}^{n}(x_i - \\bar{x})^2$

### Beispiel 1
Daten: 2, 4, 4, 4, 5, 5, 7, 9

Mittelwert: $\\bar{x} = \\frac{40}{8} = 5$

Abweichungen: $-3, -1, -1, -1, 0, 0, 2, 4$

Quadrate: $9, 1, 1, 1, 0, 0, 4, 16$

$\\sigma^2 = \\frac{32}{8} = 4$

### Standardabweichung

$\\sigma = \\sqrt{\\sigma^2}$

$\\sigma = \\sqrt{4} = 2$

Die Standardabweichung hat die **gleiche Einheit** wie die Daten!

### Beispiel 2: Noten
Klasse A: Noten 3, 3, 3, 3, 3 → $\\sigma = 0$ (alle gleich)

Klasse B: Noten 1, 2, 3, 4, 5 → $\\sigma \\approx 1{,}41$ (große Streuung)

### Empirische Regel (Normalverteilung)

- 68% der Daten liegen in $\\bar{x} \\pm \\sigma$
- 95% in $\\bar{x} \\pm 2\\sigma$
- 99,7% in $\\bar{x} \\pm 3\\sigma$

> **Merke:** Varianz in Quadrat-Einheiten, Standardabweichung in Original-Einheiten. $\\sigma$ zeigt, wie stark die Daten um den Mittelwert streuen!

[PRACTICE_START]
**Aufgabe:** Daten: 2, 4, 4, 4, 5, 5, 7, 9. Berechne Varianz und Standardabweichung.

**Lösung:** $\bar{x} = 5$. Abweichungen: $-3, -1, -1, -1, 0, 0, 2, 4$
$\sigma^2 = \frac{9+1+1+1+0+0+4+16}{8} = 4$
$\sigma = 2$
[PRACTICE_END]

> 🔗 **Weiter:** Du kennst jetzt Mittelwert und Streuung. Im nächsten Kapitel lernst du **Quartile und Boxplots** kennen — damit kannst du Daten visualisieren und Ausreißer erkennen!`,
      },
      {
        id: "m-stat-3",
        title: "Quartile & Boxplot",
        duration: "20 min",
        interactive: "boxplotBuilder" as const,
        type: "interactive",
        content: `## Quartile & Boxplot

> Du kennst bereits Mittelwert und Standardabweichung. Jetzt lernst du einen anderen Weg kennen, Daten zu analysieren: **Quartile** teilen die Daten in vier gleiche Teile — und der **Boxplot** zeigt dir auf einen Blick, wo die Daten liegen und wo Ausreißer sind!

> 🎬 **But what is a Standard Deviation?** — https://www.youtube.com/watch?v=mtbM17e3BwQ — ergänzend zur Varianz: zeigt, wie man Daten visuell analysiert.

Quartile teilen eine sortierte Datenreihe in **vier gleiche Teile**.

### Definitionen

- **Q1** (unteres Quartil): 25% der Daten liegen darunter
- **Q2** (Median): 50% der Daten liegen darunter
- **Q3** (oberes Quartil): 75% der Daten liegen darunter

### Berechnung

Sortierte Daten: $x_1, x_2, \\cdots, x_n$

$Q_1$ = Median der unteren Hälfte

$Q_3$ = Median der oberen Hälfte

### Beispiel
Daten: 2, 3, 5, 7, 8, 10, 12, 15, 18

$Q_1 = 4$ (Median von 2,3,5,7)

$Q_2 = 8$ (Median)

$Q_3 = 13{,}5$ (Median von 10,12,15,18)

### Interquartilsabstand (IQR)

$IQR = Q_3 - Q_1 = 13{,}5 - 4 = 9{,}5$

Der IQR beschreibt die Streubreite des **mittleren 50%** der Daten.

### Boxplot

Ein Boxplot zeigt:
- Box von Q1 bis Q3
- Linie bei Q2 (Median)
- Whisker bis zu den Extremwerten (innerhalb 1,5 × IQR)
- Punkte für Ausreißer

### Ausreißer erkennen

- Unterhalb: $Q_1 - 1{,}5 \\cdot IQR$
- Oberhalb: $Q_3 + 1{,}5 \\cdot IQR$

> **Merke:** Der IQR ist robust gegen Ausreißer und zeigt die typische Streuung der Daten!

[INTERACTIVE]

> 🔗 **Weiter:** Statistik abgeschlossen! Du kennst jetzt Lage, Streuung und Verteilung von Daten. Diese Werkzeuge brauchst du in der **Stochastik** — dort geht es um Wahrscheinlichkeiten, Zufallsvariablen und Verteilungen!

> 🎓 **Fürs Erweitert:** In MA4 (Stochastik) werden Varianz und Erwartungswerte zu zentralen Begriffen. Boxplots und Quartile sind in der Datenanalyse und Qualitätskontrolle allgegenwärtig!`,
      },
            {
              id: "m-statistik-aufgaben-leicht",
              title: "📝 Aufgaben (Leicht)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 1,
              content: `Mittelwert und Median kleiner Datenreihen berechnen. Maximum und Minimum ablesen.`,
            },
            {
              id: "m-statistik-aufgaben-mittel",
              title: "📝 Aufgaben (Mittel)",
              duration: "10 min",
              type: "exercises",
              exerciseDifficulty: 2,
              content: `Varianz und Standardabweichung verstehen und berechnen. Boxplots interpretieren und Quartile bestimmen.`,
            },
            {
              id: "m-statistik-aufgaben-schwer",
              title: "📝 Aufgaben (Schwer)",
              duration: "12 min",
              type: "exercises",
              exerciseDifficulty: 3,
              content: `Lineare Regression und Korrelationskoeffizient. Statistische Kennzahlen aus gruppierten Daten berechnen.`,
            },
            {
              id: "m-statistik-pruefung",
              title: "📋 Prüfung",
              duration: "15 min",
              type: "exercises",
              examMode: true,
              content: `Abschlussprufung: Statistik — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
            },
    ],
  },
  {
    id: "m-bruchrechnen",
    slug: "mathe-bruchrechnen",
    title: "Bruchrechnen",
    description: "Grundlagen der Bruchrechnung - addieren, subtrahieren, multiplizieren, dividieren",
    icon: "🔢",
    color: "#8b5cf6",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Bruchrechnen

### Grundbegriffe
- **Zähler** (oben): Anzahl der Teile
- **Nenner** (unten): Gesamtanzahl der Teile
- **Echter Bruch:** Zähler < Nenner
- **Unechter Bruch:** Zähler ≥ Nenner

### Rechenregeln
| Operation | Regel |
|-----------|-------|
| Addieren | $\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}$ |
| KGV nötig | $\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\cdot d + c \\cdot b}{b \\cdot d}$ |
| Multiplizieren | $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$ |
| Dividieren | $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ |

### Kürzen
$\\frac{a \\cdot k}{b \\cdot k} = \\frac{a}{b}$ — Immer den größten gemeinsamen Teiler suchen!`,
    lessons: [
      {
        id: "m-br-1",
        title: "Brüche verstehen",
        duration: "15 min",
        type: "text",
        content: `## Was ist ein Bruch?

> Statistik abgeschlossen! Jetzt beginnen wir mit den **Grundlagen der Algebra** — und zwar mit Brüchen. Bruchrechnen ist überall: von Kochrezepten bis zu technischen Formeln. Wer Brüche sicher beherrscht, hat beim Lösen von Gleichungen und Termumformungen einen riesigen Vorteil!

> 🏠 **Fürs Erweitert:** Bruchrechnen ist die Voraussetzung für **Gleichungen lösen** und **Termumformung** — beides kommt in MA1 drankommen. Im Erweitert wirst du ständig mit Brüchen arbeiten, z.B. bei Partialbruchzerlegungen in der Analysis!

Ein Bruch $\\frac{a}{b}$ stellt einen Anteil dar. $a$ ist der **Zähler**, $b$ der **Nenner**.

## Echte vs. unechte Brüche

- **Echter Bruch:** $\\frac{3}{4}$ — Zähler < Nenner (weniger als 1 Ganzes)
- **Unechter Bruch:** $\\frac{5}{3}$ — Zähler ≥ Nenner (mehr als 1 Ganzes)
- **Gemischte Zahl:** $1\\frac{2}{3}$ = $\\frac{5}{3}$

## Brüche als Dezimalzahlen

$\\frac{1}{4} = 0{,}25$, $\\frac{1}{3} = 0{,}333...$, $\\frac{1}{2} = 0{,}5$

## Am Zahlenstrahl

Brüche lassen sich auf dem Zahlenstrahl darstellen. $\\frac{3}{4}$ liegt bei 0,75.

### Beispiel
Teile einen Kuchen in 8 Stücke. Wenn du 3 isst, hast du $\\frac{3}{8}$ gegessen. Es bleiben $\\frac{5}{8}$.

## Gemischte Zahlen und unechte Brueche

Ein **unechter Bruch** hat $Z \\geq N$: $\\frac{7}{4}$

Eine **gemischte Zahl** = Ganze Zahl + echter Bruch: $1\\frac{3}{4}$

### Umrechnung: Ungecht -> Gemischt

$\\frac{7}{4} = 7 \\div 4 = 1$ Rest $3 = 1\\frac{3}{4}$

### Umrechnung: Gemischt -> Ungecht

$1\\frac{3}{4} = \\frac{1 \\cdot 4 + 3}{4} = \\frac{7}{4}$

---

## Dezimalzahlen als Bruch

$0{,}75 = \\frac{75}{100} = \\frac{3}{4}$ (kuerzen durch 25)

$0{,}333... = \\frac{1}{3}$ (periodische Dezimalzahl)

> **Merke:** Jede endliche Dezimalzahl laesst sich als Bruch schreiben. Umgekehrt: Teile $Z \\div N$ fuer die Dezimaldarstellung.

---

## Brueche vergleichen

Gleicher Nenner: $\\frac{2}{5}$ vs $\\frac{3}{5}$ -> $\\frac{3}{5}$ ist groesser

Verschiedene Nenner: $\\frac{2}{3}$ vs $\\frac{3}{5}$
-> $\\frac{2}{3} = \\frac{10}{15}$, $\\frac{3}{5} = \\frac{9}{15}$ -> $\\frac{2}{3} > \\frac{3}{5}$

[GUIDED_START]
**Schritt-fuer-Schritt:** Wandle $\\frac{22}{7}$ in eine gemischte Zahl um

**Schritt 1:** Teile: $22 \\div 7 = 3$ Rest $1$

**Schritt 2:** Ganzer Teil: $3$

**Schritt 3:** Rest als Zaehler: $\\frac{1}{7}$

**Ergebnis:** $\\frac{22}{7} = 3\\frac{1}{7}$
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Wandle $\\frac{11}{3}$ in eine gemischte Zahl um

**Loesung:** $11 \\div 3 = 3$ Rest $2$ -> $3\\frac{2}{3}$

**Aufgabe 2:** Wandle $2\\frac{5}{8}$ in einen unechten Bruch um

**Loesung:** $\\frac{2 \\cdot 8 + 5}{8} = \\frac{21}{8}$

**Aufgabe 3:** Ordne: $\\frac{1}{2}$, $\\frac{3}{5}$, $\\frac{2}{3}$

**Loesung:** $\\frac{1}{2} = \\frac{15}{30}$, $\\frac{3}{5} = \\frac{18}{30}$, $\\frac{2}{3} = \\frac{20}{30}$
Also: $\\frac{1}{2} < \\frac{3}{5} < \\frac{2}{3}$
[PRACTICE_END]

> 🔗 **Weiter:** Du kennst jetzt Brüche und ihre Darstellung. Im nächsten Schritt lernst du, Brüche zu **addieren und subtrahieren** — das erfordert einen gemeinsamen Nenner!`,
      },
      {
        id: "m-br-2",
        title: "Addieren & Subtrahieren",
        duration: "18 min",
        type: "text",
        content: `## Addieren & Subtrahieren von Brüchen

> Du kennst bereits Brüche und ihre Umrechnung. Jetzt lernst du die erste Rechenoperation kennen: **Addieren und Subtrahieren**. Das Besondere: Du brauchst einen **gemeinsamen Nenner** — das kgV (kleinste gemeinsame Vielfache)!

> 🏠 **Fürs Erweitert:** Das Prinzip des gemeinsamen Nenners kehrt in der Analysis bei Partialbruchzerlegungen wieder — dort zerlegst du komplexe Brüche in einfachere Summanden!

Um Brüche zu addieren oder subtrahieren, braucht man einen **gemeinsamen Nenner**.

## Gleicher Nenner

Wenn der Nenner gleich ist, einfach die Zähler addieren/subtrahieren:

$$\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}$$

### Beispiel 1

$\\frac{3}{7} + \\frac{2}{7} = \\frac{5}{7}$

$\\frac{5}{8} - \\frac{3}{8} = \\frac{2}{8} = \\frac{1}{4}$ (kürzen!)

## Verschiedene Nenner

Man braucht das **kleinste gemeinsame Vielfache (kgV)** der Nenner.

### Beispiel 2

$\\frac{1}{3} + \\frac{1}{4}$

kgV(3, 4) = 12

$= \\frac{4}{12} + \\frac{3}{12} = \\frac{7}{12}$

### Beispiel 3

$\\frac{2}{5} + \\frac{1}{3}$

kgV(5, 3) = 15

$= \\frac{6}{15} + \\frac{5}{15} = \\frac{11}{15}$

## Schritt für Schritt

1. **kgV** der Nenner suchen
2. **Erweitern:** Brüche auf den gleichen Nenner bringen
3. **Zähler** addieren/subtrahieren
4. **Kürzen:** Ergebnis vereinfachen

### Beispiel 4

$\\frac{3}{4} - \\frac{1}{6}$

kgV(4, 6) = 12

$= \\frac{9}{12} - \\frac{2}{12} = \\frac{7}{12}$

### Beispiel 5: Drei Brüche

$\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4}$

kgV(2, 3, 4) = 12

$= \\frac{6}{12} + \\frac{4}{12} + \\frac{3}{12} = \\frac{13}{12} = 1\\frac{1}{12}$

> **Merke:** Gleicher Nenner = direkt addieren. Verschiedene Nenner = erst kgV suchen und erweitern!

[PRACTICE_START]
**Aufgabe:** $\frac{2}{3} + \frac{1}{4} = ?$

**Lösung:** KGV = 12. $\frac{8}{12} + \frac{3}{12} = \frac{11}{12}$
[PRACTICE_END]

> 🔗 **Weiter:** Addieren und Subtrahieren sitzen. Jetzt kommt die **Multiplikation und Division** von Brüchen — und die ist überraschenderweise einfacher!`,
      },
      {
        id: "m-br-3",
        title: "Multiplizieren & Dividieren",
        duration: "15 min",
        type: "text",
        content: `## Multiplizieren & Dividieren

> Du kennst bereits Addition und Subtraktion von Brüchen. Jetzt kommt die **Multiplikation und Division** — und die ist einfacher: Zähler mal Zähler, Nenner mal Nenner. Beim Dividieren wird einfach gekehrt!

> 🏠 **Fürs Erweitert:** Bruchterme mit Variablen (z.B. $\\frac{x+1}{x-1} \\cdot \\frac{x-2}{x+3}$) sind in der Analysis bei der Partialbruchzerlegung essenziell. Wer Bruchrechnung sicher beherrscht, spart im Erweitert viel Zeit!

Brüche zu multiplizieren ist einfacher als zu addieren — man braucht keinen gemeinsamen Nenner!

## Multiplikation

**Regel:** Zähler mal Zähler, Nenner mal Nenner.

$$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$$

### Beispiel 1

$\\frac{2}{3} \\cdot \\frac{4}{5} = \\frac{8}{15}$

### Beispiel 2: Vereinfachen vor dem Multiplizieren

$\\frac{3}{4} \\cdot \\frac{8}{9}$

Kreußlich kürzen: 3 und 9 teilen sich durch 3, 4 und 8 teilen sich durch 4:

$= \\frac{1}{1} \\cdot \\frac{2}{3} = \\frac{2}{3}$

**Tipp:** Immer vor dem Multiplizieren kürzen — das macht das Ergebnis einfacher!

## Division

**Regel:** Kehrtausch! Dividieren durch $\\frac{a}{b}$ = Multiplizieren mit $\\frac{b}{a}$.

$$\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$$

### Beispiel 3

$\\frac{2}{3} : \\frac{4}{5} = \\frac{2}{3} \\cdot \\frac{5}{4} = \\frac{10}{12} = \\frac{5}{6}$

### Beispiel 4: Gemischte Zahlen

$2\\frac{1}{2} : 1\\frac{1}{4}$

Erst in unechte Brüche umwandeln:

$\\frac{5}{2} : \\frac{5}{4} = \\frac{5}{2} \\cdot \\frac{4}{5} = \\frac{20}{10} = 2$

> **Merke:** Multiplizieren = Zähler×Zähler, Nenner×Nenner. Dividieren = Kehren und multiplizieren!

[PRACTICE_START]
**Aufgabe:** $\frac{3}{5} \cdot \frac{2}{7} = ?$

**Lösung:** $\frac{3 \cdot 2}{5 \cdot 7} = \frac{6}{35}$
[PRACTICE_END]

> 🔗 **Weiter:** Bruchrechnung abgeschlossen! Diese Fähigkeit brauchst du jetzt für **Gleichungen lösen** — dort wirst du Brüche in Gleichungen auflösen und Variablen isolieren.

> 🎓 **Fürs Erweitert:** In MA1 und MA2 wirst du Bruchterme mit Variablen ständig umformen — Partialbruchzerlegung, Grenzwerte bei rationalen Funktionen, etc. Diese Basics sind unverzichtbar!`,
      },
      {
        id: "m-br-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Einfache Bruche addieren, subtrahieren und kurzen. Kleine Nenner, uberschaubare Zahlen — ideal zum Einstieg.`,
      },
      {
        id: "m-br-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Bruche mit unterschiedlichen Nennern verrechnen, gemischte Zahlen umwandeln und multiplizieren. Etwas mehr Nachdenken notig.`,
      },
      {
        id: "m-br-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Komplexe Bruchterme mit mehreren Operationen, Doppelbruche und Textaufgaben. Hier musst du genau hinschauen.`,
      },
      {
        id: "m-br-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Bruchrechnen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-gleichungen",
    slug: "mathe-gleichungen",
    title: "Gleichungen lösen",
    description: "Lineare und quadratische Gleichungen, pq-Formel, Mitternachtsformel",
    icon: "⚖️",
    color: "#10b981",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Gleichungen lösen

### Lineare Gleichungen
$ax + b = 0 \\Rightarrow x = -\\frac{b}{a}$

### Quadratische Gleichungen
$ax^2 + bx + c = 0$

**pq-Formel:** $x^2 + px + q = 0 \\Rightarrow x = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$

**abc-Formel:** $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

### Diskriminante
$D = b^2 - 4ac$
- $D > 0$: 2 Lösungen
- $D = 0$: 1 Lösung (doppelt)
- $D < 0$: keine reelle Lösung`,
    lessons: [
      {
        id: "m-gl-1",
        title: "Lineare Gleichungen",
        duration: "15 min",
        type: "text",
        content: `## Lineare Gleichungen

> Bruchrechnung abgeschlossen! Jetzt lernst du, **Gleichungen zu lösen** — die zentrale Fertigkeit der Algebra. Eine Gleichung sagt: "Links ist gleich rechts." Deine Aufgabe: Finde den Wert von $x$, der das erfüllt!

> 🏠 **Fürs Erweitert:** Lineare Gleichungen sind die Basis für **Gleichungssysteme** in MA1 (Lineare Algebra). Wer sie sicher beherrscht, kann später mit Matrizen und Vektoren arbeiten!

Lineare Gleichungen sind die einfachste Art von Gleichungen — die Variable kommt nur in der **1. Potenz** vor.

### Grundprinzip

Was du auf einer Seite machst, musst du auch auf der anderen machen.

### Beispiel 1: Einfach

$2x + 6 = 14$

$2x = 14 - 6 = 8$

$x = 4$

**Probe:** $2 \\cdot 4 + 6 = 14$ ✓

### Beispiel 2: Variable auf beiden Seiten

$5x - 3 = 2x + 9$

$5x - 2x = 9 + 3$

$3x = 12$

$x = 4$

### Beispiel 3: Klammern

$3(x - 2) = 2(x + 1)$

$3x - 6 = 2x + 2$

$3x - 2x = 2 + 6$

$x = 8$

### Beispiel 4: Brüche

$\\frac{x}{3} + \\frac{x}{4} = 7$

Mit 12 erweitern (kgV von 3 und 4):

$4x + 3x = 84$

$7x = 84$

$x = 12$

### Schema

1. **Klammern** auflösen
2. **Brüche** wegschaffen (erweitern)
3. **Variablen** auf eine Seite
4. **Zahlen** auf die andere Seite
5. **Dividieren** durch den Koeffizienten
6. **Probe** machen!

> **Merke:** Das Ziel ist immer, $x = ...$ zu bekommen. Schritt für Schritt umformen!

[PRACTICE_START]
**Aufgabe:** Löse $3x + 7 = 22$

**Lösung:** $3x = 15$ → $x = 5$
Probe: $3 \cdot 5 + 7 = 22$ ✓
[PRACTICE_END]

> 🔗 **Weiter:** Lineare Gleichungen sind die Basis. Jetzt werden sie **quadratisch**: $x^2$ taucht auf! Mit der pq-Formel oder abc-Formel kannst du sie lösen.

> 🎓 **Fürs Erweitert:** Quadratische Gleichungen führen zur Diskriminante und zu komplexen Zahlen — beides kommt in MA1 drankommen!`,
      },
      {
        id: "m-gl-2",
        title: "Quadratische Gleichungen",
        duration: "20 min",
        type: "text",
        content: `## Quadratische Gleichungen

> Du kennst bereits lineare Gleichungen. Jetzt wird die Variable **quadratisch**: $x^2$ taucht auf! Das eröffnet ganz neue Möglichkeiten — und ganz neue Lösungsverfahren: pq-Formel und abc-Formel (Mitternachtsformel).

> 🎬 **Essence of Algebra — Quadratic Formula** — https://www.youtube.com/watch?v=XMx9S35LfgQ — zeigt geometrisch, warum die pq-Formel funktioniert.

$ax^2 + bx + c = 0$ — Die Variable kommt in der **2. Potenz** vor.

## pq-Formel

Für $x^2 + px + q = 0$:

$$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

### Beispiel
$x^2 - 5x + 6 = 0$ → $p = -5$, $q = 6$

$x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\sqrt{\\frac{1}{4}} = \\frac{5}{2} \\pm \\frac{1}{2}$

$x_1 = 3$, $x_2 = 2$

## abc-Formel

Für $ax^2 + bx + c = 0$:

$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

## Diskriminante

$D = b^2 - 4ac$ bestimmt die Anzahl der Lösungen:
- $D > 0$: Zwei Lösungen
- $D = 0$: Eine Lösung (doppelt)
- $D < 0$: Keine reelle Lösung



---

## Die abc-Formel (Mitternachtsformel)

Fuer $ax^2 + bx + c = 0$:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

### Beispiel 2: abc-Formel anwenden

$2x^2 + 3x - 2 = 0$ ($a=2$, $b=3$, $c=-2$)

$x = \frac{-3 \pm \sqrt{9 + 16}}{4} = \frac{-3 \pm 5}{4}$

$x_1 = \frac{-3+5}{4} = \frac{1}{2}$, $x_2 = \frac{-3-5}{4} = -2$

---

## Die Diskriminante -- 3 Faelle

$$D = b^2 - 4ac$$

| $D$ | Bedeutung | Loesungen |
|-----|-----------|----------|
| $D > 0$ | Zwei verschiedene reelle Loesungen | $x_{1,2} = \frac{-b \pm \sqrt{D}}{2a}$ |
| $D = 0$ | Eine doppelte Loesung | $x = \frac{-b}{2a}$ |
| $D < 0$ | Keine reellen Loesungen | (nur komplexe) |

### Beispiel 3: D-Bestimmung

$x^2 - 4x + 4 = 0$: $D = 16 - 16 = 0$ -> doppelte Loesung $x = 2$

$x^2 + x + 1 = 0$: $D = 1 - 4 = -3 < 0$ -> keine reellen Loesungen

[GUIDED_START]
**Schritt-fuer-Schritt:** Loese $3x^2 - 6x + 2 = 0$ vollstaendig

**Schritt 1:** $a=3$, $b=-6$, $c=2$

**Schritt 2:** Diskriminante: $D = 36 - 24 = 12 > 0$ -> zwei Loesungen

**Schritt 3:** $x = \frac{6 \pm \sqrt{12}}{6} = 1 \pm \frac{\sqrt{3}}{3}$

**Schritt 4:** $x_1 \approx 1{,}577$, $x_2 \approx 0{,}423$

**Probe:** $3(1{,}577)^2 - 6(1{,}577) + 2 \approx 0$
[GUIDED_END]

---

## Häufige Fehler

> **Achtung:** Quadratische Gleichungen sind Prüfungsklassiker — diese Fehler solltest du unbedingt vermeiden!

**1.** Gleichung **MUSS** die Form $ax^2 + bx + c = 0$ haben!
- Erst umformen, bevor du pq-Formel oder abc-Formel anwendest!
- Beispiel: $x^2 = 5x - 6$ wird zu $x^2 - 5x + 6 = 0$

**2.** pq-Formel: $x = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$ — **Vorzeichen von $p$ beachten!**
- Bei $x^2 + 3x + 2 = 0$ ist $p = +3$, also $-\\frac{p}{2} = -\\frac{3}{2}$
- Häufiger Fehler: Das Minus vor $\\frac{p}{2}$ vergessen!

**3.** Diskriminante $D < 0$ → **keine reellen Lösungen** (aber komplexe!)
- $D < 0$ bedeutet nicht "keine Lösung", sondern keine Lösung in $\\mathbb{R}$.
- In $\\mathbb{C}$ gibt es immer zwei Lösungen (Fundamentalsatz der Algebra).

[PRACTICE_START]
**Aufgabe 1:** Löse $x^2 - 5x + 6 = 0$ mit der pq-Formel

**Lösung:** $p=-5$, $q=6$. $x = \frac{5}{2} \pm \sqrt{\frac{25}{4}-6} = \frac{5}{2} \pm \frac{1}{2}$
$x_1 = 3$, $x_2 = 2$

**Aufgabe 2:** Berechne die Diskriminante von $2x^2 + 3x + 5$

**Lösung:** $D = 9 - 40 = -31 < 0$ → keine reellen Lösungen
[PRACTICE_END]

> 🔗 **Weiter:** Gleichungen lösen abgeschlossen! Jetzt folgt die **Termumformung** — damit kannst du Terme vereinfachen, Klammern ausmultiplizieren und binomische Formeln anwenden. Das ist die Voraussetzung für Kurvendiskussion!

> 🎓 **Fürs Erweitert:** Quadratische Gleichungen und die Diskriminante sind in MA1 die Grundlage für die Theorie der Polynomgleichungen und komplexen Zahlen!`,
      },
      {
        id: "m-gl-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Lineare Gleichungen der Form $ax + b = c$ losen. Ein Schritt, eine Unbekannte — sauberes Handwerk.`,
      },
      {
        id: "m-gl-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Quadratische Gleichungen mit pq-Formel losen, Faktorisieren und einfache Wurzelgleichungen. Zwei Losungsschritte kombinieren.`,
      },
      {
        id: "m-gl-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Gleichungen hoheren Grades, Betragsgleichungen und parametrische Gleichungen. Jetzt wird's knifflig.`,
      },
      {
        id: "m-gl-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Gleichungen losen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-termumformung",
    slug: "mathe-termumformung",
    title: "Termumformung",
    description: "Klammern, Binomische Formeln, Kürzen, Vereinfachen",
    icon: "✏️",
    color: "#f59e0b",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Termumformung

### Binomische Formeln
$(a+b)^2 = a^2 + 2ab + b^2$
$(a-b)^2 = a^2 - 2ab + b^2$
$(a+b)(a-b) = a^2 - b^2$

### Distributivgesetz
$a(b+c) = ab + ac$

### Potenzregeln
$a^m \\cdot a^n = a^{m+n}$
$(a^m)^n = a^{m \\cdot n}$
$a^0 = 1$ (für $a \\neq 0$)`,
    lessons: [
      {
        id: "m-tu-1",
        title: "Klammern ausmultiplizieren",
        duration: "15 min",
        type: "text",
        content: `## Klammern ausmultiplizieren

> Gleichungen lösen abgeschlossen! Jetzt lernst du die **Termumformung** kennen — das Werkzeug, um Terme zu vereinfachen und umzuformen. Das Distributivgesetz ist der Schlüssel: $a(b+c) = ab + ac$.

> 🏠 **Fürs Erweitert:** Termumformung ist die Voraussetzung für **Kurvendiskussion** in MA2 — dort musst du Funktionen umformen, um Nullstellen, Extrema und Wendepunkte zu finden!

Das Distributivgesetz ist das wichtigste Werkzeug beim Vereinfachen von Termen.

### Distributivgesetz

$a \\cdot (b + c) = a \\cdot b + a \\cdot c$

### Beispiel 1: Einfach

$3(x + 4) = 3 \\cdot x + 3 \\cdot 4 = 3x + 12$

### Beispiel 2: Negatives Vorzeichen

$-2(5 - x) = -2 \\cdot 5 + (-2) \\cdot (-x) = -10 + 2x$

**Vorsicht:** Minus mal Minus gibt Plus!

### Beispiel 3: Variable außen

$x(x + 3) = x^2 + 3x$

### Beispiel 4: Verschachtelte Klammern

$2(3x - (4 - x))$

Erst innere Klammer auflösen:

$= 2(3x - 4 + x) = 2(4x - 4) = 8x - 8$

### Beispiel 5: Zwei Klammern

$(x + 2)(x - 3)$

Jedes Element der ersten Klammer mit jedem der zweiten multiplizieren:

$$= x \\cdot x + x \\cdot (-3) + 2 \\cdot x + 2 \\cdot (-3)$$

$$= x^2 - 3x + 2x - 6 = x^2 - x - 6$$

### Schema für zwei Klammern

$(a + b)(c + d) = ac + ad + bc + bd"

> **Merke:** "Außen mal Außen, Innen mal Innen" — das FOIL-Prinzip (First, Outer, Inner, Last)!

> 🔗 **Weiter:** Du kennst jetzt das Ausmultiplizieren. Im nächsten Kapitel lernst du die **binomischen Formeln** kennen — drei mächtige Werkzeuge, die in der Algebra überall auftauchen!`,
      },
      {
        id: "m-tu-2",
        title: "Binomische Formeln",
        duration: "18 min",
        type: "text",
        content: `## Binomische Formeln

> Du kennst bereits das Ausmultiplizieren mit dem Distributivgesetz. Jetzt lernst du drei **Spezialfälle** kennen, die so häufig vorkommen, dass sie eigene Namen haben: die binomischen Formeln! Sie sind der Schlüssel zum Faktorisieren und zur Scheitelpunktform.

> 🎬 **Essence of Algebra — Binomial Theorem** — https://www.youtube.com/watch?v=YMm0gWxSckQ — zeigt, wie binomische Formeln zum Binomischen Theorem verallgemeinert werden.

Die drei binomischen Formeln gehören zu den wichtigsten Werkzeugen der Algebra.

### 1. Formel: $(a+b)^2 = a^2 + 2ab + b^2$

**Wortlich:** "Summe quadriert = Quadrate plus doppeltes Produkt"

$(x+3)^2 = x^2 + 6x + 9$

$(2x+1)^2 = 4x^2 + 4x + 1$

### 2. Formel: $(a-b)^2 = a^2 - 2ab + b^2$

**Wortlich:** "Differenz quadriert = Quadrate minus doppeltes Produkt"

$(x-4)^2 = x^2 - 8x + 16$

$(3x-2)^2 = 9x^2 - 12x + 4$

### 3. Formel: $(a+b)(a-b) = a^2 - b^2$

**Wortlich:** "Summe mal Differenz = Differenz der Quadrate"

$(x+5)(x-5) = x^2 - 25$

$(2x+3)(2x-3) = 4x^2 - 9$

### Anwendung: Ausklammern rückwärts

$x^2 + 10x + 25 = (x+5)^2$

$x^2 - 49 = (x+7)(x-7)$

$4x^2 - 12x + 9 = (2x-3)^2$

### Merkhilfe

| Formel | Schema | Beispiel |
|--------|--------|----------|
| $(a+b)^2$ | $a^2 + 2ab + b^2$ | $(x+1)^2 = x^2 + 2x + 1$ |
| $(a-b)^2$ | $a^2 - 2ab + b^2$ | $(x-1)^2 = x^2 - 2x + 1$ |
| $(a+b)(a-b)$ | $a^2 - b^2$ | $(x+1)(x-1) = x^2 - 1$ |

### Warum wichtig?

- Quadratische Gleichungen lösen
- Terme vereinfachen
- Kurvendiskussion (Scheitelpunktform)

> **Merke:** Erste = Quadrieren, doppelt, quadrieren. Zweite = wie erste mit Minus. Dritte = Plus mal Minus = Differenz der Quadrate!

[PRACTICE_START]
**Aufgabe:** Wende die 2. binomische Formel an: $(x + 3)^2$

**Lösung:** $x^2 + 2 \cdot 3x + 9 = x^2 + 6x + 9$
[PRACTICE_END]

> 🔗 **Weiter:** Termumformung abgeschlossen! Jetzt folgen **Ungleichungen** — dort suchst du nicht mehr einen einzelnen Wert, sondern einen **Bereich** von Lösungen!

> 🎓 **Fürs Erweitert:** Binomische Formeln werden in MA2 zur Scheitelpunktform verallgemeinert. In der Linearen Algebra helfen sie bei quadratischen Formen und Optimierung!`,
      },
      {
        id: "m-tu-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Ausmultiplizieren mit dem Distributivgesetz und einfache binomische Formeln anwenden. Grundrezepte einuben.`,
      },
      {
        id: "m-tu-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Alle drei binomischen Formeln ruckwarts und vorwarts, Faktorisieren von Polynomen und Zusammenfassen langerer Terme.`,
      },
      {
        id: "m-tu-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Komplexe Umformungen mit Wurzeln und Potenzen, Terme mit mehreren Variablen geschickt vereinfachen.`,
      },
      {
        id: "m-tu-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Termumformung — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-ungleichungen",
    slug: "mathe-ungleichungen",
    title: "Ungleichungen",
    description: "Lineare und quadratische Ungleichungen, Betragsungleichungen",
    icon: "⚖️",
    color: "#ec4899",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Ungleichungen

### Regeln
- $a < b \\Rightarrow a + c < b + c$ (Addition)
- $a < b$ und $c > 0 \\Rightarrow a \\cdot c < b \\cdot c$
- $a < b$ und $c < 0 \\Rightarrow a \\cdot c > b \\cdot c$ (**Vorzeichenwechsel!**)

### Intervallschreibweise
- $(a, b)$ = offenes Intervall: $a < x < b$
- $[a, b]$ = abgeschlossenes Intervall: $a \\leq x \\leq b$
- $[a, b)$ = halboffen: $a \\leq x < b$`,
    lessons: [
      {
        id: "m-ug-1",
        title: "Lineare Ungleichungen",
        duration: "15 min",
        type: "text",
        content: `## Lineare Ungleichungen

> Termumformung abgeschlossen! Jetzt folgt das letzte Algebra-Modul: **Ungleichungen**. Statt "$=$" suchst du jetzt nach "$<$" oder "$>$" — und die Lösung ist kein einzelner Wert, sondern ein **Intervall** auf dem Zahlenstrahl!

> 🏠 **Fürs Erweitert:** Ungleichungen sind in MA2 bei der Kurvendiskussion essenziell — Monotonie ($f'(x) > 0$) und Krümmung ($f''(x) > 0$) sind Ungleichungen! Auch in der Optimierung (Nebenbedingungen) spielen sie eine zentrale Rolle.

Ungleichungen funktionieren wie Gleichungen — mit einer wichtigen Ausnahme beim Multiplizieren mit negativen Zahlen.

### Symbole

- $<$ : kleiner als
- $>$ : größer als
- $\\leq$ : kleiner oder gleich
- $\\geq$ : größer oder gleich

### Grundregeln

- Addition/Subtraktion: wie bei Gleichungen ✓
- Multiplikation/Division mit **positiver** Zahl: wie bei Gleichungen ✓
- Multiplikation/Division mit **negativer** Zahl: **Vorzeichen umkehren!** ⚠️

### Beispiel 1: Einfach

$2x + 3 > 7$

$2x > 4$

$x > 2$

Lösungsmenge: $L = \{x \\in \\mathbb{R} \mid x > 2\} = (2, \\infty)$

### Beispiel 2: Negativer Koeffizient

$-3x + 6 \\leq 12$

$-3x \\leq 6$

$x \\geq -2$ ← Vorzeichenwechsel!

### Beispiel 3: Klammern

$2(x - 1) > 3(x + 2)$

$2x - 2 > 3x + 6$

$-2 - 6 > 3x - 2x$

$-8 > x$ → $x < -8$

### Intervallschreibweise

- $(a, b)$ = offenes Intervall: $a < x < b$
- $[a, b]$ = abgeschlossenes Intervall: $a \\leq x \\leq b$
- $(a, b]$ = halboffen: $a < x \\leq b$
- $(-\\infty, a)$ = nach links offen

### Darstellung auf dem Zahlenstrahl

$x > 2$: Offener Kreis bei 2, Pfeil nach rechts.

$x \\geq 2$: Geschlossener Kreis bei 2, Pfeil nach rechts.

> **Merke:** Bei Division durch negative Zahlen: Vorzeichen umkehren!

[PRACTICE_START]
**Aufgabe:** Löse $2x - 5 > 3$

**Lösung:** $2x > 8$ → $x > 4$
Lösungsmenge: $L = \{x \in \mathbb{R} \mid x > 4\} = (4, \infty)$
[PRACTICE_END]

> 🔗 **Weiter:** Lineare Ungleichungen sind die Basis. Jetzt werden sie **quadratisch**: $x^2$ taucht auf! Mit dem Tafel-Test findest du die Lösungsmenge.`,
      },
      {
        id: "m-ug-2",
        title: "Quadratische Ungleichungen",
        duration: "18 min",
        type: "text",
        content: `## Quadratische Ungleichungen

> Du kennst bereits lineare Ungleichungen. Jetzt wird es komplexer: **Quadratische Ungleichungen** haben die Form $ax^2 + bx + c > 0$. Die Lösung findest du mit dem **Tafel-Test** — erst Nullstellen bestimmen, dann Vorzeichen in den Intervallen prüfen!

> 🎬 **Essence of Algebra — Quadratic Formula** — https://www.youtube.com/watch?v=XMx9S35LfgQ — das Verständnis für quadratische Funktionen hilft dir, die Vorzeichen zu verstehen.

Quadratische Ungleichungen haben die Form $ax^2 + bx + c > 0$ (oder $< 0$, $\\leq$, $\\geq$).

## Lösungsweg

1. Zugehörige Gleichung $ax^2 + bx + c = 0$ lösen (Nullstellen)
2. Nullstellen auf dem Zahlenstrahl eintragen
3. Vorzeichen in den Intervallen bestimmen (Tafel-Test)
4. Lösungsmenge ablesen

### Beispiel 1

$x^2 - 5x + 6 > 0$

**Schritt 1:** $x^2 - 5x + 6 = (x-2)(x-3) = 0$

Nullstellen: $x_1 = 2$, $x_2 = 3$

**Schritt 2:** Intervalle testen:

| Intervall | $(x-2)$ | $(x-3)$ | Produkt |
|-----------|---------|---------|---------|
| $x < 2$ | $-$ | $-$ | $+$ ✓ |
| $2 < x < 3$ | $+$ | $-$ | $-$ |
| $x > 3$ | $+$ | $+$ | $+$ ✓ |

**Schritt 3:** Lösung: $x < 2$ oder $x > 3$

$L = (-\\infty, 2) \\cup (3, \\infty)$

### Beispiel 2

$x^2 - 4 \\leq 0$

$(x-2)(x+2) \\leq 0$

| Intervall | $(x+2)$ | $(x-2)$ | Produkt |
|-----------|---------|---------|---------|
| $x < -2$ | $-$ | $-$ | $+$ |
| $-2 < x < 2$ | $+$ | $-$ | $-$ ✓ |
| $x > 2$ | $+$ | $+$ | $+$ |

Lösung: $-2 \\leq x \\leq 2$ → $L = [-2, 2]$

### Tafel-Test (Vorzeichen)

Der Tafel-Test funktioniert immer:
1. Faktorisieren
2. Für jeden Faktor: Vorzeichen in jedem Intervall bestimmen
3. Produkt-Vorzeichen ablesen

> **Merke:** Nullstellen finden → Intervalle testen → Lösung ablesen!

> 🔗 **Weiter:** Alle Algebra-Grundlagen sind abgeschlossen! Du kennst jetzt Brüche, Gleichungen, Termumformung und Ungleichungen. Damit bist du bereit für die **Kurvendiskussion** — dort wirst du all diese Werkzeuge zusammen einsetzen!

> 🎓 **Fürs Erweitert:** In MA2 (Analysis) löst du Ungleichungen wie $f'(x) > 0$ (Monotonie) und $f''(x) > 0$ (Krümmung). Diese Techniken sind das tägliche Brot im Mathe-Erweitert!`,
      },
      {
        id: "m-ug-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Lineare Ungleichungen wie $2x + 3 > 7$ losen. Vorzeichenregel beachten und Losungsmenge angeben.`,
      },
      {
        id: "m-ug-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Quadratische Ungleichungen mit Fallunterscheidung und Intervallschreibweise. Betragsungleichungen verstehen.`,
      },
      {
        id: "m-ug-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Produkt- und Quotientenungleichungen mit Vorzeichentabelle. Bruchungleichungen und parametrische Falle.`,
      },
      {
        id: "m-ug-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Ungleichungen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-kurvendiskussion",
    slug: "mathe-kurvendiskussion",
    title: "Kurvendiskussion",
    description: "Vollständige Analyse einer Funktion: Nullstellen, Extrema, Wendepunkte",
    icon: "📈",
    color: "#8b5cf6",
    category: "analysis",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Kurvendiskussion

### Schema
1. Definitionsbereich bestimmen
2. Nullstellen: $f(x) = 0$
3. Ableitungen: $f'(x)$, $f''(x)$
4. Extrema: $f'(x) = 0$, dann $f''(x)$ prüfen
5. Wendepunkt: $f''(x) = 0$, dann $f'''(x) \\neq 0$
6. Monotonie: Vorzeichen von $f'(x)$
7. Krümmung: Vorzeichen von $f''(x)$

### Extrema
- **Minimum:** $f'(x_0) = 0$ und $f''(x_0) > 0$
- **Maximum:** $f'(x_0) = 0$ und $f''(x_0) < 0$`,
    lessons: [
      {
        id: "m-kd-1",
        title: "Definitionsbereich & Nullstellen",
        duration: "18 min",

        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x - 4 * x + 3, xRange: [-1, 5], yRange: [-2, 5], label: "f(x) = x² - 4x + 3", points: [{ x: 1, y: 0, label: "(1,0)" }, { x: 3, y: 0, label: "(3,0)" }] } },
        ],
        type: "text",
        content: `## Definitionsbereich & Nullstellen

> **Roter Faden:** Du kennst bereits [Ableitungen](/modules/mathe-ableitungen) und [Grenzwerte](/modules/mathe-grenzwerte). Jetzt setzen wir alles zusammen: Die vollständige Analyse einer Funktion beginnt hier — mit Definitionsbereich und Nullstellen.

Bevor man eine Funktion analysiert, muss man wissen, wo sie **definiert** ist und wo sie die x-Achse schneidet.

### Definitionsbereich (Domain)

Der Definitionsbereich ist die Menge aller x-Werte, für die $f(x)$ definiert ist.

### Einschränkungen

- **Nenner:** Darf nicht 0 sein → $q(x) \\neq 0$
- **Wurzel:** Argument muss $\\geq 0$ sein → $\\sqrt{g(x)}$ mit $g(x) \\geq 0$
- **Logarithmus:** Argument muss $> 0$ sein → $\\ln(g(x))$ mit $g(x) > 0$

### Beispiel 1

$f(x) = \\frac{1}{x-2}$

Nenner $\\neq 0$: $x - 2 \\neq 0 \\Rightarrow x \\neq 2$

$D_f = \\mathbb{R} \\setminus \{2\} = (-\\infty, 2) \\cup (2, \\infty)$

### Beispiel 2

$f(x) = \\sqrt{x-3}$

$x - 3 \\geq 0 \\Rightarrow x \\geq 3$

$D_f = [3, \\infty)$

## Nullstellen

Nullstellen sind die x-Werte, für die $f(x) = 0$.

### Beispiel 3

$f(x) = x^2 - 4$

$x^2 - 4 = 0 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$

Nullstellen: $x_1 = -2$, $x_2 = 2$

### Beispiel 4: Faktorisieren

$f(x) = x^3 - x = x(x^2 - 1) = x(x+1)(x-1)$

Nullstellen: $x_1 = -1$, $x_2 = 0$, $x_3 = 1$

> **Merke:** Erst Definitionsbereich prüfen, dann Nullstellen berechnen!

[PRACTICE_START]
**Aufgabe:** Bestimme Nullstellen von $f(x) = x^2 - 4x + 3$

**Lösung:** $x^2 - 4x + 3 = (x-1)(x-3) = 0$
$x_1 = 1$, $x_2 = 3$
[PRACTICE_END]`,
      },
      {
        id: "m-kd-2",
        title: "Extrema",
        duration: "20 min",

        visuals: [
          { type: "functionGraph" as const, props: { fn: (x: number) => x * x * x - 3 * x, xRange: [-2, 2], yRange: [-3, 3], label: "f(x) = x³ - 3x", points: [{ x: -1, y: 2, label: "Max(-1,2)" }, { x: 1, y: -2, label: "Min(1,-2)" }] } },
        ],
        type: "text",
        content: `## Extrema

> **Roter Faden:** Nach [Definitionsbereich & Nullstellen](/modules/mathe-kurvendiskussion) wissen wir, wo die Funktion existiert. Jetzt suchen wir die **Hoch- und Tiefpunkte** — hier werden die Ableitungen aus [Modul 4](/modules/mathe-ableitungen) zum zentralen Werkzeug.

Extrema sind die **Hoch- und Tiefpunkte** einer Funktion. Man findet sie mit der Ableitung.

### Notwendige Bedingung (1. Ableitung)

An Extremstellen gilt: $f'(x_0) = 0$

Das heißt: Die Tangente ist **horizontal**.

### Hinreichende Bedingung (2. Ableitung)

- $f''(x_0) > 0$ → **lokales Minimum** (U-Form)
- $f''(x_0) < 0$ → **lokales Maximum** (n-Form)
- $f''(x_0) = 0$ → unklar (höhere Ableitungen prüfen)

### Beispiel

$f(x) = x^3 - 3x + 2$

**Schritt 1:** $f'(x) = 3x^2 - 3 = 0$

$x^2 = 1 \\Rightarrow x = \\pm 1$

**Schritt 2:** $f''(x) = 6x$

$f''(-1) = -6 < 0$ → **Maximum** bei $(-1, 4)$

$f''(1) = 6 > 0$ → **Minimum** bei $(1, 0)$

**Schritt 3:** Werte berechnen

$f(-1) = -1 + 3 + 2 = 4$

$f(1) = 1 - 3 + 2 = 0$

### Absolute Extrema

Auf einem abgeschlossenen Intervall $[a, b]$:

1. Extrema im Inneren berechnen
2. Funktionswerte an den Rändern $f(a)$, $f(b)$ berechnen
3. Größter Wert = absolutes Maximum, kleinster = absolutes Minimum

### Beispiel 2

$f(x) = x^2$ auf $[-2, 3]$

$f'(x) = 2x = 0 \\Rightarrow x = 0$

$f(0) = 0$, $f(-2) = 4$, $f(3) = 9$

Absolutes Maximum: $f(3) = 9$

Absolutes Minimum: $f(0) = 0$

> **Merke:** $f'(x_0) = 0$ ist nur die **notwendige** Bedingung. Immer mit $f''$ prüfen!

[PRACTICE_START]
**Aufgabe:** Finde die Extrema von $f(x) = x^3 - 3x$

**Lösung:** $f'(x) = 3x^2 - 3 = 0$ → $x = \pm 1$
$f''(x) = 6x$. $f''(-1) = -6 < 0$ → Max bei $(-1, 2)$
$f''(1) = 6 > 0$ → Min bei $(1, -2)$
[PRACTICE_END]

> **Nächstes:** Im nächsten Kapitel analysieren wir die [Wendepunkte & Monotonie](/modules/mathe-kurvendiskussion) — Krümmungswechsel und Steigungsverhalten.`,
      },
      {
        id: "m-kd-3",
        title: "Wendepunkte & Monotonie",
        duration: "18 min",
        type: "text",
        content: `## Wendepunkte & Monotonie

> **Roter Faden:** Nach den [Extrema](/modules/mathe-kurvendiskussion) kennen wir Hoch- und Tiefpunkte. Jetzt fehlt noch: Wo ändert sich die **Krümmung**? Und wo steigt bzw. fällt die Funktion?

Nach den Extrema kommen die Wendepunkte — wo sich die **Krümmung** ändert.

### Wendepunkt

Ein Wendepunkt ist ein Punkt, an dem die Funktion von **linksgekrümmt** nach **rechtsgekrümmt** (oder umgekehrt) wechselt.

### Bedingung

$f''(x_0) = 0$ und $f'''(x_0) \\neq 0$

### Beispiel

$f(x) = x^3 - 3x + 2$

$f'(x) = 3x^2 - 3$

$f''(x) = 6x = 0 \\Rightarrow x = 0$

$f'''(0) = 6 \\neq 0$ → Wendepunkt!

$f(0) = 2$ → Wendepunkt bei $(0, 2)$

## Monotonie

Anhand von $f'(x)$ kann man sehen, ob die Funktion steigt oder fällt:

- $f'(x) > 0$: $f$ ist **steigend** ↗
- $f'(x) < 0$: $f$ ist **fallend** ↘
- $f'(x) = 0$: **Extremstelle** (oder Sattelpunkt)

### Beispiel 2

$f(x) = x^2 - 4x + 3$

$f'(x) = 2x - 4$

$f'(x) > 0 \\Rightarrow x > 2$ → $f$ steigt für $x > 2$

$f'(x) < 0 \\Rightarrow x < 2$ → $f$ fällt für $x < 2$

## Krümmung

Anhand von $f''(x)$:

- $f''(x) > 0$: **Linksgekrümmt** (U-Form, wie $x^2$)
- $f''(x) < 0$: **Rechtsgekrümmt** (n-Form, wie $-x^2$)

### Schema für Kurvendiskussion

1. Definitionsbereich
2. Nullstellen ($f(x) = 0$)
3. Extrema ($f'(x) = 0$, $f''(x)$ prüfen)
4. Wendepunkte ($f''(x) = 0$)
5. Monotonie (Vorzeichen von $f'(x)$)
6. Krümmung (Vorzeichen von $f''(x)$)

> **Merke:** Wendepunkt = Krümmungswechsel. Monotonie zeigt $f'$, Krümmung zeigt $f''$!

[GUIDED_START]
**Schritt-fuer-Schritt:** Fuehre eine vollstaendige Kurvendiskussion fuer $f(x) = x^3 - 3x + 2$ durch

**Schritt 1: Definitionsbereich:** $D = \mathbb{R}$ (Polynom)

**Schritt 2: Symmetrie:** Weder gerade noch ungerade

**Schritt 3: Nullstellen:** $x^3 - 3x + 2 = (x-1)^2(x+2) = 0$
$x_1 = 1$ (doppelt), $x_2 = -2$

**Schritt 4: Ableitungen:**
$f^{\prime}(x) = 3x^2 - 3 = 3(x-1)(x+1)$
$f^{\prime\prime}(x) = 6x$

**Schritt 5: Extrema:**
$f^{\prime}(x) = 0$ bei $x = 1$ und $x = -1$
$f^{\prime\prime}(-1) = -6 < 0$ -> Max bei $(-1, 4)$
$f^{\prime\prime}(1) = 6 > 0$ -> Min bei $(1, 0)$

**Schritt 6: Wendepunkt:**
$f^{\prime\prime}(x) = 0$ bei $x = 0$. $f(0) = 2$. Wendepunkt bei $(0, 2)$.
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Finde die Extrema von $f(x) = x^3 - 12x + 5$

**Loesung:** $f^{\prime}(x) = 3x^2 - 12 = 0$ -> $x = \pm 2$
$f^{\prime\prime}(-2) = -12 < 0$ -> Max bei $(-2, 21)$
$f^{\prime\prime}(2) = 12 > 0$ -> Min bei $(2, -11)$

**Aufgabe 2:** Finde den Wendepunkt von $f(x) = x^4 - 4x^3$

**Loesung:** $f^{\prime\prime}(x) = 12x^2 - 24x = 12x(x-2) = 0$ bei $x = 0$ und $x = 2$
Pruefe Vorzeichenwechsel -> Wendepunkte bei $(0, 0)$ und $(2, -16)$
[PRACTICE_END]`,
      },
      {
        id: "m-kd-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Nullstellen und Extremstellen einfacher Polynome bestimmen. Das Handwerkszeug der Kurvendiskussion.`,
      },
      {
        id: "m-kd-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Wendepunkte, Krummungsverhalten und Monotonieintervalle untersuchen. Vollstandige Funktionsanalyse durchfuhren.`,
      },
      {
        id: "m-kd-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Kurvendiskussion gebrochen-rationaler Funktionen mit Polstellen und Asymptoten. Steckbriefaufgaben ruckwarts losen.`,
      },
      {
        id: "m-kd-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Kurvendiskussion — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-lgs",
    slug: "mathe-gleichungssysteme",
    title: "Lineare Gleichungssysteme",
    description: "Gauß-Verfahren, Einsetzen, Addieren, Cramersche Regel",
    icon: "↔️",
    color: "#06b6d4",
    category: "lineare-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: LGS

### Verfahren
1. **Einsetzen:** Eine Gleichung nach einer Variable auflösen
2. **Addition:** Gleichungen addieren, um Variable zu eliminieren
3. **Gauß:** Stufenform durch Zeilenumformung

### Cramersche Regel (2×2)
$x = \\frac{D_x}{D}$, $y = \\frac{D_y}{D}$

### Anzahl Lösungen
- **1 Lösung:** Gleichungen schneiden sich
- **∞ Lösungen:** Gleichungen sind identisch
- **0 Lösungen:** Gleichungen sind parallel`,
    lessons: [
      {
        id: "m-lgs-1",
        title: "Einsetzungsverfahren",
        duration: "15 min",
        type: "text",
        content: `## Einsetzungsverfahren

> **Roter Faden:** Du kennst [Vektoren](/modules/mathe-vektoren) bereits. Lineare Gleichungssysteme sind der nächste Schritt — sie verbinden Vektoren mit Algebra. Das Gauß-Verfahren und die Matrizen bauen direkt darauf auf.

> 🎓 **Fürs Erweitert:** In MA3 (Lineare Algebra) wird Gauß das zentrale Werkzeug sein!

Das Einsetzungsverfahren ist eine Methode, um lineare Gleichungssysteme (LGS) zu lösen.

### Prinzip

1. Aus einer Gleichung eine Variable isolieren
2. In die andere Gleichung einsetzen
3. Ergebnis zurücksetzen

### Beispiel 1

$\\begin{cases} 2x + y = 7 \\ x - y = 1 \\end{cases}$

**Schritt 1:** Aus Gleichung 2: $x = y + 1$

**Schritt 2:** Einsetzen in Gleichung 1:

$2(y+1) + y = 7$

$2y + 2 + y = 7$

$3y = 5$

$y = \\frac{5}{3}$

**Schritt 3:** Rückeinsetzen:

$x = \\frac{5}{3} + 1 = \\frac{8}{3}$

**Probe:** $2 \\cdot \\frac{8}{3} + \\frac{5}{3} = \\frac{21}{3} = 7$ ✓

### Beispiel 2

$\\begin{cases} 3x + 2y = 12 \\ x - y = 1 \\end{cases}$

Aus Gleichung 2: $x = y + 1$

Einsetzen: $3(y+1) + 2y = 12$

$3y + 3 + 2y = 12$

$5y = 9$

$y = \\frac{9}{5} = 1{,}8$

$x = 1{,}8 + 1 = 2{,}8$

### Wann verwenden?

Das Einsetzungsverfahren ist gut, wenn eine Variable leicht isolierbar ist (Koeffizient 1 oder -1).

> **Merke:** Isolieren → Einsetzen → Zurücksetzen → Probe!

> 🔗 **Weiter:** Das Einsetzungsverfahren funktioniert gut für kleine Systeme. Für größere Systeme brauchst du das **Gauß-Verfahren** — die systematische Methode der Zeilenumformung!`,
      },
      {
        id: "m-lgs-2",
        title: "Gauß-Verfahren",
        duration: "20 min",
        type: "text",
        content: `## Gauß-Verfahren

> **Roter Faden:** Das [Einsetzungsverfahren](/modules/mathe-gleichungssysteme) funktioniert gut für kleine Systeme. Für größere Systeme brauchen wir das **Gauß-Verfahren** — die systematische Methode der Zeilenumformung.

> 🎓 **Fürs Erweitert:** Gauß ist DAS Werkzeug in der Linearen Algebra. Wer es hier versteht, hat im Erweitert einen riesigen Vorsprung!

Systematische Methode durch Zeilenumformung.

### Beispiel
$\\begin{cases} x + y + z = 6 \\ 2x - y + z = 3 \\ x + 2y - z = 2 \\end{cases}$

**Schritt 1:** Zeile 2 - 2·Zeile 1, Zeile 3 - Zeile 1

$\\begin{cases} x + y + z = 6 \\ -3y - z = -9 \\ y - 2z = -4 \\end{cases}$

**Schritt 2:** Zeile 3 + $\\frac{1}{3}$·Zeile 2

$\\begin{cases} x + y + z = 6 \\ -3y - z = -9 \\ -\\frac{7}{3}z = -7 \\end{cases}$

**Rückwärts:** $z = 3$, $y = 2$, $x = 1$



---

## Das Gauß-Verfahren -- Schritt fuer Schritt

### Algorithmus

1. **Elimination:** Verwende Zeile 1, um die erste Spalte in Zeile 2 und 3 zu 0 zu machen
2. **Fortsetzen:** Verwende Zeile 2, um die zweite Spalte in Zeile 3 zu 0 zu machen
3. **Ruecksubstitution:** Loese von unten nach oben auf

### Notation -- Erweiterte Koeffizientenmatrix

Das System $2x + y = 5$, $4x + 3y = 11$ wird zu:
$$\left(\begin{array}{cc|c} 2 & 1 & 5 \\ 4 & 3 & 11 \end{array}\right)$$

### Beispiel 2: System mit keiner Loesung

$x + y = 3$, $2x + 2y = 7$

$$\left(\begin{array}{cc|c} 1 & 1 & 3 \\ 2 & 2 & 7 \end{array}\right) \\xrightarrow{Z_2 - 2Z_1} \left(\begin{array}{cc|c} 1 & 1 & 3 \\ 0 & 0 & 1 \end{array}\right)$$

Zeile 2 sagt $0 = 1$ -> **Widerspruch!** Keine Loesung.

### Beispiel 3: System mit unendlich vielen Loesungen

$x + y = 3$, $2x + 2y = 6$

$$\left(\begin{array}{cc|c} 1 & 1 & 3 \\ 2 & 2 & 6 \end{array}\right) \\xrightarrow{Z_2 - 2Z_1} \left(\begin{array}{cc|c} 1 & 1 & 3 \\ 0 & 0 & 0 \end{array}\right)$$

Zeile 2 sagt $0 = 0$ -> immer wahr. $y = t$ (frei), $x = 3 - t$. **Unendlich viele Loesungen!**

> **Merke:** $0 = 0$ -> unendlich viele Loesungen. $0 = c$ (mit $c \neq 0$) -> keine Loesung.

[GUIDED_START]
**Schritt-fuer-Schritt:** Loese mit Gauss:
$x + 2y + z = 9$
$2x + 5y + 3z = 20$
$3x + 6y + 4z = 29$

**Schritt 1:** Erweiterte Matrix:
$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 9 \\ 2 & 5 & 3 & 20 \\ 3 & 6 & 4 & 29 \end{array}\right)$

**Schritt 2:** $Z_2 - 2Z_1$, $Z_3 - 3Z_1$:
$\left(\begin{array}{ccc|c} 1 & 2 & 1 & 9 \\ 0 & 1 & 1 & 2 \\ 0 & 0 & 1 & 2 \end{array}\right)$

**Schritt 3:** Ruecksubstitution:
$z = 2$
$y + 2 = 2$ -> $y = 0$
$x + 0 + 2 = 9$ -> $x = 7$

**Probe:** $7 + 0 + 2 = 9$, $14 + 0 + 6 = 20$, $21 + 0 + 8 = 29$
[GUIDED_END]

---

## Häufige Fehler

> **Achtung:** Beim Gauß-Verfahren gibt es typische Fehler, die dir das gesamte Ergebnis verderben können!

**1.** Zeilenoperation auf die **GESAMTE** Zeile anwenden (auch rechts vom Gleichheitszeichen!)
- Wenn du Zeile 2 minus 2 mal Zeile 1 rechnest, musst du das für **alle** Spalten tun — einschließlich der rechten Seite (nach dem Gleichheitszeichen).
- Fehlerquelle: Nur die Koeffizienten ändern, aber die Konstante vergessen.

**2.** Pivot = 0 → **Zeilen tauschen**, nicht aufgeben!
- Wenn das Pivotelement (diagonale Element) 0 ist, tausche die Zeile mit einer Zeile darunter, die ein Nicht-Null-Element hat.
- Wenn keine Zeile mehr tauschen kann: System ist unterbestimmt oder hat keine eindeutige Lösung.

**3.** $0 = 5$ → **keine Lösung**; $0 = 0$ → **unendlich viele Lösungen**
- $0 = c$ mit $c \\neq 0$ bedeutet **Widerspruch** — das System ist unlösbar.
- $0 = 0$ ist immer wahr — es gibt eine freie Variable, also unendlich viele Lösungen.

[PRACTICE_START]
**Aufgabe 1:** Loese mit Gauss: $x + y = 5$, $3x - y = 1$

**Loesung:** $Z_2 - 3Z_1$: $-4y = -14$ -> $y = 3{,}5$. Dann $x = 1{,}5$.

**Aufgabe 2:** Hat das System $x + y = 2$, $2x + 2y = 5$ eine Loesung?

**Loesung:** $Z_2 - 2Z_1$: $0 = 1$ -> Widerspruch, keine Loesung!
[PRACTICE_END]

[PRACTICE_START]
**Aufgabe:** Löse mit Gauß: $x + y = 3$, $2x - y = 0$

**Lösung:**
Zeile 2 - 2×Zeile 1: $0x - 3y = -6$ → $y = 2$
Einsetzen: $x + 2 = 3$ → $x = 1$
Probe: $1+2=3$ ✓, $2-2=0$ ✓
[PRACTICE_END]

> 🔗 **Verwandt:** Das Gauß-Verfahren ist die systematische Methode für große LGS. Damit bist du bereit für **Matrizen & Determinanten** — denn Gauß lässt sich elegant als Matrix-Operationen formulieren!`,
      },
      {
        id: "m-lgs-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `2 Gleichungen mit 2 Unbekannten per Einsetzungs- oder Additionsverfahren losen.`,
      },
      {
        id: "m-lgs-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `3x3-Systeme mit dem Gauss-Verfahren losen. Losbarkeit anhand der Matrix-Range beurteilen.`,
      },
      {
        id: "m-lgs-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Uberbestimmte und unterbestimmte Systeme. Parametrische Losungen in Vektorform darstellen.`,
      },
      {
        id: "m-lgs-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Lineare Gleichungssysteme — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-matrizen",
    slug: "mathe-matrizen",
    title: "Matrizen & Determinanten",
    description: "Matrix-Operationen, Determinanten, Inverse Matrix",
    icon: "🔢",
    color: "#a855f7",
    category: "lineare-algebra",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Matrizen

### Operationen
- **Addition:** $(A+B)_{ij} = a_{ij} + b_{ij}$
- **Multiplikation:** $(AB)_{ij} = \\sum_k a_{ik} b_{kj}$
- **Transponiert:** $(A^T)_{ij} = a_{ji}$

### Determinante (2×2)
$\\det\\begin{pmatrix}a&b\\c&d\\end{pmatrix} = ad - bc$

### Inverse (2×2)
$A^{-1} = \\frac{1}{\\det A} \\begin{pmatrix}d&-b\\-c&a\\end{pmatrix}$`,
    lessons: [
      {
        id: "m-ma-1",
        title: "Matrix-Operationen",
        duration: "18 min",
        type: "text",
        content: `## Matrix-Operationen

> **Roter Faden:** Aus den [Linearen Gleichungssystemen](/modules/mathe-gleichungssysteme) und den [Vektoren](/modules/mathe-vektoren) ergibt sich ein neues Werkzeug: die **Matrix**. Sie ist die systematische Art, lineare Gleichungen zu schreiben und zu lösen.

> 🎓 **Fürs Erweitert:** Matrizen sind das Herzstück von MA3. Wer sie hier versteht, hat im Erweitert einen riesigen Vorsprung!

Eine Matrix ist ein rechteckiges Zahlenfeld in Zeilen und Spalten.

### Notation
$A = \\begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \\end{pmatrix}$

Die Matrix hat 2 Zeilen und 2 Spalten → $2 \\times 2$-Matrix.

### Addition

Matrizen gleicher Dimension werden elementweise addiert:

$\\begin{pmatrix} 1 & 2 \\ 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 5 & 6 \\ 7 & 8 \\end{pmatrix} = \\begin{pmatrix} 6 & 8 \\ 10 & 12 \\end{pmatrix}$

### Skalarmultiplikation

$2 \\cdot \\begin{pmatrix} 1 & 2 \\ 3 & 4 \\end{pmatrix} = \\begin{pmatrix} 2 & 4 \\ 6 & 8 \\end{pmatrix}$

### Matrixmultiplikation

$(AB)_{ij} = \\sum_{k=1}^{n} a_{ik} \\cdot b_{kj}$

**Beispiel:**

$\\begin{pmatrix} 1 & 2 \\ 3 & 4 \\end{pmatrix} \\cdot \\begin{pmatrix} 5 & 6 \\ 7 & 8 \\end{pmatrix}$

$(AB)_{11} = 1 \\cdot 5 + 2 \\cdot 7 = 19$

$(AB)_{12} = 1 \\cdot 6 + 2 \\cdot 8 = 22$

$(AB)_{21} = 3 \\cdot 5 + 4 \\cdot 7 = 43$

$(AB)_{22} = 3 \\cdot 6 + 4 \\cdot 8 = 50$

**Ergebnis:** $\\begin{pmatrix} 19 & 22 \\ 43 & 50 \\end{pmatrix}$

### Transposition

$A^T$: Zeilen werden zu Spalten

$\\begin{pmatrix} 1 & 2 \\ 3 & 4 \\end{pmatrix}^T = \\begin{pmatrix} 1 & 3 \\ 2 & 4 \\end{pmatrix}$

> **Merke:** Matrixmultiplikation ist NICHT kommutativ: $AB \\neq BA$ im Allgemeinen!`,
      },
      {
        id: "m-ma-2",
        title: "Determinanten & Inverse",
        duration: "20 min",
        type: "text",
        content: `## Determinanten & Inverse

> **Roter Faden:** Nach den [Matrix-Operationen](/modules/mathe-matrizen) (Addition, Multiplikation) fehlt noch die **Determinante** — eine einzige Zahl, die verrät, ob eine Matrix invertierbar ist. Das ist der Schlüssel zum Lösen von Gleichungssystemen!

> 🎬 **The Determinant** — https://www.youtube.com/watch?v=Ip3X9LOh2dk — warum die Determinante die "Stauchung" eines Raumes misst.

Die Determinante ist eine Zahl, die aus einer quadratischen Matrix berechnet wird. Sie sagt aus, ob die Matrix invertierbar ist.

### Determinante (2×2)

$\\det(A) = \\det\\begin{pmatrix} a & b \\ c & d \\end{pmatrix} = ad - bc$

### Beispiel 1

$\\det\\begin{pmatrix} 3 & 1 \\ 2 & 4 \\end{pmatrix} = 3 \\cdot 4 - 1 \\cdot 2 = 12 - 2 = 10$

### Determinante (3×3)

Für eine $3 \\times 3$-Matrix wird nach der **Sarrus-Regel** oder **Laplace-Entwicklung** berechnet.

### Inverse Matrix

$A \\cdot A^{-1} = I$ (Einheitsmatrix)

Für $2 \\times 2$:

$A^{-1} = \\frac{1}{\\det(A)} \\begin{pmatrix} d & -b \\ -c & a \\end{pmatrix}$

### Beispiel 2

$A = \\begin{pmatrix} 3 & 1 \\ 2 & 4 \\end{pmatrix}$, $\\det(A) = 10$

$A^{-1} = \\frac{1}{10} \\begin{pmatrix} 4 & -1 \\ -2 & 3 \\end{pmatrix} = \\begin{pmatrix} 0{,}4 & -0{,}1 \\ -0{,}2 & 0{,}3 \\end{pmatrix}$

### Wann existiert die Inverse?

Nur wenn $\\det(A) \\neq 0$! Ist $\\det(A) = 0$, heißt die Matrix **singulär**.

### Anwendung: LGS lösen

$A \\vec{x} = \\vec{b} \\Rightarrow \\vec{x} = A^{-1} \\vec{b}$

> **Merke:** det = 0 → keine Inverse → LGS hat keine oder unendlich viele Lösungen!

> **Nächstes:** Matrizen und Determinanten sind auch in der [Analytischen Geometrie](/modules/mathe-analytische-geometrie) zentral — bei Geraden und Ebenen im Raum.`,
      },
      {
        id: "m-ma-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Matrizen addieren und mit Skalaren multiplizieren. Determinante einer $2\times2$-Matrix berechnen.`,
      },
      {
        id: "m-ma-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Matrix-Multiplikation und ihre Regeln verstehen. Inverse einer $2\times2$-Matrix mit der Adjunkten-Formel.`,
      },
      {
        id: "m-ma-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Determinanten grosserer Matrizen, Cramersche Regel und Eigenwerte. Matrizen in Anwendungskontexten.`,
      },
      {
        id: "m-ma-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Matrizen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-verteilungen",
    slug: "mathe-wahrscheinlichkeitsverteilungen",
    title: "Wahrscheinlichkeitsverteilungen",
    description: "Binomialverteilung, Normalverteilung, Poisson-Verteilung",
    icon: "📊",
    color: "#f59e0b",
    category: "stochastik",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Verteilungen

### Binomialverteilung
$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$
$E(X) = np$, $Var(X) = np(1-p)$

### Normalverteilung
$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$

### Poisson-Verteilung
$P(X=k) = \\frac{\\lambda^k}{k!} e^{-\\lambda}$
$E(X) = \\lambda$`,
    lessons: [
      {
        id: "m-vt-1",
        title: "Binomialverteilung",
        duration: "20 min",
        type: "text",
        content: `## Binomialverteilung

> **Roter Faden:** Du kennst bereits die Grundlagen der [Stochastik](/modules/mathe-stochastik). Jetzt geht es um **Verteilungen** — die beschreiben, wie Wahrscheinlichkeiten über verschiedene Ergebnisse verteilt sind. Die Binomialverteilung ist die wichtigste diskrete Verteilung.

Die Binomialverteilung modelliert die Anzahl **erfolgreicher** Versuche bei $n$ unabhängigen Experimenten.

### Voraussetzungen

- **n** feste Versuche
- Jeder Versuch: **Erfolg** (Wahrscheinlichkeit $p$) oder **Misserfolg** ($1-p$)
- Versuche sind **unabhängig**
- **p** ist konstant

### Formel

$$P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$$

### Beispiel 1: Münzwurf

Münze 5-mal werfen. Wie wahrscheinlich sind genau 3 Köpfe?

$P(X=3) = \\binom{5}{3} (0{,}5)^3 (0{,}5)^2 = 10 \\cdot 0{,}125 \\cdot 0{,}25 = 0{,}3125$

Also ca. 31%.

### Beispiel 2: Würfel

Würfel 10-mal. Wie wahrscheinlich sind genau 2 Sechsen?

$P(X=2) = \\binom{10}{2} \\left(\\frac{1}{6}\\right)^2 \\left(\\frac{5}{6}\\right)^8$

$= 45 \\cdot 0{,}0278 \\cdot 0{,}2326 \\approx 0{,}2907$

### Erwartungswert & Varianz

$E(X) = np$

$Var(X) = np(1-p)$

### Beispiel 3

Münze 100-mal: $E(X) = 100 \\cdot 0{,}5 = 50$ Köpfe

$Var(X) = 100 \\cdot 0{,}5 \\cdot 0{,}5 = 25$, $\\sigma = 5$

### Binomialkoeffizient

$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$

$\\binom{5}{3} = \\frac{5!}{3! \\cdot 2!} = \\frac{120}{6 \\cdot 2} = 10$

> **Merke:** Binomialverteilung zählt Erfolge bei n Versuchen. $E(X) = np$ ist der erwartete Mittelwert!`,
      },
      {
        id: "m-vt-2",
        title: "Normalverteilung",
        duration: "20 min",
        type: "text",
        content: `## Normalverteilung

> **Roter Faden:** Die [Binomialverteilung](/modules/mathe-wahrscheinlichkeitsverteilungen) ist diskret — endlich viele Ergebnisse. Die **Normalverteilung** ist ihr stetiges Gegenstück: eine Glockenkurve, die überall in der Natur vorkommt.

> 🎓 **Fürs Erweitert:** Der Zentrale Grenzwertsatz (warum die Normalverteilung überall auftaucht) ist eines der mächtigsten Ergebnisse der Stochastik!

Die Normalverteilung ist die wichtigste **stetige** Verteilung. Sie beschreibt viele natürliche Phänomene: Körpergröße, Messfehler, IQ.

### Glockenkurve

Die Dichtefunktion ist eine symmetrische Glocke:

$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$

### Parameter

- $\\mu$: Mittelwert (Verschiebung)
- $\\sigma$: Standardabweichung (Breite)

### 68-95-99,7-Regel

- **68%** der Werte liegen in $\\mu \\pm \\sigma$
- **95%** in $\\mu \\pm 2\\sigma$
- **99,7%** in $\\mu \\pm 3\\sigma$

### Beispiel

Körpergröße: $\\mu = 175$ cm, $\\sigma = 7$ cm

- 68% sind zwischen 168 und 182 cm groß
- 95% sind zwischen 161 und 189 cm
- 99,7% sind zwischen 154 und 196 cm

### Standardnormalverteilung

$Z = \\frac{X - \\mu}{\\sigma}$ → $\\mu = 0$, $\\sigma = 1$

### Beispiel 2

IQ: $\\mu = 100$, $\\sigma = 15$

$P(X > 130) = P\\left(Z > \\frac{130-100}{15}\\right) = P(Z > 2) \\approx 2{,}5\%$

### Warum so wichtig?

Nach dem **Zentralen Grenzwertsatz** nähert sich die Summe vieler unabhängiger Zufallsvariablen der Normalverteilung an — egal, welche Verteilung die einzelnen haben!

> **Merke:** Normalverteilung = Glockenkurve. 68-95-99,7 ist die wichtigste Faustregel!

> **Nächstes:** Die [Statistik](/modules/mathe-statistik) zeigt dir, wie man mit Daten arbeitet — Verteilungen sind dort das Fundament.`,
      },
      {
        id: "m-vt-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Binomialverteilung: $P(X=k)$ fur kleine $n$ mit der Bernoulli-Formel. Erwartungswert $E(X)=np$.`,
      },
      {
        id: "m-vt-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Kumulierte Wahrscheinlichkeiten und die Sigma-Regeln fur die Normalverteilung. Poisson-Verteilung als Naherung.`,
      },
      {
        id: "m-vt-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Hypothesentests mit Signifikanzniveau, Annahme- und Verwerfungsbereich. Normalverteilung standardisieren und Tabellen nutzen.`,
      },
      {
        id: "m-vt-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Wahrscheinlichkeitsverteilungen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-folgen",
    slug: "mathe-folgen-reihen",
    title: "Folgen & Reihen",
    description: "Arithmetische/geometrische Folgen und Reihen, Konvergenz",
    icon: "♾️",
    color: "#ec4899",
    category: "analysis",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Folgen & Reihen

### Arithmetische Folge
$a_n = a_1 + (n-1) \\cdot d$
$S_n = \\frac{n}{2}(a_1 + a_n)$

### Geometrische Folge
$a_n = a_1 \\cdot q^{n-1}$
$S_n = a_1 \\cdot \\frac{1-q^n}{1-q}$ (für $q \\neq 1$)

### Geometrische Reihe (unendlich)
$S = \\frac{a_1}{1-q}$ (nur für $|q| < 1$)`,
    lessons: [
      {
        id: "m-fr-1",
        title: "Arithmetische Folgen",
        duration: "15 min",
        type: "text",
        content: `## Arithmetische Folgen

> **Roter Faden:** Mit Folgen und Reihen beginnt ein neuer Bereich der Analysis. Die arithmetische Folge ist der einfachste Fall — ein konstanter Abstand zwischen den Gliedern. Später folgen geometrische Folgen und die Verbindung zu [Reihen](/modules/mathe-reihen).

Eine arithmetische Folge hat einen **konstanten Abstand** $d$ zwischen aufeinanderfolgenden Gliedern.

### Formel

$$a_n = a_1 + (n-1) \\cdot d$$

### Beispiel 1

$3, 7, 11, 15, 19, ...$ → $a_1 = 3$, $d = 4$

$a_5 = 3 + (5-1) \\cdot 4 = 3 + 16 = 19$

### Beispiel 2

Gerade Zahlen: $2, 4, 6, 8, ...$ → $a_1 = 2$, $d = 2$

$a_{10} = 2 + 9 \\cdot 2 = 20$

## Partialsumme

Die Summe der ersten $n$ Glieder:

$$S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}(2a_1 + (n-1)d)$$

### Beispiel 3: Gauß'sche Summenformel

$1 + 2 + 3 + ... + 100 = ?$

$S_{100} = \\frac{100}{2}(1 + 100) = 50 \\cdot 101 = 5050$

### Beispiel 4

$5 + 8 + 11 + 14 + 17 = ?$

$S_5 = \\frac{5}{2}(5 + 17) = \\frac{5}{2} \\cdot 22 = 55$

## Wichtige Eigenschaften

- **Differenz:** $a_{n+1} - a_n = d$ (konstant)
- **Graphisch:** Punkte liegen auf einer Geraden
- **Summe:** Wächst quadratisch mit $n$

> **Merke:** Arithmetische Folge = gleicher Abstand, Partialsumme = Durchschnitt × Anzahl!

[PRACTICE_START]
**Aufgabe:** $a_1 = 3$, $d = 4$. Berechne $a_{10}$ und $S_{10}$.

**Lösung:**
$a_{10} = 3 + 9 \cdot 4 = 39$
$S_{10} = \frac{10}{2}(3 + 39) = 5 \cdot 42 = 210$
[PRACTICE_END]`,
      },
      {
        id: "m-fr-2",
        title: "Geometrische Folgen & Reihen",
        duration: "18 min",
        type: "text",
        content: `## Geometrische Folgen & Reihen

> **Roter Faden:** Die [arithmetische Folge](/modules/mathe-folgen-reihen) hat einen konstanten Abstand. Jetzt kommt die **geometrische Folge** — ein konstanter **Faktor**. Das führt uns direkt zu den [Reihen](/modules/mathe-reihen) und später zu den [Taylorreihen](/modules/mathe-taylorreihen).

Eine geometrische Folge hat einen **konstanten Faktor** $q$ zwischen aufeinanderfolgenden Gliedern.

### Formel

$$a_n = a_1 \\cdot q^{n-1}$$

### Beispiel 1

$2, 6, 18, 54, ...$ → $a_1 = 2$, $q = 3$

$a_4 = 2 \\cdot 3^3 = 2 \\cdot 27 = 54$

### Beispiel 2: Halbwertszeit

1000g einer Substanz, Halbwertszeit = 5 Jahre:

$a_n = 1000 \\cdot \\left(\\frac{1}{2}\\right)^{n/5}$

Nach 15 Jahren: $a_3 = 1000 \\cdot \\frac{1}{8} = 125g$

## Geometrische Reihe (endlich)

$$S_n = a_1 \\cdot \\frac{1-q^n}{1-q}$$ (für $q \\neq 1$)

### Beispiel 3

$1 + 2 + 4 + 8 + 16 = ?$

$S_5 = 1 \\cdot \\frac{1-2^5}{1-2} = \\frac{1-32}{-1} = 31$

## Unendliche geometrische Reihe

Wenn $|q| < 1$, dann konvergiert die Reihe:

$$S_\\infty = \\frac{a_1}{1-q}$$

### Beispiel 4

$1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\cdots$

$S_\\infty = \\frac{1}{1-\\frac{1}{2}} = 2$

### Beispiel 5: Periodische Dezimalzahlen

$0{,}333... = \\frac{3}{10} + \\frac{3}{100} + \\frac{3}{1000} + \\cdots = \\frac{\\frac{3}{10}}{1-\\frac{1}{10}} = \\frac{3}{9} = \\frac{1}{3}$

> **Merke:** Geometrische Folge = gleicher Faktor. Unendliche Reihe konvergiert nur wenn $|q| < 1$!

[PRACTICE_START]
**Aufgabe:** $a_1 = 2$, $q = 3$. Berechne $a_5$ und $S_5$.

**Lösung:**
$a_5 = 2 \cdot 3^4 = 162$
$S_5 = 2 \cdot \frac{3^5 - 1}{3 - 1} = 2 \cdot \frac{242}{2} = 242$
[PRACTICE_END]

> **Nächstes:** Geometrische Reihen mit $|q| < 1$ konvergieren — das ist der Schlüssel zu den [Reihen](/modules/mathe-reihen) und später zu den [Taylorreihen](/modules/mathe-taylorreihen).`,
      },
      {
        id: "m-fr-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Arithmetische Folgen: $a_n = a_1 + (n-1)d$. Endliche Summen mit der Gauss-Formel berechnen.`,
      },
      {
        id: "m-fr-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Geometrische Folgen und Reihen — unendliche Summe fur $|q|<1$. Monotonie und Beschranktheit prufen.`,
      },
      {
        id: "m-fr-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Konvergenzbeweise mit Epsilon-Kriterium. Haufungspunkte, Limsup/Liminf und Cauchy-Folgen.`,
      },
      {
        id: "m-fr-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Folgen & Reihen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-anageo",
    slug: "mathe-analytische-geometrie",
    title: "Analytische Geometrie",
    description: "Geraden, Ebenen, Abstände im Raum",
    icon: "📏",
    color: "#06b6d4",
    category: "geometrie",
    progress: 0,
    merkblatt: `## 📋 Merkblatt: Analytische Geometrie

### Gerade im Raum
$\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$

### Ebene
$\\vec{n} \\cdot (\\vec{x} - \\vec{p}) = 0$ oder $ax + by + cz = d$

### Abstand Punkt-Ebene
$d = \\frac{|\\vec{n} \\cdot (\\vec{a} - \\vec{p})|}{|\\vec{n}|}$

### Abstand Punkt-Gerade
$d = \\frac{|\\vec{v} \\times (\\vec{a} - \\vec{p})|}{|\\vec{v}|}$`,
    lessons: [
      {
        id: "m-ag-1",
        title: "Geraden im Raum",
        duration: "20 min",
        type: "text",
        content: `## Geraden im Raum

> **Roter Faden:** Du kennst [Vektoren](/modules/mathe-vektoren) und [Lineare Gleichungssysteme](/modules/mathe-gleichungssysteme). Jetzt bringt die **Analytische Geometrie** beides zusammen: Geraden und Ebenen im 3D-Raum werden durch Vektoren beschrieben.

> 🎓 **Fürs Erweitert:** Geraden und Ebenen im Raum werden in MA3 drankommen — zusammen mit Vektorräumen.

Im dreidimensionalen Raum werden Geraden durch einen **Stützvektor** und einen **Richtungsvektor** beschrieben.

### Parameterform

$$\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$$

- $\\vec{p}$: Stützvektor (Punkt auf der Geraden)
- $\\vec{v}$: Richtungsvektor (Richtung der Geraden)
- $t$: Parameter (reelle Zahl)

### Beispiel 1

$\\vec{x} = \\begin{pmatrix}1\\2\\3\\end{pmatrix} + t \\cdot \\begin{pmatrix}2\\-1\\1\\end{pmatrix}$

Für $t = 0$: Punkt $(1, 2, 3)$

Für $t = 1$: Punkt $(1+2, 2-1, 3+1) = (3, 1, 4)$

Für $t = -1$: Punkt $(1-2, 2+1, 3-1) = (-1, 3, 2)$

### Koordinatenform

Aus der Parameterform erhält man die Koordinatengleichungen:

$x = 1 + 2t$, $y = 2 - t$, $z = 3 + t$

### Schnitt zweier Geraden

Gleichsetzen und $t_1$, $t_2$ lösen:

$\\vec{p}_1 + t_1 \\vec{v}_1 = \\vec{p}_2 + t_2 \\vec{v}_2$

### Beispiel 2

$g_1: \\vec{x} = \\begin{pmatrix}0\\0\\0\\end{pmatrix} + t \\begin{pmatrix}1\\1\\0\\end{pmatrix}$

$g_2: \\vec{x} = \\begin{pmatrix}1\\0\\0\\end{pmatrix} + s \\begin{pmatrix}0\\1\\0\\end{pmatrix}$

Gleichsetzen: $t = 1$, $t + 0 = 0 + s$ → $s = 1$

Schnittpunkt: $(1, 1, 0)$

### Lagebeziehungen

- **Schnitt:** Genau ein Punkt (Gleichungssystem lösbar)
- **Parallel:** $\\vec{v}_1 = k \\cdot \\vec{v}_2$ (Richtungsvektoren proportional)
- **Windschief:** Weder parallel noch sich schneidend

> **Merke:** Gerade im Raum = Punkt + Richtung × Parameter. Schnitt = Gleichungssystem lösen!`,
      },
      {
        id: "m-ag-2",
        title: "Ebenen im Raum",
        duration: "20 min",
        type: "text",
        content: `## Ebenen im Raum

> **Roter Faden:** Nach den [Geraden im Raum](/modules/mathe-analytische-geometrie) folgt die nächste Dimension: **Ebenen**. Sie werden durch einen Punkt und zwei Richtungsvektoren (oder einen Normalenvektor) beschrieben — und erfordern das Gauß-Verfahren aus [Modul 20](/modules/mathe-gleichungssysteme).

Eine Ebene im dreidimensionalen Raum wird durch einen Punkt und zwei Richtungsvektoren (oder einen Normalenvektor) beschrieben.

### Parameterform

$$\\vec{x} = \\vec{p} + r \\cdot \\vec{u} + s \\cdot \\vec{v}$$

- $\\vec{p}$: Stützvektor (Punkt auf der Ebene)
- $\\vec{u}$, $\\vec{v}$: Richtungsvektoren (linear unabhängig)
- $r$, $s$: Parameter

### Beispiel 1

$\\vec{x} = \\begin{pmatrix}1\\2\\3\\end{pmatrix} + r \\begin{pmatrix}1\\0\\0\\end{pmatrix} + s \\begin{pmatrix}0\\1\\0\\end{pmatrix}$

Das ist die Ebene $z = 3$ (parallel zur xy-Ebene).

### Koordinatenform

$$ax + by + cz = d$$

$\\vec{n} = \\begin{pmatrix}a\\b\\c\\end{pmatrix}$ ist der **Normalenvektor** (senkrecht zur Ebene).

### Beispiel 2

$2x - y + 3z = 6$

Normalenvektor: $\\vec{n} = (2, -1, 3)$

Punkt auf der Ebene: $x=3, y=0, z=0$ → $6 = 6$ ✓

### Umrechnung

**Parameter → Koordinaten:** Normalenvektor = Kreuzprodukt $\\vec{u} \\times \\vec{v}$

**Koordinaten → Parameter:** Zwei linear unabhängige Vektoren senkrecht zu $\\vec{n}$ finden.

### Abstand Punkt-Ebene

$$d = \\frac{|ax_0 + by_0 + cz_0 - d|}{\\sqrt{a^2 + b^2 + c^2}}$$

### Beispiel 3

Abstand $(1, 2, 3)$ zur Ebene $2x - y + 3z = 6$:

$d = \\frac{|2 - 2 + 9 - 6|}{\\sqrt{4+1+9}} = \\frac{3}{\\sqrt{14}} \\approx 0{,}80$

> **Merke:** Ebene = Punkt + 2 Richtungen. Normalenvektor steht senkrecht drauf!

> **Nächstes:** Die [Prozent- & Zinsrechnung](/modules/mathe-prozent-zinsen) bringt uns zurück in die Anwendung — wo Mathe im Alltag begegnet.`,
      },
      {
        id: "m-ag-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Geraden in Parameterform aufstellen und Punkte einsetzen. Stutz- und Richtungsvektor erkennen.`,
      },
      {
        id: "m-ag-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Ebenen in Koordinaten- und Parameterform umwandeln. Spurpunkte und Achsenabschnitte bestimmen.`,
      },
      {
        id: "m-ag-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Abstande Punkt-Gerade und Punkt-Ebene mit der Hesseschen Normalform. Lagebeziehungen und Schnittwinkel.`,
      },
      {
        id: "m-ag-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Analytische Geometrie — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },

  {
    id: "m-prozent",
    slug: "mathe-prozent-zinsen",
    title: "Prozent- & Zinsrechnung",
    description: "Prozente, Zinsen, Zinseszins, Prozentuale Änderungen",
    icon: "💰",
    color: "#10b981",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## Merkblatt: Prozent- & Zinsrechnung

### Prozentwert
$p = W \\cdot \\frac{p\%}{100}$

### Zinsen
$Z = K \\cdot \\frac{p}{100} \\cdot \\frac{n}{12}$

### Zinseszins
$K_n = K_0 \\cdot (1 + \\frac{p}{100})^n$`,
    lessons: [
      {
        id: "m-pz-1",
        title: "Prozentrechnung",
        duration: "15 min",
        type: "text",
        content: `## Prozentrechnung

> **Roter Faden:** Die Prozentrechnung ist ein Grundlagenwerkzeug, das überall im Alltag auftaucht — von Rabatten bis zu Steuern. Im nächsten Kapitel wird sie zur **Zinsrechnung** erweitert, wo Potenzen aus [Modul 13](/modules/mathe-potenzen) ins Spiel kommen.

Prozente begegnen uns überall: Rabatte, Steuern, Zinsen. Die Grundformel ist einfach.

### Grundbegriffe

- **Grundwert (G):** Die Gesamtmenge (100%)
- **Prozentsatz (p%):** Der Anteil in Prozent
- **Prozentwert (W):** Der absolute Anteil

### Grundformel

$$W = G \\cdot \\frac{p}{100}$$

### Beispiel 1: Prozentwert berechnen

20% von 150€?

$W = 150 \\cdot \\frac{20}{100} = 150 \\cdot 0{,}2 = 30€$

### Beispiel 2: Prozentualer Anteil

30 von 200 — wie viel Prozent?

$p = \\frac{W}{G} \\cdot 100 = \\frac{30}{200} \\cdot 100 = 15\%$

### Beispiel 3: Grundwert berechnen

40 sind 25% von was?

$G = \\frac{W \\cdot 100}{p} = \\frac{40 \\cdot 100}{25} = 160$

## Prozentuale Änderung

$\\text{Änderung} = \\frac{\\text{Neu} - \\text{Alt}}{\\text{Alt}} \\cdot 100\%$

### Beispiel 4: Preissteigerung

Preis steigt von 80€ auf 100€:

$\\frac{100 - 80}{80} \\cdot 100\% = \\frac{20}{80} \\cdot 100\% = 25\%$

### Beispiel 5: Rabatt

20% Rabatt auf 120€:

$120 \\cdot 0{,}2 = 24€$ Rabatt

$120 - 24 = 96€$ Endpreis

> **Merke:** Prozentwert = Grundwert × Prozentsatz / 100. Die drei Formeln kann man alle aus der Grundformel ableiten!

[PRACTICE_START]
**Aufgabe:** 80€ + 19% MwSt = ?

**Lösung:** $80 \cdot 1{,}19 = 95{,}20€$
[PRACTICE_END]

> 🔗 **Weiter:** Prozentrechnung sitzt! Jetzt wird sie zur **Zinsrechnung** erweitert — und mit dem Zinseszins wird Potenzrechnung zum entscheidenden Werkzeug.`,
      },
      {
        id: "m-pz-2",
        title: "Zinsen & Zinseszins",
        duration: "18 min",
        type: "text",
        content: `## Zinsen & Zinseszins

> **Roter Faden:** Nach der [Prozentrechnung](/modules/mathe-prozent-zinsen) kommt die **Zinsrechnung** — und mit dem Zinseszins wird Potenzrechnung aus [Modul 13](/modules/mathe-potenzen) zum entscheidenden Werkzeug. Die 72er-Regel ist eine elegante Faustregel!

Zinsen sind der "Preis" für geliehenes Geld. Bei Zinseszinsen wächst das Geld exponentiell.

## Einfache Zinsen

$$Z = K \\cdot \\frac{p}{100} \\cdot \\frac{n}{12}$$

- $K$: Kapital
- $p$: Zinssatz (pro Jahr)
- $n$: Monate

### Beispiel 1

5000€ zu 4% für 6 Monate:

$Z = 5000 \\cdot \\frac{4}{100} \\cdot \\frac{6}{12} = 5000 \\cdot 0{,}04 \\cdot 0{,}5 = 100€$

## Zinseszins

Bei Zinseszinsen werden die Zinsen **mitverzinst** — das Geld wächst exponentiell!

$$K_n = K_0 \\cdot \\left(1 + \\frac{p}{100}\\right)^n$$

### Beispiel 2

1000€ zu 5% über 3 Jahre:

$K_3 = 1000 \\cdot 1{,}05^3 = 1000 \\cdot 1{,}157625 = 1157{,}63€$

Ohne Zinseszins wären es nur $1000 + 150 = 1150€$ — die 7,63€ Unterschied kommen von den Zinsen auf die Zinsen!

## Verdopplungszeit (72er-Regel)

$t \\approx \\frac{72}{p}$

Bei 6% Zinsen: $t \\approx \\frac{72}{6} = 12$ Jahre bis zur Verdopplung.

### Beispiel 3

10.000€ zu 8% — wann verdoppelt?

$t \\approx \\frac{72}{8} = 9$ Jahre → $K_9 \\approx 10000 \\cdot 1{,}08^9 \\approx 19{,}990€$

> **Merke:** Einfache Zinsen = linear, Zinseszins = exponentiell. Die 72er-Regel ist eine schnelle Faustregel!

[PRACTICE_START]
**Aufgabe:** 1000€ zu 5% Zinsen nach 3 Jahren (einfach)?

**Lösung:** $K_3 = 1000 \cdot (1 + 3 \cdot 0{,}05) = 1000 \cdot 1{,}15 = 1150€$
[PRACTICE_END]

> 🔗 **Verwandt:** Prozent- und Zinsrechnung verbindet Mathematik mit dem Alltag. Im Modul **Körper & Volumen** geht es zurück in die Geometrie — mit 3D-Formen und Volumenberechnungen!`,
      },
      {
        id: "m-pz-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Prozentwerte berechnen: Grundwert, Prozentsatz und Prozentwert. Kopfrechen-freundliche Zahlen zum Warmwerden.`,
      },
      {
        id: "m-pz-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Vermehrter und verminderter Grundwert, Zinseszins uber mehrere Jahre. Prozentuale Veranderungen berechnen.`,
      },
      {
        id: "m-pz-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Mischungsaufgaben, Staffelzinsen, Renditeberechnung und komplexe Textaufgaben aus dem Finanzalltag.`,
      },
      {
        id: "m-pz-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Prozent- und Zinsrechnung — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-koerper",
    slug: "mathe-koerper",
    title: "Koerper & Volumen",
    description: "Quader, Zylinder, Kegel, Kugel",
    icon: "🧊",
    color: "#06b6d4",
    category: "geometrie-trigonometrie",
    progress: 0,
    merkblatt: `## Merkblatt: Koerper

| Koerper | Volumen | Oberflaeche |
|---------|---------|-------------|
| Quader | $abc$ | $2(ab+bc+ac)$ |
| Wuerfel | $a^3$ | $6a^2$ |
| Zylinder | $\\pi r^2 h$ | $2\\pi r(r+h)$ |
| Kegel | $\\frac{1}{3}\\pi r^2 h$ | $\\pi r(r+s)$ |
| Kugel | $\\frac{4}{3}\\pi r^3$ | $4\\pi r^2$ |`,
    lessons: [
      {
        id: "m-ko-1",
        title: "Quader & Wuerfel",
        duration: "15 min",
        type: "text",
        content: `## Quader

> **Roter Faden:** Du kennst bereits die [Geometrie](/modules/mathe-geometrie) mit Flächen und Winkeln. Jetzt geht es in die dritte Dimension: **Körper** mit Volumen und Oberfläche. Der Quader ist der einfachste 3D-Körper.

Ein Quader hat 3 verschiedene Kantenlängen: a, b, c.

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="400" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Quader 3D -->
  <polygon points="100,180 280,180 320,100 140,100" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="100,180 140,100 140,40 100,120" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="140,40 320,40 320,100 140,100" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
  <!-- Kanten beschriften -->
  <text x="190" y="195" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">a</text>
  <text x="305" y="145" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">b</text>
  <text x="85" y="155" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">c</text>
  <!-- Formeln -->
  <text x="200" y="225" text-anchor="middle" fill="#e2e8f0" font-size="12">V = a · b · c</text>
  <text x="200" y="245" text-anchor="middle" fill="#64748b" font-size="11">O = 2(ab + bc + ac)</text>
</svg>

### Volumen
$V = a \\cdot b \\cdot c$

### Oberfläche
$O = 2(ab + bc + ac)$

### Raumdiagonale
$d = \\sqrt{a^2 + b^2 + c^2}$

### Beispiel 1
$a=3$, $b=4$, $c=5$:

$$V = 3 \\cdot 4 \\cdot 5 = 60$$

$$O = 2(12 + 20 + 15) = 2 \\cdot 47 = 94$$

$$d = \\sqrt{9 + 16 + 25} = \\sqrt{50} \\approx 7{,}07$$

### Beispiel 2: Karton
Ein Karton ist 40cm × 30cm × 20cm. Wie viele Liter fasst er?

$$V = 40 \\cdot 30 \\cdot 20 = 24.000 \\text{ cm}^3 = 24 \\text{ Liter}$$

---

## Würfel

Sonderfall des Quaders: alle Kanten gleich lang ($a = b = c$).

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="400" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Würfel 3D -->
  <polygon points="120,190 280,190 310,120 150,120" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
  <polygon points="120,190 150,120 150,50 120,120" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="2"/>
  <polygon points="150,50 310,50 310,120 150,120" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
  <!-- Kanten beschriften -->
  <text x="200" y="205" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="bold">a</text>
  <text x="300" y="160" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="bold">a</text>
  <text x="130" y="160" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="bold">a</text>
  <!-- Formeln -->
  <text x="200" y="225" text-anchor="middle" fill="#e2e8f0" font-size="12">V = a³, O = 6a²</text>
  <text x="200" y="245" text-anchor="middle" fill="#64748b" font-size="11">d = a√3</text>
</svg>

$$V = a^3, \\quad O = 6a^2, \\quad d = a\\sqrt{3}$$

### Beispiel
$a = 4$:

$$V = 64, \\quad O = 96, \\quad d = 4\\sqrt{3} \\approx 6{,}93$$

> 🔗 **Weiter:** Quader und Würfel haben gerade Kanten. Jetzt kommen die **krummlinigen Körper** — Zylinder, Kegel und Kugel, wo $\\pi$ ins Spiel kommt!`,
      },
      {
        id: "m-ko-2",
        title: "Zylinder, Kegel, Kugel",
        duration: "18 min",
        type: "text",
        content: `## Zylinder

> **Roter Faden:** Nach [Quader & Würfel](/modules/mathe-koerper) mit geraden Kanten kommen jetzt die **krummlinigen Körper** — Zylinder, Kegel und Kugel. Hier wird $\\pi$ aus der [Geometrie](/modules/mathe-geometrie) unverzichtbar.

Ein Zylinder hat einen kreisförmigen Querschnitt mit Radius r und Höhe h.

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="400" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Zylinder -->
  <ellipse cx="200" cy="190" rx="80" ry="25" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="2"/>
  <line x1="120" y1="190" x2="120" y2="80" stroke="#3b82f6" stroke-width="2"/>
  <line x1="280" y1="190" x2="280" y2="80" stroke="#3b82f6" stroke-width="2"/>
  <ellipse cx="200" cy="80" rx="80" ry="25" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
  <!-- Beschriftung -->
  <text x="200" y="230" text-anchor="middle" fill="#93c5fd" font-size="13">r = Radius</text>
  <text x="295" y="140" text-anchor="middle" fill="#93c5fd" font-size="13">h = Höhe</text>
  <line x1="285" y1="145" x2="285" y2="185" stroke="#93c5fd" stroke-width="1" stroke-dasharray="4"/>
</svg>

### Volumen
$$V = \\pi r^2 h$$

### Oberfläche
$$O = 2\\pi r^2 + 2\\pi r h = 2\\pi r(r + h)$$

### Beispiel
$r = 3$, $h = 10$:

$$V = \\pi \\cdot 9 \\cdot 10 = 90\\pi \\approx 282{,}7$$

$$O = 2\\pi \\cdot 3(3 + 10) = 78\\pi \\approx 245$$

---

## Kegel

Ein Kegel hat eine Spitze. Radius r, Höhe h, Mantellinie s.

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="400" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Kegel -->
  <ellipse cx="200" cy="190" rx="80" ry="25" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="2"/>
  <line x1="120" y1="190" x2="200" y2="60" stroke="#10b981" stroke-width="2"/>
  <line x1="280" y1="190" x2="200" y2="60" stroke="#10b981" stroke-width="2"/>
  <!-- Beschriftung -->
  <text x="200" y="230" text-anchor="middle" fill="#6ee7b7" font-size="13">r</text>
  <text x="250" y="130" text-anchor="middle" fill="#6ee7b7" font-size="13">h</text>
  <text x="160" y="120" text-anchor="middle" fill="#6ee7b7" font-size="13">s</text>
  <line x1="240" y1="135" x2="210" y2="185" stroke="#6ee7b7" stroke-width="1" stroke-dasharray="4"/>
</svg>

### Volumen
$$V = \\frac{1}{3}\\pi r^2 h$$

### Mantellinie
$$s = \\sqrt{r^2 + h^2}$$

### Oberfläche
$$O = \\pi r^2 + \\pi r s = \\pi r(r + s)$$

### Beispiel
$r = 4$, $h = 6$:

$$V = \\frac{1}{3}\\pi \\cdot 16 \\cdot 6 = 32\\pi \\approx 100{,}5$$

$$s = \\sqrt{16 + 36} = \\sqrt{52} \\approx 7{,}21$$

> **Merke:** Kegel = $\\frac{1}{3}$ des Zylinders mit gleicher Grundfläche und Höhe!

---

## Kugel

<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="400" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Kugel -->
  <circle cx="200" cy="125" r="80" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-width="2"/>
  <ellipse cx="200" cy="125" rx="80" ry="25" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="4"/>
  <!-- Beschriftung -->
  <text x="200" y="225" text-anchor="middle" fill="#c4b5fd" font-size="13">r = Radius</text>
  <line x1="200" y1="125" x2="280" y2="125" stroke="#c4b5fd" stroke-width="1.5"/>
  <text x="240" y="118" text-anchor="middle" fill="#c4b5fd" font-size="12">r</text>
</svg>

### Volumen
$$V = \\frac{4}{3}\\pi r^3$$

### Oberfläche
$$O = 4\\pi r^2$$

### Beispiel
$r = 5$:

$$V = \\frac{4}{3}\\pi \\cdot 125 = \\frac{500}{3}\\pi \\approx 523{,}6$$

$$O = 4\\pi \\cdot 25 = 100\\pi \\approx 314{,}2$$

> 🔗 **Verwandt:** Körper & Volumen schließen die Geometrie ab. Im Modul **Kombinatorik** geht es in einen ganz anderen Bereich — das systematische Zählen und Anordnen!`,
      },
      {
        id: "m-ko-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Volumen und Oberflache von Quader und Wurfel. Grundformeln sicher anwenden.`,
      },
      {
        id: "m-ko-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Zylinder, Kegel und Pyramide berechnen. Zwischen Mantel-, Grund- und Deckflache unterscheiden.`,
      },
      {
        id: "m-ko-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Kugelvolumen und -oberflache, zusammengesetzte Korper. Textaufgaben mit Alltagsbezug (Tank, Silo, Trichter).`,
      },
      {
        id: "m-ko-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Korper & Volumen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-kombinatorik",
    slug: "mathe-kombinatorik",
    title: "Kombinatorik",
    description: "Permutationen, Kombinationen, Variationen",
    icon: "🔀",
    color: "#f59e0b",
    category: "stochastik",
    progress: 0,
    merkblatt: `## Merkblatt: Kombinatorik

| Art | Formel |
|-----|--------|
| Permutation | $P(n) = n!$ |
| Variation | $V(n,k) = \\frac{n!}{(n-k)!}$ |
| Kombination | $C(n,k) = \\binom{n}{k}$ |`,
    lessons: [
      {
        id: "m-kb-1",
        title: "Permutationen & Variationen",
        duration: "18 min",
        type: "text",
        content: `## Permutation

> **Roter Faden:** Du kennst bereits die Grundlagen der [Stochastik](/modules/mathe-stochastik). Die **Kombinatorik** ist der systematische Weg, die Anzahl der Möglichkeiten zu berechnen. Ohne sie kommt man in der Stochastik nicht weit!

Eine Permutation ist eine **Anordnung** von n Elementen. Die Reihenfolge ist wichtig!

### Formel
$P(n) = n!$ (n-Fakultät)

$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$

### Beispiel 1: Bücherregal
3 Bücher (A, B, C) auf einem Regal anordnen:
$P(3) = 3! = 6$

Möglichkeiten: ABC, ACB, BAC, BCA, CAB, CBA

### Beispiel 2: PIN
Eine 4-stellige PIN mit den Ziffern 0-9:
Hier handelt es sich um eine **Variation mit Wiederholung**: $10^4 = 10.000$ Möglichkeiten

## Variation

**k** aus **n** Elementen auswählen, **Reihenfolge wichtig**:

$V(n,k) = \\frac{n!}{(n-k)!}$

### Beispiel 1: Top 3
Die besten 3 aus 5 Schülern auswählen:
$V(5,3) = \\frac{5!}{(5-3)!} = \\frac{120}{2} = 60$ Möglichkeiten

### Beispiel 2: Medaillen
Gold, Silber, Bronze unter 8 Athleten:
$V(8,3) = \\frac{8!}{5!} = 8 \\cdot 7 \\cdot 6 = 336$

> **Merke:** Permutation = alle Elemente, Variation = Auswahl. Bei beiden ist die Reihenfolge wichtig!`,
      },
      {
        id: "m-kb-2",
        title: "Kombinationen",
        duration: "15 min",
        type: "text",
        content: `## Kombination

> **Roter Faden:** Bei [Permutationen & Variationen](/modules/mathe-kombinatorik) war die Reihenfolge wichtig. Bei der **Kombination** ist sie egal — es zählt nur die Auswahl. Das ist das Grundprinzip hinter Lotto und Co.

Eine Kombination ist eine **Auswahl** von k aus n Elementen, bei der die **Reihenfolge egal** ist.

### Formel
$C(n,k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}$

### Beispiel 1: Lotto
6 aus 49 Zahlen — Reihenfolge egal:
$\\binom{49}{6} = \\frac{49!}{6! \\cdot 43!} = 13.983.816$

Die Chance auf den Jackpot ist also etwa 1 zu 14 Millionen!

### Beispiel 2: Eiscreme
3 Eissorten aus 8 wählen:
$\\binom{8}{3} = \\frac{8!}{3! \\cdot 5!} = \\frac{8 \\cdot 7 \\cdot 6}{3 \\cdot 2 \\cdot 1} = 56$

### Beispiel 3: Hände schütteln
In einer Runde mit 10 Personen schütteln alle einander die Hände. Wie viele Handshakes?
$\\binom{10}{2} = \\frac{10!}{2! \\cdot 8!} = 45$

> **Merke:** Kombination = Auswahl ohne Reihenfolge. Variation = Auswahl mit Reihenfolge.

> **Nächstes:** In [Logik & Beweise](/modules/mathe-logik) lernst du, wie man mathematische Aussagen systematisch beweist.`,
      },
      {
        id: "m-kb-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Fakultaten berechnen und einfache Produktregel anwenden. Anzahl von Moglichkeiten systematisch zahlen.`,
      },
      {
        id: "m-kb-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Permutationen, Variationen und Kombinationen unterscheiden — mit und ohne Wiederholung. $\binom{n}{k}$ sicher nutzen.`,
      },
      {
        id: "m-kb-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Schwierige Abzahlprobleme mit mehreren Fallunterscheidungen. Lotto, Poker und andere kombinatorische Anwendungen.`,
      },
      {
        id: "m-kb-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Kombinatorik — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-logik",
    slug: "mathe-logik",
    title: "Logik & Beweise",
    description: "Aussagenlogik, Wahrheitstafeln, Beweistechniken",
    icon: "🧠",
    color: "#8b5cf6",
    category: "grundlagen",
    progress: 0,
    merkblatt: `## Merkblatt: Logik

### Verknuepfungen
- UND: $\\land$
- ODER: $\\lor$
- NICHT: $\\lnot$
- Implikation: $\\Rightarrow$

### De Morgan
$\\lnot(p \\land q) = \\lnot p \\lor \\lnot q$
$\\lnot(p \\lor q) = \\lnot p \\land \\lnot q$`,
    lessons: [
      {
        id: "m-lg-1",
        title: "Aussagenlogik",
        duration: "18 min",
        type: "text",
        content: `## Aussagenlogik

> **Roter Faden:** Du kennst bereits die [Mengenlehre](/modules/mathe-mengenlehre) — die Bausteine der Mathematik. Die **Logik** ist die Sprache, in der Mathematik geschrieben wird. Aussagen, Verknüpfungen und Wahrheitstafeln sind die Grundlage für alles, was folgt.

> 🎓 **Fürs Erweitert:** Beweismethoden sind Teil von MA1 (Grundlagen). Vollständige Induktion und Widerspruchsbeweise werden in der Klausur drankommen!

Die Aussagenlogik ist die Grundlage der Mathematik und Informatik. Sie untersucht, ob Aussagen **wahr** oder **falsch** sind.

### Was ist eine Aussage?

Eine Aussage ist ein Satz, der entweder **wahr (w)** oder **falsch (f)** ist — aber nicht beides.

- "2 + 3 = 5" → wahr ✓
- "Alle Primzahlen sind gerade" → falsch ✗ (3, 5, 7 sind ungerade)
- "x > 5" → **keine Aussage** (hängt von x ab)

### Logische Verknüpfungen

**UND ($\\land$):** $p \\land q$ ist nur wahr, wenn **beide** wahr sind.

| $p$ | $q$ | $p \\land q$ |
|-----|-----|-------------|
| w | w | **w** |
| w | f | f |
| f | w | f |
| f | f | f |

**ODER ($\\lor$):** $p \\lor q$ ist wahr, wenn **mindestens eine** wahr ist.

| $p$ | $q$ | $p \\lor q$ |
|-----|-----|------------|
| w | w | w |
| w | f | **w** |
| f | w | **w** |
| f | f | f |

**NICHT ($\\lnot$):** Kehrt den Wahrheitswert um.

$\\lnot w = f$, $\\lnot f = w$

### Implikation ($\\Rightarrow$)

$p \\Rightarrow q$ bedeutet: "Wenn p, dann q."

| $p$ | $q$ | $p \\Rightarrow q$ |
|-----|-----|-------------------|
| w | w | **w** |
| w | f | **f** |
| f | w | **w** |
| f | f | **w** |

**Merke:** Die Implikation ist nur falsch, wenn die Voraussetzung wahr und die Folge falsch ist!

### Beispiel

"Wenn es regnet ($p$), dann wird die Straße nass ($q$)."

- Es regnet und die Straße ist nass → wahr ✓
- Es regnet, aber die Straße ist trocken → falsch ✗
- Es regnet nicht, aber die Straße ist nass (Sprinkler) → trotzdem wahr!

### De Morgan'sche Regeln

$\\lnot(p \\land q) = \\lnot p \\lor \\lnot q$

$\\lnot(p \\lor q) = \\lnot p \\land \\lnot q$

"Nicht beide" = "Mindestens einer nicht" — das ist intuitiv!`,
      },
      {
        id: "m-lg-2",
        title: "Beweistechniken",
        duration: "20 min",
        type: "text",
        content: `## Beweistechniken

> **Roter Faden:** Die [Aussagenlogik](/modules/mathe-logik) gibt uns die Sprache. Jetzt lernst du die **Beweistechniken** — direkter Beweis, Widerspruch und vollständige Induktion. Das sind die Werkzeuge, mit denen Mathematik funktioniert.

Beweise sind das Herzstück der Mathematik. Hier die wichtigsten Techniken.

### Direkter Beweis

Von der Voraussetzung Schritt für Schritt zum Ziel zeigen.

**Beispiel:** Sei n eine gerade Zahl. Dann ist $n^2$ auch gerade.

$n = 2k$ (Definition von gerade) → $n^2 = 4k^2 = 2(2k^2)$ → gerade ✓

### Indirekter Beweis (Widerspruch)

Annahme des **Gegenteils**, dann einen Widerspruch herleiten.

**Beispiel:** $\\sqrt{2}$ ist irrational.

Annahme: $\\sqrt{2} = \\frac{p}{q}$ (ggT(p,q)=1)

$2q^2 = p^2$ → $p^2$ gerade → $p$ gerade → $p = 2k$

$2q^2 = 4k^2$ → $q^2 = 2k^2$ → $q$ auch gerade

Widerspruch: ggT(p,q) ≥ 2! ✓

### Vollständige Induktion (VI)

Für Aussagen über **alle natürlichen Zahlen**.

**Schritt 1 — Anfang:** Zeige für $n = 0$ (oder $n = 1$)

**Schritt 2 — Induktionsschritt:** Annahme für $n$, zeige für $n + 1$

**Beispiel:** $\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$

**Anfang ($n=1$):** $1 = \\frac{1 \\cdot 2}{2} = 1$ ✓

**Schritt:** Angenommen für $n$. Dann:

$\\sum_{k=1}^{n+1} k = \\frac{n(n+1)}{2} + (n+1) = \\frac{n(n+1) + 2(n+1)}{2} = \\frac{(n+1)(n+2)}{2}$ ✓

### Kontraposition

Statt $p \\Rightarrow q$ beweisen wir $\lnot q \\Rightarrow \lnot p$.

**Beispiel:** Wenn $n^2$ ungerade, dann $n$ ungerade.

Kontraposition: Wenn $n$ gerade, dann $n^2$ gerade. (Einfacher zu beweisen!)

> **Merke:** VI funktioniert wie eine Kartenreihe — wenn jede Karte die nächste umstößt, fallen alle um!

> **Nächstes:** Der [Dreisatz](/modules/mathe-dreisatz) bringt uns zurück in die Praxis — proportionale Zuordnungen im Alltag.`,
      },
      {
        id: "m-lg-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Wahrheitstafeln fur UND, ODER und NICHT aufstellen. Einfache aussagenlogische Verknupfungen auswerten.`,
      },
      {
        id: "m-lg-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Implikation und Aquivalenz verstehen. De Morgan-Regeln und Kontraposition sicher anwenden.`,
      },
      {
        id: "m-lg-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Vollstandige Induktion uber naturliche Zahlen. Quantorenschachtelung und logische Beweisstrukturen analysieren.`,
      },
      {
        id: "m-lg-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Formale Logik — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-dreisatz",
    slug: "mathe-dreisatz",
    title: "Dreisatz",
    description: "Direkt & indirekt proportional, Dreisatz-Aufgaben",
    icon: "⚖️",
    color: "#ec4899",
    category: "arithmetik-algebra",
    progress: 0,
    merkblatt: `## Merkblatt: Dreisatz

### Direkt proportional
$a_1 : a_2 = b_1 : b_2$

### Indirekt proportional
$a_1 : a_2 = b_2 : b_1$`,
    lessons: [
      {
        id: "m-ds-1",
        title: "Direkt proportional",
        duration: "15 min",
        type: "text",
        content: `## Direkt proportional

> **Roter Faden:** Der Dreisatz ist eines der praktischsten Werkzeuge der Mathematik. Er taucht überall auf — von der Rezeptidee bis zur Fahrzeitberechnung. Die **direkt proportionale** Zuordnung ist der einfachste Fall: „je mehr, desto mehr."

Wenn eine Größe steigt, steigt die andere **im gleichen Verhältnis**. Das Verhältnis bleibt konstant.

### Schema
$a_1 \\rightarrow b_1$
$a_2 \\rightarrow b_2$

$b_2 = \\frac{a_2 \\cdot b_1}{a_1}$

> [!EXERCISE] Wenn $a_1 = 3$, $b_1 = 2$ und $a_2 = 9$ — was ist $b_2$?
> A) 4
> B) 6
> C) 8
> D) 12
> ANSWER: B
> $b_2 = \\frac{9 \\cdot 2}{3} = 6$. Die dritte Äpfelzahl ist 3× so groß → auch der Preis ist 3× so groß.

### Beispiel 1: Äpfel
3 Äpfel kosten 2€. Was kosten 8 Äpfel?

$b_2 = \\frac{8 \\cdot 2}{3} = \\frac{16}{3} = 5{,}33€$

### Beispiel 2: Benzin
5 Liter Benzin kosten 8,50€. Was kosten 12 Liter?

$b_2 = \\frac{12 \\cdot 8{,}50}{5} = \\frac{102}{5} = 20{,}40€$

> [!EXERCISE] 4 Bücher kosten 28€. Was kosten 7 Bücher?
> A) 35€
> B) 42€
> C) 49€
> D) 56€
> ANSWER: C
> $b_2 = \\frac{7 \\cdot 28}{4} = 49€$. Mehr Bücher → mehr Kosten (direkt proportional).

### Beispiel 3: Geschwindigkeit
Ein Auto fährt 60 km in 45 Minuten. Wie weit in 2 Stunden?

Erst umrechnen: 2 Stunden = 120 Minuten
$b_2 = \\frac{120 \\cdot 60}{45} = 160$ km

> [!EXERCISE] Ein Radfahrer fährt 30 km in 2 Stunden. Wie weit fährt er in 5 Stunden?
> A) 60 km
> B) 75 km
> C) 90 km
> D) 150 km
> ANSWER: B
> $b_2 = \\frac{5 \\cdot 30}{2} = 75$ km. Gleiche Geschwindigkeit vorausgesetzt → direkt proportional.

> **Merke:** Direkt proportional = $\\frac{a_1}{b_1} = \\frac{a_2}{b_2}$ (Verhältnis gleich)

[PRACTICE_START]
**Aufgabe:** 5 kg Äpfel kosten 7,50€. Was kosten 8 kg?

**Lösung:** $\frac{7{,}50}{5} \cdot 8 = 1{,}50 \cdot 8 = 12€$
[PRACTICE_END]

> 🔗 **Weiter:** Du kennst jetzt den direkt proportionalen Dreisatz. Im nächsten Schritt kommt das **Gegenteil**: indirekt proportional — wenn eine Größe steigt, sinkt die andere!`,
      },
      {
        id: "m-ds-2",
        title: "Indirekt proportional",
        duration: "15 min",
        type: "text",
        content: `## Indirekt proportional

> **Roter Faden:** Beim [direkt proportionalen Dreisatz](/modules/mathe-dreisatz) gilt „je mehr, desto mehr." Jetzt kommt das Gegenteil: **indirekt proportional** — „je mehr, desto weniger." Das Produkt bleibt konstant.

Wenn eine Größe steigt, sinkt die andere. Das **Produkt** bleibt konstant.

### Schema
$a_1 \\rightarrow b_1$
$a_2 \\rightarrow b_2$

$b_2 = \\frac{a_1 \\cdot b_1}{a_2}$

> [!EXERCISE] 4 Arbeiter brauchen 12 Tage. Wie lange brauchen 6 Arbeiter?
> A) 6 Tage
> B) 8 Tage
> C) 18 Tage
> D) 24 Tage
> ANSWER: B
> $b_2 = \\frac{4 \\cdot 12}{6} = 8$ Tage. Mehr Arbeiter → weniger Tage (indirekt proportional).

### Beispiel 1: Arbeiter
3 Arbeiter brauchen 10 Tage für eine Aufgabe. Wie lange brauchen 5 Arbeiter?

$b_2 = \\frac{3 \\cdot 10}{5} = 6$ Tage

Mehr Arbeiter = weniger Tage. Logisch!

### Beispiel 2: Geschwindigkeit
Wenn man 120 km mit 60 km/h in 2 Stunden schafft — wie lange braucht man mit 40 km/h?

$b_2 = \\frac{60 \\cdot 2}{40} = 3$ Stunden

Langsamer = mehr Zeit.

> [!EXERCISE] 6 Maschinen produzieren in 5 Tagen. Wie lange brauchen 10 Maschinen?
> A) 2 Tage
> B) 3 Tage
> C) 8 Tage
> D) 15 Tage
> ANSWER: B
> $b_2 = \\frac{6 \\cdot 5}{10} = 3$ Tage. Mehr Maschinen → weniger Tage (Produkt bleibt konstant).

### Beispiel 3: Rohrleitung
Eine Rohrleitung füllt einen Tank in 8 Stunden. Eine zweite (doppelt so schnell) braucht...

$b_2 = \\frac{8 \\cdot 1}{2} = 4$ Stunden

> **Merke:** Indirekt proportional = $a_1 \\cdot b_1 = a_2 \\cdot b_2$ (Produkt gleich)

[PRACTICE_START]
**Aufgabe:** 6 Arbeiter brauchen 10 Tage. Wie lange brauchen 15 Arbeiter?

**Lösung:** $\frac{6 \cdot 10}{15} = 4$ Tage
[PRACTICE_END]

> 🔗 **Verwandt:** Du kennst jetzt direkt und indirekt proportionale Zuordnungen. Im Modul **Prozent & Zinsen** wirst du diese Werkzeuge auf Rabatte und Zinseszins anwenden!`,
      },
      {
        id: "m-ds-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Einfache direkt proportionale Zuordnungen: je mehr, desto mehr. Mit ganzen Zahlen und glatten Verhaltnissen.`,
      },
      {
        id: "m-ds-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Gemischte Aufgaben mit direkt und indirekt proportionalen Zuordnungen. Grossere Zahlen und Dezimalwerte.`,
      },
      {
        id: "m-ds-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Zusammengesetzter Dreisatz mit mehreren Grossen. Textaufgaben, bei denen du den richtigen Ansatz selbst finden musst.`,
      },
      {
        id: "m-ds-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Dreisatz — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
  {
    id: "m-taylor",
    slug: "mathe-taylorreihen",
    title: "Taylorreihen",
    description: "Taylor- und Maclaurin-Reihen, wichtige Reihenentwicklungen",
    icon: "📐",
    color: "#a855f7",
    category: "analysis",
    progress: 0,
    merkblatt: `## Merkblatt: Taylorreihen

### Taylor-Reihe
$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$

### Wichtige Reihen
- $e^x = \\sum x^n/n!$
- $\\sin(x) = \\sum (-1)^n x^{2n+1}/(2n+1)!$
- $\\cos(x) = \\sum (-1)^n x^{2n}/(2n)!$`,
    lessons: [
      {
        id: "m-tw-1",
        title: "Taylor-Reihe",
        duration: "20 min",
        type: "text",
        content: `## Taylor-Reihe

> **Roter Faden:** Du kennst bereits [Reihen](/modules/mathe-reihen) und [Ableitungen](/modules/mathe-ableitungen). Die **Taylor-Reihe** verbindet beides: Jede glatte Funktion lässt sich als unendliche Summe von Potenzen darstellen. Das ist eines der mächtigsten Konzepte der Analysis!

> 🎬 **Taylor series** — https://www.youtube.com/watch?v=3d6DsjIBzJ4 — eine visuelle Erklärung, wie Taylor-Reihen funktionieren.

> 🎓 **Fürs Erweitert:** Taylor-Reihen sind ein Thema in MA2 (Analysis 1). Wer sie hier versteht, kann im Erweitert punkten!

Die Taylor-Reihe ermöglicht es, eine Funktion durch ein **Polynom** (unendliche Summe) anzunähern. Das ist extrem nützlich für Berechnungen!

### Formel
$f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n$

Für $a = 0$ heißt sie **Maclaurin-Reihe**.

### Beispiel: $e^x$

Alle Ableitungen von $e^x$ sind $e^x$. Also: $f^{(n)}(0) = 1$ für alle n.

$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\cdots$

### Näherung von $e$

$e = e^1 \\approx 1 + 1 + \\frac{1}{2} + \\frac{1}{6} + \\frac{1}{24} + \\frac{1}{120} = 2{,}7167...$

Das wahre $e \\approx 2{,}71828$ — schon nach 5 Gliedern ziemlich genau!

### Warum ist das nützlich?

Computer können nicht $e^x$ direkt berechnen. Sie verwenden stattdessen die Taylor-Reihe und berechnen eine endliche Anzahl von Gliedern.

> **Merke:** Taylor-Reihe = Funktion als unendliches Polynom. Je mehr Glieder, desto genauer.

---

## Beispiel: $\\sin(x)$

Schritt-für-Schritt die Taylor-Reihe von $f(x) = \\sin(x)$ um $a = 0$:

| $n$ | $f^{(n)}(x)$ | $f^{(n)}(0)$ | Term |
|-----|-------------|-------------|------|
| 0 | $\\sin(x)$ | $0$ | $0$ |
| 1 | $\\cos(x)$ | $1$ | $x$ |
| 2 | $-\\sin(x)$ | $0$ | $0$ |
| 3 | $-\\cos(x)$ | $-1$ | $-\\frac{x^3}{6}$ |
| 4 | $\\sin(x)$ | $0$ | $0$ |
| 5 | $\\cos(x)$ | $1$ | $\\frac{x^5}{120}$ |

$$\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\cdots = \\sum_{n=0}^{\\infty} \\frac{(-1)^n x^{2n+1}}{(2n+1)!}$$

**Beispiel:** $\\sin(0{,}1) \\approx 0{,}1 - \\frac{0{,}001}{6} + \\frac{0{,}00001}{120} \\approx 0{,}09983$

---

## Häufige Fehler

- **Maclaurin vs. Taylor:** Taylor um $a = 0$ heißt **Maclaurin-Reihe** — das ist ein Spezialfall! Bei $a \\neq 0$ brauchst du $(x-a)^n$.
- **$n!$ im Nenner:** $\\frac{x^3}{6}$, nicht $\\frac{x^3}{3}$! Man vergisst leicht, dass $3! = 6$.
- **Gerade/ungerade Potenzen:** $\\sin(x)$ hat nur **ungerade** Potenzen ($x, x^3, x^5, \\ldots$), $\\cos(x)$ nur **gerade** ($1, x^2, x^4, \\ldots$).`,
      },
      {
        id: "m-tw-2",
        title: "Wichtige Reihen",
        duration: "18 min",
        type: "text",
        content: `## Wichtige Reihenentwicklungen

> **Roter Faden:** Nach der [Taylor-Reihe](/modules/mathe-taylorreihen) als allgemeinem Prinzip kommen jetzt die **wichtigen Reihen**: $e^x$, $\\sin$, $\\cos$ und $\\ln$. Diese Reihen sind so zentral, dass sie in jeder technischen Ausbildung vorkommen.

> 🎬 **Exponents & e** — https://www.youtube.com/watch?v=m2MIpBrFgFk — warum $e$ überall auftaucht und was es mit Wachstum zu tun hat.

Diese Reihen kommen überall in der Mathematik und Physik vor. Sie lohnt es sich, sie zu kennen!

### Exponentialfunktion
$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\cdots = \\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$

Konvergenzradius: $R = \\infty$ (konvergiert für alle x)

### Sinus
$\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\frac{x^7}{7!} + \\cdots$

Nur ungerade Potenzen, Vorzeichen wechseln.

### Kosinus
$\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\frac{x^6}{6!} + \\cdots$

Nur gerade Potenzen, Vorzeichen wechseln.

### Geometrische Reihe
$\\frac{1}{1-x} = 1 + x + x^2 + x^3 + \\cdots$ für $|x| < 1$

### Natürlicher Logarithmus
$\\ln(1+x) = x - \\frac{x^2}{2} + \\frac{x^3}{3} - \\frac{x^4}{4} + \\cdots$ für $|x| < 1$

## Näherungen (kleines x)

Für kleine x-Werte reichen die ersten Glieder:

$\\sin(x) \\approx x - \\frac{x^3}{6}$

$\\cos(x) \\approx 1 - \\frac{x^2}{2}$

$e^x \\approx 1 + x + \\frac{x^2}{2}$

> **Merke:** Taylor-Reihen sind das Werkzeug, mit dem Computer trigonometrische Funktionen berechnen!

---

## Schritt-fuer-Schritt Beispiele

### Beispiel 1: Geometrische Reihe berechnen

Berechne $\sum_{n=0}^{5} \left(\frac{1}{2}\right)^n$

Schritt 1: Erkenne $|r| = \frac{1}{2} < 1$ -> konvergent

Schritt 2: Partialsumme: $S_6 = \frac{1 - (\frac{1}{2})^6}{1 - \frac{1}{2}} = \frac{1 - \frac{1}{64}}{\frac{1}{2}} = \frac{63}{32} = 1{,}969$

Schritt 3: Limes: $S_\infty = \frac{1}{1-\frac{1}{2}} = 2$

### Beispiel 2: Sinus approximieren

Approximiere $\sin(0{,}1)$ mit der Taylor-Reihe:

$\sin(0{,}1) \approx 0{,}1 - \frac{0{,}1^3}{6} + \frac{0{,}1^5}{120} = 0{,}1 - 0{,}000167 + 0{,}000000083 \approx 0{,}09983$

Taschenrechner: $\sin(0{,}1) = 0{,}09983...$ -- stimmt auf 5 Stellen!

### Beispiel 3: Eulersche Zahl

Berechne $e$ mit $n = 5$ Termen:

$e \approx 1 + 1 + \frac{1}{2} + \frac{1}{6} + \frac{1}{24} + \frac{1}{120} = 2{,}7167$

Exakter Wert: $e = 2{,}71828...$ -- nur 0,06% Fehler!

> **Merke:** Mehr Terme = genauere Approximation. Schon 5-6 Terme reichen fuer viele praktische Anwendungen.

> **Nächstes:** Damit ist der Analysis-Teil abgeschlossen! Zurückkehren kannst du jederzeit zu [Grenzwerte](/modules/mathe-grenzwerte), [Ableitungen](/modules/mathe-ableitungen) oder [Reihen](/modules/mathe-reihen).


---

## Weitere Beispiele

### Beispiel 2: Taylor-Reihe von $\sin(x)$

$f(x) = \sin(x)$, $a = 0$:

| $n$ | $f^{(n)}(0)$ | Term |
|-----|-------------|------|
| 0 | $\sin(0) = 0$ | $0$ |
| 1 | $\cos(0) = 1$ | $x$ |
| 2 | $-\sin(0) = 0$ | $0$ |
| 3 | $-\cos(0) = -1$ | $-\frac{x^3}{6}$ |
| 4 | $\sin(0) = 0$ | $0$ |
| 5 | $\cos(0) = 1$ | $\frac{x^5}{120}$ |

$$\sin(x) = x - \frac{x^3}{6} + \frac{x^5}{120} - \ldots = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$$

> **Merke:** Bei $\sin(x)$ fallen die geraden Potenzen weg.

### Beispiel 3: Taylor-Polynom 3. Grades von $\ln(1+x)$

$f(0) = 0$, $f^{\prime}(0) = 1$, $f^{\prime\prime}(0) = -1$, $f^{\prime\prime\prime}(0) = 2$

$$T_3(x) = x - \frac{x^2}{2} + \frac{x^3}{3}$$

Probe: $\ln(1{,}1) \approx 0{,}1 - 0{,}005 + 0{,}000333 = 0{,}09533$
Taschenrechner: $0{,}09531$ -- sehr genau!

[GUIDED_START]
**Schritt-fuer-Schritt:** Taylor-Polynom 2. Grades von $f(x) = \sqrt{1+x}$ um $a=0$

**Schritt 1:** $f(0) = 1$

**Schritt 2:** $f^{\prime}(x) = \frac{1}{2\sqrt{1+x}}$ -> $f^{\prime}(0) = \frac{1}{2}$

**Schritt 3:** $f^{\prime\prime}(x) = -\frac{1}{4(1+x)^{3/2}}$ -> $f^{\prime\prime}(0) = -\frac{1}{4}$

**Schritt 4:** Einsetzen: $T_2(x) = 1 + \frac{1}{2}x - \frac{1}{8}x^2$

**Probe:** $\sqrt{1{,}1} \approx 1 + 0{,}05 - 0{,}00125 = 1{,}04875$
Taschenrechner: $1{,}04881$
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Taylor-Polynom 2. Grades von $f(x) = \cos(x)$ um $a=0$

**Loesung:** $f(0)=1$, $f^{\prime}(0)=0$, $f^{\prime\prime}(0)=-1$
$T_2(x) = 1 - \frac{x^2}{2}$

**Aufgabe 2:** Berechne $e^{0{,}2}$ mit $T_3(x)$ der Exponentialfunktion

**Loesung:** $T_3(0{,}2) = 1 + 0{,}2 + \frac{0{,}04}{2} + \frac{0{,}008}{6} = 1{,}2213$
(Taschenrechner: $1{,}2214$)
[PRACTICE_END]

[PRACTICE_START]
**Aufgabe 1:** Berechne $\sum_{n=0}^{3} 3 \cdot \left(\frac{1}{3}\right)^n$

**Loesung:** $3 + 1 + \frac{1}{3} + \frac{1}{9} = \frac{40}{9} \approx 4{,}44$

**Aufgabe 2:** Approximiere $e^{0{,}5}$ mit 4 Termen

**Loesung:** $1 + 0{,}5 + \frac{0{,}25}{2} + \frac{0{,}125}{6} = 1{,}6458$
(Taschenrechner: $1{,}6487$)

**Aufgabe 3:** Konvergiert $\sum \frac{1}{n!}$? Wenn ja, gegen was?

**Loesung:** Ja! $\sum_{n=0}^{\infty} \frac{1}{n!} = e \approx 2{,}718$
[PRACTICE_END]`,
      },
      {
        id: "m-tw-aufgaben-leicht",
        title: "📝 Aufgaben (Leicht)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 1,
        content: `Maclaurin-Reihen fur $e^x$, $\sin x$ und $\cos x$ erkennen und die ersten Glieder hinschreiben.`,
      },
      {
        id: "m-tw-aufgaben-mittel",
        title: "📝 Aufgaben (Mittel)",
        duration: "10 min",
        type: "exercises",
        exerciseDifficulty: 2,
        content: `Taylor-Reihen um beliebige Entwicklungspunkte aufstellen und den Konvergenzradius berechnen.`,
      },
      {
        id: "m-tw-aufgaben-schwer",
        title: "📝 Aufgaben (Schwer)",
        duration: "12 min",
        type: "exercises",
        exerciseDifficulty: 3,
        content: `Fehlerabschatzungen mit dem Restglied nach Lagrange. Konvergenzverhalten am Rand des Konvergenzintervalls.`,
      },
      {
        id: "m-tw-pruefung",
        title: "📋 Prüfung",
        duration: "15 min",
        type: "exercises",
        examMode: true,
        content: `Abschlussprufung: Taylorreihen — Aufgaben aus allen Schwierigkeitsstufen gemischt. Keine Hinweise, Ergebnis erst am Ende. Bestehensgrenze: 70%.`,
      },
    ],
  },
];

export const mathQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-mengenlehre": [
    {
      question: "Was ist $A \\cap B$ wenn $A = \\{1, 2, 3\\}$ und $B = \\{2, 3, 4\\}$?",
      type: "input",
      correct: "{2, 3}",
      explanation: "Die Schnittmenge enthält alle Elemente, die in beiden Mengen sind.",
      hint: "Welche Zahlen kommen in beiden Mengen vor?",
    },
    {
      question: "Welche Menge enthält alle reellen Zahlen?",
      type: "multiple",
      options: ["$\\mathbb{N}$", "$\\mathbb{Z}$", "$\\mathbb{Q}$", "$\\mathbb{R}$"],
      correct: 3,
      explanation: "$\\mathbb{R}$ ist die Menge aller reellen Zahlen.",
    },
    {
      question: "Was bedeutet $\\forall x \\in \\mathbb{R}$?",
      type: "multiple",
      options: [
        "Es existiert ein x",
        "Für alle x",
        "Für kein x",
        "Es gibt genau ein x",
      ],
      correct: 1,
      explanation: "$\\forall$ ist der Allquantor und bedeutet 'für alle'.",
    },
    {
      question: "Was ist $A \\cup B$ wenn $A = \\{1, 2\\}$ und $B = \\{3, 4\\}$?",
      type: "input",
      correct: "{1, 2, 3, 4}",
      explanation: "Die Vereinigung enthält alle Elemente aus beiden Mengen.",
      hint: "Sammle alle Elemente aus A und B zusammen.",
    },
    {
      question: "Was ist $\\overline{A}$ wenn $A = \\{1, 2, 3\\}$ und $U = \\{1, 2, 3, 4, 5\\}$?",
      type: "input",
      correct: "{4, 5}",
      explanation: "Das Komplement enthält alles aus U, was nicht in A ist.",
    },
    {
      question: "Wann ist $P \\rightarrow Q$ falsch?",
      type: "multiple",
      options: [
        "P wahr, Q wahr",
        "P wahr, Q falsch",
        "P falsch, Q wahr",
        "P falsch, Q falsch",
      ],
      correct: 1,
      explanation: "Die Implikation ist nur falsch, wenn die Voraussetzung wahr, aber die Folge falsch ist.",
    },
    {
      question: "Was ist die Negation von $\\exists x: P(x)$?",
      type: "multiple",
      options: [
        "$\\exists x: \\neg P(x)$",
        "$\\forall x: P(x)$",
        "$\\forall x: \\neg P(x)$",
        "$\\neg \\forall x: P(x)$",
      ],
      correct: 2,
      explanation: "Bei der Negation wird $\\exists$ zu $\\forall$ und die Aussage wird negiert.",
    },
    {
      question: "Gilt De Morgan: $\\overline{A \\cup B} = ?$",
      type: "multiple",
      options: [
        "$\\bar{A} \\cup \\bar{B}$",
        "$\\bar{A} \\cap \\bar{B}$",
        "$A \\cap B$",
        "$A \\cup B$",
      ],
      correct: 1,
      explanation: "De Morgan: Das Komplement der Vereinigung ist der Schnitt der Komplemente.",
    },
    {
      question: "Ist $\\forall x \\in \\mathbb{R}: x^2 > 0$ wahr oder falsch?",
      type: "multiple",
      options: ["Wahr", "Falsch"],
      correct: 1,
      explanation: "Falsch! Gegenbeispiel: $x = 0$ → $0^2 = 0$, nicht $> 0$.",
    },
    {
      question: "$|A| = 10$, $|B| = 8$, $|A \\cap B| = 3$. Was ist $|A \\cup B|$?",
      type: "input",
      correct: "15",
      explanation: "Bernoulli: $|A \\cup B| = |A| + |B| - |A \\cap B| = 10 + 8 - 3 = 15$",
      hint: "Verwende die Additionsregel (Satz von Bernoulli).",
    },
  ],
  "mathe-funktionen": [
    {
      question: "Was ist der Definitionsbereich von $f(x) = \\sqrt{x}$?",
      type: "multiple",
      options: [
        "$x > 0$",
        "$x \\geq 0$",
        "$x \\in \\mathbb{R}$",
        "$x < 0$",
      ],
      correct: 1,
      explanation: "Die Quadratwurzel ist nur für nicht-negative Zahlen definiert.",
    },
    {
      question: "Welche Funktion ist gerade?",
      type: "multiple",
      options: ["$f(x) = x^3$", "$f(x) = x^2$", "$f(x) = x + 1$", "$f(x) = \\sin x$"],
      correct: 1,
      explanation: "Eine gerade Funktion erfüllt $f(-x) = f(x)$. Für $f(x) = x^2$ gilt: $(-x)^2 = x^2$.",
    },
  ],
  "mathe1-grenzwerte": [
    {
      question: "Was ist $\\lim_{x \\to 0} \\frac{\\sin x}{x}$?",
      type: "input",
      correct: "1",
      explanation: "Dies ist einer der wichtigsten Grenzwerte in der Analysis.",
      hint: "Denk an L'Hôpital oder die geometrische Interpretation.",
    },
    {
      question: "Welche Regel wendet man bei $\\frac{0}{0}$ an?",
      type: "multiple",
      options: [
        "Produktregel",
        "Kettenregel",
        "L'Hôpital",
        "Substitution",
      ],
      correct: 2,
      explanation: "L'Hôpital's Regel gilt für die Formen $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$.",
    },
  ],
  "mathe1-ableitungen": [
    {
      question: "Was ist die Ableitung von $f(x) = x^3$?",
      type: "input",
      correct: "3x^2",
      explanation: "Potenzregel: $(x^n)' = n \\cdot x^{n-1}$",
      hint: "Verwende die Potenzregel.",
    },
    {
      question: "Was ist $(\\sin x)'$?",
      type: "multiple",
      options: ["$\\cos x$", "$-\\cos x$", "$\\sin x$", "$-\\sin x$"],
      correct: 0,
      explanation: "Die Ableitung von $\\sin x$ ist $\\cos x$.",
    },
    {
      question: "Was ist die Kettenregel für $(f(g(x)))'$?",
      type: "multiple",
      options: [
        "$f'(x) \\cdot g'(x)$",
        "$f'(g(x)) \\cdot g'(x)$",
        "$f(g'(x)) \\cdot g'(x)$",
        "$f'(g(x)) \\cdot g(x)$",
      ],
      correct: 1,
      explanation: "Kettenregel: $(f(g(x)))' = f'(g(x)) \\cdot g'(x)$",
    },
  ],
  "mathe1-integration": [
    {
      question: "Was ist $\\int x^2 \\, dx$?",
      type: "input",
      correct: "x^3/3",
      explanation: "Stammfunktion von $x^n$ ist $\\frac{x^{n+1}}{n+1}$",
      hint: "Erhöhe den Exponenten um 1 und teile durch die neue Potenz.",
    },
    {
      question: "Was besagt der Hauptsatz der Analysis?",
      type: "multiple",
      options: [
        "$\\int_a^b f(x) dx = f(b) - f(a)$",
        "$\\int_a^b f(x) dx = F(b) - F(a)$ mit $F' = f$",
        "$\\int f'(x) dx = f(x)$",
        "Alle Antworten sind richtig",
      ],
      correct: 1,
      explanation: "Der Hauptsatz verknüpft Integration und Differentiation.",
    },
  ],
  "mathe1-reihen": [
    {
      question: "Was ist $\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$?",
      type: "multiple",
      options: ["$\\sin x$", "$\\cos x$", "$e^x$", "$\\ln(1+x)$"],
      correct: 2,
      explanation: "Die Taylor-Reihe von $e^x$ ist $\\sum_{n=0}^{\\infty} \\frac{x^n}{n!}$.",
    },
  ],
  "mathe2-vektoren": [
    {
      question: "Was ist $\\vec{u} \\cdot \\vec{v}$ für orthogonale Vektoren?",
      type: "input",
      correct: "0",
      explanation: "Bei orthogonalen Vektoren ist das Skalarprodukt 0.",
      hint: "Was bedeutet $\\cos(90°)$?",
    },
    {
      question: "Wie viele Komponenten hat ein Vektor in $\\mathbb{R}^3$?",
      type: "multiple",
      options: ["1", "2", "3", "4"],
      correct: 2,
      explanation: "Ein Vektor in $\\mathbb{R}^3$ hat 3 Komponenten.",
    },
  ],
  "mathe2-dgl": [
    {
      question: "Was ist die allgemeine Lösung von $y' = 2y$?",
      type: "input",
      correct: "Ce^{2x}",
      explanation: "Dies ist eine exponentielle Wachstumsgleichung.",
      hint: "Löse durch Trennung der Variablen.",
    },
    {
      question: "Wie lautet die charakteristische Gleichung für $y'' - 3y' + 2y = 0$?",
      type: "multiple",
      options: [
        "$r^2 - 3r + 2 = 0$",
        "$r^2 + 3r + 2 = 0$",
        "$r^2 - 3r - 2 = 0$",
        "$r^2 + 3r - 2 = 0$",
      ],
      correct: 0,
      explanation: "Die Koeffizienten der DGl werden direkt übernommen.",
    },
  ],

  // ==================== STOCHASTIK ====================
  "mathe-stochastik": [
    {
      question: "Ein fairer Würfel wird geworfen. Wie groß ist $P(\\text{ungerade Zahl})$?",
      type: "multiple",
      options: ["$\\frac{1}{6}$", "$\\frac{1}{3}$", "$\\frac{1}{2}$", "$\\frac{2}{3}$"],
      correct: 2,
      explanation: "Ungerade Zahlen: {1, 3, 5} = 3 von 6. Also $P = \\frac{3}{6} = \\frac{1}{2}$.",
    },
    {
      question: "Was ist $P(A \\cup B)$ wenn $P(A) = 0.4$, $P(B) = 0.3$ und A, B sind disjunkt?",
      type: "input",
      correct: "0.7",
      explanation: "Bei disjunkten Ereignissen: $P(A \\cup B) = P(A) + P(B) = 0.4 + 0.3 = 0.7$.",
      hint: "Disjunkt bedeutet $A \\cap B = \\emptyset$.",
    },
    {
      question: "Wie viele Möglichkeiten gibt es, 3 Bücher auf einem Regal anzuordnen?",
      type: "input",
      correct: "6",
      explanation: "Permutation: $3! = 3 \\cdot 2 \\cdot 1 = 6$.",
    },
    {
      question: "Was ist $\\binom{5}{2}$?",
      type: "input",
      correct: "10",
      explanation: "$\\binom{5}{2} = \\frac{5!}{2! \\cdot 3!} = \\frac{120}{2 \\cdot 6} = 10$.",
    },
    {
      question: "Wenn $P(A) = 0.6$ und $P(B|A) = 0.5$, was ist $P(A \\cap B)$?",
      type: "input",
      correct: "0.3",
      explanation: "Bedingte Wahrscheinlichkeit: $P(A \\cap B) = P(B|A) \\cdot P(A) = 0.5 \\cdot 0.6 = 0.3$.",
    },
  ],

  // ==================== KOMPLEXE ZAHLEN ====================
  "mathe-komplexe-zahlen": [
    {
      question: "Was ist $i^2$?",
      type: "input",
      correct: "-1",
      explanation: "Die imaginäre Einheit ist definiert als $i^2 = -1$.",
    },
    {
      question: "Berechne $(2 + 3i) + (1 - i)$.",
      type: "multiple",
      options: ["$3 + 2i$", "$3 + 4i$", "$1 + 2i$", "$3 - 2i$"],
      correct: 0,
      explanation: "Addition: $(2+1) + (3-1)i = 3 + 2i$.",
    },
    {
      question: "Was ist der Betrag von $z = 3 + 4i$?",
      type: "input",
      correct: "5",
      explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{9+16} = \\sqrt{25} = 5$.",
    },
    {
      question: "Was ist das konjugierte von $z = 2 - 5i$?",
      type: "multiple",
      options: ["$-2 + 5i$", "$2 + 5i$", "$-2 - 5i$", "$5 - 2i$"],
      correct: 1,
      explanation: "Das konjugierte $\\bar{z} = a - bi$ wird durch Vorzeichenwechsel des Imaginärteils gebildet: $2 + 5i$.",
    },
    {
      question: "In der Polardarstellung $z = r \\cdot e^{i\\varphi}$, was ist $r$?",
      type: "multiple",
      options: ["Der Realteil", "Der Imaginärteil", "Der Betrag $|z|$", "Das Argument"],
      correct: 2,
      explanation: "$r = |z|$ ist der Betrag der komplexen Zahl.",
    },
  ],

  // ==================== NUMERIK ====================
  "mathe-numerik": [
    {
      question: "Was ist der absolute Fehler für $x_{exakt} = 10$, $x_{approx} = 9.8$?",
      type: "input",
      correct: "0.2",
      explanation: "$|x_{exakt} - x_{approx}| = |10 - 9.8| = 0.2$.",
    },
    {
      question: "Beim Bisektionsverfahren halbiert sich das Intervall in jedem Schritt. Nach wie vielen Schritten ist das Intervall kleiner als $\\frac{1}{8}$ des ursprünglichen?",
      type: "input",
      correct: "3",
      explanation: "$\\frac{1}{2^3} = \\frac{1}{8}$, also nach 3 Schritten.",
    },
    {
      question: "Wie lautet die Newton-Iterationsformel?",
      type: "multiple",
      options: [
        "$x_{n+1} = x_n - f(x_n) \\cdot f'(x_n)$",
        "$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$",
        "$x_{n+1} = x_n + \\frac{f(x_n)}{f'(x_n)}$",
        "$x_{n+1} = \\frac{x_n + f(x_n)}{2}$",
      ],
      correct: 1,
      explanation: "Newton-Verfahren: $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.",
    },
    {
      question: "Welche Konvergenzordnung hat das Newton-Verfahren (bei einfachen Nullstellen)?",
      type: "multiple",
      options: ["Linear", "Quadratisch", "Kubisch", "Logarithmisch"],
      correct: 1,
      explanation: "Das Newton-Verfahren hat quadratische Konvergenz (Ordnung 2).",
    },
    {
      question: "Newton: $f(x) = x^2 - 4$, $x_0 = 3$. Berechne $x_1$.",
      type: "input",
      correct: "2.1667",
      explanation: "$x_1 = 3 - \\frac{9-4}{6} = 3 - \\frac{5}{6} \\approx 2.1667$.",
    },
  ],

  // ==================== GEOMETRIE ====================
  "mathe-geometrie": [
    {
      question: "Was ist die Fläche eines Rechtecks mit $a = 6$ und $b = 4$?",
      type: "input",
      correct: "24",
      explanation: "$A = a \\cdot b = 6 \\cdot 4 = 24$.",
    },
    {
      question: "Was ist das Volumen einer Kugel mit Radius $r = 3$? Gib $\\pi$ als Faktor an (z.B. 36\\pi).",
      type: "input",
      correct: "36pi",
      explanation: "$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi$.",
    },
    {
      question: "Im rechtwinkligen Dreieck: $a = 5$, $b = 12$. Was ist $c$?",
      type: "input",
      correct: "13",
      explanation: "Pythagoras: $c = \\sqrt{a^2 + b^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
    },
    {
      question: "Was ist die Fläche eines Kreises mit Radius $r = 5$? Gib $\\pi$ als Faktor an.",
      type: "input",
      correct: "25pi",
      explanation: "$A = \\pi r^2 = 25\\pi$.",
    },
    {
      question: "Welche Formel beschreibt das Volumen eines Zylinders?",
      type: "multiple",
      options: [
        "$V = \\pi r^2$",
        "$V = \\pi r^2 h$",
        "$V = \\frac{1}{3}\\pi r^2 h$",
        "$V = \\frac{4}{3}\\pi r^3$",
      ],
      correct: 1,
      explanation: "Zylindervolumen: $V = \\pi r^2 h$.",
    },
  ],

  // ==================== TRIGONOMETRIE ====================
  "mathe-trigonometrie": [
    {
      question: "Was ist $\\sin(30°)$?",
      type: "multiple",
      options: ["$0$", "$\\frac{1}{2}$", "$\\frac{\\sqrt{2}}{2}$", "$1$"],
      correct: 1,
      explanation: "$\\sin(30°) = \\frac{1}{2}$.",
    },
    {
      question: "Was ist $\\cos(0°)$?",
      type: "input",
      correct: "1",
      explanation: "$\\cos(0°) = 1$.",
    },
    {
      question: "Im rechtwinkligen Dreieck: Gegenkathete $= 4$, Hypotenuse $= 5$. Was ist $\\sin(\\alpha)$?",
      type: "multiple",
      options: ["$\\frac{3}{5}$", "$\\frac{4}{5}$", "$\\frac{4}{3}$", "$\\frac{5}{4}$"],
      correct: 1,
      explanation: "$\\sin(\\alpha) = \\frac{\\text{Gegenkathete}}{\\text{Hypotenuse}} = \\frac{4}{5}$.",
    },
    {
      question: "Welche Identität gilt immer?",
      type: "multiple",
      options: [
        "$\\sin^2\\alpha + \\cos^2\\alpha = 2$",
        "$\\sin^2\\alpha + \\cos^2\\alpha = 1$",
        "$\\sin\\alpha + \\cos\\alpha = 1$",
        "$\\sin\\alpha \\cdot \\cos\\alpha = 1$",
      ],
      correct: 1,
      explanation: "Grundidentität: $\\sin^2\\alpha + \\cos^2\\alpha = 1$.",
    },
    {
      question: "Was ist $\\tan(45°)$?",
      type: "input",
      correct: "1",
      explanation: "$\\tan(45°) = \\frac{\\sin(45°)}{\\cos(45°)} = \\frac{\\sqrt{2}/2}{\\sqrt{2}/2} = 1$.",
    },
  ],

  // ==================== POTENZEN ====================
  "mathe-potenzen": [
    {
      question: "Was ist $2^3 \\cdot 2^4$?",
      type: "input",
      correct: "128",
      explanation: "$2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$.",
    },
    {
      question: "Was ist $\\log_2(16)$?",
      type: "input",
      correct: "4",
      explanation: "$2^4 = 16$, also $\\log_2(16) = 4$.",
    },
    {
      question: "Was ist $\\sqrt[3]{27}$?",
      type: "input",
      correct: "3",
      explanation: "$3^3 = 27$, also $\\sqrt[3]{27} = 3$.",
    },
    {
      question: "Welche Regel gilt: $\\log(a \\cdot b) = $ ...?",
      type: "multiple",
      options: [
        "$\\log(a) \\cdot \\log(b)$",
        "$\\log(a) + \\log(b)$",
        "$\\frac{\\log(a)}{\\log(b)}$",
        "$\\log(a) - \\log(b)$",
      ],
      correct: 1,
      explanation: "Produktregel des Logarithmus: $\\log(a \\cdot b) = \\log(a) + \\log(b)$.",
    },
    {
      question: "Was ist $5^0$?",
      type: "input",
      correct: "1",
      explanation: "Jede Zahl (außer 0) hoch 0 ist 1: $a^0 = 1$.",
    },
  ],

  // ==================== STATISTIK ====================
  "mathe-statistik": [
    {
      question: "Was ist der Mittelwert von $2, 4, 6, 8, 10$?",
      type: "input",
      correct: "6",
      explanation: "$\\bar{x} = \\frac{2+4+6+8+10}{5} = \\frac{30}{5} = 6$.",
    },
    {
      question: "Was ist der Median von $3, 7, 9, 12, 15$?",
      type: "input",
      correct: "9",
      explanation: "Sortiert: Der mittlere Wert (3. von 5) ist 9.",
    },
    {
      question: "Daten: $1, 3, 5, 7, 9$. Was ist die Varianz $s^2$?",
      type: "input",
      correct: "8",
      explanation: "$\\bar{x} = 5$. $s^2 = \\frac{(1-5)^2+(3-5)^2+(5-5)^2+(7-5)^2+(9-5)^2}{5} = \\frac{16+4+0+4+16}{5} = 8$.",
    },
    {
      question: "Was ist die Standardabweichung wenn die Varianz $s^2 = 9$ ist?",
      type: "input",
      correct: "3",
      explanation: "$s = \\sqrt{s^2} = \\sqrt{9} = 3$.",
    },
    {
      question: "Was gibt der Interquartilsabstand $IQR$ an?",
      type: "multiple",
      options: [
        "Den Mittelwert",
        "Die Spannweite",
        "Die Streubreite des mittleren 50%",
        "Den häufigsten Wert",
      ],
      correct: 2,
      explanation: "$IQR = Q_3 - Q_1$ beschreibt die Streubreite des mittleren 50% der Daten.",
    },
  ],

  "mathe-bruchrechnen": [
    {
      question: "Was ist $\\frac{1}{2} + \\frac{1}{3}$?",
      type: "multiple",
      options: ["$\\frac{2}{5}$", "$\\frac{5}{6}$", "$\\frac{1}{5}$", "$\\frac{3}{5}$"],
      correct: 1,
      explanation: "$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$",
    },
    {
      question: "Was ist $\\frac{2}{3} \\cdot \\frac{3}{4}$?",
      type: "multiple",
      options: ["$\\frac{6}{12}$", "$\\frac{1}{2}$", "$\\frac{5}{7}$", "$\\frac{8}{9}$"],
      correct: 1,
      explanation: "$\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$",
    },
    {
      question: "Welcher Bruch ist gleich $0{,}75$?",
      type: "multiple",
      options: ["$\\frac{1}{4}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$"],
      correct: 2,
      explanation: "$\\frac{3}{4} = 0{,}75$",
    },
    {
      question: "$\\frac{5}{8} : \\frac{5}{4} = ?$",
      type: "multiple",
      options: ["$\\frac{1}{2}$", "$\\frac{25}{32}$", "$\\frac{1}{4}$", "$\\frac{5}{2}$"],
      correct: 0,
      explanation: "$\\frac{5}{8} \\cdot \\frac{4}{5} = \\frac{20}{40} = \\frac{1}{2}$",
    },
    {
      question: "Was ist $\\frac{7}{12} - \\frac{1}{4}$?",
      type: "multiple",
      options: ["$\\frac{1}{3}$", "$\\frac{6}{8}$", "$\\frac{1}{2}$", "$\\frac{4}{12}$"],
      correct: 0,
      explanation: "$\\frac{7}{12} - \\frac{3}{12} = \\frac{4}{12} = \\frac{1}{3}$",
    },
  ],
  "mathe-gleichungen": [
    {
      question: "Löse $3x + 9 = 0$",
      type: "multiple",
      options: ["$x = 3$", "$x = -3$", "$x = 9$", "$x = -9$"],
      correct: 1,
      explanation: "$3x = -9 \\Rightarrow x = -3$",
    },
    {
      question: "Welche Formel löst $x^2 + px + q = 0$?",
      type: "multiple",
      options: ["Mitternachtsformel", "pq-Formel", "Euler-Formel", "abc-Formel"],
      correct: 1,
      explanation: "Die pq-Formel löst quadratische Gleichungen in Normalform.",
    },
    {
      question: "Diskriminante von $x^2 - 4x + 4 = 0$?",
      type: "multiple",
      options: ["$D = 0$", "$D = 4$", "$D = -4$", "$D = 8$"],
      correct: 0,
      explanation: "$D = 16 - 16 = 0$ → doppelte Lösung",
    },
    {
      question: "Nullstellen von $x^2 - 9 = 0$?",
      type: "multiple",
      options: ["$x = 3$", "$x = \\pm 3$", "$x = 9$", "$x = \\pm 9$"],
      correct: 1,
      explanation: "$x^2 = 9 \\Rightarrow x = \\pm 3$",
    },
    {
      question: "Wie viele Lösungen hat $x^2 + 2x + 5 = 0$?",
      type: "multiple",
      options: ["0", "1", "2", "3"],
      correct: 0,
      explanation: "$D = 4 - 20 = -16 < 0$ → keine reelle Lösung",
    },
  ],
  "mathe-termumformung": [
    {
      question: "$(a-b)^2 = ?$",
      type: "multiple",
      options: ["$a^2 - b^2$", "$a^2 - 2ab + b^2$", "$a^2 + 2ab + b^2$", "$a^2 + b^2$"],
      correct: 1,
      explanation: "2. binomische Formel: $(a-b)^2 = a^2 - 2ab + b^2$",
    },
    {
      question: "$(x+4)(x-4) = ?$",
      type: "multiple",
      options: ["$x^2 - 16$", "$x^2 + 16$", "$x^2 - 8x + 16$", "$x^2 + 8x - 16$"],
      correct: 0,
      explanation: "3. binomische Formel: $(a+b)(a-b) = a^2 - b^2$",
    },
    {
      question: "$2(x+3) = ?$",
      type: "multiple",
      options: ["$2x + 3$", "$2x + 6$", "$x + 6$", "$2x + 5$"],
      correct: 1,
      explanation: "Distributivgesetz: $2 \\cdot x + 2 \\cdot 3 = 2x + 6$",
    },
    {
      question: "$x^2 - 25 = ?$ (faktorisiert)",
      type: "multiple",
      options: ["$(x-5)^2$", "$(x+5)(x-5)$", "$(x+5)^2$", "$(x-25)(x+1)$"],
      correct: 1,
      explanation: "$x^2 - 25 = (x+5)(x-5)$ — Differenz der Quadrate",
    },
    {
      question: "$(2x+3)^2 = ?$",
      type: "multiple",
      options: ["$4x^2 + 9$", "$4x^2 + 12x + 9$", "$4x^2 + 6x + 9$", "$2x^2 + 12x + 9$"],
      correct: 1,
      explanation: "$(2x+3)^2 = 4x^2 + 12x + 9$",
    },
  ],
  "mathe-ungleichungen": [
    {
      question: "Löse $-2x > 6$",
      type: "multiple",
      options: ["$x > -3$", "$x < -3$", "$x > 3$", "$x < 3$"],
      correct: 1,
      explanation: "Division durch -2: Vorzeichen wechseln! $x < -3$",
    },
    {
      question: "Was bedeutet $[2, 5)$?",
      type: "multiple",
      options: ["$2 < x < 5$", "$2 \\leq x < 5$", "$2 < x \\leq 5$", "$2 \\leq x \\leq 5$"],
      correct: 1,
      explanation: "$[2, 5)$ = $2 \\leq x < 5$ (geschlossen bei 2, offen bei 5)",
    },
    {
      question: "Löse $x^2 - 1 \\leq 0$",
      type: "multiple",
      options: ["$-1 \\leq x \\leq 1$", "$x \\leq -1$ oder $x \\geq 1$", "$x < 1$", "$x > -1$"],
      correct: 0,
      explanation: "$(x-1)(x+1) \\leq 0 \\Rightarrow -1 \\leq x \\leq 1$",
    },
    {
      question: "Löse $3x - 1 \\geq 5$",
      type: "multiple",
      options: ["$x \\geq 2$", "$x > 2$", "$x \\geq \\frac{4}{3}$", "$x \\geq 6$"],
      correct: 0,
      explanation: "$3x \\geq 6 \\Rightarrow x \\geq 2$",
    },
    {
      question: "$|x| < 3$ bedeutet:",
      type: "multiple",
      options: ["$x < 3$", "$x > -3$", "$-3 < x < 3$", "$x < -3$ oder $x > 3$"],
      correct: 2,
      explanation: "$|x| < a \\Leftrightarrow -a < x < a$",
    },
  ],
  "mathe-kurvendiskussion": [
    {
      question: "$f(x) = x^3$. Wo ist der Wendepunkt?",
      type: "multiple",
      options: ["Bei $x = 0$", "Bei $x = 1$", "Kein Wendepunkt", "Bei $x = -1$"],
      correct: 0,
      explanation: "$f''(x) = 6x = 0 \\Rightarrow x = 0$, $f'''(0) = 6 \\neq 0$",
    },
    {
      question: "Was gilt bei einem lokalen Maximum?",
      type: "multiple",
      options: ["$f'(x) = 0$, $f''(x) > 0$", "$f'(x) = 0$, $f''(x) < 0$", "$f''(x) = 0$", "$f(x) = 0$"],
      correct: 1,
      explanation: "Maximum: $f'(x_0) = 0$ und $f''(x_0) < 0$",
    },
    {
      question: "Monotonie: Wann fällt $f$?",
      type: "multiple",
      options: ["$f'(x) > 0$", "$f'(x) < 0$", "$f''(x) < 0$", "$f(x) < 0$"],
      correct: 1,
      explanation: "$f'(x) < 0$ → $f$ ist fallend",
    },
    {
      question: "$f(x) = x^2 - 2x + 1$. Minimum bei x = ?",
      type: "multiple",
      options: ["$x = 0$", "$x = 1$", "$x = -1$", "$x = 2$"],
      correct: 1,
      explanation: "$f(x) = (x-1)^2$ → Minimum bei $x = 1$ mit $f(1) = 0$",
    },
    {
      question: "Krümmung bei $f''(x) > 0$:",
      type: "multiple",
      options: ["Rechtsgekrümmt", "Linksgekrümmt", "Linear", "Keine Krümmung"],
      correct: 1,
      explanation: "$f''(x) > 0$ → linksgekrümmt (U-Form)",
    },
  ],
  "mathe-gleichungssysteme": [
    {
      question: "Wie viele Lösungen hat ein LGS mit 2 Gleichungen und 2 Unbekannten normalerweise?",
      type: "multiple",
      options: ["0, 1 oder unendlich", "Immer 1", "Immer 2", "Immer unendlich"],
      correct: 0,
      explanation: "Je nach Schnitt: 0 (parallel), 1 (Schnittpunkt), oder unendlich (identisch)",
    },
    {
      question: "Gauß-Verfahren arbeitet mit...",
      type: "multiple",
      options: ["Determinanten", "Zeilenumformungen", "Graphen", "Ableitungen"],
      correct: 1,
      explanation: "Gauß: Zeilenumformungen zum Lösen des Systems",
    },
    {
      question: "$x + y = 3$, $x - y = 1$. Lösung?",
      type: "multiple",
      options: ["$(2, 1)$", "$(1, 2)$", "$(3, 0)$", "$(0, 3)$"],
      correct: 0,
      explanation: "Addition: $2x = 4 \\Rightarrow x = 2$, $y = 1$",
    },
    {
      question: "Cramersche Regel nutzt...",
      type: "multiple",
      options: ["Summen", "Determinanten", "Ableitungen", "Integrale"],
      correct: 1,
      explanation: "Cramer: $x = D_x / D$ mit Determinanten",
    },
    {
      question: "Homogenes LGS hat immer...",
      type: "multiple",
      options: ["Keine Lösung", "Genau eine Lösung", "Mindestens die Nulllösung", "Unendlich viele"],
      correct: 2,
      explanation: "Homogen: $A\\vec{x} = \\vec{0}$ hat immer die Triviallösung $\\vec{x} = \\vec{0}$",
    },
  ],
  "mathe-matrizen": [
    {
      question: "Produkt einer $(2 \\times 3)$ und $(3 \\times 2)$ Matrix hat Dimension...",
      type: "multiple",
      options: ["$(2 \\times 2)$", "$(3 \\times 3)$", "$(2 \\times 3)$", "$(3 \\times 2)$"],
      correct: 0,
      explanation: "$(m \\times n) \\cdot (n \\times p) = (m \\times p)$ → $(2 \\times 2)$",
    },
    {
      question: "Einheitsmatrix: Alle Diagonalelemente sind...",
      type: "multiple",
      options: ["0", "1", "-1", "beliebig"],
      correct: 1,
      explanation: "Einheitsmatrix $I$: Diagonale = 1, Rest = 0",
    },
    {
      question: "$\\det(A) = 0$ bedeutet...",
      type: "multiple",
      options: ["A ist invertierbar", "A ist nicht invertierbar", "A = 0", "A ist symmetrisch"],
      correct: 1,
      explanation: "$\\det(A) = 0$ → singulär → keine Inverse",
    },
    {
      question: "$(AB)^T = ?$",
      type: "multiple",
      options: ["$A^T B^T$", "$B^T A^T$", "$AB$", "$(BA)^T$"],
      correct: 1,
      explanation: "Transponiert: $(AB)^T = B^T A^T$ (Reihenfolge dreht sich um!)",
    },
    {
      question: "Spur einer Matrix = ?",
      type: "multiple",
      options: ["Determinante", "Summe der Diagonalelemente", "Anzahl Zeilen", "Rang"],
      correct: 1,
      explanation: "$\\text{tr}(A) = \\sum a_{ii}$ — Summe der Hauptdiagonale",
    },
  ],
  "mathe-wahrscheinlichkeitsverteilungen": [
    {
      question: "Binomialverteilung: Voraussetzung?",
      type: "multiple",
      options: ["Stetige Werte", "Feste Anzahl Versuche, Erfolg/Misserfolg", "Normalverteilte Daten", "Unendliche Versuche"],
      correct: 1,
      explanation: "Binomial: n feste Bernoulli-Versuche mit konstantem p",
    },
    {
      question: "Normalverteilung: 95% der Werte in...",
      type: "multiple",
      options: ["$\\mu \\pm \\sigma$", "$\\mu \\pm 2\\sigma$", "$\\mu \\pm 3\\sigma$", "$\\mu \\pm 4\\sigma$"],
      correct: 1,
      explanation: "68-95-99,7-Regel: 95% in $\\mu \\pm 2\\sigma$",
    },
    {
      question: "$Bin(20, 0{,}5)$. Erwartungswert?",
      type: "multiple",
      options: ["5", "10", "15", "20"],
      correct: 1,
      explanation: "$E(X) = np = 20 \\cdot 0{,}5 = 10$",
    },
    {
      question: "Poisson-Verteilung nutzt man für...",
      type: "multiple",
      options: ["Stetige Daten", "Seltene Ereignisse", "Normalverteilte Daten", "Ordinaldaten"],
      correct: 1,
      explanation: "Poisson modelliert seltene Ereignisse in festen Intervallen",
    },
    {
      question: "Standardabweichung = ?",
      type: "multiple",
      options: ["Varianz²", "√Varianz", "Erwartungswert²", "Mittelwert"],
      correct: 1,
      explanation: "$\\sigma = \\sqrt{Var(X)}$",
    },
  ],
  "mathe-folgen-reihen": [
    {
      question: "Arithmetische Folge: $a_1 = 2$, $d = 3$. $a_5 = ?$",
      type: "multiple",
      options: ["11", "14", "17", "8"],
      correct: 1,
      explanation: "$a_5 = 2 + 4 \\cdot 3 = 14$",
    },
    {
      question: "Geometrische Reihe konvergiert wenn...",
      type: "multiple",
      options: ["$|q| > 1$", "$|q| < 1$", "$q = 1$", "$q = 0$"],
      correct: 1,
      explanation: "Geometrische Reihe: $S = \\frac{a_1}{1-q}$ nur für $|q| < 1$",
    },
    {
      question: "$\\sum_{n=1}^{100} n = ?$",
      type: "multiple",
      options: ["5000", "5050", "5100", "4950"],
      correct: 1,
      explanation: "$\\frac{100 \\cdot 101}{2} = 5050$",
    },
    {
      question: "Harmonische Reihe...",
      type: "multiple",
      options: ["Konvergiert", "Divergiert", "Ist endlich", "Ist alternierend"],
      correct: 1,
      explanation: "$\\sum \\frac{1}{n}$ divergiert (bekanntes Ergebnis)",
    },
    {
      question: "Grenzwert von $\\frac{1}{n}$ für $n \to \\infty$?",
      type: "multiple",
      options: ["1", "0", "$\\infty$", "-1"],
      correct: 1,
      explanation: "$\\lim_{n \to \\infty} \\frac{1}{n} = 0$",
    },
  ],
  "mathe-analytische-geometrie": [
    {
      question: "Gerade: $\\vec{x} = \\vec{p} + t \\cdot \\vec{v}$. $\\vec{p}$ ist der...",
      type: "multiple",
      options: ["Richtungsvektor", "Stützvektor", "Normalenvektor", "Ortsvektor"],
      correct: 1,
      explanation: "$\\vec{p}$ = Stützvektor (Punkt auf der Geraden)",
    },
    {
      question: "Ebene $ax + by + cz = d$. Normalenvektor?",
      type: "multiple",
      options: ["$(a, b, c)$", "$(d, b, c)$", "$(-a, -b, -c)$", "$(1, 1, 1)$"],
      correct: 0,
      explanation: "$\\vec{n} = (a, b, c)$ ist der Normalenvektor der Ebene",
    },
    {
      question: "Zwei Ebenen sind parallel wenn...",
      type: "multiple",
      options: ["Gleicher Normalenvektor (bis auf Skalar)", "Gleicher Abstand", "Verschiedene d", "Orthogonal"],
      correct: 0,
      explanation: "Parallel: $\\vec{n}_1 = k \\cdot \\vec{n}_2$",
    },
    {
      question: "Abstand Ursprung zur Ebene $2x + y - 2z = 6$?",
      type: "multiple",
      options: ["2", "3", "6", "$\\sqrt{9}$"],
      correct: 0,
      explanation: "$d = \\frac{|0+0+0-6|}{\\sqrt{4+1+4}} = \\frac{6}{3} = 2$",
    },
    {
      question: "Schnitt von Gerade und Ebene: Wie löst man?",
      type: "multiple",
      options: ["Gleichsetzen und t berechnen", "Abstand berechnen", "Kreuzprodukt", "Determinante"],
      correct: 0,
      explanation: "Parameterform in Koordinatenform einsetzen und nach t auflösen",
    },
  ],

  "mathe-prozent-zinsen": [
    { question: "20% von 150?", type: "multiple", options: ["20", "25", "30", "35"], correct: 2, explanation: "$150 \\cdot 0.2 = 30$" },
    { question: "Zinseszins: 1000, 5%, 2J?", type: "multiple", options: ["1100", "1102.50", "1050", "1150"], correct: 1, explanation: "$1000 \\cdot 1.05^2 = 1102.50$" },
    { question: "72er-Regel bei 8%?", type: "multiple", options: ["6J", "9J", "12J", "18J"], correct: 1, explanation: "$72 / 8 = 9$ Jahre" },
    { question: "Preis 200->250. Prozent?", type: "multiple", options: ["20%", "25%", "30%", "15%"], correct: 1, explanation: "$50/200 = 25\%$" },
    { question: "15% Rabatt auf 80?", type: "multiple", options: ["12", "68", "65", "15"], correct: 1, explanation: "$80 - 12 = 68$" },
  ],
  "mathe-koerper": [
    { question: "Volumen Quader 3x4x5?", type: "multiple", options: ["47", "60", "94", "12"], correct: 1, explanation: "$3 \\cdot 4 \\cdot 5 = 60$" },
    { question: "Oberflaeche Wuerfel a=2?", type: "multiple", options: ["8", "12", "24", "16"], correct: 2, explanation: "$6 \\cdot 4 = 24$" },
    { question: "Kugel-Volumen r=3?", type: "multiple", options: ["$36\\pi$", "$27\\pi$", "$108\\pi$", "$9\\pi$"], correct: 0, explanation: "$\\frac{4}{3}\\pi \\cdot 27 = 36\\pi$" },
    { question: "Zylinder r=2, h=5?", type: "multiple", options: ["$10\\pi$", "$20\\pi$", "$40\\pi$", "$50\\pi$"], correct: 1, explanation: "$\\pi \\cdot 4 \\cdot 5 = 20\\pi$" },
    { question: "Kegel = ? des Zylinders", type: "multiple", options: ["1/2", "1/3", "1/4", "2/3"], correct: 1, explanation: "$V = \\frac{1}{3}V_{Zyl}$" },
  ],
  "mathe-kombinatorik": [
    { question: "$P(4) = ?$", type: "multiple", options: ["12", "16", "24", "8"], correct: 2, explanation: "$4! = 24$" },
    { question: "$\\binom{5}{2} = ?$", type: "multiple", options: ["5", "10", "20", "15"], correct: 1, explanation: "$\\frac{5!}{2! \\cdot 3!} = 10$" },
    { question: "Lotto 6 aus 49?", type: "multiple", options: ["13983816", "1000000", "49!", "$6^{49}$"], correct: 0, explanation: "$\\binom{49}{6} = 13.983.816$" },
    { question: "$V(5,2) = ?$", type: "multiple", options: ["10", "20", "25", "15"], correct: 1, explanation: "$\\frac{5!}{3!} = 20$" },
    { question: "Permutationen AABB?", type: "multiple", options: ["24", "12", "6", "4"], correct: 2, explanation: "$\\frac{4!}{2!2!} = 6$" },
  ],
  "mathe-logik": [
    { question: "$p \\Rightarrow q$ falsch wenn...", type: "multiple", options: ["p w, q f", "p f, q w", "beide f", "beide w"], correct: 0, explanation: "Implikation nur falsch bei (w,f)" },
    { question: "$\\lnot(p \\land q) = ?$", type: "multiple", options: ["$\\lnot p \\land \\lnot q$", "$\\lnot p \\lor \\lnot q$", "$p \\lor q$", "$p \\land q$"], correct: 1, explanation: "De Morgan" },
    { question: "Kontraposition von $p \\Rightarrow q$?", type: "multiple", options: ["$q \\Rightarrow p$", "$\\lnot p \\Rightarrow \\lnot q$", "$\\lnot q \\Rightarrow \\lnot p$", "$\\lnot p \\lor q$"], correct: 2, explanation: "Kontraposition: $\\lnot q \\Rightarrow \\lnot p$" },
    { question: "VI-Schritt?", type: "multiple", options: ["Anfang", "n -> n+1", "Widerspruch", "Gegenbeispiel"], correct: 1, explanation: "Induktionsschritt" },
    { question: "$p \\lor \\lnot p$ ist immer...", type: "multiple", options: ["Falsch", "Wahr", "Unbestimmt", "Kontingenz"], correct: 1, explanation: "Tautologie" },
  ],
  "mathe-dreisatz": [
    { question: "5 Arb., 8 Tage. 2 Arb.?", type: "multiple", options: ["3", "20", "10", "16"], correct: 1, explanation: "$\\frac{5 \\cdot 8}{2} = 20$" },
    { question: "4L = 6 Euro. 10L?", type: "multiple", options: ["12", "15", "16", "24"], correct: 1, explanation: "$\\frac{10 \\cdot 6}{4} = 15$" },
    { question: "Direkt proportional?", type: "multiple", options: ["Verhaeltnis", "Produkt", "Summe", "Differenz"], correct: 0, explanation: "a1/b1 = a2/b2" },
    { question: "6 Masch., 12h. 4 Masch.?", type: "multiple", options: ["8", "16", "18", "24"], correct: 2, explanation: "$\\frac{6 \\cdot 12}{4} = 18$" },
    { question: "30% von 200?", type: "multiple", options: ["40", "50", "60", "70"], correct: 2, explanation: "$200 \\cdot 0.3 = 60$" },
  ],
  "mathe-taylorreihen": [
    { question: "Taylor bei a=0?", type: "multiple", options: ["Taylor", "Maclaurin", "Fourier", "Laurent"], correct: 1, explanation: "Maclaurin-Reihe" },
    { question: "$e^x \\approx ?$ (1. Ord.)", type: "multiple", options: ["$1+x$", "$x$", "$1+x^2$", "$1-x$"], correct: 0, explanation: "$e^x \\approx 1+x$" },
    { question: "$\\sin(x) \\approx ?$ (1. Ord.)", type: "multiple", options: ["$x$", "$1$", "$x^2$", "$1-x$"], correct: 0, explanation: "$\\sin(x) \\approx x$" },
    { question: "Konvergenzradius 1/(1-x)?", type: "multiple", options: ["R=0", "R=1", "R=inf", "R=2"], correct: 1, explanation: "|x| < 1, R=1" },
    { question: "$\\cos(0) = ?$", type: "multiple", options: ["0", "1", "-1", "pi"], correct: 1, explanation: "$\\cos(0) = 1$" },
  ],
};