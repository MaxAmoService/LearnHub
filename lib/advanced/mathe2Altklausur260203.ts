import { Lesson } from "../types";

export const mathe2Altklausur260203: Lesson[] = [
  {
    id: "ma2-klausur-260203-1",
    title: "Logarithmusungleichung",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 03.02.2026",
    content: `## Aufgabe 1 — Logarithmusungleichung

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Substitution, quadratische Ungleichung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie die Ungleichung, wobei $\\lg = \\log_{10}$:
$$\\lg^2(x) + \\lg(x^2) < 3$$

[STEP]
**Schritt 1: Logarithmusgesetze anwenden**

Mit $\\lg(x^2) = 2\\lg(x)$ wird die Ungleichung:
$$\\lg^2(x) + 2\\lg(x) < 3$$

[STEP]
**Schritt 2: Substitution $y = \\lg(x)$**

$$y^2 + 2y < 3$$
$$y^2 + 2y - 3 < 0$$

[STEP]
**Schritt 3: Quadratische Gleichung lösen**

$$y^2 + 2y - 3 = (y+3)(y-1) = 0$$

Die Nullstellen sind $y_1 = -3$ und $y_2 = 1$.

Da der Leitkoeffizient positiv ist, ist die Parabel nach oben geöffnet. Die Ungleichung $(y+3)(y-1) < 0$ gilt zwischen den Nullstellen:
$$-3 < y < 1$$

[STEP]
**Schritt 4: Rücksubstitution $y = \\lg(x)$**

$$-3 < \\lg(x) < 1$$

$$10^{-3} < x < 10^1$$

$$\\frac{1}{1000} < x < 10$$

[RESULT]
$$x \\in \\left(\\frac{1}{1000},\\; 10\\right)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Substitution bei Logarithmusungleichungen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-260203-2",
    title: "Tangentengleichung mit Kettenregel",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.02.2026",
    content: `## Aufgabe 2 — Tangentengleichung mit Kettenregel

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Kettenregel, Tangentengleichung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei $f(x) = \\sin(\\sin(\\sin(2x))) + \\cos(x)$.

Bestimmen Sie die Tangentengleichung an $f$ bei $x = \\pi$.

[STEP]
**Schritt 1: Funktionswert $f(\\pi)$ berechnen**

$$f(\\pi) = \\sin(\\sin(\\sin(2\\pi))) + \\cos(\\pi)$$

Da $\\sin(2\\pi) = 0$:
$$= \\sin(\\sin(0)) + (-1) = \\sin(0) - 1 = 0 - 1 = -1$$

$$f(\\pi) = -1$$

[STEP]
**Schritt 2: Ableitung mit Kettenregel**

Für $g(x) = \\sin(\\sin(\\sin(2x)))$ wenden wir die Kettenregel dreifach an:

$$g'(x) = \\cos(\\sin(\\sin(2x))) \\cdot \\cos(\\sin(2x)) \\cdot \\cos(2x) \\cdot 2$$

Für $h(x) = \\cos(x)$ gilt $h'(x) = -\\sin(x)$.

Also:
$$f'(x) = 2\\cos(\\sin(\\sin(2x))) \\cdot \\cos(\\sin(2x)) \\cdot \\cos(2x) - \\sin(x)$$

[STEP]
**Schritt 3: Ableitung bei $x = \\pi$**

$$f'(\\pi) = 2\\cos(\\underbrace{\\sin(\\sin(2\\pi))}_{= \\sin(0) = 0}) \\cdot \\cos(\\underbrace{\\sin(2\\pi)}_{= 0}) \\cdot \\cos(2\\pi) - \\sin(\\pi)$$

$$= 2\\cos(0) \\cdot \\cos(0) \\cdot 1 - 0 = 2 \\cdot 1 \\cdot 1 \\cdot 1 = 2$$

[STEP]
**Schritt 4: Tangentengleichung aufstellen**

Mit $f(\\pi) = -1$ und $f'(\\pi) = 2$:

$$y = f(\\pi) + f'(\\pi)(x - \\pi) = -1 + 2(x - \\pi)$$

[RESULT]
$$y = -1 + 2(x - \\pi)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Kettenregel bei verketteten trigonometrischen Funktionen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-260203-3",
    title: "Optimierung — Kegeltüte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.02.2026",
    content: `## Aufgabe 3 — Optimierung Kegeltüte

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Extremwertaufgabe, Geometrie

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Aus einem Kreis mit Radius $R$ wird ein Kreissektor mit Öffnungswinkel $\\theta$ ausgeschnitten. Aus dem verbleibenden Restkreis wird ein Kegel ohne Boden gefaltet.

Bestimmen Sie den Winkel $\\theta$, sodass das Kegelvolumen maximal wird.

[STEP]
**Schritt 1: Geometrie des Kegels aufstellen**

Der verbleibende Bogen hat Länge $(2\\pi - \\theta)R$. Dies wird zum Umfang der Kegelbasis:
$$2\\pi r = (2\\pi - \\theta)R \\quad \\Rightarrow \\quad r = \\frac{(2\\pi - \\theta)R}{2\\pi}$$

Die Mantellänge des Kegels ist $R$, also gilt:
$$h = \\sqrt{R^2 - r^2}$$

Zur Vereinfachung setzen wir $\\alpha = \\pi - \\frac{\\theta}{2}$ als halben Restwinkel. Dann:
$$r = R\\cos(\\alpha), \\quad h = R\\sin(\\alpha)$$

[STEP]
**Schritt 2: Volumenfunktion aufstellen**

$$V = \\frac{1}{3}\\pi r^2 h = \\frac{\\pi R^3}{3}\\cos^2(\\alpha)\\sin(\\alpha)$$

[STEP]
**Schritt 3: Ableitung nullsetzen**

$$V'(\\alpha) \\propto \\frac{d}{d\\alpha}\\left[\\cos^2(\\alpha)\\sin(\\alpha)\\right]$$

$$= 2\\cos(\\alpha)(-\\sin(\\alpha))\\sin(\\alpha) + \\cos^2(\\alpha)\\cos(\\alpha)$$

$$= \\cos(\\alpha)\\left[-2\\sin^2(\\alpha) + \\cos^2(\\alpha)\\right]$$

$V'(\\alpha) = 0$ ergibt:
- $\\cos(\\alpha) = 0 \\Rightarrow \\alpha = \\frac{\\pi}{2}$ (Randminimum, $V = 0$)
- $\\cos^2(\\alpha) = 2\\sin^2(\\alpha) \\Rightarrow \\tan^2(\\alpha) = 2$

$$\\alpha = \\arctan(\\sqrt{2})$$

[STEP]
**Schritt 4: Optimalen Winkel $\\theta$ bestimmen**

$$\\alpha = \\arctan(\\sqrt{2}) \\approx 54{,}74°$$

$$\\theta = 2\\pi - 2\\alpha = 2\\pi - 2\\arctan(\\sqrt{2})$$

[STEP]
**Schritt 5: Maximalvolumen berechnen**

Mit $\\tan(\\alpha) = \\sqrt{2}$ folgt $\\sin(\\alpha) = \\frac{\\sqrt{2}}{\\sqrt{3}}$ und $\\cos(\\alpha) = \\frac{1}{\\sqrt{3}}$:

$$V_{\\max} = \\frac{\\pi R^3}{3} \\cdot \\frac{1}{3} \\cdot \\frac{\\sqrt{2}}{\\sqrt{3}} = \\frac{\\pi R^3 \\sqrt{2}}{9\\sqrt{3}} = \\frac{\\pi R^3 \\sqrt{6}}{27}$$

[RESULT]
$$\\theta = 2\\pi - 2\\arctan(\\sqrt{2}), \\quad V_{\\max} = \\frac{\\pi R^3 \\sqrt{6}}{27}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Optimierungsaufgaben mit Geometrie** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-260203-4",
    title: "Stetige Fortsetzung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.02.2026",
    content: `## Aufgabe 4 — Stetige Fortsetzung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Grenzwerte, L'Hôpital, Stetigkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$f(x) = \\frac{1}{\\ln(x)} - \\frac{1}{x - 1} \\quad \\text{für } x \\in (0, \\infty) \\setminus \\{1\\}$$

(a) Untersuchen Sie, ob $f$ an den Stellen $x = 0$ und $x = 1$ stetig fortsetzbar ist.
(b) Falls ja, bestimmen Sie die Funktionswerte.

[STEP]
**Schritt 1: Verhalten bei $x = 0$ (von rechts)**

$$\\lim_{x \\to 0^+} f(x) = \\lim_{x \\to 0^+} \\frac{1}{\\ln(x)} - \\lim_{x \\to 0^+} \\frac{1}{x-1}$$

Für $x \\to 0^+$ gilt $\\ln(x) \\to -\\infty$, also $\\frac{1}{\\ln(x)} \\to 0$.

$$\\frac{1}{0-1} = -1$$

$$\\lim_{x \\to 0^+} f(x) = 0 - (-1) = 1$$

$\\boxed{f(0) = 1}$ macht $f$ bei $x = 0$ (von rechts) stetig fortsetzbar.

[STEP]
**Schritt 2: Verhalten bei $x = 1$**

Setzen wir $x = 1 + t$ mit $t \\to 0$:

$$f(1+t) = \\frac{1}{\\ln(1+t)} - \\frac{1}{t}$$

Taylor-Entwicklung von $\\ln(1+t)$ für $t \\to 0$:
$$\\ln(1+t) = t - \\frac{t^2}{2} + O(t^3)$$

$$\\frac{1}{\\ln(1+t)} = \\frac{1}{t - \\frac{t^2}{2} + O(t^3)} = \\frac{1}{t} \\cdot \\frac{1}{1 - \\frac{t}{2} + O(t^2)}$$

$$= \\frac{1}{t}\\left(1 + \\frac{t}{2} + O(t^2)\\right) = \\frac{1}{t} + \\frac{1}{2} + O(t)$$

Also:
$$f(1+t) = \\frac{1}{t} + \\frac{1}{2} - \\frac{1}{t} + O(t) = \\frac{1}{2} + O(t)$$

$$\\lim_{x \\to 1} f(x) = \\frac{1}{2}$$

$\\boxed{f(1) = \\frac{1}{2}}$ macht $f$ bei $x = 1$ stetig fortsetzbar.

[STEP]
**Schritt 3: Alternative Berechnung bei $x = 1$ mit L'Hôpital**

$$\\lim_{x \\to 1} \\left(\\frac{1}{\\ln(x)} - \\frac{1}{x-1}\\right) = \\lim_{x \\to 1} \\frac{x - 1 - \\ln(x)}{(x-1)\\ln(x)}$$

Form $\\frac{0}{0}$. L'Hôpital:

$$= \\lim_{x \\to 1} \\frac{1 - \\frac{1}{x}}{\\ln(x) + \\frac{x-1}{x}} = \\lim_{x \\to 1} \\frac{\\frac{x-1}{x}}{\\ln(x) + 1 - \\frac{1}{x}}$$

Erneut $\\frac{0}{0}$. L'Hôpital:

$$= \\lim_{x \\to 1} \\frac{\\frac{1}{x^2}}{\\frac{1}{x} + \\frac{1}{x^2}} = \\frac{1}{1+1} = \\frac{1}{2}$$

[RESULT]
$x = 0$: $f(0) = 1$ \\qquad $x = 1$: $f(1) = \\frac{1}{2}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **stetige Fortsetzung mit Taylor-Entwicklung und L'Hôpital** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-260203-5",
    title: "Integral mit Substitution",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 03.02.2026",
    content: `## Aufgabe 5 — Integral mit Substitution

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Substitution, uneigentliche Integrale

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie die Stammfunktion sowie die bestimmten Integrale:

(i) $\\displaystyle\\int \\frac{1}{x(\\ln(x) - 1)}\\, dx$

(ii) $\\displaystyle\\int_1^{\\sqrt{e}} \\frac{1}{x(\\ln(x) - 1)}\\, dx$

(iii) $\\displaystyle\\int_1^{e^2} \\frac{1}{x(\\ln(x) - 1)}\\, dx$

[STEP]
**Schritt 1: Stammfunktion bestimmen**

Substitution: $u = \\ln(x) - 1$, dann $du = \\frac{1}{x}\\, dx$.

$$\\int \\frac{1}{x(\\ln(x) - 1)}\\, dx = \\int \\frac{1}{u}\\, du = \\ln|u| + C = \\ln|\\ln(x) - 1| + C$$

[STEP]
**Schritt 2: Bestimmtes Integral (ii) — Intervall $[1, \\sqrt{e}]$**

$$\\int_1^{\\sqrt{e}} \\frac{1}{x(\\ln(x) - 1)}\\, dx = \\Big[\\ln|\\ln(x) - 1|\\Big]_1^{\\sqrt{e}}$$

Untere Grenze $x = 1$: $\\ln(1) - 1 = -1$, also $\\ln|-1| = \\ln(1) = 0$.

Obere Grenze $x = \\sqrt{e}$: $\\ln(\\sqrt{e}) - 1 = \\frac{1}{2} - 1 = -\\frac{1}{2}$, also $\\ln\\left|{-\\frac{1}{2}}\\right| = \\ln\\left(\\frac{1}{2}\\right) = -\\ln(2)$.

Das Intervall $[1, \\sqrt{e}]$ liegt innerhalb von $[1, e)$, also gilt $\\ln(x) - 1 < 0$ — keine Singularität.

$$\\int_1^{\\sqrt{e}} = -\\ln(2) - 0 = -\\ln(2)$$

[STEP]
**Schritt 3: Bestimmtes Integral (iii) — Intervall $[1, e^2]$**

Die Stammfunktion $\\ln|\\ln(x) - 1|$ hat eine Singularität bei $\\ln(x) = 1$, also $x = e$.

Da $e \\in [1, e^2]$, ist dies ein **uneigentliches Integral**:

$$\\int_1^{e^2} = \\lim_{\\varepsilon \\to 0^+} \\left(\\int_1^{e-\\varepsilon} + \\int_{e+\\varepsilon}^{e^2}\\right)$$

**Links:**
$$\\lim_{x \\to e^-} \\ln|\\ln(x)-1| = \\lim_{t \\to 0^+} \\ln(t) = -\\infty$$

**Rechts:**
$$\\lim_{x \\to e^+} \\ln|\\ln(x)-1| = -\\infty$$

Beide Teile divergieren.

[RESULT]
(i) $\\ln|\\ln(x) - 1| + C$ \\qquad (ii) $-\\ln(2)$ \\qquad (iii) divergiert
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Substitution und uneigentliche Integrale** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-260203-6",
    title: "Rationale Stammfunktion",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 03.02.2026",
    content: `## Aufgabe 6 — Rationale Stammfunktion

> **📋 25 Punkte** | ⏱ 20 min | 🔑 Polynomdivision & Partialbruchzerlegung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\int \\frac{x^4 - 2x^3 - 2x^2 + 5x + 5}{x^3 - 3x^2 + 4}\\, dx$$

[STEP]
**Schritt 1: Nenner faktorisieren**

$x = 2$ ist Nullstelle: $8 - 12 + 4 = 0$ ✓

$$x^3 - 3x^2 + 4 = (x-2)(x^2 - x - 2) = (x-2)(x-2)(x+1) = (x-2)^2(x+1)$$

[STEP]
**Schritt 2: Polynomdivision**

$$\\frac{x^4 - 2x^3 - 2x^2 + 5x + 5}{x^3 - 3x^2 + 4}$$

Division: $x^4 \\div x^3 = x$.

$x \\cdot (x^3 - 3x^2 + 4) = x^4 - 3x^3 + 4x$

Rest: $(x^4 - 2x^3 - 2x^2 + 5x + 5) - (x^4 - 3x^3 + 4x) = x^3 - 2x^2 + x + 5$

Division: $x^3 \\div x^3 = 1$.

$1 \\cdot (x^3 - 3x^2 + 4) = x^3 - 3x^2 + 4$

Rest: $(x^3 - 2x^2 + x + 5) - (x^3 - 3x^2 + 4) = x^2 + x + 1$

$$\\frac{x^4 - 2x^3 - 2x^2 + 5x + 5}{x^3 - 3x^2 + 4} = x + 1 + \\frac{x^2 + x + 1}{(x-2)^2(x+1)}$$

[STEP]
**Schritt 3: Partialbruchzerlegung**

$$\\frac{x^2 + x + 1}{(x-2)^2(x+1)} = \\frac{A}{x-2} + \\frac{B}{(x-2)^2} + \\frac{C}{x+1}$$

Multiplikation mit $(x-2)^2(x+1)$:
$$x^2 + x + 1 = A(x-2)(x+1) + B(x+1) + C(x-2)^2$$

$x = 2$: $4 + 2 + 1 = 3B \\Rightarrow B = \\frac{7}{3}$

Hmm, prüfen wir das: $2^2 + 2 + 1 = 7$, $B \\cdot 3 = 7$, $B = 7/3$. Hmm, das gibt Brüche. Lassen Sie mich die Division nochmal prüfen.

**Neuberechnung der Division:**

$x^4 - 2x^3 - 2x^2 + 5x + 5$ durch $x^3 - 3x^2 + 4$

Schritt 1: $x^4 / x^3 = x$. Multiplikation: $x^4 - 3x^3 + 4x$.

Subtraktion: $(x^4 - 2x^3 - 2x^2 + 5x + 5) - (x^4 - 3x^3 + 4x) = x^3 - 2x^2 + x + 5$

Schritt 2: $x^3 / x^3 = 1$. Multiplikation: $x^3 - 3x^2 + 4$.

Subtraktion: $(x^3 - 2x^2 + x + 5) - (x^3 - 3x^2 + 4) = x^2 + x + 1$

Korrekt. Also Rest $= x^2 + x + 1$.

**Koeffizientenvergleich für Partialbrüche:**

$$x^2 + x + 1 = A(x-2)(x+1) + B(x+1) + C(x-2)^2$$

$x = 2$: $7 = 3B \\Rightarrow B = \\frac{7}{3}$

$x = -1$: $1 = 9C \\Rightarrow C = \\frac{1}{9}$

$x = 0$: $1 = -2A + B + 4C = -2A + \\frac{7}{3} + \\frac{4}{9} = -2A + \\frac{25}{9}$

$-2A = 1 - \\frac{25}{9} = -\\frac{16}{9} \\Rightarrow A = \\frac{8}{9}$

[STEP]
**Schritt 4: Integration der Partialbrüche**

$$\\int \\frac{8/9}{x-2}\\, dx = \\frac{8}{9}\\ln|x-2|$$

$$\\int \\frac{7/3}{(x-2)^2}\\, dx = -\\frac{7}{3(x-2)}$$

$$\\int \\frac{1/9}{x+1}\\, dx = \\frac{1}{9}\\ln|x+1|$$

[STEP]
**Schritt 5: Gesamtergebnis zusammensetzen**

$$\\int \\left(x + 1 + \\frac{8/9}{x-2} + \\frac{7/3}{(x-2)^2} + \\frac{1/9}{x+1}\\right) dx$$

$$= \\frac{x^2}{2} + x + \\frac{8}{9}\\ln|x-2| - \\frac{7}{3(x-2)} + \\frac{1}{9}\\ln|x+1| + C$$

[STEP]
**Schritt 6: Probe durch Ableitung**

$$\\frac{d}{dx}\\left[\\frac{x^2}{2} + x\\right] = x + 1$$

$$\\frac{d}{dx}\\left[\\frac{8}{9}\\ln|x-2|\\right] = \\frac{8}{9(x-2)}$$

$$\\frac{d}{dx}\\left[-\\frac{7}{3(x-2)}\\right] = \\frac{7}{3(x-2)^2}$$

$$\\frac{d}{dx}\\left[\\frac{1}{9}\\ln|x+1|\\right] = \\frac{1}{9(x+1)}$$

Summe der gebrochen-rationalen Teile:
$$\\frac{8}{9(x-2)} + \\frac{7}{3(x-2)^2} + \\frac{1}{9(x+1)}$$

$$= \\frac{8(x-2)(x+1) + 21(x+1) + (x-2)^2}{9(x-2)^2(x+1)}$$

Zähler ausmultiplizieren: $8(x^2-x-2) + 21(x+1) + (x^2-4x+4)$

$= 8x^2 - 8x - 16 + 21x + 21 + x^2 - 4x + 4 = 9x^2 + 9x + 9$

$$= \\frac{9(x^2+x+1)}{9(x-2)^2(x+1)} = \\frac{x^2+x+1}{(x-2)^2(x+1)}$$

Rückgabe zu Division: $x + 1 + \\frac{x^2+x+1}{(x-2)^2(x+1)} = \\frac{x^4-2x^3-2x^2+5x+5}{x^3-3x^2+4}$ ✓

[RESULT]
$$\\frac{x^2}{2} + x + \\frac{8}{9}\\ln|x-2| - \\frac{7}{3(x-2)} + \\frac{1}{9}\\ln|x+1| + C$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Polynomdivision & Partialbruchzerlegung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
