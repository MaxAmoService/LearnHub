import { Module } from "../types";

export const advWvModule: Module = {
  id: "adv-wv",
  slug: "adv-wv",
  title: "Weitverkehrsnetze (WV)",
  description: "WAN-Konzepte, Routing-Protokolle, MPLS, SD-WAN und Netzwerk-Topologien",
  icon: "🌍",
  color: "#8B5CF6",
  progress: 0,
  category: "advanced",
  lessons: [
    {
      id: "wv-1",
      title: "Weitverkehrsnetze Grundlagen",
      duration: "25 min",
      type: "text",
      content: `## Weitverkehrsnetze Grundlagen

### Was sind WANs?

Ein **Weitverkehrsnetz (WAN)** verbindet Netzwerke über große Entfernungen (Städte, Länder, Kontinente).

| Eigenschaft | LAN | WAN |
|---|---|---|
| Reichweite | Gebäude, Campus | Stadt, Land, global |
| Eigentum | Organisation | Provider/Carrier |
| Bandbreite | Hoch (1-100 Gbps) | Variabel (64 kbps - 100 Gbps) |
| Latenz | Niedrig (<1 ms) | Höher (10-500 ms) |
| Technologie | Ethernet | MPLS, SD-WAN, Leased Lines |

### Netzwerk-Topologien

| Topologie | Vorteile | Nachteile |
|---|---|---|
| **Stern** | Einfach, zentral verwaltet | Single Point of Failure |
| **Ring** | Deterministisch, einfach | Ausfall unterbricht Ring |
| **Mesh** | Hohe Ausfallsicherheit | Teuer, komplex |
| **Baum** | Skalierbar, hierarchisch | Abhängig von Wurzel |
| **Vollvermascht** | Maximale Redundanz | $O(n^2)$ Verbindungen |

### WAN-Technologien im Überblick

| Technologie | Beschreibung |
|---|---|
| **Leased Lines** | Dedizierte Punkt-zu-Punkt-Verbindung |
| **Frame Relay** | Packet-switching (veraltet) |
| **ATM** | Zellbasiertes Switching (veraltet) |
| **MPLS** | Label-basiertes Routing |
| **SD-WAN** | Software-defined WAN |
| **Internet VPN** | Verschlüsselte Tunnel über Internet |

### OSI-Schicht-Zuordnung

| Schicht | WAN-Technologie |
|---|---|
| Schicht 1 (Physisch) | Leased Lines, DSL, Glasfaser |
| Schicht 2 (Datenlink) | Frame Relay, PPP, HDLC |
| Schicht 3 (Netzwerk) | MPLS, IP-VPN |

### Leitungsvermittlung vs. Paketvermittlung

| Aspekt | Leitungsvermittlung | Paketvermittlung |
|---|---|---|
| Verbindung | Dediziert | Geteilt |
| Bandbreite | Garantiert | Best-effort |
| Kosten | Hoch | Geringer |
| Beispiel | Telefon (ISDN) | Internet (IP) |
`,
    },
    {
      id: "wv-2",
      title: "Routing-Protokolle",
      duration: "30 min",
      type: "text",
      content: `## Routing-Protokolle

### Klassifikation

| Typ | Beschreibung | Beispiel |
|---|---|---|
| **Interior Gateway (IGP)** | Innerhalb eines Autonomous Systems | RIP, OSPF, EIGRP |
| **Exterior Gateway (EGP)** | Zwischen Autonomous Systems | BGP |

### Distance Vector

**Prinzip:** Jeder Router kennt nur die Entfernung (Hop Count) zu seinen Nachbarn.

**Bellman-Ford-Algorithmus:**
$$d(x, y) = \\min_{v \\in \\text{Nachbarn}(x)} \\{c(x, v) + d(v, y)\\}$$

**RIP (Routing Information Protocol):**
- Hop Count als Metrik (max. 15 Hops)
- Updates alle 30 Sekunden
- Problem: Counting-to-Infinity

| Eigenschaft | RIP v1 | RIP v2 |
|---|---|---|
| Adressierung | Classful | Classless (VLSM) |
| Authentifizierung | Nein | Ja |
| Multicast | Broadcast | 224.0.0.9 |

### Link State

**Prinzip:** Jeder Router kennt die gesamte Topologie (Link-State Database).

**OSPF (Open Shortest Path First):**
- Dijkstra-Algorithmus (Shortest Path First)
- Areas für Skalierbarkeit
- Kosten-Metrik: $\\text{Kosten} = \\frac{10^8}{\\text{Bandbreite (bps)}}$

| Area-Typ | Beschreibung |
|---|---|
| **Backbone (Area 0)** | Zentrale Area, verbindet alle anderen |
| **Standard Area** | Normale Area mit allen LSAs |
| **Stub Area** | Keine externen Routen |
| **NSSA** | Stub + eigene externen Routen |

**OSPF-Nachbarnschaft:**
1. **Down** → **Init** (Hello empfangen)
2. **Init** → **2-Way** (gegenseitige Hello)
3. **2-Way** → **ExStart** (DR/BDR Wahl)
4. **ExStart** → **Exchange** (DBD austauschen)
5. **Exchange** → **Loading** (LSR/LSU)
6. **Loading** → **Full** (DB synchron)

### BGP (Border Gateway Protocol)

**BGP** ist das Routing-Protokoll des Internets zwischen Autonomous Systems.

| Eigenschaft | Beschreibung |
|---|---|
| Typ | Path Vector |
| Transport | TCP (Port 179) |
| Metric | AS-Pfad, Policies |
| eBGP | Zwischen verschiedenen AS |
| iBGP | Innerhalb eines AS |

**BGP-Path Attributes:**
| Attribut | Beschreibung |
|---|---|
| AS_PATH | Liste der durchlaufenen AS |
| NEXT_HOP | Nächster Hop |
| LOCAL_PREF | Lokale Präferenz (iBGP) |
| MED | Metric for incoming traffic |

**BGP-Selektion (vereinfacht):**
1. Höchstes LOCAL_PREF
2. Kürzester AS_PATH
3. Niedrigster ORIGIN
4. Niedrigster MED
5. eBGP vor iBGP
6. Niedrigster IGP-Metric zum NEXT_HOP
`,
    },
    {
      id: "wv-3",
      title: "WAN-Technologien",
      duration: "30 min",
      type: "text",
      content: `## WAN-Technologien

### Leased Lines

**Leased Lines** sind dedizierte Punkt-zu-Punkt-Verbindungen.

| Typ | Kapazität |
|---|---|
| T1 | 1,544 Mbps |
| T3 | 44,736 Mbps |
| E1 | 2,048 Mbps |
| E3 | 34,368 Mbps |
| SONET OC-3 | 155,52 Mbps |
| SONET OC-48 | 2,488 Gbps |

### MPLS (Multiprotocol Label Switching)

**MPLS** kombiniert die Vorteile von Leitungs- und Paketvermittlung.

**Funktionsweise:**
1. **LER (Label Edge Router):** Fügt Label am Netzwerkeinlass hinzu
2. **LSR (Label Switching Router):** Verwendet Label für Weiterleitung
3. **LSP (Label Switched Path):** Pfad durch das MPLS-Netzwerk

**Label-Struktur (32 Bit):**
| Feld | Bits | Bedeutung |
|---|---|---|
| Label Value | 20 | Label-Nummer |
| TC (Traffic Class) | 3 | QoS |
| S (Stack) | 1 | Bottom of Stack |
| TTL | 8 | Time to Live |

**Vorteile von MPLS:**
- Schnellere Weiterleitung als IP-Routing
- Traffic Engineering möglich
- VPN-Unterstützung (L2VPN, L3VPN)
- QoS-Garantien

### SD-WAN (Software-Defined WAN)

**SD-WAN** trennt die Steuerungsebene von der Datenebene.

| Komponente | Funktion |
|---|---|
| **SD-WAN Controller** | Zentrale Steuerung, Policies |
| **SD-WAN Edge** | Geräte an den Standorten |
| **Orchestrator** | Management, Monitoring |

**Vorteile:**
- Kostengünstig (Internet statt teurer WAN-Leitungen)
- Zentrale Verwaltung
- Application-aware Routing
- Automatische Pfadauswahl

### VPN (Virtual Private Network)

| Typ | Beschreibung |
|---|---|
| **Site-to-Site** | Verbindet zwei Netzwerke |
| **Remote Access** | Einzelner User zum Netzwerk |
| **IPSec** | Layer 3 Verschlüsselung |
| **SSL/TLS VPN** | Layer 4/7 Verschlüsselung |

### QoS (Quality of Service)

| Klasse | Beschreibung | Beispiel |
|---|---|---|
| **Expedited Forwarding (EF)** | Geringste Latenz, Priorität | VoIP |
| **Assured Forwarding (AF)** | Verschiedene Drop-Prioritäten | Video |
| **Best Effort (BE)** | Keine Garantie | Web, Email |

**DSCP-Werte (Differentiated Services Code Point):**
- 0: Best Effort
- 46: EF (Expedited Forwarding)
- 10-18: AF11-AF13
- 26-34: AF21-AF23
`,
    },
    {
      id: "wv-klausur",
      title: "Probeklausur Weitverkehrsnetze",
      duration: "30 min",
      type: "quiz",
      examMode: true,
      content: `## Probeklausur: Weitverkehrsnetze

### Frage 1
Was ist der Hauptunterschied zwischen Distance Vector und Link State Routing?

A) Distance Vector ist schneller
B) Link State kennt die gesamte Topologie, Distance Vector nur Nachbarn
C) Link State funktioniert nur in kleinen Netzwerken
D) Distance Vector verwendet Dijkstra

Richtig: **B.** Bei Link State (z.B. OSPF) kennt jeder Router die gesamte Netzwerk-Topologie. Bei Distance Vector (z.B. RIP) kennt jeder Router nur die Entfernung zu seinen direkten Nachbarn.

---

### Frage 2
Was ist die maximale Hop-Count bei RIP?

A) 10
B) 15
C) 16
D) 255

Richtig: **B.** RIP unterstützt maximal 15 Hops. Ein Hop Count von 16 bedeutet "unreachable".

---

### Frage 3
Welches Protokoll wird zwischen Autonomous Systems im Internet verwendet?

A) OSPF
B) RIP
C) EIGRP
D) BGP

Richtig: **D.** BGP (Border Gateway Protocol) ist das Standard-Routing-Protokoll zwischen Autonomous Systems im Internet.

---

### Frage 4
Was ist MPLS?

A) Ein Layer-2-Protokoll wie Ethernet
B) Ein Label-basiertes Weiterleitungsverfahren zwischen Layer 2 und 3
C) Ein Routing-Protokoll
D) Eine Verschlüsselungsmethode

Richtig: **B.** MPLS (Multiprotocol Label Switching) arbeitet als "Layer 2.5" — es verwendet Labels für die Weiterleitung und kombiniert Vorteile von Leitungs- und Paketvermittlung.

---

### Frage 5
Was sind die drei Hauptkomponenten von SD-WAN?

A) Router, Switch, Firewall
B) Controller, Edge-Geräte, Orchestrator
C) LAN, WAN, Internet
D) TCP, UDP, IP

Richtig: **B.** SD-WAN besteht aus dem Controller (zentrale Steuerung), Edge-Geräten (an den Standorten) und dem Orchestrator (Management und Monitoring).

---

### Frage 6
Welche OSPF-Area verbindet alle anderen Areas?

A) Stub Area
B) NSSA
C) Backbone Area (Area 0)
D) Totally Stubby Area

Richtig: **C.** Die Backbone Area (Area 0) ist die zentrale Area in OSPF, die alle anderen Areas miteinander verbindet.
`,
    },
  ],
};
