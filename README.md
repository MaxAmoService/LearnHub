# 🎓 LearnHub

Interaktive Lernplattform für IHK-Fachinformatiker, Mathematik und Programmierung — kostenlos und Open Source.

**🔗 [lernapp-nine.vercel.app](https://lernapp-nine.vercel.app)**

---

## Features

- 📚 **59 Lernmodule** — IHK AP1/AP2, Mathematik, Programmierung, Erweitert
- 🎮 **85 interaktive Tools** — Subnet Calculator, OSI Explorer, SQL Playground, Scrum Board u.v.m.
- 🃏 **307 Karteikarten** — Spaced Repetition (SM-2 Algorithmus)
- 📝 **Übungsaufgaben** — 3 Schwierigkeitsstufen + Prüfungsmodus
- 🏆 **Gamification** — XP, Level, Streaks, Leaderboard, Achievements
- 🔥 **Fortschritts-Tracking** — Lektionen abschließen, Module merken
- 🎨 **Pixel-Art Hintergrund** — Konfigurierbarer Shooting-Star-Effekt
- 🌙 **Dark Theme** — Glass Morphism Design
- 📱 **Responsive** — Desktop, Tablet, Handy
- 🔐 **Auth** — Registrierung mit E-Mail-Bestätigung (Firebase Auth)
- 🇪🇺 **DSGVO-konform** — Daten in EU (Frankfurt), e2e verschlüsselt

---

## IHK-Module (11)

| Modul | Themen |
|-------|--------|
| 📊 Diagramme & Darstellungen | UML, PAP, Struktogramme, EPK, Algorithmen, Netzplantechnik |
| 🌐 Netzwerktechnik | OSI, TCP/IP, IPv4/v6, Subnetting, WLAN, Sicherheit |
| 🗄️ Datenbanken | ER-Modelle, Normalisierung, SQL, JOINs, ACID |
| 🖥️ Computersysteme & Hardware | CPU, Speicherhierarchie, RAID, OS, Virtualisierung, Cloud |
| 🔒 IT-Sicherheit | Verschlüsselung, OWASP, Social Engineering, Firewalls |
| 🔀 Versionsmanagement mit Git | Git, Branching, Gitflow, Semantic Versioning |
| 🎨 UX & Interaction Design | Nielsen, Personas, Design Sprint, Prototyping |
| ✅ Software-Qualitätsstandards | ISO 9126, Design Patterns, Testverfahren, Code Smells |
| 📋 Projektmanagement | Scrum, DIN 69901, Magisches Dreieck, EVA, SMART |
| 🐳 Docker & Containerisierung | Docker, Compose, Deployment, Kubernetes |
| 🔧 Erweiterte Programmierung | SOLID, Clean Code, Interfaces, Unit-Tests, Refactoring |

## Mathematik-Module (32)

Analysis (Grenzwerte, Ableitungen, Integralrechnung, Reihen, Taylorreihen) · Lineare Algebra (Vektoren, Matrizen, LGS) · Stochastik (Wahrscheinlichkeit, Kombinatorik, Verteilungen) · Grundlagen (Mengen, Logik, Funktionen, Bruchrechnung, Gleichungen, Dreisatz) · Geometrie (Flächen, Körper, Trigonometrie, Analytische Geometrie) · Weiteres (Potenzen, Logarithmen, Statistik, Numerik, DGL, Kurvendiskussion, Prozentrechnung, Komplexe Zahlen)

## Erweiterte Module (13)

Mathe 1 · Algorithmen & Datenstrukturen · Datenbanken · Künstliche Intelligenz · Machine Learning · Kommunikationsbusse · Englisch · BWL · Software-Qualität · Programmierung 2 · BWL WS20 · Rechnernetze · Numerische Methoden 2

## Programmier-Module (3)

React Grundlagen · TypeScript Basics · Next.js

---

## Tech Stack

| | Technologie |
|---|---|
| Framework | Next.js 14 (App Router, `"use client"`) |
| Sprache | TypeScript |
| Styling | Tailwind CSS (Dark Theme, Glass Morphism) |
| Backend | Firebase (Auth + Firestore, Region eur3) |
| Icons | Lucide React |
| Mathematik | KaTeX |
| Code Highlighting | PrismJS |
| Celebration | canvas-confetti |
| Sounds | Web Audio API |

---

## Projektstruktur

```
├── app/                    # Next.js App Router (Seiten)
│   ├── page.tsx            # Dashboard
│   ├── modules/            # Modul-Übersicht + Detailseiten
│   ├── skilltree/          # Skill Tree Visualisierung
│   ├── leaderboard/        # Rangliste
│   ├── profile/            # Benutzerprofil + Einstellungen
│   └── datenschutz/        # DSGVO
├── components/
│   ├── interactive/        # 85 interaktive Lern-Tools
│   ├── visuals/            # Mathematische Visualisierungen
│   ├── LessonViewer.tsx    # Markdown-Renderer mit LaTeX
│   ├── Quiz.tsx            # Quiz-Komponente
│   ├── FlashcardViewer.tsx # Karteikarten mit SM-2
│   ├── SkillTreeGraph.tsx  # Skill Tree Komponente
│   ├── PixelBackground.tsx # Pixel-Art Hintergrund
│   └── InlineText.tsx      # Inline-Rendering (LaTeX, Links, Bold)
├── lib/
│   ├── *Data.ts            # Modulinhalte (statisch)
│   ├── flashcardData.ts    # 307 Karteikarten
│   ├── auth.ts             # Firebase Auth + User Management
│   ├── flashcards.ts       # SM-2 Spaced Repetition
│   ├── sounds.ts           # Web Audio Soundeffekte
│   └── types.ts            # TypeScript-Typen
└── scripts/                # Build-Tools
```

---

## Entwicklung

```bash
npm install
npm run dev          # Dev-Server auf localhost:3000
npm run build        # Production Build (inkl. LaTeX-Validierung)
npm run lint         # ESLint
```

### Neues Modul hinzufügen

1. `lib/<fach>Data.ts` erstellen (Typ `Module` aus `lib/types.ts`)
2. In `lib/data.ts` importieren und zu `allModules` hinzufügen
3. Optional: `lib/<fach>Exercises.ts` für Aufgaben, `lib/flashcardData.ts` für Karteikarten
4. Datei zu `scripts/validate-latex.sh` hinzufügen (wenn LaTeX enthalten)

### Neue interaktive Komponente hinzufügen

1. Komponente in `components/interactive/` erstellen
2. Aus `components/interactive/index.ts` exportieren
3. `InteractiveType` in `lib/types.ts` erweitern
4. In Lektionsdaten via `interactive`-Feld referenzieren

---

## Deployment

Automatisch via Vercel bei Push auf `main`. Environment Variables in Vercel Settings konfigurieren (siehe `FIREBASE_SETUP.md`).

---

*Built with ❤️*
