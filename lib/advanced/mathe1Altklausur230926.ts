// Klausur 26.09.2023 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur230926: Lesson[] = [
  {
    id: "ma1-klausur-230926-1",
    title: "Mengen & Abbildungen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2023",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Seien $A = \\{1, 2, 3, 4\\}$, $B = \\{a, b, c\\}$. Bestimme:
(a) $|A \\times B|$ und $|\\mathcal{P}(A \\cap \\{2, 3, 5\\})|$
(b) Anzahl aller, injektiver und surjektiver Abbildungen $f: B \\to A$

[STEP]
**Schritt 1: Kartesisches Produkt**

$|A \\times B| = |A| \\cdot |B| = 4 \\cdot 3 = 12$

[STEP]
**Schritt 2: Potenzmenge der Schnittmenge**

$A \\cap \\{2, 3, 5\\} = \\{2, 3\\}$ (nur 2 und 3 sind in beiden Mengen)

$|\\{2, 3\\}| = 2$ → $|\\mathcal{P}(\\{2, 3\\})| = 2^2 = 4$

Die Teilmengen sind: $\\emptyset, \\{2\\}, \\{3\\}, \\{2, 3\\}$

[STEP]
**Schritt 3: Abbildungen $f: B \\to A$**

$|B| = 3$, $|A| = 4$

**Alle Abbildungen:** $4^3 = 64$
**Injektive:** $4 \\cdot 3 \\cdot 2 = 24$ (3 verschiedene Ziele aus 4 wählen)
**Surjektive:** $0$ (3 Urbilder können nicht alle 4 Ziele treffen — Schubfachprinzip!)

[RESULT]
$$|A \\times B| = 12, \\quad |\\mathcal{P}(\\{2,3\\})| = 4, \\quad |\\{f\\}| = 64, \\quad \\text{Injektive} = 24, \\quad \\text{Surjektive} = 0$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230926-2",
    title: "Binomialkoeffizienten & Summen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2023",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne: $\\sum_{k=0}^{8} \\binom{8}{k} \\cdot 2^k$

[STEP]
**Schritt 1: Den binomischen Lehrsatz erkennen**

Der binomische Lehrsatz sagt: $(x + y)^n = \\sum_{k=0}^{n} \\binom{n}{k} x^{n-k} y^k$

Mit $x = 1$, $y = 2$ und $n = 8$:
$$(1 + 2)^8 = \\sum_{k=0}^{8} \\binom{8}{k} \\cdot 1^{8-k} \\cdot 2^k = \\sum_{k=0}^{8} \\binom{8}{k} \\cdot 2^k$$

[STEP]
**Schritt 2: Auswerten**

$$\\sum_{k=0}^{8} \\binom{8}{k} \\cdot 2^k = (1+2)^8 = 3^8$$

$3^8 = 3^4 \\cdot 3^4 = 81 \\cdot 81 = 6561$

> **💡** Der binomische Lehrsatz ist ein mächtiges Werkzeug — er verwandelt eine Summe von Binomialkoeffizienten in eine einfache Potenz!

[RESULT]
$$\\sum_{k=0}^{8} \\binom{8}{k} \\cdot 2^k = 3^8 = 6561$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230926-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2023",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $7^n - 1$ ist für alle $n \\in \\mathbb{N}$ durch 6 teilbar.

[STEP]
**Schritt 1: Induktionsanfang ($n=1$)**

$7^1 - 1 = 6 = 6 \\cdot 1$ ✓ (durch 6 teilbar)

[STEP]
**Schritt 2: Induktionsvoraussetzung**

$6 \\mid (7^n - 1)$, d.h. $7^n - 1 = 6k$ für ein $k \\in \\mathbb{Z}$

[STEP]
**Schritt 3: Induktionsschritt — $7^{n+1} - 1$ umformen**

$7^{n+1} - 1 = 7 \\cdot 7^n - 1$

Trick: $7 \\cdot 7^n = (6+1) \\cdot 7^n = 6 \\cdot 7^n + 7^n$

$7^{n+1} - 1 = 6 \\cdot 7^n + 7^n - 1 = 6 \\cdot 7^n + (7^n - 1)$

Nach IV: $7^n - 1 = 6k$

$= 6 \\cdot 7^n + 6k = 6(7^n + k)$ → durch 6 teilbar ✓

[RESULT]
$$6 \\mid (7^n - 1) \\quad \\text{für alle } n \\in \\mathbb{N} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230926-4",
    title: "Quadratische Ungleichung mit Fallunterscheidung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2023",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse: $\\frac{x^2 - 4}{x - 1} \\leq 0$

[STEP]
**Schritt 1: Definitionsmenge und Faktorisierung**

$\\mathbb{D} = \\mathbb{R} \\setminus \\{1\\}$

Zähler: $x^2 - 4 = (x-2)(x+2)$

Nullstellen: $x = -2, 1, 2$

[STEP]
**Schritt 2: Vorzeichentabelle**

| Intervall | $(x-2)$ | $(x+2)$ | $(x-1)$ | Bruch |
|-----------|---|---|---|---|
| $(-\\infty, -2)$ | $-$ | $-$ | $-$ | $-$ |
| $(-2, 1)$ | $-$ | $+$ | $-$ | $+$ |
| $(1, 2)$ | $-$ | $+$ | $+$ | $-$ |
| $(2, \\infty)$ | $+$ | $+$ | $+$ | $+$ |

[STEP]
**Schritt 3: Lösung ablesen (Bruch $\\leq 0$)**

- $(-\\infty, -2]$: negativ oder null ✓
- $(-2, 1)$: positiv ✗
- $(1, 2]$: negativ oder null ✓
- $(2, \\infty)$: positiv ✗

Bei $x=-2$ und $x=2$: Zähler $=0$ ✓. $x=1$: nicht definiert.

[RESULT]
$$L = (-\\infty, -2] \\cup (1, 2]$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230926-5",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2023",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} \\frac{\\sqrt{n^2 + 4n} - n}{2}$
(ii) $\\lim_{n \\to \\infty} \\sqrt[n]{3^n + 4^n}$

[STEP]
**Schritt 1: Grenzwert (i) — Erweitern mit der konjugierten Wurzel**

$\\frac{\\sqrt{n^2+4n} - n}{2} \\cdot \\frac{\\sqrt{n^2+4n} + n}{\\sqrt{n^2+4n} + n}$

$= \\frac{n^2+4n - n^2}{2(\\sqrt{n^2+4n} + n)} = \\frac{4n}{2(\\sqrt{n^2+4n} + n)}$

$= \\frac{2n}{\\sqrt{n^2+4n} + n} = \\frac{2}{\\sqrt{1+4/n} + 1} \\to \\frac{2}{2} = 1$

[STEP]
**Schritt 2: Grenzwert (ii) — Dominante Terme unter der Wurzel**

$\\sqrt[n]{3^n + 4^n} = 4 \\cdot \\sqrt[n]{(3/4)^n + 1}$

Da $(3/4)^n \\to 0$: $\\sqrt[n]{0+1} = \\sqrt[n]{1} = 1$

Insgesamt: $4 \\cdot 1 = 4$

[RESULT]
$$\\text{(i) } 1 \\qquad \\text{(ii) } 4$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-230926-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.09.2023",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
(a) Wandle $z = -\\sqrt{3} + j$ in Polarform um.
(b) Berechne $z^6$ mit de Moivre und gib das Ergebnis in Normalform an.

[STEP]
**Schritt 1: Polarform von $z$**

$|z| = \\sqrt{(-\\sqrt{3})^2 + 1^2} = \\sqrt{3+1} = 2$

$\\varphi = \\arctan(\\frac{1}{-\\sqrt{3}})$ — 2. Quadrant!

$\\varphi = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$

$$z = 2\\angle\\frac{5\\pi}{6}$$

[STEP]
**Schritt 2: $z^6$ mit de Moivre**

$z^6 = 2^6\\angle(6 \\cdot \\frac{5\\pi}{6}) = 64\\angle 5\\pi = 64\\angle\\pi$

(da $5\\pi = \\pi + 2 \\cdot 2\\pi$, also $5\\pi \\equiv \\pi \\pmod{2\\pi}$)

[STEP]
**Schritt 3: Zurück in Normalform**

$64\\angle\\pi = 64(\\cos\\pi + j\\sin\\pi) = 64(-1 + 0) = -64$

[RESULT]
$$z = 2\\angle\\frac{5\\pi}{6}, \\quad z^6 = -64$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
