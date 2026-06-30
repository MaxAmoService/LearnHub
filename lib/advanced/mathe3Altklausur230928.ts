import { Lesson } from "../types";

export const mathe3Altklausur230928: Lesson[] = [
  {
    id: "ma3-klausur-230928-1",
    title: "Parametergestütztes Gleichungssystem — Fallunterscheidung",
    duration: "25 min",
    type: "text",
    group: "📝 Klausur 28.09.2023",
    content: `## Aufgabe 1

> **📋 25 Punkte** | ⏱ 25 min | 🔑 Gleichungssystem, Parameter, Determinante

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist das Gleichungssystem:

$$\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & \\alpha & 1 \\\\ 1 & 1 & \\beta \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\\\ x_3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix}$$

(a) Untersuchen Sie das System für alle Werte von $\\alpha, \\beta \\in \\mathbb{R}$ auf Lösbarkeit.
(b) Berechnen Sie die Determinante der erweiterten Koeffizientenmatrix.

[STEP]
**Schritt 1: Zeilenstufenform berechnen**

Erweiterte Matrix:
$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 1 & \\alpha & 1 & 1 \\\\ 1 & 1 & \\beta & 1 \\end{array}\\right)$$

$Z_2 - Z_1$, $Z_3 - Z_1$:
$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 0 & \\alpha - 1 & 0 & 0 \\\\ 0 & 0 & \\beta - 1 & 0 \\end{array}\\right)$$

[STEP]
**Schritt 2: Fallunterscheidung**

**Fall 1: $\\alpha \\neq 1$ und $\\beta \\neq 1$**

Die Koeffizientenmatrix hat Rang 3. Eindeutige Lösung:

Aus Zeile 2: $(\\alpha - 1)x_2 = 0 \\Rightarrow x_2 = 0$

Aus Zeile 3: $(\\beta - 1)x_3 = 0 \\Rightarrow x_3 = 0$

Aus Zeile 1: $x_1 + 0 + 0 = 1 \\Rightarrow x_1 = 1$

**Lösung:** $(x_1, x_2, x_3) = (1, 0, 0)$

**Fall 2: $\\alpha = 1$, $\\beta \\neq 1$**

$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & \\beta-1 & 0 \\end{array}\\right)$$

Rang = 2, 3 Unbekannte → $\\dim = 1$ (unendlich viele Lösungen):

$x_3 = 0$, $x_1 + x_2 = 1 \\Rightarrow x_1 = 1 - t$, $x_2 = t$

**Lösung:** $(1-t, t, 0)$ für $t \\in \\mathbb{R}$

**Fall 3: $\\alpha \\neq 1$, $\\beta = 1$**

$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 0 & \\alpha-1 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right)$$

Rang = 2 → unendlich viele Lösungen:

$x_2 = 0$, $x_1 + x_3 = 1 \\Rightarrow x_1 = 1 - t$, $x_3 = t$

**Lösung:** $(1-t, 0, t)$ für $t \\in \\mathbb{R}$

**Fall 4: $\\alpha = 1$, $\\beta = 1$**

$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & 1 \\\\ 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 \\end{array}\\right)$$

Rang = 1 → $\\dim = 2$ (unendlich viele Lösungen):

$x_1 = 1 - s - t$, $x_2 = s$, $x_3 = t$

**Lösung:** $(1-s-t, s, t)$ für $s, t \\in \\mathbb{R}$

[STEP]
**Schritt 3: Determinante der erweiterten Matrix**

Die erweiterte Koeffizientenmatrix (ohne rechte Seite) hat die Determinante:

$$\\det\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & \\alpha & 1 \\\\ 1 & 1 & \\beta \\end{pmatrix}$$

$Z_2 - Z_1$, $Z_3 - Z_1$:
$$= \\det\\begin{pmatrix} 1 & 1 & 1 \\\\ 0 & \\alpha-1 & 0 \\\\ 0 & 0 & \\beta-1 \\end{pmatrix} = (\\alpha - 1)(\\beta - 1)$$

[RESULT]
**Determinante:** $\\det = (\\alpha - 1)(\\beta - 1)$

**Lösungen:**
- $\\alpha \\neq 1, \\beta \\neq 1$: eindeutige Lösung $(1, 0, 0)$
- $\\alpha = 1, \\beta \\neq 1$: $(1-t, t, 0)$, $t \\in \\mathbb{R}$
- $\\alpha \\neq 1, \\beta = 1$: $(1-t, 0, t)$, $t \\in \\mathbb{R}$
- $\\alpha = 1, \\beta = 1$: $(1-s-t, s, t)$, $s, t \\in \\mathbb{R}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Bei parameterabhängigen Systemen ist die Fallunterscheidung entscheidend. Die Determinante $(\\alpha-1)(\\beta-1)$ zeigt sofort, wann das System eindeutig lösbar ist.`,
  },

  {
    id: "ma3-klausur-230928-2",
    title: "Matrixdarstellung einer linearen Abbildung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.09.2023",
    content: `## Aufgabe 2

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Lineare Abbildung, Matrixdarstellung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $f: \\mathbb{R}^2 \\to \\mathbb{R}^2$ eine lineare Abbildung mit:
$$f(3, 2) = (4, 5), \\quad f(1, 2) = (2, 3)$$

Bestimmen Sie die Matrix $M_f$ bezüglich der Standardbasis.

[STEP]
**Schritt 1: Standardbasis-Vektoren als Linearkombination darstellen**

$\\{(3,2), (1,2)\\}$ ist eine Basis von $\\mathbb{R}^2$, da $\\det\\begin{pmatrix} 3 & 1 \\\\ 2 & 2 \\end{pmatrix} = 6 - 2 = 4 \\neq 0$.

$e_1 = (1, 0)$: Gesucht $a, b$ mit $(1, 0) = a(3, 2) + b(1, 2)$

$$3a + b = 1, \\quad 2a + 2b = 0 \\Rightarrow a = -b$$

$$3(-b) + b = 1 \\Rightarrow -2b = 1 \\Rightarrow b = -\\frac{1}{2}, \\quad a = \\frac{1}{2}$$

$e_2 = (0, 1)$: Gesucht $c, d$ mit $(0, 1) = c(3, 2) + d(1, 2)$

$$3c + d = 0 \\Rightarrow d = -3c$$
$$2c + 2d = 1 \\Rightarrow 2c - 6c = 1 \\Rightarrow -4c = 1 \\Rightarrow c = -\\frac{1}{4}, \\quad d = \\frac{3}{4}$$

[STEP]
**Schritt 2: Bilder der Standardbasis berechnen**

$$f(e_1) = \\frac{1}{2} f(3,2) - \\frac{1}{2} f(1,2) = \\frac{1}{2}(4,5) - \\frac{1}{2}(2,3) = (1, 1)$$

$$f(e_2) = -\\frac{1}{4} f(3,2) + \\frac{3}{4} f(1,2) = -\\frac{1}{4}(4,5) + \\frac{3}{4}(2,3) = \\left(-1 + \\frac{3}{2},\\; -\\frac{5}{4} + \\frac{9}{4}\\right) = \\left(\\frac{1}{2},\\; 1\\right)$$

[RESULT]
$$M_f = \\begin{pmatrix} 1 & \\frac{1}{2} \\\\ 1 & 1 \\end{pmatrix}$$

Probe: $M_f \\cdot \\begin{pmatrix} 3 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 3+1 \\\\ 3+2 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 5 \\end{pmatrix}$ ✓

$M_f \\cdot \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix} = \\begin{pmatrix} 1+1 \\\\ 1+2 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 3 \\end{pmatrix}$ ✓
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Um die Matrix einer linearen Abbildung zu finden, drücke die Standardbasis-Vektoren als Linearkombination der gegebenen Vektoren aus und wende $f$ linear fort.`,
  },

  {
    id: "ma3-klausur-230928-3",
    title: "Orthonormalbasis — Gram-Schmidt in vorgegebener Reihenfolge",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.09.2023",
    content: `## Aufgabe 3

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Gram-Schmidt, Orthonormalbasis

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sind die Vektoren:
$$v_1 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad v_2 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}, \\quad v_3 = \\begin{pmatrix} 0 \\\\ -1 \\\\ 2 \\end{pmatrix}$$

Bestimmen Sie eine Orthonormalbasis von $\\mathbb{R}^3$ mithilfe des Gram-Schmidt-Verfahrens in der Reihenfolge $v_1, v_2, v_3$.

[STEP]
**Schritt 1: $u_1$ normieren**

$$\\|v_1\\| = \\sqrt{0 + 1 + 1} = \\sqrt{2}$$

$$u_1 = \\frac{v_1}{\\|v_1\\|} = \\frac{1}{\\sqrt{2}}(0, 1, 1)^T$$

[STEP]
**Schritt 2: $u_2$ bestimmen**

Projektion von $v_2$ auf $u_1$:
$$\\langle v_2, u_1 \\rangle = \\frac{1}{\\sqrt{2}}(0 + 0 + 2) = \\frac{2}{\\sqrt{2}} = \\sqrt{2}$$

$$w_2 = v_2 - \\langle v_2, u_1 \\rangle \\cdot u_1 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix} - \\sqrt{2} \\cdot \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\end{pmatrix}$$

$$\\|w_2\\| = \\sqrt{1 + 1 + 1} = \\sqrt{3}$$

$$u_2 = \\frac{w_2}{\\|w_2\\|} = \\frac{1}{\\sqrt{3}}(1, -1, 1)^T$$

[STEP]
**Schritt 3: $u_3$ bestimmen**

Projektionen von $v_3$:
$$\\langle v_3, u_1 \\rangle = \\frac{1}{\\sqrt{2}}(0 - 1 + 2) = \\frac{1}{\\sqrt{2}}$$

$$\\langle v_3, u_2 \\rangle = \\frac{1}{\\sqrt{3}}(0 + 1 + 2) = \\frac{3}{\\sqrt{3}} = \\sqrt{3}$$

$$w_3 = v_3 - \\langle v_3, u_1 \\rangle \\cdot u_1 - \\langle v_3, u_2 \\rangle \\cdot u_2$$

$$= \\begin{pmatrix} 0 \\\\ -1 \\\\ 2 \\end{pmatrix} - \\frac{1}{\\sqrt{2}} \\cdot \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix} - \\sqrt{3} \\cdot \\frac{1}{\\sqrt{3}}\\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\end{pmatrix}$$

$$= \\begin{pmatrix} 0 \\\\ -1 \\\\ 2 \\end{pmatrix} - \\begin{pmatrix} 0 \\\\ 1/2 \\\\ 1/2 \\end{pmatrix} - \\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} -1 \\\\ -1/2 \\\\ 1/2 \\end{pmatrix}$$

$$\\|w_3\\| = \\sqrt{1 + 1/4 + 1/4} = \\sqrt{3/2} = \\frac{\\sqrt{3}}{\\sqrt{2}}$$

$$u_3 = \\frac{w_3}{\\|w_3\\|} = \\frac{\\sqrt{2}}{\\sqrt{3}}\\begin{pmatrix} -1 \\\\ -1/2 \\\\ 1/2 \\end{pmatrix} = \\frac{1}{\\sqrt{6}}\\begin{pmatrix} -2 \\\\ -1 \\\\ 1 \\end{pmatrix}$$

[RESULT]
$$u_1 = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\quad u_2 = \\frac{1}{\\sqrt{3}}\\begin{pmatrix} 1 \\\\ -1 \\\\ 1 \\end{pmatrix}, \\quad u_3 = \\frac{1}{\\sqrt{6}}\\begin{pmatrix} -2 \\\\ -1 \\\\ 1 \\end{pmatrix}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die Reihenfolge der Vektoren im Gram-Schmidt-Verfahren beeinflusst das Ergebnis. Normiere jeden Schritt, um numerische Fehler zu vermeiden.`,
  },

  {
    id: "ma3-klausur-230928-4",
    title: "Matrixinversion — 3×3",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.09.2023",
    content: `## Aufgabe 4

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Inverse Matrix, Gauß-Jordan

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Invertieren Sie die Matrix:
$$A = \\begin{pmatrix} 4 & 1 & 3 \\\\ 1 & 1 & 1 \\\\ 1 & 2 & 1 \\end{pmatrix}$$

[STEP]
**Schritt 1: Determinante berechnen**

$$\\det(A) = 4(1-2) - 1(1-1) + 3(2-1) = 4(-1) - 0 + 3(1) = -4 + 3 = -1$$

Da $\\det(A) = -1 \\neq 0$, ist $A$ invertierbar.

[STEP]
**Schritt 2: Gauß-Jordan-Verfahren**

$\\left(\\begin{array}{ccc|ccc} 4 & 1 & 3 & 1 & 0 & 0 \\\\ 1 & 1 & 1 & 0 & 1 & 0 \\\\ 1 & 2 & 1 & 0 & 0 & 1 \\endend{array}\\right)$

$Z_1 \\leftrightarrow Z_2$:
$$\\left(\\begin{array}{ccc|ccc} 1 & 1 & 1 & 0 & 1 & 0 \\\\ 4 & 1 & 3 & 1 & 0 & 0 \\\\ 1 & 2 & 1 & 0 & 0 & 1 \\end{array}\\right)$$

$Z_2 - 4Z_1$, $Z_3 - Z_1$:
$$\\left(\\begin{array}{ccc|ccc} 1 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & -3 & -1 & 1 & -4 & 0 \\\\ 0 & 1 & 0 & 0 & -1 & 1 \\end{array}\\right)$$

$Z_2 \\leftrightarrow Z_3$:
$$\\left(\\begin{array}{ccc|ccc} 1 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 0 & 0 & -1 & 1 \\\\ 0 & -3 & -1 & 1 & -4 & 0 \\end{array}\\right)$$

$Z_3 + 3Z_2$:
$$\\left(\\begin{array}{ccc|ccc} 1 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 0 & 0 & -1 & 1 \\\\ 0 & 0 & -1 & 1 & -7 & 3 \\end{array}\\right)$$

$Z_3 \\cdot (-1)$:
$$\\left(\\begin{array}{ccc|ccc} 1 & 1 & 1 & 0 & 1 & 0 \\\\ 0 & 1 & 0 & 0 & -1 & 1 \\\\ 0 & 0 & 1 & -1 & 7 & -3 \\end{array}\\right)$$

$Z_1 - Z_2 - Z_3$:
$$\\left(\\begin{array}{ccc|ccc} 1 & 0 & 0 & 1 & -5 & 2 \\\\ 0 & 1 & 0 & 0 & -1 & 1 \\\\ 0 & 0 & 1 & -1 & 7 & -3 \\end{array}\\right)$$

[RESULT]
$$A^{-1} = \\begin{pmatrix} 1 & -5 & 2 \\\\ 0 & -1 & 1 \\\\ -1 & 7 & -3 \\end{pmatrix}$$

Probe: $A \\cdot A^{-1} = I$ ✓
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die Inverse einer Matrix lässt sich mit dem Gauß-Jordan-Verfahren effizient berechnen. Die Determinante zeigt vorab, ob die Inversion möglich ist.`,
  },

  {
    id: "ma3-klausur-230928-5",
    title: "Eigenwerte und Matrixpotenz-Grenzwert",
    duration: "25 min",
    type: "text",
    group: "📝 Klausur 28.09.2023",
    content: `## Aufgabe 5

> **📋 25 Punkte** | ⏱ 25 min | 🔑 Eigenwerte, Diagonalisierung, Grenzwert

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist die Matrix:
$$B = \\begin{pmatrix} \\frac{1}{2} & \\frac{1}{4} & \\frac{1}{4} \\\\ \\frac{1}{4} & \\frac{1}{2} & \\frac{1}{4} \\\\ \\frac{1}{4} & \\frac{1}{4} & \\frac{1}{2} \\end{pmatrix}$$

(a) Zeigen Sie, dass die Eigenwerte $1$ und $\\frac{1}{4}$ sind.
(b) Berechnen Sie $\\lim_{n \\to \\infty} B^n$.

[STEP]
**Schritt 1: Eigenwerte bestimmen**

$$B = \\frac{1}{4}\\begin{pmatrix} 2 & 1 & 1 \\\\ 1 & 2 & 1 \\\\ 1 & 1 & 2 \\end{pmatrix} = \\frac{1}{4}(I + J)$$

wobei $J$ die Einsmatrix (alle Einträge 1) ist.

Die Matrix $I + J$ hat Eigenwerte: $1 + 3 = 4$ (zum Eigenvektor $(1,1,1)^T$) und $1 + 0 = 1$ (Vielfachheit 2, orthogonal zu $(1,1,1)^T$).

Also hat $B = \\frac{1}{4}(I+J)$ Eigenwerte:
$$\\lambda_1 = \\frac{4}{4} = 1, \\quad \\lambda_2 = \\lambda_3 = \\frac{1}{4}$$

[STEP]
**Schritt 2: Eigenvektoren bestimmen**

**$\\lambda_1 = 1$:** $(B - I)v = 0$

$$B - I = \\begin{pmatrix} -1/2 & 1/4 & 1/4 \\\\ 1/4 & -1/2 & 1/4 \\\\ 1/4 & 1/4 & -1/2 \\end{pmatrix}$$

$v_1 = (1, 1, 1)^T$ (offensichtlich, da alle Zeilen gleich sind).

**$\\lambda_2 = 1/4$:** $(B - \\frac{1}{4}I)v = 0$

$$B - \\frac{1}{4}I = \\begin{pmatrix} 1/4 & 1/4 & 1/4 \\\\ 1/4 & 1/4 & 1/4 \\\\ 1/4 & 1/4 & 1/4 \\end{pmatrix}$$

Rang 1 → $\\dim(\\ker) = 2$. Eigenvektoren: $v_2 = (1, -1, 0)^T$, $v_3 = (1, 0, -1)^T$.

[STEP]
**Schritt 3: Diagonalisierung**

$$B = S \\cdot D \\cdot S^{-1}$$

mit $D = \\text{diag}(1, 1/4, 1/4)$ und $S = (v_1, v_2, v_3)$.

$$B^n = S \\cdot D^n \\cdot S^{-1} = S \\cdot \\text{diag}(1, (1/4)^n, (1/4)^n) \\cdot S^{-1}$$

[STEP]
**Schritt 4: Grenzwert berechnen**

$$\\lim_{n \\to \\infty} (1/4)^n = 0$$

$$\\lim_{n \\to \\infty} D^n = \\text{diag}(1, 0, 0)$$

$$\\lim_{n \\to \\infty} B^n = S \\cdot \\text{diag}(1, 0, 0) \\cdot S^{-1}$$

Dies ist die Projektion auf den Eigenraum zum Eigenwert 1. Da $v_1 = (1,1,1)^T$ und die Gesamtheit der Vektoren symmetrisch ist:

$$\\lim_{n \\to \\infty} B^n = \\frac{1}{3}\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix}$$

[RESULT]
**Eigenwerte:** $\\lambda_1 = 1$ (Vielfachheit 1), $\\lambda_2 = \\lambda_3 = \\frac{1}{4}$ (Vielfachheit 2).

$$\\lim_{n \\to \\infty} B^n = \\frac{1}{3}\\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix}$$

Interpretation: $B^n$ konvergiert gegen die uniforme Verteilungsmatrix — jeder Zustand konvergiert gegen $\\frac{1}{3}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Der Grenzwert $\\lim B^n$ existiert genau dann, wenn alle Eigenwerte $|\\lambda| \\leq 1$ gelten und Eigenwerte mit $|\\lambda| = 1$ gleich 1 sind. Die Matrix $\\frac{1}{3}J$ ist die Projektion auf den Eigenraum zum Eigenwert 1.`,
  },

  {
    id: "ma3-klausur-230928-6",
    title: "Symmetrie von C^T·C und Jordan-Formen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 28.09.2023",
    content: `## Aufgabe 6

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Symmetrie, Jordan-Normalform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $C \\in \\mathbb{R}^{m \\times n}$.

(i) Zeigen Sie, dass $C^T C$ symmetrisch ist.
(ii) Bestimmen Sie alle möglichen Jordan-Normalformen von $C^T C$ für $n = 3$.

[STEP]
**Schritt 1: (i) — Symmetrie beweisen**

Eine Matrix $M$ ist symmetrisch, wenn $M^T = M$.

$$(C^T C)^T = C^T (C^T)^T = C^T C$$

Also ist $C^T C$ symmetrisch. $\\quad \\blacksquare$

[STEP]
**Schritt 2: (ii) — Eigenschaften von $C^T C$**

Da $C^T C$ symmetrisch ist, gilt:
- Alle Eigenwerte sind reell
- $C^T C$ ist diagonalisierbar (Spektralsatz)
- Die Jordan-Normalform ist eine Diagonalmatrix

Zusätzlich ist $C^T C$ positiv semidefinit, denn:
$$x^T (C^T C) x = (Cx)^T (Cx) = \\|Cx\\|^2 \\geq 0$$

Also sind alle Eigenwerte $\\geq 0$.

[STEP]
**Schritt 3: Mögliche Jordan-Normalformen für $n = 3$**

Da $C^T C$ symmetrisch und positiv semidefinit ist, hat die Jordan-Normalform die Form:

$$J = \\text{diag}(\\lambda_1, \\lambda_2, \\lambda_3) \\quad \\text{mit } \\lambda_i \\geq 0$$

Die möglichen Strukturen (nach Eigenwert-Multiplizitäten):

**Fall 1:** Drei verschiedene Eigenwerte $\\lambda_1 > \\lambda_2 > \\lambda_3 > 0$
$$J = \\text{diag}(\\lambda_1, \\lambda_2, \\lambda_3)$$

**Fall 2:** Zwei Eigenwerte, einer doppelt: $\\lambda_1 > \\lambda_2 > 0$
$$J = \\text{diag}(\\lambda_1, \\lambda_1, \\lambda_2)$$

**Fall 3:** Ein Eigenwert dreifach: $\\lambda > 0$
$$J = \\text{diag}(\\lambda, \\lambda, \\lambda)$$

**Fall 4:** Ein Eigenwert ist 0: $\\lambda_1 > \\lambda_2 > 0$
$$J = \\text{diag}(\\lambda_1, \\lambda_2, 0)$$

**Fall 5:** Zwei Eigenwerte sind 0: $\\lambda > 0$
$$J = \\text{diag}(\\lambda, 0, 0)$$

**Fall 6:** Alle Eigenwerte sind 0:
$$J = \\text{diag}(0, 0, 0)$$

[RESULT]
(i) $(C^T C)^T = C^T (C^T)^T = C^T C$ → symmetrisch. $\\quad \\blacksquare$

(ii) Da $C^T C$ symmetrisch und positiv semidefinit ist, ist die Jordan-Form immer eine Diagonalmatrix mit Einträgen $\\lambda_i \\geq 0$. Für $n = 3$ gibt es keine nicht-trivialen Jordan-Blöcke — die Matrix ist immer diagonalisierbar.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Symmetrische Matrizen sind immer diagonalisierbar (Spektralsatz). Für $C^T C$ kommt noch die positive Semidefinität hinzu, sodass alle Eigenwerte $\\geq 0$ sind. Es gibt keine nicht-trivialen Jordan-Blöcke.`,
  },
];
