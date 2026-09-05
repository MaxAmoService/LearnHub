import { Module } from "./types";

// ============================================================================
// IHK "Netzwerktechnik" — Modul-Daten
// Quelle: IHK IT-Handbuch + AP1/AP2 Prüfungsthemen
// ============================================================================

export const netzwerkModule: Module = {
  id: "ihk-netzwerk",
  slug: "ihk-netzwerk",
  title: "Netzwerktechnik",
  description: "IHK AP1/AP2: OSI-Modell, TCP/IP, IPv4/IPv6, Subnetting, Netzwerkgeräte, Topologien, Protokolle, WLAN, Sicherheit, Kabel, Tools",
  icon: "🌐",
  color: "#3B82F6",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Netzwerktechnik (IHK)

### OSI-Modell (7 Schichten)
Merksatz: **A**lle **P**riester **E**ssen **T**afelschokolade **A**m **P**almsonntag
- Schicht 7: Anwendung (HTTP, FTP, SMTP)
- Schicht 6: Präsentation (SSL/TLS, ASCII)
- Schicht 5: Sitzung (Session-Management)
- Schicht 4: Transport (TCP, UDP)
- Schicht 3: Netzwerk (IP, ICMP)
- Schicht 2: Sicherung (Ethernet, MAC)
- Schicht 1: Physikalisch (Kabel, Bits)

### TCP/IP (4 Schichten)
Anwendung | Transport | Internet | Netzwerkzugang
- **TCP**: Verbindungsorientiert, zuverlässig (SYN → SYN-ACK → ACK)
- **UDP**: Verbindungslos, schnell, ohne Garantie

### IPv4
- 32 Bit, 4 Oktette (0-255), z.B. 192.168.1.1
- **Klassen**: A (/8), B (/16), C (/24), D (Multicast), E (Reserviert)
- **Privat**: 10.x, 172.16-31.x, 192.168.x

### Subnetting
- **Formel Hosts**: 2^Hostbits - 2
- **Formel Subnetze**: 2^entliehene Bits
- /24 = 254 Hosts | /25 = 126 | /26 = 62 | /27 = 30 | /28 = 14

### IPv6
- 128 Bit, hexadezimal, z.B. 2001:db8::1
- **Dual Stack**: IPv4 + IPv6 parallel
- **Link-Local**: fe80:: | **Global**: 2000::

### Geräte & Schichten
- **Hub**: Schicht 1 (an alle Ports)
- **Switch**: Schicht 2 (MAC-basiert, lernt CAM-Tabelle)
- **Router**: Schicht 3 (IP-basiert, trennt Broadcast-Domänen)

### Topologien
- **Stern** = Standard heute (Switch in der Mitte)
- **SPoF** = Single Point of Failure → Redundanz!

### Protokolle & Ports
| Protokoll | Port | Zweck |
|-----------|------|-------|
| HTTP | 80 | Web (unverschlüsselt) |
| HTTPS | 443 | Web (TLS-verschlüsselt) |
| SSH | 22 | Sichere Fernverbindung |
| FTP | 20/21 | Dateiübertragung |
| DNS | 53 | Namensauflösung |
| DHCP | 67/68 | IP-Vergabe |
| SMTP | 25/587 | E-Mail senden |
| IMAP | 143/993 | E-Mail empfangen |
| POP3 | 110/995 | E-Mail empfangen |

### WLAN
- **802.11b/g**: 2,4 GHz | **a/ac**: 5 GHz | **n/ax**: beide
- **Sicherheit**: WEP ❌ < WPA < WPA2 ✅ < WPA3 🔒

### Sicherheit
- **VLAN**: Logische Netzwerktrennung (Broadcast-Domäne)
- **VPN**: Verschlüsselter Tunnel (Site-to-Site, Remote Access)
- **DMZ**: Pufferzone zwischen Internet und internem Netz
- **IDS**: Erkennt Angriffe | **IPS**: Erkennt + blockiert

### Kabel
- **Cat 5e**: 1 Gbit/s | **Cat 6a**: 10 Gbit/s/100m
- **UTP**: Büro | **STP**: Industrie | **Glasfaser**: Backbone

### Tools
- **ping**: Erreichbarkeit (ICMP)
- **traceroute**: Weg zum Ziel
- **ipconfig**: Netzwerk-Konfiguration
- **nslookup**: DNS-Abfrage
- **Wireshark**: Paket-Analyse`,

  lessons: [
    {
      id: "netz-1",
      title: "OSI-Referenzmodell",
      duration: "15 min",
      type: "interactive",
      interactive: "osiCapsuleViewer",
      content: `## Was ist das OSI-Modell?

> In diesem Modul lernst du Netzwerktechnik von Grund auf kennen — vom OSI-Modell über IP-Adressierung und Subnetting bis zu Routing, DNS und Netzwerksicherheit. Netzwerk-Fragen kommen in jeder IHK-Prüfung vor!

> Sicherheitsthemen wie Firewalls, VPN und IDS/IPS vertiefen wir im Modul "IT-Sicherheit" — dort mit Fokus auf Angriffsvektoren und Schutzkonzepte.

Das **OSI-Referenzmodell** (Open Systems Interconnection) wurde von der **ISO** entwickelt und beschreibt die Kommunikation in Netzwerken in **7 Schichten**. Jede Schicht hat eine klar definierte Aufgabe.

> 💡 Das OSI-Modell ist wie eine **Zwiebel** — jede Schicht ist eine neue Schale um die vorherige.

## Die 7 Schichten

Merksatz: **A**lle **P**riester **E**ssen **T**afelschokolade **A**m **P**almsonntag

| # | Schicht | Aufgabe | PDU | Geräte | Protokolle |
|---|---------|---------|-----|--------|------------|
| 7 | Anwendung | Benutzerschnittstelle | Daten | — | HTTP, FTP, SMTP, DNS |
| 6 | Präsentation | Datenformat, Verschlüsselung | Daten | — | SSL/TLS, ASCII, JPEG |
| 5 | Sitzung | Session-Management | Daten | — | NetBIOS, RPC |
| 4 | Transport | End-to-End-Verbindung | Segmente | — | TCP, UDP |
| 3 | Netzwerk | Routing, IP-Adressierung | Pakete | Router | IP, ICMP, ARP |
| 2 | Sicherung | MAC-Adressen, Frames | Frames | Switch, Bridge | Ethernet, WLAN |
| 1 | Physikalisch | Bitübertragung | Bits | Hub, Repeater | Kabel, Stecker |

## Datenkapselung

Jede Schicht fügt ihren eigenen **Header** hinzu:
- Anwendung → Daten
- Transport → **Header** + Daten = Segment
- Netzwerk → **Header** + Segment = Paket
- Sicherung → **Header** + Paket + **Trailer** = Frame
- Physikalisch → Bits

Beim Empfänger wird alles **umgekehrt entkapselt**.

## OSI vs. TCP/IP

| OSI (7 Schichten) | TCP/IP (4 Schichten) |
|-------------------|---------------------|
| Anwendung, Präsentation, Sitzung | Anwendung |
| Transport | Transport |
| Netzwerk | Internet |
| Sicherung, Physikalisch | Netzwerkzugang |

> 💡 **IHK-Tipp:** Das TCP/IP-Modell ist das praktische Modell — das Internet nutzt es. OSI ist nur ein Referenzmodell.

[INTERACTIVE]

> Jetzt kennst du die theoretische Schichten-Architektur. In der nächsten Lektion schauen wir uns das praktische TCP/IP-Modell an — und lernen die wichtigsten Protokolle und Ports kennen.`,
    },
    {
      id: "netz-2",
      title: "TCP/IP-Modell & Protokolle",
      duration: "15 min",
      type: "interactive",
      interactive: "tcpHandshakeSimulator",
      content: `> In der letzten Lektion haben wir das OSI-Referenzmodell mit seinen 7 Schichten kennengelernt. Jetzt schauen wir uns das TCP/IP-Modell an — das Modell, das das Internet tatsächlich verwendet — und lernen die wichtigsten Protokolle und Ports kennen.

## Die 4 Schichten des TCP/IP-Modells

1. **Anwendung** (Application): HTTP, FTP, SMTP, DNS, SSH
2. **Transport** (Transport): TCP, UDP
3. **Internet** (Internet): IP, ICMP, ARP
4. **Netzwerkzugang** (Network Access): Ethernet, WLAN

## TCP vs. UDP

| Eigenschaft | TCP | UDP |
|-------------|-----|-----|
| Verbindung | Verbindungsorientiert (3-Wege-Handshake) | Verbindungslos |
| Zuverlässigkeit | ✅ Bestätigungen, Reihenfolge | ❌ Keine Garantie |
| Geschwindigkeit | 🐢 Langsamer (Overhead) | 🐇 Schnell |
| Anwendung | HTTP, FTP, SMTP, E-Mail | DNS, DHCP, Streaming, Gaming |

## TCP 3-Wege-Handshake
1. **SYN**: Client → Server: "Hallo, Verbindung?"
2. **SYN-ACK**: Server → Client: "Ja, bereit!"
3. **ACK**: Client → Server: "Perfekt, los geht's!"

## Wichtige Ports (Well-Known: 0-1023)

| Port | Protokoll | Zweck |
|------|-----------|-------|
| 20/21 | FTP | Dateien |
| 22 | SSH | Sichere Shell |
| 23 | Telnet | Terminal (unsicher!) |
| 25 | SMTP | E-Mail senden |
| 53 | DNS | Namensauflösung |
| 67/68 | DHCP | IP-Vergabe |
| 80 | HTTP | Web |
| 110 | POP3 | E-Mail |
| 143 | IMAP | E-Mail |
| 443 | HTTPS | Sicheres Web |

> 💡 **IHK-Tipp:** Port-Nummern auswendig lernen — besonders 80, 443, 22, 25, 53!

## 🤝 TCP-Handshake ausprobieren

[INTERACTIVE]

> 💡 Der TCP-Handshake-Simulator zeigt dir den 3-Wege-Handshake live — mit Paketverlust-Simulation!

## 🔐 Verschlüsselung

[INTERACTIVE]

> 💡 Verschlüsselung von Caesar bis TLS — wie schützt HTTPS deine Daten?

> Jetzt kennst du die Protokolle und Ports. In der nächsten Lektion widmen wir uns der IPv4-Adressierung — dem Fundament für alles, was mit IP-Netzwerken zu tun hat.`,
    },
    {
      id: "netz-3",
      title: "IPv4-Adressierung",
      duration: "18 min",
      type: "interactive",
      interactive: "macConverter",
      content: `> In der letzten Lektion haben wir das TCP/IP-Modell und die wichtigsten Protokolle kennengelernt. Jetzt widmen wir uns der IPv4-Adressierung — der Grundlage, wie Geräte in Netzwerken eindeutig identifiziert werden.

## Aufbau einer IPv4-Adresse
- **32 Bit**, in **4 Oktetten** à 8 Bit
- Dezimal mit Punkten: \`192.168.1.1\`
- Binär: \`11000000.10101000.00000001.00000001\`
- Jedes Oktett: **0-255** (2^8 = 256 Werte)

## Die 5 IP-Klassen

| Klasse | Bereich | Standard-Maske | Verwendung |
|--------|---------|----------------|------------|
| A | 1.0.0.0 – 126.255.255.255 | /8 (255.0.0.0) | Sehr große Netzwerke |
| B | 128.0.0.0 – 191.255.255.255 | /16 (255.255.0.0) | Mittlere Netzwerke |
| C | 192.0.0.0 – 223.255.255.255 | /24 (255.255.255.0) | Kleine Netzwerke |
| D | 224.0.0.0 – 239.255.255.255 | — | Multicast |
| E | 240.0.0.0 – 255.255.255.255 | — | Reserviert |

## Private Adressbereiche (RFC 1918)
- **Klasse A**: 10.0.0.0 – 10.255.255.255 (/8)
- **Klasse B**: 172.16.0.0 – 172.31.255.255 (/12)
- **Klasse C**: 192.168.0.0 – 192.168.255.255 (/16)

> 💡 Private Adressen sind **NICHT im Internet routbar** — nur für lokale Netzwerke. NAT übersetzt sie.

## Netzwerk- vs. Broadcast-Adresse
- **Netzwerkadresse**: Erste im Subnetz (Host-Bits = 0)
- **Broadcast-Adresse**: Letzte im Subnetz (Host-Bits = 1)
- **Nutzbare Hosts**: Alles dazwischen

> 💡 **IHK-Tipp:** Subnetting-Berechnungen kommen in AP1 und AP2 regelmäßig dran!

## 🔢 Binär/Dezimal-Konverter

[INTERACTIVE]

> 💡 Der MAC/IP-Konverter zeigt dir Binär und Dezimal im Wechsel — übe die Umrechnung!

> Jetzt kennst du den Aufbau von IPv4-Adressen und die IP-Klassen. In der nächsten Lektion lernst du Subnetting kennen — wie man große Netzwerke in kleinere, effiziente Teilnetze aufteilt.`,
    },
    {
      id: "netz-4",
      title: "Subnetting Grundlagen — CIDR & Subnetzmaske",
      duration: "10 min",
      type: "text",
      content: `> In der letzten Lektion haben wir den Aufbau von IPv4-Adressen und die IP-Klassen kennengelernt. Jetzt kommt das wichtigste Thema für die IHK-Prüfung: Subnetting — die Kunst, große Netzwerke in kleinere Teilnetze aufzuteilen.

## Was ist Subnetting?

Subnetting bedeutet, ein großes Netzwerk in **kleinere Teilnetze (Subnetze)** aufzuteilen. Das bringt drei Vorteile:

- 🔒 **Sicherheit**: Abteilungen werden voneinander getrennt
- ⚡ **Performance**: Broadcast-Traffic bleibt im Subnetz
- 📦 **Effizienz**: IP-Adressen werden besser genutzt

> 💡 **IHK-Tipp:** Subnetting kommt in JEDER AP1/AP2-Prüfung dran — es ist DIE Aufgabe, die du können MUSST!

## Die CIDR-Notation (Classless Inter-Domain Routing)

Eine IP-Adresse mit CIDR hat das Format:

$$\\text{IP-Adresse} / \\text{Präfixlänge}$$

Beispiel: **192.168.1.0/24**

Die Zahl nach dem Schrägstrich gibt an, wie viele Bits für die **Netzwerkadresse** reserviert sind:

$$\\underbrace{192.168.1.0}_{\\text{IP-Adresse}} \\ / \\ \\underbrace{24}_{\\text{Netzwerk-Bits}}$$

Das bedeutet: **24 Bits** für das Netzwerk, **8 Bits** für Hosts:

$$32 - 24 = 8 \\text{ Host-Bits}$$

## Die Subnetzmaske

Die Subnetzmaske bestimmt, welcher Teil einer IP-Adresse das Netzwerk und welcher den Host identifiziert. Sie wird binär geschrieben — erst alle 1en (Netzwerk), dann alle 0en (Host):

$$\\text{Maske für /24: } \\underbrace{11111111.11111111.11111111}_{24 \\times 1}.\\underbrace{00000000}_{8 \\times 0} = 255.255.255.0$$

### Subnetzmaske berechnen — Schritt für Schritt

Gegeben: CIDR /26

**Schritt 1:** Schreibe 26 Einsen, dann 6 Nullen (32 - 26 = 6):

$$\\underbrace{11111111.11111111.11111111.11}_{26}\\underbrace{000000}_{6}$$

**Schritt 2:** Teile in 4 Oktette à 8 Bit:

$$11111111 . 11111111 . 11111111 . 11000000$$

**Schritt 3:** Rechne jedes Oktett in Dezimal:

$$255 . 255 . 255 . 192$$

> ✅ **Ergebnis:** /26 → Subnetzmaske = **255.255.255.192**

## Wichtige CIDR-Werte merken

| CIDR | Maske | Letztes Oktett (Binär) | Hosts ($2^h - 2$) |
|------|-------|------------------------|---------------------|
| /24 | 255.255.255.0 | 00000000 = 0 | $2^8 - 2 = 254$ |
| /25 | 255.255.255.128 | 10000000 = 128 | $2^7 - 2 = 126$ |
| /26 | 255.255.255.192 | 11000000 = 192 | $2^6 - 2 = 62$ |
| /27 | 255.255.255.224 | 11100000 = 224 | $2^5 - 2 = 30$ |
| /28 | 255.255.255.240 | 11110000 = 240 | $2^4 - 2 = 14$ |
| /29 | 255.255.255.248 | 11111000 = 248 | $2^3 - 2 = 6$ |
| /30 | 255.255.255.252 | 11111100 = 252 | $2^2 - 2 = 2$ |

> 💡 Merke dir die Tabelle — in der Prüfung musst du schnell die passende CIDR-Notation erkennen!

> Jetzt kennst du CIDR-Notation und Subnetzmasken. In der nächsten Lektion lernst du die Subnetting-Formeln kennen, mit denen du Hosts, Subnetze und die richtige CIDR berechnest.`,
    },
    {
      id: "netz-5",
      title: "Subnetting Formeln",
      duration: "10 min",
      type: "text",
      content: `> In der letzten Lektion haben wir die CIDR-Notation und Subnetzmasken kennengelernt. Jetzt lernst du die konkreten Formeln, mit denen du berechnest, wie viele Hosts und Subnetze ein Netzwerk hat — und welche CIDR für deine Anforderungen passt.

## Anzahl der nutzbaren Hosts

$$\\text{Nutzbare Hosts} = 2^h - 2$$

Wobei $h$ = Anzahl der Host-Bits (die 0en in der Subnetzmaske).

> 💡 Die **-2** kommen von der **Netzwerkadresse** (alle Host-Bits = 0) und der **Broadcast-Adresse** (alle Host-Bits = 1) — diese beiden sind reserviert und können nicht an Geräte vergeben werden.

**Beispiel /26:**
$$32 - 26 = 6 \\text{ Host-Bits} \\Rightarrow 2^6 - 2 = 62 \\text{ nutzbare Hosts}$$

## Anzahl der Subnetze

$$\\text{Anzahl Subnetze} = 2^s$$

Wobei $s$ = Anzahl der "entliehenen" Bits (wenn man von einem Standard-Netzwerk in kleinere Subnetze aufteilt).

## Richtige CIDR für gewünschte Host-Anzahl

Gegeben: Du brauchst mindestens $n$ Hosts. Gesucht: Die CIDR-Notation.

**Schritt 1:** Finde die kleinste Zweierpotenz $2^h$ mit $2^h - 2 \\geq n$

**Schritt 2:** Berechne CIDR: $32 - h$

**Beispiel:** 500 Hosts benötigt?

$$2^h - 2 \\geq 500 \\Rightarrow 2^h \\geq 502 \\Rightarrow h = 9 \\ (2^9 = 512)$$

$$\\text{CIDR} = 32 - 9 = 23 \\Rightarrow /23 \\text{ mit } 510 \\text{ nutzbaren Hosts}$$

> 💡 **IHK-Tipp:** Merke dir die Zweierpotenzen: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024!

## Netzwerk- und Broadcast-Adresse

- **Netzwerkadresse**: Erste im Subnetz (Host-Bits = 0)
- **Broadcast-Adresse**: Letzte im Subnetz (Host-Bits = 1)
- **Nutzbare Hosts**: Alles dazwischen

> Jetzt kennst du die Subnetting-Formeln. In der nächsten Lektion lernst du die AND-Verknüpfung kennen — damit berechnest du aus IP-Adresse und Maske die konkrete Netzwerkadresse.`,
    },
    {
      id: "netz-6",
      title: "AND-Verknüpfung & Netzwerkadresse",
      duration: "12 min",
      type: "interactive",
      interactive: "subnetCalculator",
      content: `> In der letzten Lektion haben wir die Subnetting-Formeln kennengelernt. Jetzt lernst du die AND-Verknüpfung kennen — damit berechnest du aus einer IP-Adresse und der Subnetzmaske die konkrete Netzwerkadresse, Broadcast-Adresse und den ersten/letzten Host.

## Die UND-Verknüpfung (AND-Operation)

Um die **Netzwerkadresse** zu finden, wendet man die **UND-Verknüpfung** (AND) auf IP-Adresse und Subnetzmaske an:

$$\\text{Netzwerkadresse} = \\text{IP-Adresse} \\ \\mathbf{AND} \\ \\text{Subnetzmaske}$$

### Regeln der UND-Verknüpfung

$$1 \\ \\mathbf{AND} \\ 1 = 1 \\qquad 1 \\ \\mathbf{AND} \\ 0 = 0 \\qquad 0 \\ \\mathbf{AND} \\ 1 = 0 \\qquad 0 \\ \\mathbf{AND} \\ 0 = 0$$

> 💡 Merke: **Nur wenn BEIDE 1 sind, kommt 1 heraus.** Sonst immer 0.

## Beispiel: 192.168.1.130 mit Maske /26

**Schritt 1:** IP-Adresse in Binär:

$$192.168.1.130 = \\underbrace{11000000}_{192}.\\underbrace{10101000}_{168}.\\underbrace{00000001}_{1}.\\underbrace{10000010}_{130}$$

**Schritt 2:** Subnetzmaske /26 in Binär:

$$255.255.255.192 = \\underbrace{11111111}_{255}.\\underbrace{11111111}_{255}.\\underbrace{11111111}_{255}.\\underbrace{11000000}_{192}$$

**Schritt 3:** AND-Verknüpfung — bit für bit:

$$\\begin{aligned} \\text{IP:}  &\\quad 11000000.10101000.00000001.\\mathbf{10}000010 \\\\ \\text{Maske:} &\\quad 11111111.11111111.11111111.\\mathbf{11}000000 \\\\ \\text{AND:} &\\quad 11000000.10101000.00000001.\\mathbf{10}000000 \\end{aligned}$$

**Schritt 4:** Ergebnis in Dezimal:

$$11000000.10101000.00000001.10000000 = \\mathbf{192.168.1.128}$$

> ✅ **Netzwerkadresse: 192.168.1.128**

## Broadcast-Adresse berechnen

Die Broadcast-Adresse erhält man, indem man alle Host-Bits auf 1 setzt:

$$\\begin{aligned} \\text{Netzwerk:} &\\quad 11000000.10101000.00000001.10\\underbrace{000000}_{\\text{Host-Bits}} \\\\ \\text{Broadcast:} &\\quad 11000000.10101000.00000001.10\\underbrace{111111}_{\\text{alle 1en}} \\end{aligned}$$

$$\\Rightarrow 192.168.1.10111111 = 192.168.1.191$$

## Erste und letzte nutzbare Host-Adresse

$$\\text{Erster Host} = \\text{Netzwerkadresse} + 1 = 192.168.1.129$$

$$\\text{Letzter Host} = \\text{Broadcast} - 1 = 192.168.1.190$$

$$\\text{Anzahl nutzbarer Hosts} = 2^6 - 2 = 62$$

> 💡 **IHK-Tipp:** Übe diese Schritte auf Papier! In der Prüfung darfst du keinen Taschenrechner für Binär-Arithmetik benutzen.

## 🧮 Interaktiver Subnetting-Rechner

Der Rechner zeigt dir alle Werte mit Schritt-für-Schritt-Lösung — probiere verschiedene Eingaben aus!

[INTERACTIVE:subnetCalculator]

> Jetzt kennst du die AND-Verknüpfung und kannst Netzwerkadressen berechnen. In der nächsten Lektion lernst du VLSM kennen — damit teilst du ein Netzwerk in verschieden große Subnetze auf und sparst IP-Adressen.`,
    },
    {
      id: "netz-7",
      title: "VLSM — Variable Subnetze",
      duration: "12 min",
      type: "interactive",
      interactive: "subnettingTrainer",
      content: `> In der letzten Lektion haben wir die AND-Verknüpfung kennengelernt, um Netzwerkadressen zu berechnen. Jetzt geht es einen Schritt weiter: Mit VLSM teilst du ein Netzwerk in verschieden große Subnetze auf — das spart IP-Adressen und ist ein häufiges IHK-Prüfungsthema.

## Was ist VLSM?

**VLSM** erlaubt es, verschiedene Subnetze mit **verschiedenen Präfixlängen** zu erstellen. Das spart IP-Adressen!

## VLSM-Beispiel: Eine Firma mit 4 Abteilungen

| Abteilung | Benötigte Hosts | Gewähltes CIDR | Verfügbare Hosts | Subnetzmaske |
|-----------|-----------------|----------------|-------------------|--------------|
| Vertrieb | 50 | /26 | 62 | 255.255.255.192 |
| Entwicklung | 20 | /27 | 30 | 255.255.255.224 |
| Verwaltung | 10 | /28 | 14 | 255.255.255.240 |
| Geschäftsführung | 5 | /29 | 6 | 255.255.255.248 |

**Berechnung für Vertrieb (50 Hosts):**

$$2^h - 2 \\geq 50 \\Rightarrow 2^h \\geq 52 \\Rightarrow h = 6 \\ (2^6 = 64) \\Rightarrow /26$$

**Berechnung für Entwicklung (20 Hosts):**

$$2^h - 2 \\geq 20 \\Rightarrow 2^h \\geq 22 \\Rightarrow h = 5 \\ (2^5 = 32) \\Rightarrow /27$$

> 💡 **Vorteil:** Ohne VLSM müsste ALLES auf /26 gesetzt werden — 4 × /26 = 248 Adressen. Mit VLSM: 62 + 30 + 14 + 6 = **112 Adressen** — über 50% gespart!

## VLSM aufteilen: Schritt für Schritt

Ausgangsnetzwerk: **192.168.1.0/24**

**Schritt 1:** Vertrieb (/26) bekommt den ersten Block:
- Netz: 192.168.1.0/26 → 192.168.1.0 – 192.168.1.63

**Schritt 2:** Entwicklung (/27) bekommt den nächsten freien Block:
- Netz: 192.168.1.64/27 → 192.168.1.64 – 192.168.1.95

**Schritt 3:** Verwaltung (/28):
- Netz: 192.168.1.96/28 → 192.168.1.96 – 192.168.1.111

**Schritt 4:** Geschäftsführung (/29):
- Netz: 192.168.1.112/29 → 192.168.1.112 – 192.168.1.119

> 💡 **IHK-Tipp:** VLSM-Aufgaben sind die schwierigsten Subnetting-Aufgaben — IMMER mit der größten Abteilung anfangen!

## 🏋️ IHK Subnetting-Trainer

Hier kannst du gezielt für die IHK-Prüfung üben — mit VLSM-Szenarien, geführten Aufgaben und Zeitdruck!

[INTERACTIVE:subnettingTrainer]

> Jetzt kennst du VLSM und kannst verschieden große Subnetze aufteilen. In der nächsten Lektion schauen wir uns IPv6 an — das Nachfolgeprotokoll von IPv4 mit 128 Bit Adressraum.`,
    },
    {
      id: "netz-8",
      title: "IPv6",
      duration: "12 min",
      type: "text",
      content: `> In der letzten Lektion haben wir VLSM kennengelernt und gelernt, wie man IPv4-Netzwerke effizient aufteilt. Jetzt schauen wir uns das Nachfolgeprotokoll an: IPv6 mit 128 Bit Adressraum — genug für jedes Gerät der Welt.

## Warum IPv6?
IPv4 hat nur ~4,3 Mrd. Adressen (2^32) — **zu wenig!**
IPv6: 2^128 ≈ 3,4 × 10^38 Adressen — genug für jedes Gerät.

## Aufbau
- **128 Bit**, in 8 Gruppen à 16 Bit
- Hexadezimal mit Doppelpunkten: \`2001:0db8:85a3:0000:0000:8a2e:0370:7334\`

## Vereinfachung
1. **Führende Nullen** weglassen: \`0db8\` → \`db8\`
2. **Aufeinanderfolgende 0-Gruppen** durch \`::\` ersetzen (nur EINMAL!)

Beispiel: \`2001:0db8:0000:0000:0000:0000:0000:0001\` → \`2001:db8::1\`

## Wichtige Adresstypen

| Typ | Präfix | Zweck |
|-----|--------|-------|
| Loopback | ::1 | Eigener Host (= 127.0.0.1) |
| Link-Local | fe80::/10 | Nur lokales Netzwerk |
| Global Unicast | 2000::/3 | Öffentlich, routbar |
| Multicast | ff00::/8 | Gruppenadresse |

## Übergangsmechanismen
- **Dual Stack**: IPv4 + IPv6 parallel auf einem Host
- **Tunneling**: IPv6 in IPv4 verpacken (6to4, Teredo)
- **NAT64**: IPv6 ↔ IPv4 übersetzen

> 💡 **IHK-Tipp:** IPv6-Adressen können lang sein — die Vereinfachungsregeln kennen!

> Jetzt kennst du IPv4 und IPv6. In der nächsten Lektion widmen wir uns den Netzwerkgeräten — von Hubs und Switches bis zu Routern und Firewalls.`,
    },
    {
      id: "netz-9",
      title: "Netzwerkgeräte",
      duration: "12 min",
      type: "interactive",
      interactive: "networkBuilder",
      content: `> In der letzten Lektion haben wir IPv6 kennengelernt — das Protokoll mit dem riesigen Adressraum. Jetzt schauen wir uns die physischen Geräte an, die ein Netzwerk aufbauen: Hubs, Switches, Router und Firewalls.

## Die wichtigsten Geräte

| Gerät | Schicht | Aufgabe |
|-------|---------|---------|
| **Hub** | 1 (Physik) | Sendet an ALLE Ports — veraltet! |
| **Repeater** | 1 (Physik) | Signal verstärken |
| **Bridge** | 2 (Sicherung) | Trennt Kollisionsdomänen (wenige Ports) |
| **Switch** | 2 (Sicherung) | Lernt MAC-Adressen, sendet zielgerichtet |
| **Router** | 3 (Netzwerk) | Verbindet Netzwerke, IP-basiert |
| **Firewall** | 3-7 | Filtert Traffic nach Regeln |
| **Access Point** | 2 (Sicherung) | WLAN ↔ Kabel |

## Hub vs. Switch

| | Hub | Switch |
|---|-----|--------|
| Verhalten | Sendet an alle Ports | Sendet nur an Zielport |
| Intelligenz | Dumm | Lernt MAC-Adressen (CAM-Tabelle) |
| Kollisionen | Viele | Jeder Port eigene Kollisionsdomäne |
| Heute | Veraltet | Standard |

## Kollisions- vs. Broadcast-Domäne
- **Kollisionsdomäne**: Bereich in dem Pakete kollidieren können (Switch trennt diese)
- **Broadcast-Domäne**: Bereich in dem Broadcasts ankommen (Router trennt diese)

> 💡 **IHK-Tipp:** Merke: Switch = Schicht 2 = MAC, Router = Schicht 3 = IP. Das kommt IMMER dran!

## 🔧 Netzwerk bauen

[INTERACTIVE]

> 💡 Der Netzwerk-Builder zeigt dir, wie Geräte zusammenhängen — baue dein eigenes Netzwerk!

> Jetzt kennst du die Netzwerkgeräte und ihre Schichten. In der nächsten Lektion lernst du die verschiedenen Netzwerktopologien kennen — von Bus über Stern bis Mesh.`,
    },
    {
      id: "netz-10",
      title: "Netzwerktopologien",
      duration: "10 min",
      type: "text",
      content: `> In der letzten Lektion haben wir die Netzwerkgeräte kennengelernt — von Switches bis zu Routern. Jetzt schauen wir uns an, wie diese Geräte physisch miteinander verbunden werden: die Netzwerktopologien.

## Die 5 Grundtopologien

| Topologie | Beschreibung | Vor- | Nachteile |
|-----------|-------------|------|-----------|
| **Bus** | Alle an einem Kabel | Einfach, billig | Kollisionen, Kabelbruch = alles down |
| **Ring** | Jeder mit 2 Nachbarn | Gleichmäßige Last | Ein Ausfall = alles down |
| **Stern** | Alle an zentralen Switch | Einzelausfall kein Problem, einfach | Switch = SPoF |
| **Mesh** | Jeder mit jedem | Sehr redundant | Teuer, komplex |
| **Baum** | Hierarchische Sterne | Skalierbar | Abhängig von oberem Switch |

## Der heutige Standard: Stern-Topologie
- Alle Geräte an einem **Switch** angeschlossen
- Einzelner Geräteausfall beeinflusst nicht das Netzwerk
- Einfach zu erweitern (neuen Port nutzen)

## Single Point of Failure (SPoF)
Ein Knoten dessen Ausfall **alles lahmlegt**:
- Zentraler Switch
- Internet-Gateway
- DNS-Server

**Gegenmaßnahme:** Redundanz — Backup-Geräte, mehrere Pfade.

> 💡 **IHK-Tipp:** In der Prüfung nach SPoFs fragen — immer an Redundanz denken!

> Jetzt kennst du die Netzwerktopologien und das SPoF-Konzept. In der nächsten Lektion lernst du die wichtigsten Netzwerkprotokolle kennen — DNS, DHCP, ARP, HTTP und E-Mail-Protokolle.`,
    },
    {
      id: "netz-11",
      title: "Wichtige Netzwerkprotokolle",
      duration: "18 min",
      type: "interactive",
      interactive: "dnsLookup",
      content: `> In der letzten Lektion haben wir Netzwerktopologien kennengelernt — von Bus über Stern bis Mesh. Jetzt schauen wir uns die Protokolle an, die den Netzwerkverkehr organisieren: DNS, DHCP, ARP, HTTP und E-Mail-Protokolle.

## DNS — Domain Name System
Übersetzt **Domainnamen → IP-Adressen**.
Ablauf: Client → Resolver → Root → TLD → Autoritativer Server

Wichtige Records: **A** (IPv4), **AAAA** (IPv6), **MX** (Mail), **CNAME** (Alias), **NS** (Nameserver)

## DHCP — Dynamic Host Configuration Protocol
Vergibt **IP-Adressen automatisch**.
DORA: **D**iscover → **O**ffer → **R**equest → **A**cknowledge

## ARP — Address Resolution Protocol
Findet **MAC-Adresse zu einer IP**.
Request (Broadcast): "Wer hat 192.168.1.1?" → Reply (Unicast): "Ich! MAC: AA:BB:CC:DD:EE:FF"

## HTTP vs. HTTPS
- **HTTP** (Port 80): Unverschlüsselt
- **HTTPS** (Port 443): Verschlüsselt via **TLS**

## E-Mail-Protokolle
- **SMTP** (25/587): Senden
- **IMAP** (143/993): Empfangen, bleibt auf Server ✅
- **POP3** (110/995): Empfangen, downloadet & löscht

## SSH vs. Telnet
- **SSH** (22): Verschlüsselt ✅
- **Telnet** (23): Unverschlüsselt ❌

> 💡 **IHK-Tipp:** IMMER HTTPS, IMAP und SSH empfehlen — Sicherheit wird in der Prüfung großgeschrieben!

## 🔍 DNS-Lookup

[INTERACTIVE]

## 📡 DHCP — DORA-Prozess

[INTERACTIVE]

> 💡 Der DNS-Lookup zeigt dir die Auflösung Schritt für Schritt. Der DHCP-Explorer zeigt den DORA-Prozess live!

## 🌐 HTTP-Request live

[INTERACTIVE]

## 📧 E-Mail verschicken

[INTERACTIVE]

> 💡 Der HTTP-Request zeigt dir Headers und Status-Codes live. Die Mail-Reise zeigt den Weg einer E-Mail!

> Jetzt kennst du die wichtigsten Netzwerkprotokolle. In der nächsten Lektion widmen wir uns WLAN — den IEEE 802.11-Standards, Frequenzen und der WLAN-Sicherheit.`,
    },
    {
      id: "netz-12",
      title: "WLAN",
      duration: "12 min",
      type: "interactive",
      interactive: "wlanConfigurator",
      content: `> In der letzten Lektion haben wir die wichtigsten Netzwerkprotokolle kennengelernt — von DNS über DHCP bis zu HTTP. Jetzt schauen wir uns WLAN an: die IEEE 802.11-Standards, die Unterschiede zwischen 2,4 GHz und 5 GHz, und warum WEP veraltet ist.

## IEEE 802.11 Standards

| Standard | Jahr | Max. Speed | Frequenz | Besonderheit |
|----------|------|------------|----------|--------------|
| 802.11b | 1999 | 11 Mbit/s | 2,4 GHz | Erster verbreiteter |
| 802.11a | 1999 | 54 Mbit/s | 5 GHz | Kurz danach |
| 802.11g | 2003 | 54 Mbit/s | 2,4 GHz | Kompatibel mit b |
| 802.11n (Wi-Fi 4) | 2009 | 600 Mbit/s | 2,4+5 GHz | MIMO |
| 802.11ac (Wi-Fi 5) | 2013 | 1 Gbit/s | 5 GHz | MU-MIMO |
| 802.11ax (Wi-Fi 6) | 2019 | 9,6 Gbit/s | 2,4+5 GHz | OFDMA |

## 2,4 GHz vs. 5 GHz

| | 2,4 GHz | 5 GHz |
|---|---------|-------|
| Reichweite | ✅ Weiter | ❌ Kürzer |
| Störung | ❌ Mehr (Mikrowelle) | ✅ Weniger |
| Kanäle | 3 nicht überlappend | Bis zu 25 |
| Speed | Langsamer | Schneller |

## WLAN-Sicherheit

| Standard | Sicherheit | Status |
|----------|------------|--------|
| WEP | RC4, leicht knackbar | ❌ VERALTET |
| WPA | TKIP, besser | ⚠️ Schwächen |
| WPA2 | AES-CCMP | ✅ Aktuell |
| WPA3 | SAE | 🔒 Best Practice |

**WPA2-Personal (PSK):** Ein gemeinsames Passwort — für Heimnetzwerke.
**WPA2-Enterprise (802.1X):** Individuelle Anmeldung via RADIUS — für Unternehmen.

> 💡 **IHK-Tipp:** WEP ist UNSICHER — in der Prüfung immer mindestens WPA2 empfehlen!

## 📶 WLAN konfigurieren

[INTERACTIVE]

> 💡 Der WLAN-Konfigurator zeigt dir, welche Einstellungen sicher sind — experimentiere mit Sicherheitsstandards!

> Jetzt kennst du WLAN-Standards und Sicherheitsprotokolle. In der nächsten Lektion lernst du Netzwerksicherheit kennen — VLANs, VPNs, Firewalls und DMZ.`,
    },
    {
      id: "netz-13",
      title: "Netzwerksicherheit",
      duration: "15 min",
      type: "interactive",
      interactive: "firewallRuleBuilder",
      content: `> In der letzten Lektion haben wir WLAN kennengelernt — von den 802.11-Standards bis zu WPA2 und WPA3. Jetzt widmen wir uns der Netzwerksicherheit: VLANs, VPNs, Firewalls und DMZ — alles Themen, die in der IHK-Prüfung regelmäßig drankommen.

## VLAN — Virtual Local Area Network
Logische Trennung eines physischen Switches in separate **Broadcast-Domänen**.
- Sicherheit: Abteilungen getrennt
- Performance: Weniger Broadcast-Traffic
- Flexibilität: Kein Umverkabeln

## VPN — Virtual Private Network
Verschlüsselter Tunnel durch öffentliche Netzwerke.
- **Site-to-Site**: Standort ↔ Standort
- **Remote Access**: Client ins Firmennetzwerk
- **Protokolle**: IPSec, SSL/TLS, WireGuard

## DMZ — Demilitarisierte Zone
Pufferzone zwischen Internet und internem Netz.
Enthält öffentliche Server (Web, Mail) — durch **2 Firewalls** geschützt.

## Firewall-Typen
- **Stateless**: Prüft jedes Paket einzeln (Regeln)
- **Stateful**: Merkt sich Verbindungsstatus (State Table) — sicherer

## IDS vs. IPS
- **IDS** (Intrusion Detection): Erkennt Angriffe, meldet sie (passiv)
- **IPS** (Intrusion Prevention): Erkennt UND blockiert (aktiv)

## Port-Security
Switch-Begrenzung der MAC-Adressen pro Port.
Schützt gegen: MAC-Flooding, unautorisierte Geräte.

> 💡 **IHK-Tipp:** VLAN, VPN und Firewall sind DIE Sicherheitsthemen — immer mit konkreten Beispielen erklären!

## 🔥 Firewall-Regeln bauen

[INTERACTIVE]

> 💡 Der Firewall-Regel-Builder zeigt dir, wie Regeln Pakete filtern — baue eigene Regeln und teste Pakete!

## 🔒 VPN-Tunnel

[INTERACTIVE]

> 💡 Der VPN-Tunnel-Visualizer zeigt dir, wie ein verschlossener Tunnel aufgebaut wird — mit Site-to-Site und Remote Access!

> Jetzt kennst du die wichtigsten Sicherheitskonzepte. In der nächsten Lektion schauen wir uns die physischen Übertragungsmedien an — Kupferkabel und Glasfaser.`,
    },
    {
      id: "netz-14",
      title: "Kabel & Übertragungsmedien",
      duration: "10 min",
      type: "interactive",
      interactive: "cableComparer",
      content: `> In der letzten Lektion haben wir Netzwerksicherheit kennengelernt — VLANs, VPNs, Firewalls und DMZ. Jetzt schauen wir uns die physische Seite an: Welche Kabel und Übertragungsmedien verbinden die Geräte miteinander?

## Kupfer: Twisted Pair

| Kategorie | Speed | Reichweite | Einsatz |
|-----------|-------|------------|---------|
| Cat 5 | 100 Mbit/s | 100m | Fast Ethernet |
| Cat 5e | 1 Gbit/s | 100m | Gigabit Ethernet |
| Cat 6 | 1-10 Gbit/s | 55-100m | Modernes LAN |
| Cat 6a | 10 Gbit/s | 100m | Standard heute |
| Cat 7 | 10 Gbit/s | 100m | Geschirmt (S/FTP) |
| Cat 8 | 25/40 Gbit/s | 30m | Rechenzentren |

**UTP** (Unshielded): Ungeschirmt, für Büros
**STP** (Shielded): Geschirmt, gegen EMI, für Industrie

## Glasfaser

| Typ | Kern | Reichweite | Kosten |
|-----|------|------------|--------|
| **Multimode** | 50/62,5 µm | ~2km | Günstiger |
| **Singlemode** | 9 µm | ~100km+ | Teurer |

Vorteile: Keine EMI, hohe Bandbreite, lange Strecken

## Kupfer vs. Glasfaser

| | Kupfer | Glasfaser |
|---|--------|-----------|
| Preis | ✅ Günstig | ❌ Teuer |
| EMI | ❌ Anfällig | ✅ Immun |
| Bandbreite | Begrenzt | Sehr hoch |
| Reichweite | 100m | 100km+ |
| Installation | ✅ Einfach | ❌ Spezialwerkzeug |

> 💡 **IHK-Tipp:** 100m Segmentlänge bei Kupfer IMMER im Kopf haben!

## 🔌 Kabel vergleichen

[INTERACTIVE]

> 💡 Der Kabel-Vergleich zeigt dir alle Eigenschaften auf einen Blick — wähle Kabel zum Vergleich aus!

> Jetzt kennst du die Übertragungsmedien. In der nächsten Lektion lernst du die wichtigsten Netzwerk-Tools und Befehle kennen — von ping und traceroute bis zu Wireshark.`,
    },
    {
      id: "netz-15",
      title: "Netzwerk-Tools & Befehle",
      duration: "12 min",
      type: "text",
      content: `> In der letzten Lektion haben wir Kabel und Übertragungsmedien kennengelernt — von Kupfer bis Glasfaser. Jetzt wird es praktisch: Du lernst die wichtigsten Netzwerk-Tools und Befehle kennen, mit denen du Netzwerke testen, analysieren und Fehler finden kannst.

## ping (ICMP)
Prüft **Erreichbarkeit** eines Hosts.
\`\`\`
ping 192.168.1.1
→ Antwort: Zeit=1ms TTL=64
\`\`\`
Zeigt: RTT (Round-Trip-Time), Paketverlust

## traceroute / tracert
Zeigt den **Weg zum Ziel** (Hop-by-Hop).
\`\`\`
traceroute google.com
→ 1  192.168.1.1  1ms
→ 2  10.0.0.1  5ms
→ ...
\`\`\`

## ipconfig (Windows) / ip addr (Linux)
Zeigt **Netzwerkkonfiguration**.
\`\`\`
ipconfig /all         → Alles anzeigen
ipconfig /release     → IP freigeben (DHCP)
ipconfig /renew       → Neue IP anfordern
ipconfig /displaydns  → DNS-Cache
\`\`\`

## nslookup / dig
**DNS-Abfrage** durchführen.
\`\`\`
nslookup example.com  → IP-Adresse
nslookup -type=MX example.com → Mailserver
\`\`\`

## netstat
Zeigt **aktive Verbindungen** und offene Ports.
\`\`\`
netstat -an  → Alle Verbindungen mit Portnummern
\`\`\`

## Wireshark
**Netzwerk-Sniffer**: Zeichnet alle Pakete auf.
- Capture: Alle Pakete aufzeichnen
- Filter: Nach IP, Protokoll, Port
- Analyse: Protokoll-Details

> 💡 **IHK-Tipp:** Wireshark als Diagnosewerkzeug nennen können!

> Jetzt kennst du die wichtigsten Netzwerk-Tools. In der nächsten Lektion lernst du MAC-Adressen und das ARP-Protokoll kennen — wie Geräte im lokalen Netzwerk einander finden.`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 16: MAC-Adressen & ARP
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "netz-16",
      title: "MAC-Adressen & ARP",
      duration: "15 min",
      type: "interactive",
      interactive: "arpExplorer",
      content: `> In der letzten Lektion haben wir die wichtigsten Netzwerk-Tools kennengelernt — von ping bis Wireshark. Jetzt schauen wir uns die MAC-Adressen und das ARP-Protokoll an — damit findet ein Gerät die MAC-Adresse eines anderen im lokalen Netzwerk.

## Was ist eine MAC-Adresse?

Die MAC-Adresse (Media Access Control) ist die **hardwarenahe Adresse** eines Netzwerkgeräts. Sie ist weltweit eindeutig und fest in die Netzwerkkarte eingebrannt.

### Aufbau
- **48 Bit** (6 Bytes), dargestellt als 12 Hexadezimalziffern
- Beispiel: AA:BB:CC:11:22:33
- Erste 3 Bytes: **OUI** (Herstellerkennung, z.B. Intel, Cisco)
- Letzte 3 Bytes: **Gerätenummer** (vom Hersteller vergeben)

> Merksatz: MAC = **M**edia **A**ccess **C**ontrol — steuert den Zugriff auf das Medium (Kabel/WLAN).

### MAC vs. IP
| Merkmal | MAC-Adresse | IP-Adresse |
|---------|-------------|------------|
| **Schicht** | Schicht 2 (Sicherung) | Schicht 3 (Netzwerk) |
| **Vergeben von** | Hersteller (fest) | Netzwerk (dynamisch) |
| **Änderbar** | Hardware-seitig fest | DHCP oder manuell |
| **Reichweite** | Lokales Netz (LAN) | Weltweit (Internet) |
| **Format** | AA:BB:CC:11:22:33 | 192.168.1.1 |

## ARP — Address Resolution Protocol

Wenn ein Gerät ein Paket im lokalen Netzwerk senden will, kennt es nur die **IP-Adresse** des Ziels. Aber Ethernet braucht die **MAC-Adresse**. Hier kommt ARP ins Spiel:

### ARP-Ablauf
1. **Broadcast**: "Wer hat die IP 192.168.1.20? Sagt mir eure MAC!"
2. **Reply**: Das Gerät mit dieser IP antwortet: "Ich bin AA:BB:CC:11:22:33"
3. **ARP-Tabelle**: Die Zuordnung wird zwischengespeichert (Cache)

> 💡 **IHK-Tipp:** "Erklären Sie den ARP-Prozess" — Broadcast → Reply → Tabelle!

### ARP im OSI-Modell
ARP arbeitet **zwischen Schicht 2 und Schicht 3** — es übersetzt IP-Adressen (Schicht 3) in MAC-Adressen (Schicht 2).

> Praxis: Mit dem Befehl \`arp -a\` (Windows/Linux) kannst du die ARP-Tabelle anzeigen. Sie zeigt alle bekannten IP-MAC-Zuordnungen.

### ARP-Sicherheitsproblem: ARP-Spoofing
- Angreifer sendet gefälschte ARP-Replies
- Opfer denkt, der Angreifer sei der Router
- **Man-in-the-Middle-Angriff** möglich
- **Gegenmaßnahme**: Dynamic ARP Inspection (DAI) auf Managed Switches

> 💡 **IHK-Tipp:** ARP-Spoofing als Sicherheitsrisiko kennen!

[INTERACTIVE]

> Jetzt kennst du MAC-Adressen und den ARP-Prozess. In der nächsten Lektion lernst du die Zugriffsverfahren kennen — CSMA/CD für Ethernet und CSMA/CA für WLAN.
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 17: Zugriffsverfahren (CSMA/CD & CSMA/CA)
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "netz-17",
      title: "Zugriffsverfahren: CSMA/CD & CSMA/CA",
      duration: "12 min",
      type: "text",
      content: `> In der letzten Lektion haben wir MAC-Adressen und das ARP-Protokoll kennengelernt. Jetzt schauen wir uns die Zugriffsverfahren an — die Regeln, die bestimmen, wer wann auf das Netzwerkmedium senden darf: CSMA/CD für Ethernet und CSMA/CA für WLAN.

## Warum Zugriffsverfahren?

Wenn mehrere Geräte dasselben Medium teilen (Kabel, Funk), braucht es Regeln, wer wann senden darf. Sonst gibt es Kollisionen.

## CSMA/CD — Ethernet (Kabel)

**Carrier Sense Multiple Access with Collision Detection** — das klassische Ethernet-Verfahren:

### Ablauf
1. **Carrier Sense**: Hört das Medium frei?
2. **Multiple Access**: Mehrere Geräte dürfen senden
3. **Senden**: Wenn frei → senden
4. **Collision Detection**: Gleichzeitig gesendet? → **Kollision erkannt!**
5. **Jam Signal**: Alle Geräte benachrichtigen
6. **Zufällige Wartezeit**: Beide warten zufällig lang, dann erneut versuchen

> Merksatz: **Hören → Senden → Kollision? → Jam → Warten → Erneut**

### Kollisionsdomäne
- Alle Geräte, die eine Kollision miteinander haben können
- **Hub**: Vergrößert Kollisionsdomäne (alle Ports)
- **Switch**: Trennt Kollisionsdomäne (jeder Port eigene Domäne)

> 💡 **IHK-Tipp:** "Was trennt Kollisionsdomänen?" → Switch!

## CSMA/CA — WLAN (Funk)

**Carrier Sense Multiple Access with Collision Avoidance** — das WLAN-Verfahren:

### Warum nicht CSMA/CD bei WLAN?
- WLAN kann nicht gleichzeitig senden und hören (Halbduplex)
- Kollisionen sind nicht erkennbar → müssen **vermieden** werden

### Ablauf
1. **Carrier Sense**: Hört das Medium frei?
2. **IFS** (Interframe Space): Kurze Wartezeit
3. **RTS** (Request to Send): "Ich möchte senden"
4. **CTS** (Clear to Send): "OK, du darfst senden"
5. **Senden**: Datenübertragung
6. **ACK** (Acknowledge): "Empfangen!"

> Merksatz: **Hören → Warten → RTS → CTS → Senden → ACK**

### CSMA/CD vs. CSMA/CA
| Merkmal | CSMA/CD | CSMA/CA |
|---------|---------|---------|
| **Medium** | Kabel (Ethernet) | Funk (WLAN) |
| **Kollision** | Erkennen + lösen | Vermeiden |
| **Duplex** | Vollduplex möglich | Halbduplex |
| **Verfahren** | Jam Signal + Backoff | RTS/CTS + ACK |
| **Standard** | IEEE 802.3 | IEEE 802.11 |

> 💡 **IHK-Tipp:** "Warum verwendet WLAN CSMA/CA statt CSMA/CD?" — Weil WLAN nicht gleichzeitig senden und hören kann!

## Switch vs. Hub — Kollisionsdomänen

| Gerät | Schicht | Kollisionsdomäne | Broadcast-Domäne |
|-------|---------|-----------------|-----------------|
| **Hub** | 1 (Physisch) | 1 für alle Ports | 1 für alle Ports |
| **Switch** | 2 (Sicherung) | Pro Port 1 | 1 für alle Ports |
| **Router** | 3 (Netzwerk) | Pro Port 1 | Pro Port 1 |

> Praxis: Ein 24-Port-Switch hat 24 Kollisionsdomänen (je 1 pro Port) aber nur 1 Broadcast-Domäne. Ein Router trennt auch Broadcast-Domänen.

> Häufige Fehler: "Ein Switch trennt Broadcast-Domänen" — Falsch! Ein Switch trennt nur Kollisionsdomänen. Broadcast-Domänen trennt nur ein Router (oder VLAN).

> Jetzt kennst du CSMA/CD und CSMA/CA. In der letzten Lektion schauen wir uns die verschiedenen Internetzugangstechnologien an — von DSL über Mobilfunk bis hin zu Glasfaser.
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 18: Internetzugang: DSL & Mobilfunk
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "netz-18",
      title: "Internetzugang: DSL & Mobilfunk",
      duration: "15 min",
      type: "text",
      content: `> In der letzten Lektion haben wir die Zugriffsverfahren CSMA/CD und CSMA/CA kennengelernt. Jetzt schauen wir uns die letzte große Thematik an: die verschiedenen Internetzugangstechnologien — von DSL über Mobilfunk bis hin zu Glasfaser.

## DSL — Digital Subscriber Line

DSL nutzt die bestehende Telefonleitung für schnelles Internet.

### DSL-Typen
| Typ | Geschwindigkeit | Richtung | Leitung |
|-----|----------------|----------|---------|
| **ADSL** | Down: 16 Mbit/s, Up: 1 Mbit/s | Asymmetrisch | Kupfer |
| **ADSL2+** | Down: 25 Mbit/s, Up: 3,5 Mbit/s | Asymmetrisch | Kupfer |
| **VDSL** | Down: 50 Mbit/s, Up: 10 Mbit/s | Asymmetrisch | Kupfer |
| **VDSL2** | Down: 100-250 Mbit/s, Up: 40-100 Mbit/s | Asymmetrisch | Kupfer + Glasfaser |
| **SDSL** | 2 Mbit/s (symmetrisch) | Symmetrisch | Kupfer |

### DSL-Aufbau
1. **TAE-Dose**: Telefonanschluss in der Wohnung
2. **Splitter**: Trennt Sprache (Telefon) und Daten (Internet)
3. **DSL-Modem/Router**: Wandelt DSL-Signal in Ethernet um
4. **DSLAM** (im Keller/Vermittlungsstelle): Sammelt alle DSL-Verbindungen

### PPPoE — Point-to-Point Protocol over Ethernet
- Authentifizierung gegenüber dem Provider
- Username + Passwort werden übertragen
- IP-Adresse wird vom Provider zugewiesen

> 💡 **IHK-Tipp:** "Was macht ein Splitter?" — Trennt Sprache und Daten auf der Telefonleitung!

## Mobilfunkstandards

| Generation | Standard | Geschwindigkeit | Technologie |
|-----------|---------|----------------|------------|
| **2G** | GSM | 9,6 Kbit/s | Sprache + SMS |
| **2,5G** | GPRS | 114 Kbit/s | Paketvermittlung |
| **2,75G** | EDGE | 384 Kbit/s | Verbessertes GPRS |
| **3G** | UMTS | 2 Mbit/s | Breitband mobil |
| **3,5G** | HSPA | 14,4 Mbit/s | Hochgeschwindigkeit |
| **4G** | LTE | 150 Mbit/s | All-IP |
| **4G+** | LTE-Advanced | 1 Gbit/s | Carrier Aggregation |
| **5G** | NR | 10 Gbit/s | Ultra-low-latency |

> Merksatz: **2G** = SMS, **3G** = Internet, **4G** = Streaming, **5G** = Echtzeit

### Tethering
- Handy als WLAN-Hotspot für andere Geräte
- Internetverbindung wird über USB, WLAN oder Bluetooth geteilt
- Praktisch unterwegs, aber Akku-Verbrauch!

## Glasfaser — Die Zukunft

| Typ | Geschwindigkeit | Distanz | Einsatz |
|-----|----------------|---------|---------|
| **FTTH** (Fiber to the Home) | Bis 10 Gbit/s | Bis 20 km | Direkt ins Haus |
| **FTTB** (Fiber to the Building) | Bis 1 Gbit/s | Bis 20 km | Bis zum Gebäude |
| **FTTC** (Fiber to the Curb) | Bis 100 Mbit/s | Letzte Meile Kupfer | Bis zum Verteiler |

> Praxis: Glasfaser nutzt Licht statt Strom → kein Signalverlust über große Distanzen, extrem hohe Bandbreite, aber teurer in der Installation.

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen FTTH und FTTB?" — FTTH: Glasfaser bis ins Haus. FTTB: Glasfaser bis zum Gebäude, dann Kupfer.

> Häufige Fehler: "ADSL ist schneller als VDSL" — Falsch! VDSL ist schneller als ADSL, braucht aber kürzere Leitungen.
`,
    },
  ],
};
