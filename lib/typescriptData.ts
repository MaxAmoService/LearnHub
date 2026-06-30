import { Module } from "./types";

export const typescriptModule: Module = {
    id: "2",
    slug: "typescript-basics",
    title: "TypeScript Basics",
    description: "Typsicherheit in JavaScript - Interfaces, Types, Generics",
    icon: "📘",
    color: "#3178c6",
    category: "programmieren",
    progress: 0,
    merkblatt: "## 📋 Merkblatt: TypeScript\n\n### Primitive Types\n- string, number, boolean, null, undefined\n- any (vermeiden!), unknown, never\n\n### Complex Types\n- type User = { name: string; age: number }\n- interface Product { id: number; name: string }\n- Union: string | number\n- Array: number[] oder Array<number>\n\n### Functions\n- (a: number, b: number) => number\n- Optional: (name?: string) => void\n\n### Generics\n- Array<T>\n- function identity<T>(arg: T): T",
    lessons: [
      {
        id: "t1",
        title: "Warum TypeScript?",
        duration: "5 min",
        type: "text",
        content: `# Warum TypeScript?

TypeScript ist ein **Superset von JavaScript**, das statische Typen hinzufügt. Das bedeutet: Jedes gültige JavaScript-Programm ist auch gültiges TypeScript — aber TypeScript fügt eine zusätzliche Sicherheitsebene hinzu. Du schreibst weiterhin JavaScript, sagst dem Compiler aber, welche Art von Daten jede Variable, Funktion oder Komponente erwarten soll.

## Die Probleme mit reinem JavaScript

In JavaScript wird der Typ einer Variable erst zur Laufzeit geprüft. Das heißt: Ein Fehler zeigt sich erst, wenn der Code tatsächlich ausgeführt wird — möglicherweise im Browser eines Users, mitten in der Nacht. Ein Tippfehler, ein falscher Parameter, eine fehlende Eigenschaft — all das fällt erst spät auf.

## Warum TypeScript lernen?

- **Fehler sofort finden**: Der TypeScript-Compiler prüft deinen Code BEVOR er ausgeführt wird. Tippfehler, falsche Parameter, fehlende Eigenschaften — alles wird rot unterstrichen, bevor du den Browser öffnest.
- **Bessere IDE-Unterstützung**: Dank Typen weiß dein Editor genau, welche Methoden ein Objekt hat. Auto-Complete, Fehleranzeigen und Refactoring funktionieren viel besser.
- **Selbstdokumentierender Code**: Wenn du \`age: number\` siehst, weißt du sofort, dass hier eine Zahl erwartet wird. Keine Kommentare nötig.
- **Sichereres Refactoring**: Wenn du eine Funktion umbenennst oder eine Eigenschaft änderst, findet TypeScript alle Stellen, die angepasst werden müssen.
- **Teamarbeit**: TypeScript macht Code für andere (und dein zukünftiges Ich) leichter verständlich.

## TypeScript vs. JavaScript — ein Vergleich

| | JavaScript | TypeScript |
|---|---|---|
| **Typ-Prüfung** | Zur Laufzeit | Zur Compile-Zeit |
| **Fehler finden** | Im Browser/Server | Beim Schreiben im Editor |
| **Typ-Deklaration** | Keine | Explizit (string, number, ...) |
| **IDE-Support** | Basis | Hervorragend |
| **Lernaufwand** | Weniger | Mehr (aber lohnenswert) |

## Erstes Beispiel

Hier siehst du den Unterschied: In JavaScript fällt ein Typfehler erst bei der Ausführung auf. In TypeScript blockiert der Compiler den Fehler sofort:`,
        codeExample: `// ===== JavaScript =====
// Kein Fehler bis zur Ausführung!
function add(a, b) {
  return a + b;
}
console.log(add("5", 3));  // "53" — String statt Zahl!
// Das ist ein Bug, aber JavaScript sagt nichts.

// ===== TypeScript =====
// Der Compiler prüft die Typen BEVOR der Code läuft
function addTs(a: number, b: number): number {
  return a + b;
}
addTs("5", 3);  // ❌ Compile Error!
// "Argument of type 'string' is not assignable
//  to parameter of type 'number'"

// Typen für Variablen
let name: string = "Moritz";
let age: number = 22;
let isActive: boolean = true;

// name = 42;  // ❌ Fehler! 42 ist keine string

// Arrays mit Typen
let scores: number[] = [100, 95, 88];
let names: string[] = ["Anna", "Max", "Lisa"];

// Objekte mit Typen
let user: { name: string; age: number } = {
  name: "Moritz",
  age: 22,
};
// user.email = "test";  // ❌ Fehler! email existiert nicht`,
      },
      {
        id: "t2",
        title: "Interfaces & Types",
        duration: "12 min",
        type: "interactive",
        interactive: "codeSandbox" as const,
        content: `# Interfaces & Types

In TypeScript gibt es zwei Hauptmöglichkeiten, um die Struktur von Objekten zu definieren: **Interfaces** und **Type Aliases**. Beide beschreiben, welche Eigenschaften ein Objekt haben soll — aber sie haben unterschiedliche Stärken.

## Was ist ein Interface?

Ein Interface beschreibt die "Form" eines Objekts. Du legst fest, welche Eigenschaften es gibt, welche Typen sie haben und welche optional sind. Interfaces werden hauptsächlich für Objekte und Klassen verwendet und können mit \`extends\` erweitert werden.

## Was ist ein Type Alias?

Ein Type Alias ist flexibler als ein Interface. Es kann nicht nur Objekte beschreiben, sondern auch Primitive Typen, Union Types (\`string | number\`), Tupel (\`[number, string]\`) und mehr.

## Wann was verwenden?

- **Interface**: Wenn du ein Objekt beschreibst und es vielleicht erweitern willst. Perfekt für API-Antworten, Konfigurationen, Props.
- **Type**: Wenn du Union Types, Tupel oder komplexe Kombinationen brauchst.
- In der Praxis: Beides funktioniert meistens gleich. Wähle, was sich natürlicher anfühlt.

## Optionale Eigenschaften

Mit \`?\` markierst du Eigenschaften, die nicht zwingend vorhanden sein müssen. Das ist nützlich für optionale Konfigurationen oder nicht-pflichtige Formularfelder:`,
        codeExample: `// ===== Interface =====
// Beschreibt die Struktur eines Benutzer-Objekts
interface User {
  id: number;        // Pflicht-Eigenschaft
  name: string;      // Pflicht-Eigenschaft
  email: string;     // Pflicht-Eigenschaft
  age?: number;      // Optional (? = kann fehlen)
  bio?: string;      // Optional
}

// Ein User-Objekt erstellen
const user: User = {
  id: 1,
  name: "Moritz",
  email: "moritz@amo.com",
  // age und bio können weggelassen werden
};

// ===== Interface erweitern =====
// Admin erbt ALLE Eigenschaften von User + eigene
interface Admin extends User {
  role: "admin" | "moderator";  // Nur diese Werte erlaubt
  permissions: string[];          // Array von Strings
}

const admin: Admin = {
  id: 2,
  name: "SuperAdmin",
  email: "admin@amo.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
};

// ===== Type Alias =====
// Für Primitive und Union Types
type ID = string | number;           // Entweder string ODER number
type Status = "active" | "inactive" | "banned";  // Nur diese Werte
type Coordinates = [number, number];  // Tupel: genau [Zahl, Zahl]

// Type für ein Objekt (wie Interface, aber mit type)
type Product = {
  id: ID;
  name: string;
  price: number;
  status: Status;
};

const product: Product = {
  id: "abc-123",
  name: "Laptop",
  price: 999.99,
  status: "active",
};

// ===== Praxis-Beispiel: API-Antwort =====
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

const response: ApiResponse<User[]> = {
  success: true,
  data: [user],
  // error ist optional — hier weggelassen
};`,
      },
      {
        id: "t3",
        title: "Generics",
        duration: "15 min",
        type: "interactive",
        content: `# Generics

Generics (dt. "Generische Typen") sind eines der mächtigsten Features in TypeScript. Sie machen deinen Code **wiederverwendbar** UND **typsicher** — gleichzeitig. Stell dir Generics wie Schablonen vor: Du schreibst einmal einen Code-Block, und er funktioniert mit jedem Typ, den du übergibst.

## Problem ohne Generics

Ohne Generics müsstest du für jeden Typ eine eigene Funktion schreiben oder \`any\` verwenden. Mit \`any\` verlierst du aber alle Typ-Sicherheitsvorteile — der Compiler kann nicht mehr prüfen, ob dein Code korrekt ist.

## Lösung mit Generics

Mit Generics sagst du TypeScript: "Diese Funktion arbeitet mit einem Typ T, und ich sage dir bei Aufruf, was T ist." TypeScript merkt sich den Typ und prüft alles korrekt — ohne dass du mehrfach Code schreiben musst.

## Wie funktioniert \`<T>\`?

Das \`<T>\` nach dem Funktionsnamen definiert einen Platzhalter-Typ. Wenn du die Funktion aufrufst, erkennt TypeScript automatisch, welchen konkreten Typ \`T\` haben soll (z.B. \`number\` oder \`string\`). Du kannst auch mehrere Generics verwenden: \`<T, U>\`.

## Typische Anwendungsfälle

- **Arrays**: \`Array<T>\` oder \`T[]\` — eine Liste von Elementen eines beliebigen Typs
- **Promises**: \`Promise<T>\` — ein Wert, der in der Zukunft verfügbar ist
- **React useState**: \`useState<T>\` — State mit einem bestimmten Typ
- **API-Antworten**: \`ApiResponse<User>\` — generische Antwortstruktur

## Beispiel: Generische Funktionen und Interfaces

Hier sehen wir, wie Generics funktionieren — von einfachen Funktionen bis zu komplexen API-Strukturen:`,
        codeExample: `// ===== Einfache Generic-Funktion =====
// Das <T> ist ein Platzhalter für einen beliebigen Typ
// Bei Aufruf erkennt TypeScript automatisch den Typ
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TypeScript erkennt: T = number
const num = first([1, 2, 3]);        // Type: number | undefined
// TypeScript erkennt: T = string
const str = first(["a", "b", "c"]);  // Type: string | undefined
// num.toUpperCase();  // ❌ Fehler! num ist number, nicht string

// ===== Generics mit mehreren Typen =====
function pair<A, B>(first: A, second: B): [A, B] {
  return [first, second];
}

const p = pair("hello", 42);  // Type: [string, number]
const p2 = pair(true, [1,2]); // Type: [boolean, number[]]

// ===== Generics mit Constraints =====
// T muss eine Längen-Eigenschaft haben (string, Array, etc.)
function logLength<T extends { length: number }>(item: T): T {
  console.log("Länge:", item.length);
  return item;
}

logLength("Hallo");      // ✅ Länge: 5
logLength([1, 2, 3]);     // ✅ Länge: 3
// logLength(42);         // ❌ Fehler! number hat keine length-Eigenschaft

// ===== Generisches Interface =====
// T wird beim Verwenden festgelegt
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

// T = User
const userResponse: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: "Moritz", email: "moritz@amo.com" },
  message: "Benutzer geladen",
};

// T = User[] (Array von Usern)
const listResponse: ApiResponse<User[]> = {
  success: true,
  data: [
    { id: 1, name: "Anna", email: "anna@amo.com" },
    { id: 2, name: "Max", email: "max@amo.com" },
  ],
  message: "Alle Benutzer geladen",
};`,
      },
    ],
};
