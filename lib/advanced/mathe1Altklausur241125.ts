// Klausur 25.11.2024 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur241125: Lesson[] = [
  {
    id: "ma1-klausur-241125-1",
    title: "Mengen & Kardinalitäten",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 25.11.2024",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $M = \\{1, 2, 3, 4, 5, 6\\}$. Bestimme:
(a) $|\\mathcal{P}(M)|$
(b) Anzahl der 3-elementigen Teilmengen von $M$
(c) Anzahl aller Abbildungen $f: \\{1,2,3\\} \\to M$
(d) Anzahl injektiver Abbildungen $f: \\{1,2,3\\} \\to M$

[STEP]
**Schritt 1: Potenzmenge $\\mathcal{P}(M)$**

$|M| = 6$ → $|\\mathcal{P}(M)| = 2^6 = 64$

Jede der 6 Elemente kann in einer Teilmenge sein oder nicht: $2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 64$

[STEP]
**Schritt 2: 3-elementige Teilmengen**

$$\\binom{6}{3} = \\frac{6 \\cdot 5 \\cdot 4}{3 \\cdot 2 \\cdot 1} = 20$$

> **💡** $\\binom{6}{3} = \\binom{6}{3}$ wegen Symmetrie.

[STEP]
**Schritt 3: Alle Abbildungen $f: \\{1,2,3\\} \\to M$**

Definitionsmenge hat 3 Elemente, Zielmenge hat 6 Elemente.
Jedes der 3 Urbilder kann auf jedes der 6 Ziele abgebildet werden:

$$|\\{f\\}| = 6^3 = 216$$

[STEP]
**Schritt 4: Injektive Abbildungen**

3 Urbilder müssen auf 3 verschiedene Ziele: $6 \\cdot 5 \\cdot 4 = 120$

Das ist $\\frac{6!}{(6-3)!}$ — die Anzahl der Möglichkeiten, 3 aus 6 Elementen mit Reihenfolge auszuwählen.

[RESULT]
$$|\\mathcal{P}(M)| = 64, \\quad \\binom{6}{3} = 20, \\quad |\\{f\\}| = 216, \\quad \\text{Injektive} = 120$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-241125-2",
    title: "Geometrische Summe & Indexverschiebung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 25.11.2024",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne ohne Summenzeichen:
$$S = \\sum_{k=3}^{18} 2 \\cdot 3^k - \\sum_{n=0}^{15} 2 \\cdot 3^{n+3}$$

[STEP]
**Schritt 1: Zweite Summe per Indexverschiebung umformen**

$\\sum_{n=0}^{15} 2 \\cdot 3^{n+3} = 2 \\cdot 3^3 \\cdot \\sum_{n=0}^{15} 3^n = 54 \\cdot \\sum_{n=0}^{15} 3^n$

[STEP]
**Schritt 2: Beide Summen als geometrische Reihen**

Erste Summe: $\\sum_{k=3}^{18} 2 \\cdot 3^k = 2 \\cdot 3^3 \\cdot \\sum_{k=0}^{15} 3^k = 54 \\cdot \\frac{3^{16} - 1}{3 - 1}$

Zweite Summe: $54 \\cdot \\frac{3^{16} - 1}{3 - 1}$

[STEP]
**Schritt 3: Differenz bilden**

$$S = 54 \\cdot \\frac{3^{16} - 1}{2} - 54 \\cdot \\frac{3^{16} - 1}{2} = 0$$

> **💡 Trick erkannt?** Die Summen sind nach der Indexverschiebung identisch! Die Differenz ist 0.

[RESULT]
$$S = 0$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-241125-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 25.11.2024",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $\\sum_{i=1}^{n} i^3 = \\left(\\frac{n(n+1)}{2}\\right)^2$ für alle $n \\in \\mathbb{N}$.

[STEP]
**Schritt 1: Induktionsanfang ($n=1$)**

Linke Seite: $1^3 = 1$
Rechte Seite: $(\\frac{1 \\cdot 2}{2})^2 = 1^2 = 1$ ✓

[STEP]
**Schritt 2: Induktionsvoraussetzung**

$\\sum_{i=1}^{n} i^3 = \\left(\\frac{n(n+1)}{2}\\right)^2$

[STEP]
**Schritt 3: Induktionsschritt**

$\\sum_{i=1}^{n+1} i^3 \\overset{\\text{IV}}{=} \\left(\\frac{n(n+1)}{2}\\right)^2 + (n+1)^3$

$= \\frac{n^2(n+1)^2}{4} + (n+1)^3$

$= \\frac{n^2(n+1)^2 + 4(n+1)^3}{4}$

$= \\frac{(n+1)^2(n^2 + 4n + 4)}{4} = \\frac{(n+1)^2(n+2)^2}{4}$

$= \\left(\\frac{(n+1)(n+2)}{2}\\right)^2$ ✓

[RESULT]
$$\\sum_{i=1}^{n} i^3 = \\left(\\frac{n(n+1)}{2}\\right)^2 = (1+2+\\cdots+n)^2 \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-241125-4",
    title: "Ungleichung mit Fallunterscheidung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 25.11.2024",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse: $\\frac{2}{|x-1|} \\geq 1$

[STEP]
**Schritt 1: Definitionsmenge**

$|x-1| \\neq 0 \\implies x \\neq 1$

$\\mathbb{D} = \\mathbb{R} \\setminus \\{1\\}$

[STEP]
**Schritt 2: Multiplikation mit $|x-1| > 0$**

Da $|x-1|$ für alle $x \\neq 1$ strikt positiv ist, bleibt das Ungleichheitszeichen:

$$2 \\geq |x-1|$$
$$|x-1| \\leq 2$$

[STEP]
**Schritt 3: Betragsungleichung lösen**

$|x-1| \\leq 2$ bedeutet: $-2 \\leq x-1 \\leq 2$

$+1$: $-1 \\leq x \\leq 3$

Mit Definitionsmenge: $L = [-1, 1) \\cup (1, 3]$

(Achtung: $x=1$ ist ausgenommen!)

[RESULT]
$$L = [-1, 1) \\cup (1, 3]$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-241125-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 25.11.2024",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} \\frac{4n^3 + 2n^2 - n}{2n^3 + 3n + 7}$
(ii) $\\lim_{n \\to \\infty} \\left(\\frac{n+2}{n-1}\\right)^{3n}$

[STEP]
**Schritt 1: Grenzwert (i) — Gleicher Zähler-/Nennergrad**

Durch $n^3$ kürzen:

$$\\lim \\frac{4 + \\frac{2}{n} - \\frac{1}{n^2}}{2 + \\frac{3}{n^2} + \\frac{7}{n^3}} = \\frac{4}{2} = 2$$

[STEP]
**Schritt 2: Grenzwert (ii) — Auf Euler-Form bringen**

$\\frac{n+2}{n-1} = \\frac{n-1+3}{n-1} = 1 + \\frac{3}{n-1}$

Also: $\\left(1 + \\frac{3}{n-1}\\right)^{3n}$

$= \\left[\\left(1 + \\frac{3}{n-1}\\right)^{n-1}\\right]^{\\frac{3n}{n-1}}$

[STEP]
**Schritt 3: Grenzwert (ii) — Auswertung**

$\\lim (1 + \\frac{3}{n-1})^{n-1} = e^3$

$\\lim \\frac{3n}{n-1} = 3$

Insgesamt: $\\lim = (e^3)^3 = e^9$

[RESULT]
$$\\text{(i) } 2 \\qquad \\text{(ii) } e^9$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-241125-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 25.11.2024",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse $z^4 + 16 = 0$ für $z \\in \\mathbb{C}$ und gib alle Lösungen in Polarform an.

[STEP]
**Schritt 1: Gleichung umstellen**

$z^4 = -16 = 16\\angle\\pi$

In Polarform: $r^4 = 16$, $4\\varphi = \\pi + 2k\\pi$

[STEP]
**Schritt 2: Betrag und Winkel**

$r = \\sqrt[4]{16} = 2$

$\\varphi_k = \\frac{\\pi + 2k\\pi}{4} = \\frac{(2k+1)\\pi}{4}$, $k = 0,1,2,3$

[STEP]
**Schritt 3: Die 4 Lösungen**

$k=0$: $z_0 = 2\\angle\\frac{\\pi}{4} = 2(\\frac{\\sqrt{2}}{2} + j\\frac{\\sqrt{2}}{2}) = \\sqrt{2} + j\\sqrt{2}$

$k=1$: $z_1 = 2\\angle\\frac{3\\pi}{4} = -\\sqrt{2} + j\\sqrt{2}$

$k=2$: $z_2 = 2\\angle\\frac{5\\pi}{4} = -\\sqrt{2} - j\\sqrt{2}$

$k=3$: $z_3 = 2\\angle\\frac{7\\pi}{4} = \\sqrt{2} - j\\sqrt{2}$

[RESULT]
$$z \\in \\{2\\angle\\frac{(2k+1)\\pi}{4} \\mid k = 0,1,2,3\\} = \\{\\sqrt{2}(\\pm 1 \\pm j)\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
