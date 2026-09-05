"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  CheckCircle,
  XCircle,
  Code,
  BookOpen,
  Trophy,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Lightbulb,
  Target,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react";

// @ts-ignore
import Prism from "prismjs";
import "prismjs/components/prism-python";

// ---------------------------------------------------------------------------
// Inline Prism theme (Tomorrow, same palette as CodeBlock.tsx)
// ---------------------------------------------------------------------------
const prismTheme = `
code[class*="language-"],
pre[class*="language-"] {
  color: #ccc;
  background: none;
  font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 0.85em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.55;
  tab-size: 4;
  hyphens: none;
}
pre[class*="language-"] {
  padding: 1em;
  margin: 0;
  overflow: auto;
  border-radius: 0.5em;
}
:not(pre) > code[class*="language-"],
pre[class*="language-"] { background: #1e293b; }
:not(pre) > code[class*="language-"] {
  padding: 0.1em 0.3em;
  border-radius: 0.3em;
  white-space: normal;
}
.token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata { color: #6a9955; }
.token.punctuation { color: #cccccc; }
.token.tag, .token.attr-name, .token.namespace, .token.deleted { color: #ce9178; }
.token.function-name { color: #6196cc; }
.token.boolean, .token.number, .token.function { color: #b5cea8; }
.token.property, .token.class-name, .token.constant, .token.symbol { color: #4ec9b0; }
.token.selector, .token.important, .token.atrule, .token.keyword, .token.builtin { color: #c586c0; }
.token.string, .token.char, .token.attr-value, .token.regex, .token.variable { color: #ce9178; }
.token.operator, .token.entity, .token.url { color: #569cd6; }
.token.important, .token.bold { font-weight: bold; }
.token.italic { font-style: italic; }
.token.entity { cursor: help; }
.token.inserted { color: green; }
`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface SOLIDPrinciple {
  id: "S" | "O" | "L" | "I" | "D";
  name: string;
  shortName: string;
  description: string;
  color: string;
  icon: string;
  badExample: string;
  goodExample: string;
  explanation: string;
}

interface QuizQuestion {
  id: number;
  code: string;
  violatedPrinciple: "S" | "O" | "L" | "I" | "D";
  hint: string;
  explanation: string;
}

// ---------------------------------------------------------------------------
// SOLID Principles Data
// ---------------------------------------------------------------------------
const principles: SOLIDPrinciple[] = [
  {
    id: "S",
    name: "Single Responsibility Principle",
    shortName: "Einzelverantwortung",
    description:
      "Eine Klasse sollte nur einen Grund haben, sich zu aendern. Jede Klasse hat genau EINE Aufgabe.",
    color: "#ef4444",
    icon: "S",
    badExample: `class UserManager:
    def __init__(self, db):
        self.db = db

    def create_user(self, name, email):
        user = {"name": name, "email": email}
        self.db.save(user)
        # E-Mail senden (nicht die Aufgabe des UserManagers!)
        send_email(email, "Willkommen!", "Hallo " + name)
        # Loggen (auch nicht seine Aufgabe!)
        with open("log.txt", "a") as f:
            f.write(f"User {name} erstellt\\n")
        return user`,
    goodExample: `class UserRepository:
    def __init__(self, db):
        self.db = db

    def create_user(self, name, email):
        user = {"name": name, "email": email}
        self.db.save(user)
        return user

class EmailService:
    def send_welcome(self, email, name):
        send_email(email, "Willkommen!", "Hallo " + name)

class Logger:
    def log(self, message):
        with open("log.txt", "a") as f:
            f.write(message + "\\n")`,
    explanation:
      "Der UserManager macht drei Dinge gleichzeitig: User speichern, E-Mails senden und loggen. Besser: Jede Klasse bekommt genau eine Aufgabe. So kann man z.B. den Logger austauschen, ohne den User-Code zu aendern.",
  },
  {
    id: "O",
    name: "Open/Closed Principle",
    shortName: "Offen/Geschlossen",
    description:
      "Klassen sollten offen fuer Erweiterung, aber geschlossen fuer Modifikation sein. Neue Funktionen durch neuen Code, nicht durch Aendern von altem.",
    color: "#f97316",
    icon: "O",
    badExample: `class AreaCalculator:
    def calculate(self, shape):
        if isinstance(shape, Circle):
            return 3.14159 * shape.radius ** 2
        elif isinstance(shape, Rectangle):
            return shape.width * shape.height
        elif isinstance(shape, Triangle):
            return 0.5 * shape.base * shape.height
        # Fuer jede neue Form muss diese Methode
        # geaendert werden!`,
    goodExample: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

# Neue Form hinzufuegen OHNE bestehenden Code zu aendern:
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self) -> float:
        return 0.5 * self.base * self.height`,
    explanation:
      "Beim schlechten Beispiel muss man bei jeder neuen Form die calculate-Methode aendern. Beim guten Beispiel implementiert jede Form ihre eigene area()-Methode. Neue Formen werden einfach hinzugefuegt, ohne bestehenden Code zu veraendern.",
  },
  {
    id: "L",
    name: "Liskov Substitution Principle",
    shortName: "Ersetzbarkeit",
    description:
      "Objekte einer Oberklasse muessen durch Objekte einer Unterklasse ersetzbar sein, ohne dass das Programm falsch funktioniert.",
    color: "#22c55e",
    icon: "L",
    badExample: `class Bird:
    def fly(self):
        return "Ich fliege!"

class Penguin(Bird):
    def fly(self):
        # Pinguine koennen nicht fliegen!
        # Verletzt die Erwartung an Bird.fly()
        raise Exception("Pinguine koennen nicht fliegen!")

def let_bird_fly(bird: Bird):
    # Erwartet, dass alle Voegel fliegen koennen
    print(bird.fly())  # Crashes bei Penguin!`,
    goodExample: `class Bird:
    def move(self):
        return "Ich bewege mich!"

class FlyingBird(Bird):
    def fly(self):
        return "Ich fliege!"

    def move(self):
        return self.fly()

class Penguin(Bird):
    def swim(self):
        return "Ich schwimme!"

    def move(self):
        return self.swim()

def let_bird_move(bird: Bird):
    # Funktioniert fuer ALLE Voegel
    print(bird.move())`,
    explanation:
      "Der Penguin erbt von Bird, kann aber nicht fliegen. Das Programm crasst, wenn man ihn wie einen normalen Bird behandelt. Besser: Eine allgemeine move()-Methode, die jedes Tier sinnvoll ueberschreibt.",
  },
  {
    id: "I",
    name: "Interface Segregation Principle",
    shortName: "Schnittstellen-Trennung",
    description:
      "Klassen sollten gezwungen werden, Methoden zu implementieren, die sie nicht benoetigen. Besser viele kleine Interfaces als ein grosses.",
    color: "#3b82f6",
    icon: "I",
    badExample: `from abc import ABC, abstractmethod

class Worker(ABC):
    @abstractmethod
    def work(self):
        pass

    @abstractmethod
    def eat(self):
        pass

    @abstractmethod
    def sleep(self):
        pass

class Robot(Worker):
    def work(self):
        return "Roboter arbeitet"

    def eat(self):
        # Roboter essen nicht!
        # Muss aber implementiert werden
        pass

    def sleep(self):
        # Roboter schlafen nicht!
        pass`,
    goodExample: `from abc import ABC, abstractmethod

class Workable(ABC):
    @abstractmethod
    def work(self):
        pass

class Eatable(ABC):
    @abstractmethod
    def eat(self):
        pass

class Sleepable(ABC):
    @abstractmethod
    def sleep(self):
        pass

class Human(Workable, Eatable, Sleepable):
    def work(self): return "Mensch arbeitet"
    def eat(self): return "Mensch isst"
    def sleep(self): return "Mensch schlaeft"

class Robot(Workable):
    # Robot implementiert NUR work()
    def work(self): return "Roboter arbeitet"`,
    explanation:
      "Das Worker-Interface erzwingt eat() und sleep() fuer alle Arbeiter, auch Roboter. Besser: Mehrere kleine Interfaces. Robot implementiert nur Workable, waehrend Human alle drei implementiert.",
  },
  {
    id: "D",
    name: "Dependency Inversion Principle",
    shortName: "Abhaengigkeitsumkehr",
    description:
      "Hohe Module sollten nicht von niedrigen Modulen abhaengen. Beide sollten von Abstraktionen abhaengen.",
    color: "#a855f7",
    icon: "D",
    badExample: `class MySQLDatabase:
    def save(self, data):
        print(f"Speichere in MySQL: {data}")

class UserService:
    def __init__(self):
        # Direkte Abhaengigkeit auf die konkrete Klasse!
        self.db = MySQLDatabase()

    def save_user(self, user):
        self.db.save(user)
        # Was, wenn wir zu PostgreSQL wechseln?
        # -> UserService muss geaendert werden!`,
    goodExample: `from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def save(self, data):
        pass

class MySQLDatabase(Database):
    def save(self, data):
        print(f"Speichere in MySQL: {data}")

class PostgreSQLDatabase(Database):
    def save(self, data):
        print(f"Speichere in PostgreSQL: {data}")

class UserService:
    def __init__(self, db: Database):
        # Abhaengigkeit auf die ABSTRAKTION,
        # nicht auf die konkrete Klasse
        self.db = db

    def save_user(self, user):
        self.db.save(user)

# Flexible Nutzung:
service = UserService(MySQLDatabase())
# oder: service = UserService(PostgreSQLDatabase())`,
    explanation:
      "UserService ist direkt von MySQLDatabase abhaengig. Bei einem Wechsel muss der Code geaendert werden. Besser: Eine abstrakte Database-Klasse, die UserService als Abhaengigkeit bekommt (Dependency Injection).",
  },
];

// ---------------------------------------------------------------------------
// Quiz Questions
// ---------------------------------------------------------------------------
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    code: `class ReportGenerator:
    def generate(self, data):
        report = self._format(data)
        self._send_email(report)
        self._save_to_file(report)
        self._log_action("Report generated")`,
    violatedPrinciple: "S",
    hint: "Diese Klasse macht zu viele verschiedene Dinge auf einmal.",
    explanation:
      "Der ReportGenerator hat vier Aufgaben: formatieren, E-Mail senden, speichern und loggen. Das verletzt das Single Responsibility Principle.",
  },
  {
    id: 2,
    code: `class NotificationService:
    def send(self, message, type):
        if type == "email":
            # 20 Zeilen E-Mail-Logik
            pass
        elif type == "sms":
            # 20 Zeilen SMS-Logik
            pass
        elif type == "push":
            # 20 Zeilen Push-Logik
            pass
        # Neuer Typ? -> Methode aendern!`,
    violatedPrinciple: "O",
    hint: "Was passiert, wenn ein neuer Benachrichtigungstyp hinzugefuegt werden soll?",
    explanation:
      "Fuer jeden neuen Benachrichtigungstyp muss die send()-Methode geaendert werden. Das verletzt das Open/Closed Principle. Besser: Strategie-Muster mit abstrakter Benachrichtigungsklasse.",
  },
  {
    id: 3,
    code: `class Vehicle:
    def start_engine(self):
        return "Motor gestartet"

class Bicycle(Vehicle):
    def start_engine(self):
        # Fahrraeder haben keinen Motor!
        raise NotImplementedError()`,
    violatedPrinciple: "L",
    hint: "Kann jedes Vehicle wirklich start_engine() ausfuehren?",
    explanation:
      "Bicycle erbt von Vehicle, hat aber keinen Motor. Code, der Vehicle erwartet, crasst bei Bicycle. Das verletzt das Liskov Substitution Principle.",
  },
  {
    id: 4,
    code: `class SmartDevice(ABC):
    @abstractmethod
    def connect_wifi(self): pass
    @abstractmethod
    def browse_web(self): pass
    @abstractmethod
    def make_call(self): pass
    @abstractmethod
    def take_photo(self): pass

class SmartFridge(SmartDevice):
    def connect_wifi(self): ...
    def browse_web(self): ...
    def make_call(self): raise Exception()
    def take_photo(self): raise Exception()`,
    violatedPrinciple: "I",
    hint: "Muss ein Kuehlschrank wirklich telefonieren koennen?",
    explanation:
      "SmartDevice erzwingt make_call() und take_photo() fuer alle Geraete, auch fuer einen Kuehlschrank. Das verletzt das Interface Segregation Principle. Besser: Mehrere kleine Interfaces.",
  },
  {
    id: 5,
    code: `class OrderService:
    def __init__(self):
        self.db = MySQLDatabase()
        self.mailer = GmailSender()
        self.logger = FileLogger()

    def place_order(self, order):
        self.db.save(order)
        self.mailer.send_confirmation(order)
        self.logger.log("Order placed")`,
    violatedPrinciple: "D",
    hint: "Was passiert, wenn wir die Datenbank oder den E-Mail-Dienst wechseln wollen?",
    explanation:
      "OrderService ist direkt von konkreten Klassen abhaengig (MySQL, Gmail, FileLogger). Das verletzt das Dependency Inversion Principle. Besser: Abstrakte Interfaces per Konstruktor uebergeben.",
  },
  {
    id: 6,
    code: `class Employee:
    def __init__(self, name):
        self.name = name

    def calculate_salary(self): ...
    def save_to_database(self): ...
    def generate_payslip(self): ...
    def send_payslip_email(self): ...
    def update_tax_records(self): ...`,
    violatedPrinciple: "S",
    hint: "Wie viele Gruende hat diese Klasse, sich zu aendern?",
    explanation:
      "Employee kuemmert sich um Gehaltsberechnung, Datenbank, Gehaltsabrechnung, E-Mail und Steuern. Fuenf verschiedene Gruende zur Aenderung verletzen das Single Responsibility Principle.",
  },
  {
    id: 7,
    code: `class DiscountCalculator:
    def calculate(self, customer_type, amount):
        if customer_type == "regular":
            return amount * 0.05
        elif customer_type == "premium":
            return amount * 0.10
        elif customer_type == "vip":
            return amount * 0.20
        # Neuer Kundentyp? -> If-Kette erweitern!`,
    violatedPrinciple: "O",
    hint: "Jeder neue Kundentyp erfordert eine Aenderung dieser Funktion.",
    explanation:
      "Die calculate-Methode muss bei jedem neuen Kundentyp geaendert werden. Besser: Jeder Kundentyp implementiert seine eigene Discount-Strategie.",
  },
  {
    id: 8,
    code: `class FileHandler:
    def read(self, path): ...
    def write(self, path, data): ...
    def compress(self, path): ...
    def encrypt(self, path): ...
    def upload_to_cloud(self, path): ...
    def generate_thumbnail(self, path): ...`,
    violatedPrinciple: "S",
    hint: "Ist das wirklich nur ein FileHandler?",
    explanation:
      "FileHandler ist ein God-Object mit sechs verschiedenen Aufgaben. Lesen/Schreiben, Komprimierung, Verschluesselung, Cloud-Upload und Thumbnail-Generierung sollten separate Klassen sein.",
  },
  {
    id: 9,
    code: `class Printer(ABC):
    @abstractmethod
    def print_doc(self, doc): pass
    @abstractmethod
    def scan(self): pass
    @abstractmethod
    def fax(self, number): pass

class SimplePrinter(Printer):
    def print_doc(self, doc): print(doc)
    def scan(self): raise NotImplementedError()
    def fax(self, number): raise NotImplementedError()`,
    violatedPrinciple: "I",
    hint: "Ein einfacher Drucker muss nicht scannen oder faxen.",
    explanation:
      "SimplePrinter wird gezwungen, scan() und fax() zu implementieren, obwohl er diese Funktionen nicht hat. Das verletzt das Interface Segregation Principle.",
  },
  {
    id: 10,
    code: `class EmailService:
    def __init__(self):
        self.smtp = SmtpClient("smtp.gmail.com")

    def send(self, to, subject, body):
        self.smtp.connect()
        self.smtp.authenticate("user", "pass")
        self.smtp.send(to, subject, body)
        # Was wenn wir zu AWS SES wechseln?`,
    violatedPrinciple: "D",
    hint: "Diese Klasse kennt alle Details des konkreten E-Mail-Versands.",
    explanation:
      "EmailService haengt direkt von SmtpClient ab und kennt alle Details. Besser: Ein abstraktes Mailer-Interface, das per Dependency Injection uebergeben wird.",
  },
];

// ---------------------------------------------------------------------------
// Code Display Component with Prism
// ---------------------------------------------------------------------------
function CodeDisplay({ code, highlight }: { code: string; highlight?: boolean }) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!document.getElementById("prism-solid-theme")) {
      const style = document.createElement("style");
      style.id = "prism-solid-theme";
      style.textContent = prismTheme;
      document.head.appendChild(style);
    }
    if (codeRef.current) {
      codeRef.current.textContent = code;
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className="rounded-lg overflow-hidden border border-slate-700">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-slate-400 font-mono">Python</span>
        {highlight && (
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
            Verstoss
          </span>
        )}
      </div>
      <pre className="!m-0 !bg-slate-900 !p-3 sm:!p-4 overflow-x-auto text-sm">
        <code ref={codeRef} className="language-python">
          {code}
        </code>
      </pre>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Principle Card
// ---------------------------------------------------------------------------
function PrincipleCard({
  principle,
  isExpanded,
  onToggle,
}: {
  principle: SOLIDPrinciple;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl border transition-all duration-300 overflow-hidden"
      style={{
        borderColor: isExpanded ? principle.color : "rgb(51 65 85)",
        backgroundColor: isExpanded ? `${principle.color}08` : "rgb(30 41 59)",
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold text-white shrink-0"
          style={{ backgroundColor: principle.color }}
        >
          {principle.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-sm sm:text-base">{principle.name}</h3>
          <p className="text-xs sm:text-sm text-slate-400">{principle.shortName}</p>
        </div>
        <ChevronRight
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-3 sm:px-4 pb-4 space-y-4 animate-fadeIn">
          <p className="text-sm text-slate-300 leading-relaxed">
            {principle.description}
          </p>

          {/* Bad Example */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-400">
                Verletzt das Prinzip
              </span>
            </div>
            <CodeDisplay code={principle.badExample} highlight />
          </div>

          {/* Good Example */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">
                Befolgt das Prinzip
              </span>
            </div>
            <CodeDisplay code={principle.goodExample} />
          </div>

          {/* Explanation */}
          <div className="bg-slate-800/80 rounded-lg p-3 sm:p-4 border border-slate-700">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-300 leading-relaxed">
                {principle.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quiz View
// ---------------------------------------------------------------------------
function QuizView({
  onFinish,
}: {
  onFinish: (score: number, total: number) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<"S" | "O" | "L" | "I" | "D" | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    { questionId: number; correct: boolean; chosen: string; answer: string }[]
  >([]);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[currentIdx];
  const totalQuestions = quizQuestions.length;

  const principleOptions: { key: "S" | "O" | "L" | "I" | "D"; label: string; color: string }[] = [
    { key: "S", label: "S — Single Responsibility", color: "#ef4444" },
    { key: "O", label: "O — Open/Closed", color: "#f97316" },
    { key: "L", label: "L — Liskov Substitution", color: "#22c55e" },
    { key: "I", label: "I — Interface Segregation", color: "#3b82f6" },
    { key: "D", label: "D — Dependency Inversion", color: "#a855f7" },
  ];

  const handleAnswer = useCallback(
    (choice: "S" | "O" | "L" | "I" | "D") => {
      if (showResult) return;
      setSelected(choice);
      setShowResult(true);
      const isCorrect = choice === question.violatedPrinciple;
      if (isCorrect) setScore((s) => s + 1);
      setAnswers((prev) => [
        ...prev,
        {
          questionId: question.id,
          correct: isCorrect,
          chosen: choice,
          answer: question.violatedPrinciple,
        },
      ]);
    },
    [question, showResult]
  );

  const nextQuestion = () => {
    if (currentIdx + 1 >= totalQuestions) {
      setFinished(true);
      onFinish(score + (selected === question.violatedPrinciple ? 1 : 0), totalQuestions);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
    }
  };

  if (finished) {
    const finalScore = score;
    const pct = Math.round((finalScore / totalQuestions) * 100);
    return (
      <div className="space-y-6">
        {/* Result Header */}
        <div className="text-center py-6 sm:py-8">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                pct >= 80
                  ? "linear-gradient(135deg, #22c55e, #16a34a)"
                  : pct >= 50
                  ? "linear-gradient(135deg, #f97316, #ea580c)"
                  : "linear-gradient(135deg, #ef4444, #dc2626)",
            }}
          >
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            {pct >= 80
              ? "Ausgezeichnet!"
              : pct >= 50
              ? "Gut gemacht!"
              : "Uebung macht den Meister!"}
          </h3>
          <p className="text-lg sm:text-xl text-slate-300">
            <span className="font-bold text-white">{finalScore}</span> von{" "}
            <span className="font-bold text-white">{totalQuestions}</span> richtig
          </p>
          <div className="mt-3 w-full max-w-xs mx-auto bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${pct}%`,
                background:
                  pct >= 80
                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                    : pct >= 50
                    ? "linear-gradient(90deg, #f97316, #ea580c)"
                    : "linear-gradient(90deg, #ef4444, #dc2626)",
              }}
            />
          </div>
        </div>

        {/* Answer Review */}
        <div className="space-y-2">
          <h4 className="font-medium text-white text-sm">Deine Antworten:</h4>
          {answers.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-2 sm:gap-3 text-sm p-2 rounded-lg"
              style={{
                backgroundColor: a.correct
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
              }}
            >
              {a.correct ? (
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span className="text-slate-300">
                Frage {i + 1}:{" "}
                <span className="text-white font-medium">{a.chosen}</span>
                {!a.correct && (
                  <span className="text-slate-400">
                    {" "}
                    (richtig: {a.answer})
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Frage {currentIdx + 1} von {totalQuestions}
        </span>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-medium text-white">
            {score} / {answers.length} richtig
          </span>
        </div>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${((currentIdx + (showResult ? 1 : 0)) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-slate-800 rounded-xl p-4 sm:p-5 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Code className="w-5 h-5 text-amber-400" />
          <h4 className="font-medium text-white">
            Welches SOLID-Prinzip wird hier verletzt?
          </h4>
        </div>
        <CodeDisplay code={question.code} highlight />

        {/* Hint */}
        {!showResult && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="mt-3 flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? "Hinweis ausblenden" : "Hinweis anzeigen"}
          </button>
        )}
        {showHint && !showResult && (
          <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-300">{question.hint}</p>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3">
        {principleOptions.map((opt) => {
          const isCorrect = opt.key === question.violatedPrinciple;
          const isSelected = selected === opt.key;
          const showCorrectHighlight = showResult && isCorrect;
          const showWrongHighlight = showResult && isSelected && !isCorrect;

          return (
            <button
              key={opt.key}
              onClick={() => handleAnswer(opt.key)}
              disabled={showResult}
              className="relative flex items-center gap-2 sm:gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left disabled:cursor-default"
              style={{
                borderColor: showCorrectHighlight
                  ? "#22c55e"
                  : showWrongHighlight
                  ? "#ef4444"
                  : isSelected
                  ? opt.color
                  : "rgb(51 65 85)",
                backgroundColor: showCorrectHighlight
                  ? "rgba(34, 197, 94, 0.15)"
                  : showWrongHighlight
                  ? "rgba(239, 68, 68, 0.15)"
                  : isSelected
                  ? `${opt.color}15`
                  : "rgb(30 41 59)",
              }}
            >
              <div
                className="w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ backgroundColor: opt.color }}
              >
                {opt.key}
              </div>
              <span className="text-xs sm:text-sm text-slate-300 font-medium leading-tight">
                {opt.label.split(" — ")[1]}
              </span>
              {showCorrectHighlight && (
                <CheckCircle className="w-5 h-5 text-green-400 ml-auto shrink-0" />
              )}
              {showWrongHighlight && (
                <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation after answer */}
      {showResult && (
        <div
          className="p-4 rounded-xl border space-y-3 animate-fadeIn"
          style={{
            borderColor:
              selected === question.violatedPrinciple
                ? "rgba(34, 197, 94, 0.3)"
                : "rgba(239, 68, 68, 0.3)",
            backgroundColor:
              selected === question.violatedPrinciple
                ? "rgba(34, 197, 94, 0.05)"
                : "rgba(239, 68, 68, 0.05)",
          }}
        >
          <div className="flex items-center gap-2">
            {selected === question.violatedPrinciple ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium text-green-400">
                  Richtig! Das{" "}
                  {principles.find((p) => p.id === question.violatedPrinciple)
                    ?.shortName ?? ""}-Prinzip{" "}
                  ({question.violatedPrinciple}) wurde verletzt.
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="font-medium text-red-400">
                  Nicht ganz. Richtige Antwort:{" "}
                  <span className="text-white">
                    {question.violatedPrinciple} —{" "}
                    {principles.find((p) => p.id === question.violatedPrinciple)
                      ?.shortName}
                  </span>
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {question.explanation}
          </p>
          <button
            onClick={nextQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {currentIdx + 1 >= totalQuestions ? (
              <>
                <Trophy className="w-4 h-4" />
                Ergebnis anzeigen
              </>
            ) : (
              <>
                Naechste Frage
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export function SOLIDChecker() {
  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [expandedPrinciple, setExpandedPrinciple] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const togglePrinciple = (id: string) => {
    setExpandedPrinciple((prev) => (prev === id ? null : id));
  };

  const handleQuizFinish = (score: number, total: number) => {
    setQuizScore(score);
    setQuizTotal(total);
  };

  const resetQuiz = () => {
    setQuizScore(null);
    setQuizTotal(0);
    setQuizKey((k) => k + 1);
  };

  return (
    <div
      className={`bg-gray-900 rounded-xl border border-slate-700 overflow-hidden transition-all duration-500 ${
        animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 p-4 sm:p-6 border-b border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              SOLID-Prinzipien Checker
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Lerne und teste dein Wissen ueber die fuenf SOLID-Prinzipien der
              objektorientierten Programmierung
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-slate-700 rounded-lg p-1 shrink-0">
            <button
              onClick={() => setMode("learn")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                mode === "learn"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Lernen
            </button>
            <button
              onClick={() => setMode("quiz")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                mode === "quiz"
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Zap className="w-4 h-4" />
              Quiz
            </button>
          </div>
        </div>

        {/* SOLID overview badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          {principles.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
              style={{
                borderColor: `${p.color}40`,
                backgroundColor: `${p.color}15`,
                color: p.color,
              }}
            >
              <span className="font-bold">{p.id}</span>
              <span className="hidden sm:inline">{p.shortName}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {mode === "learn" ? (
          <div className="space-y-3">
            {principles.map((principle) => (
              <PrincipleCard
                key={principle.id}
                principle={principle}
                isExpanded={expandedPrinciple === principle.id}
                onToggle={() => togglePrinciple(principle.id)}
              />
            ))}

            {/* Tip */}
            <div className="mt-4 p-3 sm:p-4 bg-slate-800/50 rounded-lg border border-slate-700 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm text-slate-300">
                  <span className="font-medium text-white">Tipp:</span>{" "}
                  Klicke auf ein Prinzip, um Beispiele und Erklaerungen zu
                  sehen. Wechsle dann zum{" "}
                  <span className="text-amber-400 font-medium">Quiz</span>, um
                  dein Wissen zu testen!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {quizScore !== null ? (
              <div className="space-y-4">
                {/* Quick score display at top */}
                <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-sm text-slate-300">
                      Letztes Ergebnis:
                    </span>
                    <span className="font-bold text-white">
                      {quizScore}/{quizTotal}
                    </span>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Nochmal
                  </button>
                </div>
                <QuizView key={quizKey} onFinish={handleQuizFinish} />
              </div>
            ) : (
              <QuizView key={quizKey} onFinish={handleQuizFinish} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
