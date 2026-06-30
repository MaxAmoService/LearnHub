import { Module } from "./types";

export const reactModule: Module = {
    id: "1",
    slug: "react-grundlagen",
    title: "React Grundlagen",
    description: "Lerne die Basics von React - Komponenten, Props, State und Hooks",
    icon: "⚛️",
    color: "#61dafb",
    category: "programmieren",
    progress: 0,
    merkblatt: "## 📋 Merkblatt: React\n\n### Grundlagen\n- Komponenten = Funktionen die JSX zurückgeben\n- JSX = HTML-ähnliche Syntax in JavaScript\n- Props = Daten von Eltern → Kinder (read-only)\n- State = interner Zustand mit useState()\n\n### Hooks\n- useState(): State verwalten\n- useEffect(): Nebeneffekte (API, Timer)\n- useContext(): Context nutzen\n\n### Regeln\n- Komponenten immer mit Großbuchstaben\n- Hooks nur auf oberster Ebene\n- state nie direkt manipulieren, sondern setState() nutzen",
    lessons: [
      {
        id: "r1",
        title: "Was ist React?",
        duration: "5 min",
        type: "video",
        content: `# Was ist React?

React ist eine **JavaScript-Bibliothek** von Meta (ehemals Facebook) für den Aufbau von Benutzeroberflächen. Stell dir vor, du baust eine Website wie ein Haus: React gibt dir vorgefertigte Bausteine (Komponenten), die du zusammensetzen kannst, statt alles von Grund auf zu mauern.

## Warum React lernen?

- **Komponenten-basiert**: Baue UIs aus wiederverwendbaren Bausteinen. Eine Navigationsleiste ist eine Komponente, die du überall einfügen kannst — ohne Code zu kopieren.
- **Virtual DOM**: React aktualisiert nur die Teile der Seite, die sich geändert haben. Das macht deine App schnell, auch wenn sich vieles gleichzeitig ändert.
- **Riesiges Ökosystem**: Tausende von Bibliotheken, Tools und Tutorials. Egal welches Problem du hast — jemand hat es schon gelöst.
- **Gefragt am Arbeitsmarkt**: React ist eines der meistgesuchten Skills in der Webentwicklung.

## React vs. Vanilla JavaScript

Mit Vanilla JavaScript musst du DOM-Elemente manuell erstellen, aktualisieren und Events verwalten. Das führt schnell zu unübersichtlichem Code. Mit React beschreibst du einfach, **wie** die Oberfläche aussehen soll — React kümmert sich um das **Wie**.

## JSX — HTML in JavaScript

JSX sieht aus wie HTML, ist aber eigentlich JavaScript. Du kannst darin Variablen, Funktionen und Logik verwenden. JSX wird von React in normale JavaScript-Aufrufe umgewandelt.

## Erste Komponente

Eine React-Komponente ist eine Funktion, die JSX zurückgibt. Der Name muss immer mit einem Großbuchstaben beginnen — das unterscheidet Komponenten von normalen HTML-Tags:`,
        codeExample: `// Eine einfache React-Komponente
// Der Name MUSS mit Großbuchstaben beginnen!
function Greeting({ name }) {
  // JSX wird zurückgegeben — sieht aus wie HTML
  // Aber {name} ist JavaScript-Code im HTML!
  return (
    <div className="greeting">
      <h1>Hallo, {name}!</h1>
      <p>Willkommen in React 🚀</p>
    </div>
  );
}

// Komponente verwenden — wie ein HTML-Tag
// Props werden als Attribute übergeben
<Greeting name="Moritz" />
// Ergebnis: <div class="greeting"><h1>Hallo, Moritz!</h1>...

// Verschachtelte Komponenten
function App() {
  return (
    <div>
      <Greeting name="Anna" />
      <Greeting name="Max" />
      <Greeting name="Lisa" />
    </div>
  );
}
// Ergebnis: Drei separate Begrüßungen, jeweils mit anderem Namen`,
      },
      {
        id: "r2",
        title: "Komponenten & Props",
        duration: "10 min",
        type: "interactive",
        interactive: "codeSandbox" as const,
        content: `# Komponenten & Props

Komponenten sind das Herzstück von React. Sie sind wiederverwendbare UI-Bausteine — wie LEGO-Steine, die du zusammensetzen kannst. Jede Komponente hat ihren eigenen Bereich und kann Daten empfangen.

## Was sind Props?

Props (Properties) sind Daten, die von einer **Eltern-Komponente an eine Kind-Komponente** übergeben werden. Stell dir Props wie Argumente einer Funktion vor: Die Eltern-Komponente "sagt" der Kind-Komponente, was sie anzeigen soll.

## Props sind read-only!

Eine Komponente darf ihre Props **niemals** verändern. Das ist eine fundamentale Regel in React. Wenn sich Daten ändern sollen, muss die Eltern-Komponente neue Props übergeben. Das macht das Verhalten der App vorhersehbar und leichter zu debuggen.

## Mehrere Props

Du kannst so viele Props übergeben wie du willst. Sie werden als Attribute im JSX-Tag geschrieben. Strings in Anführungszeichen, Zahlen und JavaScript-Ausdrücke in geschweiften Klammern.

## Beispiel: Benutzer-Karte

Hier sehen wir, wie eine Komponente mehrere Props empfängt und daraus eine strukturierte Anzeige baut:`,
        codeExample: `// Eine Komponente mit mehreren Props
// Props werden in { } destrukturiert
function UserCard({ name, email, age, role }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Alter: {age}</p>
      {/* Ternary: wenn role vorhanden, zeige es an */}
      {role && <span className="badge">{role}</span>}
    </div>
  );
}

// Komponente mit Props verwenden
<UserCard
  name="Moritz"
  email="moritz@amo.com"
  age={22}
  role="Student"
/>

// Listen von Komponenten rendern
const users = [
  { id: 1, name: "Anna", email: "anna@amo.com", age: 25 },
  { id: 2, name: "Max", email: "max@amo.com", age: 30 },
  { id: 3, name: "Lisa", email: "lisa@amo.com", age: 28 },
];

// map() erstellt für jeden User eine UserCard
// key={user.id} hilft React, Elemente zu unterscheiden
function UserList() {
  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}`,
      },
      {
        id: "r3",
        title: "useState Hook",
        duration: "12 min",
        type: "interactive",
        interactive: "codeSandbox" as const,
        content: `# useState Hook

Der **useState**-Hook ermöglicht es Funktionskomponenten, einen internen Zustand (State) zu verwalten. Ohne State wäre React nur eine statische HTML-Vorlage. State macht deine App interaktiv — wenn sich Daten ändern, aktualisiert sich die Oberfläche automatisch.

## Syntax

\`const [state, setState] = useState(initialValue);\`

- \`state\`: Der aktuelle Wert (liest du wie eine Variable)
- \`setState\`: Funktion zum Aktualisieren (verändert den Wert und löst einen Re-Render aus)
- \`initialValue\`: Der Startwert beim ersten Laden

## Wichtig: State-Updates sind asynchron!

Wenn du setState aufrufst, aktualisiert React nicht sofort die Variable. React sammelt Updates und führt sie gebündelt aus. Deshalb siehst du den alten Wert, wenn du direkt nach setState den State liest.

## Beispiel: Counter

Ein einfacher Zähler zeigt das Grundprinzip: Klick auf den Button → setState wird aufgerufen → React rendert die Komponente neu → der neue Wert wird angezeigt:`,
        codeExample: `import { useState } from "react";

// Ein einfacher Counter
function Counter() {
  // useState gibt [aktuellerWert, setFunktion] zurück
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Du hast {count} mal geklickt</p>
      {/* onClick ruft setCount auf, wenn der Button geklickt wird */}
      <button onClick={() => setCount(count + 1)}>
        Klick mich!
      </button>
    </div>
  );
}

// State als Objekt — z.B. ein Formular
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Ein Handler für alle Felder
  const handleChange = (e) => {
    // Spread-Operator (...) kopiert alle bestehenden Werte
    // dann wird nur das geänderte Feld überschrieben
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form>
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Passwort"
      />
      <button type="submit">Einloggen</button>
    </form>
  );
}`,
      },
      {
        id: "r4",
        title: "useEffect Hook",
        duration: "15 min",
        type: "interactive",
        content: `# useEffect Hook

**useEffect** ist der Hook für sogenannte "Side Effects" — alles, was außerhalb des normalen Render-Ablaufs passiert. Dazu gehören: Daten von einer API laden, Timer starten, auf Fenstergröße reagieren, oder Daten im Browser speichern (localStorage).

## Syntax

\`useEffect(() => { /* code */ }, [dependencies]);\`

- **Leeres Array []**: Der Effekt läuft nur einmal beim ersten Rendern ("Mount")
- **Mit Dependencies [a, b]**: Der Effekt läuft, wenn sich a oder b ändert
- **Kein Array**: Der Effekt läuft bei JEDEM Render (meistens nicht gewollt!)

## Wann wird useEffect ausgeführt?

1. Komponente wird zum ersten Mal gerendert → Effekt läuft
2. Sich ändernde Dependencies → Effekt läuft nochmal
3. Komponente wird entfernt → Cleanup-Funktion (falls vorhanden)

## Beispiel: Daten laden und Timer

Hier sehen wir zwei typische Anwendungsfälle: API-Daten beim Laden abrufen und einen Timer, der bei jeder Sekunde aktualisiert:`,
        codeExample: `import { useState, useEffect } from "react";

// Beispiel 1: Daten von einer API laden
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // useEffect kann nicht async sein,
    // deshalb definieren wir eine async Funktion darin
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) throw new Error("Fehler beim Laden!");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Neu laden, wenn sich userId ändert

  if (loading) return <p>Lädt...</p>;
  if (error) return <p>Fehler: {error}</p>;
  return <h1>{user?.name}</h1>;
}

// Beispiel 2: Timer mit Cleanup
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Timer starten — läuft jede Sekunde
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup: Timer stoppen, wenn Komponente entfernt wird
    // Ohne Cleanup läuft der Timer ewig weiter!
    return () => clearInterval(timer);
  }, []); // Leeres Array = nur einmal starten

  return <p>Vergangene Sekunden: {seconds}</p>;
}`,
      },
      {
        id: "r5",
        title: "Quiz: React Grundlagen",
        duration: "5 min",
        type: "quiz",
        content: `# Quiz: React Grundlagen

Teste dein Wissen über React! Beantworte die Fragen, um das Modul abzuschließen.

## Tipps

- Lies die Fragen aufmerksam
- Bei Texteingabe: Achte auf Groß-/Kleinschreibung
- 80% werden zum Bestehen benötigt

Viel Erfolg! 🍀`,
      },
    ],
};
