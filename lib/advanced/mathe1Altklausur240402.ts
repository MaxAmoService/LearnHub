// Klausur 02.04.2024 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur240402: Lesson[] = [
  {
    id: "ma1-klausur-240402-1",
    title: "Kardinalitäten",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 02.04.2024",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $M = \\{a, b, c, d, e\\}$. Bestimme $|\\mathcal{P}(M)|$, $|\\{X \\subseteq M \\mid |X| = 3\\}|$ und die Anzahl aller Abbildungen $f: M \\to \\{0, 1\\}$.

[STEP]
**Schritt 1: $|\\mathcal{P}(M)|$ — die Potenzmenge**

$|M| = 5$ (5 Elemente: $a, b, c, d, e$)

$$|\\mathcal{P}(M)| = 2^{|M|} = 2^5 = 32$$

> **💡 Potenzmenge = Menge aller Teilmengen.** Jedes Element kann in der Teilmenge sein oder nicht → $2^n$ Möglichkeiten.

[STEP]
**Schritt 2: Anzahl 3-elementiger Teilmengen**

$$|\\{X \\subseteq M \\mid |X| = 3\\}| = \\binom{5}{3} = \\frac{5 \\cdot 4 \\cdot 3}{3 \\cdot 2 \\cdot 1} = 10$$

> **💡 Symmetrie:** $\\binom{5}{3} = \\binom{5}{2} = 10$

[STEP]
**Schritt 3: Anzahl Abbildungen $f: M \\to \\{0, 1\\}$**

Jedes der 5 Elemente von $M$ kann auf 0 oder 1 abgebildet werden:

$$|\\{f: M \\to \\{0, 1\\}\\}| = 2^5 = 32$$

> **💡 Interessant:** Das ist dieselbe Zahl wie $|\\mathcal{P}(M)|$ — kein Zufall! Jede Teilmenge $A \\subseteq M$ entspricht genau einer Abbildung $f_A(x) = 1$ falls $x \\in A$, sonst $0$ (charakteristische Funktion).

[RESULT]
$$|\\mathcal{P}(M)| = 32, \\quad \\binom{5}{3} = 10, \\quad |\\{f: M \\to \\{0,1\\}\\}| = 32$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240402-2",
    title: "Summen mit Formeln",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 02.04.2024",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne $\\sum_{k=1}^{n} (3k^2 - 2k + 1)$ mit den Summenformeln.

[STEP]
**Schritt 1: Summe aufteilen**

$$\\sum_{k=1}^{n} (3k^2 - 2k + 1) = 3\\sum_{k=1}^{n} k^2 - 2\\sum_{k=1}^{n} k + \\sum_{k=1}^{n} 1$$

[STEP]
**Schritt 2: Summenformeln einsetzen**

- $\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}$
- $\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}$
- $\\sum_{k=1}^{n} 1 = n$

$$= 3 \\cdot \\frac{n(n+1)(2n+1)}{6} - 2 \\cdot \\frac{n(n+1)}{2} + n$$
$$= \\frac{n(n+1)(2n+1)}{2} - n(n+1) + n$$

[STEP]
**Schritt 3: Vereinfachen**

Alles auf Nenner 2:
$$= \\frac{n(n+1)(2n+1) - 2n(n+1) + 2n}{2}$$
$$= \\frac{n(n+1)(2n+1 - 2) + 2n}{2}$$
$$= \\frac{n(n+1)(2n-1) + 2n}{2}$$

[RESULT]
$$\\sum_{k=1}^{n} (3k^2 - 2k + 1) = \\frac{n(n+1)(2n-1) + 2n}{2}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240402-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 02.04.2024",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $\\sum_{i=1}^{n} (2i-1) = n^2$ (Summe der ersten $n$ ungeraden Zahlen).

[STEP]
**Schritt 1: Induktionsanfang ($n=1$)**

Linke Seite: $\\sum_{i=1}^{1} (2i-1) = 2 \\cdot 1 - 1 = 1$

Rechte Seite: $1^2 = 1$

$$1 = 1 \\quad \\checkmark$$

[STEP]
**Schritt 2: Induktionsvoraussetzung**

$$\\sum_{i=1}^{n} (2i-1) = n^2$$

[STEP]
**Schritt 3: Induktionsschritt**

$$\\sum_{i=1}^{n+1} (2i-1) = \\sum_{i=1}^{n} (2i-1) + (2(n+1)-1)$$
$$\\overset{\\text{IV}}{=} n^2 + 2n + 2 - 1 = n^2 + 2n + 1 = (n+1)^2 \\quad \\checkmark$$

[STEP]
**Schritt 4: Geometrische Deutung**

Die Summe der ersten $n$ ungeraden Zahlen ergibt stets eine Quadratzahl:

$1 = 1^2$ | $1+3 = 4 = 2^2$ | $1+3+5 = 9 = 3^2$ | $1+3+5+7 = 16 = 4^2$

Das lässt sich als wachsendes Quadrat visualisieren!

[RESULT]
$$\\sum_{i=1}^{n} (2i-1) = n^2 \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240402-4",
    title: "Einfache Betragsungleichung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 02.04.2024",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse $|2x-1| < 5$.

[STEP]
**Schritt 1: Betragsdefinition anwenden**

$|a| < c$ mit $c > 0$ bedeutet: $-c < a < c$

Also: $-5 < 2x-1 < 5$

[STEP]
**Schritt 2: Nach $x$ auflösen**

$+1$ auf allen Seiten: $-5 + 1 < 2x < 5 + 1$
$-4 < 2x < 6$

$:2$: $-2 < x < 3$

[STEP]
**Schritt 3: Lösung als Intervall**

$$L = (-2, 3)$$

**Probe $x=0$:** $|2 \\cdot 0 - 1| = |-1| = 1 < 5$ ✓
**Probe $x=-3$:** $|2(-3)-1| = |-7| = 7 \\not< 5$ ✓

[RESULT]
$$L = (-2, 3)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240402-5",
    title: "Grenzwert einer rationalen Folge",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 02.04.2024",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne $\\lim_{n \\to \\infty} \\frac{3n^2 - 2n + 1}{n^2 + 4}$.

[STEP]
**Schritt 1: Durch die höchste Potenz ($n^2$) kürzen**

$$\\frac{3n^2 - 2n + 1}{n^2 + 4} = \\frac{3 - \\frac{2}{n} + \\frac{1}{n^2}}{1 + \\frac{4}{n^2}}$$

[STEP]
**Schritt 2: Grenzwert bilden**

Für $n \\to \\infty$: $\\frac{2}{n} \\to 0$, $\\frac{1}{n^2} \\to 0$, $\\frac{4}{n^2} \\to 0$

$$\\lim = \\frac{3 - 0 + 0}{1 + 0} = 3$$

> **💡 Bei gleichem Zähler- und Nennergrad:** Der Grenzwert ist das Verhältnis der Leitkoeffizienten ($3/1 = 3$).

[RESULT]
$$3$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-240402-6",
    title: "Komplexe Zahlen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 02.04.2024",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne $(1+j)^4$ auf zwei Wegen: (a) durch Ausmultiplizieren, (b) mit der Polarform.

[STEP]
**Schritt 1: Methode (a) — Ausmultiplizieren**

$(1+j)^2 = 1 + 2j + j^2 = 1 + 2j - 1 = 2j$

$(1+j)^4 = ((1+j)^2)^2 = (2j)^2 = 4j^2 = 4 \\cdot (-1) = -4$

[STEP]
**Schritt 2: Methode (b) — Polarform**

$1+j = \\sqrt{1^2 + 1^2}\\angle\\arctan(1/1) = \\sqrt{2}\\angle\\frac{\\pi}{4}$

De Moivre: $(r\\angle\\varphi)^n = r^n\\angle(n\\varphi)$

$$(1+j)^4 = (\\sqrt{2})^4\\angle(4 \\cdot \\frac{\\pi}{4}) = 4\\angle\\pi = 4(\\cos\\pi + j\\sin\\pi) = 4(-1 + 0) = -4$$

[STEP]
**Schritt 3: Vergleich & Erkenntnis**

Beide Methoden liefern $-4$. Die Polarform-Methode ist besonders nützlich für hohe Potenzen!

> **💡 Merke:** $(1+j)^4 = -4$. Das ist eine beliebte Klausuraufgabe — präge dir das Ergebnis ein! $(1+j)^2 = 2j$, $(1+j)^3 = -2+2j$, $(1+j)^4 = -4$.

[RESULT]
$$(1+j)^4 = -4$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
