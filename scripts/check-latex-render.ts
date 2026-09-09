// check-latex-render.ts — Prüft, ob alle LaTeX-Ausdrücke in Data-Dateien
// mit KaTeX (so wie MathBlock es tut) fehlerfrei gerendert werden können.
//
// Nutzung: npx tsx scripts/check-latex-render.ts [file1 file2 ...]
// Exit-Code 1, wenn Ausdrücke nicht parsebar sind.

import * as ts from "typescript";
import * as fs from "fs";
import katex from "katex";

const FILES =
  process.argv.length > 2
    ? process.argv.slice(2)
    : ["lib/mathData.ts", "lib/complexData.ts", "lib/ganzeZahlenData.ts", "lib/ihkData.ts"];

interface Failure {
  file: string;
  line: number;
  expr: string;
}

function collectCookedStrings(sf: ts.SourceFile): { text: string; line: number }[] {
  const out: { text: string; line: number }[] = [];

  function visit(node: ts.Node) {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      out.push({ text: node.text, line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1 });
      return;
    }
    if (ts.isTemplateExpression(node)) {
      let text = node.head.text;
      for (const span of node.templateSpans) text += span.literal.text;
      out.push({ text, line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1 });
      return;
    }
    ts.forEachChild(node, visit);
  }

  visit(sf);
  return out;
}

function extractMath(text: string): { expr: string; display: boolean }[] {
  const found: { expr: string; display: boolean }[] = [];
  // Block-Mathe $$...$$ (über mehrere Zeilen)
  const blockRe = /\$\$([\s\S]+?)\$\$/g;
  let m: RegExpExecArray | null;
  const consumed: string[] = [];
  while ((m = blockRe.exec(text)) !== null) {
    found.push({ expr: m[1].trim(), display: true });
    consumed.push(m[0]);
  }
  let rest = text;
  for (const c of consumed) rest = rest.replace(c, "\u0000");
  // Inline-Mathe $...$ (einfache Zeile)
  const inlineRe = /\$([^$\n]+?)\$/g;
  while ((m = inlineRe.exec(rest)) !== null) {
    if (m[1].trim().length === 0) continue;
    found.push({ expr: m[1].trim(), display: false });
  }
  return found;
}

const failures: Failure[] = [];
let checked = 0;

for (const file of FILES) {
  if (!fs.existsSync(file)) {
    console.log(`⚠️ ${file} existiert nicht — übersprungen`);
    continue;
  }
  const text = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const { text: cooked, line } of collectCookedStrings(sf)) {
    for (const { expr, display } of extractMath(cooked)) {
      checked++;
      try {
        katex.renderToString(expr, {
          displayMode: display,
          throwOnError: true,
          strict: false,
          trust: true,
        });
      } catch (e) {
        failures.push({ file, line, expr });
      }
    }
  }
}

console.log(`\n${checked} LaTeX-Ausdrücke geprüft (${FILES.join(", ")}).`);
if (failures.length > 0) {
  console.log(`\n❌ ${failures.length} Ausdrücke NICHT parsebar:\n`);
  for (const f of failures.slice(0, 30)) {
    console.log(`${f.file}:${f.line}: ${f.expr.length > 120 ? f.expr.slice(0, 120) + "…" : f.expr}`);
  }
  if (failures.length > 30) console.log(`… ${failures.length - 30} weitere`);
  process.exit(1);
} else {
  console.log("✅ Alle Ausdrücke rendern fehlerfrei.\n");
}
