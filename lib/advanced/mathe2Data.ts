// =============================================================================
// Erweitert — Mathematik 2 — Funktionen ()
// Vollständiges Modul: 3 Skripte + 8 Übungsblätter + 8 Altklausuren
// =============================================================================

import { Module } from "../types";
import { createExerciseLessons } from "../lessonHelpers";
import { mathe2AltklausurLessons } from "./mathe2Altklausuren";

export const advMathe2Module: Module = {
  id: "adv-mathe2",
  slug: "adv-mathe2",
  title: "Mathematik 2 — Funktionen",
  description:
    "Mathematik 2 (): Funktionsgraphen, Bijektivität, Stetigkeit, Exponential-/Logarithmusfunktionen, Differenzialrechnung, Extrema, Integralrechnung, Partielle Integration, Substitution, Partialbruchzerlegung. Mit 8 Altklausuren (2021–2026) inkl. ausführlicher Lösungen.",
  icon: "📈",
  color: "#8B5CF6",
  progress: 0,
  category: "advanced",
  lessons: [
    // =========================================================================
    // TEIL 1: FUNKTIONEN (Skript 01)
    // =========================================================================

    // --- Lektion 1: Funktionsgraphen ---
    {
      id: "ma2-01-funktionsgraphen",
      title: "Funktionsgraphen — Klassifizierung & Darstellung",
      duration: "35 min",
      type: "text",
      content: `## Funktionsgraphen

> **📖 Skript 01, Kapitel 2** — 

Für Funktionen $f: D \\to W$ mit $D, W \\subseteq \\mathbb{R}$ kann der Funktionsgraph in der $x$-$y$-Ebene dargestellt werden.

### Klassifizierung von Funktionen

| Typ | Definitionsbereich | Zielmenge | Darstellung |
|---|---|---|---|
| Reell-reell | $D \\subseteq \\mathbb{R}$ | $W \\subseteq \\mathbb{R}$ | Kurve in $\\mathbb{R}^2$ |
| Komplex-reell | $D \\subseteq \\mathbb{C}$ | $W \\subseteq \\mathbb{R}$ | Fläche in $\\mathbb{R}^3$ |
| Reell-komplex | $D \\subseteq \\mathbb{R}$ | $W \\subseteq \\mathbb{C}$ | Kurve in $\\mathbb{R}^3$ |
| Komplex-komplex | $D \\subseteq \\mathbb{C}$ | $W \\subseteq \\mathbb{C}$ | Funktionentheorie |

### Verschiebung eines Funktionsgraphen

**Vertikale Verschiebung** (um $a$ nach oben):
$$(f+a)(x) := f(x) + a$$

**Horizontale Verschiebung** (um $a$ nach rechts):
$$h_a(x) := f(x-a)$$

> **⚠️ Achtung:** Nach rechts um $a$ bedeutet $f(x-a)$, nicht $f(x+a)$!

### Quadratische Funktionen — Scheitelpunktform

Für $f(x) = ax^2 + bx + c$ mit $a \\neq 0$:

$$f(x) = a\\left(x + \\frac{b}{2a}\\right)^2 + c - \\frac{b^2}{4a}$$

Scheitelpunkt: $\\left(-\\frac{b}{2a},\\; c - \\frac{b^2}{4a}\\right)$

Die Konstruktion ausgehend von der Normalparabel $x^2$:
1. Multiplikation mit $a$ (Streckung/Stauchung, ggf. Spiegelung)
2. Verschiebung um $-\\frac{b}{2a}$ parallel zur $x$-Achse
3. Verschiebung um $c - \\frac{b^2}{4a}$ in $y$-Richtung

### Klausur-Tipp

> **💡** Bei der Frage „Für welche $p$ ist $(4-p)x^2 + (2p+2)x - (7p+1)$ für alle $x$ negativ?" gilt: Parabel nach unten geöffnet ($4-p < 0$) UND Scheitelpunkt unterhalb der $x$-Achse!`,
    },

    // --- Lektion 2: Bijektive Abbildungen ---
    {
      id: "ma2-02-bijektivitaet",
      title: "Bijektive Abbildungen & Umkehrfunktionen",
      duration: "30 min",
      type: "text",
      content: `## Bijektive Abbildungen

> **📖 Skript 01, Kapitel 3**

### Bijektivität prüfen

Eine Funktion $f: D \\to W$ ist **bijektiv**, wenn sie injektiv und surjektiv ist.

**Polynomfunktionen vom Grad 1** $f(x) = ax + b$ mit $a \\neq 0$ sind immer bijektiv:
$$f^{-1}(x) = \\frac{x}{a} - \\frac{b}{a}$$

### Umkehrfunktion gewinnen

**Methode:** Gleichung $y = f(x)$ nach $x$ auflösen.

**Beispiel:** $f(x) = \\frac{x^3}{3} + 1$

$y = \\frac{x^3}{3} + 1 \\Rightarrow x^3 = 3(y-1) \\Rightarrow x = \\sqrt[3]{3(y-1)}$

$$f^{-1}(x) = \\sqrt[3]{3(x-1)}$$

### Von beliebiger zu bijektiver Abbildung

**Schritt 1 — Surjektivität erzwingen:** Zielmenge auf Bild einschränken:
$$\\tilde{f}: D \\to f(D), \\quad \\tilde{f}(x) := f(x)$$

**Schritt 2 — Injektivität erzwingen:** Definitionsmenge auf $E \\subseteq D$ einschränken, sodass $f|_E$ injektiv ist.

### Symmetrie von $f$ und $f^{-1}$

Die Funktionsgraphen von $f$ und $f^{-1}$ gehen durch **Spiegelung an der Winkelhalbierenden** $y = x$ ineinander über.

> **🔑 Klausur-Tipp:** Streng monotone Funktionen sind immer injektiv (Satz 5.1)! Das ist die wichtigste hinreichende Bedingung für Injektivität.`,
    },

    // --- Lektion 3: Arithmetische Verknüpfungen ---
    {
      id: "ma2-03-verknuepfungen",
      title: "Arithmetische Verknüpfungen & rationale Funktionen",
      duration: "25 min",
      type: "text",
      content: `## Arithmetische Verknüpfungen

> **📖 Skript 01, Kapitel 4**

### Definitionen

Seien $f, g: D \\to K$ mit $K = \\mathbb{Q}, \\mathbb{R}$ oder $\\mathbb{C}$ und $c \\in K$:

$$(c \\cdot f)(x) := c \\cdot f(x)$$
$$(f + g)(x) := f(x) + g(x)$$
$$(f \\cdot g)(x) := f(x) \\cdot g(x)$$
$$\\frac{f}{g}(x) := \\frac{f(x)}{g(x)} \\quad (g(x) \\neq 0 \\text{ für alle } x \\in D)$$

### Rationale Funktionen

Eine rationale Funktion ist ein Quotient von Polynomen:
$$f(x) = \\frac{a(x)}{b(x)}, \\quad D = K \\setminus \\{x_0 \\mid b(x_0) = 0\\}$$

**Polynomdivision:** Jede rationale Funktion lässt sich als Summe einer Polynomfunktion und einer echt gebrochenrationalen Funktion schreiben:

$$\\frac{a(x)}{b(x)} = q(x) + \\frac{r(x)}{b(x)} \\quad (\\text{grad}(r) < \\text{grad}(b))$$

> **🔑 Klausur-Tipp:** Die Zerlegung in Polynom + echt gebrochenrationaler Anteil ist der erste Schritt bei fast jeder Integrationsaufgabe!`,
    },

    // --- Lektion 4: Monotonie, Symmetrie, Periodizität ---
    {
      id: "ma2-04-monotonie",
      title: "Monotone, gerade, ungerade & periodische Funktionen",
      duration: "30 min",
      type: "text",
      content: `## Monotone Funktionen

> **📖 Skript 01, Kapitel 5**

### Monotonie-Begriffe

| Eigenschaft | Bedingung |
|---|---|
| Monoton wachsend | $x_1 < x_2 \\Rightarrow f(x_1) \\leq f(x_2)$ |
| Streng monoton wachsend | $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$ |
| Monoton fallend | $x_1 < x_2 \\Rightarrow f(x_1) \\geq f(x_2)$ |
| Streng monoton fallend | $x_1 < x_2 \\Rightarrow f(x_1) > f(x_2)$ |

**Satz:** Jede streng monotone Funktion ist **injektiv**.

### Gerade und ungerade Funktionen

| Typ | Bedingung | Symmetrie |
|---|---|---|
| Gerade | $f(-x) = f(x)$ | Achsensymmetrie zur $y$-Achse |
| Ungerade | $f(-x) = -f(x)$ | Punktsymmetrie zum Ursprung |

**Zerlegung:** Jede Funktion lässt sich als Summe einer geraden und einer ungeraden Funktion schreiben:
$$f(x) = \\underbrace{\\frac{f(x) + f(-x)}{2}}_{\\text{gerade}} + \\underbrace{\\frac{f(x) - f(-x)}{2}}_{\\text{ungerade}}$$

### Periodische Funktionen

$f$ ist **periodisch** mit Periode $T$, falls $f(x+T) = f(x)$ für alle $x$.

$\\sin$ und $\\cos$ sind periodisch mit Periode $2\\pi$.
$\\tan$ und $\\cot$ sind periodisch mit Periode $\\pi$.

> **🔑 Klausur-Tipp:** Bei der Frage „Ist $f(x) = \\frac{1}{x}$ monoton?" aufpassen! $f$ ist auf $(-\\infty, 0)$ und auf $(0, \\infty)$ jeweils streng monoton fallend, aber auf $\\mathbb{R} \\setminus \\{0\\}$ nicht monoton!`,
    },

    // --- Lektion 5: Grenzwerte von Funktionen ---
    {
      id: "ma2-05-grenzwerte",
      title: "Grenzwerte von Funktionen",
      duration: "35 min",
      type: "text",
      content: `## Grenzwerte von Funktionen

> **📖 Skript 01, Kapitel 6**

### Definition

$$\\lim_{x \\to x_0} f(x) = a$$

bedeutet: Für jede Folge $(x_i)$ in $D$ mit $\\lim x_i = x_0$ gilt $\\lim f(x_i) = a$.

### Einseitige Grenzwerte

$$\\lim_{x \\to x_0^-} f(x) \\quad \\text{(linksseitig)}, \\qquad \\lim_{x \\to x_0^+} f(x) \\quad \\text{(rechtsseitig)}$$

### Wichtige Beispiele

**Signumfunktion:**
$$\\operatorname{sgn}(x) = \\begin{cases} -1 & x < 0 \\\\ 0 & x = 0 \\\\ 1 & x > 0 \\end{cases}$$

Links- und rechtsseitiger Grenzwert bei $x = 0$ sind verschieden!

**Gaußklammern:**
$$\\lim_{x \\to z^-} \\lfloor x \\rfloor = z-1, \\qquad \\lim_{x \\to z^+} \\lfloor x \\rfloor = z$$

### Polstellen

Eine Stelle $x_0$ außerhalb des Definitionsbereichs, an der die Funktionswerte betragsmäßig beliebig groß werden, heißt **Polstelle**.

**Beispiel:** $f(x) = \\frac{x^2+3x+2}{x^2-1}$ hat Polstellen bei $x = \\pm 1$.

Bei $x = -1$: $\\lim_{x \\to -1} f(x) = -\\frac{1}{2}$ (endlicher Grenzwert, hebbare Definitionslücke)

Bei $x = 1$: $\\lim_{x \\to 1^-} f(x) = -\\infty$, $\\lim_{x \\to 1^+} f(x) = +\\infty$ (echte Polstelle)

> **🔑 Klausur-Tipp:** Bei gebrochenrationalen Funktionen IMMER erst die nichtdefinierten Stellen bestimmen und einseitige Grenzwerte berechnen!`,
    },

    // --- Lektion 6: Stetigkeit ---
    {
      id: "ma2-06-stetigkeit",
      title: "Stetigkeit — Definition & Sätze",
      duration: "35 min",
      type: "text",
      content: `## Stetigkeit

> **📖 Skript 01, Kapitel 7**

### Definition

$f$ ist **stetig** an der Stelle $x_0 \\in D$, falls $\\lim_{x \\to x_0} f(x) = f(x_0)$.

### Das $\\varepsilon$-$\\delta$-Kriterium

$f$ ist stetig an $x_0$ genau dann, wenn: Zu jedem $\\varepsilon > 0$ gibt es ein $\\delta > 0$ mit:
$$|x - x_0| \\leq \\delta \\Rightarrow |f(x) - f(x_0)| \\leq \\varepsilon$$

### Wichtige Sätze

**Satz (Stetigkeit rationaler Funktionen):** Jede rationale Funktion ist über ihrem Definitionsbereich stetig.

**Satz (Zwischenwertsatz):** Ist $f$ auf $[a,b]$ stetig, so nimmt $f$ jeden Wert zwischen $f(a)$ und $f(b)$ an.

**Satz (Existenz globaler Extrema):** Eine auf $[a,b]$ stetige Funktion besitzt ein globales Maximum und Minimum.

**Satz (Stetigkeit der Umkehrfunktion):** Ist $f$ stetig, bijektiv und $D$ ein Intervall, so ist auch $f^{-1}$ stetig.

### Stetigkeitsbedingungen

Sind $f$ und $g$ stetig an $x_0$, so auch $c \\cdot f$, $f + g$, $f \\cdot g$ und $\\frac{f}{g}$ (falls $g(x) \\neq 0$).

**Verkettung:** Sind $f$ stetig an $x_0$ und $g$ stetig an $f(x_0)$, so ist $g \\circ f$ stetig an $x_0$.

> **🔑 Klausur-Tipp:** Der Zwischenwertsatz gilt nur über $\\mathbb{R}$, nicht über $\\mathbb{Q}$! Beispiel: $f(x) = x^2$ auf $[0,2]_{\\mathbb{Q}}$ erreicht den Wert $2$ nicht.`,
    },

    // --- Lektion 7: Exponentialfunktionen & Logarithmen ---
    {
      id: "ma2-07-exp-log",
      title: "Exponentialfunktionen, Logarithmen & Potenzen",
      duration: "30 min",
      type: "text",
      content: `## Exponentialfunktionen & Logarithmen

> **📖 Skript 01, Kapitel 8**

### Exponentialfunktion $\\exp_b$ (Basis $b > 0$)

$$\\exp_b: \\mathbb{R} \\to \\mathbb{R}^+, \\quad \\exp_b(x) = b^x$$

Für $b = e$ (Euler'sche Zahl): $\\exp(x) = e^x$.

**Eigenschaften:** $\\exp_b$ ist stetig, für $b > 1$ streng monoton wachsend.

**Potenzgesetze** (gelten auch für reelle Exponenten):
$$b^{x_1} \\cdot b^{x_2} = b^{x_1+x_2}, \\qquad (b^{x_1})^{x_2} = b^{x_1 \\cdot x_2}$$

### Logarithmus $\\log_b$ (Basis $b > 0$, $b \\neq 1$)

$$\\log_b: \\mathbb{R}^+ \\to \\mathbb{R}, \\quad \\log_b(x) := \\exp_b^{-1}(x)$$

Für $b = e$: $\\ln(x) := \\log_e(x)$ (natürlicher Logarithmus).

**Rechenregeln:**
$$\\log_b(x_1 \\cdot x_2) = \\log_b(x_1) + \\log_b(x_2)$$
$$\\log_b(x^p) = p \\cdot \\log_b(x)$$

**Basiswechsel:** $\\log_a(x) = \\frac{\\log_b(x)}{\\log_b(a)}$

### Potenzfunktionen mit reellen Exponenten

$$p_q^+(x) = x^q = e^{q \\cdot \\ln(x)} \\quad (x > 0, \\; q \\in \\mathbb{R})$$

### Hyperbelfunktionen

$$\\sinh(x) = \\frac{e^x - e^{-x}}{2}, \\qquad \\cosh(x) = \\frac{e^x + e^{-x}}{2}$$

Wichtige Identitäten: $\\cosh^2(x) - \\sinh^2(x) = 1$

Umkehrfunktionen: $\\operatorname{arsinh}(x) = \\ln(x + \\sqrt{x^2+1})$

> **🔑 Klausur-Tipp:** Die Gleichung $a^x = b$ wird durch Logarithmieren gelöst: $x = \\frac{\\ln(b)}{\\ln(a)}$!`,
    },

    // --- Lektion 8: Trigonometrische Funktionen ---
    {
      id: "ma2-08-trigonometrie",
      title: "Trigonometrische Funktionen & Arkusfunktionen",
      duration: "25 min",
      type: "text",
      content: `## Trigonometrische Funktionen

> **📖 Skript 01, Kapitel 9**

### Definition am Einheitskreis

Für $x \\in \\mathbb{R}$ wird die Strecke $x$ auf dem Einheitskreis ab dem Punkt $(1,0)$ gegen den Uhrzeigersinn durchlaufen. Der erreichte Punkt hat Koordinaten $(\\cos x, \\sin x)$.

### Grundlegende Eigenschaften

| Eigenschaft | $\\sin$ | $\\cos$ |
|---|---|---|
| Symmetrie | ungerade: $\\sin(-x) = -\\sin(x)$ | gerade: $\\cos(-x) = \\cos(x)$ |
| Periode | $2\\pi$ | $2\\pi$ |
| Verschiebung | $\\sin(x) = \\cos(x - \\frac{\\pi}{2})$ | $\\cos(x) = \\sin(x + \\frac{\\pi}{2})$ |

**Satz des Pythagoras:** $\\sin^2(x) + \\cos^2(x) = 1$

### Tangens und Kotangens

$$\\tan(x) = \\frac{\\sin(x)}{\\cos(x)}, \\qquad \\cot(x) = \\frac{\\cos(x)}{\\sin(x)}$$

Periode: $\\pi$. Zusammenhang: $\\tan(x) = -\\cot(x \\pm \\frac{\\pi}{2})$

### Arkusfunktionen

| Funktion | Definitionsbereich | Wertebereich |
|---|---|---|
| $\\arcsin$ | $[-1, 1]$ | $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ |
| $\\arccos$ | $[-1, 1]$ | $[0, \\pi]$ |
| $\\arctan$ | $\\mathbb{R}$ | $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$ |
| $\\operatorname{arccot}$ | $\\mathbb{R}$ | $(0, \\pi)$ |

> **🔑 Klausur-Tipp:** $\\arcsin$ und $\\arccos$ sind zueinander komplementär: $\\arcsin(x) + \\arccos(x) = \\frac{\\pi}{2}$!`,
    },

    // =========================================================================
    // TEIL 2: DIFFERENZIALRECHNUNG (Skript 02)
    // =========================================================================

    // --- Lektion 9: Differenzierbarkeit ---
    {
      id: "ma2-09-differenzierbarkeit",
      title: "Differenzierbarkeit & Ableitung",
      duration: "35 min",
      type: "text",
      content: `## Differenzierbarkeit

> **📖 Skript 02, Kapitel 2**

### Definition der Ableitung

$$f'(x_0) := \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$$

Geometrisch: $f'(x_0)$ ist die **Steigung der Tangente** am Punkt $(x_0, f(x_0))$.

**Tangentengleichung:** $y = f'(x_0)(x - x_0) + f(x_0)$

### Grundlegende Ableitungen

| Funktion | Ableitung |
|---|---|
| $c$ | $0$ |
| $x$ | $1$ |
| $x^n$ ($n \\in \\mathbb{Z}$) | $n \\cdot x^{n-1}$ |
| $\\sin(x)$ | $\\cos(x)$ |

**Wichtig:** Differenzierbarkeit impliziert **Stetigkeit** (Satz 2.1). Die Umkehrung gilt nicht!

### Beispiel: $|x|$ ist bei $x = 0$ nicht differenzierbar

Linksseitig: $\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1$
Rechtsseitig: $\\lim_{x \\to 0^+} \\frac{|x|}{x} = +1$

Links- und rechtsseitige Ableitung sind verschieden → nicht differenzierbar.

> **🔑 Klausur-Tipp:** Bei $|g(x)|$-Funktionen IMMER die Stelle $g(x) = 0$ als potentielle Nicht-Differenzierbarkeitsstelle identifizieren!`,
    },

    // --- Lektion 10: Differenziationsregeln ---
    {
      id: "ma2-10-differenzierungsregeln",
      title: "Differenziationsregeln — Produkt, Quotient, Kette",
      duration: "35 min",
      type: "text",
      content: `## Differenziationsregeln

> **📖 Skript 02, Kapitel 3**

### Grundregeln

| Regel | Formel |
|---|---|
| Vielfaches | $(c \\cdot f)'(x) = c \\cdot f'(x)$ |
| Summe | $(f + g)'(x) = f'(x) + g'(x)$ |
| **Produktregel** | $(f \\cdot g)'(x) = f'(x)g(x) + f(x)g'(x)$ |
| **Quotientenregel** | $\\left(\\frac{f}{g}\\right)'(x) = \\frac{f'(x)g(x) - f(x)g'(x)}{(g(x))^2}$ |
| **Kettenregel** | $(g \\circ f)'(x) = g'(f(x)) \\cdot f'(x)$ |
| **Umkehrfunktion** | $(f^{-1})'(y) = \\frac{1}{f'(f^{-1}(y))}$ |

### Ableitungen trigonometrischer Funktionen

| Funktion | Ableitung |
|---|---|
| $\\cos(x)$ | $-\\sin(x)$ |
| $\\tan(x)$ | $\\frac{1}{\\cos^2(x)} = 1 + \\tan^2(x)$ |
| $\\cot(x)$ | $-\\frac{1}{\\sin^2(x)} = -1 - \\cot^2(x)$ |

### Ableitungen von Arkusfunktionen

| Funktion | Ableitung |
|---|---|
| $\\arcsin(x)$ | $\\frac{1}{\\sqrt{1-x^2}}$ |
| $\\arccos(x)$ | $-\\frac{1}{\\sqrt{1-x^2}}$ |
| $\\arctan(x)$ | $\\frac{1}{1+x^2}$ |
| $\\operatorname{arccot}(x)$ | $-\\frac{1}{1+x^2}$ |

### Potenzfunktionen $p_q^+$ mit $q \\in \\mathbb{Q}$

$$(p_q^+)'(x) = q \\cdot x^{q-1}$$

> **🔑 Klausur-Tipp:** Die drei Basisfunktionen $x \\mapsto x$, $x \\mapsto \\sin(x)$, $x \\mapsto e^x$ und die Differenziationsregeln reichen aus, um ALLE relevanten Funktionen zu differenzieren!`,
    },

    // --- Lektion 11: Ableitungen von Exp & Log ---
    {
      id: "ma2-11-exp-log-ableitungen",
      title: "Ableitungen von Exponentialfunktion & Logarithmus",
      duration: "30 min",
      type: "text",
      content: `## Ableitungen von $\\exp$ und $\\ln$

> **📖 Skript 02, Kapitel 4**

### Die drei Schlüsselableitungen

$$\\frac{d}{dx} e^x = e^x$$
$$\\frac{d}{dx} \\ln(x) = \\frac{1}{x}$$
$$\\frac{d}{dx} x^q = q \\cdot x^{q-1} \\quad (q \\in \\mathbb{R}, \\; x > 0)$$

### Ableitungen der Hyperbelfunktionen

$$\\sinh'(x) = \\cosh(x), \\qquad \\cosh'(x) = \\sinh(x)$$

### Ableitungen allgemeiner Exponential- und Logarithmusfunktionen

$$\\frac{d}{dx} b^x = \\ln(b) \\cdot b^x$$
$$\\frac{d}{dx} \\log_b(x) = \\frac{1}{\\ln(b) \\cdot x}$$

### Logarithmische Differenziation

Für $f(x) = g(x)^{h(x)}$ mit $g(x) > 0$:

$$f(x) = e^{h(x) \\cdot \\ln(g(x))}$$

$$f'(x) = \\left(h'(x) \\ln(g(x)) + \\frac{h(x) g'(x)}{g(x)}\\right) \\cdot f(x)$$

**Beispiel:** $(x^x)' = (\\ln(x) + 1) \\cdot x^x$

> **🔑 Klausur-Tipp:** Merke: $e^x$ ist die EINZIGE Funktion, die ihre eigene Ableitung ist!`,
    },

    // --- Lektion 12: Extrema & Monotonie ---
    {
      id: "ma2-12-extrema",
      title: "Extrema, Monotonie & Mittelwertsatz",
      duration: "35 min",
      type: "text",
      content: `## Extrema & Monotonie

> **📖 Skript 02, Kapitel 6**

### Notwendige Bedingung für Extrema

Hat $f$ an einer **inneren** Stelle $x_0$ ein lokales Extremum und ist $f$ differenzierbar, so gilt:
$$f'(x_0) = 0$$

### Monotonie und Vorzeichen der Ableitung

| Bedingung | Folge |
|---|---|
| $f'(x) > 0$ auf $I$ | $f$ streng monoton wachsend auf $I$ |
| $f'(x) < 0$ auf $I$ | $f$ streng monoton fallend auf $I$ |

### Satz von Rolle

Ist $f$ auf $[a,b]$ differenzierbar und $f(a) = f(b)$, so gibt es $x_0 \\in (a,b)$ mit $f'(x_0) = 0$.

### Mittelwertsatz der Differentialrechnung

Ist $f$ auf $[a,b]$ differenzierbar, so gibt es $x_0 \\in (a,b)$ mit:
$$f'(x_0) = \\frac{f(b) - f(a)}{b - a}$$

### Stammfunktionen

$F$ ist **Stammfunktion** von $f$, falls $F'(x) = f(x)$ für alle $x$.

Alle Stammfunktionen unterscheiden sich nur um eine Konstante:
$$\\int f(x) \\, dx = F(x) + c$$

### Extremwertaufgaben — Lösungsstrategie

1. **Variablen reduzieren** auf eine freie Variable
2. **Ableitung** der Zielfunktion bilden
3. **Kritische Stellen** ($f'(x) = 0$) und Randpunkte prüfen
4. **Werte vergleichen** → Maximum/Minimum bestimmen

> **🔑 Klausur-Tipp:** Bei Extremwertaufgaben IMMER auch die Randpunkte des Definitionsbereichs prüfen!`,
    },

    // --- Lektion 13: Mehrfache Ableitungen & Konvexität ---
    {
      id: "ma2-13-konvexitaet",
      title: "Mehrfache Ableitungen, Konvexität & Wendepunkte",
      duration: "30 min",
      type: "text",
      content: `## Mehrfache Ableitungen

> **📖 Skript 02, Kapitel 7**

### Definition

$$f''(x) := (f'(x))', \\qquad f^{(n)}(x) := (f^{(n-1)}(x))'$$

### Konvexität und Konkavität

$f$ ist **konvex** auf $I$, falls der Funktionsgraph unterhalb jeder Sehne liegt:
$$f((1-t)x_1 + tx_2) \\leq (1-t)f(x_1) + tf(x_2)$$

**Kriterium:** $f''(x) \\geq 0$ auf $I$ $\\Rightarrow$ $f$ konvex auf $I$

$f$ ist **konkav** auf $I$, falls $f''(x) \\leq 0$ auf $I$.

### Wendepunkte

$x_0$ ist **Wendepunkt**, falls $f$ an $x_0$ das Krümmungsverhalten ändert.

**Hinreichende Bedingung:** $f''(x_0) = 0$ und $f'''(x_0) \\neq 0$

### Lokale Extrema — 2. Ableitungstest

| Bedingung | Folge |
|---|---|
| $f'(x_0) = 0$ und $f''(x_0) > 0$ | lokales Minimum |
| $f'(x_0) = 0$ und $f''(x_0) < 0$ | lokales Maximum |
| $f'(x_0) = f''(x_0) = 0$, $f'''(x_0) \\neq 0$ | Sattelpunkt |

> **🔑 Klausur-Tipp:** Sattelpunkte sind KEINE Extrema! $f(x) = x^3$ bei $x = 0$: $f'(0) = 0$, aber kein Extremum.`,
    },

    // --- Lektion 14: L'Hôpital ---
    {
      id: "ma2-14-lhopital",
      title: "Regel von L'Hôpital",
      duration: "25 min",
      type: "text",
      content: `## Regel von L'Hôpital

> **📖 Skript 02, Kapitel 8**

### Voraussetzungen

$f$ und $g$ differenzierbar auf $(a,b)$, $g(x) \\neq 0$ und $g'(x) \\neq 0$ für alle $x$.

Es gelte entweder:
- $\\lim_{x \\to a^+} f(x) = \\lim_{x \\to a^+} g(x) = 0$ ($\\frac{0}{0}$-Form), oder
- $\\lim_{x \\to a^+} g(x) = \\pm\\infty$ ($\\frac{*}{\\infty}$-Form)

### Regel

$$\\lim_{x \\to a^+} \\frac{f(x)}{g(x)} = \\lim_{x \\to a^+} \\frac{f'(x)}{g'(x)}$$

falls der rechte Grenzwert existiert.

### Wichtige Grenzwerte (Wachstumsvergleich)

Für alle $a, b > 0$:

$$\\lim_{x \\to \\infty} \\frac{e^{ax}}{x^b} = \\infty \\quad \\text{(Exponential wächst schneller als Potenz)}$$

$$\\lim_{x \\to \\infty} \\frac{(\\ln(x))^a}{x^b} = 0 \\quad \\text{(Logarithmus wächst langsamer als Potenz)}$$

### Typische Klausuraufgaben

| Typ | Methode |
|---|---|
| $\\frac{0}{0}$ | L'Hôpital (ggf. mehrfach) |
| $\\frac{\\infty}{\\infty}$ | L'Hôpital |
| $0 \\cdot \\infty$ | Umformen zu $\\frac{0}{0}$ oder $\\frac{\\infty}{\\infty}$ |
| $\\infty - \\infty$ | Zusammenfassen zu Quotient |
| $1^\\infty$ | Logarithmieren, dann L'Hôpital |

> **🔑 Klausur-Tipp:** L'Hôpital gilt auch für einseitige Grenzwerte! Bei $x \\to 0^+$ oder $x \\to 0^-$ anwenden.`,
    },

    // =========================================================================
    // TEIL 3: INTEGRALRECHNUNG (Skript 03)
    // =========================================================================

    // --- Lektion 15: Das bestimmte Integral ---
    {
      id: "ma2-15-bestimmtes-integral",
      title: "Das bestimmte Integral — Riemann-Integral",
      duration: "35 min",
      type: "text",
      content: `## Das bestimmte Integral

> **📖 Skript 03, Kapitel 2**

### Definition über Unter- und Obersummen

Für eine Zerlegung $Z = \\{x_0, x_1, \\ldots, x_n\\}$ von $[a,b]$:

$$U_f(Z) = \\sum_{i=1}^{n} f|_{[x_{i-1}, x_i]} \\cdot (x_i - x_{i-1}) \\quad \\text{(Untersumme)}$$

$$O_f(Z) = \\sum_{i=1}^{n} \\overline{f}|_{[x_{i-1}, x_i]} \\cdot (x_i - x_{i-1}) \\quad \\text{(Obersumme)}$$

### Riemann-Integral

$$\\int_a^b f(x) \\, dx := \\lim_{j \\to \\infty} U_f(Z_j) = \\lim_{j \\to \\infty} O_f(Z_j)$$

### Hauptsatz der Differential- und Integralrechnung

**Teil 1:** Ist $f$ stetig, so ist $F(x) = \\int_a^x f(\\xi) \\, d\\xi$ eine Stammfunktion von $f$.

**Teil 2:** Besitzt $f$ eine Stammfunktion $F$, so gilt:
$$\\int_a^b f(x) \\, dx = F(b) - F(a) = [F(x)]_a^b$$

### Grundlegende Integrationsregeln

$$\\int x^a \\, dx = \\frac{x^{a+1}}{a+1} + c \\quad (a \\neq -1)$$

$$\\int \\frac{1}{x} \\, dx = \\ln|x| + c$$

$$\\int e^{ax} \\, dx = \\frac{1}{a} e^{ax} + c$$

### Rechenregeln

$$\\int_a^b (f+g)(x) \\, dx = \\int_a^b f(x) \\, dx + \\int_a^b g(x) \\, dx$$

$$\\int_a^b c \\cdot f(x) \\, dx = c \\int_a^b f(x) \\, dx$$

$$\\int_a^b f(x) \\, dx = \\int_a^c f(x) \\, dx + \\int_c^b f(x) \\, dx$$

> **🔑 Klausur-Tipp:** $\\int_0^{2\\pi} \\cos(x) \\, dx = 0$ — Flächen unterhalb der $x$-Achse werden negativ gezählt! Für die tatsächliche Fläche: $\\int |\\cos(x)| \\, dx$ verwenden.`,
    },

    // --- Lektion 16: Integrationsregeln ---
    {
      id: "ma2-16-integrationsregeln",
      title: "Partielle Integration & Substitution",
      duration: "35 min",
      type: "text",
      content: `## Integrationsregeln

> **📖 Skript 03, Kapitel 3**

### Partielle Integration

Aus der Produktregel folgt:

$$\\int f(x) g'(x) \\, dx = f(x)g(x) - \\int f'(x)g(x) \\, dx$$

**Für bestimmte Integrale:**
$$\\int_a^b f(x) g'(x) \\, dx = [f(x)g(x)]_a^b - \\int_a^b f'(x)g(x) \\, dx$$

**Wahl der Teile:** „LIATE-Regel" — **L**ogarithmus, **I**nverse trig., **A**lgebraisch, **T**rigonometrisch, **E**xponential — als $u$ wählen.

**Wichtige Beispiele:**
$$\\int \\ln(x) \\, dx = x \\ln(x) - x + c$$
$$\\int x \\cdot \\cosh(x) \\, dx = x \\sinh(x) - \\cosh(x) + c$$

### Substitutionsregel

Aus der Kettenregel folgt:

$$\\int g(f(x)) \\cdot f'(x) \\, dx = \\left[\\int g(y) \\, dy\\right]_{y = f(x)}$$

**Für bestimmte Integrale:**
$$\\int_a^b g(f(x)) f'(x) \\, dx = \\int_{f(a)}^{f(b)} g(y) \\, dy$$

**Beispiel:** $\\int_0^{\\pi/2} \\cos(x) e^{\\sin(x)} dx$ mit $y = \\sin(x)$:
$$= \\int_0^1 e^y \\, dy = e - 1$$

> **🔑 Klausur-Tipp:** Bei $\\int f(ax+b) \\, dx$ mit bekannter Stammfunktion $F$ von $f$: $\\int f(ax+b) \\, dx = \\frac{1}{a} F(ax+b) + c$!`,
    },

    // --- Lektion 17: Anwendungen & Rotationskörper ---
    {
      id: "ma2-17-anwendungen",
      title: "Bogenlänge, Mantelfläche & Volumen",
      duration: "30 min",
      type: "text",
      content: `## Anwendungen der Integralrechnung

> **📖 Skript 03, Kapitel 5**

### Bogenlänge

Die Länge des Funktionsgraphen von $f$ zwischen $x = a$ und $x = b$:

$$L = \\int_a^b \\sqrt{1 + (f'(x))^2} \\, dx$$

### Mantelfläche rotationssymmetrischer Körper

Für die Hüllkurve $f: [a,b] \\to \\mathbb{R}^+_0$ (Rotation um $x$-Achse):

$$A = \\int_a^b 2\\pi f(x) \\sqrt{1 + (f'(x))^2} \\, dx$$

### Volumen rotationssymmetrischer Körper

$$V = \\int_a^b \\pi (f(x))^2 \\, dx$$

**Beispiel — Einheitskugel:** $f(x) = \\sqrt{1-x^2}$ auf $[-1,1]$:

$$V = \\pi \\int_{-1}^{1} (1-x^2) \\, dx = \\pi \\left[x - \\frac{x^3}{3}\\right]_{-1}^{1} = \\frac{4\\pi}{3}$$

### Uneigentliche Integrale

**Typ 1 — Unbeschränkter Integrand:**
$$\\int_a^b f(x) \\, dx := \\lim_{\\xi \\to b^-} \\int_a^\\xi f(x) \\, dx$$

**Typ 2 — Unbeschränktes Intervall:**
$$\\int_a^\\infty f(x) \\, dx := \\lim_{\\xi \\to \\infty} \\int_a^\\xi f(x) \\, dx$$

**Konvergenzkriterium:** $\\int_0^1 x^a \\, dx$ konvergiert genau dann, wenn $a > -1$.

> **🔑 Klausur-Tipp:** Bei Rotationskörpern IMMER prüfen, ob $f(x) \\geq 0$ auf dem gesamten Intervall gilt! Sonst $|f(x)|$ verwenden.`,
    },

    // =========================================================================
    // ALTKLAUSUREN (8 Klausuren)
    // =========================================================================
    ...mathe2AltklausurLessons,

    // =========================================================================
    // ÜBUNGSAUFGABEN
    // =========================================================================
    ...createExerciseLessons(
      "adv-mathe2",
      "Mathematik 2 Funktionen",
      {
        easy:
          "Einfache Aufgaben zu Funktionsgraphen, Ableitungen und grundlegenden Integralen. Perfekt zum Aufwärmen.",
        medium:
          "Mittelschwere Aufgaben mit L'Hôpital, Extremwertaufgaben und partieller Integration. Hier wird's interessant!",
        hard:
          "Schwere Aufgaben zu Partialbruchzerlegung, Rotationskörpern und uneigentlichen Integralen. Klausur-Niveau!",
      }
    ),
  ],
};
