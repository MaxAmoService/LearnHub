# 🎓 LearnHub

Interaktive Lernplattform für IHK-Fachinformatiker, Mathematik und Programmierung — kostenlos und Open Source.

**🔗 [learnhub-tau-indol.vercel.app](https://learnhub-tau-indol.vercel.app)**

---

## Features

- 📚 **52 Lernmodule** — IHK AP1/AP2, Mathematik, Programmierung
- 🎮 **81 interaktive Tools** — Subnet Calculator, OSI Explorer, SQL Playground, Scrum Board u.v.m.
- 🃏 **307 Karteikarten** — Spaced Repetition (SM-2 Algorithmus)
- 📝 **Übungsaufgaben** — 3 Schwierigkeitsstufen + Prüfungsmodus
- 🏆 **Gamification** — XP, Level, Streaks, Leaderboard, Achievements
- 🔥 **Fortschritts-Tracking** — Lektionen abschließen, Module merken
- 🎨 **Pixel-Art Hintergrund** — Konfigurierbarer Shooting-Star-Effekt
- 🌙 **Dark Theme** — Glass Morphism Design
- 📱 **Responsive** — Desktop, Tablet, Handy
- 🔐 **Auth** — Registrierung mit E-Mail-Bestätigung (Firebase Auth)
- 🇪🇺 **Datenschutz** — DSGVO-orientiert, Impressum & Datenschutzerklärung, Consent-Banner

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

## Mathematik-Module (38)

Analysis (Grenzwerte, Ableitungen, Integralrechnung, Reihen, Taylorreihen) · Lineare Algebra (Vektoren, Matrizen, LGS) · Stochastik (Wahrscheinlichkeit, Kombinatorik, Verteilungen) · Grundlagen (Mengen, Logik, Funktionen, Bruchrechnung, Gleichungen, Dreisatz) · Geometrie (Flächen, Körper, Trigonometrie, Analytische Geometrie) · Weiteres (Potenzen, Logarithmen, Statistik, Numerik, DGL, Kurvendiskussion, Prozentrechnung, Komplexe Zahlen, Grundrechnen, Ganze Zahlen, Quadratische Gleichungen, Exponentialfunktionen, Wachstumsprozesse, Fourier-Reihen)

## Programmier-Module (3)

React Grundlagen · TypeScript Basics · Next.js

---

## Tech Stack

| | Technologie |
|---|---|
| Framework | Next.js 14 (App Router, `"use client"`) |
| Sprache | TypeScript |
| Styling | Tailwind CSS (Dark Theme, Glass Morphism) |
| Backend | Firebase (Auth + Firestore) |
| Icons | Lucide React |
| Mathematik | KaTeX |
| Code Highlighting | PrismJS |
| Celebration | canvas-confetti |
| Sounds | Web Audio API |

---

## Projektstruktur

```
├── app/                    # Next.js App Router (Seiten + Route Handler)
│   ├── page.tsx            # Dashboard
│   ├── modules/            # Modul-Übersicht + Detailseiten
│   ├── skilltree/          # Skill Tree Visualisierung (Etagen + Graph)
│   ├── leaderboard/        # Rangliste
│   ├── profile/            # Benutzerprofil + Einstellungen
│   ├── plans/              # Lehrpläne + Übungsseite
│   ├── tagesquiz/          # Tagesquiz
│   ├── impressum/          # Impressum
│   ├── datenschutz/        # Datenschutzerklärung
│   └── api/v1/             # Widget-/Key-API (today, log, keys, leaderboard, users)
├── components/
│   ├── interactive/        # 81 interaktive Lern-Tools
│   ├── visuals/            # Mathematische Visualisierungen
│   ├── clicker/            # Clicker-Werkzeuge (Rechner, Skizzenfläche)
│   ├── LessonViewer.tsx    # Lektions-Renderer
│   ├── MarkdownContent.tsx # Geteilter Markdown-/LaTeX-Renderer
│   ├── Quiz.tsx            # Quiz-Komponente
│   ├── FlashcardViewer.tsx # Karteikarten mit SM-2
│   ├── SkillTreeGraph.tsx  # Skill Tree Graph-Komponente
│   ├── PixelBackground.tsx # Pixel-Art Hintergrund
│   └── InlineText.tsx      # Inline-Rendering (LaTeX, Links, Bold)
├── content/
│   └── exercises/          # Aufgaben-JSONs (Themen + Modul-Pools)
├── lib/
│   ├── *Data.ts            # Modulinhalte (statisch)
│   ├── flashcardData.ts    # 307 Karteikarten
│   ├── auth.ts             # Firebase Auth + User Management
│   ├── spacing.ts          # SM-2 Spaced Repetition
│   ├── exercises/          # Aufgaben-Registry, Scoring, prozedurale Generatoren
│   ├── sounds.ts           # Web Audio Soundeffekte
│   └── types.ts            # TypeScript-Typen
├── scripts/                # Build-Tools, Migrationen, Generatoren
└── firestore.rules         # Firestore-Security-Rules
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

Automatisch via Vercel bei Push auf `main`. Environment Variables in den Vercel
Settings konfigurieren: Firebase-Client-Config (`NEXT_PUBLIC_*`) und
`FIREBASE_SERVICE_ACCOUNT` (base64-kodiert, nur für Server-Routen — niemals
mit `NEXT_PUBLIC_`-Prefix).

---

*Built with ❤️*
