// Klausur 26.09.2024 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur240926: Lesson[] = [
  {
    id: "ma1-klausur-240926-1",
    title: "Zahlensysteme",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2024",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Finde die Darstellung von $2024_5$ im Binär- und Hexadezimalsystem.

[STEP]
**Schritt 1: Basis 5 → Dezimalsystem**

$2024_5 = 2 \\cdot 5^3 + 0 \\cdot 5^2 + 2 \\cdot 5^1 + 4 \\cdot 5^0$
$= 2 \\cdot 125 + 0 \\cdot 25 + 2 \\cdot 5 + 4 \\cdot 1$
$= 250 + 0 + 10 + 4 = 264$

Also: $2024_5 = 264_{10}$

[STEP]
**Schritt 2: Dezimal → Binär (wiederholte Division durch 2)**

| Division | Rest |
|----------|------|
| $264 \\div 2 = 132$ | 0 |
| $132 \\div 2 = 66$ | 0 |
| $66 \\div 2 = 33$ | 0 |
| $33 \\div 2 = 16$ | 1 |
| $16 \\div 2 = 8$ | 0 |
| $8 \\div 2 = 4$ | 0 |
| $4 \\div 2 = 2$ | 0 |
| $2 \\div 2 = 1$ | 0 |
| $1 \\div 2 = 0$ | 1 |

**Von unten nach oben lesen:** $264_{10} = 100001000_2$

[STEP]
**Schritt 3: Dezimal → Hexadezimal**

$264 \\div 16 = 16$ Rest $8$
$16 \\div 16 = 1$ Rest $0$
$1 \\div 16 = 0$ Rest $1$

Von unten: $108_{16}$

**Probe:** $1 \\cdot 256 + 0 \\cdot 16 + 8 \\cdot 1 = 256 + 8 = 264$ ✓

[RESULT]
$$2024_5 = 264_{10} = 100001000_2 = 108_{16}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240926-2",
    title: "Summenberechnung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2024",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne: $\\sum_{k=1}^{1000} (k^2 + 2k + 2) - \\sum_{n=1}^{1000} (n-1)^2$

[STEP]
**Schritt 1: Zweite Summe umschreiben**

$\\sum_{n=1}^{1000} (n-1)^2 = \\sum_{i=0}^{999} i^2 = 0^2 + \\sum_{i=1}^{999} i^2 = \\sum_{i=1}^{999} i^2$

Beachte: $(1000-1)^2 = 999^2$, aber $1000^2$ kommt in der zweiten Summe NICHT vor.

[STEP]
**Schritt 2: Differenz bilden**

$$D = \\underbrace{\\sum_{k=1}^{1000} k^2}_{\\text{alle } 1^2 \\text{ bis } 1000^2} + \\sum_{k=1}^{1000}(2k+2) - \\underbrace{\\sum_{i=1}^{999} i^2}_{\\text{nur } 1^2 \\text{ bis } 999^2}$$

Die $\\sum k^2$-Terme kürzen sich größtenteils:
$$\\sum_{k=1}^{1000} k^2 - \\sum_{i=1}^{999} i^2 = 1000^2$$

[STEP]
**Schritt 3: Rest auswerten**

$$D = 1000^2 + \\sum_{k=1}^{1000} (2k + 2)$$
$$D = 1.000.000 + 2\\sum_{k=1}^{1000} k + 2 \\cdot 1000$$
$$D = 1.000.000 + 2 \\cdot \\frac{1000 \\cdot 1001}{2} + 2.000$$
$$D = 1.000.000 + 1.001.000 + 2.000 = 2.003.000$$

[STEP]
**Schritt 4: Alternativer Lösungsweg (eleganter)**

$$(k^2 + 2k + 2) - ((k-1)^2) = k^2 + 2k + 2 - (k^2 - 2k + 1) = 4k + 1$$

Für $k = 1$: $(n-1)^2 = 0^2 = 0$ (beachte die Indexverschiebung)

$$D = 0 + \\sum_{k=1}^{1000} (4k + 1) = 4 \\cdot \\frac{1000 \\cdot 1001}{2} + 1000 = 2.002.000 + 1.000 = 2.003.000$$

> **💡 Der Trick:** $(k^2+2k+2) - (k-1)^2 = 4k+1$ vereinfacht die Differenz enorm!

[RESULT]
$$2.003.000$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240926-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2024",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeige mit Induktion:
$$1 \\cdot 2 \\cdot 3 + 2 \\cdot 3 \\cdot 4 + \\cdots + n(n+1)(n+2) = \\frac{n(n+1)(n+2)(n+3)}{4}$$

[STEP]
**Schritt 1: Induktionsanfang ($n=1$)**

Linke Seite: $1 \\cdot 2 \\cdot 3 = 6$

Rechte Seite: $\\frac{1 \\cdot 2 \\cdot 3 \\cdot 4}{4} = \\frac{24}{4} = 6$

$$6 = 6 \\quad \\checkmark$$

[STEP]
**Schritt 2: Induktionsvoraussetzung**

Für ein beliebiges $n \\in \\mathbb{N}$ gelte:
$$\\sum_{i=1}^{n} i(i+1)(i+2) = \\frac{n(n+1)(n+2)(n+3)}{4}$$

[STEP]
**Schritt 3: Induktionsschritt — Summe bis $n+1$**

$$\\sum_{i=1}^{n+1} i(i+1)(i+2) \\overset{\\text{IV}}{=} \\frac{n(n+1)(n+2)(n+3)}{4} + (n+1)(n+2)(n+3)$$

[STEP]
**Schritt 4: Faktorisieren**

Gemeinsamer Faktor: $(n+1)(n+2)(n+3)$

$$= \\frac{(n+1)(n+2)(n+3)}{4} \\cdot (n + 4)$$

$$= \\frac{(n+1)(n+2)(n+3)(n+4)}{4}$$

Das ist genau die Formel für $n+1$ ✓

[STEP]
**Schritt 5: Induktionsschluss**

IA ✓ | IS ✓ → Die Formel gilt für alle $n \\in \\mathbb{N}$.

> **💡 Merke:** Der Faktorisierungs-Trick in Schritt 4 ist entscheidend! Immer den größten gemeinsamen Faktor ausklammern.

[RESULT]
$$\\sum_{i=1}^{n} i(i+1)(i+2) = \\frac{n(n+1)(n+2)(n+3)}{4} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240926-4",
    title: "Rationale Ungleichung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2024",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimme alle $x \\in \\mathbb{R}$ mit:
$$\\frac{-x^2 + 7x - 12}{x^2 + 5x + 6} \\geq 0$$

[STEP]
**Schritt 1: Definitionsmenge**

Nenner: $x^2 + 5x + 6 = (x+2)(x+3) \\neq 0$

$$\\mathbb{D} = \\mathbb{R} \\setminus \\{-3, -2\\}$$

[STEP]
**Schritt 2: Zähler faktorisieren**

$-x^2 + 7x - 12 = -(x^2 - 7x + 12) = -(x-3)(x-4)$

Zählernullstellen: $x = 3$, $x = 4$

[STEP]
**Schritt 3: Vorzeichentabelle — kritische Punkte**

Kritische Punkte: $-3, -2, 3, 4$

| Intervall | $-(x-3)(x-4)$ | $(x+2)(x+3)$ | Bruch |
|-----------|---|---|---|---|
| $(-\\infty, -3)$ | $-$ | $+$ | $-$ |
| $(-3, -2)$ | $-$ | $-$ | $+$ |
| $(-2, 3)$ | $-$ | $+$ | $-$ |
| $(3, 4)$ | $+$ | $+$ | $+$ |
| $(4, \\infty)$ | $-$ | $+$ | $-$ |

[STEP]
**Schritt 4: Lösung ablesen**

„$\\geq 0$" — Bruch muss $\\geq 0$ sein:
- $(-3, -2)$: positiv ✓
- $(3, 4)$: positiv ✓
- $x = 3$ und $x = 4$: Zähler $= 0$, Bruch $= 0 \\geq 0$ ✓

Beachte: $x = -3, -2$ sind NICHT in der Definitionsmenge!

$$L = (-3, -2) \\cup [3, 4]$$

[RESULT]
$$L = (-3, -2) \\cup [3, 4]$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240926-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2024",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} \\left(\\frac{n^2 + n + 1}{n+1} - \\frac{2n^2 + 1}{2n+1}\\right)$
(ii) $\\lim_{n \\to \\infty} (n - \\sqrt{n^2 + 6n + 4})$

[STEP]
**Schritt 1: Grenzwert (i) — Auf gemeinsamen Nenner**

$$\\frac{(n^2+n+1)(2n+1) - (2n^2+1)(n+1)}{(n+1)(2n+1)}$$

Zähler ausmultiplizieren:
$(n^2+n+1)(2n+1) = 2n^3 + n^2 + 2n^2 + n + 2n + 1 = 2n^3 + 3n^2 + 3n + 1$

$(2n^2+1)(n+1) = 2n^3 + 2n^2 + n + 1$

[STEP]
**Schritt 2: Grenzwert (i) — Zählerdifferenz**

$$(2n^3 + 3n^2 + 3n + 1) - (2n^3 + 2n^2 + n + 1) = n^2 + 2n$$

Der Bruch: $\\frac{n^2 + 2n}{(n+1)(2n+1)} = \\frac{n^2 + 2n}{2n^2 + 3n + 1}$

[STEP]
**Schritt 3: Grenzwert (i) — Auswertung**

Durch $n^2$ kürzen: $\\frac{1 + 2/n}{2 + 3/n + 1/n^2} \\to \\frac{1}{2}$

$$\\lim = \\frac{1}{2}$$

[STEP]
**Schritt 4: Grenzwert (ii) — Trick: Erweitern**

$(n - \\sqrt{n^2+6n+4}) \\cdot \\frac{n + \\sqrt{n^2+6n+4}}{n + \\sqrt{n^2+6n+4}}$

3. binomische Formel: $(a-b)(a+b) = a^2 - b^2$

$$= \\frac{n^2 - (n^2+6n+4)}{n + \\sqrt{n^2+6n+4}} = \\frac{-6n - 4}{n + \\sqrt{n^2+6n+4}}$$

[STEP]
**Schritt 5: Grenzwert (ii) — Durch $n$ kürzen**

$$= \\frac{-6 - 4/n}{1 + \\sqrt{1 + 6/n + 4/n^2}} \\to \\frac{-6}{1 + 1} = \\frac{-6}{2} = -3$$

$$\\lim = -3$$

[RESULT]
$$\\text{(i) } \\frac{1}{2} \\qquad \\text{(ii) } -3$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240926-6",
    title: "Komplexe Nullstellen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2024",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimme alle komplexen Nullstellen von:
$$p(x) = (x^6 + 1)(x^2 - (3+j)x + (2+2j))$$

[STEP]
**Schritt 1: Nullstellen aus dem ersten Faktor**

$x^6 + 1 = 0 \\iff x^6 = -1 = 1\\angle\\pi$

6-te Wurzeln: $x_k = 1\\angle\\frac{\\pi + 2k\\pi}{6}$, $k = 0,1,\\ldots,5$

$x_0 = 1\\angle\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2} + \\frac{1}{2}j$
$x_1 = 1\\angle\\frac{3\\pi}{6} = j$
$x_2 = 1\\angle\\frac{5\\pi}{6} = -\\frac{\\sqrt{3}}{2} + \\frac{1}{2}j$
$x_3 = 1\\angle\\frac{7\\pi}{6} = -\\frac{\\sqrt{3}}{2} - \\frac{1}{2}j$
$x_4 = 1\\angle\\frac{9\\pi}{6} = -j$
$x_5 = 1\\angle\\frac{11\\pi}{6} = \\frac{\\sqrt{3}}{2} - \\frac{1}{2}j$

6 Nullstellen aus dem ersten Faktor.

[STEP]
**Schritt 2: Zweiter Faktor — p-q-Formel**

$x^2 - (3+j)x + (2+2j) = 0$

$p = -(3+j)$, $q = 2+2j$

$$x = \\frac{3+j}{2} \\pm \\sqrt{\\frac{(3+j)^2}{4} - (2+2j)}$$

[STEP]
**Schritt 3: Wurzelausdruck vereinfachen**

$(3+j)^2 = 9 + 6j + j^2 = 8 + 6j$

$\\frac{8+6j}{4} = 2 + \\frac{3}{2}j$

$2 + \\frac{3}{2}j - (2+2j) = -\\frac{1}{2}j$

$\\sqrt{-\\frac{1}{2}j} = \\frac{1}{\\sqrt{2}}\\angle(-\\frac{\\pi}{4}) = \\frac{1}{2} - \\frac{1}{2}j$

[STEP]
**Schritt 4: Nullstellen aus zweitem Faktor**

$x_6 = \\frac{3+j}{2} + (\\frac{1}{2} - \\frac{1}{2}j) = 2$

$x_7 = \\frac{3+j}{2} - (\\frac{1}{2} - \\frac{1}{2}j) = 1+j$

2 weitere Nullstellen, insgesamt also **8 Nullstellen**.

[RESULT]
$$x \\in \\{1\\angle\\frac{(2k+1)\\pi}{6} \\mid k = 0,\\ldots,5\\} \\cup \\{2, 1+j\\} \\quad \\text{(8 Nullstellen insgesamt)}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
