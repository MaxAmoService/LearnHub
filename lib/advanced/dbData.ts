import { Module } from "../types";

export const advDBModule: Module = {
  id: "adv-db", slug: "adv-db",
  title: "Datenbanken",
  description: "ER-Modellierung, Relationale Algebra, SQL, Normalisierung, Indizes, Transaktionen, NoSQL — mit Probeklausur.",
  icon: "🗄️", color: "#06B6D4", progress: 0, category: "advanced",
  lessons: [
    {
      id: "db-er", title: "ER-Modellierung", duration: "40 min", type: "interactive", interactive: "erDiagramBuilder",
      content: `## ER-Modellierung

### Grundbausteine

- **Entity (Entität):** Reales/abstraktes Objekt (z.B. Student, Kurs)
- **Attribut:** Eigenschaft einer Entität (z.B. Name, Matrikelnummer)
- **Relationship (Beziehung):** Verbindung zwischen Entitäten (z.B. 'belegt')

### Attributtypen

| Typ | Beschreibung | Notation |
|-----|-------------|----------|
| Einfach | Nicht teilbar (Name) | Oval |
| Zusammengesetzt | Teilbar (Adresse: Straße, PLZ, Ort) | Oval mit Unterovalen |
| Mehrwertig | Mehrere Werte (Telefonnummern) | Doppeloval |
| Abgeleitet | Berechenbar (Alter aus Geburtsdatum) | Gestricheltes Oval |

### Kardinalitäten

| Typ | Beschreibung | Beispiel |
|-----|-------------|----------|
| 1:1 | Genau ein B zu A | Person ↔ Personalausweis |
| 1:n | Mehrere B zu A | Professor ↔ Vorlesung |
| n:m | Viele zu viele | Student ↔ Vorlesung |

**Partizipation:**
- **Total (doppelt):** Jede Entität MUSS an Beziehung teilnehmen
- **Partial (einfach):** Teilnahme optional

> **n:m braucht eigene Tabelle im relationalen Modell!**

### Schwache Entitäten

- Haben **keinen eigenen Primärschlüssel**
- Identifiziert durch **eigenen partiellen Schlüssel + Schlüssel der starken Entität**
- **Doppelrechteck** im ER-Diagramm

**Beispiel:** Schwache Entität "Kind" identifiziert durch (Name + PersNr des Elternteils).

### ISA-Hierarchie (Vererbung)

- **Generalisierung:** Mehrere Entitäten → übergeordnete Entität
- **Spezialisierung:** Übergeordnete → untergeordnete Entitäten
- **Disjunkt (d):** Kein Überlappen (Student ist ODER Bachelor ODER Master)
- **Überlappend (o):** Überlappen möglich

**Beispiel:**
    Person (ID, Name)
    ISA
    ├── Student (MatrikelNr, Semester)
    └── Mitarbeiter (PersonalNr, Gehalt)

### Aggregation

Wenn eine Beziehung selbst an einer anderen Beziehung teilnimmt:

**Problem:** "Projekt wird von Abteilung geleitet, Mitarbeiter arbeitet an Projekt" — wo spezifizieren wir "leitet"?

**Lösung:** Aggregation — Beziehung als "Entität" behandeln.

### ER → Relational

| ER-Konzept | Relational |
|------------|-----------|
| Starke Entität | Tabelle mit PK |
| Schwache Entität | Tabelle mit PK der starken + partiellem Schlüssel |
| 1:1 Beziehung | FK in einer der Tabellen |
| 1:n Beziehung | FK in der n-Seite |
| n:m Beziehung | Neue Verbindungstabelle (PK1 + PK2) |
| ISA | Verschiedene Strategien (eine Tabelle oder mehrere) |
| Mehrwertiges Attribut | Eigene Tabelle |`,
    },
    {
      id: "db-relational", title: "Relationales Modell & Algebra", duration: "40 min", type: "interactive", interactive: "relationalModelExplorer",
      content: `## Relationale Algebra

### Grundoperationen

| Operation | Symbol | SQL-Äquivalent | Beschreibung |
|-----------|--------|----------------|-------------|
| Selektion | $\\sigma_{Bed}(R)$ | WHERE | Zeilen filtern |
| Projektion | $\\pi_{Spalten}(R)$ | SELECT | Spalten auswählen |
| Vereinigung | $R \\cup S$ | UNION | Alle Zeilen beider |
| Differenz | $R \\setminus S$ | EXCEPT | Zeilen in R aber nicht S |
| Kreuzprodukt | $R \\times S$ | CROSS JOIN | Alle Kombinationen |
| Umbenennung | $\\rho_{S(A_1..A_n)}(R)$ | AS | Spalten/Relation umbenennen |

### Abgeleitete Operationen

| Operation | Symbol | Beschreibung |
|-----------|--------|-------------|
| Join | $R \\bowtie_{Bed} S$ | Kreuzprodukt + Selektion |
| Natural Join | $R \\bowtie S$ | Automatisch über gleichnamige Spalten |
| Theta-Join | $R \\bowtie_{\\theta} S$ | Join mit beliebiger Bedingung $\\theta$ |
| Semi-Join | $R \\ltimes S$ | Tupel aus R die Match in S haben |
| Division | $R \\div S$ | Tupel in R die ALLE Tupel in S matchen |

### Join-Arten im Detail

**Inner Join:** Nur gematchte Zeilen.

**Outer Joins:**
- **LEFT OUTER:** Alle linken + passende rechte (NULL wenn kein Match)
- **RIGHT OUTER:** Alle rechten + passende linke
- **FULL OUTER:** Alle aus beiden (NULL wo kein Match)

**Self-Join:** Tabelle mit sich selbst verknüpfen (z.B. Mitarbeiter → Vorgesetzter).

### Division

**Frage:** "Welche Studenten belegen ALLE Kurse?"

$\\text{Belegt} \\div \\text{Kurse}$

Tupel in Belegt, die für JEDEN Kurs in Kurse einen Eintrag haben.

**Implementierung:**

    π_MatrNr(Belegt) − π_MatrNr((π_MatrNr(Belegt) × π_KursNr(Kurse)) − Belegt)

### Tupelkalkül (Kurzform)

$\\{t \\mid \\text{Bedingung}(t)\\}$

**Beispiel:** Alle Studenten ab Semester 3:

$\\{t \\mid \\text{Student}(t) \\land t.\\text{Semester} \\geq 3\\}$

**Sicher:** Endliches Ergebnis (Domain-Kalkül: DOM-Regel).`,
    },
    {
      id: "db-sql", title: "SQL — Grundlagen bis Fortgeschritten", duration: "55 min", type: "interactive", interactive: "sqlPlayground",
      content: `## SQL

### DDL (Data Definition)

    CREATE TABLE Studenten (
      MatrNr    INTEGER PRIMARY KEY,
      Name      VARCHAR(50) NOT NULL,
      Semester  INTEGER CHECK (Semester >= 1),
      Email     VARCHAR(100) UNIQUE,
      AbtNr     INTEGER REFERENCES Abteilung(AbtNr)
    );

    ALTER TABLE Studenten ADD GebDatum DATE;
    DROP TABLE Studenten CASCADE;

### DML (Data Manipulation)

    INSERT INTO Studenten VALUES (12345, 'Max', 3, 'max@uni.de', 1);
    UPDATE Studenten SET Semester = Semester + 1 WHERE MatrNr = 12345;
    DELETE FROM Studenten WHERE MatrNr = 12345;

### DQL (Data Query)

    SELECT s.Name, p.Note
    FROM Studenten s
    JOIN Pruefungen p ON s.MatrNr = p.MatrNr
    WHERE p.Fach = 'Datenbanken'
    ORDER BY p.Note ASC;

### Aggregatfunktionen

| Funktion | Beschreibung |
|----------|-------------|
| COUNT(*) | Anzahl Zeilen |
| COUNT(DISTINCT x) | Verschiedene Werte |
| SUM(x) | Summe |
| AVG(x) | Durchschnitt |
| MIN(x), MAX(x) | Minimum/Maximum |

### SQL-Ausführungsreihenfolge

    FROM     -- 1. Quelle(n)
    WHERE    -- 2. Selektion (VOR Gruppierung)
    GROUP BY -- 3. Gruppierung
    HAVING   -- 4. Filter NACH Gruppierung
    SELECT   -- 5. Projektion
    ORDER BY -- 6. Sortierung
    LIMIT    -- 7. Ergebnis begrenzen

### Subqueries

    -- Skalar (ein Wert)
    SELECT * FROM Studenten
    WHERE Semester = (SELECT AVG(Semester) FROM Studenten);

    -- IN (Menge)
    SELECT * FROM Studenten
    WHERE MatrNr IN (SELECT MatrNr FROM Pruefungen WHERE Note = 1.0);

    -- EXISTS (Existenz)
    SELECT * FROM Studenten s
    WHERE EXISTS (SELECT 1 FROM Pruefungen p WHERE p.MatrNr = s.MatrNr);

    -- Korreliert: äußere Referenz im Inneren
    SELECT s.Name FROM Studenten s
    WHERE 1 < (SELECT COUNT(*) FROM Pruefungen p WHERE p.MatrNr = s.MatrNr);

### Views

    CREATE VIEW AktiveStudenten AS
    SELECT MatrNr, Name, Semester
    FROM Studenten WHERE Semester <= 6;

    SELECT * FROM AktiveStudenten WHERE Semester >= 3;

Views sind gespeicherte Abfragen — keine eigenen Daten. Updatbar wenn einfach (1 Tabelle, kein DISTINCT/GROUP BY).

### CTEs (Common Table Expressions)

    WITH Bestanden AS (
      SELECT MatrNr, COUNT(*) AS Anzahl
      FROM Pruefungen WHERE Note <= 4.0
      GROUP BY MatrNr
    )
    SELECT s.Name, b.Anzahl
    FROM Studenten s JOIN Bestanden b ON s.MatrNr = b.MatrNr
    WHERE b.Anzahl >= 3;

### Window Functions

    SELECT Name, Semester,
      ROW_NUMBER() OVER (ORDER BY Semester DESC) AS Rang,
      AVG(Semester) OVER () AS Durchschnitt,
      RANK() OVER (PARTITION BY AbtNr ORDER BY Semester DESC) AS AbtRang
    FROM Studenten;

| Funktion | Beschreibung |
|----------|-------------|
| ROW_NUMBER() | Laufende Nummer |
| RANK() | Mit Lücken bei Gleichstand |
| DENSE_RANK() | Ohne Lücken |
| LAG() / LEAD() | Vorheriger/Nächster Wert |
| SUM() OVER () | Kumulative Summe |
| NTILE(n) | In n Gruppen aufteilen`,
    },
    {
      id: "db-normalisierung", title: "Normalisierung (1NF bis BCNF)", duration: "45 min", type: "interactive", interactive: "normalisationTrainer",
      content: `## Normalisierung

### Ziele

- **Redundanzen** vermeiden
- **Anomalien** verhindern (Einfüge-, Lösch-, Update-Anomalie)
- **Integrität** sichern

### 1NF: Atomare Attributwerte

Keine Wiederholungsgruppen, keine mehrwertigen Attribute.

❌ Tabelle mit Spalte "Telefonnummern" = "0123, 4567, 8901"
✅ Eigene Tabelle Telefon(PersNr, Nummer)

### 2NF: Volle funktionale Abhängigkeit

1NF + jedes Nichtschlüsselattribut hängt vom **GESAMTEN** Primärschlüssel ab (bei zusammengesetztem PK).

❌ Prüfung(MatrNr, FachNr, Note, Fachname): Fachname hängt nur von FachNr ab (partielle Abhängigkeit).
✅ Aufteilen: Prüfung(MatrNr, FachNr, Note), Fach(FachNr, Fachname)

> Bei einfachem Schlüssel automatisch 2NF wenn 1NF.

### 3NF: Keine transitiven Abhängigkeiten

2NF + kein Nichtschlüsselattribut hängt von anderem Nichtschlüsselattribut ab.

❌ Mitarbeiter(PersNr, Name, AbtNr, AbtName): AbtName → AbtNr → PersNr (transitiv).
✅ Mitarbeiter(PersNr, Name, AbtNr), Abteilung(AbtNr, AbtName)

### BCNF (Boyce-Codd Normalform)

Strenger als 3NF: Jede Determinante ist ein Kandidatenschlüssel.

**3NF erlaubt:** Wenn $A \\to B$ und $A$ kein Kandidatenschlüssel, aber $B$ Teil eines Kandidatenschlüssels ist.
**BCNF:** Das ist nicht erlaubt.

**Beispiel (3NF aber nicht BCNF):**
Tabelle: (Student, Fach, Dozent), FDs: {(Student, Fach) → Dozent, Dozent → Fach}

- Kandidatenschlüssel: (Student, Fach)
- Dozent → Fach: Dozent ist kein Kandidatenschlüssel!
- Aber: Dozent ist Teil des anderen Kandidatenschlüssels? Nein. → Nicht BCNF.

### 4NF: Keine mehrwertigen Abhängigkeiten

BCNF + keine nicht-trivialen mehrwertigen Abhängigkeiten.

**Mehrwertige Abhängigkeit:** $A \\twoheadrightarrow B$ bedeutet: Zu jedem $A$-Wert gibt es eine Menge unabhängiger $B$-Werte.

❌ Kurs(Dozent, Fach, Raum): Dozent unterrichtet Fächer UND Dozent hat Räume — unabhängig.
✅ DozentFach(Dozent, Fach), DozentRaum(Dozent, Raum)

### Zerlegungsalgorithmen

**3NF-Synthese:**
1. Berechne kanonische Basis der FDs
2. Für jede FD: eigene Tabelle
3. Wenn kein Kandidatenschlüssel abgedeckt: Tabelle mit Schlüssel hinzufügen

**BCNF-Zerlegung (rekursiv):**
1. Finde FD $X \\to Y$ die BCNF verletzt
2. Zerlege in $R_1 = X \\cup Y$ und $R_2 = R \\setminus (Y \\setminus X)$
3. Wiederhole für jede Teilrelation

**Abhängigkeitenerhalt:** 3NF-Synthese erhält Abhängigkeiten. BCNF-Zerlegung nicht immer.

### Merksatz

> Jedes Attribut muss eine Tatsache über den Schlüssel, den ganzen Schlüssel und nichts als den Schlüssel sein. — William Kent`,
    },
    {
      id: "db-indizes", title: "Indizes & Anfrageoptimierung", duration: "40 min", type: "text",
      content: `## Indizes

### Warum Indizes?

Ohne Index: **Full Table Scan** — $O(n)$ pro Abfrage.
Mit Index: **Index Lookup** — $O(\\log n)$ oder $O(1)$.

### B-Tree Index (Standard)

- Selbst-ausgleichender Baum (B+-Baum)
- Blätter enthalten Schlüssel + Zeiger auf Datensätze
- Blätter verkettet für Bereichsabfragen

| Operation | Laufzeit |
|-----------|----------|
| Gleichheit (=) | $O(\\log n)$ |
| Bereich (<, >, BETWEEN) | $O(\\log n + k)$ |
| IS NULL | $O(\\log n)$ |

**Clustered vs. Non-Clustered:**
- **Clustered:** Daten physisch nach Index sortiert (max. 1 pro Tabelle)
- **Non-Clustered:** Separate Struktur, Zeiger auf Datensatz

### Hash-Index

- Hash-Funktion auf Schlüssel → direkter Zugriff
- **Nur** für Gleichheitsabfragen (=)
- **Kein** Bereichsabfragen

| Operation | B-Tree | Hash |
|-----------|--------|------|
| = | Gut | Bester |
| <, >, BETWEEN | Gut | Nicht möglich |
| LIKE 'abc%' | Gut | Nicht möglich |

### Multi-Column Index

    CREATE INDEX idx_name ON Studenten(Name, Semester);

- Nützlich für Abfragen die **linke Präfixe** verwenden
- \`WHERE Name = 'Max'\` ✅ nutzt Index
- \`WHERE Semester = 3\` ❌ nutzt Index NICHT
- \`WHERE Name = 'Max' AND Semester = 3\` ✅ nutzt Index

### Anfrageoptimierung

**Query Execution Plan:** Beschreibt wie eine Abfrage ausgeführt wird.

    EXPLAIN ANALYZE SELECT * FROM Studenten WHERE Name = 'Max';

**Wichtige Operatoren:**

| Operator | Beschreibung |
|----------|-------------|
| Seq Scan | Full Table Scan |
| Index Scan | Index-basiert |
| Index Only Scan | Nur aus Index (Covering Index) |
| Hash Join | Hash-basierter Join |
| Nested Loop | Geschachtelte Schleife |
| Merge Join | Sortierter Merge |

**Join-Reihenfolge:** Optimizer wählt die günstigste. Kleine Tabelle zuerst (meist).

**Optimierungstipps:**
1. Indizes auf WHERE/JOIN-Spalten
2. SELECT statt SELECT *
3. Vermeide Funktionen auf indizierten Spalten (z.B. \`UPPER(Name)\`)
4. EXPLAIN ANALYZE verwenden`,
    },
    {
      id: "db-transaktionen", title: "Transaktionen & ACID", duration: "35 min", type: "text",
      content: `## Transaktionen & ACID

### ACID-Eigenschaften

| Prinzip | Bedeutung | Mechanismus |
|---------|-----------|-------------|
| **A**tomicity | Alles oder nichts | Undo-Log / Rollback |
| **C**onsistency | Integrität erhalten | Constraints, Trigger |
| **I**solation | Nebenläufig isoliert | Locking, MVCC |
| **D**urability | Dauerhaft gespeichert | Redo-Log, WAL |

### Isolation Levels

| Level | Dirty Read | Non-Repeatable | Phantom |
|-------|-----------|---------------|--------|
| READ UNCOMMITTED | Ja | Ja | Ja |
| READ COMMITTED | Nein | Ja | Ja |
| REPEATABLE READ | Nein | Nein | Ja |
| SERIALIZABLE | Nein | Nein | Nein |

**Dirty Read:** Uncommitted Daten einer anderen Transaktion lesen.
**Non-Repeatable Read:** Zweimal lesen, unterschiedliches Ergebnis.
**Phantom:** Ergebnis einer Abfrage ändert sich durch INSERT/DELETE.

### Locking

**Shared Lock (S):** Mehrere Leser gleichzeitig erlaubt.
**Exclusive Lock (X):** Nur ein Schreiber, keine Leser gleichzeitig.

| | S | X |
|-|---|---|
| S | ✅ | ❌ |
| X | ❌ | ❌ |

### Two-Phase Locking (2PL)

**Phase 1 (Growing):** Locks anfordern, keine freigeben.
**Phase 2 (Shrinking):** Locks freigeben, keine neuen anfordern.

**Garantiert Conflict-Serialisierbarkeit!**

**Strict 2PL:** X-Locks bis Transaktionsende halten → verhindert Cascading Rollbacks.

### Deadlocks

**Zyklen** im Warte-Graphen: T1 wartet auf T2, T2 wartet auf T1.

**Deadlock-Erkennung:**
- Periodisch Warte-Graph prüfen
- Zyklus → eine Transaktion abbrechen (Opfer)

**Deadlock-Vermeidung:**
- **Wait-Die:** Ältere wartet, jüngere stirbt
- **Wound-Wait:** Ältere tötet jüngere, jüngere wartet
- **Timeout:** Nach Zeitlimit abbrechen

### SQL-Transaktion

    BEGIN TRANSACTION;
      UPDATE Konto SET Saldo = Saldo - 100 WHERE Nr = 1;
      UPDATE Konto SET Saldo = Saldo + 100 WHERE Nr = 2;
    COMMIT;  -- oder ROLLBACK

### MVCC (Multi-Version Concurrency Control)

- Jede Transaktion sieht **Snapshot** der Daten
- Schreiben erzeugt neue Version
- Lesen blockiert nicht (keine S-Locks nötig)
- Verwendet in PostgreSQL, MySQL InnoDB`,
    },
    {
      id: "db-nosql", title: "NoSQL & NewSQL", duration: "30 min", type: "text",
      content: `## NoSQL & NewSQL

### Warum NoSQL?

- **Skalierung:** Horizontal (mehr Server statt größerer Server)
- **Flexibles Schema:** Kein starres Schema
- **Performance:** Optimiert für spezifische Zugriffsmuster

### NoSQL-Kategorien

**1. Key-Value Store**

| Eigenschaft | Beschreibung |
|-------------|-------------|
| Modell | Schlüssel → Wert (String, JSON, Binary) |
| Beispiele | Redis, DynamoDB, Memcached |
| Zugriff | $O(1)$ per Key |
| Anwendung | Caching, Session-Storage, Shopping Cart |

**2. Document Store**

| Eigenschaft | Beschreibung |
|-------------|-------------|
| Modell | JSON/BSON-Dokumente mit flexibler Struktur |
| Beispiele | MongoDB, CouchDB, Firestore |
| Zugriff | Query über Felder, Indizes |
| Anwendung | CMS, User Profiles, Kataloge |

    {
      "_id": "student123",
      "name": "Max Mustermann",
      "semester": 3,
      "kurse": ["DB", "AD", "KI"]
    }

**3. Column-Family Store**

| Eigenschaft | Beschreibung |
|-------------|-------------|
| Modell | Zeilen mit dynamischen Spalten (Spaltenfamilien) |
| Beispiele | Cassandra, HBase, Bigtable |
| Zugriff | Zeile + Spaltenfamilie |
| Anwendung | Zeitreihen, IoT, Log-Analyse |

**4. Graph Database**

| Eigenschaft | Beschreibung |
|-------------|-------------|
| Modell | Knoten + Kanten + Properties |
| Beispiele | Neo4j, Amazon Neptune |
| Zugriff | Graph-Traversierung (Cypher, Gremlin) |
| Anwendung | Social Networks, Empfehlungen, Fraud Detection |

    MATCH (p:Person)-[:FOLLOWS]->(f:Person)
    WHERE p.name = 'Max'
    RETURN f.name

### CAP-Theorem

Ein verteiltes System kann maximal **2 von 3** garantieren:

- **C**onsistency: Alle Knoten sehen gleiche Daten
- **A**vailability: Jede Anfrage erhält eine Antwort
- **P**artition Tolerance: System funktioniert trotz Netzwerktrennung

| System | Typ | CP oder AP |
|--------|-----|------------|
| MongoDB | Document | CP |
| Cassandra | Column | AP |
| Neo4j | Graph | CP |
| Redis | Key-Value | CP |
| DynamoDB | Key-Value | AP |

### BASE (statt ACID)

- **B**asically **A**vailable: Immer erreichbar
- **S**oft state: Zustand kann sich ändern ohne Input
- **E**ventually consistent: Irgendwann konsistent

### NewSQL

Kombiniert NoSQL-Skalierung mit SQL-Komfort:
- **CockroachDB:** Verteiltes SQL, ACID
- **TiDB:** MySQL-kompatibel, horizontal skalierbar
- **Google Spanner:** Globale Konsistenz mit TrueTime`,
    },
    {
      id: "db-klausur", title: "Probeklausur DB — 15 Fragen", duration: "75 min", type: "quiz", examMode: true,
      content: `## DB Probeklausur — 15 Fragen

### Frage 1
Welche Normalform: atomare Attributwerte?
A) 2NF
B) 3NF
C) 1NF
D) BCNF

Richtig: **C.** 1NF = atomare Werte.

### Frage 2
'I' in ACID?
A) Integration
B) Isolation
C) Index
D) Inheritance

Richtig: **B.** Isolation.

### Frage 3
Filter NACH Gruppierung?
A) WHERE
B) HAVING
C) FILTER
D) GROUP BY

Richtig: **B.** WHERE vor, HAVING nach GROUP BY.

### Frage 4
n:m-Beziehung im relationalen Modell?
A) Fremdschlüssel in einer Tabelle
B) Neue Tabelle mit zwei Fremdschlüsseln
C) Array
D) Geht nicht

Richtig: **B.** Verbindungstabelle mit kombiniertem PK.

### Frage 5
LEFT OUTER JOIN liefert...
A) Nur gematchte
B) Alle linken + passende rechte
C) Alle rechten + passende linke
D) Kreuzprodukt

Richtig: **B.**

### Frage 6
$\\pi_{A,B}(\\sigma_{C>5}(R))$ — Reihenfolge?
A) Projektion, dann Selektion
B) Selektion, dann Projektion
C) Gleichzeitig
D) Beliebig

Richtig: **B.** Von innen nach außen.

### Frage 7
Dirty Reads verhindert ab...
A) READ UNCOMMITTED
B) READ COMMITTED
C) REPEATABLE READ
D) SERIALIZABLE

Richtig: **B.**

### Frage 8
Fremdschlüssel referenziert...
A) Beliebigen Wert
B) Primärschlüssel
C) Index
D) NULL

Richtig: **B.** FK → PK.

### Frage 9
Verschiedene Werte zählen?
A) COUNT(*)
B) COUNT(DISTINCT x)
C) SUM(x)
D) AVG(x)

Richtig: **B.**

### Frage 10
Transitive Abhängigkeit = Verletzung von...
A) 1NF
B) 2NF
C) 3NF
D) Keine

Richtig: **C.** Nichtschlüssel → Nichtschlüssel.

### Frage 11
Transaktion rückgängig?
A) COMMIT
B) UNDO
C) ROLLBACK
D) REVERT

Richtig: **C.**

### Frage 12
Natural Join vs Inner Join?
A) Gleich
B) Natural: automatisch über gleichnamige Spalten
C) Inner ist schneller
D) Natural nur Postgres

Richtig: **B.**

### Frage 13
2PL garantiert...
A) Deadlock-Freiheit
B) Conflict-Serialisierbarkeit
C) Phantom-Freiheit
D) Durability

Richtig: **B.** 2PL garantiert Conflict-Serialisierbarkeit.

### Frage 14
CAP-Theorem: Cassandra ist...
A) CA
B) CP
C) AP
D) CAP

Richtig: **C.** Availability + Partition Tolerance (eventually consistent).

### Frage 15
BCNF vs 3NF?
A) Identisch
B) BCNF strenger: jede Determinante ist Kandidatenschlüssel
C) 3NF strenger
D) BCNF nur für Composite Keys

Richtig: **B.** BCNF verhindert mehr Anomalien als 3NF.`,
    },
  ],
};
