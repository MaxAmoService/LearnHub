import { Lesson } from "../types";

export const mathe3Altklausur220922: Lesson[] = [
  {
    id: "ma3-klausur-220922-1",
    title: "Fluggesellschaft — Gleichungssystem aufstellen und lösen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 22.09.2022",
    content: `## Aufgabe 1

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Gleichungssystem, Modellierung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Eine Fluggesellschaft bietet 100 Sitzplätze in drei Klassen an: Economy (500 €), Business (200 €) und First Class (100 €). Der Gesamtumsatz beträgt 25.000 €. Die Anzahl der Business-Sitze ist halb so groß wie die der Economy-Sitze.

Stellen Sie das Gleichungssystem auf und lösen Sie es.

[STEP]
**Schritt 1: Variablen definieren**

Sei:
- $x_1$ = Anzahl Economy-Sitze (500 €)
- $x_2$ = Anzahl Business-Sitze (200 €)
- $x_3$ = Anzahl First-Class-Sitze (100 €)

[STEP]
**Schritt 2: Gleichungen aufstellen**

Aus der Aufgabenstellung:
$$x_1 + x_2 + x_3 = 100 \\quad \\text{(Gesamtplätze)}$$
$$500x_1 + 200x_2 + 100x_3 = 25000 \\quad \\text{(Umsatz)}$$
$$x_2 = \\frac{x_1}{2} \\quad \\Leftrightarrow \\quad x_1 = 2x_2$$

[STEP]
**Schritt 3: Einsetzen und lösen**

Setze $x_1 = 2x_2$ in Gleichung 1 ein:
$$2x_2 + x_2 + x_3 = 100 \\Rightarrow 3x_2 + x_3 = 100 \\Rightarrow x_3 = 100 - 3x_2$$

Setze in Gleichung 2 ein:
$$500(2x_2) + 200x_2 + 100(100 - 3x_2) = 25000$$
$$1000x_2 + 200x_2 + 10000 - 300x_2 = 25000$$
$$900x_2 = 15000$$
$$x_2 = \\frac{15000}{900} = \\frac{50}{3} \\approx 16{,}67$$

[STEP]
**Schritt 4: Lösung berechnen**

$$x_2 = \\frac{50}{3}$$
$$x_1 = 2x_2 = \\frac{100}{3}$$
$$x_3 = 100 - 3 \\cdot \\frac{50}{3} = 100 - 50 = 50$$

Probe: $\\frac{100}{3} + \\frac{50}{3} + 50 = 50 + 50 = 100$ ✓

Umsatz: $500 \\cdot \\frac{100}{3} + 200 \\cdot \\frac{50}{3} + 100 \\cdot 50 = \\frac{50000 + 10000}{3} + 5000 = 20000 + 5000 = 25000$ ✓

[RESULT]
$$x_1 = \\frac{100}{3} \\approx 33{,}33, \\quad x_2 = \\frac{50}{3} \\approx 16{,}67, \\quad x_3 = 50$$

Hinweis: Da die Platzanzahlen ganzzahlig sein müssen, ist diese Lösung in der Praxis nicht direkt umsetzbar — man müsste runden.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Das Gleichungssystem wurde durch Einsetzen der Nebenbedingung gelöst. Achte auf die Interpretation: nicht-ganzzahlige Lösungen sind bei praktischen Problemen ein Hinweis auf Modellgrenzen.`,
  },

  {
    id: "ma3-klausur-220922-2",
    title: "Verkettung von Abbildungen — Matrizen, Bijektivität, Eigenwerte",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 22.09.2022",
    content: `## Aufgabe 2

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Komposition, Bijektivität, Eigenwerte

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Seien $f: \\mathbb{R}^3 \\to \\mathbb{R}^2$ und $g: \\mathbb{R}^2 \\to \\mathbb{R}^3$ gegeben durch die Matrizen:

$$M_f = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}, \\quad M_g = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{pmatrix}$$

(i) Bestimmen Sie die Matrizen für $h_1 = f \\circ g$ und $h_2 = g \\circ f$.
(ii) Sind $h_1$ oder $h_2$ bijektiv?
(iii) Bestimmen Sie die Eigenwerte von $M_{h_2} = M_g \\cdot M_f$.

[STEP]
**Schritt 1: (i) — Matrix für $h_1 = f \\circ g$**

$$M_{h_1} = M_f \\cdot M_g = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{pmatrix}$$

$$= \\begin{pmatrix} 1 \\cdot 1 + 2 \\cdot 0 + 0 \\cdot 1 & 1 \\cdot 0 + 2 \\cdot 1 + 0 \\cdot 1 \\\\ 0 \\cdot 1 + 1 \\cdot 0 + 1 \\cdot 1 & 0 \\cdot 0 + 1 \\cdot 1 + 1 \\cdot 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 2 \\\\ 1 & 2 \\end{pmatrix}$$

[STEP]
**Schritt 2: (i) — Matrix für $h_2 = g \\circ f$**

$$M_{h_2} = M_g \\cdot M_f = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 1 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\end{pmatrix}$$

$$= \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 3 & 1 \\end{pmatrix}$$

[STEP]
**Schritt 3: (ii) — Bijektivität prüfen**

$h_1: \\mathbb{R}^2 \\to \\mathbb{R}^2$ mit $M_{h_1} = \\begin{pmatrix} 1 & 2 \\\\ 1 & 2 \\end{pmatrix}$

$\\det(M_{h_1}) = 1 \\cdot 2 - 2 \\cdot 1 = 0$ → **nicht bijektiv** (nicht invertierbar).

$h_2: \\mathbb{R}^3 \\to \\mathbb{R}^3$ mit $M_{h_2} = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 3 & 1 \\end{pmatrix}$

$\\det(M_{h_2}) = 1(1-3) - 2(0-1) + 0 = -2 + 2 = 0$ → **nicht bijektiv**.

[STEP]
**Schritt 4: (iii) — Eigenwerte von $M_{h_2}$**

$$\\det(M_{h_2} - \\lambda I) = \\det\\begin{pmatrix} 1-\\lambda & 2 & 0 \\\\ 0 & 1-\\lambda & 1 \\\\ 1 & 3 & 1-\\lambda \\end{pmatrix}$$

Entwicklung nach der 1. Zeile:
$$= (1-\\lambda)\\left[(1-\\lambda)^2 - 3\\right] - 2(0 - 1)$$

$$= (1-\\lambda)(\\lambda^2 - 2\\lambda - 2) + 2$$

$$= -\\lambda^3 + 3\\lambda^2 - 2 + 2 = -\\lambda^3 + 3\\lambda^2 = -\\lambda^2(\\lambda - 3)$$

[RESULT]
(i) $M_{h_1} = \\begin{pmatrix} 1 & 2 \\\\ 1 & 2 \\end{pmatrix}$, $M_{h_2} = \\begin{pmatrix} 1 & 2 & 0 \\\\ 0 & 1 & 1 \\\\ 1 & 3 & 1 \\end{pmatrix}$

(ii) Keine der Abbildungen ist bijektiv ($\\det = 0$).

(iii) Eigenwerte von $M_{h_2}$: $\\lambda_1 = 0$ (Vielfachheit 2), $\\lambda_2 = 3$ (Vielfachheit 1).
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die Komposition von Abbildungen entspricht der Matrizenmultiplikation. Bijektivität äquivalent zu $\\det \\neq 0$. Die Eigenwerte folgen aus dem charakteristischen Polynom.`,
  },

  {
    id: "ma3-klausur-220922-3",
    title: "Orthogonalisierung über ℤ — Ganzzahlige Koeffizienten",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 22.09.2022",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Orthogonalisierung, Gram-Schmidt über ℤ

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Seien die Vektoren $v_1, v_2, v_3, v_4 \\in \\mathbb{R}^4$ gegeben. Führen Sie eine Orthogonalisierung mit ganzzahligen Koeffizienten und minimalen Beträgen durch. Bestimmen Sie $\\tilde{v}_1, \\tilde{v}_2, \\tilde{v}_3, \\tilde{v}_4$.

Gegeben:
$$v_1 = (1, 1, 1, 1)^T, \\quad v_2 = (1, 1, -1, -1)^T, \\quad v_3 = (1, -1, 1, -1)^T, \\quad v_4 = (1, -1, -1, 1)^T$$

[STEP]
**Schritt 1: $\\tilde{v}_1 = v_1$**

$$\\tilde{v}_1 = (1, 1, 1, 1)^T$$

[STEP]
**Schritt 2: $\\tilde{v}_2$ bestimmen**

$$\\tilde{v}_2 = v_2 - \\frac{\\langle v_2, \\tilde{v}_1 \\rangle}{\\langle \\tilde{v}_1, \\tilde{v}_1 \\rangle} \\tilde{v}_1$$

$$\\langle v_2, \\tilde{v}_1 \\rangle = 1 + 1 - 1 - 1 = 0$$

Da das Skalarprodukt bereits 0 ist:
$$\\tilde{v}_2 = v_2 = (1, 1, -1, -1)^T$$

[STEP]
**Schritt 3: $\\tilde{v}_3$ bestimmen**

$$\\tilde{v}_3 = v_3 - \\frac{\\langle v_3, \\tilde{v}_1 \\rangle}{\\langle \\tilde{v}_1, \\tilde{v}_1 \\rangle} \\tilde{v}_1 - \\frac{\\langle v_3, \\tilde{v}_2 \\rangle}{\\langle \\tilde{v}_2, \\tilde{v}_2 \\rangle} \\tilde{v}_2$$

$$\\langle v_3, \\tilde{v}_1 \\rangle = 1 - 1 + 1 - 1 = 0$$

$$\\langle v_3, \\tilde{v}_2 \\rangle = 1 - 1 - 1 + 1 = 0$$

Beide Skalarprodukte sind 0:
$$\\tilde{v}_3 = v_3 = (1, -1, 1, -1)^T$$

[STEP]
**Schritt 4: $\\tilde{v}_4$ bestimmen**

$$\\langle v_4, \\tilde{v}_1 \\rangle = 1 - 1 - 1 + 1 = 0$$
$$\\langle v_4, \\tilde{v}_2 \\rangle = 1 - 1 + 1 - 1 = 0$$
$$\\langle v_4, \\tilde{v}_3 \\rangle = 1 + 1 - 1 - 1 = 0$$

Alle Skalarprodukte sind 0:
$$\\tilde{v}_4 = v_4 = (1, -1, -1, 1)^T$$

[RESULT]
Die gegebenen Vektoren sind bereits orthogonal:
$$\\tilde{v}_1 = (1, 1, 1, 1)^T, \\quad \\tilde{v}_2 = (1, 1, -1, -1)^T$$
$$\\tilde{v}_3 = (1, -1, 1, -1)^T, \\quad \\tilde{v}_4 = (1, -1, -1, 1)^T$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Bei der Orthogonalisierung über $\\mathbb{Z}$ werden nur ganzzahlige Koeffizienten verwendet. Prüfe zuerst, ob die Vektoren bereits orthogonal sind — das spart Rechenaufwand!`,
  },

  {
    id: "ma3-klausur-220922-4",
    title: "Produkte elementarer Matrizen — Kriterium",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 22.09.2022",
    content: `## Aufgabe 4

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Elementare Matrizen, Determinante

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Welche der folgenden Matrizen lassen sich als Produkt elementarer Matrizen darstellen?

$$A = \\begin{pmatrix} 1 & 0 \\\\ 2 & 0 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}, \\quad C = \\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$$

[STEP]
**Schritt 1: Kriterium verstehen**

Eine Matrix ist genau dann ein Produkt elementarer Matrizen, wenn sie **invertierbar** ist, d.h. $\\det \\neq 0$.

Elementare Matrizen repräsentieren Zeilenumformungen, Zeilenmultiplikationen und Zeilenadditionen. Jede hat $\\det \\neq 0$, und das Produkt solcher Matrizen hat ebenfalls $\\det \\neq 0$.

[STEP]
**Schritt 2: Determinanten berechnen**

$$\\det(A) = 1 \\cdot 0 - 0 \\cdot 2 = 0 \\quad \\Rightarrow \\text{nicht invertierbar}$$

$$\\det(B) = 1 \\cdot 1 - 2 \\cdot 2 = 1 - 4 = -3 \\neq 0 \\quad \\Rightarrow \\text{invertierbar}$$

$$\\det(C) = 1 \\cdot 4 - 2 \\cdot 2 = 4 - 4 = 0 \\quad \\Rightarrow \\text{nicht invertierbar}$$

[STEP]
**Schritt 3: Verifikation für $B$**

$B$ ist invertierbar mit $\\det(B) = -3$. Tatsächlich lässt sich $B$ als Produkt elementarer Matrizen schreiben:

$$B = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix} \\cdot \\begin{pmatrix} 1 & 2 \\\\ 0 & -3 \\end{pmatrix}$$

Beide Faktoren sind elementar (Zeilenaddition bzw. Zeilenmultiplikation).

[RESULT]
Nur **$B$** lässt sich als Produkt elementarer Matrizen darstellen, da nur $B$ invertierbar ist ($\\det(B) = -3 \\neq 0$).

$A$ und $C$ haben $\\det = 0$ und sind daher nicht invertierbar.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Produkt elementarer Matrizen $\\Leftrightarrow$ invertierbar $\\Leftrightarrow$ $\\det \\neq 0$. Das ist das zentrale Kriterium für diese Art von Aufgaben.`,
  },

  {
    id: "ma3-klausur-220922-5",
    title: "Determinante mit Parametern — Invertierbarkeit",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 22.09.2022",
    content: `## Aufgabe 5

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Determinante, Parameter, Invertierbarkeit

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist die Matrix:

$$A = \\begin{pmatrix} x & 1 & 0 & 0 \\\\ 1 & x & 1 & 0 \\\\ 0 & 1 & x & 1 \\\\ 0 & 0 & 1 & x \\end{pmatrix}$$

Berechnen Sie $\\det(A)$. Für welche Werte von $x$ ist $A$ invertierbar?

[STEP]
**Schritt 1: Laplace-Entwicklung nach der 1. Zeile**

$$\\det(A) = x \\cdot \\det\\begin{pmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} - 1 \\cdot \\det\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix}$$

[STEP]
**Schritt 2: 3×3-Determinanten berechnen**

Erste Determinante:
$$\\det\\begin{pmatrix} x & 1 & 0 \\\\ 1 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} = x(x^2 - 1) - 1(x - 0) = x^3 - x - x = x^3 - 2x$$

Zweite Determinante:
$$\\det\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & x & 1 \\\\ 0 & 1 & x \\end{pmatrix} = 1(x^2 - 1) - 1(0 - 0) = x^2 - 1$$

[STEP]
**Schritt 3: Gesamtdeterminante**

$$\\det(A) = x(x^3 - 2x) - 1(x^2 - 1)$$
$$= x^4 - 2x^2 - x^2 + 1 = x^4 - 3x^2 + 1$$

[STEP]
**Schritt 4: Nullstellen bestimmen**

$A$ ist genau dann invertierbar, wenn $\\det(A) \\neq 0$, also:
$$x^4 - 3x^2 + 1 \\neq 0$$

Substitution $t = x^2$:
$$t^2 - 3t + 1 = 0 \\Rightarrow t = \\frac{3 \\pm \\sqrt{9-4}}{2} = \\frac{3 \\pm \\sqrt{5}}{2}$$

$$x^2 = \\frac{3 + \\sqrt{5}}{2} \\quad \\text{oder} \\quad x^2 = \\frac{3 - \\sqrt{5}}{2}$$

$$x = \\pm\\sqrt{\\frac{3 + \\sqrt{5}}{2}} \\quad \\text{oder} \\quad x = \\pm\\sqrt{\\frac{3 - \\sqrt{5}}{2}}$$

[RESULT]
$$\\det(A) = x^4 - 3x^2 + 1$$

$A$ ist invertierbar für alle $x \\in \\mathbb{R} \\setminus \\left\\{\\pm\\sqrt{\\frac{3+\\sqrt{5}}{2}},\\; \\pm\\sqrt{\\frac{3-\\sqrt{5}}{2}}\\right\\}$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die tridiagonale Matrix liefert ein rekursives Determinanten-Muster. Die Substitution $t = x^2$ reduziert das Polynom 4. Grades auf eine quadratische Gleichung.`,
  },

  {
    id: "ma3-klausur-220922-6",
    title: "10×10-Matrix — Eigenwerte, Vielfachheiten, Eigenbasen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 22.09.2022",
    content: `## Aufgabe 6

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Eigenwerte, Eigenbasen, Jordan-Struktur

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist die $10 \\times 10$-Matrix $A$ mit folgender Struktur:

$$A = \\begin{pmatrix} 3 & 1 & & & & & & & & \\\\ & 3 & 1 & & & & & & & \\\\ & & 3 & & & & & & & \\\\ & & & 2 & 1 & & & & & \\\\ & & & & 2 & & & & & \\\\ & & & & & 1 & 1 & & & \\\\ & & & & & & 1 & 1 & & \\\\ & & & & & & & 1 & & \\\\ & & & & & & & & 4 & 1 \\\\ & & & & & & & & & 4 \\end{pmatrix}$$

Bestimmen Sie alle Eigenwerte, algebraische und geometrische Vielfachheiten, sowie Eigenbasen.

[STEP]
**Schritt 1: Eigenwerte ablesen**

Die Matrix ist in Block-Diagonalform (Jordan-Blöcke). Die Eigenwerte stehen auf der Diagonalen:

$$\\lambda_1 = 3, \\quad \\lambda_2 = 2, \\quad \\lambda_3 = 1, \\quad \\lambda_4 = 4$$

[STEP]
**Schritt 2: Algebraische Vielfachheiten**

- $\\lambda_1 = 3$: erscheint 3-mal auf der Diagonale → $m_a = 3$
- $\\lambda_2 = 2$: erscheint 2-mal → $m_a = 2$
- $\\lambda_3 = 1$: erscheint 3-mal → $m_a = 3$
- $\\lambda_4 = 4$: erscheint 2-mal → $m_a = 2$

[STEP]
**Schritt 3: Geometrische Vielfachheiten**

Für jeden Jordan-Block der Größe $k$ zum Eigenwert $\\lambda$ hat $\\ker(A - \\lambda I)$ Dimension 1 pro Block.

**$\\lambda_1 = 3$:** Ein Jordan-Block der Größe 3 → $m_g = 1$

$$A - 3I \\text{ hat Rang } 2 \\Rightarrow \\dim(\\ker(A-3I)) = 1$$

**$\\lambda_2 = 2$:** Ein Jordan-Block der Größe 2 → $m_g = 1$

**$\\lambda_3 = 1$:** Drei Jordan-Blöcke (Größen 1, 1, 1 — da $A - I$ auf dem 3×3-Block Rang 0 hat) → $m_g = 3$

Korrektur: Der Block zu $\\lambda = 1$ ist $\\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$ — ein einzelner Block der Größe 3 → $m_g = 1$

**$\\lambda_4 = 4$:** Ein Jordan-Block der Größe 2 → $m_g = 1$

[STEP]
**Schritt 4: Eigenbasen**

**$\\lambda_1 = 3$:** Eigenvektor $e_1 = (1, 0, 0, 0, 0, 0, 0, 0, 0, 0)^T$

**$\\lambda_2 = 2$:** Eigenvektor $e_4 = (0, 0, 0, 1, 0, 0, 0, 0, 0, 0)^T$

**$\\lambda_3 = 1$:** Eigenvektor $e_6 = (0, 0, 0, 0, 0, 1, 0, 0, 0, 0)^T$

**$\\lambda_4 = 4$:** Eigenvektor $e_9 = (0, 0, 0, 0, 0, 0, 0, 0, 1, 0)^T$

[RESULT]
| Eigenwert | $m_a$ | $m_g$ | Eigenbasis |
|-----------|-------|-------|------------|
| $3$ | $3$ | $1$ | $\\{e_1\\}$ |
| $2$ | $2$ | $1$ | $\\{e_4\\}$ |
| $1$ | $3$ | $1$ | $\\{e_6\\}$ |
| $4$ | $2$ | $1$ | $\\{e_9\\}$ |
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Bei einer bereits in Jordan-Form (oder Block-Diagonalform) vorliegenden Matrix lassen sich Eigenwerte und Vielfachheiten direkt ablesen. Jeder Jordan-Block der Größe $k$ liefert genau einen Eigenvektor.`,
  },
];
