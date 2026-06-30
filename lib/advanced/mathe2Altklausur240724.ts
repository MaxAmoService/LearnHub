import { Lesson } from "../types";

export const mathe2Altklausur240724: Lesson[] = [
  {
    id: "ma2-klausur-240724-1",
    title: "Existenz und Eindeutigkeit",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.07.2024",
    content: `## Aufgabe 1 — Existenz und Eindeutigkeit

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Monotonie, Bijektivität, Zwischenwertsatz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zeigen Sie, dass die Gleichung
$$C \\cdot e^x = 1 + x + \\frac{x^2}{2}$$
für jedes $C > 0$ genau eine reelle Lösung besitzt.

**Tipp:** Betrachten Sie $g(x) = (1 + x + \\frac{x^2}{2}) \\cdot e^{-x}$.

[STEP]
**Schritt 1: Hilfsfunktion definieren**

Umgestellt ergibt sich:
$$C = \\left(1 + x + \\frac{x^2}{2}\\right) e^{-x} =: g(x)$$

Wir müssen zeigen, dass $g: \\mathbb{R} \\to (0, \\infty)$ bijektiv ist, d.h. für jedes $C > 0$ existiert genau ein $x$ mit $g(x) = C$.

[STEP]
**Schritt 2: Ableitung berechnen**

$$g'(x) = \\left(1 + x\\right) e^{-x} - \\left(1 + x + \\frac{x^2}{2}\\right) e^{-x}$$

$$g'(x) = e^{-x}\\left(1 + x - 1 - x - \\frac{x^2}{2}\\right) = -\\frac{x^2}{2} e^{-x}$$

Da $e^{-x} > 0$ und $x^2 \\geq 0$ für alle $x$, gilt $g'(x) \\leq 0$ mit $g'(x) = 0$ nur für $x = 0$.

Also ist $g$ **strikt monoton fallend** auf $\\mathbb{R} \\setminus \\{0\\}$ und insgesamt monoton fallend.

[STEP]
**Schritt 3: Grenzwerte bestimmen**

$$\\lim_{x \\to -\\infty} g(x) = \\lim_{x \\to -\\infty} \\left(1 + x + \\frac{x^2}{2}\\right) e^{-x} = +\\infty$$

(Der Term $\\frac{x^2}{2} e^{-x}$ dominiert, da $e^{-x} \\to \\infty$ für $x \\to -\\infty$.)

$$\\lim_{x \\to +\\infty} g(x) = \\lim_{x \\to +\\infty} \\left(1 + x + \\frac{x^2}{2}\\right) e^{-x} = 0$$

(Polynom wird von $e^{-x}$ überwunden, L'Hôpital zweimal anwendbar.)

[STEP]
**Schritt 4: Schlussfolgerung**

$g$ ist stetig und streng monoton fallend mit:
$$g: \\mathbb{R} \\to (0, \\infty)$$

Da $g$ von $+\\infty$ nach $0$ fällt, ist $g$ surjektiv auf $(0, \\infty)$ und damit bijektiv.

Für jedes $C > 0$ existiert daher **genau ein** $x \\in \\mathbb{R}$ mit $g(x) = C$, also genau eine Lösung der Gleichung.

[RESULT]
Die Gleichung $C \\cdot e^x = 1 + x + \\frac{x^2}{2}$ besitzt für jedes $C > 0$ genau eine reelle Lösung, da $g(x) = (1 + x + \\frac{x^2}{2})e^{-x}$ streng monoton fallend von $(0, \\infty)$ nach $(0, \\infty)$ bijektiv ist.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Monotonie, Bijektivität und Grenzwerte** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240724-2",
    title: "Tangentengleichung",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 24.07.2024",
    content: `## Aufgabe 2 — Tangentengleichung

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Quotientenregel, Tangente

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei $f(x) = \\frac{2\\cos(\\pi x) - x^2}{x^2 - 1}$.

Bestimmen Sie die Tangentengleichung an den Graphen von $f$ im Punkt mit $x = 2$.

[STEP]
**Schritt 1: Funktionswert berechnen**

$$f(2) = \\frac{2\\cos(2\\pi) - 4}{4 - 1} = \\frac{2 \\cdot 1 - 4}{3} = \\frac{-2}{3}$$

Der Punkt auf dem Graphen ist $P(2, -\\frac{2}{3})$.

[STEP]
**Schritt 2: Ableitung mit Quotientenregel**

Sei $u(x) = 2\\cos(\\pi x) - x^2$ und $v(x) = x^2 - 1$.

$$u'(x) = -2\\pi\\sin(\\pi x) - 2x$$
$$v'(x) = 2x$$

Quotientenregel:
$$f'(x) = \\frac{u'(x)v(x) - u(x)v'(x)}{[v(x)]^2}$$

$$f'(x) = \\frac{(-2\\pi\\sin(\\pi x) - 2x)(x^2 - 1) - (2\\cos(\\pi x) - x^2)(2x)}{(x^2 - 1)^2}$$

[STEP]
**Schritt 3: Ableitung bei $x = 2$ auswerten**

$$u'(2) = -2\\pi\\sin(2\\pi) - 4 = 0 - 4 = -4$$
$$v(2) = 4 - 1 = 3$$
$$u(2) = 2 - 4 = -2$$
$$v'(2) = 4$$

$$f'(2) = \\frac{(-4)(3) - (-2)(4)}{3^2} = \\frac{-12 + 8}{9} = \\frac{-4}{9}$$

[STEP]
**Schritt 4: Tangentengleichung aufstellen**

$$y = f(2) + f'(2)(x - 2) = -\\frac{2}{3} - \\frac{4}{9}(x - 2)$$

$$y = -\\frac{2}{3} - \\frac{4}{9}x + \\frac{8}{9} = -\\frac{4}{9}x + \\frac{8}{9} - \\frac{6}{9}$$

$$y = -\\frac{4}{9}x + \\frac{2}{9}$$

[RESULT]
$$y = -\\frac{4}{9}x + \\frac{2}{9}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Quotientenregel und Tangentenberechnung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240724-3",
    title: "Optimierung — Kegel in Kugel",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 24.07.2024",
    content: `## Aufgabe 3 — Optimierung Kegel in Kugel

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Extremwertaufgabe, Geometrie

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Ein gerader Kreiskegel soll in eine Kugel vom Radius $R$ so eingeschrieben werden, dass sein Volumen maximal wird.

Bestimmen Sie die Höhe $h$ und den Radius $r$ des Kegels bei maximalem Volumen.

**Formel:** $V_{\\text{Kegel}} = \\frac{1}{3}\\pi r^2 h$

[STEP]
**Schritt 1: Geometrische Beziehung aufstellen**

Der Kegel steht mit seiner Grundfläche auf dem Kugeläquator. Die Spitze berührt den gegenüberliegenden Pol.

Sei $h$ die Höhe des Kegels (Spitze bis Grundfläche). Dann liegt die Grundfläche in der Ebene im Abstand $(h - R)$ vom Kugelmittelpunkt.

Nach dem Satz des Pythagoras im Kugelquerschnitt:
$$r^2 + (h - R)^2 = R^2$$
$$r^2 = R^2 - (h - R)^2 = R^2 - h^2 + 2Rh - R^2 = 2Rh - h^2$$

[STEP]
**Schritt 2: Volumen als Funktion einer Variablen**

$$V(h) = \\frac{1}{3}\\pi r^2 h = \\frac{\\pi}{3}(2Rh - h^2)h = \\frac{\\pi}{3}(2Rh^2 - h^3)$$

Definitionsbereich: $0 < h < 2R$ (Kegel muss in die Kugel passen).

[STEP]
**Schritt 3: Ableitung und Nullstellen**

$$V'(h) = \\frac{\\pi}{3}(4Rh - 3h^2) = \\frac{\\pi h}{3}(4R - 3h)$$

$V'(h) = 0$ liefert $h = 0$ (Rand) oder $h = \\frac{4R}{3}$.

[STEP]
**Schritt 4: Maximum verifizieren**

$$V''(h) = \\frac{\\pi}{3}(4R - 6h)$$

$$V''\\left(\\frac{4R}{3}\\right) = \\frac{\\pi}{3}\\left(4R - 8R\\right) = -\\frac{4\\pi R}{3} < 0$$

Da $V'' < 0$, liegt bei $h = \\frac{4R}{3}$ ein **Maximum** vor.

[STEP]
**Schritt 5: Radius berechnen**

$$r^2 = 2R \\cdot \\frac{4R}{3} - \\left(\\frac{4R}{3}\\right)^2 = \\frac{8R^2}{3} - \\frac{16R^2}{9} = \\frac{24R^2 - 16R^2}{9} = \\frac{8R^2}{9}$$

$$r = \\frac{2\\sqrt{2}}{3}R$$

[STEP]
**Schritt 6: Maximales Volumen**

$$V_{\\max} = \\frac{\\pi}{3} \\cdot \\frac{8R^2}{9} \\cdot \\frac{4R}{3} = \\frac{32\\pi R^3}{81}$$

[RESULT]
$$h = \\frac{4R}{3}, \\quad r = \\frac{2\\sqrt{2}}{3}R, \\quad V_{\\max} = \\frac{32\\pi R^3}{81}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Extremwertaufgaben mit Nebenbedingungen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240724-4",
    title: "Grenzwerte",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.07.2024",
    content: `## Aufgabe 4 — Grenzwerte

> **📋 15 Punkte** | ⏱ 15 min | 🔑 L'Hôpital, Grenzwertbestimmung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechnen Sie, falls möglich:

(a) $\\displaystyle\\lim_{x \\to 0} \\frac{xe^{2x} - x}{x^2 - x^3}$

(b) $\\displaystyle\\lim_{x \\to 1^+} \\frac{xe^{2x} - x}{x^2 - x^3}$

[STEP]
**Schritt 1: Aufgabe (a) — Ausklammern**

$$\\lim_{x \\to 0} \\frac{x(e^{2x} - 1)}{x^2(1 - x)} = \\lim_{x \\to 0} \\frac{e^{2x} - 1}{x(1 - x)}$$

Nenner: $x(1 - x) \\to 0$ für $x \\to 0$. Zähler: $e^{2x} - 1 \\to 0$.

Form "$\\frac{0}{0}$" — L'Hôpital anwendbar.

[STEP]
**Schritt 2: L'Hôpital auf (a)**

$$\\lim_{x \\to 0} \\frac{2e^{2x}}{1 - 2x} = \\frac{2 \\cdot 1}{1 - 0} = 2$$

[STEP]
**Schritt 3: Aufgabe (b) — Verhalten bei $x \\to 1^+$**

Zähler: $1 \\cdot e^2 - 1 = e^2 - 1 > 0$

Nenner: $x^2 - x^3 = x^2(1 - x)$. Für $x \\to 1^+$ gilt $(1 - x) \\to 0^-$, also $x^2(1 - x) \\to 0^+$.

$$\\frac{e^2 - 1}{0^-} \\to -\\infty$$

[RESULT]
(a) $\\displaystyle\\lim_{x \\to 0} \\frac{xe^{2x} - x}{x^2 - x^3} = 2$

(b) $\\displaystyle\\lim_{x \\to 1^+} \\frac{xe^{2x} - x}{x^2 - x^3} = -\\infty$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **L'Hôpital-Regel und einseitige Grenzwerte** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240724-5",
    title: "Uneigentliches Integral",
    duration: "5 min",
    type: "text",
    group: "📝 Klausur 24.07.2024",
    content: `## Aufgabe 5 — Uneigentliches Integral

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Uneigentliche Integrale, Konvergenz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie, ob das folgende uneigentliche Integral konvergiert, und berechnen Sie ggf. den Wert:

$$\\int_{-8}^{0} \\frac{1}{\\sqrt[3]{x^2}} \\, dx$$

[STEP]
**Schritt 1: Singularität identifizieren**

$$\\frac{1}{\\sqrt[3]{x^2}} = \\frac{1}{x^{2/3}} = x^{-2/3}$$

Die Funktion hat bei $x = 0$ eine Singularität (Nenner wird 0).

[STEP]
**Schritt 2: Konvergenz prüfen**

Für $x^{-p}$ mit $0 < p < 1$ auf $[a, 0]$ gilt: Das Integral konvergiert, da $p = \\frac{2}{3} < 1$.

Alternativ: Stammfunktion $\\int x^{-2/3} dx = 3x^{1/3} + C$ — der Exponent $\\frac{1}{3} > 0$, also ist $x^{1/3}$ an der Stelle 0 wohldefiniert.

[STEP]
**Schritt 3: Integral berechnen**

$$\\int_{-8}^{0} x^{-2/3} \\, dx = \\left[3x^{1/3}\\right]_{-8}^{0}$$

$$= 3 \\cdot 0^{1/3} - 3 \\cdot (-8)^{1/3} = 0 - 3 \\cdot (-2) = 6$$

[RESULT]
Das Integral konvergiert und hat den Wert $6$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **uneigentlichen Integrale und Konvergenzkriterien** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma2-klausur-240724-6",
    title: "Rationale Stammfunktion",
    duration: "25 min",
    type: "text",
    group: "📝 Klausur 24.07.2024",
    content: `## Aufgabe 6 — Rationale Stammfunktion

> **📋 25 Punkte** | ⏱ 25 min | 🔑 Partialbruchzerlegung, Polynomdivision

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie eine Stammfunktion von:
$$f(x) = \\frac{x^4 + 1}{x^3 - 4x^2 + 5x - 2}$$

[STEP]
**Schritt 1: Nenner faktorisieren**

$x = 1$ ist eine Nullstelle: $1 - 4 + 5 - 2 = 0$ ✓

Polynomdivision von $x^3 - 4x^2 + 5x - 2$ durch $(x - 1)$:

$$x^3 - 4x^2 + 5x - 2 = (x - 1)(x^2 - 3x + 2) = (x - 1)(x - 1)(x - 2) = (x - 1)^2(x - 2)$$

[STEP]
**Schritt 2: Polynomdivision (Grad Zähler > Grad Nenner)**

Da $\\deg(\\text{Zähler}) = 4 > \\deg(\\text{Nenner}) = 3$, führen wir Polynomdivision durch:

$$\\frac{x^4 + 1}{x^3 - 4x^2 + 5x - 2} = x + 4 + \\frac{11x^2 - 18x + 9}{(x - 1)^2(x - 2)}$$

Kontrolle: $(x + 4)(x^3 - 4x^2 + 5x - 2) = x^4 - 4x^3 + 5x^2 - 2x + 4x^3 - 16x^2 + 20x - 8 = x^4 - 11x^2 + 18x - 8$

$x^4 + 1 - (x^4 - 11x^2 + 18x - 8) = 11x^2 - 18x + 9$ ✓

[STEP]
**Schritt 3: Partialbruchzerlegung**

$$\\frac{11x^2 - 18x + 9}{(x - 1)^2(x - 2)} = \\frac{A}{x - 1} + \\frac{B}{(x - 1)^2} + \\frac{C}{x - 2}$$

Multiplikation mit $(x - 1)^2(x - 2)$:

$$11x^2 - 18x + 9 = A(x - 1)(x - 2) + B(x - 2) + C(x - 1)^2$$

**$x = 1$:** $11 - 18 + 9 = B(1 - 2) \\Rightarrow 2 = -B \\Rightarrow B = -2$

**$x = 2$:** $44 - 36 + 9 = C(1)^2 \\Rightarrow 17 = C$

**$x = 0$:** $9 = A(-1)(-2) + (-2)(-2) + 17(1) = 2A + 4 + 17 \\Rightarrow 2A = -12 \\Rightarrow A = -6$

[STEP]
**Schritt 4: Stammfunktion berechnen**

$$\\int f(x) \\, dx = \\int \\left(x + 4 - \\frac{6}{x - 1} - \\frac{2}{(x - 1)^2} + \\frac{17}{x - 2}\\right) dx$$

$$= \\frac{x^2}{2} + 4x - 6\\ln|x - 1| + \\frac{2}{x - 1} + 17\\ln|x - 2| + C$$

[STEP]
**Schritt 5: Probe (Ableitung)**

$$\\frac{d}{dx}\\left(\\frac{x^2}{2} + 4x - 6\\ln|x - 1| + \\frac{2}{x - 1} + 17\\ln|x - 2|\\right)$$

$$= x + 4 - \\frac{6}{x - 1} - \\frac{2}{(x - 1)^2} + \\frac{17}{x - 2}$$

Zusammenführen über den Nenner $(x - 1)^2(x - 2)$ liefert $\\frac{x^4 + 1}{x^3 - 4x^2 + 5x - 2}$ ✓

[RESULT]
$$\\int \\frac{x^4 + 1}{x^3 - 4x^2 + 5x - 2} \\, dx = \\frac{x^2}{2} + 4x - 6\\ln|x - 1| + \\frac{2}{x - 1} + 17\\ln|x - 2| + C$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Partialbruchzerlegung und Polynomdivision** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
