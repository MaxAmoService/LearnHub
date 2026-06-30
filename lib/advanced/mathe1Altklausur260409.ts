// Klausur 09.04.2026 — 6 neu geschriebene Lektionen mit ausführlichen Lösungen
import { Lesson } from "../types";

export const mathe1Altklausur260409: Lesson[] = [
  {
    id: "ma1-klausur-260409-1",
    title: "Aufgabe 1: Kardinalitäten & Abbildungen",
    duration: "15 min",
    type: "text",
    group: "📝 Klausur 09.04.2026",
    content: `## Kardinalität, Potenzmenge & Abbildungen

> **📋 10 Punkte** | ⏱ ~12 min | 🔑 Potenzmenge · Binomialkoeffizient · Abbildungsanzahl
> **🎯 Das kannst du nach dieser Lektion:** Duplikate in Mengen sofort erkennen · Kardinalitäten über das Bitstring-Modell berechnen · Alle, injektive und surjektive Abbildungen sicher zählen · Den Gleichheits-Joker bei $|X|=|Y|$ gezielt einsetzen

---

### 📝 Aufgabenstellung — Original-Klausurtext

Seien:
$$M = \\mathcal{P}(\\{0, 9, 0, 4, 2, 0, 2, 6\\})$$
$$N_2 = \\{X \\in M \\mid |X| = 2\\}$$
$$N_3 = \\{X \\in M \\mid |X| = 3\\}$$
$$A = \\{f \\mid f: N_2 \\to N_3\\}$$

**Gesucht:**
1. $|M|$ — Kardinalität der Potenzmenge
2. $|N_2|$ und $|N_3|$ — Anzahl 2- bzw. 3-elementiger Teilmengen
3. $|A|$ — Anzahl aller Abbildungen $N_2 \\to N_3$
4. Anzahl **injektiver** Abbildungen in $A$
5. Anzahl **surjektiver** Abbildungen in $A$

---

### 🧭 Lösungsstrategie — Der rote Faden

> **💡 Die Aufgabe ist ein 3-Gänge-Menü.** Wer Gang 1 verdirbt, verliert alle 10 Punkte — egal wie gut der Rest ist.

$$\\boxed{\\text{① Grundmenge} \\;\\xrightarrow{ |G|=5 }\\; \\text{② Teilmengen} \\;\\xrightarrow{ |N_2|=|N_3|=10 }\\; \\text{③ Abbildungen}}$$

|  | 🍽️ Auf dem Teller | 🔪 Werkzeug | ⚡ Der Knackpunkt |
|---|-------------------|-------------|-------------------|
| **①** | Die 5 *verschiedenen* Elemente | Extensionalitätsprinzip | 8 notiert → nur 5 verschieden! |
| **②** | $\\|M\\|$, $\\|N_2\\|$, $\\|N_3\\|$ | $2^n$, $\\binom{n}{k}$ | $\\binom{5}{2}=\\binom{5}{3}=10$ |
| **③** | $\\|A\\|$, Injektive, Surjektive | $\\|Y\\|^{\\|X\\|}$, $\\frac{b!}{(b-a)!}$ | $10=10$ → Joker! |

> **🔑 Die Zahl 5 ist kein Zufall.** Nur bei $|G|=5$ gilt $\\binom{5}{2} = \\binom{5}{3}$. Mit $|G|=4$ oder $6$ wären Definitions- und Zielmenge ungleich groß — und die Surjektivität würde eine Siebformel-Schlacht. Der Prof hat dir den einfachen Weg gebaut. Erkenn ihn!

---

### 🔍 Schritt 1 — Die Duplikat-Falle entschärfen

> **⚠️ ~40% der Erstsemester scheitern hier.** Sie sehen 8 Zahlen und rechnen mit $|G|=8$ los. Kompletter Punktverlust.

**ℹ️ Die eiserne Regel:** $\\{a, a, b\\} = \\{a, b\\}$. Eine Menge speichert keine Häufigkeiten.

<svg viewBox="0 0 600 130" style="max-width:600px;display:block;margin:1.5rem auto">
  <defs>
    <linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <!-- Input box -->
  <rect x="10" y="10" width="230" height="50" rx="10" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
  <text x="125" y="32" text-anchor="middle" fill="#94a3b8" font-size="11" font-family="monospace">0, 9, 0, 4, 2, 0, 2, 6</text>
  <text x="125" y="50" text-anchor="middle" fill="#64748b" font-size="9">8 Einträge · nicht alle verschieden</text>
  <!-- Arrow -->
  <polygon points="260,35 290,25 290,45" fill="#3b82f6"/>
  <text x="275" y="75" text-anchor="middle" fill="#60a5fa" font-size="9">Duplikate</text>
  <text x="275" y="86" text-anchor="middle" fill="#60a5fa" font-size="9">streichen</text>
  <!-- Output box -->
  <rect x="310" y="10" width="200" height="50" rx="10" fill="#172554" stroke="#3b82f6" stroke-width="2"/>
  <text x="410" y="32" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold" font-family="monospace">{0, 2, 4, 6, 9}</text>
  <text x="410" y="50" text-anchor="middle" fill="#60a5fa" font-size="9">5 Elemente · |G| = 5</text>
  <!-- Bottom annotation -->
  <rect x="180" y="100" width="180" height="22" rx="6" fill="#1e293b" stroke="#334155" stroke-width="1"/>
  <text x="270" y="115" text-anchor="middle" fill="#fbbf24" font-size="10">⚠️ Extensionalitätsprinzip</text>
</svg>

$$\\boxed{G = \\{0, 2, 4, 6, 9\\}, \\qquad |G| = 5}$$

> **❗ Klausur-Realität:** Wer $|G|=8$ einsetzt, verliert alle 10 Punkte — selbst wenn die restliche Rechnung perfekt ist. **Erster Impuls bei JEDER Mengenaufgabe: Welche Elemente kommen mehrfach vor?**

---

### 📐 Schritt 2 — $|M|$: Die Potenzmenge als Bitstring begreifen

$M = \\mathcal{P}(G)$ ist die Menge **aller** Teilmengen. Statt die Formel zu pauken, lies die Teilmenge als 5-Bit-Wort:

<svg viewBox="0 0 620 180" style="max-width:620px;display:block;margin:1.5rem auto">
  <defs>
    <linearGradient id="bgOn" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e3a5f"/>
      <stop offset="100%" stop-color="#172554"/>
    </linearGradient>
    <linearGradient id="bgOff" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <!-- Title -->
  <text x="310" y="20" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">5 Elemente → 5 Schalter → 2⁵ = 32 mögliche Bitstrings</text>
  <!-- Element labels -->
  <text x="90" y="55" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">0</text>
  <text x="200" y="55" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">2</text>
  <text x="310" y="55" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">4</text>
  <text x="420" y="55" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">6</text>
  <text x="530" y="55" text-anchor="middle" fill="#e2e8f0" font-size="14" font-weight="bold">9</text>
  <!-- Bit switches row: {0,4,6} example -->
  <text x="65" y="80" text-anchor="end" fill="#64748b" font-size="9">Bsp:</text>
  <rect x="72" y="66" width="36" height="28" rx="6" fill="url(#bgOn)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="90" y="85" text-anchor="middle" fill="#60a5fa" font-size="16" font-weight="bold">1</text>
  <rect x="182" y="66" width="36" height="28" rx="6" fill="url(#bgOff)" stroke="#334155" stroke-width="1"/>
  <text x="200" y="85" text-anchor="middle" fill="#475569" font-size="16" font-weight="bold">0</text>
  <rect x="292" y="66" width="36" height="28" rx="6" fill="url(#bgOn)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="310" y="85" text-anchor="middle" fill="#60a5fa" font-size="16" font-weight="bold">1</text>
  <rect x="402" y="66" width="36" height="28" rx="6" fill="url(#bgOn)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="420" y="85" text-anchor="middle" fill="#60a5fa" font-size="16" font-weight="bold">1</text>
  <rect x="512" y="66" width="36" height="28" rx="6" fill="url(#bgOff)" stroke="#334155" stroke-width="1"/>
  <text x="530" y="85" text-anchor="middle" fill="#475569" font-size="16" font-weight="bold">0</text>
  <!-- Arrow down -->
  <text x="310" y="115" text-anchor="middle" fill="#60a5fa" font-size="18">↓</text>
  <!-- Result -->
  <rect x="195" y="130" width="230" height="36" rx="10" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="310" y="153" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold" font-family="monospace">Bitstring 10110 = Teilmenge {0, 4, 6}</text>
</svg>

> **💡 Jede der 5 Positionen ist unabhängig: 1 = "Element ist drin", 0 = "Element ist nicht drin".**

5 unabhängige Entscheidungen mit je 2 Möglichkeiten:
$$|M| = \\underbrace{2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2}_{5\\text{ Positionen}} = 2^5 = \\boxed{32}$$

---

### 🎯 Schritt 3 — $|N_2|$ und $|N_3|$: Der Binomialkoeffizient

$N_k = \\{X \\subseteq G \\mid |X| = k\\}$ — alle $k$-elementigen Teilmengen.

> **ℹ️ "5 über 2" bedeutet:** Aus 5 Elementen wähle ich 2 aus. Reihenfolge egal. Keine Wiederholung.

|  | **$\\|N_2\\|$** — 2-elementig | **$\\|N_3\\|$** — 3-elementig |
|---|------------------------------|------------------------------|
| **Formel** | $\\displaystyle\\binom{5}{2}$ | $\\displaystyle\\binom{5}{3}$ |
| **Rechnung** | $\\frac{5 \\cdot 4}{2 \\cdot 1} = \\frac{20}{2}$ | $\\frac{5 \\cdot 4 \\cdot 3}{3 \\cdot 2 \\cdot 1} = \\frac{60}{6}$ |
| **Ergebnis** | $\\mathbf{10}$ | $\\mathbf{10}$ |
| **Warum gleich?** | Wähle 2 aus 5 | = Wähle 3 aus 5 (Komplement!) |

$$\\boxed{|N_2| = |N_3| = 10}$$

> **🔑 $\\binom{5}{2} = \\binom{5}{3}$ — das ist die Symmetrie des Binomialkoeffizienten.** Jede 2er-Teilmenge definiert über ihr Komplement eine 3er-Teilmenge. Der Prof hat $|G|=5$ gewählt, WEIL dann beide 10 sind. Mit 6 Elementen wäre $\\binom{6}{2}=15 \\neq \\binom{6}{3}=20$ — und Schritt ⑥ würde zur Siebformel-Schlacht.

---

### 🔢 Schritt 4 — $|A|$: Alle Abbildungen $N_2 \\to N_3$

Eine Abbildung $f: N_2 \\to N_3$ weist **jedem** der 10 Urbilder **genau ein** Ziel zu.

> **📐 Formel-Steckbrief**
>
> | | |
> |---|-----|
> | **Name** | Anzahl aller Abbildungen $f: X \\to Y$ |
> | **Formel** | $\\boxed{\\|Y\\|^{\\|X\\|}}$ |
> | **In Worten** | Jedes der $\\|X\\|$ Urbilder wählt *unabhängig* eines der $\\|Y\\|$ Ziele |
> | **⚠️ Häufigster Verwechsler** | $\\|X\\|^{\\|Y\\|}$ — FALSCH! Ziel in die Basis, Urbild in den Exponenten |
> | **Eselsbrücke** | $\\|\\text{Ziel}\\|^{\\|\\text{Urbild}\\|}$ — wie $f(x)$: $x$ rein, $y$ raus |

$$\\boxed{|A| = |N_3|^{|N_2|} = 10^{10} = 10\\,000\\,000\\,000}$$

---

### 🔫 Schritt 5 & 6 — Injektive & Surjektive im Vergleich

<svg viewBox="0 0 620 155" style="max-width:620px;display:block;margin:1.5rem auto">
  <defs>
    <linearGradient id="card1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
    <linearGradient id="card2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
    <linearGradient id="card3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#172554"/><stop offset="100%" stop-color="#0f172a"/></linearGradient>
  </defs>
  <!-- Card 1: Alle -->
  <rect x="10" y="10" width="190" height="130" rx="12" fill="url(#card1)" stroke="#334155" stroke-width="1.5"/>
  <text x="105" y="38" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Alle Abbildungen</text>
  <circle cx="50" cy="70" r="7" fill="#60a5fa"/><circle cx="50" cy="95" r="7" fill="#60a5fa"/><circle cx="50" cy="120" r="7" fill="#60a5fa"/>
  <circle cx="160" cy="70" r="7" fill="#818cf8"/><circle cx="160" cy="95" r="7" fill="#818cf8"/>
  <line x1="57" y1="70" x2="153" y2="95" stroke="#475569" stroke-width="1.2"/>
  <line x1="57" y1="95" x2="153" y2="95" stroke="#475569" stroke-width="1.2"/>
  <line x1="57" y1="120" x2="153" y2="70" stroke="#475569" stroke-width="1.2"/>
  <text x="105" y="95" text-anchor="middle" fill="#64748b" font-size="8">Mehrfach OK</text>
  <text x="105" y="132" text-anchor="middle" fill="#60a5fa" font-size="10" font-weight="bold">|Y|^|X|</text>

  <!-- Card 2: Injektiv -->
  <rect x="215" y="10" width="190" height="130" rx="12" fill="url(#card2)" stroke="#334155" stroke-width="1.5"/>
  <text x="310" y="38" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="bold">Injektiv</text>
  <circle cx="255" cy="70" r="7" fill="#34d399"/><circle cx="255" cy="95" r="7" fill="#34d399"/><circle cx="255" cy="120" r="7" fill="#34d399"/>
  <circle cx="365" cy="70" r="7" fill="#a78bfa"/><circle cx="365" cy="95" r="7" fill="#a78bfa"/><circle cx="365" cy="120" r="7" fill="#a78bfa"/>
  <line x1="262" y1="70" x2="358" y2="70" stroke="#475569" stroke-width="1.2"/>
  <line x1="262" y1="95" x2="358" y2="95" stroke="#475569" stroke-width="1.2"/>
  <line x1="262" y1="120" x2="358" y2="120" stroke="#475569" stroke-width="1.2"/>
  <text x="310" y="95" text-anchor="middle" fill="#64748b" font-size="8">Jedes Ziel max. 1×</text>
  <text x="310" y="132" text-anchor="middle" fill="#34d399" font-size="10" font-weight="bold">b!/(b−a)!</text>

  <!-- Card 3: Surjektiv -->
  <rect x="420" y="10" width="190" height="130" rx="12" fill="url(#card3)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="515" y="38" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">Surjektiv</text>
  <circle cx="460" cy="70" r="7" fill="#fbbf24"/><circle cx="460" cy="95" r="7" fill="#fbbf24"/><circle cx="460" cy="120" r="7" fill="#fbbf24"/>
  <circle cx="570" cy="70" r="7" fill="#f472b6"/><circle cx="570" cy="95" r="7" fill="#f472b6"/>
  <line x1="467" y1="70" x2="563" y2="70" stroke="#475569" stroke-width="1.2"/>
  <line x1="467" y1="95" x2="563" y2="70" stroke="#475569" stroke-width="1.2"/>
  <line x1="467" y1="120" x2="563" y2="95" stroke="#475569" stroke-width="1.2"/>
  <text x="515" y="95" text-anchor="middle" fill="#64748b" font-size="8">Jedes Ziel min. 1×</text>
  <text x="515" y="132" text-anchor="middle" fill="#fbbf24" font-size="10" font-weight="bold">= 10! (Joker!)</text>
</svg>

> **🔑 Der Gleichheits-Joker:** $|N_2| = |N_3| = 10$. Für **gleich große** endliche Mengen gilt:
> $$\\text{injektiv} \\iff \\text{surjektiv} \\iff \\text{bijektiv}$$
> 10 Urbilder, 10 Ziele. Wenn jedes Urbild ein ANDERES Ziel trifft, sind alle 10 Ziele belegt. Wenn alle 10 Ziele getroffen werden, kann bei 10 Urbildern keines doppelt sein. **Beides = bijektiv.**

| Abbildungstyp | Allgemeine Formel | Hier ($a=b=10$) | Zahlenwert |
|---------------|-------------------|-----------------|------------|
| **Alle** | $\\|Y\\|^{\\|X\\|}$ | $10^{10}$ | 10.000.000.000 |
| **Injektive** | $\\frac{b!}{(b-a)!}$ | $10!$ | 3.628.800 |
| **Surjektive** | Siebformel... | **$10!$ ← Joker!** | 3.628.800 |

$$\\boxed{\\text{Injektive} = \\text{Surjektive} = 10! = 3\\,628\\,800}$$

---

### ⚠️ Stolperfallen — Die 3 häufigsten Fehler

| ❌ Fehler | 🔍 Ursache | ✅ Abwehr-Strategie |
|-----------|-----------|---------------------|
| **$\\|G\\| = 8$** | Gehirn zählt Einträge statt Elemente | **Reflex:** Bei JEDER Menge "Welche doppelt?" fragen |
| **$\\|X\\|^{\\|Y\\|}$** | "Irgendwas mit hoch" reicht nicht | **Eselsbrücke:** Ziel=Basis, Urbild=Exponent. $\\|\\text{Ziel}\\|^{\\|\\text{Urbild}\\|}$ |
| **Siebeformel bei Surjektiven** | $\\|N_2\\|=\\|N_3\\|$ übersehen | **Vor jedem Schritt:** "Sind die Mengen gleich groß?" |

---

### 🏁 Endergebnis

$$\\boxed{
\\begin{aligned}
|M| &= 32 \\\\
|N_2| = |N_3| &= 10 \\\\
|A| &= 10^{10} = 10\\,000\\,000\\,000 \\\\
\\text{Injektive} &= 10! = 3\\,628\\,800 \\\\
\\text{Surjektive} &= 10! = 3\\,628\\,800
\\end{aligned}
}$$

---

[GUIDED_START]
TITLE: 🏃 Schnelldurchlauf — klick dich durch

[STEP]
### ① Duplikate streichen

8 notierte Einträge, aber nur 5 verschiedene:

$$\\{0,9,0,4,2,0,2,6\\} \\to G = \\{0,2,4,6,9\\}, \\quad |G| = 5$$

> Check: 0 kommt 3× vor, 2 kommt 2× vor — beide nur 1× in $G$.

[STEP]
### ② Potenzmenge

5 Elemente → jedes kann drin sein oder nicht:

$$|M| = |\\mathcal{P}(G)| = 2^{|G|} = 2^5 = \\mathbf{32}$$

[STEP]
### ③ 2er- und 3er-Teilmengen

$$|N_2| = \\binom{5}{2} = \\frac{5 \\cdot 4}{2 \\cdot 1} = \\mathbf{10}$$
$$|N_3| = \\binom{5}{3} = \\frac{5 \\cdot 4 \\cdot 3}{3 \\cdot 2 \\cdot 1} = \\mathbf{10}$$

Symmetrie: $\\binom{5}{2} = \\binom{5}{3}$ — entscheidend für ⑥!

[STEP]
### ④ Alle Abbildungen

$$|A| = |N_3|^{|N_2|} = 10^{10} = \\mathbf{10\\,000\\,000\\,000}$$

Jedes der 10 Urbilder hat 10 mögliche Ziele.

[STEP]
### ⑤ Injektive

Kein Ziel doppelt → Ziele ohne Wiederholung vergeben:

$$10 \\cdot 9 \\cdot 8 \\cdot \\ldots \\cdot 1 = \\mathbf{10! = 3\\,628\\,800}$$

[STEP]
### ⑥ Surjektive — Joker!

$|N_2| = |N_3| = 10$ → Mengen gleich groß!

$$\\text{injektiv} \\iff \\text{surjektiv}$$

Also: Surjektive = Injektive = $\\mathbf{10! = 3\\,628\\,800}$

> Ohne Joker: Siebformel-Schlacht. Mit Joker: geschenkt.

[RESULT]
$$\\boxed{
\\begin{aligned}
|M| &= 32 \\\\
|N_2| = |N_3| &= 10 \\\\
|A| &= 10^{10} \\\\
\\text{Injektive} &= 10! \\\\
\\text{Surjektive} &= 10!
\\end{aligned}
}$$

Alle 10 Punkte — wenn die Duplikat-Falle überlebt wurde! 🎉
[GUIDED_END]

---

[PRACTICE_START]
TITLE: 🧠 Jetzt du — 3 Aufgaben zum Selbertesten

**Aufgabe 1 — Gleiches Prinzip, neue Zahlen:**
$M = \\mathcal{P}(\\{1, 3, 1, 5, 3, 7, 5\\})$, $N_2 = \\{X \\in M \\mid |X| = 2\\}$, $A = \\{f: N_2 \\to N_2\\}$.

Berechne $|M|$, $|N_2|$, $|A|$, Injektive und Surjektive.

**Lösung:**
- $G = \\{1,3,5,7\\}$, $|G| = 4$
- $|M| = 2^4 = 16$
- $|N_2| = \\binom{4}{2} = 6$
- $|A| = 6^6 = 46\\,656$
- $|N_2| = |N_2| = 6$ → Injektive = Surjektive = $6! = 720$

**Aufgabe 2 — Trick-Frage:**
$G = \\{a,b,c,d,e,f\\}$ (6 Elemente). $X = \\{Y \\subseteq G \\mid |Y| = 2\\}$, $Z = \\{Y \\subseteq G \\mid |Y| = 4\\}$.
$B = \\{f: X \\to Z\\}$. Berechne $|X|$, $|Z|$, $|B|$ und die Injektiven.

Sind $|X|$ und $|Z|$ gleich oder ungleich?

**Lösung:**
- $|X| = \\binom{6}{2} = 15$
- $|Z| = \\binom{6}{4} = \\binom{6}{2} = 15$
- **Sie sind DOCH gleich!** $\\binom{6}{2} = \\binom{6}{4}$ — gleiche Symmetrie!
- $|B| = 15^{15}$, Injektive = Surjektive = $15!$

**Aufgabe 3 — Der Härtetest:**
$G = \\{1,2,3,4,5\\}$, $K_1 = \\{X \\subseteq G \\mid |X| = 1\\}$, $K_2 = \\{X \\subseteq G \\mid |X| = 2\\}$, $C = \\{f: K_1 \\to K_2\\}$.

Berechne $|K_1|$, $|K_2|$, $|C|$, Injektive. Kannst du die Surjektiven bestimmen?

**Lösung:**
- $|K_1| = \\binom{5}{1} = 5$, $|K_2| = \\binom{5}{2} = 10$
- $|C| = 10^5 = 100\\,000$
- Injektive: $a=5, b=10$: $\\frac{10!}{5!} = 10 \\cdot 9 \\cdot 8 \\cdot 7 \\cdot 6 = 30\\,240$
- **Surjektive:** $|K_1| \\neq |K_2|$, Joker greift NICHT! → Siebformel nötig. Genau deshalb macht der Prof die Mengen in der Klausur gleich groß!
[PRACTICE_END]

---

> ## ✨ Cheat-Sheet — 7 Konzepte auf einen Blick
>
> | 🔑 Konzept | 📐 Formel | 💡 Merksatz |
> |-----------|-----------|-------------|
> | **Duplikate** | $\\{a,a,b\\} = \\{a,b\\}$ | Menge = paarweise verschiedene Elemente |
> | **Potenzmenge** | $\\|\\mathcal{P}(X)\\| = 2^{\\|X\\|}$ | $n$ Elemente → $2^n$ Bitstrings |
> | **$k$-Teilmengen** | $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$ | $k$ aus $n$ — Reihenfolge egal, keine Wiederholung |
> | **Symmetrie** | $\\binom{n}{k} = \\binom{n}{n-k}$ | $k$ wählen = $n-k$ weglassen |
> | **Alle Abbildungen** | $\\|Y\\|^{\\|X\\|}$ | Jedes Urbild wählt frei sein Ziel |
> | **Injektive** $(a \\leq b)$ | $\\frac{b!}{(b-a)!}$ | Ziele ohne Wiederholung vergeben |
> | **Surjektive** $(a=b)$ | $= a!$ | **Gleichheits-Joker!** = bijektiv |`,
  },
  {
    id: "ma1-klausur-260409-2",
    title: "Aufgabe 2: Summenberechnung",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 09.04.2026",
    content: `## Summenberechnung — Doppelsumme mit Indextransformation

> **📋 25 Punkte** | ⏱ ~18 min | 🔑 Schlüsselkonzept: Summenformeln & Indexverschiebung

Mit 25 Punkten ist das die **höchstgewichtete Aufgabe** der Klausur! Hier zählt jeder Zwischenschritt. Die Kombination aus Summenformeln, Indexverschiebung und algebraischer Vereinfachung macht diese Aufgabe zum perfekten Test deiner Rechenfertigkeiten.

---

[GUIDED_START]
TITLE: Aufgabe 2 (25 Punkte): Summenberechnung — Doppelsumme
[STEP]
### 📝 Aufgabenstellung

Berechne den Wert von:
$$\\sum_{k=1}^{2026} \\left(k^2 + \\frac{\\pi}{3}k\\right) - \\sum_{m=9}^{2029} (m-3)(m-1)$$

> **🎯 Strategie:** Beide Summen getrennt mit den Summenformeln vereinfachen, dann die Differenz bilden.

[STEP]
### 🔢 Schritt 1: Erste Summe zerlegen

Die erste Summe lässt sich linear aufteilen:

$$\\underbrace{\\sum_{k=1}^{2026} \\left(k^2 + \\frac{\\pi}{3}k\\right)}_{S_1} = \\underbrace{\\sum_{k=1}^{2026} k^2}_{\\text{Quadrat-Summe}} + \\underbrace{\\frac{\\pi}{3}\\sum_{k=1}^{2026} k}_{\\text{Gauß-Summe} \\times \\pi/3}$$

**Die drei fundamentalen Summenformeln** (musst du auswendig können!):

| Summe | Formel | Name |
|-------|--------|------|
| $\\sum_{k=1}^{n} 1$ | $n$ | Konstante |
| $\\sum_{k=1}^{n} k$ | $\\frac{n(n+1)}{2}$ | Gauß'sche Summenformel |
| $\\sum_{k=1}^{n} k^2$ | $\\frac{n(n+1)(2n+1)}{6}$ | Quadratsumme |

Mit $n = 2026$:

$$\\sum_{k=1}^{2026} k = \\frac{2026 \\cdot 2027}{2} = 2\\,053\\,351$$
$$\\sum_{k=1}^{2026} k^2 = \\frac{2026 \\cdot 2027 \\cdot 4053}{6}$$

> **💡 Tipp:** Brich die Rechnung nicht ab! Behalte die faktorisierte Form — kürzen kommt später.

[STEP]
### 🔄 Schritt 2: Zweite Summe — ausmultiplizieren

Zuerst den Summanden vereinfachen:

$$(m-3)(m-1) = m^2 - m - 3m + 3 = m^2 - 4m + 3$$

Also:
$$\\underbrace{\\sum_{m=9}^{2029} (m^2 - 4m + 3)}_{S_2} = \\sum_{m=9}^{2029} m^2 - 4\\sum_{m=9}^{2029} m + \\sum_{m=9}^{2029} 3$$

[STEP]
### 🔀 Schritt 3: Indexverschiebung (der entscheidende Trick!)

Die Summenformeln gelten für Summen **ab Index 1**. Mit $m=9$ starten wir aber bei 9!

**Lösung: Indexverschiebung!** Setze $i = m - 8$:

| Original | Verschoben |
|----------|------------|
| $m = 9$ | $i = 1$ |
| $m = 2029$ | $i = 2021$ |
| $m$ | $i + 8$ |
| $m^2$ | $(i+8)^2 = i^2 + 16i + 64$ |

**Die drei Teile der zweiten Summe nach Verschiebung:**

$$\\sum_{m=9}^{2029} m^2 = \\sum_{i=1}^{2021} (i^2 + 16i + 64) = \\sum i^2 + 16\\sum i + 64 \\cdot 2021$$

$$\\sum_{m=9}^{2029} m = \\sum_{i=1}^{2021} (i+8) = \\sum i + 8 \\cdot 2021$$

$$\\sum_{m=9}^{2029} 3 = 3 \\cdot 2021$$

[STEP]
### 🧮 Schritt 4: $S_2$ komplett zusammenbauen

$$S_2 = \\underbrace{\\sum_{i=1}^{2021} i^2}_{\\text{Quadratsumme}} + 16\\underbrace{\\sum_{i=1}^{2021} i}_{\\text{Gauß}} + 64 \\cdot 2021$$

$$\\qquad - 4\\left(\\sum_{i=1}^{2021} i + 8 \\cdot 2021\\right) + 3 \\cdot 2021$$

**Fasse die Koeffizienten zusammen:**

$$S_2 = \\sum_{i=1}^{2021} i^2 + (16-4)\\sum_{i=1}^{2021} i + (64 - 32 + 3) \\cdot 2021$$

$$S_2 = \\frac{2021 \\cdot 2022 \\cdot 4043}{6} + 12 \\cdot \\frac{2021 \\cdot 2022}{2} + 35 \\cdot 2021$$

[STEP]
### 📊 Schritt 5: Differenz $S_1 - S_2$ bilden

**Der $\\pi$-Term überlebt!** $S_2$ hat kein $\\pi$, also bleibt der $\\frac{\\pi}{3}$-Term aus $S_1$ unverändert.

$$S_1 - S_2 = \\underbrace{\\left(\\frac{2026 \\cdot 2027 \\cdot 4053}{6} - \\frac{2021 \\cdot 2022 \\cdot 4043}{6}\\right)}_{\\text{Quadrat-Differenz}}$$
$$\\qquad + \\underbrace{\\frac{\\pi}{3} \\cdot \\frac{2026 \\cdot 2027}{2}}_{\\pi\\text{-Term}} - \\underbrace{12 \\cdot \\frac{2021 \\cdot 2022}{2}}_{\\text{Gauß-Anteil}} - 35 \\cdot 2021$$

> **🎯 Klausurstrategie:** Die finalen Zahlen musst du nicht komplett ausrechnen! Der korrekte Einsatz der Formeln und die Struktur der Lösung geben die Punkte. Konzentriere dich auf **saubere Notation** und **nachvollziehbare Zwischenschritte**.

[RESULT]
$$S_1 - S_2 = \\frac{2026 \\cdot 2027 \\cdot 4053}{6} + \\frac{\\pi}{3} \\cdot \\frac{2026 \\cdot 2027}{2} - \\frac{2021 \\cdot 2022 \\cdot 4043}{6} - 6 \\cdot 2021 \\cdot 2022 - 35 \\cdot 2021$$
[GUIDED_END]

---

> ## ✨ Das haben wir gelernt
>
> | Konzept | Anwendung |
> |---------|-----------|
> | **Summenformeln** | $\\sum k$, $\\sum k^2$ — immer zuerst prüfen, ob sie anwendbar sind |
> | **Indexverschiebung** | $i = m - 8$ macht Summen ab Index 1 zugänglich |
> | **Koeffizienten-Matching** | Gleiche Summentypen zusammenfassen zur Vereinfachung |
> | **$\\pi$ in Summen** | Irrationale Konstanten bleiben erhalten — nicht wegkürzen! |`,
  },
  {
    id: "ma1-klausur-260409-3",
    title: "Aufgabe 3: Vollständige Induktion",
    duration: "18 min",
    type: "text",
    group: "📝 Klausur 09.04.2026",
    content: `## Vollständige Induktion — Teleskopsumme

> **📋 20 Punkte** | ⏱ ~15 min | 🔑 Schlüsselkonzept: Induktionsbeweis + algebraische Umformung

Die vollständige Induktion ist **das** zentrale Beweisprinzip der Mathematik 1. Diese Aufgabe zeigt den klassischen 3-Schritt: **Anfang → Voraussetzung → Schritt**. Der Knackpunkt liegt in der geschickten Faktorisierung im Induktionsschritt!

---

[GUIDED_START]
TITLE: Aufgabe 3 (20 Punkte): Vollständige Induktion — Teleskopsumme
[STEP]
### 📝 Aufgabenstellung

Zeige mittels **vollständiger Induktion** für alle $n \\in \\mathbb{N}$:

$$\\sum_{i=1}^{n} \\frac{1}{(3i-2)(3i+1)} = \\frac{n}{3n+1}$$

> **🔍 Erkenne das Muster:** Der Summand $\\frac{1}{(3i-2)(3i+1)}$ ist eine **Teleskopsumme** — aber die Induktion ist der geforderte Beweisweg!

[STEP]
### ✅ Schritt 1: Induktionsanfang ($n = 1$)

Wir prüfen, ob die Formel für $n=1$ gilt.

**Linke Seite** ($n=1$ — die Summe hat nur einen Term):
$$\\sum_{i=1}^{1} \\frac{1}{(3i-2)(3i+1)} = \\frac{1}{(3 \\cdot 1 - 2)(3 \\cdot 1 + 1)} = \\frac{1}{1 \\cdot 4} = \\frac{1}{4}$$

**Rechte Seite** ($n=1$ in die Formel einsetzen):
$$\\frac{1}{3 \\cdot 1 + 1} = \\frac{1}{4}$$

$$\\boxed{\\frac{1}{4} = \\frac{1}{4} \\; \\checkmark}$$

> ✅ **Der Induktionsanfang ist erfüllt!** Die Formel stimmt für $n=1$.

[STEP]
### 📋 Schritt 2: Induktionsvoraussetzung (IV)

Wir nehmen an, dass die Aussage für ein **beliebiges, aber festes** $n \\in \\mathbb{N}$ gilt:

$$\\boxed{\\sum_{i=1}^{n} \\frac{1}{(3i-2)(3i+1)} = \\frac{n}{3n+1}} \\quad \\text{← Induktionsvoraussetzung (IV)}$$

Das ist unsere **Annahme**, mit der wir jetzt weiterarbeiten.

[STEP]
### 🎯 Schritt 3: Induktionsschritt — was ist zu zeigen?

Wir müssen beweisen: Wenn die Formel für $n$ gilt, dann gilt sie auch für $n+1$.

**Zielgleichung für $n+1$:**
$$\\sum_{i=1}^{n+1} \\frac{1}{(3i-2)(3i+1)} \\stackrel{!}{=} \\frac{n+1}{3(n+1)+1} = \\frac{n+1}{3n+4}$$

Jetzt kommt der entscheidende Trick: Wir spalten den letzten Summanden ab!

$$\\sum_{i=1}^{\\color{red}{n+1}} \\frac{1}{(3i-2)(3i+1)} = \\underbrace{\\sum_{i=1}^{\\color{blue}{n}} \\frac{1}{(3i-2)(3i+1)}}_{\\color{blue}{\\text{IV anwendbar!}}} + \\underbrace{\\frac{1}{(3(n+1)-2)(3(n+1)+1)}}_{\\text{neuer Summand}}$$

[STEP]
### 🔢 Schritt 4: IV einsetzen

**Neuer Summand** vereinfachen:
$$\\frac{1}{(3n+3-2)(3n+3+1)} = \\frac{1}{(3n+1)(3n+4)}$$

**IV einsetzen:**
$$\\sum_{i=1}^{n+1} \\frac{1}{(3i-2)(3i+1)} = \\underbrace{\\frac{n}{3n+1}}_{\\text{aus IV}} + \\frac{1}{(3n+1)(3n+4)}$$

[STEP]
### 🧮 Schritt 5: Addition der Brüche

Hauptnenner: $(3n+1)(3n+4)$

$$= \\frac{n \\cdot \\color{red}{(3n+4)}}{(3n+1)(3n+4)} + \\frac{1}{(3n+1)(3n+4)}$$
$$= \\frac{n(3n+4) + 1}{(3n+1)(3n+4)}$$
$$= \\frac{3n^2 + 4n + 1}{(3n+1)(3n+4)}$$

[STEP]
### 🔑 Schritt 6: Der entscheidende Faktorisierungstrick!

Jetzt müssen wir $3n^2 + 4n + 1$ faktorisieren. **Erkenne:**
$$(3n+1)(n+1) = 3n^2 + 3n + n + 1 = 3n^2 + 4n + 1$$

> **💡 Woher weiß ich das?** Die Nullstellen von $3n^2+4n+1=0$ sind $n=-1$ und $n=-\\frac{1}{3}$. Also $3(n+1)(n+\\frac{1}{3}) = (3n+1)(n+1)$.

Einsetzen:
$$= \\frac{(3n+1)(n+1)}{(3n+1)(3n+4)}$$

**Kürzen** des Faktors $(3n+1)$:
$$= \\frac{n+1}{3n+4} \\quad \\checkmark$$

Das ist **genau** die rechte Seite für $n+1$! 🎉

[STEP]
### 🏁 Schritt 7: Induktionsschluss

| Schritt | Status |
|---------|--------|
| **Induktionsanfang** ($n=1$) | ✅ $\\frac{1}{4} = \\frac{1}{4}$ |
| **Induktionsvoraussetzung** | Angenommen für $n$ |
| **Induktionsschritt** ($n \\to n+1$) | ✅ Gezeigt durch algebraische Umformung |

Nach dem **Prinzip der vollständigen Induktion** gilt die Formel für alle $n \\in \\mathbb{N}$.

$$\\blacksquare$$

[RESULT]
$$\\boxed{\\sum_{i=1}^{n} \\frac{1}{(3i-2)(3i+1)} = \\frac{n}{3n+1} \\quad \\forall n \\in \\mathbb{N}}$$
[GUIDED_END]

---

> ## ✨ Das haben wir gelernt
>
> | Element | Erklärung |
> |---------|-----------|
> | **IA** | Immer mit $n=1$ starten (außer die Behauptung beginnt später) |
> | **IV** | Klar formulieren: „Es gelte die Formel für ein $n \\in \\mathbb{N}$" |
> | **IS** | Summe bis $n+1$ = Summe bis $n$ (IV!) + neuer Term |
> | **Faktorisierung** | $3n^2+4n+1 = (3n+1)(n+1)$ — der Schlüssel zum Kürzen! |`,
  },
  {
    id: "ma1-klausur-260409-4",
    title: "Aufgabe 4: Betragsungleichung",
    duration: "18 min",
    type: "text",
    group: "📝 Klausur 09.04.2026",
    content: `## Ungleichung mit Beträgen & Brüchen

> **📋 20 Punkte** | ⏱ ~15 min | 🔑 Schlüsselkonzept: Fallunterscheidung

Betragsungleichungen mit Brüchen erfordern **systematische Fallunterscheidung**. Die Kunst liegt darin, die kritischen Punkte zu erkennen und jeden Fall sauber durchzurechnen. Kein Ratespiel — reine Technik!

---

[GUIDED_START]
TITLE: Aufgabe 4 (20 Punkte): Ungleichung mit Beträgen
[STEP]
### 📝 Aufgabenstellung

Bestimme alle $x \\in \\mathbb{R}$ mit:
$$-3 \\leq \\left|\\frac{1}{x-1}\\right| - \\left|\\frac{2}{x-3}\\right|$$

[STEP]
### 🔍 Schritt 1: Definitionsmenge — IMMER zuerst!

Die Nenner dürfen **niemals** Null werden:

$$x - 1 \\neq 0 \\implies x \\neq 1$$
$$x - 3 \\neq 0 \\implies x \\neq 3$$

$$\\boxed{\\mathbb{D} = \\mathbb{R} \\setminus \\{1, 3\\}}$$

> **⚠️ Diese beiden Punkte fehlen in 50% aller Studenten-Lösungen!** Schreibe die Definitionsmenge **explizit** hin.

Die kritischen Punkte $x = 1$ und $x = 3$ teilen $\\mathbb{R}$ in **drei Bereiche**:

$$\\overbrace{(-\\infty, 1)}^{\\text{Bereich I}} \\;\\;\\; \\underbrace{(1, 3)}_{\\text{Bereich II}} \\;\\;\\; \\overbrace{(3, \\infty)}^{\\text{Bereich III}}$$

[STEP]
### 📊 Schritt 2: Vorzeichenanalyse — die Beträge auflösen

Entscheidend: Das Vorzeichen des Bruchs hängt vom Vorzeichen des Nenners ab!

| Bereich | $x-1$ | $\\frac{1}{x-1}$ | $x-3$ | $\\frac{2}{x-3}$ |
|:-------:|:-----:|:----------------:|:-----:|:----------------:|
| I: $x < 1$ | **negativ** | negativ | **negativ** | negativ |
| II: $1 < x < 3$ | **positiv** | positiv | **negativ** | negativ |
| III: $x > 3$ | **positiv** | positiv | **positiv** | positiv |

> **💡 Merke:** Der Zähler (1 bzw. 2) ist immer positiv. Nur der Nenner bestimmt das Vorzeichen!

[STEP]
### 🧮 Schritt 3: Fall I — $x < 1$

Beide Brüche sind negativ → Betrag = Negation:

$$\\left|\\frac{1}{x-1}\\right| = -\\frac{1}{x-1}, \\qquad \\left|\\frac{2}{x-3}\\right| = -\\frac{2}{x-3}$$

**Ungleichung einsetzen:**
$$-3 \\leq -\\frac{1}{x-1} - \\left(-\\frac{2}{x-3}\\right)$$
$$-3 \\leq -\\frac{1}{x-1} + \\frac{2}{x-3}$$

**Auf gemeinsamen Nenner** $(x-1)(x-3)$:
$$-3 \\leq \\frac{-(x-3) + 2(x-1)}{(x-1)(x-3)} = \\frac{x+1}{(x-1)(x-3)}$$

Für $x < 1$ ist $(x-1)(x-3) > 0$ (Produkt zweier negativer Zahlen). Multiplikation erhält das $\\leq$:

$$-3(x-1)(x-3) \\leq x+1$$

Nach Vereinfachung: $x \\geq -7$. **Geschnitten mit Fallbedingung $x < 1$:**

$$\\boxed{L_1 = [-7, 1)}$$

[STEP]
### 🧮 Schritt 4: Fall II — $1 < x < 3$

$\\frac{1}{x-1}$ positiv, $\\frac{2}{x-3}$ negativ:

$$\\left|\\frac{1}{x-1}\\right| = \\frac{1}{x-1}, \\qquad \\left|\\frac{2}{x-3}\\right| = -\\frac{2}{x-3}$$

$$-3 \\leq \\frac{1}{x-1} - \\left(-\\frac{2}{x-3}\\right) = \\frac{1}{x-1} + \\frac{2}{x-3}$$

Auf Hauptnenner $(x-1)(x-3)$:
$$-3 \\leq \\frac{(x-3) + 2(x-1)}{(x-1)(x-3)} = \\frac{3x-5}{(x-1)(x-3)}$$

> **⚠️ Achtung:** Für $1 < x < 3$ ist $(x-1)(x-3) < 0$! Multiplikation kehrt das Ungleichheitszeichen UM!

Nach Fallanalyse: $x \\leq \\frac{5}{3}$. Geschnitten mit $1 < x < 3$:

$$\\boxed{L_2 = \\left(1, \\frac{5}{3}\\right]}$$

[STEP]
### 🧮 Schritt 5: Fall III — $x > 3$

Beide Brüche positiv:

$$-3 \\leq \\frac{1}{x-1} - \\frac{2}{x-3} = \\frac{(x-3) - 2(x-1)}{(x-1)(x-3)} = \\frac{-x-1}{(x-1)(x-3)}$$

Für $x > 3$ ist $(x-1)(x-3) > 0$. Die Ungleichung $\\frac{-x-1}{(x-1)(x-3)} \\geq -3$ ist für alle $x > 3$ erfüllt.

$$\\boxed{L_3 = (3, \\infty)}$$

[STEP]
### 🏁 Schritt 6: Gesamtlösung

$$L = L_1 \\cup L_2 \\cup L_3$$

$$\\boxed{L = \\underbrace{[-7, 1)}_{\\text{Fall I}} \\;\\cup\\; \\underbrace{\\left(1, \\frac{5}{3}\\right]}_{\\text{Fall II}} \\;\\cup\\; \\underbrace{(3, \\infty)}_{\\text{Fall III}}}$$

> **🎯 Die 3 goldenen Regeln für Betragsungleichungen:**
> 1. **Definitionsmenge zuerst!** — Nennernullstellen = kritische Punkte
> 2. **Systematische Fallunterscheidung** — jeder Bereich einzeln
> 3. **Jeden Fall mit der Fallbedingung schneiden!** — nicht vergessen!

[RESULT]
$$\\boxed{L = [-7, 1) \\cup \\left(1, \\frac{5}{3}\\right] \\cup (3, \\infty)}$$
[GUIDED_END]

---

> ## ✨ Das haben wir gelernt
>
> | Schritt | Aktion |
> |--------|--------|
> | 1. $\\mathbb{D}$ | Nenner $\\neq 0$ → kritische Punkte |
> | 2. Bereiche | $\\mathbb{R}$ in Intervalle um die kritischen Punkte |
> | 3. Vorzeichen | Pro Bereich: Nenner-Vorzeichen → Betragsauflösung |
> | 4. Lösen | Ungleichung pro Fall lösen + mit Fallbedingung **schneiden** |
> | 5. Vereinigen | Alle Teillösungen zu $L$ vereinigen |`,
  },
  {
    id: "ma1-klausur-260409-5",
    title: "Aufgabe 5: Grenzwerte von Folgen",
    duration: "12 min",
    type: "text",
    group: "📝 Klausur 09.04.2026",
    content: `## Grenzwerte von Folgen

> **📋 10 Punkte** | ⏱ ~10 min | 🔑 Schlüsselkonzept: Gradvergleich & Euler-Grenzwert

Zwei klassische Grenzwerttypen in einer Aufgabe! Teil (i) prüft den **Gradvergleich**, Teil (ii) die **Euler'sche Grenzwertformel**. Beide sind Standard — wer sie kennt, holt 10 sichere Punkte.

---

[GUIDED_START]
TITLE: Aufgabe 5 (10 Punkte): Grenzwerte von Folgen
[STEP]
### 📝 Aufgabenstellung

Berechne:
$$\\text{(i) } \\lim_{n \\to \\infty} \\frac{n^2 + 14n}{n^3 - 15n^2} \\cdot \\frac{n - 13}{-n^2 - 169}$$
$$\\text{(ii) } \\lim_{n \\to \\infty} \\left(1 + \\frac{3}{4n}\\right)^{2n}$$

[STEP]
### 📐 Teil (i): Gradvergleich — höchste Potenzen identifizieren

**Strategie:** Multipliziere die Brüche und vergleiche Zähler- und Nennergrad.

**Zähler:** $(n^2 + 14n)(n - 13)$
$$= n^3 + 14n^2 - 13n^2 - 182n = n^3 + n^2 - 182n$$
→ Höchste Potenz: $\\mathbf{n^3}$

**Nenner:** $(n^3 - 15n^2)(-n^2 - 169)$
$$= -n^5 - 169n^3 + 15n^4 + 2535n^2$$
→ Höchste Potenz: $\\mathbf{-n^5}$

[STEP]
### 📊 Teil (i): Auswertung per Gradvergleich

$$\\lim_{n \\to \\infty} \\frac{n^3 + n^2 - 182n}{-n^5 + 15n^4 - 169n^3 + 2535n^2}$$

**Durch $n^5$ kürzen** (höchste Nennerpotenz):

$$\\lim_{n \\to \\infty} \\frac{\\frac{1}{n^2} + \\frac{1}{n^3} - \\frac{182}{n^4}}{-1 + \\frac{15}{n} - \\frac{169}{n^2} + \\frac{2535}{n^3}}$$

Alle Terme mit $\\frac{1}{n^k}$ ($k \\geq 1$) gehen gegen 0:

$$= \\frac{0 + 0 - 0}{-1 + 0 - 0 + 0} = \\frac{0}{-1} = \\boxed{0}$$

> **💡 Faustregel:** Zählergrad (3) < Nennergrad (5) → Grenzwert ist **immer 0**.

[STEP]
### 🔢 Teil (ii): Auf die Euler-Form bringen

Die **Euler'sche Grenzwertformel** lautet:
$$\\lim_{n \\to \\infty} \\left(1 + \\frac{a}{n}\\right)^n = e^a$$

Unser Ausdruck: $\\left(1 + \\frac{3}{4n}\\right)^{2n}$

**Umschreiben — erkenne die Euler-Struktur:**

$$\\left(1 + \\frac{3}{4n}\\right)^{2n} = \\left[\\left(1 + \\frac{\\color{red}{3/4}}{n}\\right)^n\\right]^2$$

Der innere Ausdruck ist exakt die Euler-Form mit $a = \\frac{3}{4}$!

[STEP]
### 🎯 Teil (ii): Endergebnis

$$\\lim_{n \\to \\infty} \\left(1 + \\frac{3/4}{n}\\right)^n = e^{3/4}$$

$$\\lim_{n \\to \\infty} \\left[\\left(1 + \\frac{3/4}{n}\\right)^n\\right]^2 = \\left(e^{3/4}\\right)^2 = \\boxed{e^{3/2}}$$

> **💡 Verallgemeinerung:** $\\lim (1 + \\frac{a}{n})^{bn} = e^{ab}$ — die Konstanten multiplizieren sich!

[RESULT]
$$\\boxed{\\text{(i) } 0 \\qquad \\text{(ii) } e^{3/2}}$$
[GUIDED_END]

---

> ## ✨ Das haben wir gelernt
>
> | Grenzwerttyp | Strategie | Signalwort |
> |-------------|----------|------------|
> | Rationale Folge | Durch höchste Nennerpotenz kürzen | „Bruch aus Polynomen" |
> | Euler-Typ | Auf $(1 + a/n)^n$ umformen | „Hoch $n$" |`,
  },
  {
    id: "ma1-klausur-260409-6",
    title: "Aufgabe 6: Komplexe Zahlen",
    duration: "20 min",
    type: "text",
    group: "📝 Klausur 09.04.2026",
    content: `## Komplexe Zahlen — Polarform, Division & de Moivre

> **📋 20 Punkte** | ⏱ ~18 min | 🔑 Schlüsselkonzept: Polarform-Division & Wurzelziehen

Die Königsdisziplin! Drei Teilaufgaben, die alles abdecken: Polarform-Umrechnung, Division, Skizze in der Gauß-Ebene und Wurzelziehen mit de Moivre. Wer diese Aufgabe meistert, hat die komplexen Zahlen verstanden.

---

[GUIDED_START]
TITLE: Aufgabe 6 (20 Punkte): Komplexe Zahlen — Polarform & Division
[STEP]
### 📝 Aufgabenstellung

Gegeben:
$$z_1 = 4\\sqrt{5}\\angle\\frac{\\pi}{4}, \\qquad z_2 = \\sqrt{30}\\angle\\frac{\\pi}{6}$$

**(a)** Berechne $z_3 = \\dfrac{z_1}{z_2}$ in Polarform.

**(b)** Skizziere $z_1$, $z_2$, $z_3$ in der Gaußschen Zahlenebene und gib $z_1$ in **Normalform** an.

**(c)** Bestimme alle Lösungen von $z^6 = 8(1+j)$.

[STEP]
### 🔢 (a) Schritt 1: Polarform-Division — Betrag

Die **Goldene Regel** für Polarform-Division:
$$\\frac{r_1\\angle\\varphi_1}{r_2\\angle\\varphi_2} = \\frac{r_1}{r_2}\\angle(\\varphi_1 - \\varphi_2)$$

> **Merke:** Beträge dividieren, Winkel subtrahieren!

**Betrag von $z_3$:**
$$|z_3| = \\frac{r_1}{r_2} = \\frac{4\\sqrt{5}}{\\sqrt{30}}$$

Vereinfachen:
$$= \\frac{4\\sqrt{5}}{\\sqrt{6 \\cdot 5}} = \\frac{4\\cancel{\\sqrt{5}}}{\\sqrt{6}\\cancel{\\sqrt{5}}} = \\frac{4}{\\sqrt{6}}$$

Rational machen:
$$= \\frac{4\\sqrt{6}}{6} = \\boxed{\\frac{2\\sqrt{6}}{3}}$$

[STEP]
### 📐 (a) Schritt 2: Polarform-Division — Winkel

$$\\varphi_3 = \\varphi_1 - \\varphi_2 = \\frac{\\pi}{4} - \\frac{\\pi}{6}$$

Auf Zwölftel bringen:
$$= \\frac{3\\pi}{12} - \\frac{2\\pi}{12} = \\boxed{\\frac{\\pi}{12}}$$

> **💡 $\\frac{\\pi}{12} = 15°$** — ein sehr schöner Winkel!

**Ergebnis (a):**
$$\\boxed{z_3 = \\frac{2\\sqrt{6}}{3}\\angle\\frac{\\pi}{12}}$$

[STEP]
### ✏️ (b) Schritt 3: $z_1$ in Normalform

$z = r(\\cos\\varphi + j\\sin\\varphi)$:

$$z_1 = 4\\sqrt{5}\\left(\\cos\\frac{\\pi}{4} + j\\sin\\frac{\\pi}{4}\\right)$$

$$\\cos\\frac{\\pi}{4} = \\sin\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$$

$$z_1 = 4\\sqrt{5} \\cdot \\frac{\\sqrt{2}}{2}(1 + j) = 2\\sqrt{10}(1 + j)$$

$$\\boxed{z_1 = 2\\sqrt{10} + j \\cdot 2\\sqrt{10}}$$

[STEP]
### 🎨 (b) Schritt 4: Visualisierung in der Gauß-Ebene

Alle drei Punkte liegen im **ersten Quadranten**:

| Punkt | Betrag | Winkel | $\\approx$ |
|-------|--------|--------|-----------|
| $z_1$ | $4\\sqrt{5}$ | $45°$ | $8.94\\angle 45°$ |
| $z_2$ | $\\sqrt{30}$ | $30°$ | $5.48\\angle 30°$ |
| $z_3$ | $\\frac{4}{\\sqrt{6}}$ | $15°$ | $1.63\\angle 15°$ |

> **🎨 Skizze:** Zeichne den Einheitskreis. $z_3$ liegt am nächsten am Ursprung mit $15°$, $z_2$ etwas weiter außen mit $30°$, $z_1$ ist am weitesten entfernt auf der $45°$-Winkelhalbierenden.

[STEP]
### 🧮 (c) Schritt 5: $z^6 = 8(1+j)$ — Polarform der rechten Seite

Zuerst die rechte Seite in Polarform:

$1+j$: Betrag $\\sqrt{2}$, Winkel $\\frac{\\pi}{4}$

$$8(1+j) = 8 \\cdot \\sqrt{2}\\angle\\frac{\\pi}{4} = \\boxed{8\\sqrt{2}\\angle\\frac{\\pi}{4}}$$

> **💡 $8\\sqrt{2} = 2^3 \\cdot 2^{1/2} = 2^{7/2}$** — merk dir das für später!

**Nach de Moivre:**
$$z^6 = 8\\sqrt{2}\\angle\\frac{\\pi}{4} \\implies z = \\sqrt[6]{8\\sqrt{2}}\\angle\\frac{\\frac{\\pi}{4} + 2k\\pi}{6}$$

[STEP]
### 🎯 (c) Schritt 6: Alle 6 Lösungen

**Betrag:**
$$r = \\sqrt[6]{8\\sqrt{2}} = \\sqrt[6]{2^{7/2}} = 2^{7/12}$$

**Winkel** für $k = 0, 1, 2, 3, 4, 5$:
$$\\varphi_k = \\frac{\\frac{\\pi}{4} + 2k\\pi}{6} = \\frac{\\pi + 8k\\pi}{24} = \\frac{(8k+1)\\pi}{24}$$

| $k$ | Winkel | Grad |
|-----|--------|------|
| 0 | $\\frac{\\pi}{24}$ | $7.5°$ |
| 1 | $\\frac{9\\pi}{24} = \\frac{3\\pi}{8}$ | $67.5°$ |
| 2 | $\\frac{17\\pi}{24}$ | $127.5°$ |
| 3 | $\\frac{25\\pi}{24}$ | $187.5°$ |
| 4 | $\\frac{33\\pi}{24} = \\frac{11\\pi}{8}$ | $247.5°$ |
| 5 | $\\frac{41\\pi}{24}$ | $307.5°$ |

Die 6 Punkte liegen gleichmäßig ($60°$-Abstand) auf einem Kreis mit Radius $2^{7/12}$.

[RESULT]
$$\\boxed{z_3 = \\frac{2\\sqrt{6}}{3}\\angle\\frac{\\pi}{12},\\quad z_1 = 2\\sqrt{10}(1+j),\\quad z_k = 2^{7/12}\\angle\\frac{(8k+1)\\pi}{24}\\;(k=0,\\ldots,5)}$$
[GUIDED_END]

---

> ## ✨ Das haben wir gelernt
>
> | Operation | Polarform | Normalform |
> |-----------|-----------|------------|
> | **Multiplikation** | $r_1r_2\\angle(\\varphi_1+\\varphi_2)$ | Ausmultiplizieren |
> | **Division** | $\\frac{r_1}{r_2}\\angle(\\varphi_1-\\varphi_2)$ | Mit Konjugiertem erweitern |
> | **Potenz** (de Moivre) | $r^n\\angle(n\\varphi)$ | Wiederholtes Multiplizieren |
> | **Wurzel** ($n$-te) | $\\sqrt[n]{r}\\angle\\frac{\\varphi+2k\\pi}{n}$ | Nur für kleine $n$ praktikabel |`,
  },
];
