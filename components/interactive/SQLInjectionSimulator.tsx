"use client";

import { useState, useCallback } from "react";

// ============================================================================
// SQL Injection Simulator — 6 Level, OWASP Juice Shop inspiriert
// ============================================================================

interface Level {
  id: number;
  title: string;
  difficulty: "leicht" | "mittel" | "schwer";
  description: string;
  hints: string[];
  vulnerableQuery: string;
  successPayloads: string[];
  explanation: string;
  protection: string;
  points: number;
  inputLabel: string;
  inputPlaceholder: string;
  simulatedResponse: string;
}

const levels: Level[] = [
  {
    id: 1,
    title: "Einfache Login-Bypass",
    difficulty: "leicht",
    description:
      "Der Login prüft Benutzername und Passwort direkt in einer SQL-Abfrage — ohne Prepared Statements. Finde einen Payload, der dich einloggt, OHNE das richtige Passwort zu kennen!",
    hints: [
      "Denke an: Was passiert, wenn die WHERE-Bedingung immer WAHR ist?",
      "Nutze OR 1=1 und kommentiere den Rest mit -- aus.",
    ],
    vulnerableQuery: `SELECT * FROM users\nWHERE username = '[INPUT]'\n  AND password = '[INPUT]'`,
    successPayloads: [
      "' or 1=1 --",
      "\" or 1=1 --",
      "' or '1'='1' --",
      "' or 1=1#",
      "admin' --",
      "' or 1=1/*",
    ],
    explanation: `' OR 1=1 -- wird zu:\nSELECT * FROM users\nWHERE username = '' OR 1=1 --' AND password = '...'\n\nDas -- kommentiert den Rest aus. OR 1=1 ist IMMER wahr → die DB gibt ALLE User zurück → Login erfolgreich!`,
    protection:
      "Prepared Statements mit Platzhaltern: SELECT * FROM users WHERE username = ? AND password = ?",
    points: 100,
    inputLabel: "Benutzername",
    inputPlaceholder: "' OR 1=1 --",
    simulatedResponse: "✅ LOGIN ERFOLGREICH! Admin-Zugang gewährt.",
  },
  {
    id: 2,
    title: "Kommentar-basierte Injection",
    difficulty: "leicht",
    description:
      "Der Login verwendet ein einfaches String-Matching. Nutze SQL-Kommentare, um die Passwort-Prüfung zu umgehen!",
    hints: [
      "Was passiert, wenn du nach dem Benutzernamen einen Kommentar einfügst?",
      "Versuche: admin' -- (der Rest der Query wird auskommentiert)",
    ],
    vulnerableQuery: `SELECT * FROM users\nWHERE username = '[INPUT]'\n  AND password = '[INPUT]'`,
    successPayloads: [
      "admin' --",
      "admin'#",
      "admin'/*",
      "' or '1'='1' --",
    ],
    explanation: `admin' -- wird zu:\nSELECT * FROM users\nWHERE username = 'admin' --' AND password = '...'\n\nDer -- Kommentar entfernt die Passwort-Prüfung komplett. Du bist eingeloggt als admin!`,
    protection:
      "Prepared Statements! Kein String-Konkatenation in SQL-Queries. Input Validation.",
    points: 200,
    inputLabel: "Benutzername",
    inputPlaceholder: "admin' --",
    simulatedResponse: "✅ LOGIN ERFOLGREICH! Eingeloggt als admin.",
  },
  {
    id: 3,
    title: "UNION-basierte Injection",
    difficulty: "mittel",
    description:
      "Die Anwendung zeigt Produktsuche-Ergebnisse. Nutze UNION SELECT, um versteckte Daten (z.B. Passwort-Hashes) aus einer anderen Tabelle auszulesen!",
    hints: [
      "UNION SELECT verbindet das Ergebnis einer zweiten SELECT-Abfrage mit der ersten.",
      "Versuche: ' UNION SELECT username, password FROM users --",
    ],
    vulnerableQuery: `SELECT name, price FROM products\nWHERE name LIKE '%[INPUT]%'`,
    successPayloads: [
      "' union select username, password from users --",
      "' union select username,password from users--",
      "' union all select username, password from users --",
    ],
    explanation: `' UNION SELECT username, password FROM users -- wird zu:\nSELECT name, price FROM products\nWHERE name LIKE '%' UNION SELECT username, password FROM users --%'\n\nDie DB zeigt jetzt die Produkttabelle UND die Usernamen+Passwörter!`,
    protection:
      "Input Validation: Nur erlaubte Zeichen akzeptieren. Prepared Statements. Least Privilege für DB-User.",
    points: 300,
    inputLabel: "Suchbegriff",
    inputPlaceholder: "' UNION SELECT username, password FROM users --",
    simulatedResponse:
      "✅ DATEN GEFUNDEN! admin:e10adc3949ba59abbe56e057f20f883e | user1:5f4dcc3b5aa765d...",
  },
  {
    id: 4,
    title: "Error-basierte Injection",
    difficulty: "mittel",
    description:
      "Die Anwendung zeigt Fehlermeldungen direkt an. Nutze diese, um Daten aus der Datenbank zu extrahieren — ohne UNION!",
    hints: [
      "EXTRACTVALUE() oder UPDATEXML() erzeugen Fehler, die Daten im Fehlerstring enthalten.",
      "Versuche: ' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()))) --",
    ],
    vulnerableQuery: `SELECT * FROM products\nWHERE id = [INPUT]`,
    successPayloads: [
      "' and extractvalue(1, concat(0x7e, (SELECT version()))) --",
      "' and updatexml(1, concat(0x7e, (SELECT version())), 1) --",
      "' and extractvalue(1, concat(0x7e, (select database()))) --",
      "' and 1=convert(int, (select top 1 table_name from information_schema.tables)) --",
    ],
    explanation: `EXTRACTVALUE() erzeugt einen XPath-Fehler:\nXPATH syntax error: '~5.7.34'\n\nDie Fehlermeldung enthält die MySQL-Version! So lassen sich Tabellennamen, Spalten und Daten auslesen.`,
    protection:
      "Keine Fehlermeldungen in Produktion! Prepared Statements. Custom Error Pages.",
    points: 400,
    inputLabel: "Produkt-ID",
    inputPlaceholder: "' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()))) --",
    simulatedResponse:
      "❌ SQL-Fehler: XPATH syntax error: '~5.7.34' — Daten extrahiert!",
  },
  {
    id: 5,
    title: "Blind SQL Injection (Zeit-basiert)",
    difficulty: "schwer",
    description:
      "Die Anwendung zeigt KEINE Fehlermeldungen und KEINE Daten direkt. Aber: Durch geschickte SQL-Befehle kannst du die Antwortzeit beeinflussen!",
    hints: [
      "Nutze SLEEP() — wenn die Antwort verzögert ist, ist die Bedingung wahr.",
      "Versuche: ' OR IF(1=1, SLEEP(3), 0) --",
    ],
    vulnerableQuery: `SELECT * FROM products\nWHERE id = [INPUT]`,
    successPayloads: [
      "' or if(1=1, sleep(3), 0) --",
      "' or sleep(3) --",
      "' or pg_sleep(3) --",
      "' or if(1=1, pg_sleep(3), 0) --",
    ],
    explanation: `' OR IF(1=1, SLEEP(3), 0) -- wird zu:\nSELECT * FROM products\nWHERE id = '' OR IF(1=1, SLEEP(3), 0) --\n\nIF(1=1) ist wahr → SLEEP(3) → Server wartet 3 Sekunden → Wir wissen: Es gibt eine Injection!\nSo kann man bitweise Daten auslesen.`,
    protection:
      "Prepared Statements! Keine Fehlermeldungen in Produktion. WAF. Rate Limiting.",
    points: 500,
    inputLabel: "Produkt-ID",
    inputPlaceholder: "' OR IF(1=1, SLEEP(3), 0) --",
    simulatedResponse:
      "⏱️ ANTWORT DAUERTE 3 SEKUNDEN! Blind SQL Injection erfolgreich!",
  },
  {
    id: 6,
    title: "Stacked Queries",
    difficulty: "schwer",
    description:
      "Die Anwendung erlaubt mehrere SQL-Statements in einer Abfrage. Nutze dies, um einen INSERT oder UPDATE auszuführen — ändere Daten in der Datenbank!",
    hints: [
      "Nutze ein Semikolon ; um ein zweites Statement zu starten.",
      "Versuche: '; INSERT INTO users (username, password) VALUES ('hacker', 'pwned') --",
    ],
    vulnerableQuery: `SELECT * FROM products\nWHERE name = '[INPUT]'`,
    successPayloads: [
      "'; insert into users (username, password) values ('hacker', 'pwned') --",
      "'; update users set password = 'hacked' where username = 'admin' --",
      "'; drop table users; --",
      "'; insert into users (username, password) values ('hacker','pwned')--",
    ],
    explanation: `'; INSERT INTO users ... -- wird zu:\nSELECT * FROM products\nWHERE name = ''; INSERT INTO users (username, password) VALUES ('hacker', 'pwned') --'\n\nZwei Statements werden ausgeführt! Der Angreifer kann Daten ändern, löschen oder neue Admin-Accounts erstellen.`,
    protection:
      "Prepared Statements! Multi-Statement Queries deaktivieren. Least Privilege. WAF.",
    points: 600,
    inputLabel: "Produktname",
    inputPlaceholder: "'; INSERT INTO users (username, password) VALUES ('hacker', 'pwned') --",
    simulatedResponse:
      "✅ STACKED QUERY AUSGEFÜHRT! Neuer User 'hacker' wurde eingefügt.",
  },
];

function normalizePayload(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function simulateQuery(
  input: string,
  level: Level
): { success: boolean; query: string; response: string } {
  const generatedQuery = level.vulnerableQuery.replace(
    /\[INPUT\]/g,
    input || "[leer]"
  );

  if (!input.trim()) {
    return {
      success: false,
      query: generatedQuery,
      response: "⚠️ Bitte gib einen Wert ein.",
    };
  }

  const normalized = normalizePayload(input);
  const success = level.successPayloads.some((p) =>
    normalized.includes(normalizePayload(p))
  );

  if (success) {
    return {
      success: true,
      query: generatedQuery,
      response: level.simulatedResponse,
    };
  }

  const failMsgs: Record<number, string> = {
    1: "❌ Login fehlgeschlagen. Die WHERE-Bedingung ist falsch.",
    2: "❌ Login fehlgeschlagen. Der Benutzername wurde nicht gefunden.",
    3: "❌ Keine Ergebnisse. Die UNION-Spaltenanzahl stimmt nicht.",
    4: "❌ Keine Fehlermeldung erhalten. Die Injection funktioniert nicht.",
    5: "⏱️ Antwort kam sofort — keine Verzögerung erkannt.",
    6: "❌ Nur SELECT-Ergebnis. Kein zweites Statement ausgeführt.",
  };

  return {
    success: false,
    query: generatedQuery,
    response: failMsgs[level.id] ?? "❌ Fehlgeschlagen. Versuche einen anderen Payload.",
  };
}

// ── Sub-Komponente: Level-Anzeige ──────────────────────────────────────────

function LevelCard({
  level,
  result,
  hintIndex,
  showProtection,
  onHint,
  onToggleProtection,
}: {
  level: Level;
  result: { success: boolean; query: string; response: string } | null;
  hintIndex: number;
  showProtection: boolean;
  onHint: () => void;
  onToggleProtection: () => void;
}) {
  const diffColor =
    level.difficulty === "leicht"
      ? "text-green-400 bg-green-900/30 border-green-800/40"
      : level.difficulty === "mittel"
      ? "text-yellow-400 bg-yellow-900/30 border-yellow-800/40"
      : "text-red-400 bg-red-900/30 border-red-800/40";

  return (
    <div className="bg-slate-900 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <h4 className="text-white font-bold">
          🎯 Level {level.id}: {level.title}
        </h4>
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold border ${diffColor}`}
        >
          {level.difficulty.toUpperCase()}
        </span>
        <span className="ml-auto text-yellow-400 text-xs font-bold">
          +{level.points} Punkte
        </span>
      </div>
      <p className="text-slate-300 text-sm mb-3">{level.description}</p>

      {/* Vulnerable Query */}
      <div className="bg-slate-800 rounded-lg p-3 border border-slate-700 mb-3">
        <p className="text-slate-400 text-xs mb-1">
          Verwundbare SQL-Abfrage:
        </p>
        <pre className="text-yellow-400 font-mono text-xs whitespace-pre-wrap">
          {level.vulnerableQuery}
        </pre>
      </div>

      {/* Result */}
      {result && (
        <div
          className={`rounded-lg p-3 border mb-3 ${
            result.success
              ? "bg-green-900/30 border-green-700"
              : "bg-red-900/30 border-red-700"
          }`}
        >
          <p
            className={`text-sm font-mono mb-2 ${
              result.success ? "text-green-300" : "text-red-300"
            }`}
          >
            {result.response}
          </p>
          <details className="mt-2">
            <summary className="text-slate-400 text-xs cursor-pointer hover:text-slate-300">
              Generierte SQL-Abfrage anzeigen
            </summary>
            <pre className="text-xs font-mono text-yellow-400 mt-1 bg-slate-900 rounded p-2 whitespace-pre-wrap">
              {result.query}
            </pre>
          </details>
        </div>
      )}

      {/* Hints */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={onHint}
          className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          {hintIndex > 0
            ? `💡 Tipp ${hintIndex}/${level.hints.length} (−50 Pkt)`
            : "💡 Tipp anzeigen (kostenlos)"}
        </button>
        <button
          onClick={onToggleProtection}
          className="text-xs text-green-400 hover:text-green-300 transition-colors"
        >
          {showProtection
            ? "🛡️ Schutz verbergen"
            : "🛡️ Schutzmaßnahmen anzeigen"}
        </button>
      </div>

      {hintIndex > 0 && (
        <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3 mb-3">
          {level.hints.slice(0, hintIndex).map((h, i) => (
            <p key={i} className="text-yellow-300 text-sm">
              💡 {h}
            </p>
          ))}
        </div>
      )}

      {showProtection && (
        <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3 mb-3">
          <h5 className="text-green-400 font-semibold text-xs mb-1">
            🛡️ So schützt du dich:
          </h5>
          <p className="text-green-200 text-sm">{level.protection}</p>
        </div>
      )}

      {/* Explanation after success */}
      {result?.success && (
        <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
          <h5 className="text-blue-400 font-semibold text-xs mb-1">
            📖 Erklärung:
          </h5>
          <pre className="text-blue-200 text-xs font-mono whitespace-pre-wrap">
            {level.explanation}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Haupt-Komponente ───────────────────────────────────────────────────────

export function SQLInjectionSimulator() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    success: boolean;
    query: string;
    response: string;
  } | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [showProtection, setShowProtection] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(
    new Set()
  );
  const [scores, setScores] = useState<Record<number, number>>({});

  const level = levels[currentLevel];

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxScore = levels.reduce((a, l) => a + l.points, 0);
  const starCount = Math.min(6, Math.ceil((totalScore / maxScore) * 6));

  const handleTest = useCallback(() => {
    const res = simulateQuery(input, level);
    setResult(res);
    if (res.success && !completedLevels.has(level.id)) {
      setCompletedLevels((prev) => new Set([...prev, level.id]));
      const penalty = hintIndex > 0 ? (hintIndex - 1) * 50 : 0;
      setScores((prev) => ({
        ...prev,
        [level.id]: Math.max(0, level.points - penalty),
      }));
    }
  }, [input, level, completedLevels, hintIndex]);

  const handleHint = useCallback(() => {
    if (hintIndex < level.hints.length) {
      setHintIndex((prev) => prev + 1);
    }
  }, [hintIndex, level.hints.length]);

  const handleReset = useCallback(() => {
    setInput("");
    setResult(null);
    setHintIndex(0);
    setShowProtection(false);
  }, []);

  const switchLevel = useCallback(
    (idx: number) => {
      setCurrentLevel(idx);
      setInput("");
      setResult(null);
      setHintIndex(0);
      setShowProtection(false);
    },
    []
  );

  return (
    <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-1">
        💉 SQL Injection Simulator
      </h3>
      <p className="text-slate-300 text-sm mb-4">
        Inspiriert vom OWASP Juice Shop — finde Schwachstellen in simulierten
        SQL-Abfragen!
      </p>

      {/* Scoreboard */}
      <div className="bg-slate-900 rounded-lg p-3 mb-4 flex flex-wrap items-center gap-4">
        <div>
          <span className="text-slate-400 text-xs block">Punkte</span>
          <span className="text-white text-xl font-bold">{totalScore}</span>
          <span className="text-slate-500 text-xs"> / {maxScore}</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < starCount ? "opacity-100" : "opacity-20"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="ml-auto text-slate-400 text-xs">
          {completedLevels.size} / {levels.length} Level geschafft
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {levels.map((l, idx) => {
          const done = completedLevels.has(l.id);
          return (
            <button
              key={l.id}
              onClick={() => switchLevel(idx)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                currentLevel === idx
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {done && <span className="text-green-400">✅</span>}
              Level {l.id}
            </button>
          );
        })}
      </div>

      {/* Level Card */}
      <LevelCard
        level={level}
        result={result}
        hintIndex={hintIndex}
        showProtection={showProtection}
        onHint={handleHint}
        onToggleProtection={() => setShowProtection((v) => !v)}
      />

      {/* Input */}
      <div className="mb-3">
        <label className="text-slate-400 text-xs mb-1 block">
          {level.inputLabel}:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTest()}
            placeholder={level.inputPlaceholder}
            className="flex-1 bg-slate-800 text-green-400 font-mono rounded-lg px-3 py-2 text-sm border border-slate-600 focus:border-red-400 focus:outline-none"
          />
          <button
            onClick={handleTest}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            🧪 Testen
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* All levels completed */}
      {completedLevels.size === levels.length && (
        <div className="bg-emerald-900/30 border border-emerald-700 rounded-lg p-4 mt-4 text-center">
          <p className="text-emerald-300 font-bold text-lg">
            🎉 Alle Level geschafft!
          </p>
          <p className="text-emerald-400 text-sm mt-1">
            Du kennst jetzt die 6 wichtigsten SQL-Injection-Typen. Merke:{" "}
            <strong>Prepared Statements</strong> schützen vor allen!
          </p>
          <p className="text-yellow-400 text-sm mt-2 font-bold">
            Gesamtpunktzahl: {totalScore} / {maxScore}{" "}
            {"⭐".repeat(starCount)}
          </p>
        </div>
      )}

      {/* Merksatz */}
      <div className="mt-4 bg-red-900/20 border border-red-800/30 rounded-lg p-3">
        <p className="text-red-300 text-sm">
          💡 <strong>Merke (OWASP #1):</strong> SQL Injection ist der häufigste
          Web-Angriff! Schutz: <strong>Prepared Statements</strong> (Platzhalter
          statt String-Konkatenation), Input Validation und das
          Least-Privilege-Prinzip für Datenbank-User.
        </p>
      </div>
    </div>
  );
}
