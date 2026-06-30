import { Lesson } from "../types";

export const mathe3Altklausur240403: Lesson[] = [
  {
    id: "ma3-klausur-240403-1",
    title: "Eigenwerte & Diagonalisierung — 1×1-Matrix",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.04.2024",
    content: `## Aufgabe 1 — Eigenwerte & Diagonalisierung

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Eigenwerte, Eigenvektoren, Jordannormform, Diagonalisierung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei $A = [2] \\in \\mathbb{C}^{1 \\times 1}$.

(a) Lösen Sie $Ax = b$ für $b = [1]$.
(b) Berechnen Sie $\\det(A)$.
(c) Bestimmen Sie das charakteristische Polynom.
(d) Finden Sie alle Eigenwerte und Eigenvektoren.
(e) Bestimmen Sie die algebraischen und geometrischen Vielfachheiten.
(f) Ist $A$ diagonalisierbar?
(g) Geben Sie die Jordannormform $J$ an.
(h) Finden Sie eine Matrix $T$ mit $T^{-1}AT = J$.

[STEP]
**Schritt 1: (a) Gleichung lösen**

$$Ax = b \\implies [2] \\cdot [x] = [1] \\implies x = \\frac{1}{2} = [0{,}5]$$

[STEP]
**Schritt 2: (b) Determinante**

$$\\det(A) = 2$$

[STEP]
**Schritt 3: (c) Charakteristisches Polynom**

$$p(\\lambda) = \\det(A - \\lambda I) = \\det([2 - \\lambda]) = 2 - \\lambda$$

[STEP]
**Schritt 4: (d) Eigenwerte und Eigenvektoren**

$$p(\\lambda) = 0 \\implies 2 - \\lambda = 0 \\implies \\lambda = 2$$

Eigenvektor: Jedes $v \\neq 0$ in $\\mathbb{C}^1$, z.B. $v = [1]$.

[STEP]
**Schritt 5: (e) Vielfachheiten**

- **Algebraische Vielfachheit:** $\\lambda = 2$ hat Vielfachheit $1$ (Wurzel von $p(\\lambda)$).
- **Geometrische Vielfachheit:** $\\dim(\\ker(A - 2I)) = \\dim(\\ker([0])) = 1$.

[STEP]
**Schritt 6: (f) Diagonalisierbarkeit**

Ja, $A$ ist bereits diagonal (trivialerweise). Es gibt $1$ linear unabhängigen Eigenvektor in $\\mathbb{C}^1$.

[STEP]
**Schritt 7: (g) Jordannormform**

Da $A$ bereits diagonal ist:

$$J = [2]$$

[STEP]
**Schritt 8: (h) Transformationsmatrix**

$$T = [1], \\quad T^{-1} = [1], \\quad T^{-1}AT = [1] \\cdot [2] \\cdot [1] = [2] = J$$

[RESULT]
- **(a)** $x = [0{,}5]$
- **(b)** $\\det(A) = 2$
- **(c)** $p(\\lambda) = 2 - \\lambda$
- **(d)** $\\lambda = 2$, Eigenvektor $v = [1]$
- **(e)** AM = 1, GM = 1
- **(f)** Ja, diagonalisierbar
- **(g)** $J = [2]$
- **(h)** $T = [1]$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Eigenwerte, Eigenvektoren und Jordannormform** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240403-2",
    title: "Trigonometrische Gleichung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.04.2024",
    content: `## Aufgabe 2 — Trigonometrische Gleichung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Trigonometrie, Additionstheoreme

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Lösen Sie die Gleichung:
$$2\\cos^2(\\alpha) = \\sin(2\\alpha)$$

[STEP]
**Schritt 1: Doppelwinkel-Formel anwenden**

Mit $\\sin(2\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha)$:

$$2\\cos^2(\\alpha) = 2\\sin(\\alpha)\\cos(\\alpha)$$

[STEP]
**Schritt 2: Vereinfachen**

$$2\\cos^2(\\alpha) - 2\\sin(\\alpha)\\cos(\\alpha) = 0$$

$$2\\cos(\\alpha)\\bigl(\\cos(\\alpha) - \\sin(\\alpha)\\bigr) = 0$$

[STEP]
**Schritt 3: Nullstellen bestimmen**

**Fall 1:** $\\cos(\\alpha) = 0$

$$\\alpha = \\frac{\\pi}{2} + k\\pi, \\quad k \\in \\mathbb{Z}$$

**Fall 2:** $\\cos(\\alpha) - \\sin(\\alpha) = 0$

$$\\cos(\\alpha) = \\sin(\\alpha) \\implies \\tan(\\alpha) = 1$$

$$\\alpha = \\frac{\\pi}{4} + k\\pi, \\quad k \\in \\mathbb{Z}$$

[STEP]
**Schritt 4: Probe**

Für $\\alpha = \\pi/2$: $2\\cos^2(\\pi/2) = 0$, $\\sin(\\pi) = 0$ ✓

Für $\\alpha = \\pi/4$: $2\\cos^2(\\pi/4) = 2 \\cdot \\frac{1}{2} = 1$, $\\sin(\\pi/2) = 1$ ✓

[RESULT]
$$\\alpha = \\frac{\\pi}{2} + k\\pi \\quad \\text{oder} \\quad \\alpha = \\frac{\\pi}{4} + k\\pi, \\quad k \\in \\mathbb{Z}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **trigonometrische Gleichungen und Additionstheoreme** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240403-3",
    title: "Lineare Abbildung — Äpfel und Birnen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.04.2024",
    content: `## Aufgabe 3 — Lineare Abbildung

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Lineare Abbildung, Gleichungssystem

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Äpfel und Birnen werden in roten und grünen Netzen verkauft.
- **Rotes Netz:** 3 Äpfel + 2 Birnen
- **Grünes Netz:** 2 Äpfel + 3 Birnen

(a) Stellen Sie die lineare Abbildung $\\varphi: \\mathbb{R}^2 \\to \\mathbb{R}^2$ als Matrix $A$ dar, wobei $\\varphi(r, g) = (\\text{Äpfel}, \\text{Birnen})$.
(b) Ein Kunde kauft insgesamt 80 Äpfel und 75 Birnen. Wie viele rote und grüne Netze wurden gekauft?

[STEP]
**Schritt 1: (a) Matrix aufstellen**

Sei $r$ = Anzahl roter Netze, $g$ = Anzahl grüner Netze.

$$\\varphi(r, g) = (3r + 2g, \\; 2r + 3g)$$

$$A = \\begin{pmatrix} 3 & 2 \\\\ 2 & 3 \\end{pmatrix}$$

[STEP]
**Schritt 2: (b) Gleichungssystem lösen**

$$\\begin{pmatrix} 3 & 2 \\\\ 2 & 3 \\end{pmatrix} \\begin{pmatrix} r \\\\ g \\end{pmatrix} = \\begin{pmatrix} 80 \\\\ 75 \\end{pmatrix}$$

Determinante: $\\det(A) = 9 - 4 = 5 \\neq 0$ → eindeutige Lösung.

[STEP]
**Schritt 3: Inverse Matrix**

$$A^{-1} = \\frac{1}{5} \\begin{pmatrix} 3 & -2 \\\\ -2 & 3 \\end{pmatrix}$$

[STEP]
**Schritt 4: Lösung berechnen**

$$\\begin{pmatrix} r \\\\ g \\end{pmatrix} = \\frac{1}{5} \\begin{pmatrix} 3 & -2 \\\\ -2 & 3 \\end{pmatrix} \\begin{pmatrix} 80 \\\\ 75 \\end{pmatrix} = \\frac{1}{5} \\begin{pmatrix} 240 - 150 \\\\ -160 + 225 \\end{pmatrix} = \\frac{1}{5} \\begin{pmatrix} 90 \\\\ 65 \\end{pmatrix} = \\begin{pmatrix} 18 \\\\ 13 \\end{pmatrix}$$

[STEP]
**Schritt 5: Probe**

$3 \\cdot 18 + 2 \\cdot 13 = 54 + 26 = 80$ Äpfel ✓
$2 \\cdot 18 + 3 \\cdot 13 = 36 + 39 = 75$ Birnen ✓

[RESULT]
- **(a)** $A = \\begin{pmatrix} 3 & 2 \\\\ 2 & 3 \\end{pmatrix}$
- **(b)** 18 rote Netze und 13 grüne Netze
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **lineare Abbildungen und Gleichungssysteme** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240403-4",
    title: "Charakteristisches Polynom — Begleitmatrix",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.04.2024",
    content: `## Aufgabe 4 — Charakteristisches Polynom der Begleitmatrix

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Charakteristisches Polynom, Determinante

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Bestimmen Sie das charakteristische Polynom der Begleitmatrix:
$$A = \\begin{pmatrix} 0 & 0 & -a \\\\ 1 & 0 & -b \\\\ 0 & 1 & -c \\end{pmatrix}$$

[STEP]
**Schritt 1: $A - \\lambda I$ aufstellen**

$$A - \\lambda I = \\begin{pmatrix} -\\lambda & 0 & -a \\\\ 1 & -\\lambda & -b \\\\ 0 & 1 & -c - \\lambda \\end{pmatrix}$$

[STEP]
**Schritt 2: Determinante nach der ersten Zeile entwickeln**

$$p(\\lambda) = \\det(A - \\lambda I)$$

$$= -\\lambda \\cdot \\det\\begin{pmatrix} -\\lambda & -b \\\\ 1 & -c-\\lambda \\end{pmatrix} - 0 + (-a) \\cdot \\det\\begin{pmatrix} 1 & -\\lambda \\\\ 0 & 1 \\end{pmatrix}$$

[STEP]
**Schritt 3: Unterdeterminanten ausrechnen**

Erste Unterdeterminante:
$$(-\\lambda)(-c-\\lambda) - (-b)(1) = \\lambda c + \\lambda^2 + b$$

Zweite Unterdeterminante:
$$1 \\cdot 1 - (-\\lambda) \\cdot 0 = 1$$

[STEP]
**Schritt 4: Zusammenfassen**

$$p(\\lambda) = -\\lambda(\\lambda^2 + c\\lambda + b) + (-a)(1)$$

$$= -\\lambda^3 - c\\lambda^2 - b\\lambda - a$$

Oder äquivalent (Vorzeichen wechseln):

$$p(\\lambda) = \\lambda^3 + c\\lambda^2 + b\\lambda + a$$

[RESULT]
$$p(\\lambda) = -\\lambda^3 - c\\lambda^2 - b\\lambda - a$$

bzw. äquivalent: $\\lambda^3 + c\\lambda^2 + b\\lambda + a = 0$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole das **charakteristische Polynom und die Laplace-Entwicklung** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240403-5",
    title: "Kern und Bild — Basen bestimmen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.04.2024",
    content: `## Aufgabe 5 — Kern und Bild

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Kern, Bild, Basis, Rang

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei die Matrix:
$$A = \\begin{pmatrix} 1 & 2 & 0 & 3 & 1 \\\\ 0 & 0 & 1 & 2 & 1 \\\\ 0 & 0 & 0 & 0 & 0 \\\\ 0 & 0 & 0 & 0 & 0 \\end{pmatrix} \\in \\mathbb{R}^{4 \\times 5}$$

Bestimmen Sie eine Basis von $\\ker(A)$ und eine Basis von $\\operatorname{im}(A)$.

[STEP]
**Schritt 1: Spaltenstruktur analysieren**

Die Matrix ist bereits in Stufenform. Pivot-Spalten: 1 und 3. Freie Variablen: $x_2, x_4, x_5$.

[STEP]
**Schritt 2: Gleichungssystem $Ax = 0$ lösen**

Aus den Zeilen:

$$x_1 + 2x_2 + 3x_4 + x_5 = 0 \\implies x_1 = -2x_2 - 3x_4 - x_5$$

$$x_3 + 2x_4 + x_5 = 0 \\implies x_3 = -2x_4 - x_5$$

[STEP]
**Schritt 3: Basis des Kerns**

Freie Variablen einzeln setzen:

**$x_2 = 1, x_4 = 0, x_5 = 0$:**
$$v_1 = (-2, 1, 0, 0, 0)^T$$

**$x_2 = 0, x_4 = 1, x_5 = 0$:**
$$v_2 = (-3, 0, -2, 1, 0)^T$$

**$x_2 = 0, x_4 = 0, x_5 = 1$:**
$$v_3 = (-1, 0, -1, 0, 1)^T$$

$$\\ker(A) = \\operatorname{span}\\{v_1, v_2, v_3\\}, \\quad \\dim(\\ker(A)) = 3$$

[STEP]
**Schritt 4: Basis des Bildes**

Das Bild wird durch die Pivot-Spalten aufgespannt (Spalten 1 und 3 der Originalmatrix):

$$w_1 = (1, 0, 0, 0)^T, \\quad w_2 = (0, 1, 0, 0)^T$$

$$\\operatorname{im}(A) = \\operatorname{span}\\{w_1, w_2\\}, \\quad \\dim(\\operatorname{im}(A)) = 2$$

[STEP]
**Schritt 5: Rang-Nullstellen-Theorem prüfen**

$$\\dim(\\ker(A)) + \\dim(\\operatorname{im}(A)) = 3 + 2 = 5 = n \\quad \\checkmark$$

[RESULT]
- **Basis des Kerns:** $\\{(-2,1,0,0,0)^T, \\; (-3,0,-2,1,0)^T, \\; (-1,0,-1,0,1)^T\\}$
- **Basis des Bildes:** $\\{(1,0,0,0)^T, \\; (0,1,0,0)^T\\}$
- $\\dim(\\ker(A)) = 3$, $\\dim(\\operatorname{im}(A)) = 2$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Kern, Bild und den Rang-Nullstellen-Satz** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },

  {
    id: "ma3-klausur-240403-6",
    title: "Skalarprodukt — Nachweis & Orthogonalität",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 03.04.2024",
    content: `## Aufgabe 6 — Skalarprodukt

> **📋 20 Punkte** | ⏱ 15 min | 🔑 Skalarprodukt, Bilinearform, positive Definitheit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
(1) Definieren Sie den Begriff **Skalarprodukt**.
(2) Zeigen Sie, dass $\\Phi(x, y) = x^T \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix} y$ ein Skalarprodukt auf $\\mathbb{R}^2$ ist.
(3) Zeigen Sie, dass $(1, 2)^T \\perp (-1, 1)^T$ bezüglich $\\Phi$.

[STEP]
**Schritt 1: (1) Definition Skalarprodukt**

Ein Skalarprodukt auf $V$ ist eine Abbildung $\\langle \\cdot, \\cdot \\rangle: V \\times V \\to \\mathbb{R}$ mit:
1. **Bilinearität:** Linear in beiden Argumenten
2. **Symmetrie:** $\\langle x, y \\rangle = \\langle y, x \\rangle$
3. **Positive Definitheit:** $\\langle x, x \\rangle > 0$ für alle $x \\neq 0$

[STEP]
**Schritt 2: (2) Bilinearität zeigen**

Sei $A = \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix}$.

$$\\Phi(x, y) = x^T A y$$

Für $x, y, z \\in \\mathbb{R}^2$ und $\\alpha, \\beta \\in \\mathbb{R}$:

$$\\Phi(\\alpha x + \\beta z, y) = (\\alpha x + \\beta z)^T A y = \\alpha x^T A y + \\beta z^T A y = \\alpha \\Phi(x, y) + \\beta \\Phi(z, y)$$

Analog in der zweiten Komponente → **bilinear** ✓

[STEP]
**Schritt 3: Symmetrie zeigen**

$$\\Phi(y, x) = y^T A x = (y^T A x)^T = x^T A^T y = x^T A y = \\Phi(x, y)$$

da $A^T = A$ (symmetrische Matrix) → **symmetrisch** ✓

[STEP]
**Schritt 4: Positive Definitheit zeigen**

$$\\Phi(x, x) = x^T A x = (x_1, x_2) \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} = 2x_1^2 + x_2^2$$

Für $x \\neq 0$: $2x_1^2 + x_2^2 > 0$ → **positiv definit** ✓

[STEP]
**Schritt 5: (3) Orthogonalität berechnen**

$$\\Phi\\bigl((1,2)^T, (-1,1)^T\\bigr) = (1, 2) \\begin{pmatrix} 2 & 0 \\\\ 0 & 1 \\end{pmatrix} \\begin{pmatrix} -1 \\\\ 1 \\end{pmatrix}$$

$$= (1, 2) \\begin{pmatrix} -2 \\\\ 1 \\end{pmatrix} = 1 \\cdot (-2) + 2 \\cdot 1 = -2 + 2 = 0$$

Da $\\Phi((1,2)^T, (-1,1)^T) = 0$, sind die Vektoren orthogonal bezüglich $\\Phi$. ✓

[RESULT]
- **(1)** Skalarprodukt = bilineare, symmetrische, positiv definite Abbildung
- **(2)** $\\Phi$ ist ein Skalarprodukt (Bilinearität, Symmetrie, pos. Definitheit gezeigt)
- **(3)** $\\Phi((1,2)^T, (-1,1)^T) = 0$ → orthogonal ✓
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Alle Lösungsschritte durchgearbeitet. Wiederhole **Skalarprodukt, Bilinearform und Orthogonalität** regelmäßig — das ist ein Klassiker in jeder Klausur!`,
  },
];
