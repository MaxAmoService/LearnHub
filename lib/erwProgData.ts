import { Module } from "./types";

// ============================================================================
// IHK "Erweiterte Programmierung" — Modul-Daten
// Quelle: IHK IT-Handbuch + Moritz' Mitschriften
// ============================================================================

export const erwProgModule: Module = {
  id: "ihk-erw-prog",
  slug: "ihk-erw-prog",
  title: "Erweiterte Programmierung",
  description: "IHK IT-Handbuch: SOLID, Clean Code, Interfaces, Unit-Tests, Refactoring, Code Smells, C#/.NET",
  icon: "🔧",
  color: "#6366F1",
  category: "ihk",
  progress: 0,
  merkblatt: `## 📋 Merkblatt: Erweiterte Programmierung (IHK)

### SOLID-Prinzipien
- **S**ingle Responsibility: Eine Klasse = eine Aufgabe
- **O**pen/Closed: Offen für Erweiterung, geschlossen für Änderung
- **L**iskov Substitution: Untertypen ersetzbar
- **I**nterface Segregation: Kleine, spezifische Interfaces
- **D**ependency Inversion: Abstraktionen, keine Konkretionen

### Clean Code
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- YAGNI (You Ain't Gonna Need It)
- Pfadfinder-Regel: Hinterlasse den Code besser

### Code Smells
- Lange Methoden (>20 Zeilen)
- Lange Parameterlisten (>4)
- Error Hiding
- Reinvent the Wheel
- Duplicated Code

### Interfaces
- Definieren WAS eine Klasse kann, nicht WIE
- Ermöglichen Austauschbarkeit und Testbarkeit
- In C#: \`public interface IDatabase\`

### Unit Tests
- Testen einzelne Funktionen/Klassen isoliert
- AAA-Pattern: Arrange, Act, Assert
- Mock-Objekte für Abhängigkeiten
- In C#: MSTest, NUnit, xUnit

### Coupling & Cohesion
- **Lose Kopplung:** Klassen wenig voneinander abhängig
- **Starke Kohäsion:** Klasse macht eine Sache gut`,

  lessons: [
    // --- Lektion 1: SOLID ---
    {
      id: "ep-1",
      title: "SOLID-Prinzipien",
      duration: "20 min",
      type: "interactive",
      interactive: "solidChecker",
      content: `## SOLID — Die 5 Prinzipien sauberer OOP

> In diesem Modul lernst du die wichtigsten Prinzipien für sauberen, wartbaren Code kennen — von SOLID über Clean Code bis zu Unit Tests. Diese Prinzipien sind nicht nur für die IHK prüfungsrelevant, sondern entscheiden über die Qualität deiner Software!

> Design Patterns im Modul "Software-Qualitätsstandards" ergänzen diese Prinzipien perfekt.

Die **SOLID-Prinzipien** sind Richtlinien für saubere, wartbare objektorientierte Programmierung.

---

## 📐 Die 5 Prinzipien

### 1️⃣ S — Single Responsibility Principle (SRP)

> **Eine Klasse sollte nur EINE Aufgabe haben.**

\`\`\`python
# ❌ Schlecht — Klasse macht zu viel
class UserManager:
    def create_user(self): ...
    def send_email(self): ...
    def generate_report(self): ...

# ✅ Gut — Jede Klasse eine Aufgabe
class UserRepository:
    def create_user(self): ...

class EmailService:
    def send_email(self): ...

class ReportGenerator:
    def generate_report(self): ...
\`\`\`

---

### 2️⃣ O — Open/Closed Principle (OCP)

> **Offen für Erweiterung, geschlossen für Änderung.**

\`\`\`python
# ❌ Schlecht — Bei neuer Zahlungsart muss man die Klasse ändern
class PaymentProcessor:
    def process(self, method):
        if method == "credit_card": ...
        elif method == "paypal": ...
        # Neue Zahlungsart = Code ändern!

# ✅ Gut — Neue Zahlungsart = neue Klasse
class PaymentMethod:
    def pay(self, amount): pass

class CreditCard(PaymentMethod):
    def pay(self, amount): ...

class PayPal(PaymentMethod):
    def pay(self, amount): ...

class PaymentProcessor:
    def process(self, method: PaymentMethod, amount):
        method.pay(amount)
\`\`\`

---

### 3️⃣ L — Liskov Substitution Principle (LSP)

> **Untertypen müssen durch ihren Basistyp ersetzbar sein.**

\`\`\`python
# ❌ Schlecht — Quadrat ist kein guter Ersatz für Rechteck
class Rectangle:
    def set_width(self, w): self.width = w
    def set_height(self, h): self.height = h

class Square(Rectangle):
    def set_width(self, w):
        self.width = w
        self.height = w  # Breite = Höhe bei Quadrat!

# ✅ Gut — Separate Klassen
class Shape:
    def area(self): pass

class Rectangle(Shape):
    def area(self): return self.width * self.height

class Square(Shape):
    def area(self): return self.side ** 2
\`\`\`

---

### 4️⃣ I — Interface Segregation Principle (ISP)

> **Kleine, spezifische Interfaces statt großer, allgemeiner.**

\`\`\`python
# ❌ Schlecht — Ein großes Interface
class Machine:
    def print(self): ...
    def scan(self): ...
    def fax(self): ...

# ✅ Gut — Spezifische Interfaces
class Printer:
    def print(self): pass

class Scanner:
    def scan(self): pass

class Fax:
    def fax(self): pass

class MultiFunctionDevice(Printer, Scanner, Fax):
    def print(self): ...
    def scan(self): ...
    def fax(self): ...
\`\`\`

---

### 5️⃣ D — Dependency Inversion Principle (DIP)

> **Abstraktionen sollten nicht von Konkretionen abhängen.**

\`\`\`python
# ❌ Schlecht — Klasse hängt von konkreter DB ab
class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Harte Abhängigkeit!

# ✅ Gut — Abhängigkeit von Interface
class Database:
    def save(self, data): pass

class UserService:
    def __init__(self, db: Database):  # Interface als Typ
        self.db = db

# Verschiedene Implementierungen möglich
service = UserService(MySQLDatabase())
service = UserService(PostgreSQLDatabase())
\`\`\`

---

## Zusammenfassung

| Prinzip | Merksatz |
|---------|----------|
| **S**RP | Eine Klasse = eine Aufgabe |
| **O**CP | Offen für Erweiterung, geschlossen für Änderung |
| **L**SP | Untertypen ersetzbar |
| **I**SP | Kleine Interfaces statt große |
| **D**IP | Abstraktionen, keine Konkretionen |

---

> 💡 **IHK-Tipp:** "Erklären Sie das Single Responsibility Principle!" — Eine Klasse sollte nur eine Aufgabe haben. Das verbessert Wartbarkeit und Testbarkeit.`
    },

    // --- Lektion 2: Clean Code ---
    {
      id: "ep-2",
      title: "Clean Code & Best Practices",
      duration: "15 min",
      type: "text",
      content: `## Clean Code — Code, den Menschen verstehen

> In der letzten Lektion haben wir die SOLID-Prinzipien kennengelernt — die großen Entwurfsprinzipien. Jetzt schauen wir uns konkretere Regeln an: Was macht Code lesbar und wartbar?

**Clean Code** ist Code, der **lesbar, wartbar und verständlich** ist. Er folgt bewährten Prinzipien.

---

## 📏 Die wichtigsten Prinzipien

### DRY — Don't Repeat Yourself
> Wiederhole dich nicht im Code.

\`\`\`python
# ❌ Schlecht — Code wiederholt sich
def get_user_name(user):
    return user["first_name"] + " " + user["last_name"]

def get_admin_name(admin):
    return admin["first_name"] + " " + admin["last_name"]

# ✅ Gut — Eine Funktion
def get_full_name(person):
    return person["first_name"] + " " + person["last_name"]
\`\`\`

### KISS — Keep It Simple, Stupid
> Einfach ist besser als komplex.

\`\`\`python
# ❌ Schlecht — Zu komplex
def is_even(n):
    return True if n % 2 == 0 else False

# ✅ Gut — Einfach
def is_even(n):
    return n % 2 == 0
\`\`\`

### YAGNI — You Ain't Gonna Need It
> Baue nur, was JETZT gebraucht wird.

\`\`\`python
# ❌ Schlecht — Feature für "vielleicht später"
class User:
    def __init__(self, name):
        self.name = name
        self.two_factor_enabled = False  # Braucht noch keiner!
        self.api_key = None  # Braucht noch keiner!

# ✅ Gut — Nur was gebraucht wird
class User:
    def __init__(self, name):
        self.name = name
\`\`\`

---

## 🔧 Refactoring

**Refactoring** = Code verbessern ohne das Verhalten zu ändern.

### Wann refactorn?

| Zeitpunkt | Beschreibung |
|-----------|-------------|
| 🚩 **Code Smells erkannt** | Warnsignale im Code entdeckt |
| 🔀 **Vor dem Merge** | Code sauber halten |
| 🔄 **Iterativ/inkrementell** | Kleine Schritte, nicht alles auf einmal |
| 🏕️ **Pfadfinder-Regel** | "Hinterlasse den Code besser als du ihn vorgefunden hast" |

### Typische Refactorings
| Vorher | Nachher |
|--------|---------|
| Lange Methode | In mehrere kleine aufteilen |
| Duplizierter Code | In Funktion auslagern |
| Magische Zahlen | Konstanten definieren |
| Tiefe Verschachtelung | Early Return |

---

## 📊 Coupling & Cohesion

| Prinzip | Bedeutung | Merkmale |
|---------|----------|----------|
| 🔗 **Lose Kopplung** (Low Coupling) | Klassen sollen **wenig voneinander abhängen** | Nur über Interfaces kommunizieren, keine globalen Variablen, Dependency Injection nutzen |
| 🎯 **Starke Kohäsion** (High Cohesion) | Eine Klasse soll **eine Sache gut machen** | Alle Methoden gehören zusammen, klaren Zweck erfüllen, nicht zu viele Verantwortlichkeiten |

---

## 📝 Code Conventions

| Regel | Beispiel |
|-------|----------|
| **Aussagekräftige Namen** | \`user_age\` statt \`ua\` |
| **Funktionen kurz** | Max. 20 Zeilen |
| **Parameter wenig** | Max. 4 Parameter |
| **Kommentare nützlich** | WARUM, nicht WAS |
| **Konsistenter Stil** | Team einigt sich auf Style Guide |

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Coupling und Cohesion?" — Coupling = Abhängigkeit zwischen Klassen (niedrig ist gut). Cohesion = Zusammengehörigkeit innerhalb einer Klasse (hoch ist gut).`
    },

    // --- Lektion 3: Interfaces ---
    {
      id: "ep-3",
      title: "Interfaces — Verträge für Klassen",
      duration: "15 min",
      type: "text",
      content: `## Interfaces — WAS, nicht WIE

> SOLID und Clean Code sind die Prinzipien. Jetzt kommt ein konkreteres Werkzeug: Interfaces. Sie sind der Schlüssel zu loser Kopplung und Testbarkeit — und ein zentrales Konzept in moderner Software.

Ein **Interface** definiert, **was eine Klasse können muss** — nicht wie sie es implementiert. Es ist ein **Vertrag**.

---

## 📋 Was ist ein Interface?

> Ein Interface beschreibt eine **Sammlung von Methoden**, die eine Klasse implementieren muss.

\`\`\`python
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self): pass

    @abstractmethod
    def query(self, sql): pass

    @abstractmethod
    def close(self): pass
\`\`\`

---

## 🎯 Warum Interfaces?

| Vorteil | Beschreibung |
|---------|-------------|
| 🔄 **Austauschbarkeit** | Implementierung austauschen ohne Code zu ändern |
| 🧪 **Testbarkeit** | Mock-Objekte einfach erstellen |
| 📐 **Klare Struktur** | Jeder weiß, was eine Klasse kann |
| 🔌 **Dependency Injection** | Abhängigkeiten über Interfaces |

---

## 📝 Beispiel: Datenbank-Interface

\`\`\`python
# Interface
class Database(ABC):
    @abstractmethod
    def save(self, data): pass

    @abstractmethod
    def find(self, id): pass

# Implementierung 1: MySQL
class MySQLDatabase(Database):
    def save(self, data):
        print(f"MySQL: Speichere {data}")

    def find(self, id):
        print(f"MySQL: Suche {id}")
        return {"id": id}

# Implementierung 2: PostgreSQL
class PostgreSQLDatabase(Database):
    def save(self, data):
        print(f"PostgreSQL: Speichere {data}")

    def find(self, id):
        print(f"PostgreSQL: Suche {id}")
        return {"id": id}

# Service nutzt Interface, nicht Implementierung
class UserService:
    def __init__(self, db: Database):
        self.db = db  # Interface als Typ!

    def create_user(self, user_data):
        self.db.save(user_data)

# Austauschbar!
service = UserService(MySQLDatabase())
service = UserService(PostgreSQLDatabase())
\`\`\`

---

## 🧪 Interfaces und Tests

Interfaces machen Code **testbar** durch Mock-Objekte:

\`\`\`python
# Mock-Datenbank für Tests
class MockDatabase(Database):
    def __init__(self):
        self.saved = []

    def save(self, data):
        self.saved.append(data)

    def find(self, id):
        return {"id": id, "name": "Test"}

# Test
def test_create_user():
    mock_db = MockDatabase()
    service = UserService(mock_db)
    service.create_user({"name": "Max"})
    assert mock_db.saved == [{"name": "Max"}]
\`\`\`

---

## 🔌 Interface in C#

\`\`\`csharp
// Interface definieren
public interface IDatabase
{
    void Save(object data);
    object Find(int id);
    void Close();
}

// Implementierung
public class MySQLDatabase : IDatabase
{
    public void Save(object data) { /* ... */ }
    public object Find(int id) { /* ... */ }
    public void Close() { /* ... */ }
}

// Nutzung
public class UserService
{
    private readonly IDatabase _db;

    public UserService(IDatabase db)
    {
        _db = db;  // Interface als Typ
    }
}
\`\`\`

---

## 📊 Interface vs. Abstrakte Klasse

| | Interface | Abstrakte Klasse |
|---|---|---|
| **Methoden** | Nur Signaturen | Kann Implementierung haben |
| **Vererbung** | Mehrere möglich | Nur eine |
| **Zweck** | "Kann das" | "Ist ein" |
| **C#** | \`interface\` | \`abstract class\` |

---

> 💡 **IHK-Tipp:** "Was ist der Vorteil von Interfaces?" — Austauschbarkeit, Testbarkeit (Mocks), klare Struktur, Dependency Injection möglich.`
    },

    // // --- Lektion 4: Unit Tests ---
    {
      id: "ep-4",
      title: "Unit Tests — Code testen",
      duration: "18 min",
      type: "interactive",
      interactive: "testRunner",
      content: `## Unit Tests — Qualität durch automatisierte Tests

> Wir kennen jetzt Interfaces — sie machen unseren Code testbar. Jetzt nutzen wir das: Unit Tests sind die wichtigste Methode, um sicherzustellen, dass unser Code funktioniert. Ohne Tests ist Code nur eine Vermutung!

> Testverfahren behandeln wir auch im Modul "Software-Qualitätsstandards" — dort mit Fokus auf die Testpyramide.

**Unit-Tests** testen **einzelne Funktionen oder Klassen** isoliert. Sie sind die Grundlage für sicheren Code.

---

## 🧪 Was ist ein Unit-Test?

> Ein Unit-Test testet **eine einzelne Funktion** in **Isolation** — ohne Datenbank, Netzwerk oder Dateisystem.

\`\`\`python
def addiere(a, b):
    return a + b

def test_addiere():
    assert addiere(2, 3) == 5
    assert addiere(-1, 1) == 0
    assert addiere(0, 0) == 0
\`\`\`

---

## 📐 AAA-Pattern (Arrange, Act, Assert)

Jeder Unit-Test folgt dem **Triple-A**-Pattern:

\`\`\`python
def test_login():
    # Arrange — Vorbereitung
    user = create_user("test@test.de", "pass123")

    # Act — Aktion ausführen
    result = login("test@test.de", "pass123")

    # Assert — Ergebnis prüfen
    assert result.success == True
    assert result.user.email == "test@test.de"
\`\`\`

| Phase | Zweck |
|-------|-------|
| **Arrange** | Testdaten und Umgebung vorbereiten |
| **Act** | Die zu testende Funktion aufrufen |
| **Assert** | Das Ergebnis prüfen |

---

## 🎭 Mock-Objekte

**Mocks** ersetzen echte Abhängigkeiten im Test:

\`\`\`python
# Echte Datenbank — nicht für Tests!
class RealDatabase:
    def save(self, data):
        # Schreibt in echte DB...
        pass

# Mock-Datenbank — für Tests
class MockDatabase:
    def __init__(self):
        self.saved = []

    def save(self, data):
        self.saved.append(data)  # Speichert nur im Speicher

# Test mit Mock
def test_user_creation():
    mock_db = MockDatabase()
    service = UserService(mock_db)

    service.create_user({"name": "Max"})

    # Prüfen, ob save aufgerufen wurde
    assert len(mock_db.saved) == 1
    assert mock_db.saved[0]["name"] == "Max"
\`\`\`

> 💡 **Merke:** Mocks machen Tests **schnell** und **unabhängig** — keine echte DB, kein Netzwerk nötig!

---

## 🔧 Unit Tests in Python

### Mit unittest
\`\`\`python
import unittest

class TestAddiere(unittest.TestCase):
    def test_positive_zahlen(self):
        self.assertEqual(addiere(2, 3), 5)

    def test_negative_zahlen(self):
        self.assertEqual(addiere(-1, -2), -3)

if __name__ == '__main__':
    unittest.main()
\`\`\`

### Mit pytest (empfohlen)
\`\`\`python
def test_addiere():
    assert addiere(2, 3) == 5

def test_negative():
    assert addiere(-1, -2) == -3

# Ausführen: pytest test_datei.py
\`\`\`

---

## 🔧 Unit Tests in C# (MSTest/xUnit)

\`\`\`csharp
// Test-Klasse
[TestClass]
public class CalculatorTests
{
    [TestMethod]
    public void Addiere_PositiveZahlen_Ergebnis()
    {
        // Arrange
        var calc = new Calculator();

        // Act
        var result = calc.Addiere(2, 3);

        // Assert
        Assert.AreEqual(5, result);
    }
}
\`\`\`

---

## 📊 Testabdeckung

| Art | Beschreibung |
|-----|-------------|
| **Statement Coverage** | Jede Zeile wurde ausgeführt |
| **Branch Coverage** | Jeder if/else-Zweig wurde getestet |
| **Path Coverage** | Jeder mögliche Pfad wurde getestet |

> ⚠️ **100% Coverage ≠ fehlerfrei!** Es zeigt nur, dass der Code ausgeführt wurde.

---

## 🔨 Tests ausprobieren

[INTERACTIVE]

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Unit-Test und Integrationstest?" — Unit = isoliert, eine Funktion. Integration = Zusammenspiel mehrerer Module.`
    },

    // --- Lektion 5: Coupling & Cohesion ---
    {
      id: "ep-5",
      title: "Coupling & Cohesion",
      duration: "12 min",
      type: "text",
      content: `## Coupling & Cohesion — Qualitätsmerkmale von Code

> Nach den Unit Tests fragen wir uns: Warum ist mancher Code schwer zu testen? Oft liegt es an starker Kopplung. Lose Kopplung und starke Kohäsion sind die Grundlagen für wartbaren Code.

**Coupling** (Kopplung) und **Cohesion** (Kohäsion) sind die wichtigsten Qualitätsmerkmale für die Struktur deines Codes.

---

## 🔗 Coupling (Kopplung)

> **Wie stark hängen Klassen voneinander ab?**

| Kopplung | Beschreibung | Beispiel |
|----------|-------------|----------|
| 🔴 **Stark** | Klasse A nutzt direkt Klasse B | \`new MySQLDatabase()\` |
| 🟢 **Lose** | Klasse A nutzt Interface von B | \`new Database()\` |

### Starke Kopplung — Problem
\`\`\`python
# ❌ Schlecht — Direkte Abhängigkeit
class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Harte Abhängigkeit!

    # Wechsel zu PostgreSQL = Code ändern!
\`\`\`

### Lose Kopplung — Lösung
\`\`\`python
# ✅ Gut — Über Interface
class UserService:
    def __init__(self, db: Database):  # Interface als Typ
        self.db = db

    # Wechsel zu PostgreSQL = nur beim Erstellen!
\`\`\`

---

## 🎯 Cohesion (Kohäsion)

> **Wie gut passen die Methoden einer Klasse zusammen?**

| Kohäsion | Beschreibung | Beispiel |
|----------|-------------|----------|
| 🔴 **Schwach** | Klasse macht vieles durcheinander | UserManager + EmailSender + Logger |
| 🟢 **Stark** | Klasse macht eine Sache gut | UserRepository |

### Schwache Kohäsion — Problem
\`\`\`python
# ❌ Schlecht — Klasse macht zu viel
class UserManager:
    def create_user(self): ...
    def send_email(self): ...
    def generate_report(self): ...
    def log_activity(self): ...
\`\`\`

### Starke Kohäsion — Lösung
\`\`\`python
# ✅ Gut — Jede Klasse eine Aufgabe
class UserRepository:
    def create_user(self): ...

class EmailService:
    def send_email(self): ...

class ReportGenerator:
    def generate_report(self): ...
\`\`\`

---

## ⚔️ Zusammenfassung

**Coupling** (Kopplung) beschreibt, wie stark Klassen voneinander abhängen. **Cohesion** (Kohäsion) beschreibt, wie gut die Methoden einer Klasse zusammenpassen.

| Merkmal | Gut | Schlecht |
|---------|-----|----------|
| **Coupling** | 🟢 Lose (über Interfaces) | 🔴 Stark (direkte Abhängigkeiten) |
| **Cohesion** | 🟢 Stark (eine Aufgabe) | 🔴 Schwach (vieles durcheinander) |

> 💡 **Merke:** Lose Kopplung + Starke Kohäsion = **sauberer Code**! Klassen sollten nur über Interfaces kommunizieren und jeweils nur eine Aufgabe erfüllen.

---

> 💡 **IHK-Tipp:** "Was ist der Unterschied zwischen Coupling und Cohesion?" — Coupling = Abhängigkeit zwischen Klassen (niedrig = gut). Cohesion = Zusammengehörigkeit innerhalb einer Klasse (hoch = gut).`
    },

    // --- Lektion 6: Code Smells ---
    {
      id: "ep-6",
      title: "Code Smells erkennen & entfernen",
      duration: "12 min",
      type: "text",
      content: `## Code Smells — Warnsignale im Code

> Wir kennen jetzt die Prinzipien (SOLID, Clean Code) und Werkzeuge (Interfaces, Tests, Coupling/Cohesion). Jetzt lernen wir, schlechten Code zu erkennen — und wie wir ihn verbessern. Code Smells sind wie Warnsignale: Sie zeigen, wo etwas nicht stimmt.

> Code Smells behandeln wir auch im Modul "Software-Qualitätsstandards" — dort mit Fokus auf ISO 9126.

**Code Smells** sind Hinweise auf schlechte Code-Struktur. Sie sind keine Fehler, aber **Risiken für zukünftige Probleme**.

---

## 🚩 Die häufigsten Code Smells

### 1️⃣ Lange Methoden (>20 Zeilen)
> Methode macht zu viel → schwer zu verstehen.

\`\`\`python
# ❌ Schlecht
def process_order(order):
    # 50 Zeilen Code...

# ✅ Gut — Aufteilen
def process_order(order):
    validate(order)
    calculate_total(order)
    save(order)
    send_confirmation(order)
\`\`\`

### 2️⃣ Lange Parameterlisten (>4)
> Zu viele Parameter → schwer zu lesen.

\`\`\`python
# ❌ Schlecht
def create_user(name, email, age, city, street, zip_code, phone):

# ✅ Gut — Objekt verwenden
def create_user(user_data: UserData):
\`\`\`

### 3️⃣ Duplicated Code
> Gleicher Code an mehreren Stellen → DRY verletzt.

### 4️⃣ Error Hiding
> Fehler verschlucken statt behandeln.

\`\`\`python
# ❌ Schlecht
try:
    do_something()
except:
    pass  # Fehler verschluckt!

# ✅ Gut
try:
    do_something()
except SpecificError as e:
    logger.error(f"Fehler: {e}")
    raise
\`\`\`

### 5️⃣ Reinvent the Wheel
> Bibliotheken nutzen statt alles selbst schreiben.

---

## 🔧 Code Smells entfernen

### Schritt-für-Schritt
1. **Erkennen** — Code Smell identifizieren
2. **Klein optimieren** — Schritt für Schritt über Iterationen
3. **Refactoring** — Code durch besseren Code ersetzen
4. **Testen** — Nach jeder Änderung testen
5. **Pfadfinder-Regel** — Hinterlasse den Code besser

### Typische Refactorings

| Smell | Refactoring |
|-------|------------|
| Lange Methode | Extract Method |
| Duplicated Code | Extract Function |
| Magische Zahlen | Konstanten einführen |
| Tiefe Verschachtelung | Early Return |
| Große Klasse | Extract Class |

---

> 💡 **IHK-Tipp:** "Was sind Code Smells und wie entfernt man sie?" — Warnsignale (lange Methoden, Error Hiding, etc.). Entfernen durch Refactoring: Code verbessern ohne Verhalten zu ändern.`
    },

    // --- Lektion 7: Quiz ---
    {
      id: "ep-7",
      title: "Wissenstest: Erweiterte Programmierung",
      duration: "15 min",
      type: "quiz",
      content: `## 🎯 Quiz: Erweiterte Programmierung

Teste dein Wissen über SOLID, Clean Code, Interfaces und Tests!`,
    },
  ],
};
