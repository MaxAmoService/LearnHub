import { Lesson } from "../types";

export const mathe3Altklausur190205: Lesson[] = [
  {
    id: "ma3-klausur-190205-1",
    title: "Trigonometrische Gleichung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 1 — Trigonometrische Gleichung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Additionstheoreme, trigonometrische Gleichungen

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie alle $\\alpha \\in [0, 2\\pi]$ mit $\\sin(\\alpha) = \\cos(2\\alpha)$.

Skizzieren Sie beide Funktionen im Intervall $[0, 2\\pi]$.

[STEP]
**Schritt 1: Gleichung umformen**

Mit dem Additionstheorem $\\cos(2\\alpha) = 1 - 2\\sin^2(\\alpha)$:

$$\\sin(\\alpha) = 1 - 2\\sin^2(\\alpha)$$

$$2\\sin^2(\\alpha) + \\sin(\\alpha) - 1 = 0$$

[STEP]
**Schritt 2: Substitution $t = \\sin(\\alpha)$**

$$2t^2 + t - 1 = 0$$

Mitternachtsformel:
$$t = \\frac{-1 \\pm \\sqrt{1 + 8}}{4} = \\frac{-1 \\pm 3}{4}$$

$$t_1 = \\frac{1}{2}, \\quad t_2 = -1$$

[STEP]
**Schritt 3: Rücksubstitution**

**Fall 1:** $\\sin(\\alpha) = \\frac{1}{2}$

$$\\alpha_1 = \\frac{\\pi}{6}, \\quad \\alpha_2 = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$$

**Fall 2:** $\\sin(\\alpha) = -1$

$$\\alpha_3 = \\frac{3\\pi}{2}$$

[STEP]
**Schritt 4: Skizze**

$\\sin(\\alpha)$: Standard-Sinus-Kurve von $0$ bis $2\\pi$.

$\\cos(2\\alpha)$: Kosinus mit doppelter Frequenz, schwingt zweimal im Intervall $[0, 2\\pi]$.

Schnittpunkte bei $\\alpha = \\frac{\\pi}{6}, \\frac{5\\pi}{6}, \\frac{3\\pi}{2}$.

[RESULT]
$$\\alpha \\in \\left\\{\\frac{\\pi}{6},\\; \\frac{5\\pi}{6},\\; \\frac{3\\pi}{2}\\right\\}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Lösung trigonometrischer Gleichungen mit Additionstheoremen** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-2",
    title: "Determinante der Inversen",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 2 — Determinante der Inversen

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Determinante, Inverse Matrix

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 1 & 0 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix}$$

Bestimmen Sie $\\det(A^{-1})$.

[STEP]
**Schritt 1: Determinante von $A$ berechnen**

Entwicklung nach der ersten Zeile:

$$\\det(A) = 1 \\cdot \\det\\begin{pmatrix} 0 & 1 \\\\ 1 & 1 \\end{pmatrix} - 0 + 0$$

$$= 1 \\cdot (0 \\cdot 1 - 1 \\cdot 1) = -1$$

[STEP]
**Schritt 2: Determinante der Inversen**

Es gilt die Formel:
$$\\det(A^{-1}) = \\frac{1}{\\det(A)}$$

[RESULT]
$$\\det(A^{-1}) = \\frac{1}{-1} = -1$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Eigenschaft $\\det(A^{-1}) = 1/\\det(A)$** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-3",
    title: "Charakteristisches Polynom der Begleitmatrix",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 3 — Charakteristisches Polynom der Begleitmatrix

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Begleitmatrix, charakteristisches Polynom

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die Begleitmatrix (Companion-Matrix):

$$C = \\begin{pmatrix} 0 & 0 & -a \\\\ 1 & 0 & -b \\\\ 0 & 1 & -c \\end{pmatrix}$$

Zeigen Sie, dass das charakteristische Polynom $p_C(\\lambda) = -\\lambda^3 - c\\lambda^2 - b\\lambda - a$ ist.

[STEP]
**Schritt 1: Charakteristisches Polynom aufstellen**

$$p_C(\\lambda) = \\det(C - \\lambda I) = \\det\\begin{pmatrix} -\\lambda & 0 & -a \\\\ 1 & -\\lambda & -b \\\\ 0 & 1 & -c-\\lambda \\end{pmatrix}$$

[STEP]
**Schritt 2: Laplace-Entwicklung nach der ersten Zeile**

$$= -\\lambda \\cdot \\det\\begin{pmatrix} -\\lambda & -b \\\\ 1 & -c-\\lambda \\end{pmatrix} - 0 - a \\cdot \\det\\begin{pmatrix} 1 & -\\lambda \\\\ 0 & 1 \\end{pmatrix}$$

[STEP]
**Schritt 3: $2 \\times 2$-Determinanten berechnen**

$$\\det\\begin{pmatrix} -\\lambda & -b \\\\ 1 & -c-\\lambda \\end{pmatrix} = (-\\lambda)(-c-\\lambda) - (-b)(1) = \\lambda(c+\\lambda) + b = \\lambda^2 + c\\lambda + b$$

$$\\det\\begin{pmatrix} 1 & -\\lambda \\\\ 0 & 1 \\end{pmatrix} = 1$$

[STEP]
**Schritt 4: Zusammenfassen**

$$p_C(\\lambda) = -\\lambda(\\lambda^2 + c\\lambda + b) - a(1)$$

$$= -\\lambda^3 - c\\lambda^2 - b\\lambda - a$$

[RESULT]
$$p_C(\\lambda) = -\\lambda^3 - c\\lambda^2 - b\\lambda - a$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Begleitmatrix und ihr charakteristisches Polynom** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-4",
    title: "Kern und Bild einer linearen Abbildung",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 4 — Kern und Bild einer linearen Abbildung

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Kern, Bild, Gauß-Verfahren, Dimensionssatz

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei der lineare Abbildung $f: \\mathbb{R}^5 \\to \\mathbb{R}^4$ mit der Darstellungsmatrix:

$$A = \\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 2 & 4 & 1 & 3 & 7 \\\\ 1 & 2 & 1 & 3 & 4 \\end{pmatrix}$$

Bestimmen Sie $\\ker(f)$ und $\\text{im}(f)$.

[STEP]
**Schritt 1: Gauß-Verfahren auf $A$**

$$\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 2 & 4 & 1 & 3 & 7 \\\\ 1 & 2 & 1 & 3 & 4 \\end{pmatrix}$$

$Z_3 \\leftarrow Z_3 - 2Z_1$:
$$\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 1 & 1 & 1 \\\\ 1 & 2 & 1 & 3 & 4 \\end{pmatrix}$$

$Z_4 \\leftarrow Z_4 - Z_1$:
$$\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 1 & 1 & 1 \܀ 0 & 0 & 1 & 2 & 1 \\end{pmatrix}$$

$Z_3 \\leftarrow Z_3 - Z_2$:
$$\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 0 & -1 & 0 \\\\ 0 & 0 & 1 & 2 & 1 \\end{pmatrix}$$

$Z_4 \\leftarrow Z_4 - Z_2$:
$$\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 0 & -1 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{pmatrix}$$

$Z_3 \\leftarrow -Z_3$:
$$\\begin{pmatrix} 1 & 2 & 0 & 1 & 3 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{pmatrix}$$

Rang$(A) = 3$.

[STEP]
**Schritt 2: Kern bestimmen**

Die freien Variablen sind $x_2$ und $x_5$. Aus der Zeilenstufenform:

$$x_4 = 0$$
$$x_3 + 2x_4 + x_5 = 0 \\Rightarrow x_3 = -x_5$$
$$x_1 + 2x_2 + x_4 + 3x_5 = 0 \\Rightarrow x_1 = -2x_2 - 3x_5$$

Mit $x_2 = s$, $x_5 = t$:

$$\\ker(f) = \\left\\{ s\\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix} + t\\begin{pmatrix} -3 \\\\ 0 \\\\ -1 \܀ 0 \\\\ 1 \\end{pmatrix} : s, t \\in \\mathbb{R} \\right\\}$$

Basis des Kerns: $\\left\\{ \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -3 \\\\ 0 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right\\}$

$\\dim(\\ker(f)) = 2$

[STEP]
**Schritt 3: Bild bestimmen**

Die Pivot-Spalten sind die 1., 3. und 4. Spalte. Diese bilden eine Basis des Bildes:

$$\\text{im}(f) = \\text{span}\\left\\{ \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\\\ 1 \\end{pmatrix}, \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 3 \\end{pmatrix} \\right\\}$$

$\\dim(\\text{im}(f)) = 3$

[RESULT]
$$\\ker(f) = \\text{span}\\left\\{ \\begin{pmatrix} -2 \\\\ 1 \\\\ 0 \\\\ 0 \\\\ 0 \\end{pmatrix}, \\begin{pmatrix} -3 \\\\ 0 \\\\ -1 \\\\ 0 \\\\ 1 \\end{pmatrix} \\right\\}, \\quad \\dim(\\ker(f)) = 2$$

$$\\text{im}(f) = \\text{span}\\left\\{ \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\\\ 1 \\end{pmatrix}, \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\\\ 1 \\end{pmatrix}, \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\\\ 3 \\end{pmatrix} \\right\\}, \\quad \\dim(\\text{im}(f)) = 3$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Bestimmung von Kern und Bild** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-5",
    title: "Gleichungssystem mit Matrix",
    duration: "10 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 5 — Gleichungssystem mit Matrix

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Matrixgleichung, Gauß-Verfahren

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei:
$$M = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 2 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

Bestimmen Sie alle $x \\in \\mathbb{R}^{1 \\times 3}$ mit $x \\cdot M = (42, 0, 0)$.

[STEP]
**Schritt 1: Gleichungssystem aufstellen**

Sei $x = (x_1, x_2, x_3)$. Dann:

$$x \\cdot M = (x_1,\\; x_1 \\cdot 2 + x_2,\\; x_1 \\cdot 3 + x_2 \\cdot 2 + x_3) = (42, 0, 0)$$

Das Gleichungssystem:
$$x_1 = 42$$
$$2x_1 + x_2 = 0$$
$$3x_1 + 2x_2 + x_3 = 0$$

[STEP]
**Schritt 2: Rückwärts einsetzen**

$$x_1 = 42$$
$$x_2 = -2x_1 = -84$$
$$x_3 = -3x_1 - 2x_2 = -126 + 168 = 42$$

[RESULT]
$$x = (42, -84, 42)$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Matrixgleichungen und Rückwärtseinsetzung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-6",
    title: "Orthonormalbasis von R³",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 6 — Orthonormalbasis von R³

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Gram-Schmidt, Orthonormalbasis

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben seien:
$$w_1 = \\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\quad w_2 = \\begin{pmatrix} 1 \܀ 0 \\\\ -1 \\end{pmatrix}, \\quad w_3 = \\begin{pmatrix} 0 \\\\ 1 \\\\ 1 \\end{pmatrix}$$

Bestimmen Sie eine Orthonormalbasis von $\\mathbb{R}^3$ mit der Gram-Schmidt-Orthonormalisierung, wobei $e_1$ ein Vielfaches von $w_1$ ist.

[STEP]
**Schritt 1: Ersten Basisvektor normieren**

$$\\|w_1\\| = \\sqrt{1 + 4 + 9} = \\sqrt{14}$$

$$e_1 = \\frac{1}{\\sqrt{14}}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}$$

[STEP]
**Schritt 2: Zweiten Vektor orthogonalisieren**

$$w_2' = w_2 - \\langle w_2, e_1 \\rangle \\cdot e_1$$

$$\\langle w_2, e_1 \\rangle = \\frac{1}{\\sqrt{14}}(1 + 0 - 3) = \\frac{-2}{\\sqrt{14}}$$

$$w_2' = \\begin{pmatrix} 1 \\\\ 0 \\\\ -1 \\end{pmatrix} + \\frac{2}{14}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 1 + \\frac{1}{7} \\\\ \\frac{2}{7} \\\\ -1 + \\frac{3}{7} \\end{pmatrix} = \\begin{pmatrix} \\frac{8}{7} \\\\ \\frac{2}{7} \\\\ -\\frac{4}{7} \\end{pmatrix}$$

$$\\|w_2'\\| = \\frac{1}{7}\\sqrt{64 + 4 + 16} = \\frac{\\sqrt{84}}{7} = \\frac{2\\sqrt{21}}{7}$$

$$e_2 = \\frac{7}{2\\sqrt{21}} \\cdot \\frac{1}{7}\\begin{pmatrix} 8 \\\\ 2 \\\\ -4 \\end{pmatrix} = \\frac{1}{2\\sqrt{21}}\\begin{pmatrix} 8 \\\\ 2 \\\\ -4 \\end{pmatrix} = \\frac{1}{\\sqrt{21}}\\begin{pmatrix} 4 \\\\ 1 \\\\ -2 \\end{pmatrix}$$

[STEP]
**Schritt 3: Dritten Vektor orthogonalisieren**

$$w_3' = w_3 - \\langle w_3, e_1 \\rangle \\cdot e_1 - \\langle w_3, e_2 \\rangle \\cdot e_2$$

$$\\langle w_3, e_1 \\rangle = \\frac{1}{\\sqrt{14}}(0 + 2 + 3) = \\frac{5}{\\sqrt{14}}$$

$$\\langle w_3, e_2 \\rangle = \\frac{1}{\\sqrt{21}}(0 + 1 - 2) = \\frac{-1}{\\sqrt{21}}$$

$$w_3' = \\begin{pmatrix} 0 \\\\ 1 \܀ 1 \\end{pmatrix} - \\frac{5}{14}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix} + \\frac{1}{21}\\begin{pmatrix} 4 \\\\ 1 \\\\ -2 \\end{pmatrix}$$

$$= \\begin{pmatrix} -\\frac{5}{14} + \\frac{4}{21} \\\\ 1 - \\frac{10}{14} + \\frac{1}{21} \\\\ 1 - \\frac{15}{14} - \\frac{2}{21} \\end{pmatrix} = \\begin{pmatrix} \\frac{-15 + 8}{42} \\\\ \\frac{42 - 30 + 2}{42} \܀ \\frac{42 - 45 - 4}{42} \\end{pmatrix} = \\begin{pmatrix} -\\frac{7}{42} \\\\ \\frac{14}{42} \\\\ -\\frac{7}{42} \\end{pmatrix} = \\frac{1}{6}\\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix}$$

$$\\|w_3'\\| = \\frac{1}{6}\\sqrt{1 + 4 + 1} = \\frac{\\sqrt{6}}{6} = \\frac{1}{\\sqrt{6}}$$

$$e_3 = \\sqrt{6} \\cdot \\frac{1}{6}\\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix} = \\frac{1}{\\sqrt{6}}\\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix}$$

[RESULT]
$$e_1 = \\frac{1}{\\sqrt{14}}\\begin{pmatrix} 1 \\\\ 2 \\\\ 3 \\end{pmatrix}, \\quad e_2 = \\frac{1}{\\sqrt{21}}\\begin{pmatrix} 4 \\\\ 1 \\\\ -2 \\end{pmatrix}, \\quad e_3 = \\frac{1}{\\sqrt{6}}\\begin{pmatrix} -1 \\\\ 2 \\\\ -1 \\end{pmatrix}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Gram-Schmidt-Orthonormalisierung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-7",
    title: "Eigenvektorbasis einer 2×2-Matrix",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 7 — Eigenvektorbasis einer 2×2-Matrix

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Eigenwerte, Eigenvektoren, Diagonalisierbarkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Für welche $a \\in \\mathbb{R}$ besitzt die Matrix

$$A = \\begin{pmatrix} a+1 & a \\\\ -a & -a+1 \\end{pmatrix}$$

eine Basis aus Eigenvektoren (d.h. wann ist $A$ diagonalisierbar)?

[STEP]
**Schritt 1: Charakteristisches Polynom berechnen**

$$p_A(\\lambda) = \\det(A - \\lambda I) = \\det\\begin{pmatrix} a+1-\\lambda & a \\\\ -a & -a+1-\\lambda \\end{pmatrix}$$

$$= (a+1-\\lambda)(-a+1-\\lambda) - a(-a)$$

$$= (1-\\lambda+a)(1-\\lambda-a) + a^2$$

$$= (1-\\lambda)^2 - a^2 + a^2 = (1-\\lambda)^2$$

[STEP]
**Schritt 2: Eigenwerte bestimmen**

$$p_A(\\lambda) = (1-\\lambda)^2 = 0$$

Der einzige Eigenwert ist $\\lambda = 1$ mit algebraischer Vielfachheit 2.

[STEP]
**Schritt 3: Geometrische Vielfachheit bestimmen**

$$A - I = \\begin{pmatrix} a & a \\\\ -a & -a \\end{pmatrix}$$

$Z_2 \\leftarrow Z_2 + Z_1$: $\\begin{pmatrix} a & a \\\\ 0 & 0 \\end{pmatrix}$

**Fall $a \\neq 0$:** Rang$(A - I) = 1$, also $\\dim(\\ker(A - I)) = 2 - 1 = 1$.
Geometrische Vielfachheit = 1 < 2 = algebraische Vielfachheit → **nicht diagonalisierbar**.

**Fall $a = 0$:** $A - I = 0$, also Rang$(A - I) = 0$, $\\dim(\\ker(A - I)) = 2$.
Geometrische Vielfachheit = 2 = algebraische Vielfachheit → **diagonalisierbar**.

[RESULT]
$$A \\text{ hat eine Eigenvektorbasis genau dann, wenn } a = 0.$$

Für $a = 0$ ist $A = I$ und jeder Vektor ist ein Eigenvektor.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Diagonalisierbarkeit durch Vergleich von Vielfachheiten** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-190205-8",
    title: "Charakteristisches Polynom bei x=0",
    duration: "5 min",
    type: "text",
    group: "📝 Klausur 05.02.2019",
    content: `## Aufgabe 8 — Charakteristisches Polynom bei x=0

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Charakteristisches Polynom, Determinante

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $A \\in \\mathbb{R}^{n \\times n}$. Zeigen Sie:
$$p_A(0) = (-1)^n \\det(A)$$

[STEP]
**Schritt 1: Definition des charakteristischen Polynoms**

Das charakteristische Polynom ist definiert als:
$$p_A(x) = \\det(A - xI)$$

[STEP]
**Schritt 2: Auswertung bei $x = 0$**

$$p_A(0) = \\det(A - 0 \\cdot I) = \\det(A)$$

[STEP]
**Schritt 3: Vorzeichen-Konvention prüfen**

Es gibt zwei Konventionen für das charakteristische Polynom:

**Konvention 1:** $p_A(x) = \\det(A - xI)$ → $p_A(0) = \\det(A)$

**Konvention 2:** $p_A(x) = \\det(xI - A) = (-1)^n \\det(A - xI)$ → $p_A(0) = (-1)^n \\det(A)$

Mit der Konvention $p_A(x) = \\det(xI - A)$:

$$p_A(0) = \\det(0 \\cdot I - A) = \\det(-A) = (-1)^n \\det(A)$$

wobei $\\det(-A) = (-1)^n \\det(A)$ gilt, weil $-A = (-1) \\cdot A$ und die Determinante eine multilineare Abbildung ist.

[RESULT]
$$p_A(0) = (-1)^n \\det(A) \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole die **Eigenschaften des charakteristischen Polynoms** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
