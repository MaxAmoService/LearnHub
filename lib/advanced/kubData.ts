import { Module } from "../types";

export const advKubModule: Module = {
  id: "adv-kub",
  slug: "adv-kub",
  title: "Kommunikationstechnik und Bussysteme (KuB)",
  description: "Nachrichtentechnik, Modulation, digitale Übertragung und leitungsgebundene Kommunikation",
  icon: "📡",
  color: "#EF4444",
  progress: 0,
  category: "advanced",
  lessons: [
    {
      id: "kub-1",
      title: "Grundlagen der Nachrichtentechnik",
      duration: "30 min",
      type: "text",
      content: `## Grundlagen der Nachrichtentechnik

### Signale

Ein **Signal** ist eine physikalische Größe, die Information überträgt.

| Typ | Beschreibung | Beispiel |
|---|---|---|
| Analog | Stetig in Zeit und Amplitude | Sprachsignal |
| Digital | Diskret in Zeit und/oder Amplitude | Binärsignal |
| Periodisch | Wiederholt sich regelmäßig | Sinussignal |
| Aperiodisch | Keine Wiederholung | Einzelimpuls |

### Sinussignal

$$x(t) = A \\cdot \\sin(2\\pi f t + \\varphi)$$

| Parameter | Bedeutung | Einheit |
|---|---|---|
| $A$ | Amplitude | V, A, W |
| $f$ | Frequenz | Hz (1/s) |
| $T = \\frac{1}{f}$ | Periode | s |
| $\\omega = 2\\pi f$ | Kreisfrequenz | rad/s |
| $\\varphi$ | Phase | rad |

### Modulation

**Modulation** ist das Aufmodulieren eines Nutzsignals auf einen Träger.

| Verfahren | Formel | Bandbreite |
|---|---|---|
| **AM** (Amplitudenmodulation) | $s(t) = [A_0 + m(t)] \\cdot \\cos(2\\pi f_c t)$ | $2 \\cdot B$ |
| **FM** (Frequenzmodulation) | $s(t) = A_0 \\cdot \\cos\\left(2\\pi f_c t + k_f \\int m(t) dt\\right)$ | Breitband |
| **PM** (Phasenmodulation) | $s(t) = A_0 \\cdot \\cos(2\\pi f_c t + k_p m(t))$ | Breitband |

### Bandbreite

Die **Bandbreite** eines Signals ist der Frequenzbereich, den es belegt.

- **Baseband:** Signal bei $f = 0$ (z.B. Digitalsignal)
- **Bandpass:** Signal um eine Trägerfrequenz (z.B. moduliertes Signal)

**Shannon-Hartley-Theorem:**
$$C = B \\cdot \\log_2\\left(1 + \\frac{S}{N}\\right)$$

wobei $C$ = Kapazität (bit/s), $B$ = Bandbreite (Hz), $S/N$ = Signal-Rausch-Verhältnis.

### Dezibel (dB)

$$L_{dB} = 10 \\cdot \\log_{10}\\left(\\frac{P_1}{P_2}\\right)$$

| Verhältnis | dB |
|---|---|
| 1 | 0 dB |
| 2 | 3 dB |
| 10 | 10 dB |
| 100 | 20 dB |
| 1000 | 30 dB |
`,
    },
    {
      id: "kub-2",
      title: "Digitale Übertragung",
      duration: "30 min",
      type: "text",
      content: `## Digitale Übertragung

### Abtastung (Sampling)

Das **Abtasttheorem (Nyquist-Shannon)** besagt:

$$f_s \\geq 2 \\cdot f_{\\max}$$

Die Abtastfrequenz muss mindestens doppelt so hoch sein wie die höchste vorkommende Frequenz.

| Abtastung | Ergebnis |
|---|---|
| $f_s > 2 f_{\\max}$ | Kein Aliasing, exakte Rekonstruktion |
| $f_s = 2 f_{\\max}$ | Grenzfall (theoretisch ok) |
| $f_s < 2 f_{\\max}$ | Aliasing — Information geht verloren |

### Quantisierung

**Quantisierung** ordnet kontinuierliche Amplitudenwerte diskreten Stufen zu.

$$\\text{Anzahl Stufen} = 2^n$$ (bei $n$ Bit)

**Quantisierungsrauschen:**
$$\\text{SNR} = 6{,}02n + 1{,}76 \\text{ dB}$$

| Bits | Stufen | SNR |
|---|---|---|
| 8 | 256 | ~49 dB |
| 16 | 65.536 | ~98 dB |
| 24 | 16.777.216 | ~146 dB |

### Leitungscodierung

| Code | Beschreibung | Eigenschaft |
|---|---|---|
| **NRZ** (Non-Return-to-Zero) | +U für 1, -U für 0 | Einfach, DC-Anteil |
| **RZ** (Return-to-Zero) | Impuls + Rückkehr zu 0 | Kein DC, mehr Bandbreite |
| **Manchester** | 1: ↑, 0: ↓ (in Mitte) | Selbsttaktend |
| **AMI** (Alternate Mark Inversion) | 1: abwechselnd +1/-1 | Kein DC-Anteil |
| **4B/5B** | 4 Bit → 5 Bit Symbol | Keine langen 0-Folgen |

### Bitfehlerrate (BER)

$$\\text{BER} = \\frac{\\text{fehlerhafte Bits}}{\\text{gesendete Bits}}$$

### Fehlerkorrektur

| Verfahren | Beschreibung |
|---|---|
| **Paritätsbit** | Erkennung von 1-Bit-Fehlern |
| **Hamming-Code** | Erkennung und Korrektur von 1-Bit-Fehlern |
| **CRC** (Cyclic Redundancy Check) | Erkennung von Burst-Fehlern |
| **Reed-Solomon** | Korrektur mehrerer Fehler |
`,
    },
    {
      id: "kub-3",
      title: "Leitungsgebundene Übertragung",
      duration: "30 min",
      type: "text",
      content: `## Leitungsgebundene Übertragung

### Übertragungsmedien

| Medium | Bandbreite | Reichweite | Typischer Einsatz |
|---|---|---|---|
| **Twisted Pair (UTP/STP)** | bis 10 Gbps | ~100 m | LAN (Ethernet) |
| **Koaxialkabel** | bis 1 Gbps | ~500 m | Kabel-TV, alte LANs |
| **Lichtwellenleiter (LWL)** | bis 100+ Gbps | km bis 100 km | Backbone, WAN |

### Twisted Pair

**Kategorien:**

| Kat. | Standard | Bandbreite |
|---|---|---|
| Cat 5 | 100BASE-TX | 100 Mbps |
| Cat 5e | 1000BASE-T | 1 Gbps |
| Cat 6 | 10GBASE-T | 10 Gbps (55m) |
| Cat 6a | 10GBASE-T | 10 Gbps (100m) |
| Cat 7 | 10GBASE-T | 10 Gbps (屏蔽) |
| Cat 8 | 25/40GBASE-T | 25/40 Gbps (30m) |

**UTP** (Unshielded Twisted Pair) vs. **STP** (Shielded Twisted Pair):
- UTP: günstiger, flexibler
- STP: besserer Schutz gegen EMI

### Koaxialkabel

**Aufbau:** Innenleiter → Isolierung → Abschirmung → Mantel

| Typ | Impedanz | Verwendung |
|---|---|---|
| RG-6 | 75 Ω | Kabel-TV, Satellit |
| RG-58 | 50 Ω | 10BASE2 (alt) |
| RG-213 | 50 Ω | Amateurfunk |

### Lichtwellenleiter (LWL)

| Typ | Kerndurchmesser | Moden | Reichweite |
|---|---|---|---|
| **Multimode (Stufenindex)** | 50/62.5 µm | Viele | ~2 km |
| **Multimode (Gradientenindex)** | 50/62.5 µm | Viele | ~5 km |
| **Singlemode** | 9 µm | Eine | 100+ km |

**Vorteile von LWL:**
- Sehr hohe Bandbreite
- Keine elektromagnetische Abstrahlung
- Geringe Dämpfung
- Unempfindlich gegen EMI

**Wellenlängen:**
- 850 nm (Multimode, kurz)
- 1310 nm (Singlemode, mittel)
- 1550 nm (Singlemode, lang, DWDM)

### Dämpfung

$$P_{\\text{out}} = P_{\\text{in}} \\cdot 10^{-\\alpha L / 10}$$

wobei $\\alpha$ = Dämpfungskoeffizient (dB/km), $L$ = Länge (km).

| Medium | Dämpfung |
|---|---|
| Twisted Pair | ~20 dB/km (bei 100 MHz) |
| Koaxialkabel | ~5 dB/km (bei 100 MHz) |
| LWL (Singlemode) | ~0.2 dB/km (bei 1550 nm) |
`,
    },
    {
      id: "kub-klausur",
      title: "Probeklausur Kommunikationstechnik",
      duration: "30 min",
      type: "quiz",
      examMode: true,
      content: `## Probeklausur: Kommunikationstechnik und Bussysteme

### Frage 1
Welche Abtastfrequenz wird für ein Signal mit $f_{\\max} = 6\\text{ kHz}$ benötigt?

A) 6 kHz
B) 8 kHz
C) 12 kHz
D) 24 kHz

Richtig: **C.** Nach dem Nyquist-Theorem: $f_s \\geq 2 f_{\\max} = 2 \\cdot 6\\text{ kHz} = 12\\text{ kHz}$.

---

### Frage 2
Was ist der Vorteil von Manchester-Kodierung?

A) Geringere Bandbreite
B) Selbsttaktend — Taktrückgewinnung aus dem Signal
C) Höhere Datenrate
D) Einfachere Implementierung

Richtig: **B.** Manchester-Kodierung ist selbsttaktend: In der Bitmitte findet immer ein Übergang statt, der zur Taktrückgewinnung genutzt werden kann.

---

### Frage 3
Wie viele Quantisierungsstufen gibt es bei 8 Bit?

A) 8
B) 64
C) 128
D) 256

Richtig: **D.** Bei $n$ Bit gibt es $2^n$ Stufen: $2^8 = 256$.

---

### Frage 4
Welches Übertragungsmedium hat die größte Reichweite?

A) Twisted Pair
B) Koaxialkabel
C) Multimode-LWL
D) Singlemode-LWL

Richtig: **D.** Singlemode-LWL erreicht Reichweiten von 100+ km, deutlich mehr als Multimode-LWL (~2-5 km), Koaxialkabel (~500 m) oder Twisted Pair (~100 m).

---

### Frage 5
Was besagt das Shannon-Hartley-Theorem?

A) Die maximale Datenrate ist $C = 2B \\log_2(M)$
B) Die Kanalkapazität ist $C = B \\log_2(1 + S/N)$
C) Die Bitfehlerrate ist umgekehrt proportional zur Bandbreite
D) Die Abtastfrequenz muss doppelt so hoch sein

Richtig: **B.** Das Shannon-Hartley-Theorem: $C = B \\cdot \\log_2(1 + S/N)$, wobei $B$ die Bandbreite und $S/N$ das Signal-Rausch-Verhältnis ist.

---

### Frage 6
Was ist der SNR bei einer Quantisierung mit 16 Bit?

A) ~49 dB
B) ~72 dB
C) ~98 dB
D) ~146 dB

Richtig: **C.** $\\text{SNR} = 6{,}02 \\cdot n + 1{,}76 = 6{,}02 \\cdot 16 + 1{,}76 \\approx 98\\text{ dB}$.
`,
    },
  ],
};
