import { Module } from "./types";

// ============================================================================
// IHK "UX & Interaction Design" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const uxModule: Module = {
  id: "ihk-ux",
  slug: "ihk-ux",
  title: "UX & Interaction Design",
  description: "IHK IT-Handbuch: Nielsen-Heuristiken, Personas, User Stories, Design Sprint, Prototyping, Usability-Tests, Anforderungsarten",
  icon: "🎨",
  color: "#EC4899",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: UX & Interaction Design (IHK)

### Nielsens 10 Usability-Heuristiken
1. Sichtbarkeit des Systemstatus
2. Übereinstimmung mit der realen Welt
3. Kontrolle und Freiheit des Nutzers
4. Konsistenz und Standards
5. Fehlervermeidung
6. Wiedererkennen statt Erinnern
7. Flexibilität und Effizienz
8. Ästhetisches und minimalistisches Design
9. Fehler erkennen, diagnostizieren und beheben
10. Hilfe und Dokumentation

### Persona
- Fiktiver Nutzer, repräsentativ für eine Zielgruppe
- Hilft bei der Produktgestaltung
- Enthält: Name, Alter, Beruf, Ziele, Probleme, Kontext

### User Story
- Format: "Als [Rolle] möchte ich [Ziel], um [Nutzen]"
- Beschreibt Funktion aus Nutzersicht

### Anforderungsarten
- **Funktional:** Konkrete Funktionen
- **Nicht-funktional:** Performance, Sicherheit, Usability
- **Technisch:** Technische Voraussetzungen
- **Regulatorisch:** Gesetze, Normen, Richtlinien

### Design Sprint (Google)
1. Understand — Problem verstehen
2. Diverge — Ideen sammeln
3. Converge — Ideen auswählen
4. Prototype — Prototyp bauen
5. Test — Mit Nutzern testen

### Evaluation
- Safety — Schutz vor ungewollten Aktionen
- Learnability — Wie einfach zu erlernen?
- Memorability — Wie gut wiederzuerkennen?`,

  lessons: [
    // --- Lektion 1: Was ist UX? ---
    {
      id: "ux-1",
      title: "Was ist User Experience (UX)?",
      duration: "10 min",
      type: "text",
      content: `## User Experience — Mehr als nur "schön"

> In diesem Modul lernst du, wie man Software nutzerfreundlich gestaltet — von den Grundlagen (Was ist UX?) über bewährte Methoden (Nielsen, Personas, Design Sprint) bis zur systematischen Bewertung von Usability. Ein Klassiker in der IHK-Prüfung!

**User Experience (UX)** beschreibt das **gesamte Erlebnis** eines Nutzers mit einem Produkt — nicht nur wie es aussieht, sondern wie es sich anfühlt, funktioniert und ob es Spaß macht.

---

## 🎯 UX vs. UI

| | UX (User Experience) | UI (User Interface) |
|---|---|---|
| **Fokus** | Gesamterlebnis | Visuelles Design |
| **Fragen** | Ist es nützlich? Intuitiv? Spaßig? | Ist es schön? Konsistent? |
| **Methoden** | Research, Testing, Personas | Farben, Typografie, Layout |
| **Ziel** | Zufriedenheit | Ästhetik |

> 💡 **Merke:** Gute UI ohne gute UX = schönes Produkt, das niemand benutzen will. Gute UX ohne gute UI = funktionales Produkt, das niemand benutzen möchte.

---

## 📊 Warum UX wichtig ist

| Vorteil | Beschreibung |
|---------|-------------|
| 💰 **Kosten senken** | Weniger Support-Anfragen |
| 📈 **Conversion steigern** | Nutzer bleiben länger |
| 😊 **Zufriedenheit** | Nutzer kommen zurück |
| 🏆 **Wettbewerbsvorteil** | Besseres Produkt |

---

## 🧩 Die Dimensionen der Interaktion

| Dimension | Beschreibung | Beispiel |
|-----------|-------------|----------|
| 👆 **Taktil** | Physische Interaktion | Knöpfe, Joystick, Touch |
| 👁️ **Visuell** | Was der Nutzer sieht | Bildschirme, Animationen |
| 🔊 **Auditiv** | Was der Nutzer hört | Töne, Musik, Sprache |
| 📳 **Haptisch** | Was der Nutzer fühlt | Vibration, Widerstand |

---

## 🎮 Micro-Interactions

Kleine, subtile Interaktionen, die das Erlebnis verbessern:

| Typ | Beispiel |
|-----|---------|
| 🖱️ **Hover-Effekte** | Button ändert Farbe beim Darüberfahren |
| 📳 **Haptisches Feedback** | Vibration bei Tastendruck |
| 🔊 **Audio-Feedback** | Klick-Geräusch |
| ✨ **Animationen** | Ladebalken, Übergänge |

> 💡 **Merke:** Micro-Interactions geben dem Nutzer **Feedback** — er weiß, dass das System seine Aktion registriert hat.

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen UX und UI?" — UX = gesamtes Erlebnis (nützlich, intuitiv, Spaßig). UI = visuelles Design (schön, konsistent). UX ist das Dach, UI ist ein Teil davon.

---

> Jetzt weißt du, was UX ist. In der nächsten Lektion lernst du Nielsens 10 Usability-Heuristiken kennen — die wichtigsten Regeln für gutes Interface-Design.`
    },

    // --- Lektion 2: Nielsens Heuristiken ---
    {
      id: "ux-2",
      title: "Nielsens Usability-Heuristiken",
      duration: "20 min",
      type: "interactive",
      interactive: "heuristicEvaluator",
      content: `## Nielsens 10 Usability-Heuristiken

> In der letzten Lektion hast du gelernt, was UX ist und warum sie wichtig ist. Jetzt kommen die **konkreten Regeln**, an denen du jedes Interface messen kannst: Nielsens 10 Usability-Heuristiken. Merke sie dir gut — sie kommen in der Prüfung garantiert dran!

Jakob Nielsens 10 Heuristiken sind die **wichtigsten Regeln** für gutes Interface-Design. Sie sind **prüfungsrelevant** und sollten beim Programmierprojekt angewendet werden!

Im interaktiven Tool unten kannst du jede Heuristik erkunden — mit Erklärung, Gut-/Schlecht-Beispielen und IHK-Tipps.

---

## 🔨 Heuristiken erkunden

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Nennen Sie 5 von Nielsens 10 Heuristiken mit Beispiel!" — Die Heuristiken müssen nicht in dieser Reihenfolge genannt werden, aber mit konkreten Beispielen.

---

> Die Heuristiken sagen uns, WIE ein gutes Interface aussieht. Aber für WEN bauen wir es? In der nächsten Lektion lernst du Personas, Szenarien und User Stories kennen.`
    },

    // --- Lektion 3: Personas & Szenarien ---
    {
      id: "ux-3",
      title: "Personas & Szenarien",
      duration: "12 min",
      type: "text",
      content: `## Personas — Den Nutzer verstehen

> In der letzten Lektion hast du Nielsens 10 Heuristiken kennengelernt — die Regeln für gutes Design. Jetzt geht es um die Menschen dahinter: **Personas** helfen uns, uns in den Nutzer hineinzuversetzen, und **User Stories** beschreiben, was er will.

> User Stories ("Als [Rolle] möchte ich [Ziel]") sind auch im Modul "Projektmanagement" zentral — dort werden sie im Scrum-Product-Backlog gesammelt und priorisiert.

Eine **Persona** ist ein fiktiver Nutzer, der **repräsentativ** für eine Zielgruppe steht. Sie hilft uns, uns in den Nutzer hineinzuversetzen.

---

## 🧑 Was ist eine Persona?

> Stell dir vor, du entwickelst eine App für Ausbilder. Statt "irgendein Nutzer" denkst du an **Marie, 29, frisch im Beruf, ärgert sich über VPLAN**.

### Bestandteile einer Persona

| Element | Beschreibung | Beispiel |
|---------|-------------|----------|
| 📷 **Name & Foto** | Persönlichkeitsgefühl | Marie Hoffmann, 29 |
| 💼 **Beruf** | Kontext | Ausbilderin |
| 🎯 **Ziele** | Was will sie erreichen? | Effizient arbeiten, weniger Fehler |
| 😤 **Probleme** | Was frustriert sie? | Lange Ladezeiten, unintuitive UI |
| 🏆 **Motivation** | Warum nutzt sie das Produkt? | Bessere Arbeitsqualität |

---

## 📖 Szenarien

Ein **Szenario** beschreibt eine **konkrete Situation**, in der eine Persona das Produkt nutzt:

> **Marie** sitzt am Montagmorgen vor dem PC. Sie muss die Ausbildungsnachweise von 15 Azubis prüfen. Sie öffnet VPLAN, wartet 30 Sekunden auf die Ladeseite...

### Elemente eines Szenarios
1. **Kontext:** Wo? Wann? Warum?
2. **Ziel:** Was will die Persona erreichen?
3. **Schritte:** Welche Aktionen führt sie durch?
4. **Ergebnis:** Was ist das gewünschte Ergebnis?

---

## 📝 User Stories

Eine **User Story** beschreibt eine Funktion aus der Sicht des Nutzers:

### Format

<svg viewBox="0 0 580 70" xmlns="http://www.w3.org/2000/svg" style="max-width:580px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="580" height="70" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <text x="30" y="42" fill="#94a3b8" font-size="12">Als</text>
  <rect x="55" y="25" width="90" height="30" rx="6" fill="#3b82f6" fill-opacity="0.25" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="100" y="45" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="bold">[Rolle]</text>
  <text x="160" y="42" fill="#94a3b8" font-size="12">möchte ich</text>
  <rect x="248" y="25" width="90" height="30" rx="6" fill="#10b981" fill-opacity="0.25" stroke="#10b981" stroke-width="1.5"/>
  <text x="293" y="45" text-anchor="middle" fill="#6ee7b7" font-size="11" font-weight="bold">[Ziel]</text>
  <text x="352" y="42" fill="#94a3b8" font-size="12">,</text>
  <text x="370" y="42" fill="#94a3b8" font-size="12">um</text>
  <rect x="395" y="25" width="90" height="30" rx="6" fill="#f59e0b" fill-opacity="0.25" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="440" y="45" text-anchor="middle" fill="#fcd34d" font-size="11" font-weight="bold">[Nutzen]</text>
  <text x="500" y="42" fill="#94a3b8" font-size="12">.</text>
</svg>

### Beispiele

> 👤 **Als Ausbilder** möchte ich **Ausbildungsnachweise online prüfen**, um **Papier zu sparen und schneller zu arbeiten**.

> 👤 **Als Azubi** möchte ich **meinen Fortschritt sehen**, um **motiviert zu bleiben**.

> 👤 **Als Admin** möchte ich **Benutzerrechte verwalten**, um **die Sicherheit zu gewährleisten**.

> 💡 **Merke:** User Stories beschreiben WAS der Nutzer will, nicht WIE es technisch umgesetzt wird.

---

## 🔍 Nutzer evaluieren — Ideen testen

| Methode | Beschreibung | Wann? |
|---------|-------------|-------|
| 🧪 **Usability-Test** | Nutzer führen Aufgaben aus, Beobachtung | Früh & oft |
| 🎤 **Interview** | Offene Fragen zu Erwartungen | Vor der Entwicklung |
| 🔀 **A/B-Test** | Zwei Varianten vergleichen | Nach dem Launch |
| 🖼️ **Prototyping** | Klickbare Mockups testen | Vor der Implementierung |

### Dabei beachten

| Regel | Beschreibung |
|-------|-------------|
| ✅ **Repräsentativ** | Passende Nutzer auswählen |
| ✅ **Klare Ziele** | Vorher definieren, was getestet wird |
| ✅ **Neutral bleiben** | Nutzer nicht beeinflussen! |
| ✅ **Dokumentieren** | Ergebnisse aufschreiben und umsetzen |

---

> 💡 **IHK-Tipp:** "Was ist eine Persona und wozu braucht man sie?" — Fiktiver Nutzer für eine Zielgruppe, hilft bei der Produktgestaltung, da man sich besser in den Nutzer hineinversetzen kann.

---

> Du weißt jetzt, für wen du entwickelst. Aber wie kommt man von der Idee zum Prototyp? In der nächsten Lektion lernst du den **Design Sprint** von Google kennen — in 5 Tagen vom Problem zum getesteten Prototyp.`
    },

    // --- Lektion 4: Design Sprint ---
    {
      id: "ux-4",
      title: "Der Design Sprint (Google)",
      duration: "15 min",
      type: "text",
      content: `## Der Design Sprint — Von der Idee zum Prototyp in 5 Tagen

> In der letzten Lektion hast du Personas und User Stories kennengelernt — du weißt also, für wen und was du entwickelst. Jetzt lernst du eine strukturierte Methode kennen, um schnell von der Idee zum Prototyp zu kommen: den **Design Sprint**.

> Der Design Sprint mit seinen iterativen Phasen (Understand, Diverge, Converge, Prototype, Test) folgt ähnlichen Prinzipien wie agiles Projektmanagement im Modul "Projektmanagement" — dort heißen die Zyklen "Sprints".

Der **Design Sprint** von Google Ventures ist eine strukturierte Methode, um in **5 Tagen** von einem Problem zu einem getesteten Prototyp zu kommen.

---

## 📅 Die 5 Phasen

<svg viewBox="0 0 650 120" xmlns="http://www.w3.org/2000/svg" style="max-width:650px;margin:1rem auto;display:block">
  <rect x="0" y="0" width="650" height="120" rx="12" fill="#0f172a" stroke="#334155" stroke-width="1.5"/>
  <line x1="55" y1="55" x2="595" y2="55" stroke="#334155" stroke-width="2"/>
  <circle cx="55" cy="55" r="22" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6" stroke-width="2"/>
  <text x="55" y="51" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">1</text>
  <text x="55" y="65" text-anchor="middle" fill="#93c5fd" font-size="10">Tag</text>
  <text x="55" y="98" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="bold">Understand</text>
  <text x="55" y="22" text-anchor="middle" fill="#64748b" font-size="11">Problem</text>
  <circle cx="195" cy="55" r="22" fill="#8b5cf6" fill-opacity="0.3" stroke="#8b5cf6" stroke-width="2"/>
  <text x="195" y="51" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="bold">2</text>
  <text x="195" y="65" text-anchor="middle" fill="#c4b5fd" font-size="10">Tag</text>
  <text x="195" y="98" text-anchor="middle" fill="#c4b5fd" font-size="13" font-weight="bold">Diverge</text>
  <text x="195" y="22" text-anchor="middle" fill="#64748b" font-size="11">Ideen</text>
  <circle cx="335" cy="55" r="22" fill="#f59e0b" fill-opacity="0.3" stroke="#f59e0b" stroke-width="2"/>
  <text x="335" y="51" text-anchor="middle" fill="#fcd34d" font-size="14" font-weight="bold">3</text>
  <text x="335" y="65" text-anchor="middle" fill="#fcd34d" font-size="10">Tag</text>
  <text x="335" y="98" text-anchor="middle" fill="#fcd34d" font-size="13" font-weight="bold">Converge</text>
  <text x="335" y="22" text-anchor="middle" fill="#64748b" font-size="11">Auswahl</text>
  <circle cx="475" cy="55" r="22" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
  <text x="475" y="51" text-anchor="middle" fill="#6ee7b7" font-size="14" font-weight="bold">4</text>
  <text x="475" y="65" text-anchor="middle" fill="#6ee7b7" font-size="10">Tag</text>
  <text x="475" y="98" text-anchor="middle" fill="#6ee7b7" font-size="13" font-weight="bold">Prototype</text>
  <text x="475" y="22" text-anchor="middle" fill="#64748b" font-size="11">Bauen</text>
  <circle cx="595" cy="55" r="22" fill="#ef4444" fill-opacity="0.3" stroke="#ef4444" stroke-width="2"/>
  <text x="595" y="51" text-anchor="middle" fill="#fca5a5" font-size="14" font-weight="bold">5</text>
  <text x="595" y="65" text-anchor="middle" fill="#fca5a5" font-size="10">Tag</text>
  <text x="595" y="98" text-anchor="middle" fill="#fca5a5" font-size="13" font-weight="bold">Test</text>
  <text x="595" y="22" text-anchor="middle" fill="#64748b" font-size="11">Validieren</text>
</svg>

---

## 1️⃣ Understand — Problem verstehen

| Schritt | Beschreibung |
|---------|-------------|
| 🎯 **Problem definieren** | Für wen lösen wir das Problem? Warum ist es relevant? |
| 👥 **Stakeholder einbeziehen** | Alle Beteiligten identifizieren und ihre Bedürfnisse verstehen |
| 📊 **Daten analysieren** | Vorhandene Daten, Analytics und Nutzerfeedback auswerten |
| 🗺️ **User Journey kartieren** | Den kompletten Weg des Nutzers durch das Produkt aufzeichnen |

> 💡 **Fragen:** Wer sind die Nutzer? Was sind ihre Probleme? Was haben sie schon probiert?

---

## 2️⃣ Diverge — Ideen sammeln

| Methode | Beschreibung |
|---------|-------------|
| 🧠 **Brainstorming** | Keine Kritik — alle Ideen sind erlaubt und werden gesammelt |
| ✏️ **Sketching** | Ideen schnell auf Papier bringen, um sie greifbar zu machen |
| 🔄 **Crazy 8s** | 8 Varianten in 8 Minuten skizzieren — Fokus auf Quantität |
| 📋 **Storyboarding** | Den Ablauf der Nutzererfahrung als Geschichte visualisieren |

> ⚠️ **Regel:** In dieser Phase gilt KEINE Kritik! Alle Ideen sind willkommen.

---

## 3️⃣ Converge — Ideen auswählen

| Schritt | Beschreibung |
|---------|-------------|
| 🗳️ **Abstimmung** | Jedes Teammitglied hat Stimmen — demokratische Auswahl |
| 📊 **Priorisierung** | Ideen nach Machbarkeit × Impact bewerten und sortieren |
| 🎯 **Entscheidung** | Das Team einigt sich auf eine Richtung für den Prototyp |

---

## 4️⃣ Prototype — Prototyp bauen

| Ansatz | Werkzeuge | Fokus |
|--------|----------|-------|
| 🖼️ **Low-Fidelity** | Papier, Stift, Post-its | Schnell, günstig, einfach zu ändern |
| 💻 **High-Fidelity** | Figma, Sketch, Adobe XD | Detailliert, klickbar, realistisch |

> ⚡ **Prinzip:** Lieber schnell als perfekt — nur die Kernfunktionen abbilden.

---

## 5️⃣ Test — Mit Nutzern testen

| Schritt | Beschreibung |
|---------|-------------|
| 👥 **5 Nutzer reichen** | Laut Nielsen decken 5 Nutzer ca. 80% der Usability-Probleme auf |
| 📝 **Beobachten** | Nicht helfen! Den Nutzer selbstständig agieren lassen |
| 🎤 **Laut denken** | Nutzer soll erklären, was er tut und warum (Think-Aloud) |
| 📊 **Dokumentieren** | Alle beobachteten Probleme und Reaktionen aufschreiben |

---

## 🎨 Low-Fidelity Prototyping

Schnelle, billige Prototypen auf Papier — ideal für erste Ideen und schnelles Feedback.

| | Vorteile | Nachteile |
|---|---------|----------|
| ⚡ | **Schnell** — Minuten statt Stunden | ❌ **Nicht klickbar** — nur statisch |
| 💰 | **Kostenlos** — Papier und Stift reichen | ❌ **Schwer zu testen** — kein echtes Nutzererlebnis |
| 🔄 | **Einfach zu ändern** — neue Version in Sekunden | ❌ **Wirkt "unprofessionell"** — nicht für Präsentationen |
| 🎯 | **Fokus auf Funktion** — Design ablenkungen fallen weg | |

---

## 💡 Praxis-Beispiel: Trinkwasser-App

**Problem:** "Ich trinke zu wenig Wasser am Tag."

### Design Sprint Phasen
1. **Understand:** Warum trinken Menschen zu wenig? Vergessen, keine Erinnerung, kein Überblick.
2. **Diverge:** Erinnerungs-App, Gamification, Smartwatch-Integration, soziale Challenge.
3. **Converge:** Erinnerungs-App mit Gamification (einfachste Lösung).
4. **Prototype:** Figma-Mockup mit Timer und Belohnungssystem.
5. **Test:** 5 Nutzer testen die App — "Würdest du das täglich nutzen?"

---

> 💡 **IHK-Tipp:** "Beschreiben Sie den Design Sprint!" — 5 Phasen: Understand, Diverge, Converge, Prototype, Test. Ziel: In 5 Tagen vom Problem zum getesteten Prototyp.

---

> Im Design Sprint sammeln wir Anforderungen. Aber welche **Arten** von Anforderungen gibt es überhaupt? In der nächsten Lektion lernst du die 5 Anforderungsarten kennen, die die IHK unterscheiden will.`
    },

    // --- Lektion 5: Anforderungsarten ---
    {
      id: "ux-5",
      title: "Anforderungsarten",
      duration: "12 min",
      type: "text",
      content: `## Anforderungsarten — Was braucht das System?

> In der letzten Lektion hast du den Design Sprint kennengelernt, in dem Anforderungen gesammelt und priorisiert werden. Jetzt schauen wir uns genauer an, welche **Arten von Anforderungen** es gibt — ein Klassiker in der IHK-Prüfung!

> Anforderungen sind auch im Modul "Projektmanagement" zentral — dort werden sie im Lastenheft (WAS) und Pflichtenheft (WIE) dokumentiert. Im agilen Umfeld heißen sie "User Stories".

In der Softwareentwicklung gibt es **verschiedene Arten von Anforderungen**. Die IHK prüft, ob du sie unterscheiden kannst!

---

## 📋 Die 5 Anforderungsarten

### 1️⃣ Funktionale Anforderungen

> **Was** soll das System tun?

| Aspekt | Beschreibung |
|--------|-------------|
| 📋 **Inhalt** | Konkrete Funktionen und Features |
| 💡 **Beispiel** | "Das System soll PDF-Export unterstützen" |

### 2️⃣ Nicht-funktionale Anforderungen

> **Wie gut** soll das System es tun?

| Aspekt | Beschreibung |
|--------|-------------|
| 📋 **Inhalt** | Qualitätsmerkmale und Rahmenbedingungen |
| 💡 **Beispiel** | "Die Seite muss in unter 2 Sekunden laden" |

| Kategorie | Beispiel |
|-----------|----------|
| **Performance** | Antwortzeit < 200ms |
| **Sicherheit** | HTTPS, Passwort-Hashing |
| **Usability** | Barrierefrei (WCAG 2.1) |
| **Skalierbarkeit** | 10.000 gleichzeitige Nutzer |
| **Verfügbarkeit** | 99,9% Uptime |

### 3️⃣ Technische Anforderungen

> **Welche Technik** wird benötigt?

- Technische Voraussetzungen und Einschränkungen
- Beispiel: "Die Anwendung muss auf Linux laufen"

### 4️⃣ Regulatorische Anforderungen

> **Welche Regeln** müssen eingehalten werden?

- Gesetze, Normen, Richtlinien
- Beispiel: "DSGVO-konforme Datenverarbeitung"

### 5️⃣ Benutzeranforderungen

> **Was braucht der Nutzer?**

- Bedürfnisse und Erwartungen des Endnutzers
- Beispiel: "Die App muss auch ohne Internet funktionieren"

---

## ⚔️ Vergleich

| Art | Frage | Beispiel |
|-----|-------|----------|
| **Funktional** | WAS? | PDF-Export, Login, Suche |
| **Nicht-funktional** | WIE GUT? | Schnell, sicher, barrierefrei |
| **Technisch** | WELCHE TECHNIK? | Linux, PostgreSQL, REST API |
| **Regulatorisch** | WELCHE REGELN? | DSGVO, ISO 27001 |
| **Benutzer** | WAS BRAUCHT DER NUTZER? | Offline-Modus, Dark Mode |

---

## 📝 Requirements Engineering

Der Prozess der Anforderungserhebung:

1. **Elicitation** — Anforderungen erheben (Interviews, Workshops)
2. **Documentation** — Aufschreiben (Lastenheft, Pflichtenheft)
3. **Validation** — Prüfen (Ist es vollständig? Widerspruchsfrei?)
4. **Management** — Änderungen verwalten

> 💡 **Merke:** Anforderungen sind NICHT statisch — sie ändern sich im Laufe des Projekts!

---

> 💡 **IHK-Tipp:** "Nennen Sie die verschiedenen Anforderungsarten!" — Funktional, nicht-funktional, technisch, regulatorisch, Benutzeranforderungen. Erkläre den Unterschied mit je einem Beispiel.

---

> Du kennst jetzt die Anforderungen. Aber wie prüft man, ob ein Produkt diese auch erfüllt? In der letzten inhaltlichen Lektion lernst du **Usability-Evaluation** kennen — Safety, Learnability und Memorability.`
    },

    // --- Lektion 6: Evaluation ---
    {
      id: "ux-6",
      title: "Usability-Evaluation",
      duration: "12 min",
      type: "text",
      content: `## Usability-Evaluation — Ist das Produkt gut?

> In der letzten Lektion hast du die verschiedenen Anforderungsarten kennengelernt. Jetzt geht es um die **Bewertung**: Wie prüft man, ob ein Produkt gut ist? Die drei Evaluationsziele Safety, Learnability und Memorability geben dir die Antwort.

> Bei der heuristischen Evaluation prüfst du ein Produkt direkt gegen Nielsens 10 Heuristiken aus Lektion 2 — beide Konzepte greifen ineinander.

**Evaluation** bedeutet die **systematische Bewertung** eines Produkts. Ziel ist herauszufinden, ob das Produkt die Nutzerbedürfnisse erfüllt.

---

## 🎯 Die drei Evaluationsziele

### 🛡️ Safety (Sicherheit)

> Schützt das System den Nutzer vor ungewollten Aktionen?

**Safety** prüft, ob das System den Nutzer vor Fehler schützt. Gibt es eine **Bestätigung** bei kritischen Aktionen? Gibt es einen **Rückgängig**-Mechanismus? Beispiel: "Möchtest du wirklich ALLE Daten löschen?" — ein guter Safety-Mechanismus verhindert unbeabsichtigte Zerstörung.

### 📚 Learnability (Erlernbarkeit)

> Wie einfach ist es, das System zu erlernen?

**Learnability** misst, wie schnell ein neuer Nutzer das System bedienen kann. Ist die **Navigation intuitiv**? Braucht der Nutzer eine **Schulung**? Beispiel: Ein Kind sollte die Grundfunktionen verstehen können — wenn ja, ist die Learnability hoch.

### 🧠 Memorability (Wiedererkennbarkeit)

> Kann der Nutzer das System nach einer Pause wieder verwenden?

**Memorability** prüft, ob ein gelegentlicher Nutzer nach einer Pause wieder zurechtkommt. Sind **Funktionen sichtbar**? Gibt es **konsistente** Bedienelemente? Beispiel: Auch nach 6 Monaten Pause weiß man, wo der Speicher-Button ist.

---

## 🔍 Evaluationstechniken

### Experten-basiert
| Methode | Beschreibung |
|---------|-------------|
| 📋 **Heuristische Evaluation** | Experten prüfen gegen Nielsens Heuristiken |
| 📝 **Cognitive Walkthrough** | Experte geht Schritt für Schritt durch |
| 🎯 **Guidelines Review** | Prüfung gegen Design-Guidelines |

### Nutzer-basiert
| Methode | Beschreibung |
|---------|-------------|
| 🧪 **Usability-Test** | Nutzer führt Aufgaben aus, Beobachtung |
| 🎤 **Thinking Aloud** | Nutzer kommentiert sein Handeln |
| 📊 **A/B-Test** | Zwei Varianten vergleichen |
| 📝 **Fragebogen** | SUS (System Usability Scale) |

---

## 📊 Usability-Test durchführen

### Vorbereitung
1. **Ziele definieren:** Was will ich testen?
2. **Aufgaben formulieren:** "Bestelle eine Pizza"
3. **Nutzer rekrutieren:** Repräsentativ für Zielgruppe
4. **Umgebung vorbereiten:** Ruhig, ohne Ablenkung

### Durchführung
1. **Begrüßen** und Situation erklären
2. **Aufgaben stellen** — NICHT helfen!
3. **Beobachten** und Notizen machen
4. **Thinking Aloud** — Nutzer soll laut denken
5. **Abschlussinterview:** "Was hat gefallen? Was nicht?"

### Auswertung
1. **Probleme kategorisieren**
2. **Schweregrad** bewerten (Kritisch/Mittel/Gering)
3. **Lösungen** vorschlagen
4. **Bericht** schreiben

---

## 📋 Usability-Fragen (Goals → Questions)

| Goal | Frage |
|------|-------|
| **Safety** | Wie schützt das System vor ungewollten Aktionen? |
| **Learnability** | Wie einfach sind die Funktionen zu verstehen? |
| **Memorability** | Wie gut kann man sich nach Pause erinnern? |

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Safety, Learnability und Memorability?" — Safety = Schutz vor Fehlern. Learnability = einfach zu erlernen. Memorability = gut wiederzuerkennen.

---

> Das war die letzte inhaltliche Lektion zu UX! Du hast von den Grundlagen über Nielsen, Personas und Design Sprint bis zur Evaluation alles kennengelernt. Jetzt kannst du dein Wissen im Quiz testen!`
    },

    // --- Lektion 7: Quiz ---
    {
      id: "ux-7",
      title: "Wissenstest: UX & Interaction Design",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: UX & Interaction Design

> Du hast alle Lektionen zu UX durchgearbeitet — von UX vs. UI über Nielsen und Personas bis zur Usability-Evaluation. Jetzt ist es Zeit, dein Wissen zu testen!

Teste dein Wissen über UX und Interaction Design!`,
    },
  ],
};
