#!/bin/bash
# validate-latex.sh — Prüft alle Data-Dateien auf falsche Backslashes in LaTeX
# In JS-Template-Literals (Backticks) muss \frac als \\frac geschrieben werden,
# weil \f ein Form-Feed-Zeichen ist.
#
# Nutzung: bash scripts/validate-latex.sh
# Wird automatisch vor jedem Build ausgeführt (via prebuild-Skript in package.json)

set -e

FILES=(
  "lib/mathData.ts"
  "lib/mathExercises.ts"
  "lib/complexData.ts"
  "lib/ihkData.ts"
  "lib/netzwerkData.ts"
  "lib/datenbankData.ts"
  "lib/reactData.ts"
  "lib/typescriptData.ts"
  "lib/nextjsData.ts"
  "lib/computersystemeData.ts"
  "lib/dockerData.ts"
  "lib/erwProgData.ts"
  "lib/exponentialData.ts"
  "lib/fourierData.ts"
  "lib/ganzeZahlenData.ts"
  "lib/gitData.ts"
  "lib/grundrechnenData.ts"
  "lib/itSicherheitData.ts"
  "lib/logarithmusData.ts"
  "lib/projektmanagementData.ts"
  "lib/quadratischeGleichungenData.ts"
  "lib/qualitaetData.ts"
  "lib/uxData.ts"
  "lib/wachstumsprozesseData.ts"
)

# LaTeX-Befehle die NICHT als Escape-Sequenz interpretiert werden dürfen.
# WICHTIG: Alternation mit einfachem "|" — "\|" ist in PCRE ein literales
# Pipe-Zeichen und hat die Validierung jahrelang deaktiviert!
LATEX_CMDS="frac|dfrac|tfrac|cfrac|binom|dbinom|tbinom|sqrt|left|right|middle|begin|end|array|matrix|pmatrix|bmatrix|vmatrix|Vmatrix|cases|smallmatrix|overbrace|underbrace|overline|underline|widehat|widetilde|overrightarrow|overleftarrow|overset|underset|stackrel|cdot|sdot|times|div|ast|star|circ|bullet|pm|mp|cap|cup|uplus|sqcap|sqcup|vee|wedge|oplus|ominus|otimes|oslash|odot|bigcirc|diamond|bigtriangleup|bigtriangledown|triangleleft|triangleright|amalg|dagger|ddagger|leq|geq|neq|approx|sim|simeq|cong|equiv|propto|parallel|perp|mid|asymp|lesssim|gtrsim|doteq|bowtie|subset|supset|subseteq|supseteq|in|ni|notin|varnothing|forall|exists|neg|lnot|land|lor|implies|iff|Rightarrow|Leftarrow|rightarrow|leftarrow|Leftrightarrow|leftrightarrow|longleftarrow|longrightarrow|Longleftarrow|Longrightarrow|longleftrightarrow|Longleftrightarrow|xrightarrow|xleftarrow|hookrightarrow|hookleftarrow|rightharpoonup|leftharpoonup|mapsto|uparrow|downarrow|nearrow|searrow|swarrow|nwarrow|sum|prod|coprod|int|iint|iiint|oint|bigcap|bigcup|bigsqcup|bigvee|bigwedge|bigodot|bigotimes|bigoplus|biguplus|lim|limsup|liminf|log|ln|sin|cos|tan|cot|sec|csc|arcsin|arccos|arctan|sinh|cosh|tanh|exp|det|gcd|max|min|arg|deg|dim|ker|Pr|Re|Im|sup|inf|partial|nabla|infty|theta|phi|varphi|pi|alpha|beta|gamma|delta|epsilon|varepsilon|lambda|mu|nu|xi|rho|sigma|tau|upsilon|chi|psi|omega|Gamma|Delta|Theta|Lambda|Xi|Pi|Sigma|Upsilon|Phi|Psi|Omega|mathbb|mathbf|mathrm|mathit|mathsf|mathtt|mathcal|mathfrak|boldsymbol|operatorname|text|ldots|cdots|vdots|ddots|quad|qquad|angle|triangle|Box|check|tilde|acute|grave|breve|hat|bar|vec|dot|ddot|mod|bmod|pmod|big|Big|bigg|Bigg|bigl|bigr|Bigl|Bigr|biggl|biggr|Biggl|Biggr|ell|hbar|aleph|wp|surd|flat|sharp|natural|top|bot|langle|rangle|vert|Vert|lVert|rVert|lfloor|rfloor|lceil|rceil|ulcorner|urcorner|llcorner|lrcorner|varliminf|varlimsup|degree"

ERRORS=0

for FILE in "${FILES[@]}"; do
  if [ ! -f "$FILE" ]; then
    continue
  fi

  # Suche nach einzelnen Backslashes vor LaTeX-Befehlen.
  # Einzelner Backslash = 0x5c, gefolgt von LaTeX-Befehl — aber NICHT
  # 0x5c 0x5c (doppelte Backslashes = korrekt).
  # (?<!\\) = nicht von einem weiteren Backslash vorangestellt,
  # (?![a-zA-Z]) = Befehl darf nicht Teil eines längeren Befehls sein.
  FOUND=$(grep -nP "(?<!\\\\)\\\\($LATEX_CMDS)(?![a-zA-Z])" "$FILE" 2>/dev/null | head -5)

  if [ -n "$FOUND" ]; then
    echo "❌ $FILE: Einzelne Backslashes gefunden!"
    echo "$FOUND"
    echo "   → Diese müssen als \\\\ (doppelt) geschrieben werden."
    echo ""
    ERRORS=$((ERRORS + 1))
  fi

  # Einzelner Backslash vor LaTeX-Sonderzeichen (\% \& \# \_ \{ \}) —
  # unbekannte JS-Escapes, der Backslash geht zur Laufzeit verloren.
  # \$ ist BEWUSST nicht dabei: \${ ist legitimes Template-Escaping in
  # Code-Beispielen innerhalb des Contents.
  FOUND_SPECIAL=$(grep -nP '(?<!\\)\\([%&#_{}])' "$FILE" 2>/dev/null | head -5)

  if [ -n "$FOUND_SPECIAL" ]; then
    echo "❌ $FILE: Einzelne Backslashes vor Sonderzeichen (\\% \\$ \\& …) gefunden!"
    echo "$FOUND_SPECIAL"
    echo "   → Diese müssen als \\\\ (doppelt) geschrieben werden."
    echo ""
    ERRORS=$((ERRORS + 1))
  fi

  # Suche nach "\\ " (zwei Backslashes + Leerzeichen) INNERHALB einer
  # Matrix-/cases-Umgebung: wird zur Laufzeit zu "\ " (Control Space) statt
  # zum LaTeX-Zeilenumbruch "\\ " — Zeilen kollabieren in eine Zeile.
  # Korrekt: "\\\\ " (vier). Außerhalb von Umgebungen ist "\ " ein legitimer
  # Control Space und wird NICHT gemeldet (z. B. lib/netzwerkData.ts).
  ROWBREAK=$(grep -nP '\\{2}begin\{[a-zA-Z]+\}.*(?<![\\])\\{2} ' "$FILE" 2>/dev/null | head -5)

  if [ -n "$ROWBREAK" ]; then
    echo "❌ $FILE: Zeilenumbruch-Escaping falsch (\"\\\\ \" statt \"\\\\\\\\ \")!"
    echo "$ROWBREAK"
    echo "   → Zeilenumbrüche in Matrix/cases: \"\\\\ \" (vier Backslashes + Leerzeichen)."
    echo ""
    ERRORS=$((ERRORS + 1))
  fi

  # Zeilenumbruch am Zeilenende ("\\ " direkt vor dem Newline): ebenfalls falsch.
  ROWBREAK_EOL=$(grep -nP '(?<![\\])\\{2} $' "$FILE" 2>/dev/null | head -5)

  if [ -n "$ROWBREAK_EOL" ]; then
    echo "❌ $FILE: Zeilenumbruch-Escaping am Zeilenende falsch!"
    echo "$ROWBREAK_EOL"
    echo "   → Zeilenumbrüche in Matrix/cases: \"\\\\ \" (vier Backslashes + Leerzeichen)."
    echo ""
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -gt 0 ]; then
  echo "═══════════════════════════════════════════════════"
  echo "❌ $ERRORS Datei(en) mit LaTeX-Fehlern gefunden!"
  echo ""
  echo "Fix: Ersetze \frac → \\frac, \cdot → \\cdot, etc."
  echo "In Template-Literals (Backticks) wird \f als Form-Feed,"
  echo "\t als Tab, \n als Newline interpretiert."
  echo "Fix-Skript: npx tsx scripts/fix-latex-escapes.ts [--apply]"
  echo "═══════════════════════════════════════════════════"
  exit 1
else
  echo "✅ LaTeX-Validierung bestanden — alle Backslashes korrekt."
  exit 0
fi
