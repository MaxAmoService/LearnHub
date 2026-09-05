import { Module } from "./types";

// ============================================================================
// IHK "Software-Qualitätsstandards" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const qualitaetModule: Module = {
  id: "ihk-qualitaet",
  slug: "ihk-qualitaet",
  title: "Software-Qualitätsstandards",
  description: "IHK IT-Handbuch: ISO 9126, Design Patterns, Anti-Patterns, Architekturstile, Testverfahren, Code Smells, Vorgehensmodelle",
  icon: "✅",
  color: "#10B981",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Software-Qualitätsstandards (IHK)

### Was ist Softwarequalität?
- Fähigkeit, stated und implied needs zu erfüllen (ISO/IEC/IEEE 24765:2017)
- Grad der Erfüllung von Anforderungen

### ISO 9126 — Qualitätsmerkmale
- **Funktionalität:** Korrektheit, Sicherheit, Interoperabilität
- **Zuverlässigkeit:** Reife, Fehlertoleranz, Wiederherstellbarkeit
- **Benutzbarkeit:** Verständlichkeit, Erlernbarkeit, Bedienbarkeit
- **Effizienz:** Zeitverhalten, Ressourcenverhalten
- **Wartbarkeit:** Analysierbarkeit, Änderbarkeit, Testbarkeit
- **Portabilität:** Anpassbarkeit, Installierbarkeit, Austauschbarkeit

### Design Patterns (23 GoF)
- **Creational:** Singleton, Factory, Abstract Factory, Builder, Prototype
- **Structural:** Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Behavioral:** Strategy, Observer, Command, Iterator, State, Template Method

### Architekturstile
- **Schichtenarchitektur:** Präsentation → Anwendung → Datenhaltung
- **MVC:** Model (Daten) → View (Darstellung) → Controller (Logik)
- **Microservices:** Unabhängige Services mit eigener DB

### Testverfahren
- **Unit-Test:** Einzelne Funktionen/Klassen isoliert
- **Integrationstest:** Zusammenspiel zwischen Modulen
- **Systemtest:** Gesamtes System
- **Akzeptanztest:** Durch den Kunden
- **Black-Box:** Ohne Kenntnis der Implementierung
- **White-Box:** Mit Kenntnis des Codes

### Code Smells
- Lange Methoden (>20 Zeilen)
- Lange Parameterlisten (>4)
- Error Hiding
- Reinvent the Wheel

### Clean Code & SOLID
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion`,

  lessons: [
    // --- Lektion 1: Softwarequalität Definition ---
    {
      id: "sq-1",
      title: "Was ist Softwarequalität?",
      duration: "12 min",
      type: "text",
      content: `## Softwarequalität — Was bedeutet das?

> In diesem Modul lernst du die wichtigsten Qualitätsstandards, Design Patterns und Testverfahren kennen — alles prüfungsrelevant für die IHK! Wir starten mit der Definition von Qualität und arbeiten uns zu konkreten Werkzeugen vor.

---

Nach der **ISO/IEC/IEEE 24765:2017** ist Softwarequalität:

> "The capability of a software product to satisfy stated and implied needs when used under specified conditions."

Einfach gesagt: **Tut das Programm, was es soll — und tut es gut?**

---

## 📊 Wie entsteht ein Standard?

| Schritt | Beschreibung |
|---------|-------------|
| 📝 **Antrag** | Bedarf wird erkannt |
| 👥 **Expertenteam** | Verfasst den Entwurf |
| 💬 **Diskussion** | Entwurf wird mit Öffentlichkeit angepasst |
| ✅ **Fertigstellung** | Standard wird veröffentlicht |

### Ebenen

| Ebene | Organisation |
|-------|-------------|
| 🇩🇪 **National** | DIN (Deutsches Institut für Normung) |
| 🇪🇺 **Europäisch** | CEN |
| 🌍 **International** | ISO |

> ⚠️ Der Prozess kann **3-5 Jahre** dauern!

---

## 💀 Software-Katastrophen — Warum Qualität wichtig ist

| Katastrophe | Jahr | Problem | Kosten |
|-------------|------|---------|--------|
| 🏫 Denver Airport | 1995 | Fehler im Gepäcksystem | 50 Mio. € |
| ✈️ Heathrow Terminal 5 | 2008 | Tausende Gepäckstücke verloren | — |
| 🏗️ Berlin Brandenburg | 2006+ | Softwareprobleme bei Türen/Licht/Sicherheit | 290 Mio. € |
| ☕ Starbucks | 2015 | Kassensystem weltweit ausgefallen | Imageschaden |
| 🚗 Nissan Airbag | 2015 | 3,2 Mio. Autos zurückgerufen | Rückrufkosten |
| 🌡️ Nest Thermostat | 2016 | Keine Heizung im Winter | Kundenabwanderung |
| 💻 CrowdStrike | 2024 | Weltweiter Windows-Ausfall | Milliarden |

> 💡 **Merke:** Softwarefehler können **Milliarden** kosten und **Leben gefährden**. Qualität ist kein Luxus!

---

> 💡 **IHK-Tipp:** "Nennen Sie 3 Beispiele für Software-Katastrophen und deren Ursachen!" — Mangelhafte Tests, schlechte Kommunikation, überhastete Updates.`
    },

    // --- Lektion 2: ISO 9126 ---
    {
      id: "sq-2",
      title: "ISO 9126 — Qualitätsmerkmale",
      duration: "15 min",
      type: "text",
      content: `## ISO 9126 — Die 6 Qualitätsmerkmale

> In der letzten Lektion haben wir gelernt, WAS Softwarequalität ist und WARUM sie wichtig ist. Jetzt schauen wir uns ein konkreteres Framework an: Die ISO 9126 definiert 6 messbare Qualitätsmerkmale.

Die **ISO 9126** definiert 6 Hauptmerkmale für Softwarequalität. Diese Struktur hilft, Qualität **systematisch** zu bewerten.

---

## 📊 Die 6 Qualitätsmerkmale

### 1️⃣ Funktionalität

> Tut das System, was es soll?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Korrektheit** | Ergebnisse sind richtig |
| **Sicherheit** | Zugriffskontrolle, Verschlüsselung |
| **Interoperabilität** | Zusammenarbeit mit anderen Systemen |
| **Konformität** | Standards einhalten |

### 2️⃣ Zuverlässigkeit

> Läuft das System stabil?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Reife** | Wenige Fehler im Betrieb |
| **Fehlertoleranz** | System läuft trotz Fehlern weiter |
| **Wiederherstellbarkeit** | Nach Absturz wiederherstellbar |

### 3️⃣ Benutzbarkeit

> Ist das System einfach zu bedienen?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Verständlichkeit** | Funktionen sind nachvollziehbar |
| **Erlernbarkeit** | Schnell zu erlernen |
| **Bedienbarkeit** | Effizient nutzbar |

### 4️⃣ Effizienz

> Nutzt das System Ressourcen gut?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Zeitverhalten** | Antwortzeiten |
| **Ressourcenverbrauch** | CPU, RAM, Speicher |

### 5️⃣ Wartbarkeit

> Ist das System einfach zu pflegen?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Analysierbarkeit** | Fehler finden |
| **Änderbarkeit** | Code anpassen |
| **Testbarkeit** | Tests durchführbar |
| **Stabilität** | Änderungen brechen nichts |

### 6️⃣ Portabilität

> Läuft das System überall?

| Unterkriterium | Beschreibung |
|----------------|-------------|
| **Anpassbarkeit** | An andere Umgebungen anpassbar |
| **Installierbarkeit** | Einfach zu installieren |
| **Austauschbarkeit** | Komponenten ersetzbar |

---

## 📋 Zusammenfassung

| Merkmal | Kernfrage | Beispiel |
|---------|-----------|----------|
| **Funktionalität** | Tut es was es soll? | Login funktioniert |
| **Zuverlässigkeit** | Läuft es stabil? | Kein Absturz |
| **Benutzbarkeit** | Ist es einfach? | Intuitive UI |
| **Effizienz** | Ist es schnell? | <2s Ladezeit |
| **Wartbarkeit** | Ist es pflegbar? | Sauberer Code |
| **Portabilität** | Läuft es überall? | Windows + Linux |

---

> 💡 **IHK-Tipp:** "Nennen Sie die 6 Qualitätsmerkmale der ISO 9126!" — Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität.`
    },

    // --- Lektion 3: Design Patterns ---
    {
      id: "sq-3",
      title: "Design Patterns — Die wichtigsten Muster",
      duration: "25 min",
      type: "interactive",
      interactive: "patternExplorer",
      content: `## Design Patterns — Lösungen für bekannte Probleme

> Nachdem wir die Qualitätsmerkmale kennengelernt haben, widmen wir uns jetzt konkreten Lösungsmustern. Design Patterns sind wie **Bauanleitungen für bewährte Probleme** — sie helfen dir, sauberen Code zu schreiben.

> Die SOLID-Prinzipien im Modul "Erweiterte Programmierung" ergänzen diese Patterns perfekt.

**Design Patterns** sind bewährte Lösungen für häufig auftretende Probleme in der Softwareentwicklung. Sie sind kein konkreter Code, sondern **allgemeine Konzepte**.

| | Algorithmus | Pattern |
|---|---|---|
| **Fokus** | Schritt-für-Schritt Lösung | High-Level Lösungskonzept |
| **Anwendung** | Ein Problem | Mehrere Probleme |
| **Code** | Spezifisch | Allgemein |

Im interaktiven Explorer unten findest du alle wichtigen Patterns mit Code-Beispielen, Erklärungen und Verwendungszwecken.

---

## 🔨 Patterns erkunden

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Erklären Sie das Strategy-Pattern!" — Definiert eine Familie von Algorithmen, kapselt sie in separate Klassen und macht sie austauschbar. Beispiel: Verschiedene Sortierverfahren zur Laufzeit wechseln.`
    },

    // --- Lektion 4: Architekturstile ---
    {
      id: "sq-4",
      title: "Architekturstile — Schichten, MVC, Microservices",
      duration: "15 min",
      type: "text",
      visuals: [{ type: "layerArchitecture", position: "top" }],
      content: `## Architekturstile — Wie strukturiere ich Software?

> Nach den Design Patterns (kleine Lösungsmuster) schauen wir uns jetzt das große Ganze an: Wie strukturiere ich eine gesamte Anwendung? Die Wahl des Architekturstils entscheidet über Wartbarkeit und Skalierbarkeit.

Ein **Architekturstil** definiert, wie die Komponenten einer Anwendung organisiert und miteinander verbunden sind.

---

## 🏛️ Schichtenarchitektur

Trennt eine Anwendung in **logisch getrennte Schichten**. Jede Schicht hat eine klare Aufgabe.

<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="400" height="220" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="60" y="20" width="280" height="50" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="2"/>
  <text x="200" y="42" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Präsentation</text>
  <text x="200" y="58" text-anchor="middle" fill="#64748b" font-size="10">UI, Darstellung, Benutzerinteraktion</text>
  <polygon points="200,70 190,82 210,82" fill="#64748b"/>
  <rect x="60" y="85" width="280" height="50" rx="8" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="2"/>
  <text x="200" y="107" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold">Anwendung</text>
  <text x="200" y="123" text-anchor="middle" fill="#64748b" font-size="10">Geschäftslogik, Verarbeitung</text>
  <polygon points="200,135 190,147 210,147" fill="#64748b"/>
  <rect x="60" y="150" width="280" height="50" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="2"/>
  <text x="200" y="172" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">Datenhaltung</text>
  <text x="200" y="188" text-anchor="middle" fill="#64748b" font-size="10">Datenbank, Dateisystem, Cache</text>
</svg>

### Regeln

| Regel | Beschreibung |
|-------|-------------|
| 🔗 **Kommunikation** | Nur **zwischen benachbarten Schichten** |
| 📏 **Strenge Architektur** | Nur von oben nach unten |
| 🔀 **Lockere Architektur** | Auch Schichten überspringen |

### Vorteile

| Vorteil | Beschreibung |
|---------|-------------|
| ✅ **Trennung** | Klare Trennung der Verantwortlichkeiten |
| ✅ **Testbar** | Gut testbar |
| ✅ **Austauschbar** | z.B. Datenbank wechseln |

### Nachteile

| Nachteil | Beschreibung |
|----------|-------------|
| ❌ **Overhead** | Kann zu viel Overhead erzeugen |
| ❌ **Performance** | Durch viele Schichten |

---

## 🔄 Model-View-Controller (MVC)

Strukturiert eine Anwendung in **drei Komponenten**:

| Komponente | Aufgabe | Beispiel |
|------------|---------|----------|
| 📊 **Model** | Daten + Logik | Datenbank, Berechnungen |
| 🖼️ **View** | Darstellung | HTML, UI |
| 🎮 **Controller** | Vermittler | Verarbeitet Input, steuert Model |

### Kommunikationsfluss

<svg viewBox="0 0 550 70" xmlns="http://www.w3.org/2000/svg" style="max-width:550px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="550" height="70" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <circle cx="40" cy="35" r="20" fill="#94a3b8" fill-opacity="0.2" stroke="#94a3b8" stroke-width="1.5"/>
  <text x="40" y="39" text-anchor="middle" fill="#e2e8f0" font-size="10">👤</text>
  <text x="40" y="62" text-anchor="middle" fill="#64748b" font-size="7">User</text>
  <polygon points="62,35 78,30 78,40" fill="#64748b"/>
  <rect x="82" y="18" width="70" height="34" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="117" y="40" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">View</text>
  <polygon points="154,35 170,30 170,40" fill="#64748b"/>
  <rect x="174" y="18" width="85" height="34" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
  <text x="216" y="40" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Controller</text>
  <polygon points="261,35 277,30 277,40" fill="#64748b"/>
  <rect x="281" y="18" width="60" height="34" rx="6" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="311" y="40" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Model</text>
  <polygon points="343,35 359,30 359,40" fill="#64748b"/>
  <text x="385" y="35" text-anchor="middle" fill="#94a3b8" font-size="10">← Daten</text>
  <polygon points="430,35 446,30 446,40" fill="#64748b"/>
  <text x="475" y="35" text-anchor="middle" fill="#94a3b8" font-size="10">← Render</text>
</svg>

### Vorteile

| Vorteil | Beschreibung |
|---------|-------------|
| ✅ **Trennung** | Klare Trennung von UI und Logik |
| ✅ **Testbar** | Model unabhängig von View |
| ✅ **Flexibel** | Mehrere Views für ein Model möglich |

---

## 🧩 Microservices

Bei Microservices werden Aufgaben in **unabhängige Services** gekapselt:

<svg viewBox="0 0 550 160" xmlns="http://www.w3.org/2000/svg" style="max-width:550px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="550" height="160" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="25" y="20" width="140" height="75" rx="8" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="95" y="45" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Service A</text>
  <text x="95" y="62" text-anchor="middle" fill="#64748b" font-size="10">(Auth)</text>
  <rect x="45" y="70" width="100" height="18" rx="4" fill="#3b82f6" fill-opacity="0.1" stroke="#3b82f6" stroke-width="0.5"/>
  <text x="95" y="83" text-anchor="middle" fill="#64748b" font-size="10">🗄️ DB-A</text>
  <rect x="205" y="20" width="140" height="75" rx="8" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5"/>
  <text x="275" y="45" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">Service B</text>
  <text x="275" y="62" text-anchor="middle" fill="#64748b" font-size="10">(Orders)</text>
  <rect x="225" y="70" width="100" height="18" rx="4" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="0.5"/>
  <text x="275" y="83" text-anchor="middle" fill="#64748b" font-size="10">🗄️ DB-B</text>
  <rect x="385" y="20" width="140" height="75" rx="8" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="455" y="45" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Service C</text>
  <text x="455" y="62" text-anchor="middle" fill="#64748b" font-size="10">(Payment)</text>
  <rect x="405" y="70" width="100" height="18" rx="4" fill="#f59e0b" fill-opacity="0.1" stroke="#f59e0b" stroke-width="0.5"/>
  <text x="455" y="83" text-anchor="middle" fill="#64748b" font-size="10">🗄️ DB-C</text>
  <line x1="95" y1="95" x2="95" y2="115" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="275" y1="95" x2="275" y2="115" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="455" y1="95" x2="455" y2="115" stroke="#94a3b8" stroke-width="1.5"/>
  <rect x="60" y="115" width="430" height="28" rx="6" fill="#64748b" fill-opacity="0.15" stroke="#64748b" stroke-width="1.5"/>
  <text x="275" y="134" text-anchor="middle" fill="#e2e8f0" font-size="10" font-weight="bold">🔌 API Gateway</text>
</svg>

### Eigenschaften

| Eigenschaft | Beschreibung |
|-------------|-------------|
| 🔀 **Getrennt** | Jeder Service ist **logisch getrennt** und **technisch unabhängig** |
| 🗄️ **Eigene DB** | Eigene Datenbank pro Service möglich |
| 🔌 **APIs** | Kommunikation über **APIs** (nicht Methodenaufrufe) |
| 📈 **Skalierbar** | Können unabhängig skaliert und aktualisiert werden |

### Vorteile

| Vorteil | Beschreibung |
|---------|-------------|
| ✅ **Unabhängig** | Entwicklung und Deployment |
| ✅ **Technologie-Freiheit** | Pro Service |
| ✅ **Skalierbar** | Horizontal skalierbar |

### Nachteile

| Nachteil | Beschreibung |
|----------|-------------|
| ❌ **Komplexität** | Netzwerk, API-Management |
| ❌ **Debugging** | Schwieriges Debugging |
| ❌ **Datenkonsistenz** | Verteilte Daten |

---

## ⚔️ Vergleich

| | Schichten | MVC | Microservices |
|---|---|---|---|
| **Komplexität** | Niedrig | Mittel | Hoch |
| **Trennung** | Horizontal | Vertikal | Unabhängig |
| **Skalierung** | Schichtweise | Komponente | Service |
| **Use Case** | Web-Apps | UI-Frameworks | Großprojekte |

---

> 💡 **IHK-Tipp:** "Erklären Sie die Schichtenarchitektur!" — Präsentation, Anwendung, Datenhaltung. Kommunikation nur zwischen benachbarten Schichten. Vorteile: Klare Trennung, testbar, austauschbar.`
    },

    // --- Lektion 5: Testverfahren ---
    {
      id: "sq-5",
      title: "Testverfahren — Unit, Integration, System",
      duration: "15 min",
      type: "text",
      visuals: [{ type: "testPyramid", position: "top" }],
      content: `## Testverfahren — Qualität sicherstellen

> Wir kennen jetzt Qualitätsmerkmale, Patterns und Architekturen. Aber wie stellen wir sicher, dass unser Code auch wirklich funktioniert? Durch Tests! Verschiedene Testarten decken verschiedene Aspekte ab.

> Unit Tests behandeln wir auch im Modul "Erweiterte Programmierung" — dort mit Fokus auf das Schreiben von Tests.

Tests sind **essenziell** für Softwarequalität. Es gibt verschiedene Testarten, die unterschiedliche Aspekte prüfen.

---

## 🧪 Die Testpyramide

<svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <defs>
    <linearGradient id="pyrGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
      <stop offset="50%" style="stop-color:#f59e0b;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:0.3"/>
    </linearGradient>
  </defs>
  <!-- Pyramid layers -->
  <polygon points="200,20 80,100 320,100" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="2"/>
  <polygon points="80,105 50,190 350,190 320,105" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="50,195 20,270 380,270 350,195" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="2"/>
  <!-- Labels -->
  <text x="200" y="65" text-anchor="middle" fill="#fca5a5" font-size="12" font-weight="bold">E2E / Manuell</text>
  <text x="200" y="85" text-anchor="middle" fill="#94a3b8" font-size="10">wenige, langsam</text>
  <text x="200" y="145" text-anchor="middle" fill="#fcd34d" font-size="12" font-weight="bold">Integrationstests</text>
  <text x="200" y="165" text-anchor="middle" fill="#94a3b8" font-size="10">mehrere, mittel</text>
  <text x="200" y="225" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">Unit-Tests</text>
  <text x="200" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">viele, schnell</text>
</svg>

---

## 1️⃣ Unit-Test (Modultest)

> Testet **einzelne Funktionen oder Klassen** isoliert.

\`\`\`python
def addiere(a, b):
    return a + b

def test_addiere():
    assert addiere(2, 3) == 5
    assert addiere(-1, 1) == 0
\`\`\`

| Merkmal | Beschreibung |
|---------|-------------|
| **Umfang** | Eine Funktion/Klasse |
| **Geschwindigkeit** | Sehr schnell |
| **Werkzeuge** | unittest, pytest (Python), JUnit (Java) |

---

## 2️⃣ Integrationstest

> Testet das **Zusammenspiel** zwischen mehreren Modulen.

\`\`\`python
def test_login_flow():
    user = create_user("test@test.de", "pass123")
    result = login("test@test.de", "pass123")
    assert result.success == True
\`\`\`

| Merkmal | Beschreibung |
|---------|-------------|
| **Umfang** | Mehrere Module zusammen |
| **Geschwindigkeit** | Mittel |
| **Ziel** | Fehler in Schnittstellen finden |

---

## 3️⃣ Systemtest

> Testet das **gesamte System** als Ganzes.

| Merkmal | Beschreibung |
|---------|-------------|
| **Umfang** | Komplette Anwendung |
| **Geschwindigkeit** | Langsam |
| **Ziel** | End-to-End funktioniert alles? |

---

## 4️⃣ Akzeptanztest

> Wird vom **Kunden** durchgeführt. Prüft ob die Anforderungen erfüllt sind.

| Merkmal | Beschreibung |
|---------|-------------|
| **Durchführung** | Kunde/Anwender |
| **Ziel** | Erfüllt das System die Anforderungen? |

---

## ⚔️ Black-Box vs. White-Box

| | Black-Box | White-Box |
|---|---|---|
| **Kenntnis** | ❌ Keine internen Details | ✅ Code bekannt |
| **Fokus** | Eingabe → Ausgabe | Interne Logik |
| **Durchführung** | Tester, Kunde | Entwickler |
| **Beispiel** | "Login mit falschem Passwort → Fehlermeldung" | "Prüfe alle Pfade in der Login-Funktion" |

---

## 📊 Testabdeckung (Coverage)

| Art | Beschreibung |
|-----|-------------|
| **Statement Coverage** | Jede Anweisung wurde ausgeführt |
| **Branch Coverage** | Jeder Zweig (if/else) wurde getestet |
| **Path Coverage** | Jeder mögliche Pfad wurde getestet |

> ⚠️ **100% Coverage ≠ fehlerfrei!** Es zeigt nur, dass der Code ausgeführt wurde — nicht, dass er richtig funktioniert.

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Unit-Test und Integrationstest?" — Unit = isoliert, eine Funktion. Integration = Zusammenspiel mehrerer Module.`
    },

    // --- Lektion 6: Vorgehensmodelle ---
    {
      id: "sq-6",
      title: "Vorgehensmodelle — Wasserfall, V-Modell, Scrum",
      duration: "15 min",
      type: "text",
      visuals: [{ type: "waterfall", position: "top" }, { type: "vModel", position: "top" }],
      content: `## Vorgehensmodelle — Wie organisiere ich ein Projekt?

> Nach den Testverfahren wissen wir, WIE wir Qualität prüfen. Jetzt fragen wir uns: WANN im Entwicklungsprozess testen wir? Die Vorgehensmodelle bestimmen den gesamten Ablauf — von der Planung bis zum Deployment.

> Scrum behandeln wir auch im Modul "Projektmanagement" — dort mit Fokus auf Rollen und Events.

Verschiedene Projekte brauchen verschiedene Vorgehensweisen. Die IHK prüft, ob du die Modelle **unterscheiden und bewerten** kannst.

---

## 🌊 Wasserfallmodell

**Prinzip:** Phasen werden **streng sequentiell** durchlaufen.

<svg viewBox="0 0 600 120" xmlns="http://www.w3.org/2000/svg" style="max-width:600px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="600" height="120" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="15" y="30" width="100" height="50" rx="8" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="65" y="60" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">Anforderung</text>
  <polygon points="115,50 130,40 130,60" fill="#64748b"/>
  <rect x="135" y="30" width="80" height="50" rx="8" fill="#8b5cf6" fill-opacity="0.25" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="175" y="60" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="bold">Design</text>
  <polygon points="215,50 230,40 230,60" fill="#64748b"/>
  <rect x="235" y="30" width="110" height="50" rx="8" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
  <text x="290" y="60" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">Implementierung</text>
  <polygon points="345,50 360,40 360,60" fill="#64748b"/>
  <rect x="365" y="30" width="80" height="50" rx="8" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="405" y="60" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">Test</text>
  <polygon points="445,50 460,40 460,60" fill="#64748b"/>
  <rect x="465" y="30" width="100" height="50" rx="8" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5"/>
  <text x="515" y="60" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="bold">Wartung</text>
  <text x="300" y="105" text-anchor="middle" fill="#64748b" font-size="10">Keine Rücksprünge — jede Phase muss abgeschlossen sein</text>
</svg>

### Vorteile

| Vorteil | Beschreibung |
|---------|-------------|
| ✅ **Einfach** | Zu verstehen |
| ✅ **Klare Struktur** | Übersichtlich |
| ✅ **Feste Anforderungen** | Gut für Projekte mit festen Anforderungen |

### Nachteile

| Nachteil | Beschreibung |
|----------|-------------|
| ❌ **Keine Rücksprünge** | Möglich |
| ❌ **Späte Fehlererkennung** | Fehler erst am Ende |
| ❌ **Kunde** | Sieht erst am Ende das Ergebnis |

---

## 🔀 V-Modell

**Prinzip:** Jede Phase hat eine **zugehörige Testphase**.

<svg viewBox="0 0 550 200" xmlns="http://www.w3.org/2000/svg" style="max-width:550px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="550" height="200" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <!-- Left side (Development) -->
  <rect x="20" y="20" width="120" height="36" rx="6" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="80" y="43" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="bold">Anforderung</text>
  <rect x="60" y="65" width="120" height="36" rx="6" fill="#8b5cf6" fill-opacity="0.25" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="120" y="88" text-anchor="middle" fill="#c4b5fd" font-size="10" font-weight="bold">Design</text>
  <rect x="100" y="110" width="120" height="36" rx="6" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
  <text x="160" y="133" text-anchor="middle" fill="#6ee7b7" font-size="10" font-weight="bold">Implementierung</text>
  <!-- Arrow down -->
  <line x1="80" y1="56" x2="120" y2="65" stroke="#64748b" stroke-width="1.5"/>
  <line x1="120" y1="101" x2="160" y2="110" stroke="#64748b" stroke-width="1.5"/>
  <!-- Right side (Testing) -->
  <rect x="400" y="20" width="120" height="36" rx="6" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="1.5"/>
  <text x="460" y="43" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">Akzeptanztest</text>
  <rect x="360" y="65" width="120" height="36" rx="6" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="420" y="88" text-anchor="middle" fill="#fcd34d" font-size="10" font-weight="bold">Systemtest</text>
  <rect x="320" y="110" width="120" height="36" rx="6" fill="#ec4899" fill-opacity="0.25" stroke="#ec4899" stroke-width="1.5"/>
  <text x="380" y="133" text-anchor="middle" fill="#f9a8d4" font-size="10" font-weight="bold">Integrationstest</text>
  <rect x="220" y="155" width="100" height="30" rx="6" fill="#6366f1" fill-opacity="0.25" stroke="#6366f1" stroke-width="1.5"/>
  <text x="270" y="175" text-anchor="middle" fill="#a5b4fc" font-size="10" font-weight="bold">Unit-Test</text>
  <!-- Connecting arrows -->
  <line x1="140" y1="38" x2="400" y2="38" stroke="#64748b" stroke-width="1" stroke-dasharray="5,4"/>
  <line x1="180" y1="83" x2="360" y2="83" stroke="#64748b" stroke-width="1" stroke-dasharray="5,4"/>
  <line x1="220" y1="128" x2="320" y2="128" stroke="#64748b" stroke-width="1" stroke-dasharray="5,4"/>
  <line x1="160" y1="146" x2="220" y2="165" stroke="#64748b" stroke-width="1" stroke-dasharray="5,4"/>
  <line x1="390" y1="146" x2="320" y2="165" stroke="#64748b" stroke-width="1" stroke-dasharray="5,4"/>
  <text x="275" y="195" text-anchor="middle" fill="#64748b" font-size="10">Jede Entwicklungsphase hat eine zugehörige Testphase</text>
</svg>

### Vorteile

| Vorteil | Beschreibung |
|---------|-------------|
| ✅ **Testen** | Von Anfang an geplant |
| ✅ **Frühe Fehlererkennung** | Fehler früh finden |
| ✅ **Zuordnung** | Klare Zuordnung (Was → Wie testen) |

### Nachteile

| Nachteil | Beschreibung |
|----------|-------------|
| ❌ **Starr** | Wie Wasserfall: starr |
| ❌ **Dokumentation** | Hoher Dokumentationsaufwand |

> 💡 **Merke:** Das V-Modell ist wie Wasserfall, aber mit **eingebautem Testen**!

---

## 🔄 Agiles Manifest (Scrum)

**4 Werte:**
1. **Individuen und Interaktionen** mehr als Prozesse und Werkzeuge
2. **Funktionierende Software** mehr als umfassende Dokumentation
3. **Zusammenarbeit mit dem Kunden** mehr als Vertragsverhandlung
4. **Reagieren auf Veränderung** mehr als das Befolgen eines Plans

### Scrum-Rollen
| Rolle | Aufgabe |
|-------|---------|
| 🏆 **Product Owner** | Verbindung zum Kunden, Backlog pflegen |
| 🛡️ **Scrum Master** | Berater, Prozess-Sicherung |
| 👥 **Cross-functional Team** | Selbstorganisiert, eigenverantwortlich |

### Scrum-Events
| Event | Zweck | Zeit |
|-------|-------|------|
| 📋 **Sprint Planning** | Was schaffen wir? | 2-4 Wochen |
| 🌅 **Daily** | Kurzer Standup | 15 min/Tag |
| 🎯 **Sprint Review** | Ergebnis zeigen | Am Sprint-Ende |
| 🔄 **Retrospektive** | Prozess verbessern | Am Sprint-Ende |

### Definition of Done
> Wann ist ein Arbeitspaket "fertig"?
> - Code geschrieben ✅
> - Tests bestanden ✅
> - Dokumentation aktualisiert ✅
> - Review durchgeführt ✅

---

## ⚔️ Vergleich

| | Wasserfall | V-Modell | Scrum |
|---|---|---|---|
| **Flexibilität** | ❌ Gering | ❌ Gering | ✅ Hoch |
| **Kundenkontakt** | ❌ Selten | ❌ Selten | ✅ Ständig |
| **Testen** | Am Ende | Jede Phase | Permanent |
| **Rücksprünge** | ❌ Nein | ❌ Nein | ✅ Ja |
| **Use Case** | Feste Anforderungen | Kritische Systeme | Sich ändernde Anforderungen |

---

> 💡 **IHK-Tipp:** "Vergleichen Sie Wasserfall und Scrum!" — Wasserfall: sequentiell, starr, feste Anforderungen. Scrum: iterativ, flexibel, Kundenkontakt. V-Modell: wie Wasserfall aber mit Testphasen.`
    },

    // --- Lektion 7: Code Smells & Clean Code ---
    {
      id: "sq-7",
      title: "Code Smells & Clean Code",
      duration: "15 min",
      type: "text",
      content: `## Code Smells — Warnsignale im Code

> Wir kennen jetzt die großen Konzepte: Qualitätsmerkmale, Patterns, Architekturen, Tests und Vorgehensmodelle. Jetzt zoomen wir auf die Code-Ebene: Was macht Code schlecht — und wie verbessern wir ihn?

> Code Smells behandeln wir auch im Modul "Erweiterte Programmierung" — dort mit Fokus auf Refactoring-Techniken.

**Code Smells** ("Code-Gerüche") sind Hinweise darauf, dass im Code etwas nicht stimmt — nicht sofort ein Fehler, aber ein Risiko für zukünftige Probleme.

---

## 🚩 Die häufigsten Code Smells

### 1️⃣ Lange Methoden
> Mehr als **20 Zeilen** → Methode macht zu viel.

\`\`\`python
# ❌ Schlecht
def process_order(order):
    # 50 Zeilen Code...

# ✅ Gut
def process_order(order):
    validate(order)
    calculate_total(order)
    save(order)
    send_confirmation(order)
\`\`\`

### 2️⃣ Lange Parameterlisten
> Mehr als **4 Parameter** → Schwer zu lesen.

\`\`\`python
# ❌ Schlecht
def create_user(name, email, age, city, street, zip_code, phone):

# ✅ Gut
def create_user(user_data: UserData):
\`\`\`

### 3️⃣ Error Hiding
> Fehler verstecken statt behandeln.

\`\`\`python
# ❌ Schlecht
try:
    do_something()
except:
    pass  # Fehler verschluckt!

# ✅ Gut
try:
    do_something()
except SpecificError as e:
    logger.error(f"Fehler: {e}")
    raise
\`\`\`

### 4️⃣ Reinvent the Wheel
> Bibliotheken nutzen statt alles selbst schreiben.

\`\`\`python
# ❌ Schlecht — eigenen HTTP-Client schreiben
# ✅ Gut — requests oder axios verwenden
\`\`\`

### 5️⃣ Duplicated Code
> Gleicher Code an mehreren Stellen → DRY-Prinzip verletzt.

---

## 🧹 Clean Code Prinzipien

### DRY — Don't Repeat Yourself
> Wiederhole dich nicht im Code. Nutze Funktionen und Variablen.

### KISS — Keep It Simple, Stupid
> Einfach ist besser als komplex. Nicht extrem abkürzen.

### YAGNI — You Ain't Gonna Need It
> Baue nur, was JETZT gebraucht wird. Nicht zukünftige Features vorbereiten.

---

## 🔧 Refactoring

**Refactoring** = Code verbessern ohne das Verhalten zu ändern.

### Wann refactorn?

| Zeitpunkt | Beschreibung |
|-----------|-------------|
| 🚩 **Code Smells erkannt** | Warnsignale im Code entdeckt |
| 🔀 **Vor dem Merge** | Code sauber halten |
| 🔄 **Iterativ/inkrementell** | Kleine Schritte, nicht alles auf einmal |
| 🏕️ **Pfadfinder-Regel** | "Hinterlasse den Code besser als du ihn vorgefunden hast" |

### Beispiele

| Problem | Lösung |
|---------|--------|
| Lange Methode | In mehrere kleine aufteilen |
| Duplizierter Code | In Funktion auslagern |
| Magische Zahlen | Konstanten definieren |

---

> 💡 **IHK-Tipp:** "Was sind Code Smells und wie entfernt man sie?" — Warnsignale (lange Methoden, Error Hiding, etc.). Entfernen durch Refactoring: Code verbessern ohne Verhalten zu ändern.`
    },

    // --- Lektion 8: Quiz ---
    {
      id: "sq-8",
      title: "Wissenstest: Software-Qualitätsstandards",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Software-Qualitätsstandards

Teste dein Wissen über Qualitätsstandards, Design Patterns und Testverfahren!`,
    },
  ],
};
