# AGENTS.md — LearnHub

Interaktive Lernplattform (Mathe, Programmierung, IHK) — Next.js 14 App Router,
TypeScript, Tailwind, Firebase (Auth + Firestore, Projekt `learnhub-eca26`),
Deployment via Vercel.

**Die Seite ist live und wird von echten Nutzern verwendet.** Bestehende
Features (Module, Skill Tree, Bestenliste, Auth) dürfen nicht kaputtgehen.

## Architektur

- **Client-only App.** `app/layout.tsx` ist `"use client"`, alle Seiten laden
  Daten direkt per Firebase Client SDK aus Firestore. Es gibt keine Server
  Components, kein SSR-Data-Fetching und **noch keine API-Routen**
  (`app/api/` existiert nicht). `lib/presence.ts` sendet an `/api/presence`,
  das es (noch) nicht gibt.
- `lib/` = Logik: `firebase.ts` (lazy init, getDb/getAuthInstance nutzen),
  `auth.ts` (~1200 Zeilen, komplettes User-Management inkl. Streak/Clicker),
  `flashcards.ts` (SM-2), `data.ts` (Modul-Registry), `*Data.ts` (Inhalte).
- `components/interactive/` = 80+ Lern-Tools, Barrel-Export in
  `components/interactive/index.ts`. Path-Alias: `@/*` → `./*`.
- Tailwind: Dark Mode über `class`, Farben `primary`/`dark` aus
  `tailwind.config.ts`.

## Kommandos

- Dev: `npm run dev`
- Build: `npm run build` — läuft vorher automatisch `bash scripts/validate-latex.sh`
  (via `prebuild`): einzelne Backslashes vor LaTeX-Befehlen in Template-Literals
  (`\frac` statt `\\frac`) lassen den Build fehlschlagen. Neue `*Data.ts` mit
  LaTeX in die `FILES`-Liste dort eintragen.
- Typecheck: `npx tsc --noEmit`
- Lint: `npm run lint` (`next lint`, Flat Config in `eslint.config.mjs`)
- Tests: `npm test` (`vitest run`, Config in `vitest.config.ts`, Testdateien in
  `tests/**/*.test.ts`) — ausschließlich für reine Funktionen in `lib/`, keine
  Firebase-/Component-/E2E-Tests.

Nach jeder Aufgabe Typecheck UND Build laufen lassen. CI (Node 22, `npm ci`,
`npm run build`) läuft bei Push auf `main` und triggert dann das
Vercel-Deploy-Hook. Commit-Stil: Conventional Commits (`feat: …`).

## Harte Regeln

1. **Keine Secrets im Client-Bundle.** Alles mit `NEXT_PUBLIC_`-Prefix landet
   im ausgelieferten JavaScript (die ganze App ist Client-Code!). API-Keys,
   Service Accounts, Verschlüsselungsschlüssel dort niemals hinein. Funde im
   Bestand melden, nicht kopieren.
2. **`firestore.rules` ist sicherheitskritisch.** Jede neue Collection braucht
   im selben Commit eine Regel, Catch-all am Ende ist deny. Keine Regel
   aufweichen, um Client-Zugriff schnell zu fixen. Aktuell geregelt: `users`
   (+ `data/`), `usernames`, `pending_verifications`, `feedback` — alles andere
   blockiert.
3. **Kein Client-Zugriff auf Secrets-Collections.** Collections mit API-Keys
   oder verschlüsselten Fremdschlüsseln sind für Clients komplett gesperrt und
   nur über das Firebase Admin SDK in Route Handlern erreichbar (sobald die
   erste API-Route entsteht).
4. **Keine Breaking Changes an bestehenden API-Endpoints** — der ESP32 draußen
   kann nicht mitdeployed werden. (Gilt für künftige Endpoints; aktuell gibt es
   noch keine.)
5. **Bestehende Features nicht anfassen**, außer die Aufgabe verlangt es
   ausdrücklich: Module, Skill Tree, Bestenliste, Auth.
6. **Kein zweites Spacing- und kein zweiter Streak-System.** SM-2 liegt in
   `lib/flashcards.ts`, der Streak in `lib/auth.ts`. Neue Features nutzen diese
   Logik oder ziehen sie in ein geteiltes Modul — sie bauen nichts Paralleles.
7. **Neue Tagesberechnungen gehen über `lib/dates.ts`** (Europe/Berlin,
   Tagesgrenze 04:00). Bestehenden Code nicht umstellen.

## Firestore-Konventionen

- **Zeitstempel werden als ISO-String via `toISOString()` (UTC) gespeichert.**
  Tageslogik (Streak) läuft clientseitig in `lib/auth.ts` mit `toDateString()`.
  Sobald Server-Code (Route Handler) „heute" berechnet, läuft der in UTC —
  Zeitzone (Europe/Berlin) explizit behandeln, sonst Bug.
- **Lesekosten mitdenken.** Kein Muster, bei dem eine Ansicht N Dokumente
  einzeln liest; aggregiere in ein Dokument, wenn Daten immer gemeinsam
  gelesen werden.
- **Schemalos heißt defensiv lesen.** Bestehende Dokumente haben neue Felder
  nicht — immer `feld ?? default`.
- Neue Felder für bestehende Dokumente brauchen ein idempotentes
  Backfill-Skript in `scripts/` (Admin SDK).
- Composite Indexes gehören nach `firestore.indexes.json` (existiert noch
  nicht) und in denselben Commit wie die Query.
- Zusammengehörige Schreibvorgänge in Transaktion/Batch; Zähler mit
  `FieldValue.increment`.

## Module & Inhalte hinzufügen

1. `lib/<fach>Data.ts` mit `Module`-Typ aus `lib/types.ts` erstellen.
2. In `lib/data.ts` importieren und zu `allModules` hinzufügen.
3. Optional `lib/<fach>Exercises.ts`, Karteikarten nach `lib/flashcardData.ts`.
4. Enthält die Datei LaTeX: in `scripts/validate-latex.sh` `FILES` ergänzen.

Neue interaktive Komponente: in `components/interactive/` anlegen, in
`components/interactive/index.ts` exportieren, `InteractiveType` in
`lib/types.ts` erweitern, per `interactive`-Feld in Lektionsdaten referenzieren.

`lib/content/registry.ts` ist generiert (`scripts/generate-module-registry.ts`),
aktuell leer — nicht von Hand pflegen.

## Code-Stil

- TypeScript strict, kein `any`.
- Geschäftslogik (Spacing, Streak) in reine Funktionen in `lib/` ohne
  Firestore-Zugriff.
- Keine neue UI-Bibliothek; bestehende Komponenten/Tailwind-Konventionen nutzen.
- Deutsche UI-Texte, englische Bezeichner im Code.
- Kleine Commits pro abgeschlossenem Schritt; erst lesen, dann planen, dann
  schreiben — bei Unklarheit nachfragen.