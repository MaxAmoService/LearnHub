// Klausur 27.03.2025 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur250327: Lesson[] = [
  {
    id: "ma1-klausur-250327-1",
    title: "Mengenoperationen & Kartesisches Produkt",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.03.2025",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $A = \\{(x, y) \\mid x + y \\text{ ist ungerade}, x \\in \\{4, 5\\}, y \\in \\{2, 3, 4, 5\\}\\}$.

Bestimme: $(\\{1,2,3,4,5\\}^2 \\cap \\{1,2,3,4\\}^2 \\cap \\{1,2,3\\} \\times \\{3,4,5\\}) \\setminus A$

[STEP]
**Schritt 1: $A$ bestimmen — Bedingung prüfen**

Prüfe für jedes $(x,y)$ ob $x+y$ ungerade ist:

$(4,2)$: $4+2=6$ (gerade) → nicht in $A$
$(4,3)$: $4+3=7$ (ungerade) ✅
$(4,4)$: $4+4=8$ (gerade) → nicht in $A$
$(4,5)$: $4+5=9$ (ungerade) ✅
$(5,2)$: $5+2=7$ (ungerade) ✅
$(5,3)$: $5+3=8$ (gerade) → nicht in $A$
$(5,4)$: $5+4=9$ (ungerade) ✅
$(5,5)$: $5+5=10$ (gerade) → nicht in $A$

$$A = \\{(4,3), (4,5), (5,2), (5,4)\\}, \\quad |A| = 4$$

[STEP]
**Schritt 2: Schnittmengen vereinfachen**

$\\{1,2,3,4,5\\}^2 \\cap \\{1,2,3,4\\}^2 = \\{1,2,3,4\\}^2$

(Die kleinere Menge $\\{1,2,3,4\\}^2$ ist vollständig in $\\{1,2,3,4,5\\}^2$ enthalten.)

Nun: $\\{1,2,3,4\\}^2 \\cap (\\{1,2,3\\} \\times \\{3,4,5\\})$

Erste Komponente: $\\{1,2,3,4\\} \\cap \\{1,2,3\\} = \\{1,2,3\\}$

Zweite Komponente: $\\{1,2,3,4\\} \\cap \\{3,4,5\\} = \\{3,4\\}$

Also: $\\{1,2,3\\} \\times \\{3,4\\}$

[STEP]
**Schritt 3: Kartesisches Produkt aufzählen**

$$\\{1,2,3\\} \\times \\{3,4\\} = \\{(1,3), (1,4), (2,3), (2,4), (3,3), (3,4)\\}$$

Das ist unsere Schnittmenge — 6 Paare.

[STEP]
**Schritt 4: $A$ abziehen**

$A = \\{(4,3), (4,5), (5,2), (5,4)\\}$

Die Elemente von $A$ haben $x \\in \\{4,5\\}$. Unsere Schnittmenge hat $x \\in \\{1,2,3\\}$.

**Die Mengen sind disjunkt!** Also ändert das Abziehen nichts.

[RESULT]
$$(\\{1,2,3,4,5\\}^2 \\cap \\{1,2,3,4\\}^2 \\cap \\{1,2,3\\} \\times \\{3,4,5\\}) \\setminus A = \\{(1,3), (1,4), (2,3), (2,4), (3,3), (3,4)\\}$$ $$|A| = 4$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-250327-2",
    title: "Komplexe Nullstellen eines Polynoms",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.03.2025",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimme alle komplexen Nullstellen von $p(z) = z^4 + 4z^2 + 3$ in polarer Darstellung und skizziere sie.

[STEP]
**Schritt 1: Substitution — biquadratische Gleichung**

$p(z) = (z^2)^2 + 4z^2 + 3$. Setze $w = z^2$:

$$w^2 + 4w + 3 = 0$$

[STEP]
**Schritt 2: Quadratische Gleichung lösen**

Faktorisieren: $(w+1)(w+3) = 0$

$$w_1 = -1, \\quad w_2 = -3$$

[STEP]
**Schritt 3: Rücksubstitution für $w_1 = -1$**

$z^2 = -1 = 1\\angle\\pi$

Quadratwurzel: $z = \\sqrt{1}\\angle\\frac{\\pi + 2k\\pi}{2}$, $k = 0,1$

$z_{1} = 1\\angle\\frac{\\pi}{2} = j$

$z_{2} = 1\\angle\\frac{3\\pi}{2} = -j$

Polar: $z_{1,2} = 1\\angle(\\pm\\frac{\\pi}{2})$

[STEP]
**Schritt 4: Rücksubstitution für $w_2 = -3$**

$z^2 = -3 = 3\\angle\\pi$

$z_{3} = \\sqrt{3}\\angle\\frac{\\pi}{2} = j\\sqrt{3}$

$z_{4} = \\sqrt{3}\\angle\\frac{3\\pi}{2} = -j\\sqrt{3}$

Polar: $z_{3,4} = \\sqrt{3}\\angle(\\pm\\frac{\\pi}{2})$

[STEP]
**Schritt 5: Ergebnis und Skizze**

**Alle 4 Nullstellen liegen auf der imaginären Achse** (Re $= 0$):
- $z_{1,2} = \\pm j$ (Einheitskreis)
- $z_{3,4} = \\pm j\\sqrt{3}$ (Radius $\\sqrt{3} \\approx 1.73$)

> **💡 Merke:** Ein biquadratisches Polynom $z^4 + az^2 + b$ hat Nullstellen, die symmetrisch zum Ursprung und zu den Achsen liegen!

[RESULT]
$$z \\in \\{1\\angle\\frac{\\pi}{2}, 1\\angle(-\\frac{\\pi}{2}), \\sqrt{3}\\angle\\frac{\\pi}{2}, \\sqrt{3}\\angle(-\\frac{\\pi}{2})\\} = \\{\\pm j, \\pm j\\sqrt{3}\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-250327-3",
    title: "Ungleichung mit Betrag im Nenner",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.03.2025",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimme alle $x \\in \\mathbb{R}$ mit:
$$\\frac{x+2}{|x-3|} \\leq 2$$

[STEP]
**Schritt 1: Definitionsmenge**

Der Nenner darf nicht 0 sein: $|x-3| > 0 \\implies x \\neq 3$

$$\\mathbb{D} = \\mathbb{R} \\setminus \\{3\\}$$

Der kritische Punkt $x=3$ teilt $\\mathbb{R}$ in zwei Bereiche.

[STEP]
**Schritt 2: Fall 1 — $x > 3$**

Für $x > 3$: $|x-3| = x-3$ (positiv)

$$\\frac{x+2}{x-3} \\leq 2$$

Multiplikation mit $x-3 > 0$ (Zeichen bleibt):
$$x+2 \\leq 2(x-3) = 2x-6$$
$$x+2 \\leq 2x-6$$
$$8 \\leq x$$

Mit Fallbedingung $x > 3$: $L_1 = [8, \\infty)$

[STEP]
**Schritt 3: Fall 2 — $x < 3$**

Für $x < 3$: $|x-3| = -(x-3) = 3-x$

$$\\frac{x+2}{3-x} \\leq 2$$

Multiplikation mit $3-x > 0$ (Zeichen bleibt):
$$x+2 \\leq 2(3-x) = 6-2x$$
$$x+2 \\leq 6-2x$$
$$3x \\leq 4$$
$$x \\leq \\frac{4}{3}$$

Mit Fallbedingung $x < 3$: $L_2 = (-\\infty, \\frac{4}{3}]$

[STEP]
**Schritt 4: Gesamtlösung**

$$L = L_1 \\cup L_2 = (-\\infty, \\frac{4}{3}] \\cup [8, \\infty)$$

> **💡 Merke:** Bei $x = \\frac{4}{3}$ ist der Bruch $\\frac{4/3+2}{3-4/3} = \\frac{10/3}{5/3} = 2$ ✓. Bei $x = 8$: $\\frac{10}{5} = 2$ ✓.

[RESULT]
$$L = (-\\infty, \\frac{4}{3}] \\cup [8, \\infty)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-250327-4",
    title: "Grenzwert mit Parameter",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.03.2025",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist $a_n = \\frac{c^2n^2 + 3cn^2 - 4n^2 + 3 + n}{n^2 + n - 1}$.

Für welche $c \\in \\mathbb{R}$ gilt $\\lim_{n \\to \\infty} a_n = 0$?

[STEP]
**Schritt 1: Nach $n^2$-Potenzen ordnen**

Im Zähler $n^2$ ausklammern:

$$a_n = \\frac{(c^2 + 3c - 4)n^2 + n + 3}{n^2 + n - 1}$$

[STEP]
**Schritt 2: Grenzwertanalyse — durch $n^2$ kürzen**

$$\\lim_{n \\to \\infty} a_n = \\lim_{n \\to \\infty} \\frac{(c^2 + 3c - 4) + \\frac{1}{n} + \\frac{3}{n^2}}{1 + \\frac{1}{n} - \\frac{1}{n^2}}$$

Für $n \\to \\infty$ gehen $\\frac{1}{n}$ und $\\frac{3}{n^2}$ gegen 0:

$$\\lim a_n = \\frac{c^2 + 3c - 4}{1} = c^2 + 3c - 4$$

[STEP]
**Schritt 3: Bedingung für Grenzwert 0**

$$c^2 + 3c - 4 = 0$$

Faktorisieren: $(c+4)(c-1) = 0$

$$c = -4 \\quad \\text{oder} \\quad c = 1$$

[STEP]
**Schritt 4: Probe**

**$c=1$:** $a_n = \\frac{(1+3-4)n^2 + n + 3}{n^2 + n - 1} = \\frac{n+3}{n^2+n-1} \\to 0$ ✓

**$c=-4$:** $a_n = \\frac{(16-12-4)n^2 + n + 3}{n^2 + n - 1} = \\frac{n+3}{n^2+n-1} \\to 0$ ✓

> **💡 Merke:** Der Grenzwert einer rationalen Folge wird durch die Koeffizienten der höchsten Potenz bestimmt. Ist der Zählergrad < Nennergrad, ist der Grenzwert immer 0.

[RESULT]
$$c = -4 \\quad \\text{oder} \\quad c = 1$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-250327-5",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.03.2025",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweise: $n^3 - 6n^2 + 14n$ ist für alle $n \\in \\mathbb{N}$ durch 3 teilbar.

[STEP]
**Schritt 1: Induktionsanfang ($n=1$)**

$1^3 - 6 \\cdot 1^2 + 14 \\cdot 1 = 1 - 6 + 14 = 9 = 3 \\cdot 3$

$9$ ist durch 3 teilbar ✓

[STEP]
**Schritt 2: Induktionsvoraussetzung (IV)**

Für ein $n \\in \\mathbb{N}$ gelte: $3 \\mid (n^3 - 6n^2 + 14n)$

Das heißt: $n^3 - 6n^2 + 14n = 3k$ für ein $k \\in \\mathbb{Z}$.

[STEP]
**Schritt 3: Induktionsschritt — für $n+1$ auswerten**

$(n+1)^3 - 6(n+1)^2 + 14(n+1)$

Ausmultiplizieren:
$(n+1)^3 = n^3 + 3n^2 + 3n + 1$
$(n+1)^2 = n^2 + 2n + 1$

$$= (n^3 + 3n^2 + 3n + 1) - 6(n^2 + 2n + 1) + 14n + 14$$
$$= n^3 + 3n^2 + 3n + 1 - 6n^2 - 12n - 6 + 14n + 14$$

[STEP]
**Schritt 4: Umordnen — den IV-Term isolieren**

$$= (n^3 - 6n^2 + 14n) + 3n^2 - 3n + 9$$
$$= (n^3 - 6n^2 + 14n) + 3(n^2 - n + 3)$$

Erster Summand: nach IV durch 3 teilbar.
Zweiter Summand: $3 \\cdot (\\ldots)$ — offensichtlich durch 3 teilbar.

Summe zweier durch 3 teilbarer Zahlen → durch 3 teilbar ✓

[STEP]
**Schritt 5: Induktionsschluss**

IA ($n=1$): ✓ | IS ($n \\to n+1$): ✓

Nach dem Prinzip der vollständigen Induktion ist $n^3 - 6n^2 + 14n$ für alle $n \\in \\mathbb{N}$ durch 3 teilbar.

> **💡 Der Schlüssel-Trick:** $(n+1)^3$ ausmultiplizieren und die Terme so umordnen, dass $n^3 - 6n^2 + 14n$ isoliert wird!

[RESULT]
$$3 \\mid (n^3 - 6n^2 + 14n) \\quad \\text{für alle } n \\in \\mathbb{N} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-250327-6",
    title: "Bijektivität zeigen (Selbstinverse Abbildung)",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 27.03.2025",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $X$ eine Menge und $f: X \\to X$ mit $f(f(x)) = x$ für alle $x \\in X$. Zeige: $f$ ist bijektiv.

[STEP]
**Schritt 1: Was bedeutet $f(f(x)) = x$?**

$f \\circ f = \\text{id}_X$ — die Abbildung ist **selbstinvers** (eine Involution).

Beispiele: $f(x) = -x$, $f(x) = 1/x$, Spiegelungen.

Zu zeigen: Injektivität + Surjektivität (beide separat beweisen).

[STEP]
**Schritt 2: Injektivität zeigen**

Zu zeigen: $f(x_1) = f(x_2) \\implies x_1 = x_2$

Seien $x_1, x_2 \\in X$ mit $f(x_1) = f(x_2)$.

Wende $f$ auf beide Seiten an:
$$f(f(x_1)) = f(f(x_2))$$

Mit der Eigenschaft $f(f(x)) = x$:
$$x_1 = x_2 \\quad \\checkmark$$

Injektivität gezeigt!

[STEP]
**Schritt 3: Surjektivität zeigen**

Zu zeigen: Für jedes $y \\in X$ existiert ein $x \\in X$ mit $f(x) = y$.

Sei $y \\in X$ beliebig. **Wähle $x = f(y)$**.

Dann: $f(x) = f(f(y)) = y$ (mit $f(f(y)) = y$)

Also gibt es zu jedem $y$ ein Urbild (nämlich $f(y)$ selbst) ✓

[STEP]
**Schritt 4: Fazit**

$f$ ist injektiv und surjektiv, also **bijektiv**.

Da $f^{-1} = f$ gilt, ist $f$ sogar eine **Involution** (Selbstinverse).

> **💡 Merke:** $f \\circ f = \\text{id}$ ist eine sehr starke Eigenschaft — sie impliziert sofort Bijektivität und $f = f^{-1}$!

[RESULT]
$$f \\text{ ist bijektiv und } f^{-1} = f \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
