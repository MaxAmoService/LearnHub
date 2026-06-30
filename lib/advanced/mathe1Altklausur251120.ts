// Klausur 20.11.2025 — 6 enhanced Lektionen
import { Lesson } from "../types";

export const mathe1Altklausur251120: Lesson[] = [
  {
    id: "ma1-klausur-251120-1",
    title: "Kardinalitäten & Abbildungen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.11.2025",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Mengenlehre & Kardinalität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Seien $M = \\mathcal{P}(\\{2, 0, 1, 1, 2, 0, 2, 5\\})$, $N = \\{X \\in M \\mid |X| = 2\\}$ und $A = \\{f \\mid f: N \\to M\\}$.

Bestimme $|M|$, $|N|$, $|A|$, sowie die Anzahl injektiver und surjektiver Abbildungen in $A$.

[STEP]
**Schritt 1: Grundmenge bereinigen**

Die Menge $\\{2, 0, 1, 1, 2, 0, 2, 5\\}$ enthält die **paarweise verschiedenen** Elemente $\\{0, 1, 2, 5\\}$ — also **4 Elemente**.

> **💡 Immer zuerst Duplikate eliminieren!** $\\{1, 2, 2, 3\\} = \\{1, 2, 3\\}$

[STEP]
**Schritt 2: $|M|$ und $|N|$ berechnen**

$M = \\mathcal{P}(\\text{4-elementige Menge})$:
$$|M| = 2^4 = 16$$

$N = \\{X \\in M \\mid |X| = 2\\}$ — alle 2-elementigen Teilmengen:
$$|N| = \\binom{4}{2} = \\frac{4 \\cdot 3}{2 \\cdot 1} = 6$$

[STEP]
**Schritt 3: $|A|$ und Anzahl injektiver/surjektiver Abbildungen**

**Alle Abbildungen $f: N \\to M$:**
$$|A| = |M|^{|N|} = 16^6$$

**Injektive Abbildungen:** $a = |N| = 6$, $b = |M| = 16$, $a \\leq b$:
$$16 \\cdot 15 \\cdot 14 \\cdot 13 \\cdot 12 \\cdot 11 = \\frac{16!}{10!}$$

**Surjektive Abbildungen:** $a = 6$, $b = 16$, $a < b$
$$0 \\text{ (kann nicht surjektiv sein — Schubfachprinzip!)}$$

> **💡 $|N| = 6 < 16 = |M|$** — ein $f$ mit 6 Urbildern kann unmöglich alle 16 Ziele treffen!

[RESULT]
$$|M| = 16, \\quad |N| = 6, \\quad |A| = 16^6, \\quad \\text{Injektive} = 16 \\cdot 15 \\cdot 14 \\cdot 13 \\cdot 12 \\cdot 11, \\quad \\text{Surjektive} = 0$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Mengenlehre & Kardinalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-251120-2",
    title: "Geometrische Summe",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.11.2025",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Summen & Indexverschiebung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Finde einen für alle $x \\in \\mathbb{R} \\setminus \\{2\\}$ gültigen Ausdruck für:
$$p(x) = \\sum_{k=5}^{25} \\frac{x^k}{2^k} - \\frac{2}{3}$$
(In der Lösung soll kein Summenzeichen mehr auftreten.)

[STEP]
**Schritt 1: Summe als geometrische Reihe erkennen**

$$\\sum_{k=5}^{25} \\frac{x^k}{2^k} = \\sum_{k=5}^{25} \\left(\\frac{x}{2}\\right)^k$$

Das ist eine **geometrische Summe** mit $q = \\frac{x}{2}$, Startindex 5, Endindex 25.

[STEP]
**Schritt 2: Geometrische Summenformel anwenden**

Für $q \\neq 1$: $\\sum_{k=m}^{n} q^k = q^m \\cdot \\frac{1 - q^{n-m+1}}{1 - q}$

Hier: $m = 5$, $n = 25$, $n-m+1 = 21$

$$\\sum_{k=5}^{25} \\left(\\frac{x}{2}\\right)^k = \\left(\\frac{x}{2}\\right)^5 \\cdot \\frac{1 - (\\frac{x}{2})^{21}}{1 - \\frac{x}{2}}$$

[STEP]
**Schritt 3: Vereinfachen**

$$= \\frac{x^5}{2^5} \\cdot \\frac{1 - (x/2)^{21}}{1 - x/2}$$

$$= \\frac{x^5(1 - (x/2)^{21})}{2^5(1 - x/2)}$$

Der Nenner: $2^5(1 - x/2) = 32 \\cdot \\frac{2-x}{2} = 16(2-x)$

[STEP]
**Schritt 4: $p(x)$ vollständig**

$$p(x) = \\frac{x^5(1 - (x/2)^{21})}{2^5(1 - x/2)} - \\frac{2}{3}$$

**Definitionsbereich:** $x \\neq 2$ (sonst ist $1 - x/2 = 0$ und der Bruch undefiniert).

[RESULT]
$$p(x) = \\frac{x^5(1 - (x/2)^{21})}{32(1 - x/2)} - \\frac{2}{3} \\quad \\text{für } x \\in \\mathbb{R} \\setminus \\{2\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Summen & Indexverschiebung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-251120-3",
    title: "Vollständige Induktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.11.2025",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Vollständige Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeige mit vollständiger Induktion:
$$\\frac{2^n}{n!} < \\left(\\frac{1}{2}\\right)^n \\qquad \\text{für alle } n \\geq 9$$

[STEP]
**Schritt 1: Induktionsanfang ($n=9$)**

Linke Seite: $\\frac{2^9}{9!} = \\frac{512}{362880} \\approx 0{,}00141$

Rechte Seite: $(\\frac{1}{2})^9 = \\frac{1}{512} \\approx 0{,}00195$

$$0{,}00141 < 0{,}00195 \\quad \\checkmark$$

> Der Induktionsanfang gilt! Beachte, dass $n=9$ der Startwert ist, nicht $n=1$.

[STEP]
**Schritt 2: Induktionsvoraussetzung (IV)**

Für ein beliebiges $n \\geq 9$ gelte:
$$\\frac{2^n}{n!} < \\left(\\frac{1}{2}\\right)^n$$

[STEP]
**Schritt 3: Induktionsschritt — umformen**

Zu zeigen: $\\frac{2^{n+1}}{(n+1)!} < \\left(\\frac{1}{2}\\right)^{n+1}$

$$\\frac{2^{n+1}}{(n+1)!} = \\frac{2 \\cdot 2^n}{(n+1) \\cdot n!} = \\frac{2^n}{n!} \\cdot \\frac{2}{n+1}$$

Mit der IV:
$$\\frac{2^n}{n!} \\cdot \\frac{2}{n+1} < \\left(\\frac{1}{2}\\right)^n \\cdot \\frac{2}{n+1}$$

[STEP]
**Schritt 4: Abschätzung für $n \\geq 9$**

Für $n \\geq 9$ gilt: $\\frac{2}{n+1} \\leq \\frac{2}{10} = \\frac{1}{5} < \\frac{1}{2}$

Also:
$$\\left(\\frac{1}{2}\\right)^n \\cdot \\frac{2}{n+1} < \\left(\\frac{1}{2}\\right)^n \\cdot \\frac{1}{2} = \\left(\\frac{1}{2}\\right)^{n+1}$$

[STEP]
**Schritt 5: Induktionsschluss**

Insgesamt: $\\frac{2^{n+1}}{(n+1)!} < \\left(\\frac{1}{2}\\right)^{n+1}$

✅ IA gilt für $n=9$, IS zeigt $n \\to n+1$ für alle $n \\geq 9$.

Nach dem Prinzip der vollständigen Induktion gilt die Aussage für alle $n \\geq 9$.

> **💡 Merke:** Der Induktionsanfang muss nicht immer bei $n=1$ liegen! Er kann bei jedem $n_0$ starten.

[RESULT]
$$\\frac{2^n}{n!} < \\left(\\frac{1}{2}\\right)^n \\quad \\text{für alle } n \\geq 9 \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Vollständige Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-251120-4",
    title: "Ungleichung mit Bruchtermen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.11.2025",
    content: `## Aufgabe 4

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Ungleichungen & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse die Ungleichung:
$$\\frac{x-5}{x^2-1} + \\frac{3x}{x-1} \\leq 5$$

[STEP]
**Schritt 1: Definitionsmenge**

$x^2 - 1 = (x-1)(x+1) \\neq 0$

$$\\mathbb{D} = \\mathbb{R} \\setminus \\{-1, 1\\}$$

Die kritischen Punkte $x = -1$ und $x = 1$ teilen $\\mathbb{R}$ in drei Bereiche.

[STEP]
**Schritt 2: Auf Hauptnenner bringen**

Hauptnenner: $(x-1)(x+1)$

$$\\frac{x-5}{(x-1)(x+1)} + \\frac{3x(x+1)}{(x-1)(x+1)} \\leq 5$$
$$\\frac{x-5 + 3x^2 + 3x}{(x-1)(x+1)} \\leq 5$$
$$\\frac{3x^2 + 4x - 5}{(x-1)(x+1)} \\leq 5$$

[STEP]
**Schritt 3: Alles auf eine Seite**

$$\\frac{3x^2 + 4x - 5}{(x-1)(x+1)} - 5 \\leq 0$$
$$\\frac{3x^2 + 4x - 5 - 5(x^2-1)}{(x-1)(x+1)} \\leq 0$$
$$\\frac{3x^2 + 4x - 5 - 5x^2 + 5}{(x-1)(x+1)} \\leq 0$$
$$\\frac{-2x^2 + 4x}{(x-1)(x+1)} \\leq 0$$
$$\\frac{2x(2-x)}{(x-1)(x+1)} \\leq 0$$

[STEP]
**Schritt 4: Vorzeichentabelle**

Faktoren: $2x$, $(2-x)$, $(x-1)$, $(x+1)$

Nullstellen der Faktoren: $x = -1, 0, 1, 2$

| Intervall | $2x$ | $2-x$ | $x-1$ | $x+1$ | Bruch |
|-----------|---|---|---|---|---|
| $(-\\infty, -1)$ | $-$ | $+$ | $-$ | $-$ | $+$ |
| $(-1, 0)$ | $-$ | $+$ | $-$ | $+$ | $-$ |
| $(0, 1)$ | $+$ | $+$ | $-$ | $+$ | $+$ |
| $(1, 2)$ | $+$ | $+$ | $+$ | $+$ | $+$ |
| $(2, \\infty)$ | $+$ | $-$ | $+$ | $+$ | $-$ |

[STEP]
**Schritt 5: Lösung ablesen**

„$\\leq 0$" bedeutet: Bruch $\\leq 0$. Aus der Tabelle:

- $(-1, 0)$: Bruch negativ ✓
- $(2, \\infty)$: Bruch negativ ✓
- Bei $x=0$ und $x=2$: Bruch $= 0$ ✓ (im Definitionsbereich)

$$L = (-1, 0] \\cup [2, \\infty)$$

[RESULT]
$$L = (-1, 0] \\cup [2, \\infty)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Ungleichungen & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-251120-5",
    title: "Grenzwerte von Folgen II",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.11.2025",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Grenzwerte & Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechne:
(i) $\\lim_{n \\to \\infty} \\frac{n^3 - 2n^2}{n^2 + 3n + 1} \\cdot \\frac{n^2 - 1}{-n - 1}$
(ii) $\\lim_{n \\to \\infty} \\frac{(n+13)^n}{(n+11)^n}$

[STEP]
**Schritt 1: Grenzwert (i) — Höchste Potenzen**

Zähler: $(n^3 - 2n^2)(n^2 - 1) = n^5 - n^3 - 2n^4 + 2n^2$

Nenner: $(n^2 + 3n + 1)(-n - 1) = -n^3 - n^2 - 3n^2 - 3n - n - 1 = -n^3 - 4n^2 - 4n - 1$

Höchste Potenz im Zähler: $n^5$, im Nenner: $-n^3$

[STEP]
**Schritt 2: Grenzwert (i) — Auswertung**

$$\\lim_{n \\to \\infty} \\frac{n^5}{-n^3} = \\lim_{n \\to \\infty} (-n^2) = -\\infty$$

> **💡 Zählergrad $5 > 3$ Nennergrad** → Bruch geht gegen $\\pm\\infty$ (hier $-\\infty$ wegen negativem Leitkoeffizienten).

[STEP]
**Schritt 3: Grenzwert (ii) — Umformen**

$$\\frac{(n+13)^n}{(n+11)^n} = \\left(\\frac{n+13}{n+11}\\right)^n = \\left(\\frac{n+11+2}{n+11}\\right)^n = \\left(1 + \\frac{2}{n+11}\\right)^n$$

[STEP]
**Schritt 4: Grenzwert (ii) — Euler-Formel anwenden**

$$\\left(1 + \\frac{2}{n+11}\\right)^n = \\left(1 + \\frac{2}{n+11}\\right)^{n+11} \\cdot \\left(1 + \\frac{2}{n+11}\\right)^{-11}$$

Erster Faktor: $\\lim_{m \\to \\infty} (1 + \\frac{2}{m})^m = e^2$ (mit $m = n+11$)

Zweiter Faktor: $\\lim (1 + \\frac{2}{n+11})^{-11} = 1^{-11} = 1$

$$\\lim = e^2 \\cdot 1 = e^2$$

[RESULT]
$$\\text{(i) } -\\infty \\qquad \\text{(ii) } e^2$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte & Konvergenz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma1-klausur-251120-6",
    title: "Komplexe Gleichung 8. Grades",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 20.11.2025",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 18 min | 🔑 Komplexe Zahlen & Polarform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Löse $z^8 - (3+j)z^4 + (2+2j) = 0$ für $z \\in \\mathbb{C}$.

[STEP]
**Schritt 1: Substitution zur Reduktion des Grades**

Erkenne: $z^8 = (z^4)^2$. Substitution $w = z^4$:

$$w^2 - (3+j)w + (2+2j) = 0$$

Jetzt haben wir eine quadratische Gleichung in $w$!

[STEP]
**Schritt 2: p-q-Formel anwenden**

$p = -(3+j)$, $q = 2+2j$

$$w_{1/2} = \\frac{3+j}{2} \\pm \\sqrt{\\frac{(3+j)^2}{4} - (2+2j)}$$

$(3+j)^2 = 9 + 6j + j^2 = 9 + 6j - 1 = 8 + 6j$

$\\frac{8+6j}{4} = 2 + \\frac{3}{2}j$

Unter der Wurzel: $2 + \\frac{3}{2}j - 2 - 2j = -\\frac{1}{2}j$

[STEP]
**Schritt 3: Quadratwurzel aus $-\\frac{1}{2}j$ ziehen**

$-\\frac{1}{2}j = \\frac{1}{2}\\angle(-\\frac{\\pi}{2})$

$\\sqrt{-\\frac{1}{2}j} = \\frac{1}{\\sqrt{2}}\\angle(-\\frac{\\pi}{4}) = \\frac{1}{\\sqrt{2}}(\\frac{\\sqrt{2}}{2} - j\\frac{\\sqrt{2}}{2}) = \\frac{1}{2} - \\frac{1}{2}j$

[STEP]
**Schritt 4: $w_1$ und $w_2$ berechnen**

$$w_1 = \\frac{3+j}{2} + (\\frac{1}{2} - \\frac{1}{2}j) = \\frac{3+j+1-j}{2} = \\frac{4}{2} = 2$$

$$w_2 = \\frac{3+j}{2} - (\\frac{1}{2} - \\frac{1}{2}j) = \\frac{3+j-1+j}{2} = \\frac{2+2j}{2} = 1+j$$

[STEP]
**Schritt 5: Rücksubstitution — 4-te Wurzeln**

Für $z^4 = 2$: $z = \\sqrt[4]{2}\\angle\\frac{0 + 2k\\pi}{4}$, $k = 0,1,2,3$
→ 4 Lösungen: $\\sqrt[4]{2}\\angle 0°, 90°, 180°, 270°$

Für $z^4 = 1+j = \\sqrt{2}\\angle\\frac{\\pi}{4}$:
$z = \\sqrt[4]{\\sqrt{2}}\\angle\\frac{\\pi/4 + 2k\\pi}{4} = 2^{1/8}\\angle\\frac{(8k+1)\\pi}{16}$, $k = 0,1,2,3$
→ 4 weitere Lösungen

**Insgesamt 8 Lösungen!** (wie vom Fundamentalsatz der Algebra gefordert)

[RESULT]
$$z \\in \\{\\sqrt[4]{2}\\angle\\frac{k\\pi}{2} \\mid k = 0,1,2,3\\} \\cup \\{2^{1/8}\\angle\\frac{(8k+1)\\pi}{16} \\mid k = 0,1,2,3\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Komplexe Zahlen & Polarform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
