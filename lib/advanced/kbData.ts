import { Module, QuizQuestion } from "../types";

export const advKBModule: Module = {
  id: "adv-kb", slug: "adv-kb",
  title: "Kommunikationssysteme & Bussysteme",
  description: "Bussysteme (CAN, LIN, FlexRay, MOST), OSI im Fahrzeug, Echtzeitkommunikation, AUTOSAR, Signalübertragung — mit Original-Klausurfragen.",
  icon: "🔌", color: "#10B981", progress: 0, category: "advanced",
  lessons: [
    {
      id: "kb-grundlagen", title: "Bussysteme im Fahrzeug", duration: "30 min", type: "text",
      content: "## Bussysteme — Die Nervenbahnen des Fahrzeugs\n\nModerne Fahrzeuge: bis zu **100 Steuergeräte (ECUs)** über Bussysteme vernetzt.\n\n### Vergleich\n\n| Bus | Datenrate | Topologie | Einsatz |\n|-----|----------|-----------|--------|\n| LIN | 20 kbit/s | Master-Slave | Komfort |\n| CAN | 1 Mbit/s | Bus (Multimaster) | Antrieb |\n| CAN FD | 8 Mbit/s | Bus | Wie CAN |\n| FlexRay | 10 Mbit/s | Stern/Bus | X-by-Wire |\n| MOST | 150 Mbit/s | Ring | Infotainment |\n| Automotive Ethernet | 100M-10G | Stern | ADAS, Backbone |\n\n### Bus-Hierarchie — Vom Backbone zum Sensor\n\n<svg viewBox=\"0 0 380 310\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:380px;margin:1rem auto;display:block\">\n  <defs>\n    <linearGradient id=\"ethGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" style=\"stop-color:#f59e0b;stop-opacity:0.2\"/><stop offset=\"100%\" style=\"stop-color:#f59e0b;stop-opacity:0.05\"/></linearGradient>\n    <linearGradient id=\"frGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" style=\"stop-color:#ef4444;stop-opacity:0.2\"/><stop offset=\"100%\" style=\"stop-color:#ef4444;stop-opacity:0.05\"/></linearGradient>\n    <linearGradient id=\"canGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" style=\"stop-color:#3b82f6;stop-opacity:0.2\"/><stop offset=\"100%\" style=\"stop-color:#3b82f6;stop-opacity:0.05\"/></linearGradient>\n    <linearGradient id=\"linGrad\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\"><stop offset=\"0%\" style=\"stop-color:#10b981;stop-opacity:0.2\"/><stop offset=\"100%\" style=\"stop-color:#10b981;stop-opacity:0.05\"/></linearGradient>\n  </defs>\n  <!-- Layer 1: Ethernet -->\n  <rect x=\"20\" y=\"15\" width=\"340\" height=\"55\" rx=\"10\" fill=\"url(#ethGrad)\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"38\" text-anchor=\"middle\" fill=\"#fcd34d\" font-size=\"13\" font-weight=\"bold\">Ethernet (Backbone)</text>\n  <text x=\"190\" y=\"58\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">ADAS, Kameras, Gateway — 100 Mbit/s – 10 Gbit/s</text>\n  <!-- Arrow -->\n  <line x1=\"190\" y1=\"70\" x2=\"190\" y2=\"95\" stroke=\"#475569\" stroke-width=\"1.5\" marker-end=\"url(#arrowBlue)\"/>\n  <defs><marker id=\"arrowBlue\" markerWidth=\"8\" markerHeight=\"8\" refX=\"4\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 Z\" fill=\"#94a3b8\"/></marker></defs>\n  <!-- Layer 2: FlexRay / CAN FD -->\n  <rect x=\"20\" y=\"95\" width=\"340\" height=\"55\" rx=\"10\" fill=\"url(#frGrad)\" stroke=\"#ef4444\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"118\" text-anchor=\"middle\" fill=\"#fca5a5\" font-size=\"13\" font-weight=\"bold\">FlexRay / CAN FD</text>\n  <text x=\"190\" y=\"138\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">Fahrwerk, X-by-Wire — ⚡ zeitkritisch!</text>\n  <!-- Arrow -->\n  <line x1=\"190\" y1=\"150\" x2=\"190\" y2=\"175\" stroke=\"#475569\" stroke-width=\"1.5\" marker-end=\"url(#arrowBlue)\"/>\n  <!-- Layer 3: CAN -->\n  <rect x=\"20\" y=\"175\" width=\"340\" height=\"55\" rx=\"10\" fill=\"url(#canGrad)\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"198\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"13\" font-weight=\"bold\">CAN (klassisch)</text>\n  <text x=\"190\" y=\"218\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">Motor, Bremse, Lenkung — 1 Mbit/s</text>\n  <!-- Arrow -->\n  <line x1=\"190\" y1=\"230\" x2=\"190\" y2=\"255\" stroke=\"#475569\" stroke-width=\"1.5\" marker-end=\"url(#arrowBlue)\"/>\n  <!-- Layer 4: LIN -->\n  <rect x=\"20\" y=\"255\" width=\"340\" height=\"45\" rx=\"10\" fill=\"url(#linGrad)\" stroke=\"#10b981\" stroke-width=\"1.5\"/>\n  <text x=\"190\" y=\"275\" text-anchor=\"middle\" fill=\"#6ee7b7\" font-size=\"13\" font-weight=\"bold\">LIN (Local Interconnect Network)</text>\n  <text x=\"190\" y=\"292\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">Fensterheber, Sitze, Klima — 20 kbit/s</text>\n</svg>\n\n> 💡 **Merke:** Je sicherheitskritischer die Anwendung, desto **deterministischer** der Bus! Ethernet→FlexRay→CAN→LIN",
    },
    {
      id: "kb-can", title: "CAN-Bus (Controller Area Network)", duration: "40 min", type: "text",
      content: "## CAN-Bus — Der Automotive-Standard\n\n> 🚗 1986 von Bosch entwickelt. In **jedem** modernen Fahrzeug verbaut. CAN macht das Auto erst möglich!\n\n### 🔌 Physikalische Schicht\n\nCAN nutzt eine ==differentielle Übertragung== über zwei verdrillte Leitungen (==Twisted Pair==):\n\n| Signal | CAN_H | CAN_L | Bedeutung |\n|--------|-------|-------|----------|\n| ==Dominant (0)== | ~3,5 V | ~1,5 V | **Gewinnt** bei Kollision! |\n| ==Rezessiv (1)== | ~2,5 V | ~2,5 V | Rückzug bei Kollision |\n\n> 💡 **Dominant gewinnt!** Dieses Prinzip ermöglicht die **bitweise Arbitrierung** direkt auf dem Bus — CSMA/CA ohne Datenverlust.\n\n### 📦 Frame-Aufbau (Standard, 11-Bit ID)\n\n| Feld | Bits | Beschreibung |\n|------|------|-------------|\n| SOF | 1 | Start of Frame — synchronisiert alle Teilnehmer |\n| ==ID== | 11 | Identifier — **bestimmt die Priorität!** |\n| RTR | 1 | Remote Transmission Request |\n| IDE | 1 | Identifier Extension (0 = Standard) |\n| r0 | 1 | Reserviert |\n| ==DLC== | 4 | Data Length Code (0–8 Bytes) |\n| DATA | 0–64 | Nutzdaten (CAN FD: bis 64 Bytes) |\n| ==CRC== | 15 | Cyclic Redundancy Check — Fehlererkennung |\n| ACK | 2 | Acknowledgment — Empfänger bestätigt |\n| EOF | 7 | End of Frame |\n\n### ⚔️ Arbitrierung — Wer darf senden?\n\n1. **Warte auf Bus-Ruhe** (Interframe Space)\n2. **Sende ID Bit für Bit** und beobachte den Bus\n3. Wer 0 (dominant) sendet, **überschreibt** 1 (rezessiv)\n4. Wer seine eigene ID nicht mehr erkennt, hat **verloren** → wird Empfänger\n5. Gewinner sendet **ohne Unterbrechung** weiter\n\n> ✅ ==Niedrigere ID = höhere Priorität!== Keine Kollisionen, keine Datenverluste!\n\n### 🛡️ Fehlererkennung — 5 Mechanismen\n\nCAN erkennt Fehler auf **5 Arten** gleichzeitig:\n\n| Mechanismus | Beschreibung |\n|-------------|-------------|\n| ==Bit Monitoring== | Sender vergleicht gesendetes Bit mit Bus-Pegel |\n| ==CRC-Check== | 15-Bit-Prüfsumme über den gesamten Frame |\n| ==Form Check== | Prüft feste Bit-Positionen (SOF, EOF, ACK) |\n| ==Stuff Error== | Nach 5 gleichen Bits wird ein Stuff-Bit eingefügt |\n| ==Ack Check== | Empfänger muss dominanten ACK-Pegel setzen |\n\n### 📊 Fehlerzustände (Error States)\n\nJeder CAN-Knoten führt zwei ==Fehlerzähler==: TEC (Transmit Error Counter) und REC (Receive Error Counter).\n\n| Zustand | Bedingung | Verhalten |\n|---------|-----------|----------|\n| 🟢 ==Error Active== | TEC < 128 und REC < 128 | Normalbetrieb, sendet Active Error Flags |\n| 🟡 ==Error Passive== | TEC ≥ 128 oder REC ≥ 128 | Sendet nur Passive Error Flags |\n| 🔴 ==Bus Off== | TEC ≥ 256 | **Trennt sich komplett vom Bus!** |\n\n> ⚠️ **Bus Off ist kritisch!** Der Knoten muss resetet werden, bevor er wieder am Bus teilnehmen darf.",
    },
    {
      id: "kb-flexray", title: "FlexRay & zeitgesteuerte Protokolle", duration: "35 min", type: "text",
      content: "## FlexRay — Der Deterministische\n\n> 🎯 FlexRay wurde für **sicherheitskritische X-by-Wire-Anwendungen** entwickelt — Lenken, Bremsen, Gasgeben **ohne mechanische Verbindung**. Dafür braucht man **garantierte Antwortzeiten**.\n\n### 🤔 Warum braucht man FlexRay?\n\n| | CAN | FlexRay |\n|---|-----|--------|\n| **Prinzip** | Ereignisgesteuert (CSMA/CA) | ==Zeitgesteuert (TDMA)== |\n| **Antwortzeit** | Nicht garantiert | **Garantiert!** |\n| **Bandbreite** | 1 Mbit/s | ==10 Mbit/s== |\n| **Einsatz** | Motor, Bremse, Komfort | ==X-by-Wire, Fahrwerk== |\n\n> 💡 CAN ist wie eine Diskussion: Wer am lautesten spricht, gewinnt. FlexRay ist wie ein **Fahrplan**: Jeder hat seinen festen Slot.\n\n### ⏱️ Der Kommunikationszyklus\n\nEin FlexRay-Zyklus besteht aus drei Segmenten:\n\n<svg viewBox=\"0 0 500 120\" xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:500px;margin:1rem auto;display:block\">\n  <defs>\n    <linearGradient id=\"frStatic\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" style=\"stop-color:#3b82f6;stop-opacity:0.3\"/>\n      <stop offset=\"100%\" style=\"stop-color:#3b82f6;stop-opacity:0.15\"/>\n    </linearGradient>\n    <linearGradient id=\"frDyn\" x1=\"0%\" y1=\"0%\" x2=\"100%\" y2=\"0%\">\n      <stop offset=\"0%\" style=\"stop-color:#f59e0b;stop-opacity:0.3\"/>\n      <stop offset=\"100%\" style=\"stop-color:#f59e0b;stop-opacity:0.15\"/>\n    </linearGradient>\n  </defs>\n  <rect x=\"10\" y=\"35\" width=\"230\" height=\"50\" rx=\"8\" fill=\"url(#frStatic)\" stroke=\"#3b82f6\" stroke-width=\"1.5\"/>\n  <text x=\"125\" y=\"58\" text-anchor=\"middle\" fill=\"#93c5fd\" font-size=\"12\" font-weight=\"bold\">Statisch (TDMA)</text>\n  <text x=\"125\" y=\"76\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"10\">deterministisch</text>\n  <rect x=\"248\" y=\"35\" width=\"170\" height=\"50\" rx=\"8\" fill=\"url(#frDyn)\" stroke=\"#f59e0b\" stroke-width=\"1.5\"/>\n  <text x=\"333\" y=\"58\" text-anchor=\"middle\" fill=\"#fcd34d\" font-size=\"12\" font-weight=\"bold\">Dynamisch (FTDMA)</text>\n  <text x=\"333\" y=\"76\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"10\">ereignisgesteuert</text>\n  <rect x=\"426\" y=\"35\" width=\"65\" height=\"50\" rx=\"8\" fill=\"rgba(148,163,184,0.15)\" stroke=\"#64748b\" stroke-width=\"1.5\"/>\n  <text x=\"458\" y=\"58\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"12\" font-weight=\"bold\">NIT</text>\n  <text x=\"458\" y=\"76\" text-anchor=\"middle\" fill=\"#64748b\" font-size=\"10\">Sync</text>\n</svg>\n\n| Segment | Verfahren | Eigenschaft |\n|---------|-----------|-------------|\n| 🔵 **Statisch** | ==TDMA== | Feste Zeitschlitze — **garantiert** |\n| 🟡 **Dynamisch** | ==FTDMA== | Flexible Slots — ereignisgesteuert |\n| ⚪ **NIT** | Network Idle Time | Synchronisation + Reserve |\n\n### 🔄 Redundanz\n\nFlexRay hat **zwei physikalische Kanäle** (A und B):\n\n| Modus | Kanal A | Kanal B | Effekt |\n|-------|---------|---------|--------|\n| **Redundant** | Daten | Gleiche Daten | ==Ausfallsicherheit== |\n| **Parallel** | Daten 1 | Daten 2 | ==Doppelte Bandbreite== |\n\n### ⚙️ Typische Parameter\n\n| Parameter | Wert | Bedeutung |\n|-----------|------|-----------|\n| Cycle Length | ==5 ms== | Dauer eines Kommunikationszyklus |\n| Macrotick | ==1 µs== | Kleinste Zeiteinheit |\n| Static Slots | 62 | Maximale Anzahl statischer Slots |\n\n> 💡 **IHK-Tipp:** FlexRay = Zeitgesteuert (TDMA) + Redundanz (2 Kanäle) + 10 Mbit/s. Einsatz: X-by-Wire, Fahrwerk.",
    },
    {
      id: "kb-autosar", title: "AUTOSAR", duration: "35 min", type: "text",
      content: "## AUTOSAR (AUTomotive Open System ARchitecture)\n\n### Classic vs. Adaptive\n\n| | Classic | Adaptive |\n|---|---------|----------|\n| Ziel | Echtzeit-ECUs | Hochleistungsrechner |\n| OS | OSEK | POSIX (Linux) |\n| Sprache | C | C++ |\n| Einsatz | Motor, Bremse | ADAS, Gateway |\n\n### Schichten (Classic)\n\n    SWC (Applikation)          ← Anwendung\n    RTE (Runtime Environment)  ← Middleware / VFB\n    BSW (Basis-Software)       ← Dienste, COM, OS\n    MCAL                       ← Treiber\n    Hardware (ECU)             ← Steuergerät\n\n### VFB (Virtual Functional Bus)\n\nSWCs kommunizieren ohne zu wissen, auf welchem Steuergerät sie laufen.\n\n- **Sender-Receiver:** 1 sendet, viele empfangen (Sensordaten)\n- **Client-Server:** 1 stellt Dienst, andere rufen auf",
    },
    {
      id: "kb-signale", title: "Signalübertragung", duration: "30 min", type: "text",
      content: "## Signalübertragung — Vom Bit zur Spannung\n\n> ⚡ Wenn elektrische Signale über Kabel reisen, verhalten sie sich nach den Gesetzen der **Leitungstheorie**. Das Verständnis von Impedanz, Reflexion und EMV ist essentiell für die Fahrzeugkommunikation.\n\n### 📡 Leitungstheorie — Grundlagen\n\nJede Leitung hat eine ==charakteristische Impedanz $Z_0$==, die vom Leitungsaufbau abhängt:\n\n$$Z_0 = \\\\sqrt{\\frac{R + j\\\\omega L}{G + j\\\\omega C}}$$\n\n| Parameter | Bedeutung | Einheit |\n|-----------|-----------|--------|\n| R | Widerstandsbelag | Ω/m |\n| L | Induktivitätsbelag | H/m |\n| C | Kapazitätsbelag | F/m |\n| G | Ableitungsbelag | S/m |\n\n### 🔄 Reflexion — Wenn Signale zurückgeworfen werden\n\nWeicht die Lastimpedanz $Z_L$ von der Leitungsimpedanz $Z_0$ ab, wird ein Teil des Signals ==reflektiert==:\n\n$$\\\\Gamma = \\\\frac{Z_L - Z_0}{Z_L + Z_0} \\\\quad \\\\text{(Reflexionskoeffizient)}$$\n\n| $\\\\Gamma$ | Bedeutung | Beispiel |\n|----------|-----------|----------|\n| $\\\\Gamma = 0$ | ==Perfekte Anpassung== | Keine Reflexion — optimal! |\n| $\\\\Gamma > 0$ | Teilweise Reflexion | Impedanz-Fehlanpassung |\n| $\\\\Gamma = 1$ | ==Offenes Ende== | Vollständige Reflexion |\n| $\\\\Gamma = -1$ | ==Kurzschluss== | Phasengedrehte Reflexion |\n\n### 🔌 Terminierung — Reflexion verhindern\n\nDurch ==Abschlusswiderstände== wird $Z_L = Z_0$ erreicht:\n\n| Bus | Terminierung |\n|-----|-------------|\n| ==CAN== | **120 Ω** an beiden Bus-Enden |\n| FlexRay | Abhängig von Topologie (Stern/Bus) |\n| Ethernet | 100 Ω differentiell |\n\n> ⚠️ **Ohne Terminierung** kann CAN nicht funktionieren — die Reflexionen zerstören die Signalintegrität!\n\n### 👁️ Augendiagramm — Signalqualität auf einen Blick\n\nDurch ==Überlagerung vieler Bits== entsteht das sogenannte **Augendiagramm**:\n\n| Zustand | Aussehen | Bedeutung |\n|---------|----------|-----------|\n| 🟢 **Große Öffnung** | Weit geöffnetes \"Auge\" | ==Gute Signalqualität== |\n| 🟡 **Kleine Öffnung** | Schmaler Spalt | Rauschen, Dämpfung |\n| 🔴 **Geschlossen** | Kein Auge erkennbar | ==Starke Störungen, Jitter== |\n\n### 🛡️ EMV — Elektromagnetische Verträglichkeit\n\n| Aspekt | Beschreibung | Maßnahme |\n|--------|-------------|----------|\n| ==Störaussendung== | Bus stört andere Geräte | ==Twisted Pair==, Schirmung |\n| ==Störfestigkeit== | Andere stören den Bus | Differentielle Übertragung |\n\n> 💡 ==Twisted Pair== (verdrillte Leitungen) reduziert Abstrahlung, weil sich die Magnetfelder der beiden Adern gegenseitig aufheben!",
    },
    {
      id: "kb-klausur", title: "Probeklausur KB — 10 Fragen", duration: "45 min", type: "quiz", examMode: true,
      content: "## KB Probeklausur — 10 Fragen\n\n### Frage 1\nNiedrigste Datenrate?\nA) CAN\nB) LIN\nC) FlexRay\nD) MOST\n\nRichtig: **B.** LIN = 20 kbit/s.\n\n### Frage 2\nCSMA/CA?\nA) Kollisionsvermeidung\nB) Central System Mgmt\nC) Continuous Signal Modulation\nD) Carrier Sync\n\nRichtig: **A.** CAN: Dominant gewinnt.\n\n### Frage 3\nCAN Bus Off ab...\nA) TEC ≥ 96\nB) TEC ≥ 128\nC) TEC ≥ 256\nD) REC ≥ 256\n\nRichtig: **C.**\n\n### Frage 4\nFlexRay statisches Segment?\nA) CSMA/CA\nB) TDMA\nC) Token Passing\nD) Polling\n\nRichtig: **B.** Feste Zeitschlitze.\n\n### Frage 5\nCAN Abschlusswiderstand?\nA) 50 Ω\nB) 100 Ω\nC) 120 Ω\nD) 250 Ω\n\nRichtig: **C.**\n\n### Frage 6\nAUTOSAR: SWCs verbindet...\nA) BSW\nB) RTE\nC) MCAL\nD) COM Stack\n\nRichtig: **B.** Runtime Environment.\n\n### Frage 7\nCAN Daten max.?\nA) 4 Bytes\nB) 8 Bytes\nC) 16 Bytes\nD) 64 Bytes\n\nRichtig: **B.** CAN FD: bis 64 Bytes.\n\n### Frage 8\nImpedanz-Fehlanpassung → ?\nA) Höhere Rate\nB) Signalreflexion\nC) Weniger Strom\nD) Auto-Terminierung\n\nRichtig: **B.**\n\n### Frage 9\nAUTOSAR = ?\nA) Automated Safety Architecture\nB) AUTomotive Open System ARchitecture\nC) Automatic OS for Auto\nD) Authorized Open Source Arch\n\nRichtig: **B.**\n\n### Frage 10\nInfotainment-Bus?\nA) LIN\nB) CAN\nC) MOST / Automotive Ethernet\nD) SENT\n\nRichtig: **C.** Hohe Bandbreite für Multimedia.",
    },
  ],
};

export const kbQuizData: Record<string, QuizQuestion[]> = {
  "adv-kb": [
    {
      question: "Welcher Bus hat die niedrigste Datenrate?",
      type: "multiple",
      options: ["CAN", "LIN", "FlexRay", "MOST"],
      correct: 1,
      explanation: "**LIN** hat nur 20 kbit/s. CAN: 1 Mbit/s, FlexRay: 10 Mbit/s, MOST: 150 Mbit/s.",
    },
    {
      question: "Wofür steht CSMA/CA bei CAN?",
      type: "multiple",
      options: ["Kollisionsvermeidung (Collision Avoidance)", "Central System Management", "Continuous Signal Modulation", "Carrier Sync"],
      correct: 0,
      explanation: "**Carrier Sense Multiple Access / Collision Avoidance**. Bei CAN gewinnt das dominante Bit (0) — kein Datenverlust bei Kollisionen.",
    },
    {
      question: "Ab welchem TEC-Wert geht ein CAN-Knoten in den Bus-Off-Zustand?",
      type: "multiple",
      options: ["TEC ≥ 96", "TEC ≥ 128", "TEC ≥ 256", "REC ≥ 256"],
      correct: 2,
      explanation: "**TEC ≥ 256** → Bus Off (Knoten trennt sich vom Bus). TEC ≥ 128 = Error Passive.",
    },
    {
      question: "Welches Verfahren nutzt das statische Segment von FlexRay?",
      type: "multiple",
      options: ["CSMA/CA", "TDMA", "Token Passing", "Polling"],
      correct: 1,
      explanation: "**TDMA (Time Division Multiple Access)** — jedem Teilnehmer werden feste Zeitschlitze zugewiesen → deterministisch.",
    },
    {
      question: "Welchen Wert hat der Abschlusswiderstand beim CAN-Bus?",
      type: "multiple",
      options: ["50 Ω", "100 Ω", "120 Ω", "250 Ω"],
      correct: 2,
      explanation: "**120 Ω** an beiden Bus-Enden. Verhindert Signalreflexionen durch Impedanzanpassung.",
    },
    {
      question: "Welche AUTOSAR-Schicht verbindet die Software-Komponenten (SWCs)?",
      type: "multiple",
      options: ["BSW (Basis-Software)", "RTE (Runtime Environment)", "MCAL", "COM Stack"],
      correct: 1,
      explanation: "Die **RTE (Runtime Environment)** ist die Middleware-Schicht, die SWCs über den VFB (Virtual Functional Bus) verbindet.",
    },
    {
      question: "Wie viele Datenbytes kann ein Standard-CAN-Frame maximal transportieren?",
      type: "multiple",
      options: ["4 Bytes", "8 Bytes", "16 Bytes", "64 Bytes"],
      correct: 1,
      explanation: "**8 Bytes** beim klassischen CAN. CAN FD unterstützt bis zu 64 Bytes pro Frame.",
    },
    {
      question: "Welche Folge hat eine Impedanz-Fehlanpassung auf der Busleitung?",
      type: "multiple",
      options: ["Höhere Datenrate", "Signalreflexion", "Geringerer Stromverbrauch", "Automatische Terminierung"],
      correct: 1,
      explanation: "**Signalreflexion** — wenn $Z_L \\neq Z_0$, wird ein Teil der Energie reflektiert (Reflexionskoeffizient $\\Gamma \\neq 0$).",
    },
    {
      question: "Wofür steht die Abkürzung AUTOSAR?",
      type: "multiple",
      options: ["Automated Safety Architecture", "AUTomotive Open System ARchitecture", "Automatic OS for Automotive Research", "Authorized Open Source Architecture"],
      correct: 1,
      explanation: "**AUTomotive Open System ARchitecture** — standardisierte Software-Architektur für Fahrzeug-Steuergeräte.",
    },
    {
      question: "Welcher Bus wird typischerweise für Infotainment (Multimedia) eingesetzt?",
      type: "multiple",
      options: ["LIN", "CAN", "MOST / Automotive Ethernet", "SENT"],
      correct: 2,
      explanation: "**MOST** (150 Mbit/s) oder **Automotive Ethernet** (100 Mbit/s – 10 Gbit/s) für hohe Bandbreite bei Multimedia und ADAS.",
    },
  ],
};
