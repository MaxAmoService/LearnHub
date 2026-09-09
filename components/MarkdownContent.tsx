"use client";

// Gemeinsamer Markdown-artiger Renderer für Lektions-Inhalte und Merkblätter.
// Unterstützt: #/##/###-Überschriften, Tabellen, Callouts (> 💡, > [!TIP] …),
// ```-Codeblöcke, $...$ und $$...$$-Mathe, <svg>-Blöcke, 🎬-Video-Embeds,
// [GUIDED_START]/[PRACTICE_START]-Blöcke, [!EXERCISE]-Inline-Übungen,
// [INTERACTIVE]-Marker und nummerierte/unnummerierte Listen.

import { CodeBlock } from "./CodeBlock";
import { MathBlock } from "./MathBlock";
import { InlineText } from "./InlineText";
import { GuidedExercise } from "./GuidedExercise";
import { PracticeExercises } from "./PracticeExercises";
import InlineExercise from "./InlineExercise";

export interface MarkdownContentProps {
  content: string;
  /** Kompakte Darstellung für Merkblätter (kleinere Schrift, engere Abstände). */
  compact?: boolean;
  /** Renderer für [INTERACTIVE]-Marker — null = Marker wird übersprungen. */
  renderInteractive?: (type: string) => React.ReactNode | null;
}

export function MarkdownContent({ content, compact = false, renderInteractive }: MarkdownContentProps) {
  const elements: JSX.Element[] = [];
  const lines = content.split("\n");
  const skipLines = new Set<number>();
  let inCodeBlock = false;
  let codeContent = "";
  let codeLang = "";
  let inMathBlock = false;
  let mathContent = "";
  let inSvgBlock = false;
  let svgContent = "";
  let inTable = false;
  let tableHeadRow: JSX.Element | null = null;
  let tableBodyRows: JSX.Element[] = [];
  let olItems: JSX.Element[] = [];
  let tableIsFirstRow = true;
  let keyIndex = 0;

  const C = {
    h1: compact ? "text-lg font-bold text-white mt-4 mb-2" : "text-3xl font-bold text-white mt-8 mb-4",
    h2: compact ? "text-base font-semibold text-yellow-400 mt-4 mb-2" : "text-2xl font-semibold mt-8 mb-4",
    h3: compact ? "text-sm font-semibold text-slate-200 mt-3 mb-1" : "text-2xl font-semibold text-slate-200 mt-6 mb-3",
    p: compact ? "text-slate-300 mb-1 text-xs" : "text-slate-200 mb-5",
    ol: compact ? "my-2 space-y-1" : "my-4 space-y-2",
    li: compact ? "text-slate-300 ml-4 mb-0.5 text-xs" : "text-slate-200 ml-4 mb-3",
    spacing: compact ? "h-2" : "h-4",
  };

  const flushOl = () => {
    if (olItems.length > 0) {
      elements.push(
        <ol key={`ol-${keyIndex++}`} className={`${C.ol} list-decimal list-inside marker:text-blue-400 marker:font-bold`}>
          {olItems}
        </ol>
      );
      olItems = [];
    }
  };

  // Exercise block state
  let exerciseBlock: { question: string; options: { key: string; text: string }[]; answer: string; explanation: string } | null = null;
  let inExercise = false;
  const flushExercise = () => {
    if (exerciseBlock && exerciseBlock.question) {
      elements.push(
        <InlineExercise
          key={`ex-${keyIndex++}`}
          question={exerciseBlock.question}
          options={exerciseBlock.options.length > 0 ? exerciseBlock.options : undefined}
          answer={exerciseBlock.answer}
          explanation={exerciseBlock.explanation || undefined}
        />
      );
    }
    exerciseBlock = null;
    inExercise = false;
  };

  const flushTable = () => {
    if (tableHeadRow || tableBodyRows.length > 0) {
      elements.push(
        <div key={`table-wrap-${keyIndex++}`} className="overflow-x-auto my-6 rounded-xl border border-slate-700/60 shadow-lg shadow-black/10">
          <table className="w-full border-separate border-spacing-0">
            {tableHeadRow && <thead>{tableHeadRow}</thead>}
            <tbody>{tableBodyRows}</tbody>
          </table>
        </div>
      );
      tableHeadRow = null;
      tableBodyRows = [];
      inTable = false;
      tableIsFirstRow = true;
    }
  };

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    if (skipLines.has(lineIndex)) continue;
    // Flush exercise block when non-`>` line encountered
    if (inExercise && !line.startsWith("> ")) flushExercise();
    // Block math $$...$$
    if (line.trim().startsWith("$$") && !inCodeBlock) {
      flushTable();
      if (inMathBlock) {
        elements.push(<MathBlock key={`math-${keyIndex++}`} math={mathContent.trim()} display={true} />);
        mathContent = "";
        inMathBlock = false;
      } else {
        const rest = line.trim().slice(2);
        if (rest.endsWith("$$")) {
          elements.push(<MathBlock key={`math-${keyIndex++}`} math={rest.slice(0, -2).trim()} display={true} />);
        } else {
          inMathBlock = true;
          mathContent = rest + "\n";
        }
      }
      continue;
    }

    if (inMathBlock) {
      if (line.trim().endsWith("$$")) {
        mathContent += line.trim().slice(0, -2);
        elements.push(<MathBlock key={`math-${keyIndex++}`} math={mathContent.trim()} display={true} />);
        mathContent = "";
        inMathBlock = false;
      } else {
        mathContent += line + "\n";
      }
      continue;
    }

    // SVG block
    if (line.trim().startsWith("<svg")) {
      flushTable();
      flushOl();
      inSvgBlock = true;
      svgContent = line + "\n";
      if (line.includes("</svg>")) {
        inSvgBlock = false;
        elements.push(<div key={`svg-${keyIndex++}`} className="my-6 mx-auto max-w-md overflow-x-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />);
        svgContent = "";
      }
      continue;
    }

    // Code block
    if (line.startsWith("```")) {
      flushTable();
      flushOl();
      if (inCodeBlock) {
        elements.push(<CodeBlock key={`code-${keyIndex++}`} code={codeContent.trim()} language={codeLang || "tsx"} />);
        codeContent = "";
        inCodeBlock = false;
      } else {
        codeLang = line.slice(3).trim();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + "\n";
      continue;
    }

    if (inSvgBlock) {
      svgContent += line + "\n";
      if (line.includes("</svg>")) {
        inSvgBlock = false;
        elements.push(<div key={`svg-${keyIndex++}`} className="my-6 mx-auto max-w-md overflow-x-auto" dangerouslySetInnerHTML={{ __html: svgContent }} />);
        svgContent = "";
      }
      continue;
    }

    // Table row
    if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushOl();
      const cells = line.split("|").filter((c, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
      // Skip separator row and rows where all cells are empty
      if (!cells.every(c => /^[\s:-]*$/.test(c)) && cells.some(c => c.trim().length > 0)) {
        inTable = true;
        const isHeader = tableIsFirstRow;
        tableIsFirstRow = false;
        const row = (
          <tr key={`tr-${keyIndex++}`} className={`border-b border-slate-700/30 last:border-0 transition-colors duration-150 ${isHeader ? "" : "hover:bg-slate-800/60"}`}>
            {cells.map((cell, ci) => (
              isHeader ? (
                <th key={ci} className={`px-5 py-3.5 text-left text-sm font-semibold text-blue-100 bg-gradient-to-b from-blue-500/20 to-blue-500/10 border-b-2 border-blue-500/40 first:rounded-tl-xl last:rounded-tr-xl ${ci !== 0 ? "border-l border-slate-700/20" : ""}`}>
                  <InlineText text={cell} />
                </th>
              ) : (
                <td key={ci} className={`px-5 py-3 text-slate-200 bg-slate-800/30 ${ci !== 0 ? "border-l border-slate-700/20" : ""}`}>
                  <InlineText text={cell} />
                </td>
              )
            ))}
          </tr>
        );
        if (isHeader) {
          tableHeadRow = row;
        } else {
          tableBodyRows.push(row);
        }
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Headers
    if (line.startsWith("# ")) {
      flushTable();
      flushOl();
      elements.push(<h1 key={`h-${keyIndex++}`} className={C.h1}><InlineText text={line.slice(2)} /></h1>);
    } else if (line.startsWith("## ")) {
      flushTable();
      flushOl();
      const headingText = line.slice(3);
      const isMerkblatt = headingText.includes("Merkblatt");
      const isZusammenfassung = headingText.includes("Zusammenfassung");
      const hasEmoji = /^[^\w\s]/.test(headingText);
      elements.push(
        <h2 key={`h-${keyIndex++}`} className={`${C.h2} ${isMerkblatt || isZusammenfassung ? "text-yellow-400" : "text-blue-400"}`}>
          {isMerkblatt && !hasEmoji && "📋 "}{isZusammenfassung && !hasEmoji && "📝 "}<InlineText text={headingText} />
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushTable();
      flushOl();
      elements.push(<h3 key={`h-${keyIndex++}`} className={C.h3}><InlineText text={line.slice(4)} /></h3>);
    }
    // Callout boxes: > 💡 text or > [!TIP] text etc.
    else if (line.startsWith("> ")) {
      flushOl();
      const raw = line.slice(2);
      const calloutTypes: Record<string, { bg: string; border: string; icon: string; label: string; text: string }> = {
        "💡": { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "💡", label: "Tipp", text: "text-blue-200" },
        "[!TIP]": { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "💡", label: "Tipp", text: "text-blue-200" },
        "⚠️": { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Achtung", text: "text-amber-200" },
        "[!WARNING]": { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Achtung", text: "text-amber-200" },
        "ℹ️": { bg: "bg-cyan-500/10", border: "border-cyan-500/40", icon: "ℹ️", label: "Info", text: "text-cyan-200" },
        "[!INFO]": { bg: "bg-cyan-500/10", border: "border-cyan-500/40", icon: "ℹ️", label: "Info", text: "text-cyan-200" },
        "❗": { bg: "bg-purple-500/10", border: "border-purple-500/40", icon: "❗", label: "Wichtig", text: "text-purple-200" },
        "[!IMPORTANT]": { bg: "bg-purple-500/10", border: "border-purple-500/40", icon: "❗", label: "Wichtig", text: "text-purple-200" },
        "✅": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "✅", label: "Merke", text: "text-emerald-200" },
        "[!SUCCESS]": { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "✅", label: "Merke", text: "text-emerald-200" },
        "📝": { bg: "bg-slate-500/10", border: "border-slate-500/40", icon: "📝", label: "Notiz", text: "text-slate-300" },
        "[!NOTE]": { bg: "bg-slate-500/10", border: "border-slate-500/40", icon: "📝", label: "Notiz", text: "text-slate-300" },
      };
      let matched = false;

      // Exercise block: collect multi-line exercise
      if (raw.startsWith("[!EXERCISE]")) {
        if (inExercise) flushExercise();
        inExercise = true;
        exerciseBlock = { question: raw.slice("[!EXERCISE]".length).trim(), options: [], answer: "", explanation: "" };
        matched = true;
      } else if (inExercise && exerciseBlock) {
        const optionMatch = raw.match(/^([A-D])\)\s*(.+)/);
        if (optionMatch) {
          exerciseBlock.options.push({ key: optionMatch[1], text: optionMatch[2] });
        } else if (raw.startsWith("ANSWER:")) {
          exerciseBlock.answer = raw.slice("ANSWER:".length).trim();
        } else if (/^\[!/.test(raw)) {
          // Non-exercise callout → flush exercise, process normally
          flushExercise();
        } else if (exerciseBlock.answer) {
          exerciseBlock.explanation += (exerciseBlock.explanation ? " " : "") + raw;
        } else {
          exerciseBlock.question += " " + raw;
        }
        if (inExercise) matched = true;
      } else if (inExercise) {
        flushExercise();
      }

      // 🎬 Video embed
      if (raw.startsWith("🎬")) {
        const videoContent = raw.slice(2).trim();
        const urlMatch = videoContent.match(/https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
        const videoId = urlMatch ? urlMatch[1] : null;
        const titleMatch = videoContent.match(/\*\*(.+?)\*\*/);
        const title = titleMatch ? titleMatch[1] : "Video";
        const descMatch = videoContent.match(/—\s*(.+)$/);
        const description = descMatch ? descMatch[1] : "";
        if (videoId) {
          elements.push(
            <div key={`video-${keyIndex++}`} className="my-4 rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
              <div className="px-4 py-2.5 bg-gradient-to-r from-red-500/10 to-red-600/5 border-b border-slate-700/50 flex items-center gap-2">
                <span className="text-lg">🎬</span>
                <span className="text-sm font-semibold text-red-300">{title}</span>
                <span className="text-xs text-slate-500 ml-auto">3Blue1Brown</span>
              </div>
              {description && <p className="px-4 py-1.5 text-xs text-slate-400 bg-slate-900/30">{description}</p>}
              <div className="relative" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          );
          matched = true;
        }
      }
      if (!matched) {
        for (const [key, style] of Object.entries(calloutTypes)) {
          if (raw.startsWith(key)) {
            const contentText = raw.slice(key.length).trim();
            elements.push(
              <div key={`callout-${keyIndex++}`} className={`my-4 p-4 rounded-xl border-l-4 ${style.bg} ${style.border} flex items-start gap-3`}>
                <span className="text-lg mt-0.5 shrink-0">{style.icon}</span>
                <div>
                  <span className={`text-sm font-bold uppercase tracking-wider ${style.text} opacity-70`}>{style.label}</span>
                  <p className={`${style.text} text-base mt-1 leading-relaxed`}><InlineText text={contentText} /></p>
                </div>
              </div>
            );
            matched = true;
            break;
          }
        }
      }
      if (!matched) {
        // Regular blockquote
        elements.push(
          <blockquote key={`bq-${keyIndex++}`} className="my-3 pl-4 border-l-2 border-slate-600 text-slate-400 italic">
            <InlineText text={raw} />
          </blockquote>
        );
      }
    }
    // List items
    else if (line.startsWith("- ")) {
      flushOl();
      const text = line.slice(2);
      elements.push(<li key={`li-${keyIndex++}`} className={`${C.li} list-none pl-5 relative before:content-[''] before:absolute before:left-1.5 before:top-[0.6em] before:w-2 before:h-2 before:rounded-full before:bg-blue-400/70`}><InlineText text={text} /></li>);
    } else if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      olItems.push(<li key={`oli-${keyIndex++}`} className={`${C.li}`}><InlineText text={text} /></li>);
    }
    // Styled divider (---)
    else if (line.trim() === "---") {
      flushOl();
      elements.push(
        <div key={`divider-${keyIndex++}`} className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </div>
      );
    }
    // Guided Exercise markers
    else if (line.trim() === "[GUIDED_START]") {
      flushOl();
      try {
        const guidedSteps: string[] = [];
        let guidedTitle = "";
        let guidedResult = "";
        let gi = lineIndex + 1;
        while (gi < lines.length && lines[gi].trim() !== "[GUIDED_END]") {
          const gl = lines[gi].trim();
          if (gl.startsWith("TITLE:")) {
            guidedTitle = gl.slice(6).trim();
            gi++;
          } else if (gl === "[STEP]") {
            gi++;
            let stepContent = "";
            while (gi < lines.length) {
              const sl = lines[gi].trim();
              if (sl === "[STEP]" || sl === "[RESULT]" || sl === "[GUIDED_END]") break;
              stepContent += (stepContent ? "\n" : "") + lines[gi];
              gi++;
            }
            guidedSteps.push(stepContent.trim());
          } else if (gl === "[RESULT]") {
            gi++;
            let resultContent = "";
            while (gi < lines.length) {
              if (lines[gi].trim() === "[GUIDED_END]") break;
              resultContent += (resultContent ? "\n" : "") + lines[gi];
              gi++;
            }
            guidedResult = resultContent.trim();
          } else {
            gi++;
          }
        }
        for (let skip = lineIndex; skip <= gi; skip++) {
          skipLines.add(skip);
        }
        if (guidedSteps.length > 0 && guidedResult) {
          elements.push(
            <GuidedExercise key={`guided-${keyIndex++}`} title={guidedTitle} steps={guidedSteps} result={guidedResult} />
          );
        }
      } catch (e) {
        console.error("GuidedExercise parse error:", e);
      }
    }
    // Practice Exercises markers
    else if (line.trim() === "[PRACTICE_START]") {
      try {
        const practiceExercises: { question: string; answer: string }[] = [];
        let practiceTitle = "Übung";
        let pi = lineIndex + 1;
        while (pi < lines.length && lines[pi].trim() !== "[PRACTICE_END]") {
          const pl = lines[pi].trim();
          if (pl.startsWith("TITLE:")) {
            practiceTitle = pl.slice(6).trim();
            pi++;
          } else if (pl === "[Q]") {
            pi++;
            let question = "";
            while (pi < lines.length && lines[pi].trim() !== "[A]" && lines[pi].trim() !== "[PRACTICE_END]") {
              question += (question ? " " : "") + lines[pi].trim();
              pi++;
            }
            if (pi < lines.length && lines[pi].trim() === "[A]") pi++;
            let answer = "";
            while (pi < lines.length && lines[pi].trim() !== "[Q]" && lines[pi].trim() !== "[PRACTICE_END]") {
              answer += (answer ? " " : "") + lines[pi].trim();
              pi++;
            }
            if (question && answer) {
              practiceExercises.push({ question: question.trim(), answer: answer.trim() });
            }
            pi--;
          }
          pi++;
        }
        for (let skip = lineIndex; skip <= pi; skip++) {
          skipLines.add(skip);
        }
        if (practiceExercises.length > 0) {
          elements.push(
            <PracticeExercises key={`practice-${keyIndex++}`} title={practiceTitle} exercises={practiceExercises} />
          );
        }
      } catch (e) {
        console.error("PracticeExercises parse error:", e);
      }
    }
    else if (!line.trim()) {
      elements.push(<div key={`br-${keyIndex++}`} className={C.spacing} />);
    }
    // Interactive marker — supports [INTERACTIVE] and [INTERACTIVE:type]
    else if (
      renderInteractive &&
      (line.trim() === "[INTERACTIVE]" || line.trim().startsWith("[INTERACTIVE:"))
    ) {
      flushOl();
      let specificType = "";
      const match = line.trim().match(/^\[INTERACTIVE:(\w+)\]$/);
      if (match) {
        specificType = match[1];
      }
      const interactiveEl = renderInteractive(specificType);
      if (interactiveEl) {
        elements.push(
          <div key={`interactive-${keyIndex++}`} className="my-8">
            {interactiveEl}
          </div>
        );
      }
    }
    // Regular paragraph
    else {
      flushOl();
      elements.push(<p key={`p-${keyIndex++}`} className={`${C.p} leading-relaxed`}><InlineText text={line} /></p>);
    }
  }

  flushOl();
  flushTable();
  flushExercise();
  return <>{elements}</>;
}
