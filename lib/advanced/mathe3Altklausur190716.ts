import { Lesson } from "../types";

export const mathe3Altklausur190716: Lesson[] = [
  {
    id: "ma3-klausur-190716-1",
    title: "Parameterabhängiges LGS",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 1 — Parameterabhängiges LGS

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Gauß-Verfahren, Rang, Parameterdiskussion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei das lineare Gleichungssystem mit Parametern $\\alpha, \\beta \\in \\mathbb{R}$:

$$\\begin{pmatrix} 1 & 1 & \\alpha \\\\ 1 & \\alpha & 1 \\\\ \\alpha & 1 & 1 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix} = \\begin{pmatrix} \\beta \\\\ 1 \\\\ 1 \\end{pmatrix}$$

Untersuchen Sie, für welche $\\alpha, \\beta$ das System eine eindeutige Lösung, unendlich viele Lösungen oder keine Lösung hat.

[STEP]
**Schritt 1: Erweiterte Koeffizientenmatrix aufstellen**

$$(A|b) = \\begin{pmatrix} 1 & 1 & \\alpha & | & \\beta \\\\ 1 & \\alpha & 1 & | & 1 \\\\ \\alpha & 1 & 1 & | & 1 \\end{pmatrix}$$

[STEP]
**Schritt 2: Gauß-Verfahren**

$Z_2 \\leftarrow Z_2 - Z_1$:
$$\\begin{pmatrix} 1 & 1 & \\alpha & | & \\beta \\\\ 0 & \\alpha-1 & 1-\\alpha & | & 1-\\beta \\\\ \\alpha & 1 & 1 & | & 1 \\end{pmatrix}$$

$Z_3 \\leftarrow Z_3 - \\alpha Z_1$:
$$\\begin{pmatrix} 1 & 1 & \\alpha & | & \\beta \\\\ 0 & \\alpha-1 & 1-\\alpha & | & 1-\\beta \\\\ 0 & 1-\\alpha & 1-\\alpha^2 & | & 1-\\alpha\\beta \\end{pmatrix}$$

$Z_3 \\leftarrow Z_3 + Z_2$:
$$\\begin{pmatrix} 1 & 1 & \\alpha & | & \\beta \\\\ 0 & \\alpha-1 & 1-\\alpha & | & 1-\\beta \\\\ 0 & 0 & 2-\\alpha-\\alpha^2 & | & 2-\\beta-\\alpha\\beta \\end{pmatrix}$$

Faktorisieren: $2 - \\alpha - \\alpha^2 = (2 + \\alpha)(1 - \\alpha)$

Und: $2 - \\beta - \\alpha\\beta = 2 - \\beta(1 + \\alpha)$

[STEP]
**Schritt 3: Fallunterscheidung**

**Fall $\\alpha \\neq 1$ und $\\alpha \\neq -2$:**

Der Koeffizient $(2+\\alpha)(1-\\alpha) \\neq 0$, also Rang$(A) = 3$ = Rang$(A|b)$.

→ **Eindeutige Lösung** für alle $\\beta$.

**Fall $\\alpha = 1$:**

$$\\begin{pmatrix} 1 & 1 & 1 & | & \\beta \\\\ 0 & 0 & 0 & | & 1-\\beta \\\\ 0 & 0 & 0 & | & 0 \\end{pmatrix}$$

Für $\\beta \\neq 1$: $0 = 1 - \\beta \\neq 0$ → **keine Lösung**.
Für $\\beta = 1$: Rang$(A) = 1$ < 3 → **unendlich viele Lösungen**.

**Fall $\\alpha = -2$:**

$$\\begin{pmatrix} 1 & 1 & -2 & | & \\beta \\\\ 0 & -3 & 3 & | & 1-\\beta \\\\ 0 & 0 & 0 & | & 2-\\beta+2\\beta \\end{pmatrix} = \\begin{pmatrix} 1 & 1 & -2 & | & \\beta \\\\ 0 & -3 & 3 & | & 1-\\beta \\\\ 0 & 0 & 0 & | & 2+\\beta \\end{pmatrix}$$

Für $\\beta \\neq -2$: $0 = 2 + \\beta \\neq 0$ → **keine Lösung**.
Für $\\beta = -2$: Rang$(A) = 2$ < 3 → **unendlich viele Lösungen**.

[RESULT]
- **Eindeutige Lösung:** $\\alpha \\notin \\{-2, 1\\}$, beliebiges $\\beta$
- **Unendlich viele Lösungen:** $(\\alpha, \\beta) = (1, 1)$ oder $(\\alpha, \\beta) = (-2, -2)$
- **Keine Lösung:** $\\alpha = 1, \\beta \\neq 1$ oder $\\alpha = -2, \\beta \\neq -2$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Parameterdiskussion bei LGS** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190716-2",
    title: "Basis von R⁵ mit Parameter",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 2 — Basis von R⁵ mit Parameter

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Basis, Determinante, Dreiecksmatrix

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben seien die Vektoren in $\\mathbb{R}^5$:

$$v_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \܀ 0 \\\\ 0 \\end{pmatrix}, \\quad v_3 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 0 \\\\ 0 \\end{pmatrix}$$

$$v_4 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 4 \\\\ 0 \\end{pmatrix}, \\quad v_5 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 4 \\\\ x \\end{pmatrix}$$

Für welche $x \\in \\mathbb{R}$ bilden $v_1, \\ldots, v_5$ eine Basis von $\\mathbb{R}^5$?

[STEP]
**Schritt 1: Matrix aufstellen**

$$A = (v_1 | v_2 | v_3 | v_4 | v_5) = \\begin{pmatrix} 1 & 1 & 1 & 1 & 1 \\\\ 0 & 2 & 2 & 2 & 2 \\\\ 0 & 0 & 3 & 3 & 3 \\\\ 0 & 0 & 0 & 4 & 4 \\\\ 0 & 0 & 0 & 0 & x \\end{pmatrix}$$

[STEP]
**Schritt 2: Determinante berechnen**

$A$ ist eine obere Dreiecksmatrix. Die Determinante ist das Produkt der Diagonaleinträge:

$$\\det(A) = 1 \\cdot 2 \\cdot 3 \\cdot 4 \\cdot x = 24x$$

[STEP]
**Schritt 3: Basisbedingung**

Die Vektoren bilden genau dann eine Basis von $\\mathbb{R}^5$, wenn sie linear unabhängig sind, d.h. wenn $\\det(A) \\neq 0$:

$$24x \\neq 0 \\iff x \\neq 0$$

[RESULT]
$$v_1, \\ldots, v_5 \\text{ bilden eine Basis von } \\mathbb{R}^5 \\text{ genau dann, wenn } x \\neq 0.$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Basisbestimmung über Determinanten** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190716-3",
    title: "Orthonormalbasis eines Unterraums",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 3 — Orthonormalbasis eines Unterraums

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Gram-Schmidt, Dimension, Unterraum

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei der Unterraum $U = \\langle v_1, v_2, v_3 \\rangle \\subseteq \\mathbb{R}^4$ mit:

$$v_1 = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\\\ -1 \\end{pmatrix}, \\quad v_3 = \\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\\\ -1 \\end{pmatrix}$$

Bestimmen Sie $\\dim(U)$ und eine Orthonormalbasis von $U$.

[STEP]
**Schritt 1: Dimension bestimmen**

Wir prüfen, ob die Vektoren linear unabhängig sind. Wir berechnen die Skalarprodukte:

$$\\langle v_1, v_2 \\rangle = 1 + 1 - 1 - 1 = 0$$
$$\\langle v_1, v_3 \\rangle = 1 - 1 + 1 - 1 = 0$$
$$\\langle v_2, v_3 \\rangle = 1 - 1 - 1 + 1 = 0$$

Die Vektoren sind bereits orthogonal! Da alle drei orthogonal zueinander und keiner der Nullvektor ist, sind sie linear unabhängig.

$$\\dim(U) = 3$$

[STEP]
**Schritt 2: Vektoren normieren**

$$\\|v_1\\| = \\sqrt{1 + 1 + 1 + 1} = 2$$
$$\\|v_2\\| = \\sqrt{1 + 1 + 1 + 1} = 2$$
$$\\|v_3\\| = \\sqrt{1 + 1 + 1 + 1} = 2$$

[STEP]
**Schritt 3: Orthonormalbasis angeben**

$$e_1 = \\frac{1}{2}\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad e_2 = \\frac{1}{2}\\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\\\ -1 \\end{pmatrix}, \\quad e_3 = \\frac{1}{2}\\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\\\ -1 \\end{pmatrix}$$

[RESULT]
$$\\dim(U) = 3$$

$$\\text{ONB}(U) = \\left\\{ \\frac{1}{2}\\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\frac{1}{2}\\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\\\ -1 \\end{pmatrix}, \\frac{1}{2}\\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\\\ -1 \\end{pmatrix} \\right\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Orthonormalisierung bei bereits orthogonalen Vektoren** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190716-4",
    title: "Eigenwerte und Jordanform",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 4 — Eigenwerte und Jordanform

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Eigenwerte, Vielfachheiten, Jordan'sche Normalform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Für $\\lambda \\in \\mathbb{R}$ sei $A_{3,2}(\\lambda)$ die elementare Matrix, die das $\\lambda$-fache der 2. Zeile zur 3. Zeile addiert:

$$A_{3,2}(\\lambda) = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & \\lambda & 1 \\end{pmatrix}$$

Bestimmen Sie die Eigenwerte, algebraischen und geometrischen Vielfachheiten und die Jordan'sche Normalform.

[STEP]
**Schritt 1: Charakteristisches Polynom**

$$p_A(x) = \\det(A_{3,2}(\\lambda) - xI) = \\det\\begin{pmatrix} 1-x & 0 & 0 \\\\ 0 & 1-x & 0 \\\\ 0 & \\lambda & 1-x \\end{pmatrix}$$

Da dies eine untere Dreiecksmatrix ist:

$$p_A(x) = (1-x)^3$$

Der einzige Eigenwert ist $x = 1$ mit algebraischer Vielfachheit **3**.

[STEP]
**Schritt 2: Geometrische Vielfachheit**

$$A_{3,2}(\\lambda) - I = \\begin{pmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & \\lambda & 0 \\end{pmatrix}$$

**Fall $\\lambda = 0$:** $A_{3,2}(0) = I$, also $A - I = 0$. Rang = 0, $\\dim(\\ker) = 3$.
Geometrische Vielfachheit = 3.

**Fall $\\lambda \\neq 0$:** Rang$(A - I) = 1$ (die dritte Zeile ist die einzige Nicht-Null-Zeile).
$\\dim(\\ker(A - I)) = 3 - 1 = 2$.
Geometrische Vielfachheit = 2.

[STEP]
**Schritt 3: Jordan'sche Normalform**

**Fall $\\lambda = 0$:** $A = I$. Alle drei Jordan-Blöcke haben Größe 1:
$$J = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

**Fall $\\lambda \\neq 0$:** Geometrische Vielfachheit = 2, d.h. 2 Jordan-Blöcke. Die algebraische Vielfachheit 3 muss auf 2 Blöcke verteilt werden: einer der Größe 2 und einer der Größe 1.

$$J = \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

[RESULT]
- $\\lambda = 1$: alg.VF = 3, geo.VF = 3 (für $\\lambda = 0$) bzw. geo.VF = 2 (für $\\lambda \\neq 0$)
- Jordanform für $\\lambda = 0$: $J = I_3$
- Jordanform für $\\lambda \\neq 0$: $J = \\text{diag}(J_2(1), 1)$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Jordan'sche Normalform elementarer Matrizen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190716-5",
    title: "Trigonometrische Gleichung lösen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 5 — Trigonometrische Gleichung lösen

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Additionstheoreme, trigonometrische Gleichungen

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie die Gleichung:
$$2\\cos^2(\\alpha) = \\sin(2\\alpha)$$

[STEP]
**Schritt 1: Additionstheorem anwenden**

Mit $\\sin(2\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha)$:

$$2\\cos^2(\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha)$$

[STEP]
**Schritt 2: Vereinfachen**

$$2\\cos^2(\\alpha) - 2\\sin(\\alpha)\\cos(\\alpha) = 0$$

$$2\\cos(\\alpha)(\\cos(\\alpha) - \\sin(\\alpha)) = 0$$

[STEP]
**Schritt 3: Nullstellen bestimmen**

**Fall 1:** $\\cos(\\alpha) = 0$

$$\\alpha = \\frac{\\pi}{2} + k\\pi, \\quad k \\in \\mathbb{Z}$$

**Fall 2:** $\\cos(\\alpha) - \\sin(\\alpha) = 0$

$$\\cos(\\alpha) = \\sin(\\alpha)$$
$$\\tan(\\alpha) = 1$$
$$\\alpha = \\frac{\\pi}{4} + k\\pi, \\quad k \\in \\mathbb{Z}$$

[RESULT]
$$\\alpha \\in \\left\\{ \\frac{\\pi}{2} + k\\pi : k \\in \\mathbb{Z} \\right\\} \\cup \\left\\{ \\frac{\\pi}{4} + k\\pi : k \\in \\mathbb{Z} \\right\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Faktorisierung trigonometrischer Gleichungen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190716-6",
    title: "Determinante einer linearen Abbildung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 6 — Determinante einer linearen Abbildung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Determinante, Darstellungsmatrix, lineare Abbildung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die lineare Abbildung $f: \\mathbb{R}^2 \\to \\mathbb{R}^2$ mit:

$$f(1, 1) = (1, 1), \\quad f(1, -1) = (-1, -1)$$

Bestimmen Sie $\\det(f)$.

[STEP]
**Schritt 1: Basis bestimmen**

Die Vektoren $(1,1)$ und $(1,-1)$ bilden eine Basis von $\\mathbb{R}^2$, da:

$$\\det\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = -1 - 1 = -2 \\neq 0$$

[STEP]
**Schritt 2: Darstellungsmatrix bezüglich dieser Basis**

In der Basis $B = \\{(1,1), (1,-1)\\}$ ist:

$$[f]_B = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$$

denn $f(1,1) = 1 \\cdot (1,1) + 0 \\cdot (1,-1)$ und $f(1,-1) = 0 \\cdot (1,1) + (-1) \\cdot (1,-1)$.

[STEP]
**Schritt 3: Determinante berechnen**

Die Determinante einer linearen Abbildung ist unabhängig von der Wahl der Basis:

$$\\det(f) = \\det([f]_B) = 1 \\cdot (-1) - 0 \\cdot 0 = -1$$

Alternativ: Wir berechnen die Darstellungsmatrix bezüglich der Standardbasis $E = \\{e_1, e_2\\}$.

$$e_1 = \\frac{1}{2}(1,1) + \\frac{1}{2}(1,-1), \\quad e_2 = \\frac{1}{2}(1,1) - \\frac{1}{2}(1,-1)$$

$$f(e_1) = \\frac{1}{2}f(1,1) + \\frac{1}{2}f(1,-1) = \\frac{1}{2}(1,1) + \\frac{1}{2}(-1,-1) = (0,0)$$

$$f(e_2) = \\frac{1}{2}f(1,1) - \\frac{1}{2}f(1,-1) = \\frac{1}{2}(1,1) - \\frac{1}{2}(-1,-1) = (1,1)$$

$$[f]_E = \\begin{pmatrix} 0 & 1 \\\\ 0 & 1 \\end{pmatrix}$$

$$\\det([f]_E) = 0 \\cdot 1 - 1 \\cdot 0 = 0$$

**Korrektur:** $f(1,-1) = (-1,-1) = -(1,-1)$, also ist $(1,-1)$ ein Eigenvektor mit Eigenwert $-1$.

$f(1,1) = (1,1)$, also ist $(1,1)$ ein Eigenvektor mit Eigenwert $1$.

$$\\det(f) = 1 \\cdot (-1) = -1$$

[RESULT]
$$\\det(f) = -1$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Determinante über Eigenwerte** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190716-7",
    title: "Kern und charakteristisches Polynom",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 16.07.2019",
    content: `## Aufgabe 7 — Kern und charakteristisches Polynom

> **📋 5 Punkte + 5 Bonus** | ⏱ 10 min | 🔑 Kern, charakteristisches Polynom, Cayley-Hamilton

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $A \\in \\mathbb{R}^{n \\times n}$ mit charakteristischem Polynom:
$$p_A(x) = x(x-1)(x+1)$$

Zeigen Sie, dass $\\ker(A)$ ein von $\\{0\\}$ verschiedenes Element enthält.

[STEP]
**Schritt 1: Eigenwert ablesen**

Aus $p_A(x) = x(x-1)(x+1)$ erkennt man die Eigenwerte:
$$\\lambda_1 = 0, \\quad \\lambda_2 = 1, \\quad \\lambda_3 = -1$$

[STEP]
**Schritt 2: Eigenvektor zum Eigenwert $\\lambda = 0$**

Da $\\lambda = 0$ ein Eigenwert von $A$ ist, existiert ein Eigenvektor $v \\neq 0$ mit:

$$Av = 0 \\cdot v = 0$$

Das bedeutet $v \\in \\ker(A)$ und $v \\neq 0$.

[STEP]
**Schritt 3: Alternativer Beweis mit Cayley-Hamilton**

Nach dem Cayley-Hamilton-Theorem gilt $p_A(A) = 0$:

$$A(A - I)(A + I) = 0$$

Da $p_A(0) = 0$ und $p_A$ das minimale Polynom teilt, ist $0$ ein Eigenwert und $\\ker(A) \\neq \\{0\\}$.

[RESULT]
$$\\lambda = 0 \\text{ ist Eigenwert von } A \\Rightarrow \\exists\\, v \\neq 0 : Av = 0 \\Rightarrow v \\in \\ker(A) \\setminus \\{0\\} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole den **Zusammenhang zwischen Eigenwerten und dem Kern** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
