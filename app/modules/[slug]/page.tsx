"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { getModule, Lesson, categories } from "@/lib/data";
import { isExtendedUnlocked, ExtendedGate } from "@/components/AdvancedGate";
import { ProgressBar } from "@/components/ProgressBar";
import { LessonViewer } from "@/components/LessonViewer";
import { Quiz } from "@/components/Quiz";
import { LoginModal } from "@/components/LoginModal";
import { MathBlock } from "@/components/MathBlock";
import { InlineText } from "@/components/InlineText";
import { InteractiveExercise } from "@/components/InteractiveExercise";
import { getExercisesForLesson, getExamExercises } from "@/lib/mathExercises";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Play,
  FileText,
  Code,
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Target,
  Layers,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { FlashcardViewer } from "@/components/FlashcardViewer";
import { getFlashcardsForModule } from "@/lib/flashcardData";
import { fireConfetti } from "@/components/Confetti";
import { triggerXPPopup } from "@/components/XPNotification";
import { playComplete, playLevelUp } from "@/lib/sounds";

// Merkblatt Content Component with full Markdown support
function MerkblattContent({ content }: { content: string }) {
  const elements: JSX.Element[] = [];
  const lines = content.split("\n");
  let tableHeadRow: JSX.Element | null = null;
  let tableBodyRows: JSX.Element[] = [];
  let tableKey = 0;
  let elementKey = 0;

  let isTableHeaderRow = true;
  const flushTable = () => {
    if (tableHeadRow || tableBodyRows.length > 0) {
      elements.push(
        <div key={`table-${tableKey++}`} className="overflow-x-auto my-3">
          <table className="w-full border-collapse text-xs">
            {tableHeadRow && <thead>{tableHeadRow}</thead>}
            <tbody>{tableBodyRows}</tbody>
          </table>
        </div>
      );
      tableHeadRow = null;
      tableBodyRows = [];
    }
    isTableHeaderRow = true;
  };

  lines.forEach((line) => {
    // Table row
    if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line.split("|").filter((_, i, arr) => i > 0 && i < arr.length - 1).map(c => c.trim());
      // Skip separator rows (--- | --- | ---)
      if (cells.every(c => /^[\s:-]*$/.test(c)) || cells.every(c => c.trim().length === 0)) {
        isTableHeaderRow = false;
        return;
      }
      const isHeader = isTableHeaderRow;
      isTableHeaderRow = false;
      const row = (
        <tr key={`tr-${elementKey++}`} className="border-b border-slate-700/50">
          {cells.map((cell, ci) => (
            isHeader ? (
              <th key={ci} className="px-3 py-2.5 text-left text-sm font-bold text-blue-200 bg-blue-500/15 border-b-2 border-blue-500/30">
                <InlineText text={cell} />
              </th>
            ) : (
              <td key={ci} className="px-3 py-1.5 text-slate-300 bg-slate-800/30">
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
      return;
    }

    // Flush table if not a table row
    flushTable();

    // Headings
    if (line.startsWith("### ")) {
      elements.push(<h4 key={elementKey++} className="text-sm font-semibold text-slate-200 mt-3 mb-1"><InlineText text={line.slice(4)} /></h4>);
    } else if (line.startsWith("## ")) {
      elements.push(<h3 key={elementKey++} className="text-base font-semibold text-yellow-400 mt-4 mb-2"><InlineText text={line.slice(3)} /></h3>);
    } else if (line.startsWith("# ")) {
      elements.push(<h2 key={elementKey++} className="text-lg font-bold text-white mt-4 mb-2"><InlineText text={line.slice(2)} /></h2>);
    } else if (line.startsWith("- ")) {
      elements.push(<li key={elementKey++} className="text-slate-300 ml-4 mb-0.5 list-disc list-inside text-xs"><InlineText text={line.slice(2)} /></li>);
    } else if (line.trim()) {
      elements.push(<p key={elementKey++} className="text-slate-300 mb-1 text-xs"><InlineText text={line} /></p>);
    }
  });

  flushTable(); // Flush any remaining table

  return <div className="space-y-1">{elements}</div>;
}

export default function ModulePage() {
  const params = useParams();
  const { user, completeLesson, toggleSaveModule } = useAuth();
  const module = getModule(params.slug as string);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showMerkblatt, setShowMerkblatt] = useState(false);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [showModuleComplete, setShowModuleComplete] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => {
    // Start with all groups collapsed
    const names = new Set<string>();
    for (const l of (module?.lessons || [])) {
      if (l.group) names.add(l.group);
    }
    return names;
  });

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupName)) next.delete(groupName);
      else next.add(groupName);
      return next;
    });
  };

  if (!module) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-400">Modul nicht gefunden</h1>
        <Link href="/modules" className="text-blue-400 hover:underline mt-4 block">
          Zurück zu allen Modulen
        </Link>
      </div>
    );
  }

  // Passwortschutz für Erweitert-Module (Direktlink)
  const moduleCategory = categories.find((c) => c.id === module.category);
  if (moduleCategory?.password && !isExtendedUnlocked()) {
    return (
      <ExtendedGate password={moduleCategory.password} categoryName={moduleCategory.name}>
        <div />
      </ExtendedGate>
    );
  }

  // Get completed lessons ONLY from user data (no localStorage fallback to prevent ghost progress)
  const allCompleted = user?.completedLessons[params.slug as string] || [];
  // Nur echte Lektion-IDs zählen ("quiz" etc. ausschließen)
  const lessonIds = new Set(module.lessons.map(l => l.id));
  const completedLessons = new Set(allCompleted.filter(id => lessonIds.has(id)));

  // Index der ersten Übungslektion (für Trennung Lerninhalte / Übungen)
  const firstExerciseIndex = module.lessons.findIndex(l => l.type === "exercises");
  const regularLessons = module.lessons.filter(l => l.type !== "exercises");
  const exerciseLessons = module.lessons.filter(l => l.type === "exercises");

  // Gruppiere Lektionen nach group-Feld für einklappbare Sidebar-Sektionen
  const lessonGroups: { name: string; lessons: typeof regularLessons }[] = [];
  const ungroupedLessons: typeof regularLessons = [];
  for (const lesson of regularLessons) {
    if (lesson.group) {
      const lastGroup = lessonGroups[lessonGroups.length - 1];
      if (lastGroup && lastGroup.name === lesson.group) {
        lastGroup.lessons.push(lesson);
      } else {
        lessonGroups.push({ name: lesson.group, lessons: [lesson] });
      }
    } else {
      ungroupedLessons.push(lesson);
    }
  }

  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video": return <Play className="w-4 h-4" />;
      case "text": return <FileText className="w-4 h-4" />;
      case "interactive": return <Code className="w-4 h-4" />;
      case "quiz": return <HelpCircle className="w-4 h-4" />;
      case "exercises": return <Target className="w-4 h-4" />;
    }
  };

  const markComplete = (lessonId: string) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    // Nicht doppelt abschließen
    if (completedLessons.has(lessonId)) return;

    // Lektion abschließen
    completeLesson(module.slug, lessonId);

    // XP-Popup anzeigen
    triggerXPPopup(10);

    // Prüfen ob jetzt alle Lektionen fertig sind
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    if (newCompleted.size >= module.lessons.length) {
      // Modul komplett! 🎉
      fireConfetti();
      setTimeout(() => fireConfetti(), 300);
      setTimeout(() => fireConfetti(), 600);
      playLevelUp();
      setShowModuleComplete(true);
    } else {
      fireConfetti();
      playComplete();
    }
  };

  const goToNextLesson = () => {
    if (!selectedLesson) return;
    const currentIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
    if (currentIndex < module.lessons.length - 1) {
      setSelectedLesson(module.lessons[currentIndex + 1]);
    }
  };

  const hasNextLesson = () => {
    if (!selectedLesson) return false;
    const currentIndex = module.lessons.findIndex(l => l.id === selectedLesson.id);
    return currentIndex < module.lessons.length - 1;
  };

  const isSaved = user?.savedModules?.includes(module.slug) || false;
  const progress = Math.min(100, Math.round((completedLessons.size / module.lessons.length) * 100));

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="mb-8">
        <Link
          href="/modules"
          className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück zu allen Modulen
        </Link>
        <div className="flex items-start gap-3 sm:gap-4">
          <span className="text-3xl sm:text-5xl">{module.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1 sm:mb-2">
              <h1 className="text-xl sm:text-3xl font-bold">{module.title}</h1>
              {user && (
                <button
                  onClick={() => toggleSaveModule(module.slug)}
                  className="p-2 rounded-lg hover:bg-slate-800/80 transition-colors flex-shrink-0"
                  title={isSaved ? "Aus Merkliste entfernen" : "Modul merken"}
                >
                  {isSaved ? (
                    <BookmarkCheck className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                  )}
                </button>
              )}
            </div>
            <p className="text-slate-400 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-none">{module.description}</p>
            <div className="max-w-md">
              <ProgressBar value={progress} />
              <p className="text-sm text-slate-400 mt-2">
                {completedLessons.size} von {module.lessons.length} Lektionen abgeschlossen
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Lesson List — Mobile: oben als Dropdown, Desktop: Sidebar */}
        <aside className="lg:col-span-1">
          {/* Mobile: Auswahlliste */}
          <div className="lg:hidden mb-4">
            {/* Flashcard Button Mobile */}
            {getFlashcardsForModule(module.slug).length > 0 && (
              <button
                onClick={() => { setShowFlashcards(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="w-full mb-2 flex items-center justify-center gap-2 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg text-sm text-purple-300 font-medium"
              >
                <Layers className="w-4 h-4" /> 🃏 Karteikarten lernen
              </button>
            )}
            <select
              value={selectedLesson?.id || ""}
              onChange={(e) => {
                const lesson = module.lessons.find((l) => l.id === e.target.value);
                if (lesson) { setSelectedLesson(lesson); setShowFlashcards(false); window.scrollTo({ top: 0, behavior: "smooth" }); }
              }}
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 text-sm border border-slate-600"
            >
              <option value="">📖 Lektion wählen...</option>
              {ungroupedLessons.map((lesson, index) => (
                <option key={lesson.id} value={lesson.id}>
                  {completedLessons.has(lesson.id) ? "✅" : "⬜"} {index + 1}. {lesson.title} ({lesson.duration})
                </option>
              ))}
              {lessonGroups.map(group => (
                <optgroup key={group.name} label={`── ${group.name} ──`}>
                  {group.lessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {completedLessons.has(lesson.id) ? "✅" : "⬜"} {lesson.title} ({lesson.duration})
                    </option>
                  ))}
                </optgroup>
              ))}
              {exerciseLessons.length > 0 && (
                <optgroup label="── Übungen ──">
                  {exerciseLessons.map((lesson) => (
                    <option key={lesson.id} value={lesson.id}>
                      {completedLessons.has(lesson.id) ? "✅" : "⬜"} {lesson.title} ({lesson.duration})
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            {/* Merkblatt Mobile */}
            {module.merkblatt && (
              <button
                onClick={() => setShowMerkblatt(!showMerkblatt)}
                className="w-full mt-2 flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm"
              >
                <span className="flex items-center gap-2 text-yellow-400 font-medium">
                  <BookOpen className="w-4 h-4" /> Merkblatt
                </span>
                {showMerkblatt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
            {showMerkblatt && module.merkblatt && (
              <div className="mt-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
                <MerkblattContent content={module.merkblatt} />
              </div>
            )}
          </div>

          {/* Desktop: Sticky Sidebar */}
          <div className="hidden lg:block glass rounded-xl p-2 sticky top-24">
            {/* Merkblatt */}
            {module.merkblatt && (
              <div className="mb-6">
                <button
                  onClick={() => setShowMerkblatt(!showMerkblatt)}
                  className="w-full flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-colors"
                >
                  <span className="flex items-center gap-2 text-yellow-400 font-medium">
                    <BookOpen className="w-5 h-5" />
                    Merkblatt
                  </span>
                  {showMerkblatt ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showMerkblatt && (
                  <div className="mt-2 p-4 bg-slate-800/50 rounded-lg border border-slate-700 text-sm">
                    <MerkblattContent content={module.merkblatt} />
                  </div>
                )}
              </div>
            )}
            <h2 className="text-lg font-semibold mb-4">Lektionen</h2>
            {/* Flashcard Button */}
            {getFlashcardsForModule(module.slug).length > 0 && (
              <button
                onClick={() => { setShowFlashcards(true); }}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors mb-2 ${
                  showFlashcards
                    ? "bg-purple-500/20 border border-purple-500/50"
                    : "bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30"
                }`}
              >
                <div className="p-1.5 rounded bg-purple-500/30">
                  <Layers className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-purple-300">🃏 Karteikarten</p>
                  <p className="text-xs text-purple-400/70">Spaced Repetition</p>
                </div>
              </button>
            )}
            <nav className="space-y-1">
              {/* Ungrouped lessons (flat list) */}
              {ungroupedLessons.map((lesson, index) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isSelected = selectedLesson?.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => { setSelectedLesson(lesson); setShowFlashcards(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-full text-left p-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                      isSelected ? "bg-blue-500/20 border border-blue-500/50" : "hover:bg-slate-800/50"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isCompleted ? "text-slate-400" : "text-white"}`}>
                        {index + 1}. {lesson.title}
                      </p>
                      <p className="text-[11px] text-slate-500">{lesson.duration}</p>
                    </div>
                    <div className={`p-1 rounded ${isSelected ? "bg-blue-500/30" : "bg-slate-700"}`}>
                      {getLessonIcon(lesson.type)}
                    </div>
                  </button>
                );
              })}

              {/* Grouped lessons (collapsible sections) */}
              {lessonGroups.map((group, gi) => {
                const isCollapsed = collapsedGroups.has(group.name);
                const completedInGroup = group.lessons.filter(l => completedLessons.has(l.id)).length;
                const totalInGroup = group.lessons.length;
                const anySelected = group.lessons.some(l => selectedLesson?.id === l.id);
                return (
                  <div key={group.name} className={gi > 0 || ungroupedLessons.length > 0 ? "mt-1" : ""}>
                    {/* Group Header */}
                    <button
                      onClick={() => toggleGroup(group.name)}
                      className={`w-full text-left p-2.5 rounded-lg flex items-center gap-2 transition-colors ${
                        anySelected ? "bg-blue-500/10 border border-blue-500/30" : "hover:bg-slate-800/50"
                      }`}
                    >
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      )}
                      <span className="text-sm font-semibold text-slate-300 flex-1 truncate">{group.name}</span>
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                        completedInGroup === totalInGroup
                          ? "bg-green-500/20 text-green-400"
                          : completedInGroup > 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-slate-700 text-slate-500"
                      }`}>
                        {completedInGroup}/{totalInGroup}
                      </span>
                    </button>

                    {/* Group Lessons */}
                    {!isCollapsed && (
                      <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-slate-700/50 pl-2">
                        {group.lessons.map((lesson, idx) => {
                          const isCompleted = completedLessons.has(lesson.id);
                          const isSelected = selectedLesson?.id === lesson.id;
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => { setSelectedLesson(lesson); setShowFlashcards(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                              className={`w-full text-left p-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                                isSelected ? "bg-blue-500/20 border border-blue-500/50" : "hover:bg-slate-800/50"
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-medium truncate ${isCompleted ? "text-slate-400" : "text-white"}`}>
                                  {idx + 1}. {lesson.title}
                                </p>
                                <p className="text-[11px] text-slate-500">{lesson.duration}</p>
                              </div>
                              <div className={`p-1 rounded ${isSelected ? "bg-blue-500/30" : "bg-slate-700"}`}>
                                {getLessonIcon(lesson.type)}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Übungen */}
              {exerciseLessons.length > 0 && (
                <>
                  <div className="pt-4 mt-3 border-t border-slate-700/50">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1 pb-2">Übungen</p>
                  </div>
                  {exerciseLessons.map((lesson) => {
                    const isCompleted = completedLessons.has(lesson.id);
                    const isSelected = selectedLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => { setSelectedLesson(lesson); setShowFlashcards(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className={`w-full text-left p-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                          isSelected ? "bg-blue-500/20 border border-blue-500/50" : "hover:bg-slate-800/50"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isCompleted ? "text-slate-400" : "text-white"}`}>{lesson.title}</p>
                          <p className="text-[11px] text-slate-500">{lesson.duration}</p>
                        </div>
                        <div className={`p-1 rounded ${isSelected ? "bg-blue-500/30" : "bg-slate-700"}`}>
                          {getLessonIcon(lesson.type)}
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </nav>
          </div>
        </aside>

        {/* Lesson Content */}
        <div className="lg:col-span-3 min-w-0">
          {showFlashcards ? (
            <div className="glass rounded-xl p-4 sm:p-6 lg:p-8 animate-slide-up">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                    🃏 Karteikarten
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Spaced Repetition — lerne effizient mit dem SM-2 Algorithmus
                  </p>
                </div>
                <button
                  onClick={() => setShowFlashcards(false)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  Schließen
                </button>
              </div>
              <FlashcardViewer
                moduleId={module.slug}
                cards={getFlashcardsForModule(module.slug)}
              />
            </div>
          ) : selectedLesson ? (
            selectedLesson.type === "quiz" ? (
              <Quiz
                moduleSlug={module.slug}
                onComplete={() => markComplete(selectedLesson.id)}
              />
            ) : selectedLesson.type === "exercises" ? (
              <InteractiveExercise
                key={selectedLesson.id}
                exercises={
                  selectedLesson.examMode
                    ? getExamExercises(module.id)
                    : getExercisesForLesson(module.id)
                }
                moduleTitle={module.title}
                onComplete={() => markComplete(selectedLesson.id)}
                difficulty={selectedLesson.exerciseDifficulty}
                examMode={selectedLesson.examMode}
                moduleSlug={module.slug}
                lessonId={selectedLesson.id}
                lessonTitle={selectedLesson.title}
              />
            ) : (
              <LessonViewer
                lesson={selectedLesson}
                onComplete={() => markComplete(selectedLesson.id)}
                isCompleted={completedLessons.has(selectedLesson.id)}
                onNext={goToNextLesson}
                hasNext={hasNextLesson()}
                moduleSlug={module.slug}
                moduleTitle={module.title}
                moduleIcon={module.icon}
                lessonIndex={module.lessons.findIndex(l => l.id === selectedLesson.id)}
              />
            )
          ) : (
            <div className="glass rounded-xl p-12 text-center">
              <span className="text-6xl mb-4 block">{module.icon}</span>
              <h2 className="text-2xl font-bold mb-2">Bereit zu lernen?</h2>
              <p className="text-slate-400 mb-6">
                Wähle eine Lektion aus der Liste, um zu beginnen.
              </p>
              <button
                onClick={() => { setSelectedLesson(module.lessons[0]); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
              >
                Erste Lektion starten
              </button>
            </div>
          )}
        </div>
      </div>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Modul abgeschlossen Overlay */}
      {showModuleComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowModuleComplete(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-emerald-500/30 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-emerald-500/10 animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400" />
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-white mb-2">Modul abgeschlossen!</h2>
              <p className="text-lg text-slate-300 mb-1">{module.icon} {module.title}</p>
              <p className="text-slate-400 mb-6">Du hast alle {module.lessons.length} Lektionen gemeistert.</p>

              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-2xl font-bold text-white">{module.lessons.length}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Lektionen</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-400">+50</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Bonus XP</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/modules"
                  className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-slate-300 transition-colors text-center"
                >
                  Alle Module
                </Link>
                <Link
                  href="/leaderboard"
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-xl font-semibold text-white transition-all text-center"
                >
                  🏆 Bestenliste
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
