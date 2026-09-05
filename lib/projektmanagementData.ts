import { Module } from "./types";

// ============================================================================
// IHK "Projektmanagement" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const projektmanagementModule: Module = {
  id: "ihk-projektmanagement",
  slug: "ihk-projektmanagement",
  title: "Projektmanagement",
  description: "IHK IT-Handbuch: Klassisch & Agil, Scrum, DIN 69901, Magisches Dreieck, EVA, SMART, Stakeholder-Analyse",
  icon: "📋",
  color: "#F59E0B",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Projektmanagement (IHK)

### Was ist ein Projekt?
- Klare Zielvorgabe, Einmaligkeit, Zeitliche Befristung
- Komplexität, Interdisziplinär, Risikobehaftet

### Magisches Dreieck
- **Qualität**, **Budget**, **Zeit** — Spannungsfeld
- Wenn ein Punkt schwächelt, muss ein anderer ausgleichen

### SMART-Ziele
- **S**pezifisch, **M**essbar, **A**nspruchsvoll, **R**ealistisch, **T**erminiert

### DIN 69901 Phasen
1. Initiierung
2. Definition
3. Planung
4. Steuerung
5. Abschluss

### Klassisch vs. Agil
| Klassisch | Agil |
|-----------|------|
| Wasserfall, V-Modell | Scrum, Kanban |
| Feste Phasen | Iterativ |
| Dokumentation | Funktionierende Software |

### Scrum
- **Rollen:** Product Owner, Scrum Master, Team
- **Events:** Sprint Planning, Daily, Review, Retrospektive
- **Artefakte:** Backlog, Sprint Backlog, Inkrement

### EVA (Earned Value Analysis)
- PV (Planned Value), EV (Earned Value), AC (Actual Cost)
- CV = EV - AC, SV = EV - PV
- CPI = EV/AC, SPI = EV/PV

### Methoden
- FMEA, SWOT, Ishikawa, Kraftfeldanalyse
- Stakeholder-Analyse, Nutzwertanalyse`,

  lessons: [
    // --- Lektion 1: Was ist ein Projekt? ---
    {
      id: "pm-1",
      title: "Was ist ein Projekt?",
      duration: "10 min",
      type: "text",
      content: `## Was ist ein Projekt?

> In diesem Modul lernst du die Grundlagen des Projektmanagements kennen — vom Magischen Dreieck über SMART-Ziele bis zu Scrum und Analyse-Methoden. Die IHK prüft sowohl klassisches (DIN 69901, Wasserfall) als auch agiles PM — und du brauchst beides!

> Stakeholder und Anforderungen spielen auch im Modul "UX & Interaction Design" eine zentrale Rolle — dort aus der Perspektive des Nutzererlebnisses.

Ein Projekt ist eine **zeitlich befristete, einmalige Aufgabe** mit klaren Zielen und begrenzten Ressourcen.

---

## 📋 Projekteigenschaften

| Eigenschaft | Beschreibung | Beispiel |
|-------------|-------------|----------|
| 🎯 **Klare Zielvorgabe** | Definiertes Ergebnis | "App fertig bis März" |
| 🔄 **Einmaligkeit** | Nie so gemacht | Neues Produkt entwickeln |
| ⏰ **Zeitliche Befristung** | Start und Ende | 6 Monate |
| 🧩 **Komplexität** | Viele Variablen | Technik, Team, Budget |
| 👥 **Interdisziplinär** | Verschiedene Kompetenzen | Entwickler, Designer, Tester |
| ⚠️ **Risikobehaftet** | Unsicherheit | Technologie, Markt |

---

## 👥 Stakeholder

**Stakeholder** sind alle Personen oder Gruppen, die ein Interesse am Projekt haben oder von dessen Ergebnissen betroffen sind.

### Beispiele
| Stakeholder | Interesse |
|-------------|-----------|
| 👔 **Auftraggeber** | Ergebnis, Budget, Zeit |
| 👨‍💻 **Entwickler** | Technische Umsetzung |
| 👤 **Nutzer** | Funktion, Usability |
| 🏢 **Management** | ROI, Strategie |
| 📜 **Gesetzgeber** | Compliance, DSGVO |

---

## 📁 Projektakte

Die **Projektakte** ist das "heilige Dokument" eines Projekts — sie enthält ALLES:

| Inhalt | Beschreibung |
|--------|-------------|
| 📄 **Lastenheft, Pflichtenheft** | Anforderungen und Umsetzungsplan |
| 📅 **Zeitpläne, Budget** | Termine und Kostenrahmen |
| ⚠️ **Risikoanalyse** | Identifizierte Risiken und Gegenmaßnahmen |
| 📝 **Protokolle, Entscheidungen** | Dokumentation aller Meetings |
| 📋 **Abschlussbericht** | Ergebnisse und Lessons Learned |

> ⚠️ Die Projektakte kommt am Ende ins **Archiv** und ist nicht mehr anpassbar!

---

## 🏢 Organisationsformen

| Form | Beschreibung |
|------|-------------|
| 📊 **Linienorganisation** | Klare Hierarchie (Chef → Abteilung → Mitarbeiter) |
| 🔀 **Matrixorganisation** | Mitarbeiter berichten an Linie UND Projekt |
| 📋 **Stablinienorganisation** | Stab berät die Linie |

---

> 💡 **IHK-Tipp:** "Was sind die Eigenschaften eines Projekts?" — Klare Zielvorgabe, Einmaligkeit, Zeitliche Befristung, Komplexität, Interdisziplinär, Risikobehaftet.

---

> Jetzt weißt du, was ein Projekt ist. Aber woran muss man sich halten? In der nächsten Lektion lernst du das **Magische Dreieck** kennen — Qualität, Budget und Zeit im Spannungsfeld.`
    },

    // --- Lektion 2: Magisches Dreieck ---
    {
      id: "pm-2",
      title: "Das Magische Dreieck",
      duration: "12 min",
      type: "interactive",
      interactive: "magicTriangle",
      content: `## Das Magische Dreieck — Qualität, Budget, Zeit

> In der letzten Lektion hast du gelernt, was ein Projekt ist und wer daran beteiligt ist. Jetzt kommt das wichtigste Modell für jedes Projekt: das **Magische Dreieck**. Es beschreibt das Spannungsfeld, in dem sich jedes Projekt bewegt.

Das **Magische Dreieck** beschreibt das Spannungsfeld, in dem sich jedes Projekt bewegt. Die drei Eckpunkte sind **voneinander abhängig**.

---

## 📐 Die drei Eckpunkte

<svg viewBox="0 -30 400 390" xmlns="http://www.w3.org/2000/svg" style="max-width:400px;margin:1rem auto;display:block">
  <defs>
    <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.15"/>
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.15"/>
    </linearGradient>
  </defs>
  <polygon points="200,30 50,300 350,300" fill="url(#triGrad)" stroke="#60a5fa" stroke-width="2.5"/>
  <line x1="200" y1="180" x2="50" y2="300" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <line x1="200" y1="180" x2="350" y2="300" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <line x1="200" y1="180" x2="200" y2="30" stroke="#94a3b8" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>
  <circle cx="200" cy="30" r="36" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="200" y="26" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">✅ Qualität</text>
  <text x="200" y="42" text-anchor="middle" fill="#64748b" font-size="10">Wie gut?</text>
  <circle cx="50" cy="300" r="36" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
  <text x="50" y="296" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">💰 Budget</text>
  <text x="50" y="312" text-anchor="middle" fill="#64748b" font-size="10">Wie viel?</text>
  <circle cx="350" cy="300" r="36" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="350" y="296" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">⏰ Zeit</text>
  <text x="350" y="312" text-anchor="middle" fill="#64748b" font-size="10">Bis wann?</text>
  <text x="200" y="195" text-anchor="middle" fill="#e2e8f0" font-size="10" font-weight="bold">Spannungsfeld</text>
</svg>

| Eckpunkt | Beschreibung |
|----------|-------------|
| ✅ **Qualität** | Wie gut ist das Ergebnis? |
| 💰 **Budget** | Wie viel Geld steht zur Verfügung? |
| ⏰ **Zeit** | Wann muss es fertig sein? |

---

## ⚖️ Die Regel

> **Wenn ein Punkt schwächelt, muss ein anderer ausgleichen!**

### Beispiele

| Problem | Ausgleich |
|---------|-----------|
| 💰 Budget wird um 50.000€ gekürzt | Qualität senken ODER Zeit verlängern |
| ⏰ Mitarbeiter fällt 3 Wochen aus | Budget erhöhen (externen Dienstleister) ODER Qualität senken |
| ✅ Qualität soll steigen | Mehr Budget ODER mehr Zeit |

---

## 🎯 Praxis-Beispiele

### Budget wird knapp
> Auftraggeber kürzt Budget um 50.000€.
> **Lösung:** Qualität/Zeit anpassen — oder Budget verhandeln.

### Mitarbeiter fällt aus
> Essenzieller Mitarbeiter ist 3 Wochen krank.
> **Lösung:** Externe Unterstützung (Budget) oder Fristen verschieben (Zeit).

### Qualität ist nicht ausreichend
> Tests zeigen zu viele Fehler.
> **Lösung:** Mehr Zeit für Tests oder Budget für zusätzliche Tester.

---

## 📝 Planung verteidigen

> **Einer der anderen beiden Punkte kann den geschwächten Punkt ausgleichen.**

| Problem | Ausgleich |
|---------|----------|
| ⏰ **Zeit** problematisch | Budget erhöhen (mehr Leute) |
| 💰 **Budget** problematisch | Zeit verlängern |
| ✅ **Qualität** problematisch | Mehr Zeit/Budget für Tests |

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Erklären Sie das Magische Dreieck!" — Qualität, Budget, Zeit im Spannungsfeld. Wenn ein Punkt schwächelt, muss ein anderer ausgleichen. Planung muss verteidigt werden.

---

> Das Magische Dreieck zeigt das Spannungsfeld. Aber wie formuliert man überhaupt gute Ziele? In der nächsten Lektion lernst du das **SMART-Modell** kennen — Spezifisch, Messbar, Anspruchsvoll, Realistisch, Terminiert.`
    },

    // // --- Lektion 3: SMART-Ziele ---
    {
      id: "pm-3",
      title: "SMART-Ziele",
      duration: "10 min",
      type: "interactive",
      interactive: "smartGoalBuilder",
      content: `## SMART-Ziele — Ziele richtig formulieren

> In der letzten Lektion hast du das Magische Dreieck kennengelernt — Qualität, Budget und Zeit im Spannungsfeld. Aber wie formuliert man Ziele, die tatsächlich umsetzbar sind? Das **SMART-Modell** gibt dir die Antwort.

Das **SMART-Modell** hilft, Ziele so zu formulieren, dass sie **messbar, realistisch und terminiert** sind.

---

## 📏 Die SMART-Kriterien

| Buchstabe | Bedeutung | Frage | Beispiel |
|-----------|-----------|-------|----------|
| **S** | Spezifisch | Was genau? | "Login-Funktion implementieren" |
| **M** | Messbar | Wie misst man? | "Login funktioniert in <2 Sekunden" |
| **A** | Anspruchsvoll/Akzeptiert | Für wen? | Auftragnehmer: anspruchsvoll, Auftraggeber: attraktiv |
| **R** | Realistisch | Machbar? | Mit den gegebenen Ressourcen umsetzbar |
| **T** | Terminiert | Bis wann? | "Bis 15. März 2026" |

---

## ❌ Schlechte Ziele

| Ziel | Problem |
|------|---------|
| "Ein Shooterspiel erstellen" | Nicht messbar — was bedeutet "fertig"? |
| "Die App soll gut sein" | Nicht spezifisch — was ist "gut"? |
| "Irgendwann fertig werden" | Nicht terminiert — kein Datum |

## ✅ Gute Ziele (SMART)

| Ziel | SMART-Kriterien |
|------|----------------|
| "Login-Funktion mit E-Mail-Validierung bis 15. März implementieren" | S ✅ M ✅ A ✅ R ✅ T ✅ |
| "Ladezeit der Startseite auf unter 2 Sekunden senken bis Q2" | S ✅ M ✅ A ✅ R ✅ T ✅ |

---

## 🔨 Ausprobieren

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Was bedeutet SMART?" — Spezifisch, Messbar, Anspruchsvoll/Akzeptiert, Realistisch, Terminiert. Formuliere ein Beispiel-Ziel!

---

> Du kannst jetzt Ziele SMART formulieren. Aber wie plant und steuert man ein Projekt klassisch? In der nächsten Lektion lernst du die **DIN 69901**, Gantt-Diagramme und die **Earned Value Analyse** kennen.`
    },

    // --- Lektion 4: Klassisches Projektmanagement ---
    {
      id: "pm-4",
      title: "Klassisches Projektmanagement",
      duration: "15 min",
      type: "interactive",
      interactive: "evaCalculator",
      content: `## Klassisches Projektmanagement

> In der letzten Lektion hast du SMART-Ziele kennengelernt. Jetzt schauen wir uns das **klassische Projektmanagement** an — mit den 5 Phasen der DIN 69901, Lastenheft/Pflichtenheft und der Earned Value Analyse.

> Das Lastenheft (WAS) und Pflichtenheft (WIE) beschreiben Anforderungen — das Modul "UX & Interaction Design" zeigt dir, wie du diese Anforderungen mit User Stories und Personas erhebst.

Das klassische PM ist **phasenbasiert** und **dokumentengetrieben**. Es eignet sich für Projekte mit **festen Anforderungen**.

---

## 📊 DIN 69901 — Die 5 Phasen

| Phase | Aufgabe |
|-------|---------|
| 1️⃣ ==Initiierung== | Projektidee, Machbarkeit prüfen |
| 2️⃣ ==Definition== | Ziele, Umfang, Beteiligte festlegen |
| 3️⃣ ==Planung== | Zeitplan, Budget, Ressourcen |
| 4️⃣ ==Steuerung== | Umsetzung überwachen, anpassen |
| 5️⃣ ==Abschluss== | Ergebnis abnehmen, Lessons Learned |

> 💡 **IHK-Merksatz:** "Nennen Sie die 5 Phasen nach DIN 69901" — Initiierung, Definition, Planung, Steuerung, Abschluss. Reihenfolge ist wichtig!

---

## 📋 Projektplanung

### Ablaufplan

| Schritt | Beschreibung |
|---------|-------------|
| 📋 **Phasen definieren** | Arbeitspakete strukturieren |
| 🎯 **Meilensteine setzen** | Wichtige Zwischenziele markieren |
| 👤 **Verantwortlichkeiten** | Wer macht was? |

### Gantt-Diagramm

| Eigenschaft | Beschreibung |
|-------------|-------------|
| 📊 **Visuelle Darstellung** | Zeitplan als Balkendiagramm |
| ⏱️ **Balken** | Zeigen Dauer der Arbeitspakete |
| 🔗 **Abhängigkeiten** | Verknüpfungen zwischen Aufgaben sichtbar |

### Netzplantechnik

| Kürzel | Bedeutung |
|--------|----------|
| **FAZ** | Frühester Anfangszeitpunkt |
| **FEZ** | Frühester Endzeitpunkt |
| **SAZ** | Spätester Anfangszeitpunkt |
| **SEZ** | Spätester Endzeitpunkt |
| **Pufferzeit** | SAZ - FAZ |
| **Kritischer Pfad** | Pufferzeit = 0 |

---

## 📄 Lastenheft vs. Pflichtenheft

| | Lastenheft | Pflichtenheft |
|---|---|---|
| **Wer** | Auftraggeber | Auftragnehmer |
| **Was** | WAS soll gemacht werden | WIE wird es gemacht |
| **Inhalt** | Anforderungen, Ziele | Technische Lösung |
| **Zeitpunkt** | Vor dem Projekt | Nach der Beauftragung |

> 💡 **Merke:** Lastenheft = WAS (Auftraggeber). Pflichtenheft = WIE (Auftragnehmer).

---

## 📊 Earned Value Analyse (EVA)

Die EVA misst **Projektfortschritt** im Vergleich zum Plan.

### Die drei Grundwerte
| Wert | Bedeutung |
|------|-----------|
| **PV** (Planned Value) | Was geplant war |
| **EV** (Earned Value) | Was tatsächlich erreicht wurde |
| **AC** (Actual Cost) | Was tatsächlich gekostet hat |

### Kennzahlen
| Formel | Bedeutung |
|--------|-----------|
| **CV** = EV - AC | Kostenabweichung (+ = unter Budget) |
| **SV** = EV - PV | Terminabweichung (+ = schneller) |
| **CPI** = EV / AC | Kosteneffizienz (>1 = gut) |
| **SPI** = EV / PV | Termineffizienz (>1 = gut) |

### Beispiel

> **Geplant (PV):** 100.000€ für 10 Features
> **Tatsächlich (EV):** 8 Features fertig = 80.000€
> **Tatsächliche Kosten (AC):** 90.000€
>
> **CV** = 80.000 − 90.000 = **−10.000** (über Budget!)
> **CPI** = 80.000 / 90.000 = **0,89** (ineffizient!)

---

## 🔨 EVA ausprobieren

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Lastenheft und Pflichtenheft?" — Lastenheft = WAS (Auftraggeber), Pflichtenheft = WIE (Auftragnehmer).

---

> Das klassische PM funktioniert gut bei festen Anforderungen. Aber was, wenn sich Anforderungen ändern? In der nächsten Lektion vertiefen wir die **DIN 69901** — und danach kommt das agile Projektmanagement mit Scrum.`
    },

    // --- Lektion 5: DIN 69901 vertieft ---
    {
      id: "pm-5",
      title: "DIN 69901 — Projektphasen vertieft",
      duration: "15 min",
      type: "text",
      content: `## DIN 69901 — Die Projektphasen im Detail

> In der letzten Lektion hast du die 5 Phasen der DIN 69901 als Überblick kennengelernt. Jetzt gehen wir tiefer: Was genau passiert in jeder Phase? Welche Dokumente entstehen? Und was prüft die IHK?

Die **DIN 69901** ist die deutsche Norm für Projektmanagement. Sie definiert den **Lebenszyklus** eines Projekts in 5 Phasen — von der Idee bis zum Abschluss.

---

## Phase 1: Initiierung 🚀

**Ziel:** Projektidee bewerten und Machbarkeit prüfen.

| Aufgabe | Beschreibung |
|---------|-------------|
| **Bedarfsanalyse** | Warum ist das Projekt nötig? |
| **Machbarkeitsstudie** | Technisch, wirtschaftlich, zeitlich realistisch? |
| **Projektauftrag** | Erstes Dokument: Wer, was, warum, bis wann? |
| **Stakeholder identifizieren** | Wer ist betroffen? Wer entscheidet? |

> 💡 **Merke:** Ohne Projektauftrag kein Projekt! Er ist die **Grundlage** für alles Weitere.

---

## Phase 2: Definition 📋

**Ziel:** Projektrahmen klar abstecken.

| Aufgabe | Beschreibung |
|---------|-------------|
| **Ziele definieren** | SMART-Ziele formulieren (siehe Lektion 2) |
| **Umfang festlegen** | Was gehört dazu, was NICHT? (Scope) |
| **Risiken analysieren** | Was kann schiefgehen? Gegenmaßnahmen? |
| **Stakeholder-Analyse** | Wer hat welchen Einfluss? (siehe Lektion 3) |

**Ergebnis:** **Lastenheft** (vom Auftraggeber) — WAS soll gemacht werden?

---

## Phase 3: Planung 📅

**Ziel:** Detaillierten Plan erstellen.

| Aufgabe | Werkzeug |
|---------|----------|
| **Ablaufplanung** | Gantt-Diagramm, Netzplantechnik |
| **Ressourcenplanung** | Wer macht was? Budget? |
| **Terminplanung** | Meilensteine, Abhängigkeiten |
| **Kostenplanung** | Budget schätzen, EVA (siehe Lektion 4) |

**Ergebnis:** **Pflichtenheft** (vom Auftragnehmer) — WIE wird es gemacht?

### Netzplantechnik — Kritischer Pfad

| Begriff | Bedeutung |
|---------|-----------|
| **FAZ** | Frühester Anfangszeitpunkt |
| **FEZ** | Frühester Endzeitpunkt |
| **SAZ** | Spätester Anfangszeitpunkt |
| **SEZ** | Spätester Endzeitpunkt |
| **Pufferzeit** | SAZ − FAZ (= 0 auf kritischem Pfad) |

> 💡 **IHK-Tipp:** Der **kritische Pfad** ist die längste Kette von Aktivitäten ohne Puffer. Verzögerungen hier verschieben das GESAMTE Projekt!

---

## Phase 4: Steuerung 🎮

**Ziel:** Umsetzung überwachen und steuern.

| Aufgabe | Beschreibung |
|---------|-------------|
| **Fortschritt messen** | EVA (Earned Value Analyse) |
| **Abweichungen erkennen** | Ist ≠ Soll? Warum? |
| **Nachsteuern** | Pläne anpassen, Ressourcen umverteilen |
| **Reporting** | Statusberichte an Stakeholder |

> EVA berechnet den **Fertigstellungsgrad** eines Projekts — die Formeln (PV, EV, AC, SPI, CPI) hast du in der vorigen Lektion kennengelernt.

---

## Phase 5: Abschluss ✅

**Ziel:** Projekt formell abschließen.

| Aufgabe | Beschreibung |
|---------|-------------|
| **Abnahme** | Auftraggeber prüft Ergebnis |
| **Dokumentation** | Technische Docs, Benutzerhandbuch |
| **Lessons Learned** | Was lief gut? Was besser machen? |
| **Ressourcen freigeben** | Team, Budget, Infrastruktur |

> 💡 **Merke:** "Lessons Learned" ist IHK-Prüfungsfavorit! Beschreibe immer: Was war gut? Was war schlecht? Was nehmen wir mit?

---

## 📋 Zusammenfassung

Die DIN 69901 definiert 5 Phasen mit klar abgegrenzten Aufgaben und Dokumenten:

| Phase | Kernfrage | Wichtigstes Dokument |
|-------|-----------|---------------------|
| **Initiierung** | Warum? | Projektauftrag |
| **Definition** | Was? | Lastenheft |
| **Planung** | Wie? Wann? | Pflichtenheft, Gantt |
| **Steuerung** | Läuft es gut? | EVA-Bericht |
| **Abschluss** | Fertig? | Lessons Learned |

---

> 💡 **IHK-Tipp:** "Nennen Sie die 5 Phasen der DIN 69901!" — Initiierung, Definition, Planung, Steuerung, Abschluss. Ordne jeder Phase die passenden Dokumente und Werkzeuge zu.

---

> Du kennst jetzt das klassische PM in der Tiefe. Aber was, wenn sich Anforderungen ständig ändern? In der nächsten Lektion kommt das **agile Projektmanagement mit Scrum** — der Gegenentwurf zum Wasserfallmodell.`
    },

    // --- Lektion 6: Agiles Projektmanagement & Scrum ---
    {
      id: "pm-6",
      title: "Agiles Projektmanagement & Scrum",
      duration: "20 min",
      type: "interactive",
      interactive: "scrumBoard",
      visuals: [{ type: "scrumCycle", position: "top" }],
      content: `## Agiles Projektmanagement

> In der letzten Lektion hast du das klassische PM mit DIN 69901 und EVA kennengelernt. Jetzt kommt der Gegenentwurf: **Agiles Projektmanagement mit Scrum** — iterativ, flexibel und heute der Industriestandard.

> Das Product Backlog enthält **User Stories** — das Format "Als [Rolle] möchte ich [Ziel]" lernst du im Modul "UX & Interaction Design" kennen. Und Sprints erinnern an **Feature-Branches** im Modul "Versionsmanagement mit Git".

Agiles PM ist **iterativ** und **inkrementell** — statt alles am Ende zu liefern, wird in kurzen Zyklen (Sprints) gearbeitet.

---

## 📜 Das Agile Manifest

| Wertvoller | weniger wertvoll |
|------------|------------------|
| **Individuen und Interaktionen** | Prozesse und Werkzeuge |
| **Funktionierende Software** | umfassende Dokumentation |
| **Zusammenarbeit mit dem Kunden** | Vertragsverhandlung |
| **Reagieren auf Veränderung** | das Befolgen eines Plans |

> 💡 **Merke:** Die rechte Seite hat Wert — aber die linke Seite hat MEHR Wert!

---

## 🏃 Scrum — Das populärste agile Framework

### Rollen

| Rolle | Aufgabe |
|-------|---------|
| 🏆 **Product Owner** | Verbindung zum Kunden, Backlog pflegen, Prioritäten setzen |
| 🛡️ **Scrum Master** | Berater, Prozess-Sicherung, Hindernisse beseitigen |
| 👥 **Cross-functional Team** | Selbstorganisiert, eigenverantwortlich, 5-9 Mitglieder |

### Scrum-Events

| Event | Zweck | Zeit |
|-------|-------|------|
| 📋 **Sprint Planning** | Was schaffen wir im Sprint? | 2-4 Wochen Sprint |
| 🌅 **Daily Standup** | Kurzer Status (15 min) | Täglich |
| 🎯 **Sprint Review** | Ergebnis dem Kunden zeigen | Sprint-Ende |
| 🔄 **Retrospektive** | Prozess verbessern | Sprint-Ende |

### Daily Standup — Die 3 Fragen
1. Was habe ich gestern gemacht?
2. Was mache ich heute?
3. Was hindert mich?

### Definition of Done — Wann ist ein Arbeitspaket "fertig"?

| Kriterium | Beschreibung |
|-----------|-------------|
| ✅ **Code geschrieben** | Implementierung abgeschlossen |
| ✅ **Tests bestanden** | Unit- und Integrationstests grün |
| ✅ **Dokumentation aktualisiert** | README, Inline-Kommentare |
| ✅ **Review durchgeführt** | Code von Teammitglied geprüft |
| ✅ **Keine bekannten Bugs** | Alle Issues geschlossen |

---

## 📋 Scrum Artefakte

| Artefakt | Beschreibung | Verantwortlich |
|----------|-------------|----------------|
| **Product Backlog** | Liste aller Anforderungen (User Stories), priorisiert nach Wert | Product Owner |
| **Sprint Backlog** | Arbeitspakete für den aktuellen Sprint, vom Team ausgewählt | Entwicklerteam |
| **Inkrement** | Funktionierende Software am Sprint-Ende, muss Definition of Done erfüllen | Gesamtes Team |

---

## 📊 Scrum Board

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;margin:1rem auto;display:block">
  <defs>
    <filter id="shadow"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/></filter>
  </defs>
  <rect x="0" y="0" width="700" height="220" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="70" y="28" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">BACKLOG</text>
  <text x="210" y="28" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">TO DO</text>
  <text x="350" y="28" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">IN PROGRESS</text>
  <text x="490" y="28" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">REVIEW</text>
  <text x="630" y="28" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="bold">DONE</text>
  <line x1="140" y1="10" x2="140" y2="210" stroke="#334155" stroke-width="1"/>
  <line x1="280" y1="10" x2="280" y2="210" stroke="#334155" stroke-width="1"/>
  <line x1="420" y1="10" x2="420" y2="210" stroke="#334155" stroke-width="1"/>
  <line x1="560" y1="10" x2="560" y2="210" stroke="#334155" stroke-width="1"/>
  <rect x="20" y="45" width="100" height="40" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="70" y="70" text-anchor="middle" fill="#c7d2fe" font-size="10">User Story 3</text>
  <rect x="20" y="95" width="100" height="40" rx="6" fill="#1e293b" stroke="#6366f1" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="70" y="120" text-anchor="middle" fill="#c7d2fe" font-size="10">User Story 4</text>
  <rect x="160" y="45" width="100" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="210" y="70" text-anchor="middle" fill="#fcd34d" font-size="10">Task 4</text>
  <rect x="300" y="45" width="100" height="40" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="350" y="70" text-anchor="middle" fill="#93c5fd" font-size="10">Task 2</text>
  <rect x="440" y="45" width="100" height="40" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="490" y="70" text-anchor="middle" fill="#d8b4fe" font-size="10">Task 1</text>
  <rect x="580" y="45" width="100" height="40" rx="6" fill="#064e3b" stroke="#10b981" stroke-width="1.5" filter="url(#shadow)"/>
  <text x="630" y="70" text-anchor="middle" fill="#6ee7b7" font-size="10">✅ Fertig</text>
</svg>

---

## ⚔️ Klassisch vs. Agil

| | Klassisch | Agil |
|---|---|---|
| **Anforderungen** | Fest | Sich ändernd |
| **Planung** | Am Anfang | Jeder Sprint |
| **Dokumentation** | Umfangreich | Minimal |
| **Kundenkontakt** | Selten | Ständig |
| **Risiko** | Späte Fehlererkennung | Frühe Fehlererkennung |
| **Beispiel** | Hausbau | App-Entwicklung |

---

> 💡 **IHK-Tipp:** "Erklären Sie Scrum!" — 3 Rollen (PO, SM, Team), 4 Events (Planning, Daily, Review, Retro), 3 Artefakte (Backlog, Sprint Backlog, Inkrement). Iterativ in 2-4 Wochen Sprints.

---

> Du kennst jetzt klassisches und agiles PM. In der letzten inhaltlichen Lektion lernst du **Analyse-Methoden** kennen — SWOT, Ishikawa, Stakeholder-Analyse und mehr.`
    },

    // --- Lektion 7: Analyse-Methoden ---
    {
      id: "pm-7",
      title: "Analyse-Methoden für Projekte",
      duration: "15 min",
      type: "text",
      content: `## Analyse-Methoden — Werkzeuge für das Projektmanagement

> In der letzten Lektion hast du Scrum kennengelernt — das agile Framework für die Umsetzung. Jetzt geht es um die **Werkzeuge**, mit denen man Projekte analysiert und verbessert: SWOT, Ishikawa, Stakeholder-Analyse und mehr.

> Die Stakeholder-Analyse zeigt dir, wer am Projekt beteiligt ist — im Modul "UX & Interaction Design" lernst du, wie du die Bedürfnisse dieser Stakeholder mit Personas und User Stories erfasst.

Es gibt viele Methoden, um Projekte zu analysieren und zu verbessern. Hier die **wichtigsten für die IHK**.

---

## 📊 SWOT-Analyse

Analysiert **Stärken, Schwächen, Chancen und Risiken** eines Projekts.

<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="max-width:500px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="500" height="220" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="130" y="10" width="110" height="35" rx="6" fill="#3b82f6" fill-opacity="0.2"/>
  <text x="185" y="33" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Positiv</text>
  <rect x="250" y="10" width="110" height="35" rx="6" fill="#ef4444" fill-opacity="0.2"/>
  <text x="305" y="33" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Negativ</text>
  <rect x="10" y="60" width="110" height="65" rx="6" fill="#10b981" fill-opacity="0.15"/>
  <text x="65" y="90" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">Intern</text>
  <rect x="130" y="60" width="110" height="65" rx="8" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1.5"/>
  <text x="185" y="90" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">Stärken</text>
  <text x="185" y="112" text-anchor="middle" fill="#64748b" font-size="12">💪</text>
  <rect x="250" y="60" width="110" height="65" rx="8" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="305" y="90" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold">Schwächen</text>
  <text x="305" y="112" text-anchor="middle" fill="#64748b" font-size="12">⚠️</text>
  <rect x="10" y="140" width="110" height="65" rx="6" fill="#8b5cf6" fill-opacity="0.15"/>
  <text x="65" y="170" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold">Extern</text>
  <rect x="130" y="140" width="110" height="65" rx="8" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="185" y="170" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Chancen</text>
  <text x="185" y="192" text-anchor="middle" fill="#64748b" font-size="12">🎯</text>
  <rect x="250" y="140" width="110" height="65" rx="8" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="305" y="170" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Risiken</text>
  <text x="305" y="192" text-anchor="middle" fill="#64748b" font-size="12">🚨</text>
</svg>

**Beispiel:**
| | Positiv | Negativ |
|---|---|---|
| **Intern** | Erfahrenes Team | Wenig Budget |
| **Extern** | Wachsender Markt | Starke Konkurrenz |

---

## 🐟 Ishikawa-Diagramm (Ursache-Wirkung)

Visualisiert **Ursachen für ein Problem** — sieht aus wie ein Fischgräten-Diagramm.

<svg viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="700" height="220" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <line x1="100" y1="110" x2="580" y2="110" stroke="#94a3b8" stroke-width="3"/>
  <polygon points="580,100 600,110 580,120" fill="#94a3b8"/>
  <rect x="610" y="85" width="80" height="50" rx="8" fill="#ef4444" fill-opacity="0.25" stroke="#ef4444" stroke-width="2"/>
  <text x="650" y="115" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Problem</text>
  <line x1="180" y1="35" x2="240" y2="105" stroke="#3b82f6" stroke-width="2"/>
  <rect x="30" y="15" width="140" height="35" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
  <text x="100" y="38" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">👤 Mensch</text>
  <line x1="340" y1="35" x2="370" y2="105" stroke="#10b981" stroke-width="2"/>
  <rect x="220" y="15" width="110" height="35" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
  <text x="275" y="38" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">⚙️ Maschine</text>
  <line x1="480" y1="35" x2="460" y2="105" stroke="#f59e0b" stroke-width="2"/>
  <rect x="380" y="15" width="90" height="35" rx="6" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1"/>
  <text x="425" y="38" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold">📦 Material</text>
  <line x1="180" y1="185" x2="240" y2="115" stroke="#8b5cf6" stroke-width="2"/>
  <rect x="30" y="170" width="140" height="35" rx="6" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1"/>
  <text x="100" y="193" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold">📋 Methode</text>
  <line x1="340" y1="185" x2="370" y2="115" stroke="#ec4899" stroke-width="2"/>
  <rect x="220" y="170" width="110" height="35" rx="6" fill="#ec4899" fill-opacity="0.2" stroke="#ec4899" stroke-width="1"/>
  <text x="275" y="193" text-anchor="middle" fill="#f9a8d4" font-size="13" font-weight="bold">📏 Messung</text>
  <line x1="480" y1="185" x2="460" y2="115" stroke="#6366f1" stroke-width="2"/>
  <rect x="380" y="170" width="90" height="35" rx="6" fill="#6366f1" fill-opacity="0.2" stroke="#6366f1" stroke-width="1"/>
  <text x="425" y="193" text-anchor="middle" fill="#a5b4fc" font-size="13" font-weight="bold">🌍 Milieu</text>
</svg>

**Kategorien (6M):**
- **M**ensch, **M**aschine, **M**aterial
- **M**ethode, **M**essung, **M**ilieu

---

## 📋 Stakeholder-Analyse

Identifiziert und bewertet alle **Personen mit Interesse** am Projekt.

### Matrix

<svg viewBox="0 0 520 250" xmlns="http://www.w3.org/2000/svg" style="max-width:520px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="520" height="250" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="15" y="130" text-anchor="middle" fill="#94a3b8" font-size="13" transform="rotate(-90,15,130)">Einfluss</text>
  <text x="300" y="245" text-anchor="middle" fill="#94a3b8" font-size="13">Interesse →</text>
  <rect x="70" y="15" width="190" height="100" rx="8" fill="#ef4444" fill-opacity="0.15" stroke="#ef4444" stroke-width="1.5"/>
  <text x="165" y="55" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Manage Closely</text>
  <text x="165" y="78" text-anchor="middle" fill="#64748b" font-size="12">🏆 Hoher Einfluss</text>
  <text x="165" y="98" text-anchor="middle" fill="#64748b" font-size="12">+ Hohes Interesse</text>
  <rect x="270" y="15" width="190" height="100" rx="8" fill="#f59e0b" fill-opacity="0.15" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="365" y="55" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold">Keep Satisfied</text>
  <text x="365" y="78" text-anchor="middle" fill="#64748b" font-size="12">📊 Hoher Einfluss</text>
  <text x="365" y="98" text-anchor="middle" fill="#64748b" font-size="12">+ Geringes Interesse</text>
  <rect x="70" y="130" width="190" height="100" rx="8" fill="#3b82f6" fill-opacity="0.15" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="165" y="170" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Monitor</text>
  <text x="165" y="193" text-anchor="middle" fill="#64748b" font-size="12">👁️ Geringer Einfluss</text>
  <text x="165" y="213" text-anchor="middle" fill="#64748b" font-size="12">+ Geringes Interesse</text>
  <rect x="270" y="130" width="190" height="100" rx="8" fill="#10b981" fill-opacity="0.15" stroke="#10b981" stroke-width="1.5"/>
  <text x="365" y="170" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">Keep Informed</text>
  <text x="365" y="193" text-anchor="middle" fill="#64748b" font-size="12">📢 Geringer Einfluss</text>
  <text x="365" y="213" text-anchor="middle" fill="#64748b" font-size="12">+ Hohes Interesse</text>
</svg>

---

## ⚡ Kraftfeldanalyse

Analysiert **treibende** und **hemmende Kräfte** bei Veränderungen.

| Treibende Kräfte | Hemmende Kräfte |
|-------------------|-----------------|
| Neue Technologie | Angst vor Veränderung |
| Kundennachfrage | Fehlendes Budget |
| Wettbewerbsvorteil | Alte Prozesse |

---

## 🔍 Five Why (5 Warum?)

Fragt **5 Mal "Warum?"** bis zur eigentlichen Ursache.

<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="max-width:700px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="700" height="200" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <rect x="15" y="15" width="180" height="40" rx="6" fill="#ef4444" fill-opacity="0.2" stroke="#ef4444" stroke-width="1.5"/>
  <text x="105" y="40" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">💥 App stürzt ab</text>
  <text x="205" y="40" fill="#64748b" font-size="12">Warum?</text>
  <polygon points="255,35 270,28 270,42" fill="#64748b"/>
  <rect x="280" y="15" width="160" height="40" rx="6" fill="#f59e0b" fill-opacity="0.2" stroke="#f59e0b" stroke-width="1"/>
  <text x="360" y="40" text-anchor="middle" fill="#fcd34d" font-size="12">NullPointer Exception</text>
  <text x="450" y="40" fill="#64748b" font-size="12">Warum?</text>
  <polygon points="500,35 515,28 515,42" fill="#64748b"/>
  <rect x="525" y="15" width="150" height="40" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1"/>
  <text x="600" y="40" text-anchor="middle" fill="#93c5fd" font-size="12">Variable = null</text>
  <rect x="15" y="70" width="180" height="40" rx="6" fill="#8b5cf6" fill-opacity="0.2" stroke="#8b5cf6" stroke-width="1"/>
  <text x="105" y="95" text-anchor="middle" fill="#c4b5fd" font-size="12">DB liefert null</text>
  <text x="205" y="95" fill="#64748b" font-size="12">Warum?</text>
  <polygon points="255,90 270,83 270,97" fill="#64748b"/>
  <rect x="280" y="70" width="160" height="40" rx="6" fill="#10b981" fill-opacity="0.2" stroke="#10b981" stroke-width="1"/>
  <text x="360" y="95" text-anchor="middle" fill="#6ee7b7" font-size="12">Verbindung fehlgeschlagen</text>
  <text x="450" y="95" fill="#64748b" font-size="12">Warum?</text>
  <polygon points="500,90 515,83 515,97" fill="#64748b"/>
  <rect x="525" y="70" width="150" height="40" rx="6" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
  <text x="600" y="95" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">🎯 Server down!</text>
  <text x="350" y="140" text-anchor="middle" fill="#94a3b8" font-size="13">5× Warum? → eigentliche Ursache finden</text>
  <text x="350" y="165" text-anchor="middle" fill="#64748b" font-size="12">Nicht beim ersten Grund aufhören — weiterfragen!</text>
</svg>

---

## 📊 Nutzwertanalyse

Bewertet **Optionen nach gewichteten Kriterien**.

| Kriterium | Gewicht | Option A | Option B |
|-----------|---------|----------|----------|
| Kosten | 30% | 8 | 6 |
| Zeit | 25% | 7 | 9 |
| Qualität | 45% | 9 | 7 |
| **Gesamt** | | **8,1** | **7,3** |

---

> 💡 **IHK-Tipp:** "Erklären Sie die SWOT-Analyse!" — Stärken, Schwächen (intern), Chancen, Risiken (extern). Hilft bei der strategischen Bewertung eines Projekts.

---

> Das war die letzte inhaltliche Lektion zu Projektmanagement! Du hast von den Grundlagen über klassisches und agiles PM bis zu den Analyse-Methoden alles kennengelernt. Jetzt kannst du dein Wissen im Quiz testen!`
    },

    // --- Lektion 8: Quiz ---
    {
      id: "pm-8",
      title: "Wissenstest: Projektmanagement",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Projektmanagement

> Du hast alle Lektionen zu Projektmanagement durchgearbeitet — vom Magischen Dreieck über SMART-Ziele, DIN 69901, Scrum bis zu den Analyse-Methoden. Jetzt ist es Zeit, dein Wissen zu testen!

Teste dein Wissen über Projektmanagement-Methoden!`,
    },
  ],
};
