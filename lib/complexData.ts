import { Module, QuizQuestion } from "./types";
import { createExerciseLessons } from "./lessonHelpers";

export const complexModule: Module = {
  id: "m-komplexe-zahlen",
  slug: "mathe-komplexe-zahlen",
  title: "Komplexe Zahlen",
  description: "Von der imaginären Einheit bis zu Wurzeln in der Gaußsche Ebene — interaktiv und verständlich",
  icon: "🌀",
  color: "#8b5cf6",
  category: "analysis",
  progress: 0,
  merkblatt: `## Merkblatt: Komplexe Zahlen

### Grundlagen
- Imaginäre Einheit: $j = \\sqrt{-1}$, also $j^2 = -1$
- Komplexe Zahl: $z = x + jy$ mit $x, y \\in \\mathbb{R}$

### Darstellungsformen
| Form | Schreibweise |
|------|-------------|
| Normalform | $z = x + jy$ |
| Trigonometrisch | $z = r(\\cos\\varphi + j\\sin\\varphi)$ |
| Exponentialform | $z = r \\cdot e^{j\\varphi}$ |

### Umrechnung
- $r = |z| = \\sqrt{x^2 + y^2}$
- $\\varphi = \\arctan\\frac{y}{x}$ (+ Quadrantenkorrektur!)

### Rechenregeln
- Addition: $(x_1+x_2) + j(y_1+y_2)$
- Multiplikation: $r_1 r_2 \\cdot e^{j(\\varphi_1+\\varphi_2)}$
- Division: $\\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1-\\varphi_2)}$
- Konjugiertes: $\\bar{z} = x - jy$
- De Moivre: $z^n = r^n e^{jn\\varphi}$
- Wurzeln: $w_k = r^{1/n} e^{j(\\varphi+2k\\pi)/n}$

### Potenzen von j
$j^1 = j$, $j^2 = -1$, $j^3 = -j$, $j^4 = 1$ (zyklisch!)`,

  lessons: [
    // ══════════════════════════════════════════════════════════════
    // LEKTION 1: Grundlagen
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-1",
      title: "Warum komplexe Zahlen?",
      duration: "15 min",
      type: "interactive",
      interactive: "complexPowersTrainer" as const,
      content: `## Das Problem

Stell dir vor, du sollst $x^2 + 1 = 0$ lösen.

Umformen: $x^2 = -1$

Keine reelle Zahl quadriert zu $-1$! Denn $x^2 \\geq 0$ für alle $x \\in \\mathbb{R}$.

Also erfinden wir eine neue Zahl.

---

## Die imaginäre Einheit $j$

$$j = \\sqrt{-1} \\quad \\Rightarrow \\quad j^2 = -1$$

Das ist keine normale Zahl — aber mit ihr können wir rechnen!

Warum $j$ und nicht $i$? In der Mathematik verwendet man $i$, aber in der Elektrotechnik steht $i$ für den Strom. Deshalb nutzt man in der Technik $j$.

---

## Komplexe Zahlen

$$z = x + j \\cdot y$$

- $x = \\text{Re}(z)$ — der Realteil
- $y = \\text{Im}(z)$ — der Imaginärteil
- Wenn $y = 0$: $z = x$ — reelle Zahl (Spezialfall!)
- Wenn $x = 0$: $z = jy$ — rein imaginäre Zahl

---

## Beispiele

| Zahl | Re | Im | Bemerkung |
|------|---:|---:|-----------|
| $3 + 4j$ | 3 | 4 | komplexe Zahl |
| $-2 + 5j$ | -2 | 5 | negativer Realteil |
| $7$ | 7 | 0 | reell! |
| $-3j$ | 0 | -3 | rein imaginär |
| $0$ | 0 | 0 | Ursprung |

---

## Potenzen von $j$ — der Zyklus

Die Potenzen von $j$ wiederholen sich alle 4 Schritte:

$$j^1 = j \\rightarrow j^2 = -1 \\rightarrow j^3 = -j \\rightarrow j^4 = 1 \\rightarrow j^5 = j \\rightarrow \\ldots$$

Merke: $j^n = j^{(n \\text{ mod } 4)}$ — einfach den Rest bei Division durch 4 berechnen!

---

### Beispiel: $j^6$ berechnen

$j^6 = j^4 \\cdot j^2 = 1 \\cdot (-1) = -1$

Denn $j^4 = (j^2)^2 = (-1)^2 = 1$ und $j^2 = -1$.

### Beispiel: $2j \\cdot 3j$ berechnen

$2j \\cdot 3j = 6j^2 = 6 \\cdot (-1) = -6$

Denn $j^2 = -1$ — das ist die wichtigste Regel!

---

[GUIDED_START]
**Schritt-für-Schritt:** Berechne $j^{23}$

**Schritt 1:** Teile den Exponenten durch 4: $23 \div 4 = 5$ Rest $3$

**Schritt 2:** Der Rest bestimmt das Ergebnis: Rest $= 3$ → $j^3$

**Schritt 3:** $j^3 = j^2 \cdot j = (-1) \cdot j = -j$

**Ergebnis:** $j^{23} = -j$ ✅

**Probe:** $j^{23} = j^{20} \cdot j^3 = (j^4)^5 \cdot j^3 = 1^5 \cdot (-j) = -j$ ✓
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Berechne $j^{15}$

**Lösung:** $15 \text{ mod } 4 = 3$ → $j^{15} = j^3 = -j$

**Aufgabe 2:** Berechne $j^{50}$

**Lösung:** $50 \text{ mod } 4 = 2$ → $j^{50} = j^2 = -1$

**Aufgabe 3:** Berechne $(2j)^3$

**Lösung:** $(2j)^3 = 8j^3 = 8(-j) = -8j$
[PRACTICE_END]

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 2: Gaußsche Ebene
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-2",
      title: "Die Gaußsche Zahlenebene",
      duration: "15 min",
      type: "interactive",
      interactive: "complexPlaneViewer",
      content: `## Von 1D zu 2D

Reelle Zahlen leben auf einer Zahlengerade (1D). Komplexe Zahlen brauchen eine Ebene (2D) — die Gaußsche Zahlenebene.

---

## So funktioniert's

- Horizontal (x-Achse): Realteil $\\text{Re}(z)$
- Vertikal (y-Achse): Imaginärteil $\\text{Im}(z)$

$z = x + jy$ wird als Punkt bei $(x, y)$ gezeichnet.

---

## Der Betrag — Abstand vom Ursprung

$$r = |z| = \\sqrt{x^2 + y^2}$$

Das ist der Abstand des Punktes $(x, y)$ vom Ursprung — nach dem Satz des Pythagoras!

---

## Beispiele

| $z$ | Punkt | Betrag $|z|$ |
|-----|-------|------|
| $3 + 4j$ | $(3, 4)$ | $5$ |
| $-2 + j$ | $(-2, 1)$ | $\\sqrt{5}$ |
| $5j$ | $(0, 5)$ | $5$ |
| $-4$ | $(-4, 0)$ | $4$ |

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 3: Darstellungsformen
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-3",
      title: "Die drei Darstellungsformen",
      duration: "20 min",
      type: "interactive",
      interactive: "complexFormConverter",
      content: `## Drei Wege, eine Zahl

Eine komplexe Zahl kann man auf drei Arten schreiben. Jede hat ihre Vorteile.

---

## 1. Normalform

$$z = x + jy$$

Gut zum Addieren und Subtrahieren. Die Standardform.

---

## 2. Trigonometrische Form

$$z = r \\cdot (\\cos\\varphi + j\\sin\\varphi)$$

- $r = |z| = \\sqrt{x^2 + y^2}$ — Betrag (Pythagoras!)
- $\\varphi$ — Winkel gegen die positive Re-Achse

Gut zum Multiplizieren und Visualisieren.

---

## 3. Exponentialform (Euler)

$$z = r \\cdot e^{j\\varphi}$$

Euler-Formel: $e^{j\\varphi} = \\cos\\varphi + j\\sin\\varphi$

Die kürzeste Schreibweise. Ideal für Rechnungen!

---

## Umrechnung: Normalform zur Exponentialform

Schritt 1: Betrag berechnen — $r = \\sqrt{x^2 + y^2}$

Schritt 2: Winkel berechnen — $\\varphi = \\arctan\\frac{y}{x}$

Schritt 3: Quadranten-Korrektur!

| Quadrant | x | y | Korrektur |
|----------|---|---|-----------|
| I (rechts oben) | + | + | keine |
| II (links oben) | $-$ | + | $+180°$ |
| III (links unten) | $-$ | $-$ | $+180°$ |
| IV (rechts unten) | + | $-$ | $+360°$ |

---

## Umrechnung: Exponentialform zur Normalform

$$x = r \\cdot \\cos\\varphi \\qquad y = r \\cdot \\sin\\varphi$$

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 4: Addition & Subtraktion
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-4",
      title: "Addition & Subtraktion",
      duration: "12 min",
      type: "text",
      content: `## Die einfachste Rechenart

Addition und Subtraktion funktionieren nur in Normalform. Aber dafür total einfach!

---

## Die Regel

$$z_1 + z_2 = (x_1 + x_2) + j(y_1 + y_2)$$

$$z_1 - z_2 = (x_1 - x_2) + j(y_1 - y_2)$$

Realteile zusammen, Imaginärteile zusammen! Mehr ist es nicht.

---

## Schritt für Schritt

### Beispiel 1: $(3 + 2j) + (1 - 4j)$

Schritt 1: Realteile addieren: $3 + 1 = 4$

Schritt 2: Imaginärteile addieren: $2 + (-4) = -2$

Ergebnis: $4 - 2j$ ✅

---

### Beispiel 2: $(-1 + 4j) - (3 + 2j)$

Schritt 1: Realteile subtrahieren: $-1 - 3 = -4$

Schritt 2: Imaginärteile subtrahieren: $4 - 2 = 2$

Ergebnis: $-4 + 2j$ ✅

---

### Beispiel 3: $(6 + j) - (-2 + 3j)$

Schritt 1: Realteile: $6 - (-2) = 8$

Schritt 2: Imaginärteile: $1 - 3 = -2$

Ergebnis: $8 - 2j$ ✅

> **Vorsicht bei Vorzeichen!** Bei Subtraktion wird das Vorzeichen des zweiten Terms umgedreht: $-(-2) = +2$.

---

## Geometrische Bedeutung

In der Gaußschen Ebene ist Addition wie Vektoraddition: Man legt die Pfeile aneinander.

$(3 + 2j) + (1 - 4j)$: Starte bei $(3, 2)$, gehe um $(1, -4)$ — landest bei $(4, -2)$.

---

## Merke

- Addition/Subtraktion geht **nur in Normalform**
- Realteile und Imaginärteile **getrennt** berechnen
- Vorsicht bei Vorzeichen bei Subtraktion!

---

[GUIDED_START]
**Schritt-für-Schritt:** Berechne $(4 - 3j) - (-2 + 5j) + (1 + j)$

**Schritt 1:** Klammern auflösen (Vorzeichen beachten!):
$4 - 3j + 2 - 5j + 1 + j$

**Schritt 2:** Realteile gruppieren: $4 + 2 + 1 = 7$

**Schritt 3:** Imaginärteile gruppieren: $-3 - 5 + 1 = -7$

**Ergebnis:** $7 - 7j$ ✅
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** $(5 + 2j) + (-3 - 7j) = ?$

**Lösung:** Real: $5-3=2$, Imag: $2-7=-5$ → $2 - 5j$

**Aufgabe 2:** $(1 + j) - (1 - j) = ?$

**Lösung:** Real: $1-1=0$, Imag: $1-(-1)=2$ → $2j$

**Aufgabe 3:** Summe aller Eckpunkte des Einheitsquadrats: $1 + j + (-1+j) + (-1-j) + (1-j) = ?$

**Lösung:** Real: $1+(-1)+(-1)+1=0$, Imag: $1+1+(-1)+(-1)=0$ → $0$
[PRACTICE_END]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 5: Multiplikation
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-5",
      title: "Multiplikation",
      duration: "18 min",
      type: "interactive",
      interactive: "complexOperationsCalculator",
      content: `## Zwei Wege der Multiplikation

---

## Weg 1: Normalform (FOIL)

$$z_1 \\cdot z_2 = (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$$

Ausmultiplizieren (FOIL: First, Outer, Inner, Last) und $j^2 = -1$ einsetzen.

---

### Herkunft der Formel

$(x_1 + jy_1)(x_2 + jy_2)$

$= x_1 x_2 + j x_1 y_2 + j x_2 y_1 + j^2 y_1 y_2$

$= x_1 x_2 + j(x_1 y_2 + x_2 y_1) - y_1 y_2$

$= (x_1 x_2 - y_1 y_2) + j(x_1 y_2 + x_2 y_1)$

---

### Beispiel 1: $(2 + 3j) \\cdot (1 - 2j)$

Schritt 1: First: $2 \\cdot 1 = 2$

Schritt 2: Outer: $2 \\cdot (-2j) = -4j$

Schritt 3: Inner: $3j \\cdot 1 = 3j$

Schritt 4: Last: $3j \\cdot (-2j) = -6j^2 = +6$

Schritt 5: Zusammen: $(2 + 6) + j(-4 + 3) = 8 - j$

Ergebnis: $8 - j$ ✅

---

### Beispiel 2: $(1 + j)^2 = (1+j)(1+j)$

Schritt 1: First: $1 \\cdot 1 = 1$

Schritt 2: Outer + Inner: $1 \\cdot j + j \\cdot 1 = 2j$

Schritt 3: Last: $j \\cdot j = j^2 = -1$

Schritt 4: Zusammen: $1 + 2j - 1 = 2j$

Ergebnis: $2j$ ✅

> **Merke:** $$(1+j)^2 = 2j$$ — eine rein imaginäre Zahl! Das überrascht viele.

---

## Weg 2: Exponentialform (viel einfacher!)

$$z_1 \\cdot z_2 = r_1 r_2 \\cdot e^{j(\\varphi_1 + \\varphi_2)}$$

Beträge multiplizieren, Winkel addieren! Das ist der große Vorteil der Exponentialform.

---

### Beispiel 3: $3e^{j20°} \\cdot 4e^{j30°}$

Schritt 1: Beträge: $3 \\cdot 4 = 12$

Schritt 2: Winkel: $20° + 30° = 50°$

Ergebnis: $12e^{j50°}$ ✅

---

### Beispiel 4: $2e^{j90°} \\cdot 3e^{j90°}$

Schritt 1: Beträge: $2 \\cdot 3 = 6$

Schritt 2: Winkel: $90° + 90° = 180°$

Ergebnis: $6e^{j180°} = -6$ ✅

> **Wann welchen Weg?** Exponentialform ist schneller, aber man muss erst umrechnen. Für schnelle Kopfrechnung: Normalform + FOIL.

---

[GUIDED_START]
**Schritt-für-Schritt:** Berechne $(2 + j) \cdot (3 - 2j)$ in Normalform

**Schritt 1:** First: $2 \cdot 3 = 6$

**Schritt 2:** Outer: $2 \cdot (-2j) = -4j$

**Schritt 3:** Inner: $j \cdot 3 = 3j$

**Schritt 4:** Last: $j \cdot (-2j) = -2j^2 = +2$

**Schritt 5:** Zusammen: $(6 + 2) + j(-4 + 3) = 8 - j$

**Probe in Exponentialform:**
$2+j = \sqrt{5} \cdot e^{j26{,}6°}$
$3-2j = \sqrt{13} \cdot e^{j(-33{,}7°)}$
Produkt: $\sqrt{65} \cdot e^{j(-7{,}1°)} \approx 8 - j$ ✓
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** $(1 + 2j)(1 - 2j) = ?$

**Lösung:** $1 - 4j^2 = 1 + 4 = 5$ (reell!)

**Aufgabe 2:** $(j)^{10} = ?$

**Lösung:** $j^{10} = j^{8} \cdot j^2 = 1 \cdot (-1) = -1$

**Aufgabe 3:** $2e^{j45°} \cdot 3e^{j45°} = ?$

**Lösung:** $6e^{j90°} = 6j$
[PRACTICE_END]

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 6: Konjugierte & Division
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-6",
      title: "Konjugierte & Division",
      duration: "20 min",
      type: "interactive",
      interactive: "complexOperationsCalculator",
      content: `## Das konjugierte

$$\\bar{z} = x - jy$$

Man spiegelt den Imaginärteil an der reellen Achse. In der Gaußschen Ebene: Spiegelung an der x-Achse.

---

### Wichtige Eigenschaften

- $z \\cdot \\bar{z} = x^2 + y^2 = |z|^2$ — immer reell und positiv!
- $\\overline{z_1 + z_2} = \\bar{z_1} + \\bar{z_2}$
- $\\overline{z_1 \\cdot z_2} = \\bar{z_1} \\cdot \\bar{z_2}$

---

### Beispiel 1: Konjugiertes bilden

$z = 3 - 4j \\Rightarrow \\bar{z} = 3 + 4j$

$z \\cdot \\bar{z} = (3-4j)(3+4j) = 9 + 16 = 25 = |z|^2$ ✅

---

## Division — das Problem

$$\\frac{3+4j}{1-2j}$$

Im Nenner steht ein $j$! Wir können nicht einfach durch eine komplexe Zahl teilen.

Lösung: Erweitere mit dem konjugierten des Nenners — der Nenner wird reell!

---

## Division — die Methode

$$\\frac{z_1}{z_2} = \\frac{z_1 \\cdot \\bar{z_2}}{z_2 \\cdot \\bar{z_2}} = \\frac{z_1 \\cdot \\bar{z_2}}{|z_2|^2}$$

Der Nenner wird zu $|z_2|^2$ — eine reelle Zahl!

---

### Beispiel 2: $\\frac{3+4j}{1-2j}$

Schritt 1: Konjugierten bilden: $\\overline{1-2j} = 1+2j$

Schritt 2: Nenner: $(1-2j)(1+2j) = 1 + 4 = 5$ — reell!

Schritt 3: Zähler: $(3+4j)(1+2j) = 3 + 6j + 4j + 8j^2 = -5 + 10j$

Schritt 4: Teilen: $\\frac{-5+10j}{5} = -1 + 2j$

Ergebnis: $-1 + 2j$ ✅

---

### Beispiel 3: $\\frac{6+2j}{2+j}$

Schritt 1: Konjugierten: $2-j$

Schritt 2: Nenner: $(2+j)(2-j) = 4 + 1 = 5$

Schritt 3: Zähler: $(6+2j)(2-j) = 12 - 6j + 4j - 2j^2 = 14 - 2j$

Schritt 4: Teilen: $\\frac{14-2j}{5} = 2{,}8 - 0{,}4j$

Ergebnis: $2{,}8 - 0{,}4j$ ✅

---

## In Exponentialform (viel einfacher!)

$$\\frac{z_1}{z_2} = \\frac{r_1}{r_2} \\cdot e^{j(\\varphi_1 - \\varphi_2)}$$

Beträge dividieren, Winkel subtrahieren!

---

### Beispiel 4: $\\frac{12e^{j80°}}{4e^{j30°}}$

Schritt 1: Beträge: $12 / 4 = 3$

Schritt 2: Winkel: $80° - 30° = 50°$

Ergebnis: $3e^{j50°}$ ✅

> **Merke:** Division in Exponentialform ist fast trivial — Beträge dividieren, Winkel subtrahieren.

---

[GUIDED_START]
**Schritt-für-Schritt:** Berechne $\frac{4+2j}{1+j}$

**Schritt 1:** Konjugiertes des Nenners: $\overline{1+j} = 1-j$

**Schritt 2:** Nenner: $(1+j)(1-j) = 1 + 1 = 2$

**Schritt 3:** Zähler: $(4+2j)(1-j) = 4 - 4j + 2j - 2j^2 = 6 - 2j$

**Schritt 4:** Teilen: $\frac{6-2j}{2} = 3 - j$

**Probe:** $(3-j)(1+j) = 3 + 3j - j - j^2 = 4 + 2j$ ✓
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** $\frac{10}{1+j} = ?$

**Lösung:** $\frac{10(1-j)}{2} = 5 - 5j$

**Aufgabe 2:** $\frac{6e^{j60°}}{2e^{j150°}} = ?$

**Lösung:** $3e^{j(60°-150°)} = 3e^{-j90°} = -3j$

**Aufgabe 3:** $\frac{j}{1-j} = ?$

**Lösung:** $\frac{j(1+j)}{2} = \frac{j+j^2}{2} = \frac{-1+j}{2} = -0{,}5 + 0{,}5j$
[PRACTICE_END]

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 7: Potenzieren
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-7",
      title: "Potenzieren — De Moivre",
      duration: "15 min",
      type: "interactive",
      interactive: "complexPowerCalculator",
      content: `## De Moivresche Formel

$$z^n = r^n \\cdot e^{jn\\varphi}$$

Betrag potenzieren, Winkel mit $n$ multiplizieren!

Die Exponentialform macht Potenzieren extrem einfach — kein Ausmultiplizieren nötig.

---

## Herleitung

$z^n = (r \\cdot e^{j\\varphi})^n = r^n \\cdot (e^{j\\varphi})^n = r^n \\cdot e^{jn\\varphi}$

---

### Beispiel 1: $(1+j)^4$

Schritt 1: Umrechnen: $r = \\sqrt{2}$, $\\varphi = 45°$

Schritt 2: De Moivre: $z^4 = (\\sqrt{2})^4 \\cdot e^{j(4 \\cdot 45°)} = 4 \\cdot e^{j180°}$

Schritt 3: Zurück: $4e^{j180°} = 4(-1) = -4$

Ergebnis: $(1+j)^4 = -4$ ✅

> **Erstaunlich!** Eine komplexe Zahl hoch 4 kann eine negative reelle Zahl sein.

---

### Beispiel 2: $(2e^{j15°})^3$

Schritt 1: Betrag: $2^3 = 8$

Schritt 2: Winkel: $3 \\cdot 15° = 45°$

Ergebnis: $8e^{j45°}$ ✅

---

### Beispiel 3: $(\\sqrt{3} + j)^3$

Schritt 1: Umrechnen: $r = \\sqrt{3+1} = 2$, $\\varphi = 30°$

Schritt 2: De Moivre: $z^3 = 2^3 \\cdot e^{j(3 \\cdot 30°)} = 8e^{j90°}$

Schritt 3: Zurück: $8e^{j90°} = 8(\\cos90° + j\\sin90°) = 8j$

Ergebnis: $(\\sqrt{3}+j)^3 = 8j$ ✅

---

## Potenzen von $j$ — der Zyklus

| $n$ | $j^n$ | Warum |
|-----|-------|-------|
| 1 | $j$ | |
| 2 | $-1$ | $j^2 = -1$ |
| 3 | $-j$ | $j^2 \\cdot j$ |
| 4 | $1$ | $(j^2)^2$ |
| 5 | $j$ | Zyklus! |

Formel: $j^n = j^{(n \\text{ mod } 4)}$

---

### Beispiel 4: $j^{17}$

$17 \\text{ mod } 4 = 1$ (denn $17 = 4 \\cdot 4 + 1$)

Also $j^{17} = j^1 = j$ ✅

### Beispiel 5: $j^{100}$

$100 \\text{ mod } 4 = 0$ (denn $100 = 4 \\cdot 25$)

Also $j^{100} = j^4 = 1$ ✅

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 8: Radizieren
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-8",
      title: "Radizieren — Wurzeln",
      duration: "18 min",
      type: "interactive",
      interactive: "complexRootCalculator",
      content: `## Wurzeln komplexer Zahlen

Bei reellen Zahlen: $\\sqrt{4} = 2$ (eindeutig). Bei komplexen Zahlen gibt es $n$ verschiedene $n$-te Wurzeln!

---

## Die Formel

$$w_k = r^{1/n} \\cdot e^{j \\frac{\\varphi + 2k\\pi}{n}}, \\quad k = 0, 1, \\ldots, n-1$$

---

## Warum $n$ Wurzeln?

Die $n$-ten Wurzeln von $z$ sind die Lösungen von $w^n = z$. Da $e^{j2\\pi} = 1$ kann man $2\\pi$ beliebig oft addieren — jede Variation gibt eine andere Wurzel.

Geometrisch: Die Wurzeln liegen als gleichmäßiges $n$-Eck auf einem Kreis mit Radius $r^{1/n}$.

---

### Beispiel 1: Kubikwurzeln von $8$

$8 = 8e^{j0°}$, Radius $= 8^{1/3} = 2$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| 0 | $0°$ | $2$ |
| 1 | $120°$ | $-1 + 1{,}732j$ |
| 2 | $240°$ | $-1 - 1{,}732j$ |

Gleichseitiges Dreieck auf dem Kreis!

---

### Beispiel 2: Quadratwurzeln von $j$

$j = 1 \\cdot e^{j90°}$, Radius $= 1^{1/2} = 1$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| 0 | $45°$ | $\\frac{1}{\\sqrt{2}} + j\\frac{1}{\\sqrt{2}} \\approx 0{,}707 + 0{,}707j$ |
| 1 | $225°$ | $-\\frac{1}{\\sqrt{2}} - j\\frac{1}{\\sqrt{2}} \\approx -0{,}707 - 0{,}707j$ |

Merke: $\\sqrt{j} = \\pm(0{,}707 + 0{,}707j)$ — zwei Wurzeln!

---

### Beispiel 3: $\\sqrt[4]{16}$

$16 = 16e^{j0°}$, Radius $= 16^{1/4} = 2$

| $k$ | Winkel | Wurzel |
|-----|--------|--------|
| 0 | $0°$ | $2$ |
| 1 | $90°$ | $2j$ |
| 2 | $180°$ | $-2$ |
| 3 | $270°$ | $-2j$ |

4 Wurzeln auf einem Kreis der Radius 2 — Quadrat!

---

> **Merke:** Die $n$-ten Wurzeln von $z \\neq 0$ bilden immer ein regelmäßiges $n$-Eck auf dem Kreis mit Radius $r^{1/n}$.
>
> $$w_k = r^{1/n} \\cdot e^{j\\frac{\\varphi + 2k\\pi}{n}}$$

---

[GUIDED_START]
**Schritt-für-Schritt:** Berechne alle Quadratwurzeln von $-4$

**Schritt 1:** Polarform: $-4 = 4 \cdot e^{j180°}$

**Schritt 2:** Formel: $w_k = 4^{1/2} \cdot e^{j\frac{180° + k \cdot 360°}{2}}$

**Schritt 3:** $w_0 = 2 \cdot e^{j90°} = 2j$

**Schritt 4:** $w_1 = 2 \cdot e^{j270°} = -2j$

**Probe:** $(2j)^2 = 4j^2 = -4$ ✓ und $(-2j)^2 = 4j^2 = -4$ ✓

**Ergebnis:** $\sqrt{-4} = \pm 2j$
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Berechne $\sqrt[3]{-8}$ (alle 3 Wurzeln)

**Lösung:** $-8 = 8e^{j180°}$, Radius $= 2$
- $w_0 = 2e^{j60°} = 1 + \sqrt{3}j$
- $w_1 = 2e^{j180°} = -2$
- $w_2 = 2e^{j300°} = 1 - \sqrt{3}j$

**Aufgabe 2:** Berechne $\sqrt{j}$ (beide Wurzeln)

**Lösung:** $j = 1 \cdot e^{j90°}$, Radius $= 1$
- $w_0 = e^{j45°} = \frac{\sqrt{2}}{2} + j\frac{\sqrt{2}}{2}$
- $w_1 = e^{j225°} = -\frac{\sqrt{2}}{2} - j\frac{\sqrt{2}}{2}$
[PRACTICE_END]

---

[INTERACTIVE]

---

`,
    },

    // ══════════════════════════════════════════════════════════════
    // ABSCHLUSS-TEST
    // ══════════════════════════════════════════════════════════════
    {
      id: "kz-quiz",
      title: "Abschlusstest: Komplexe Zahlen",
      duration: "15 min",
      type: "quiz",
      content: "Beantworte die 10 Fragen. Du brauchst mindestens 80% zum Bestehen.",
    },

    ...createExerciseLessons("kz", "Komplexe Zahlen", {
      easy: `$j^2=-1$ verinnerlichen, Potenzen von $j$ berechnen und komplexe Zahlen in der Gaussschen Ebene zeichnen.`,
      medium: `Zwischen kartesischer, Polar- und Exponentialform umrechnen. Addition und Subtraktion in allen Formen.`,
      hard: `Multiplikation und Division in Exponentialform, Potenzieren mit Moivre und Wurzeln komplexer Zahlen ziehen.`,
    }),
  ],
};

export const complexQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-komplexe-zahlen": [
    {
      question: "Was ist $j^2$?",
      type: "multiple",
      options: ["$1$", "$-1$", "$j$", "$-j$"],
      correct: 1,
      explanation: "$j = \\sqrt{-1}$, also $j^2 = -1$.",
    },
    {
      question: "Was ist der Betrag von $z = 3 + 4j$?",
      type: "multiple",
      options: ["$7$", "$5$", "$25$", "$\\sqrt{7}$"],
      correct: 1,
      explanation: "$|z| = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$",
    },
    {
      question: "Was ist $\\bar{z}$ für $z = 2 - 5j$?",
      type: "multiple",
      options: ["$-2 + 5j$", "$2 + 5j$", "$-2 - 5j$", "$5 - 2j$"],
      correct: 1,
      explanation: "Vorzeichen des Imaginärteils umkehren: $\\bar{z} = 2 + 5j$",
    },
    {
      question: "In welchem Quadrant liegt $z = -3 + 2j$?",
      type: "multiple",
      options: ["I", "II", "III", "IV"],
      correct: 1,
      explanation: "$x < 0, y > 0$ — Quadrant II",
    },
    {
      question: "$(1+j) + (2-3j) = ?$",
      type: "multiple",
      options: ["$3-2j$", "$3+2j$", "$-1-2j$", "$3-4j$"],
      correct: 0,
      explanation: "Real: $1+2=3$, Imag: $1-3=-2$",
    },
    {
      question: "$(2e^{j30°}) \\cdot (3e^{j60°}) = ?$",
      type: "multiple",
      options: ["$6e^{j90°}$", "$5e^{j90°}$", "$6e^{j180°}$", "$e^{j90°}$"],
      correct: 0,
      explanation: "Beträge: $2 \\cdot 3 = 6$, Winkel: $30°+60°=90°$",
    },
    {
      question: "Wie viele $n$-te Wurzeln hat $z \\neq 0$?",
      type: "multiple",
      options: ["$1$", "$2$", "$n$", "$n-1$"],
      correct: 2,
      explanation: "Genau $n$ verschiedene Wurzeln.",
    },
    {
      question: "Was ist $j^4$?",
      type: "multiple",
      options: ["$j$", "$-1$", "$-j$", "$1$"],
      correct: 3,
      explanation: "$j^4 = (j^2)^2 = (-1)^2 = 1$",
    },
    {
      question: "$z \\cdot \\bar{z}$ für $z = 3+4j$?",
      type: "multiple",
      options: ["$25$", "$7$", "$0$", "$5$"],
      correct: 0,
      explanation: "$z\\bar{z} = |z|^2 = 9+16 = 25$",
    },
    {
      question: "$\\frac{6e^{j90°}}{2e^{j30°}} = ?$",
      type: "multiple",
      options: ["$3e^{j60°}$", "$3e^{j120°}$", "$12e^{j60°}$", "$3e^{j30°}$"],
      correct: 0,
      explanation: "Beträge: $6/2=3$, Winkel: $90°-30°=60°$",
    },
  ],
};
