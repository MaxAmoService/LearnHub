// Klausur 27.11.2023 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur231127: Lesson[] = [
  {
    id: "ma1-klausur-231127-1",
    title: "Kardinalität & Teilmengen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.11.2023",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $M = \\{x \\in \\mathbb{N} \\mid 1 \\leq x \\leq 20\\}$. Bestimme die Kardinalität von:
(a) $\\{X \\subseteq M \\mid |X| = 4\\}$
(b) $\\{X \\subseteq M \\mid X \\cap \\{1,2,3\\} = \\emptyset\\}$

[STEP]
**Schritt 1: Teil (a) — 4-elementige Teilmengen**

$|M| = 20$. Die Anzahl 4-elementiger Teilmengen:

$$\\binom{20}{4} = \\frac{20 \\cdot 19 \\cdot 18 \\cdot 17}{4 \\cdot 3 \\cdot 2 \\cdot 1} = 4845$$

[STEP]
**Schritt 2: Teil (b) — Teilmengen ohne {1,2,3}**

$X$ darf keine der Zahlen 1, 2, 3 enthalten. Also: $X \\subseteq \\{4, 5, \\ldots, 20\\}$ = $M \\setminus \\{1,2,3\\}$.

Die erlaubte Grundmenge hat $20 - 3 = 17$ Elemente.

Jede Teilmenge dieser 17-elementigen Menge ist erlaubt:
$$|\\mathcal{P}(\\text{17-elementige Menge})| = 2^{17} = 131.072$$

> **💡** Das ist die Anzahl ALLER Teilmengen (jeder Größe!) von $M \\setminus \\{1,2,3\\}$.

[RESULT]
$$\\text{(a) } \\binom{20}{4} = 4845 \\qquad \\text{(b) } 2^{17} = 131.072$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-231127-2",
    title: "Summen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.11.2023",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne: $\\sum_{k=1}^{50} \\left(\\frac{1}{k} - \\frac{1}{k+1}\\right)$

[STEP]
**Schritt 1: Die Summe ausschreiben**

$\\sum_{k=1}^{50} \\frac{1}{k} - \\frac{1}{k+1}$

$= (\\frac{1}{1} - \\frac{1}{2}) + (\\frac{1}{2} - \\frac{1}{3}) + (\\frac{1}{3} - \\frac{1}{4}) + \\cdots + (\\frac{1}{50} - \\frac{1}{51})$

[STEP]
**Schritt 2: Die Teleskop-Eigenschaft erkennen**

Alle inneren Terme heben sich weg:
$-\\frac{1}{2} + \\frac{1}{2} = 0$, $-\\frac{1}{3} + \\frac{1}{3} = 0$, usw.

Übrig bleiben nur der erste und der letzte Term:
$$\\frac{1}{1} - \\frac{1}{51} = 1 - \\frac{1}{51}$$

[STEP]
**Schritt 3: Endergebnis**

$$= \\frac{51}{51} - \\frac{1}{51} = \\frac{50}{51}$$

[RESULT]
$$\\sum_{k=1}^{50} \\left(\\frac{1}{k} - \\frac{1}{k+1}\\right) = \\frac{50}{51}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-231127-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.11.2023",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $2^n > n^2$ für alle $n \\geq 5$.

[STEP]
**Schritt 1: Induktionsanfang ($n=5$)**

$2^5 = 32$, $5^2 = 25$. $32 > 25$ ✓

[STEP]
**Schritt 2: Induktionsvoraussetzung**

Für ein $n \\geq 5$ gelte: $2^n > n^2$

[STEP]
**Schritt 3: Induktionsschritt**

Zu zeigen: $2^{n+1} > (n+1)^2$

$2^{n+1} = 2 \\cdot 2^n > 2 \\cdot n^2$ (nach IV)

Jetzt müssen wir zeigen: $2n^2 \\geq (n+1)^2$ für $n \\geq 5$

$2n^2 - (n+1)^2 = 2n^2 - n^2 - 2n - 1 = n^2 - 2n - 1 = (n-1)^2 - 2$

Für $n \\geq 5$: $(5-1)^2 - 2 = 14 > 0$ ✓

Also: $2^{n+1} > 2n^2 \\geq (n+1)^2$ → $2^{n+1} > (n+1)^2$ ✓

[RESULT]
$$2^n > n^2 \\quad \\text{für alle } n \\geq 5 \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-231127-4",
    title: "Betragsungleichung mit Brüchen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.11.2023",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse: $\\left|\\frac{x+2}{x-1}\\right| < 3$

[STEP]
**Schritt 1: Definitionsmenge**

$x \\neq 1$. $\\mathbb{D} = \\mathbb{R} \\setminus \\{1\\}$

[STEP]
**Schritt 2: Betragsdefinition anwenden**

$|\\frac{x+2}{x-1}| < 3 \\iff -3 < \\frac{x+2}{x-1} < 3$

Zwei Ungleichungen: (I) $\\frac{x+2}{x-1} > -3$ und (II) $\\frac{x+2}{x-1} < 3$

[STEP]
**Schritt 3: Ungleichung (I) lösen**

$\\frac{x+2}{x-1} + 3 > 0 \\iff \\frac{x+2 + 3x - 3}{x-1} > 0 \\iff \\frac{4x - 1}{x-1} > 0$

Nullstellen: $x = \\frac{1}{4}$ (Zähler), $x = 1$ (Nenner, ausgeschlossen)

Vorzeichentabelle → $(-\\infty, \\frac{1}{4}) \\cup (1, \\infty)$

[STEP]
**Schritt 4: Ungleichung (II) lösen**

$\\frac{x+2}{x-1} - 3 < 0 \\iff \\frac{x+2 - 3x + 3}{x-1} < 0 \\iff \\frac{-2x + 5}{x-1} < 0$

Nullstellen: $x = \\frac{5}{2}$ (Zähler), $x = 1$ (Nenner, ausgeschlossen)

Vorzeichentabelle → $(-\\infty, 1) \\cup (\\frac{5}{2}, \\infty)$

[STEP]
**Schritt 5: Beide Bedingungen schneiden**

(I): $(-\\infty, \\frac{1}{4}) \\cup (1, \\infty)$
(II): $(-\\infty, 1) \\cup (\\frac{5}{2}, \\infty)$

Schnitt: $(-\\infty, \\frac{1}{4}) \\cup (\\frac{5}{2}, \\infty)$

[RESULT]
$$L = (-\\infty, \\frac{1}{4}) \\cup (\\frac{5}{2}, \\infty)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-231127-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.11.2023",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} \\left(\\sqrt{n^2 + n} - n\\right)$
(ii) $\\lim_{n \\to \\infty} \\left(1 + \\frac{1}{2n}\\right)^{4n}$

[STEP]
**Schritt 1: Grenzwert (i) — Erweitern**

$(\\sqrt{n^2+n} - n) \\cdot \\frac{\\sqrt{n^2+n} + n}{\\sqrt{n^2+n} + n}$

$= \\frac{n^2+n-n^2}{\\sqrt{n^2+n} + n} = \\frac{n}{\\sqrt{n^2+n} + n}$

Durch $n$ kürzen: $\\frac{1}{\\sqrt{1 + 1/n} + 1} \\to \\frac{1}{1+1} = \\frac{1}{2}$

[STEP]
**Schritt 2: Grenzwert (ii) — Euler-Formel**

$\\left(1 + \\frac{1}{2n}\\right)^{4n} = \\left[\\left(1 + \\frac{1/2}{n}\\right)^n\\right]^4$

$\\to (e^{1/2})^4 = e^2$

[RESULT]
$$\\text{(i) } \\frac{1}{2} \\qquad \\text{(ii) } e^2$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-231127-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.11.2023",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
(a) Berechne $(\\sqrt{3} + j)^{12}$.
(b) Bestimme alle 3-ten Wurzeln von $-8j$.

[STEP]
**Schritt 1: Teil (a) — Polarform von $\\sqrt{3} + j$**

$|z| = \\sqrt{3+1} = 2$

$\\varphi = \\arctan(\\frac{1}{\\sqrt{3}}) = \\frac{\\pi}{6}$

$z = 2\\angle\\frac{\\pi}{6}$

$z^{12} = 2^{12}\\angle(12 \\cdot \\frac{\\pi}{6}) = 4096\\angle 2\\pi = 4096$

[STEP]
**Schritt 2: Teil (b) — 3-te Wurzeln von $-8j$**

$-8j = 8\\angle(-\\frac{\\pi}{2})$

3-te Wurzeln: $z_k = \\sqrt[3]{8}\\angle\\frac{-\\pi/2 + 2k\\pi}{3} = 2\\angle\\frac{-\\pi + 4k\\pi}{6}$

$k=0$: $2\\angle(-\\frac{\\pi}{6}) = 2(\\frac{\\sqrt{3}}{2} - j\\frac{1}{2}) = \\sqrt{3} - j$

$k=1$: $2\\angle\\frac{3\\pi}{6} = 2\\angle\\frac{\\pi}{2} = 2j$

$k=2$: $2\\angle\\frac{7\\pi}{6} = -\\sqrt{3} - j$

[RESULT]
$$(\\sqrt{3}+j)^{12} = 4096, \\quad \\sqrt[3]{-8j} = \\{\\sqrt{3}-j, 2j, -\\sqrt{3}-j\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
