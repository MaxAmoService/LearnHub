"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Brain,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowDown,
  ArrowUp,
} from "lucide-react";

// ─── Datenstruktur ────────────────────────────────────────────────

interface OSILayerData {
  nr: number;
  name: string;
  color: string;
  icon: string;
  pdu: string;
  protocols: string[];
  hardware: string[];

  // Header-Größe
  headerSize: string;       // "20–32 Bytes"

  // Sender (Encapsulation)
  senderAction: string;
  senderHeader: string;
  senderHeaderDetail: string;
  senderDataState: string;

  // Empfänger (Decapsulation)
  receiverAction: string;
  receiverHeader: string;
  receiverDataState: string;

  // Beschreibung
  description: string;
  protocolDetail: string;
  example: string;
}

const OSI_LAYERS: OSILayerData[] = [
  {
    nr: 7,
    name: "Anwendung",
    color: "#EF4444",
    icon: "🌐",
    pdu: "Daten",
    protocols: ["HTTP", "HTTPS", "FTP", "SMTP", "DNS", "DHCP", "SSH", "SNMP"],
    hardware: ["Browser", "E-Mail-Client", "Webserver"],
    headerSize: "variabel (~500 B)",
    senderAction: "HTTP-Request wird erzeugt",
    senderHeader: "Kein Header — reine Anwendungsdaten",
    senderHeaderDetail: "GET /index.html HTTP/1.1\nHost: example.com\nUser-Agent: Mozilla/5.0\nAccept: text/html",
    senderDataState: "GET /index.html HTTP/1.1\nHost: example.com\n…",
    receiverAction: "HTTP-Request wird an den Webserver übergeben",
    receiverHeader: "Anwendungsdaten werden ausgeliefert",
    receiverDataState: "GET /index.html HTTP/1.1\nHost: example.com\n…",
    description:
      "Direkte Benutzerschnittstelle — alle Netzwerkdienste, die der Anwender sieht. Stellt Funktionen wie Dateitransfer, E-Mail und Web bereit.",
    protocolDetail:
      "HTTP (Hypertext Transfer Protocol) ist ein zustandsloses Protokoll auf Anwendungsebene. Es arbeitet nach dem Request-Response-Prinzip: Ein Client (Browser) sendet eine Anfrage, der Server antwortet. HTTPS nutzt zusätzlich TLS zur Verschlüsselung. Weitere wichtige Protokolle dieser Schicht sind DNS (Namensauflösung), SMTP (E-Mail-Versand) und FTP (Dateiübertragung).",
    example: "Du gibst example.com in den Browser ein → HTTP-Request wird erzeugt",
  },
  {
    nr: 6,
    name: "Präsentation",
    color: "#F97316",
    icon: "🔒",
    pdu: "Daten",
    headerSize: "~30 Bytes",
    protocols: ["TLS", "SSL", "JPEG", "GIF", "MPEG", "ASCII"],
    hardware: ["Verschlüsselungs-HW", "Codec-Chips"],
    senderAction: "Daten werden mit TLS verschlüsselt",
    senderHeader: "TLS-Header + verschlüsselte Nutzdaten",
    senderHeaderDetail: "Content-Type: application/octet-stream\nTLS-Version: 1.3\nVerschlüsselt: AES-256-GCM",
    senderDataState: "[TLS-Header | Verschlüsselt: GET /index…]",
    receiverAction: "TLS-Verschlüsselung wird entfernt (Entschlüsselung)",
    receiverHeader: "TLS-Header wird verworfen",
    receiverDataState: "GET /index.html HTTP/1.1\nHost: example.com\n…",
    description:
      "Datenformatierung, Verschlüsselung, Kompression — übersetzt zwischen Anwendung und Netzwerk. Sorgt dafür, dass Daten in einem einheitlichen Format vorliegen.",
    protocolDetail:
      "TLS (Transport Layer Security) stellt Vertraulichkeit und Integrität sicher. Es verwendet asymmetrische Verschlüsselung (RSA/ECDHE) für den Schlüsselaustausch und symmetrische Verschlüsselung (AES) für die eigentlichen Daten. TLS 1.3 reduziert den Handshake auf 1 RTT. Neben Verschlüsselung kümmert sich Schicht 6 auch um Zeichenkodierung (ASCII, UTF-8) und Datenkompression.",
    example: "HTTPS nutzt TLS: Die Webseiten-Daten werden vor der Übertragung verschlüsselt",
  },
  {
    nr: 5,
    name: "Sitzung",
    color: "#EAB308",
    icon: "🔗",
    pdu: "Daten",
    headerSize: "~10 Bytes",
    protocols: ["NetBIOS", "RPC", "SOCKS", "PPTP"],
    hardware: ["Gateway", "Proxy"],
    senderAction: "Session-ID wird hinzugefügt",
    senderHeader: "Session-Header (Sitzungsdaten)",
    senderHeaderDetail: "Session-ID: s_abc123def456\nSession-State: active\nKeep-Alive: true",
    senderDataState: "[Session | TLS-Header | Verschlüsselt: GET /index…]",
    receiverAction: "Session-Daten werden ausgewertet & verworfen",
    receiverHeader: "Session-Header wird entfernt",
    receiverDataState: "[TLS-Header | Verschlüsselt: GET /index…]",
    description:
      "Verwaltet Sitzungen zwischen Anwendungen — Aufbau, Erhalt und Abbau von Verbindungen. Synchronisiert den Datenaustausch.",
    protocolDetail:
      "Die Sitzungsschicht stellt Dienste wie RPC (Remote Procedure Call) bereit, mit denen Programme Funktionen auf entfernten Rechnern aufrufen können. Sie verwaltet auch Checkpoints: Bei einem Verbindungsabbruch muss nicht die gesamte Übertragung wiederholt werden. SOCKS ist ein Proxy-Protokoll, das auf dieser Schicht arbeitet.",
    example: "Login-Session bleibt erhalten, auch wenn kurz die Verbindung unterbrochen wird",
  },
  {
    nr: 4,
    name: "Transport",
    color: "#22C55E",
    icon: "📦",
    pdu: "Segment",
    headerSize: "20–32 Bytes",
    protocols: ["TCP", "UDP", "SCTP"],
    hardware: ["Firewall", "Load Balancer"],
    senderAction: "TCP-Header mit Port-Nummern wird hinzugefügt",
    senderHeader: "TCP-Header",
    senderHeaderDetail:
      "Src-Port: 52340 | Dst-Port: 443\nSEQ: 1001 | ACK: 5002\nWindow: 65535 | Flags: SYN,ACK\nChecksum: 0xA3F2",
    senderDataState: "[TCP | Session | TLS | Verschlüsselt: GET /index…]",
    receiverAction: "TCP-Header wird ausgewertet (SEQ/ACK-Prüfung)",
    receiverHeader: "TCP-Header wird entfernt, Daten ggf. neu zusammengesetzt",
    receiverDataState: "[Session | TLS | Verschlüsselt: GET /index…]",
    description:
      "Zuverlässige Ende-zu-Ende-Datenübertragung — segmentiert Daten, prüft auf Fehler und stellt die richtige Reihenfolge sicher.",
    protocolDetail:
      "TCP (Transmission Control Protocol) ist verbindungsorientiert: Vor dem Datenaustausch findet ein 3-Wege-Handshake statt (SYN → SYN-ACK → ACK). Sequenznummern stellen die richtige Reihenfolge sicher, das Window-Feld steuert die Flusskontrolle. UDP hingegen ist verbindungslos — es versendet Daten ohne Garantie, dafür schneller (wichtig für VoIP, Streaming, Gaming).",
    example: "TCP stellt sicher, dass alle Pakete vollständig und in richtiger Reihenfolge ankommen",
  },
  {
    nr: 3,
    name: "Netzwerk",
    color: "#3B82F6",
    icon: "🌐",
    pdu: "Paket",
    headerSize: "20 Bytes",
    protocols: ["IP", "ICMP", "OSPF", "BGP", "RIP"],
    hardware: ["Router", "Layer-3-Switch"],
    senderAction: "IP-Header mit Quell- und Ziel-Adresse wird hinzugefügt",
    senderHeader: "IP-Header",
    senderHeaderDetail:
      "Version: IPv4 | TTL: 64\nSrc-IP: 192.168.1.5\nDst-IP: 142.250.74.110\nProtocol: TCP (6) | Length: 1500",
    senderDataState: "[IP | TCP | Session | TLS | Verschlüsselt: GET /index…]",
    receiverAction: "IP-Header wird geprüft und entfernt",
    receiverHeader: "IP-Header wird entfernt, Paket an Transport übergeben",
    receiverDataState: "[TCP | Session | TLS | Verschlüsselt: GET /index…]",
    description:
      "Adressierung und Routing — bestimmt den Weg durch das Netzwerk. Jedes Gerät hat eine logische IP-Adresse.",
    protocolDetail:
      "IP (Internet Protocol) arbeitet verbindungslos und nach dem Best-Effort-Prinzip. Jeder Router trifft eine unabhängige Weiterleitungsentscheidung anhand der Ziel-IP. Das TTL-Feld (Time To Live) verhindert endlose Schleifen: Jeder Router dekrementiert es um 1, bei 0 wird das Paket verworfen. ICMP meldet Fehler zurück (ping nutzt ICMP Echo Request/Reply). OSPF und BGP sind Routing-Protokolle, die den Routern sagen, wohin sie Pakete weiterleiten sollen.",
    example: "Router leitet Pakete anhand der IP-Adresse 142.250.74.110 (google.com) weiter",
  },
  {
    nr: 2,
    name: "Sicherung",
    color: "#8B5CF6",
    icon: "🔗",
    pdu: "Frame",
    headerSize: "14–18 Bytes + 4 B Trailer",
    protocols: ["Ethernet", "Wi-Fi (802.11)", "PPP", "ARP", "VLAN", "STP"],
    hardware: ["Switch", "Bridge", "Access Point", "Netzwerkkarte"],
    senderAction: "Ethernet-Header mit MAC-Adressen + FCS wird hinzugefügt",
    senderHeader: "Ethernet-Header + Trailer",
    senderHeaderDetail:
      "Src-MAC: AA:BB:CC:DD:EE:FF\nDst-MAC: 11:22:33:44:55:66\nEtherType: 0x0800 (IPv4)\nFCS: 0x1A2B3C4D (CRC32)",
    senderDataState: "[Eth | IP | TCP | Session | TLS | Verschlüsselt: GET /index… | FCS]",
    receiverAction: "MAC-Adressen werden geprüft, FCS kontrolliert",
    receiverHeader: "Ethernet-Header wird entfernt, Frame an Netzwerk übergeben",
    receiverDataState: "[IP | TCP | Session | TLS | Verschlüsselt: GET /index…]",
    description:
      "MAC-Adressierung, Fehlererkennung, Zugriff auf das Medium — verbindet benachbarte Knoten im lokalen Netz.",
    protocolDetail:
      "Ethernet ist das dominierende Protokoll auf Schicht 2. Jedes Gerät hat eine weltweit eindeutige MAC-Adresse (48 Bit). Der Switch lernt, welche MAC-Adresse an welchem Port hängt, und leitet Frames gezielt weiter. Die FCS (Frame Check Sequence) ist eine CRC32-Prüfsumme, mit der Bitfehler erkannt werden. ARP (Address Resolution Protocol) löst IP-Adressen zu MAC-Adressen auf: 'Wer hat 192.168.1.1? Sag AA:BB:CC…'",
    example: "Switch lernt MAC-Adressen und leitet Frames nur an den richtigen Port weiter",
  },
  {
    nr: 1,
    name: "Bitübertragung",
    color: "#6B7280",
    icon: "⚡",
    pdu: "Bits",
    headerSize: "n/a (Bits)",
    protocols: ["1000BASE-T", "100BASE-TX", "USB", "Bluetooth", "DSL"],
    hardware: ["Kabel (Cat6)", "Hub", "Repeater", "Modem", "NIC"],
    senderAction: "Frame wird in Bits umgewandelt und aufs Kabel gelegt",
    senderHeader: "Kein Header — alles wird zu Bits",
    senderHeaderDetail:
      "Bitstrom (Baseband NRZ): \n01001000 01000101 01001100 00101100 00100000…\nÜbertragungsrate: 1 Gbit/s (1000BASE-T)",
    senderDataState: "01001000 01000101 01001100 … (elektrische Signale auf Kupferkabel)",
    receiverAction: "Bits werden vom Kabel empfangen und zu einem Frame zusammengesetzt",
    receiverHeader: "Bits werden zu Bytes rekonstruiert",
    receiverDataState: "[Eth | IP | TCP | Session | TLS | Verschlüsselt: GET /index… | FCS]",
    description:
      "Elektrische, optische oder Funk-Signale — die physische Übertragung von Bits über ein Medium.",
    protocolDetail:
      "Auf Schicht 1 geht es um Spannungspegel, Frequenzen, Modulation und Steckerbelegungen. 1000BASE-T (Gigabit-Ethernet) nutzt alle 4 Adernpaare eines Cat5e/Cat6-Kabels mit 250 Mbit/s pro Paar. Glasfaser verwendet Lichtpulse statt elektrischer Signale. Ein Hub ist ein einfacher Schicht-1-Verteiler: Er leitet Bits an alle Ports weiter. Ein Repeater verstärkt schwächer werdende Signale.",
    example: "Kupferkabel (Cat6) überträgt elektrische Signale mit 1 Gbit/s",
  },
];

// ─── Quiz-Fragen ───────────────────────────────────────────────────

interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "Auf welcher OSI-Schicht arbeitet ein Router?",
    options: ["Schicht 2 — Sicherung", "Schicht 3 — Netzwerk", "Schicht 4 — Transport", "Schicht 1 — Bitübertragung"],
    correct: 1,
  },
  {
    q: "Welche PDU gehört zur Transportschicht?",
    options: ["Bits", "Frames", "Pakete", "Segmente (TCP) / Datagramme (UDP)"],
    correct: 3,
  },
  {
    q: "Welches Protokoll gehört NICHT zur Anwendungsschicht?",
    options: ["HTTP", "DNS", "TCP", "SMTP"],
    correct: 2,
  },
  {
    q: "Was passiert auf Schicht 6 (Präsentation)?",
    options: ["IP-Adressierung", "Verschlüsselung und Datenformatierung", "Bit-Übertragung auf dem Kabel", "MAC-Adressierung"],
    correct: 1,
  },
  {
    q: "Welche Schicht fügt die MAC-Adresse hinzu?",
    options: ["Schicht 1 — Bitübertragung", "Schicht 2 — Sicherung", "Schicht 3 — Netzwerk", "Schicht 4 — Transport"],
    correct: 1,
  },
  {
    q: "Wofür steht die Abkürzung PDU?",
    options: ["Personal Data Unit", "Protocol Data Unit", "Packet Delivery Unit", "Port Data Usage"],
    correct: 1,
  },
  {
    q: "Der 3-Wege-Handshake (SYN → SYN-ACK → ACK) gehört zu welchem Protokoll?",
    options: ["HTTP", "IP", "TCP", "Ethernet"],
    correct: 2,
  },
];

// ─── Komponente ────────────────────────────────────────────────────

export function OSICapsuleViewer() {
  const TOTAL_STEPS = 14;
  const [currentStep, setCurrentStep] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Auto-Play ──────────────────────────────────────────────────

  const stopAutoPlay = useCallback(() => {
    setAutoPlay(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (autoPlay && currentStep < TOTAL_STEPS - 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= TOTAL_STEPS - 1) {
            stopAutoPlay();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, currentStep, stopAutoPlay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, []);

  // ── Schritt-Logik ──────────────────────────────────────────────

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      stopAutoPlay();
    }
  };

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep((p) => p - 1);
    }
  };

  const resetAll = () => {
    stopAutoPlay();
    setCurrentStep(-1);
    setExpandedLayer(null);
    setShowQuiz(false);
    setShowMnemonic(false);
  };

  // Schritt → Layer-Index: currentStep 0..6 → OSI_LAYERS[0]..[6] (Layer 7→1, Sender)
  //                       currentStep 7..13 → OSI_LAYERS[6]..[0] (Layer 1→7, Empfänger)
  const getActiveLayer = (): OSILayerData | null => {
    if (currentStep < 0 || currentStep >= TOTAL_STEPS) return null;
    if (currentStep < 7) {
      return OSI_LAYERS[currentStep]; // Step 0=Layer7, 1=Layer6, ..., 6=Layer1
    } else {
      return OSI_LAYERS[TOTAL_STEPS - 1 - currentStep]; // Step 7=Layer1(Idx6), 8=Layer2(Idx5), ..., 13=Layer7(Idx0)
    }
  };

  const isSenderPhase = currentStep >= 0 && currentStep < 7;
  const activeLayer = getActiveLayer();

  // Sender: Layer {nr} wird bei step = 7-nr verarbeitet (Layer 7 bei step 0, ..., Layer 1 bei step 6)
  const getSenderStep = (layerNr: number): number => 7 - layerNr; // 7→0, 6→1, ..., 1→6
  // Empfänger: Layer {nr} wird bei step = nr+6 verarbeitet (Layer 1 bei step 7, ..., Layer 7 bei step 13)
  const getReceiverStep = (layerNr: number): number => layerNr + 6; // 1→7, 2→8, ..., 7→13

  const isSenderDone = (layerNr: number): boolean => {
    if (currentStep < 0) return false;
    if (currentStep > getSenderStep(layerNr)) return true;
    if (currentStep >= 7) return true; // Empfänger-Phase: alle Sender-Schichten fertig
    return false;
  };

  const isReceiverDone = (layerNr: number): boolean => {
    if (currentStep < 7) return false;
    return currentStep > getReceiverStep(layerNr);
  };

  const isSenderActive = (layerNr: number): boolean => {
    if (currentStep < 0 || currentStep >= 7) return false;
    return currentStep === getSenderStep(layerNr);
  };

  const isReceiverActive = (layerNr: number): boolean => {
    if (currentStep < 7) return false;
    return currentStep === getReceiverStep(layerNr);
  };

  // Header-Blöcke für die Nachrichten-Visualisierung
  // Zeigt die Schichten von außen nach innen, wie das Paket aufgebaut ist
  const getHeaderBlocks = (): { label: string; color: string; visible: boolean; isPayload?: boolean }[] => {
    const blocks: { label: string; color: string; visible: boolean; isPayload?: boolean }[] = [];

    if (currentStep < 0) {
      blocks.push({ label: "HTTP-Daten", color: "#EF4444", visible: true, isPayload: true });
      return blocks;
    }

    if (isSenderPhase) {
      // Sender-Phase (steps 0-6): Header werden von Layer 6→1 hinzugefügt (Layer 7 = Payload selbst)
      const completed = currentStep + 1; // 1..7 Schichten verarbeitet
      // Zeige Header von außen (Eth, Layer 2) nach innen (TLS, Layer 6)
      // Indices: completed-1 absteigend bis 1 (überspringe Index 0 = Layer 7, das ist der Payload)
      for (let i = completed - 1; i >= 1; i--) {
        const layer = OSI_LAYERS[i];
        blocks.push({
          label: layer.nr === 2 ? `Eth-Header` : `${layer.name}-Header`,
          color: layer.color,
          visible: true,
        });
      }
      // Nutzdaten (innerster Teil, immer sichtbar nach step 0)
      blocks.push({ label: "Nutzdaten (HTTP)", color: "#EF4444", visible: true, isPayload: true });
    } else {
      // Empfänger-Phase (steps 7-13): Header werden von Layer 1→7 entfernt
      const completed = currentStep - 6; // 1..7 Schichten verarbeitet (step7→1, step13→7)
      // Noch vorhanden sind Layer completed+1 .. 7, also Indices (6-completed) .. 0
      const remainingTop = 6 - completed; // höchster noch vorhandener Index
      for (let i = remainingTop; i >= 0; i--) {
        const layer = OSI_LAYERS[i];
        if (layer.nr === 1) {
          blocks.push({ label: "Bits", color: layer.color, visible: true });
        } else if (layer.nr === 2) {
          blocks.push({ label: "Eth-Header", color: layer.color, visible: true });
        } else {
          blocks.push({ label: `${layer.name}-Header`, color: layer.color, visible: true });
        }
      }
      // Nutzdaten
      blocks.push({ label: "Nutzdaten (HTTP)", color: "#EF4444", visible: true, isPayload: true });
    }

    return blocks;
  };

  const headerBlocks = getHeaderBlocks();

  // ── Quiz-Logik ─────────────────────────────────────────────────

  const handleQuizAnswer = (optIdx: number) => {
    setQuizAnswer(optIdx);
    const correct = optIdx === QUIZ_QUESTIONS[quizIndex].correct;
    setQuizCorrect(correct);
  };

  const nextQuiz = () => {
    setQuizIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
    setQuizAnswer(null);
    setQuizCorrect(null);
  };

  // ── Hilfsfunktion für Farb-Helligkeit ──────────────────────────

  const withOpacity = (hex: string, opacity: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // ── Render ─────────────────────────────────────────────────────

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      {/* ── Kurzbeschreibung ──────────────────────────────────── */}
      <p className="text-slate-400 text-xs mb-4">
        📡 Verfolge die Reise einer HTTP-Anfrage durch alle 7 OSI-Schichten — vom Sender zum Empfänger.
        Jeder Schritt zeigt dir, was mit den Daten passiert.
      </p>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          onClick={prevStep}
          disabled={currentStep < 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Zurück
        </button>

        <span className="text-slate-300 text-sm font-medium min-w-[90px] text-center">
          {currentStep < 0
            ? "Start"
            : `Schritt ${currentStep + 1}/${TOTAL_STEPS}`}
        </span>

        <button
          onClick={nextStep}
          disabled={currentStep >= TOTAL_STEPS - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-all"
        >
          Vorwärts
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (autoPlay) {
              stopAutoPlay();
            } else if (currentStep >= TOTAL_STEPS - 1) {
              resetAll();
              setAutoPlay(true);
            } else {
              setAutoPlay(true);
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            autoPlay
              ? "bg-amber-600 hover:bg-amber-500 text-white"
              : "bg-slate-700 hover:bg-slate-600 text-slate-300"
          }`}
        >
          {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {autoPlay ? "Stop" : "Auto"}
        </button>

        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>

        <button
          onClick={() => { setShowQuiz(!showQuiz); setShowMnemonic(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            showQuiz ? "bg-purple-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-300"
          }`}
        >
          <Brain className="w-4 h-4" />
          Quiz
        </button>

        <button
          onClick={() => { setShowMnemonic(!showMnemonic); setShowQuiz(false); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            showMnemonic ? "bg-teal-600 text-white" : "bg-slate-700 hover:bg-slate-600 text-slate-300"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Merksatz
        </button>
      </div>

      {/* ── Fortschrittsbalken ──────────────────────────────────── */}
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                i <= currentStep
                  ? i < 7
                    ? "#3B82F6" // Sender-Phase: Blau
                    : "#22C55E" // Empfänger-Phase: Grün
                  : "rgb(51, 65, 85)", // slate-700
            }}
          />
        ))}
      </div>

      {/* ── Phasen-Indikator ────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-6 mb-4">
        <div className={`flex items-center gap-2 text-xs font-medium transition-all ${
          currentStep >= 0 && isSenderPhase ? "text-blue-400" : currentStep >= 7 ? "text-slate-500" : "text-slate-400"
        }`}>
          <span className={`w-3 h-3 rounded-full ${isSenderPhase && currentStep >= 0 ? "bg-blue-500 animate-pulse" : "bg-slate-600"}`} />
          📤 Sender-Phase (Kapselung)
          {currentStep >= 7 && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
        </div>
        <div className="w-8 h-px bg-slate-600" />
        <div className={`flex items-center gap-2 text-xs font-medium transition-all ${
          currentStep >= 7 ? "text-green-400" : "text-slate-500"
        }`}>
          <span className={`w-3 h-3 rounded-full ${!isSenderPhase && currentStep >= 0 ? "bg-green-500 animate-pulse" : "bg-slate-600"}`} />
          📥 Empfänger-Phase (Entkapselung)
          {currentStep >= TOTAL_STEPS - 1 && <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />}
        </div>
      </div>

      {/* ═══ Hauptbereich: Side-by-Side Stacks ═══════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* ── Linke Spalte: Sender-Stack ──────────────────────── */}
        <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-slate-700/50">
          <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-1.5">
            📤 Sender <span className="text-slate-500 font-normal text-xs">(Kapselung ↓)</span>
            <span className="ml-auto text-[10px] text-slate-500">von oben nach unten</span>
          </h4>
          <div className="space-y-1">
            {OSI_LAYERS.map((layer) => {
              const done = isSenderDone(layer.nr);
              const active = isSenderActive(layer.nr);

              return (
                <button
                  key={`sender-${layer.nr}`}
                  onClick={() => setExpandedLayer(expandedLayer === layer.nr ? null : layer.nr)}
                  className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg border-2 transition-all text-left ${
                    active
                      ? "border-white shadow-lg shadow-white/15 scale-[1.02]"
                      : done
                      ? "border-slate-600"
                      : "border-transparent opacity-40"
                  }`}
                  style={{
                    backgroundColor: active
                      ? withOpacity(layer.color, 0.2)
                      : done
                      ? withOpacity(layer.color, 0.08)
                      : "transparent",
                  }}
                >
                  {/* Nummer */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.nr}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{layer.icon}</span>
                      <span className="text-xs sm:text-sm text-white font-medium truncate">{layer.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-400 shrink-0">
                        {layer.pdu}
                      </span>
                    </div>
                    {active && (
                      <p className="text-[11px] text-slate-300 mt-0.5 animate-pulse">{layer.senderAction}</p>
                    )}
                    {done && !active && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{layer.senderAction} ✓</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    {done && !active && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {active && <ArrowDown className="w-4 h-4 text-white animate-bounce" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Rechte Spalte: Empfänger-Stack (gleiche Reihenfolge 7→1, Verarbeitung von unten nach oben) ── */}
        <div className="bg-slate-900/60 rounded-xl p-3 sm:p-4 border border-slate-700/50">
          <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-1.5">
            📥 Empfänger <span className="text-slate-500 font-normal text-xs">(Entkapselung ↑)</span>
            <span className="ml-auto text-[10px] text-slate-500">von unten nach oben</span>
          </h4>
          <div className="space-y-1">
            {OSI_LAYERS.map((layer) => {
              const done = isReceiverDone(layer.nr);
              const active = isReceiverActive(layer.nr);

              return (
                <button
                  key={`receiver-${layer.nr}`}
                  onClick={() => setExpandedLayer(expandedLayer === layer.nr ? null : layer.nr)}
                  className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg border-2 transition-all text-left ${
                    active
                      ? "border-white shadow-lg shadow-white/15 scale-[1.02]"
                      : done
                      ? "border-slate-600"
                      : "border-transparent opacity-40"
                  }`}
                  style={{
                    backgroundColor: active
                      ? withOpacity(layer.color, 0.2)
                      : done
                      ? withOpacity(layer.color, 0.08)
                      : "transparent",
                  }}
                >
                  {/* Nummer */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: layer.color }}
                  >
                    {layer.nr}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{layer.icon}</span>
                      <span className="text-xs sm:text-sm text-white font-medium truncate">{layer.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-400 shrink-0">
                        {layer.pdu}
                      </span>
                    </div>
                    {active && (
                      <p className="text-[11px] text-slate-300 mt-0.5 animate-pulse">{layer.receiverAction}</p>
                    )}
                    {done && !active && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{layer.receiverAction} ✓</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    {done && !active && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {active && <ArrowUp className="w-4 h-4 text-white animate-bounce" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Angeklickte Layer-Details ───────────────────────────── */}
      {expandedLayer !== null && (() => {
        const layer = OSI_LAYERS.find((l) => l.nr === expandedLayer);
        if (!layer) return null;
        return (
          <div
            className="bg-slate-900 rounded-xl p-4 mb-4 border-l-4"
            style={{ borderColor: layer.color }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <span style={{ color: layer.color }}>{layer.icon} Schicht {layer.nr}: {layer.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                  PDU: {layer.pdu}
                </span>
              </h4>
              <button
                onClick={() => setExpandedLayer(null)}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Schließen
              </button>
            </div>

            <p className="text-slate-300 text-sm mb-3">{layer.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <p className="text-slate-400 mb-1">📤 Sender-Aktion</p>
                <p className="text-slate-200">{layer.senderAction}</p>
              </div>
              <div>
                <p className="text-slate-400 mb-1">📥 Empfänger-Aktion</p>
                <p className="text-slate-200">{layer.receiverAction}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <p className="text-slate-400 mb-1">🔌 Protokolle</p>
                <div className="flex flex-wrap gap-1">
                  {layer.protocols.map((p) => (
                    <span key={p} className="px-2 py-0.5 bg-slate-700 rounded text-slate-300">{p}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-slate-400 mb-1">🖥️ Hardware</p>
                <div className="flex flex-wrap gap-1">
                  {layer.hardware.map((h) => (
                    <span key={h} className="px-2 py-0.5 bg-slate-700 rounded text-slate-300">{h}</span>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400">💡 {layer.example}</p>
          </div>
        );
      })()}

      {/* ═══ Nachrichten-Transformation ══════════════════════════════ */}
      {currentStep >= 0 && (
        <div className="bg-slate-900 rounded-xl p-4 mb-4 border border-slate-700/50">
          <h4 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
            📦 Nachricht {isSenderPhase ? "wird verpackt" : "wird entpackt"} —
            {activeLayer && (
              <span style={{ color: activeLayer.color }}>Schicht {activeLayer.nr}: {activeLayer.name}</span>
            )}
          </h4>

          {/* Header-Blöcke visuell */}
          <div className="flex flex-wrap items-center justify-center gap-1 mb-3">
            {headerBlocks.map((block, i) => (
              <div key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-slate-600 text-xs">|</span>}
                <div
                  className={`px-2 py-1 rounded text-[11px] sm:text-xs font-mono font-bold text-white transition-all ${
                    block.isPayload ? "ring-2 ring-yellow-400/50" : ""
                  }`}
                  style={{
                    backgroundColor: block.color,
                    opacity: block.visible ? 1 : 0.2,
                  }}
                  title={block.label}
                >
                  {block.label}
                </div>
              </div>
            ))}
          </div>

          {/* Detaillierte Header-Info */}
          {activeLayer && (
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Aktueller Header */}
              <div className="flex-1 bg-slate-800 rounded-lg p-3">
                <p className="text-[11px] text-slate-400 mb-1">
                  {isSenderPhase ? "Sender: Hinzugefügter Header" : "Empfänger: Entfernter Header"}
                </p>
                <p className="text-xs font-mono text-blue-300 whitespace-pre-wrap">
                  {isSenderPhase ? activeLayer.senderHeaderDetail : activeLayer.receiverHeader}
                </p>
              </div>

              {/* Daten-Zustand */}
              <div className="flex-1 bg-slate-800 rounded-lg p-3">
                <p className="text-[11px] text-slate-400 mb-1">Aktueller Daten-Zustand</p>
                <p className="text-xs font-mono text-green-300 whitespace-pre-wrap break-all">
                  {isSenderPhase ? activeLayer.senderDataState : activeLayer.receiverDataState}
                </p>
              </div>
            </div>
          )}

          {/* Richtungs-Pfeil zwischen Sender und Empfänger */}
          {currentStep === 6 && (
            <div className="mt-3 p-3 bg-amber-900/20 border border-amber-700/30 rounded-lg text-center">
              <p className="text-amber-300 text-xs font-medium">
                ⚡ Die Bits werden jetzt über das physikalische Medium übertragen — Kupferkabel, Glasfaser oder Funk!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Start-Hinweis */}
      {currentStep < 0 && (
        <div className="bg-slate-900 rounded-xl p-4 mb-4 border border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm">
            Klicke auf <strong className="text-white">&quot;Vorwärts&quot;</strong> oder <strong className="text-white">&quot;Auto&quot;</strong>,
            um die Reise einer HTTP-Anfrage durch alle 7 OSI-Schichten zu starten.
          </p>
        </div>
      )}

      {/* ═══ Protokoll-Details ═══════════════════════════════════════ */}
      {activeLayer && (
        <div className="bg-slate-900 rounded-xl p-4 mb-4 border-l-4" style={{ borderColor: activeLayer.color }}>
          <h4 className="text-white font-semibold text-sm mb-2 flex items-center gap-2">
            <span style={{ color: activeLayer.color }}>📋 Schicht {activeLayer.nr}: {activeLayer.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
              PDU: {activeLayer.pdu}
            </span>
          </h4>

          <p className="text-slate-300 text-sm mb-3">{activeLayer.protocolDetail}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-slate-400 mb-1">🔌 Protokolle</p>
              <div className="flex flex-wrap gap-1">
                {activeLayer.protocols.map((p) => (
                  <span key={p} className="px-2 py-0.5 bg-slate-700 rounded text-slate-300">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-slate-400 mb-1">🖥️ Hardware</p>
              <div className="flex flex-wrap gap-1">
                {activeLayer.hardware.map((h) => (
                  <span key={h} className="px-2 py-0.5 bg-slate-700 rounded text-slate-300">{h}</span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-2">💡 {activeLayer.example}</p>
        </div>
      )}

      {/* ═══ Quiz ════════════════════════════════════════════════════ */}
      {showQuiz && (
        <div className="bg-slate-900 rounded-xl p-4 mb-4 border border-purple-700/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-purple-400 font-semibold text-sm flex items-center gap-1.5">
              <Brain className="w-4 h-4" />
              Quiz — Frage {quizIndex + 1} von {QUIZ_QUESTIONS.length}
            </h4>
            <button
              onClick={() => setShowQuiz(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Schließen
            </button>
          </div>

          <p className="text-white text-sm mb-3">{QUIZ_QUESTIONS[quizIndex].q}</p>

          <div className="space-y-2 mb-3">
            {QUIZ_QUESTIONS[quizIndex].options.map((opt, optIdx) => (
              <button
                key={optIdx}
                onClick={() => !quizAnswer && handleQuizAnswer(optIdx)}
                disabled={quizAnswer !== null}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                  quizAnswer === optIdx
                    ? quizCorrect
                      ? "bg-green-600/30 border border-green-500 text-white"
                      : "bg-red-600/30 border border-red-500 text-white"
                    : quizAnswer !== null && optIdx === QUIZ_QUESTIONS[quizIndex].correct
                    ? "bg-green-600/20 border border-green-500/40 text-white"
                    : "bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[11px] font-bold text-slate-300">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  {opt}
                  {quizAnswer === optIdx && quizCorrect && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                  {quizAnswer === optIdx && !quizCorrect && <XCircle className="w-4 h-4 text-red-400" />}
                </span>
              </button>
            ))}
          </div>

          {quizAnswer !== null && (
            <button
              onClick={nextQuiz}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all"
            >
              Nächste Frage →
            </button>
          )}
        </div>
      )}

      {/* ═══ Merksatz ════════════════════════════════════════════════ */}
      {showMnemonic && (
        <div className="bg-teal-900/20 border border-teal-700/30 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-teal-400 font-semibold text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Merksatz für die 7 OSI-Schichten
            </h4>
            <button
              onClick={() => setShowMnemonic(false)}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Schließen
            </button>
          </div>

          <p className="text-teal-300 text-sm font-semibold mb-2">
            „<strong>Alle Priester saufen Tequila nach der Predigt</strong>&quot;
          </p>
          <p className="text-slate-300 text-xs mb-3">
            Die Anfangsbuchstaben entsprechen den 7 OSI-Schichten — in beide Richtungen lesbar!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
            {[
              { letter: "A", layer: "Anwendung", nr: 7, desc: "Benutzerschnittstelle" },
              { letter: "P", layer: "Präsentation", nr: 6, desc: "Verschlüsselung & Format" },
              { letter: "S", layer: "Sitzung", nr: 5, desc: "Verbindungs-Management" },
              { letter: "T", layer: "Transport", nr: 4, desc: "TCP/UDP, Ports" },
              { letter: "N", layer: "Netzwerk", nr: 3, desc: "IP-Adressen & Routing" },
              { letter: "D", layer: "Sicherung", nr: 2, desc: "MAC-Adressen & Frames" },
              { letter: "P", layer: "Bitübertragung", nr: 1, desc: "Bits & Signale" },
            ].map((item) => (
              <div
                key={item.nr}
                className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                  style={{ backgroundColor: OSI_LAYERS[7 - item.nr].color }}
                >
                  {item.letter}
                </div>
                <div>
                  <p className="text-white font-medium">
                    Schicht {item.nr}: {item.layer}
                  </p>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Paket-Aufbau: Header-Größen & Struktur ═══════════════ */}
      {currentStep >= 5 && currentStep <= 7 && (
        <div className="bg-slate-900 rounded-xl p-4 mb-4 border border-amber-700/30">
          <h4 className="text-amber-400 font-semibold text-sm mb-3 flex items-center gap-2">
            📐 Paket-Struktur — So sieht das Datenpaket auf dem Kabel aus
          </h4>
          <p className="text-slate-400 text-xs mb-3">
            {currentStep < 6
              ? "Während der Kapselung wächst das Paket Schicht für Schicht..."
              : currentStep === 6
              ? "Das vollständig gekapselte Paket wird in Bits umgewandelt:"
              : "Der Empfänger erhält den Bit-Strom und rekonstruiert das Paket:"}
          </p>

          {/* Visuelle Paket-Struktur mit proportionalen Größen */}
          <div className="flex items-stretch gap-0.5 mb-3 h-16 sm:h-20">
            {/* Ethernet (größter Header — 18 Bytes) */}
            <div
              className="flex items-center justify-center rounded-l-lg text-white font-bold text-[10px] sm:text-xs px-2 text-center"
              style={{ backgroundColor: "#8B5CF6", width: "18%", minWidth: "3rem" }}
            >
              Eth<br/>18 B
            </div>
            {/* IP (20 Bytes) */}
            <div
              className="flex items-center justify-center text-white font-bold text-[10px] sm:text-xs px-2 text-center"
              style={{ backgroundColor: "#3B82F6", width: "20%", minWidth: "3rem" }}
            >
              IP<br/>20 B
            </div>
            {/* TCP (20 Bytes) */}
            <div
              className="flex items-center justify-center text-white font-bold text-[10px] sm:text-xs px-2 text-center"
              style={{ backgroundColor: "#22C55E", width: "20%", minWidth: "3rem" }}
            >
              TCP<br/>20 B
            </div>
            {/* TLS (~30 Bytes) */}
            <div
              className="flex items-center justify-center text-white font-bold text-[10px] sm:text-xs px-2 text-center"
              style={{ backgroundColor: "#F97316", width: "10%", minWidth: "2.5rem" }}
            >
              TLS<br/>~30 B
            </div>
            {/* Session (~10 Bytes) */}
            <div
              className="flex items-center justify-center text-white font-bold text-[10px] sm:text-xs px-2 text-center"
              style={{ backgroundColor: "#EAB308", width: "8%", minWidth: "2rem" }}
            >
              Sess<br/>~10 B
            </div>
            {/* HTTP Nutzdaten (variabel) */}
            <div
              className="flex items-center justify-center rounded-r-lg text-white font-bold text-[10px] sm:text-xs px-2 text-center flex-1 ring-2 ring-yellow-400/50"
              style={{ backgroundColor: "#EF4444" }}
            >
              HTTP-Daten<br/>~500 B
            </div>
          </div>

          {/* Legende */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] sm:text-xs">
            {[
              { label: "Ethernet (Schicht 2)", size: "14–18 Bytes", desc: "MAC-Adressen + EtherType", color: "#8B5CF6" },
              { label: "IP (Schicht 3)", size: "20 Bytes", desc: "Src/Dst-IP, TTL, Proto", color: "#3B82F6" },
              { label: "TCP (Schicht 4)", size: "20–32 Bytes", desc: "Ports, SEQ, ACK, Window", color: "#22C55E" },
              { label: "TLS (Schicht 6)", size: "~30 Bytes", desc: "Verschlüsselungs-Metadaten", color: "#F97316" },
              { label: "Session (Schicht 5)", size: "~10 Bytes", desc: "Session-ID, State", color: "#EAB308" },
              { label: "HTTP-Daten (Schicht 7)", size: "~500 Bytes (variabel)", desc: "GET-Request + Header", color: "#EF4444" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 p-1.5 bg-slate-800/50 rounded">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-slate-200 font-medium">{item.label}</p>
                  <p className="text-slate-400">{item.size} — {item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-slate-500 text-[10px] mt-2 text-center">
            Gesamtgröße: ~598 Bytes (Header-Overhead: ~98 Bytes = ~16%)
          </p>
        </div>
      )}

      {/* ═══ Übertragungs-Animation (zwischen Sender und Empfänger) ═══ */}
      {currentStep >= 6 && currentStep <= 7 && (
        <div className="bg-gradient-to-r from-blue-900/20 via-amber-900/30 to-green-900/20 border border-slate-700/50 rounded-xl p-3 mb-4 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <span className="text-2xl">💻</span>
            <div className="flex-1 max-w-xs">
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-amber-500 rounded-full transition-all duration-500 ${
                    currentStep >= 7 ? "w-full" : "w-1/2"
                  }`}
                />
              </div>
            </div>
            <span className="text-2xl">🖥️</span>
          </div>
          <p className="text-slate-400 text-xs mt-2">
            {currentStep === 6
              ? "Bits wandern über das Kabel zum Empfänger..."
              : "Bits sind beim Empfänger angekommen!"}
          </p>
        </div>
      )}
    </div>
  );
}
