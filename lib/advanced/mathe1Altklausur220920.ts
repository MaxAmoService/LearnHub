// Klausur 20.09.2022 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur220920: Lesson[] = [
  {
    id: "ma1-klausur-220920-1",
    title: "Mengenlehre",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.09.2022",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Entscheide (mit Begründung), ob folgende Aussagen wahr oder falsch sind:
(a) $\\emptyset \\subseteq \\{1, 2, 3\\}$
(b) $\\emptyset \\in \\{1, 2, 3\\}$
(c) $\\{1\\} \\subseteq \\mathcal{P}(\\{1, 2\\})$
(d) $\\{1\\} \\in \\mathcal{P}(\\{1, 2\\})$

[STEP]
**Schritt 1: (a) $\\emptyset \\subseteq \\{1, 2, 3\\}$**

„Die leere Menge ist Teilmenge jeder Menge" — das ist ein mathematischer Grundsatz.

→ **WAHR.** Jedes Element von $\\emptyset$ (es gibt keins) ist in $\\{1,2,3\\}$.

[STEP]
**Schritt 2: (b) $\\emptyset \\in \\{1, 2, 3\\}$**

Ist die leere Menge ein ELEMENT von $\\{1, 2, 3\\}$? Nein — die Elemente sind 1, 2 und 3, nicht $\\emptyset$.

→ **FALSCH.** $\\emptyset \\subseteq \\{1,2,3\\}$ ist wahr, aber $\\emptyset \\in \\{1,2,3\\}$ ist falsch.

> **💡 $\\subseteq$ vs. $\\in$:** Teilmenge sein ($\\subseteq$) und Element sein ($\\in$) sind verschiedene Dinge!

[STEP]
**Schritt 3: (c) $\\{1\\} \\subseteq \\mathcal{P}(\\{1, 2\\})$**

$\\mathcal{P}(\\{1,2\\}) = \\{\\emptyset, \\{1\\}, \\{2\\}, \\{1,2\\}\\}$

$\\{1\\}$ ist ein Element von $\\mathcal{P}(\\{1,2\\})$, aber $\\{1\\} \\subseteq \\mathcal{P}(\\{1,2\\})$ würde bedeuten: $1 \\in \\mathcal{P}(\\{1,2\\})$, was falsch ist ($1$ ist kein Element der Potenzmenge).

→ **FALSCH.** Aber: $\\{\\{1\\}\\} \\subseteq \\mathcal{P}(\\{1,2\\})$ wäre wahr!

[STEP]
**Schritt 4: (d) $\\{1\\} \\in \\mathcal{P}(\\{1, 2\\})$**

$\\{1\\}$ ist eine Teilmenge von $\\{1,2\\}$, also ein Element der Potenzmenge.

→ **WAHR.**

[RESULT]
$$\\text{(a) WAHR, (b) FALSCH, (c) FALSCH, (d) WAHR}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-220920-2",
    title: "Summen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.09.2022",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne: $\\sum_{k=5}^{30} k(k-1) - \\sum_{n=4}^{29} n(n+1)$

[STEP]
**Schritt 1: Zweite Summe per Indexverschiebung umformen**

Ersetze in der zweiten Summe $n = k-1$:

$\\sum_{n=4}^{29} n(n+1) = \\sum_{k=5}^{30} (k-1) \\cdot k = \\sum_{k=5}^{30} k(k-1)$

[STEP]
**Schritt 2: Differenz bilden**

$\\sum_{k=5}^{30} k(k-1) - \\sum_{k=5}^{30} k(k-1) = 0$

> **💡 Die Summen sind nach der Indexverschiebung identisch!**

[RESULT]
$$0$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-220920-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.09.2022",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise die Bernoulli-Ungleichung: $(1+x)^n \\geq 1 + nx$ für $x \\geq -1$ und $n \\in \\mathbb{N}$.

[STEP]
**Schritt 1: Induktionsanfang ($n=1$)**

$(1+x)^1 = 1+x$, $1 + 1 \\cdot x = 1+x$

$1+x \\geq 1+x$ ✓ (Gleichheit!)

[STEP]
**Schritt 2: Induktionsvoraussetzung**

$(1+x)^n \\geq 1 + nx$ für ein $n \\in \\mathbb{N}$ und $x \\geq -1$.

[STEP]
**Schritt 3: Induktionsschritt**

$(1+x)^{n+1} = (1+x)^n \\cdot (1+x)$

$\\overset{\\text{IV}}{\\geq} (1 + nx)(1 + x)$

$= 1 + nx + x + nx^2 = 1 + (n+1)x + nx^2$

Da $nx^2 \\geq 0$ für alle $x$ (Quadrat ist immer $\\geq 0$, $n \\in \\mathbb{N}$):

$\\geq 1 + (n+1)x$ ✓

[STEP]
**Schritt 4: Bedingung $x \\geq -1$**

Beachte: $(1+x) \\geq 0$ für $x \\geq -1$. Multiplikation der IV mit $(1+x)$ erhält das $\\geq$-Zeichen nur, weil $(1+x) \\geq 0$ ist!

[RESULT]
$$(1+x)^n \\geq 1 + nx \\quad \\text{für } x \\geq -1, n \\in \\mathbb{N} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-220920-4",
    title: "Ungleichung mit Bruch & Produkt",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.09.2022",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse: $\\frac{(x-1)(x-4)}{x-2} > 0$

[STEP]
**Schritt 1: Definitionsmenge & Nullstellen**

$x \\neq 2$. $\\mathbb{D} = \\mathbb{R} \\setminus \\{2\\}$

Zählernullstellen: $x = 1, 4$

Kritische Punkte: $1, 2, 4$

[STEP]
**Schritt 2: Vorzeichentabelle**

| Intervall | $x-1$ | $x-4$ | $x-2$ | Bruch |
|-----------|---|---|---|---|
| $(-\\infty, 1)$ | $-$ | $-$ | $-$ | $-$ |
| $(1, 2)$ | $+$ | $-$ | $-$ | $+$ |
| $(2, 4)$ | $+$ | $-$ | $+$ | $-$ |
| $(4, \\infty)$ | $+$ | $+$ | $+$ | $+$ |

[STEP]
**Schritt 3: Lösung ($> 0$)**

Aus der Tabelle: positiv in $(1, 2)$ und $(4, \\infty)$.

[RESULT]
$$L = (1, 2) \\cup (4, \\infty)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-220920-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.09.2022",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} n \\cdot \\sin\\left(\\frac{1}{n}\\right)$
(ii) $\\lim_{n \\to \\infty} \\left(\\cos\\frac{1}{n}\\right)^n$

[STEP]
**Schritt 1: (i) — Substitution $h = 1/n$**

Für $n \\to \\infty$: $h \\to 0^+$

$n \\sin(\\frac{1}{n}) = \\frac{\\sin h}{h} \\to 1$

> **💡** $\\lim_{h \\to 0} \\frac{\\sin h}{h} = 1$ — der wichtigste trigonometrische Grenzwert!

[STEP]
**Schritt 2: (ii) — Taylor-Entwicklung von $\\cos$**

$\\cos\\frac{1}{n} = 1 - \\frac{1}{2n^2} + O(\\frac{1}{n^4})$

$\\left(\\cos\\frac{1}{n}\\right)^n = \\left(1 - \\frac{1}{2n^2} + \\ldots\\right)^n$

Für große $n$: $\\approx \\left(1 - \\frac{1}{2n^2}\\right)^n = \\left[\\left(1 - \\frac{1}{2n^2}\\right)^{n^2}\\right]^{1/n} \\to (e^{-1/2})^0 = 1$

Tatsächlich: $\\lim = 1$

[RESULT]
$$\\text{(i) } 1 \\qquad \\text{(ii) } 1$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-220920-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.09.2022",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeige: (a) $|z|^2 = z \\cdot \\overline{z}$ für alle $z \\in \\mathbb{C}$.
(b) Bestimme alle $z$ mit $z^2 + \\overline{z} = 0$.

[STEP]
**Schritt 1: (a) — Mit $z = a + bj$**

$z \\cdot \\overline{z} = (a+bj)(a-bj) = a^2 - (bj)^2 = a^2 + b^2 = |z|^2$ ✓

(Das funktioniert, weil $-j^2 = 1$.)

[STEP]
**Schritt 2: (b) — Ansatz $z = a + bj$**

$z^2 = (a+bj)^2 = a^2 - b^2 + 2abj$
$\\overline{z} = a - bj$

$z^2 + \\overline{z} = (a^2 - b^2 + a) + (2ab - b)j = 0$

[STEP]
**Schritt 3: Real- und Imaginärteil = 0**

Realteil: $a^2 - b^2 + a = 0$
Imaginärteil: $2ab - b = b(2a-1) = 0$

Aus Imaginärteil: $b = 0$ oder $a = \\frac{1}{2}$

**Fall 1 ($b=0$):** $a^2 + a = 0 \\to a(a+1) = 0 \\to a = 0$ oder $a = -1$

→ $z_1 = 0$, $z_2 = -1$

**Fall 2 ($a=\\frac{1}{2}$):** $\\frac{1}{4} - b^2 + \\frac{1}{2} = 0 \\to b^2 = \\frac{3}{4} \\to b = \\pm\\frac{\\sqrt{3}}{2}$

→ $z_{3,4} = \\frac{1}{2} \\pm j\\frac{\\sqrt{3}}{2}$

[RESULT]
$$z \\in \\{0, -1, \\frac{1}{2} + j\\frac{\\sqrt{3}}{2}, \\frac{1}{2} - j\\frac{\\sqrt{3}}{2}\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
