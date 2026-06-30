// ============================================================================
// Firebase Auth + Firestore — Sicheres User-System (DSGVO-konform)
// ============================================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  updateProfile,
  updatePassword as fbUpdatePassword,
  updateEmail as fbUpdateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  type User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getAuthInstance, getDb } from "./firebase";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  emailVerified: boolean;
  avatar: string;
  bio: string;
  displayName: string;
  createdAt: string;
  streak: number;
  lastActive: string;
  streakFreeze: boolean;
  dailyGoalTarget: number;
  dailyLessonsToday: number;
  dailyLessonsDate: string;
  totalXP: number;
  completedModules: string[];
  completedLessons: Record<string, string[]>;
  quizScores: Record<string, number>;
  savedModules: string[];
  settings: {
    theme: "dark" | "light";
    notifications: boolean;
    language: string;
    backgroundTheme?: "default" | "pixel";
  };
  leaderboardOptIn: boolean;
  equippedFrame: string;
  statusHidden: boolean;
  // Lern-Clicker
  clickerPoints: number;
  clickerTotalPoints: number;
  clickerClickPower: number;
  clickerAutoSpeed: number;
  clickerAutoAmount: number;
  clickerUpgrades: Record<string, number>;
  clickerEquippedAvatar: string;
  clickerEquippedFrame: string;
  clickerOwnedCosmetics: string[];
  clickerLastTick: string; // ISO timestamp for offline earnings
  clickerPrestigePoints: number;
  clickerPrestigeLevel: number;
  clickerOwnedPets: string[];
  clickerActivePet: string | null;
  clickerPrestigeSkill_critChance?: number;
  clickerPrestigeSkill_luck?: number;
  clickerPrestigeSkill_autoBoost?: number;
  clickerPrestigeSkill_speedBoost?: number;
  clickerPrestigeSkill_goldenTouch?: number;
  clickerPrestigeSkill_petLover?: number;
  [key: string]: unknown;
}

// ─── Konstanten ─────────────────────────────────────────────────────────────

const AVATARS = ["🤓", "😎", "🦊", "🐱", "🦄", "🐸", "🐼", "🦁", "🐯", "🐨", "🐻", "🐰", "🦋", "🐙", "🦉", "🐧"];
const STARTER_AVATARS = ["🤓", "😎", "🐱", "🐶", "🐼", "🐨"]; // Nur Level 1 Common

// ─── Helpers ────────────────────────────────────────────────────────────────

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) return { valid: false, error: "Passwort muss mindestens 6 Zeichen lang sein" };
  if (!/[0-9]/.test(password)) return { valid: false, error: "Passwort muss mindestens eine Zahl enthalten" };
  if (!/[a-zA-Z]/.test(password)) return { valid: false, error: "Passwort muss mindestens einen Buchstaben enthalten" };
  return { valid: true };
}

export function getUserLevel(xp: number): { level: number; title: string; xpToNext: number; progress: number } {
  const levels = [
    { xp: 0, title: "Anfänger" },
    { xp: 100, title: "Schüler" },
    { xp: 250, title: "Student" },
    { xp: 500, title: "Fortgeschritten" },
    { xp: 1000, title: "Experte" },
    { xp: 2000, title: "Meister" },
    { xp: 5000, title: "Guru" },
    { xp: 10000, title: "Legende" },
  ];
  let currentLevel = 0;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].xp) { currentLevel = i; break; }
  }
  const nextLevel = Math.min(currentLevel + 1, levels.length - 1);
  const currentXP = levels[currentLevel].xp;
  const nextXP = levels[nextLevel].xp;
  const progress = currentLevel === levels.length - 1 ? 100 : Math.round(((xp - currentXP) / (nextXP - currentXP)) * 100);
  return { level: currentLevel + 1, title: levels[currentLevel].title, xpToNext: nextXP - xp, progress };
}

// ─── Registration ───────────────────────────────────────────────────────────

export async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<{ needsVerification: boolean }> {
  // Prüfen ob Username bereits vergeben
  const usernameSnap = await getDoc(doc(getDb(), "usernames", username));
  if (usernameSnap.exists()) {
    throw new Error("Benutzername ist bereits vergeben");
  }

  // Firebase Auth User erstellen
  const credential = await createUserWithEmailAndPassword(getAuthInstance(), email, password);
  const firebaseUser = credential.user;

  // Display Name setzen
  await updateProfile(firebaseUser, { displayName: username });

  // Username reservieren
  await setDoc(doc(getDb(), "usernames", username), {
    uid: firebaseUser.uid,
    createdAt: serverTimestamp(),
  });

  // Profil in Firestore anlegen (auch wenn noch unverifiziert)
  const profile: UserProfile = {
    uid: firebaseUser.uid,
    username,
    email,
    emailVerified: false,
    avatar: STARTER_AVATARS[Math.floor(Math.random() * STARTER_AVATARS.length)],
    bio: "",
    displayName: username,
    createdAt: new Date().toISOString(),
    streak: 1,
    lastActive: new Date().toISOString(),
    streakFreeze: false,
    dailyGoalTarget: 3,
    dailyLessonsToday: 0,
    dailyLessonsDate: new Date().toDateString(),
    totalXP: 0,
    completedModules: [],
    completedLessons: {},
    quizScores: {},
    savedModules: [],
    settings: { theme: "dark", notifications: true, language: "de" },
    leaderboardOptIn: false,
    equippedFrame: "none",
    statusHidden: false,
    clickerPoints: 0,
    clickerTotalPoints: 0,
    clickerClickPower: 1,
    clickerAutoSpeed: 1000,
    clickerAutoAmount: 0,
    clickerUpgrades: {},
    clickerEquippedAvatar: "📚",
    clickerEquippedFrame: "none",
    clickerOwnedCosmetics: [],
    clickerLastTick: new Date().toISOString(),
    clickerPrestigePoints: 0,
    clickerPrestigeLevel: 0,
    clickerOwnedPets: [],
    clickerActivePet: null,
  };
  await setDoc(doc(getDb(), "users", firebaseUser.uid), {
    ...profile,
    createdAt: serverTimestamp(),
  });

  // Bestätigungs-E-Mail senden (Firebase sendet automatisch)
  await sendEmailVerification(firebaseUser);

  // User ausloggen bis E-Mail bestätigt
  await signOut(getAuthInstance());

  return { needsVerification: true };
}

// ─── Login ──────────────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string): Promise<UserProfile> {
  const credential = await signInWithEmailAndPassword(getAuthInstance(), email, password);
  const firebaseUser = credential.user;

  // Prüfen ob E-Mail bestätigt
  if (!firebaseUser.emailVerified) {
    await signOut(getAuthInstance());
    throw new Error("Bitte bestätige zuerst deine E-Mail. Schau in deinen Posteingang.");
  }

  // Profil laden
  let profile = await getUserProfile(firebaseUser.uid);

  if (!profile) {
    // Edge Case: Auth-User ohne Firestore-Profil
    profile = {
      uid: firebaseUser.uid,
      username: firebaseUser.displayName || email.split("@")[0],
      email: firebaseUser.email || email,
      emailVerified: true,
      avatar: AVATARS[0],
      bio: "",
      displayName: firebaseUser.displayName || "",
      createdAt: new Date().toISOString(),
      streak: 1,
      lastActive: new Date().toISOString(),
      streakFreeze: false,
      dailyGoalTarget: 3,
      dailyLessonsToday: 0,
      dailyLessonsDate: new Date().toDateString(),
      totalXP: 0,
      completedModules: [],
      completedLessons: {},
      quizScores: {},
      savedModules: [],
      settings: { theme: "dark", notifications: true, language: "de" },
      leaderboardOptIn: false,
      equippedFrame: "none",
      statusHidden: false,
      clickerPoints: 0,
      clickerTotalPoints: 0,
      clickerClickPower: 1,
      clickerAutoSpeed: 1000,
      clickerAutoAmount: 0,
      clickerUpgrades: {},
      clickerEquippedAvatar: "📚",
      clickerEquippedFrame: "none",
      clickerOwnedCosmetics: [],
      clickerLastTick: new Date().toISOString(),
      clickerPrestigePoints: 0,
      clickerPrestigeLevel: 0,
      clickerOwnedPets: [],
      clickerActivePet: null,
    };
    await setDoc(doc(getDb(), "users", firebaseUser.uid), { ...profile, createdAt: serverTimestamp() });
  } else if (!profile.emailVerified) {
    // E-Mail wurde gerade bestätigt → Profil updaten
    await updateUserProfile(firebaseUser.uid, { emailVerified: true });
    profile.emailVerified = true;
  }

  // Streak updaten
  const updated = updateStreak(profile);
  await updateUserProfile(firebaseUser.uid, { streak: updated.streak, lastActive: updated.lastActive });

  return updated;
}

// ─── E-Mail erneut senden ───────────────────────────────────────────────────

export async function resendVerificationEmail(): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await sendEmailVerification(user);
}

// ─── Logout ─────────────────────────────────────────────────────────────────

export async function logoutUser(): Promise<void> {
  await signOut(getAuthInstance());
}

// ─── Profile CRUD ───────────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const snap = await getDoc(doc(getDb(), "users", uid));
    if (snap.exists()) return snap.data() as UserProfile;
    return null;
  } catch (err) {
    console.error("Failed to load user profile:", err);
    return null;
  }
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    await updateDoc(doc(getDb(), "users", uid), {
      ...updates,
      lastActive: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Failed to update profile:", err);
    throw err;
  }
}

// ─── Passwort / E-Mail ändern ───────────────────────────────────────────────

async function reauthenticate(password: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user || !user.email) throw new Error("Nicht eingeloggt");
  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);
}

export async function changePassword(currentPw: string, newPw: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(currentPw);
  await fbUpdatePassword(user, newPw);
}

export async function changeEmail(currentPw: string, newEmail: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(currentPw);
  await fbUpdateEmail(user, newEmail);
  await sendEmailVerification(user);
  await updateUserProfile(user.uid, { email: newEmail, emailVerified: false });
}

// ─── DSGVO: Account löschen ─────────────────────────────────────────────────

export async function deleteAccount(password: string): Promise<void> {
  const user = getAuthInstance().currentUser;
  if (!user) throw new Error("Nicht eingeloggt");
  await reauthenticate(password);
  const { uid } = user;
  const db = getDb();

  // Feedback-Einträge des Users löschen (DSGVO Art. 17)
  if (uid) {
    try {
      const feedbackQuery = query(collection(db, "feedback"), where("uid", "==", uid));
      const snapshot = await getDocs(feedbackQuery);
      const deletions = snapshot.docs.map((d) => deleteDoc(doc(db, "feedback", d.id)));
      await Promise.all(deletions);
    } catch (e) {
      console.warn("[deleteAccount] Feedback cleanup failed:", e);
    }
  }

  const username = user.displayName;
  if (username) await deleteDoc(doc(db, "usernames", username)).catch(() => {});
  await deleteDoc(doc(db, "users", uid)).catch(() => {});
  await deleteUser(user);
}

// ─── Streak ─────────────────────────────────────────────────────────────────

function updateStreak(profile: UserProfile): UserProfile {
  const today = new Date().toDateString();
  const lastActive = new Date(profile.lastActive).toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toDateString();

  if (lastActive === today) return profile;

  // Reset daily counter for new day
  const dailyLessonsDate = profile.dailyLessonsDate || "";
  const dailyReset = dailyLessonsDate !== today
    ? { dailyLessonsToday: 0, dailyLessonsDate: today }
    : {};

  if (lastActive === yesterday) {
    return { ...profile, streak: profile.streak + 1, lastActive: new Date().toISOString(), ...dailyReset };
  }

  // Streak-Freeze: 1 verpasster Tag (yesterday) überlebt
  if (lastActive === twoDaysAgo && profile.streakFreeze) {
    return { ...profile, streakFreeze: false, lastActive: new Date().toISOString(), ...dailyReset };
  }

  // Streak gebrochen
  return { ...profile, streak: 1, lastActive: new Date().toISOString(), ...dailyReset };
}

// ─── Progress ───────────────────────────────────────────────────────────────

export async function saveUserProgress(
  uid: string, moduleId: string, lessonId: string, quizScore?: number
): Promise<UserProfile | null> {
  const profile = await getUserProfile(uid);
  if (!profile) return null;
  if (!profile.completedLessons[moduleId]) profile.completedLessons[moduleId] = [];
  // Merken ob die Lektion bereits abgeschlossen war BEVOR wir sie hinzufügen
  const wasLessonAlreadyDone = profile.completedLessons[moduleId].includes(lessonId);
  if (!wasLessonAlreadyDone) {
    profile.completedLessons[moduleId].push(lessonId);
    profile.totalXP += 10;
    // Tageszähler hochzählen
    const today = new Date().toDateString();
    if (profile.dailyLessonsDate !== today) {
      profile.dailyLessonsToday = 1;
      profile.dailyLessonsDate = today;
    } else {
      profile.dailyLessonsToday = (profile.dailyLessonsToday || 0) + 1;
    }
  }
  if (quizScore !== undefined) {
    const old = profile.quizScores[moduleId] || 0;
    if (quizScore > old) {
      profile.quizScores[moduleId] = quizScore;
      // Nur XP für den ersten Abschluss vergeben, nicht für Wiederholungen
      if (!wasLessonAlreadyDone) {
        profile.totalXP += (quizScore - old) * 2;
      }
    }
  }
  try {
    const { getModule } = await import("./data");
    const mod = getModule(moduleId);
    if (mod) {
      const count = profile.completedLessons[moduleId]?.length || 0;
      if (count >= mod.lessons.length && !profile.completedModules.includes(moduleId)) {
        profile.completedModules.push(moduleId);
        profile.totalXP += 50;
      }
    }
  } catch { /* ok */ }
  const updated = updateStreak(profile);
  await updateUserProfile(uid, {
    completedLessons: updated.completedLessons, completedModules: updated.completedModules,
    quizScores: updated.quizScores, totalXP: updated.totalXP, streak: updated.streak, lastActive: updated.lastActive,
    dailyLessonsToday: updated.dailyLessonsToday, dailyLessonsDate: updated.dailyLessonsDate,
  });
  return updated;
}

export async function toggleSaveModule(uid: string, slug: string): Promise<UserProfile | null> {
  const profile = await getUserProfile(uid);
  if (!profile) return null;
  if (!profile.savedModules) profile.savedModules = [];
  const i = profile.savedModules.indexOf(slug);
  if (i >= 0) profile.savedModules.splice(i, 1); else profile.savedModules.push(slug);
  await updateUserProfile(uid, { savedModules: profile.savedModules });
  return profile;
}

// ─── Leaderboard ───────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  uid: string;
  username: string;
  displayName: string;
  avatar: string;
  equippedFrame: string;
  totalXP: number;
  streak: number;
  completedModules: number;
  level: number;
  levelTitle: string;
  rank: number;
}

export async function getLeaderboard(limit: number = 50): Promise<LeaderboardEntry[]> {
  try {
    const { collection, getDocs } = await import("firebase/firestore");

    // Alle Users laden (Firestore Free Tier: keine Composite-Index-Probleme)
    const snap = await getDocs(collection(getDb(), "users"));

    const entries: LeaderboardEntry[] = [];

    snap.forEach((doc) => {
      const data = doc.data() as UserProfile;
      // Nur opted-in Users
      if (data.leaderboardOptIn !== true) return;
      if (!data.uid || !data.username) return;
      const levelInfo = getUserLevel(data.totalXP || 0);
      entries.push({
        uid: data.uid,
        username: data.username,
        displayName: data.displayName || data.username,
        avatar: data.avatar || "🎓",
        equippedFrame: data.equippedFrame || "none",
        totalXP: data.totalXP || 0,
        streak: data.streak || 0,
        completedModules: data.completedModules?.length || 0,
        level: levelInfo.level,
        levelTitle: levelInfo.title,
        rank: 0,
      });
    });

    // Client-seitig nach XP sortieren
    entries.sort((a, b) => b.totalXP - a.totalXP);

    // Ränge vergeben
    entries.forEach((entry, i) => { entry.rank = i + 1; });

    return entries.slice(0, limit);
  } catch (err) {
    console.error("Failed to load leaderboard:", err);
    return [];
  }
}

export async function toggleLeaderboardOptIn(uid: string, optIn: boolean): Promise<void> {
  try {
    // setDoc mit merge: erstellt das Feld falls es noch nicht existiert
    await setDoc(doc(getDb(), "users", uid), {
      leaderboardOptIn: optIn,
      lastActive: new Date().toISOString(),
    }, { merge: true });
    console.log(`[Leaderboard] ${uid} → ${optIn ? "ON" : "OFF"}`);
  } catch (err) {
    console.error("[Leaderboard] Toggle failed:", err);
    throw err;
  }
}

// ─── Lern-Clicker (server-seitig validiert) ─────────────────────────────────

export interface ClickerState {
  points: number;
  totalPoints: number;
  clickPower: number;
  autoSpeed: number;
  autoAmount: number;
  prestigeMultiplier: number;
  prestigePoints: number;
  prestigeLevel: number;
  upgrades: Record<string, number>;
  ownedPets: string[];
  activePet: string | null;
  activePets: string[];
  petLevels: Record<string, number>;
  equippedAvatar: string;
  equippedFrame: string;
  ownedCosmetics: string[];
  lastTick: string;
  prestige_skill_critChance?: number;
  prestige_skill_luck?: number;
  prestige_skill_autoBoost?: number;
  prestige_skill_speedBoost?: number;
  prestige_skill_goldenTouch?: number;
  prestige_skill_petLover?: number;
  prestige_skill_petSlots?: number;
  prestige_skill_clickMastery?: number;
  prestige_skill_goldRush?: number;
  [key: string]: unknown;
}

const CLICKER_DEFAULTS: ClickerState = {
  points: 0,
  totalPoints: 0,
  clickPower: 1,
  autoSpeed: 1000,
  autoAmount: 0,
  prestigeMultiplier: 1,
  prestigePoints: 0,
  prestigeLevel: 0,
  upgrades: {},
  ownedPets: [],
  activePet: null,
  activePets: [],
  petLevels: {},
  equippedAvatar: "📚",
  equippedFrame: "none",
  ownedCosmetics: [],
  lastTick: new Date().toISOString(),
};

export async function loadClickerState(uid: string): Promise<ClickerState> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile || profile.clickerPoints === undefined) {
      // Erste Initialisierung — Defaults in Firebase speichern
      await updateUserProfile(uid, { ...CLICKER_DEFAULTS });
      return CLICKER_DEFAULTS;
    }

    // Offline-Earnings berechnen
    const lastTick = new Date(profile.clickerLastTick || Date.now()).getTime();
    const now = Date.now();
    const elapsed = Math.min(now - lastTick, 24 * 60 * 60 * 1000); // Max 24h
    const autoAmount = profile.clickerAutoAmount || 0;
    const autoSpeed = profile.clickerAutoSpeed || 1000;
    const equippedFrame = profile.clickerEquippedFrame || "none";
    const prestigeMultiplier = PRESTIGE_MULTIPLIERS[equippedFrame] || 1;
    const offlinePoints = autoAmount > 0 ? Math.floor((elapsed / autoSpeed) * autoAmount * prestigeMultiplier) : 0;

    const state: ClickerState = {
      points: (profile.clickerPoints || 0) + offlinePoints,
      totalPoints: (profile.clickerTotalPoints || 0) + offlinePoints,
      clickPower: profile.clickerClickPower || 1,
      autoSpeed: autoSpeed,
      autoAmount: autoAmount,
      prestigeMultiplier,
      prestigePoints: profile.clickerPrestigePoints || 0,
      prestigeLevel: profile.clickerPrestigeLevel || 0,
      upgrades: profile.clickerUpgrades || {},
      ownedPets: profile.clickerOwnedPets || [],
      activePet: profile.clickerActivePet || null,
      activePets: Array.isArray(profile.clickerActivePets) ? profile.clickerActivePets : (profile.clickerActivePet ? [profile.clickerActivePet] : []),
      petLevels: (typeof profile.clickerPetLevels === "object" && profile.clickerPetLevels !== null ? profile.clickerPetLevels : {}) as Record<string, number>,
      equippedAvatar: profile.clickerEquippedAvatar || "📚",
      equippedFrame,
      ownedCosmetics: profile.clickerOwnedCosmetics || [],
      prestige_skill_critChance: profile.clickerPrestigeSkill_critChance || 0,
      prestige_skill_luck: profile.clickerPrestigeSkill_luck || 0,
      prestige_skill_autoBoost: profile.clickerPrestigeSkill_autoBoost || 0,
      prestige_skill_speedBoost: profile.clickerPrestigeSkill_speedBoost || 0,
      prestige_skill_goldenTouch: profile.clickerPrestigeSkill_goldenTouch || 0,
      prestige_skill_petLover: profile.clickerPrestigeSkill_petLover || 0,
      prestige_skill_petSlots: Number(profile.clickerPrestigeSkill_petSlots) || 0,
      prestige_skill_clickMastery: Number(profile.clickerPrestigeSkill_clickMastery) || 0,
      prestige_skill_goldRush: Number(profile.clickerPrestigeSkill_goldRush) || 0,
      lastTick: new Date().toISOString(),
    };

    // Offline-Earnings speichern
    if (offlinePoints > 0) {
      await updateUserProfile(uid, {
        clickerPoints: state.points,
        clickerTotalPoints: state.totalPoints,
        clickerLastTick: state.lastTick,
      });
    }

    return state;
  } catch (err) {
    console.error("[Clicker] Load failed:", err);
    return CLICKER_DEFAULTS;
  }
}

export async function saveClickerClick(uid: string, earnedPoints: number): Promise<number> {
  // Server-seitige Validierung: max. 1.000.000 Punkte pro Speicherung
  const validPower = Math.min(Math.max(0, Math.floor(earnedPoints)), 1_000_000);
  if (validPower <= 0) return 0;
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return 0;
    const newPoints = (profile.clickerPoints || 0) + validPower;
    const newTotal = (profile.clickerTotalPoints || 0) + validPower;
    await updateUserProfile(uid, {
      clickerPoints: newPoints,
      clickerTotalPoints: newTotal,
      clickerLastTick: new Date().toISOString(),
    });
    return newPoints;
  } catch (err) {
    console.error("[Clicker] Click save failed:", err);
    return 0;
  }
}

export async function saveClickerTick(uid: string, autoAmount: number, autoSpeed: number): Promise<number> {
  const validAmount = Math.min(Math.max(0, Math.floor(autoAmount)), 10000);
  const validSpeed = Math.min(Math.max(100, Math.floor(autoSpeed)), 60000);
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return 0;
    const earned = Math.floor((validAmount / validSpeed) * 1000);
    const newPoints = (profile.clickerPoints || 0) + earned;
    const newTotal = (profile.clickerTotalPoints || 0) + earned;
    await updateUserProfile(uid, {
      clickerPoints: newPoints,
      clickerTotalPoints: newTotal,
      clickerLastTick: new Date().toISOString(),
    });
    return newPoints;
  } catch (err) {
    console.error("[Clicker] Tick save failed:", err);
    return 0;
  }
}

const UPGRADE_COSTS: Record<string, { base: number; mult: number; effect: string; value: number }> = {
  // Klick-Punkte (5 Stufen)
  click1: { base: 10, mult: 1.5, effect: "clickPower", value: 1 },
  click2: { base: 100, mult: 1.8, effect: "clickPower", value: 5 },
  click3: { base: 1000, mult: 2.0, effect: "clickPower", value: 25 },
  click4: { base: 12000, mult: 2.2, effect: "clickPower", value: 120 },
  click5: { base: 150000, mult: 2.5, effect: "clickPower", value: 600 },
  // Auto-Generierung (5 Stufen)
  auto1: { base: 50, mult: 1.6, effect: "autoAmount", value: 1 },
  auto2: { base: 500, mult: 1.8, effect: "autoAmount", value: 5 },
  auto3: { base: 5000, mult: 2.0, effect: "autoAmount", value: 25 },
  auto4: { base: 60000, mult: 2.2, effect: "autoAmount", value: 120 },
  auto5: { base: 750000, mult: 2.5, effect: "autoAmount", value: 600 },
  // Geschwindigkeit (4 Stufen)
  speed1: { base: 200, mult: 2.0, effect: "autoSpeed", value: 0.9 },
  speed2: { base: 2500, mult: 2.3, effect: "autoSpeed", value: 0.85 },
  speed3: { base: 30000, mult: 2.5, effect: "autoSpeed", value: 0.8 },
  speed4: { base: 400000, mult: 3.0, effect: "autoSpeed", value: 0.75 },
  // Synergie (nur Kauf-Tracking, Effekt client-seitig)
  syn1: { base: 8000, mult: 2.5, effect: "clickPower", value: 0 },
  syn2: { base: 15000, mult: 2.8, effect: "autoSpeed", value: 1 },
};

export async function buyClickerUpgrade(uid: string, upgradeId: string): Promise<ClickerState | null> {
  const config = UPGRADE_COSTS[upgradeId];
  if (!config) return null;
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;
    const upgrades = profile.clickerUpgrades || {};
    const count = upgrades[upgradeId] || 0;
    const cost = Math.floor(config.base * Math.pow(config.mult, count));
    const currentPoints = profile.clickerPoints || 0;
    if (currentPoints < cost) return null; // Nicht genug Punkte

    const newUpgrades = { ...upgrades, [upgradeId]: count + 1 };
    const updates: Record<string, unknown> = {
      clickerPoints: currentPoints - cost,
      clickerUpgrades: newUpgrades,
    };

    // Effekt anwenden
    if (config.effect === "clickPower") {
      updates.clickerClickPower = (profile.clickerClickPower || 1) + config.value;
    } else if (config.effect === "autoAmount") {
      updates.clickerAutoAmount = (profile.clickerAutoAmount || 0) + config.value;
    } else if (config.effect === "autoSpeed") {
      updates.clickerAutoSpeed = Math.max(100, Math.floor((profile.clickerAutoSpeed || 1000) * config.value));
    }

    await updateUserProfile(uid, updates);
    return loadClickerState(uid);
  } catch (err) {
    console.error("[Clicker] Upgrade failed:", err);
    return null;
  }
}

export async function buyClickerUpgradeBulk(uid: string, upgradeId: string, maxLevels: number = 1): Promise<ClickerState | null> {
  const config = UPGRADE_COSTS[upgradeId];
  if (!config) return null;
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;
    const upgrades = profile.clickerUpgrades || {};
    let count = upgrades[upgradeId] || 0;
    let currentPoints = profile.clickerPoints || 0;
    let levelsBought = 0;

    while (levelsBought < maxLevels) {
      const cost = Math.floor(config.base * Math.pow(config.mult, count));
      if (currentPoints < cost) break;
      currentPoints -= cost;
      count++;
      levelsBought++;
    }

    if (levelsBought === 0) return null;

    const newUpgrades = { ...upgrades, [upgradeId]: count };
    const updates: Record<string, unknown> = {
      clickerPoints: currentPoints,
      clickerUpgrades: newUpgrades,
    };

    // Effekt anwenden
    if (config.effect === "clickPower") {
      updates.clickerClickPower = (profile.clickerClickPower || 1) + config.value * levelsBought;
    } else if (config.effect === "autoAmount") {
      updates.clickerAutoAmount = (profile.clickerAutoAmount || 0) + config.value * levelsBought;
    } else if (config.effect === "autoSpeed") {
      let speed = profile.clickerAutoSpeed || 1000;
      for (let i = 0; i < levelsBought; i++) {
        speed = Math.max(100, Math.floor(speed * config.value));
      }
      updates.clickerAutoSpeed = speed;
    }

    await updateUserProfile(uid, updates);
    return loadClickerState(uid);
  } catch (err) {
    console.error("[Clicker] Bulk upgrade failed:", err);
    return null;
  }
}

const COSMETIC_COSTS: Record<string, number> = {
  av_book: 50, av_light: 50, av_atom: 100, av_gear: 100,
  av_brain: 250, av_rocket: 250, av_dragon: 500, av_unicorn: 500,
  av_crown: 1000, av_diamond: 1000,
  fr_wood: 75, fr_silver: 200, fr_gold: 500, fr_flame: 1000,
  // Prestige Avatare
  av_phoenix: 5000, av_galaxy: 10000, av_cosmic: 25000,
  // Prestige Rahmen
  fr_prestige_bronze: 50000, fr_prestige_silver: 150000, fr_prestige_gold: 500000,
  fr_prestige_diamond: 2000000, fr_prestige_legend: 10000000,
};

// Prestige-Mindestanforderungen (Gesamtpunkte)
const PRESTIGE_MIN_TOTAL: Record<string, number> = {
  fr_prestige_bronze: 100000,
  fr_prestige_silver: 500000,
  fr_prestige_gold: 2000000,
  fr_prestige_diamond: 10000000,
  fr_prestige_legend: 50000000,
};

// Prestige-Multiplikatoren (basieren auf ausgerüstetem Rahmen)
const PRESTIGE_MULTIPLIERS: Record<string, number> = {
  fr_prestige_bronze: 1.10,
  fr_prestige_silver: 1.25,
  fr_prestige_gold: 1.50,
  fr_prestige_diamond: 2.00,
  fr_prestige_legend: 3.00,
};

// Cosmetic-ID → Emoji-Icon Mapping (für equipClickerCosmetic)
const COSMETIC_ICONS: Record<string, string> = {
  av_book: "📚", av_light: "💡", av_atom: "⚛️", av_gear: "⚙️",
  av_brain: "🧠", av_rocket: "🚀", av_dragon: "🐉", av_unicorn: "🦄",
  av_crown: "👑", av_diamond: "💎",
  av_phoenix: "🔥", av_galaxy: "🌌", av_cosmic: "✨",
};

export async function buyClickerCosmetic(uid: string, cosmeticId: string): Promise<ClickerState | null> {
  const cost = COSMETIC_COSTS[cosmeticId];
  if (cost === undefined) return null;
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;
    const owned = profile.clickerOwnedCosmetics || [];
    if (owned.includes(cosmeticId)) return null; // Bereits gekauft
    const currentPoints = profile.clickerPoints || 0;
    if (currentPoints < cost) return null;

    // Prestige-Validierung: Mindest-Gesamtpunkte pruefen
    const minTotal = PRESTIGE_MIN_TOTAL[cosmeticId];
    if (minTotal !== undefined) {
      const totalPoints = profile.clickerTotalPoints || 0;
      if (totalPoints < minTotal) return null;
    }

    await updateUserProfile(uid, {
      clickerPoints: currentPoints - cost,
      clickerOwnedCosmetics: [...owned, cosmeticId],
    });
    return loadClickerState(uid);
  } catch (err) {
    console.error("[Clicker] Cosmetic buy failed:", err);
    return null;
  }
}

export async function equipClickerCosmetic(uid: string, cosmeticId: string, type: "avatar" | "frame" | "prestige"): Promise<void> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return;
    const owned = profile.clickerOwnedCosmetics || [];
    if (!owned.includes(cosmeticId)) return; // Nicht gekauft
    if (type === "avatar") {
      const icon = COSMETIC_ICONS[cosmeticId] || cosmeticId;
      await updateUserProfile(uid, { clickerEquippedAvatar: icon });
    } else {
      // frame und prestige werden beide als Frame equipped
      await updateUserProfile(uid, { clickerEquippedFrame: cosmeticId });
    }
  } catch (err) {
    console.error("[Clicker] Equip failed:", err);
  }
}

export async function resetClickerState(uid: string): Promise<void> {
  try {
    await updateUserProfile(uid, { ...CLICKER_DEFAULTS });
  } catch (err) {
    console.error("[Clicker] Reset failed:", err);
  }
}

// ─── Prestige-System ────────────────────────────────────────────────────────

export async function prestigeClickerState(uid: string): Promise<ClickerState | null> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;

    const totalPoints = profile.clickerTotalPoints || 0;
    if (totalPoints < 10000) return null; // Mindestens 10.000 Punkte

    // Prestige-Punkte berechnen: floor(log10(totalPoints / 10000))
    const newPrestigePoints = Math.floor(Math.log10(totalPoints / 10000));
    const currentPrestigePoints = profile.clickerPrestigePoints || 0;
    const currentPrestigeLevel = profile.clickerPrestigeLevel || 0;

    await updateUserProfile(uid, {
      clickerPoints: 0,
      clickerTotalPoints: 0,
      clickerClickPower: 1,
      clickerAutoSpeed: 1000,
      clickerAutoAmount: 0,
      clickerUpgrades: {},
      clickerOwnedCosmetics: [],
      clickerEquippedAvatar: "📚",
      clickerEquippedFrame: "none",
      clickerPrestigePoints: currentPrestigePoints + newPrestigePoints,
      clickerPrestigeLevel: currentPrestigeLevel + 1,
      // Pets bleiben erhalten
      clickerOwnedPets: profile.clickerOwnedPets || [],
      clickerActivePet: profile.clickerActivePet || null,
    });

    return loadClickerState(uid);
  } catch (err) {
    console.error("[Clicker] Prestige failed:", err);
    return null;
  }
}

// ─── Pet-System ─────────────────────────────────────────────────────────────

interface PetDef {
  id: string;
  name: string;
  emoji: string;
  bonus: string;
  bonusType: "auto" | "click" | "speed";
  bonusPercent: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  module: string;
}

const ALL_PETS: PetDef[] = [
  // Common
  { id: "pet_ihk", name: "IHK-Buch", emoji: "📖", bonus: "+5% Auto", bonusType: "auto", bonusPercent: 5, rarity: "common", module: "IHK" },
  { id: "pet_math", name: "Rechenschieber", emoji: "📐", bonus: "+5% Klick", bonusType: "click", bonusPercent: 5, rarity: "common", module: "Mathematik" },
  { id: "pet_prog", name: "Bug", emoji: "🐛", bonus: "+5% Auto", bonusType: "auto", bonusPercent: 5, rarity: "common", module: "Programmierung" },
  { id: "pet_pencil", name: "Bleistift", emoji: "✏️", bonus: "+3% Klick", bonusType: "click", bonusPercent: 3, rarity: "common", module: "Grundrechnen" },
  { id: "pet_light", name: "Glühbirne", emoji: "💡", bonus: "+4% Auto", bonusType: "auto", bonusPercent: 4, rarity: "common", module: "Logik" },
  { id: "pet_dice", name: "Würfel", emoji: "🎲", bonus: "+4% Klick", bonusType: "click", bonusPercent: 4, rarity: "common", module: "Stochastik" },
  // Rare
  { id: "pet_net", name: "Router", emoji: "📡", bonus: "+3% Speed", bonusType: "speed", bonusPercent: 3, rarity: "rare", module: "Netzwerk" },
  { id: "pet_docker", name: "Container", emoji: "📦", bonus: "+8% Auto", bonusType: "auto", bonusPercent: 8, rarity: "rare", module: "Docker" },
  { id: "pet_db", name: "Datensatz", emoji: "🗄️", bonus: "+8% Klick", bonusType: "click", bonusPercent: 8, rarity: "rare", module: "Datenbank" },
  { id: "pet_atom", name: "Atom", emoji: "⚛️", bonus: "+6% Speed", bonusType: "speed", bonusPercent: 6, rarity: "rare", module: "Physik" },
  { id: "pet_chart", name: "Diagramm", emoji: "📊", bonus: "+7% Auto", bonusType: "auto", bonusPercent: 7, rarity: "rare", module: "Statistik" },
  { id: "pet_gear", name: "Zahnrad", emoji: "⚙️", bonus: "+7% Klick", bonusType: "click", bonusPercent: 7, rarity: "rare", module: "Prozesse" },
  // Epic
  { id: "pet_git", name: "Branch", emoji: "🌿", bonus: "+5% Speed", bonusType: "speed", bonusPercent: 5, rarity: "epic", module: "Git" },
  { id: "pet_ki", name: "Neuron", emoji: "🧬", bonus: "+10% Auto", bonusType: "auto", bonusPercent: 10, rarity: "epic", module: "KI" },
  { id: "pet_pm", name: "Gantt", emoji: "📋", bonus: "+10% Klick", bonusType: "click", bonusPercent: 10, rarity: "epic", module: "Projektmanagement" },
  { id: "pet_rocket", name: "Rakete", emoji: "🚀", bonus: "+8% Speed", bonusType: "speed", bonusPercent: 8, rarity: "epic", module: "Wachstum" },
  { id: "pet_crystal", name: "Kristall", emoji: "💎", bonus: "+12% Auto", bonusType: "auto", bonusPercent: 12, rarity: "epic", module: "Komplexe Zahlen" },
  // Legendary
  { id: "pet_sec", name: "Schild", emoji: "🛡️", bonus: "+8% Speed", bonusType: "speed", bonusPercent: 8, rarity: "legendary", module: "IT-Sicherheit" },
  { id: "pet_ux", name: "Wireframe", emoji: "🖼️", bonus: "+15% Auto", bonusType: "auto", bonusPercent: 15, rarity: "legendary", module: "UX" },
  { id: "pet_quantum", name: "Qubit", emoji: "⚛️", bonus: "+20% Klick", bonusType: "click", bonusPercent: 20, rarity: "legendary", module: "Quantencomputer" },
  { id: "pet_dragon", name: "Drache", emoji: "🐉", bonus: "+25% Auto", bonusType: "auto", bonusPercent: 25, rarity: "legendary", module: "Boss" },
  { id: "pet_phoenix", name: "Phönix", emoji: "🔥", bonus: "+30% Klick", bonusType: "click", bonusPercent: 30, rarity: "legendary", module: "Prestige" },
];

const BOX_TIERS: Record<string, { cost: number; rarities: PetDef["rarity"][] }> = {
  common: { cost: 100, rarities: ["common", "rare"] },
  rare: { cost: 500, rarities: ["rare", "epic"] },
  epic: { cost: 2000, rarities: ["epic", "legendary"] },
  prestige: { cost: 10000, rarities: ["legendary"] },
};

export function getPetDefs(): PetDef[] {
  return ALL_PETS;
}

export function getBoxTiers(): Record<string, { cost: number }> {
  return Object.fromEntries(Object.entries(BOX_TIERS).map(([k, v]) => [k, { cost: v.cost }]));
}

export function getPetBonuses(ownedPets: string[], activePet: string | null, activePets?: string[], petLevels?: Record<string, number>): { auto: number; click: number; speed: number } {
  const bonuses = { auto: 0, click: 0, speed: 0 };
  const equipped = activePets && activePets.length > 0 ? activePets : (activePet ? [activePet] : []);
  for (const pid of equipped) {
    const pet = ALL_PETS.find((p) => p.id === pid);
    if (!pet || !ownedPets.includes(pid)) continue;
    const level = petLevels?.[pid] || 1;
    const bonus = pet.bonusPercent * level;
    if (pet.bonusType === "auto") bonuses.auto += bonus;
    else if (pet.bonusType === "click") bonuses.click += bonus;
    else if (pet.bonusType === "speed") bonuses.speed += bonus;
  }
  return bonuses;
}

export async function openPetBox(uid: string, boxType: string): Promise<{ state: ClickerState; pet: PetDef } | null> {
  const tier = BOX_TIERS[boxType];
  if (!tier) return null;

  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;

    // Prestige-Box nur nach Prestige
    if (boxType === "prestige" && (profile.clickerPrestigeLevel || 0) < 1) return null;

    const currentPoints = profile.clickerPoints || 0;
    if (currentPoints < tier.cost) return null;

    // Zufälliges Pet aus den erlaubten Rarities
    const possible = ALL_PETS.filter((p) => tier.rarities.includes(p.rarity));
    const chosen = possible[Math.floor(Math.random() * possible.length)];

    const ownedPets = profile.clickerOwnedPets || [];
    // Duplikate erlaubt (für zukünftige Upgrades), aber Pet wird trotzdem hinzugefügt
    const newOwned = [...ownedPets, chosen.id];

    await updateUserProfile(uid, {
      clickerPoints: currentPoints - tier.cost,
      clickerOwnedPets: newOwned,
    });

    const state = await loadClickerState(uid);
    if (!state) return null;
    return { state, pet: chosen };
  } catch (err) {
    console.error("[Clicker] Open box failed:", err);
    return null;
  }
}

export async function equipPet(uid: string, petId: string): Promise<ClickerState | null> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;

    const ownedPets = profile.clickerOwnedPets || [];
    if (!ownedPets.includes(petId) && petId !== null) return null;

    const activePets: string[] = Array.isArray(profile.clickerActivePets) ? profile.clickerActivePets : (profile.clickerActivePet ? [profile.clickerActivePet] : []);
    let newActive: string[];
    if (activePets.includes(petId)) {
      newActive = activePets.filter((id) => id !== petId);
    } else {
      newActive = [...activePets, petId];
    }

    await updateUserProfile(uid, {
      clickerActivePets: newActive,
      clickerActivePet: newActive.length > 0 ? newActive[0] : null,
    });
    return loadClickerState(uid);
  } catch (err) {
    console.error("[Clicker] Equip pet failed:", err);
    return null;
  }
}

export async function upgradePet(uid: string, petId: string): Promise<ClickerState | null> {
  try {
    const profile = await getUserProfile(uid);
    if (!profile) return null;

    const ownedPets = profile.clickerOwnedPets || [];
    if (!ownedPets.includes(petId)) return null;

    const petLevels = (typeof profile.clickerPetLevels === "object" && profile.clickerPetLevels !== null ? profile.clickerPetLevels : {}) as Record<string, number>;
    const currentLevel = petLevels[petId] || 1;
    const maxLevel = 10;
    if (currentLevel >= maxLevel) return null;

    const upgradeCost = getPetUpgradeCost(currentLevel);
    const currentPoints = profile.clickerPoints || 0;
    if (currentPoints < upgradeCost) return null;

    const newLevels = { ...petLevels, [petId]: currentLevel + 1 };
    await updateUserProfile(uid, {
      clickerPoints: currentPoints - upgradeCost,
      clickerPetLevels: newLevels,
    });
    return loadClickerState(uid);
  } catch (err) {
    console.error("[Clicker] Upgrade pet failed:", err);
    return null;
  }
}

function getPetUpgradeCost(level: number): number {
  return Math.floor(200 * Math.pow(2.5, level - 1));
}
