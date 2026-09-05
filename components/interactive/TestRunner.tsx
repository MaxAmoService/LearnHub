"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Play,
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
  FlaskConical,
  Bug,
  Shield,
  Layers,
  Pencil,
  Eye,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Inline Prism theme (Tomorrow palette, same as SOLIDChecker / CodeSandbox)
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
type Tab = "playground" | "aaa" | "quiz" | "examples";

interface TestPreset {
  id: string;
  title: string;
  description: string;
  category: "function" | "edge" | "mock";
  code: string;
}

interface AAAStep {
  phase: "Arrange" | "Act" | "Assert";
  title: string;
  description: string;
  code: string;
  color: string;
  icon: typeof Layers;
}

interface TestCase {
  id: string;
  line: string;
  passed: boolean | null;
  output: string;
}

interface QuizQuestion {
  id: number;
  title: string;
  code: string;
  bugDescription: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// ---------------------------------------------------------------------------
// Preset test examples
// ---------------------------------------------------------------------------
const testPresets: TestPreset[] = [
  {
    id: "func-basic",
    title: "Funktion testen",
    description: "Einzelne Funktion mit verschiedenen Eingaben testen",
    category: "function",
    code: `# Funktion, die wir testen wollen
def addiere(a, b):
    return a + b

# Test: Normale Eingaben
def test_addiere_normale_werte():
    ergebnis = addiere(2, 3)
    assert ergebnis == 5, f"Erwartet 5, bekommen {ergebnis}"

# Test: Negative Zahlen
def test_addiere_negative_zahlen():
    ergebnis = addiere(-1, -3)
    assert ergebnis == -4, f"Erwartet -4, bekommen {ergebnis}"

# Test: Null-Wert
def test_addiere_mit_null():
    ergebnis = addiere(0, 5)
    assert ergebnis == 5, f"Erwartet 5, bekommen {ergebnis}"`,
  },
  {
    id: "func-string",
    title: "String-Funktion testen",
    description: "String-Operationen und Rückgabewerte pruefen",
    category: "function",
    code: `# Funktion: Text umkehren
def umkehren(text):
    return text[::-1]

# Test: Einfacher String
def test_umkehren_einfach():
    assert umkehren("Hallo") == "ollaH"

# Test: Palindrom
def test_umkehren_palindrom():
    assert umkehren("ABBA") == "ABBA"

# Test: Leerstring
def test_umkehren_leer():
    assert umkehren("") == ""

# Test: Einzelnes Zeichen
def test_umkehren_einzel():
    assert umkehren("X") == "X"`,
  },
  {
    id: "edge-boundary",
    title: "Grenzfälle testen",
    description: "Min/Max-Werte, leere Eingaben, Ueberlaeufe",
    category: "edge",
    code: `# Funktion: Altersgruppe bestimmen
def altersgruppe(alter):
    if alter < 0:
        raise ValueError("Alter kann nicht negativ sein")
    if alter < 18:
        return "minderjaehrig"
    if alter < 65:
        return "erwachsen"
    return "senior"

# Test: Grenzwert 18
def test_grenze_18():
    assert altersgruppe(18) == "erwachsen"
    assert altersgruppe(17) == "minderjaehrig"

# Test: Grenzwert 65
def test_grenze_65():
    assert altersgruppe(65) == "senior"
    assert altersgruppe(64) == "erwachsen"

# Test: Negatives Alter -> Fehler erwartet
def test_negatives_alter():
    try:
        altersgruppe(-1)
        assert False, "Sollte ValueError werfen"
    except ValueError:
        pass  # Erwartetes Verhalten

# Test: Null
def test_alter_null():
    assert altersgruppe(0) == "minderjaehrig"`,
  },
  {
    id: "edge-exception",
    title: "Ausnahmen testen",
    description: "Fehlerverhalten und Exception-Handling pruefen",
    category: "edge",
    code: `# Funktion: Division mit Null-Check
def sichere_division(a, b):
    if b == 0:
        raise ZeroDivisionError("Division durch Null!")
    return a / b

# Test: Normale Division
def test_division_normal():
    assert sichere_division(10, 2) == 5.0

# Test: Division durch Null erwartet Fehler
def test_division_durch_null():
    try:
        sichere_division(10, 0)
        assert False, "Sollte ZeroDivisionError werfen"
    except ZeroDivisionError as e:
        assert "Division durch Null" in str(e)

# Test: Negative Division
def test_division_negativ():
    assert sichere_division(-10, 2) == -5.0`,
  },
  {
    id: "mock-db",
    title: "Mit Mock-Objekt testen",
    description: "Abhaengigkeiten durch Mocks ersetzen",
    category: "mock",
    code: `# Zu testende Funktion (nutzt Datenbank)
def benutzer_anzeigen(user_id, datenbank):
    benutzer = datenbank.finde_benutzer(user_id)
    if benutzer is None:
        return "Nicht gefunden"
    return f"Name: {benutzer['name']}"

# Mock-Datenbank (simuliert echte DB)
class MockDatenbank:
    def __init__(self):
        self.daten = {1: {"name": "Max"}, 2: {"name": "Erika"}}

    def finde_benutzer(self, user_id):
        return self.daten.get(user_id)

# Test: Benutzer existiert
def test_benutzer_gefunden():
    mock_db = MockDatenbank()
    ergebnis = benutzer_anzeigen(1, mock_db)
    assert ergebnis == "Name: Max"

# Test: Benutzer nicht gefunden
def test_benutzer_nicht_gefunden():
    mock_db = MockDatenbank()
    ergebnis = benutzer_anzeigen(99, mock_db)
    assert ergebnis == "Nicht gefunden"`,
  },
  {
    id: "mock-api",
    title: "API-Aufruf mocken",
    description: "Externe API-Aufrufe durch Mocks simulieren",
    category: "mock",
    code: `# Zu testende Funktion (nutzt API)
def wetter_beschreibung(api_client, stadt):
    daten = api_client.hole_wetter(stadt)
    if daten["temp"] > 25:
        return f"Heiss in {stadt}: {daten['temp']}°C"
    elif daten["temp"] < 5:
        return f"Kalt in {stadt}: {daten['temp']}°C"
    return f"Angenehm in {stadt}: {daten['temp']}°C"

# Mock API-Client
class MockWetterAPI:
    def __init__(self, temp):
        self.temp = temp

    def hole_wetter(self, stadt):
        return {"stadt": stadt, "temp": self.temp}

# Test: Heisser Tag
def test_wetter_heiss():
    mock = MockWetterAPI(30)
    assert "Heiss" in wetter_beschreibung(mock, "Berlin")

# Test: Kalter Tag
def test_wetter_kalt():
    mock = MockWetterAPI(2)
    assert "Kalt" in wetter_beschreibung(mock, "Berlin")

# Test: Angenehm
def test_wetter_angenehm():
    mock = MockWetterAPI(15)
    assert "Angenehm" in wetter_beschreibung(mock, "Berlin")`,
  },
];

// ---------------------------------------------------------------------------
// AAA Pattern data
// ---------------------------------------------------------------------------
const aaaSteps: AAAStep[] = [
  {
    phase: "Arrange",
    title: "Vorbereiten",
    description:
      "Richte die Testumgebung ein. Erstelle alle noetigen Objekte, Variablen und Abhaengigkeiten. Das ist die SETUP-Phase.",
    code: `# Arrange: Testdaten vorbereiten
rechner = Taschenrechner()
eingabe_a = 10
eingabe_b = 5`,
    color: "text-blue-400",
    icon: Layers,
  },
  {
    phase: "Act",
    title: "Ausfuehren",
    description:
      "Fuehre die zu testende Aktion aus. Rufe die Funktion oder Methode auf, die getestet werden soll. Nur EINER Aktion pro Test!",
    code: `# Act: Funktion aufrufen
ergebnis = rechner.addiere(eingabe_a, eingabe_b)`,
    color: "text-amber-400",
    icon: Play,
  },
  {
    phase: "Assert",
    title: "Ueberpruefen",
    description:
      "Vergleiche das tatsaechliche Ergebnis mit dem erwarteten Ergebnis. Hier entscheidet sich, ob der Test besteht oder fehlschlaegt.",
    code: `# Assert: Ergebnis pruefen
assert ergebnis == 15, f"Erwartet 15, bekommen {ergebnis}"`,
    color: "text-emerald-400",
    icon: CheckCircle,
  },
];

// ---------------------------------------------------------------------------
// Quiz questions — find the bug in test code
// ---------------------------------------------------------------------------
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "Fehlender Assert",
    code: `def test_addiere():
    ergebnis = addiere(2, 3)
    print(f"Ergebnis: {ergebnis}")
    # Test ist immer erfolgreich!`,
    bugDescription: "Dieser Test faellt nie fehl — warum?",
    options: [
      "print() prueft das Ergebnis automatisch",
      "Es fehlt eine assert-Anweisung zur Ueberpruefung",
      "addiere() kann nie falsch sein",
      "print() wirft bei Fehlern eine Exception",
    ],
    correctIndex: 1,
    explanation:
      "Ohne assert gibt es keine Ueberpruefung! print() zeigt nur den Wert an, prueft aber nicht, ob er korrekt ist. Ein Test ohne assert ist kein Test — es ist nur eine Ausgabe.",
  },
  {
    id: 2,
    title: "Zu viele Assertions",
    code: `def test_benutzer():
    name = "Max"
    alter = 25
    email = "max@test.de"
    assert name == "Max"
    assert alter == 25
    assert email == "max@test.de"
    assert len(name) > 0
    assert alter > 0
    assert "@" in email`,
    bugDescription: "Was ist das Problem mit diesem Test?",
    options: [
      "Die Assertions sind syntaktisch falsch",
      "Der Test ist zu langsam",
      "Ein Test sollte nur EINE Sache pruefen (Single Responsibility)",
      "assert ist nicht erlaubt in Python",
    ],
    correctIndex: 2,
    explanation:
      "Dieser Test prueft zu viele Dinge gleichzeitig. Wenn er fehlschlaegt, weiss man nicht genau, was falsch ist. Besser: Separate Tests fuer name, alter und email. Jeder Test prueft genau EINE Aussage.",
  },
  {
    id: 3,
    title: "Test-Reihenfolge-Problem",
    code: `counter = 0

def test_erhoehen():
    global counter
    counter += 1
    assert counter == 1

def test_verdoppeln():
    global counter
    counter *= 2
    assert counter == 2`,
    bugDescription: "Wann schlaegt dieser Test fehl?",
    options: [
      "Nie, die Tests sind korrekt",
      "Wenn test_verdoppeln vor test_erhoehen laeuft",
      "counter ist keine gueltige Variable",
      "global ist in Test-Funktionen verboten",
    ],
    correctIndex: 1,
    explanation:
      "Tests duerfen nicht von der Ausfuehrungsreihenfolge abhaengen! Wenn test_verdoppeln zuerst laeuft, ist counter==0 und 0*2==0, nicht 2. Jeder Test muss unabhaengig laufen koennen. Nutze lokale Variablen oder Fixtures statt globalen Zustand.",
  },
  {
    id: 4,
    title: "Magische Zahl",
    code: `def test_berechne_mwst():
    preis = 100
    mwst = berechne_mwst(preis)
    assert mwst == 19`,
    bugDescription: "Was ist an diesem Test fragwuerdig?",
    options: [
      "19 ist kein gueltiger Wert",
      "berechne_mwst() existiert nicht",
      "Die 19 ist nicht erklaert — was passiert bei anderem Steuersatz?",
      "preis sollte negativ sein",
    ],
    correctIndex: 2,
    explanation:
      "Die Zahl 19 ist eine 'magische Zahl' — unklar, woher sie kommt. Besser: STEUERSATZ = 0.19 definieren und mwst == preis * STEUERSATZ pruefen. So wird der Test lesbar und aenderbar.",
  },
  {
    id: 5,
    title: "Exception verschlucken",
    code: `def test_fehler():
    try:
        ergebnis = 10 / 0
    except:
        pass`,
    bugDescription: "Warum ist dieser Test gefaehrlich?",
    options: [
      "10 / 0 ist kein gueltiger Python-Code",
      "try/except ist in Tests nicht erlaubt",
      "Der Test faellt nie fehl — auch wenn der Code kaputt ist",
      "pass beendet den Test vorzeitig",
    ],
    correctIndex: 2,
    explanation:
      "Ein leerer except: pass faengt ALLE Fehler ab und ignoriert sie. Der Test ist IMMER erfolgreich, egal was passiert. Besser: except ZeroDivisionError: pruefen oder mit pytest.raises() arbeiten.",
  },
  {
    id: 6,
    title: "Gemeinsamer Zustand",
    code: `liste = []

def test_hinzufuegen():
    liste.append(42)
    assert len(liste) == 1

def test_leere_liste():
    assert len(liste) == 0`,
    bugDescription: "Warum schlaegt der zweite Test fehl?",
    options: [
      "listen.append() ist keine gueltige Funktion",
      "len() funktioniert nicht mit Listen",
      "Die Tests teilen sich die Variable 'liste' — test_hinzufuegen faellt zuerst an",
      "assert kann nur Zahlen pruefen",
    ],
    correctIndex: 2,
    explanation:
      "Die globale Variable 'liste' wird zwischen den Tests geteilt. Nach test_hinzufuegen hat die Liste ein Element. test_leere_liste faellt dann fehl, weil die Liste nicht leer ist. Jeder Test braucht eigene, frische Testdaten!",
  },
];

// ---------------------------------------------------------------------------
// Syntax highlight helper (simple keyword-based, no external dependency)
// ---------------------------------------------------------------------------
function highlightPython(code: string): string {
  // Escape HTML
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments first (line comments)
  html = html.replace(/(#.*?)$/gm, '<span style="color:#6a9955">$1</span>');

  // Strings (single and double quoted, including triple)
  html = html.replace(
    /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g,
    '<span style="color:#ce9178">$1</span>'
  );

  // Keywords
  const keywords =
    /\b(def|class|return|if|elif|else|for|while|try|except|raise|import|from|as|with|pass|assert|global|True|False|None|and|or|not|in|is|lambda|yield|async|await)\b/g;
  html = html.replace(keywords, '<span style="color:#c586c0">$1</span>');

  // Built-in functions
  const builtins = /\b(print|len|range|int|str|float|list|dict|set|type|isinstance|super|abs|min|max|sum|round)\b/g;
  html = html.replace(builtins, '<span style="color:#dcdcaa">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span style="color:#b5cea8">$1</span>');

  // Function/class names after def/class
  html = html.replace(
    /\b(def|class)\s+(\w+)/g,
    '<span style="color:#c586c0">$1</span> <span style="color:#dcdcaa">$2</span>'
  );

  // self/cls
  html = html.replace(/\b(self|cls)\b/g, '<span style="color:#569cd6">$1</span>');

  return html;
}

// ---------------------------------------------------------------------------
// Test engine (simulated — evaluates assert-like lines)
// ---------------------------------------------------------------------------
function runTests(code: string): TestCase[] {
  const lines = code.split("\n");
  const results: TestCase[] = [];
  let currentTestName = "";
  let inFunction = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Detect test function definition
    const funcMatch = trimmed.match(/^def\s+(test_\w+)\s*\(/);
    if (funcMatch) {
      currentTestName = funcMatch[1];
      inFunction = true;
      continue;
    }

    if (!inFunction) continue;

    // Detect assert statements
    const assertMatch = trimmed.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);
    if (assertMatch) {
      const expr = assertMatch[1];
      const msg = assertMatch[2]?.replace(/['"]/g, "") || "";

      // Simple evaluation of common patterns
      const passed = evaluateAssert(expr, code);
      results.push({
        id: `${currentTestName}-${i}`,
        line: trimmed,
        passed,
        output: passed
          ? `  ${currentTestName}: BESTANDEN`
          : `  ${currentTestName}: FEHLGESCHLAGEN${msg ? " — " + msg : ""}`,
      });
    }

    // Detect function boundary (next def or end of indentation)
    if (i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      if (nextLine.trim() && !nextLine.startsWith(" ") && !nextLine.startsWith("\t")) {
        inFunction = false;
      }
    }
  }

  return results;
}

function evaluateAssert(expr: string, fullCode: string): boolean {
  // Handle comparison expressions
  const compMatch = expr.match(/^(.+?)\s*(==|!=|<|>|<=|>=)\s*(.+)$/);
  if (compMatch) {
    const left = safeEval(compMatch[1].trim(), fullCode);
    const op = compMatch[2];
    const right = safeEval(compMatch[3].trim(), fullCode);

    if (left === null || right === null) return false;

    switch (op) {
      case "==":
        return left === right;
      case "!=":
        return left !== right;
      case "<":
        return left < right;
      case ">":
        return left > right;
      case "<=":
        return left <= right;
      case ">=":
        return left >= right;
    }
  }

  // Handle "in" expressions
  const inMatch = expr.match(/^(.+?)\s+in\s+(.+)$/);
  if (inMatch) {
    const needle = safeEval(inMatch[1].trim(), fullCode);
    const haystack = safeEval(inMatch[2].trim(), fullCode);
    if (needle !== null && haystack !== null && typeof haystack === "string") {
      return haystack.includes(needle as string);
    }
  }

  // Handle "not in"
  const notInMatch = expr.match(/^(.+?)\s+not\s+in\s+(.+)$/);
  if (notInMatch) {
    const needle = safeEval(notInMatch[1].trim(), fullCode);
    const haystack = safeEval(notInMatch[2].trim(), fullCode);
    if (needle !== null && haystack !== null && typeof haystack === "string") {
      return !haystack.includes(needle as string);
    }
  }

  // Handle boolean expressions
  if (expr === "True") return true;
  if (expr === "False") return false;
  if (expr.startsWith("not ")) {
    const inner = safeEval(expr.slice(4).trim(), fullCode);
    return !inner;
  }

  return false;
}

function safeEval(expr: string, _fullCode: string): string | number | boolean | null {
  try {
    // String literals
    if (
      (expr.startsWith('"') && expr.endsWith('"')) ||
      (expr.startsWith("'") && expr.endsWith("'"))
    ) {
      return expr.slice(1, -1);
    }
    // f-strings — simplified
    if (expr.startsWith('f"') || expr.startsWith("f'")) {
      return expr.slice(2, -1);
    }
    // Numbers
    if (/^-?\d+(\.\d+)?$/.test(expr)) {
      return parseFloat(expr);
    }
    // Booleans
    if (expr === "True") return true;
    if (expr === "False") return false;
    if (expr === "None") return null;

    // Simple arithmetic
    const arithMatch = expr.match(/^(-?\d+\.?\d*)\s*([+\-*/])\s*(-?\d+\.?\d*)$/);
    if (arithMatch) {
      const a = parseFloat(arithMatch[1]);
      const op = arithMatch[2];
      const b = parseFloat(arithMatch[3]);
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return b !== 0 ? a / b : null;
      }
    }

    // len()
    const lenMatch = expr.match(/^len\((.+)\)$/);
    if (lenMatch) {
      const inner = safeEval(lenMatch[1], _fullCode);
      if (typeof inner === "string") return inner.length;
    }

    // Method calls on strings: .upper(), .lower(), .strip(), [::-1]
    if (expr.includes('[::-1]')) {
      const inner = safeEval(expr.replace('[::-1]', ''), _fullCode);
      if (typeof inner === "string") return inner.split("").reverse().join("");
    }

    // [::-1] combined with variable-like names
    const varName = expr.replace(/[^a-zA-Z_]/g, "");
    if (varName && expr.includes("[::-1]")) {
      // Try to look up in common patterns
      const reversedVars: Record<string, string> = {
        ollaH: "Hallo",
      };
      if (reversedVars[expr.replace('[::-1]', '')]) {
        return reversedVars[expr.replace('[::-1]', '')];
      }
    }

    return expr;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function TestRunner() {
  // Inject Prism theme
  useEffect(() => {
    if (typeof document !== "undefined" && !document.getElementById("prism-testrunner-theme")) {
      const style = document.createElement("style");
      style.id = "prism-testrunner-theme";
      style.textContent = prismTheme;
      document.head.appendChild(style);
    }
  }, []);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<Tab>("playground");

  // Playground state
  const [code, setCode] = useState(testPresets[0].code);
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(testPresets[0].id);
  const [presetCategory, setPresetCategory] = useState<"all" | "function" | "edge" | "mock">("all");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  // AAA state
  const [aaaStep, setAaaStep] = useState(0);
  const [showFullAAA, setShowFullAAA] = useState(false);

  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnsweredSet, setQuizAnsweredSet] = useState<Set<number>>(new Set());
  const [showExplanation, setShowExplanation] = useState(false);

  // Progress
  const totalQuizQuestions = quizQuestions.length;
  const answeredCount = quizAnsweredSet.size;
  const progressPct = Math.round((answeredCount / totalQuizQuestions) * 100);

  // -----------------------------------------------------------------------
  // Playground handlers
  // -----------------------------------------------------------------------
  const handleRunTests = useCallback(() => {
    setIsRunning(true);
    setTestResults([]);

    // Simulate test execution with delay
    setTimeout(() => {
      const results = runTests(code);
      setTestResults(results);
      setIsRunning(false);
    }, 600);
  }, [code]);

  const handlePresetSelect = useCallback((preset: TestPreset) => {
    setCode(preset.code);
    setSelectedPreset(preset.id);
    setTestResults([]);
  }, []);

  const handleScroll = useCallback(() => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
      preRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  // -----------------------------------------------------------------------
  // Quiz handlers
  // -----------------------------------------------------------------------
  const handleQuizAnswer = useCallback(
    (index: number) => {
      if (quizAnswered) return;
      setSelectedAnswer(index);
      setQuizAnswered(true);
      setShowExplanation(true);

      if (index === quizQuestions[currentQuiz].correctIndex) {
        setQuizScore((s) => s + 1);
      }
      setQuizAnsweredSet((prev) => new Set([...prev, currentQuiz]));
    },
    [quizAnswered, currentQuiz]
  );

  const handleNextQuiz = useCallback(() => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz((c) => c + 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
      setShowExplanation(false);
    }
  }, [currentQuiz]);

  const handlePrevQuiz = useCallback(() => {
    if (currentQuiz > 0) {
      setCurrentQuiz((c) => c - 1);
      setSelectedAnswer(null);
      setQuizAnswered(false);
      setShowExplanation(false);
    }
  }, [currentQuiz]);

  const handleResetQuiz = useCallback(() => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setQuizAnswered(false);
    setQuizScore(0);
    setQuizAnsweredSet(new Set());
    setShowExplanation(false);
  }, []);

  // Filter presets
  const filteredPresets =
    presetCategory === "all"
      ? testPresets
      : testPresets.filter((p) => p.category === presetCategory);

  const passCount = testResults.filter((r) => r.passed).length;
  const failCount = testResults.filter((r) => !r.passed).length;

  // -----------------------------------------------------------------------
  // Tab definitions
  // -----------------------------------------------------------------------
  const tabs: { key: Tab; label: string; icon: typeof Code }[] = [
    { key: "playground", label: "Test-Playground", icon: Play },
    { key: "examples", label: "Beispiele", icon: BookOpen },
    { key: "aaa", label: "AAA-Muster", icon: Target },
    { key: "quiz", label: "Bug-Finder-Quiz", icon: Bug },
  ];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* ================================================================ */}
      {/* Header                                                          */}
      {/* ================================================================ */}
      <div className="bg-gray-800 px-4 sm:px-6 py-4 border-b border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-6 h-6 text-emerald-400" />
              Unit Test Runner
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Lerne Unit-Tests schreiben, indem du sie ausfuehrst und Bugs findest
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-emerald-400">{quizScore}</div>
              <div className="text-gray-500 text-xs">Quiz-Punkte</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-400">
                {answeredCount}/{totalQuizQuestions}
              </div>
              <div className="text-gray-500 text-xs">Beantwortet</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* Tab Navigation                                                   */}
      {/* ================================================================ */}
      <div className="flex border-b border-gray-700 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "text-emerald-400 border-b-2 border-emerald-400 bg-gray-800/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/30"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/* Content                                                          */}
      {/* ================================================================ */}
      <div className="p-4 sm:p-6">
        {/* ── PLAYGROUND ──────────────────────────────────────────────── */}
        {activeTab === "playground" && (
          <div className="space-y-4">
            {/* Quick preset bar */}
            <div className="flex flex-wrap gap-2">
              {testPresets.slice(0, 3).map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedPreset === preset.id
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {preset.title}
                </button>
              ))}
              <button
                onClick={() => setActiveTab("examples")}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-700 text-gray-400 hover:text-gray-200 hover:bg-gray-600 transition-colors flex items-center gap-1"
              >
                Alle Beispiele <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Code Editor */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs font-medium flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" />
                  Python Test-Code
                </span>
                <button
                  onClick={() => {
                    setCode(testPresets[0].code);
                    setTestResults([]);
                    setSelectedPreset(testPresets[0].id);
                  }}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                  title="Zuruecksetzen"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
              <div className="relative rounded-lg overflow-hidden border border-gray-600 bg-gray-800">
                <pre
                  ref={preRef}
                  className="p-4 overflow-auto text-sm leading-relaxed pointer-events-none absolute inset-0 font-mono whitespace-pre-wrap break-words"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: highlightPython(code) }}
                />
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setTestResults([]);
                  }}
                  onScroll={handleScroll}
                  className="w-full min-h-[300px] p-4 bg-transparent text-transparent caret-emerald-400 font-mono text-sm leading-relaxed resize-y outline-none relative z-10 whitespace-pre-wrap break-words"
                  spellCheck={false}
                  placeholder="# Schreibe deinen Test-Code hier..."
                />
              </div>
            </div>

            {/* Run button */}
            <button
              onClick={handleRunTests}
              disabled={isRunning}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                isRunning
                  ? "bg-gray-700 text-gray-400 cursor-wait"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30"
              }`}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Tests werden ausgefuehrt...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Tests ausfuehren
                </>
              )}
            </button>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="space-y-3">
                {/* Summary bar */}
                <div className="flex items-center gap-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">{passCount} bestanden</span>
                  </div>
                  {failCount > 0 && (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 font-bold">{failCount} fehlgeschlagen</span>
                    </div>
                  )}
                  <div className="ml-auto text-gray-500 text-sm">
                    {testResults.length} Tests insgesamt
                  </div>
                </div>

                {/* Individual results */}
                <div className="space-y-1.5">
                  {testResults.map((result) => (
                    <div
                      key={result.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-mono ${
                        result.passed
                          ? "bg-emerald-900/20 border border-emerald-500/20"
                          : "bg-red-900/20 border border-red-500/20"
                      }`}
                    >
                      {result.passed ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                      <span
                        className={
                          result.passed ? "text-emerald-300" : "text-red-300"
                        }
                      >
                        {result.output}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                {failCount > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-amber-900/20 border border-amber-500/20 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-200">
                      <span className="font-semibold">Tipp:</span> Fehlgeschlagene Tests zeigen,
                      wo der Code nicht das erwartete Ergebnis liefert. Analysiere die
                      Fehlermeldung, um die Ursache zu finden.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── EXAMPLES ───────────────────────────────────────────────── */}
        {activeTab === "examples" && (
          <div className="space-y-4">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { key: "all", label: "Alle" },
                  { key: "function", label: "Funktionen" },
                  { key: "edge", label: "Grenzfaelle" },
                  { key: "mock", label: "Mocks" },
                ] as const
              ).map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setPresetCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    presetCategory === cat.key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Preset cards */}
            <div className="grid gap-3">
              {filteredPresets.map((preset) => {
                const catMeta = {
                  function: {
                    label: "Funktionen",
                    color: "text-blue-400",
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/30",
                    icon: Code,
                  },
                  edge: {
                    label: "Grenzfaelle",
                    color: "text-amber-400",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/30",
                    icon: AlertTriangle,
                  },
                  mock: {
                    label: "Mocks",
                    color: "text-purple-400",
                    bg: "bg-purple-500/10",
                    border: "border-purple-500/30",
                    icon: Shield,
                  },
                };
                const meta = catMeta[preset.category];
                const Icon = meta.icon;

                return (
                  <div
                    key={preset.id}
                    className={`rounded-lg border ${meta.border} ${meta.bg} overflow-hidden`}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${meta.bg}`}
                        >
                          <Icon className={`w-4 h-4 ${meta.color}`} />
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">
                            {preset.title}
                          </div>
                          <div className="text-gray-400 text-xs">
                            {preset.description}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handlePresetSelect(preset);
                          setActiveTab("playground");
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-medium transition-colors flex items-center gap-1"
                      >
                        Laden <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    {/* Code preview */}
                    <div className="border-t border-gray-700/50">
                      <pre
                        className="p-3 text-xs font-mono overflow-auto max-h-[120px] text-gray-300 bg-gray-900/50"
                        dangerouslySetInnerHTML={{
                          __html: highlightPython(preset.code),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Info box */}
            <div className="flex items-start gap-3 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <span className="font-semibold">Kategorien:</span>{" "}
                <span className="text-blue-300">Funktionen</span> testen normale Eingaben,{" "}
                <span className="text-amber-300">Grenzfaelle</span> pruefen Extremwerte und
                Fehler, <span className="text-purple-300">Mocks</span> simulieren externe
                Abhaengigkeiten wie Datenbanken oder APIs.
              </div>
            </div>
          </div>
        )}

        {/* ── AAA PATTERN ────────────────────────────────────────────── */}
        {activeTab === "aaa" && (
          <div className="space-y-5">
            {/* Intro */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-white font-bold text-lg flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Das AAA-Muster
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Jeder gute Unit-Test folgt dem <strong className="text-white">AAA-Muster</strong>:{" "}
                <span className="text-blue-400 font-semibold">Arrange</span> (Vorbereiten) →{" "}
                <span className="text-amber-400 font-semibold">Act</span> (Ausfuehren) →{" "}
                <span className="text-emerald-400 font-semibold">Assert</span> (Ueberpruefen).{" "}
                Diese Struktur macht Tests lesbar, verstaendlich und wartbar.
              </p>
            </div>

            {/* Step-by-step navigation */}
            <div className="flex items-center gap-2">
              {aaaSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.phase}
                    onClick={() => setAaaStep(i)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      aaaStep === i
                        ? `bg-gray-700 border-2 ${
                            i === 0
                              ? "border-blue-500 text-blue-400"
                              : i === 1
                              ? "border-amber-500 text-amber-400"
                              : "border-emerald-500 text-emerald-400"
                          }`
                        : "bg-gray-800 border-2 border-transparent text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {step.phase}
                  </button>
                );
              })}
            </div>

            {/* Active step detail */}
            {(() => {
              const step = aaaSteps[aaaStep];
              const Icon = step.icon;
              return (
                <div
                  className={`rounded-lg border ${
                    aaaStep === 0
                      ? "border-blue-500/30 bg-blue-500/5"
                      : aaaStep === 1
                      ? "border-amber-500/30 bg-amber-500/5"
                      : "border-emerald-500/30 bg-emerald-500/5"
                  } p-5`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        aaaStep === 0
                          ? "bg-blue-500/20"
                          : aaaStep === 1
                          ? "bg-amber-500/20"
                          : "bg-emerald-500/20"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div>
                      <div className={`font-bold text-lg ${step.color}`}>
                        {step.phase}
                      </div>
                      <div className="text-gray-400 text-sm">{step.title}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <div className="rounded-lg overflow-hidden border border-gray-700 bg-gray-900/80">
                    <pre
                      className="p-4 text-sm font-mono overflow-auto text-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: highlightPython(step.code),
                      }}
                    />
                  </div>
                </div>
              );
            })()}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setAaaStep((s) => Math.max(0, s - 1))}
                disabled={aaaStep === 0}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Zurueck
              </button>
              <span className="text-gray-500 text-sm">
                {aaaStep + 1} / {aaaSteps.length}
              </span>
              <button
                onClick={() =>
                  setAaaStep((s) => Math.min(aaaSteps.length - 1, s + 1))
                }
                disabled={aaaStep === aaaSteps.length - 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Weiter
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Full AAA example toggle */}
            <div>
              <button
                onClick={() => setShowFullAAA(!showFullAAA)}
                className="flex items-center gap-2 w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 text-gray-300 text-sm font-medium transition-colors"
              >
                {showFullAAA ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
                Vollstaendiges AAA-Beispiel anzeigen
              </button>
              {showFullAAA && (
                <div className="mt-3 rounded-lg overflow-hidden border border-gray-700 bg-gray-900/80">
                  <pre
                    className="p-4 text-sm font-mono overflow-auto text-gray-200"
                    dangerouslySetInnerHTML={{
                      __html: highlightPython(
                        `# Vollstaendiger Test mit dem AAA-Muster

def test_addiere_positive_zahlen():
    # ---- Arrange ----
    # Testdaten und Objekte vorbereiten
    rechner = Taschenrechner()
    a = 10
    b = 5

    # ---- Act ----
    # Zu testende Funktion aufrufen
    ergebnis = rechner.addiere(a, b)

    # ---- Assert ----
    # Ergebnis mit Erwartung vergleichen
    assert ergebnis == 15, f"Erwartet 15, bekommen {ergebnis}"


def test_division_durch_null():
    # ---- Arrange ----
    rechner = Taschenrechner()

    # ---- Act & Assert ----
    # Pruefen, dass ein Fehler auftritt
    try:
        rechner.dividieren(10, 0)
        assert False, "Sollte ZeroDivisionError werfen"
    except ZeroDivisionError:
        pass  # Erwartetes Verhalten`
                      ),
                    }}
                  />
                </div>
              )}
            </div>

            {/* Key rules */}
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  icon: CheckCircle,
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10",
                  border: "border-emerald-500/20",
                  title: "Ein Test = Eine Aussage",
                  desc: "Jeder Test prueft genau ein Verhalten. So weisst du sofort, was fehlgeschlagen ist.",
                },
                {
                  icon: Zap,
                  color: "text-amber-400",
                  bg: "bg-amber-500/10",
                  border: "border-amber-500/20",
                  title: "Tests sind unabhaengig",
                  desc: "Jeder Test laeuft allein. Keine Abhaengigkeit von anderen Tests oder der Reihenfolge.",
                },
                {
                  icon: Eye,
                  color: "text-blue-400",
                  bg: "bg-blue-500/10",
                  border: "border-blue-500/20",
                  title: "Aussagekraeftige Namen",
                  desc: "test_addiere_negative_zahlen() sagt sofort, was geprueft wird.",
                },
                {
                  icon: Pencil,
                  color: "text-purple-400",
                  bg: "bg-purple-500/10",
                  border: "border-purple-500/20",
                  title: "Fehlertexte schreiben",
                  desc: "assert x == 5, 'Erwartet 5' hilft beim Debuggen bei Fehlschlag.",
                },
              ].map((rule) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={rule.title}
                    className={`rounded-lg border ${rule.border} ${rule.bg} p-3`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={`w-4 h-4 ${rule.color}`} />
                      <span className="text-white font-medium text-sm">
                        {rule.title}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── QUIZ ───────────────────────────────────────────────────── */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            {/* Quiz progress */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bug className="w-5 h-5 text-red-400" />
                  <span className="text-white font-semibold text-sm">
                    Bug-Finder-Quiz
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-bold text-sm">
                      {quizScore}/{totalQuizQuestions}
                    </span>
                  </div>
                  <button
                    onClick={handleResetQuiz}
                    className="text-gray-500 hover:text-gray-300 transition-colors"
                    title="Quiz zuruecksetzen"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="text-gray-500 text-xs mt-1.5 text-right">
                {progressPct}% abgeschlossen
              </div>
            </div>

            {/* Question */}
            {(() => {
              const q = quizQuestions[currentQuiz];
              return (
                <div className="space-y-4">
                  {/* Question header */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 font-bold text-sm">
                        {currentQuiz + 1}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-bold">{q.title}</div>
                      <div className="text-gray-400 text-sm">
                        {q.bugDescription}
                      </div>
                    </div>
                  </div>

                  {/* Buggy code */}
                  <div className="rounded-lg overflow-hidden border border-red-500/20 bg-gray-900/80">
                    <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 flex items-center gap-2">
                      <Bug className="w-3.5 h-3.5 text-red-400" />
                      <span className="text-red-400 text-xs font-medium">
                        Enthaelt einen Fehler
                      </span>
                    </div>
                    <pre
                      className="p-4 text-sm font-mono overflow-auto text-gray-200"
                      dangerouslySetInnerHTML={{
                        __html: highlightPython(q.code),
                      }}
                    />
                  </div>

                  {/* Answer options */}
                  <div className="space-y-2">
                    {q.options.map((option, i) => {
                      const isCorrect = i === q.correctIndex;
                      const isSelected = selectedAnswer === i;
                      let style = "bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500";
                      if (quizAnswered) {
                        if (isCorrect) {
                          style = "bg-emerald-900/30 border-emerald-500/50 text-emerald-300";
                        } else if (isSelected && !isCorrect) {
                          style = "bg-red-900/30 border-red-500/50 text-red-300";
                        } else {
                          style = "bg-gray-800 border-gray-700/50 text-gray-500";
                        }
                      }

                      return (
                        <button
                          key={i}
                          onClick={() => handleQuizAnswer(i)}
                          disabled={quizAnswered}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm text-left transition-all ${style}`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                              quizAnswered && isCorrect
                                ? "bg-emerald-500 text-white"
                                : quizAnswered && isSelected && !isCorrect
                                ? "bg-red-500 text-white"
                                : "bg-gray-700 text-gray-400"
                            }`}
                          >
                            {quizAnswered && isCorrect ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : quizAnswered && isSelected && !isCorrect ? (
                              <XCircle className="w-4 h-4" />
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </div>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {showExplanation && (
                    <div
                      className={`rounded-lg p-4 border ${
                        selectedAnswer === q.correctIndex
                          ? "bg-emerald-900/20 border-emerald-500/20"
                          : "bg-amber-900/20 border-amber-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {selectedAnswer === q.correctIndex ? (
                          <>
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <span className="text-emerald-400 font-bold text-sm">
                              Richtig!
                            </span>
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-5 h-5 text-amber-400" />
                            <span className="text-amber-400 font-bold text-sm">
                              Erklaerung
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handlePrevQuiz}
                      disabled={currentQuiz === 0}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Zurueck
                    </button>
                    <span className="text-gray-500 text-sm">
                      {currentQuiz + 1} / {totalQuizQuestions}
                    </span>
                    <button
                      onClick={handleNextQuiz}
                      disabled={currentQuiz === totalQuizQuestions - 1}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Weiter
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Quiz complete */}
            {answeredCount === totalQuizQuestions && (
              <div className="bg-gray-800 rounded-lg p-5 border border-yellow-500/30 text-center">
                <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <div className="text-white font-bold text-lg mb-1">
                  Quiz abgeschlossen!
                </div>
                <div className="text-gray-400 text-sm mb-3">
                  Du hast {quizScore} von {totalQuizQuestions} Fragen richtig
                  beantwortet.
                </div>
                <div className="text-3xl font-bold mb-3">
                  {quizScore === totalQuizQuestions ? (
                    <span className="text-emerald-400">Perfekt!</span>
                  ) : quizScore >= totalQuizQuestions * 0.7 ? (
                    <span className="text-blue-400">Sehr gut!</span>
                  ) : quizScore >= totalQuizQuestions * 0.5 ? (
                    <span className="text-amber-400">Gut!</span>
                  ) : (
                    <span className="text-red-400">Uebung macht den Meister!</span>
                  )}
                </div>
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Nochmal versuchen
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
