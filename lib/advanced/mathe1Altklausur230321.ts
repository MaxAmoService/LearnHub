// Klausur 21.03.2023 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur230321: Lesson[] = [
  {
    id: "ma1-klausur-230321-1",
    title: "Abbildungen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 21.03.2023",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Untersuche $f: \\mathbb{R} \\to \\mathbb{R}$ mit $f(x) = x^3 - x$ auf Injektivität und Surjektivität.

[STEP]
**Schritt 1: Injektivität prüfen**

$f$ ist injektiv, wenn $f(x_1) = f(x_2) \\implies x_1 = x_2$.

Finde ein Gegenbeispiel: $f(0) = 0^3 - 0 = 0$, $f(1) = 1 - 1 = 0$

$f(0) = f(1)$, aber $0 \\neq 1$ → **nicht injektiv!**

Alternativ: $f(-1) = -1 + 1 = 0$, auch $f(0) = f(-1)$.

[STEP]
**Schritt 2: Surjektivität prüfen**

$f(x) = x^3 - x = x(x-1)(x+1)$

Für $x \\to \\pm\\infty$: $f(x) \\to \\pm\\infty$. Da $f$ stetig ist, wird nach dem Zwischenwertsatz jeder reelle Wert angenommen.

→ **Surjektiv!**

[STEP]
**Schritt 3: Fazit**

$f$ ist surjektiv, aber nicht injektiv → nicht bijektiv.

Die 3 Nullstellen $x = -1, 0, 1$ zerstören die Injektivität — die Funktion hat ein lokales Maximum zwischen $-1$ und $0$ und ein lokales Minimum zwischen $0$ und $1$.

[RESULT]
$$f \\text{ ist surjektiv, aber NICHT injektiv (und damit nicht bijektiv)}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230321-2",
    title: "Summen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 21.03.2023",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Vereinfache: $\\sum_{i=1}^{n} \\sum_{j=1}^{i} 2^j$

[STEP]
**Schritt 1: Innere Summe als geometrische Summe**

$\\sum_{j=1}^{i} 2^j = 2^1 + 2^2 + \\cdots + 2^i$

Geometrische Summe mit $q=2$: $2 \\cdot \\frac{2^i - 1}{2 - 1} = 2(2^i - 1) = 2^{i+1} - 2$

[STEP]
**Schritt 2: Äußere Summe berechnen**

$\\sum_{i=1}^{n} (2^{i+1} - 2) = \\sum_{i=1}^{n} 2^{i+1} - \\sum_{i=1}^{n} 2$

$= 2^2 + 2^3 + \\cdots + 2^{n+1} - 2n$

$= 4 \\cdot \\frac{2^n - 1}{1} - 2n = 4(2^n - 1) - 2n = 2^{n+2} - 4 - 2n$

[RESULT]
$$\\sum_{i=1}^{n} \\sum_{j=1}^{i} 2^j = 2^{n+2} - 2n - 4$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230321-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 21.03.2023",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $\\prod_{k=2}^{n} \\left(1 - \\frac{1}{k^2}\\right) = \\frac{n+1}{2n}$ für alle $n \\geq 2$.

[STEP]
**Schritt 1: Induktionsanfang ($n=2$)**

Linke Seite: $\\prod_{k=2}^{2} (1 - \\frac{1}{k^2}) = 1 - \\frac{1}{4} = \\frac{3}{4}$

Rechte Seite: $\\frac{2+1}{2 \\cdot 2} = \\frac{3}{4}$ ✓

[STEP]
**Schritt 2: Induktionsvoraussetzung**

$\\prod_{k=2}^{n} (1 - \\frac{1}{k^2}) = \\frac{n+1}{2n}$

[STEP]
**Schritt 3: Induktionsschritt**

$\\prod_{k=2}^{n+1} (1 - \\frac{1}{k^2}) \\overset{\\text{IV}}{=} \\frac{n+1}{2n} \\cdot \\left(1 - \\frac{1}{(n+1)^2}\\right)$

$= \\frac{n+1}{2n} \\cdot \\frac{(n+1)^2 - 1}{(n+1)^2}$

$= \\frac{n+1}{2n} \\cdot \\frac{n^2 + 2n}{(n+1)^2} = \\frac{(n+1) \\cdot n(n+2)}{2n(n+1)^2} = \\frac{n+2}{2(n+1)}$ ✓

[RESULT]
$$\\prod_{k=2}^{n} \\left(1 - \\frac{1}{k^2}\\right) = \\frac{n+1}{2n} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230321-4",
    title: "Ungleichung mit quadratischem Term",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 21.03.2023",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse: $x^2 - 5x + 6 < 0$

[STEP]
**Schritt 1: Quadratischen Term faktorisieren**

$x^2 - 5x + 6 = (x-2)(x-3)$

Nullstellen: $x = 2, 3$

[STEP]
**Schritt 2: Vorzeichen der Parabel analysieren**

Die Parabel $x^2 - 5x + 6$ öffnet nach oben (Leitkoeffizient $1 > 0$).

→ Negativ zwischen den Nullstellen: $(2, 3)$
→ Positiv außerhalb: $(-\\infty, 2)$ und $(3, \\infty)$

[STEP]
**Schritt 3: Lösung**

Die Ungleichung $(x-2)(x-3) < 0$ verlangt, dass die Faktoren verschiedene Vorzeichen haben:

$x-2 > 0$ und $x-3 < 0$ → $x \\in (2, 3)$
oder
$x-2 < 0$ und $x-3 > 0$ → unmöglich (dann wäre $x>3$ und $x<2$)

[RESULT]
$$L = (2, 3)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230321-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 21.03.2023",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
(i) $\\lim_{n \\to \\infty} \\frac{n!}{n^n}$
(ii) $\\lim_{n \\to \\infty} \\sqrt[n]{n}$

[STEP]
**Schritt 1: Grenzwert (i) — Abschätzung**

$\\frac{n!}{n^n} = \\frac{1}{n} \\cdot \\frac{2}{n} \\cdots \\frac{n}{n} = \\frac{1}{n} \\cdot \\frac{2}{n} \\cdots 1$

Alle Faktoren sind $\\leq 1$. Für $n \\geq 2$: $0 \\leq \\frac{n!}{n^n} \\leq \\frac{1}{n} \\to 0$

Mit Sandwich-Lemma: $\\lim \\frac{n!}{n^n} = 0$

[STEP]
**Schritt 2: Grenzwert (ii) — Logarithmus-Trick**

Sei $a_n = \\sqrt[n]{n}$. Dann: $\\ln a_n = \\frac{\\ln n}{n} \\to 0$

Also: $a_n = e^{\\ln a_n} \\to e^0 = 1$

[RESULT]
$$\\text{(i) } 0 \\qquad \\text{(ii) } 1$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230321-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 21.03.2023",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse $z^3 = j$ und skizziere die Lösungen in der Gaußschen Ebene.

[STEP]
**Schritt 1: Rechte Seite in Polarform**

$j = 1\\angle\\frac{\\pi}{2}$

$z^3 = 1\\angle\\frac{\\pi}{2}$

[STEP]
**Schritt 2: 3-te Wurzeln**

$z_k = 1\\angle\\frac{\\pi/2 + 2k\\pi}{3} = 1\\angle\\frac{(4k+1)\\pi}{6}$, $k = 0,1,2$

$k=0$: $z_0 = 1\\angle\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2} + \\frac{1}{2}j$

$k=1$: $z_1 = 1\\angle\\frac{5\\pi}{6} = -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}j$

$k=2$: $z_2 = 1\\angle\\frac{9\\pi}{6} = 1\\angle\\frac{3\\pi}{2} = -j$

[STEP]
**Schritt 3: Skizze beschreiben**

Die 3 Punkte liegen auf dem Einheitskreis (Radius 1) mit Winkeln $30°$, $150°$, $270°$. Sie bilden ein gleichseitiges Dreieck.

[RESULT]
$$z \\in \\{\\frac{\\sqrt{3}}{2} + \\frac{1}{2}j, -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}j, -j\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
