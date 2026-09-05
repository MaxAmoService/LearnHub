import { Module, QuizQuestion } from "./types";
import { createExerciseLessons } from "./lessonHelpers";

// Exercise interface (identical zu mathExercises.ts)
interface Exercise {
  id: string;
  lessonId: string;
  difficulty: 1 | 2 | 3;
  type: "input" | "multiple";
  question: string;
  hint?: string;
  expectedAnswer?: string;
  tolerance?: number;
  format?: string;
  options?: { label: string; value: string }[];
  correctOption?: string;
  solution: string;
}

// ============================================================================
// Modul: Wachstumsprozesse
// ============================================================================

export const wachstumsprozesseModule: Module = {
  id: "m-wachstumsprozesse",
  slug: "mathe-wachstumsprozesse",
  title: "Wachstumsprozesse",
  description: "Lineares, exponentielles und logistisches Wachstum — Formeln, Anwendungen und die Verdopplungszeit",
  icon: "🌱",
  color: "#8b5cf6",
  category: "analysis",
  progress: 0,
  merkblatt: `## Merkblatt: Wachstumsprozesse

### Lineares Wachstum
$$f(t) = a + b \\cdot t$$
- $a$ = Startwert (bei $t=0$)
- $b$ = Wachstumsrate (Zunahme pro Zeiteinheit)
- Gerader Graph mit Steigung $b$

### Exponentielles Wachstum
$$f(t) = a \\cdot b^t \\quad \\text{oder} \\quad f(t) = a \\cdot \\mathrm{e}^{kt}$$
- $a$ = Anfangswert
- $b$ = Wachstumsfaktor ($b > 1$: Wachstum, $0 < b < 1$: Abnahme)
- $k$ = kontinuierliche Wachstumsrate
- Zusammenhang: $b = \\mathrm{e}^{k}$

### Verdopplungszeit
$$T_d = \\frac{\\ln 2}{k} = \\frac{0{,}693}{k}$$

### Logistisches Wachstum
$$f(t) = \\frac{K}{1 + \\mathrm{e}^{-k(t - t_0)}}$$
- $K$ = Kapazitätsgrenze (Sättigungswert)
- $t_0$ = Wendepunkt (Zeitpunkt des maximalen Wachstums)
- $k$ = Wachstumsgeschwindigkeit
- Wendepunkt bei $f(t_0) = \\frac{K}{2}$

### Wichtige Vergleiche
| Eigenschaft | Linear | Exponentiell | Logistisch |
|-------------|--------|--------------|------------|
| Wachstumsrate | konstant | proportional zum Wert | proportional zu $(K - f)$ |
| Grenzwert | keiner | $\\infty$ | $K$ |
| Graph | Gerade | J-Kurve | S-Kurve |`,

  lessons: [
    // ══════════════════════════════════════════════════════════════
    // LEKTION 1: Lineares Wachstum
    // ══════════════════════════════════════════════════════════════
    {
      id: "wp-1",
      title: "Lineares Wachstum",
      duration: "16 min",
      type: "text",
      content: `## Was ist lineares Wachstum?

Lineares Wachstum bedeutet: In jeder Zeiteinheit kommt **genau die gleiche Menge** dazu. Der Zuwachs ist konstant.

---

## Die Formel

$$f(t) = a + b \\cdot t$$

- $a$ = **Startwert** — der Wert bei $t = 0$
- $b$ = **Steigung** — die Zunahme pro Zeiteinheit (konstant!)
- $t$ = Zeit (unabhängige Variable)

> **Merke:** Der Graph ist immer eine **Gerade** mit Steigung $b$ und y-Achsenabschnitt $a$.

---

## Beispiel 1: Sparbuch

Du zahlst jeden Monat 50 € auf ein Sparbuch. Dort liegen bereits 200 €.

$$f(t) = 200 + 50 \\cdot t$$

wobei $t$ in Monaten gemessen wird.

| Monat ($t$) | 0 | 1 | 2 | 3 | 6 | 12 |
|---|---:|---:|---:|---:|---:|---:|
| Guthaben $f(t)$ | 200 € | 250 € | 300 € | 350 € | 500 € | 800 € |

Die Zunahme beträgt jeden Monat genau 50 € — das ist die Steigung $b$.

---

## Beispiel 2: Füllstand eines Tanks

Ein Tank wird mit konstant 8 Liter pro Minute gefüllt. Er enthält bereits 30 Liter.

$$f(t) = 30 + 8 \\cdot t$$

**Frage:** Wann enthält der Tank 150 Liter?

$$150 = 30 + 8t \\quad \\Rightarrow \\quad 8t = 120 \\quad \\Rightarrow \\quad t = 15 \\text{ min}$$

---

## Steigung ablesen

Die Steigung $b$ gibt an, wie schnell die Größe wächst:

- $b > 0$: Die Funktion steigt (Wachstum)
- $b < 0$: Die Funktion fällt (Abnahme)
- $b = 0$: Die Funktion ist konstant

Aus zwei gegebenen Punkten $(t_1 | f_1)$ und $(t_2 | f_2)$:

$$b = \\frac{f_2 - f_1}{t_2 - t_1}$$

---

## Beispiel 3: Steigung berechnen

Ein Auto fährt auf der Autobahn. Um 14:00 Uhr ($t = 0$) hat es 120 km zurückgelegt. Um 15:30 ($t = 1{,}5$ h) sind es 255 km.

$$b = \\frac{255 - 120}{1{,}5 - 0} = \\frac{135}{1{,}5} = 90 \\text{ km/h}$$

Die Gleichung: $f(t) = 120 + 90t$

---

## Vorteile und Grenzen

**Vorteil:** Einfach zu berechnen und zu verstehen.

**Grenze:** In der Realität wachsen die wenigsten Prozesse wirklich linear. Bevölkerung, Bakterien, Geldzinsen — all das folgt eher exponentiellem oder logistischem Wachstum.

---

[GUIDED_START]
**Schritt-für-Schritt:** Ein Container hat 500 Liter Wasser. Er verliert durch ein Leck 3 Liter pro Stunde. Schreibe die Gleichung und berechne, wann er leer ist.

**Schritt 1:** Startwert: $a = 500$, Steigung: $b = -3$ (Abnahme!)

**Schritt 2:** Gleichung: $f(t) = 500 - 3t$

**Schritt 3:** Leer bedeutet $f(t) = 0$:
$0 = 500 - 3t \\Rightarrow 3t = 500 \\Rightarrow t = 166{,}67$ Stunden

**Ergebnis:** Nach etwa 166 Stunden und 40 Minuten ist der Container leer.
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Ein Konto hat 1.000 € Guthaben. Monatlich werden 120 € eingezahlt. Wie viel ist nach 8 Monaten drauf?

**Lösung:** $f(8) = 1000 + 120 \\cdot 8 = 1000 + 960 = 1960$ €

**Aufgabe 2:** Die Temperatur sinkt um 2 °C pro Stunde. Um 10:00 Uhr sind es 18 °C. Wann wird es 0 °C?

**Lösung:** $f(t) = 18 - 2t$, Nullstelle: $0 = 18 - 2t \\Rightarrow t = 9$ Stunden, also um 19:00 Uhr.
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 2: Exponentielles Wachstum
    // ══════════════════════════════════════════════════════════════
    {
      id: "wp-2",
      title: "Exponentielles Wachstum",
      duration: "18 min",
      type: "text",
      content: `## Was ist exponentielles Wachstum?

> 🎬 **What's so special about Euler's number e?** — https://www.youtube.com/watch?v=m2MIpBrFgFk — 3Blue1Brown erklärt, warum $e$ überall in der Natur vorkommt und was exponentielles Wachstum wirklich bedeutet.

Beim exponentiellen Wachstum ist die **Zunahme proportional zum aktuellen Wert**. Je größer die Menge, desto schneller wächst sie.

Das ist der Unterschied zum linearen Wachstum: Dort wächst die Menge immer um denselben Betrag. Hier wächst sie immer um denselben **Prozentsatz**.

---

## Die zwei Schreibweisen

### Mit Basis $b$ (Wachstumsfaktor)

$$f(t) = a \\cdot b^t$$

- $a$ = Anfangswert ($t = 0$)
- $b > 1$: Wachstum (z. B. $b = 1{,}05$ für 5 % pro Periode)
- $0 < b < 1$: Abnahme (z. B. $b = 0{,}97$ für 3 % Verlust pro Periode)
- $b = 1$: Keine Veränderung

### Mit Eulerscher Zahl $\\mathrm{e}$ (kontinuierlich)

$$f(t) = a \\cdot \\mathrm{e}^{kt}$$

- $k > 0$: Wachstum
- $k < 0$: Abnahme
- Zusammenhang: $b = \\mathrm{e}^{k}$ bzw. $k = \\ln(b)$

---

## Beispiel 1: Bakterienkultur

Eine Bakterienkultur verdoppelt sich alle 3 Stunden. Start: 500 Bakterien.

$$f(t) = 500 \\cdot 2^{t/3}$$

| Zeit (h) | 0 | 3 | 6 | 9 | 12 |
|---|---:|---:|---:|---:|---:|
| Anzahl | 500 | 1.000 | 2.000 | 4.000 | 8.000 |

Die Verdopplung alle 3 Stunden führt zu starkem Wachstum!

---

## Beispiel 2: Zinseszins

1.000 € werden zu 5 % jährlich angelegt.

$$f(t) = 1000 \\cdot 1{,}05^t$$

| Jahr | 0 | 1 | 5 | 10 | 20 |
|---|---:|---:|---:|---:|---:|
| Guthaben | 1.000 € | 1.050 € | 1.276 € | 1.629 € | 2.653 € |

Nach 20 Jahren hat sich das Geld fast verdreifacht — ohne weitere Einzahlungen!

---

## Verdopplungszeit

Wie lange dauert es, bis sich eine exponentiell wachsende Größe verdoppelt?

$$f(T_d) = 2a = a \\cdot \\mathrm{e}^{k \\cdot T_d}$$

$$2 = \\mathrm{e}^{k \\cdot T_d} \\quad \\Rightarrow \\quad \\ln 2 = k \\cdot T_d$$

$$\\boxed{T_d = \\frac{\\ln 2}{k} \\approx \\frac{0{,}693}{k}}$$

---

## Beispiel 3: Verdopplungszeit berechnen

Eine Stadt wächst mit $k = 0{,}03$ pro Jahr.

$$T_d = \\frac{\\ln 2}{0{,}03} \\approx \\frac{0{,}693}{0{,}03} \\approx 23{,}1 \\text{ Jahre}$$

Die Stadt verdoppelt sich alle ca. 23 Jahre.

---

## Wachstumsfaktor und Wachstumsrate

Wenn eine Größe pro Periode um $p\\%$ wächst:

$$b = 1 + \\frac{p}{100}$$

- 5 % Wachstum: $b = 1{,}05$
- 12 % Wachstum: $b = 1{,}12$
- 3 % Abnahme: $b = 0{,}97$

---

## Beispiel 4: Umrechnung

Eine Größe wächst mit $k = 0{,}2$ pro Jahr kontinuierlich. Wie viel Prozent sind das?

$b = \\mathrm{e}^{0{,}2} \\approx 1{,}2214$

Das entspricht etwa 22,14 % pro Jahr.

---

## Typische Fehler

- **Nicht verwechseln:** $f(t) = a \\cdot b^t$ (exponentiell) und $f(t) = a \\cdot t^b$ (potenziell)!
- **Verdopplungszeit** gilt nur bei reinem exponentiellem Wachstum.
- **Extrapolation** ist gefährlich: Exponentielles Wachstum kann nicht ewig so weitergehen.

---

[GUIDED_START]
**Schritt-für-Schritt:** Eine Investition von 2.000 € wächst mit 8 % pro Jahr. Wann hat sie 5.000 € erreicht?

**Schritt 1:** Gleichung: $f(t) = 2000 \\cdot 1{,}08^t$

**Schritt 2:** Gleichung lösen: $5000 = 2000 \\cdot 1{,}08^t$

**Schritt 3:** Teilen durch 2000: $2{,}5 = 1{,}08^t$

**Schritt 4:** Logarithmus: $t = \\frac{\\ln(2{,}5)}{\\ln(1{,}08)} = \\frac{0{,}916}{0{,}077} \\approx 11{,}9$ Jahre

**Ergebnis:** Nach etwa 12 Jahren hat die Investition 5.000 € erreicht.
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Ein Bakterienstamm verdoppelt sich alle 2 Stunden. Start: 1.000. Wie viele Bakterien gibt es nach 10 Stunden?

**Lösung:** $f(10) = 1000 \\cdot 2^{10/2} = 1000 \\cdot 2^5 = 1000 \\cdot 32 = 32.000$

**Aufgabe 2:** Die Verdopplungszeit einer Größe beträgt 7 Jahre. Bestimme $k$.

**Lösung:** $k = \\frac{\\ln 2}{T_d} = \\frac{0{,}693}{7} \\approx 0{,}099$
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // LEKTION 3: Beschränktes & logistisches Wachstum
    // ══════════════════════════════════════════════════════════════
    {
      id: "wp-3",
      title: "Beschränktes & logistisches Wachstum",
      duration: "17 min",
      type: "text",
      content: `## Warum nicht alles exponentiell wächst

Exponentielles Wachstum geht ewig weiter — aber in der Realität gibt es fast immer eine **Grenze**:

- Ein Bakterientank hat nur begrenztes Nährmedium
- Ein Markt hat nur eine begrenzte Anzahl Kunden
- Eine Epidemie kann nur so viele Menschen infizieren

Das führt zum **logistischen Wachstum**: Es beginnt wie exponentielles Wachstum, bremst aber ab, wenn es sich der Grenze nähert.

---

## Die logistische Funktion

$$f(t) = \\frac{K}{1 + \\mathrm{e}^{-k(t - t_0)}}$$

| Parameter | Bedeutung |
|-----------|-----------|
| $K$ | Kapazitätsgrenze (Sättigungswert) |
| $t_0$ | Wendepunkt (Zeitpunkt des schnellsten Wachstums) |
| $k$ | Wachstumsgeschwindigkeit |

---

## Die drei Phasen

### Phase 1: Anfang (exponentiell)
Am Anfang wächst die Funktion fast exponentiell. Die Ressourcen sind reichlich vorhanden.

### Phase 2: Mitte (maximales Wachstum)
Beim Wendepunkt $t_0$ ist das Wachstum am größten. Der Funktionswert beträgt dort genau die **Hälfte der Kapazitätsgrenze**:

$$f(t_0) = \\frac{K}{2}$$

### Phase 3: Ende (Sättigung)
Die Funktion nähert sich asymptotisch dem Wert $K$. Das Wachstum flacht ab.

---

## Beispiel 1: Verbreitung eines Gerüchts

In einer Schule mit 500 Schülern ($K = 500$) verbreitet sich ein Gerücht. Der Wendepunkt ist am Tag 3 ($t_0 = 3$), die Geschwindigkeit ist $k = 1{,}5$.

$$f(t) = \\frac{500}{1 + \\mathrm{e}^{-1{,}5(t-3)}}$$

| Tag ($t$) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Schüler | ~30 | ~58 | ~105 | 250 | ~395 | ~442 | ~470 | ~486 |

Am Wendepunkt (Tag 3) wissen 250 Schüler Bescheid — genau die Hälfte!

---

## Beispiel 2: Sättigung bei einem Produkt

Eine App hat einen Markt von 10.000 Nutzern. Im ersten Monat wächst sie schnell, nach 6 Monaten ($t_0 = 6$) hat sie die Hälfte erreicht, danach verlangsamt sich das Wachstum.

$$f(t) = \\frac{10000}{1 + \\mathrm{e}^{-0{,}8(t - 6)}}$$

Die S-Kurve zeigt: Schnelles anfängliches Wachstum, dann Sättigung.

---

## Logistische DGL

Das logistische Wachstum wird durch eine Differentialgleichung beschrieben:

$$f'(t) = k \\cdot f(t) \\cdot \\left(1 - \\frac{f(t)}{K}\\right)$$

- Solange $f(t) \\ll K$: Der Term $(1 - f/K) \\approx 1$, also $f' \\approx kf$ — exponentielles Wachstum!
- Wenn $f(t) \\to K$: Der Term $(1 - f/K) \\to 0$, also $f' \\to 0$ — Stillstand!

---

## Wendepunkt bestimmen

Der Wendepunkt einer logistischen Funktion liegt bei:

$$W = \\left(t_0 \\,\\middle|\\, \\frac{K}{2}\\right)$$

Die zweite Ableitung ist dort null:

$$f''(t_0) = 0$$

---

## Beispiel 3: Wendepunkt berechnen

Gegeben: $f(t) = \\frac{2000}{1 + 99 \\cdot \\mathrm{e}^{-0{,}5t}}$

Wendepunkt: $f(t_0) = K/2 = 1000$

$1000 = \\frac{2000}{1 + 99 \\cdot \\mathrm{e}^{-0{,}5t_0}}$

$1 + 99 \\cdot \\mathrm{e}^{-0{,}5t_0} = 2$

$99 \\cdot \\mathrm{e}^{-0{,}5t_0} = 1$

$\\mathrm{e}^{-0{,}5t_0} = \\frac{1}{99}$

$-0{,}5t_0 = \\ln\\left(\\frac{1}{99}\\right) = -\\ln 99$

$t_0 = \\frac{\\ln 99}{0{,}5} = \\frac{4{,}595}{0{,}5} \\approx 9{,}19$

Der Wendepunkt liegt bei $t \\approx 9{,}19$ mit $f \\approx 1000$.

---

## Vergleich der drei Wachstumstypen

| Eigenschaft | Linear | Exponentiell | Logistisch |
|---|---|---|---|
| Formel | $a + bt$ | $a \\cdot b^t$ | $\\frac{K}{1+\\mathrm{e}^{-k(t-t_0)}}$ |
| Zunahme | konstant | proportional zu $f$ | proportional zu $f(K-f)$ |
| Grenzwert | keiner | $\\infty$ | $K$ |
| Wendepunkt | keiner | keiner | $(t_0, K/2)$ |
| Graph | Gerade | J-Kurve | S-Kurve |

---

[GUIDED_START]
**Schritt-für-Schritt:** In einer Stadt mit maximal 50.000 Einwohnern leben anfangs 2.000 Menschen. Das Wachstum folgt einem logistischen Modell mit $k = 0{,}1$ und $t_0 = 20$. Wie viele leben nach 20 Jahren dort?

**Schritt 1:** Wendepunkt: $t_0 = 20$, also $f(20) = K/2$

**Schritt 2:** $K = 50.000$, also $f(20) = 25.000$

**Schritt 3:** Nach 20 Jahren — genau am Wendepunkt — leben 25.000 Menschen dort.

**Ergebnis:** 25.000 Einwohner nach 20 Jahren.
[GUIDED_END]

[PRACTICE_START]
**Aufgabe 1:** Eine logistische Funktion hat $K = 800$. Was ist der Wert am Wendepunkt?

**Lösung:** $f(t_0) = \\frac{K}{2} = \\frac{800}{2} = 400$

**Aufgabe 2:** Ist $f(t) = 50 \\cdot 3^t$ ein logistisches Wachstum?

**Lösung:** Nein! Das ist exponentielles Wachstum. Es gibt keine Kapazitätsgrenze $K$, und die Funktion wächst unbegrenzt.
[PRACTICE_END]`,
    },

    // ══════════════════════════════════════════════════════════════
    // ABSCHLUSS-TEST
    // ══════════════════════════════════════════════════════════════
    {
      id: "wp-quiz",
      title: "Abschlusstest: Wachstumsprozesse",
      duration: "15 min",
      type: "quiz",
      content: "Beantworte die 10 Fragen. Du brauchst mindestens 80 % zum Bestehen.",
    },

    ...createExerciseLessons("wp", "Wachstumsprozesse", {
      easy: `Lineare Wachstumsprozesse erkennen, Startwert und Steigung ablesen, einfache Werte berechnen mit $f(t) = a + b \\cdot t$.`,
      medium: `Exponentielles Wachstum mit Wachstumsfaktor und Eulerscher Zahl, Verdopplungszeit berechnen, zwischen den Schreibweisen umrechnen.`,
      hard: `Logistisches Wachstum mit Kapazitätsgrenze, Wendepunkt bestimmen, Differentialgleichung interpretieren und komplexe Modellaufgaben lösen.`,
    }),
  ],
};

// ============================================================================
// Quiz: 10 Fragen
// ============================================================================

export const wachstumsprozesseQuizzes: Record<string, QuizQuestion[]> = {
  "mathe-wachstumsprozesse": [
    {
      question: "Welche Gleichung beschreibt lineares Wachstum?",
      type: "multiple",
      options: [
        "$f(t) = a \\cdot b^t$",
        "$f(t) = a + b \\cdot t$",
        "$f(t) = \\frac{K}{1+e^{-k(t-t_0)}}$",
        "$f(t) = a \\cdot e^{kt}$",
      ],
      correct: 1,
      explanation: "Lineares Wachstum hat die Form $f(t) = a + b \\cdot t$ mit konstanter Zunahme $b$ pro Zeiteinheit.",
    },
    {
      question: "Was bedeutet der Parameter $a$ in $f(t) = a + b \\cdot t$?",
      type: "multiple",
      options: [
        "Die Steigung",
        "Den Endwert",
        "Den Startwert bei $t = 0$",
        "Die Verdopplungszeit",
      ],
      correct: 2,
      explanation: "$a$ ist der y-Achsenabschnitt, also der Funktionswert zum Zeitpunkt $t = 0$.",
    },
    {
      question: "Ein Wachstumsfaktor von $b = 1{,}05$ entspricht einer jährlichen Wachstumsrate von …",
      type: "multiple",
      options: ["50 %", "5 %", "0,5 %", "105 %"],
      correct: 1,
      explanation: "$b = 1 + p/100$, also $p = (b - 1) \\cdot 100 = 0{,}05 \\cdot 100 = 5\\%$.",
    },
    {
      question: "Was ist die Verdopplungszeit $T_d$ bei exponentiellem Wachstum mit $k = 0{,}1$?",
      type: "multiple",
      options: [
        "$T_d = 6{,}93$",
        "$T_d = 10$",
        "$T_d = 0{,}693$",
        "$T_d = 1$",
      ],
      correct: 0,
      explanation: "$T_d = \\frac{\\ln 2}{k} = \\frac{0{,}693}{0{,}1} = 6{,}93$ Zeiteinheiten.",
    },
    {
      question: "Welche Funktion zeigt exponentielle Abnahme?",
      type: "multiple",
      options: [
        "$f(t) = 100 \\cdot 1{,}05^t$",
        "$f(t) = 100 \\cdot 0{,}85^t$",
        "$f(t) = 100 + 5t$",
        "$f(t) = \\frac{100}{1+e^{-t}}$",
      ],
      correct: 1,
      explanation: "Bei $0 < b < 1$ (hier $b = 0{,}85$) nimmt die Funktion exponentiell ab.",
    },
    {
      question: "Was ist der Grenzwert des logistischen Wachstums für $t \\to \\infty$?",
      type: "multiple",
      options: [
        "$0$",
        "$\\infty$",
        "$K$ (Kapazitätsgrenze)",
        "$t_0$ (Wendepunkt)",
      ],
      correct: 2,
      explanation: "Die logistische Funktion nähert sich asymptotisch dem Wert $K$, der Kapazitätsgrenze.",
    },
    {
      question: "Wo liegt der Wendepunkt der logistischen Funktion $f(t) = \\frac{K}{1+e^{-k(t-t_0)}}$?",
      type: "multiple",
      options: [
        "Bei $f = K$",
        "Bei $f = K/2$ und $t = t_0$",
        "Bei $f = 0$ und $t = 0$",
        "Bei $f = K/2$ und $t = 0$",
      ],
      correct: 1,
      explanation: "Der Wendepunkt liegt bei $(t_0, K/2)$. Dort ist das Wachstum am größten.",
    },
    {
      question: "In einer linearen Funktion $f(t) = 200 + 30t$: Was ist die Steigung?",
      type: "input",
      hint: "Die Steigung ist der Koeffizient vor $t$.",
      mathNotation: "$f(t) = 200 + 30t$",
      correct: "30",
      explanation: "Die Steigung $b$ ist der Faktor vor $t$: $b = 30$. Die Funktion steigt um 30 pro Zeiteinheit.",
    },
    {
      question: "Eine Bakterienkultur verdoppelt sich alle 4 Stunden. Startwert: 300. Wie viele Bakterien gibt es nach 12 Stunden?",
      type: "input",
      hint: "Verwende $f(t) = 300 \\cdot 2^{t/4}$.",
      mathNotation: "$f(t) = 300 \\cdot 2^{t/4}$",
      correct: "2400",
      explanation: "$f(12) = 300 \\cdot 2^{12/4} = 300 \\cdot 2^3 = 300 \\cdot 8 = 2400$.",
    },
    {
      question: "Welcher Wachstumstyp hat keinen Grenzwert und wächst immer schneller?",
      type: "multiple",
      options: [
        "Lineares Wachstum",
        "Exponentielles Wachstum",
        "Logistisches Wachstum",
        "Beschränktes Wachstum",
      ],
      correct: 1,
      explanation: "Exponentielles Wachstum ($f(t) = a \\cdot b^t$ mit $b > 1$) wächst unbegrenzt und immer schneller.",
    },
  ],
};

// ============================================================================
// Practice-Aufgaben: Schwierigkeit 1 (Leicht)
// ============================================================================

export const wachstumsprozessePractice: Exercise[] = [
  // === Schwierigkeit 1: Grundlagen ===
  {
    id: "wp-p1",
    lessonId: "m-wachstumsprozesse",
    difficulty: 1,
    type: "input",
    question: "Ein Konto hat 500 € Guthaben. Monatlich werden 80 € eingezahlt. Wie viel ist nach 6 Monaten auf dem Konto?",
    expectedAnswer: "980",
    format: "Zahl (z.B. 980)",
    solution: "$f(6) = 500 + 80 \\cdot 6 = 500 + 480 = 980$ €.",
  },
  {
    id: "wp-p2",
    lessonId: "m-wachstumsprozesse",
    difficulty: 1,
    type: "input",
    question: "Die Temperatur sinkt um 1,5 °C pro Stunde. Um 12:00 Uhr sind es 24 °C. Wie hoch ist die Temperatur um 16:00 Uhr?",
    expectedAnswer: "18",
    format: "Zahl in °C (z.B. 18)",
    solution: "$f(4) = 24 - 1{,}5 \\cdot 4 = 24 - 6 = 18$ °C.",
  },
  {
    id: "wp-p3",
    lessonId: "m-wachstumsprozesse",
    difficulty: 1,
    type: "input",
    question: "Ein Tank enthält 1200 Liter und wird mit 50 Liter pro Minute geleert. Wie viel ist nach 15 Minuten noch drin?",
    expectedAnswer: "450",
    format: "Zahl (z.B. 450)",
    solution: "$f(15) = 1200 - 50 \\cdot 15 = 1200 - 750 = 450$ Liter.",
  },
  {
    id: "wp-p4",
    lessonId: "m-wachstumsprozesse",
    difficulty: 1,
    type: "multiple",
    question: "Welche Funktion beschreibt lineares Wachstum mit Startwert 100 und Steigung 15?",
    options: [
      { label: "$f(t) = 100 \\cdot 15^t$", value: "a" },
      { label: "$f(t) = 100 + 15t$", value: "b" },
      { label: "$f(t) = 15 + 100t$", value: "c" },
      { label: "$f(t) = 100 \\cdot 15t$", value: "d" },
    ],
    correctOption: "b",
    solution: "Lineares Wachstum: $f(t) = a + b \\cdot t = 100 + 15t$.",
  },

  // === Schwierigkeit 2: Exponentielles Wachstum ===
  {
    id: "wp-p5",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "input",
    question: "Eine Investition von 1.000 € wächst jährlich um 6 %. Wie viel ist nach 5 Jahren vorhanden? (auf ganze Euro gerundet)",
    expectedAnswer: "1338",
    format: "Zahl (z.B. 1338)",
    hint: "Verwende $f(t) = 1000 \\cdot 1{,}06^5$.",
    solution: "$f(5) = 1000 \\cdot 1{,}06^5 = 1000 \\cdot 1{,}3382 \\approx 1338$ €.",
  },
  {
    id: "wp-p6",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "input",
    question: "Eine Bakterienkultur verdoppelt sich alle 3 Stunden. Startwert: 800. Wie viele Bakterien gibt es nach 9 Stunden?",
    expectedAnswer: "6400",
    format: "Zahl (z.B. 6400)",
    hint: "Verwende $f(t) = 800 \\cdot 2^{t/3}$.",
    solution: "$f(9) = 800 \\cdot 2^{9/3} = 800 \\cdot 2^3 = 800 \\cdot 8 = 6400$.",
  },
  {
    id: "wp-p7",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "input",
    question: "Bestimme die Verdopplungszeit bei kontinuierlichem Wachstum mit $k = 0{,}05$. (auf 2 Dezimalstellen)",
    expectedAnswer: "13.86",
    format: "Zahl (z.B. 13.86)",
    hint: "Verwende $T_d = \\frac{\\ln 2}{k}$.",
    solution: "$T_d = \\frac{\\ln 2}{0{,}05} = \\frac{0{,}6931}{0{,}05} \\approx 13{,}86$ Zeiteinheiten.",
  },
  {
    id: "wp-p8",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "multiple",
    question: "Ein Wachstumsfaktor von $b = 0{,}95$ bedeutet …",
    options: [
      { label: "5 % Wachstum pro Periode", value: "a" },
      { label: "95 % Wachstum pro Periode", value: "b" },
      { label: "5 % Abnahme pro Periode", value: "c" },
      { label: "95 % Abnahme pro Periode", value: "d" },
    ],
    correctOption: "c",
    solution: "$b = 0{,}95 = 1 - 0{,}05$. Die Größe nimmt um 5 % pro Periode ab.",
  },

  // === Schwierigkeit 3: Logistisches Wachstum & komplexe Aufgaben ===
  {
    id: "wp-p9",
    lessonId: "m-wachstumsprozesse",
    difficulty: 3,
    type: "input",
    question: "Eine logistische Funktion hat $K = 2000$ und $k = 0{,}3$. Bei welchem Funktionswert liegt der Wendepunkt?",
    expectedAnswer: "1000",
    format: "Zahl (z.B. 1000)",
    hint: "Der Wendepunkt liegt bei $f(t_0) = K/2$.",
    solution: "Der Wendepunkt liegt immer bei $f(t_0) = \\frac{K}{2} = \\frac{2000}{2} = 1000$.",
  },
  {
    id: "wp-p10",
    lessonId: "m-wachstumsprozesse",
    difficulty: 3,
    type: "input",
    question: "Eine Stadt hat aktuell 40.000 Einwohner und wächst exponentiell mit $k = 0{,}02$ pro Jahr. Nach wie vielen Jahren hat sie 60.000 Einwohner? (auf ganze Jahre gerundet)",
    expectedAnswer: "20",
    format: "Zahl (z.B. 20)",
    hint: "Löse $60000 = 40000 \\cdot e^{0{,}02t}$ nach $t$ auf.",
    solution: "$1{,}5 = e^{0{,}02t} \\Rightarrow \\ln 1{,}5 = 0{,}02t \\Rightarrow t = \\frac{0{,}405}{0{,}02} \\approx 20$ Jahre.",
  },
  {
    id: "wp-p11",
    lessonId: "m-wachstumsprozesse",
    difficulty: 3,
    type: "multiple",
    question: "Welche Aussage über logistisches Wachstum ist korrekt?",
    options: [
      { label: "Das Wachstum ist immer konstant.", value: "a" },
      { label: "Die Funktion nähert sich asymptotisch dem Wert $K$.", value: "b" },
      { label: "Es gibt keinen Wendepunkt.", value: "c" },
      { label: "Die Funktion wächst unbegrenzt.", value: "d" },
    ],
    correctOption: "b",
    solution: "Beim logistischen Wachstum nähert sich die Funktion asymptotisch der Kapazitätsgrenze $K$ an. Der Wendepunkt liegt bei $(t_0, K/2)$.",
  },
  {
    id: "wp-p12",
    lessonId: "m-wachstumsprozesse",
    difficulty: 3,
    type: "input",
    question: "Ein Produkt hat einen Markt von 8.000 Kunden. Im logistischen Modell mit $t_0 = 12$ und $K = 8000$: Wie viele Kunden haben es nach sehr langer Zeit (Sättigung) erworben?",
    expectedAnswer: "8000",
    format: "Zahl (z.B. 8000)",
    hint: "Für $t \\to \\infty$ nähert sich $f(t)$ dem Wert $K$.",
    solution: "Für $t \\to \\infty$ gilt $e^{-k(t-t_0)} \\to 0$, also $f(t) \\to \\frac{K}{1+0} = K = 8000$.",
  },
];

// ============================================================================
// Prüfungs-Aufgaben (Exam)
// ============================================================================

export const wachstumsprozesseExam: Exercise[] = [
  {
    id: "wp-e1",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "input",
    question: "Ein Arbeitnehmer verdient 2.800 € brutto und bekommt jährlich 120 € mehr. Nach wie vielen Jahren verdient er 3.640 €?",
    expectedAnswer: "7",
    format: "Zahl (z.B. 7)",
    solution: "$3640 = 2800 + 120t \\Rightarrow 120t = 840 \\Rightarrow t = 7$ Jahre.",
  },
  {
    id: "wp-e2",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "input",
    question: "Eine Aktie steht bei 45 € und wächst kontinuierlich mit $k = 0{,}08$ pro Jahr. Wie viel ist sie nach 10 Jahren wert? (auf 2 Dezimalstellen)",
    expectedAnswer: "100.54",
    format: "Zahl (z.B. 100.54)",
    solution: "$f(10) = 45 \\cdot e^{0{,}08 \\cdot 10} = 45 \\cdot e^{0{,}8} = 45 \\cdot 2{,}2255 \\approx 100{,}15$ €. (Hinweis: Genauer Wert $100{,}15$ €)",
  },
  {
    id: "wp-e3",
    lessonId: "m-wachstumsprozesse",
    difficulty: 3,
    type: "input",
    question: "Eine Infektion breitet sich logistisch aus: $f(t) = \\frac{10000}{1 + 499 \\cdot e^{-0{,}3t}}$. Bestimme den Wendepunkt (Zeitpunkt $t_0$). (auf 1 Dezimalstelle)",
    expectedAnswer: "21.0",
    format: "Zahl (z.B. 21.0)",
    hint: "Im Wendepunkt gilt $f(t_0) = K/2 = 5000$. Löse nach $t_0$ auf.",
    solution: "$5000 = \\frac{10000}{1+499e^{-0{,}3t_0}} \\Rightarrow 1+499e^{-0{,}3t_0} = 2 \\Rightarrow e^{-0{,}3t_0} = \\frac{1}{499} \\Rightarrow t_0 = \\frac{\\ln 499}{0{,}3} \\approx \\frac{6{,}213}{0{,}3} \\approx 20{,}7$.",
  },
  {
    id: "wp-e4",
    lessonId: "m-wachstumsprozesse",
    difficulty: 3,
    type: "multiple",
    question: "Ein Bakterienstamm wächst von 500 auf 2.000 in 6 Stunden (exponentiell). Was ist die Verdopplungszeit?",
    options: [
      { label: "$T_d = 1{,}5$ Stunden", value: "a" },
      { label: "$T_d = 2$ Stunden", value: "b" },
      { label: "$T_d = 3$ Stunden", value: "c" },
      { label: "$T_d = 6$ Stunden", value: "d" },
    ],
    correctOption: "c",
    solution: "$2000 = 500 \\cdot 2^{6/T_d} \\Rightarrow 4 = 2^{6/T_d} \\Rightarrow 2^2 = 2^{6/T_d} \\Rightarrow T_d = 3$ Stunden.",
  },
  {
    id: "wp-e5",
    lessonId: "m-wachstumsprozesse",
    difficulty: 2,
    type: "input",
    question: "Eine Stadt hat 25.000 Einwohner und wächst jährlich um 3 %. Wie viele Einwohner hat sie nach 20 Jahren? (auf ganze Tausend gerundet)",
    expectedAnswer: "45000",
    format: "Zahl (z.B. 45000)",
    hint: "Verwende $f(20) = 25000 \\cdot 1{,}03^{20}$.",
    solution: "$f(20) = 25000 \\cdot 1{,}03^{20} = 25000 \\cdot 1{,}8061 \\approx 45153 \\approx 45.000$.",
  },
];
