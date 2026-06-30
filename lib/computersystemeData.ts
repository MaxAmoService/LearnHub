import { Module } from "./types";

// ============================================================================
// IHK "Computersysteme und Hardware" — Modul-Daten
// Quelle: IHK IT-Handbuch, PDF "Computersysteme und Hardware.pdf"
// ============================================================================

export const computersystemeModule: Module = {
  id: "ihk-computersysteme",
  slug: "ihk-computersysteme",
  title: "Computersysteme & Hardware",
  description:
    "IHK AP1/AP2: CPU-Architektur, Speicherhierarchie, Ein-/Ausgabegeräte, RAID, Betriebssysteme, Virtualisierung, Cloud, Green IT",
  icon: "🖥️",
  color: "#F59E0B",
  category: "ihk",
  progress: 0,

  merkblatt: `## Merkblatt: Computersysteme & Hardware (IHK)

### CPU-Architektur
- **Von-Neumann**: Programm und Daten im selben Speicher, sequenzieller Zugriff
- **ALU**: Rechenwerk — arithmetische und logische Operationen
- **Steuerwerk**: Koordiniert Befehlsablauf, liest Befehle aus Speicher
- **Register**: AX (Akku), BX (Basis), CX (Zähler), DX (Daten), PC (Befehlszähler), IR (Befehlsregister), MAR/MDR (Speicheradress-/Datenregister)
- **Maschinenzyklus**: Fetch (PC→MAR→Speicher→MDR→IR) → Decode → Execute
- **CISC**: Komplexe Befehle, variabel lang | **RISC**: Einfache Befehle, einheitlich lang
- **Multicore**: Mehrere physische Kerne | **Hyperthreading**: 1 Kern = 2 logische CPUs

### Busse & Taktfrequenz
- **Adressbus**: CPU→Speicher, bestimmt Adressraum (2^n Bytes)
- **Datenbus**: Bidirektional, Breite bestimmt Datenrate pro Takt
- **Steuerbus**: Signale wie Lesen/Schreiben/Interrupt
- **Taktfrequenz**: GHz — höher = mehr Befehle/Sekunde (aber Architektur zählt auch!)
- **CPI**: Cycles Per Instruction — Befehle pro Taktzyklus

### Speicherhierarchie (schnell → langsam)
Register → L1 (~64KB, ~1ns) → L2 (~256KB-1MB, ~4ns) → L3 (~4-32MB, ~10ns) → RAM (GB, ~100ns) → SSD (~0.1ms) → HDD (~5-10ms)
- **SRAM**: Schnell, teuer, für Cache (flip-flop) | **DRAM**: günstig, für RAM, Refresh nötig (Kondensator)
- **ROM**: Nur lesen, nicht flüchtig (BIOS/UEFI)

### Speicherverwaltung
- **Paging**: Feste Seiten (4KB), keine externe Fragmentierung, Page Table
- **Segmentierung**: Variable Segmente nach Programmstruktur, externe Fragmentierung
- **Virtueller Speicher**: Auslagerung auf Platte bei RAM-Mangel (Swap/Pagefile)
- **Endianness**: Big = MSB zuerst (Motorola) | Little = LSB zuerst (Intel/x86)
- **32-Bit**: max. 4 GB RAM | **64-Bit**: theoretisch 16 Exabyte

### Speichermedien & RAID
| Medium | Typ | Zugriff | Kapazität |
|--------|-----|---------|-----------|
| HDD | Magnetisch | ~5-10ms | bis 20TB |
| SSD | Halbleiter | ~0.1ms | bis 8TB |
| NVMe | Halbleiter (PCIe) | ~0.02ms | bis 8TB |
| CD/DVD | Optisch | ~100ms | 700MB/4.7GB |
| Blu-ray | Optisch | ~80ms | bis 128GB |

- **RAID 0**: Striping, 0 Redundanz, volle Kapazität
- **RAID 1**: Mirroring, 1 Platte darf ausfallen, 50% Kapazität
- **RAID 5**: Striping + verteilte Parität, mind. 3 Platten, 1 darf ausfallen
- **RAID 6**: Doppelte Parität, mind. 4 Platten, 2 dürfen ausfallen
- **RAID 10**: Mirror + Stripe, mind. 4 Platten, je 1 pro Mirror

### Betriebssysteme & Systemsoftware
- **Kernel**: Kern des OS, Hardware-Zugriff, Speicherverwaltung, Prozessverwaltung
- **Prozesse**: Programm + Ressourcen | **Threads**: leichtgewichtige Prozesse
- **Dateisysteme**: NTFS (Windows), ext4 (Linux), APFS (macOS)
- **Preemptive**: OS erzwingt Umschaltung | **Cooperativ**: Prozess gibt freiwillig ab
- **BIOS**: Legacy, MBR (max. 2TB), 16-Bit | **UEFI**: Modern, GPT (max. 9.4 ZB), 32/64-Bit

### Virtualisierung & Cloud
- **Typ-1 (Bare-Metal)**: Direkt auf Hardware (VMware ESXi, Hyper-V)
- **Typ-2 (Hosted)**: Auf Host-OS (VirtualBox, VMware Workstation)
- **Container**: Shared Kernel (Docker, Kubernetes) — leichter als VMs
- **IaaS**: Infrastruktur (AWS EC2) | **PaaS**: Plattform (Heroku) | **SaaS**: Software (Microsoft 365)
- **Public/Privat/Hybrid Cloud**

### Leistungsbewertung & Green IT
- **Amdahl**: Speedup = 1 / ((1-p) + p/n) — p=parallelisierbarer Anteil, n=Prozessoren
- **Benchmarks**: MIPS, FLOPS, PassMark, Geekbench
- **Rebound-Effekt**: Effizienzsteigerung → Mehrverbrauch
- **Kreislaufwirtschaft**: Reduce, Reuse, Recycle — Energie-Labels beachten

### BIOS/UEFI & Bootvorgang
- **POST**: Power-On Self-Test — Hardwareprüfung beim Einschalten
- **BIOS**: 16-Bit, MBR (max. 2TB), textbasiert | **UEFI**: 32/64-Bit, GPT (max. 9,4 ZB), grafisch
- **MBR**: 512 Byte, 4 primäre Partitionen, max. 2TB | **GPT**: 128 Partitionen, bis 9,4 ZB
- **ROM-Typen**: ROM → PROM → EPROM → EEPROM → Flash-EEPROM
- **Boot-Reihenfolge**: POST → BIOS/UEFI → MBR/GPT → Bootloader → Kernel → Login

### Serielle Datenübertragung
- **Seriell**: 1 Leitung, günstig, große Distanzen, hohe Taktfrequenzen (USB, SATA, Ethernet, PCIe pro Lane)
- **Parallel**: n Leitungen, kurze Distanzen, Signalversatz (PCIe, RAM, alt: Parallel-ATA)
- **8N1**: 8 Datenbits, keine Parität, 1 Stopp-Bit = 10 Bit/Rahmen
- **Parität**: Gerade/Ungerade — erkennt 1-Bit-Fehler
- **USB**: 1.0 (12 Mbit/s), 2.0 (480), 3.0 (5 Gbit/s), 3.2 (20), USB4 (40)

### Schnittstellen
- **SATA**: Seriell, 6 Gbit/s, HDD/SSD | **NVMe**: PCIe, 8 GB/s/Lane, High-End SSD
- **USB**: Universal Serial Bus — Hot-Plug, 5V Stromversorgung
- **Thunderbolt**: 40 Gbit/s, Display + Daten + Laden über 1 Kabel
- **PCIe**: Seriell pro Lane, x1/x4/x8/x16 — Grafikkarte, NVMe, Netzwerk
`,

  lessons: [
    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 1: CPU-Architektur & Von-Neumann
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-1",
      title: "CPU-Architektur & Von-Neumann",
      duration: "20 min",
      type: "interactive",
      interactive: "cpuArchitectureExplorer",
      content: `## Grundlagen: Was ist eine CPU?

> In diesem Modul lernst du die Hardware-Grundlagen kennen — von CPU und Speicher über Ein-/Ausgabegeräte bis zu Virtualisierung und Cloud. Diese Themen sind ein Kerngebiet der IHK-Prüfung!

Die CPU (Central Processing Unit) ist das "Gehirn" des Computers. Sie führt Befehle aus, die im Speicher abgelegt sind. Die meisten modernen Computer folgen der **Von-Neumann-Architektur** — ein Konzept aus dem Jahr 1945, das bis heute die Grundlage bildet.

> 💡 **Tipp:** Von-Neumann ist wie ein Koch, der sein Rezept (Programm) und seine Zutaten (Daten) im selben Regal (Speicher) lagert. Er muss abwechselnd Rezept und Zutaten holen — das ist der berühmte Von-Neumann-Flaschenhals.

## Die Von-Neumann-Architektur

Die vier Hauptkomponenten:

| Komponente | Aufgabe |
|-----------|---------|
| **CPU** | Befehle ausführen (ALU + Steuerwerk) |
| **Speicher** | Programme und Daten speichern |
| **Eingabe** | Daten in das System bringen |
| **Ausgabe** | Ergebnisse ausgeben |

Die CPU selbst besteht aus drei Kernbereichen:

### ALU (Arithmetic Logic Unit) — Das Rechenwerk
- Führt alle **Rechenoperationen** durch: Addition, Subtraktion, UND, ODER, NICHT
- Arbeitet mit Binärzahlen (0 und 1)
- Ergebnis landet im **Akku-Register (AX)**

### Steuerwerk (Control Unit)
- **Steuert** den gesamten Befehlsablauf
- Holt Befehle aus dem Speicher (**Fetch**)
- Interpretiert den Befehl (**Decode**)
- Weist die ALU an, was zu tun ist (**Execute**)

### Register — Die schnelle Zwischenablage
Register sind sehr schnelle Speicherzellen direkt in der CPU (Zugriffszeit unter 1 ns):

| Register | Name | Aufgabe |
|----------|------|---------|
| **AX** | Akkumulator | Rechenergebnisse |
| **BX** | Basisregister | Speicheradressen |
| **CX** | Zählerregister | Schleifenzähler |
| **DX** | Datenregister | I/O-Operationen |
| **PC** | Program Counter | Nächster Befehl |
| **IR** | Instruction Register | Aktueller Befehl |
| **MAR** | Memory Address Register | Adresse an Speicher |
| **MDR** | Memory Data Register | Daten vom/zum Speicher |

## Der Fetch-Decode-Execute-Zyklus

Jeder Befehl durchläuft drei Phasen — dieser Zyklus wiederholt sich Milliarden Mal pro Sekunde:

### Phase 1: Fetch (Holen)
1. **PC** enthält die Adresse des nächsten Befehls
2. Adresse wird ins **MAR** kopiert
3. Speicher liefert den Befehl über den Datenbus
4. Befehl landet im **IR** (Instruction Register)
5. **PC** wird um 1 erhöht

### Phase 2: Decode (Entschlüsseln)
1. **Steuerwerk** liest den Befehl aus dem **IR**
2. Opcode wird interpretiert: Was soll die CPU tun?
3. Operanden werden identifiziert (Register, Speicheradressen)

### Phase 3: Execute (Ausführen)
1. **ALU** führt die Operation durch
2. Ergebnis wird im Register oder Speicher abgelegt
3. Status-Flags werden gesetzt (Zero, Carry, Overflow)

> 💡 **IHK-Tipp:** Der Fetch-Decode-Execute-Zyklus ist ein Klassiker! Zeichne ihn als Flussdiagramm: PC → MAR → Speicher → MDR → IR → Decode → ALU → Ergebnis.

## CISC vs. RISC

| Merkmal | CISC | RISC |
|---------|------|------|
| Befehle | Komplex, variabel lang | Einfach, einheitlich lang |
| Ausführung | Mehrere Takte pro Befehl | 1 Befehl pro Takt (Pipeline) |
| Beispiel | Intel/AMD (x86) | ARM, Apple M-Serie |
| Philosophie | Weniger Befehle, mehr pro Befehl | Mehr Befehle, weniger pro Befehl |

## Multicore & Hyperthreading

- **Multicore**: Mehrere physische Kerne auf einem Chip → echte Parallelverarbeitung
- **Hyperthreading**: Ein physischer Kern wird als zwei logische Kerne dargestellt → bessere Auslastung, aber keine Verdopplung

> 💡 **Praxis-Tipp:** Ein 6-Kern-Prozessor mit Hyperthreading zeigt 12 logische CPUs im Task Manager. Das bedeutet nicht 12x so schnell, sondern besseres Multitasking.

> ⚠️ **Häufige Fehler:** "Mehr Kerne = schneller" — Falsch! Nur wenn die Software parallelisieren kann. Ein Single-Thread-Programm wird von 12 Kernen nicht profitieren.

> **Nächste Lektion:** Busse, Taktfrequenz & Befehlssatz — Wie verbindet sich die CPU mit dem Rest des Systems, und was bestimmt die tatsächliche Geschwindigkeit?

[INTERACTIVE]
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 2: Busse, Taktfrequenz & Befehlssatz
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-2",
      title: "Busse, Taktfrequenz & Befehlssatz",
      duration: "15 min",
      type: "text",
      content: `## Die drei Busse

> In der letzten Lektion haben wir die CPU-Architektur mit Von-Neumann, dem Fetch-Decode-Execute-Zyklus und CISC/RISC kennengelernt. Jetzt schauen wir uns an, wie die CPU mit dem Rest des Systems kommuniziert — über Busse und Taktfrequenz.

Busse sind die Verbindungsleitungen zwischen CPU, Speicher und Peripherie — vergleichbar mit Autobahnen für Daten:

> 📝 **Merksatz:** "**A**lle **D**aten **S**ind wichtig" — **A**dressbus, **D**atenbus, **S**teuerbus

### Adressbus
- Richtung: CPU → Speicher (einseitig)
- Bestimmt den **Adressraum**: $2^n$ adressierbare Bytes (n = Anzahl Leitungen)
- 20 Leitungen → 1 MB, 32 Leitungen → 4 GB, 48 Leitungen → 256 TB

### Datenbus
- Richtung: Bidirektional (CPU ↔ Speicher)
- Breite bestimmt, wie viele Bits pro Takt übertragen werden
- 8-Bit = 1 Byte/Takt, 64-Bit = 8 Bytes/Takt

### Steuerbus
- Signale für: Lesen, Schreiben, Interrupt, Takt, Bus-Request
- Koordiniert, wer wann den Bus nutzen darf

> 💡 **Praxis-Tipp:** Der Bus ist oft der Flaschenhals. Ein schneller Prozessor mit schmalem Datenbus ist wie ein Rennauto auf einer einspurigen Straße.

## Taktfrequenz

Die Taktfrequenz gibt an, wie viele Zyklen die CPU pro Sekunde durchführt:

| Einheit | Bedeutung |
|---------|-----------|
| 1 MHz | 1 Million Zyklen/Sekunde |
| 1 GHz | 1 Milliarde Zyklen/Sekunde |

**Wichtig**: Höhere Taktfrequenz ≠ automatisch schneller! Es kommt auf die **Architektur** an.

### CPI (Cycles Per Instruction)
- Gibt an, wie viele Takte ein Befehl durchschnittlich braucht
- **IPC** (Instructions Per Cycle) = 1/CPI — wie viele Befehle pro Takt
- Moderne CPUs: IPC von 3-5 durch Pipelining und Superskalar-Architektur

> 💡 **Beispiel:** Eine CPU mit 3 GHz und IPC = 4 führt 12 Milliarden Befehle pro Sekunde aus.

## Befehlssatz

Jede CPU versteht einen bestimmten Befehlssatz — die Maschinensprache:

### Aufbau eines Befehls
| Opcode | Operand 1 | Operand 2 |
|--------|-----------|-----------|
| WAS tun? | Wohin/Womit? | Womit? |

### Beispiel: ADD AX, BX
1. Opcode: ADD (Addition)
2. Operand 1: AX (Zielregister)
3. Operand 2: BX (Quellregister)
4. Bedeutung: AX = AX + BX

### Befehlskategorien
- **Datenbefehle**: MOV, ADD, SUB, MUL, DIV, AND, OR, XOR
- **Steuerbefehle**: JMP (Sprung), CMP (Vergleich), CALL, RET
- **I/O-Befehle**: IN, OUT (Peripheriezugriff)

> 💡 **IHK-Tipp:** Kenne den Unterschied zwischen Opcode und Operand. Ein Befehl im Maschinencode besteht immer aus beiden Teilen.

> ⚠️ **Häufige Fehler:** "Taktfrequenz ist das Einzige was zählt" — Falsch! IPC, Cache-Größe, Pipeline-Tiefe und Architektur sind mindestens genauso wichtig.

> **Nächste Lektion:** Eingabegeräte — Von Tastatur und Maus über Scanner bis hin zu biometrischen Verfahren und NFC.
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 3: Eingabegeräte
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-3",
      title: "Eingabegeräte",
      duration: "15 min",
      type: "text",
      content: `## Übersicht

> In der letzten Lektion haben wir die drei Busse (Adress-, Daten-, Steuerbus), die Taktfrequenz und den Befehlssatz kennengelernt. Jetzt widmen wir uns der Peripherie: Wie gelangen Daten überhaupt in den Computer?

Eingabegeräte ermöglichen es dem Menschen, Daten in das Computersystem zu übertragen. Sie sind das Bindeglied zwischen Mensch und Maschine.

## Tastaturen

| Typ | Merkmal | Einsatz |
|-----|---------|---------|
| **Membran** | Gummiwippen, leise, günstig | Standard-Büro |
| **Mechanisch** | Einzelne Schalter, haptisch, laut | Gaming, Programmierer |
| **Kabelgebunden** | USB, PS/2 | Standard |
| **Kabellos** | Bluetooth, 2.4 GHz Dongle | Flexibel |

### Tastatur-Layouts
- **QWERTZ** (Deutschland), **QWERTY** (USA/International), **AZERTY** (Frankreich)
- Sondertasten: Ctrl, Alt, Shift, Windows, Fn

## Mäuse

- **Optisch**: LED/Laser erkennt Bewegung auf Oberfläche
- **Laser**: Präziser, funktioniert auf glatten Oberflächen
- **Trackball**: Kugel bewegt sich, Maus bleibt stehen (ergonomisch)
- **DPI** (Dots Per Inch): Mausempfindlichkeit — höher = schneller Cursor

## Scanner

| Typ | Funktionsprinzip | Einsatz |
|-----|-----------------|---------|
| **Flachbettscanner** | CCD-Sensor, Dokument liegt flach | Dokumente, Fotos |
| **Einzugscanner** | Dokument wird durchgezogen | Massendigitalisierung |
| **Handscanner** | Wird manuell über Dokument geführt | Schneller, unpräzise |
| **Streifencodescanner** | Laser liest Barcode | Einzelhandel, Logistik |

## Barcodes & QR-Codes

- **Barcode (1D)**: Striche unterschiedlicher Breite, z.B. EAN-13 (Produktcode)
- **QR-Code (2D)**: Quadratisches Muster, mehr Daten, fehlerkorrigierend
- **Einsatz**: Warenwirtschaft, Tickets, Kontaktdaten

## Biometrie

Biometrische Verfahren nutzen einzigartige körperliche Merkmale:

| Verfahren | Genauigkeit | Sicherheit | Einsatz |
|-----------|-------------|------------|---------|
| **Fingerabdruck** | Hoch | Mittel-Hoch | Smartphone, Zugang |
| **Gesichtserkennung** | Hoch | Hoch | Smartphone (Face ID) |
| **Iris-Scan** | Sehr hoch | Sehr hoch | Hochsicherheitsbereiche |
| **Stimmerkennung** | Mittel | Mittel | Sprachassistenten |

> 💡 **IHK-Tipp:** Biometrie = "was man IST" (Authentifizierungsfaktor). Die drei Faktoren: "was man weiß" (Passwort), "was man hat" (Token), "was man IST" (Biometrie).

## Weitere Eingabegeräte

- **Kamera**: Bilder/Video, z.B. für Videoüberwachung, Dokumentation
- **Spracheingabe**: Mikrofon + Software (ASR), z.B. Diktat, Sprachassistenten
- **RFID** (Radio-Frequency ID): Funketikett, Reichweite bis 12m, z.B. Tierchip, Zugangskarte
- **NFC** (Near Field Communication): Kurzstrecke (<4 cm), z.B. kontaktloses Bezahlen

### RFID vs. NFC
| Merkmal | RFID | NFC |
|---------|------|-----|
| Reichweite | bis 12m | < 4 cm |
| Richtung | Einweg (Reader → Tag) | Bidirektional |
| Sicherheit | Geringer | Höher (kurze Distanz) |
| Einsatz | Logistik, Lager | Bezahlung, Ticketing |

> 💡 **Praxis-Tipp:** NFC ist ein Teilbereich von RFID. Jedes NFC-Gerät kann RFID lesen, aber nicht jedes RFID-Gerät kann NFC.

> ⚠️ **Häufige Fehler:** "RFID und NFC sind das Gleiche" — Falsch! NFC ist eine Teilmenge von RFID mit kürzerer Reichweite und bidirektionaler Kommunikation.

> **Nächste Lektion:** Ausgabegeräte — Monitore, Drucker, 3D-Drucker und barrierefreie Ausgabe: Wie bringen wir Ergebnisse zum Menschen?
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 4: Ausgabegeräte
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-4",
      title: "Ausgabegeräte",
      duration: "15 min",
      type: "text",
      content: `## Übersicht

> In der letzten Lektion haben wir Eingabegeräte kennengelernt — von Tastaturen und Mäusen über Scanner bis zu biometrischen Verfahren und NFC. Jetzt schauen wir uns die andere Seite an: Wie gibt der Computer Ergebnisse aus?

Ausgabegeräte stellen Verarbeitungsergebnisse für den Menschen dar — visuell, akustisch oder physisch.

## Monitore & Displays

### Technologien im Vergleich

| Technologie | Prinzip | Vorteile | Nachteile |
|-------------|---------|----------|-----------|
| **LCD (IPS)** | Flüssigkristalle + Hintergrundbeleuchtung | Gute Farben, günstig | Schwarzwert begrenzt |
| **OLED** | Organische LEDs, selbstleuchtend | Perfektes Schwarz, dünn | Burn-in-Gefahr, teuer |
| **Mini-LED** | Viele kleine LEDs als Hintergrundbeleuchtung | Lokale Dimmung, hell | Nicht so kontraststark wie OLED |
| **CRT** | Kathodenstrahlröhre | Kein Input-Lag | Riesig, Stromfresser, veraltet |

### Wichtige Monitor-Kennzahlen
- **Auflösung**: Pixelanzahl, z.B. 1920x1080 (Full HD), 3840x2160 (4K)
- **Bildwiederholrate**: Hz — 60 Hz Standard, 144 Hz Gaming
- **Reaktionszeit**: ms — niedriger = weniger Schlieren
- **Farbraum**: sRGB, DCI-P3, Adobe RGB — wie viele Farben dargestellt werden

## Beamer (Projektoren)

| Typ | Prinzip | Einsatz |
|-----|---------|---------|
| **DLP** | Spiegel-Chip + Farbrad | Kino, Heimkino |
| **LCD** | 3 LCD-Panels | Präsentationen |
| **Laser** | Laserlichtquelle | Große Räume, lange Lebensdauer |

- **Lumen**: Helligkeit — 2000+ für abgedunkelte Räume, 4000+ für helle Räume
- **Throw Ratio**: Abstand zu Bildgröße — Short-Throw für kleine Räume

## Drucker

### Druckverfahren

| Typ | Prinzip | Qualität | Kosten | Geschwindigkeit |
|-----|---------|----------|--------|-----------------|
| **Tintenstrahl** | Tintentröpfchen auf Papier | Gut (Farbe) | Günstig Anschaffung, teuer Tinte | Langsam |
| **Laser** | Toner + Hitze | Sehr gut (Text) | Teuer Anschaffung, günstig pro Seite | Schnell |
| **Nadeldrucker** | Nadeln schlagen Farbband | Schlecht | Sehr günstig | Langsam |
| **Thermisch** | Hitze auf Spezialpapier | Mittel | Günstig | Schnell |

### Drucker-Kennzahlen
- **dpi** (Dots Per Inch): Auflösung — 300 dpi Text, 1200+ dpi Fotos
- **Seiten/Minute**: Geschwindigkeit
- **Duplex**: Beidseitiger Druck

> 💡 **Praxis-Tipp:** Laserdrucker lohnen sich ab ~500 Seiten/Monat. Für gelegentlichen Farbdruck reicht ein Tintenstrahler.

## 3D-Drucker

| Verfahren | Material | Genauigkeit | Einsatz |
|-----------|----------|-------------|---------|
| **FDM** | Kunststoff-Filament | Mittel | Prototyping, Hobby |
| **SLA** | Harz (Resin) | Hoch | Schmuck, Dental |
| **SLS** | Pulver (Metall/Kunststoff) | Sehr hoch | Industrie |

## Audio-Ausgabe
- **Lautsprecher**: Analog/Digital, Stereo/Surround
- **Kopfhörer**: Over-Ear, In-Ear, Noise-Cancelling
- **Soundkarte**: DAC (Digital-Analog-Wandler), wird oft auf Mainboard integriert

## Barrierefreie Ausgabe
- **Braille-Zeile**: Blindenschrift als tastbare Punkte
- **Screenreader**: Vorlesesoftware für Blinde
- **Vergrößerungssoftware**: Für sehbehinderte Nutzer

> 💡 **IHK-Tipp:** Vergleiche Druckverfahren! "Welcher Drucker eignet sich für..." ist eine häufige Aufgabenstellung.

> ⚠️ **Häufige Fehler:** "Laserdrucker drucken mit Tinte" — Falsch! Laserdrucker nutzen Toner (Pulver), das durch Hitze auf das Papier fixiert wird.

> **Nächste Lektion:** Speichermedien & RAID — HDD, SSD, optische Medien und die verschiedenen RAID-Level für Performance und Ausfallsicherheit.
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 5: Speichermedien & RAID
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-5",
      title: "Speichermedien & RAID",
      duration: "20 min",
      type: "interactive",
      interactive: "raidConfigurator",
      content: `## Speichertypen im Überblick

> In der letzten Lektion haben wir Ausgabegeräte kennengelernt — Monitore, Drucker und 3D-Drucker. Jetzt geht es um die persistenten Daten: Welche Speichermedien gibt es, und wie sorgt man mit RAID für Ausfallsicherheit?

Speichermedien werden nach ihrer Technologie in drei Kategorien eingeteilt:

### Magnetische Speicher (HDD)
- **Funktionsprinzip**: Magnetisierbare Scheibe (Platter) mit lesendem/schreibendem Kopf
- **Vorteile**: Günstig pro GB, hohe Kapazitäten (bis 20 TB)
- **Nachteile**: Mechanisch (empfindlich gegen Stöße), langsam (5-10ms Zugriff)
- **Einsatz**: NAS, Archiv, Desktop-PCs

### Optische Speicher
| Medium | Kapazität | Einsatz |
|--------|-----------|---------|
| **CD** | 700 MB | Musik, alte Software |
| **DVD** | 4.7 GB (SL) / 8.5 GB (DL) | Filme, Backup |
| **Blu-ray** | 25-128 GB | HD-Filme, große Datenmengen |

- Laser liest und schreibt Daten auf reflektierende Schicht
- Wird zunehmend durch Cloud/USB ersetzt

### Halbleiterspeicher (SSD, USB, SD)
- **Funktionsprinzip**: NAND-Flash-Speicherzellen (kein mechanisches Teil)
- **Vorteile**: Sehr schnell (0.1ms), robust, lautlos, energiesparend
- **Nachteile**: Teurer pro GB, begrenzte Schreibzyklen

#### SSD-Zellentypen
| Typ | Bits/Zelle | Geschwindigkeit | Haltbarkeit | Kosten |
|-----|-----------|-----------------|-------------|--------|
| **SLC** | 1 | Am schnellsten | Am haltbarsten | Sehr teuer |
| **MLC** | 2 | Schnell | Gut | Teuer |
| **TLC** | 3 | Mittel | Mittel | Günstig |
| **QLC** | 4 | Langsam | Gering | Sehr günstig |

## RAID (Redundant Array of Independent Disks)

RAID kombiniert mehrere Festplatten zu einem logischen Verbund — für mehr **Leistung**, **Ausfallsicherheit** oder beides.

### RAID-Level im Überblick

| RAID | Min. Platten | Prinzip | Redundanz | Nutzbare Kapazität |
|------|-------------|---------|-----------|-------------------|
| **RAID 0** | 2 | Striping | Keine | n × Plattengröße |
| **RAID 1** | 2 | Mirroring | 1 Platte | n/2 × Plattengröße |
| **RAID 5** | 3 | Striping + Parität | 1 Platte | (n-1) × Plattengröße |
| **RAID 6** | 4 | Striping + 2× Parität | 2 Platten | (n-2) × Plattengröße |
| **RAID 10** | 4 | Mirror + Stripe | 1 pro Mirror | n/2 × Plattengröße |

### RAID 0 — Striping (Leistung)
- Daten werden auf alle Platten verteilt (keine Duplikate)
- **Vorteil**: Maximale Geschwindigkeit (Lesen/Schreiben parallel)
- **Nachteil**: Keine Redundanz — bei Ausfall einer Platte sind alle Daten verloren
- **Einsatz**: Temporäre Daten, Gaming, Scratch-Disk

<svg viewBox="0 0 350 120" xmlns="http://www.w3.org/2000/svg" style="max-width:350px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="350" height="120" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="40" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 0</text>
  <text x="140" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 1</text>
  <text x="240" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 2</text>
  <rect x="15" y="35" width="50" height="30" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="40" y="55" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">A1</text>
  <rect x="115" y="35" width="50" height="30" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="140" y="55" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">A2</text>
  <rect x="215" y="35" width="50" height="30" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="240" y="55" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">A3</text>
  <rect x="15" y="72" width="50" height="30" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="40" y="92" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">B1</text>
  <rect x="115" y="72" width="50" height="30" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="140" y="92" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">B2</text>
  <rect x="215" y="72" width="50" height="30" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="240" y="92" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">B3</text>
  <text x="310" y="55" fill="#64748b" font-size="10">0% Redundanz</text>
  <text x="310" y="70" fill="#64748b" font-size="10">100% Kapazität</text>
</svg>

### RAID 1 — Mirroring (Sicherheit)
- Jede Platte hat eine exakte Kopie
- **Vorteil**: Volle Redundanz — eine Platte darf komplett ausfallen
- **Nachteil**: Nur 50% nutzbare Kapazität
- **Einsatz**: Betriebssystem-Platte, kleine Büros

<svg viewBox="0 0 250 120" xmlns="http://www.w3.org/2000/svg" style="max-width:250px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="250" height="120" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="65" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 0</text>
  <text x="175" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 1</text>
  <rect x="25" y="35" width="80" height="30" rx="4" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="1"/>
  <text x="65" y="55" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">A</text>
  <rect x="135" y="35" width="80" height="30" rx="4" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="1"/>
  <text x="175" y="55" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">A (Kopie)</text>
  <rect x="25" y="72" width="80" height="30" rx="4" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1"/>
  <text x="65" y="92" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">B</text>
  <rect x="135" y="72" width="80" height="30" rx="4" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1"/>
  <text x="175" y="92" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">B (Kopie)</text>
</svg>

### RAID 5 — Striping + verteilte Parität (Kompromiss)
- Daten + Paritätsinformationen werden verteilt
- **Vorteil**: Gute Balance aus Leistung und Sicherheit
- **Nachteil**: Schreibtgeschwindigkeit reduziert (Parität berechnen), nur 1 Platte darf ausfallen
- **Einsatz**: Fileserver, NAS in KMUs

<svg viewBox="0 0 350 120" xmlns="http://www.w3.org/2000/svg" style="max-width:350px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="350" height="120" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="60" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 0</text>
  <text x="160" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 1</text>
  <text x="260" y="25" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Disk 2</text>
  <rect x="20" y="35" width="70" height="30" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="55" y="55" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">A1</text>
  <rect x="120" y="35" width="70" height="30" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="155" y="55" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">A2</text>
  <rect x="220" y="35" width="70" height="30" rx="4" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="255" y="55" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">P</text>
  <rect x="20" y="72" width="70" height="30" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="55" y="92" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">B1</text>
  <rect x="120" y="72" width="70" height="30" rx="4" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="155" y="92" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">P</text>
  <rect x="220" y="72" width="70" height="30" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="255" y="92" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">B2</text>
  <text x="325" y="55" fill="#64748b" font-size="10">P = Parität</text>
  <text x="325" y="70" fill="#64748b" font-size="10"> verteilt</text>
</svg>

### RAID 6 — Doppelte Parität
- Wie RAID 5, aber mit zweiter Paritätsinformation
- **Vorteil**: 2 Platten dürfen gleichzeitig ausfallen
- **Nachteil**: Noch mehr Overhead als RAID 5
- **Einsatz**: Große Server, Rechenzentren

### RAID 10 — Mirror + Stripe (Premium)
- Kombination aus RAID 1 und RAID 0: Daten werden gespiegelt UND gestriped
- **Vorteil**: Hohe Lesegeschwindigkeit durch Striping, hohe Sicherheit durch Mirroring
- **Nachteil**: Nur 50% nutzbare Kapazität (teuer)
- **Einsatz**: Datenbanken, High-Performance-Server

<svg viewBox="0 0 350 130" xmlns="http://www.w3.org/2000/svg" style="max-width:350px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="350" height="130" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="50" y="20" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Mirror 0</text>
  <text x="150" y="20" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="bold">Mirror 1</text>
  <text x="50" y="35" text-anchor="middle" fill="#94a3b8" font-size="10">Disk 0+1</text>
  <text x="150" y="35" text-anchor="middle" fill="#94a3b8" font-size="10">Disk 2+3</text>
  <rect x="15" y="42" width="35" height="28" rx="4" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="1"/>
  <text x="32" y="60" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">A</text>
  <rect x="55" y="42" width="35" height="28" rx="4" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="1"/>
  <text x="72" y="60" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">A'</text>
  <rect x="115" y="42" width="35" height="28" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="132" y="60" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">B</text>
  <rect x="155" y="42" width="35" height="28" rx="4" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="1"/>
  <text x="172" y="60" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">B'</text>
  <rect x="15" y="77" width="35" height="28" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="32" y="95" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">C</text>
  <rect x="55" y="77" width="35" height="28" rx="4" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="1"/>
  <text x="72" y="95" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">C'</text>
  <rect x="115" y="77" width="35" height="28" rx="4" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1"/>
  <text x="132" y="95" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">D</text>
  <rect x="155" y="77" width="35" height="28" rx="4" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1"/>
  <text x="172" y="95" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">D'</text>
  <text x="260" y="60" fill="#64748b" font-size="10">Stripe + Mirror</text>
  <text x="260" y="75" fill="#64748b" font-size="10">50% Kapazität</text>
  <text x="260" y="90" fill="#64748b" font-size="10">Schnell + Sicher</text>
</svg>

> 💡 **Praxis-Tipp:** Ein kleines Büro mit 5 Mitarbeitern braucht kein RAID 6. RAID 1 mit 2 Platten reicht — einfach und günstig. Für kritische Daten: RAID 5 ab 3 Platten.

> 💡 **IHK-Tipp:** Berechne immer die nutzbare Kapazität! Formel: RAID 0 = n, RAID 1 = n/2, RAID 5 = n-1, RAID 6 = n-2, RAID 10 = n/2.

[INTERACTIVE]

> ⚠️ **Häufige Fehler:** "RAID ist ein Backup" — Falsch! RAID schützt vor Hardwareausfall, nicht vor Löschen, Viren oder Brand. Trotzdem Backup machen!

> **Nächste Lektion:** Speicherverwaltung & Adressierung — Die Speicherhierarchie, Caching, Paging und virtueller Speicher: Wie verwaltet das System seinen Arbeitsspeicher?
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 6: Speicherverwaltung & Adressierung
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-6",
      title: "Speicherverwaltung & Adressierung",
      duration: "20 min",
      type: "interactive",
      interactive: "memoryHierarchyExplorer",
      content: `## Die Speicherhierarchie

> In der letzten Lektion haben wir Speichermedien (HDD, SSD, optisch) und RAID-Level kennengelernt. Jetzt schauen wir uns an, wie der Computer seinen Arbeitsspeicher verwaltet — von der Hierarchie über Caching bis zu virtuellem Speicher.

Der Computer nutzt verschiedene Speichertypen — je schneller, desto teurer und kleiner:

> 📝 **Merksatz:** "**R**ein **L**ustig **L**ernen **L**ektionen **R**ichtig **S**chnell" — Register, L1, L2, L3, RAM, SSD

| Ebene | Typ | Größe | Zugriffszeit | Kosten/GB |
|-------|-----|-------|-------------|-----------|
| **Register** | SRAM | Bytes | ~0.3 ns | Extrem teuer |
| **L1 Cache** | SRAM | ~64 KB | ~1 ns | Sehr teuer |
| **L2 Cache** | SRAM | ~256 KB-1 MB | ~4 ns | Teuer |
| **L3 Cache** | SRAM | ~4-32 MB | ~10 ns | Mittel |
| **RAM** | DRAM | 8-64 GB | ~100 ns | Günstig |
| **SSD** | NAND-Flash | 256 GB - 8 TB | ~0.1 ms | Sehr günstig |
| **HDD** | Magnetisch | 1-20 TB | ~5-10 ms | Am günstigsten |

## SRAM vs. DRAM

| Merkmal | SRAM | DRAM |
|---------|------|------|
| **Speicherzelle** | Flip-Flop (6 Transistoren) | Kondensator (1 Transistor + 1 Kondensator) |
| **Geschwindigkeit** | Sehr schnell (~1ns) | Langsamer (~100ns) |
| **Refresh** | Nicht nötig | Alle ~64ms nötig |
| **Kosten** | Teuer | Günstig |
| **Einsatz** | Cache (L1/L2/L3) | Hauptspeicher (RAM) |

## Cache-Prinzip

Der Cache speichert häufig verwendete Daten näher an der CPU:

### Cache-Lines
- Daten werden in **Cache-Lines** (typisch 64 Byte) geladen
- Bei Zugriff auf Adresse X wird der gesamte Block um X geladen (Lokalitätsprinzip)

### Cache-Mapping
| Methode | Beschreibung | Vorteil | Nachteil |
|---------|-------------|---------|----------|
| **Direct Mapped** | Jede Adresse → genau 1 Cache-Line | Schnell, einfach | Viele Conflicts |
| **Fully Associative** | Jede Adresse → jede Cache-Line | Keine Conflicts | Teuer, langsam |
| **Set Associative** | Kompromiss (z.B. 4-way) | Balance | Mittel |

### Cache Hit / Miss
- **Cache Hit**: Daten sind im Cache → schneller Zugriff
- **Cache Miss**: Daten nicht im Cache → langsamer Zugriff aus RAM
- **Hit Rate**: Anteil der Treffer — moderne CPUs: ~95-99%

> 💡 **Praxis-Tipp:** Ein Cache-Miss kostet ~100x so viel Zeit wie ein Hit. Deshalb ist Cache-Optimierung in der Softwareentwicklung so wichtig (Daten lokal im Array statt über Zeiger verteilt).

## Virtueller Speicher & Paging

### Warum virtueller Speicher?
- RAM ist begrenzt, Programme benötigen oft mehr Speicher
- Virtueller Speicher erlaubt es, mehr Speicher zu nutzen als physisch vorhanden
- Auslagerung auf Festplatte (Swap/Pagefile) bei Bedarf

### Paging
- Virtueller Speicher wird in **Seiten** (Pages) eingeteilt (typisch 4 KB)
- Physischer RAM wird in **Seitenrahmen** (Frames) eingeteilt (gleiche Größe)
- **Page Table** ordnet jeder virtuellen Seite einen physischen Rahmen zu

### Adressübersetzung
Virtuelle Adresse = **Seitennummer** + **Offset**
1. Seitennummer → Page Table → Physische Rahmennummer
2. Physische Adresse = Rahmennummer × Seitengröße + Offset

### Page Fault
- Zugriff auf Seite, die nicht im RAM ist → **Page Fault**
- OS lädt Seite von Festplatte in RAM (langsam!)
- Wenn RAM voll: Eine Seite wird ausgelagert (Replacement: LRU, FIFO)

> 💡 **IHK-Tipp:** Berechne die Anzahl der Seitenrahmen! Formel: Seitenrahmen = RAM-Größe / Seitengröße. Beispiel: 4 GB RAM, 4 KB Seiten → 1.048.576 Rahmen.

## Endianness

Wie werden mehrbyte-Werte im Speicher abgelegt?

### Big-Endian (Motorola, Netzwerk)
- **MSB** (Most Significant Byte) zuerst
- 0x12345678 → Speicher: [12] [34] [56] [78]

### Little-Endian (Intel, x86)
- **LSB** (Least Significant Byte) zuerst
- 0x12345678 → Speicher: [78] [56] [34] [12]

> 📝 **Merksatz:** Big-Endian = wie wir Zahlen lesen (links = wichtigste Stelle). Little-Endian = umgekehrt (Intel ist "anders").

## Adressierung

| Adressbus | Max. Adressraum |
|-----------|----------------|
| 16 Bit | 64 KB |
| 20 Bit | 1 MB |
| 32 Bit | 4 GB |
| 48 Bit | 256 TB |
| 64 Bit | 16 EB (theoretisch) |

Formel: **Adressraum = 2^n** (n = Anzahl Adressleitungen)

> ⚠️ **Häufige Fehler:** "L1-Cache ist langsamer als RAM weil er kleiner ist" — Falsch! L1 ist am SCHNELLSTEN, gerade WEIL er klein und nahe am Prozessor ist.

> **Nächste Lektion:** Betriebssysteme & Systemsoftware — Kernel, Prozesse, Threads und Dateisysteme: Was macht das OS zur Vermittlerschicht zwischen Hardware und Software?

[INTERACTIVE]
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 7: Betriebssysteme & Systemsoftware
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-7",
      title: "Betriebssysteme & Systemsoftware",
      duration: "20 min",
      type: "text",
      content: `## Was macht ein Betriebssystem?

> In der letzten Lektion haben wir die Speicherhierarchie, Caching, Paging und virtuellen Speicher kennengelernt. Jetzt wird es übergeordnet: Wie verwaltet das Betriebssystem all diese Ressourcen — Prozesse, Speicher, Dateien und Geräte?

Das Betriebssystem (OS) ist die Vermittlerschicht zwischen Hardware und Anwendungssoftware:

| Aufgabe | Beschreibung |
|---------|-------------|
| **Prozessverwaltung** | Programme starten, stoppen, priorisieren |
| **Speicherverwaltung** | RAM zuweisen, virtueller Speicher, Paging |
| **Dateisystemverwaltung** | Daten organisiert speichern und finden |
| **Geräteverwaltung** | Treiber für Hardware-Komponenten |
| **Sicherheit** | Zugriffsrechte, Benutzerverwaltung |
| **Netzwerk** | TCP/IP-Stack, Freigaben |

> 💡 **Tipp:** Im Netzwerkmodul (IHK) wird auf Protokolle und Sicherheitsaspekte eingegangen — vertiefende Inhalte findest du dort.

## Kernel — Das Herz des OS

Der Kernel ist der Kern des Betriebssystems mit direktem Hardwarezugriff:

| Kernel-Typ | Beschreibung | Beispiel |
|-----------|-------------|---------|
| **Monolithisch** | Alles im Kernel-Space | Linux |
| **Mikrokernel** | Minimaler Kernel, Services im User-Space | Minix, QNX |
| **Hybrid** | Mischform | Windows NT, macOS (XNU) |

## Prozesse & Threads

### Prozess
- Ein laufendes Programm mit eigenen Ressourcen (Speicher, Dateihandles)
- Jeder Prozess hat einen eigenen Adressraum
- OS weist CPU-Zeit zu (Scheduling)

### Thread
- Leichtgewichtige Ausführungseinheit innerhalb eines Prozesses
- Teilt sich Speicher und Ressourcen des Prozesses
- Mehrere Threads = bessere CPU-Auslastung (wenn parallelisierbar)

### Multitasking-Modelle

| Modell | Beschreibung | Beispiel |
|--------|-------------|---------|
| **Preemptive** | OS entscheidet, wann Umschaltung (Zeitscheibe) | Windows, Linux, macOS |
| **Cooperativ** | Prozess gibt CPU freiwillig ab | Windows 3.x, Mac OS Classic |

> 💡 **Praxis-Tipp:** Moderne OS nutzen ausschließlich Preemptive Multitasking. Cooperativ war anfällig für einfrierende Programme (ein Prozess konnte die CPU blockieren).

## Dateisysteme

| Dateisystem | OS | Max. Dateigröße | Features |
|-------------|-----|----------------|----------|
| **NTFS** | Windows | 16 TB | ACLs, Kompression, Journaling |
| **FAT32** | Alle | 4 GB | Universal, aber alt |
| **exFAT** | Alle | 16 EB | Für USB/SD-Karten |
| **ext4** | Linux | 16 TB | Journaling, Snapshots |
| **APFS** | macOS | 8 EB | Verschlüsselung, Clones |
| **Btrfs** | Linux | 16 EB | RAID, Snapshots, Kompression |

## Betriebssysteme im Vergleich

### Desktop
| OS | Kernel | Marktanteil | Stärke |
|----|--------|-------------|--------|
| **Windows** | NT (Hybrid) | ~75% | Kompatibilität, Gaming |
| **macOS** | XNU (Hybrid) | ~15% | Design, Apple-Ökosystem |
| **Linux** | Monolithisch | ~4% | Frei, Server, Entwicklung |

### Mobil
| OS | Kernel | Marktanteil | Stärke |
|----|--------|-------------|--------|
| **Android** | Linux | ~72% | Offen, Anpassbar |
| **iOS** | XNU (Hybrid) | ~27% | Sicher, Apple-Integration |

### Server
- **Linux**: ~80% der Server (Web, Cloud, Datenbanken)
- **Windows Server**: ~15% (Active Directory, .NET)
- **Unix**: Legacy-Systeme (Banken, Telekommunikation)

## Systemsoftware

### BIOS vs. UEFI

| Merkmal | BIOS | UEFI |
|---------|------|------|
| **Architektur** | 16-Bit | 32/64-Bit |
| **Partitionierung** | MBR (max. 2 TB) | GPT (max. 9.4 ZB) |
| **Startgeschwindigkeit** | Langsam | Schnell |
| **Oberfläche** | Text | Grafisch + Maus |
| **Secure Boot** | Nein | Ja |
| **Netzwerk** | Nein | Ja (Fernwartung) |

> 💡 **IHK-Tipp:** Kenne den Unterschied zwischen BIOS und UEFI! UEFI ersetzt BIOS und bringt modernere Features wie Secure Boot, GPT und grafische Oberfläche.

### Treiber (Driver)
- Software, die das OS mit Hardware kommunizieren lässt
- Herstellerspezifisch (GPU-Treiber, Druckertreiber)
- Können instabil sein (Blue Screen oft durch Treiber)

### Dienste & Daemons
- Hintergrundprozesse ohne Benutzeroberfläche
- Windows: **Dienste** | Linux/macOS: **Daemons**
- Beispiele: Druckdienst, Virenscanner, Zeit-Synchronisation

### Shell & CLI
- **Shell**: Textbasierte Eingabeoberfläche (Kommandozeile)
- **Windows**: PowerShell, CMD | **Linux/macOS**: Bash, Zsh
- **Vorteil**: Skriptbar, automatisierbar, ressourcensparend

### Update vs. Upgrade
- **Update**: Fehlerbehebungen, Sicherheitspatches (klein)
- **Upgrade**: Neue Version mit neuen Funktionen (groß)

> ⚠️ **Häufige Fehler:** "Linux ist nur für Experten" — Falsch! Distributionen wie Ubuntu oder Linux Mint sind einsteigerfreundlich. Und: Fast alle Server laufen unter Linux.

> **Nächste Lektion:** Virtualisierung & Cloud Computing — Hypervisor, Container, IaaS/PaaS/SaaS und Cloud-Deployment: Wie löst man sich von der physischen Hardware?
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 8: Virtualisierung & Cloud Computing
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-8",
      title: "Virtualisierung & Cloud Computing",
      duration: "20 min",
      type: "interactive",
      interactive: "virtualizationExplorer",
      content: `## Was ist Virtualisierung?

> In der letzten Lektion haben wir Betriebssysteme kennengelernt — Kernel, Prozesse, Threads und Dateisysteme. Jetzt geht es einen Schritt weiter: Was, wenn man mehrere Betriebssysteme gleichzeitig auf einer Hardware laufen lassen will?

Virtualisierung trennt Software von der physischen Hardware. Mehrere "virtuelle Maschinen" (VMs) laufen auf einer einzigen physischen Maschine — jede mit eigenem OS.

> 💡 **Tipp:** Virtualisierung ist wie ein Mehrfamilienhaus: Eine physische Struktur (Haus), mehrere unabhängige Wohnungen (VMs) mit eigenen Schlüsseln (OS).

## Hypervisor — Der Virtualisierer

### Typ 1: Bare-Metal Hypervisor
- Läuft **direkt auf der Hardware** (kein Host-OS)
- Bessere Performance, geringerer Overhead
- Beispiele: VMware ESXi, Microsoft Hyper-V, Xen

### Typ 2: Hosted Hypervisor
- Läuft **auf einem Host-OS** (z.B. Windows, macOS)
- Einfacher zu installieren, aber langsamer
- Beispiele: VirtualBox, VMware Workstation, Parallels Desktop

### Container (kein klassischer Hypervisor)
- Teilen sich den **Kernel des Host-OS** (Shared Kernel)
- Sehr leichtgewichtig — kein eigenes OS pro Container, nur isolierte Prozesse
- Beispiele: Docker, Kubernetes, LXC

| Merkmal | Typ 1 | Typ 2 | Container |
|---------|-------|-------|-----------|
| **Läuft auf** | Hardware | Host-OS | Host-OS Kernel |
| **Overhead** | Gering | Hoch | Sehr gering |
| **Isolation** | Voll | Voll | Teilweise |
| **Startzeit** | Sekunden | Sekunden | Millisekunden |
| **Einsatz** | Rechenzentren | Entwicklung | Microservices |

> 💡 **IHK-Tipp:** Typ 1 vs. Typ 2 ist ein Klassiker! Typ 1 = direkt auf Hardware (Server), Typ 2 = auf OS (Desktop/Entwicklung).

## Cloud Computing

### Cloud-Modelle

| Modell | Beschreibung | Beispiel | Sie managen |
|--------|-------------|----------|-------------|
| **IaaS** | Infrastruktur als Dienst | AWS EC2, Azure VM | OS, Apps, Daten |
| **PaaS** | Plattform als Dienst | Heroku, Google App Engine | Apps, Daten |
| **SaaS** | Software als Dienst | Microsoft 365, Salesforce | Nur Daten |

### Verantwortungsmatrix

| Schicht | IaaS | PaaS | SaaS |
|---------|------|------|------|
| Anwendung | **Sie** | **Sie** | Provider |
| Laufzeitumgebung | **Sie** | Provider | Provider |
| Betriebssystem | **Sie** | Provider | Provider |
| Virtualisierung | Provider | Provider | Provider |
| Hardware | Provider | Provider | Provider |

### Cloud-Deployment

| Typ | Beschreibung | Vorteile | Nachteile |
|-----|-------------|----------|-----------|
| **Public Cloud** | Shared Infrastructure | Skalierbar, günstig | Weniger Kontrolle |
| **Private Cloud** | Dediziert für ein Unternehmen | Kontrolle, Sicherheit | Teuer, Wartung |
| **Hybrid Cloud** | Mix aus Public + Private | Flexibel, sensible Daten lokal | Komplexität |

### Vorteile der Cloud
- **Skalierbarkeit**: Ressourcen nach Bedarf zu/ab
- **Kostenmodell**: Pay-per-use statt hohe Investitionen
- **Ausfallsicherheit**: Redundanz in mehreren Rechenzentren
- **Weltweiter Zugriff**: Über Internet von überall

### Nachteile der Cloud
- **Abhängigkeit**: Vendor Lock-in
- **Datenschutz**: Daten liegen bei Drittanbieter
- **Netzwerk**: Internetverbindung nötig
- **Kostenfalle**: Unkontrolliertes Wachstum

## Thin Client

- Minimaler Client, der nur Anzeige und Eingabe übernimmt
- Alle Berechnungen laufen auf dem Server (oder in der Cloud)
- **Vorteile**: Günstig, sicher, zentral verwaltbar
- **Nachteile**: Netzwerkabhängig, eingeschränkte Offline-Nutzung
- **Einsatz**: Call Center, Schulen, Citrix/Remote Desktop

> 💡 **Praxis-Tipp:** Viele Unternehmen migrieren von lokalen Servern in die Cloud. Aber: Nicht alles gehört in die Cloud. Sensible Daten oder Echtzeitanwendungen bleiben oft on-premise.

> ⚠️ **Häufige Fehler:** "Cloud = immer billiger" — Falsch! Bei konstant hoher Last kann ein eigener Server günstiger sein. Cloud lohnt sich bei schwankendem Bedarf.

> **Nächste Lektion:** Leistungsbewertung & Optimierung — Benchmarks, Amdahlsches Gesetz und Engpassanalyse: Wie misst und verbessert man die Performance?
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 9: Leistungsbewertung & Optimierung
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-9",
      title: "Leistungsbewertung & Optimierung",
      duration: "15 min",
      type: "interactive",
      interactive: "addressingCalculator",
      content: `## Benchmarks

> In der letzten Lektion haben wir Virtualisierung und Cloud Computing kennengelernt — Hypervisor, Container und die Cloud-Modelle IaaS/PaaS/SaaS. Jetzt fragen wir uns: Wie misst man eigentlich die Leistung eines Systems — und wo liegen die Engpässe?

Benchmarks sind standardisierte Tests zur Messung der Computerleistung:

| Benchmark | Misst | Einheit |
|-----------|-------|---------|
| **MIPS** | Millionen Instruktionen/Sekunde | Mio. Befehle/s |
| **FLOPS** | Floating-Point-Operationen/Sekunde | Gleitkomma-Op./s |
| **PassMark** | Gesamtleistung (CPU) | Punkte |
| **Geekbench** | Single-/Multi-Core-Leistung | Punkte |
| **3DMark** | Grafikleistung | Punkte |

### MIPS vs. FLOPS
- **MIPS**: Misst Ganzzahl-Operationen — relevant für allgemeine Software
- **FLOPS**: Misst Gleitkomma-Operationen — relevant für wissenschaftliche Berechnungen, KI, Grafik

### Benchmark-Probleme
- Hersteller optimieren gezielt für bestimmte Benchmarks ("Benchmark-Betrug")
- Tagesleistung (Real-World) kann stark abweichen
- Verschiedene Benchmarks sind nicht direkt vergleichbar

> 💡 **Praxis-Tipp:** Verlasse dich nie auf einen einzelnen Benchmark. Vergleiche mehrere Tests und prüfe reale Anwendungsszenarien.

## Amdahlsches Gesetz

Das Amdahlsche Gesetz berechnet den maximalen Speedup durch Parallelisierung:

$$Speedup = \\frac{1}{(1-p) + \\frac{p}{n}}$$

- **p** = Anteil des parallelisierbaren Programms (0 bis 1)
- **n** = Anzahl der Prozessoren

### Beispiel
- Programm ist zu 80% parallelisierbar (p = 0.8)
- 4 Prozessoren (n = 4)
- Speedup = 1 / ((1-0.8) + 0.8/4) = 1 / (0.2 + 0.2) = 1 / 0.4 = **2.5**

> 📝 **Merksatz:** Selbst mit unendlich vielen Prozessoren ist der Speedup begrenzt durch den sequenziellen Teil (1-p). Bei p=0.8: maximaler Speedup = 1/0.2 = 5.

> 💡 **IHK-Tipp:** Amdahl-Formel auswendig können und anwenden! Häufige Aufgabe: "Wie viele Prozessoren braucht man für Speedup X?"

## Speicherhierarchie & Engpässe

### Die Speicherhierarchie als Performance-Faktor

Die CPU ist schneller als der RAM — der Speicherbus ist oft der Flaschenhals:

| Lösung | Beschreibung |
|--------|-------------|
| **Cache** | Schneller Pufferspeicher nahe der CPU |
| **Pipelining** | Befehle überlappend ausführen |
| **Branch Prediction** | Sprünge vorhersagen |
| **Out-of-Order Execution** | Befehle in optimaler Reihenfolge |

### Ressourcenmanagement

Das OS verwaltet Ressourcen effizient:
- **CPU-Scheduling**: Wer bekommt wann CPU-Zeit? (Round Robin, Priority, MLFQ)
- **Speicher-Management**: Paging, Swapping, Caching
- **I/O-Scheduling**: Wann wird welche Festplatte bedient?

### Engpässe erkennen

| Engpass | Symptom | Lösung |
|---------|---------|--------|
| **CPU** | Hohe CPU-Auslastung | Mehr Kerne, optimieren |
| **RAM** | Viele Page Faults | Mehr RAM, Programme schließen |
| **Disk** | Lange Wartezeiten | SSD statt HDD, Caching |
| **Netzwerk** | Langsame Übertragung | Schnelleres Interface, Caching |

> 💡 **Praxis-Tipp:** Nutze den Task-Manager (Windows) oder htop (Linux), um Engpässe zu identifizieren. Wenn die CPU bei 100% ist, hilft mehr RAM nicht.

> ⚠️ **Häufige Fehler:** "Mehr GHz = immer schneller" — Falsch! Ein 3-GHz-Prozessor mit hoher IPC kann schneller sein als ein 4-GHz-Prozessor mit niedriger IPC.

> **Nächste Lektion:** Nachhaltigkeit & Green IT — Energieeffizienz, Recycling und der Rebound-Effekt: Wie reduziert man den ökologischen Fußabdruck der IT?

[INTERACTIVE]
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 10: Nachhaltigkeit & Green IT
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-10",
      title: "Nachhaltigkeit & Green IT",
      duration: "12 min",
      type: "text",
      content: `## Warum Green IT?

> In der letzten Lektion haben wir Leistungsbewertung kennengelernt — Benchmarks, das Amdahlsche Gesetz und Engpassanalyse. Jetzt stellen wir uns die Frage: Was kostet all diese Leistung — und wie kann IT nachhaltiger werden?

Die IT-Branche verbraucht weltweit etwa 3-4% des Stroms — Tendenz steigend. Green IT zielt darauf ab, den ökologischen Fußabdruck der IT zu reduzieren.

## Energieeffizienz

### Stromverbrauch von IT-Komponenten

| Komponente | Verbrauch (ca.) |
|-----------|----------------|
| Desktop-PC | 100-300 W |
| Laptop | 20-60 W |
| Server | 200-500 W |
| Monitor (24") | 20-40 W |
| NAS | 15-50 W |

### Energiesparmaßnahmen

| Maßnahme | Einsparung |
|----------|-----------|
| **Standby/Ruhezustand** | 50-80% gegenüber Leerlauf |
| **Server-Virtualisierung** | 60-80% weniger physische Server |
| **Effiziente Netzteile** (80 PLUS) | 10-15% weniger Verlust |
| **SSD statt HDD** | 60-70% weniger Strom |
| **Cloud statt lokal** | Bessere Serverauslastung durch Shared Infrastructure |

### Power Management
- **ACPI** (Advanced Configuration and Power Interface): Standard für Stromverwaltung
- **S-States**: S0 (aktiv) → S1 (Leerlauf) → S2 → S3 (Standby) → S4 (Ruhezustand) → S5 (Aus)
- **Wake-on-LAN**: Server aus der Ferne aufwecken

> 💡 **Praxis-Tipp:** Ein Server mit 500W, der 24/7 läuft, kostet ~4.400 kWh/Jahr. Bei 30 Ct/kWh = ~1.320€/Jahr nur für Strom.

## Energie-Labels & Standards

| Label | Beschreibung |
|-------|-------------|
| **Energy Star** | Internationaler Standard für energieeffiziente Produkte |
| **EU Energieeffizienzklasse** | A (beste) bis G (schlechteste) |
| **80 PLUS** | Netzteileffizienz: Bronze (82%), Silver (85%), Gold (88%), Platinum (90%), Titanium (94%) |
| **Blauer Engel** | Deutsches Umweltzeichen für IT-Produkte |

## Recycling & Entsorgung

### Elektronikschrott (E-Waste)
- Enthält wertvolle Metalle (Gold, Kupfer, Seltene Erden)
- Enthält giftige Stoffe (Quecksilber, Blei, Cadmium)
- **WEEE-Richtlinie**: EU-Verordnung zur Entsorgung von Elektro-Altgeräten

### Kreislaufwirtschaft
- **Reduce**: Weniger konsumieren, länger nutzen
- **Reuse**: Geräte weiterverkaufen oder spenden
- **Recycle**: Fachgerechte Entsorgung, Rohstoffe zurückgewinnen

> 💡 **Praxis-Tipp:** Ein Smartphone enthält ca. 0.03g Gold, 0.3g Silber, 15g Kupfer und Seltene Erden. Recycling spart Ressourcen und verhindert Umweltverschmutzung.

## Rebound-Effekt

Der Rebound-Effekt beschreibt, wie Effizienzsteigerungen zu Mehrverbrauch führen können:
- **Direkter Rebound**: Effizientere Hardware → mehr Nutzung → gleicher Verbrauch
- **Indirekter Rebound**: Eingespartes Geld wird für andere Dinge ausgegeben
- **Beispiel**: Sparsamer Computer → 2. Computer kaufen → mehr Verbrauch als vorher

## Klimaneutralität & Umweltschutz

### Maßnahmen für Unternehmen
1. **Erneuerbare Energien** für Rechenzentren
2. **Free Cooling**: Außenluft statt Klimaanlage
3. **Server-Konsolidierung**: Weniger physische Server durch Virtualisierung
4. **Green Procurement**: Energieeffiziente Produkte einkaufen
5. **Carbon Offsetting**: Kompensation durch Projekte

### EMAS & ISO 14001
- **EMAS** (Eco-Management and Audit Scheme): EU-Umweltmanagementsystem
- **ISO 14001**: Internationaler Standard für Umweltmanagement

> 💡 **IHK-Tipp:** Green IT ist ein häufiges Prüfungsthema! Kenne mindestens 3 konkrete Maßnahmen und den Rebound-Effekt.

> ⚠️ **Häufige Fehler:** "Cloud ist automatisch grüner" — Kommt darauf an! Wenn das Rechenzentrum Kohlestrom nutzt, kann Cloud sogar schlechter sein.

> **Nächste Lektion:** Historische Entwicklung — Von Röhren über Transistoren zu Mikroprozessoren: Wie hat sich die Computertechnik entwickelt, und was ist Moores Gesetz?
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 11: Historische Entwicklung & Zusammenfassung
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-11",
      title: "Historische Entwicklung",
      duration: "15 min",
      type: "interactive",
      interactive: "storageComparator",
      content: `## Die vier Generationen

> In der letzten Lektion haben wir Green IT kennengelernt — Energieeffizienz, Recycling und den Rebound-Effekt. Jetzt machen wir einen Schritt zurück in die Geschichte: Wie hat sich die Computertechnik von den Anfängen bis heute entwickelt?

> 📝 **Merksatz:** "**R**olf **T**rinkt **I**mmer **M**ilch" — **R**öhren, **T**ransistoren, **I**ntegrierte Schaltungen, **M**ikroprozessoren

---

### 1. Generation: Röhren (1940–1955)

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="520" height="160" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="30" width="60" height="100" rx="30" fill="none" stroke="#f59e0b" stroke-width="2"/>
  <ellipse cx="50" cy="50" rx="12" ry="8" fill="#f59e0b" fill-opacity="0.3"/>
  <line x1="50" y1="58" x2="50" y2="90" stroke="#f59e0b" stroke-width="1.5"/>
  <ellipse cx="50" cy="100" rx="12" ry="8" fill="#f59e0b" fill-opacity="0.3"/>
  <text x="50" y="145" text-anchor="middle" fill="#fcd34d" font-size="10">Röhre</text>
  <text x="120" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Technologie</text>
  <text x="120" y="52" fill="#e2e8f0" font-size="10">Elektronenröhren</text>
  <text x="120" y="75" fill="#93c5fd" font-size="11" font-weight="bold">Eigenschaften</text>
  <text x="120" y="92" fill="#e2e8f0" font-size="10">Riesig (ganze Räume)</text>
  <text x="120" y="107" fill="#e2e8f0" font-size="10">Extrem stromhungrig, viel Wärme</text>
  <text x="320" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Beispiele</text>
  <text x="320" y="52" fill="#e2e8f0" font-size="10">ENIAC (1945), Z3 (1941)</text>
  <text x="320" y="75" fill="#93c5fd" font-size="11" font-weight="bold">Programmierung</text>
  <text x="320" y="92" fill="#e2e8f0" font-size="10">Maschinensprache, Lochkarten</text>
  <text x="320" y="115" fill="#93c5fd" font-size="11" font-weight="bold">Größe</text>
  <text x="320" y="132" fill="#e2e8f0" font-size="10">Ganze Räume nötig</text>
</svg>

---

### 2. Generation: Transistoren (1955–1965)

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="520" height="160" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="30" y="50" width="40" height="60" rx="4" fill="none" stroke="#10b981" stroke-width="2"/>
  <line x1="50" y1="50" x2="50" y2="30" stroke="#10b981" stroke-width="2"/>
  <line x1="30" y1="70" x2="10" y2="70" stroke="#10b981" stroke-width="2"/>
  <line x1="70" y1="70" x2="90" y2="70" stroke="#10b981" stroke-width="2"/>
  <text x="50" y="145" text-anchor="middle" fill="#6ee7b7" font-size="10">Transistor</text>
  <text x="120" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Technologie</text>
  <text x="120" y="52" fill="#e2e8f0" font-size="10">Transistoren (Halbleiter)</text>
  <text x="120" y="75" fill="#93c5fd" font-size="11" font-weight="bold">Eigenschaften</text>
  <text x="120" y="92" fill="#e2e8f0" font-size="10">Kleiner, schneller, zuverlässiger</text>
  <text x="120" y="107" fill="#e2e8f0" font-size="10">Weniger Stromverbrauch</text>
  <text x="320" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Beispiele</text>
  <text x="320" y="52" fill="#e2e8f0" font-size="10">IBM 7090, UNIVAC III</text>
  <text x="320" y="75" fill="#93c5fd" font-size="11" font-weight="bold">Programmierung</text>
  <text x="320" y="92" fill="#e2e8f0" font-size="10">Erste Hochsprachen</text>
  <text x="320" y="107" fill="#e2e8f0" font-size="10">(FORTRAN, COBOL)</text>
</svg>

---

### 3. Generation: Integrierte Schaltungen (1965–1980)

<svg viewBox="0 0 520 160" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="520" height="160" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="40" width="80" height="80" rx="4" fill="none" stroke="#8b5cf6" stroke-width="2"/>
  <rect x="30" y="50" width="20" height="20" rx="2" fill="#8b5cf6" fill-opacity="0.3"/>
  <rect x="55" y="50" width="20" height="20" rx="2" fill="#8b5cf6" fill-opacity="0.3"/>
  <rect x="30" y="75" width="20" height="20" rx="2" fill="#8b5cf6" fill-opacity="0.3"/>
  <rect x="55" y="75" width="20" height="20" rx="2" fill="#8b5cf6" fill-opacity="0.3"/>
  <text x="60" y="145" text-anchor="middle" fill="#c4b5fd" font-size="10">IC-Chip</text>
  <text x="130" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Technologie</text>
  <text x="130" y="52" fill="#e2e8f0" font-size="10">ICs (viele Transistoren</text>
  <text x="130" y="67" fill="#e2e8f0" font-size="10">auf einem Chip)</text>
  <text x="130" y="90" fill="#93c5fd" font-size="11" font-weight="bold">Eigenschaften</text>
  <text x="130" y="107" fill="#e2e8f0" font-size="10">Noch kleiner, schneller</text>
  <text x="130" y="122" fill="#e2e8f0" font-size="10">Massenproduktion möglich</text>
  <text x="320" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Beispiele</text>
  <text x="320" y="52" fill="#e2e8f0" font-size="10">IBM System/360, PDP-8</text>
  <text x="320" y="75" fill="#93c5fd" font-size="11" font-weight="bold">Programmierung</text>
  <text x="320" y="92" fill="#e2e8f0" font-size="10">Betriebssysteme</text>
  <text x="320" y="107" fill="#e2e8f0" font-size="10">Time-Sharing</text>
</svg>

---

### 4. Generation: Mikroprozessoren (1980–heute)

<svg viewBox="0 0 520 200" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="520" height="200" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="40" width="80" height="80" rx="4" fill="none" stroke="#3b82f6" stroke-width="2"/>
  <rect x="25" y="45" width="70" height="70" rx="2" fill="#3b82f6" fill-opacity="0.15"/>
  <text x="60" y="85" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">CPU</text>
  <text x="60" y="145" text-anchor="middle" fill="#93c5fd" font-size="10">Mikroprozessor</text>
  <text x="130" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Technologie</text>
  <text x="130" y="52" fill="#e2e8f0" font-size="10">VLSI — Millionen/</text>
  <text x="130" y="67" fill="#e2e8f0" font-size="10">Billionen Transistoren</text>
  <text x="130" y="90" fill="#93c5fd" font-size="11" font-weight="bold">Eigenschaften</text>
  <text x="130" y="107" fill="#e2e8f0" font-size="10">PC für jedermann</text>
  <text x="130" y="122" fill="#e2e8f0" font-size="10">Mobilgeräte, Cloud</text>
  <text x="320" y="35" fill="#93c5fd" font-size="11" font-weight="bold">Beispiele</text>
  <text x="320" y="52" fill="#e2e8f0" font-size="10">Intel 4004 (1971)</text>
  <text x="320" y="67" fill="#e2e8f0" font-size="10">IBM PC (1981)</text>
  <text x="320" y="82" fill="#e2e8f0" font-size="10">Smartphone, KI-Chips</text>
  <text x="320" y="105" fill="#93c5fd" font-size="11" font-weight="bold">Programmierung</text>
  <text x="320" y="122" fill="#e2e8f0" font-size="10">Hochsprachen, Internet</text>
  <text x="320" y="137" fill="#e2e8f0" font-size="10">KI</text>
  <text x="320" y="160" fill="#93c5fd" font-size="11" font-weight="bold">Größe</text>
  <text x="320" y="177" fill="#e2e8f0" font-size="10">Fingernagel-groß</text>
</svg>

---

## Meilensteine

| Jahr | Meilenstein |
|------|-----------|
| 1941 | Z3 — erster programmierbarer Computer (Konrad Zuse) |
| 1945 | ENIAC — erster elektronischer Universalrechner |
| 1958 | Erster Integrated Circuit (Jack Kilby) |
| 1969 | ARPANET — Vorläufer des Internets |
| 1971 | Intel 4004 — erster Mikroprozessor |
| 1981 | IBM PC — Start der PC-Ära |
| 1983 | Internet (TCP/IP) wird Standard |
| 1990 | World Wide Web (Tim Berners-Lee) |
| 1998 | Google wird gegründet |
| 2007 | iPhone — Start der Smartphone-Ära |
| 2020er | KI-Boom (GPT, ChatGPT, LLMs) |

## Moores Gesetz

Gordon Moore (Intel-Mitgründer) stellte 1965 fest:
- **Aussage**: Die Anzahl der Transistoren auf einem Chip verdoppelt sich alle ~18-24 Monate
- **Bis ~2010**: Traf erstaunlich genau zu
- **Heute**: Physikalische Grenzen erreicht (Atomgröße), aber neue Ansätze (3D-Chips, Quantencomputer)

### Exponentielles Wachstum
| Jahr | Transistoren (ca.) |
|------|-------------------|
| 1971 | 2.300 (Intel 4004) |
| 1989 | 1.200.000 (Intel 486) |
| 2000 | 42.000.000 (Pentium 4) |
| 2020 | 54.000.000.000 (Apple M1 Max) |
| 2024 | 134.000.000.000 (Apple M2 Ultra) |

> 💡 **Praxis-Tipp:** Moores Gesetz ist kein physikalisches Gesetz, sondern eine empirische Beobachtung. Es hat die Industrie als Zielvorgabe inspiriert.

## Zusammenfassung: Die wichtigsten Konzepte

Dieses Modul hat die gesamte Hardware- und Systemlandschaft abgedeckt:

| Thema | Kernkonzept |
|-------|-----------|
| **CPU** | Von-Neumann, Fetch-Decode-Execute, CISC/RISC |
| **Busse** | Adress-, Daten-, Steuerbus |
| **Speicher** | Hierarchie (Register → HDD), SRAM/DRAM |
| **Speichermedien** | Magnetisch, Optisch, Halbleiter |
| **RAID** | 0/1/5/6/10 — Leistung vs. Sicherheit |
| **Speicherverwaltung** | Paging, Virtueller Speicher, Endianness |
| **Betriebssysteme** | Kernel, Prozesse, Dateisysteme |
| **Virtualisierung** | Typ 1/2, Container, IaaS/PaaS/SaaS |
| **Green IT** | Energieeffizienz, Recycling, Rebound |

> 💡 **IHK-Tipp:** Die Computertechnik-Prüfung kombiniert oft mehrere Themen. Beispiel: "Ein Unternehmen braucht einen Server mit RAID, virtueller Speicherverwaltung und Cloud-Anbindung — welche Komponenten und Konzepte sind relevant?"

> **Nächste Lektion:** BIOS/UEFI & Bootvorgang — POST, MBR/GPT und der Bootloader: Was passiert, bevor das Betriebssystem startet?

[INTERACTIVE]
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 12: BIOS/UEFI & Bootvorgang
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-12",
      title: "BIOS/UEFI & Bootvorgang",
      duration: "20 min",
      type: "interactive",
      interactive: "bootSequenceBuilder",
      content: `## Grundlagen: Was passiert beim Einschalten?

> In der letzten Lektion haben wir die historische Entwicklung der IT kennengelernt — von Röhren über Transistoren zu Mikroprozessoren und Moores Gesetz. Jetzt schauen wir uns an, was genau passiert, wenn ein moderner Computer eingeschaltet wird.

Wenn du den Power-Button drückst, durchläuft der Computer eine standardisierte Kette von Ereignissen, bevor das Betriebssystem startet.

> 📝 **Merksatz:** **POST → BIOS → Bootmedium → MBR/GPT → Bootloader → Kernel → Login**

## POST — Power-On Self-Test

Der POST ist der erste Schritt nach dem Einschalten:
- CPU wird initialisiert
- RAM wird geprüft (Größe, Fehler)
- Grafikkarte wird erkannt
- Tastatur/Maus werden gesucht
- Festplatten/SSDs werden erkannt

**Tonsignale bei Fehlern:**
| Signal | Bedeutung |
|--------|-----------|
| 1 kurz | Alles OK |
| 1 lang, 1 kurz | RAM-Fehler |
| 1 lang, 2 kurz | Grafikkarten-Fehler |
| Dauerpiepen | Kein RAM eingesetzt |

> 💡 **IHK-Tipp:** Kenne die POST-Tonsignale! "Ein PC piept beim Einschalten dauerhaft — was ist defekt?"

## BIOS vs. UEFI

| Merkmal | BIOS | UEFI |
|---------|------|------|
| **Architektur** | 16-Bit | 32/64-Bit |
| **Partitionierung** | MBR (max. 2 TB, 4 Partitionen) | GPT (max. 9,4 ZB, 128 Partitionen) |
| **Oberfläche** | Text, nur Tastatur | Grafisch, Maus |
| **Secure Boot** | Nein | Ja |
| **Netzwerk** | Nein | Ja (Fernwartung) |
| **Startgeschwindigkeit** | Langsam | Schnell |

### MBR vs. GPT
- **MBR** (Master Boot Record): Erster Sektor (512 Byte). Enthält Bootloader + Partitionstabelle (max. 4 primäre Partitionen, max. 2 TB)
- **GPT** (GUID Partition Table): Modern, bis zu 128 Partitionen, bis zu 9,4 ZB. Enthält Redundanz (Backup-Header).

## ROM-Typen

Das BIOS/UEFI liegt auf einem nicht-flüchtigen Speicherchip:

| Typ | Beschreibung |
|-----|-------------|
| **ROM** | Fest verdrahtet, nicht änderbar |
| **PROM** | Einmal programmierbar (dauerhaft) |
| **EPROM** | Löschbar durch UV-Licht |
| **EEPROM** | Elektronisch löschbar |
| **Flash-EEPROM** | Modern: In USB-Sticks, SSDs, BIOS-Chips |

> 💡 **Praxis-Tipp:** Moderne Mainboards nutzen Flash-EEPROM für das BIOS/UEFI. Ein BIOS-Update ("Flashen") überschreibt den Chip-Inhalt.

## Bootloader

Nach POST und BIOS/UEFI wird der Bootloader gestartet:

| OS | Bootloader |
|----|-----------|
| **Windows** | Windows Boot Manager (bootmgr) |
| **Linux** | GRUB2, systemd-boot |
| **macOS** | boot.efi |

Der Bootloader lädt den Kernel des Betriebssystems in den RAM und übergibt die Kontrolle.

## Der komplette Bootvorgang

1. **Einschalten** — Stromversorgung stabilisiert sich
2. **POST** — Hardware wird geprüft
3. **BIOS/UEFI** — Firmware wird geladen
4. **Bootmedium suchen** — Bootsequenz (HDD, SSD, USB, Netzwerk)
5. **MBR/GPT lesen** — Partitionstabelle wird gelesen
6. **Bootloader starten** — GRUB, bootmgr
7. **Kernel laden** — OS-Kernel in RAM
8. **Treiber laden** — Storage, Netzwerk, Display
9. **Init-Prozess** — Erster Prozess (systemd, init)
10. **Login** — System ist bereit

> 💡 **IHK-Tipp:** "Beschreiben Sie den Bootvorgang eines PCs" — die 10 Schritte können als PAP oder Struktogramm verlangt werden.

> **Nächste Lektion:** Serielle Datenübertragung — RS-232, Parität, USB-Versionen und Schnittstellen: Wie werden Daten bitweise übertragen?

[INTERACTIVE]
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 13: Serielle Datenübertragung
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "hw-13",
      title: "Serielle Datenübertragung",
      duration: "15 min",
      type: "interactive",
      interactive: "dataTransmissionVisualizer",
      content: `## Seriell vs. Parallel

> In der letzten Lektion haben wir den Bootvorgang kennengelernt — POST, BIOS/UEFI, MBR/GPT und den Bootloader. Jetzt widmen wir uns der grundlegendsten Frage der Datenverarbeitung: Wie werden Bits eigentlich von A nach B übertragen?

Es gibt zwei grundlegende Arten, Daten zu übertragen:

| Merkmal | Seriell | Parallel |
|---------|---------|----------|
| **Leitungen** | 1 Datenleitung | n Datenleitungen |
| **Geschwindigkeit** | Pro Bit 1 Takt | Alle Bits gleichzeitig |
| **Distanz** | Große Distanzen | Kurze Distanzen |
| **Kosten** | Günstig (wenig Kabel) | Teuer (viele Kabel) |
| **Problem** | Pro Takt 1 Bit (aber hohe Frequenzen) | Signalversatz (Skew) |
| **Beispiele** | USB, SATA, Ethernet, RS-232 | PCIe, RAM-Bus, Parallel-ATA (alt) |

> 💡 **Praxis-Tipp:** Heute dominiert die serielle Übertragung. Selbst PCIe ist intern seriell (pro Lane). Der Vorteil: Kein Signalversatz, günstigere Kabel, höhere Taktfrequenzen möglich.

## RS-232 — Der serielle Klassiker

RS-232 ist ein älterer serieller Standard (1962). Er definiert die physische Schnittstelle und die Signalpegel für serielle Kommunikation.

### Der Seriellrahmen (8N1)

Ein Datenrahmen bei RS-232 besteht aus:

| Teil | Bits | Beschreibung |
|------|------|-------------|
| **Start-Bit** | 1 | Immer 0 — signalisiert Beginn |
| **Datenbits** | 7 oder 8 | Die eigentlichen Daten |
| **Paritätsbit** | 0 oder 1 | Fehlererkennung (optional) |
| **Stopp-Bit(e)** | 1 oder 2 | Immer 1 — signalisiert Ende |

**8N1** = 8 Datenbits, keine Parität (None), 1 Stopp-Bit = 10 Bit pro Rahmen.

> 💡 **IHK-Tipp:** "Was bedeutet 8N1?" — 8 Datenbits, keine Parität, 1 Stopp-Bit!

## Parität — Einfache Fehlererkennung

Das Paritätsbit ermöglicht die Erkennung von 1-Bit-Fehlern:

| Typ | Regel | Beispiel (1011001) |
|-----|-------|-------------------|
| **Gerade Parität** | Anzahl der 1en ist gerade | 1+0+1+1+0+0+1 = 4 (gerade) → Parität = 0 |
| **Ungerade Parität** | Anzahl der 1en ist ungerade | 4 (gerade) → Parität = 1 |

> 💡 **Praxis-Tipp:** Parität erkennt nur Fehler mit ungerader Bitanzahl. Bei 2 Bit-Fehlern bleibt der Fehler unentdeckt. Für bessere Sicherheit: CRC (Cyclic Redundancy Check).

## Übertragungsgeschwindigkeit

Die Geschwindigkeit einer seriellen Verbindung wird in **Baud** (Symbolrate) oder **Bit/s** angegeben.

### Berechnung
- **Brutto**: Baudrate = Bit/s (bei 1 Bit pro Symbol)
- **Netto**: Weniger als Brutto, weil Overhead (Start-, Stopp-, Paritätsbit)

**Beispiel 8N1 bei 9600 Baud:**
- Rahmenlänge: 1 (Start) + 8 (Daten) + 0 (Parität) + 1 (Stopp) = 10 Bit
- Netto: 9600 / 10 × 8 = 7.680 Byte/s ≈ 7,5 KB/s

**Beispiel 8E1 bei 115200 Baud:**
- Rahmenlänge: 1 + 8 + 1 + 1 = 11 Bit
- Netto: 115200 / 11 × 8 ≈ 83.782 Byte/s ≈ 81,8 KB/s

> 💡 **IHK-Tipp:** "Berechne die effektive Datenrate bei 9600 Baud und 8N1" — Formel: Baudrate / Rahmenlänge × Datenbits

## Schnittstellen im Überblick

| Schnittstelle | Typ | Geschwindigkeit | Einsatz |
|--------------|-----|----------------|---------|
| **USB 1.0** | Seriell | 12 Mbit/s | Alt |
| **USB 2.0** | Seriell | 480 Mbit/s | Standard |
| **USB 3.0** | Seriell | 5 Gbit/s | Schnell |
| **USB 3.2** | Seriell | 20 Gbit/s | Sehr schnell |
| **USB-C** | Seriell | Bis 40 Gbit/s (USB4) | Modern |
| **SATA III** | Seriell | 6 Gbit/s | HDD/SSD |
| **NVMe (PCIe 4.0)** | Seriell | 8 GB/s pro Lane | High-End SSD |
| **Thunderbolt 4** | Seriell | 40 Gbit/s | Alles (Display, Daten, Laden) |
| **RS-232** | Seriell | 115,2 Kbit/s | Legacy, Industrie |

> 💡 **IHK-Tipp:** Kenne die USB-Versionen und ihre Geschwindigkeiten! "Welche USB-Version bietet 5 Gbit/s?" → USB 3.0

[INTERACTIVE]
`,
    },
    {
      id: "hw-14",
      title: "Wissenstest: Computersysteme & Hardware",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Computersysteme & Hardware

Teste dein Wissen über CPU-Architektur, Speicherhierarchie, RAID, BIOS/UEFI und Virtualisierung!`,
    },
  ],
};

