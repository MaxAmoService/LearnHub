"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { mathQuizzes } from "@/lib/mathData";
import { complexQuizzes } from "@/lib/complexData";
import { grundrechnenQuizzes } from "@/lib/grundrechnenData";
import { ganzeZahlenQuizzes } from "@/lib/ganzeZahlenData";
import { quadratischeGleichungenQuizzes } from "@/lib/quadratischeGleichungenData";
import { logarithmusQuizzes } from "@/lib/logarithmusData";
import { exponentialQuizzes } from "@/lib/exponentialData";
import { wachstumsprozesseQuizzes } from "@/lib/wachstumsprozesseData";
import { fourierQuizzes } from "@/lib/fourierData";
import { advQuizData } from "@/lib/advancedData";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import { CheckCircle2, XCircle, RotateCcw, Send } from "lucide-react";
import { triggerXPPopup } from "./XPNotification";
import { playCorrect, playWrong, playComplete } from "@/lib/sounds";

interface QuizQuestion {
  question: string;
  type: "multiple" | "input";
  options?: string[];
  correct: number | string;
  explanation: string;
  hint?: string;
}

interface QuizProps {
  moduleSlug: string;
  onComplete: () => void;
}

const quizData: Record<string, QuizQuestion[]> = {
  "react-grundlagen": [
    {
      question: "Was ist React?",
      type: "multiple",
      options: [
        "Eine Programmiersprache",
        "Eine JavaScript-Bibliothek für UIs",
        "Ein Datenbank-System",
        "Ein Betriebssystem",
      ],
      correct: 1,
      explanation: "React ist eine JavaScript-Bibliothek von Meta (Facebook) für den Aufbau von Benutzeroberflächen.",
    },
    {
      question: "Welche Hook wird für State in Funktionskomponenten verwendet?",
      type: "input",
      correct: "useState",
      explanation: "useState ist die State-Hook für Funktionskomponenten. Geschrieben als 'useState' (camelCase).",
      hint: "Es beginnt mit 'use' und hat 4 Buchstaben danach...",
    },
    {
      question: "Was gibt useState zurück?",
      type: "multiple",
      options: [
        "Nur den aktuellen State",
        "Eine Funktion zum Updaten",
        "Ein Array mit [state, setState]",
        "Ein Objekt mit state und update",
      ],
      correct: 2,
      explanation: "useState gibt ein Array mit zwei Elementen zurück: den aktuellen State und eine Funktion zum Aktualisieren.",
    },
    {
      question: "Wie nennt man die HTML-ähnliche Syntax in React?",
      type: "input",
      correct: "JSX",
      explanation: "JSX (JavaScript XML) ist die Erweiterung, die HTML-ähnliche Syntax in JavaScript ermöglicht.",
      hint: "Drei Buchstaben, beginnt mit J...",
    },
    {
      question: "Wann wird useEffect mit leerem Dependency Array ausgeführt?",
      type: "multiple",
      options: [
        "Bei jedem Render",
        "Nur beim ersten Render (Mount)",
        "Nur bei State-Änderungen",
        "Nie",
      ],
      correct: 1,
      explanation: "Mit leerem Dependency Array [] wird useEffect nur einmal beim Mounten der Komponente ausgeführt.",
    },
  ],
  "mathe-ableitungen": [
    {
      question: "Was ist die Ableitung von f(x) = x³?",
      type: "input",
      correct: "3x^2",
      explanation: "Mit der Potenzregel: f'(x) = 3·x^(3-1) = 3x²",
      hint: "Potenzregel anwenden: n·x^(n-1)",
    },
    {
      question: "Was ist die Ableitung von sin(x)?",
      type: "input",
      correct: "cos(x)",
      explanation: "Die Ableitung von sin(x) ist cos(x).",
    },
    {
      question: "Was ist die Ableitung von eˣ?",
      type: "input",
      correct: "e^x",
      explanation: "eˣ ist seine eigene Ableitung: (eˣ)' = eˣ",
      hint: "e^x bleibt e^x...",
    },
    {
      question: "Welche Regel wird für [f·g]' verwendet?",
      type: "multiple",
      options: [
        "Kettenregel",
        "Produktregel",
        "Quotientenregel",
        "Summenregel",
      ],
      correct: 1,
      explanation: "Die Produktregel: [f·g]' = f'·g + f·g'",
    },
    {
      question: "Was ist die Kettenregel für f(g(x))?",
      type: "input",
      correct: "f'(g(x)) * g'(x)",
      explanation: "Die Kettenregel: [f(g(x))]' = f'(g(x)) · g'(x)",
      hint: "Ableitung außen mal Ableitung innen",
    },
  ],
  "typescript-basics": [
    {
      question: "Welches Schlüsselwort definiert ein Interface in TypeScript?",
      type: "input",
      correct: "interface",
      explanation: "Interfaces werden mit dem 'interface' Schlüsselwort definiert.",
    },
    {
      question: "Was ist der Unterschied zwischen 'type' und 'interface'?",
      type: "multiple",
      options: [
        "Kein Unterschied",
        "Interfaces können erweitert werden, Types nicht",
        "Beide sind gleich, aber interfaces sind schneller",
        "Types sind nur für Primitive",
      ],
      correct: 1,
      explanation: "Beide können ähnlich verwendet werden, aber Interfaces支持 Declaration Merging und können erweitert werden.",
    },
    {
      question: "Was macht das '?' nach einem Property-Namen?",
      type: "multiple",
      options: [
        "Es macht die Property unsichtbar",
        "Es macht die Property optional",
        "Es macht die Property readonly",
        "Es macht die Property nullable",
      ],
      correct: 1,
      explanation: "Das '?' macht eine Property optional - sie muss nicht vorhanden sein.",
    },
  ],
  "ihk-git": [
    {
      question: "Was ist der Hauptunterschied zwischen zentraler und dezentraler VV?",
      type: "multiple",
      options: [
        "Zentrale VV speichert alles nur auf einem zentralen Server — bei Ausfall steht das Team still",
        "Dezentrale VV gibt jedem Entwickler eine vollständige Kopie des Repositorys inklusive Historie",
        "Zentrale VV verwendet ausschließlich Branches für die parallele Zusammenarbeit im Team",
        "Dezentrale VV benötigt immer eine aktive Internetverbindung für Commits und Branching",
      ],
      correct: 1,
      explanation: "Bei dezentraler VV (Git) hat jeder Entwickler eine vollständige Kopie inkl. Historie — Offline-Arbeit möglich.",
    },
    {
      question: "Was macht 'git fetch'?",
      type: "multiple",
      options: [
        "Lädt Änderungen herunter und merged sie automatisch in den aktuellen lokalen Branch",
        "Erstellt einen neuen Remote-Branch und pushed gleichzeitig lokale Änderungen zum Server",
        "Lädt nur die Änderungen vom Remote herunter, ohne sie in den lokalen Branch zu mergen",
        "Synchronisiert ausschließlich die Tags und ignoriert dabei die Branches vollständig",
      ],
      correct: 2,
      explanation: "git fetch aktualisiert nur den lokalen Stand des Remote-Repositorys ohne zu mergen. git pull = fetch + merge.",
    },
    {
      question: "Was bedeutet Semantic Versioning 2.1.0?",
      type: "multiple",
      options: [
        "Major 2 (Breaking Changes), Minor 1 (neues Feature, abwärtskompatibel), Patch 0 (kein Bugfix)",
        "Revision 2, Build 1, Hotfix 0 — eine interne Versionsnummer für das Team",
        "Version 2, Update 1, Release 0 — eine marketingorientierte Versionsbezeichnung",
        "Generation 2, Iteration 1, Phase 0 — ein Entwicklungszyklus-Indikator",
      ],
      correct: 0,
      explanation: "Semantic Versioning: MAJOR.MINOR.PATCH — Major bei Breaking Changes, Minor bei neuen Features, Patch bei Bugfixes.",
    },
    {
      question: "Welcher Branch ist in Gitflow für die produktive Version zuständig?",
      type: "multiple",
      options: [
        "dev — hier wird die nächste Version vorbereitet und Features zusammengeführt",
        "feature/* — hier werden neue Funktionen entwickelt und getestet",
        "release/* — hier wird der Release vorbereitet, getestet und finalisiert",
        "main — hier liegen die fertigen, produktiven Releases mit Versions-Tags",
      ],
      correct: 3,
      explanation: "In Gitflow ist 'main' der produktive Branch mit fertigen Releases. 'dev' ist der Integrationsbranch für die Entwicklung.",
    },
    {
      question: "Was macht pessimistisches Locking?",
      type: "multiple",
      options: [
        "Erlaubt parallele Bearbeitung aller Dateien und löst Konflikte erst beim Merge automatisch",
        "Erstellt bei erkannten Konflikten automatisch einen neuen Feature-Branch zur Lösung",
        "Protokolliert alle Änderungen für spätere Konfliktlösung und erstellt Diff-Reports",
        "Sperrt eine Datei exklusiv vor der Bearbeitung — andere können sie nur lesen, nicht ändern",
      ],
      correct: 3,
      explanation: "Pessimistisches Locking (SVN, SAP) sperrt Dateien exklusiv. Optimistisches Locking (Git) erlaubt parallele Bearbeitung.",
    },
  ],
  "ihk-ux": [
    {
      question: "Was beschreibt User Experience (UX)?",
      type: "multiple",
      options: [
        "Das gesamte Erlebnis eines Nutzers bei der Interaktion mit einem Produkt — von der ersten Kontaktaufnahme bis zur langfristigen Nutzung",
        "Die technische Implementierung der Frontend-Logik und die Architektur der Benutzeroberfläche",
        "Nur die visuelle Gestaltung der Benutzeroberfläche mit Farben, Schriftarten und Layout",
        "Die Auswahl der Programmiersprache und Frameworks für die Entwicklung der Anwendung",
      ],
      correct: 0,
      explanation: "UX beschreibt das gesamte Erlebnis — von der ersten Kontaktaufnahme bis zur langfristigen Nutzung. UI ist nur ein Teil davon.",
    },
    {
      question: "Was ist eine Persona?",
      type: "multiple",
      options: [
        "Ein Entwickler, der die Software programmiert und technische Entscheidungen trifft",
        "Ein Stakeholder, der das Projekt finanziert und Budgetentscheidungen trifft",
        "Ein echter Nutzer, der am Usability-Test teilnimmt und Feedback gibt",
        "Ein fiktives Nutzerprofil, das eine Zielgruppe repräsentiert und auf echten Daten basiert",
      ],
      correct: 3,
      explanation: "Eine Persona ist ein fiktiver Nutzer, der stellvertretend für eine Zielgruppe steht — basierend auf echten Daten.",
    },
    {
      question: "Wie lautet das Format einer User Story?",
      type: "multiple",
      options: [
        "Als [Rolle] möchte ich [Ziel], um [Nutzen] zu erreichen — Fokus auf den WARUM, nicht das WIE",
        "Wenn [Bedingung] eintritt, dann soll [Aktion] ausgeführt werden — mit definierten Vor- und Nachbedingungen",
        "Das System muss [Funktion] unter [Bedingung] unterstützen — mit messbaren Akzeptanzkriterien",
        "Der Nutzer navigiert zu [Seite] und klickt auf [Element] — detaillierte Interaktionsschritte",
      ],
      correct: 0,
      explanation: "User Stories: 'Als [Rolle] möchte ich [Ziel], um [Nutzen]'. Fokus auf den WARUM, nicht das WIE.",
    },
    {
      question: "Was sind die 5 Phasen des Design Sprints nach Google?",
      type: "multiple",
      options: [
        "Research, Design, Code, Deploy, Monitor — ein linearer Entwicklungsprozess",
        "Understand, Diverge, Converge, Prototype, Test — in 5 Tagen vom Problem zum Prototyp",
        "Planen, Entwickeln, Testen, Launchen, Bewerben — ein Marketing-fokussierter Ansatz",
        "Idee, Plan, Umsetzung, Präsentation, Feedback — ein klassischer Wasserfall-Ansatz",
      ],
      correct: 1,
      explanation: "5 Phasen: Understand (Problem verstehen), Diverge (Ideen sammeln), Converge (auswählen), Prototype (bauen), Testen (validieren).",
    },
    {
      question: "Was bedeutet 'Learnability' in der Usability-Evaluation?",
      type: "multiple",
      options: [
        "Wie sicher das System den Nutzer vor ungewollten Fehlbedienungen und Datenverlust schützt",
        "Wie schnell ein neuer Nutzer die Grundfunktionen des Systems erlernen und produktiv nutzen kann",
        "Wie gut sich ein gelegentlicher Nutzer nach längerer Pause an die Bedienung wieder erinnert",
        "Wie ansprechend und ästhetisch das visuelle Design der Benutzeroberfläche gestaltet ist",
      ],
      correct: 1,
      explanation: "Learnability = Erlernbarkeit (wie schnell lernt man es?). Memorability = Wiedererkennbarkeit (erinnert man sich nach Pause?). Safety = Fehlerschutz.",
    },
  ],
  "ihk-qualitaet": [
    {
      question: "Was besagt die ISO 9126?",
      type: "multiple",
      options: [
        "Ein 5-stufiges Reifegradmodell für die Prozessreife von Entwicklungsteams (CMMI-basiert)",
        "Ein Standard für IT-Sicherheitsmanagement und Risikobewertung nach BSI-Grundschutz",
        "6 Qualitätsmerkmale für Software (Funktionalität, Zuverlässigkeit, Benutzbarkeit, Effizienz, Wartbarkeit, Portabilität)",
        "Ein Framework für agile Projektmanagement-Methoden mit definierten Rollen und Artefakten",
      ],
      correct: 2,
      explanation: "ISO 9126 definiert 6 Qualitätsmerkmale. Nachfolger: ISO 25010 (erweitert auf 8 Merkmale).",
    },
    {
      question: "Was ist ein Singleton?",
      type: "multiple",
      options: [
        "Ein Structural Pattern, das inkompatible Schnittstellen durch einen Adapter kompatibel macht",
        "Ein Creational Pattern, das nur eine einzige Instanz einer Klasse erlaubt und den Zugriff steuert",
        "Ein Behavioral Pattern, das eine Familie von Algorithmen kapselt und austauschbar macht",
        "Ein Test-Pattern, das echte Abhängigkeiten durch simulierte Objekte ersetzt",
      ],
      correct: 1,
      explanation: "Singleton = Creational Pattern mit genau einer Instanz. Beispiel: Logger, Datenbankverbindung.",
    },
    {
      question: "Was macht das Strategy-Pattern?",
      type: "multiple",
      options: [
        "Erstellt exakt eine Instanz einer Klasse und stellt sicher, dass nur ein globaler Zugriffspunkt existiert",
        "Passt die Schnittstelle eines bestehenden Objekts an eine erwartete Schnittstelle an (Adapter)",
        "Benachrichtigt alle registrierten Abhängigen automatisch bei Zustandsänderungen des Subjekts",
        "Definiert eine Familie von Algorithmen, kapselt jeden einzelnen und macht sie zur Laufzeit austauschbar",
      ],
      correct: 3,
      explanation: "Strategy definiert eine Familie von Algorithmen, kapselt jeden einzelnen und macht sie austauschbar.",
    },
    {
      question: "Was ist der Unterschied zwischen Unit-Test und Integrationstest?",
      type: "multiple",
      options: [
        "Unit-Tests prüfen einzelne Komponenten isoliert, Integrationstests das Zusammenspiel mehrerer Module",
        "Unit-Tests sind langsamer als Integrationstests, weil die Isolation der Komponenten mehr Aufwand erfordert",
        "Unit-Tests werden manuell vom Entwickler ausgeführt, Integrationstests laufen automatisch in der CI/CD-Pipeline",
        "Unit-Tests prüfen ausschließlich die Benutzeroberfläche, Integrationstests die gesamte Systemarchitektur",
      ],
      correct: 0,
      explanation: "Unit = isoliert (eine Komponente). Integration = Zusammenspiel mehrerer Module. System-Test = gesamtes System.",
    },
    {
      question: "Was beschreibt die Schichtenarchitektur?",
      type: "multiple",
      options: [
        "Unabhängige Services, die asynchron über Nachrichtenbroker miteinander kommunizieren und eigene Datenbanken besitzen",
        "Aufteilung in Model (Daten), View (Darstellung) und Controller (Logik) mit bidirektionaler Kommunikation",
        "Trennung in Präsentation, Geschäftslogik und Datenhaltung — jede Schicht kommuniziert nur mit benachbarten Schichten",
        "Ein Testverfahren, das Schritt für Schritt durch den Code geht und jeden Ausführungspfad prüft",
      ],
      correct: 2,
      explanation: "Schichtenarchitektur: Präsentation → Anwendung → Datenhaltung. Jede Schicht kennt nur die Schicht direkt darunter.",
    },
  ],
  "ihk-projektmanagement": [
    {
      question: "Was beschreibt das Magische Dreieck im Projektmanagement?",
      type: "multiple",
      options: [
        "Die drei Projektphasen: Initiierung, Durchführung und Abschluss nach DIN 69901",
        "Das Spannungsfeld zwischen Qualität, Budget und Zeit — ändert sich einer, beeinflusst es die anderen",
        "Die drei Stakeholder-Gruppen: Auftraggeber, Team und Management mit unterschiedlichen Interessen",
        "Die drei Testverfahren: Unit-Test, Integrationstest und Systemtest für Qualitätssicherung",
      ],
      correct: 1,
      explanation: "Magisches Dreieck: Qualität, Budget, Zeit — ändert sich einer, beeinflusst es die anderen. Planung muss verteidigt werden.",
    },
    {
      question: "Was bedeutet SMART bei der Zielformulierung?",
      type: "multiple",
      options: [
        "Schnell, Modern, Agil, Robust, Testbar — eine technische Metrik für Softwarequalität",
        "Strukturiert, Modular, Automatisiert, Reproduzierbar, Testbar — ein Entwicklungsparadigma",
        "Sicher, Minimal, Adaptiv, Redundant, Transparent — ein Architekturprinzip für verteilte Systeme",
        "Spezifisch, Messbar, Attraktiv/Akzeptiert, Realistisch, Terminiert — ein Framework zur Zielformulierung",
      ],
      correct: 3,
      explanation: "SMART = Spezifisch, Messbar, Attraktiv/Akzeptiert, Realistisch, Terminiert.",
    },
    {
      question: "Wer erstellt das Lastenheft?",
      type: "multiple",
      options: [
        "Der Auftraggeber — es beschreibt WAS das System können soll (Anforderungen, Ziele, Rahmenbedingungen)",
        "Der Auftragnehmer — es beschreibt WIE das System technisch gebaut wird (Architektur, Technologien)",
        "Das Entwicklungsteam — es beschreibt die technische Architektur und die gewählten Design Patterns",
        "Der Scrum Master — es beschreibt die Sprint-Ziele und die Definition of Done für das Team",
      ],
      correct: 0,
      explanation: "Lastenheft = Auftraggeber (WAS). Pflichtenheft = Auftragnehmer (WIE). Merke: Lasten = WAS lastet auf dem Auftragnehmer.",
    },
    {
      question: "Was sind die 3 Rollen in Scrum?",
      type: "multiple",
      options: [
        "Manager, Entwickler und Tester — mit klarer hierarchischer Berichtsstruktur",
        "Projektleiter, Architekt und Administrator — mit getrennten Verantwortungsbereichen",
        "Product Owner (Was), Scrum Master (Prozess) und Development Team (Umsetzung)",
        "Kunde, Team und Stakeholder — mit definierten Verantwortlichkeiten im Projekt",
      ],
      correct: 2,
      explanation: "Scrum-Rollen: Product Owner (Was wird gebaut?), Scrum Master (Prozess einhalten), Development Team (Umsetzung).",
    },
    {
      question: "Was misst die Earned Value Analyse (EVA)?",
      type: "multiple",
      options: [
        "Den Projektfortschritt im Vergleich zur Planung — Kosten- und Terminabweichungen durch PV, EV und AC",
        "Die Code-Qualität anhand von Metriken wie Cyclomatic Complexity und Code-Coverage",
        "Die Zufriedenheit des Teams in regelmäßigen Retrospektiven auf einer Skala von 1 bis 10",
        "Die Kundenzufriedenheit nach jedem abgeschlossenen Sprint durch den Net Promoter Score",
      ],
      correct: 0,
      explanation: "EVA misst Projektfortschritt durch Vergleich von Planwert (PV), Fertigstellungswert (EV) und Istkosten (AC).",
    },
  ],
  "ihk-docker": [
    {
      question: "Was ist der Hauptunterschied zwischen Container und VM?",
      type: "multiple",
      options: [
        "Container sind langsamer als VMs, weil sie den Kernel mit dem Host-System teilen müssen",
        "Container unterstützen kein Netzwerk, VMs haben dagegen volle Netzwerkunterstützung und eigene IP-Adressen",
        "Container teilen den OS-Kernel des Hosts und sind daher leichtgewichtig, VMs haben ihr eigenes vollständiges Betriebssystem",
        "Es gibt keinen wesentlichen Unterschied — beides virtualisiert die Hardware vollständig und isoliert",
      ],
      correct: 2,
      explanation: "Container teilen den Host-Kernel (leichtgewichtig, schnell). VMs virtualisieren Hardware mit eigenem OS (stark isoliert, schwerer).",
    },
    {
      question: "Was macht die Dockerfile-Instruktion FROM?",
      type: "multiple",
      options: [
        "Definiert das Basis-Image, auf dem alle folgenden Schichten aufbauen (z.B. node:18, ubuntu:22.04)",
        "Kopiert Dateien und Verzeichnisse vom Host-System in den Container während des Builds",
        "Führt Shell-Befehle während des Image-Builds aus, z.B. zur Installation von Abhängigkeiten",
        "Setzt den Startbefehl, der beim Container-Start ausgeführt wird (ENTRYPOINT/CMD)",
      ],
      correct: 0,
      explanation: "FROM ist immer die erste Instruktion und definiert die Basis-Schicht (z.B. node:18, ubuntu:22.04).",
    },
    {
      question: "Was ist Docker Compose?",
      type: "multiple",
      options: [
        "Ein Betriebssystem, das speziell für die Container-Virtualisierung optimiert wurde",
        "Ein Cloud-Dienst von Docker Inc. für die automatische Container-Deployment-Pipeline",
        "Ein Monitoring-Tool zur Überwachung von Container-Ressourcen wie CPU und Speicher",
        "Ein Tool zur Definition und Verwaltung von Multi-Container-Anwendungen via YAML-Datei",
      ],
      correct: 3,
      explanation: "Docker Compose definiert Services, Netzwerke und Volumes in einer docker-compose.yml und startet sie mit 'docker compose up'.",
    },
    {
      question: "Was ist ein Docker Volume?",
      type: "multiple",
      options: [
        "Ein virtuelles Netzwerk für die Kommunikation zwischen mehreren Containern",
        "Persistenter Speicher, der Daten unabhängig vom Container-Lebenszyklus erhält und überlebt",
        "Ein Befehl in der Dockerfile-Syntax zum Setzen von Umgebungsvariablen zur Laufzeit",
        "Ein Tag-System zur Versionierung von Docker Images in einer Registry wie Docker Hub",
      ],
      correct: 1,
      explanation: "Volumes persistieren Daten außerhalb des Containers — Daten überleben Container-Neustarts und -Löschungen.",
    },
    {
      question: "Welche Kernfunktionen bietet Kubernetes?",
      type: "multiple",
      options: [
        "Nur die Verwaltung von Container-Images in einer zentralen Registry und deren Versionierung",
        "Nur die Speicherung und Versionierung von Dockerfiles in einem verteilten Dateisystem",
        "Automatische Skalierung, Self-Healing (Neustart bei Crash) und Load-Balancing für Container auf vielen Nodes",
        "Nur die zentralisierte Sammlung und Auswertung von Container-Logs für Debugging-Zwecke",
      ],
      correct: 2,
      explanation: "Kubernetes orchestriert Container: Skalierung, Self-Healing (Neustart bei Crash), Load-Balancing, Rolling Updates.",
    },
  ],
  "ihk-erw-prog": [
    {
      question: "Was besagt das Single Responsibility Principle (SRP)?",
      type: "multiple",
      options: [
        "Eine Klasse darf maximal eine öffentliche Methode enthalten, um die Komplexität zu begrenzen",
        "Jede Methode muss in einer eigenen Datei definiert werden, um die Wartbarkeit zu erhöhen",
        "Eine Klasse sollte nur eine einzige Verantwortung haben — der Änderungsgrund sollte nur einer sein",
        "Eine Klasse sollte nicht länger als 100 Zeilen sein, um die Lesbarkeit zu gewährleisten",
      ],
      correct: 2,
      explanation: "SRP: Eine Klasse = eine Aufgabe/Verantwortung. Änderungsgrund sollte nur einer sein.",
    },
    {
      question: "Was ist der Hauptvorteil von Interfaces in der Programmierung?",
      type: "multiple",
      options: [
        "Sie beschleunigen die Laufzeit des Programms erheblich durch direkten Maschinencode",
        "Sie ermöglichen Austauschbarkeit, Testbarkeit durch Mocks und eine klare Struktur zwischen Komponenten",
        "Sie reduzieren den Speicherverbrauch, weil alle Implementierungen eine gemeinsame Basis teilen",
        "Sie erzwingen die Verwendung von Vererbung statt Komposition und verhindern Code-Duplikation",
      ],
      correct: 1,
      explanation: "Interfaces: Austauschbarkeit (Dependency Injection), Testbarkeit (Mocks), klare Verträge zwischen Komponenten.",
    },
    {
      question: "Was ist ein Mock-Objekt im Software-Testing?",
      type: "multiple",
      options: [
        "Ein Test-Double, das echte Abhängigkeiten wie Datenbanken oder APIs simuliert und kontrolliert",
        "Ein fehlerhaftes Objekt, das absichtlich Exceptions wirft, um die Fehlerbehandlung zu testen",
        "Ein Design Pattern für die Erstellung komplexer Objekte mit vielen Parametern schrittweise",
        "Ein Datenbank-Objekt mit vordefinierten Testdaten, das vor jedem Test neu geladen wird",
      ],
      correct: 0,
      explanation: "Mocks ersetzen echte Abhängigkeiten im Test — sie simulieren Verhalten und können Verifikationen durchführen.",
    },
    {
      question: "Was bedeutet das DRY-Prinzip?",
      type: "multiple",
      options: [
        "Do Repeat Yourself — Wiederholung von Code für bessere Lesbarkeit und Unabhängigkeit ist erlaubt",
        "Design Right Yesterday — Technische Schulden sollten sofort begleichen werden, nicht verschoben",
        "Debug Release Yearly — Software sollte nur einmal pro Jahr in die Produktion deployed werden",
        "Don't Repeat Yourself — Wissen sollte an einer einzigen Stelle definiert sein und nicht dupliziert werden",
      ],
      correct: 3,
      explanation: "DRY = Don't Repeat Yourself. Jedes Wissen sollte eine einzige, eindeutige Darstellung im System haben.",
    },
    {
      question: "Was ist der Unterschied zwischen Coupling und Cohesion?",
      type: "multiple",
      options: [
        "Coupling = Code-Länge einer Methode in Zeilen, Cohesion = Anzahl der Variablen pro Klasse",
        "Coupling = Abhängigkeit zwischen Klassen (niedrig = gut), Cohesion = Zusammengehörigkeit innerhalb einer Klasse (hoch = gut)",
        "Coupling = Anzahl der Unit-Tests pro Klasse, Cohesion = Testabdeckung in Prozent",
        "Beide Begriffe beschreiben dasselbe Konzept aus verschiedenen Blickwinkeln und sind austauschbar",
      ],
      correct: 1,
      explanation: "Low Coupling (wenig Abhängigkeit) + High Cohesion (starke Zusammengehörigkeit) = gutes OO-Design.",
    },
  ],
  "ihk-it-sicherheit": [
    {
      question: "Was beschreibt die CIA-Triade in der IT-Sicherheit?",
      type: "multiple",
      options: [
        "Central Intelligence Agency — die US-Behörde für Cyber-Sicherheit und Spionageabwehr",
        "Critical Infrastructure Assessment — eine Methode zur Bewertung kritischer IT-Infrastruktur",
        "Confidentiality, Integrity, Availability — die drei Grundziele jeder IT-Sicherheitsmaßnahme",
        "Certified Information Auditor — ein international anerkanntes Zertifikat für IT-Sicherheitsexperten",
      ],
      correct: 2,
      explanation: "CIA-Triade: Vertraulichkeit (nur Befugte), Integrität (Daten unverändert), Verfügbarkeit (Systeme nutzbar).",
    },
    {
      question: "Wie schützt man sich vor SQL-Injection?",
      type: "multiple",
      options: [
        "Durch Prepared Statements und parametrisierte Abfragen, die SQL-Code von Eingabedaten trennen",
        "Durch Verschlüsselung der Datenbank mit AES-256 und regelmäßige Schlüsselrotation",
        "Durch eine Firewall, die alle eingehenden HTTP-Anfragen auf verdächtige Muster prüft",
        "Durch regelmäßige Backups der Datenbank und ein Incident-Response-Team für Notfälle",
      ],
      correct: 0,
      explanation: "Prepared Statements trennen SQL-Code von Benutzereingaben — der eingegebene Text wird als Daten behandelt, nicht als Code.",
    },
    {
      question: "Was ist der Unterschied zwischen symmetrischer und asymmetrischer Verschlüsselung?",
      type: "multiple",
      options: [
        "Symmetrisch ist veraltet und unsicher, asymmetrisch ist der moderne Standard für alle Anwendungsfälle",
        "Beide verwenden denselben Schlüssel, aber asymmetrisch ist langsamer wegen der komplexeren Mathematik",
        "Symmetrisch nutzt Hashing statt Verschlüsselung, asymmetrisch nutzt Public-Private-Key-Paare",
        "Symmetrisch nutzt einen gemeinsamen Schlüssel (schnell), asymmetrisch ein Public-Private-Key-Paar (Key-Austausch)",
      ],
      correct: 3,
      explanation: "Symmetrisch (AES): ein Key fuer Ver- und Entschluesselung. Asymmetrisch (RSA): Public + Private Key, langsamer aber sicherer fuer Key-Austausch.",
    },
    {
      question: "Welche Merkmale deuten auf eine Phishing-E-Mail hin?",
      type: "multiple",
      options: [
        "Eine personalisierte Anrede mit dem vollständigen Namen und eine bekannte Absenderadresse",
        "Druck/Angst ('Ihr Konto wird gesperrt!'), verdächtige Links und Aufforderung zur Passwort-Eingabe",
        "Eine professionelle Gestaltung mit dem Firmenlogo und einer korrekten Impressumsangabe",
        "Ein digital signiertes S/MIME-Zertifikat des Absenders und eine verschluesselte Anlage",
      ],
      correct: 1,
      explanation: "Phishing erzeugt Druck/Angst, enthaelt verdächtige Links und fragt nach Passwörtern. Immer Absender prüfen, nicht auf Links klicken!",
    },
    {
      question: "Was ist der Unterschied zwischen einer Firewall und einem IDS?",
      type: "multiple",
      options: [
        "Beide machen dasselbe, aber eine Firewall ist hardwarebasiert und ein IDS softwarebasiert",
        "Eine Firewall blockiert Verkehr nach Regeln aktiv, ein IDS erkennt Angriffe und warnt (passiv)",
        "Ein IDS ist veraltet und wird durch moderne Firewalls vollständig ersetzt und abgelöst",
        "Eine Firewall prüft nur den Dateninhalt, ein IDS nur die IP-Adressen und Ports der Pakete",
      ],
      correct: 1,
      explanation: "Firewall = filtert aktiv (erlaubt/blockiert). IDS = erkennt und warnt (passiv). IPS = erkennt UND blockiert automatisch.",
    },
  ],
  "ihk-computersysteme": [
    {
      question: "Was beschreibt die Von-Neumann-Architektur?",
      type: "multiple",
      options: [
        "Eine Architektur mit getrennten Speichern fuer Programme und Daten mit parallelem Zugriff",
        "Programme und Daten liegen im selben Speicher — die CPU muss abwechselnd Befehle und Daten holen",
        "Eine rein parallele Architektur mit mehreren unabhängigen Prozessoren ohne gemeinsamen Speicher",
        "Eine Cloud-basierte Architektur, bei der die Verarbeitung auf externe Server ausgelagert wird",
      ],
      correct: 1,
      explanation: "Von-Neumann: Programm und Daten im SELBEN Speicher. Flaschenhals: sequenzieller Zugriff. Gegenentwurf: Harvard-Architektur.",
    },
    {
      question: "Was charakterisiert RAID 5?",
      type: "multiple",
      options: [
        "Nur Spiegelung ohne Striping — maximale Sicherheit bei minimaler nutzbarer Kapazität",
        "Nur Striping ohne Redundanz — maximale Geschwindigkeit, aber keine Ausfallsicherheit",
        "Spiegelung plus Striping wie RAID 10 — mindestens 4 Platten, 50 Prozent nutzbare Kapazität",
        "Striping mit verteilter Parität — mindestens 3 Platten, eine darf ausfallen, gute Balance",
      ],
      correct: 3,
      explanation: "RAID 5: Striping + verteilte Paritaet. Mind. 3 Platten, 1 darf ausfallen. Nutzbare Kapazitaet: (n-1) x Plattengroesse.",
    },
    {
      question: "Welche Reihenfolge beschreibt die Speicherhierarchie von schnell nach langsam?",
      type: "multiple",
      options: [
        "Register, L1-Cache, L2-Cache, L3-Cache, RAM, SSD, HDD",
        "HDD, SSD, RAM, L3-Cache, L2-Cache, L1-Cache, Register",
        "RAM, Register, L1-Cache, SSD, L2-Cache, HDD, L3-Cache",
        "SSD, HDD, RAM, L1-Cache, L2-Cache, L3-Cache, Register",
      ],
      correct: 0,
      explanation: "Speicherhierarchie: Register (~0.3ns) -> L1 (~1ns) -> L2 (~4ns) -> L3 (~10ns) -> RAM (~100ns) -> SSD (~0.1ms) -> HDD (~5-10ms).",
    },
    {
      question: "Was ist der Hauptunterschied zwischen BIOS und UEFI?",
      type: "multiple",
      options: [
        "BIOS ist moderner und unterstützt GPT-Partitionierung, UEFI ist veraltet und nutzt MBR",
        "Beide sind identisch — UEFI ist nur der neue Name fuer BIOS seit Windows 8",
        "BIOS ist 16-Bit mit MBR (max. 2 TB), UEFI ist 32/64-Bit mit GPT (max. 9.4 ZB) und Secure Boot",
        "BIOS startet schneller als UEFI, weil es weniger Hardware prueft und keine grafische Oberflaeche hat",
      ],
      correct: 2,
      explanation: "BIOS: 16-Bit, MBR (max. 2 TB, 4 Partitionen), textbasiert. UEFI: 32/64-Bit, GPT (max. 9.4 ZB, 128 Partitionen), Secure Boot.",
    },
    {
      question: "Was ist virtueller Speicher und wozu dient er?",
      type: "multiple",
      options: [
        "Ein Cloud-basierter Speicherdienst, der Daten auf externen Servern vorhält und bei Bedarf laedt",
        "Ein Mechanismus, der mehr Speicher nutzt als physisch vorhanden ist, durch Auslagerung auf die Festplatte",
        "Ein verschluesselter RAM-Bereich, der vor unbefugtem Zugriff durch andere Prozesse schuetzt",
        "Ein dedizierter Grafikspeicher auf der Grafikkarte fuer die Darstellung von 3D-Inhalten",
      ],
      correct: 1,
      explanation: "Virtueller Speicher: Paging erlaubt es, mehr Speicher zu nutzen als RAM vorhanden. Auslagerung auf Platte (Swap/Pagefile) bei Bedarf.",
    },
  ],
};

// Combine with math quizzes
const allQuizData: Record<string, QuizQuestion[]> = {
  ...quizData,
  ...mathQuizzes,
  ...complexQuizzes,
  ...grundrechnenQuizzes,
  ...ganzeZahlenQuizzes,
  ...quadratischeGleichungenQuizzes,
  ...logarithmusQuizzes,
  ...exponentialQuizzes,
  ...wachstumsprozesseQuizzes,
  ...fourierQuizzes,
  ...advQuizData,
};

// Component to render questions with math
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle answer options for multiple-choice questions and update the correct index */
function shuffleQuestionOptions(q: QuizQuestion): QuizQuestion {
  if (q.type !== "multiple" || !q.options) return q;
  const indexed = q.options.map((opt, i) => ({ opt, i }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newCorrect = indexed.findIndex(x => x.i === q.correct);
  return { ...q, options: indexed.map(x => x.opt), correct: newCorrect };
}

function QuestionWithMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$")) {
          return <MathBlock key={i} math={part.slice(1, -1)} display={false} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function Quiz({ moduleSlug, onComplete }: QuizProps) {
  const { completeLesson, user } = useAuth();
  const rawQuestions = allQuizData[moduleSlug] || [];
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [inputAnswer, setInputAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const quizAlreadyCompleted = user?.completedLessons?.[moduleSlug]?.includes("quiz") ?? false;
  const hasAwardedXP = useRef(quizAlreadyCompleted);

  useEffect(() => {
    setQuestions(shuffleArray(rawQuestions).map(shuffleQuestionOptions));
  }, [moduleSlug]);

  if (questions.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <p className="text-slate-400">Noch kein Quiz für dieses Modul verfügbar.</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const checkAnswer = () => {
    let correct = false;
    
    if (question.type === "multiple") {
      correct = selectedAnswer === question.correct;
    } else {
      // Input: normalize and compare
      const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "").replace(/[{}]/g, "").replace(/,\s*(?=\d)/g, ",");
      const userAnswer = normalize(inputAnswer);
      const correctAnswer = normalize(String(question.correct));
      correct = userAnswer === correctAnswer || 
                userAnswer === correctAnswer.replace("*", "·") ||
                userAnswer === correctAnswer.replace("·", "*");
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      setStreak(s => s + 1);
      playCorrect();
    } else {
      setStreak(0);
      playWrong();
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setInputAnswer("");
      setShowResult(false);
      setIsCorrect(false);
    } else {
      setFinished(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      if (finalScore >= questions.length * 0.8) {
        if (!hasAwardedXP.current) {
          hasAwardedXP.current = true;
          completeLesson(moduleSlug, "quiz", finalScore);
          triggerXPPopup(20);
          playComplete();
          onComplete();
        }
      }
    }
  };

  const restart = () => {
    setQuestions(shuffleArray(rawQuestions).map(shuffleQuestionOptions));
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setInputAnswer("");
    setShowResult(false);
    setScore(0);
    setFinished(false);
    setIsCorrect(false);
  };

  // Finished screen
  if (finished) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    const passed = percentage >= 80;

    return (
      <div className="glass rounded-2xl overflow-hidden animate-slide-up">
        {/* Header-Balken */}
        <div className={`px-6 py-8 text-center ${passed ? "bg-gradient-to-b from-emerald-500/20 to-transparent" : "bg-gradient-to-b from-amber-500/20 to-transparent"}`}>
          <div className="text-5xl mb-4">
            {passed ? "🎉" : "💪"}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {passed ? "Quiz bestanden!" : "Noch nicht bestanden"}
          </h2>
          <p className="text-slate-400">
            {passed
              ? "Super, du hast das Quiz gemeistert."
              : "Du brauchst 80% zum Bestehen. Nicht aufgeben!"}
          </p>
        </div>

        {/* Score-Karte */}
        <div className="px-6 pb-6">
          <div className={`rounded-xl p-6 text-center border ${passed ? "bg-emerald-500/10 border-emerald-500/30" : "bg-amber-500/10 border-amber-500/30"}`}>
            <div className="text-4xl font-bold text-white mb-3">{percentage}%</div>
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-green-400">{finalScore} Richtig</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400">{questions.length - finalScore} Falsch</span>
              </div>
            </div>

            {/* Fortschrittsbalken */}
            <div className="mt-4 h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${passed ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Aktionen */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <button
              onClick={restart}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Quiz wiederholen
            </button>
            {quizAlreadyCompleted && (
              <p className="text-xs text-slate-500">Wiederholung — keine zusätzlichen XP</p>
            )}
          </div>

          {passed && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-blue-300 text-center">
                In der Seitenleiste warten jetzt die Übungen auf dich — vom leichten Einstieg bis zur Abschlussprüfung.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Question screen
  return (
    <div className="glass rounded-xl p-6 animate-slide-up">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-slate-400">
          Frage {currentQuestion + 1} von {questions.length}
        </span>
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <span className="text-sm text-amber-400 animate-pulse font-bold">🔥 {streak} Serie</span>
          )}
          <span className="text-sm text-slate-400">
            {score} richtig
          </span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full mb-6">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Type Badge */}
      <div className="mb-4">
        <span className={`text-xs px-2 py-1 rounded ${
          question.type === "input" 
            ? "bg-purple-500/20 text-purple-400" 
            : "bg-blue-500/20 text-blue-400"
        }`}>
          {question.type === "input" ? "✍️ Texteingabe" : "📋 Multiple Choice"}
        </span>
      </div>

      {/* Question */}
      <div className="text-xl font-semibold mb-6">
        {question.question.includes("$") ? (
          <QuestionWithMath text={question.question} />
        ) : (
          question.question
        )}
      </div>

      {/* Multiple Choice Options */}
      {question.type === "multiple" && question.options && (
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const showCorrect = showResult && index === question.correct;
            const showWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  showCorrect
                    ? "bg-green-500/20 border-green-500"
                    : showWrong
                    ? "bg-red-500/20 border-red-500"
                    : isSelected
                    ? "bg-blue-500/20 border-blue-500"
                    : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    showCorrect
                      ? "bg-green-500 text-white"
                      : showWrong
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-slate-700"
                  }`}>
                    {showCorrect ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showWrong ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span>
                    {option.includes("$") ? (
                      <QuestionWithMath text={option} />
                    ) : (
                      option
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Input Answer */}
      {question.type === "input" && (
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !showResult && checkAnswer()}
              disabled={showResult}
              placeholder="Deine Antwort..."
              className={`w-full p-4 bg-slate-800/50 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                showResult && isCorrect
                  ? "border-green-500 focus:ring-green-500/50"
                  : showResult && !isCorrect
                  ? "border-red-500 focus:ring-red-500/50"
                  : "border-slate-700 focus:ring-blue-500/50"
              }`}
            />
            {showResult && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-400" />
                )}
              </div>
            )}
          </div>
          
          {question.hint && !showResult && (
            <p className="text-sm text-slate-500 italic">💡 Tipp: {question.hint}</p>
          )}
          
          {!showResult && !isCorrect && (
            <p className="text-sm text-slate-500">Enter drücken zum Prüfen</p>
          )}
        </div>
      )}

      {/* Explanation */}
      {showResult && (
        <div className={`mt-6 p-4 rounded-lg border animate-fade-in ${
          isCorrect 
            ? "bg-green-500/10 border-green-500/30" 
            : "bg-red-500/10 border-red-500/30"
        }`}>
          <p className={`font-medium mb-1 ${isCorrect ? "text-green-400" : "text-red-400"}`}>
            {isCorrect ? "✅ Richtig!" : "❌ Falsch!"}
          </p>
          <div className="text-slate-300"><InlineText text={question.explanation} /></div>
          {!isCorrect && question.type === "input" && (
            <p className="text-slate-400 mt-2">
              Richtige Antwort: <span className="text-green-400 font-mono">{typeof question.correct === "string" && question.correct.includes("$") ? <InlineText text={question.correct} /> : String(question.correct)}</span>
            </p>
          )}
        </div>
      )}

      {/* Submit / Next Button */}
      {!showResult ? (
        <button
          onClick={checkAnswer}
          disabled={question.type === "multiple" ? selectedAnswer === null : !inputAnswer.trim()}
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Antwort prüfen
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
        >
          {currentQuestion < questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
        </button>
      )}
    </div>
  );
}
