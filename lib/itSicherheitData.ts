import { Module } from "./types";

// ============================================================================
// IHK "IT-Sicherheit" — Modul-Daten
// Quelle: IHK AP1/AP2, OWASP, BSI IT-Grundschutz
// ============================================================================

export const itSicherheitModule: Module = {
  id: "ihk-it-sicherheit",
  slug: "ihk-it-sicherheit",
  title: "IT-Sicherheit",
  description:
    "IHK AP1/AP2: Netzwerksicherheit, Web-Security, Verschlüsselung, Social Engineering, OWASP Top 10",
  icon: "🔒",
  color: "#EF4444",
  category: "ihk",
  progress: 0,

  merkblatt: `## 📋 Merkblatt: IT-Sicherheit (IHK)

### CIA-Triade (Grundpfeiler)
- **C**onfidentiality (Vertraulichkeit) — nur Befugte haben Zugriff
- **I**ntegrity (Integrität) — Daten sind unverändert/korrekt
- **A**vailability (Verfügbarkeit) — Systeme sind stets nutzbar

### Authentifizierung vs. Autorisierung
- **Authentifizierung:** Identitätsnachweis (Passwort, Biometrie, Token)
- **Autorisierung:** Berechtigungsprüfung (Was darf die Person?)
- **Multi-Faktor (MFA):** Kombination aus Wissen, Besitz, Biometrie

### Verschlüsselung
| Typ | Beispiel | Key | Einsatz |
|-----|----------|-----|---------|
| Symmetrisch | AES-256 | 1 gemeinsamer Key | Datenverschlüsselung |
| Asymmetrisch | RSA | Public + Private Key | Key-Austausch, Signaturen |
| Hashing | SHA-256 | kein Key (einweg) | Passwörter, Integrität |
- **Salting:** Zufälliger Wert vor dem Hash → schützt gegen Rainbow Tables
- **Digitale Signatur:** Hash wird mit Private Key verschlüsselt → Authentizität + Integrität

### OWASP Top 10 (Web-Sicherheitsrisiken)
1. **Broken Access Control** — fehlende Zugriffskontrolle
2. **Cryptographic Failures** — schwache Verschlüsselung
3. **Injection** — SQL, NoSQL, OS Command Injection
4. **Insecure Design** — unsichere Architektur
5. **Security Misconfiguration** — Default-Passwörter, offene Ports
6. **Vulnerable Components** — veraltete Bibliotheken
7. **Authentication Failures** — schwache Auth-Mechanismen
8. **Data Integrity Failures** — ungesicherte Updates/CI/CD
9. **Logging Failures** — fehlendes Monitoring
10. **SSRF** — Server-Side Request Forgery

### Angriffsarten
- **SQL-Injection:** SQL-Code über Eingabefelder einschleusen → Prepared Statements!
- **XSS (Cross-Site Scripting):** JavaScript in Webseiten einschleusen → Output Encoding!
- **CSRF:** Aktionen im Namen des Opfers ausführen → CSRF Tokens!
- **MITM:** Kommunikation abhören/manipulieren → TLS/SSL!
- **DDoS:** Server mit Anfragen überlasten → Rate Limiting, CDN!
- **Phishing/Tailgating:** Social Engineering → Schulung!

### Netzwerksicherheit
- **Firewall:** Filtert Verkehr nach Regeln (Ports, IPs, Protokolle)
- **IDS:** Intrusion Detection System — erkennt Angriffe (warnt)
- **IPS:** Intrusion Prevention System — erkennt + blockiert automatisch
- **VPN:** Verschlüsselter Tunnel durchs Internet (IPSec, OpenVPN, WireGuard)
- **DMZ:** Demilitarisierte Zone — Puffer zwischen Internet und internem Netz

### Schutzkonzepte
- **Defense in Depth:** Mehrere Sicherheitsschichten
- **Least Privilege:** Minimale Berechtigungen vergeben
- **Separation of Duties:** Aufgaben trennen (kein Einzelner hat alle Rechte)
- **3-2-1 Backup:** 3 Kopien, 2 Medien, 1 extern
- **BSI IT-Grundschutz:** Standardisierte Schutzmaßnahmen

### Social Engineering
| Methode | Beschreibung |
|---------|-------------|
| Phishing | Gefälschte E-Mails/Webseiten |
| Spear-Phishing | Zielgerichtet auf bestimmte Person |
| Pretexting | Fake-Identität/Vorwand am Telefon |
| Baiting | Lockmittel (USB-Stick, Datei) |
| Tailgating | Hinter jemandem durch Tür gehen`,

  lessons: [
    {
      id: "sec-1",
      title: "Sicherheitsgrundlagen",
      duration: "15 min",
      type: "interactive",
      interactive: "securityThreatExplorer" as const,
      content: `## Sicherheitsgrundlagen

> In diesem Modul lernst du die Grundlagen der IT-Sicherheit kennen — von der CIA-Triade über Verschlüsselung bis zu Netzwerksicherheit und Rechteverwaltung. Sicherheit ist in der IHK-Prüfung ein Dauerthema und durchzieht alle anderen Fachgebiete!

> Netzwerk-Protokolle und Ports, die hier immer wieder auftauchen, behandeln wir auch im Modul "Netzwerktechnik" — dort mit Fokus auf das OSI-Modell und die Schichten 1–7.

### Die CIA-Triade

Alle IT-Sicherheitsmaßnahmen zielen auf drei Grundziele ab:

| Ziel | Beschreibung |
|------|-------------|
| **Confidentiality** (Vertraulichkeit) | Nur autorisierte Personen haben Zugriff auf Daten und Systeme |
| **Integrity** (Integrität) | Daten sind korrekt und unverändert — niemand hat sie manipuliert |
| **Availability** (Verfügbarkeit) | Systeme und Daten sind zugänglich, wenn sie gebraucht werden |

> **Merke:** Jede Sicherheitsmaßnahme lässt sich einem oder mehreren dieser drei Ziele zuordnen!

### Bedrohungen & Angriffsvektoren

Ein **Angriffsvektor** ist der Weg, den ein Angreifer nutzt, um in ein System einzudringen:

| Kategorie | Beispiele |
|-----------|----------|
| 🔧 **Technisch** | Malware, Exploits, SQL-Injection, DDoS |
| 👤 **Menschlich** | Social Engineering, Phishing, Pretexting |
| 🏢 **Physisch** | Einbruch, Diebstahl, Tailgating |

[INTERACTIVE:securityThreatExplorer]

### Schutzmaßnahmen — Defense in Depth

Das Prinzip der **mehreren Sicherheitsschichten**:

1. **Physisch:** Zugangskontrollen, Serverräume
2. **Netzwerk:** Firewalls, IDS/IPS, VPN
3. **System:** Updates, Hardening, Antivirus
4. **Anwendung:** Input Validation, Secure Coding
5. **Daten:** Verschlüsselung, Backup
6. **Mensch:** Schulung, Awareness

> 💡 **IHK-Tipp:** Fragen zu Sicherheitszielen und Angriffsarten kommen häufig in AP1/AP2 vor!

> **Nächste Lektion:** Authentifizierung & Passwörter — Wir schauen uns an, wie man Identitäten nachweist und Passwörter sicher speichert.
`,
    },
    {
      id: "sec-2",
      title: "Authentifizierung & Passwörter",
      duration: "15 min",
      type: "interactive",
      interactive: "passwordStrengthChecker" as const,
      content: `## Authentifizierung & Passwörter

> In der letzten Lektion haben wir die CIA-Triade, Bedrohungsvektoren und Malware-Arten kennengelernt. Jetzt widmen wir uns der Frage: Wie weist man nach, wer man ist — und wie schützt man Passwörter richtig?

### Authentifizierung vs. Autorisierung

| Begriff | Frage | Bedeutung |
|---------|-------|----------|
| 🔐 **Authentifizierung** | "Wer bist du?" | Identitätsnachweis |
| 🛡️ **Autorisierung** | "Was darfst du?" | Berechtigungsprüfung |

> **Beispiel:** Du zeigst deinen Ausweis am Eingang (Authentifizierung). Dann entscheidet der Zutrittsausweis, welche Räume du betreten darfst (Autorisierung).

### Drei Faktoren der Authentifizierung

| Faktor | Beispiel | Schwäche |
|--------|---------|----------|
| **Wissen** (etwas das du weißt) | Passwort, PIN | Erraten, Phishing |
| **Besitz** (etwas das du hast) | Smartphone, Token, Smartcard | Diebstahl, Verlust |
| **Biometrie** (etwas das du bist) | Fingerabdruck, Iris, Gesicht | Kopierbar, änderbar |

**Multi-Faktor-Authentifizierung (MFA)** kombiniert mindestens 2 Faktoren — deutlich sicherer als nur Passwort!

### Passwortsicherheit

**Gute Passwörter:**

| Regel | Beschreibung |
|-------|-------------|
| 📏 **Länge** | Mindestens 12 Zeichen (besser 16+) |
| 🔤 **Mix** | Groß-/Kleinbuchstaben, Zahlen, Sonderzeichen |
| 🚫 **Keine Wörter** | Keine Wörter aus dem Wörterbuch |
| 🔑 **Einzigartig** | Für jeden Dienst ein anderes Passwort |

**Passwort-Hashing:**

Das Passwort wird NIEMALS im Klartext gespeichert, sondern als **Hash**:

\`\`\`text
Passwort: "Hallo123"
SHA-256: 5b722b307fce6c944905d132691d8e022b23bea0...
\`\`\`

**Salting** — Schutz gegen Rainbow-Table-Angriffe:
\`\`\`text
Passwort: "Hallo123" + Salt: "x7Kp9"
→ SHA-256("Hallo123x7Kp9"): a3f8c2... (anderer Hash!)
\`\`\`

[INTERACTIVE:passwordStrengthChecker]

### Passwort-Manager

**Warum Passwort-Manager?**

| Vorteil | Beschreibung |
|---------|-------------|
| 🧠 **Ein Passwort** | Du musst dir nur EIN Master-Passwort merken |
| 🔐 **Sichere Generierung** | Generiert sichere, einzigartige Passwörter |
| 🔒 **Verschlüsselt** | Speichert sie verschlüsselt |

> 💡 **IHK-Tipp:** Erkläre den Unterschied zwischen Hashing und Verschlüsselung — das kommt oft in Prüfungen!

> **Nächste Lektion:** Netzwerksicherheit — Firewalls, IDS/IPS, VPN und die wichtigsten Ports für die IHK-Prüfung.
`,
    },
    {
      id: "sec-3",
      title: "Netzwerksicherheit",
      duration: "15 min",
      type: "interactive",
      interactive: "firewallRuleBuilder" as const,
      content: `## Netzwerksicherheit

> In der letzten Lektion haben wir gelernt, wie man Identitäten nachweist und Passwörter sicher mit Hashing und Salting speichert. Jetzt schauen wir uns an, wie man Netzwerke mit Firewalls, VPNs und DMZs schützt.

### Firewall

Eine **Firewall** filtert den Netzwerkverkehr anhand definierter Regeln:

| Typ | Beschreibung |
|-----|-------------|
| 📦 **Packet Filtering** | Prüft Header (IP, Port, Protokoll) |
| 🔍 **Stateful Inspection** | Verfolgt Verbindungsstatus |
| 🌐 **Application Layer** | Prüft Anwendungsdaten (z.B. HTTP) |

**Regel-Beispiel:**
| Regel | Quelle | Ziel | Port | Aktion |
|-------|--------|------|------|--------|
| 1 | Intern | Webserver | 80/443 | Erlauben |
| 2 | Extern | Webserver | 22 | Blockieren |
| 3 | Alle | Alle | Sonst | Blockieren |

[INTERACTIVE:firewallRuleBuilder]

### IDS vs. IPS

| | IDS | IPS |
|-|-----|-----|
| **Volllform** | Intrusion Detection System | Intrusion Prevention System |
| **Aktion** | Erkennt + warnt | Erkennt + blockiert |
| **Position** | Parallel zum Verkehr | Inline im Verkehr |
| **Reaktion** | Alert/Log | Automatisch aktiv |

### VPN (Virtual Private Network)

Ein **VPN** erstellt einen verschlüsselten Tunnel durch das Internet:

| Aspekt | Beschreibung |
|--------|-------------|
| 🌐 **Nutzung** | Remote-Zugriff auf Firmennetz |
| 🔧 **Protokolle** | IPSec, OpenVPN, WireGuard |
| ✅ **Vorteil** | Daten sind auch in unsicheren Netzen (z.B. WLAN) geschützt |

### DMZ (Demilitarisierte Zone)

<svg viewBox="0 0 650 140" xmlns="http://www.w3.org/2000/svg" style="max-width:650px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="650" height="140" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Internet -->
  <rect x="15" y="35" width="90" height="70" rx="8" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444" stroke-width="1.5"/>
  <text x="60" y="65" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Internet</text>
  <text x="60" y="82" text-anchor="middle" fill="#64748b" font-size="10">🌍</text>
  <!-- Firewall 1 -->
  <polygon points="130,40 140,30 150,40 150,100 140,110 130,100" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="140" y="75" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">FW</text>
  <!-- DMZ -->
  <rect x="170" y="20" width="300" height="100" rx="8" fill="#f59e0b" fill-opacity="0.08" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="6,3"/>
  <text x="320" y="18" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">DMZ</text>
  <rect x="185" y="40" width="90" height="40" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
  <text x="230" y="65" text-anchor="middle" fill="#93c5fd" font-size="10">Webserver</text>
  <rect x="290" y="40" width="90" height="40" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
  <text x="335" y="65" text-anchor="middle" fill="#93c5fd" font-size="10">Mailserver</text>
  <rect x="395" y="40" width="60" height="40" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
  <text x="425" y="65" text-anchor="middle" fill="#93c5fd" font-size="10">DNS</text>
  <!-- Firewall 2 -->
  <polygon points="490,40 500,30 510,40 510,100 500,110 490,100" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="1.5"/>
  <text x="500" y="75" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">FW</text>
  <!-- Internes Netz -->
  <rect x="530" y="35" width="100" height="70" rx="8" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5"/>
  <text x="580" y="65" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Internes</text>
  <text x="580" y="82" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Netz</text>
  <text x="580" y="96" text-anchor="middle" fill="#64748b" font-size="10">🏢</text>
</svg>

Die DMZ ist ein Pufferbereich — öffentliche Server stehen hier, das interne Netz bleibt geschützt.

### Wichtige Ports (IHK!)

| Port | Dienst | Verschlüsselt? |
|------|--------|---------------|
| 20/21 | FTP | ❌ (unsicher) |
| 22 | SSH | ✅ |
| 25 | SMTP | ❌ / ✅ (STARTTLS) |
| 80 | HTTP | ❌ |
| 443 | HTTPS | ✅ |
| 3306 | MySQL | ❌ |

> **Merke:** Port 443 = HTTPS, Port 80 = HTTP, Port 22 = SSH — die drei wichtigsten!

> **Nächste Lektion:** Web-Security (OWASP Top 10) — SQL-Injection, XSS und CSRF: Die häufigsten Angriffe auf Webanwendungen.
`,
    },
    {
      id: "sec-4",
      title: "Web-Security (OWASP Top 10)",
      duration: "20 min",
      type: "interactive",
      interactive: "sqlInjectionSimulator" as const,
      content: `## Web-Security — OWASP Top 10

> In der letzten Lektion haben wir Netzwerksicherheit mit Firewalls, IDS/IPS und VPN kennengelernt. Jetzt steigen wir eine Schicht tiefer: Wie werden Webanwendungen angegriffen — und wie schützt man sich?

Die **OWASP Top 10** sind die kritischsten Web-Sicherheitsrisiken. In der IHK-Prüfung werden oft Szenarien zu SQL-Injection und XSS abgefragt.

### 1. SQL-Injection

Der Angreifer schleust SQL-Code über Eingabefelder ein:

**Angriff auf ein Login-Formular:**
\`\`\`sql
-- Normale Eingabe:
SELECT * FROM users WHERE name='max' AND pw='123'

-- Injection (Benutzername: ' OR 1=1 --):
SELECT * FROM users WHERE name='' OR 1=1 --' AND pw='123'
-- Ergebnis: ALLE Benutzer werden zurückgegeben → Login umgangen!
\`\`\`

**Schutz: Prepared Statements**
\`\`\`java
// UNSICHER:
query = "SELECT * FROM users WHERE name='" + input + "'";

// SICHER (PreparedStatement):
stmt = conn.prepareStatement("SELECT * FROM users WHERE name=?");
stmt.setString(1, input);
\`\`\`

[INTERACTIVE:sqlInjectionSimulator]

### 2. Cross-Site Scripting (XSS)

Der Angreifer schleust JavaScript-Code in Webseiten ein:

**Stored XSS:** Schadcode wird in der Datenbank gespeichert (z.B. in Kommentaren)
**Reflected XSS:** Schadcode kommt über URL-Parameter

**Schutz:**

| Maßnahme | Beschreibung |
|----------|-------------|
| 🔤 **Output Encoding** | < wird zu &lt;, > wird zu &gt; |
| 🛡️ **Content Security Policy (CSP)** | Erlaubt nur Skripte von vertrauenswürdigen Quellen |
| 🍪 **HTTPOnly Cookies** | Cookies sind per JavaScript nicht lesbar |

### 3. Cross-Site Request Forgery (CSRF)

Der Angreifer lässt den Browser des Opfers eine Aktion auf einer anderen Webseite ausführen:

\`\`\`html
<!-- Opfer besucht bösartige Seite -->
<img src="https://bank.de/ueberweisung?ziel=angreifer&betrag=1000">
\`\`\`

**Schutz:** CSRF Tokens — der Server prüft, ob die Anfrage von der eigenen Seite kommt.

### 4. Broken Authentication

| Problem | Beschreibung |
|---------|-------------|
| 🔓 **Schwache Passwörter** | Fehlende MFA |
| 🍪 **Session Hijacking** | Session-Cookie stehlen |

### 5. Security Misconfiguration

| Problem | Beschreibung |
|---------|-------------|
| 🔓 **Default-Passwörter** | admin/admin |
| 🐛 **Debug-Modus** | Im Produktionssystem aktiv |
| 🚪 **Offene Ports** | Unnötige Dienste |

### 🧃 OWASP Juice Shop — Selber ausprobieren!

Der **OWASP Juice Shop** ist die weltweit modernste absichtlich unsichere Web-App. Du kannst dort ALLE Angriffe aus dieser Lektion in einer echten Web-App üben!

**Öffentliche Demo:** https://juice-shop.herokuapp.com
**GitHub:** https://github.com/juice-shop/juice-shop

**Lokale Installation (Docker):**
\`\`\`bash
docker pull bkimminich/juice-shop
docker run -d -p 3000:3000 bkimminich/juice-shop
# Öffne http://localhost:3000
\`\`\`\n
**Challenges die du lösen solltest:**
1. ⭐ Scoreboard finden (versteckte Seite)
2. ⭐ Login Bypass (SQL Injection)
3. ⭐⭐ Admin Login
4. ⭐⭐⭐ UNION Injection (Daten auslesen)
5. ⭐⭐⭐ XSS in Kommentaren
6. ⭐⭐⭐⭐ JWT Manipulation

> Die Challenges sind Schwierigkeitsgrad 1-6 ⭐. Starte mit Level 1 und steigere dich!

> 💡 **IHK-Tipp:** SQL-Injection und XSS sind DIE Klassiker in der Prüfung. Erkläre den Angriff + Schutzmaßnahme!

> **Nächste Lektion:** Verschlüsselung & PKI — Symmetrische und asymmetrische Verschlüsselung, digitale Signaturen und Zertifikate.
`,
    },
    {
      id: "sec-5",
      title: "Verschlüsselung & PKI",
      duration: "15 min",
      type: "interactive",
      interactive: "encryptionDemo" as const,
      content: `## Verschlüsselung & PKI

> In der letzten Lektion haben wir die OWASP Top 10 kennengelernt — SQL-Injection, XSS und andere Angriffe auf Webanwendungen. Jetzt schauen wir uns das mathematische Fundament der Sicherheit an: Verschlüsselung und Public-Key-Infrastrukturen.

### Symmetrische Verschlüsselung

Ein **gemeinsamer Key** für Ver- und Entschlüsselung:

- **Algorithmen:** AES (128/192/256 Bit), DES (veraltet!), 3DES
- **Vorteil:** Schnell, gut für große Datenmengen
- **Nachteil:** Key-Verteilung ist problematisch (wie übermittelt man den Key sicher?)

<svg viewBox="0 0 550 90" xmlns="http://www.w3.org/2000/svg" style="max-width:550px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="550" height="90" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="50" y="30" text-anchor="middle" fill="#94a3b8" font-size="10">Sender</text>
  <rect x="20" y="40" width="60" height="30" rx="6" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1"/>
  <text x="50" y="60" text-anchor="middle" fill="#93c5fd" font-size="10">Plaintext</text>
  <text x="100" y="60" text-anchor="middle" fill="#fcd34d" font-size="14">🔑</text>
  <polygon points="120,55 135,48 135,62" fill="#64748b"/>
  <rect x="140" y="40" width="60" height="30" rx="6" fill="#8b5cf6" fill-opacity="0.25" stroke="#8b5cf6" stroke-width="1"/>
  <text x="170" y="60" text-anchor="middle" fill="#c4b5fd" font-size="10">AES</text>
  <polygon points="200,55 215,48 215,62" fill="#64748b"/>
  <rect x="220" y="40" width="80" height="30" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1"/>
  <text x="260" y="60" text-anchor="middle" fill="#fca5a5" font-size="10">Ciphertext</text>
  <text x="330" y="60" fill="#64748b" font-size="12">───▶</text>
  <text x="380" y="30" text-anchor="middle" fill="#94a3b8" font-size="10">Empfänger</text>
  <rect x="390" y="40" width="80" height="30" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1"/>
  <text x="430" y="60" text-anchor="middle" fill="#fca5a5" font-size="10">Ciphertext</text>
  <text x="485" y="60" text-anchor="middle" fill="#fcd34d" font-size="14">🔑</text>
  <polygon points="490,55 505,48 505,62" fill="#64748b"/>
  <rect x="500" y="40" width="40" height="30" rx="6" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1"/>
  <text x="520" y="60" text-anchor="middle" fill="#6ee7b7" font-size="10">🔓</text>
</svg>

### Asymmetrische Verschlüsselung

**Zwei Keys:** Public Key (öffentlich) + Private Key (geheim)

| Eigenschaft | Beschreibung |
|-------------|-------------|
| 🔐 **Algorithmen** | RSA, ECC (Elliptic Curve) |
| ✅ **Vorteil** | Kein gemeinsames Geheimnis nötig |
| ❌ **Nachteil** | Langsamer als symmetrisch |

<svg viewBox="0 0 580 90" xmlns="http://www.w3.org/2000/svg" style="max-width:580px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="580" height="90" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="50" y="30" text-anchor="middle" fill="#94a3b8" font-size="10">Sender</text>
  <rect x="20" y="40" width="60" height="30" rx="6" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1"/>
  <text x="50" y="60" text-anchor="middle" fill="#93c5fd" font-size="10">Plaintext</text>
  <text x="105" y="60" text-anchor="middle" fill="#10b981" font-size="10">🔓 Pub</text>
  <polygon points="140,55 155,48 155,62" fill="#64748b"/>
  <rect x="160" y="40" width="60" height="30" rx="6" fill="#8b5cf6" fill-opacity="0.25" stroke="#8b5cf6" stroke-width="1"/>
  <text x="190" y="60" text-anchor="middle" fill="#c4b5fd" font-size="10">RSA</text>
  <polygon points="220,55 235,48 235,62" fill="#64748b"/>
  <rect x="240" y="40" width="80" height="30" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1"/>
  <text x="280" y="60" text-anchor="middle" fill="#fca5a5" font-size="10">Ciphertext</text>
  <text x="350" y="60" fill="#64748b" font-size="12">───▶</text>
  <text x="400" y="30" text-anchor="middle" fill="#94a3b8" font-size="10">Empfänger</text>
  <rect x="410" y="40" width="80" height="30" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1"/>
  <text x="450" y="60" text-anchor="middle" fill="#fca5a5" font-size="10">Ciphertext</text>
  <text x="510" y="60" text-anchor="middle" fill="#f59e0b" font-size="10">🔐 Priv</text>
  <rect x="530" y="40" width="40" height="30" rx="6" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1"/>
  <text x="550" y="60" text-anchor="middle" fill="#6ee7b7" font-size="10">🔓</text>
</svg>

### Digitale Signatur

Beweist **Authentizität** und **Integrität**:

1. Sender erstellt Hash des Dokuments (SHA-256)
2. Hash wird mit dem **Private Key** verschlüsselt = Signatur
3. Empfänger entschlüsselt mit **Public Key** und vergleicht Hashes

[INTERACTIVE:encryptionDemo]

### PKI (Public Key Infrastructure)

| Komponente | Beschreibung |
|------------|-------------|
| 🏛️ **CA (Certificate Authority)** | Vertrauenswürdige Instanz, die Zertifikate ausstellt |
| 📜 **Zertifikat** | Bindet einen Public Key an eine Identität (z.B. google.com) |
| 🔒 **TLS-Handshake** | Browser prüft Zertifikat der CA → verschlüsselte Verbindung |

**Zertifikatskette:**

<svg viewBox="0 0 500 70" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="500" height="70" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="20" y="15" width="120" height="40" rx="8" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="80" y="40" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">🏛️ Root CA</text>
  <polygon points="140,35 158,28 158,42" fill="#64748b"/>
  <rect x="165" y="15" width="140" height="40" rx="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="235" y="40" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">🔗 Intermediate CA</text>
  <polygon points="305,35 323,28 323,42" fill="#64748b"/>
  <rect x="330" y="15" width="150" height="40" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
  <text x="405" y="40" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">🌐 Server-Zertifikat</text>
</svg>

### Hashing vs. Verschlüsselung

| | Hashing | Verschlüsselung |
|-|---------|----------------|
| **Richtung** | Einweg (nicht umkehrbar) | Zweiweg (entschlüsselbar) |
| **Key** | Keiner | Key benötigt |
| **Zweck** | Integrität, Passwörter | Vertraulichkeit |
| **Beispiel** | SHA-256, bcrypt | AES, RSA |

> 💡 **IHK-Tipp:** "Erkläre den Unterschied zwischen Hashing und Verschlüsselung" — fast jede Prüfung!

> **Nächste Lektion:** Social Engineering & Phishing — Der Mensch als schwächstes Glied: Angriffe erkennen und sich schützen.
`,
    },
    {
      id: "sec-6",
      title: "Social Engineering & Phishing",
      duration: "15 min",
      type: "interactive",
      interactive: "phishingDetector" as const,
      content: `## Social Engineering & Phishing

> In der letzten Lektion haben wir Verschlüsselung und PKI kennengelernt — von symmetrischen und asymmetrischen Verfahren bis zu digitalen Signaturen und Zertifikaten. Jetzt widmen wir uns der Schwachstelle, die keine Technik schließen kann: dem Menschen selbst.

### Was ist Social Engineering?

Social Engineering nutzt die **menschliche Psyche** als Angriffsvektor — keine Technik, sondern Manipulation:

| Methode | Beispiel |
|---------|---------|
| 🤝 **Vertrauen** aufbauen | "Ich bin von der IT-Abteilung" |
| ⏰ **Druck** erzeugen | "Ihr Konto wird gesperrt!" |
| 🎁 **Neugier** wecken | "Gehaltsliste 2024.xlsx" |
| 🙋 **Hilfsbereitschaft** ausnutzen | "Können Sie mir kurz Zugang geben?" |

### Angriffsmethoden

| Methode | Beschreibung | Beispiel |
|---------|-------------|---------|
| **Phishing** | Gefälschte E-Mails/Webseiten | Fake-Bank-Login |
| **Spear-Phishing** | Zielgerichtet auf Person | E-Mail an CEO mit persönlichem Bezug |
| **Whaling** | Angriff auf Führungskräfte | "Dringende Überweisung" an CFO |
| **Pretexting** | Fake-Identität/Vorwand | Anruf als IT-Support |
| **Baiting** | Lockmittel auslegen | USB-Stick im Parkplatz |
| **Tailgating** | Hinter jemandem durch Tür | "Haben Sie Ihre Karte vergessen?" |

### Phishing erkennen — Merkmale

**Verdächtige E-Mails erkennen:**
1. **Absender prüfen:** bank@secure-login.xyz statt @deine-bank.de
2. **Druck/Angst:** "Ihr Konto wird in 24h gesperrt!"
3. **Links prüfen:** Maus drüber — zeigt echte URL?
4. **Rechtschreibfehler:** Professionelle Firmen machen selten Fehler
5. **Anhänge:** .exe, .scr, .zip — nie ungeprüft öffnen!
6. **Persönliche Daten:** Banken fragen NIE per E-Mail nach Passwörtern

[INTERACTIVE:phishingDetector]

### Schutzmaßnahmen

**Technisch:**

| Maßnahme | Beschreibung |
|----------|-------------|
| 🛡️ **Spam-Filter** | Anti-Phishing-Tools |
| 🔐 **MFA aktivieren** | Auch bei gestohlenem Passwort kein Zugriff |
| 📧 **E-Mail-Authentifizierung** | SPF, DKIM, DMARC |

**Organisatorisch:**

| Maßnahme | Beschreibung |
|----------|-------------|
| 📚 **Schulungen** | Regelmäßige Schulungen für Mitarbeiter |
| 📋 **Klare Prozesse** | z.B. "Keine Überweisungen per E-Mail" |
| 🚨 **Meldeprozess** | Für verdächtige E-Mails |

**Persönlich:**

| Maßnahme | Beschreibung |
|----------|-------------|
| 🤔 **Skeptisch sein** | Bei unerwarteten Nachrichten |
| 🔒 **Passwörter schützen** | Niemals per E-Mail/Telefon weitergeben |
- Im Zweifel: direkt bei der Firma anrufen (nicht über Links in der Mail!)

> 💡 **IHK-Tipp:** Social Engineering-Fragen zielen oft auf die menschliche Schwachstelle ab — "Warum ist der Mensch das schwächste Glied?"
`,
    },
    {
      id: "sec-7",
      title: "Wissenstest: IT-Sicherheit",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: IT-Sicherheit

Teste dein Wissen über IT-Sicherheit — von der CIA-Triade über Verschlüsselung bis zu Netzwerksicherheit!`,
    },
  ],
};
