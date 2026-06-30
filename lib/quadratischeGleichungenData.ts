// ============================================================================
// Quadratische Gleichungen — pq-Formel, abc-Formel, Diskriminante, Scheitelpunktform
// ============================================================================

import { Module, QuizQuestion } from "./types";
import { Exercise } from "./mathExercises";
import { createExerciseLessons } from "./lessonHelpers";

// ============================================================================
// MODULE
// ============================================================================

export const quadratischeGleichungenModule: Module = {
  id: "m-quadratische-gleichungen",
  slug: "mathe-quadratische-gleichungen",
  title: "Quadratische Gleichungen",
  description:
    "pq-Formel, abc-Formel, Diskriminante und Scheitelpunktform — quadratische Gleichungen von Grund auf verstehen und anwenden",
  icon: "²",
  color: "#8b5cf6",
  category: "arithmetik-algebra",
  progress: 0,
  merkblatt: `## Merkblatt: Quadratische Gleichungen

### Standardform
$$x^2 + px + q = 0 \\quad\\text{(Normform, } a = 1\\text{)}$$
$$ax^2 + bx + c = 0 \\quad\\text{(allgemeine Form)}$$

### pq-Formel
$$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

### abc-Formel
$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

### Diskriminante
$$D = b^2 - 4ac$$
- $D > 0$: zwei verschiedene reelle Nullstellen
- $D = 0$: eine doppelte Nullstelle (Scheitelpunkt auf x-Achse)
- $D < 0$: keine reellen Nullstellen

### Scheitelpunktform
$$f(x) = a(x - d)^2 + e$$
- Scheitelpunkt: $S(d, e)$
- Symmetrieachse: $x = d$
- $a > 0$: nach oben geöffnet, $a < 0$: nach unten geöffnet

### Umrechnung: Standardform → Scheitelpunktform
- $d = -\\frac{p}{2} = -\\frac{b}{2a}$
- $e = -\\left(\\frac{p}{2}\\right)^2 + q = c - \\frac{b^2}{4a}$`,

  lessons: [
    // ======================================================================
    // LEKTION 1: Die pq-Formel
    // ======================================================================
    {
      id: "qg-1",
      title: "Die pq-Formel",
      duration: "18 min",
      type: "text",
      content: `## Was ist eine quadratische Gleichung?

> Quadratische Gleichungen sind eines der wichtigsten Themen der Oberstufe und der weiterführenden Mathematik. Sie tauchen in Physik (Wurfparabeln), Ingenieurwesen (Optimierung) und Informatik (Algorithmen) überall auf.

Eine **quadratische Gleichung** hat die Form:

$$x^2 + px + q = 0$$

Das ist die sogenannte **Normalform** (auch: Normform). Der Koeffizient vor $x^2$ ist hier $1$.

**Beispiele für quadratische Gleichungen:**
- $x^2 - 5x + 6 = 0$ mit $p = -5$, $q = 6$
- $x^2 + 2x - 8 = 0$ mit $p = 2$, $q = -8$
- $x^2 - 4x = 0$ mit $p = -4$, $q = 0$

---

## Die pq-Formel

Die **pq-Formel** löst quadratische Gleichungen in Normalform:

$$x_{1,2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

Das "$\\pm$" bedeutet: Du rechnest einmal mit "$+$" und einmal mit "$-$" — so erhältst du die beiden Lösungen $x_1$ und $x_2$.

---

## Schritt-für-Schritt: So wendest du die pq-Formel an

**Schritt 1:** Gleichung in die Form $x^2 + px + q = 0$ bringen

**Schritt 2:** $p$ und $q$ ablesen

**Schritt 3:** In die pq-Formel einsetzen

**Schritt 4:** Probe: Setze beide Lösungen in die ursprüngliche Gleichung ein

---

## Beispiel 1: $x^2 - 5x + 6 = 0$

**Schritt 1:** Die Gleichung ist bereits in Normalform.

**Schritt 2:** $p = -5$, $q = 6$

**Schritt 3:** Einsetzen:

$$x_{1,2} = -\\frac{-5}{2} \\pm \\sqrt{\\left(\\frac{-5}{2}\\right)^2 - 6}$$

$$x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6}$$

$$x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - \\frac{24}{4}}$$

$$x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{1}{4}}$$

$$x_{1,2} = \\frac{5}{2} \\pm \\frac{1}{2}$$

Also:
- $x_1 = \\frac{5}{2} + \\frac{1}{2} = \\frac{6}{2} = 3$
- $x_2 = \\frac{5}{2} - \\frac{1}{2} = \\frac{4}{2} = 2$

**Probe:**
- $x_1 = 3$: $3^2 - 5 \\cdot 3 + 6 = 9 - 15 + 6 = 0$ ✓
- $x_2 = 2$: $2^2 - 5 \\cdot 2 + 6 = 4 - 10 + 6 = 0$ ✓

---

## Beispiel 2: $x^2 + 2x - 8 = 0$

$p = 2$, $q = -8$

$$x_{1,2} = -\\frac{2}{2} \\pm \\sqrt{\\left(\\frac{2}{2}\\right)^2 - (-8)}$$

$$x_{1,2} = -1 \\pm \\sqrt{1 + 8} = -1 \\pm \\sqrt{9} = -1 \\pm 3$$

- $x_1 = -1 + 3 = 2$
- $x_2 = -1 - 3 = -4$

**Probe:** $2^2 + 2 \\cdot 2 - 8 = 4 + 4 - 8 = 0$ ✓

---

## Die drei Fälle

Der **Ausdruck unter der Wurzel** (das spätere "Diskriminanten-Vorzeichen") bestimmt, wie viele Lösungen es gibt:

| Bedeutung | Anzahl Lösungen |
|-----------|----------------|
| $\\left(\\frac{p}{2}\\right)^2 - q > 0$ | Zwei verschiedene reelle Lösungen |
| $\\left(\\frac{p}{2}\\right)^2 - q = 0$ | Genau eine Lösung (doppelte Nullstelle) |
| $\\left(\\frac{p}{2}\\right)^2 - q < 0$ | Keine reellen Lösungen |

---

## Beispiel 3: Doppelte Nullstelle

$x^2 - 6x + 9 = 0$

$p = -6$, $q = 9$

$$\\left(\\frac{p}{2}\\right)^2 - q = \\left(\\frac{-6}{2}\\right)^2 - 9 = 9 - 9 = 0$$

Genau eine Lösung: $x = -\\frac{p}{2} = 3$

Probe: $3^2 - 6 \\cdot 3 + 9 = 9 - 18 + 9 = 0$ ✓

---

## Beispiel 4: Keine reellen Lösungen

$x^2 + x + 1 = 0$

$p = 1$, $q = 1$

$$\\left(\\frac{p}{2}\\right)^2 - q = \\left(\\frac{1}{2}\\right)^2 - 1 = \\frac{1}{4} - 1 = -\\frac{3}{4} < 0$$

Die Wurzel aus einer negativen Zahl ist nicht reell — es gibt **keine reellen Lösungen**.

---

## Herleitung der pq-Formel (Vervollständigung der Quadrate)

Die pq-Formel basiert auf der Technik "quadratisch ergänzen":

$$x^2 + px + q = 0$$

$$x^2 + px = -q$$

$$x^2 + px + \\left(\\frac{p}{2}\\right)^2 = -q + \\left(\\frac{p}{2}\\right)^2$$

$$\\left(x + \\frac{p}{2}\\right)^2 = \\left(\\frac{p}{2}\\right)^2 - q$$

$$x + \\frac{p}{2} = \\pm\\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

$$x = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

> **Merke:** Die pq-Formel funktioniert nur, wenn der Koeffizient vor $x^2$ gleich $1$ ist. Sonst musst du zuerst durch $a$ dividieren oder die abc-Formel verwenden.

---

[GUIDED_START]
**Schritt-für-Schritt:** Löse $x^2 - 8x + 12 = 0$

**Schritt 1:** Ablesen: $p = -8$, $q = 12$

**Schritt 2:** Unter der Wurzel: $\\left(\\frac{-8}{2}\\right)^2 - 12 = 16 - 12 = 4$

**Schritt 3:** Wurzel ziehen: $\\sqrt{4} = 2$

**Schritt 4:** Lösungen: $x_{1,2} = -\\frac{-8}{2} \\pm 2 = 4 \\pm 2$

**Schritt 5:** $x_1 = 6$, $x_2 = 2$

**Probe:** $6^2 - 8 \\cdot 6 + 12 = 36 - 48 + 12 = 0$ ✓
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Löse $x^2 - 4x + 3 = 0$

**Lösung:** $p = -4$, $q = 3$. $x_{1,2} = 2 \\pm \\sqrt{4-3} = 2 \\pm 1$. Also $x_1 = 3$, $x_2 = 1$.

**Aufgabe 2:** Löse $x^2 + 6x + 5 = 0$

**Lösung:** $p = 6$, $q = 5$. $x_{1,2} = -3 \\pm \\sqrt{9-5} = -3 \\pm 2$. Also $x_1 = -1$, $x_2 = -5$.

**Aufgabe 3:** Warum hat $x^2 + 4 = 0$ keine reellen Lösungen?

**Lösung:** $p = 0$, $q = 4$. $\\left(\\frac{0}{2}\\right)^2 - 4 = -4 < 0$. Keine reelle Wurzel möglich.
[PRACTICE_END]`,
    },

    // ======================================================================
    // LEKTION 2: abc-Formel & Diskriminante
    // ======================================================================
    {
      id: "qg-2",
      title: "abc-Formel & Diskriminante",
      duration: "18 min",
      type: "text",
      content: `## Die allgemeine quadratische Gleichung

> Die abc-Formel ist die universelle Methode zum Lösen quadratischer Gleichungen — sie funktioniert immer, auch wenn $a \\neq 1$ ist. Die Diskriminante verrät dir vor dem Lösen, wie viele Lösungen zu erwarten sind.

Die **allgemeine Form** einer quadratischen Gleichung lautet:

$$ax^2 + bx + c = 0$$

mit $a, b, c \\in \\mathbb{R}$ und $a \\neq 0$.

**Wichtig:** Wenn $a = 1$ ist, dann ist $b = p$ und $c = q$ — und die abc-Formel wird zur pq-Formel!

---

## Die abc-Formel

$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

---

## Schritt-für-Schritt

**Schritt 1:** Gleichung in die Form $ax^2 + bx + c = 0$ bringen

**Schritt 2:** $a$, $b$, $c$ ablesen (auf Vorzeichen achten!)

**Schritt 3:** Diskriminante $D = b^2 - 4ac$ berechnen

**Schritt 4:** Lösungen mit der abc-Formel berechnen

**Schritt 5:** Probe durchführen

---

## Beispiel 1: $2x^2 - 5x + 3 = 0$

$a = 2$, $b = -5$, $c = 3$

**Diskriminante:**
$$D = (-5)^2 - 4 \\cdot 2 \\cdot 3 = 25 - 24 = 1$$

$D = 1 > 0$ — zwei reelle Lösungen!

**Lösungen:**
$$x_{1,2} = \\frac{-(-5) \\pm \\sqrt{1}}{2 \\cdot 2} = \\frac{5 \\pm 1}{4}$$

- $x_1 = \\frac{5 + 1}{4} = \\frac{6}{4} = 1{,}5$
- $x_2 = \\frac{5 - 1}{4} = \\frac{4}{4} = 1$

**Probe:**
- $2 \\cdot 1{,}5^2 - 5 \\cdot 1{,}5 + 3 = 4{,}5 - 7{,}5 + 3 = 0$ ✓
- $2 \\cdot 1^2 - 5 \\cdot 1 + 3 = 2 - 5 + 3 = 0$ ✓

---

## Die Diskriminante — der "Entscheider"

Die **Diskriminante** ist der Ausdruck unter der Wurzel:

$$D = b^2 - 4ac$$

| Diskriminante | Bedeutung | Geometrisch |
|---------------|-----------|-------------|
| $D > 0$ | Zwei verschiedene reelle Nullstellen | Parabel schneidet x-Achse zweimal |
| $D = 0$ | Eine doppelte Nullstelle | Parabel berührt x-Achse genau einmal |
| $D < 0$ | Keine reellen Nullstellen | Parabel schneidet x-Achse nicht |

> **Merke:** Die Diskriminante ist ein mächtiges Werkzeug — du kannst NUR damit bestimmen, ob und wie viele Lösungen es gibt, OHNE die Lösungen selbst zu berechnen!

---

## Beispiel 2: Diskriminante berechnen

### a) $x^2 - 4x + 4 = 0$

$a = 1$, $b = -4$, $c = 4$

$D = (-4)^2 - 4 \\cdot 1 \\cdot 4 = 16 - 16 = 0$

**Ergebnis:** Eine doppelte Nullstelle bei $x = \\frac{4}{2} = 2$.

### b) $3x^2 + 2x + 1 = 0$

$a = 3$, $b = 2$, $c = 1$

$D = 2^2 - 4 \\cdot 3 \\cdot 1 = 4 - 12 = -8$

**Ergebnis:** $D < 0$ — keine reellen Nullstellen!

### c) $x^2 - 3x - 10 = 0$

$a = 1$, $b = -3$, $c = -10$

$D = (-3)^2 - 4 \\cdot 1 \\cdot (-10) = 9 + 40 = 49$

$D = 49 > 0$ — zwei Nullstellen.

$x_{1,2} = \\frac{3 \\pm 7}{2}$, also $x_1 = 5$, $x_2 = -2$.

---

## pq-Formel vs. abc-Formel

| | pq-Formel | abc-Formel |
|--|-----------|------------|
| **Form** | $x^2 + px + q = 0$ | $ax^2 + bx + c = 0$ |
| **Voraussetzung** | $a = 1$ | $a \\neq 0$ (immer!) |
| **Formel** | $x = -\\frac{p}{2} \\pm \\sqrt{(\\frac{p}{2})^2 - q}$ | $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ |
| **Vorteil** | Schneller zu rechnen | Universell anwendbar |

**Empfehlung:** Wenn $a = 1$ ist, nutze die pq-Formel (weniger Rechnearbeit). Sonst die abc-Formel.

---

## Beispiel 3: Scheitelpunkt aus Koeffizienten

Aus der abc-Formel ergibt sich direkt die Formel für den Scheitelpunkt:

$$d = -\\frac{b}{2a}, \\quad e = c - \\frac{b^2}{4a} = f(d)$$

Für $f(x) = 2x^2 - 8x + 6$:

$d = -\\frac{-8}{2 \\cdot 2} = 2$

$e = 6 - \\frac{(-8)^2}{4 \\cdot 2} = 6 - \\frac{16}{1} = 6 - 8 = -2$

Scheitelpunkt: $S(2, -2)$

---

[GUIDED_START]
**Schritt-für-Schritt:** Bestimme die Nullstellen von $3x^2 + 6x - 9 = 0$

**Schritt 1:** $a = 3$, $b = 6$, $c = -9$

**Schritt 2:** Diskriminante: $D = 6^2 - 4 \\cdot 3 \\cdot (-9) = 36 + 108 = 144$

**Schritt 3:** $D = 144 > 0$ — zwei reelle Nullstellen

**Schritt 4:** $x_{1,2} = \\frac{-6 \\pm \\sqrt{144}}{2 \\cdot 3} = \\frac{-6 \\pm 12}{6}$

**Schritt 5:** $x_1 = \\frac{-6 + 12}{6} = 1$, $x_2 = \\frac{-6 - 12}{6} = -3$

**Probe:** $3 \\cdot 1^2 + 6 \\cdot 1 - 9 = 3 + 6 - 9 = 0$ ✓
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Berechne die Diskriminante von $2x^2 - 4x + 2 = 0$.

**Lösung:** $D = (-4)^2 - 4 \\cdot 2 \\cdot 2 = 16 - 16 = 0$. Eine doppelte Nullstelle.

**Aufgabe 2:** Welche Aussage trifft zu, wenn $D < 0$ ist?

**Lösung:** Die quadratische Gleichung hat keine reellen Nullstellen. Die Parabel schneidet die x-Achse nicht.

**Aufgabe 3:** Löse $x^2 - 2x - 15 = 0$ mit der abc-Formel.

**Lösung:** $D = 4 + 60 = 64$. $x_{1,2} = \\frac{2 \\pm 8}{2}$. $x_1 = 5$, $x_2 = -3$.
[PRACTICE_END]`,
    },

    // ======================================================================
    // LEKTION 3: Scheitelpunktform & Nullstellen
    // ======================================================================
    {
      id: "qg-3",
      title: "Scheitelpunktform & Nullstellen",
      duration: "16 min",
      type: "text",
      content: `## Die Scheitelpunktform

> Die Scheitelpunktform ist die eleganteste Darstellung einer quadratischen Funktion. Du kannst Scheitelpunkt, Öffnungsrichtung und Nullstellen direkt ablesen — kein Umrechnen nötig!

Die **Scheitelpunktform** (auch: Scheitelform, Vertex-Form) lautet:

$$f(x) = a(x - d)^2 + e$$

wobei:
- $S(d, e)$ der **Scheitelpunkt** ist
- $a$ die **Öffnungsrichtung** und Stauchung/Streckung bestimmt
- $x = d$ die **Symmetrieachse** ist

---

## Was bedeutet jeder Parameter?

### Der Parameter $a$
- $a > 0$: Parabel öffnet **nach oben** (hat ein Minimum)
- $a < 0$: Parabel öffnet **nach unten** (hat ein Maximum)
- $|a| > 1$: Parabel ist **gestreckt** (schmaler)
- $|a| < 1$: Parabel ist **gestaucht** (breiter)

### Der Parameter $d$
- Verschiebung in **x-Richtung**
- $d > 0$: Verschiebung nach **rechts**
- $d < 0$: Verschiebung nach **links**

### Der Parameter $e$
- Verschiebung in **y-Richtung**
- $e > 0$: Verschiebung nach **oben**
- $e < 0$: Verschiebung nach **unten**

---

## Von Standardform zu Scheitelpunktform

Du kannst $f(x) = ax^2 + bx + c$ durch **quadratisch Ergänzen** umformen:

**Methode 1: Ausklammern und ergänzen**

$f(x) = ax^2 + bx + c$

$f(x) = a\\left(x^2 + \\frac{b}{a}x\\right) + c$

$f(x) = a\\left(x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 - \\left(\\frac{b}{2a}\\right)^2\\right) + c$

$f(x) = a\\left(x + \\frac{b}{2a}\\right)^2 - a\\left(\\frac{b}{2a}\\right)^2 + c$

$f(x) = a\\left(x + \\frac{b}{2a}\\right)^2 + c - \\frac{b^2}{4a}$

Also:
$$d = -\\frac{b}{2a}, \\quad e = c - \\frac{b^2}{4a}$$

---

## Beispiel 1: Umwandlung

Forme $f(x) = x^2 - 6x + 8$ in Scheitelpunktform um.

**Schritt 1:** $a = 1$, $b = -6$, $c = 8$

**Schritt 2:** $d = -\\frac{-6}{2 \\cdot 1} = 3$

**Schritt 3:** $e = 8 - \\frac{(-6)^2}{4 \\cdot 1} = 8 - 9 = -1$

**Ergebnis:** $f(x) = (x - 3)^2 - 1$

Scheitelpunkt: $S(3, -1)$

---

## Nullstellen aus der Scheitelpunktform berechnen

Setze $f(x) = 0$:

$$a(x - d)^2 + e = 0$$

$$(x - d)^2 = -\\frac{e}{a}$$

$$x - d = \\pm\\sqrt{-\\frac{e}{a}}$$

$$x_{1,2} = d \\pm \\sqrt{-\\frac{e}{a}}$$

**Voraussetzung:** $-\\frac{e}{a} \\geq 0$, also $e$ und $a$ müssen **verschiedene Vorzeichen** haben (oder $e = 0$).

---

## Beispiel 2: Nullstellen aus der Scheitelpunktform

$f(x) = (x - 3)^2 - 1$

$a = 1$, $d = 3$, $e = -1$

$x_{1,2} = 3 \\pm \\sqrt{-\\frac{-1}{1}} = 3 \\pm \\sqrt{1} = 3 \\pm 1$

- $x_1 = 4$
- $x_2 = 2$

**Probe:** $f(4) = (4-3)^2 - 1 = 1 - 1 = 0$ ✓

---

## Beispiel 3: Negative Öffnungsrichtung

Forme $f(x) = -2x^2 + 12x - 14$ in Scheitelpunktform um.

$a = -2$, $b = 12$, $c = -14$

$d = -\\frac{12}{2 \\cdot (-2)} = 3$

$e = -14 - \\frac{144}{4 \\cdot (-2)} = -14 + 18 = 4$

**Ergebnis:** $f(x) = -2(x - 3)^2 + 4$

Scheitelpunkt: $S(3, 4)$ — Maximum!

**Nullstellen:**

$x_{1,2} = 3 \\pm \\sqrt{-\\frac{4}{-2}} = 3 \\pm \\sqrt{2}$

$x_1 \\approx 1{,}59$, $x_2 \\approx 4{,}41$

---

## Beispiel 4: Keine Nullstellen

$f(x) = (x - 1)^2 + 3$

$a = 1$, $d = 1$, $e = 3$

$x_{1,2} = 1 \\pm \\sqrt{-\\frac{3}{1}} = 1 \\pm \\sqrt{-3}$

Die Wurzel aus $-3$ ist nicht reell — es gibt **keine Nullstellen**!

Geometrisch: Der Scheitelpunkt $S(1, 3)$ liegt **oberhalb** der x-Achse, und die Parabel öffnet sich nach oben.

---

## Scheitelpunktform — die Vorteile

| Was du sehen willst | Wie du es abliest |
|--------------------|--------------------|
| Scheitelpunkt | Direkt: $S(d, e)$ |
| Symmetrieachse | $x = d$ |
| Öffnungsrichtung | Vorzeichen von $a$ |
| Stauchung/Streckung | Betrag $|a|$ |
| Nullstellen | $d \\pm \\sqrt{-e/a}$ (wenn $-e/a \\geq 0$) |

---

[GUIDED_START]
**Schritt-für-Schritt:** Bestimme Nullstellen von $f(x) = 2(x - 1)^2 - 8$

**Schritt 1:** Scheitelpunkt ablesen: $S(1, -8)$

**Schritt 2:** $a = 2$, $e = -8$. Prüfung: $-e/a = 4 > 0$ — es gibt Nullstellen!

**Schritt 3:** $x_{1,2} = 1 \\pm \\sqrt{4} = 1 \\pm 2$

**Schritt 4:** $x_1 = 3$, $x_2 = -1$

**Probe:** $f(3) = 2(3-1)^2 - 8 = 2 \\cdot 4 - 8 = 0$ ✓
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Gib den Scheitelpunkt von $f(x) = -(x + 2)^2 + 5$ an.

**Lösung:** $d = -2$, $e = 5$. Scheitelpunkt: $S(-2, 5)$. Die Parabel öffnet sich nach unten.

**Aufgabe 2:** Forme $f(x) = x^2 + 4x + 3$ in Scheitelpunktform um.

**Lösung:** $d = -2$, $e = 3 - 4 = -1$. Also $f(x) = (x + 2)^2 - 1$. Scheitelpunkt $S(-2, -1)$.

**Aufgabe 3:** Bestimme die Nullstellen von $f(x) = 3(x - 2)^2 - 12$.

**Lösung:** $x_{1,2} = 2 \\pm \\sqrt{-(-12)/3} = 2 \\pm \\sqrt{4} = 2 \\pm 2$. Also $x_1 = 4$, $x_2 = 0$.
[PRACTICE_END]`,
    },

    // ======================================================================
    // QUIZ
    // ======================================================================
    {
      id: "qg-quiz",
      title: "Abschlusstest: Quadratische Gleichungen",
      duration: "15 min",
      type: "quiz",
      content:
        "Beantworte die 10 Fragen. Du brauchst mindestens 80% zum Bestehen.",
    },

    // ======================================================================
    // AUFGABEN & PRÜFUNG
    // ======================================================================
    ...createExerciseLessons("qg", "Quadratische Gleichungen", {
      easy: `Die pq-Formel auf einfache Gleichungen der Form $x^2 + px + q = 0$ anwenden. Grundlegende Vorzeichen- und Rechenregeln.`,
      medium: `Die abc-Formel anwenden, die Diskriminante berechnen und interpretieren. Scheitelpunkt ablesen.`,
      hard: `Scheitelpunktform bestimmen, Nullstellen aus der Scheitelpunktform berechnen, Schnittpunkte mit Geraden, Randwertprobleme.`,
    }),
  ],
};

// ============================================================================
// QUIZ — 10 Fragen
// ============================================================================

export const quadratischeGleichungenQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-quadratische-gleichungen": [
    {
      question:
        "Welche Gleichung ist in der Normalform $x^2 + px + q = 0$?",
      type: "multiple",
      options: [
        "$2x^2 + 3x - 1 = 0$",
        "$x^2 - 5x + 6 = 0$",
        "$x^3 + x - 2 = 0$",
        "$x^2 = 4$",
      ],
      correct: 1,
      explanation:
        "Die Normalform verlangt den Koeffizienten $1$ vor $x^2$. Nur $x^2 - 5x + 6 = 0$ erfüllt das.",
    },
    {
      question: "Was ist $p$ bei der Gleichung $x^2 - 7x + 10 = 0$?",
      type: "multiple",
      options: ["$7$", "$-7$", "$10$", "$-10$"],
      correct: 1,
      explanation:
        "In $x^2 + px + q = 0$ ist $p$ der Koeffizient von $x$. Bei $x^2 - 7x + 10 = 0$ ist $p = -7$.",
    },
    {
      question:
        "Welche Lösungen hat $x^2 - 5x + 6 = 0$?",
      type: "multiple",
      options: [
        "$x_1 = 1, \\; x_2 = 6$",
        "$x_1 = 2, \\; x_2 = 3$",
        "$x_1 = -2, \\; x_2 = -3$",
        "$x_1 = -1, \\; x_2 = -6$",
      ],
      correct: 1,
      explanation:
        "Mit pq-Formel: $x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\frac{1}{2}$. Also $x_1 = 3$, $x_2 = 2$.",
    },
    {
      question: "Was besagt die Diskriminante $D = b^2 - 4ac$?",
      type: "multiple",
      options: [
        "$D > 0$: keine reellen Lösungen",
        "$D = 0$: zwei verschiedene Lösungen",
        "$D < 0$: keine reellen Lösungen",
        "$D > 0$: eine doppelte Lösung",
      ],
      correct: 2,
      explanation:
        "$D > 0$: zwei Lösungen. $D = 0$: eine doppelte Lösung. $D < 0$: keine reellen Lösungen.",
    },
    {
      question:
        "Was ist die Diskriminante von $2x^2 - 4x + 2 = 0$?",
      type: "multiple",
      options: ["$D = 0$", "$D = 8$", "$D = -8$", "$D = 16$"],
      correct: 0,
      explanation:
        "$D = (-4)^2 - 4 \\cdot 2 \\cdot 2 = 16 - 16 = 0$. Eine doppelte Nullstelle.",
    },
    {
      question: "Wie lautet die abc-Formel?",
      type: "multiple",
      options: [
        "$x = \\frac{-b \\pm \\sqrt{b^2 + 4ac}}{2a}$",
        "$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
        "$x = \\frac{b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
        "$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{a}$",
      ],
      correct: 1,
      explanation:
        "Die abc-Formel: $x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.",
    },
    {
      question:
        "Was ist der Scheitelpunkt von $f(x) = (x - 3)^2 + 2$?",
      type: "multiple",
      options: [
        "$S(3, 2)$",
        "$S(-3, 2)$",
        "$S(3, -2)$",
        "$S(-3, -2)$",
      ],
      correct: 0,
      explanation:
        "In $f(x) = a(x - d)^2 + e$ ist der Scheitelpunkt $S(d, e)$. Also $S(3, 2)$.",
    },
    {
      question:
        "Welche Nullstellen hat $f(x) = (x - 1)^2 - 9$?",
      type: "multiple",
      options: [
        "$x_1 = 4, \\; x_2 = -2$",
        "$x_1 = 3, \\; x_2 = -3$",
        "$x_1 = 1, \\; x_2 = -1$",
        "$x_1 = 10, \\; x_2 = -8$",
      ],
      correct: 0,
      explanation:
        "$(x-1)^2 = 9 \\Rightarrow x - 1 = \\pm 3$. Also $x_1 = 4$, $x_2 = -2$.",
    },
    {
      question: "Für welche Gleichung gilt $D < 0$?",
      type: "multiple",
      options: [
        "$x^2 - 4x + 4 = 0$",
        "$x^2 - 4x + 3 = 0$",
        "$x^2 + 2x + 5 = 0$",
        "$x^2 - 9 = 0$",
      ],
      correct: 2,
      explanation:
        "$D = 2^2 - 4 \\cdot 1 \\cdot 5 = 4 - 20 = -16 < 0$. Keine reellen Nullstellen.",
    },
    {
      question:
        "Wie viele Nullstellen hat $f(x) = -x^2 + 4x - 4$?",
      type: "multiple",
      options: [
        "Keine",
        "Genau eine (doppelte Nullstelle)",
        "Zwei verschiedene",
        "Unendlich viele",
      ],
      correct: 1,
      explanation:
        "$D = 16 - 16 = 0$. Eine doppelte Nullstelle bei $x = 2$. Der Scheitelpunkt liegt auf der x-Achse.",
    },
  ],
};

// ============================================================================
// PRACTICE EXERCISES — Schwierigkeit 1/2/3 (je 3-4 Aufgaben)
// ============================================================================

export const quadratischeGleichungenPractice: Exercise[] = [
  // === Schwierigkeit 1: pq-Formel Grundlagen ===
  {
    id: "qg-p-1",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 1,
    type: "input",
    question:
      "Löse mit der pq-Formel: $x^2 - 5x + 6 = 0$. Gib die **kleinere** Lösung an.",
    expectedAnswer: "2",
    format: "Ganze Zahl",
    hint: "Lies $p$ und $q$ ab und setze in die pq-Formel ein.",
    solution:
      "$p = -5$, $q = 6$. $x_{1,2} = \\frac{5}{2} \\pm \\sqrt{\\frac{25}{4} - 6} = \\frac{5}{2} \\pm \\frac{1}{2}$. Kleinere Lösung: $x_2 = 2$.",
  },
  {
    id: "qg-p-2",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 1,
    type: "input",
    question:
      "Löse mit der pq-Formel: $x^2 + 2x - 8 = 0$. Gib die **größere** Lösung an.",
    expectedAnswer: "2",
    format: "Ganze Zahl",
    solution:
      "$p = 2$, $q = -8$. $x_{1,2} = -1 \\pm \\sqrt{1 + 8} = -1 \\pm 3$. Größere Lösung: $x_1 = 2$.",
  },
  {
    id: "qg-p-3",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 1,
    type: "multiple",
    question:
      "Welche Gleichung hat die Lösungen $x_1 = 3$ und $x_2 = -1$?",
    options: [
      { label: "$x^2 - 2x - 3 = 0$", value: "a" },
      { label: "$x^2 + 2x - 3 = 0$", value: "b" },
      { label: "$x^2 - 4x + 3 = 0$", value: "c" },
      { label: "$x^2 + 4x + 3 = 0$", value: "d" },
    ],
    correctOption: "a",
    solution:
      "Aus $x_1 = 3$, $x_2 = -1$: $p = -(x_1 + x_2) = -2$ und $q = x_1 \\cdot x_2 = -3$. Also $x^2 - 2x - 3 = 0$.",
  },
  {
    id: "qg-p-4",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 1,
    type: "input",
    question:
      "Löse: $x^2 - 6x + 9 = 0$. Gib die Lösung an.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution:
      "$p = -6$, $q = 9$. $(\\frac{-6}{2})^2 - 9 = 9 - 9 = 0$. Eine Lösung: $x = 3$ (doppelte Nullstelle).",
  },

  // === Schwierigkeit 2: abc-Formel & Diskriminante ===
  {
    id: "qg-p-5",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 2,
    type: "input",
    question:
      "Löse mit der abc-Formel: $2x^2 - 5x + 3 = 0$. Gib die **größere** Lösung an.",
    expectedAnswer: "1.5",
    tolerance: 0.01,
    format: "Dezimalzahl",
    hint: "$a = 2$, $b = -5$, $c = 3$. Diskriminante zuerst berechnen.",
    solution:
      "$D = 25 - 24 = 1$. $x_{1,2} = \\frac{5 \\pm 1}{4}$. Größere Lösung: $x_1 = \\frac{6}{4} = 1{,}5$.",
  },
  {
    id: "qg-p-6",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 2,
    type: "input",
    question:
      "Berechne die Diskriminante von $3x^2 + 2x - 1 = 0$.",
    expectedAnswer: "16",
    format: "Ganze Zahl",
    solution:
      "$D = 2^2 - 4 \\cdot 3 \\cdot (-1) = 4 + 12 = 16$.",
  },
  {
    id: "qg-p-7",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 2,
    type: "multiple",
    question:
      "Wie viele reelle Nullstellen hat $f(x) = x^2 + x + 1$?",
    options: [
      { label: "Keine", value: "a" },
      { label: "Genau eine", value: "b" },
      { label: "Zwei", value: "c" },
      { label: "Unendlich viele", value: "d" },
    ],
    correctOption: "a",
    solution:
      "$D = 1^2 - 4 \\cdot 1 \\cdot 1 = 1 - 4 = -3 < 0$. Keine reellen Nullstellen.",
  },

  // === Schwierigkeit 3: Scheitelpunktform & komplexe Aufgaben ===
  {
    id: "qg-p-8",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 3,
    type: "input",
    question:
      "Bestimme den Scheitelpunkt von $f(x) = x^2 - 6x + 5$. Gib die **y-Koordinate** des Scheitelpunkts an.",
    expectedAnswer: "-4",
    format: "Ganze Zahl",
    hint: "Nutze $d = -\\frac{b}{2a}$ und $e = f(d)$.",
    solution:
      "$d = \\frac{6}{2} = 3$. $e = f(3) = 9 - 18 + 5 = -4$. Scheitelpunkt: $S(3, -4)$.",
  },
  {
    id: "qg-p-9",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 3,
    type: "input",
    question:
      "Bestimme die Nullstellen von $f(x) = 2(x - 1)^2 - 8$. Gib die **größere** Nullstelle an.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution:
      "$2(x-1)^2 = 8 \\Rightarrow (x-1)^2 = 4 \\Rightarrow x - 1 = \\pm 2$. Größere Nullstelle: $x = 3$.",
  },
  {
    id: "qg-p-10",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 3,
    type: "input",
    question:
      "Forme $f(x) = x^2 + 4x + 7$ in Scheitelpunktform um. Gib den **e-Wert** (y-Koordinate des Scheitelpunkts) an.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution:
      "$d = -\\frac{4}{2} = -2$. $e = 7 - \\frac{16}{4} = 7 - 4 = 3$. Scheitelpunktform: $f(x) = (x+2)^2 + 3$.",
  },
];

// ============================================================================
// EXAM EXERCISES — gemischt Schwierigkeit 1-3
// ============================================================================

export const quadratischeGleichungenExam: Exercise[] = [
  {
    id: "qg-e1",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 1,
    type: "input",
    question:
      "Löse: $x^2 - 7x + 12 = 0$. Gib die **größere** Lösung an.",
    expectedAnswer: "4",
    format: "Ganze Zahl",
    solution:
      "pq-Formel: $x_{1,2} = \\frac{7}{2} \\pm \\sqrt{\\frac{49}{4} - 12} = \\frac{7}{2} \\pm \\frac{1}{2}$. Größere Lösung: $x_1 = 4$.",
  },
  {
    id: "qg-e2",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 1,
    type: "input",
    question:
      "Löse: $x^2 + 3x - 10 = 0$. Gib die **kleinere** Lösung an.",
    expectedAnswer: "-5",
    format: "Ganze Zahl",
    solution:
      "$p = 3$, $q = -10$. $x_{1,2} = -\\frac{3}{2} \\pm \\sqrt{\\frac{9}{4} + 10} = -\\frac{3}{2} \\pm \\frac{7}{2}$. Kleinere Lösung: $x_2 = -5$.",
  },
  {
    id: "qg-e3",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 2,
    type: "input",
    question:
      "Löse mit der abc-Formel: $3x^2 - 12x + 9 = 0$. Gib die **größere** Lösung an.",
    expectedAnswer: "3",
    format: "Ganze Zahl",
    solution:
      "$a = 3$, $b = -12$, $c = 9$. $D = 144 - 108 = 36$. $x_{1,2} = \\frac{12 \\pm 6}{6}$. Größere Lösung: $x_1 = 3$.",
  },
  {
    id: "qg-e4",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 2,
    type: "multiple",
    question:
      "Welche quadratische Gleichung hat **keine** reellen Lösungen?",
    options: [
      { label: "$x^2 - 4x + 3 = 0$", value: "a" },
      { label: "$x^2 + 2x + 1 = 0$", value: "b" },
      { label: "$x^2 + x + 1 = 0$", value: "c" },
      { label: "$x^2 - 9 = 0$", value: "d" },
    ],
    correctOption: "c",
    solution:
      "a) $D = 16 - 12 = 4 > 0$. b) $D = 4 - 4 = 0$. c) $D = 1 - 4 = -3 < 0$ ✓. d) $D = 36 > 0$.",
  },
  {
    id: "qg-e5",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 3,
    type: "input",
    question:
      "Bestimme die Nullstellen von $f(x) = -(x - 2)^2 + 9$. Gib die **größere** Nullstelle an.",
    expectedAnswer: "5",
    format: "Ganze Zahl",
    solution:
      "$(x-2)^2 = 9 \\Rightarrow x - 2 = \\pm 3$. Größere Nullstelle: $x = 5$.",
  },
  {
    id: "qg-e6",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 3,
    type: "input",
    question:
      "Der Scheitelpunkt einer Parabel ist $S(2, -1)$ und sie geht durch den Punkt $(0, 3)$. Bestimme $a$ in $f(x) = a(x - 2)^2 - 1$.",
    expectedAnswer: "1",
    format: "Ganze Zahl",
    solution:
      "$f(0) = a(0-2)^2 - 1 = 4a - 1 = 3 \\Rightarrow 4a = 4 \\Rightarrow a = 1$.",
  },
  {
    id: "qg-e7",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 2,
    type: "input",
    question:
      "Berechne die Diskriminante von $4x^2 - 4x + 1 = 0$.",
    expectedAnswer: "0",
    format: "Ganze Zahl",
    solution:
      "$D = (-4)^2 - 4 \\cdot 4 \\cdot 1 = 16 - 16 = 0$. Eine doppelte Nullstelle.",
  },
  {
    id: "qg-e8",
    lessonId: "m-quadratische-gleichungen",
    difficulty: 3,
    type: "input",
    question:
      "Forme $f(x) = 2x^2 - 8x + 3$ in Scheitelpunktform um. Gib den **e-Wert** an.",
    expectedAnswer: "-5",
    format: "Ganze Zahl",
    solution:
      "$d = \\frac{8}{4} = 2$. $e = 3 - \\frac{64}{8} = 3 - 8 = -5$. Scheitelpunktform: $f(x) = 2(x-2)^2 - 5$.",
  },
];
