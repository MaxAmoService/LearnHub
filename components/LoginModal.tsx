"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthProvider";
import { validatePassword } from "@/lib/auth";
import { X, User, Mail, Lock, Eye, EyeOff, Shield, CheckCircle2, Loader2, ArrowLeft, RefreshCw, ExternalLink, Sparkles } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "login" | "register" | "verify" | "success";

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register, resendVerification } = useAuth();
  const [step, setStep] = useState<Step>("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const emailRef = useRef<HTMLInputElement>(null);

  // Auto-focus email on login step
  useEffect(() => {
    if (isOpen && step === "login" && emailRef.current) {
      setTimeout(() => emailRef.current?.focus(), 200);
    }
  }, [isOpen, step]);

  // Escape to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => {
      setResendCooldown(s => { if (s <= 1) { clearInterval(t); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const reset = () => {
    setUsername(""); setEmail(""); setPassword(""); setConfirmPassword("");
    setError(""); setResendCooldown(0);
  };

  const handleClose = () => { reset(); setStep("login"); onClose(); };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || !email.includes(".")) { setError("Ungültige E-Mail"); return; }
    if (!password) { setError("Bitte Passwort eingeben"); return; }
    setLoading(true);
    try {
      await login(email, password);
      handleClose();
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      const msg = (err as Error)?.message || "";
      if (code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password") {
        setError("Ungültige E-Mail oder Passwort");
      } else if (code === "auth/too-many-requests") {
        setError("Zu viele Versuche. Bitte warte einen Moment.");
      } else if (msg.includes("bestätige")) {
        setError(msg);
        setStep("verify");
      } else {
        setError("Anmeldung fehlgeschlagen.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (username.length < 3) { setError("Benutzername: min. 3 Zeichen"); return; }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) { setError("Benutzername: nur Buchstaben, Zahlen, _ und -"); return; }
    if (!email.includes("@") || !email.includes(".")) { setError("Ungültige E-Mail"); return; }
    const pw = validatePassword(password);
    if (!pw.valid) { setError(pw.error!); return; }
    if (password !== confirmPassword) { setError("Passwörter stimmen nicht überein"); return; }
    setLoading(true);
    try {
      await register(email, password, username);
      setStep("verify");
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;
      if (code === "auth/email-already-in-use") setError("Diese E-Mail ist bereits registriert");
      else setError((err as Error)?.message || "Registrierung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      await resendVerification();
      setResendCooldown(60);
    } catch {
      setError("E-Mail konnte nicht erneut gesendet werden");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden border border-slate-700/60 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-500 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all duration-150"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8">
          {/* ===== LOGIN ===== */}
          {step === "login" && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-slate-700/60">
                  <span className="text-3xl">🎓</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Willkommen zurück</h2>
                <p className="text-slate-400 mt-1.5 text-sm">Melde dich an, um weiterzulernen</p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2.5">
                  <span className="mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">E-Mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      ref={emailRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.de"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Passwort</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {loading ? "Wird geprüft..." : "Anmelden"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                Noch kein Konto?{" "}
                <button onClick={() => { setStep("register"); setError(""); }} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Registrieren
                </button>
              </div>
            </>
          )}

          {/* ===== REGISTER ===== */}
          {step === "register" && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center border border-slate-700/60">
                  <Sparkles className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">Konto erstellen</h2>
                <p className="text-slate-400 mt-1.5 text-sm">Starte deine Lernreise</p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2.5">
                  <span className="mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Benutzername</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="z.B. moritz_dev"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">E-Mail</label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deine@email.de"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Passwort</label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 Zeichen + Zahl"
                      className="w-full pl-11 pr-12 py-3.5 bg-slate-800/60 border border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-white placeholder-slate-500 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                  {/* Password strength */}
                  <div className="mt-2.5 flex gap-1.5">
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${password.length >= 1 ? "bg-red-400" : "bg-slate-700"}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${password.length >= 6 ? "bg-amber-400" : "bg-slate-700"}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${password.length >= 6 && /[0-9]/.test(password) ? "bg-emerald-400" : "bg-slate-700"}`} />
                    <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${password.length >= 8 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password) ? "bg-emerald-300" : "bg-slate-700"}`} />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    {password.length < 1 ? "Min. 6 Zeichen, eine Zahl, ein Buchstabe" :
                     password.length < 6 ? "Zu kurz" :
                     !/[0-9]/.test(password) ? "Fehlt: Zahl" :
                     !/[a-zA-Z]/.test(password) ? "Fehlt: Buchstabe" :
                     "✓ Passwort stark genug"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Passwort bestätigen</label>
                  <div className="relative group">
                    <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Passwort wiederholen"
                      className={`w-full pl-11 pr-4 py-3.5 bg-slate-800/60 border rounded-xl focus:outline-none focus:ring-2 text-white placeholder-slate-500 transition-all duration-200 ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-500/50 focus:ring-red-500/50"
                          : "border-slate-700/60 focus:ring-blue-500/50 focus:border-blue-500/50"
                      }`}
                      required
                    />
                    {confirmPassword && password === confirmPassword && (
                      <CheckCircle2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-emerald-400" />
                    )}
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-[11px] text-red-400 mt-1.5">Passwörter stimmen nicht überein</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading || !!(confirmPassword && password !== confirmPassword)}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                  {loading ? "Wird erstellt..." : "Konto erstellen"}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-slate-400">
                Bereits ein Konto?{" "}
                <button onClick={() => { setStep("login"); setError(""); }} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Anmelden
                </button>
              </div>
            </>
          )}

          {/* ===== EMAIL VERIFICATION ===== */}
          {step === "verify" && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center border border-slate-700/60 animate-pulse">
                  <Mail className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">E-Mail bestätigen</h2>
                <p className="text-slate-400 mt-1.5 text-sm">Wir haben einen Bestätigungslink an</p>
                <p className="text-blue-400 font-semibold mt-1">{email}</p>
                <p className="text-slate-400 text-sm">gesendet.</p>
              </div>

              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl space-y-3">
                <p className="text-blue-400 text-sm font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4" /> So geht&apos;s:
                </p>
                <ol className="text-slate-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Öffne dein E-Mail-Postfach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Klicke auf den Bestätigungslink</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Komm hierher zurück und melde dich an</span>
                  </li>
                </ol>
                <p className="text-slate-500 text-xs pt-1">💡 Tipp: Auch im Spam-Ordner nachsehen!</p>
              </div>

              {error && (
                <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-start gap-2.5">
                  <span className="mt-0.5">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2.5">
                <button
                  onClick={() => { setStep("login"); setError(""); }}
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  E-Mail bestätigt — Jetzt einloggen
                </button>

                <button
                  onClick={handleResend}
                  disabled={resendCooldown > 0 || loading}
                  className="w-full py-3 bg-slate-800/80 hover:bg-slate-700/80 disabled:bg-slate-800/40 disabled:text-slate-600 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 text-slate-300"
                >
                  <RefreshCw className={`w-4 h-4 ${resendCooldown > 0 ? "animate-spin" : ""}`} />
                  {resendCooldown > 0 ? `Erneut senden in ${resendCooldown}s` : "Bestätigungslink erneut senden"}
                </button>

                <a
                  href="https://mail.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 text-slate-400 hover:text-slate-300 border border-slate-700/40"
                >
                  <ExternalLink className="w-4 h-4" />
                  Gmail öffnen
                </a>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => { setStep("register"); setError(""); }}
                  className="text-sm text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-1 mx-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Zurück zur Registrierung
                </button>
              </div>
            </>
          )}

          {/* ===== SUCCESS ===== */}
          {step === "success" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Willkommen, {username}! 🎉</h2>
              <p className="text-slate-400">Dein Konto wurde erstellt.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
