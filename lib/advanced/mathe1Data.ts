// =============================================================================
// Erweitert — Mathematik 1 Grundlagen ()
// Vollständiges Modul: 3 Skripte + 7 Übungsblätter + 11 Altklausuren
// =============================================================================

import { Module } from "../types";
import { createExerciseLessons } from "../lessonHelpers";
import { mathe1AltklausurLessons } from "./mathe1Altklausuren";

export const advMathe1Module: Module = {
  id: "adv-mathe1",
  slug: "adv-mathe1",
  title: "Mathematik 1 — Grundlagen",
  description:
    "Mathematik 1 (): Mengenlehre, Abbildungen, Binomialkoeffizienten, Summen, vollständige Induktion, rationale & reelle Zahlen, Folgen & Grenzwerte, komplexe Zahlen, Polynome. Mit 11 Altklausuren (2020–2026) inkl. ausführlicher Lösungen.",
  icon: "📐",
  color: "#6366F1",
  progress: 0,
  category: "advanced",
  lessons: [
    // =========================================================================
    // TEIL 1: GRUNDLAGEN (Skript 01)
    // =========================================================================

    // --- Lektion 1: Mengenlehre ---
    {
      id: "ma1-01-mengen",
      title: "Mengenlehre — Die Sprache der Mathematik",
      duration: "35 min",
      type: "text",
      content: `## Mengenlehre — Die Sprache der Mathematik

Jede mathematische Theorie beginnt mit **Mengen** und **Aussagen**. Beides sind fundamentale Bausteine, die in ALLEN weiteren Kapiteln vorausgesetzt werden.

> **📖 Skript 01, Kapitel 2** — 

---

### Was ist eine Menge?

Nach **Georg Cantor** (dem Begründer der Mengenlehre) ist eine Menge eine *Zusammenfassung bestimmter, wohlunterschiedener Objekte unserer Anschauung oder unseres Denkens zu einem Ganzen*.

Entscheidend ist: Für jedes Objekt $x$ muss klar sein, ob es zur Menge gehört oder nicht.

| Schreibweise | Bedeutung |
|---|---|
| $x \\in M$ | $x$ ist Element von $M$ |
| $x \\notin M$ | $x$ ist kein Element von $M$ |
| $M = \\{1, 2, 3\\}$ | Aufzählende Form |
| $M = \\{x \\mid E(x)\\}$ | Beschreibende Form (\u201Ealle $x$ mit Eigenschaft $E$\") |

### Wichtige Zahlenmengen

| Symbol | Name | Beschreibung |
|---|---|---|
| $\\mathbb{N}$ | Natürliche Zahlen | $\\{1, 2, 3, \\ldots\\}$ |
| $\\mathbb{N}_0$ | Natürliche Zahlen mit 0 | $\\{0, 1, 2, 3, \\ldots\\}$ |
| $\\mathbb{Z}$ | Ganze Zahlen | $\\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$ |
| $\\mathbb{Q}$ | Rationale Zahlen | Alle Brüche $\\frac{z}{n}$ |
| $\\mathbb{R}$ | Reelle Zahlen | Alle Punkte auf dem Zahlenstrahl |
| $\\mathbb{C}$ | Komplexe Zahlen | $\\{a + bj \\mid a,b \\in \\mathbb{R}\\}$ |

### Kardinalität (Mächtigkeit)

Die **Kardinalität** $|M|$ gibt die Anzahl der Elemente einer endlichen Menge an.

**Wichtig:** Mehrfachnennungen ändern die Menge nicht!

$$\\{3, 17, 213\\} = \\{17, 213, 3\\} = \\{3, 3, 213, 17, 213\\}$$
$$|\\{3, 17, 213\\}| = 3$$

Die **leere Menge** $\\emptyset := \\{\\}$ enthält kein Element: $|\\emptyset| = 0$

### Teilmengen

$M_1 \\subseteq M_2$ bedeutet: Jedes Element von $M_1$ ist auch in $M_2$.

$$M_1 \\subseteq M_2 :\\!\\!\\iff \\forall x \\in M_1: x \\in M_2$$

**Wichtig:** $\\emptyset \\subseteq M$ gilt für **jede** Menge $M$!

### Durchschnitt und Vereinigung

| Operation | Symbol | Definition |
|---|---|---|
| Durchschnitt | $M_1 \\cap M_2$ | $\\{x \\mid x \\in M_1 \\text{ und } x \\in M_2\\}$ |
| Vereinigung | $M_1 \\cup M_2$ | $\\{x \\mid x \\in M_1 \\text{ oder } x \\in M_2\\}$ |

**Kardinalitätsformel:**
$$|M_1 \\cup M_2| = |M_1| + |M_2| - |M_1 \\cap M_2|$$

### Komplement und De Morgan'sche Regeln

Das **Komplement** von $M_2$ in $M_1$:
$$M_1 \\setminus M_2 := \\{x \\mid x \\in M_1 \\text{ und } x \\notin M_2\\}$$

**De Morgan'sche Regeln:**
$$M \\setminus (M_1 \\cap M_2) = (M \\setminus M_1) \\cup (M \\setminus M_2)$$
$$M \\setminus (M_1 \\cup M_2) = (M \\setminus M_1) \\cap (M \\setminus M_2)$$

### Kartesisches Produkt

$$M_1 \\times M_2 := \\{(x_1, x_2) \\mid x_1 \\in M_1,\\; x_2 \\in M_2\\}$$

Für endliche Mengen gilt: $|M_1 \\times M_2| = |M_1| \\cdot |M_2|$

Für $n$ gleiche Mengen: $M^n := \\underbrace{M \\times \\cdots \\times M}_{n\\text{-mal}}$

### Potenzmenge

$$\\mathcal{P}(M) := \\{N \\mid N \\subseteq M\\}$$

Die Potenzmenge enthält **alle** Teilmengen von $M$.

Für $|M| = n$ gilt: $|\\mathcal{P}(M)| = 2^n$

> **🔑 Merksatz:** $\\mathcal{P}(\\emptyset) = \\{\\emptyset\\}$, also $|\\mathcal{P}(\\emptyset)| = 1 = 2^0$

---

### 💡 Klausur-Tipp

In Klausuren tauchen Kardinalitätsaufgaben **immer** auf! Typische Fragestellung:
> \u201ESeien $M = \\mathcal{P}(\\{0,9,0,4,2,0,2,6\\})$ und $N = \\{X \\in M \\mid |X| = 2\\}$. Bestimme $|M|$, $|N|$.\"

Der Trick: Erst die eindeutigen Elemente zählen → $|\\{0,2,4,6,9\\}| = 5$ → $|M| = 2^5 = 32$`,
    },

    // --- Lektion 2: Abbildungen ---
    {
      id: "ma1-02-abbildungen",
      title: "Abbildungen (Funktionen)",
      duration: "30 min",
      type: "text",
      content: `## Abbildungen (Funktionen)

> **📖 Skript 01, Kapitel 3**

Eine **Abbildung** (Funktion) ordnet jedem Element der Definitionsmenge **genau ein** Element der Zielmenge zu.

### Definition

$$f: D \\to W, \\quad x \\mapsto y = f(x)$$

| Begriff | Symbol | Bedeutung |
|---|---|---|
| Definitionsbereich | $D$ | Menge der Eingabewerte |
| Zielmenge | $W$ | Menge der möglichen Ausgabewerte |
| Bild von $x$ | $f(x)$ | Der $x$ zugeordnete Wert |
| Urbild von $y$ | — | Ein $x$ mit $f(x) = y$ |
| Bildbereich | $f(D)$ | $\\{y \\mid y = f(x),\\; x \\in D\\}$ |

> **⚠️ Wichtig:** Zu jedem $x \\in D$ gibt es **genau ein** Bild. Zu einem $y \\in W$ kann es **kein, genau ein oder mehrere** Urbilder geben!

### Verkettung (Hintereinanderausführung)

$$(g \\circ f)(x) := g(f(x))$$

**Achtung:** $g \\circ f \\neq f \\circ g$ im Allgemeinen! (Reihenfolge!)

### Injektivität, Surjektivität, Bijektivität

| Eigenschaft | Bedeutung | Charakterisierung |
|---|---|---|
| **injektiv** | Jedes $y \\in W$ hat **höchstens ein** Urbild | $x_1 \\neq x_2 \\Rightarrow f(x_1) \\neq f(x_2)$ |
| **surjektiv** | Jedes $y \\in W$ hat **mindestens ein** Urbild | $f(D) = W$ |
| **bijektiv** | Jedes $y \\in W$ hat **genau ein** Urbild | injektiv + surjektiv |

### Umkehrfunktion

Nur **bijektive** Funktionen haben eine Umkehrfunktion $f^{-1}$:
$$f^{-1}(y) = x \\iff f(x) = y$$

Es gilt: $(f^{-1} \\circ f)(x) = x$ und $(f \\circ f^{-1})(y) = y$

### Anzahl von Abbildungen zwischen endlichen Mengen

Für $|M_1| = m$ und $|M_2| = n$:

| Typ | Anzahl |
|---|---|
| Alle Abbildungen $M_1 \\to M_2$ | $n^m$ |
| Injektive Abbildungen ($m \\leq n$) | $n \\cdot (n-1) \\cdots (n-m+1)$ |
| Surjektive Abbildungen | Komplexer (Siebformel) |

> **🔑 Klausur-Tipp:** \u201EBestimmen Sie die Anzahl injektiver Abbildungen von $A$ nach $B$\" — Wenn $|A| > |B|$, dann ist die Antwort **0** (Schubfachprinzip)!`,
    },

    // --- Lektion 3: Binomialkoeffizienten ---
    {
      id: "ma1-03-binomial",
      title: "Binomialkoeffizienten & Fakultät",
      duration: "25 min",
      type: "text",
      content: `## Binomialkoeffizienten

> **📖 Skript 01, Kapitel 4**

### Definition

Der Binomialkoeffizient $\\binom{n}{k}$ (\u201En über k\") gibt an, wie viele **k-elementige Teilmengen** eine n-elementige Menge hat:

$$\\binom{n}{k} := \\big|\\{N \\mid N \\subseteq M,\\; |N| = k,\\; |M| = n\\}\\big|$$

### Berechnung

**Formel (4.5):**
$$\\binom{n}{k} = \\frac{n \\cdot (n-1) \\cdots (n-k+1)}{k!}$$

**Formel (4.6) mit Fakultät:**
$$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$$

Dabei ist $n! := 1 \\cdot 2 \\cdots n$ (und $0! := 1$)

> **⚠️ Achtung:** Für die **praktische Berechnung** ist (4.5) besser als (4.6)! Beispiel:
> $$\\binom{10}{3} = \\frac{10 \\cdot 9 \\cdot 8}{3!} = \\frac{10 \\cdot 9 \\cdot 8}{6} = 10 \\cdot 3 \\cdot 4 = 120$$
> (Statt $10! = 3.628.800$ und $7! = 5.040$ zu berechnen!)

### Wichtige Identitäten

$$\\binom{n}{k} = \\binom{n}{n-k}$$

**Rekursionsformel (Pascal'sches Dreieck):**
$$\\binom{n+1}{k} = \\binom{n}{k-1} + \\binom{n}{k}$$

### Pascal'sches Dreieck

\\begin{array}{ccccccccccc}
 & & & & & 1 & & & & & \\\\
 & & & & 1 & & 1 & & & & \\\\
 & & & 1 & & 2 & & 1 & & & \\\\
 & & 1 & & 3 & & 3 & & 1 & & \\\\
 & 1 & & 4 & & 6 & & 4 & & 1 & \\\\
1 & & 5 & & 10 & & 10 & & 5 & & 1
\\end{array}

### Anwendung: Lotto \u201E6 aus 49\"

Wahrscheinlichkeit für 6 Richtige:
$$p_6 = \\frac{1}{\\binom{49}{6}} = \\frac{1}{13.983.816}$$

Chance: etwa **1 zu 14 Millionen**.

> **💡 Übungsaufgabe:** Berechne die Wahrscheinlichkeit für genau 5 Richtige beim Lotto. (Tipp: $\\binom{6}{5} \\cdot \\binom{43}{1}$ Möglichkeiten)`,
    },

    // --- Lektion 4: Summen ---
    {
      id: "ma1-04-summen",
      title: "Summen — Arithmetisch & Geometrisch",
      duration: "30 min",
      type: "text",
      content: `## Summen

> **📖 Skript 01, Kapitel 5**

### Das Summenzeichen

$$\\sum_{i=1}^{n} a_i := a_1 + a_2 + \\cdots + a_n$$

Der Index $i$ durchläuft alle ganzen Zahlen vom Startwert bis zum Endwert.

**Indexverschiebung (\u201Eaußen rauf, innen runter\"):**
$$\\sum_{i=m}^{m+n-1} a_i = \\sum_{i=m-k}^{m-k+n-1} a_{i+k}$$

### Rechenregeln

$$\\sum_{i=1}^{n} c \\cdot a_i = c \\cdot \\sum_{i=1}^{n} a_i$$

$$\\sum_{i=1}^{n} (a_i + b_i) = \\sum_{i=1}^{n} a_i + \\sum_{i=1}^{n} b_i$$

### Arithmetische Summen

Bei arithmetischen Summen ist die **Differenz** $d$ zwischen aufeinanderfolgenden Summanden konstant:

$$d = a_{i+1} - a_i \\quad \\text{(für alle } i\\text{)}$$

**Summenformel (5.5):**
$$\\sum_{i=1}^{n} (a + (i-1)d) = n \\cdot a + \\frac{n(n-1)}{2} \\cdot d = \\frac{n \\cdot (a_1 + a_n)}{2}$$

**Gauß'sche Summenformel (Spezialfall $a=1, d=1$):**
$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$

> 📐 **Geschichte:** Der junge Gauß soll als Schüler die Summe $1+2+\\cdots+100$ in Sekunden berechnet haben, indem er 50 Paare zu je 101 bildete: $50 \\cdot 101 = 5050$.

**Weitere wichtige Formeln:**
$$\\sum_{i=1}^{n} i^2 = \\frac{n(n+1)(2n+1)}{6}$$
$$\\sum_{i=1}^{n} i^3 = \\frac{n^2(n+1)^2}{4}$$

### Geometrische Summen

Bei geometrischen Summen ist der **Quotient** $q$ zwischen aufeinanderfolgenden Summanden konstant:

$$a_{i+1} = q \\cdot a_i$$

**Summenformel (5.9)/(5.10):**
$$\\sum_{i=0}^{n-1} q^i = \\frac{q^n - 1}{q - 1} \\quad (q \\neq 1)$$
$$\\sum_{i=1}^{n} a \\cdot q^{i-1} = a \\cdot \\frac{q^n - 1}{q - 1} \\quad (q \\neq 1)$$

Für $q = 1$ sind alle Summanden gleich: $\\sum_{i=1}^{n} a = n \\cdot a$

> **🔑 Klausur-Tipp:** Die geometrische Summenformel ist eine der **wichtigsten Formeln** der gesamten Mathematik 1. Du MUSST sie sicher beherrschen!`,
    },

    // --- Lektion 5: Vollständige Induktion ---
    {
      id: "ma1-05-induktion",
      title: "Vollständige Induktion — Das Beweisprinzip",
      duration: "30 min",
      type: "text",
      content: `## Vollständige Induktion

> **📖 Skript 01, Kapitel 6**

Die vollständige Induktion ist **das** zentrale Beweisprinzip für Aussagen über natürliche Zahlen. Sie ist in **jeder** Klausur vertreten!

### Das Prinzip

Sei $A(n)$ eine Aussage über $n \\in \\mathbb{N}$. Um $A(n)$ für **alle** $n$ zu beweisen, genügt:

1. **Induktionsanfang:** Zeige $A(1)$ ist wahr.
2. **Induktionsschritt:** Zeige: Wenn $A(n)$ wahr ist, dann ist auch $A(n+1)$ wahr.

Dann gilt $A(n)$ für alle $n \\in \\mathbb{N}$.

### Standard-Beispiel: Gauß'sche Summenformel

**Behauptung:** $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$

**Induktionsanfang ($n=1$):**
$$\\sum_{i=1}^{1} i = 1 = \\frac{1 \\cdot 2}{2} \\;\\;\\checkmark$$

**Induktionsschritt ($n \\to n+1$):**

*Induktionsvoraussetzung (IV):* $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$

*Zu zeigen:* $\\sum_{i=1}^{n+1} i = \\frac{(n+1)(n+2)}{2}$

\\begin{aligned}
\\sum_{i=1}^{n+1} i &= \\sum_{i=1}^{n} i + (n+1) \\\\
&\\overset{\\text{IV}}{=} \\frac{n(n+1)}{2} + (n+1) \\\\
&= \\frac{n(n+1) + 2(n+1)}{2} \\\\
&= \\frac{(n+1)(n+2)}{2} \\;\\;\\checkmark
\\end{aligned}

### Wichtige Induktions-Typen in Klausuren

1. **Summenformeln beweisen** (häufigster Typ)
2. **Ungleichungen beweisen** (z. B. $2^n < n!$ für $n \\geq 4$)
3. **Teilbarkeitsaussagen** (z. B. \u201E$n^3 - n$ ist durch 3 teilbar\")

> **🔑 Klausur-Tipp:** Bei Ungleichungen muss der Induktionsanfang oft für $n \\geq 2$ oder $n \\geq 4$ gemacht werden. Prüfe genau, ab welchem $n$ die Aussage gilt!

### Beispiel: $\\sum_{i=1}^{n} i^3 = \\frac{n^2(n+1)^2}{4}$

**Induktionsanfang ($n=1$):** $1^3 = 1 = \\frac{1 \\cdot 4}{4} \\;\\checkmark$

**Induktionsschritt:**
\\begin{aligned}
\\sum_{i=1}^{n+1} i^3 &= \\sum_{i=1}^{n} i^3 + (n+1)^3 \\\\
&\\overset{\\text{IV}}{=} \\frac{n^2(n+1)^2}{4} + (n+1)^3 \\\\
&= \\frac{(n+1)^2}{4} \\cdot (n^2 + 4n + 4) \\\\
&= \\frac{(n+1)^2(n+2)^2}{4} \\;\\;\\checkmark
\\end{aligned}`,
    },

    // --- Lektion 6: Rechengesetze & Primzahlen ---
    {
      id: "ma1-06-rechengesetze",
      title: "Rechengesetze, Primzahlen & Stellenwertsysteme",
      duration: "25 min",
      type: "text",
      content: `## Rechengesetze, Primzahlen & Stellenwertsysteme

> **📖 Skript 01, Kapitel 7**

### Grundlegende Rechengesetze in $\\mathbb{Z}$

| Gesetz | Addition | Multiplikation |
|---|---|---|
| **Assoziativ** | $(a+b)+c = a+(b+c)$ | $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$ |
| **Kommutativ** | $a+b = b+a$ | $a \\cdot b = b \\cdot a$ |
| **Neutrales El.** | $0$ | $1$ |
| **Inverses** | $-a$ | nur $\\pm 1$ in $\\mathbb{Z}$ |
| **Distributiv** | — | $a(b+c) = ab + ac$ |

$\\mathbb{Z}$ bildet mit Addition und Multiplikation einen **kommutativen Ring mit Eins**.

### Primzahlen

Eine Zahl $p \\geq 2$ heißt **Primzahl**, wenn $1$ und $p$ die einzigen Teiler sind.

**Satz von der eindeutigen Primfaktorzerlegung:**
Jede Zahl $n \\geq 2$ lässt sich **eindeutig** als Produkt von Primzahlen schreiben:
$$n = p_1^{e_1} \\cdot p_2^{e_2} \\cdots p_r^{e_r}$$

> 📐 **Satz von Euklid:** Es gibt unendlich viele Primzahlen. (Beweis durch Widerspruch!)

### Division mit Rest

Für $a \\in \\mathbb{N}_0$, $b \\in \\mathbb{N}$:
$$a = q \\cdot b + r \\quad \\text{mit } 0 \\leq r < b$$

Dabei ist $r = a \\bmod b$ (\u201Ea modulo b\").

### Stellenwertsysteme

Eine Zahl im System zur Basis $b$:
$$(z_k z_{k-1} \\ldots z_1 z_0)_b = \\sum_{i=0}^{k} z_i \\cdot b^i$$

| System | Basis | Ziffern |
|---|---|---|
| Dezimal | 10 | 0–9 |
| Dual/Binär | 2 | 0, 1 |
| Oktal | 8 | 0–7 |
| Hexadezimal | 16 | 0–9, A–F |

**Umrechnung in Dezimal:**
$$2706_8 = 2 \\cdot 8^3 + 7 \\cdot 8^2 + 6 \\cdot 8^0 = 2 \\cdot 512 + 7 \\cdot 64 + 6 = 1478$$

**Umrechnung von Dezimal:** Wiederholte Division durch $b$ mit Rest — die Reste (von unten nach oben) ergeben die Ziffern.

### Der Binomialsatz

$$(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^k b^{n-k}$$

**Spezialfälle (Binomische Formeln):**
$$(a+b)^2 = a^2 + 2ab + b^2$$
$$(a-b)^2 = a^2 - 2ab + b^2$$
$$(a+b)(a-b) = a^2 - b^2$$`,
    },

    // =========================================================================
    // TEIL 2: RATIONALE & REELLE ZAHLEN (Skript 02)
    // =========================================================================

    // --- Lektion 7: Rationale Zahlen ---
    {
      id: "ma1-07-rationale-zahlen",
      title: "Rationale Zahlen — ggT, kgV & Euklidischer Algorithmus",
      duration: "30 min",
      type: "text",
      content: `## Rationale Zahlen

> **📖 Skript 02, Kapitel 2**

### Definition

$$\\mathbb{Q} := \\left\\{\\frac{z}{n} \\;\\middle|\\; z \\in \\mathbb{Z},\\; n \\in \\mathbb{Z} \\setminus \\{0\\}\\right\\}$$

### Gleichwertige Brüche

$$\\frac{z_1}{n_1} = \\frac{z_2}{n_2} \\iff z_1 \\cdot n_2 = z_2 \\cdot n_1$$

Jede rationale Zahl hat **genau eine** vollständig gekürzte (reduzierte) Darstellung, bei der Zähler und Nenner **teilerfremd** sind.

### Größter gemeinsamer Teiler (ggT)

$$\\operatorname{ggT}(z_1, z_2) := \\max\\{n \\in \\mathbb{N} \\mid n \\text{ teilt } z_1 \\text{ und } n \\text{ teilt } z_2\\}$$

Sonderfall: $\\operatorname{ggT}(0, 0) := 0$

### Der Euklidische Algorithmus

Der **wichtigste Algorithmus** zur ggT-Berechnung — funktioniert auch für riesige Zahlen ohne Kenntnis der Primfaktorzerlegung!

**Prinzip:** $\\operatorname{ggT}(a, b) = \\operatorname{ggT}(a - qb, b) = \\operatorname{ggT}(a \\bmod b, b)$

**Algorithmus:**
1. Solange $b \\neq 0$:
2. $r := a \\bmod b$
3. $a := b$, $b := r$
4. Ergebnis: $\\operatorname{ggT} = a$

**Beispiel: ggT(525, 385)**

\\begin{array}{c|c|c}
a & b & q \\\\
\\hline
525 & 385 & 1 \\\\
385 & 140 & 2 \\\\
140 & 105 & 1 \\\\
105 & 35 & 3 \\\\
35 & 0 & -
\\end{array}

$\\Rightarrow \\operatorname{ggT}(525, 385) = 35$

### Kleinstes gemeinsames Vielfaches (kgV)

$$\\operatorname{kgV}(z_1, z_2) := \\min\\{n \\in \\mathbb{N} \\mid z_1 \\mid n \\text{ und } z_2 \\mid n\\}$$

**Formel:**
$$\\operatorname{kgV}(z_1, z_2) = \\frac{z_1 \\cdot z_2}{\\operatorname{ggT}(z_1, z_2)}$$

### Abzählbarkeit von $\\mathbb{Q}$

Obwohl $\\mathbb{Q}$ \u201Eviel mehr\" Zahlen als $\\mathbb{Z}$ zu enthalten scheint, ist $\\mathbb{Q}$ **abzählbar unendlich**! Cantors **Diagonalverfahren** (1873) zeigt, wie man alle rationalen Zahlen in einer Folge anordnen kann.

> **🔑 Klausur-Tipp:** ggT-Berechnung mit dem euklidischen Algorithmus kommt in fast jeder Klausur! Übe das Schema!`,
    },

    // --- Lektion 8: Gleichungen ---
    {
      id: "ma1-08-gleichungen",
      title: "Gleichungen lösen — Mit Fallstricken",
      duration: "20 min",
      type: "text",
      content: `## Gleichungen lösen

> **📖 Skript 02, Kapitel 3**

### Grundprinzip

Beim Lösen von Gleichungen dürfen **Äquivalenzumformungen** vorgenommen werden (auf beiden Seiten die gleiche Operation).

### ⚠️ Die Multiplikations-Falle

**Wichtigster Fallstrick in Klausuren:** Multipliziert man eine Gleichung mit einem Ausdruck, der $0$ werden kann, vergrößert sich möglicherweise die Lösungsmenge!

**Beispiel 1:** $\\frac{x+1}{x-1} = 2$

Multiplikation mit $x-1$ liefert: $x+1 = 2(x-1) \\Rightarrow x = 3$

Probe: $\\frac{4}{2} = 2$ ✓ → $L = \\{3\\}$

**Beispiel 2:** $\\frac{x+1}{x-1} = 3$

Multiplikation mit $x-1$: $x+1 = 3x-3 \\Rightarrow x = 2$

Probe: $\\frac{3}{1} = 3$ ✓

### ⚠️ Die \u201Everschwundene\" Lösung

**Beispiel 3:** $\\frac{2x-6}{x-3} = 2$

Multiplikation: $2x-6 = 2(x-3) \\Rightarrow 0 = 0$

Das sieht aus wie \u201Ealle $x$ sind Lösung\" — aber $x = 3$ ist **verboten** (Nenner wird 0)!

Korrekt: $L = \\mathbb{Q} \\setminus \\{3\\}$ oder $L = \\{x \\in \\mathbb{Q} \\mid x \\neq 3\\}$

> **🔑 Klausur-Tipp:** Nach jeder Umformung mit einem Nennerausdruck IMMER die Definitionsmenge prüfen! Schreibe explizit \u201Eund $x \\neq \\ldots$\" dazu.`,
    },

    // --- Lektion 9: Ungleichungen ---
    {
      id: "ma1-09-ungleichungen",
      title: "Ungleichungen & Angeordnete Körper",
      duration: "35 min",
      type: "text",
      content: `## Ungleichungen & Angeordnete Körper

> **📖 Skript 02, Kapitel 4 + 5**

### Der angeordnete Körper $\\mathbb{Q}$

$\\mathbb{Q}$ ist ein **angeordneter Körper** — eine totale Ordnung $<$ ist mit $+$ und $\\cdot$ verträglich:

1. $a < b \\Rightarrow a + c < b + c$
2. $a < b$ und $c > 0 \\Rightarrow a \\cdot c < b \\cdot c$

### ⚠️ Die Vorzeichen-Falle

Bei Multiplikation mit einer **negativen** Zahl dreht sich das Ungleichheitszeichen um:

$$a < b \\text{ und } c < 0 \\Rightarrow a \\cdot c > b \\cdot c$$

### Systematisches Lösen von Ungleichungen

**Beispiel:** $\\frac{x+1}{x-1} < 3$

Wegen des Nenners $x-1$: **Zwei Fälle** unterscheiden!

**Fall 1:** $x - 1 > 0$, also $x > 1$

Multiplikation mit $x-1$ (positiv → Zeichen bleibt):
$$x+1 < 3(x-1) \\Rightarrow x+1 < 3x-3 \\Rightarrow x > 2$$

Mit Bedingung $x > 1$: $L_1 = (2, \\infty)$

**Fall 2:** $x - 1 < 0$, also $x < 1$

Multiplikation mit $x-1$ (negativ → Zeichen dreht sich um!):
$$x+1 > 3(x-1) \\Rightarrow x+1 > 3x-3 \\Rightarrow x < 2$$

Mit Bedingung $x < 1$: $L_2 = (-\\infty, 1)$

**Gesamtlösung:** $L = L_1 \\cup L_2 = (-\\infty, 1) \\cup (2, \\infty)$

### Der Absolutbetrag

$$|a| := \\begin{cases} a & \\text{falls } a \\geq 0 \\\\ -a & \\text{falls } a < 0 \\end{cases}$$

**Dreiecksungleichung:** $|a + b| \\leq |a| + |b|$

### Ungleichungen mit Beträgen

Bei Beträgen muss untersucht werden, wann der Ausdruck zwischen den Betragsstrichen positiv/negativ ist.

**Muster-Klausuraufgabe:** Löse $\\left|\\frac{x+1}{x-1}\\right| < 3$

Fall 1: Bruch $\\geq 0$ → Betragsstriche fallen weg
Fall 2: Bruch $< 0$ → Betragsstriche bewirken Multiplikation mit $-1$

> **🔑 Merksatz:** Bei Ungleichungen mit Brüchen → **Fallunterscheidung** nach Vorzeichen des Nenners. Bei Beträgen → **Fallunterscheidung** nach Vorzeichen des Ausdrucks im Betrag.`,
    },

    // --- Lektion 10: Folgen & Grenzwerte ---
    {
      id: "ma1-10-folgen",
      title: "Zahlenfolgen & Grenzwerte",
      duration: "35 min",
      type: "text",
      content: `## Zahlenfolgen & Grenzwerte

> **📖 Skript 02, Kapitel 6 + 11**

### Definition

Eine **Folge** ist eine Abbildung $a: \\mathbb{N} \\to M$, geschrieben als:
$$(a_i)_{i\\in\\mathbb{N}} = (a_1, a_2, a_3, \\ldots)$$

### Konvergenz

Eine Folge $(a_i)$ **konvergiert** gegen den Grenzwert $a$, wenn zu jedem $\\varepsilon > 0$ ein Index $n \\in \\mathbb{N}$ existiert, so dass:

$$|a_i - a| \\leq \\varepsilon \\quad \\text{für alle } i \\geq n$$

Schreibweise: $\\lim_{i \\to \\infty} a_i = a$ oder $a_i \\to a$

Eine Folge mit Grenzwert $0$ heißt **Nullfolge**.

### Wichtige Grenzwerte

$$\\lim_{n \\to \\infty} \\frac{1}{n} = 0$$
$$\\lim_{n \\to \\infty} q^n = 0 \\quad (|q| < 1)$$
$$\\lim_{n \\to \\infty} \\sqrt[n]{n} = 1$$
$$\\lim_{n \\to \\infty} \\sqrt[n]{a} = 1 \\quad (a > 0)$$

### Grenzwertsätze

Sind $(a_i)$ und $(b_i)$ konvergent, dann gilt:

| Operation | Grenzwert |
|---|---|
| Summe | $\\lim(a_i + b_i) = \\lim a_i + \\lim b_i$ |
| Produkt | $\\lim(a_i \\cdot b_i) = \\lim a_i \\cdot \\lim b_i$ |
| Quotient | $\\lim \\frac{a_i}{b_i} = \\frac{\\lim a_i}{\\lim b_i}$ (falls $\\lim b_i \\neq 0$) |
| Konst. Faktor | $\\lim(c \\cdot a_i) = c \\cdot \\lim a_i$ |

### ⚠️ Wichtige Warnung

Die Grenzwertsätze dürfen **nur** angewendet werden, wenn die einzelnen Grenzwerte **existieren**! Ausdrücke wie $\\frac{\\infty}{\\infty}$ oder $\\infty - \\infty$ sind **nicht definiert**.

**Standard-Trick bei rationalen Ausdrücken:** Durch die höchste Potenz kürzen!

$$\\lim_{n \\to \\infty} \\frac{2n^2 - 3n + 1}{3n^2 + 5} = \\lim_{n \\to \\infty} \\frac{2 - \\frac{3}{n} + \\frac{1}{n^2}}{3 + \\frac{5}{n^2}} = \\frac{2}{3}$$

### Monotonie und Beschränktheit

- **Beschränkt:** Es gibt $M$ mit $|a_i| \\leq M$ für alle $i$
- **Monoton wachsend:** $a_i \\leq a_{i+1}$ für alle $i$
- **Monoton fallend:** $a_i \\geq a_{i+1}$ für alle $i$

> **Satz 11.1:** Jede beschränkte und monotone Folge reeller Zahlen ist **konvergent**!`,
    },

    // --- Lektion 11: Reelle Zahlen ---
    {
      id: "ma1-11-reelle-zahlen",
      title: "Reelle Zahlen & $\\sqrt{2}$ ist irrational",
      duration: "25 min",
      type: "text",
      content: `## Reelle Zahlen & Irrationalität von $\\sqrt{2}$

> **📖 Skript 02, Kapitel 7 + 8**

### $\\sqrt{2}$ ist keine rationale Zahl

**Satz 7.2:** $\\sqrt{2} \\notin \\mathbb{Q}$

**Beweis (Widerspruchsbeweis):**

Angenommen $\\sqrt{2} = \\frac{z}{n}$ mit $z, n \\in \\mathbb{N}$ und $\\operatorname{ggT}(z, n) = 1$ (maximal gekürzt).

Quadrieren: $2 = \\frac{z^2}{n^2} \\Rightarrow 2n^2 = z^2$

Also ist $z^2$ gerade → $z$ ist gerade → $z = 2\\tilde{z}$

Einsetzen: $2n^2 = 4\\tilde{z}^2 \\Rightarrow n^2 = 2\\tilde{z}^2$

Also ist auch $n^2$ gerade → $n$ ist gerade.

→ **Widerspruch:** $z$ und $n$ sind beide gerade, also nicht teilerfremd!

Daher kann $\\sqrt{2}$ nicht rational sein. ∎

### Konstruktion der reellen Zahlen

Die reellen Zahlen $\\mathbb{R}$ werden durch **Intervallschachtelungen** rationaler Zahlen definiert.

Eine **Intervallschachtelung** ist eine Folge von Intervallen $I_i = [a_i, b_i]$ mit:
1. $I_1 \\supseteq I_2 \\supseteq I_3 \\supseteq \\ldots$
2. $\\lim(b_i - a_i) = 0$

**Beispiel für $\\sqrt{2}$:**
$$[1,4; 1,5] \\supset [1,41; 1,42] \\supset [1,414; 1,415] \\supset \\ldots$$

### Dezimalbruchentwicklung

Rationale Zahlen haben **periodische** oder **abbrechende** Dezimalbrüche. Irrationale Zahlen haben **nicht-periodische, nicht-abbrechende** Dezimalbrüche.

**Beispiele:**
- $\\frac{1}{3} = 0,\\overline{3}$
- $\\frac{1}{7} = 0,\\overline{142857}$
- $\\pi = 3{,}14159\\ldots$ (nicht-periodisch)
- $e = 2{,}71828\\ldots$ (nicht-periodisch)

**Umwandlung periodisch → Bruch:**
$$0,\\overline{142857} = \\frac{142857}{999999} = \\frac{1}{7}$$`,
    },

    // --- Lektion 12: Potenzen & Euler'sche Zahl ---
    {
      id: "ma1-12-potenzen-euler",
      title: "Potenzen, Wurzeln & die Euler'sche Zahl $e$",
      duration: "25 min",
      type: "text",
      content: `## Potenzen, Wurzeln & die Euler'sche Zahl $e$

> **📖 Skript 02, Kapitel 10 + 11.3**

### Potenzgesetze (für $x, y \\in \\mathbb{R}^+$, $q, q_1, q_2 \\in \\mathbb{Q}$)

$$x^q \\cdot y^q = (x \\cdot y)^q$$
$$x^{q_1} \\cdot x^{q_2} = x^{q_1 + q_2}$$
$$(x^{q_1})^{q_2} = x^{q_1 \\cdot q_2}$$

### Wurzelfunktionen

$$\\sqrt[n]{x} = x^{\\frac{1}{n}} \\quad (x \\geq 0,\\; n \\in \\mathbb{N})$$

$$\\sqrt[n]{x}^m = x^{\\frac{m}{n}} = (\\sqrt[n]{x})^m = \\sqrt[n]{x^m}$$

### Die Euler'sche Zahl $e$

$$e := \\lim_{n \\to \\infty} \\left(1 + \\frac{1}{n}\\right)^n \\approx 2{,}71828\\ldots$$

Die Folge $a_n = \\left(1 + \\frac{1}{n}\\right)^n$ ist **streng monoton wachsend** und **beschränkt** (durch 3), daher konvergent.

### Wichtige Verallgemeinerung

$$\\lim_{n \\to \\infty} \\left(1 + \\frac{q}{n}\\right)^n = e^q \\quad (q \\in \\mathbb{Q})$$

> **🔑 Klausur-Tipp:** Diese Verallgemeinerung wird häufig in Grenzwertaufgaben benötigt! Beispiel:
> $$\\lim_{n \\to \\infty} \\left(\\frac{n+13}{n+11}\\right)^n = \\lim \\left(1 + \\frac{2}{n+11}\\right)^n = e^2$$`,
    },

    // =========================================================================
    // TEIL 3: KOMPLEXE ZAHLEN (Skript 03)
    // =========================================================================

    // --- Lektion 13: Bogenmaß ---
    {
      id: "ma1-13-bogenmass",
      title: "Bogenmaß & Winkelmessung",
      duration: "20 min",
      type: "text",
      content: `## Bogenmaß & Winkelmessung

> **📖 Skript 03, Kapitel 2**

### Definition

Das **Bogenmaß** eines Winkels ist die Länge des Kreisbogens auf dem Einheitskreis.

Die **Kreiszahl** $\\pi$ ist der halbe Umfang des Einheitskreises.

### Umrechnung Grad ↔ Bogenmaß

$$\\alpha \\text{ (Bogenmaß)} = \\frac{a}{360°} \\cdot 2\\pi$$
$$a \\text{ (Grad)} = \\frac{\\alpha}{2\\pi} \\cdot 360°$$

| Grad | 0° | 30° | 45° | 60° | 90° | 180° | 270° | 360° |
|---|---|---|---|---|---|---|---|---|
| Bogenmaß | $0$ | $\\frac{\\pi}{6}$ | $\\frac{\\pi}{4}$ | $\\frac{\\pi}{3}$ | $\\frac{\\pi}{2}$ | $\\pi$ | $\\frac{3\\pi}{2}$ | $2\\pi$ |

### Wichtige Sätze am rechtwinkligen Dreieck

- **Satz des Pythagoras:** $c^2 = a^2 + b^2$
- **Satz des Thales:** Dreieck im Halbkreis ist rechtwinklig
- **Höhensatz:** $h^2 = c_a \\cdot c_b$

### Approximation von $\\pi$

$\\pi$ kann durch ein- und umbeschriebene Sehnen- und Tangentenvielecke beliebig genau approximiert werden (Methode von Archimedes).

Mit $2 \\cdot 2^i$ Seiten ergeben sich Intervalle $[\\sigma_i, \\tau_i]$ mit:
$$\\sigma_i < \\pi < \\tau_i \\quad \\text{und} \\quad \\tau_i - \\sigma_i \\to 0$$`,
    },

    // --- Lektion 14: Komplexe Zahlen Einführung ---
    {
      id: "ma1-14-komplex-einfuehrung",
      title: "Komplexe Zahlen — Definition & Gauß'sche Ebene",
      duration: "30 min",
      type: "text",
      interactive: "complexPlaneViewer",
      content: `## Komplexe Zahlen — Definition & Gauß'sche Ebene

> **📖 Skript 03, Kapitel 3 + 4**

### Warum komplexe Zahlen?

In $\\mathbb{R}$ hat die Gleichung $x^2 = -1$ **keine Lösung**. Die komplexen Zahlen $\\mathbb{C}$ erweitern $\\mathbb{R}$ so, dass **jede** Polynomgleichung lösbar ist.

> **🎮 Interaktive Komponente:** Nutze den **ComplexPlaneViewer** unten, um komplexe Zahlen in der Gauß'schen Ebene darzustellen!

### Definition

$$\\mathbb{C} := \\mathbb{R} \\times \\mathbb{R} = \\{(a, b) \\mid a, b \\in \\mathbb{R}\\}$$

mit der **imaginären Einheit** $j := (0, 1)$, für die gilt: $j^2 = -1$

> **⚠️ Notation:** In der Mathematik meist $i$, in der Elektrotechnik $j$ (weil $i$ schon für Strom steht).

### Normalform

Jede komplexe Zahl schreibt sich als:
$$z = a + b \\cdot j$$

| Begriff | Symbol | Beschreibung |
|---|---|---|
| Realteil | $\\Re(z) = a$ | reelle Zahl |
| Imaginärteil | $\\Im(z) = b$ | reelle Zahl (ohne $j$!) |
| Konjugierte | $\\overline{z} = a - bj$ | Spiegelung an reeller Achse |

### Rechenregeln

**Addition:** $(a_1 + b_1j) + (a_2 + b_2j) = (a_1 + a_2) + (b_1 + b_2)j$

**Multiplikation:**
$$(a_1 + b_1j)(a_2 + b_2j) = (a_1a_2 - b_1b_2) + (a_1b_2 + a_2b_1)j$$

> Merke: $j^2 = -1$, daher $b_1j \\cdot b_2j = -b_1b_2$

**Konjugation:** $\\overline{z_1 + z_2} = \\overline{z_1} + \\overline{z_2}$ und $\\overline{z_1 \\cdot z_2} = \\overline{z_1} \\cdot \\overline{z_2}$

### Der Betrag

$$|z| := \\sqrt{a^2 + b^2} = \\sqrt{z \\cdot \\overline{z}}$$

**Wichtige Eigenschaften:**
- $|z| \\geq 0$, und $|z| = 0 \\iff z = 0$
- $|z_1 \\cdot z_2| = |z_1| \\cdot |z_2|$
- $z \\cdot \\overline{z} = |z|^2$

### Division

$$\\frac{z_1}{z_2} = \\frac{z_1 \\cdot \\overline{z_2}}{z_2 \\cdot \\overline{z_2}} = \\frac{z_1 \\cdot \\overline{z_2}}{|z_2|^2}$$

> **Trick:** Erweitere mit der konjugiert komplexen Zahl des Nenners!

**Beispiel:** $\\frac{1-2j}{4+3j} = \\frac{(1-2j)(4-3j)}{(4+3j)(4-3j)} = \\frac{-2-11j}{25} = -\\frac{2}{25} - \\frac{11}{25}j$`,
    },

    // --- Lektion 15: Polarform ---
    {
      id: "ma1-15-polarform",
      title: "Polarform komplexer Zahlen",
      duration: "30 min",
      type: "text",
      interactive: "complexFormConverter",
      content: `## Polarform komplexer Zahlen

> **📖 Skript 03, Kapitel 7**

### Versor-Schreibweise

Jede komplexe Zahl $z \\neq 0$ kann in Polarform dargestellt werden:

$$z = r \\cdot \\angle\\varphi = r(\\cos\\varphi + \\sin\\varphi \\cdot j)$$

mit $r = |z|$ (Abstand zum Ursprung) und $\\varphi$ (Winkel zur positiven reellen Achse).

> **🎮 Interaktive Komponente:** Nutze den **ComplexFormConverter** unten, um zwischen Normal- und Polarform umzurechnen!

### Umrechnung Normalform → Polarform

$$r = |z| = \\sqrt{a^2 + b^2}$$

$$\\varphi = \\begin{cases}
\\arccos\\left(\\frac{a}{r}\\right) & \\text{falls } b \\geq 0 \\\\
-\\arccos\\left(\\frac{a}{r}\\right) & \\text{falls } b < 0
\\end{cases}$$

### Umrechnung Polarform → Normalform

$$z = r\\angle\\varphi = r\\cos\\varphi + r\\sin\\varphi \\cdot j$$

### Multiplikation in Polarform

$$(r_1\\angle\\varphi_1) \\cdot (r_2\\angle\\varphi_2) = r_1r_2 \\angle(\\varphi_1 + \\varphi_2)$$

> **✨ Wunderschön:** Bei Multiplikation werden die Beträge multipliziert und die Winkel addiert!

### Division in Polarform

$$\\frac{r_1\\angle\\varphi_1}{r_2\\angle\\varphi_2} = \\frac{r_1}{r_2} \\angle(\\varphi_1 - \\varphi_2)$$

### Wichtige Winkel (ohne Taschenrechner!)

| Winkel $\\varphi$ | $\\cos\\varphi$ | $\\sin\\varphi$ | Versor |
|---|---|---|---|
| $0$ | $1$ | $0$ | $1$ |
| $\\frac{\\pi}{6}$ (30°) | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2} + \\frac{1}{2}j$ |
| $\\frac{\\pi}{4}$ (45°) | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}$ | $\\frac{\\sqrt{2}}{2}(1+j)$ |
| $\\frac{\\pi}{3}$ (60°) | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2} + \\frac{\\sqrt{3}}{2}j$ |
| $\\frac{\\pi}{2}$ (90°) | $0$ | $1$ | $j$ |
| $\\pi$ (180°) | $-1$ | $0$ | $-1$ |

> **🔑 Klausur-Tipp:** Ein Versor mit Real- oder Imaginärteil $\\pm\\frac{1}{2}$ hat immer einen Winkel, der ein Vielfaches von $\\frac{\\pi}{6}$ ist!`,
    },

    // --- Lektion 16: Potenzen & Wurzeln ---
    {
      id: "ma1-16-potenzen-wurzeln",
      title: "Potenzen, Wurzeln & Satz von de Moivre",
      duration: "30 min",
      type: "text",
      interactive: "complexPowerCalculator",
      content: `## Potenzen, Wurzeln & Satz von de Moivre

> **📖 Skript 03, Kapitel 7.4 + 7.5**

> **🎮 Interaktive Komponente:** Nutze den **ComplexPowerCalculator** zum Berechnen von Potenzen und Wurzeln!

### Potenzen (Formel von de Moivre)

$$(r\\angle\\varphi)^m = r^m \\angle(m \\cdot \\varphi) \\quad (m \\in \\mathbb{Z})$$

**Beispiel:** $(1+j)^{-10} = (\\sqrt{2}\\angle\\frac{\\pi}{4})^{-10} = (\\sqrt{2})^{-10}\\angle(-\\frac{10\\pi}{4}) = \\frac{1}{32}\\angle(-\\frac{\\pi}{2}) = -\\frac{1}{32}j$

### $n$-te Einheitswurzeln

Die Gleichung $x^n = 1$ hat genau $n$ Lösungen in $\\mathbb{C}$:

$$E_n = \\left\\{\\angle\\left(i \\cdot \\frac{2\\pi}{n}\\right) \\;\\middle|\\; i = 0, 1, \\ldots, n-1\\right\\}$$

Die Einheitswurzeln liegen **gleichmäßig verteilt** auf dem Einheitskreis!

### $n$-te Wurzeln (Satz von de Moivre)

Die Gleichung $x^n = r\\angle\\varphi$ hat genau $n$ Lösungen:

$$x_i = \\sqrt[n]{r} \\;\\angle\\left(\\frac{\\varphi + i \\cdot 2\\pi}{n}\\right) \\quad (i = 0, 1, \\ldots, n-1)$$

**Wichtig:** $\\sqrt[n]{r}$ ist die **reelle** $n$-te Wurzel (positiv).

**Beispiel: Dritte Wurzeln aus 8**

$x^3 = 8 = 8\\angle 0$

$$x_0 = 2\\angle 0 = 2$$
$$x_1 = 2\\angle\\frac{2\\pi}{3} = -1 + \\sqrt{3}j$$
$$x_2 = 2\\angle\\frac{4\\pi}{3} = -1 - \\sqrt{3}j$$

**Beispiel aus Klausur:** $z^8 - (3+j)z^4 + (2+2j) = 0$

Substitution $w = z^4$ → Quadratische Gleichung in $w$ → $w$-Wurzeln berechnen → dann 4-te Wurzeln aus jedem $w$.

> **🔑 Klausur-Tipp:** Bei Gleichungen wie $x^6 - 8(1+j) = 0$ zuerst $x^6 = 8(1+j)$ umstellen, dann $8(1+j)$ in Polarform bringen und de Moivre anwenden!`,
    },

    // --- Lektion 17: Polynome ---
    {
      id: "ma1-17-polynome",
      title: "Polynome & Fundamentalsatz der Algebra",
      duration: "30 min",
      type: "text",
      content: `## Polynome & Fundamentalsatz der Algebra

> **📖 Skript 03, Kapitel 8**

### Definition

Ein **Polynom** vom Grad $n$ über einem Körper $K$:
$$p(x) = a_n x^n + a_{n-1} x^{n-1} + \\cdots + a_1 x + a_0$$

$\\operatorname{grad}(p) = n$, falls $a_n \\neq 0$. $a_n$ heißt **Leitkoeffizient**, $a_0$ **Absolutglied**.

### Polynomdivision

Analog zur schriftlichen Division bei Zahlen. Für $a, b \\in K[x]$, $b \\neq 0$:
$$a = q \\cdot b + r \\quad \\text{mit } \\operatorname{grad}(r) < \\operatorname{grad}(b)$$

### Nullstellen und Linearfaktoren

**Satz 8.2:** $x_0$ ist Nullstelle von $p$ $\\iff$ $(x - x_0)$ teilt $p(x)$.

### Lemma von Gauß (Satz 8.3)

Für $p(x) \\in \\mathbb{Z}[x]$: Jede rationale Nullstelle $\\frac{t}{s}$ (gekürzt) erfüllt:
$$t \\mid a_0 \\quad \\text{und} \\quad s \\mid a_n$$

### Quadratische Polynome (p-q-Formel)

Für $x^2 + px + q = 0$:
$$x_{1/2} = -\\frac{p}{2} \\pm \\sqrt{\\left(\\frac{p}{2}\\right)^2 - q}$$

Die **Diskriminante** $D := p^2 - 4q$ entscheidet:
- $D > 0$: zwei reelle Nullstellen
- $D = 0$: eine doppelte reelle Nullstelle
- $D < 0$: zwei komplex konjugierte Nullstellen

### Fundamentalsatz der Algebra

> **Satz 8.4/8.5:** Jedes nichtkonstante Polynom $p \\in \\mathbb{C}[x]$ zerfällt in Linearfaktoren:
> $$p(x) = a_n(x - \\lambda_1)(x - \\lambda_2)\\cdots(x - \\lambda_n)$$

Ein Polynom vom Grad $n$ hat also **genau $n$ Nullstellen** in $\\mathbb{C}$ (mit Vielfachheit gezählt)!

### Faktorisierung über $\\mathbb{R}$

**Satz 8.6:** Ist $\\lambda \\in \\mathbb{C}$ Nullstelle von $p \\in \\mathbb{R}[x]$, dann auch $\\overline{\\lambda}$.

Falls $\\lambda \\notin \\mathbb{R}$:
$$(x - \\lambda)(x - \\overline{\\lambda}) = x^2 - 2\\Re(\\lambda)x + |\\lambda|^2 \\in \\mathbb{R}[x]$$

ist irreduzibel in $\\mathbb{R}[x]$.

> **🔑 Klausur-Tipp:** Suche zuerst nach **rationalen Nullstellen** mit Lemma von Gauß, dann Polynomdivision, dann p-q-Formel für den quadratischen Rest.`,
    },

    // =========================================================================
    // TEIL 4: ALTKLAUSUREN (11 Klausuren, 66 Einzel-Lektionen mit group)
    // =========================================================================
    ...mathe1AltklausurLessons,

    // =========================================================================
    // ÜBUNGSAUFGABEN (Leicht / Mittel / Schwer / Prüfung)
    // =========================================================================
    ...createExerciseLessons(
      "adv-mathe1",
      "Mathematik 1 Grundlagen",
      {
        easy: "Einfache Grundlagen-Aufgaben zu Mengen, Summen und grundlegenden Rechenoperationen. Perfekt zum Aufwärmen.",
        medium: "Mittelschwere Aufgaben mit vollständiger Induktion, Ungleichungen und Grenzwerten. Hier wird's interessant!",
        hard: "Schwere Aufgaben zu komplexen Zahlen, Polynomen und fortgeschrittenen Grenzwerten. Klausur-Niveau!",
      }
    ),
  ],
};
