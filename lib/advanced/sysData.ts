import { Module } from "../types";

export const advSysModule: Module = {
  id: "adv-sys",
  slug: "adv-sys",
  title: "Signale & Systeme (SyS)",
  description: "Fourier-Transformation, Laplace-Transformation, Übertragungsfunktionen, Zustandsraumdarstellung und Signalverarbeitung",
  icon: "📡",
  color: "#6366F1",
  progress: 0,
  category: "advanced",
  lessons: [
    {
      id: "sys-1",
      title: "Signale & Systeme Grundlagen",
      duration: "30 min",
      type: "text",
      content: `## Signale & Systeme Grundlagen

### Kontinuierliche vs. diskrete Signale

| Eigenschaft | Kontinuierlich $x(t)$ | Diskret $x[n]$ |
|---|---|---|
| Definitionsbereich | $t \\in \\mathbb{R}$ | $n \\in \\mathbb{Z}$ |
| Wertebereich | $\\mathbb{R}$ oder $\\mathbb{C}$ | $\\mathbb{R}$ oder $\\mathbb{C}$ |
| Physikalisches Beispiel | Analogspannung | Abgetastetes Signal |
| Darstellung | Differenzialgleichung | Differenzengleichung |

### Wichtige Grundsignale

**Dirac-Impuls (Stoßfunktion):**
$$\\delta(t) = 0 \\text{ für } t \\neq 0, \\quad \\int_{-\\infty}^{\\infty} \\delta(t) \\, dt = 1$$

**Sprungfunktion:**
$$u(t) = \\begin{cases} 1 & t \\geq 0 \\\\ 0 & t < 0 \\end{cases}$$

**Rechteckfunktion:**
$$\\text{rect}(t) = \\begin{cases} 1 & |t| \\leq \\frac{1}{2} \\\\ 0 & \\text{sonst} \\end{cases}$$

### LTI-Systeme

Ein **lineares, zeitinvariantes (LTI)** System erfüllt:

1. **Linearität:** $\\mathcal{L}\\{a \\cdot x_1(t) + b \\cdot x_2(t)\\} = a \\cdot \\mathcal{L}\\{x_1(t)\\} + b \\cdot \\mathcal{L}\\{x_2(t)\\}$
2. **Zeitinvarianz:** Wenn $x(t) \\to y(t)$, dann $x(t - t_0) \\to y(t - t_0)$

**Faltung:** Die Ausgabe eines LTI-Systems berechnet sich als:
$$y(t) = x(t) * h(t) = \\int_{-\\infty}^{\\infty} x(\\tau) \\cdot h(t - \\tau) \\, d\\tau$$

Diskret:
$$y[n] = x[n] * h[n] = \\sum_{k=-\\infty}^{\\infty} x[k] \\cdot h[n - k]$$

### Kausalität und Stabilität

- **Kausal:** $h(t) = 0$ für $t < 0$ (Ausgang hängt nur von vergangenen Eingängen ab)
- **BIBO-stabil:** $\\int_{-\\infty}^{\\infty} |h(t)| \\, dt < \\infty$ (beschränkter Eingang → beschränkter Ausgang)
`,
    },
    {
      id: "sys-2",
      title: "Fourier-Reihen & Fourier-Transformation",
      duration: "35 min",
      type: "text",
      content: `## Fourier-Reihen & Fourier-Transformation

### Fourier-Reihe (periodische Signale)

Ein periodisches Signal $x(t)$ mit Periode $T_0$ lässt sich darstellen als:

$$x(t) = \\sum_{k=-\\infty}^{\\infty} c_k \\cdot e^{j k \\omega_0 t}$$

mit $\\omega_0 = \\frac{2\\pi}{T_0}$ und den Fourier-Koeffizienten:

$$c_k = \\frac{1}{T_0} \\int_{T_0} x(t) \\cdot e^{-j k \\omega_0 t} \\, dt$$

| Koeffizient | Bedeutung |
|---|---|
| $c_0$ | Gleichanteil (Mittelwert) |
| $c_k$ für $k > 0$ | Positive Frequenzen |
| $c_k$ für $k < 0$ | Negative Frequenzen |
| $|c_k|$ | Amplitudenspektrum |
| $\\arg(c_k)$ | Phasenspektrum |

### Fourier-Transformation (aperiodische Signale)

$$X(f) = \\int_{-\\infty}^{\\infty} x(t) \\cdot e^{-j 2\\pi f t} \\, dt$$

$$x(t) = \\int_{-\\infty}^{\\infty} X(f) \\cdot e^{j 2\\pi f t} \\, df$$

### Wichtige Fourier-Transformationspaare

| Signal $x(t)$ | Fourier-Transformierte $X(f)$ |
|---|---|
| $\\delta(t)$ | $1$ |
| $1$ | $\\delta(f)$ |
| $e^{j 2\\pi f_0 t}$ | $\\delta(f - f_0)$ |
| $\\text{rect}(t)$ | $\\text{sinc}(f)$ |
| $e^{-at} \\cdot u(t)$, $a > 0$ | $\\frac{1}{a + j 2\\pi f}$ |
| $e^{-\\pi t^2}$ | $e^{-\\pi f^2}$ |

### Eigenschaften der Fourier-Transformation

| Eigenschaft | Zeitbereich | Frequenzbereich |
|---|---|---|
| Linearität | $a x_1(t) + b x_2(t)$ | $a X_1(f) + b X_2(f)$ |
| Zeitverschiebung | $x(t - t_0)$ | $X(f) e^{-j 2\\pi f t_0}$ |
| Frequenzverschiebung | $x(t) e^{j 2\\pi f_0 t}$ | $X(f - f_0)$ |
| Faltung | $x_1(t) * x_2(t)$ | $X_1(f) \\cdot X_2(f)$ |
| Multiplikation | $x_1(t) \\cdot x_2(t)$ | $X_1(f) * X_2(f)$ |
| Skalierung | $x(at)$ | $\\frac{1}{|a|} X\\left(\\frac{f}{a}\\right)$ |

### Diskrete Fourier-Transformation (DFT)

$$X[k] = \\sum_{n=0}^{N-1} x[n] \\cdot e^{-j \\frac{2\\pi}{N} k n}, \\quad k = 0, 1, \\ldots, N-1$$

**FFT (Fast Fourier Transform):** Algorithmus zur effizienten Berechnung der DFT mit $O(N \\log N)$ statt $O(N^2)$.

> **Nyquist-Theorem:** Die Abtastfrequenz muss mindestens das Doppelte der höchsten Signalfrequenz betragen: $f_s \\geq 2 f_{\\max}$
`,
    },
    {
      id: "sys-3",
      title: "Laplace-Transformation",
      duration: "35 min",
      type: "text",
      content: `## Laplace-Transformation

### Definition

Die Laplace-Transformation einer Funktion $x(t)$ ist:

$$X(s) = \\mathcal{L}\\{x(t)\\} = \\int_{0}^{\\infty} x(t) \\cdot e^{-st} \\, dt$$

wobei $s = \\sigma + j\\omega$ eine komplexe Variable ist.

### Konvergenz

Das Konvergenzgebiet (ROC = Region of Convergence) ist die Menge aller $s$, für die das Integral existiert.

| Signal | Laplace-Transformierte | ROC |
|---|---|---|
| $\\delta(t)$ | $1$ | Ganzes $s$-Feld |
| $u(t)$ | $\\frac{1}{s}$ | $\\text{Re}(s) > 0$ |
| $e^{-at} u(t)$ | $\\frac{1}{s+a}$ | $\\text{Re}(s) > -a$ |
| $t \\cdot u(t)$ | $\\frac{1}{s^2}$ | $\\text{Re}(s) > 0$ |
| $\\cos(\\omega t) u(t)$ | $\\frac{s}{s^2 + \\omega^2}$ | $\\text{Re}(s) > 0$ |
| $\\sin(\\omega t) u(t)$ | $\\frac{\\omega}{s^2 + \\omega^2}$ | $\\text{Re}(s) > 0$ |

### Eigenschaften

| Eigenschaft | Zeitbereich | $s$-Bereich |
|---|---|---|
| Linearität | $a x_1(t) + b x_2(t)$ | $a X_1(s) + b X_2(s)$ |
| Differentiation | $\\frac{dx(t)}{dt}$ | $s X(s) - x(0^-)$ |
| Integration | $\\int_0^t x(\\tau) d\\tau$ | $\\frac{X(s)}{s}$ |
| Verschiebung | $x(t - t_0) u(t - t_0)$ | $e^{-s t_0} X(s)$ |
| Faltung | $x_1(t) * x_2(t)$ | $X_1(s) \\cdot X_2(s)$ |
| Anfangswertsatz | $\\lim_{t \\to 0} x(t)$ | $\\lim_{s \\to \\infty} s X(s)$ |
| Endwertsatz | $\\lim_{t \\to \\infty} x(t)$ | $\\lim_{s \\to 0} s X(s)$ |

### Inverse Laplace-Transformation

$$x(t) = \\mathcal{L}^{-1}\\{X(s)\\} = \\frac{1}{2\\pi j} \\int_{\\sigma - j\\infty}^{\\sigma + j\\infty} X(s) e^{st} \\, ds$$

Praktisch wird meist die **Partialbruchzerlegung** verwendet:

$$X(s) = \\frac{N(s)}{(s + p_1)(s + p_2) \\cdots (s + p_n)} = \\sum_{i=1}^{n} \\frac{A_i}{s + p_i}$$

### Lösung von DGLs mit Laplace

**Schritt-für-Schritt:**
1. Laplace-Transformation der DGL
2. Algebraische Gleichung nach $X(s)$ auflösen
3. Partialbruchzerlegung
4. Inverse Laplace-Transformation

**Beispiel:** $\\ddot{y}(t) + 3\\dot{y}(t) + 2y(t) = u(t)$, $y(0) = 0$, $\\dot{y}(0) = 0$

$$s^2 Y(s) + 3s Y(s) + 2 Y(s) = \\frac{1}{s}$$
$$Y(s) = \\frac{1}{s(s+1)(s+2)} = \\frac{1/2}{s} - \\frac{1}{s+1} + \\frac{1/2}{s+2}$$
$$y(t) = \\left(\\frac{1}{2} - e^{-t} + \\frac{1}{2} e^{-2t}\\right) u(t)$$
`,
    },
    {
      id: "sys-4",
      title: "Übertragungsfunktionen",
      duration: "30 min",
      type: "text",
      content: `## Übertragungsfunktionen

### Definition

Die Übertragungsfunktion eines LTI-Systems ist das Verhältnis der Ausgangs- zur Eingangstransformierten:

$$H(s) = \\frac{Y(s)}{X(s)} = \\\\frac{b_m s^m + b_{m-1} s^{m-1} + \\cdots + b_0}{a_n s^n + a_{n-1} s^{n-1} + \\cdots + a_0}$$

**Pol-Nullstellen-Darstellung:**
$$H(s) = K \\cdot \\frac{(s - z_1)(s - z_2) \\cdots (s - z_m)}{(s - p_1)(s - p_2) \\cdots (s - p_n)}$$

- **$z_i$:** Nullstellen (Zähler)
- **$p_i$:** Pole (Nenner)
- **$K$:** Verstärkungsfaktor

### Stabilität

Ein System ist **stabil**, wenn alle Pole in der **linken Halbebene** liegen:

$$\\text{Re}(p_i) < 0 \\quad \\forall i$$

| Pollage | Systemverhalten |
|---|---|
| $\\text{Re}(p) < 0$ | Stabil, exponentiell abklingend |
| $\\text{Re}(p) = 0$ | Grenzstabil, schwingt konstant |
| $\\text{Re}(p) > 0$ | Instabil, exponentiell wachsend |
| Komplexer Pol | Schwingungsanteil $e^{\\sigma t} \\cos(\\omega t)$ |

### Frequenzgang

Setzt man $s = j\\omega$ in die Übertragungsfunktion ein, erhält man den **Frequenzgang**:

$$H(j\\omega) = |H(j\\omega)| \\cdot e^{j \\varphi(\\omega)}$$

### Bode-Diagramm

Das Bode-Diagramm besteht aus zwei Teilen:

1. **Amplitudengang:** $20 \\log_{10} |H(j\\omega)|$ in dB über $\\log(\\omega)$
2. **Phasengang:** $\\varphi(\\omega)$ in Grad über $\\log(\\omega)$

**Asymptotische Approximation:**

| Faktor | Amplitude (dB/Dekade) | Phase |
|---|---|---|
| Verstärkung $K$ | $20\\log_{10}(K)$ (konstant) | $0°$ |
| Pol bei $\\omega_0$ | $-20$ dB/Dekade ab $\\omega_0$ | $0° \\to -90°$ |
| Nullstelle bei $\\omega_0$ | $+20$ dB/Dekade ab $\\omega_0$ | $0° \\to +90°$ |
| Integrator $1/s$ | $-20$ dB/Dekade | $-90°$ |

### Beispiele

**PT1-Glied (Tiefpass 1. Ordnung):**
$$H(s) = \\frac{1}{1 + sT}$$
- Pol bei $s = -\\frac{1}{T}$
- Grenzfrequenz: $\\omega_G = \\frac{1}{T}$

**PT2-Glied (Tiefpass 2. Ordnung):**
$$H(s) = \\frac{\\omega_0^2}{s^2 + 2D\\omega_0 s + \\omega_0^2}$$
- $D < 1$: Untergedämpft (schwingend)
- $D = 1$: Kritisch gedämpft
- $D > 1$: Übergerämpft
`,
    },
    {
      id: "sys-5",
      title: "Zustandsraumdarstellung",
      duration: "30 min",
      type: "text",
      content: `## Zustandsraumdarstellung

### Grundkonzept

Die Zustandsraumdarstellung beschreibt ein System durch **Zustandsvariablen** statt durch Eingangs-Ausgangs-Beziehungen.

**Zustandsgleichung:**
$$\\dot{\\mathbf{x}}(t) = A \\mathbf{x}(t) + B \\mathbf{u}(t)$$

**Ausgangsgleichung:**
$$\\mathbf{y}(t) = C \\mathbf{x}(t) + D \\mathbf{u}(t)$$

| Matrix | Dimension | Bedeutung |
|---|---|---|
| $A$ | $n \\times n$ | Systemmatrix (Zustandsmatrix) |
| $B$ | $n \\times m$ | Eingangsmatrix (Stellmatrix) |
| $C$ | $p \\times n$ | Ausgangsmatrix (Beobachtungsmatrix) |
| $D$ | $p \\times m$ | Durchschleifmatrix |

### Beispiel: Feder-Dämpfer-Masse-System

$$m \\ddot{x} + d \\dot{x} + c x = F(t)$$

Zustandsvariablen: $x_1 = x$, $x_2 = \\dot{x}$

$$\\begin{pmatrix} \\dot{x}_1 \\\\ \\dot{x}_2 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ -\\frac{c}{m} & -\\frac{d}{m} \\end{pmatrix} \\begin{pmatrix} x_1 \\\\ x_2 \\end{pmatrix} + \\begin{pmatrix} 0 \\\\ \\frac{1}{m} \\end{pmatrix} F$$

### Überführung in die Zustandsraumdarstellung

Aus der Übertragungsfunktion:
$$H(s) = \\frac{b_m s^m + \\cdots + b_0}{s^n + a_{n-1} s^{n-1} + \\cdots + a_0}$$

**Regelungsnormalform (companion form):**
$$A = \\begin{pmatrix} 0 & 1 & 0 & \\cdots & 0 \\\\ 0 & 0 & 1 & \\cdots & 0 \\\\ \\vdots & & & \\ddots & \\vdots \\\\ 0 & 0 & 0 & \\cdots & 1 \\\\ -a_0 & -a_1 & -a_2 & \\cdots & -a_{n-1} \\end{pmatrix}$$

### Eigenwerte und Stabilität

Die **Eigenwerte** von $A$ entsprechen den **Polen** der Übertragungsfunktion:

$$\\det(sI - A) = 0$$

- System ist stabil, wenn alle Eigenwerte von $A$ negative Realteile haben
- Eigenwerte sind unveränderlich unter Zustandstransformation

### Steuerbarkeit und Beobachtbarkeit

**Steuerbarkeitsmatrix:**
$$\\mathcal{S} = \\begin{pmatrix} B & AB & A^2B & \\cdots & A^{n-1}B \\end{pmatrix}$$

Das System ist **vollständig steuerbar**, wenn $\\text{rang}(\\mathcal{S}) = n$.

**Beobachtbarkeitsmatrix:**
$$\\mathcal{O} = \\begin{pmatrix} C \\\\ CA \\\\ CA^2 \\\\ \\vdots \\\\ CA^{n-1} \\end{pmatrix}$$

Das System ist **vollständig beobachtbar**, wenn $\\text{rang}(\\mathcal{O}) = n$.

### Diskrete Zustandsraumdarstellung

$$\\mathbf{x}[k+1] = A_d \\mathbf{x}[k] + B_d \\mathbf{u}[k]$$
$$\\mathbf{y}[k] = C_d \\mathbf{x}[k] + D_d \\mathbf{u}[k]$$

Diskretisierung: $A_d = e^{A T}$, $B_d = \\int_0^T e^{A\\tau} B \\, d\\tau$
`,
    },
    {
      id: "sys-klausur",
      title: "Probeklausur Signale & Systeme",
      duration: "45 min",
      type: "quiz",
      examMode: true,
      content: `## Probeklausur: Signale & Systeme

### Frage 1
Was ist die Faltung im Zeitbereich im Frequenzbereich?

A) Addition der Fourier-Transformierten
B) Multiplikation der Fourier-Transformierten
C) Division der Fourier-Transformierten
D) Subtraktion der Fourier-Transformierten

Richtig: **B.** Die Faltung zweier Signale im Zeitbereich entspricht der Multiplikation ihrer Fourier-Transformierten: $x_1(t) * x_2(t) \\leftrightarrow X_1(f) \\cdot X_2(f)$.

---

### Frage 2
Ein LTI-System hat die Übertragungsfunktion $H(s) = \\frac{5}{s+3}$. Wo liegt der Pol?

A) Bei $s = 3$
B) Bei $s = -3$
C) Bei $s = 5$
D) Bei $s = -5$

Richtig: **B.** Der Pol ist die Nullstelle des Nenners: $s + 3 = 0 \\Rightarrow s = -3$.

---

### Frage 3
Welche Abtastfrequenz wird für ein Signal mit $f_{\\max} = 4\\text{ kHz}$ benötigt?

A) 4 kHz
B) 6 kHz
C) 8 kHz
D) 16 kHz

Richtig: **C.** Nach dem Nyquist-Theorem: $f_s \\geq 2 f_{\\max} = 2 \\cdot 4\\text{ kHz} = 8\\text{ kHz}$.

---

### Frage 4
Was bedeutet BIBO-Stabilität?

A) Das System hat nur Pole in der rechten Halbebene
B) Beschränkter Eingang führt zu beschränktem Ausgang
C) Das System oszilliert immer
D) Die Übertragungsfunktion hat keine Nullstellen

Richtig: **B.** BIBO (Bounded Input, Bounded Output) bedeutet, dass jeder beschränkte Eingang zu einem beschränkten Ausgang führt. Äquivalent: $\\int |h(t)| dt < \\infty$.

---

### Frage 5
Die Laplace-Transformierte von $e^{-2t} u(t)$ ist:

A) $\\frac{1}{s-2}$
B) $\\frac{1}{s+2}$
C) $\\frac{2}{s+1}$
D) $\\frac{s}{s+2}$

Richtig: **B.** $\\mathcal{L}\\{e^{-at} u(t)\\} = \\frac{1}{s+a}$, also für $a=2$: $\\frac{1}{s+2}$.

---

### Frage 6
Ein PT1-Glied mit $T = 0{,}1\\text{ s}$ hat die Grenzfrequenz:

A) $1\\text{ rad/s}$
B) $10\\text{ rad/s}$
C) $0{,}1\\text{ rad/s}$
D) $100\\text{ rad/s}$

Richtig: **B.** Die Grenzfrequenz eines PT1-Glieds ist $\\omega_G = \\frac{1}{T} = \\frac{1}{0{,}1} = 10\\text{ rad/s}$.

---

### Frage 7
In der Zustandsraumdarstellung hat die Systemmatrix $A$ die Dimension:

A) $m \\times n$
B) $n \\times n$
C) $p \\times n$
D) $n \\times m$

Richtig: **B.** Die Systemmatrix $A$ ist quadratisch mit Dimension $n \\times n$, wobei $n$ die Anzahl der Zustandsvariablen ist.

---

### Frage 8
Die DFT einer Folge der Länge $N$ hat:

A) $N/2$ Werte
B) $2N$ Werte
C) $N$ Werte
D) $N^2$ Werte

Richtig: **C.** Die DFT einer Folge der Länge $N$ produziert $N$ Spektralwerte $X[k]$ für $k = 0, 1, \\ldots, N-1$.

---

### Frage 9
Welche Aussage über die Fourier-Reihe ist korrekt?

A) Sie gilt nur für aperiodische Signale
B) Die Koeffizienten $c_k$ sind immer reell
C) Sie stellt ein periodisches Signal als Summe von Sinus und Cosinus dar
D) Sie benötigt immer unendlich viele Terme

Richtig: **C.** Die Fourier-Reihe zerlegt ein periodisches Signal in eine Summe von harmonischen Schwingungen (Sinus/Cosinus bzw. komplexen Exponentialfunktionen).

---

### Frage 10
Ein System ist vollständig steuerbar, wenn:

A) Alle Eigenwerte positiv sind
B) Die Steuerbarkeitsmatrix vollen Rang hat
C) Die Ausgangsmatrix $C = I$ ist
D) Die Durchschleifmatrix $D = 0$ ist

Richtig: **B.** Vollständige Steuerbarkeit liegt vor, wenn $\\text{rang}(\\mathcal{S}) = n$, wobei $\\mathcal{S} = \\begin{pmatrix} B & AB & \\cdots & A^{n-1}B \\end{pmatrix}$.
`,
    },
  ],
};
