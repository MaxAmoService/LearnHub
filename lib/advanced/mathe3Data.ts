// =============================================================================
// Erweitert — Mathematik 3 — Lineare Algebra
// Vollständiges Modul: 11 Theorie-Lektionen + 9 Altklausuren (2018–2025)
// =============================================================================

import { Module } from "../types";
import { createExerciseLessons } from "../lessonHelpers";
import { mathe3AltklausurLessons } from "./mathe3Altklausuren";

export const advMathe3Module: Module = {
  id: "adv-mathe3",
  slug: "adv-mathe3",
  title: "Mathematik 3 — Lineare Algebra",
  description:
    "Lineare Algebra: Lineare Gleichungssysteme, Vektorräume, lineare Abbildungen, Matrizen, Skalarprodukte, Orthogonalisierung, Determinanten, Eigenwerte, Jordan'sche Normalform. Mit 9 Altklausuren (2018–2025) inkl. ausführlicher Lösungen.",
  icon: "📊",
  color: "#EC4899",
  progress: 0,
  category: "advanced",
  lessons: [
    // =========================================================================
    // TEIL 1: GRUNDLAGEN DER LINEAREN ALGEBRA
    // =========================================================================

    // --- Lektion 1: Lineare Gleichungssysteme ---
    {
      id: "ma3-01-lineare-gleichungssysteme",
      title: "Lineare Gleichungssysteme & das Gauß'sche Eliminationsverfahren",
      duration: "35 min",
      type: "text",
      content: `## Lineare Gleichungssysteme & Gauß'sches Eliminationsverfahren

Lineare Gleichungssysteme (LGS) sind das Fundament der linearen Algebra. Das Gauß'sche Eliminationsverfahren ist DER zentrale Algorithmus — er taucht in jeder Klausur auf!

---

### Was ist ein lineares Gleichungssystem?

Ein LGS mit $m$ Gleichungen und $n$ Unbekannten hat die Form:

$$a_{11}x_1 + a_{12}x_2 + \\cdots + a_{1n}x_n = b_1$$
$$a_{21}x_1 + a_{22}x_2 + \\cdots + a_{2n}x_n = b_2$$
$$\\vdots$$
$$a_{m1}x_1 + a_{m2}x_2 + \\cdots + a_{mn}x_n = b_m$$

Dabei ist $a_{ij} \\in \\mathbb{R}$ (oder $\\mathbb{C}$) der Koeffizient der $j$-ten Unbekannten in der $i$-ten Gleichung, und $b_i$ die rechte Seite.

### Koeffizientenmatrix & erweiterte Koeffizientenmatrix

Die **Koeffizientenmatrix** $A$ enthält nur die Koeffizienten:

$$A = \\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{pmatrix}$$

Die **erweiterte Koeffizientenmatrix** $(A|b)$ enthält zusätzlich die rechte Seite:

$$(A|b) = \\begin{pmatrix} a_{11} & \\cdots & a_{1n} & | & b_1 \\\\ \\vdots & \\ddots & \\vdots & | & \\vdots \\\\ a_{m1} & \\cdots & a_{mn} & | & b_m \\end{pmatrix}$$

---

### Elementare Zeilenumformungen (Äquivalenztransformationen)

Zwei LGS sind **äquivalent**, wenn sie die gleiche Lösungsmenge haben. Folgende Operationen erhalten die Lösungsmenge:

| Nr. | Operation | Beschreibung |
|-----|-----------|--------------|
| Z1 | $Z_i \\leftrightarrow Z_j$ | Zwei Zeilen vertauschen |
| Z2 | $Z_i \\to \\lambda \\cdot Z_i$ ($\\lambda \\neq 0$) | Zeile mit Skalar multiplizieren |
| Z3 | $Z_i \\to Z_i + \\lambda \\cdot Z_j$ | Vielfaches einer anderen Zeile addieren |

> **⚠️ Achtung:** $\\lambda = 0$ ist bei Z2 NICHT erlaubt!

---

### Das Gauß'sche Eliminationsverfahren

**Ziel:** Die erweiterte Koeffizientenmatrix durch elementare Zeilenumformungen auf **Zeilenstufenform** (ESHELON) bringen.

**Algorithmus (Vorwärtselimination):**
1. Wähle die linkeste Spalte mit einem Nicht-Null-Eintrag (Pivot-Spalte)
2. Wähle eine Zeile mit Nicht-Null-Eintrag in dieser Spalte als Pivot-Zeile
3. Vertausche ggf., um die Pivot-Zeile nach oben zu bringen
4. Eliminiere alle Einträge unterhalb des Pivots durch Zeilensubtraktion
4. Wiederhole für die verbleibende Unter-Matrix

**Zeilenstufenform (Row Echelon Form):**
- Alle Nullzeilen stehen unten
- Jede Pivot-Spalte liegt rechts des Pivots der Zeile darüber
- Alle Einträge unterhalb eines Pivots sind Null

**Reduced Row Echelon Form (Gauss-Jordan):**
- Zusätzlich: Alle Einträge überhalb der Pivots sind ebenfalls Null
- Alle Pivots sind gleich 1

---

### Lösungsarten

Nach dem Gauß-Verfahren ergibt sich genau einer von drei Fällen:

| Fall | Bedeutung | Lösung |
|------|-----------|--------|
| **Rang = n**, keine Widerspruchszeile | Eindeutige Lösung | Genau eine Lösung |
| **Rang < n**, keine Widerspruchszeile | Unendlich viele Lösungen | Freie Variablen → Parameterdarstellung |
| Widerspruchszeile ($0 = c$, $c \\neq 0$) | Widerspruch | Keine Lösung |

**Widerspruchszeile:** Eine Zeile der Form $(0, 0, \\ldots, 0 \\mid c)$ mit $c \\neq 0$.

---

### Homogene und inhomogene LGS

**Homogenes LGS:** $Ax = 0$ — hat immer die **triviale Lösung** $x = 0$.

Eigenschaften:
- Immer mindestens eine Lösung
- Genau dann nur die triviale Lösung, wenn $\\operatorname{rang}(A) = n$
- Sonst: Lösungsraum ist ein Untervektorraum (Nullraum/Kern)

**Inhomogenes LGS:** $Ax = b$ mit $b \\neq 0$.

Zusammenhang: Lösung von $Ax = b$ = **partikuläre Lösung** + **Lösung des homogenen Systems**

$$L_{inhom} = x_p + L_{hom}$$

---

### Parameterdarstellung der Lösung

Bei unendlich vielen Lösungen: Führe **freie Variablen** als Parameter ein.

**Beispiel:**

$$\\begin{pmatrix} 1 & 2 & 1 & | & 3 \\\\ 0 & 1 & -1 & | & 1 \\\\ 0 & 0 & 0 & | & 0 \\end{pmatrix}$$

Rang = 2, n = 3 → 1 freie Variable. Setze $x_3 = t$:
- Aus Zeile 2: $x_2 = 1 + t$
- Aus Zeile 1: $x_1 = 3 - 2(1+t) - t = 1 - 3t$

**Lösung:** $x = \\begin{pmatrix} 1 \\\\ 1 \\\\ 0 \\end{pmatrix} + t \\begin{pmatrix} -3 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad t \\in \\mathbb{R}$

---

### Rang einer Matrix

Der **Rang** $\\operatorname{rang}(A)$ ist die Anzahl der Pivot-Elemente nach Gauß-Reduktion.

Äquivalente Charakterisierungen:
- Maximale Anzahl linear unabhängiger Zeilen/Spalten
- Dimension des Bildes/Spaltenraums
- Anzahl der Nicht-Null-Zeilen in Zeilenstufenform

---

### 💡 Klausur-Tipp

> **1.** Schreibe IMMER die erweiterte Koeffizientenmatrix auf!
> **2.** Arbeite systematisch Spalte für Spalte von links nach rechts.
> **3.** Prüfe am Ende: Stimmt die Anzahl der freien Variablen mit $n - \\operatorname{rang}(A)$ überein?
> **4.** Setze die Lösung PROBEHALBER in die ursprünglichen Gleichungen ein!
> **5.** Bei Parameteraufgaben: Formuliere die Lösung immer als $x = x_p + t_1 v_1 + \\cdots + t_k v_k$.`,
    },

    // --- Lektion 2: Vektorräume ---
    {
      id: "ma3-02-vektorraeume",
      title: "Vektorräume — Definition, Teilräume & Erzeugendensysteme",
      duration: "30 min",
      type: "text",
      content: `## Vektorräume — Definition, Teilräume & Erzeugendensysteme

Vektorräume sind die abstrakte Verallgemeinerung von $\\mathbb{R}^n$. Sie bilden das zentrale algebraische Grundgerüst der gesamten linearen Algebra.

---

### Definition eines Vektorraums

Sei $K$ ein Körper (z.B. $\\mathbb{R}$ oder $\\mathbb{C}$). Ein **$K$-Vektorraum** $(V, +, \\cdot)$ ist eine Menge $V$ mit zwei Verknüpfungen:

**Addition** $+: V \\times V \\to V$ und **Skalarmultiplikation** $\\cdot: K \\times V \\to V$

die folgende Axiome erfüllen:

| Axiom | Gleichung |
|-------|-----------|
| Kommutativität | $v + w = w + v$ |
| Assoziativität | $(v + w) + u = v + (w + u)$ |
| Nullelement | $\\exists\\, 0 \\in V: v + 0 = v$ |
| Inverse | $\\forall\\, v \\in V\\; \\exists\\, (-v): v + (-v) = 0$ |
| Einselement | $1 \\cdot v = v$ |
| Skalar-Assoziativität | $\\alpha(\\beta v) = (\\alpha\\beta)v$ |
| Distributivität I | $\\alpha(v + w) = \\alpha v + \\alpha w$ |
| Distributivität II | $(\\alpha + \\beta)v = \\alpha v + \\beta v$ |

---

### Beispiele für Vektorräume

| Vektorraum | Körper | Beschreibung |
|------------|--------|--------------|
| $K^n$ | $K$ | Spaltenvektoren der Länge $n$ |
| $K^{m \\times n}$ | $K$ | $m \\times n$-Matrizen über $K$ |
| $K[x]$ | $K$ | Polynome über $K$ |
| $K_n[x]$ | $K$ | Polynome vom Grad $\\leq n$ |
| $\\mathbb{C}$ | $\\mathbb{R}$ | Komplexe Zahlen als $\\mathbb{R}$-Vektorraum |
| $C([a,b])$ | $\\mathbb{R}$ | Stetige Funktionen auf $[a,b]$ |

> **Wichtig:** $\\mathbb{C}$ ist ein $\\mathbb{R}$-Vektorraum der Dimension 2 (Basis: $\\{1, i\\}$), aber ein $\\mathbb{C}$-Vektorraum der Dimension 1!

---

### Untervektorräume (Teilräume)

Eine Teilmenge $U \\subseteq V$ ist ein **Untervektorraum** (kurz: UVR), wenn:

1. $U \\neq \\emptyset$ (insbesondere $0 \\in U$)
2. $u, v \\in U \\Rightarrow u + v \\in U$ (Abgeschlossenheit bzgl. Addition)
3. $\\alpha \\in K, u \\in U \\Rightarrow \\alpha u \\in U$ (Abgeschlossenheit bzgl. Skalarmultiplikation)

**Prüfsatz:** $U \\neq \\emptyset$ ist UVR $\\iff$ $\\forall\\, u, v \\in U, \\forall\\, \\alpha, \\beta \\in K: \\alpha u + \\beta v \\in U$

---

### Beispiele für Untervektorräume

In $\\mathbb{R}^3$:

| Menge | UVR? | Begründung |
|-------|------|------------|
| $\\{(x, y, 0)^T \\mid x, y \\in \\mathbb{R}\\}$ | Ja | $xy$-Ebene |
| $\\{(x, y, 1)^T \\mid x, y \\in \\mathbb{R}\\}$ | Nein | $0 \\notin U$ |
| $\\{(x, 0, 0)^T \\mid x \\in \\mathbb{R}\\}$ | Ja | $x$-Achse |
| $\\{(x, y, z)^T \\mid x + y + z = 0\\}$ | Ja | Ebene durch Ursprung |
| $\\{(x, y, z)^T \\mid x + y + z = 1\\}$ | Nein | $0 \\notin U$ |

---

### Lineare Hülle (Span)

Die **lineare Hülle** oder der **Span** von Vektoren $v_1, \\ldots, v_k \\in V$ ist:

$$\\operatorname{span}(v_1, \\ldots, v_k) = \\{\\alpha_1 v_1 + \\cdots + \\alpha_k v_k \\mid \\alpha_1, \\ldots, \\alpha_k \\in K\\}$$

Eigenschaften:
- $\\operatorname{span}(v_1, \\ldots, v_k)$ ist immer ein Untervektorraum
- Es ist der **kleinste** UVR, der $v_1, \\ldots, v_k$ enthält
- $\\operatorname{span}(\\emptyset) = \\{0\\}$

---

### Erzeugendensystem

Die Vektoren $v_1, \\ldots, v_k$ **erzeugen** $V$, wenn $V = \\operatorname{span}(v_1, \\ldots, v_k)$.

Man schreibt: $V = \\langle v_1, \\ldots, v_k \\rangle$ oder $V = \\operatorname{span}(v_1, \\ldots, v_k)$

**Beispiele:**

| Vektorraum | Erzeugendensystem |
|------------|-------------------|
| $\\mathbb{R}^3$ | $\\{e_1, e_2, e_3\\}$ (Standardbasis) |
| $\\mathbb{R}^2$ | $\\{(1,0)^T, (0,1)^T\\}$, aber auch $\\{(1,0)^T, (1,1)^T\\}$ |
| $K_2[x]$ | $\\{1, x, x^2\\}$ |

---

### Wichtige Folgerungen

- Jede endlich erzeugte Menge ist ein UVR
- $\\mathbb{R}^n$ wird von $n$ Vektoren erzeugt (Standardbasis)
- Erzeugendensysteme sind nicht eindeutig — es gibt viele verschiedene!
- Die **Schnittmenge** zweier UVR ist immer ein UVR
- Die **Vereinigung** zweier UVR ist im Allgemeinen KEIN UVR

---

### 💡 Klausur-Tipp

> **1.** Um zu prüfen, ob $U$ ein UVR ist: Zeige $0 \\in U$ und $\\alpha u + \\beta v \\in U$.
> **2.** Die Vereinigung $U_1 \\cup U_2$ ist nur ein UVR, wenn $U_1 \\subseteq U_2$ oder $U_2 \\subseteq U_1$!
> **3.** In der Klausur: „Ist $\\{(x,y,z)^T \\mid x^2 + y^2 + z^2 = 0\\}$ ein UVR?" → Ja, denn es ist nur $\\{0\\}$!`,
    },

    // --- Lektion 3: Lineare Unabhängigkeit & Basen ---
    {
      id: "ma3-03-lineare-abhaengigkeit",
      title: "Lineare Unabhängigkeit & Basen",
      duration: "30 min",
      type: "text",
      content: `## Lineare Unabhängigkeit & Basen

Lineare Unabhängigkeit und Basen sind die zentralen Werkzeuge, um Vektorräume zu „messen" und zu strukturieren. Die Dimension ist das wichtigste Invariante eines endlich erzeugten Vektorraums.

---

### Lineare Unabhängigkeit

**Definition:** Die Vektoren $v_1, \\ldots, v_k \\in V$ heißen **linear unabhängig**, wenn aus

$$\\alpha_1 v_1 + \\alpha_2 v_2 + \\cdots + \\alpha_k v_k = 0$$

stets $\\alpha_1 = \\alpha_2 = \\cdots = \\alpha_k = 0$ folgt (triviale Darstellung der Null).

**Linear abhängig:** Es existieren Skalare $\\alpha_i$, nicht alle Null, mit $\\alpha_1 v_1 + \\cdots + \\alpha_k v_k = 0$.

Das bedeutet: Mindestens ein Vektor lässt sich als Linearkombination der anderen darstellen!

---

### Prüfung auf lineare Unabhängigkeit

**Methode über Gauß:** Schreibe die Vektoren als Spalten einer Matrix und forme auf Zeilenstufenform:

$$\\alpha_1 v_1 + \\cdots + \\alpha_k v_k = 0 \\quad\\iff\\quad A\\alpha = 0$$

- Genau dann linear unabhängig, wenn $\\operatorname{rang}(A) = k$ (Anzahl der Vektoren)
- Linear abhängig, wenn $\\operatorname{rang}(A) < k$

**Beispiel:**

Seien $v_1 = (1, 2, 3)^T$, $v_2 = (4, 5, 6)^T$, $v_3 = (7, 8, 9)^T$.

$$A = \\begin{pmatrix} 1 & 4 & 7 \\\\ 2 & 5 & 8 \\\\ 3 & 6 & 9 \\end{pmatrix} \\to \\begin{pmatrix} 1 & 4 & 7 \\\\ 0 & -3 & -6 \\\\ 0 & 0 & 0 \\end{pmatrix}$$

$\\operatorname{rang}(A) = 2 < 3$ → die Vektoren sind linear abhängig!

Tatsächlich: $v_3 = -v_1 + 2v_2$

---

### Basis

**Definition:** Eine Menge $\\{v_1, \\ldots, v_n\\}$ heißt **Basis** von $V$, wenn:
1. $v_1, \\ldots, v_n$ linear unabhängig sind, UND
2. $V = \\operatorname{span}(v_1, \\ldots, v_n)$ (sie erzeugen $V$)

Äquivalent: $\\{v_1, \\ldots, v_n\\}$ ist eine Basis $\\iff$ jeder Vektor $v \\in V$ sich **eindeutig** als Linearkombination darstellen lässt:

$$v = \\alpha_1 v_1 + \\alpha_2 v_2 + \\cdots + \\alpha_n v_n$$

Die Koeffizienten $\\alpha_1, \\ldots, \\alpha_n$ heißen **Koordinaten** von $v$ bzgl. dieser Basis.

---

### Standardbasis

Die **Standardbasis** von $K^n$ ist:

$$e_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ \\vdots \\\\ 0 \\end{pmatrix}, \\quad e_2 = \\begin{pmatrix} 0 \\\\ 1 \\\\ \\vdots \\\\ 0 \\end{pmatrix}, \\quad \\ldots, \\quad e_n = \\begin{pmatrix} 0 \\\\ 0 \\\\ \\vdots \\\\ 1 \\end{pmatrix}$$

Eigenschaften: $e_i$ hat eine 1 an der $i$-ten Stelle und sonst Nullen.

---

### Dimension

**Satz:** Alle Basen eines endlich erzeugten Vektorraums haben die **gleiche** Anzahl von Elementen.

Diese Zahl heißt **Dimension** von $V$: $\\dim(V) = n$.

| Vektorraum | Dimension |
|------------|-----------|
| $\\{0\\}$ | 0 |
| $K^n$ | $n$ |
| $K^{m \\times n}$ | $m \\cdot n$ |
| $K_n[x]$ | $n + 1$ |
| $K[x]$ | $\\infty$ |
| $\\mathbb{C}$ als $\\mathbb{R}$-Vektorraum | 2 |

---

### Wichtige Sätze

**Satz:** Sei $\\dim(V) = n$. Dann sind äquivalent:
1. $v_1, \\ldots, v_n$ sind linear unabhängig
2. $v_1, \\ldots, v_n$ bilden eine Basis
3. $v_1, \\ldots, v_n$ erzeugen $V$

**Satz (Erweiterung):** Jedes linear unabhängige System lässt sich zu einer Basis ergänzen.

**Satz:** Ist $U \\subseteq V$ ein UVR, so gilt: $\\dim(U) \\leq \\dim(V)$, und Gleichheit $\\iff$ $U = V$.

---

### Koordinatenvektoren

Für eine Basis $B = \\{b_1, \\ldots, b_n\\}$ von $V$ und $v \\in V$:

$$v = \\alpha_1 b_1 + \\cdots + \\alpha_n b_n \\quad\\iff\\quad [v]_B = \\begin{pmatrix} \\alpha_1 \\\\ \\vdots \\\\ \\alpha_n \\end{pmatrix}$$

Die Zuordnung $v \\mapsto [v]_B$ ist ein **Isomorphismus** $V \\to K^n$.

---

### 💡 Klausur-Tipp

> **1.** Um Basis zu prüfen: Prüfe linear unabhängigkeit UND Erzeugung.
> **2.** Bei $n$ Vektoren in $K^n$: Reicht es, $\\det(A) \\neq 0$ zu prüfen!
> **3.** Merke: In $K^n$ sind genau $n$ linear unabhängige Vektoren eine Basis.
> **4.** Erweiterungssatz: Aus $k < n$ unabhängigen Vektoren kannst du IMMER $n-k$ weitere finden, um eine Basis zu erhalten.`,
    },

    // --- Lektion 4: Lineare Abbildungen ---
    {
      id: "ma3-04-lineare-abbildungen",
      title: "Lineare Abbildungen & ihre Matrizen",
      duration: "35 min",
      type: "text",
      content: `## Lineare Abbildungen & ihre Matrizen

Lineare Abbildungen sind die strukturerhaltenden Abbildungen zwischen Vektorräumen. Ihre Matrizen-Darstellung ermöglicht konkrete Berechnungen.

---

### Definition einer linearen Abbildung

Eine Abbildung $f: V \\to W$ zwischen $K$-Vektorräumen heißt **linear**, wenn:

1. $f(v_1 + v_2) = f(v_1) + f(v_2)$ für alle $v_1, v_2 \\in V$ (Additivität)
2. $f(\\alpha v) = \\alpha f(v)$ für alle $\\alpha \\in K$, $v \\in V$ (Homogenität)

Zusammengefasst: $f(\\alpha v_1 + \\beta v_2) = \\alpha f(v_1) + \\beta f(v_2)$

---

### Beispiele

| Abbildung | Linear? | Begründung |
|-----------|---------|------------|
| $f(x) = 2x$ | Ja | $f(x_1 + x_2) = 2(x_1+x_2) = f(x_1)+f(x_2)$ |
| $f(x) = x^2$ | Nein | $f(x_1+x_2) = (x_1+x_2)^2 \\neq x_1^2 + x_2^2$ |
| $f(x) = x + 1$ | Nein | $f(0) = 1 \\neq 0$ |
| $f(x) = Ax$ ($A$ Matrix) | Ja | Matrixmultiplikation ist linear |
| $\\frac{d}{dx}: K_n[x] \\to K_{n-1}[x]$ | Ja | Ableitung ist linear |
| $\\int_0^1 f(x)\\,dx: C[0,1] \\to \\mathbb{R}$ | Ja | Integral ist linear |

> **Merke:** $f(0) = 0$ gilt für Jede lineare Abbildung! (Setze $\\alpha = 0$.)

---

### Kern und Bild

**Kern (Nullraum):**
$$\\ker(f) = \\{v \\in V \\mid f(v) = 0\\}$$

**Bild (Wertebereich):**
$$\\operatorname{im}(f) = \\{f(v) \\mid v \\in V\\} = f(V)$$

| Eigenschaft | Kern | Bild |
|-------------|------|------|
| Unterraum von | $V$ | $W$ |
| Dimension | $\\dim(\\ker(f))$ | $\\dim(\\operatorname{im}(f))$ |
| Name | Defektraum | Rang |

---

### Rang-Nullstelle-Satz (Dimensionssatz)

$$\\dim(V) = \\dim(\\ker(f)) + \\dim(\\operatorname{im}(f))$$

$$n = \\dim(\\ker(f)) + \\operatorname{rang}(f)$$

Dies ist einer der wichtigsten Sätze der linearen Algebra!

---

### Injektivität, Surjektivität, Bijektivität

| Eigenschaft | Charakterisierung |
|-------------|-------------------|
| **Injektiv** | $\\ker(f) = \\{0\\}$, d.h. $\\dim(\\ker(f)) = 0$ |
| **Surjektiv** | $\\operatorname{im}(f) = W$, d.h. $\\operatorname{rang}(f) = \\dim(W)$ |
| **Bijektiv** | injektiv + surjektiv |

Für $f: V \\to W$ mit $\\dim(V) = \\dim(W) = n$ gilt:

$$f \\text{ injektiv} \\iff f \\text{ surjektiv} \\iff f \\text{ bijektiv}$$

---

### Matrixdarstellung einer linearen Abbildung

Sei $B = \\{b_1, \\ldots, b_n\\}$ Basis von $V$ und $C = \\{c_1, \\ldots, c_m\\}$ Basis von $W$.

Die **Darstellungsmatrix** $M_C^B(f)$ hat als Spalten die Koordinatenvektoren von $f(b_j)$ bzgl. $C$:

$$M_C^B(f) = \\begin{pmatrix} [f(b_1)]_C & [f(b_2)]_C & \\cdots & [f(b_n)]_C \\end{pmatrix}$$

Die $j$-te Spalte enthält die Koordinaten von $f(b_j)$ in der Basis $C$.

**Bild-Berechnung:**

$$[f(v)]_C = M_C^B(f) \\cdot [v]_B$$

Das Bild eines Vektors wird durch Multiplikation mit der Darstellungsmatrix berechnet!

---

### Beispiel

$f: \\mathbb{R}^2 \\to \\mathbb{R}^3$, $f\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} x + y \\\\ 2x \\\\ x - y \\end{pmatrix}$

Mit Standardbasen:

$$M(f) = \\begin{pmatrix} 1 & 1 \\\\ 2 & 0 \\\\ 1 & -1 \\end{pmatrix}$$

Denn: $f(e_1) = (1, 2, 1)^T$ und $f(e_2) = (1, 0, -1)^T$.

---

### Rang der Darstellungsmatrix

$$\\operatorname{rang}(f) = \\operatorname{rang}(M_C^B(f))$$

Der Rang der Matrix ist unabhängig von der Wahl der Basen!

---

### 💡 Klausur-Tipp

> **1.** Prüfe IMMER zuerst $f(0) = 0$ — wenn nicht, ist $f$ nicht linear!
> **2.** Für den Kern: Löse $M \\cdot x = 0$ (homogenes Gleichungssystem).
> **3.** Für das Bild: Bestimme die Spalten der Darstellungsmatrix (= Bilder der Basisvektoren).
> **4.** Nutze den Rang-Nullstelle-Satz als Kontrolle: $n = \\dim(\\ker) + \\operatorname{rang}$!`,
    },

    // --- Lektion 5: Matrizenmultiplikation ---
    {
      id: "ma3-05-matrizenmultiplikation",
      title: "Matrizenmultiplikation & Verkettung",
      duration: "30 min",
      type: "text",
      content: `## Matrizenmultiplikation & Verkettung

Die Matrizenmultiplikation entspricht der Verkettung (Komposition) linearer Abbildungen. Sie ist die wichtigste Operation auf Matrizen.

---

### Definition der Matrizenmultiplikation

Sei $A \\in K^{m \\times n}$ und $B \\in K^{n \\times p}$. Das Produkt $C = AB \\in K^{m \\times p}$ hat die Einträge:

$$c_{ik} = \\sum_{j=1}^{n} a_{ij} b_{jk} = a_{i1}b_{1k} + a_{i2}b_{2k} + \\cdots + a_{in}b_{nk}$$

**Regel:** Zeile $i$ von $A$ wird mit Spalte $k$ von $B$ skalar multipliziert.

**Dimensionsregel:** $(m \\times n) \\cdot (n \\times p) = (m \\times p)$

Die innere Dimension $n$ muss übereinstimmen!

---

### Zeilen-Spalten-Schreibweise

$$AB = \\begin{pmatrix} — z_1(A) — \\\\ — z_2(A) — \\\\ \\vdots \\\\ — z_m(A) — \\end{pmatrix} \\cdot \\begin{pmatrix} | & | & & | \\\\ s_1(B) & s_2(B) & \\cdots & s_p(B) \\\\ | & | & & | \\end{pmatrix}$$

Der Eintrag $(i,k)$ ist das Skalarprodukt der $i$-ten Zeile von $A$ mit der $k$-ten Spalte von $B$.

---

### Verkettung linearer Abbildungen

Seien $f: V \\to W$ und $g: W \\to U$ linear. Dann ist $g \\circ f: V \\to U$ linear und:

$$M_U^C(g \\circ f) = M_U^D(g) \\cdot M_C^D(f)$$

Wobei $C$ Basis von $V$, $D$ Basis von $W$, und die Basis von $U$ entsprechend gewählt ist.

**Wichtig:** Die Reihenfolge stimmt überein — Verkettung = Matrizenmultiplikation!

---

### Rechenregeln

| Regel | Gleichung |
|-------|-----------|
| Assoziativität | $(AB)C = A(BC)$ |
| Distributivität | $A(B+C) = AB + AC$ |
| Skalarmultiplikation | $\\alpha(AB) = (\\alpha A)B = A(\\alpha B)$ |
| Einselement | $AE = EA = A$ |
| Nullmatrix | $A0 = 0A = 0$ |

**NICHT gelten:**
- **Kommutativität:** Im Allgemeinen $AB \\neq BA$!
- **Kürzen:** $AB = AC$ und $A \\neq 0$ folgt NICHT $B = C$!

---

### Beispiel: Additionstheoreme via Rotationsmatrizen

Die **Rotationsmatrix** um den Winkel $\\alpha$ in $\\mathbb{R}^2$:

$$R_\\alpha = \\begin{pmatrix} \\cos\\alpha & -\\sin\\alpha \\\\ \\sin\\alpha & \\cos\\alpha \\end{pmatrix}$$

Rotation um $\\alpha$ und dann um $\\beta$ ergibt Rotation um $\\alpha + \\beta$:

$$R_{\\alpha+\\beta} = R_\\beta \\cdot R_\\alpha$$

Ausmultiplizieren liefert die **Additionstheoreme**:

$$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$$
$$\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$$

> **Elegant:** Die Additionstheoreme folgen direkt aus der Matrizenmultiplikation!

---

### Transponierte Matrix

Für $A = (a_{ij}) \\in K^{m \\times n}$ ist $A^T \\in K^{n \\times m}$ definiert durch:

$$(A^T)_{ij} = a_{ji}$$

Spalten werden zu Zeilen und umgekehrt.

**Rechenregeln:**

| Regel | Gleichung |
|-------|-----------|
| Doppelte Transposition | $(A^T)^T = A$ |
| Addition | $(A+B)^T = A^T + B^T$ |
| Multiplikation | $(AB)^T = B^T A^T$ |
| Skalarmultiplikation | $(\\alpha A)^T = \\alpha A^T$ |

> **⚠️ Achtung:** Bei der Multiplikation wird die Reihenfolge vertauscht!

---

### Blockmultiplikation

Matrizen können in Blöcke zerlegt und dann multipliziert werden, sofern die Blockgrößen kompatibel sind:

$$\\begin{pmatrix} A_{11} & A_{12} \\\\ A_{21} & A_{22} \\end{pmatrix} \\begin{pmatrix} B_{11} & B_{12} \\\\ B_{21} & B_{22} \\end{pmatrix} = \\begin{pmatrix} A_{11}B_{11}+A_{12}B_{21} & A_{11}B_{12}+A_{12}B_{22} \\\\ A_{21}B_{11}+A_{22}B_{21} & A_{21}B_{12}+A_{22}B_{22} \\end{pmatrix}$$

---

### 💡 Klausur-Tipp

> **1.** Matrizenmultiplikation: Zeile $\\times$ Spalte — denke an „Zeilenfisch schwimmt durch Spaltenwald"!
> **2.** $(AB)^T = B^T A^T$ — Reihenfolge UMKEHREN!
> **3.** Kommutativität gilt NICHT — prüfe immer, welche Reihenfolge gemeint ist!
> **4.** Rotationsmatrizen: Multiplikation = Winkeladdition. Sehr beliebt in Klausuren!`,
    },

    // --- Lektion 6: Invertierbare Matrizen ---
    {
      id: "ma3-06-invertierbare-matrizen",
      title: "Invertierbare Matrizen & inverse Abbildungen",
      duration: "30 min",
      type: "text",
      content: `## Invertierbare Matrizen & inverse Abbildungen

Invertierbare Matrizen sind die „bijektiven Elemente" der Matrixalgebra. Sie entsprechen umkehrbaren linearen Abbildungen.

---

### Definition

Eine Matrix $A \\in K^{n \\times n}$ heißt **regulär** oder **invertierbar**, wenn es eine Matrix $B$ gibt mit:

$$AB = BA = E_n$$

wobei $E_n$ die $n \\times n$-Einheitsmatrix ist. Die Matrix $B$ heißt **inverse Matrix** von $A$, geschrieben $A^{-1}$.

**Singulär:** Eine nicht invertierbare Matrix heißt **singulär**.

---

### Einheitsmatrix und Kronecker-Delta

Die **Einheitsmatrix** $E_n$ hat Einsen auf der Diagonalen und Nullen sonst:

$$(E_n)_{ij} = \\delta_{ij} = \\begin{cases} 1 & \\text{falls } i = j \\\\ 0 & \\text{falls } i \\neq j \\end{cases}$$

$\\delta_{ij}$ heißt **Kronecker-Delta**. Es gilt: $E_n \\cdot A = A \\cdot E_n = A$ für alle $A \\in K^{n \\times n}$.

---

### Berechnung der inversen Matrix

**Methode (Gauß-Jordan):** Bilde die erweiterte Matrix $(A \\mid E)$ und forme sie mit Zeilenumformungen auf $(E \\mid A^{-1})$:

$$(A \\mid E) \\xrightarrow{\\text{Gauß-Jordan}} (E \\mid A^{-1})$$

Falls auf der linken Seite kein $E$ entsteht, ist $A$ nicht invertierbar.

**Beispiel:**

$$A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$$

$$(A \\mid E) = \\begin{pmatrix} 2 & 1 & | & 1 & 0 \\\\ 5 & 3 & | & 0 & 1 \\end{pmatrix} \\xrightarrow{Z_2 - \\frac{5}{2}Z_1} \\begin{pmatrix} 2 & 1 & | & 1 & 0 \\\\ 0 & \\frac{1}{2} & | & -\\frac{5}{2} & 1 \\end{pmatrix}$$

$$\\xrightarrow{Z_2 \\cdot 2} \\begin{pmatrix} 2 & 1 & | & 1 & 0 \\\\ 0 & 1 & | & -5 & 2 \\end{pmatrix} \\xrightarrow{Z_1 - Z_2} \\begin{pmatrix} 2 & 0 & | & 6 & -2 \\\\ 0 & 1 & | & -5 & 2 \\end{pmatrix}$$

$$\\xrightarrow{Z_1 / 2} \\begin{pmatrix} 1 & 0 & | & 3 & -1 \\\\ 0 & 1 & | & -5 & 2 \\end{pmatrix}$$

$$A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$$

---

### Kriterien für Invertierbarkeit

Für $A \\in K^{n \\times n}$ sind äquivalent:
1. $A$ ist regulär (invertierbar)
2. $\\operatorname{rang}(A) = n$
3. $Ax = 0$ hat nur die triviale Lösung ($\\ker(A) = \\{0\\}$)
4. $Ax = b$ hat für jedes $b$ genau eine Lösung
5. $\\det(A) \\neq 0$
6. Die Zeilen/Spalten von $A$ sind linear unabhängig
7. $0$ ist kein Eigenwert von $A$

---

### Inverse Abbildungen

Ist $f: V \\to W$ bijektiv und linear, so ist $f^{-1}: W \\to V$ ebenfalls linear und:

$$M_B^C(f^{-1}) = (M_C^B(f))^{-1}$$

Die Matrix der inversen Abbildung ist die inverse Matrix!

---

### Rechenregeln für inverse Matrizen

| Regel | Gleichung |
|-------|-----------|
| Doppelte Inversion | $(A^{-1})^{-1} = A$ |
| Produkt | $(AB)^{-1} = B^{-1}A^{-1}$ |
| Transposition | $(A^T)^{-1} = (A^{-1})^T$ |
| Skalarmultiplikation | $(\\alpha A)^{-1} = \\frac{1}{\\alpha}A^{-1}$ ($\\alpha \\neq 0$) |

> **⚠️ Achtung:** $(A+B)^{-1} \\neq A^{-1} + B^{-1}$ im Allgemeinen!

---

### Lösung linearer Gleichungssysteme via Inverse

Für $Ax = b$ mit invertierbarem $A$:

$$x = A^{-1}b$$

**Vorteil:** Keine Gauß-Reduktion nötig, wenn $A^{-1}$ bekannt ist.

**Nachteil:** Für große Matrizen ist die Berechnung von $A^{-1}$ teurer als Gauß!

---

### Produkt regulärer Matrizen

**Satz:** Sind $A, B \\in K^{n \\times n}$ regulär, so ist $AB$ ebenfalls regulär und:

$$(AB)^{-1} = B^{-1}A^{-1}$$

Die Menge der regulären Matrizen bildet die **allgemeine lineare Gruppe** $GL(n, K)$.

---

### 💡 Klausur-Tipp

> **1.** Die Gauß-Jordan-Methode ist der Standardweg zur Inversen — übe sie gründlich!
> **2.** Für $2 \\times 2$-Matrizen gibt es eine Formel:
> $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$
> **3.** $(AB)^{-1} = B^{-1}A^{-1}$ — Reihenfolge UMKEHREN!
> **4.** Prüfe dein Ergebnis: $A \\cdot A^{-1} = E$ muss gelten!`,
    },

    // --- Lektion 7: Skalarprodukte ---
    {
      id: "ma3-07-skalarprodukte",
      title: "Skalarprodukte, Normen & Winkel",
      duration: "30 min",
      type: "text",
      content: `## Skalarprodukte, Normen & Winkel

Das Skalarprodukt verknüpft Algebra mit Geometrie. Es ermöglicht die Messung von Längen, Winkeln und Abständen in Vektorräumen.

---

### Standardskalarprodukt in $\\mathbb{R}^n$

Das **Standardskalarprodukt** (auch: euklidisches Skalarprodukt) von $x, y \\in \\mathbb{R}^n$:

$$\\langle x, y \\rangle = x^T y = x_1 y_1 + x_2 y_2 + \\cdots + x_n y_n$$

---

### Allgemeines Skalarprodukt

Ein **Skalarprodukt** auf einem $\\mathbb{R}$-Vektorraum $V$ ist eine Abbildung $\\langle \\cdot, \\cdot \\rangle: V \\times V \\to \\mathbb{R}$ mit:

| Eigenschaft | Definition |
|-------------|------------|
| Bilinearität | Linear in beiden Argumenten |
| Symmetrie | $\\langle v, w \\rangle = \\langle w, v \\rangle$ |
| Positiv definit | $\\langle v, v \\rangle > 0$ für $v \\neq 0$ |

---

### Länge (Norm)

Die **Länge** (Norm) eines Vektors $v$ bzgl. des Skalarprodukts:

$$\\|v\\| = \\sqrt{\\langle v, v \\rangle}$$

Für das Standardskalarprodukt in $\\mathbb{R}^n$:

$$\\|v\\| = \\sqrt{v_1^2 + v_2^2 + \\cdots + v_n^2}$$

**Eigenschaften:**
- $\\|v\\| \\geq 0$, und $\\|v\\| = 0 \\iff v = 0$
- $\\|\\alpha v\\| = |\\alpha| \\cdot \\|v\\|$

---

### Winkel zwischen Vektoren

Der **Winkel** $\\varphi$ zwischen $v, w \\in \\mathbb{R}^n$ ($v, w \\neq 0$):

$$\\cos\\varphi = \\frac{\\langle v, w \\rangle}{\\|v\\| \\cdot \\|w\\|}$$

---

### Cauchy-Schwarz-Ungleichung

$$|\\langle v, w \\rangle| \\leq \\|v\\| \\cdot \\|w\\|$$

Gleichheit $\\iff$ $v$ und $w$ sind linear abhängig (parallel).

Diese Ungleichung ist fundamental für die gesamte Analysis!

---

### Dreiecksungleichung

$$\\|v + w\\| \\leq \\|v\\| + \\|w\\|$$

Direkte Folgerung aus Cauchy-Schwarz. Verallgemeinert:

$$\\|v - w\\| \\leq \\|v - u\\| + \\|u - w\\|$$

---

### Orthogonalität

Zwei Vektoren $v, w$ heißen **orthogonal** ($v \\perp w$), wenn:

$$\\langle v, w \\rangle = 0$$

**Eigenschaften:**
- Der Nullvektor ist orthogonal zu jedem Vektor
- $\\|v + w\\|^2 = \\|v\\|^2 + \\|w\\|^2$ falls $v \\perp w$ (Satz des Pythagoras)

---

### Beispiele für Skalarprodukte

Auf $\\mathbb{R}^2$ mit Matrix $S = \\begin{pmatrix} 2 & 1 \\\\ 1 & 3 \\end{pmatrix}$:

$$\\langle x, y \\rangle_S = x^T S y = 2x_1y_1 + x_1y_2 + x_2y_1 + 3x_2y_2$$

Dies ist ein Skalarprodukt, da $S$ symmetrisch und positiv definit ist.

**Prüfung positiv definit:**

$$x^T S x = 2x_1^2 + 2x_1x_2 + 3x_2^2 = 2\\left(x_1 + \\frac{x_2}{2}\\right)^2 + \\frac{5}{2}x_2^2 > 0$$

für $x \\neq 0$.

---

### Winkelberechnung — Beispiel

Seien $v = (1, 2)^T$ und $w = (3, 1)^T$ in $\\mathbb{R}^2$ mit Standardskalarprodukt:

$$\\langle v, w \\rangle = 1 \\cdot 3 + 2 \\cdot 1 = 5$$
$$\\|v\\| = \\sqrt{1 + 4} = \\sqrt{5}$$
$$\\|w\\| = \\sqrt{9 + 1} = \\sqrt{10}$$

$$\\cos\\varphi = \\frac{5}{\\sqrt{5} \\cdot \\sqrt{10}} = \\frac{5}{\\sqrt{50}} = \\frac{5}{5\\sqrt{2}} = \\frac{1}{\\sqrt{2}}$$

$$\\varphi = 45°$$

---

### 💡 Klausur-Tipp

> **1.** Prüfe IMMER: Ist die Matrix $S$ symmetrisch UND positiv definit, bevor du $x^T S y$ als Skalarprodukt verwendest!
> **2.** Cauchy-Schwarz gilt in JEDem Skalarproduktraum — nutze es als Kontrolle!
> **3.** Orthogonalität mit dem Skalarprodukt prüfen, nicht mit dem Winkel!
> **4.** $\\|v\\|^2 = \\langle v, v \\rangle$ — nicht vergessen zu quadrieren!`,
    },

    // --- Lektion 8: Gram-Schmidt ---
    {
      id: "ma3-08-gram-schmidt",
      title: "Gram-Schmidt-Verfahren & Orthogonalprojektion",
      duration: "35 min",
      type: "text",
      content: `## Gram-Schmidt-Verfahren & Orthogonalprojektion

Das Gram-Schmidt-Verfahren wandelt eine Basis in eine Orthonormalbasis um. Die Orthogonalprojektion ist ein fundamentales Werkzeug der linearen Algebra mit vielen Anwendungen.

---

### Orthogonale und orthonormale Systeme

**Orthogonales System:** Vektoren $v_1, \\ldots, v_k$ mit $\\langle v_i, v_j \\rangle = 0$ für $i \\neq j$.

**Orthonormalsystem (ONS):** Orthogonales System mit $\\|v_i\\| = 1$ für alle $i$.

| System | Bedingung |
|--------|-----------|
| Orthogonal | $\\langle v_i, v_j \\rangle = 0$ für $i \\neq j$ |
| Orthonormal (ONS) | $\\langle v_i, v_j \\rangle = \\delta_{ij}$ |

**Satz:** Jedes orthogonale System aus Nicht-Null-Vektoren ist linear unabhängig!

---

### Gram-Schmidt-Orthonormalisierung

Gegeben: linear unabhängige Vektoren $v_1, \\ldots, v_n$.
Gesucht: Orthonormalbasis $e_1, \\ldots, e_n$.

**Algorithmus (rekursiv):**

**Schritt 1:** $u_1 = v_1$, $e_1 = \\frac{u_1}{\\|u_1\\|}$

**Schritt k (für $k = 2, \\ldots, n$):**

$$u_k = v_k - \\sum_{j=1}^{k-1} \\langle v_k, e_j \\rangle \\, e_j$$

$$e_k = \\frac{u_k}{\\|u_k\\|}$$

Man subtrahiert von $v_k$ alle Projektionen auf die bisherigen $e_j$.

---

### Beispiel: Gram-Schmidt in $\\mathbb{R}^3$

Gegeben: $v_1 = (1, 1, 0)^T$, $v_2 = (1, 0, 1)^T$, $v_3 = (0, 1, 1)^T$.

**Schritt 1:**
$$u_1 = v_1 = (1, 1, 0)^T, \\quad \\|u_1\\| = \\sqrt{2}, \\quad e_1 = \\frac{1}{\\sqrt{2}}(1, 1, 0)^T$$

**Schritt 2:**
$$\\langle v_2, e_1 \\rangle = \\frac{1}{\\sqrt{2}}(1 \\cdot 1 + 0 \\cdot 1 + 1 \\cdot 0) = \\frac{1}{\\sqrt{2}}$$
$$u_2 = v_2 - \\frac{1}{\\sqrt{2}} e_1 = (1, 0, 1)^T - \\frac{1}{2}(1, 1, 0)^T = \\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)^T$$
$$\\|u_2\\| = \\sqrt{\\frac{1}{4} + \\frac{1}{4} + 1} = \\sqrt{\\frac{3}{2}}, \\quad e_2 = \\frac{1}{\\sqrt{3/2}}\\left(\\frac{1}{2}, -\\frac{1}{2}, 1\\right)^T$$

**Schritt 3:**
$$\\langle v_3, e_1 \\rangle = \\frac{1}{\\sqrt{2}}, \\quad \\langle v_3, e_2 \\rangle = \\frac{1}{\\sqrt{6}}$$
$$u_3 = v_3 - \\langle v_3, e_1 \\rangle e_1 - \\langle v_3, e_2 \\rangle e_2$$

Nach Normierung erhält man $e_3$.

---

### Orthogonale Projektion

Die **orthogonale Projektion** von $v$ auf den UVR $U = \\operatorname{span}(u_1, \\ldots, u_k)$ mit orthonormaler Basis:

$$\\operatorname{proj}_U(v) = \\sum_{j=1}^{k} \\langle v, e_j \\rangle \\, e_j$$

Eigenschaften:
- $\\operatorname{proj}_U(v) \\in U$
- $v - \\operatorname{proj}_U(v) \\perp U$
- $\\operatorname{proj}_U(v)$ ist der nächste Punkt in $U$ zu $v$

---

### Orthogonales Komplement

Das **orthogonale Komplement** eines UVR $U \\subseteq V$:

$$U^\\perp = \\{v \\in V \\mid \\langle v, u \\rangle = 0 \\text{ für alle } u \\in U\\}$$

**Satz:** $U^\\perp$ ist ein UVR und es gilt:

$$V = U \\oplus U^\\perp$$

(Direkte Summe — jeder Vektor lässt sich eindeutig zerlegen.)

**Dimensionsformel:**

$$\\dim(U) + \\dim(U^\\perp) = \\dim(V)$$

---

### Orthogonalprojektion via Matrix

Für eine ONB $e_1, \\ldots, e_k$ von $U$ ist die **Projektionsmatrix**:

$$P = E_k E_k^T$$

wobei $E_k = (e_1 \\mid e_2 \\mid \\cdots \\mid e_k)$ die Matrix mit den Basisvektoren als Spalten ist.

Eigenschaften: $P^2 = P$ (idempotent), $P^T = P$ (symmetrisch).

---

### Anwendung: Nächster Punkt / Minimierung

Die orthogonale Projektion löst das **Minimierungsproblem**:

$$\\min_{u \\in U} \\|v - u\\| = \\|v - \\operatorname{proj}_U(v)\\|$$

Dies wird in der Statistik (Regression), Signalverarbeitung und Numerik verwendet.

---

### Direkte Summe

$V = U_1 \\oplus U_2$ bedeutet:
- $V = U_1 + U_2$ (jedes $v$ ist Summe)
- $U_1 \\cap U_2 = \\{0\\}$ (eindeutige Zerlegung)

Für orthogonale UVR: $V = U \\oplus U^\\perp$ ist immer eine direkte Summe.

---

### 💡 Klausur-Tipp

> **1.** Gram-Schritt für Schritt durchführen — nicht alles auf einmal!
> **2.** IMMER normieren am Ende ($e_k = u_k / \\|u_k\\|$)!
> **3.** Probe: $\\langle e_i, e_j \\rangle = \\delta_{ij}$ prüfen!
> **4.** Bei der Projektion:prowadził erst Orthonormalbasis herstellen, dann die Formel anwenden!
> **5.** $U^\\perp$ berechnen: Gleichung $\\langle v, u_j \\rangle = 0$ für alle Basisvektoren von $U$ aufstellen!`,
    },

    // --- Lektion 9: Determinanten ---
    {
      id: "ma3-09-determinanten",
      title: "Determinanten — Definition, Rechenregeln & Laplace",
      duration: "35 min",
      type: "text",
      content: `## Determinanten — Definition, Rechenregeln & Laplace

Die Determinante ist eine skalare Kennzahl quadratischer Matrizen. Sie entscheidet über Invertierbarkeit und hat eine geometrische Interpretation als Volumen.

---

### Geometrische Interpretation

Für $A \\in \\mathbb{R}^{n \\times n}$: Die Spalten von $A$ spannen ein **Parallelotop** auf. Dann gilt:

$$|\\det(A)| = \\text{Volumen des Parallelotops}$$

In $\\mathbb{R}^2$: Fläche des Parallellogramms.
In $\\mathbb{R}^3$: Volumen des Parallelipipeds.

---

### Definition über Rechenregeln

Die Determinante $\\det: K^{n \\times n} \\to K$ ist die eindeutige Abbildung mit:

| Regel | Beschreibung |
|-------|--------------|
| D1 | $\\det(E) = 1$ |
| D2 | Vertauscht man zwei Spalten: $\\det \\to -\\det$ |
| D3 | $\\det(\\ldots, \\lambda c_j, \\ldots) = \\lambda \\cdot \\det(\\ldots, c_j, \\ldots)$ |
| D4 | $\\det(\\ldots, c_j + \\lambda c_k, \\ldots) = \\det(\\ldots, c_j, \\ldots)$ ($j \\neq k$) |

Aus diesen Regeln folgt: Spaltenweise/zeilenweise Vielfaches einer anderen Spalte/Zeile addieren ändert die Determinante NICHT.

---

### Determinante für kleine Matrizen

**$1 \\times 1$:** $\\det(a) = a$

**$2 \\times 2$:** $\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$

**$3 \\times 3$:** (Sarrus-Regel)
$$\\det\\begin{pmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{pmatrix} = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}$$

---

### Laplacescher Entwicklungssatz

Für $A \\in K^{n \\times n}$ gilt:

**Entwicklung nach Spalte $j$:**

$$\\det(A) = \\sum_{i=1}^{n} (-1)^{i+j} \\, a_{ij} \\, \\det(A_{ij})$$

**Entwicklung nach Zeile $i$:**

$$\\det(A) = \\sum_{j=1}^{n} (-1)^{i+j} \\, a_{ij} \\, \\det(A_{ij})$$

Dabei ist $A_{ij}$ die $(n-1) \\times (n-1)$-Matrix, die durch Streichen der $i$-ten Zeile und $j$-ten Spalte entsteht.

Das Vorzeichen $(-1)^{i+j}$ ergibt das **Vorzeichenmuster** (Schachbrett):

$$\\begin{pmatrix} + & - & + & - & \\cdots \\\\ - & + & - & + & \\cdots \\\\ + & - & + & - & \\cdots \\\\ \\vdots & & & & \\ddots \\end{pmatrix}$$

---

### Wichtige Rechenregeln

| Regel | Gleichung |
|-------|-----------|
| Transposition | $\\det(A^T) = \\det(A)$ |
| Multiplikation | $\\det(AB) = \\det(A) \\cdot \\det(B)$ |
| Inverse | $\\det(A^{-1}) = \\frac{1}{\\det(A)}$ |
| Skalarmultiplikation | $\\det(\\lambda A) = \\lambda^n \\det(A)$ |
| Potenz | $\\det(A^k) = (\\det(A))^k$ |
| Nullzeile/-spalte | $\\det(A) = 0$ |
| Proportionale Z./S. | $\\det(A) = 0$ |

> **⚠️ Achtung:** $\\det(A + B) \\neq \\det(A) + \\det(B)$ im Allgemeinen!

---

### Elementarmatrizen und ihre Determinanten

| Operation | Determinante |
|-----------|--------------|
| Zeilenvertauschung | $-1$ |
| Zeile mit $\\lambda \\neq 0$ multiplizieren | $\\lambda$ |
| Vielfaches einer Zeile addieren | $1$ |

**Satz:** $\\det(A) \\neq 0 \\iff A$ ist regulär.

---

### Adjunkte und Inverse via Adjunkte

Die **Adjunkte** (Adjugierte) von $A$ ist:

$$\\operatorname{adj}(A) = \\left((-1)^{i+j} \\det(A_{ji})\\right)_{i,j}$$

(transponierte Kofaktorenmatrix!)

**Inverse via Adjunkte:**

$$A^{-1} = \\frac{1}{\\det(A)} \\operatorname{adj}(A)$$

---

### Cramersche Regel

Für $Ax = b$ mit $\\det(A) \\neq 0$:

$$x_j = \\frac{\\det(A_j)}{\\det(A)}$$

wobei $A_j$ die Matrix ist, bei der die $j$-te Spalte von $A$ durch $b$ ersetzt wurde.

**Theoretisch wichtig**, aber für $n > 3$ rechnerisch ineffizient (Gauß ist schneller).

---

### Beispiel: Laplace-Entwicklung

$$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 1 & 0 & 6 \\end{pmatrix}$$

Entwicklung nach Spalte 1 (hat eine Null!):

$$\\det(A) = (-1)^{1+1} \\cdot 1 \\cdot \\det\\begin{pmatrix} 4 & 5 \\\\ 0 & 6 \\end{pmatrix} + (-1)^{2+1} \\cdot 0 \\cdot \\det(\\ldots) + (-1)^{3+1} \\cdot 1 \\cdot \\det\\begin{pmatrix} 2 & 3 \\\\ 4 & 5 \\end{pmatrix}$$

$$= 1 \\cdot 24 + 0 + 1 \\cdot (10 - 12) = 24 - 2 = 22$$

---

### 💡 Klausur-Tipp

> **1.** Entwickle IMMER entlang einer Zeile/Spalte mit möglichst vielen Nullen!
> **2.** $\\det(A^T) = \\det(A)$: Entwickle nach Zeilen oder Spalten — was einfacher ist!
> **3.** Vorzeichenmuster nicht vergessen: $(-1)^{i+j}$!
> **4.** $\\det(AB) = \\det(A) \\det(B)$ ist in Klausuren oft der Schlüssel zu eleganten Lösungen!
> **5.** Für $2 \\times 2$: $\\det = ad - bc$ — auswendig lernen!`,
    },

    // --- Lektion 10: Eigenwerte ---
    {
      id: "ma3-10-eigenwerte",
      title: "Eigenwerte, Eigenvektoren & Diagonalisierbarkeit",
      duration: "35 min",
      type: "text",
      content: `## Eigenwerte, Eigenvektoren & Diagonalisierbarkeit

Eigenwerte und Eigenvektoren sind das Herzstück der linearen Algebra. Sie enthüllen die intrinsische Struktur einer linearen Abbildung und ermöglichen die Diagonalisierung.

---

### Definition

Sei $A \\in K^{n \\times n}$. Ein Skalar $\\lambda \\in K$ heißt **Eigenwert** von $A$, wenn es einen Vektor $v \\neq 0$ gibt mit:

$$Av = \\lambda v$$

Der Vektor $v$ heißt **Eigenvektor** zum Eigenwert $\\lambda$.

Umformuliert: $(A - \\lambda E)v = 0$ hat eine nichttriviale Lösung.

---

### Charakteristisches Polynom

Das **charakteristische Polynom** von $A$:

$$p_A(\\lambda) = \\det(\\lambda E - A)$$

Die Eigenwerte sind die **Nullstellen** von $p_A(\\lambda)$.

$p_A$ ist ein Polynom vom Grad $n$ mit:

$$p_A(\\lambda) = \\lambda^n - \\operatorname{sp}(A) \\lambda^{n-1} + \\cdots + (-1)^n \\det(A)$$

Dabei ist $\\operatorname{sp}(A) = a_{11} + a_{22} + \\cdots + a_{nn}$ die **Spur** von $A$.

---

### Eigenräume

Der **Eigenraum** zum Eigenwert $\\lambda$:

$$E_\\lambda = \\ker(A - \\lambda E) = \\{v \\in K^n \\mid (A - \\lambda E)v = 0\\}$$

$E_\\lambda$ ist ein Untervektorraum von $K^n$.

---

### Vielfachheiten

| Begriff | Definition |
|---------|------------|
| **Algebraische Vielfachheit** (aV) | Vielfachheit von $\\lambda$ als Nullstelle von $p_A$ |
| **Geometrische Vielfachheit** (gV) | $\\dim(E_\\lambda)$, Dimension des Eigenraums |

Es gilt immer: $1 \\leq \\text{gV} \\leq \\text{aV}$

---

### Eigenwerte berechnen — Beispiel

$$A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$$

$$p_A(\\lambda) = \\det\\begin{pmatrix} \\lambda - 4 & -1 \\\\ -2 & \\lambda - 3 \\end{pmatrix} = (\\lambda-4)(\\lambda-3) - 2 = \\lambda^2 - 7\\lambda + 10$$

$$= (\\lambda - 5)(\\lambda - 2)$$

Eigenwerte: $\\lambda_1 = 5$, $\\lambda_2 = 2$.

**Eigenvektor zu $\\lambda_1 = 5$:**

$$(A - 5E)v = 0 \\quad\\Rightarrow\\quad \\begin{pmatrix} -1 & 1 \\\\ 2 & -2 \\end{pmatrix} v = 0$$

$$v_1 = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$$

**Eigenvektor zu $\\lambda_2 = 2$:**

$$(A - 2E)v = 0 \\quad\\Rightarrow\\quad \\begin{pmatrix} 2 & 1 \\\\ 2 & 1 \\end{pmatrix} v = 0$$

$$v_2 = \\begin{pmatrix} 1 \\\\ -2 \\end{pmatrix}$$

---

### Lineare Unabhängigkeit von Eigenvektoren

**Satz:** Eigenvektoren zu **verschiedenen** Eigenwerten sind linear unabhängig.

Folgerung: Hat $A$ $n$ verschiedene Eigenwerte, so hat $A$ $n$ linear unabhängige Eigenvektoren.

---

### Diagonalisierbarkeit

$A \\in K^{n \\times n}$ heißt **diagonalisierbar**, wenn es eine invertierbare Matrix $S$ gibt mit:

$$S^{-1}AS = D = \\operatorname{diag}(\\lambda_1, \\ldots, \\lambda_n)$$

**Äquivalente Bedingungen:**
1. $A$ hat $n$ linear unabhängige Eigenvektoren
2. Für jeden Eigenwert gilt: $\\text{gV} = \\text{aV}$
3. Das charakteristische Polynom hat $n$ Nullstellen in $K$ (mit Vielfachheit)

Die Spalten von $S$ sind die Eigenvektoren, die Diagonaleinträge von $D$ die Eigenwerte.

---

### Symmetrische Matrizen

**Spektralsatz:** Jede reelle symmetrische Matrix $A = A^T$ ist diagonalisierbar über $\\mathbb{R}$!

Darüber hinaus: Die Eigenvektoren können so gewählt werden, dass sie orthonormal sind.

$$A = Q D Q^T$$

wobei $Q$ orthogonal ($Q^T = Q^{-1}$) ist.

---

### Anwendungen

**Potenzen:** Ist $A = SDS^{-1}$, so gilt:

$$A^k = S D^k S^{-1}$$

mit $D^k = \\operatorname{diag}(\\lambda_1^k, \\ldots, \\lambda_n^k)$.

**Fibonacci-Zahlen**, Markov-Ketten, Differenzialgleichungen — überall spielen Eigenwerte eine Rolle!

---

### 💡 Klausur-Tipp

> **1.** Charakteristisches Polynom: $p_A(\\lambda) = \\det(\\lambda E - A)$ — Vorsicht mit dem Vorzeichen!
> **2.** Probe: $\\operatorname{sp}(A) = \\sum \\lambda_i$ und $\\det(A) = \\prod \\lambda_i$!
> **3.** Eigenvektoren: Löse $(A - \\lambda E)v = 0$ — Parameterdarstellung nicht vergessen!
> **4.** Diagonalisierbarkeit: Prüfe für jeden Eigenwert, ob gV = aV!
> **5.** Symmetrische Matrizen sind IMMER diagonalisierbar — das ist ein Freifahrtschein!`,
    },

    // --- Lektion 11: Jordan'sche Normalform ---
    {
      id: "ma3-11-jordanform",
      title: "Jordan'sche Normalform",
      duration: "35 min",
      type: "text",
      content: `## Jordan'sche Normalform

Wenn eine Matrix nicht diagonalisierbar ist, gibt es eine „Fast-Diagonalform": die Jordan'sche Normalform (JNF). Sie ist die kanonischste Form, die jede Matrix über $\\mathbb{C}$ erreichen kann.

---

### Warum brauchen wir die JNF?

Nicht jede Matrix ist diagonalisierbar. Beispiel:

$$A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 2 \\end{pmatrix}$$

Eigenwert $\\lambda = 2$ mit $aV = 2$, aber $\\dim(E_2) = 1$ ($gV = 1$). Es fehlt ein Eigenvektor!

Die JNF löst dieses Problem, indem sie **Jordan-Blöcke** einführt.

---

### Jordan-Block

Ein **Jordan-Block** der Größe $k$ zum Eigenwert $\\lambda$ ist:

$$J_k(\\lambda) = \\begin{pmatrix} \\lambda & 1 & 0 & \\cdots & 0 \\\\ 0 & \\lambda & 1 & \\cdots & 0 \\\\ 0 & 0 & \\lambda & \\cdots & 0 \\\\ \\vdots & & & \\ddots & 1 \\\\ 0 & 0 & 0 & \\cdots & \\lambda \\end{pmatrix} \\in K^{k \\times k}$$

Eigenschaften:
- $\\lambda$ auf der Diagonalen, $1$er auf der oberen Nebendiagonalen
- Genau ein Eigenvektor: $e_1 = (1, 0, \\ldots, 0)^T$
- $gV = 1$ für jeden Jordan-Block

---

### Jordan'sche Normalform

Jede Matrix $A \\in \\mathbb{C}^{n \\times n}$ ist ähnlich zu einer Matrix in **Jordan-Normalform**:

$$J = \\begin{pmatrix} J_{k_1}(\\lambda_1) & & \\\\ & J_{k_2}(\\lambda_2) & \\\\ & & \\ddots \\\\ & & & J_{k_r}(\\lambda_r) \\end{pmatrix}$$

Es existiert eine invertierbare Matrix $S$ mit $A = SJS^{-1}$.

**Die JNF ist bis auf die Reihenfolge der Blöcke eindeutig!**

---

### Jordan-Ketten

Für einen Jordan-Block $J_k(\\lambda)$ mit $A = SJS^{-1}$ gilt:

$$A s_1 = \\lambda s_1$$
$$A s_j = \\lambda s_j + s_{j-1} \\quad (j = 2, \\ldots, k)$$

Die Vektoren $s_1, \\ldots, s_k$ bilden eine **Jordan-Kette**:
- $s_1$ ist Eigenvektor
- $(A - \\lambda E)s_j = s_{j-1}$ für $j \\geq 2$
- $(A - \\lambda E)^k s_k = 0$

Die Spalten von $S$ sind die Jordan-Ketten!

---

### Bestimmung der JNF — Algorithmus

**Schritt 1: Eigenwerte bestimmen**
- Charakteristisches Polynom $p_A(\\lambda)$ berechnen
- Nullstellen = Eigenwerte mit algebraischen Vielfachheiten

**Schritt 2: Für jeden Eigenwert $\\lambda$:**
- Bestimme die **Rangfolge**: $r_k = \\operatorname{rang}((A - \\lambda E)^k)$ für $k = 1, 2, \\ldots$
- Anzahl der Jordan-Blocks der Größe $\\geq k$: $n_k = r_{k-1} - 2r_k + r_{k+1}$ (mit $r_0 = n$)
- Die geometrische Vielfachheit = Anzahl der Jordan-Blocks zu $\\lambda$

**Schritt 3: Jordan-Blöcke zusammensetzen**

---

### Beispiel: JNF bestimmen

$$A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 2 \\end{pmatrix}$$

Eigenwert: $\\lambda = 2$ mit $aV = 3$.

$$A - 2E = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}$$

$\\operatorname{rang}(A - 2E) = 2$ → $gV = 3 - 2 = 1$ (ein Eigenvektor)

$$(A - 2E)^2 = \\begin{pmatrix} 0 & 0 & 1 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}, \\quad \\operatorname{rang} = 1$$

$$(A - 2E)^3 = 0$$

Es gibt genau einen Jordan-Block der Größe 3:

$$J = J_3(2) = \\begin{pmatrix} 2 & 1 & 0 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 2 \\end{pmatrix}$$

---

### Beispiel: Mehrere Jordan-Blöcke

$$A = \\begin{pmatrix} 3 & 1 & 0 & 0 \\\\ 0 & 3 & 0 & 0 \\\\ 0 & 0 & 3 & 1 \\\\ 0 & 0 & 0 & 3 \\end{pmatrix}$$

Eigenwert $\\lambda = 3$, $aV = 4$.

$$\\operatorname{rang}(A - 3E) = 2 \\Rightarrow gV = 2$$

Zwei Jordan-Blöcke! Da $aV = 4$ und es zwei Blöcke gibt, sind es:

$$J_2(3) \\oplus J_2(3) = \\begin{pmatrix} 3 & 1 & 0 & 0 \\\\ 0 & 3 & 0 & 0 \\\\ 0 & 0 & 3 & 1 \\\\ 0 & 0 & 0 & 3 \\end{pmatrix}$$

---

### Zusammenfassung: Diagonalform vs. JNF

| Eigenschaft | Diagonalform | JNF |
|-------------|-------------|-----|
| Existenz | Nur bei Diagonalisierbarkeit | Immer (über $\\mathbb{C}$) |
| Eindeutigkeit | Eigenwerte auf Diagonale (Reihenfolge egal) | Eindeutig bis auf Blockreihenfolge |
| Nebendiagonalen | Nur Nullen | Nullen oder Einsen |
| Voraussetzung | $n$ linear unabhängige Eigenvektoren | Keine |

---

### Anwendungen der JNF

- **Potenzen:** $A^k = S J^k S^{-1}$, wobei $J^k$ blockweise berechnet wird
- **Matrixexponential:** $e^{A} = S e^J S^{-1}$
- **Lösung von DGL-Systemen:** $x' = Ax$ → Jordanform vereinfacht die Rechnung
- **Minimalpolynom:** Aus der JNF ablesbar

---

### 💡 Klausur-Tipp

> **1.** Prüfe zuerst: Ist $A$ diagonalisierbar? Dann brauchst du keine JNF!
> **2.** JNF-Aufgaben: Eigenwerte → algebraische Vielfachheit → Ränge → Jordan-Blöcke!
> **3.** Merke: $gV$ = Anzahl der Jordan-Blöcke zu $\\lambda$!
> **4.** Die JNF ist IMMER über $\\mathbb{C}$ vorhanden — über $\\mathbb{R}$ nur bei reellen Eigenwerten!
> **5.** Jordan-Ketten: $(A - \\lambda E)s_k = s_{k-1}$ — rückwärts aufbauen vom letzten Kettenvektor!`,
    },

    // =========================================================================
    // ALTKLAUSUREN (9 Klausuren, 2018–2025)
    // =========================================================================
    ...mathe3AltklausurLessons,

    // =========================================================================
    // ÜBUNGSAUFGABEN (Leicht / Mittel / Schwer / Prüfung)
    // =========================================================================
    ...createExerciseLessons(
      "adv-mathe3",
      "Mathematik 3 Lineare Algebra",
      {
        easy: "Einfache Aufgaben zu linearen Gleichungssystemen, Vektorräumen und grundlegende Matrixoperationen. Perfekt zum Aufwärmen.",
        medium: "Mittelschwere Aufgaben mit Gram-Schmidt-Orthonormalisierung, Determinanten und Eigenwertberechnung. Hier wird's interessant!",
        hard: "Schwere Aufgaben zu Jordan'scher Normalform, allgemeinen linearen Gleichungssystemen mit Parametern und komplexen Matrizen. Klausur-Niveau!",
      }
    ),
  ],
};
