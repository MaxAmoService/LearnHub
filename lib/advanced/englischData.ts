import { Module } from "../types";

export const advEnglischModule: Module = {
  id: "adv-englisch", slug: "adv-englisch",
  title: "Technical English",
  description: "False Cognates, Reading & Listening Comprehension, Technical Vocabulary, Scientific Writing, Grammar — mit Übungstest.",
  icon: "🇬🇧", color: "#3B82F6", progress: 0, category: "advanced",
  lessons: [
    {
      id: "eng-false-cognates", title: "False Cognates — False Friends", duration: "30 min", type: "text",
      content: `## False Cognates

Wörter, die ähnlich klingen aber unterschiedliche Bedeutung haben.

### Allgemeine False Friends

| Deutsch | Englische Verwechslung | Tatsächliche Bedeutung | Richtig |
|---------|----------------------|----------------------|--------|
| bekommen | become | werden | receive, get |
| aktuell | actual | tatsächlich | current |
| sensibel | sensible | vernünftig | sensitive |
| Gift | gift | Geschenk | poison |
| Fabrik | fabric | Stoff | factory |
| Chef | chef | Koch | boss |
| Mappe | map | Landkarte | folder |
| Rat | rat | Ratte | advice |
| Brand | brand | Marke | fire |
| See | see | sehen | lake/sea |
| Feld | field (ok) | — | field |
| Haus | house (ok) | — | house |

### Besonders tückische False Friends

| Deutsch | Falsch | Richtig | Beispiel |
|---------|--------|--------|----------|
| eventuell | eventually | possibly, potentially | "Eventually" = schließlich! |
| giftig | gifted | poisonous, toxic | "Gifted" = begabt! |
| diskret | discrete | discreet | "Discrete" = getrennt, diskret (Mathe) |
| schlimm | slim | bad, terrible | "Slim" = schlank! |
| bald | bald | soon | "Bald" = kahlköpfig! |
| stark | stark | strong, intense | "Stark" = kahl, völlig! |
| sensible | sensible | reasonable | "Sensible" = vernünftig ≠ sensibel! |
| sympathisch | sympathetic | likeable, friendly | "Sympathetic" = mitfühlend! |
| genial | genial | brilliant, ingenious | "Genial" = herzlich! |
| ordinär | ordinary | vulgar, crude | "Ordinary" = gewöhnlich! |

### Technisch besonders gefährlich

| Deutsch | Falsch | Richtig | Kontext |
|---------|--------|--------|---------|
| Steuerung | taxation | control | Technische Systeme |
| Regler | ruler | controller | Automatisierung |
| Leitung | guidance | cable/line, conductor | Elektrotechnik |
| Auflösung | dissolution | resolution | Displays, Sensoren |
| Probe | probe | sample, test, audition | Labor, Qualitätskontrolle |
| realisieren | realize | become aware of | "Realize" = erkennen ≠ umsetzen! |
| konventionell | conventional | traditional, standard | Conventional = herkömmlich ✓ (zufällig richtig!) |

### Merksprüche

> "I become a gift from my chef" = "Ich WERDE ein Geschenk von meinem Koch"!

> "The slim bald man has a stark problem" = "Der schlanke kahlköpfige Mann hat ein kahles Problem"!

### Strategie

1. **Im Zweifel nachschlagen** — nie raten
2. **Kontext beachten** — manche False Friends sind nur in bestimmten Kontexten falsch
3. **Lernkarten** mit Beispielsätzen statt isolierten Wortpaaren`,
    },
    {
      id: "eng-reading", title: "Reading Comprehension", duration: "40 min", type: "text",
      content: `## Reading Comprehension

### Strategien

- **Skimming:** Überfliegen für Hauptthema (Überschriften, erste/letzte Sätze pro Absatz)
- **Scanning:** Gezielt nach Information suchen (Zahlen, Namen, Keywords)
- **Intensive Reading:** Detailverständnis für komplexe Abschnitte

### Typische Fragetypen

1. **Main Idea:** Worum geht es hauptsächlich?
2. **Detail:** Welche Aussage ist laut Text richtig?
3. **Inference:** Was kann man schließen (nicht direkt im Text)?
4. **Vocabulary:** Was bedeutet Wort X in Zeile Y?
5. **Author's Purpose:** Was ist die Absicht des Autors?

### Signalwörter

| Funktion | Wörter |
|----------|--------|
| Kontrast | however, but, although, whereas, nevertheless |
| Ursache/Wirkung | therefore, thus, consequently, because, hence |
| Aufzählung | first, furthermore, moreover, in addition |
| Beispiel | for example, such as, e.g., for instance |
| Zusammenfassung | in conclusion, to summarize, overall |
| Vergleich | similarly, likewise, in contrast |

### Übungstext: Semiconductor Manufacturing

*Lesen Sie den folgenden Text und beantworten Sie die Fragen.*

**The Semiconductor Fabrication Process**

A semiconductor chip begins its life as a thin, circular slice of crystalline silicon called a **wafer**. The wafer undergoes a series of complex steps to become a functioning **electric circuit**.

The process starts with **photolithography**: a light-sensitive chemical called photoresist is applied as a **film layer** onto the wafer surface. Ultraviolet light is then projected through a mask containing the circuit pattern. Where the light hits, the photoresist hardens.

The next step is **etching**: the unexposed photoresist is removed, and the underlying material is chemically dissolved, creating the physical structure of the circuit. This process is repeated multiple times, building up layers.

**Metrology** — the science of measurement — plays a critical role throughout fabrication. Each layer must be measured with nanometer precision to ensure proper **conductivity** and **retention** of electrical signals. Advanced optical and electron-beam tools verify that every feature meets specification.

**Diffusion** occurs when dopant atoms are introduced into the silicon to alter its electrical properties. By controlling the concentration and depth of diffusion, engineers create the p-type and n-type regions that form transistors.

Modern chips contain billions of transistors, each just a few nanometers wide. The entire process from raw wafer to finished chip can take several weeks and involves over 500 individual steps.

**Fragen:**

**1.** What is a wafer?
A) A circuit pattern
B) A thin circular slice of crystalline silicon
C) A photoresist chemical
D) An etching tool

Richtig: **B.**

**2.** What does photolithography do?
A) Removes material from the wafer
B) Transfers circuit patterns onto the wafer using light
C) Measures nanometer precision
D) Introduces dopant atoms

Richtig: **B.** Light + mask + photoresist = pattern transfer.

**3.** What is etching?
A) Applying photoresist
B) Measuring circuit features
C) Removing material to create physical structures
D) Adding dopant atoms

Richtig: **C.**

**4.** Why is metrology important in semiconductor fabrication?
A) To cut the wafer
B) To ensure each layer meets nanometer precision specifications
C) To apply the photoresist
D) To speed up production

Richtig: **B.**

**5.** What does diffusion do?
A) Removes layers
B) Applies photoresist
C) Alters electrical properties by introducing dopant atoms
D) Measures conductivity

Richtig: **C.** Dopant atoms create p-type/n-type regions.

### Vokabular aus dem Text

| Englisch | Deutsch |
|----------|---------|
| wafer | Scheibe (Silizium) |
| etching | Ätzen |
| film layer | Schicht |
| electric circuit | Elektrische Schaltung |
| photolithography | Fotolithografie |
| retention | Beibehaltung, Speicherung |
| conductivity | Leitfähigkeit |
| metrology | Messtechnik |
| diffusion | Diffusion |
| dopant | Dotierstoff |
| photoresist | Fotolack |
| mask | Maske (Schablone) |`,
    },
    {
      id: "eng-listening", title: "Listening Comprehension", duration: "30 min", type: "text",
      content: `## Listening Comprehension

### Strategien

1. **Vor dem Hören:** Thema identifizieren, Vorwissen aktivieren, Fragen überfliegen
2. **Während:** Keywords notieren, nicht jedes Wort verstehen wollen, auf Signalwörter achten
3. **Nachher:** Notizen strukturieren, Lücken logisch füllen

### Technische Akronyme & Abkürzungen

| Akronym | Bedeutung | Kontext |
|---------|----------|---------|
| R&D | Research and Development | Forschung |
| POC | Proof of Concept | Prototyping |
| MVP | Minimum Viable Product | Startups |
| API | Application Programming Interface | Software |
| IoT | Internet of Things | Embedded Systems |
| AI/ML | Artificial Intelligence / Machine Learning | KI |
| QA | Quality Assurance | Testing |
| CI/CD | Continuous Integration / Deployment | DevOps |
| REST | Representational State Transfer | Web APIs |
| CRUD | Create, Read, Update, Delete | Datenbanken |
| CPU | Central Processing Unit | Hardware |
| GPU | Graphics Processing Unit | Parallel Computing |
| RAM | Random Access Memory | Speicher |
| SSD | Solid State Drive | Storage |
| HTTP | Hypertext Transfer Protocol | Netzwerk |
| JSON | JavaScript Object Notation | Datenformat |
| XML | Extensible Markup Language | Datenformat |
| UML | Unified Modeling Language | Software Design |
| DNS | Domain Name System | Netzwerk |
| TLS | Transport Layer Security | Sicherheit |
| SSH | Secure Shell | Remote Access |
| ORM | Object-Relational Mapping | Datenbanken |
| SOLID | Single Responsibility, Open-Closed, ... | OOP Prinzipien |
| FIFO | First In First Out | Datenstrukturen |
| LIFO | Last In First Out | Stack |

### Aussprache-Hinweise

| Wort | Häufiger Fehler | Richtig |
|------|----------------|---------|
| cache | /kætʃeɪ/ | /kæʃ/ |
| data | /dætə/ | /deɪtə/ (US) oder /dɑːtə/ (UK) |
| route | /rɔːt/ | /ruːt/ (US) oder /raʊt/ (UK) |
| suite | /suːt/ | /swiːt/ |
| kernel | /kɜːnəl/ | /kɜːrnəl/ |
| query | /kwaɪəri/ | /kwɪəri/ |
| queue | /kjuː/ | /kjuː/ |
| boolean | /bʊliːən/ | /buːliːən/ |

### Cornell-Notizmethode

Blatt in 3 Bereiche: **Keywords** (links), **Notes** (rechts), **Summary** (unten).

Während Vorlesung: rechte Spalte füllen.
Danach: Keywords + Summary ergänzen.

**Vorteil:** Strukturierte Notizen, einfache Wiederholung.

### Typische Redewendungen in Vorträgen

| Situation | Phrase |
|-----------|--------|
| Einleitung | "Good morning, today I'd like to present..." |
| Gliederung | "I'll start with... then move on to... finally..." |
| Übergang | "Moving on to the next point..." |
| Betonung | "It's important to note that..." |
| Beispiel | "Let me give you an example..." |
| Zusammenfassung | "To sum up... / In conclusion..." |
| Fragen | "Does anyone have questions?" |`,
    },
    {
      id: "eng-vocabulary", title: "Technical Vocabulary", duration: "35 min", type: "text",
      content: `## Fachwortschatz

### Informatik

| Deutsch | Englisch | Beispiel |
|---------|----------|----------|
| Anforderung | requirement | "The functional requirement states..." |
| Schnittstelle | interface | "The API provides a REST interface" |
| Laufzeit | runtime / execution time | "The runtime complexity is O(n log n)" |
| Speicher | memory (RAM) / storage (HDD/SSD) | "Main memory vs. secondary storage" |
| Datenbank | database | "The database stores user data" |
| Netzwerk | network | "The network latency increased" |
| Schicht | layer | "The OSI model has seven layers" |
| Verschlüsselung | encryption | "AES encryption is widely used" |
| Verfahren | method / algorithm / procedure | "The sorting algorithm uses..." |
| Zuverlässigkeit | reliability | "System reliability is critical" |
| Verfügbarkeit | availability | "99.9% uptime availability" |
| Wartbarkeit | maintainability | "Code maintainability improves with tests" |
| Knoten | node (Baum) / vertex (Graph) | "Each node has two children" |
| Kante | edge (Graph) | "A directed edge from A to B" |
| Pfad | path | "The shortest path algorithm..." |
| Zyklus | cycle | "The graph contains a cycle" |
| Stapel | stack | "Push onto the stack" |
| Warteschlange | queue | "Enqueue the element" |
| Hashwert | hash value | "Compute the hash value" |
| Baumstruktur | tree structure | "A balanced binary tree" |

### Mathematik

| Deutsch | Englisch | Beispiel |
|---------|----------|----------|
| Gleichung | equation | "Solve the equation for x" |
| Ableitung | derivative | "The first derivative is..." |
| Integral | integral | "Compute the definite integral" |
| Grenzwert | limit | "The limit approaches infinity" |
| Beweis | proof | "We prove by induction that..." |
| Menge | set | "The set of natural numbers" |
| Eigenwert | eigenvalue | "The eigenvalue decomposition" |
| Wahrscheinlichkeit | probability | "The probability of event A" |
| Vektor | vector | "A vector in R^n" |
| Matrix | matrix | "Multiply the matrices" |
| Determinante | determinant | "The determinant is non-zero" |
| Konvergenz | convergence | "The series converges to..." |

### Elektrotechnik

| Deutsch | Englisch | Beispiel |
|---------|----------|----------|
| Spannung | voltage | "The voltage across the resistor" |
| Stromstärke | current | "The current flowing through..." |
| Widerstand | resistance | "Ohm's law: V = I × R" |
| Leistung | power | "Power consumption in watts" |
| Kapazität | capacitance | "The capacitor has a capacity of..." |
| Induktivität | inductance | "The inductor stores energy" |
| Frequenz | frequency | "Operating frequency: 2.4 GHz" |
| Schaltung | circuit | "The circuit diagram shows..." |
| Welle | wave | "Electromagnetic wave propagation" |
| Signal | signal | "The signal-to-noise ratio" |

### Präsentations-Phrasen

**Einleitung:**
- "Good morning everyone. Today I'd like to talk about..."
- "My presentation is divided into three parts..."

**Übergang:**
- "Moving on to the next point..."
- "This brings us to..."

**Ergebnisse:**
- "As you can see from the graph..."
- "The results show that..."

**Fazit:**
- "To sum up... / In conclusion..."
- "Thank you for your attention. Are there any questions?"

**Fragen beantworten:**
- "That's an interesting question."
- "Could you clarify what you mean by...?"
- "Does that answer your question?"`,
    },
    {
      id: "eng-scientific", title: "Scientific Writing", duration: "30 min", type: "text",
      content: `## Scientific Writing

### IMRaD-Struktur

| Section | Inhalt | Typische Länge |
|---------|--------|---------------|
| **I**ntroduction | Warum? Kontext, Forschungslücke, Ziel | 15-20% |
| **M**ethods | Wie? Aufbau, Algorithmus, Materialien | 25-30% |
| **R**esults | Was kam raus? Daten, Tabellen, Graphen | 25-30% |
| **D**iscussion | Was bedeutet das? Interpretation, Limitationen | 20-25% |

### Abstract (~200 Wörter)

1. Background (1-2 Sätze)
2. Problem / Forschungslücke
3. Method
4. Wichtigste Results
5. Conclusion

**Beispiel:**
> This paper presents a novel approach to real-time object detection in autonomous vehicles. While existing methods achieve high accuracy, they fail to meet latency requirements for safety-critical applications. We propose a lightweight CNN architecture with attention mechanisms that processes 60 FPS on embedded hardware. Experimental results on the KITTI benchmark show 92.3% mAP at 16ms inference time, outperforming existing real-time methods by 4.1%. Our approach enables reliable object detection within safety-critical time constraints.

### Active vs. Passive Voice

| Stimme | Beispiel | Verwendung |
|--------|----------|-----------|
| Passive | "The experiment was conducted..." | Traditionell, formell |
| Active | "We conducted the experiment..." | Modern, direkter |

> Moderne Papers bevorzugen **Active Voice** — klarer und direkter.

**Regel:** Passive wenn Handlung wichtiger als Akteur. Active wenn Klarheit gewünscht.

### Artikelgebrauch (a, an, the)

**The** (definite): Bekannt, bereits erwähnt, einzigartig.
- "The algorithm outperforms..." (spezifischer Algorithmus)
- "The Internet" (einzigartig)

**A/An** (indefinite): Unbekannt, allgemein.
- "A neural network was trained..." (erste Erwähnung)
- "An approach to solving..."

**Kein Artikel:** Allgemeine Konzepte, Plural.
- "Neural networks are widely used..."
- "Machine learning has transformed..."

### Häufige Fehler (Deutsche Muttersprachler)

| Falsch | Richtig | Erklärung |
|--------|---------|-----------|
| "The data is..." | "The data are..." | Data = Plural (datum) |
| "This allows to..." | "This allows us to..." | Allow + Objekt + to |
| "As already mentioned..." | "As mentioned above..." | "Already" hier unüblich |
| "Informations" | "Information" | Kein Plural im Englischen |
| "Researches" | "Research" / "Studies" | Research = unzählbar |
| "It exists a problem" | "There exists a problem" | "It" ≠ "There" |
| "Do a mistake" | "Make a mistake" | Make, nicht do |
| "Dependent on" | "Dependent on" ✓ | Aber: "dependence on" |
| "In the following" | "In the following section" | Kompletter Satz nötig |
| "Beamer" | "projector" | Beamer = nur Deutsch! |

### Übung: Korrigieren Sie die Fehler

1. ❌ "The data is shown in figure 3."
   ✅ "The data are shown in Figure 3."

2. ❌ "This allows to process the signal."
   ✅ "This allows us to process the signal."

3. ❌ "We have done an experiment with five researches."
   ✅ "We conducted an experiment with five studies."

4. ❌ "The system is dependent from the input."
   ✅ "The system is dependent on the input."`,
    },
    {
      id: "eng-grammar", title: "Grammar for Technical Writing", duration: "30 min", type: "text",
      content: `## Grammar for Technical Writing

### Passive Voice Rules

**Bildung:** Subject + to be (konjugiert) + Past Participle

| Tense | Aktiv | Passiv |
|-------|-------|--------|
| Simple Present | "We test the software" | "The software is tested" |
| Simple Past | "We tested the software" | "The software was tested" |
| Present Perfect | "We have tested the software" | "The software has been tested" |
| Future | "We will test the software" | "The software will be tested" |
| Modal | "We must test the software" | "The software must be tested" |

**Wann Passiv verwenden?**
1. Akteur unbekannt oder unwichtig: "The server was restarted."
2. Fokus auf Ergebnis: "The data were analyzed."
3. Wissenschaftlicher Stil: "The experiment was conducted."
4. Allgemeine Wahrheit: "English is spoken in many countries."

**Wann NICHT Passiv?**
- Wenn Klarheit nötig ist: "We analyzed the data" statt "The data were analyzed"
- In Anleitungen: "Click the button" nicht "The button should be clicked"

### Conditional Sentences

| Typ | Struktur | Beispiel | Wahrscheinlichkeit |
|-----|----------|----------|-------------------|
| Type 0 | If + Present, Present | "If you heat water, it boils" | Fakt |
| Type 1 | If + Present, will + Verb | "If the test passes, we deploy" | Realistisch |
| Type 2 | If + Past, would + Verb | "If we had more time, we would test more" | Unwahrscheinlich |
| Type 3 | If + Past Perfect, would have + PP | "If we had tested, we would have found the bug" | Vergangenheit |

### Articles in Technical Writing

**Immer "the":**
- Einzigartige Dinge: "the Internet", "the CPU"
- Spezifische: "the algorithm described in Section 3"
- Superlative: "the fastest method"

**Immer "a/an":**
- Erste Erwähnung: "We propose a novel approach"
- Beruf/Rolle: "She is an engineer"

**Kein Artikel:**
- Allgemeine Konzepte: "Machine learning is..."
- Plural allgemein: "Algorithms solve problems"
- Länder (meist): "Germany", "France"
- Sprachen: "English", "German"

### Common Collocations

| Verb + Noun | Beispiel |
|-------------|----------|
| conduct an experiment | "We conducted an experiment..." |
| achieve a result | "The algorithm achieves..." |
| obtain data | "We obtained data from..." |
| derive an equation | "The equation is derived from..." |
| perform an analysis | "We performed a statistical analysis" |
| propose a method | "We propose a novel method" |
| demonstrate that | "The results demonstrate that..." |
| investigate whether | "We investigated whether..." |
| significant improvement | "a significant improvement over..." |
| state-of-the-art | "state-of-the-art performance" |

### Hedging (Vorsicht ausdrücken)

| Stark | Mittel | Vorsichtig |
|-------|--------|-----------|
| "The results show..." | "The results suggest..." | "The results may indicate..." |
| "This proves..." | "This indicates..." | "This could suggest..." |
| "We found that..." | "We observed that..." | "It appears that..." |

**Wissenschaftlicher Stil:** Oft mittel-vorsichtig, nie übertrieben sicher.

### Übung: Passiv umformen

1. Aktiv: "The researchers developed a new algorithm."
   Passiv: "A new algorithm was developed."

2. Aktiv: "We must optimize the code."
   Passiv: "The code must be optimized."

3. Aktiv: "The company has released an update."
   Passiv: "An update has been released."`,
    },
    {
      id: "eng-klausur", title: "Übungstest — 20 Fragen", duration: "50 min", type: "quiz", examMode: true,
      content: `## Technical English — Übungstest (20 Fragen)

### Frage 1
"bekommen" auf Englisch?
A) to become
B) to receive
C) to arrive
D) to belong

Richtig: **B.** Become = werden.

### Frage 2
"Fabrik" = ?
A) fabric
B) factory
C) fabrication
D) fabulous

Richtig: **B.** Fabric = Stoff.

### Frage 3
"aktuell" = ?
A) actual
B) current
C) acute
D) accurate

Richtig: **B.** Actual = tatsächlich.

### Frage 4
IMRaD = ?
A) Internet, Media, Radio, Data
B) Introduction, Methods, Results, Discussion
C) Information, Measurement, R&D
D) Input, Modification, Retrieval, Deletion

Richtig: **B.**

### Frage 5
"Regler" technisch = ?
A) ruler
B) regulator
C) controller
D) register

Richtig: **C.** Ruler = Lineal.

### Frage 6
Kontrast-Signalwort?
A) furthermore
B) therefore
C) however
D) moreover

Richtig: **C.**

### Frage 7
"Zuverlässigkeit" = ?
A) reliability
B) availability
C) responsibility
D) maintainability

Richtig: **A.** MTBF.

### Frage 8
Modern Scientific Writing bevorzugt...
A) Passive Voice
B) Active Voice
C) Deutsche Satzstellung
D) Nur Passive

Richtig: **B.**

### Frage 9
"Gift" auf Englisch?
A) gift
B) poison
C) donation
D) lift

Richtig: **B.** Gift (EN) = Geschenk!

### Frage 10
API = ?
A) Automated Processing Interface
B) Application Programming Interface
C) Advanced Protocol Integration
D) Application Process Integration

Richtig: **B.**

### Frage 11
"The data..." korrekt?
A) is
B) are
C) am
D) be

Richtig: **B.** Data = Plural von datum.

### Frage 12
"eventuell" = ?
A) eventually
B) possibly
C) evenly
D) every time

Richtig: **B.** Eventually = schließlich.

### Frage 13
Cornell Method für...
A) Kochen
B) Notizen machen
C) Programmieren
D) Fertigung

Richtig: **B.**

### Frage 14
"Leistung" (elektrisch) = ?
A) performance
B) power
C) leadership
D) leakage

Richtig: **B.** Power (Watt).

### Frage 15
CI/CD = ?
A) Computer Integration / Computer Design
B) Continuous Integration / Continuous Deployment
C) Central Interface / Central Database
D) Code Inspection / Code Delivery

Richtig: **B.**

### Frage 16
"diskret" = ?
A) discrete
B) discreet
C) discrete AND discreet
D) je nach Kontext

Richtig: **D.** Discrete (Mathe: getrennt) ≠ discreet (vorsichtig).

### Frage 17
Passiv: "We tested the software."
A) The software is tested.
B) The software was tested.
C) The software has been tested.
D) The software tested.

Richtig: **B.** Simple Past Passiv.

### Frage 18
"probe" (Labor) = ?
A) probe
B) sample
C) test
D) B und C

Richtig: **D.** Probe (EN) = Sondierung, nicht Laborprobe.

### Frage 19
Hedging: Am vorsichtigsten?
A) "The results show..."
B) "The results suggest..."
C) "The results may indicate..."
D) "The results prove..."

Richtig: **C.** "May indicate" = am vorsichtigsten.

### Frage 20
"realisieren" = ?
A) realize
B) implement
C) become aware of
D) B und C je nach Kontext

Richtig: **D.** Realize = erkennen ≠ umsetzen. Implement = umsetzen.`,
    },
  ],
};
