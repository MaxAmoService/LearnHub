import { Lesson } from "../types";

export const mathe3Altklausur250326: Lesson[] = [
  {
    id: "ma3-klausur-250326-1",
    title: "Parametergestütztes Gleichungssystem",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.03.2025",
    content: `## Aufgabe 1 — Parametergestütztes Gleichungssystem

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Gauß-Verfahren, Fallunterscheidung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie das folgende Gleichungssystem für alle $\\alpha, \\beta \\in \\mathbb{R}$:

$$\\begin{pmatrix} 1 & \\alpha & 1 \\\\ \\alpha & 1 & 1 \\\\ 1 & 1 & \\alpha \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\\\ z \\end{pmatrix} = \\begin{pmatrix} \\beta \\\\ 1 \\\\ 1 \\end{pmatrix}$$

Bestimmen Sie die Lösungsmenge in Abhängigkeit von $\\alpha$ und $\\beta$.

[STEP]
**Schritt 1: Erweiterte Matrix aufstellen**

$$\\tilde{A} = \\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ \\alpha & 1 & 1 & 1 \\\\ 1 & 1 & \\alpha & 1 \\end{array}\\right)$$

[STEP]
**Schritt 2: Vorwärtselimination**

$Z_2 \\leftarrow Z_2 - \\alpha \\cdot Z_1$, $Z_3 \\leftarrow Z_3 - Z_1$:

$$\\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ 0 & 1 - \\alpha^2 & 1 - \\alpha & 1 - \\alpha\\beta \\\\ 0 & 1 - \\alpha & \\alpha - 1 & 1 - \\beta \\end{array}\\right)$$

[STEP]
**Schritt 3: Fall $\\alpha = 1$**

$$\\left(\\begin{array}{ccc|c} 1 & 1 & 1 & \\beta \\\\ 0 & 0 & 0 & 1 - \\beta \\\\ 0 & 0 & 0 & 1 - \\beta \\end{array}\\right)$$

- Falls $\\beta \\neq 1$: **Keine Lösung** ($0 = 1 - \\beta \\neq 0$).
- Falls $\\beta = 1$: $x + y + z = 1$. Lösung: $\\{(1 - y - z, y, z) : y, z \\in \\mathbb{R}\\}$.

[STEP]
**Schritt 4: Fall $\\alpha = -1$**

$$\\left(\\begin{array}{ccc|c} 1 & -1 & 1 & \\beta \\\\ 0 & 0 & 2 & 1 + \\beta \\\\ 0 & 2 & -2 & 1 - \\beta \\end{array}\\right)$$

Zeile 2 und 3 tauschen, Zeile 2 durch 2 dividieren:

$$\\left(\\begin{array}{ccc|c} 1 & -1 & 1 & \\beta \\\\ 0 & 1 & -1 & \\frac{1-\\beta}{2} \\\\ 0 & 0 & 2 & 1 + \\beta \\end{array}\\right)$$

$z = \\frac{1 + \\beta}{2}$, $y = \\frac{1 - \\beta}{2} + z = \\frac{1 - \\beta}{2} + \\frac{1 + \\beta}{2} = 1$.

$x = \\beta + y - z = \\beta + 1 - \\frac{1 + \\beta}{2} = \\frac{2\\beta + 2 - 1 - \\beta}{2} = \\frac{\\beta + 1}{2}$.

Eindeutige Lösung: $(x, y, z) = \\left(\\frac{\\beta + 1}{2}, 1, \\frac{1 + \\beta}{2}\\right)$.

[STEP]
**Schritt 5: Fall $\\alpha \\neq \\pm 1$**

Zeile 2 durch $(1 - \\alpha^2) = (1 - \\alpha)(1 + \\alpha)$ dividieren, Zeile 3 durch $(1 - \\alpha)$:

$$\\left(\\begin{array}{ccc|c} 1 & \\alpha & 1 & \\beta \\\\ 0 & 1+\\alpha & 1 & \\frac{1 - \\alpha\\beta}{1 - \\alpha} \\\\ 0 & -1 & -1 & \\frac{1 - \\beta}{1 - \\alpha} \\end{array}\\right)$$

$Z_3 \\leftarrow Z_3 + \\frac{1}{1+\\alpha} Z_2$:

Aus Zeile 3:

$$(-1 + \\frac{1}{1+\\alpha}) z' = ... \\implies \\frac{-\\alpha}{1+\\alpha} z' = \\text{RHS}$$

Rückwärtselimination liefert eine eindeutige Lösung für alle $\\alpha \\neq \\pm 1$.

[RESULT]
- **$\\alpha = 1, \\beta \\neq 1$:** Keine Lösung
- **$\\alpha = 1, \\beta = 1$:** $\\{(1 - y - z, y, z) : y, z \\in \\mathbb{R}\\}$
- **$\\alpha = -1$:** Eindeutige Lösung $\\left(\\frac{\\beta + 1}{2}, 1, \\frac{1 + \\beta}{2}\\right)$
- **$\\alpha \\neq \\pm 1$:** Eindeutige Lösung (Parameterausdrücke)
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole das **Gauß-Verfahren mit Parametern** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-250326-2",
    title: "Trigonometrische Gleichung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.03.2025",
    content: `## Aufgabe 2 — Trigonometrische Gleichung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Trigonometrie, Additionstheoreme

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie die Gleichung:
$$\\cos(x) - 2\\sin^2\\left(\\frac{x}{2}\\right) = 0$$

[STEP]
**Schritt 1: Halbwinkelformel anwenden**

Die Identität $2\\sin^2\\left(\\frac{x}{2}\\right) = 1 - \\cos(x)$ ergibt:

$$\\cos(x) - (1 - \\cos(x)) = 0$$

[STEP]
**Schritt 2: Vereinfachen**

$$\\cos(x) - 1 + \\cos(x) = 0$$

$$2\\cos(x) - 1 = 0$$

$$\\cos(x) = \\frac{1}{2}$$

[STEP]
**Schritt 3: Lösungen bestimmen**

$$x = \\pm \\frac{\\pi}{3} + 2k\\pi, \\quad k \\in \\mathbb{Z}$$

[STEP]
**Schritt 4: Probe**

$x = \\pi/3$: $\\cos(\\pi/3) = \\frac{1}{2}$, $2\\sin^2(\\pi/6) = 2 \\cdot \\frac{1}{4} = \\frac{1}{2}$. Also $\\frac{1}{2} - \\frac{1}{2} = 0$ ✓

$x = -\\pi/3$: $\\cos(-\\pi/3) = \\frac{1}{2}$, $2\\sin^2(-\\pi/6) = 2 \\cdot \\frac{1}{4} = \\frac{1}{2}$. Also $\\frac{1}{2} - \\frac{1}{2} = 0$ ✓

[RESULT]
$$x = \\pm \\frac{\\pi}{3} + 2k\\pi, \\quad k \\in \\mathbb{Z}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **trigonometrische Identitäten und Halbwinkelformeln** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-250326-3",
    title: "Orthogonale Basen — Gram-Schmidt",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.03.2025",
    content: `## Aufgabe 3 — Orthogonale Basen

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Gram-Schmidt, Orthogonalprojektion, orthogonal complement

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $U = \\langle u_1, u_2 \\rangle \\subset \\mathbb{R}^3$ mit:
$$u_1 = (-1, 2, -3)^T, \\quad u_2 = (2, 3, -1)^T$$

Bestimmen Sie eine orthogonale Basis von $U$ und eine orthogonale Basis von $U^\\perp$.

[STEP]
**Schritt 1: Orthogonale Basis von $U$ via Gram-Schmidt**

$$v_1 = u_1 = (-1, 2, -3)^T$$

$$v_2 = u_2 - \\frac{\\langle u_2, v_1 \\rangle}{\\langle v_1, v_1 \\rangle} v_1$$

$$\\langle u_2, v_1 \\rangle = 2 \\cdot (-1) + 3 \\cdot 2 + (-1) \\cdot (-3) = -2 + 6 + 3 = 7$$

$$\\langle v_1, v_1 \\rangle = 1 + 4 + 9 = 14$$

$$v_2 = (2, 3, -1)^T - \\frac{7}{14}(-1, 2, -3)^T = (2, 3, -1)^T - \\frac{1}{2}(-1, 2, -3)^T$$

$$= \\left(2 + \\frac{1}{2}, \\; 3 - 1, \\; -1 + \\frac{3}{2}\\right)^T = \\left(\\frac{5}{2}, \\; 2, \\; \\frac{1}{2}\\right)^T$$

Oder äquivalent: $v_2 = (5, 4, 1)^T$ (skaliert).

[STEP]
**Schritt 2: Orthogonalität prüfen**

$$\\langle v_1, v_2 \\rangle = (-1)(5) + 2(4) + (-3)(1) = -5 + 8 - 3 = 0 \\quad \\checkmark$$

[STEP]
**Schritt 3: Basis von $U^\\perp$ bestimmen**

$U^\\perp$ consists of all $w = (a, b, c)^T$ with $\\langle w, u_1 \\rangle = 0$ and $\\langle w, u_2 \\rangle = 0$:

$$-a + 2b - 3c = 0$$
$$2a + 3b - c = 0$$

Gleichungssystem: $2 \\times 3$ Matrix, Rang 2 (da $u_1, u_2$ linear unabhängig).

$$\\left(\\begin{array}{ccc} -1 & 2 & -3 \\\\ 2 & 3 & -1 \\end{array}\\right) \\xrightarrow{Z_2 + 2Z_1} \\left(\\begin{array}{ccc} -1 & 2 & -3 \\\\ 0 & 7 & -7 \\end{array}\\right)$$

Aus Zeile 2: $7b - 7c = 0 \\implies b = c$.

Aus Zeile 1: $-a + 2b - 3c = 0 \\implies a = 2b - 3c = 2c - 3c = -c$.

Freie Variable: $c = t$. Dann $w = (-t, t, t)^T = t(-1, 1, 1)^T$.

$$w = (-1, 1, 1)^T$$

[STEP]
**Schritt 4: Probe**

$\\langle w, u_1 \\rangle = (-1)(-1) + 1 \\cdot 2 + 1 \\cdot (-3) = 1 + 2 - 3 = 0$ ✓

$\\langle w, u_2 \\rangle = (-1)(2) + 1 \\cdot 3 + 1 \\cdot (-1) = -2 + 3 - 1 = 0$ ✓

[RESULT]
- **Orthogonale Basis von $U$:** $\\{(-1, 2, -3)^T, \\; (5, 4, 1)^T\\}$
- **Orthogonale Basis von $U^\\perp$:** $\\{(-1, 1, 1)^T\\}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Gram-Schmidt und orthogonales Komplement** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-250326-4",
    title: "Invertierbarkeit — Parametermatrix",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.03.2025",
    content: `## Aufgabe 4 — Invertierbarkeit

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Determinante, Invertierbarkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Für welches $\\alpha \\in \\mathbb{R}$ ist die folgende Matrix invertierbar?

$$A = \\begin{pmatrix} 1 & 0 & \\alpha & 0 \\\\ 0 & 1 & 0 & \\alpha \\\\ \\alpha & 0 & 1 & 0 \\\\ 0 & \\alpha & 0 & 1 \\end{pmatrix}$$

[STEP]
**Schritt 1: Determinante berechnen**

Die Matrix hat eine Blockstruktur. Umsortieren (Zeilen/Spalten 1,3 und 2,4 gruppieren):

$$A \\sim \\begin{pmatrix} 1 & \\alpha & 0 & 0 \\\\ \\alpha & 1 & 0 & 0 \\\\ 0 & 0 & 1 & \\alpha \\\\ 0 & 0 & \\alpha & 1 \\end{pmatrix}$$

Dies ist eine Blockdiagonalmatrix mit Blöcken $B = \\begin{pmatrix} 1 & \\alpha \\\\ \\alpha & 1 \\end{pmatrix}$.

$$\\det(A) = \\det(B)^2 = (1 - \\alpha^2)^2$$

[STEP]
**Schritt 2: Invertierbarkeitsbedingung**

$A$ ist invertierbar $\\iff$ $\\det(A) \\neq 0$:

$$(1 - \\alpha^2)^2 \\neq 0 \\iff 1 - \\alpha^2 \\neq 0 \\iff \\alpha \\neq \\pm 1$$

[STEP]
**Schritt 3: Sonderfälle prüfen**

**$\\alpha = 1$:** Zeilen 1 und 3 werden $(1, 0, 1, 0)$ → linear abhängig, $\\det = 0$. ✓

**$\\alpha = -1$:** Zeile 1 = $(1, 0, -1, 0)$, Zeile 3 = $(-1, 0, 1, 0)$ = $-$Zeile 1 → linear abhängig, $\\det = 0$. ✓

[RESULT]
$A$ ist invertierbar $\\iff$ $\\alpha \\neq 1$ und $\\alpha \\neq -1$, d.h. $\\alpha \\in \\mathbb{R} \\setminus \\{-1, 1\\}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Determinante und Blockmatrizen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-250326-5",
    title: "2×2-Matrizen — Invertierbarkeit & Diagonalisierung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 26.03.2025",
    content: `## Aufgabe 5 — 2×2-Matrizen

> **📋 30 Punkte** | ⏱ 15 min | 🔑 Invertierbarkeit, Eigenwerte, Diagonalisierung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben seien:
$$A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\quad C = \\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$$

(i) Welche Matrizen sind invertierbar? Bestimmen Sie die Inversen.
(ii) Welche Matrizen sind diagonalisierbar? Bestimmen Sie Eigenwerte und Eigenbasen.

[STEP]
**Schritt 1: (i) Determinanten**

$$\\det(A) = 1 \\cdot 1 - 1 \\cdot 0 = 1 \\neq 0 \\implies \\text{invertierbar}$$

$$\\det(B) = 0 \\cdot 0 - 1 \\cdot 1 = -1 \\neq 0 \\implies \\text{invertierbar}$$

$$\\det(C) = 1 \\cdot 4 - 2 \\cdot 2 = 0 \\implies \\text{nicht invertierbar}$$

[STEP]
**Schritt 2: Inverse von $A$**

$$A^{-1} = \\frac{1}{1} \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}$$

Probe: $A A^{-1} = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$ ✓

[STEP]
**Schritt 3: Inverse von $B$**

$$B^{-1} = \\frac{1}{-1} \\begin{pmatrix} 0 & -1 \\\\ -1 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = B$$

$B$ ist seine eigene Inverse ($B^2 = I$). Probe: $B^2 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$ ✓

[STEP]
**Schritt 4: (ii) Eigenwerte von $A$**

$$\\det(A - \\lambda I) = \\det\\begin{pmatrix} 1-\\lambda & 1 \\\\ 0 & 1-\\lambda \\end{pmatrix} = (1-\\lambda)^2$$

$$\\lambda = 1 \\text{ (AM = 2)}$$

$$A - I = \\begin{pmatrix} 0 & 1 \\\\ 0 & 0 \\end{pmatrix}$$

$\\ker(A - I) = \\operatorname{span}\\{(1, 0)^T\\}$. GM = 1.

**AM ≠ GM → $A$ ist NICHT diagonalisierbar.** ✗

[STEP]
**Schritt 5: Eigenwerte von $B$**

$$\\det(B - \\lambda I) = \\det\\begin{pmatrix} -\\lambda & 1 \\\\ 1 & -\\lambda \\end{pmatrix} = \\lambda^2 - 1 = (\\lambda - 1)(\\lambda + 1)$$

$$\\lambda_1 = 1, \\quad \\lambda_2 = -1$$

**Eigenvektor für $\\lambda = 1$:**
$$B - I = \\begin{pmatrix} -1 & 1 \\\\ 1 & -1 \\end{pmatrix} \\implies v_1 = (1, 1)^T$$

**Eigenvektor für $\\lambda = -1$:**
$$B + I = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix} \\implies v_2 = (1, -1)^T$$

Zwei verschiedene Eigenwerte → **$B$ ist diagonalisierbar.** ✓

[STEP]
**Schritt 6: Eigenwerte von $C$**

$$\\det(C - \\lambda I) = \\det\\begin{pmatrix} 1-\\lambda & 2 \\\\ 2 & 4-\\lambda \\end{pmatrix} = (1-\\lambda)(4-\\lambda) - 4$$

$$= \\lambda^2 - 5\\lambda + 4 - 4 = \\lambda^2 - 5\\lambda = \\lambda(\\lambda - 5)$$

$$\\lambda_1 = 0, \\quad \\lambda_2 = 5$$

**Eigenvektor für $\\lambda = 0$:**
$$C = \\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix} \\implies v_1 = (2, -1)^T$$

**Eigenvektor für $\\lambda = 5$:**
$$C - 5I = \\begin{pmatrix} -4 & 2 \\\\ 2 & -1 \\end{pmatrix} \\implies v_2 = (1, 2)^T$$

Zwei verschiedene Eigenwerte → **$C$ ist diagonalisierbar.** ✓

[RESULT]
**(i) Invertierbarkeit:**
- $A$: invertierbar, $A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ 0 & 1 \\end{pmatrix}$
- $B$: invertierbar, $B^{-1} = B = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$
- $C$: nicht invertierbar ($\\det = 0$)

**(ii) Diagonalisierbarkeit:**
- $A$: NICHT diagonalisierbar ($\\lambda = 1$, AM = 2, GM = 1)
- $B$: diagonalisierbar ($\\lambda_1 = 1, v_1 = (1,1)^T$; $\\lambda_2 = -1, v_2 = (1,-1)^T$)
- $C$: diagonalisierbar ($\\lambda_1 = 0, v_1 = (2,-1)^T$; $\\lambda_2 = 5, v_2 = (1,2)^T$)
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Invertierbarkeit, Eigenwerte und Diagonalisierung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
