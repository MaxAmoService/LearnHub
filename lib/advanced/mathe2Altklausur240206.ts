import { Lesson } from "../types";

export const mathe2Altklausur240206: Lesson[] = [
  {
    id: "ma2-klausur-240206-1",
    title: "Newtonsches Abkühlungsgesetz",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 06.02.2024",
    content: `## Aufgabe 1 — Newtonsches Abkühlungsgesetz

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Differentialgleichung, Exponentialfunktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Ein Objekt mit Anfangstemperatur $T_0 = 20°$ wird in einen Raum mit konstanter Temperatur $T_c = 100°$ gebracht. Nach $t = 10$ Minuten hat das Objekt $T(10) = 50°$. Das Newtonsche Abkühlungsgesetz lautet:
$$T(t) = T_c - (T_c - T_0) \\cdot e^{-kt}$$
Bestimmen Sie die Zeit $t$, bei der das Objekt $T = 80°$ erreicht.

[STEP]
**Schritt 1: Konstante $k$ bestimmen**

Einsetzen von $T(10) = 50$, $T_c = 100$, $T_0 = 20$:

$$50 = 100 - (100 - 20) \\cdot e^{-10k}$$
$$50 = 100 - 80 \\cdot e^{-10k}$$
$$80 \\cdot e^{-10k} = 50$$
$$e^{-10k} = \\frac{5}{8}$$
$$-10k = \\ln\\left(\\frac{5}{8}\\right)$$
$$k = \\frac{\\ln(8/5)}{10}$$

[STEP]
**Schritt 2: Zeit $t$ für $T = 80°$ berechnen**

$$80 = 100 - 80 \\cdot e^{-kt}$$
$$80 \\cdot e^{-kt} = 20$$
$$e^{-kt} = \\frac{1}{4}$$
$$-kt = \\ln\\left(\\frac{1}{4}\\right) = -\\ln(4)$$
$$t = \\frac{\\ln(4)}{k} = \\frac{\\ln(4)}{\\frac{\\ln(8/5)}{10}} = \\frac{10 \\ln(4)}{\\ln(8/5)}$$

[STEP]
**Schritt 3: Numerischer Wert**

$$t = \\frac{10 \\cdot 1{,}3863}{0{,}4700} \\approx 29{,}5 \\text{ Minuten}$$

[RESULT]
$$t = \\frac{10 \\ln(4)}{\\ln(8/5)} \\approx 29{,}5 \\text{ Minuten}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole das **Newtonsche Abkühlungsgesetz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240206-2",
    title: "Tangentengleichung Kurvenfahrt",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 06.02.2024",
    content: `## Aufgabe 2 — Tangentengleichung Kurvenfahrt

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Kettenregel, Tangentengleichung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Ein Fahrzeug fährt auf der Kurve $f(x) = \\frac{x}{\\sqrt{1 + x^2/3}}$. Es verliert die Seitenführung und fährt ab einem Punkt geradlinig bis zum Punkt $(-9, 0)$. Bestimmen Sie den Berührungspunkt auf der Kurve und die Tangentengleichung.

[STEP]
**Schritt 1: Ableitung bestimmen**

$f(x) = x \\cdot (1 + x^2/3)^{-1/2}$ — Produkt- und Kettenregel:

$$f'(x) = (1 + x^2/3)^{-1/2} + x \\cdot \\left(-\\frac{1}{2}\\right)(1 + x^2/3)^{-3/2} \\cdot \\frac{2x}{3}$$

$$f'(x) = (1 + x^2/3)^{-1/2} - \\frac{x^2}{3}(1 + x^2/3)^{-3/2}$$

$$f'(x) = (1 + x^2/3)^{-3/2} \\left[(1 + x^2/3) - \\frac{x^2}{3}\\right] = (1 + x^2/3)^{-3/2}$$

[STEP]
**Schritt 2: Tangentenbedingung aufstellen**

Die Tangente im Punkt $(a, f(a))$ mit Steigung $f'(a)$ muss durch $(-9, 0)$ gehen:

$$0 = f'(a) \\cdot (-9 - a) + f(a)$$
$$f(a) = f'(a) \\cdot (a + 9)$$

Einsetzen:

$$\\frac{a}{\\sqrt{1 + a^2/3}} = \\frac{a + 9}{(1 + a^2/3)^{3/2}}$$

Multiplikation mit $(1 + a^2/3)^{3/2}$:

$$a(1 + a^2/3) = a + 9$$
$$a + \\frac{a^3}{3} = a + 9$$
$$\\frac{a^3}{3} = 9 \\implies a^3 = 27 \\implies a = 3$$

[STEP]
**Schritt 3: Punkt und Steigung berechnen**

$$f(3) = \\frac{3}{\\sqrt{1 + 3}} = \\frac{3}{2}$$

$$f'(3) = (1 + 3)^{-3/2} = 4^{-3/2} = \\frac{1}{8}$$

Berührungspunkt: $(3, \\frac{3}{2})$, Steigung: $m = \\frac{1}{8}$

[STEP]
**Schritt 4: Tangentengleichung**

$$y = \\frac{1}{8}(x - 3) + \\frac{3}{2} = \\frac{1}{8}x - \\frac{3}{8} + \\frac{12}{8} = \\frac{1}{8}x + \\frac{9}{8}$$

Probe: $y(-9) = \\frac{-9}{8} + \\frac{9}{8} = 0$ ✓

[RESULT]
Berührungspunkt: $(3, \\frac{3}{2})$. Tangentengleichung: $y = \\frac{1}{8}x + \\frac{9}{8}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Kettenregel und Tangentengleichung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240206-3",
    title: "Mittelwertsatz-Ungleichung",
    duration: "5 min",
    type: "text",
    group: "📝 Klausur 06.02.2024",
    content: `## Aufgabe 3 — Mittelwertsatz-Ungleichung

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Mittelwertsatz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeigen Sie mit dem Mittelwertsatz: Für alle $a, b \\in \\mathbb{R}$ gilt
$$|\\sin(b) - \\sin(a)| \\leq |b - a|$$

[STEP]
**Schritt 1: Mittelwertsatz anwenden**

Sei $f(x) = \\sin(x)$. Die Funktion $f$ ist auf $[a, b]$ (bzw. $[b, a]$) stetig und differenzierbar. Nach dem Mittelwertsatz existiert ein $c$ zwischen $a$ und $b$ mit:

$$f(b) - f(a) = f'(c) \\cdot (b - a)$$
$$\\sin(b) - \\sin(a) = \\cos(c) \\cdot (b - a)$$

[STEP]
**Schritt 2: Betrag bilden**

$$|\\sin(b) - \\sin(a)| = |\\cos(c)| \\cdot |b - a|$$

Da $|\\cos(c)| \\leq 1$ für alle $c \\in \\mathbb{R}$:

$$|\\sin(b) - \\sin(a)| \\leq 1 \\cdot |b - a| = |b - a|$$

[RESULT]
$|\\sin(b) - \\sin(a)| \\leq |b - a|$ für alle $a, b \\in \\mathbb{R}$ (Q.E.D.)
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole den **Mittelwertsatz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240206-4",
    title: "Extrema e^(-x²+1) + x²",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 06.02.2024",
    content: `## Aufgabe 4 — Extrema

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Ableitung, Extremwertklassifikation

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei $f(x) = e^{-x^2+1} + x^2$ auf dem Intervall $[-2, 2]$.
(i) Bestimmen Sie alle lokalen Extrema.
(ii) Bestimmen Sie das globale Maximum und Minimum auf $[-2, 2]$.

[STEP]
**Schritt 1: Erste Ableitung**

$$f'(x) = -2x \\cdot e^{-x^2+1} + 2x = 2x(1 - e^{1-x^2})$$

[STEP]
**Schritt 2: Kritische Stellen**

$f'(x) = 0$:

- **Fall 1:** $2x = 0 \Rightarrow x = 0$
- **Fall 2:** $1 - e^{1-x^2} = 0 \Rightarrow e^{1-x^2} = 1 \Rightarrow 1 - x^2 = 0 \Rightarrow x = \\pm 1$

Kritische Stellen: $x = -1, 0, 1$

[STEP]
**Schritt 3: Zweite Ableitung — Klassifikation bei $x = 0$**

$$f''(x) = 2(1 - e^{1-x^2}) + 2x \\cdot 2x \\cdot e^{1-x^2} = 2(1 - e^{1-x^2}) + 4x^2 e^{1-x^2}$$

$$f''(0) = 2(1 - e) + 0 = 2(1 - e) < 0$$

→ $x = 0$ ist ein **lokales Maximum**: $f(0) = e^1 + 0 = e$

[STEP]
**Schritt 4: Klassifikation bei $x = \\pm 1$**

An den Stellen $x = \\pm 1$ gilt $e^{1-x^2} = 1$, also:

$$f'(x) = 2x(1 - 1) = 0$$

Vorzeichenwechsel von $f'$: Für $x$ knapp außerhalb von $\\pm 1$ wird $e^{1-x^2} < 1$, also $f'(x)$ hat das Vorzeichen von $2x$.

- Bei $x = -1$: $f'$ wechselt von negativ (links) nach positiv (rechts) → **lokales Minimum**
- Bei $x = 1$: $f'$ wechselt von negativ (links) nach positiv (rechts) → **lokales Minimum**

$$f(\\pm 1) = e^0 + 1 = 2$$

[STEP]
**Schritt 5: Funktionswerte an den Rändern**

$$f(\\pm 2) = e^{-4+1} + 4 = e^{-3} + 4 \\approx 0{,}0498 + 4 = 4{,}0498$$

[STEP]
**Schritt 6: Globaler Vergleich**

| $x$ | $f(x)$ |
|---|---|
| $-2$ | $e^{-3} + 4 \\approx 4{,}05$ |
| $-1$ | $2$ |
| $0$ | $e \\approx 2{,}72$ |
| $1$ | $2$ |
| $2$ | $e^{-3} + 4 \\approx 4{,}05$ |

[RESULT]
- **Lokales Maximum:** $f(0) = e$ bei $x = 0$
- **Lokale Minima:** $f(\\pm 1) = 2$ bei $x = \\pm 1$
- **Globales Maximum:** $f(\\pm 2) = e^{-3} + 4$ bei $x = \\pm 2$
- **Globales Minimum:** $f(\\pm 1) = 2$ bei $x = \\pm 1$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Extremwertklassifikation** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240206-5",
    title: "Bestimmtes Integral — Partielle Integration",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 06.02.2024",
    content: `## Aufgabe 5 — Bestimmtes Integral

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Uneigentliches Integral, Partielle Integration

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechnen Sie das (uneigentliche) Integral:
$$\\int_0^1 x \\cdot \\ln(x) \\, dx$$

Hinweis: $\\ln(0) = -\\infty$, das Integral ist uneigentlich.

[STEP]
**Schritt 1: Partielle Integration**

$u = \\ln(x) \\Rightarrow du = \\frac{1}{x}dx$

$dv = x \\, dx \\Rightarrow v = \\frac{x^2}{2}$

$$\\int_0^1 x \\ln(x) \\, dx = \\left[\\frac{x^2}{2} \\ln(x)\\right]_0^1 - \\int_0^1 \\frac{x^2}{2} \\cdot \\frac{1}{x} \\, dx$$

$$= \\left[\\frac{x^2}{2} \\ln(x)\\right]_0^1 - \\int_0^1 \\frac{x}{2} \\, dx$$

[STEP]
**Schritt 2: Randterm auswerten**

Oberer Rand ($x = 1$):
$$\\frac{1}{2} \\cdot \\ln(1) = 0$$

Unterer Rand ($x \\to 0^+$):
$$\\lim_{x \\to 0^+} \\frac{x^2}{2} \\ln(x) = \\lim_{x \\to 0^+} \\frac{\\ln(x)}{2/x^2} \\overset{\\text{L'Hôpital}}{=} \\lim_{x \\to 0^+} \\frac{1/x}{-4/x^3} = \\lim_{x \\to 0^+} \\frac{-x^2}{4} = 0$$

[STEP]
**Schritt 3: Verbleibendes Integral**

$$- \\int_0^1 \\frac{x}{2} \\, dx = -\\left[\\frac{x^2}{4}\\right]_0^1 = -\\frac{1}{4}$$

[RESULT]
$$\\int_0^1 x \\ln(x) \\, dx = -\\frac{1}{4}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Partielle Integration und Grenzwerte** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240206-6",
    title: "Rationale Stammfunktion",
    duration: "25 min",
    type: "text",
    group: "📝 Klausur 06.02.2024",
    content: `## Aufgabe 6 — Rationale Stammfunktion

> **📋 25 Punkte** | ⏱ 25 min | 🔑 Polynomdivision & Partialbruchzerlegung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie eine Stammfunktion von:
$$\\int \\frac{4x^5}{x^4 - 1} \\, dx$$

[STEP]
**Schritt 1: Polynomdivision**

Grad des Zählers (5) > Grad des Nenners (4) → Polynomdivision nötig:

$$\\frac{4x^5}{x^4 - 1} = 4x + \\frac{4x}{x^4 - 1}$$

Probe: $4x(x^4 - 1) + 4x = 4x^5 - 4x + 4x = 4x^5$ ✓

[STEP]
**Schritt 2: Nenner faktorisieren**

$$x^4 - 1 = (x^2 - 1)(x^2 + 1) = (x - 1)(x + 1)(x^2 + 1)$$

[STEP]
**Schritt 3: Partialbruchzerlegung**

$$\\frac{4x}{(x-1)(x+1)(x^2+1)} = \\frac{A}{x-1} + \\frac{B}{x+1} + \\frac{Cx + D}{x^2 + 1}$$

Multiplikation mit dem Nenner:

$$4x = A(x+1)(x^2+1) + B(x-1)(x^2+1) + (Cx+D)(x^2-1)$$

**Koeffizientenvergleich:**

$x^3$: $A + B + C = 0$
$x^2$: $A - B + D = 0$
$x^1$: $A + B - C = 4$
$x^0$: $A - B - D = 0$

[STEP]
**Schritt 4: Gleichungssystem lösen**

Aus (1) und (3): $(A+B+C) + (A+B-C) = 0 + 4 \Rightarrow 2A + 2B = 4 \Rightarrow A + B = 2$

Aus (1): $C = -(A+B) = -2$

Aus (2) und (4): $(A-B+D) + (A-B-D) = 0 \Rightarrow 2(A-B) = 0 \Rightarrow A = B$

Also: $A = B = 1$, $C = -2$, $D = 0$

$$\\frac{4x}{x^4-1} = \\frac{1}{x-1} + \\frac{1}{x+1} - \\frac{2x}{x^2+1}$$

[STEP]
**Schritt 5: Integration**

$$\\int \\frac{4x^5}{x^4-1} \\, dx = \\int 4x \\, dx + \\int \\frac{1}{x-1} \\, dx + \\int \\frac{1}{x+1} \\, dx - \\int \\frac{2x}{x^2+1} \\, dx$$

$$= 2x^2 + \\ln|x-1| + \\ln|x+1| - \\ln(x^2+1) + c$$

[RESULT]
$$\\int \\frac{4x^5}{x^4-1} \\, dx = 2x^2 + \\ln|x-1| + \\ln|x+1| - \\ln(x^2+1) + c$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Polynomdivision & Partialbruchzerlegung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
