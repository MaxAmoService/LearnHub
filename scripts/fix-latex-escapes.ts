// fix-latex-escapes.ts — Korrigiert LaTeX-Backslash-Escaping in Data-Dateien
//
// Problem: In JS-Template-/String-Literals wird ein einzelner Backslash vor
// einem LaTeX-Befehl zur Laufzeit verändert (\b → Backspace, \r → CR,
// unbekannte Escapes verlieren den Backslash). KaTeX erhält dadurch
// verstümmelten Input und zeigt Rohtext statt Formeln.
// Ebenso wird "\\ " (zwei Backslashes + Leerzeichen) zu "\ " (Control Space)
// statt zum Zeilenumbruch "\\ " in Matrix-/cases-Umgebungen.
//
// Das Skript nutzt die TypeScript-API und ändert NUR den Rohinhalt von
// String-/Template-Literalen — Code, Kommentare und Regexe bleiben unberührt.
//
// Nutzung:
//   npx tsx scripts/fix-latex-escapes.ts            # Dry-Run: zeigt Diffs
//   npx tsx scripts/fix-latex-escapes.ts --apply    # schreibt die Dateien

import * as ts from "typescript";
import * as fs from "fs";

const APPLY = process.argv.includes("--apply");

const FILES = [
  "lib/mathData.ts",
  "lib/complexData.ts",
  "lib/ganzeZahlenData.ts",
  "lib/ihkData.ts",
];

// Gleiche Befehlsliste wie in scripts/validate-latex.sh
const LATEX_CMDS = [
  "frac", "dfrac", "tfrac", "cfrac", "binom", "dbinom", "tbinom", "sqrt",
  "left", "right", "middle", "begin", "end", "array", "matrix", "pmatrix",
  "bmatrix", "vmatrix", "Vmatrix", "cases", "smallmatrix", "overbrace",
  "underbrace", "overline", "underline", "widehat", "widetilde",
  "overrightarrow", "overleftarrow", "overset", "underset", "stackrel",
  "cdot", "sdot", "times", "div", "ast", "star", "circ", "bullet", "pm",
  "mp", "cap", "cup", "uplus", "sqcap", "sqcup", "vee", "wedge", "oplus",
  "ominus", "otimes", "oslash", "odot", "bigcirc", "diamond",
  "bigtriangleup", "bigtriangledown", "triangleleft", "triangleright",
  "amalg", "dagger", "ddagger", "leq", "geq", "neq", "approx", "sim",
  "simeq", "cong", "equiv", "propto", "parallel", "perp", "mid", "asymp",
  "lesssim", "gtrsim", "doteq", "bowtie", "subset", "supset", "subseteq",
  "supseteq", "in", "ni", "notin", "varnothing", "forall", "exists", "neg",
  "lnot", "land", "lor", "implies", "iff", "Rightarrow", "Leftarrow",
  "rightarrow", "leftarrow", "Leftrightarrow", "leftrightarrow",
  "longleftarrow", "longrightarrow", "Longleftarrow", "Longrightarrow",
  "longleftrightarrow", "Longleftrightarrow", "xrightarrow", "xleftarrow",
  "hookrightarrow", "hookleftarrow", "rightharpoonup", "leftharpoonup",
  "mapsto", "uparrow", "downarrow", "nearrow", "searrow", "swarrow",
  "nwarrow", "sum", "prod", "coprod", "int", "iint", "iiint", "oint",
  "bigcap", "bigcup", "bigsqcup", "bigvee", "bigwedge", "bigodot",
  "bigotimes", "bigoplus", "biguplus", "lim", "limsup", "liminf", "log",
  "ln", "sin", "cos", "tan", "cot", "sec", "csc", "arcsin", "arccos",
  "arctan", "sinh", "cosh", "tanh", "exp", "det", "gcd", "max", "min",
  "arg", "deg", "dim", "ker", "Pr", "Re", "Im", "sup", "inf", "partial",
  "nabla", "infty", "theta", "phi", "varphi", "pi", "alpha", "beta",
  "gamma", "delta", "epsilon", "varepsilon", "lambda", "mu", "nu", "xi",
  "rho", "sigma", "tau", "upsilon", "chi", "psi", "omega", "Gamma", "Delta",
  "Theta", "Lambda", "Xi", "Pi", "Sigma", "Upsilon", "Phi", "Psi", "Omega",
  "mathbb", "mathbf", "mathrm", "mathit", "mathsf", "mathtt", "mathcal",
  "mathfrak", "boldsymbol", "operatorname", "text", "ldots", "cdots",
  "vdots", "ddots", "quad", "qquad", "angle", "triangle", "Box", "check",
  "tilde", "acute", "grave", "breve", "hat", "bar", "vec", "dot", "ddot",
  "mod", "bmod", "pmod", "big", "Big", "bigg", "Bigg", "bigl", "bigr",
  "Bigl", "Bigr", "biggl", "biggr", "Biggl", "Biggr", "ell", "hbar",
  "aleph", "wp", "surd", "flat", "sharp", "natural", "top", "bot", "langle",
  "rangle", "vert", "Vert", "lVert", "rVert", "lfloor", "rfloor", "lceil",
  "rceil", "ulcorner", "urcorner", "llcorner", "lrcorner", "varliminf",
  "varlimsup", "degree",
];

// Einzelner Backslash vor LaTeX-Befehl → doppelter Backslash
const SINGLE_CMD = new RegExp(
  String.raw`(?<!\\)\\(${LATEX_CMDS.join("|")})(?![a-zA-Z])`,
  "g",
);

// Einzelner Backslash vor LaTeX-Sonderzeichen (\% \& \# \_ \{ \}) →
// doppelter Backslash. Einzelne Backslashes davor sind in JS-Literals
// unbekannte Escapes und gehen zur Laufzeit verloren.
// \$ ist BEWUSST nicht dabei: \${ ist legitimes Template-Escaping in
// Code-Beispielen innerhalb des Contents.
const SINGLE_SPECIAL = new RegExp(String.raw`(?<!\\)\\([%&#_{}])`, "g");

// "\\ " (zwei Backslashes + Leerzeichen) → "\\\\ " (vier + Leerzeichen):
// erst dadurch wird der LaTeX-Zeilenumbruch "\\ " zur Laufzeit erzeugt.
const ROW_BREAK = new RegExp(String.raw`(?<![\\])\\{2}(?= )`, "g");

// "\\2" (zwei Backslashes direkt vor Ziffer/Minus, ohne Leerzeichen)
// → "\\\\2": gleicher Zeilenumbruch-Fehler, nur ohne Leerzeichen danach.
// BEWUSST NUR Ziffer/Minus: vor Buchstaben kann "\\" auch ein korrekter
// Befehl sein (z. B. \\vec, \\cdot) — diese Fälle NICHT automatisch ändern.
const ROW_BREAK_TIGHT = new RegExp(String.raw`(?<![\\])\\{2}(?=[0-9\-])`, "g");

// Row-Break-Fix nur in Umgebungen anwenden (außerhalb ist "\ " Control Space)
const HAS_ENV = /\\{1,2}begin\{/;

interface RawRegion {
  start: number; // absolute offset des Rohinhalts (ohne Quotes)
  end: number;
  content: string;
}

function collectRawRegions(sf: ts.SourceFile): RawRegion[] {
  const regions: RawRegion[] = [];

  function visit(node: ts.Node) {
    if (ts.isStringLiteral(node)) {
      const start = node.getStart(sf) + 1;
      const end = node.getEnd() - 1;
      regions.push({ start, end, content: sf.text.slice(start, end) });
      return;
    }
    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      const start = node.getStart(sf) + 1;
      const end = node.getEnd() - 1;
      regions.push({ start, end, content: sf.text.slice(start, end) });
      return;
    }
    if (ts.isTemplateExpression(node)) {
      // Kopf: `...${
      const head = node.head;
      const headStart = head.getStart(sf) + 1;
      const headEnd = head.getEnd() - 2;
      regions.push({ start: headStart, end: headEnd, content: sf.text.slice(headStart, headEnd) });
      for (const span of node.templateSpans) {
        const lit = span.literal;
        if (ts.isTemplateMiddle(lit)) {
          // }...${
          const s = lit.getStart(sf) + 1;
          const e = lit.getEnd() - 2;
          regions.push({ start: s, end: e, content: sf.text.slice(s, e) });
        } else if (ts.isTemplateTail(lit)) {
          // }...`
          const s = lit.getStart(sf) + 1;
          const e = lit.getEnd() - 1;
          regions.push({ start: s, end: e, content: sf.text.slice(s, e) });
        }
      }
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);
  return regions;
}

function formatDiff(before: string, after: string, max = 80): string {
  const b = before.replace(/\n/g, "\\n");
  const a = after.replace(/\n/g, "\\n");
  const cut = (s: string) => (s.length > max ? s.slice(0, max) + "…" : s);
  return `  - ${cut(b)}\n  + ${cut(a)}`;
}

interface Edit {
  start: number;
  end: number;
  text: string;
}

let totalFiles = 0;
let totalEdits = 0;

for (const file of FILES) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const regions = collectRawRegions(sf);

  const edits: Edit[] = [];
  const diffs: string[] = [];

  for (const region of regions) {
    let raw = region.content;

    // 1) Einzelne Backslashes vor LaTeX-Befehlen/Sonderzeichen verdoppeln
    raw = raw.replace(SINGLE_CMD, (m) => "\\" + m);
    raw = raw.replace(SINGLE_SPECIAL, (m) => "\\" + m);

    // 2) Row-Breaks — nur innerhalb von Umgebungen
    if (HAS_ENV.test(raw)) {
      raw = raw.replace(ROW_BREAK, (m) => m + m);
      raw = raw.replace(ROW_BREAK_TIGHT, (m) => m + m);
    }

    if (raw !== region.content) {
      edits.push({ start: region.start, end: region.end, text: raw });
      const line = sf.getLineAndCharacterOfPosition(region.start).line + 1;
      diffs.push(`Zeile ${line}:`);
      diffs.push(formatDiff(region.content, raw));
    }
  }

  if (edits.length > 0) {
    totalFiles++;
    totalEdits += edits.length;
    console.log(`\n📄 ${file}: ${edits.length} Literal(e) korrigiert`);
    diffs.slice(0, 40).forEach((d) => console.log(d));
    if (diffs.length > 40) console.log(`  … ${diffs.length - 40} weitere Diff-Zeilen`);

    if (APPLY) {
      // Von hinten nach vorn einsetzen, damit die Offsets stimmen
      let out = text;
      for (const edit of edits.sort((a, b) => b.start - a.start)) {
        out = out.slice(0, edit.start) + edit.text + out.slice(edit.end);
      }
      fs.writeFileSync(file, out);
    }
  } else {
    console.log(`✅ ${file}: nichts zu tun`);
  }
}

console.log(
  `\n${APPLY ? "✔ Geschrieben:" : "ℹ️ Dry-Run (--apply zum Schreiben):"} ${totalFiles} Datei(en), ${totalEdits} Literal(e).`,
);
