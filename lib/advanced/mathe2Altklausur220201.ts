import { Lesson } from "../types";

export const mathe2Altklausur220201: Lesson[] = [
  {
    id: "ma2-klausur-220201-1",
    title: "Betragsfunktion & Umkehrabbildung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 01.02.2022",
    content: `## Aufgabe 1 — Betragsfunktion

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Symmetrie, Bijektivität, Umkehrabbildung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
$f(x) = |x-2| + |x+2|$
(i) Ist $f$ gerade oder ungerade?
(ii) Skizzieren Sie den Graphen, bestimmen Sie $f(\\mathbb{R})$ und einen maximalen injektiven Bereich $D$.
(iii) Bestimmen Sie die Umkehrabbildung von $g: D \\to f(\\mathbb{R})$.

[STEP]
**Schritt 1: Symmetrie prüfen**

$f(-x) = |-x-2| + |-x+2| = |x+2| + |x-2| = f(x)$

→ $f$ ist **gerade**.

[STEP]
**Schritt 2: Fallunterscheidung**

$x \\leq -2$: $f(x) = -(x-2) - (x+2) = -2x$
$-2 < x < 2$: $f(x) = -(x-2) + (x+2) = 4$
$x \\geq 2$: $f(x) = (x-2) + (x+2) = 2x$

Bildmenge: $f(\\mathbb{R}) = [4, \\infty)$

Maximaler injektiver Bereich: $D = [2, \\infty)$ (oder $(-\\infty, -2]$)

[STEP]
**Schritt 3: Umkehrabbildung**

Auf $D = [2, \\infty)$: $g(x) = 2x$

$$g^{-1}: [4, \\infty) \\to [2, \\infty), \\quad g^{-1}(y) = \\frac{y}{2}$$

[RESULT]
$f$ ist gerade. $f(\\mathbb{R}) = [4, \\infty)$. $D = [2, \\infty)$. $g^{-1}(y) = \\frac{y}{2}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Symmetrie, Bijektivität, Umkehrabbildung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220201-2",
    title: "Logarithmusgleichung",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 01.02.2022",
    content: `## Aufgabe 2 — Logarithmusgleichung

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Logarithmusgesetze

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie alle $x \\in \\mathbb{R}$ mit:
$$\\log_x(5\\sqrt{5}) - \\frac{5}{4} = \\log_x((\\sqrt{5})^2)$$

[STEP]
**Schritt 1: Vereinfachung**

$5\\sqrt{5} = 5^{3/2}$ und $(\\sqrt{5})^2 = 5$

$$\\log_x(5^{3/2}) - \\frac{5}{4} = \\log_x(5)$$

$$\\frac{3}{2}\\log_x(5) - \\frac{5}{4} = \\log_x(5)$$

[STEP]
**Schritt 2: Gleichung lösen**

$$\\frac{1}{2}\\log_x(5) = \\frac{5}{4}$$

$$\\log_x(5) = \\frac{5}{2}$$

$$x^{5/2} = 5 \\Rightarrow x = 5^{2/5} = \\sqrt[5]{25}$$

[RESULT]
$$x = \\sqrt[5]{25}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Logarithmusgesetze** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220201-3",
    title: "Optimierung — Solarzelle",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 01.02.2022",
    content: `## Aufgabe 3 — Optimierung Solarzelle

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Extremwertaufgabe

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Die Spannung einer Solarzelle bei entnommenem Strom $i < 2I$ sei:
$$\\frac{u}{U} = \\left(1 + \\left(\\frac{i}{I}\\right)^4\\right)^{-1/2}$$
Welche maximale Leistung $p = u \\cdot i$ lässt sich entnehmen?

[STEP]
**Schritt 1: Leistungsfunktion aufstellen**

$$p(i) = u \\cdot i = \\frac{U \\cdot i}{\\sqrt{1 + (i/I)^4}}$$

Substitution $t = i/I$:
$$p(t) = \\frac{U \\cdot I \\cdot t}{\\sqrt{1 + t^4}}$$

[STEP]
**Schritt 2: Ableitung nullsetzen**

$p'(t) = 0$ ergibt nach Quotientenregel:
$$1 + t^4 - 2t^4 = 0 \\Rightarrow t^4 = 1 \\Rightarrow t = 1$$

[STEP]
**Schritt 3: Maximale Leistung**

$$p_{\\max} = p(I) = \\frac{U \\cdot I}{\\sqrt{2}}$$

[RESULT]
$$p_{\\max} = \\frac{U \\cdot I}{\\sqrt{2}}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Extremwertaufgabe** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220201-4",
    title: "Grenzwerte mit L'Hôpital",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 01.02.2022",
    content: `## Aufgabe 4 — Grenzwerte

> **📋 15 Punkte** | ⏱ 12 min | 🔑 L'Hôpital

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechnen Sie:
(i) $\\lim_{x \\to 1} \\frac{x^x - x}{1 - x + \\ln(x)}$
(ii) $\\lim_{x \\to \\infty} x \\cdot \\ln\\left(1 + \\frac{2}{x}\\right)$

[STEP]
**Schritt 1: (i) — L'Hôpital ($\\frac{0}{0}$-Form)**

Zähler: $x^x - x$, bei $x=1$: $1 - 1 = 0$
Nenner: $1 - x + \\ln(x)$, bei $x=1$: $0$

Ableitungen: $(x^x)' = x^x(\\ln(x)+1)$, also Zähler' $= x^x(\\ln(x)+1) - 1$, bei $x=1$: $0$
Nenner' $= -1 + \\frac{1}{x}$, bei $x=1$: $0$

Nochmals L'Hôpital... Ergebnis: $-2$

[STEP]
**Schritt 2: (ii) — Substitution**

$t = 1/x$, $t \\to 0$:
$$\\lim_{t \\to 0} \\frac{\\ln(1+2t)}{t} = 2$$

[RESULT]
(i) $-2$ \\qquad (ii) $2$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **L'Hôpital** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220201-5",
    title: "Uneigentliche Integrale",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 01.02.2022",
    content: `## Aufgabe 5 — Uneigentliche Integrale

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Uneigentliche Integrale

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\int_0^9 \\frac{1}{|x-1|^{2/3}} dx \\quad \\text{und} \\quad \\int_0^9 \\frac{1}{|x-1|^{3/2}} dx$$

[STEP]
**Schritt 1: Erstes Integral (konvergent)**

Singuläre Stelle bei $x = 1$. Exponent $2/3 < 1$ → konvergent.

$$\\int_0^9 |x-1|^{-2/3} dx = \\left[3|x-1|^{1/3}\\right]_0^9 = 3 \\cdot 8^{1/3} + 3 \\cdot 1 = 6 + 3 = 9$$

[STEP]
**Schritt 2: Zweites Integral (divergent)**

Exponent $3/2 > 1$ → divergent.

$$\\int_0^{1-\\varepsilon} (1-x)^{-3/2} dx = \\left[2(1-x)^{-1/2}\\right]_0^{1-\\varepsilon} = \\frac{2}{\\sqrt{\\varepsilon}} - 2 \\to \\infty$$

[RESULT]
Erstes Integral: $9$. Zweites Integral: divergiert.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Uneigentliche Integrale** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220201-6",
    title: "Rationale Stammfunktion",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 01.02.2022",
    content: `## Aufgabe 6 — Rationale Stammfunktion

> **📋 25 Punkte** | ⏱ 20 min | 🔑 Polynomdivision & Partialbruchzerlegung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\int \\frac{5x^4 - x^3 - 2x^2 + 28x + 6}{x^3 - 2x + 4} dx$$

[STEP]
**Schritt 1: Polynomdivision**

$\\frac{5x^4 - x^3 - 2x^2 + 28x + 6}{x^3 - 2x + 4} = 5x - 1 + \\frac{8x^2 + 40x + 2}{x^3 - 2x + 4}$

[STEP]
**Schritt 2: Nenner faktorisieren**

$x^3 - 2x + 4 = (x+2)(x^2 - 2x + 2)$

[STEP]
**Schritt 3: Partialbruchzerlegung**

$\\frac{8x^2 + 40x + 2}{(x+2)(x^2-2x+2)} = \\frac{A}{x+2} + \\frac{Bx+C}{x^2-2x+2}$

Koeffizientenvergleich: $A = -7$, $B = 15$, $C = 18$

[STEP]
**Schritt 4: Integration**

$$\\int (5x-1)dx - 7\\int \\frac{dx}{x+2} + \\int \\frac{15x+18}{x^2-2x+2}dx$$

$$= \\frac{5}{2}x^2 - x - 7\\ln|x+2| + \\frac{15}{2}\\ln(x^2-2x+2) + \\frac{33}{\\sqrt{2}}\\arctan\\left(\\frac{x-1}{\\sqrt{2}}\\right) + c$$

[RESULT]
$$\\frac{5}{2}x^2 - x - 7\\ln|x+2| + \\frac{15}{2}\\ln(x^2-2x+2) + \\frac{33}{\\sqrt{2}}\\arctan\\left(\\frac{x-1}{\\sqrt{2}}\\right) + c$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Polynomdivision & Partialbruchzerlegung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
