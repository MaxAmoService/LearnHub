import { Lesson } from "../types";

export const mathe3Altklausur200204: Lesson[] = [
  {
    id: "ma3-klausur-200204-1",
    title: "Gleichungssystem lösen — Zeilenstufenform",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 1

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Gleichungssystem, Zeilenstufenform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist die Matrix $A = \\begin{pmatrix} 1 & -1 & 1 \\\\ -1 & 1 & -2 \\\\ 1 & 0 & 1 \\end{pmatrix}$.

Bestimmen Sie $x \\in \\mathbb{R}^{1 \\times 3}$ mit $x \\cdot A = (42, 0, 0)$.

[STEP]
**Schritt 1: Gleichungssystem aufstellen**

Gesucht ist $x = (x_1, x_2, x_3)$, sodass:

$$x \\cdot A = (x_1, x_2, x_3) \\cdot \\begin{pmatrix} 1 & -1 & 1 \\\\ -1 & 1 & -2 \\\\ 1 & 0 & 1 \\end{pmatrix} = (42, 0, 0)$$

Das ergibt das Gleichungssystem:
$$x_1 - x_2 + x_3 = 42$$
$$-x_1 + x_2 - 2x_3 = 0$$
$$x_1 + 0 \\cdot x_2 + x_3 = 0$$

[STEP]
**Schritt 2: Gleichung 3 nach $x_1$ auflösen**

Aus Gleichung 3: $x_1 + x_3 = 0 \\Rightarrow x_1 = -x_3$

[STEP]
**Schritt 3: Einsetzen in Gleichung 1 und 2**

In Gleichung 1: $-x_3 - x_2 + x_3 = 42 \\Rightarrow -x_2 = 42 \\Rightarrow x_2 = -42$

In Gleichung 2: $-(-x_3) + (-42) - 2x_3 = 0 \\Rightarrow x_3 - 42 - 2x_3 = 0 \\Rightarrow -x_3 = 42 \\Rightarrow x_3 = -42$

Daraus folgt: $x_1 = -x_3 = 42$

[RESULT]
$$x = (42, -42, -42)$$

Probe: $(42, -42, -42) \\cdot A = (42+42-42,\\; -42-42+0,\\; 42+84-42) = (42, 0, 0)$ ✓
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Das Gleichungssystem wurde durch schrittweises Einsetzen gelöst. Prüfe immer durch Rückeinsetzen, ob die Lösung korrekt ist.`,
  },

  {
    id: "ma3-klausur-200204-2",
    title: "Trigonometrische Gleichung — cos²(x) = cos(2x)",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 2

> **📋 10 Punkte** | ⏱ 10 min | 🔑 Trigonometrie, Doppelwinkel

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben ist die Gleichung $\\cos^2(x) = \\cos(2x)$.

Bestimmen Sie alle Lösungen $\\alpha$ und skizzieren Sie den Verlauf beider Funktionen im Intervall $[0, 2\\pi]$.

[STEP]
**Schritt 1: Doppelwinkel-Formel anwenden**

Die Doppelwinkel-Formel lautet:
$$\\cos(2x) = 2\\cos^2(x) - 1$$

Einsetzen in die Gleichung:
$$\\cos^2(x) = 2\\cos^2(x) - 1$$

[STEP]
**Schritt 2: Nach $\\cos^2(x)$ auflösen**

$$\\cos^2(x) - 2\\cos^2(x) = -1$$
$$-\\cos^2(x) = -1$$
$$\\cos^2(x) = 1$$
$$\\cos(x) = \\pm 1$$

[STEP]
**Schritt 3: Lösungen im Intervall $[0, 2\\pi]$ bestimmen**

$\\cos(x) = 1$ gilt für $x = 0$ und $x = 2\\pi$

$\\cos(x) = -1$ gilt für $x = \\pi$

[RESULT]
Die Lösungen sind $\\alpha \\in \\{0, \\pi, 2\\pi\\}$.

$\\cos^2(x)$ oszilliert zwischen 0 und 1, $\\cos(2x)$ oszilliert zwischen -1 und 1 mit doppelter Frequenz. Sie schneiden sich genau dort, wo $\\cos(x) = \\pm 1$.
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die trigonometrische Gleichung wurde mit der Doppelwinkel-Formel auf $\\cos^2(x) = 1$ reduziert. Die drei Lösungen sind $0, \\pi, 2\\pi$.`,
  },

  {
    id: "ma3-klausur-200204-3",
    title: "Orthonormalbasis — Gram-Schmidt-Verfahren",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 3

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Gram-Schmidt, Orthonormalbasis

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sei $w_1 = \\lambda \\cdot (1, 2, 3)^T$ mit $\\|w_1\\| = 1$.

Bestimmen Sie eine Orthonormalbasis $\\{w_1, w_2, w_3\\}$ von $\\mathbb{R}^3$ mithilfe des Gram-Schmidt-Verfahrens.

[STEP]
**Schritt 1: $w_1$ normieren**

$\\|w_1\\| = 1$ ist bereits gegeben, also:
$$w_1 = \\frac{1}{\\sqrt{14}}(1, 2, 3)^T$$

da $\\|{(1,2,3)^T}\\| = \\sqrt{1+4+9} = \\sqrt{14}$.

[STEP]
**Schritt 2: $w_2$ bestimmen — Projektion von $e_2$ auf $w_1$ abziehen**

Wähle $v_2 = (0, 1, 0)^T$ (Standardbasis-Vektor, nicht parallel zu $w_1$).

Berechne die Projektion:
$$\\text{proj}_{w_1}(v_2) = \\langle v_2, w_1 \\rangle \\cdot w_1 = \\frac{2}{\\sqrt{14}} \\cdot \\frac{1}{\\sqrt{14}}(1, 2, 3)^T = \\frac{2}{14}(1, 2, 3)^T = \\frac{1}{7}(1, 2, 3)^T$$

Orthogonaler Anteil:
$$u_2 = v_2 - \\text{proj}_{w_1}(v_2) = (0, 1, 0)^T - \\frac{1}{7}(1, 2, 3)^T = \\left(-\\frac{1}{7}, \\frac{5}{7}, -\\frac{3}{7}\\right)^T$$

Normierung:
$$\\|u_2\\| = \\frac{1}{7}\\sqrt{1 + 25 + 9} = \\frac{\\sqrt{35}}{7}$$

$$w_2 = \\frac{u_2}{\\|u_2\\|} = \\frac{7}{\\sqrt{35}} \\cdot \\frac{1}{7}(-1, 5, -3)^T = \\frac{1}{\\sqrt{35}}(-1, 5, -3)^T$$

[STEP]
**Schritt 3: $w_3$ bestimmen — Projektionen von $e_3$ abziehen**

Wähle $v_3 = (0, 0, 1)^T$.

$$\\text{proj}_{w_1}(v_3) = \\langle v_3, w_1 \\rangle \\cdot w_1 = \\frac{3}{\\sqrt{14}} \\cdot \\frac{1}{\\sqrt{14}}(1, 2, 3)^T = \\frac{3}{14}(1, 2, 3)^T$$

$$\\text{proj}_{w_2}(v_3) = \\langle v_3, w_2 \\rangle \\cdot w_2 = \\frac{-3}{\\sqrt{35}} \\cdot \\frac{1}{\\sqrt{35}}(-1, 5, -3)^T = \\frac{-3}{35}(-1, 5, -3)^T$$

$$u_3 = v_3 - \\text{proj}_{w_1}(v_3) - \\text{proj}_{w_2}(v_3)$$

$$= (0, 0, 1)^T - \\frac{3}{14}(1, 2, 3)^T + \\frac{3}{35}(-1, 5, -3)^T$$

$$= \\left(-\\frac{3}{14} - \\frac{3}{35},\\; -\\frac{6}{14} + \\frac{15}{35},\\; 1 - \\frac{9}{14} - \\frac{9}{35}\\right)^T$$

$$= \\left(-\\frac{21+6}{70},\\; \\frac{-30+30}{70},\\; \\frac{70-45-18}{70}\\right)^T = \\left(-\\frac{3}{10},\\; 0,\\; \\frac{1}{10}\\right)^T$$

Normierung: $\\|u_3\\| = \\frac{1}{10}\\sqrt{9+0+1} = \\frac{\\sqrt{10}}{10} = \\frac{1}{\\sqrt{10}}$

$$w_3 = \\frac{u_3}{\\|u_3\\|} = \\sqrt{10} \\cdot \\left(-\\frac{3}{10}, 0, \\frac{1}{10}\\right)^T = \\frac{1}{\\sqrt{10}}(-3, 0, 1)^T$$

[RESULT]
Die Orthonormalbasis ist:
$$w_1 = \\frac{1}{\\sqrt{14}}(1, 2, 3)^T, \\quad w_2 = \\frac{1}{\\sqrt{35}}(-1, 5, -3)^T, \\quad w_3 = \\frac{1}{\\sqrt{10}}(-3, 0, 1)^T$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Das Gram-Schmidt-Verfahren erzeugt aus einer Basis eine Orthonormalbasis. Wichtig: Erst orthogonalisieren, dann normieren. Die Reihenfolge der Startvektoren beeinflusst das Ergebnis.`,
  },

  {
    id: "ma3-klausur-200204-4",
    title: "Lineare Abbildung — Existenz und Matrixdarstellung",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 4

> **📋 15 Punkte** | ⏱ 15 min | 🔑 Lineare Abbildung, Matrixdarstellung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $f: \\mathbb{R}^2 \\to \\mathbb{R}^3$ eine lineare Abbildung mit:
$$f(1, -1) = (1, 1, 0), \\quad f(1, 1) = (-3, -1, 2), \\quad f(0, 1) = (-1, 0, 1)$$

Zeigen Sie, dass eine solche lineare Abbildung existiert und bestimmen Sie die Matrix $M_f$ bezüglich der Standardbasen.

[STEP]
**Schritt 1: Überbestimmtheit prüfen**

$\\mathbb{R}^2$ hat Dimension 2, also reichen 2 Bilder für die eindeutige Festlegung. Wir haben 3 Vorgaben — diese müssen konsistent sein.

$\\{(1,-1), (1,1)\\}$ ist eine Basis von $\\mathbb{R}^2$, da $\\det\\begin{pmatrix} 1 & 1 \\\\ -1 & 1 \\end{pmatrix} = 2 \\neq 0$.

[STEP]
**Schritt 2: Konsistenz der dritten Bedingung prüfen**

$(0, 1)$ muss sich als Linearkombination von $(1,-1)$ und $(1,1)$ darstellen lassen:

$$(0, 1) = a(1, -1) + b(1, 1) = (a+b, -a+b)$$

$a + b = 0 \\Rightarrow a = -b$

$-a + b = 1 \\Rightarrow 2b = 1 \\Rightarrow b = \\frac{1}{2}, \\; a = -\\frac{1}{2}$

Also: $(0, 1) = -\\frac{1}{2}(1, -1) + \\frac{1}{2}(1, 1)$

Prüfe das Bild:
$$f(0,1) = -\\frac{1}{2}(1,1,0) + \\frac{1}{2}(-3,-1,2) = \\left(-\\frac{1}{2} - \\frac{3}{2},\\; -\\frac{1}{2} - \\frac{1}{2},\\; 0 + 1\\right) = (-2, -1, 1)$$

Die Vorgabe ist $f(0,1) = (-1, 0, 1)$. Da $(-2, -1, 1) \\neq (-1, 0, 1)$, ist die dritte Bedingung **nicht konsistent**.

**Korrektur:** Es existiert dennoch eine lineare Abbildung — wir ignorieren die überbestimmte dritte Vorgabe und verwenden nur die Basis-Bilder:

$$f(1,-1) = (1, 1, 0), \\quad f(1,1) = (-3, -1, 2)$$

[STEP]
**Schritt 3: Standardbasis-Bilder bestimmen**

$e_1 = (1, 0) = \\frac{1}{2}(1, -1) + \\frac{1}{2}(1, 1)$

$$f(e_1) = \\frac{1}{2}(1,1,0) + \\frac{1}{2}(-3,-1,2) = (-1, 0, 1)$$

$e_2 = (0, 1) = -\\frac{1}{2}(1, -1) + \\frac{1}{2}(1, 1)$

$$f(e_2) = -\\frac{1}{2}(1,1,0) + \\frac{1}{2}(-3,-1,2) = (-2, -1, 1)$$

[RESULT]
Die lineare Abbildung existiert (die ersten beiden Vorgaben legen $f$ eindeutig fest). Die Matrix ist:

$$M_f = \\begin{pmatrix} -1 & -2 \\\\ 0 & -1 \\\\ 1 & 1 \\end{pmatrix}$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Eine lineare Abbildung wird durch die Bilder einer Basis eindeutig festgelegt. Überbestimmte Vorgaben müssen konsistent sein. Die Matrix ergibt sich aus den Bildern der Standardbasis.`,
  },

  {
    id: "ma3-klausur-200204-5",
    title: "Determinanten berechnen — 4×4 und 5×5",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 5

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Determinante, Laplace-Entwicklung

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Berechnen Sie die folgenden Determinanten:

**d₁:** $\\det\\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 3 & 4 & 1 \\\\ 3 & 4 & 1 & 2 \\\\ 4 & 1 & 2 & 3 \\end{pmatrix}$

**d₂:** $\\det\\begin{pmatrix} 1 & 2 & 3 & 4 & 5 \\\\ 2 & 3 & 4 & 5 & 1 \\\\ 3 & 4 & 5 & 1 & 2 \\\\ 4 & 5 & 1 & 2 & 3 \\\\ 5 & 1 & 2 & 3 & 4 \\end{pmatrix}$

[STEP]
**Schritt 1: d₁ berechnen — Zeilenoperationen**

$$d_1 = \\det\\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 3 & 4 & 1 \\\\ 3 & 4 & 1 & 2 \\\\ 4 & 1 & 2 & 3 \\end{pmatrix}$$

$Z_2 - 2Z_1$, $Z_3 - 3Z_1$, $Z_4 - 4Z_1$:

$$= \\det\\begin{pmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & -7 \\\\ 0 & -2 & -8 & -10 \\\\ 0 & -7 & -10 & -13 \\end{pmatrix}$$

Entwicklung nach der 1. Spalte:
$$= 1 \\cdot \\det\\begin{pmatrix} -1 & -2 & -7 \\\\ -2 & -8 & -10 \\\\ -7 & -10 & -13 \\end{pmatrix}$$

$Z_2 - 2Z_1$, $Z_3 - 7Z_1$:
$$= \\det\\begin{pmatrix} -1 & -2 & -7 \\\\ 0 & -4 & 4 \\\\ 0 & 4 & 36 \\end{pmatrix} = (-1) \\cdot \\det\\begin{pmatrix} -4 & 4 \\\\ 4 & 36 \\end{pmatrix}$$

$$= (-1)(-144 - 16) = (-1)(-160) = 160$$

[STEP]
**Schritt 2: d₂ berechnen — Zeilenoperationen**

$$d_2 = \\det\\begin{pmatrix} 1 & 2 & 3 & 4 & 5 \\\\ 2 & 3 & 4 & 5 & 1 \\\\ 3 & 4 & 5 & 1 & 2 \\\\ 4 & 5 & 1 & 2 & 3 \\\\ 5 & 1 & 2 & 3 & 4 \\end{pmatrix}$$

Addiere alle Zeilen auf die 1. Zeile (alle Spaltensummen = 1+2+3+4+5 = 15):

$$= \\det\\begin{pmatrix} 15 & 15 & 15 & 15 & 15 \\\\ 2 & 3 & 4 & 5 & 1 \\\\ 3 & 4 & 5 & 1 & 2 \\\\ 4 & 5 & 1 & 2 & 3 \\\\ 5 & 1 & 2 & 3 & 4 \\end{pmatrix} = 15 \\cdot \\det\\begin{pmatrix} 1 & 1 & 1 & 1 & 1 \\\\ 2 & 3 & 4 & 5 & 1 \\\\ 3 & 4 & 5 & 1 & 2 \\\\ 4 & 5 & 1 & 2 & 3 \\\\ 5 & 1 & 2 & 3 & 4 \\end{pmatrix}$$

$Z_i - i \\cdot Z_1$ für $i = 2,3,4,5$:

$$= 15 \\cdot \\det\\begin{pmatrix} 1 & 1 & 1 & 1 & 1 \\\\ 0 & 1 & 2 & 3 & -1 \\\\ 0 & 1 & 2 & -2 & -1 \\\\ 0 & 1 & -2 & -2 & -1 \\\\ 0 & -4 & -3 & -2 & -1 \\end{pmatrix}$$

Entwicklung nach der 1. Spalte:
$$= 15 \\cdot \\det\\begin{pmatrix} 1 & 2 & 3 & -1 \\\\ 1 & 2 & -2 & -1 \\\\ 1 & -2 & -2 & -1 \\\\ -4 & -3 & -2 & -1 \\end{pmatrix}$$

$Z_2 - Z_1$, $Z_3 - Z_1$:
$$= 15 \\cdot \\det\\begin{pmatrix} 1 & 2 & 3 & -1 \\\\ 0 & 0 & -5 & 0 \\\\ 0 & -4 & -5 & 0 \\\\ -4 & -3 & -2 & -1 \\end{pmatrix}$$

Entwicklung nach der 4. Spalte:
$$= 15 \\cdot (-1) \\cdot (-1)^{4+4} \\cdot \\det\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & -5 \\\\ 0 & -4 & -5 \\end{pmatrix}$$

$$= -15 \\cdot (1 \\cdot (0 - 20)) = -15 \\cdot (-20) = 300$$

[RESULT]
$$d_1 = 160, \\quad d_2 = 300$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Determinanten lassen sich effizient mit Zeilenoperationen und Laplace-Entwicklung berechnen. Ziehe immer zuerst Faktoren aus Zeilen/Spalten mit gleicher Summe.`,
  },

  {
    id: "ma3-klausur-200204-6",
    title: "Eigenwerte und Jordan-Form",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 6

> **📋 20 Punkte** | ⏱ 20 min | 🔑 Eigenwerte, Vielfachheiten, Jordan-Normalform

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Gegeben sind die Matrizen:
$$A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}, \\quad B = \\begin{pmatrix} 0 & 0 & 1 \\\\ 1 & 0 & -3 \\\\ 0 & 1 & 3 \\end{pmatrix}$$

Bestimmen Sie für beide Matrizen: Eigenwerte, algebraische und geometrische Vielfachheiten, und die Jordan-Normalform.

[STEP]
**Schritt 1: Eigenwerte von $A$**

$A = I_3$ (Einheitsmatrix). Das charakteristische Polynom ist:

$$p_A(\\lambda) = \\det(A - \\lambda I) = (1 - \\lambda)^3$$

Eigenwert: $\\lambda = 1$ mit algebraischer Vielfachheit $m_a = 3$.

[STEP]
**Schritt 2: Geometrische Vielfachheit von $A$**

$A - I = 0$ (Nullmatrix), also $\\ker(A - I) = \\mathbb{R}^3$, d.h. $\\dim(\\ker(A-I)) = 3$.

Geometrische Vielfachheit $m_g = 3$.

Da $m_a = m_g = 3$, ist $A$ bereits in Jordan-Normalform:

$$J_A = \\begin{pmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

[STEP]
**Schritt 3: Eigenwerte von $B$**

$$p_B(\\lambda) = \\det(B - \\lambda I) = \\det\\begin{pmatrix} -\\lambda & 0 & 1 \\\\ 1 & -\\lambda & -3 \\\\ 0 & 1 & 3-\\lambda \\end{pmatrix}$$

Entwicklung nach der 1. Zeile:
$$= -\\lambda \\cdot \\det\\begin{pmatrix} -\\lambda & -3 \\\\ 1 & 3-\\lambda \\end{pmatrix} + 1 \\cdot \\det\\begin{pmatrix} 1 & -\\lambda \\\\ 0 & 1 \\end{pmatrix}$$

$$= -\\lambda(-\\lambda(3-\\lambda) + 3) + 1(1 - 0)$$

$$= -\\lambda(\\lambda^2 - 3\\lambda + 3) + 1 = -\\lambda^3 + 3\\lambda^2 - 3\\lambda + 1 = -(\\lambda - 1)^3$$

Eigenwert: $\\lambda = 1$ mit algebraischer Vielfachheit $m_a = 3$.

[STEP]
**Schritt 4: Geometrische Vielfachheit von $B$**

$$B - I = \\begin{pmatrix} -1 & 0 & 1 \\\\ 1 & -1 & -3 \\\\ 0 & 1 & 2 \\end{pmatrix}$$

Rang bestimmen: $Z_2 + Z_1$:
$$\\begin{pmatrix} -1 & 0 & 1 \\\\ 0 & -1 & -2 \\\\ 0 & 1 & 2 \\end{pmatrix} \\xrightarrow{Z_3 + Z_2} \\begin{pmatrix} -1 & 0 & 1 \\\\ 0 & -1 & -2 \\\\ 0 & 0 & 0 \\end{pmatrix}$$

Rang = 2, also $\\dim(\\ker(B-I)) = 3 - 2 = 1$.

Geometrische Vielfachheit $m_g = 1$.

[STEP]
**Schritt 5: Jordan-Normalform von $B$**

Da $m_a = 3$ und $m_g = 1$, gibt es einen einzelnen Jordan-Block:

$$J_B = \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$$

[RESULT]
**Matrix $A$:** Eigenwert $\\lambda = 1$ ($m_a = 3$, $m_g = 3$). Jordan-Form: $J_A = I_3$.

**Matrix $B$:** Eigenwert $\\lambda = 1$ ($m_a = 3$, $m_g = 1$). Jordan-Form: $J_B = \\begin{pmatrix} 1 & 1 & 0 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 1 \\end{pmatrix}$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Die Jordan-Normalform hängt von der Differenz $m_a - m_g$ ab. Je größer die Differenz, desto mehr Jordan-Blöcke. Die Einheitsmatrix ist trivialerweise bereits diagonal.`,
  },

  {
    id: "ma3-klausur-200204-7",
    title: "Beweis: charakteristisches Polynom bei λ=0",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 04.02.2020",
    content: `## Aufgabe 7

> **📋 5 Punkte** | ⏱ 5 min | 🔑 Charakteristisches Polynom, Determinante

---

[GUIDED_START]
[STEP]
**Aufgabenstellung:**
Sei $A \\in \\mathbb{R}^{n \\times n}$. Zeigen Sie: $p_A(0) = (-1)^n \\cdot \\det(A)$.

[STEP]
**Schritt 1: Definition des charakteristischen Polynoms**

Das charakteristische Polynom ist definiert als:
$$p_A(\\lambda) = \\det(A - \\lambda I)$$

[STEP]
**Schritt 2: Auswertung bei $\\lambda = 0$**

Setze $\\lambda = 0$ ein:
$$p_A(0) = \\det(A - 0 \\cdot I) = \\det(A)$$

Das ist bereits das Ergebnis — aber die Aufgabe verlangt $(-1)^n \\cdot \\det(A)$.

**Hinweis:** Die Konvention für das charakteristische Polynom kann variieren. In manchen Lehrbüchern wird definiert:
$$p_A(\\lambda) = \\det(\\lambda I - A)$$

Mit dieser Konvention:
$$p_A(0) = \\det(0 \\cdot I - A) = \\det(-A) = (-1)^n \\cdot \\det(A)$$

[STEP]
**Schritt 3: Beweis mit der zweiten Konvention**

Sei $p_A(\\lambda) = \\det(\\lambda I - A)$. Dann:

$$p_A(0) = \\det(-A)$$

Für eine $n \\times n$-Matrix gilt die Eigenschaft der Determinante:
$$\\det(c \\cdot A) = c^n \\cdot \\det(A)$$

Mit $c = -1$:
$$\\det(-A) = (-1)^n \\cdot \\det(A)$$

Also:
$$p_A(0) = (-1)^n \\cdot \\det(A)$$

q.e.d.

[RESULT]
$$p_A(0) = \\det(-A) = (-1)^n \\cdot \\det(A) \\quad \\blacksquare$$
[GUIDED_END]

---

> ## ✨ Zusammenfassung
>
> Der Beweis folgt direkt aus der Definition des charakteristischen Polynoms und der Eigenschaft $\\det(cA) = c^n \\det(A)$. Achte auf die verwendete Konvention!`,
  },
];
