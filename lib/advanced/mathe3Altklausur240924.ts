import { Lesson } from "../types";

export const mathe3Altklausur240924: Lesson[] = [
  {
    id: "ma3-klausur-240924-1",
    title: "Parametergestütztes Gleichungssystem",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.09.2024",
    content: `## Aufgabe 1 — Parametergestütztes Gleichungssystem

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Gauß-Verfahren, Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie das folgende Gleichungssystem für alle $\\alpha, \\beta \\in \\mathbb{R}$:

$$\\begin{pmatrix} \\alpha & 1 & 1 \\\\ 1 & \\alpha & 1 \\\\ 1 & 1 & \\alpha \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ \\beta \\\\ 1 \\end{pmatrix}$$

Bestimmen Sie die Lösungsmenge in Abhängigkeit von $\\alpha$ und $\\beta$.

[STEP]
**Schritt 1: Erweiterte Matrix aufstellen**

$$\\tilde{A} = \\left(\\begin{array}{ccc|c} \\alpha & 1 & 1 & 1 \\\\ 1 & \\alpha & 1 & \\beta \\\\ 1 & 1 & \\alpha & 1 \\end{array}\\right)$$

[STEP]
**Schritt 2: Zeilenvertauschung und Vorwärtselimination**

Zeile 1 und Zeile 2 tauschen (für $\\alpha = 0$ Sonderfall):

$$\\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ \\alpha & 1 & 1 & 1 \\\\ 1 & 1 & \\alpha & 1 \\end{array}\\right)$$

$Z_2 \\leftarrow Z_2 - \\alpha \\cdot Z_1$, $Z_3 \\leftarrow Z_3 - Z_1$:

$$\\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ 0 & 1 - \\alpha^2 & 1 - \\alpha & 1 - \\alpha\\beta \\\\ 0 & 1 - \\alpha & \\alpha - 1 & 1 - \\beta \\end{array}\\right)$$

[STEP]
**Schritt 3: Vereinfachung**

Für $\\alpha \\neq 1$: In Zeile 3 durch $(1 - \\alpha)$ dividieren:

$$\\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ 0 & 1 - \\alpha^2 & 1 - \\alpha & 1 - \\alpha\\beta \\\\ 0 & -1 & -1 & \\frac{1 - \\beta}{1 - \\alpha} \\end{array}\\right)$$

Da $1 - \\alpha^2 = (1 - \\alpha)(1 + \\alpha)$, Zeile 2 durch $(1 - \\alpha)$ teilen (für $\\alpha \\neq 1$):

$$\\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ 0 & 1 + \\alpha & 1 & \\frac{1 - \\alpha\\beta}{1 - \\alpha} \\\\ 0 & -1 & -1 & \\frac{1 - \\beta}{1 - \\alpha} \\end{array}\\right)$$

[STEP]
**Schritt 4: Fall $\\alpha = 1$**

$$\\tilde{A} = \\left(\\begin{array}{ccc|c} 1 & 1 & 1 & \\beta \\\\ 0 & 0 & 0 & 1 - \\beta \\\\ 0 & 0 & 0 & 1 - \\beta \\end{array}\\right)$$

- Falls $\\beta \\neq 1$: **Keine Lösung** (Widerspruch $0 = 1 - \\beta \\neq 0$).
- Falls $\\beta = 1$: $x + y + z = 1$. Lösung: $\\{(1 - y - z, y, z) : y, z \\in \\mathbb{R}\\}$.

[STEP]
**Schritt 5: Fall $\\alpha = -1$**

$$\\tilde{A} = \\left(\\begin{array}{ccc|c} 1 & -1 & 1 & \\beta \\\\ 0 & 0 & 1 & \\frac{1 + \\beta}{2} \\\\ 0 & -1 & -1 & \\frac{1 - \\beta}{2} \\end{array}\\right)$$

Zeile 2 und 3 tauschen, dann weiterreduzieren:

$$\\left(\\begin{array}{ccc|c} 1 & -1 & 1 & \\beta \\\\ 0 & 1 & 1 & \\frac{\\beta - 1}{2} \\\\ 0 & 0 & 1 & \\frac{1 + \\beta}{2} \\end{array}\\right)$$

Rückwärtselimination:

$z = \\frac{1 + \\beta}{2}$, $y = \\frac{\\beta - 1}{2} - z = \\frac{\\beta - 1}{2} - \\frac{1 + \\beta}{2} = -1$

$x = \\beta + y - z = \\beta - 1 - \\frac{1 + \\beta}{2} = \\frac{2\\beta - 2 - 1 - \\beta}{2} = \\frac{\\beta - 3}{2}$

Eindeutige Lösung: $(x, y, z) = \\left(\\frac{\\beta - 3}{2}, -1, \\frac{1 + \\beta}{2}\\right)$.

[STEP]
**Schritt 6: Fall $\\alpha \\neq \\pm 1$**

Rückwärtselimination auf der Stufenform. Aus Zeile 3:

$$-(1) \\cdot y + (-1) \\cdot z = \\frac{1 - \\beta}{1 - \\alpha}$$

$$y + z = \\frac{\\beta - 1}{1 - \\alpha}$$

Aus Zeile 2: $(1 + \\alpha) y + z = \\frac{1 - \\alpha\\beta}{1 - \\alpha}$

Subtraktion: $\\alpha y = \\frac{1 - \\alpha\\beta}{1 - \\alpha} - \\frac{\\beta - 1}{1 - \\alpha} = \\frac{2 - \\beta(1 + \\alpha)}{1 - \\alpha}$

$$y = \\frac{2 - \\beta(1 + \\alpha)}{\\alpha(1 - \\alpha)}$$

$$z = \\frac{\\beta - 1}{1 - \\alpha} - y = \\frac{\\beta - 1}{1 - \\alpha} - \\frac{2 - \\beta(1 + \\alpha)}{\\alpha(1 - \\alpha)}$$

$$= \\frac{\\alpha(\\beta - 1) - 2 + \\beta(1 + \\alpha)}{\\alpha(1 - \\alpha)} = \\frac{2\\alpha\\beta - \\alpha - 2 + \\beta}{\\alpha(1 - \\alpha)}$$

Und $x = \\beta - \\alpha y - z$.

[RESULT]
- **$\\alpha = 1, \\beta \\neq 1$:** Keine Lösung
- **$\\alpha = 1, \\beta = 1$:** $\\{(1 - y - z, y, z) : y, z \\in \\mathbb{R}\\}$
- **$\\alpha = -1$:** Eindeutige Lösung $\\left(\\frac{\\beta - 3}{2}, -1, \\frac{1 + \\beta}{2}\\right)$
- **$\\alpha \\neq \\pm 1$:** Eindeutige Lösung (obige Formeln)
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole das **Gauß-Verfahren mit Parametern** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240924-2",
    title: "Bijectivität & Inverse Matrix",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.09.2024",
    content: `## Aufgabe 2 — Bijectivität & Inverse Matrix

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Determinante, Inverse Matrix

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$A = \\begin{pmatrix} 4 & -1 & 1 \\\\ -5 & 2 & -3 \\\\ \\lambda & 0 & 1 \\end{pmatrix}$$

Für welche $\\lambda \\in \\mathbb{R}$ ist $A$ bijektiv? Berechnen Sie $A^{-1}$.

[STEP]
**Schritt 1: Determinante berechnen**

$$\\det(A) = 4 \\cdot \\det\\begin{pmatrix} 2 & -3 \\\\ 0 & 1 \\end{pmatrix} - (-1) \\cdot \\det\\begin{pmatrix} -5 & -3 \\\\ \\lambda & 1 \\end{pmatrix} + 1 \\cdot \\det\\begin{pmatrix} -5 & 2 \\\\ \\lambda & 0 \\end{pmatrix}$$

$$= 4(2 - 0) + 1(-5 + 3\\lambda) + 1(0 - 2\\lambda)$$

$$= 8 - 5 + 3\\lambda - 2\\lambda = 3 + \\lambda$$

[STEP]
**Schritt 2: Bijectivität**

$A$ ist bijektiv $\\iff$ $\\det(A) \\neq 0$:

$$3 + \\lambda \\neq 0 \\implies \\lambda \\neq -3$$

[STEP]
**Schritt 3: Inverse berechnen (allgemein)**

Für $\\lambda \\neq -3$: $A^{-1} = \\frac{1}{\\det(A)} \\cdot \\operatorname{adj}(A)$.

**Kofaktormatrix:**

$$C_{11} = +\\det\\begin{pmatrix} 2 & -3 \\\\ 0 & 1 \\end{pmatrix} = 2, \\quad C_{12} = -\\det\\begin{pmatrix} -5 & -3 \\\\ \\lambda & 1 \\end{pmatrix} = -(-5 + 3\\lambda) = 5 - 3\\lambda$$

$$C_{13} = +\\det\\begin{pmatrix} -5 & 2 \\\\ \\lambda & 0 \\end{pmatrix} = -2\\lambda$$

$$C_{21} = -\\det\\begin{pmatrix} -1 & 1 \\\\ 0 & 1 \\end{pmatrix} = -(-1) = 1, \\quad C_{22} = +\\det\\begin{pmatrix} 4 & 1 \\\\ \\lambda & 1 \\end{pmatrix} = 4 - \\lambda$$

$$C_{23} = -\\det\\begin{pmatrix} 4 & -1 \\\\ \\lambda & 0 \\end{pmatrix} = -(0 + \\lambda) = -\\lambda$$

$$C_{31} = +\\det\\begin{pmatrix} -1 & 1 \\\\ 2 & -3 \\end{pmatrix} = 3 - 2 = 1$$

$$C_{32} = -\\det\\begin{pmatrix} 4 & 1 \\\\ -5 & -3 \\end{pmatrix} = -(-12 + 5) = 7$$

$$C_{33} = +\\det\\begin{pmatrix} 4 & -1 \\\\ -5 & 2 \\end{pmatrix} = 8 - 5 = 3$$

[STEP]
**Schritt 4: Adjunkte und Inverse**

$$\\operatorname{adj}(A) = C^T = \\begin{pmatrix} 2 & 1 & 1 \\\\ 5 - 3\\lambda & 4 - \\lambda & 7 \\\\ -2\\lambda & -\\lambda & 3 \\end{pmatrix}$$

$$A^{-1} = \\frac{1}{3 + \\lambda} \\begin{pmatrix} 2 & 1 & 1 \\\\ 5 - 3\\lambda & 4 - \\lambda & 7 \\\\ -2\\lambda & -\\lambda & 3 \\end{pmatrix}$$

[RESULT]
- $A$ ist bijektiv $\\iff$ $\\lambda \\neq -3$
- $A^{-1} = \\frac{1}{3 + \\lambda} \\begin{pmatrix} 2 & 1 & 1 \\\\ 5 - 3\\lambda & 4 - \\lambda & 7 \\\\ -2\\lambda & -\\lambda & 3 \\end{pmatrix}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durcharbeitet. Wiederhole **Determinante, Kofaktoren und inverse Matrix** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240924-3",
    title: "Lineare Abbildung — Existenz",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.09.2024",
    content: `## Aufgabe 3 — Existenz einer linearen Abbildung

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Linearität, Widerspruch

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Existiert eine lineare Abbildung $f: \\mathbb{R}^2 \\to \\mathbb{R}^2$ mit:
$$f(2, 1) = (3, 1), \\quad f(1, 0) = (2, 2), \\quad f(0, 1) = (-1, 1)$$

[STEP]
**Schritt 1: Linearitätsbedingung prüfen**

Wenn $f$ linear ist, dann gilt für alle $x, y$ und $\\alpha, \\beta$:

$$f(\\alpha x + \\beta y) = \\alpha f(x) + \\beta f(y)$$

[STEP]
**Schritt 2: Zusammenhang nutzen**

Der Vektor $(2, 1)$ lässt sich darstellen als:

$$(2, 1) = 2 \\cdot (1, 0) + 1 \\cdot (0, 1)$$

Falls $f$ linear wäre:

$$f(2, 1) = 2 \\cdot f(1, 0) + 1 \\cdot f(0, 1)$$

[STEP]
**Schritt 3: Widerspruch aufzeigen**

$$f(2, 1) = 2 \\cdot (2, 2) + 1 \\cdot (-1, 1) = (4, 4) + (-1, 1) = (3, 5)$$

Aber es soll $f(2, 1) = (3, 1)$ gelten.

$$\\underbrace{(3, 5)}_{\\text{Linearität}} \\neq \\underbrace{(3, 1)}_{\\text{Vorgabe}}$$

**Widerspruch!**

[RESULT]
**Nein**, es existiert keine solche lineare Abbildung, da die Linearitätsbedingung verletzt wird.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Linearitätsbedingung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240924-4",
    title: "Orthonormalbasen — Gram-Schmidt",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.09.2024",
    content: `## Aufgabe 4 — Orthogonale Basen

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Gram-Schmidt, Orthogonalprojektion

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben seien die Vektoren in $\\mathbb{R}^3$:
$$u_1 = (1, 0, 1)^T, \\quad u_2 = (1, 1, 0)^T, \\quad u_3 = (0, 1, 1)^T$$

Sei $U = \\langle u_1, u_2, u_3 \\rangle$.

Bestimmen Sie eine orthogonale Basis von $U$ und eine orthogonale Basis von $U^\\perp$.

[STEP]
**Schritt 1: Prüfung ob $u_1, u_2, u_3$ linear unabhängig**

$$\\det(u_1, u_2, u_3) = \\det\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 0 & 1 \\end{pmatrix}$$

$$= 1(1 - 0) - 1(0 - 1) + 0 = 1 + 1 = 2 \\neq 0$$

→ $u_1, u_2, u_3$ sind linear unabhängig, $U = \\mathbb{R}^3$, also $U^\\perp = \\{0\\}$.

**Hinweis:** Da $U = \\mathbb{R}^3$ ist, gibt es kein nicht-triviales $U^\\perp$. Wir berechnen trotzdem eine orthogonale Basis von $U$ via Gram-Schmidt.

[STEP]
**Schritt 2: Gram-Schmidt — Schritt 1**

$$v_1 = u_1 = (1, 0, 1)^T$$

[STEP]
**Schritt 3: Gram-Schmidt — Schritt 2**

$$v_2 = u_2 - \\frac{\\langle u_2, v_1 \\rangle}{\\langle v_1, v_1 \\rangle} v_1$$

$$\\langle u_2, v_1 \\rangle = 1 \\cdot 1 + 1 \\cdot 0 + 0 \\cdot 1 = 1$$

$$\\langle v_1, v_1 \\rangle = 1 + 0 + 1 = 2$$

$$v_2 = (1, 1, 0)^T - \\frac{1}{2}(1, 0, 1)^T = \\left(\\frac{1}{2}, 1, -\\frac{1}{2}\\right)^T$$

[STEP]
**Schritt 4: Gram-Schmidt — Schritt 3**

$$v_3 = u_3 - \\frac{\\langle u_3, v_1 \\rangle}{\\langle v_1, v_1 \\rangle} v_1 - \\frac{\\langle u_3, v_2 \\rangle}{\\langle v_2, v_2 \\rangle} v_2$$

$$\\langle u_3, v_1 \\rangle = 0 + 0 + 1 = 1$$

$$\\langle u_3, v_2 \\rangle = 0 + 1 - \\frac{1}{2} = \\frac{1}{2}$$

$$\\langle v_2, v_2 \\rangle = \\frac{1}{4} + 1 + \\frac{1}{4} = \\frac{3}{2}$$

$$v_3 = (0, 1, 1)^T - \\frac{1}{2}(1, 0, 1)^T - \\frac{1/2}{3/2}\\left(\\frac{1}{2}, 1, -\\frac{1}{2}\\right)^T$$

$$= (0, 1, 1)^T - \\left(\\frac{1}{2}, 0, \\frac{1}{2}\\right)^T - \\frac{1}{3}\\left(\\frac{1}{2}, 1, -\\frac{1}{2}\\right)^T$$

$$= \\left(-\\frac{1}{2}, 1, \\frac{1}{2}\\right)^T - \\left(\\frac{1}{6}, \\frac{1}{3}, -\\frac{1}{6}\\right)^T = \\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)^T$$

[STEP]
**Schritt 5: Orthogonale Basis und Normierung**

Orthogonale Basis von $U = \\mathbb{R}^3$:

$$v_1 = (1, 0, 1)^T, \\quad v_2 = \\left(\\frac{1}{2}, 1, -\\frac{1}{2}\\right)^T, \\quad v_3 = \\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)^T$$

Normierte Version:

$$e_1 = \\frac{1}{\\sqrt{2}}(1, 0, 1)^T, \\quad e_2 = \\frac{1}{\\sqrt{3/2}}\\left(\\frac{1}{2}, 1, -\\frac{1}{2}\\right)^T, \\quad e_3 = \\frac{1}{\\sqrt{4/3}}\\left(-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3}\\right)^T$$

[RESULT]
- **Orthogonale Basis von $U$:** $\\{(1,0,1)^T, \\; (\\frac{1}{2}, 1, -\\frac{1}{2})^T, \\; (-\\frac{2}{3}, \\frac{2}{3}, \\frac{2}{3})^T\\}$
- **$U^\\perp = \\{0\\}$**, da $U = \\mathbb{R}^3$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Gram-Schmidt und Orthogonalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240924-5",
    title: "Diagonalisierbarkeit — Drei Matrizen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.09.2024",
    content: `## Aufgabe 5 — Diagonalisierbarkeit

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Eigenwerte, Diagonalisierbarkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Welche der folgenden Matrizen sind über $\\mathbb{R}$ diagonalisierbar?

$$A = \\begin{pmatrix} 1 & 1 & 0 \\\\ 1 & 1 & 1 \\\\ 0 & 1 & 2 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 2 \\end{pmatrix}, \\quad C = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 2 \\end{pmatrix}$$

[STEP]
**Schritt 1: Eigenwerte von $A$**

$$\\det(A - \\lambda I) = \\det\\begin{pmatrix} 1-\\lambda & 1 & 0 \\\\ 1 & 1-\\lambda & 1 \\\\ 0 & 1 & 2-\\lambda \\end{pmatrix}$$

$$= (1-\\lambda)\\bigl[(1-\\lambda)(2-\\lambda) - 1\\bigr] - 1\\bigl[(2-\\lambda) - 0\\bigr]$$

$$= (1-\\lambda)(\\lambda^2 - 3\\lambda + 1) - (2-\\lambda)$$

$$= (1-\\lambda)(\\lambda^2 - 3\\lambda + 1) + (\\lambda - 2)$$

$$= -\\lambda^3 + 4\\lambda^2 - 4\\lambda + 1 + \\lambda - 2$$

$$= -\\lambda^3 + 4\\lambda^2 - 3\\lambda - 1$$

Numerisch: $\\lambda_1 \\approx -0{,}198$, $\\lambda_2 \\approx 1{,}555$, $\\lambda_3 \\approx 2{,}643$.

**Drei verschiedene reelle Eigenwerte → $A$ ist diagonalisierbar.** ✓

[STEP]
**Schritt 2: Eigenwerte von $B$**

$B$ ist oberhalb der Diagonalen, Eigenwerte auf der Diagonale:

$$\\lambda_1 = 1 \\text{ (Vielfachheit 2)}, \\quad \\lambda_2 = 2 \\text{ (Vielfachheit 1)}$$

Geometrische Vielfachheit von $\\lambda = 1$:

$$B - I = \\begin{pmatrix} 0 & 1 & 0 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

$\\operatorname{rang}(B - I) = 2$, also $\\dim(\\ker(B - I)) = 3 - 2 = 1$.

AM($\\lambda = 1$) = 2, GM($\\lambda = 1$) = 1. **AM ≠ GM → $B$ ist NICHT diagonalisierbar.** ✗

[STEP]
**Schritt 3: Eigenwerte von $C$**

$C$ ist oberhalb der Diagonalen:

$$\\lambda_1 = 1 \\text{ (Vielfachheit 2)}, \\quad \\lambda_2 = 2 \\text{ (Vielfachheit 1)}$$

Geometrische Vielfachheit von $\\lambda = 1$:

$$C - I = \\begin{pmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix} \\xrightarrow{Z_3 - Z_2} \\begin{pmatrix} 0 & 0 & 0 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}$$

$\\operatorname{rang}(C - I) = 1$, also $\\dim(\\ker(C - I)) = 3 - 1 = 2$.

AM($\\lambda = 1$) = 2, GM($\\lambda = 1$) = 2. **AM = GM für alle Eigenwerte → $C$ ist diagonalisierbar.** ✓

[RESULT]
- **$A$: diagonalisierbar** (3 verschiedene Eigenwerte)
- **$B$: NICHT diagonalisierbar** (AM = 2, GM = 1 für $\\lambda = 1$)
- **$C$: diagonalisierbar** (AM = GM für alle Eigenwerte)
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Diagonalisierbarkeit und algebraische/geometrische Vielfachheit** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240924-6",
    title: "Eigenwerte & Jordannormform",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 24.09.2024",
    content: `## Aufgabe 6 — Eigenwerte, Vielfachheiten & Jordannormform

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Eigenwerte, Eigenvektoren, Jordannormform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$A = \\begin{pmatrix} 0 & -1 & 5 \\\\ 1 & 2 & -9 \\\\ 0 & 0 & -3 \\end{pmatrix}$$

Bestimmen Sie die Eigenwerte, Vielfachheiten, Eigenbasen und die Jordannormform.

[STEP]
**Schritt 1: Charakteristisches Polynom**

$A$ ist blockdreiecksmatrix (unten links $2 \\times 1$ Block, oben rechts irrelevant für Determinante):

$$\\det(A - \\lambda I) = \\det\\begin{pmatrix} -\\lambda & -1 & 5 \\\\ 1 & 2-\\lambda & -9 \\\\ 0 & 0 & -3-\\lambda \\end{pmatrix}$$

Entwicklung nach der dritten Zeile:

$$= (-3 - \\lambda) \\cdot \\det\\begin{pmatrix} -\\lambda & -1 \\\\ 1 & 2-\\lambda \\end{pmatrix}$$

$$= (-3 - \\lambda) \\bigl[-\\lambda(2 - \\lambda) + 1\\bigr]$$

$$= (-3 - \\lambda)(\\lambda^2 - 2\\lambda + 1) = (-3 - \\lambda)(\\lambda - 1)^2$$

[STEP]
**Schritt 2: Eigenwerte**

$$\\lambda_1 = -3 \\text{ (AM = 1)}, \\quad \\lambda_2 = 1 \\text{ (AM = 2)}$$

[STEP]
**Schritt 3: Eigenvektor für $\\lambda = -3$**

$$A + 3I = \\begin{pmatrix} 3 & -1 & 5 \\\\ 1 & 5 & -9 \\\\ 0 & 0 & 0 \\end{pmatrix}$$

$Z_2 \\leftarrow Z_2 - \\frac{1}{3}Z_1$:

$$\\begin{pmatrix} 3 & -1 & 5 \\\\ 0 & \\frac{16}{3} & -\\frac{32}{3} \\\\ 0 & 0 & 0 \\end{pmatrix}$$

Aus Zeile 2: $y = 2z$. Aus Zeile 1: $3x - y + 5z = 0 \\implies 3x = y - 5z = 2z - 5z = -3z \\implies x = -z$.

Eigenvektor: $v_1 = (-1, 2, 1)^T$. GM = 1. ✓

[STEP]
**Schritt 4: Eigenvektoren für $\\lambda = 1$**

$$A - I = \\begin{pmatrix} -1 & -1 & 5 \\\\ 1 & 1 & -9 \\\\ 0 & 0 & -4 \\end{pmatrix}$$

$Z_2 \\leftarrow Z_2 + Z_1$:

$$\\begin{pmatrix} -1 & -1 & 5 \\\\ 0 & 0 & -4 \\\\ 0 & 0 & -4 \\end{pmatrix} \\xrightarrow{Z_3 - Z_2} \\begin{pmatrix} -1 & -1 & 5 \\\\ 0 & 0 & -4 \\\\ 0 & 0 & 0 \\end{pmatrix}$$

Aus Zeile 2: $z = 0$. Aus Zeile 1: $-x - y = 0 \\implies x = -y$.

Eigenvektor: $v_2 = (-1, 1, 0)^T$. GM = 1.

AM($\\lambda = 1$) = 2, GM($\\lambda = 1$) = 1 → **nicht diagonalisierbar**.

[STEP]
**Schritt 5: Jordannormform**

Da $\\lambda = 1$ eine Jordan-Block der Größe 2 braucht:

$$J = \\begin{pmatrix} -3 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

[RESULT]
- **Eigenwerte:** $\\lambda_1 = -3$ (AM = 1, GM = 1), $\\lambda_2 = 1$ (AM = 2, GM = 1)
- **Eigenbasis:** $v_1 = (-1, 2, 1)^T$, $v_2 = (-1, 1, 0)^T$
- **Jordannormform:** $J = \\begin{pmatrix} -3 & 0 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Eigenwerte, Jordannormform und Jordan-Blöcke** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
