import { Lesson } from "../types";

export const mathe2Altklausur250204: Lesson[] = [
  {
    id: "ma2-klausur-250204-1",
    title: "Unbestimmtes Integral — Partialbruchzerlegung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 04.02.2025",
    content: `## Aufgabe 1 — Unbestimmtes Integral

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Partialbruchzerlegung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie das unbestimmte Integral:
$$\\int \\frac{1}{x^2 - 4}\\, dx$$

[STEP]
**Schritt 1: Nenner faktorisieren**

$$x^2 - 4 = (x-2)(x+2)$$

Partialbruchzerlegung:
$$\\frac{1}{(x-2)(x+2)} = \\frac{A}{x-2} + \\frac{B}{x+2}$$

[STEP]
**Schritt 2: Koeffizienten bestimmen**

$$1 = A(x+2) + B(x-2)$$

$x = 2$: $1 = 4A \\Rightarrow A = \\frac{1}{4}$

$x = -2$: $1 = -4B \\Rightarrow B = -\\frac{1}{4}$

$$\\frac{1}{(x-2)(x+2)} = \\frac{1}{4}\\left(\\frac{1}{x-2} - \\frac{1}{x+2}\\right)$$

[STEP]
**Schritt 3: Integration**

$$\\int \\frac{1}{x^2-4}\\, dx = \\frac{1}{4}\\int \\frac{1}{x-2}\\, dx - \\frac{1}{4}\\int \\frac{1}{x+2}\\, dx$$

$$= \\frac{1}{4}\\ln|x-2| - \\frac{1}{4}\\ln|x+2| + c = \\frac{1}{4}\\ln\\left|\\frac{x-2}{x+2}\\right| + c$$

[RESULT]
$$\\int \\frac{1}{x^2 - 4}\\, dx = \\frac{1}{4}\\ln\\left|\\frac{x-2}{x+2}\\right| + c$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Partialbruchzerlegung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-250204-2",
    title: "Unendliche Integrale — Partielle Integration & Substitution",
    duration: "18 min",
    type: "text",
    group: "📝 Klausur 04.02.2025",
    content: `## Aufgabe 2 — Unendliche Integrale

> **📋 18 Punkte** | ⏱ 18 min | 🔑 Partielle Integration, Substitution

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie die folgenden unendlichen Integrale:
(i) $\\int_0^\\infty x e^{-x}\\, dx$
(ii) $\\int_0^\\infty x e^{-x^2}\\, dx$

[STEP]
**Schritt 1: (i) — Partielle Integration**

$u = x$, $dv = e^{-x}dx$ → $du = dx$, $v = -e^{-x}$

$$\\int_0^\\infty x e^{-x}\\, dx = \\left[-x e^{-x}\\right]_0^\\infty + \\int_0^\\infty e^{-x}\\, dx$$

Grenzwert: $\\lim_{x\\to\\infty} (-xe^{-x}) = 0$ (Exponentialfunktion dominiert)

$$= 0 + \\left[-e^{-x}\\right]_0^\\infty = 0 - (-1) = 1$$

[STEP]
**Schritt 2: (ii) — Substitution**

$u = x^2$ → $du = 2x\\, dx$ → $x\\, dx = \\frac{1}{2}du$

Grenzen: $x=0 \\Rightarrow u=0$, $x\\to\\infty \\Rightarrow u\\to\\infty$

$$\\int_0^\\infty x e^{-x^2}\\, dx = \\frac{1}{2}\\int_0^\\infty e^{-u}\\, du = \\frac{1}{2}\\left[-e^{-u}\\right]_0^\\infty = \\frac{1}{2}(0-(-1)) = \\frac{1}{2}$$

[RESULT]
(i) $\\int_0^\\infty x e^{-x}\\, dx = 1$

(ii) $\\int_0^\\infty x e^{-x^2}\\, dx = \\dfrac{1}{2}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Partielle Integration und Substitution bei unendlichen Integralen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-250204-3",
    title: "Grenzwerte mit L'Hôpital",
    duration: "18 min",
    type: "text",
    group: "📝 Klausur 04.02.2025",
    content: `## Aufgabe 3 — Grenzwerte

> **📋 18 Punkte** | ⏱ 18 min | 🔑 L'Hôpital, Taylor-Entwicklung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechnen Sie die folgenden Grenzwerte:
(i) $\\lim_{x \\to 1} \\frac{x-1}{\\ln(x)}$
(ii) $\\lim_{x \\to 0} \\frac{1 - \\cos(x)}{x \\cdot \\sin(x)}$
(iii) $\\lim_{x \\to 0} \\frac{\\sin(\\cos(x) - 1)}{-x^2}$

[STEP]
**Schritt 1: (i) — L'Hôpital ($\\frac{0}{0}$-Form)**

Zähler bei $x=1$: $1-1 = 0$. Nenner bei $x=1$: $\\ln(1) = 0$.

L'Hôpital:
$$\\lim_{x \\to 1} \\frac{(x-1)'}{(\\ln x)'} = \\lim_{x \\to 1} \\frac{1}{1/x} = \\lim_{x \\to 1} x = 1$$

[STEP]
**Schritt 2: (ii) — L'Hôpital zweimal ($\\frac{0}{0}$-Form)**

Zähler: $1 - \\cos(0) = 0$. Nenner: $0 \\cdot \\sin(0) = 0$.

Erste Ableitungen:
$$\\lim_{x \\to 0} \\frac{\\sin(x)}{\\sin(x) + x\\cos(x)}$$

Zähler: $\\sin(0) = 0$. Nenner: $0 + 0 = 0$. Nochmals L'Hôpital:

$$\\lim_{x \\to 0} \\frac{\\cos(x)}{\\cos(x) + \\cos(x) - x\\sin(x)} = \\lim_{x \\to 0} \\frac{\\cos(x)}{2\\cos(x) - x\\sin(x)} = \\frac{1}{2}$$

[STEP]
**Schritt 3: (iii) — Taylor-Entwicklung**

Für $x \\to 0$: $\\cos(x) - 1 \\approx -\\frac{x^2}{2}$

Also: $\\sin(\\cos(x)-1) \\approx \\sin\\left(-\\frac{x^2}{2}\\right) \\approx -\\frac{x^2}{2}$

$$\\lim_{x \\to 0} \\frac{-x^2/2}{-x^2} = \\frac{1}{2}$$

[RESULT]
(i) $1$ \\qquad (ii) $\\dfrac{1}{2}$ \\qquad (iii) $\\dfrac{1}{2}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **L'Hôpital-Regel und Taylor-Entwicklungen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-250204-4",
    title: "Extrema mit Betragsfunktion",
    duration: "28 min",
    type: "text",
    group: "📝 Klausur 04.02.2025",
    content: `## Aufgabe 4 — Extrema mit Betrag

> **📋 28 Punkte** | ⏱ 28 min | 🔑 Betragsfunktion, Extremwerte, Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei $f(x) = |x^2 - 4x + 3| \\cdot (x-2)$ auf $[0, 4]$.

Bestimmen Sie alle lokalen und globalen Extrema.

[STEP]
**Schritt 1: Nullstellen des Betragsausdrucks**

$x^2 - 4x + 3 = (x-1)(x-3)$

Nullstellen: $x = 1$ und $x = 3$. Zusätzlich Nullstelle von $(x-2)$ bei $x = 2$.

Fallunterscheidung für $|x^2 - 4x + 3|$:

- $x \\in [0, 1]$: $x^2 - 4x + 3 \\geq 0$ → $|...| = x^2 - 4x + 3$
- $x \\in (1, 3)$: $x^2 - 4x + 3 < 0$ → $|...| = -(x^2 - 4x + 3) = -x^2 + 4x - 3$
- $x \\in [3, 4]$: $x^2 - 4x + 3 \\geq 0$ → $|...| = x^2 - 4x + 3$

[STEP]
**Schritt 2: Funktion auf den Teilbereichen**

Auf $[0, 1]$: $f(x) = (x^2 - 4x + 3)(x-2) = x^3 - 6x^2 + 11x - 6$

$f'(x) = 3x^2 - 12x + 11$

$f'(x) = 0$: $x = \\frac{12 \\pm \\sqrt{144 - 132}}{6} = \\frac{12 \\pm \\sqrt{12}}{6} = 2 \\pm \\frac{\\sqrt{3}}{3}$

Auf $[0, 1]$ liegt $x = 2 - \\frac{\\sqrt{3}}{3} \\approx 1.42$ nicht → kein kritischer Punkt in $(0, 1)$.

Auf $(1, 3)$: $f(x) = (-x^2 + 4x - 3)(x-2) = -x^3 + 6x^2 - 11x + 6$

$f'(x) = -3x^2 + 12x - 11$

$f'(x) = 0$: $x = \\frac{-12 \\pm \\sqrt{144 - 132}}{-6} = 2 \\pm \\frac{\\sqrt{3}}{3}$

$x_1 = 2 - \\frac{\\sqrt{3}}{3} \\approx 1.42$, $x_2 = 2 + \\frac{\\sqrt{3}}{3} \\approx 2.58$

Beide liegen in $(1, 3)$.

Auf $[3, 4]$: $f(x) = (x^2 - 4x + 3)(x-2) = x^3 - 6x^2 + 11x - 6$

$f'(x) = 3x^2 - 12x + 11$

Kritische Punkte: $x = 2 \\pm \\frac{\\sqrt{3}}{3}$. In $[3, 4]$ liegt $x = 2 + \\frac{\\sqrt{3}}{3} \\approx 2.58$ nicht → kein kritischer Punkt in $(3, 4)$.

[STEP]
**Schritt 3: Funktionswerte berechnen**

Ränder und kritische Stellen:

$f(0) = |3| \\cdot (-2) = -6$

$f(1) = 0$

$f\\left(2 - \\frac{\\sqrt{3}}{3}\\right) = -\\left(2 - \\frac{\\sqrt{3}}{3}\\right)^3 + 6\\left(2 - \\frac{\\sqrt{3}}{3}\\right)^2 - 11\\left(2 - \\frac{\\sqrt{3}}{3}\\right) + 6 = \\frac{4\\sqrt{3}}{9}$

$f(2) = |4 - 8 + 3| \\cdot 0 = 0$

$f\\left(2 + \\frac{\\sqrt{3}}{3}\\right) = -\\left(2 + \\frac{\\sqrt{3}}{3}\\right)^3 + 6\\left(2 + \\frac{\\sqrt{3}}{3}\\right)^2 - 11\\left(2 + \\frac{\\sqrt{3}}{3}\\right) + 6 = -\\frac{4\\sqrt{3}}{9}$

$f(3) = 0$

$f(4) = |16 - 16 + 3| \\cdot 2 = 6$

[STEP]
**Schritt 4: Extrema bestimmen**

Globales Minimum: $f(0) = -6$

Globales Maximum: $f(4) = 6$

Lokale Maxima: $f\\left(2 - \\frac{\\sqrt{3}}{3}\\right) = \\frac{4\\sqrt{3}}{9}$

Lokale Minima: $f\\left(2 + \\frac{\\sqrt{3}}{3}\\right) = -\\frac{4\\sqrt{3}}{9}$

[RESULT]
Globales Minimum: $f(0) = -6$ \\quad Globales Maximum: $f(4) = 6$

Lokales Maximum: $f\\left(2 - \\frac{\\sqrt{3}}{3}\\right) = \\frac{4\\sqrt{3}}{9}$ \\quad Lokales Minimum: $f\\left(2 + \\frac{\\sqrt{3}}{3}\\right) = -\\frac{4\\sqrt{3}}{9}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Fallunterscheidung bei Betragsfunktionen und Extremwertbestimmung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-250204-5",
    title: "Stetigkeit und Differenzierbarkeit",
    duration: "16 min",
    type: "text",
    group: "📝 Klausur 04.02.2025",
    content: `## Aufgabe 5 — Stetigkeit und Differenzierbarkeit

> **📋 16 Punkte** | ⏱ 16 min | 🔑 Stetigkeit, Differenzierbarkeit, Parameter

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die Funktion:
$$f_a(x) = \\begin{cases} ax^2 - 3ax + a^2 & \\text{für } x \\leq 1 \\\\ -x^3 + 4x^2 - 8x + 8 & \\text{für } x > 1 \\end{cases}$$

Bestimmen Sie alle $a \\in \\mathbb{R}$, sodass $f_a$ in $x = 1$ stetig und differenzierbar ist.

[STEP]
**Schritt 1: Stetigkeit bei $x = 1$**

Linksseitig: $f_a(1^-) = a - 3a + a^2 = a^2 - 2a$

Rechtsseitig: $f_a(1^+) = -1 + 4 - 8 + 8 = 3$

Stetigkeitsbedingung: $a^2 - 2a = 3$

$$a^2 - 2a - 3 = 0 \\Rightarrow (a-3)(a+1) = 0$$

$$a = 3 \\quad \\text{oder} \\quad a = -1$$

[STEP]
**Schritt 2: Differenzierbarkeit bei $x = 1$**

$f'_a(x)$ für $x < 1$: $f'_a(x) = 2ax - 3a$ → $f'_a(1^-) = 2a - 3a = -a$

$f'_a(x)$ für $x > 1$: $f'_a(x) = -3x^2 + 8x - 8$ → $f'_a(1^+) = -3 + 8 - 8 = -3$

Differenzierbarkeitsbedingung: $-a = -3 \\Rightarrow a = 3$

Probe: $a = -1$: $-(-1) = 1 \\neq -3$ → nicht differenzierbar.

[RESULT]
$f_a$ ist in $x = 1$ stetig und differenzierbar genau für $a = 3$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Stetigkeits- und Differenzierbarkeitsbedingungen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-250204-6",
    title: "Zwischenwertsatz — Beweis",
    duration: "5 min",
    type: "text",
    group: "📝 Klausur 04.02.2025",
    content: `## Aufgabe 6 — Zwischenwertsatz

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Zwischenwertsatz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $f: [0, 1] \\to \\mathbb{R}$ stetig mit $f(0) > 0$ und $f(1) < 1$.

Zeigen Sie: Es existiert ein $x_0 \\in [0, 1]$ mit $f(x_0) = x_0$.

[STEP]
**Schritt 1: Hilfsfunktion definieren**

Definiere $h(x) = f(x) - x$.

$h$ ist stetig auf $[0, 1]$ (Differenz stetiger Funktionen).

[STEP]
**Schritt 2: Vorzeichenwechsel prüfen**

$h(0) = f(0) - 0 = f(0) > 0$

$h(1) = f(1) - 1 < 0$ (da $f(1) < 1$)

[STEP]
**Schritt 3: Zwischenwertsatz anwenden**

Da $h$ stetig auf $[0, 1]$ ist und $h(0) > 0 > h(1)$, existiert nach dem Zwischenwertsatz ein $x_0 \\in (0, 1)$ mit:

$$h(x_0) = 0 \\Rightarrow f(x_0) - x_0 = 0 \\Rightarrow f(x_0) = x_0$$

[RESULT]
Durch den Zwischenwertsatz auf $h(x) = f(x) - x$ folgt die Existenz eines Fixpunkts $x_0 \\in (0, 1)$ mit $f(x_0) = x_0$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Anwendung des Zwischenwertsatzes** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
