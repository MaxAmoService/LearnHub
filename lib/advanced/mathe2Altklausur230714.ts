import { Lesson } from "../types";

export const mathe2Altklausur230714: Lesson[] = [
  {
    id: "ma2-klausur-230714-1",
    title: "Surjektivität von sin(x)",
    duration: "5 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 1 — Surjektivität von sin(x)

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Zwischenwertsatz, Surjektivität

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeigen Sie, dass $\\sin: \\mathbb{R} \\to [-1, 1]$ surjektiv ist.

[STEP]
**Schritt 1: Definition Surjektivität**

$\\sin$ ist surjektiv, wenn für jedes $y \\in [-1, 1]$ ein $x \\in \\mathbb{R}$ existiert mit $\\sin(x) = y$.

[STEP]
**Schritt 2: Anwendung des Zwischenwertsatzes**

Sei $y \\in [-1, 1]$ beliebig.

- $\\sin(0) = 0$
- $\\sin\\left(\\frac{\\pi}{2}\\right) = 1$
- $\\sin\\left(-\\frac{\\pi}{2}\\right) = -1$

Fall 1: $y = 0$ → $x = 0$ löst die Gleichung.
Fall 2: $y > 0$ → Da $\\sin(0) = 0 < y \\leq 1 = \\sin\\left(\\frac{\\pi}{2}\\right)$ und $\\sin$ stetig auf $\\left[0, \\frac{\\pi}{2}\\right]$ ist, existiert nach dem **Zwischenwertsatz** ein $x \\in \\left(0, \\frac{\\pi}{2}\\right]$ mit $\\sin(x) = y$.
Fall 3: $y < 0$ → Analog mit $\\sin\\left(-\\frac{\\pi}{2}\\right) = -1 \\leq y < 0 = \\sin(0)$.

[STEP]
**Schritt 3: Konklusion**

Für jedes $y \\in [-1, 1]$ existiert mindestens ein $x \\in \\mathbb{R}$ mit $\\sin(x) = y$.

$$\\Rightarrow \\sin: \\mathbb{R} \\to [-1, 1] \\text{ ist surjektiv.}$$

[RESULT]
$\\sin: \\mathbb{R} \\to [-1, 1]$ ist surjektiv, da der Zwischenwertsatz die Existenz eines Urbilds für jedes $y \\in [-1,1]$ garantiert.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Der Beweis nutzt die Stetigkeit von $\\sin$ und den Zwischenwertsatz. Wiederhole die **Surjektivität und den Zwischenwertsatz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-230714-2",
    title: "Ableitung bei x=0",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 2 — Ableitung bei x=0

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Quotientenregel, Kettenregel, Produktregel

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$f(x) = \\frac{43 - x}{x - 1} + (3x + 1)^{14 + \\sin(42x)}$$
Bestimmen Sie $f'(0)$.

[STEP]
**Schritt 1: Ersten Term ableiten — Quotientenregel**

Sei $h(x) = \\frac{43 - x}{x - 1}$.

$$h'(x) = \\frac{(-1)(x-1) - (43-x)(1)}{(x-1)^2} = \\frac{-x + 1 - 43 + x}{(x-1)^2} = \\frac{-42}{(x-1)^2}$$

$$h'(0) = \\frac{-42}{(0-1)^2} = -42$$

[STEP]
**Schritt 2: Zweiten Term ableiten — Kettenregel + Produktregel**

Sei $g(x) = (3x + 1)^{14 + \\sin(42x)}$.

Schreiben als $g(x) = e^{(14 + \\sin(42x)) \\cdot \\ln(3x+1)}$:

$$g'(x) = (3x+1)^{14+\\sin(42x)} \\cdot \\left[ 42\\cos(42x) \\cdot \\ln(3x+1) + (14 + \\sin(42x)) \\cdot \\frac{3}{3x+1} \\right]$$

An der Stelle $x = 0$:
- $(3 \\cdot 0 + 1)^{14 + \\sin(0)} = 1^{14} = 1$
- $\\ln(3 \\cdot 0 + 1) = \\ln(1) = 0$
- $42\\cos(0) \\cdot 0 = 0$
- $(14 + 0) \\cdot \\frac{3}{1} = 42$

$$g'(0) = 1 \\cdot (0 + 42) = 42$$

[STEP]
**Schritt 3: Ergebnis**

$$f'(0) = h'(0) + g'(0) = -42 + 42 = 0$$

[RESULT]
$$f'(0) = 0$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die Aufgabe kombiniert Quotientenregel und Kettenregel mit Logarithmische Ableitung. Wiederhole die **Ableitungsregeln** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-230714-3",
    title: "Extrema mit e^(-x²)",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 3 — Extrema mit e^(-x²)

> **📋 25 Punkte** | ⏱ 20 min | 🔑 Achsensymmetrie, Extremwerte, Ableitung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$f(x) = x^2 + e^{-x^2} + 1, \\quad x \\in [-2, 2]$$
(i) Zeigen Sie: $f$ ist achsensymmetrisch.
(ii) Bestimmen Sie alle lokalen und globalen Extrema.

[STEP]
**Schritt 1: Achsensymmetrie beweisen**

$$f(-x) = (-x)^2 + e^{-(-x)^2} + 1 = x^2 + e^{-x^2} + 1 = f(x)$$

$\\Rightarrow f$ ist **achsensymmetrisch** (gerade Funktion) bezüglich der y-Achse.

[STEP]
**Schritt 2: Erste Ableitung**

$$f'(x) = 2x + e^{-x^2} \\cdot (-2x) = 2x - 2xe^{-x^2} = 2x(1 - e^{-x^2})$$

$f'(x) = 0$:
- $2x = 0 \\Rightarrow x = 0$
- $1 - e^{-x^2} = 0 \\Rightarrow e^{-x^2} = 1 \\Rightarrow x = 0$

**Einzige kritische Stelle:** $x = 0$.

[STEP]
**Schritt 3: Zweite Ableitung — Klassifikation**

$$f''(x) = 2 - 2e^{-x^2} + 4x^2 e^{-x^2}$$

$$f''(0) = 2 - 2 \\cdot 1 + 0 = 2 > 0$$

$\\Rightarrow x = 0$ ist ein **lokales Minimum**.

[STEP]
**Schritt 4: Funktionswerte bestimmen**

$$f(0) = 0 + e^0 + 1 = 2$$

$$f(\\pm 2) = 4 + e^{-4} + 1 = 5 + e^{-4} \\approx 5{,}018$$

[STEP]
**Schritt 5: Globale Extrema auf $[-2, 2]$**

Da $f'(x) = 2x(1 - e^{-x^2})$ und $1 - e^{-x^2} > 0$ für $x \\neq 0$:
- $f'(x) < 0$ für $x < 0$ → $f$ fallend
- $f'(x) > 0$ für $x > 0$ → $f$ steigend

**Globales Minimum:** $f(0) = 2$
**Globales Maximum:** $f(-2) = f(2) = 5 + e^{-4}$

[RESULT]
Globales Minimum: $f(0) = 2$. Globales Maximum: $f(\\pm 2) = 5 + e^{-4}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die Achsensymmetrie vereinfacht die Analyse erheblich. Wiederhole die **Extremwertbestimmung und Symmetrie** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-230714-4",
    title: "Unbestimmtes Integral",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 4 — Unbestimmtes Integral

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Substitution, Partialbruchzerlegung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\int \\frac{8x^3 - 40x}{9 - 10x^2 + x^4} \\, dx$$

[STEP]
**Schritt 1: Substitution $u = x^2$**

Mit $u = x^2$, $du = 2x \\, dx$:

$$\\int \\frac{8x^3 - 40x}{x^4 - 10x^2 + 9} \\, dx = \\int \\frac{4u - 20}{u^2 - 10u + 9} \\, du$$

[STEP]
**Schritt 2: Nenner faktorisieren**

$$u^2 - 10u + 9 = (u - 1)(u - 9)$$

[STEP]
**Schritt 3: Partialbruchzerlegung**

$$\\frac{4u - 20}{(u-1)(u-9)} = \\frac{A}{u-1} + \\frac{B}{u-9}$$

$4u - 20 = A(u-9) + B(u-1)$

- $u = 1$: $4 - 20 = -8A \\Rightarrow A = 2$
- $u = 9$: $36 - 20 = 8B \\Rightarrow B = 2$

$$\\frac{4u - 20}{(u-1)(u-9)} = \\frac{2}{u-1} + \\frac{2}{u-9}$$

[STEP]
**Schritt 4: Integration und Rücksubstitution**

$$\\int \\left(\\frac{2}{u-1} + \\frac{2}{u-9}\\right) du = 2\\ln|u-1| + 2\\ln|u-9| + c$$

Rücksubstitution $u = x^2$:

$$= 2\\ln|x^2 - 1| + 2\\ln|x^2 - 9| + c$$

[RESULT]
$$\\int \\frac{8x^3 - 40x}{9 - 10x^2 + x^4} \\, dx = 2\\ln|x^2 - 1| + 2\\ln|x^2 - 9| + c$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Substitution $u = x^2$ reduziert das Problem auf eine Partialbruchzerlegung. Wiederhole die **Substitution und Partialbrüche** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-230714-5",
    title: "Grenzwert mit L'Hôpital",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 5 — Grenzwert mit L'Hôpital

> **📋 15 Punkte** | ⏱ 12 min | 🔑 L'Hôpital, Grenzwerte

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\lim_{x \\to 0} \\left( \\frac{1}{x} + \\frac{1}{1 - e^x} \\right)$$

[STEP]
**Schritt 1: Zusammenführen der Brüche**

$$\\frac{1}{x} + \\frac{1}{1 - e^x} = \\frac{1 - e^x + x}{x(1 - e^x)}$$

Für $x \\to 0$: Zähler $\\to 0$, Nenner $\\to 0$ → $\\frac{0}{0}$-Form.

[STEP]
**Schritt 2: Erste Anwendung L'Hôpital**

Zähler': $-e^x + 1$
Nenner': $(1 - e^x) + x \\cdot (-e^x) = 1 - e^x - xe^x$

$$\\lim_{x \\to 0} \\frac{1 - e^x}{1 - e^x - xe^x} = \\frac{0}{0}$$

[STEP]
**Schritt 3: Zweite Anwendung L'Hôpital**

Zähler'': $-e^x$
Nenner'': $-e^x - e^x - xe^x = -2e^x - xe^x = -e^x(2 + x)$

$$\\lim_{x \\to 0} \\frac{-e^x}{-e^x(2 + x)} = \\lim_{x \\to 0} \\frac{1}{2 + x} = \\frac{1}{2}$$

[RESULT]
$$\\lim_{x \\to 0} \\left( \\frac{1}{x} + \\frac{1}{1 - e^x} \\right) = \\frac{1}{2}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Zweimaliges L'Hôpital nach Zusammenführung der Brüche. Wiederhole die **L'Hôpital-Regel** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-230714-6",
    title: "Rotationskörper-Volumen",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 6 — Rotationskörper-Volumen

> **📋 25 Punkte** | ⏱ 20 min | 🔑 Rotationskörper, trigonometrische Integrale

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie das Volumen des Körpers, der durch Rotation des Gebiets unter $f(x) = \\cos(x) + 1$ auf $\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]$ um die x-Achse entsteht.

[STEP]
**Schritt 1: Volumenformel (Scheibenmethode)**

$$V = \\pi \\int_{-\\pi/2}^{\\pi/2} [f(x)]^2 \\, dx = \\pi \\int_{-\\pi/2}^{\\pi/2} (\\cos(x) + 1)^2 \\, dx$$

[STEP]
**Schritt 2: Integrand ausmultiplizieren**

$$(\\cos(x) + 1)^2 = \\cos^2(x) + 2\\cos(x) + 1$$

Mit $\\cos^2(x) = \\frac{1 + \\cos(2x)}{2}$:

$$= \\frac{1}{2} + \\frac{\\cos(2x)}{2} + 2\\cos(x) + 1 = \\frac{3}{2} + \\frac{\\cos(2x)}{2} + 2\\cos(x)$$

[STEP]
**Schritt 3: Integration**

$$\\int_{-\\pi/2}^{\\pi/2} \\left(\\frac{3}{2} + \\frac{\\cos(2x)}{2} + 2\\cos(x)\\right) dx$$

- $\\int_{-\\pi/2}^{\\pi/2} \\frac{3}{2} \\, dx = \\frac{3}{2} \\cdot \\pi = \\frac{3\\pi}{2}$
- $\\int_{-\\pi/2}^{\\pi/2} \\frac{\\cos(2x)}{2} \\, dx = \\left[\\frac{\\sin(2x)}{4}\\right]_{-\\pi/2}^{\\pi/2} = 0$
- $\\int_{-\\pi/2}^{\\pi/2} 2\\cos(x) \\, dx = [2\\sin(x)]_{-\\pi/2}^{\\pi/2} = 2 + 2 = 4$

$$V = \\pi \\left(\\frac{3\\pi}{2} + 0 + 4\\right) = \\frac{3\\pi^2}{2} + 4\\pi$$

[RESULT]
$$V = \\frac{3\\pi^2}{2} + 4\\pi$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Scheibenmethode mit trigonometrischer Identität $\\cos^2(x) = \\frac{1+\\cos(2x)}{2}$. Wiederhole die **Rotationskörper und trigonometrischen Integrale** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-230714-7",
    title: "Mittelwertsatz-Beweis",
    duration: "5 min",
    type: "text",
    group: "📝 Klausur 31.01.2023",
    content: `## Aufgabe 7 — Mittelwertsatz-Beweis

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Mittelwertsatz, Lipschitz-Bedingung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $f: [a, b] \\to \\mathbb{R}$ differenzierbar mit $|f'(x)| \\leq L$ für alle $x \\in (a, b)$.
Zeigen Sie: $|f(b) - f(a)| \\leq L \\cdot |b - a|$.

[STEP]
**Schritt 1: Mittelwertsatz anwenden**

Nach dem **Mittelwertsatz der Differentialrechnung** existiert ein $c \\in (a, b)$ mit:

$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$

[STEP]
**Schritt 2: Betrag bilden und abschätzen**

$$\\left| \\frac{f(b) - f(a)}{b - a} \\right| = |f'(c)| \\leq L$$

Multiplikation mit $|b - a| > 0$:

$$|f(b) - f(a)| \\leq L \\cdot |b - a|$$

[RESULT]
Aus dem Mittelwertsatz folgt direkt $|f(b) - f(a)| \\leq L \\cdot |b - a|$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Ein direkter Anwendungsfall des Mittelwertsatzes. Wiederhole den **Mittelwertsatz und Lipschitz-Bedingung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
