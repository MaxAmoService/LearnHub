import { Module } from "../types";

export const advVsModule: Module = {
  id: "adv-vs",
  slug: "adv-vs",
  title: "Verteilte Systeme (VS)",
  description: "Client-Server-Architektur, Server-Cluster, Codemigration, Ressourcenbindung und Konsistenzmodelle",
  icon: "🖥️",
  color: "#F59E0B",
  progress: 0,
  category: "advanced",
  lessons: [
    {
      id: "vs-1",
      title: "Grundlagen verteilter Systeme",
      duration: "25 min",
      type: "text",
      content: `## Grundlagen verteilter Systeme

### Definition

Ein **verteiltes System** ist eine Sammlung unabhängiger Computer, die für den Benutzer als ein einziges kohärentes System erscheinen.

**Ziele (nach Tanenbaum):**
- **Transparenz:** Verteilung ist für den Nutzer unsichtbar
- **Offenheit:** Standardisierte Schnittstellen
- **Skalierbarkeit:** Funktioniert bei steigender Last/Nutzerzahl

### Charakteristika

| Eigenschaft | Beschreibung |
|---|---|
| Mehrere autonome Rechner | Kein gemeinsamer Speicher, getrennte Clocks |
| Kommunikation über Netzwerk | Nachrichtenaustausch, Latenzzeiten |
| Fehlertoleranz | partielle Ausfälle möglich |
| Gleichzeitigkeit | Parallele Verarbeitung auf verschiedenen Knoten |

### CAP-Theorem (Brewer)

Ein verteiltes System kann maximal **zwei von drei** Eigenschaften gleichzeitig erfüllen:

| Eigenschaft | Bedeutung |
|---|---|
| **C**onsistency | Jeder Knoten sieht dieselben Daten zur selben Zeit |
| **A**vailability | Jede Anfrage erhält eine Antwort (ohne Garantie der Aktualität) |
| **P**artition tolerance | Das System funktioniert trotz Netzwerkpartitionen |

**Realität:** In verteilten Systemen ist P immer gegeben → Wahl zwischen C und A:
- **CP-Systeme:** Konsistenz bei Partition (z.B. HBase, MongoDB)
- **AP-Systeme:** Verfügbarkeit bei Partition (z.B. Cassandra, DynamoDB)

### Fehlertypen

| Typ | Beschreibung | Behandlung |
|---|---|---|
| Crash-Fehler | Prozess stoppt | Erkennung durch Timeouts |
| Byzantinische Fehler | Prozess verhält sich beliebig | Sehr schwer zu handhaben |
| Netzwerkpartition | Knoten nicht erreichbar | Heartbeat, Leader Election |
| Timing-Fehler | Nachricht zu spät | Uhrensynchronisation |

### Uhrensynchronisation

**Physikalische Uhren:** NTP (Network Time Protocol)
- Genauigkeit: ~1-10 ms im LAN
- Lamport's Logical Clocks: Ereignis-Reihenfolge statt absolute Zeit
- Vektoruhren: Erkennung von Kausalität

**Lamport-Zeitstempel:**
$$L(e_i) < L(e_j) \\Rightarrow e_i \\to e_j$$ (Kausalität impliziert Ordnung)
`,
    },
    {
      id: "vs-2",
      title: "Client-Server-Architektur",
      duration: "30 min",
      type: "text",
      content: `## Client-Server-Architektur

### Grundprinzip

| Rolle | Verhalten |
|---|---|
| **Client** | Initiiert Kommunikation, sendet Requests |
| **Server** | Wartet auf Requests, liefert Responses |

### Iterativer vs. Konkurrierender Server

**Iterativer Server:**
- Behandelt einen Client nach dem anderen
- Einfach zu implementieren
- Schlechte Performance bei vielen Clients

\`\`\`
while (true) {
  connection = accept();
  handle(connection);  // Blockiert!
  close(connection);
}
\`\`\`

**Konkurrierender Server:**
- Behandelt mehrere Clients gleichzeitig
- Bessere Performance, höherer Ressourcenverbrauch

    while (true) {
      connection = accept();
      fork() → handle(connection);  // Kindprozess
    }

| Aspekt | Iterativ | Konkurrierend |
|---|---|---|
| Gleichzeitige Clients | 1 | Viele |
| Implementierung | Einfach | Komplex |
| Ressourcenverbrauch | Gering | Hoch |
| Blocking | Ja | Nein (pro Prozess) |

### Endpoint (Endpunkt)

Ein **Endpoint** ist ein Kommunikationsende, definiert durch:
- **IP-Adresse:** Identifiziert den Host
- **Portnummer:** Identifiziert den Dienst (0-65535)

| Portbereich | Verwendung |
|---|---|
| 0-1023 | Bekannte Ports (HTTP=80, SSH=22) |
| 1024-49151 | Registrierte Ports |
| 49152-65535 | Dynamische/private Ports |

### Socket-API

**Server:** socket() → bind() → listen() → accept() → recv()/send() → close()

**Client:** socket() → connect() → send()/recv() → close()

### Request-Reply mit Semantik

| Semantik | Beschreibung |
|---|---|
| **Maybe** | Request kann verloren gehen; keine Garantie |
| **At-least-once** | Mindestens einmal ausgeführt; idempotente Operationen nötig |
| **At-most-once** | Höchstens einmal; Antwort kann verloren gehen |

### Middleware

Middleware abstrahiert die Kommunikation:
- **RPC (Remote Procedure Call):** Prozeduraufrufe über Netzwerk
- **RMI (Remote Method Invocation):** Objektorientierte Variante (Java)
- **Message Queue:** Asynchrone Nachrichtenübermittlung
`,
    },
    {
      id: "vs-3",
      title: "Server-Cluster & Verteilte Server",
      duration: "30 min",
      type: "text",
      content: `## Server-Cluster & Verteilte Server

### Server-Cluster

Ein **Server-Cluster** ist eine Gruppe von Servern, die als Einheit arbeiten.

### 3-Tier-Architektur

| Tier | Funktion | Beispiel |
|---|---|---|
| **Tier 1** | Präsentation (Frontend) | Webbrowser, App |
| **Tier 2** | Logik (Application Server) | Business-Logik |
| **Tier 3** | Daten (Database Server) | Datenhaltung |

**Vorteile:**
- Skalierbarkeit pro Tier
- Separation of Concerns
- Unabhängige Wartung

### TCP-Handoff

Bei der **TCP-Handoff**-Technik:
1. Frontend empfängt TCP-Verbindung vom Client
2. Backend-Server übernimmt die Verbindung (Handoff)
3. Backend antwortet direkt an den Client

**Vorteil:** Reduzierte Last auf dem Frontend-Server.

### MIPv6 (Mobile IPv6)

**Problem:** Bei Wechsel des Zugangspunkts ändert sich die IP-Adresse.

**Lösung mit MIPv6:**
- **Home Address:** permanente Adresse im Heimnetz
- **Care-of-Address:** temporäre Adresse im Fremdnetz
- **Home Agent:** leitet Pakete um

    while (true) {
      connection = accept();
      handle(connection);  // Blockiert!
      close(connection);
    }

### Load Balancing

| Strategie | Beschreibung |
|---|---|
| Round Robin | Reihum verteilen |
| Least Connections | An den Server mit wenigsten Verbindungen |
| IP Hash | Client-IP bestimmt Server |
| Weighted | Nach Serverkapazität gewichtet |

### Hochverfügbarkeit

- **Active-Passive:** Standby-Server übernimmt bei Ausfall
- **Active-Active:** Alle Server sind aktiv, Lastverteilung
- **Health Checks:** Regelmäßige Überprüfung der Server
- **Failover:** Automatisches Umschalten bei Ausfall
`,
    },
    {
      id: "vs-4",
      title: "Codemigration",
      duration: "25 min",
      type: "text",
      content: `## Codemigration

### Warum Codemigration?

| Grund | Beschreibung |
|---|---|
| **Lastverteilung** | Code zum weniger belasteten Server verschieben |
| **Kommunikation reduzieren** | Daten vorverarbeiten, wo sie entstehen |
| **Ressourcenzugriff** | Code zu den Ressourcen bewegen |
| **Dynamische Konfiguration** | Laufzeitverhalten anpassen |

### Schwache vs. Starke Mobilität

| Typ | Was wird migriert? |
|---|---|
| **Schwache Mobilität** | Nur Code (und ggf. Daten) |
| **Starke Mobilität** | Code + Ausführungszustand (Program Counter, Stack) |

### Schwache Mobilität

- Code wird zum Zielhost übertragen
- Ausführung beginnt dort von Anfang an
- Einfacher zu implementieren
- Beispiel: Java ClassLoader, Applets

**Ablauf:**
1. Quelle sendet Code + Daten an Ziel
2. Ziel kompiliert/lädt den Code
3. Code wird ausgeführt (ohne vorherigen Zustand)

### Starke Mobilität

- Gesamter Prozesszustand wird übertragen
- Ausführung wird am Ziel fortgesetzt
- Komplexer: Stack, Heap, Registers sichern

**Ablauf:**
1. Prozess wird am Quellhost angehalten
2. Zustand (Speicher, Registers, PC) wird serialisiert
3. Zustand wird zum Zielhost übertragen
4. Prozess wird am Zielhost fortgesetzt

### Agenten

**Mobile Agenten:** Autonome Programme, die sich selbstständig durch ein Netzwerk bewegen.

| Eigenschaft | Beschreibung |
|---|---|
| Autonomie | Unabhängige Entscheidungsfindung |
| Mobilität | Kann zwischen Hosts migrieren |
| Reaktivität | Reagiert auf Umgebung |
| Proaktivität | Verfolgt eigenes Ziel |

### Implementierungsmodelle

| Modell | Beschreibung |
|---|---|
| **Process Migration** | OS-Ebene: ganzen Prozess verschieben |
| **Code Shipping** | Code senden, Daten bleiben |
| **Code Fetching** | Daten senden, Code wird geholt |
| **Remote Evaluation** | Code wird am Remote-Host ausgewertet |
`,
    },
    {
      id: "vs-5",
      title: "Ressourcenbindung",
      duration: "25 min",
      type: "text",
      content: `## Ressourcenbindung

### Was ist eine Ressource?

Eine **Ressource** ist alles, was in einem verteilten System genutzt werden kann:
- Dateien, Drucker, Datenbanken
- Dienste, Netzwerkbandbreite
- CPU-Zeit, Speicher

### Bindungsarten

| Art | Beschreibung | Beispiel |
|---|---|---|
| **By Identifier** | Bindung über eindeutigen Namen | URL, Dateiname |
| **By Value** | Bindung über den Wert selbst | Kopie der Daten |
| **By Type** | Bindung über den Typ der Ressource | "Ein Drucker" |

### Bindungsstatus

| Status | Beschreibung |
|---|---|
| **Unbound** | Ressource noch nicht zugeordnet |
| **Bound** | Ressource ist zugeordnet und nutzbar |
| **Fixed** | Ressource ist fest zugeordnet (nicht änderbar) |

### Naming

**Namensdienste:**
- **DNS:** Domain Name System → IP-Adressen
- **LDAP:** Lightweight Directory Access Protocol
- **UUID:** Universally Unique Identifier

**Namensauflösung (Name Resolution):**
$$\\text{Name} \\xrightarrow{\\text{Lookup}} \\text{Adresse} \\xrightarrow{\\text{Bindung}} \\text{Ressource}$$

### Location Service

| Dienst | Funktion |
|---|---|
| **Forwarding Pointer** | Zeiger auf aktuelle Position |
| **Home-Based** | Heimatverzeichnis kennt aktuelle Position |
| **Broadcasting** | Anfrage an alle Knoten |
| **Hierarchical** | Baumstruktur zur Lokalisierung |

### Caching

**Prinzip:** Kopien von Ressourcen werden lokal gespeichert.

| Aspekt | Beschreibung |
|---|---|
| Vorteil | Reduzierte Latenz, weniger Netzwerklast |
| Nachteil | Konsistenzprobleme |
| Strategie | Time-to-Live (TTL), Write-Through, Write-Back |

### Replikation

**Replikation** bedeutet, Kopien einer Ressource auf mehreren Knoten zu halten.

| Typ | Beschreibung |
|---|---|
| **Vollständig** | Alle Daten auf allen Knoten |
| **Partiell** | Nur bestimmte Daten repliziert |
| **Primär-Kopie** | Ein Master, mehrere Slaves |
| **Aktiv-Replikation** | Alle Kopien sind aktiv |
`,
    },
    {
      id: "vs-6",
      title: "Konsistenz & Replikation",
      duration: "30 min",
      type: "text",
      content: `## Konsistenz & Replikation

### Konsistenzmodelle

Ein **Konsistenzmodell** definiert, welche Werte ein Lesezugriff zurückgeben darf.

| Modell | Beschreibung |
|---|---|
| **Strong Consistency** | Jeder Lesezugriff liefert den letzten geschriebenen Wert |
| **Weak Consistency** | Lesen kann veraltete Werte liefern; Update wird irgendwann propagiert |
| **Eventual Consistency** | Bei fehlenden neuen Updates konvergieren alle Kopien |

### Eventual Consistency

$$\\text{Keine Updates} \\Rightarrow \\text{Alle Kopien} \\to \\text{konsistenter Zustand}$$

**Varianten:**
- **Causal Consistency:** Kausal zusammenhängende Operationen werden in Reihenfolge gesehen
- **Read-your-writes:** Leser sieht eigene Schreiboperationen sofort
- **Monotonic Reads:** Gelesene Werte werden nie "älter"

### Replikations-Protokolle

**Primary-Backup:**
1. Client schreibt an Primary
2. Primary propagiert an Backups
3. Backups bestätigen
4. Primary bestätigt an Client

| Synchronisation | Beschreibung |
|---|---|
| **Synchron** | Schreiboperation wartet auf alle Bestätigungen |
| **Asynchron** | Schreiboperation gibt sofort zurück |

**Multi-Primary:**
- Mehrere Knoten akzeptieren Schreiboperationen
- Konflikte müssen aufgelöst werden
- Komplexer, aber höherer Durchsatz

### Konsistenz vs. Verfügbarkeit (CAP)

**PACELC-Erweiterung:**
- Bei **Partition** (P): Wahl zwischen Availability (A) und Consistency (C)
- **Else** (E): Wahl zwischen Latency (L) und Consistency (C)

| System | PA/EC | PC/EC |
|---|---|---|
| Cassandra | ✓ | |
| MongoDB | | ✓ |
| DynamoDB | ✓ | |
| Spanner | | ✓ |

### Transaktionen

**ACID-Eigenschaften:**
| Eigenschaft | Bedeutung |
|---|---|
| **A**tomicity | Transaktion wird ganz oder gar nicht ausgeführt |
| **C**onsistency | Übergang von einem konsistenten zum nächsten |
| **I**solation | Transaktionen beeinflussen sich nicht |
| **D**urability | Erfolgreiche Transaktionen sind dauerhaft |

**BASE (Alternative für verteilte Systeme):**
| Eigenschaft | Bedeutung |
|---|---|
| **B**asically **A**vailable | Grundsätzlich verfügbar |
| **S**oft State | Zustand kann sich ändern |
| **E**ventual Consistency | Irgendwann konsistent |

### Zwei-Phasen-Commit (2PC)

1. **Vorbereitungsphase (Prepare):** Coordinator fragt alle Teilnehmer
2. **Commit-Phase:** Wenn alle "Ja" → Commit; sonst Abort

**Problem:** Blocking Protocol — wenn Coordinator ausfällt, bleiben Teilnehmer blockiert.
`,
    },
    {
      id: "vs-klausur",
      title: "Probeklausur Verteilte Systeme",
      duration: "45 min",
      type: "quiz",
      examMode: true,
      content: `## Probeklausur: Verteilte Systeme

### Frage 1
Was besagt das CAP-Theorem?

A) Ein verteiltes System ist immer konsistent, verfügbar und partitionstolerant
B) Ein verteiltes System kann maximal zwei von drei Eigenschaften haben: Consistency, Availability, Partition tolerance
C) Nur Consistency und Availability sind wichtig
D) Partition tolerance ist optional

Richtig: **B.** Das CAP-Theorem (Brewer) besagt, dass ein verteiltes System maximal zwei der drei Eigenschaften Consistency, Availability und Partition tolerance gleichzeitig erfüllen kann.

---

### Frage 2
Was ist der Unterschied zwischen iterativem und konkurrierendem Server?

A) Iterative Server sind schneller
B) Konkurrierende Server behandeln mehrere Clients gleichzeitig
C) Iterative Server können keine TCP-Verbindungen annehmen
D) Es gibt keinen Unterschied

Richtig: **B.** Konkurrierende Server verwenden z.B. fork(), um mehrere Clients gleichzeitig zu bedienen. Iterative Server behandeln einen Client nach dem anderen.

---

### Frage 3
Was bedeutet "schwache Mobilität" bei Codemigration?

A) Der gesamte Prozesszustand wird übertragen
B) Nur Code und Daten werden übertragen, keine Ausführungszustände
C) Der Prozess kann sich nicht mehr bewegen
D) Die Migration ist langsam

Richtig: **B.** Bei schwacher Mobilität werden nur Code und ggf. Daten zum Zielhost übertragen. Die Ausführung beginnt dort von Anfang an, ohne vorherigen Zustand.

---

### Frage 4
Was beschreibt "Eventual Consistency"?

A) Daten sind immer sofort konsistent
B) Bei fehlenden Updates konvergieren alle Kopien irgendwann
C) Daten sind nie konsistent
D) Nur der primäre Knoten ist konsistent

Richtig: **B.** Eventual Consistency garantiert, dass bei Abwesenheit neuer Updates alle Replikate irgendwaren denselben Zustand erreichen.

---

### Frage 5
Welche Bindungsart bei Ressourcen nutzt einen eindeutigen Namen?

A) By Value
B) By Type
C) By Identifier
D) By Location

Richtig: **C.** Bei "By Identifier" wird die Ressource über einen eindeutigen Namen (Identifier) wie URL oder UUID gebunden.

---

### Frage 6
Was ist ein Endpoint in der Client-Server-Kommunikation?

A) Der letzte Server in einer Kette
B) Eine Kombination aus IP-Adresse und Portnummer
C) Nur die IP-Adresse
D) Nur die Portnummer

Richtig: **B.** Ein Endpoint ist definiert durch die Kombination aus IP-Adresse (identifiziert den Host) und Portnummer (identifiziert den Dienst).

---

### Frage 7
Was ist der Vorteil von TCP-Handoff bei Server-Clustern?

A) Erhöhte Sicherheit
B) Der Frontend-Server wird entlastet, da Backend direkt antwortet
C) Schnellere Datenbankzugriffe
D) Bessere Lastverteilung

Richtig: **B.** Bei TCP-Handoff übernimmt der Backend-Server die TCP-Verbindung und antwortet direkt an den Client, was den Frontend-Server entlastet.

---

### Frage 8
Was beschreibt die ACID-Eigenschaft "Isolation"?

A) Transaktionen werden atomar ausgeführt
B) Transaktionen beeinflussen sich nicht gegenseitig
C) Daten sind dauerhaft gespeichert
D) Übergang zwischen konsistenten Zuständen

Richtig: **B.** Isolation bedeutet, dass gleichzeitig laufende Transaktionen sich nicht gegenseitig beeinflussen – jede Transaktion läuft so ab, als wäre sie die einzige.

---

### Frage 9
Welches Replikationsprotokoll nutzt einen Coordinator für die Commit-Entscheidung?

A) Paxos
B) Two-Phase Commit (2PC)
C) Raft
D) Gossip Protocol

Richtig: **B.** Das Two-Phase Commit Protokoll (2PC) verwendet einen Coordinator, der in der Vorbereitungsphase alle Teilnehmer fragt und in der Commit-Phase die Entscheidung mitteilt.
`,
    },
  ],
};
