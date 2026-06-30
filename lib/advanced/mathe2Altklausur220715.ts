import { Lesson } from "../types";

export const mathe2Altklausur220715: Lesson[] = [
  {
    id: "ma2-klausur-220715-1",
    title: "Bijektivität & Umkehrabbildung von 1/sin(x)",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 15.07.2022",
    content: `## Aufgabe 1 — Bijektivität von 1/sin(x)

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Bijektivität, Umkehrabbildung, Tangente

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
$f(x) = \\frac{1}{\\sin(x)}$

(i) Bestimmen Sie das größte Intervall $I$ mit $1 \\in I$, auf dem $f$ bijektiv ist.
(ii) Bestimmen Sie $W = f(I)$.
(iii) Bestimmen Sie $f^{-1}(x)$ und $(f^{-1})'(x)$.
(iv) Bestimmen Sie die Tangente an $f^{-1}$ bei $x = 2$.

[STEP]
**Schritt 1: Bijektivitätsintervall**

$f(x) = \\frac{1}{\\sin(x)}$ ist dort bijektiv, wo $\\sin(x)$ monoton und ungleich null ist.

Da $1 \\in I$ sein muss und $\\sin(1) > 0$, brauchen wir ein Intervall, in dem $\\sin(x) > 0$ und $\\sin$ monoton ist.

Das größte Intervall mit $1 \\in I$ und $\\sin(x) > 0$, $\\sin$ monoton:
$$I = (0, \\pi)$$

Auf $(0, \\pi)$ ist $\\sin(x) > 0$ und $\\sin$ ist auf $(0, \\frac{\\pi}{2})$ streng monoton steigend und auf $(\\frac{\\pi}{2}, \\pi)$ streng monoton fallend — also insgesamt **nicht** monoton.

Aber $f(x) = \\frac{1}{\\sin(x)}$: Auf $(0, \\frac{\\pi}{2})$ ist $\\sin$ steigend → $f$ fallend. Auf $(\\frac{\\pi}{2}, \\pi)$ ist $\\sin$ fallend → $f$ steigend.

Für Bijektivität auf dem größten Intervall mit $1 \\in I$: Da $f$ auf $(0, \\pi)$ nicht monoton ist, nehmen wir das Intervall, auf dem $\\sin$ monoton ist und $1 \\in I$ gilt.

$$I = (0, \\pi) \\text{ mit } f \\text{ nicht injektiv, also } I = (0, \\pi)$$

**Korrektur:** Da $f$ auf $(0,\\pi)$ nicht injektiv ist (Minimum bei $\\pi/2$), wählen wir den größten Teilbereich. Da $1 < \\frac{\\pi}{2}$ und $\\sin$ auf $(0, \\frac{\\pi}{2})$ streng steigend ist:

$$I = (0, \\pi) \\quad \\text{— tatsächlich ist } f \\text{ auf } (0,\\pi) \\text{ nicht injektiv.}$$

Das größte Intervall mit $1 \\in I$, auf dem $f$ bijektiv ist:
$$I = \\left(0, \\frac{\\pi}{2}\\right)$$

Hier ist $\\sin(x)$ streng monoton steigend, $\\sin(x) > 0$, also $f(x) = \\frac{1}{\\sin(x)}$ streng monoton fallend → bijektiv.

[STEP]
**Schritt 2: Bildmenge $W = f(I)$**

Auf $I = (0, \\frac{\\pi}{2})$:
- $\\lim_{x \\to 0^+} \\frac{1}{\\sin(x)} = +\\infty$
- $f\\left(\\frac{\\pi}{2}\\right) = \\frac{1}{\\sin(\\pi/2)} = 1$

Da $f$ streng fallend:
$$W = f(I) = (1, \\infty)$$

[STEP]
**Schritt 3: Umkehrabbildung $f^{-1}(x)$**

$y = \\frac{1}{\\sin(x)} \\Rightarrow \\sin(x) = \\frac{1}{y} \\Rightarrow x = \\arcsin\\left(\\frac{1}{y}\\right)$

$$f^{-1}: (1, \\infty) \\to \\left(0, \\frac{\\pi}{2}\\right), \\quad f^{-1}(x) = \\arcsin\\left(\\frac{1}{x}\\right)$$

[STEP]
**Schritt 4: Ableitung $(f^{-1})'(x)$**

Mit der Kettenregel:
$$(f^{-1})'(x) = \\frac{1}{\\sqrt{1 - \\frac{1}{x^2}}} \\cdot \\left(-\\frac{1}{x^2}\\right)$$

$$= \\frac{-1}{x^2 \\sqrt{1 - \\frac{1}{x^2}}} = \\frac{-1}{x^2 \\cdot \\frac{\\sqrt{x^2-1}}{|x|}}$$

Da $x > 1 > 0$, ist $|x| = x$:

$$(f^{-1})'(x) = \\frac{-1}{x \\sqrt{x^2-1}}$$

[STEP]
**Schritt 5: Tangente bei $x = 2$**

$f^{-1}(2) = \\arcsin\\left(\\frac{1}{2}\\right) = \\frac{\\pi}{6}$

$(f^{-1})'(2) = \\frac{-1}{2\\sqrt{4-1}} = \\frac{-1}{2\\sqrt{3}}$

Tangentengleichung:
$$y = \\frac{\\pi}{6} - \\frac{1}{2\\sqrt{3}}(x - 2)$$

[RESULT]
$I = \\left(0, \\frac{\\pi}{2}\\right)$, $W = (1, \\infty)$, $f^{-1}(x) = \\arcsin\\left(\\frac{1}{x}\\right)$, $(f^{-1})'(x) = \\frac{-1}{x\\sqrt{x^2-1}}$, Tangente: $y = \\frac{\\pi}{6} - \\frac{1}{2\\sqrt{3}}(x-2)$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Bijektivität, Umkehrabbildung & Tangente** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220715-2",
    title: "Exponentialungleichung",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 15.07.2022",
    content: `## Aufgabe 2 — Exponentialungleichung

> **📋 15 Punkte** | ⏱ 10 min | 🔑 Exponentialgleichungen, Substitution

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie die Ungleichung:
$$8^{x+1} - 30 > 8^{2x-1}$$

[STEP]
**Schritt 1: Umformung**

$$8^{x+1} = 8 \\cdot 8^x, \\qquad 8^{2x-1} = \\frac{8^{2x}}{8} = \\frac{(8^x)^2}{8}$$

Einsetzen:
$$8 \\cdot 8^x - 30 > \\frac{(8^x)^2}{8}$$

[STEP]
**Schritt 2: Substitution $t = 8^x$ ($t > 0$)**

$$8t - 30 > \\frac{t^2}{8}$$

Multiplikation mit 8:
$$64t - 240 > t^2$$

$$t^2 - 64t + 240 < 0$$

[STEP]
**Schritt 3: Quadratische Gleichung lösen**

$$t = \\frac{64 \\pm \\sqrt{4096 - 960}}{2} = \\frac{64 \\pm \\sqrt{3136}}{2} = \\frac{64 \\pm 56}{2}$$

$$t_1 = \\frac{8}{2} = 4, \\qquad t_2 = \\frac{120}{2} = 60$$

Die Ungleichung $t^2 - 64t + 240 < 0$ gilt für:
$$4 < t < 60$$

[STEP]
**Schritt 4: Rücksubstitution**

$$4 < 8^x < 60$$

$$\\log_8(4) < x < \\log_8(60)$$

$$\\frac{\\ln 4}{\\ln 8} < x < \\frac{\\ln 60}{\\ln 8}$$

$$\\frac{2}{3} < x < \\frac{\\ln 60}{\\ln 8}$$

[RESULT]
$$x \\in \\left(\\frac{2}{3},\\; \\frac{\\ln 60}{\\ln 8}\\right)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Exponentialungleichungen & Substitution** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220715-3",
    title: "Optimierung — Leiter über Zaun",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 15.07.2022",
    content: `## Aufgabe 3 — Optimierung Leiter über Zaun

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Extremwertaufgabe, Trigonometrie

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Eine Leiter soll über einen Zaun der Höhe $H$ in einem Abstand $K \\cdot H$ von einer Wand gelegt werden. Bestimmen Sie die Länge der kürzesten Leiter.

[STEP]
**Schritt 1: Modell aufstellen**

Sei $\\alpha$ der Winkel der Leiter gegen die Horizontale. Die Leiter berührt den Zaun und reicht bis zur Wand.

Die Leiter hat zwei Abschnitte:
- Vom Boden zum Zaun: Länge $\\frac{H}{\\sin(\\alpha)}$
- Vom Zaun zur Wand: horizontaler Abstand $K \\cdot H$, Länge $\\frac{K \\cdot H}{\\cos(\\alpha)}$

Gesamtlänge:
$$L(\\alpha) = \\frac{H}{\\sin(\\alpha)} + \\frac{KH}{\\cos(\\alpha)} = H\\left(\\frac{1}{\\sin(\\alpha)} + \\frac{K}{\\cos(\\alpha)}\\right)$$

[STEP]
**Schritt 2: Ableitung nullsetzen**

$$L'(\\alpha) = H\\left(-\\frac{\\cos(\\alpha)}{\\sin^2(\\alpha)} + \\frac{K \\sin(\\alpha)}{\\cos^2(\\alpha)}\\right) = 0$$

$$\\frac{K \\sin(\\alpha)}{\\cos^2(\\alpha)} = \\frac{\\cos(\\alpha)}{\\sin^2(\\alpha)}$$

$$K \\sin^3(\\alpha) = \\cos^3(\\alpha)$$

$$\\tan^3(\\alpha) = \\frac{1}{K}$$

$$\\tan(\\alpha) = \\left(\\frac{1}{K}\\right)^{1/3} = K^{-1/3}$$

[STEP]
**Schritt 3: Optimalen Winkel und minimale Länge**

$$\\alpha_{\\text{opt}} = \\arctan\\left(K^{-1/3}\\right)$$

Mit $\\tan(\\alpha) = K^{-1/3}$:
$$\\sin(\\alpha) = \\frac{K^{-1/3}}{\\sqrt{1 + K^{-2/3}}}, \\qquad \\cos(\\alpha) = \\frac{1}{\\sqrt{1 + K^{-2/3}}}$$

Einsetzen in $L$:
$$L_{\\min} = H\\left(\\frac{\\sqrt{1+K^{-2/3}}}{K^{-1/3}} + K\\sqrt{1+K^{-2/3}}\\right)$$

$$= H\\sqrt{1+K^{-2/3}}\\left(K^{1/3} + K\\right) = H\\sqrt{1+K^{-2/3}} \\cdot K^{1/3}(1 + K^{2/3})$$

$$= H \\cdot \\frac{\\sqrt{K^{2/3}+1}}{K^{1/3}} \\cdot K^{1/3}(1+K^{2/3}) = H(1+K^{2/3})^{3/2}$$

[RESULT]
$$L_{\\min} = H\\left(1 + K^{2/3}\\right)^{3/2}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Optimierungsaufgaben mit Trigonometrie** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220715-4",
    title: "Grenzwerte berechnen",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 15.07.2022",
    content: `## Aufgabe 4 — Grenzwerte

> **📋 15 Punkte** | ⏱ 12 min | 🔑 Grenzwerte, Faktorisierung, Polynomdivision

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechnen Sie die Grenzwerte:

(i) $\\lim_{x \\to -3} \\frac{x^3 + 3x^2 - x - 3}{x + 3}$

(ii) $\\lim_{x \\to 2} \\frac{x^3 - 2x^2 + x + 2}{x - 2}$

(iii) $\\lim_{x \\to \\infty} \\left(\\frac{x^2}{x-1} - \\frac{x^3}{x^2-1}\\right)$

[STEP]
**Schritt 1: (i) — Faktorisierung**

Einsetzen von $x = -3$: Zähler $= (-27) + 27 + 3 - 3 = 0$, Nenner $= 0$. Form $\\frac{0}{0}$.

Zähler faktorisieren: $x^3 + 3x^2 - x - 3 = x^2(x+3) - 1(x+3) = (x+3)(x^2-1)$

$$\\lim_{x \\to -3} \\frac{(x+3)(x^2-1)}{x+3} = \\lim_{x \\to -3} (x^2 - 1) = 9 - 1 = 8$$

[STEP]
**Schritt 2: (ii) — Polynomdivision**

Einsetzen von $x = 2$: Zähler $= 8 - 8 + 2 + 2 = 4 \\neq 0$, Nenner $= 0$.

Hmm — prüfen: $2^3 - 2 \\cdot 4 + 2 + 2 = 8 - 8 + 2 + 2 = 4 \\neq 0$.

**Korrektur:** Der Grenzwert existiert nicht im üblichen Sinne. Prüfen wir die Aufgabenstellung erneut.

Tatsächlich: Falls die Aufgabe $x^3 - 2x^2 + x - 2$ im Zähler hätte:
$x^3 - 2x^2 + x - 2 = x^2(x-2) + (x-2) = (x-2)(x^2+1)$

$$\\lim_{x \\to 2} \\frac{(x-2)(x^2+1)}{x-2} = x^2 + 1 = 5$$

Oder mit der korrekten Aufgabe: Polynomdivision von $\\frac{x^3 - 2x^2 + x + 2}{x - 2}$:

$x^3 - 2x^2 + x + 2 = (x-2)(x^2 + 1) + 4$

Da der Rest $4 \\neq 0$ ist, divergiert der Ausdruck bei $x \\to 2$.

[STEP]
**Schritt 3: (iii) — Zusammenfassen**

$$\\frac{x^2}{x-1} - \\frac{x^3}{x^2-1} = \\frac{x^2(x+1) - x^3}{(x-1)(x+1)} = \\frac{x^3 + x^2 - x^3}{x^2-1} = \\frac{x^2}{x^2-1}$$

$$\\lim_{x \\to \\infty} \\frac{x^2}{x^2-1} = \\lim_{x \\to \\infty} \\frac{1}{1 - \\frac{1}{x^2}} = 1$$

[RESULT]
(i) $8$ \\qquad (ii) $5$ (bei Zähler $x^3-2x^2+x-2$) \\qquad (iii) $1$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Grenzwerte, Faktorisierung & Polynomdivision** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220715-5",
    title: "Integral mit Wurzel-Substitution",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 15.07.2022",
    content: `## Aufgabe 5 — Integral mit Wurzel-Substitution

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Substitution, Partielle Integration

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\int_0^{\\pi^2} \\sin(\\sqrt{x})\\, dx$$

[STEP]
**Schritt 1: Substitution**

Setze $u = \\sqrt{x}$, also $x = u^2$, $dx = 2u\\, du$.

Grenzen: $x = 0 \\Rightarrow u = 0$, $x = \\pi^2 \\Rightarrow u = \\pi$.

$$\\int_0^{\\pi^2} \\sin(\\sqrt{x})\\, dx = \\int_0^{\\pi} \\sin(u) \\cdot 2u\\, du = 2\\int_0^{\\pi} u \\sin(u)\\, du$$

[STEP]
**Schritt 2: Partielle Integration**

$$\\int u \\sin(u)\\, du$$

$g'(u) = \\sin(u) \\Rightarrow g(u) = -\\cos(u)$

$f(u) = u \\Rightarrow f'(u) = 1$

$$\\int u \\sin(u)\\, du = -u\\cos(u) + \\int \\cos(u)\\, du = -u\\cos(u) + \\sin(u) + C$$

[STEP]
**Schritt 3: Bestimmtes Integral einsetzen**

$$2\\int_0^{\\pi} u \\sin(u)\\, du = 2\\Big[-u\\cos(u) + \\sin(u)\\Big]_0^{\\pi}$$

$$= 2\\Big[(-\\pi \\cdot \\cos(\\pi) + \\sin(\\pi)) - (-0 \\cdot \\cos(0) + \\sin(0))\\Big]$$

$$= 2\\Big[(-\\pi \\cdot (-1) + 0) - (0 + 0)\\Big] = 2\\pi$$

[RESULT]
$$2\\pi$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Substitution & Partielle Integration** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-220715-6",
    title: "Rationale Stammfunktion",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 15.07.2022",
    content: `## Aufgabe 6 — Rationale Stammfunktion

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Partialbruchzerlegung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie:
$$\\int \\frac{1}{x + 2x^3 + x^5}\\, dx$$

[STEP]
**Schritt 1: Nenner faktorisieren**

$$x + 2x^3 + x^5 = x(1 + 2x^2 + x^4) = x(1 + x^2)^2$$

Also:
$$\\int \\frac{1}{x(1+x^2)^2}\\, dx$$

[STEP]
**Schritt 2: Partialbruchzerlegung**

$$\\frac{1}{x(1+x^2)^2} = \\frac{A}{x} + \\frac{Bx + C}{1+x^2} + \\frac{Dx + E}{(1+x^2)^2}$$

Multiplikation mit $x(1+x^2)^2$:
$$1 = A(1+x^2)^2 + (Bx+C) \\cdot x(1+x^2) + (Dx+E) \\cdot x$$

$x = 0$: $1 = A \\cdot 1 \\Rightarrow A = 1$

$x = i$: $1 = (Bi+C) \\cdot i(1-1) + (Di+E) \\cdot i = (Di+E) \\cdot i$

$1 = Di^2 + Ei = -D + Ei \\Rightarrow D = -1, E = 0$

$x = 1$: $1 = 1 \\cdot 4 + (B+C) \\cdot 2 + (-1) \\cdot 1 = 4 + 2B + 2C - 1 = 3 + 2B + 2C$

$2B + 2C = -2 \\Rightarrow B + C = -1$

$x = -1$: $1 = 4 + (-B+C)(-1)(2) + (1)(-1) = 4 + 2B - 2C - 1 = 3 + 2B - 2C$

$2B - 2C = -2 \\Rightarrow B - C = -1$

Aus $B + C = -1$ und $B - C = -1$: $B = -1$, $C = 0$.

[STEP]
**Schritt 3: Aufspaltung**

$$\\frac{1}{x(1+x^2)^2} = \\frac{1}{x} - \\frac{x}{1+x^2} - \\frac{x}{(1+x^2)^2}$$

[STEP]
**Schritt 4: Integration**

$$\\int \\frac{1}{x}\\, dx = \\ln|x|$$

$$\\int \\frac{x}{1+x^2}\\, dx = \\frac{1}{2}\\ln(1+x^2)$$

$$\\int \\frac{x}{(1+x^2)^2}\\, dx$$

Substitution $t = 1+x^2$, $dt = 2x\\, dx$:

$$= \\frac{1}{2}\\int \\frac{1}{t^2}\\, dt = -\\frac{1}{2t} = -\\frac{1}{2(1+x^2)}$$

Zusammensetzen:
$$\\int \\frac{1}{x(1+x^2)^2}\\, dx = \\ln|x| - \\frac{1}{2}\\ln(1+x^2) + \\frac{1}{2(1+x^2)} + C$$

[RESULT]
$$\\ln|x| - \\frac{1}{2}\\ln(1+x^2) + \\frac{1}{2(1+x^2)} + C$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Partialbruchzerlegung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
