import { Module } from "./types";

// ============================================================================
// IHK "Datenbanken" — Modul-Daten
// Quelle: IHK Kursunterlagen + AP1/AP2 Prüfungsthemen
// ============================================================================

export const datenbankModule: Module = {
  id: "ihk-datenbanken",
  slug: "ihk-datenbanken",
  title: "Datenbanken",
  description: "IHK AP1/AP2: ER-Modelle, Normalisierung, SQL (DDL/DML/DQL/DCL/TCL), JOINs, ACID, Referenzielle Integrität, Backups",
  icon: "🗄️",
  color: "#8B5CF6",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Datenbanken (IHK)

### Grundbegriffe
- **Atomar**: Ein Wert pro Zelle — nicht weiter teilbar
- **Primärschlüssel (PK)**: Macht jeden Eintrag eindeutig identifizierbar (z.B. ID)
- **Fremdschlüssel (FK)**: Verweis auf einen Primärschlüssel einer anderen Tabelle
- **Referenzielle Integrität**: FK muss immer auf existierenden PK verweisen
- **Entität**: Ein Eintrag in einer Tabelle (Zeile)
- **Attribute**: Eigenschaften einer Entität (Spalten)
- **Kardinalität**: 1:1, 1:n, n:m — Beziehungen zwischen Tabellen

### Kardinalitäten
- **1:1**: Ein Mitarbeiter hat genau einen Arbeitsplatz
- **1:n**: Ein Kunde hat viele Bestellungen
- **n:m**: Schüler ↔ Kurse → erzeugt IMMER eine Verweistabelle!

### Normalisierung
- **1NF**: Alle Werte atomar, keine wiederholenden Gruppen
- **2NF**: 1NF + alle Nicht-Schlüssel-Attribute vollständig abhängig vom PK
- **3NF**: 2NF + keine transitiven Abhängigkeiten
- Ziel: Redundanzen & Anomalien vermeiden

### SQL-Kategorien
- **DDL** (Data Definition): CREATE, ALTER, DROP, TRUNCATE
- **DML** (Data Manipulation): INSERT, UPDATE, DELETE
- **DQL** (Data Query): SELECT
- **DCL** (Data Control): GRANT, REVOKE
- **TCL** (Transaction Control): COMMIT, ROLLBACK, SAVEPOINT

### JOINs
- **INNER JOIN**: Nur passende Zeilen aus beiden Tabellen
- **LEFT JOIN**: Alle links + passende rechts (NULL wenn kein Match)
- **RIGHT JOIN**: Alle rechts + passende links
- **CROSS JOIN**: Kartesisches Produkt (jede Kombination)

### ACID-Prinzip
- **A**tomicity: Transaktion ganz oder gar nicht
- **C**onsistency: Datenbank bleibt konsistent
- **I**solation: Transaktionen beeinflussen sich nicht
- **D**urability: Nach Commit dauerhaft gespeichert

### Datenbank-Phasen
1. **Extern**: Anforderungen sammeln (Was will der Kunde?)
2. **Konzeptionell**: ER-Modell erstellen
3. **Logisch**: Tabellen, Normalisierung, PK/FK festlegen
4. **Physisch**: Implementierung in DBMS (z.B. PostgreSQL)

### Wichtige Befehle
\`\`\`sql
-- Tabelle erstellen
CREATE TABLE Kunde (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE
);

-- Daten einfügen
INSERT INTO Kunde (name, email) VALUES ('Max', 'max@b.de');

-- Abfrage mit JOIN
SELECT b.id, k.name, b.datum
FROM Bestellung b
JOIN Kunde k ON b.kunde_id = k.id;

-- Löschen vs. Kürzen
DELETE FROM Tabelle WHERE id = 1;  -- löscht Zeile(n)
TRUNCATE TABLE Tabelle;            -- leert ganze Tabelle
DROP TABLE Tabelle;                -- entfernt Tabelle komplett
\`\`\`

### Backups
- **Full Backup**: Komplette Sicherung (regelmäßig)
- **Inkrementelles Backup**: Nur Änderungen seit letztem Backup
- **Wiederherstellung**: Full + inkrementelle Backups zusammen einspielen`,

  lessons: [
    // =====================================================================
    // LEKTION 1: Grundbegriffe
    // =====================================================================
    {
      id: "db-1",
      title: "Grundbegriffe & Vokabeln",
      duration: "12 min",
      type: "text",
      content: `## Was ist eine Datenbank?

> In diesem Modul lernst du relationale Datenbanken kennen — von Grundbegriffen über SQL bis zu Normalisierung und Transaktionen. Datenbanken sind ein Kernthema der IHK-Prüfung und werden in fast jedem Prüfungsbereich vorausgesetzt!

Eine **Datenbank** ist eine strukturierte Sammlung von Daten, die effizient gespeichert, verwaltet und abgerufen werden können. In der IHK arbeiten wir hauptsächlich mit **relationalen Datenbanken**.

> 💡 **Merke:** Eine Datenbank ist KEIN Excel! Excel kann keine referenzielle Integrität garantieren.

## Die wichtigsten Begriffe

### Primärschlüssel (Primary Key / PK)
- Macht jeden Eintrag **eindeutig identifizierbar**
- Beispiel: Kunden-ID, Bestellnummer, Matrikelnummer
- **Regeln**: Eindeutig, NOT NULL, sich nie ändernd

> 💡 Der Primärschlüssel ist wie der **Personalausweis** — jeder hat genau einen und er ist eindeutig.

### Fremdschlüssel (Foreign Key / FK)
- **Verweis** auf einen Primärschlüssel einer anderen Tabelle
- Stellt die **Beziehung** zwischen zwei Tabellen her
- Beispiel: In der Tabelle "Bestellung" verweist \`kunde_id\` auf den PK der Tabelle "Kunde"

### Atomarität
- Jede Zelle enthält **genau einen Wert** — nicht mehr teilbar
- ❌ Falsch: "Max, Moritz" in einer Zelle
- ✅ Richtig: Separate Zeilen für jeden Namen

### Referenzielle Integrität
- Ein Fremdschlüssel **muss** auf einen existierenden Primärschlüssel verweisen
- Man kann NICHT einfach einen Kunden löschen, wenn noch Bestellungen auf ihn verweisen
- Schützt vor **verwaisten Datensätzen** (Dangling References)

### Entität & Attribute
- **Entität** = Eine Zeile in der Tabelle (z.B. ein konkreter Kunde)
- **Attribute** = Die Spalten (z.B. Name, Email, Telefon)

### Kardinalität
Beschreibt, wie viele Entitäten an einer Beziehung teilnehmen:
- **1:1** — Ein Mitarbeiter hat genau einen Arbeitsplatz
- **1:n** — Ein Kunde hat viele Bestellungen
- **n:m** — Schüler besuchen viele Kurse, Kurse haben viele Schüler

### Redundanz
- Wenn dieselbe Information **mehrfach** gespeichert wird
- Problem: Bei einer Änderung müssen ALLE Kopien angepasst werden

### Anomalien
Durch fehlende Normalisierung können drei Probleme auftreten:
- **Einfügeanomalie**: Man kann keinen Kunden ohne Bestellung eintragen
- **Änderungsanomalie**: Kundenadresse muss in JEDER Bestellung geändert werden
- **Löschanomalie**: Löscht man die letzte Bestellung, verschwindet der Kunde

> 💡 **IHK-Tipp:** Diese Begriffe kommen in JEDER Prüfung — sowohl in AP1 als auch AP2!

> **Nächste Lektion:** Relationale Datenbanken & Kardinalitäten — Wie Tabellen über Schlüssel miteinander verbunden sind und welche Beziehungstypen es gibt.`,
    },

    // =====================================================================
    // LEKTION 2: Relationale Datenbanken & Kardinalitäten
    // =====================================================================
    {
      id: "db-2",
      title: "Relationale Datenbanken & Kardinalitäten",
      duration: "15 min",
      type: "interactive",
      interactive: "relationalModelExplorer",
      content: `## Was bedeutet "relational"?

> In der letzten Lektion haben wir die wichtigsten Datenbank-Grundbegriffe kennengelernt — Primärschlüssel, Fremdschlüssel und Kardinalität. Jetzt schauen wir uns genauer an, wie Tabellen über diese Schlüssel miteinander verbunden sind und welche Beziehungstypen es gibt.

**Relational** bedeutet: Die Tabellen stehen in **Relation** zueinander — sie hängen über Schlüssel zusammen.

> 💡 "Relational" kommt nicht von "Beziehung", sondern von **Relation** = mathematischer Begriff für Tabelle!

## Die drei Beziehungstypen

### 1:1 — Eins-zu-Eins
Ein Datensatz der Tabelle A ist **genau einem** Datensatz der Tabelle B zugeordnet.

**Beispiel:** Mitarbeiter ↔ Arbeitsplatz
- Jeder Mitarbeiter hat genau einen Arbeitsplatz
- Jeder Arbeitsplatz gehört genau einem Mitarbeiter

**Wann sinnvoll?** Datenschutz (Gehaltsdaten extra Tabelle) oder Auslagerung großer Felder.

> 💡 Bei 1:1 wird der FK meist in die "untergeordnete" Tabelle gelegt.

### 1:n — Eins-zu-viele
Ein Datensatz der Tabelle A kann **mehrere** Datensätze der Tabelle B haben.

**Beispiel:** Kunde → Bestellungen
- Ein Kunde kann viele Bestellungen haben
- Jede Bestellung gehört zu GENAU einem Kunden

**FK-Regel:** Der Fremdschlüssel kommt IMMER auf die **n-Seite** (die "viele" Seite).

> 💡 Das ist die häufigste Beziehung in relationalen Datenbanken!

### n:m — Viele-zu-viele
Datensätze beider Tabellen können **mehrere** Partner haben.

**Beispiel:** Schüler ↔ Kurse
- Ein Schüler besucht viele Kurse
- Ein Kunde hat viele Schüler

**WICHTIG:** n:m-Beziehungen erzeugen immer eine **Verweistabelle** (auch: Assoziationstabelle, Join-Tabelle)!

Die Verweistabelle enthält:
- Die **Fremdschlüssel** beider Tabellen als zusammengesetzten Primärschlüssel
- Optional **Beziehungsattribute** (z.B. Note, Datum)

> 💡 **IHK-Tipp:** Immer BEIDE Richtungen prüfen! Wenn du dir unsicher bist, ob 1:n oder n:m — frag: "Kann A mehrere B haben UND B mehrere A?" → Dann n:m.

## Verweistabelle Beispiel

Schüler (ID, Name) ↔ Kurs (ID, Fach) → SchülerKurs (Schüler_ID, Kurs_ID, Note)

| Schüler_ID | Kurs_ID | Note |
|------------|---------|------|
| 1 | 1 | 2 |
| 1 | 3 | 1 |
| 2 | 1 | 3 |
| 3 | 2 | 2 |

## 🔗 Interaktiver Kardinalitäten-Explorer

Probiere verschiedene Beziehungstypen aus und sieh dir die resultierenden Tabellen an!

[INTERACTIVE]

> **Nächste Lektion:** Entity-Relationship-Modell (ERM) — Wie man eine Datenbank als visuellen Bauplan mit Entitäten, Attributen und Beziehungen plant.`,
    },

    // =====================================================================
    // LEKTION 3: Entity-Relationship-Modell
    // =====================================================================
    {
      id: "db-3",
      title: "Entity-Relationship-Modell (ERM)",
      duration: "18 min",
      type: "interactive",
      interactive: "erDiagramBuilder",
      content: `## Was ist das ER-Modell?

> In der letzten Lektion haben wir die drei Beziehungstypen 1:1, 1:n und n:m kennengelernt und gelernt, wie Verweistabellen n:m-Beziehungen auflösen. Jetzt nutzen wir dieses Wissen, um eine Datenbank systematisch zu planen — mit dem ER-Modell als visuellem Bauplan.

Das **ER-Modell** (Entity-Relationship-Modell) ist ein Hilfsmittel zur **Datenbankplanung**. Es entsteht in der **konzeptionellen Phase** und stellt dar:
- Welche **Entitäten** (Tabellen) es gibt
- Welche **Attribute** sie haben
- Welche **Beziehungen** zwischen ihnen bestehen

> 💡 Das ER-Modell ist der **Bauplan** der Datenbank — wie ein Architektenplan für ein Haus.

## Symbole im ER-Modell

| Symbol | Bedeutung |
|--------|-----------|
| **Rechteck** | Entität (Tabelle) |
| **Ellipse** | Attribut (Spalte) |
| **Raute (Diamond)** | Beziehung |
| **Unterstrichen** | Primärschlüssel |
| **Linie** | Verbindung |

## ER-Modell Regeln

1. **Primärschlüssel** werden unterstrichen
2. **Beziehungen** werden in der Raute benannt (Verb!)
3. **Kardinalität** wird an die Linie geschrieben
4. **Attribute** können auch an einer Raute stehen (wenn sinnvoll, z.B. bei n:m)

## Beispiel: Online-Shop

**Entitäten:** Kunde, Bestellung, Produkt, Kategorie

**Beziehungen:**
- Kunde **hat** Bestellung (1:n)
- Bestellung **enthält** Produkt (n:m → Verweistabelle "Bestellposition")
- Produkt **gehört zu** Kategorie (n:1)

## Häufige Fehler

- ❌ **Kreise** im Diagramm → Ringabhängigkeiten vermeiden
- ❌ **Redundante** Beziehungen → z.B. Bestellhistorie wenn schon Bestellung existiert
- ❌ **Singular/Plural** falsch → Immer Singular für Entitätsnamen
- ❌ **n:m** wenn eigentlich 1:n → Immer beide Richtungen prüfen!

> 💡 **IHK-Tipp:** In der Prüfung musst du ein ER-Modell aus einer Aufgabenstellung erstellen können — übe mit dem Builder!

## 🏗️ ER-Diagramm Builder

Baue dein eigenes ER-Diagramm — füge Entitäten, Attribute und Beziehungen hinzu!

[INTERACTIVE]

> **Nächste Lektion:** Normalisierung (1NF, 2NF, 3NF) — Wie man Redundanzen und Anomalien in Tabellen systematisch beseitigt.`,
    },

    // =====================================================================
    // LEKTION 4: Normalisierung
    // =====================================================================
    {
      id: "db-4",
      title: "Normalisierung — 1NF, 2NF, 3NF",
      duration: "20 min",
      type: "interactive",
      interactive: "normalisationTrainer",
      content: `## Warum normalisieren?

> In der letzten Lektion haben wir das ER-Modell kennengelernt und gelernt, wie man Entitäten, Attribute und Beziehungen in einem visuellen Bauplan festhält. Jetzt geht es einen Schritt weiter: Wir nehmen diese Entitäten und bringen sie in eine saubere, redundanzfreie Tabellenstruktur — die Normalisierung.

Ziel der Normalisierung:
- ✅ **Redundanzen** vermeiden
- ✅ **Anomalien** verhindern
- ✅ **Datenintegrität** sicherstellen
- ⚖️ Balance zwischen Redundanz, Performance und Flexibilität

> 💡 Wir normalisieren bis zur **3NF** — das ist der IHK-Standard. Die **BCNF** (Boyce-Codd-Normalform) wird im IT-Handbuch als nächste Stufe behandelt und kann in Prüfungen vorkommen. 4NF/5NF sind selten relevant.

## Erste Normalform (1NF)

**Regel:** Alle Werte müssen **atomar** sein — keine wiederholenden Gruppen, keine mehrwertigen Attribute.

### Prüf-Fragen:
- Gibt es Spalten mit **mehreren Werten** in einer Zelle?
- Gibt es **wiederholende Spalten** (z.B. Telefon1, Telefon2, Telefon3)?

### Beispiel — NICHT 1NF:

| KundenID | Name | Telefonnummern |
|----------|------|----------------|
| 1 | Max | 0171-123, 0172-456 |
| 2 | Lisa | 0173-789 |

### Beispiel — 1NF:

| KundenID | Name | Telefon |
|----------|------|---------|
| 1 | Max | 0171-123 |
| 1 | Max | 0172-456 |
| 2 | Lisa | 0173-789 |

## Zweite Normalform (2NF)

**Regel:** 1NF + Alle Nicht-Schlüssel-Attribute sind **vollständig funktional abhängig** vom gesamten Primärschlüssel.

Das Problem tritt nur bei **zusammengesetzten Primärschlüsseln** auf!

### Prüf-Fragen:
- Hat die Tabelle einen **zusammengesetzten PK**?
- Gibt es Attribute, die nur von **einem Teil** des PK abhängen?

### Beispiel — NICHT 2NF:

Bestellung(PK: BestellungID, PK: ProduktID, ProduktName, Menge)

- **ProduktName** hängt nur von ProduktID ab — NICHT vom gesamten PK!
- **Menge** hängt von beiden ab — das ist okay.

### Lösung: Aufteilen in zwei Tabellen
- Bestellung(BestellungID, ProduktID, Menge)
- Produkt(ProduktID, ProduktName)

## Dritte Normalform (3NF)

**Regel:** 2NF + Keine **transitiven Abhängigkeiten** — Nicht-Schlüssel-Attribute dürfen nicht von anderen Nicht-Schlüssel-Attributen abhängen.

### Was ist eine transitive Abhängigkeit?
PK → Attribut A → Attribut B

Wenn A von PK abhängt und B von A, dann ist B **transitiv** vom PK abhängig.

### Beispiel — NICHT 3NF:

Kunde(KundenID, Name, PLZ, Stadt)

- **Stadt** hängt von **PLZ** ab (PLZ → Stadt)
- PLZ ist KEIN Schlüssel → transitive Abhängigkeit!

### Lösung: PLZ in eigene Tabelle
- Kunde(KundenID, Name, PLZ)
- Ort(PLZ, Stadt)

> 💡 **IHK-Tipp:** Die Normalisierung kommt als Aufgabe in JEDER Prüfung — meist als "Bringen Sie die Tabelle in die 3NF!"

## 📊 Normalisierungs-Trainier

Bringe Schritt für Schritt eine denormalisierte Tabelle in die 3NF — mit Erklärung zu jedem Schritt!

[INTERACTIVE]

> **Nächste Lektion:** SQL — DDL, DML, DQL, DCL & TCL — Die Abfragesprache, mit der wir unsere normalisierten Tabellen erstellen, befüllen und abfragen.`,
    },

    // =====================================================================
    // LEKTION 5: SQL — Alle Kategorien
    // =====================================================================
    {
      id: "db-5",
      title: "SQL — DDL, DML, DQL, DCL & TCL",
      duration: "20 min",
      type: "interactive",
      interactive: "sqlPlayground",
      content: `## Was ist SQL?

> In der letzten Lektion haben wir gelernt, wie man Tabellen durch Normalisierung in die 1NF, 2NF und 3NF bringt und so Redundanzen beseitigt. Jetzt kommt die Praxis: Mit SQL lernen wir die Sprache, mit der wir diese Tabellen erstellen, mit Daten befüllen und abfragen.

**SQL** (Structured Query Language) ist eine **deklarative Sprache** für relationale Datenbanken.
- Keine Programmiersprache (keine Schleifen!)
- Deklarativ: Du beschreibst **was** du willst, nicht **wie**
- Nach dem **ACID-Prinzip**

> 💡 Merke: SQL = "Was", nicht "Wie". Du sagst "Gib mir alle Kunden aus Berlin" — die Datenbank findet den Weg.

## SQL vs. NoSQL

| Eigenschaft | SQL | NoSQL |
|-------------|-----|-------|
| Struktur | Tabellen (Schema) | Dokumente, Key-Value, etc. |
| Beziehungen | JOINs ✅ | Schwer abzubilden |
| Skalierung | Vertikal | Horizontal |
| ACID | ✅ Ja | Teilweise |
| Beispiel | PostgreSQL, MySQL | MongoDB, Redis |

## Die 5 SQL-Kategorien

Merksätze:
- **DDL** → ich mache was an einer Tabelle (Struktur)
- **DML** → Datenanpassung in einer Tabelle (Inhalt)
- **DQL** → Query = Anfrage für Daten
- **DCL** → Rechtedefinierung
- **TCL** → für Wartung/Transaktionen

### DDL — Data Definition Language

Strukturen erstellen, ändern, löschen:

\`\`\`sql
-- Tabelle erstellen
CREATE TABLE Kunde (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  erstellt_am TIMESTAMP DEFAULT NOW()
);

-- Spalte hinzufügen
ALTER TABLE Kunde ADD COLUMN telefon VARCHAR(20);

-- Tabelle leeren (Struktur bleibt)
TRUNCATE TABLE Kunde;

-- Tabelle komplett entfernen
DROP TABLE Kunde;
\`\`\`

| Befehl | Was es macht |
|--------|-------------|
| CREATE | Erstellt Tabelle/Struktur |
| ALTER | Ändert Spalten |
| DROP | Entfernt Tabelle KOMPLETT |
| TRUNCATE | Leert Tabelle, Struktur bleibt |

### DML — Data Manipulation Language

Daten einfügen, ändern, löschen:

\`\`\`sql
-- Daten einfügen
INSERT INTO Kunde (name, email) VALUES ('Max', 'max@b.de');

-- Daten ändern
UPDATE Kunde SET email = 'neu@b.de' WHERE id = 1;

-- Daten löschen
DELETE FROM Kunde WHERE id = 1;
\`\`\`

> ⚠️ **ACHTUNG:** \`DELETE FROM Kunde\` ohne WHERE löscht ALLE Zeilen!

### DQL — Data Query Language

Daten abfragen:

\`\`\`sql
-- Alle Kunden
SELECT * FROM Kunde;

-- Bestimmte Spalten mit Filter
SELECT name, email FROM Kunde WHERE plz = '10115';

-- Sortierung und Limit
SELECT * FROM Kunde ORDER BY name ASC LIMIT 10;

-- Aggregationen
SELECT COUNT(*) AS anzahl FROM Kunde;
SELECT AVG(preis) AS durchschnitt FROM Produkt;
\`\`\`

### DCL — Data Control Language

Rechte verwalten:

\`\`\`sql
GRANT SELECT ON Kunde TO benutzer;
REVOKE INSERT ON Kunde FROM benutzer;
\`\`\`

### TCL — Transaction Control Language

Transaktionen steuern:

\`\`\`sql
BEGIN;
UPDATE Konto SET saldo = saldo - 100 WHERE id = 1;
UPDATE Konto SET saldo = saldo + 100 WHERE id = 2;
COMMIT;  -- oder ROLLBACK;
\`\`\`

> 💡 **IHK-Tipp:** Merke dir die Abkürzungen DDL, DML, DQL, DCL, TCL — kommen als Multiple-Choice dran!

## 💾 SQL Playground

Schreibe eigene SQL-Befehle und sieh die Ergebnisse live!

[INTERACTIVE]

> **Nächste Lektion:** JOINs — Tabellen verknüpfen — Wie man Daten aus mehreren Tabellen mit INNER, LEFT, RIGHT und CROSS JOIN kombiniert.`,
    },

    // =====================================================================
    // LEKTION 6: JOINs
    // =====================================================================
    {
      id: "db-6",
      title: "JOINs — Tabellen verknüpfen",
      duration: "18 min",
      type: "interactive",
      interactive: "joinVisualizer",
      content: `## Was ist ein JOIN?

> In der letzten Lektion haben wir die fünf SQL-Kategorien kennengelernt — von DDL für Tabellenstrukturen bis TCL für Transaktionen. Bisher haben wir aber immer nur mit einer Tabelle gearbeitet. Jetzt lernen wir JOINs kennen, mit denen wir Daten aus mehreren verknüpften Tabellen kombinieren können.

Ein **JOIN** kombiniert Daten aus **zwei oder mehr Tabellen** basierend auf einem gemeinsamen Attribut (meist PK/FK).

> 💡 JOINs sind DER Grund, warum relationale Datenbanken so mächtig sind — sie verbinden verknüpfte Daten!

## INNER JOIN

Nur Zeilen, die in **beiden** Tabellen einen Match haben.

\`\`\`sql
SELECT k.name, b.datum, b.betrag
FROM Kunde k
INNER JOIN Bestellung b ON k.id = b.kunde_id;
\`\`\`

> 💡 INNER JOIN = "Nur Kunden, die auch bestellt haben"

## LEFT JOIN (LEFT OUTER JOIN)

**Alle** Zeilen der linken Tabelle + passende der rechten. NULL wenn kein Match.

\`\`\`sql
SELECT k.name, b.datum
FROM Kunde k
LEFT JOIN Bestellung b ON k.id = b.kunde_id;
\`\`\`

> 💡 LEFT JOIN = "Alle Kunden, auch die ohne Bestellung"

## RIGHT JOIN (RIGHT OUTER JOIN)

**Alle** Zeilen der rechten Tabelle + passende der linken.

\`\`\`sql
SELECT k.name, b.datum
FROM Kunde k
RIGHT JOIN Bestellung b ON k.id = b.kunde_id;
\`\`\`

## CROSS JOIN

**Jede** Kombination — kartesisches Produkt. Vorsicht: Sehr viele Zeilen!

\`\`\`sql
SELECT * FROM Farbe CROSS JOIN Größe;
-- 3 Farben × 4 Größen = 12 Zeilen
\`\`\`

## JOIN-Übersicht

| JOIN-Typ | Ergebnis |
|----------|----------|
| INNER | Nur Matches in beiden Tabellen |
| LEFT | Alle links + Matches rechts |
| RIGHT | Alle rechts + Matches links |
| CROSS | Jede Kombination (A × B) |

## JOIN vs. SELECT mit WHERE

Theoretisch kann man auch mit SELECT verknüpfen:

\`\`\`sql
-- Das gleiche wie INNER JOIN:
SELECT * FROM Kunde, Bestellung
WHERE Kunde.id = Bestellung.kunde_id;
\`\`\`

Aber: **JOIN ist schneller** (besserer Query-Plan) und **lesbarer**!

> 💡 **IHK-Tipp:** In Prüfungen musst du oft das richtige JOIN-Typ erkennen oder eine JOIN-Abfrage schreiben!

## 🔀 JOIN-Visualisierer

Sieh visuell, welche Zeilen bei welchem JOIN-Typ übrig bleiben!

[INTERACTIVE]

> **Nächste Lektion:** Das ACID-Prinzip — Die vier Eigenschaften, die garantieren, dass Datenbank-Transaktionen sicher und zuverlässig ablaufen.`,
    },

    // =====================================================================
    // LEKTION 7: ACID-Prinzip
    // =====================================================================
    {
      id: "db-7",
      title: "Das ACID-Prinzip",
      duration: "10 min",
      type: "text",
      content: `## Was ist ACID?

> In der letzten Lektion haben wir JOINs kennengelernt, mit denen wir Daten aus mehreren Tabellen kombinieren können. Doch was passiert, wenn bei einer komplexen Operation etwas schiefgeht? Das ACID-Prinzip beschreibt die Sicherheitsgarantien, die eine relationale Datenbank für Transaktionen bietet.

**ACID** beschreibt die vier Eigenschaften, die eine Transaktion in einer relationalen Datenbank garantieren muss.

> 💡 ACID ist wie ein Sicherheitsversprechen der Datenbank: "Deine Daten sind sicher — egal was passiert."

## Die vier Eigenschaften

### A — Atomicity (Atomarität)

**"Alles oder nichts"**

Eine Transaktion wird entweder **vollständig** ausgeführt oder **gar nicht**.

**Beispiel — Banküberweisung:**
\`\`\`sql
BEGIN;
UPDATE Konto SET saldo = saldo - 100 WHERE id = 1;  -- Abheben
UPDATE Konto SET saldo = saldo + 100 WHERE id = 2;  -- Einzahlen
COMMIT;
\`\`\`

Falls der Server zwischen den beiden UPDATEs abstürzt → wird alles **rückgängig** gemacht (ROLLBACK). Kein Geld verloren!

### C — Consistency (Konsistenz)

**"Die Datenbank bleibt in einem gültigen Zustand"**

Alle Regeln (Constraints, Trigger, Fremdschlüssel) werden eingehalten.

**Beispiel:**
- Ein Kontostand darf nie unter 0 fallen (wenn Constraint existiert)
- Ein Fremdschlüssel muss auf existierenden PK verweisen
- UNIQUE-Constraint wird nicht verletzt

### I — Isolation (Isolation)

**"Transaktionen beeinflussen sich nicht gegenseitig"**

Mehrere Transaktionen können gleichzeitig laufen, ohne sich zu stören.

**Beispiel:** Zwei Kunden bestellen gleichzeitig den letzten Artikel im Lager → die Datenbank stellt sicher, dass nur einer bekommt.

**Isolation-Levels:**
| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|-----------|-------------------|-------------|
| Read Uncommitted | Möglich | Möglich | Möglich |
| Read Committed | ❌ Verhindert | Möglich | Möglich |
| Repeatable Read | ❌ Verhindert | ❌ Verhindert | Möglich |
| Serializable | ❌ Verhindert | ❌ Verhindert | ❌ Verhindert |

### D — Durability (Dauerhaftigkeit)

**"Nach COMMIT dauerhaft gespeichert"**

Sobald eine Transaktion erfolgreich abgeschlossen (COMMIT) ist, bleiben die Daten auch bei Stromausfall oder Crash erhalten.

> 💡 Die Datenbank schreibt in ein **Transaktionslog** (WAL) — bei einem Crash wird das Log eingespielt.

## ACID — Merksatz

> **A**lles oder nichts → **C**onsistent → **I**soliert → **D**auerhaft

> 💡 **IHK-Tipp:** ACID kommt als Multiple-Choice-Frage dran — und in AP2 als Erklärungsaufgabe!

> **Nächste Lektion:** IHK Übungsaufgaben — SQL — Typische Prüfungsaufgaben zu SELECT, WHERE, GROUP BY und Aggregationen aus realen AP1/AP2-Prüfungen.`,
    },

    // =====================================================================
    // LEKTION 8: IHK SQL-Übungsaufgaben
    // =====================================================================
    {
      id: "db-8",
      title: "IHK Übungsaufgaben — SQL",
      duration: "25 min",
      type: "interactive",
      interactive: "sqlPlayground",
      content: `> In der letzten Lektion haben wir das ACID-Prinzip kennengelernt und gelernt, welche vier Eigenschaften Transaktionen garantieren müssen. Jetzt wird es praxisnah: Wir üben typische IHK-Prüfungsaufgaben zu SQL — so wie sie in AP1 und AP2 drankommen.

Hier übst du typische IHK-Prüfungsaufgaben zu SQL. Die Aufgaben basieren auf realen AP1/AP2-Prüfungen.

## Aufgabe 1: Produktionsdaten

Gegeben: Tabelle \`ProductionData\` mit Spalten: OrderID, Width, Length, Thickness, Quantity

### a) Alle Produktionsdaten für Bestellung 736298
\`\`\`sql
SELECT Width, Length, Thickness, Quantity
FROM ProductionData
WHERE OrderID = 736298;
\`\`\`

### b) Anzahl aller Einträge mit Thickness = 2
\`\`\`sql
SELECT COUNT(*) AS Anzahl
FROM ProductionData
WHERE Thickness = 2;
\`\`\`

### c) Gesamtanzahl mit Thickness=2 UND Width=200 UND Length=300
\`\`\`sql
SELECT COUNT(*) AS Gesamtanzahl
FROM ProductionData
WHERE Thickness = 2 AND Width = 200 AND Length = 300;
\`\`\`

## Aufgabe 2: Ticketsystem

Gegeben: Tabelle \`Ticket\` mit: TicketID, Prioritaet, Zustand, ErfassungsDatum, KundenID, Problembeschreibung

### a) Anzahl der Tickets nach Priorität
\`\`\`sql
SELECT Prioritaet, COUNT(*) AS Anzahl
FROM Ticket
GROUP BY Prioritaet;
\`\`\`

### b) Anzahl der Tickets
\`\`\`sql
SELECT COUNT(*) AS Anzahl
FROM Ticket;
\`\`\`

### c) Alle offenen Tickets, die älter als 2 Monate sind
\`\`\`sql
SELECT Problembeschreibung, Prioritaet, Zustand, ErfassungsDatum
FROM Ticket
WHERE Zustand = 'offen'
AND ErfassungsDatum < CURRENT_DATE - INTERVAL '2 months'
ORDER BY ErfassungsDatum;
\`\`\`

> 💡 Diese Abfrage zeigt: Problembeschreibung, Priorität, Zustand und Erfassungsdatum aller offenen Tickets, deren Erfassungsdatum mehr als zwei Monate zurückliegt, sortiert nach Erfassungsdatum.

## Aufgabe 3: KFZ-Versicherung

### a) Durchschnittliche Versicherungssumme
\`\`\`sql
SELECT AVG(Versicherung_Summe) AS Durchschnitt
FROM KFZ_Versicherung;
\`\`\`

### b) Versicherungen über 10 Mio ohne Garage im Mai 2022
\`\`\`sql
SELECT VID FROM KFZ_Versicherung
WHERE Versicherung_Summe > 10000000
AND Garage = FALSE
AND Vertragsbeginn BETWEEN '2022-05-01' AND '2022-05-31';
\`\`\`

> 💡 **IHK-Tipp:** BETWEEN ist inklusive — also genau der Monat Mai!

## 💻 Übe selbst im SQL Playground

Nutze den Playground unten, um eigene Queries zu schreiben und zu testen!

[INTERACTIVE]

> **Nächste Lektion:** Datenbank planen — Die 4 Phasen — Von der Anforderungsanalyse über das ER-Modell bis zur fertigen SQL-Implementierung.`,
    },

    // =====================================================================
    // LEKTION 9: Datenbank planen — Die vier Phasen
    // =====================================================================
    {
      id: "db-9",
      title: "Datenbank planen — Die 4 Phasen",
      duration: "15 min",
      type: "interactive",
      interactive: "dbPlanningPhases",
      content: `## Übersicht

> In der letzten Lektion haben wir typische IHK-Prüfungsaufgaben zu SQL geübt — von SELECT mit WHERE und GROUP BY bis zu Aggregationen. Jetzt zoomen wir raus und schauen uns den gesamten Planungsprozess an: Wie entsteht eine Datenbank vom ersten Anforderungsgespräch bis zum fertigen SQL-Code?

Eine Datenbank wird in **4 Phasen** geplant:

1. **Externe Phase** — Anforderungen sammeln
2. **Konzeptionelle Phase** — ER-Modell erstellen
3. **Logische Phase** — Tabellen, Normalisierung, PK/FK
4. **Physische Phase** — Implementierung im DBMS

> 💡 Die Phasen sind wie ein Architektenprozess: Erst Wünsche, dann Bauplan, dann technische Zeichnung, dann Bau.

## Phase 1: Extern (Anforderungsanalyse)

**Ziel:** Verstehen, was der Kunde braucht.

**Fragen:**
- Welche Daten sollen gespeichert werden?
- Wer nutzt die Datenbank?
- Welche Prozesse müssen abgebildet werden?
- Welche Reports/Berichte werden benötigt?

**Beispiel — Zeiterfassungssystem:**
- Mitarbeitende können Arbeitszeit erfassen
- Es gibt ein Arbeitszeitkonto
- Arbeitszeiten werden auf dem Konto verrechnet
- Mitarbeiter können Gleitzeit und Urlaub beantragen

**Ergebnis:** Eine Anforderungsliste (Text)

## Phase 2: Konzeptionell (ER-Modell)

**Ziel:** Visuelles Modell der Datenbank.

**Tätigkeiten:**
- Entitäten identifizieren
- Attribute festlegen
- Beziehungen mit Kardinalitäten zeichnen
- Primärschlüssel bestimmen

**Ergebnis:** ER-Diagramm

> 💡 In der IHK-Prüfung musst du oft ein ER-Modell aus einer Aufgabenstellung zeichnen!

## Phase 3: Logisch (Tabellenentwurf)

**Ziel:** Normale Tabellen mit PK/FK.

**Tätigkeiten:**
- ER-Modell in Tabellen umwandeln
- Normalisierung durchführen (1NF → 2NF → 3NF)
- Fremdschlüssel zuordnen
- Datentypen festlegen

**Ergebnis:** Tabellenschema mit Datentypen

## Phase 4: Physisch (Implementierung)

**Ziel:** Die Datenbank in einem DBMS erstellen.

**Tätigkeiten:**
- SQL CREATE TABLE schreiben
- Indexe erstellen
- Testdaten einfügen
- Views und Stored Procedures erstellen

**Ergebnis:** Lauffähige Datenbank

## Beispiel: Zeiterfassungssystem

### Extern:
- Mitarbeiter erfassen Arbeitszeiten
- Arbeitszeitkonto wird verwaltet
- Gleitzeit und Urlaub beantragbar

### Konzeptionell:
- Entitäten: Mitarbeiter, Arbeitszeit, Antrag, Arbeitszeitkonto
- Beziehungen: Mitarbeiter hat Arbeitszeiten (1:n), Mitarbeiter hat Anträge (1:n)

### Logisch:
- Mitarbeiter(MitarbeiterID, Name, Abteilung)
- Arbeitszeit(ZeitID, MitarbeiterID FK, Startzeit, Endzeit)
- Antrag(AntragID, MitarbeiterID FK, Typ, Status, Datum)

### Physisch:
\`\`\`sql
CREATE TABLE Mitarbeiter (
  mitarbeiter_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  abteilung VARCHAR(50)
);
\`\`\`

> 💡 **IHK-Tipp:** In der AP2 musst du oft eine Datenbank komplett durchplanen — von der externen Phase bis zum SQL-Code!

## 📋 Phasen-Interaktiver Guide

Klicke durch die 4 Phasen und sieh dir zu jeder Phase Beispiele, Aufgaben und Vorlagen an!

[INTERACTIVE]

> **Nächste Lektion:** Backups & Datenwiederherstellung — Strategien zum Schutz vor Datenverlust: Full Backup, inkrementelles Backup und Restore.`,
    },

    // =====================================================================
    // LEKTION 10: Backups
    // =====================================================================
    {
      id: "db-10",
      title: "Backups & Datenwiederherstellung",
      duration: "10 min",
      type: "text",
      content: `## Warum Backups?

> In der letzten Lektion haben wir die 4 Phasen der Datenbankplanung kennengelernt — von der Anforderungsanalyse bis zur Implementierung. Doch was passiert, wenn die fertige Datenbank durch einen Crash oder Fehler Daten verliert? Jetzt lernen wir Backup-Strategien kennen, die genau das verhindern.

> 💡 **Kein Backup = Keine Mitleid.** Datenverlust kann durch Hardwareausfall, menschliche Fehler oder Cyberangriffe passieren.

## Backup-Strategien

### Full Backup (Vollständige Sicherung)
- Speichert die **gesamte Datenbank**
- **Vorteil:** Einfache Wiederherstellung
- **Nachteil:** Braucht viel Speicher und Zeit
- **Empfehlung:** Regelmäßig (z.B. täglich nachts)

### Inkrementelles Backup
- Speichert nur die **Änderungen** seit dem letzten Backup
- **Vorteil:** Schnell, wenig Speicher
- **Nachteil:** Wiederherstellung braucht alle vorherigen Backups
- **Empfehlung:** Häufiger als Full Backup (z.B. stündlich)

## Wiederherstellung (Restore)

Die Reihenfolge beim Einspielen:
1. Letztes **Full Backup** einspielen
2. Alle **inkrementellen Backups** der Reihe nach einspielen
3. Datenbank ist wieder auf dem Stand des letzten inkrementellen Backups

> 💡 Ohne Full Backup sind die inkrementellen Backups nutzlos — sie bauen aufeinander auf!

## Backup-Strategie-Beispiel

| Zeitpunkt | Backup-Typ | Datenstand |
|-----------|-----------|------------|
| Sonntag 02:00 | Full Backup | Sonntag 02:00 |
| Montag 08:00 | Transaktion | Montag 08:00 |
| Montag 12:00 | Transaktion | Montag 12:00 |
| Montag 16:00 | Transaktion | Montag 16:00 |
| Dienstag 02:00 | Full Backup | Dienstag 02:00 |

**Crash am Montag 14:00:** → Full (So) + Transaktion (Mo 08:00) + Transaktion (Mo 12:00) einspielen

## PostgreSQL Backups

\`\`\`bash
# Full Backup (pg_dump)
pg_dump -U benutzer datenbank > backup.sql

# Restore
psql -U benutzer datenbank < backup.sql
\`\`\`

## Best Practices

- ✅ Backups **automatisieren** (Cron-Job, pg_cron)
- ✅ Backups **testen** (Restore probieren!)
- ✅ Backups an **verschiedenen Orten** speichern (3-2-1-Regel)
- ✅ **Wiederherstellungszeit** dokumentieren
- ❌ Backups auf **derselben Festplatte** wie die Datenbank!

> 💡 **IHK-Tipp:** Backups kommen als theoretische Frage dran — Full vs. inkrementelles Backup unterscheiden können!

> **Nächste Lektion:** Datenbanktypen im Überblick — Relationale Datenbanken sind nicht die einzige Wahl: NoSQL, Key-Value, Graph und weitere im Vergleich.`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 9: Datenbanktypen
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "db-11",
      title: "Datenbanktypen im Überblick",
      duration: "12 min",
      type: "text",
      content: `## Warum verschiedene Datenbanktypen?

> In der letzten Lektion haben wir Backup-Strategien kennengelernt, die unsere Datenbank vor Datenverlust schützen. Bisher haben wir uns aber ausschließlich mit relationalen Datenbanken beschäftigt. Jetzt schauen wir uns an, welche anderen Datenbanktypen es gibt und wann sie sinnvoll sind.

Nicht jedes Problem passt in eine relationale Tabelle. Verschiedene Anforderungen brauchen verschiedene Lösungen.

## Die wichtigsten Datenbanktypen

### Relationale Datenbanken (RDBMS)
- **Struktur**: Tabellen mit Zeilen und Spalten
- **Sprache**: SQL
- **Vorteile**: ACID, ausgereift, viele Werkzeuge
- **Nachteile**: Starre Schema, JOINs können langsam sein
- **Beispiele**: MySQL, PostgreSQL, Oracle, SQL Server, SQLite

### Dokumentenbasierte Datenbanken (NoSQL)
- **Struktur**: JSON/XML-Dokumente
- **Vorteile**: Flexibles Schema, gut für unstrukturierte Daten
- **Nachteile**: Keine JOINs, weniger konsistent
- **Beispiele**: MongoDB, CouchDB, Firebase Firestore

### Schlüssel-Wert-Datenbanken
- **Struktur**: Einfache Key-Value-Paare (wie eine riesige HashMap)
- **Vorteile**: Extrem schnell, einfach
- **Nachteile**: Keine komplexen Abfragen
- **Beispiele**: Redis, Amazon DynamoDB

### Spaltenorientierte Datenbanken
- **Struktur**: Daten spaltenweise statt zeilenweise
- **Vorteile**: Schnell bei analytischen Abfragen (Aggregationen)
- **Nachteile**: Langsam bei Zeilen-Inserts
- **Beispiele**: Apache Cassandra, HBase

### Graphdatenbanken
- **Struktur**: Knoten + Kanten (wie unser Graph-Modul!)
- **Vorteile**: Perfekt für Beziehungen (soziale Netzwerke, Empfehlungen)
- **Nachteile**: Nicht für Massendaten
- **Beispiele**: Neo4j, Amazon Neptune

## Vergleichstabelle

| Typ | Schema | JOINs | Skalierung | Einsatz |
|-----|--------|-------|------------|---------|
| **Relational** | Starre Schema | Ja (SQL) | Vertikal | Standard-Anwendungen |
| **Dokument** | Flexibel | Nein | Horizontal | CMS, Mobile Apps |
| **Key-Value** | Keins | Nein | Horizontal | Caching, Sessions |
| **Spalten** | Flexibel | Nein | Horizontal | Analytics, Big Data |
| **Graph** | Flexibel | Traversierung | Vertikal | Beziehungen, KI |

> 💡 **IHK-Tipp:** "Welche Datenbank eignet sich für...?" — Kenne die Stärken der einzelnen Typen!

## SQL vs. NoSQL

| Merkmal | SQL | NoSQL |
|---------|-----|-------|
| **Schema** | Vordefiniert (CREATE TABLE) | Flexibel (dynamisch) |
| **Skalierung** | Vertikal (stärkerer Server) | Horizontal (mehr Server) |
| **Konsistenz** | Stark (ACID) | Eventual Consistency |
| **Abfragen** | SQL | Herstellerspezifisch |
| **Beziehung** | JOINs | Denormalisiert |

> Praxis: Viele Unternehmen nutzen beide: Relationale DB für Bestellungen, NoSQL für Logs/Sessions. Das nennt sich **Polyglot Persistence**.

> Häufige Fehler: "NoSQL ist besser als SQL" — Falsch! Es kommt auf den Anwendungsfall an. Für strukturierte Daten mit Beziehungen ist SQL oft besser.

> **Nächste Lektion:** CREATE TABLE im Detail — Datentypen, Constraints und die vollständige Syntax zum Erstellen von Tabellen.`,
    },

    // ══════════════════════════════════════════════════════════════════════════
    // LEKTION 10: CREATE TABLE im Detail
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: "db-12",
      title: "CREATE TABLE im Detail",
      duration: "15 min",
      type: "text",
      content: `## Tabellen erstellen

> In der letzten Lektion haben wir einen Überblick über verschiedene Datenbanktypen bekommen — von relationalen über dokumentenbasierte bis zu Graphdatenbanken. Jetzt kehren wir zu den relationalen Datenbanken zurück und schauen uns das wichtigste DDL-Statement im Detail an: CREATE TABLE — mit allen Datentypen und Constraints, die du für die IHK-Prüfung kennen musst.

Das CREATE TABLE-Statement definiert die Struktur einer Tabelle. In der IHK-Prüfung musst du solche Statements schreiben oder interpretieren können.

## Grundsyntax

\`\`\`sql
CREATE TABLE tabelle_name (
    spalte1 DATENTYP [CONSTRAINTS],
    spalte2 DATENTYP [CONSTRAINTS],
    ...
);
\`\`\`

## Wichtige Datentypen (MySQL)

### Text
| Typ | Beschreibung | Max. Länge |
|-----|-------------|-----------|
| **CHAR(n)** | Feste Länge | 255 Zeichen |
| **VARCHAR(n)** | Variable Länge | 65.535 Zeichen |
| **TEXT** | Langer Text | 65.535 Zeichen |
| **LONGTEXT** | Sehr langer Text | 4 GB |

### Zahlen
| Typ | Beschreibung | Bereich |
|-----|-------------|---------|
| **TINYINT** | Kleine Ganzzahl | -128 bis 127 |
| **INT** | Ganzzahl | -2 Mrd. bis 2 Mrd. |
| **BIGINT** | Große Ganzzahl | -9×10¹⁸ bis 9×10¹⁸ |
| **FLOAT** | Gleitkomma (ungenau) | 4 Bytes |
| **DOUBLE** | Gleitkomma (genauer) | 8 Bytes |
| **DECIMAL(p,s)** | Festkomma (exakt) | z.B. DECIMAL(10,2) |

### Datum/Zeit
| Typ | Beschreibung | Format |
|-----|-------------|--------|
| **DATE** | Datum | YYYY-MM-DD |
| **TIME** | Uhrzeit | HH:MM:SS |
| **DATETIME** | Datum + Uhrzeit | YYYY-MM-DD HH:MM:SS |
| **TIMESTAMP** | Zeitstempel | Automatisch aktualisierbar |

### Sonstige
| Typ | Beschreibung |
|-----|-------------|
| **ENUM('a','b')** | Einer aus fester Liste |
| **BLOB** | Binäre Daten (Bilder, Dateien) |
| **BOOLEAN** | TRUE/FALSE (alias für TINYINT(1)) |

## Constraints (Einschränkungen)

| Constraint | Bedeutung | Beispiel |
|-----------|-----------|---------|
| **PRIMARY KEY** | Eindeutiger Identifikator | \`id INT PRIMARY KEY\` |
| **AUTO_INCREMENT** | Automatisch hochzählen | \`id INT AUTO_INCREMENT\` |
| **NOT NULL** | Darf nicht leer sein | \`name VARCHAR(100) NOT NULL\` |
| **UNIQUE** | Muss eindeutig sein | \`email VARCHAR(255) UNIQUE\` |
| **DEFAULT** | Standardwert | \`status VARCHAR(20) DEFAULT 'aktiv'\` |
| **FOREIGN KEY** | Verweis auf andere Tabelle | \`kunde_id INT REFERENCES kunden(id)\` |
| **CHECK** | Bedingung prüfen | \`preis DECIMAL CHECK (preis > 0)\` |

## Praxisbeispiel

\`\`\`sql
CREATE TABLE kunden (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    geburtsdatum DATE,
    stadt VARCHAR(100) DEFAULT 'unbekannt',
    erstellt_am TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bestellungen (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kunde_id INT NOT NULL,
    produkt VARCHAR(200) NOT NULL,
    preis DECIMAL(10,2) NOT NULL CHECK (preis > 0),
    bestelldatum DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (kunde_id) REFERENCES kunden(id)
);
\`\`\`

## ALTER TABLE — Tabelle ändern

\`\`\`sql
-- Spalte hinzufügen
ALTER TABLE kunden ADD telefon VARCHAR(20);

-- Spalte ändern
ALTER TABLE kunden MODIFY name VARCHAR(150) NOT NULL;

-- Spalte löschen
ALTER TABLE kunden DROP COLUMN telefon;

-- Index erstellen
CREATE INDEX idx_name ON kunden(name);
\`\`\`

## GRANT/REVOKE — Zugriffsrechte

\`\`\`sql
-- Benutzer erstellen
CREATE USER 'lehrer'@'localhost' IDENTIFIED BY 'passwort123';

-- Rechte vergeben
GRANT SELECT, INSERT ON schule.noten TO 'lehrer'@'localhost';

-- Rechte entziehen
REVOKE INSERT ON schule.noten FROM 'lehrer'@'localhost';

-- Alle Rechte
GRANT ALL PRIVILEGES ON schule.* TO 'admin'@'localhost';
\`\`\`

> 💡 **IHK-Tipp:** "Erstellen Sie eine Tabelle für..." — Datentypen und Constraints können!

> Häufige Fehler: "VARCHAR und CHAR sind gleich" — Falsch! CHAR füllt mit Leerzeichen auf (feste Länge), VARCHAR speichert nur die tatsächlich eingegebenen Zeichen.
`,
    },
  ],
};
