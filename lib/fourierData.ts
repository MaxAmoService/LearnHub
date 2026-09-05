import { Module, QuizQuestion } from "./types";
import { Exercise } from "./mathExercises";
import { createExerciseLessons } from "./lessonHelpers";

export const fourierModule: Module = {
  id: "m-fourier",
  slug: "mathe-fourier",
  title: "Fourieranalyse",
  description: "Fourier-Reihen, Fourier-Transformation und Frequenzanalyse",
  icon: "🌊",
  color: "#8b5cf6",
  category: "analysis",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Fourieranalyse
### Fourier-Reihe (periodische Funktionen)
$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left(a_n \\cos(nx) + b_n \\sin(nx)\\right)$$

### Koeffizienten
$$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\, dx$$
$$a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) \\, dx$$
$$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx$$

### Fourier-Transformation
$$\\hat{f}(\\omega) = \\int_{-\\infty}^{\\infty} f(t) \\, e^{-i\\omega t} \\, dt$$

### Orthogonalität
$\\int_{-\\pi}^{\\pi} \\cos(mx) \\cos(nx) \\, dx = 0$ für $m \\neq n$`,
  lessons: [
    {
      id: "m-four-1",
      title: "Fourier-Reihen",
      duration: "18 min",
      type: "text",
      content: `## Die Idee der Fourier-Reihe

> 🎬 **But what is a Fourier series?** — https://www.youtube.com/watch?v=spUNpyFgFk — 3Blue1Brown zeigt visuell, wie Kreise beliegige Kurven zeichnen können. Pflichtvideo!

Jean-Baptiste Joseph Fourier entdeckte 1807 eine bahnbrechende Idee:

> **Jede periodische Funktion kann als Summe von Sinus- und Kosinus-Funktionen dargestellt werden!**

Das bedeutet: Selbst eine eckige Kurve oder eine Sägezahnkurve lässt sich aus glatten Wellen zusammensetzen.

---

## Die Fourier-Reihe

Für eine $2\\pi$-periodische Funktion $f(x)$ gilt:

$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} \\left(a_n \\cos(nx) + b_n \\sin(nx)\\right)$$

Die **Koeffizienten** berechnen sich durch Integration:

$$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\, dx$$

$$a_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\cos(nx) \\, dx$$

$$b_n = \\frac{1}{\\pi} \\int_{-\\pi}^{\\pi} f(x) \\sin(nx) \\, dx$$

---

## Beispiel: Rechteckfunktion

Die **Rechteckfunktion** (Square Wave) hat die Fourier-Reihe:

$$f(x) = \\frac{4}{\\pi} \\left(\\sin(x) + \\frac{\\sin(3x)}{3} + \\frac{\\sin(5x)}{5} + \\cdots\\right)$$

> 💡 **Faszinierend:** Je mehr Terme man addiert, desto näher kommt man an die eckige Form heran!

---

## Orthogonalität

Die Sinus- und Kosinus-Funktionen sind **orthogonal**:

$$\\int_{-\\pi}^{\\pi} \\cos(mx) \\cos(nx) \\, dx = \\begin{cases} 0 & \\text{wenn } m \\neq n \\\\ \\pi & \\text{wenn } m = n \\neq 0 \\end{cases}$$

Diese Eigenschaft macht die Berechnung der Koeffizienten erst möglich!`,
    },
    {
      id: "m-four-2",
      title: "Fourier-Transformation",
      duration: "18 min",
      type: "text",
      content: `## Von der Reihe zur Transformation

Die **Fourier-Transformation** erweitert die Fourier-Reihe auf **nicht-periodische** Funktionen.

Statt diskreter Frequenzen ($n = 1, 2, 3, ...$) erhalten wir ein **kontinuierliches Frequenzspektrum**.

---

## Die Fourier-Transformation

$$\\hat{f}(\\omega) = \\int_{-\\infty}^{\\infty} f(t) \\, e^{-i\\omega t} \\, dt$$

Die **Inverse Transformation** zurück:

$$f(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} \\hat{f}(\\omega) \\, e^{i\\omega t} \\, d\\omega$$

---

## Interpretation

| Zeitbereich | Frequenzbereich |
|-------------|-----------------|
| $f(t)$ — Signal über die Zeit | $\\hat{f}(\\omega)$ — Spektrum über Frequenzen |
| „Wie sieht das Signal aus?" | „Welche Frequenzen sind enthalten?" |

---

## Beispiel: Gauß-Glocke

Die Gauß-Funktion $f(t) = e^{-t^2}$ hat als Fourier-Transformierte wieder eine Gauß-Funktion:

$$\\hat{f}(\\omega) = \\sqrt{\\pi} \\, e^{-\\omega^2/4}$$

> 💡 **Eigenschaft:** Je schmaler das Signal im Zeitbereich, desto breiter im Frequenzbereich — und umgekehrt!`,
    },
    {
      id: "m-four-3",
      title: "Anwendungen der Fourieranalyse",
      duration: "15 min",
      type: "text",
      content: `## Anwendungen im Alltag

Die Fourieranalyse ist eine der meistverwendeten mathematischen Methoden in der Praxis!

---

### 🎵 Musik & Akustik

Jeder Ton besteht aus einer **Grundfrequenz** und **Obertönen** (Harmonische).

- Eine Gitarre und eine Flöte spielen den gleichen Ton (gleiche Grundfrequenz)
- Aber sie klingen unterschiedlich — wegen der verschiedenen Obertöne!
- Equalizer in Musik-Apps nutzen Fourier-Transformation

---

### 📡 Signalverarbeitung

- **Handys:** Digitale Signale werden im Frequenzbereich gefiltert
- **Rauschunterdrückung:** Störfrequenzen werden entfernt
- **Kompression:** MP3 nutzt Fourier, um unwichtige Frequenzen wegzulassen

---

### 🖼️ Bildverarbeitung

- **JPEG-Kompression:** Bilder werden im Frequenzbereich komprimiert
- **Bildfilter:** Unscharf/Scharf durch Frequenzfilterung
- **CT & MRT:** Medizinische Bilder werden durch Fourier-Rekonstruktion erzeugt

---

### ⚡ Schnelle Fourier-Transformation (FFT)

Die **FFT** (Fast Fourier Transform) ist ein Algorithmus, der die Fourier-Transformation extrem schnell berechnet:

- Ohne FFT: $O(n^2)$ Operationen
- Mit FFT: $O(n \\log n)$ Operationen

> 🏠 **Fürs Erweitert:** Die FFT ist einer der wichtigsten Algorithmen der digitalen Signalverarbeitung!`,
    },
    ...createExerciseLessons("m-fourier", "Fourieranalyse", {
      easy: `Fourier-Koeffizienten berechnen. Grundfrequenzen und Obertöne erkennen.`,
      medium: `Fourier-Reihen aufstellen, orthogonale Eigenschaften nutzen. Symmetrien ausnutzen.`,
      hard: `Fourier-Transformation anwenden, FFT-Komplexität, Anwendungsaufgaben.`,
    }),
  ],
};

export const fourierQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-fourier": [
    { question: "Was besagt das Fourier-Theorem?", type: "multiple", options: ["Jede Funktion ist linear", "Jede periodische Funktion ist als Summe von Sinus/Kosinus darstellbar", "Nur Sinus-Funktionen sind periodisch", "Fourier-Reihen konvergieren nie"], correct: 1, explanation: "Fourier entdeckte, dass periodische Funktionen aus Sinus- und Kosinus-Termen zusammengesetzt werden können." },
    { question: "Was ist $a_0$ in der Fourier-Reihe?", type: "multiple", options: ["Der maximale Wert", "Der Mittelwert der Funktion", "Die Frequenz", "Die Amplitude"], correct: 1, explanation: "$a_0/2$ ist der Mittelwert (DC-Anteil) der Funktion über eine Periode." },
    { question: "Welche Eigenschaft macht die Fourier-Analyse möglich?", type: "multiple", options: ["Symmetrie", "Orthogonalität von Sinus/Kosinus", "Linearität", "Periodizität"], correct: 1, explanation: "Die Orthogonalität der trigonometrischen Funktionen ermöglicht die Berechnung der Koeffizienten." },
    { question: "Was macht die Fourier-Transformation?", type: "multiple", options: ["Funktionen ableiten", "Signale ins Frequenzspektrum umwandeln", "Gleichungen lösen", "Matrizen invertieren"], correct: 1, explanation: "Die Transformation wandelt ein Signal vom Zeitbereich in den Frequenzbereich um." },
    { question: "Wie heißt der schnelle Algorithmus für die Fourier-Transformation?", type: "multiple", options: ["DFT", "FFT", "DCT", "DWT"], correct: 1, explanation: "FFT = Fast Fourier Transform, Komplexität $O(n \\log n)$ statt $O(n^2)$." },
    { question: "Was ist die Komplexität der FFT?", type: "multiple", options: ["$O(n)$", "$O(n^2)$", "$O(n \\log n)$", "$O(\\log n)$"], correct: 2, explanation: "Die FFT benötigt $O(n \\log n)$ Operationen." },
    { question: "Welche Frequenzen hat eine Rechteckfunktion?", type: "multiple", options: ["Nur Grundfrequenz", "Alle geraden Harmonischen", "Alle ungeraden Harmonischen", "Alle Frequenzen"], correct: 2, explanation: "Die Rechteckfunktion enthält nur ungerade Harmonische: $\\sin(x), \\sin(3x)/3, \\sin(5x)/5, ...$" },
    { question: "Was passiert mit dem Spektrum, wenn das Signal schmaler wird?", type: "multiple", options: ["Es wird auch schmaler", "Es wird breiter", "Es bleibt gleich", "Es verschwindet"], correct: 1, explanation: "Unschärferelation: Schmales Signal → breites Spektrum und umgekehrt." },
    { question: "Welches Format nutzt Fourier für Bildkompression?", type: "multiple", options: ["PNG", "GIF", "JPEG", "BMP"], correct: 2, explanation: "JPEG nutzt eine Variante der Fourier-Transformation (DCT) für die Kompression." },
    { question: "Was ist $\\hat{f}(\\omega)$?", type: "multiple", options: ["Die Ableitung", "Die Stammfunktion", "Die Fourier-Transformierte", "Die Umkehrfunktion"], correct: 2, explanation: "$\\hat{f}(\\omega)$ bezeichnet die Fourier-Transformierte von $f(t)$." },
  ],
};

export const fourierPractice: Exercise[] = [
  { id: "four-1", lessonId: "m-fourier", difficulty: 1, type: "multiple", question: "Wie viele Sinus-Terme braucht man für eine exakte Rechteckfunktion?", options: [{ label: "1", value: "a" }, { label: "3", value: "b" }, { label: "Endlich viele", value: "c" }, { label: "Unendlich viele", value: "d" }], correctOption: "d", solution: "Die Fourier-Reihe einer Rechteckfunktion hat unendlich viele Terme." },
  { id: "four-2", lessonId: "m-fourier", difficulty: 1, type: "multiple", question: "Was ist die Grundfrequenz einer Funktion mit Periode $T$?", options: [{ label: "$f = T$", value: "a" }, { label: "$f = 1/T$", value: "b" }, { label: "$f = 2\\pi T$", value: "c" }, { label: "$f = T/2\\pi$", value: "d" }], correctOption: "b", solution: "Die Grundfrequenz ist $f = 1/T$." },
  { id: "four-3", lessonId: "m-fourier", difficulty: 1, type: "multiple", question: "Welche Fourier-Koeffizienten hat eine gerade Funktion?", options: [{ label: "Nur $a_n$", value: "a" }, { label: "Nur $b_n$", value: "b" }, { label: "Beide", value: "c" }, { label: "Keine", value: "d" }], correctOption: "a", solution: "Gerade Funktionen haben nur Kosinus-Terme ($a_n$), da Kosinus gerade ist." },
  { id: "four-4", lessonId: "m-fourier", difficulty: 2, type: "input", question: "Wie heißt die Periode der Funktion $f(x) = \\sin(3x)$?", hint: "$T = 2\\pi/n$.", expectedAnswer: "2pi/3", tolerance: 0.01, format: "Bruch mit pi", solution: "$T = \\frac{2\\pi}{3}$" },
  { id: "four-5", lessonId: "m-fourier", difficulty: 2, type: "multiple", question: "Was bedeutet Orthogonalität bei Sinus/Kosinus?", options: [{ label: "Sie sind senkrecht zueinander", value: "a" }, { label: "Ihr Integral über eine Periode ist 0", value: "b" }, { label: "Sie haben gleiche Amplitude", value: "c" }, { label: "Sie sind identisch", value: "d" }], correctOption: "b", solution: "Orthogonal bedeutet: $\\int_{-\\pi}^{\\pi} \\cos(mx)\\cos(nx)dx = 0$ für $m \\neq n$." },
  { id: "four-6", lessonId: "m-fourier", difficulty: 2, type: "multiple", question: "Welche Komplexität hat die naive DFT?", options: [{ label: "$O(n)$", value: "a" }, { label: "$O(n \\log n)$", value: "b" }, { label: "$O(n^2)$", value: "c" }, { label: "$O(2^n)$", value: "d" }], correctOption: "c", solution: "Die naive DFT hat $O(n^2)$, die FFT verbessert auf $O(n \\log n)$." },
  { id: "four-7", lessonId: "m-fourier", difficulty: 3, type: "multiple", question: "Was nutzt MP3 zur Kompression?", options: [{ label: "Fourier-Transformation", value: "a" }, { label: "Mittelwertbildung", value: "b" }, { label: "Rundung", value: "c" }, { label: "Sortierung", value: "d" }], correctOption: "a", solution: "MP3 nutzt eine Variante der Fourier-Transformation (MDCT), um unwichtige Frequenzen zu entfernen." },
  { id: "four-8", lessonId: "m-fourier", difficulty: 3, type: "multiple", question: "Was passiert bei der inversen Fourier-Transformation?", options: [{ label: "Zeit → Frequenz", value: "a" }, { label: "Frequenz → Zeit", value: "b" }, { label: "Amplitude → Phase", value: "c" }, { label: "Phase → Amplitude", value: "d" }], correctOption: "b", solution: "Die inverse Transformation geht vom Frequenzbereich zurück in den Zeitbereich." },
  { id: "four-9", lessonId: "m-fourier", difficulty: 3, type: "multiple", question: "Welche Anwendung hat Fourier in der Medizin?", options: [{ label: "Blutdruckmessung", value: "a" }, { label: "CT/MRT-Bildrekonstruktion", value: "b" }, { label: "Herzfrequenzmessung", value: "c" }, { label: "Röntgenaufnahmen", value: "d" }], correctOption: "b", solution: "CT und MRT nutzen Fourier-basierte Algorithmen zur Bildrekonstruktion." },
  { id: "four-10", lessonId: "m-fourier", difficulty: 3, type: "multiple", question: "Was ist das Frequenzspektrum?", options: [{ label: "Die maximale Frequenz", value: "a" }, { label: "Die Darstellung aller enthaltenen Frequenzen", value: "b" }, { label: "Die Grundfrequenz", value: "c" }, { label: "Die Phasenverschiebung", value: "d" }], correctOption: "b", solution: "Das Spektrum zeigt, welche Frequenzen mit welcher Amplitude im Signal enthalten sind." },
];

export const fourierExam: Exercise[] = [
  { id: "four-e1", lessonId: "m-fourier", difficulty: 2, type: "multiple", question: "Welche Koeffizienten hat eine ungerade Funktion?", options: [{ label: "Nur $a_n$", value: "a" }, { label: "Nur $b_n$", value: "b" }, { label: "Beide", value: "c" }, { label: "Keine", value: "d" }], correctOption: "b", solution: "Ungerade Funktionen haben nur Sinus-Terme ($b_n$), da Sinus ungerade ist." },
  { id: "four-e2", lessonId: "m-fourier", difficulty: 2, type: "multiple", question: "Was ist die Euler-Formel?", options: [{ label: "$e^{ix} = \\cos x + i\\sin x$", value: "a" }, { label: "$e^{ix} = \\cos x - i\\sin x$", value: "b" }, { label: "$e^x = \\cos x + \\sin x$", value: "c" }, { label: "$e^{ix} = i\\cos x + \\sin x$", value: "d" }], correctOption: "a", solution: "Die Euler-Formel: $e^{ix} = \\cos x + i\\sin x$." },
  { id: "four-e3", lessonId: "m-fourier", difficulty: 3, type: "multiple", question: "Was beschreibt die Unschärferelation bei Fourier?", options: [{ label: "Je breiter das Signal, desto breiter das Spektrum", value: "a" }, { label: "Je schmaler das Signal, desto breiter das Spektrum", value: "b" }, { label: "Signal und Spektrum haben immer gleiche Breite", value: "c" }, { label: "Es gibt keine Beziehung", value: "d" }], correctOption: "b", solution: "Unschärferelation: $\\Delta t \\cdot \\Delta \\omega \\geq 1/2$. Schmales Signal → breites Spektrum." },
  { id: "four-e4", lessonId: "m-fourier", difficulty: 3, type: "multiple", question: "Warum ist FFT schneller als DFT?", options: [{ label: "Weniger Datenpunkte", value: "a" }, { label: "Teile-und-herrsche-Prinzip", value: "b" }, { label: "Approximation", value: "c" }, { label: "Parallelisierung", value: "d" }], correctOption: "b", solution: "FFT nutzt Symmetrien und das Teile-und-herrsche-Prinzip, um die Komplexität von $O(n^2)$ auf $O(n\\log n)$ zu reduzieren." },
];
