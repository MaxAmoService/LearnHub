// Klausur 28.11.2022 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur221128: Lesson[] = [
  {
    id: "ma1-klausur-221128-1",
    title: "De Morgan & Mengenoperationen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.11.2022",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $U = \\{1, 2, \\ldots, 10\\}$, $A = \\{1, 2, 3, 4, 5\\}$, $B = \\{4, 5, 6, 7\\}$.
Berechne: (a) $A \\cap B$, (b) $A \\cup B$, (c) $\\overline{A \\cap B}$ in $U$, (d) $\\overline{A} \\cup \\overline{B}$ in $U$.

[STEP]
**Schritt 1: $A \\cap B$ und $A \\cup B$**

$A \\cap B = \\{4, 5\\}$ (Elemente in beiden Mengen)

$A \\cup B = \\{1, 2, 3, 4, 5, 6, 7\\}$ (alle Elemente aus $A$ oder $B$)

[STEP]
**Schritt 2: Komplemente in $U$**

$\\overline{A} = U \\setminus A = \\{6, 7, 8, 9, 10\\}$

$\\overline{B} = U \\setminus B = \\{1, 2, 3, 8, 9, 10\\}$

[STEP]
**Schritt 3: $\\overline{A \\cap B}$ und $\\overline{A} \\cup \\overline{B}$**

$\\overline{A \\cap B} = U \\setminus \\{4, 5\\} = \\{1, 2, 3, 6, 7, 8, 9, 10\\}$

$\\overline{A} \\cup \\overline{B} = \\{6,7,8,9,10\\} \\cup \\{1,2,3,8,9,10\\} = \\{1,2,3,6,7,8,9,10\\}$

[STEP]
**Schritt 4: De Morgan verifizieren**

Nach De Morgan: $\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}$

Beide Ergebnisse: $\\{1,2,3,6,7,8,9,10\\}$ ✓ — Die Regel gilt!

[RESULT]
$$A \\cap B = \\{4,5\\}, \\quad A \\cup B = \\{1,2,3,4,5,6,7\\}$$ $$\\overline{A \\cap B} = \\overline{A} \\cup \\overline{B} = \\{1,2,3,6,7,8,9,10\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-221128-2",
    title: "Rechnen mit Binomialkoeffizienten",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.11.2022",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeige: $\\binom{n}{k} + \\binom{n}{k+1} = \\binom{n+1}{k+1}$ (Pascalsche Identität).

[STEP]
**Schritt 1: Linke Seite mit der Definition ausschreiben**

$\\binom{n}{k} + \\binom{n}{k+1} = \\frac{n!}{k!(n-k)!} + \\frac{n!}{(k+1)!(n-k-1)!}$

[STEP]
**Schritt 2: Auf gemeinsamen Nenner bringen**

Hauptnenner: $(k+1)!(n-k)!$

Erster Bruch: $\\frac{n!}{k!(n-k)!} = \\frac{n!(k+1)}{(k+1)!(n-k)!}$

Zweiter Bruch: $\\frac{n!}{(k+1)!(n-k-1)!} = \\frac{n!(n-k)}{(k+1)!(n-k)!}$

[STEP]
**Schritt 3: Addieren und vereinfachen**

$\\frac{n!(k+1) + n!(n-k)}{(k+1)!(n-k)!} = \\frac{n!(k+1+n-k)}{(k+1)!(n-k)!}$

$= \\frac{n!(n+1)}{(k+1)!(n-k)!} = \\frac{(n+1)!}{(k+1)!((n+1)-(k+1))!} = \\binom{n+1}{k+1}$

[RESULT]
$$\\binom{n}{k} + \\binom{n}{k+1} = \\binom{n+1}{k+1} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-221128-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.11.2022",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $\\sum_{i=0}^{n} 2^i = 2^{n+1} - 1$ für alle $n \\in \\mathbb{N}_0$.

[STEP]
**Schritt 1: Induktionsanfang ($n=0$)**

Linke Seite: $\\sum_{i=0}^{0} 2^i = 2^0 = 1$

Rechte Seite: $2^{1} - 1 = 1$ ✓

[STEP]
**Schritt 2: Induktionsvoraussetzung**

$\\sum_{i=0}^{n} 2^i = 2^{n+1} - 1$

[STEP]
**Schritt 3: Induktionsschritt**

$\\sum_{i=0}^{n+1} 2^i \\overset{\\text{IV}}{=} (2^{n+1} - 1) + 2^{n+1}$

$= 2 \\cdot 2^{n+1} - 1 = 2^{(n+1)+1} - 1$ ✓

[RESULT]
$$\\sum_{i=0}^{n} 2^i = 2^{n+1} - 1 \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-221128-4",
    title: "Ungleichung mit Polynomdivision",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.11.2022",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse: $\\frac{x^2 + 3x + 2}{x+1} \\geq x + 1$

[STEP]
**Schritt 1: Definitionsmenge & Polynomdivision**

$x \\neq -1$

Zähler faktorisieren: $x^2 + 3x + 2 = (x+1)(x+2)$

$\\frac{(x+1)(x+2)}{x+1} = x+2$ (für $x \\neq -1$)

[STEP]
**Schritt 2: Vereinfachte Ungleichung**

$x + 2 \\geq x + 1$

$2 \\geq 1$ → immer wahr!

[STEP]
**Schritt 3: Lösung**

Für alle $x \\neq -1$ ist die Ungleichung erfüllt. Die Definitionslücke bleibt ausgeschlossen.

[RESULT]
$$L = \\mathbb{R} \\setminus \\{-1\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-221128-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.11.2022",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} \\frac{2^n + 3^n}{2^n - 3^n}$
(ii) $\\lim_{n \\to \\infty} \\left(1 - \\frac{1}{n}\\right)^n$

[STEP]
**Schritt 1: (i) — Durch dominante Potenz kürzen**

$\\frac{2^n + 3^n}{2^n - 3^n} = \\frac{3^n(\\frac{2^n}{3^n} + 1)}{3^n(\\frac{2^n}{3^n} - 1)} = \\frac{(2/3)^n + 1}{(2/3)^n - 1}$

Da $(2/3)^n \\to 0$: $\\lim = \\frac{0+1}{0-1} = -1$

[STEP]
**Schritt 2: (ii) — Euler-Grenzwert**

$\\left(1 - \\frac{1}{n}\\right)^n = \\left(1 + \\frac{-1}{n}\\right)^n \\to e^{-1} = \\frac{1}{e}$

[RESULT]
$$\\text{(i) } -1 \\qquad \\text{(ii) } \\frac{1}{e}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-221128-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.11.2022",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse $z^2 + (2-4j)z + (5+2j) = 0$ in $\\mathbb{C}$.

[STEP]
**Schritt 1: p-q-Formel**

$p = 2-4j$, $q = 5+2j$

$z = -\\frac{p}{2} \\pm \\sqrt{\\frac{p^2}{4} - q}$

[STEP]
**Schritt 2: Hilfsterme berechnen**

$-\\frac{p}{2} = -\\frac{2-4j}{2} = -1 + 2j$

$\\frac{p^2}{4} = \\frac{(2-4j)^2}{4} = \\frac{4 - 16j + 16j^2}{4} = \\frac{-12 - 16j}{4} = -3 - 4j$

$\\frac{p^2}{4} - q = (-3-4j) - (5+2j) = -8 - 6j$

[STEP]
**Schritt 3: Quadratwurzel aus $-8 - 6j$**

$|-8-6j| = \\sqrt{64+36} = 10$

$\\varphi = \\arctan(\\frac{-6}{-8}) + \\pi = \\arctan(\\frac{3}{4}) + \\pi$

$\\sqrt{-8-6j} = \\sqrt{10}\\angle\\frac{\\varphi}{2}$ (und die negative Wurzel)

Berechne: $\\sqrt{-8-6j} = 1 - 3j$ (durch $(1-3j)^2 = 1 - 6j - 9 = -8-6j$ verifiziert)

[STEP]
**Schritt 4: Lösungen**

$z_1 = (-1+2j) + (1-3j) = 0 - j = -j$

$z_2 = (-1+2j) - (1-3j) = -2 + 5j$

[RESULT]
$$z \\in \\{-j, -2 + 5j\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
