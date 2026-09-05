// Flashcard-Daten — Generiert aus Lektionsinhalten

import { Flashcard } from "./flashcards";

// ─── Netzwerktechnik ────────────────────────────────────────────────────────

const netzwerkFlashcards: Flashcard[] = [
  // OSI-Modell
  { id: "nw-os-1", moduleId: "ihk-netzwerk", front: "Wie viele Schichten hat das OSI-Modell?", back: "7 Schichten", hint: "Merksatz: Alle Priester Essen Tafelschokolade Am Palmsonntag", category: "OSI" },
  { id: "nw-os-2", moduleId: "ihk-netzwerk", front: "Was ist die PDU auf Schicht 4 (Transport)?", back: "Segmente", hint: "TCP/UDP arbeiten hier", category: "OSI" },
  { id: "nw-os-3", moduleId: "ihk-netzwerk", front: "Auf welcher OSI-Schicht arbeitet ein Router?", back: "Schicht 3 — Netzwerk", hint: "IP-Adressen", category: "OSI" },
  { id: "nw-os-4", moduleId: "ihk-netzwerk", front: "Auf welcher OSI-Schicht arbeitet ein Switch?", back: "Schicht 2 — Sicherung", hint: "MAC-Adressen", category: "OSI" },
  { id: "nw-os-5", moduleId: "ihk-netzwerk", front: "Was macht Schicht 6 (Präsentation)?", back: "Datenformat, Verschlüsselung (SSL/TLS, ASCII, JPEG)", category: "OSI" },

  // TCP/IP
  { id: "nw-tcp-1", moduleId: "ihk-netzwerk", front: "Was ist der Unterschied zwischen TCP und UDP?", back: "TCP = verbindungsorientiert, zuverlässig. UDP = verbindungslos, schnell, ohne Garantie.", category: "TCP/IP" },
  { id: "nw-tcp-2", moduleId: "ihk-netzwerk", front: "Wie lautet der TCP 3-Wege-Handshake?", back: "SYN → SYN-ACK → ACK", category: "TCP/IP" },
  { id: "nw-tcp-3", moduleId: "ihk-netzwerk", front: "Welchen Port nutzt HTTPS?", back: "Port 443", hint: "HTTP=80, SSH=22, SMTP=25, DNS=53", category: "TCP/IP" },

  // IPv4
  { id: "nw-ip-1", moduleId: "ihk-netzwerk", front: "Welche IP-Bereiche sind privat (RFC 1918)?", back: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", category: "IPv4" },
  { id: "nw-ip-2", moduleId: "ihk-netzwerk", front: "Was ist die Broadcast-Adresse?", back: "Letzte Adresse im Subnetz (alle Host-Bits = 1)", category: "IPv4" },

  // Subnetting
  { id: "nw-sub-1", moduleId: "ihk-netzwerk", front: "Formel für nutzbare Hosts?", back: "2^h - 2 (h = Host-Bits)", hint: "-2 für Netzwerk- und Broadcast-Adresse", category: "Subnetting" },
  { id: "nw-sub-2", moduleId: "ihk-netzwerk", front: "Was ergibt die AND-Verknüpfung von IP und Maske?", back: "Die Netzwerkadresse", category: "Subnetting" },
  { id: "nw-sub-3", moduleId: "ihk-netzwerk", front: "Wie viele Hosts hat ein /26 Netz?", back: "62 (2^6 - 2)", category: "Subnetting" },
  { id: "nw-sub-4", moduleId: "ihk-netzwerk", front: "Was ist VLSM?", back: "Variable Length Subnet Mask — verschiedene Subnetze mit verschiedenen Präfixlängen", category: "Subnetting" },
  { id: "nw-sub-5", moduleId: "ihk-netzwerk", front: "Brauche 500 Hosts — welche CIDR-Notation?", back: "/23 (2^9 - 2 = 510 Hosts)", category: "Subnetting" },

  // IPv6
  { id: "nw-ipv6-1", moduleId: "ihk-netzwerk", front: "Wie viele Bit hat eine IPv6-Adresse?", back: "128 Bit", hint: "IPv4 hat 32 Bit", category: "IPv6" },
  { id: "nw-ipv6-2", moduleId: "ihk-netzwerk", front: "Was ist die IPv6 Loopback-Adresse?", back: "::1", category: "IPv6" },
  { id: "nw-ipv6-3", moduleId: "ihk-netzwerk", front: "Was ist Dual Stack?", back: "IPv4 und IPv6 gleichzeitig auf einem Host", category: "IPv6" },

  // Netzwerkgeräte
  { id: "nw-dev-1", moduleId: "ihk-netzwerk", front: "Was trennt ein Router?", back: "Broadcast-Domänen", hint: "Switch trennt nur Kollisionsdomänen", category: "Geräte" },
  { id: "nw-dev-2", moduleId: "ihk-netzwerk", front: "Was lernt ein Switch?", back: "MAC-Adressen (CAM-Tabelle)", category: "Geräte" },

  // Protokolle
  { id: "nw-proto-1", moduleId: "ihk-netzwerk", front: "Was macht DNS?", back: "Übersetzt Domainnamen in IP-Adressen", category: "Protokolle" },
  { id: "nw-proto-2", moduleId: "ihk-netzwerk", front: "Was bedeutet DHCP DORA?", back: "Discover → Offer → Request → Acknowledge", category: "Protokolle" },
  { id: "nw-proto-3", moduleId: "ihk-netzwerk", front: "IMAP vs POP3?", back: "IMAP belässt E-Mails auf dem Server (Multi-Device). POP3 lädt herunter.", category: "Protokolle" },

  // WLAN
  { id: "nw-wlan-1", moduleId: "ihk-netzwerk", front: "Welcher WLAN-Standard ist aktuell am schnellsten?", back: "802.11ax (Wi-Fi 6) — bis 9,6 Gbit/s", category: "WLAN" },
  { id: "nw-wlan-2", moduleId: "ihk-netzwerk", front: "Welches WLAN-Sicherheitsprotokoll ist am sichersten?", back: "WPA3", category: "WLAN" },

  // Sicherheit
  { id: "nw-sec-1", moduleId: "ihk-netzwerk", front: "IDS vs IPS?", back: "IDS = nur Erkennung (passiv). IPS = Erkennung + Blockierung (aktiv).", category: "Sicherheit" },
  { id: "nw-sec-2", moduleId: "ihk-netzwerk", front: "Was steht in einer DMZ?", back: "Öffentlich erreichbare Server (Web, Mail) — zwischen Internet und internem Netz", category: "Sicherheit" },

  // Kabel
  { id: "nw-cab-1", moduleId: "ihk-netzwerk", front: "Maximale Segmentlänge bei Twisted Pair?", back: "100 Meter", category: "Kabel" },
  { id: "nw-cab-2", moduleId: "ihk-netzwerk", front: "Welches Kabel für 10 Gbit/s über 100m?", back: "Cat 6a", hint: "Cat 6 schafft 10 Gbit/s nur auf 55m", category: "Kabel" },

  // Tools
  { id: "nw-tool-1", moduleId: "ihk-netzwerk", front: "Was zeigt traceroute?", back: "Hop-by-Hop den Netzwerkweg zum Ziel mit Latenz pro Router", category: "Tools" },
  { id: "nw-tool-2", moduleId: "ihk-netzwerk", front: "Was kann Wireshark?", back: "Vollständige Netzwerkpaket-Analyse", category: "Tools" },
];

// ─── Programmieren (React) ──────────────────────────────────────────────────

const reactFlashcards: Flashcard[] = [
  { id: "re-1", moduleId: "react-grundlagen", front: "Was ist React?", back: "Eine JavaScript-Bibliothek für Benutzeroberflächen von Meta", category: "Grundlagen" },
  { id: "re-2", moduleId: "react-grundlagen", front: "Was sind Props?", back: "Daten die von Eltern-Komponenten an Kinder übergeben werden (read-only)", category: "Grundlagen" },
  { id: "re-3", moduleId: "react-grundlagen", front: "Was ist State?", back: "Interner Zustand einer Komponente, verwaltet mit useState()", category: "Hooks" },
  { id: "re-4", moduleId: "react-grundlagen", front: "Wann wird useEffect ausgeführt?", back: "Nach dem Rendern. Mit Dependency-Array: nur bei Änderungen der Dependencies.", category: "Hooks" },
  { id: "re-5", moduleId: "react-grundlagen", front: "Was gibt useState zurück?", back: "[currentState, setterFunction]", category: "Hooks" },
];

// ─── TypeScript ─────────────────────────────────────────────────────────────

const typescriptFlashcards: Flashcard[] = [
  { id: "ts-1", moduleId: "typescript-basics", front: "Was ist der Unterschied zwischen type und interface?", back: "interface: erweiterbar, mergebar. type: Union-Types, mapped types, nicht erweiterbar.", category: "Grundlagen" },
  { id: "ts-2", moduleId: "typescript-basics", front: "Was ist ein Generic?", back: "Ein Typ-Parameter der bei Verwendung festgelegt wird: Array<T>, function id<T>(arg: T): T", category: "Generics" },
  { id: "ts-3", moduleId: "typescript-basics", front: "Was macht 'unknown'?", back: "Type-safe any — muss erst geprüft/gecastet werden bevor Nutzung", category: "Typen" },
  { id: "ts-4", moduleId: "typescript-basics", front: "Was ist ein Union Type?", back: "type ID = string | number — kann einer von beiden sein", category: "Typen" },
];

// ─── IHK Diagramme ─────────────────────────────────────────────────────────

const ihkFlashcards: Flashcard[] = [
  { id: "ihk-1", moduleId: "ihk-diagramme", front: "Was zeigt ein PAP (Programmablaufplan)?", back: "Die logische Struktur eines Programms mit Start/Ende, Verzweigungen, Schleifen", category: "PAP" },
  { id: "ihk-2", moduleId: "ihk-diagramme", front: "Was ist ein Struktogramm (Nassi-Shneiderman)?", back: "Grafische Darstellung der Programmstruktur mit verschachtelten Blöcken", category: "Struktogramm" },
  { id: "ihk-3", moduleId: "ihk-diagramme", front: "Bubblesort — worst case Komplexität?", back: "O(n²)", category: "Sortierung" },
  { id: "ihk-4", moduleId: "ihk-diagramme", front: "Was zeigt eine EPK?", back: "Ereignisgesteuerte Prozesskette — Geschäftsprozesse mit Ereignissen und Funktionen", category: "EPK" },
  { id: "ihk-5", moduleId: "ihk-diagramme", front: "Was ist ein ER-Modell?", back: "Entity-Relationship-Modell — Datenbankstruktur mit Entitäten und Beziehungen", category: "ER" },

  // ER-Diagramme (erweitert)
  { id: "ihk-erd-1", moduleId: "ihk-diagramme", front: "Welche Symbole gibt es im ER-Modell?", back: "Rechteck = Entität, Ellipse = Attribut, Raute = Beziehung, Unterstrichen = PK", category: "ER" },
  { id: "ihk-erd-2", moduleId: "ihk-diagramme", front: "Was darf an einer Raute stehen?", back: "Attribute — aber nur bei n:m Beziehungen sinnvoll (z.B. Note bei Schüler↔Kurse)", category: "ER" },
  { id: "ihk-erd-3", moduleId: "ihk-diagramme", front: "Häufigste Fehler bei ER-Diagrammen?", back: "Kreise (Ringabhängigkeiten), redundante Beziehungen, n:m statt 1:n, Plural statt Singular", category: "ER" },

  // UML
  { id: "ihk-uml-1", moduleId: "ihk-diagramme", front: "Was ist ein UML-Klassendiagramm?", back: "Zeigt die Struktur eines Programms: Klassen mit Attributen und Methoden", category: "UML" },
  { id: "ihk-uml-2", moduleId: "ihk-diagramme", front: "Was bedeuten +, -, # in UML?", back: "+ = public, - = private, # = protected", category: "UML" },
  { id: "ihk-uml-3", moduleId: "ihk-diagramme", front: "Komposition vs Aggregation in UML?", back: "Komposition (volles Diamond): Teil wird mit gelöscht. Aggregation (leeres Diamond): Teil existiert unabhängig", category: "UML" },
  { id: "ihk-uml-4", moduleId: "ihk-diagramme", front: "Wie zeigt man Vererbung in UML?", back: "Durchgezogene Linie mit leerer Pfeilspitze (Dreieck) — Kind → Eltern", category: "UML" },
  { id: "ihk-uml-5", moduleId: "ihk-diagramme", front: "Was ist eine Abhängigkeit in UML?", back: "Gestrichelte Linie mit Pfeil — Klasse nutzt eine andere temporär", category: "UML" },

  // EPK (erweitert)
  { id: "ihk-epk-1", moduleId: "ihk-diagramme", front: "UND vs ODER vs XOR in EPK?", back: "UND: alle Pfade gleichzeitig. ODER: mind. ein Pfad. XOR: genau ein Pfad", category: "EPK" },
  { id: "ihk-epk-2", moduleId: "ihk-diagramme", front: "Welche Elemente hat eine EPK?", back: "Ereignis (abgerundet), Funktion (Rechteck), Verknüpfungen (UND/ODER/XOR)", category: "EPK" },

  // Struktogramm (erweitert)
  { id: "ihk-struk-1", moduleId: "ihk-diagramme", front: "3 Grundstrukturen im Struktogramm?", back: "Sequenz (nacheinander), Verzweigung (IF/ELSE), Schleife (WHILE/DO)", category: "Struktogramm" },
  { id: "ihk-struk-2", moduleId: "ihk-diagramme", front: "WHILE vs DO-WHILE?", back: "WHILE: Prüfung VOR dem Durchlauf (kann 0-mal laufen). DO-WHILE: Prüfung NACH dem Durchlauf (mind. 1-mal)", category: "Struktogramm" },

  // Sequenzdiagramm
  { id: "ihk-seq-1", moduleId: "ihk-diagramme", front: "Was zeigt ein Sequenzdiagramm?", back: "Kommunikation zwischen Objekten über die Zeit — Lebenslinien + Nachrichten", category: "Sequenz" },
  { id: "ihk-seq-2", moduleId: "ihk-diagramme", front: "Durchgezogener vs gestrichelter Pfeil im Sequenzdiagramm?", back: "Durchgezogen = synchrone Nachricht (wartet). Gestrichelt = Antwort/Return", category: "Sequenz" },

  // Netzplan
  { id: "ihk-net-1", moduleId: "ihk-diagramme", front: "Was ist der kritische Weg im Netzplan?", back: "Längster Pfad — bestimmt die Mindestdauer des Projekts", category: "Netzplan" },
  { id: "ihk-net-2", moduleId: "ihk-diagramme", front: "Wie berechnet man früheste Zeitpunkte?", back: "Vorwärtsrechnung (links→rechts): Frühester Start = max aller Vorgänger-Endzeiten", category: "Netzplan" },
  { id: "ihk-net-3", moduleId: "ihk-diagramme", front: "Gesamtpuffer vs Freier Puffer?", back: "GP: Verzögerung ohne Projektende zu verschieben. FP: Verzögerung ohne Nachfolger zu beeinflussen", category: "Netzplan" },

  // Allgemein
  { id: "ihk-allg-1", moduleId: "ihk-diagramme", front: "Wann nimmt man welches Diagramm?", back: "ER=DB planen, UML=Software-Struktur, EPK=Geschäftsprozesse, Struktogramm=Programmlogik, Netzplan=Projektplanung", category: "Allgemein" },
];

// ─── IHK Datenbanken ───────────────────────────────────────────────────────

const datenbankFlashcards: Flashcard[] = [
  // Grundbegriffe
  { id: "db-gr-1", moduleId: "ihk-datenbanken", front: "Was ist ein Primärschlüssel (PK)?", back: "Eindeutiger Identifikator einer Zeile — eindeutig, NOT NULL, ändert sich nie. z.B. KundenID", category: "Grundbegriffe" },
  { id: "db-gr-2", moduleId: "ihk-datenbanken", front: "Was ist ein Fremdschlüssel (FK)?", back: "Verweis auf den PK einer anderen Tabelle — stellt die Beziehung her", category: "Grundbegriffe" },
  { id: "db-gr-3", moduleId: "ihk-datenbanken", front: "Was bedeutet Atomarität?", back: "Jede Zelle enthält genau einen Wert — nicht weiter teilbar", category: "Grundbegriffe" },
  { id: "db-gr-4", moduleId: "ihk-datenbanken", front: "Was ist referenzielle Integrität?", back: "FK muss auf existierenden PK verweisen — kein Löschen bei bestehenden Verweisen", category: "Grundbegriffe" },
  { id: "db-gr-5", moduleId: "ihk-datenbanken", front: "Entität vs Attribut?", back: "Entität = Zeile (z.B. ein Kunde). Attribut = Spalte (z.B. Name, Email)", category: "Grundbegriffe" },
  { id: "db-gr-6", moduleId: "ihk-datenbanken", front: "Was ist Redundanz?", back: "Daten werden mehrfach gespeichert — bei Änderung müssen ALLE Kopien angepasst werden", category: "Grundbegriffe" },
  { id: "db-gr-7", moduleId: "ihk-datenbanken", front: "3 Arten von Anomalien?", back: "Einfügen (geht nicht), Ändern (alle Kopien), Löschen (verliert andere Daten)", category: "Grundbegriffe" },

  // Kardinalitäten
  { id: "db-ka-1", moduleId: "ihk-datenbanken", front: "Was ist eine 1:1 Beziehung?", back: "Ein Datensatz A ist genau einem B zugeordnet. z.B. Mitarbeiter ↔ Arbeitsplatz", category: "Kardinalitäten" },
  { id: "db-ka-2", moduleId: "ihk-datenbanken", front: "Was ist eine 1:n Beziehung?", back: "Ein Datensatz A kann mehrere B haben. z.B. Kunde → Bestellungen. FK auf n-Seite!", category: "Kardinalitäten" },
  { id: "db-ka-3", moduleId: "ihk-datenbanken", front: "Was ist eine n:m Beziehung?", back: "Beide Seiten können mehrere Partner haben. z.B. Schüler ↔ Kurse. Erzeugt IMMER Verweistabelle!", category: "Kardinalitäten" },
  { id: "db-ka-4", moduleId: "ihk-datenbanken", front: "Wo kommt der FK bei 1:n hin?", back: "Auf die n-Seite (die 'viele' Seite). z.B. KundenID in Bestellung", category: "Kardinalitäten" },
  { id: "db-ka-5", moduleId: "ihk-datenbanken", front: "Was enthält eine Verweistabelle?", back: "FKs beider Tabellen als zusammengesetztes PK + optionale Beziehungsattribute", category: "Kardinalitäten" },

  // Normalisierung
  { id: "db-nf-1", moduleId: "ihk-datenbanken", front: "Was verlangt die 1NF?", back: "Alle Werte atomar — keine mehrwertigen Attribute, keine wiederholenden Gruppen", category: "Normalisierung" },
  { id: "db-nf-2", moduleId: "ihk-datenbanken", front: "Was verlangt die 2NF?", back: "1NF + alle Nicht-Schlüssel-Attribute vollständig abhängig vom gesamten PK", category: "Normalisierung" },
  { id: "db-nf-3", moduleId: "ihk-datenbanken", front: "Was verlangt die 3NF?", back: "2NF + keine transitiven Abhängigkeiten", category: "Normalisierung" },
  { id: "db-nf-4", moduleId: "ihk-datenbanken", front: "Was ist eine transitive Abhängigkeit?", back: "PK → A → B. B hängt nicht direkt vom PK ab. z.B. KundenID → PLZ → Stadt", category: "Normalisierung" },
  { id: "db-nf-5", moduleId: "ihk-datenbanken", front: "Ziel der Normalisierung?", back: "Redundanzen & Anomalien vermeiden. Balance: 3NF (nicht 5NF) = Standard", category: "Normalisierung" },

  // SQL
  { id: "db-sql-1", moduleId: "ihk-datenbanken", front: "Was ist SQL?", back: "Structured Query Language — deklarative Sprache für relationale DB. Keine Schleifen!", category: "SQL" },
  { id: "db-sql-2", moduleId: "ihk-datenbanken", front: "5 SQL-Kategorien?", back: "DDL (Struktur), DML (Inhalt), DQL (Abfrage), DCL (Rechte), TCL (Transaktionen)", category: "SQL" },
  { id: "db-sql-3", moduleId: "ihk-datenbanken", front: "Was macht DDL?", back: "CREATE, ALTER, DROP, TRUNCATE — Struktur der Tabelle ändern", category: "SQL" },
  { id: "db-sql-4", moduleId: "ihk-datenbanken", front: "Was macht DML?", back: "INSERT, UPDATE, DELETE — Daten in der Tabelle ändern", category: "SQL" },
  { id: "db-sql-5", moduleId: "ihk-datenbanken", front: "Was macht DQL?", back: "SELECT — Daten abfragen", category: "SQL" },
  { id: "db-sql-6", moduleId: "ihk-datenbanken", front: "DROP vs TRUNCATE vs DELETE?", back: "DROP: Tabelle komplett weg. TRUNCATE: leeren, Struktur bleibt. DELETE: Zeilen löschen (mit WHERE)", category: "SQL" },
  { id: "db-sql-7", moduleId: "ihk-datenbanken", front: "Was macht DCL?", back: "GRANT (Rechte erteilen) und REVOKE (Rechte entziehen)", category: "SQL" },
  { id: "db-sql-8", moduleId: "ihk-datenbanken", front: "Was macht TCL?", back: "BEGIN, COMMIT, ROLLBACK — Transaktionen steuern", category: "SQL" },

  // JOINs
  { id: "db-jo-1", moduleId: "ihk-datenbanken", front: "Was macht INNER JOIN?", back: "Nur Zeilen mit Match in BEIDEN Tabellen", category: "JOINs" },
  { id: "db-jo-2", moduleId: "ihk-datenbanken", front: "Was macht LEFT JOIN?", back: "Alle Zeilen links + passende rechts. NULL wenn kein Match", category: "JOINs" },
  { id: "db-jo-3", moduleId: "ihk-datenbanken", front: "Was macht CROSS JOIN?", back: "Kartesisches Produkt — jede Kombination. 3×4=12 Zeilen", category: "JOINs" },
  { id: "db-jo-4", moduleId: "ihk-datenbanken", front: "JOIN vs SELECT mit WHERE?", back: "Gleiche Ergebnisse, aber JOIN ist schneller und lesbarer", category: "JOINs" },

  // ACID
  { id: "db-ac-1", moduleId: "ihk-datenbanken", front: "Was steht ACID für?", back: "Atomicity, Consistency, Isolation, Durability", category: "ACID" },
  { id: "db-ac-2", moduleId: "ihk-datenbanken", front: "Was bedeutet Atomicity?", back: "Alles oder nichts — Transaktion ganz oder gar nicht", category: "ACID" },
  { id: "db-ac-3", moduleId: "ihk-datenbanken", front: "Was bedeutet Durability?", back: "Nach COMMIT dauerhaft gespeichert — auch bei Stromausfall (Transaktionslog)", category: "ACID" },

  // Phasen
  { id: "db-ph-1", moduleId: "ihk-datenbanken", front: "4 Phasen der Datenbankplanung?", back: "Extern (Anforderungen) → Konzeptionell (ERM) → Logisch (Tabellen/3NF) → Physisch (SQL)", category: "Phasen" },
  { id: "db-ph-2", moduleId: "ihk-datenbanken", front: "Was passiert in der konzeptionellen Phase?", back: "ER-Modell erstellen: Entitäten, Attribute, Beziehungen, Kardinalitäten", category: "Phasen" },

  // Backups
  { id: "db-bu-1", moduleId: "ihk-datenbanken", front: "Full Backup vs Transaktions-Backup?", back: "Full: gesamte DB. Transaktion: nur Änderungen seit letztem Backup", category: "Backups" },
  { id: "db-bu-2", moduleId: "ihk-datenbanken", front: "Wie stellt man eine DB wieder her?", back: "1. Letztes Full Backup, 2. Alle Transaktions-Backups der Reihe nach einspielen", category: "Backups" },
  { id: "db-bu-3", moduleId: "ihk-datenbanken", front: "Was ist die 3-2-1-Regel?", back: "3 Kopien, 2 verschiedene Medien, 1 Kopie an anderem Ort", category: "Backups" },
];

// ─── Computersysteme & Hardware ─────────────────────────────────────────────

const computersystemeFlashcards: Flashcard[] = [
  // CPU-Architektur
  { id: "hw-cpu-1", moduleId: "ihk-computersysteme", front: "Was ist die Von-Neumann-Architektur?", back: "Programm und Daten im selben Speicher, sequenzieller Zugriff über gemeinsamen Bus", category: "CPU" },
  { id: "hw-cpu-2", moduleId: "ihk-computersysteme", front: "Was macht die ALU?", back: "Arithmetic Logic Unit — führt arithmetische (+,-,*,/) und logische (UND, ODER, NICHT) Operationen durch", category: "CPU" },
  { id: "hw-cpu-3", moduleId: "ihk-computersysteme", front: "Was macht das Steuerwerk?", back: "Koordiniert den Befehlsablauf: Fetch (holen), Decode (entschlüsseln), Execute (ausführen)", category: "CPU" },
  { id: "hw-cpu-4", moduleId: "ihk-computersysteme", front: "Nenne 4 Register und ihre Aufgabe", back: "AX (Akku/Rechenergebnisse), BX (Basis), CX (Zähler), DX (Daten), PC (nächster Befehl), IR (aktueller Befehl)", category: "CPU" },
  { id: "hw-cpu-5", moduleId: "ihk-computersysteme", front: "Was ist der Fetch-Decode-Execute-Zyklus?", back: "1. Fetch: PC→MAR→Speicher→MDR→IR. 2. Decode: Steuerwerk analysiert Befehl. 3. ALU führt Operation aus", category: "CPU" },
  { id: "hw-cpu-6", moduleId: "ihk-computersysteme", front: "CISC vs. RISC — was ist der Unterschied?", back: "CISC: komplexe Befehle, variabel lang (Intel/AMD). RISC: einfache Befehle, einheitlich lang (ARM), Pipeline-freundlich", category: "CPU" },
  { id: "hw-cpu-7", moduleId: "ihk-computersysteme", front: "Was ist Hyperthreading?", back: "Ein physischer Kern wird als zwei logische Kerne dargestellt — bessere Auslastung, aber keine echte Verdopplung", category: "CPU" },
  { id: "hw-cpu-8", moduleId: "ihk-computersysteme", front: "Was ist Multicore?", back: "Mehrere physische Kerne auf einem Chip — echte Parallelverarbeitung möglich", category: "CPU" },
  { id: "hw-cpu-9", moduleId: "ihk-computersysteme", front: "Was ist der Von-Neumann-Flaschenhals?", back: "CPU muss abwechselnd Befehle und Daten über denselben Bus holen — sequenzieller Zugriff begrenzt Geschwindigkeit", category: "CPU" },
  { id: "hw-cpu-10", moduleId: "ihk-computersysteme", front: "Was ist der Unterschied zwischen 32-Bit und 64-Bit?", back: "32-Bit: max. 4 GB RAM adressierbar. 64-Bit: theoretisch 16 Exabyte. Breitere Register und Datenpfade", category: "CPU" },

  // Busse & Takt
  { id: "hw-bus-1", moduleId: "ihk-computersysteme", front: "Welche 3 Arten von Bussen gibt es?", back: "Adressbus (CPU→Speicher), Datenbus (bidirektional), Steuerbus (Signale wie Lesen/Schreiben)", category: "Busse & Takt" },
  { id: "hw-bus-2", moduleId: "ihk-computersysteme", front: "Was bestimmt die Breite des Adressbus?", back: "Den adressierbaren Speicher: 2^n Bytes. 20 Leitungen = 1 MB, 32 = 4 GB, 48 = 256 TB", category: "Busse & Takt" },
  { id: "hw-bus-3", moduleId: "ihk-computersysteme", front: "Was ist die Taktfrequenz und ihre Einheit?", back: "Anzahl Zyklen pro Sekunde, gemessen in GHz (1 Milliarde Zyklen/Sekunde). Höher = mehr Befehle/Sekunde", category: "Busse & Takt" },
  { id: "hw-bus-4", moduleId: "ihk-computersysteme", front: "Was ist CPI?", back: "Cycles Per Instruction — wie viele Takte ein Befehl durchschnittlich braucht. IPC = 1/CPI (Instr. pro Takt)", category: "Busse & Takt" },
  { id: "hw-bus-5", moduleId: "ihk-computersysteme", front: "Was ist ein Opcode?", back: "Operation Code — der Teil eines Befehls, der angibt WELCHE Operation ausgeführt wird (z.B. ADD, MOV)", category: "Busse & Takt" },
  { id: "hw-bus-6", moduleId: "ihk-computersysteme", front: "Warum bestimmt Taktfrequenz allein nicht die Leistung?", back: "Architektur, IPC, Cache-Größe, Pipeline-Tiefe sind ebenso wichtig. 3 GHz mit IPC=4 > 4 GHz mit IPC=2", category: "Busse & Takt" },

  // Eingabegeräte
  { id: "hw-ein-1", moduleId: "ihk-computersysteme", front: "Was ist RFID?", back: "Radio-Frequency Identification — Funketikett zur automatischen Identifikation, Reichweite bis 12m", category: "Eingabe" },
  { id: "hw-ein-2", moduleId: "ihk-computersysteme", front: "Was ist der Unterschied zwischen RFID und NFC?", back: "NFC ist eine Teilmenge von RFID: kürzere Reichweite (<4cm), bidirektional, sicherer (z.B. kontaktloses Bezahlen)", category: "Eingabe" },
  { id: "hw-ein-3", moduleId: "ihk-computersysteme", front: "Was sind die 3 Authentifizierungsfaktoren?", back: "1. Was man WEISS (Passwort), 2. Was man HAT (Token/Karte), 3. Was man IST (Biometrie)", category: "Eingabe" },
  { id: "hw-ein-4", moduleId: "ihk-computersysteme", front: "Barcode vs. QR-Code?", back: "Barcode: 1D, Striche, EAN-13. QR-Code: 2D, quadratisch, mehr Daten, fehlerkorrigierend", category: "Eingabe" },
  { id: "hw-ein-5", moduleId: "ihk-computersysteme", front: "Welche biometrischen Verfahren gibt es?", back: "Fingerabdruck, Gesichtserkennung, Iris-Scan, Stimmerkennung — nach Genauigkeit und Sicherheit gestaffelt", category: "Eingabe" },
  { id: "hw-ein-6", moduleId: "ihk-computersysteme", front: "Was ist DPI bei einer Maus?", back: "Dots Per Inch — Maus-Empfindlichkeit. Höhere DPI = schnellerer Cursor pro Mausbewegung", category: "Eingabe" },

  // Ausgabegeräte
  { id: "hw-aus-1", moduleId: "ihk-computersysteme", front: "LCD vs. OLED — was ist der Unterschied?", back: "LCD: Flüssigkristalle + Hintergrundbeleuchtung. OLED: selbstleuchtend, perfektes Schwarz, dünn, aber Burn-in-Gefahr", category: "Ausgabe" },
  { id: "hw-aus-2", moduleId: "ihk-computersysteme", front: "Wie funktioniert ein Laserdrucker?", back: "Toner (Pulver) wird durch Laser auf eine Trommel übertragen, auf Papier fixiert und durch Hitze (Fixiereinheit) dauerhaft gebunden", category: "Ausgabe" },
  { id: "hw-aus-3", moduleId: "ihk-computersysteme", front: "Was ist dpi bei Druckern?", back: "Dots Per Inch — Druckauflösung. 300 dpi reicht für Text, 1200+ dpi für Fotos", category: "Ausgabe" },
  { id: "hw-aus-4", moduleId: "ihk-computersysteme", front: "Welche 3D-Druck-Verfahren gibt es?", back: "FDM (Filament, günstig), SLA (Resin, präzise), SLS (Pulver/Metall, industriell)", category: "Ausgabe" },
  { id: "hw-aus-5", moduleId: "ihk-computersysteme", front: "Was ist Lumen bei Beamern?", back: "Helligkeitsmaß. 2000+ Lumen für abgedunkelte Räume, 4000+ für helle Räume", category: "Ausgabe" },
  { id: "hw-aus-6", moduleId: "ihk-computersysteme", front: "Was macht eine Braille-Zeile?", back: "Blindenschrift als tastbare Punkte auf einem Ausgabegerät — barrierefreie Computernutzung für Blinde", category: "Ausgabe" },

  // Speichermedien
  { id: "hw-med-1", moduleId: "ihk-computersysteme", front: "HDD vs. SSD — 3 Unterschiede?", back: "HDD: magnetisch, langsam (5-10ms), günstig. SSD: Halbleiter, schnell (0.1ms), teurer, robust (kein Mechanik)", category: "Speichermedien" },
  { id: "hw-med-2", moduleId: "ihk-computersysteme", front: "Was sind SLC/MLC/TLC/QLC bei SSDs?", back: "Bits pro Speicherzelle: SLC(1)=schnell/haltbar/teuer, MLC(2), TLC(3), QLC(4)=langsam/günstig", category: "Speichermedien" },
  { id: "hw-med-3", moduleId: "ihk-computersysteme", front: "RAID 0 — Prinzip?", back: "Striping: Daten auf alle Platten verteilt. Maximale Geschwindigkeit, KEINE Redundanz. Min. 2 Platten", category: "Speichermedien" },
  { id: "hw-med-4", moduleId: "ihk-computersysteme", front: "RAID 1 — Prinzip?", back: "Mirroring: Jede Platte hat eine exakte Kopie. Volle Redundanz, nur 50% nutzbar. Min. 2 Platten", category: "Speichermedien" },
  { id: "hw-med-5", moduleId: "ihk-computersysteme", front: "RAID 5 — Prinzip + Minimum?", back: "Striping + verteilte Parität. Mind. 3 Platten. 1 darf ausfallen. Nutzbare Kapazität: (n-1) × Platte", category: "Speichermedien" },
  { id: "hw-med-6", moduleId: "ihk-computersysteme", front: "RAID 6 — Prinzip + Minimum?", back: "Doppelte Parität. Mind. 4 Platten. 2 dürfen ausfallen. Nutzbare Kapazität: (n-2) × Platte", category: "Speichermedien" },
  { id: "hw-med-7", moduleId: "ihk-computersysteme", front: "RAID 10 — Prinzip?", back: "Mirror + Stripe (Kombination RAID 1 + RAID 0). Mind. 4 Platten. Schnell UND sicher. 50% nutzbar", category: "Speichermedien" },
  { id: "hw-med-8", moduleId: "ihk-computersysteme", front: "Ist RAID ein Backup?", back: "Nein! RAID schützt vor Hardwareausfall, nicht vor Löschen, Viren oder Brand. Trotzdem Backup machen!", category: "Speichermedien" },

  // Speicherverwaltung
  { id: "hw-svm-1", moduleId: "ihk-computersysteme", front: "SRAM vs. DRAM?", back: "SRAM: Flip-Flop, schnell (1ns), teuer, für Cache. DRAM: Kondensator, langsamer (100ns), günstig, für RAM, braucht Refresh", category: "Speicherverwaltung" },
  { id: "hw-svm-2", moduleId: "ihk-computersysteme", front: "Speicherhierarchie von schnell nach langsam?", back: "Register → L1 (~1ns) → L2 (~4ns) → L3 (~10ns) → RAM (~100ns) → SSD (~0.1ms) → HDD (~5-10ms)", category: "Speicherverwaltung" },
  { id: "hw-svm-3", moduleId: "ihk-computersysteme", front: "Was ist Cache?", back: "Schneller Pufferspeicher nahe der CPU. Speichert häufig verwendete Daten. L1/L2/L3 = verschiedene Ebenen", category: "Speicherverwaltung" },
  { id: "hw-svm-4", moduleId: "ihk-computersysteme", front: "Was ist ein Cache Hit / Miss?", back: "Hit: Daten sind im Cache → schnell. Miss: Daten nicht da → langsamer Zugriff aus RAM. Hit Rate = Anteil Treffer", category: "Speicherverwaltung" },
  { id: "hw-svm-5", moduleId: "ihk-computersysteme", front: "Was ist Paging?", back: "Virtueller Speicher in feste Seiten (4KB) einteilen. Page Table ordnet virtuelle Seiten physischen Rahmen zu", category: "Speicherverwaltung" },
  { id: "hw-svm-6", moduleId: "ihk-computersysteme", front: "Was ist ein Page Fault?", back: "Zugriff auf Seite, die nicht im RAM ist → OS muss sie von Festplatte laden (langsam!)", category: "Speicherverwaltung" },
  { id: "hw-svm-7", moduleId: "ihk-computersysteme", front: "Was ist virtueller Speicher?", back: "Auslagerung auf Festplatte bei RAM-Mangel. Erlaubt mehr Speichernutzung als physisch vorhanden", category: "Speicherverwaltung" },
  { id: "hw-svm-8", moduleId: "ihk-computersysteme", front: "Big-Endian vs. Little-Endian?", back: "Big: MSB zuerst (Motorola, Netzwerk). Little: LSB zuerst (Intel/x86). Gleicher Wert, andere Bytereihenfolge", category: "Speicherverwaltung" },
  { id: "hw-svm-9", moduleId: "ihk-computersysteme", front: "Was ist Paging vs. Segmentierung?", back: "Paging: feste Seiten, keine ext. Fragmentierung. Segmentierung: variable Segmente nach Programmstruktur, ext. Fragmentierung", category: "Speicherverwaltung" },
  { id: "hw-svm-10", moduleId: "ihk-computersysteme", front: "Wie viele Seitenrahmen bei 4 GB RAM und 4 KB Seiten?", back: "4 GB / 4 KB = 1.048.576 Seitenrahmen", category: "Speicherverwaltung" },
  { id: "hw-svm-11", moduleId: "ihk-computersysteme", front: "Was ist der Lokalitätsprinzip im Cache?", back: "Zeitliche Lokalität: Zugriff auf gleiche Daten. Räumliche Lokalität: Zugriff auf benachbarte Daten. Ganze Cache-Line (64B) laden", category: "Speicherverwaltung" },
  { id: "hw-svm-12", moduleId: "ihk-computersysteme", front: "Was ist ROM?", back: "Read-Only Memory — nicht flüchtig, nur lesen. Enthält BIOS/UEFI. Behält Inhalt ohne Strom", category: "Speicherverwaltung" },

  // Betriebssysteme
  { id: "hw-os-1", moduleId: "ihk-computersysteme", front: "Was macht der Kernel?", back: "Kern des OS: Hardware-Zugriff, Speicherverwaltung, Prozessverwaltung, Geräteverwaltung, Sicherheit", category: "Betriebssysteme" },
  { id: "hw-os-2", moduleId: "ihk-computersysteme", front: "Prozess vs. Thread?", back: "Prozess: Programm + eigene Ressourcen + eigener Adressraum. Thread: leichtgewichtig, teilt Ressourcen des Prozesses", category: "Betriebssysteme" },
  { id: "hw-os-3", moduleId: "ihk-computersysteme", front: "Preemptive vs. Cooperatives Multitasking?", back: "Preemptive: OS erzwingt Umschaltung (Zeitscheibe). Cooperativ: Prozess gibt freiwillig ab (veraltet, anfällig)", category: "Betriebssysteme" },
  { id: "hw-os-4", moduleId: "ihk-computersysteme", front: "NTFS, ext4, APFS — welches OS?", back: "NTFS = Windows, ext4 = Linux, APFS = macOS", category: "Betriebssysteme" },
  { id: "hw-os-5", moduleId: "ihk-computersysteme", front: "Monolithischer vs. Mikrokernel?", back: "Monolithisch: alles im Kernel (Linux). Mikrokernel: minimal, Services im User-Space (Minix, QNX)", category: "Betriebssysteme" },
  { id: "hw-os-6", moduleId: "ihk-computersysteme", front: "Shell vs. GUI?", back: "Shell: textbasierte Kommandozeile (Bash, PowerShell). GUI: grafische Oberfläche. Shell = skriptbar, automatisierbar", category: "Betriebssysteme" },
  { id: "hw-os-7", moduleId: "ihk-computersysteme", front: "Was sind Daemons/Dienste?", back: "Hintergrundprozesse ohne Benutzeroberfläche. Windows: Dienste. Linux/macOS: Daemons. z.B. Druckdienst, Virenscanner", category: "Betriebssysteme" },
  { id: "hw-os-8", moduleId: "ihk-computersysteme", front: "Update vs. Upgrade?", back: "Update: Fehlerbehebungen, Sicherheitspatches (klein). Upgrade: neue Version mit neuen Funktionen (groß)", category: "Betriebssysteme" },

  // Systemsoftware
  { id: "hw-sys-1", moduleId: "ihk-computersysteme", front: "BIOS vs. UEFI?", back: "BIOS: 16-Bit, MBR (max. 2TB), textbasiert. UEFI: 32/64-Bit, GPT (max. 9.4 ZB), grafisch, Secure Boot", category: "Systemsoftware" },
  { id: "hw-sys-2", moduleId: "ihk-computersysteme", front: "Was ist ein Treiber?", back: "Software, die das OS mit Hardware kommunizieren lässt. Herstellerspezifisch. Oft Ursache für Bluescreen", category: "Systemsoftware" },
  { id: "hw-sys-3", moduleId: "ihk-computersysteme", front: "Was ist MBR vs. GPT?", back: "MBR: max. 2 TB, max. 4 primäre Partitionen (Legacy). GPT: max. 9.4 ZB, unbegrenzte Partitionen (modern)", category: "Systemsoftware" },
  { id: "hw-sys-4", moduleId: "ihk-computersysteme", front: "Was ist Firmware?", back: "Software, die direkt auf Hardware läuft (BIOS/UEFI, Router-OS). Steuert Hardware auf niedrigster Ebene", category: "Systemsoftware" },
  { id: "hw-sys-5", moduleId: "ihk-computersysteme", front: "Was ist Secure Boot?", back: "UEFI-Feature: Nur signierte Software darf starten → Schutz vor Malware beim Bootvorgang", category: "Systemsoftware" },

  // Virtualisierung
  { id: "hw-virt-1", moduleId: "ihk-computersysteme", front: "Typ-1 vs. Typ-2 Hypervisor?", back: "Typ 1: direkt auf Hardware (ESXi, Hyper-V) — schneller, sicherer. Typ 2: auf Host-OS (VirtualBox) — einfacher", category: "Virtualisierung" },
  { id: "hw-virt-2", moduleId: "ihk-computersysteme", front: "Container vs. VM?", back: "Container: Shared Kernel, sehr leicht (ms-Start), Docker. VM: eigenes OS, stärker isoliert, langsamer (s-Start)", category: "Virtualisierung" },
  { id: "hw-virt-3", moduleId: "ihk-computersysteme", front: "IaaS vs. PaaS vs. SaaS?", back: "IaaS: Infrastruktur (Sie: OS+Apps). PaaS: Plattform (Sie: Apps). SaaS: Software (Provider: alles)", category: "Virtualisierung" },
  { id: "hw-virt-4", moduleId: "ihk-computersysteme", front: "Public vs. Private vs. Hybrid Cloud?", back: "Public: shared, skalierbar. Private: dediziert, kontrolliert. Hybrid: Mix — sensible Daten lokal, Rest in Cloud", category: "Virtualisierung" },
  { id: "hw-virt-5", moduleId: "ihk-computersysteme", front: "Was ist ein Thin Client?", back: "Minimaler Client — nur Anzeige/Eingabe. Berechnungen auf Server/Cloud. Günstig, sicher, zentral verwaltbar", category: "Virtualisierung" },
  { id: "hw-virt-6", moduleId: "ihk-computersysteme", front: "Was ist ein Hypervisor?", back: "Software zur Virtualisierung — verwaltet mehrere VMs auf einer Hardware. Auch: Virtual Machine Monitor (VMM)", category: "Virtualisierung" },

  // Leistungsbewertung
  { id: "hw-lei-1", moduleId: "ihk-computersysteme", front: "Was ist ein Benchmark?", back: "Standardisierter Test zur Messung der Computerleistung. z.B. PassMark, Geekbench, 3DMark", category: "Leistung" },
  { id: "hw-lei-2", moduleId: "ihk-computersysteme", front: "MIPS vs. FLOPS?", back: "MIPS: Millionen Instruktionen/Sekunde (Ganzzahl). FLOPS: Floating-Point-Op./Sekunde (Gleitkomma, KI, Grafik)", category: "Leistung" },
  { id: "hw-lei-3", moduleId: "ihk-computersysteme", front: "Amdahlsches Gesetz — Formel?", back: "Speedup = 1 / ((1-p) + p/n). p=parallelisierbarer Anteil, n=Prozessoren. Max. Speedup = 1/(1-p)", category: "Leistung" },
  { id: "hw-lei-4", moduleId: "ihk-computersysteme", front: "Amdahl: 80% parallel, 4 CPUs — Speedup?", back: "1 / (0.2 + 0.8/4) = 1 / (0.2 + 0.2) = 1 / 0.4 = 2.5", category: "Leistung" },

  // Green IT
  { id: "hw-gru-1", moduleId: "ihk-computersysteme", front: "Was ist der Rebound-Effekt?", back: "Effizienzsteigerung führt zu Mehrverbrauch. z.B. sparsamer PC → 2. PC kaufen → mehr Verbrauch als vorher", category: "Green IT" },
  { id: "hw-gru-2", moduleId: "ihk-computersysteme", front: "Was ist Energy Star?", back: "Internationaler Standard für energieeffiziente Produkte. Kennzeichnet besonders sparsame Geräte", category: "Green IT" },
  { id: "hw-gru-3", moduleId: "ihk-computersysteme", front: "Was bedeutet Kreislaufwirtschaft?", back: "Reduce (weniger), Reuse (wiederverwenden), Recycle (recyceln). WEEE-Richtlinie für Elektroschrott", category: "Green IT" },

  // Geschichte
  { id: "hw-ges-1", moduleId: "ihk-computersysteme", front: "4 Generationen der Computertechnik?", back: "1. Röhren (1940), 2. Transistoren (1955), 3. Integrierte Schaltungen (1965), 4. Mikroprozessoren (1980)", category: "Geschichte" },
  { id: "hw-ges-2", moduleId: "ihk-computersysteme", front: "Was ist Moores Gesetz?", back: "Transistoranzahl verdoppelt sich alle ~18-24 Monate. Galt bis ~2010, jetzt physikalische Grenzen erreicht", category: "Geschichte" },
  { id: "hw-ges-3", moduleId: "ihk-computersysteme", front: "Wer hat die Z3 gebaut und wann?", back: "Konrad Zuse, 1941 — erster programmierbarer Computer der Welt (relaisbasiert)", category: "Geschichte" },
];


// ─── IT-Sicherheit ──────────────────────────────────────────────────────────

const itSicherheitFlashcards: Flashcard[] = [
  // CIA-Triade
  { id: "is-cia-1", moduleId: "ihk-it-sicherheit", front: "Was beschreibt die CIA-Triade?", back: "Confidentiality (Vertraulichkeit), Integrity (Integrität), Availability (Verfügbarkeit)", hint: "Die drei Grundpfeiler der IT-Sicherheit", category: "Grundlagen" },
  { id: "is-cia-2", moduleId: "ihk-it-sicherheit", front: "Was bedeutet Confidentiality?", back: "Nur autorisierte Personen haben Zugriff auf Daten", hint: "Vertraulichkeit", category: "Grundlagen" },
  { id: "is-cia-3", moduleId: "ihk-it-sicherheit", front: "Was bedeutet Integrity?", back: "Daten sind korrekt und unverändert — keine Manipulation", hint: "Unversehrtheit", category: "Grundlagen" },
  { id: "is-cia-4", moduleId: "ihk-it-sicherheit", front: "Was bedeutet Availability?", back: "Systeme und Daten sind zugänglich wenn sie gebraucht werden", hint: "DDoS-Angriffe zielen dagegen", category: "Grundlagen" },

  // Authentifizierung
  { id: "is-auth-1", moduleId: "ihk-it-sicherheit", front: "Unterschied: Authentifizierung vs. Autorisierung?", back: "Auth = Wer bist du? (Identität). Autorisierung = Was darfst du? (Berechtigung)", category: "Auth" },
  { id: "is-auth-2", moduleId: "ihk-it-sicherheit", front: "Was sind die 3 Faktoren der Authentifizierung?", back: "Wissen (Passwort), Besitz (Token), Biometrie (Fingerabdruck)", hint: "MFA kombiniert mindestens 2", category: "Auth" },
  { id: "is-auth-3", moduleId: "ihk-it-sicherheit", front: "Was ist Salting beim Passwort-Hashing?", back: "Zufälliger Wert wird vor dem Hash angehängt → gleiche Passwörter erzeugen unterschiedliche Hashes", hint: "Schutz gegen Rainbow Tables", category: "Auth" },

  // Verschlüsselung
  { id: "is-crypto-1", moduleId: "ihk-it-sicherheit", front: "Symmetrisch vs. asymmetrisch — was ist der Unterschied?", back: "Symmetrisch: 1 Key (AES). Asymmetrisch: 2 Keys — Public + Private (RSA)", category: "Krypto" },
  { id: "is-crypto-2", moduleId: "ihk-it-sicherheit", front: "Was ist Hashing? Umkehrbar?", back: "Einweg-Algorithmus → erzeugt Festwert fester Länge (SHA-256 = 256 Bit). NICHT umkehrbar!", hint: "Gegenstück: Verschlüsselung IST umkehrbar", category: "Krypto" },
  { id: "is-crypto-3", moduleId: "ihk-it-sicherheit", front: "Was beweist eine digitale Signatur?", back: "Authentizität (wer hat unterschrieben) + Integrität (Dokument nicht verändert)", hint: "Hash wird mit Private Key verschlüsselt", category: "Krypto" },
  { id: "is-crypto-4", moduleId: "ihk-it-sicherheit", front: "Was macht eine CA (Certificate Authority)?", back: "Stellt digitale Zertifikate aus → bindet Public Key an Identität (z.B. google.com)", category: "Krypto" },

  // OWASP
  { id: "is-owasp-1", moduleId: "ihk-it-sicherheit", front: "Was ist SQL-Injection?", back: "SQL-Code über Eingabefelder einschleusen → DB zeigt alle Daten, Login umgehen", hint: "Schutz: Prepared Statements", category: "OWASP" },
  { id: "is-owasp-2", moduleId: "ihk-it-sicherheit", front: "Was ist XSS (Cross-Site Scripting)?", back: "JavaScript-Code in Webseiten einschleusen → wird im Browser des Opfers ausgeführt", hint: "Schutz: Output Encoding, CSP", category: "OWASP" },
  { id: "is-owasp-3", moduleId: "ihk-it-sicherheit", front: "Was ist CSRF?", back: "Cross-Site Request Forgery: Browser führt unbemerkt Aktionen auf anderer Webseite aus", hint: "Schutz: CSRF Tokens", category: "OWASP" },
  { id: "is-owasp-4", moduleId: "ihk-it-sicherheit", front: "Wie schützt man sich vor SQL-Injection?", back: "Prepared Statements (Platzhalter statt String-Konkatenation) + Input Validation", category: "OWASP" },
  { id: "is-owasp-5", moduleId: "ihk-it-sicherheit", front: "Was ist ein Man-in-the-Middle-Angriff?", back: "Angreifer schaltet sich zwischen Sender und Empfänger → kann Daten mitlesen/manipulieren", hint: "Schutz: TLS/SSL, VPN", category: "OWASP" },

  // Netzwerksicherheit
  { id: "is-net-1", moduleId: "ihk-it-sicherheit", front: "IDS vs. IPS — Unterschied?", back: "IDS = erkennt + warnt. IPS = erkennt UND blockiert automatisch", category: "Netzwerk" },
  { id: "is-net-2", moduleId: "ihk-it-sicherheit", front: "Was ist eine DMZ?", back: "Demilitarisierte Zone: Puffer zwischen Internet und internem Netz — öffentliche Server stehen hier", category: "Netzwerk" },
  { id: "is-net-3", moduleId: "ihk-it-sicherheit", front: "Welchen Port nutzt HTTPS? SSH? HTTP?", back: "HTTPS = 443, SSH = 22, HTTP = 80", hint: "Merke: 443 = S wie SSL", category: "Netzwerk" },
  { id: "is-net-4", moduleId: "ihk-it-sicherheit", front: "Was macht eine Firewall?", back: "Filtert Netzwerkverkehr nach Regeln (Ports, IPs, Protokolle)", category: "Netzwerk" },

  // Social Engineering
  { id: "is-se-1", moduleId: "ihk-it-sicherheit", front: "Phishing vs. Spear-Phishing?", back: "Phishing = Massen-E-Mails. Spear-Phishing = zielgerichtet auf bestimmte Person", category: "Social Eng" },
  { id: "is-se-2", moduleId: "ihk-it-sicherheit", front: "Was ist Pretexting?", back: "Fake-Identität/Vorwand um an Infos zu kommen (z.B. Anruf als IT-Support)", category: "Social Eng" },
  { id: "is-se-3", moduleId: "ihk-it-sicherheit", front: "Was ist Baiting?", back: "Lockmittel auslegen (z.B. USB-Stick mit Malware) — nutzt Neugier aus", category: "Social Eng" },
  { id: "is-se-4", moduleId: "ihk-it-sicherheit", front: "Was besagt die 3-2-1-Backup-Regel?", back: "3 Kopien, auf 2 verschiedenen Medien, 1 davon extern (offsite)", category: "Backup" },

  // Schutzkonzepte
  { id: "is-prot-1", moduleId: "ihk-it-sicherheit", front: "Was ist Defense in Depth?", back: "Mehrere Sicherheitsschichten — wenn eine scheitert, greift die nächste", category: "Konzepte" },
  { id: "is-prot-2", moduleId: "ihk-it-sicherheit", front: "Was ist das Least-Privilege-Prinzip?", back: "Jeder Benutzer bekommt nur die minimal nötigen Berechtigungen", category: "Konzepte" },
  { id: "is-prot-3", moduleId: "ihk-it-sicherheit", front: "Was ist Ransomware?", back: "Malware die Daten verschlüsselt und Lösegeld fordert (meist Krypto)", hint: "Schutz: Backups, Schulung", category: "Malware" },

];
// ─── Git ────────────────────────────────────────────────────────────────────

const gitFlashcards: Flashcard[] = [
  { id: "git-1", moduleId: "ihk-git", front: "Zentrale vs. dezentrale VV?", back: "Zentral: ein Server (SVN). Dezentral: jeder hat alles lokal (Git). Offline nur mit dezentraler möglich", category: "Grundlagen" },
  { id: "git-2", moduleId: "ihk-git", front: "Was macht git fetch?", back: "Lädt Änderungen vom Remote herunter, ohne sie zu mergen. git pull = fetch + merge", category: "Befehle" },
  { id: "git-3", moduleId: "ihk-git", front: "Merge vs. Rebase?", back: "Merge: Merge-Commit, verschachtelte Historie. Rebase: lineare Historie, pro Commit Konflikte lösen", category: "Befehle" },
  { id: "git-4", moduleId: "ihk-git", front: "Was ist Gitflow?", back: "Branching-Strategie: main (Releases), dev (Entwicklung), feature/*, release/*, hotfix/*", category: "Gitflow" },
  { id: "git-5", moduleId: "ihk-git", front: "Semantic Versioning MAJOR.MINOR.PATCH?", back: "PATCH=Bugfix, MINOR=Feature, MAJOR=Breaking Change. z.B. 2.3.1", category: "Versioning" },
  { id: "git-6", moduleId: "ihk-git", front: "Was ist ein Merge-Konflikt?", back: "Git kann nicht automatisch mergen — gleiche Zeile in gleicher Datei geändert. Manuell lösen!", category: "Konflikte" },
  { id: "git-7", moduleId: "ihk-git", front: "Was macht .gitignore?", back: "Schließt Dateien vom Tracking aus — Build, node_modules, .env, IDE-Dateien", category: "Tools" },
  { id: "git-8", moduleId: "ihk-git", front: "Was macht Git LFS?", back: "Large File Storage — speichert große Dateien effizient mit Pointern statt Inhalt", category: "Tools" },
  { id: "git-9", moduleId: "ihk-git", front: "Was ist git stash?", back: "Speichert Änderungen temporär — für schnellen Branch-Wechsel. stash pop = wiederherstellen", category: "Befehle" },
  { id: "git-10", moduleId: "ihk-git", front: "Conventional Commits Format?", back: "type(scope): beschreibung. Typen: feat, fix, refactor, style, test, docs, chore", category: "Commits" },
  { id: "git-11", moduleId: "ihk-git", front: "Optimistisches vs. pessimistisches Locking?", back: "Optimistisch (Git): Konflikte beim Merge. Pessimistisch (SVN): Datei wird gesperrt", category: "Grundlagen" },
  { id: "git-12", moduleId: "ihk-git", front: "Was ist ein Fork?", back: "Kopie eines Repositorys auf dem eigenen Account — für unabhängige Entwicklung", category: "Gitflow" },
  { id: "git-13", moduleId: "ihk-git", front: "Was ist ein Merge Request / Pull Request?", back: "Anfrage, einen Branch in einen anderen zu mergen — mit Review und Diskussion", category: "Gitflow" },
  { id: "git-14", moduleId: "ihk-git", front: "Was zeigt git status?", back: "Zeigt den aktuellen Stand: geänderte, gestagte und ungetrackte Dateien", category: "Befehle" },
  { id: "git-15", moduleId: "ihk-git", front: "Was ist ein Remote Repository?", back: "Externe Version des Repos auf einem Server (GitHub, GitLab). Synchronisation via push/pull", category: "Grundlagen" },
  { id: "git-16", moduleId: "ihk-git", front: "Was macht git clone?", back: "Kopiert ein Remote-Repo lokal — einmalig am Anfang. Inkl. aller Branches und Historie", category: "Befehle" },
  { id: "git-17", moduleId: "ihk-git", front: "Was macht git commit?", back: "Speichert Änderungen lokal mit Nachricht. Bekommt Hash. Pointer auf vorherigen Commit", category: "Befehle" },
  { id: "git-18", moduleId: "ihk-git", front: "Was macht git push?", back: "Lädt lokale Commits zum Remote hoch — andere können sie dann sehen", category: "Befehle" },
  { id: "git-19", moduleId: "ihk-git", front: "Feature-Branch Workflow?", back: "1. Von dev Branch erstellen. 2. Arbeiten. 3. Merge Request. 4. In dev mergen. 5. Branch löschen", category: "Gitflow" },
  { id: "git-20", moduleId: "ihk-git", front: "Was ist ein Branch?", back: "Parallele Entwicklungslinie — ermöglicht unabhängiges Arbeiten ohne den Hauptzweig zu stören", category: "Grundlagen" },
];

// ─── UX & Interaction Design ────────────────────────────────────────────────

const uxFlashcards: Flashcard[] = [
  { id: "ux-1", moduleId: "ihk-ux", front: "UX vs. UI?", back: "UX = gesamtes Erlebnis (nützlich, intuitiv). UI = visuelles Design (schön, konsistent). UX ist das Dach", category: "Grundlagen" },
  { id: "ux-2", moduleId: "ihk-ux", front: "Was sind Nielsens Heuristiken?", back: "10 Usability-Regeln: Sichtbarkeit, Real World, Kontrolle, Konsistenz, Fehlervermeidung, etc.", category: "Heuristiken" },
  { id: "ux-3", moduleId: "ihk-ux", front: "Was ist eine Persona?", back: "Fiktiver Nutzer, repräsentativ für Zielgruppe. Hilft bei der Produktgestaltung", category: "Methoden" },
  { id: "ux-4", moduleId: "ihk-ux", front: "User Story Format?", back: "Als [Rolle] möchte ich [Ziel], um [Nutzen]", category: "Methoden" },
  { id: "ux-5", moduleId: "ihk-ux", front: "5 Phasen des Design Sprints?", back: "Understand, Diverge, Converge, Prototype, Test — in 5 Tagen vom Problem zum Prototyp", category: "Design Sprint" },
  { id: "ux-6", moduleId: "ihk-ux", front: "5 Anforderungsarten?", back: "Funktional, nicht-funktional, technisch, regulatorisch, Benutzeranforderungen", category: "Anforderungen" },
  { id: "ux-7", moduleId: "ihk-ux", front: "Safety vs. Learnability vs. Memorability?", back: "Safety=Schutz vor Fehlern. Learnability=einfach erlernen. Memorability=gut wiedererkennen", category: "Evaluation" },
  { id: "ux-8", moduleId: "ihk-ux", front: "Heuristik: Wiedererkennen statt Erinnern?", back: "Optionen sichtbar machen — Nutzer soll nicht raten müssen", category: "Heuristiken" },
  { id: "ux-9", moduleId: "ihk-ux", front: "Low-Fidelity vs. High-Fidelity Prototyp?", back: "Lo-Fi: Papier, schnell, billig. Hi-Fi: Figma, klickbar, aufwendig", category: "Prototyping" },
  { id: "ux-10", moduleId: "ihk-ux", front: "Was ist ein Usability-Test?", back: "Nutzer führt Aufgaben aus, Beobachtung + Feedback. 5 Nutzer reichen für 80% der Probleme", category: "Evaluation" },
  { id: "ux-11", moduleId: "ihk-ux", front: "Was ist ein Szenario?", back: "Konkrete Situation in der eine Persona das Produkt nutzt — Kontext, Ziel, Schritte", category: "Methoden" },
  { id: "ux-12", moduleId: "ihk-ux", front: "Wie evaluieren?", back: "Usability-Tests, Interviews, A/B-Tests, Prototyping. Repräsentative Nutzer, klare Ziele", category: "Evaluation" },
  { id: "ux-13", moduleId: "ihk-ux", front: "Heuristik: Fehlervermeidung?", back: "Fehler verhindern bevor sie passieren — nicht nur Fehlermeldungen zeigen", category: "Heuristiken" },
  { id: "ux-14", moduleId: "ihk-ux", front: "Heuristik: Konsistenz?", back: "Gleiches sollte gleich aussehen und funktionieren — Standards einhalten", category: "Heuristiken" },
  { id: "ux-15", moduleId: "ihk-ux", front: "Micro-Interactions?", back: "Kleine subtile Interaktionen die Feedback geben: Hover-Effekte, Vibration, Töne", category: "Grundlagen" },
];

// ─── Software-Qualitätsstandards ────────────────────────────────────────────

const qualitaetFlashcards: Flashcard[] = [
  { id: "sq-1", moduleId: "ihk-qualitaet", front: "6 Qualitätsmerkmale ISO 9126?", back: "Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität", category: "ISO 9126" },
  { id: "sq-2", moduleId: "ihk-qualitaet", front: "Was ist das Singleton-Pattern?", back: "Creational Pattern — stellt sicher, dass eine Klasse nur eine Instanz hat", category: "Design Patterns" },
  { id: "sq-3", moduleId: "ihk-qualitaet", front: "Was macht das Strategy-Pattern?", back: "Definiert Familie von Algorithmen, kapselt sie, macht sie austauschbar", category: "Design Patterns" },
  { id: "sq-4", moduleId: "ihk-qualitaet", front: "Was macht das Observer-Pattern?", back: "Benachrichtigt abhängige Objekte bei Zustandsänderungen (Event-System)", category: "Design Patterns" },
  { id: "sq-5", moduleId: "ihk-qualitaet", front: "Schichtenarchitektur?", back: "Präsentation → Anwendung → Datenhaltung. Kommunikation nur zwischen Nachbarn", category: "Architektur" },
  { id: "sq-6", moduleId: "ihk-qualitaet", front: "MVC — Model, View, Controller?", back: "Model=Daten, View=Darstellung, Controller=Logik. User→View→Controller→Model", category: "Architektur" },
  { id: "sq-7", moduleId: "ihk-qualitaet", front: "Unit vs. Integration vs. Systemtest?", back: "Unit=isoliert, Integration=Zusammenspiel, System=ganzes System", category: "Testen" },
  { id: "sq-8", moduleId: "ihk-qualitaet", front: "Black-Box vs. White-Box?", back: "Black-Box: ohne Kenntnis der Implementierung. White-Box: mit Kenntnis des Codes", category: "Testen" },
  { id: "sq-9", moduleId: "ihk-qualitaet", front: "Was sind Code Smells?", back: "Warnsignale: lange Methoden, Error Hiding, Reinvent the Wheel, Duplikate", category: "Clean Code" },
  { id: "sq-10", moduleId: "ihk-qualitaet", front: "Was besagt DRY?", back: "Don't Repeat Yourself — Vermeide Duplikate im Code", category: "Clean Code" },
  { id: "sq-11", moduleId: "ihk-qualitaet", front: "3 Creational Patterns?", back: "Singleton, Factory Method, Abstract Factory, Builder, Prototype", category: "Design Patterns" },
  { id: "sq-12", moduleId: "ihk-qualitaet", front: "Microservices Eigenschaften?", back: "Unabhängige Services, eigene DB, Kommunikation über APIs, eigenständig skalierbar", category: "Architektur" },
  { id: "sq-13", moduleId: "ihk-qualitaet", front: "Was ist der Decorator?", back: "Structural Pattern — fügt Objekten dynamisch Funktionen hinzu ohne Klasse zu ändern", category: "Design Patterns" },
  { id: "sq-14", moduleId: "ihk-qualitaet", front: "Was ist der Adapter?", back: "Structural Pattern — passt inkompatible Schnittstellen an", category: "Design Patterns" },
  { id: "sq-15", moduleId: "ihk-qualitaet", front: "Was ist der Factory Method?", back: "Creational Pattern — Unterklassen entscheiden welches Objekt erstellt wird", category: "Design Patterns" },
  { id: "sq-16", moduleId: "ihk-qualitaet", front: "Statische vs. dynamische Analyse?", back: "Statisch: Code ohne Ausführung prüfen (Syntax, Style). Dynamisch: Code während Ausführung testen", category: "Testen" },
  { id: "sq-17", moduleId: "ihk-qualitaet", front: "Was ist ein Code Review?", back: "Systematische Überprüfung des Codes durch andere Entwickler — findet Fehler und verbessert Qualität", category: "Testen" },
];

// ─── Projektmanagement ──────────────────────────────────────────────────────

const projektmanagementFlashcards: Flashcard[] = [
  { id: "pm-1", moduleId: "ihk-projektmanagement", front: "Magisches Dreieck?", back: "Qualität, Budget, Zeit — Spannungsfeld. Wenn ein Punkt schwächelt, muss ein anderer ausgleichen", category: "Grundlagen",
    backImage: `<svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" style="max-width:250px"><polygon points="150,20 35,250 265,250" fill="rgba(59,130,246,0.1)" stroke="#60a5fa" stroke-width="2"/><circle cx="150" cy="20" r="28" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="150" y="17" text-anchor="middle" fill="#93c5fd" font-size="9" font-weight="bold">Qualität</text><text x="150" y="30" text-anchor="middle" fill="#64748b" font-size="8">Wie gut?</text><circle cx="35" cy="250" r="28" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="35" y="247" text-anchor="middle" fill="#fcd34d" font-size="9" font-weight="bold">Budget</text><text x="35" y="260" text-anchor="middle" fill="#64748b" font-size="8">Wie viel?</text><circle cx="265" cy="250" r="28" fill="#1e293b" stroke="#10b981" stroke-width="2"/><text x="265" y="247" text-anchor="middle" fill="#6ee7b7" font-size="9" font-weight="bold">Zeit</text><text x="265" y="260" text-anchor="middle" fill="#64748b" font-size="8">Bis wann?</text></svg>` },
  { id: "pm-2", moduleId: "ihk-projektmanagement", front: "SMART-Ziele?", back: "Spezifisch, Messbar, Anspruchsvoll, Realistisch, Terminiert", category: "Grundlagen",
    backImage: `<svg viewBox="0 0 300 60" xmlns="http://www.w3.org/2000/svg" style="max-width:280px"><rect x="0" y="0" width="58" height="55" rx="8" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" stroke-width="1.5"/><text x="29" y="22" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">S</text><text x="29" y="42" text-anchor="middle" fill="#64748b" font-size="8">Spezifisch</text><rect x="62" y="0" width="58" height="55" rx="8" fill="rgba(16,185,129,0.2)" stroke="#10b981" stroke-width="1.5"/><text x="91" y="22" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">M</text><text x="91" y="42" text-anchor="middle" fill="#64748b" font-size="8">Messbar</text><rect x="124" y="0" width="58" height="55" rx="8" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" stroke-width="1.5"/><text x="153" y="22" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold">A</text><text x="153" y="42" text-anchor="middle" fill="#64748b" font-size="8">Anspruchsvoll</text><rect x="186" y="0" width="58" height="55" rx="8" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6" stroke-width="1.5"/><text x="215" y="22" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold">R</text><text x="215" y="42" text-anchor="middle" fill="#64748b" font-size="8">Realistisch</text><rect x="248" y="0" width="52" height="55" rx="8" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="1.5"/><text x="274" y="22" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">T</text><text x="274" y="42" text-anchor="middle" fill="#64748b" font-size="8">Terminiert</text></svg>` },
  { id: "pm-3", moduleId: "ihk-projektmanagement", front: "Lastenheft vs. Pflichtenheft?", back: "Lastenheft=WAS (Auftraggeber). Pflichtenheft=WIE (Auftragnehmer)", category: "Dokumente" },
  { id: "pm-4", moduleId: "ihk-projektmanagement", front: "5 Phasen DIN 69901?", back: "Initiierung, Definition, Planung, Steuerung, Abschluss", category: "DIN 69901" },
  { id: "pm-5", moduleId: "ihk-projektmanagement", front: "3 Scrum-Rollen?", back: "Product Owner (Kunde), Scrum Master (Berater), Cross-functional Team (5-9)", category: "Scrum" },
  { id: "pm-6", moduleId: "ihk-projektmanagement", front: "4 Scrum-Events?", back: "Sprint Planning, Daily (15min), Sprint Review, Retrospektive", category: "Scrum" },
  { id: "pm-7", moduleId: "ihk-projektmanagement", front: "Was ist EVA?", back: "Earned Value Analysis: PV/AC/EV vergleichen. CV=EV-AC, CPI=EV/AC", category: "Controlling" },
  { id: "pm-8", moduleId: "ihk-projektmanagement", front: "SWOT-Analyse?", back: "Stärken/Schwächen (intern), Chancen/Risiken (extern)", category: "Methoden" },
  { id: "pm-9", moduleId: "ihk-projektmanagement", front: "Was ist ein kritischer Pfad?", back: "Längster Pfad im Netzplan — Pufferzeit=0, bestimmt Mindestdauer", category: "Netzplan" },
  { id: "pm-10", moduleId: "ihk-projektmanagement", front: "Agiles Manifest — 4 Werte?", back: "Individuen>Prozesse, Software>Doku, Zusammenarbeit>Verträge, Reagieren>Befolgen", category: "Agil" },
  { id: "pm-11", moduleId: "ihk-projektmanagement", front: "Was ist Definition of Done?", back: "Kriterien wann ein Arbeitspaket fertig ist: Code, Tests, Doku, Review", category: "Scrum" },
  { id: "pm-12", moduleId: "ihk-projektmanagement", front: "Ishikawa-Diagramm?", back: "Ursache-Wirkungs-Diagramm (Fischgräte). 6M: Mensch, Maschine, Material, Methode, Messung, Milieu", category: "Methoden" },
  { id: "pm-13", moduleId: "ihk-projektmanagement", front: "Was ist ein Stakeholder?", back: "Alle Personen/Gruppen mit Interesse am Projekt — positiv oder negativ betroffen", category: "Grundlagen" },
  { id: "pm-14", moduleId: "ihk-projektmanagement", front: "Was ist ein Meilenstein?", back: "Erreichter Zwischenstand — markiert Etappenziele im Projektverlauf", category: "Grundlagen" },
  { id: "pm-15", moduleId: "ihk-projektmanagement", front: "Was ist ein Quality Gate?", back: "Kompetente Überprüfung bei Meilensteinen — entscheidet ob Phase abgeschlossen ist", category: "Grundlagen" },
  { id: "pm-16", moduleId: "ihk-projektmanagement", front: "Was ist ein Product Backlog?", back: "Priorisierte Liste aller Anforderungen (User Stories) — wird vom Product Owner gepflegt", category: "Scrum" },
  { id: "pm-17", moduleId: "ihk-projektmanagement", front: "Was ist ein Sprint?", back: "Fixer Zeitraum (2-4 Wochen) mit festem Ziel — endet mit funktionierendem Inkrement", category: "Scrum" },
  { id: "pm-18", moduleId: "ihk-projektmanagement", front: "Was ist Multiprojektmanagement?", back: "Verwaltung mehrerer gleichzeitiger Projekte — PMO koordiniert Ressourcen", category: "Grundlagen" },
];

// ─── Docker ─────────────────────────────────────────────────────────────────

const dockerFlashcards: Flashcard[] = [
  { id: "dk-1", moduleId: "ihk-docker", front: "Container vs. VM?", back: "Container: teilt OS, leicht, schnell. VM: eigenes OS, schwerer, isolierter", category: "Grundlagen" },
  { id: "dk-2", moduleId: "ihk-docker", front: "Was ist ein Docker Image?", back: "Read-only Schablone für Container. Wird aus Dockerfile gebaut", category: "Grundlagen" },
  { id: "dk-3", moduleId: "ihk-docker", front: "FROM im Dockerfile?", back: "Definiert das Basis-Image — z.B. python:3.11, node:18", category: "Dockerfile" },
  { id: "dk-4", moduleId: "ihk-docker", front: "docker run -d -p 8080:80 nginx?", back: "-d=Hintergrund, -p=Port-Weiterleitung (Host:Container). Container über 8080 erreichbar", category: "Befehle" },
  { id: "dk-5", moduleId: "ihk-docker", front: "Was macht Docker Compose?", back: "Multi-Container-Anwendungen mit YAML definieren und starten", category: "Compose" },
  { id: "dk-6", moduleId: "ihk-docker", front: "Was ist ein Volume?", back: "Persistenter Speicher außerhalb des Containers — überlebt Neustarts", category: "Daten" },
  { id: "dk-7", moduleId: "ihk-docker", front: "Was kann Kubernetes?", back: "Automatische Skalierung, Self-Healing, Load-Balancing auf vielen Nodes", category: "Kubernetes" },
  { id: "dk-8", moduleId: "ihk-docker", front: "Blue-Green vs. Rolling Update?", back: "Blue-Green: zwei Umgebungen, Umschaltung. Rolling: Server nacheinander aktualisieren", category: "Deployment" },
  { id: "dk-9", moduleId: "ihk-docker", front: "Was macht EXPOSE im Dockerfile?", back: "Dokumentiert den Port — öffnet ihn NICHT automatisch. -p beim run macht das", category: "Dockerfile" },
  { id: "dk-10", moduleId: "ihk-docker", front: "docker compose up --build?", back: "Baut Images neu und startet alle Services aus docker-compose.yml", category: "Compose" },
  { id: "dk-11", moduleId: "ihk-docker", front: "Was macht COPY im Dockerfile?", back: "Kopiert Dateien vom Host in den Container", category: "Dockerfile" },
  { id: "dk-12", moduleId: "ihk-docker", front: "Was macht RUN im Dockerfile?", back: "Führt einen Befehl beim Bauen des Images aus — z.B. pip install", category: "Dockerfile" },
  { id: "dk-13", moduleId: "ihk-docker", front: "Was ist eine Docker Registry?", back: "Speicher für Images — z.B. Docker Hub. Images können geteilt werden", category: "Grundlagen" },
  { id: "dk-14", moduleId: "ihk-docker", front: "Was ist ein Pod in Kubernetes?", back: "Kleinste Einheit in K8s — ein oder mehrere Container, die sich Ressourcen teilen", category: "Kubernetes" },
  { id: "dk-15", moduleId: "ihk-docker", front: "Was ist ein Node in Kubernetes?", back: "Eine VM oder ein physischer Server im K8s-Cluster — hostet Pods", category: "Kubernetes" },
];

// ─── Erweiterte Programmierung ──────────────────────────────────────────────

const erwProgFlashcards: Flashcard[] = [
  { id: "ep-1", moduleId: "ihk-erw-prog", front: "SOLID — die 5 Prinzipien?", back: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion", category: "SOLID" },
  { id: "ep-2", moduleId: "ihk-erw-prog", front: "Was besagt SRP?", back: "Single Responsibility — Eine Klasse = eine Aufgabe", category: "SOLID" },
  { id: "ep-3", moduleId: "ihk-erw-prog", front: "Was besagt OCP?", back: "Open/Closed — Offen für Erweiterung, geschlossen für Änderung", category: "SOLID" },
  { id: "ep-4", moduleId: "ihk-erw-prog", front: "Was ist ein Interface?", back: "Vertrag: definiert WAS eine Klasse kann, nicht WIE. Ermöglicht Austauschbarkeit", category: "Interfaces" },
  { id: "ep-5", moduleId: "ihk-erw-prog", front: "Was ist ein Mock-Objekt?", back: "Test-Double, das echte Abhängigkeit ersetzt — macht Tests schnell und unabhängig", category: "Testing" },
  { id: "ep-6", moduleId: "ihk-erw-prog", front: "AAA-Pattern bei Tests?", back: "Arrange (vorbereiten), Act (ausführen), Assert (prüfen)", category: "Testing" },
  { id: "ep-7", moduleId: "ihk-erw-prog", front: "Coupling vs. Cohesion?", back: "Coupling=Abhängigkeit zwischen Klassen (niedrig=gut). Cohesion=Zusammengehörigkeit (hoch=gut)", category: "Qualität" },
  { id: "ep-8", moduleId: "ihk-erw-prog", front: "Was besagt DRY?", back: "Don't Repeat Yourself — Vermeide Duplikate im Code", category: "Clean Code" },
  { id: "ep-9", moduleId: "ihk-erw-prog", front: "Was ist Refactoring?", back: "Code verbessern ohne Verhalten zu ändern. Pfadfinder-Regel: besser hinterlassen", category: "Clean Code" },
  { id: "ep-10", moduleId: "ihk-erw-prog", front: "Was besagt Interface Segregation?", back: "Kleine, spezifische Interfaces statt großer, allgemeiner", category: "SOLID" },
  { id: "ep-11", moduleId: "ihk-erw-prog", front: "Was besagt Dependency Inversion?", back: "Abstraktionen sollten nicht von Konkretionen abhängen — Interfaces nutzen", category: "SOLID" },
  { id: "ep-12", moduleId: "ihk-erw-prog", front: "Code Smells Beispiele?", back: "Lange Methoden (>20 Zeilen), Error Hiding, Reinvent the Wheel, Duplikate", category: "Clean Code" },
  { id: "ep-13", moduleId: "ihk-erw-prog", front: "Was besagt KISS?", back: "Keep It Simple, Stupid — Einfach ist besser als komplex", category: "Clean Code" },
  { id: "ep-14", moduleId: "ihk-erw-prog", front: "Was besagt YAGNI?", back: "You Ain't Gonna Need It — Baue nur was JETZT gebraucht wird", category: "Clean Code" },
  { id: "ep-15", moduleId: "ihk-erw-prog", front: "Was ist Liskov Substitution?", back: "Untertypen müssen durch ihren Basistyp ersetzbar sein — Square/Rectangle Problem", category: "SOLID" },
  { id: "ep-16", moduleId: "ihk-erw-prog", front: "Statische vs. dynamische Analyse?", back: "Statisch: Code ohne Ausführung prüfen. Dynamisch: Code während Ausführung testen", category: "Testing" },
  { id: "ep-17", moduleId: "ihk-erw-prog", front: "Was ist Dependency Injection?", back: "Abhängigkeiten über Konstruktor/Setter injizieren statt direkt zu instanziieren", category: "SOLID" },
  { id: "ep-18", moduleId: "ihk-erw-prog", front: "Unit vs. Integration vs. Systemtest?", back: "Unit=isoliert, Integration=Zusammenspiel, System=ganzes System. Testpyramide!", category: "Testing" },
];

// ─── Alle Flashcards zusammen ───────────────────────────────────────────────

export const allFlashcards: Flashcard[] = [
  ...netzwerkFlashcards,
  ...reactFlashcards,
  ...typescriptFlashcards,
  ...ihkFlashcards,
  ...datenbankFlashcards,
  ...computersystemeFlashcards,
  ...itSicherheitFlashcards,

  ...gitFlashcards,
  ...uxFlashcards,
  ...qualitaetFlashcards,
  ...projektmanagementFlashcards,
  ...dockerFlashcards,
  ...erwProgFlashcards,
];

export function getFlashcardsForModule(moduleId: string): Flashcard[] {
  return allFlashcards.filter((c) => c.moduleId === moduleId);
}
