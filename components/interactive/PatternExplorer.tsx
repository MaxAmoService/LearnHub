"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Layers,
  Building2,
  Workflow,
  ChevronRight,
  ChevronDown,
  Code2,
  Lightbulb,
  Puzzle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  Shuffle,
} from "lucide-react";

// ============================================================================
// Pattern Explorer — Design Patterns interaktiv erkunden & üben
// ============================================================================

type Category = "creational" | "structural" | "behavioral";

interface DesignPattern {
  id: string;
  name: string;
  category: Category;
  description: string;
  structure: string;
  codeExample: string;
  useCase: string;
}

const categoryMeta: Record<Category, { label: string; color: string; bg: string; border: string; icon: typeof Layers }> = {
  creational: { label: "Erzeugungsmuster", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", icon: Building2 },
  structural: { label: "Strukturmuster", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", icon: Layers },
  behavioral: { label: "Verhaltensmuster", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", icon: Workflow },
};

const patterns: DesignPattern[] = [
  // ── Erzeugungsmuster ──────────────────────────────────────────────────────
  {
    id: "singleton",
    name: "Singleton",
    category: "creational",
    description: "Stellt sicher, dass eine Klasse nur eine einzige Instanz besitzt und einen globalen Zugriffspunkt darauf bietet. Nützlich für Konfigurationsmanager, Logger oder Datenbankverbindungen.",
    structure: "Eine Klasse mit einem privaten Konstruktor und einer statischen Methode getInstance(), die die einzige Instanz verwaltet. Der Konstruktor wird privat deklariert, um die direkte Instantiierung zu verhindern.",
    codeExample: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        self.value = 42

# Verwendung
a = Singleton()
b = Singleton()
print(a is b)  # True — gleiche Instanz`,
    useCase: "Datenbankverbindung, Logging, Konfigurationsmanager — überall dort, wo genau eine Instanz benötigt wird.",
  },
  {
    id: "factory-method",
    name: "Factory Method",
    category: "creational",
    description: "Definiert eine Schnittstelle zur Erstellung von Objekten, lässt die Unterklassen aber entscheiden, welche Klasse instanziiert wird. Die Erstellung wird von der Verwendung entkoppelt.",
    structure: "Eine abstrakte Creator-Klasse mit einer abstrakten factoryMethod(). Konkrete Creator überschreiben diese Methode, um konkrete Produkte zu erzeugen. Der Client arbeitet über die abstrakte Schnittstelle.",
    codeExample: `from abc import ABC, abstractmethod

class Transport(ABC):
    @abstractmethod
    def deliver(self) -> str:
        pass

class Truck(Transport):
    def deliver(self) -> str:
        return "Lieferung per LKW"

class Ship(Transport):
    def deliver(self) -> str:
        return "Lieferung per Schiff"

class Logistics(ABC):
    @abstractmethod
    def create_transport(self) -> Transport:
        pass

    def plan_delivery(self) -> str:
        transport = self.create_transport()
        return transport.deliver()

class RoadLogistics(Logistics):
    def create_transport(self) -> Transport:
        return Truck()

class SeaLogistics(Logistics):
    def create_transport(self) -> Transport:
        return Ship()`,
    useCase: "Wenn der Code unabhängig von den konkreten Produktklassen sein soll und die Erstellung in Unterklassen ausgelagert werden muss.",
  },
  {
    id: "abstract-factory",
    name: "Abstract Factory",
    category: "creational",
    description: "Bietet eine Schnittstelle zur Erstellung von Familien verwandter oder abhängiger Objekte, ohne ihre konkreten Klassen angeben zu müssen. Stellt sicher, dass zusammengehörige Objekte kompatibel sind.",
    structure: "Eine abstrakte Factory mit Methoden für jedes Produkt einer Familie. Konkrete Factorys implementieren diese Methoden für spezifische Produktfamilien. Der Client nutzt nur die abstrakte Schnittstelle.",
    codeExample: `from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def render(self) -> str: pass

class Checkbox(ABC):
    @abstractmethod
    def render(self) -> str: pass

class DarkButton(Button):
    def render(self) -> str: return "🌙 Dark Button"

class LightButton(Button):
    def render(self) -> str: return "☀️ Light Button"

class DarkCheckbox(Checkbox):
    def render(self) -> str: return "🌙 Dark Checkbox"

class LightCheckbox(Checkbox):
    def render(self) -> str: return "☀️ Light Checkbox"

class UIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button: pass
    @abstractmethod
    def create_checkbox(self) -> Checkbox: pass

class DarkUIFactory(UIFactory):
    def create_button(self) -> Button: return DarkButton()
    def create_checkbox(self) -> Checkbox: return DarkCheckbox()

class LightUIFactory(UIFactory):
    def create_button(self) -> Button: return LightButton()
    def create_checkbox(self) -> Checkbox: return LightCheckbox()`,
    useCase: "GUI-Frameworks mit verschiedenen Themes, plattformabhängige UI-Komponenten — wenn Produktfamilien konsistent erzeugt werden müssen.",
  },
  {
    id: "builder",
    name: "Builder",
    category: "creational",
    description: "Trennt die Konstruktion eines komplexen Objekts von seiner Darstellung, sodass derselbe Konstruktionsprozess verschiedene Darstellungen erzeugen kann. Besonders bei Objekten mit vielen optionalen Parametern.",
    structure: "Ein Director, der den Konstruktionsprozess steuert, und ein Builder-Interface mit Methoden für jeden Bauschritt. Konkrete Builder implementieren die Schritte und liefern das fertige Produkt über getResult().",
    codeExample: `class Computer:
    def __init__(self):
        self.cpu = ""
        self.ram = ""
        self.storage = ""
        self.gpu = ""

    def __str__(self):
        return f"CPU: {self.cpu}, RAM: {self.ram}, Storage: {self.storage}, GPU: {self.gpu}"

class ComputerBuilder:
    def __init__(self):
        self.computer = Computer()

    def set_cpu(self, cpu: str) -> "ComputerBuilder":
        self.computer.cpu = cpu
        return self

    def set_ram(self, ram: str) -> "ComputerBuilder":
        self.computer.ram = ram
        return self

    def set_storage(self, storage: str) -> "ComputerBuilder":
        self.computer.storage = storage
        return self

    def set_gpu(self, gpu: str) -> "ComputerBuilder":
        self.computer.gpu = gpu
        return self

    def build(self) -> Computer:
        return self.computer

# Verwendung (Fluent Interface)
pc = (ComputerBuilder()
    .set_cpu("Intel i9")
    .set_ram("32GB DDR5")
    .set_storage("1TB NVMe")
    .set_gpu("RTX 4090")
    .build())`,
    useCase: "Komplexe Objekte mit vielen optionalen Parametern — z.B. HTTP-Requests, SQL-Queries, GUI-Dialoge.",
  },
  {
    id: "prototype",
    name: "Prototype",
    category: "creational",
    description: "Ermöglicht die Erstellung neuer Objekte durch Kopieren (Klonen) eines existierenden Objekts anstatt durch neue Instantiierung. Spart Zeit bei der Erstellung aufwendiger Objekte.",
    structure: "Ein Prototype-Interface mit einer clone()-Methode. Konkrete Prototypen implementieren clone() und erstellen eine Kopie ihrer selbst, inklusive aller Eigenschaften.",
    codeExample: `import copy

class Prototype:
    def clone(self):
        return copy.deepcopy(self)

class Document(Prototype):
    def __init__(self, title: str, content: str, styles: dict):
        self.title = title
        self.content = content
        self.styles = styles

    def __str__(self):
        return f"'{self.title}' — {len(self.content)} Zeichen"

# Verwendung
template = Document("Vorlage", "Hallo Welt!", {"font": "Arial", "size": 12})

# Klonen statt neue Erstellung
doc1 = template.clone()
doc1.title = "Rechnung"
doc1.content = "Rechnung #1234"

doc2 = template.clone()
doc2.title = "Angebot"
doc2.content = "Angebot #5678"

print(template)  # 'Vorlage' — 11 Zeichen
print(doc1)      # 'Rechnung' — 13 Zeichen
print(doc2)      # 'Angebot' — 13 Zeichen`,
    useCase: "Wenn die Objekterstellung teuer ist (z.B. DB-Abfragen) oder wenn viele ähnliche Objekte mit geringen Unterschieden benötigt werden.",
  },

  // ── Strukturmuster ────────────────────────────────────────────────────────
  {
    id: "adapter",
    name: "Adapter",
    category: "structural",
    description: "Wandelt die Schnittstelle einer Klasse in eine vom Client erwartete Schnittstelle um. Ermlicht die Zusammenarbeit von Klassen, die sonst aufgrund inkompatibler Schnittstellen nicht zusammenarbeiten könnten.",
    structure: "Ein Adapter enthält eine Referenz auf das adaptee-Objekt und implementiert die vom Client erwartete Schnittstelle. Aufrufe werden intern an das Adaptee-Objekt delegiert und ggf. umgewandelt.",
    codeExample: `class EuropeanSocket:
    def plug_in_type_c(self) -> str:
        return "Verbunden mit Type-C Stecker"

class AmericanDevice:
    def plug_in_type_a(self) -> str:
        return "Connected with Type-A plug"

class EuropeanToAmericanAdapter(AmericanDevice):
    def __init__(self, european_socket: EuropeanSocket):
        self.european_socket = european_socket

    def plug_in_type_a(self) -> str:
        # Adapter wandelt die Schnittstelle um
        result = self.european_socket.plug_in_type_c()
        return f"[Adapter] {result} → Type-A Gerät angeschlossen"

# Verwendung
socket = EuropeanSocket()
adapter = EuropeanToAmericanAdapter(socket)
print(adapter.plug_in_type_a())`,
    useCase: "Integration von Legacy-Code, Nutzung von Drittanbieter-Bibliotheken mit abweichender API, Zusammenführung verschiedener Systeme.",
  },
  {
    id: "bridge",
    name: "Bridge",
    category: "structural",
    description: "Trennt die Abstraktion von ihrer Implementierung, sodass beide unabhängig voneinander variiert werden können. Verhindert eine exponentielle Vermehrung von Klassen bei mehreren Varianten.",
    structure: "Die Abstraktion hält eine Referenz auf ein Implementierungs-Objekt. Beide Hierarchien (Abstraktion und Implementierung) können sich unabhängig entwickeln. Der Client nutzt die Abstraktion.",
    codeExample: `from abc import ABC, abstractmethod

# Implementierung
class Renderer(ABC):
    @abstractmethod
    def render_circle(self, radius: float) -> str: pass

class VectorRenderer(Renderer):
    def render_circle(self, radius: float) -> str:
        return f"Zeichne Kreis (Radius={radius}) als Vektorgrafik"

class RasterRenderer(Renderer):
    def render_circle(self, radius: float) -> str:
        return f"Zeichne Kreis (Radius={radius}) als Pixelgrafik"

# Abstraktion
class Shape(ABC):
    def __init__(self, renderer: Renderer):
        self.renderer = renderer

    @abstractmethod
    def draw(self) -> str: pass

class Circle(Shape):
    def __init__(self, renderer: Renderer, radius: float):
        super().__init__(renderer)
        self.radius = radius

    def draw(self) -> str:
        return self.renderer.render_circle(self.radius)

# Verwendung
vector_circle = Circle(VectorRenderer(), 5.0)
raster_circle = Circle(RasterRenderer(), 5.0)
print(vector_circle.draw())
print(raster_circle.draw())`,
    useCase: "GUI-Frameworks (verschiedene OS x verschiedene Widget-Typen), Treiber-Modelle — wenn Abstraktion und Implementierung unabhängig skalieren sollen.",
  },
  {
    id: "composite",
    name: "Composite",
    category: "structural",
    description: "Komponiert Objekte zu Baumstrukturen, um Teil-Ganzes-Hierarchien darzustellen. Clients behandeln einzelne Objekte und Zusammensetzungen einheitlich über eine gemeinsame Schnittstelle.",
    structure: "Eine Component-Schnittstelle mit gemeinsamen Operationen. Leaf-Komponenten implementieren die Operation direkt. Composite-Komponenten enthalten Kinder und delegieren die Operation rekursiv.",
    codeExample: `from abc import ABC, abstractmethod

class FileSystemItem(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def get_size(self) -> int: pass

    @abstractmethod
    def display(self, indent: int = 0) -> str: pass

class File(FileSystemItem):
    def __init__(self, name: str, size: int):
        super().__init__(name)
        self.size = size

    def get_size(self) -> int:
        return self.size

    def display(self, indent: int = 0) -> str:
        return f"{'  ' * indent}📄 {self.name} ({self.size} KB)"

class Directory(FileSystemItem):
    def __init__(self, name: str):
        super().__init__(name)
        self.children: list[FileSystemItem] = []

    def add(self, item: FileSystemItem):
        self.children.append(item)

    def get_size(self) -> int:
        return sum(child.get_size() for child in self.children)

    def display(self, indent: int = 0) -> str:
        lines = [f"{'  ' * indent}📁 {self.name}/ ({self.get_size()} KB)"]
        for child in self.children:
            lines.append(child.display(indent + 1))
        return "\\n".join(lines)

# Verwendung
root = Directory("root")
src = Directory("src")
src.add(File("main.py", 15))
src.add(File("utils.py", 8))
root.add(src)
root.add(File("README.md", 3))
print(root.display())`,
    useCase: "Dateisysteme, GUI-Widget-Bäume, Organisationstrukturen — überall wo Teil-Ganzes-Hierarchien einheitlich behandelt werden sollen.",
  },
  {
    id: "decorator",
    name: "Decorator",
    category: "structural",
    description: "Ermöglicht das dynamische Hinzufügen von Verhalten zu einzelnen Objekten, ohne die gesamte Klasse zu verändern. Dekoratoren umhüllen das Originalobjekt und erweitern es schrittweise.",
    structure: "Ein Component-Interface wird von ConcreteComponent und Decorator implementiert. Decorator enthält eine Referenz auf ein Component-Objekt und delegiert Aufrufe, erweitert sie aber um zusätzliches Verhalten.",
    codeExample: `from abc import ABC, abstractmethod

class Coffee(ABC):
    @abstractmethod
    def cost(self) -> float: pass

    @abstractmethod
    def description(self) -> str: pass

class SimpleCoffee(Coffee):
    def cost(self) -> float:
        return 2.50

    def description(self) -> str:
        return "Einfacher Kaffee"

class CoffeeDecorator(Coffee, ABC):
    def __init__(self, coffee: Coffee):
        self._coffee = coffee

class MilkDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.50

    def description(self) -> str:
        return self._coffee.description() + " + Milch"

class WhipDecorator(CoffeeDecorator):
    def cost(self) -> float:
        return self._coffee.cost() + 0.75

    def description(self) -> str:
        return self._coffee.description() + " + Sahne"

# Verwendung — Verhalten wird dynamisch geschichtet
coffee = SimpleCoffee()
coffee = MilkDecorator(coffee)
coffee = WhipDecorator(coffee)
print(f"{coffee.description()}: {coffee.cost():.2f}€")`,
    useCase: "Logging, Caching, Authentifizierung, Datenkompression — wenn Verhalten flexibel und kombinierbar hinzugefügt werden soll.",
  },
  {
    id: "facade",
    name: "Facade",
    category: "structural",
    description: "Bietet eine vereinfachte Schnittstelle zu einem komplexen Subsystem. Reduziert die Abhängigkeiten zwischen Client und Subsystem und erleichtert die Nutzung.",
    structure: "Eine Facade-Klasse kapselt die Interaktion mit mehreren Subsystem-Klassen. Der Client ruft nur die Facade auf, die intern die passenden Subsystem-Komponenten koordiniert.",
    codeExample: `class CPU:
    def freeze(self) -> str: return "CPU: Einfrieren"
    def execute(self) -> str: return "CPU: Ausführen"

class Memory:
    def load(self, address: int) -> str: return f"Speicher: Lade von Adresse {address}"

class SSD:
    def read(self, file: str) -> str: return f"SSD: Lese {file}"

class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.ssd = SSD()

    def start(self, boot_file: str) -> str:
        steps = [
            self.cpu.freeze(),
            self.ssd.read(boot_file),
            self.memory.load(0x00),
            self.cpu.execute(),
        ]
        return " → ".join(steps)

# Verwendung — Client kennt die Komplexität nicht
computer = ComputerFacade()
print(computer.start("bootloader.bin"))`,
    useCase: "Bibliotheks-APIs, Microservice-Gateways, komplexer Legacy-Code — wenn eine einfache Oberfläche für ein komplexes System bereitgestellt werden soll.",
  },
  {
    id: "flyweight",
    name: "Flyweight",
    category: "structural",
    description: "Teilt gemeinsame Zustände zwischen vielen Objekten, um Speicher zu sparen. Trennt den intrinsischen (geteilten) vom extrinsischen (kontextabhängigen) Zustand.",
    structure: "Ein Flyweight speichert den intrinsischen (unveränderlichen, geteilten) Zustand. Eine FlyweightFactory verwaltet und teilt Flyweight-Objekte. Der extrinsische Kontext wird bei der Verwendung übergeben.",
    codeExample: `class TreeType:
    """Flyweight — intrinsischer (geteilter) Zustand"""
    def __init__(self, name: str, color: str, texture: str):
        self.name = name
        self.color = color
        self.texture = texture

    def draw(self, x: int, y: int) -> str:
        return f"Zeichne {self.name} ({self.color}) bei ({x},{y})"

class TreeFactory:
    _types: dict[str, TreeType] = {}

    @classmethod
    def get_type(cls, name: str, color: str, texture: str) -> TreeType:
        key = f"{name}_{color}_{texture}"
        if key not in cls._types:
            cls._types[key] = TreeType(name, color, texture)
        return cls._types[key]

class Tree:
    """Extrinsischer Zustand — Position"""
    def __init__(self, x: int, y: int, tree_type: TreeType):
        self.x = x
        self.y = y
        self.type = tree_type

    def draw(self) -> str:
        return self.type.draw(self.x, self.y)

# Verwendung — 1.000.000 Bäume, aber nur 3 TreeType-Objekte!
forest = []
for i in range(1000):
    t = TreeFactory.get_type("Eiche", "Grün", "bark.png")
    forest.append(Tree(i * 10, i * 5, t))
print(f"Baumtypen erstellt: {len(TreeFactory._types)}")`,
    useCase: "Texteditoren (Zeichen-Objekte), Spiele (Gegner-Typen), Rendering — wenn sehr viele ähnliche Objekte den Speicher füllen.",
  },
  {
    id: "proxy",
    name: "Proxy",
    category: "structural",
    description: "Stellvertreter für ein anderes Objekt, um den Zugriff zu kontrollieren. Kann vor dem eigentlichen Objekt loggen, cachen, Berechtigungen prüfen oder die Erstellung verzögern.",
    structure: "Proxy und RealSubject implementieren die gleiche Schnittstelle. Der Proxy hält eine Referenz auf das RealSubject und delegiert Aufrufe nach Prüfung seiner Zusatzlogik (Zugriff, Caching, etc.).",
    codeExample: `from abc import ABC, abstractmethod
import time

class Image(ABC):
    @abstractmethod
    def display(self) -> str: pass

class RealImage(Image):
    def __init__(self, filename: str):
        self.filename = filename
        self._load_from_disk()

    def _load_from_disk(self):
        time.sleep(0.1)  # Simuliert langsames Laden

    def display(self) -> str:
        return f"Bild '{self.filename}' angezeigt"

class ProxyImage(Image):
    def __init__(self, filename: str):
        self.filename = filename
        self._real_image: RealImage | None = None

    def display(self) -> str:
        if self._real_image is None:
            print(f"Lade '{self.filename}'...")
            self._real_image = RealImage(self.filename)
        return self._real_image.display()

# Verwendung — Bild wird erst beim ersten display() geladen
img = ProxyImage("foto.jpg")
print("Proxy erstellt — Bild noch nicht geladen")
print(img.display())  # Jetzt wird geladen
print(img.display())  # Bereits im Cache`,
    useCase: "Lazy Loading, Zugriffssteuerung, Logging, Caching — wenn der Zugriff auf ein Objekt kontrolliert oder optimiert werden soll.",
  },

  // ── Verhaltensmuster ──────────────────────────────────────────────────────
  {
    id: "chain-of-responsibility",
    name: "Chain of Responsibility",
    category: "behavioral",
    description: "Ermöglicht die Weitergabe einer Anfrage entlang einer Kette von Bearbeitern. Jeder Bearbeiter entscheidet, ob er die Anfrage verarbeitet oder an den nächsten weiterleitet.",
    structure: "Jeder Handler kennt seinen Nachfolger (next). Eine Anfrage wird an den ersten Handler gesendet. Er verarbeitet sie oder leitet sie an den nächsten weiter, bis ein Handler sie behandelt.",
    codeExample: `from abc import ABC, abstractmethod

class Handler(ABC):
    def __init__(self):
        self._next: Handler | None = None

    def set_next(self, handler: "Handler") -> "Handler":
        self._next = handler
        return handler

    @abstractmethod
    def handle(self, amount: float) -> str: pass

class CEO(Handler):
    def handle(self, amount: float) -> str:
        if amount > 10000:
            return f"CEO genehmigt {amount:,.0f}€"
        return self._next.handle(amount) if self._next else "Kein Genehmiger"

class Manager(Handler):
    def handle(self, amount: float) -> str:
        if amount > 1000:
            return f"Manager genehmigt {amount:,.0f}€"
        return self._next.handle(amount) if self._next else "Kein Genehmiger"

class TeamLead(Handler):
    def handle(self, amount: float) -> str:
        if amount <= 1000:
            return f"Teamleiter genehmigt {amount:,.0f}€"
        return self._next.handle(amount) if self._next else "Kein Genehmiger"

# Kette aufbauen
lead = TeamLead()
manager = Manager()
ceo = CEO()
lead.set_next(manager).set_next(ceo)

print(lead.handle(500))     # Teamleiter
print(lead.handle(5000))    # Manager
print(lead.handle(50000))   # CEO`,
    useCase: "Middleware (HTTP), Genehmigungsprozesse, Event-Propagation — wenn Anfragen flexibel durch mehrere Bearbeiter wandern sollen.",
  },
  {
    id: "command",
    name: "Command",
    category: "behavioral",
    description: "Kapselt eine Anfrage als Objekt, sodass Parameter, Warteschlangen und protokollierte Anfragen unterstützt werden. Ermöglicht Undo/Redo und die Entkopplung von Sender und Empfänger.",
    structure: "Ein Command-Interface mit execute()- und undo()-Methoden. Concrete Commands kennen den Receiver und kapseln die Aktion. Ein Invoker speichert und führt Commands aus.",
    codeExample: `from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self) -> str: pass

    @abstractmethod
    def undo(self) -> str: pass

class TextEditor:
    def __init__(self):
        self.content = ""

    def insert(self, text: str) -> str:
        self.content += text
        return f"Inhalt: '{self.content}'"

    def delete_last(self, count: int) -> str:
        deleted = self.content[-count:]
        self.content = self.content[:-count]
        return f"Gelöscht: '{deleted}' → '{self.content}'"

class InsertCommand(Command):
    def __init__(self, editor: TextEditor, text: str):
        self.editor = editor
        self.text = text

    def execute(self) -> str:
        return self.editor.insert(self.text)

    def undo(self) -> str:
        return self.editor.delete_last(len(self.text))

class CommandHistory:
    def __init__(self):
        self.history: list[Command] = []

    def execute(self, cmd: Command) -> str:
        self.history.append(cmd)
        return cmd.execute()

    def undo(self) -> str:
        if self.history:
            return self.history.pop().undo()
        return "Nichts zum Rückgängigmachen"

# Verwendung
editor = TextEditor()
history = CommandHistory()
print(history.execute(InsertCommand(editor, "Hallo ")))
print(history.execute(InsertCommand(editor, "Welt!")))
print(history.undo())  # Entfernt "Welt!"`,
    useCase: "Text-Editoren (Undo/Redo), Transaktionen, GUI-Buttons, Makro-Aufnahmen — wenn Aktionen gespeichert, rückgängig gemacht oder in Warteschlangen gelegt werden.",
  },
  {
    id: "iterator",
    name: "Iterator",
    category: "behavioral",
    description: "Bietet eine Möglichkeit, auf die Elemente einer Sammlung zuzugreifen, ohne die interne Struktur offenzulegen. Definiert eine einheitliche Schnittstelle für die Traversierung.",
    structure: "Ein Iterator-Interface mit hasNext() und next(). Concrete Iteratoren kennen die konkrete Sammlung und deren interne Struktur. Die Sammlung liefert über createIterator() einen passenden Iterator.",
    codeExample: `from typing import Iterator as IterType

class Book:
    def __init__(self, title: str, author: str):
        self.title = title
        self.author = author

    def __str__(self):
        return f"'{self.title}' von {self.author}"

class BookCollection:
    def __init__(self):
        self._books: list[Book] = []

    def add(self, book: Book):
        self._books.append(book)

    def __iter__(self) -> IterType[Book]:
        return iter(self._books)

    def reverse(self) -> IterType[Book]:
        return reversed(self._books)

    def by_author(self, author: str) -> IterType[Book]:
        return (b for b in self._books if b.author == author)

# Verwendung
library = BookCollection()
library.add(Book("Design Patterns", "Gang of Four"))
library.add(Book("Clean Code", "Robert C. Martin"))
library.add(Book("The Pragmatic Programmer", "Hunt & Thomas"))

print("Alle Bücher:")
for book in library:
    print(f"  {book}")

print("\\nRückwärts:")
for book in library.reverse():
    print(f"  {book}")`,
    useCase: "Datenbank-Abfragen, Baumtraversierung, Paginierung — wenn Sammlungen einheitlich durchlaufen werden sollen, ohne die Struktur preiszugeben.",
  },
  {
    id: "mediator",
    name: "Mediator",
    category: "behavioral",
    description: "Definiert ein Objekt, das die Interaktion zwischen einer Gruppe von Objekten kapselt. Objekte kommunizieren nicht direkt miteinander, sondern über den Mediator, was lose Kopplung ermöglicht.",
    structure: "Der Mediator kennt alle Colleague-Objekte und koordiniert ihre Interaktion. Colleagues kennen nur den Mediator und senden ihm Nachrichten statt sich direkt zu benachrichtigen.",
    codeExample: `class ChatRoom:
    """Mediator — koordiniert die Kommunikation"""
    def __init__(self):
        self._members: dict[str, "Member"] = {}

    def register(self, member: "Member"):
        self._members[member.name] = member
        member.chatroom = self

    def send(self, sender: str, message: str, to: str | None = None):
        if to:
            # Private Nachricht
            if to in self._members:
                self._members[to].receive(sender, message)
        else:
            # Broadcast
            for name, member in self._members.items():
                if name != sender:
                    member.receive(sender, message)

class Member:
    def __init__(self, name: str):
        self.name = name
        self.chatroom: ChatRoom | None = None

    def send(self, message: str, to: str | None = None):
        if self.chatroom:
            self.chatroom.send(self.name, message, to)

    def receive(self, sender: str, message: str):
        print(f"  [{sender} → {self.name}]: {message}")

# Verwendung
room = ChatRoom()
alice = Member("Alice")
bob = Member("Bob")
charlie = Member("Charlie")
room.register(alice)
room.register(bob)
room.register(charlie)

alice.send("Hallo alle!")
bob.send("Hi Alice!", to="Alice")`,
    useCase: "Chat-Systeme, GUI-Dialogfenster, Flugüberwachung — wenn viele Objekte miteinander kommunizieren und die direkte Kopplung vermieden werden soll.",
  },
  {
    id: "memento",
    name: "Memento",
    category: "behavioral",
    description: "Erfasst und externalisiert den internen Zustand eines Objekts, ohne seine innere Struktur offenzulegen, sodass der Zustand später wiederhergestellt werden kann.",
    structure: "Der Originator erstellt Memento-Objekte mit seinem Zustand. Ein Caretaker speichert die Mementos, kennt aber deren Inhalt nicht. Der Originator kann seinen Zustand aus einem Memento wiederherstellen.",
    codeExample: `class Memento:
    def __init__(self, state: str):
        self._state = state

    def get_state(self) -> str:
        return self._state

class Editor:
    """Originator"""
    def __init__(self):
        self._content = ""

    def type(self, words: str):
        self._content += words

    def save(self) -> Memento:
        return Memento(self._content)

    def restore(self, memento: Memento):
        self._content = memento.get_state()

    def get_content(self) -> str:
        return self._content

class History:
    """Caretaker"""
    def __init__(self):
        self._mementos: list[Memento] = []

    def push(self, memento: Memento):
        self._mementos.append(memento)

    def pop(self) -> Memento | None:
        return self._mementos.pop() if self._mementos else None

# Verwendung
editor = Editor()
history = History()

editor.type("Hallo ")
history.push(editor.save())

editor.type("Welt ")
history.push(editor.save())

editor.type("!!!")
print(f"Aktuell: '{editor.get_content()}'")

editor.restore(history.pop()!)
print(f"Nach Undo: '{editor.get_content()}'")`,
    useCase: "Undo/Redo in Editoren, Spielstand-Speicherung, Transaktions-Rollback — wenn Zustände gespeichert und wiederhergestellt werden sollen.",
  },
  {
    id: "observer",
    name: "Observer",
    category: "behavioral",
    description: "Definiert eine 1-zu-N-Abhängigkeit zwischen Objekten, sodass bei Zustandsänderungen eines Objekts alle abhängigen Objekte automatisch benachrichtigt und aktualisiert werden.",
    structure: "Ein Subject verwaltet eine Liste von Observern und benachrichtigt sie bei Änderungen über update(). Observer registrieren/abmelden sich beim Subject und reagieren auf Benachrichtigungen.",
    codeExample: `from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, data: dict) -> None: pass

class EventEmitter:
    """Subject"""
    def __init__(self):
        self._observers: list[Observer] = []

    def subscribe(self, observer: Observer):
        self._observers.append(observer)

    def unsubscribe(self, observer: Observer):
        self._observers.remove(observer)

    def emit(self, data: dict):
        for observer in self._observers:
            observer.update(data)

class Logger(Observer):
    def update(self, data: dict):
        print(f"  [Log] Event empfangen: {data}")

class AlertSystem(Observer):
    def update(self, data: dict):
        if data.get("severity") == "high":
            print(f"  [ALERT] Kritisch: {data['message']}")

class Dashboard(Observer):
    def update(self, data: dict):
        print(f"  [Dashboard] Anzeige aktualisiert: {data['message']}")

# Verwendung
server = EventEmitter()
server.subscribe(Logger())
server.subscribe(AlertSystem())
server.subscribe(Dashboard())

server.emit({"message": "CPU bei 95%", "severity": "high"})
server.emit({"message": "Speicher OK", "severity": "low"})`,
    useCase: "Event-Systeme, UI-Datenbindung, Publish/Subscribe, Monitoring — wenn Objekte automatisch auf Änderungen reagieren sollen.",
  },
  {
    id: "state",
    name: "State",
    category: "behavioral",
    description: "Ermöglicht einem Objekt, sein Verhalten zu ändern, wenn sich sein interner Zustand ändert. Der Zustand wird als eigenes Objekt modelliert, wodurch lange if/else-Ketten entfallen.",
    structure: "Ein State-Interface definiert das verhaltensspezifische Verhalten. Concrete States implementieren verschiedene Verhaltensweisen. Der Context hält eine Referenz auf den aktuellen State und delegiert an ihn.",
    codeExample: `from abc import ABC, abstractmethod

class OrderState(ABC):
    @abstractmethod
    def next(self, order: "Order") -> str: pass

    @abstractmethod
    def cancel(self, order: "Order") -> str: pass

class NewOrder(OrderState):
    def next(self, order: "Order") -> str:
        order.state = PaidOrder()
        return "Bestellung bezahlt → Versand vorbereiten"

    def cancel(self, order: "Order") -> str:
        order.state = CancelledOrder()
        return "Bestellung storniert"

class PaidOrder(OrderState):
    def next(self, order: "Order") -> str:
        order.state = ShippedOrder()
        return "Bestellung versendet"

    def cancel(self, order: "Order") -> str:
        order.state = CancelledOrder()
        return "Bezahlung erstattet, Bestellung storniert"

class ShippedOrder(OrderState):
    def next(self, order: "Order") -> str:
        return "Bestellung bereits versendet — kein weiterer Schritt"

    def cancel(self, order: "Order") -> str:
        return "Versendete Bestellung kann nicht storniert werden"

class CancelledOrder(OrderState):
    def next(self, order: "Order") -> str:
        return "Stornierte Bestellung — kein weiterer Schritt"

    def cancel(self, order: "Order") -> str:
        return "Bereits storniert"

class Order:
    def __init__(self):
        self.state: OrderState = NewOrder()

    def next(self) -> str:
        return self.state.next(self)

    def cancel(self) -> str:
        return self.state.cancel(self)

# Verwendung
order = Order()
print(order.next())     # Bezahlt
print(order.next())     # Versendet
print(order.cancel())   # Kann nicht storniert werden`,
    useCase: "Spiel-Logik, Workflow-Engines, Netzwerk-Protokolle — wenn das Verhalten sich mit dem Zustand ändert und Zustandsübergänge klar definiert sind.",
  },
  {
    id: "strategy",
    name: "Strategy",
    category: "behavioral",
    description: "Definiert eine Familie austauschbarer Algorithmen und kapselt jeweils einen davon, sodass der Client den Algorithmus zur Laufzeit austauschen kann, ohne den Client-Code zu ändern.",
    structure: "Ein Strategy-Interface mit einer execute()-Methode. Concrete Strategies implementieren verschiedene Algorithmen. Der Context hält eine Referenz auf die aktuelle Strategy und delegiert die Ausführung.",
    codeExample: `from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data: list[int]) -> list[int]: pass

    @abstractmethod
    def name(self) -> str: pass

class BubbleSort(SortStrategy):
    def sort(self, data: list[int]) -> list[int]:
        arr = data.copy()
        n = len(arr)
        for i in range(n):
            for j in range(0, n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr

    def name(self) -> str:
        return "BubbleSort"

class QuickSort(SortStrategy):
    def sort(self, data: list[int]) -> list[int]:
        if len(data) <= 1:
            return data
        pivot = data[len(data) // 2]
        left = [x for x in data if x < pivot]
        mid = [x for x in data if x == pivot]
        right = [x for x in data if x > pivot]
        return self.sort(left) + mid + self.sort(right)

    def name(self) -> str:
        return "QuickSort"

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort(self, data: list[int]) -> list[int]:
        return self._strategy.sort(data)

# Verwendung — Algorithmus zur Laufzeit austauschen
data = [64, 34, 25, 12, 22, 11, 90]
sorter = Sorter(BubbleSort())
print(f"{sorter._strategy.name()}: {sorter.sort(data)}")

sorter.set_strategy(QuickSort())
print(f"{sorter._strategy.name()}: {sorter.sort(data)}")`,
    useCase: "Verschiedene Sortier-/Suchalgorithmen, Kompression, Authentifizierung — wenn Algorithmen austauschbar und zur Laufzeit wählbar sein sollen.",
  },
  {
    id: "template-method",
    name: "Template Method",
    category: "behavioral",
    description: "Definiert das Grundgerüst eines Algorithmus in einer Methode und überlässt die Implementierung einzelner Schritte den Unterklassen. Unterklassen können Schritte überschreiben, ohne die Gesamtstruktur zu ändern.",
    structure: "Eine abstrakte Klasse definiert die templateMethod() als final — sie enthält die Algorithmus-Struktur. Hook- und abstrakte Methoden werden von Unterklassen überschrieben, um einzelne Schritte anzupassen.",
    codeExample: `from abc import ABC, abstractmethod

class DataMiner(ABC):
    def mine(self, path: str) -> str:
        """Template Method — Algorithmus-Grundgerüst"""
        data = self.extract(path)
        parsed = self.parse(data)
        analyzed = self.analyze(parsed)
        report = self.report(analyzed)
        return report

    @abstractmethod
    def extract(self, path: str) -> str: pass

    @abstractmethod
    def parse(self, data: str) -> list[str]: pass

    def analyze(self, data: list[str]) -> dict:
        """Hook — kann überschrieben werden"""
        return {"count": len(data), "items": data}

    def report(self, analysis: dict) -> str:
        return f"Analyse: {analysis['count']} Elemente gefunden"

class CSVMiner(DataMiner):
    def extract(self, path: str) -> str:
        return "Name,Wert\\nA,100\\nB,200"

    def parse(self, data: str) -> list[str]:
        lines = data.strip().split("\\n")
        return [line.split(",")[0] for line in lines[1:]]

class JSONMiner(DataMiner):
    def extract(self, path: str) -> str:
        return '[{"name":"A"},{"name":"B"},{"name":"C"}]'

    def parse(self, data: str) -> list[str]:
        import json
        return [item["name"] for item in json.loads(data)]

# Verwendung
csv = CSVMiner()
print(csv.mine("data.csv"))

json_miner = JSONMiner()
print(json_miner.mine("data.json"))`,
    useCase: "Frameworks (Lifecycle-Hooks), Datenverarbeitungs-Pipelines, Test-Frameworks — wenn der Algorithmus feststeht, aber einzelne Schritte variieren.",
  },
  {
    id: "visitor",
    name: "Visitor",
    category: "behavioral",
    description: "Trennt einen Algorithmus von der Objektstruktur, auf der er operiert. Ermöglicht das Hinzufügen neuer Operationen, ohne die besuchten Klassen zu verändern (Open/Closed Principle).",
    structure: "Ein Visitor-Interface mit visit-Methoden für jeden Elementtyp. Elemente akzeptieren einen Visitor über accept(). Der Visitor kapselt die operation, die auf verschiedenen Elementtypen ausgeführt wird.",
    codeExample: `from abc import ABC, abstractmethod

class Visitor(ABC):
    @abstractmethod
    def visit_text(self, element: "TextElement") -> str: pass

    @abstractmethod
    def visit_image(self, element: "ImageElement") -> str: pass

    @abstractmethod
    def visit_table(self, element: "TableElement") -> str: pass

class Element(ABC):
    @abstractmethod
    def accept(self, visitor: Visitor) -> str: pass

class TextElement(Element):
    def __init__(self, content: str):
        self.content = content

    def accept(self, visitor: Visitor) -> str:
        return visitor.visit_text(self)

class ImageElement(Element):
    def __init__(self, url: str):
        self.url = url

    def accept(self, visitor: Visitor) -> str:
        return visitor.visit_image(self)

class TableElement(Element):
    def __init__(self, rows: int):
        self.rows = rows

    def accept(self, visitor: Visitor) -> str:
        return visitor.visit_table(self)

class HTMLExporter(Visitor):
    def visit_text(self, el: TextElement) -> str:
        return f"<p>{el.content}</p>"

    def visit_image(self, el: ImageElement) -> str:
        return f'<img src="{el.url}" />'

    def visit_table(self, el: TableElement) -> str:
        return f"<table>{el.rows} Zeilen</table>"

class MarkdownExporter(Visitor):
    def visit_text(self, el: TextElement) -> str:
        return el.content

    def visit_image(self, el: ImageElement) -> str:
        return f"![Bild]({el.url})"

    def visit_table(self, el: TableElement) -> str:
        return f"| Tabelle mit {el.rows} Zeilen |"

# Verwendung
doc = [TextElement("Hallo"), ImageElement("img.png"), TableElement(5)]
for exporter_name, exporter in [("HTML", HTMLExporter()), ("Markdown", MarkdownExporter())]:
    print(f"{exporter_name}:")
    for el in doc:
        print(f"  {el.accept(exporter)}")`,
    useCase: "Compiler (AST-Traversal), Dokument-Export, Code-Analyse — wenn neue Operationen auf bestehende Objektstrukturen angewendet werden sollen.",
  },
];

// ── Quiz Logik ──────────────────────────────────────────────────────────────

interface QuizQuestion {
  pattern: DesignPattern;
  description: string;
  options: string[];
  correctIndex: number;
}

function generateQuizQuestions(count: number): QuizQuestion[] {
  const shuffled = [...patterns].sort(() => Math.random() - 0.5);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const correct = shuffled[i];
    const wrongOptions = patterns
      .filter((p) => p.id !== correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => p.name);

    const options = [...wrongOptions, correct.name].sort(() => Math.random() - 0.5);
    const correctIndex = options.indexOf(correct.name);

    // Use a different description snippet for the quiz
    const descSentences = correct.description.split(". ");
    const quizDesc = descSentences.length > 1
      ? descSentences[0] + "."
      : correct.description;

    questions.push({
      pattern: correct,
      description: quizDesc,
      options,
      correctIndex,
    });
  }

  return questions;
}

// ── Hauptkomponente ─────────────────────────────────────────────────────────

type Mode = "explore" | "quiz";

export default function PatternExplorer() {
  const [mode, setMode] = useState<Mode>("explore");
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizLength, setQuizLength] = useState(10);

  const filteredPatterns = useMemo(() => {
    let result = patterns;
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.useCase.toLowerCase().includes(term)
      );
    }
    return result;
  }, [selectedCategory, searchTerm]);

  const groupedPatterns = useMemo(() => {
    const groups: Record<Category, DesignPattern[]> = {
      creational: [],
      structural: [],
      behavioral: [],
    };
    for (const p of filteredPatterns) {
      groups[p.category].push(p);
    }
    return groups;
  }, [filteredPatterns]);

  const startQuiz = useCallback(() => {
    const questions = generateQuizQuestions(quizLength);
    setQuizQuestions(questions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
    setMode("quiz");
  }, [quizLength]);

  const handleAnswer = useCallback((index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === quizQuestions[currentQuestion].correctIndex) {
      setScore((s) => s + 1);
    }
  }, [showResult, currentQuestion, quizQuestions]);

  const nextQuestion = useCallback(() => {
    if (currentQuestion + 1 >= quizQuestions.length) {
      setQuizFinished(true);
    } else {
      setCurrentQuestion((c) => c + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentQuestion, quizQuestions.length]);

  const categoryOrder: Category[] = ["creational", "structural", "behavioral"];

  return (
    <div className="w-full bg-gray-900 text-white rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Puzzle className="w-7 h-7 text-emerald-400" />
              Design Pattern Explorer
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {patterns.length} GoF-Pattern entdecken und im Quiz-Modus testen
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("explore")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                mode === "explore"
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Erkunden
            </button>
            <button
              onClick={startQuiz}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                mode === "quiz"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Explore Mode */}
      {mode === "explore" && (
        <div className="p-6">
          {/* Suchleiste + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Pattern suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-gray-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                Alle ({patterns.length})
              </button>
              {categoryOrder.map((cat) => {
                const meta = categoryMeta[cat];
                const Icon = meta.icon;
                const count = patterns.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? `${meta.bg} ${meta.color} border ${meta.border}`
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {meta.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pattern-Liste */}
          {categoryOrder.map((cat) => {
            const catPatterns = groupedPatterns[cat];
            if (catPatterns.length === 0) return null;
            const meta = categoryMeta[cat];
            const Icon = meta.icon;

            return (
              <div key={cat} className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-5 h-5 ${meta.color}`} />
                  <h3 className={`text-lg font-semibold ${meta.color}`}>
                    {meta.label}
                  </h3>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                    {catPatterns.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {catPatterns.map((pattern) => (
                    <PatternCard
                      key={pattern.id}
                      pattern={pattern}
                      isExpanded={expandedPattern === pattern.id}
                      onToggle={() =>
                        setExpandedPattern(
                          expandedPattern === pattern.id ? null : pattern.id
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {filteredPatterns.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Puzzle className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Keine Patterns gefunden für &quot;{searchTerm}&quot;</p>
            </div>
          )}
        </div>
      )}

      {/* Quiz Mode */}
      {mode === "quiz" && (
        <div className="p-6">
          {!quizFinished ? (
            <QuizView
              question={quizQuestions[currentQuestion]}
              questionIndex={currentQuestion}
              totalQuestions={quizQuestions.length}
              selectedAnswer={selectedAnswer}
              showResult={showResult}
              score={score}
              onAnswer={handleAnswer}
              onNext={nextQuestion}
            />
          ) : (
            <QuizResult
              score={score}
              total={quizQuestions.length}
              onRestart={startQuiz}
              onExplore={() => setMode("explore")}
              quizLength={quizLength}
              onLengthChange={setQuizLength}
            />
          )}
        </div>
      )}
    </div>
  );
}

// ── Pattern Card ────────────────────────────────────────────────────────────

function PatternCard({
  pattern,
  isExpanded,
  onToggle,
}: {
  pattern: DesignPattern;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const meta = categoryMeta[pattern.category];
  const [activeTab, setActiveTab] = useState<"description" | "structure" | "code" | "usecase">("description");

  const tabs = [
    { id: "description" as const, label: "Beschreibung", icon: BookOpen },
    { id: "structure" as const, label: "Struktur", icon: Layers },
    { id: "code" as const, label: "Code", icon: Code2 },
    { id: "usecase" as const, label: "Anwendungsfall", icon: Lightbulb },
  ];

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isExpanded
          ? `${meta.border} ${meta.bg}`
          : "border-gray-700/50 bg-gray-800/50 hover:border-gray-600"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              pattern.category === "creational"
                ? "bg-emerald-400"
                : pattern.category === "structural"
                ? "bg-blue-400"
                : "bg-purple-400"
            }`}
          />
          <span className="font-semibold text-sm">{pattern.name}</span>
          <span className={`text-xs ${meta.color} opacity-70`}>{meta.label}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 animate-in fade-in duration-200">
          {/* Tabs */}
          <div className="flex gap-1 mb-4 bg-gray-800/80 rounded-lg p-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-[120px]">
            {activeTab === "description" && (
              <p className="text-gray-300 text-sm leading-relaxed">{pattern.description}</p>
            )}
            {activeTab === "structure" && (
              <p className="text-gray-300 text-sm leading-relaxed">{pattern.structure}</p>
            )}
            {activeTab === "code" && (
              <pre className="bg-gray-900 rounded-lg p-4 text-xs text-emerald-300 overflow-x-auto border border-gray-700/50">
                <code>{pattern.codeExample}</code>
              </pre>
            )}
            {activeTab === "usecase" && (
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">{pattern.useCase}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Quiz View ───────────────────────────────────────────────────────────────

function QuizView({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  showResult,
  score,
  onAnswer,
  onNext,
}: {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
}) {
  if (!question) return null;

  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Fortschritt */}
      <div className="flex items-center justify-between mb-2 text-xs text-gray-400">
        <span>Frage {questionIndex + 1} von {totalQuestions}</span>
        <span>Punkte: {score}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Frage */}
      <div className="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
        <p className="text-sm text-gray-400 mb-2">Welches Design Pattern beschreibt diese Beschreibung?</p>
        <p className="text-white leading-relaxed">&ldquo;{question.description}&rdquo;</p>
      </div>

      {/* Optionen */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let btnClass = "bg-gray-800 border-gray-700 hover:border-gray-500";
          if (showResult) {
            if (index === question.correctIndex) {
              btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
            } else if (index === selectedAnswer && index !== question.correctIndex) {
              btnClass = "bg-red-500/20 border-red-500 text-red-300";
            } else {
              btnClass = "bg-gray-800/50 border-gray-700/50 text-gray-500";
            }
          } else if (selectedAnswer === index) {
            btnClass = "bg-blue-500/20 border-blue-500";
          }

          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={showResult}
              className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3 ${btnClass}`}
            >
              <span className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-sm font-medium">{option}</span>
              {showResult && index === question.correctIndex && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto" />
              )}
              {showResult && index === selectedAnswer && index !== question.correctIndex && (
                <XCircle className="w-5 h-5 text-red-400 ml-auto" />
              )}
            </button>
          );
        })}
      </div>

      {/* Nächste Frage */}
      {showResult && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onNext}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            {questionIndex + 1 >= totalQuestions ? "Ergebnis anzeigen" : "Nächste Frage"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Quiz Result ─────────────────────────────────────────────────────────────

function QuizResult({
  score,
  total,
  onRestart,
  onExplore,
  quizLength,
  onLengthChange,
}: {
  score: number;
  total: number;
  onRestart: () => void;
  onExplore: () => void;
  quizLength: number;
  onLengthChange: (n: number) => void;
}) {
  const percentage = Math.round((score / total) * 100);

  let message = "";
  let color = "";
  if (percentage >= 90) {
    message = "Ausgezeichnet! Du beherrschst die Design Patterns!";
    color = "text-emerald-400";
  } else if (percentage >= 70) {
    message = "Gut gemacht! Du kennst die meisten Pattern.";
    color = "text-blue-400";
  } else if (percentage >= 50) {
    message = "Solide Grundlagen — ein paar Wiederholungen helfen.";
    color = "text-yellow-400";
  } else {
    message = "Übung macht den Meister — probiere es nochmal!";
    color = "text-red-400";
  }

  return (
    <div className="max-w-md mx-auto text-center py-8">
      <div className="text-6xl mb-4">
        {percentage >= 90 ? "🏆" : percentage >= 70 ? "⭐" : percentage >= 50 ? "📚" : "💪"}
      </div>
      <h3 className="text-2xl font-bold mb-2">
        {score} / {total} richtig
      </h3>
      <p className={`text-lg font-medium ${color} mb-6`}>{message}</p>

      {/* Prozentanzeige */}
      <div className="w-full bg-gray-700 rounded-full h-4 mb-8 overflow-hidden">
        <div
          className={`h-4 rounded-full transition-all duration-1000 ${
            percentage >= 70 ? "bg-emerald-500" : percentage >= 50 ? "bg-yellow-500" : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Längenwahl */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-sm text-gray-400">Fragen:</span>
        {[5, 10, 15, 20].map((n) => (
          <button
            key={n}
            onClick={() => onLengthChange(n)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              quizLength === n
                ? "bg-purple-600 text-white"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      {/* Aktionen */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={onRestart}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Nochmal spielen
        </button>
        <button
          onClick={onExplore}
          className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Pattern erkunden
        </button>
      </div>
    </div>
  );
}
