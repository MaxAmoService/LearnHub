// Taschenrechner-Auswertung — reine Funktion, keine UI-/Firestore-Abhängigkeit.
//
// Unterstützt: + - × ÷, Klammern, unäres Minus, Potenz (^), Prozent (Postfix),
// √(...) und Quadrat als Postfix-Operator (x²), Dezimaltrenner . und ,.

interface Parser {
  input: string;
  pos: number;
}

function skipWs(p: Parser): void {
  while (p.pos < p.input.length && /\s/.test(p.input[p.pos])) p.pos++;
}

function peek(p: Parser): string {
  return p.input[p.pos] ?? "";
}

function eat(p: Parser, ch: string): boolean {
  skipWs(p);
  if (peek(p) === ch) {
    p.pos++;
    return true;
  }
  return false;
}

function parseNumber(p: Parser): number | null {
  skipWs(p);
  const start = p.pos;
  let digits = 0;
  while (p.pos < p.input.length && /\d/.test(p.input[p.pos])) {
    p.pos++;
    digits++;
  }
  if (peek(p) === "." || peek(p) === ",") {
    p.pos++;
    while (p.pos < p.input.length && /\d/.test(p.input[p.pos])) {
      p.pos++;
      digits++;
    }
  }
  if (digits === 0) return null;
  const raw = p.input.slice(start, p.pos).replace(",", ".");
  const value = parseFloat(raw);
  return isNaN(value) ? null : value;
}

function parsePrimary(p: Parser): number | null {
  skipWs(p);
  if (peek(p) === "(") {
    p.pos++;
    const v = parseExpr(p);
    if (v === null || !eat(p, ")")) return null;
    return postfixOps(p, v);
  }
  if (peek(p) === "√") {
    p.pos++;
    if (!eat(p, "(")) return null;
    const v = parseExpr(p);
    if (v === null || !eat(p, ")") || v < 0) return null;
    return postfixOps(p, Math.sqrt(v));
  }
  const n = parseNumber(p);
  if (n === null) return null;
  return postfixOps(p, n);
}

/** Postfix-Operatoren % (÷100) und ² (Quadrat). */
function postfixOps(p: Parser, value: number): number | null {
  skipWs(p);
  if (peek(p) === "%") {
    p.pos++;
    return postfixOps(p, value / 100);
  }
  if (peek(p) === "²") {
    p.pos++;
    return postfixOps(p, value * value);
  }
  return value;
}

function parsePower(p: Parser): number | null {
  const base = parsePrimary(p);
  if (base === null) return null;
  skipWs(p);
  if (peek(p) === "^") {
    p.pos++;
    const exp = parseFactor(p);
    if (exp === null) return null;
    const v = Math.pow(base, exp);
    return isNaN(v) ? null : v;
  }
  return base;
}

function parseFactor(p: Parser): number | null {
  skipWs(p);
  if (peek(p) === "-") {
    p.pos++;
    const v = parseFactor(p);
    return v === null ? null : -v;
  }
  if (peek(p) === "+") {
    p.pos++;
    return parseFactor(p);
  }
  return parsePower(p);
}

function parseTerm(p: Parser): number | null {
  let left = parseFactor(p);
  if (left === null) return null;
  for (;;) {
    skipWs(p);
    const ch = peek(p);
    if (ch === "×" || ch === "*" || ch === "·") {
      p.pos++;
      const right = parseFactor(p);
      if (right === null) return null;
      left *= right;
    } else if (ch === "÷" || ch === "/" || ch === ":") {
      p.pos++;
      const right = parseFactor(p);
      if (right === null || right === 0) return null;
      left /= right;
    } else {
      return left;
    }
  }
}

function parseExpr(p: Parser): number | null {
  let left = parseTerm(p);
  if (left === null) return null;
  for (;;) {
    skipWs(p);
    const ch = peek(p);
    if (ch === "+") {
      p.pos++;
      const right = parseTerm(p);
      if (right === null) return null;
      left += right;
    } else if (ch === "-") {
      p.pos++;
      const right = parseTerm(p);
      if (right === null) return null;
      left -= right;
    } else {
      return left;
    }
  }
}

/**
 * Wertet einen Ausdruck aus — null bei Syntax-/Rechenfehlern (z. B. ÷0).
 * Der komplette Input muss geparst werden; Rest-Zeichen führen zu null.
 */
export function evaluateExpression(input: string): number | null {
  const p: Parser = { input, pos: 0 };
  const value = parseExpr(p);
  if (value === null) return null;
  skipWs(p);
  if (p.pos < p.input.length) return null;
  return value;
}

/** Ergebnis fürs Display formatieren (max. 10 signifikante Stellen). */
export function formatCalculatorResult(n: number): string {
  if (!Number.isFinite(n)) return "Fehler";
  const r = parseFloat(n.toPrecision(10));
  return r.toLocaleString("de-DE", { maximumFractionDigits: 8 });
}
