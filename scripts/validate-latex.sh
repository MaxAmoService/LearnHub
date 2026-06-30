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
  "lib/thowlData.ts"
  "lib/uxData.ts"
  "lib/wachstumsprozesseData.ts"
  "lib/thowl/mathe1Data.ts"
  "lib/thowl/adData.ts"
  "lib/thowl/dbData.ts"
  "lib/thowl/kbData.ts"
  "lib/thowl/kiData.ts"
  "lib/thowl/mlData.ts"
  "lib/thowl/englischData.ts"
  "lib/thowl/mathe2Data.ts"
  "lib/thowl/mathe2Altklausur210417.ts"
  "lib/thowl/mathe2Altklausur220201.ts"
  "lib/thowl/mathe2Altklausur220715.ts"
  "lib/thowl/mathe2Altklausur230714.ts"
  "lib/thowl/mathe2Altklausur240206.ts"
  "lib/thowl/mathe2Altklausur240724.ts"
  "lib/thowl/mathe2Altklausur250204.ts"
  "lib/thowl/mathe2Altklausur260203.ts"
  "lib/thowl/mathe3Data.ts"
  "lib/thowl/mathe3Altklausur180718.ts"
  "lib/thowl/mathe3Altklausur190205.ts"
  "lib/thowl/mathe3Altklausur190716.ts"
  "lib/thowl/mathe3Altklausur200204.ts"
  "lib/thowl/mathe3Altklausur220922.ts"
  "lib/thowl/mathe3Altklausur230928.ts"
  "lib/thowl/mathe3Altklausur240403.ts"
  "lib/thowl/mathe3Altklausur240924.ts"
  "lib/thowl/mathe3Altklausur250326.ts"
  "lib/thowl/sysData.ts"
  "lib/thowl/vsData.ts"
  "lib/thowl/kubData.ts"
  "lib/thowl/wvData.ts"
)

# LaTeX-Befehle die NICHT als Escape-Sequenz interpretiert werden dürfen
LATEX_CMDS="frac\|cdot\|text\|sqrt\|lim\|int\|sum\|infty\|sin\|cos\|tan\|ln\|log\|theta\|phi\|pi\|alpha\|beta\|gamma\|varphi\|partial\|nabla\|overline\|mathbb\|Rightarrow\|begin\|end\|left\|right\|times\|pm\|leq\|geq\|neq\|approx\|cap\|cup\|subset\|notin\|emptyset\|hat\|bar\|vec\|dot\|bmod"

ERRORS=0

for FILE in "${FILES[@]}"; do
  if [ ! -f "$FILE" ]; then
    continue
  fi

  # Suche nach einzelnen Backslashes vor LaTeX-Befehlen
  # Einzelner Backslash = 0x5c, gefolgt von LaTeX-Befehl
  # Aber NICHT 0x5c 0x5c (doppelte Backslashes = korrekt)
  
  # Mit grep: suche nach \frac etc. die NICHT von einem weiteren \ vorangestellt werden
  # -P = Perl-Regex, (?<!\\) = nicht vorangestellter Backslash
  FOUND=$(grep -nP "(?<!\\\\)\\\\($LATEX_CMDS)" "$FILE" 2>/dev/null | head -5)
  
  if [ -n "$FOUND" ]; then
    echo "❌ $FILE: Einzelne Backslashes gefunden!"
    echo "$FOUND"
    echo "   → Diese müssen als \\\\ (doppelt) geschrieben werden."
    echo ""
    ERRORS=$((ERRORS + 1))
  fi
done

if [ $ERRORS -gt 0 ]; then
  echo "═══════════════════════════════════════════════════"
  echo "❌ $ERRORS Datei(en) mit LaTeX-Fehlern gefunden!"
  echo ""
  echo "Fix: Ersetze \\frac → \\\\frac, \\cdot → \\\\cdot, etc."
  echo "In Template-Literals (Backticks) wird \\f als Form-Feed,"
  echo "\\t als Tab, \\n als Newline interpretiert."
  echo "═══════════════════════════════════════════════════"
  exit 1
else
  echo "✅ LaTeX-Validierung bestanden — alle Backslashes korrekt."
  exit 0
fi
