import { Lesson } from "../types";

export const mathe3Altklausur180718: Lesson[] = [
  {
    id: "ma3-klausur-180718-1",
    title: "Lösungsraum einer Matrix",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 18.07.2018",
    content: `## Aufgabe 1 — Lösungsraum einer Matrix

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Gauß-Verfahren, Basis, Lösungsraum

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die Matrix $A \\in \\mathbb{R}^{4 \\times 5}$:

$$A = \\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{pmatrix}$$

und $b = \\begin{pmatrix} 1 \\\\ 2 \\\\ 0 \\\\ 0 \\end{pmatrix}$.

Bestimmen Sie eine Basis des Lösungsraums von $Ax = b$ und geben Sie die allgemeine Lösung an.

[STEP]
**Schritt 1: Rang und freie Variablen bestimmen**

Die Matrix $A$ ist bereits in Zeilenstufenform. Die Pivot-Spalten sind die 1. und 3. Spalte. Die freien Variablen sind $x_2, x_4, x_5$.

Rang$(A) = 2$, es gibt $5 - 2 = 3$ freie Variablen.

[STEP]
**Schritt 2: Gleichungssystem ablesen**

Aus der Zeilenstufenform:
$$x_1 + 2x_2 + x_4 + 3x_5 = 1$$
$$x_3 + 2x_4 + x_5 = 2$$

Nach den Pivot-Variablen auflösen:
$$x_1 = 1 - 2x_2 - x_4 - 3x_5$$
$$x_3 = 2 - 2x_4 - x_5$$

[STEP]
**Schritt 3: Allgemeine Lösung aufstellen**

Mit freien Variablen $x_2 = s$, $x_4 = t$, $x_5 = u$:

$$x = \\begin{pmatrix} 1 - 2s - t - 3u \\\\ s \\\\ 2 - 2t - u \\\\ t \\\\ u \\end{pmatrix}$$

[STEP]
**Schritt 4: In homogenen und partikulären Anteil zerlegen**

$$x = \\underbrace{\\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\\\ 0 \\\\ 0 \\end{pmatrix}}_{x_p} + s \\underbrace{\\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}}_{v_1} + t \\underbrace{\\begin{pmatrix} -1 \\\\ 0 \\\\ -2 \\\\ 1 \\\\ 0 \\end{pmatrix}}_{v_2} + u \\underbrace{\\begin{pmatrix} -3 \\\\ 0 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix}}_{v_3}$$

[STEP]
**Schritt 5: Basis des Lösungsraums**

Die Basis des homogenen Lösungsraums $\\ker(A)$ besteht aus:
$$\\left\\{ \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -1 \\\\ 0 \\\\ -2 \\\\ 1 \✆ 0 \\end{pmatrix}, \\begin{pmatrix} -3 \\\\ 0 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right\\}$$

Die allgemeine Lösung von $Ax = b$ ist die affine Menge:
$$L = x_p + \\ker(A)$$

[RESULT]
$$x = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\\\ 0 \\\\ 0 \\end{pmatrix} + s\\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix} + t\\begin{pmatrix} -1 \\\\ 0 \\\\ -2 \\\\ 1 \\\\ 0 \\end{pmatrix} + u\\begin{pmatrix} -3 \\\\ 0 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix}, \\quad s,t,u \\in \\mathbb{R}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Bestimmung von Lösungsräumen mit dem Gauß-Verfahren** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-180718-2",
    title: "Trigonometrische Identität beweisen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 18.07.2018",
    content: `## Aufgabe 2 — Trigonometrische Identität beweisen

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Additionstheoreme, trigonometrische Identitäten

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Beweisen Sie mit Hilfe der Additionstheoreme:
$$\\tan\\left(\\frac{x}{2}\\right) = \\frac{1 - \\cos(x)}{\\sin(x)}$$

[STEP]
**Schritt 1: Additionstheoreme aufschreiben**

Die relevanten Additionstheoreme sind:
$$\\cos(x) = \\cos^2\\left(\\frac{x}{2}\\right) - \\sin^2\\left(\\frac{x}{2}\\right)$$
$$\\sin(x) = 2\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right)$$

[STEP]
**Schritt 2: Zähler umformen**

$$1 - \\cos(x) = 1 - \\left(\\cos^2\\left(\\frac{x}{2}\\right) - \\sin^2\\left(\\frac{x}{2}\\right)\\right)$$

Mit $1 = \\cos^2\\left(\\frac{x}{2}\\right) + \\sin^2\\left(\\frac{x}{2}\\right)$:

$$= \\cos^2\\left(\\frac{x}{2}\\right) + \\sin^2\\left(\\frac{x}{2}\\right) - \\cos^2\\left(\\frac{x}{2}\\right) + \\sin^2\\left(\\frac{x}{2}\\right) = 2\\sin^2\\left(\\frac{x}{2}\\right)$$

[STEP]
**Schritt 3: Bruch zusammenfassen**

$$\\frac{1 - \\cos(x)}{\\sin(x)} = \\frac{2\\sin^2\\left(\\frac{x}{2}\\right)}{2\\sin\\left(\\frac{x}{2}\\right)\\cos\\left(\\frac{x}{2}\\right)}$$

[STEP]
**Schritt 4: Kürzen**

$$= \\frac{\\sin\\left(\\frac{x}{2}\\right)}{\\cos\\left(\\frac{x}{2}\\right)} = \\tan\\left(\\frac{x}{2}\\right)$$

[RESULT]
$$\\tan\\left(\\frac{x}{2}\\right) = \\frac{1 - \\cos(x)}{\\sin(x)} \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Additionstheoreme für Sinus und Kosinus** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-180718-3",
    title: "Gram-Schmidt-Orthonormalisierung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 18.07.2018",
    content: `## Aufgabe 3 — Gram-Schmidt-Orthonormalisierung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Gram-Schmidt, Orthonormalbasis

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben seien die Vektoren in $\\mathbb{R}^3$:
$$w_1 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\quad w_2 = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix}, \\quad w_3 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix}$$

Bestimmen Sie eine Orthonormalbasis von $\\mathbb{R}^3$ mit der Gram-Schmidt-Orthonormalisierung, wobei $e_1$ ein Vielfaches von $w_1$ ist.

[STEP]
**Schritt 1: Ersten Basisvektor $e_1$ normieren**

$$\\|w_1\\| = \\sqrt{1^2 + 2^2 + 3^2} = \\sqrt{14}$$

$$e_1 = \\frac{w_1}{\\|w_1\\|} = \\frac{1}{\\sqrt{14}}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$$

[STEP]
**Schritt 2: Zweiten Vektor orthogonalisieren**

$$w_2' = w_2 - \\langle w_2, e_1 \\rangle \\cdot e_1$$

$$\\langle w_2, e_1 \\rangle = \\frac{1}{\\sqrt{14}}(1 \\cdot 1 + 0 \\cdot 2 + 1 \\cdot 3) = \\frac{4}{\\sqrt{14}}$$

$$w_2' = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} - \\frac{4}{\\sqrt{14}} \\cdot \\frac{1}{\\sqrt{14}}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 1 \\end{pmatrix} - \\frac{4}{14}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$$

$$= \\begin{pmatrix} 1 - \\frac{2}{7} \\\\ 0 - \\frac{4}{7} \\\\ 1 - \\frac{6}{7} \\end{pmatrix} = \\begin{pmatrix} \\frac{5}{7} \\\\ -\\frac{4}{7} \\\\ \\frac{1}{7} \\end{pmatrix}$$

$$\\|w_2'\\| = \\frac{1}{7}\\sqrt{25 + 16 + 1} = \\frac{\\sqrt{42}}{7}$$

$$e_2 = \\frac{w_2'}{\\|w_2'\\|} = \\frac{7}{\\sqrt{42}} \\cdot \\frac{1}{7}\\begin{pmatrix} 5 \\\\ -4 \\\\ 1 \\end{pmatrix} = \\frac{1}{\\sqrt{42}}\\begin{pmatrix} 5 \\\\ -4 \\\\ 1 \\end{pmatrix}$$

[STEP]
**Schritt 3: Dritten Vektor orthogonalisieren**

$$w_3' = w_3 - \\langle w_3, e_1 \\rangle \\cdot e_1 - \\langle w_3, e_2 \\rangle \\cdot e_2$$

$$\\langle w_3, e_1 \\rangle = \\frac{1}{\\sqrt{14}}(0 + 2 + 0) = \\frac{2}{\\sqrt{14}}$$

$$\\langle w_3, e_2 \\rangle = \\frac{1}{\\sqrt{42}}(0 - 4 + 0) = \\frac{-4}{\\sqrt{42}}$$

$$w_3' = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix} - \\frac{2}{\\sqrt{14}} \\cdot \\frac{1}{\\sqrt{14}}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} - \\frac{-4}{\\sqrt{42}} \\cdot \\frac{1}{\\sqrt{42}}\\begin{pmatrix} 5 \\\\ -4 \\\\ 1 \\end{pmatrix}$$

$$= \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix} - \\frac{1}{7}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + \\frac{4}{42}\\begin{pmatrix} 5 \\\\ -4 \\\\ 1 \\end{pmatrix}$$

$$= \\begin{pmatrix} -\\frac{1}{7} + \\frac{20}{42} \\\\ 1 - \\frac{2}{7} - \\frac{16}{42} \\\\ -\\frac{3}{7} + \\frac{4}{42} \\end{pmatrix} = \\begin{pmatrix} \\frac{-6 + 20}{42} \\\\ \\frac{42 - 12 - 16}{42} \\\\ \\frac{-18 + 4}{42} \\end{pmatrix} = \\begin{pmatrix} \\frac{14}{42} \\\\ \\frac{14}{42} \\\\ -\\frac{14}{42} \\end{pmatrix} = \\frac{1}{3}\\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix}$$

$$\\|w_3'\\| = \\frac{1}{3}\\sqrt{1 + 1 + 1} = \\frac{\\sqrt{3}}{3} = \\frac{1}{\\sqrt{3}}$$

$$e_3 = \\frac{w_3'}{\\|w_3'\\|} = \\sqrt{3} \\cdot \\frac{1}{3}\\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix} = \\frac{1}{\\sqrt{3}}\\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix}$$

[RESULT]
$$e_1 = \\frac{1}{\\sqrt{14}}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\quad e_2 = \\frac{1}{\\sqrt{42}}\\begin{pmatrix} 5 \\\\ -4 \\\\ 1 \\end{pmatrix}, \\quad e_3 = \\frac{1}{\\sqrt{3}}\\begin{pmatrix} 1 \\\\ 1 \\\\ -1 \\end{pmatrix}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Gram-Schmidt-Orthonormalisierung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-180718-4",
    title: "Matrix als Produkt elementarer Matrizen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 18.07.2018",
    content: `## Aufgabe 4 — Matrix als Produkt elementarer Matrizen

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Elementare Matrizen, Zeilenumformungen

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Zerlegen Sie die folgende Matrix über $\\mathbb{C}$ als Produkt elementarer Matrizen:

$$A = \\begin{pmatrix} j & 2 \\\\ 1+j & 1-j \\end{pmatrix}$$

wobei $j$ die imaginäre Einheit ist ($j^2 = -1$).

[STEP]
**Schritt 1: Determinante berechnen**

$$\\det(A) = j(1-j) - 2(1+j) = j - j^2 - 2 - 2j = j + 1 - 2 - 2j = -1 - j$$

Da $\\det(A) \\neq 0$ existiert $A^{-1}$ und $A$ ist als Produkt elementarer Matrizen darstellbar.

[STEP]
**Schritt 2: Zeilenumformungen auf $A$ anwenden**

Wir bringen $A$ auf die Einheitsmatrix und protokollieren die Schritte:

**Schritt 2a:** $Z_2 \\leftarrow Z_2 - \\frac{1+j}{j} Z_1$

Da $\\frac{1+j}{j} = \\frac{(1+j) \\cdot (-j)}{j \\cdot (-j)} = \\frac{-j - j^2}{1} = 1 - j$:

$$Z_2 \\leftarrow Z_2 - (1-j) Z_1$$

$$\\begin{pmatrix} j & 2 \\\\ (1+j) - (1-j)j & (1-j) - (1-j)2 \\end{pmatrix}$$

Berechne: $(1-j)j = j - j^2 = j + 1 = 1+j$, also $(1+j) - (1+j) = 0$.

$(1-j) - 2(1-j) = -(1-j) = j - 1$

$$\\begin{pmatrix} j & 2 \\\\ 0 & j-1 \\end{pmatrix}$$

Dies entspricht der elementaren Matrix: $E_1 = \\begin{pmatrix} 1 & 0 \\\\ -(1-j) & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ j-1 & 1 \\end{pmatrix}$

**Schritt 2b:** $Z_1 \\leftarrow \\frac{1}{j} Z_1 = -j Z_1$

$$\\begin{pmatrix} 1 & -2j \\\\ 0 & j-1 \\end{pmatrix}$$

$E_2 = \\begin{pmatrix} -j & 0 \\\\ 0 & 1 \\end{pmatrix}$

**Schritt 2c:** $Z_2 \\leftarrow \\frac{1}{j-1} Z_2$

$\\frac{1}{j-1} = \\frac{j+1}{(j-1)(j+1)} = \\frac{j+1}{j^2-1} = \\frac{j+1}{-2} = -\\frac{1+j}{2}$

$$\\begin{pmatrix} 1 & -2j \\\\ 0 & 1 \\end{pmatrix}$$

$E_3 = \\begin{pmatrix} 1 & 0 \\\\ 0 & -\\frac{1+j}{2} \\end{pmatrix}$

**Schritt 2d:** $Z_1 \\leftarrow Z_1 + 2j \\cdot Z_2$

$$\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$$

$E_4 = \\begin{pmatrix} 1 & 2j \\\\ 0 & 1 \\end{pmatrix}$

[STEP]
**Schritt 3: Zerlegung aufschreiben**

Es gilt: $E_4 E_3 E_2 E_1 A = I$, also:

$$A = E_1^{-1} E_2^{-1} E_3^{-1} E_4^{-1}$$

Die Inversen der elementaren Matrizen:

$$E_1^{-1} = \\begin{pmatrix} 1 & 0 \\\\ 1-j & 1 \\end{pmatrix}, \\quad E_2^{-1} = \\begin{pmatrix} j & 0 \\\\ 0 & 1 \\end{pmatrix}$$

$$E_3^{-1} = \\begin{pmatrix} 1 & 0 \\\\ 0 & \\frac{-2}{1+j} \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & j-1 \\end{pmatrix}, \\quad E_4^{-1} = \\begin{pmatrix} 1 & -2j \\\\ 0 & 1 \\end{pmatrix}$$

[RESULT]
$$A = \\begin{pmatrix} 1 & 0 \\\\ 1-j & 1 \\end{pmatrix} \\begin{pmatrix} j & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} 1 & 0 \\\\ 0 & j-1 \\end{pmatrix} \\begin{pmatrix} 1 & -2j \\\\ 0 & 1 \\end{pmatrix}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Zerlegung in elementare Matrizen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-180718-5",
    title: "Determinante mit Parameter",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 18.07.2018",
    content: `## Aufgabe 5 — Determinante mit Parameter

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Determinante, Laplace-Entwicklung, Invertierbarkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die Matrix $A \\in \\mathbb{R}^{5 \\times 5}$:

$$A = \\begin{pmatrix} x & 1 & 0 & 0 & 0 \\\\ 1 & x & 1 & 0 & 0 \܀ 0 & 1 & x & 1 & 0 \\\\ 0 & 0 & 1 & x & 1 \\\\ 0 & 0 & 0 & 1 & x \\end{pmatrix}$$

Bestimmen Sie $\\det(A)$. Für welche $x$ ist $A$ invertierbar?

[STEP]
**Schritt 1: Entwicklung nach der ersten Zeile**

$$\\det(A) = x \\cdot \\det(M_{11}) - 1 \\cdot \\det(M_{12})$$

wobei:

$$M_{11} = \\begin{pmatrix} x & 1 & 0 & 0 \\\\ 1 & x & 1 & 0 \\\\ 0 & 1 & x & 1 \\\\ 0 & 0 & 1 & x \\end{pmatrix}, \\quad M_{12} = \\begin{pmatrix} 1 & 1 & 0 & 0 \\\\ 0 & x & 1 & 0 \܀ 0 & 1 & x & 1 \\\\ 0 & 0 & 1 & x \\end{pmatrix}$$

[STEP]
**Schritt 2: Determinante von $M_{11}$ berechnen**

$M_{11}$ hat die gleiche Tridiagonalstruktur. Entwicklung nach der ersten Zeile:

$$\\det(M_{11}) = x \\cdot \\det\\begin{pmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} - 1 \\cdot \\det\\begin{pmatrix} 1 & 1 & 0 \܀ 0 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix}$$

$$\\det\\begin{pmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} = x(x^2 - 1) - 1(x) = x^3 - 2x$$

$$\\det\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} = 1(x^2 - 1) = x^2 - 1$$

$$\\det(M_{11}) = x(x^3 - 2x) - (x^2 - 1) = x^4 - 3x^2 + 1$$

[STEP]
**Schritt 3: Determinante von $M_{12}$ berechnen**

$M_{12}$ ist fast tridiagonal, aber mit einer 1 oben links statt $x$. Entwicklung nach der ersten Spalte:

$$\\det(M_{12}) = 1 \\cdot \\det\\begin{pmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} = x^3 - 2x$$

[STEP]
**Schritt 4: Gesamtdeterminante**

$$\\det(A) = x(x^4 - 3x^2 + 1) - (x^3 - 2x) = x^5 - 3x^3 + x - x^3 + 2x$$

$$= x^5 - 4x^3 + 3x = x(x^4 - 4x^2 + 3) = x(x^2 - 1)(x^2 - 3)$$

$$= x(x-1)(x+1)(x-\\sqrt{3})(x+\\sqrt{3})$$

[RESULT]
$$\\det(A) = x(x-1)(x+1)(x-\\sqrt{3})(x+\\sqrt{3})$$

$A$ ist genau dann invertierbar, wenn $x \\notin \\{0, 1, -1, \\sqrt{3}, -\\sqrt{3}\\}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Laplace-Entwicklung bei tridiagonalen Matrizen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-180718-6",
    title: "Eigenwerte und Diagonalisierbarkeit",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 18.07.2018",
    content: `## Aufgabe 6 — Eigenwerte und Diagonalisierbarkeit

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Eigenwerte, algebraische/geometrische Vielfachheit, Diagonalisierbarkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die Matrix:

$$A = \\begin{pmatrix} 0 & -4 & -4 \\\\ 2 & 5 & 2 \\\\ -1 & -1 & 2 \\end{pmatrix}$$

Bestimmen Sie die Eigenwerte, die algebraischen und geometrischen Vielfachheiten und entscheiden Sie, ob $A$ diagonalisierbar ist.

[STEP]
**Schritt 1: Charakteristisches Polynom berechnen**

$$p_A(\\lambda) = \\det(A - \\lambda I) = \\det\\begin{pmatrix} -\\lambda & -4 & -4 \\\\ 2 & 5-\\lambda & 2 \\\\ -1 & -1 & 2-\\lambda \\end{pmatrix}$$

Laplace-Entwicklung nach der 1. Zeile:

$$= -\\lambda \\det\\begin{pmatrix} 5-\\lambda & 2 \\\\ -1 & 2-\\lambda \\end{pmatrix} + 4 \\det\\begin{pmatrix} 2 & 2 \\\\ -1 & 2-\\lambda \\end{pmatrix} - 4 \\det\\begin{pmatrix} 2 & 5-\\lambda \\\\ -1 & -1 \\end{pmatrix}$$

Erster Term: $(5-\\lambda)(2-\\lambda) + 2 = \\lambda^2 - 7\\lambda + 12$

Zweiter Term: $2(2-\\lambda) + 2 = 6 - 2\\lambda$

Dritter Term: $-2 + (5-\\lambda) = 3 - \\lambda$

$$p_A(\\lambda) = -\\lambda(\\lambda^2 - 7\\lambda + 12) + 4(6 - 2\\lambda) - 4(3 - \\lambda)$$

$$= -\\lambda^3 + 7\\lambda^2 - 12\\lambda + 24 - 8\\lambda - 12 + 4\\lambda$$

$$= -\\lambda^3 + 7\\lambda^2 - 16\\lambda + 12$$

[STEP]
**Schritt 2: Nullstellen bestimmen**

Wir testen $\\lambda = 2$: $-8 + 28 - 32 + 12 = 0$. Also ist $\\lambda_1 = 2$ eine Nullstelle.

Polynomdivision: $-\\lambda^3 + 7\\lambda^2 - 16\\lambda + 12 = -(\\lambda - 2)(\\lambda^2 - 5\\lambda + 6) = -(\\lambda - 2)(\\lambda - 2)(\\lambda - 3)$

$$p_A(\\lambda) = -(\\lambda - 2)^2(\\lambda - 3)$$

Die Eigenwerte sind $\\lambda_1 = 2$ (algebraische Vielfachheit 2) und $\\lambda_2 = 3$ (algebraische Vielfachheit 1).

[STEP]
**Schritt 3: Geometrische Vielfachheit von $\\lambda_1 = 2$**

$$A - 2I = \\begin{pmatrix} -2 & -4 & -4 \\\\ 2 & 3 & 2 \\\\ -1 & -1 & 0 \\end{pmatrix}$$

Gauß-Verfahren:

$Z_2 \\leftarrow Z_2 + Z_1$: $\\begin{pmatrix} -2 & -4 & -4 \\\\ 0 & -1 & -2 \\\\ -1 & -1 & 0 \\end{pmatrix}$

$Z_3 \\leftarrow Z_3 - \\frac{1}{2}Z_1$: $\\begin{pmatrix} -2 & -4 & -4 \\\\ 0 & -1 & -2 \܀ 0 & 1 & 2 \\end{pmatrix}$

$Z_3 \\leftarrow Z_3 + Z_2$: $\\begin{pmatrix} -2 & -4 & -4 \\\\ 0 & -1 & -2 \\\\ 0 & 0 & 0 \\end{pmatrix}$

Rang$(A - 2I) = 2$, also $\\dim(\\ker(A - 2I)) = 3 - 2 = 1$.

Geometrische Vielfachheit von $\\lambda_1 = 2$ ist **1**.

[STEP]
**Schritt 4: Geometrische Vielfachheit von $\\lambda_2 = 3$**

$$A - 3I = \\begin{pmatrix} -3 & -4 & -4 \\\\ 2 & 2 & 2 \\\\ -1 & -1 & -1 \\end{pmatrix}$$

$Z_2 \\leftarrow Z_2 + \\frac{2}{3}Z_1$: $\\begin{pmatrix} -3 & -4 & -4 \\\\ 0 & -\\frac{2}{3} & -\\frac{2}{3} \\\\ -1 & -1 & -1 \\end{pmatrix}$

$Z_3 \\leftarrow Z_3 - \\frac{1}{3}Z_1$: $\\begin{pmatrix} -3 & -4 & -4 \\\\ 0 & -\\frac{2}{3} & -\\frac{2}{3} \\\\ 0 & \\frac{1}{3} & \\frac{1}{3} \\end{pmatrix}$

$Z_3 \\leftarrow Z_3 + \\frac{1}{2}Z_2$: $\\begin{pmatrix} -3 & -4 & -4 \\\\ 0 & -\\frac{2}{3} & -\\frac{2}{3} \\\\ 0 & 0 & 0 \\end{pmatrix}$

Rang$(A - 3I) = 2$, also $\\dim(\\ker(A - 3I)) = 1$.

Geometrische Vielfachheit von $\\lambda_2 = 3$ ist **1**.

[RESULT]
$$\\lambda_1 = 2: \\text{ alg.VF} = 2, \\text{ geo.VF} = 1$$
$$\\lambda_2 = 3: \\text{ alg.VF} = 1, \\text{ geo.VF} = 1$$

$A$ ist **nicht diagonalisierbar**, da für $\\lambda_1 = 2$ die geometrische Vielfachheit (1) kleiner ist als die algebraische Vielfachheit (2).
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Eigenwertberechnung und Diagonalisierbarkeit** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
