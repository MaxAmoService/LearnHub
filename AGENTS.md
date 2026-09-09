# AGENTS.md — LearnHub

Interaktive Lernplattform (Mathe, Programmierung, IHK) — Next.js 14 App Router,
TypeScript, Tailwind, Firebase (Auth + Firestore, Projekt `learnhub-eca26`),
Deployment via Vercel.

**Die Seite ist live und wird von echten Nutzern verwendet.** Bestehende
Features (Module, Skill Tree, Bestenliste, Auth) dürfen nicht kaputtgehen.

## Architektur

- **Client-only App.** `app/layout.tsx` ist `"use client"`, alle Seiten laden
  Daten direkt per Firebase Client SDK aus Firestore. Es gibt keine Server
  Components und kein SSR-Data-Fetching — nur Route Handler unter `app/api/v1/`
  (Widget-API + Key-Verwaltung, siehe Abschnitt „API-Routen").
  `lib/presence.ts` sendet an `/api/presence`, das es (noch) nicht gibt.
- `lib/` = Logik: `firebase.ts` (lazy init, getDb/getAuthInstance nutzen),
  `auth.ts` (~1200 Zeilen, komplettes User-Management inkl. Streak/Clicker),
  `flashcards.ts` (SM-2), `data.ts` (Modul-Registry), `*Data.ts` (Inhalte).
  Server-only: `firebaseAdmin.ts` (Admin-SDK-Singleton, NIE clientseitig
  importieren), `apiKeys.ts`, `apiText.ts`, `planReview.ts` (reine
  Review-Berechnung, geteilt zwischen Web und API), `server/` (Admin-SDK-
  Firestore-Zugriffe für die Routen).
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
- Lint: `npm run lint` — **aktuell kaputt** (eslint-config-next@16 + next@14:
  `next lint` fragt interaktiv nach Config, `npx eslint` crasht). Bis zum Fix
  Typecheck + Build als Absicherung; nichts an der ESLint-Setup-Konstellation
  ändern, ohne sie komplett zu reparieren.
- Tests: `npm test` (`vitest run`, Config in `vitest.config.ts`, Testdateien in
  `tests/**/*.test.ts`) — ausschließlich für reine Funktionen in `lib/`, keine
  Firebase-/Component-/E2E-Tests.
- Daten-Migration: `npm run migrate:api-tokens [-- --dry-run]` (entfernt das
  kompromittierte Altlasten-Feld `apiToken` aus den User-Docs, legt KEINE
  Keys daraus an — betroffene UIDs werden geloggt).

Nach jeder Aufgabe Typecheck UND Build laufen lassen. CI (Node 22, `npm ci`,
`npm run build`) läuft bei Push auf `main`; Deployment über die native
Vercel-Git-Integration (Deploy bei jedem Push auf `main`, kein Hook in der
CI). Commit-Stil: Conventional Commits (`feat: …`).

## Harte Regeln

1. **Keine Secrets im Client-Bundle.** Alles mit `NEXT_PUBLIC_`-Prefix landet
   im ausgelieferten JavaScript (die ganze App ist Client-Code!). API-Keys,
   Service Accounts, Verschlüsselungsschlüssel dort niemals hinein. Funde im
   Bestand melden, nicht kopieren.
2. **`firestore.rules` ist sicherheitskritisch.** Jede neue Collection braucht
   im selben Commit eine Regel, Catch-all am Ende ist deny. Keine Regel
   aufweichen, um Client-Zugriff schnell zu fixen. Aktuell geregelt: `users`
   (+ `data/`), `usernames`, `pending_verifications`, `feedback`, `apiKeys`
   (für Clients KOMPLETT gesperrt, read und write false) — alles andere
   blockiert.
3. **Kein Client-Zugriff auf Secrets-Collections.** `apiKeys` ist für Clients
   komplett gesperrt und nur über das Firebase Admin SDK in Route Handlern
   erreichbar. Neue Collections mit API-Keys oder verschlüsselten
   Fremdschlüsseln folgen diesem Muster.
4. **Keine Breaking Changes an bestehenden API-Endpoints** — der ESP32 draußen
   kann nicht mitdeployed werden. Betroffen: `GET /api/v1/today` (+
   `?format=text`), `POST /api/v1/log` (Auth via `X-API-Key`-Header).
   Key-Verwaltungsrouten (`/api/v1/keys*`) sind Web-intern, dort sind nur
   Feld-Erweiterungen ohne Verhaltensänderung ok.
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
  Server-Code (Route Handler) berechnet „heute" über `lib/dates.ts` — niemals
  rohes UTC-Datum nehmen, sonst Zeitzonen-Bug (Europe/Berlin, 04:00-Grenze).
- **Lesekosten mitdenken.** Kein Muster, bei dem eine Ansicht N Dokumente
  einzeln liest; aggregiere in ein Dokument, wenn Daten immer gemeinsam
  gelesen werden. (`GET /api/v1/today` liest z. B. EINE Collection-Group-Query
  für alle planItems statt N Plan-Queries.)
- **Schemalos heißt defensiv lesen.** Bestehende Dokumente haben neue Felder
  nicht — immer `feld ?? default`.
- Neue Felder für bestehende Dokumente brauchen ein idempotentes
  Backfill-Skript in `scripts/` (Admin SDK).
- Composite Indexes gehören nach `firestore.indexes.json` (existiert, enthält
  den Index `planItems(uid, nextDueAt)`) und in denselben Commit wie die Query.
- Zusammengehörige Schreibvorgänge in Transaktion/Batch; Zähler mit
  `FieldValue.increment`.

## API-Routen (`app/api/v1`)

- **`GET /api/v1/today`** — Widget-Tagesplan (ESP32/Desktop-Widget). Auth über
  Header `X-API-Key` (Scope `read`). Antwort als JSON oder `?format=text`
  (max. 5 Zeilen à 40 Zeichen, reines ASCII — Formatter in `lib/apiText.ts`,
  reine Funktion mit Tests). `url`-Felder sind absolut (Basis aus Request-
  Headern) und zeigen auf die Übungsseite.
- **`POST /api/v1/log`** — Abhaken via API (Scope `write`). Body `{ planId,
  planItemId, quality }` ODER `{ planId, planItemId, correct, total }`.
  Nutzt dieselbe Transaktion wie das Web: reine Berechnung in
  `lib/planReview.ts`, Firestore-Zugriffe getrennt (Client: `lib/plans.ts`,
  Server: `lib/server/planReviewAdmin.ts` mit Eigentums-Check — Admin SDK
  umgeht die Rules).
- **`/api/v1/keys` + `/api/v1/keys/[keyHash]`** — Key-Verwaltung der
  Profileinstellungen. Auth über `Authorization: Bearer <Firebase-ID-Token>`
  (App hat keine Session-Cookies). Klartext-Key wird nur bei Erstellung
  einmalig zurückgegeben; in Firestore liegt nur der SHA-256-Hash
  (`apiKeys/{keyHash}`, `lib/apiKeys.ts`).
- **Pflicht in jeder Route**: `export const dynamic = "force-dynamic"` +
  `Cache-Control: no-store` (sonst cacht Next die Antworten statisch),
  `export const runtime = "nodejs"` (firebase-admin läuft nicht auf Edge),
  Eingabevalidierung mit Zod, kein Stacktrace in Responses (Text-Endpoint
  antwortet im Fehlerfall nur `ERR`).
- **Rate-Limit pro Key liegt am apiKeys-Dokument** (`rateRead/rateWrite`-
  Fenster + Zähler, fortgeschrieben in derselben Transaktion wie `lastUsedAt`)
  — bewusst NICHT in-memory: auf Vercel trifft jeder Request potenziell eine
  frische Instanz. `lastUsedAt` höchstens einmal pro Stunde schreiben
  (5-Minuten-Poll kostet sonst unnötig Writes).
- Credentials: Env-Variable `FIREBASE_SERVICE_ACCOUNT` (base64-kodiertes
  Service-Account-JSON, **nie** `NEXT_PUBLIC_`-Prefix), Singleton in
  `lib/firebaseAdmin.ts`. Skripte fallen ohne die Variable auf
  `GOOGLE_APPLICATION_CREDENTIALS` zurück.

## Module & Inhalte hinzufügen

1. `lib/<fach>Data.ts` mit `Module`-Typ aus `lib/types.ts` erstellen.
2. In `lib/data.ts` importieren und zu `allModules` hinzufügen.
3. Optional `lib/<fach>Exercises.ts`, Karteikarten nach `lib/flashcardData.ts`.
4. Enthält die Datei LaTeX: in `scripts/validate-latex.sh` `FILES` ergänzen.

**Modul-Aufgabenpools:** Neue Übungs-/Prüfungsaufgaben werden in den
Legacy-Arrays (`lib/mathExercises.ts` bzw. den `*Data.ts`-Pools) ergänzt und
danach per `npm run convert:module-exercises` ins JSON-Registry-System
(`content/exercises/modules/`, `lib/exercises/moduleRegistry.ts`) überführt.
Die Laufzeit-App liest ausschließlich die JSON-Registry. Äquivalenz-Check:
`npx tsx scripts/verify-module-migration.ts`.

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