import { Lesson } from "../types";

export const mathe2Altklausur210417: Lesson[] = [
  {
    id: "ma2-klausur-210417-1",
    title: "Einschaltvorgang RL-Stromkreis",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 17.04.2021",
    content: `## Aufgabe 1 — Einschaltvorgang

> **📋 10 Punkte** | ⏱ 8 min | 🔑 Exponentialfunktion & Logarithmus

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bei einem Einschaltvorgang in einem Stromkreis mit Widerstand $R$, Induktivität $L$ und Spannung $U$ gilt:
$$i(t) = \\frac{U}{R}\\left(1 - e^{-\\frac{R}{L}t}\\right) \\quad (t \\geq 0)$$
Nach welcher Zeit beträgt die Stromstärke $\\frac{1}{4}$ der maximalen Stromstärke?

[STEP]
**Schritt 1: Maximale Stromstärke bestimmen**

Für $t \\to \\infty$ gilt $e^{-\\frac{R}{L}t} \\to 0$, also:
$$i_{\\max} = \\frac{U}{R}$$

Gesucht: $t$ mit $i(t) = \\frac{1}{4} \\cdot \\frac{U}{R}$

[STEP]
**Schritt 2: Gleichung aufstellen**

$$\\frac{U}{R}\\left(1 - e^{-\\frac{R}{L}t}\\right) = \\frac{1}{4} \\cdot \\frac{U}{R}$$

Division durch $\\frac{U}{R}$:
$$1 - e^{-\\frac{R}{L}t} = \\frac{1}{4}$$

[STEP]
**Schritt 3: Nach $t$ auflösen**

$$e^{-\\frac{R}{L}t} = \\frac{3}{4}$$

Logarithmieren:
$$-\\frac{R}{L}t = \\ln\\left(\\frac{3}{4}\\right)$$

$$t = -\\frac{L}{R} \\ln\\left(\\frac{3}{4}\\right) = \\frac{L}{R} \\ln\\left(\\frac{4}{3}\\right)$$

[RESULT]
$$t = \\frac{L}{R} \\ln\\left(\\frac{4}{3}\\right)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Exponentialfunktion & Logarithmus** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-210417-2",
    title: "Definitionsbereich & stetige Fortsetzung",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 17.04.2021",
    content: `## Aufgabe 2 — Definitionsbereich

> **📋 25 Punkte** | ⏱ 20 min | 🔑 Stetigkeit & rationale Funktionen

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie den größtmöglichen Definitionsbereich $D \\subseteq \\mathbb{R}$ von:
$$f(x) = \\frac{x^4 + 3x^3 + 3x^2 + 3x + 2}{x^4 + 3x^3 - 6x - 4}$$
An welchen nichtdefinierten Stellen ist $f$ stetig fortsetzbar?

[STEP]
**Schritt 1: Nullstellen des Nenners finden**

$p(x) = x^4 + 3x^3 - 6x - 4$

Teste rationale Nullstellen (Lemma von Gauß): $\\pm 1, \\pm 2, \\pm 4$

$p(1) = 1 + 3 - 6 - 4 = -6 \\neq 0$
$p(-1) = 1 - 3 + 6 - 4 = 0$ ✓

Also $(x+1)$ ist ein Faktor. Polynomdivision liefert:
$x^4 + 3x^3 - 6x - 4 = (x+1)(x^3 + 2x^2 - 2x - 4)$

[STEP]
**Schritt 2: Weitere Faktorisierung**

$q(x) = x^3 + 2x^2 - 2x - 4 = x^2(x+2) - 2(x+2) = (x+2)(x^2-2)$

Nenner: $p(x) = (x+1)(x+2)(x^2-2) = (x+1)(x+2)(x-\\sqrt{2})(x+\\sqrt{2})$

Definitionsbereich: $D = \\mathbb{R} \\setminus \\{-2, -1, -\\sqrt{2}, \\sqrt{2}\\}$

[STEP]
**Schritt 3: Zähler faktorisieren**

$z(x) = x^4 + 3x^3 + 3x^2 + 3x + 2$

$z(-1) = 1 - 3 + 3 - 3 + 2 = 0$ ✓

$z(x) = (x+1)(x^3 + 2x^2 + x + 2) = (x+1)(x^2(x+2) + 1(x+2)) = (x+1)(x+2)(x^2+1)$

[STEP]
**Schritt 4: Kürzen und Fortsetzbarkeit prüfen**

$$f(x) = \\frac{(x+1)(x+2)(x^2+1)}{(x+1)(x+2)(x-\\sqrt{2})(x+\\sqrt{2})} = \\frac{x^2+1}{x^2-2}$$

für $x \\neq -2, -1$.

An $x = -1$ und $x = -2$: Kürzbar, stetige Fortsetzbar durch $\\frac{x^2+1}{x^2-2}$.

An $x = \\pm\\sqrt{2}$: Nenner wird 0, Zähler $= 3 \\neq 0$. Polstellen, **nicht** fortsetzbar.

[RESULT]
$$D = \\mathbb{R} \\setminus \\{-2, -1, -\\sqrt{2}, \\sqrt{2}\\}$$
Stetig fortsetzbar an $x = -1$ und $x = -2$, nicht an $x = \\pm\\sqrt{2}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Stetigkeit & rationale Funktionen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-210417-3",
    title: "Globale Extrema mit Betrag",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 17.04.2021",
    content: `## Aufgabe 3 — Extrema mit Betragsfunktion

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Extrema & Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $f: [-1,2] \\to \\mathbb{R}$, $f(x) = x^2 \\cdot |x-1|$.
Geben Sie alle globalen Minimalstellen und globalen Maximalstellen an.

[STEP]
**Schritt 1: Fallunterscheidung nach Betrag**

Für $x \\leq 1$: $f(x) = x^2(1-x) = x^2 - x^3$
Für $x > 1$: $f(x) = x^2(x-1) = x^3 - x^2$

[STEP]
**Schritt 2: Ableitungen und kritische Stellen**

Fall $x < 1$: $f'(x) = 2x - 3x^2 = x(2-3x) = 0 \\Rightarrow x = 0$ oder $x = \\frac{2}{3}$
Fall $x > 1$: $f'(x) = 3x^2 - 2x = x(3x-2) = 0 \\Rightarrow x = 0$ (nicht in Bereich) oder $x = \\frac{2}{3}$ (nicht in Bereich)

Kritische Stellen: $x = 0$, $x = \\frac{2}{3}$, $x = 1$ (Betragsstelle), Randpunkte $x = -1$, $x = 2$

[STEP]
**Schritt 3: Funktionswerte vergleichen**

$f(-1) = 1 \\cdot 2 = 2$
$f(0) = 0$
$f(\\frac{2}{3}) = \\frac{4}{9} \\cdot \\frac{1}{3} = \\frac{4}{27} \\approx 0{,}148$
$f(1) = 0$
$f(2) = 4 \\cdot 1 = 4$

[RESULT]
Globales Minimum: $f(0) = f(1) = 0$
Globales Maximum: $f(2) = 4$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Extrema & Fallunterscheidung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-210417-4",
    title: "Gammafunktion",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 17.04.2021",
    content: `## Aufgabe 4 — Gammafunktion

> **📋 20 Punkte + 25 Bonus** | ⏱ 15 min | 🔑 Partielle Integration & Induktion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Die Gammafunktion sei definiert durch:
$$\\Gamma(x) = \\int_0^\\infty t^x e^{-t} \\, dt$$
Beweisen Sie: $\\Gamma(0) = 1$, $\\Gamma(1) = 1$, $\\Gamma(2) = 2$.
Stellen Sie eine Vermutung für $\\Gamma(n)$ auf und beweisen Sie diese.

[STEP]
**Schritt 1: $\\Gamma(0) = 1$**

$$\\Gamma(0) = \\int_0^\\infty e^{-t} \\, dt = \\left[-e^{-t}\\right]_0^\\infty = 0 - (-1) = 1 \\;\\checkmark$$

[STEP]
**Schritt 2: $\\Gamma(1) = 1$**

$$\\Gamma(1) = \\int_0^\\infty t \\cdot e^{-t} \\, dt$$

Partielle Integration mit $u = t$, $v' = e^{-t}$:
$$= \\left[-t \\cdot e^{-t}\\right]_0^\\infty + \\int_0^\\infty e^{-t} \\, dt = 0 + 1 = 1 \\;\\checkmark$$

[STEP]
**Schritt 3: $\\Gamma(2) = 2$**

$$\\Gamma(2) = \\int_0^\\infty t^2 e^{-t} \\, dt$$

Partielle Integration mit $u = t^2$, $v' = e^{-t}$:
$$= \\left[-t^2 e^{-t}\\right]_0^\\infty + 2\\int_0^\\infty t \\cdot e^{-t} \\, dt = 0 + 2 \\cdot \\Gamma(1) = 2 \\;\\checkmark$$

[STEP]
**Schritt 4: Vermutung und Induktionsbeweis**

Vermutung: $\\Gamma(n) = (n-1)!$ für $n \\in \\mathbb{N}$.

Induktionsschritt: Partielle Integration von $\\Gamma(n+1) = \\int_0^\\infty t^n e^{-t} dt$ mit $u = t^n$, $v' = e^{-t}$:
$$\\Gamma(n+1) = \\left[-t^n e^{-t}\\right]_0^\\infty + n \\int_0^\\infty t^{n-1} e^{-t} dt = n \\cdot \\Gamma(n) = n \\cdot (n-1)! = n!$$

[RESULT]
$$\\Gamma(n) = (n-1)! \\quad \\text{für } n \\in \\mathbb{N}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Partielle Integration & Induktion** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-210417-5",
    title: "Weierstraß-Substitution",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 17.04.2021",
    content: `## Aufgabe 5 — Weierstraß-Substitution

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Halbwinkelmethode

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Geben Sie mit der Substitution $t = \\tan\\left(\\frac{x}{2}\\right)$ eine Stammfunktion von:
$$f(x) = \\frac{2}{1 - \\cos^2(x)} \\quad \\text{auf } (0, \\pi)$$
an.

[STEP]
**Schritt 1: Vereinfachung**

$1 - \\cos^2(x) = \\sin^2(x)$, also $f(x) = \\frac{2}{\\sin^2(x)}$

[STEP]
**Schritt 2: Weierstraß-Substitution anwenden**

Mit $t = \\tan\\left(\\frac{x}{2}\\right)$ gilt:
$$\\sin(x) = \\frac{2t}{1+t^2}, \\quad dx = \\frac{2}{1+t^2} dt$$

$$\\sin^2(x) = \\frac{4t^2}{(1+t^2)^2}$$

[STEP]
**Schritt 3: Integral umformen**

$$\\int \\frac{2}{\\sin^2(x)} dx = \\int \\frac{2(1+t^2)^2}{4t^2} \\cdot \\frac{2}{1+t^2} dt = \\int \\frac{1+t^2}{t^2} dt = \\int \\left(\\frac{1}{t^2} + 1\\right) dt$$

$$= -\\frac{1}{t} + t + c = t - \\frac{1}{t} + c$$

[STEP]
**Schritt 4: Rücksubstitution**

$$= \\tan\\left(\\frac{x}{2}\\right) - \\frac{1}{\\tan\\left(\\frac{x}{2}\\right)} + c = \\tan\\left(\\frac{x}{2}\\right) - \\cot\\left(\\frac{x}{2}\\right) + c$$

Probe: $\\frac{d}{dx}\\left[-2\\cot(x)\\right] = \\frac{2}{\\sin^2(x)}$ ✓ (vereinfachte Form)

[RESULT]
$$F(x) = -2\\cot(x) + c$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Halbwinkelmethode** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-210417-6",
    title: "Stammfunktion — Definition",
    duration: "8 min",
    type: "text",
    group: "📝 Klausur 17.04.2021",
    content: `## Aufgabe 6 — Stammfunktion

> **📋 10 Punkte** | ⏱ 8 min | 🔑 Stammfunktion & Potenzregel

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Definieren Sie den Begriff „Stammfunktion" und geben Sie die Menge aller Stammfunktionen von $f(x) = x^{42}$ auf $(0,1) \\cup (2,3)$ an.

[STEP]
**Schritt 1: Definition**

Eine differenzierbare Funktion $F: I \\to \\mathbb{R}$ heißt **Stammfunktion** von $f: I \\to \\mathbb{R}$, falls $F'(x) = f(x)$ für alle $x \\in I$ gilt.

Die Menge aller Stammfunktionen wird als **unbestimmtes Integral** bezeichnet:
$$\\int f(x) \\, dx = F(x) + c$$

[STEP]
**Schritt 2: Stammfunktion bestimmen**

Mit der Potenzregel $\\int x^n dx = \\frac{x^{n+1}}{n+1} + c$ für $n \\neq -1$:

$$\\int x^{42} \\, dx = \\frac{x^{43}}{43} + c$$

[RESULT]
$$\\int x^{42} \\, dx = \\frac{x^{43}}{43} + c, \\quad c \\in \\mathbb{R}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Stammfunktion & Potenzregel** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
