import { Module } from "./types";

// ============================================================================
// IHK "Diagramme und Darstellungsformen" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

// --- FLASHCARDS (Anki-Stil) ---

export const ihkModule: Module = {
  id: "ihk-diagramme",
  slug: "ihk-diagramme",
  title: "Diagramme & Darstellungen",
  description: "IHK IT-Handbuch: UML, PAP, Struktogramme, EPK, Sortier-/Suchalgorithmen, Netzplantechnik, ER-Modell, Lasten-/Pflichtenheft",
  icon: "📊",
  color: "#8B5CF6",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Diagramme & Darstellungen (IHK)

### UML-Übersicht
- **Strukturdiagramme:** Klassendiagramm, Paketdiagramm
- **Verhaltensdiagramme:** Use Case, Zustandsdiagramm
- **Interaktionsdiagramme:** Sequenz, Kommunikation

### PAP (DIN 66001)
- Oval = Start/Ende
- Rechteck = Operation
- Raute = Entscheidung
- Parallelogramm = Ein-/Ausgabe

### Struktogramm (Nassi-Shneiderman)
- Sequenz, Auswahl (If-Then-Else), Wiederholung
- Keine Sprünge möglich → erzwingt strukturierte Programmierung

### EPK
- Ereignis (Sechseck) → Funktion (Rechteck) → Ereignis → ...
- Operatoren: AND (parallel), OR (mehrere möglich), XOR (exklusiv)

### Sortieralgorithmen
- Bubblesort: Vergleiche Nachbarn, tausche — $O(n^2)$
- Selectionsort: Kleinstes suchen, tauschen — $O(n^2)$
- Insertionsort: Element einfügen — $O(n^2)$ / $O(n)$ bei fast sortiert

### Suchalgorithmen
- Linear: Jedes Element durchsuchen — $O(n)$
- Binär: Mitte vergleichen, halbieren — $O(\log n)$ — braucht sortierte Liste!

### Netzplantechnik
- FAZ/FEZ/SAZ/SEZ | Pufferzeit = SAZ − FAZ
- Kritischer Pfad = Pufferzeit = 0

### ER-Modell
- Entität = Rechteck, Attribut = Ellipse, Beziehung = Raute
- Kardinalitäten: 1:1, 1:n, n:m

### Lastenheft vs Pflichtenheft
- Lastenheft = WAS (Anforderungen, Auftraggeber)
- Pflichtenheft = WIE (Lösung, Auftragnehmer)`,

  lessons: [
    // --- Lektion 1: Pseudocode ---
    {
      id: "ihk-1",
      title: "Pseudocode",
      duration: "15 min",
      type: "interactive",
      interactive: "pseudocodeRunner",
      content: `## Was ist Pseudocode?

**Pseudocode** ist eine **sprachunabhängige, formale Sprache**, um Algorithmen zu beschreiben. Er sieht aus wie echter Code, ist aber an keine Programmiersprache gebunden.

> 💡 Pseudocode ist wie ein **Bauplan für deinen Code** — du beschreibst die Logik, ohne dich um Syntax zu kümmern.

---

## Warum braucht man Pseudocode?

- 📋 **Planung:** Algorithmus strukturieren, bevor man programmiert
- 💬 **Kommunikation:** Logik verständlich machen ohne Code
- 📝 **IHK-Prüfung:** Algorithmen formal beschreiben — typischer Prüfungsauftrag

---

## Die wichtigsten Strukturen

| Struktur | Zweck | Beispiel |
|----------|-------|----------|
| 📦 **Variable** | Wert speichern | \`meineZahl = 42\` |
| 🔶 **if/else** | Bedingte Verzweigung | \`if (bedingung) { ... } else { ... }\` |
| 🔁 **while** | Kopfgesteuerte Schleife | Bedingung wird AM ANFANG geprüft |
| 🔁 **do-while** | Fußgesteuerte Schleife | Wird mindestens 1× ausgeführt |
| 🔀 **switch/case** | Mehrfachverzweigung | \`match (eingabe): case ...\` |

> 💡 Alle Strukturen siehst du in Aktion im **PseudocodeRunner** oben!

---

## 🧩 Interaktiv erkunden

[INTERACTIVE]
## 🎯 Regeln für die IHK-Prüfung

> ❗ **Diese Regeln sichern dir Punkte!**

1. ✏️ **Formal codenah** schreiben — keine deutschen Sätze
2. { } **Geschweifte Klammern** für Blöcke verwenden
3. 🇬🇧 **Englische Begriffe** bevorzugen (if, else, while, for, return)
4. 💬 **Kommentare** mit # oder // ergänzen
5. 📝 **Auf Papier** — für die Prüfung per Hand schreibbar
6. 🧪 **Schreibtischtest** durchführen: Variablenwerte in einer Tabelle protokollieren

> ✅ **Merke:** Pseudocode muss lesbar und nachvollziehbar sein. Wenn ein anderer Entwickler den Algorithmus versteht, hast du es richtig gemacht.`
    },

    // --- Lektion 2: Programmablaufplan (PAP) ---
    {
      id: "ihk-2",
      title: "Programmablaufplan (PAP)",
      duration: "15 min",
      type: "interactive",
      visuals: [
        { type: "papSymbols", position: "top" },
        { type: "papExample", position: "bottom" },
      ],
      interactive: "papBuilder",
      content: `## Was ist ein PAP?

Ein Programmablaufplan (PAP) ist eine **grafische Darstellung** eines Algorithmus nach der Norm **DIN 66001**. Er zeigt den Ablauf eines Programms mit standardisierten Symbolen — unabhängig von einer Programmiersprache.

> 💡 Denk an den PAP wie einen **Bauplan für deinen Code** — du siehst den gesamten Ablauf, bevor du eine Zeile programmierst.

## Wofür braucht man ein PAP?

- 🎯 **Prozessdarstellung:** Code allgemein visualisieren, ohne eine Sprache zu nutzen
- 💬 **Kommunikation:** Nicht-Techniker können den Ablauf verstehen
- 📝 **IHK-Prüfung:** Typische Aufgabe — Algorithmus als PAP zeichnen

> ⚠️ In der IHK-Prüfung musst du PAPs **auf Papier zeichnen** können — nicht nur am PC!

---

## Die Symbole nach DIN 66001

| Symbol | Form | Bedeutung |
|--------|------|------------|
| 🟢 **Start/Ende** | Oval | Beginn oder Ende des Programms |
| 🟦 **Operation** | Rechteck | Berechnung, Zuweisung |
| 🔶 **Entscheidung** | Raute | Ja/Nein-Abfrage (zwei Ausgänge!) |
| 🟪 **Ein-/Ausgabe** | Parallelogramm | Benutzereingabe oder Bildschirmausgabe |
| ➡️ **Flusspfeil** | Pfeil | Richtung des Ablaufs |

> ✅ Die Raute ist das EINZIGE Symbol mit zwei Ausgängen. Alle anderen haben genau einen.

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der interaktive PAP-Builder oben zeigt dir ein komplettes Beispiel — teste es selbst!

---

## ⚔️ PAP vs. Struktogramm

Beide dienen der Algorithmus-Darstellung, aber sie haben unterschiedliche Stärken:

| | PAP | Struktogramm |
|---|---|---|
| 🔄 Abläufe | Kann auch unstrukturierte Abläufe darstellen | Nur strukturierte Abläufe |
| 📐 Struktur | Kann schnell unübersichtlich werden | Strukturiert und übersichtlich |
| 💻 Code | Schwer in Code übertragbar | Direkt in Code übertragbar |
| 🚫 Sprünge | Erlaubt (goto möglich) | Verhindert Sprünge |

> ℹ️ **Für die IHK:** Beide sind wichtig! Der PAP zeigt Flexibilität, das Struktogramm zeigt saubere Struktur.

---

## 🎯 Tipps für die IHK-Prüfung

> ❗ **Diese Tipps können Punkte bringen!**

- ✏️ Auf **Papier** üben — nicht nur am PC
- 📏 Symbole **sauber und beschriftet** zeichnen
- 🇬🇧 **Englische Beschriftungen** verwenden (Start, End, Input, Output)
- 🧪 Immer einen **Schreibtischtest** durchführen: Variablenwerte in einer Tabelle protokollieren
- ➡️ **Flusspfeile** nicht vergessen — sie zeigen die Richtung!

> 📝 **Schreibtischtest:** Erstelle eine Tabelle mit Spalten "Schritt", "Variable", "Wert" und gehe jeden PAP-Schritt durch. So erkennst du Fehler bevor du den Code schreibst.`
    },

    // --- Lektion 3: Struktogramm ---
    {
      id: "ihk-3",
      title: "Struktogramm (Nassi-Shneiderman)",
      duration: "12 min",
      type: "interactive",
      interactive: "struktogrammBuilder",
      visuals: [
        { type: "struktBubbleSort", position: "bottom" },
      ],
      content: `## Was ist ein Struktogramm?

Ein Struktogramm nach **Nassi und Shneiderman** ist eine grafische Darstellung von Algorithmen, die **keine Sprünge (goto)** erlaubt. Es erzwingt **strukturierte Programmierung** — du kannst nur Blöcke stapeln, nicht springen.

> 💡 Im interaktiven Builder oben siehst du ein echtes Nassi-Shneiderman-Diagramm: Bubblesort mit verschachtelten Schleifen und if/else.

## Wofür braucht man ein Struktogramm?

- 🧱 **Struktur:** Erzwingt saubere, verschachtelte Programmierung
- 💻 **Code-Nähe:** Jede Struktur hat ein Pendant in jeder Programmiersprache
- 📝 **IHK-Prüfung:** Algorithmen als Struktogramm zeichnen ist eine typische Aufgabe
- 🚫 **Keine Sprünge:** Im Gegensatz zum PAP sind goto-Sprünge unmöglich

---

## Die vier Grundelemente

Der Builder oben zeigt dir alle vier Elemente in Aktion:

| Element | Darstellung | Zweck |
|---------|-------------|-------|
| 🟦 **Sequenz** | Einfaches Rechteck | Anweisungen nacheinander |
| 🔶 **Auswahl** | Block mit diagonaler Linie | if/else — NEIN links, JA rechts |
| 🔁 **Schleife** | Block mit Bogen links | for/while — Bedingung im Kopf |
| 🟪 **Ein-/Ausgabe** | Parallelogramm | input() oder print() |

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der interaktive Builder zeigt dir Bubblesort als Struktogramm — teste auch eigene Algorithmen!

---

## ⚔️ Struktogramm vs. PAP

| | Struktogramm | PAP |
|---|---|---|
| 🚫 Sprünge | Keine möglich — strukturiert! | Erlaubt (goto möglich) |
| 💻 Code-Nähe | Direkt übertragbar | Schwerer übertragbar |
| 📐 Struktur | Immer übersichtlich | Kann unübersichtlich werden |
| 🔄 Flexibilität | Eingeschränkt | Sehr flexibel |
| 📝 IHK-Prüfung | Beide wichtig! | Beide wichtig! |

> ℹ️ **Für die IHK:** Beide sind wichtig! Das Struktogramm zeigt saubere Struktur, der PAP zeigt Flexibilität.

---

## 🎯 Tipps für die IHK-Prüfung

> ❗ **Diese Tipps können Punkte bringen!**

- ✏️ Struktogramme **auf Papier** zeichnen — sauber und lesbar
- 📏 Blöcke **bündig** ausrichten — Verschachtelung muss sichtbar sein
- 🔁 Schleifen **immer** mit Bedingung oben und Rumpf darunter
- 🔶 Auswahl **immer** mit NEIN/Links und JA/Rechts
- 🧪 **Schreibtischtest** durchführen — Variablenwerte protokollieren

> 📝 **Merke:** Das Struktogramm erzwingt strukturierte Programmierung. In der Prüfung immer prüfen: Kann der Algorithmus strukturiert dargestellt werden? Wenn ja → Struktogramm. Wenn Sprünge nötig sind → PAP.`
    },

    // --- Lektion 4: Sortieralgorithmen ---
    {
      id: "ihk-4",
      title: "Sortieralgorithmen",
      duration: "20 min",
      type: "interactive",
      interactive: "sortVisualizer",
      content: `## Warum Sortieren?

Sortieren ist eine der **grundlegendsten Aufgaben** in der Informatik. Viele Algorithmen (z.B. binäre Suche) benötigen sortierte Daten als Eingabe. Die IHK verlangt das Verständnis und die Implementierung der wichtigsten Sortierverfahren.

---

## 🫧 Bubblesort

**Prinzip:** Vergleiche benachbarte Elemente und tausche sie, wenn sie in falscher Reihenfolge sind — wiederhole bis alles sortiert ist.

| | Wert |
|---|---|
| 🟢 Bester Fall | $O(n)$ — bereits sortiert |
| 🟡 Durchschnitt | $O(n^2)$ |
| 🔴 Schlechtester Fall | $O(n^2)$ |
| ✅ Stabil? | Ja |

---

## 🔍 Selectionsort

**Prinzip:** Finde das kleinste Element im unsortierten Teil und tausche es an die erste Position.

| | Wert |
|---|---|
| 🟡 Immer | $O(n^2)$ — wenige Tausche, viele Vergleiche |
| ✅ Stabil? | Nein |

---

## 📥 Insertionsort

**Prinzip:** Baue die sortierte Liste elementweise auf — jedes neue Element wird an der richtigen Stelle eingefügt.

| | Wert |
|---|---|
| 🟢 Bester Fall | $O(n)$ — fast sortiert |
| 🟡 Durchschnitt | $O(n^2)$ |
| 🔴 Schlechtester Fall | $O(n^2)$ |
| ✅ Stabil? | Ja |

---

## ⚔️ Vergleich der Sortieralgorithmen

## 🔨 Ausprobieren

[INTERACTIVE]

| | 🫧 Bubblesort | 🔍 Selectionsort | 📥 Insertionsort |
|---|---|---|---|
| **Prinzip** | Nachbarn vergleichen | Kleinstes suchen | Element einfügen |
| **Vergleiche** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ |
| **Tauschungen** | $O(n^2)$ | $O(n)$ | $O(n^2)$ |
| **Stabil?** | ✅ Ja | ❌ Nein | ✅ Ja |
| **Best for** | Verständnis | Wenig Tausche | Fast sortiert |

> ⚠️ Alle drei haben $O(n^2)$ — für die IHK reicht das. Echte Anwendungen nutzen **Quicksort** ($O(n \log n)$) oder **Mergesort**.

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 🧪 Immer einen **Schreibtischtest** machen — Variablen in einer Tabelle protokollieren
- 📊 Jeden **Durchlauf einzeln** aufschreiben — nicht abkürzen!
- ⏱️ **Zeitkomplexität** erklären können — nicht nur auswendig lernen
- 🔄 **Stabilität** erklären: Stabil = gleiche Elemente behalten ihre Reihenfolge`,
      codeExample: `// Insertionsort in Python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

liste = [2, 4, 5, 3, 1, 8]
print(insertion_sort(liste))  # [1, 2, 3, 4, 5, 8]`
    },

    // --- Lektion 5: Suchalgorithmen ---
    {
      id: "ihk-5",
      title: "Suchalgorithmen",
      duration: "10 min",
      type: "interactive",
      interactive: "searchVisualizer",
      content: `## Warum Suchen?

Daten suchen ist eine der **häufigsten Operationen** in der Softwareentwicklung — ob in einer Datenbank, einer Datei oder einer Liste. Die Art der Suche bestimmt, wie schnell du dein Ziel findest.

---

## 🔎 Lineare Suche

**Prinzip:** Gehe die Liste von Anfang bis Ende durch und prüfe jedes Element.

- **Voraussetzung:** Keine — die Liste muss NICHT sortiert sein
- **Zeitkomplexität:** 🟡 O(n)

---

## 🎯 Binäre Suche

**Prinzip:** Teile die sortierte Liste in der Mitte. Ist das mittlere Element das Ziel? Falls nicht: Suche nur in der linken oder rechten Hälfte weiter.

- **Voraussetzung:** Die Liste MUSS **sortiert** sein!
- **Zeitkomplexität:** 🟢 O(log n) — viel schneller als linear

> ❗ Bei 1 Million Einträgen: Lineare Suche = bis zu 1.000.000 Schritte, Binäre Suche = max. ~20 Schritte!

---

## ⚔️ Vergleich

## 🔨 Ausprobieren

[INTERACTIVE]

| | 🔎 Lineare Suche | 🎯 Binäre Suche |
|---|---|---|
| **Sortiert nötig?** | ❌ Nein | ✅ Ja |
| **Zeitkomplexität** | 🟡 O(n) | 🟢 O(log n) |
| **Bei 1 Million Einträgen** | max. 1.000.000 Schritte | max. ~20 Schritte |

> ❗ **Merke:** Binäre Suche ist exponentiell schneller, braucht aber eine sortierte Liste. In der IHK immer prüfen: Ist die Liste sortiert? Wenn ja → binäre Suche.

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 🧪 Immer einen **Schreibtischtest** machen — besonders bei binärer Suche!
- 📊 **Voraussetzung** prüfen: Ist die Liste sortiert? → Entscheidet welcher Algorithmus
- 🔢 **Mitte berechnen** auf Papier üben — Rundungsfehler vermeiden
- ⏱️ **Zeitkomplexität** erklären können: Warum ist O(log n) schneller?`,
      codeExample: `// Binäre Suche in Python
def binary_search(arr, ziel):
    links, rechts = 0, len(arr) - 1
    while links <= rechts:
        mitte = (links + rechts) // 2
        if arr[mitte] == ziel:
            return mitte
        elif arr[mitte] < ziel:
            links = mitte + 1
        else:
            rechts = mitte - 1
    return -1

sortiert = [1, 2, 3, 4, 5, 8]
print(binary_search(sortiert, 3))  # 2
print(binary_search(sortiert, 6))  # -1`
    },

    // --- Lektion 6: EPK ---
    {
      id: "ihk-6",
      title: "Ereignisgesteuerte Prozesskette (EPK)",
      duration: "15 min",
      type: "interactive",
      interactive: "epkBuilder",
      content: `## Was ist eine EPK?

Eine **EPK** (Ereignisgesteuerte Prozesskette) ist ein Diagramm zur Darstellung von **Geschäftsprozessen**. Sie zeigt die logische und chronologische Abfolge von **Ereignissen** und **Funktionen** — häufig verwendet in der Prozessoptimierung und Dokumentation.

> 💡 Die EPK ist wie ein **Flowchart für Geschäftsprozesse** — sie zeigt, was passiert und was das auslöst.

---

## Warum braucht man eine EPK?

- 📋 **Prozessdokumentation:** Abläufe im Unternehmen visualisieren
- 🔧 **Prozessoptimierung:** Schwachstellen und Verbesserungspotenziale erkennen
- 💬 **Kommunikation:** Abteilungen verstehen gemeinsame Prozesse
- 📝 **IHK-Prüfung:** Geschäftsprozesse als EPK modellieren

---

## 🧩 Die Elemente der EPK

| Element | Symbol | Beschreibung |
|---------|--------|-------------|
| 🟢 **Ereignis** | Sechseck | WAS passiert (z.B. "Bestellung eingegangen") |
| 🟦 **Funktion** | Abger. Rechteck | Eine TÄTIGKEIT (z.B. "Bestellung bearbeiten") |
| 🔀 **Operator** | AND / OR / XOR | Logische Verknüpfung mehrerer Pfade |

---

## 🔀 Die Operatoren

- **AND:** Alle Pfade werden **parallel** ausgeführt
- **OR:** **Mindestens ein** Pfad wird gewählt
- **XOR:** Genau **ein** Pfad wird gewählt (exklusiv)

---

## 📐 Grundregel der EPK

**Ereignis → Funktion → Ereignis → Funktion → ...**

Ereignisse und Funktionen **wechseln sich immer ab**. Zwei Funktionen oder zwei Ereignisse direkt hintereinander ist NICHT erlaubt.

> ❗ **Diese Regel wird in der IHK-Prüfung oft geprüft!**

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der EPK-Builder oben zeigt dir einen kompletten Bestellprozess — baue eigene EPKs!

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 📐 **Ereignis-Funktion-Wechsel** immer einhalten — das wird geprüft!
- 🔀 **Operatoren** richtig wählen: XOR für Entweder-Oder, AND für Parallel
- 📝 **Beschriftungen** kurz und präzise formulieren
- 🧪 Immer prüfen: Beginnt und endet der Prozess mit einem **Ereignis**?`,

    },

    // --- Lektion 7: UML Klassendiagramme ---
    {
      id: "ihk-7",
      title: "UML Klassendiagramme",
      duration: "18 min",
      type: "interactive",
      interactive: "umlClassDiagram",
      content: `## Was ist ein Klassendiagramm?

Das Klassendiagramm ist das **wichtigste Strukturdiagramm** in UML. Es zeigt Klassen, Interfaces, deren Attribute, Methoden und die **Beziehungen** zwischen ihnen. Es ist die Blaupause deiner Software-Architektur.

> 💡 Das Klassendiagramm ist der **Bauplan deiner Software** — bevor du programmierst, modellierst du die Struktur.

---

## 🧱 Aufbau einer Klasse

| Bereich | Inhalt | Sichtbarkeit |
|---------|--------|-------------|
| **Name** | Klassenname | — |
| **Attribute** | Eigenschaften | \`-\` privat, \`+\` öffentlich, \`#\` protected |
| **Methoden** | Funktionen | \`-\` privat, \`+\` öffentlich, \`#\` protected |

---

## 🔗 Arten von Beziehungen

| Beziehung | Symbol | Bedeutung |
|-----------|--------|-----------|
| ➡️ **Assoziation** | Einfache Linie | Klassen wissen voneinander |
| 🔷 **Aggregation** | ◇ Leere Raute | Lose Kopplung — Objekte können unabhängig existieren |
| 🔶 **Komposition** | ◆ Ausgefüllte Raute | Starke Kopplung — existenzabhängig (z.B. Räume ohne Gebäude) |
| 🏗️ **Vererbung** | ▷ Pfeil mit Dreieck | "ist ein" — Kind erbt von Elternklasse |

> 💡 Der UML-Class-Diagram-Builder oben zeigt dir alle Beziehungen interaktiv!

---

## 🔢 Kardinalitäten und Multiplizitäten

| Symbol | Bedeutung |
|--------|-----------|
| \`1\` | Genau eine Instanz |
| \`*\` | Beliebig viele (0 oder mehr) |
| \`1..*\` | Mindestens eine |
| \`0..1\` | Null oder eine |

> ❗ Kardinalitäten werden in der IHK oft abgefragt! 1:n und n:m sind die häufigsten.

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der Builder oben zeigt ein komplettes Bestellsystem — erstelle eigene Klassendiagramme!

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 📐 **Beziehungen** sauber zeichnen — Raute immer an der "Besitzer"-Seite
- 🔢 **Kardinalitäten** an beiden Enden der Verbindung eintragen
- 🏗️ **Vererbung** erkennen: "ist ein" → Vererbung, "hat ein" → Komposition/Aggregation
- 📝 **Attribute und Methoden** mit Sichtbarkeit (-/+) versehen`,
    },

    // --- Lektion 8: UML Sequenz- und Zustandsdiagramme ---
    {
      id: "ihk-8",
      title: "UML Sequenz- & Zustandsdiagramme",
      duration: "15 min",
      type: "interactive",
      interactive: "sequenceDiagram",
      content: `## 📨 Sequenzdiagramm

Ein Sequenzdiagramm zeigt die **zeitliche Abfolge** von Nachrichten zwischen Objekten — wie ein Protokoll eines Gesprächs.

### 🧩 Elemente

| Element | Beschreibung |
|---------|-------------|
| 📏 **Lebenslinien** | Gestrichelte Linie unter jedem Objekt — zeigt Existenzdauer |
| ▓ **Aktivierungsbalken** | Zeigt, wann ein Objekt gerade arbeitet |
| ➡️ **Nachrichten** | Pfeile zwischen Lebenslinien (synchron = volle Spitze) |
| ➰ **Rücknachrichten** | Gestrichelte Pfeile zurück |

> ❗ **Regel:** Aktivierungsbalken nur setzen, wenn noch keiner vorhanden ist!

---

## 🔄 Zustandsdiagramm (State Machine)

Ein Zustandsdiagramm beschreibt die **Zustände** eines Objekts und die **Übergänge** zwischen ihnen — wie ein endlicher Automat.

### 🧩 Elemente

| Element | Symbol | Beschreibung |
|---------|--------|-------------|
| 🔵 **Zustand** | Abgerundetes Rechteck | Beschreibt einen Zustand |
| ⬤ **Anfangszustand** | Gefüllter Kreis | Startpunkt |
| ◎ **Endzustand** | Kreis mit Ring | Endpunkt |
| ➡️ **Übergang** | Pfeil | Ereignis [Bedingung] / Aktion |

---

## 🔨 Ausprobieren

[INTERACTIVE]

> 💡 Der Sequence-Diagram-Builder oben zeigt dir eine Online-Bestellung — erstelle eigene Sequenz- und Zustandsdiagramme!

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 📨 **Sequenzdiagramm:** Nachrichten chronologisch ordnen — von oben nach unten
- ▓ **Aktivierungsbalken** nur setzen, wenn nötig — nicht jeder Pfeil braucht einen
- 🔄 **Zustandsdiagramm:** Alle Übergänge beschriften — Ereignis + Bedingung + Aktion
- ⬤ **Anfangs- und Endzustand** nie vergessen!
- 📌 **History-State** erklären können: Wann wird er verwendet?`,
    },

    // --- Lektion 9: Netzplantechnik & ER-Modell & Lastenheft ---
    {
      id: "ihk-9",
      title: "Netzplantechnik, ER-Modell & Lastenheft",
      duration: "20 min",
      type: "interactive",
      interactive: "netzplanBuilder",
      content: `## 🗓️ Netzplantechnik

Netzplantechnik ist eine Methode aus dem **Projektmanagement** zur Darstellung von Arbeitsabläufen und deren Abhängigkeiten.

### 🧩 Die vier Zeitpunkte pro Vorgang

| Abkürzung | Bedeutung | Berechnung |
|-----------|-----------|------------|
| 🟢 **FAZ** | Frühester Anfangszeitpunkt | Vorgänger-FEZ |
| 🟢 **FEZ** | Frühester Endzeitpunkt | FAZ + Dauer |
| 🔴 **SAZ** | Spätester Anfangszeitpunkt | SEZ − Dauer |
| 🔴 **SEZ** | Spätester Endzeitpunkt | Nachfolger-SAZ |

> ❗ FAZ/FEZ werden **vorwärts** berechnet (links → rechts), SAZ/SEZ **rückwärts** (rechts → links).

### ⏱️ Pufferzeit & Kritischer Pfad

- **Pufferzeit = SAZ − FAZ** — wie viel Spielraum hat ein Vorgang?
- **Kritischer Pfad** = Kette mit Pufferzeit **0** — jede Verzögerung hier verzögert das Gesamtprojekt

> 💡 Der NetzplanBuilder oben berechnet alles automatisch — probiere es aus!

---

## 🔨 Ausprobieren

[INTERACTIVE]

---

## 🗃️ ER-Modell (Entity-Relationship)

### Was ist ein ER-Modell?

Das ER-Modell beschreibt die **Datenstruktur** eines Systems unabhängig von einer Datenbank. Es zeigt Entitäten (Datenobjekte), ihre Attribute und Beziehungen zueinander.

> 💡 Das ER-Modell ist der **Bauplan deiner Datenbank** — bevor du Tabellen erstellst, modellierst du die Struktur.

---

### 🧩 Elemente

| Element | Symbol | Beispiel |
|---------|--------|---------|
| 📦 **Entitätstyp** | Rechteck | Kunde, Bestellung, Produkt |
| 🏷️ **Attribut** | Ellipse | Name, Preis, ID |
| 🔗 **Beziehung** | Raute | "bestellt", "enthält" |

---

### 🔢 Kardinalitäten

| Typ | Bedeutung | Beispiel |
|-----|-----------|---------|
| **1:1** | Eins zu Eins | Person ↔ Personalausweis |
| **1:n** | Eins zu Viele | Kunde → Bestellungen |
| **n:m** | Viele zu Viele | Schüler ↔ Kurse |

> ❗ **Merke:** n:m-Beziehungen werden in relationalen Datenbanken über eine **Zwischentabelle** aufgelöst!

---

### ☕ Beispiel

\`\`\`
[Kunde] --- (bestellt) --- [Bestellung]
[Bestellung] --- (enthält) --- [Produkt]
\`\`\`

- 1 Kunde → n Bestellungen (1:n)
- 1 Bestellung → n Produkte (n:m über Zwischentabelle)

---

## 📝 Lastenheft & Pflichtenheft

### 📋 Lastenheft — WAS soll das System tun?

Das Lastenheft stammt vom **Auftraggeber** und beschreibt die **Anforderungen**:

- **Funktionale Anforderungen:** Konkrete Funktionen (z.B. "Die App soll Kontostände anzeigen")
- **Nicht-funktionale Anforderungen:** Performance, Sicherheit, Usability
- **Rahmenbedingungen:** Budget, Zeit, Technologievorgaben

---

### ⚙️ Pflichtenheft — WIE wird es umgesetzt?

Das Pflichtenheft stammt vom **Auftragnehmer** und beschreibt die **Lösung**:

- Technische Architektur
- Datenbankdesign
- Schnittstellen
- Testkonzepte
- Zeitplan

---

### ⚔️ Gegenüberstellung

| | 📋 Lastenheft | ⚙️ Pflichtenheft |
|---|---|---|
| **Wer** | Auftraggeber | Auftragnehmer |
| **Inhalt** | WAS soll es tun? | WIE wird es umgesetzt? |
| **Detailgrad** | Anforderungen | Technische Lösung |
| **Zeitpunkt** | Vor der Ausschreibung | Vor der Entwicklung |

---

## 🎯 IHK-Tipps

> 💡 **Diese Tipps sichern dir Punkte!**

- 🗓️ **Netzplan:** FAZ/FEZ vorwärts, SAZ/SEZ rückwärts berechnen — Reihenfolge merken!
- 🔴 **Kritischer Pfad** immer markieren — Pufferzeit 0 = kritisch
- 🗃️ **ER-Modell:** Kardinalitäten an beiden Enden eintragen
- 📝 **Lastenheft vs. Pflichtenheft:** Wer schreibt was? — Das wird oft gefragt!
- 🧪 Immer prüfen: Wurden alle Beziehungen und Kardinalitäten korrekt modelliert?`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 10: Bäume
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "ihk-10",
      title: "Baumstrukturen",
      duration: "18 min",
      type: "interactive",
      interactive: "treeExplorer",
      content: `## Was ist ein Baum?

Ein Baum ist eine **hierarchische Datenstruktur** aus Knoten und Kanten — ohne Schleifen (Zyklen).

> Der Baum ist wie eine Firmenhierarchie: Der Chef (Wurzel) hat Abteilungsleiter (Kinder), die wiederum Mitarbeiter haben.

### Grundbegriffe
| Begriff | Bedeutung |
|---------|-----------|
| **Wurzel** (Root) | Oberster Knoten, kein Elternknoten |
| **Knoten** (Node) | Element mit Wert und Verbindungen |
| **Kante** (Edge) | Verbindung zwischen zwei Knoten |
| **Blatt** (Leaf) | Knoten ohne Kinder |
| **Tiefe** (Depth) | Abstand zur Wurzel |
| **Höhe** (Height) | Längster Weg von Wurzel zu Blatt |

## Binärer Baum

Jeder Knoten hat **maximal 2 Kinder** (links und rechts).

### Binärer Suchbaum (BST)
Die wichtigste Baumstruktur in der Praxis:
- **Regel**: Kleinerer Wert → links, größerer Wert → rechts
- **Vorteil**: Suche in O(log n) bei ausgeglichenem Baum
- **Nachteil**: Bei schlechter Balance → O(n) wie eine Liste

### Traversierung — Baum ablaufen

Es gibt 3 Grundreihenfolgen, einen Baum zu durchlaufen:

| Methode | Reihenfolge | Merkhilfe |
|---------|------------|-----------|
| **In-Order** | Links → Wurzel → Rechts | Gibt sortierte Reihenfolge bei BST |
| **Pre-Order** | Wurzel → Links → Rechts | Wurzel zuerst |
| **Post-Order** | Links → Rechts → Wurzel | Wurzel zuletzt |

**Beispiel-Baum:**
\`\`\`
        50
       /  \\
      25   75
     / \\
    12  37
\`\`\`

- **In-Order**: 12, 25, 37, 50, 75 (sortiert!)
- **Pre-Order**: 50, 25, 12, 37, 75
- **Post-Order**: 12, 37, 25, 75, 50

> 💡 **IHK-Tipp:** "Geben Sie die In-Order-Traversierung des Baums an!" — Links, Wurzel, Rechts!

### Anwendungen von Bäumen
- **Dateisysteme**: Verzeichnisse als Baumstruktur
- **DOM** (Document Object Model): HTML als Baum
- **Datenbanken**: B-Trees für Indexierung
- **Entscheidungsbäume**: KI/Machine Learning

> Praxis: Wenn du einen Ordner in Windows aufklappst, traversierst du einen Baum!

[INTERACTIVE]
`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 11: Graphen
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "ihk-11",
      title: "Graphen",
      duration: "18 min",
      type: "interactive",
      interactive: "graphExplorer",
      content: `## Was ist ein Graph?

Ein Graph ist eine Datenstruktur aus **Knoten** (Nodes) und **Kanten** (Edges) — im Gegensatz zum Baum können Schleifen existieren.

> Der Graph ist wie ein Straßennetz: Städte (Knoten) sind durch Straßen (Kanten) verbunden. Manche Straßen sind Einbahnstraßen.

### Grundbegriffe
| Begriff | Bedeutung |
|---------|-----------|
| **Knoten** (Vertex) | Element des Graphen |
| **Kante** (Edge) | Verbindung zwischen Knoten |
| **Gerichtet** | Kanten haben eine Richtung (Pfeil) |
| **Ungerichtet** | Kanten sind bidirektional |
| **Gewichtet** | Kanten haben einen Wert (z.B. Distanz) |
| **Nachbar** | Knoten, der über Kante erreichbar ist |

### Baum vs. Graph
| Merkmal | Baum | Graph |
|---------|------|-------|
| **Zyklen** | Keine | Möglich |
| **Wurzel** | Genau eine | Keine/Optional |
| **Pfade** | Genau 1 Pfad zwischen 2 Knoten | Mehrere Pfade möglich |
| **Beispiel** | Dateisystem | Soziales Netzwerk |

## Graphen durchsuchen

### BFS — Breitensuche (Breadth-First Search)
- Nutzt eine **Warteschlange** (Queue)
- Besucht erst alle Nachbarn, dann deren Nachbarn
- **Garantie**: Findet den **kürzesten Weg** (bei gleichen Kantengewichten)

**Ablauf:**
1. Startknoten in Queue
2. Knoten aus Queue nehmen und besuchen
3. Alle unbesuchten Nachbarn in Queue
4. Wiederhole bis Queue leer

### DFS — Tiefensuche (Depth-First Search)
- Nutzt einen **Stapel** (Stack)
- Geht einen Weg so **tief wie möglich**, dann zurück
- Gut für: Pfadsuche, Zykluserkennung

**Ablauf:**
1. Startknoten auf Stapel
2. Knoten vom Stapel nehmen und besuchen
3. Einen unbesuchten Nachbarn auf Stapel
4. Wenn keine unbesuchten Nachbarn → zurück

### BFS vs. DFS
| Merkmal | BFS | DFS |
|---------|-----|-----|
| **Datenstruktur** | Queue (FIFO) | Stack (LIFO) |
| **Reihenfolge** | Breit zuerst | Tief zuerst |
| **Kürzester Weg** | Ja | Nein |
| **Speicher** | Mehr (alle Nachbarn) | Weniger (Pfad) |

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen BFS und DFS?" — BFS=Warteschlange=kürzester Weg, DFS=Stapel=tief zuerst!

## Anwendungen von Graphen
- **Navigation**: Kürzester Weg (Dijkstra, A*)
- **Soziale Netzwerke**: Freundschaftsverbindungen
- **Internet**: Webseiten als Knoten, Links als Kanten
- **Netzwerk-Topologien**: Geräte als Knoten, Kabel als Kanten
- **Abhängigkeiten**: Software-Pakete, Compiler

> Praxis: Google Maps nutzt Graphen mit gewichteten Kanten (Distanz/Zeit), um den schnellsten Weg zu finden.

> Häufige Fehler: "BFS und DFS sind dasselbe" — Falsch! BFS nutzt Queue (breit), DFS nutzt Stack (tief). Die Ergebnisse können完全不同 sein.

[INTERACTIVE]
`,
    },
  ],
};

export const ihkCategories = [
  {
    id: "ihk",
    name: "IHK Prüfungsvorbereitung",
    icon: "📋",
    description: "Vorbereitung auf die IHK-Prüfung: Fachinformatiker Anwendungsentwicklung",
    subCategories: [
      { id: "diagramme", name: "Diagramme & Darstellungen", description: "UML, PAP, Struktogramme, EPK, Algorithmen, Netzplantechnik, ER-Modell" },
      { id: "netzwerk", name: "Netzwerktechnik", description: "OSI, TCP/IP, IPv4/IPv6, Subnetting, WLAN, Sicherheit, Protokolle" },
      { id: "datenbanken", name: "Datenbanken", description: "ER-Modelle, Normalisierung, SQL, JOINs, ACID, Backups" },
      { id: "computersysteme", name: "Computersysteme & Hardware", description: "CPU, RAM, Speichermedien, RAID, Busse, E/A-Geräte, OS, Virtualisierung, Cloud, Green IT" },
      { id: "it-sicherheit", name: "IT-Sicherheit", description: "Netzwerksicherheit, Web-Security, Verschlüsselung, Social Engineering, OWASP" },
      { id: "git", name: "Versionsmanagement", description: "Git, Branching, Merging, Gitflow, Semantic Versioning" },
      { id: "ux", name: "UX & Interaction Design", description: "Nielsen-Heuristiken, Personas, User Stories, Design Sprint, Prototyping" },
      { id: "qualitaet", name: "Software-Qualitätsstandards", description: "ISO 9126, Design Patterns, Architekturstile, Testverfahren, Clean Code" },
      { id: "projektmanagement", name: "Projektmanagement", description: "Klassisch & Agil, Scrum, DIN 69901, Magisches Dreieck, EVA" },
      { id: "docker", name: "Docker & Container", description: "Container, Images, Dockerfile, Compose, Deployment, Kubernetes" },
      { id: "erw-prog", name: "Erweiterte Programmierung", description: "SOLID, Clean Code, Interfaces, Unit-Tests, Refactoring, C#/.NET" },
    ],
  },
];
