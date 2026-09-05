"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase";
import { setOnline, setOffline } from "@/lib/presence";
import {
  UserProfile,
  getUserProfile,
  registerUser,
  loginUser,
  logoutUser,
  saveUserProgress,
  toggleSaveModule,
  updateUserProfile,
  changePassword,
  changeEmail,
  deleteAccount,
  resendVerificationEmail,
  toggleLeaderboardOptIn,
} from "@/lib/auth";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<{ needsVerification: boolean }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updatePassword: (currentPw: string, newPw: string) => Promise<void>;
  updateEmail: (currentPw: string, newEmail: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  deleteUserAccount: (password: string) => Promise<void>;
  completeLesson: (moduleId: string, lessonId: string, quizScore?: number) => Promise<void>;
  toggleSaveModule: (moduleSlug: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  toggleLeaderboard: (optIn: boolean) => Promise<void>;
  resetAll: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Alte localStorage-Daten bereinigen (Migration)
  useEffect(() => {
    const legacyKeys = [
      "learnhub_users", "learnhub_login_attempts",
      "learnhub_pending_verification", "learnhub_session",
    ];
    legacyKeys.forEach(key => localStorage.removeItem(key));
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith("completed-")) localStorage.removeItem(key);
    });
    sessionStorage.removeItem("learnhub_session");
  }, []);

  // Firebase Auth State Listener
  useEffect(() => {
    let settled = false;

    // Safety timeout: ensure loading stops even if Firebase never responds
    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        setIsLoading(false);
      }
    }, 8000);

    try {
      const unsubscribe = onAuthStateChanged(getAuthInstance(), async (firebaseUser) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);

        if (firebaseUser) {
          try {
            let profile = await getUserProfile(firebaseUser.uid);
            if (profile) {
              if (profile.emailVerified !== firebaseUser.emailVerified) {
                await updateUserProfile(firebaseUser.uid, { emailVerified: firebaseUser.emailVerified });
                profile.emailVerified = firebaseUser.emailVerified;
              }
              setUser(profile);

              // Presence: Heartbeat + Page-Unload Detection
              setOnline(firebaseUser.uid).catch(() => {});
            } else {
              setUser(null);
            }
          } catch (err) {
            console.error("Auth state error:", err);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => {
        clearTimeout(timeout);
        unsubscribe();
      };
    } catch (err) {
      console.error("Firebase init error:", err);
      if (!settled) {
        settled = true;
        clearTimeout(timeout);
        setIsLoading(false);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const profile = await loginUser(email, password);
    setUser(profile);
  };

  const register = async (email: string, password: string, username: string) => {
    return await registerUser(email, password, username);
  };

  const logout = async () => {
    if (user) await setOffline(user.uid);
    await logoutUser();
    setUser(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    await updateUserProfile(user.uid, updates);
    setUser({ ...user, ...updates });
  };

  const updatePassword = async (currentPw: string, newPw: string) => {
    await changePassword(currentPw, newPw);
  };

  const updateEmail = async (currentPw: string, newEmail: string) => {
    await changeEmail(currentPw, newEmail);
    if (user) setUser({ ...user, email: newEmail, emailVerified: false });
  };

  const resendVerification = async () => {
    await resendVerificationEmail();
  };

  const deleteUserAccount = async (password: string) => {
    await deleteAccount(password);
    setUser(null);
  };

  const completeLesson = async (moduleId: string, lessonId: string, quizScore?: number) => {
    if (!user) return;
    const updated = await saveUserProgress(user.uid, moduleId, lessonId, quizScore);
    if (updated) setUser(updated);
  };

  const toggleSaveModuleFn = async (moduleSlug: string) => {
    if (!user) return;
    const updated = await toggleSaveModule(user.uid, moduleSlug);
    if (updated) setUser(updated);
  };

  const refreshUser = async () => {
    if (!user) return;
    const profile = await getUserProfile(user.uid);
    if (profile) setUser(profile);
  };

  const toggleLeaderboardFn = async (optIn: boolean) => {
    if (!user) return;
    await toggleLeaderboardOptIn(user.uid, optIn);
    setUser({ ...user, leaderboardOptIn: optIn });
  };

  const resetAll = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("learnhub_users");
      localStorage.removeItem("learnhub_login_attempts");
      localStorage.removeItem("learnhub_pending_verification");
      sessionStorage.removeItem("learnhub_session");
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith("completed-")) localStorage.removeItem(key);
      });
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user, isLoading, isEmailVerified: user?.emailVerified ?? false,
      login, register, logout,
      updateProfile, updatePassword, updateEmail, resendVerification, deleteUserAccount,
      completeLesson, toggleSaveModule: toggleSaveModuleFn,
      refreshUser, toggleLeaderboard: toggleLeaderboardFn, resetAll,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
