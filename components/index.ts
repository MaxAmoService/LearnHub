// components/index.ts — Organized barrel file
// ═══════════════════════════════════════════════════════════════
// Imports: import { LessonViewer, Quiz } from "@/components"
// ═══════════════════════════════════════════════════════════════

// ─── Core/Layout ───────────────────────────────────────────────
export { AuthProvider, useAuth } from "./AuthProvider";
export { Navbar } from "./Navbar";
export { Footer } from "./Footer";
export { ThemeProvider } from "./ThemeProvider";
export { CookieConsent } from "./CookieConsent";
export { GoogleAnalytics } from "./GoogleAnalytics";
export { BackgroundManager } from "./BackgroundManager";
export { PixelBackground } from "./PixelBackground";

// ─── Learning/Content ──────────────────────────────────────────
export { LessonViewer } from "./LessonViewer";
export { Quiz } from "./Quiz";
export { FlashcardViewer } from "./FlashcardViewer";
export { InteractiveExercise } from "./InteractiveExercise";
export { GuidedExercise } from "./GuidedExercise";
export { PracticeExercises } from "./PracticeExercises";
export { InlineText } from "./InlineText";
export { MathBlock } from "./MathBlock";
export { CodeBlock } from "./CodeBlock";
export { PAPInlineIcon } from "./PAPInlineIcon";
export { LessonFeedback } from "./LessonFeedback";
export { ExtendedGate } from "./AdvancedGate";

// ─── Gamification ──────────────────────────────────────────────
export { AchievementBadges } from "./AchievementBadges";
export { XPNotification } from "./XPNotification";
export { default as LearningClicker } from "./LearningClicker";
export { fireConfetti } from "./Confetti";
export { ProgressBar } from "./ProgressBar";
export { ActivityFeed } from "./ActivityFeed";
export { LeaderboardProfileModal } from "./LeaderboardProfileModal";

// ─── UI ────────────────────────────────────────────────────────
export { ModuleCard } from "./ModuleCard";
export { Skeleton, DashboardSkeleton, ModuleCardSkeleton, LessonSkeleton, QuizSkeleton } from "./Skeleton";
export { SkillTreeGraph } from "./SkillTreeGraph";
export { AvatarFrame } from "./AvatarFrame";
export { OnlineStatus, FrameOnlineStatus } from "./OnlineStatus";

// ─── Auth/User ─────────────────────────────────────────────────
export { LoginModal } from "./LoginModal";
export { UserProfile } from "./UserProfile";

// ─── Utilities ─────────────────────────────────────────────────
export { KeyboardShortcuts } from "./KeyboardShortcuts";
export { lazyInteractive } from "./LazyInteractive";
